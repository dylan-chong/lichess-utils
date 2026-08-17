import { DomSelector } from '../../constants/dom'
import { querySelector } from '../../platform/dom'

export function handleAnnotate(): void {
  const input = querySelector(DomSelector.KEYBOARD_INPUT) as HTMLInputElement | null
  if (input) {
    input.focus()
    input.value = '-f7e5,e4'
    input.dispatchEvent(new Event('input', { bubbles: true }))
  }
}
