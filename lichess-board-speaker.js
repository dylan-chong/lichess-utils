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

(function () {
  const SPEAK_RATE = 0.5;
  const SILENT_PAUSE = '........ wait ........';

  const COMMAND = 'pcs';

  const SQUARE_FILTERS = {
    a: ({ col, row }) => true,
    /** white-kingside quadrant */
    wk: ({ col, row }) => col >= 5 && row <= 4,
    wq: ({ col, row }) => col <= 4 && row <= 4,
    bk: ({ col, row }) => col >= 5 && row >= 5,
    bq: ({ col, row }) => col <= 4 && row >= 5,

    ww: ({ row }) => row <= 4,
    bb: ({ row }) => row >= 5,
  };

  function formatCommand(commandName) {
    return `${COMMAND} ${commandName}`;
  }

  const possibleCommands = Object.fromEntries(
    Object
      .entries(SQUARE_FILTERS)
      .map(([commandName, filter]) => [formatCommand(commandName), filter])
  );

  function getPiecePosition(transform, squareSize) {
    const [col, row] = transform.replace('translate(', '').replace('px', '').replace(')', '').split(', ').map(parseFloat);
    return [col / squareSize, row / squareSize].map(Math.floor);
  }

  function getPiecePositions() {
    const pieces = document.querySelectorAll('cg-board piece');
    const squareSize = document.querySelector('cg-board').offsetWidth / 8;

    return Array.from(pieces).map(piece => ({
      name: piece.className,
      position: getPiecePosition(piece.style.transform, squareSize)
    }));
  }

  function formatPositions(piecePositions, playerIsWhite) {
    return piecePositions.map(piece => {
      let [col, row] = piece.position;
      if (playerIsWhite) {
        row = 7 - row;
      } else {
        col = 7 - col;
      }
      return { name: piece.name, colLetter: 'abcdefgh'[col], col: col + 1, row: row + 1 };
    });
  }

  function sortPositions(piecePositions) {
    return piecePositions.toSorted((a, b) => {
      if (a.row !== b.row) {
        return a.row - b.row;
      }
      return a.col - b.col;
    });
  }

  function generatePositionMessages(formattedPositions) {
    return formattedPositions.flatMap(({ name, colLetter, row }) => [
      `"${colLetter}""${row}" ${name}`,
      SILENT_PAUSE
    ]);
  }

  function speakString(str, options = {}) {
    const utt = new SpeechSynthesisUtterance(str);
    utt.rate = SPEAK_RATE;
    Object.assign(utt, options)
    window.speechSynthesis.speak(utt);
    return utt;
  }

  function speakMessages(msgs) {
    console.debug('[lichess-board-speaker] speaking positions', { msgs });
    msgs.forEach(msg => {
      speakString(msg, { volume: msg === SILENT_PAUSE ? 0 : 1 });
    });
  }

  function isPlayerWhite() {
    return Array.from(document.querySelector('coords').classList).indexOf('black') === -1;
  }

  function generateFullMessages(filter) {
    const playerIsWhite = isPlayerWhite();
    const playerColourMsg = `You are ${playerIsWhite ? 'white' : 'black'}`;

    const pieces = getFormattedPositions();
    const filteredPieces = filterPieces(pieces, filter);
    const pieceMessages = generatePositionMessages(filteredPieces);

    return [playerColourMsg, ...pieceMessages];
  }

  function filterPieces(pieces, filter) {
    if (typeof filter === 'string') {
      filter = SQUARE_FILTERS[filter];
    }

    return pieces.filter(filter);;
  }

  function getFormattedPositions() {
    const piecePositions = getPiecePositions();
    const playerIsWhite = isPlayerWhite();

    let positions = getPiecePositions();
    positions = formatPositions(positions, playerIsWhite);
    return sortPositions(positions);
  }

  function findPossibleCommandMatch(inputString) {
    const possibleCommandStrings = Object.keys(possibleCommands);
    return possibleCommandStrings.find(cs => cs.startsWith(inputString));
  }

  function removeWrongOnInput(moveInput) {
    const possibleCommand = findPossibleCommandMatch(moveInput.value);
    if (!possibleCommand) return;
    moveInput.classList.remove('wrong');
  }

  function userInputChanged(moveInput) {
    const value = moveInput.value;
    const filter = possibleCommands[value];
    if (!filter) return;

    console.debug('[lichess-board-speaker] command triggered', { value });
    moveInput.value = '';

    const msgs = generateFullMessages(filter);
    speakMessages(msgs);
  }

  function createButtonContainer(parentContainer) {
    const container = document.createElement('div');
    container.style.marginLeft = '8px';
    parentContainer.appendChild(container);
    return container;
  }

  function createButtons(container) {
    Object
      .keys(SQUARE_FILTERS)
      .map(createCommandButton)
      .map(button => container.appendChild(button));
  }

  function createCommandButton(commandName) {
    const button = document.createElement('button');
    button.innerHTML = formatCommand(commandName);
    button.style.display = 'block';
    button.style.padding = '2px';
    button.style.margin = '8px';

    const onClick = () => {
      const msgs = generateFullMessages(SQUARE_FILTERS[commandName]);
      speakMessages(msgs);
    };

    button.addEventListener('click', onClick);

    return button;
  }

  function setupMoveInputListeners(moveInput) {
    moveInput.addEventListener('input', (event) => {
      userInputChanged(moveInput);
    });

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
    console.debug('[lichess-board-speaker] set up load handler ...', { possibleCommands });
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', handler);
    } else {
      handler();
    }
  }

  onDocumentReady(setup);
})();
