import { signal } from '@preact/signals'
import { render, screen } from '@testing-library/preact'
import userEvent from '@testing-library/user-event'
import { mockModule } from 'simone'
import { describe, expect, it } from 'vitest'
import { SpeechCommand } from '../../constants/commands'
import { SettingsProvider } from '../contexts/SettingsContext'
import { SpeechButtons } from './SpeechButtons'

const speechHandler = mockModule(import('../../application/handlers/handleSpeechCommand'))

describe('SpeechButtons', () => {
  const mockSettings = {
    speakRate: signal(0.5),
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
  }

  it('renders all three rows of buttons', () => {
    render(
      <SettingsProvider settings={mockSettings}>
        <SpeechButtons />
      </SettingsProvider>
    )

    // Row 1: Quadrant buttons
    expect(screen.getByText('🔊 ♔ side')).toBeTruthy()
    expect(screen.getByText('🔊 ♕ side')).toBeTruthy()
    expect(screen.getByText('🔊 ♚ side')).toBeTruthy()
    expect(screen.getByText('🔊 ♛ side')).toBeTruthy()

    // Row 2: All/Color buttons
    expect(screen.getByText('🔊 all pieces')).toBeTruthy()
    expect(screen.getByText("🔊 w's pieces")).toBeTruthy()
    expect(screen.getByText("🔊 b's pieces")).toBeTruthy()

    // Row 3: Rate and Stop
    expect(screen.getByText('🔊 rate: 0.5')).toBeTruthy()
    expect(screen.getByText('🔊 Stop')).toBeTruthy()
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

    await user.click(screen.getByText('🔊 ♔ side'))
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

    await user.click(screen.getByText('🔊 all pieces'))
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
})
