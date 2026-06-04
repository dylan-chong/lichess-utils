import { signal } from '@preact/signals-core'
import { describe, expect, it } from 'vitest'
import { createRoot, destroyRoot } from './root'

describe('root', () => {
  it('createRoot renders ControlPanel', () => {
    const boardChanged = signal(0)
    const mountPoint = document.createElement('div')

    createRoot(boardChanged, mountPoint)

    expect(mountPoint.innerHTML).toContain('button')
    expect(mountPoint.innerHTML.length).toBeGreaterThan(0)
  })

  it('destroyRoot unmounts component', () => {
    const boardChanged = signal(0)
    const mountPoint = document.createElement('div')

    createRoot(boardChanged, mountPoint)
    expect(mountPoint.innerHTML).not.toBe('')

    destroyRoot(mountPoint)
    expect(mountPoint.innerHTML).toBe('')
  })
})
