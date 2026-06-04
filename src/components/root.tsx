import { render } from 'preact'
import type { Signal } from '@preact/signals-core'
import { ControlPanel } from './ControlPanel'

export function createRoot(boardChanged: Signal<number>, mountPoint: HTMLElement): void {
  render(<ControlPanel boardChanged={boardChanged} />, mountPoint)
}

export function destroyRoot(mountPoint: HTMLElement): void {
  render(null, mountPoint)
}
