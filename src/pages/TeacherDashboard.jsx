import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { DB, CATS } from '../lib/vehicles'

const BUILT_IN_VEHICLES = Object.entries(DB).flatMap(([catKey, vehicles]) =>
  vehicles.map(v => ({ ...v, catKey, cat: CATS[catKey]?.label || catKey, isBuiltIn: true }))
)

function genCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

export default function TeacherDashboard({ user, onLogout }) {
  const [dark, setDark] = useState(() => {
    try { const s = localStorage.getItem('tl_dark'); return s !== null ? JSON.parse(s) : true } catch { return true }
  })

  const [view, setView]               = useState('classrooms')
  const [classrooms, setClassrooms]   = useState([])
  const [selected, setSelected]       = useState(null)
  const [members, setMembers]         = useState([])
  const [homework, setHomework]       = useState(null)
  const [progress, setProgress]       = useState([])
  const [loading, setLoading]         = useState(false)
  const [newName, setNewName]         = useState('')
  const [creating, setCreating]       = useState(false)
  const [hwSelected, setHwSelected]   = useState(new Set())
  const [hwTitle, setHwTitle]         = useState('Hausaufgabe')
  const [hwCat, setHwCat]             = useState(null)
  const [savedMsg, setSavedMsg]       = useState('')
  const [createErr, setCreateErr]     = useState('')
  const [expandedStudent, setExpandedStudent] = useState(null)

  // Lernkarten-Tool
  const [lkVehicle, setLkVehicle]   = useState(null)
  const [lkSearch, setLkSearch]     = useState('')
  const [lkNotes, setLkNotes]       = useState([])
  const [lkImages, setLkImages]     = useState([])
  const [lkInput, setLkInput]       = useState('')
  const [lkImgInput, setLkImgInput] = useState('')
  const [lkSaving, setLkSaving]     = useState(false)
  const [lkMsg, setLkMsg]           = useState('')

  // Community-Fahrzeuge
  const [allCommunity, setAllCommunity]   = useState([])  // alle Lehrer
  const [hvList, setHvList]               = useState([])  // eigene
  const [hvEdit, setHvEdit]               = useState(null)
  const [hvSaving, setHvSaving]           = useState(false)
  const [hvMsg, setHvMsg]                 = useState('')

  const bg      = dark ? '#080b10' : '#f0f4f8'
  const surf    = dark ? '#0a0d14' : '#ffffff'
  const surf2   = dark ? '#0d1117' : '#f8fafb'
  const bord    = dark ? '#1c2430' : '#d0dce8'
  const text    = dark ? '#c0d0e0' : '#1a2a3a'
  const dim     = dark ? '#3d5060' : '#7090a0'
  const tc      = '#3b82f6'
  const inputBg = dark ? '#0d1117' : '#f8fafb'

  function toggleDark() {
    const next = !dark; setDark(next)
    try { localStorage.setItem('tl_dark', JSON.stringify(next)) } catch {}
  }

  // Alle Community-Fahrzeuge laden (für Lernkarten + Hinzufügen)
  async function loadAllCommunity() {
    const { data } = await supabase.from('community_vehicles').select('*').order('created_at', { ascending: false })
    if (data) {
      setAllCommunity(data)
      setHvList(data.filter(cv => cv.created_by === user.userId))
    }
  }

  useEffect(() => { loadClassrooms(); loadAllCommunity() }, [])

  // Alle Fahrzeuge für Lernkarten-Suche (built-in + alle community)
  const ALL_LERNKARTEN = [
    ...BUILT_IN_VEHICLES,
    ...allCommunity.map(cv => ({
      id: cv.id,
      name: cv.name,
      cat: CATS[cv.cat_key]?.label || cv.category || cv.cat_key,
      catKey: cv.cat_key,
      isCommunity: true,
      isOwn: cv.created_by === user.userId,
      features: cv.features || [],
      image_urls: cv.image_urls || [],
    }))
  ]

  // Kategorien für Hausaufgaben (built-in + community)
  const CATS_GROUPED = (() => {
    const groups = {}
    BUILT_IN_VEHICLES.forEach(v => {
      if (!groups[v.cat]) groups[v.cat] = { vehicles: [], catKey: v.catKey }
      groups[v.cat].vehicles.push(v)
    })
    allCommunity.forEach(cv => {
      const label = CATS[cv.cat_key]?.label || cv.category || cv.cat_key
      if (!groups[label]) groups[label] = { vehicles: [], catKey: cv.cat_key }
      groups[label].vehicles.push({ id: cv.id, name: cv.name, flag: '', catKey: cv.cat_key, isCommunity: true })
    })
    return groups
  })()

  async function loadClassrooms() {
    setLoading(true)
    const { data } = await supabase.from('classrooms').select('*').eq('teacher_id', user.userId).order('created_at', { ascending: false })
    setClassrooms(data || [])
    setLoading(false)
  }

  async function loadClassroomDetail(classroom) {
    setSelected(classroom); setView('classroom-detail'); setHwCat(null); setLoading(true)
    const { data: mems } = await supabase.from('classroom_members')
      .select('student_id, joined_at, profiles(display_name)').eq('classroom_id', classroom.id)
    setMembers(mems || [])
    const { data: hw } = await supabase.from('homework').select('*')
      .eq('classroom_id', classroom.id).order('created_at', { ascending: false }).limit(1).single()
    setHomework(hw || null)
    if (hw) { setHwSelected(new Set(hw.vehicle_ids)); setHwTitle(hw.title) }
    else { setHwSelected(new Set()); setHwTitle('Hausaufgabe') }
    if (mems?.length > 0) {
      const { data: prog } = await supabase.from('student_progress').select('*').in('student_id', mems.map(m => m.student_id))
      setProgress(prog || [])
    } else setProgress([])
    setLoading(false)
  }

  async function refreshProgress() {
    if (!members.length) return
    setLoading(true)
    const { data: prog } = await supabase.from('student_progress').select('*').in('student_id', members.map(m => m.student_id))
    setProgress(prog || [])
    setLoading(false)
  }

  // Lernkarten-Tool: Daten laden (notes + images)
  async function loadLkData(vehicleId) {
    const { data } = await supabase.from('teacher_vehicle_notes').select('notes, images')
      .eq('teacher_id', user.userId).eq('vehicle_id', String(vehicleId)).single()
    setLkNotes(data?.notes || [])
    setLkImages(data?.images || [])
  }

  // Lernkarten-Tool: Daten speichern (notes + images)
  async function saveLkData(vehicleId, notes, images) {
    setLkSaving(true)
    const { error } = await supabase.from('teacher_vehicle_notes').upsert(
      { teacher_id: user.userId, vehicle_id: String(vehicleId), notes, images, updated_at: new Date().toISOString() },
      { onConflict: 'teacher_id,vehicle_id' }
    )
    setLkSaving(false)
    setLkMsg(error ? '❌ Fehler beim Speichern' : '✅ Gespeichert')
    setTimeout(() => setLkMsg(''), 2500)
    if (!error) { setLkNotes(notes); setLkImages(images) }
  }

  async function saveHv(hv) {
    setHvSaving(true)
    let error
    if (hv.id) {
      const { error: e } = await supabase.from('community_vehicles').update(
        { name: hv.name, category: hv.category, cat_key: hv.cat_key, features: hv.features, image_urls: hv.image_urls, updated_at: new Date().toISOString() }
      ).eq('id', hv.id)
      error = e
    } else {
      const { error: e } = await supabase.from('community_vehicles').insert(
        { created_by: user.userId, name: hv.name, category: hv.category, cat_key: hv.cat_key, features: hv.features, image_urls: hv.image_urls }
      )
      error = e
    }
    setHvSaving(false)
    if (error) { setHvMsg('❌ ' + error.message); return }
    setHvMsg('✅ Gespeichert!')
    setTimeout(() => setHvMsg(''), 2000)
    await loadAllCommunity()
    setHvEdit(null)
  }

  async function deleteHv(id) {
    if (!window.confirm('Lernkarte wirklich löschen?')) return
    await supabase.from('community_vehicles').delete().eq('id', id)
    await loadAllCommunity()
  }

  async function createClassroom() {
    if (!newName.trim()) return
    setCreating(true); setCreateErr('')
    try {
      const { data: sessionData } = await supabase.auth.getSession()
      if (!sessionData?.session) { setCreateErr('Sitzung abgelaufen.'); setCreating(false); return }
      const { data, error } = await supabase.from('classrooms').insert({
        teacher_id: sessionData.session.user.id, name: newName.trim(), code: genCode(),
      }).select().single()
      if (error) { setCreateErr(`Fehler: ${error.message}`); setCreating(false); return }
      setNewName('')
      if (data) setClassrooms(prev => [data, ...prev])
    } catch (e) { setCreateErr(`Fehler: ${e.message}`) }
    setCreating(false)
  }

  async function deleteClassroom(id) {
    if (!window.confirm('Klassenraum wirklich löschen?')) return
    await supabase.from('classrooms').delete().eq('id', id)
    setClassrooms(prev => prev.filter(c => c.id !== id))
  }

  async function saveHomework() {
    const ids = Array.from(hwSelected).map(String)
    if (!ids.length) { setSavedMsg('⚠ Kein Fahrzeug ausgewählt.'); return }
    setLoading(true)
    if (homework) {
      const { error } = await supabase.from('homework').update({ vehicle_ids: ids, title: hwTitle, updated_at: new Date().toISOString() }).eq('id', homework.id)
      if (error) { setSavedMsg('⚠ ' + error.message); setLoading(false); return }
    } else {
      const { error } = await supabase.from('homework').insert({ classroom_id: selected.id, vehicle_ids: ids, title: hwTitle })
      if (error) { setSavedMsg('⚠ ' + error.message); setLoading(false); return }
      const { data: hw } = await supabase.from('homework').select('*').eq('classroom_id', selected.id).order('created_at', { ascending: false }).limit(1).single()
      if (hw) setHomework(hw)
    }
    setLoading(false)
    setSavedMsg('✅ Hausaufgabe übermittelt!')
    setTimeout(() => setSavedMsg(''), 4000)
  }

  function toggleVehicle(id) {
    setHwSelected(prev => { const n = new Set(prev); n.has(String(id)) ? n.delete(String(id)) : n.add(String(id)); return n })
  }

  function toggleAllInCat(cat) {
    const ids = (CATS_GROUPED[cat]?.vehicles || []).map(v => String(v.id))
    const allSel = ids.every(id => hwSelected.has(id))
    setHwSelected(prev => { const n = new Set(prev); ids.forEach(id => allSel ? n.delete(id) : n.add(id)); return n })
  }

  function studentStats(studentId) {
    const entries = progress.filter(p => p.student_id === studentId)
    const total = entries.reduce((s, p) => s + p.attempts, 0)
    const correct = entries.reduce((s, p) => s + p.correct, 0)
    return { vehicles: entries.length, total, correct, pct: total > 0 ? Math.round(correct / total * 100) : 0 }
  }

  function studentCatStats(studentId) {
    const byCat = {}
    Object.entries(CATS).forEach(([key, catObj]) => { byCat[key] = { label: catObj.label || key, attempts: 0, correct: 0 } })
    progress.filter(p => p.student_id === studentId).forEach(p => {
      const vehicle = BUILT_IN_VEHICLES.find(v => v.id === Number(p.vehicle_id))
      if (!vehicle) return
      if (!byCat[vehicle.catKey]) byCat[vehicle.catKey] = { label: vehicle.cat, attempts: 0, correct: 0 }
      byCat[vehicle.catKey].attempts += p.attempts
      byCat[vehicle.catKey].correct += p.correct
    })
    return byCat
  }

  function ClassroomHeader() {
    return (
      <>
        <div style={{ background: dark ? '#0f1f35' : '#e8f0fe', border: `1px solid ${tc}40`, borderRadius: 12, padding: '14px 20px', marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 11, color: tc, letterSpacing: '0.1em', marginBottom: 3 }}>KLASSEN-CODE</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: tc, fontFamily: 'monospace', letterSpacing: '0.2em' }}>{selected.code}</div>
          </div>
          <button onClick={() => navigator.clipboard.writeText(selected.code)} style={{ background: tc, border: 'none', borderRadius: 8, padding: '10px 16px', color: '#fff', cursor: 'pointer', fontWeight: 700, fontSize: 13 }}>📋 Code kopieren</button>
        </div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {[{ key: 'classroom-detail', label: '👥 Schüler & Fortschritt' }, { key: 'homework', label: '📝 Hausaufgaben' }].map(t => (
            <button key={t.key} onClick={() => { setView(t.key); setHwCat(null) }} style={{ padding: '9px 18px', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: 13, background: view === t.key ? tc : 'transparent', color: view === t.key ? '#fff' : dim, border: `1px solid ${view === t.key ? tc : bord}` }}>
              {t.label}
            </button>
          ))}
        </div>
      </>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: bg, fontFamily: 'Arial', color: text }}>

      {/* Topbar */}
      <div style={{ background: surf, borderBottom: `1px solid ${bord}`, padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 52, position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {view !== 'classrooms' && (
            <button onClick={() => { setView('classrooms'); setLkVehicle(null); setLkSearch('') }} style={{ background: 'transparent', border: `1px solid ${bord}`, borderRadius: 7, padding: '5px 12px', cursor: 'pointer', color: dim, fontSize: 13 }}>← Zurück</button>
          )}
          <span style={{ fontWeight: 700, fontSize: 15, letterSpacing: '0.07em' }}>LEHRER-DASHBOARD</span>
          {selected && (view === 'classroom-detail' || view === 'homework') && (
            <span style={{ color: tc, fontSize: 13 }}>— {selected.name}</span>
          )}
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button onClick={() => setView('lernkarten')} style={{ background: view === 'lernkarten' ? tc + '22' : 'transparent', border: `1px solid ${view === 'lernkarten' ? tc : bord}`, borderRadius: 7, padding: '5px 12px', cursor: 'pointer', color: view === 'lernkarten' ? tc : dim, fontSize: 12 }}>📝 Lernkarten</button>
          <button onClick={() => { setView('hinzufuegen'); loadAllCommunity() }} style={{ background: view === 'hinzufuegen' ? tc + '22' : 'transparent', border: `1px solid ${view === 'hinzufuegen' ? tc : bord}`, borderRadius: 7, padding: '5px 12px', cursor: 'pointer', color: view === 'hinzufuegen' ? tc : dim, fontSize: 12 }}>➕ Hinzufügen</button>
          <span style={{ fontSize: 12, color: dim }}>{user.name}</span>
          <button onClick={toggleDark} style={{ background: 'transparent', border: `1px solid ${bord}`, borderRadius: 7, padding: '4px 9px', cursor: 'pointer', color: dim, fontSize: 14 }}>{dark ? '☀️' : '🌙'}</button>
          <button onClick={onLogout} style={{ background: 'transparent', border: `1px solid ${bord}`, borderRadius: 7, padding: '5px 12px', cursor: 'pointer', color: dim, fontSize: 12 }}>ABMELDEN</button>
        </div>
      </div>

      <div style={{ padding: '24px 20px', maxWidth: 900, margin: '0 auto' }}>

        {/* ── KLASSENRAUM-ÜBERSICHT ── */}
        {view === 'classrooms' && (
          <>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Meine Klassenräume</div>
              <div style={{ fontSize: 13, color: dim }}>Erstelle Klassenräume und teile den Code mit deinen Schülern.</div>
            </div>
            {createErr && <div style={{ background: dark ? '#2a0a0a' : '#fde8e8', border: `1px solid ${dark ? '#6b2200' : '#d93025'}`, borderRadius: 10, padding: '12px 16px', color: dark ? '#f87171' : '#b91c1c', fontSize: 13, marginBottom: 14 }}>⚠ {createErr}</div>}
            <div style={{ background: surf, border: `1px solid ${bord}`, borderRadius: 12, padding: '18px 20px', marginBottom: 20, display: 'flex', gap: 10 }}>
              <input style={{ flex: 1, background: inputBg, border: `1px solid ${bord}`, borderRadius: 8, padding: '10px 14px', color: text, fontSize: 14, outline: 'none', fontFamily: 'Arial' }}
                placeholder="Klassenraum-Name" value={newName} onChange={e => setNewName(e.target.value)} onKeyDown={e => e.key === 'Enter' && createClassroom()} />
              <button onClick={createClassroom} disabled={creating || !newName.trim()} style={{ background: tc, border: 'none', borderRadius: 8, padding: '10px 20px', color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer', opacity: creating ? 0.6 : 1 }}>
                {creating ? '…' : '+ ERSTELLEN'}
              </button>
            </div>
            {loading ? <div style={{ textAlign: 'center', color: dim, padding: 40 }}>Laden …</div>
              : classrooms.length === 0 ? <div style={{ background: surf, border: `1px solid ${bord}`, borderRadius: 12, padding: 40, textAlign: 'center', color: dim }}>Noch keine Klassenräume erstellt.</div>
              : <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {classrooms.map(c => (
                  <div key={c.id} style={{ background: surf, border: `1px solid ${bord}`, borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
                    onClick={() => loadClassroomDetail(c)}
                    onMouseEnter={e => e.currentTarget.style.borderColor = tc}
                    onMouseLeave={e => e.currentTarget.style.borderColor = bord}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{c.name}</div>
                      <div style={{ fontSize: 12, color: dim }}>Code: <span style={{ color: tc, fontWeight: 700, fontFamily: 'monospace', fontSize: 14 }}>{c.code}</span></div>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={e => { e.stopPropagation(); navigator.clipboard.writeText(c.code) }} style={{ background: 'transparent', border: `1px solid ${bord}`, borderRadius: 7, padding: '6px 12px', cursor: 'pointer', color: dim, fontSize: 12 }}>📋 Kopieren</button>
                      <button onClick={e => { e.stopPropagation(); deleteClassroom(c.id) }} style={{ background: 'transparent', border: `1px solid ${dark ? '#6b2200' : '#fca5a5'}`, borderRadius: 7, padding: '6px 12px', cursor: 'pointer', color: dark ? '#f87171' : '#b91c1c', fontSize: 12 }}>🗑</button>
                    </div>
                  </div>
                ))}
              </div>}
          </>
        )}

        {/* ── SCHÜLER & FORTSCHRITT ── */}
        {view === 'classroom-detail' && selected && (
          <>
            <ClassroomHeader />
            {loading ? <div style={{ textAlign: 'center', color: dim, padding: 40 }}>Laden …</div>
              : members.length === 0 ? <div style={{ background: surf, border: `1px solid ${bord}`, borderRadius: 12, padding: 40, textAlign: 'center', color: dim }}>Noch keine Schüler beigetreten.</div>
              : <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                  <div style={{ fontSize: 12, color: dim }}>{members.length} Schüler</div>
                  <button onClick={refreshProgress} style={{ padding: '5px 12px', borderRadius: 7, border: `1px solid ${bord}`, background: 'transparent', color: dim, fontSize: 12, cursor: 'pointer' }}>🔄 Aktualisieren</button>
                </div>
                {members.map(m => {
                  const stats = studentStats(m.student_id)
                  const catStats = studentCatStats(m.student_id)
                  const isOpen = expandedStudent === m.student_id
                  return (
                    <div key={m.student_id} style={{ background: surf, border: `1px solid ${isOpen ? tc : bord}`, borderRadius: 10, overflow: 'hidden' }}>
                      <div onClick={() => setExpandedStudent(isOpen ? null : m.student_id)} style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 14 }}>{m.profiles?.display_name || 'Unbekannt'}</div>
                          <div style={{ fontSize: 11, color: dim, marginTop: 3 }}>Beigetreten: {new Date(m.joined_at).toLocaleDateString('de-DE')}</div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: 20, fontWeight: 700, color: stats.pct >= 70 ? '#22c55e' : stats.pct >= 40 ? '#f59e0b' : dim }}>{stats.pct}%</div>
                            <div style={{ fontSize: 10, color: dim }}>{stats.correct}/{stats.total} · {stats.vehicles} Fzg.</div>
                          </div>
                          <span style={{ color: dim, fontSize: 12, display: 'inline-block', transform: isOpen ? 'rotate(180deg)' : 'none' }}>▼</span>
                        </div>
                      </div>
                      {isOpen && (
                        <div style={{ borderTop: `1px solid ${bord}`, padding: '16px 18px', background: surf2 }}>
                          <div style={{ fontSize: 11, color: dim, marginBottom: 10, fontWeight: 600, letterSpacing: '0.06em' }}>FORTSCHRITT NACH KATEGORIE</div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {Object.entries(catStats).map(([key, cs]) => {
                              const pct = cs.attempts > 0 ? Math.round(cs.correct / cs.attempts * 100) : 0
                              const errPct = cs.attempts > 0 ? Math.round((cs.attempts - cs.correct) / cs.attempts * 100) : 0
                              return (
                                <div key={key}>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 5 }}>
                                    <span style={{ color: text, fontWeight: 600 }}>{cs.label}</span>
                                    {cs.attempts === 0 ? <span style={{ color: dim, fontSize: 11 }}>Noch nicht geübt</span> : (
                                      <span style={{ display: 'flex', gap: 10, fontSize: 11 }}>
                                        <span style={{ color: '#22c55e' }}>✓ {cs.correct} ({pct}%)</span>
                                        <span style={{ color: '#ef4444' }}>✗ {cs.attempts - cs.correct} ({errPct}%)</span>
                                      </span>
                                    )}
                                  </div>
                                  <div style={{ height: 6, borderRadius: 3, background: bord, overflow: 'hidden', display: 'flex' }}>
                                    {cs.attempts > 0 && <>
                                      <div style={{ height: '100%', width: `${pct}%`, background: '#22c55e' }} />
                                      <div style={{ height: '100%', width: `${errPct}%`, background: '#ef4444' }} />
                                    </>}
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>}
          </>
        )}

        {/* ── HAUSAUFGABEN ── */}
        {view === 'homework' && selected && (
          <>
            <ClassroomHeader />
            {homework && (
              <div style={{ background: dark ? '#0d2a1a' : '#f0fdf4', border: `1px solid ${dark ? '#1e5f3e' : '#86efac'}`, borderRadius: 10, padding: '12px 16px', marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: 11, color: '#22c55e', letterSpacing: '0.1em', marginBottom: 2 }}>AKTUELLE HAUSAUFGABE</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: text }}>{homework.title}</div>
                  <div style={{ fontSize: 11, color: dim, marginTop: 2 }}>{homework.vehicle_ids?.length || 0} Fahrzeuge</div>
                </div>
                <div style={{ fontSize: 20 }}>✅</div>
              </div>
            )}
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 11, color: dim, letterSpacing: '0.1em' }}>TITEL</label>
              <input value={hwTitle} onChange={e => setHwTitle(e.target.value)} placeholder="z.B. Hausaufgabe Woche 3"
                style={{ display: 'block', width: '100%', boxSizing: 'border-box', marginTop: 6, padding: '10px 14px', background: surf, border: `1px solid ${bord}`, borderRadius: 8, color: text, fontSize: 14, outline: 'none', fontFamily: 'Arial' }} />
            </div>
            <div style={{ fontSize: 12, color: dim, letterSpacing: '0.06em', marginBottom: 12 }}>FAHRZEUGE AUSWÄHLEN ({hwSelected.size} ausgewählt)</div>
            {!hwCat ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
                {Object.entries(CATS_GROUPED).map(([cat, { vehicles, catKey }]) => {
                  const selCount = vehicles.filter(v => hwSelected.has(String(v.id))).length
                  const catColor = catKey && CATS[catKey] ? CATS[catKey].color : tc
                  return (
                    <div key={cat} onClick={() => setHwCat(cat)} style={{ background: surf, border: `1px solid ${selCount > 0 ? catColor : bord}`, borderRadius: 12, padding: '18px 16px', cursor: 'pointer', position: 'relative' }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = catColor}
                      onMouseLeave={e => e.currentTarget.style.borderColor = selCount > 0 ? catColor : bord}>
                      {selCount > 0 && <div style={{ position: 'absolute', top: 10, right: 10, background: catColor, borderRadius: '50%', width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#fff', fontWeight: 700 }}>{selCount}</div>}
                      <div style={{ fontSize: 13, fontWeight: 700, color: text, marginBottom: 4 }}>{cat}</div>
                      <div style={{ fontSize: 11, color: dim }}>{vehicles.length} Fahrzeuge</div>
                      {selCount > 0 && <div style={{ fontSize: 11, color: catColor, marginTop: 6, fontWeight: 600 }}>{selCount === vehicles.length ? 'Alle' : selCount} ausgewählt</div>}
                    </div>
                  )
                })}
              </div>
            ) : (
              <>
                <button onClick={() => setHwCat(null)} style={{ background: 'transparent', border: `1px solid ${bord}`, borderRadius: 7, padding: '6px 14px', cursor: 'pointer', color: dim, fontSize: 13, marginBottom: 16 }}>← Zurück</button>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: text }}>{hwCat}</div>
                    <div style={{ fontSize: 12, color: dim, marginTop: 2 }}>
                      {(CATS_GROUPED[hwCat]?.vehicles || []).filter(v => hwSelected.has(String(v.id))).length} von {(CATS_GROUPED[hwCat]?.vehicles || []).length} ausgewählt
                    </div>
                  </div>
                  <button onClick={() => toggleAllInCat(hwCat)} style={{ padding: '7px 14px', borderRadius: 8, border: `1px solid ${tc}`, background: 'transparent', color: tc, fontSize: 13, cursor: 'pointer', fontWeight: 600 }}>
                    {(CATS_GROUPED[hwCat]?.vehicles || []).every(v => hwSelected.has(String(v.id))) ? '✗ Alle abwählen' : '✓ Alle wählen'}
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {(CATS_GROUPED[hwCat]?.vehicles || []).map(v => {
                    const sel = hwSelected.has(String(v.id))
                    return (
                      <div key={String(v.id)} onClick={() => toggleVehicle(v.id)} style={{ background: sel ? tc + '12' : surf, border: `1px solid ${sel ? tc : bord}`, borderRadius: 9, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer' }}>
                        <div style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${sel ? tc : bord}`, background: sel ? tc : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          {sel && <span style={{ color: '#fff', fontSize: 13, lineHeight: 1 }}>✓</span>}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 14, fontWeight: 600, color: text }}>{v.flag} {v.name}</div>
                          {v.isCommunity && <div style={{ fontSize: 11, color: dim, marginTop: 1 }}>Community</div>}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </>
            )}
            <div style={{ position: 'sticky', bottom: 0, background: bg, paddingTop: 16, paddingBottom: 8, marginTop: 20, borderTop: `1px solid ${bord}` }}>
              {savedMsg && <div style={{ fontSize: 13, fontWeight: 600, color: savedMsg.startsWith('⚠') ? '#ef4444' : '#22c55e', marginBottom: 10, textAlign: 'center' }}>{savedMsg}</div>}
              <button onClick={saveHomework} disabled={loading || hwSelected.size === 0} style={{ width: '100%', padding: '14px 0', background: hwSelected.size === 0 ? bord : tc, border: 'none', borderRadius: 10, color: hwSelected.size === 0 ? dim : '#fff', fontWeight: 700, fontSize: 15, cursor: hwSelected.size === 0 ? 'not-allowed' : 'pointer' }}>
                {loading ? '…' : `📤 IMPORTIEREN — ${hwSelected.size} Fahrzeuge an ${members.length} Schüler`}
              </button>
            </div>
          </>
        )}

        {/* ── LERNKARTEN-TOOL ── */}
        {view === 'lernkarten' && (
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>📝 Lernkarten bearbeiten</div>
            <div style={{ fontSize: 13, color: dim, marginBottom: 20 }}>
              Füge eigene Merkmale und Bilder zu beliebigen Fahrzeugen hinzu — für alle deine Klassenräume.
            </div>
            {!lkVehicle ? (
              <>
                <input value={lkSearch} onChange={e => setLkSearch(e.target.value)} placeholder="Fahrzeug suchen …"
                  style={{ width: '100%', boxSizing: 'border-box', padding: '10px 14px', background: surf, border: `1px solid ${bord}`, borderRadius: 8, color: text, fontSize: 14, marginBottom: 12, outline: 'none' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {ALL_LERNKARTEN
                    .filter(v => !lkSearch || v.name.toLowerCase().includes(lkSearch.toLowerCase()))
                    .slice(0, 25)
                    .map(v => (
                      <button key={String(v.id)} onClick={async () => { setLkVehicle(v); await loadLkData(v.id) }}
                        style={{ background: surf, border: `1px solid ${bord}`, borderRadius: 8, padding: '10px 14px', cursor: 'pointer', textAlign: 'left', color: text, fontSize: 13, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 600 }}>{v.name}</span>
                        <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                          {v.isCommunity && <span style={{ fontSize: 10, background: tc + '30', color: tc, padding: '1px 6px', borderRadius: 4 }}>Community</span>}
                          <span style={{ color: dim, fontSize: 11 }}>{v.cat}</span>
                        </span>
                      </button>
                    ))}
                </div>
              </>
            ) : (
              <div>
                <button onClick={() => { setLkVehicle(null); setLkNotes([]); setLkImages([]); setLkInput(''); setLkImgInput('') }}
                  style={{ background: 'transparent', border: `1px solid ${bord}`, borderRadius: 7, padding: '5px 12px', cursor: 'pointer', color: dim, fontSize: 12, marginBottom: 16 }}>
                  ← Anderes Fahrzeug wählen
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>{lkVehicle.name}</div>
                  {lkVehicle.isCommunity && <span style={{ fontSize: 11, background: tc + '30', color: tc, padding: '2px 8px', borderRadius: 4 }}>Community</span>}
                </div>
                <div style={{ fontSize: 12, color: dim, marginBottom: 20 }}>{lkVehicle.cat}</div>

                {/* MERKMALE */}
                <div style={{ fontSize: 12, color: dim, letterSpacing: '0.08em', marginBottom: 8 }}>MEINE MERKMALE</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 10 }}>
                  {lkNotes.length === 0
                    ? <div style={{ color: dim, fontSize: 13, fontStyle: 'italic' }}>Noch keine Merkmale hinzugefügt.</div>
                    : lkNotes.map((note, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, background: surf, border: `1px solid ${bord}`, borderRadius: 8, padding: '8px 12px' }}>
                        <span style={{ flex: 1, fontSize: 13, color: text }}>• {note}</span>
                        <button onClick={() => saveLkData(lkVehicle.id, lkNotes.filter((_, j) => j !== i), lkImages)}
                          style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#ef4444', fontSize: 16, padding: '0 4px' }}>×</button>
                      </div>
                    ))}
                </div>
                <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
                  <input value={lkInput} onChange={e => setLkInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter' && lkInput.trim()) { saveLkData(lkVehicle.id, [...lkNotes, lkInput.trim()], lkImages); setLkInput('') } }}
                    placeholder="Neues Merkmal …"
                    style={{ flex: 1, padding: '9px 12px', background: surf, border: `1px solid ${bord}`, borderRadius: 7, color: text, fontSize: 13, outline: 'none' }} />
                  <button onClick={() => { if (lkInput.trim()) { saveLkData(lkVehicle.id, [...lkNotes, lkInput.trim()], lkImages); setLkInput('') } }}
                    disabled={!lkInput.trim() || lkSaving}
                    style={{ padding: '9px 18px', background: tc, border: 'none', borderRadius: 7, color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: 13 }}>
                    + Merkmal
                  </button>
                </div>

                {/* BILDER */}
                <div style={{ fontSize: 12, color: dim, letterSpacing: '0.08em', marginBottom: 8 }}>MEINE BILDER</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 10 }}>
                  {lkImages.length === 0
                    ? <div style={{ color: dim, fontSize: 13, fontStyle: 'italic' }}>Noch keine Bilder hinzugefügt.</div>
                    : lkImages.map((url, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, background: surf, border: `1px solid ${bord}`, borderRadius: 8, padding: '8px 12px' }}>
                        <img src={url} alt="" style={{ width: 52, height: 38, objectFit: 'cover', borderRadius: 4, flexShrink: 0 }} onError={e => { e.target.style.display = 'none' }} />
                        <span style={{ flex: 1, fontSize: 11, color: dim, wordBreak: 'break-all' }}>{url}</span>
                        <button onClick={() => saveLkData(lkVehicle.id, lkNotes, lkImages.filter((_, j) => j !== i))}
                          style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#ef4444', fontSize: 16, padding: '0 4px', flexShrink: 0 }}>×</button>
                      </div>
                    ))}
                </div>
                <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                  <input value={lkImgInput} onChange={e => setLkImgInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter' && lkImgInput.trim()) { saveLkData(lkVehicle.id, lkNotes, [...lkImages, lkImgInput.trim()]); setLkImgInput('') } }}
                    placeholder="https://... Bild-URL einfügen"
                    style={{ flex: 1, padding: '9px 12px', background: surf, border: `1px solid ${bord}`, borderRadius: 7, color: text, fontSize: 13, outline: 'none' }} />
                  <button onClick={() => { if (lkImgInput.trim()) { saveLkData(lkVehicle.id, lkNotes, [...lkImages, lkImgInput.trim()]); setLkImgInput('') } }}
                    disabled={!lkImgInput.trim() || lkSaving}
                    style={{ padding: '9px 18px', background: tc, border: 'none', borderRadius: 7, color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: 13 }}>
                    + Bild
                  </button>
                </div>
                {lkMsg && <div style={{ fontSize: 12, color: lkMsg.startsWith('❌') ? '#ef4444' : '#22c55e', marginTop: 4 }}>{lkMsg}</div>}
              </div>
            )}
          </div>
        )}

        {/* ── HINZUFÜGEN ── */}
        {view === 'hinzufuegen' && (
          <HvTool
            allCommunity={allCommunity} hvEdit={hvEdit} setHvEdit={setHvEdit}
            hvSaving={hvSaving} hvMsg={hvMsg} saveHv={saveHv} deleteHv={deleteHv}
            userId={user.userId}
            surf={surf} surf2={surf2} bord={bord} text={text} dim={dim} tc={tc} CATS={CATS}
          />
        )}

      </div>
    </div>
  )
}

// ── HINZUFÜGEN COMPONENT ──────────────────────────────────────
function HvTool({ allCommunity, hvEdit, setHvEdit, hvSaving, hvMsg, saveHv, deleteHv, userId, surf, surf2, bord, text, dim, tc, CATS }) {
  const emptyForm = { name: '', category: '', cat_key: '', features: [], image_urls: [] }
  const [form, setForm] = React.useState(emptyForm)
  const [featInput, setFeatInput] = React.useState('')
  const [imgInput, setImgInput] = React.useState('')

  React.useEffect(() => {
    if (hvEdit === 'new') setForm(emptyForm)
    else if (hvEdit) setForm({ ...hvEdit, features: hvEdit.features || [], image_urls: hvEdit.image_urls || [] })
  }, [hvEdit])

  if (!hvEdit) {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>➕ Community-Lernkarten</div>
            <div style={{ fontSize: 13, color: dim }}>Alle von Lehrern erstellten Fahrzeuge. Eigene Karten kannst du bearbeiten und löschen.</div>
          </div>
          <button onClick={() => setHvEdit('new')} style={{ padding: '9px 18px', background: tc, border: 'none', borderRadius: 8, color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: 13 }}>+ Neue Lernkarte</button>
        </div>
        {allCommunity.length === 0 ? (
          <div style={{ background: surf, border: `1px solid ${bord}`, borderRadius: 12, padding: 40, textAlign: 'center', color: dim }}>Noch keine Community-Lernkarten erstellt.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {allCommunity.map(hv => {
              const isOwn = hv.created_by === userId
              return (
                <div key={hv.id} style={{ background: surf, border: `1px solid ${isOwn ? tc + '40' : bord}`, borderRadius: 10, padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                      <div style={{ fontWeight: 700, fontSize: 14, color: text }}>{hv.name}</div>
                      {isOwn && <span style={{ fontSize: 10, background: tc + '25', color: tc, padding: '1px 6px', borderRadius: 4 }}>Meine</span>}
                    </div>
                    <div style={{ fontSize: 11, color: dim }}>
                      {CATS[hv.cat_key]?.label || hv.category} · {hv.features?.length || 0} Merkmale · {hv.image_urls?.length || 0} Bilder
                    </div>
                  </div>
                  {isOwn && (
                    <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                      <button onClick={() => setHvEdit(hv)} style={{ padding: '5px 12px', borderRadius: 7, border: `1px solid ${bord}`, background: 'transparent', color: dim, fontSize: 12, cursor: 'pointer' }}>✏️ Bearbeiten</button>
                      <button onClick={() => deleteHv(hv.id)} style={{ padding: '5px 12px', borderRadius: 7, border: '1px solid #ef4444', background: 'transparent', color: '#ef4444', fontSize: 12, cursor: 'pointer' }}>🗑️</button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    )
  }

  const isNew = hvEdit === 'new'
  return (
    <div>
      <button onClick={() => setHvEdit(null)} style={{ background: 'transparent', border: `1px solid ${bord}`, borderRadius: 7, padding: '5px 12px', cursor: 'pointer', color: dim, fontSize: 12, marginBottom: 20 }}>← Zurück</button>
      <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>{isNew ? 'Neue Lernkarte erstellen' : `"${form.name}" bearbeiten`}</div>

      <label style={{ fontSize: 12, color: dim, letterSpacing: '0.06em' }}>FAHRZEUGNAME</label>
      <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="z.B. T-55AM2"
        style={{ display: 'block', width: '100%', boxSizing: 'border-box', padding: '10px 14px', background: surf, border: `1px solid ${bord}`, borderRadius: 8, color: text, fontSize: 14, marginTop: 6, marginBottom: 16, outline: 'none' }} />

      <label style={{ fontSize: 12, color: dim, letterSpacing: '0.06em' }}>KATEGORIE</label>
      <select value={form.cat_key} onChange={e => { const k = e.target.value; setForm(f => ({ ...f, cat_key: k, category: CATS[k]?.label || k })) }}
        style={{ display: 'block', width: '100%', padding: '10px 14px', background: surf, border: `1px solid ${bord}`, borderRadius: 8, color: text, fontSize: 14, marginTop: 6, marginBottom: 16, outline: 'none' }}>
        <option value="">Kategorie wählen …</option>
        {Object.entries(CATS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
      </select>

      <label style={{ fontSize: 12, color: dim, letterSpacing: '0.06em' }}>ERKENNUNGSMERKMALE</label>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 6, marginBottom: 8 }}>
        {form.features.map((f, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, background: surf, border: `1px solid ${bord}`, borderRadius: 7, padding: '7px 12px' }}>
            <span style={{ flex: 1, fontSize: 13, color: text }}>• {f}</span>
            <button onClick={() => setForm(fm => ({ ...fm, features: fm.features.filter((_, j) => j !== i) }))} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#ef4444', fontSize: 16 }}>×</button>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <input value={featInput} onChange={e => setFeatInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && featInput.trim()) { setForm(f => ({ ...f, features: [...f.features, featInput.trim()] })); setFeatInput('') } }}
          placeholder="Merkmal eingeben …"
          style={{ flex: 1, padding: '9px 12px', background: surf, border: `1px solid ${bord}`, borderRadius: 7, color: text, fontSize: 13, outline: 'none' }} />
        <button onClick={() => { if (featInput.trim()) { setForm(f => ({ ...f, features: [...f.features, featInput.trim()] })); setFeatInput('') } }}
          style={{ padding: '9px 14px', background: surf, border: `1px solid ${bord}`, borderRadius: 7, color: text, cursor: 'pointer', fontSize: 13 }}>+ Merkmal</button>
      </div>

      <label style={{ fontSize: 12, color: dim, letterSpacing: '0.06em' }}>BILD-LINKS (URLs)</label>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 6, marginBottom: 8 }}>
        {form.image_urls.map((url, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, background: surf, border: `1px solid ${bord}`, borderRadius: 7, padding: '7px 12px' }}>
            <img src={url} alt="" style={{ width: 48, height: 36, objectFit: 'cover', borderRadius: 4, flexShrink: 0 }} onError={e => { e.target.style.display = 'none' }} />
            <span style={{ flex: 1, fontSize: 11, color: dim, wordBreak: 'break-all' }}>{url}</span>
            <button onClick={() => setForm(fm => ({ ...fm, image_urls: fm.image_urls.filter((_, j) => j !== i) }))} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#ef4444', fontSize: 16 }}>×</button>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        <input value={imgInput} onChange={e => setImgInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && imgInput.trim()) { setForm(f => ({ ...f, image_urls: [...f.image_urls, imgInput.trim()] })); setImgInput('') } }}
          placeholder="https://... Bild-URL einfügen"
          style={{ flex: 1, padding: '9px 12px', background: surf, border: `1px solid ${bord}`, borderRadius: 7, color: text, fontSize: 13, outline: 'none' }} />
        <button onClick={() => { if (imgInput.trim()) { setForm(f => ({ ...f, image_urls: [...f.image_urls, imgInput.trim()] })); setImgInput('') } }}
          style={{ padding: '9px 14px', background: surf, border: `1px solid ${bord}`, borderRadius: 7, color: text, cursor: 'pointer', fontSize: 13 }}>+ Bild</button>
      </div>

      <button onClick={() => saveHv({ ...form, id: isNew ? undefined : hvEdit.id })}
        disabled={!form.name.trim() || !form.cat_key || hvSaving}
        style={{ width: '100%', padding: '12px 0', background: tc, border: 'none', borderRadius: 8, color: '#fff', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
        {hvSaving ? 'Speichern …' : isNew ? '✅ Lernkarte erstellen' : '✅ Änderungen speichern'}
      </button>
      {hvMsg && <div style={{ fontSize: 13, color: hvMsg.startsWith('❌') ? '#ef4444' : '#22c55e', marginTop: 10, textAlign: 'center' }}>{hvMsg}</div>}
    </div>
  )
}
