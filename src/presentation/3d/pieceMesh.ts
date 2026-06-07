import { createCanvas, createImage } from '../../platform/dom'
import { THREE } from '../../platform/three'
import {
  createBishopGeometry,
  createCheckerGeometry,
  createKingGeometry,
  createKnightGeometry,
  createPawnGeometry,
  createQueenGeometry,
  createRookGeometry,
} from './geometries'

type PieceType = 'pawn' | 'knight' | 'bishop' | 'rook' | 'queen' | 'king'

function create3DPieceMesh(pieceType: PieceType, isWhite: boolean): THREE.Object3D {
  const color = isWhite ? 0xf5f5dc : 0x2d2d2d
  const material = new THREE.MeshStandardMaterial({ color, roughness: 0.4, metalness: 0.1 })

  if (pieceType === 'king') {
    const geometries = createKingGeometry()
    const group = new THREE.Group()
    group.add(new THREE.Mesh(geometries.base, material))
    const crossV = new THREE.Mesh(geometries.crossV, material)
    crossV.position.y = 1.42
    group.add(crossV)
    const crossH = new THREE.Mesh(geometries.crossH, material)
    crossH.position.y = 1.38
    group.add(crossH)
    return group
  }

  let geometry: THREE.BufferGeometry
  if (pieceType === 'pawn') geometry = createPawnGeometry()
  else if (pieceType === 'rook') geometry = createRookGeometry()
  else if (pieceType === 'knight') geometry = createKnightGeometry()
  else if (pieceType === 'bishop') geometry = createBishopGeometry()
  else geometry = createQueenGeometry()

  const mesh = new THREE.Mesh(geometry, material)

  if (pieceType === 'knight') {
    mesh.rotation.y = isWhite ? 0 : Math.PI
    mesh.position.x = isWhite ? 0.05 : -0.05
    mesh.position.z = isWhite ? -0.11 : 0.11
  }

  return mesh
}

function createCheckerPieceMesh(
  isWhite: boolean,
  whiteColor: number,
  blackColor: number
): THREE.Mesh {
  const color = isWhite ? whiteColor : blackColor
  const material = new THREE.MeshBasicMaterial({ color })
  const geometry = createCheckerGeometry()
  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.y = 0.075
  return mesh
}

export function loadTextureFromImage(
  img: HTMLImageElement,
  material: THREE.MeshBasicMaterial
): void {
  const canvas = createCanvas()
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.drawImage(img, 0, 0, 256, 256)
  const texture = new THREE.Texture(canvas)
  texture.needsUpdate = true
  material.map = texture
  material.needsUpdate = true
}

function createIconPieceMesh(pieceType: PieceType, isWhite: boolean): THREE.Mesh {
  const geometry = new THREE.PlaneGeometry(1.4, 1.4)
  const material = new THREE.MeshBasicMaterial({
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
  })

  const mesh = new THREE.Mesh(geometry, material)
  mesh.rotation.x = -Math.PI / 2
  mesh.position.y = 0.01

  // Load SVG texture asynchronously
  const colorChar = isWhite ? 'w' : 'b'
  const pieceChar = pieceType === 'knight' ? 'N' : pieceType.charAt(0).toUpperCase()
  const url = `https://lichess1.org/assets/piece/cburnett/${colorChar}${pieceChar}.svg`

  const img = createImage()
  img.crossOrigin = 'anonymous'
  img.onload = () => {
    loadTextureFromImage(img, material)
  }
  img.src = url

  return mesh
}

export function createPieceMesh(
  pieceType: PieceType,
  isWhite: boolean,
  style: string
): THREE.Object3D | null {
  switch (style) {
    case '3d':
      return create3DPieceMesh(pieceType, isWhite)
    case 'checker':
      return createCheckerPieceMesh(isWhite, 0xe8e8e8, 0x1a1a1a)
    case 'checker-grey':
      return createCheckerPieceMesh(isWhite, 0x505050, 0x505050)
    case 'blindfold':
      return null
    case 'icons':
      return createIconPieceMesh(pieceType, isWhite)
    default:
      return createIconPieceMesh(pieceType, isWhite)
  }
}
