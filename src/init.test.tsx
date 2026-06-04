import { signal } from '@preact/signals-core'
import { mockModule } from 'simone'
import { describe, expect, it } from 'vitest'
import type { SettingsStore } from './application/settings/settingsStore'
import { init } from './init'

// Mock all dependencies
const settingsStore = mockModule(import('./application/settings/settingsStore'))
const dom = mockModule(import('./platform/dom'))
const boardObserver = mockModule(import('./application/observers/observerState'))
const flashOverlay = mockModule(import('./presentation/non-preact-components/flash'))
const dividersOverlay = mockModule(import('./presentation/non-preact-components/dividers'))
const onDividers = mockModule(import('./application/effects/onDividers'))
const keyboardInput = mockModule(import('./application/input/keyboardInput'))
const root = mockModule(import('./presentation/components/root'))

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
    const mockSettings = {} as unknown as SettingsStore

    dom
      .expects('waitForElement')
      .withArgs('.keyboard-move')
      .returns(Promise.resolve(mockKeyboardMove))
    settingsStore.expects('createSettingsStore').withArgs().returns(mockSettings)
    settingsStore.expects('loadSettings').withArgs(mockSettings).returns(undefined)
    settingsStore.expects('setupAutoSave').withArgs(mockSettings).returns(undefined)
    flashOverlay.expects('createFlashOverlay').withArgs().returns(mockFlashState)
    dividersOverlay.expects('createDividers').withArgs().returns(mockDividersState)
    boardObserver
      .expects('createBoardObserver')
      .withArgs(mockBoardChanged)
      .returns(mockBoardObserverState)
    boardObserver.expects('startBoardObserver').withArgs(mockBoardObserverState).returns(undefined)
    onDividers
      .expects('setupDividersEffect')
      .withArgs(mockDividersState, mockSettings)
      .returns(mockCleanupDividers)
    keyboardInput.expects('setupKeyboardCommands').withArgs(mockSettings).returns(undefined)
    dom.expects('createDiv').withArgs().returns(mockMountPoint)
    dom.expects('querySelector').withArgs('.keyboard-move').returns(mockKeyboardMove)
    dom.expects('appendChild').withArgs(mockKeyboardMove, mockMountPoint).returns(undefined)
    root
      .expects('createRoot')
      .withArgs(mockBoardChanged, mockMountPoint, mockSettings)
      .returns(undefined)

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
    const mockSettings = {} as unknown as SettingsStore

    dom
      .expects('waitForElement')
      .withArgs('.keyboard-move')
      .returns(Promise.resolve(mockKeyboardMove))
    settingsStore.expects('createSettingsStore').withArgs().returns(mockSettings)
    settingsStore.expects('loadSettings').withArgs(mockSettings).returns(undefined)
    settingsStore.expects('setupAutoSave').withArgs(mockSettings).returns(undefined)
    flashOverlay.expects('createFlashOverlay').withArgs().returns(mockFlashState)
    dividersOverlay.expects('createDividers').withArgs().returns(mockDividersState)
    boardObserver
      .expects('createBoardObserver')
      .withArgs(mockBoardChanged)
      .returns(mockBoardObserverState)
    boardObserver.expects('startBoardObserver').withArgs(mockBoardObserverState).returns(undefined)
    onDividers
      .expects('setupDividersEffect')
      .withArgs(mockDividersState, mockSettings)
      .returns(mockCleanupDividers)
    keyboardInput.expects('setupKeyboardCommands').withArgs(mockSettings).returns(undefined)
    dom.expects('createDiv').withArgs().returns(mockMountPoint)
    dom.expects('querySelector').withArgs('.keyboard-move').returns(mockKeyboardMove)
    dom.expects('appendChild').withArgs(mockKeyboardMove, mockMountPoint).returns(undefined)
    root
      .expects('createRoot')
      .withArgs(mockBoardChanged, mockMountPoint, mockSettings)
      .returns(undefined)

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
    const mockSettings = {} as unknown as SettingsStore

    dom
      .expects('waitForElement')
      .withArgs('.keyboard-move')
      .returns(Promise.resolve(document.createElement('div')))
    settingsStore.expects('createSettingsStore').withArgs().returns(mockSettings)
    settingsStore.expects('loadSettings').withArgs(mockSettings).returns(undefined)
    settingsStore.expects('setupAutoSave').withArgs(mockSettings).returns(undefined)
    flashOverlay.expects('createFlashOverlay').withArgs().returns(mockFlashState)
    dividersOverlay.expects('createDividers').withArgs().returns(mockDividersState)
    boardObserver
      .expects('createBoardObserver')
      .withArgs(mockBoardChanged)
      .returns(mockBoardObserverState)
    boardObserver.expects('startBoardObserver').withArgs(mockBoardObserverState).returns(undefined)
    onDividers
      .expects('setupDividersEffect')
      .withArgs(mockDividersState, mockSettings)
      .returns(mockCleanupDividers)
    keyboardInput.expects('setupKeyboardCommands').withArgs(mockSettings).returns(undefined)
    dom.expects('createDiv').withArgs().returns(mockMountPoint)
    dom.expects('querySelector').withArgs('.keyboard-move').returns(null) // Simulate missing element
    // appendChild should NOT be called when keyboardMove is null
    root
      .expects('createRoot')
      .withArgs(mockBoardChanged, mockMountPoint, mockSettings)
      .returns(undefined)

    const cleanup = await init()

    // Should not throw, cleanup should still work
    expect(typeof cleanup).toBe('function')
  })
})
