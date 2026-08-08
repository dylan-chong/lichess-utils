import { PlayerColor, Quadrant } from '../../constants/chess'

export type ScreenPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

const WHITE_PLAYER_POSITIONS: Record<Quadrant, ScreenPosition> = {
  [Quadrant.WHITE_KING]: 'bottom-right',
  [Quadrant.WHITE_QUEEN]: 'bottom-left',
  [Quadrant.BLACK_KING]: 'top-right',
  [Quadrant.BLACK_QUEEN]: 'top-left',
}

const BLACK_PLAYER_POSITIONS: Record<Quadrant, ScreenPosition> = {
  [Quadrant.WHITE_KING]: 'top-left',
  [Quadrant.WHITE_QUEEN]: 'top-right',
  [Quadrant.BLACK_KING]: 'bottom-left',
  [Quadrant.BLACK_QUEEN]: 'bottom-right',
}

export function getQuadrantScreenPosition(
  quadrant: Quadrant,
  playerColor: PlayerColor
): ScreenPosition {
  const positions =
    playerColor === PlayerColor.WHITE ? WHITE_PLAYER_POSITIONS : BLACK_PLAYER_POSITIONS
  return positions[quadrant]
}

const WHITE_PLAYER_QUADRANTS: Record<ScreenPosition, Quadrant> = {
  'bottom-right': Quadrant.WHITE_KING,
  'bottom-left': Quadrant.WHITE_QUEEN,
  'top-right': Quadrant.BLACK_KING,
  'top-left': Quadrant.BLACK_QUEEN,
}

const BLACK_PLAYER_QUADRANTS: Record<ScreenPosition, Quadrant> = {
  'top-left': Quadrant.WHITE_KING,
  'top-right': Quadrant.WHITE_QUEEN,
  'bottom-left': Quadrant.BLACK_KING,
  'bottom-right': Quadrant.BLACK_QUEEN,
}

export function getQuadrantAtScreenPosition(
  position: ScreenPosition,
  playerColor: PlayerColor
): Quadrant {
  const quadrants =
    playerColor === PlayerColor.WHITE ? WHITE_PLAYER_QUADRANTS : BLACK_PLAYER_QUADRANTS
  return quadrants[position]
}
