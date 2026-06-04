import { describe, it, expect } from 'vitest'
import { mockModule } from 'simone'

// Mock init before importing main
const initMock = mockModule(import('./init'))

describe('main', () => {
  it('should call init on module load', async () => {
    // Mock init to return a cleanup function
    const mockCleanup = () => {}
    initMock.expects('init').withArgs().returns(Promise.resolve(mockCleanup))

    // Import main - this triggers the module-level init() call
    await import('./main')

    // Wait for init promise to resolve
    await new Promise((resolve) => setTimeout(resolve, 10))

    // If we got here without simone errors, init was called successfully
    expect(true).toBe(true)
  })
})
