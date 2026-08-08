import { SpeakOrder } from './options'

export interface Settings {
  speakRate: number
  pauseLength: number
  voiceName: string
  speakOrder: string
  piecesListEnabled: boolean
  dividersEnabled: boolean
  customBoardEnabled: boolean
  obfuscationsEnabled: boolean
  parallax: number
  hoverMode: string
  pieceStyle: string
  blur: number
  blackSegments: string
  blackSegmentsTiming: string
  flashModeEnabled: boolean
  flashDuration: number
  flashInterval: number
  meditationEnabled: boolean
}

export const defaultSettings: Settings = {
  speakRate: 0.5,
  pauseLength: 0.6,
  voiceName: '',
  speakOrder: SpeakOrder.TypeRankFile,
  piecesListEnabled: false,
  dividersEnabled: false,
  customBoardEnabled: false,
  obfuscationsEnabled: false,
  parallax: 0,
  hoverMode: 'off',
  pieceStyle: 'icons',
  blur: 0,
  blackSegments: 'none',
  blackSegmentsTiming: 'rotate-10s',
  flashModeEnabled: false,
  flashDuration: 1,
  flashInterval: 3,
  meditationEnabled: false,
}
