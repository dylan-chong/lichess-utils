import { signal } from '@preact/signals'
import { render, screen } from '@testing-library/preact'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { createSettingsStore } from '../../application/settings/settingsStore'
import { defaultSettings } from '../../constants/settings'
import { SettingsProvider } from '../contexts/SettingsContext'
import { ControlPanel } from './ControlPanel'

describe('ControlPanel', () => {
  let settings: ReturnType<typeof createSettingsStore>

  beforeEach(() => {
    // Create fresh settings instance for each test
    settings = createSettingsStore()
    settings.speakRate.value = defaultSettings.speakRate
    settings.piecesListEnabled.value = defaultSettings.piecesListEnabled
    settings.dividersEnabled.value = defaultSettings.dividersEnabled
    settings.customBoardEnabled.value = defaultSettings.customBoardEnabled
    settings.flashModeEnabled.value = defaultSettings.flashModeEnabled
  })

  it('should render all main control buttons', () => {
    const boardChanged = signal(0)
    render(
      <SettingsProvider settings={settings}>
        <ControlPanel boardChanged={boardChanged} />
      </SettingsProvider>
    )

    expect(screen.getByText('Speak Rate: 0.5')).toBeTruthy()
    expect(screen.getByText('Pieces List: false')).toBeTruthy()
    expect(screen.getByText('Dividers: false')).toBeTruthy()
    expect(screen.getByText('Custom Board: false')).toBeTruthy()
    expect(screen.getByText('Flash Mode: false')).toBeTruthy()
  })

  it('should update speak rate when button clicked', async () => {
    const user = userEvent.setup()
    const boardChanged = signal(0)

    render(
      <SettingsProvider settings={settings}>
        <ControlPanel boardChanged={boardChanged} />
      </SettingsProvider>
    )

    const button = screen.getByText('Speak Rate: 0.5')
    await user.click(button)

    expect(settings.speakRate.value).toBe(0.7)
    expect(screen.getByText('Speak Rate: 0.7')).toBeTruthy()
  })

  it('should toggle pieces list when button clicked', async () => {
    const user = userEvent.setup()
    const boardChanged = signal(0)

    render(
      <SettingsProvider settings={settings}>
        <ControlPanel boardChanged={boardChanged} />
      </SettingsProvider>
    )

    const button = screen.getByText('Pieces List: false')
    await user.click(button)

    expect(settings.piecesListEnabled.value).toBe(true)
    expect(screen.getByText('Pieces List: true')).toBeTruthy()
  })

  it('should toggle dividers when button clicked', async () => {
    const user = userEvent.setup()
    const boardChanged = signal(0)

    render(
      <SettingsProvider settings={settings}>
        <ControlPanel boardChanged={boardChanged} />
      </SettingsProvider>
    )

    const button = screen.getByText('Dividers: false')
    await user.click(button)

    expect(settings.dividersEnabled.value).toBe(true)
    expect(screen.getByText('Dividers: true')).toBeTruthy()
  })

  it('should toggle custom board when button clicked', async () => {
    const user = userEvent.setup()
    const boardChanged = signal(0)

    render(
      <SettingsProvider settings={settings}>
        <ControlPanel boardChanged={boardChanged} />
      </SettingsProvider>
    )

    const button = screen.getByText('Custom Board: false')
    await user.click(button)

    expect(settings.customBoardEnabled.value).toBe(true)
    expect(screen.getByText('Custom Board: true')).toBeTruthy()
  })

  it('should toggle flash mode when button clicked', async () => {
    const user = userEvent.setup()
    const boardChanged = signal(0)

    render(
      <SettingsProvider settings={settings}>
        <ControlPanel boardChanged={boardChanged} />
      </SettingsProvider>
    )

    const button = screen.getByText('Flash Mode: false')
    await user.click(button)

    expect(settings.flashModeEnabled.value).toBe(true)
    expect(screen.getByText('Flash Mode: true')).toBeTruthy()
  })
})
