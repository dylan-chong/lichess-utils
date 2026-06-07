import { DomSelector } from '../../constants/dom'
import { pixelPositionTo3D } from '../../domain/chess/boardPosition3d'
import { querySelector } from '../../platform/dom'
import { THREE } from '../../platform/three'
import type { Canvas3DState } from './canvas'
import { createPieceMesh } from './pieceMesh'

export interface PieceManagerState {
  meshes: THREE.Object3D[]
  meshMap: Map<string, THREE.Object3D>
}

export function createPieceManager(): PieceManagerState {
  return { meshes: [], meshMap: new Map() }
}

export function updatePieces(
  canvasState: Canvas3DState,
  pieceManagerState: PieceManagerState,
  pieceStyle: string,
  isFlipped: boolean,
  blackedOutQuadrants: number[]
): void {
  const board = querySelector(DomSelector.BOARD) as HTMLElement | null
  if (!board) return

  const boardRect = board.getBoundingClientRect()
  const boardSize = boardRect.width
  const squareSize = boardSize / 8
  const pieceElements = board.querySelectorAll('piece')
  const currentPieceIds = new Set<string>()

  for (const pieceEl of pieceElements) {
    const classes = pieceEl.className
    const match = classes.match(/^(white|black)\s+(king|queen|rook|bishop|knight|pawn)/)
    if (!match) continue
    if (pieceEl.classList.contains('ghost')) continue

    const colour = match[1] as 'white' | 'black'
    const type = match[2] as 'pawn' | 'knight' | 'bishop' | 'rook' | 'queen' | 'king'

    const el = pieceEl as HTMLElement
    const pixelPos = getPixelPosition(el)
    if (!pixelPos) continue

    const pieceId = `${colour}-${type}-${Math.round(pixelPos.x)}-${Math.round(pixelPos.y)}`
    currentPieceIds.add(pieceId)

    let mesh = pieceManagerState.meshMap.get(pieceId)

    // Try to reuse existing mesh of same type
    if (!mesh) {
      for (const [key, existingMesh] of pieceManagerState.meshMap.entries()) {
        if (key.startsWith(`${colour}-${type}-`) && !currentPieceIds.has(key)) {
          mesh = existingMesh
          pieceManagerState.meshMap.delete(key)
          pieceManagerState.meshMap.set(pieceId, mesh)
          break
        }
      }
    }

    // Create new mesh if needed
    if (!mesh) {
      const newMesh = createPieceMesh(type, colour === 'white', pieceStyle)
      if (!newMesh) continue

      mesh = newMesh
      const scale = 0.65
      mesh.scale.set(scale, scale, scale)
      canvasState.scene.add(mesh)
      pieceManagerState.meshes.push(mesh)
      pieceManagerState.meshMap.set(pieceId, mesh)
    }

    // Update position
    const centerOffset = squareSize / 2
    const pos3D = pixelPositionTo3D(
      pixelPos.x + centerOffset,
      pixelPos.y + centerOffset,
      boardSize,
      isFlipped
    )
    mesh.position.x = pos3D.x
    mesh.position.z = pos3D.z

    // Store grid position for visibility
    const col = Math.round(pixelPos.x / squareSize)
    const row = Math.round(pixelPos.y / squareSize)
    mesh.userData.col = col
    mesh.userData.row = row

    // Rotate icons for board flip
    if (pieceStyle === 'icons') {
      mesh.rotation.z = isFlipped ? 0 : Math.PI
    }

    // Hide pieces in blacked out quadrants
    mesh.visible = !isPositionBlackedOut(col, row, blackedOutQuadrants)
  }

  // Remove meshes no longer on the board
  for (const [key, mesh] of pieceManagerState.meshMap.entries()) {
    if (!currentPieceIds.has(key)) {
      canvasState.scene.remove(mesh)
      disposeMesh(mesh)
      pieceManagerState.meshMap.delete(key)
      const idx = pieceManagerState.meshes.indexOf(mesh)
      if (idx > -1) pieceManagerState.meshes.splice(idx, 1)
    }
  }
}

export function clearAllPieces(
  canvasState: Canvas3DState,
  pieceManagerState: PieceManagerState
): void {
  for (const mesh of pieceManagerState.meshes) {
    canvasState.scene.remove(mesh)
    disposeMesh(mesh)
  }
  pieceManagerState.meshes = []
  pieceManagerState.meshMap.clear()
}

function getPixelPosition(el: HTMLElement): { x: number; y: number } | null {
  const computedTransform = window.getComputedStyle(el).transform
  if (computedTransform && computedTransform !== 'none') {
    const matrixMatch = computedTransform.match(/matrix\(([^)]+)\)/)
    if (matrixMatch) {
      const values = matrixMatch[1].split(',').map((v) => Number.parseFloat(v.trim()))
      return { x: values[4], y: values[5] }
    }
  }

  const inlineTransform = el.style.transform
  const translateMatch = inlineTransform.match(/translate\(([\d.]+)px(?:,\s*([\d.]+)px)?\)/)
  if (translateMatch) {
    return {
      x: Number.parseFloat(translateMatch[1]),
      y: Number.parseFloat(translateMatch[2] || '0'),
    }
  }

  return null
}

function disposeMesh(obj: THREE.Object3D): void {
  if (obj instanceof THREE.Mesh) {
    obj.geometry?.dispose()
    if (obj.material instanceof THREE.Material) {
      obj.material.dispose()
    }
  }
  for (const child of obj.children) {
    disposeMesh(child)
  }
}

function isPositionBlackedOut(col: number, row: number, quadrants: number[]): boolean {
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
