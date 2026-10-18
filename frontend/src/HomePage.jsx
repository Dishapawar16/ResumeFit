import { useState, useEffect } from 'react'

function HomePage() {
  const [backendStatus, setBackendStatus] = useState('checking')

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/health')
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'ok') {
          setBackendStatus('connected')
        } else {
          setBackendStatus('error')
        }
      })
      .catch(() => setBackendStatus('error'))
  }, [])

  return (
    <div>
      <h1>Home</h1>

      {backendStatus === 'checking' && <p>Checking backend...</p>}
      {backendStatus === 'connected' && <p>Backend connected ✓</p>}
      {backendStatus === 'error' && <p>Backend not reachable ✗</p>}
    </div>
  )
}

export default HomePage