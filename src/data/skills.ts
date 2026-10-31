import type { SkillCategory } from './types'
import raw from './content/skills.json'

export const skills = raw as SkillCategory[]
export type { SkillCategoryId } from './types'

/** @deprecated use `skills` */
export const skillCategories = skills
