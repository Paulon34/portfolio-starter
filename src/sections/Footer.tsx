import { profile } from '@/data/profile'
import { useI18n } from '@/i18n/useI18n'

export function Footer() {
  const { t } = useI18n()

  return (
    <footer className="border-t border-border py-8 pb-[max(2rem,env(safe-area-inset-bottom,0px))]">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="font-mono text-xs">
          © {t.footer.rights}
        </p>
        <p className="font-mono text-xs">{t.footer.built}</p>
        <a
          href={profile.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="touch-cta inline-flex items-center font-mono text-xs text-accent hover:underline"
        >
          {profile.githubUrl.replace(/^https?:\/\//, '')}
        </a>
      </div>
    </footer>
  )
}
