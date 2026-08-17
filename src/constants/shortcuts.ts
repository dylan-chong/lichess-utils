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
]
