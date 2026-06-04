/**
 * Layer Architecture Configuration
 *
 * This file defines the layer boundaries for the codebase and their allowed dependencies.
 * The architecture follows a strict layered approach where lower layers cannot depend on higher layers.
 */

export enum Layer {
  PLATFORM = 'platform',
  CONSTANTS = 'constants',
  DOMAIN = 'domain',
  ADAPTERS = 'adapters',
  APPLICATION = 'application',
  PRESENTATION = 'presentation',
  // Special cases
  ROOT = 'root',  // Files in src/ root (init.tsx, main.tsx)
  TEST_HELPERS = 'test-helpers',
}

/**
 * Maps each layer to the layers it is allowed to import from.
 * Lower layers should only depend on layers at the same level or below.
 */
export const LAYER_DEPENDENCIES: Record<Layer, Layer[]> = {
  [Layer.PLATFORM]: [
    Layer.PLATFORM,
    Layer.CONSTANTS,
  ],
  [Layer.CONSTANTS]: [
    Layer.CONSTANTS,
  ],
  [Layer.DOMAIN]: [
    Layer.DOMAIN,
    Layer.CONSTANTS,
  ],
  [Layer.ADAPTERS]: [
    Layer.ADAPTERS,
    Layer.PLATFORM,
    Layer.DOMAIN,
    Layer.CONSTANTS,
  ],
  [Layer.APPLICATION]: [
    Layer.APPLICATION,
    Layer.ADAPTERS,
    Layer.DOMAIN,
    Layer.PLATFORM,
    Layer.CONSTANTS,
  ],
  [Layer.PRESENTATION]: [
    Layer.PRESENTATION,
    Layer.APPLICATION,
    Layer.ADAPTERS,
    Layer.DOMAIN,
    Layer.CONSTANTS,
  ],
  [Layer.ROOT]: [
    // Root files can import from any layer as they orchestrate everything
    Layer.PRESENTATION,
    Layer.APPLICATION,
    Layer.ADAPTERS,
    Layer.DOMAIN,
    Layer.PLATFORM,
    Layer.CONSTANTS,
  ],
  [Layer.TEST_HELPERS]: [
    // Test helpers can import from any layer
    Layer.PRESENTATION,
    Layer.APPLICATION,
    Layer.ADAPTERS,
    Layer.DOMAIN,
    Layer.PLATFORM,
    Layer.CONSTANTS,
    Layer.TEST_HELPERS,
  ],
}

/**
 * Layer descriptions for documentation and error messages
 */
export const LAYER_DESCRIPTIONS: Record<Layer, string> = {
  [Layer.PLATFORM]: 'Platform - Browser APIs and external dependencies (DOM, Storage, Speech API)',
  [Layer.CONSTANTS]: 'Constants - Static configuration and enums',
  [Layer.DOMAIN]: 'Domain - Pure business logic with no external dependencies',
  [Layer.ADAPTERS]: 'Adapters - Wraps platform APIs with app-specific interfaces',
  [Layer.APPLICATION]: 'Application - Orchestrates domain and adapters (services, handlers, observers)',
  [Layer.PRESENTATION]: 'Presentation - UI components and rendering',
  [Layer.ROOT]: 'Root - Application initialization and entry points',
  [Layer.TEST_HELPERS]: 'Test Helpers - Utilities for testing',
}

/**
 * Determines the layer of a file based on its path
 */
export function getLayerFromPath(filePath: string): Layer | null {
  // Normalize path separators
  const normalized = filePath.replace(/\\/g, '/')

  // Remove leading ./ or src/
  const cleanPath = normalized.replace(/^\.\//, '').replace(/^src\//, '')

  // Test helpers
  if (cleanPath.startsWith('test-helpers/')) {
    return Layer.TEST_HELPERS
  }

  // Root files (init.tsx, main.tsx in src/)
  if (cleanPath === 'init.tsx' || cleanPath === 'init.ts' ||
      cleanPath === 'main.tsx' || cleanPath === 'main.ts') {
    return Layer.ROOT
  }

  // Platform layer
  if (cleanPath.startsWith('platform/')) {
    return Layer.PLATFORM
  }

  // Constants layer
  if (cleanPath.startsWith('constants/')) {
    return Layer.CONSTANTS
  }

  // Domain layer
  if (cleanPath.startsWith('domain/')) {
    return Layer.DOMAIN
  }

  // Adapters layer (all adapters-* folders)
  if (cleanPath.startsWith('adapters-')) {
    return Layer.ADAPTERS
  }

  // Application layer (all application-* folders)
  if (cleanPath.startsWith('application-')) {
    return Layer.APPLICATION
  }

  // Presentation layer
  if (cleanPath.startsWith('presentation/')) {
    return Layer.PRESENTATION
  }

  // Unknown layer
  return null
}

/**
 * Checks if an import from one layer to another is allowed
 */
export function isImportAllowed(fromLayer: Layer, toLayer: Layer): boolean {
  const allowedLayers = LAYER_DEPENDENCIES[fromLayer]
  return allowedLayers.includes(toLayer)
}

/**
 * Gets a human-readable error message for a layer boundary violation
 */
export function getViolationMessage(fromLayer: Layer, toLayer: Layer): string {
  return `Layer boundary violation: ${fromLayer} cannot import from ${toLayer}. ` +
    `${LAYER_DESCRIPTIONS[fromLayer]} should only import from: ${LAYER_DEPENDENCIES[fromLayer].join(', ')}`
}
