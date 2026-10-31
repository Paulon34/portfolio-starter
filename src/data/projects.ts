import type { Project } from './types'
import raw from './content/projects.json'

export const projects = raw as Project[]
