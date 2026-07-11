import { mockModule } from 'simone'
import { beforeEach, describe, expect, it } from 'vitest'
import {
  createDividers,
  destroyDividers,
  hideDividers,
  resizeDividers,
  showDividers,
} from './dividers'

const dom = mockModule(import('../../platform/dom'))

describe('dividers', () => {
  let mockBoard: HTMLElement
  let mockSvg: SVGSVGElement
  let mockVLine: SVGElement
  let mockHLine: SVGElement

  beforeEach(() => {
    mockBoard = document.createElement('div')
    Object.defineProperty(mockBoard, 'getBoundingClientRect', {
      value: () => ({ width: 624, height: 624, top: 0, left: 0 }),
    })
    mockSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg') as SVGSVGElement
    mockVLine = document.createElementNS('http://www.w3.org/2000/svg', 'line')
    mockHLine = document.createElementNS('http://www.w3.org/2000/svg', 'line')
  })

  it('creates SVG with lines and appends to board', () => {
    dom.expects('createSvgElement').withArgs('svg').returns(mockSvg)
    dom.expects('createSvgElement').withArgs('line').returns(mockVLine)
    dom.expects('createSvgElement').withArgs('line').returns(mockHLine)
    dom.expects('appendChild').withArgs(mockSvg, mockVLine).returns(undefined)
    dom.expects('appendChild').withArgs(mockSvg, mockHLine).returns(undefined)
    dom.expects('querySelector').withArgs('cg-board').returns(mockBoard)
    dom.expects('appendChild').withArgs(mockBoard, mockSvg).returns(undefined)

    const state = createDividers()

    expect(state.svg).toBe(mockSvg)
    expect(state.vLine).toBe(mockVLine)
    expect(state.hLine).toBe(mockHLine)
    expect(mockSvg.getAttribute('class')).toBe('userscript-dividers')
  })

  it('creates SVG without appending when board not found', () => {
    dom.expects('createSvgElement').withArgs('svg').returns(mockSvg)
    dom.expects('createSvgElement').withArgs('line').returns(mockVLine)
    dom.expects('createSvgElement').withArgs('line').returns(mockHLine)
    dom.expects('appendChild').withArgs(mockSvg, mockVLine).returns(undefined)
    dom.expects('appendChild').withArgs(mockSvg, mockHLine).returns(undefined)
    dom.expects('querySelector').withArgs('cg-board').returns(null)

    const state = createDividers()

    expect(state.svg).toBe(mockSvg)
  })

  it('showDividers sets display to block and resizes', () => {
    const state = { svg: mockSvg, vLine: mockVLine, hLine: mockHLine }
    dom.expects('querySelector').withArgs('cg-board').returns(mockBoard)
    dom.expects('appendChild').withArgs(mockBoard, mockSvg).returns(undefined)

    showDividers(state)

    expect(state.svg.style.display).toBe('block')
  })

  it('hideDividers sets display to none', () => {
    const state = { svg: mockSvg, vLine: mockVLine, hLine: mockHLine }

    hideDividers(state)

    expect(state.svg.style.display).toBe('none')
  })

  it('resizeDividers updates dimensions from board', () => {
    const state = { svg: mockSvg, vLine: mockVLine, hLine: mockHLine }
    mockBoard.appendChild(mockSvg)
    dom.expects('querySelector').withArgs('cg-board').returns(mockBoard)

    resizeDividers(state)

    expect(state.svg.getAttribute('width')).toBe('624')
    expect(state.svg.getAttribute('height')).toBe('624')
    expect(state.vLine.getAttribute('x1')).toBe('312')
    expect(state.hLine.getAttribute('y1')).toBe('312')
  })

  it('resizeDividers re-appends svg if not in board', () => {
    const state = { svg: mockSvg, vLine: mockVLine, hLine: mockHLine }
    dom.expects('querySelector').withArgs('cg-board').returns(mockBoard)
    dom.expects('appendChild').withArgs(mockBoard, mockSvg).returns(undefined)

    resizeDividers(state)

    expect(state.svg.getAttribute('width')).toBe('624')
  })

  it('resizeDividers does nothing when board not found', () => {
    const state = { svg: mockSvg, vLine: mockVLine, hLine: mockHLine }
    dom.expects('querySelector').withArgs('cg-board').returns(null)

    resizeDividers(state)
  })

  it('destroyDividers removes SVG', () => {
    const state = { svg: mockSvg, vLine: mockVLine, hLine: mockHLine }
    mockBoard.appendChild(mockSvg)

    destroyDividers(state)

    expect(mockBoard.contains(mockSvg)).toBe(false)
  })
})
