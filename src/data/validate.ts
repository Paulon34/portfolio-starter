import { z } from 'zod'
import { certifications } from './certifications'
import { experience } from './experience'
import { goals } from './goals'
import { languages } from './languages'
import { presentation } from './presentation'
import { profile } from './profile'
import { projects } from './projects'
import { skills } from './skills'
import type { PortfolioData } from './types'

const localeString = z.object({
  'pt-BR': z.string().min(1),
  en: z.string().min(1),
})

const monthSchema = z
  .string()
  .regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'Expected YYYY-MM')
  .nullable()

export const portfolioDataSchema = z.object({
  profile: z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    fullName: z.string().min(1),
    email: z.string().email(),
    phone: z.string(),
    phoneEnabled: z.boolean(),
    photoSrc: z.string().min(1),
    githubUrl: z.string().url(),
    linkedinUrl: z.string().url(),
    seekingRemote: z.boolean(),
    primaryItStartMonth: z
      .string()
      .regex(/^\d{4}-(0[1-9]|1[0-2])$/),
    roles: z.array(z.string()).min(1),
    interestAreas: z.array(z.string()).min(1),
    favoriteTechs: z.array(z.string()).min(1),
    socials: z.array(
      z.object({
        id: z.enum(['github', 'linkedin', 'email', 'phone']),
        label: localeString,
        href: z.string(),
        enabled: z.boolean(),
      }),
    ),
    headline: localeString,
    bio: z.object({
      'pt-BR': z.array(z.string()).min(1),
      en: z.array(z.string()).min(1),
    }),
    roleLabel: localeString,
    roleValue: localeString,
    focusLabel: localeString,
    focusValue: localeString,
    seekingLabel: localeString,
    seekingValue: localeString,
  }),
  experience: z.array(
    z.object({
      id: z.string().min(1),
      kind: z.enum(['work', 'education']),
      startMonth: monthSchema,
      endMonth: monthSchema,
      countsTowardExperience: z.boolean(),
      periodLabel: localeString,
      title: localeString,
      org: localeString,
      summary: z.object({
        'pt-BR': z.array(z.string()).min(1),
        en: z.array(z.string()).min(1),
      }),
      tags: z.array(z.string()).optional(),
    }),
  ),
  skills: z.array(
    z.object({
      id: z.string(),
      title: localeString,
      items: z.array(z.string()).min(1),
    }),
  ),
  projects: z.array(
    z.object({
      id: z.string(),
      status: z.enum(['active', 'planning', 'showcase']),
      featured: z.boolean(),
      href: z.string().optional(),
      repoPublic: z.boolean(),
      tags: z.array(z.string()),
      title: localeString,
      summary: localeString,
      detail: localeString,
    }),
  ),
  certifications: z.array(
    z.object({
      id: z.string(),
      name: localeString,
      issuer: z.string(),
      year: z.string().optional(),
      url: z.string().url().optional(),
    }),
  ),
  languages: z.array(
    z.object({
      id: z.string(),
      name: localeString,
      level: localeString,
    }),
  ),
  goals: z.object({
    seekingRemote: z.boolean(),
    targetRoles: z.object({
      'pt-BR': z.array(z.string()),
      en: z.array(z.string()),
    }),
    notes: localeString,
  }),
  presentation: z.object({
    defaultLocale: z.enum(['pt-BR', 'en']),
    cvFocus: z.enum(['infra', 'software']),
    resumePathTemplate: z.string().min(1),
    showExperienceCounter: z.boolean(),
  }),
})

export function getPortfolioData(): PortfolioData {
  return {
    profile,
    experience,
    skills,
    projects,
    certifications,
    languages,
    goals,
    presentation,
  }
}

export function validatePortfolioData(data: PortfolioData = getPortfolioData()) {
  const parsed = portfolioDataSchema.safeParse(data)
  if (!parsed.success) {
    return { ok: false as const, error: parsed.error }
  }

  const forbidden = JSON.stringify(data).match(/ZAQUION/i)
  if (forbidden) {
    return {
      ok: false as const,
      error: new Error('ZAQUION must not be featured in portfolio data'),
    }
  }

  return { ok: true as const, data: parsed.data }
}
