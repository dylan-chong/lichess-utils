import { describe, it, expect, beforeEach } from 'vitest'
import { createBoardObserver, startBoardObserver, stopBoardObserver } from './boardObserver'
import { signal } from '@preact/signals-core'

describe('boardObserver', () => {
  beforeEach(() => {
    document.body.innerHTML = '<cg-board></cg-board>'
  })

  it('increments boardChanged signal when board mutates', async () => {
    const boardChanged = signal(0)
    const state = createBoardObserver(boardChanged)
    startBoardObserver(state)

    const board = document.querySelector('cg-board')!
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

    const board = document.querySelector('cg-board')!
    const piece = document.createElement('piece')
    piece.className = 'white pawn'
    board.appendChild(piece)

    await new Promise((resolve) => setTimeout(resolve, 10))

    expect(boardChanged.value).toBe(0)
  })
})
