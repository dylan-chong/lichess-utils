import { DomSelector } from '../../constants/dom'
import { appendChild, querySelector } from '../../platform/dom'
import {
  THREE,
  createAmbientLight,
  createDirectionalLight,
  createPerspectiveCamera,
  createScene,
  createWebGLRenderer,
} from '../../platform/three'

export interface Canvas3DState {
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  renderer: THREE.WebGLRenderer
  canvasElement: HTMLCanvasElement
}

export function create3DCanvas(): Canvas3DState {
  const container = querySelector(DomSelector.CONTAINER)
  const board = querySelector(DomSelector.BOARD)

  if (!container || !board) {
    throw new Error('Container or board not found')
  }

  const boardSize = board.getBoundingClientRect().width

  // Create scene
  const scene = createScene()
  scene.background = null

  // Create camera
  const fov = 45
  const aspect = 1
  const camera = createPerspectiveCamera(fov, aspect, 0.1, 1000)
  camera.position.set(0, 12, 8)
  camera.up.set(0, 0, -1)
  camera.lookAt(0, 0, 0)

  // Create renderer
  const renderer = createWebGLRenderer({ alpha: true, antialias: true })
  renderer.setSize(boardSize, boardSize)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap

  // Setup canvas element
  const canvasElement = renderer.domElement
  canvasElement.style.position = 'absolute'
  canvasElement.style.top = '0'
  canvasElement.style.left = '0'
  canvasElement.style.pointerEvents = 'none'
  canvasElement.style.zIndex = '100'
  canvasElement.classList.add('userscript-3d-canvas')

  appendChild(container, canvasElement)

  // Add lighting
  const ambientLight = createAmbientLight(0xffffff, 0.6)
  scene.add(ambientLight)

  const directionalLight = createDirectionalLight(0xffffff, 0.8)
  directionalLight.position.set(5, 15, 8)
  directionalLight.castShadow = true
  directionalLight.shadow.mapSize.width = 1024
  directionalLight.shadow.mapSize.height = 1024
  scene.add(directionalLight)

  const fillLight = createDirectionalLight(0xffffff, 0.3)
  fillLight.position.set(-5, 10, -5)
  scene.add(fillLight)

  return {
    scene,
    camera,
    renderer,
    canvasElement,
  }
}

export function render3D(state: Canvas3DState): void {
  state.renderer.render(state.scene, state.camera)
}

export function resize3DCanvas(state: Canvas3DState): void {
  const board = querySelector(DomSelector.BOARD)
  if (!board) return

  const boardSize = board.getBoundingClientRect().width
  state.renderer.setSize(boardSize, boardSize)
  render3D(state)
}

export function destroy3DCanvas(state: Canvas3DState): void {
  state.canvasElement.remove()
  state.renderer.dispose()

  // Cleanup scene objects
  state.scene.traverse((object) => {
    if (object instanceof THREE.Mesh) {
      object.geometry.dispose()
      if (object.material instanceof THREE.Material) {
        object.material.dispose()
      } else if (Array.isArray(object.material)) {
        for (const material of object.material) {
          material.dispose()
        }
      }
    }
  })
}
