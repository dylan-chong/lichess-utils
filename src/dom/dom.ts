export function createDiv(): HTMLDivElement {
  return document.createElement('div')
}

export function querySelector(selector: string): Element | null {
  return document.querySelector(selector)
}

export function appendChild(parent: Element, child: Element): void {
  parent.appendChild(child)
}
