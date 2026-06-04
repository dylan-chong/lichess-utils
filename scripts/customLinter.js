#!/usr/bin/env ts-node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var glob_1 = require("glob");
var layerBoundaries_1 = require("./layerBoundaries");
var VAGUE_TEST_PATTERNS = [
    /it\s*\(\s*['"`].*\b(should handle|handles)\b/i,
    /it\s*\(\s*['"`].*\b(should work|works)\b/i,
    /it\s*\(\s*['"`].*\b(should process|processes)\b/i,
];
var DISALLOWED_MOCK_PATTERNS = [
    { pattern: /\bvi\.stub/i, message: 'Use simone mockModule() instead of vi.stub. Wrap globals, object instance methods, and constructors in modules like src/dom/dom.ts' },
    { pattern: /\bvi\.mock/i, message: 'Use simone mockModule() instead of vi.mock. Wrap globals, object instance methods, and constructors in modules like src/dom/dom.ts' },
    { pattern: /\bvi\.spyOn/i, message: 'Use simone mockModule() instead of vi.spyOn. Wrap globals, object instance methods, and constructors in modules like src/dom/dom.ts' },
];
function checkVagueTestDescriptions(content, filePath) {
    var errors = [];
    var lines = content.split('\n');
    lines.forEach(function (line, index) {
        for (var _i = 0, VAGUE_TEST_PATTERNS_1 = VAGUE_TEST_PATTERNS; _i < VAGUE_TEST_PATTERNS_1.length; _i++) {
            var pattern = VAGUE_TEST_PATTERNS_1[_i];
            if (pattern.test(line)) {
                errors.push({
                    file: filePath,
                    line: index + 1,
                    message: 'Tests should describe the expected observable behaviour, not implementation details or vague actions',
                });
                break;
            }
        }
    });
    return errors;
}
function checkDisallowedMockingPatterns(content, filePath) {
    var errors = [];
    var lines = content.split('\n');
    lines.forEach(function (line, index) {
        for (var _i = 0, DISALLOWED_MOCK_PATTERNS_1 = DISALLOWED_MOCK_PATTERNS; _i < DISALLOWED_MOCK_PATTERNS_1.length; _i++) {
            var _a = DISALLOWED_MOCK_PATTERNS_1[_i], pattern = _a.pattern, message = _a.message;
            if (pattern.test(line)) {
                errors.push({
                    file: filePath,
                    line: index + 1,
                    message: message,
                });
            }
        }
    });
    return errors;
}
function checkLayerBoundaries(content, filePath) {
    var errors = [];
    var lines = content.split('\n');
    // Determine the layer of the current file
    var fromLayer = (0, layerBoundaries_1.getLayerFromPath)(filePath);
    if (!fromLayer) {
        // Skip files that don't belong to a known layer
        return errors;
    }
    // Regular expressions to match import statements
    var importPatterns = [
        /import\s+.*?\s+from\s+['"](.+?)['"]/, // import X from 'path'
        /import\s+['"](.+?)['"]/, // import 'path'
        /export\s+.*?\s+from\s+['"](.+?)['"]/, // export X from 'path'
    ];
    lines.forEach(function (line, index) {
        for (var _i = 0, importPatterns_1 = importPatterns; _i < importPatterns_1.length; _i++) {
            var pattern = importPatterns_1[_i];
            var match = pattern.exec(line);
            if (!match)
                continue;
            var importPath = match[1];
            // Skip external packages (not relative imports)
            if (!importPath.startsWith('.') && !importPath.startsWith('/')) {
                continue;
            }
            // Resolve the absolute path of the imported file
            var fileDir = path.dirname(filePath);
            var resolvedPath = path.resolve(fileDir, importPath);
            // Get the layer of the imported file
            var toLayer = (0, layerBoundaries_1.getLayerFromPath)(resolvedPath);
            if (!toLayer) {
                // Skip if we can't determine the layer
                continue;
            }
            // Check if this import is allowed
            if (!(0, layerBoundaries_1.isImportAllowed)(fromLayer, toLayer)) {
                errors.push({
                    file: filePath,
                    line: index + 1,
                    message: (0, layerBoundaries_1.getViolationMessage)(fromLayer, toLayer),
                });
            }
        }
    });
    return errors;
}
function lintFile(filePath) {
    var errors = [];
    var content = fs.readFileSync(filePath, 'utf-8');
    // Apply all lint rules
    errors.push.apply(errors, checkVagueTestDescriptions(content, filePath));
    errors.push.apply(errors, checkDisallowedMockingPatterns(content, filePath));
    errors.push.apply(errors, checkLayerBoundaries(content, filePath));
    return errors;
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var allFiles, testFiles, totalErrors, allErrors, _i, allFiles_1, file, content, _a, testFiles_1, file, content, _b, allErrors_1, error;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, (0, glob_1.glob)('src/**/*.{ts,tsx}', { cwd: process.cwd() })
                    // Lint test files for test-specific rules
                ];
                case 1:
                    allFiles = _c.sent();
                    return [4 /*yield*/, (0, glob_1.glob)('src/**/*.test.{ts,tsx}', { cwd: process.cwd() })];
                case 2:
                    testFiles = _c.sent();
                    totalErrors = 0;
                    allErrors = [];
                    // Check all files for layer boundaries
                    for (_i = 0, allFiles_1 = allFiles; _i < allFiles_1.length; _i++) {
                        file = allFiles_1[_i];
                        content = fs.readFileSync(file, 'utf-8');
                        allErrors.push.apply(allErrors, checkLayerBoundaries(content, file));
                    }
                    // Check test files for test-specific rules
                    for (_a = 0, testFiles_1 = testFiles; _a < testFiles_1.length; _a++) {
                        file = testFiles_1[_a];
                        content = fs.readFileSync(file, 'utf-8');
                        allErrors.push.apply(allErrors, checkVagueTestDescriptions(content, file));
                        allErrors.push.apply(allErrors, checkDisallowedMockingPatterns(content, file));
                    }
                    totalErrors = allErrors.length;
                    if (allErrors.length > 0) {
                        console.error('\n❌ Custom lint errors found:\n');
                        for (_b = 0, allErrors_1 = allErrors; _b < allErrors_1.length; _b++) {
                            error = allErrors_1[_b];
                            console.error("".concat(error.file, ":").concat(error.line));
                            console.error("  ".concat(error.message));
                            console.error();
                        }
                        console.error("Found ".concat(totalErrors, " lint error(s)"));
                        process.exit(1);
                    }
                    console.log('✅ No custom lint errors found');
                    return [2 /*return*/];
            }
        });
    });
}
main().catch(function (error) {
    console.error('Error running custom linter:', error);
    process.exit(1);
});
