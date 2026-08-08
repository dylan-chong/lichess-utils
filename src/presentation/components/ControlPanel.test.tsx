import { signal } from '@preact/signals'
import { render, screen, within } from '@testing-library/preact'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createSettingsStore } from '../../application/settings/settingsStore'
import { defaultSettings } from '../../constants/settings'
import { SettingsProvider } from '../contexts/SettingsContext'
import { ControlPanel } from './ControlPanel'

describe('ControlPanel', () => {
  let settings: ReturnType<typeof createSettingsStore>

  beforeEach(() => {
    window.speechSynthesis = {
      getVoices: () => [],
      addEventListener: () => {},
    } as unknown as SpeechSynthesis

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
    expect(screen.getByText('🔊 Rate')).toBeInstanceOf(HTMLElement)

    // Main controls
    expect(screen.getByText('📋 Pieces List: false')).toBeInstanceOf(HTMLElement)
    expect(screen.getByText('➕ Dividers: false')).toBeInstanceOf(HTMLElement)
    expect(screen.getByText('🎨 Custom Board: false')).toBeInstanceOf(HTMLElement)
    expect(screen.getByText('🔦 Flash Mode: false')).toBeInstanceOf(HTMLElement)
    expect(screen.getByText('🧘 Meditation: false')).toBeInstanceOf(HTMLElement)
  })

  it('displays and updates speak rate dropdown from SpeechButtons', async () => {
    const user = userEvent.setup()
    const boardChanged = signal(0)

    render(
      <SettingsProvider settings={settings}>
        <ControlPanel boardChanged={boardChanged} onAnnotate={() => {}} />
      </SettingsProvider>
    )

    expect(screen.getByText('🔊 Rate')).toBeInstanceOf(HTMLElement)

    const rateSelect = within(
      screen.getByText('🔊 Rate').closest('label') as HTMLElement
    ).getByRole('combobox') as HTMLSelectElement
    await user.selectOptions(rateSelect, within(rateSelect).getByText('1.2'))

    expect(settings.speakRate.value).toBe(1.2)
  })

  it('should toggle pieces list when button clicked', async () => {
    const user = userEvent.setup()
    const boardChanged = signal(0)

    render(
      <SettingsProvider settings={settings}>
        <ControlPanel boardChanged={boardChanged} onAnnotate={() => {}} />
      </SettingsProvider>
    )

    const button = screen.getByText('📋 Pieces List: false')
    await user.click(button)

    expect(settings.piecesListEnabled.value).toBe(true)
    expect(screen.getByText('📋 Pieces List: true')).toBeInstanceOf(HTMLElement)
  })

  it('should toggle dividers when button clicked', async () => {
    const user = userEvent.setup()
    const boardChanged = signal(0)

    render(
      <SettingsProvider settings={settings}>
        <ControlPanel boardChanged={boardChanged} onAnnotate={() => {}} />
      </SettingsProvider>
    )

    const button = screen.getByText('➕ Dividers: false')
    await user.click(button)

    expect(settings.dividersEnabled.value).toBe(true)
    expect(screen.getByText('➕ Dividers: true')).toBeInstanceOf(HTMLElement)
  })

  it('should toggle custom board when button clicked', async () => {
    const user = userEvent.setup()
    const boardChanged = signal(0)

    render(
      <SettingsProvider settings={settings}>
        <ControlPanel boardChanged={boardChanged} onAnnotate={() => {}} />
      </SettingsProvider>
    )

    const button = screen.getByText('🎨 Custom Board: false')
    await user.click(button)

    expect(settings.customBoardEnabled.value).toBe(true)
    expect(screen.getByText('🎨 Custom Board: true')).toBeInstanceOf(HTMLElement)
  })

  it('should toggle flash mode when button clicked', async () => {
    const user = userEvent.setup()
    const boardChanged = signal(0)

    render(
      <SettingsProvider settings={settings}>
        <ControlPanel boardChanged={boardChanged} onAnnotate={() => {}} />
      </SettingsProvider>
    )

    const button = screen.getByText('🔦 Flash Mode: false')
    await user.click(button)

    expect(settings.flashModeEnabled.value).toBe(true)
    expect(screen.getByText('🔦 Flash Mode: true')).toBeInstanceOf(HTMLElement)
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

    await user.click(screen.getByText('✏️ Annotate Board'))

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

    it('displays and updates parallax dropdown', async () => {
      const user = userEvent.setup()
      const boardChanged = signal(0)

      render(
        <SettingsProvider settings={settings}>
          <ControlPanel boardChanged={boardChanged} onAnnotate={() => {}} />
        </SettingsProvider>
      )

      expect(screen.getByText('Parallax')).toBeInstanceOf(HTMLElement)

      const select = within(screen.getByText('Parallax').closest('label') as HTMLElement).getByRole(
        'combobox'
      ) as HTMLSelectElement
      await user.selectOptions(select, within(select).getByText('20'))

      expect(settings.parallax.value).toBe(20)
    })

    it('displays and updates hover mode dropdown', async () => {
      const user = userEvent.setup()
      const boardChanged = signal(0)

      render(
        <SettingsProvider settings={settings}>
          <ControlPanel boardChanged={boardChanged} onAnnotate={() => {}} />
        </SettingsProvider>
      )

      expect(screen.getByText('Hover Mode')).toBeInstanceOf(HTMLElement)

      const select = within(
        screen.getByText('Hover Mode').closest('label') as HTMLElement
      ).getByRole('combobox') as HTMLSelectElement
      await user.selectOptions(select, within(select).getByText('small'))

      expect(settings.hoverMode.value).toBe('small')
    })
  })

  describe('Obfuscations nested controls', () => {
    beforeEach(() => {
      settings.customBoardEnabled.value = true
      settings.obfuscationsEnabled.value = true
    })

    it('displays and updates piece style dropdown', async () => {
      const user = userEvent.setup()
      const boardChanged = signal(0)

      render(
        <SettingsProvider settings={settings}>
          <ControlPanel boardChanged={boardChanged} onAnnotate={() => {}} />
        </SettingsProvider>
      )

      expect(screen.getByText('Piece Style')).toBeInstanceOf(HTMLElement)

      const select = within(
        screen.getByText('Piece Style').closest('label') as HTMLElement
      ).getByRole('combobox') as HTMLSelectElement
      await user.selectOptions(select, within(select).getByText('3d'))

      expect(settings.pieceStyle.value).toBe('3d')
    })

    it('displays and updates blur dropdown', async () => {
      const user = userEvent.setup()
      const boardChanged = signal(0)

      render(
        <SettingsProvider settings={settings}>
          <ControlPanel boardChanged={boardChanged} onAnnotate={() => {}} />
        </SettingsProvider>
      )

      expect(screen.getByText('Blur')).toBeInstanceOf(HTMLElement)

      const select = within(screen.getByText('Blur').closest('label') as HTMLElement).getByRole(
        'combobox'
      ) as HTMLSelectElement
      await user.selectOptions(select, within(select).getByText('1'))

      expect(settings.blur.value).toBe(1)
    })

    it('displays and updates black segments dropdown', async () => {
      const user = userEvent.setup()
      const boardChanged = signal(0)

      render(
        <SettingsProvider settings={settings}>
          <ControlPanel boardChanged={boardChanged} onAnnotate={() => {}} />
        </SettingsProvider>
      )

      expect(screen.getByText('Black Segments')).toBeInstanceOf(HTMLElement)

      const select = within(
        screen.getByText('Black Segments').closest('label') as HTMLElement
      ).getByRole('combobox') as HTMLSelectElement
      await user.selectOptions(select, within(select).getByText('1/4'))

      expect(settings.blackSegments.value).toBe('1/4')
    })

    it('displays and updates timing dropdown when black segments is not none', async () => {
      const user = userEvent.setup()
      settings.blackSegments.value = '1/4'
      const boardChanged = signal(0)

      render(
        <SettingsProvider settings={settings}>
          <ControlPanel boardChanged={boardChanged} onAnnotate={() => {}} />
        </SettingsProvider>
      )

      expect(screen.getByText('Timing')).toBeInstanceOf(HTMLElement)

      const select = within(screen.getByText('Timing').closest('label') as HTMLElement).getByRole(
        'combobox'
      ) as HTMLSelectElement
      await user.selectOptions(select, within(select).getByText('rotate-30s'))

      expect(settings.blackSegmentsTiming.value).toBe('rotate-30s')
    })
  })

  describe('Flash Mode nested controls', () => {
    it('displays and updates flash duration dropdown', async () => {
      settings.flashModeEnabled.value = true
      const user = userEvent.setup()
      const boardChanged = signal(0)

      render(
        <SettingsProvider settings={settings}>
          <ControlPanel boardChanged={boardChanged} onAnnotate={() => {}} />
        </SettingsProvider>
      )

      expect(screen.getByText('Flash Duration')).toBeInstanceOf(HTMLElement)

      const select = within(
        screen.getByText('Flash Duration').closest('label') as HTMLElement
      ).getByRole('combobox') as HTMLSelectElement
      await user.selectOptions(select, within(select).getByText('100'))

      expect(settings.flashDuration.value).toBe(100)
    })

    it('displays and updates flash interval dropdown', async () => {
      settings.flashModeEnabled.value = true
      const user = userEvent.setup()
      const boardChanged = signal(0)

      render(
        <SettingsProvider settings={settings}>
          <ControlPanel boardChanged={boardChanged} onAnnotate={() => {}} />
        </SettingsProvider>
      )

      expect(screen.getByText('Flash Interval')).toBeInstanceOf(HTMLElement)

      const select = within(
        screen.getByText('Flash Interval').closest('label') as HTMLElement
      ).getByRole('combobox') as HTMLSelectElement
      await user.selectOptions(select, within(select).getByText('5'))

      expect(settings.flashInterval.value).toBe(5)
    })
  })
})
