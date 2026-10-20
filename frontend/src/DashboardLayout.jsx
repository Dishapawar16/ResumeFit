import { NavLink, Link, Outlet, useNavigate } from 'react-router-dom'
import './DashboardLayout.css'

const menuItems = [
  { to: '/app', label: 'Home', icon: '⌂', end: true },
  { to: '/builder', label: 'Resume Builder', icon: '▤' },
  { to: '/app/analyser', label: 'Resume Analyser', icon: '⌕' },
  { to: '/app/resumes', label: 'My Resumes', icon: '❐' },
  { to: '/app/profile', label: 'Profile', icon: '☺' },
  { to: '/app/help', label: 'Help', icon: '?' },
]

function DashboardLayout() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('resumefitUser') || 'null')

  const handleLogout = () => {
    localStorage.removeItem('resumefitUser')
    navigate('/login')
  }

  return (
    <div className="dash-layout">
      <aside className="sidebar">
        <Link className="sidebar-brand" to="/">
          <span className="sidebar-logo">R</span>
          ResumeFit
        </Link>

        <nav className="sidebar-menu">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                isActive ? 'menu-link active' : 'menu-link'
              }
            >
              <span className="menu-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-user">
          <span className="sidebar-user-name">{user?.fullName}</span>
          <button
            type="button"
            className="logout-button"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      </aside>

      <main className="dash-content">
        <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout