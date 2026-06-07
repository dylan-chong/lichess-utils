import { beforeEach, describe, expect, it } from 'vitest'
import { applyBlur } from './applyBlur'

describe('applyBlur', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('applies blur filter when amount is greater than 0', () => {
    const container = document.createElement('cg-container')
    document.body.appendChild(container)

    applyBlur(4)

    expect(container.style.filter).toBe('blur(4px)')
  })

  it('clears filter when amount is 0', () => {
    const container = document.createElement('cg-container')
    container.style.filter = 'blur(8px)'
    document.body.appendChild(container)

    applyBlur(0)

    expect(container.style.filter).toBe('')
  })

  it('does nothing when container does not exist', () => {
    expect(() => applyBlur(4)).not.toThrow()
  })

  it('applies different blur amounts correctly', () => {
    const container = document.createElement('cg-container')
    document.body.appendChild(container)

    applyBlur(1)
    expect(container.style.filter).toBe('blur(1px)')

    applyBlur(8)
    expect(container.style.filter).toBe('blur(8px)')
  })
})
