import { NavLink, Link, Outlet } from 'react-router-dom'
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
      </aside>

      <main className="dash-content">
        <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout