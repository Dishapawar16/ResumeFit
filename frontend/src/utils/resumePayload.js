// frontend/src/utils/resumePayload.js

const clean = (value) => (value || '').trim()

const splitSkills = (text) =>
  clean(text)
    .split(',')
    .map((skill) => skill.trim())
    .filter(Boolean)

export function buildResumePayload(formData) {
  return {
    personal: {
      fullName: clean(formData.fullName),
      email: clean(formData.email),
      phone: clean(formData.phone),
      location: clean(formData.location),
      summary: clean(formData.summary),
    },
    education: [
      {
        college: clean(formData.college),
        degree: clean(formData.degree),
        fieldOfStudy: clean(formData.fieldOfStudy),
        graduationYear: clean(formData.graduationYear),
      },
    ],
    experience: [
      {
        jobTitle: clean(formData.jobTitle),
        company: clean(formData.company),
        description: clean(formData.experience),
      },
    ],
    skills: splitSkills(formData.skills),
    jobDescription: clean(formData.jobDescription),
  }
}