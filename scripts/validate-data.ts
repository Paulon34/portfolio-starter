import { validatePortfolioData, getPortfolioData } from '../src/data/validate.ts'

const result = validatePortfolioData(getPortfolioData())
if (!result.ok) {
  console.error('Portfolio data validation failed')
  console.error(result.error)
  process.exit(1)
}
console.log('Portfolio data OK')
