import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { DB, CATS } from '../lib/vehicles'

// DB ist ein Objekt {catKey: [vehicles]} → flatten zu Array
const ALL_VEHICLES = Object.entries(DB).flatMap(([catKey, vehicles]) =>
  vehicles.map(v => ({ ...v, cat: CATS[catKey]?.label || catKey, catKey }))
)

// ── Hilfsfunktionen ────────────────────────────────────────
function genCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

// ── Haupt-Komponente ───────────────────────────────────────
export default function TeacherDashboard({ user, onLogout }) {
  const [dark, setDark] = useState(() => {
    try { const s = localStorage.getItem('tl_dark'); return s !== null ? JSON.parse(s) : true }
    catch { return true }
  })

  // Navigation: 'classrooms' | 'classroom-detail' | 'homework'
  const [view, setView]           = useState('classrooms')
  const [classrooms, setClassrooms] = useState([])
  const [selected, setSelected]   = useState(null)   // aktiver Klassenraum
  const [members, setMembers]     = useState([])
  const [homework, setHomework]   = useState(null)   // aktuelle Hausaufgabe
  const [progress, setProgress]   = useState([])
  const [loading, setLoading]     = useState(false)
  const [newName, setNewName]     = useState('')
  const [creating, setCreating]   = useState(false)
  const [hwSelected, setHwSelected] = useState(new Set())  // ausgewählte Fahrzeug-IDs
  const [hwTitle, setHwTitle]     = useState('Hausaufgabe')
  const [savedMsg, setSavedMsg]   = useState('')
  const [createErr, setCreateErr] = useState('')

  // Farben
  const bg   = dark ? '#080b10' : '#f0f4f8'
  const surf = dark ? '#0a0d14' : '#ffffff'
  const surf2= dark ? '#0d1117' : '#f8fafb'
  const bord = dark ? '#1c2430' : '#d0dce8'
  const text = dark ? '#c0d0e0' : '#1a2a3a'
  const dim  = dark ? '#3d5060' : '#7090a0'
  const tc   = '#3b82f6'
  const inputBg = dark ? '#0d1117' : '#f8fafb'

  function toggleDark() {
    const next = !dark
    setDark(next)
    try { localStorage.setItem('tl_dark', JSON.stringify(next)) } catch {}
  }

  // ── Klassen laden ─────────────────────────────────────────
  useEffect(() => { loadClassrooms() }, [])

  async function loadClassrooms() {
    setLoading(true)
    const { data } = await supabase
      .from('classrooms')
      .select('*')
      .eq('teacher_id', user.userId)
      .order('created_at', { ascending: false })
    setClassrooms(data || [])
    setLoading(false)
  }

  async function loadClassroomDetail(classroom) {
    setSelected(classroom)
    setView('classroom-detail')
    setLoading(true)

    // Mitglieder laden
    const { data: mems } = await supabase
      .from('classroom_members')
      .select('student_id, joined_at, profiles(display_name)')
      .eq('classroom_id', classroom.id)
    setMembers(mems || [])

    // Hausaufgabe laden
    const { data: hw } = await supabase
      .from('homework')
      .select('*')
      .eq('classroom_id', classroom.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()
    setHomework(hw || null)
    if (hw) {
      setHwSelected(new Set(hw.vehicle_ids))
      setHwTitle(hw.title)
    } else {
      setHwSelected(new Set())
      setHwTitle('Hausaufgabe')
    }

    // Fortschritt aller Schüler
    if (mems && mems.length > 0) {
      const studentIds = mems.map(m => m.student_id)
      const { data: prog } = await supabase
        .from('student_progress')
        .select('*')
        .in('student_id', studentIds)
      setProgress(prog || [])
    } else {
      setProgress([])
    }

    setLoading(false)
  }

  async function createClassroom() {
    if (!newName.trim()) return
    setCreating(true)
    setCreateErr('')

    try {
      const { data: sessionData } = await supabase.auth.getSession()
      if (!sessionData?.session) {
        setCreateErr('Sitzung abgelaufen – bitte neu anmelden.')
        setCreating(false)
        return
      }

      const { data, error } = await supabase.from('classrooms').insert({
        teacher_id: sessionData.session.user.id,
        name: newName.trim(),
        code: genCode(),
      }).select().single()

      if (error) {
        setCreateErr(`Fehler: ${error.message} (${error.code})`)
        setCreating(false)
        return
      }
      setNewName('')
      if (data) setClassrooms(prev => [data, ...prev])
    } catch (e) {
      setCreateErr(`Unbekannter Fehler: ${e.message}`)
    }
    setCreating(false)
  }

  async function deleteClassroom(id) {
    const ok = window.confirm('Klassenraum wirklich löschen?')
    if (!ok) return
    await supabase.from('classrooms').delete().eq('id', id)
    setClassrooms(prev => prev.filter(c => c.id !== id))
  }

  async function saveHomework() {
    const ids = Array.from(hwSelected)
    if (ids.length === 0) { alert('Bitte mindestens ein Fahrzeug auswählen.'); return }
    setLoading(true)
    if (homework) {
      await supabase.from('homework').update({ vehicle_ids: ids, title: hwTitle, updated_at: new Date().toISOString() }).eq('id', homework.id)
    } else {
      const { data } = await supabase.from('homework').insert({
        classroom_id: selected.id, vehicle_ids: ids, title: hwTitle,
      }).select().single()
      setHomework(data)
    }
    setLoading(false)
    setSavedMsg('✓ Gespeichert!')
    setTimeout(() => setSavedMsg(''), 2500)
  }

  // Fahrzeug-Auswahl für Hausaufgaben
  function toggleVehicle(id) {
    setHwSelected(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function toggleCategory(cat) {
    const ids = ALL_VEHICLES.filter(v => v.cat === cat).map(v => v.id)
    const allSelected = ids.every(id => hwSelected.has(id))
    setHwSelected(prev => {
      const next = new Set(prev)
      ids.forEach(id => allSelected ? next.delete(id) : next.add(id))
      return next
    })
  }

  // Schüler-Fortschritt berechnen
  function studentStats(studentId) {
    const entries = progress.filter(p => p.student_id === studentId)
    const total = entries.reduce((s, p) => s + p.attempts, 0)
    const correct = entries.reduce((s, p) => s + p.correct, 0)
    const pct = total > 0 ? Math.round(correct / total * 100) : 0
    return { vehicles: entries.length, total, correct, pct }
  }

  // Kategorien gruppieren
  const CATS_GROUPED = ALL_VEHICLES.reduce((acc, v) => {
    if (!acc[v.cat]) acc[v.cat] = []
    acc[v.cat].push(v)
    return acc
  }, {})

  // ── RENDER ─────────────────────────────────────────────────
  return (
    <div style={{
      minHeight: '100vh', background: bg, fontFamily: 'Arial',
      color: text, transition: 'background 0.2s',
    }}>
      {/* Topbar */}
      <div style={{
        background: surf, borderBottom: `1px solid ${bord}`,
        padding: '0 20px', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', height: 52,
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {view !== 'classrooms' && (
            <button onClick={() => setView('classrooms')} style={{
              background: 'transparent', border: `1px solid ${bord}`,
              borderRadius: 7, padding: '5px 12px', cursor: 'pointer',
              color: dim, fontSize: 13,
            }}>← Zurück</button>
          )}
          <span style={{ fontWeight: 700, fontSize: 15, letterSpacing: '0.07em' }}>
            📋 LEHRER-DASHBOARD
          </span>
          {selected && view !== 'classrooms' && (
            <span style={{ color: tc, fontSize: 13 }}>— {selected.name}</span>
          )}
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: dim }}>{user.name}</span>
          <button onClick={toggleDark} style={{
            background: 'transparent', border: `1px solid ${bord}`,
            borderRadius: 7, padding: '4px 9px', cursor: 'pointer', color: dim, fontSize: 14,
          }}>{dark ? '☀️' : '🌙'}</button>
          <button onClick={onLogout} style={{
            background: 'transparent', border: `1px solid ${bord}`,
            borderRadius: 7, padding: '5px 12px', cursor: 'pointer',
            color: dim, fontSize: 12, letterSpacing: '0.06em',
          }}>ABMELDEN</button>
        </div>
      </div>

      <div style={{ padding: '24px 20px', maxWidth: 900, margin: '0 auto' }}>

        {/* ── KLASSENRAUM-ÜBERSICHT ─────────────────────────── */}
        {view === 'classrooms' && (
          <>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Meine Klassenräume</div>
              <div style={{ fontSize: 13, color: dim }}>
                Erstelle Klassenräume und teile den Code mit deinen Schülern.
              </div>
            </div>

            {/* Fehlermeldung */}
            {createErr && (
              <div style={{
                background: dark ? '#2a0a0a' : '#fde8e8',
                border: `1px solid ${dark ? '#6b2200' : '#d93025'}`,
                borderRadius: 10, padding: '12px 16px',
                color: dark ? '#f87171' : '#b91c1c',
                fontSize: 13, marginBottom: 14,
              }}>⚠ {createErr}</div>
            )}

            {/* Neue Klasse erstellen */}
            <div style={{
              background: surf, border: `1px solid ${bord}`, borderRadius: 12,
              padding: '18px 20px', marginBottom: 20, display: 'flex', gap: 10,
            }}>
              <input
                style={{
                  flex: 1, background: inputBg, border: `1px solid ${bord}`,
                  borderRadius: 8, padding: '10px 14px', color: text,
                  fontSize: 14, outline: 'none', fontFamily: 'Arial',
                }}
                placeholder="Klassenraum-Name (z.B. Gruppe Alpha 2026)"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && createClassroom()}
              />
              <button onClick={createClassroom} disabled={creating || !newName.trim()} style={{
                background: tc, border: 'none', borderRadius: 8,
                padding: '10px 20px', color: '#fff', fontWeight: 700,
                fontSize: 14, cursor: 'pointer', opacity: creating ? 0.6 : 1,
                letterSpacing: '0.06em',
              }}>
                {creating ? '…' : '+ ERSTELLEN'}
              </button>
            </div>

            {/* Klassenliste */}
            {loading ? (
              <div style={{ textAlign: 'center', color: dim, padding: 40 }}>Laden …</div>
            ) : classrooms.length === 0 ? (
              <div style={{
                background: surf, border: `1px solid ${bord}`, borderRadius: 12,
                padding: 40, textAlign: 'center', color: dim,
              }}>
                Noch keine Klassenräume erstellt.<br />
                <span style={{ fontSize: 13 }}>Gib oben einen Namen ein und klicke "Erstellen".</span>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {classrooms.map(c => (
                  <div key={c.id} style={{
                    background: surf, border: `1px solid ${bord}`, borderRadius: 12,
                    padding: '16px 20px', display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between', cursor: 'pointer',
                    transition: 'border-color 0.15s',
                  }}
                    onClick={() => loadClassroomDetail(c)}
                    onMouseEnter={e => e.currentTarget.style.borderColor = tc}
                    onMouseLeave={e => e.currentTarget.style.borderColor = bord}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{c.name}</div>
                      <div style={{ fontSize: 12, color: dim }}>
                        Klassen-Code: <span style={{ color: tc, fontWeight: 700, fontFamily: 'monospace', fontSize: 14 }}>{c.code}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        onClick={e => { e.stopPropagation(); navigator.clipboard.writeText(c.code) }}
                        style={{
                          background: 'transparent', border: `1px solid ${bord}`,
                          borderRadius: 7, padding: '6px 12px', cursor: 'pointer',
                          color: dim, fontSize: 12,
                        }}
                        title="Code kopieren"
                      >📋 Kopieren</button>
                      <button
                        onClick={e => { e.stopPropagation(); deleteClassroom(c.id) }}
                        style={{
                          background: 'transparent', border: `1px solid ${dark ? '#6b2200' : '#fca5a5'}`,
                          borderRadius: 7, padding: '6px 12px', cursor: 'pointer',
                          color: dark ? '#f87171' : '#b91c1c', fontSize: 12,
                        }}
                        title="Löschen"
                      >🗑</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ── KLASSENRAUM DETAIL ────────────────────────────── */}
        {view === 'classroom-detail' && selected && (
          <>
            {/* Code-Banner */}
            <div style={{
              background: dark ? '#0f1f35' : '#e8f0fe',
              border: `1px solid ${tc}40`, borderRadius: 12,
              padding: '14px 20px', marginBottom: 20,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div>
                <div style={{ fontSize: 11, color: tc, letterSpacing: '0.1em', marginBottom: 3 }}>
                  KLASSEN-CODE (Schüler geben diesen beim Beitreten ein)
                </div>
                <div style={{ fontSize: 28, fontWeight: 900, color: tc, fontFamily: 'monospace', letterSpacing: '0.2em' }}>
                  {selected.code}
                </div>
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(selected.code)}
                style={{
                  background: tc, border: 'none', borderRadius: 8,
                  padding: '10px 16px', color: '#fff', cursor: 'pointer',
                  fontWeight: 700, fontSize: 13,
                }}
              >📋 Code kopieren</button>
            </div>

            {/* Tabs: Schüler / Hausaufgaben */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
              {[
                { key: 'classroom-detail', label: '👥 Schüler & Fortschritt' },
                { key: 'homework', label: '📝 Hausaufgaben' },
              ].map(t => (
                <button key={t.key} onClick={() => setView(t.key)} style={{
                  padding: '9px 18px', borderRadius: 8, cursor: 'pointer',
                  fontWeight: 600, fontSize: 13, letterSpacing: '0.05em',
                  background: view === t.key ? tc : 'transparent',
                  color: view === t.key ? '#fff' : dim,
                  border: `1px solid ${view === t.key ? tc : bord}`,
                }}>
                  {t.label}
                </button>
              ))}
            </div>

            {/* Schülerliste */}
            {loading ? (
              <div style={{ textAlign: 'center', color: dim, padding: 40 }}>Laden …</div>
            ) : members.length === 0 ? (
              <div style={{
                background: surf, border: `1px solid ${bord}`, borderRadius: 12,
                padding: 40, textAlign: 'center', color: dim,
              }}>
                Noch keine Schüler beigetreten.<br />
                <span style={{ fontSize: 13 }}>Teile den Code oben mit deinen Schülern.</span>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ fontSize: 12, color: dim, marginBottom: 4 }}>
                  {members.length} Schüler in diesem Klassenraum
                </div>
                {members.map(m => {
                  const stats = studentStats(m.student_id)
                  return (
                    <div key={m.student_id} style={{
                      background: surf, border: `1px solid ${bord}`, borderRadius: 10,
                      padding: '14px 18px', display: 'flex', alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 14 }}>
                          {m.profiles?.display_name || 'Unbekannt'}
                        </div>
                        <div style={{ fontSize: 11, color: dim, marginTop: 3 }}>
                          Beigetreten: {new Date(m.joined_at).toLocaleDateString('de-DE')}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 20, fontWeight: 700, color: stats.pct >= 70 ? '#22c55e' : stats.pct >= 40 ? '#f59e0b' : dim }}>
                          {stats.pct}%
                        </div>
                        <div style={{ fontSize: 10, color: dim }}>
                          {stats.correct}/{stats.total} richtig · {stats.vehicles} Fahrzeuge
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </>
        )}

        {/* ── HAUSAUFGABEN VERGEBEN ─────────────────────────── */}
        {view === 'homework' && selected && (
          <>
            <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700 }}>Hausaufgaben für: {selected.name}</div>
                <div style={{ fontSize: 12, color: dim, marginTop: 3 }}>
                  {hwSelected.size} Fahrzeuge ausgewählt
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                {savedMsg && <span style={{ color: '#22c55e', fontSize: 13 }}>{savedMsg}</span>}
                <button onClick={saveHomework} disabled={loading} style={{
                  background: tc, border: 'none', borderRadius: 8,
                  padding: '10px 20px', color: '#fff', fontWeight: 700,
                  fontSize: 13, cursor: 'pointer', letterSpacing: '0.06em',
                }}>
                  💾 SPEICHERN
                </button>
              </div>
            </div>

            {/* Titel der Hausaufgabe */}
            <input
              value={hwTitle}
              onChange={e => setHwTitle(e.target.value)}
              placeholder="Titel der Hausaufgabe"
              style={{
                width: '100%', background: inputBg, border: `1px solid ${bord}`,
                borderRadius: 8, padding: '10px 14px', color: text,
                fontSize: 14, outline: 'none', boxSizing: 'border-box',
                fontFamily: 'Arial', marginBottom: 16,
              }}
            />

            {/* Fahrzeuge nach Kategorie */}
            {Object.entries(CATS_GROUPED).map(([cat, vehicles]) => {
              const allSel = vehicles.every(v => hwSelected.has(v.id))
              const someSel = vehicles.some(v => hwSelected.has(v.id))
              return (
                <div key={cat} style={{
                  background: surf, border: `1px solid ${bord}`,
                  borderRadius: 12, marginBottom: 12, overflow: 'hidden',
                }}>
                  {/* Kategorie-Header */}
                  <div
                    onClick={() => toggleCategory(cat)}
                    style={{
                      padding: '12px 18px', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: 10,
                      background: allSel ? (dark ? '#0f2a1a' : '#d4f5e4') : 'transparent',
                      borderBottom: `1px solid ${bord}`,
                    }}
                  >
                    <div style={{
                      width: 18, height: 18, borderRadius: 4,
                      border: `2px solid ${allSel ? '#22c55e' : someSel ? tc : bord}`,
                      background: allSel ? '#22c55e' : someSel ? `${tc}40` : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      {allSel && <span style={{ color: '#fff', fontSize: 11 }}>✓</span>}
                      {someSel && !allSel && <span style={{ color: tc, fontSize: 11 }}>−</span>}
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 13, flex: 1 }}>{cat}</div>
                    <div style={{ fontSize: 11, color: dim }}>
                      {vehicles.filter(v => hwSelected.has(v.id)).length}/{vehicles.length}
                    </div>
                  </div>

                  {/* Fahrzeug-Liste */}
                  <div style={{ padding: '8px 18px 12px', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {vehicles.map(v => {
                      const sel = hwSelected.has(v.id)
                      return (
                        <button key={v.id} onClick={() => toggleVehicle(v.id)} style={{
                          padding: '5px 12px', borderRadius: 20, cursor: 'pointer',
                          fontSize: 12, fontWeight: sel ? 700 : 400,
                          background: sel ? (dark ? '#0f2a4a' : '#dbeafe') : 'transparent',
                          border: `1px solid ${sel ? tc : bord}`,
                          color: sel ? tc : dim, transition: 'all 0.1s',
                        }}>
                          {v.name}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })}

            <div style={{ marginTop: 16, textAlign: 'right' }}>
              <button onClick={saveHomework} disabled={loading} style={{
                background: tc, border: 'none', borderRadius: 8,
                padding: '12px 28px', color: '#fff', fontWeight: 700,
                fontSize: 14, cursor: 'pointer', letterSpacing: '0.06em',
              }}>
                💾 HAUSAUFGABE SPEICHERN
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
