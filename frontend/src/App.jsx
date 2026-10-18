import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './LandingPage'
import ResumeBuilder from './ResumeBuilder'
import DashboardLayout from './DashboardLayout'
import HomePage from './HomePage'

function PlaceholderPage({ title }) {
  return (
    <div>
      <h1>{title}</h1>
      <p>Coming soon.</p>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/builder" element={<ResumeBuilder />} />

        <Route path="/app" element={<DashboardLayout />}>
          <Route index element={<HomePage />} />
          <Route path="analyser" element={<PlaceholderPage title="Resume Analyser" />} />
          <Route path="resumes" element={<PlaceholderPage title="My Resumes" />} />
          <Route path="profile" element={<PlaceholderPage title="Profile" />} />
          <Route path="help" element={<PlaceholderPage title="Help" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App