import type { ReadonlySignal, Signal } from '@preact/signals'
import type { ComponentChildren } from 'preact'

interface ConditionalControlsProps {
  condition: Signal<boolean> | ReadonlySignal<boolean>
  children: ComponentChildren
}

export function ConditionalControls({ condition, children }: ConditionalControlsProps) {
  if (!condition.value) {
    return null
  }

  return <div style={{ marginLeft: '16px' }}>{children}</div>
}
