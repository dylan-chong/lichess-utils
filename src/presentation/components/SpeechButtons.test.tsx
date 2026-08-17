import { signal } from '@preact/signals'
import { act, render, screen } from '@testing-library/preact'
import userEvent from '@testing-library/user-event'
import { mockModule } from 'simone'
import { beforeEach, describe, expect, it } from 'vitest'
import { PlayerColor } from '../../constants/chess'
import { SpeechCommand } from '../../constants/commands'
import { SpeakOrder } from '../../constants/options'
import { SettingsProvider } from '../contexts/SettingsContext'
import { SpeechButtons } from './SpeechButtons'

const speechHandler = mockModule(import('../../application/handlers/handleSpeechCommand'))
const boardReader = mockModule(import('../../application/services/boardReader/reader'))

describe('SpeechButtons', () => {
  let voiceNames: string[]
  let voicesChangedListener: (() => void) | undefined
  let spokenUtterances: SpeechSynthesisUtterance[]

  beforeEach(() => {
    voiceNames = []
    voicesChangedListener = undefined
    spokenUtterances = []
    global.SpeechSynthesisUtterance = class {
      text: string
      voice: SpeechSynthesisVoice | null = null
      constructor(text: string) {
        this.text = text
      }
    } as unknown as typeof SpeechSynthesisUtterance
    window.speechSynthesis = {
      getVoices: () => voiceNames.map((name) => ({ name }) as SpeechSynthesisVoice),
      addEventListener: (_type: string, listener: () => void) => {
        voicesChangedListener = listener
      },
      speak: (utterance: SpeechSynthesisUtterance) => {
        spokenUtterances.push(utterance)
      },
    } as unknown as SpeechSynthesis
  })

  const mockSettings = {
    speakRate: signal(0.5),
    pauseLength: signal(0.6),
    voiceName: signal(''),
    speakOrder: signal(SpeakOrder.TypeRankFile as string),
    piecesListEnabled: signal(false),
    keyboardShortcutsEnabled: signal(false),
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

  it('renders all rows of buttons', () => {
    render(
      <SettingsProvider settings={mockSettings}>
        <SpeechButtons />
      </SettingsProvider>
    )

    // Row 1-2: Quadrant arrow buttons
    expect(screen.getByText('🔊 ↖️')).toBeInstanceOf(HTMLElement)
    expect(screen.getByText('🔊 ↗️')).toBeInstanceOf(HTMLElement)
    expect(screen.getByText('🔊 ↙️')).toBeInstanceOf(HTMLElement)
    expect(screen.getByText('🔊 ↘️')).toBeInstanceOf(HTMLElement)

    // Row 3: White/Black
    expect(screen.getByText('🔊 White')).toBeInstanceOf(HTMLElement)
    expect(screen.getByText('🔊 Black')).toBeInstanceOf(HTMLElement)

    // Row 4: Stop/All
    expect(screen.getByText('🔊 Stop')).toBeInstanceOf(HTMLElement)
    expect(screen.getByText('🔊 All')).toBeInstanceOf(HTMLElement)

    // Speak settings: Rate, Pause, and Order
    expect(screen.getByText('🔊 Rate')).toBeInstanceOf(HTMLElement)
    expect(screen.getByText('🔊 Pause')).toBeInstanceOf(HTMLElement)
    expect(screen.getByText(`🔊 Order: ${SpeakOrder.TypeRankFile}`)).toBeInstanceOf(HTMLElement)
  })

  it('cycles the speak order setting when the Order button is clicked', async () => {
    const user = userEvent.setup()

    render(
      <SettingsProvider settings={mockSettings}>
        <SpeechButtons />
      </SettingsProvider>
    )

    await user.click(screen.getByText(`🔊 Order: ${SpeakOrder.TypeRankFile}`))

    expect(screen.getByText(`🔊 Order: ${SpeakOrder.RankFile}`)).toBeInstanceOf(HTMLElement)
    expect(mockSettings.speakOrder.value).toBe(SpeakOrder.RankFile)

    mockSettings.speakOrder.value = SpeakOrder.TypeRankFile
  })

  it('picks up voices that finished loading between the initial render and the effect running', () => {
    let getVoicesCallCount = 0
    window.speechSynthesis = {
      getVoices: () => {
        getVoicesCallCount++
        // Simulate the voice list only becoming populated after the first call
        // (e.g. an async load that completes without 'voiceschanged' firing again).
        return getVoicesCallCount === 1 ? [] : [{ name: 'Alice' } as SpeechSynthesisVoice]
      },
      addEventListener: (_type: string, listener: () => void) => {
        voicesChangedListener = listener
      },
      speak: (utterance: SpeechSynthesisUtterance) => {
        spokenUtterances.push(utterance)
      },
    } as unknown as SpeechSynthesis

    render(
      <SettingsProvider settings={mockSettings}>
        <SpeechButtons />
      </SettingsProvider>
    )

    expect(screen.getByText('Alice')).toBeInstanceOf(HTMLElement)
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

  it('speaks a test phrase with the newly selected voice', async () => {
    const user = userEvent.setup()
    voiceNames = ['Alice']

    render(
      <SettingsProvider settings={mockSettings}>
        <SpeechButtons />
      </SettingsProvider>
    )

    const voiceSelect = screen.getByText('🔊 Voice').closest('label')?.querySelector('select')
    if (!voiceSelect) throw new Error('voice select not found')
    await user.selectOptions(voiceSelect, screen.getByText('Alice'))

    expect(spokenUtterances).toHaveLength(1)
    expect(spokenUtterances[0].text).toBe('test pawns on B-2 and D-2.')
    expect(spokenUtterances[0].voice?.name).toBe('Alice')
  })

  it('calls handleSpeechCommand with BQ when top-left is clicked as a white player', async () => {
    const user = userEvent.setup()
    boardReader.expects('getPlayerColor').withArgs().returns(PlayerColor.WHITE)
    speechHandler
      .expects('handleSpeechCommand')
      .withArgs(SpeechCommand.BQ, mockSettings)
      .returns(undefined)

    render(
      <SettingsProvider settings={mockSettings}>
        <SpeechButtons />
      </SettingsProvider>
    )

    await user.click(screen.getByText('🔊 ↖️'))
  })

  it('calls handleSpeechCommand with WK when top-left is clicked as a black player', async () => {
    const user = userEvent.setup()
    boardReader.expects('getPlayerColor').withArgs().returns(PlayerColor.BLACK)
    speechHandler
      .expects('handleSpeechCommand')
      .withArgs(SpeechCommand.WK, mockSettings)
      .returns(undefined)

    render(
      <SettingsProvider settings={mockSettings}>
        <SpeechButtons />
      </SettingsProvider>
    )

    await user.click(screen.getByText('🔊 ↖️'))
  })

  it('calls handleSpeechCommand with the correct quadrant for top-right as a white player', async () => {
    const user = userEvent.setup()
    boardReader.expects('getPlayerColor').withArgs().returns(PlayerColor.WHITE)
    speechHandler
      .expects('handleSpeechCommand')
      .withArgs(SpeechCommand.BK, mockSettings)
      .returns(undefined)

    render(
      <SettingsProvider settings={mockSettings}>
        <SpeechButtons />
      </SettingsProvider>
    )

    await user.click(screen.getByText('🔊 ↗️'))
  })

  it('calls handleSpeechCommand with the correct quadrant for bottom-left as a white player', async () => {
    const user = userEvent.setup()
    boardReader.expects('getPlayerColor').withArgs().returns(PlayerColor.WHITE)
    speechHandler
      .expects('handleSpeechCommand')
      .withArgs(SpeechCommand.WQ, mockSettings)
      .returns(undefined)

    render(
      <SettingsProvider settings={mockSettings}>
        <SpeechButtons />
      </SettingsProvider>
    )

    await user.click(screen.getByText('🔊 ↙️'))
  })

  it('calls handleSpeechCommand with the correct quadrant for bottom-right as a white player', async () => {
    const user = userEvent.setup()
    boardReader.expects('getPlayerColor').withArgs().returns(PlayerColor.WHITE)
    speechHandler
      .expects('handleSpeechCommand')
      .withArgs(SpeechCommand.WK, mockSettings)
      .returns(undefined)

    render(
      <SettingsProvider settings={mockSettings}>
        <SpeechButtons />
      </SettingsProvider>
    )

    await user.click(screen.getByText('🔊 ↘️'))
  })

  it('calls handleSpeechCommand with ALL when the All button is clicked', async () => {
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

    await user.click(screen.getByText('🔊 All'))
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

  it('calls handleSpeechCommand with WHITE when the White button is clicked', async () => {
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

    await user.click(screen.getByText('🔊 White'))
  })

  it('calls handleSpeechCommand with BLACK when the Black button is clicked', async () => {
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

    await user.click(screen.getByText('🔊 Black'))
  })
})
