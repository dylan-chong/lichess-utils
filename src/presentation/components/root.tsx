import type { Signal } from '@preact/signals-core'
import { render } from 'preact'
import type { SettingsStore } from '../../application/settings/settingsStore'
import { SettingsProvider } from '../contexts/SettingsContext'
import { ControlPanel } from './ControlPanel'

export function createRoot(
  boardChanged: Signal<number>,
  mountPoint: HTMLElement,
  settings: SettingsStore,
  onAnnotate: () => void
): void {
  render(
    <SettingsProvider settings={settings}>
      <ControlPanel boardChanged={boardChanged} onAnnotate={onAnnotate} />
    </SettingsProvider>,
    mountPoint
  )
}

export function destroyRoot(mountPoint: HTMLElement): void {
  render(null, mountPoint)
}
