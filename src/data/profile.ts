import type { Profile, SocialLink } from './types'
import raw from './content/profile.json'

export const profile = raw as Profile

export function getVisibleSocials(data: Profile = profile): SocialLink[] {
  return data.socials.filter((social) => {
    if (!social.enabled || !social.href.trim()) return false
    if (social.id === 'phone' && (!data.phoneEnabled || !data.phone.trim())) {
      return false
    }
    return true
  })
}

export function getPhoneHref(data: Profile = profile): string | null {
  if (!data.phoneEnabled || !data.phone.trim()) return null
  const digits = data.phone.replace(/[^\d+]/g, '')
  return digits ? `tel:${digits}` : null
}
