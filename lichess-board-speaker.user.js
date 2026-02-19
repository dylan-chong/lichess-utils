// ==UserScript==
// @name        lichess-board-speaker
// @description This is your new file, start writing code
// @version     1.0
// @match       *://lichess.org/*
// @require     https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js
// @grant          none
// @inject-into    content
// @updateURL   https://raw.githubusercontent.com/dylan-chong/lichess-utils/main/lichess-board-speaker.user.js
// @downloadURL https://raw.githubusercontent.com/dylan-chong/lichess-utils/main/lichess-board-speaker.user.js
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
  const state = {
    speakRateIndex: 1,
    parallaxIndex: 0,
    dividersEnabled: false,
    blurIndex: 0,
    pieceStyleIndex: 0,
    blackSegmentsModeIndex: 0,
    blackSegmentsTimingIndex: 0,
    obfuscationsEnabled: false,
    customBoardEnabled: false,
    hoverModeIndex: 0,
    piecesListVisible: false,
  };

  const SPEAK_RATE_OPTIONS = [
    { label: '0.2', value: 0.2 },
    { label: '0.5', value: 0.5 },
    { label: '0.7', value: 0.7 },
    { label: '1.0', value: 1.0 },
    { label: '1.1', value: 1.1 },
    { label: '1.2', value: 1.2 },
  ];

  const PARALLAX_OPTIONS = [
    { label: '0°', value: 0 },
    { label: '20°', value: 20 },
    { label: '30°', value: 30 },
    { label: '40°', value: 40 },
    { label: '50°', value: 50 },
    { label: '60°', value: 60 },
    { label: '65°', value: 65 },
    { label: '70°', value: 70 },
    { label: '80°', value: 80 },
  ];

  const BLUR_OPTIONS = [
    { label: '0px', value: 0 },
    { label: '1px', value: 1 },
    { label: '2px', value: 2 },
    { label: '3px', value: 3 },
    { label: '4px', value: 4 },
    { label: '6px', value: 6 },
    { label: '8px', value: 8 },
  ];

  const PIECE_STYLE_OPTIONS = [
    { label: 'icons', createMesh: (pieceType, isWhite) => createIconPieceMesh(pieceType, isWhite), rotateForFlip: true },
    { label: '3d', createMesh: create3DPieceMesh, rotateForFlip: false },
    { label: 'checker', createMesh: (pieceType, isWhite) => createCheckerPieceMesh(isWhite, 0xe8e8e8, 0x1a1a1a), rotateForFlip: false },
    { label: 'checker-grey', createMesh: (pieceType, isWhite) => createCheckerPieceMesh(isWhite, 0x505050, 0x505050), rotateForFlip: false },
    { label: 'blindfold', createMesh: () => null, rotateForFlip: false },
  ];

  const BLACK_SEGMENTS_MODE_OPTIONS = [
    { label: 'None', getQuadrants: () => [] },
    { label: '1/4', getQuadrants: (counter) => [counter % 4] },
    { label: '1/2', getQuadrants: (counter) => [[0, 1], [2, 3], [0, 2], [1, 3]][counter % 4] },
    { label: '3/4', getQuadrants: (counter) => {
      const visible = counter % 4;
      return [0, 1, 2, 3].filter(q => q !== visible);
    }},
    { label: '4/4', getQuadrants: () => [0, 1, 2, 3] },
  ];

  const BLACK_SEGMENTS_TIMING_OPTIONS = [
    { label: 'Rotate every 10s', value: 10 },
    { label: 'Rotate every 30s', value: 30 },
    { label: 'Rotate every 60s', value: 60 },
    { label: "Don't rotate", value: null },
  ];

  const HOVER_MODE_OPTIONS = [
    { label: 'off', scale: 0 },
    { label: 'small', scale: 1 },
    { label: 'large', scale: 2 },
    { label: 'super', scale: 3 },
  ];

  let blackSegmentsCounter = 0;
  let blackSegmentsIntervalId = null;

  let threeJsLoaded = false;
  let canvasRenderer = null;
  let canvasScene = null;
  let canvasCamera = null;
  let canvasElement = null;
  let piecesMeshes = [];
  let pieceMeshMap = new Map();
  let canvasAnimationId = null;
  let lastFrameTime = 0;
  const TARGET_FPS = 60;
  const FRAME_INTERVAL_MS = 1000 / TARGET_FPS;
  let slideAnimationEndTime = 0;
  const SLIDE_ANIMATION_POLL_DURATION_MS = 200;
  let drawing3DObjects = [];
  let divider3DObjects = [];
  let dragging3DPiece = null;

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
    shape.moveTo(-0.15, 0);
    shape.lineTo(0.35, 0);
    shape.lineTo(0.35, 0.08);
    shape.lineTo(0.25, 0.12);
    shape.lineTo(0.15, 0.18);
    shape.quadraticCurveTo(0.08, 0.35, 0.1, 0.5);
    shape.quadraticCurveTo(0.15, 0.65, 0.25, 0.75);
    shape.quadraticCurveTo(0.35, 0.85, 0.38, 0.95);
    shape.lineTo(0.42, 1.0);
    shape.lineTo(0.45, 1.08);
    shape.lineTo(0.42, 1.12);
    shape.lineTo(0.35, 1.08);
    shape.quadraticCurveTo(0.25, 1.02, 0.18, 1.08);
    shape.lineTo(0.22, 1.18);
    shape.lineTo(0.18, 1.22);
    shape.lineTo(0.1, 1.15);
    shape.quadraticCurveTo(-0.05, 1.05, -0.15, 1.1);
    shape.quadraticCurveTo(-0.25, 1.12, -0.32, 1.05);
    shape.lineTo(-0.35, 0.95);
    shape.lineTo(-0.3, 0.88);
    shape.lineTo(-0.2, 0.9);
    shape.quadraticCurveTo(-0.1, 0.85, -0.15, 0.75);
    shape.lineTo(-0.25, 0.7);
    shape.lineTo(-0.35, 0.65);
    shape.lineTo(-0.38, 0.55);
    shape.lineTo(-0.32, 0.5);
    shape.lineTo(-0.22, 0.52);
    shape.quadraticCurveTo(-0.12, 0.48, -0.1, 0.38);
    shape.quadraticCurveTo(-0.08, 0.25, -0.15, 0.15);
    shape.lineTo(-0.2, 0.08);
    shape.lineTo(-0.15, 0);
    const extrudeSettings = { depth: 0.22, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.03, bevelSegments: 4 };
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

  function getPieceIconUrl(pieceType, isWhite) {
    const colorChar = isWhite ? 'w' : 'b';
    const pieceChar = pieceType === 'knight' ? 'N' : pieceType.charAt(0).toUpperCase();
    return `https://lichess1.org/assets/piece/cburnett/${colorChar}${pieceChar}.svg`;
  }

  function createIconPieceMesh(pieceType, isWhite) {
    const geometry = new THREE.PlaneGeometry(1.4, 1.4);
    const material = new THREE.MeshBasicMaterial({
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = 0.01;

    const loader = new THREE.TextureLoader();
    loader.load(getPieceIconUrl(pieceType, isWhite), (texture) => {
      material.map = texture;
      material.needsUpdate = true;
      render3DCanvas();
    });

    return mesh;
  }

  function createCheckerPieceMesh(isWhite, whiteColor, blackColor) {
    const color = isWhite ? whiteColor : blackColor;
    const material = new THREE.MeshBasicMaterial({ color });
    const geometry = createCheckerGeometry();
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = 0.075;
    return mesh;
  }

  function create3DPieceMesh(pieceType, isWhite) {
    const color = isWhite ? 0xf5f5dc : 0x2d2d2d;
    const material = new THREE.MeshStandardMaterial({ color, roughness: 0.4, metalness: 0.1 });
    let mesh;

    if (pieceType === 'pawn') {
      const geometry = createPawnGeometry();
      mesh = new THREE.Mesh(geometry, material);
    } else if (pieceType === 'rook') {
      const geometry = createRookGeometry();
      mesh = new THREE.Mesh(geometry, material);
    } else if (pieceType === 'knight') {
      const geometry = createKnightGeometry();
      mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.y = isWhite ? 0 : Math.PI;
      mesh.position.x = isWhite ? 0.05 : -0.05;
      mesh.position.z = isWhite ? -0.11 : 0.11;
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

  function getCurrentPieceStyleOption() {
    if (state.obfuscationsEnabled) return PIECE_STYLE_OPTIONS[state.pieceStyleIndex];
    const selected = PIECE_STYLE_OPTIONS[state.pieceStyleIndex];
    return selected.label === '3d' ? selected : PIECE_STYLE_OPTIONS[0];
  }

  function createPieceMesh(pieceType, isWhite) {
    const option = getCurrentPieceStyleOption();
    return option.createMesh(pieceType, isWhite);
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

  function pixelPositionTo3D(pixelX, pixelY, boardSize, isFlipped) {
    const normalizedX = pixelX / boardSize * 8;
    const normalizedY = pixelY / boardSize * 8;

    let x, z;
    if (isFlipped) {
      x = normalizedX - 4;
      z = normalizedY - 4;
    } else {
      x = 4 - normalizedX;
      z = (8 - normalizedY) - 4;
    }
    return { x, z };
  }

  function getTransformPixels(piece) {
    const computedTransform = window.getComputedStyle(piece).transform;

    if (computedTransform && computedTransform !== 'none') {
      const matrixMatch = computedTransform.match(/matrix\(([^)]+)\)/);
      if (matrixMatch) {
        const values = matrixMatch[1].split(',').map(v => parseFloat(v.trim()));
        return { x: values[4], y: values[5] };
      }
    }

    const inlineTransform = piece.style.transform;
    const translateMatch = inlineTransform.match(/translate\(([\d.]+)px(?:,\s*([\d.]+)px)?\)/);
    if (translateMatch) {
      return {
        x: parseFloat(translateMatch[1]),
        y: parseFloat(translateMatch[2] || 0)
      };
    }

    return null;
  }

  function createBoardPlane() {
    const geometry = new THREE.PlaneGeometry(8, 8);
    const darkMaterial = new THREE.MeshBasicMaterial({ color: 0x769656 });
    const lightMaterial = new THREE.MeshBasicMaterial({ color: 0xeeeed2 });
    const blackMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });

    const boardGroup = new THREE.Group();
    const isFlipped = !isPlayerWhite();

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const squareGeom = new THREE.PlaneGeometry(1, 1);
        const isLight = (row + col) % 2 === 0;

        const screenCol = isFlipped ? col : 7 - col;
        const screenRow = isFlipped ? row : 7 - row;
        const isBlackedOut = state.obfuscationsEnabled && isPositionInBlackedOutQuadrant(screenCol, screenRow);
        let material;
        if (isBlackedOut) {
          material = blackMaterial;
        } else {
          material = isLight ? lightMaterial : darkMaterial;
        }

        const square = new THREE.Mesh(squareGeom, material);
        square.position.set(col - 3.5, 0, row - 3.5);
        square.rotation.x = -Math.PI / 2;
        boardGroup.add(square);
      }
    }

    return boardGroup;
  }

  function isBlindfoldMode() {
    return document.querySelector('.puzzle__board.blindfold, .main-board.blindfold') !== null;
  }

  function update3DPieces() {
    if (!canvasScene || !threeJsLoaded) return;

    const existingBoard = canvasScene.getObjectByName('boardPlane');
    if (!existingBoard) {
      const boardPlane = createBoardPlane();
      boardPlane.name = 'boardPlane';
      canvasScene.add(boardPlane);
    }

    const board = document.querySelector('cg-board:not(.userscript-custom-board)');
    if (!board) return;

    const boardSize = board.offsetWidth;
    const isFlipped = !isPlayerWhite();
    const pieceStyleOption = getCurrentPieceStyleOption();

    const pieceElements = document.querySelectorAll('cg-board:not(.userscript-custom-board) piece');
    const currentPieceIds = new Set();

    pieceElements.forEach(pieceEl => {
      const pieceString = pieceEl.className;
      const [_match, colour, type] = pieceString.match(/^(white|black)\s+(king|queen|rook|bishop|knight|pawn)(?:\s+(?:anim|dragging|ghost))*$/) || [];
      if (!colour || !type) return;

      if (pieceEl.classList.contains('ghost')) return;

      const pixels = getTransformPixels(pieceEl);
      if (!pixels) return;

      const pieceId = `${colour}-${type}-${Math.round(pixels.x)}-${Math.round(pixels.y)}`;
      currentPieceIds.add(pieceId);

      let mesh = pieceMeshMap.get(pieceId);

      if (!mesh) {
        for (const [key, existingMesh] of pieceMeshMap.entries()) {
          if (key.startsWith(`${colour}-${type}-`) && !currentPieceIds.has(key)) {
            mesh = existingMesh;
            pieceMeshMap.delete(key);
            pieceMeshMap.set(pieceId, mesh);
            break;
          }
        }
      }

      if (!mesh) {
        mesh = createPieceMesh(type, colour === 'white');
        if (!mesh) return;

        const scale = 0.65;
        mesh.scale.set(scale, scale, scale);
        canvasScene.add(mesh);
        piecesMeshes.push(mesh);
        pieceMeshMap.set(pieceId, mesh);
      }

      if (mesh !== dragging3DPiece) {
        const pos3D = pixelPositionTo3D(pixels.x + boardSize / 16, pixels.y + boardSize / 16, boardSize, isFlipped);
        mesh.position.x = pos3D.x;
        mesh.position.z = pos3D.z;
      }

      // Store board position for visibility checks
      const col = Math.floor(pixels.x / (boardSize / 8));
      const row = Math.floor(pixels.y / (boardSize / 8));
      mesh.userData.col = col;
      mesh.userData.row = row;

      if (pieceStyleOption.rotateForFlip) {
        mesh.rotation.z = isFlipped ? 0 : Math.PI;
      }
    });

    for (const [key, mesh] of pieceMeshMap.entries()) {
      if (!currentPieceIds.has(key)) {
        canvasScene.remove(mesh);
        if (mesh.geometry) mesh.geometry.dispose();
        if (mesh.material) mesh.material.dispose();
        pieceMeshMap.delete(key);
        const idx = piecesMeshes.indexOf(mesh);
        if (idx > -1) piecesMeshes.splice(idx, 1);
      }
    }

    const blindfoldActive = isBlindfoldMode();
    for (const mesh of piecesMeshes) {
      const col = mesh.userData.col;
      const row = mesh.userData.row;
      const inBlackedOutQuadrant = state.obfuscationsEnabled && isPositionInBlackedOutQuadrant(col, row);
      mesh.visible = !blindfoldActive && !inBlackedOutQuadrant;
    }
  }

  function update3DCameraAngle() {
    if (!canvasCamera) return;

    const angle = PARALLAX_OPTIONS[state.parallaxIndex].value;
    const angleRad = angle * Math.PI / 180;

    const distance = 15;
    const y = Math.cos(angleRad) * distance;
    const z = Math.sin(angleRad) * distance;

    const isFlipped = !isPlayerWhite();
    const zDirection = isFlipped ? 1 : -1;

    canvasCamera.position.set(0, y, z * zDirection);
    canvasCamera.up.set(0, 0, -1 * zDirection);
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

  function project3DToScreen(x3D, z3D) {
    if (!canvasCamera || !canvasRenderer) return null;

    const vector = new THREE.Vector3(x3D, 0, z3D);
    vector.project(canvasCamera);

    const canvas = canvasRenderer.domElement;
    const screenX = (vector.x * 0.5 + 0.5) * canvas.width / window.devicePixelRatio;
    const screenY = (-vector.y * 0.5 + 0.5) * canvas.height / window.devicePixelRatio;

    return { x: screenX, y: screenY };
  }

  function setupDragHandling() {
    const container = document.querySelector('cg-container');
    if (!container) return;

    container.addEventListener('mousemove', handleDragMove, true);
    container.addEventListener('mouseup', handleDragEnd, true);
    container.addEventListener('mouseleave', handleDragEnd, true);
  }

  function findDragging3DPiece() {
    const ghostPiece = document.querySelector('piece.ghost');
    if (!ghostPiece) return null;

    const pieceString = ghostPiece.className;
    const [_match, colour, type] = pieceString.match(/^(white|black)\s+(king|queen|rook|bishop|knight|pawn)/) || [];
    if (!colour || !type) return null;

    const pixels = getTransformPixels(ghostPiece);
    if (pixels) {
      const pieceId = `${colour}-${type}-${Math.round(pixels.x)}-${Math.round(pixels.y)}`;
      const exactMatch = pieceMeshMap.get(pieceId);
      if (exactMatch) return exactMatch;
    }

    for (const [key, mesh] of pieceMeshMap.entries()) {
      if (key.startsWith(`${colour}-${type}-`)) {
        return mesh;
      }
    }
    return null;
  }

  function handleDragMove(event) {
    if (!state.customBoardEnabled || !canvasScene) return;

    const draggingPiece = document.querySelector('piece.dragging');
    if (!draggingPiece) {
      if (dragging3DPiece) {
        handleDragEnd();
      }
      return;
    }

    if (!dragging3DPiece) {
      dragging3DPiece = findDragging3DPiece();
      if (!dragging3DPiece) return;
    }

    const pos3D = screenTo3DPosition(event.clientX, event.clientY);

    if (pos3D) {
      dragging3DPiece.position.x = pos3D.x;
      dragging3DPiece.position.z = pos3D.z;
      render3DCanvas();
    }
  }

  function handleDragEnd() {
    if (dragging3DPiece) {
      dragging3DPiece = null;
      update3DPieces();
      render3DCanvas();
    }
  }

  function screenTo3DPosition(clientX, clientY) {
    if (!canvasCamera || !canvasRenderer || !canvasScene) return null;

    const canvas = canvasRenderer.domElement;
    const rect = canvas.getBoundingClientRect();
    const ndcX = ((clientX - rect.left) / rect.width) * 2 - 1;
    const ndcY = -((clientY - rect.top) / rect.height) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(ndcX, ndcY), canvasCamera);

    const boardPlane = canvasScene.getObjectByName('boardPlane');
    if (!boardPlane) return null;

    const intersects = raycaster.intersectObject(boardPlane, true);
    if (intersects.length > 0) {
      return { x: intersects[0].point.x, z: intersects[0].point.z };
    }

    return null;
  }

  function animate3DCanvas(timestamp) {
    if (!canvasRenderer) {
      canvasAnimationId = null;
      return;
    }

    const isPollingSlideAnimation = timestamp < slideAnimationEndTime;
    const needsContinuousAnimation = isPollingSlideAnimation || state.hoverModeIndex > 0;

    const deltaTime = timestamp - lastFrameTime;
    const shouldRenderFrame = deltaTime >= FRAME_INTERVAL_MS;

    if (shouldRenderFrame) {
      lastFrameTime = timestamp - (deltaTime % FRAME_INTERVAL_MS);

      if (isPollingSlideAnimation) {
        update3DPieces();
      }

      if (state.hoverModeIndex > 0 && hoverStartTime !== null) {
        const elapsed = timestamp - hoverStartTime;
        const hoverScale = HOVER_MODE_OPTIONS[state.hoverModeIndex].scale;
        const baseAngle = PARALLAX_OPTIONS[state.parallaxIndex].value;
        const oscillationX = Math.sin(elapsed / HOVER_OSCILLATION_PERIOD_MS) * HOVER_OSCILLATION_ANGLE * hoverScale;
        const angleX = baseAngle + oscillationX;
        const angleRad = angleX * Math.PI / 180;

        const distance = 15;
        const y = Math.cos(angleRad) * distance;
        const z = Math.sin(angleRad) * distance;

        const isFlipped = !isPlayerWhite();
        const zDirection = isFlipped ? 1 : -1;

        canvasCamera.position.set(0, y, z * zDirection);

        const oscillationZ = Math.sin(elapsed / HOVER_OSCILLATION_Y_PERIOD_MS) * HOVER_OSCILLATION_Y_ANGLE * hoverScale;
        const oscillationZRad = oscillationZ * Math.PI / 180;
        canvasCamera.position.x = Math.sin(oscillationZRad) * distance * 0.1 * hoverScale;

        canvasCamera.up.set(0, 0, -1 * zDirection);
        canvasCamera.lookAt(0, 0, 0);
      }

      render3DCanvas();
    }

    if (needsContinuousAnimation) {
      canvasAnimationId = requestAnimationFrame(animate3DCanvas);
    } else {
      canvasAnimationId = null;
    }
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

    clear3DDrawings();
    clear3DDividers();

    dragging3DPiece = null;

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
    pieceMeshMap.clear();
    slideAnimationEndTime = 0;

    canvasScene = null;
    canvasCamera = null;

    const board = document.querySelector('cg-board:not(.userscript-custom-board)');
    if (board) {
      showOriginalBoard(board);
      showBoardPieces(board);
    }
  }

  function clear3DPieces() {
    if (!canvasScene) return;

    piecesMeshes.forEach(mesh => {
      canvasScene.remove(mesh);
      if (mesh.geometry) mesh.geometry.dispose();
      if (mesh.material) mesh.material.dispose();
    });
    piecesMeshes = [];
    pieceMeshMap.clear();
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
      setupDragHandling();
      setupBlindfoldObserver();
      if (state.hoverModeIndex > 0) {
        start3DAnimation();
      } else {
        render3DCanvas();
      }
      console.debug('[lichess-board-speaker] 3D mode initialization complete');
    } catch (error) {
      console.error('[lichess-board-speaker] Failed to initialize 3D mode:', error);
    }
  }

  const HOVER_OSCILLATION_ANGLE = 1.95;
  const HOVER_OSCILLATION_PERIOD_MS = 2000;
  const HOVER_OSCILLATION_Y_ANGLE = 1.95;
  const HOVER_OSCILLATION_Y_PERIOD_MS = 2500;
  let hoverAnimationId = null;
  let hoverStartTime = null;

  const SETTINGS_KEY = 'lichess-board-speaker-settings';

  function saveSettings() {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(state));
    console.debug('[lichess-board-speaker] settings saved', state);
  }

  function loadSettings() {
    try {
      const stored = localStorage.getItem(SETTINGS_KEY);
      if (!stored) return;

      const loaded = JSON.parse(stored);
      for (const key of Object.keys(state)) {
        if (loaded[key] !== undefined) {
          state[key] = loaded[key];
        }
      }

      console.debug('[lichess-board-speaker] settings loaded', state);
    } catch (error) {
      console.error('[lichess-board-speaker] failed to load settings', error);
    }
  }

  function updateButtonLabels() {
    for (const { setting, withSuffix } of SETTINGS_WITH_COMMAND_BUTTONS) {
      const element = commandButtons[formatCommand(setting.command)];
      if (!element) continue;
      if (element.tagName === 'SELECT') {
        element.selectedIndex = state[setting.stateKey];
      } else {
        element.innerText = setting.formatLabel({ withSuffix });
      }
    }

    for (const { setting } of SETTINGS_WITH_BOARD_MOD_BUTTONS) {
      updateSettingButtonLabel(setting, boardModificationButtons);
    }

    for (const { setting } of SETTINGS_WITH_OBFUSCATION_BUTTONS) {
      updateSettingButtonLabel(setting, obfuscationButtons);
    }

    for (const { setting } of SETTINGS_WITH_BLACK_SEGMENTS_BUTTONS) {
      updateSettingButtonLabel(setting, blackSegmentsButtons);
    }
  }

  function applyLoadedSettings() {
    const boardModContainer = document.querySelector('.board-mod-buttons-container');
    if (boardModContainer) {
      boardModContainer.style.display = state.customBoardEnabled ? 'block' : 'none';
    }

    const obfuscationsContainer = document.querySelector('.obfuscations-buttons-container');
    if (obfuscationsContainer) {
      obfuscationsContainer.style.display = state.obfuscationsEnabled ? 'block' : 'none';
    }

    const blackSegmentsContainer = document.querySelector('.black-segments-buttons-container');
    if (blackSegmentsContainer) {
      blackSegmentsContainer.style.display = state.blackSegmentsModeIndex > 0 ? 'block' : 'none';
    }

    // Start black segments interval if mode is active
    if (state.blackSegmentsModeIndex > 0 && state.obfuscationsEnabled && state.customBoardEnabled) {
      startBlackSegmentsInterval();
    }

    PIECES_LIST_SETTING.apply();

    if (!state.customBoardEnabled) {
      return;
    }

    if (state.parallaxIndex > 0 || state.pieceStyleIndex > 0) {
      applyParallaxTransform();
    }

    if (state.dividersEnabled) {
      drawDividers();
    }

    if (state.hoverModeIndex > 0) {
      startHoverMode();
    }

    if (state.blurIndex > 0) {
      applyBlur();
    }
  }

  const COMMAND_PREFIX = 'p';

  function formatCommand(commandName) {
    return `${COMMAND_PREFIX}${commandName}`;
  }

  const SPEAK_RATE_SETTING = {
    name: '🔊 rate',
    command: 'sr',
    stateKey: 'speakRateIndex',
    options: SPEAK_RATE_OPTIONS,
    formatLabel: ({ withSuffix }) => {
      const option = SPEAK_RATE_OPTIONS[state.speakRateIndex];
      const suffix = withSuffix ? ` (${formatCommand(SPEAK_RATE_SETTING.command)})` : '';
      return `Speak rate (${option.value})${suffix}`;
    },
    apply: () => {
      window.speechSynthesis.cancel();
      const option = SPEAK_RATE_OPTIONS[state.speakRateIndex];
      const isMax = state.speakRateIndex === SPEAK_RATE_OPTIONS.length - 1;
      setTimeout(() => speakString('Rate ' + option.value + (isMax ? ' max' : '')), 0);
    },
  };

  const PARALLAX_SETTING = {
    name: 'Parallax',
    command: 'px',
    stateKey: 'parallaxIndex',
    options: PARALLAX_OPTIONS,
    formatLabel: ({ withSuffix }) => {
      const option = PARALLAX_OPTIONS[state.parallaxIndex];
      const suffix = withSuffix ? ` (${formatCommand(PARALLAX_SETTING.command)})` : '';
      return `Parallax (req kb) (${option.value}°)${suffix}`;
    },
    apply: () => {
      if (canvasCamera) {
        update3DCameraAngle();
        render3DCanvas();
      } else {
        applyParallaxTransform();
      }
      if (state.dividersEnabled) {
        drawDividers();
      }
    },
  };

  const DIVIDERS_SETTING = {
    command: 'div',
    stateKey: 'dividersEnabled',
    options: [{ label: 'OFF' }, { label: 'ON' }],
    formatLabel: ({ withSuffix }) => {
      const suffix = withSuffix ? ` (${formatCommand(DIVIDERS_SETTING.command)})` : '';
      const status = state.dividersEnabled ? 'ON' : 'OFF';
      return `Dividers (${status})${suffix}`;
    },
    apply: () => {
      if (state.dividersEnabled) {
        drawDividers();
      } else {
        clearDividers();
      }
    },
  };

  const PIECE_STYLE_SETTING = {
    name: 'Piece style',
    command: 'ps',
    stateKey: 'pieceStyleIndex',
    options: PIECE_STYLE_OPTIONS,
    formatLabel: ({ withSuffix }) => {
      const option = PIECE_STYLE_OPTIONS[state.pieceStyleIndex];
      const suffix = withSuffix ? ` (${formatCommand(PIECE_STYLE_SETTING.command)})` : '';
      return `Piece style (${option.label})${suffix}`;
    },
    apply: () => {
      if (canvasScene) {
        clear3DPieces();
        update3DPieces();
        render3DCanvas();
      } else {
        applyParallaxTransform();
      }
    },
  };

  const HOVER_MODE_SETTING = {
    name: 'Hover',
    command: 'hv',
    stateKey: 'hoverModeIndex',
    options: HOVER_MODE_OPTIONS,
    formatLabel: ({ withSuffix }) => {
      const option = HOVER_MODE_OPTIONS[state.hoverModeIndex];
      const suffix = withSuffix ? ` (${formatCommand(HOVER_MODE_SETTING.command)})` : '';
      return `Hover mode (${option.label})${suffix}`;
    },
    apply: () => {
      if (state.hoverModeIndex > 0) {
        if (state.parallaxIndex === 0) {
          state.parallaxIndex = 3;
          updateSettingButtonLabel(PARALLAX_SETTING, boardModificationButtons);
          applyParallaxTransform();
        }
        startHoverMode();
      } else {
        stopHoverMode();
      }
    },
  };

  const BLUR_SETTING = {
    name: 'Blur',
    command: 'blur',
    stateKey: 'blurIndex',
    options: BLUR_OPTIONS,
    formatLabel: ({ withSuffix }) => {
      const option = BLUR_OPTIONS[state.blurIndex];
      const suffix = withSuffix ? ` (${formatCommand(BLUR_SETTING.command)})` : '';
      return `Blur (${option.value}px)${suffix}`;
    },
    apply: () => {
      applyBlur();
    },
  };

  const OBFUSCATIONS_SETTING = {
    command: 'obf',
    stateKey: 'obfuscationsEnabled',
    options: [{ label: 'OFF' }, { label: 'ON' }],
    formatLabel: ({ withSuffix }) => {
      const suffix = withSuffix ? ` (${formatCommand(OBFUSCATIONS_SETTING.command)})` : '';
      const status = state.obfuscationsEnabled ? 'ON' : 'OFF';
      return `Obfuscations (${status})${suffix}`;
    },
    apply: () => {
      const obfuscationsContainer = document.querySelector('.obfuscations-buttons-container');
      if (obfuscationsContainer) {
        obfuscationsContainer.style.display = state.obfuscationsEnabled ? 'block' : 'none';
      }
      if (state.obfuscationsEnabled && state.blackSegmentsModeIndex > 0) {
        restartBlackSegmentsInterval();
      } else {
        stopBlackSegmentsInterval();
      }
      if (canvasScene) {
        clear3DPieces();
        updateBlackSegments();
      } else {
        applyParallaxTransform();
      }
      applyBlur();
    },
  };

  const CUSTOM_BOARD_SETTING = {
    command: 'cb',
    stateKey: 'customBoardEnabled',
    options: [{ label: 'OFF' }, { label: 'ON' }],
    formatLabel: ({ withSuffix }) => {
      const suffix = withSuffix ? ` (${formatCommand(CUSTOM_BOARD_SETTING.command)})` : '';
      const status = state.customBoardEnabled ? 'ON' : 'OFF';
      return `Custom board (${status})${suffix}`;
    },
    apply: () => {
      const boardModContainer = document.querySelector('.board-mod-buttons-container');
      if (boardModContainer) {
        boardModContainer.style.display = state.customBoardEnabled ? 'block' : 'none';
      }
      if (state.customBoardEnabled) {
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
        stopBlackSegmentsInterval();
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
    },
  };

  const PIECES_LIST_SETTING = {
    command: 'l',
    stateKey: 'piecesListVisible',
    options: [{ label: 'OFF' }, { label: 'ON' }],
    formatLabel: ({ withSuffix }) => {
      const suffix = withSuffix ? ` (${formatCommand(PIECES_LIST_SETTING.command)})` : '';
      const status = state.piecesListVisible ? 'ON' : 'OFF';
      return `List pieces (${status})${suffix}`;
    },
    apply: () => {
      const buttonKey = formatCommand(PIECES_LIST_SETTING.command);
      const button = commandButtons[buttonKey];
      if (!button) return;

      let textBox = button.parentElement.querySelector('.pieces-list-box');
      if (!textBox) {
        textBox = document.createElement('div');
        textBox.className = 'pieces-list-box';
        textBox.style.boxSizing = 'border-box';
        textBox.style.width = 'calc(100% - 16px)';
        textBox.style.margin = '4px 8px 8px 16px';
        textBox.style.padding = '8px';
        textBox.style.border = '1px solid rgba(255, 255, 255, 0.3)';
        textBox.style.borderRadius = '4px';
        textBox.style.fontSize = '12px';
        textBox.style.lineHeight = '1.4';
        textBox.style.color = 'inherit';
        textBox.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
        button.insertAdjacentElement('afterend', textBox);
      }

      textBox.style.display = state.piecesListVisible ? 'block' : 'none';

      if (state.piecesListVisible) {
        renderPiecesList(textBox);
        setupPiecesListObserver(textBox);
      } else if (piecesListObserver) {
        piecesListObserver.disconnect();
        piecesListObserver = null;
      }
    },
  };

  const BLACK_SEGMENTS_MODE_SETTING = {
    name: 'Black segments',
    command: 'bs',
    stateKey: 'blackSegmentsModeIndex',
    options: BLACK_SEGMENTS_MODE_OPTIONS,
    formatLabel: ({ withSuffix }) => {
      const option = BLACK_SEGMENTS_MODE_OPTIONS[state.blackSegmentsModeIndex];
      const suffix = withSuffix ? ` (${formatCommand(BLACK_SEGMENTS_MODE_SETTING.command)})` : '';
      return `Black segments (${option.label})${suffix}`;
    },
    apply: () => {
      const blackSegmentsContainer = document.querySelector('.black-segments-buttons-container');
      if (blackSegmentsContainer) {
        blackSegmentsContainer.style.display = state.blackSegmentsModeIndex > 0 ? 'block' : 'none';
      }
      if (state.blackSegmentsModeIndex > 0) {
        restartBlackSegmentsInterval();
      } else {
        stopBlackSegmentsInterval();
      }
      updateBlackSegments();
    },
  };

  const BLACK_SEGMENTS_TIMING_SETTING = {
    name: 'Timing',
    command: 'bst',
    stateKey: 'blackSegmentsTimingIndex',
    options: BLACK_SEGMENTS_TIMING_OPTIONS,
    formatLabel: ({ withSuffix }) => {
      const option = BLACK_SEGMENTS_TIMING_OPTIONS[state.blackSegmentsTimingIndex];
      const suffix = withSuffix ? ` (${formatCommand(BLACK_SEGMENTS_TIMING_SETTING.command)})` : '';
      return `${option.label}${suffix}`;
    },
    apply: () => {
      restartBlackSegmentsInterval();
    },
  };

  const SETTINGS_WITH_COMMAND_BUTTONS = [
    { setting: SPEAK_RATE_SETTING, withSuffix: true },
    { setting: PIECES_LIST_SETTING, withSuffix: true },
    { setting: CUSTOM_BOARD_SETTING, withSuffix: true },
  ];

  const SETTINGS_WITH_BOARD_MOD_BUTTONS = [
    { setting: PARALLAX_SETTING },
    { setting: DIVIDERS_SETTING },
    { setting: HOVER_MODE_SETTING },
    { setting: OBFUSCATIONS_SETTING },
  ];

  const SETTINGS_WITH_OBFUSCATION_BUTTONS = [
    { setting: PIECE_STYLE_SETTING },
    { setting: BLUR_SETTING },
    { setting: BLACK_SEGMENTS_MODE_SETTING },
  ];

  const SETTINGS_WITH_BLACK_SEGMENTS_BUTTONS = [
    { setting: BLACK_SEGMENTS_TIMING_SETTING },
  ];

  function updateSettingButtonLabel(setting, buttonMap, { buttonKey, withSuffix } = {}) {
    const key = buttonKey || setting.command;
    const element = buttonMap[key];
    if (!element) return;
    if (element.tagName === 'SELECT') {
      element.selectedIndex = state[setting.stateKey];
    } else {
      element.innerText = setting.formatLabel({ withSuffix: withSuffix || false });
    }
  }

  function cycleSetting(setting, buttonMap, { buttonKey, withSuffix } = {}) {
    if (!state.customBoardEnabled && setting !== SPEAK_RATE_SETTING) return;
    state[setting.stateKey] = (state[setting.stateKey] + 1) % setting.options.length;
    updateSettingButtonLabel(setting, buttonMap, { buttonKey, withSuffix });
    setting.apply();
    saveSettings();
  }

  const commandButtons = {};
  const boardModificationButtons = {};
  const obfuscationButtons = {};
  const blackSegmentsButtons = {};

  const COMMANDS = {
    wk: {
      fullName: "🔊 ♔ side",
      tooltip: "Speak white's king-side",
      exec: () => generateFullMessagesAndSpeak(({ col, row }) => col >= 5 && row <= 4)
    },
    wq: {
      fullName: "🔊 ♕ side",
      tooltip: "Speak white's queen-side",
      exec: () => generateFullMessagesAndSpeak(({ col, row }) => col <= 4 && row <= 4)
    },
    bk: {
      fullName: "🔊 ♚ side",
      tooltip: "Speak black's king-side",
      exec: () => generateFullMessagesAndSpeak(({ col, row }) => col >= 5 && row >= 5)
    },
    bq: {
      fullName: "🔊 ♛ side",
      tooltip: "Speak black's queen-side",
      exec: () => generateFullMessagesAndSpeak(({ col, row }) => col <= 4 && row >= 5)
    },

    a: {
      fullName: '🔊 all pieces',
      tooltip: 'Speak all pieces',
      exec: () => generateFullMessagesAndSpeak(() => true)
    },
    ww: {
      fullName: "🔊 w's pieces",
      tooltip: "Speak white's pieces",
      exec: () => generateFullMessagesAndSpeak(({ row }) => row <= 4)
    },
    bb: {
      fullName: "🔊 b's pieces",
      tooltip: "Speak black's pieces",
      exec: () => generateFullMessagesAndSpeak(({ row }) => row >= 5)
    },

    [SPEAK_RATE_SETTING.command]: {
      setting: SPEAK_RATE_SETTING,
      fullName: SPEAK_RATE_SETTING.formatLabel({ withSuffix: false }),
      exec: () => cycleSetting(SPEAK_RATE_SETTING, commandButtons, { buttonKey: formatCommand(SPEAK_RATE_SETTING.command), withSuffix: true }),
    },
    ss: {
      fullName: '🔊 Stop',
      exec: () => window.speechSynthesis.cancel()
    },

    [PIECES_LIST_SETTING.command]: {
      fullName: PIECES_LIST_SETTING.formatLabel({ withSuffix: false }),
      tooltip: 'List pieces (shows who you are and whose turn it is)',
      exec: () => togglePiecesList(),
    },

    "-annotate": {
      fullName: 'Annotate board',
      exec: setExampleAnnotation
    },

    [CUSTOM_BOARD_SETTING.command]: {
      fullName: CUSTOM_BOARD_SETTING.formatLabel({ withSuffix: false }),
      exec: () => toggleCustomBoard(),
    },
  };

  const BOARD_MODIFICATION_COMMANDS = {
    [PARALLAX_SETTING.command]: {
      setting: PARALLAX_SETTING,
      fullName: PARALLAX_SETTING.formatLabel({ withSuffix: false }),
      exec: () => cycleSetting(PARALLAX_SETTING, boardModificationButtons),
    },
    [DIVIDERS_SETTING.command]: {
      fullName: DIVIDERS_SETTING.formatLabel({ withSuffix: false }),
      exec: () => toggleDividers(),
    },
    [HOVER_MODE_SETTING.command]: {
      setting: HOVER_MODE_SETTING,
      fullName: HOVER_MODE_SETTING.formatLabel({ withSuffix: false }),
      exec: () => toggleHoverMode(),
    },
    [OBFUSCATIONS_SETTING.command]: {
      fullName: OBFUSCATIONS_SETTING.formatLabel({ withSuffix: false }),
      exec: () => toggleObfuscations(),
    },
  };

  const BOARD_MOD_BUTTON_GROUPS = [
    [PARALLAX_SETTING.command, DIVIDERS_SETTING.command, HOVER_MODE_SETTING.command],
  ];

  const OBFUSCATION_COMMANDS = {
    [PIECE_STYLE_SETTING.command]: {
      setting: PIECE_STYLE_SETTING,
      fullName: PIECE_STYLE_SETTING.formatLabel({ withSuffix: false }),
      exec: () => cycleSetting(PIECE_STYLE_SETTING, obfuscationButtons),
    },
    [BLUR_SETTING.command]: {
      setting: BLUR_SETTING,
      fullName: BLUR_SETTING.formatLabel({ withSuffix: false }),
      exec: () => cycleSetting(BLUR_SETTING, obfuscationButtons),
    },
    [BLACK_SEGMENTS_MODE_SETTING.command]: {
      setting: BLACK_SEGMENTS_MODE_SETTING,
      fullName: BLACK_SEGMENTS_MODE_SETTING.formatLabel({ withSuffix: false }),
      exec: () => toggleBlackSegmentsMode(),
      hasNested: true,
    },
  };

  const BLACK_SEGMENTS_COMMANDS = {
    [BLACK_SEGMENTS_TIMING_SETTING.command]: {
      setting: BLACK_SEGMENTS_TIMING_SETTING,
      fullName: BLACK_SEGMENTS_TIMING_SETTING.formatLabel({ withSuffix: false }),
      exec: () => cycleSetting(BLACK_SEGMENTS_TIMING_SETTING, blackSegmentsButtons),
    },
  };

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
    clear3DDrawings();
    if (canvasScene) {
      render3DCanvas();
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

  function squareTo3DCoordinates(square) {
    const fileIndex = square.file.charCodeAt(0) - 'a'.charCodeAt(0);
    const rankIndex = parseInt(square.rank) - 1;

    const x = 3.5 - fileIndex;
    const z = rankIndex - 3.5;

    return { x, z };
  }

  function clear3DDrawings() {
    if (!canvasScene) return;

    for (const obj of drawing3DObjects) {
      canvasScene.remove(obj);
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) obj.material.dispose();
      if (obj.children) {
        obj.children.forEach(child => {
          if (child.geometry) child.geometry.dispose();
          if (child.material) child.material.dispose();
        });
      }
    }
    drawing3DObjects = [];
  }

  function create3DCircle(x, z) {
    const geometry = new THREE.TorusGeometry(0.35, 0.06, 8, 32);
    const material = new THREE.MeshStandardMaterial({
      color: 0xff6b6b,
      roughness: 0.5,
      metalness: 0.1,
    });
    const torus = new THREE.Mesh(geometry, material);
    torus.position.set(x, 0.05, z);
    torus.rotation.x = -Math.PI / 2;
    return torus;
  }

  function create3DArrow(x1, z1, x2, z2) {
    const group = new THREE.Group();

    const dx = x2 - x1;
    const dz = z2 - z1;
    const length = Math.sqrt(dx * dx + dz * dz);
    const angle = Math.atan2(-dx, -dz);

    const arrowHeadLength = 0.45;
    const shaftLength = length - arrowHeadLength;

    const shaftGeometry = new THREE.CylinderGeometry(0.07, 0.07, shaftLength, 8);
    const shaftMaterial = new THREE.MeshStandardMaterial({
      color: 0xff6b6b,
      roughness: 0.5,
      metalness: 0.1,
    });
    const shaft = new THREE.Mesh(shaftGeometry, shaftMaterial);
    shaft.position.set(0, 0, -shaftLength / 2);
    shaft.rotation.x = Math.PI / 2;
    group.add(shaft);

    const headGeometry = new THREE.ConeGeometry(0.22, arrowHeadLength, 8);
    const headMaterial = new THREE.MeshStandardMaterial({
      color: 0xff6b6b,
      roughness: 0.5,
      metalness: 0.1,
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.set(0, 0, -(shaftLength + arrowHeadLength / 2));
    head.rotation.x = -Math.PI / 2;
    group.add(head);

    group.position.set(x1, 0.08, z1);
    group.rotation.y = angle;

    return group;
  }

  function update3DDrawings(command) {
    clear3DDrawings();

    const drawingData = parseDrawingCommand(command);
    if (!drawingData || !canvasScene) return;

    for (const square of drawingData.circles) {
      const coords = squareTo3DCoordinates(square);
      const circle = create3DCircle(coords.x, coords.z);
      canvasScene.add(circle);
      drawing3DObjects.push(circle);
    }

    for (const arrow of drawingData.arrows) {
      const fromCoords = squareTo3DCoordinates(arrow.from);
      const toCoords = squareTo3DCoordinates(arrow.to);
      const arrow3D = create3DArrow(fromCoords.x, fromCoords.z, toCoords.x, toCoords.z);
      canvasScene.add(arrow3D);
      drawing3DObjects.push(arrow3D);
    }

    render3DCanvas();
  }

  function clear3DDividers() {
    if (!canvasScene) return;

    for (const obj of divider3DObjects) {
      canvasScene.remove(obj);
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) obj.material.dispose();
    }
    divider3DObjects = [];
  }

  function draw3DDividers() {
    clear3DDividers();

    if (!canvasScene) return;

    const dividerMaterial = new THREE.MeshStandardMaterial({
      color: 0x000000,
      roughness: 0.5,
      metalness: 0.1,
    });

    const horizontalGeometry = new THREE.BoxGeometry(8, 0.08, 0.08);
    const horizontalDivider = new THREE.Mesh(horizontalGeometry, dividerMaterial.clone());
    horizontalDivider.position.set(0, 0.04, 0);
    canvasScene.add(horizontalDivider);
    divider3DObjects.push(horizontalDivider);

    const verticalGeometry = new THREE.BoxGeometry(0.08, 0.08, 8);
    const verticalDivider = new THREE.Mesh(verticalGeometry, dividerMaterial.clone());
    verticalDivider.position.set(0, 0.04, 0);
    canvasScene.add(verticalDivider);
    divider3DObjects.push(verticalDivider);

    render3DCanvas();
  }

  function updateDrawings(command) {
    if (state.customBoardEnabled && canvasScene) {
      update3DDrawings(command);
      return;
    }

    clearDrawings();

    const drawingData = parseDrawingCommand(command);
    if (!drawingData) return;

    const svg = createOrGetSVG();
    if (!svg) return;

    const container = document.querySelector('cg-container');
    const boardSize = container.offsetWidth;
    const isFlipped = !isPlayerWhite();

    for (const square of drawingData.circles) {
      const coords = squareToCoordinates(square, boardSize, isFlipped);
      drawCircle(svg, coords.x, coords.y, boardSize);
    }

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
        const [_match, colour, type] = pieceString.match(/^(white|black)\s+(king|queen|rook|bishop|knight|pawn)(?:\s+anim)?$/) || [];
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
    utt.rate = SPEAK_RATE_OPTIONS[state.speakRateIndex].value;
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
    container.style.marginRight = '16px';
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
    container.style.display = state.customBoardEnabled ? 'block' : 'none';
    parentContainer.appendChild(container);
    return container;
  }

  const COMMAND_BUTTON_GROUPS = [
    ['pwk', 'pwq', 'pbk', 'pbq'],
    ['pa', 'pww', 'pbb'],
    ['psr', 'pss'],
  ];

  function getCommandButtonGroup(commandName) {
    return COMMAND_BUTTON_GROUPS.find(group => group.includes(commandName));
  }

  function createSettingDropdown(setting, buttonMap, { inline, mapKey } = { inline: false }) {
    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.alignItems = 'center';
    wrapper.style.gap = '4px';

    wrapper.style.border = '1px solid rgba(255, 255, 255, 0.15)';
    wrapper.style.borderRadius = '4px';
    wrapper.style.padding = '2px 4px';

    if (inline) {
      wrapper.style.flex = '1 1 0';
    } else {
      wrapper.style.width = '100%';
      wrapper.style.margin = '8px';
    }

    const label = document.createElement('label');
    label.innerText = setting.name;
    label.style.whiteSpace = 'nowrap';

    const select = document.createElement('select');
    select.style.padding = '2px';
    select.style.border = '1px solid rgba(255, 255, 255, 0.3)';
    select.style.borderRadius = '4px';
    select.style.background = 'transparent';
    select.style.color = 'inherit';
    select.style.colorScheme = 'dark';
    select.title = `${setting.name} (${formatCommand(setting.command)})`;

    setting.options.forEach((option) => {
      const opt = document.createElement('option');
      opt.text = option.label;
      select.appendChild(opt);
    });

    select.selectedIndex = state[setting.stateKey];

    select.addEventListener('change', () => {
      if (!state.customBoardEnabled && setting !== SPEAK_RATE_SETTING) return;
      state[setting.stateKey] = select.selectedIndex;
      setting.apply();
      saveSettings();
    });

    wrapper.appendChild(label);
    wrapper.appendChild(select);

    buttonMap[mapKey || setting.command] = select;
    return wrapper;
  }

  function createButtonGroupRow() {
    const row = document.createElement('div');
    row.style.display = 'flex';
    row.style.flexWrap = 'wrap';
    row.style.width = '100%';
    row.style.gap = '4px';
    row.style.margin = '8px';
    return row;
  }

  function createCommandElement(commandName, { inline } = { inline: false }) {
    const command = COMMANDS_WITH_PREFIX[commandName];
    if (command.setting) {
      return createSettingDropdown(command.setting, commandButtons, { inline, mapKey: commandName });
    }
    return createCommandButton(commandName, { inline });
  }

  function createButtons(container) {
    const processedGroups = new Set();

    Object
      .keys(COMMANDS_WITH_PREFIX)
      .forEach(commandName => {
        const group = getCommandButtonGroup(commandName);

        if (!group) {
          container.appendChild(createCommandElement(commandName, { inline: false }));
          return;
        }

        const groupKey = group.join(',');
        if (processedGroups.has(groupKey)) return;
        processedGroups.add(groupKey);

        const row = createButtonGroupRow();
        group.forEach(name => {
          row.appendChild(createCommandElement(name, { inline: true }));
        });
        container.appendChild(row);
      });
  }

  function getBoardModButtonGroup(commandName) {
    return BOARD_MOD_BUTTON_GROUPS.find(group => group.includes(commandName));
  }

  function createBoardModElement(commandName, { inline } = { inline: false }) {
    const command = BOARD_MODIFICATION_COMMANDS[commandName];
    if (command.setting) {
      return createSettingDropdown(command.setting, boardModificationButtons, { inline });
    }
    return createBoardModButton(commandName, { inline });
  }

  function createBoardModButtons(container) {
    const processedGroups = new Set();

    Object
      .keys(BOARD_MODIFICATION_COMMANDS)
      .forEach(commandName => {
        const group = getBoardModButtonGroup(commandName);

        if (!group) {
          container.appendChild(createBoardModElement(commandName, { inline: false }));
          return;
        }

        const groupKey = group.join(',');
        if (processedGroups.has(groupKey)) return;
        processedGroups.add(groupKey);

        const row = createButtonGroupRow();
        group.forEach(name => {
          row.appendChild(createBoardModElement(name, { inline: true }));
        });
        container.appendChild(row);
      });
  }

  function createObfuscationsButtonContainer(parentContainer) {
    const container = document.createElement('div');
    container.classList.add('obfuscations-buttons-container');
    container.style.marginLeft = '16px';
    container.style.display = state.obfuscationsEnabled ? 'block' : 'none';
    parentContainer.appendChild(container);
    return container;
  }

  function createObfuscationButtons(container) {
    const row = createButtonGroupRow();
    container.appendChild(row);

    Object
      .keys(OBFUSCATION_COMMANDS)
      .forEach(commandName => {
        const command = OBFUSCATION_COMMANDS[commandName];
        if (command.setting) {
          row.appendChild(createSettingDropdown(command.setting, obfuscationButtons, { inline: true }));
        } else {
          row.appendChild(createObfuscationButton(commandName));
        }

        if (command.hasNested) {
          const nestedContainer = createBlackSegmentsButtonContainer(container);
          createBlackSegmentsButtons(nestedContainer);
        }
      });
  }

  function createObfuscationButton(commandName) {
    const command = OBFUSCATION_COMMANDS[commandName];
    const { fullName, exec } = command;

    const button = document.createElement('button');
    button.innerText = fullName;
    button.title = fullName;
    button.style.display = 'block';
    button.style.width = '100%';
    button.style.padding = '2px';
    button.style.margin = '8px';
    button.style.border = '1px solid rgba(255, 255, 255, 0.3)';
    button.style.borderRadius = '4px';
    button.style.textAlign = 'left';

    button.addEventListener('click', () => {
      console.debug('[lichess-board-speaker] obfuscation button clicked', { fullName });
      exec();
    });

    obfuscationButtons[commandName] = button;
    return button;
  }

  function createBlackSegmentsButtonContainer(parentContainer) {
    const container = document.createElement('div');
    container.classList.add('black-segments-buttons-container');
    container.style.marginLeft = '24px';
    container.style.display = state.blackSegmentsModeIndex > 0 ? 'block' : 'none';
    parentContainer.appendChild(container);
    return container;
  }

  function createBlackSegmentsButtons(container) {
    Object
      .keys(BLACK_SEGMENTS_COMMANDS)
      .forEach(commandName => {
        const command = BLACK_SEGMENTS_COMMANDS[commandName];
        if (command.setting) {
          container.appendChild(createSettingDropdown(command.setting, blackSegmentsButtons));
        } else {
          container.appendChild(createBlackSegmentsButton(commandName));
        }
      });
  }

  function createBlackSegmentsButton(commandName) {
    const command = BLACK_SEGMENTS_COMMANDS[commandName];
    const { fullName, exec } = command;

    const button = document.createElement('button');
    button.innerText = fullName;
    button.title = fullName;
    button.style.display = 'block';
    button.style.width = '100%';
    button.style.padding = '2px';
    button.style.margin = '8px';
    button.style.border = '1px solid rgba(255, 255, 255, 0.3)';
    button.style.borderRadius = '4px';
    button.style.textAlign = 'left';

    button.addEventListener('click', () => {
      console.debug('[lichess-board-speaker] black segments button clicked', { fullName });
      exec();
    });

    blackSegmentsButtons[commandName] = button;
    return button;
  }

  function generateFullMessagesAndSpeak(filter) {
    const msgs = generateFullMessages(filter);
    speakMessages(msgs);
  }


  let parallaxObserver = null;
  let resizeObserver = null;
  let boardReplacementObserver = null;
  let blindfoldObserver = null;
  let piecesListObserver = null;
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
    if (blindfoldObserver) {
      blindfoldObserver.disconnect();
      blindfoldObserver = null;
    }
  }

  function setupBlindfoldObserver() {
    if (blindfoldObserver) {
      blindfoldObserver.disconnect();
    }

    const boardContainer = document.querySelector('.puzzle__board, .main-board');
    if (!boardContainer) return;

    blindfoldObserver = new MutationObserver(() => {
      update3DPieces();
      render3DCanvas();
    });

    blindfoldObserver.observe(boardContainer, {
      attributes: true,
      attributeFilter: ['class'],
    });
  }

  function healthCheck() {
    if (!state.customBoardEnabled) return;

    const board = document.querySelector('cg-board:not(.userscript-custom-board)');
    if (!board) return;

    const needsCustomBoard = state.parallaxIndex > 0 || state.pieceStyleIndex > 0;
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

            if (state.customBoardEnabled) {
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
    if (state.dividersEnabled) {
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

    const angle = PARALLAX_OPTIONS[state.parallaxIndex].value;
    const needsCustomBoard = angle > 0 || state.pieceStyleIndex > 0;

    if (!needsCustomBoard) {
      showOriginalBoard(board);
      showBoardPieces(board);
      removeCustomBoardElement();
      cleanup3DCanvas();

      cleanupBoardObservers();

      if (state.hoverModeIndex > 0) {
        state.hoverModeIndex = 0;
        updateSettingButtonLabel(HOVER_MODE_SETTING, boardModificationButtons);
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

      slideAnimationEndTime = performance.now() + SLIDE_ANIMATION_POLL_DURATION_MS;
      if (canvasAnimationId === null) {
        start3DAnimation();
      }
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

  function startHoverMode() {
    start3DAnimation();
  }

  function stopHoverMode() {
    stop3DAnimation();
    update3DCameraAngle();
    render3DCanvas();
  }

  function toggleHoverMode() {
    if (!state.customBoardEnabled) return;

    state.hoverModeIndex = (state.hoverModeIndex + 1) % HOVER_MODE_OPTIONS.length;
    updateSettingButtonLabel(HOVER_MODE_SETTING, boardModificationButtons);
    HOVER_MODE_SETTING.apply();
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
    if (state.customBoardEnabled && canvasScene) {
      draw3DDividers();
      return;
    }

    const svg = createOrGetDividersSVG();
    if (!svg) return;

    svg.innerHTML = '';

    const board = document.querySelector('cg-board:not(.userscript-custom-board)');
    if (!board) return;

    const boardSize = board.offsetWidth;
    const midPoint = boardSize / 2;

    const angle = PARALLAX_OPTIONS[state.parallaxIndex].value;
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
    clear3DDividers();
    if (canvasScene) {
      render3DCanvas();
    }
  }

  function toggleDividers() {
    if (!state.customBoardEnabled) return;

    state.dividersEnabled = !state.dividersEnabled;
    updateSettingButtonLabel(DIVIDERS_SETTING, boardModificationButtons);
    DIVIDERS_SETTING.apply();
    saveSettings();
  }

  function applyBlur() {
    const container = document.querySelector('cg-container');
    if (!container) return;

    const blurAmount = state.obfuscationsEnabled ? BLUR_OPTIONS[state.blurIndex].value : 0;
    if (blurAmount === 0) {
      container.style.filter = '';
    } else {
      container.style.filter = `blur(${blurAmount}px)`;
    }
  }

  function getBlackedOutQuadrants() {
    const option = BLACK_SEGMENTS_MODE_OPTIONS[state.blackSegmentsModeIndex];
    return option.getQuadrants(blackSegmentsCounter);
  }

  function isPositionInBlackedOutQuadrant(screenCol, screenRow) {
    const blackedOut = getBlackedOutQuadrants();
    if (blackedOut.length === 0) return false;

    const isLeft = screenCol < 4;
    const isTop = screenRow < 4;

    let quadrant;
    if (isTop && isLeft) quadrant = 0;
    else if (isTop && !isLeft) quadrant = 1;
    else if (!isTop && isLeft) quadrant = 2;
    else quadrant = 3;

    return blackedOut.includes(quadrant);
  }

  function startBlackSegmentsInterval() {
    if (blackSegmentsIntervalId) return;

    const timing = BLACK_SEGMENTS_TIMING_OPTIONS[state.blackSegmentsTimingIndex].value;
    if (timing === null) return;

    blackSegmentsIntervalId = setInterval(() => {
      blackSegmentsCounter++;
      updateBlackSegments();
    }, timing * 1000);
  }

  function stopBlackSegmentsInterval() {
    if (blackSegmentsIntervalId) {
      clearInterval(blackSegmentsIntervalId);
      blackSegmentsIntervalId = null;
    }
  }

  function restartBlackSegmentsInterval() {
    stopBlackSegmentsInterval();
    if (state.blackSegmentsModeIndex > 0 && state.obfuscationsEnabled && state.customBoardEnabled) {
      startBlackSegmentsInterval();
    }
  }

  function updateBlackSegments() {
    if (!canvasScene) return;

    // Update board plane
    const existingBoard = canvasScene.getObjectByName('boardPlane');
    if (existingBoard) {
      canvasScene.remove(existingBoard);
      existingBoard.traverse((child) => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) child.material.dispose();
      });
    }

    const boardPlane = createBoardPlane();
    boardPlane.name = 'boardPlane';
    canvasScene.add(boardPlane);

    // Update piece visibility
    update3DPieces();
    render3DCanvas();
  }

  function toggleBlackSegmentsMode() {
    if (!state.customBoardEnabled) return;

    state.blackSegmentsModeIndex = (state.blackSegmentsModeIndex + 1) % BLACK_SEGMENTS_MODE_OPTIONS.length;
    updateSettingButtonLabel(BLACK_SEGMENTS_MODE_SETTING, obfuscationButtons);
    BLACK_SEGMENTS_MODE_SETTING.apply();
    saveSettings();
  }

  function toggleObfuscations() {
    if (!state.customBoardEnabled) return;

    state.obfuscationsEnabled = !state.obfuscationsEnabled;
    updateSettingButtonLabel(OBFUSCATIONS_SETTING, boardModificationButtons);
    OBFUSCATIONS_SETTING.apply();
    saveSettings();
  }

  function toggleCustomBoard() {
    state.customBoardEnabled = !state.customBoardEnabled;

    const button = commandButtons[formatCommand(CUSTOM_BOARD_SETTING.command)];
    if (button) {
      button.innerText = CUSTOM_BOARD_SETTING.formatLabel({ withSuffix: true });
    }

    CUSTOM_BOARD_SETTING.apply();
    saveSettings();
  }

  function renderPiecesList(textBox) {
    const playerIsWhite = isPlayerWhite();
    const pieces = getPiecePositions(playerIsWhite);
    const piecesGrouped = groupPiecesByColourAndType(pieces);

    const playerColour = playerIsWhite ? 'white' : 'black';

    textBox.innerHTML = '';

    const headerEl = document.createElement('div');
    headerEl.textContent = `You: ${playerColour}`;
    headerEl.style.marginBottom = '6px';
    textBox.appendChild(headerEl);

    Object.entries(piecesGrouped).forEach(([colour, piecesByType]) => {
      const colourHeader = document.createElement('div');
      colourHeader.textContent = `${colour.toUpperCase()}:`;
      colourHeader.style.fontWeight = 'bold';
      colourHeader.style.marginTop = '4px';
      textBox.appendChild(colourHeader);

      const table = document.createElement('table');
      table.style.borderCollapse = 'collapse';

      Object.entries(piecesByType).forEach(([type, typePieces]) => {
        const row = table.insertRow();
        const typeCell = row.insertCell();
        typeCell.textContent = type;
        typeCell.style.paddingRight = '8px';
        typeCell.style.whiteSpace = 'nowrap';
        typeCell.style.verticalAlign = 'top';
        typeCell.style.opacity = '0.7';
        const posCell = row.insertCell();
        posCell.textContent = typePieces.length === 0
          ? '-'
          : typePieces.map(generateDisplayablePosition).join(' ');
      });

      textBox.appendChild(table);
    });
  }

  function setupPiecesListObserver(textBox) {
    if (piecesListObserver) {
      piecesListObserver.disconnect();
      piecesListObserver = null;
    }

    const board = document.querySelector('cg-board:not(.userscript-custom-board)');
    if (!board) return;

    piecesListObserver = new MutationObserver(() => {
      const board = document.querySelector('cg-board:not(.userscript-custom-board)');
      if (board && board.querySelector('piece.anim')) return;
      renderPiecesList(textBox);
    });

    piecesListObserver.observe(board, {
      childList: true,
      attributes: true,
      subtree: true,
    });
  }

  function togglePiecesList() {
    state.piecesListVisible = !state.piecesListVisible;
    updateSettingButtonLabel(PIECES_LIST_SETTING, commandButtons, { buttonKey: formatCommand(PIECES_LIST_SETTING.command), withSuffix: true });
    PIECES_LIST_SETTING.apply();
    saveSettings();
  }

  function createCommandButton(commandName, { inline } = { inline: false }) {
    const command = COMMANDS_WITH_PREFIX[commandName];
    const { fullName, tooltip, exec } = command;

    const button = document.createElement('button');
    button.title = `${tooltip || fullName} (${commandName})`;
    button.style.padding = '2px';
    button.style.border = '1px solid rgba(255, 255, 255, 0.3)';
    button.style.borderRadius = '4px';
    button.style.textAlign = 'left';

    button.innerText = `${fullName} (${commandName})`;

    if (inline) {
      button.style.display = 'inline-block';
      button.style.flex = '1 1 0';
    } else {
      button.style.display = 'block';
      button.style.width = '100%';
      button.style.margin = '8px';
    }

    button.addEventListener('click', () => {
      console.debug('[lichess-board-speaker] button clicked', { fullName });
      exec();
    });

    commandButtons[commandName] = button;
    return button;
  }

  function createBoardModButton(commandName, { inline } = { inline: false }) {
    const command = BOARD_MODIFICATION_COMMANDS[commandName];
    const { fullName, exec } = command;

    const button = document.createElement('button');
    button.title = fullName;
    button.style.padding = '2px';
    button.style.border = '1px solid rgba(255, 255, 255, 0.3)';
    button.style.borderRadius = '4px';
    button.style.textAlign = 'left';

    if (inline) {
      button.innerText = fullName;
      button.style.display = 'inline-block';
      button.style.flex = '1 1 0';
    } else {
      button.innerText = fullName;
      button.style.display = 'block';
      button.style.width = '100%';
      button.style.margin = '8px';
    }

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

    if (state.customBoardEnabled) {
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
