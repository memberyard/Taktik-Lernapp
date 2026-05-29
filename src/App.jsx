import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

function isLoggedIn() {
  return localStorage.getItem('tl_auth') === '1'
}

export default function App() {
  const [auth, setAuth] = useState(isLoggedIn)

  function handleLogin()  { setAuth(true) }
  function handleLogout() { localStorage.removeItem('tl_auth'); setAuth(false) }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={auth ? <Navigate to="/app" replace /> : <Login onLogin={handleLogin} />}
        />
        <Route
          path="/app"
          element={auth ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/login" replace />}
        />
        <Route
          path="*"
          element={<Navigate to={auth ? '/app' : '/login'} replace />}
        />
      </Routes>
    </BrowserRouter>
  )
}
