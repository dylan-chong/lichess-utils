import { describe, expect, it } from 'vitest'
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
    expect(geom).toBeDefined()
    expect(geom.attributes.position).toBeDefined()
  })

  it('creates rook geometry', () => {
    const geom = createRookGeometry()
    expect(geom).toBeDefined()
    expect(geom.attributes.position).toBeDefined()
  })

  it('creates knight geometry', () => {
    const geom = createKnightGeometry()
    expect(geom).toBeDefined()
    expect(geom.attributes.position).toBeDefined()
  })

  it('creates bishop geometry', () => {
    const geom = createBishopGeometry()
    expect(geom).toBeDefined()
    expect(geom.attributes.position).toBeDefined()
  })

  it('creates queen geometry', () => {
    const geom = createQueenGeometry()
    expect(geom).toBeDefined()
    expect(geom.attributes.position).toBeDefined()
  })

  it('creates king geometry', () => {
    const geom = createKingGeometry()
    expect(geom).toBeDefined()
    expect(geom.base).toBeDefined()
    expect(geom.base.attributes.position).toBeDefined()
    expect(geom.crossV).toBeDefined()
    expect(geom.crossV.attributes.position).toBeDefined()
    expect(geom.crossH).toBeDefined()
    expect(geom.crossH.attributes.position).toBeDefined()
  })

  it('creates checker geometry', () => {
    const geom = createCheckerGeometry()
    expect(geom).toBeDefined()
    expect(geom.attributes.position).toBeDefined()
  })
})
