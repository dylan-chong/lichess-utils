export enum KeyboardCommand {
  PWK = 'pwk',
  PWQ = 'pwq',
  PBK = 'pbk',
  PBQ = 'pbq',
  PA = 'pa',
  PWW = 'pww',
  PBB = 'pbb',
  PSS = 'pss',
}

export enum SpeechCommand {
  ALL = 'all',
  WHITE = 'white',
  BLACK = 'black',
  STOP = 'stop',
  WK = 'wk',
  WQ = 'wq',
  BK = 'bk',
  BQ = 'bq',
}

// Keyboard to speech command mapping
export const KEYBOARD_COMMAND_MAP = new Map([
  [KeyboardCommand.PWK, SpeechCommand.WK],
  [KeyboardCommand.PWQ, SpeechCommand.WQ],
  [KeyboardCommand.PBK, SpeechCommand.BK],
  [KeyboardCommand.PBQ, SpeechCommand.BQ],
  [KeyboardCommand.PA, SpeechCommand.ALL],
  [KeyboardCommand.PWW, SpeechCommand.WHITE],
  [KeyboardCommand.PBB, SpeechCommand.BLACK],
  [KeyboardCommand.PSS, SpeechCommand.STOP],
] as const)
