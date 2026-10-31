import { Nav } from '@/components/Nav'
import { I18nProvider } from '@/i18n/context'
import { ThemeProvider } from '@/theme'
import { About } from '@/sections/About'
import { Contact } from '@/sections/Contact'
import { Experience } from '@/sections/Experience'
import { Footer } from '@/sections/Footer'
import { Hero } from '@/sections/Hero'
import { Projects } from '@/sections/Projects'
import { Skills } from '@/sections/Skills'

export default function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <div className="min-h-svh overflow-x-hidden bg-bg text-text">
          <a
            href="#about"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-bg"
          >
            Skip to content
          </a>
          <Nav />
          <main>
            <Hero />
            <About />
            <Experience />
            <Skills />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </div>
      </I18nProvider>
    </ThemeProvider>
  )
}
