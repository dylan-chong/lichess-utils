import { THREE } from '../../platform/three'

const LIGHT_COLOR = 0xeeeed2
const DARK_COLOR = 0x769656
const BLACK_COLOR = 0x000000

export function createBoardPlane(blackedOutQuadrants: number[]): THREE.Group {
  const boardGroup = new THREE.Group()

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const squareGeom = new THREE.PlaneGeometry(1, 1)
      const isLight = (row + col) % 2 === 0

      const isBlackedOut = isSquareInBlackedOutQuadrant(col, row, blackedOutQuadrants)
      let material: THREE.MeshBasicMaterial
      if (isBlackedOut) {
        material = new THREE.MeshBasicMaterial({ color: BLACK_COLOR })
      } else {
        material = new THREE.MeshBasicMaterial({ color: isLight ? LIGHT_COLOR : DARK_COLOR })
      }

      const square = new THREE.Mesh(squareGeom, material)
      square.position.set(col - 3.5, 0, row - 3.5)
      square.rotation.x = -Math.PI / 2
      boardGroup.add(square)
    }
  }

  return boardGroup
}

function isSquareInBlackedOutQuadrant(col: number, row: number, quadrants: number[]): boolean {
  if (quadrants.length === 0) return false

  const isLeft = col < 4
  const isTop = row < 4

  let quadrant: number
  if (isTop && isLeft) quadrant = 0
  else if (isTop && !isLeft) quadrant = 1
  else if (!isTop && isLeft) quadrant = 2
  else quadrant = 3

  return quadrants.includes(quadrant)
}
