import { mockModule } from 'simone'
import { describe, it } from 'vitest'
import { PieceType, PlayerColor, Quadrant } from '../../constants/chess'
import { SpeechCommand } from '../../constants/commands'
import { createSettingsStore } from '../settings/settingsStore'
import { handleSpeechCommand } from './handleSpeechCommand'

const boardReader = mockModule(import('../services/boardReader/reader'))
const speechSynthesizer = mockModule(import('../../platform/speech/index'))
const pieceGrouping = mockModule(import('../../domain/chess/pieceGrouping'))
const speechText = mockModule(import('../../domain/speech/speechText'))

describe('handleSpeechCommand', () => {
  const settings = createSettingsStore()

  it('speaks quadrant pieces', () => {
    const pieces = [
      { square: 'e1', color: PlayerColor.WHITE as const, type: PieceType.KING as const },
    ]

    boardReader.expects('readPiecePositions').withArgs().returns(pieces)
    pieceGrouping.expects('filterQuadrant').withArgs(pieces, Quadrant.WHITE_KING).returns(pieces)
    speechText.expects('generateQuadrantSegments').withArgs(pieces).returns(['e1 white king.'])
    boardReader.expects('getPlayerColor').withArgs().returns(PlayerColor.WHITE)
    speechSynthesizer
      .expects('speakSegments')
      .withArgs(
        ['you are white.', 'e1 white king.'],
        settings.speakRate.value,
        settings.pauseLength,
        undefined
      )
      .returns(undefined)

    handleSpeechCommand(SpeechCommand.WK, settings)
  })

  it('speaks all pieces', () => {
    const pieces = [
      { square: 'e1', color: PlayerColor.WHITE as const, type: PieceType.KING as const },
    ]

    boardReader.expects('readPiecePositions').withArgs().returns(pieces)
    speechText.expects('generateAllPiecesSegments').withArgs(pieces).returns(['e1 white king.'])
    boardReader.expects('getPlayerColor').withArgs().returns(PlayerColor.WHITE)
    speechSynthesizer
      .expects('speakSegments')
      .withArgs(
        ['you are white.', 'e1 white king.'],
        settings.speakRate.value,
        settings.pauseLength,
        undefined
      )
      .returns(undefined)

    handleSpeechCommand(SpeechCommand.ALL, settings)
  })

  it('speaks white pieces', () => {
    const pieces = [
      { square: 'e1', color: PlayerColor.WHITE as const, type: PieceType.KING as const },
    ]

    boardReader.expects('readPiecePositions').withArgs().returns(pieces)
    speechText
      .expects('generateColorSegments')
      .withArgs(pieces, PlayerColor.WHITE)
      .returns(['e1 white king.'])
    boardReader.expects('getPlayerColor').withArgs().returns(PlayerColor.WHITE)
    speechSynthesizer
      .expects('speakSegments')
      .withArgs(
        ['you are white.', 'e1 white king.'],
        settings.speakRate.value,
        settings.pauseLength,
        undefined
      )
      .returns(undefined)

    handleSpeechCommand(SpeechCommand.WHITE, settings)
  })

  it('speaks black pieces', () => {
    const pieces = [
      { square: 'e8', color: PlayerColor.BLACK as const, type: PieceType.KING as const },
    ]

    boardReader.expects('readPiecePositions').withArgs().returns(pieces)
    speechText
      .expects('generateColorSegments')
      .withArgs(pieces, PlayerColor.BLACK)
      .returns(['e8 black king.'])
    boardReader.expects('getPlayerColor').withArgs().returns(PlayerColor.BLACK)
    speechSynthesizer
      .expects('speakSegments')
      .withArgs(
        ['you are black.', 'e8 black king.'],
        settings.speakRate.value,
        settings.pauseLength,
        undefined
      )
      .returns(undefined)

    handleSpeechCommand(SpeechCommand.BLACK, settings)
  })

  it('forwards the onFinished callback to speakSegments', () => {
    const pieces = [
      { square: 'e1', color: PlayerColor.WHITE as const, type: PieceType.KING as const },
    ]
    const onFinished = () => {}

    boardReader.expects('readPiecePositions').withArgs().returns(pieces)
    speechText.expects('generateAllPiecesSegments').withArgs(pieces).returns(['e1 white king.'])
    boardReader.expects('getPlayerColor').withArgs().returns(PlayerColor.WHITE)
    speechSynthesizer
      .expects('speakSegments')
      .withArgs(
        ['you are white.', 'e1 white king.'],
        settings.speakRate.value,
        settings.pauseLength,
        onFinished
      )
      .returns(undefined)

    handleSpeechCommand(SpeechCommand.ALL, settings, onFinished)
  })

  it('stops speaking', () => {
    speechSynthesizer.expects('stopSpeaking').withArgs().returns(undefined)
    handleSpeechCommand(SpeechCommand.STOP, settings)
  })
})
