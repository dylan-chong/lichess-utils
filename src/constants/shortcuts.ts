export interface Shortcut {
  command: string
  description: string
}

export const SHORTCUTS: Shortcut[] = [
  // Speech Quadrants
  { command: 'pwk', description: 'Speak pieces on the white kingside quadrant' },
  { command: 'pwq', description: 'Speak pieces on the white queenside quadrant' },
  { command: 'pbk', description: 'Speak pieces on the black kingside quadrant' },
  { command: 'pbq', description: 'Speak pieces on the black queenside quadrant' },

  // Color Speech
  { command: 'pww', description: 'Speak all white pieces' },
  { command: 'pbb', description: 'Speak all black pieces' },

  // Stop/All
  { command: 'pss', description: 'Stop speaking immediately' },
  { command: 'pa', description: 'Speak all pieces on the board' },

  // Drawing Commands
  { command: '-<square>', description: 'Draw circle on a square (e.g., -a1)' },
  { command: '-<from><to>', description: 'Draw arrow between squares (e.g., -a1b2)' },
  { command: '-<sq1>,<sq2>,...', description: 'Draw multiple annotations (e.g., -d4,e4f6)' },
]
