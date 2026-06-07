export interface Position3D {
  x: number
  z: number
}

export function pixelPositionTo3D(
  pixelX: number,
  pixelY: number,
  boardSize: number,
  isFlipped: boolean
): Position3D {
  const normalizedX = (pixelX / boardSize) * 8
  const normalizedY = (pixelY / boardSize) * 8

  let x: number
  let z: number

  if (isFlipped) {
    x = normalizedX - 4
    z = normalizedY - 4
  } else {
    x = normalizedX - 4
    z = 8 - normalizedY - 4
  }

  return { x, z }
}
