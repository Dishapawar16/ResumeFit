
import './ResumeBuilder.css'
import { useState } from 'react'
import { buildResumePayload } from './utils/resumePayload'

function ResumeBuilder() {
  const [step, setStep] = useState(1)

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
    college: '',
    degree: '',
    fieldOfStudy: '',
    graduationYear: '',
    jobTitle: '',
    company: '',
    experience: '',
    skills: '',
    jobDescription: '',
  })

  const updateField = (event) => {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

const handleContinue = (event) => {
  event.preventDefault()

  if (step < 4) {
    setStep((current) => current + 1)
    return
  }

  const payload = buildResumePayload(formData)
  console.log('Resume payload:', payload)
}
  const handleBack = () => {
    setStep((current) => Math.max(current - 1, 1))
  }

  const inputProps = (name) => ({
    name,
    value: formData[name],
    onChange: updateField,
  })

  return (
    <div className="builder-page">
      <header className="builder-header">
        <a className="builder-brand" href="/">
          <span className="builder-logo">R</span>
          ResumeFit
        </a>

        <a className="back-link" href="/">
          ← Back to Home
        </a>
      </header>

      <main className="builder-main">
        <div className="builder-intro">
          <span className="builder-label">
            YOUR CAREER, YOUR STORY
          </span>

          <h1>Let's build your resume.</h1>

          <p>
            Start with the basics. Add your details, education,
            experience, and skills to create your professional resume.
          </p>
        </div>

        <section className="form-card">
          <div className="form-card-heading">
            <div>
              <span className="step-label">
                STEP 0{step}
              </span>

              <h2>
                {step === 1 && 'Personal information'}
                {step === 2 && 'Education'}
                {step === 3 && 'Work experience'}
                {step === 4 && 'Skills & Job Description'}
              </h2>
            </div>

            {step === 1 && (
              <span className="required-note">
                * Required fields
              </span>
            )}
          </div>

          <p className="form-description">
            {step === 1 && 'Tell us how employers can contact you.'}
            {step === 2 && 'Add your educational qualifications.'}
            {step === 3 && 'Add your work or internship experience.'}
            {step === 4 &&
              'Add your skills and the job description to prepare for ATS compatibility scoring.'}
          </p>

          <form onSubmit={handleContinue}>
            {step === 1 && (
              <div className="form-grid">
                <div className="form-field">
                  <label htmlFor="fullName">Full name *</label>
                  <input
                    id="fullName"
                    {...inputProps('fullName')}
                    required
                    placeholder="e.g. Alex Morgan"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="email">Email address *</label>
                  <input
                    id="email"
                    type="email"
                    {...inputProps('email')}
                    required
                    placeholder="e.g. alex@email.com"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="phone">Phone number</label>
                  <input
                    id="phone"
                    type="tel"
                    {...inputProps('phone')}
                    placeholder="e.g. +91 98765 43210"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="location">City / Location</label>
                  <input
                    id="location"
                    {...inputProps('location')}
                    placeholder="e.g. New Delhi, India"
                  />
                </div>

                <div className="form-field full-width">
                  <label htmlFor="summary">
                    Professional summary
                  </label>

                  <textarea
                    id="summary"
                    {...inputProps('summary')}
                    rows="4"
                    placeholder="Write a short introduction about yourself..."
                  />

                  <span className="field-hint">
                    You can improve this later.
                  </span>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="form-grid">
                <div className="form-field">
                  <label htmlFor="college">
                    College / University *
                  </label>

                  <input
                    id="college"
                    {...inputProps('college')}
                    required
                    placeholder="Enter college or university name"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="degree">Degree / Course *</label>

                  <input
                    id="degree"
                    {...inputProps('degree')}
                    required
                    placeholder="e.g. MCA"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="fieldOfStudy">
                    Field of study
                  </label>

                  <input
                    id="fieldOfStudy"
                    {...inputProps('fieldOfStudy')}
                    placeholder="e.g. Computer Applications"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="graduationYear">
                    Graduation year
                  </label>

                  <input
                    id="graduationYear"
                    type="number"
                    {...inputProps('graduationYear')}
                    placeholder="e.g. 2027"
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="form-grid">
                <div className="form-field">
                  <label htmlFor="jobTitle">
                    Job title / Role
                  </label>

                  <input
                    id="jobTitle"
                    {...inputProps('jobTitle')}
                    placeholder="e.g. Web Development Intern"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="company">Company</label>

                  <input
                    id="company"
                    {...inputProps('company')}
                    placeholder="Enter company name"
                  />
                </div>

                <div className="form-field full-width">
                  <label htmlFor="experience">
                    Responsibilities and achievements
                  </label>

                  <textarea
                    id="experience"
                    {...inputProps('experience')}
                    rows="4"
                    placeholder="Describe your work, projects, or internship..."
                  />

                  <span className="field-hint">
                    No experience yet? You can leave this blank.
                  </span>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="form-grid">
                <div className="form-field full-width">
                  <label htmlFor="skills">Your skills</label>

                  <textarea
                    id="skills"
                    {...inputProps('skills')}
                    rows="5"
                    placeholder="e.g. HTML, CSS, JavaScript, C++, Communication"
                  />

                  <span className="field-hint">
                    Separate skills with commas.
                  </span>
                </div>

                <div className="form-field full-width">
                  <label htmlFor="jobDescription">
                    Target Job Description
                  </label>

                  <textarea
                    id="jobDescription"
                    {...inputProps('jobDescription')}
                    rows="6"
                    placeholder="Paste the target job description here, including required skills, qualifications, and responsibilities..."
                  />

                  <span className="field-hint">
                    Paste the job description you want to compare
                    with your resume for ATS compatibility scoring.
                  </span>
                </div>
              </div>
            )}

            <div className="form-actions">
              <span className="save-note">
                Your resume details are not saved yet.
              </span>

              <div className="builder-navigation">
                {step > 1 && (
                  <button
                    type="button"
                    className="continue-button"
                    onClick={handleBack}
                  >
                    ← Back
                  </button>
                )}

                <button
                  type="submit"
                  className="continue-button"
                >
                  {step < 4 ? (
                    <>
                      Continue to{' '}
                      {step === 1
                        ? 'Education'
                        : step === 2
                          ? 'Experience'
                          : 'Skills'}
                      <span> →</span>
                    </>
                  ) : (
                    <>
                      Finish <span>✓</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {step === 4 && (
              <p className="form-description">
                Your resume details and target job description
                are collected in this form. ATS scoring, results,
                PDF export, and permanent saving are not
                implemented yet.
              </p>
            )}
          </form>
        </section>
      </main>
    </div>
  )
}

export default ResumeBuilder
