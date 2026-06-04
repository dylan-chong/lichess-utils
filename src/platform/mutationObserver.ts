export function createMutationObserver(callback: MutationCallback): MutationObserver {
  return new MutationObserver(callback)
}

export function observe(
  observer: MutationObserver,
  target: Node,
  options: MutationObserverInit
): void {
  observer.observe(target, options)
}

export function disconnect(observer: MutationObserver): void {
  observer.disconnect()
}
