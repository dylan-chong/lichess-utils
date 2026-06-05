import { describe, expect, it } from 'vitest'

// Note: Full 3D canvas tests require WebGL which is not available in test environment.
// These tests verify the module structure and types are correct.
// Integration tests should be done in a browser environment.

describe('canvas module', () => {
  it('exports create3DCanvas function', async () => {
    const canvasModule = await import('./canvas')
    expect(typeof canvasModule.create3DCanvas).toBe('function')
  })

  it('exports render3D function', async () => {
    const canvasModule = await import('./canvas')
    expect(typeof canvasModule.render3D).toBe('function')
  })

  it('exports resize3DCanvas function', async () => {
    const canvasModule = await import('./canvas')
    expect(typeof canvasModule.resize3DCanvas).toBe('function')
  })

  it('exports destroy3DCanvas function', async () => {
    const canvasModule = await import('./canvas')
    expect(typeof canvasModule.destroy3DCanvas).toBe('function')
  })
})
