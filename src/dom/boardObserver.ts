import type { Signal } from '@preact/signals-core'
import { DomSelector } from '../constants'
import { querySelector } from './dom'

export interface BoardObserverState {
  observer: MutationObserver
  boardChanged: Signal<number>
}

export function createBoardObserver(boardChanged: Signal<number>): BoardObserverState {
  const observer = new MutationObserver(() => {
    boardChanged.value += 1
  })

  return { observer, boardChanged }
}

export function startBoardObserver(state: BoardObserverState): void {
  const board = querySelector(DomSelector.BOARD)
  if (!board) return

  state.observer.observe(board, {
    childList: true,
    attributes: true,
    subtree: true,
  })
}

export function stopBoardObserver(state: BoardObserverState): void {
  state.observer.disconnect()
}
