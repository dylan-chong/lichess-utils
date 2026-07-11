import { mockModule } from 'simone'
import { describe, expect, it } from 'vitest'

const initMock = mockModule(import('./init'))

describe('main', () => {
  it('should call init on module load', async () => {
    const mockCleanup = () => {}
    initMock.expects('init').withArgs().returns(Promise.resolve(mockCleanup))

    const mainModule = await import('./main')
    expect(typeof mainModule).toBe('object')
  })
})
