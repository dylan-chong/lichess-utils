// ==UserScript==
// @name        lichess-board-speaker
// @description This is your new file, start writing code
// @match       *://lichess.org/*
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

  function formatSpeakRateButtonText({ withSuffix }) {
    const suffix = withSuffix ? ` (${formatCommand(SPEAK_RATE_COMMAND)})` : '';
    return `Speak rate (${SPEAK_RATES[currentSpeakRateIndex]}) ${suffix}`;
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
      exec: () => displayPiecesList()
    }
  };

  function formatCommand(commandName) {
    return `${COMMAND_PREFIX}${commandName}`;
  }

  const COMMANDS_WITH_PREFIX = Object.fromEntries(
    Object
      .entries(COMMANDS)
      .map(([name, command]) => [formatCommand(name), command])
  );

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
    const pieces = document.querySelectorAll('cg-board piece');
    const squareSize = document.querySelector('cg-board').offsetWidth / 8;

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

  function removeWrongOnInput(moveInput) {
    const possibleCommand = findPossibleCommandMatch(moveInput.value);
    if (!possibleCommand) return;
    moveInput.classList.remove('wrong');
  }

  function userInputChanged(moveInput) {
    const value = moveInput.value;
    const command = COMMANDS_WITH_PREFIX[value];
    if (!command) return;

    console.debug('[lichess-board-speaker] command triggered', { value });
    moveInput.value = '';

    command.exec();
  }

  function createButtonContainer(parentContainer) {
    const container = document.createElement('div');
    container.style.marginLeft = '8px';
    parentContainer.appendChild(container);
    return container;
  }

  function createButtons(container) {
    Object
      .keys(COMMANDS_WITH_PREFIX)
      .map(createCommandButton)
      .map(button => container.appendChild(button));
  }

  function generateFullMessagesAndSpeak(filter) {
    const msgs = generateFullMessages(filter);
    speakMessages(msgs);
  }

  function changeSpeakRate() {
    currentSpeakRateIndex = (currentSpeakRateIndex + 1) % SPEAK_RATES.length;

    const button = COMMANDS[SPEAK_RATE_COMMAND].button;
    button.innerText = formatSpeakRateButtonText({ withSuffix: true });

    const suffix = currentSpeakRateIndex === SPEAK_RATES.length - 1 ? ' max' : '';
    speakString('Rate ' + SPEAK_RATES[currentSpeakRateIndex] + suffix);
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

    command.button = button;
    return button;
  }

  function setupMoveInputListeners(moveInput) {
    moveInput.addEventListener('input', (_event) => userInputChanged(moveInput));

    setInterval(() => removeWrongOnInput(moveInput), 50);

    console.debug('[lichess-board-speaker] input listeners set up');
  }

  function setup() {
    console.debug('[lichess-board-speaker] starting setup');

    const moveInput = document.querySelector('.keyboard-move input');
    if (!moveInput) {
      setTimeout(setup, 250);
      return;
    }

    setupMoveInputListeners(moveInput);
    const buttonContainer = createButtonContainer(moveInput.parentNode);
    createButtons(buttonContainer);
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
