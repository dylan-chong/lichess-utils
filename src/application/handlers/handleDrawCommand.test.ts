import { mockModule } from 'simone'
import { describe, it } from 'vitest'
import { AnnotationType } from '../../constants/annotations'
import type { DrawAnnotation } from '../../domain/commands/commandParser'
import { handleDrawCommand } from './handleDrawCommand'

const commandParser = mockModule(import('../../domain/commands/commandParser'))
const annotations = mockModule(import('../../presentation/non-preact-components/annotations'))

describe('handleDrawCommand', () => {
  const mockState = { svg: document.createElementNS('http://www.w3.org/2000/svg', 'svg') }

  it('draws circle and arrow when given valid draw command', () => {
    const parsedAnnotations: DrawAnnotation[] = [
      { type: AnnotationType.CIRCLE, square: 'e4' },
      { type: AnnotationType.ARROW, from: 'e2', to: 'e4' },
    ]

    commandParser.expects('parseDrawCommand').withArgs('-e4,e2e4').returns(parsedAnnotations)

    annotations.expects('drawAnnotations').withArgs(mockState, parsedAnnotations).returns(undefined)

    handleDrawCommand('-e4,e2e4', mockState)
  })

  it('clears annotations when given empty draw command', () => {
    commandParser.expects('parseDrawCommand').withArgs('-').returns([])

    annotations.expects('drawAnnotations').withArgs(mockState, []).returns(undefined)

    handleDrawCommand('-', mockState)
  })
})
