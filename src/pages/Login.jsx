import { useState } from 'react'
import { supabase } from '../lib/supabase'

// Benutzername wird intern zu einer Pseudo-E-Mail umgewandelt
// Der Nutzer gibt nur Benutzername + Passwort ein — keine persönlichen Daten
function toEmail(username) {
  return `${username.toLowerCase().trim()}@taktik-lernapp.app`
}

export default function Login({ onLogin }) {
  const [mode, setMode]       = useState('login')
  const [username, setUsername] = useState('')
  const [pass, setPass]       = useState('')
  const [role, setRole]       = useState('student')
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)
  const [dark, setDark]       = useState(() => {
    try { const s = localStorage.getItem('tl_dark'); return s !== null ? JSON.parse(s) : true }
    catch { return true }
  })

  const bg      = dark ? '#080b10' : '#f0f4f8'
  const surf    = dark ? '#0a0d14' : '#ffffff'
  const bord    = dark ? '#1c2430' : '#d0dce8'
  const text    = dark ? '#c0d0e0' : '#1a2a3a'
  const dim     = dark ? '#3d5060' : '#7090a0'
  const inputBg = dark ? '#0d1117' : '#f8fafb'
  const tc      = '#3b82f6'

  const inputStyle = {
    width: '100%', background: inputBg, border: `1px solid ${bord}`,
    borderRadius: 8, padding: '11px 14px', color: text,
    fontSize: 15, marginBottom: 12, outline: 'none', boxSizing: 'border-box',
    fontFamily: 'Arial', transition: 'background 0.2s, border-color 0.2s',
  }

  async function handleLogin(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const email = toEmail(username)
    const { data, error: err } = await supabase.auth.signInWithPassword({ email, password: pass })
    if (err) {
      setError('Benutzername oder Passwort falsch.')
      setLoading(false)
      return
    }
    const { data: profile } = await supabase
      .from('profiles')
      .select('role, display_name')
      .eq('id', data.user.id)
      .single()
    setLoading(false)
    if (profile) {
      onLogin({ role: profile.role, name: profile.display_name, userId: data.user.id })
    } else {
      setError('Profil nicht gefunden.')
    }
  }

  async function handleRegister(e) {
    e.preventDefault()
    setError('')
    if (username.trim().length < 3) { setError('Benutzername muss mindestens 3 Zeichen haben.'); return }
    if (pass.length < 6) { setError('Passwort muss mindestens 6 Zeichen haben.'); return }
    setLoading(true)
    const email = toEmail(username)

    const { data, error: err } = await supabase.auth.signUp({ email, password: pass })
    if (err) {
      setError(err.message === 'User already registered' ? 'Benutzername bereits vergeben.' : err.message)
      setLoading(false)
      return
    }
    const { error: perr } = await supabase.from('profiles').insert({
      id: data.user.id,
      role,
      display_name: username.trim(),
    })
    if (perr) {
      setError('Fehler beim Erstellen des Profils.')
      setLoading(false)
      return
    }
    setLoading(false)
    onLogin({ role, name: username.trim(), userId: data.user.id })
  }

  function toggleDark() {
    const next = !dark
    setDark(next)
    try { localStorage.setItem('tl_dark', JSON.stringify(next)) } catch {}
  }

  return (
    <div style={{
      minHeight: '100vh', background: bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20, fontFamily: 'Arial', transition: 'background 0.2s',
    }}>
      <button onClick={toggleDark} style={{
        position: 'fixed', top: 14, right: 14,
        background: 'transparent', border: `1px solid ${bord}`,
        borderRadius: 7, padding: '5px 10px', cursor: 'pointer',
        fontSize: 16, color: dim,
      }}>
        {dark ? '☀️' : '🌙'}
      </button>

      <div style={{
        background: surf, border: `1px solid ${bord}`,
        borderRadius: 12, padding: '36px 32px', width: '100%', maxWidth: 400,
      }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🪖</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: text, letterSpacing: '0.07em' }}>
            TAKTIK LERNAPP
          </div>
          <div style={{ fontSize: 11, color: dim, letterSpacing: '0.14em', marginTop: 5 }}>
            FAHRZEUGKENNUNG · BUNDESWEHR
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', marginBottom: 24, gap: 8 }}>
          {[
            { key: 'login', label: 'ANMELDEN' },
            { key: 'register', label: 'REGISTRIEREN' },
          ].map(m => (
            <button key={m.key} onClick={() => { setMode(m.key); setError('') }} style={{
              flex: 1, padding: '9px 0', borderRadius: 8, cursor: 'pointer',
              fontWeight: 600, fontSize: 13, letterSpacing: '0.06em',
              background: mode === m.key ? tc : 'transparent',
              color: mode === m.key ? '#fff' : dim,
              border: `1px solid ${mode === m.key ? tc : bord}`,
            }}>
              {m.label}
            </button>
          ))}
        </div>

        {error && (
          <div style={{
            background: dark ? '#2a0a0a' : '#fde8e8',
            border: `1px solid ${dark ? '#6b2200' : '#d93025'}`,
            borderRadius: 8, padding: '10px 14px',
            color: dark ? '#f87171' : '#b91c1c',
            fontSize: 13, marginBottom: 14,
          }}>{error}</div>
        )}

        {/* LOGIN */}
        {mode === 'login' && (
          <form onSubmit={handleLogin}>
            <input style={inputStyle} type="text" placeholder="Benutzername" value={username}
              onChange={e => setUsername(e.target.value)} required autoFocus autoComplete="username" />
            <input style={{ ...inputStyle, marginBottom: 16 }} type="password"
              placeholder="Passwort" value={pass}
              onChange={e => setPass(e.target.value)} required autoComplete="current-password" />
            <button type="submit" disabled={loading} style={{
              width: '100%', background: dark ? '#1e3a5f' : '#1e4a8f',
              border: `1px solid ${dark ? '#2d5080' : '#2d60b0'}`,
              borderRadius: 8, padding: '12px 0',
              color: dark ? '#7eb8f0' : '#ffffff',
              fontSize: 15, fontWeight: 700, letterSpacing: '0.08em',
              cursor: loading ? 'wait' : 'pointer', opacity: loading ? 0.6 : 1,
              fontFamily: 'Arial',
            }}>
              {loading ? '…' : 'ANMELDEN'}
            </button>
          </form>
        )}

        {/* REGISTER */}
        {mode === 'register' && (
          <form onSubmit={handleRegister}>
            <input style={inputStyle} type="text" placeholder="Benutzername (mind. 3 Zeichen)"
              value={username} onChange={e => setUsername(e.target.value)} required autoFocus />
            <input style={{ ...inputStyle, marginBottom: 16 }} type="password"
              placeholder="Passwort (mind. 6 Zeichen)" value={pass}
              onChange={e => setPass(e.target.value)} required />

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: dim, marginBottom: 8, letterSpacing: '0.1em' }}>
                ROLLE WÄHLEN
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                {[
                  { key: 'student', emoji: '🎓', label: 'Schüler', desc: 'Lernen & Üben' },
                  { key: 'teacher', emoji: '📋', label: 'Lehrer',  desc: 'Klassen verwalten' },
                ].map(r => (
                  <button key={r.key} type="button" onClick={() => setRole(r.key)} style={{
                    flex: 1, padding: '14px 8px', borderRadius: 10, cursor: 'pointer',
                    background: role === r.key ? (dark ? '#0f2a4a' : '#e8f0fe') : 'transparent',
                    border: `2px solid ${role === r.key ? tc : bord}`,
                    color: role === r.key ? tc : dim,
                    textAlign: 'center',
                  }}>
                    <div style={{ fontSize: 22, marginBottom: 4 }}>{r.emoji}</div>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{r.label}</div>
                    <div style={{ fontSize: 10, opacity: 0.75, marginTop: 3 }}>{r.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" disabled={loading} style={{
              width: '100%', background: tc, border: 'none',
              borderRadius: 8, padding: '12px 0',
              color: '#fff', fontSize: 15, fontWeight: 700, letterSpacing: '0.08em',
              cursor: loading ? 'wait' : 'pointer', opacity: loading ? 0.6 : 1,
              fontFamily: 'Arial',
            }}>
              {loading ? '…' : 'KONTO ERSTELLEN'}
            </button>
          </form>
        )}

        <div style={{ marginTop: 20, textAlign: 'center', fontSize: 11, color: dim }}>
          Kein E-Mail erforderlich · Anonym · Bundeswehr
        </div>
      </div>
    </div>
  )
}
