export type Locale = 'pt-BR' | 'en'

export type Dictionary = {
  meta: {
    title: string
    description: string
  }
  nav: {
    about: string
    experience: string
    skills: string
    projects: string
    contact: string
    resume: string
    language: string
  }
  hero: {
    exploreProjects: string
    aboutMe: string
    resume: string
    github: string
    linkedin: string
    interestsLabel: string
    panelTitle: string
    panelSubtitle: string
    terminalTitle: string
    terminalHint: string
    demoBadge: string
    stackLabel: string
    focusLabel: string
    projectsLabel: string
  }
  about: {
    eyebrow: string
    title: string
    favoritesLabel: string
    photoAlt: string
    photoHint: string
  }
  theme: {
    label: string
    obsidian: string
    electricBlue: string
    lightPro: string
  }
  experience: {
    eyebrow: string
    title: string
    work: string
    education: string
    counterLabel: string
    counterHint: string
    sincePrefix: string
  }
  skills: {
    eyebrow: string
    title: string
    subtitle: string
  }
  projects: {
    eyebrow: string
    title: string
    subtitle: string
    status: Record<string, string>
    privateNote: string
    view: string
  }
  contact: {
    eyebrow: string
    title: string
    subtitle: string
    remote: string
    email: string
    github: string
    linkedin: string
    phone: string
    resume: string
    resumeMissing: string
  }
  footer: {
    built: string
    rights: string
  }
}
