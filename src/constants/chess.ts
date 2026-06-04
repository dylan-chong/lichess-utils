export enum PlayerColor {
  WHITE = 'white',
  BLACK = 'black',
}

export enum PieceType {
  PAWN = 'pawn',
  KNIGHT = 'knight',
  BISHOP = 'bishop',
  ROOK = 'rook',
  QUEEN = 'queen',
  KING = 'king',
}

export enum Quadrant {
  WHITE_KING = 'wk',
  WHITE_QUEEN = 'wq',
  BLACK_KING = 'bk',
  BLACK_QUEEN = 'bq',
}

// Helper arrays for iteration
export const PLAYER_COLOR_VALUES = Object.values(PlayerColor)
export const PIECE_TYPE_VALUES = Object.values(PieceType)
export const QUADRANT_VALUES = Object.values(Quadrant)
