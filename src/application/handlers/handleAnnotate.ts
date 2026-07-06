import { DomSelector } from '../../constants/dom'
import { querySelector } from '../../platform/dom'

export function handleAnnotate(): void {
  const input = querySelector(DomSelector.KEYBOARD_INPUT) as HTMLInputElement | null
  if (input) {
    input.focus()
    input.value = '-'
    input.dispatchEvent(new Event('input', { bubbles: true }))
  }
}
