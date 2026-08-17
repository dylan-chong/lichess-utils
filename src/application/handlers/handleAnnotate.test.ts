import { mockModule } from 'simone'
import { describe, expect, it } from 'vitest'
import { handleAnnotate } from './handleAnnotate'

const dom = mockModule(import('../../platform/dom'))

describe('handleAnnotate', () => {
  it('sets the input value to an example annotation', () => {
    const mockInput = document.createElement('input') as HTMLInputElement
    document.body.appendChild(mockInput)
    dom.expects('querySelector').withArgs('.keyboard-move input').returns(mockInput)

    handleAnnotate()

    expect(mockInput.value).toBe('-f7e5,e4')
    expect(document.activeElement).toBe(mockInput)
    document.body.removeChild(mockInput)
  })

  it('does nothing when keyboard input is not found', () => {
    dom.expects('querySelector').withArgs('.keyboard-move input').returns(null)

    handleAnnotate()
  })
})
