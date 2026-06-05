import { describe, expect, it } from 'vitest'
import {
  BLACK_SEGMENTS_OPTIONS,
  BLACK_SEGMENTS_TIMING_OPTIONS,
  BLUR_OPTIONS,
  BlackSegments,
  BlackSegmentsTiming,
  Blur,
  FLASH_DURATION_OPTIONS,
  FLASH_INTERVAL_OPTIONS,
  FlashDuration,
  FlashInterval,
  HOVER_MODE_OPTIONS,
  HoverMode,
  PARALLAX_OPTIONS,
  PIECE_STYLE_OPTIONS,
  Parallax,
  PieceStyle,
} from './options'

describe('Parallax', () => {
  it('has correct angle values', () => {
    expect(Parallax.Overhead).toBe(0)
    expect(Parallax.Slight_20).toBe(20)
    expect(Parallax.Extreme_80).toBe(80)
  })

  it('exports options array with all numeric values', () => {
    expect(PARALLAX_OPTIONS).toEqual([0, 20, 30, 40, 50, 60, 65, 70, 80])
  })
})

describe('HoverMode', () => {
  it('has correct mode values', () => {
    expect(HoverMode.Off).toBe('off')
    expect(HoverMode.Small).toBe('small')
    expect(HoverMode.Large).toBe('large')
    expect(HoverMode.Super).toBe('super')
  })

  it('exports options array with all string values', () => {
    expect(HOVER_MODE_OPTIONS).toEqual(['off', 'small', 'large', 'super'])
  })
})

describe('PieceStyle', () => {
  it('has correct style values', () => {
    expect(PieceStyle.Icons).toBe('icons')
    expect(PieceStyle.ThreeD).toBe('3d')
    expect(PieceStyle.Checker).toBe('checker')
    expect(PieceStyle.CheckerGrey).toBe('checker-grey')
    expect(PieceStyle.Blindfold).toBe('blindfold')
  })

  it('exports options array with all string values', () => {
    expect(PIECE_STYLE_OPTIONS).toEqual(['icons', '3d', 'checker', 'checker-grey', 'blindfold'])
  })
})

describe('Blur', () => {
  it('has correct pixel values', () => {
    expect(Blur.None).toBe(0)
    expect(Blur.Slight_1).toBe(1)
    expect(Blur.Heavy_8).toBe(8)
  })

  it('exports options array with all numeric values', () => {
    expect(BLUR_OPTIONS).toEqual([0, 1, 2, 3, 4, 6, 8])
  })
})

describe('BlackSegments', () => {
  it('has correct coverage values', () => {
    expect(BlackSegments.None).toBe('none')
    expect(BlackSegments.OneQuarter).toBe('1/4')
    expect(BlackSegments.Half).toBe('1/2')
    expect(BlackSegments.ThreeQuarters).toBe('3/4')
    expect(BlackSegments.All).toBe('4/4')
  })

  it('exports options array with all string values', () => {
    expect(BLACK_SEGMENTS_OPTIONS).toEqual(['none', '1/4', '1/2', '3/4', '4/4'])
  })
})

describe('BlackSegmentsTiming', () => {
  it('has correct timing values', () => {
    expect(BlackSegmentsTiming.Rotate10s).toBe('rotate-10s')
    expect(BlackSegmentsTiming.Rotate30s).toBe('rotate-30s')
    expect(BlackSegmentsTiming.Rotate60s).toBe('rotate-60s')
    expect(BlackSegmentsTiming.DontRotate).toBe('dont-rotate')
  })

  it('exports options array with all string values', () => {
    expect(BLACK_SEGMENTS_TIMING_OPTIONS).toEqual([
      'rotate-10s',
      'rotate-30s',
      'rotate-60s',
      'dont-rotate',
    ])
  })
})

describe('FlashDuration', () => {
  it('has correct millisecond values', () => {
    expect(FlashDuration.Ms100).toBe(100)
    expect(FlashDuration.Ms300).toBe(300)
    expect(FlashDuration.Ms2000).toBe(2000)
  })

  it('exports options array with all numeric values', () => {
    expect(FLASH_DURATION_OPTIONS).toEqual([100, 300, 500, 1000, 2000])
  })
})

describe('FlashInterval', () => {
  it('has correct second values', () => {
    expect(FlashInterval.Sec0_3).toBe(0.3)
    expect(FlashInterval.Sec1).toBe(1)
    expect(FlashInterval.Sec60).toBe(60)
  })

  it('exports options array with all numeric values', () => {
    expect(FLASH_INTERVAL_OPTIONS).toEqual([0.3, 0.5, 1, 3, 5, 10, 30, 60])
  })
})
