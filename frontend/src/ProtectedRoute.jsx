import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
  const user = localStorage.getItem('resumefitUser')

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute