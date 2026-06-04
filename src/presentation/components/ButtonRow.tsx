import type { Signal } from '@preact/signals'
import type { ComponentChildren } from 'preact'

interface ButtonRowProps {
  children: ComponentChildren
  visible?: Signal<boolean>
}

export function ButtonRow({ children, visible }: ButtonRowProps) {
  if (visible && !visible.value) {
    return null
  }

  return <div>{children}</div>
}
