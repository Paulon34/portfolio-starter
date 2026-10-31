import type { Certification } from './types'
import raw from './content/certifications.json'

export const certifications = raw as Certification[]
