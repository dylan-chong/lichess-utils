import { describe, expect, it, vi } from 'vitest'
import { createMutationObserver, disconnect, observe } from './mutationObserver'

describe('mutationObserver', () => {
  it('createMutationObserver creates a MutationObserver instance', () => {
    const mockCallback = vi.fn()
    const observer = createMutationObserver(mockCallback)
    expect(observer).toBeInstanceOf(MutationObserver)
  })

  it('observe calls observer.observe with target and options', () => {
    let observeCalled = false
    let observeTarget: Node | null = null
    let observeOptions: MutationObserverInit | null = null

    const mockObserver = {
      observe: (target: Node, options: MutationObserverInit) => {
        observeCalled = true
        observeTarget = target
        observeOptions = options
      },
    } as MutationObserver

    const target = document.createElement('div')
    const options: MutationObserverInit = { childList: true }

    observe(mockObserver, target, options)

    expect(observeCalled).toBe(true)
    expect(observeTarget).toBe(target)
    expect(observeOptions).toEqual(options)
  })

  it('disconnect calls observer.disconnect', () => {
    let disconnectCalled = false

    const mockObserver = {
      disconnect: () => {
        disconnectCalled = true
      },
    } as MutationObserver

    disconnect(mockObserver)

    expect(disconnectCalled).toBe(true)
  })
})
