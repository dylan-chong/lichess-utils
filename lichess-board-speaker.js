// ==UserScript==
// @name        lichess-board-speaker
// @description This is your new file, start writing code
// @match       *://lichess.org/*
// @require     https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js
// @grant          none
// @inject-into    content
// ==/UserScript==

// Example board from lichess puzzle page
// <cg-container style="width: 156px; height: 156px;">
//     <cg-board>
//         <square class="last-move" style="transform: translate(39px, 39px);"></square>
//         <square class="last-move" style="transform: translate(58.5px, 19.5px);"></square>
//         <piece class="black rook" style="transform: translate(136.5px, 136.5px);"></piece>
//         <piece class="black bishop" style="transform: translate(39px, 136.5px);"></piece>
//         <piece class="white rook" style="transform: translate(19.5px, 136.5px);"></piece>
//         <piece class="black king" style="transform: translate(58.5px, 117px);"></piece>
//         <piece class="black pawn" style="transform: translate(136.5px, 97.5px);"></piece>
//         <piece class="black pawn" style="transform: translate(39px, 97.5px);"></piece>
//         <piece class="white queen" style="transform: translate(19.5px, 97.5px);"></piece>
//         <piece class="black bishop" style="transform: translate(117px, 78px);"></piece>
//         <piece class="black pawn" style="transform: translate(97.5px, 78px);"></piece>
//         <piece class="black pawn" style="transform: translate(58.5px, 78px);"></piece>
//         <piece class="black pawn" style="transform: translate(78px, 58.5px);"></piece>
//         <piece class="white pawn" style="transform: translate(58.5px, 58.5px);"></piece>
//         <piece class="white rook" style="transform: translate(19.5px, 39px);"></piece>
//         <piece class="white pawn" style="transform: translate(97.5px, 19.5px);"></piece>
//         <piece class="white bishop" style="transform: translate(78px, 19.5px);"></piece>
//         <piece class="white king" style="transform: translate(39px, 39px);"></piece>
//         <piece class="white pawn" style="transform: translate(39px, 19.5px);"></piece>
//         <piece class="white pawn" style="transform: translate(19.5px, 19.5px);"></piece>
//         <piece class="black queen" style="transform: translate(136.5px, 0px);"></piece>
//         <piece class="white knight" style="transform: translate(19.5px, 0px);"></piece>
//     </cg-board>
// </cg-container>

(function() {
  const SILENT_PAUSE = '... wait ...';
  const SPEAK_RATES = [
    0.2,
    0.5,
    0.7,
    1.0,
    1.1,
    1.2,
  ]
  const SPEAK_RATE_COMMAND = 'sr';
  let currentSpeakRateIndex = 1;

  const PARALLAX_ANGLES = [0, 20, 40, 50, 60, 65, 70, 80];
  const PARALLAX_COMMAND = 'px';
  let currentParallaxIndex = 0;

  const DIVIDERS_COMMAND = 'div';
  let dividersEnabled = false;

  const BLUR_LEVELS = [0, 3, 4, 6, 8];
  const BLUR_COMMAND = 'blur';
  let currentBlurIndex = 0;

  const PIECE_STYLES = ['default', 'checker', 'checker-grey', '3d'];
  const PIECE_STYLE_COMMAND = 'ps';
  let currentPieceStyleIndex = 0;

  let threeJsLoaded = false;
  let canvasRenderer = null;
  let canvasScene = null;
  let canvasCamera = null;
  let canvasElement = null;
  let piecesMeshes = [];
  let canvasAnimationId = null;
  let lastFrameTime = 0;
  const TARGET_FPS = 30;
  const FRAME_INTERVAL_MS = 1000 / TARGET_FPS;

  function loadThreeJs() {
    return new Promise((resolve, reject) => {
      if (threeJsLoaded) {
        resolve();
        return;
      }
      console.debug('[lichess-board-speaker] Checking for THREE...', typeof THREE);
      if (typeof THREE !== 'undefined') {
        threeJsLoaded = true;
        console.debug('[lichess-board-speaker] Three.js available via @require, version:', THREE.REVISION);
        resolve();
        return;
      }
      console.error('[lichess-board-speaker] THREE is not defined. Make sure to reinstall the userscript for @require to take effect.');
      reject(new Error('Three.js not available - ensure @require directive is present in userscript header'));
    });
  }

  function createPawnGeometry() {
    const points = [];
    points.push(new THREE.Vector2(0, 0));
    points.push(new THREE.Vector2(0.35, 0));
    points.push(new THREE.Vector2(0.35, 0.05));
    points.push(new THREE.Vector2(0.28, 0.1));
    points.push(new THREE.Vector2(0.15, 0.35));
    points.push(new THREE.Vector2(0.12, 0.45));
    points.push(new THREE.Vector2(0.18, 0.55));
    points.push(new THREE.Vector2(0.18, 0.6));
    points.push(new THREE.Vector2(0.22, 0.65));
    points.push(new THREE.Vector2(0.22, 0.85));
    points.push(new THREE.Vector2(0, 0.85));
    return new THREE.LatheGeometry(points, 24);
  }

  function createRookGeometry() {
    const points = [];
    points.push(new THREE.Vector2(0, 0));
    points.push(new THREE.Vector2(0.4, 0));
    points.push(new THREE.Vector2(0.4, 0.08));
    points.push(new THREE.Vector2(0.32, 0.12));
    points.push(new THREE.Vector2(0.22, 0.2));
    points.push(new THREE.Vector2(0.2, 0.7));
    points.push(new THREE.Vector2(0.28, 0.75));
    points.push(new THREE.Vector2(0.28, 0.85));
    points.push(new THREE.Vector2(0.32, 0.85));
    points.push(new THREE.Vector2(0.32, 1.0));
    points.push(new THREE.Vector2(0, 1.0));
    return new THREE.LatheGeometry(points, 4);
  }

  function createKnightGeometry() {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0.5, 0);
    shape.lineTo(0.5, 0.15);
    shape.lineTo(0.35, 0.2);
    shape.lineTo(0.25, 0.4);
    shape.lineTo(0.35, 0.6);
    shape.lineTo(0.5, 0.75);
    shape.lineTo(0.55, 1.0);
    shape.lineTo(0.4, 1.15);
    shape.lineTo(0.15, 1.2);
    shape.lineTo(-0.1, 1.1);
    shape.lineTo(-0.15, 0.9);
    shape.lineTo(-0.1, 0.7);
    shape.lineTo(0.05, 0.5);
    shape.lineTo(0.0, 0.3);
    shape.lineTo(-0.1, 0.15);
    shape.lineTo(0, 0);
    const extrudeSettings = { depth: 0.25, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.03, bevelSegments: 3 };
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }

  function createBishopGeometry() {
    const points = [];
    points.push(new THREE.Vector2(0, 0));
    points.push(new THREE.Vector2(0.38, 0));
    points.push(new THREE.Vector2(0.38, 0.06));
    points.push(new THREE.Vector2(0.3, 0.1));
    points.push(new THREE.Vector2(0.18, 0.25));
    points.push(new THREE.Vector2(0.15, 0.4));
    points.push(new THREE.Vector2(0.2, 0.5));
    points.push(new THREE.Vector2(0.2, 0.55));
    points.push(new THREE.Vector2(0.12, 0.7));
    points.push(new THREE.Vector2(0.08, 0.95));
    points.push(new THREE.Vector2(0.15, 1.05));
    points.push(new THREE.Vector2(0.1, 1.15));
    points.push(new THREE.Vector2(0.05, 1.2));
    points.push(new THREE.Vector2(0, 1.25));
    return new THREE.LatheGeometry(points, 24);
  }

  function createQueenGeometry() {
    const points = [];
    points.push(new THREE.Vector2(0, 0));
    points.push(new THREE.Vector2(0.42, 0));
    points.push(new THREE.Vector2(0.42, 0.08));
    points.push(new THREE.Vector2(0.34, 0.12));
    points.push(new THREE.Vector2(0.22, 0.25));
    points.push(new THREE.Vector2(0.18, 0.45));
    points.push(new THREE.Vector2(0.24, 0.55));
    points.push(new THREE.Vector2(0.24, 0.6));
    points.push(new THREE.Vector2(0.16, 0.75));
    points.push(new THREE.Vector2(0.14, 0.95));
    points.push(new THREE.Vector2(0.22, 1.05));
    points.push(new THREE.Vector2(0.28, 1.15));
    points.push(new THREE.Vector2(0.22, 1.25));
    points.push(new THREE.Vector2(0.15, 1.3));
    points.push(new THREE.Vector2(0.08, 1.35));
    points.push(new THREE.Vector2(0, 1.35));
    return new THREE.LatheGeometry(points, 8);
  }

  function createKingGeometry() {
    const points = [];
    points.push(new THREE.Vector2(0, 0));
    points.push(new THREE.Vector2(0.44, 0));
    points.push(new THREE.Vector2(0.44, 0.08));
    points.push(new THREE.Vector2(0.36, 0.12));
    points.push(new THREE.Vector2(0.24, 0.28));
    points.push(new THREE.Vector2(0.2, 0.5));
    points.push(new THREE.Vector2(0.26, 0.6));
    points.push(new THREE.Vector2(0.26, 0.65));
    points.push(new THREE.Vector2(0.18, 0.8));
    points.push(new THREE.Vector2(0.16, 1.0));
    points.push(new THREE.Vector2(0.24, 1.1));
    points.push(new THREE.Vector2(0.24, 1.2));
    points.push(new THREE.Vector2(0.18, 1.25));
    points.push(new THREE.Vector2(0.18, 1.3));
    points.push(new THREE.Vector2(0, 1.3));
    const baseGeometry = new THREE.LatheGeometry(points, 24);
    const crossVertical = new THREE.BoxGeometry(0.08, 0.25, 0.08);
    const crossHorizontal = new THREE.BoxGeometry(0.2, 0.08, 0.08);
    return { base: baseGeometry, crossV: crossVertical, crossH: crossHorizontal };
  }

  function createCheckerGeometry() {
    const geometry = new THREE.CylinderGeometry(0.4, 0.4, 0.15, 32);
    return geometry;
  }

  function getPieceMaterial(isWhite, style) {
    let color;
    if (style === 'checker-grey') {
      color = 0x505050;
    } else if (style === 'checker') {
      color = isWhite ? 0xe8e8e8 : 0x1a1a1a;
    } else {
      color = isWhite ? 0xf5f5dc : 0x2d2d2d;
    }
    return new THREE.MeshStandardMaterial({
      color: color,
      roughness: 0.4,
      metalness: 0.1,
    });
  }

  function createPieceMesh(pieceType, isWhite, style) {
    const material = getPieceMaterial(isWhite, style);
    let mesh;

    if (style === 'checker' || style === 'checker-grey') {
      const geometry = createCheckerGeometry();
      mesh = new THREE.Mesh(geometry, material);
      mesh.position.y = 0.075;
      return mesh;
    }

    if (pieceType === 'pawn') {
      const geometry = createPawnGeometry();
      mesh = new THREE.Mesh(geometry, material);
    } else if (pieceType === 'rook') {
      const geometry = createRookGeometry();
      mesh = new THREE.Mesh(geometry, material);
    } else if (pieceType === 'knight') {
      const geometry = createKnightGeometry();
      mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.y = isWhite ? -Math.PI / 2 : Math.PI / 2;
      mesh.position.x = isWhite ? 0.125 : -0.125;
    } else if (pieceType === 'bishop') {
      const geometry = createBishopGeometry();
      mesh = new THREE.Mesh(geometry, material);
    } else if (pieceType === 'queen') {
      const geometry = createQueenGeometry();
      mesh = new THREE.Mesh(geometry, material);
    } else if (pieceType === 'king') {
      const geometries = createKingGeometry();
      const group = new THREE.Group();
      const baseMesh = new THREE.Mesh(geometries.base, material);
      group.add(baseMesh);
      const crossVMesh = new THREE.Mesh(geometries.crossV, material);
      crossVMesh.position.y = 1.42;
      group.add(crossVMesh);
      const crossHMesh = new THREE.Mesh(geometries.crossH, material);
      crossHMesh.position.y = 1.38;
      group.add(crossHMesh);
      mesh = group;
    }

    return mesh;
  }

  function setup3DCanvas() {
    const container = document.querySelector('cg-container');
    const board = document.querySelector('cg-board:not(.userscript-custom-board)');
    if (!container || !board) {
      console.error('[lichess-board-speaker] setup3DCanvas: container or board not found', { container, board });
      return null;
    }

    const boardSize = board.offsetWidth;
    console.debug('[lichess-board-speaker] Board size:', boardSize);

    const containerStyle = window.getComputedStyle(container);
    if (containerStyle.position === 'static') {
      container.style.position = 'relative';
    }

    canvasScene = new THREE.Scene();
    canvasScene.background = null;

    const fov = 45;
    const aspect = 1;
    canvasCamera = new THREE.PerspectiveCamera(fov, aspect, 0.1, 1000);
    canvasCamera.position.set(0, 12, 8);
    canvasCamera.up.set(0, 0, -1);
    canvasCamera.lookAt(0, 0, 0);

    canvasRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    canvasRenderer.setSize(boardSize, boardSize);
    canvasRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvasRenderer.shadowMap.enabled = true;
    canvasRenderer.shadowMap.type = THREE.PCFSoftShadowMap;

    canvasElement = canvasRenderer.domElement;
    canvasElement.style.position = 'absolute';
    canvasElement.style.top = '0';
    canvasElement.style.left = '0';
    canvasElement.style.pointerEvents = 'none';
    canvasElement.style.zIndex = '100';
    canvasElement.classList.add('userscript-3d-canvas');

    container.appendChild(canvasElement);
    console.debug('[lichess-board-speaker] Canvas appended to container');

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    canvasScene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 15, 8);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    canvasScene.add(directionalLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(-5, 10, -5);
    canvasScene.add(fillLight);

    console.debug('[lichess-board-speaker] 3D canvas setup complete');
    return { scene: canvasScene, camera: canvasCamera, renderer: canvasRenderer };
  }

  function boardPositionTo3D(col, row, isFlipped) {
    let x, z;
    if (isFlipped) {
      x = (8 - col) - 4 + 0.5;
      z = (row - 1) - 4 + 0.5;
    } else {
      x = (col - 1) - 4 + 0.5;
      z = (8 - row) - 4 + 0.5;
    }
    return { x, z };
  }

  function createBoardPlane() {
    const geometry = new THREE.PlaneGeometry(8, 8);
    const darkMaterial = new THREE.MeshBasicMaterial({ color: 0x769656 });
    const lightMaterial = new THREE.MeshBasicMaterial({ color: 0xeeeed2 });

    const boardGroup = new THREE.Group();

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const squareGeom = new THREE.PlaneGeometry(1, 1);
        const isLight = (row + col) % 2 === 0;
        const square = new THREE.Mesh(squareGeom, isLight ? lightMaterial : darkMaterial);
        square.position.set(col - 3.5, 0, row - 3.5);
        square.rotation.x = -Math.PI / 2;
        boardGroup.add(square);
      }
    }

    return boardGroup;
  }

  function update3DPieces() {
    if (!canvasScene || !threeJsLoaded) return;

    piecesMeshes.forEach(mesh => {
      canvasScene.remove(mesh);
      if (mesh.geometry) mesh.geometry.dispose();
      if (mesh.material) mesh.material.dispose();
    });
    piecesMeshes = [];

    const existingBoard = canvasScene.getObjectByName('boardPlane');
    if (!existingBoard) {
      const boardPlane = createBoardPlane();
      boardPlane.name = 'boardPlane';
      canvasScene.add(boardPlane);
      console.debug('[lichess-board-speaker] Added board plane to scene');
    }

    const playerIsWhite = isPlayerWhite();
    const pieces = getPiecePositions(playerIsWhite);
    const isFlipped = !playerIsWhite;
    const pieceStyle = obfuscationsEnabled ? PIECE_STYLES[currentPieceStyleIndex] : 'default';

    console.debug('[lichess-board-speaker] Rendering pieces:', pieces.length, 'pieces found');

    pieces.forEach(piece => {
      const mesh = createPieceMesh(piece.type, piece.colour === 'white', pieceStyle);
      if (!mesh) return;

      const pos = boardPositionTo3D(piece.col, piece.row, isFlipped);
      mesh.position.set(pos.x, 0, pos.z);

      const scale = 0.65;
      mesh.scale.set(scale, scale, scale);

      canvasScene.add(mesh);
      piecesMeshes.push(mesh);
    });

    console.debug('[lichess-board-speaker] Scene children count:', canvasScene.children.length);
  }

  function update3DCameraAngle() {
    if (!canvasCamera) return;

    const angle = PARALLAX_ANGLES[currentParallaxIndex];
    const angleRad = angle * Math.PI / 180;

    const distance = 15;
    const y = Math.cos(angleRad) * distance;
    const z = Math.sin(angleRad) * distance;

    canvasCamera.position.set(0, y, z);
    canvasCamera.up.set(0, 0, -1);
    canvasCamera.lookAt(0, 0, 0);

    console.debug('[lichess-board-speaker] Camera angle:', angle, 'position:', canvasCamera.position);
  }

  function render3DCanvas() {
    if (!canvasRenderer || !canvasScene || !canvasCamera) {
      console.error('[lichess-board-speaker] render3DCanvas: missing renderer, scene, or camera', { canvasRenderer, canvasScene, canvasCamera });
      return;
    }
    canvasRenderer.render(canvasScene, canvasCamera);
  }

  function animate3DCanvas(timestamp) {
    if (!canvasRenderer) return;

    canvasAnimationId = requestAnimationFrame(animate3DCanvas);

    const deltaTime = timestamp - lastFrameTime;
    if (deltaTime < FRAME_INTERVAL_MS) return;
    lastFrameTime = timestamp - (deltaTime % FRAME_INTERVAL_MS);

    if (currentHoverModeIndex > 0 && hoverStartTime !== null) {
      const elapsed = timestamp - hoverStartTime;
      const baseAngle = PARALLAX_ANGLES[currentParallaxIndex];
      const oscillationX = Math.sin(elapsed / HOVER_OSCILLATION_PERIOD_MS) * HOVER_OSCILLATION_ANGLE;
      const angleX = baseAngle + oscillationX;
      const angleRad = angleX * Math.PI / 180;

      const distance = 15;
      const y = Math.cos(angleRad) * distance;
      const z = Math.sin(angleRad) * distance;

      canvasCamera.position.set(0, y, z);

      if (currentHoverModeIndex === 1) {
        const oscillationZ = Math.sin(elapsed / HOVER_OSCILLATION_Y_PERIOD_MS) * HOVER_OSCILLATION_Y_ANGLE;
        const oscillationZRad = oscillationZ * Math.PI / 180;
        canvasCamera.position.x = Math.sin(oscillationZRad) * distance * 0.1;
      }

      canvasCamera.up.set(0, 0, -1);
      canvasCamera.lookAt(0, 0, 0);
    }

    render3DCanvas();
  }

  function start3DAnimation() {
    if (canvasAnimationId) return;
    hoverStartTime = performance.now();
    lastFrameTime = 0;
    canvasAnimationId = requestAnimationFrame(animate3DCanvas);
  }

  function stop3DAnimation() {
    if (canvasAnimationId) {
      cancelAnimationFrame(canvasAnimationId);
      canvasAnimationId = null;
    }
  }

  function cleanup3DCanvas() {
    stop3DAnimation();

    if (canvasElement) {
      canvasElement.remove();
      canvasElement = null;
    }

    if (canvasRenderer) {
      canvasRenderer.dispose();
      canvasRenderer = null;
    }

    piecesMeshes.forEach(mesh => {
      if (mesh.geometry) mesh.geometry.dispose();
      if (mesh.material) mesh.material.dispose();
    });
    piecesMeshes = [];

    canvasScene = null;
    canvasCamera = null;

    const board = document.querySelector('cg-board:not(.userscript-custom-board)');
    if (board) {
      showOriginalBoard(board);
      showBoardPieces(board);
    }
  }

  function resize3DCanvas() {
    const board = document.querySelector('cg-board:not(.userscript-custom-board)');
    if (!board || !canvasRenderer || !canvasElement) return;

    const boardSize = board.offsetWidth;
    canvasRenderer.setSize(boardSize, boardSize);
    render3DCanvas();
  }

  async function init3DMode() {
    try {
      console.debug('[lichess-board-speaker] Initializing 3D mode...');
      await loadThreeJs();
      console.debug('[lichess-board-speaker] Setting up 3D canvas...');
      const result = setup3DCanvas();
      if (!result) {
        console.error('[lichess-board-speaker] Failed to set up 3D canvas - container or board not found');
        return;
      }
      console.debug('[lichess-board-speaker] Canvas element:', canvasElement);
      console.debug('[lichess-board-speaker] Renderer:', canvasRenderer);
      update3DCameraAngle();
      update3DPieces();
      if (currentHoverModeIndex > 0) {
        start3DAnimation();
      } else {
        render3DCanvas();
      }
      console.debug('[lichess-board-speaker] 3D mode initialization complete');
    } catch (error) {
      console.error('[lichess-board-speaker] Failed to initialize 3D mode:', error);
    }
  }

  const OBFUSCATIONS_COMMAND = 'obf';
  let obfuscationsEnabled = false;

  const CUSTOM_BOARD_COMMAND = 'cb';
  let customBoardEnabled = false;

  const HOVER_MODE_COMMAND = 'hv';
  const HOVER_OSCILLATION_ANGLE = 1.95;
  const HOVER_OSCILLATION_PERIOD_MS = 2000;
  const HOVER_OSCILLATION_Y_ANGLE = 1.95;
  const HOVER_OSCILLATION_Y_PERIOD_MS = 2500;
  const HOVER_MODES = ['off', 'on'];
  let currentHoverModeIndex = 0;
  let hoverAnimationId = null;
  let hoverStartTime = null;

  const SETTINGS_KEY = 'lichess-board-speaker-settings';

  function saveSettings() {
    const settings = {
      speakRateIndex: currentSpeakRateIndex,
      parallaxIndex: currentParallaxIndex,
      dividersEnabled: dividersEnabled,
      pieceStyleIndex: currentPieceStyleIndex,
      hoverModeIndex: currentHoverModeIndex,
      blurIndex: currentBlurIndex,
      customBoardEnabled: customBoardEnabled,
      obfuscationsEnabled: obfuscationsEnabled,
    };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    console.debug('[lichess-board-speaker] settings saved', settings);
  }

  function loadSettings() {
    try {
      const stored = localStorage.getItem(SETTINGS_KEY);
      if (!stored) return;

      const settings = JSON.parse(stored);

      if (settings.speakRateIndex !== undefined) {
        currentSpeakRateIndex = settings.speakRateIndex;
      }
      if (settings.parallaxIndex !== undefined) {
        currentParallaxIndex = settings.parallaxIndex;
      }
      if (settings.dividersEnabled !== undefined) {
        dividersEnabled = settings.dividersEnabled;
      }
      if (settings.pieceStyleIndex !== undefined) {
        currentPieceStyleIndex = settings.pieceStyleIndex;
      }
      if (settings.hoverModeIndex !== undefined) {
        currentHoverModeIndex = settings.hoverModeIndex;
      } else if (settings.hoverModeEnabled !== undefined) {
        currentHoverModeIndex = settings.hoverModeEnabled ? 1 : 0;
      }
      if (settings.blurIndex !== undefined) {
        currentBlurIndex = settings.blurIndex;
      } else if (settings.blurEnabled !== undefined) {
        currentBlurIndex = settings.blurEnabled ? 1 : 0;
      }
      if (settings.customBoardEnabled !== undefined) {
        customBoardEnabled = settings.customBoardEnabled;
      }
      if (settings.obfuscationsEnabled !== undefined) {
        obfuscationsEnabled = settings.obfuscationsEnabled;
      }

      console.debug('[lichess-board-speaker] settings loaded', settings);
    } catch (error) {
      console.error('[lichess-board-speaker] failed to load settings', error);
    }
  }

  function updateButtonLabels() {
    const speakRateButton = commandButtons[formatCommand(SPEAK_RATE_COMMAND)];
    if (speakRateButton) {
      speakRateButton.innerText = formatSpeakRateButtonText({ withSuffix: true });
    }

    const customBoardButton = commandButtons[formatCommand(CUSTOM_BOARD_COMMAND)];
    if (customBoardButton) {
      customBoardButton.innerText = formatCustomBoardButtonText({ withSuffix: true });
    }

    const parallaxButton = boardModificationButtons[PARALLAX_COMMAND];
    if (parallaxButton) {
      parallaxButton.innerText = formatParallaxButtonText({ withSuffix: false });
    }

    const dividersButton = boardModificationButtons[DIVIDERS_COMMAND];
    if (dividersButton) {
      dividersButton.innerText = formatDividersButtonText({ withSuffix: false });
    }

    const pieceStyleButton = obfuscationButtons[PIECE_STYLE_COMMAND];
    if (pieceStyleButton) {
      pieceStyleButton.innerText = formatPieceStyleButtonText({ withSuffix: false });
    }

    const hoverModeButton = boardModificationButtons[HOVER_MODE_COMMAND];
    if (hoverModeButton) {
      hoverModeButton.innerText = formatHoverModeButtonText({ withSuffix: false });
    }

    const blurButton = obfuscationButtons[BLUR_COMMAND];
    if (blurButton) {
      blurButton.innerText = formatBlurButtonText({ withSuffix: false });
    }

    const obfuscationsButton = boardModificationButtons[OBFUSCATIONS_COMMAND];
    if (obfuscationsButton) {
      obfuscationsButton.innerText = formatObfuscationsButtonText({ withSuffix: false });
    }
  }

  function applyLoadedSettings() {
    const boardModContainer = document.querySelector('.board-mod-buttons-container');
    if (boardModContainer) {
      boardModContainer.style.display = customBoardEnabled ? 'block' : 'none';
    }

    const obfuscationsContainer = document.querySelector('.obfuscations-buttons-container');
    if (obfuscationsContainer) {
      obfuscationsContainer.style.display = obfuscationsEnabled ? 'block' : 'none';
    }

    if (!customBoardEnabled) {
      return;
    }

    if (currentParallaxIndex > 0 || currentPieceStyleIndex > 0) {
      applyParallaxTransform();
    }

    if (dividersEnabled) {
      drawDividers();
    }

    if (currentHoverModeIndex > 0) {
      startHoverMode();
    }

    if (currentBlurIndex > 0) {
      applyBlur();
    }
  }

  function formatSpeakRateButtonText({ withSuffix }) {
    const suffix = withSuffix ? ` (${formatCommand(SPEAK_RATE_COMMAND)})` : '';
    return `Speak rate (${SPEAK_RATES[currentSpeakRateIndex]}) ${suffix}`;
  }

  function formatParallaxButtonText({ withSuffix }) {
    const suffix = withSuffix ? ` (${formatCommand(PARALLAX_COMMAND)})` : '';
    return `Parallax (req kb) (${PARALLAX_ANGLES[currentParallaxIndex]}°) ${suffix}`;
  }

  function formatDividersButtonText({ withSuffix }) {
    const suffix = withSuffix ? ` (${formatCommand(DIVIDERS_COMMAND)})` : '';
    const status = dividersEnabled ? 'ON' : 'OFF';
    return `Dividers (${status}) ${suffix}`;
  }

  function formatPieceStyleButtonText({ withSuffix }) {
    const suffix = withSuffix ? ` (${formatCommand(PIECE_STYLE_COMMAND)})` : '';
    return `Piece style (${PIECE_STYLES[currentPieceStyleIndex]}) ${suffix}`;
  }

  function formatHoverModeButtonText({ withSuffix }) {
    const suffix = withSuffix ? ` (${formatCommand(HOVER_MODE_COMMAND)})` : '';
    const status = HOVER_MODES[currentHoverModeIndex];
    return `Hover mode (${status}) ${suffix}`;
  }

  function formatBlurButtonText({ withSuffix }) {
    const suffix = withSuffix ? ` (${formatCommand(BLUR_COMMAND)})` : '';
    return `Blur (${BLUR_LEVELS[currentBlurIndex]}px) ${suffix}`;
  }

  function formatObfuscationsButtonText({ withSuffix }) {
    const suffix = withSuffix ? ` (${formatCommand(OBFUSCATIONS_COMMAND)})` : '';
    const status = obfuscationsEnabled ? 'ON' : 'OFF';
    return `Obfuscations (${status}) ${suffix}`;
  }

  function formatCustomBoardButtonText({ withSuffix }) {
    const suffix = withSuffix ? ` (${formatCommand(CUSTOM_BOARD_COMMAND)})` : '';
    const status = customBoardEnabled ? 'ON' : 'OFF';
    return `Custom board (${status}) ${suffix}`;
  }

  const COMMAND_PREFIX = 'p';
  const COMMANDS = {
    a: {
      fullName: 'Speak all pieces',
      exec: () => generateFullMessagesAndSpeak(() => true)
    },

    wk: {
      fullName: "Speak w's k-side",
      exec: () => generateFullMessagesAndSpeak(({ col, row }) => col >= 5 && row <= 4)
    },
    wq: {
      fullName: "Speak w's q-side",
      exec: () => generateFullMessagesAndSpeak(({ col, row }) => col <= 4 && row <= 4)
    },
    bk: {
      fullName: "Speak b's k-side",
      exec: () => generateFullMessagesAndSpeak(({ col, row }) => col >= 5 && row >= 5)
    },
    bq: {
      fullName: "Speak b's q-side",
      exec: () => generateFullMessagesAndSpeak(({ col, row }) => col <= 4 && row >= 5)
    },

    ww: {
      fullName: "Speak w's pieces",
      exec: () => generateFullMessagesAndSpeak(({ row }) => row <= 4)
    },
    bb: {
      fullName: "Speak b's pieces",
      exec: () => generateFullMessagesAndSpeak(({ row }) => row >= 5)
    },

    [SPEAK_RATE_COMMAND]: {
      fullName: formatSpeakRateButtonText({ withSuffix: false }),
      exec: () => changeSpeakRate(),
    },
    ss: {
      fullName: 'Stop speaking',
      exec: () => window.speechSynthesis.cancel()
    },

    l: {
      fullName: 'List pieces',
      exec: displayPiecesList
    },

    "-annotate": {
      fullName: 'Annotate board',
      exec: setExampleAnnotation
    },

    [CUSTOM_BOARD_COMMAND]: {
      fullName: formatCustomBoardButtonText({ withSuffix: false }),
      exec: () => toggleCustomBoard(),
    },
  };

  const BOARD_MODIFICATION_COMMANDS = {
    [PARALLAX_COMMAND]: {
      fullName: formatParallaxButtonText({ withSuffix: false }),
      exec: () => toggleParallax(),
    },
    [DIVIDERS_COMMAND]: {
      fullName: formatDividersButtonText({ withSuffix: false }),
      exec: () => toggleDividers(),
    },
    [HOVER_MODE_COMMAND]: {
      fullName: formatHoverModeButtonText({ withSuffix: false }),
      exec: () => toggleHoverMode(),
    },
    [OBFUSCATIONS_COMMAND]: {
      fullName: formatObfuscationsButtonText({ withSuffix: false }),
      exec: () => toggleObfuscations(),
    },
  };

  const OBFUSCATION_COMMANDS = {
    [PIECE_STYLE_COMMAND]: {
      fullName: formatPieceStyleButtonText({ withSuffix: false }),
      exec: () => togglePieceStyle(),
    },
    [BLUR_COMMAND]: {
      fullName: formatBlurButtonText({ withSuffix: false }),
      exec: () => toggleBlur(),
    },
  };

  const commandButtons = {};
  const boardModificationButtons = {};
  const obfuscationButtons = {};

  function formatCommand(commandName) {
    return `${COMMAND_PREFIX}${commandName}`;
  }

  const COMMANDS_WITH_PREFIX = Object.fromEntries(
    Object
      .entries(COMMANDS)
      .map(([name, command]) => [formatCommand(name), command])
  );

  const DRAWING_COLOR = '#ff6b6b';

  function parseSquare(square) {
    if (square.length !== 2) return null;
    const file = square[0];
    const rank = square[1];
    if (file < 'a' || file > 'h' || rank < '1' || rank > '8') return null;
    return { file, rank };
  }

  function parseDrawingCommand(command) {
    if (!command.startsWith('-')) return null;

    const content = command.substring(1);
    const parts = content.split(',');
    const circles = [];
    const arrows = [];

    for (const part of parts) {
      if (part.length === 2) {
        // Single square - circle
        const square = parseSquare(part);
        if (square) circles.push(square);
      } else if (part.length === 4) {
        // Four characters - arrow
        const from = parseSquare(part.substring(0, 2));
        const to = parseSquare(part.substring(2, 4));
        if (from && to) arrows.push({ from, to });
      } else if (part.length === 3) {
        // Three characters - circle the first two, ignore the third
        const square = parseSquare(part.substring(0, 2));
        if (square) circles.push(square);
      }
      // Ignore invalid parts
    }

    return { circles, arrows };
  }

  function squareToCoordinates(square, boardSize, isFlipped) {
    const fileIndex = square.file.charCodeAt(0) - 'a'.charCodeAt(0);
    const rankIndex = parseInt(square.rank) - 1;

    let x, y;
    if (isFlipped) {
      x = (7 - fileIndex) * boardSize / 8 + boardSize / 16;
      y = rankIndex * boardSize / 8 + boardSize / 16;
    } else {
      x = fileIndex * boardSize / 8 + boardSize / 16;
      y = (7 - rankIndex) * boardSize / 8 + boardSize / 16;
    }

    return { x, y };
  }

  function createOrGetSVG() {
    let svg = document.querySelector('cg-container svg.userscript-drawings');
    if (!svg) {
      const container = document.querySelector('cg-container');
      if (!container) return null;

      svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.classList.add('userscript-drawings')
      svg.style.position = 'absolute';
      svg.style.top = '0';
      svg.style.left = '0';
      svg.style.width = '100%';
      svg.style.height = '100%';
      svg.style.pointerEvents = 'none';
      svg.style.zIndex = '10';

      container.appendChild(svg);
    }
    return svg;
  }

  function clearDrawings() {
    const svg = document.querySelector('cg-container svg.userscript-drawings');
    if (svg) {
      svg.innerHTML = '';
    }
  }

  function drawCircle(svg, x, y, boardSize) {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', x);
    circle.setAttribute('cy', y);
    circle.setAttribute('r', boardSize / 16);
    circle.setAttribute('fill', 'none');
    circle.setAttribute('stroke', DRAWING_COLOR);
    circle.setAttribute('stroke-width', '3');
    circle.setAttribute('opacity', '0.8');
    svg.appendChild(circle);
  }

  function drawArrow(svg, x1, y1, x2, y2, boardSize) {
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const arrowLength = boardSize / 20;
    const arrowAngle = Math.PI / 6;

    // Calculate the arrowhead points first
    const arrowX1 = x2 - arrowLength * Math.cos(angle - arrowAngle);
    const arrowY1 = y2 - arrowLength * Math.sin(angle - arrowAngle);
    const arrowX2 = x2 - arrowLength * Math.cos(angle + arrowAngle);
    const arrowY2 = y2 - arrowLength * Math.sin(angle + arrowAngle);

    // Shorten the line so it ends at the base of the arrowhead
    const lineEndX = x2 - (arrowLength * 0.7) * Math.cos(angle);
    const lineEndY = y2 - (arrowLength * 0.7) * Math.sin(angle);

    // Draw the line (now shortened)
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', lineEndX);
    line.setAttribute('y2', lineEndY);
    line.setAttribute('stroke', DRAWING_COLOR);
    line.setAttribute('stroke-width', '4');
    line.setAttribute('stroke-linecap', 'round');
    line.setAttribute('opacity', '0.8');
    svg.appendChild(line);

    // Draw arrowhead at the original end point
    const arrowhead = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    arrowhead.setAttribute('points', `${x2},${y2} ${arrowX1},${arrowY1} ${arrowX2},${arrowY2}`);
    arrowhead.setAttribute('fill', DRAWING_COLOR);
    arrowhead.setAttribute('opacity', '0.8');
    svg.appendChild(arrowhead);
  }

  function updateDrawings(command) {
    clearDrawings();

    const drawingData = parseDrawingCommand(command);
    if (!drawingData) return;

    const svg = createOrGetSVG();
    if (!svg) return;

    const container = document.querySelector('cg-container');
    const boardSize = container.offsetWidth;
    const isFlipped = !isPlayerWhite();

    // Draw circles
    for (const square of drawingData.circles) {
      const coords = squareToCoordinates(square, boardSize, isFlipped);
      drawCircle(svg, coords.x, coords.y, boardSize);
    }

    // Draw arrows
    for (const arrow of drawingData.arrows) {
      const fromCoords = squareToCoordinates(arrow.from, boardSize, isFlipped);
      const toCoords = squareToCoordinates(arrow.to, boardSize, isFlipped);
      drawArrow(svg, fromCoords.x, fromCoords.y, toCoords.x, toCoords.y, boardSize);
    }
  }

  function calculatePiecePosition(transform, squareSize, playerIsWhite) {
    const match = transform.match(/translate\(([\d.]+)px(?:,\s*([\d.]+)px)?\)/);
    if (!match) return null;

    let col = Math.floor(parseFloat(match[1]) / squareSize);
    let row = Math.floor(parseFloat(match[2] || 0) / squareSize);

    if (playerIsWhite) {
      row = 7 - row;
    } else {
      col = 7 - col;
    }

    return { col: col + 1, row: row + 1 };
  }

  function getPiecePositions(playerIsWhite) {
    const pieces = document.querySelectorAll('cg-board:not(.userscript-custom-board) piece');
    const squareSize = document.querySelector('cg-board:not(.userscript-custom-board)').offsetWidth / 8;

    return Array.from(pieces)
      .map(piece => {
        const position = calculatePiecePosition(piece.style.transform, squareSize, playerIsWhite);
        if (!position) return null;

        const pieceString = piece.className;
        const [_match, colour, type] = pieceString.match(/^(white|black)\s+(king|queen|rook|bishop|knight|pawn)$/) || [];
        if (!colour || !type) return null;

        const { col, row } = position;
        return {
          type,
          colour,
          col,
          colLetter: 'abcdefgh'[col - 1],
          row
        };
      })
      .filter(piece => piece);
  }

  function sortPieces(piecePositions) {
    return piecePositions.toSorted((a, b) => {
      if (a.col !== b.col) {
        return a.col - b.col;
      }
      return a.row - b.row;
    });
  }

  function generateSpeakablePosition({ colLetter, row }) {
    return `"${colLetter}" "${row}"`
  }

  function generateDisplayablePosition({ colLetter, row }) {
    return `${colLetter}${row}`
  }

  function generateSinglePositionMessage(piece) {
    const { colour, type } = piece;
    return [
      `${generateSpeakablePosition(piece)} ${colour} ${type}`,
      SILENT_PAUSE
    ];
  }

  function generateMessagesFromGroups(piecesGroupedByColourGroupedByType) {
    return Object
      .entries(piecesGroupedByColourGroupedByType)
      .flatMap(([colour, piecesGroupedByType]) => {
        return Object
          .entries(piecesGroupedByType)
          .flatMap(([type, pieces]) => {
            if (pieces.length === 0) return [];
            if (pieces.length === 1) return generateSinglePositionMessage(pieces[0]);

            const positions = pieces.map(generateSpeakablePosition).join(', ');
            return [
              `${colour} ${type}s on ${positions}`,
              SILENT_PAUSE,
              SILENT_PAUSE
            ]
          })
      });
  }

  function generateDisplayTextFromGroups(piecesGroupedByColourGroupedByType) {
    return Object
      .entries(piecesGroupedByColourGroupedByType)
      .flatMap(([colour, piecesGroupedByType]) => {
        const prefix = `${colour.toUpperCase()}:`;
        const textLinesForColour = Object
          .entries(piecesGroupedByType)
          .flatMap(([type, pieces]) => {
            if (pieces.length === 0) return [];

            const positions = pieces.map(generateDisplayablePosition).join(', ');
            return [
              `${type}: ${positions}`,
            ]
          });
        return [prefix, ...textLinesForColour, ''];
      });
  }

  function speakString(str, options = {}) {
    const utt = new SpeechSynthesisUtterance(str);
    utt.rate = SPEAK_RATES[currentSpeakRateIndex];
    Object.assign(utt, options)
    window.speechSynthesis.speak(utt);
    return utt;
  }

  function speakMessages(msgs) {
    console.debug('[lichess-board-speaker] speaking messages: ', msgs.join('\n'));

    msgs.forEach(msg => {
      speakString(msg, { volume: msg === SILENT_PAUSE ? 0 : 1 });
    });
  }

  function isPlayerWhite() {
    return Array.from(document.querySelector('coords').classList).indexOf('black') === -1;
  }

  function groupPiecesByColourAndType(pieces) {
    pieces = sortPieces(pieces);

    let piecesGroupedByColour = {
      white: pieces.filter(p => p.colour === 'white'),
      black: pieces.filter(p => p.colour === 'black'),
    };

    return {
      white: {
        pawn: piecesGroupedByColour.white.filter(p => p.type === 'pawn'),
        knight: piecesGroupedByColour.white.filter(p => p.type === 'knight'),
        bishop: piecesGroupedByColour.white.filter(p => p.type === 'bishop'),
        rook: piecesGroupedByColour.white.filter(p => p.type === 'rook'),
        queen: piecesGroupedByColour.white.filter(p => p.type === 'queen'),
        king: piecesGroupedByColour.white.filter(p => p.type === 'king'),
      },
      black: {
        pawn: piecesGroupedByColour.black.filter(p => p.type === 'pawn'),
        knight: piecesGroupedByColour.black.filter(p => p.type === 'knight'),
        bishop: piecesGroupedByColour.black.filter(p => p.type === 'bishop'),
        rook: piecesGroupedByColour.black.filter(p => p.type === 'rook'),
        queen: piecesGroupedByColour.black.filter(p => p.type === 'queen'),
        king: piecesGroupedByColour.black.filter(p => p.type === 'king'),
      }
    };
  }

  function generateFullMessages(filter) {
    const playerIsWhite = isPlayerWhite();
    const playerColourMsg = `You are ${playerIsWhite ? 'white' : 'black'}`;

    let pieces = getPiecePositions(playerIsWhite);
    pieces = pieces.filter(filter);

    const piecesGrouped = groupPiecesByColourAndType(pieces);
    const pieceMessages = generateMessagesFromGroups(piecesGrouped);

    return [playerColourMsg, ...pieceMessages];
  }

  function findPossibleCommandMatch(inputString) {
    const possibleCommandStrings = Object.keys(COMMANDS_WITH_PREFIX);
    return possibleCommandStrings.find(cs => cs.startsWith(inputString));
  }

  function setExampleAnnotation() {
    getMoveInput().value = "-e5f6,g7f6"
  }

  function removeWrongOnInput(moveInput) {
    const value = moveInput.value;

    // Handle drawing commands
    if (value.startsWith('-')) {
      updateDrawings(value);
      moveInput.classList.remove('wrong');
      return;
    }

    clearDrawings();

    // Handle regular commands
    const possibleCommand = findPossibleCommandMatch(value);
    if (!possibleCommand) return;
    moveInput.classList.remove('wrong');
  }

  function userInputChanged(moveInput) {
    const value = moveInput.value;

    // Handle drawing commands
    if (value.startsWith('-')) {
      updateDrawings(value);
      return;
    }

    // Handle regular commands
    const command = COMMANDS_WITH_PREFIX[value];
    if (!command) return;

    console.debug('[lichess-board-speaker] command triggered', { value });
    moveInput.value = '';
    clearDrawings();

    command.exec();
  }

  function createButtonContainer(keyboardMoveElement) {
    const container = document.createElement('div');
    container.style.marginLeft = '8px';
    container.style.minWidth = '280px';

    keyboardMoveElement.style.width = '100%';
    keyboardMoveElement.style.display = 'block'; // disable display:flex to prevent flex-row
    keyboardMoveElement.appendChild(container);

    return container;
  }

  function createBoardModButtonContainer(parentContainer) {
    const container = document.createElement('div');
    container.classList.add('board-mod-buttons-container');
    container.style.marginLeft = '8px';
    container.style.display = customBoardEnabled ? 'block' : 'none';
    parentContainer.appendChild(container);
    return container;
  }

  function createButtons(container) {
    Object
      .keys(COMMANDS_WITH_PREFIX)
      .map(createCommandButton)
      .map(button => container.appendChild(button));
  }

  function createBoardModButtons(container) {
    Object
      .keys(BOARD_MODIFICATION_COMMANDS)
      .map(createBoardModButton)
      .map(button => container.appendChild(button));
  }

  function createObfuscationsButtonContainer(parentContainer) {
    const container = document.createElement('div');
    container.classList.add('obfuscations-buttons-container');
    container.style.marginLeft = '16px';
    container.style.display = obfuscationsEnabled ? 'block' : 'none';
    parentContainer.appendChild(container);
    return container;
  }

  function createObfuscationButtons(container) {
    Object
      .keys(OBFUSCATION_COMMANDS)
      .map(createObfuscationButton)
      .map(button => container.appendChild(button));
  }

  function createObfuscationButton(commandName) {
    const command = OBFUSCATION_COMMANDS[commandName];
    const { fullName, exec } = command;

    const button = document.createElement('button');
    button.innerText = fullName;
    button.style.display = 'block';
    button.style.width = '100%';
    button.style.padding = '2px';
    button.style.margin = '8px';
    button.style.textAlign = 'left';

    button.addEventListener('click', () => {
      console.debug('[lichess-board-speaker] obfuscation button clicked', { fullName });
      exec();
    });

    obfuscationButtons[commandName] = button;
    return button;
  }

  function generateFullMessagesAndSpeak(filter) {
    const msgs = generateFullMessages(filter);
    speakMessages(msgs);
  }

  function changeSpeakRate() {
    window.speechSynthesis.cancel();

    currentSpeakRateIndex = (currentSpeakRateIndex + 1) % SPEAK_RATES.length;

    const button = commandButtons[formatCommand(SPEAK_RATE_COMMAND)];
    button.innerText = formatSpeakRateButtonText({ withSuffix: true });

    const suffix = currentSpeakRateIndex === SPEAK_RATES.length - 1 ? ' max' : '';

    saveSettings();

    setTimeout(() => {
      speakString('Rate ' + SPEAK_RATES[currentSpeakRateIndex] + suffix);
    }, 0);
  }

  let parallaxObserver = null;
  let resizeObserver = null;
  let boardReplacementObserver = null;
  let healthCheckInterval = null;

  function removeCustomBoardElement() {
    const allCustomBoards = document.querySelectorAll('cg-board.userscript-custom-board');
    allCustomBoards.forEach(board => board.remove());
  }

  function cleanupBoardObservers() {
    if (parallaxObserver) {
      parallaxObserver.disconnect();
      parallaxObserver = null;
    }
    if (resizeObserver) {
      resizeObserver.disconnect();
      resizeObserver = null;
    }
  }

  function healthCheck() {
    if (!customBoardEnabled) return;

    const board = document.querySelector('cg-board:not(.userscript-custom-board)');
    if (!board) return;

    const needsCustomBoard = currentParallaxIndex > 0 || currentPieceStyleIndex > 0;
    if (!needsCustomBoard) return;

    if (!canvasElement || !canvasElement.isConnected) {
      console.debug('[lichess-board-speaker] health check: canvas disconnected, recreating');
      cleanupBoardObservers();
      cleanup3DCanvas();
      applyLoadedSettings();
      return;
    }

    if (!parallaxObserver) {
      console.debug('[lichess-board-speaker] health check: parallax observer missing, recreating');
      setupParallaxMoveObserver();
    }
  }

  function startHealthCheck() {
    if (healthCheckInterval) return;
    healthCheckInterval = setInterval(healthCheck, 500);
  }

  function stopHealthCheck() {
    if (healthCheckInterval) {
      clearInterval(healthCheckInterval);
      healthCheckInterval = null;
    }
  }

  function setupBoardReplacementObserver() {
    if (boardReplacementObserver) {
      boardReplacementObserver.disconnect();
    }

    const container = document.querySelector('cg-container');
    if (!container) return;

    boardReplacementObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          const addedNodes = Array.from(mutation.addedNodes);
          const removedNodes = Array.from(mutation.removedNodes);

          const boardAdded = addedNodes.some(node => node.tagName === 'CG-BOARD' && !node.classList.contains('userscript-custom-board'));
          const boardRemoved = removedNodes.some(node => node.tagName === 'CG-BOARD' && !node.classList.contains('userscript-custom-board'));

          if (boardAdded || boardRemoved) {
            console.debug('[lichess-board-speaker] board replaced, re-initializing');

            cleanupBoardObservers();
            cleanup3DCanvas();

            if (customBoardEnabled) {
              setTimeout(() => {
                applyLoadedSettings();
              }, 50);
            }

            break;
          }
        }
      }
    });

    boardReplacementObserver.observe(container, {
      childList: true,
      subtree: false,
    });
  }

  function handleContainerResize() {
    resize3DCanvas();
    if (dividersEnabled) {
      drawDividers();
    }
  }

  function calculateScaleForAngle(angleDegrees) {
    const angleRadians = angleDegrees * Math.PI / 180;
    const cosValue = Math.cos(angleRadians);
    return Math.pow(cosValue, 0.5);
  }

  function hideBoardPieces(board) {
    const pieces = board.querySelectorAll('piece');
    pieces.forEach(piece => {
      piece.style.visibility = 'hidden';
    });
  }

  function showBoardPieces(board) {
    const pieces = board.querySelectorAll('piece');
    pieces.forEach(piece => {
      piece.style.visibility = '';
    });
  }

  function hideOriginalBoard(board) {
    board.style.opacity = '0';
  }

  function showOriginalBoard(board) {
    board.style.opacity = '';
  }

  function applyParallaxTransform() {
    const board = document.querySelector('cg-board:not(.userscript-custom-board)');
    if (!board) {
      console.debug('[lichess-board-speaker] applyParallaxTransform: board not found');
      return;
    }

    const angle = PARALLAX_ANGLES[currentParallaxIndex];
    const needsCustomBoard = angle > 0 || currentPieceStyleIndex > 0;

    if (!needsCustomBoard) {
      showOriginalBoard(board);
      showBoardPieces(board);
      removeCustomBoardElement();
      cleanup3DCanvas();

      cleanupBoardObservers();

      if (currentHoverModeIndex > 0) {
        currentHoverModeIndex = 0;
        const button = boardModificationButtons[HOVER_MODE_COMMAND];
        if (button) {
          button.innerText = formatHoverModeButtonText({ withSuffix: false });
        }
        stopHoverMode();
      }
    } else {
      hideOriginalBoard(board);
      hideBoardPieces(board);
      removeCustomBoardElement();

      init3DMode();
      setupParallaxMoveObserver();
    }
  }

  function setupParallaxMoveObserver() {
    if (parallaxObserver) {
      parallaxObserver.disconnect();
    }

    const board = document.querySelector('cg-board:not(.userscript-custom-board)');
    if (!board) {
      console.debug('[lichess-board-speaker] setupParallaxMoveObserver: board not found');
      return;
    }

    parallaxObserver = new MutationObserver(() => {
      hideBoardPieces(board);
      update3DPieces();
      render3DCanvas();
    });

    parallaxObserver.observe(board, {
      childList: true,
      attributes: true,
      subtree: true
    });

    if (resizeObserver) {
      resizeObserver.disconnect();
    }

    const container = document.querySelector('cg-container');
    if (!container) {
      console.debug('[lichess-board-speaker] setupParallaxMoveObserver: container not found');
      return;
    }

    resizeObserver = new ResizeObserver(() => {
      handleContainerResize();
    });

    resizeObserver.observe(container);
  }

  function toggleParallax() {
    if (!customBoardEnabled) return;

    currentParallaxIndex = (currentParallaxIndex + 1) % PARALLAX_ANGLES.length;

    const button = boardModificationButtons[PARALLAX_COMMAND];
    if (button) {
      button.innerText = formatParallaxButtonText({ withSuffix: false });
    }

    if (canvasCamera) {
      update3DCameraAngle();
      render3DCanvas();
    } else {
      applyParallaxTransform();
    }

    if (dividersEnabled) {
      drawDividers();
    }

    saveSettings();
  }

  function startHoverMode() {
    start3DAnimation();
  }

  function stopHoverMode() {
    stop3DAnimation();
    update3DCameraAngle();
    render3DCanvas();
  }

  function toggleHoverMode() {
    if (!customBoardEnabled) return;

    currentHoverModeIndex = (currentHoverModeIndex + 1) % HOVER_MODES.length;

    const button = boardModificationButtons[HOVER_MODE_COMMAND];
    if (button) {
      button.innerText = formatHoverModeButtonText({ withSuffix: false });
    }

    if (currentHoverModeIndex > 0) {
      if (currentParallaxIndex === 0) {
        currentParallaxIndex = 3;
        const parallaxButton = boardModificationButtons[PARALLAX_COMMAND];
        if (parallaxButton) {
          parallaxButton.innerText = formatParallaxButtonText({ withSuffix: false });
        }
        applyParallaxTransform();
      }
      startHoverMode();
    } else {
      stopHoverMode();
    }

    saveSettings();
  }

  function createOrGetDividersSVG() {
    let svg = document.querySelector('cg-board:not(.userscript-custom-board) svg.userscript-dividers');
    if (!svg) {
      const board = document.querySelector('cg-board:not(.userscript-custom-board)');
      if (!board) return null;

      svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.classList.add('userscript-dividers');
      svg.style.position = 'absolute';
      svg.style.top = '0';
      svg.style.left = '0';
      svg.style.width = '100%';
      svg.style.height = '100%';
      svg.style.pointerEvents = 'none';
      svg.style.zIndex = '10';

      board.appendChild(svg);
    }
    return svg;
  }

  function drawDividers() {
    const svg = createOrGetDividersSVG();
    if (!svg) return;

    svg.innerHTML = '';

    const board = document.querySelector('cg-board:not(.userscript-custom-board)');
    if (!board) return;

    const boardSize = board.offsetWidth;
    const midPoint = boardSize / 2;

    const angle = PARALLAX_ANGLES[currentParallaxIndex];
    const baseWidth = 4.5;
    const angleRadians = angle * Math.PI / 180;
    const horizontalWidth = angle === 0 ? baseWidth : baseWidth / Math.cos(angleRadians);

    const horizontalLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    horizontalLine.setAttribute('x1', 0);
    horizontalLine.setAttribute('y1', midPoint);
    horizontalLine.setAttribute('x2', boardSize);
    horizontalLine.setAttribute('y2', midPoint);
    horizontalLine.setAttribute('stroke', 'black');
    horizontalLine.setAttribute('stroke-width', horizontalWidth.toString());
    svg.appendChild(horizontalLine);

    const verticalLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    verticalLine.setAttribute('x1', midPoint);
    verticalLine.setAttribute('y1', 0);
    verticalLine.setAttribute('x2', midPoint);
    verticalLine.setAttribute('y2', boardSize);
    verticalLine.setAttribute('stroke', 'black');
    verticalLine.setAttribute('stroke-width', baseWidth.toString());
    svg.appendChild(verticalLine);
  }

  function clearDividers() {
    const svgs = document.querySelectorAll('cg-board svg.userscript-dividers');
    svgs.forEach(svg => svg.remove());
  }

  function toggleDividers() {
    if (!customBoardEnabled) return;

    dividersEnabled = !dividersEnabled;

    const button = boardModificationButtons[DIVIDERS_COMMAND];
    if (button) {
      button.innerText = formatDividersButtonText({ withSuffix: false });
    }

    if (dividersEnabled) {
      drawDividers();
    } else {
      clearDividers();
    }

    saveSettings();
  }

  function togglePieceStyle() {
    if (!customBoardEnabled) return;

    currentPieceStyleIndex = (currentPieceStyleIndex + 1) % PIECE_STYLES.length;

    const button = obfuscationButtons[PIECE_STYLE_COMMAND];
    if (button) {
      button.innerText = formatPieceStyleButtonText({ withSuffix: false });
    }

    if (canvasScene) {
      update3DPieces();
      render3DCanvas();
    } else {
      applyParallaxTransform();
    }

    saveSettings();
  }

  function applyBlur() {
    const container = document.querySelector('cg-container');
    if (!container) return;

    const blurAmount = obfuscationsEnabled ? BLUR_LEVELS[currentBlurIndex] : 0;
    if (blurAmount === 0) {
      container.style.filter = '';
    } else {
      container.style.filter = `blur(${blurAmount}px)`;
    }
  }

  function toggleBlur() {
    if (!customBoardEnabled) return;

    currentBlurIndex = (currentBlurIndex + 1) % BLUR_LEVELS.length;

    const button = obfuscationButtons[BLUR_COMMAND];
    if (button) {
      button.innerText = formatBlurButtonText({ withSuffix: false });
    }

    applyBlur();
    saveSettings();
  }

  function toggleObfuscations() {
    if (!customBoardEnabled) return;

    obfuscationsEnabled = !obfuscationsEnabled;

    const button = boardModificationButtons[OBFUSCATIONS_COMMAND];
    if (button) {
      button.innerText = formatObfuscationsButtonText({ withSuffix: false });
    }

    const obfuscationsContainer = document.querySelector('.obfuscations-buttons-container');
    if (obfuscationsContainer) {
      obfuscationsContainer.style.display = obfuscationsEnabled ? 'block' : 'none';
    }

    if (canvasScene) {
      update3DPieces();
      render3DCanvas();
    } else {
      applyParallaxTransform();
    }
    applyBlur();

    saveSettings();
  }

  function toggleCustomBoard() {
    customBoardEnabled = !customBoardEnabled;

    const button = commandButtons[formatCommand(CUSTOM_BOARD_COMMAND)];
    button.innerText = formatCustomBoardButtonText({ withSuffix: true });

    if (customBoardEnabled) {
      setupBoardReplacementObserver();
      startHealthCheck();
      applyLoadedSettings();
    } else {
      cleanupBoardObservers();

      if (boardReplacementObserver) {
        boardReplacementObserver.disconnect();
        boardReplacementObserver = null;
      }

      stopHealthCheck();
      stopHoverMode();
      removeCustomBoardElement();
      cleanup3DCanvas();
      clearDividers();

      const container = document.querySelector('cg-container');
      if (container) {
        container.style.filter = '';
      }

      const board = document.querySelector('cg-board');
      if (board) {
        board.style.visibility = 'visible';
        board.style.opacity = '';
        board.style.transform = '';
        board.style.transformStyle = '';
      }

      const svg = document.querySelector('cg-container svg.userscript-drawings');
      if (svg) {
        svg.remove();
      }
    }

    saveSettings();
  }

  function displayPiecesList() {
    const playerIsWhite = isPlayerWhite();
    const pieces = getPiecePositions(playerIsWhite);
    const piecesGrouped = groupPiecesByColourAndType(pieces);

    const text =
      generateDisplayTextFromGroups(piecesGrouped)
        .filter(msg => msg !== SILENT_PAUSE)
        .join('\n');

    alert(text);
  }

  function createCommandButton(commandName) {
    const command = COMMANDS_WITH_PREFIX[commandName];
    const { fullName, exec } = command;

    const button = document.createElement('button');
    button.innerText = `${fullName} (${commandName})`;
    button.style.display = 'block';
    button.style.width = '100%';
    button.style.padding = '2px';
    button.style.margin = '8px';
    button.style.textAlign = 'left';

    button.addEventListener('click', () => {
      console.debug('[lichess-board-speaker] button clicked', { fullName });
      exec();
    });

    commandButtons[commandName] = button;
    return button;
  }

  function createBoardModButton(commandName) {
    const command = BOARD_MODIFICATION_COMMANDS[commandName];
    const { fullName, exec } = command;

    const button = document.createElement('button');
    button.innerText = fullName;
    button.style.display = 'block';
    button.style.width = '100%';
    button.style.padding = '2px';
    button.style.margin = '8px';
    button.style.textAlign = 'left';

    button.addEventListener('click', () => {
      console.debug('[lichess-board-speaker] board mod button clicked', { fullName });
      exec();
    });

    boardModificationButtons[commandName] = button;
    return button;
  }

  function getMoveInput() {
    return document.querySelector('.keyboard-move input');
  }

  function setupMoveInput(moveInput) {
    moveInput.addEventListener('input', (_event) => userInputChanged(moveInput));

    setInterval(() => removeWrongOnInput(moveInput), 50);

    console.debug('[lichess-board-speaker] input listeners set up');

    moveInput.style.minWidth = '200px';
  }

  function setup() {
    console.debug('[lichess-board-speaker] starting setup');

    const moveInput = getMoveInput();
    if (!moveInput) {
      setTimeout(setup, 250);
      return;
    }

    loadSettings();

    setupMoveInput(moveInput);
    const keyboardMoveElement = moveInput.closest('.keyboard-move');
    const buttonContainer = createButtonContainer(keyboardMoveElement);
    createButtons(buttonContainer);

    const boardModContainer = createBoardModButtonContainer(buttonContainer);
    createBoardModButtons(boardModContainer);

    const obfuscationsContainer = createObfuscationsButtonContainer(boardModContainer);
    createObfuscationButtons(obfuscationsContainer);

    const underboard = document.querySelector('.analyse__underboard');
    if (underboard) {
      buttonContainer.appendChild(underboard);
    }

    updateButtonLabels();

    if (customBoardEnabled) {
      setupBoardReplacementObserver();
      startHealthCheck();
    }

    applyLoadedSettings();
  }

  function onDocumentReady(handler) {
    console.debug('[lichess-board-speaker] set up load handler ...', { COMMANDS_WITH_PREFIX });
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', handler);
    } else {
      handler();
    }
  }

  onDocumentReady(setup);
})();

