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

// Community-Fahrzeug in internes Format umwandeln
function cvToVehicle(cv) {
  return {
    id: cv.id,
    name: cv.name,
    flag: '',
    nation: 'Community',
    s: cv.features?.[0] || '—',
    m: cv.features || [],
    images: cv.image_urls || [],
    catKey: cv.cat_key,
    cat: cv.category || cv.cat_key,
    superCat: cv.super_cat || 'russia',
    isCommunity: true,
  }
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
  const [teacherNotes, setTeacherNotes] = useState({})
  const [teacherImages, setTeacherImages] = useState({})
  const [communityVehicles, setCommunityVehicles] = useState([])
  const [showJoin, setShowJoin]         = useState(false)
  const [joinCode, setJoinCode]         = useState('')
  const [joinError, setJoinError]       = useState('')
  const [joinLoading, setJoinLoading]   = useState(false)
  const [hwMode, setHwMode]             = useState(false)
  const [refreshing, setRefreshing]     = useState(false)

  const bg      = dark ? '#080b10' : '#f0f4f8'
  const surf    = dark ? '#0a0d14' : '#ffffff'
  const bord    = dark ? '#2e4258' : '#8090a8'
  const text    = dark ? '#d8e8f8' : '#1a2a3a'
  const dim     = dark ? '#7090b0' : '#3a5060'
  const inputBg = dark ? '#0d1117' : '#f8fafb'
  const _customCatFallback = communityVehicles.find(v => v.catKey === activeCat)
  const cat = CATS[activeCat] || {
    color: '#7c3aed', light: '#c4b5fd',
    label: _customCatFallback?.cat || activeCat, sub: 'Community',
  }
  const tc = cat.color
  const tl = cat.light

  const ansCorrect = { bg: dark ? '#0d2a1a' : '#d4f5e4', border: dark ? '#1e5f3e' : '#22a06b', col: dark ? '#4ade80' : '#166534' }
  const ansWrong   = { bg: dark ? '#2a0d08' : '#fde8e8', border: dark ? '#6b2200' : '#d93025', col: dark ? '#f87171' : '#b91c1c' }

  // Community-Fahrzeuge laden (global, kein Login nötig)
  async function loadCommunityVehicles() {
    const { data } = await supabase.from('community_vehicles').select('*')
    if (data) setCommunityVehicles(data.map(cvToVehicle))
  }

  useEffect(() => { loadCommunityVehicles() }, [])

  // Fallback: Custom-Kategorie ohne Fahrzeuge → zurück zur ersten Kategorie
  useEffect(() => {
    if (!classroomLoaded && communityVehicles.length === 0) return
    if (!CATS[activeCat] && !communityVehicles.some(v => v.catKey === activeCat)) {
      setActiveCat(Object.keys(CATS)[0])
    }
  }, [communityVehicles, classroomLoaded])

  // Alle Fahrzeuge einer Kategorie (unabhängig von Nation)
  function getCatVehicles(catKey) {
    const builtIn = DB[catKey] || []
    const community = communityVehicles.filter(v => v.catKey === catKey)
    return [...builtIn, ...community]
  }

  // Nation-Klassifizierung
  function isRussian(v) {
    if (v.isCommunity) return v.superCat === 'russia' || v.superCat === 'all'
    return SUPER_CATS.russia.nations.includes(v.nation)
  }
  function isNATO(v) {
    if (v.isCommunity) return v.superCat === 'nato' || v.superCat === 'all'
    return !SUPER_CATS.russia.nations.includes(v.nation)
  }

  // Quick-Select: alle IDs einer Nation (alle Kategorien)
  function getAllRussianIds() {
    const builtIn = Object.values(DB).flat().filter(isRussian).map(v => String(v.id))
    const comm = communityVehicles.filter(v => v.superCat === 'russia' || v.superCat === 'all').map(v => String(v.id))
    return [...new Set([...builtIn, ...comm])]
  }
  function getAllNATOIds() {
    return communityVehicles.filter(v => v.superCat === 'nato' || v.superCat === 'all').map(v => String(v.id))
  }

  function getAllVehicles() {
    return [...Object.values(DB).flat(), ...communityVehicles]
  }

  // Pool aufbauen (Kategorie-basiert, gefiltert nach Auswahl)
  useEffect(() => {
    const catBase = getCatVehicles(activeCat)
    let base
    if (selectedIds && selectedIds.length > 0) {
      base = catBase.filter(v => selectedIds.includes(String(v.id)))
      // Fallback: Auswahl enthält keine Fahrzeuge dieser Kategorie
      if (base.length === 0) base = []
    } else {
      base = catBase
    }
    const newPool = shuffle ? shuf(base) : [...base]
    setPool(newPool)
    setIdx(0); setChosen(null); setRevealed(false)
    setOpts(makeOpts(newPool, 0, newPool))
    setScore({ c: 0, t: 0 }); setImgIdx(0)
  }, [activeCat, selectedIds, shuffle, communityVehicles])

  async function loadClassroomData() {
    if (!user?.userId) return
    setRefreshing(true)
    await loadCommunityVehicles()
    const { data: membership } = await supabase
      .from('classroom_members')
      .select('classroom_id, classrooms(id, name, code, teacher_id)')
      .eq('student_id', user.userId).limit(1).single()
    if (!membership) { setClassroomLoaded(true); setRefreshing(false); return }
    const cr = membership.classrooms
    setClassroom(cr)

    if (cr.teacher_id) {
      const { data: tnotes } = await supabase
        .from('teacher_vehicle_notes')
        .select('vehicle_id, notes, images')
        .eq('teacher_id', cr.teacher_id)
      if (tnotes) {
        const notesMap = {}, imagesMap = {}
        tnotes.forEach(n => {
          notesMap[n.vehicle_id] = n.notes || []
          imagesMap[n.vehicle_id] = n.images || []
        })
        setTeacherNotes(notesMap)
        setTeacherImages(imagesMap)
      }
    }

    const { data: hw } = await supabase
      .from('homework').select('*')
      .eq('classroom_id', cr.id)
      .order('updated_at', { ascending: false }).limit(1).single()
    if (hw) setHomework(hw)
    setClassroomLoaded(true)
    setRefreshing(false)
  }

  useEffect(() => { loadClassroomData() }, [user?.userId])

  useEffect(() => {
    if (hwMode) return
    const catBase = getCatVehicles(activeCat)
    let base = selectedIds ? catBase.filter(v => selectedIds.includes(String(v.id))) : catBase
    if (base.length === 0) base = catBase
    const newPool = shuffle ? shuf(base) : [...base]
    setPool(newPool)
    setIdx(0); setChosen(null); setRevealed(false)
    setOpts(makeOpts(newPool, 0, newPool))
    setScore({ c: 0, t: 0 }); setImgIdx(0)
  }, [hwMode])

  async function joinClassroom() {
    if (!joinCode.trim()) return
    setJoinError(''); setJoinLoading(true)
    const code = joinCode.trim().toUpperCase()
    const { data: cr } = await supabase.from('classrooms').select('*').eq('code', code).single()
    if (!cr) { setJoinError('Ungültiger Code.'); setJoinLoading(false); return }
    const { error } = await supabase.from('classroom_members').insert({ classroom_id: cr.id, student_id: user.userId })
    setJoinLoading(false)
    if (error && error.code !== '23505') { setJoinError('Fehler beim Beitreten.'); return }
    setClassroom(cr); setClassroomLoaded(true); setShowJoin(false); setJoinCode('')
    const { data: hw } = await supabase.from('homework').select('*')
      .eq('classroom_id', cr.id).order('updated_at', { ascending: false }).limit(1).single()
    if (hw) setHomework(hw)
  }

  function makeOpts(p, i, fullBase) {
    if (!p.length) return []
    const cur = p[i]
    const others = shuf(fullBase.filter(x => String(x.id) !== String(cur.id))).slice(0, 3)
    return shuf([cur, ...others])
  }

  function goTo(n) {
    if (!pool.length) return
    const newIdx = ((n % pool.length) + pool.length) % pool.length
    setIdx(newIdx); setChosen(null); setRevealed(false)
    setOpts(makeOpts(pool, newIdx, pool)); setImgIdx(0)
  }

  async function pick(vid) {
    if (chosen !== null) return
    setChosen(vid)
    const vehicleId = pool[idx]?.id
    const correct = String(vid) === String(vehicleId)
    setScore(s => ({ c: s.c + (correct ? 1 : 0), t: s.t + 1 }))
    if (classroom && user?.userId && vehicleId) {
      try {
        const { data: existing } = await supabase.from('student_progress').select('attempts, correct')
          .eq('student_id', user.userId).eq('vehicle_id', String(vehicleId)).single()
        if (existing) {
          await supabase.from('student_progress').update({
            attempts: existing.attempts + 1,
            correct: existing.correct + (correct ? 1 : 0),
            updated_at: new Date().toISOString(),
          }).eq('student_id', user.userId).eq('vehicle_id', String(vehicleId))
        } else {
          await supabase.from('student_progress').insert({
            student_id: user.userId, vehicle_id: String(vehicleId),
            attempts: 1, correct: correct ? 1 : 0,
          })
        }
      } catch (e) { console.warn('Fortschritt:', e) }
    }
  }

  function saveNote(vehicleId, val) {
    setNotes(prev => ({ ...prev, [vehicleId]: val }))
  }

  const cur = pool[idx]
  const pct = score.t > 0 ? Math.round(score.c / score.t * 100) : null

  // Alle Bilder: eingebaut + Lehrer-Bilder
  // Custom-Kategorien aus Community-Fahrzeugen ableiten
  const customCats = communityVehicles.reduce((acc, v) => {
    if (!CATS[v.catKey] && v.catKey && !acc[v.catKey]) {
      acc[v.catKey] = { label: v.cat || v.catKey, sub: 'Community', color: '#7c3aed', light: '#c4b5fd' }
    }
    return acc
  }, {})

  const teacherImgs = cur ? (teacherImages[String(cur.id)] || []) : []
  const allImages = [...(cur?.images || []), ...teacherImgs]
  const hasImages = allImages.length > 0
  const poolHasImages = pool.some(v => v.images?.length > 0 || (teacherImages[String(v.id)]?.length > 0))

  const btn = (active, color, lightColor) => ({
    padding: '8px 14px',
    background: active ? color + '40' : (dark ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.90)'),
    border: `1px solid ${active ? color : bord}`,
    color: active ? lightColor : (dark ? '#a0c0d8' : dim),
    boxShadow: active ? 'none' : (dark ? 'inset 0 0 0 1px rgba(255,255,255,0.05)' : '0 1px 3px rgba(0,0,0,0.15)'),
    borderRadius: 7, fontSize: fontSize - 2,
    fontWeight: active ? 700 : 400,
    letterSpacing: '0.08em', cursor: 'pointer',
    transition: 'all 0.15s', fontFamily: 'Arial',
  })

  // ── JOIN-SCREEN ─────────────────────────────────────────────
  if (classroomLoaded && !classroom) {
    return (
      <div style={{ minHeight: '100vh', backgroundImage: `linear-gradient(${dark ? 'rgba(10,13,20,0.82)' : 'rgba(220,228,236,0.60)'}, ${dark ? 'rgba(10,13,20,0.82)' : 'rgba(220,228,236,0.60)'}), url(https://i.pinimg.com/564x/66/10/4c/66104cd228d8925efbfdf8bbd612050d.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', fontFamily: 'Arial', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <div style={{ background: surf, border: `1px solid ${bord}`, borderRadius: 14, padding: '40px 36px', width: '100%', maxWidth: 420, textAlign: 'center' }}>
          <div style={{ fontSize: 44, marginBottom: 12 }}>🏫</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: text, marginBottom: 8 }}>Klassenraum beitreten</div>
          <div style={{ fontSize: 13, color: dim, marginBottom: 28, lineHeight: 1.6 }}>Gib den Code ein, den du von deinem Lehrer erhalten hast.</div>
          {joinError && <div style={{ background: dark ? '#2a0a0a' : '#fde8e8', border: `1px solid ${dark ? '#6b2200' : '#d93025'}`, borderRadius: 8, padding: '10px 14px', color: dark ? '#f87171' : '#b91c1c', fontSize: 13, marginBottom: 14, textAlign: 'left' }}>{joinError}</div>}
          <input value={joinCode} onChange={e => setJoinCode(e.target.value.toUpperCase())} placeholder="z.B. AB12CD" autoFocus
            style={{ width: '100%', background: inputBg, border: `1px solid ${bord}`, borderRadius: 10, padding: '14px 16px', color: text, fontSize: 24, fontWeight: 700, letterSpacing: '0.25em', fontFamily: 'monospace', outline: 'none', boxSizing: 'border-box', textAlign: 'center', marginBottom: 14 }}
            onKeyDown={e => e.key === 'Enter' && joinClassroom()} />
          <button onClick={joinClassroom} disabled={joinLoading || !joinCode.trim()} style={{ width: '100%', padding: '13px 0', background: '#3b82f6', border: 'none', borderRadius: 10, color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', opacity: joinLoading ? 0.6 : 1, marginBottom: 16 }}>
            {joinLoading ? '…' : 'BEITRETEN'}
          </button>
          <button onClick={onLogout} style={{ background: 'transparent', border: `1px solid ${bord}`, borderRadius: 8, padding: '8px 20px', cursor: 'pointer', color: dim, fontSize: 12 }}>Abmelden</button>
        </div>
      </div>
    )
  }

  // ── HAUSAUFGABEN-ANSICHT ─────────────────────────────────────
  if (hwMode && homework) {
    const ALL = getAllVehicles()
    const hwVehicles = ALL.filter(v => homework.vehicle_ids?.includes(String(v.id)))

    function importHomework() {
      setSelectedIds(hwVehicles.map(v => v.id))
      setActiveCat((() => {
        if (!hwVehicles.length) return activeCat
        const firstId = hwVehicles[0].id
        if (hwVehicles[0].catKey) return hwVehicles[0].catKey
        for (const [k, arr] of Object.entries(DB)) { if (arr.some(v => v.id === firstId)) return k }
        return activeCat
      })())
      setHwMode(false)
    }

    return (
      <div style={{ minHeight: '100vh', backgroundImage: `linear-gradient(${dark ? 'rgba(10,13,20,0.82)' : 'rgba(220,228,236,0.60)'}, ${dark ? 'rgba(10,13,20,0.82)' : 'rgba(220,228,236,0.60)'}), url(https://i.pinimg.com/564x/66/10/4c/66104cd228d8925efbfdf8bbd612050d.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', fontFamily: 'Arial', fontSize, color: text }}>
        <div style={{ background: surf, borderBottom: `1px solid ${bord}`, position: 'sticky', top: 0, zIndex: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', flexWrap: 'wrap' }}>
            <div style={{ fontWeight: 700, fontSize: fontSize - 1, color: '#22c55e', letterSpacing: '0.08em', flexShrink: 0 }}>MED</div>
            <div style={{ flex: 1 }} />
            {user?.name && <span style={{ fontSize: fontSize - 3, color: dim }}>{user.name}</span>}
            <button onClick={onLogout} style={{ ...btn(false, bord, dim), padding: '5px 10px', fontSize: fontSize - 3 }}>Abmelden</button>
          </div>
          <div style={{ display: 'flex', overflowX: 'auto', borderTop: `1px solid ${bord}` }}>
            {Object.entries(CATS).map(([k, v]) => (
              <button key={k} onClick={() => { setActiveCat(k); setHwMode(false) }} style={{ flex: '0 0 auto', padding: '8px 10px', background: 'transparent', border: 'none', borderBottom: '2px solid transparent', color: dim, fontSize: fontSize - 3, cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'Arial' }}>
                {v.label}<br /><span style={{ fontSize: fontSize - 5, opacity: 0.6 }}>{v.sub}</span>
              </button>
            ))}
            <button style={{ flex: '0 0 auto', padding: '8px 10px', background: '#22c55e22', border: 'none', borderBottom: '2px solid #22c55e', color: '#22c55e', fontSize: fontSize - 3, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'Arial' }}>
              {homework.title}<br /><span style={{ fontSize: fontSize - 5, opacity: 0.6 }}>{hwVehicles.length} Fzg.</span>
            </button>
          </div>
        </div>
        <div style={{ maxWidth: 680, margin: '0 auto', padding: '20px 14px 80px' }}>
          <div style={{ background: surf, border: `1px solid ${bord}`, borderRadius: 12, padding: '20px', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: fontSize - 3, color: '#22c55e', letterSpacing: '0.12em', marginBottom: 4 }}>HAUSAUFGABE · {classroom?.name}</div>
                <div style={{ fontSize: fontSize + 2, fontWeight: 700, color: text }}>{homework.title}</div>
                <div style={{ fontSize: fontSize - 2, color: dim, marginTop: 4 }}>{hwVehicles.length} Fahrzeuge</div>
              </div>
              <button onClick={importHomework} style={{ padding: '10px 20px', background: '#22c55e', border: 'none', borderRadius: 10, color: '#fff', fontSize: fontSize - 1, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                IMPORTIEREN
              </button>
            </div>
          </div>
          <div style={{ fontSize: fontSize - 3, color: dim, letterSpacing: '0.1em', marginBottom: 10 }}>FAHRZEUGE</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {hwVehicles.map((v, i) => {
              const catInfo = v.catKey ? CATS[v.catKey] : null
              return (
                <div key={String(v.id)} style={{ background: surf, border: `1px solid ${bord}`, borderRadius: 8, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: catInfo ? catInfo.color + '30' : bord, border: `1px solid ${catInfo ? catInfo.color + '60' : bord}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: fontSize - 4, fontWeight: 700, color: catInfo ? catInfo.light : dim, flexShrink: 0 }}>{i + 1}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: fontSize - 1, fontWeight: 600, color: text }}>{v.flag} {v.name}</div>
                    <div style={{ fontSize: fontSize - 4, color: dim, marginTop: 1 }}>{v.nation}{catInfo ? ` · ${catInfo.label}` : ''}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  if (!pool.length || !cur) {
    // Noch beim Laden — kurz warten bevor Fehlermeldung
    if (refreshing) {
      return (
        <div style={{ minHeight: '100vh', backgroundImage: `linear-gradient(${dark ? 'rgba(10,13,20,0.82)' : 'rgba(220,228,236,0.60)'}, ${dark ? 'rgba(10,13,20,0.82)' : 'rgba(220,228,236,0.60)'}), url(https://i.pinimg.com/564x/66/10/4c/66104cd228d8925efbfdf8bbd612050d.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Arial', color: dim, fontSize }}>
          Laden …
        </div>
      )
    }
    return (
      <div style={{ minHeight: '100vh', backgroundImage: `linear-gradient(${dark ? 'rgba(10,13,20,0.82)' : 'rgba(220,228,236,0.60)'}, ${dark ? 'rgba(10,13,20,0.82)' : 'rgba(220,228,236,0.60)'}), url(https://i.pinimg.com/564x/66/10/4c/66104cd228d8925efbfdf8bbd612050d.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, fontFamily: 'Arial', fontSize }}>
        <div style={{ color: text, fontWeight: 700, fontSize: fontSize + 1 }}>Keine Fahrzeuge für diese Auswahl.</div>
        <div style={{ color: dim, fontSize: fontSize - 2 }}>Für diese Kategorie sind noch keine Fahrzeuge eingetragen.</div>
        <button onClick={() => { setSuperCat('all'); setSelectedIds(null); setActiveCat(Object.keys(CATS)[0]) }} style={{ marginTop: 8, padding: '10px 24px', background: '#1e3a5f', border: '1px solid #2d5080', borderRadius: 8, color: '#7eb8f0', fontSize, fontWeight: 700, cursor: 'pointer', fontFamily: 'Arial' }}>
          🌐 Alle Nationen anzeigen
        </button>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', backgroundImage: `linear-gradient(${dark ? 'rgba(10,13,20,0.82)' : 'rgba(220,228,236,0.60)'}, ${dark ? 'rgba(10,13,20,0.82)' : 'rgba(220,228,236,0.60)'}), url(https://i.pinimg.com/564x/66/10/4c/66104cd228d8925efbfdf8bbd612050d.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', fontFamily: 'Arial', fontSize, color: text, position: 'relative' }}>

      {showSidebar && <div onClick={() => setShowSidebar(false)} style={{ position: 'fixed', inset: 0, background: '#00000080', zIndex: 40 }} />}

      {/* SIDEBAR */}
      <div style={{ position: 'fixed', top: 0, left: showSidebar ? 0 : '-320px', bottom: 0, width: 300, background: surf, borderRight: `1px solid ${bord}`, zIndex: 50, transition: 'left 0.2s ease', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '16px', borderBottom: `1px solid ${bord}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: 700, fontSize: fontSize - 1, color: text, letterSpacing: '0.06em' }}>FAHRZEUG-AUSWAHL</div>
          <button onClick={() => setShowSidebar(false)} style={{ background: 'none', border: 'none', color: dim, fontSize: 20, cursor: 'pointer', lineHeight: 1 }}>×</button>
        </div>
        <div style={{ padding: '8px 12px', borderBottom: `1px solid ${bord}`, display: 'flex', gap: 6 }}>
          <button onClick={() => { setSuperCat('russia'); setSelectedIds(getAllRussianIds()) }} style={{ ...btn(superCat === 'russia' && !!selectedIds, '#4a6080', '#90b8d8'), flex: 1, fontSize: fontSize - 4, padding: '4px 4px' }}>🇷🇺 RUS</button>
          <button onClick={() => { setSuperCat('nato'); setSelectedIds(getAllNATOIds()) }} style={{ ...btn(superCat === 'nato' && !!selectedIds, '#4a6080', '#90b8d8'), flex: 1, fontSize: fontSize - 4, padding: '4px 4px' }}>🌍 NATO</button>
          <button onClick={() => { setSuperCat('all'); setSelectedIds(null) }} style={{ ...btn(!selectedIds, '#4a6080', '#90b8d8'), flex: 1, fontSize: fontSize - 4, padding: '4px 4px' }}>🌐 ALLE</button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          {/* Linke Spalte: RUS */}
          <div style={{ borderRight: `1px solid ${bord}` }}>
            <div style={{ padding: '6px 10px', fontSize: fontSize - 5, color: dim, letterSpacing: '0.1em', borderBottom: `1px solid ${bord}` }}>🇷🇺 RUS</div>
            {getCatVehicles(activeCat).filter(isRussian).map(v => {
              const sel = !selectedIds || selectedIds.includes(String(v.id))
              return (
                <div key={String(v.id)} onClick={() => {
                  const all = getCatVehicles(activeCat)
                  if (!selectedIds) {
                    setSelectedIds(all.map(x => String(x.id)).filter(id => id !== String(v.id)))
                  } else {
                    const next = sel ? selectedIds.filter(id => id !== String(v.id)) : [...selectedIds, String(v.id)]
                    setSelectedIds(next.length ? next : null)
                  }
                }} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px', cursor: 'pointer', background: sel ? tc + '10' : 'transparent', borderLeft: `2px solid ${sel ? tc : 'transparent'}` }}>
                  <div style={{ width: 14, height: 14, borderRadius: 3, border: `2px solid ${sel ? tc : bord}`, background: sel ? tc : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {sel && <span style={{ color: '#fff', fontSize: 9, lineHeight: 1 }}>✓</span>}
                  </div>
                  <span style={{ fontSize: fontSize - 3, color: sel ? tl : dim, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v.name}</span>
                </div>
              )
            })}
            {getCatVehicles(activeCat).filter(isRussian).length === 0 && (
              <div style={{ padding: '12px 10px', fontSize: fontSize - 4, color: dim, fontStyle: 'italic' }}>Keine RUS-Fahrzeuge</div>
            )}
          </div>
          {/* Rechte Spalte: NATO */}
          <div>
            <div style={{ padding: '6px 10px', fontSize: fontSize - 5, color: dim, letterSpacing: '0.1em', borderBottom: `1px solid ${bord}` }}>🌍 NATO</div>
            {getCatVehicles(activeCat).filter(isNATO).map(v => {
              const sel = !selectedIds || selectedIds.includes(String(v.id))
              return (
                <div key={String(v.id)} onClick={() => {
                  const all = getCatVehicles(activeCat)
                  if (!selectedIds) {
                    setSelectedIds(all.map(x => String(x.id)).filter(id => id !== String(v.id)))
                  } else {
                    const next = sel ? selectedIds.filter(id => id !== String(v.id)) : [...selectedIds, String(v.id)]
                    setSelectedIds(next.length ? next : null)
                  }
                }} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px', cursor: 'pointer', background: sel ? tc + '10' : 'transparent', borderLeft: `2px solid ${sel ? tc : 'transparent'}` }}>
                  <div style={{ width: 14, height: 14, borderRadius: 3, border: `2px solid ${sel ? tc : bord}`, background: sel ? tc : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {sel && <span style={{ color: '#fff', fontSize: 9, lineHeight: 1 }}>✓</span>}
                  </div>
                  <span style={{ fontSize: fontSize - 3, color: sel ? tl : dim, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v.name}</span>
                </div>
              )
            })}
            {getCatVehicles(activeCat).filter(isNATO).length === 0 && (
              <div style={{ padding: '12px 10px', fontSize: fontSize - 4, color: dim, fontStyle: 'italic' }}>Keine NATO-Fahrzeuge</div>
            )}
          </div>
        </div>
      </div>

      {/* HEADER */}
      <div style={{ background: surf, borderBottom: `1px solid ${bord}`, position: 'sticky', top: 0, zIndex: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', flexWrap: 'wrap' }}>
          <div style={{ fontWeight: 700, fontSize: fontSize - 1, color: tl, letterSpacing: '0.08em', flexShrink: 0 }}>MED</div>
          <div style={{ display: 'flex', gap: 4, marginLeft: 4 }}>
            <button onClick={() => { setSuperCat('russia'); setSelectedIds(getAllRussianIds()) }}
              style={{ ...btn(superCat === 'russia' && !!selectedIds, '#4a6080', '#90b8d8'), padding: '5px 10px', fontSize: fontSize - 3 }}>
              🇷🇺 RUS
            </button>
            <button onClick={() => { setSuperCat('nato'); setSelectedIds(getAllNATOIds()) }}
              style={{ ...btn(superCat === 'nato' && !!selectedIds, '#4a6080', '#90b8d8'), padding: '5px 10px', fontSize: fontSize - 3 }}>
              🌍 NATO
            </button>
            <button onClick={() => { setSuperCat('all'); setSelectedIds(null) }}
              style={{ ...btn(!selectedIds || superCat === 'all', '#4a6080', '#90b8d8'), padding: '5px 10px', fontSize: fontSize - 3 }}>
              🌐 ALLE
            </button>
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <button onClick={() => setFontSize(f => Math.max(14, f - 1))} style={{ ...btn(false, bord, dim), padding: '4px 8px', fontSize: 12 }}>A−</button>
            <button onClick={() => setFontSize(f => Math.min(17, f + 1))} style={{ ...btn(false, bord, dim), padding: '4px 8px', fontSize: 14 }}>A+</button>
            {classroom && (
              <button onClick={loadClassroomData} disabled={refreshing} title="Aktualisieren" style={{ ...btn(false, bord, dim), padding: '4px 9px', fontSize: 14 }}>
                {refreshing ? '⏳' : '🔄'}
              </button>
            )}
          </div>
          <button onClick={() => setDark(d => !d)} style={{ ...btn(false, bord, dim), padding: '5px 10px', fontSize: fontSize - 1 }}>
            {dark ? '☀️' : '🌙'}
          </button>
          {user?.name && <span style={{ fontSize: fontSize - 3, color: dim }}>{user.name}</span>}
          <button onClick={onLogout} style={{ ...btn(false, bord, dim), padding: '5px 10px', fontSize: fontSize - 3 }}>Abmelden</button>
        </div>
        <div style={{ display: 'flex', overflowX: 'auto', borderTop: `1px solid ${bord}` }}>
          {Object.entries(CATS).map(([k, v]) => (
            <button key={k} onClick={() => { setActiveCat(k); setHwMode(false) }} style={{ flex: '0 0 auto', padding: '8px 10px', background: !hwMode && activeCat === k ? v.color + '22' : 'transparent', border: 'none', borderBottom: `2px solid ${!hwMode && activeCat === k ? v.color : 'transparent'}`, color: !hwMode && activeCat === k ? v.light : dim, fontSize: fontSize - 3, fontWeight: !hwMode && activeCat === k ? 700 : 400, letterSpacing: '0.06em', cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'Arial' }}>
              {v.label}<br /><span style={{ fontSize: fontSize - 5, opacity: 0.6 }}>{v.sub}</span>
            </button>
          ))}
          {Object.entries(customCats).map(([k, v]) => (
            <button key={k} onClick={() => { setActiveCat(k); setHwMode(false) }} style={{ flex: '0 0 auto', padding: '8px 10px', background: !hwMode && activeCat === k ? v.color + '22' : 'transparent', border: 'none', borderBottom: `2px solid ${!hwMode && activeCat === k ? v.color : 'transparent'}`, color: !hwMode && activeCat === k ? v.light : dim, fontSize: fontSize - 3, fontWeight: !hwMode && activeCat === k ? 700 : 400, letterSpacing: '0.06em', cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'Arial' }}>
              {v.label}<br /><span style={{ fontSize: fontSize - 5, opacity: 0.6 }}>{v.sub}</span>
            </button>
          ))}
          {homework && (
            <button onClick={() => setHwMode(true)} style={{ flex: '0 0 auto', padding: '8px 10px', background: hwMode ? '#22c55e22' : 'transparent', border: 'none', borderBottom: `2px solid ${hwMode ? '#22c55e' : 'transparent'}`, color: hwMode ? '#22c55e' : dim, fontSize: fontSize - 3, fontWeight: hwMode ? 700 : 400, letterSpacing: '0.06em', cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'Arial' }}>
              {homework.title}<br /><span style={{ fontSize: fontSize - 5, opacity: 0.6 }}>{homework.vehicle_ids?.length} Fzg.</span>
            </button>
          )}
          {!classroom && user?.userId && (
            <button onClick={() => setShowJoin(true)} style={{ flex: '0 0 auto', padding: '8px 10px', background: 'transparent', border: 'none', borderBottom: '2px solid transparent', color: dim, fontSize: fontSize - 3, cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'Arial', opacity: 0.6 }}>
              + Klasse beitreten
            </button>
          )}
          {classroom && !homework && <span style={{ flex: '0 0 auto', padding: '8px 10px', color: dim, fontSize: fontSize - 4 }}>🏫 {classroom.name}</span>}
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
          <button style={{ ...btn(mode === 'quiz', tc, tl), opacity: !poolHasImages ? 0.45 : 1 }} onClick={() => { if (poolHasImages) { setMode('quiz'); setChosen(null); setRevealed(false) } }}>◉ BILD-QUIZ</button>
          <button style={{ ...btn(shuffle, tc, tl), fontSize: fontSize - 1 }} onClick={() => setShuffle(s => !s)}>⇌</button>
          <button onClick={() => setShowSidebar(true)} style={{ ...btn(!!selectedIds, '#4a6080', '#90b8d8'), display: 'flex', alignItems: 'center', gap: 5 }}>
            ☑ {!selectedIds ? 'Alle Nationen' : superCat === 'russia' ? '🇷🇺 RUS' : superCat === 'nato' ? '🌍 NATO' : `Auswahl (${selectedIds.length})`}
          </button>
          <div style={{ flex: 1 }} />
          {score.t > 0 && (
            <div style={{ background: pct >= 70 ? ansCorrect.bg : ansWrong.bg, border: `1px solid ${pct >= 70 ? ansCorrect.border : ansWrong.border}`, borderRadius: 7, padding: '4px 12px', textAlign: 'center' }}>
              <span style={{ fontSize: fontSize - 1, fontWeight: 700, color: pct >= 70 ? ansCorrect.col : ansWrong.col }}>{pct}%</span>
              <span style={{ fontSize: fontSize - 4, color: dim, marginLeft: 5 }}>{score.c}/{score.t}</span>
            </div>
          )}
          <button onClick={() => setScore({ c: 0, t: 0 })} style={{ ...btn(false, bord, dim), padding: '5px 8px' }}>↺</button>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <button onClick={() => goTo(idx - 1)} style={{ ...btn(false, bord, dim), padding: '7px 16px', fontSize: fontSize - 1, background: dark ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.92)', border: `1px solid ${bord}`, color: dark ? '#a0c0d8' : dim }}>← Zurück</button>
          <div style={{ color: dim, fontSize: fontSize - 3, letterSpacing: '0.1em' }}>{idx + 1} / {pool.length}</div>
          <button onClick={() => goTo(idx + 1)} style={{ ...btn(false, tc, tl), padding: '7px 16px', fontSize: fontSize - 1, background: dark ? 'rgba(59,130,246,0.25)' : 'rgba(255,255,255,0.92)', border: `1px solid ${tc}`, color: dark ? tl : tc, fontWeight: 700 }}>Weiter →</button>
        </div>

        {/* CARD */}
        <div className="fade-in" key={String(cur.id)} style={{ background: surf, border: `1px solid ${bord}`, borderRadius: 12, overflow: 'hidden', marginBottom: 14 }}>

          {/* Card header */}
          <div style={{ background: tc + '18', borderBottom: `1px solid ${tc + '40'}`, padding: '10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: fontSize - 4, color: dim, letterSpacing: '0.14em' }}>
                {cat.label.toUpperCase()} · {cat.sub}
                {cur.isCommunity && <span style={{ marginLeft: 8, background: tc + '30', padding: '1px 6px', borderRadius: 4, fontSize: fontSize - 5 }}>Community</span>}
              </div>
              <div style={{ fontSize: fontSize + 2, fontWeight: 700, color: text, letterSpacing: '0.05em', marginTop: 2 }}>
                {mode === 'quiz' && chosen === null ? '???' : cur.name}
                {(mode !== 'quiz' || chosen !== null) && cur.flag && <span style={{ fontSize: fontSize - 1, marginLeft: 8, opacity: 0.7 }}>{cur.flag}</span>}
              </div>
              {(mode !== 'quiz' || chosen !== null) && <div style={{ fontSize: fontSize - 3, color: dim, marginTop: 2 }}>{cur.nation}</div>}
            </div>
            {!cur.isCommunity && (
              <a href={getRecomonkeyUrl(cur, activeCat)} target="_blank" rel="noopener noreferrer"
                style={{ fontSize: fontSize - 3, color: tl, opacity: 0.7, textDecoration: 'none', border: `1px solid ${tc}40`, borderRadius: 6, padding: '4px 8px', whiteSpace: 'nowrap' }}>
                📷 Reco
              </a>
            )}
          </div>

          {/* Image */}
          <div style={{ background: dark ? '#060810' : '#e8eef4', minHeight: hasImages ? 'auto' : 100, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', flexDirection: 'column' }}>
            {hasImages ? (
              <>
                <div style={{ position: 'relative', width: '100%' }}>
                  <img src={allImages[imgIdx % allImages.length]} alt={cur.name}
                    style={{ width: '100%', maxHeight: 320, objectFit: 'contain', display: 'block' }}
                    onError={e => { e.target.style.display = 'none' }} />
                  {allImages.length > 1 && (
                    <>
                      <button onClick={() => setImgIdx(i => ((i - 1 + allImages.length) % allImages.length))}
                        style={{ position: 'absolute', left: 6, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.45)', border: 'none', borderRadius: '50%', width: 32, height: 32, color: '#fff', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>‹</button>
                      <button onClick={() => setImgIdx(i => (i + 1) % allImages.length)}
                        style={{ position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.45)', border: 'none', borderRadius: '50%', width: 32, height: 32, color: '#fff', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>›</button>
                    </>
                  )}
                </div>
                {allImages.length > 1 && (
                  <div style={{ display: 'flex', gap: 6, padding: 8 }}>
                    {allImages.map((_, i) => (
                      <button key={i} onClick={() => setImgIdx(i)} style={{ width: 8, height: 8, borderRadius: '50%', border: 'none', background: i === imgIdx % allImages.length ? tl : dim, cursor: 'pointer', padding: 0 }} />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div style={{ padding: '16px 20px', textAlign: 'center' }}>
                <div style={{ fontSize: 28, marginBottom: 6, opacity: 0.25 }}>📷</div>
                <div style={{ fontSize: fontSize - 3, color: dim }}>Noch keine Bilder</div>
                {!cur.isCommunity && (
                  <a href={getRecomonkeyUrl(cur, activeCat)} target="_blank" rel="noopener noreferrer" style={{ fontSize: fontSize - 3, color: tl, marginTop: 4, display: 'inline-block' }}>
                    → Auf Recomonkey ansehen
                  </a>
                )}
              </div>
            )}
          </div>

          {/* QUIZ */}
          {mode === 'quiz' && (
            <div style={{ padding: '14px 16px', borderTop: `1px solid ${bord}` }}>
              {!poolHasImages ? (
                <div style={{ background: dark ? '#12181f' : '#f0f4f8', border: `1px solid ${bord}`, borderRadius: 8, padding: '14px 16px', textAlign: 'center', fontSize: fontSize - 2, color: dim }}>
                  Bilder noch nicht verfügbar.
                </div>
              ) : (
                <>
                  <div style={{ fontSize: fontSize - 4, color: dim, letterSpacing: '0.1em', marginBottom: 10 }}>WELCHES FAHRZEUG IST ABGEBILDET?</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    {opts.map(o => {
                      const isCorrect = String(o.id) === String(cur.id)
                      const isPicked = String(chosen) === String(o.id)
                      const showResult = chosen !== null
                      let bg2 = surf, border2 = bord, col2 = text
                      if (showResult && isCorrect) { bg2 = ansCorrect.bg; border2 = ansCorrect.border; col2 = ansCorrect.col }
                      if (showResult && isPicked && !isCorrect) { bg2 = ansWrong.bg; border2 = ansWrong.border; col2 = ansWrong.col }
                      return (
                        <button key={String(o.id)} onClick={() => pick(o.id)} style={{ background: bg2, border: `1px solid ${border2}`, borderRadius: 8, padding: '10px 12px', color: col2, fontSize: fontSize - 2, fontWeight: showResult && isCorrect ? 700 : 400, textAlign: 'left', cursor: chosen !== null ? 'default' : 'pointer', transition: 'all 0.15s', fontFamily: 'Arial' }}>
                          {o.flag} {o.name}
                        </button>
                      )
                    })}
                  </div>
                  {chosen !== null && (
                    <div style={{ marginTop: 12, fontSize: fontSize - 2, fontWeight: 700, color: String(chosen) === String(cur.id) ? ansCorrect.col : ansWrong.col }}>
                      {String(chosen) === String(cur.id) ? '✓ Richtig!' : `✗ Falsch — es war: ${cur.name}`}
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
                  <div style={{ fontSize: fontSize - 4, color: dim, letterSpacing: '0.1em', marginBottom: 10 }}>KURZERKENNUNGSMERKMAL</div>
                  <div style={{ background: tc + '15', border: `1px solid ${tc + '40'}`, borderRadius: 8, padding: '12px 14px', fontSize: fontSize - 1, fontWeight: 700, color: tl, letterSpacing: '0.04em', marginBottom: 12 }}>
                    {cur.s}
                  </div>
                  <button onClick={() => setRevealed(true)} style={{ ...btn(false, tc, tl), width: '100%', padding: '10px 0', justifyContent: 'center' }}>
                    Alle Merkmale anzeigen
                  </button>
                </>
              ) : (
                <>
                  <div style={{ fontSize: fontSize - 4, color: dim, letterSpacing: '0.1em', marginBottom: 10 }}>ERKENNUNGSMERKMALE</div>
                  {cur.m.map((feat, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                      <div style={{ width: 22, height: 22, borderRadius: '50%', background: tc, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: fontSize - 4, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>{i + 1}</div>
                      <div style={{ fontSize: fontSize - 1, color: text, lineHeight: 1.5 }}>{feat}</div>
                    </div>
                  ))}
                  {(teacherNotes[String(cur.id)] || []).length > 0 && (
                    <>
                      <div style={{ fontSize: fontSize - 4, color: '#f59e0b', letterSpacing: '0.1em', marginBottom: 8, marginTop: 4 }}>ZUSATZ VOM LEHRER</div>
                      {teacherNotes[String(cur.id)].map((note, i) => (
                        <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                          <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#f59e0b', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: fontSize - 4, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>+</div>
                          <div style={{ fontSize: fontSize - 1, color: text, lineHeight: 1.5 }}>{note}</div>
                        </div>
                      ))}
                    </>
                  )}
                  <button onClick={() => setRevealed(false)} style={{ ...btn(false, bord, dim), marginTop: 6, width: '100%', padding: '8px 0' }}>
                    Verbergen
                  </button>
                </>
              )}
              {/* NOTIZFELD */}
              <div style={{ marginTop: 16, borderTop: `1px solid ${bord}`, paddingTop: 14 }}>
                <div style={{ fontSize: fontSize - 4, color: dim, letterSpacing: '0.1em', marginBottom: 8 }}>MEINE NOTIZEN</div>
                <textarea
                  value={notes[String(cur.id)] || ''}
                  onChange={e => saveNote(String(cur.id), e.target.value)}
                  placeholder="Eigene Notizen …"
                  rows={3}
                  style={{ width: '100%', background: inputBg, border: `1px solid ${bord}`, borderRadius: 8, padding: '10px 12px', color: text, fontSize: fontSize - 2, fontFamily: 'Arial', lineHeight: 1.5, resize: 'vertical', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Bottom nav */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => goTo(idx - 1)} style={{ ...btn(false, bord, dim), flex: 1, padding: '11px 0' }}>← Zurück</button>
          {mode === 'quiz' && chosen !== null && <button onClick={() => goTo(idx + 1)} style={{ ...btn(true, tc, tl), flex: 1, padding: '11px 0', fontWeight: 700 }}>Weiter →</button>}
          {mode === 'flash' && <button onClick={() => goTo(idx + 1)} style={{ ...btn(true, tc, tl), flex: 1, padding: '11px 0', fontWeight: 700 }}>Weiter →</button>}
        </div>
      </div>

      {/* JOIN-MODAL */}
      {showJoin && (
        <div style={{ position: 'fixed', inset: 0, background: '#00000090', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setShowJoin(false)}>
          <div onClick={e => e.stopPropagation()} style={{ background: surf, border: `1px solid ${bord}`, borderRadius: 14, padding: '28px', width: '100%', maxWidth: 360, fontFamily: 'Arial' }}>
            <div style={{ fontSize: 17, fontWeight: 700, color: text, marginBottom: 6 }}>🏫 Klassenraum beitreten</div>
            <div style={{ fontSize: 12, color: dim, marginBottom: 18 }}>Gib den Code deines Lehrers ein.</div>
            {joinError && <div style={{ background: dark ? '#2a0a0a' : '#fde8e8', border: `1px solid ${dark ? '#6b2200' : '#d93025'}`, borderRadius: 8, padding: '9px 14px', color: dark ? '#f87171' : '#b91c1c', fontSize: 13, marginBottom: 12 }}>{joinError}</div>}
            <input value={joinCode} onChange={e => setJoinCode(e.target.value.toUpperCase())} placeholder="z.B. AB12CD" autoFocus
              style={{ width: '100%', background: inputBg, border: `1px solid ${bord}`, borderRadius: 8, padding: '12px 14px', color: text, fontSize: 20, fontWeight: 700, letterSpacing: '0.2em', fontFamily: 'monospace', outline: 'none', boxSizing: 'border-box', textAlign: 'center', marginBottom: 14 }}
              onKeyDown={e => e.key === 'Enter' && joinClassroom()} />
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setShowJoin(false)} style={{ flex: 1, padding: '10px 0', background: 'transparent', border: `1px solid ${bord}`, borderRadius: 8, color: dim, fontSize: 13, cursor: 'pointer' }}>Abbrechen</button>
              <button onClick={joinClassroom} disabled={joinLoading || !joinCode.trim()} style={{ flex: 2, padding: '10px 0', background: '#3b82f6', border: 'none', borderRadius: 8, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', opacity: joinLoading ? 0.6 : 1 }}>
                {joinLoading ? '…' : 'BEITRETEN'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
