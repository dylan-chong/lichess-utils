// ==UserScript==
// @name        lichess-board-speaker
// @description Blindfold chess training tool for lichess.org
// @version     3.4.7
// @match       *://lichess.org/*
// @require     https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js
// @grant       none
// @inject-into content
// @updateURL   https://cdn.jsdelivr.net/gh/dylan-chong/lichess-utils@main/lichess-board-speaker.user.js
// @downloadURL https://cdn.jsdelivr.net/gh/dylan-chong/lichess-utils@main/lichess-board-speaker.user.js
// ==/UserScript==
(function() {
	//#region node_modules/@preact/signals-core/dist/signals-core.module.js
	var i$3 = Symbol.for("preact-signals");
	function t$2() {
		if (!(s$2 > 1)) {
			var i, t = !1;
			(function() {
				var i = c$2;
				c$2 = void 0;
				while (void 0 !== i) {
					if (i.S.v === i.v) i.S.i = i.i;
					i = i.o;
				}
			})();
			while (void 0 !== h$1) {
				var n = h$1;
				h$1 = void 0;
				v$2++;
				while (void 0 !== n) {
					var r = n.u;
					n.u = void 0;
					n.f &= -3;
					if (!(8 & n.f) && w$2(n)) try {
						n.c();
					} catch (n) {
						if (!t) {
							i = n;
							t = !0;
						}
					}
					n = r;
				}
			}
			v$2 = 0;
			s$2--;
			if (t) throw i;
		} else s$2--;
	}
	var r$2 = void 0;
	function o$3(i) {
		var t = r$2;
		r$2 = void 0;
		try {
			return i();
		} finally {
			r$2 = t;
		}
	}
	var f$3, h$1 = void 0, s$2 = 0, v$2 = 0, e$2 = 0, c$2 = void 0, d$1 = 0;
	function a$2(i) {
		if (void 0 !== r$2) {
			var t = i.n;
			if (void 0 === t || t.t !== r$2) {
				t = {
					i: 0,
					S: i,
					p: r$2.s,
					n: void 0,
					t: r$2,
					e: void 0,
					x: void 0,
					r: t
				};
				if (void 0 !== r$2.s) r$2.s.n = t;
				r$2.s = t;
				i.n = t;
				if (32 & r$2.f) i.S(t);
				return t;
			} else if (-1 === t.i) {
				t.i = 0;
				if (void 0 !== t.n) {
					t.n.p = t.p;
					if (void 0 !== t.p) t.p.n = t.n;
					t.p = r$2.s;
					t.n = void 0;
					r$2.s.n = t;
					r$2.s = t;
				}
				return t;
			}
		}
	}
	function l$2(i, t) {
		this.v = i;
		this.i = 0;
		this.n = void 0;
		this.t = void 0;
		this.l = 0;
		this.W = null == t ? void 0 : t.watched;
		this.Z = null == t ? void 0 : t.unwatched;
		this.name = null == t ? void 0 : t.name;
	}
	l$2.prototype.brand = i$3;
	l$2.prototype.h = function() {
		return !0;
	};
	l$2.prototype.S = function(i) {
		var t = this, n = this.t;
		if (n !== i && void 0 === i.e) {
			i.x = n;
			this.t = i;
			if (void 0 !== n) n.e = i;
			else o$3(function() {
				var i;
				null == (i = t.W) || i.call(t);
			});
		}
	};
	l$2.prototype.U = function(i) {
		var t = this;
		if (void 0 !== this.t) {
			var n = i.e, r = i.x;
			if (void 0 !== n) {
				n.x = r;
				i.e = void 0;
			}
			if (void 0 !== r) {
				r.e = n;
				i.x = void 0;
			}
			if (i === this.t) {
				this.t = r;
				if (void 0 === r) o$3(function() {
					var i;
					null == (i = t.Z) || i.call(t);
				});
			}
		}
	};
	l$2.prototype.subscribe = function(i) {
		var t = this;
		return j$2(function() {
			var n = t.value, o = r$2;
			r$2 = void 0;
			try {
				i(n);
			} finally {
				r$2 = o;
			}
		}, { name: "sub" });
	};
	l$2.prototype.valueOf = function() {
		return this.value;
	};
	l$2.prototype.toString = function() {
		return this.value + "";
	};
	l$2.prototype.toJSON = function() {
		return this.value;
	};
	l$2.prototype.peek = function() {
		var i = this;
		return o$3(function() {
			return i.value;
		});
	};
	Object.defineProperty(l$2.prototype, "value", {
		get: function() {
			var i = a$2(this);
			if (void 0 !== i) i.i = this.i;
			return this.v;
		},
		set: function(i) {
			if (i !== this.v) {
				if (v$2 > 100) throw new Error("Cycle detected");
				(function(i) {
					if (0 !== s$2 && 0 === v$2) {
						if (i.l !== e$2) {
							i.l = e$2;
							c$2 = {
								S: i,
								v: i.v,
								i: i.i,
								o: c$2
							};
						}
					}
				})(this);
				this.v = i;
				this.i++;
				d$1++;
				s$2++;
				try {
					for (var n = this.t; void 0 !== n; n = n.x) n.t.N();
				} finally {
					t$2();
				}
			}
		}
	});
	function y$1(i, t) {
		return new l$2(i, t);
	}
	function w$2(i) {
		for (var t = i.s; void 0 !== t; t = t.n) if (t.S.i !== t.i || !t.S.h() || t.S.i !== t.i) return !0;
		return !1;
	}
	function _$1(i) {
		for (var t = i.s; void 0 !== t; t = t.n) {
			var n = t.S.n;
			if (void 0 !== n) t.r = n;
			t.S.n = t;
			t.i = -1;
			if (void 0 === t.n) {
				i.s = t;
				break;
			}
		}
	}
	function b$1(i) {
		var t = i.s, n = void 0;
		while (void 0 !== t) {
			var r = t.p;
			if (-1 === t.i) {
				t.S.U(t);
				if (void 0 !== r) r.n = t.n;
				if (void 0 !== t.n) t.n.p = r;
			} else n = t;
			t.S.n = t.r;
			if (void 0 !== t.r) t.r = void 0;
			t = r;
		}
		i.s = n;
	}
	function p$2(i, t) {
		l$2.call(this, void 0);
		this.x = i;
		this.s = void 0;
		this.g = d$1 - 1;
		this.f = 4;
		this.W = null == t ? void 0 : t.watched;
		this.Z = null == t ? void 0 : t.unwatched;
		this.name = null == t ? void 0 : t.name;
	}
	p$2.prototype = new l$2();
	p$2.prototype.h = function() {
		this.f &= -3;
		if (1 & this.f) return !1;
		if (32 == (36 & this.f)) return !0;
		this.f &= -5;
		if (this.g === d$1) return !0;
		this.g = d$1;
		this.f |= 1;
		if (this.i > 0 && !w$2(this)) {
			this.f &= -2;
			return !0;
		}
		var i = r$2;
		try {
			_$1(this);
			r$2 = this;
			var t = this.x();
			if (16 & this.f || this.v !== t || 0 === this.i) {
				this.v = t;
				this.f &= -17;
				this.i++;
			}
		} catch (i) {
			this.v = i;
			this.f |= 16;
			this.i++;
		}
		r$2 = i;
		b$1(this);
		this.f &= -2;
		return !0;
	};
	p$2.prototype.S = function(i) {
		if (void 0 === this.t) {
			this.f |= 36;
			for (var t = this.s; void 0 !== t; t = t.n) t.S.S(t);
		}
		l$2.prototype.S.call(this, i);
	};
	p$2.prototype.U = function(i) {
		if (void 0 !== this.t) {
			l$2.prototype.U.call(this, i);
			if (void 0 === this.t) {
				this.f &= -33;
				for (var t = this.s; void 0 !== t; t = t.n) t.S.U(t);
			}
		}
	};
	p$2.prototype.N = function() {
		if (!(2 & this.f)) {
			this.f |= 6;
			for (var i = this.t; void 0 !== i; i = i.x) i.t.N();
		}
	};
	Object.defineProperty(p$2.prototype, "value", { get: function() {
		if (1 & this.f) throw new Error("Cycle detected");
		var i = a$2(this);
		this.h();
		if (void 0 !== i) i.i = this.i;
		if (16 & this.f) throw this.v;
		return this.v;
	} });
	function S$1(i) {
		var n = i.m;
		i.m = void 0;
		if ("function" == typeof n) {
			s$2++;
			var o = r$2;
			r$2 = void 0;
			try {
				n();
			} catch (t) {
				i.f &= -2;
				i.f |= 8;
				m$2(i);
				throw t;
			} finally {
				r$2 = o;
				t$2();
			}
		}
	}
	function m$2(i) {
		for (var t = i.s; void 0 !== t; t = t.n) t.S.U(t);
		i.x = void 0;
		i.s = void 0;
		S$1(i);
	}
	function x$2(i) {
		if (r$2 !== this) throw new Error("Out-of-order effect");
		b$1(this);
		r$2 = i;
		this.f &= -2;
		if (8 & this.f) m$2(this);
		t$2();
	}
	function E$1(i, t) {
		this.x = i;
		this.m = void 0;
		this.s = void 0;
		this.u = void 0;
		this.f = 32;
		this.name = null == t ? void 0 : t.name;
		if (f$3) f$3.push(this);
	}
	E$1.prototype.c = function() {
		var i = this.S();
		try {
			if (8 & this.f) return;
			if (void 0 === this.x) return;
			var t = this.x();
			if ("function" == typeof t) this.m = t;
		} finally {
			i();
		}
	};
	E$1.prototype.S = function() {
		if (1 & this.f) throw new Error("Cycle detected");
		this.f |= 1;
		this.f &= -9;
		S$1(this);
		_$1(this);
		s$2++;
		var i = r$2;
		r$2 = this;
		return x$2.bind(this, i);
	};
	E$1.prototype.N = function() {
		if (!(2 & this.f)) {
			this.f |= 2;
			this.u = h$1;
			h$1 = this;
		}
	};
	E$1.prototype.d = function() {
		this.f |= 8;
		if (!(1 & this.f)) m$2(this);
	};
	E$1.prototype.dispose = function() {
		this.d();
	};
	function j$2(i, t) {
		var n = new E$1(i, t);
		try {
			n.c();
		} catch (i) {
			n.d();
			throw i;
		}
		var r = n.d.bind(n);
		r[Symbol.dispose] = r;
		return r;
	}
	//#endregion
	//#region src/constants/dom.ts
	var DomSelector = /* @__PURE__ */ function(DomSelector) {
		DomSelector["BOARD"] = "cg-board";
		DomSelector["BOARD_NO_CUSTOM"] = "cg-board:not(.userscript-custom-board)";
		DomSelector["COORDS"] = "coords";
		DomSelector["PIECE"] = "piece";
		DomSelector["CONTAINER"] = "cg-container";
		DomSelector["KEYBOARD_MOVE"] = ".keyboard-move";
		DomSelector["KEYBOARD_INPUT"] = ".keyboard-move input";
		return DomSelector;
	}({});
	var CssClass = /* @__PURE__ */ function(CssClass) {
		CssClass["BLACK"] = "black";
		CssClass["USERSCRIPT_DIVIDERS"] = "userscript-dividers";
		CssClass["USERSCRIPT_FLASH"] = "userscript-flash-overlay";
		return CssClass;
	}({});
	var CssDisplay = /* @__PURE__ */ function(CssDisplay) {
		CssDisplay["BLOCK"] = "block";
		CssDisplay["NONE"] = "none";
		return CssDisplay;
	}({});
	//#endregion
	//#region src/platform/dom.ts
	function createDiv() {
		return document.createElement("div");
	}
	function createSvgElement(tag) {
		return document.createElementNS("http://www.w3.org/2000/svg", tag);
	}
	function querySelector(selector) {
		return document.querySelector(selector);
	}
	function appendChild(parent, child) {
		parent.appendChild(child);
	}
	function getBoundingClientRect(element) {
		return element.getBoundingClientRect();
	}
	function waitForElement(selector) {
		return new Promise((resolve) => {
			const element = querySelector(selector);
			if (element) {
				resolve(element);
				return;
			}
			const observer = new MutationObserver(() => {
				const element = querySelector(selector);
				if (element) {
					observer.disconnect();
					resolve(element);
				}
			});
			observer.observe(document.body, {
				childList: true,
				subtree: true
			});
		});
	}
	//#endregion
	//#region src/presentation/non-preact-components/dividers.ts
	function createDividers() {
		const board = querySelector(DomSelector.BOARD);
		if (!board) throw new Error("Board not found");
		const size = board.getBoundingClientRect().width;
		const svg = createSvgElement("svg");
		svg.setAttribute("class", CssClass.USERSCRIPT_DIVIDERS);
		svg.setAttribute("width", size.toString());
		svg.setAttribute("height", size.toString());
		svg.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    display: none;
  `;
		const vLine = createSvgElement("line");
		vLine.setAttribute("x1", (size / 2).toString());
		vLine.setAttribute("y1", "0");
		vLine.setAttribute("x2", (size / 2).toString());
		vLine.setAttribute("y2", size.toString());
		vLine.setAttribute("stroke", "red");
		vLine.setAttribute("stroke-width", "2");
		const hLine = createSvgElement("line");
		hLine.setAttribute("x1", "0");
		hLine.setAttribute("y1", (size / 2).toString());
		hLine.setAttribute("x2", size.toString());
		hLine.setAttribute("y2", (size / 2).toString());
		hLine.setAttribute("stroke", "red");
		hLine.setAttribute("stroke-width", "2");
		appendChild(svg, vLine);
		appendChild(svg, hLine);
		appendChild(board, svg);
		return { svg };
	}
	function showDividers(state) {
		state.svg.style.display = CssDisplay.BLOCK;
	}
	function hideDividers(state) {
		state.svg.style.display = CssDisplay.NONE;
	}
	function destroyDividers(state) {
		state.svg.remove();
	}
	//#endregion
	//#region src/application/handlers/updateDividers.ts
	function updateDividers(state, settings) {
		if (settings.dividersEnabled.value) showDividers(state);
		else hideDividers(state);
	}
	//#endregion
	//#region src/application/effects/onDividers.ts
	function setupDividersEffect(state, settings) {
		return j$2(() => {
			settings.dividersEnabled.value;
			updateDividers(state, settings);
		});
	}
	//#endregion
	//#region src/constants/commands.ts
	var SpeechCommand = /* @__PURE__ */ function(SpeechCommand) {
		SpeechCommand["ALL"] = "all";
		SpeechCommand["WHITE"] = "white";
		SpeechCommand["BLACK"] = "black";
		SpeechCommand["STOP"] = "stop";
		SpeechCommand["WK"] = "wk";
		SpeechCommand["WQ"] = "wq";
		SpeechCommand["BK"] = "bk";
		SpeechCommand["BQ"] = "bq";
		return SpeechCommand;
	}({});
	var KEYBOARD_COMMAND_MAP = new Map([
		["pwk", "wk"],
		["pwq", "wq"],
		["pbk", "bk"],
		["pbq", "bq"],
		["pa", "all"],
		["pww", "white"],
		["pbb", "black"],
		["pss", "stop"]
	]);
	//#endregion
	//#region src/constants/chess.ts
	var PlayerColor = /* @__PURE__ */ function(PlayerColor) {
		PlayerColor["WHITE"] = "white";
		PlayerColor["BLACK"] = "black";
		return PlayerColor;
	}({});
	var PieceType = /* @__PURE__ */ function(PieceType) {
		PieceType["PAWN"] = "pawn";
		PieceType["KNIGHT"] = "knight";
		PieceType["BISHOP"] = "bishop";
		PieceType["ROOK"] = "rook";
		PieceType["QUEEN"] = "queen";
		PieceType["KING"] = "king";
		return PieceType;
	}({});
	var Quadrant = /* @__PURE__ */ function(Quadrant) {
		Quadrant["WHITE_KING"] = "wk";
		Quadrant["WHITE_QUEEN"] = "wq";
		Quadrant["BLACK_KING"] = "bk";
		Quadrant["BLACK_QUEEN"] = "bq";
		return Quadrant;
	}({});
	Object.values(PlayerColor);
	Object.values(PieceType);
	Object.values(Quadrant);
	//#endregion
	//#region src/domain/chess/pieceGrouping.ts
	function filterQuadrant(pieces, quadrant) {
		return pieces.filter((piece) => {
			if (!piece.square || piece.square.length < 2) throw new Error(`Invalid square format: ${piece.square}`);
			const file = piece.square[0];
			const rank = Number.parseInt(piece.square[1], 10);
			if (file < "a" || file > "h") throw new Error(`Invalid file: ${file}`);
			if (Number.isNaN(rank) || rank < 1 || rank > 8) throw new Error(`Invalid rank: ${rank}`);
			const isKingSide = file >= "e";
			const isWhiteRanks = rank >= 1 && rank <= 4;
			if (quadrant === Quadrant.WHITE_KING) return isKingSide && isWhiteRanks;
			if (quadrant === Quadrant.WHITE_QUEEN) return !isKingSide && isWhiteRanks;
			if (quadrant === Quadrant.BLACK_KING) return isKingSide && !isWhiteRanks;
			if (quadrant === Quadrant.BLACK_QUEEN) return !isKingSide && !isWhiteRanks;
			return false;
		});
	}
	function groupByColorAndType(pieces) {
		const groups = /* @__PURE__ */ new Map();
		for (const piece of pieces) {
			if (!piece.square) throw new Error("Piece missing square property");
			if (!piece.color) throw new Error("Piece missing color property");
			if (!piece.type) throw new Error("Piece missing type property");
			const key = `${piece.color}-${piece.type}`;
			if (!groups.has(key)) groups.set(key, {
				color: piece.color,
				type: piece.type,
				squares: []
			});
			groups.get(key)?.squares.push(piece.square);
		}
		return Array.from(groups.values()).sort((a, b) => {
			if (a.color !== b.color) return a.color === PlayerColor.WHITE ? -1 : 1;
			return a.type.localeCompare(b.type);
		});
	}
	//#endregion
	//#region src/domain/speech/speechText.ts
	function generateQuadrantText(pieces) {
		if (pieces.length === 0) return "";
		const groups = groupByColorAndType(pieces);
		const sentences = [];
		for (const group of groups) {
			const colorName = group.color;
			const typeName = group.squares.length > 1 ? `${group.type}s` : group.type;
			if (group.squares.length > 1) {
				const squares = group.squares.join(", ");
				sentences.push(`${colorName} ${typeName} on ${squares}`);
			} else sentences.push(`${group.squares[0]} ${colorName} ${group.type}`);
		}
		return `${sentences.join(". ")}.`;
	}
	function generateAllPiecesText(pieces) {
		return generateQuadrantText(pieces);
	}
	function generateColorText(pieces, color) {
		return generateQuadrantText(pieces.filter((p) => p.color === color));
	}
	//#endregion
	//#region src/platform/speech/core.ts
	function getSpeechSynthesis() {
		return window.speechSynthesis;
	}
	function getSpeechSynthesisUtterance() {
		return SpeechSynthesisUtterance;
	}
	function speak(synthesis, utterance) {
		synthesis.speak(utterance);
	}
	function cancel(synthesis) {
		synthesis.cancel();
	}
	function createUtterance(UtteranceClass, text) {
		return new UtteranceClass(text);
	}
	//#endregion
	//#region src/platform/speech/index.ts
	function speakText(text, rate) {
		const synthesis = getSpeechSynthesis();
		const utterance = createUtterance(getSpeechSynthesisUtterance(), text);
		utterance.rate = rate;
		speak(synthesis, utterance);
	}
	function stopSpeaking() {
		cancel(getSpeechSynthesis());
	}
	//#endregion
	//#region src/domain/chess/coordinates.ts
	var FILES = "abcdefgh";
	function pixelsToSquare(position, squareSize, playerColor) {
		let col = Math.round((position.x - squareSize / 2) / squareSize);
		let row = Math.round((position.y - squareSize / 2) / squareSize);
		col = Math.max(0, Math.min(7, col));
		row = Math.max(0, Math.min(7, row));
		let rank;
		let file;
		if (playerColor === PlayerColor.WHITE) {
			file = FILES[col];
			rank = 8 - row;
		} else {
			file = FILES[7 - col];
			rank = row + 1;
		}
		return `${file}${rank}`;
	}
	//#endregion
	//#region src/application/services/boardReader/extraction.ts
	function extractBoardMetrics(boardElement) {
		const widthMatch = boardElement.style.cssText.match(/width:\s*([0-9.]+)px/);
		const boardWidth = widthMatch ? Number.parseFloat(widthMatch[1]) : getBoundingClientRect(boardElement).width;
		return {
			boardWidth,
			squareSize: boardWidth / 8
		};
	}
	function extractPieceData(pieceElement, squareSize) {
		const classes = pieceElement.className.split(" ");
		const colorStr = classes[0];
		const typeStr = classes[1];
		if (!colorStr || !typeStr) return null;
		const match = pieceElement.style.transform.match(/translate\(([0-9.]+)px,?\s*([0-9.]+)px?\)/);
		if (!match) return null;
		return {
			color: colorStr,
			type: typeStr,
			x: Number.parseFloat(match[1]) + squareSize / 2,
			y: Number.parseFloat(match[2]) + squareSize / 2
		};
	}
	//#endregion
	//#region src/application/services/boardReader/reader.ts
	function getPlayerColor() {
		return querySelector(DomSelector.COORDS)?.classList.contains(CssClass.BLACK) ? PlayerColor.BLACK : PlayerColor.WHITE;
	}
	function readPiecePositions() {
		const board = querySelector(DomSelector.BOARD_NO_CUSTOM);
		if (!board) return [];
		const { squareSize } = extractBoardMetrics(board);
		const playerColor = getPlayerColor();
		const pieces = board.querySelectorAll(DomSelector.PIECE);
		const positions = [];
		for (const piece of pieces) {
			const rawData = extractPieceData(piece, squareSize);
			if (!rawData) continue;
			const color = rawData.color === "white" ? PlayerColor.WHITE : PlayerColor.BLACK;
			const type = rawData.type;
			const square = pixelsToSquare({
				x: rawData.x,
				y: rawData.y
			}, squareSize, playerColor);
			positions.push({
				square,
				color,
				type
			});
		}
		return positions;
	}
	//#endregion
	//#region src/application/handlers/handleSpeechCommand.ts
	function handleSpeechCommand(command, settings) {
		if (command === SpeechCommand.STOP) {
			stopSpeaking();
			return;
		}
		const pieces = readPiecePositions();
		if (command === SpeechCommand.ALL) {
			speakText(generateAllPiecesText(pieces), settings.speakRate.value);
			return;
		}
		if (command === SpeechCommand.WHITE || command === SpeechCommand.BLACK) {
			speakText(generateColorText(pieces, command === SpeechCommand.WHITE ? PlayerColor.WHITE : PlayerColor.BLACK), settings.speakRate.value);
			return;
		}
		speakText(generateQuadrantText(filterQuadrant(pieces, command)), settings.speakRate.value);
	}
	//#endregion
	//#region src/application/input/keyboardInput.ts
	function setupKeyboardCommands(settings) {
		const input = querySelector(DomSelector.KEYBOARD_INPUT);
		if (!input) return;
		const handleInput = (e) => {
			const target = e.target;
			const value = target.value;
			const command = KEYBOARD_COMMAND_MAP.get(value);
			if (command) {
				handleSpeechCommand(command, settings);
				target.value = "";
				return;
			}
			if (value.startsWith("-")) return;
		};
		input.addEventListener("input", handleInput);
		input.__keyboardCommandCleanup = () => {
			input.removeEventListener("input", handleInput);
		};
	}
	function teardownKeyboardCommands() {
		const input = querySelector(DomSelector.KEYBOARD_INPUT);
		if (input?.__keyboardCommandCleanup) {
			input.__keyboardCommandCleanup();
			input.__keyboardCommandCleanup = void 0;
		}
	}
	//#endregion
	//#region src/platform/mutationObserver.ts
	function createMutationObserver(callback) {
		return new MutationObserver(callback);
	}
	function observe(observer, target, options) {
		observer.observe(target, options);
	}
	function disconnect(observer) {
		observer.disconnect();
	}
	//#endregion
	//#region src/application/observers/observerState.ts
	function createBoardObserver(boardChanged) {
		return {
			observer: createMutationObserver(() => {
				boardChanged.value += 1;
			}),
			boardChanged
		};
	}
	function startBoardObserver(state) {
		const board = querySelector(DomSelector.BOARD);
		if (!board) return;
		observe(state.observer, board, {
			childList: true,
			attributes: true,
			subtree: true
		});
	}
	function stopBoardObserver(state) {
		disconnect(state.observer);
	}
	//#endregion
	//#region src/constants/settings.ts
	var defaultSettings = {
		speakRate: .5,
		piecesListEnabled: false,
		dividersEnabled: false,
		customBoardEnabled: false,
		obfuscationsEnabled: false,
		parallax: 0,
		hoverMode: "off",
		pieceStyle: "icons",
		blur: 0,
		blackSegments: "none",
		blackSegmentsTiming: "rotate-10s",
		flashModeEnabled: false,
		flashDuration: 1,
		flashInterval: 3
	};
	//#endregion
	//#region src/platform/storage.ts
	/**
	* Wrapper module for localStorage to allow mocking with simone
	*/ function getItem(key) {
		return localStorage.getItem(key);
	}
	function setItem(key, value) {
		localStorage.setItem(key, value);
	}
	//#endregion
	//#region src/application/settings/settingsStore.ts
	var STORAGE_KEY = "lichess-board-speaker-settings";
	function createSettingsStore() {
		return {
			speakRate: y$1(defaultSettings.speakRate),
			piecesListEnabled: y$1(defaultSettings.piecesListEnabled),
			dividersEnabled: y$1(defaultSettings.dividersEnabled),
			customBoardEnabled: y$1(defaultSettings.customBoardEnabled),
			obfuscationsEnabled: y$1(defaultSettings.obfuscationsEnabled),
			parallax: y$1(defaultSettings.parallax),
			hoverMode: y$1(defaultSettings.hoverMode),
			pieceStyle: y$1(defaultSettings.pieceStyle),
			blur: y$1(defaultSettings.blur),
			blackSegments: y$1(defaultSettings.blackSegments),
			blackSegmentsTiming: y$1(defaultSettings.blackSegmentsTiming),
			flashModeEnabled: y$1(defaultSettings.flashModeEnabled),
			flashDuration: y$1(defaultSettings.flashDuration),
			flashInterval: y$1(defaultSettings.flashInterval)
		};
	}
	function loadSettings(settings) {
		const stored = getItem(STORAGE_KEY);
		if (!stored) return;
		const data = JSON.parse(stored);
		for (const key of Object.keys(data)) {
			const settingKey = key;
			if (settings[settingKey] && typeof settings[settingKey] === "object" && "value" in settings[settingKey]) settings[settingKey].value = data[settingKey];
		}
	}
	function saveSettings(settings) {
		const data = {};
		for (const key of Object.keys(settings)) {
			const settingKey = key;
			if (typeof settings[settingKey] === "object" && "value" in settings[settingKey]) data[settingKey] = settings[settingKey].value;
		}
		setItem(STORAGE_KEY, JSON.stringify(data));
	}
	function setupAutoSave(settings) {
		j$2(() => {
			for (const key of Object.keys(settings)) {
				const setting = settings[key];
				if (typeof setting === "object" && "value" in setting) setting.value;
			}
			saveSettings(settings);
		});
	}
	//#endregion
	//#region node_modules/preact/dist/preact.module.js
	var n, l$1, u$2, i$2, r$1, o$2, e$1, f$2, c$1, a$1, s$1, h, p$1, v$1, y, d = {}, w$1 = [], _ = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, g = Array.isArray;
	function m$1(n, l) {
		for (var u in l) n[u] = l[u];
		return n;
	}
	function b(n) {
		n && n.parentNode && n.parentNode.removeChild(n);
	}
	function k$1(l, u, t) {
		var i, r, o, e = {};
		for (o in u) "key" == o ? i = u[o] : "ref" == o ? r = u[o] : e[o] = u[o];
		if (arguments.length > 2 && (e.children = arguments.length > 3 ? n.call(arguments, 2) : t), "function" == typeof l && null != l.defaultProps) for (o in l.defaultProps) void 0 === e[o] && (e[o] = l.defaultProps[o]);
		return x$1(l, e, i, r, null);
	}
	function x$1(n, t, i, r, o) {
		var e = {
			type: n,
			props: t,
			key: i,
			ref: r,
			__k: null,
			__: null,
			__b: 0,
			__e: null,
			__c: null,
			constructor: void 0,
			__v: null == o ? ++u$2 : o,
			__i: -1,
			__u: 0
		};
		return null == o && null != l$1.vnode && l$1.vnode(e), e;
	}
	function S(n) {
		return n.children;
	}
	function C(n, l) {
		this.props = n, this.context = l;
	}
	function $(n, l) {
		if (null == l) return n.__ ? $(n.__, n.__i + 1) : null;
		for (var u; l < n.__k.length; l++) if (null != (u = n.__k[l]) && null != u.__e) return u.__e;
		return "function" == typeof n.type ? $(n) : null;
	}
	function I(n) {
		if (n.__P && n.__d) {
			var u = n.__v, t = u.__e, i = [], r = [], o = m$1({}, u);
			o.__v = u.__v + 1, l$1.vnode && l$1.vnode(o), q(n.__P, o, u, n.__n, n.__P.namespaceURI, 32 & u.__u ? [t] : null, i, null == t ? $(u) : t, !!(32 & u.__u), r), o.__v = u.__v, o.__.__k[o.__i] = o, D(i, o, r), u.__e = u.__ = null, o.__e != t && P(o);
		}
	}
	function P(n) {
		if (null != (n = n.__) && null != n.__c) return n.__e = n.__c.base = null, n.__k.some(function(l) {
			if (null != l && null != l.__e) return n.__e = n.__c.base = l.__e;
		}), P(n);
	}
	function A(n) {
		(!n.__d && (n.__d = !0) && i$2.push(n) && !H.__r++ || r$1 != l$1.debounceRendering) && ((r$1 = l$1.debounceRendering) || o$2)(H);
	}
	function H() {
		try {
			for (var n, l = 1; i$2.length;) i$2.length > l && i$2.sort(e$1), n = i$2.shift(), l = i$2.length, I(n);
		} finally {
			i$2.length = H.__r = 0;
		}
	}
	function L(n, l, u, t, i, r, o, e, f, c, a) {
		var s, h, p, v, y, _, g, m = t && t.__k || w$1, b = l.length;
		for (f = T(u, l, m, f, b), s = 0; s < b; s++) null != (p = u.__k[s]) && (h = -1 != p.__i && m[p.__i] || d, p.__i = s, _ = q(n, p, h, i, r, o, e, f, c, a), v = p.__e, p.ref && h.ref != p.ref && (h.ref && J(h.ref, null, p), a.push(p.ref, p.__c || v, p)), null == y && null != v && (y = v), (g = !!(4 & p.__u)) || h.__k === p.__k ? (f = j$1(p, f, n, g), g && h.__e && (h.__e = null)) : "function" == typeof p.type && void 0 !== _ ? f = _ : v && (f = v.nextSibling), p.__u &= -7);
		return u.__e = y, f;
	}
	function T(n, l, u, t, i) {
		var r, o, e, f, c, a = u.length, s = a, h = 0;
		for (n.__k = new Array(i), r = 0; r < i; r++) null != (o = l[r]) && "boolean" != typeof o && "function" != typeof o ? ("string" == typeof o || "number" == typeof o || "bigint" == typeof o || o.constructor == String ? o = n.__k[r] = x$1(null, o, null, null, null) : g(o) ? o = n.__k[r] = x$1(S, { children: o }, null, null, null) : void 0 === o.constructor && o.__b > 0 ? o = n.__k[r] = x$1(o.type, o.props, o.key, o.ref ? o.ref : null, o.__v) : n.__k[r] = o, f = r + h, o.__ = n, o.__b = n.__b + 1, e = null, -1 != (c = o.__i = O(o, u, f, s)) && (s--, (e = u[c]) && (e.__u |= 2)), null == e || null == e.__v ? (-1 == c && (i > a ? h-- : i < a && h++), "function" != typeof o.type && (o.__u |= 4)) : c != f && (c == f - 1 ? h-- : c == f + 1 ? h++ : (c > f ? h-- : h++, o.__u |= 4))) : n.__k[r] = null;
		if (s) for (r = 0; r < a; r++) null != (e = u[r]) && 0 == (2 & e.__u) && (e.__e == t && (t = $(e)), K(e, e));
		return t;
	}
	function j$1(n, l, u, t) {
		var i, r;
		if ("function" == typeof n.type) {
			for (i = n.__k, r = 0; i && r < i.length; r++) i[r] && (i[r].__ = n, l = j$1(i[r], l, u, t));
			return l;
		}
		n.__e != l && (t && (l && n.type && !l.parentNode && (l = $(n)), u.insertBefore(n.__e, l || null)), l = n.__e);
		do
			l = l && l.nextSibling;
		while (null != l && 8 == l.nodeType);
		return l;
	}
	function O(n, l, u, t) {
		var i, r, o, e = n.key, f = n.type, c = l[u], a = null != c && 0 == (2 & c.__u);
		if (null === c && null == e || a && e == c.key && f == c.type) return u;
		if (t > (a ? 1 : 0)) {
			for (i = u - 1, r = u + 1; i >= 0 || r < l.length;) if (null != (c = l[o = i >= 0 ? i-- : r++]) && 0 == (2 & c.__u) && e == c.key && f == c.type) return o;
		}
		return -1;
	}
	function z$1(n, l, u) {
		"-" == l[0] ? n.setProperty(l, null == u ? "" : u) : n[l] = null == u ? "" : "number" != typeof u || _.test(l) ? u : u + "px";
	}
	function N(n, l, u, t, i) {
		var r, o;
		n: if ("style" == l) if ("string" == typeof u) n.style.cssText = u;
		else {
			if ("string" == typeof t && (n.style.cssText = t = ""), t) for (l in t) u && l in u || z$1(n.style, l, "");
			if (u) for (l in u) t && u[l] == t[l] || z$1(n.style, l, u[l]);
		}
		else if ("o" == l[0] && "n" == l[1]) r = l != (l = l.replace(s$1, "$1")), o = l.toLowerCase(), l = o in n || "onFocusOut" == l || "onFocusIn" == l ? o.slice(2) : l.slice(2), n.l || (n.l = {}), n.l[l + r] = u, u ? t ? u[a$1] = t[a$1] : (u[a$1] = h, n.addEventListener(l, r ? v$1 : p$1, r)) : n.removeEventListener(l, r ? v$1 : p$1, r);
		else {
			if ("http://www.w3.org/2000/svg" == i) l = l.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
			else if ("width" != l && "height" != l && "href" != l && "list" != l && "form" != l && "tabIndex" != l && "download" != l && "rowSpan" != l && "colSpan" != l && "role" != l && "popover" != l && l in n) try {
				n[l] = null == u ? "" : u;
				break n;
			} catch (n) {}
			"function" == typeof u || (null == u || !1 === u && "-" != l[4] ? n.removeAttribute(l) : n.setAttribute(l, "popover" == l && 1 == u ? "" : u));
		}
	}
	function V(n) {
		return function(u) {
			if (this.l) {
				var t = this.l[u.type + n];
				if (null == u[c$1]) u[c$1] = h++;
				else if (u[c$1] < t[a$1]) return;
				return t(l$1.event ? l$1.event(u) : u);
			}
		};
	}
	function q(n, u, t, i, r, o, e, f, c, a) {
		var s, h, p, v, y, d, _, k, x, M, $, I, P, A, H, T = u.type;
		if (void 0 !== u.constructor) return null;
		128 & t.__u && (c = !!(32 & t.__u), o = [f = u.__e = t.__e]), (s = l$1.__b) && s(u);
		n: if ("function" == typeof T) try {
			if (k = u.props, x = T.prototype && T.prototype.render, M = (s = T.contextType) && i[s.__c], $ = s ? M ? M.props.value : s.__ : i, t.__c ? _ = (h = u.__c = t.__c).__ = h.__E : (x ? u.__c = h = new T(k, $) : (u.__c = h = new C(k, $), h.constructor = T, h.render = Q), M && M.sub(h), h.state || (h.state = {}), h.__n = i, p = h.__d = !0, h.__h = [], h._sb = []), x && null == h.__s && (h.__s = h.state), x && null != T.getDerivedStateFromProps && (h.__s == h.state && (h.__s = m$1({}, h.__s)), m$1(h.__s, T.getDerivedStateFromProps(k, h.__s))), v = h.props, y = h.state, h.__v = u, p) x && null == T.getDerivedStateFromProps && null != h.componentWillMount && h.componentWillMount(), x && null != h.componentDidMount && h.__h.push(h.componentDidMount);
			else {
				if (x && null == T.getDerivedStateFromProps && k !== v && null != h.componentWillReceiveProps && h.componentWillReceiveProps(k, $), u.__v == t.__v || !h.__e && null != h.shouldComponentUpdate && !1 === h.shouldComponentUpdate(k, h.__s, $)) {
					u.__v != t.__v && (h.props = k, h.state = h.__s, h.__d = !1), u.__e = t.__e, u.__k = t.__k, u.__k.some(function(n) {
						n && (n.__ = u);
					}), w$1.push.apply(h.__h, h._sb), h._sb = [], h.__h.length && e.push(h);
					break n;
				}
				null != h.componentWillUpdate && h.componentWillUpdate(k, h.__s, $), x && null != h.componentDidUpdate && h.__h.push(function() {
					h.componentDidUpdate(v, y, d);
				});
			}
			if (h.context = $, h.props = k, h.__P = n, h.__e = !1, I = l$1.__r, P = 0, x) h.state = h.__s, h.__d = !1, I && I(u), s = h.render(h.props, h.state, h.context), w$1.push.apply(h.__h, h._sb), h._sb = [];
			else do
				h.__d = !1, I && I(u), s = h.render(h.props, h.state, h.context), h.state = h.__s;
			while (h.__d && ++P < 25);
			h.state = h.__s, null != h.getChildContext && (i = m$1(m$1({}, i), h.getChildContext())), x && !p && null != h.getSnapshotBeforeUpdate && (d = h.getSnapshotBeforeUpdate(v, y)), A = null != s && s.type === S && null == s.key ? E(s.props.children) : s, f = L(n, g(A) ? A : [A], u, t, i, r, o, e, f, c, a), h.base = u.__e, u.__u &= -161, h.__h.length && e.push(h), _ && (h.__E = h.__ = null);
		} catch (n) {
			if (u.__v = null, c || null != o) if (n.then) {
				for (u.__u |= c ? 160 : 128; f && 8 == f.nodeType && f.nextSibling;) f = f.nextSibling;
				o[o.indexOf(f)] = null, u.__e = f;
			} else {
				for (H = o.length; H--;) b(o[H]);
				B$1(u);
			}
			else u.__e = t.__e, u.__k = t.__k, n.then || B$1(u);
			l$1.__e(n, u, t);
		}
		else null == o && u.__v == t.__v ? (u.__k = t.__k, u.__e = t.__e) : f = u.__e = G(t.__e, u, t, i, r, o, e, c, a);
		return (s = l$1.diffed) && s(u), 128 & u.__u ? void 0 : f;
	}
	function B$1(n) {
		n && (n.__c && (n.__c.__e = !0), n.__k && n.__k.some(B$1));
	}
	function D(n, u, t) {
		for (var i = 0; i < t.length; i++) J(t[i], t[++i], t[++i]);
		l$1.__c && l$1.__c(u, n), n.some(function(u) {
			try {
				n = u.__h, u.__h = [], n.some(function(n) {
					n.call(u);
				});
			} catch (n) {
				l$1.__e(n, u.__v);
			}
		});
	}
	function E(n) {
		return "object" != typeof n || null == n || n.__b > 0 ? n : g(n) ? n.map(E) : void 0 !== n.constructor ? null : m$1({}, n);
	}
	function G(u, t, i, r, o, e, f, c, a) {
		var s, h, p, v, y, w, _, m = i.props || d, k = t.props, x = t.type;
		if ("svg" == x ? o = "http://www.w3.org/2000/svg" : "math" == x ? o = "http://www.w3.org/1998/Math/MathML" : o || (o = "http://www.w3.org/1999/xhtml"), null != e) {
			for (s = 0; s < e.length; s++) if ((y = e[s]) && "setAttribute" in y == !!x && (x ? y.localName == x : 3 == y.nodeType)) {
				u = y, e[s] = null;
				break;
			}
		}
		if (null == u) {
			if (null == x) return document.createTextNode(k);
			u = document.createElementNS(o, x, k.is && k), c && (l$1.__m && l$1.__m(t, e), c = !1), e = null;
		}
		if (null == x) m === k || c && u.data == k || (u.data = k);
		else {
			if (e = "textarea" == x && null != k.defaultValue ? null : e && n.call(u.childNodes), !c && null != e) for (m = {}, s = 0; s < u.attributes.length; s++) m[(y = u.attributes[s]).name] = y.value;
			for (s in m) y = m[s], "dangerouslySetInnerHTML" == s ? p = y : "children" == s || s in k || "value" == s && "defaultValue" in k || "checked" == s && "defaultChecked" in k || N(u, s, null, y, o);
			for (s in k) y = k[s], "children" == s ? v = y : "dangerouslySetInnerHTML" == s ? h = y : "value" == s ? w = y : "checked" == s ? _ = y : c && "function" != typeof y || m[s] === y || N(u, s, y, m[s], o);
			if (h) c || p && (h.__html == p.__html || h.__html == u.innerHTML) || (u.innerHTML = h.__html), t.__k = [];
			else if (p && (u.innerHTML = ""), L("template" == t.type ? u.content : u, g(v) ? v : [v], t, i, r, "foreignObject" == x ? "http://www.w3.org/1999/xhtml" : o, e, f, e ? e[0] : i.__k && $(i, 0), c, a), null != e) for (s = e.length; s--;) b(e[s]);
			c && "textarea" != x || (s = "value", "progress" == x && null == w ? u.removeAttribute("value") : null != w && (w !== u[s] || "progress" == x && !w || "option" == x && w != m[s]) && N(u, s, w, m[s], o), s = "checked", null != _ && _ != u[s] && N(u, s, _, m[s], o));
		}
		return u;
	}
	function J(n, u, t) {
		try {
			if ("function" == typeof n) {
				var i = "function" == typeof n.__u;
				i && n.__u(), i && null == u || (n.__u = n(u));
			} else n.current = u;
		} catch (n) {
			l$1.__e(n, t);
		}
	}
	function K(n, u, t) {
		var i, r;
		if (l$1.unmount && l$1.unmount(n), (i = n.ref) && (i.current && i.current != n.__e || J(i, null, u)), null != (i = n.__c)) {
			if (i.componentWillUnmount) try {
				i.componentWillUnmount();
			} catch (n) {
				l$1.__e(n, u);
			}
			i.base = i.__P = null;
		}
		if (i = n.__k) for (r = 0; r < i.length; r++) i[r] && K(i[r], u, t || "function" != typeof n.type);
		t || b(n.__e), n.__c = n.__ = n.__e = void 0;
	}
	function Q(n, l, u) {
		return this.constructor(n, u);
	}
	function R(u, t, i) {
		var r, o, e, f;
		t == document && (t = document.documentElement), l$1.__ && l$1.__(u, t), o = (r = "function" == typeof i) ? null : i && i.__k || t.__k, e = [], f = [], q(t, u = (!r && i || t).__k = k$1(S, null, [u]), o || d, d, t.namespaceURI, !r && i ? [i] : o ? null : t.firstChild ? n.call(t.childNodes) : null, e, !r && i ? i : o ? o.__e : t.firstChild, r, f), D(e, u, f);
	}
	function X(n) {
		function l(n) {
			var u, t;
			return this.getChildContext || (u = /* @__PURE__ */ new Set(), (t = {})[l.__c] = this, this.getChildContext = function() {
				return t;
			}, this.componentWillUnmount = function() {
				u = null;
			}, this.shouldComponentUpdate = function(n) {
				this.props.value != n.value && u.forEach(function(n) {
					n.__e = !0, A(n);
				});
			}, this.sub = function(n) {
				u.add(n);
				var l = n.componentWillUnmount;
				n.componentWillUnmount = function() {
					u && u.delete(n), l && l.call(n);
				};
			}), n.children;
		}
		return l.__c = "__cC" + y++, l.__ = n, l.Provider = l.__l = (l.Consumer = function(n, l) {
			return n.children(l);
		}).contextType = l, l;
	}
	n = w$1.slice, l$1 = { __e: function(n, l, u, t) {
		for (var i, r, o; l = l.__;) if ((i = l.__c) && !i.__) try {
			if ((r = i.constructor) && null != r.getDerivedStateFromError && (i.setState(r.getDerivedStateFromError(n)), o = i.__d), null != i.componentDidCatch && (i.componentDidCatch(n, t || {}), o = i.__d), o) return i.__E = i;
		} catch (l) {
			n = l;
		}
		throw n;
	} }, u$2 = 0, C.prototype.setState = function(n, l) {
		var u = null != this.__s && this.__s != this.state ? this.__s : this.__s = m$1({}, this.state);
		"function" == typeof n && (n = n(m$1({}, u), this.props)), n && m$1(u, n), null != n && this.__v && (l && this._sb.push(l), A(this));
	}, C.prototype.forceUpdate = function(n) {
		this.__v && (this.__e = !0, n && this.__h.push(n), A(this));
	}, C.prototype.render = S, i$2 = [], o$2 = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, e$1 = function(n, l) {
		return n.__v.__b - l.__v.__b;
	}, H.__r = 0, f$2 = Math.random().toString(8), c$1 = "__d" + f$2, a$1 = "__a" + f$2, s$1 = /(PointerCapture)$|Capture$/i, h = 0, p$1 = V(!1), v$1 = V(!0), y = 0;
	//#endregion
	//#region node_modules/preact/hooks/dist/hooks.module.js
	var t, r, u$1, i$1, o$1 = 0, f$1 = [], c = l$1, e = c.__b, a = c.__r, v = c.diffed, l = c.__c, m = c.unmount, s = c.__;
	function p(n, t) {
		c.__h && c.__h(r, n, o$1 || t), o$1 = 0;
		var u = r.__H || (r.__H = {
			__: [],
			__h: []
		});
		return n >= u.__.length && u.__.push({}), u.__[n];
	}
	function x(n) {
		var u = r.context[n.__c], i = p(t++, 9);
		return i.c = n, u ? (i.__ ?? (i.__ = !0, u.sub(r)), u.props.value) : n.__;
	}
	function j() {
		for (var n; n = f$1.shift();) {
			var t = n.__H;
			if (n.__P && t) try {
				t.__h.some(z), t.__h.some(B), t.__h = [];
			} catch (r) {
				t.__h = [], c.__e(r, n.__v);
			}
		}
	}
	c.__b = function(n) {
		r = null, e && e(n);
	}, c.__ = function(n, t) {
		n && t.__k && t.__k.__m && (n.__m = t.__k.__m), s && s(n, t);
	}, c.__r = function(n) {
		a && a(n), t = 0;
		var i = (r = n.__c).__H;
		i && (u$1 === r ? (i.__h = [], r.__h = [], i.__.some(function(n) {
			n.__N && (n.__ = n.__N), n.u = n.__N = void 0;
		})) : (i.__h.some(z), i.__h.some(B), i.__h = [], t = 0)), u$1 = r;
	}, c.diffed = function(n) {
		v && v(n);
		var t = n.__c;
		t && t.__H && (t.__H.__h.length && (1 !== f$1.push(t) && i$1 === c.requestAnimationFrame || ((i$1 = c.requestAnimationFrame) || w)(j)), t.__H.__.some(function(n) {
			n.u && (n.__H = n.u), n.u = void 0;
		})), u$1 = r = null;
	}, c.__c = function(n, t) {
		t.some(function(n) {
			try {
				n.__h.some(z), n.__h = n.__h.filter(function(n) {
					return !n.__ || B(n);
				});
			} catch (r) {
				t.some(function(n) {
					n.__h && (n.__h = []);
				}), t = [], c.__e(r, n.__v);
			}
		}), l && l(n, t);
	}, c.unmount = function(n) {
		m && m(n);
		var t, r = n.__c;
		r && r.__H && (r.__H.__.some(function(n) {
			try {
				z(n);
			} catch (n) {
				t = n;
			}
		}), r.__H = void 0, t && c.__e(t, r.__v));
	};
	var k = "function" == typeof requestAnimationFrame;
	function w(n) {
		var t, r = function() {
			clearTimeout(u), k && cancelAnimationFrame(t), setTimeout(n);
		}, u = setTimeout(r, 35);
		k && (t = requestAnimationFrame(r));
	}
	function z(n) {
		var t = r, u = n.__c;
		"function" == typeof u && (n.__c = void 0, u()), r = t;
	}
	function B(n) {
		var t = r;
		n.__c = n.__(), r = t;
	}
	//#endregion
	//#region node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js
	var f = 0;
	Array.isArray;
	function u(e, t, n, o, i, u) {
		t || (t = {});
		var a, c, p = t;
		if ("ref" in p) for (c in p = {}, t) "ref" == c ? a = t[c] : p[c] = t[c];
		var l = {
			type: e,
			props: p,
			key: n,
			ref: a,
			__k: null,
			__: null,
			__b: 0,
			__e: null,
			__c: null,
			constructor: void 0,
			__v: --f,
			__i: -1,
			__u: 0,
			__source: i,
			__self: u
		};
		if ("function" == typeof e && (a = e.defaultProps)) for (c in a) void 0 === p[c] && (p[c] = a[c]);
		return l$1.vnode && l$1.vnode(l), l;
	}
	//#endregion
	//#region src/presentation/contexts/SettingsContext.tsx
	var SettingsContext = X(null);
	function SettingsProvider({ settings, children }) {
		return /* @__PURE__ */ u(SettingsContext.Provider, {
			value: settings,
			children
		});
	}
	function useSettings() {
		const settings = x(SettingsContext);
		/* v8 ignore next 3 */ if (!settings) throw new Error("useSettings must be used within a SettingsProvider");
		return settings;
	}
	//#endregion
	//#region src/presentation/components/ButtonRow.tsx
	function ButtonRow({ children, visible }) {
		if (visible && !visible.value) return null;
		return /* @__PURE__ */ u("div", { children });
	}
	//#endregion
	//#region src/presentation/components/SettingButton.tsx
	function SettingButton({ label, setting, options }) {
		const handleClick = () => {
			setting.value = options[(options.indexOf(setting.value) + 1) % options.length];
		};
		return /* @__PURE__ */ u("button", {
			onClick: handleClick,
			type: "button",
			children: [
				label,
				": ",
				String(setting.value)
			]
		});
	}
	//#endregion
	//#region src/presentation/components/ControlPanel.tsx
	var SPEAK_RATE_OPTIONS = [
		.2,
		.5,
		.7,
		1,
		1.1,
		1.2
	];
	var TOGGLE_OPTIONS = [false, true];
	function ControlPanel({ boardChanged }) {
		const settings = useSettings();
		boardChanged.value;
		return /* @__PURE__ */ u("div", { children: /* @__PURE__ */ u(ButtonRow, { children: [
			/* @__PURE__ */ u(SettingButton, {
				label: "Speak Rate",
				setting: settings.speakRate,
				options: SPEAK_RATE_OPTIONS
			}),
			/* @__PURE__ */ u(SettingButton, {
				label: "Pieces List",
				setting: settings.piecesListEnabled,
				options: TOGGLE_OPTIONS
			}),
			/* @__PURE__ */ u(SettingButton, {
				label: "Dividers",
				setting: settings.dividersEnabled,
				options: TOGGLE_OPTIONS
			}),
			/* @__PURE__ */ u(SettingButton, {
				label: "Custom Board",
				setting: settings.customBoardEnabled,
				options: TOGGLE_OPTIONS
			}),
			/* @__PURE__ */ u(SettingButton, {
				label: "Flash Mode",
				setting: settings.flashModeEnabled,
				options: TOGGLE_OPTIONS
			})
		] }) });
	}
	//#endregion
	//#region src/presentation/components/root.tsx
	function createRoot(boardChanged, mountPoint, settings) {
		R(/* @__PURE__ */ u(SettingsProvider, {
			settings,
			children: /* @__PURE__ */ u(ControlPanel, { boardChanged })
		}), mountPoint);
	}
	function destroyRoot(mountPoint) {
		R(null, mountPoint);
	}
	//#endregion
	//#region src/presentation/non-preact-components/flash.ts
	function createFlashOverlay() {
		const overlay = createDiv();
		overlay.className = CssClass.USERSCRIPT_FLASH;
		overlay.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
    z-index: 1000;
    display: none;
  `;
		const container = querySelector(DomSelector.CONTAINER);
		if (container) appendChild(container, overlay);
		return { overlay };
	}
	function destroyFlashOverlay(state) {
		state.overlay.remove();
	}
	//#endregion
	//#region src/init.tsx
	async function init() {
		await waitForElement(DomSelector.KEYBOARD_MOVE);
		const settings = createSettingsStore();
		loadSettings(settings);
		setupAutoSave(settings);
		const boardChanged = y$1(0);
		const flashState = createFlashOverlay();
		const dividersState = createDividers();
		const boardObserverState = createBoardObserver(boardChanged);
		startBoardObserver(boardObserverState);
		const cleanupDividers = setupDividersEffect(dividersState, settings);
		setupKeyboardCommands(settings);
		const mountPoint = createDiv();
		const keyboardMove = querySelector(DomSelector.KEYBOARD_MOVE);
		if (keyboardMove) appendChild(keyboardMove, mountPoint);
		createRoot(boardChanged, mountPoint, settings);
		return () => {
			cleanupDividers();
			stopBoardObserver(boardObserverState);
			destroyFlashOverlay(flashState);
			destroyDividers(dividersState);
			teardownKeyboardCommands();
			destroyRoot(mountPoint);
		};
	}
	//#endregion
	//#region src/main.tsx
	init().catch(console.error);
	//#endregion
})();

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGljaGVzcy1ib2FyZC1zcGVha2VyLnVzZXIuanMiLCJuYW1lcyI6WyJpIiwidCIsInMiLCJjIiwiaCIsInciLCJyIiwibyIsImYiLCJ2IiwidSIsImUiLCJkIiwiYSIsImwiLCJqIiwieSIsIl8iLCJiIiwicCIsIlMiLCJtIiwieCIsIkUiLCJsIiwidSIsInQiLCJpIiwiciIsIm8iLCJlIiwiZiIsImMiLCJhIiwicyIsInAiLCJ2IiwidyIsIm0iLCJrIiwieCIsImoiLCJ6IiwiQiIsInUiLCJpIiwibyIsImYiLCJuIiwiciJdLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9AcHJlYWN0L3NpZ25hbHMtY29yZS9kaXN0L3NpZ25hbHMtY29yZS5tb2R1bGUuanMiLCJzcmMvY29uc3RhbnRzL2RvbS50cyIsInNyYy9wbGF0Zm9ybS9kb20udHMiLCJzcmMvcHJlc2VudGF0aW9uL25vbi1wcmVhY3QtY29tcG9uZW50cy9kaXZpZGVycy50cyIsInNyYy9hcHBsaWNhdGlvbi9oYW5kbGVycy91cGRhdGVEaXZpZGVycy50cyIsInNyYy9hcHBsaWNhdGlvbi9lZmZlY3RzL29uRGl2aWRlcnMudHMiLCJzcmMvY29uc3RhbnRzL2NvbW1hbmRzLnRzIiwic3JjL2NvbnN0YW50cy9jaGVzcy50cyIsInNyYy9kb21haW4vY2hlc3MvcGllY2VHcm91cGluZy50cyIsInNyYy9kb21haW4vc3BlZWNoL3NwZWVjaFRleHQudHMiLCJzcmMvcGxhdGZvcm0vc3BlZWNoL2NvcmUudHMiLCJzcmMvcGxhdGZvcm0vc3BlZWNoL2luZGV4LnRzIiwic3JjL2RvbWFpbi9jaGVzcy9jb29yZGluYXRlcy50cyIsInNyYy9hcHBsaWNhdGlvbi9zZXJ2aWNlcy9ib2FyZFJlYWRlci9leHRyYWN0aW9uLnRzIiwic3JjL2FwcGxpY2F0aW9uL3NlcnZpY2VzL2JvYXJkUmVhZGVyL3JlYWRlci50cyIsInNyYy9hcHBsaWNhdGlvbi9oYW5kbGVycy9oYW5kbGVTcGVlY2hDb21tYW5kLnRzIiwic3JjL2FwcGxpY2F0aW9uL2lucHV0L2tleWJvYXJkSW5wdXQudHMiLCJzcmMvcGxhdGZvcm0vbXV0YXRpb25PYnNlcnZlci50cyIsInNyYy9hcHBsaWNhdGlvbi9vYnNlcnZlcnMvb2JzZXJ2ZXJTdGF0ZS50cyIsInNyYy9jb25zdGFudHMvc2V0dGluZ3MudHMiLCJzcmMvcGxhdGZvcm0vc3RvcmFnZS50cyIsInNyYy9hcHBsaWNhdGlvbi9zZXR0aW5ncy9zZXR0aW5nc1N0b3JlLnRzIiwibm9kZV9tb2R1bGVzL3ByZWFjdC9kaXN0L3ByZWFjdC5tb2R1bGUuanMiLCJub2RlX21vZHVsZXMvcHJlYWN0L2hvb2tzL2Rpc3QvaG9va3MubW9kdWxlLmpzIiwibm9kZV9tb2R1bGVzL3ByZWFjdC9qc3gtcnVudGltZS9kaXN0L2pzeFJ1bnRpbWUubW9kdWxlLmpzIiwic3JjL3ByZXNlbnRhdGlvbi9jb250ZXh0cy9TZXR0aW5nc0NvbnRleHQudHN4Iiwic3JjL3ByZXNlbnRhdGlvbi9jb21wb25lbnRzL0J1dHRvblJvdy50c3giLCJzcmMvcHJlc2VudGF0aW9uL2NvbXBvbmVudHMvU2V0dGluZ0J1dHRvbi50c3giLCJzcmMvcHJlc2VudGF0aW9uL2NvbXBvbmVudHMvQ29udHJvbFBhbmVsLnRzeCIsInNyYy9wcmVzZW50YXRpb24vY29tcG9uZW50cy9yb290LnRzeCIsInNyYy9wcmVzZW50YXRpb24vbm9uLXByZWFjdC1jb21wb25lbnRzL2ZsYXNoLnRzIiwic3JjL2luaXQudHN4Iiwic3JjL21haW4udHN4Il0sInNvdXJjZXNDb250ZW50IjpbInZhciBpPVN5bWJvbC5mb3IoXCJwcmVhY3Qtc2lnbmFsc1wiKTtmdW5jdGlvbiB0KCl7aWYoIShzPjEpKXt2YXIgaSx0PSExOyFmdW5jdGlvbigpe3ZhciBpPWM7Yz12b2lkIDA7d2hpbGUodm9pZCAwIT09aSl7aWYoaS5TLnY9PT1pLnYpaS5TLmk9aS5pO2k9aS5vfX0oKTt3aGlsZSh2b2lkIDAhPT1oKXt2YXIgbj1oO2g9dm9pZCAwO3YrKzt3aGlsZSh2b2lkIDAhPT1uKXt2YXIgcj1uLnU7bi51PXZvaWQgMDtuLmYmPS0zO2lmKCEoOCZuLmYpJiZ3KG4pKXRyeXtuLmMoKX1jYXRjaChuKXtpZighdCl7aT1uO3Q9ITB9fW49cn19dj0wO3MtLTtpZih0KXRocm93IGl9ZWxzZSBzLS19ZnVuY3Rpb24gbihpKXtpZihzPjApcmV0dXJuIGkoKTtlPSsrdTtzKys7dHJ5e3JldHVybiBpKCl9ZmluYWxseXt0KCl9fXZhciByPXZvaWQgMDtmdW5jdGlvbiBvKGkpe3ZhciB0PXI7cj12b2lkIDA7dHJ5e3JldHVybiBpKCl9ZmluYWxseXtyPXR9fXZhciBmLGg9dm9pZCAwLHM9MCx2PTAsdT0wLGU9MCxjPXZvaWQgMCxkPTA7ZnVuY3Rpb24gYShpKXtpZih2b2lkIDAhPT1yKXt2YXIgdD1pLm47aWYodm9pZCAwPT09dHx8dC50IT09cil7dD17aTowLFM6aSxwOnIucyxuOnZvaWQgMCx0OnIsZTp2b2lkIDAseDp2b2lkIDAscjp0fTtpZih2b2lkIDAhPT1yLnMpci5zLm49dDtyLnM9dDtpLm49dDtpZigzMiZyLmYpaS5TKHQpO3JldHVybiB0fWVsc2UgaWYoLTE9PT10Lmkpe3QuaT0wO2lmKHZvaWQgMCE9PXQubil7dC5uLnA9dC5wO2lmKHZvaWQgMCE9PXQucCl0LnAubj10Lm47dC5wPXIuczt0Lm49dm9pZCAwO3Iucy5uPXQ7ci5zPXR9cmV0dXJuIHR9fX1mdW5jdGlvbiBsKGksdCl7dGhpcy52PWk7dGhpcy5pPTA7dGhpcy5uPXZvaWQgMDt0aGlzLnQ9dm9pZCAwO3RoaXMubD0wO3RoaXMuVz1udWxsPT10P3ZvaWQgMDp0LndhdGNoZWQ7dGhpcy5aPW51bGw9PXQ/dm9pZCAwOnQudW53YXRjaGVkO3RoaXMubmFtZT1udWxsPT10P3ZvaWQgMDp0Lm5hbWV9bC5wcm90b3R5cGUuYnJhbmQ9aTtsLnByb3RvdHlwZS5oPWZ1bmN0aW9uKCl7cmV0dXJuITB9O2wucHJvdG90eXBlLlM9ZnVuY3Rpb24oaSl7dmFyIHQ9dGhpcyxuPXRoaXMudDtpZihuIT09aSYmdm9pZCAwPT09aS5lKXtpLng9bjt0aGlzLnQ9aTtpZih2b2lkIDAhPT1uKW4uZT1pO2Vsc2UgbyhmdW5jdGlvbigpe3ZhciBpO251bGw9PShpPXQuVyl8fGkuY2FsbCh0KX0pfX07bC5wcm90b3R5cGUuVT1mdW5jdGlvbihpKXt2YXIgdD10aGlzO2lmKHZvaWQgMCE9PXRoaXMudCl7dmFyIG49aS5lLHI9aS54O2lmKHZvaWQgMCE9PW4pe24ueD1yO2kuZT12b2lkIDB9aWYodm9pZCAwIT09cil7ci5lPW47aS54PXZvaWQgMH1pZihpPT09dGhpcy50KXt0aGlzLnQ9cjtpZih2b2lkIDA9PT1yKW8oZnVuY3Rpb24oKXt2YXIgaTtudWxsPT0oaT10LlopfHxpLmNhbGwodCl9KX19fTtsLnByb3RvdHlwZS5zdWJzY3JpYmU9ZnVuY3Rpb24oaSl7dmFyIHQ9dGhpcztyZXR1cm4gaihmdW5jdGlvbigpe3ZhciBuPXQudmFsdWUsbz1yO3I9dm9pZCAwO3RyeXtpKG4pfWZpbmFsbHl7cj1vfX0se25hbWU6XCJzdWJcIn0pfTtsLnByb3RvdHlwZS52YWx1ZU9mPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMudmFsdWV9O2wucHJvdG90eXBlLnRvU3RyaW5nPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMudmFsdWUrXCJcIn07bC5wcm90b3R5cGUudG9KU09OPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMudmFsdWV9O2wucHJvdG90eXBlLnBlZWs9ZnVuY3Rpb24oKXt2YXIgaT10aGlzO3JldHVybiBvKGZ1bmN0aW9uKCl7cmV0dXJuIGkudmFsdWV9KX07T2JqZWN0LmRlZmluZVByb3BlcnR5KGwucHJvdG90eXBlLFwidmFsdWVcIix7Z2V0OmZ1bmN0aW9uKCl7dmFyIGk9YSh0aGlzKTtpZih2b2lkIDAhPT1pKWkuaT10aGlzLmk7cmV0dXJuIHRoaXMudn0sc2V0OmZ1bmN0aW9uKGkpe2lmKGkhPT10aGlzLnYpe2lmKHY+MTAwKXRocm93IG5ldyBFcnJvcihcIkN5Y2xlIGRldGVjdGVkXCIpOyFmdW5jdGlvbihpKXtpZigwIT09cyYmMD09PXYpaWYoaS5sIT09ZSl7aS5sPWU7Yz17UzppLHY6aS52LGk6aS5pLG86Y319fSh0aGlzKTt0aGlzLnY9aTt0aGlzLmkrKztkKys7cysrO3RyeXtmb3IodmFyIG49dGhpcy50O3ZvaWQgMCE9PW47bj1uLngpbi50Lk4oKX1maW5hbGx5e3QoKX19fX0pO2Z1bmN0aW9uIHkoaSx0KXtyZXR1cm4gbmV3IGwoaSx0KX1mdW5jdGlvbiB3KGkpe2Zvcih2YXIgdD1pLnM7dm9pZCAwIT09dDt0PXQubilpZih0LlMuaSE9PXQuaXx8IXQuUy5oKCl8fHQuUy5pIT09dC5pKXJldHVybiEwO3JldHVybiExfWZ1bmN0aW9uIF8oaSl7Zm9yKHZhciB0PWkuczt2b2lkIDAhPT10O3Q9dC5uKXt2YXIgbj10LlMubjtpZih2b2lkIDAhPT1uKXQucj1uO3QuUy5uPXQ7dC5pPS0xO2lmKHZvaWQgMD09PXQubil7aS5zPXQ7YnJlYWt9fX1mdW5jdGlvbiBiKGkpe3ZhciB0PWkucyxuPXZvaWQgMDt3aGlsZSh2b2lkIDAhPT10KXt2YXIgcj10LnA7aWYoLTE9PT10Lmkpe3QuUy5VKHQpO2lmKHZvaWQgMCE9PXIpci5uPXQubjtpZih2b2lkIDAhPT10Lm4pdC5uLnA9cn1lbHNlIG49dDt0LlMubj10LnI7aWYodm9pZCAwIT09dC5yKXQucj12b2lkIDA7dD1yfWkucz1ufWZ1bmN0aW9uIHAoaSx0KXtsLmNhbGwodGhpcyx2b2lkIDApO3RoaXMueD1pO3RoaXMucz12b2lkIDA7dGhpcy5nPWQtMTt0aGlzLmY9NDt0aGlzLlc9bnVsbD09dD92b2lkIDA6dC53YXRjaGVkO3RoaXMuWj1udWxsPT10P3ZvaWQgMDp0LnVud2F0Y2hlZDt0aGlzLm5hbWU9bnVsbD09dD92b2lkIDA6dC5uYW1lfXAucHJvdG90eXBlPW5ldyBsO3AucHJvdG90eXBlLmg9ZnVuY3Rpb24oKXt0aGlzLmYmPS0zO2lmKDEmdGhpcy5mKXJldHVybiExO2lmKDMyPT0oMzYmdGhpcy5mKSlyZXR1cm4hMDt0aGlzLmYmPS01O2lmKHRoaXMuZz09PWQpcmV0dXJuITA7dGhpcy5nPWQ7dGhpcy5mfD0xO2lmKHRoaXMuaT4wJiYhdyh0aGlzKSl7dGhpcy5mJj0tMjtyZXR1cm4hMH12YXIgaT1yO3RyeXtfKHRoaXMpO3I9dGhpczt2YXIgdD10aGlzLngoKTtpZigxNiZ0aGlzLmZ8fHRoaXMudiE9PXR8fDA9PT10aGlzLmkpe3RoaXMudj10O3RoaXMuZiY9LTE3O3RoaXMuaSsrfX1jYXRjaChpKXt0aGlzLnY9aTt0aGlzLmZ8PTE2O3RoaXMuaSsrfXI9aTtiKHRoaXMpO3RoaXMuZiY9LTI7cmV0dXJuITB9O3AucHJvdG90eXBlLlM9ZnVuY3Rpb24oaSl7aWYodm9pZCAwPT09dGhpcy50KXt0aGlzLmZ8PTM2O2Zvcih2YXIgdD10aGlzLnM7dm9pZCAwIT09dDt0PXQubil0LlMuUyh0KX1sLnByb3RvdHlwZS5TLmNhbGwodGhpcyxpKX07cC5wcm90b3R5cGUuVT1mdW5jdGlvbihpKXtpZih2b2lkIDAhPT10aGlzLnQpe2wucHJvdG90eXBlLlUuY2FsbCh0aGlzLGkpO2lmKHZvaWQgMD09PXRoaXMudCl7dGhpcy5mJj0tMzM7Zm9yKHZhciB0PXRoaXMuczt2b2lkIDAhPT10O3Q9dC5uKXQuUy5VKHQpfX19O3AucHJvdG90eXBlLk49ZnVuY3Rpb24oKXtpZighKDImdGhpcy5mKSl7dGhpcy5mfD02O2Zvcih2YXIgaT10aGlzLnQ7dm9pZCAwIT09aTtpPWkueClpLnQuTigpfX07T2JqZWN0LmRlZmluZVByb3BlcnR5KHAucHJvdG90eXBlLFwidmFsdWVcIix7Z2V0OmZ1bmN0aW9uKCl7aWYoMSZ0aGlzLmYpdGhyb3cgbmV3IEVycm9yKFwiQ3ljbGUgZGV0ZWN0ZWRcIik7dmFyIGk9YSh0aGlzKTt0aGlzLmgoKTtpZih2b2lkIDAhPT1pKWkuaT10aGlzLmk7aWYoMTYmdGhpcy5mKXRocm93IHRoaXMudjtyZXR1cm4gdGhpcy52fX0pO2Z1bmN0aW9uIGcoaSx0KXtyZXR1cm4gbmV3IHAoaSx0KX1mdW5jdGlvbiBTKGkpe3ZhciBuPWkubTtpLm09dm9pZCAwO2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIG4pe3MrKzt2YXIgbz1yO3I9dm9pZCAwO3RyeXtuKCl9Y2F0Y2godCl7aS5mJj0tMjtpLmZ8PTg7bShpKTt0aHJvdyB0fWZpbmFsbHl7cj1vO3QoKX19fWZ1bmN0aW9uIG0oaSl7Zm9yKHZhciB0PWkuczt2b2lkIDAhPT10O3Q9dC5uKXQuUy5VKHQpO2kueD12b2lkIDA7aS5zPXZvaWQgMDtTKGkpfWZ1bmN0aW9uIHgoaSl7aWYociE9PXRoaXMpdGhyb3cgbmV3IEVycm9yKFwiT3V0LW9mLW9yZGVyIGVmZmVjdFwiKTtiKHRoaXMpO3I9aTt0aGlzLmYmPS0yO2lmKDgmdGhpcy5mKW0odGhpcyk7dCgpfWZ1bmN0aW9uIEUoaSx0KXt0aGlzLng9aTt0aGlzLm09dm9pZCAwO3RoaXMucz12b2lkIDA7dGhpcy51PXZvaWQgMDt0aGlzLmY9MzI7dGhpcy5uYW1lPW51bGw9PXQ/dm9pZCAwOnQubmFtZTtpZihmKWYucHVzaCh0aGlzKX1FLnByb3RvdHlwZS5jPWZ1bmN0aW9uKCl7dmFyIGk9dGhpcy5TKCk7dHJ5e2lmKDgmdGhpcy5mKXJldHVybjtpZih2b2lkIDA9PT10aGlzLngpcmV0dXJuO3ZhciB0PXRoaXMueCgpO2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIHQpdGhpcy5tPXR9ZmluYWxseXtpKCl9fTtFLnByb3RvdHlwZS5TPWZ1bmN0aW9uKCl7aWYoMSZ0aGlzLmYpdGhyb3cgbmV3IEVycm9yKFwiQ3ljbGUgZGV0ZWN0ZWRcIik7dGhpcy5mfD0xO3RoaXMuZiY9LTk7Uyh0aGlzKTtfKHRoaXMpO3MrKzt2YXIgaT1yO3I9dGhpcztyZXR1cm4geC5iaW5kKHRoaXMsaSl9O0UucHJvdG90eXBlLk49ZnVuY3Rpb24oKXtpZighKDImdGhpcy5mKSl7dGhpcy5mfD0yO3RoaXMudT1oO2g9dGhpc319O0UucHJvdG90eXBlLmQ9ZnVuY3Rpb24oKXt0aGlzLmZ8PTg7aWYoISgxJnRoaXMuZikpbSh0aGlzKX07RS5wcm90b3R5cGUuZGlzcG9zZT1mdW5jdGlvbigpe3RoaXMuZCgpfTtmdW5jdGlvbiBqKGksdCl7dmFyIG49bmV3IEUoaSx0KTt0cnl7bi5jKCl9Y2F0Y2goaSl7bi5kKCk7dGhyb3cgaX12YXIgcj1uLmQuYmluZChuKTtyW1N5bWJvbC5kaXNwb3NlXT1yO3JldHVybiByfWZ1bmN0aW9uIEMoaSl7cmV0dXJuIGZ1bmN0aW9uKCl7dmFyIHQ9YXJndW1lbnRzLHI9dGhpcztyZXR1cm4gbihmdW5jdGlvbigpe3JldHVybiBvKGZ1bmN0aW9uKCl7cmV0dXJuIGkuYXBwbHkocixbXS5zbGljZS5jYWxsKHQpKX0pfSl9fWZ1bmN0aW9uIE8oKXt2YXIgaT1mO2Y9W107cmV0dXJuIGZ1bmN0aW9uKCl7dmFyIHQ9ZjtpZihmJiZpKWk9aS5jb25jYXQoZik7Zj1pO3JldHVybiB0fX12YXIgaz1mdW5jdGlvbihpKXtmb3IodmFyIHQgaW4gaSl7dmFyIG49aVt0XTtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBuKWlbdF09QyhuKTtlbHNlIGlmKFwib2JqZWN0XCI9PXR5cGVvZiBuJiZudWxsIT09biYmIShcImJyYW5kXCJpbiBuKSlrKG4pfX07ZnVuY3Rpb24gVChpKXtyZXR1cm4gZnVuY3Rpb24oKXt2YXIgdCxuLHI9TygpO3RyeXtuPWkuYXBwbHkodm9pZCAwLFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKSl9Y2F0Y2goaSl7Zj12b2lkIDA7dGhyb3cgaX1maW5hbGx5e3Q9cigpfWsobik7bltTeW1ib2wuZGlzcG9zZV09QyhmdW5jdGlvbigpe2lmKHQpZm9yKHZhciBpPTA7aTx0Lmxlbmd0aDtpKyspdFtpXS5kaXNwb3NlKCk7dD12b2lkIDB9KTtyZXR1cm4gbn19ZXhwb3J0e3AgYXMgQ29tcHV0ZWQsRSBhcyBFZmZlY3QsbCBhcyBTaWduYWwsQyBhcyBhY3Rpb24sbiBhcyBiYXRjaCxnIGFzIGNvbXB1dGVkLFQgYXMgY3JlYXRlTW9kZWwsaiBhcyBlZmZlY3QseSBhcyBzaWduYWwsbyBhcyB1bnRyYWNrZWR9Oy8vIyBzb3VyY2VNYXBwaW5nVVJMPXNpZ25hbHMtY29yZS5tb2R1bGUuanMubWFwXG4iLCIvLyBET00gc2VsZWN0b3JzIGVudW1cbmV4cG9ydCBlbnVtIERvbVNlbGVjdG9yIHtcbiAgQk9BUkQgPSAnY2ctYm9hcmQnLFxuICBCT0FSRF9OT19DVVNUT00gPSAnY2ctYm9hcmQ6bm90KC51c2Vyc2NyaXB0LWN1c3RvbS1ib2FyZCknLFxuICBDT09SRFMgPSAnY29vcmRzJyxcbiAgUElFQ0UgPSAncGllY2UnLFxuICBDT05UQUlORVIgPSAnY2ctY29udGFpbmVyJyxcbiAgS0VZQk9BUkRfTU9WRSA9ICcua2V5Ym9hcmQtbW92ZScsXG4gIEtFWUJPQVJEX0lOUFVUID0gJy5rZXlib2FyZC1tb3ZlIGlucHV0Jyxcbn1cblxuLy8gQ1NTIGNsYXNzZXMgZW51bVxuZXhwb3J0IGVudW0gQ3NzQ2xhc3Mge1xuICBCTEFDSyA9ICdibGFjaycsXG4gIFVTRVJTQ1JJUFRfRElWSURFUlMgPSAndXNlcnNjcmlwdC1kaXZpZGVycycsXG4gIFVTRVJTQ1JJUFRfRkxBU0ggPSAndXNlcnNjcmlwdC1mbGFzaC1vdmVybGF5Jyxcbn1cblxuLy8gQ1NTIGRpc3BsYXkgdmFsdWVzIGVudW1cbmV4cG9ydCBlbnVtIENzc0Rpc3BsYXkge1xuICBCTE9DSyA9ICdibG9jaycsXG4gIE5PTkUgPSAnbm9uZScsXG59XG4iLCJleHBvcnQgZnVuY3Rpb24gY3JlYXRlRGl2KCk6IEhUTUxEaXZFbGVtZW50IHtcbiAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTdmdFbGVtZW50KHRhZzogc3RyaW5nKTogU1ZHRWxlbWVudCB7XG4gIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgdGFnKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcXVlcnlTZWxlY3RvcihzZWxlY3Rvcjogc3RyaW5nKTogRWxlbWVudCB8IG51bGwge1xuICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcilcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3I6IHN0cmluZyk6IE5vZGVMaXN0T2Y8RWxlbWVudD4ge1xuICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcilcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFwcGVuZENoaWxkKHBhcmVudDogRWxlbWVudCwgY2hpbGQ6IEVsZW1lbnQpOiB2b2lkIHtcbiAgcGFyZW50LmFwcGVuZENoaWxkKGNoaWxkKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGVsZW1lbnQ6IEVsZW1lbnQpOiBET01SZWN0IHtcbiAgcmV0dXJuIGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdhaXRGb3JFbGVtZW50KHNlbGVjdG9yOiBzdHJpbmcpOiBQcm9taXNlPEVsZW1lbnQ+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgY29uc3QgZWxlbWVudCA9IHF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpXG4gICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgIHJlc29sdmUoZWxlbWVudClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgY29uc3QgZWxlbWVudCA9IHF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpXG4gICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICBvYnNlcnZlci5kaXNjb25uZWN0KClcbiAgICAgICAgcmVzb2x2ZShlbGVtZW50KVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmJvZHksIHtcbiAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgIHN1YnRyZWU6IHRydWUsXG4gICAgfSlcbiAgfSlcbn1cbiIsImltcG9ydCB7IENzc0NsYXNzLCBDc3NEaXNwbGF5LCBEb21TZWxlY3RvciB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy9kb20nXG5pbXBvcnQgeyBhcHBlbmRDaGlsZCwgY3JlYXRlU3ZnRWxlbWVudCwgcXVlcnlTZWxlY3RvciB9IGZyb20gJy4uLy4uL3BsYXRmb3JtL2RvbSdcblxuZXhwb3J0IGludGVyZmFjZSBEaXZpZGVyc1N0YXRlIHtcbiAgc3ZnOiBTVkdTVkdFbGVtZW50XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVEaXZpZGVycygpOiBEaXZpZGVyc1N0YXRlIHtcbiAgY29uc3QgYm9hcmQgPSBxdWVyeVNlbGVjdG9yKERvbVNlbGVjdG9yLkJPQVJEKVxuICBpZiAoIWJvYXJkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdCb2FyZCBub3QgZm91bmQnKVxuICB9XG5cbiAgY29uc3QgcmVjdCA9IGJvYXJkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gIGNvbnN0IHNpemUgPSByZWN0LndpZHRoXG5cbiAgY29uc3Qgc3ZnID0gY3JlYXRlU3ZnRWxlbWVudCgnc3ZnJykgYXMgU1ZHU1ZHRWxlbWVudFxuICBzdmcuc2V0QXR0cmlidXRlKCdjbGFzcycsIENzc0NsYXNzLlVTRVJTQ1JJUFRfRElWSURFUlMpXG4gIHN2Zy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgc2l6ZS50b1N0cmluZygpKVxuICBzdmcuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBzaXplLnRvU3RyaW5nKCkpXG4gIHN2Zy5zdHlsZS5jc3NUZXh0ID0gYFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDA7XG4gICAgbGVmdDogMDtcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICBkaXNwbGF5OiBub25lO1xuICBgXG5cbiAgLy8gVmVydGljYWwgbGluZVxuICBjb25zdCB2TGluZSA9IGNyZWF0ZVN2Z0VsZW1lbnQoJ2xpbmUnKVxuICB2TGluZS5zZXRBdHRyaWJ1dGUoJ3gxJywgKHNpemUgLyAyKS50b1N0cmluZygpKVxuICB2TGluZS5zZXRBdHRyaWJ1dGUoJ3kxJywgJzAnKVxuICB2TGluZS5zZXRBdHRyaWJ1dGUoJ3gyJywgKHNpemUgLyAyKS50b1N0cmluZygpKVxuICB2TGluZS5zZXRBdHRyaWJ1dGUoJ3kyJywgc2l6ZS50b1N0cmluZygpKVxuICB2TGluZS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsICdyZWQnKVxuICB2TGluZS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS13aWR0aCcsICcyJylcblxuICAvLyBIb3Jpem9udGFsIGxpbmVcbiAgY29uc3QgaExpbmUgPSBjcmVhdGVTdmdFbGVtZW50KCdsaW5lJylcbiAgaExpbmUuc2V0QXR0cmlidXRlKCd4MScsICcwJylcbiAgaExpbmUuc2V0QXR0cmlidXRlKCd5MScsIChzaXplIC8gMikudG9TdHJpbmcoKSlcbiAgaExpbmUuc2V0QXR0cmlidXRlKCd4MicsIHNpemUudG9TdHJpbmcoKSlcbiAgaExpbmUuc2V0QXR0cmlidXRlKCd5MicsIChzaXplIC8gMikudG9TdHJpbmcoKSlcbiAgaExpbmUuc2V0QXR0cmlidXRlKCdzdHJva2UnLCAncmVkJylcbiAgaExpbmUuc2V0QXR0cmlidXRlKCdzdHJva2Utd2lkdGgnLCAnMicpXG5cbiAgYXBwZW5kQ2hpbGQoc3ZnLCB2TGluZSlcbiAgYXBwZW5kQ2hpbGQoc3ZnLCBoTGluZSlcblxuICBhcHBlbmRDaGlsZChib2FyZCwgc3ZnKVxuXG4gIHJldHVybiB7IHN2ZyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93RGl2aWRlcnMoc3RhdGU6IERpdmlkZXJzU3RhdGUpOiB2b2lkIHtcbiAgc3RhdGUuc3ZnLnN0eWxlLmRpc3BsYXkgPSBDc3NEaXNwbGF5LkJMT0NLXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoaWRlRGl2aWRlcnMoc3RhdGU6IERpdmlkZXJzU3RhdGUpOiB2b2lkIHtcbiAgc3RhdGUuc3ZnLnN0eWxlLmRpc3BsYXkgPSBDc3NEaXNwbGF5Lk5PTkVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlc3Ryb3lEaXZpZGVycyhzdGF0ZTogRGl2aWRlcnNTdGF0ZSk6IHZvaWQge1xuICBzdGF0ZS5zdmcucmVtb3ZlKClcbn1cbiIsImltcG9ydCB7XG4gIHR5cGUgRGl2aWRlcnNTdGF0ZSxcbiAgaGlkZURpdmlkZXJzLFxuICBzaG93RGl2aWRlcnMsXG59IGZyb20gJy4uLy4uL3ByZXNlbnRhdGlvbi9ub24tcHJlYWN0LWNvbXBvbmVudHMvZGl2aWRlcnMnXG5pbXBvcnQgdHlwZSB7IFNldHRpbmdzU3RvcmUgfSBmcm9tICcuLi9zZXR0aW5ncy9zZXR0aW5nc1N0b3JlJ1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlRGl2aWRlcnMoc3RhdGU6IERpdmlkZXJzU3RhdGUsIHNldHRpbmdzOiBTZXR0aW5nc1N0b3JlKTogdm9pZCB7XG4gIGlmIChzZXR0aW5ncy5kaXZpZGVyc0VuYWJsZWQudmFsdWUpIHtcbiAgICBzaG93RGl2aWRlcnMoc3RhdGUpXG4gIH0gZWxzZSB7XG4gICAgaGlkZURpdmlkZXJzKHN0YXRlKVxuICB9XG59XG4iLCJpbXBvcnQgeyBlZmZlY3QgfSBmcm9tICdAcHJlYWN0L3NpZ25hbHMtY29yZSdcbmltcG9ydCB0eXBlIHsgRGl2aWRlcnNTdGF0ZSB9IGZyb20gJy4uLy4uL3ByZXNlbnRhdGlvbi9ub24tcHJlYWN0LWNvbXBvbmVudHMvZGl2aWRlcnMnXG5pbXBvcnQgeyB1cGRhdGVEaXZpZGVycyB9IGZyb20gJy4uL2hhbmRsZXJzL3VwZGF0ZURpdmlkZXJzJ1xuaW1wb3J0IHR5cGUgeyBTZXR0aW5nc1N0b3JlIH0gZnJvbSAnLi4vc2V0dGluZ3Mvc2V0dGluZ3NTdG9yZSdcblxuZXhwb3J0IGZ1bmN0aW9uIHNldHVwRGl2aWRlcnNFZmZlY3Qoc3RhdGU6IERpdmlkZXJzU3RhdGUsIHNldHRpbmdzOiBTZXR0aW5nc1N0b3JlKTogKCkgPT4gdm9pZCB7XG4gIHJldHVybiBlZmZlY3QoKCkgPT4ge1xuICAgIHNldHRpbmdzLmRpdmlkZXJzRW5hYmxlZC52YWx1ZVxuICAgIHVwZGF0ZURpdmlkZXJzKHN0YXRlLCBzZXR0aW5ncylcbiAgfSlcbn1cbiIsImV4cG9ydCBlbnVtIEtleWJvYXJkQ29tbWFuZCB7XG4gIFBXSyA9ICdwd2snLFxuICBQV1EgPSAncHdxJyxcbiAgUEJLID0gJ3BiaycsXG4gIFBCUSA9ICdwYnEnLFxuICBQQSA9ICdwYScsXG4gIFBXVyA9ICdwd3cnLFxuICBQQkIgPSAncGJiJyxcbiAgUFNTID0gJ3BzcycsXG59XG5cbmV4cG9ydCBlbnVtIFNwZWVjaENvbW1hbmQge1xuICBBTEwgPSAnYWxsJyxcbiAgV0hJVEUgPSAnd2hpdGUnLFxuICBCTEFDSyA9ICdibGFjaycsXG4gIFNUT1AgPSAnc3RvcCcsXG4gIFdLID0gJ3drJyxcbiAgV1EgPSAnd3EnLFxuICBCSyA9ICdiaycsXG4gIEJRID0gJ2JxJyxcbn1cblxuLy8gS2V5Ym9hcmQgdG8gc3BlZWNoIGNvbW1hbmQgbWFwcGluZ1xuZXhwb3J0IGNvbnN0IEtFWUJPQVJEX0NPTU1BTkRfTUFQID0gbmV3IE1hcChbXG4gIFtLZXlib2FyZENvbW1hbmQuUFdLLCBTcGVlY2hDb21tYW5kLldLXSxcbiAgW0tleWJvYXJkQ29tbWFuZC5QV1EsIFNwZWVjaENvbW1hbmQuV1FdLFxuICBbS2V5Ym9hcmRDb21tYW5kLlBCSywgU3BlZWNoQ29tbWFuZC5CS10sXG4gIFtLZXlib2FyZENvbW1hbmQuUEJRLCBTcGVlY2hDb21tYW5kLkJRXSxcbiAgW0tleWJvYXJkQ29tbWFuZC5QQSwgU3BlZWNoQ29tbWFuZC5BTExdLFxuICBbS2V5Ym9hcmRDb21tYW5kLlBXVywgU3BlZWNoQ29tbWFuZC5XSElURV0sXG4gIFtLZXlib2FyZENvbW1hbmQuUEJCLCBTcGVlY2hDb21tYW5kLkJMQUNLXSxcbiAgW0tleWJvYXJkQ29tbWFuZC5QU1MsIFNwZWVjaENvbW1hbmQuU1RPUF0sXG5dIGFzIGNvbnN0KVxuIiwiZXhwb3J0IGVudW0gUGxheWVyQ29sb3Ige1xuICBXSElURSA9ICd3aGl0ZScsXG4gIEJMQUNLID0gJ2JsYWNrJyxcbn1cblxuZXhwb3J0IGVudW0gUGllY2VUeXBlIHtcbiAgUEFXTiA9ICdwYXduJyxcbiAgS05JR0hUID0gJ2tuaWdodCcsXG4gIEJJU0hPUCA9ICdiaXNob3AnLFxuICBST09LID0gJ3Jvb2snLFxuICBRVUVFTiA9ICdxdWVlbicsXG4gIEtJTkcgPSAna2luZycsXG59XG5cbmV4cG9ydCBlbnVtIFF1YWRyYW50IHtcbiAgV0hJVEVfS0lORyA9ICd3aycsXG4gIFdISVRFX1FVRUVOID0gJ3dxJyxcbiAgQkxBQ0tfS0lORyA9ICdiaycsXG4gIEJMQUNLX1FVRUVOID0gJ2JxJyxcbn1cblxuLy8gSGVscGVyIGFycmF5cyBmb3IgaXRlcmF0aW9uXG5leHBvcnQgY29uc3QgUExBWUVSX0NPTE9SX1ZBTFVFUyA9IE9iamVjdC52YWx1ZXMoUGxheWVyQ29sb3IpXG5leHBvcnQgY29uc3QgUElFQ0VfVFlQRV9WQUxVRVMgPSBPYmplY3QudmFsdWVzKFBpZWNlVHlwZSlcbmV4cG9ydCBjb25zdCBRVUFEUkFOVF9WQUxVRVMgPSBPYmplY3QudmFsdWVzKFF1YWRyYW50KVxuIiwiaW1wb3J0IHsgdHlwZSBQaWVjZVR5cGUsIFBsYXllckNvbG9yLCBRdWFkcmFudCB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy9jaGVzcydcblxuZXhwb3J0IGludGVyZmFjZSBQaWVjZVBvc2l0aW9uIHtcbiAgc3F1YXJlOiBzdHJpbmdcbiAgY29sb3I6IFBsYXllckNvbG9yXG4gIHR5cGU6IFBpZWNlVHlwZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyUXVhZHJhbnQocGllY2VzOiBQaWVjZVBvc2l0aW9uW10sIHF1YWRyYW50OiBRdWFkcmFudCk6IFBpZWNlUG9zaXRpb25bXSB7XG4gIHJldHVybiBwaWVjZXMuZmlsdGVyKChwaWVjZSkgPT4ge1xuICAgIC8vIFZhbGlkYXRlIHNxdWFyZSBmb3JtYXRcbiAgICBpZiAoIXBpZWNlLnNxdWFyZSB8fCBwaWVjZS5zcXVhcmUubGVuZ3RoIDwgMikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHNxdWFyZSBmb3JtYXQ6ICR7cGllY2Uuc3F1YXJlfWApXG4gICAgfVxuXG4gICAgY29uc3QgZmlsZSA9IHBpZWNlLnNxdWFyZVswXVxuICAgIGNvbnN0IHJhbmsgPSBOdW1iZXIucGFyc2VJbnQocGllY2Uuc3F1YXJlWzFdLCAxMClcblxuICAgIC8vIFZhbGlkYXRlIGZpbGUgYW5kIHJhbmtcbiAgICBpZiAoZmlsZSA8ICdhJyB8fCBmaWxlID4gJ2gnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgZmlsZTogJHtmaWxlfWApXG4gICAgfVxuICAgIGlmIChOdW1iZXIuaXNOYU4ocmFuaykgfHwgcmFuayA8IDEgfHwgcmFuayA+IDgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCByYW5rOiAke3Jhbmt9YClcbiAgICB9XG5cbiAgICAvLyBEZXRlcm1pbmUgZmlsZSByYW5nZSAoa2luZy1zaWRlOiBlLWgsIHF1ZWVuLXNpZGU6IGEtZClcbiAgICBjb25zdCBpc0tpbmdTaWRlID0gZmlsZSA+PSAnZSdcblxuICAgIC8vIERldGVybWluZSByYW5rIHJhbmdlICh3aGl0ZTogMS00LCBibGFjazogNS04KVxuICAgIGNvbnN0IGlzV2hpdGVSYW5rcyA9IHJhbmsgPj0gMSAmJiByYW5rIDw9IDRcblxuICAgIC8vIE1hdGNoIHF1YWRyYW50XG4gICAgaWYgKHF1YWRyYW50ID09PSBRdWFkcmFudC5XSElURV9LSU5HKSByZXR1cm4gaXNLaW5nU2lkZSAmJiBpc1doaXRlUmFua3NcbiAgICBpZiAocXVhZHJhbnQgPT09IFF1YWRyYW50LldISVRFX1FVRUVOKSByZXR1cm4gIWlzS2luZ1NpZGUgJiYgaXNXaGl0ZVJhbmtzXG4gICAgaWYgKHF1YWRyYW50ID09PSBRdWFkcmFudC5CTEFDS19LSU5HKSByZXR1cm4gaXNLaW5nU2lkZSAmJiAhaXNXaGl0ZVJhbmtzXG4gICAgaWYgKHF1YWRyYW50ID09PSBRdWFkcmFudC5CTEFDS19RVUVFTikgcmV0dXJuICFpc0tpbmdTaWRlICYmICFpc1doaXRlUmFua3NcblxuICAgIHJldHVybiBmYWxzZVxuICB9KVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEdyb3VwZWRQaWVjZXMge1xuICBjb2xvcjogUGxheWVyQ29sb3JcbiAgdHlwZTogc3RyaW5nXG4gIHNxdWFyZXM6IHN0cmluZ1tdXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBncm91cEJ5Q29sb3JBbmRUeXBlKHBpZWNlczogUGllY2VQb3NpdGlvbltdKTogR3JvdXBlZFBpZWNlc1tdIHtcbiAgY29uc3QgZ3JvdXBzID0gbmV3IE1hcDxzdHJpbmcsIEdyb3VwZWRQaWVjZXM+KClcblxuICBmb3IgKGNvbnN0IHBpZWNlIG9mIHBpZWNlcykge1xuICAgIC8vIFZhbGlkYXRlIHJlcXVpcmVkIHByb3BlcnRpZXNcbiAgICBpZiAoIXBpZWNlLnNxdWFyZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQaWVjZSBtaXNzaW5nIHNxdWFyZSBwcm9wZXJ0eScpXG4gICAgfVxuICAgIGlmICghcGllY2UuY29sb3IpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUGllY2UgbWlzc2luZyBjb2xvciBwcm9wZXJ0eScpXG4gICAgfVxuICAgIGlmICghcGllY2UudHlwZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQaWVjZSBtaXNzaW5nIHR5cGUgcHJvcGVydHknKVxuICAgIH1cblxuICAgIGNvbnN0IGtleSA9IGAke3BpZWNlLmNvbG9yfS0ke3BpZWNlLnR5cGV9YFxuXG4gICAgaWYgKCFncm91cHMuaGFzKGtleSkpIHtcbiAgICAgIGdyb3Vwcy5zZXQoa2V5LCB7XG4gICAgICAgIGNvbG9yOiBwaWVjZS5jb2xvcixcbiAgICAgICAgdHlwZTogcGllY2UudHlwZSxcbiAgICAgICAgc3F1YXJlczogW10sXG4gICAgICB9KVxuICAgIH1cblxuICAgIGdyb3Vwcy5nZXQoa2V5KT8uc3F1YXJlcy5wdXNoKHBpZWNlLnNxdWFyZSlcbiAgfVxuXG4gIC8vIFNvcnQgZ3JvdXBzIGJ5IGNvbG9yICh3aGl0ZSBmaXJzdCkgdGhlbiB0eXBlXG4gIHJldHVybiBBcnJheS5mcm9tKGdyb3Vwcy52YWx1ZXMoKSkuc29ydCgoYSwgYikgPT4ge1xuICAgIGlmIChhLmNvbG9yICE9PSBiLmNvbG9yKSB7XG4gICAgICByZXR1cm4gYS5jb2xvciA9PT0gUGxheWVyQ29sb3IuV0hJVEUgPyAtMSA6IDFcbiAgICB9XG4gICAgcmV0dXJuIGEudHlwZS5sb2NhbGVDb21wYXJlKGIudHlwZSlcbiAgfSlcbn1cbiIsImltcG9ydCB7IHR5cGUgUGllY2VQb3NpdGlvbiwgZ3JvdXBCeUNvbG9yQW5kVHlwZSB9IGZyb20gJy4uL2NoZXNzL3BpZWNlR3JvdXBpbmcnXG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVF1YWRyYW50VGV4dChwaWVjZXM6IFBpZWNlUG9zaXRpb25bXSk6IHN0cmluZyB7XG4gIGlmIChwaWVjZXMubGVuZ3RoID09PSAwKSByZXR1cm4gJydcblxuICBjb25zdCBncm91cHMgPSBncm91cEJ5Q29sb3JBbmRUeXBlKHBpZWNlcylcbiAgY29uc3Qgc2VudGVuY2VzOiBzdHJpbmdbXSA9IFtdXG5cbiAgZm9yIChjb25zdCBncm91cCBvZiBncm91cHMpIHtcbiAgICBjb25zdCBjb2xvck5hbWUgPSBncm91cC5jb2xvclxuICAgIGNvbnN0IHR5cGVOYW1lID0gZ3JvdXAuc3F1YXJlcy5sZW5ndGggPiAxID8gYCR7Z3JvdXAudHlwZX1zYCA6IGdyb3VwLnR5cGVcblxuICAgIGlmIChncm91cC5zcXVhcmVzLmxlbmd0aCA+IDEpIHtcbiAgICAgIC8vIE11bHRpcGxlIHBpZWNlczogXCJ3aGl0ZSBwYXducyBvbiBhMiwgYjJcIlxuICAgICAgY29uc3Qgc3F1YXJlcyA9IGdyb3VwLnNxdWFyZXMuam9pbignLCAnKVxuICAgICAgc2VudGVuY2VzLnB1c2goYCR7Y29sb3JOYW1lfSAke3R5cGVOYW1lfSBvbiAke3NxdWFyZXN9YClcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU2luZ2xlIHBpZWNlOiBcImUxIHdoaXRlIGtpbmdcIlxuICAgICAgc2VudGVuY2VzLnB1c2goYCR7Z3JvdXAuc3F1YXJlc1swXX0gJHtjb2xvck5hbWV9ICR7Z3JvdXAudHlwZX1gKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBgJHtzZW50ZW5jZXMuam9pbignLiAnKX0uYFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVBbGxQaWVjZXNUZXh0KHBpZWNlczogUGllY2VQb3NpdGlvbltdKTogc3RyaW5nIHtcbiAgcmV0dXJuIGdlbmVyYXRlUXVhZHJhbnRUZXh0KHBpZWNlcylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlQ29sb3JUZXh0KHBpZWNlczogUGllY2VQb3NpdGlvbltdLCBjb2xvcjogJ3doaXRlJyB8ICdibGFjaycpOiBzdHJpbmcge1xuICBjb25zdCBmaWx0ZXJlZCA9IHBpZWNlcy5maWx0ZXIoKHApID0+IHAuY29sb3IgPT09IGNvbG9yKVxuICByZXR1cm4gZ2VuZXJhdGVRdWFkcmFudFRleHQoZmlsdGVyZWQpXG59XG4iLCJleHBvcnQgZnVuY3Rpb24gZ2V0U3BlZWNoU3ludGhlc2lzKCk6IFNwZWVjaFN5bnRoZXNpcyB7XG4gIHJldHVybiB3aW5kb3cuc3BlZWNoU3ludGhlc2lzXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTcGVlY2hTeW50aGVzaXNVdHRlcmFuY2UoKTogdHlwZW9mIFNwZWVjaFN5bnRoZXNpc1V0dGVyYW5jZSB7XG4gIHJldHVybiBTcGVlY2hTeW50aGVzaXNVdHRlcmFuY2Vcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNwZWFrKHN5bnRoZXNpczogU3BlZWNoU3ludGhlc2lzLCB1dHRlcmFuY2U6IFNwZWVjaFN5bnRoZXNpc1V0dGVyYW5jZSk6IHZvaWQge1xuICBzeW50aGVzaXMuc3BlYWsodXR0ZXJhbmNlKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FuY2VsKHN5bnRoZXNpczogU3BlZWNoU3ludGhlc2lzKTogdm9pZCB7XG4gIHN5bnRoZXNpcy5jYW5jZWwoKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVXR0ZXJhbmNlKFxuICBVdHRlcmFuY2VDbGFzczogdHlwZW9mIFNwZWVjaFN5bnRoZXNpc1V0dGVyYW5jZSxcbiAgdGV4dDogc3RyaW5nXG4pOiBTcGVlY2hTeW50aGVzaXNVdHRlcmFuY2Uge1xuICByZXR1cm4gbmV3IFV0dGVyYW5jZUNsYXNzKHRleHQpXG59XG4iLCJpbXBvcnQgKiBhcyBjb3JlIGZyb20gJy4vY29yZSdcblxuZXhwb3J0IGZ1bmN0aW9uIHNwZWFrVGV4dCh0ZXh0OiBzdHJpbmcsIHJhdGU6IG51bWJlcik6IHZvaWQge1xuICBjb25zdCBzeW50aGVzaXMgPSBjb3JlLmdldFNwZWVjaFN5bnRoZXNpcygpXG4gIGNvbnN0IFV0dGVyYW5jZUNsYXNzID0gY29yZS5nZXRTcGVlY2hTeW50aGVzaXNVdHRlcmFuY2UoKVxuICBjb25zdCB1dHRlcmFuY2UgPSBjb3JlLmNyZWF0ZVV0dGVyYW5jZShVdHRlcmFuY2VDbGFzcywgdGV4dClcbiAgdXR0ZXJhbmNlLnJhdGUgPSByYXRlXG4gIGNvcmUuc3BlYWsoc3ludGhlc2lzLCB1dHRlcmFuY2UpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdG9wU3BlYWtpbmcoKTogdm9pZCB7XG4gIGNvbnN0IHN5bnRoZXNpcyA9IGNvcmUuZ2V0U3BlZWNoU3ludGhlc2lzKClcbiAgY29yZS5jYW5jZWwoc3ludGhlc2lzKVxufVxuIiwiaW1wb3J0IHsgUGxheWVyQ29sb3IgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvY2hlc3MnXG5cbmV4cG9ydCBpbnRlcmZhY2UgUGl4ZWxQb3NpdGlvbiB7XG4gIHg6IG51bWJlclxuICB5OiBudW1iZXJcbn1cblxuY29uc3QgRklMRVMgPSAnYWJjZGVmZ2gnXG5cbmV4cG9ydCBmdW5jdGlvbiBwaXhlbHNUb1NxdWFyZShcbiAgcG9zaXRpb246IFBpeGVsUG9zaXRpb24sXG4gIHNxdWFyZVNpemU6IG51bWJlcixcbiAgcGxheWVyQ29sb3I6IFBsYXllckNvbG9yXG4pOiBzdHJpbmcge1xuICAvLyBDb252ZXJ0IHBpeGVscyB0byBncmlkIGluZGljZXMgKDAtNylcbiAgLy8gQWRqdXN0IGZvciBjZW50ZXItYmFzZWQgY29vcmRpbmF0ZXMgYmVmb3JlIHJvdW5kaW5nXG4gIGxldCBjb2wgPSBNYXRoLnJvdW5kKChwb3NpdGlvbi54IC0gc3F1YXJlU2l6ZSAvIDIpIC8gc3F1YXJlU2l6ZSlcbiAgbGV0IHJvdyA9IE1hdGgucm91bmQoKHBvc2l0aW9uLnkgLSBzcXVhcmVTaXplIC8gMikgLyBzcXVhcmVTaXplKVxuXG4gIC8vIENsYW1wIHRvIHZhbGlkIHJhbmdlXG4gIGNvbCA9IE1hdGgubWF4KDAsIE1hdGgubWluKDcsIGNvbCkpXG4gIHJvdyA9IE1hdGgubWF4KDAsIE1hdGgubWluKDcsIHJvdykpXG5cbiAgLy8gQ29udmVydCB0byByYW5rIGJhc2VkIG9uIHBsYXllciBjb2xvclxuICAvLyBGb3Igd2hpdGU6IHk9MCBpcyByYW5rIDgsIHkgaW5jcmVhc2VzIGdvaW5nIHRvIHJhbmsgMVxuICAvLyBGb3IgYmxhY2s6IHk9MCBpcyByYW5rIDEsIHkgaW5jcmVhc2VzIGdvaW5nIHRvIHJhbmsgOFxuICBsZXQgcmFuazogbnVtYmVyXG4gIGxldCBmaWxlOiBzdHJpbmdcblxuICBpZiAocGxheWVyQ29sb3IgPT09IFBsYXllckNvbG9yLldISVRFKSB7XG4gICAgZmlsZSA9IEZJTEVTW2NvbF1cbiAgICByYW5rID0gOCAtIHJvd1xuICB9IGVsc2Uge1xuICAgIGZpbGUgPSBGSUxFU1s3IC0gY29sXVxuICAgIHJhbmsgPSByb3cgKyAxXG4gIH1cblxuICByZXR1cm4gYCR7ZmlsZX0ke3Jhbmt9YFxufVxuXG5leHBvcnQgZnVuY3Rpb24gc3F1YXJlVG9QaXhlbHMoXG4gIHNxdWFyZTogc3RyaW5nLFxuICBzcXVhcmVTaXplOiBudW1iZXIsXG4gIHBsYXllckNvbG9yOiBQbGF5ZXJDb2xvclxuKTogUGl4ZWxQb3NpdGlvbiB7XG4gIC8vIFZhbGlkYXRlIHNxdWFyZSBmb3JtYXRcbiAgaWYgKHNxdWFyZS5sZW5ndGggPCAyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHNxdWFyZSBub3RhdGlvbjogJHtzcXVhcmV9YClcbiAgfVxuXG4gIC8vIFBhcnNlIHNxdWFyZSBub3RhdGlvblxuICBjb25zdCBmaWxlID0gc3F1YXJlWzBdXG4gIGNvbnN0IHJhbmsgPSBOdW1iZXIucGFyc2VJbnQoc3F1YXJlWzFdLCAxMClcblxuICAvLyBWYWxpZGF0ZSBmaWxlIGFuZCByYW5rXG4gIGNvbnN0IGNvbCA9IEZJTEVTLmluZGV4T2YoZmlsZSlcbiAgaWYgKGNvbCA9PT0gLTEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgZmlsZTogJHtmaWxlfWApXG4gIH1cbiAgaWYgKHJhbmsgPCAxIHx8IHJhbmsgPiA4IHx8IE51bWJlci5pc05hTihyYW5rKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCByYW5rOiAke3Jhbmt9YClcbiAgfVxuXG4gIC8vIENhbGN1bGF0ZSBwaXhlbCBwb3NpdGlvbiBiYXNlZCBvbiBwbGF5ZXIgY29sb3JcbiAgbGV0IHBpeGVsQ29sOiBudW1iZXJcbiAgbGV0IHBpeGVsUm93OiBudW1iZXJcblxuICBpZiAocGxheWVyQ29sb3IgPT09IFBsYXllckNvbG9yLldISVRFKSB7XG4gICAgLy8gRm9yIHdoaXRlOiBmaWxlcyBnbyBsZWZ0LXRvLXJpZ2h0IChhLWgpLCByYW5rcyBnbyBib3R0b20tdG8tdG9wICgxLTgpXG4gICAgLy8gU28gcmFuayAxIGlzIGF0IGJvdHRvbSAocm93IDcpLCByYW5rIDggaXMgYXQgdG9wIChyb3cgMClcbiAgICBwaXhlbENvbCA9IGNvbFxuICAgIHBpeGVsUm93ID0gOCAtIHJhbmtcbiAgfSBlbHNlIHtcbiAgICAvLyBGb3IgYmxhY2s6IGZpbGVzIGdvIHJpZ2h0LXRvLWxlZnQgKGgtYSksIHJhbmtzIGdvIHRvcC10by1ib3R0b20gKDgtMSlcbiAgICAvLyBTbyByYW5rIDggaXMgYXQgdG9wIChyb3cgMCksIHJhbmsgMSBpcyBhdCBib3R0b20gKHJvdyA3KVxuICAgIHBpeGVsQ29sID0gNyAtIGNvbFxuICAgIHBpeGVsUm93ID0gcmFuayAtIDFcbiAgfVxuXG4gIC8vIENvbnZlcnQgdG8gcGl4ZWxzIChjZW50ZXIgb2Ygc3F1YXJlKVxuICByZXR1cm4ge1xuICAgIHg6IHBpeGVsQ29sICogc3F1YXJlU2l6ZSArIHNxdWFyZVNpemUgLyAyLFxuICAgIHk6IHBpeGVsUm93ICogc3F1YXJlU2l6ZSArIHNxdWFyZVNpemUgLyAyLFxuICB9XG59XG4iLCJpbXBvcnQgeyBnZXRCb3VuZGluZ0NsaWVudFJlY3QgfSBmcm9tICcuLi8uLi8uLi9wbGF0Zm9ybS9kb20nXG5cbmV4cG9ydCBpbnRlcmZhY2UgUmF3UGllY2VEYXRhIHtcbiAgY29sb3I6IHN0cmluZ1xuICB0eXBlOiBzdHJpbmdcbiAgeDogbnVtYmVyXG4gIHk6IG51bWJlclxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEJvYXJkTWV0cmljcyB7XG4gIGJvYXJkV2lkdGg6IG51bWJlclxuICBzcXVhcmVTaXplOiBudW1iZXJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3RCb2FyZE1ldHJpY3MoYm9hcmRFbGVtZW50OiBIVE1MRWxlbWVudCk6IEJvYXJkTWV0cmljcyB7XG4gIC8vIFBhcnNlIHdpZHRoIGZyb20gc3R5bGUgYXR0cmlidXRlIHNpbmNlIGdldEJvdW5kaW5nQ2xpZW50UmVjdCBtYXkgbm90IHdvcmsgaW4gdGVzdCBlbnZpcm9ubWVudHNcbiAgY29uc3Qgd2lkdGhNYXRjaCA9IGJvYXJkRWxlbWVudC5zdHlsZS5jc3NUZXh0Lm1hdGNoKC93aWR0aDpcXHMqKFswLTkuXSspcHgvKVxuICBjb25zdCBib2FyZFdpZHRoID0gd2lkdGhNYXRjaFxuICAgID8gTnVtYmVyLnBhcnNlRmxvYXQod2lkdGhNYXRjaFsxXSlcbiAgICA6IGdldEJvdW5kaW5nQ2xpZW50UmVjdChib2FyZEVsZW1lbnQpLndpZHRoXG4gIGNvbnN0IHNxdWFyZVNpemUgPSBib2FyZFdpZHRoIC8gOFxuXG4gIHJldHVybiB7IGJvYXJkV2lkdGgsIHNxdWFyZVNpemUgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZXh0cmFjdFBpZWNlRGF0YShwaWVjZUVsZW1lbnQ6IEVsZW1lbnQsIHNxdWFyZVNpemU6IG51bWJlcik6IFJhd1BpZWNlRGF0YSB8IG51bGwge1xuICAvLyBFeHRyYWN0IGNvbG9yIGFuZCB0eXBlIGZyb20gY2xhc3NcbiAgY29uc3QgY2xhc3NlcyA9IHBpZWNlRWxlbWVudC5jbGFzc05hbWUuc3BsaXQoJyAnKVxuICBjb25zdCBjb2xvclN0ciA9IGNsYXNzZXNbMF1cbiAgY29uc3QgdHlwZVN0ciA9IGNsYXNzZXNbMV1cblxuICBpZiAoIWNvbG9yU3RyIHx8ICF0eXBlU3RyKSByZXR1cm4gbnVsbFxuXG4gIC8vIEV4dHJhY3QgcG9zaXRpb24gZnJvbSB0cmFuc2Zvcm1cbiAgY29uc3QgdHJhbnNmb3JtID0gKHBpZWNlRWxlbWVudCBhcyBIVE1MRWxlbWVudCkuc3R5bGUudHJhbnNmb3JtXG4gIGNvbnN0IG1hdGNoID0gdHJhbnNmb3JtLm1hdGNoKC90cmFuc2xhdGVcXCgoWzAtOS5dKylweCw/XFxzKihbMC05Ll0rKXB4P1xcKS8pXG4gIGlmICghbWF0Y2gpIHJldHVybiBudWxsXG5cbiAgLy8gVHJhbnNmb3JtIGdpdmVzIHRvcC1sZWZ0IGNvcm5lciwgY29udmVydCB0byBjZW50ZXJcbiAgY29uc3QgeCA9IE51bWJlci5wYXJzZUZsb2F0KG1hdGNoWzFdKSArIHNxdWFyZVNpemUgLyAyXG4gIGNvbnN0IHkgPSBOdW1iZXIucGFyc2VGbG9hdChtYXRjaFsyXSkgKyBzcXVhcmVTaXplIC8gMlxuXG4gIHJldHVybiB7XG4gICAgY29sb3I6IGNvbG9yU3RyLFxuICAgIHR5cGU6IHR5cGVTdHIsXG4gICAgeCxcbiAgICB5LFxuICB9XG59XG4iLCJpbXBvcnQgeyB0eXBlIFBpZWNlVHlwZSwgUGxheWVyQ29sb3IgfSBmcm9tICcuLi8uLi8uLi9jb25zdGFudHMvY2hlc3MnXG5pbXBvcnQgeyBDc3NDbGFzcywgRG9tU2VsZWN0b3IgfSBmcm9tICcuLi8uLi8uLi9jb25zdGFudHMvZG9tJ1xuaW1wb3J0IHsgcGl4ZWxzVG9TcXVhcmUgfSBmcm9tICcuLi8uLi8uLi9kb21haW4vY2hlc3MvY29vcmRpbmF0ZXMnXG5pbXBvcnQgdHlwZSB7IFBpZWNlUG9zaXRpb24gfSBmcm9tICcuLi8uLi8uLi9kb21haW4vY2hlc3MvcGllY2VHcm91cGluZydcbmltcG9ydCB7IHF1ZXJ5U2VsZWN0b3IgfSBmcm9tICcuLi8uLi8uLi9wbGF0Zm9ybS9kb20nXG5pbXBvcnQgeyBleHRyYWN0Qm9hcmRNZXRyaWNzLCBleHRyYWN0UGllY2VEYXRhIH0gZnJvbSAnLi9leHRyYWN0aW9uJ1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGxheWVyQ29sb3IoKTogUGxheWVyQ29sb3Ige1xuICBjb25zdCBjb29yZHMgPSBxdWVyeVNlbGVjdG9yKERvbVNlbGVjdG9yLkNPT1JEUylcbiAgcmV0dXJuIGNvb3Jkcz8uY2xhc3NMaXN0LmNvbnRhaW5zKENzc0NsYXNzLkJMQUNLKSA/IFBsYXllckNvbG9yLkJMQUNLIDogUGxheWVyQ29sb3IuV0hJVEVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlYWRQaWVjZVBvc2l0aW9ucygpOiBQaWVjZVBvc2l0aW9uW10ge1xuICBjb25zdCBib2FyZCA9IHF1ZXJ5U2VsZWN0b3IoRG9tU2VsZWN0b3IuQk9BUkRfTk9fQ1VTVE9NKVxuICBpZiAoIWJvYXJkKSByZXR1cm4gW11cblxuICBjb25zdCB7IHNxdWFyZVNpemUgfSA9IGV4dHJhY3RCb2FyZE1ldHJpY3MoYm9hcmQgYXMgSFRNTEVsZW1lbnQpXG4gIGNvbnN0IHBsYXllckNvbG9yID0gZ2V0UGxheWVyQ29sb3IoKVxuXG4gIGNvbnN0IHBpZWNlcyA9IGJvYXJkLnF1ZXJ5U2VsZWN0b3JBbGwoRG9tU2VsZWN0b3IuUElFQ0UpXG4gIGNvbnN0IHBvc2l0aW9uczogUGllY2VQb3NpdGlvbltdID0gW11cblxuICBmb3IgKGNvbnN0IHBpZWNlIG9mIHBpZWNlcykge1xuICAgIGNvbnN0IHJhd0RhdGEgPSBleHRyYWN0UGllY2VEYXRhKHBpZWNlLCBzcXVhcmVTaXplKVxuICAgIGlmICghcmF3RGF0YSkgY29udGludWVcblxuICAgIC8vIE1hcCB0byBlbnVtc1xuICAgIGNvbnN0IGNvbG9yID0gcmF3RGF0YS5jb2xvciA9PT0gJ3doaXRlJyA/IFBsYXllckNvbG9yLldISVRFIDogUGxheWVyQ29sb3IuQkxBQ0tcbiAgICBjb25zdCB0eXBlID0gcmF3RGF0YS50eXBlIGFzIFBpZWNlVHlwZVxuXG4gICAgY29uc3Qgc3F1YXJlID0gcGl4ZWxzVG9TcXVhcmUoeyB4OiByYXdEYXRhLngsIHk6IHJhd0RhdGEueSB9LCBzcXVhcmVTaXplLCBwbGF5ZXJDb2xvcilcbiAgICBwb3NpdGlvbnMucHVzaCh7IHNxdWFyZSwgY29sb3IsIHR5cGUgfSlcbiAgfVxuXG4gIHJldHVybiBwb3NpdGlvbnNcbn1cbiIsImltcG9ydCB7IFBsYXllckNvbG9yLCB0eXBlIFF1YWRyYW50IH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL2NoZXNzJ1xuaW1wb3J0IHsgU3BlZWNoQ29tbWFuZCB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy9jb21tYW5kcydcbmltcG9ydCB7IGZpbHRlclF1YWRyYW50IH0gZnJvbSAnLi4vLi4vZG9tYWluL2NoZXNzL3BpZWNlR3JvdXBpbmcnXG5pbXBvcnQge1xuICBnZW5lcmF0ZUFsbFBpZWNlc1RleHQsXG4gIGdlbmVyYXRlQ29sb3JUZXh0LFxuICBnZW5lcmF0ZVF1YWRyYW50VGV4dCxcbn0gZnJvbSAnLi4vLi4vZG9tYWluL3NwZWVjaC9zcGVlY2hUZXh0J1xuaW1wb3J0IHsgc3BlYWtUZXh0LCBzdG9wU3BlYWtpbmcgfSBmcm9tICcuLi8uLi9wbGF0Zm9ybS9zcGVlY2gnXG5pbXBvcnQgeyByZWFkUGllY2VQb3NpdGlvbnMgfSBmcm9tICcuLi9zZXJ2aWNlcy9ib2FyZFJlYWRlci9yZWFkZXInXG5pbXBvcnQgdHlwZSB7IFNldHRpbmdzU3RvcmUgfSBmcm9tICcuLi9zZXR0aW5ncy9zZXR0aW5nc1N0b3JlJ1xuXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlU3BlZWNoQ29tbWFuZChjb21tYW5kOiBzdHJpbmcsIHNldHRpbmdzOiBTZXR0aW5nc1N0b3JlKTogdm9pZCB7XG4gIGlmIChjb21tYW5kID09PSBTcGVlY2hDb21tYW5kLlNUT1ApIHtcbiAgICBzdG9wU3BlYWtpbmcoKVxuICAgIHJldHVyblxuICB9XG5cbiAgY29uc3QgcGllY2VzID0gcmVhZFBpZWNlUG9zaXRpb25zKClcblxuICBpZiAoY29tbWFuZCA9PT0gU3BlZWNoQ29tbWFuZC5BTEwpIHtcbiAgICBjb25zdCB0ZXh0ID0gZ2VuZXJhdGVBbGxQaWVjZXNUZXh0KHBpZWNlcylcbiAgICBzcGVha1RleHQodGV4dCwgc2V0dGluZ3Muc3BlYWtSYXRlLnZhbHVlKVxuICAgIHJldHVyblxuICB9XG5cbiAgaWYgKGNvbW1hbmQgPT09IFNwZWVjaENvbW1hbmQuV0hJVEUgfHwgY29tbWFuZCA9PT0gU3BlZWNoQ29tbWFuZC5CTEFDSykge1xuICAgIGNvbnN0IGNvbG9yID0gY29tbWFuZCA9PT0gU3BlZWNoQ29tbWFuZC5XSElURSA/IFBsYXllckNvbG9yLldISVRFIDogUGxheWVyQ29sb3IuQkxBQ0tcbiAgICBjb25zdCB0ZXh0ID0gZ2VuZXJhdGVDb2xvclRleHQocGllY2VzLCBjb2xvcilcbiAgICBzcGVha1RleHQodGV4dCwgc2V0dGluZ3Muc3BlYWtSYXRlLnZhbHVlKVxuICAgIHJldHVyblxuICB9XG5cbiAgLy8gUXVhZHJhbnQgY29tbWFuZHM6IHdrLCB3cSwgYmssIGJxXG4gIGNvbnN0IHF1YWRyYW50ID0gY29tbWFuZCBhcyBRdWFkcmFudFxuICBjb25zdCBmaWx0ZXJlZCA9IGZpbHRlclF1YWRyYW50KHBpZWNlcywgcXVhZHJhbnQpXG4gIGNvbnN0IHRleHQgPSBnZW5lcmF0ZVF1YWRyYW50VGV4dChmaWx0ZXJlZClcbiAgc3BlYWtUZXh0KHRleHQsIHNldHRpbmdzLnNwZWFrUmF0ZS52YWx1ZSlcbn1cbiIsImltcG9ydCB7IEtFWUJPQVJEX0NPTU1BTkRfTUFQLCB0eXBlIEtleWJvYXJkQ29tbWFuZCB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy9jb21tYW5kcydcbmltcG9ydCB7IERvbVNlbGVjdG9yIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL2RvbSdcbmltcG9ydCB7IHF1ZXJ5U2VsZWN0b3IgfSBmcm9tICcuLi8uLi9wbGF0Zm9ybS9kb20nXG5pbXBvcnQgeyBoYW5kbGVTcGVlY2hDb21tYW5kIH0gZnJvbSAnLi4vaGFuZGxlcnMvaGFuZGxlU3BlZWNoQ29tbWFuZCdcbmltcG9ydCB0eXBlIHsgU2V0dGluZ3NTdG9yZSB9IGZyb20gJy4uL3NldHRpbmdzL3NldHRpbmdzU3RvcmUnXG5cbmludGVyZmFjZSBJbnB1dEVsZW1lbnRXaXRoQ2xlYW51cCBleHRlbmRzIEhUTUxJbnB1dEVsZW1lbnQge1xuICBfX2tleWJvYXJkQ29tbWFuZENsZWFudXA/OiAoKSA9PiB2b2lkXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cEtleWJvYXJkQ29tbWFuZHMoc2V0dGluZ3M6IFNldHRpbmdzU3RvcmUpOiB2b2lkIHtcbiAgY29uc3QgaW5wdXQgPSBxdWVyeVNlbGVjdG9yKERvbVNlbGVjdG9yLktFWUJPQVJEX0lOUFVUKSBhcyBJbnB1dEVsZW1lbnRXaXRoQ2xlYW51cCB8IG51bGxcbiAgaWYgKCFpbnB1dCkgcmV0dXJuXG5cbiAgY29uc3QgaGFuZGxlSW5wdXQgPSAoZTogRXZlbnQpID0+IHtcbiAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50XG4gICAgY29uc3QgdmFsdWUgPSB0YXJnZXQudmFsdWVcblxuICAgIC8vIENoZWNrIGZvciBzcGVlY2ggY29tbWFuZHNcbiAgICBjb25zdCBjb21tYW5kID0gS0VZQk9BUkRfQ09NTUFORF9NQVAuZ2V0KHZhbHVlIGFzIEtleWJvYXJkQ29tbWFuZClcbiAgICBpZiAoY29tbWFuZCkge1xuICAgICAgaGFuZGxlU3BlZWNoQ29tbWFuZChjb21tYW5kLCBzZXR0aW5ncylcbiAgICAgIHRhcmdldC52YWx1ZSA9ICcnXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICAvLyBDaGVjayBmb3IgZHJhd2luZyBjb21tYW5kcyAoaGFuZGxlZCBlbHNld2hlcmUpXG4gICAgaWYgKHZhbHVlLnN0YXJ0c1dpdGgoJy0nKSkge1xuICAgICAgLy8gV2lsbCBiZSBoYW5kbGVkIGJ5IGRyYXdpbmcgaGFuZGxlclxuICAgICAgcmV0dXJuXG4gICAgfVxuICB9XG5cbiAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBoYW5kbGVJbnB1dClcblxuICAvLyBTdG9yZSBjbGVhbnVwIGZ1bmN0aW9uIG9uIHRoZSBlbGVtZW50IGZvciBsYXRlciByZW1vdmFsXG4gIGlucHV0Ll9fa2V5Ym9hcmRDb21tYW5kQ2xlYW51cCA9ICgpID0+IHtcbiAgICBpbnB1dC5yZW1vdmVFdmVudExpc3RlbmVyKCdpbnB1dCcsIGhhbmRsZUlucHV0KVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0ZWFyZG93bktleWJvYXJkQ29tbWFuZHMoKTogdm9pZCB7XG4gIGNvbnN0IGlucHV0ID0gcXVlcnlTZWxlY3RvcihEb21TZWxlY3Rvci5LRVlCT0FSRF9JTlBVVCkgYXMgSW5wdXRFbGVtZW50V2l0aENsZWFudXAgfCBudWxsXG4gIGlmIChpbnB1dD8uX19rZXlib2FyZENvbW1hbmRDbGVhbnVwKSB7XG4gICAgaW5wdXQuX19rZXlib2FyZENvbW1hbmRDbGVhbnVwKClcbiAgICBpbnB1dC5fX2tleWJvYXJkQ29tbWFuZENsZWFudXAgPSB1bmRlZmluZWRcbiAgfVxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU11dGF0aW9uT2JzZXJ2ZXIoY2FsbGJhY2s6IE11dGF0aW9uQ2FsbGJhY2spOiBNdXRhdGlvbk9ic2VydmVyIHtcbiAgcmV0dXJuIG5ldyBNdXRhdGlvbk9ic2VydmVyKGNhbGxiYWNrKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gb2JzZXJ2ZShcbiAgb2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXIsXG4gIHRhcmdldDogTm9kZSxcbiAgb3B0aW9uczogTXV0YXRpb25PYnNlcnZlckluaXRcbik6IHZvaWQge1xuICBvYnNlcnZlci5vYnNlcnZlKHRhcmdldCwgb3B0aW9ucylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpc2Nvbm5lY3Qob2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXIpOiB2b2lkIHtcbiAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpXG59XG4iLCJpbXBvcnQgdHlwZSB7IFNpZ25hbCB9IGZyb20gJ0BwcmVhY3Qvc2lnbmFscy1jb3JlJ1xuaW1wb3J0IHsgRG9tU2VsZWN0b3IgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvZG9tJ1xuaW1wb3J0IHsgcXVlcnlTZWxlY3RvciB9IGZyb20gJy4uLy4uL3BsYXRmb3JtL2RvbSdcbmltcG9ydCB7IGNyZWF0ZU11dGF0aW9uT2JzZXJ2ZXIsIGRpc2Nvbm5lY3QsIG9ic2VydmUgfSBmcm9tICcuLi8uLi9wbGF0Zm9ybS9tdXRhdGlvbk9ic2VydmVyJ1xuXG5leHBvcnQgaW50ZXJmYWNlIEJvYXJkT2JzZXJ2ZXJTdGF0ZSB7XG4gIG9ic2VydmVyOiBNdXRhdGlvbk9ic2VydmVyXG4gIGJvYXJkQ2hhbmdlZDogU2lnbmFsPG51bWJlcj5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUJvYXJkT2JzZXJ2ZXIoYm9hcmRDaGFuZ2VkOiBTaWduYWw8bnVtYmVyPik6IEJvYXJkT2JzZXJ2ZXJTdGF0ZSB7XG4gIGNvbnN0IG9ic2VydmVyID0gY3JlYXRlTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgYm9hcmRDaGFuZ2VkLnZhbHVlICs9IDFcbiAgfSlcblxuICByZXR1cm4geyBvYnNlcnZlciwgYm9hcmRDaGFuZ2VkIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0Qm9hcmRPYnNlcnZlcihzdGF0ZTogQm9hcmRPYnNlcnZlclN0YXRlKTogdm9pZCB7XG4gIGNvbnN0IGJvYXJkID0gcXVlcnlTZWxlY3RvcihEb21TZWxlY3Rvci5CT0FSRClcbiAgaWYgKCFib2FyZCkgcmV0dXJuXG5cbiAgb2JzZXJ2ZShzdGF0ZS5vYnNlcnZlciwgYm9hcmQsIHtcbiAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgYXR0cmlidXRlczogdHJ1ZSxcbiAgICBzdWJ0cmVlOiB0cnVlLFxuICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RvcEJvYXJkT2JzZXJ2ZXIoc3RhdGU6IEJvYXJkT2JzZXJ2ZXJTdGF0ZSk6IHZvaWQge1xuICBkaXNjb25uZWN0KHN0YXRlLm9ic2VydmVyKVxufVxuIiwiZXhwb3J0IGludGVyZmFjZSBTZXR0aW5ncyB7XG4gIHNwZWFrUmF0ZTogbnVtYmVyXG4gIHBpZWNlc0xpc3RFbmFibGVkOiBib29sZWFuXG4gIGRpdmlkZXJzRW5hYmxlZDogYm9vbGVhblxuICBjdXN0b21Cb2FyZEVuYWJsZWQ6IGJvb2xlYW5cbiAgb2JmdXNjYXRpb25zRW5hYmxlZDogYm9vbGVhblxuICBwYXJhbGxheDogbnVtYmVyXG4gIGhvdmVyTW9kZTogc3RyaW5nXG4gIHBpZWNlU3R5bGU6IHN0cmluZ1xuICBibHVyOiBudW1iZXJcbiAgYmxhY2tTZWdtZW50czogc3RyaW5nXG4gIGJsYWNrU2VnbWVudHNUaW1pbmc6IHN0cmluZ1xuICBmbGFzaE1vZGVFbmFibGVkOiBib29sZWFuXG4gIGZsYXNoRHVyYXRpb246IG51bWJlclxuICBmbGFzaEludGVydmFsOiBudW1iZXJcbn1cblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRTZXR0aW5nczogU2V0dGluZ3MgPSB7XG4gIHNwZWFrUmF0ZTogMC41LFxuICBwaWVjZXNMaXN0RW5hYmxlZDogZmFsc2UsXG4gIGRpdmlkZXJzRW5hYmxlZDogZmFsc2UsXG4gIGN1c3RvbUJvYXJkRW5hYmxlZDogZmFsc2UsXG4gIG9iZnVzY2F0aW9uc0VuYWJsZWQ6IGZhbHNlLFxuICBwYXJhbGxheDogMCxcbiAgaG92ZXJNb2RlOiAnb2ZmJyxcbiAgcGllY2VTdHlsZTogJ2ljb25zJyxcbiAgYmx1cjogMCxcbiAgYmxhY2tTZWdtZW50czogJ25vbmUnLFxuICBibGFja1NlZ21lbnRzVGltaW5nOiAncm90YXRlLTEwcycsXG4gIGZsYXNoTW9kZUVuYWJsZWQ6IGZhbHNlLFxuICBmbGFzaER1cmF0aW9uOiAxLFxuICBmbGFzaEludGVydmFsOiAzLFxufVxuIiwiLyoqXG4gKiBXcmFwcGVyIG1vZHVsZSBmb3IgbG9jYWxTdG9yYWdlIHRvIGFsbG93IG1vY2tpbmcgd2l0aCBzaW1vbmVcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SXRlbShrZXk6IHN0cmluZyk6IHN0cmluZyB8IG51bGwge1xuICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0SXRlbShrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIHZhbHVlKVxufVxuIiwiaW1wb3J0IHR5cGUgeyBTaWduYWwgfSBmcm9tICdAcHJlYWN0L3NpZ25hbHMtY29yZSdcbmltcG9ydCB7IGVmZmVjdCwgc2lnbmFsIH0gZnJvbSAnQHByZWFjdC9zaWduYWxzLWNvcmUnXG5pbXBvcnQgeyB0eXBlIFNldHRpbmdzLCBkZWZhdWx0U2V0dGluZ3MgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvc2V0dGluZ3MnXG5pbXBvcnQgKiBhcyBzdG9yYWdlIGZyb20gJy4uLy4uL3BsYXRmb3JtL3N0b3JhZ2UnXG5cbmNvbnN0IFNUT1JBR0VfS0VZID0gJ2xpY2hlc3MtYm9hcmQtc3BlYWtlci1zZXR0aW5ncydcblxuZXhwb3J0IGludGVyZmFjZSBTZXR0aW5nc1N0b3JlIHtcbiAgc3BlYWtSYXRlOiBTaWduYWw8bnVtYmVyPlxuICBwaWVjZXNMaXN0RW5hYmxlZDogU2lnbmFsPGJvb2xlYW4+XG4gIGRpdmlkZXJzRW5hYmxlZDogU2lnbmFsPGJvb2xlYW4+XG4gIGN1c3RvbUJvYXJkRW5hYmxlZDogU2lnbmFsPGJvb2xlYW4+XG4gIG9iZnVzY2F0aW9uc0VuYWJsZWQ6IFNpZ25hbDxib29sZWFuPlxuICBwYXJhbGxheDogU2lnbmFsPG51bWJlcj5cbiAgaG92ZXJNb2RlOiBTaWduYWw8c3RyaW5nPlxuICBwaWVjZVN0eWxlOiBTaWduYWw8c3RyaW5nPlxuICBibHVyOiBTaWduYWw8bnVtYmVyPlxuICBibGFja1NlZ21lbnRzOiBTaWduYWw8c3RyaW5nPlxuICBibGFja1NlZ21lbnRzVGltaW5nOiBTaWduYWw8c3RyaW5nPlxuICBmbGFzaE1vZGVFbmFibGVkOiBTaWduYWw8Ym9vbGVhbj5cbiAgZmxhc2hEdXJhdGlvbjogU2lnbmFsPG51bWJlcj5cbiAgZmxhc2hJbnRlcnZhbDogU2lnbmFsPG51bWJlcj5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNldHRpbmdzU3RvcmUoKTogU2V0dGluZ3NTdG9yZSB7XG4gIHJldHVybiB7XG4gICAgc3BlYWtSYXRlOiBzaWduYWwoZGVmYXVsdFNldHRpbmdzLnNwZWFrUmF0ZSksXG4gICAgcGllY2VzTGlzdEVuYWJsZWQ6IHNpZ25hbChkZWZhdWx0U2V0dGluZ3MucGllY2VzTGlzdEVuYWJsZWQpLFxuICAgIGRpdmlkZXJzRW5hYmxlZDogc2lnbmFsKGRlZmF1bHRTZXR0aW5ncy5kaXZpZGVyc0VuYWJsZWQpLFxuICAgIGN1c3RvbUJvYXJkRW5hYmxlZDogc2lnbmFsKGRlZmF1bHRTZXR0aW5ncy5jdXN0b21Cb2FyZEVuYWJsZWQpLFxuICAgIG9iZnVzY2F0aW9uc0VuYWJsZWQ6IHNpZ25hbChkZWZhdWx0U2V0dGluZ3Mub2JmdXNjYXRpb25zRW5hYmxlZCksXG4gICAgcGFyYWxsYXg6IHNpZ25hbChkZWZhdWx0U2V0dGluZ3MucGFyYWxsYXgpLFxuICAgIGhvdmVyTW9kZTogc2lnbmFsKGRlZmF1bHRTZXR0aW5ncy5ob3Zlck1vZGUpLFxuICAgIHBpZWNlU3R5bGU6IHNpZ25hbChkZWZhdWx0U2V0dGluZ3MucGllY2VTdHlsZSksXG4gICAgYmx1cjogc2lnbmFsKGRlZmF1bHRTZXR0aW5ncy5ibHVyKSxcbiAgICBibGFja1NlZ21lbnRzOiBzaWduYWwoZGVmYXVsdFNldHRpbmdzLmJsYWNrU2VnbWVudHMpLFxuICAgIGJsYWNrU2VnbWVudHNUaW1pbmc6IHNpZ25hbChkZWZhdWx0U2V0dGluZ3MuYmxhY2tTZWdtZW50c1RpbWluZyksXG4gICAgZmxhc2hNb2RlRW5hYmxlZDogc2lnbmFsKGRlZmF1bHRTZXR0aW5ncy5mbGFzaE1vZGVFbmFibGVkKSxcbiAgICBmbGFzaER1cmF0aW9uOiBzaWduYWwoZGVmYXVsdFNldHRpbmdzLmZsYXNoRHVyYXRpb24pLFxuICAgIGZsYXNoSW50ZXJ2YWw6IHNpZ25hbChkZWZhdWx0U2V0dGluZ3MuZmxhc2hJbnRlcnZhbCksXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRTZXR0aW5ncyhzZXR0aW5nczogU2V0dGluZ3NTdG9yZSk6IHZvaWQge1xuICBjb25zdCBzdG9yZWQgPSBzdG9yYWdlLmdldEl0ZW0oU1RPUkFHRV9LRVkpXG4gIGlmICghc3RvcmVkKSByZXR1cm5cblxuICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShzdG9yZWQpIGFzIFBhcnRpYWw8U2V0dGluZ3M+XG4gIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKGRhdGEpKSB7XG4gICAgY29uc3Qgc2V0dGluZ0tleSA9IGtleSBhcyBrZXlvZiBTZXR0aW5nc1xuICAgIGlmIChcbiAgICAgIHNldHRpbmdzW3NldHRpbmdLZXldICYmXG4gICAgICB0eXBlb2Ygc2V0dGluZ3Nbc2V0dGluZ0tleV0gPT09ICdvYmplY3QnICYmXG4gICAgICAndmFsdWUnIGluIHNldHRpbmdzW3NldHRpbmdLZXldXG4gICAgKSB7XG4gICAgICAvLyBiaW9tZS1pZ25vcmUgbGludC9zdXNwaWNpb3VzL25vRXhwbGljaXRBbnk6IFNldHRpbmdzIHR5cGUgaXMgZHluYW1pY1xuICAgICAgOyhzZXR0aW5nc1tzZXR0aW5nS2V5XSBhcyBhbnkpLnZhbHVlID0gZGF0YVtzZXR0aW5nS2V5XVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2F2ZVNldHRpbmdzKHNldHRpbmdzOiBTZXR0aW5nc1N0b3JlKTogdm9pZCB7XG4gIGNvbnN0IGRhdGE6IFBhcnRpYWw8U2V0dGluZ3M+ID0ge31cbiAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoc2V0dGluZ3MpKSB7XG4gICAgY29uc3Qgc2V0dGluZ0tleSA9IGtleSBhcyBrZXlvZiB0eXBlb2Ygc2V0dGluZ3NcbiAgICBpZiAodHlwZW9mIHNldHRpbmdzW3NldHRpbmdLZXldID09PSAnb2JqZWN0JyAmJiAndmFsdWUnIGluIHNldHRpbmdzW3NldHRpbmdLZXldKSB7XG4gICAgICAvLyBiaW9tZS1pZ25vcmUgbGludC9zdXNwaWNpb3VzL25vRXhwbGljaXRBbnk6IFNldHRpbmdzIHR5cGUgaXMgZHluYW1pY1xuICAgICAgZGF0YVtzZXR0aW5nS2V5IGFzIGtleW9mIFNldHRpbmdzXSA9IChzZXR0aW5nc1tzZXR0aW5nS2V5XSBhcyBhbnkpLnZhbHVlXG4gICAgfVxuICB9XG4gIHN0b3JhZ2Uuc2V0SXRlbShTVE9SQUdFX0tFWSwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cEF1dG9TYXZlKHNldHRpbmdzOiBTZXR0aW5nc1N0b3JlKTogdm9pZCB7XG4gIGVmZmVjdCgoKSA9PiB7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoc2V0dGluZ3MpKSB7XG4gICAgICBjb25zdCBzZXR0aW5nID0gc2V0dGluZ3Nba2V5IGFzIGtleW9mIHR5cGVvZiBzZXR0aW5nc11cbiAgICAgIGlmICh0eXBlb2Ygc2V0dGluZyA9PT0gJ29iamVjdCcgJiYgJ3ZhbHVlJyBpbiBzZXR0aW5nKSB7XG4gICAgICAgIHNldHRpbmcudmFsdWVcbiAgICAgIH1cbiAgICB9XG4gICAgc2F2ZVNldHRpbmdzKHNldHRpbmdzKVxuICB9KVxufVxuIiwidmFyIG4sbCx1LHQsaSxyLG8sZSxmLGMsYSxzLGgscCx2LHksZD17fSx3PVtdLF89L2FjaXR8ZXgoPzpzfGd8bnxwfCQpfHJwaHxncmlkfG93c3xtbmN8bnR3fGluZVtjaF18em9vfF5vcmR8aXRlcmEvaSxnPUFycmF5LmlzQXJyYXk7ZnVuY3Rpb24gbShuLGwpe2Zvcih2YXIgdSBpbiBsKW5bdV09bFt1XTtyZXR1cm4gbn1mdW5jdGlvbiBiKG4pe24mJm4ucGFyZW50Tm9kZSYmbi5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG4pfWZ1bmN0aW9uIGsobCx1LHQpe3ZhciBpLHIsbyxlPXt9O2ZvcihvIGluIHUpXCJrZXlcIj09bz9pPXVbb106XCJyZWZcIj09bz9yPXVbb106ZVtvXT11W29dO2lmKGFyZ3VtZW50cy5sZW5ndGg+MiYmKGUuY2hpbGRyZW49YXJndW1lbnRzLmxlbmd0aD4zP24uY2FsbChhcmd1bWVudHMsMik6dCksXCJmdW5jdGlvblwiPT10eXBlb2YgbCYmbnVsbCE9bC5kZWZhdWx0UHJvcHMpZm9yKG8gaW4gbC5kZWZhdWx0UHJvcHMpdm9pZCAwPT09ZVtvXSYmKGVbb109bC5kZWZhdWx0UHJvcHNbb10pO3JldHVybiB4KGwsZSxpLHIsbnVsbCl9ZnVuY3Rpb24geChuLHQsaSxyLG8pe3ZhciBlPXt0eXBlOm4scHJvcHM6dCxrZXk6aSxyZWY6cixfX2s6bnVsbCxfXzpudWxsLF9fYjowLF9fZTpudWxsLF9fYzpudWxsLGNvbnN0cnVjdG9yOnZvaWQgMCxfX3Y6bnVsbD09bz8rK3U6byxfX2k6LTEsX191OjB9O3JldHVybiBudWxsPT1vJiZudWxsIT1sLnZub2RlJiZsLnZub2RlKGUpLGV9ZnVuY3Rpb24gTSgpe3JldHVybntjdXJyZW50Om51bGx9fWZ1bmN0aW9uIFMobil7cmV0dXJuIG4uY2hpbGRyZW59ZnVuY3Rpb24gQyhuLGwpe3RoaXMucHJvcHM9bix0aGlzLmNvbnRleHQ9bH1mdW5jdGlvbiAkKG4sbCl7aWYobnVsbD09bClyZXR1cm4gbi5fXz8kKG4uX18sbi5fX2krMSk6bnVsbDtmb3IodmFyIHU7bDxuLl9fay5sZW5ndGg7bCsrKWlmKG51bGwhPSh1PW4uX19rW2xdKSYmbnVsbCE9dS5fX2UpcmV0dXJuIHUuX19lO3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIG4udHlwZT8kKG4pOm51bGx9ZnVuY3Rpb24gSShuKXtpZihuLl9fUCYmbi5fX2Qpe3ZhciB1PW4uX192LHQ9dS5fX2UsaT1bXSxyPVtdLG89bSh7fSx1KTtvLl9fdj11Ll9fdisxLGwudm5vZGUmJmwudm5vZGUobykscShuLl9fUCxvLHUsbi5fX24sbi5fX1AubmFtZXNwYWNlVVJJLDMyJnUuX191P1t0XTpudWxsLGksbnVsbD09dD8kKHUpOnQsISEoMzImdS5fX3UpLHIpLG8uX192PXUuX192LG8uX18uX19rW28uX19pXT1vLEQoaSxvLHIpLHUuX19lPXUuX189bnVsbCxvLl9fZSE9dCYmUChvKX19ZnVuY3Rpb24gUChuKXtpZihudWxsIT0obj1uLl9fKSYmbnVsbCE9bi5fX2MpcmV0dXJuIG4uX19lPW4uX19jLmJhc2U9bnVsbCxuLl9fay5zb21lKGZ1bmN0aW9uKGwpe2lmKG51bGwhPWwmJm51bGwhPWwuX19lKXJldHVybiBuLl9fZT1uLl9fYy5iYXNlPWwuX19lfSksUChuKX1mdW5jdGlvbiBBKG4peyghbi5fX2QmJihuLl9fZD0hMCkmJmkucHVzaChuKSYmIUguX19yKyt8fHIhPWwuZGVib3VuY2VSZW5kZXJpbmcpJiYoKHI9bC5kZWJvdW5jZVJlbmRlcmluZyl8fG8pKEgpfWZ1bmN0aW9uIEgoKXt0cnl7Zm9yKHZhciBuLGw9MTtpLmxlbmd0aDspaS5sZW5ndGg+bCYmaS5zb3J0KGUpLG49aS5zaGlmdCgpLGw9aS5sZW5ndGgsSShuKX1maW5hbGx5e2kubGVuZ3RoPUguX19yPTB9fWZ1bmN0aW9uIEwobixsLHUsdCxpLHIsbyxlLGYsYyxhKXt2YXIgcyxoLHAsdix5LF8sZyxtPXQmJnQuX19rfHx3LGI9bC5sZW5ndGg7Zm9yKGY9VCh1LGwsbSxmLGIpLHM9MDtzPGI7cysrKW51bGwhPShwPXUuX19rW3NdKSYmKGg9LTEhPXAuX19pJiZtW3AuX19pXXx8ZCxwLl9faT1zLF89cShuLHAsaCxpLHIsbyxlLGYsYyxhKSx2PXAuX19lLHAucmVmJiZoLnJlZiE9cC5yZWYmJihoLnJlZiYmSihoLnJlZixudWxsLHApLGEucHVzaChwLnJlZixwLl9fY3x8dixwKSksbnVsbD09eSYmbnVsbCE9diYmKHk9diksKGc9ISEoNCZwLl9fdSkpfHxoLl9faz09PXAuX19rPyhmPWoocCxmLG4sZyksZyYmaC5fX2UmJihoLl9fZT1udWxsKSk6XCJmdW5jdGlvblwiPT10eXBlb2YgcC50eXBlJiZ2b2lkIDAhPT1fP2Y9Xzp2JiYoZj12Lm5leHRTaWJsaW5nKSxwLl9fdSY9LTcpO3JldHVybiB1Ll9fZT15LGZ9ZnVuY3Rpb24gVChuLGwsdSx0LGkpe3ZhciByLG8sZSxmLGMsYT11Lmxlbmd0aCxzPWEsaD0wO2ZvcihuLl9faz1uZXcgQXJyYXkoaSkscj0wO3I8aTtyKyspbnVsbCE9KG89bFtyXSkmJlwiYm9vbGVhblwiIT10eXBlb2YgbyYmXCJmdW5jdGlvblwiIT10eXBlb2Ygbz8oXCJzdHJpbmdcIj09dHlwZW9mIG98fFwibnVtYmVyXCI9PXR5cGVvZiBvfHxcImJpZ2ludFwiPT10eXBlb2Ygb3x8by5jb25zdHJ1Y3Rvcj09U3RyaW5nP289bi5fX2tbcl09eChudWxsLG8sbnVsbCxudWxsLG51bGwpOmcobyk/bz1uLl9fa1tyXT14KFMse2NoaWxkcmVuOm99LG51bGwsbnVsbCxudWxsKTp2b2lkIDA9PT1vLmNvbnN0cnVjdG9yJiZvLl9fYj4wP289bi5fX2tbcl09eChvLnR5cGUsby5wcm9wcyxvLmtleSxvLnJlZj9vLnJlZjpudWxsLG8uX192KTpuLl9fa1tyXT1vLGY9citoLG8uX189bixvLl9fYj1uLl9fYisxLGU9bnVsbCwtMSE9KGM9by5fX2k9TyhvLHUsZixzKSkmJihzLS0sKGU9dVtjXSkmJihlLl9fdXw9MikpLG51bGw9PWV8fG51bGw9PWUuX192PygtMT09YyYmKGk+YT9oLS06aTxhJiZoKyspLFwiZnVuY3Rpb25cIiE9dHlwZW9mIG8udHlwZSYmKG8uX191fD00KSk6YyE9ZiYmKGM9PWYtMT9oLS06Yz09ZisxP2grKzooYz5mP2gtLTpoKyssby5fX3V8PTQpKSk6bi5fX2tbcl09bnVsbDtpZihzKWZvcihyPTA7cjxhO3IrKyludWxsIT0oZT11W3JdKSYmMD09KDImZS5fX3UpJiYoZS5fX2U9PXQmJih0PSQoZSkpLEsoZSxlKSk7cmV0dXJuIHR9ZnVuY3Rpb24gaihuLGwsdSx0KXt2YXIgaSxyO2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIG4udHlwZSl7Zm9yKGk9bi5fX2sscj0wO2kmJnI8aS5sZW5ndGg7cisrKWlbcl0mJihpW3JdLl9fPW4sbD1qKGlbcl0sbCx1LHQpKTtyZXR1cm4gbH1uLl9fZSE9bCYmKHQmJihsJiZuLnR5cGUmJiFsLnBhcmVudE5vZGUmJihsPSQobikpLHUuaW5zZXJ0QmVmb3JlKG4uX19lLGx8fG51bGwpKSxsPW4uX19lKTtkb3tsPWwmJmwubmV4dFNpYmxpbmd9d2hpbGUobnVsbCE9bCYmOD09bC5ub2RlVHlwZSk7cmV0dXJuIGx9ZnVuY3Rpb24gRihuLGwpe3JldHVybiBsPWx8fFtdLG51bGw9PW58fFwiYm9vbGVhblwiPT10eXBlb2Ygbnx8KGcobik/bi5zb21lKGZ1bmN0aW9uKG4pe0YobixsKX0pOmwucHVzaChuKSksbH1mdW5jdGlvbiBPKG4sbCx1LHQpe3ZhciBpLHIsbyxlPW4ua2V5LGY9bi50eXBlLGM9bFt1XSxhPW51bGwhPWMmJjA9PSgyJmMuX191KTtpZihudWxsPT09YyYmbnVsbD09ZXx8YSYmZT09Yy5rZXkmJmY9PWMudHlwZSlyZXR1cm4gdTtpZih0PihhPzE6MCkpZm9yKGk9dS0xLHI9dSsxO2k+PTB8fHI8bC5sZW5ndGg7KWlmKG51bGwhPShjPWxbbz1pPj0wP2ktLTpyKytdKSYmMD09KDImYy5fX3UpJiZlPT1jLmtleSYmZj09Yy50eXBlKXJldHVybiBvO3JldHVybi0xfWZ1bmN0aW9uIHoobixsLHUpe1wiLVwiPT1sWzBdP24uc2V0UHJvcGVydHkobCxudWxsPT11P1wiXCI6dSk6bltsXT1udWxsPT11P1wiXCI6XCJudW1iZXJcIiE9dHlwZW9mIHV8fF8udGVzdChsKT91OnUrXCJweFwifWZ1bmN0aW9uIE4obixsLHUsdCxpKXt2YXIgcixvO246aWYoXCJzdHlsZVwiPT1sKWlmKFwic3RyaW5nXCI9PXR5cGVvZiB1KW4uc3R5bGUuY3NzVGV4dD11O2Vsc2V7aWYoXCJzdHJpbmdcIj09dHlwZW9mIHQmJihuLnN0eWxlLmNzc1RleHQ9dD1cIlwiKSx0KWZvcihsIGluIHQpdSYmbCBpbiB1fHx6KG4uc3R5bGUsbCxcIlwiKTtpZih1KWZvcihsIGluIHUpdCYmdVtsXT09dFtsXXx8eihuLnN0eWxlLGwsdVtsXSl9ZWxzZSBpZihcIm9cIj09bFswXSYmXCJuXCI9PWxbMV0pcj1sIT0obD1sLnJlcGxhY2UocyxcIiQxXCIpKSxvPWwudG9Mb3dlckNhc2UoKSxsPW8gaW4gbnx8XCJvbkZvY3VzT3V0XCI9PWx8fFwib25Gb2N1c0luXCI9PWw/by5zbGljZSgyKTpsLnNsaWNlKDIpLG4ubHx8KG4ubD17fSksbi5sW2wrcl09dSx1P3Q/dVthXT10W2FdOih1W2FdPWgsbi5hZGRFdmVudExpc3RlbmVyKGwscj92OnAscikpOm4ucmVtb3ZlRXZlbnRMaXN0ZW5lcihsLHI/djpwLHIpO2Vsc2V7aWYoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPT1pKWw9bC5yZXBsYWNlKC94bGluayhIfDpoKS8sXCJoXCIpLnJlcGxhY2UoL3NOYW1lJC8sXCJzXCIpO2Vsc2UgaWYoXCJ3aWR0aFwiIT1sJiZcImhlaWdodFwiIT1sJiZcImhyZWZcIiE9bCYmXCJsaXN0XCIhPWwmJlwiZm9ybVwiIT1sJiZcInRhYkluZGV4XCIhPWwmJlwiZG93bmxvYWRcIiE9bCYmXCJyb3dTcGFuXCIhPWwmJlwiY29sU3BhblwiIT1sJiZcInJvbGVcIiE9bCYmXCJwb3BvdmVyXCIhPWwmJmwgaW4gbil0cnl7bltsXT1udWxsPT11P1wiXCI6dTticmVhayBufWNhdGNoKG4pe31cImZ1bmN0aW9uXCI9PXR5cGVvZiB1fHwobnVsbD09dXx8ITE9PT11JiZcIi1cIiE9bFs0XT9uLnJlbW92ZUF0dHJpYnV0ZShsKTpuLnNldEF0dHJpYnV0ZShsLFwicG9wb3ZlclwiPT1sJiYxPT11P1wiXCI6dSkpfX1mdW5jdGlvbiBWKG4pe3JldHVybiBmdW5jdGlvbih1KXtpZih0aGlzLmwpe3ZhciB0PXRoaXMubFt1LnR5cGUrbl07aWYobnVsbD09dVtjXSl1W2NdPWgrKztlbHNlIGlmKHVbY108dFthXSlyZXR1cm47cmV0dXJuIHQobC5ldmVudD9sLmV2ZW50KHUpOnUpfX19ZnVuY3Rpb24gcShuLHUsdCxpLHIsbyxlLGYsYyxhKXt2YXIgcyxoLHAsdix5LGQsXyxrLHgsTSwkLEksUCxBLEgsVD11LnR5cGU7aWYodm9pZCAwIT09dS5jb25zdHJ1Y3RvcilyZXR1cm4gbnVsbDsxMjgmdC5fX3UmJihjPSEhKDMyJnQuX191KSxvPVtmPXUuX19lPXQuX19lXSksKHM9bC5fX2IpJiZzKHUpO246aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgVCl0cnl7aWYoaz11LnByb3BzLHg9VC5wcm90b3R5cGUmJlQucHJvdG90eXBlLnJlbmRlcixNPShzPVQuY29udGV4dFR5cGUpJiZpW3MuX19jXSwkPXM/TT9NLnByb3BzLnZhbHVlOnMuX186aSx0Ll9fYz9fPShoPXUuX19jPXQuX19jKS5fXz1oLl9fRTooeD91Ll9fYz1oPW5ldyBUKGssJCk6KHUuX19jPWg9bmV3IEMoaywkKSxoLmNvbnN0cnVjdG9yPVQsaC5yZW5kZXI9USksTSYmTS5zdWIoaCksaC5zdGF0ZXx8KGguc3RhdGU9e30pLGguX19uPWkscD1oLl9fZD0hMCxoLl9faD1bXSxoLl9zYj1bXSkseCYmbnVsbD09aC5fX3MmJihoLl9fcz1oLnN0YXRlKSx4JiZudWxsIT1ULmdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyYmKGguX19zPT1oLnN0YXRlJiYoaC5fX3M9bSh7fSxoLl9fcykpLG0oaC5fX3MsVC5nZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMoayxoLl9fcykpKSx2PWgucHJvcHMseT1oLnN0YXRlLGguX192PXUscCl4JiZudWxsPT1ULmdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyYmbnVsbCE9aC5jb21wb25lbnRXaWxsTW91bnQmJmguY29tcG9uZW50V2lsbE1vdW50KCkseCYmbnVsbCE9aC5jb21wb25lbnREaWRNb3VudCYmaC5fX2gucHVzaChoLmNvbXBvbmVudERpZE1vdW50KTtlbHNle2lmKHgmJm51bGw9PVQuZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzJiZrIT09diYmbnVsbCE9aC5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzJiZoLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMoaywkKSx1Ll9fdj09dC5fX3Z8fCFoLl9fZSYmbnVsbCE9aC5zaG91bGRDb21wb25lbnRVcGRhdGUmJiExPT09aC5zaG91bGRDb21wb25lbnRVcGRhdGUoayxoLl9fcywkKSl7dS5fX3YhPXQuX192JiYoaC5wcm9wcz1rLGguc3RhdGU9aC5fX3MsaC5fX2Q9ITEpLHUuX19lPXQuX19lLHUuX19rPXQuX19rLHUuX19rLnNvbWUoZnVuY3Rpb24obil7biYmKG4uX189dSl9KSx3LnB1c2guYXBwbHkoaC5fX2gsaC5fc2IpLGguX3NiPVtdLGguX19oLmxlbmd0aCYmZS5wdXNoKGgpO2JyZWFrIG59bnVsbCE9aC5jb21wb25lbnRXaWxsVXBkYXRlJiZoLmNvbXBvbmVudFdpbGxVcGRhdGUoayxoLl9fcywkKSx4JiZudWxsIT1oLmNvbXBvbmVudERpZFVwZGF0ZSYmaC5fX2gucHVzaChmdW5jdGlvbigpe2guY29tcG9uZW50RGlkVXBkYXRlKHYseSxkKX0pfWlmKGguY29udGV4dD0kLGgucHJvcHM9ayxoLl9fUD1uLGguX19lPSExLEk9bC5fX3IsUD0wLHgpaC5zdGF0ZT1oLl9fcyxoLl9fZD0hMSxJJiZJKHUpLHM9aC5yZW5kZXIoaC5wcm9wcyxoLnN0YXRlLGguY29udGV4dCksdy5wdXNoLmFwcGx5KGguX19oLGguX3NiKSxoLl9zYj1bXTtlbHNlIGRve2guX19kPSExLEkmJkkodSkscz1oLnJlbmRlcihoLnByb3BzLGguc3RhdGUsaC5jb250ZXh0KSxoLnN0YXRlPWguX19zfXdoaWxlKGguX19kJiYrK1A8MjUpO2guc3RhdGU9aC5fX3MsbnVsbCE9aC5nZXRDaGlsZENvbnRleHQmJihpPW0obSh7fSxpKSxoLmdldENoaWxkQ29udGV4dCgpKSkseCYmIXAmJm51bGwhPWguZ2V0U25hcHNob3RCZWZvcmVVcGRhdGUmJihkPWguZ2V0U25hcHNob3RCZWZvcmVVcGRhdGUodix5KSksQT1udWxsIT1zJiZzLnR5cGU9PT1TJiZudWxsPT1zLmtleT9FKHMucHJvcHMuY2hpbGRyZW4pOnMsZj1MKG4sZyhBKT9BOltBXSx1LHQsaSxyLG8sZSxmLGMsYSksaC5iYXNlPXUuX19lLHUuX191Jj0tMTYxLGguX19oLmxlbmd0aCYmZS5wdXNoKGgpLF8mJihoLl9fRT1oLl9fPW51bGwpfWNhdGNoKG4pe2lmKHUuX192PW51bGwsY3x8bnVsbCE9bylpZihuLnRoZW4pe2Zvcih1Ll9fdXw9Yz8xNjA6MTI4O2YmJjg9PWYubm9kZVR5cGUmJmYubmV4dFNpYmxpbmc7KWY9Zi5uZXh0U2libGluZztvW28uaW5kZXhPZihmKV09bnVsbCx1Ll9fZT1mfWVsc2V7Zm9yKEg9by5sZW5ndGg7SC0tOyliKG9bSF0pO0IodSl9ZWxzZSB1Ll9fZT10Ll9fZSx1Ll9faz10Ll9fayxuLnRoZW58fEIodSk7bC5fX2Uobix1LHQpfWVsc2UgbnVsbD09byYmdS5fX3Y9PXQuX192Pyh1Ll9faz10Ll9fayx1Ll9fZT10Ll9fZSk6Zj11Ll9fZT1HKHQuX19lLHUsdCxpLHIsbyxlLGMsYSk7cmV0dXJuKHM9bC5kaWZmZWQpJiZzKHUpLDEyOCZ1Ll9fdT92b2lkIDA6Zn1mdW5jdGlvbiBCKG4pe24mJihuLl9fYyYmKG4uX19jLl9fZT0hMCksbi5fX2smJm4uX19rLnNvbWUoQikpfWZ1bmN0aW9uIEQobix1LHQpe2Zvcih2YXIgaT0wO2k8dC5sZW5ndGg7aSsrKUoodFtpXSx0WysraV0sdFsrK2ldKTtsLl9fYyYmbC5fX2ModSxuKSxuLnNvbWUoZnVuY3Rpb24odSl7dHJ5e249dS5fX2gsdS5fX2g9W10sbi5zb21lKGZ1bmN0aW9uKG4pe24uY2FsbCh1KX0pfWNhdGNoKG4pe2wuX19lKG4sdS5fX3YpfX0pfWZ1bmN0aW9uIEUobil7cmV0dXJuXCJvYmplY3RcIiE9dHlwZW9mIG58fG51bGw9PW58fG4uX19iPjA/bjpnKG4pP24ubWFwKEUpOnZvaWQgMCE9PW4uY29uc3RydWN0b3I/bnVsbDptKHt9LG4pfWZ1bmN0aW9uIEcodSx0LGkscixvLGUsZixjLGEpe3ZhciBzLGgscCx2LHksdyxfLG09aS5wcm9wc3x8ZCxrPXQucHJvcHMseD10LnR5cGU7aWYoXCJzdmdcIj09eD9vPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIjpcIm1hdGhcIj09eD9vPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OC9NYXRoL01hdGhNTFwiOm98fChvPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbFwiKSxudWxsIT1lKWZvcihzPTA7czxlLmxlbmd0aDtzKyspaWYoKHk9ZVtzXSkmJlwic2V0QXR0cmlidXRlXCJpbiB5PT0hIXgmJih4P3kubG9jYWxOYW1lPT14OjM9PXkubm9kZVR5cGUpKXt1PXksZVtzXT1udWxsO2JyZWFrfWlmKG51bGw9PXUpe2lmKG51bGw9PXgpcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGspO3U9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKG8seCxrLmlzJiZrKSxjJiYobC5fX20mJmwuX19tKHQsZSksYz0hMSksZT1udWxsfWlmKG51bGw9PXgpbT09PWt8fGMmJnUuZGF0YT09a3x8KHUuZGF0YT1rKTtlbHNle2lmKGU9XCJ0ZXh0YXJlYVwiPT14JiZudWxsIT1rLmRlZmF1bHRWYWx1ZT9udWxsOmUmJm4uY2FsbCh1LmNoaWxkTm9kZXMpLCFjJiZudWxsIT1lKWZvcihtPXt9LHM9MDtzPHUuYXR0cmlidXRlcy5sZW5ndGg7cysrKW1bKHk9dS5hdHRyaWJ1dGVzW3NdKS5uYW1lXT15LnZhbHVlO2ZvcihzIGluIG0peT1tW3NdLFwiZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUxcIj09cz9wPXk6XCJjaGlsZHJlblwiPT1zfHxzIGluIGt8fFwidmFsdWVcIj09cyYmXCJkZWZhdWx0VmFsdWVcImluIGt8fFwiY2hlY2tlZFwiPT1zJiZcImRlZmF1bHRDaGVja2VkXCJpbiBrfHxOKHUscyxudWxsLHksbyk7Zm9yKHMgaW4gayl5PWtbc10sXCJjaGlsZHJlblwiPT1zP3Y9eTpcImRhbmdlcm91c2x5U2V0SW5uZXJIVE1MXCI9PXM/aD15OlwidmFsdWVcIj09cz93PXk6XCJjaGVja2VkXCI9PXM/Xz15OmMmJlwiZnVuY3Rpb25cIiE9dHlwZW9mIHl8fG1bc109PT15fHxOKHUscyx5LG1bc10sbyk7aWYoaCljfHxwJiYoaC5fX2h0bWw9PXAuX19odG1sfHxoLl9faHRtbD09dS5pbm5lckhUTUwpfHwodS5pbm5lckhUTUw9aC5fX2h0bWwpLHQuX19rPVtdO2Vsc2UgaWYocCYmKHUuaW5uZXJIVE1MPVwiXCIpLEwoXCJ0ZW1wbGF0ZVwiPT10LnR5cGU/dS5jb250ZW50OnUsZyh2KT92Olt2XSx0LGkscixcImZvcmVpZ25PYmplY3RcIj09eD9cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWxcIjpvLGUsZixlP2VbMF06aS5fX2smJiQoaSwwKSxjLGEpLG51bGwhPWUpZm9yKHM9ZS5sZW5ndGg7cy0tOyliKGVbc10pO2MmJlwidGV4dGFyZWFcIiE9eHx8KHM9XCJ2YWx1ZVwiLFwicHJvZ3Jlc3NcIj09eCYmbnVsbD09dz91LnJlbW92ZUF0dHJpYnV0ZShcInZhbHVlXCIpOm51bGwhPXcmJih3IT09dVtzXXx8XCJwcm9ncmVzc1wiPT14JiYhd3x8XCJvcHRpb25cIj09eCYmdyE9bVtzXSkmJk4odSxzLHcsbVtzXSxvKSxzPVwiY2hlY2tlZFwiLG51bGwhPV8mJl8hPXVbc10mJk4odSxzLF8sbVtzXSxvKSl9cmV0dXJuIHV9ZnVuY3Rpb24gSihuLHUsdCl7dHJ5e2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIG4pe3ZhciBpPVwiZnVuY3Rpb25cIj09dHlwZW9mIG4uX191O2kmJm4uX191KCksaSYmbnVsbD09dXx8KG4uX191PW4odSkpfWVsc2Ugbi5jdXJyZW50PXV9Y2F0Y2gobil7bC5fX2Uobix0KX19ZnVuY3Rpb24gSyhuLHUsdCl7dmFyIGkscjtpZihsLnVubW91bnQmJmwudW5tb3VudChuKSwoaT1uLnJlZikmJihpLmN1cnJlbnQmJmkuY3VycmVudCE9bi5fX2V8fEooaSxudWxsLHUpKSxudWxsIT0oaT1uLl9fYykpe2lmKGkuY29tcG9uZW50V2lsbFVubW91bnQpdHJ5e2kuY29tcG9uZW50V2lsbFVubW91bnQoKX1jYXRjaChuKXtsLl9fZShuLHUpfWkuYmFzZT1pLl9fUD1udWxsfWlmKGk9bi5fX2spZm9yKHI9MDtyPGkubGVuZ3RoO3IrKylpW3JdJiZLKGlbcl0sdSx0fHxcImZ1bmN0aW9uXCIhPXR5cGVvZiBuLnR5cGUpO3R8fGIobi5fX2UpLG4uX19jPW4uX189bi5fX2U9dm9pZCAwfWZ1bmN0aW9uIFEobixsLHUpe3JldHVybiB0aGlzLmNvbnN0cnVjdG9yKG4sdSl9ZnVuY3Rpb24gUih1LHQsaSl7dmFyIHIsbyxlLGY7dD09ZG9jdW1lbnQmJih0PWRvY3VtZW50LmRvY3VtZW50RWxlbWVudCksbC5fXyYmbC5fXyh1LHQpLG89KHI9XCJmdW5jdGlvblwiPT10eXBlb2YgaSk/bnVsbDppJiZpLl9fa3x8dC5fX2ssZT1bXSxmPVtdLHEodCx1PSghciYmaXx8dCkuX19rPWsoUyxudWxsLFt1XSksb3x8ZCxkLHQubmFtZXNwYWNlVVJJLCFyJiZpP1tpXTpvP251bGw6dC5maXJzdENoaWxkP24uY2FsbCh0LmNoaWxkTm9kZXMpOm51bGwsZSwhciYmaT9pOm8/by5fX2U6dC5maXJzdENoaWxkLHIsZiksRChlLHUsZil9ZnVuY3Rpb24gVShuLGwpe1IobixsLFUpfWZ1bmN0aW9uIFcobCx1LHQpe3ZhciBpLHIsbyxlLGY9bSh7fSxsLnByb3BzKTtmb3IobyBpbiBsLnR5cGUmJmwudHlwZS5kZWZhdWx0UHJvcHMmJihlPWwudHlwZS5kZWZhdWx0UHJvcHMpLHUpXCJrZXlcIj09bz9pPXVbb106XCJyZWZcIj09bz9yPXVbb106ZltvXT12b2lkIDA9PT11W29dJiZudWxsIT1lP2Vbb106dVtvXTtyZXR1cm4gYXJndW1lbnRzLmxlbmd0aD4yJiYoZi5jaGlsZHJlbj1hcmd1bWVudHMubGVuZ3RoPjM/bi5jYWxsKGFyZ3VtZW50cywyKTp0KSx4KGwudHlwZSxmLGl8fGwua2V5LHJ8fGwucmVmLG51bGwpfWZ1bmN0aW9uIFgobil7ZnVuY3Rpb24gbChuKXt2YXIgdSx0O3JldHVybiB0aGlzLmdldENoaWxkQ29udGV4dHx8KHU9bmV3IFNldCwodD17fSlbbC5fX2NdPXRoaXMsdGhpcy5nZXRDaGlsZENvbnRleHQ9ZnVuY3Rpb24oKXtyZXR1cm4gdH0sdGhpcy5jb21wb25lbnRXaWxsVW5tb3VudD1mdW5jdGlvbigpe3U9bnVsbH0sdGhpcy5zaG91bGRDb21wb25lbnRVcGRhdGU9ZnVuY3Rpb24obil7dGhpcy5wcm9wcy52YWx1ZSE9bi52YWx1ZSYmdS5mb3JFYWNoKGZ1bmN0aW9uKG4pe24uX19lPSEwLEEobil9KX0sdGhpcy5zdWI9ZnVuY3Rpb24obil7dS5hZGQobik7dmFyIGw9bi5jb21wb25lbnRXaWxsVW5tb3VudDtuLmNvbXBvbmVudFdpbGxVbm1vdW50PWZ1bmN0aW9uKCl7dSYmdS5kZWxldGUobiksbCYmbC5jYWxsKG4pfX0pLG4uY2hpbGRyZW59cmV0dXJuIGwuX19jPVwiX19jQ1wiK3krKyxsLl9fPW4sbC5Qcm92aWRlcj1sLl9fbD0obC5Db25zdW1lcj1mdW5jdGlvbihuLGwpe3JldHVybiBuLmNoaWxkcmVuKGwpfSkuY29udGV4dFR5cGU9bCxsfW49dy5zbGljZSxsPXtfX2U6ZnVuY3Rpb24obixsLHUsdCl7Zm9yKHZhciBpLHIsbztsPWwuX187KWlmKChpPWwuX19jKSYmIWkuX18pdHJ5e2lmKChyPWkuY29uc3RydWN0b3IpJiZudWxsIT1yLmdldERlcml2ZWRTdGF0ZUZyb21FcnJvciYmKGkuc2V0U3RhdGUoci5nZXREZXJpdmVkU3RhdGVGcm9tRXJyb3IobikpLG89aS5fX2QpLG51bGwhPWkuY29tcG9uZW50RGlkQ2F0Y2gmJihpLmNvbXBvbmVudERpZENhdGNoKG4sdHx8e30pLG89aS5fX2QpLG8pcmV0dXJuIGkuX19FPWl9Y2F0Y2gobCl7bj1sfXRocm93IG59fSx1PTAsdD1mdW5jdGlvbihuKXtyZXR1cm4gbnVsbCE9biYmdm9pZCAwPT09bi5jb25zdHJ1Y3Rvcn0sQy5wcm90b3R5cGUuc2V0U3RhdGU9ZnVuY3Rpb24obixsKXt2YXIgdTt1PW51bGwhPXRoaXMuX19zJiZ0aGlzLl9fcyE9dGhpcy5zdGF0ZT90aGlzLl9fczp0aGlzLl9fcz1tKHt9LHRoaXMuc3RhdGUpLFwiZnVuY3Rpb25cIj09dHlwZW9mIG4mJihuPW4obSh7fSx1KSx0aGlzLnByb3BzKSksbiYmbSh1LG4pLG51bGwhPW4mJnRoaXMuX192JiYobCYmdGhpcy5fc2IucHVzaChsKSxBKHRoaXMpKX0sQy5wcm90b3R5cGUuZm9yY2VVcGRhdGU9ZnVuY3Rpb24obil7dGhpcy5fX3YmJih0aGlzLl9fZT0hMCxuJiZ0aGlzLl9faC5wdXNoKG4pLEEodGhpcykpfSxDLnByb3RvdHlwZS5yZW5kZXI9UyxpPVtdLG89XCJmdW5jdGlvblwiPT10eXBlb2YgUHJvbWlzZT9Qcm9taXNlLnByb3RvdHlwZS50aGVuLmJpbmQoUHJvbWlzZS5yZXNvbHZlKCkpOnNldFRpbWVvdXQsZT1mdW5jdGlvbihuLGwpe3JldHVybiBuLl9fdi5fX2ItbC5fX3YuX19ifSxILl9fcj0wLGY9TWF0aC5yYW5kb20oKS50b1N0cmluZyg4KSxjPVwiX19kXCIrZixhPVwiX19hXCIrZixzPS8oUG9pbnRlckNhcHR1cmUpJHxDYXB0dXJlJC9pLGg9MCxwPVYoITEpLHY9VighMCkseT0wO2V4cG9ydHtDIGFzIENvbXBvbmVudCxTIGFzIEZyYWdtZW50LFcgYXMgY2xvbmVFbGVtZW50LFggYXMgY3JlYXRlQ29udGV4dCxrIGFzIGNyZWF0ZUVsZW1lbnQsTSBhcyBjcmVhdGVSZWYsayBhcyBoLFUgYXMgaHlkcmF0ZSx0IGFzIGlzVmFsaWRFbGVtZW50LGwgYXMgb3B0aW9ucyxSIGFzIHJlbmRlcixGIGFzIHRvQ2hpbGRBcnJheX07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wcmVhY3QubW9kdWxlLmpzLm1hcFxuIiwiaW1wb3J0e29wdGlvbnMgYXMgbn1mcm9tXCJwcmVhY3RcIjt2YXIgdCxyLHUsaSxvPTAsZj1bXSxjPW4sZT1jLl9fYixhPWMuX19yLHY9Yy5kaWZmZWQsbD1jLl9fYyxtPWMudW5tb3VudCxzPWMuX187ZnVuY3Rpb24gcChuLHQpe2MuX19oJiZjLl9faChyLG4sb3x8dCksbz0wO3ZhciB1PXIuX19IfHwoci5fX0g9e19fOltdLF9faDpbXX0pO3JldHVybiBuPj11Ll9fLmxlbmd0aCYmdS5fXy5wdXNoKHt9KSx1Ll9fW25dfWZ1bmN0aW9uIGQobil7cmV0dXJuIG89MSxoKEQsbil9ZnVuY3Rpb24gaChuLHUsaSl7dmFyIG89cCh0KyssMik7aWYoby50PW4sIW8uX19jJiYoby5fXz1baT9pKHUpOkQodm9pZCAwLHUpLGZ1bmN0aW9uKG4pe3ZhciB0PW8uX19OP28uX19OWzBdOm8uX19bMF0scj1vLnQodCxuKTt0IT09ciYmKG8uX19OPVtyLG8uX19bMV1dLG8uX19jLnNldFN0YXRlKHt9KSl9XSxvLl9fYz1yLCFyLl9fZikpe3ZhciBmPWZ1bmN0aW9uKG4sdCxyKXtpZighby5fX2MuX19IKXJldHVybiEwO3ZhciB1PW8uX19jLl9fSC5fXy5maWx0ZXIoZnVuY3Rpb24obil7cmV0dXJuIG4uX19jfSk7aWYodS5ldmVyeShmdW5jdGlvbihuKXtyZXR1cm4hbi5fX059KSlyZXR1cm4hY3x8Yy5jYWxsKHRoaXMsbix0LHIpO3ZhciBpPW8uX19jLnByb3BzIT09bjtyZXR1cm4gdS5zb21lKGZ1bmN0aW9uKG4pe2lmKG4uX19OKXt2YXIgdD1uLl9fWzBdO24uX189bi5fX04sbi5fX049dm9pZCAwLHQhPT1uLl9fWzBdJiYoaT0hMCl9fSksYyYmYy5jYWxsKHRoaXMsbix0LHIpfHxpfTtyLl9fZj0hMDt2YXIgYz1yLnNob3VsZENvbXBvbmVudFVwZGF0ZSxlPXIuY29tcG9uZW50V2lsbFVwZGF0ZTtyLmNvbXBvbmVudFdpbGxVcGRhdGU9ZnVuY3Rpb24obix0LHIpe2lmKHRoaXMuX19lKXt2YXIgdT1jO2M9dm9pZCAwLGYobix0LHIpLGM9dX1lJiZlLmNhbGwodGhpcyxuLHQscil9LHIuc2hvdWxkQ29tcG9uZW50VXBkYXRlPWZ9cmV0dXJuIG8uX19OfHxvLl9ffWZ1bmN0aW9uIHkobix1KXt2YXIgaT1wKHQrKywzKTshYy5fX3MmJkMoaS5fX0gsdSkmJihpLl9fPW4saS51PXUsci5fX0guX19oLnB1c2goaSkpfWZ1bmN0aW9uIF8obix1KXt2YXIgaT1wKHQrKyw0KTshYy5fX3MmJkMoaS5fX0gsdSkmJihpLl9fPW4saS51PXUsci5fX2gucHVzaChpKSl9ZnVuY3Rpb24gQShuKXtyZXR1cm4gbz01LFQoZnVuY3Rpb24oKXtyZXR1cm57Y3VycmVudDpufX0sW10pfWZ1bmN0aW9uIEYobix0LHIpe289NixfKGZ1bmN0aW9uKCl7aWYoXCJmdW5jdGlvblwiPT10eXBlb2Ygbil7dmFyIHI9bih0KCkpO3JldHVybiBmdW5jdGlvbigpe24obnVsbCksciYmXCJmdW5jdGlvblwiPT10eXBlb2YgciYmcigpfX1pZihuKXJldHVybiBuLmN1cnJlbnQ9dCgpLGZ1bmN0aW9uKCl7cmV0dXJuIG4uY3VycmVudD1udWxsfX0sbnVsbD09cj9yOnIuY29uY2F0KG4pKX1mdW5jdGlvbiBUKG4scil7dmFyIHU9cCh0KyssNyk7cmV0dXJuIEModS5fX0gscikmJih1Ll9fPW4oKSx1Ll9fSD1yLHUuX19oPW4pLHUuX199ZnVuY3Rpb24gcShuLHQpe3JldHVybiBvPTgsVChmdW5jdGlvbigpe3JldHVybiBufSx0KX1mdW5jdGlvbiB4KG4pe3ZhciB1PXIuY29udGV4dFtuLl9fY10saT1wKHQrKyw5KTtyZXR1cm4gaS5jPW4sdT8obnVsbD09aS5fXyYmKGkuX189ITAsdS5zdWIocikpLHUucHJvcHMudmFsdWUpOm4uX199ZnVuY3Rpb24gUChuLHQpe2MudXNlRGVidWdWYWx1ZSYmYy51c2VEZWJ1Z1ZhbHVlKHQ/dChuKTpuKX1mdW5jdGlvbiBiKG4pe3ZhciB1PXAodCsrLDEwKSxpPWQoKTtyZXR1cm4gdS5fXz1uLHIuY29tcG9uZW50RGlkQ2F0Y2h8fChyLmNvbXBvbmVudERpZENhdGNoPWZ1bmN0aW9uKG4sdCl7dS5fXyYmdS5fXyhuLHQpLGlbMV0obil9KSxbaVswXSxmdW5jdGlvbigpe2lbMV0odm9pZCAwKX1dfWZ1bmN0aW9uIGcoKXt2YXIgbj1wKHQrKywxMSk7aWYoIW4uX18pe2Zvcih2YXIgdT1yLl9fdjtudWxsIT09dSYmIXUuX19tJiZudWxsIT09dS5fXzspdT11Ll9fO3ZhciBpPXUuX19tfHwodS5fX209WzAsMF0pO24uX189XCJQXCIraVswXStcIi1cIitpWzFdKyt9cmV0dXJuIG4uX199ZnVuY3Rpb24gaigpe2Zvcih2YXIgbjtuPWYuc2hpZnQoKTspe3ZhciB0PW4uX19IO2lmKG4uX19QJiZ0KXRyeXt0Ll9faC5zb21lKHopLHQuX19oLnNvbWUoQiksdC5fX2g9W119Y2F0Y2gocil7dC5fX2g9W10sYy5fX2UocixuLl9fdil9fX1jLl9fYj1mdW5jdGlvbihuKXtyPW51bGwsZSYmZShuKX0sYy5fXz1mdW5jdGlvbihuLHQpe24mJnQuX19rJiZ0Ll9fay5fX20mJihuLl9fbT10Ll9fay5fX20pLHMmJnMobix0KX0sYy5fX3I9ZnVuY3Rpb24obil7YSYmYShuKSx0PTA7dmFyIGk9KHI9bi5fX2MpLl9fSDtpJiYodT09PXI/KGkuX19oPVtdLHIuX19oPVtdLGkuX18uc29tZShmdW5jdGlvbihuKXtuLl9fTiYmKG4uX189bi5fX04pLG4udT1uLl9fTj12b2lkIDB9KSk6KGkuX19oLnNvbWUoeiksaS5fX2guc29tZShCKSxpLl9faD1bXSx0PTApKSx1PXJ9LGMuZGlmZmVkPWZ1bmN0aW9uKG4pe3YmJnYobik7dmFyIHQ9bi5fX2M7dCYmdC5fX0gmJih0Ll9fSC5fX2gubGVuZ3RoJiYoMSE9PWYucHVzaCh0KSYmaT09PWMucmVxdWVzdEFuaW1hdGlvbkZyYW1lfHwoKGk9Yy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUpfHx3KShqKSksdC5fX0guX18uc29tZShmdW5jdGlvbihuKXtuLnUmJihuLl9fSD1uLnUpLG4udT12b2lkIDB9KSksdT1yPW51bGx9LGMuX19jPWZ1bmN0aW9uKG4sdCl7dC5zb21lKGZ1bmN0aW9uKG4pe3RyeXtuLl9faC5zb21lKHopLG4uX19oPW4uX19oLmZpbHRlcihmdW5jdGlvbihuKXtyZXR1cm4hbi5fX3x8QihuKX0pfWNhdGNoKHIpe3Quc29tZShmdW5jdGlvbihuKXtuLl9faCYmKG4uX19oPVtdKX0pLHQ9W10sYy5fX2UocixuLl9fdil9fSksbCYmbChuLHQpfSxjLnVubW91bnQ9ZnVuY3Rpb24obil7bSYmbShuKTt2YXIgdCxyPW4uX19jO3ImJnIuX19IJiYoci5fX0guX18uc29tZShmdW5jdGlvbihuKXt0cnl7eihuKX1jYXRjaChuKXt0PW59fSksci5fX0g9dm9pZCAwLHQmJmMuX19lKHQsci5fX3YpKX07dmFyIGs9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWVzdEFuaW1hdGlvbkZyYW1lO2Z1bmN0aW9uIHcobil7dmFyIHQscj1mdW5jdGlvbigpe2NsZWFyVGltZW91dCh1KSxrJiZjYW5jZWxBbmltYXRpb25GcmFtZSh0KSxzZXRUaW1lb3V0KG4pfSx1PXNldFRpbWVvdXQociwzNSk7ayYmKHQ9cmVxdWVzdEFuaW1hdGlvbkZyYW1lKHIpKX1mdW5jdGlvbiB6KG4pe3ZhciB0PXIsdT1uLl9fYztcImZ1bmN0aW9uXCI9PXR5cGVvZiB1JiYobi5fX2M9dm9pZCAwLHUoKSkscj10fWZ1bmN0aW9uIEIobil7dmFyIHQ9cjtuLl9fYz1uLl9fKCkscj10fWZ1bmN0aW9uIEMobix0KXtyZXR1cm4hbnx8bi5sZW5ndGghPT10Lmxlbmd0aHx8dC5zb21lKGZ1bmN0aW9uKHQscil7cmV0dXJuIHQhPT1uW3JdfSl9ZnVuY3Rpb24gRChuLHQpe3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIHQ/dChuKTp0fWV4cG9ydHtxIGFzIHVzZUNhbGxiYWNrLHggYXMgdXNlQ29udGV4dCxQIGFzIHVzZURlYnVnVmFsdWUseSBhcyB1c2VFZmZlY3QsYiBhcyB1c2VFcnJvckJvdW5kYXJ5LGcgYXMgdXNlSWQsRiBhcyB1c2VJbXBlcmF0aXZlSGFuZGxlLF8gYXMgdXNlTGF5b3V0RWZmZWN0LFQgYXMgdXNlTWVtbyxoIGFzIHVzZVJlZHVjZXIsQSBhcyB1c2VSZWYsZCBhcyB1c2VTdGF0ZX07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1ob29rcy5tb2R1bGUuanMubWFwXG4iLCJpbXBvcnR7b3B0aW9ucyBhcyByLEZyYWdtZW50IGFzIGV9ZnJvbVwicHJlYWN0XCI7ZXhwb3J0e0ZyYWdtZW50fWZyb21cInByZWFjdFwiO3ZhciB0PS9bXCImPF0vO2Z1bmN0aW9uIG4ocil7aWYoMD09PXIubGVuZ3RofHwhMT09PXQudGVzdChyKSlyZXR1cm4gcjtmb3IodmFyIGU9MCxuPTAsbz1cIlwiLGY9XCJcIjtuPHIubGVuZ3RoO24rKyl7c3dpdGNoKHIuY2hhckNvZGVBdChuKSl7Y2FzZSAzNDpmPVwiJnF1b3Q7XCI7YnJlYWs7Y2FzZSAzODpmPVwiJmFtcDtcIjticmVhaztjYXNlIDYwOmY9XCImbHQ7XCI7YnJlYWs7ZGVmYXVsdDpjb250aW51ZX1uIT09ZSYmKG8rPXIuc2xpY2UoZSxuKSksbys9ZixlPW4rMX1yZXR1cm4gbiE9PWUmJihvKz1yLnNsaWNlKGUsbikpLG99dmFyIG89L2FjaXR8ZXgoPzpzfGd8bnxwfCQpfHJwaHxncmlkfG93c3xtbmN8bnR3fGluZVtjaF18em9vfF5vcmR8aXRlcmEvaSxmPTAsaT1BcnJheS5pc0FycmF5O2Z1bmN0aW9uIHUoZSx0LG4sbyxpLHUpe3R8fCh0PXt9KTt2YXIgYSxjLHA9dDtpZihcInJlZlwiaW4gcClmb3IoYyBpbiBwPXt9LHQpXCJyZWZcIj09Yz9hPXRbY106cFtjXT10W2NdO3ZhciBsPXt0eXBlOmUscHJvcHM6cCxrZXk6bixyZWY6YSxfX2s6bnVsbCxfXzpudWxsLF9fYjowLF9fZTpudWxsLF9fYzpudWxsLGNvbnN0cnVjdG9yOnZvaWQgMCxfX3Y6LS1mLF9faTotMSxfX3U6MCxfX3NvdXJjZTppLF9fc2VsZjp1fTtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBlJiYoYT1lLmRlZmF1bHRQcm9wcykpZm9yKGMgaW4gYSl2b2lkIDA9PT1wW2NdJiYocFtjXT1hW2NdKTtyZXR1cm4gci52bm9kZSYmci52bm9kZShsKSxsfWZ1bmN0aW9uIGEocil7dmFyIHQ9dShlLHt0cGw6cixleHByczpbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywxKX0pO3JldHVybiB0LmtleT10Ll9fdix0fXZhciBjPXt9LHA9L1tBLVpdL2c7ZnVuY3Rpb24gbChlLHQpe2lmKHIuYXR0cil7dmFyIGY9ci5hdHRyKGUsdCk7aWYoXCJzdHJpbmdcIj09dHlwZW9mIGYpcmV0dXJuIGZ9aWYodD1mdW5jdGlvbihyKXtyZXR1cm4gbnVsbCE9PXImJlwib2JqZWN0XCI9PXR5cGVvZiByJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiByLnZhbHVlT2Y/ci52YWx1ZU9mKCk6cn0odCksXCJyZWZcIj09PWV8fFwia2V5XCI9PT1lKXJldHVyblwiXCI7aWYoXCJzdHlsZVwiPT09ZSYmXCJvYmplY3RcIj09dHlwZW9mIHQpe3ZhciBpPVwiXCI7Zm9yKHZhciB1IGluIHQpe3ZhciBhPXRbdV07aWYobnVsbCE9YSYmXCJcIiE9PWEpe3ZhciBsPVwiLVwiPT11WzBdP3U6Y1t1XXx8KGNbdV09dS5yZXBsYWNlKHAsXCItJCZcIikudG9Mb3dlckNhc2UoKSkscz1cIjtcIjtcIm51bWJlclwiIT10eXBlb2YgYXx8bC5zdGFydHNXaXRoKFwiLS1cIil8fG8udGVzdChsKXx8KHM9XCJweDtcIiksaT1pK2wrXCI6XCIrYStzfX1yZXR1cm4gZSsnPVwiJytuKGkpKydcIid9cmV0dXJuIG51bGw9PXR8fCExPT09dHx8XCJmdW5jdGlvblwiPT10eXBlb2YgdHx8XCJvYmplY3RcIj09dHlwZW9mIHQ/XCJcIjohMD09PXQ/ZTplKyc9XCInK24oXCJcIit0KSsnXCInfWZ1bmN0aW9uIHMocil7aWYobnVsbD09cnx8XCJib29sZWFuXCI9PXR5cGVvZiByfHxcImZ1bmN0aW9uXCI9PXR5cGVvZiByKXJldHVybiBudWxsO2lmKFwib2JqZWN0XCI9PXR5cGVvZiByKXtpZih2b2lkIDA9PT1yLmNvbnN0cnVjdG9yKXJldHVybiByO2lmKGkocikpe2Zvcih2YXIgZT0wO2U8ci5sZW5ndGg7ZSsrKXJbZV09cyhyW2VdKTtyZXR1cm4gcn19cmV0dXJuIG4oXCJcIityKX1leHBvcnR7dSBhcyBqc3gsbCBhcyBqc3hBdHRyLHUgYXMganN4REVWLHMgYXMganN4RXNjYXBlLGEgYXMganN4VGVtcGxhdGUsdSBhcyBqc3hzfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWpzeFJ1bnRpbWUubW9kdWxlLmpzLm1hcFxuIiwiaW1wb3J0IHsgY3JlYXRlQ29udGV4dCB9IGZyb20gJ3ByZWFjdCdcbmltcG9ydCB7IHVzZUNvbnRleHQgfSBmcm9tICdwcmVhY3QvaG9va3MnXG5pbXBvcnQgdHlwZSB7IFNldHRpbmdzU3RvcmUgfSBmcm9tICcuLi8uLi9hcHBsaWNhdGlvbi9zZXR0aW5ncy9zZXR0aW5nc1N0b3JlJ1xuXG5jb25zdCBTZXR0aW5nc0NvbnRleHQgPSBjcmVhdGVDb250ZXh0PFNldHRpbmdzU3RvcmUgfCBudWxsPihudWxsKVxuXG5pbnRlcmZhY2UgU2V0dGluZ3NQcm92aWRlclByb3BzIHtcbiAgc2V0dGluZ3M6IFNldHRpbmdzU3RvcmVcbiAgY2hpbGRyZW46IHByZWFjdC5Db21wb25lbnRDaGlsZHJlblxufVxuXG5leHBvcnQgZnVuY3Rpb24gU2V0dGluZ3NQcm92aWRlcih7IHNldHRpbmdzLCBjaGlsZHJlbiB9OiBTZXR0aW5nc1Byb3ZpZGVyUHJvcHMpIHtcbiAgcmV0dXJuIDxTZXR0aW5nc0NvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3NldHRpbmdzfT57Y2hpbGRyZW59PC9TZXR0aW5nc0NvbnRleHQuUHJvdmlkZXI+XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VTZXR0aW5ncygpOiBTZXR0aW5nc1N0b3JlIHtcbiAgY29uc3Qgc2V0dGluZ3MgPSB1c2VDb250ZXh0KFNldHRpbmdzQ29udGV4dClcbiAgLyogdjggaWdub3JlIG5leHQgMyAqL1xuICBpZiAoIXNldHRpbmdzKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd1c2VTZXR0aW5ncyBtdXN0IGJlIHVzZWQgd2l0aGluIGEgU2V0dGluZ3NQcm92aWRlcicpXG4gIH1cbiAgcmV0dXJuIHNldHRpbmdzXG59XG4iLCJpbXBvcnQgdHlwZSB7IFNpZ25hbCB9IGZyb20gJ0BwcmVhY3Qvc2lnbmFscydcbmltcG9ydCB0eXBlIHsgQ29tcG9uZW50Q2hpbGRyZW4gfSBmcm9tICdwcmVhY3QnXG5cbmludGVyZmFjZSBCdXR0b25Sb3dQcm9wcyB7XG4gIGNoaWxkcmVuOiBDb21wb25lbnRDaGlsZHJlblxuICB2aXNpYmxlPzogU2lnbmFsPGJvb2xlYW4+XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBCdXR0b25Sb3coeyBjaGlsZHJlbiwgdmlzaWJsZSB9OiBCdXR0b25Sb3dQcm9wcykge1xuICBpZiAodmlzaWJsZSAmJiAhdmlzaWJsZS52YWx1ZSkge1xuICAgIHJldHVybiBudWxsXG4gIH1cblxuICByZXR1cm4gPGRpdj57Y2hpbGRyZW59PC9kaXY+XG59XG4iLCJpbXBvcnQgdHlwZSB7IFNpZ25hbCB9IGZyb20gJ0BwcmVhY3Qvc2lnbmFscydcblxuaW50ZXJmYWNlIFNldHRpbmdCdXR0b25Qcm9wczxUPiB7XG4gIGxhYmVsOiBzdHJpbmdcbiAgc2V0dGluZzogU2lnbmFsPFQ+XG4gIG9wdGlvbnM6IHJlYWRvbmx5IFRbXVxufVxuXG5leHBvcnQgZnVuY3Rpb24gU2V0dGluZ0J1dHRvbjxUPih7IGxhYmVsLCBzZXR0aW5nLCBvcHRpb25zIH06IFNldHRpbmdCdXR0b25Qcm9wczxUPikge1xuICBjb25zdCBoYW5kbGVDbGljayA9ICgpID0+IHtcbiAgICBjb25zdCBjdXJyZW50SW5kZXggPSBvcHRpb25zLmluZGV4T2Yoc2V0dGluZy52YWx1ZSlcbiAgICBjb25zdCBuZXh0SW5kZXggPSAoY3VycmVudEluZGV4ICsgMSkgJSBvcHRpb25zLmxlbmd0aFxuICAgIHNldHRpbmcudmFsdWUgPSBvcHRpb25zW25leHRJbmRleF1cbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGJ1dHRvbiBvbkNsaWNrPXtoYW5kbGVDbGlja30gdHlwZT1cImJ1dHRvblwiPlxuICAgICAge2xhYmVsfToge1N0cmluZyhzZXR0aW5nLnZhbHVlKX1cbiAgICA8L2J1dHRvbj5cbiAgKVxufVxuIiwiaW1wb3J0IHR5cGUgeyBTaWduYWwgfSBmcm9tICdAcHJlYWN0L3NpZ25hbHMnXG5pbXBvcnQgeyB1c2VTZXR0aW5ncyB9IGZyb20gJy4uL2NvbnRleHRzL1NldHRpbmdzQ29udGV4dCdcbmltcG9ydCB7IEJ1dHRvblJvdyB9IGZyb20gJy4vQnV0dG9uUm93J1xuaW1wb3J0IHsgU2V0dGluZ0J1dHRvbiB9IGZyb20gJy4vU2V0dGluZ0J1dHRvbidcblxuaW50ZXJmYWNlIENvbnRyb2xQYW5lbFByb3BzIHtcbiAgYm9hcmRDaGFuZ2VkOiBTaWduYWw8bnVtYmVyPlxufVxuXG5jb25zdCBTUEVBS19SQVRFX09QVElPTlMgPSBbMC4yLCAwLjUsIDAuNywgMS4wLCAxLjEsIDEuMl0gYXMgY29uc3RcbmNvbnN0IFRPR0dMRV9PUFRJT05TID0gW2ZhbHNlLCB0cnVlXSBhcyBjb25zdFxuXG5leHBvcnQgZnVuY3Rpb24gQ29udHJvbFBhbmVsKHsgYm9hcmRDaGFuZ2VkIH06IENvbnRyb2xQYW5lbFByb3BzKSB7XG4gIGNvbnN0IHNldHRpbmdzID0gdXNlU2V0dGluZ3MoKVxuXG4gIC8vIFVzZSBib2FyZENoYW5nZWQgdG8gZW5zdXJlIGNvbXBvbmVudCByZS1yZW5kZXJzIHdoZW4gYm9hcmQgY2hhbmdlc1xuICBib2FyZENoYW5nZWQudmFsdWVcblxuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICA8QnV0dG9uUm93PlxuICAgICAgICA8U2V0dGluZ0J1dHRvblxuICAgICAgICAgIGxhYmVsPVwiU3BlYWsgUmF0ZVwiXG4gICAgICAgICAgc2V0dGluZz17c2V0dGluZ3Muc3BlYWtSYXRlfVxuICAgICAgICAgIG9wdGlvbnM9e1NQRUFLX1JBVEVfT1BUSU9OU31cbiAgICAgICAgLz5cbiAgICAgICAgPFNldHRpbmdCdXR0b25cbiAgICAgICAgICBsYWJlbD1cIlBpZWNlcyBMaXN0XCJcbiAgICAgICAgICBzZXR0aW5nPXtzZXR0aW5ncy5waWVjZXNMaXN0RW5hYmxlZH1cbiAgICAgICAgICBvcHRpb25zPXtUT0dHTEVfT1BUSU9OU31cbiAgICAgICAgLz5cbiAgICAgICAgPFNldHRpbmdCdXR0b25cbiAgICAgICAgICBsYWJlbD1cIkRpdmlkZXJzXCJcbiAgICAgICAgICBzZXR0aW5nPXtzZXR0aW5ncy5kaXZpZGVyc0VuYWJsZWR9XG4gICAgICAgICAgb3B0aW9ucz17VE9HR0xFX09QVElPTlN9XG4gICAgICAgIC8+XG4gICAgICAgIDxTZXR0aW5nQnV0dG9uXG4gICAgICAgICAgbGFiZWw9XCJDdXN0b20gQm9hcmRcIlxuICAgICAgICAgIHNldHRpbmc9e3NldHRpbmdzLmN1c3RvbUJvYXJkRW5hYmxlZH1cbiAgICAgICAgICBvcHRpb25zPXtUT0dHTEVfT1BUSU9OU31cbiAgICAgICAgLz5cbiAgICAgICAgPFNldHRpbmdCdXR0b25cbiAgICAgICAgICBsYWJlbD1cIkZsYXNoIE1vZGVcIlxuICAgICAgICAgIHNldHRpbmc9e3NldHRpbmdzLmZsYXNoTW9kZUVuYWJsZWR9XG4gICAgICAgICAgb3B0aW9ucz17VE9HR0xFX09QVElPTlN9XG4gICAgICAgIC8+XG4gICAgICA8L0J1dHRvblJvdz5cbiAgICA8L2Rpdj5cbiAgKVxufVxuIiwiaW1wb3J0IHR5cGUgeyBTaWduYWwgfSBmcm9tICdAcHJlYWN0L3NpZ25hbHMtY29yZSdcbmltcG9ydCB7IHJlbmRlciB9IGZyb20gJ3ByZWFjdCdcbmltcG9ydCB0eXBlIHsgU2V0dGluZ3NTdG9yZSB9IGZyb20gJy4uLy4uL2FwcGxpY2F0aW9uL3NldHRpbmdzL3NldHRpbmdzU3RvcmUnXG5pbXBvcnQgeyBTZXR0aW5nc1Byb3ZpZGVyIH0gZnJvbSAnLi4vY29udGV4dHMvU2V0dGluZ3NDb250ZXh0J1xuaW1wb3J0IHsgQ29udHJvbFBhbmVsIH0gZnJvbSAnLi9Db250cm9sUGFuZWwnXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVSb290KFxuICBib2FyZENoYW5nZWQ6IFNpZ25hbDxudW1iZXI+LFxuICBtb3VudFBvaW50OiBIVE1MRWxlbWVudCxcbiAgc2V0dGluZ3M6IFNldHRpbmdzU3RvcmVcbik6IHZvaWQge1xuICByZW5kZXIoXG4gICAgPFNldHRpbmdzUHJvdmlkZXIgc2V0dGluZ3M9e3NldHRpbmdzfT5cbiAgICAgIDxDb250cm9sUGFuZWwgYm9hcmRDaGFuZ2VkPXtib2FyZENoYW5nZWR9IC8+XG4gICAgPC9TZXR0aW5nc1Byb3ZpZGVyPixcbiAgICBtb3VudFBvaW50XG4gIClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlc3Ryb3lSb290KG1vdW50UG9pbnQ6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gIHJlbmRlcihudWxsLCBtb3VudFBvaW50KVxufVxuIiwiaW1wb3J0IHsgQ3NzQ2xhc3MsIENzc0Rpc3BsYXksIERvbVNlbGVjdG9yIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL2RvbSdcbmltcG9ydCB7IGFwcGVuZENoaWxkLCBjcmVhdGVEaXYsIHF1ZXJ5U2VsZWN0b3IgfSBmcm9tICcuLi8uLi9wbGF0Zm9ybS9kb20nXG5cbmV4cG9ydCBpbnRlcmZhY2UgRmxhc2hPdmVybGF5U3RhdGUge1xuICBvdmVybGF5OiBIVE1MRWxlbWVudFxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRmxhc2hPdmVybGF5KCk6IEZsYXNoT3ZlcmxheVN0YXRlIHtcbiAgY29uc3Qgb3ZlcmxheSA9IGNyZWF0ZURpdigpXG4gIG92ZXJsYXkuY2xhc3NOYW1lID0gQ3NzQ2xhc3MuVVNFUlNDUklQVF9GTEFTSFxuICBvdmVybGF5LnN0eWxlLmNzc1RleHQgPSBgXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMDtcbiAgICBsZWZ0OiAwO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICBiYWNrZ3JvdW5kOiBibGFjaztcbiAgICB6LWluZGV4OiAxMDAwO1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIGBcblxuICBjb25zdCBjb250YWluZXIgPSBxdWVyeVNlbGVjdG9yKERvbVNlbGVjdG9yLkNPTlRBSU5FUilcbiAgaWYgKGNvbnRhaW5lcikge1xuICAgIGFwcGVuZENoaWxkKGNvbnRhaW5lciwgb3ZlcmxheSlcbiAgfVxuXG4gIHJldHVybiB7IG92ZXJsYXkgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvd0ZsYXNoKHN0YXRlOiBGbGFzaE92ZXJsYXlTdGF0ZSk6IHZvaWQge1xuICBzdGF0ZS5vdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBDc3NEaXNwbGF5LkJMT0NLXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoaWRlRmxhc2goc3RhdGU6IEZsYXNoT3ZlcmxheVN0YXRlKTogdm9pZCB7XG4gIHN0YXRlLm92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IENzc0Rpc3BsYXkuTk9ORVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVzdHJveUZsYXNoT3ZlcmxheShzdGF0ZTogRmxhc2hPdmVybGF5U3RhdGUpOiB2b2lkIHtcbiAgc3RhdGUub3ZlcmxheS5yZW1vdmUoKVxufVxuIiwiaW1wb3J0IHsgc2lnbmFsIH0gZnJvbSAnQHByZWFjdC9zaWduYWxzLWNvcmUnXG5pbXBvcnQgeyBzZXR1cERpdmlkZXJzRWZmZWN0IH0gZnJvbSAnLi9hcHBsaWNhdGlvbi9lZmZlY3RzL29uRGl2aWRlcnMnXG5pbXBvcnQgeyBzZXR1cEtleWJvYXJkQ29tbWFuZHMsIHRlYXJkb3duS2V5Ym9hcmRDb21tYW5kcyB9IGZyb20gJy4vYXBwbGljYXRpb24vaW5wdXQva2V5Ym9hcmRJbnB1dCdcbmltcG9ydCB7XG4gIGNyZWF0ZUJvYXJkT2JzZXJ2ZXIsXG4gIHN0YXJ0Qm9hcmRPYnNlcnZlcixcbiAgc3RvcEJvYXJkT2JzZXJ2ZXIsXG59IGZyb20gJy4vYXBwbGljYXRpb24vb2JzZXJ2ZXJzL29ic2VydmVyU3RhdGUnXG5pbXBvcnQge1xuICBjcmVhdGVTZXR0aW5nc1N0b3JlLFxuICBsb2FkU2V0dGluZ3MsXG4gIHNldHVwQXV0b1NhdmUsXG59IGZyb20gJy4vYXBwbGljYXRpb24vc2V0dGluZ3Mvc2V0dGluZ3NTdG9yZSdcbmltcG9ydCB7IERvbVNlbGVjdG9yIH0gZnJvbSAnLi9jb25zdGFudHMvZG9tJ1xuaW1wb3J0IHsgYXBwZW5kQ2hpbGQsIGNyZWF0ZURpdiwgcXVlcnlTZWxlY3Rvciwgd2FpdEZvckVsZW1lbnQgfSBmcm9tICcuL3BsYXRmb3JtL2RvbSdcbmltcG9ydCB7IGNyZWF0ZVJvb3QsIGRlc3Ryb3lSb290IH0gZnJvbSAnLi9wcmVzZW50YXRpb24vY29tcG9uZW50cy9yb290J1xuaW1wb3J0IHsgY3JlYXRlRGl2aWRlcnMsIGRlc3Ryb3lEaXZpZGVycyB9IGZyb20gJy4vcHJlc2VudGF0aW9uL25vbi1wcmVhY3QtY29tcG9uZW50cy9kaXZpZGVycydcbmltcG9ydCB7IGNyZWF0ZUZsYXNoT3ZlcmxheSwgZGVzdHJveUZsYXNoT3ZlcmxheSB9IGZyb20gJy4vcHJlc2VudGF0aW9uL25vbi1wcmVhY3QtY29tcG9uZW50cy9mbGFzaCdcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGluaXQoKSB7XG4gIC8vIFdhaXQgZm9yIGxpY2hlc3MgdG8gbG9hZCB0aGUgYm9hcmRcbiAgYXdhaXQgd2FpdEZvckVsZW1lbnQoRG9tU2VsZWN0b3IuS0VZQk9BUkRfTU9WRSlcblxuICAvLyBJbml0aWFsaXplIHNldHRpbmdzXG4gIGNvbnN0IHNldHRpbmdzID0gY3JlYXRlU2V0dGluZ3NTdG9yZSgpXG4gIGxvYWRTZXR0aW5ncyhzZXR0aW5ncylcbiAgc2V0dXBBdXRvU2F2ZShzZXR0aW5ncylcblxuICAvLyBDcmVhdGUgc2hhcmVkIGJvYXJkIGNoYW5nZSBzaWduYWxcbiAgY29uc3QgYm9hcmRDaGFuZ2VkID0gc2lnbmFsKDApXG5cbiAgLy8gQ3JlYXRlIERPTSBzdGF0ZVxuICBjb25zdCBmbGFzaFN0YXRlID0gY3JlYXRlRmxhc2hPdmVybGF5KClcbiAgY29uc3QgZGl2aWRlcnNTdGF0ZSA9IGNyZWF0ZURpdmlkZXJzKClcbiAgY29uc3QgYm9hcmRPYnNlcnZlclN0YXRlID0gY3JlYXRlQm9hcmRPYnNlcnZlcihib2FyZENoYW5nZWQpXG5cbiAgLy8gU3RhcnQgb2JzZXJ2ZXJcbiAgc3RhcnRCb2FyZE9ic2VydmVyKGJvYXJkT2JzZXJ2ZXJTdGF0ZSlcblxuICAvLyBTZXQgdXAgZWZmZWN0c1xuICBjb25zdCBjbGVhbnVwRGl2aWRlcnMgPSBzZXR1cERpdmlkZXJzRWZmZWN0KGRpdmlkZXJzU3RhdGUsIHNldHRpbmdzKVxuXG4gIC8vIFNldCB1cCBjb21tYW5kc1xuICBzZXR1cEtleWJvYXJkQ29tbWFuZHMoc2V0dGluZ3MpXG5cbiAgLy8gTW91bnQgUHJlYWN0IFVJXG4gIGNvbnN0IG1vdW50UG9pbnQgPSBjcmVhdGVEaXYoKVxuICBjb25zdCBrZXlib2FyZE1vdmUgPSBxdWVyeVNlbGVjdG9yKERvbVNlbGVjdG9yLktFWUJPQVJEX01PVkUpXG4gIGlmIChrZXlib2FyZE1vdmUpIHtcbiAgICBhcHBlbmRDaGlsZChrZXlib2FyZE1vdmUsIG1vdW50UG9pbnQpXG4gIH1cbiAgY3JlYXRlUm9vdChib2FyZENoYW5nZWQsIG1vdW50UG9pbnQsIHNldHRpbmdzKVxuXG4gIC8vIFJldHVybiBjbGVhbnVwIGZ1bmN0aW9uXG4gIHJldHVybiAoKSA9PiB7XG4gICAgY2xlYW51cERpdmlkZXJzKClcbiAgICBzdG9wQm9hcmRPYnNlcnZlcihib2FyZE9ic2VydmVyU3RhdGUpXG4gICAgZGVzdHJveUZsYXNoT3ZlcmxheShmbGFzaFN0YXRlKVxuICAgIGRlc3Ryb3lEaXZpZGVycyhkaXZpZGVyc1N0YXRlKVxuICAgIHRlYXJkb3duS2V5Ym9hcmRDb21tYW5kcygpXG4gICAgZGVzdHJveVJvb3QobW91bnRQb2ludClcbiAgfVxufVxuIiwiaW1wb3J0IHsgaW5pdCB9IGZyb20gJy4vaW5pdCdcblxuLy8gU3RhcnQgdGhlIGFwcGxpY2F0aW9uXG5pbml0KCkuY2F0Y2goY29uc29sZS5lcnJvcilcbiJdLCJ4X2dvb2dsZV9pZ25vcmVMaXN0IjpbMCwyMiwyMywyNF0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0NBQUEsSUFBSUEsTUFBRSxPQUFPLElBQUksZ0JBQWdCO0NBQUUsU0FBU0MsTUFBRztFQUFDLElBQUcsRUFBRUMsTUFBRSxJQUFHO0dBQUMsSUFBSSxHQUFFLElBQUUsQ0FBQztHQUFFLENBQUMsV0FBVTtJQUFDLElBQUksSUFBRUM7SUFBRSxNQUFFLEtBQUs7SUFBRSxPQUFNLEtBQUssTUFBSSxHQUFFO0tBQUMsSUFBRyxFQUFFLEVBQUUsTUFBSSxFQUFFLEdBQUUsRUFBRSxFQUFFLElBQUUsRUFBRTtLQUFFLElBQUUsRUFBRTtJQUFDO0dBQUMsR0FBRTtHQUFFLE9BQU0sS0FBSyxNQUFJQyxLQUFFO0lBQUMsSUFBSSxJQUFFQTtJQUFFLE1BQUUsS0FBSztJQUFFO0lBQUksT0FBTSxLQUFLLE1BQUksR0FBRTtLQUFDLElBQUksSUFBRSxFQUFFO0tBQUUsRUFBRSxJQUFFLEtBQUs7S0FBRSxFQUFFLEtBQUc7S0FBRyxJQUFHLEVBQUUsSUFBRSxFQUFFLE1BQUlDLElBQUUsQ0FBQyxHQUFFLElBQUc7TUFBQyxFQUFFLEVBQUU7S0FBQyxTQUFPLEdBQUU7TUFBQyxJQUFHLENBQUMsR0FBRTtPQUFDLElBQUU7T0FBRSxJQUFFLENBQUM7TUFBQztLQUFDO0tBQUMsSUFBRTtJQUFDO0dBQUM7R0FBQyxNQUFFO0dBQUU7R0FBSSxJQUFHLEdBQUUsTUFBTTtFQUFDLE9BQU07Q0FBRztDQUF1RSxJQUFJQyxNQUFFLEtBQUs7Q0FBRSxTQUFTQyxJQUFFLEdBQUU7RUFBQyxJQUFJLElBQUVEO0VBQUUsTUFBRSxLQUFLO0VBQUUsSUFBRztHQUFDLE9BQU8sRUFBRTtFQUFDLFVBQVE7R0FBQyxNQUFFO0VBQUM7Q0FBQztDQUFDLElBQUlFLEtBQUVKLE1BQUUsS0FBSyxHQUFFRixNQUFFLEdBQUVPLE1BQUUsR0FBTUUsTUFBRSxHQUFFUixNQUFFLEtBQUssR0FBRVMsTUFBRTtDQUFFLFNBQVNDLElBQUUsR0FBRTtFQUFDLElBQUcsS0FBSyxNQUFJUCxLQUFFO0dBQUMsSUFBSSxJQUFFLEVBQUU7R0FBRSxJQUFHLEtBQUssTUFBSSxLQUFHLEVBQUUsTUFBSUEsS0FBRTtJQUFDLElBQUU7S0FBQyxHQUFFO0tBQUUsR0FBRTtLQUFFLEdBQUVBLElBQUU7S0FBRSxHQUFFLEtBQUs7S0FBRSxHQUFFQTtLQUFFLEdBQUUsS0FBSztLQUFFLEdBQUUsS0FBSztLQUFFLEdBQUU7SUFBQztJQUFFLElBQUcsS0FBSyxNQUFJQSxJQUFFLEdBQUUsSUFBRSxFQUFFLElBQUU7SUFBRSxJQUFFLElBQUU7SUFBRSxFQUFFLElBQUU7SUFBRSxJQUFHLEtBQUdBLElBQUUsR0FBRSxFQUFFLEVBQUUsQ0FBQztJQUFFLE9BQU87R0FBQyxPQUFNLElBQUcsT0FBSyxFQUFFLEdBQUU7SUFBQyxFQUFFLElBQUU7SUFBRSxJQUFHLEtBQUssTUFBSSxFQUFFLEdBQUU7S0FBQyxFQUFFLEVBQUUsSUFBRSxFQUFFO0tBQUUsSUFBRyxLQUFLLE1BQUksRUFBRSxHQUFFLEVBQUUsRUFBRSxJQUFFLEVBQUU7S0FBRSxFQUFFLElBQUVBLElBQUU7S0FBRSxFQUFFLElBQUUsS0FBSztLQUFFLElBQUUsRUFBRSxJQUFFO0tBQUUsSUFBRSxJQUFFO0lBQUM7SUFBQyxPQUFPO0dBQUM7RUFBQztDQUFDO0NBQUMsU0FBU1EsSUFBRSxHQUFFLEdBQUU7RUFBQyxLQUFLLElBQUU7RUFBRSxLQUFLLElBQUU7RUFBRSxLQUFLLElBQUUsS0FBSztFQUFFLEtBQUssSUFBRSxLQUFLO0VBQUUsS0FBSyxJQUFFO0VBQUUsS0FBSyxJQUFFLFFBQU0sSUFBRSxLQUFLLElBQUUsRUFBRTtFQUFRLEtBQUssSUFBRSxRQUFNLElBQUUsS0FBSyxJQUFFLEVBQUU7RUFBVSxLQUFLLE9BQUssUUFBTSxJQUFFLEtBQUssSUFBRSxFQUFFO0NBQUk7Q0FBQyxJQUFFLFVBQVUsUUFBTWQ7Q0FBRSxJQUFFLFVBQVUsSUFBRSxXQUFVO0VBQUMsT0FBTSxDQUFDO0NBQUM7Q0FBRSxJQUFFLFVBQVUsSUFBRSxTQUFTLEdBQUU7RUFBQyxJQUFJLElBQUUsTUFBSyxJQUFFLEtBQUs7RUFBRSxJQUFHLE1BQUksS0FBRyxLQUFLLE1BQUksRUFBRSxHQUFFO0dBQUMsRUFBRSxJQUFFO0dBQUUsS0FBSyxJQUFFO0dBQUUsSUFBRyxLQUFLLE1BQUksR0FBRSxFQUFFLElBQUU7UUFBTyxJQUFFLFdBQVU7SUFBQyxJQUFJO0lBQUUsU0FBTyxJQUFFLEVBQUUsTUFBSSxFQUFFLEtBQUssQ0FBQztHQUFDLENBQUM7RUFBQztDQUFDO0NBQUUsSUFBRSxVQUFVLElBQUUsU0FBUyxHQUFFO0VBQUMsSUFBSSxJQUFFO0VBQUssSUFBRyxLQUFLLE1BQUksS0FBSyxHQUFFO0dBQUMsSUFBSSxJQUFFLEVBQUUsR0FBRSxJQUFFLEVBQUU7R0FBRSxJQUFHLEtBQUssTUFBSSxHQUFFO0lBQUMsRUFBRSxJQUFFO0lBQUUsRUFBRSxJQUFFLEtBQUs7R0FBQztHQUFDLElBQUcsS0FBSyxNQUFJLEdBQUU7SUFBQyxFQUFFLElBQUU7SUFBRSxFQUFFLElBQUUsS0FBSztHQUFDO0dBQUMsSUFBRyxNQUFJLEtBQUssR0FBRTtJQUFDLEtBQUssSUFBRTtJQUFFLElBQUcsS0FBSyxNQUFJLEdBQUUsSUFBRSxXQUFVO0tBQUMsSUFBSTtLQUFFLFNBQU8sSUFBRSxFQUFFLE1BQUksRUFBRSxLQUFLLENBQUM7SUFBQyxDQUFDO0dBQUM7RUFBQztDQUFDO0NBQUUsSUFBRSxVQUFVLFlBQVUsU0FBUyxHQUFFO0VBQUMsSUFBSSxJQUFFO0VBQUssT0FBT2UsSUFBRSxXQUFVO0dBQUMsSUFBSSxJQUFFLEVBQUUsT0FBTSxJQUFFVDtHQUFFLE1BQUUsS0FBSztHQUFFLElBQUc7SUFBQyxFQUFFLENBQUM7R0FBQyxVQUFRO0lBQUMsTUFBRTtHQUFDO0VBQUMsR0FBRSxFQUFDLE1BQUssTUFBSyxDQUFDO0NBQUM7Q0FBRSxJQUFFLFVBQVUsVUFBUSxXQUFVO0VBQUMsT0FBTyxLQUFLO0NBQUs7Q0FBRSxJQUFFLFVBQVUsV0FBUyxXQUFVO0VBQUMsT0FBTyxLQUFLLFFBQU07Q0FBRTtDQUFFLElBQUUsVUFBVSxTQUFPLFdBQVU7RUFBQyxPQUFPLEtBQUs7Q0FBSztDQUFFLElBQUUsVUFBVSxPQUFLLFdBQVU7RUFBQyxJQUFJLElBQUU7RUFBSyxPQUFPQyxJQUFFLFdBQVU7R0FBQyxPQUFPLEVBQUU7RUFBSyxDQUFDO0NBQUM7Q0FBRSxPQUFPLGVBQWVPLElBQUUsV0FBVSxTQUFRO0VBQUMsS0FBSSxXQUFVO0dBQUMsSUFBSSxJQUFFRCxJQUFFLElBQUk7R0FBRSxJQUFHLEtBQUssTUFBSSxHQUFFLEVBQUUsSUFBRSxLQUFLO0dBQUUsT0FBTyxLQUFLO0VBQUM7RUFBRSxLQUFJLFNBQVMsR0FBRTtHQUFDLElBQUcsTUFBSSxLQUFLLEdBQUU7SUFBQyxJQUFHSixNQUFFLEtBQUksTUFBTSxJQUFJLE1BQU0sZ0JBQWdCO0lBQUUsQ0FBQyxTQUFTLEdBQUU7S0FBQyxJQUFHLE1BQUlQLE9BQUcsTUFBSU87VUFBSyxFQUFFLE1BQUlFLEtBQUU7T0FBQyxFQUFFLElBQUVBO09BQUUsTUFBRTtRQUFDLEdBQUU7UUFBRSxHQUFFLEVBQUU7UUFBRSxHQUFFLEVBQUU7UUFBRSxHQUFFUjtPQUFDO01BQUM7O0lBQUMsR0FBRSxJQUFJO0lBQUUsS0FBSyxJQUFFO0lBQUUsS0FBSztJQUFJO0lBQUk7SUFBSSxJQUFHO0tBQUMsS0FBSSxJQUFJLElBQUUsS0FBSyxHQUFFLEtBQUssTUFBSSxHQUFFLElBQUUsRUFBRSxHQUFFLEVBQUUsRUFBRSxFQUFFO0lBQUMsVUFBUTtLQUFDLElBQUU7SUFBQztHQUFDO0VBQUM7Q0FBQyxDQUFDO0NBQUUsU0FBU2EsSUFBRSxHQUFFLEdBQUU7RUFBQyxPQUFPLElBQUlGLElBQUUsR0FBRSxDQUFDO0NBQUM7Q0FBQyxTQUFTVCxJQUFFLEdBQUU7RUFBQyxLQUFJLElBQUksSUFBRSxFQUFFLEdBQUUsS0FBSyxNQUFJLEdBQUUsSUFBRSxFQUFFLEdBQUUsSUFBRyxFQUFFLEVBQUUsTUFBSSxFQUFFLEtBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxLQUFHLEVBQUUsRUFBRSxNQUFJLEVBQUUsR0FBRSxPQUFNLENBQUM7RUFBRSxPQUFNLENBQUM7Q0FBQztDQUFDLFNBQVNZLElBQUUsR0FBRTtFQUFDLEtBQUksSUFBSSxJQUFFLEVBQUUsR0FBRSxLQUFLLE1BQUksR0FBRSxJQUFFLEVBQUUsR0FBRTtHQUFDLElBQUksSUFBRSxFQUFFLEVBQUU7R0FBRSxJQUFHLEtBQUssTUFBSSxHQUFFLEVBQUUsSUFBRTtHQUFFLEVBQUUsRUFBRSxJQUFFO0dBQUUsRUFBRSxJQUFFO0dBQUcsSUFBRyxLQUFLLE1BQUksRUFBRSxHQUFFO0lBQUMsRUFBRSxJQUFFO0lBQUU7R0FBSztFQUFDO0NBQUM7Q0FBQyxTQUFTQyxJQUFFLEdBQUU7RUFBQyxJQUFJLElBQUUsRUFBRSxHQUFFLElBQUUsS0FBSztFQUFFLE9BQU0sS0FBSyxNQUFJLEdBQUU7R0FBQyxJQUFJLElBQUUsRUFBRTtHQUFFLElBQUcsT0FBSyxFQUFFLEdBQUU7SUFBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQUUsSUFBRyxLQUFLLE1BQUksR0FBRSxFQUFFLElBQUUsRUFBRTtJQUFFLElBQUcsS0FBSyxNQUFJLEVBQUUsR0FBRSxFQUFFLEVBQUUsSUFBRTtHQUFDLE9BQU0sSUFBRTtHQUFFLEVBQUUsRUFBRSxJQUFFLEVBQUU7R0FBRSxJQUFHLEtBQUssTUFBSSxFQUFFLEdBQUUsRUFBRSxJQUFFLEtBQUs7R0FBRSxJQUFFO0VBQUM7RUFBQyxFQUFFLElBQUU7Q0FBQztDQUFDLFNBQVNDLElBQUUsR0FBRSxHQUFFO0VBQUMsSUFBRSxLQUFLLE1BQUssS0FBSyxDQUFDO0VBQUUsS0FBSyxJQUFFO0VBQUUsS0FBSyxJQUFFLEtBQUs7RUFBRSxLQUFLLElBQUVQLE1BQUU7RUFBRSxLQUFLLElBQUU7RUFBRSxLQUFLLElBQUUsUUFBTSxJQUFFLEtBQUssSUFBRSxFQUFFO0VBQVEsS0FBSyxJQUFFLFFBQU0sSUFBRSxLQUFLLElBQUUsRUFBRTtFQUFVLEtBQUssT0FBSyxRQUFNLElBQUUsS0FBSyxJQUFFLEVBQUU7Q0FBSTtDQUFDLElBQUUsWUFBVSxJQUFJRSxJQUFBQTtDQUFFLElBQUUsVUFBVSxJQUFFLFdBQVU7RUFBQyxLQUFLLEtBQUc7RUFBRyxJQUFHLElBQUUsS0FBSyxHQUFFLE9BQU0sQ0FBQztFQUFFLElBQUcsT0FBSyxLQUFHLEtBQUssSUFBRyxPQUFNLENBQUM7RUFBRSxLQUFLLEtBQUc7RUFBRyxJQUFHLEtBQUssTUFBSUYsS0FBRSxPQUFNLENBQUM7RUFBRSxLQUFLLElBQUVBO0VBQUUsS0FBSyxLQUFHO0VBQUUsSUFBRyxLQUFLLElBQUUsS0FBRyxDQUFDUCxJQUFFLElBQUksR0FBRTtHQUFDLEtBQUssS0FBRztHQUFHLE9BQU0sQ0FBQztFQUFDO0VBQUMsSUFBSSxJQUFFQztFQUFFLElBQUc7R0FBQyxJQUFFLElBQUk7R0FBRSxNQUFFO0dBQUssSUFBSSxJQUFFLEtBQUssRUFBRTtHQUFFLElBQUcsS0FBRyxLQUFLLEtBQUcsS0FBSyxNQUFJLEtBQUcsTUFBSSxLQUFLLEdBQUU7SUFBQyxLQUFLLElBQUU7SUFBRSxLQUFLLEtBQUc7SUFBSSxLQUFLO0dBQUc7RUFBQyxTQUFPLEdBQUU7R0FBQyxLQUFLLElBQUU7R0FBRSxLQUFLLEtBQUc7R0FBRyxLQUFLO0VBQUc7RUFBQyxNQUFFO0VBQUUsSUFBRSxJQUFJO0VBQUUsS0FBSyxLQUFHO0VBQUcsT0FBTSxDQUFDO0NBQUM7Q0FBRSxJQUFFLFVBQVUsSUFBRSxTQUFTLEdBQUU7RUFBQyxJQUFHLEtBQUssTUFBSSxLQUFLLEdBQUU7R0FBQyxLQUFLLEtBQUc7R0FBRyxLQUFJLElBQUksSUFBRSxLQUFLLEdBQUUsS0FBSyxNQUFJLEdBQUUsSUFBRSxFQUFFLEdBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztFQUFDO0VBQUMsSUFBRSxVQUFVLEVBQUUsS0FBSyxNQUFLLENBQUM7Q0FBQztDQUFFLElBQUUsVUFB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QUFZLENBQUM7Q0FBQztDQUFDLFNBQVNDLElBQUUsR0FBRSxHQUFFLEdBQUU7RUFBQyxJQUFJLEdBQUUsR0FBRSxHQUFFLElBQUUsQ0FBQztFQUFFLEtBQUksS0FBSyxHQUFFLFNBQU8sSUFBRSxJQUFFLEVBQUUsS0FBRyxTQUFPLElBQUUsSUFBRSxFQUFFLEtBQUcsRUFBRSxLQUFHLEVBQUU7RUFBRyxJQUFHLFVBQVUsU0FBTyxNQUFJLEVBQUUsV0FBUyxVQUFVLFNBQU8sSUFBRSxFQUFFLEtBQUssV0FBVSxDQUFDLElBQUUsSUFBRyxjQUFZLE9BQU8sS0FBRyxRQUFNLEVBQUUsY0FBYSxLQUFJLEtBQUssRUFBRSxjQUFhLEtBQUssTUFBSSxFQUFFLE9BQUssRUFBRSxLQUFHLEVBQUUsYUFBYTtFQUFJLE9BQU9DLElBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxJQUFJO0NBQUM7Q0FBQyxTQUFTQSxJQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtFQUFDLElBQUksSUFBRTtHQUFDLE1BQUs7R0FBRSxPQUFNO0dBQUUsS0FBSTtHQUFFLEtBQUk7R0FBRSxLQUFJO0dBQUssSUFBRztHQUFLLEtBQUk7R0FBRSxLQUFJO0dBQUssS0FBSTtHQUFLLGFBQVksS0FBSztHQUFFLEtBQUksUUFBTSxJQUFFLEVBQUVmLE1BQUU7R0FBRSxLQUFJO0dBQUcsS0FBSTtFQUFDO0VBQUUsT0FBTyxRQUFNLEtBQUcsUUFBTUQsSUFBRSxTQUFPQSxJQUFFLE1BQU0sQ0FBQyxHQUFFO0NBQUM7Q0FBbUMsU0FBUyxFQUFFLEdBQUU7RUFBQyxPQUFPLEVBQUU7Q0FBUTtDQUFDLFNBQVMsRUFBRSxHQUFFLEdBQUU7RUFBQyxLQUFLLFFBQU0sR0FBRSxLQUFLLFVBQVE7Q0FBQztDQUFDLFNBQVMsRUFBRSxHQUFFLEdBQUU7RUFBQyxJQUFHLFFBQU0sR0FBRSxPQUFPLEVBQUUsS0FBRyxFQUFFLEVBQUUsSUFBRyxFQUFFLE1BQUksQ0FBQyxJQUFFO0VBQUssS0FBSSxJQUFJLEdBQUUsSUFBRSxFQUFFLElBQUksUUFBTyxLQUFJLElBQUcsU0FBTyxJQUFFLEVBQUUsSUFBSSxPQUFLLFFBQU0sRUFBRSxLQUFJLE9BQU8sRUFBRTtFQUFJLE9BQU0sY0FBWSxPQUFPLEVBQUUsT0FBSyxFQUFFLENBQUMsSUFBRTtDQUFJO0NBQUMsU0FBUyxFQUFFLEdBQUU7RUFBQyxJQUFHLEVBQUUsT0FBSyxFQUFFLEtBQUk7R0FBQyxJQUFJLElBQUUsRUFBRSxLQUFJLElBQUUsRUFBRSxLQUFJLElBQUUsQ0FBQyxHQUFFLElBQUUsQ0FBQyxHQUFFLElBQUVjLElBQUUsQ0FBQyxHQUFFLENBQUM7R0FBRSxFQUFFLE1BQUksRUFBRSxNQUFJLEdBQUVkLElBQUUsU0FBT0EsSUFBRSxNQUFNLENBQUMsR0FBRSxFQUFFLEVBQUUsS0FBSSxHQUFFLEdBQUUsRUFBRSxLQUFJLEVBQUUsSUFBSSxjQUFhLEtBQUcsRUFBRSxNQUFJLENBQUMsQ0FBQyxJQUFFLE1BQUssR0FBRSxRQUFNLElBQUUsRUFBRSxDQUFDLElBQUUsR0FBRSxDQUFDLEVBQUUsS0FBRyxFQUFFLE1BQUssQ0FBQyxHQUFFLEVBQUUsTUFBSSxFQUFFLEtBQUksRUFBRSxHQUFHLElBQUksRUFBRSxPQUFLLEdBQUUsRUFBRSxHQUFFLEdBQUUsQ0FBQyxHQUFFLEVBQUUsTUFBSSxFQUFFLEtBQUcsTUFBSyxFQUFFLE9BQUssS0FBRyxFQUFFLENBQUM7RUFBQztDQUFDO0NBQUMsU0FBUyxFQUFFLEdBQUU7RUFBQyxJQUFHLFNBQU8sSUFBRSxFQUFFLE9BQUssUUFBTSxFQUFFLEtBQUksT0FBTyxFQUFFLE1BQUksRUFBRSxJQUFJLE9BQUssTUFBSyxFQUFFLElBQUksS0FBSyxTQUFTLEdBQUU7R0FBQyxJQUFHLFFBQU0sS0FBRyxRQUFNLEVBQUUsS0FBSSxPQUFPLEVBQUUsTUFBSSxFQUFFLElBQUksT0FBSyxFQUFFO0VBQUcsQ0FBQyxHQUFFLEVBQUUsQ0FBQztDQUFDO0NBQUMsU0FBUyxFQUFFLEdBQUU7RUFBQyxDQUFDLENBQUMsRUFBRSxRQUFNLEVBQUUsTUFBSSxDQUFDLE1BQUlHLElBQUUsS0FBSyxDQUFDLEtBQUcsQ0FBQyxFQUFFLFNBQU9DLE9BQUdKLElBQUUsd0JBQXNCLE1BQUVBLElBQUUsc0JBQW9CSyxLQUFHLENBQUM7Q0FBQztDQUFDLFNBQVMsSUFBRztFQUFDLElBQUc7R0FBQyxLQUFJLElBQUksR0FBRSxJQUFFLEdBQUVGLElBQUUsU0FBUSxJQUFFLFNBQU8sS0FBR0EsSUFBRSxLQUFLRyxHQUFDLEdBQUUsSUFBRUgsSUFBRSxNQUFNLEdBQUUsSUFBRUEsSUFBRSxRQUFPLEVBQUUsQ0FBQztFQUFDLFVBQVE7R0FBQyxJQUFFLFNBQU8sRUFBRSxNQUFJO0VBQUM7Q0FBQztDQUFDLFNBQVMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7RUFBQyxJQUFJLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsSUFBRSxLQUFHLEVBQUUsT0FBS1UsS0FBRSxJQUFFLEVBQUU7RUFBTyxLQUFJLElBQUUsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLEtBQUksU0FBTyxJQUFFLEVBQUUsSUFBSSxRQUFNLElBQUUsTUFBSSxFQUFFLE9BQUssRUFBRSxFQUFFLFFBQU0sR0FBRSxFQUFFLE1BQUksR0FBRSxJQUFFLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxLQUFJLEVBQUUsT0FBSyxFQUFFLE9BQUssRUFBRSxRQUFNLEVBQUUsT0FBSyxFQUFFLEVBQUUsS0FBSSxNQUFLLENBQUMsR0FBRSxFQUFFLEtBQUssRUFBRSxLQUFJLEVBQUUsT0FBSyxHQUFFLENBQUMsSUFBRyxRQUFNLEtBQUcsUUFBTSxNQUFJLElBQUUsS0FBSSxJQUFFLENBQUMsRUFBRSxJQUFFLEVBQUUsU0FBTyxFQUFFLFFBQU0sRUFBRSxPQUFLLElBQUVJLElBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxHQUFFLEtBQUcsRUFBRSxRQUFNLEVBQUUsTUFBSSxTQUFPLGNBQVksT0FBTyxFQUFFLFFBQU0sS0FBSyxNQUFJLElBQUUsSUFBRSxJQUFFLE1BQUksSUFBRSxFQUFFLGNBQWEsRUFBRSxPQUFLO0VBQUksT0FBTyxFQUFFLE1BQUksR0FBRTtDQUFDO0NBQUMsU0FBUyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtFQUFDLElBQUksR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLElBQUUsRUFBRSxRQUFPLElBQUUsR0FBRSxJQUFFO0VBQUUsS0FBSSxFQUFFLE1BQUksSUFBSSxNQUFNLENBQUMsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLEtBQUksU0FBTyxJQUFFLEVBQUUsT0FBSyxhQUFXLE9BQU8sS0FBRyxjQUFZLE9BQU8sS0FBRyxZQUFVLE9BQU8sS0FBRyxZQUFVLE9BQU8sS0FBRyxZQUFVLE9BQU8sS0FBRyxFQUFFLGVBQWEsU0FBTyxJQUFFLEVBQUUsSUFBSSxLQUFHRCxJQUFFLE1BQUssR0FBRSxNQUFLLE1BQUssSUFBSSxJQUFFLEVBQUUsQ0FBQyxJQUFFLElBQUUsRUFBRSxJQUFJLEtBQUdBLElBQUUsR0FBRSxFQUFDLFVBQVMsRUFBQyxHQUFFLE1BQUssTUFBSyxJQUFJLElBQUUsS0FBSyxNQUFJLEVBQUUsZUFBYSxFQUFFLE1BQUksSUFBRSxJQUFFLEVBQUUsSUFBSSxLQUFHQSxJQUFFLEVBQUUsTUFBSyxFQUFFLE9BQU0sRUFBRSxLQUFJLEVBQUUsTUFBSSxFQUFFLE1BQUksTUFBSyxFQUFFLEdBQUcsSUFBRSxFQUFFLElBQUksS0FBRyxHQUFFLElBQUUsSUFBRSxHQUFFLEVBQUUsS0FBRyxHQUFFLEVBQUUsTUFBSSxFQUFFLE1BQUksR0FBRSxJQUFFLE1BQUssT0FBSyxJQUFFLEVBQUUsTUFBSSxFQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsT0FBSyxNQUFLLElBQUUsRUFBRSxRQUFNLEVBQUUsT0FBSyxLQUFJLFFBQU0sS0FBRyxRQUFNLEVBQUUsT0FBSyxNQUFJLE1BQUksSUFBRSxJQUFFLE1BQUksSUFBRSxLQUFHLE1BQUssY0FBWSxPQUFPLEVBQUUsU0FBTyxFQUFFLE9BQUssTUFBSSxLQUFHLE1BQUksS0FBRyxJQUFFLElBQUUsTUFBSSxLQUFHLElBQUUsSUFBRSxPQUFLLElBQUUsSUFBRSxNQUFJLEtBQUksRUFBRSxPQUFLLE9BQUssRUFBRSxJQUFJLEtBQUc7RUFBSyxJQUFHLEdBQUUsS0FBSSxJQUFFLEdBQUUsSUFBRSxHQUFFLEtBQUksU0FBTyxJQUFFLEVBQUUsT0FBSyxNQUFJLElBQUUsRUFBRSxTQUFPLEVBQUUsT0FBSyxNQUFJLElBQUUsRUFBRSxDQUFDLElBQUcsRUFBRSxHQUFFLENBQUM7RUFBRyxPQUFPO0NBQUM7Q0FBQyxTQUFTQyxJQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7RUFBQyxJQUFJLEdBQUU7RUFBRSxJQUFHLGNBQVksT0FBTyxFQUFFLE1BQUs7R0FBQyxLQUFJLElBQUUsRUFBRSxLQUFJLElBQUUsR0FBRSxLQUFHLElBQUUsRUFBRSxRQUFPLEtBQUksRUFBRSxPQUFLLEVBQUUsR0FBRyxLQUFHLEdBQUUsSUFBRUEsSUFBRSxFQUFFLElBQUcsR0FBRSxHQUFFLENBQUM7R0FBRyxPQUFPO0VBQUM7RUFBQyxFQUFFLE9BQUssTUFBSSxNQUFJLEtBQUcsRUFBRSxRQUFNLENBQUMsRUFBRSxlQUFhLElBQUUsRUFBRSxDQUFDLElBQUcsRUFBRSxhQUFhLEVBQUUsS0FBSSxLQUFHLElBQUksSUFBRyxJQUFFLEVBQUU7RUFBSztHQUFHLElBQUUsS0FBRyxFQUFFO1NBQWtCLFFBQU0sS0FBRyxLQUFHLEVBQUU7RUFBVSxPQUFPO0NBQUM7Q0FBNkcsU0FBUyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7RUFBQyxJQUFJLEdBQUUsR0FBRSxHQUFFLElBQUUsRUFBRSxLQUFJLElBQUUsRUFBRSxNQUFLLElBQUUsRUFBRSxJQUFHLElBQUUsUUFBTSxLQUFHLE1BQUksSUFBRSxFQUFFO0VBQUssSUFBRyxTQUFPLEtBQUcsUUFBTSxLQUFHLEtBQUcsS0FBRyxFQUFFLE9BQUssS0FBRyxFQUFFLE1BQUssT0FBTztFQUFFLElBQUcsS0FBRyxJQUFFLElBQUU7UUFBTyxJQUFFLElBQUUsR0FBRSxJQUFFLElBQUUsR0FBRSxLQUFHLEtBQUcsSUFBRSxFQUFFLFNBQVEsSUFBRyxTQUFPLElBQUUsRUFBRSxJQUFFLEtBQUcsSUFBRSxNQUFJLFNBQU8sTUFBSSxJQUFFLEVBQUUsUUFBTSxLQUFHLEVBQUUsT0FBSyxLQUFHLEVBQUUsTUFBSyxPQUFPO0VBQUE7RUFBRSxPQUFNO0NBQUU7Q0FBQyxTQUFTQyxJQUFFLEdBQUUsR0FBRSxHQUFFO0VBQUMsT0FBSyxFQUFFLEtBQUcsRUFBRSxZQUFZLEdBQUUsUUFBTSxJQUFFLEtBQUcsQ0FBQyxJQUFFLEVBQUUsS0FBRyxRQUFNLElBQUUsS0FBRyxZQUFVLE9BQU8sS0FBRyxFQUFFLEtBQUssQ0FBQyxJQUFFLElBQUUsSUFBRTtDQUFJO0NBQUMsU0FBUyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtFQUFDLElBQUksR0FBRTtFQUFFLEdBQUUsSUFBRyxXQUFTLEdBQUUsSUFBRyxZQUFVLE9BQU8sR0FBRSxFQUFFLE1BQU0sVUFBUTtPQUFNO0dBQUMsSUFBRyxZQUFVLE9BQU8sTUFBSSxFQUFFLE1BQU0sVUFBUSxJQUFFLEtBQUksR0FBRSxLQUFJLEtBQUssR0FBRSxLQUFHLEtBQUssS0FBR0EsSUFBRSxFQUFFLE9BQU0sR0FBRSxFQUFFO0dBQUUsSUFBRyxHQUFFLEtBQUksS0FBSyxHQUFFLEtBQUcsRUFBRSxNQUFJLEVBQUUsTUFBSUEsSUFBRSxFQUFFLE9BQU0sR0FBRSxFQUFFLEVBQUU7RUFBQztPQUFNLElBQUcsT0FBSyxFQUFFLE1BQUksT0FBSyxFQUFFLElBQUcsSUFBRSxNQUFJLElBQUUsRUFBRSxRQUFRUixLQUFFLElBQUksSUFBRyxJQUFFLEVBQUUsWUFBWSxHQUFFLElBQUUsS0FBSyxLQUFHLGdCQUFjLEtBQUcsZUFBYSxJQUFFLEVBQUUsTUFBTSxDQUFDLElBQUUsRUFBRSxNQUFNLENBQUMsR0FBRSxFQUFFLE1BQUksRUFBRSxJQUFFLENBQUMsSUFBRyxFQUFFLEVBQUUsSUFBRSxLQUFHLEdBQUUsSUFBRSxJQUFFLEVBQUVELE9BQUcsRUFBRUEsUUFBSSxFQUFFQSxPQUFHLEdBQUUsRUFBRSxpQkFBaUIsR0FBRSxJQUFFRyxNQUFFRCxLQUFFLENBQUMsS0FBRyxFQUFFLG9CQUFvQixHQUFFLElBQUVDLE1BQUVELEtBQUUsQ0FBQztPQUFNO0dBQUMsSUFBRyxnQ0FBOEIsR0FBRSxJQUFFLEVBQUUsUUFBUSxlQUFjLEdBQUcsRUFBRSxRQUFRLFVBQVMsR0FBRztRQUFPLElBQUcsV0FBUyxLQUFHLFlBQVUsS0FBRyxVQUFRLEtBQUcsVUFBUSxLQUFHLFVBQVEsS0FBRyxjQUFZLEtBQUcsY0FBWSxLQUFHLGFBQVcsS0FBRyxhQUFXLEtBQUcsVUFBUSxLQUFHLGFBQVcsS0FBRyxLQUFLLEdBQUUsSUFBRztJQUFDLEVBQUUsS0FBRyxRQUFNLElBQUUsS0FBRztJQUFFLE1BQU07R0FBQyxTQUFPLEdBQUUsQ0FBQztHQUFDLGNBQVksT0FBTyxNQUFJLFFBQU0sS0FBRyxDQUFDLE1BQUksS0FBRyxPQUFLLEVBQUUsS0FBRyxFQUFFLGdCQUFnQixDQUFDLElBQUUsRUFBRSxhQUFhLEdBQUUsYUFBVyxLQUFHLEtBQUcsSUFBRSxLQUFHLENBQUM7RUFBRTtDQUFDO0NBQUMsU0FBUyxFQUFFLEdBQUU7RUFBQyxPQUFPLFNBQVMsR0FBRTtHQUFDLElBQUcsS0FBSyxHQUFFO0lBQUMsSUFBSSxJQUFFLEtBQUssRUFBRSxFQUFFLE9BQUs7SUFBRyxJQUFHLFFBQU0sRUFBRUgsTUFBRyxFQUFFQSxPQUFHO1NBQVMsSUFBRyxFQUFFQSxPQUFHLEVBQUVDLE1BQUc7SUFBTyxPQUFPLEVBQUVULElBQUUsUUFBTUEsSUFBRSxNQUFNLENBQUMsSUFBRSxDQUFDO0dBQUM7RUFBQztDQUFDO0NBQUMsU0FBUyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7RUFBQyxJQUFJLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLElBQUUsRUFBRTtFQUFLLElBQUcsS0FBSyxNQUFJLEVBQUUsYUFBWSxPQUFPO0VBQUssTUFBSSxFQUFFLFFBQU0sSUFBRSxDQUFDLEVBQUUsS0FBRyxFQUFFLE1BQUssSUFBRSxDQUFDLElBQUUsRUFBRSxNQUFJLEVBQUUsR0FBRyxLQUFJLElBQUVBLElBQUUsUUFBTSxFQUFFLENBQUM7RUFBRSxHQUFFLElBQUcsY0FBWSxPQUFPLEdBQUUsSUFBRztHQUFDLElBQUcsSUFBRSxFQUFFLE9BQU0sSUFBRSxFQUFFLGFBQVcsRUFBRSxVQUFVLFFBQU8sS0FBRyxJQUFFLEVBQUUsZ0JBQWMsRUFBRSxFQUFFLE1BQUssSUFBRSxJQUFFLElBQUUsRUFBRSxNQUFNLFFBQU0sRUFBRSxLQUFHLEdBQUUsRUFBRSxNQUFJLElBQUUsQ0FBQyxJQUFFLEVBQUUsTUFBSSxFQUFFLEtBQUssS0FBRyxFQUFFLE9BQUssSUFBRSxFQUFFLE1BQUksSUFBRSxJQUFJLEVBQUUsR0FBRSxDQUFDLEtBQUcsRUFBRSxNQUFJLElBQUUsSUFBSSxFQUFFLEdBQUUsQ0FBQyxHQUFFLEVBQUUsY0FBWSxHQUFFLEVBQUUsU0FBTyxJQUFHLEtBQUcsRUFBRSxJQUFJLENBQUMsR0FBRSxFQUFFLFVBQVEsRUFBRSxRQUFNLENBQUMsSUFBRyxFQUFFLE1BQUksR0FBRSxJQUFFLEVBQUUsTUFBSSxDQUFDLEdBQUUsRUFBRSxNQUFJLENBQUMsR0FBRSxFQUFFLE1BQUksQ0FBQyxJQUFHLEtBQUcsUUFBTSxFQUFFLFFBQU0sRUFBRSxNQUFJLEVBQUUsUUFBTyxLQUFHLFFBQU0sRUFBRSw2QkFBMkIsRUFBRSxPQUFLLEVBQUUsVUFBUSxFQUFFLE1BQUljLElBQUUsQ0FBQyxHQUFFLEVBQUUsR0FBRyxJQUFHQSxJQUFFLEVBQUUsS0FBSSxFQUFFLHlCQUF5QixHQUFFLEVBQUUsR0FBRyxDQUFDLElBQUcsSUFBRSxFQUFFLE9BQU0sSUFBRSxFQUFFLE9BQU0sRUFBRSxNQUFJLEdBQUUsR0FBRSxLQUFHLFFBQU0sRUFBRSw0QkFBMEIsUUFBTSxFQUFFLHNCQUFvQixFQUFFLG1CQUFtQixHQUFFLEtBQUcsUUFBTSxFQUFFLHFCQUFtQixFQUFFLElBQUksS0FBSyxFQUFFLGlCQUFpQjtRQUFNO0lBQUMsSUFBRyxLQUFHLFFBQU0sRUFBRSw0QkFBMEIsTUFBSSxLQUFHLFFBQU0sRUFBRSw2QkFBMkIsRUFBRSwwQkFBMEIsR0FBRSxDQUFDLEdBQUUsRUFBRSxPQUFLLEVBQUUsT0FBSyxDQUFDLEVBQUUsT0FBSyxRQUFNLEVBQUUseUJBQXVCLENBQUMsTUFBSSxFQUFFLHNCQUFzQixHQUFFLEVBQUUsS0FBSSxDQUFDLEdBQUU7S0FBQyxFQUFFLE9BQUssRUFBRSxRQUFNLEVBQUUsUUFBTSxHQUFFLEVBQUUsUUFBTSxFQUFFLEtBQUksRUFBRSxNQUFJLENBQUMsSUFBRyxFQUFFLE1BQUksRUFBRSxLQUFJLEVBQUUsTUFBSSxFQUFFLEtBQUksRUFBRSxJQUFJLEtBQUssU0FBUyxHQUFFO01BQUMsTUFBSSxFQUFFLEtBQUc7S0FBRSxDQUFDLEdBQUVELElBQUUsS0FBSyxNQUFNLEVBQUUsS0FBSSxFQUFFLEdBQUcsR0FBRSxFQUFFLE1BQUksQ0FBQyxHQUFFLEVBQUUsSUFBSSxVQUFRLEVBQUUsS0FBSyxDQUFDO0tBQUUsTUFBTTtJQUFDO0lBQUMsUUFBTSxFQUFFLHVCQUFxQixFQUFFLG9CQUFvQixHQUFFLEVBQUUsS0FBSSxDQUFDLEdBQUUsS0FBRyxRQUFNLEVBQUUsc0JBQW9CLEVBQUUsSUFBSSxLQUFLLFdBQVU7S0FBQyxFQUFFLG1CQUFtQixHQUFFLEdBQUUsQ0FBQztJQUFDLENBQUM7R0FBQztHQUFDLElBQUcsRUFBRSxVQUFRLEdBQUUsRUFBRSxRQUFNLEdBQUUsRUFBRSxNQUFJLEdBQUUsRUFBRSxNQUFJLENBQUMsR0FBRSxJQUFFYixJQUFFLEtBQUksSUFBRSxHQUFFLEdBQUUsRUFBRSxRQUFNLEVBQUUsS0FBSSxFQUFFLE1BQUksQ0FBQyxHQUFFLEtBQUcsRUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFNLEVBQUUsT0FBTSxFQUFFLE9BQU8sR0FBRWEsSUFBRSxLQUFLLE1BQU0sRUFBRSxLQUFJLEVBQUUsR0FBRyxHQUFFLEVBQUUsTUFBSSxDQUFDO1FBQU87SUFBRyxFQUFFLE1BQUksQ0FBQyxHQUFFLEtBQUcsRUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFNLEVBQUUsT0FBTSxFQUFFLE9BQU8sR0FBRSxFQUFFLFFBQU0sRUFBRTtVQUFVLEVBQUUsT0FBSyxFQUFFLElBQUU7R0FBSSxFQUFFLFFBQU0sRUFBRSxLQUFJLFFBQU0sRUFBRSxvQkFBa0IsSUFBRUMsSUFBRUEsSUFBRSxDQUFDLEdBQUUsQ0FBQyxHQUFFLEVBQUUsZ0JBQWdCLENBQUMsSUFBRyxLQUFHLENBQUMsS0FBRyxRQUFNLEVBQUUsNEJBQTBCLElBQUUsRUFBRSx3QkFBd0IsR0FBRSxDQUFDLElBQUcsSUFBRSxRQUFNLEtBQUcsRUFBRSxTQUFPLEtBQUcsUUFBTSxFQUFFLE1BQUksRUFBRSxFQUFFLE1BQU0sUUFBUSxJQUFFLEdBQUUsSUFBRSxFQUFFLEdBQUUsRUFBRSxDQUFDLElBQUUsSUFBRSxDQUFDLENBQUMsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxHQUFFLEVBQUUsT0FBSyxFQUFFLEtBQUksRUFBRSxPQUFLLE1BQUssRUFBRSxJQUFJLFVBQVEsRUFBRSxLQUFLLENBQUMsR0FBRSxNQUFJLEVBQUUsTUFBSSxFQUFFLEtBQUc7RUFBSyxTQUFPLEdBQUU7R0FBQyxJQUFHLEVBQUUsTUFBSSxNQUFLLEtBQUcsUUFBTSxHQUFFLElBQUcsRUFBRSxNQUFLO0lBQUMsS0FBSSxFQUFFLE9BQUssSUFBRSxNQUFJLEtBQUksS0FBRyxLQUFHLEVBQUUsWUFBVSxFQUFFLGNBQWEsSUFBRSxFQUFFO0lBQVksRUFBRSxFQUFFLFFBQVEsQ0FBQyxLQUFHLE1BQUssRUFBRSxNQUFJO0dBQUMsT0FBSztJQUFDLEtBQUksSUFBRSxFQUFFLFFBQU8sTUFBSyxFQUFFLEVBQUUsRUFBRTtJQUFFLElBQUUsQ0FBQztHQUFDO1FBQU0sRUFBRSxNQUFJLEVBQUUsS0FBSSxFQUFFLE1BQUksRUFBRSxLQUFJLEVBQUUsUUFBTUssSUFBRSxDQUFDO0dBQUUsSUFBRSxJQUFJLEdBQUUsR0FBRSxDQUFDO0VBQUM7T0FBTSxRQUFNLEtBQUcsRUFBRSxPQUFLLEVBQUUsT0FBSyxFQUFFLE1BQUksRUFBRSxLQUFJLEVBQUUsTUFBSSxFQUFFLE9BQUssSUFBRSxFQUFFLE1BQUksRUFBRSxFQUFFLEtBQUksR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0VBQUUsUUFBTyxJQUFFbkIsSUFBRSxXQUFTLEVBQUUsQ0FBQyxHQUFFLE1BQUksRUFBRSxNQUFJLEtBQUssSUFBRTtDQUFDO0NBQUMsU0FBU21CLElBQUUsR0FBRTtFQUFDLE1BQUksRUFBRSxRQUFNLEVBQUUsSUFBSSxNQUFJLENBQUMsSUFBRyxFQUFFLE9BQUssRUFBRSxJQUFJLEtBQUtBLEdBQUM7Q0FBRTtDQUFDLFNBQVMsRUFBRSxHQUFFLEdBQUUsR0FBRTtFQUFDLEtBQUksSUFBSSxJQUFFLEdBQUUsSUFBRSxFQUFFLFFBQU8sS0FBSSxFQUFFLEVBQUUsSUFBRyxFQUFFLEVBQUUsSUFBRyxFQUFFLEVBQUUsRUFBRTtFQUFFLElBQUUsT0FBS25CLElBQUUsSUFBSSxHQUFFLENBQUMsR0FBRSxFQUFFLEtBQUssU0FBUyxHQUFFO0dBQUMsSUFBRztJQUFDLElBQUUsRUFBRSxLQUFJLEVBQUUsTUFBSSxDQUFDLEdBQUUsRUFBRSxLQUFLLFNBQVMsR0FBRTtLQUFDLEVBQUUsS0FBSyxDQUFDO0lBQUMsQ0FBQztHQUFDLFNBQU8sR0FBRTtJQUFDLElBQUUsSUFBSSxHQUFFLEVBQUUsR0FBRztHQUFDO0VBQUMsQ0FBQztDQUFDO0NBQUMsU0FBUyxFQUFFLEdBQUU7RUFBQyxPQUFNLFlBQVUsT0FBTyxLQUFHLFFBQU0sS0FBRyxFQUFFLE1BQUks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QUcsS0FBRyxFQUFFLE1BQUksRUFBRSxHQUFFLEdBQUUsR0FBRSxFQUFFLElBQUcsQ0FBQztFQUFFO0VBQUMsT0FBTztDQUFDO0NBQUMsU0FBUyxFQUFFLEdBQUUsR0FBRSxHQUFFO0VBQUMsSUFBRztHQUFDLElBQUcsY0FBWSxPQUFPLEdBQUU7SUFBQyxJQUFJLElBQUUsY0FBWSxPQUFPLEVBQUU7SUFBSSxLQUFHLEVBQUUsSUFBSSxHQUFFLEtBQUcsUUFBTSxNQUFJLEVBQUUsTUFBSSxFQUFFLENBQUM7R0FBRSxPQUFNLEVBQUUsVUFBUTtFQUFDLFNBQU8sR0FBRTtHQUFDLElBQUUsSUFBSSxHQUFFLENBQUM7RUFBQztDQUFDO0NBQUMsU0FBUyxFQUFFLEdBQUUsR0FBRSxHQUFFO0VBQUMsSUFBSSxHQUFFO0VBQUUsSUFBR0EsSUFBRSxXQUFTQSxJQUFFLFFBQVEsQ0FBQyxJQUFHLElBQUUsRUFBRSxTQUFPLEVBQUUsV0FBUyxFQUFFLFdBQVMsRUFBRSxPQUFLLEVBQUUsR0FBRSxNQUFLLENBQUMsSUFBRyxTQUFPLElBQUUsRUFBRSxNQUFLO0dBQUMsSUFBRyxFQUFFLHNCQUFxQixJQUFHO0lBQUMsRUFBRSxxQkFBcUI7R0FBQyxTQUFPLEdBQUU7SUFBQyxJQUFFLElBQUksR0FBRSxDQUFDO0dBQUM7R0FBQyxFQUFFLE9BQUssRUFBRSxNQUFJO0VBQUk7RUFBQyxJQUFHLElBQUUsRUFBRSxLQUFJLEtBQUksSUFBRSxHQUFFLElBQUUsRUFBRSxRQUFPLEtBQUksRUFBRSxNQUFJLEVBQUUsRUFBRSxJQUFHLEdBQUUsS0FBRyxjQUFZLE9BQU8sRUFBRSxJQUFJO0VBQUUsS0FBRyxFQUFFLEVBQUUsR0FBRyxHQUFFLEVBQUUsTUFBSSxFQUFFLEtBQUcsRUFBRSxNQUFJLEtBQUs7Q0FBQztDQUFDLFNBQVMsRUFBRSxHQUFFLEdBQUUsR0FBRTtFQUFDLE9BQU8sS0FBSyxZQUFZLEdBQUUsQ0FBQztDQUFDO0NBQUMsU0FBUyxFQUFFLEdBQUUsR0FBRSxHQUFFO0VBQUMsSUFBSSxHQUFFLEdBQUUsR0FBRTtF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QUssTUFBSSxDQUFDLEdBQUUsS0FBRyxLQUFLLElBQUksS0FBSyxDQUFDLEdBQUUsRUFBRSxJQUFJO0NBQUUsR0FBRSxFQUFFLFVBQVUsU0FBTyxHQUFFLE1BQUUsQ0FBQyxHQUFFLE1BQUUsY0FBWSxPQUFPLFVBQVEsUUFBUSxVQUFVLEtBQUssS0FBSyxRQUFRLFFBQVEsQ0FBQyxJQUFFLFlBQVcsTUFBRSxTQUFTLEdBQUUsR0FBRTtFQUFDLE9BQU8sRUFBRSxJQUFJLE1BQUksRUFBRSxJQUFJO0NBQUcsR0FBRSxFQUFFLE1BQUksR0FBRSxNQUFFLEtBQUssT0FBTyxFQUFFLFNBQVMsQ0FBQyxHQUFFLE1BQUUsUUFBTVAsS0FBRSxNQUFFLFFBQU1BLEtBQUUsTUFBRSwrQkFBOEIsSUFBRSxHQUFFLE1BQUUsRUFBRSxDQUFDLENBQUMsR0FBRSxNQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUUsSUFBRTs7O0NDQTNtVyxJQUFJLEdBQUUsR0FBRWEsS0FBRUMsS0FBRUMsTUFBRSxHQUFFQyxNQUFFLENBQUMsR0FBRSxJQUFFQyxLQUFFLElBQUUsRUFBRSxLQUFJLElBQUUsRUFBRSxLQUFJLElBQUUsRUFBRSxRQUFPLElBQUUsRUFBRSxLQUFJLElBQUUsRUFBRSxTQUFRLElBQUUsRUFBRTtDQUFHLFNBQVMsRUFBRSxHQUFFLEdBQUU7RUFBQyxFQUFFLE9BQUssRUFBRSxJQUFJLEdBQUUsR0FBRUYsT0FBRyxDQUFDLEdBQUUsTUFBRTtFQUFFLElBQUksSUFBRSxFQUFFLFFBQU0sRUFBRSxNQUFJO0dBQUMsSUFBRyxDQUFDO0dBQUUsS0FBSSxDQUFDO0VBQUM7RUFBRyxPQUFPLEtBQUcsRUFBRSxHQUFHLFVBQVEsRUFBRSxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUUsRUFBRSxHQUFHO0NBQUU7Q0FBeXlDLFNBQVMsRUFBRSxHQUFFO0VBQUMsSUFBSSxJQUFFLEVBQUUsUUFBUSxFQUFFLE1BQUssSUFBRSxFQUFFLEtBQUksQ0FBQztFQUFFLE9BQU8sRUFBRSxJQUFFLEdBQUUsS0FBUyxFQUFFLE9BQUssRUFBRSxLQUFHLENBQUMsR0FBRSxFQUFFLElBQUksQ0FBQyxJQUFHLEVBQUUsTUFBTSxTQUFPLEVBQUU7Q0FBRTtDQUE2WCxTQUFTLElBQUc7RUFBQyxLQUFJLElBQUksR0FBRSxJQUFFQyxJQUFFLE1BQU0sSUFBRztHQUFDLElBQUksSUFBRSxFQUFFO0dBQUksSUFBRyxFQUFFLE9BQUssR0FBRSxJQUFHO0lBQUMsRUFBRSxJQUFJLEtBQUssQ0FBQyxHQUFFLEVBQUUsSUFBSSxLQUFLLENBQUMsR0FBRSxFQUFFLE1BQUksQ0FBQztHQUFDLFNBQU8sR0FBRTtJQUFDLEVBQUUsTUFBSSxDQUFDLEdBQUUsRUFBRSxJQUFJLEdBQUUsRUFBRSxHQUFHO0dBQUM7RUFBQztDQUFDO0NBQUMsRUFBRSxNQUFJLFNBQVMsR0FBRTtFQUFDLElBQUUsTUFBSyxLQUFHLEVBQUUsQ0FBQztDQUFDLEdBQUUsRUFBRSxLQUFHLFNBQVMsR0FBRSxHQUFFO0VBQUMsS0FBRyxFQUFFLE9BQUssRUFBRSxJQUFJLFFBQU0sRUFBRSxNQUFJLEVBQUUsSUFBSSxNQUFLLEtBQUcsRUFBRSxHQUFFLENBQUM7Q0FBQyxHQUFFLEVBQUUsTUFBSSxTQUFTLEdBQUU7RUFBQyxLQUFHLEVBQUUsQ0FBQyxHQUFFLElBQUU7RUFBRSxJQUFJLEtBQUcsSUFBRSxFQUFFLEtBQUs7RUFBSSxNQUFJSCxRQUFJLEtBQUcsRUFBRSxNQUFJLENBQUMsR0FBRSxFQUFFLE1BQUksQ0FBQyxHQUFFLEVBQUUsR0FBRyxLQUFLLFNBQVMsR0FBRTtHQUFDLEVBQUUsUUFBTSxFQUFFLEtBQUcsRUFBRSxNQUFLLEVBQUUsSUFBRSxFQUFFLE1BQUksS0FBSztFQUFDLENBQUMsTUFBSSxFQUFFLElBQUksS0FBSyxDQUFDLEdBQUUsRUFBRSxJQUFJLEtBQUssQ0FBQyxHQUFFLEVBQUUsTUFBSSxDQUFDLEdBQUUsSUFBRSxLQUFJLE1BQUU7Q0FBQyxHQUFFLEVBQUUsU0FBTyxTQUFTLEdBQUU7RUFBQyxLQUFHLEVBQUUsQ0FBQztFQUFFLElBQUksSUFBRSxFQUFFO0VBQUksS0FBRyxFQUFFLFFBQU0sRUFBRSxJQUFJLElBQUksV0FBUyxNQUFJRyxJQUFFLEtBQUssQ0FBQyxLQUFHRixRQUFJLEVBQUUsMkJBQXlCLE1BQUUsRUFBRSwwQkFBd0IsR0FBRyxDQUFDLElBQUcsRUFBRSxJQUFJLEdBQUcsS0FBSyxTQUFTLEdBQUU7R0FBQyxFQUFFLE1BQUksRUFBRSxNQUFJLEVBQUUsSUFBRyxFQUFFLElBQUUsS0FBSztFQUFDLENBQUMsSUFBRyxNQUFFLElBQUU7Q0FBSSxHQUFFLEVBQUUsTUFBSSxTQUFTLEdBQUUsR0FBRTtFQUFDLEVBQUUsS0FBSyxTQUFTLEdBQUU7R0FBQyxJQUFHO0lBQUMsRUFBRSxJQUFJLEtBQUssQ0FBQyxHQUFFLEVBQUUsTUFBSSxFQUFFLElBQUksT0FBTyxTQUFTLEdBQUU7S0FBQyxPQUFNLENBQUMsRUFBRSxNQUFJLEVBQUUsQ0FBQztJQUFDLENBQUM7R0FBQyxTQUFPLEdBQUU7SUFBQyxFQUFFLEtBQUssU0FBUyxHQUFFO0tBQUMsRUFBRSxRQUFNLEVBQUUsTUFBSSxDQUFDO0lBQUUsQ0FBQyxHQUFFLElBQUUsQ0FBQyxHQUFFLEVBQUUsSUFBSSxHQUFFLEVBQUUsR0FBRztHQUFDO0VBQUMsQ0FBQyxHQUFFLEtBQUcsRUFBRSxHQUFFLENBQUM7Q0FBQyxHQUFFLEVBQUUsVUFBUSxTQUFTLEdBQUU7RUFBQyxLQUFHLEVBQUUsQ0FBQztFQUFFLElBQUksR0FBRSxJQUFFLEVBQUU7RUFBSSxLQUFHLEVBQUUsUUFBTSxFQUFFLElBQUksR0FBRyxLQUFLLFNBQVMsR0FBRTtHQUFDLElBQUc7SUFBQyxFQUFFLENBQUM7R0FBQyxTQUFPLEdBQUU7SUFBQyxJQUFFO0dBQUM7RUFBQyxDQUFDLEdBQUUsRUFBRSxNQUFJLEtBQUssR0FBRSxLQUFHLEVBQUUsSUFBSSxHQUFFLEVBQUUsR0FBRztDQUFFO0NBQUUsSUFBSSxJQUFFLGNBQVksT0FBTztDQUFzQixTQUFTLEVBQUUsR0FBRTtFQUFDLElBQUksR0FBRSxJQUFFLFdBQVU7R0FBQyxhQUFhLENBQUMsR0FBRSxLQUFHLHFCQUFxQixDQUFDLEdBQUUsV0FBVyxDQUFDO0VBQUMsR0FBRSxJQUFFLFdBQVcsR0FBRSxFQUFFO0VBQUUsTUFBSSxJQUFFLHNCQUFzQixDQUFDO0NBQUU7Q0FBQyxTQUFTLEVBQUUsR0FBRTtFQUFDLElBQUksSUFBRSxHQUFFLElBQUUsRUFBRTtFQUFJLGNBQVksT0FBTyxNQUFJLEVBQUUsTUFBSSxLQUFLLEdBQUUsRUFBRSxJQUFHLElBQUU7Q0FBQztDQUFDLFNBQVMsRUFBRSxHQUFFO0VBQUMsSUFBSSxJQUFFO0VBQUUsRUFBRSxNQUFJLEVBQUUsR0FBRyxHQUFFLElBQUU7Q0FBQzs7O0NDQWo1RixJQUEwRSxJQUFFO0NBQUksTUFBTTtDQUFRLFNBQVMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtFQUFDLE1BQUksSUFBRSxDQUFDO0VBQUcsSUFBSSxHQUFFLEdBQUUsSUFBRTtFQUFFLElBQUcsU0FBUSxHQUFFLEtBQUksS0FBSyxJQUFFLENBQUMsR0FBRSxHQUFFLFNBQU8sSUFBRSxJQUFFLEVBQUUsS0FBRyxFQUFFLEtBQUcsRUFBRTtFQUFHLElBQUksSUFBRTtHQUFDLE1BQUs7R0FBRSxPQUFNO0dBQUUsS0FBSTtHQUFFLEtBQUk7R0FBRSxLQUFJO0dBQUssSUFBRztHQUFLLEtBQUk7R0FBRSxLQUFJO0dBQUssS0FBSTtHQUFLLGFBQVksS0FBSztHQUFFLEtBQUksRUFBRTtHQUFFLEtBQUk7R0FBRyxLQUFJO0dBQUUsVUFBUztHQUFFLFFBQU87RUFBQztFQUFFLElBQUcsY0FBWSxPQUFPLE1BQUksSUFBRSxFQUFFLGVBQWMsS0FBSSxLQUFLLEdBQUUsS0FBSyxNQUFJLEVBQUUsT0FBSyxFQUFFLEtBQUcsRUFBRTtFQUFJLE9BQU9JLElBQUUsU0FBT0EsSUFBRSxNQUFNLENBQUMsR0FBRTtDQUFDOzs7Q0NJM3lCLElBQU0sa0JBQWtCLEVBQW9DLElBQUE7Q0FPNUQsU0FBZ0IsaUJBQWlCLEVBQUUsVUFBVSxZQUFBO0VBQzNDLE9BQU8sa0JBQUMsZ0JBQWdCLFVBQWpCO0dBQTBCLE9BQU87R0FBVztFQUFtQyxDQUFBO0NBQ3hGO0NBRUEsU0FBZ0IsY0FBQTtFQUNkLE1BQU0sV0FBVyxFQUFXLGVBQUE7eUJBRTVCLElBQUksQ0FBQyxVQUNILE1BQU0sSUFBSSxNQUFNLG9EQUFBO0VBRWxCLE9BQU87Q0FDVDs7O0NDZEEsU0FBZ0IsVUFBVSxFQUFFLFVBQVUsV0FBQTtFQUNwQyxJQUFJLFdBQVcsQ0FBQyxRQUFRLE9BQ3RCLE9BQU87RUFHVCxPQUFPLGtCQUFDLE9BQUQsRUFBTSxTQUFjLENBQUE7Q0FDN0I7OztDQ05BLFNBQWdCLGNBQWlCLEVBQUUsT0FBTyxTQUFTLFdBQUE7RUFDakQsTUFBTSxvQkFBQTtHQUdKLFFBQVEsUUFBUSxTQUZLLFFBQVEsUUFBUSxRQUFRLEtBQzFCLElBQWUsS0FBSyxRQUFRO0VBRWpEO0VBRUEsT0FDRSxrQkFBQyxVQUFEO0dBQVEsU0FBUztHQUFhLE1BQUs7YUFBbkM7SUFDRztJQUFNO0lBQUcsT0FBTyxRQUFRLEtBQUs7OztDQUdwQzs7O0NDWEEsSUFBTSxxQkFBcUI7RUFBQztFQUFLO0VBQUs7RUFBSztFQUFLO0VBQUs7O0NBQ3JELElBQU0saUJBQWlCLENBQUMsT0FBTyxJQUFBO0NBRS9CLFNBQWdCLGFBQWEsRUFBRSxnQkFBQTtFQUM3QixNQUFNLFdBQVcsWUFBQTtFQUdqQixhQUFhO0VBRWIsT0FDRSxrQkFBQyxPQUFELEVBQUEsVUFDRSxrQkFBQyxXQUFELEVBQUEsVUFBQTtHQUNFLGtCQUFDLGVBQUQ7SUFDRSxPQUFNO0lBQ04sU0FBUyxTQUFTO0lBQ2xCLFNBQVM7R0FDVixDQUFBO0dBQ0Qsa0JBQUMsZUFBRDtJQUNFLE9BQU07SUFDTixTQUFTLFNBQVM7SUFDbEIsU0FBUztHQUNWLENBQUE7R0FDRCxrQkFBQyxlQUFEO0lBQ0UsT0FBTTtJQUNOLFNBQVMsU0FBUztJQUNsQixTQUFTO0dBQ1YsQ0FBQTtHQUNELGtCQUFDLGVBQUQ7SUFDRSxPQUFNO0lBQ04sU0FBUyxTQUFTO0lBQ2xCLFNBQVM7R0FDVixDQUFBO0dBQ0Qsa0JBQUMsZUFBRDtJQUNFLE9BQU07SUFDTixTQUFTLFNBQVM7SUFDbEIsU0FBUztHQUNWLENBQUE7SUFDUSxDQUFBLEVBQ1IsQ0FBQTtDQUVUOzs7Q0MzQ0EsU0FBZ0IsV0FDZCxjQUNBLFlBQ0EsVUFBQTtFQUVBLEVBQ0Usa0JBQUMsa0JBQUQ7R0FBNEI7YUFDMUIsa0JBQUMsY0FBRCxFQUE0QixhQUFlLENBQUE7RUFDM0IsQ0FBQSxHQUNsQixVQUFBO0NBRUo7Q0FFQSxTQUFnQixZQUFZLFlBQUE7RUFDMUIsRUFBTyxNQUFNLFVBQUE7Q0FDZjs7O0NDZEEsU0FBZ0IscUJBQUE7RUFDZCxNQUFNLFVBQVUsVUFBQTtFQUNoQixRQUFRLFlBQVksU0FBUztFQUM3QixRQUFRLE1BQU0sVUFBVTs7Ozs7Ozs7OztFQVd4QixNQUFNLFlBQVksY0FBYyxZQUFZLFNBQVM7RUFDckQsSUFBSSxXQUNGLFlBQVksV0FBVyxPQUFBO0VBR3pCLE9BQU8sRUFBRSxRQUFRO0NBQ25CO0NBVUEsU0FBZ0Isb0JBQW9CLE9BQUE7RUFDbEMsTUFBTSxRQUFRLE9BQUE7Q0FDaEI7OztDQ3BCQSxlQUFzQixPQUFBO0VBRXBCLE1BQU0sZUFBZSxZQUFZLGFBQWE7RUFHOUMsTUFBTSxXQUFXLG9CQUFBO0VBQ2pCLGFBQWEsUUFBQTtFQUNiLGNBQWMsUUFBQTtFQUdkLE1BQU0sZUFBZSxJQUFPLENBQUE7RUFHNUIsTUFBTSxhQUFhLG1CQUFBO0VBQ25CLE1BQU0sZ0JBQWdCLGVBQUE7RUFDdEIsTUFBTSxxQkFBcUIsb0JBQW9CLFlBQUE7RUFHL0MsbUJBQW1CLGtCQUFBO0VBR25CLE1BQU0sa0JBQWtCLG9CQUFvQixlQUFlLFFBQUE7RUFHM0Qsc0JBQXNCLFFBQUE7RUFHdEIsTUFBTSxhQUFhLFVBQUE7RUFDbkIsTUFBTSxlQUFlLGNBQWMsWUFBWSxhQUFhO0VBQzVELElBQUksY0FDRixZQUFZLGNBQWMsVUFBQTtFQUU1QixXQUFXLGNBQWMsWUFBWSxRQUFBO0VBR3JDLGFBQUE7R0FDRSxnQkFBQTtHQUNBLGtCQUFrQixrQkFBQTtHQUNsQixvQkFBb0IsVUFBQTtHQUNwQixnQkFBZ0IsYUFBQTtHQUNoQix5QkFBQTtHQUNBLFlBQVksVUFBQTtFQUNkO0NBQ0Y7OztDQzNEQSxLQUFBLEVBQU8sTUFBTSxRQUFRLEtBQUsifQ==