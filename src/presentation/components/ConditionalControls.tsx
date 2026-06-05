import type { ComponentChildren } from 'preact'

interface ConditionalControlsProps {
  condition: boolean
  children: ComponentChildren
}

export function ConditionalControls({ condition, children }: ConditionalControlsProps) {
  if (!condition) {
    return null
  }

  return <div style={{ marginLeft: '16px' }}>{children}</div>
}
