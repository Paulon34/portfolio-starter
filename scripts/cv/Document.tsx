import React from 'react'
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer'
import type { CvFocus, Locale, PortfolioData } from '../../src/data/types.ts'
import { tLocal, tLocalList } from '../../src/data/types.ts'
import {
  computeExperienceDuration,
  formatExperienceDuration,
  formatExperienceSince,
} from '../../src/lib/experienceDuration.ts'

/** ATS-friendly single-column layout: Helvetica, clear headings, no tables/graphics. */
const styles = StyleSheet.create({
  page: {
    paddingTop: 32,
    paddingBottom: 32,
    paddingHorizontal: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
    color: '#111111',
    lineHeight: 1.35,
  },
  name: { fontSize: 16, fontFamily: 'Helvetica-Bold', marginBottom: 2 },
  role: { fontSize: 10, marginBottom: 4, color: '#222222' },
  meta: { fontSize: 9, marginBottom: 3, color: '#333333' },
  section: { marginTop: 10, marginBottom: 2 },
  heading: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    marginBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#222222',
    paddingBottom: 2,
    letterSpacing: 0.6,
  },
  itemTitle: { fontFamily: 'Helvetica-Bold', fontSize: 10 },
  itemMeta: { fontSize: 9, color: '#333333', marginBottom: 2 },
  bullet: { marginLeft: 10, marginBottom: 1.5 },
  row: { marginBottom: 6 },
  skills: { marginBottom: 1.5 },
})

function sectionTitle(locale: Locale, key: string): string {
  const map: Record<string, Record<Locale, string>> = {
    summary: { 'pt-BR': 'Resumo', en: 'Summary' },
    experience: { 'pt-BR': 'Experiência', en: 'Experience' },
    education: { 'pt-BR': 'Formação', en: 'Education' },
    skills: { 'pt-BR': 'Competências', en: 'Skills' },
    projects: { 'pt-BR': 'Projetos', en: 'Projects' },
    languages: { 'pt-BR': 'Idiomas', en: 'Languages' },
    objective: { 'pt-BR': 'Objetivo', en: 'Objective' },
  }
  return map[key]?.[locale] ?? key
}

function focusBlurb(locale: Locale, focus: CvFocus): string {
  if (focus === 'infra') {
    return locale === 'pt-BR'
      ? 'Foco: Linux, redes, virtualização, monitoramento e automação de infraestrutura.'
      : 'Focus: Linux, networking, virtualization, monitoring, and infrastructure automation.'
  }
  return locale === 'pt-BR'
    ? 'Foco: desenvolvimento de software, APIs, TypeScript/React e automação.'
    : 'Focus: software development, APIs, TypeScript/React, and automation.'
}

export function CvDocument({
  data,
  locale,
  focus,
}: {
  data: PortfolioData
  locale: Locale
  focus: CvFocus
}) {
  const { profile, experience, skills, projects, languages, goals } = data
  const work = experience.filter((item) => item.kind === 'work')
  const education = experience.filter((item) => item.kind === 'education')
  const focusSkills =
    focus === 'infra'
      ? skills.filter((s) =>
          ['linux', 'networks', 'virtualization', 'devops', 'ai'].includes(s.id),
        )
      : skills.filter((s) =>
          ['development', 'ai', 'databases', 'devops', 'linux'].includes(s.id),
        )
  const duration = formatExperienceDuration(
    computeExperienceDuration(experience),
    locale,
  )
  const since = formatExperienceSince(
    experience,
    locale,
    locale === 'pt-BR' ? 'Atuando em TI desde' : 'Working in IT since',
  )

  // Public-only contact: phone only when explicitly enabled in public profile.
  const contactParts = [
    profile.email,
    profile.githubUrl.replace(/^https?:\/\//, ''),
    profile.linkedinUrl.replace(/^https?:\/\/(www\.)?/, ''),
  ]
  if (profile.phoneEnabled && profile.phone.trim()) {
    contactParts.push(profile.phone.trim())
  }

  const featuredProjects = projects.filter((p) => p.featured).slice(0, 4)

  return (
    <Document
      title={`${profile.fullName} — CV (${focus})`}
      author={profile.fullName}
      subject={`${focus} resume`}
      language={locale}
      keywords={`${profile.fullName}, ${focus}, Linux, IT`}
    >
      <Page size="A4" style={styles.page} wrap>
        <Text style={styles.name}>{profile.fullName}</Text>
        <Text style={styles.role}>{tLocal(profile.roleValue, locale)}</Text>
        <Text style={styles.meta}>{contactParts.join('  |  ')}</Text>
        <Text style={styles.meta}>
          {since ? `${since}  ·  ` : ''}
          {locale === 'pt-BR' ? 'Experiência acumulada:' : 'Accumulated experience:'}{' '}
          {duration}
        </Text>
        <Text style={styles.meta}>{focusBlurb(locale, focus)}</Text>

        <View style={styles.section}>
          <Text style={styles.heading}>{sectionTitle(locale, 'objective')}</Text>
          <Text>{tLocal(goals.notes, locale)}</Text>
          <Text style={{ marginTop: 2 }}>
            {tLocalList(goals.targetRoles, locale).join(' · ')}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>{sectionTitle(locale, 'summary')}</Text>
          {tLocalList(profile.bio, locale).map((p) => (
            <Text key={p.slice(0, 24)} style={{ marginBottom: 3 }}>
              {p}
            </Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>{sectionTitle(locale, 'experience')}</Text>
          {work.map((item) => (
            <View key={item.id} style={styles.row} wrap={false}>
              <Text style={styles.itemTitle}>
                {tLocal(item.title, locale)} — {tLocal(item.org, locale)}
              </Text>
              <Text style={styles.itemMeta}>{tLocal(item.periodLabel, locale)}</Text>
              {tLocalList(item.summary, locale).map((line) => (
                <Text key={line} style={styles.bullet}>
                  • {line}
                </Text>
              ))}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>{sectionTitle(locale, 'education')}</Text>
          {education.map((item) => (
            <View key={item.id} style={styles.row} wrap={false}>
              <Text style={styles.itemTitle}>
                {tLocal(item.title, locale)} — {tLocal(item.org, locale)}
              </Text>
              <Text style={styles.itemMeta}>{tLocal(item.periodLabel, locale)}</Text>
              {tLocalList(item.summary, locale)
                .slice(0, 2)
                .map((line) => (
                  <Text key={line} style={styles.bullet}>
                    • {line}
                  </Text>
                ))}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>{sectionTitle(locale, 'skills')}</Text>
          {focusSkills.map((cat) => (
            <Text key={cat.id} style={styles.skills}>
              {tLocal(cat.title, locale)}: {cat.items.join(', ')}
            </Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>{sectionTitle(locale, 'projects')}</Text>
          {featuredProjects.map((project) => (
            <View key={project.id} style={styles.row} wrap={false}>
              <Text style={styles.itemTitle}>{tLocal(project.title, locale)}</Text>
              <Text>{tLocal(project.summary, locale)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>{sectionTitle(locale, 'languages')}</Text>
          {languages.map((lang) => (
            <Text key={lang.id}>
              {tLocal(lang.name, locale)} — {tLocal(lang.level, locale)}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  )
}
