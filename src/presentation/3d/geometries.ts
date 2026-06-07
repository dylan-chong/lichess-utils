import { THREE } from '../../platform/three'

export interface KingGeometry {
  base: THREE.LatheGeometry
  crossV: THREE.BoxGeometry
  crossH: THREE.BoxGeometry
}

export function createPawnGeometry(): THREE.LatheGeometry {
  const points = [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0.35, 0),
    new THREE.Vector2(0.35, 0.05),
    new THREE.Vector2(0.28, 0.1),
    new THREE.Vector2(0.15, 0.35),
    new THREE.Vector2(0.12, 0.45),
    new THREE.Vector2(0.18, 0.55),
    new THREE.Vector2(0.18, 0.6),
    new THREE.Vector2(0.22, 0.65),
    new THREE.Vector2(0.22, 0.85),
    new THREE.Vector2(0, 0.85),
  ]
  return new THREE.LatheGeometry(points, 24)
}

export function createRookGeometry(): THREE.LatheGeometry {
  const points = [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0.4, 0),
    new THREE.Vector2(0.4, 0.08),
    new THREE.Vector2(0.32, 0.12),
    new THREE.Vector2(0.22, 0.2),
    new THREE.Vector2(0.2, 0.7),
    new THREE.Vector2(0.28, 0.75),
    new THREE.Vector2(0.28, 0.85),
    new THREE.Vector2(0.32, 0.85),
    new THREE.Vector2(0.32, 1.0),
    new THREE.Vector2(0, 1.0),
  ]
  return new THREE.LatheGeometry(points, 4)
}

export function createKnightGeometry(): THREE.ExtrudeGeometry {
  const shape = new THREE.Shape()
  shape.moveTo(-0.15, 0)
  shape.lineTo(0.35, 0)
  shape.lineTo(0.35, 0.08)
  shape.lineTo(0.25, 0.12)
  shape.lineTo(0.15, 0.18)
  shape.quadraticCurveTo(0.08, 0.35, 0.1, 0.5)
  shape.quadraticCurveTo(0.15, 0.65, 0.25, 0.75)
  shape.quadraticCurveTo(0.35, 0.85, 0.38, 0.95)
  shape.lineTo(0.42, 1.0)
  shape.lineTo(0.45, 1.08)
  shape.lineTo(0.42, 1.12)
  shape.lineTo(0.35, 1.08)
  shape.quadraticCurveTo(0.25, 1.02, 0.18, 1.08)
  shape.lineTo(0.22, 1.18)
  shape.lineTo(0.18, 1.22)
  shape.lineTo(0.1, 1.15)
  shape.quadraticCurveTo(-0.05, 1.05, -0.15, 1.1)
  shape.quadraticCurveTo(-0.25, 1.12, -0.32, 1.05)
  shape.lineTo(-0.35, 0.95)
  shape.lineTo(-0.3, 0.88)
  shape.lineTo(-0.2, 0.9)
  shape.quadraticCurveTo(-0.1, 0.85, -0.15, 0.75)
  shape.lineTo(-0.25, 0.7)
  shape.lineTo(-0.35, 0.65)
  shape.lineTo(-0.38, 0.55)
  shape.lineTo(-0.32, 0.5)
  shape.lineTo(-0.22, 0.52)
  shape.quadraticCurveTo(-0.12, 0.48, -0.1, 0.38)
  shape.quadraticCurveTo(-0.08, 0.25, -0.15, 0.15)
  shape.lineTo(-0.2, 0.08)
  shape.lineTo(-0.15, 0)

  return new THREE.ExtrudeGeometry(shape, {
    depth: 0.22,
    bevelEnabled: true,
    bevelThickness: 0.04,
    bevelSize: 0.03,
    bevelSegments: 4,
  })
}

export function createBishopGeometry(): THREE.LatheGeometry {
  const points = [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0.38, 0),
    new THREE.Vector2(0.38, 0.06),
    new THREE.Vector2(0.3, 0.1),
    new THREE.Vector2(0.18, 0.25),
    new THREE.Vector2(0.15, 0.4),
    new THREE.Vector2(0.2, 0.5),
    new THREE.Vector2(0.2, 0.55),
    new THREE.Vector2(0.12, 0.7),
    new THREE.Vector2(0.08, 0.95),
    new THREE.Vector2(0.15, 1.05),
    new THREE.Vector2(0.1, 1.15),
    new THREE.Vector2(0.05, 1.2),
    new THREE.Vector2(0, 1.25),
  ]
  return new THREE.LatheGeometry(points, 24)
}

export function createQueenGeometry(): THREE.LatheGeometry {
  const points = [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0.42, 0),
    new THREE.Vector2(0.42, 0.08),
    new THREE.Vector2(0.34, 0.12),
    new THREE.Vector2(0.22, 0.25),
    new THREE.Vector2(0.18, 0.45),
    new THREE.Vector2(0.24, 0.55),
    new THREE.Vector2(0.24, 0.6),
    new THREE.Vector2(0.16, 0.75),
    new THREE.Vector2(0.14, 0.95),
    new THREE.Vector2(0.22, 1.05),
    new THREE.Vector2(0.28, 1.15),
    new THREE.Vector2(0.22, 1.25),
    new THREE.Vector2(0.15, 1.3),
    new THREE.Vector2(0.08, 1.35),
    new THREE.Vector2(0, 1.35),
  ]
  return new THREE.LatheGeometry(points, 8)
}

export function createKingGeometry(): KingGeometry {
  const basePoints = [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0.44, 0),
    new THREE.Vector2(0.44, 0.08),
    new THREE.Vector2(0.36, 0.12),
    new THREE.Vector2(0.24, 0.28),
    new THREE.Vector2(0.2, 0.5),
    new THREE.Vector2(0.26, 0.6),
    new THREE.Vector2(0.26, 0.65),
    new THREE.Vector2(0.18, 0.8),
    new THREE.Vector2(0.16, 1.0),
    new THREE.Vector2(0.24, 1.1),
    new THREE.Vector2(0.24, 1.2),
    new THREE.Vector2(0.18, 1.25),
    new THREE.Vector2(0.18, 1.3),
    new THREE.Vector2(0, 1.3),
  ]

  return {
    base: new THREE.LatheGeometry(basePoints, 24),
    crossV: new THREE.BoxGeometry(0.08, 0.25, 0.08),
    crossH: new THREE.BoxGeometry(0.2, 0.08, 0.08),
  }
}

export function createCheckerGeometry(): THREE.CylinderGeometry {
  return new THREE.CylinderGeometry(0.4, 0.4, 0.15, 32)
}
