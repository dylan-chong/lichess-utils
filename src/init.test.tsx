import { signal } from '@preact/signals-core'
import { mockModule } from 'simone'
import { describe, expect, it } from 'vitest'

// Mock all dependencies
const settingsStore = mockModule(import('./settings/settingsStore'))
const boardReader = mockModule(import('./dom/boardReader'))
const boardObserver = mockModule(import('./application-observers/observerState'))
const flashOverlay = mockModule(import('./adapters-overlays/flash'))
const dividersOverlay = mockModule(import('./adapters-overlays/dividers'))
const onDividers = mockModule(import('./application-effects/onDividers'))
const keyboardInput = mockModule(import('./commands/keyboardInput'))
const root = mockModule(import('./components/root'))
const dom = mockModule(import('./platform/dom'))

const { init } = await import('./init')

describe('init', () => {
  it('initializes all components, observers, and effects in correct order', async () => {
    // Setup mocks
    const mockKeyboardMove = document.createElement('div')
    const mockMountPoint = document.createElement('div')
    const mockBoardChanged = signal(0)
    const mockFlashState = { overlay: document.createElement('div') }
    const mockDividersState = { svg: document.createElementNS('http://www.w3.org/2000/svg', 'svg') }
    const mockBoardObserverState = {
      observer: new MutationObserver(() => {}),
      boardChanged: mockBoardChanged,
    }
    const mockCleanupDividers = () => {}

    boardReader
      .expects('waitForElement')
      .withArgs('.keyboard-move')
      .returns(Promise.resolve(mockKeyboardMove))
    settingsStore.expects('loadSettings').withArgs().returns(undefined)
    settingsStore.expects('setupAutoSave').withArgs().returns(undefined)
    flashOverlay.expects('createFlashOverlay').withArgs().returns(mockFlashState)
    dividersOverlay.expects('createDividers').withArgs().returns(mockDividersState)
    boardObserver
      .expects('createBoardObserver')
      .withArgs(mockBoardChanged)
      .returns(mockBoardObserverState)
    boardObserver.expects('startBoardObserver').withArgs(mockBoardObserverState).returns(undefined)
    onDividers
      .expects('setupDividersEffect')
      .withArgs(mockDividersState)
      .returns(mockCleanupDividers)
    keyboardInput.expects('setupKeyboardCommands').withArgs().returns(undefined)
    dom.expects('createDiv').withArgs().returns(mockMountPoint)
    dom.expects('querySelector').withArgs('.keyboard-move').returns(mockKeyboardMove)
    dom.expects('appendChild').withArgs(mockKeyboardMove, mockMountPoint).returns(undefined)
    root.expects('createRoot').withArgs(mockBoardChanged, mockMountPoint).returns(undefined)

    const cleanup = await init()

    expect(typeof cleanup).toBe('function')
  })

  it('returns cleanup function that tears down all resources', async () => {
    // Setup mocks
    const mockKeyboardMove = document.createElement('div')
    const mockMountPoint = document.createElement('div')
    const mockBoardChanged = signal(0)
    const mockFlashState = { overlay: document.createElement('div') }
    const mockDividersState = { svg: document.createElementNS('http://www.w3.org/2000/svg', 'svg') }
    const mockBoardObserverState = {
      observer: new MutationObserver(() => {}),
      boardChanged: mockBoardChanged,
    }
    const mockCleanupDividers = () => {}

    boardReader
      .expects('waitForElement')
      .withArgs('.keyboard-move')
      .returns(Promise.resolve(mockKeyboardMove))
    settingsStore.expects('loadSettings').withArgs().returns(undefined)
    settingsStore.expects('setupAutoSave').withArgs().returns(undefined)
    flashOverlay.expects('createFlashOverlay').withArgs().returns(mockFlashState)
    dividersOverlay.expects('createDividers').withArgs().returns(mockDividersState)
    boardObserver
      .expects('createBoardObserver')
      .withArgs(mockBoardChanged)
      .returns(mockBoardObserverState)
    boardObserver.expects('startBoardObserver').withArgs(mockBoardObserverState).returns(undefined)
    onDividers
      .expects('setupDividersEffect')
      .withArgs(mockDividersState)
      .returns(mockCleanupDividers)
    keyboardInput.expects('setupKeyboardCommands').withArgs().returns(undefined)
    dom.expects('createDiv').withArgs().returns(mockMountPoint)
    dom.expects('querySelector').withArgs('.keyboard-move').returns(mockKeyboardMove)
    dom.expects('appendChild').withArgs(mockKeyboardMove, mockMountPoint).returns(undefined)
    root.expects('createRoot').withArgs(mockBoardChanged, mockMountPoint).returns(undefined)

    const cleanup = await init()

    // Set up cleanup expectations
    boardObserver.expects('stopBoardObserver').withArgs(mockBoardObserverState).returns(undefined)
    flashOverlay.expects('destroyFlashOverlay').withArgs(mockFlashState).returns(undefined)
    dividersOverlay.expects('destroyDividers').withArgs(mockDividersState).returns(undefined)
    keyboardInput.expects('teardownKeyboardCommands').withArgs().returns(undefined)
    root.expects('destroyRoot').withArgs(mockMountPoint).returns(undefined)

    cleanup()
  })

  it('initializes without errors when keyboard move element is missing', async () => {
    // Setup mocks
    const mockMountPoint = document.createElement('div')
    const mockBoardChanged = signal(0)
    const mockFlashState = { overlay: document.createElement('div') }
    const mockDividersState = { svg: document.createElementNS('http://www.w3.org/2000/svg', 'svg') }
    const mockBoardObserverState = {
      observer: new MutationObserver(() => {}),
      boardChanged: mockBoardChanged,
    }
    const mockCleanupDividers = () => {}

    boardReader
      .expects('waitForElement')
      .withArgs('.keyboard-move')
      .returns(Promise.resolve(document.createElement('div')))
    settingsStore.expects('loadSettings').withArgs().returns(undefined)
    settingsStore.expects('setupAutoSave').withArgs().returns(undefined)
    flashOverlay.expects('createFlashOverlay').withArgs().returns(mockFlashState)
    dividersOverlay.expects('createDividers').withArgs().returns(mockDividersState)
    boardObserver
      .expects('createBoardObserver')
      .withArgs(mockBoardChanged)
      .returns(mockBoardObserverState)
    boardObserver.expects('startBoardObserver').withArgs(mockBoardObserverState).returns(undefined)
    onDividers
      .expects('setupDividersEffect')
      .withArgs(mockDividersState)
      .returns(mockCleanupDividers)
    keyboardInput.expects('setupKeyboardCommands').withArgs().returns(undefined)
    dom.expects('createDiv').withArgs().returns(mockMountPoint)
    dom.expects('querySelector').withArgs('.keyboard-move').returns(null) // Simulate missing element
    // appendChild should NOT be called when keyboardMove is null
    root.expects('createRoot').withArgs(mockBoardChanged, mockMountPoint).returns(undefined)

    const cleanup = await init()

    // Should not throw, cleanup should still work
    expect(typeof cleanup).toBe('function')
  })
})
