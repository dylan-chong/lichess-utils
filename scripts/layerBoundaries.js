"use strict";
/**
 * Layer Architecture Configuration
 *
 * This file defines the layer boundaries for the codebase and their allowed dependencies.
 * The architecture follows a strict layered approach where lower layers cannot depend on higher layers.
 */
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LAYER_DESCRIPTIONS = exports.LAYER_DEPENDENCIES = exports.Layer = void 0;
exports.getLayerFromPath = getLayerFromPath;
exports.isImportAllowed = isImportAllowed;
exports.getViolationMessage = getViolationMessage;
var Layer;
(function (Layer) {
    Layer["PLATFORM"] = "platform";
    Layer["CONSTANTS"] = "constants";
    Layer["DOMAIN"] = "domain";
    Layer["ADAPTERS"] = "adapters";
    Layer["APPLICATION"] = "application";
    Layer["PRESENTATION"] = "presentation";
    // Special cases
    Layer["ROOT"] = "root";
    Layer["TEST_HELPERS"] = "test-helpers";
})(Layer || (exports.Layer = Layer = {}));
/**
 * Maps each layer to the layers it is allowed to import from.
 * Lower layers should only depend on layers at the same level or below.
 */
exports.LAYER_DEPENDENCIES = (_a = {},
    _a[Layer.PLATFORM] = [
        Layer.PLATFORM,
        Layer.CONSTANTS,
    ],
    _a[Layer.CONSTANTS] = [
        Layer.CONSTANTS,
    ],
    _a[Layer.DOMAIN] = [
        Layer.DOMAIN,
        Layer.CONSTANTS,
    ],
    _a[Layer.ADAPTERS] = [
        Layer.ADAPTERS,
        Layer.PLATFORM,
        Layer.DOMAIN,
        Layer.CONSTANTS,
    ],
    _a[Layer.APPLICATION] = [
        Layer.APPLICATION,
        Layer.ADAPTERS,
        Layer.DOMAIN,
        Layer.PLATFORM,
        Layer.CONSTANTS,
    ],
    _a[Layer.PRESENTATION] = [
        Layer.PRESENTATION,
        Layer.APPLICATION,
        Layer.ADAPTERS,
        Layer.DOMAIN,
        Layer.CONSTANTS,
    ],
    _a[Layer.ROOT] = [
        // Root files can import from any layer as they orchestrate everything
        Layer.PRESENTATION,
        Layer.APPLICATION,
        Layer.ADAPTERS,
        Layer.DOMAIN,
        Layer.PLATFORM,
        Layer.CONSTANTS,
    ],
    _a[Layer.TEST_HELPERS] = [
        // Test helpers can import from any layer
        Layer.PRESENTATION,
        Layer.APPLICATION,
        Layer.ADAPTERS,
        Layer.DOMAIN,
        Layer.PLATFORM,
        Layer.CONSTANTS,
        Layer.TEST_HELPERS,
    ],
    _a);
/**
 * Layer descriptions for documentation and error messages
 */
exports.LAYER_DESCRIPTIONS = (_b = {},
    _b[Layer.PLATFORM] = 'Platform - Browser APIs and external dependencies (DOM, Storage, Speech API)',
    _b[Layer.CONSTANTS] = 'Constants - Static configuration and enums',
    _b[Layer.DOMAIN] = 'Domain - Pure business logic with no external dependencies',
    _b[Layer.ADAPTERS] = 'Adapters - Wraps platform APIs with app-specific interfaces',
    _b[Layer.APPLICATION] = 'Application - Orchestrates domain and adapters (services, handlers, observers)',
    _b[Layer.PRESENTATION] = 'Presentation - UI components and rendering',
    _b[Layer.ROOT] = 'Root - Application initialization and entry points',
    _b[Layer.TEST_HELPERS] = 'Test Helpers - Utilities for testing',
    _b);
/**
 * Determines the layer of a file based on its path
 */
function getLayerFromPath(filePath) {
    // Normalize path separators
    var normalized = filePath.replace(/\\/g, '/');
    // Remove leading ./ or src/
    var cleanPath = normalized.replace(/^\.\//, '').replace(/^src\//, '');
    // Test helpers
    if (cleanPath.startsWith('test-helpers/')) {
        return Layer.TEST_HELPERS;
    }
    // Root files (init.tsx, main.tsx in src/)
    if (cleanPath === 'init.tsx' || cleanPath === 'init.ts' ||
        cleanPath === 'main.tsx' || cleanPath === 'main.ts') {
        return Layer.ROOT;
    }
    // Platform layer
    if (cleanPath.startsWith('platform/')) {
        return Layer.PLATFORM;
    }
    // Constants layer
    if (cleanPath.startsWith('constants/')) {
        return Layer.CONSTANTS;
    }
    // Domain layer
    if (cleanPath.startsWith('domain/')) {
        return Layer.DOMAIN;
    }
    // Adapters layer (all adapters-* folders)
    if (cleanPath.startsWith('adapters-')) {
        return Layer.ADAPTERS;
    }
    // Application layer (all application-* folders)
    if (cleanPath.startsWith('application-')) {
        return Layer.APPLICATION;
    }
    // Presentation layer
    if (cleanPath.startsWith('presentation/')) {
        return Layer.PRESENTATION;
    }
    // Unknown layer
    return null;
}
/**
 * Checks if an import from one layer to another is allowed
 */
function isImportAllowed(fromLayer, toLayer) {
    var allowedLayers = exports.LAYER_DEPENDENCIES[fromLayer];
    return allowedLayers.includes(toLayer);
}
/**
 * Gets a human-readable error message for a layer boundary violation
 */
function getViolationMessage(fromLayer, toLayer) {
    return "Layer boundary violation: ".concat(fromLayer, " cannot import from ").concat(toLayer, ". ") +
        "".concat(exports.LAYER_DESCRIPTIONS[fromLayer], " should only import from: ").concat(exports.LAYER_DEPENDENCIES[fromLayer].join(', '));
}
