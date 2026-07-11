import { describe, expect, it } from 'vitest'
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

describe('geometries', () => {
  it('creates pawn geometry', () => {
    const geom = createPawnGeometry()
    expect(geom).toBeInstanceOf(THREE.BufferGeometry)
    expect(geom.attributes.position).toBeInstanceOf(THREE.BufferAttribute)
  })

  it('creates rook geometry', () => {
    const geom = createRookGeometry()
    expect(geom).toBeInstanceOf(THREE.BufferGeometry)
    expect(geom.attributes.position).toBeInstanceOf(THREE.BufferAttribute)
  })

  it('creates knight geometry', () => {
    const geom = createKnightGeometry()
    expect(geom).toBeInstanceOf(THREE.BufferGeometry)
    expect(geom.attributes.position).toBeInstanceOf(THREE.BufferAttribute)
  })

  it('creates bishop geometry', () => {
    const geom = createBishopGeometry()
    expect(geom).toBeInstanceOf(THREE.BufferGeometry)
    expect(geom.attributes.position).toBeInstanceOf(THREE.BufferAttribute)
  })

  it('creates queen geometry', () => {
    const geom = createQueenGeometry()
    expect(geom).toBeInstanceOf(THREE.BufferGeometry)
    expect(geom.attributes.position).toBeInstanceOf(THREE.BufferAttribute)
  })

  it('creates king geometry', () => {
    const geom = createKingGeometry()
    expect(geom.base).toBeInstanceOf(THREE.BufferGeometry)
    expect(geom.base.attributes.position).toBeInstanceOf(THREE.BufferAttribute)
    expect(geom.crossV).toBeInstanceOf(THREE.BufferGeometry)
    expect(geom.crossV.attributes.position).toBeInstanceOf(THREE.BufferAttribute)
    expect(geom.crossH).toBeInstanceOf(THREE.BufferGeometry)
    expect(geom.crossH.attributes.position).toBeInstanceOf(THREE.BufferAttribute)
  })

  it('creates checker geometry', () => {
    const geom = createCheckerGeometry()
    expect(geom).toBeInstanceOf(THREE.BufferGeometry)
    expect(geom.attributes.position).toBeInstanceOf(THREE.BufferAttribute)
  })
})
