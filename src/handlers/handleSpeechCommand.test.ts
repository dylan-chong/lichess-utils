import { describe, it } from 'vitest'
import { mockModule } from 'simone'
import { settings } from '../settings/settingsStore'

const boardReader = mockModule(import('../dom/boardReader'))
const speechSynthesizer = mockModule(import('../browser/speechSynthesizer'))
const pieceGrouping = mockModule(import('../pure/pieceGrouping'))
const speechText = mockModule(import('../pure/speechText'))
const { handleSpeechCommand } = await import('./handleSpeechCommand')

describe('handleSpeechCommand', () => {
  it('speaks quadrant pieces', () => {
    const pieces = [
      { square: 'e1', color: 'white' as const, type: 'king' as const },
    ]

    boardReader.expects('readPiecePositions').withArgs().returns(pieces)
    pieceGrouping.expects('filterQuadrant').withArgs(pieces, 'wk').returns(pieces)
    speechText.expects('generateQuadrantText').withArgs(pieces).returns('e1 white king.')
    speechSynthesizer.expects('speak').withArgs('e1 white king.', settings.speakRate.value).returns(undefined)

    handleSpeechCommand('wk')
  })

  it('speaks all pieces', () => {
    const pieces = [
      { square: 'e1', color: 'white' as const, type: 'king' as const },
    ]

    boardReader.expects('readPiecePositions').withArgs().returns(pieces)
    speechText.expects('generateAllPiecesText').withArgs(pieces).returns('e1 white king.')
    speechSynthesizer.expects('speak').withArgs('e1 white king.', settings.speakRate.value).returns(undefined)

    handleSpeechCommand('all')
  })

  it('speaks pieces by color', () => {
    const pieces = [
      { square: 'e1', color: 'white' as const, type: 'king' as const },
    ]

    boardReader.expects('readPiecePositions').withArgs().returns(pieces)
    speechText.expects('generateColorText').withArgs(pieces, 'white').returns('e1 white king.')
    speechSynthesizer.expects('speak').withArgs('e1 white king.', settings.speakRate.value).returns(undefined)

    handleSpeechCommand('white')
  })

  it('stops speaking', () => {
    speechSynthesizer.expects('stopSpeaking').withArgs().returns(undefined)
    handleSpeechCommand('stop')
  })
})
