export function createDiv(): HTMLDivElement {
  return document.createElement('div')
}

export function createSvgElement(tag: string): SVGElement {
  return document.createElementNS('http://www.w3.org/2000/svg', tag)
}

export function querySelector(selector: string): Element | null {
  return document.querySelector(selector)
}

export function querySelectorAll(selector: string): NodeListOf<Element> {
  return document.querySelectorAll(selector)
}

export function appendChild(parent: Element, child: Element): void {
  parent.appendChild(child)
}
