import { DomSelector } from '../../constants/dom'
import { querySelector } from '../../platform/dom'

export function applyBlur(amount: number): void {
  const container = querySelector(DomSelector.CONTAINER) as HTMLElement | null
  if (!container) return

  if (amount === 0) {
    container.style.filter = ''
  } else {
    container.style.filter = `blur(${amount}px)`
  }
}
