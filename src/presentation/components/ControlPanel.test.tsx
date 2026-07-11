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
    expect(screen.getByText('🔊 rate: 0.5')).toBeInstanceOf(HTMLElement)

    // Main controls
    expect(screen.getByText('Pieces List: false')).toBeInstanceOf(HTMLElement)
    expect(screen.getByText('Dividers: false')).toBeInstanceOf(HTMLElement)
    expect(screen.getByText('Custom Board: false')).toBeInstanceOf(HTMLElement)
    expect(screen.getByText('Flash Mode: false')).toBeInstanceOf(HTMLElement)
  })

  it('displays and updates speak rate button from SpeechButtons', async () => {
    const user = userEvent.setup()
    const boardChanged = signal(0)

    render(
      <SettingsProvider settings={settings}>
        <ControlPanel boardChanged={boardChanged} onAnnotate={() => {}} />
      </SettingsProvider>
    )

    expect(screen.getByText('🔊 rate: 0.5')).toBeInstanceOf(HTMLElement)

    await user.click(screen.getByText('🔊 rate: 0.5'))

    expect(settings.speakRate.value).toBe(0.7)
    expect(screen.getByText('🔊 rate: 0.7')).toBeInstanceOf(HTMLElement)
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
    expect(screen.getByText('Pieces List: true')).toBeInstanceOf(HTMLElement)
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
    expect(screen.getByText('Dividers: true')).toBeInstanceOf(HTMLElement)
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
    expect(screen.getByText('Custom Board: true')).toBeInstanceOf(HTMLElement)
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
    expect(screen.getByText('Flash Mode: true')).toBeInstanceOf(HTMLElement)
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

      expect(screen.getByText('Obfuscations: false')).toBeInstanceOf(HTMLElement)

      await user.click(screen.getByText('Obfuscations: false'))

      expect(settings.obfuscationsEnabled.value).toBe(true)
      expect(screen.getByText('Obfuscations: true')).toBeInstanceOf(HTMLElement)
    })

    it('displays and updates parallax button', async () => {
      const user = userEvent.setup()
      const boardChanged = signal(0)

      render(
        <SettingsProvider settings={settings}>
          <ControlPanel boardChanged={boardChanged} onAnnotate={() => {}} />
        </SettingsProvider>
      )

      expect(screen.getByText('Parallax: 0')).toBeInstanceOf(HTMLElement)

      await user.click(screen.getByText('Parallax: 0'))

      expect(settings.parallax.value).toBe(20)
      expect(screen.getByText('Parallax: 20')).toBeInstanceOf(HTMLElement)
    })

    it('displays and updates hover mode button', async () => {
      const user = userEvent.setup()
      const boardChanged = signal(0)

      render(
        <SettingsProvider settings={settings}>
          <ControlPanel boardChanged={boardChanged} onAnnotate={() => {}} />
        </SettingsProvider>
      )

      expect(screen.getByText('Hover Mode: off')).toBeInstanceOf(HTMLElement)

      await user.click(screen.getByText('Hover Mode: off'))

      expect(settings.hoverMode.value).toBe('small')
      expect(screen.getByText('Hover Mode: small')).toBeInstanceOf(HTMLElement)
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

      expect(screen.getByText('Piece Style: icons')).toBeInstanceOf(HTMLElement)

      await user.click(screen.getByText('Piece Style: icons'))

      expect(settings.pieceStyle.value).toBe('3d')
      expect(screen.getByText('Piece Style: 3d')).toBeInstanceOf(HTMLElement)
    })

    it('displays and updates blur button', async () => {
      const user = userEvent.setup()
      const boardChanged = signal(0)

      render(
        <SettingsProvider settings={settings}>
          <ControlPanel boardChanged={boardChanged} onAnnotate={() => {}} />
        </SettingsProvider>
      )

      expect(screen.getByText('Blur: 0')).toBeInstanceOf(HTMLElement)

      await user.click(screen.getByText('Blur: 0'))

      expect(settings.blur.value).toBe(1)
      expect(screen.getByText('Blur: 1')).toBeInstanceOf(HTMLElement)
    })

    it('displays and updates black segments button', async () => {
      const user = userEvent.setup()
      const boardChanged = signal(0)

      render(
        <SettingsProvider settings={settings}>
          <ControlPanel boardChanged={boardChanged} onAnnotate={() => {}} />
        </SettingsProvider>
      )

      expect(screen.getByText('Black Segments: none')).toBeInstanceOf(HTMLElement)

      await user.click(screen.getByText('Black Segments: none'))

      expect(settings.blackSegments.value).toBe('1/4')
      expect(screen.getByText('Black Segments: 1/4')).toBeInstanceOf(HTMLElement)
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

      expect(screen.getByText('Timing: rotate-10s')).toBeInstanceOf(HTMLElement)

      await user.click(screen.getByText('Timing: rotate-10s'))

      expect(settings.blackSegmentsTiming.value).toBe('rotate-30s')
      expect(screen.getByText('Timing: rotate-30s')).toBeInstanceOf(HTMLElement)
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

      expect(screen.getByText('Flash Duration: 1')).toBeInstanceOf(HTMLElement)

      await user.click(screen.getByText('Flash Duration: 1'))

      expect(settings.flashDuration.value).toBe(100)
      expect(screen.getByText('Flash Duration: 100')).toBeInstanceOf(HTMLElement)
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

      expect(screen.getByText('Flash Interval: 3')).toBeInstanceOf(HTMLElement)

      await user.click(screen.getByText('Flash Interval: 3'))

      expect(settings.flashInterval.value).toBe(5)
      expect(screen.getByText('Flash Interval: 5')).toBeInstanceOf(HTMLElement)
    })
  })
})
