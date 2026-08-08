import { signal } from '@preact/signals'
import { act, render, screen } from '@testing-library/preact'
import userEvent from '@testing-library/user-event'
import { mockModule } from 'simone'
import { beforeEach, describe, expect, it } from 'vitest'
import { SpeechCommand } from '../../constants/commands'
import { SettingsProvider } from '../contexts/SettingsContext'
import { SpeechButtons } from './SpeechButtons'

const speechHandler = mockModule(import('../../application/handlers/handleSpeechCommand'))

describe('SpeechButtons', () => {
  let voiceNames: string[]
  let voicesChangedListener: (() => void) | undefined

  beforeEach(() => {
    voiceNames = []
    voicesChangedListener = undefined
    window.speechSynthesis = {
      getVoices: () => voiceNames.map((name) => ({ name }) as SpeechSynthesisVoice),
      addEventListener: (_type: string, listener: () => void) => {
        voicesChangedListener = listener
      },
    } as unknown as SpeechSynthesis
  })

  const mockSettings = {
    speakRate: signal(0.5),
    pauseLength: signal(0.6),
    voiceName: signal(''),
    piecesListEnabled: signal(false),
    dividersEnabled: signal(false),
    customBoardEnabled: signal(false),
    obfuscationsEnabled: signal(false),
    parallax: signal(0),
    hoverMode: signal('off'),
    pieceStyle: signal('icons'),
    blur: signal(0),
    blackSegments: signal('none'),
    blackSegmentsTiming: signal('rotate-10s'),
    flashModeEnabled: signal(false),
    flashDuration: signal(1000),
    flashInterval: signal(3),
    meditationEnabled: signal(false),
  }

  it('renders all three rows of buttons', () => {
    render(
      <SettingsProvider settings={mockSettings}>
        <SpeechButtons />
      </SettingsProvider>
    )

    // Row 1: Quadrant buttons
    expect(screen.getByText('🔊 WK side')).toBeInstanceOf(HTMLElement)
    expect(screen.getByText('🔊 WQ side')).toBeInstanceOf(HTMLElement)
    expect(screen.getByText('🔊 BK side')).toBeInstanceOf(HTMLElement)
    expect(screen.getByText('🔊 BQ side')).toBeInstanceOf(HTMLElement)

    // Row 2: All/Color buttons
    expect(screen.getByText('🔊 All pieces')).toBeInstanceOf(HTMLElement)
    expect(screen.getByText("🔊 W's pieces")).toBeInstanceOf(HTMLElement)
    expect(screen.getByText("🔊 B's pieces")).toBeInstanceOf(HTMLElement)

    // Row 3: Rate and Pause
    expect(screen.getByText('🔊 Rate')).toBeInstanceOf(HTMLElement)
    expect(screen.getByText('🔊 Pause')).toBeInstanceOf(HTMLElement)

    // Row 4: Stop
    expect(screen.getByText('🔊 Stop')).toBeInstanceOf(HTMLElement)
  })

  it('refreshes the voice dropdown options when the browser reports new voices', () => {
    render(
      <SettingsProvider settings={mockSettings}>
        <SpeechButtons />
      </SettingsProvider>
    )

    expect(screen.queryByText('Alice')).toBeNull()

    voiceNames = ['Alice']
    act(() => voicesChangedListener?.())

    expect(screen.getByText('Alice')).toBeInstanceOf(HTMLElement)
  })

  it('calls handleSpeechCommand with WK when white king side button is clicked', async () => {
    const user = userEvent.setup()
    speechHandler
      .expects('handleSpeechCommand')
      .withArgs(SpeechCommand.WK, mockSettings)
      .returns(undefined)

    render(
      <SettingsProvider settings={mockSettings}>
        <SpeechButtons />
      </SettingsProvider>
    )

    await user.click(screen.getByText('🔊 WK side'))
  })

  it('calls handleSpeechCommand with ALL when all pieces button is clicked', async () => {
    const user = userEvent.setup()
    speechHandler
      .expects('handleSpeechCommand')
      .withArgs(SpeechCommand.ALL, mockSettings)
      .returns(undefined)

    render(
      <SettingsProvider settings={mockSettings}>
        <SpeechButtons />
      </SettingsProvider>
    )

    await user.click(screen.getByText('🔊 All pieces'))
  })

  it('calls handleSpeechCommand with STOP when stop button is clicked', async () => {
    const user = userEvent.setup()
    speechHandler
      .expects('handleSpeechCommand')
      .withArgs(SpeechCommand.STOP, mockSettings)
      .returns(undefined)

    render(
      <SettingsProvider settings={mockSettings}>
        <SpeechButtons />
      </SettingsProvider>
    )

    await user.click(screen.getByText('🔊 Stop'))
  })

  it('calls handleSpeechCommand with WQ when white queen side button is clicked', async () => {
    const user = userEvent.setup()
    speechHandler
      .expects('handleSpeechCommand')
      .withArgs(SpeechCommand.WQ, mockSettings)
      .returns(undefined)

    render(
      <SettingsProvider settings={mockSettings}>
        <SpeechButtons />
      </SettingsProvider>
    )

    await user.click(screen.getByText('🔊 WQ side'))
  })

  it('calls handleSpeechCommand with BK when black king side button is clicked', async () => {
    const user = userEvent.setup()
    speechHandler
      .expects('handleSpeechCommand')
      .withArgs(SpeechCommand.BK, mockSettings)
      .returns(undefined)

    render(
      <SettingsProvider settings={mockSettings}>
        <SpeechButtons />
      </SettingsProvider>
    )

    await user.click(screen.getByText('🔊 BK side'))
  })

  it('calls handleSpeechCommand with BQ when black queen side button is clicked', async () => {
    const user = userEvent.setup()
    speechHandler
      .expects('handleSpeechCommand')
      .withArgs(SpeechCommand.BQ, mockSettings)
      .returns(undefined)

    render(
      <SettingsProvider settings={mockSettings}>
        <SpeechButtons />
      </SettingsProvider>
    )

    await user.click(screen.getByText('🔊 BQ side'))
  })

  it('calls handleSpeechCommand with WHITE when white pieces button is clicked', async () => {
    const user = userEvent.setup()
    speechHandler
      .expects('handleSpeechCommand')
      .withArgs(SpeechCommand.WHITE, mockSettings)
      .returns(undefined)

    render(
      <SettingsProvider settings={mockSettings}>
        <SpeechButtons />
      </SettingsProvider>
    )

    await user.click(screen.getByText("🔊 W's pieces"))
  })

  it('calls handleSpeechCommand with BLACK when black pieces button is clicked', async () => {
    const user = userEvent.setup()
    speechHandler
      .expects('handleSpeechCommand')
      .withArgs(SpeechCommand.BLACK, mockSettings)
      .returns(undefined)

    render(
      <SettingsProvider settings={mockSettings}>
        <SpeechButtons />
      </SettingsProvider>
    )

    await user.click(screen.getByText("🔊 B's pieces"))
  })
})
