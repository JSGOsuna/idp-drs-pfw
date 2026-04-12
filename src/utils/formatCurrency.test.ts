import { describe, it, expect } from 'vitest'
import formatCurrency from './index'

describe('formatCurrency', () => {
  it('formatea número como USD', () => {
    const out = formatCurrency(1234.5)
    expect(out).toContain('1,234.50')
    expect(out).toContain('$')
  })
})
