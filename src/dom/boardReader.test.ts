import { describe, it, expect, beforeEach } from 'vitest'
import { readPiecePositions, getPlayerColor, waitForElement } from './boardReader'

describe('getPlayerColor', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('returns white when coords has no black class', () => {
    document.body.innerHTML = '<coords></coords>'
    expect(getPlayerColor()).toBe('white')
  })

  it('returns black when coords has black class', () => {
    document.body.innerHTML = '<coords class="black"></coords>'
    expect(getPlayerColor()).toBe('black')
  })

  it('returns white when coords element missing', () => {
    expect(getPlayerColor()).toBe('white')
  })
})

describe('readPiecePositions', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('reads piece positions for white player', () => {
    document.body.innerHTML = `
      <cg-board style="width: 624px">
        <piece class="white pawn" style="transform: translate(0px, 546px)"></piece>
        <piece class="white rook" style="transform: translate(0px, 624px)"></piece>
      </cg-board>
      <coords></coords>
    `

    const result = readPiecePositions()

    expect(result).toEqual([
      { square: 'a2', color: 'white', type: 'pawn' },
      { square: 'a1', color: 'white', type: 'rook' },
    ])
  })

  it('ignores pieces on userscript custom board', () => {
    document.body.innerHTML = `
      <cg-board class="userscript-custom-board">
        <piece class="white pawn" style="transform: translate(0px, 546px)"></piece>
      </cg-board>
      <coords></coords>
    `

    const result = readPiecePositions()
    expect(result).toEqual([])
  })
})

describe('waitForElement', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('resolves immediately if element exists', async () => {
    document.body.innerHTML = '<div class="test"></div>'

    const element = await waitForElement('.test')
    expect(element).toBeInstanceOf(Element)
  })

  it('waits for element to be added', async () => {
    const promise = waitForElement('.test')

    setTimeout(() => {
      const div = document.createElement('div')
      div.className = 'test'
      document.body.appendChild(div)
    }, 10)

    const element = await promise
    expect(element).toBeInstanceOf(Element)
  })
})
