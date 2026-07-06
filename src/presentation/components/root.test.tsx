import { signal } from '@preact/signals-core'
import { describe, expect, it } from 'vitest'
import { createSettingsStore } from '../../application/settings/settingsStore'
import { createRoot, destroyRoot } from './root'

describe('root', () => {
  it('createRoot renders ControlPanel', () => {
    const boardChanged = signal(0)
    const mountPoint = document.createElement('div')
    const settings = createSettingsStore()

    createRoot(boardChanged, mountPoint, settings, () => {})

    expect(mountPoint.innerHTML).toContain('button')
    expect(mountPoint.innerHTML.length).toBeGreaterThan(0)
  })

  it('destroyRoot unmounts component', () => {
    const boardChanged = signal(0)
    const mountPoint = document.createElement('div')
    const settings = createSettingsStore()

    createRoot(boardChanged, mountPoint, settings, () => {})
    expect(mountPoint.innerHTML).not.toBe('')

    destroyRoot(mountPoint)
    expect(mountPoint.innerHTML).toBe('')
  })
})
