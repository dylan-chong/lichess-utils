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

export function removeElement(element: Element): void {
  element.remove()
}

export function getBoundingClientRect(element: Element): DOMRect {
  return element.getBoundingClientRect()
}

export function waitForElement(selector: string): Promise<Element> {
  return new Promise((resolve) => {
    const element = querySelector(selector)
    if (element) {
      resolve(element)
      return
    }

    const observer = new MutationObserver(() => {
      const element = querySelector(selector)
      if (element) {
        observer.disconnect()
        resolve(element)
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })
  })
}
