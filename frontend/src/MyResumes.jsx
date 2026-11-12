import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './MyResumes.css'

const API = 'http://127.0.0.1:5000/api/resumes'

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem('resumefitToken')}`,
})

const clearSession = () => {
  localStorage.removeItem('resumefitUser')
  localStorage.removeItem('resumefitToken')
}

function MyResumes() {
  const navigate = useNavigate()
  const [resumes, setResumes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadResumes = async () => {
      try {
        const response = await fetch(API, { headers: authHeader() })
        const data = await response.json()

        if (response.status === 401) {
          clearSession()
          navigate('/login')
          return
        }
        if (!response.ok) {
          setError(data.message || 'Could not load your resumes.')
          return
        }
        setResumes(data.resumes)
      } catch {
        setError('Cannot reach the server. Is the backend running?')
      } finally {
        setLoading(false)
      }
    }

    loadResumes()
  }, [navigate])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this resume? This cannot be undone.')) return

    setError('')
    try {
      const response = await fetch(`${API}/${id}`, {
        method: 'DELETE',
        headers: authHeader(),
      })

      if (response.status === 401) {
        clearSession()
        navigate('/login')
        return
      }
      if (!response.ok) {
        const data = await response.json()
        setError(data.message || 'Could not delete the resume.')
        return
      }
      setResumes((previous) => previous.filter((item) => item.id !== id))
    } catch {
      setError('Cannot reach the server. Is the backend running?')
    }
  }

  return (
    <div className="myresumes">
      <div className="myresumes-head">
        <div>
          <h1>My Resumes</h1>
          <p>Resumes you have saved from the builder.</p>
        </div>
        <Link className="myresumes-new" to="/builder">
          + New resume
        </Link>
      </div>

      {error && <p className="myresumes-error">{error}</p>}
      {loading && <p className="myresumes-note">Loading your resumes...</p>}

      {!loading && !error && resumes.length === 0 && (
        <div className="myresumes-empty">
          <p>You have not saved any resumes yet.</p>
          <Link className="myresumes-new" to="/builder">
            Build your first resume
          </Link>
        </div>
      )}

      <ul className="myresumes-list">
        {resumes.map((item) => (
          <li key={item.id} className="myresumes-item">
            <div>
              <span className="myresumes-title">{item.title}</span>
              <span className="myresumes-date">
                Saved on {item.createdAt.slice(0, 10)}
              </span>
            </div>
            <button
              type="button"
              className="myresumes-delete"
              onClick={() => handleDelete(item.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MyResumes