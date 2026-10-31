export type Locale = 'pt-BR' | 'en'

export type LocalizedString = Record<Locale, string>
export type LocalizedStringList = Record<Locale, string[]>

export type SocialId = 'github' | 'linkedin' | 'email' | 'phone'

export type SocialLink = {
  id: SocialId
  label: LocalizedString
  href: string
  enabled: boolean
}

export type CvFocus = 'infra' | 'software'

export type Profile = {
  firstName: string
  lastName: string
  fullName: string
  email: string
  phone: string
  phoneEnabled: boolean
  photoSrc: string
  githubUrl: string
  linkedinUrl: string
  seekingRemote: boolean
  roles: string[]
  interestAreas: string[]
  favoriteTechs: string[]
  socials: SocialLink[]
  /** Month internship / primary IT role started — YYYY-MM, no invented day. */
  primaryItStartMonth: string
  headline: LocalizedString
  bio: LocalizedStringList
  roleLabel: LocalizedString
  roleValue: LocalizedString
  focusLabel: LocalizedString
  focusValue: LocalizedString
  seekingLabel: LocalizedString
  seekingValue: LocalizedString
}

export type TimelineKind = 'work' | 'education'

export type TimelineItem = {
  id: string
  kind: TimelineKind
  /** Inclusive start month YYYY-MM, or null if unknown (never invent) */
  startMonth: string | null
  /** Inclusive end month YYYY-MM, null if current/unknown */
  endMonth: string | null
  /** Counts toward professional experience duration (requires startMonth) */
  countsTowardExperience: boolean
  /** Human period label when months are unknown or for display */
  periodLabel: LocalizedString
  title: LocalizedString
  org: LocalizedString
  summary: LocalizedStringList
  tags?: string[]
}

export type SkillCategoryId =
  | 'linux'
  | 'networks'
  | 'virtualization'
  | 'development'
  | 'ai'
  | 'databases'
  | 'devops'

export type SkillCategory = {
  id: SkillCategoryId
  title: LocalizedString
  items: string[]
}

export type ProjectStatus = 'active' | 'planning' | 'showcase'

export type Project = {
  id: string
  status: ProjectStatus
  featured: boolean
  href?: string
  repoPublic: boolean
  tags: string[]
  title: LocalizedString
  summary: LocalizedString
  detail: LocalizedString
}

export type Certification = {
  id: string
  name: LocalizedString
  issuer: string
  year?: string
  url?: string
}

export type SpokenLanguage = {
  id: string
  name: LocalizedString
  level: LocalizedString
}

export type Goals = {
  seekingRemote: boolean
  targetRoles: LocalizedStringList
  notes: LocalizedString
}

export type PresentationPrefs = {
  defaultLocale: Locale
  cvFocus: CvFocus
  /** Relative public path pattern; {locale} and {focus} substituted at runtime */
  resumePathTemplate: string
  showExperienceCounter: boolean
}

export type PortfolioData = {
  profile: Profile
  experience: TimelineItem[]
  skills: SkillCategory[]
  projects: Project[]
  certifications: Certification[]
  languages: SpokenLanguage[]
  goals: Goals
  presentation: PresentationPrefs
}

export function tLocal(
  value: LocalizedString,
  locale: Locale,
): string {
  return value[locale] ?? value['pt-BR']
}

export function tLocalList(
  value: LocalizedStringList,
  locale: Locale,
): string[] {
  return value[locale] ?? value['pt-BR']
}
