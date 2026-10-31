import type { Locale, TimelineItem } from '../data/types'

export type MonthPoint = { year: number; month: number }

export type DurationParts = {
  totalMonths: number
  years: number
  months: number
}

const MONTH_RE = /^(\d{4})-(0[1-9]|1[0-2])$/

export function parseYearMonth(value: string): MonthPoint | null {
  const match = MONTH_RE.exec(value.trim())
  if (!match) return null
  return { year: Number(match[1]), month: Number(match[2]) }
}

export function monthIndex(point: MonthPoint): number {
  return point.year * 12 + (point.month - 1)
}

/** Inclusive month span. */
export function inclusiveMonthSpan(start: MonthPoint, end: MonthPoint): number {
  const span = monthIndex(end) - monthIndex(start) + 1
  return Math.max(0, span)
}

export function currentMonthPoint(now = new Date()): MonthPoint {
  return { year: now.getFullYear(), month: now.getMonth() + 1 }
}

/**
 * Merge overlapping inclusive month ranges and return unique covered months.
 * Gaps are not counted.
 */
export function mergeMonthRanges(
  ranges: Array<{ start: MonthPoint; end: MonthPoint }>,
): number {
  if (ranges.length === 0) return 0

  const normalized = ranges
    .map((range) => {
      const a = monthIndex(range.start)
      const b = monthIndex(range.end)
      return a <= b ? { start: a, end: b } : { start: b, end: a }
    })
    .sort((x, y) => x.start - y.start)

  let total = 0
  let curStart = normalized[0].start
  let curEnd = normalized[0].end

  for (let i = 1; i < normalized.length; i += 1) {
    const next = normalized[i]
    if (next.start <= curEnd + 1) {
      curEnd = Math.max(curEnd, next.end)
    } else {
      total += curEnd - curStart + 1
      curStart = next.start
      curEnd = next.end
    }
  }
  total += curEnd - curStart + 1
  return total
}

export function experienceRanges(
  items: TimelineItem[],
  now = new Date(),
): Array<{ start: MonthPoint; end: MonthPoint }> {
  const today = currentMonthPoint(now)
  const ranges: Array<{ start: MonthPoint; end: MonthPoint }> = []

  for (const item of items) {
    if (!item.countsTowardExperience || !item.startMonth) continue
    const start = parseYearMonth(item.startMonth)
    if (!start) continue
    const end = item.endMonth ? parseYearMonth(item.endMonth) : today
    if (!end) continue
    // Do not count future-only ranges
    if (monthIndex(start) > monthIndex(today)) continue
    const clampedEnd =
      monthIndex(end) > monthIndex(today) ? today : end
    ranges.push({ start, end: clampedEnd })
  }

  return ranges
}

export function computeExperienceDuration(
  items: TimelineItem[],
  now = new Date(),
): DurationParts {
  const totalMonths = mergeMonthRanges(experienceRanges(items, now))
  return {
    totalMonths,
    years: Math.floor(totalMonths / 12),
    months: totalMonths % 12,
  }
}

export function formatExperienceDuration(
  parts: DurationParts,
  locale: Locale,
): string {
  const { years, months, totalMonths } = parts
  if (totalMonths <= 0) {
    return locale === 'pt-BR' ? 'Recém-iniciado' : 'Just started'
  }

  // Early career: prefer months when under 12
  if (years === 0) {
    if (locale === 'pt-BR') {
      return totalMonths === 1 ? '1 mês' : `${totalMonths} meses`
    }
    return totalMonths === 1 ? '1 month' : `${totalMonths} months`
  }

  if (locale === 'pt-BR') {
    const y = years === 1 ? '1 ano' : `${years} anos`
    if (months === 0) return y
    const m = months === 1 ? '1 mês' : `${months} meses`
    return `${y} e ${m}`
  }

  const y = years === 1 ? '1 year' : `${years} years`
  if (months === 0) return y
  const m = months === 1 ? '1 month' : `${months} months`
  return `${y} ${m}`
}

const MONTH_NAMES: Record<Locale, string[]> = {
  'pt-BR': [
    'janeiro',
    'fevereiro',
    'março',
    'abril',
    'maio',
    'junho',
    'julho',
    'agosto',
    'setembro',
    'outubro',
    'novembro',
    'dezembro',
  ],
  en: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
}

/** Earliest confirmed IT start month among items that count toward experience. */
export function earliestExperienceStart(
  items: TimelineItem[],
): MonthPoint | null {
  let earliest: MonthPoint | null = null
  for (const item of items) {
    if (!item.countsTowardExperience || !item.startMonth) continue
    const start = parseYearMonth(item.startMonth)
    if (!start) continue
    if (!earliest || monthIndex(start) < monthIndex(earliest)) {
      earliest = start
    }
  }
  return earliest
}

/**
 * Human “since …” line, e.g. “Atuando em TI desde agosto de 2026”.
 * Uses calendar month labels from YYYY-MM (not day-level).
 */
export function formatExperienceSince(
  items: TimelineItem[],
  locale: Locale,
  sincePrefix: string,
): string | null {
  const start = earliestExperienceStart(items)
  if (!start) return null
  const monthName = MONTH_NAMES[locale][start.month - 1]
  if (locale === 'pt-BR') {
    return `${sincePrefix} ${monthName} de ${start.year}`
  }
  return `${sincePrefix} ${monthName} ${start.year}`
}
