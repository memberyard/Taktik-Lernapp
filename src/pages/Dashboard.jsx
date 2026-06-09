import { useState, useEffect, useCallback } from 'react'
import { CATS, SUPER_CATS, DB, getFilteredVehicles, getRecomonkeyUrl } from '../lib/vehicles'
import { supabase } from '../lib/supabase'

function shuf(a) { return [...a].sort(() => Math.random() - 0.5) }

function useLocalStorage(key, def) {
  const [val, setVal] = useState(() => {
    try { const s = localStorage.getItem(key); return s !== null ? JSON.parse(s) : def }
    catch { return def }
  })
  const set = useCallback(v => {
    setVal(v)
    try { localStorage.setItem(key, JSON.stringify(v)) } catch {}
  }, [key])
  return [val, set]
}

export default function Dashboard({ user, onLogout }) {
  const [dark, setDark] = useLocalStorage('tl_dark', true)
  const [fontSize, setFontSize] = useLocalStorage('tl_fs', 15)
  const [superCat, setSuperCat] = useLocalStorage('tl_super', 'russia')
  const [activeCat, setActiveCat] = useLocalStorage('tl_cat', 'kpz')
  const [showSidebar, setShowSidebar] = useState(false)
  const [selectedIds, setSelectedIds] = useLocalStorage('tl_sel_ids', null)
  const [mode, setMode] = useLocalStorage('tl_mode', 'flash')
  const [shuffle, setShuffle] = useLocalStorage('tl_shuffle', true)
  const [pool, setPool] = useState([])
  const [idx, setIdx] = useState(0)
  const [chosen, setChosen] = useState(null)
  const [opts, setOpts] = useState([])
  const [revealed, setRevealed] = useState(false)
  const [score, setScore] = useState({ c: 0, t: 0 })
  const [imgIdx, setImgIdx] = useState(0)
  const [notes, setNotes] = useLocalStorage('tl_notes', {})
  const [homework, setHomework]         = useState(null)
  const [classroom, setClassroom]       = useState(null)
  const [classroomLoaded, setClassroomLoaded] = useState(false)
  const [teacherNotes, setTeacherNotes] = useState({})  // { vehicle_id: [note1, note2] }
  const [showJoin, setShowJoin]         = useState(false)
  const [joinCode, setJoinCode]         = useState('')
  const [joinError, setJoinError]       = useState('')
  const [joinLoading, setJoinLoading]   = useState(false)
  const [hwMode, setHwMode]             = useState(false)

  const bg      = dark ? '#080b10' : '#f0f4f8'
  const surf    = dark ? '#0a0d14' : '#ffffff'
  const bord    = dark ? '#1c2430' : '#d0dce8'
  const text    = dark ? '#c0d0e0' : '#1a2a3a'
  const dim     = dark ? '#3d5060' : '#7090a0'
  const inputBg = dark ? '#0d1117' : '#f8fafb'
  const cat     = CATS[activeCat]
  const tc      = cat.color
  const tl      = cat.light

  const ansCorrect = { bg: dark ? '#0d2a1a' : '#d4f5e4', border: dark ? '#1e5f3e' : '#22a06b', col: dark ? '#4ade80' : '#166534' }
  const ansWrong   = { bg: dark ? '#2a0d08' : '#fde8e8', border: dark ? '#6b2200' : '#d93025', col: dark ? '#f87171' : '#b91c1c' }

  useEffect(() => {
    let base
    if (selectedIds && selectedIds.length > 0) {
      // Auswahl aktiv → alle Kategorien durchsuchen (z.B. nach Hausaufgaben-Import)
      const allVehicles = Object.values(DB).flat()
      base = allVehicles.filter(v => selectedIds.includes(v.id))
      if (base.length === 0) base = getFilteredVehicles(activeCat, superCat)
    } else {
      base = getFilteredVehicles(activeCat, superCat)
    }
    const newPool = shuffle ? shuf(base) : [...base]
    setPool(newPool)
    setIdx(0)
    setChosen(null)
    setRevealed(false)
    setOpts(makeOpts(newPool, 0, newPool))
    setScore({ c: 0, t: 0 })
    setImgIdx(0)
  }, [activeCat, superCat, selectedIds, shuffle])

  // Klassenraum & Hausaufgaben laden
  useEffect(() => {
    if (!user?.userId) return
    async function loadClassroomData() {
      // Schüler-Mitgliedschaft abrufen
      const { data: membership } = await supabase
        .from('classroom_members')
        .select('classroom_id, classrooms(id, name, code, teacher_id)')
        .eq('student_id', user.userId)
        .limit(1)
        .single()
      if (!membership) { setClassroomLoaded(true); return }
      const cr = membership.classrooms
      setClassroom(cr)

      // Lehrer-Notizen laden
      if (cr.teacher_id) {
        const { data: notes } = await supabase
          .from('teacher_vehicle_notes')
          .select('vehicle_id, notes')
          .eq('teacher_id', cr.teacher_id)
        if (notes) {
          const map = {}
          notes.forEach(n => { map[Number(n.vehicle_id)] = n.notes || [] })
          setTeacherNotes(map)
        }
      }

      // Hausaufgabe abrufen
      const { data: hw } = await supabase
        .from('homework')
        .select('*')
        .eq('classroom_id', cr.id)
        .order('updated_at', { ascending: false })
        .limit(1)
        .single()
      if (hw) setHomework(hw)
      setClassroomLoaded(true)
    }
    loadClassroomData()
  }, [user?.userId])

  // Pool neu aufbauen wenn hwMode wechselt (hwMode zeigt eigene Ansicht, kein Pool nötig)
  useEffect(() => {
    if (hwMode) return  // Hausaufgaben-Ansicht übernimmt, kein Pool-Update
    const base = getFilteredVehicles(activeCat, superCat)
    let filtered = selectedIds ? base.filter(v => selectedIds.includes(v.id)) : base
    if (filtered.length === 0) filtered = base
    const newPool = shuffle ? shuf(filtered) : [...filtered]
    setPool(newPool)
    setIdx(0)
    setChosen(null)
    setRevealed(false)
    setOpts(makeOpts(newPool, 0, newPool))
    setScore({ c: 0, t: 0 })
    setImgIdx(0)
  }, [hwMode])

  async function joinClassroom() {
    if (!joinCode.trim()) return
    setJoinError('')
    setJoinLoading(true)
    const code = joinCode.trim().toUpperCase()
    const { data: cr } = await supabase
      .from('classrooms')
      .select('*')
      .eq('code', code)
      .single()
    if (!cr) { setJoinError('Ungültiger Code. Bitte nochmal prüfen.'); setJoinLoading(false); return }

    const { error } = await supabase.from('classroom_members').insert({
      classroom_id: cr.id, student_id: user.userId,
    })
    setJoinLoading(false)
    if (error && error.code !== '23505') { setJoinError('Fehler beim Beitreten.'); return }
    setClassroom(cr)
    setClassroomLoaded(true)
    setShowJoin(false)
    setJoinCode('')

    // Hausaufgabe laden
    const { data: hw } = await supabase
      .from('homework')
      .select('*')
      .eq('classroom_id', cr.id)
      .order('updated_at', { ascending: false })
      .limit(1)
      .single()
    if (hw) setHomework(hw)
  }

  function makeOpts(p, i, fullBase) {
    if (!p.length) return []
    const cur = p[i]
    const others = shuf(fullBase.filter(x => x.id !== cur.id)).slice(0, 3)
    return shuf([cur, ...others])
  }

  function goTo(n) {
    if (!pool.length) return
    const newIdx = ((n % pool.length) + pool.length) % pool.length
    setIdx(newIdx)
    setChosen(null)
    setRevealed(false)
    setOpts(makeOpts(pool, newIdx, pool))
    setImgIdx(0)
  }

  async function pick(vid) {
    if (chosen !== null) return
    setChosen(vid)
    const vehicleId = pool[idx]?.id
    const correct = vid === vehicleId
    setScore(s => ({ c: s.c + (correct ? 1 : 0), t: s.t + 1 }))

    // Fortschritt in Supabase speichern (nur wenn Schüler einer Klasse angehört)
    if (classroom && user?.userId && vehicleId) {
      try {
        // Vorhandenen Eintrag laden
        const { data: existing } = await supabase
          .from('student_progress')
          .select('attempts, correct')
          .eq('student_id', user.userId)
          .eq('vehicle_id', vehicleId)
          .single()

        if (existing) {
          // Aktualisieren
          await supabase.from('student_progress').update({
            attempts: existing.attempts + 1,
            correct:  existing.correct  + (correct ? 1 : 0),
            updated_at: new Date().toISOString(),
          }).eq('student_id', user.userId).eq('vehicle_id', vehicleId)
        } else {
          // Neu anlegen
          await supabase.from('student_progress').insert({
            student_id: user.userId,
            vehicle_id: vehicleId,
            attempts:   1,
            correct:    correct ? 1 : 0,
          })
        }
      } catch (e) {
        console.warn('Fortschritt konnte nicht gespeichert werden:', e)
      }
    }
  }

  function saveNote(vehicleId, val) {
    setNotes(prev => ({ ...prev, [vehicleId]: val }))
  }

  const cur = pool[idx]
  const pct = score.t > 0 ? Math.round(score.c / score.t * 100) : null
  const hasImages = cur?.images?.length > 0
  const poolHasImages = pool.some(v => v.images?.length > 0)

  const btn = (active, color, lightColor) => ({
    padding: '8px 14px',
    background: active ? color + '28' : 'transparent',
    border: `1px solid ${active ? color : bord}`,
    color: active ? lightColor : dim,
    borderRadius: 7,
    fontSize: fontSize - 2,
    fontWeight: active ? 700 : 400,
    letterSpacing: '0.08em',
    cursor: 'pointer',
    transition: 'all 0.15s',
    fontFamily: 'Arial',
  })

  // ── JOIN-SCREEN: Schüler noch in keinem Klassenraum ─────────
  if (classroomLoaded && !classroom) {
    return (
      <div style={{
        minHeight: '100vh', background: bg, fontFamily: 'Arial',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20,
      }}>
        <div style={{
          background: surf, border: `1px solid ${bord}`, borderRadius: 14,
          padding: '40px 36px', width: '100%', maxWidth: 420, textAlign: 'center',
        }}>
          <div style={{ fontSize: 44, marginBottom: 12 }}>🏫</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: text, marginBottom: 8 }}>
            Klassenraum beitreten
          </div>
          <div style={{ fontSize: 13, color: dim, marginBottom: 28, lineHeight: 1.6 }}>
            Gib den Code ein, den du von deinem Lehrer erhalten hast, um deinem Klassenraum beizutreten.
          </div>

          {joinError && (
            <div style={{
              background: dark ? '#2a0a0a' : '#fde8e8',
              border: `1px solid ${dark ? '#6b2200' : '#d93025'}`,
              borderRadius: 8, padding: '10px 14px',
              color: dark ? '#f87171' : '#b91c1c',
              fontSize: 13, marginBottom: 14, textAlign: 'left',
            }}>{joinError}</div>
          )}

          <input
            value={joinCode}
            onChange={e => setJoinCode(e.target.value.toUpperCase())}
            placeholder="z.B. AB12CD"
            autoFocus
            style={{
              width: '100%', background: inputBg, border: `1px solid ${bord}`,
              borderRadius: 10, padding: '14px 16px', color: text,
              fontSize: 24, fontWeight: 700, letterSpacing: '0.25em',
              fontFamily: 'monospace', outline: 'none', boxSizing: 'border-box',
              textAlign: 'center', marginBottom: 14,
            }}
            onKeyDown={e => e.key === 'Enter' && joinClassroom()}
          />

          <button onClick={joinClassroom} disabled={joinLoading || !joinCode.trim()} style={{
            width: '100%', padding: '13px 0', background: '#3b82f6',
            border: 'none', borderRadius: 10, color: '#fff',
            fontSize: 15, fontWeight: 700, cursor: 'pointer',
            letterSpacing: '0.08em', opacity: joinLoading ? 0.6 : 1,
            marginBottom: 16,
          }}>
            {joinLoading ? '…' : 'BEITRETEN'}
          </button>

          <button onClick={onLogout} style={{
            background: 'transparent', border: `1px solid ${bord}`,
            borderRadius: 8, padding: '8px 20px', cursor: 'pointer',
            color: dim, fontSize: 12,
          }}>Abmelden</button>
        </div>
      </div>
    )
  }

  // ── HAUSAUFGABEN-ANSICHT ─────────────────────────────────────
  if (hwMode && homework) {
    const ALL_VEHICLES = Object.values(DB).flat()
    const hwVehicles = ALL_VEHICLES.filter(v =>
      homework.vehicle_ids?.includes(String(v.id))
    )

    function importHomework() {
      // Hausaufgaben-IDs als selectedIds setzen und normalen Modus aktivieren
      setSelectedIds(hwVehicles.map(v => v.id))
      setActiveCat(
        // Erste passende Kategorie ermitteln oder bei aktiver bleiben
        (() => {
          if (hwVehicles.length === 0) return activeCat
          const firstId = hwVehicles[0].id
          for (const [k, arr] of Object.entries(DB)) {
            if (arr.some(v => v.id === firstId)) return k
          }
          return activeCat
        })()
      )
      setHwMode(false)
    }

    return (
      <div style={{ minHeight: '100vh', background: bg, fontFamily: 'Arial', fontSize, color: text }}>
        {/* HEADER (gleich wie oben) */}
        <div style={{ background: surf, borderBottom: `1px solid ${bord}`, position: 'sticky', top: 0, zIndex: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', flexWrap: 'wrap' }}>
            <div style={{ fontWeight: 700, fontSize: fontSize - 1, color: '#22c55e', letterSpacing: '0.08em', flexShrink: 0 }}>🪖 TAKTIK</div>
            <div style={{ flex: 1 }} />
            {user?.name && <span style={{ fontSize: fontSize - 3, color: dim }}>{user.name}</span>}
            <button onClick={onLogout} style={{ ...btn(false, bord, dim), padding: '5px 10px', fontSize: fontSize - 3 }}>Abmelden</button>
          </div>
          <div style={{ display: 'flex', overflowX: 'auto', borderTop: `1px solid ${bord}` }}>
            {Object.entries(CATS).map(([k, v]) => (
              <button key={k} onClick={() => { setActiveCat(k); setHwMode(false) }} style={{
                flex: '0 0 auto', padding: '8px 10px',
                background: 'transparent', border: 'none', borderBottom: '2px solid transparent',
                color: dim, fontSize: fontSize - 3, cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'Arial',
              }}>
                {v.label}<br /><span style={{ fontSize: fontSize - 5, opacity: 0.6 }}>{v.sub}</span>
              </button>
            ))}
            <button style={{
              flex: '0 0 auto', padding: '8px 10px',
              background: '#22c55e22', border: 'none', borderBottom: '2px solid #22c55e',
              color: '#22c55e', fontSize: fontSize - 3, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'Arial',
            }}>
              📋 {homework.title}<br />
              <span style={{ fontSize: fontSize - 5, opacity: 0.6 }}>{hwVehicles.length} Fzg.</span>
            </button>
          </div>
        </div>

        {/* INHALT */}
        <div style={{ maxWidth: 680, margin: '0 auto', padding: '20px 14px 80px' }}>
          {/* Titel + Importieren */}
          <div style={{
            background: surf, border: `1px solid ${bord}`, borderRadius: 12,
            padding: '20px 20px', marginBottom: 16,
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: fontSize - 3, color: '#22c55e', letterSpacing: '0.12em', marginBottom: 4 }}>
                  HAUSAUFGABE · {classroom?.name}
                </div>
                <div style={{ fontSize: fontSize + 2, fontWeight: 700, color: text }}>
                  {homework.title}
                </div>
                <div style={{ fontSize: fontSize - 2, color: dim, marginTop: 4 }}>
                  {hwVehicles.length} Fahrzeuge zugewiesen
                </div>
              </div>
              <button onClick={importHomework} style={{
                padding: '10px 20px', background: '#22c55e',
                border: 'none', borderRadius: 10, color: '#fff',
                fontSize: fontSize - 1, fontWeight: 700, cursor: 'pointer',
                letterSpacing: '0.06em', whiteSpace: 'nowrap',
              }}>
                ▶ IMPORTIEREN
              </button>
            </div>
            <div style={{
              marginTop: 14, padding: '10px 14px',
              background: dark ? '#0d2a1a' : '#f0fdf4',
              border: `1px solid ${dark ? '#1e5f3e' : '#86efac'}`,
              borderRadius: 8, fontSize: fontSize - 3, color: dark ? '#4ade80' : '#166534',
            }}>
              💡 Mit <strong>IMPORTIEREN</strong> werden nur diese Fahrzeuge in der Auswahl aktiviert — du kannst sie dann im Lernkarten- oder Quiz-Modus üben.
            </div>
          </div>

          {/* Fahrzeugliste */}
          <div style={{ fontSize: fontSize - 3, color: dim, letterSpacing: '0.1em', marginBottom: 10 }}>
            FAHRZEUGE IN DIESER HAUSAUFGABE
          </div>
          {hwVehicles.length === 0 ? (
            <div style={{
              background: surf, border: `1px solid ${bord}`, borderRadius: 10,
              padding: '24px', textAlign: 'center', color: dim, fontSize: fontSize - 1,
            }}>
              Keine Fahrzeuge in dieser Hausaufgabe gefunden.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {hwVehicles.map((v, i) => {
                // Kategorie ermitteln
                const catKey = Object.entries(DB).find(([, arr]) => arr.some(x => x.id === v.id))?.[0]
                const catInfo = catKey ? CATS[catKey] : null
                return (
                  <div key={v.id} style={{
                    background: surf, border: `1px solid ${bord}`, borderRadius: 8,
                    padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 12,
                  }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%',
                      background: catInfo ? catInfo.color + '30' : bord,
                      border: `1px solid ${catInfo ? catInfo.color + '60' : bord}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: fontSize - 4, fontWeight: 700,
                      color: catInfo ? catInfo.light : dim, flexShrink: 0,
                    }}>
                      {i + 1}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: fontSize - 1, fontWeight: 600, color: text }}>
                        {v.flag} {v.name}
                      </div>
                      <div style={{ fontSize: fontSize - 4, color: dim, marginTop: 1 }}>
                        {v.nation}{catInfo ? ` · ${catInfo.label}` : ''}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    )
  }

  if (!pool.length || !cur) {
    return (
      <div style={{ minHeight: '100vh', background: bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, fontFamily: 'Arial', fontSize }}>
        <div style={{ color: text, fontWeight: 700, fontSize: fontSize + 1 }}>Keine Fahrzeuge für diese Auswahl.</div>
        <div style={{ color: dim, fontSize: fontSize - 2 }}>Für diese Kategorie sind noch keine Fahrzeuge eingetragen.</div>
        <button
          onClick={() => setSuperCat('russia')}
          style={{ marginTop: 8, padding: '10px 24px', background: '#1e3a5f', border: '1px solid #2d5080', borderRadius: 8, color: '#7eb8f0', fontSize, fontWeight: 700, cursor: 'pointer', fontFamily: 'Arial' }}
        >
          ← Zurück zu Russland/GUS
        </button>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: bg, fontFamily: 'Arial', fontSize, color: text, position: 'relative' }}>

      {showSidebar && (
        <div onClick={() => setShowSidebar(false)}
          style={{ position: 'fixed', inset: 0, background: '#00000080', zIndex: 40 }} />
      )}

      {/* SIDEBAR */}
      <div style={{
        position: 'fixed', top: 0, left: showSidebar ? 0 : '-320px', bottom: 0,
        width: 300, background: surf, borderRight: `1px solid ${bord}`,
        zIndex: 50, transition: 'left 0.2s ease', overflowY: 'auto', display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ padding: '16px', borderBottom: `1px solid ${bord}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: 700, fontSize: fontSize - 1, color: text, letterSpacing: '0.06em' }}>FAHRZEUG-AUSWAHL</div>
          <button onClick={() => setShowSidebar(false)} style={{ background: 'none', border: 'none', color: dim, fontSize: 20, cursor: 'pointer', lineHeight: 1 }}>×</button>
        </div>
        <div style={{ padding: '10px 16px', borderBottom: `1px solid ${bord}`, display: 'flex', gap: 8 }}>
          <button onClick={() => setSelectedIds(null)} style={{ ...btn(!selectedIds, tc, tl), flex: 1, fontSize: fontSize - 3 }}>ALLE</button>
          <button onClick={() => { const base = getFilteredVehicles(activeCat, superCat); setSelectedIds(selectedIds ? null : base.map(v => v.id)) }}
            style={{ ...btn(false, bord, dim), flex: 1, fontSize: fontSize - 3 }}>AUFHEBEN</button>
        </div>
        <div style={{ flex: 1, padding: '8px 0' }}>
          {getFilteredVehicles(activeCat, superCat).map(v => {
            const sel = !selectedIds || selectedIds.includes(v.id)
            return (
              <div key={v.id} onClick={() => {
                if (!selectedIds) {
                  const all = getFilteredVehicles(activeCat, superCat).map(x => x.id).filter(id => id !== v.id)
                  setSelectedIds(all.length ? all : null)
                } else {
                  const next = sel ? selectedIds.filter(id => id !== v.id) : [...selectedIds, v.id]
                  setSelectedIds(next.length ? next : null)
                }
              }} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '8px 16px', cursor: 'pointer',
                background: sel ? tc + '10' : 'transparent',
                borderLeft: `3px solid ${sel ? tc : 'transparent'}`,
                transition: 'all 0.12s',
              }}>
                <div style={{
                  width: 16, height: 16, borderRadius: 4,
                  border: `2px solid ${sel ? tc : bord}`,
                  background: sel ? tc : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  {sel && <span style={{ color: '#fff', fontSize: 10, lineHeight: 1 }}>✓</span>}
                </div>
                <span style={{ fontSize: fontSize - 2, color: sel ? tl : dim }}>{v.flag} {v.name}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* HEADER */}
      <div style={{ background: surf, borderBottom: `1px solid ${bord}`, position: 'sticky', top: 0, zIndex: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', flexWrap: 'wrap' }}>
          <div style={{ fontWeight: 700, fontSize: fontSize - 1, color: tl, letterSpacing: '0.08em', flexShrink: 0 }}>🪖 TAKTIK</div>
          <div style={{ display: 'flex', gap: 4, marginLeft: 4 }}>
            {Object.entries(SUPER_CATS).map(([k, v]) => (
              <button key={k} onClick={() => setSuperCat(k)} title={v.label} style={{
                ...btn(superCat === k, '#4a6080', '#90b8d8'),
                padding: '5px 10px', fontSize: fontSize - 3,
                opacity: v.nations.length === 0 && k !== 'russia' ? 0.4 : 1,
              }}>
                {v.emoji} {v.label}
              </button>
            ))}
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <button onClick={() => setFontSize(f => Math.max(14, f - 1))} style={{ ...btn(false, bord, dim), padding: '4px 8px', fontSize: 12 }}>A−</button>
            <button onClick={() => setFontSize(f => Math.min(17, f + 1))} style={{ ...btn(false, bord, dim), padding: '4px 8px', fontSize: 14 }}>A+</button>
          </div>
          <button onClick={() => setDark(d => !d)} style={{ ...btn(false, bord, dim), padding: '5px 10px', fontSize: fontSize - 1 }}>
            {dark ? '☀️' : '🌙'}
          </button>
          {user?.name && <span style={{ fontSize: fontSize - 3, color: dim }}>{user.name}</span>}
          <button onClick={onLogout} style={{ ...btn(false, bord, dim), padding: '5px 10px', fontSize: fontSize - 3 }}>Abmelden</button>
        </div>
        <div style={{ display: 'flex', overflowX: 'auto', borderTop: `1px solid ${bord}` }}>
          {Object.entries(CATS).map(([k, v]) => (
            <button key={k} onClick={() => { setActiveCat(k); setHwMode(false) }} style={{
              flex: '0 0 auto', padding: '8px 10px',
              background: !hwMode && activeCat === k ? v.color + '22' : 'transparent',
              border: 'none', borderBottom: `2px solid ${!hwMode && activeCat === k ? v.color : 'transparent'}`,
              color: !hwMode && activeCat === k ? v.light : dim,
              fontSize: fontSize - 3, fontWeight: !hwMode && activeCat === k ? 700 : 400,
              letterSpacing: '0.06em', cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'Arial',
            }}>
              {v.label}<br />
              <span style={{ fontSize: fontSize - 5, opacity: 0.6 }}>{v.sub}</span>
            </button>
          ))}
          {/* Hausaufgaben-Tab */}
          {homework && (
            <button onClick={() => setHwMode(true)} style={{
              flex: '0 0 auto', padding: '8px 10px',
              background: hwMode ? '#22c55e22' : 'transparent',
              border: 'none', borderBottom: `2px solid ${hwMode ? '#22c55e' : 'transparent'}`,
              color: hwMode ? '#22c55e' : dim,
              fontSize: fontSize - 3, fontWeight: hwMode ? 700 : 400,
              letterSpacing: '0.06em', cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'Arial',
            }}>
              📋 {homework.title}<br />
              <span style={{ fontSize: fontSize - 5, opacity: 0.6 }}>{homework.vehicle_ids?.length} Fzg.</span>
            </button>
          )}
          {/* Klasse beitreten */}
          {!classroom && user?.userId && (
            <button onClick={() => setShowJoin(true)} style={{
              flex: '0 0 auto', padding: '8px 10px',
              background: 'transparent', border: 'none',
              borderBottom: '2px solid transparent',
              color: dim, fontSize: fontSize - 3, cursor: 'pointer',
              whiteSpace: 'nowrap', fontFamily: 'Arial', opacity: 0.6,
            }}>
              + Klasse beitreten
            </button>
          )}
          {classroom && !homework && (
            <span style={{
              flex: '0 0 auto', padding: '8px 10px', color: dim,
              fontSize: fontSize - 4, display: 'flex', alignItems: 'center',
            }}>
              🏫 {classroom.name}
            </span>
          )}
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div style={{ height: 2, background: dark ? '#0d1117' : '#e0e8f0' }}>
        <div style={{ height: '100%', width: `${((idx + 1) / pool.length * 100).toFixed(1)}%`, background: tc, transition: 'width 0.3s' }} />
      </div>

      {/* MAIN */}
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '12px 14px 100px' }}>

        {/* Controls */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <button style={{ ...btn(mode === 'flash', tc, tl) }} onClick={() => { setMode('flash'); setChosen(null); setRevealed(false) }}>◧ LERNKARTE</button>
          <button
            style={{ ...btn(mode === 'quiz', tc, tl), opacity: !poolHasImages ? 0.45 : 1 }}
            onClick={() => { if (poolHasImages) { setMode('quiz'); setChosen(null); setRevealed(false) } }}
            title={!poolHasImages ? 'Bilder noch nicht verfügbar (Phase 2)' : ''}
          >◉ BILD-QUIZ</button>
          <button style={{ ...btn(shuffle, tc, tl), fontSize: fontSize - 1 }} onClick={() => setShuffle(s => !s)} title="Reihenfolge mischen">⇌</button>
          <button onClick={() => setShowSidebar(true)} style={{ ...btn(!!selectedIds, '#4a6080', '#90b8d8'), display: 'flex', alignItems: 'center', gap: 5 }}>
            ☑ Auswahl {selectedIds ? `(${selectedIds.length})` : `(alle)`}
          </button>
          <div style={{ flex: 1 }} />
          {score.t > 0 && (
            <div style={{
              background: pct >= 70 ? ansCorrect.bg : ansWrong.bg,
              border: `1px solid ${pct >= 70 ? ansCorrect.border : ansWrong.border}`,
              borderRadius: 7, padding: '4px 12px', textAlign: 'center',
            }}>
              <span style={{ fontSize: fontSize - 1, fontWeight: 700, color: pct >= 70 ? ansCorrect.col : ansWrong.col }}>{pct}%</span>
              <span style={{ fontSize: fontSize - 4, color: dim, marginLeft: 5 }}>{score.c}/{score.t}</span>
            </div>
          )}
          <button onClick={() => setScore({ c: 0, t: 0 })} style={{ ...btn(false, bord, dim), padding: '5px 8px' }} title="Score zurücksetzen">↺</button>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <button onClick={() => goTo(idx - 1)} style={{ ...btn(false, bord, dim), padding: '7px 16px', fontSize: fontSize - 1 }}>← Zurück</button>
          <div style={{ color: dim, fontSize: fontSize - 3, letterSpacing: '0.1em' }}>{idx + 1} / {pool.length}</div>
          <button onClick={() => goTo(idx + 1)} style={{ ...btn(false, tc, tl), padding: '7px 16px', fontSize: fontSize - 1 }}>Weiter →</button>
        </div>

        {/* CARD */}
        <div className="fade-in" key={cur.id} style={{
          background: surf, border: `1px solid ${bord}`, borderRadius: 12, overflow: 'hidden', marginBottom: 14,
        }}>
          {/* Card header */}
          <div style={{
            background: tc + '18', borderBottom: `1px solid ${tc + '40'}`,
            padding: '10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div>
              <div style={{ fontSize: fontSize - 4, color: dim, letterSpacing: '0.14em' }}>
                {cat.label.toUpperCase()} · {cat.sub}
              </div>
              <div style={{ fontSize: fontSize + 2, fontWeight: 700, color: text, letterSpacing: '0.05em', marginTop: 2 }}>
                {mode === 'quiz' && chosen === null ? '???' : cur.name}
                {(mode !== 'quiz' || chosen !== null) && (
                  <span style={{ fontSize: fontSize - 1, marginLeft: 8, opacity: 0.7 }}>{cur.flag}</span>
                )}
              </div>
              {(mode !== 'quiz' || chosen !== null) && (
                <div style={{ fontSize: fontSize - 3, color: dim, marginTop: 2 }}>{cur.nation}</div>
              )}
            </div>
            <a href={getRecomonkeyUrl(cur, activeCat)} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: fontSize - 3, color: tl, opacity: 0.7, textDecoration: 'none', border: `1px solid ${tc}40`, borderRadius: 6, padding: '4px 8px', whiteSpace: 'nowrap' }}
              title="Auf Recomonkey ansehen">📷 Reco</a>
          </div>

          {/* Image */}
          <div style={{
            background: dark ? '#060810' : '#e8eef4',
            minHeight: hasImages ? 'auto' : 100,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', flexDirection: 'column',
          }}>
            {hasImages ? (
              <>
                <div style={{ position: 'relative', width: '100%' }}>
                  <img src={cur.images[imgIdx % cur.images.length]} alt={cur.name}
                    style={{ width: '100%', maxHeight: 320, objectFit: 'contain', display: 'block' }}
                    onError={e => { e.target.style.display = 'none' }} />
                  {cur.images.length > 1 && (<>
                    <button onClick={() => setImgIdx(i => ((i - 1 + cur.images.length) % cur.images.length))}
                      style={{
                        position: 'absolute', left: 6, top: '50%', transform: 'translateY(-50%)',
                        background: 'rgba(0,0,0,0.45)', border: 'none', borderRadius: '50%',
                        width: 32, height: 32, color: '#fff', fontSize: 18, cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1,
                      }}>‹</button>
                    <button onClick={() => setImgIdx(i => (i + 1) % cur.images.length)}
                      style={{
                        position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)',
                        background: 'rgba(0,0,0,0.45)', border: 'none', borderRadius: '50%',
                        width: 32, height: 32, color: '#fff', fontSize: 18, cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1,
                      }}>›</button>
                  </>)}
                </div>
                {cur.images.length > 1 && (
                  <div style={{ display: 'flex', gap: 6, padding: 8 }}>
                    {cur.images.map((_, i) => (
                      <button key={i} onClick={() => setImgIdx(i)} style={{
                        width: 8, height: 8, borderRadius: '50%', border: 'none',
                        background: i === imgIdx % cur.images.length ? tl : dim,
                        cursor: 'pointer', padding: 0,
                      }} />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div style={{ padding: '16px 20px', textAlign: 'center' }}>
                <div style={{ fontSize: 28, marginBottom: 6, opacity: 0.25 }}>📷</div>
                <div style={{ fontSize: fontSize - 3, color: dim }}>Bilder folgen in Phase 2</div>
                <a href={getRecomonkeyUrl(cur, activeCat)} target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: fontSize - 3, color: tl, marginTop: 4, display: 'inline-block' }}>
                  → Auf Recomonkey ansehen
                </a>
              </div>
            )}
          </div>

          {/* QUIZ */}
          {mode === 'quiz' && (
            <div style={{ padding: '14px 16px', borderTop: `1px solid ${bord}` }}>
              {!poolHasImages ? (
                <div style={{
                  background: dark ? '#12181f' : '#f0f4f8',
                  border: `1px solid ${bord}`, borderRadius: 8,
                  padding: '14px 16px', textAlign: 'center',
                  fontSize: fontSize - 2, color: dim,
                }}>
                  Das Bild-Quiz ist verfügbar sobald Fahrzeugbilder geladen sind (Phase 2).
                  <br />
                  <a href={getRecomonkeyUrl(cur, activeCat)} target="_blank" rel="noopener noreferrer"
                    style={{ color: tl, marginTop: 6, display: 'inline-block' }}>
                    → Fahrzeug auf Recomonkey ansehen
                  </a>
                </div>
              ) : (
                <>
                  <div style={{ fontSize: fontSize - 4, color: dim, letterSpacing: '0.1em', marginBottom: 10 }}>
                    WELCHES FAHRZEUG IST ABGEBILDET?
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    {opts.map(o => {
                      const isCorrect = o.id === cur.id
                      const isPicked  = chosen === o.id
                      const showResult = chosen !== null
                      let bg2 = surf, border2 = bord, col2 = text
                      if (showResult && isCorrect)              { bg2 = ansCorrect.bg; border2 = ansCorrect.border; col2 = ansCorrect.col }
                      if (showResult && isPicked && !isCorrect) { bg2 = ansWrong.bg;   border2 = ansWrong.border;   col2 = ansWrong.col }
                      return (
                        <button key={o.id} onClick={() => pick(o.id)} style={{
                          background: bg2, border: `1px solid ${border2}`, borderRadius: 8,
                          padding: '10px 12px', color: col2, fontSize: fontSize - 2,
                          fontWeight: (showResult && isCorrect) ? 700 : 400,
                          textAlign: 'left', cursor: chosen !== null ? 'default' : 'pointer',
                          transition: 'all 0.15s', fontFamily: 'Arial',
                        }}>
                          {o.flag} {o.name}
                        </button>
                      )
                    })}
                  </div>
                  {chosen !== null && (
                    <div style={{ marginTop: 12, fontSize: fontSize - 2, fontWeight: 700,
                      color: chosen === cur.id ? ansCorrect.col : ansWrong.col }}>
                      {chosen === cur.id ? '✓ Richtig!' : `✗ Falsch — es war: ${cur.name}`}
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* FLASHCARD */}
          {mode === 'flash' && (
            <div style={{ padding: '14px 16px', borderTop: `1px solid ${bord}` }}>
              {!revealed ? (
                <>
                  <div style={{ fontSize: fontSize - 4, color: dim, letterSpacing: '0.1em', marginBottom: 10 }}>
                    KURZERKENNUNGSMERKMAL
                  </div>
                  <div style={{
                    background: tc + '15', border: `1px solid ${tc + '40'}`, borderRadius: 8,
                    padding: '12px 14px', fontSize: fontSize - 1, fontWeight: 700,
                    color: tl, letterSpacing: '0.04em', marginBottom: 12,
                  }}>
                    {cur.s}
                  </div>
                  <button onClick={() => setRevealed(true)}
                    style={{ ...btn(false, tc, tl), width: '100%', padding: '10px 0', justifyContent: 'center' }}>
                    Alle Merkmale anzeigen
                  </button>
                </>
              ) : (
                <>
                  <div style={{ fontSize: fontSize - 4, color: dim, letterSpacing: '0.1em', marginBottom: 10 }}>
                    ERKENNUNGSMERKMALE
                  </div>
                  {cur.m.map((feat, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                      <div style={{
                        width: 22, height: 22, borderRadius: '50%', background: tc,
                        color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: fontSize - 4, fontWeight: 700, flexShrink: 0, marginTop: 1,
                      }}>{i + 1}</div>
                      <div style={{ fontSize: fontSize - 1, color: text, lineHeight: 1.5 }}>{feat}</div>
                    </div>
                  ))}
                  {/* Lehrer-Notizen */}
                  {(teacherNotes[cur.id] || []).length > 0 && (
                    <>
                      <div style={{ fontSize: fontSize - 4, color: '#f59e0b', letterSpacing: '0.1em', marginBottom: 8, marginTop: 4 }}>
                        📌 ZUSATZ VOM LEHRER
                      </div>
                      {teacherNotes[cur.id].map((note, i) => (
                        <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                          <div style={{
                            width: 22, height: 22, borderRadius: '50%', background: '#f59e0b',
                            color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: fontSize - 4, fontWeight: 700, flexShrink: 0, marginTop: 1,
                          }}>★</div>
                          <div style={{ fontSize: fontSize - 1, color: text, lineHeight: 1.5 }}>{note}</div>
                        </div>
                      ))}
                    </>
                  )}
                  <button onClick={() => setRevealed(false)}
                    style={{ ...btn(false, bord, dim), marginTop: 6, width: '100%', padding: '8px 0' }}>
                    Verbergen
                  </button>
                </>
              )}

              {/* NOTIZFELD */}
              <div style={{ marginTop: 16, borderTop: `1px solid ${bord}`, paddingTop: 14 }}>
                <div style={{ fontSize: fontSize - 4, color: dim, letterSpacing: '0.1em', marginBottom: 8 }}>
                  MEINE NOTIZEN
                </div>
                <textarea
                  value={notes[cur.id] || ''}
                  onChange={e => saveNote(cur.id, e.target.value)}
                  placeholder="Eigene Notizen zu diesem Fahrzeug …"
                  rows={3}
                  style={{
                    width: '100%',
                    background: inputBg,
                    border: `1px solid ${bord}`,
                    borderRadius: 8,
                    padding: '10px 12px',
                    color: text,
                    fontSize: fontSize - 2,
                    fontFamily: 'Arial',
                    lineHeight: 1.5,
                    resize: 'vertical',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                  onFocus={e => e.target.style.borderColor = tc}
                  onBlur={e => e.target.style.borderColor = bord}
                />
              </div>
            </div>
          )}
        </div>

        {/* Bottom nav */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => goTo(idx - 1)} style={{ ...btn(false, bord, dim), flex: 1, padding: '11px 0' }}>← Zurück</button>
          {mode === 'quiz' && chosen !== null && (
            <button onClick={() => goTo(idx + 1)} style={{ ...btn(true, tc, tl), flex: 1, padding: '11px 0', fontWeight: 700 }}>Weiter →</button>
          )}
          {mode === 'flash' && (
            <button onClick={() => goTo(idx + 1)} style={{ ...btn(true, tc, tl), flex: 1, padding: '11px 0', fontWeight: 700 }}>Weiter →</button>
          )}
        </div>
      </div>

      {/* JOIN-MODAL */}
      {showJoin && (
        <div style={{
          position: 'fixed', inset: 0, background: '#00000090',
          zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }} onClick={() => setShowJoin(false)}>
          <div onClick={e => e.stopPropagation()} style={{
            background: surf, border: `1px solid ${bord}`, borderRadius: 14,
            padding: '28px 28px', width: '100%', maxWidth: 360, fontFamily: 'Arial',
          }}>
            <div style={{ fontSize: 17, fontWeight: 700, color: text, marginBottom: 6 }}>
              🏫 Klassenraum beitreten
            </div>
            <div style={{ fontSize: 12, color: dim, marginBottom: 18 }}>
              Gib den Code ein, den du von deinem Lehrer erhalten hast.
            </div>
            {joinError && (
              <div style={{
                background: dark ? '#2a0a0a' : '#fde8e8', border: `1px solid ${dark ? '#6b2200' : '#d93025'}`,
                borderRadius: 8, padding: '9px 14px', color: dark ? '#f87171' : '#b91c1c',
                fontSize: 13, marginBottom: 12,
              }}>{joinError}</div>
            )}
            <input
              value={joinCode}
              onChange={e => setJoinCode(e.target.value.toUpperCase())}
              placeholder="z.B. AB12CD"
              autoFocus
              style={{
                width: '100%', background: inputBg, border: `1px solid ${bord}`,
                borderRadius: 8, padding: '12px 14px', color: text,
                fontSize: 20, fontWeight: 700, letterSpacing: '0.2em',
                fontFamily: 'monospace', outline: 'none', boxSizing: 'border-box',
                textAlign: 'center', marginBottom: 14,
              }}
              onKeyDown={e => e.key === 'Enter' && joinClassroom()}
            />
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setShowJoin(false)} style={{
                flex: 1, padding: '10px 0', background: 'transparent',
                border: `1px solid ${bord}`, borderRadius: 8, color: dim,
                fontSize: 13, cursor: 'pointer',
              }}>Abbrechen</button>
              <button onClick={joinClassroom} disabled={joinLoading || !joinCode.trim()} style={{
                flex: 2, padding: '10px 0', background: '#3b82f6',
                border: 'none', borderRadius: 8, color: '#fff',
                fontSize: 13, fontWeight: 700, cursor: 'pointer',
                opacity: joinLoading ? 0.6 : 1,
              }}>
                {joinLoading ? '…' : 'BEITRETEN'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
