import { signal } from '@preact/signals'
import { render, screen } from '@testing-library/preact'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
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

  it('should render all main control buttons', async () => {
    const boardChanged = signal(0)
    render(
      <SettingsProvider settings={settings}>
        <ControlPanel boardChanged={boardChanged} onAnnotate={() => {}} />
      </SettingsProvider>
    )

    // Speech buttons
    expect(screen.getByText('🔊 rate: 0.5')).toBeTruthy()

    // Main controls
    expect(screen.getByText('Pieces List: false')).toBeTruthy()
    expect(screen.getByText('Dividers: false')).toBeTruthy()
    expect(screen.getByText('Custom Board: false')).toBeTruthy()
    expect(screen.getByText('Flash Mode: false')).toBeTruthy()
  })

  it('displays and updates speak rate button from SpeechButtons', async () => {
    const user = userEvent.setup()
    const boardChanged = signal(0)

    render(
      <SettingsProvider settings={settings}>
        <ControlPanel boardChanged={boardChanged} onAnnotate={() => {}} />
      </SettingsProvider>
    )

    expect(screen.getByText('🔊 rate: 0.5')).toBeTruthy()

    await user.click(screen.getByText('🔊 rate: 0.5'))

    expect(settings.speakRate.value).toBe(0.7)
    expect(screen.getByText('🔊 rate: 0.7')).toBeTruthy()
  })

  it('should toggle pieces list when button clicked', async () => {
    const user = userEvent.setup()
    const boardChanged = signal(0)

    render(
      <SettingsProvider settings={settings}>
        <ControlPanel boardChanged={boardChanged} onAnnotate={() => {}} />
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
        <ControlPanel boardChanged={boardChanged} onAnnotate={() => {}} />
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
        <ControlPanel boardChanged={boardChanged} onAnnotate={() => {}} />
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
        <ControlPanel boardChanged={boardChanged} onAnnotate={() => {}} />
      </SettingsProvider>
    )

    const button = screen.getByText('Flash Mode: false')
    await user.click(button)

    expect(settings.flashModeEnabled.value).toBe(true)
    expect(screen.getByText('Flash Mode: true')).toBeTruthy()
  })

  it('clicking Annotate Board button calls onAnnotate', async () => {
    const user = userEvent.setup()
    const boardChanged = signal(0)
    const onAnnotate = vi.fn()

    render(
      <SettingsProvider settings={settings}>
        <ControlPanel boardChanged={boardChanged} onAnnotate={onAnnotate} />
      </SettingsProvider>
    )

    await user.click(screen.getByText('Annotate Board'))

    expect(onAnnotate).toHaveBeenCalledOnce()
  })

  describe('Custom Board nested controls', () => {
    beforeEach(() => {
      settings.customBoardEnabled.value = true
    })

    it('displays and updates obfuscations button', async () => {
      const user = userEvent.setup()
      const boardChanged = signal(0)

      render(
        <SettingsProvider settings={settings}>
          <ControlPanel boardChanged={boardChanged} onAnnotate={() => {}} />
        </SettingsProvider>
      )

      expect(screen.getByText('Obfuscations: false')).toBeTruthy()

      await user.click(screen.getByText('Obfuscations: false'))

      expect(settings.obfuscationsEnabled.value).toBe(true)
      expect(screen.getByText('Obfuscations: true')).toBeTruthy()
    })

    it('displays and updates parallax button', async () => {
      const user = userEvent.setup()
      const boardChanged = signal(0)

      render(
        <SettingsProvider settings={settings}>
          <ControlPanel boardChanged={boardChanged} onAnnotate={() => {}} />
        </SettingsProvider>
      )

      expect(screen.getByText('Parallax: 0')).toBeTruthy()

      await user.click(screen.getByText('Parallax: 0'))

      expect(settings.parallax.value).toBe(20)
      expect(screen.getByText('Parallax: 20')).toBeTruthy()
    })

    it('displays and updates hover mode button', async () => {
      const user = userEvent.setup()
      const boardChanged = signal(0)

      render(
        <SettingsProvider settings={settings}>
          <ControlPanel boardChanged={boardChanged} onAnnotate={() => {}} />
        </SettingsProvider>
      )

      expect(screen.getByText('Hover Mode: off')).toBeTruthy()

      await user.click(screen.getByText('Hover Mode: off'))

      expect(settings.hoverMode.value).toBe('small')
      expect(screen.getByText('Hover Mode: small')).toBeTruthy()
    })
  })

  describe('Obfuscations nested controls', () => {
    beforeEach(() => {
      settings.customBoardEnabled.value = true
      settings.obfuscationsEnabled.value = true
    })

    it('displays and updates piece style button', async () => {
      const user = userEvent.setup()
      const boardChanged = signal(0)

      render(
        <SettingsProvider settings={settings}>
          <ControlPanel boardChanged={boardChanged} onAnnotate={() => {}} />
        </SettingsProvider>
      )

      expect(screen.getByText('Piece Style: icons')).toBeTruthy()

      await user.click(screen.getByText('Piece Style: icons'))

      expect(settings.pieceStyle.value).toBe('3d')
      expect(screen.getByText('Piece Style: 3d')).toBeTruthy()
    })

    it('displays and updates blur button', async () => {
      const user = userEvent.setup()
      const boardChanged = signal(0)

      render(
        <SettingsProvider settings={settings}>
          <ControlPanel boardChanged={boardChanged} onAnnotate={() => {}} />
        </SettingsProvider>
      )

      expect(screen.getByText('Blur: 0')).toBeTruthy()

      await user.click(screen.getByText('Blur: 0'))

      expect(settings.blur.value).toBe(1)
      expect(screen.getByText('Blur: 1')).toBeTruthy()
    })

    it('displays and updates black segments button', async () => {
      const user = userEvent.setup()
      const boardChanged = signal(0)

      render(
        <SettingsProvider settings={settings}>
          <ControlPanel boardChanged={boardChanged} onAnnotate={() => {}} />
        </SettingsProvider>
      )

      expect(screen.getByText('Black Segments: none')).toBeTruthy()

      await user.click(screen.getByText('Black Segments: none'))

      expect(settings.blackSegments.value).toBe('1/4')
      expect(screen.getByText('Black Segments: 1/4')).toBeTruthy()
    })

    it('displays and updates timing button when black segments is not none', async () => {
      const user = userEvent.setup()
      settings.blackSegments.value = '1/4'
      const boardChanged = signal(0)

      render(
        <SettingsProvider settings={settings}>
          <ControlPanel boardChanged={boardChanged} onAnnotate={() => {}} />
        </SettingsProvider>
      )

      expect(screen.getByText('Timing: rotate-10s')).toBeTruthy()

      await user.click(screen.getByText('Timing: rotate-10s'))

      expect(settings.blackSegmentsTiming.value).toBe('rotate-30s')
      expect(screen.getByText('Timing: rotate-30s')).toBeTruthy()
    })
  })

  describe('Flash Mode nested controls', () => {
    it('displays and updates flash duration button', async () => {
      settings.flashModeEnabled.value = true
      const user = userEvent.setup()
      const boardChanged = signal(0)

      render(
        <SettingsProvider settings={settings}>
          <ControlPanel boardChanged={boardChanged} onAnnotate={() => {}} />
        </SettingsProvider>
      )

      expect(screen.getByText('Flash Duration: 1')).toBeTruthy()

      await user.click(screen.getByText('Flash Duration: 1'))

      expect(settings.flashDuration.value).toBe(100)
      expect(screen.getByText('Flash Duration: 100')).toBeTruthy()
    })

    it('displays and updates flash interval button', async () => {
      settings.flashModeEnabled.value = true
      const user = userEvent.setup()
      const boardChanged = signal(0)

      render(
        <SettingsProvider settings={settings}>
          <ControlPanel boardChanged={boardChanged} onAnnotate={() => {}} />
        </SettingsProvider>
      )

      expect(screen.getByText('Flash Interval: 3')).toBeTruthy()

      await user.click(screen.getByText('Flash Interval: 3'))

      expect(settings.flashInterval.value).toBe(5)
      expect(screen.getByText('Flash Interval: 5')).toBeTruthy()
    })
  })
})
