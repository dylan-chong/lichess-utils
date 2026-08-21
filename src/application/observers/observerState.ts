import type { Signal } from '@preact/signals-core'
import { DomSelector } from '../../constants/dom'
import { querySelector } from '../../platform/dom'
import { createMutationObserver, disconnect, observe } from '../../platform/mutationObserver'

const POLL_INTERVAL_MS = 1000

export interface BoardObserverState {
  observer: MutationObserver
  boardChanged: Signal<number>
  pollId: ReturnType<typeof setInterval> | null
}

export function createBoardObserver(boardChanged: Signal<number>): BoardObserverState {
  const observer = createMutationObserver(() => {
    boardChanged.value += 1
  })

  return { observer, boardChanged, pollId: null }
}

export function startBoardObserver(state: BoardObserverState): void {
  const board = querySelector(DomSelector.BOARD)
  if (board) {
    observe(state.observer, board, {
      childList: true,
      attributes: true,
      subtree: true,
    })
  }

  // Backstop: the MutationObserver can miss updates (e.g. move-list
  // navigation, native blindfold toggling, or the board element being
  // replaced), so poll on a timer to guarantee eventual consistency.
  state.pollId = setInterval(() => {
    state.boardChanged.value += 1
  }, POLL_INTERVAL_MS)
}

export function stopBoardObserver(state: BoardObserverState): void {
  disconnect(state.observer)

  if (state.pollId !== null) {
    clearInterval(state.pollId)
    state.pollId = null
  }
}
