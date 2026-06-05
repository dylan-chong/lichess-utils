// Parallax camera angles in degrees
export enum Parallax {
  Overhead = 0,
  Slight_20 = 20,
  Slight_30 = 30,
  Medium_40 = 40,
  Medium_50 = 50,
  Strong_60 = 60,
  Strong_65 = 65,
  Strong_70 = 70,
  Extreme_80 = 80,
}

// Hover mode oscillation scales
export enum HoverMode {
  Off = 'off',
  Small = 'small',
  Large = 'large',
  Super = 'super',
}

// Piece visual styles
export enum PieceStyle {
  Icons = 'icons',
  ThreeD = '3d',
  Checker = 'checker',
  CheckerGrey = 'checker-grey',
  Blindfold = 'blindfold',
}

// Blur amounts in pixels
export enum Blur {
  None = 0,
  Slight_1 = 1,
  Slight_2 = 2,
  Medium_3 = 3,
  Medium_4 = 4,
  Heavy_6 = 6,
  Heavy_8 = 8,
}

// Black segments quadrant coverage
export enum BlackSegments {
  None = 'none',
  OneQuarter = '1/4',
  Half = '1/2',
  ThreeQuarters = '3/4',
  All = '4/4',
}

// Black segments rotation timing
export enum BlackSegmentsTiming {
  Rotate10s = 'rotate-10s',
  Rotate30s = 'rotate-30s',
  Rotate60s = 'rotate-60s',
  DontRotate = 'dont-rotate',
}

// Flash duration in milliseconds
export enum FlashDuration {
  Ms100 = 100,
  Ms300 = 300,
  Ms500 = 500,
  Ms1000 = 1000,
  Ms2000 = 2000,
}

// Flash interval in seconds
export enum FlashInterval {
  Sec0_3 = 0.3,
  Sec0_5 = 0.5,
  Sec1 = 1,
  Sec3 = 3,
  Sec5 = 5,
  Sec10 = 10,
  Sec30 = 30,
  Sec60 = 60,
}

// Helper functions to get all values as arrays for SettingButton options
export const PARALLAX_OPTIONS = Object.values(Parallax).filter(
  (v) => typeof v === 'number'
) as number[]

export const HOVER_MODE_OPTIONS = Object.values(HoverMode).filter(
  (v) => typeof v === 'string'
) as string[]

export const PIECE_STYLE_OPTIONS = Object.values(PieceStyle).filter(
  (v) => typeof v === 'string'
) as string[]

export const BLUR_OPTIONS = Object.values(Blur).filter((v) => typeof v === 'number') as number[]

export const BLACK_SEGMENTS_OPTIONS = Object.values(BlackSegments).filter(
  (v) => typeof v === 'string'
) as string[]

export const BLACK_SEGMENTS_TIMING_OPTIONS = Object.values(BlackSegmentsTiming).filter(
  (v) => typeof v === 'string'
) as string[]

export const FLASH_DURATION_OPTIONS = Object.values(FlashDuration).filter(
  (v) => typeof v === 'number'
) as number[]

export const FLASH_INTERVAL_OPTIONS = Object.values(FlashInterval).filter(
  (v) => typeof v === 'number'
) as number[]
