import { describe, expect, it } from 'vitest'
import { pixelPositionTo3D } from './boardPosition3d'

describe('pixelPositionTo3D', () => {
  const BOARD_SIZE = 624 // Standard lichess board size
  const SQUARE_SIZE = 78 // 624 / 8
  const SQUARE_CENTER = 39 // 78 / 2

  describe('non-flipped board (white perspective)', () => {
    it('converts top-left corner (a8 for white) correctly', () => {
      // Top-left pixel (39, 39) should be the center of a8
      // normalizedX = 39/624*8 = 0.5, normalizedY = 0.5
      // x = 0.5 - 4 = -3.5
      // z = 8 - 0.5 - 4 = 3.5
      const result = pixelPositionTo3D(SQUARE_CENTER, SQUARE_CENTER, BOARD_SIZE, false)

      expect(result.x).toBeCloseTo(-3.5)
      expect(result.z).toBeCloseTo(3.5)
    })

    it('converts center of board to (0, 0)', () => {
      // Center pixel (312, 312)
      // normalized = 4, 4
      // x = 4 - 4 = 0
      // z = 8 - 4 - 4 = 0
      const result = pixelPositionTo3D(312, 312, BOARD_SIZE, false)

      expect(result.x).toBeCloseTo(0)
      expect(result.z).toBeCloseTo(0)
    })

    it('converts bottom-right corner (h1 for white) correctly', () => {
      // Bottom-right pixel center (585, 585)
      // normalizedX = 585/624*8 = 7.5, normalizedY = 7.5
      // x = 7.5 - 4 = 3.5
      // z = 8 - 7.5 - 4 = -3.5
      const bottomRightCenter = SQUARE_CENTER + 7 * SQUARE_SIZE
      const result = pixelPositionTo3D(bottomRightCenter, bottomRightCenter, BOARD_SIZE, false)

      expect(result.x).toBeCloseTo(3.5)
      expect(result.z).toBeCloseTo(-3.5)
    })

    it('converts top-right corner (h8 for white) correctly', () => {
      // Top-right pixel center (585, 39)
      // normalizedX = 7.5, normalizedY = 0.5
      // x = 7.5 - 4 = 3.5
      // z = 8 - 0.5 - 4 = 3.5
      const topRightCenterX = SQUARE_CENTER + 7 * SQUARE_SIZE
      const result = pixelPositionTo3D(topRightCenterX, SQUARE_CENTER, BOARD_SIZE, false)

      expect(result.x).toBeCloseTo(3.5)
      expect(result.z).toBeCloseTo(3.5)
    })

    it('converts bottom-left corner (a1 for white) correctly', () => {
      // Bottom-left pixel center (39, 585)
      // normalizedX = 0.5, normalizedY = 7.5
      // x = 0.5 - 4 = -3.5
      // z = 8 - 7.5 - 4 = -3.5
      const bottomLeftCenterY = SQUARE_CENTER + 7 * SQUARE_SIZE
      const result = pixelPositionTo3D(SQUARE_CENTER, bottomLeftCenterY, BOARD_SIZE, false)

      expect(result.x).toBeCloseTo(-3.5)
      expect(result.z).toBeCloseTo(-3.5)
    })
  })

  describe('flipped board (black perspective)', () => {
    it('converts top-left corner (h1 for black) correctly', () => {
      // Top-left pixel (39, 39) is now h1 from black's perspective
      // normalizedX = 0.5, normalizedY = 0.5
      // x = 0.5 - 4 = -3.5
      // z = 0.5 - 4 = -3.5
      const result = pixelPositionTo3D(SQUARE_CENTER, SQUARE_CENTER, BOARD_SIZE, true)

      expect(result.x).toBeCloseTo(-3.5)
      expect(result.z).toBeCloseTo(-3.5)
    })

    it('converts center of board to (0, 0)', () => {
      // Center should always be (0, 0) regardless of flip
      const result = pixelPositionTo3D(312, 312, BOARD_SIZE, true)

      expect(result.x).toBeCloseTo(0)
      expect(result.z).toBeCloseTo(0)
    })

    it('converts bottom-right corner (a8 for black) correctly', () => {
      // Bottom-right pixel center (585, 585) is a8 from black's perspective
      // normalizedX = 7.5, normalizedY = 7.5
      // x = 7.5 - 4 = 3.5
      // z = 7.5 - 4 = 3.5
      const bottomRightCenter = SQUARE_CENTER + 7 * SQUARE_SIZE
      const result = pixelPositionTo3D(bottomRightCenter, bottomRightCenter, BOARD_SIZE, true)

      expect(result.x).toBeCloseTo(3.5)
      expect(result.z).toBeCloseTo(3.5)
    })

    it('converts top-right corner (a1 for black) correctly', () => {
      // Top-right pixel center (585, 39)
      // normalizedX = 7.5, normalizedY = 0.5
      // x = 7.5 - 4 = 3.5
      // z = 0.5 - 4 = -3.5
      const topRightCenterX = SQUARE_CENTER + 7 * SQUARE_SIZE
      const result = pixelPositionTo3D(topRightCenterX, SQUARE_CENTER, BOARD_SIZE, true)

      expect(result.x).toBeCloseTo(3.5)
      expect(result.z).toBeCloseTo(-3.5)
    })

    it('converts bottom-left corner (h8 for black) correctly', () => {
      // Bottom-left pixel center (39, 585)
      // normalizedX = 0.5, normalizedY = 7.5
      // x = 0.5 - 4 = -3.5
      // z = 7.5 - 4 = 3.5
      const bottomLeftCenterY = SQUARE_CENTER + 7 * SQUARE_SIZE
      const result = pixelPositionTo3D(SQUARE_CENTER, bottomLeftCenterY, BOARD_SIZE, true)

      expect(result.x).toBeCloseTo(-3.5)
      expect(result.z).toBeCloseTo(3.5)
    })
  })

  describe('edge cases', () => {
    it('maps exact top-left corner (0, 0) to (-4, 4)', () => {
      const result = pixelPositionTo3D(0, 0, BOARD_SIZE, false)

      expect(result.x).toBeCloseTo(-4)
      expect(result.z).toBeCloseTo(4)
    })

    it('maps exact bottom-right corner (624, 624) to (4, -4)', () => {
      const result = pixelPositionTo3D(BOARD_SIZE, BOARD_SIZE, BOARD_SIZE, false)

      expect(result.x).toBeCloseTo(4)
      expect(result.z).toBeCloseTo(-4)
    })

    it('maps center to (0, 0) regardless of board size', () => {
      // Test with a smaller board (400px)
      const smallBoardSize = 400
      const centerPx = 200
      const result = pixelPositionTo3D(centerPx, centerPx, smallBoardSize, false)

      // Should still map center to (0, 0)
      expect(result.x).toBeCloseTo(0)
      expect(result.z).toBeCloseTo(0)
    })

    it('returns correct type structure', () => {
      const result = pixelPositionTo3D(312, 312, BOARD_SIZE, false)

      expect(result).toHaveProperty('x')
      expect(result).toHaveProperty('z')
      expect(typeof result.x).toBe('number')
      expect(typeof result.z).toBe('number')
    })
  })
})
