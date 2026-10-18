import './App.css'
import { useNavigate } from 'react-router-dom'

function LandingPage() {
  const navigate = useNavigate()
  
  return (
    <div className="app">
      <nav className="navbar">
        <a className="brand" href="#">
          <span className="brand-icon">R</span>
          ResumeFit
        </a>

        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>
          <a href="#about">About</a>
        </div>

        <a className="nav-button" href="#get-started">
          Get Started <span>↗</span>
        </a>
      </nav>

      <main>
        <section className="hero-section">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="status-dot"></span>
              YOUR CAREER, MORE CONFIDENTLY
            </div>

            <h1>
              Your next chapter
              <br />
              starts with a <span>better resume.</span>
            </h1>

            <p className="hero-description">
              Create a professional resume, check how well it matches your
              target job, and get helpful AI-powered suggestions to improve it.
            </p>

            <div className="hero-actions" id="get-started">
              <button 
                className="primary-button"
                type = "button"
                onClick={() => navigate('/builder')}
              >
                Build My Resume <span>↗</span>
              </button>
              <a className="secondary-button" href="#how-it-works">
                Discover how it works
              </a>
            </div>

            <div className="trust-note">
              <span>✳</span>
              A clearer way to present your potential.
            </div>
          </div>

          <div className="preview-area" aria-label="Resume preview illustration">
            <div className="decor decor-one"></div>
            <div className="decor decor-two"></div>

            <div className="preview-label">
              <span className="status-dot"></span>
              YOUR NEXT OPPORTUNITY
            </div>

            <div className="resume-card">
              <div className="resume-top">
                <div>
                  <div className="resume-name">Alex Morgan</div>
                  <div className="resume-role">PRODUCT DESIGNER</div>
                </div>
                <div className="resume-avatar">AM</div>
              </div>

              <div className="resume-contact">
                alex.morgan@email.com &nbsp; • &nbsp; Portfolio &nbsp; • &nbsp; LinkedIn
              </div>

              <div className="resume-rule"></div>

              <div className="resume-heading">PROFILE</div>
              <div className="resume-line long"></div>
              <div className="resume-line medium"></div>
              <div className="resume-line short"></div>

              <div className="resume-heading">EXPERIENCE</div>
              <div className="experience-row">
                <div>
                  <div className="resume-bold">Product Designer</div>
                  <div className="resume-muted">Creative Studio</div>
                </div>
                <div className="resume-muted">2023 — Present</div>
              </div>
              <div className="resume-line long"></div>
              <div className="resume-line medium"></div>

              <div className="resume-heading">SKILLS</div>
              <div className="skill-list">
                <span>Research</span>
                <span>UI / UX</span>
                <span>Prototyping</span>
              </div>

              <div className="resume-bottom">
                <span>RESUMEFIT PREVIEW</span>
                <span>01 / 01</span>
              </div>
            </div>

            <div className="score-card">
              <div className="score-top">
                <span className="score-symbol">✳</span>
                <span className="score-caption">JOB MATCH</span>
              </div>
              <div className="score-number">86<span>%</span></div>
              <div className="score-bar">
                <div></div>
              </div>
              <div className="score-foot">Illustrative preview</div>
            </div>

            <div className="tip-card">
              <span className="tip-icon">✦</span>
              <div>
                <strong>Room to improve</strong>
                <p>Highlight relevant skills</p>
              </div>
            </div>
          </div>
        </section>

        <section className="features-section" id="features">
          <div className="section-intro">
            <span className="section-kicker">A SMARTER START</span>
            <h2>More than a document.</h2>
            <p>
              The tools to help you understand your resume and present your
              experience with clarity.
            </p>
          </div>

          <div className="feature-grid">
            <article className="feature-card">
              <span className="feature-number">01</span>
              <div className="feature-icon">▤</div>
              <h3>Build your resume</h3>
              <p>
                Organize your education, experience, and skills into a
                structured resume.
              </p>
            </article>

            <article className="feature-card highlighted">
              <span className="feature-number">02</span>
              <div className="feature-icon">⌕</div>
              <h3>Check job compatibility</h3>
              <p>
                Compare your resume with a job description and identify
                relevant keywords.
              </p>
            </article>

            <article className="feature-card">
              <span className="feature-number">03</span>
              <div className="feature-icon">✳</div>
              <h3>Get AI suggestions</h3>
              <p>
                Explore suggestions for stronger wording, relevant skills,
                and possible improvements.
              </p>
            </article>
          </div>
        </section>

        <section className="how-section" id="how-it-works">
          <div>
            <span className="section-kicker">SIMPLE BY DESIGN</span>
            <h2>A clearer path to your next opportunity.</h2>
          </div>
          <div className="steps-list">
            <div className="step">
              <span>01</span>
              <div>
                <h3>Add your details</h3>
                <p>Enter your resume information and target job description.</p>
              </div>
            </div>
            <div className="step">
              <span>02</span>
              <div>
                <h3>Review your results</h3>
                <p>See keyword matching and feedback in one place.</p>
              </div>
            </div>
            <div className="step">
              <span>03</span>
              <div>
                <h3>Refine and export</h3>
                <p>Improve your content and prepare a resume for download.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="closing-section" id="about">
          <span className="section-kicker">YOUR EXPERIENCE MATTERS</span>
          <h2>Make your next application a more confident one.</h2>
          <a className="primary-button" href="#get-started">
            Start with ResumeFit <span>↗</span>
          </a>
        </section>
      </main>

      <footer className="footer">
        <a className="brand" href="#">
          <span className="brand-icon">R</span>
          ResumeFit
        </a>
        <p>Designed to help you present your potential.</p>
        <span>ResumeFit · Project Preview</span>
      </footer>
    </div>
  )
}

export default LandingPage
