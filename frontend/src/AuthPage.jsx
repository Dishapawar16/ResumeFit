import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './AuthPage.css'

const API = 'http://127.0.0.1:5000/api/auth'

function AuthPage({ mode }) {
  const isLogin = mode === 'login'
  const navigate = useNavigate()
  const location = useLocation()
  const justRegistered = location.state?.registered

  const [form, setForm] = useState({ fullName: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const updateField = (event) => {
    const { name, value } = event.target
    setForm((previous) => ({ ...previous, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch(`${API}/${isLogin ? 'login' : 'register'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Something went wrong.')
        return
      }

      if (isLogin) {
        localStorage.setItem('resumefitUser', JSON.stringify(data.user))
        navigate('/app')
      } else {
        navigate('/login', { state: { registered: true } })
      }
    } catch {
      setError('Cannot reach the server. Is the backend running?')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <header className="auth-header">
        <Link className="auth-brand" to="/">
          <span className="auth-logo">R</span>
          ResumeFit
        </Link>
        <Link className="auth-back" to="/">
          ← Back to Home
        </Link>
      </header>

      <main className="auth-main">
        <section className="auth-card">
          <span className="auth-label">
            {isLogin ? 'WELCOME BACK' : 'GET STARTED'}
          </span>
          <h1>{isLogin ? 'Log in to ResumeFit' : 'Create your account'}</h1>
          <p className="auth-sub">
            {isLogin
              ? 'Continue building and improving your resume.'
              : 'Save your resumes and track how well they match.'}
          </p>

          {isLogin && justRegistered && (
            <p className="auth-success">Account created. Please log in.</p>
          )}
          {error && <p className="auth-error">{error}</p>}

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="auth-field">
                <label htmlFor="fullName">Full name</label>
                <input
                  id="fullName"
                  name="fullName"
                  value={form.fullName}
                  onChange={updateField}
                  required
                  placeholder="e.g. Alex Morgan"
                />
              </div>
            )}

            <div className="auth-field">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={updateField}
                required
                placeholder="e.g. alex@email.com"
              />
            </div>

            <div className="auth-field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={updateField}
                required
                minLength={isLogin ? undefined : 6}
                placeholder={isLogin ? 'Your password' : 'At least 6 characters'}
              />
            </div>

            <button type="submit" className="auth-button" disabled={loading}>
              {loading
                ? 'Please wait...'
                : isLogin
                  ? 'Log in'
                  : 'Create account'}
            </button>
          </form>

          <p className="auth-switch">
            {isLogin ? (
              <>
                New here? <Link to="/register">Create an account</Link>
              </>
            ) : (
              <>
                Already have an account? <Link to="/login">Log in</Link>
              </>
            )}
          </p>
        </section>
      </main>
    </div>
  )
}

export default AuthPage