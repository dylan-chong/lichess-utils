import { signal } from '@preact/signals-core'
import { beforeEach, describe, expect, it } from 'vitest'
import { createBoardObserver, startBoardObserver, stopBoardObserver } from './observerState'

describe('boardObserver', () => {
  beforeEach(() => {
    document.body.innerHTML = '<cg-board></cg-board>'
  })

  it('increments boardChanged signal when board mutates', async () => {
    const boardChanged = signal(0)
    const state = createBoardObserver(boardChanged)
    startBoardObserver(state)

    const board = document.querySelector('cg-board')
    if (!board) throw new Error('Board element not found')
    const piece = document.createElement('piece')
    piece.className = 'white pawn'
    board.appendChild(piece)

    await new Promise((resolve) => setTimeout(resolve, 10))

    expect(boardChanged.value).toBe(1)

    stopBoardObserver(state)
  })

  it('does not increment after stopping', async () => {
    const boardChanged = signal(0)
    const state = createBoardObserver(boardChanged)
    startBoardObserver(state)
    stopBoardObserver(state)

    const board = document.querySelector('cg-board')
    if (!board) throw new Error('Board element not found')
    const piece = document.createElement('piece')
    piece.className = 'white pawn'
    board.appendChild(piece)

    await new Promise((resolve) => setTimeout(resolve, 10))

    expect(boardChanged.value).toBe(0)
  })

  it('returns early when board element not found', () => {
    document.body.innerHTML = '' // No board element

    const boardChanged = signal(0)
    const state = createBoardObserver(boardChanged)

    // Should not throw, just return without starting observer
    expect(() => startBoardObserver(state)).not.toThrow()
  })
})
