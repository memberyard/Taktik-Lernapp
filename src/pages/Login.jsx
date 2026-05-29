import { useState, useEffect } from 'react'

// ── Zugangsdaten hier ändern ──────────────────────────────
const USERS = {
  'bw': 'taktik2026',
}
// ─────────────────────────────────────────────────────────

export default function Login({ onLogin }) {
  const [user, setUser]   = useState('')
  const [pass, setPass]   = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Respect saved dark/light preference
  const [dark, setDark] = useState(() => {
    try { const s = localStorage.getItem('tl_dark'); return s !== null ? JSON.parse(s) : true }
    catch { return true }
  })

  const bg     = dark ? '#080b10' : '#f0f4f8'
  const surf   = dark ? '#0a0d14' : '#ffffff'
  const bord   = dark ? '#1c2430' : '#d0dce8'
  const text   = dark ? '#c0d0e0' : '#1a2a3a'
  const dim    = dark ? '#3d5060' : '#7090a0'
  const inputBg = dark ? '#0d1117' : '#f8fafb'

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    setTimeout(() => {
      if (USERS[user] && USERS[user] === pass) {
        localStorage.setItem('tl_auth', '1')
        onLogin()
      } else {
        setError('Benutzername oder Passwort falsch.')
      }
      setLoading(false)
    }, 300)
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
      {/* Dark/light toggle top-right */}
      <button
        onClick={toggleDark}
        style={{
          position: 'fixed', top: 14, right: 14,
          background: 'transparent', border: `1px solid ${bord}`,
          borderRadius: 7, padding: '5px 10px', cursor: 'pointer',
          fontSize: 16, color: dim,
        }}
        title="Hell/Dunkel umschalten"
      >
        {dark ? '☀️' : '🌙'}
      </button>

      <div style={{
        background: surf, border: `1px solid ${bord}`,
        borderRadius: 12, padding: '36px 32px', width: '100%', maxWidth: 380,
        transition: 'background 0.2s, border-color 0.2s',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🪖</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: text, letterSpacing: '0.07em' }}>
            TAKTIK LERNAPP
          </div>
          <div style={{ fontSize: 11, color: dim, letterSpacing: '0.14em', marginTop: 5 }}>
            FAHRZEUGKENNUNG · BUNDESWEHR
          </div>
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

        <form onSubmit={handleSubmit}>
          <input
            style={{
              width: '100%', background: inputBg, border: `1px solid ${bord}`,
              borderRadius: 8, padding: '11px 14px', color: text,
              fontSize: 15, marginBottom: 12, outline: 'none', boxSizing: 'border-box',
              fontFamily: 'Arial', transition: 'background 0.2s, border-color 0.2s',
            }}
            type="text"
            placeholder="Benutzername"
            value={user}
            onChange={e => setUser(e.target.value)}
            required
            autoComplete="username"
            autoFocus
          />
          <input
            style={{
              width: '100%', background: inputBg, border: `1px solid ${bord}`,
              borderRadius: 8, padding: '11px 14px', color: text,
              fontSize: 15, marginBottom: 16, outline: 'none', boxSizing: 'border-box',
              fontFamily: 'Arial', transition: 'background 0.2s, border-color 0.2s',
            }}
            type="password"
            placeholder="Passwort"
            value={pass}
            onChange={e => setPass(e.target.value)}
            required
            autoComplete="current-password"
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              background: dark ? '#1e3a5f' : '#1e4a8f',
              border: `1px solid ${dark ? '#2d5080' : '#2d60b0'}`,
              borderRadius: 8, padding: '12px 0',
              color: dark ? '#7eb8f0' : '#ffffff',
              fontSize: 15, fontWeight: 700, letterSpacing: '0.08em',
              cursor: loading ? 'wait' : 'pointer', opacity: loading ? 0.6 : 1,
              fontFamily: 'Arial',
            }}
          >
            {loading ? '…' : 'ANMELDEN'}
          </button>
        </form>
      </div>
    </div>
  )
}
