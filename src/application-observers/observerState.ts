import type { Signal } from '@preact/signals-core'
import { DomSelector } from '../constants'
import { querySelector } from '../platform/dom'
import { createMutationObserver, disconnect, observe } from '../platform/mutationObserver'

export interface BoardObserverState {
  observer: MutationObserver
  boardChanged: Signal<number>
}

export function createBoardObserver(boardChanged: Signal<number>): BoardObserverState {
  const observer = createMutationObserver(() => {
    boardChanged.value += 1
  })

  return { observer, boardChanged }
}

export function startBoardObserver(state: BoardObserverState): void {
  const board = querySelector(DomSelector.BOARD)
  if (!board) return

  observe(state.observer, board, {
    childList: true,
    attributes: true,
    subtree: true,
  })
}

export function stopBoardObserver(state: BoardObserverState): void {
  disconnect(state.observer)
}
