import { THREE } from '../../platform/three'
import { AnnotationType } from '../../constants/annotations'
import type { DrawAnnotation } from '../../domain/commands/commandParser'
import { render3D, type Canvas3DState } from './canvas'

const DRAWING_COLOR = 0xff6b6b

export interface Drawings3DState {
  objects: THREE.Object3D[]
}

export function createDrawings3DState(): Drawings3DState {
  return { objects: [] }
}

function squareTo3DCoords(square: string): { x: number; z: number } {
  const fileIndex = square.charCodeAt(0) - 'a'.charCodeAt(0)
  const rankIndex = Number.parseInt(square[1]) - 1
  return { x: 3.5 - fileIndex, z: rankIndex - 3.5 }
}

function create3DCircle(x: number, z: number): THREE.Mesh {
  const geometry = new THREE.TorusGeometry(0.35, 0.06, 8, 32)
  const material = new THREE.MeshStandardMaterial({
    color: DRAWING_COLOR,
    roughness: 0.5,
    metalness: 0.1,
  })
  const torus = new THREE.Mesh(geometry, material)
  torus.position.set(x, 0.05, z)
  torus.rotation.x = -Math.PI / 2
  return torus
}

function create3DArrow(x1: number, z1: number, x2: number, z2: number): THREE.Group {
  const group = new THREE.Group()
  const dx = x2 - x1
  const dz = z2 - z1
  const length = Math.sqrt(dx * dx + dz * dz)
  const angle = Math.atan2(-dx, -dz)

  const arrowHeadLength = 0.45
  const shaftLength = length - arrowHeadLength

  const shaftGeometry = new THREE.CylinderGeometry(0.07, 0.07, shaftLength, 8)
  const shaftMaterial = new THREE.MeshStandardMaterial({
    color: DRAWING_COLOR,
    roughness: 0.5,
    metalness: 0.1,
  })
  const shaft = new THREE.Mesh(shaftGeometry, shaftMaterial)
  shaft.position.set(0, 0, -shaftLength / 2)
  shaft.rotation.x = Math.PI / 2
  group.add(shaft)

  const headGeometry = new THREE.ConeGeometry(0.22, arrowHeadLength, 8)
  const headMaterial = new THREE.MeshStandardMaterial({
    color: DRAWING_COLOR,
    roughness: 0.5,
    metalness: 0.1,
  })
  const head = new THREE.Mesh(headGeometry, headMaterial)
  head.position.set(0, 0, -(shaftLength + arrowHeadLength / 2))
  head.rotation.x = -Math.PI / 2
  group.add(head)

  group.position.set(x1, 0.08, z1)
  group.rotation.y = angle

  return group
}

export function draw3DAnnotations(
  canvasState: Canvas3DState,
  drawingsState: Drawings3DState,
  annotations: DrawAnnotation[]
): void {
  clear3DDrawings(canvasState, drawingsState)

  for (const annotation of annotations) {
    if (annotation.type === AnnotationType.CIRCLE) {
      const coords = squareTo3DCoords(annotation.square)
      const circle = create3DCircle(coords.x, coords.z)
      canvasState.scene.add(circle)
      drawingsState.objects.push(circle)
    } else if (annotation.type === AnnotationType.ARROW) {
      const from = squareTo3DCoords(annotation.from)
      const to = squareTo3DCoords(annotation.to)
      const arrow = create3DArrow(from.x, from.z, to.x, to.z)
      canvasState.scene.add(arrow)
      drawingsState.objects.push(arrow)
    }
  }

  render3D(canvasState)
}

export function clear3DDrawings(
  canvasState: Canvas3DState,
  drawingsState: Drawings3DState
): void {
  for (const obj of drawingsState.objects) {
    canvasState.scene.remove(obj)
    obj.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry?.dispose()
        if (child.material instanceof THREE.Material) {
          child.material.dispose()
        }
      }
    })
  }
  drawingsState.objects = []
}
