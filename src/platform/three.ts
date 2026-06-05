import * as THREE from 'three'

export function createWebGLRenderer(options: THREE.WebGLRendererParameters): THREE.WebGLRenderer {
  return new THREE.WebGLRenderer(options)
}

export function createScene(): THREE.Scene {
  return new THREE.Scene()
}

export function createPerspectiveCamera(
  fov: number,
  aspect: number,
  near: number,
  far: number
): THREE.PerspectiveCamera {
  return new THREE.PerspectiveCamera(fov, aspect, near, far)
}

export function createAmbientLight(color: number, intensity: number): THREE.AmbientLight {
  return new THREE.AmbientLight(color, intensity)
}

export function createDirectionalLight(color: number, intensity: number): THREE.DirectionalLight {
  return new THREE.DirectionalLight(color, intensity)
}

export { THREE }
