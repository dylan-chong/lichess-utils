import { mockModule } from 'simone'
import { describe, it } from 'vitest'
import { PieceType, PlayerColor, Quadrant, SpeechCommand } from '../constants'
import { settings } from '../settings/settingsStore'

const boardReader = mockModule(import('../dom/boardReader'))
const speechSynthesizer = mockModule(import('../adapters-speech/speechSynthesizer'))
const pieceGrouping = mockModule(import('../pure/pieceGrouping'))
const speechText = mockModule(import('../pure/speechText'))
const { handleSpeechCommand } = await import('./handleSpeechCommand')

describe('handleSpeechCommand', () => {
  it('speaks quadrant pieces', () => {
    const pieces = [
      { square: 'e1', color: PlayerColor.WHITE as const, type: PieceType.KING as const },
    ]

    boardReader.expects('readPiecePositions').withArgs().returns(pieces)
    pieceGrouping.expects('filterQuadrant').withArgs(pieces, Quadrant.WHITE_KING).returns(pieces)
    speechText.expects('generateQuadrantText').withArgs(pieces).returns('e1 white king.')
    speechSynthesizer
      .expects('speak')
      .withArgs('e1 white king.', settings.speakRate.value)
      .returns(undefined)

    handleSpeechCommand(SpeechCommand.WK)
  })

  it('speaks all pieces', () => {
    const pieces = [
      { square: 'e1', color: PlayerColor.WHITE as const, type: PieceType.KING as const },
    ]

    boardReader.expects('readPiecePositions').withArgs().returns(pieces)
    speechText.expects('generateAllPiecesText').withArgs(pieces).returns('e1 white king.')
    speechSynthesizer
      .expects('speak')
      .withArgs('e1 white king.', settings.speakRate.value)
      .returns(undefined)

    handleSpeechCommand(SpeechCommand.ALL)
  })

  it('speaks white pieces', () => {
    const pieces = [
      { square: 'e1', color: PlayerColor.WHITE as const, type: PieceType.KING as const },
    ]

    boardReader.expects('readPiecePositions').withArgs().returns(pieces)
    speechText
      .expects('generateColorText')
      .withArgs(pieces, PlayerColor.WHITE)
      .returns('e1 white king.')
    speechSynthesizer
      .expects('speak')
      .withArgs('e1 white king.', settings.speakRate.value)
      .returns(undefined)

    handleSpeechCommand(SpeechCommand.WHITE)
  })

  it('speaks black pieces', () => {
    const pieces = [
      { square: 'e8', color: PlayerColor.BLACK as const, type: PieceType.KING as const },
    ]

    boardReader.expects('readPiecePositions').withArgs().returns(pieces)
    speechText
      .expects('generateColorText')
      .withArgs(pieces, PlayerColor.BLACK)
      .returns('e8 black king.')
    speechSynthesizer
      .expects('speak')
      .withArgs('e8 black king.', settings.speakRate.value)
      .returns(undefined)

    handleSpeechCommand(SpeechCommand.BLACK)
  })

  it('stops speaking', () => {
    speechSynthesizer.expects('stopSpeaking').withArgs().returns(undefined)
    handleSpeechCommand(SpeechCommand.STOP)
  })
})
