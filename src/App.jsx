import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { supabase } from './lib/supabase'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import TeacherDashboard from './pages/TeacherDashboard'

export default function App() {
  const [user, setUser] = useState(null)   // { role, name, userId } | null
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Beim Start: prüfen ob Session noch aktiv
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role, display_name')
          .eq('id', session.user.id)
          .single()
        if (profile) {
          setUser({ role: profile.role, name: profile.display_name, userId: session.user.id })
        }
      }
      setLoading(false)
    })

    // Session-Änderungen beobachten
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) setUser(null)
    })
    return () => subscription.unsubscribe()
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    setUser(null)
  }

  function handleLogin(userData) {
    setUser(userData)
  }

  if (loading) return (
    <div style={{
      minHeight: '100vh', background: '#080b10',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#3d5060', fontFamily: 'Arial', fontSize: 14, letterSpacing: '0.1em',
    }}>
      LADEN …
    </div>
  )

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/app" replace /> : <Login onLogin={handleLogin} />}
        />
        <Route
          path="/app"
          element={
            !user ? <Navigate to="/login" replace /> :
            user.role === 'teacher'
              ? <TeacherDashboard user={user} onLogout={handleLogout} />
              : <Dashboard user={user} onLogout={handleLogout} />
          }
        />
        <Route
          path="*"
          element={<Navigate to={user ? '/app' : '/login'} replace />}
        />
      </Routes>
    </BrowserRouter>
  )
}
