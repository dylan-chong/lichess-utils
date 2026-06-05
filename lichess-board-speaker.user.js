// ==UserScript==
// @name        lichess-board-speaker
// @description Blindfold chess training tool for lichess.org
// @version     4.0.1
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
		CssClass["USERSCRIPT_DRAWINGS"] = "userscript-drawings";
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
			data[settingKey] = settings[settingKey].value;
		}
		setItem(STORAGE_KEY, JSON.stringify(data));
	}
	function setupAutoSave(settings) {
		j$2(() => {
			for (const key of Object.keys(settings)) settings[key].value;
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
	//#region src/constants/options.ts
	var Parallax = /* @__PURE__ */ function(Parallax) {
		Parallax[Parallax["Overhead"] = 0] = "Overhead";
		Parallax[Parallax["Slight_20"] = 20] = "Slight_20";
		Parallax[Parallax["Slight_30"] = 30] = "Slight_30";
		Parallax[Parallax["Medium_40"] = 40] = "Medium_40";
		Parallax[Parallax["Medium_50"] = 50] = "Medium_50";
		Parallax[Parallax["Strong_60"] = 60] = "Strong_60";
		Parallax[Parallax["Strong_65"] = 65] = "Strong_65";
		Parallax[Parallax["Strong_70"] = 70] = "Strong_70";
		Parallax[Parallax["Extreme_80"] = 80] = "Extreme_80";
		return Parallax;
	}({});
	var HoverMode = /* @__PURE__ */ function(HoverMode) {
		HoverMode["Off"] = "off";
		HoverMode["Small"] = "small";
		HoverMode["Large"] = "large";
		HoverMode["Super"] = "super";
		return HoverMode;
	}({});
	var PieceStyle = /* @__PURE__ */ function(PieceStyle) {
		PieceStyle["Icons"] = "icons";
		PieceStyle["ThreeD"] = "3d";
		PieceStyle["Checker"] = "checker";
		PieceStyle["CheckerGrey"] = "checker-grey";
		PieceStyle["Blindfold"] = "blindfold";
		return PieceStyle;
	}({});
	var Blur = /* @__PURE__ */ function(Blur) {
		Blur[Blur["None"] = 0] = "None";
		Blur[Blur["Slight_1"] = 1] = "Slight_1";
		Blur[Blur["Slight_2"] = 2] = "Slight_2";
		Blur[Blur["Medium_3"] = 3] = "Medium_3";
		Blur[Blur["Medium_4"] = 4] = "Medium_4";
		Blur[Blur["Heavy_6"] = 6] = "Heavy_6";
		Blur[Blur["Heavy_8"] = 8] = "Heavy_8";
		return Blur;
	}({});
	var BlackSegments = /* @__PURE__ */ function(BlackSegments) {
		BlackSegments["None"] = "none";
		BlackSegments["OneQuarter"] = "1/4";
		BlackSegments["Half"] = "1/2";
		BlackSegments["ThreeQuarters"] = "3/4";
		BlackSegments["All"] = "4/4";
		return BlackSegments;
	}({});
	var BlackSegmentsTiming = /* @__PURE__ */ function(BlackSegmentsTiming) {
		BlackSegmentsTiming["Rotate10s"] = "rotate-10s";
		BlackSegmentsTiming["Rotate30s"] = "rotate-30s";
		BlackSegmentsTiming["Rotate60s"] = "rotate-60s";
		BlackSegmentsTiming["DontRotate"] = "dont-rotate";
		return BlackSegmentsTiming;
	}({});
	var FlashDuration = /* @__PURE__ */ function(FlashDuration) {
		FlashDuration[FlashDuration["Ms100"] = 100] = "Ms100";
		FlashDuration[FlashDuration["Ms300"] = 300] = "Ms300";
		FlashDuration[FlashDuration["Ms500"] = 500] = "Ms500";
		FlashDuration[FlashDuration["Ms1000"] = 1e3] = "Ms1000";
		FlashDuration[FlashDuration["Ms2000"] = 2e3] = "Ms2000";
		return FlashDuration;
	}({});
	var FlashInterval = /* @__PURE__ */ function(FlashInterval) {
		FlashInterval[FlashInterval["Sec0_3"] = .3] = "Sec0_3";
		FlashInterval[FlashInterval["Sec0_5"] = .5] = "Sec0_5";
		FlashInterval[FlashInterval["Sec1"] = 1] = "Sec1";
		FlashInterval[FlashInterval["Sec3"] = 3] = "Sec3";
		FlashInterval[FlashInterval["Sec5"] = 5] = "Sec5";
		FlashInterval[FlashInterval["Sec10"] = 10] = "Sec10";
		FlashInterval[FlashInterval["Sec30"] = 30] = "Sec30";
		FlashInterval[FlashInterval["Sec60"] = 60] = "Sec60";
		return FlashInterval;
	}({});
	var PARALLAX_OPTIONS = Object.values(Parallax).filter((v) => typeof v === "number");
	var HOVER_MODE_OPTIONS = Object.values(HoverMode).filter((v) => typeof v === "string");
	var PIECE_STYLE_OPTIONS = Object.values(PieceStyle).filter((v) => typeof v === "string");
	var BLUR_OPTIONS = Object.values(Blur).filter((v) => typeof v === "number");
	var BLACK_SEGMENTS_OPTIONS = Object.values(BlackSegments).filter((v) => typeof v === "string");
	var BLACK_SEGMENTS_TIMING_OPTIONS = Object.values(BlackSegmentsTiming).filter((v) => typeof v === "string");
	var FLASH_DURATION_OPTIONS = Object.values(FlashDuration).filter((v) => typeof v === "number");
	var FLASH_INTERVAL_OPTIONS = Object.values(FlashInterval).filter((v) => typeof v === "number");
	//#endregion
	//#region src/presentation/components/ActionButton.tsx
	var buttonStyle$1 = {
		margin: "4px",
		padding: "6px 12px",
		border: "1px solid currentColor",
		borderRadius: "4px",
		backgroundColor: "transparent",
		color: "inherit",
		cursor: "pointer",
		fontSize: "14px"
	};
	function ActionButton({ label, onClick }) {
		return /* @__PURE__ */ u("button", {
			onClick,
			type: "button",
			style: buttonStyle$1,
			children: label
		});
	}
	//#endregion
	//#region src/presentation/components/ButtonRow.tsx
	function ButtonRow({ children, visible }) {
		if (visible && !visible.value) return null;
		return /* @__PURE__ */ u("div", { children });
	}
	//#endregion
	//#region src/presentation/components/ConditionalControls.tsx
	function ConditionalControls({ condition, children }) {
		if (!condition) return null;
		return /* @__PURE__ */ u("div", {
			style: { marginLeft: "16px" },
			children
		});
	}
	//#endregion
	//#region src/presentation/components/SettingButton.tsx
	var buttonStyle = {
		margin: "4px",
		padding: "6px 12px",
		border: "1px solid currentColor",
		borderRadius: "4px",
		backgroundColor: "transparent",
		color: "inherit",
		cursor: "pointer",
		fontSize: "14px"
	};
	function SettingButton({ label, setting, options }) {
		const handleClick = () => {
			setting.value = options[(options.indexOf(setting.value) + 1) % options.length];
		};
		return /* @__PURE__ */ u("button", {
			onClick: handleClick,
			type: "button",
			style: buttonStyle,
			children: [
				label,
				": ",
				String(setting.value)
			]
		});
	}
	//#endregion
	//#region src/presentation/components/SpeechButtons.tsx
	var SPEAK_RATE_OPTIONS = [
		.2,
		.5,
		.7,
		1,
		1.1,
		1.2
	];
	function SpeechButtons() {
		const settings = useSettings();
		return /* @__PURE__ */ u("div", { children: [
			/* @__PURE__ */ u(ButtonRow, { children: [
				/* @__PURE__ */ u(ActionButton, {
					label: "🔊 ♔ side",
					onClick: () => handleSpeechCommand(SpeechCommand.WK, settings)
				}),
				/* @__PURE__ */ u(ActionButton, {
					label: "🔊 ♕ side",
					onClick: () => handleSpeechCommand(SpeechCommand.WQ, settings)
				}),
				/* @__PURE__ */ u(ActionButton, {
					label: "🔊 ♚ side",
					onClick: () => handleSpeechCommand(SpeechCommand.BK, settings)
				}),
				/* @__PURE__ */ u(ActionButton, {
					label: "🔊 ♛ side",
					onClick: () => handleSpeechCommand(SpeechCommand.BQ, settings)
				})
			] }),
			/* @__PURE__ */ u(ButtonRow, { children: [
				/* @__PURE__ */ u(ActionButton, {
					label: "🔊 all pieces",
					onClick: () => handleSpeechCommand(SpeechCommand.ALL, settings)
				}),
				/* @__PURE__ */ u(ActionButton, {
					label: "🔊 w's pieces",
					onClick: () => handleSpeechCommand(SpeechCommand.WHITE, settings)
				}),
				/* @__PURE__ */ u(ActionButton, {
					label: "🔊 b's pieces",
					onClick: () => handleSpeechCommand(SpeechCommand.BLACK, settings)
				})
			] }),
			/* @__PURE__ */ u(ButtonRow, { children: [/* @__PURE__ */ u(SettingButton, {
				label: "🔊 rate",
				setting: settings.speakRate,
				options: SPEAK_RATE_OPTIONS
			}), /* @__PURE__ */ u(ActionButton, {
				label: "🔊 Stop",
				onClick: () => handleSpeechCommand(SpeechCommand.STOP, settings)
			})] })
		] });
	}
	//#endregion
	//#region src/presentation/components/ControlPanel.tsx
	var TOGGLE_OPTIONS = [false, true];
	function ControlPanel({ boardChanged }) {
		const settings = useSettings();
		boardChanged.value;
		return /* @__PURE__ */ u("div", { children: [
			/* @__PURE__ */ u(SpeechButtons, {}),
			/* @__PURE__ */ u(ButtonRow, { children: [
				/* @__PURE__ */ u(SettingButton, {
					label: "Pieces List",
					setting: settings.piecesListEnabled,
					options: TOGGLE_OPTIONS
				}),
				/* @__PURE__ */ u(ActionButton, {
					label: "Annotate Board",
					onClick: () => {
						console.log("Annotate Board clicked");
					}
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
			] }),
			/* @__PURE__ */ u(ConditionalControls, {
				condition: settings.customBoardEnabled.value,
				children: [/* @__PURE__ */ u(ButtonRow, { children: [
					/* @__PURE__ */ u(SettingButton, {
						label: "Obfuscations",
						setting: settings.obfuscationsEnabled,
						options: TOGGLE_OPTIONS
					}),
					/* @__PURE__ */ u(SettingButton, {
						label: "Parallax",
						setting: settings.parallax,
						options: PARALLAX_OPTIONS
					}),
					/* @__PURE__ */ u(SettingButton, {
						label: "Hover Mode",
						setting: settings.hoverMode,
						options: HOVER_MODE_OPTIONS
					})
				] }), /* @__PURE__ */ u(ConditionalControls, {
					condition: settings.obfuscationsEnabled.value,
					children: [/* @__PURE__ */ u(ButtonRow, { children: [
						/* @__PURE__ */ u(SettingButton, {
							label: "Piece Style",
							setting: settings.pieceStyle,
							options: PIECE_STYLE_OPTIONS
						}),
						/* @__PURE__ */ u(SettingButton, {
							label: "Blur",
							setting: settings.blur,
							options: BLUR_OPTIONS
						}),
						/* @__PURE__ */ u(SettingButton, {
							label: "Black Segments",
							setting: settings.blackSegments,
							options: BLACK_SEGMENTS_OPTIONS
						})
					] }), /* @__PURE__ */ u(ConditionalControls, {
						condition: settings.blackSegments.value !== "none",
						children: /* @__PURE__ */ u(ButtonRow, { children: /* @__PURE__ */ u(SettingButton, {
							label: "Timing",
							setting: settings.blackSegmentsTiming,
							options: BLACK_SEGMENTS_TIMING_OPTIONS
						}) })
					})]
				})]
			}),
			/* @__PURE__ */ u(ConditionalControls, {
				condition: settings.flashModeEnabled.value,
				children: /* @__PURE__ */ u(ButtonRow, { children: [/* @__PURE__ */ u(SettingButton, {
					label: "Flash Duration",
					setting: settings.flashDuration,
					options: FLASH_DURATION_OPTIONS
				}), /* @__PURE__ */ u(SettingButton, {
					label: "Flash Interval",
					setting: settings.flashInterval,
					options: FLASH_INTERVAL_OPTIONS
				})] })
			})
		] });
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGljaGVzcy1ib2FyZC1zcGVha2VyLnVzZXIuanMiLCJuYW1lcyI6WyJpIiwidCIsInMiLCJjIiwiaCIsInciLCJyIiwibyIsImYiLCJ2IiwidSIsImUiLCJkIiwiYSIsImwiLCJqIiwieSIsIl8iLCJiIiwicCIsIlMiLCJtIiwieCIsIkUiLCJsIiwidSIsInQiLCJpIiwiciIsIm8iLCJlIiwiZiIsImMiLCJhIiwicyIsInAiLCJ2IiwidyIsIm0iLCJrIiwieCIsImoiLCJ6IiwiQiIsInUiLCJpIiwibyIsImYiLCJuIiwiciJdLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9AcHJlYWN0L3NpZ25hbHMtY29yZS9kaXN0L3NpZ25hbHMtY29yZS5tb2R1bGUuanMiLCJzcmMvY29uc3RhbnRzL2RvbS50cyIsInNyYy9wbGF0Zm9ybS9kb20udHMiLCJzcmMvcHJlc2VudGF0aW9uL25vbi1wcmVhY3QtY29tcG9uZW50cy9kaXZpZGVycy50cyIsInNyYy9hcHBsaWNhdGlvbi9oYW5kbGVycy91cGRhdGVEaXZpZGVycy50cyIsInNyYy9hcHBsaWNhdGlvbi9lZmZlY3RzL29uRGl2aWRlcnMudHMiLCJzcmMvY29uc3RhbnRzL2NvbW1hbmRzLnRzIiwic3JjL2NvbnN0YW50cy9jaGVzcy50cyIsInNyYy9kb21haW4vY2hlc3MvcGllY2VHcm91cGluZy50cyIsInNyYy9kb21haW4vc3BlZWNoL3NwZWVjaFRleHQudHMiLCJzcmMvcGxhdGZvcm0vc3BlZWNoL2NvcmUudHMiLCJzcmMvcGxhdGZvcm0vc3BlZWNoL2luZGV4LnRzIiwic3JjL2RvbWFpbi9jaGVzcy9jb29yZGluYXRlcy50cyIsInNyYy9hcHBsaWNhdGlvbi9zZXJ2aWNlcy9ib2FyZFJlYWRlci9leHRyYWN0aW9uLnRzIiwic3JjL2FwcGxpY2F0aW9uL3NlcnZpY2VzL2JvYXJkUmVhZGVyL3JlYWRlci50cyIsInNyYy9hcHBsaWNhdGlvbi9oYW5kbGVycy9oYW5kbGVTcGVlY2hDb21tYW5kLnRzIiwic3JjL2FwcGxpY2F0aW9uL2lucHV0L2tleWJvYXJkSW5wdXQudHMiLCJzcmMvcGxhdGZvcm0vbXV0YXRpb25PYnNlcnZlci50cyIsInNyYy9hcHBsaWNhdGlvbi9vYnNlcnZlcnMvb2JzZXJ2ZXJTdGF0ZS50cyIsInNyYy9jb25zdGFudHMvc2V0dGluZ3MudHMiLCJzcmMvcGxhdGZvcm0vc3RvcmFnZS50cyIsInNyYy9hcHBsaWNhdGlvbi9zZXR0aW5ncy9zZXR0aW5nc1N0b3JlLnRzIiwibm9kZV9tb2R1bGVzL3ByZWFjdC9kaXN0L3ByZWFjdC5tb2R1bGUuanMiLCJub2RlX21vZHVsZXMvcHJlYWN0L2hvb2tzL2Rpc3QvaG9va3MubW9kdWxlLmpzIiwibm9kZV9tb2R1bGVzL3ByZWFjdC9qc3gtcnVudGltZS9kaXN0L2pzeFJ1bnRpbWUubW9kdWxlLmpzIiwic3JjL3ByZXNlbnRhdGlvbi9jb250ZXh0cy9TZXR0aW5nc0NvbnRleHQudHN4Iiwic3JjL2NvbnN0YW50cy9vcHRpb25zLnRzIiwic3JjL3ByZXNlbnRhdGlvbi9jb21wb25lbnRzL0FjdGlvbkJ1dHRvbi50c3giLCJzcmMvcHJlc2VudGF0aW9uL2NvbXBvbmVudHMvQnV0dG9uUm93LnRzeCIsInNyYy9wcmVzZW50YXRpb24vY29tcG9uZW50cy9Db25kaXRpb25hbENvbnRyb2xzLnRzeCIsInNyYy9wcmVzZW50YXRpb24vY29tcG9uZW50cy9TZXR0aW5nQnV0dG9uLnRzeCIsInNyYy9wcmVzZW50YXRpb24vY29tcG9uZW50cy9TcGVlY2hCdXR0b25zLnRzeCIsInNyYy9wcmVzZW50YXRpb24vY29tcG9uZW50cy9Db250cm9sUGFuZWwudHN4Iiwic3JjL3ByZXNlbnRhdGlvbi9jb21wb25lbnRzL3Jvb3QudHN4Iiwic3JjL3ByZXNlbnRhdGlvbi9ub24tcHJlYWN0LWNvbXBvbmVudHMvZmxhc2gudHMiLCJzcmMvaW5pdC50c3giLCJzcmMvbWFpbi50c3giXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGk9U3ltYm9sLmZvcihcInByZWFjdC1zaWduYWxzXCIpO2Z1bmN0aW9uIHQoKXtpZighKHM+MSkpe3ZhciBpLHQ9ITE7IWZ1bmN0aW9uKCl7dmFyIGk9YztjPXZvaWQgMDt3aGlsZSh2b2lkIDAhPT1pKXtpZihpLlMudj09PWkudilpLlMuaT1pLmk7aT1pLm99fSgpO3doaWxlKHZvaWQgMCE9PWgpe3ZhciBuPWg7aD12b2lkIDA7disrO3doaWxlKHZvaWQgMCE9PW4pe3ZhciByPW4udTtuLnU9dm9pZCAwO24uZiY9LTM7aWYoISg4Jm4uZikmJncobikpdHJ5e24uYygpfWNhdGNoKG4pe2lmKCF0KXtpPW47dD0hMH19bj1yfX12PTA7cy0tO2lmKHQpdGhyb3cgaX1lbHNlIHMtLX1mdW5jdGlvbiBuKGkpe2lmKHM+MClyZXR1cm4gaSgpO2U9Kyt1O3MrKzt0cnl7cmV0dXJuIGkoKX1maW5hbGx5e3QoKX19dmFyIHI9dm9pZCAwO2Z1bmN0aW9uIG8oaSl7dmFyIHQ9cjtyPXZvaWQgMDt0cnl7cmV0dXJuIGkoKX1maW5hbGx5e3I9dH19dmFyIGYsaD12b2lkIDAscz0wLHY9MCx1PTAsZT0wLGM9dm9pZCAwLGQ9MDtmdW5jdGlvbiBhKGkpe2lmKHZvaWQgMCE9PXIpe3ZhciB0PWkubjtpZih2b2lkIDA9PT10fHx0LnQhPT1yKXt0PXtpOjAsUzppLHA6ci5zLG46dm9pZCAwLHQ6cixlOnZvaWQgMCx4OnZvaWQgMCxyOnR9O2lmKHZvaWQgMCE9PXIucylyLnMubj10O3Iucz10O2kubj10O2lmKDMyJnIuZilpLlModCk7cmV0dXJuIHR9ZWxzZSBpZigtMT09PXQuaSl7dC5pPTA7aWYodm9pZCAwIT09dC5uKXt0Lm4ucD10LnA7aWYodm9pZCAwIT09dC5wKXQucC5uPXQubjt0LnA9ci5zO3Qubj12b2lkIDA7ci5zLm49dDtyLnM9dH1yZXR1cm4gdH19fWZ1bmN0aW9uIGwoaSx0KXt0aGlzLnY9aTt0aGlzLmk9MDt0aGlzLm49dm9pZCAwO3RoaXMudD12b2lkIDA7dGhpcy5sPTA7dGhpcy5XPW51bGw9PXQ/dm9pZCAwOnQud2F0Y2hlZDt0aGlzLlo9bnVsbD09dD92b2lkIDA6dC51bndhdGNoZWQ7dGhpcy5uYW1lPW51bGw9PXQ/dm9pZCAwOnQubmFtZX1sLnByb3RvdHlwZS5icmFuZD1pO2wucHJvdG90eXBlLmg9ZnVuY3Rpb24oKXtyZXR1cm4hMH07bC5wcm90b3R5cGUuUz1mdW5jdGlvbihpKXt2YXIgdD10aGlzLG49dGhpcy50O2lmKG4hPT1pJiZ2b2lkIDA9PT1pLmUpe2kueD1uO3RoaXMudD1pO2lmKHZvaWQgMCE9PW4pbi5lPWk7ZWxzZSBvKGZ1bmN0aW9uKCl7dmFyIGk7bnVsbD09KGk9dC5XKXx8aS5jYWxsKHQpfSl9fTtsLnByb3RvdHlwZS5VPWZ1bmN0aW9uKGkpe3ZhciB0PXRoaXM7aWYodm9pZCAwIT09dGhpcy50KXt2YXIgbj1pLmUscj1pLng7aWYodm9pZCAwIT09bil7bi54PXI7aS5lPXZvaWQgMH1pZih2b2lkIDAhPT1yKXtyLmU9bjtpLng9dm9pZCAwfWlmKGk9PT10aGlzLnQpe3RoaXMudD1yO2lmKHZvaWQgMD09PXIpbyhmdW5jdGlvbigpe3ZhciBpO251bGw9PShpPXQuWil8fGkuY2FsbCh0KX0pfX19O2wucHJvdG90eXBlLnN1YnNjcmliZT1mdW5jdGlvbihpKXt2YXIgdD10aGlzO3JldHVybiBqKGZ1bmN0aW9uKCl7dmFyIG49dC52YWx1ZSxvPXI7cj12b2lkIDA7dHJ5e2kobil9ZmluYWxseXtyPW99fSx7bmFtZTpcInN1YlwifSl9O2wucHJvdG90eXBlLnZhbHVlT2Y9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy52YWx1ZX07bC5wcm90b3R5cGUudG9TdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy52YWx1ZStcIlwifTtsLnByb3RvdHlwZS50b0pTT049ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy52YWx1ZX07bC5wcm90b3R5cGUucGVlaz1mdW5jdGlvbigpe3ZhciBpPXRoaXM7cmV0dXJuIG8oZnVuY3Rpb24oKXtyZXR1cm4gaS52YWx1ZX0pfTtPYmplY3QuZGVmaW5lUHJvcGVydHkobC5wcm90b3R5cGUsXCJ2YWx1ZVwiLHtnZXQ6ZnVuY3Rpb24oKXt2YXIgaT1hKHRoaXMpO2lmKHZvaWQgMCE9PWkpaS5pPXRoaXMuaTtyZXR1cm4gdGhpcy52fSxzZXQ6ZnVuY3Rpb24oaSl7aWYoaSE9PXRoaXMudil7aWYodj4xMDApdGhyb3cgbmV3IEVycm9yKFwiQ3ljbGUgZGV0ZWN0ZWRcIik7IWZ1bmN0aW9uKGkpe2lmKDAhPT1zJiYwPT09dilpZihpLmwhPT1lKXtpLmw9ZTtjPXtTOmksdjppLnYsaTppLmksbzpjfX19KHRoaXMpO3RoaXMudj1pO3RoaXMuaSsrO2QrKztzKys7dHJ5e2Zvcih2YXIgbj10aGlzLnQ7dm9pZCAwIT09bjtuPW4ueCluLnQuTigpfWZpbmFsbHl7dCgpfX19fSk7ZnVuY3Rpb24geShpLHQpe3JldHVybiBuZXcgbChpLHQpfWZ1bmN0aW9uIHcoaSl7Zm9yKHZhciB0PWkuczt2b2lkIDAhPT10O3Q9dC5uKWlmKHQuUy5pIT09dC5pfHwhdC5TLmgoKXx8dC5TLmkhPT10LmkpcmV0dXJuITA7cmV0dXJuITF9ZnVuY3Rpb24gXyhpKXtmb3IodmFyIHQ9aS5zO3ZvaWQgMCE9PXQ7dD10Lm4pe3ZhciBuPXQuUy5uO2lmKHZvaWQgMCE9PW4pdC5yPW47dC5TLm49dDt0Lmk9LTE7aWYodm9pZCAwPT09dC5uKXtpLnM9dDticmVha319fWZ1bmN0aW9uIGIoaSl7dmFyIHQ9aS5zLG49dm9pZCAwO3doaWxlKHZvaWQgMCE9PXQpe3ZhciByPXQucDtpZigtMT09PXQuaSl7dC5TLlUodCk7aWYodm9pZCAwIT09cilyLm49dC5uO2lmKHZvaWQgMCE9PXQubil0Lm4ucD1yfWVsc2Ugbj10O3QuUy5uPXQucjtpZih2b2lkIDAhPT10LnIpdC5yPXZvaWQgMDt0PXJ9aS5zPW59ZnVuY3Rpb24gcChpLHQpe2wuY2FsbCh0aGlzLHZvaWQgMCk7dGhpcy54PWk7dGhpcy5zPXZvaWQgMDt0aGlzLmc9ZC0xO3RoaXMuZj00O3RoaXMuVz1udWxsPT10P3ZvaWQgMDp0LndhdGNoZWQ7dGhpcy5aPW51bGw9PXQ/dm9pZCAwOnQudW53YXRjaGVkO3RoaXMubmFtZT1udWxsPT10P3ZvaWQgMDp0Lm5hbWV9cC5wcm90b3R5cGU9bmV3IGw7cC5wcm90b3R5cGUuaD1mdW5jdGlvbigpe3RoaXMuZiY9LTM7aWYoMSZ0aGlzLmYpcmV0dXJuITE7aWYoMzI9PSgzNiZ0aGlzLmYpKXJldHVybiEwO3RoaXMuZiY9LTU7aWYodGhpcy5nPT09ZClyZXR1cm4hMDt0aGlzLmc9ZDt0aGlzLmZ8PTE7aWYodGhpcy5pPjAmJiF3KHRoaXMpKXt0aGlzLmYmPS0yO3JldHVybiEwfXZhciBpPXI7dHJ5e18odGhpcyk7cj10aGlzO3ZhciB0PXRoaXMueCgpO2lmKDE2JnRoaXMuZnx8dGhpcy52IT09dHx8MD09PXRoaXMuaSl7dGhpcy52PXQ7dGhpcy5mJj0tMTc7dGhpcy5pKyt9fWNhdGNoKGkpe3RoaXMudj1pO3RoaXMuZnw9MTY7dGhpcy5pKyt9cj1pO2IodGhpcyk7dGhpcy5mJj0tMjtyZXR1cm4hMH07cC5wcm90b3R5cGUuUz1mdW5jdGlvbihpKXtpZih2b2lkIDA9PT10aGlzLnQpe3RoaXMuZnw9MzY7Zm9yKHZhciB0PXRoaXMuczt2b2lkIDAhPT10O3Q9dC5uKXQuUy5TKHQpfWwucHJvdG90eXBlLlMuY2FsbCh0aGlzLGkpfTtwLnByb3RvdHlwZS5VPWZ1bmN0aW9uKGkpe2lmKHZvaWQgMCE9PXRoaXMudCl7bC5wcm90b3R5cGUuVS5jYWxsKHRoaXMsaSk7aWYodm9pZCAwPT09dGhpcy50KXt0aGlzLmYmPS0zMztmb3IodmFyIHQ9dGhpcy5zO3ZvaWQgMCE9PXQ7dD10Lm4pdC5TLlUodCl9fX07cC5wcm90b3R5cGUuTj1mdW5jdGlvbigpe2lmKCEoMiZ0aGlzLmYpKXt0aGlzLmZ8PTY7Zm9yKHZhciBpPXRoaXMudDt2b2lkIDAhPT1pO2k9aS54KWkudC5OKCl9fTtPYmplY3QuZGVmaW5lUHJvcGVydHkocC5wcm90b3R5cGUsXCJ2YWx1ZVwiLHtnZXQ6ZnVuY3Rpb24oKXtpZigxJnRoaXMuZil0aHJvdyBuZXcgRXJyb3IoXCJDeWNsZSBkZXRlY3RlZFwiKTt2YXIgaT1hKHRoaXMpO3RoaXMuaCgpO2lmKHZvaWQgMCE9PWkpaS5pPXRoaXMuaTtpZigxNiZ0aGlzLmYpdGhyb3cgdGhpcy52O3JldHVybiB0aGlzLnZ9fSk7ZnVuY3Rpb24gZyhpLHQpe3JldHVybiBuZXcgcChpLHQpfWZ1bmN0aW9uIFMoaSl7dmFyIG49aS5tO2kubT12b2lkIDA7aWYoXCJmdW5jdGlvblwiPT10eXBlb2Ygbil7cysrO3ZhciBvPXI7cj12b2lkIDA7dHJ5e24oKX1jYXRjaCh0KXtpLmYmPS0yO2kuZnw9ODttKGkpO3Rocm93IHR9ZmluYWxseXtyPW87dCgpfX19ZnVuY3Rpb24gbShpKXtmb3IodmFyIHQ9aS5zO3ZvaWQgMCE9PXQ7dD10Lm4pdC5TLlUodCk7aS54PXZvaWQgMDtpLnM9dm9pZCAwO1MoaSl9ZnVuY3Rpb24geChpKXtpZihyIT09dGhpcyl0aHJvdyBuZXcgRXJyb3IoXCJPdXQtb2Ytb3JkZXIgZWZmZWN0XCIpO2IodGhpcyk7cj1pO3RoaXMuZiY9LTI7aWYoOCZ0aGlzLmYpbSh0aGlzKTt0KCl9ZnVuY3Rpb24gRShpLHQpe3RoaXMueD1pO3RoaXMubT12b2lkIDA7dGhpcy5zPXZvaWQgMDt0aGlzLnU9dm9pZCAwO3RoaXMuZj0zMjt0aGlzLm5hbWU9bnVsbD09dD92b2lkIDA6dC5uYW1lO2lmKGYpZi5wdXNoKHRoaXMpfUUucHJvdG90eXBlLmM9ZnVuY3Rpb24oKXt2YXIgaT10aGlzLlMoKTt0cnl7aWYoOCZ0aGlzLmYpcmV0dXJuO2lmKHZvaWQgMD09PXRoaXMueClyZXR1cm47dmFyIHQ9dGhpcy54KCk7aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgdCl0aGlzLm09dH1maW5hbGx5e2koKX19O0UucHJvdG90eXBlLlM9ZnVuY3Rpb24oKXtpZigxJnRoaXMuZil0aHJvdyBuZXcgRXJyb3IoXCJDeWNsZSBkZXRlY3RlZFwiKTt0aGlzLmZ8PTE7dGhpcy5mJj0tOTtTKHRoaXMpO18odGhpcyk7cysrO3ZhciBpPXI7cj10aGlzO3JldHVybiB4LmJpbmQodGhpcyxpKX07RS5wcm90b3R5cGUuTj1mdW5jdGlvbigpe2lmKCEoMiZ0aGlzLmYpKXt0aGlzLmZ8PTI7dGhpcy51PWg7aD10aGlzfX07RS5wcm90b3R5cGUuZD1mdW5jdGlvbigpe3RoaXMuZnw9ODtpZighKDEmdGhpcy5mKSltKHRoaXMpfTtFLnByb3RvdHlwZS5kaXNwb3NlPWZ1bmN0aW9uKCl7dGhpcy5kKCl9O2Z1bmN0aW9uIGooaSx0KXt2YXIgbj1uZXcgRShpLHQpO3RyeXtuLmMoKX1jYXRjaChpKXtuLmQoKTt0aHJvdyBpfXZhciByPW4uZC5iaW5kKG4pO3JbU3ltYm9sLmRpc3Bvc2VdPXI7cmV0dXJuIHJ9ZnVuY3Rpb24gQyhpKXtyZXR1cm4gZnVuY3Rpb24oKXt2YXIgdD1hcmd1bWVudHMscj10aGlzO3JldHVybiBuKGZ1bmN0aW9uKCl7cmV0dXJuIG8oZnVuY3Rpb24oKXtyZXR1cm4gaS5hcHBseShyLFtdLnNsaWNlLmNhbGwodCkpfSl9KX19ZnVuY3Rpb24gTygpe3ZhciBpPWY7Zj1bXTtyZXR1cm4gZnVuY3Rpb24oKXt2YXIgdD1mO2lmKGYmJmkpaT1pLmNvbmNhdChmKTtmPWk7cmV0dXJuIHR9fXZhciBrPWZ1bmN0aW9uKGkpe2Zvcih2YXIgdCBpbiBpKXt2YXIgbj1pW3RdO2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIG4paVt0XT1DKG4pO2Vsc2UgaWYoXCJvYmplY3RcIj09dHlwZW9mIG4mJm51bGwhPT1uJiYhKFwiYnJhbmRcImluIG4pKWsobil9fTtmdW5jdGlvbiBUKGkpe3JldHVybiBmdW5jdGlvbigpe3ZhciB0LG4scj1PKCk7dHJ5e249aS5hcHBseSh2b2lkIDAsW10uc2xpY2UuY2FsbChhcmd1bWVudHMpKX1jYXRjaChpKXtmPXZvaWQgMDt0aHJvdyBpfWZpbmFsbHl7dD1yKCl9ayhuKTtuW1N5bWJvbC5kaXNwb3NlXT1DKGZ1bmN0aW9uKCl7aWYodClmb3IodmFyIGk9MDtpPHQubGVuZ3RoO2krKyl0W2ldLmRpc3Bvc2UoKTt0PXZvaWQgMH0pO3JldHVybiBufX1leHBvcnR7cCBhcyBDb21wdXRlZCxFIGFzIEVmZmVjdCxsIGFzIFNpZ25hbCxDIGFzIGFjdGlvbixuIGFzIGJhdGNoLGcgYXMgY29tcHV0ZWQsVCBhcyBjcmVhdGVNb2RlbCxqIGFzIGVmZmVjdCx5IGFzIHNpZ25hbCxvIGFzIHVudHJhY2tlZH07Ly8jIHNvdXJjZU1hcHBpbmdVUkw9c2lnbmFscy1jb3JlLm1vZHVsZS5qcy5tYXBcbiIsIi8vIERPTSBzZWxlY3RvcnMgZW51bVxuZXhwb3J0IGVudW0gRG9tU2VsZWN0b3Ige1xuICBCT0FSRCA9ICdjZy1ib2FyZCcsXG4gIEJPQVJEX05PX0NVU1RPTSA9ICdjZy1ib2FyZDpub3QoLnVzZXJzY3JpcHQtY3VzdG9tLWJvYXJkKScsXG4gIENPT1JEUyA9ICdjb29yZHMnLFxuICBQSUVDRSA9ICdwaWVjZScsXG4gIENPTlRBSU5FUiA9ICdjZy1jb250YWluZXInLFxuICBLRVlCT0FSRF9NT1ZFID0gJy5rZXlib2FyZC1tb3ZlJyxcbiAgS0VZQk9BUkRfSU5QVVQgPSAnLmtleWJvYXJkLW1vdmUgaW5wdXQnLFxufVxuXG4vLyBDU1MgY2xhc3NlcyBlbnVtXG5leHBvcnQgZW51bSBDc3NDbGFzcyB7XG4gIEJMQUNLID0gJ2JsYWNrJyxcbiAgVVNFUlNDUklQVF9ESVZJREVSUyA9ICd1c2Vyc2NyaXB0LWRpdmlkZXJzJyxcbiAgVVNFUlNDUklQVF9EUkFXSU5HUyA9ICd1c2Vyc2NyaXB0LWRyYXdpbmdzJyxcbiAgVVNFUlNDUklQVF9GTEFTSCA9ICd1c2Vyc2NyaXB0LWZsYXNoLW92ZXJsYXknLFxufVxuXG4vLyBDU1MgZGlzcGxheSB2YWx1ZXMgZW51bVxuZXhwb3J0IGVudW0gQ3NzRGlzcGxheSB7XG4gIEJMT0NLID0gJ2Jsb2NrJyxcbiAgTk9ORSA9ICdub25lJyxcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBjcmVhdGVEaXYoKTogSFRNTERpdkVsZW1lbnQge1xuICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVN2Z0VsZW1lbnQodGFnOiBzdHJpbmcpOiBTVkdFbGVtZW50IHtcbiAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCB0YWcpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBxdWVyeVNlbGVjdG9yKHNlbGVjdG9yOiBzdHJpbmcpOiBFbGVtZW50IHwgbnVsbCB7XG4gIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcjogc3RyaW5nKTogTm9kZUxpc3RPZjxFbGVtZW50PiB7XG4gIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXBwZW5kQ2hpbGQocGFyZW50OiBFbGVtZW50LCBjaGlsZDogRWxlbWVudCk6IHZvaWQge1xuICBwYXJlbnQuYXBwZW5kQ2hpbGQoY2hpbGQpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVFbGVtZW50KGVsZW1lbnQ6IEVsZW1lbnQpOiB2b2lkIHtcbiAgZWxlbWVudC5yZW1vdmUoKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGVsZW1lbnQ6IEVsZW1lbnQpOiBET01SZWN0IHtcbiAgcmV0dXJuIGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdhaXRGb3JFbGVtZW50KHNlbGVjdG9yOiBzdHJpbmcpOiBQcm9taXNlPEVsZW1lbnQ+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgY29uc3QgZWxlbWVudCA9IHF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpXG4gICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgIHJlc29sdmUoZWxlbWVudClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgY29uc3QgZWxlbWVudCA9IHF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpXG4gICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICBvYnNlcnZlci5kaXNjb25uZWN0KClcbiAgICAgICAgcmVzb2x2ZShlbGVtZW50KVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmJvZHksIHtcbiAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgIHN1YnRyZWU6IHRydWUsXG4gICAgfSlcbiAgfSlcbn1cbiIsImltcG9ydCB7IENzc0NsYXNzLCBDc3NEaXNwbGF5LCBEb21TZWxlY3RvciB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy9kb20nXG5pbXBvcnQgeyBhcHBlbmRDaGlsZCwgY3JlYXRlU3ZnRWxlbWVudCwgcXVlcnlTZWxlY3RvciB9IGZyb20gJy4uLy4uL3BsYXRmb3JtL2RvbSdcblxuZXhwb3J0IGludGVyZmFjZSBEaXZpZGVyc1N0YXRlIHtcbiAgc3ZnOiBTVkdTVkdFbGVtZW50XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVEaXZpZGVycygpOiBEaXZpZGVyc1N0YXRlIHtcbiAgY29uc3QgYm9hcmQgPSBxdWVyeVNlbGVjdG9yKERvbVNlbGVjdG9yLkJPQVJEKVxuICBpZiAoIWJvYXJkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdCb2FyZCBub3QgZm91bmQnKVxuICB9XG5cbiAgY29uc3QgcmVjdCA9IGJvYXJkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gIGNvbnN0IHNpemUgPSByZWN0LndpZHRoXG5cbiAgY29uc3Qgc3ZnID0gY3JlYXRlU3ZnRWxlbWVudCgnc3ZnJykgYXMgU1ZHU1ZHRWxlbWVudFxuICBzdmcuc2V0QXR0cmlidXRlKCdjbGFzcycsIENzc0NsYXNzLlVTRVJTQ1JJUFRfRElWSURFUlMpXG4gIHN2Zy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgc2l6ZS50b1N0cmluZygpKVxuICBzdmcuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBzaXplLnRvU3RyaW5nKCkpXG4gIHN2Zy5zdHlsZS5jc3NUZXh0ID0gYFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDA7XG4gICAgbGVmdDogMDtcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICBkaXNwbGF5OiBub25lO1xuICBgXG5cbiAgLy8gVmVydGljYWwgbGluZVxuICBjb25zdCB2TGluZSA9IGNyZWF0ZVN2Z0VsZW1lbnQoJ2xpbmUnKVxuICB2TGluZS5zZXRBdHRyaWJ1dGUoJ3gxJywgKHNpemUgLyAyKS50b1N0cmluZygpKVxuICB2TGluZS5zZXRBdHRyaWJ1dGUoJ3kxJywgJzAnKVxuICB2TGluZS5zZXRBdHRyaWJ1dGUoJ3gyJywgKHNpemUgLyAyKS50b1N0cmluZygpKVxuICB2TGluZS5zZXRBdHRyaWJ1dGUoJ3kyJywgc2l6ZS50b1N0cmluZygpKVxuICB2TGluZS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsICdyZWQnKVxuICB2TGluZS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS13aWR0aCcsICcyJylcblxuICAvLyBIb3Jpem9udGFsIGxpbmVcbiAgY29uc3QgaExpbmUgPSBjcmVhdGVTdmdFbGVtZW50KCdsaW5lJylcbiAgaExpbmUuc2V0QXR0cmlidXRlKCd4MScsICcwJylcbiAgaExpbmUuc2V0QXR0cmlidXRlKCd5MScsIChzaXplIC8gMikudG9TdHJpbmcoKSlcbiAgaExpbmUuc2V0QXR0cmlidXRlKCd4MicsIHNpemUudG9TdHJpbmcoKSlcbiAgaExpbmUuc2V0QXR0cmlidXRlKCd5MicsIChzaXplIC8gMikudG9TdHJpbmcoKSlcbiAgaExpbmUuc2V0QXR0cmlidXRlKCdzdHJva2UnLCAncmVkJylcbiAgaExpbmUuc2V0QXR0cmlidXRlKCdzdHJva2Utd2lkdGgnLCAnMicpXG5cbiAgYXBwZW5kQ2hpbGQoc3ZnLCB2TGluZSlcbiAgYXBwZW5kQ2hpbGQoc3ZnLCBoTGluZSlcblxuICBhcHBlbmRDaGlsZChib2FyZCwgc3ZnKVxuXG4gIHJldHVybiB7IHN2ZyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93RGl2aWRlcnMoc3RhdGU6IERpdmlkZXJzU3RhdGUpOiB2b2lkIHtcbiAgc3RhdGUuc3ZnLnN0eWxlLmRpc3BsYXkgPSBDc3NEaXNwbGF5LkJMT0NLXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoaWRlRGl2aWRlcnMoc3RhdGU6IERpdmlkZXJzU3RhdGUpOiB2b2lkIHtcbiAgc3RhdGUuc3ZnLnN0eWxlLmRpc3BsYXkgPSBDc3NEaXNwbGF5Lk5PTkVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlc3Ryb3lEaXZpZGVycyhzdGF0ZTogRGl2aWRlcnNTdGF0ZSk6IHZvaWQge1xuICBzdGF0ZS5zdmcucmVtb3ZlKClcbn1cbiIsImltcG9ydCB7XG4gIHR5cGUgRGl2aWRlcnNTdGF0ZSxcbiAgaGlkZURpdmlkZXJzLFxuICBzaG93RGl2aWRlcnMsXG59IGZyb20gJy4uLy4uL3ByZXNlbnRhdGlvbi9ub24tcHJlYWN0LWNvbXBvbmVudHMvZGl2aWRlcnMnXG5pbXBvcnQgdHlwZSB7IFNldHRpbmdzU3RvcmUgfSBmcm9tICcuLi9zZXR0aW5ncy9zZXR0aW5nc1N0b3JlJ1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlRGl2aWRlcnMoc3RhdGU6IERpdmlkZXJzU3RhdGUsIHNldHRpbmdzOiBTZXR0aW5nc1N0b3JlKTogdm9pZCB7XG4gIGlmIChzZXR0aW5ncy5kaXZpZGVyc0VuYWJsZWQudmFsdWUpIHtcbiAgICBzaG93RGl2aWRlcnMoc3RhdGUpXG4gIH0gZWxzZSB7XG4gICAgaGlkZURpdmlkZXJzKHN0YXRlKVxuICB9XG59XG4iLCJpbXBvcnQgeyBlZmZlY3QgfSBmcm9tICdAcHJlYWN0L3NpZ25hbHMtY29yZSdcbmltcG9ydCB0eXBlIHsgRGl2aWRlcnNTdGF0ZSB9IGZyb20gJy4uLy4uL3ByZXNlbnRhdGlvbi9ub24tcHJlYWN0LWNvbXBvbmVudHMvZGl2aWRlcnMnXG5pbXBvcnQgeyB1cGRhdGVEaXZpZGVycyB9IGZyb20gJy4uL2hhbmRsZXJzL3VwZGF0ZURpdmlkZXJzJ1xuaW1wb3J0IHR5cGUgeyBTZXR0aW5nc1N0b3JlIH0gZnJvbSAnLi4vc2V0dGluZ3Mvc2V0dGluZ3NTdG9yZSdcblxuZXhwb3J0IGZ1bmN0aW9uIHNldHVwRGl2aWRlcnNFZmZlY3Qoc3RhdGU6IERpdmlkZXJzU3RhdGUsIHNldHRpbmdzOiBTZXR0aW5nc1N0b3JlKTogKCkgPT4gdm9pZCB7XG4gIHJldHVybiBlZmZlY3QoKCkgPT4ge1xuICAgIHNldHRpbmdzLmRpdmlkZXJzRW5hYmxlZC52YWx1ZVxuICAgIHVwZGF0ZURpdmlkZXJzKHN0YXRlLCBzZXR0aW5ncylcbiAgfSlcbn1cbiIsImV4cG9ydCBlbnVtIEtleWJvYXJkQ29tbWFuZCB7XG4gIFBXSyA9ICdwd2snLFxuICBQV1EgPSAncHdxJyxcbiAgUEJLID0gJ3BiaycsXG4gIFBCUSA9ICdwYnEnLFxuICBQQSA9ICdwYScsXG4gIFBXVyA9ICdwd3cnLFxuICBQQkIgPSAncGJiJyxcbiAgUFNTID0gJ3BzcycsXG59XG5cbmV4cG9ydCBlbnVtIFNwZWVjaENvbW1hbmQge1xuICBBTEwgPSAnYWxsJyxcbiAgV0hJVEUgPSAnd2hpdGUnLFxuICBCTEFDSyA9ICdibGFjaycsXG4gIFNUT1AgPSAnc3RvcCcsXG4gIFdLID0gJ3drJyxcbiAgV1EgPSAnd3EnLFxuICBCSyA9ICdiaycsXG4gIEJRID0gJ2JxJyxcbn1cblxuLy8gS2V5Ym9hcmQgdG8gc3BlZWNoIGNvbW1hbmQgbWFwcGluZ1xuZXhwb3J0IGNvbnN0IEtFWUJPQVJEX0NPTU1BTkRfTUFQID0gbmV3IE1hcChbXG4gIFtLZXlib2FyZENvbW1hbmQuUFdLLCBTcGVlY2hDb21tYW5kLldLXSxcbiAgW0tleWJvYXJkQ29tbWFuZC5QV1EsIFNwZWVjaENvbW1hbmQuV1FdLFxuICBbS2V5Ym9hcmRDb21tYW5kLlBCSywgU3BlZWNoQ29tbWFuZC5CS10sXG4gIFtLZXlib2FyZENvbW1hbmQuUEJRLCBTcGVlY2hDb21tYW5kLkJRXSxcbiAgW0tleWJvYXJkQ29tbWFuZC5QQSwgU3BlZWNoQ29tbWFuZC5BTExdLFxuICBbS2V5Ym9hcmRDb21tYW5kLlBXVywgU3BlZWNoQ29tbWFuZC5XSElURV0sXG4gIFtLZXlib2FyZENvbW1hbmQuUEJCLCBTcGVlY2hDb21tYW5kLkJMQUNLXSxcbiAgW0tleWJvYXJkQ29tbWFuZC5QU1MsIFNwZWVjaENvbW1hbmQuU1RPUF0sXG5dIGFzIGNvbnN0KVxuIiwiZXhwb3J0IGVudW0gUGxheWVyQ29sb3Ige1xuICBXSElURSA9ICd3aGl0ZScsXG4gIEJMQUNLID0gJ2JsYWNrJyxcbn1cblxuZXhwb3J0IGVudW0gUGllY2VUeXBlIHtcbiAgUEFXTiA9ICdwYXduJyxcbiAgS05JR0hUID0gJ2tuaWdodCcsXG4gIEJJU0hPUCA9ICdiaXNob3AnLFxuICBST09LID0gJ3Jvb2snLFxuICBRVUVFTiA9ICdxdWVlbicsXG4gIEtJTkcgPSAna2luZycsXG59XG5cbmV4cG9ydCBlbnVtIFF1YWRyYW50IHtcbiAgV0hJVEVfS0lORyA9ICd3aycsXG4gIFdISVRFX1FVRUVOID0gJ3dxJyxcbiAgQkxBQ0tfS0lORyA9ICdiaycsXG4gIEJMQUNLX1FVRUVOID0gJ2JxJyxcbn1cblxuLy8gSGVscGVyIGFycmF5cyBmb3IgaXRlcmF0aW9uXG5leHBvcnQgY29uc3QgUExBWUVSX0NPTE9SX1ZBTFVFUyA9IE9iamVjdC52YWx1ZXMoUGxheWVyQ29sb3IpXG5leHBvcnQgY29uc3QgUElFQ0VfVFlQRV9WQUxVRVMgPSBPYmplY3QudmFsdWVzKFBpZWNlVHlwZSlcbmV4cG9ydCBjb25zdCBRVUFEUkFOVF9WQUxVRVMgPSBPYmplY3QudmFsdWVzKFF1YWRyYW50KVxuIiwiaW1wb3J0IHsgdHlwZSBQaWVjZVR5cGUsIFBsYXllckNvbG9yLCBRdWFkcmFudCB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy9jaGVzcydcblxuZXhwb3J0IGludGVyZmFjZSBQaWVjZVBvc2l0aW9uIHtcbiAgc3F1YXJlOiBzdHJpbmdcbiAgY29sb3I6IFBsYXllckNvbG9yXG4gIHR5cGU6IFBpZWNlVHlwZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyUXVhZHJhbnQocGllY2VzOiBQaWVjZVBvc2l0aW9uW10sIHF1YWRyYW50OiBRdWFkcmFudCk6IFBpZWNlUG9zaXRpb25bXSB7XG4gIHJldHVybiBwaWVjZXMuZmlsdGVyKChwaWVjZSkgPT4ge1xuICAgIC8vIFZhbGlkYXRlIHNxdWFyZSBmb3JtYXRcbiAgICBpZiAoIXBpZWNlLnNxdWFyZSB8fCBwaWVjZS5zcXVhcmUubGVuZ3RoIDwgMikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHNxdWFyZSBmb3JtYXQ6ICR7cGllY2Uuc3F1YXJlfWApXG4gICAgfVxuXG4gICAgY29uc3QgZmlsZSA9IHBpZWNlLnNxdWFyZVswXVxuICAgIGNvbnN0IHJhbmsgPSBOdW1iZXIucGFyc2VJbnQocGllY2Uuc3F1YXJlWzFdLCAxMClcblxuICAgIC8vIFZhbGlkYXRlIGZpbGUgYW5kIHJhbmtcbiAgICBpZiAoZmlsZSA8ICdhJyB8fCBmaWxlID4gJ2gnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgZmlsZTogJHtmaWxlfWApXG4gICAgfVxuICAgIGlmIChOdW1iZXIuaXNOYU4ocmFuaykgfHwgcmFuayA8IDEgfHwgcmFuayA+IDgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCByYW5rOiAke3Jhbmt9YClcbiAgICB9XG5cbiAgICAvLyBEZXRlcm1pbmUgZmlsZSByYW5nZSAoa2luZy1zaWRlOiBlLWgsIHF1ZWVuLXNpZGU6IGEtZClcbiAgICBjb25zdCBpc0tpbmdTaWRlID0gZmlsZSA+PSAnZSdcblxuICAgIC8vIERldGVybWluZSByYW5rIHJhbmdlICh3aGl0ZTogMS00LCBibGFjazogNS04KVxuICAgIGNvbnN0IGlzV2hpdGVSYW5rcyA9IHJhbmsgPj0gMSAmJiByYW5rIDw9IDRcblxuICAgIC8vIE1hdGNoIHF1YWRyYW50XG4gICAgaWYgKHF1YWRyYW50ID09PSBRdWFkcmFudC5XSElURV9LSU5HKSByZXR1cm4gaXNLaW5nU2lkZSAmJiBpc1doaXRlUmFua3NcbiAgICBpZiAocXVhZHJhbnQgPT09IFF1YWRyYW50LldISVRFX1FVRUVOKSByZXR1cm4gIWlzS2luZ1NpZGUgJiYgaXNXaGl0ZVJhbmtzXG4gICAgaWYgKHF1YWRyYW50ID09PSBRdWFkcmFudC5CTEFDS19LSU5HKSByZXR1cm4gaXNLaW5nU2lkZSAmJiAhaXNXaGl0ZVJhbmtzXG4gICAgaWYgKHF1YWRyYW50ID09PSBRdWFkcmFudC5CTEFDS19RVUVFTikgcmV0dXJuICFpc0tpbmdTaWRlICYmICFpc1doaXRlUmFua3NcblxuICAgIHJldHVybiBmYWxzZVxuICB9KVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEdyb3VwZWRQaWVjZXMge1xuICBjb2xvcjogUGxheWVyQ29sb3JcbiAgdHlwZTogc3RyaW5nXG4gIHNxdWFyZXM6IHN0cmluZ1tdXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBncm91cEJ5Q29sb3JBbmRUeXBlKHBpZWNlczogUGllY2VQb3NpdGlvbltdKTogR3JvdXBlZFBpZWNlc1tdIHtcbiAgY29uc3QgZ3JvdXBzID0gbmV3IE1hcDxzdHJpbmcsIEdyb3VwZWRQaWVjZXM+KClcblxuICBmb3IgKGNvbnN0IHBpZWNlIG9mIHBpZWNlcykge1xuICAgIC8vIFZhbGlkYXRlIHJlcXVpcmVkIHByb3BlcnRpZXNcbiAgICBpZiAoIXBpZWNlLnNxdWFyZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQaWVjZSBtaXNzaW5nIHNxdWFyZSBwcm9wZXJ0eScpXG4gICAgfVxuICAgIGlmICghcGllY2UuY29sb3IpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUGllY2UgbWlzc2luZyBjb2xvciBwcm9wZXJ0eScpXG4gICAgfVxuICAgIGlmICghcGllY2UudHlwZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQaWVjZSBtaXNzaW5nIHR5cGUgcHJvcGVydHknKVxuICAgIH1cblxuICAgIGNvbnN0IGtleSA9IGAke3BpZWNlLmNvbG9yfS0ke3BpZWNlLnR5cGV9YFxuXG4gICAgaWYgKCFncm91cHMuaGFzKGtleSkpIHtcbiAgICAgIGdyb3Vwcy5zZXQoa2V5LCB7XG4gICAgICAgIGNvbG9yOiBwaWVjZS5jb2xvcixcbiAgICAgICAgdHlwZTogcGllY2UudHlwZSxcbiAgICAgICAgc3F1YXJlczogW10sXG4gICAgICB9KVxuICAgIH1cblxuICAgIGdyb3Vwcy5nZXQoa2V5KT8uc3F1YXJlcy5wdXNoKHBpZWNlLnNxdWFyZSlcbiAgfVxuXG4gIC8vIFNvcnQgZ3JvdXBzIGJ5IGNvbG9yICh3aGl0ZSBmaXJzdCkgdGhlbiB0eXBlXG4gIHJldHVybiBBcnJheS5mcm9tKGdyb3Vwcy52YWx1ZXMoKSkuc29ydCgoYSwgYikgPT4ge1xuICAgIGlmIChhLmNvbG9yICE9PSBiLmNvbG9yKSB7XG4gICAgICByZXR1cm4gYS5jb2xvciA9PT0gUGxheWVyQ29sb3IuV0hJVEUgPyAtMSA6IDFcbiAgICB9XG4gICAgcmV0dXJuIGEudHlwZS5sb2NhbGVDb21wYXJlKGIudHlwZSlcbiAgfSlcbn1cbiIsImltcG9ydCB7IHR5cGUgUGllY2VQb3NpdGlvbiwgZ3JvdXBCeUNvbG9yQW5kVHlwZSB9IGZyb20gJy4uL2NoZXNzL3BpZWNlR3JvdXBpbmcnXG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVF1YWRyYW50VGV4dChwaWVjZXM6IFBpZWNlUG9zaXRpb25bXSk6IHN0cmluZyB7XG4gIGlmIChwaWVjZXMubGVuZ3RoID09PSAwKSByZXR1cm4gJydcblxuICBjb25zdCBncm91cHMgPSBncm91cEJ5Q29sb3JBbmRUeXBlKHBpZWNlcylcbiAgY29uc3Qgc2VudGVuY2VzOiBzdHJpbmdbXSA9IFtdXG5cbiAgZm9yIChjb25zdCBncm91cCBvZiBncm91cHMpIHtcbiAgICBjb25zdCBjb2xvck5hbWUgPSBncm91cC5jb2xvclxuICAgIGNvbnN0IHR5cGVOYW1lID0gZ3JvdXAuc3F1YXJlcy5sZW5ndGggPiAxID8gYCR7Z3JvdXAudHlwZX1zYCA6IGdyb3VwLnR5cGVcblxuICAgIGlmIChncm91cC5zcXVhcmVzLmxlbmd0aCA+IDEpIHtcbiAgICAgIC8vIE11bHRpcGxlIHBpZWNlczogXCJ3aGl0ZSBwYXducyBvbiBhMiwgYjJcIlxuICAgICAgY29uc3Qgc3F1YXJlcyA9IGdyb3VwLnNxdWFyZXMuam9pbignLCAnKVxuICAgICAgc2VudGVuY2VzLnB1c2goYCR7Y29sb3JOYW1lfSAke3R5cGVOYW1lfSBvbiAke3NxdWFyZXN9YClcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU2luZ2xlIHBpZWNlOiBcImUxIHdoaXRlIGtpbmdcIlxuICAgICAgc2VudGVuY2VzLnB1c2goYCR7Z3JvdXAuc3F1YXJlc1swXX0gJHtjb2xvck5hbWV9ICR7Z3JvdXAudHlwZX1gKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBgJHtzZW50ZW5jZXMuam9pbignLiAnKX0uYFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVBbGxQaWVjZXNUZXh0KHBpZWNlczogUGllY2VQb3NpdGlvbltdKTogc3RyaW5nIHtcbiAgcmV0dXJuIGdlbmVyYXRlUXVhZHJhbnRUZXh0KHBpZWNlcylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlQ29sb3JUZXh0KHBpZWNlczogUGllY2VQb3NpdGlvbltdLCBjb2xvcjogJ3doaXRlJyB8ICdibGFjaycpOiBzdHJpbmcge1xuICBjb25zdCBmaWx0ZXJlZCA9IHBpZWNlcy5maWx0ZXIoKHApID0+IHAuY29sb3IgPT09IGNvbG9yKVxuICByZXR1cm4gZ2VuZXJhdGVRdWFkcmFudFRleHQoZmlsdGVyZWQpXG59XG4iLCJleHBvcnQgZnVuY3Rpb24gZ2V0U3BlZWNoU3ludGhlc2lzKCk6IFNwZWVjaFN5bnRoZXNpcyB7XG4gIHJldHVybiB3aW5kb3cuc3BlZWNoU3ludGhlc2lzXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTcGVlY2hTeW50aGVzaXNVdHRlcmFuY2UoKTogdHlwZW9mIFNwZWVjaFN5bnRoZXNpc1V0dGVyYW5jZSB7XG4gIHJldHVybiBTcGVlY2hTeW50aGVzaXNVdHRlcmFuY2Vcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNwZWFrKHN5bnRoZXNpczogU3BlZWNoU3ludGhlc2lzLCB1dHRlcmFuY2U6IFNwZWVjaFN5bnRoZXNpc1V0dGVyYW5jZSk6IHZvaWQge1xuICBzeW50aGVzaXMuc3BlYWsodXR0ZXJhbmNlKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FuY2VsKHN5bnRoZXNpczogU3BlZWNoU3ludGhlc2lzKTogdm9pZCB7XG4gIHN5bnRoZXNpcy5jYW5jZWwoKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVXR0ZXJhbmNlKFxuICBVdHRlcmFuY2VDbGFzczogdHlwZW9mIFNwZWVjaFN5bnRoZXNpc1V0dGVyYW5jZSxcbiAgdGV4dDogc3RyaW5nXG4pOiBTcGVlY2hTeW50aGVzaXNVdHRlcmFuY2Uge1xuICByZXR1cm4gbmV3IFV0dGVyYW5jZUNsYXNzKHRleHQpXG59XG4iLCJpbXBvcnQgKiBhcyBjb3JlIGZyb20gJy4vY29yZSdcblxuZXhwb3J0IGZ1bmN0aW9uIHNwZWFrVGV4dCh0ZXh0OiBzdHJpbmcsIHJhdGU6IG51bWJlcik6IHZvaWQge1xuICBjb25zdCBzeW50aGVzaXMgPSBjb3JlLmdldFNwZWVjaFN5bnRoZXNpcygpXG4gIGNvbnN0IFV0dGVyYW5jZUNsYXNzID0gY29yZS5nZXRTcGVlY2hTeW50aGVzaXNVdHRlcmFuY2UoKVxuICBjb25zdCB1dHRlcmFuY2UgPSBjb3JlLmNyZWF0ZVV0dGVyYW5jZShVdHRlcmFuY2VDbGFzcywgdGV4dClcbiAgdXR0ZXJhbmNlLnJhdGUgPSByYXRlXG4gIGNvcmUuc3BlYWsoc3ludGhlc2lzLCB1dHRlcmFuY2UpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdG9wU3BlYWtpbmcoKTogdm9pZCB7XG4gIGNvbnN0IHN5bnRoZXNpcyA9IGNvcmUuZ2V0U3BlZWNoU3ludGhlc2lzKClcbiAgY29yZS5jYW5jZWwoc3ludGhlc2lzKVxufVxuIiwiaW1wb3J0IHsgUGxheWVyQ29sb3IgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvY2hlc3MnXG5cbmV4cG9ydCBpbnRlcmZhY2UgUGl4ZWxQb3NpdGlvbiB7XG4gIHg6IG51bWJlclxuICB5OiBudW1iZXJcbn1cblxuY29uc3QgRklMRVMgPSAnYWJjZGVmZ2gnXG5cbmV4cG9ydCBmdW5jdGlvbiBwaXhlbHNUb1NxdWFyZShcbiAgcG9zaXRpb246IFBpeGVsUG9zaXRpb24sXG4gIHNxdWFyZVNpemU6IG51bWJlcixcbiAgcGxheWVyQ29sb3I6IFBsYXllckNvbG9yXG4pOiBzdHJpbmcge1xuICAvLyBDb252ZXJ0IHBpeGVscyB0byBncmlkIGluZGljZXMgKDAtNylcbiAgLy8gQWRqdXN0IGZvciBjZW50ZXItYmFzZWQgY29vcmRpbmF0ZXMgYmVmb3JlIHJvdW5kaW5nXG4gIGxldCBjb2wgPSBNYXRoLnJvdW5kKChwb3NpdGlvbi54IC0gc3F1YXJlU2l6ZSAvIDIpIC8gc3F1YXJlU2l6ZSlcbiAgbGV0IHJvdyA9IE1hdGgucm91bmQoKHBvc2l0aW9uLnkgLSBzcXVhcmVTaXplIC8gMikgLyBzcXVhcmVTaXplKVxuXG4gIC8vIENsYW1wIHRvIHZhbGlkIHJhbmdlXG4gIGNvbCA9IE1hdGgubWF4KDAsIE1hdGgubWluKDcsIGNvbCkpXG4gIHJvdyA9IE1hdGgubWF4KDAsIE1hdGgubWluKDcsIHJvdykpXG5cbiAgLy8gQ29udmVydCB0byByYW5rIGJhc2VkIG9uIHBsYXllciBjb2xvclxuICAvLyBGb3Igd2hpdGU6IHk9MCBpcyByYW5rIDgsIHkgaW5jcmVhc2VzIGdvaW5nIHRvIHJhbmsgMVxuICAvLyBGb3IgYmxhY2s6IHk9MCBpcyByYW5rIDEsIHkgaW5jcmVhc2VzIGdvaW5nIHRvIHJhbmsgOFxuICBsZXQgcmFuazogbnVtYmVyXG4gIGxldCBmaWxlOiBzdHJpbmdcblxuICBpZiAocGxheWVyQ29sb3IgPT09IFBsYXllckNvbG9yLldISVRFKSB7XG4gICAgZmlsZSA9IEZJTEVTW2NvbF1cbiAgICByYW5rID0gOCAtIHJvd1xuICB9IGVsc2Uge1xuICAgIGZpbGUgPSBGSUxFU1s3IC0gY29sXVxuICAgIHJhbmsgPSByb3cgKyAxXG4gIH1cblxuICByZXR1cm4gYCR7ZmlsZX0ke3Jhbmt9YFxufVxuXG5leHBvcnQgZnVuY3Rpb24gc3F1YXJlVG9QaXhlbHMoXG4gIHNxdWFyZTogc3RyaW5nLFxuICBzcXVhcmVTaXplOiBudW1iZXIsXG4gIHBsYXllckNvbG9yOiBQbGF5ZXJDb2xvclxuKTogUGl4ZWxQb3NpdGlvbiB7XG4gIC8vIFZhbGlkYXRlIHNxdWFyZSBmb3JtYXRcbiAgaWYgKHNxdWFyZS5sZW5ndGggPCAyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHNxdWFyZSBub3RhdGlvbjogJHtzcXVhcmV9YClcbiAgfVxuXG4gIC8vIFBhcnNlIHNxdWFyZSBub3RhdGlvblxuICBjb25zdCBmaWxlID0gc3F1YXJlWzBdXG4gIGNvbnN0IHJhbmsgPSBOdW1iZXIucGFyc2VJbnQoc3F1YXJlWzFdLCAxMClcblxuICAvLyBWYWxpZGF0ZSBmaWxlIGFuZCByYW5rXG4gIGNvbnN0IGNvbCA9IEZJTEVTLmluZGV4T2YoZmlsZSlcbiAgaWYgKGNvbCA9PT0gLTEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgZmlsZTogJHtmaWxlfWApXG4gIH1cbiAgaWYgKHJhbmsgPCAxIHx8IHJhbmsgPiA4IHx8IE51bWJlci5pc05hTihyYW5rKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCByYW5rOiAke3Jhbmt9YClcbiAgfVxuXG4gIC8vIENhbGN1bGF0ZSBwaXhlbCBwb3NpdGlvbiBiYXNlZCBvbiBwbGF5ZXIgY29sb3JcbiAgbGV0IHBpeGVsQ29sOiBudW1iZXJcbiAgbGV0IHBpeGVsUm93OiBudW1iZXJcblxuICBpZiAocGxheWVyQ29sb3IgPT09IFBsYXllckNvbG9yLldISVRFKSB7XG4gICAgLy8gRm9yIHdoaXRlOiBmaWxlcyBnbyBsZWZ0LXRvLXJpZ2h0IChhLWgpLCByYW5rcyBnbyBib3R0b20tdG8tdG9wICgxLTgpXG4gICAgLy8gU28gcmFuayAxIGlzIGF0IGJvdHRvbSAocm93IDcpLCByYW5rIDggaXMgYXQgdG9wIChyb3cgMClcbiAgICBwaXhlbENvbCA9IGNvbFxuICAgIHBpeGVsUm93ID0gOCAtIHJhbmtcbiAgfSBlbHNlIHtcbiAgICAvLyBGb3IgYmxhY2s6IGZpbGVzIGdvIHJpZ2h0LXRvLWxlZnQgKGgtYSksIHJhbmtzIGdvIHRvcC10by1ib3R0b20gKDgtMSlcbiAgICAvLyBTbyByYW5rIDggaXMgYXQgdG9wIChyb3cgMCksIHJhbmsgMSBpcyBhdCBib3R0b20gKHJvdyA3KVxuICAgIHBpeGVsQ29sID0gNyAtIGNvbFxuICAgIHBpeGVsUm93ID0gcmFuayAtIDFcbiAgfVxuXG4gIC8vIENvbnZlcnQgdG8gcGl4ZWxzIChjZW50ZXIgb2Ygc3F1YXJlKVxuICByZXR1cm4ge1xuICAgIHg6IHBpeGVsQ29sICogc3F1YXJlU2l6ZSArIHNxdWFyZVNpemUgLyAyLFxuICAgIHk6IHBpeGVsUm93ICogc3F1YXJlU2l6ZSArIHNxdWFyZVNpemUgLyAyLFxuICB9XG59XG4iLCJpbXBvcnQgeyBnZXRCb3VuZGluZ0NsaWVudFJlY3QgfSBmcm9tICcuLi8uLi8uLi9wbGF0Zm9ybS9kb20nXG5cbmV4cG9ydCBpbnRlcmZhY2UgUmF3UGllY2VEYXRhIHtcbiAgY29sb3I6IHN0cmluZ1xuICB0eXBlOiBzdHJpbmdcbiAgeDogbnVtYmVyXG4gIHk6IG51bWJlclxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEJvYXJkTWV0cmljcyB7XG4gIGJvYXJkV2lkdGg6IG51bWJlclxuICBzcXVhcmVTaXplOiBudW1iZXJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3RCb2FyZE1ldHJpY3MoYm9hcmRFbGVtZW50OiBIVE1MRWxlbWVudCk6IEJvYXJkTWV0cmljcyB7XG4gIC8vIFBhcnNlIHdpZHRoIGZyb20gc3R5bGUgYXR0cmlidXRlIHNpbmNlIGdldEJvdW5kaW5nQ2xpZW50UmVjdCBtYXkgbm90IHdvcmsgaW4gdGVzdCBlbnZpcm9ubWVudHNcbiAgY29uc3Qgd2lkdGhNYXRjaCA9IGJvYXJkRWxlbWVudC5zdHlsZS5jc3NUZXh0Lm1hdGNoKC93aWR0aDpcXHMqKFswLTkuXSspcHgvKVxuICBjb25zdCBib2FyZFdpZHRoID0gd2lkdGhNYXRjaFxuICAgID8gTnVtYmVyLnBhcnNlRmxvYXQod2lkdGhNYXRjaFsxXSlcbiAgICA6IGdldEJvdW5kaW5nQ2xpZW50UmVjdChib2FyZEVsZW1lbnQpLndpZHRoXG4gIGNvbnN0IHNxdWFyZVNpemUgPSBib2FyZFdpZHRoIC8gOFxuXG4gIHJldHVybiB7IGJvYXJkV2lkdGgsIHNxdWFyZVNpemUgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZXh0cmFjdFBpZWNlRGF0YShwaWVjZUVsZW1lbnQ6IEVsZW1lbnQsIHNxdWFyZVNpemU6IG51bWJlcik6IFJhd1BpZWNlRGF0YSB8IG51bGwge1xuICAvLyBFeHRyYWN0IGNvbG9yIGFuZCB0eXBlIGZyb20gY2xhc3NcbiAgY29uc3QgY2xhc3NlcyA9IHBpZWNlRWxlbWVudC5jbGFzc05hbWUuc3BsaXQoJyAnKVxuICBjb25zdCBjb2xvclN0ciA9IGNsYXNzZXNbMF1cbiAgY29uc3QgdHlwZVN0ciA9IGNsYXNzZXNbMV1cblxuICBpZiAoIWNvbG9yU3RyIHx8ICF0eXBlU3RyKSByZXR1cm4gbnVsbFxuXG4gIC8vIEV4dHJhY3QgcG9zaXRpb24gZnJvbSB0cmFuc2Zvcm1cbiAgY29uc3QgdHJhbnNmb3JtID0gKHBpZWNlRWxlbWVudCBhcyBIVE1MRWxlbWVudCkuc3R5bGUudHJhbnNmb3JtXG4gIGNvbnN0IG1hdGNoID0gdHJhbnNmb3JtLm1hdGNoKC90cmFuc2xhdGVcXCgoWzAtOS5dKylweCw/XFxzKihbMC05Ll0rKXB4P1xcKS8pXG4gIGlmICghbWF0Y2gpIHJldHVybiBudWxsXG5cbiAgLy8gVHJhbnNmb3JtIGdpdmVzIHRvcC1sZWZ0IGNvcm5lciwgY29udmVydCB0byBjZW50ZXJcbiAgY29uc3QgeCA9IE51bWJlci5wYXJzZUZsb2F0KG1hdGNoWzFdKSArIHNxdWFyZVNpemUgLyAyXG4gIGNvbnN0IHkgPSBOdW1iZXIucGFyc2VGbG9hdChtYXRjaFsyXSkgKyBzcXVhcmVTaXplIC8gMlxuXG4gIHJldHVybiB7XG4gICAgY29sb3I6IGNvbG9yU3RyLFxuICAgIHR5cGU6IHR5cGVTdHIsXG4gICAgeCxcbiAgICB5LFxuICB9XG59XG4iLCJpbXBvcnQgeyB0eXBlIFBpZWNlVHlwZSwgUGxheWVyQ29sb3IgfSBmcm9tICcuLi8uLi8uLi9jb25zdGFudHMvY2hlc3MnXG5pbXBvcnQgeyBDc3NDbGFzcywgRG9tU2VsZWN0b3IgfSBmcm9tICcuLi8uLi8uLi9jb25zdGFudHMvZG9tJ1xuaW1wb3J0IHsgcGl4ZWxzVG9TcXVhcmUgfSBmcm9tICcuLi8uLi8uLi9kb21haW4vY2hlc3MvY29vcmRpbmF0ZXMnXG5pbXBvcnQgdHlwZSB7IFBpZWNlUG9zaXRpb24gfSBmcm9tICcuLi8uLi8uLi9kb21haW4vY2hlc3MvcGllY2VHcm91cGluZydcbmltcG9ydCB7IHF1ZXJ5U2VsZWN0b3IgfSBmcm9tICcuLi8uLi8uLi9wbGF0Zm9ybS9kb20nXG5pbXBvcnQgeyBleHRyYWN0Qm9hcmRNZXRyaWNzLCBleHRyYWN0UGllY2VEYXRhIH0gZnJvbSAnLi9leHRyYWN0aW9uJ1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGxheWVyQ29sb3IoKTogUGxheWVyQ29sb3Ige1xuICBjb25zdCBjb29yZHMgPSBxdWVyeVNlbGVjdG9yKERvbVNlbGVjdG9yLkNPT1JEUylcbiAgcmV0dXJuIGNvb3Jkcz8uY2xhc3NMaXN0LmNvbnRhaW5zKENzc0NsYXNzLkJMQUNLKSA/IFBsYXllckNvbG9yLkJMQUNLIDogUGxheWVyQ29sb3IuV0hJVEVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlYWRQaWVjZVBvc2l0aW9ucygpOiBQaWVjZVBvc2l0aW9uW10ge1xuICBjb25zdCBib2FyZCA9IHF1ZXJ5U2VsZWN0b3IoRG9tU2VsZWN0b3IuQk9BUkRfTk9fQ1VTVE9NKVxuICBpZiAoIWJvYXJkKSByZXR1cm4gW11cblxuICBjb25zdCB7IHNxdWFyZVNpemUgfSA9IGV4dHJhY3RCb2FyZE1ldHJpY3MoYm9hcmQgYXMgSFRNTEVsZW1lbnQpXG4gIGNvbnN0IHBsYXllckNvbG9yID0gZ2V0UGxheWVyQ29sb3IoKVxuXG4gIGNvbnN0IHBpZWNlcyA9IGJvYXJkLnF1ZXJ5U2VsZWN0b3JBbGwoRG9tU2VsZWN0b3IuUElFQ0UpXG4gIGNvbnN0IHBvc2l0aW9uczogUGllY2VQb3NpdGlvbltdID0gW11cblxuICBmb3IgKGNvbnN0IHBpZWNlIG9mIHBpZWNlcykge1xuICAgIGNvbnN0IHJhd0RhdGEgPSBleHRyYWN0UGllY2VEYXRhKHBpZWNlLCBzcXVhcmVTaXplKVxuICAgIGlmICghcmF3RGF0YSkgY29udGludWVcblxuICAgIC8vIE1hcCB0byBlbnVtc1xuICAgIGNvbnN0IGNvbG9yID0gcmF3RGF0YS5jb2xvciA9PT0gJ3doaXRlJyA/IFBsYXllckNvbG9yLldISVRFIDogUGxheWVyQ29sb3IuQkxBQ0tcbiAgICBjb25zdCB0eXBlID0gcmF3RGF0YS50eXBlIGFzIFBpZWNlVHlwZVxuXG4gICAgY29uc3Qgc3F1YXJlID0gcGl4ZWxzVG9TcXVhcmUoeyB4OiByYXdEYXRhLngsIHk6IHJhd0RhdGEueSB9LCBzcXVhcmVTaXplLCBwbGF5ZXJDb2xvcilcbiAgICBwb3NpdGlvbnMucHVzaCh7IHNxdWFyZSwgY29sb3IsIHR5cGUgfSlcbiAgfVxuXG4gIHJldHVybiBwb3NpdGlvbnNcbn1cbiIsImltcG9ydCB7IFBsYXllckNvbG9yLCB0eXBlIFF1YWRyYW50IH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL2NoZXNzJ1xuaW1wb3J0IHsgU3BlZWNoQ29tbWFuZCB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy9jb21tYW5kcydcbmltcG9ydCB7IGZpbHRlclF1YWRyYW50IH0gZnJvbSAnLi4vLi4vZG9tYWluL2NoZXNzL3BpZWNlR3JvdXBpbmcnXG5pbXBvcnQge1xuICBnZW5lcmF0ZUFsbFBpZWNlc1RleHQsXG4gIGdlbmVyYXRlQ29sb3JUZXh0LFxuICBnZW5lcmF0ZVF1YWRyYW50VGV4dCxcbn0gZnJvbSAnLi4vLi4vZG9tYWluL3NwZWVjaC9zcGVlY2hUZXh0J1xuaW1wb3J0IHsgc3BlYWtUZXh0LCBzdG9wU3BlYWtpbmcgfSBmcm9tICcuLi8uLi9wbGF0Zm9ybS9zcGVlY2gnXG5pbXBvcnQgeyByZWFkUGllY2VQb3NpdGlvbnMgfSBmcm9tICcuLi9zZXJ2aWNlcy9ib2FyZFJlYWRlci9yZWFkZXInXG5pbXBvcnQgdHlwZSB7IFNldHRpbmdzU3RvcmUgfSBmcm9tICcuLi9zZXR0aW5ncy9zZXR0aW5nc1N0b3JlJ1xuXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlU3BlZWNoQ29tbWFuZChjb21tYW5kOiBzdHJpbmcsIHNldHRpbmdzOiBTZXR0aW5nc1N0b3JlKTogdm9pZCB7XG4gIGlmIChjb21tYW5kID09PSBTcGVlY2hDb21tYW5kLlNUT1ApIHtcbiAgICBzdG9wU3BlYWtpbmcoKVxuICAgIHJldHVyblxuICB9XG5cbiAgY29uc3QgcGllY2VzID0gcmVhZFBpZWNlUG9zaXRpb25zKClcblxuICBpZiAoY29tbWFuZCA9PT0gU3BlZWNoQ29tbWFuZC5BTEwpIHtcbiAgICBjb25zdCB0ZXh0ID0gZ2VuZXJhdGVBbGxQaWVjZXNUZXh0KHBpZWNlcylcbiAgICBzcGVha1RleHQodGV4dCwgc2V0dGluZ3Muc3BlYWtSYXRlLnZhbHVlKVxuICAgIHJldHVyblxuICB9XG5cbiAgaWYgKGNvbW1hbmQgPT09IFNwZWVjaENvbW1hbmQuV0hJVEUgfHwgY29tbWFuZCA9PT0gU3BlZWNoQ29tbWFuZC5CTEFDSykge1xuICAgIGNvbnN0IGNvbG9yID0gY29tbWFuZCA9PT0gU3BlZWNoQ29tbWFuZC5XSElURSA/IFBsYXllckNvbG9yLldISVRFIDogUGxheWVyQ29sb3IuQkxBQ0tcbiAgICBjb25zdCB0ZXh0ID0gZ2VuZXJhdGVDb2xvclRleHQocGllY2VzLCBjb2xvcilcbiAgICBzcGVha1RleHQodGV4dCwgc2V0dGluZ3Muc3BlYWtSYXRlLnZhbHVlKVxuICAgIHJldHVyblxuICB9XG5cbiAgLy8gUXVhZHJhbnQgY29tbWFuZHM6IHdrLCB3cSwgYmssIGJxXG4gIGNvbnN0IHF1YWRyYW50ID0gY29tbWFuZCBhcyBRdWFkcmFudFxuICBjb25zdCBmaWx0ZXJlZCA9IGZpbHRlclF1YWRyYW50KHBpZWNlcywgcXVhZHJhbnQpXG4gIGNvbnN0IHRleHQgPSBnZW5lcmF0ZVF1YWRyYW50VGV4dChmaWx0ZXJlZClcbiAgc3BlYWtUZXh0KHRleHQsIHNldHRpbmdzLnNwZWFrUmF0ZS52YWx1ZSlcbn1cbiIsImltcG9ydCB7IEtFWUJPQVJEX0NPTU1BTkRfTUFQLCB0eXBlIEtleWJvYXJkQ29tbWFuZCB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy9jb21tYW5kcydcbmltcG9ydCB7IERvbVNlbGVjdG9yIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL2RvbSdcbmltcG9ydCB7IHF1ZXJ5U2VsZWN0b3IgfSBmcm9tICcuLi8uLi9wbGF0Zm9ybS9kb20nXG5pbXBvcnQgeyBoYW5kbGVTcGVlY2hDb21tYW5kIH0gZnJvbSAnLi4vaGFuZGxlcnMvaGFuZGxlU3BlZWNoQ29tbWFuZCdcbmltcG9ydCB0eXBlIHsgU2V0dGluZ3NTdG9yZSB9IGZyb20gJy4uL3NldHRpbmdzL3NldHRpbmdzU3RvcmUnXG5cbmludGVyZmFjZSBJbnB1dEVsZW1lbnRXaXRoQ2xlYW51cCBleHRlbmRzIEhUTUxJbnB1dEVsZW1lbnQge1xuICBfX2tleWJvYXJkQ29tbWFuZENsZWFudXA/OiAoKSA9PiB2b2lkXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cEtleWJvYXJkQ29tbWFuZHMoc2V0dGluZ3M6IFNldHRpbmdzU3RvcmUpOiB2b2lkIHtcbiAgY29uc3QgaW5wdXQgPSBxdWVyeVNlbGVjdG9yKERvbVNlbGVjdG9yLktFWUJPQVJEX0lOUFVUKSBhcyBJbnB1dEVsZW1lbnRXaXRoQ2xlYW51cCB8IG51bGxcbiAgaWYgKCFpbnB1dCkgcmV0dXJuXG5cbiAgY29uc3QgaGFuZGxlSW5wdXQgPSAoZTogRXZlbnQpID0+IHtcbiAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50XG4gICAgY29uc3QgdmFsdWUgPSB0YXJnZXQudmFsdWVcblxuICAgIC8vIENoZWNrIGZvciBzcGVlY2ggY29tbWFuZHNcbiAgICBjb25zdCBjb21tYW5kID0gS0VZQk9BUkRfQ09NTUFORF9NQVAuZ2V0KHZhbHVlIGFzIEtleWJvYXJkQ29tbWFuZClcbiAgICBpZiAoY29tbWFuZCkge1xuICAgICAgaGFuZGxlU3BlZWNoQ29tbWFuZChjb21tYW5kLCBzZXR0aW5ncylcbiAgICAgIHRhcmdldC52YWx1ZSA9ICcnXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICAvLyBDaGVjayBmb3IgZHJhd2luZyBjb21tYW5kcyAoaGFuZGxlZCBlbHNld2hlcmUpXG4gICAgaWYgKHZhbHVlLnN0YXJ0c1dpdGgoJy0nKSkge1xuICAgICAgLy8gV2lsbCBiZSBoYW5kbGVkIGJ5IGRyYXdpbmcgaGFuZGxlclxuICAgICAgcmV0dXJuXG4gICAgfVxuICB9XG5cbiAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBoYW5kbGVJbnB1dClcblxuICAvLyBTdG9yZSBjbGVhbnVwIGZ1bmN0aW9uIG9uIHRoZSBlbGVtZW50IGZvciBsYXRlciByZW1vdmFsXG4gIGlucHV0Ll9fa2V5Ym9hcmRDb21tYW5kQ2xlYW51cCA9ICgpID0+IHtcbiAgICBpbnB1dC5yZW1vdmVFdmVudExpc3RlbmVyKCdpbnB1dCcsIGhhbmRsZUlucHV0KVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0ZWFyZG93bktleWJvYXJkQ29tbWFuZHMoKTogdm9pZCB7XG4gIGNvbnN0IGlucHV0ID0gcXVlcnlTZWxlY3RvcihEb21TZWxlY3Rvci5LRVlCT0FSRF9JTlBVVCkgYXMgSW5wdXRFbGVtZW50V2l0aENsZWFudXAgfCBudWxsXG4gIGlmIChpbnB1dD8uX19rZXlib2FyZENvbW1hbmRDbGVhbnVwKSB7XG4gICAgaW5wdXQuX19rZXlib2FyZENvbW1hbmRDbGVhbnVwKClcbiAgICBpbnB1dC5fX2tleWJvYXJkQ29tbWFuZENsZWFudXAgPSB1bmRlZmluZWRcbiAgfVxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU11dGF0aW9uT2JzZXJ2ZXIoY2FsbGJhY2s6IE11dGF0aW9uQ2FsbGJhY2spOiBNdXRhdGlvbk9ic2VydmVyIHtcbiAgcmV0dXJuIG5ldyBNdXRhdGlvbk9ic2VydmVyKGNhbGxiYWNrKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gb2JzZXJ2ZShcbiAgb2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXIsXG4gIHRhcmdldDogTm9kZSxcbiAgb3B0aW9uczogTXV0YXRpb25PYnNlcnZlckluaXRcbik6IHZvaWQge1xuICBvYnNlcnZlci5vYnNlcnZlKHRhcmdldCwgb3B0aW9ucylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpc2Nvbm5lY3Qob2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXIpOiB2b2lkIHtcbiAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpXG59XG4iLCJpbXBvcnQgdHlwZSB7IFNpZ25hbCB9IGZyb20gJ0BwcmVhY3Qvc2lnbmFscy1jb3JlJ1xuaW1wb3J0IHsgRG9tU2VsZWN0b3IgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvZG9tJ1xuaW1wb3J0IHsgcXVlcnlTZWxlY3RvciB9IGZyb20gJy4uLy4uL3BsYXRmb3JtL2RvbSdcbmltcG9ydCB7IGNyZWF0ZU11dGF0aW9uT2JzZXJ2ZXIsIGRpc2Nvbm5lY3QsIG9ic2VydmUgfSBmcm9tICcuLi8uLi9wbGF0Zm9ybS9tdXRhdGlvbk9ic2VydmVyJ1xuXG5leHBvcnQgaW50ZXJmYWNlIEJvYXJkT2JzZXJ2ZXJTdGF0ZSB7XG4gIG9ic2VydmVyOiBNdXRhdGlvbk9ic2VydmVyXG4gIGJvYXJkQ2hhbmdlZDogU2lnbmFsPG51bWJlcj5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUJvYXJkT2JzZXJ2ZXIoYm9hcmRDaGFuZ2VkOiBTaWduYWw8bnVtYmVyPik6IEJvYXJkT2JzZXJ2ZXJTdGF0ZSB7XG4gIGNvbnN0IG9ic2VydmVyID0gY3JlYXRlTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgYm9hcmRDaGFuZ2VkLnZhbHVlICs9IDFcbiAgfSlcblxuICByZXR1cm4geyBvYnNlcnZlciwgYm9hcmRDaGFuZ2VkIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0Qm9hcmRPYnNlcnZlcihzdGF0ZTogQm9hcmRPYnNlcnZlclN0YXRlKTogdm9pZCB7XG4gIGNvbnN0IGJvYXJkID0gcXVlcnlTZWxlY3RvcihEb21TZWxlY3Rvci5CT0FSRClcbiAgaWYgKCFib2FyZCkgcmV0dXJuXG5cbiAgb2JzZXJ2ZShzdGF0ZS5vYnNlcnZlciwgYm9hcmQsIHtcbiAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgYXR0cmlidXRlczogdHJ1ZSxcbiAgICBzdWJ0cmVlOiB0cnVlLFxuICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RvcEJvYXJkT2JzZXJ2ZXIoc3RhdGU6IEJvYXJkT2JzZXJ2ZXJTdGF0ZSk6IHZvaWQge1xuICBkaXNjb25uZWN0KHN0YXRlLm9ic2VydmVyKVxufVxuIiwiZXhwb3J0IGludGVyZmFjZSBTZXR0aW5ncyB7XG4gIHNwZWFrUmF0ZTogbnVtYmVyXG4gIHBpZWNlc0xpc3RFbmFibGVkOiBib29sZWFuXG4gIGRpdmlkZXJzRW5hYmxlZDogYm9vbGVhblxuICBjdXN0b21Cb2FyZEVuYWJsZWQ6IGJvb2xlYW5cbiAgb2JmdXNjYXRpb25zRW5hYmxlZDogYm9vbGVhblxuICBwYXJhbGxheDogbnVtYmVyXG4gIGhvdmVyTW9kZTogc3RyaW5nXG4gIHBpZWNlU3R5bGU6IHN0cmluZ1xuICBibHVyOiBudW1iZXJcbiAgYmxhY2tTZWdtZW50czogc3RyaW5nXG4gIGJsYWNrU2VnbWVudHNUaW1pbmc6IHN0cmluZ1xuICBmbGFzaE1vZGVFbmFibGVkOiBib29sZWFuXG4gIGZsYXNoRHVyYXRpb246IG51bWJlclxuICBmbGFzaEludGVydmFsOiBudW1iZXJcbn1cblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRTZXR0aW5nczogU2V0dGluZ3MgPSB7XG4gIHNwZWFrUmF0ZTogMC41LFxuICBwaWVjZXNMaXN0RW5hYmxlZDogZmFsc2UsXG4gIGRpdmlkZXJzRW5hYmxlZDogZmFsc2UsXG4gIGN1c3RvbUJvYXJkRW5hYmxlZDogZmFsc2UsXG4gIG9iZnVzY2F0aW9uc0VuYWJsZWQ6IGZhbHNlLFxuICBwYXJhbGxheDogMCxcbiAgaG92ZXJNb2RlOiAnb2ZmJyxcbiAgcGllY2VTdHlsZTogJ2ljb25zJyxcbiAgYmx1cjogMCxcbiAgYmxhY2tTZWdtZW50czogJ25vbmUnLFxuICBibGFja1NlZ21lbnRzVGltaW5nOiAncm90YXRlLTEwcycsXG4gIGZsYXNoTW9kZUVuYWJsZWQ6IGZhbHNlLFxuICBmbGFzaER1cmF0aW9uOiAxLFxuICBmbGFzaEludGVydmFsOiAzLFxufVxuIiwiLyoqXG4gKiBXcmFwcGVyIG1vZHVsZSBmb3IgbG9jYWxTdG9yYWdlIHRvIGFsbG93IG1vY2tpbmcgd2l0aCBzaW1vbmVcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SXRlbShrZXk6IHN0cmluZyk6IHN0cmluZyB8IG51bGwge1xuICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0SXRlbShrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIHZhbHVlKVxufVxuIiwiaW1wb3J0IHR5cGUgeyBTaWduYWwgfSBmcm9tICdAcHJlYWN0L3NpZ25hbHMtY29yZSdcbmltcG9ydCB7IGVmZmVjdCwgc2lnbmFsIH0gZnJvbSAnQHByZWFjdC9zaWduYWxzLWNvcmUnXG5pbXBvcnQgeyB0eXBlIFNldHRpbmdzLCBkZWZhdWx0U2V0dGluZ3MgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvc2V0dGluZ3MnXG5pbXBvcnQgKiBhcyBzdG9yYWdlIGZyb20gJy4uLy4uL3BsYXRmb3JtL3N0b3JhZ2UnXG5cbmNvbnN0IFNUT1JBR0VfS0VZID0gJ2xpY2hlc3MtYm9hcmQtc3BlYWtlci1zZXR0aW5ncydcblxuZXhwb3J0IGludGVyZmFjZSBTZXR0aW5nc1N0b3JlIHtcbiAgc3BlYWtSYXRlOiBTaWduYWw8bnVtYmVyPlxuICBwaWVjZXNMaXN0RW5hYmxlZDogU2lnbmFsPGJvb2xlYW4+XG4gIGRpdmlkZXJzRW5hYmxlZDogU2lnbmFsPGJvb2xlYW4+XG4gIGN1c3RvbUJvYXJkRW5hYmxlZDogU2lnbmFsPGJvb2xlYW4+XG4gIG9iZnVzY2F0aW9uc0VuYWJsZWQ6IFNpZ25hbDxib29sZWFuPlxuICBwYXJhbGxheDogU2lnbmFsPG51bWJlcj5cbiAgaG92ZXJNb2RlOiBTaWduYWw8c3RyaW5nPlxuICBwaWVjZVN0eWxlOiBTaWduYWw8c3RyaW5nPlxuICBibHVyOiBTaWduYWw8bnVtYmVyPlxuICBibGFja1NlZ21lbnRzOiBTaWduYWw8c3RyaW5nPlxuICBibGFja1NlZ21lbnRzVGltaW5nOiBTaWduYWw8c3RyaW5nPlxuICBmbGFzaE1vZGVFbmFibGVkOiBTaWduYWw8Ym9vbGVhbj5cbiAgZmxhc2hEdXJhdGlvbjogU2lnbmFsPG51bWJlcj5cbiAgZmxhc2hJbnRlcnZhbDogU2lnbmFsPG51bWJlcj5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNldHRpbmdzU3RvcmUoKTogU2V0dGluZ3NTdG9yZSB7XG4gIHJldHVybiB7XG4gICAgc3BlYWtSYXRlOiBzaWduYWwoZGVmYXVsdFNldHRpbmdzLnNwZWFrUmF0ZSksXG4gICAgcGllY2VzTGlzdEVuYWJsZWQ6IHNpZ25hbChkZWZhdWx0U2V0dGluZ3MucGllY2VzTGlzdEVuYWJsZWQpLFxuICAgIGRpdmlkZXJzRW5hYmxlZDogc2lnbmFsKGRlZmF1bHRTZXR0aW5ncy5kaXZpZGVyc0VuYWJsZWQpLFxuICAgIGN1c3RvbUJvYXJkRW5hYmxlZDogc2lnbmFsKGRlZmF1bHRTZXR0aW5ncy5jdXN0b21Cb2FyZEVuYWJsZWQpLFxuICAgIG9iZnVzY2F0aW9uc0VuYWJsZWQ6IHNpZ25hbChkZWZhdWx0U2V0dGluZ3Mub2JmdXNjYXRpb25zRW5hYmxlZCksXG4gICAgcGFyYWxsYXg6IHNpZ25hbChkZWZhdWx0U2V0dGluZ3MucGFyYWxsYXgpLFxuICAgIGhvdmVyTW9kZTogc2lnbmFsKGRlZmF1bHRTZXR0aW5ncy5ob3Zlck1vZGUpLFxuICAgIHBpZWNlU3R5bGU6IHNpZ25hbChkZWZhdWx0U2V0dGluZ3MucGllY2VTdHlsZSksXG4gICAgYmx1cjogc2lnbmFsKGRlZmF1bHRTZXR0aW5ncy5ibHVyKSxcbiAgICBibGFja1NlZ21lbnRzOiBzaWduYWwoZGVmYXVsdFNldHRpbmdzLmJsYWNrU2VnbWVudHMpLFxuICAgIGJsYWNrU2VnbWVudHNUaW1pbmc6IHNpZ25hbChkZWZhdWx0U2V0dGluZ3MuYmxhY2tTZWdtZW50c1RpbWluZyksXG4gICAgZmxhc2hNb2RlRW5hYmxlZDogc2lnbmFsKGRlZmF1bHRTZXR0aW5ncy5mbGFzaE1vZGVFbmFibGVkKSxcbiAgICBmbGFzaER1cmF0aW9uOiBzaWduYWwoZGVmYXVsdFNldHRpbmdzLmZsYXNoRHVyYXRpb24pLFxuICAgIGZsYXNoSW50ZXJ2YWw6IHNpZ25hbChkZWZhdWx0U2V0dGluZ3MuZmxhc2hJbnRlcnZhbCksXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRTZXR0aW5ncyhzZXR0aW5nczogU2V0dGluZ3NTdG9yZSk6IHZvaWQge1xuICBjb25zdCBzdG9yZWQgPSBzdG9yYWdlLmdldEl0ZW0oU1RPUkFHRV9LRVkpXG4gIGlmICghc3RvcmVkKSByZXR1cm5cblxuICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShzdG9yZWQpIGFzIFBhcnRpYWw8U2V0dGluZ3M+XG4gIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKGRhdGEpKSB7XG4gICAgY29uc3Qgc2V0dGluZ0tleSA9IGtleSBhcyBrZXlvZiBTZXR0aW5nc1xuICAgIGlmIChcbiAgICAgIHNldHRpbmdzW3NldHRpbmdLZXldICYmXG4gICAgICB0eXBlb2Ygc2V0dGluZ3Nbc2V0dGluZ0tleV0gPT09ICdvYmplY3QnICYmXG4gICAgICAndmFsdWUnIGluIHNldHRpbmdzW3NldHRpbmdLZXldXG4gICAgKSB7XG4gICAgICAvLyBiaW9tZS1pZ25vcmUgbGludC9zdXNwaWNpb3VzL25vRXhwbGljaXRBbnk6IFNldHRpbmdzIHR5cGUgaXMgZHluYW1pY1xuICAgICAgOyhzZXR0aW5nc1tzZXR0aW5nS2V5XSBhcyBhbnkpLnZhbHVlID0gZGF0YVtzZXR0aW5nS2V5XVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2F2ZVNldHRpbmdzKHNldHRpbmdzOiBTZXR0aW5nc1N0b3JlKTogdm9pZCB7XG4gIGNvbnN0IGRhdGE6IFBhcnRpYWw8U2V0dGluZ3M+ID0ge31cbiAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoc2V0dGluZ3MpKSB7XG4gICAgY29uc3Qgc2V0dGluZ0tleSA9IGtleSBhcyBrZXlvZiB0eXBlb2Ygc2V0dGluZ3NcbiAgICAvLyBiaW9tZS1pZ25vcmUgbGludC9zdXNwaWNpb3VzL25vRXhwbGljaXRBbnk6IFNldHRpbmdzIHR5cGUgaXMgZHluYW1pY1xuICAgIGRhdGFbc2V0dGluZ0tleSBhcyBrZXlvZiBTZXR0aW5nc10gPSAoc2V0dGluZ3Nbc2V0dGluZ0tleV0gYXMgYW55KS52YWx1ZVxuICB9XG4gIHN0b3JhZ2Uuc2V0SXRlbShTVE9SQUdFX0tFWSwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cEF1dG9TYXZlKHNldHRpbmdzOiBTZXR0aW5nc1N0b3JlKTogdm9pZCB7XG4gIGVmZmVjdCgoKSA9PiB7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoc2V0dGluZ3MpKSB7XG4gICAgICBjb25zdCBzZXR0aW5nID0gc2V0dGluZ3Nba2V5IGFzIGtleW9mIHR5cGVvZiBzZXR0aW5nc11cbiAgICAgIHNldHRpbmcudmFsdWVcbiAgICB9XG4gICAgc2F2ZVNldHRpbmdzKHNldHRpbmdzKVxuICB9KVxufVxuIiwidmFyIG4sbCx1LHQsaSxyLG8sZSxmLGMsYSxzLGgscCx2LHksZD17fSx3PVtdLF89L2FjaXR8ZXgoPzpzfGd8bnxwfCQpfHJwaHxncmlkfG93c3xtbmN8bnR3fGluZVtjaF18em9vfF5vcmR8aXRlcmEvaSxnPUFycmF5LmlzQXJyYXk7ZnVuY3Rpb24gbShuLGwpe2Zvcih2YXIgdSBpbiBsKW5bdV09bFt1XTtyZXR1cm4gbn1mdW5jdGlvbiBiKG4pe24mJm4ucGFyZW50Tm9kZSYmbi5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG4pfWZ1bmN0aW9uIGsobCx1LHQpe3ZhciBpLHIsbyxlPXt9O2ZvcihvIGluIHUpXCJrZXlcIj09bz9pPXVbb106XCJyZWZcIj09bz9yPXVbb106ZVtvXT11W29dO2lmKGFyZ3VtZW50cy5sZW5ndGg+MiYmKGUuY2hpbGRyZW49YXJndW1lbnRzLmxlbmd0aD4zP24uY2FsbChhcmd1bWVudHMsMik6dCksXCJmdW5jdGlvblwiPT10eXBlb2YgbCYmbnVsbCE9bC5kZWZhdWx0UHJvcHMpZm9yKG8gaW4gbC5kZWZhdWx0UHJvcHMpdm9pZCAwPT09ZVtvXSYmKGVbb109bC5kZWZhdWx0UHJvcHNbb10pO3JldHVybiB4KGwsZSxpLHIsbnVsbCl9ZnVuY3Rpb24geChuLHQsaSxyLG8pe3ZhciBlPXt0eXBlOm4scHJvcHM6dCxrZXk6aSxyZWY6cixfX2s6bnVsbCxfXzpudWxsLF9fYjowLF9fZTpudWxsLF9fYzpudWxsLGNvbnN0cnVjdG9yOnZvaWQgMCxfX3Y6bnVsbD09bz8rK3U6byxfX2k6LTEsX191OjB9O3JldHVybiBudWxsPT1vJiZudWxsIT1sLnZub2RlJiZsLnZub2RlKGUpLGV9ZnVuY3Rpb24gTSgpe3JldHVybntjdXJyZW50Om51bGx9fWZ1bmN0aW9uIFMobil7cmV0dXJuIG4uY2hpbGRyZW59ZnVuY3Rpb24gQyhuLGwpe3RoaXMucHJvcHM9bix0aGlzLmNvbnRleHQ9bH1mdW5jdGlvbiAkKG4sbCl7aWYobnVsbD09bClyZXR1cm4gbi5fXz8kKG4uX18sbi5fX2krMSk6bnVsbDtmb3IodmFyIHU7bDxuLl9fay5sZW5ndGg7bCsrKWlmKG51bGwhPSh1PW4uX19rW2xdKSYmbnVsbCE9dS5fX2UpcmV0dXJuIHUuX19lO3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIG4udHlwZT8kKG4pOm51bGx9ZnVuY3Rpb24gSShuKXtpZihuLl9fUCYmbi5fX2Qpe3ZhciB1PW4uX192LHQ9dS5fX2UsaT1bXSxyPVtdLG89bSh7fSx1KTtvLl9fdj11Ll9fdisxLGwudm5vZGUmJmwudm5vZGUobykscShuLl9fUCxvLHUsbi5fX24sbi5fX1AubmFtZXNwYWNlVVJJLDMyJnUuX191P1t0XTpudWxsLGksbnVsbD09dD8kKHUpOnQsISEoMzImdS5fX3UpLHIpLG8uX192PXUuX192LG8uX18uX19rW28uX19pXT1vLEQoaSxvLHIpLHUuX19lPXUuX189bnVsbCxvLl9fZSE9dCYmUChvKX19ZnVuY3Rpb24gUChuKXtpZihudWxsIT0obj1uLl9fKSYmbnVsbCE9bi5fX2MpcmV0dXJuIG4uX19lPW4uX19jLmJhc2U9bnVsbCxuLl9fay5zb21lKGZ1bmN0aW9uKGwpe2lmKG51bGwhPWwmJm51bGwhPWwuX19lKXJldHVybiBuLl9fZT1uLl9fYy5iYXNlPWwuX19lfSksUChuKX1mdW5jdGlvbiBBKG4peyghbi5fX2QmJihuLl9fZD0hMCkmJmkucHVzaChuKSYmIUguX19yKyt8fHIhPWwuZGVib3VuY2VSZW5kZXJpbmcpJiYoKHI9bC5kZWJvdW5jZVJlbmRlcmluZyl8fG8pKEgpfWZ1bmN0aW9uIEgoKXt0cnl7Zm9yKHZhciBuLGw9MTtpLmxlbmd0aDspaS5sZW5ndGg+bCYmaS5zb3J0KGUpLG49aS5zaGlmdCgpLGw9aS5sZW5ndGgsSShuKX1maW5hbGx5e2kubGVuZ3RoPUguX19yPTB9fWZ1bmN0aW9uIEwobixsLHUsdCxpLHIsbyxlLGYsYyxhKXt2YXIgcyxoLHAsdix5LF8sZyxtPXQmJnQuX19rfHx3LGI9bC5sZW5ndGg7Zm9yKGY9VCh1LGwsbSxmLGIpLHM9MDtzPGI7cysrKW51bGwhPShwPXUuX19rW3NdKSYmKGg9LTEhPXAuX19pJiZtW3AuX19pXXx8ZCxwLl9faT1zLF89cShuLHAsaCxpLHIsbyxlLGYsYyxhKSx2PXAuX19lLHAucmVmJiZoLnJlZiE9cC5yZWYmJihoLnJlZiYmSihoLnJlZixudWxsLHApLGEucHVzaChwLnJlZixwLl9fY3x8dixwKSksbnVsbD09eSYmbnVsbCE9diYmKHk9diksKGc9ISEoNCZwLl9fdSkpfHxoLl9faz09PXAuX19rPyhmPWoocCxmLG4sZyksZyYmaC5fX2UmJihoLl9fZT1udWxsKSk6XCJmdW5jdGlvblwiPT10eXBlb2YgcC50eXBlJiZ2b2lkIDAhPT1fP2Y9Xzp2JiYoZj12Lm5leHRTaWJsaW5nKSxwLl9fdSY9LTcpO3JldHVybiB1Ll9fZT15LGZ9ZnVuY3Rpb24gVChuLGwsdSx0LGkpe3ZhciByLG8sZSxmLGMsYT11Lmxlbmd0aCxzPWEsaD0wO2ZvcihuLl9faz1uZXcgQXJyYXkoaSkscj0wO3I8aTtyKyspbnVsbCE9KG89bFtyXSkmJlwiYm9vbGVhblwiIT10eXBlb2YgbyYmXCJmdW5jdGlvblwiIT10eXBlb2Ygbz8oXCJzdHJpbmdcIj09dHlwZW9mIG98fFwibnVtYmVyXCI9PXR5cGVvZiBvfHxcImJpZ2ludFwiPT10eXBlb2Ygb3x8by5jb25zdHJ1Y3Rvcj09U3RyaW5nP289bi5fX2tbcl09eChudWxsLG8sbnVsbCxudWxsLG51bGwpOmcobyk/bz1uLl9fa1tyXT14KFMse2NoaWxkcmVuOm99LG51bGwsbnVsbCxudWxsKTp2b2lkIDA9PT1vLmNvbnN0cnVjdG9yJiZvLl9fYj4wP289bi5fX2tbcl09eChvLnR5cGUsby5wcm9wcyxvLmtleSxvLnJlZj9vLnJlZjpudWxsLG8uX192KTpuLl9fa1tyXT1vLGY9citoLG8uX189bixvLl9fYj1uLl9fYisxLGU9bnVsbCwtMSE9KGM9by5fX2k9TyhvLHUsZixzKSkmJihzLS0sKGU9dVtjXSkmJihlLl9fdXw9MikpLG51bGw9PWV8fG51bGw9PWUuX192PygtMT09YyYmKGk+YT9oLS06aTxhJiZoKyspLFwiZnVuY3Rpb25cIiE9dHlwZW9mIG8udHlwZSYmKG8uX191fD00KSk6YyE9ZiYmKGM9PWYtMT9oLS06Yz09ZisxP2grKzooYz5mP2gtLTpoKyssby5fX3V8PTQpKSk6bi5fX2tbcl09bnVsbDtpZihzKWZvcihyPTA7cjxhO3IrKyludWxsIT0oZT11W3JdKSYmMD09KDImZS5fX3UpJiYoZS5fX2U9PXQmJih0PSQoZSkpLEsoZSxlKSk7cmV0dXJuIHR9ZnVuY3Rpb24gaihuLGwsdSx0KXt2YXIgaSxyO2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIG4udHlwZSl7Zm9yKGk9bi5fX2sscj0wO2kmJnI8aS5sZW5ndGg7cisrKWlbcl0mJihpW3JdLl9fPW4sbD1qKGlbcl0sbCx1LHQpKTtyZXR1cm4gbH1uLl9fZSE9bCYmKHQmJihsJiZuLnR5cGUmJiFsLnBhcmVudE5vZGUmJihsPSQobikpLHUuaW5zZXJ0QmVmb3JlKG4uX19lLGx8fG51bGwpKSxsPW4uX19lKTtkb3tsPWwmJmwubmV4dFNpYmxpbmd9d2hpbGUobnVsbCE9bCYmOD09bC5ub2RlVHlwZSk7cmV0dXJuIGx9ZnVuY3Rpb24gRihuLGwpe3JldHVybiBsPWx8fFtdLG51bGw9PW58fFwiYm9vbGVhblwiPT10eXBlb2Ygbnx8KGcobik/bi5zb21lKGZ1bmN0aW9uKG4pe0YobixsKX0pOmwucHVzaChuKSksbH1mdW5jdGlvbiBPKG4sbCx1LHQpe3ZhciBpLHIsbyxlPW4ua2V5LGY9bi50eXBlLGM9bFt1XSxhPW51bGwhPWMmJjA9PSgyJmMuX191KTtpZihudWxsPT09YyYmbnVsbD09ZXx8YSYmZT09Yy5rZXkmJmY9PWMudHlwZSlyZXR1cm4gdTtpZih0PihhPzE6MCkpZm9yKGk9dS0xLHI9dSsxO2k+PTB8fHI8bC5sZW5ndGg7KWlmKG51bGwhPShjPWxbbz1pPj0wP2ktLTpyKytdKSYmMD09KDImYy5fX3UpJiZlPT1jLmtleSYmZj09Yy50eXBlKXJldHVybiBvO3JldHVybi0xfWZ1bmN0aW9uIHoobixsLHUpe1wiLVwiPT1sWzBdP24uc2V0UHJvcGVydHkobCxudWxsPT11P1wiXCI6dSk6bltsXT1udWxsPT11P1wiXCI6XCJudW1iZXJcIiE9dHlwZW9mIHV8fF8udGVzdChsKT91OnUrXCJweFwifWZ1bmN0aW9uIE4obixsLHUsdCxpKXt2YXIgcixvO246aWYoXCJzdHlsZVwiPT1sKWlmKFwic3RyaW5nXCI9PXR5cGVvZiB1KW4uc3R5bGUuY3NzVGV4dD11O2Vsc2V7aWYoXCJzdHJpbmdcIj09dHlwZW9mIHQmJihuLnN0eWxlLmNzc1RleHQ9dD1cIlwiKSx0KWZvcihsIGluIHQpdSYmbCBpbiB1fHx6KG4uc3R5bGUsbCxcIlwiKTtpZih1KWZvcihsIGluIHUpdCYmdVtsXT09dFtsXXx8eihuLnN0eWxlLGwsdVtsXSl9ZWxzZSBpZihcIm9cIj09bFswXSYmXCJuXCI9PWxbMV0pcj1sIT0obD1sLnJlcGxhY2UocyxcIiQxXCIpKSxvPWwudG9Mb3dlckNhc2UoKSxsPW8gaW4gbnx8XCJvbkZvY3VzT3V0XCI9PWx8fFwib25Gb2N1c0luXCI9PWw/by5zbGljZSgyKTpsLnNsaWNlKDIpLG4ubHx8KG4ubD17fSksbi5sW2wrcl09dSx1P3Q/dVthXT10W2FdOih1W2FdPWgsbi5hZGRFdmVudExpc3RlbmVyKGwscj92OnAscikpOm4ucmVtb3ZlRXZlbnRMaXN0ZW5lcihsLHI/djpwLHIpO2Vsc2V7aWYoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPT1pKWw9bC5yZXBsYWNlKC94bGluayhIfDpoKS8sXCJoXCIpLnJlcGxhY2UoL3NOYW1lJC8sXCJzXCIpO2Vsc2UgaWYoXCJ3aWR0aFwiIT1sJiZcImhlaWdodFwiIT1sJiZcImhyZWZcIiE9bCYmXCJsaXN0XCIhPWwmJlwiZm9ybVwiIT1sJiZcInRhYkluZGV4XCIhPWwmJlwiZG93bmxvYWRcIiE9bCYmXCJyb3dTcGFuXCIhPWwmJlwiY29sU3BhblwiIT1sJiZcInJvbGVcIiE9bCYmXCJwb3BvdmVyXCIhPWwmJmwgaW4gbil0cnl7bltsXT1udWxsPT11P1wiXCI6dTticmVhayBufWNhdGNoKG4pe31cImZ1bmN0aW9uXCI9PXR5cGVvZiB1fHwobnVsbD09dXx8ITE9PT11JiZcIi1cIiE9bFs0XT9uLnJlbW92ZUF0dHJpYnV0ZShsKTpuLnNldEF0dHJpYnV0ZShsLFwicG9wb3ZlclwiPT1sJiYxPT11P1wiXCI6dSkpfX1mdW5jdGlvbiBWKG4pe3JldHVybiBmdW5jdGlvbih1KXtpZih0aGlzLmwpe3ZhciB0PXRoaXMubFt1LnR5cGUrbl07aWYobnVsbD09dVtjXSl1W2NdPWgrKztlbHNlIGlmKHVbY108dFthXSlyZXR1cm47cmV0dXJuIHQobC5ldmVudD9sLmV2ZW50KHUpOnUpfX19ZnVuY3Rpb24gcShuLHUsdCxpLHIsbyxlLGYsYyxhKXt2YXIgcyxoLHAsdix5LGQsXyxrLHgsTSwkLEksUCxBLEgsVD11LnR5cGU7aWYodm9pZCAwIT09dS5jb25zdHJ1Y3RvcilyZXR1cm4gbnVsbDsxMjgmdC5fX3UmJihjPSEhKDMyJnQuX191KSxvPVtmPXUuX19lPXQuX19lXSksKHM9bC5fX2IpJiZzKHUpO246aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgVCl0cnl7aWYoaz11LnByb3BzLHg9VC5wcm90b3R5cGUmJlQucHJvdG90eXBlLnJlbmRlcixNPShzPVQuY29udGV4dFR5cGUpJiZpW3MuX19jXSwkPXM/TT9NLnByb3BzLnZhbHVlOnMuX186aSx0Ll9fYz9fPShoPXUuX19jPXQuX19jKS5fXz1oLl9fRTooeD91Ll9fYz1oPW5ldyBUKGssJCk6KHUuX19jPWg9bmV3IEMoaywkKSxoLmNvbnN0cnVjdG9yPVQsaC5yZW5kZXI9USksTSYmTS5zdWIoaCksaC5zdGF0ZXx8KGguc3RhdGU9e30pLGguX19uPWkscD1oLl9fZD0hMCxoLl9faD1bXSxoLl9zYj1bXSkseCYmbnVsbD09aC5fX3MmJihoLl9fcz1oLnN0YXRlKSx4JiZudWxsIT1ULmdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyYmKGguX19zPT1oLnN0YXRlJiYoaC5fX3M9bSh7fSxoLl9fcykpLG0oaC5fX3MsVC5nZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMoayxoLl9fcykpKSx2PWgucHJvcHMseT1oLnN0YXRlLGguX192PXUscCl4JiZudWxsPT1ULmdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyYmbnVsbCE9aC5jb21wb25lbnRXaWxsTW91bnQmJmguY29tcG9uZW50V2lsbE1vdW50KCkseCYmbnVsbCE9aC5jb21wb25lbnREaWRNb3VudCYmaC5fX2gucHVzaChoLmNvbXBvbmVudERpZE1vdW50KTtlbHNle2lmKHgmJm51bGw9PVQuZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzJiZrIT09diYmbnVsbCE9aC5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzJiZoLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMoaywkKSx1Ll9fdj09dC5fX3Z8fCFoLl9fZSYmbnVsbCE9aC5zaG91bGRDb21wb25lbnRVcGRhdGUmJiExPT09aC5zaG91bGRDb21wb25lbnRVcGRhdGUoayxoLl9fcywkKSl7dS5fX3YhPXQuX192JiYoaC5wcm9wcz1rLGguc3RhdGU9aC5fX3MsaC5fX2Q9ITEpLHUuX19lPXQuX19lLHUuX19rPXQuX19rLHUuX19rLnNvbWUoZnVuY3Rpb24obil7biYmKG4uX189dSl9KSx3LnB1c2guYXBwbHkoaC5fX2gsaC5fc2IpLGguX3NiPVtdLGguX19oLmxlbmd0aCYmZS5wdXNoKGgpO2JyZWFrIG59bnVsbCE9aC5jb21wb25lbnRXaWxsVXBkYXRlJiZoLmNvbXBvbmVudFdpbGxVcGRhdGUoayxoLl9fcywkKSx4JiZudWxsIT1oLmNvbXBvbmVudERpZFVwZGF0ZSYmaC5fX2gucHVzaChmdW5jdGlvbigpe2guY29tcG9uZW50RGlkVXBkYXRlKHYseSxkKX0pfWlmKGguY29udGV4dD0kLGgucHJvcHM9ayxoLl9fUD1uLGguX19lPSExLEk9bC5fX3IsUD0wLHgpaC5zdGF0ZT1oLl9fcyxoLl9fZD0hMSxJJiZJKHUpLHM9aC5yZW5kZXIoaC5wcm9wcyxoLnN0YXRlLGguY29udGV4dCksdy5wdXNoLmFwcGx5KGguX19oLGguX3NiKSxoLl9zYj1bXTtlbHNlIGRve2guX19kPSExLEkmJkkodSkscz1oLnJlbmRlcihoLnByb3BzLGguc3RhdGUsaC5jb250ZXh0KSxoLnN0YXRlPWguX19zfXdoaWxlKGguX19kJiYrK1A8MjUpO2guc3RhdGU9aC5fX3MsbnVsbCE9aC5nZXRDaGlsZENvbnRleHQmJihpPW0obSh7fSxpKSxoLmdldENoaWxkQ29udGV4dCgpKSkseCYmIXAmJm51bGwhPWguZ2V0U25hcHNob3RCZWZvcmVVcGRhdGUmJihkPWguZ2V0U25hcHNob3RCZWZvcmVVcGRhdGUodix5KSksQT1udWxsIT1zJiZzLnR5cGU9PT1TJiZudWxsPT1zLmtleT9FKHMucHJvcHMuY2hpbGRyZW4pOnMsZj1MKG4sZyhBKT9BOltBXSx1LHQsaSxyLG8sZSxmLGMsYSksaC5iYXNlPXUuX19lLHUuX191Jj0tMTYxLGguX19oLmxlbmd0aCYmZS5wdXNoKGgpLF8mJihoLl9fRT1oLl9fPW51bGwpfWNhdGNoKG4pe2lmKHUuX192PW51bGwsY3x8bnVsbCE9bylpZihuLnRoZW4pe2Zvcih1Ll9fdXw9Yz8xNjA6MTI4O2YmJjg9PWYubm9kZVR5cGUmJmYubmV4dFNpYmxpbmc7KWY9Zi5uZXh0U2libGluZztvW28uaW5kZXhPZihmKV09bnVsbCx1Ll9fZT1mfWVsc2V7Zm9yKEg9by5sZW5ndGg7SC0tOyliKG9bSF0pO0IodSl9ZWxzZSB1Ll9fZT10Ll9fZSx1Ll9faz10Ll9fayxuLnRoZW58fEIodSk7bC5fX2Uobix1LHQpfWVsc2UgbnVsbD09byYmdS5fX3Y9PXQuX192Pyh1Ll9faz10Ll9fayx1Ll9fZT10Ll9fZSk6Zj11Ll9fZT1HKHQuX19lLHUsdCxpLHIsbyxlLGMsYSk7cmV0dXJuKHM9bC5kaWZmZWQpJiZzKHUpLDEyOCZ1Ll9fdT92b2lkIDA6Zn1mdW5jdGlvbiBCKG4pe24mJihuLl9fYyYmKG4uX19jLl9fZT0hMCksbi5fX2smJm4uX19rLnNvbWUoQikpfWZ1bmN0aW9uIEQobix1LHQpe2Zvcih2YXIgaT0wO2k8dC5sZW5ndGg7aSsrKUoodFtpXSx0WysraV0sdFsrK2ldKTtsLl9fYyYmbC5fX2ModSxuKSxuLnNvbWUoZnVuY3Rpb24odSl7dHJ5e249dS5fX2gsdS5fX2g9W10sbi5zb21lKGZ1bmN0aW9uKG4pe24uY2FsbCh1KX0pfWNhdGNoKG4pe2wuX19lKG4sdS5fX3YpfX0pfWZ1bmN0aW9uIEUobil7cmV0dXJuXCJvYmplY3RcIiE9dHlwZW9mIG58fG51bGw9PW58fG4uX19iPjA/bjpnKG4pP24ubWFwKEUpOnZvaWQgMCE9PW4uY29uc3RydWN0b3I/bnVsbDptKHt9LG4pfWZ1bmN0aW9uIEcodSx0LGkscixvLGUsZixjLGEpe3ZhciBzLGgscCx2LHksdyxfLG09aS5wcm9wc3x8ZCxrPXQucHJvcHMseD10LnR5cGU7aWYoXCJzdmdcIj09eD9vPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIjpcIm1hdGhcIj09eD9vPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OC9NYXRoL01hdGhNTFwiOm98fChvPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbFwiKSxudWxsIT1lKWZvcihzPTA7czxlLmxlbmd0aDtzKyspaWYoKHk9ZVtzXSkmJlwic2V0QXR0cmlidXRlXCJpbiB5PT0hIXgmJih4P3kubG9jYWxOYW1lPT14OjM9PXkubm9kZVR5cGUpKXt1PXksZVtzXT1udWxsO2JyZWFrfWlmKG51bGw9PXUpe2lmKG51bGw9PXgpcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGspO3U9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKG8seCxrLmlzJiZrKSxjJiYobC5fX20mJmwuX19tKHQsZSksYz0hMSksZT1udWxsfWlmKG51bGw9PXgpbT09PWt8fGMmJnUuZGF0YT09a3x8KHUuZGF0YT1rKTtlbHNle2lmKGU9XCJ0ZXh0YXJlYVwiPT14JiZudWxsIT1rLmRlZmF1bHRWYWx1ZT9udWxsOmUmJm4uY2FsbCh1LmNoaWxkTm9kZXMpLCFjJiZudWxsIT1lKWZvcihtPXt9LHM9MDtzPHUuYXR0cmlidXRlcy5sZW5ndGg7cysrKW1bKHk9dS5hdHRyaWJ1dGVzW3NdKS5uYW1lXT15LnZhbHVlO2ZvcihzIGluIG0peT1tW3NdLFwiZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUxcIj09cz9wPXk6XCJjaGlsZHJlblwiPT1zfHxzIGluIGt8fFwidmFsdWVcIj09cyYmXCJkZWZhdWx0VmFsdWVcImluIGt8fFwiY2hlY2tlZFwiPT1zJiZcImRlZmF1bHRDaGVja2VkXCJpbiBrfHxOKHUscyxudWxsLHksbyk7Zm9yKHMgaW4gayl5PWtbc10sXCJjaGlsZHJlblwiPT1zP3Y9eTpcImRhbmdlcm91c2x5U2V0SW5uZXJIVE1MXCI9PXM/aD15OlwidmFsdWVcIj09cz93PXk6XCJjaGVja2VkXCI9PXM/Xz15OmMmJlwiZnVuY3Rpb25cIiE9dHlwZW9mIHl8fG1bc109PT15fHxOKHUscyx5LG1bc10sbyk7aWYoaCljfHxwJiYoaC5fX2h0bWw9PXAuX19odG1sfHxoLl9faHRtbD09dS5pbm5lckhUTUwpfHwodS5pbm5lckhUTUw9aC5fX2h0bWwpLHQuX19rPVtdO2Vsc2UgaWYocCYmKHUuaW5uZXJIVE1MPVwiXCIpLEwoXCJ0ZW1wbGF0ZVwiPT10LnR5cGU/dS5jb250ZW50OnUsZyh2KT92Olt2XSx0LGkscixcImZvcmVpZ25PYmplY3RcIj09eD9cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWxcIjpvLGUsZixlP2VbMF06aS5fX2smJiQoaSwwKSxjLGEpLG51bGwhPWUpZm9yKHM9ZS5sZW5ndGg7cy0tOyliKGVbc10pO2MmJlwidGV4dGFyZWFcIiE9eHx8KHM9XCJ2YWx1ZVwiLFwicHJvZ3Jlc3NcIj09eCYmbnVsbD09dz91LnJlbW92ZUF0dHJpYnV0ZShcInZhbHVlXCIpOm51bGwhPXcmJih3IT09dVtzXXx8XCJwcm9ncmVzc1wiPT14JiYhd3x8XCJvcHRpb25cIj09eCYmdyE9bVtzXSkmJk4odSxzLHcsbVtzXSxvKSxzPVwiY2hlY2tlZFwiLG51bGwhPV8mJl8hPXVbc10mJk4odSxzLF8sbVtzXSxvKSl9cmV0dXJuIHV9ZnVuY3Rpb24gSihuLHUsdCl7dHJ5e2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIG4pe3ZhciBpPVwiZnVuY3Rpb25cIj09dHlwZW9mIG4uX191O2kmJm4uX191KCksaSYmbnVsbD09dXx8KG4uX191PW4odSkpfWVsc2Ugbi5jdXJyZW50PXV9Y2F0Y2gobil7bC5fX2Uobix0KX19ZnVuY3Rpb24gSyhuLHUsdCl7dmFyIGkscjtpZihsLnVubW91bnQmJmwudW5tb3VudChuKSwoaT1uLnJlZikmJihpLmN1cnJlbnQmJmkuY3VycmVudCE9bi5fX2V8fEooaSxudWxsLHUpKSxudWxsIT0oaT1uLl9fYykpe2lmKGkuY29tcG9uZW50V2lsbFVubW91bnQpdHJ5e2kuY29tcG9uZW50V2lsbFVubW91bnQoKX1jYXRjaChuKXtsLl9fZShuLHUpfWkuYmFzZT1pLl9fUD1udWxsfWlmKGk9bi5fX2spZm9yKHI9MDtyPGkubGVuZ3RoO3IrKylpW3JdJiZLKGlbcl0sdSx0fHxcImZ1bmN0aW9uXCIhPXR5cGVvZiBuLnR5cGUpO3R8fGIobi5fX2UpLG4uX19jPW4uX189bi5fX2U9dm9pZCAwfWZ1bmN0aW9uIFEobixsLHUpe3JldHVybiB0aGlzLmNvbnN0cnVjdG9yKG4sdSl9ZnVuY3Rpb24gUih1LHQsaSl7dmFyIHIsbyxlLGY7dD09ZG9jdW1lbnQmJih0PWRvY3VtZW50LmRvY3VtZW50RWxlbWVudCksbC5fXyYmbC5fXyh1LHQpLG89KHI9XCJmdW5jdGlvblwiPT10eXBlb2YgaSk/bnVsbDppJiZpLl9fa3x8dC5fX2ssZT1bXSxmPVtdLHEodCx1PSghciYmaXx8dCkuX19rPWsoUyxudWxsLFt1XSksb3x8ZCxkLHQubmFtZXNwYWNlVVJJLCFyJiZpP1tpXTpvP251bGw6dC5maXJzdENoaWxkP24uY2FsbCh0LmNoaWxkTm9kZXMpOm51bGwsZSwhciYmaT9pOm8/by5fX2U6dC5maXJzdENoaWxkLHIsZiksRChlLHUsZil9ZnVuY3Rpb24gVShuLGwpe1IobixsLFUpfWZ1bmN0aW9uIFcobCx1LHQpe3ZhciBpLHIsbyxlLGY9bSh7fSxsLnByb3BzKTtmb3IobyBpbiBsLnR5cGUmJmwudHlwZS5kZWZhdWx0UHJvcHMmJihlPWwudHlwZS5kZWZhdWx0UHJvcHMpLHUpXCJrZXlcIj09bz9pPXVbb106XCJyZWZcIj09bz9yPXVbb106ZltvXT12b2lkIDA9PT11W29dJiZudWxsIT1lP2Vbb106dVtvXTtyZXR1cm4gYXJndW1lbnRzLmxlbmd0aD4yJiYoZi5jaGlsZHJlbj1hcmd1bWVudHMubGVuZ3RoPjM/bi5jYWxsKGFyZ3VtZW50cywyKTp0KSx4KGwudHlwZSxmLGl8fGwua2V5LHJ8fGwucmVmLG51bGwpfWZ1bmN0aW9uIFgobil7ZnVuY3Rpb24gbChuKXt2YXIgdSx0O3JldHVybiB0aGlzLmdldENoaWxkQ29udGV4dHx8KHU9bmV3IFNldCwodD17fSlbbC5fX2NdPXRoaXMsdGhpcy5nZXRDaGlsZENvbnRleHQ9ZnVuY3Rpb24oKXtyZXR1cm4gdH0sdGhpcy5jb21wb25lbnRXaWxsVW5tb3VudD1mdW5jdGlvbigpe3U9bnVsbH0sdGhpcy5zaG91bGRDb21wb25lbnRVcGRhdGU9ZnVuY3Rpb24obil7dGhpcy5wcm9wcy52YWx1ZSE9bi52YWx1ZSYmdS5mb3JFYWNoKGZ1bmN0aW9uKG4pe24uX19lPSEwLEEobil9KX0sdGhpcy5zdWI9ZnVuY3Rpb24obil7dS5hZGQobik7dmFyIGw9bi5jb21wb25lbnRXaWxsVW5tb3VudDtuLmNvbXBvbmVudFdpbGxVbm1vdW50PWZ1bmN0aW9uKCl7dSYmdS5kZWxldGUobiksbCYmbC5jYWxsKG4pfX0pLG4uY2hpbGRyZW59cmV0dXJuIGwuX19jPVwiX19jQ1wiK3krKyxsLl9fPW4sbC5Qcm92aWRlcj1sLl9fbD0obC5Db25zdW1lcj1mdW5jdGlvbihuLGwpe3JldHVybiBuLmNoaWxkcmVuKGwpfSkuY29udGV4dFR5cGU9bCxsfW49dy5zbGljZSxsPXtfX2U6ZnVuY3Rpb24obixsLHUsdCl7Zm9yKHZhciBpLHIsbztsPWwuX187KWlmKChpPWwuX19jKSYmIWkuX18pdHJ5e2lmKChyPWkuY29uc3RydWN0b3IpJiZudWxsIT1yLmdldERlcml2ZWRTdGF0ZUZyb21FcnJvciYmKGkuc2V0U3RhdGUoci5nZXREZXJpdmVkU3RhdGVGcm9tRXJyb3IobikpLG89aS5fX2QpLG51bGwhPWkuY29tcG9uZW50RGlkQ2F0Y2gmJihpLmNvbXBvbmVudERpZENhdGNoKG4sdHx8e30pLG89aS5fX2QpLG8pcmV0dXJuIGkuX19FPWl9Y2F0Y2gobCl7bj1sfXRocm93IG59fSx1PTAsdD1mdW5jdGlvbihuKXtyZXR1cm4gbnVsbCE9biYmdm9pZCAwPT09bi5jb25zdHJ1Y3Rvcn0sQy5wcm90b3R5cGUuc2V0U3RhdGU9ZnVuY3Rpb24obixsKXt2YXIgdTt1PW51bGwhPXRoaXMuX19zJiZ0aGlzLl9fcyE9dGhpcy5zdGF0ZT90aGlzLl9fczp0aGlzLl9fcz1tKHt9LHRoaXMuc3RhdGUpLFwiZnVuY3Rpb25cIj09dHlwZW9mIG4mJihuPW4obSh7fSx1KSx0aGlzLnByb3BzKSksbiYmbSh1LG4pLG51bGwhPW4mJnRoaXMuX192JiYobCYmdGhpcy5fc2IucHVzaChsKSxBKHRoaXMpKX0sQy5wcm90b3R5cGUuZm9yY2VVcGRhdGU9ZnVuY3Rpb24obil7dGhpcy5fX3YmJih0aGlzLl9fZT0hMCxuJiZ0aGlzLl9faC5wdXNoKG4pLEEodGhpcykpfSxDLnByb3RvdHlwZS5yZW5kZXI9UyxpPVtdLG89XCJmdW5jdGlvblwiPT10eXBlb2YgUHJvbWlzZT9Qcm9taXNlLnByb3RvdHlwZS50aGVuLmJpbmQoUHJvbWlzZS5yZXNvbHZlKCkpOnNldFRpbWVvdXQsZT1mdW5jdGlvbihuLGwpe3JldHVybiBuLl9fdi5fX2ItbC5fX3YuX19ifSxILl9fcj0wLGY9TWF0aC5yYW5kb20oKS50b1N0cmluZyg4KSxjPVwiX19kXCIrZixhPVwiX19hXCIrZixzPS8oUG9pbnRlckNhcHR1cmUpJHxDYXB0dXJlJC9pLGg9MCxwPVYoITEpLHY9VighMCkseT0wO2V4cG9ydHtDIGFzIENvbXBvbmVudCxTIGFzIEZyYWdtZW50LFcgYXMgY2xvbmVFbGVtZW50LFggYXMgY3JlYXRlQ29udGV4dCxrIGFzIGNyZWF0ZUVsZW1lbnQsTSBhcyBjcmVhdGVSZWYsayBhcyBoLFUgYXMgaHlkcmF0ZSx0IGFzIGlzVmFsaWRFbGVtZW50LGwgYXMgb3B0aW9ucyxSIGFzIHJlbmRlcixGIGFzIHRvQ2hpbGRBcnJheX07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wcmVhY3QubW9kdWxlLmpzLm1hcFxuIiwiaW1wb3J0e29wdGlvbnMgYXMgbn1mcm9tXCJwcmVhY3RcIjt2YXIgdCxyLHUsaSxvPTAsZj1bXSxjPW4sZT1jLl9fYixhPWMuX19yLHY9Yy5kaWZmZWQsbD1jLl9fYyxtPWMudW5tb3VudCxzPWMuX187ZnVuY3Rpb24gcChuLHQpe2MuX19oJiZjLl9faChyLG4sb3x8dCksbz0wO3ZhciB1PXIuX19IfHwoci5fX0g9e19fOltdLF9faDpbXX0pO3JldHVybiBuPj11Ll9fLmxlbmd0aCYmdS5fXy5wdXNoKHt9KSx1Ll9fW25dfWZ1bmN0aW9uIGQobil7cmV0dXJuIG89MSxoKEQsbil9ZnVuY3Rpb24gaChuLHUsaSl7dmFyIG89cCh0KyssMik7aWYoby50PW4sIW8uX19jJiYoby5fXz1baT9pKHUpOkQodm9pZCAwLHUpLGZ1bmN0aW9uKG4pe3ZhciB0PW8uX19OP28uX19OWzBdOm8uX19bMF0scj1vLnQodCxuKTt0IT09ciYmKG8uX19OPVtyLG8uX19bMV1dLG8uX19jLnNldFN0YXRlKHt9KSl9XSxvLl9fYz1yLCFyLl9fZikpe3ZhciBmPWZ1bmN0aW9uKG4sdCxyKXtpZighby5fX2MuX19IKXJldHVybiEwO3ZhciB1PW8uX19jLl9fSC5fXy5maWx0ZXIoZnVuY3Rpb24obil7cmV0dXJuIG4uX19jfSk7aWYodS5ldmVyeShmdW5jdGlvbihuKXtyZXR1cm4hbi5fX059KSlyZXR1cm4hY3x8Yy5jYWxsKHRoaXMsbix0LHIpO3ZhciBpPW8uX19jLnByb3BzIT09bjtyZXR1cm4gdS5zb21lKGZ1bmN0aW9uKG4pe2lmKG4uX19OKXt2YXIgdD1uLl9fWzBdO24uX189bi5fX04sbi5fX049dm9pZCAwLHQhPT1uLl9fWzBdJiYoaT0hMCl9fSksYyYmYy5jYWxsKHRoaXMsbix0LHIpfHxpfTtyLl9fZj0hMDt2YXIgYz1yLnNob3VsZENvbXBvbmVudFVwZGF0ZSxlPXIuY29tcG9uZW50V2lsbFVwZGF0ZTtyLmNvbXBvbmVudFdpbGxVcGRhdGU9ZnVuY3Rpb24obix0LHIpe2lmKHRoaXMuX19lKXt2YXIgdT1jO2M9dm9pZCAwLGYobix0LHIpLGM9dX1lJiZlLmNhbGwodGhpcyxuLHQscil9LHIuc2hvdWxkQ29tcG9uZW50VXBkYXRlPWZ9cmV0dXJuIG8uX19OfHxvLl9ffWZ1bmN0aW9uIHkobix1KXt2YXIgaT1wKHQrKywzKTshYy5fX3MmJkMoaS5fX0gsdSkmJihpLl9fPW4saS51PXUsci5fX0guX19oLnB1c2goaSkpfWZ1bmN0aW9uIF8obix1KXt2YXIgaT1wKHQrKyw0KTshYy5fX3MmJkMoaS5fX0gsdSkmJihpLl9fPW4saS51PXUsci5fX2gucHVzaChpKSl9ZnVuY3Rpb24gQShuKXtyZXR1cm4gbz01LFQoZnVuY3Rpb24oKXtyZXR1cm57Y3VycmVudDpufX0sW10pfWZ1bmN0aW9uIEYobix0LHIpe289NixfKGZ1bmN0aW9uKCl7aWYoXCJmdW5jdGlvblwiPT10eXBlb2Ygbil7dmFyIHI9bih0KCkpO3JldHVybiBmdW5jdGlvbigpe24obnVsbCksciYmXCJmdW5jdGlvblwiPT10eXBlb2YgciYmcigpfX1pZihuKXJldHVybiBuLmN1cnJlbnQ9dCgpLGZ1bmN0aW9uKCl7cmV0dXJuIG4uY3VycmVudD1udWxsfX0sbnVsbD09cj9yOnIuY29uY2F0KG4pKX1mdW5jdGlvbiBUKG4scil7dmFyIHU9cCh0KyssNyk7cmV0dXJuIEModS5fX0gscikmJih1Ll9fPW4oKSx1Ll9fSD1yLHUuX19oPW4pLHUuX199ZnVuY3Rpb24gcShuLHQpe3JldHVybiBvPTgsVChmdW5jdGlvbigpe3JldHVybiBufSx0KX1mdW5jdGlvbiB4KG4pe3ZhciB1PXIuY29udGV4dFtuLl9fY10saT1wKHQrKyw5KTtyZXR1cm4gaS5jPW4sdT8obnVsbD09aS5fXyYmKGkuX189ITAsdS5zdWIocikpLHUucHJvcHMudmFsdWUpOm4uX199ZnVuY3Rpb24gUChuLHQpe2MudXNlRGVidWdWYWx1ZSYmYy51c2VEZWJ1Z1ZhbHVlKHQ/dChuKTpuKX1mdW5jdGlvbiBiKG4pe3ZhciB1PXAodCsrLDEwKSxpPWQoKTtyZXR1cm4gdS5fXz1uLHIuY29tcG9uZW50RGlkQ2F0Y2h8fChyLmNvbXBvbmVudERpZENhdGNoPWZ1bmN0aW9uKG4sdCl7dS5fXyYmdS5fXyhuLHQpLGlbMV0obil9KSxbaVswXSxmdW5jdGlvbigpe2lbMV0odm9pZCAwKX1dfWZ1bmN0aW9uIGcoKXt2YXIgbj1wKHQrKywxMSk7aWYoIW4uX18pe2Zvcih2YXIgdT1yLl9fdjtudWxsIT09dSYmIXUuX19tJiZudWxsIT09dS5fXzspdT11Ll9fO3ZhciBpPXUuX19tfHwodS5fX209WzAsMF0pO24uX189XCJQXCIraVswXStcIi1cIitpWzFdKyt9cmV0dXJuIG4uX199ZnVuY3Rpb24gaigpe2Zvcih2YXIgbjtuPWYuc2hpZnQoKTspe3ZhciB0PW4uX19IO2lmKG4uX19QJiZ0KXRyeXt0Ll9faC5zb21lKHopLHQuX19oLnNvbWUoQiksdC5fX2g9W119Y2F0Y2gocil7dC5fX2g9W10sYy5fX2UocixuLl9fdil9fX1jLl9fYj1mdW5jdGlvbihuKXtyPW51bGwsZSYmZShuKX0sYy5fXz1mdW5jdGlvbihuLHQpe24mJnQuX19rJiZ0Ll9fay5fX20mJihuLl9fbT10Ll9fay5fX20pLHMmJnMobix0KX0sYy5fX3I9ZnVuY3Rpb24obil7YSYmYShuKSx0PTA7dmFyIGk9KHI9bi5fX2MpLl9fSDtpJiYodT09PXI/KGkuX19oPVtdLHIuX19oPVtdLGkuX18uc29tZShmdW5jdGlvbihuKXtuLl9fTiYmKG4uX189bi5fX04pLG4udT1uLl9fTj12b2lkIDB9KSk6KGkuX19oLnNvbWUoeiksaS5fX2guc29tZShCKSxpLl9faD1bXSx0PTApKSx1PXJ9LGMuZGlmZmVkPWZ1bmN0aW9uKG4pe3YmJnYobik7dmFyIHQ9bi5fX2M7dCYmdC5fX0gmJih0Ll9fSC5fX2gubGVuZ3RoJiYoMSE9PWYucHVzaCh0KSYmaT09PWMucmVxdWVzdEFuaW1hdGlvbkZyYW1lfHwoKGk9Yy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUpfHx3KShqKSksdC5fX0guX18uc29tZShmdW5jdGlvbihuKXtuLnUmJihuLl9fSD1uLnUpLG4udT12b2lkIDB9KSksdT1yPW51bGx9LGMuX19jPWZ1bmN0aW9uKG4sdCl7dC5zb21lKGZ1bmN0aW9uKG4pe3RyeXtuLl9faC5zb21lKHopLG4uX19oPW4uX19oLmZpbHRlcihmdW5jdGlvbihuKXtyZXR1cm4hbi5fX3x8QihuKX0pfWNhdGNoKHIpe3Quc29tZShmdW5jdGlvbihuKXtuLl9faCYmKG4uX19oPVtdKX0pLHQ9W10sYy5fX2UocixuLl9fdil9fSksbCYmbChuLHQpfSxjLnVubW91bnQ9ZnVuY3Rpb24obil7bSYmbShuKTt2YXIgdCxyPW4uX19jO3ImJnIuX19IJiYoci5fX0guX18uc29tZShmdW5jdGlvbihuKXt0cnl7eihuKX1jYXRjaChuKXt0PW59fSksci5fX0g9dm9pZCAwLHQmJmMuX19lKHQsci5fX3YpKX07dmFyIGs9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWVzdEFuaW1hdGlvbkZyYW1lO2Z1bmN0aW9uIHcobil7dmFyIHQscj1mdW5jdGlvbigpe2NsZWFyVGltZW91dCh1KSxrJiZjYW5jZWxBbmltYXRpb25GcmFtZSh0KSxzZXRUaW1lb3V0KG4pfSx1PXNldFRpbWVvdXQociwzNSk7ayYmKHQ9cmVxdWVzdEFuaW1hdGlvbkZyYW1lKHIpKX1mdW5jdGlvbiB6KG4pe3ZhciB0PXIsdT1uLl9fYztcImZ1bmN0aW9uXCI9PXR5cGVvZiB1JiYobi5fX2M9dm9pZCAwLHUoKSkscj10fWZ1bmN0aW9uIEIobil7dmFyIHQ9cjtuLl9fYz1uLl9fKCkscj10fWZ1bmN0aW9uIEMobix0KXtyZXR1cm4hbnx8bi5sZW5ndGghPT10Lmxlbmd0aHx8dC5zb21lKGZ1bmN0aW9uKHQscil7cmV0dXJuIHQhPT1uW3JdfSl9ZnVuY3Rpb24gRChuLHQpe3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIHQ/dChuKTp0fWV4cG9ydHtxIGFzIHVzZUNhbGxiYWNrLHggYXMgdXNlQ29udGV4dCxQIGFzIHVzZURlYnVnVmFsdWUseSBhcyB1c2VFZmZlY3QsYiBhcyB1c2VFcnJvckJvdW5kYXJ5LGcgYXMgdXNlSWQsRiBhcyB1c2VJbXBlcmF0aXZlSGFuZGxlLF8gYXMgdXNlTGF5b3V0RWZmZWN0LFQgYXMgdXNlTWVtbyxoIGFzIHVzZVJlZHVjZXIsQSBhcyB1c2VSZWYsZCBhcyB1c2VTdGF0ZX07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1ob29rcy5tb2R1bGUuanMubWFwXG4iLCJpbXBvcnR7b3B0aW9ucyBhcyByLEZyYWdtZW50IGFzIGV9ZnJvbVwicHJlYWN0XCI7ZXhwb3J0e0ZyYWdtZW50fWZyb21cInByZWFjdFwiO3ZhciB0PS9bXCImPF0vO2Z1bmN0aW9uIG4ocil7aWYoMD09PXIubGVuZ3RofHwhMT09PXQudGVzdChyKSlyZXR1cm4gcjtmb3IodmFyIGU9MCxuPTAsbz1cIlwiLGY9XCJcIjtuPHIubGVuZ3RoO24rKyl7c3dpdGNoKHIuY2hhckNvZGVBdChuKSl7Y2FzZSAzNDpmPVwiJnF1b3Q7XCI7YnJlYWs7Y2FzZSAzODpmPVwiJmFtcDtcIjticmVhaztjYXNlIDYwOmY9XCImbHQ7XCI7YnJlYWs7ZGVmYXVsdDpjb250aW51ZX1uIT09ZSYmKG8rPXIuc2xpY2UoZSxuKSksbys9ZixlPW4rMX1yZXR1cm4gbiE9PWUmJihvKz1yLnNsaWNlKGUsbikpLG99dmFyIG89L2FjaXR8ZXgoPzpzfGd8bnxwfCQpfHJwaHxncmlkfG93c3xtbmN8bnR3fGluZVtjaF18em9vfF5vcmR8aXRlcmEvaSxmPTAsaT1BcnJheS5pc0FycmF5O2Z1bmN0aW9uIHUoZSx0LG4sbyxpLHUpe3R8fCh0PXt9KTt2YXIgYSxjLHA9dDtpZihcInJlZlwiaW4gcClmb3IoYyBpbiBwPXt9LHQpXCJyZWZcIj09Yz9hPXRbY106cFtjXT10W2NdO3ZhciBsPXt0eXBlOmUscHJvcHM6cCxrZXk6bixyZWY6YSxfX2s6bnVsbCxfXzpudWxsLF9fYjowLF9fZTpudWxsLF9fYzpudWxsLGNvbnN0cnVjdG9yOnZvaWQgMCxfX3Y6LS1mLF9faTotMSxfX3U6MCxfX3NvdXJjZTppLF9fc2VsZjp1fTtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBlJiYoYT1lLmRlZmF1bHRQcm9wcykpZm9yKGMgaW4gYSl2b2lkIDA9PT1wW2NdJiYocFtjXT1hW2NdKTtyZXR1cm4gci52bm9kZSYmci52bm9kZShsKSxsfWZ1bmN0aW9uIGEocil7dmFyIHQ9dShlLHt0cGw6cixleHByczpbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywxKX0pO3JldHVybiB0LmtleT10Ll9fdix0fXZhciBjPXt9LHA9L1tBLVpdL2c7ZnVuY3Rpb24gbChlLHQpe2lmKHIuYXR0cil7dmFyIGY9ci5hdHRyKGUsdCk7aWYoXCJzdHJpbmdcIj09dHlwZW9mIGYpcmV0dXJuIGZ9aWYodD1mdW5jdGlvbihyKXtyZXR1cm4gbnVsbCE9PXImJlwib2JqZWN0XCI9PXR5cGVvZiByJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiByLnZhbHVlT2Y/ci52YWx1ZU9mKCk6cn0odCksXCJyZWZcIj09PWV8fFwia2V5XCI9PT1lKXJldHVyblwiXCI7aWYoXCJzdHlsZVwiPT09ZSYmXCJvYmplY3RcIj09dHlwZW9mIHQpe3ZhciBpPVwiXCI7Zm9yKHZhciB1IGluIHQpe3ZhciBhPXRbdV07aWYobnVsbCE9YSYmXCJcIiE9PWEpe3ZhciBsPVwiLVwiPT11WzBdP3U6Y1t1XXx8KGNbdV09dS5yZXBsYWNlKHAsXCItJCZcIikudG9Mb3dlckNhc2UoKSkscz1cIjtcIjtcIm51bWJlclwiIT10eXBlb2YgYXx8bC5zdGFydHNXaXRoKFwiLS1cIil8fG8udGVzdChsKXx8KHM9XCJweDtcIiksaT1pK2wrXCI6XCIrYStzfX1yZXR1cm4gZSsnPVwiJytuKGkpKydcIid9cmV0dXJuIG51bGw9PXR8fCExPT09dHx8XCJmdW5jdGlvblwiPT10eXBlb2YgdHx8XCJvYmplY3RcIj09dHlwZW9mIHQ/XCJcIjohMD09PXQ/ZTplKyc9XCInK24oXCJcIit0KSsnXCInfWZ1bmN0aW9uIHMocil7aWYobnVsbD09cnx8XCJib29sZWFuXCI9PXR5cGVvZiByfHxcImZ1bmN0aW9uXCI9PXR5cGVvZiByKXJldHVybiBudWxsO2lmKFwib2JqZWN0XCI9PXR5cGVvZiByKXtpZih2b2lkIDA9PT1yLmNvbnN0cnVjdG9yKXJldHVybiByO2lmKGkocikpe2Zvcih2YXIgZT0wO2U8ci5sZW5ndGg7ZSsrKXJbZV09cyhyW2VdKTtyZXR1cm4gcn19cmV0dXJuIG4oXCJcIityKX1leHBvcnR7dSBhcyBqc3gsbCBhcyBqc3hBdHRyLHUgYXMganN4REVWLHMgYXMganN4RXNjYXBlLGEgYXMganN4VGVtcGxhdGUsdSBhcyBqc3hzfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWpzeFJ1bnRpbWUubW9kdWxlLmpzLm1hcFxuIiwiaW1wb3J0IHsgY3JlYXRlQ29udGV4dCB9IGZyb20gJ3ByZWFjdCdcbmltcG9ydCB7IHVzZUNvbnRleHQgfSBmcm9tICdwcmVhY3QvaG9va3MnXG5pbXBvcnQgdHlwZSB7IFNldHRpbmdzU3RvcmUgfSBmcm9tICcuLi8uLi9hcHBsaWNhdGlvbi9zZXR0aW5ncy9zZXR0aW5nc1N0b3JlJ1xuXG5jb25zdCBTZXR0aW5nc0NvbnRleHQgPSBjcmVhdGVDb250ZXh0PFNldHRpbmdzU3RvcmUgfCBudWxsPihudWxsKVxuXG5pbnRlcmZhY2UgU2V0dGluZ3NQcm92aWRlclByb3BzIHtcbiAgc2V0dGluZ3M6IFNldHRpbmdzU3RvcmVcbiAgY2hpbGRyZW46IHByZWFjdC5Db21wb25lbnRDaGlsZHJlblxufVxuXG5leHBvcnQgZnVuY3Rpb24gU2V0dGluZ3NQcm92aWRlcih7IHNldHRpbmdzLCBjaGlsZHJlbiB9OiBTZXR0aW5nc1Byb3ZpZGVyUHJvcHMpIHtcbiAgcmV0dXJuIDxTZXR0aW5nc0NvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3NldHRpbmdzfT57Y2hpbGRyZW59PC9TZXR0aW5nc0NvbnRleHQuUHJvdmlkZXI+XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VTZXR0aW5ncygpOiBTZXR0aW5nc1N0b3JlIHtcbiAgY29uc3Qgc2V0dGluZ3MgPSB1c2VDb250ZXh0KFNldHRpbmdzQ29udGV4dClcbiAgLyogdjggaWdub3JlIG5leHQgMyAqL1xuICBpZiAoIXNldHRpbmdzKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd1c2VTZXR0aW5ncyBtdXN0IGJlIHVzZWQgd2l0aGluIGEgU2V0dGluZ3NQcm92aWRlcicpXG4gIH1cbiAgcmV0dXJuIHNldHRpbmdzXG59XG4iLCIvLyBQYXJhbGxheCBjYW1lcmEgYW5nbGVzIGluIGRlZ3JlZXNcbmV4cG9ydCBlbnVtIFBhcmFsbGF4IHtcbiAgT3ZlcmhlYWQgPSAwLFxuICBTbGlnaHRfMjAgPSAyMCxcbiAgU2xpZ2h0XzMwID0gMzAsXG4gIE1lZGl1bV80MCA9IDQwLFxuICBNZWRpdW1fNTAgPSA1MCxcbiAgU3Ryb25nXzYwID0gNjAsXG4gIFN0cm9uZ182NSA9IDY1LFxuICBTdHJvbmdfNzAgPSA3MCxcbiAgRXh0cmVtZV84MCA9IDgwLFxufVxuXG4vLyBIb3ZlciBtb2RlIG9zY2lsbGF0aW9uIHNjYWxlc1xuZXhwb3J0IGVudW0gSG92ZXJNb2RlIHtcbiAgT2ZmID0gJ29mZicsXG4gIFNtYWxsID0gJ3NtYWxsJyxcbiAgTGFyZ2UgPSAnbGFyZ2UnLFxuICBTdXBlciA9ICdzdXBlcicsXG59XG5cbi8vIFBpZWNlIHZpc3VhbCBzdHlsZXNcbmV4cG9ydCBlbnVtIFBpZWNlU3R5bGUge1xuICBJY29ucyA9ICdpY29ucycsXG4gIFRocmVlRCA9ICczZCcsXG4gIENoZWNrZXIgPSAnY2hlY2tlcicsXG4gIENoZWNrZXJHcmV5ID0gJ2NoZWNrZXItZ3JleScsXG4gIEJsaW5kZm9sZCA9ICdibGluZGZvbGQnLFxufVxuXG4vLyBCbHVyIGFtb3VudHMgaW4gcGl4ZWxzXG5leHBvcnQgZW51bSBCbHVyIHtcbiAgTm9uZSA9IDAsXG4gIFNsaWdodF8xID0gMSxcbiAgU2xpZ2h0XzIgPSAyLFxuICBNZWRpdW1fMyA9IDMsXG4gIE1lZGl1bV80ID0gNCxcbiAgSGVhdnlfNiA9IDYsXG4gIEhlYXZ5XzggPSA4LFxufVxuXG4vLyBCbGFjayBzZWdtZW50cyBxdWFkcmFudCBjb3ZlcmFnZVxuZXhwb3J0IGVudW0gQmxhY2tTZWdtZW50cyB7XG4gIE5vbmUgPSAnbm9uZScsXG4gIE9uZVF1YXJ0ZXIgPSAnMS80JyxcbiAgSGFsZiA9ICcxLzInLFxuICBUaHJlZVF1YXJ0ZXJzID0gJzMvNCcsXG4gIEFsbCA9ICc0LzQnLFxufVxuXG4vLyBCbGFjayBzZWdtZW50cyByb3RhdGlvbiB0aW1pbmdcbmV4cG9ydCBlbnVtIEJsYWNrU2VnbWVudHNUaW1pbmcge1xuICBSb3RhdGUxMHMgPSAncm90YXRlLTEwcycsXG4gIFJvdGF0ZTMwcyA9ICdyb3RhdGUtMzBzJyxcbiAgUm90YXRlNjBzID0gJ3JvdGF0ZS02MHMnLFxuICBEb250Um90YXRlID0gJ2RvbnQtcm90YXRlJyxcbn1cblxuLy8gRmxhc2ggZHVyYXRpb24gaW4gbWlsbGlzZWNvbmRzXG5leHBvcnQgZW51bSBGbGFzaER1cmF0aW9uIHtcbiAgTXMxMDAgPSAxMDAsXG4gIE1zMzAwID0gMzAwLFxuICBNczUwMCA9IDUwMCxcbiAgTXMxMDAwID0gMTAwMCxcbiAgTXMyMDAwID0gMjAwMCxcbn1cblxuLy8gRmxhc2ggaW50ZXJ2YWwgaW4gc2Vjb25kc1xuZXhwb3J0IGVudW0gRmxhc2hJbnRlcnZhbCB7XG4gIFNlYzBfMyA9IDAuMyxcbiAgU2VjMF81ID0gMC41LFxuICBTZWMxID0gMSxcbiAgU2VjMyA9IDMsXG4gIFNlYzUgPSA1LFxuICBTZWMxMCA9IDEwLFxuICBTZWMzMCA9IDMwLFxuICBTZWM2MCA9IDYwLFxufVxuXG4vLyBIZWxwZXIgZnVuY3Rpb25zIHRvIGdldCBhbGwgdmFsdWVzIGFzIGFycmF5cyBmb3IgU2V0dGluZ0J1dHRvbiBvcHRpb25zXG5leHBvcnQgY29uc3QgUEFSQUxMQVhfT1BUSU9OUyA9IE9iamVjdC52YWx1ZXMoUGFyYWxsYXgpLmZpbHRlcihcbiAgKHYpID0+IHR5cGVvZiB2ID09PSAnbnVtYmVyJ1xuKSBhcyBudW1iZXJbXVxuXG5leHBvcnQgY29uc3QgSE9WRVJfTU9ERV9PUFRJT05TID0gT2JqZWN0LnZhbHVlcyhIb3Zlck1vZGUpLmZpbHRlcihcbiAgKHYpID0+IHR5cGVvZiB2ID09PSAnc3RyaW5nJ1xuKSBhcyBzdHJpbmdbXVxuXG5leHBvcnQgY29uc3QgUElFQ0VfU1RZTEVfT1BUSU9OUyA9IE9iamVjdC52YWx1ZXMoUGllY2VTdHlsZSkuZmlsdGVyKFxuICAodikgPT4gdHlwZW9mIHYgPT09ICdzdHJpbmcnXG4pIGFzIHN0cmluZ1tdXG5cbmV4cG9ydCBjb25zdCBCTFVSX09QVElPTlMgPSBPYmplY3QudmFsdWVzKEJsdXIpLmZpbHRlcigodikgPT4gdHlwZW9mIHYgPT09ICdudW1iZXInKSBhcyBudW1iZXJbXVxuXG5leHBvcnQgY29uc3QgQkxBQ0tfU0VHTUVOVFNfT1BUSU9OUyA9IE9iamVjdC52YWx1ZXMoQmxhY2tTZWdtZW50cykuZmlsdGVyKFxuICAodikgPT4gdHlwZW9mIHYgPT09ICdzdHJpbmcnXG4pIGFzIHN0cmluZ1tdXG5cbmV4cG9ydCBjb25zdCBCTEFDS19TRUdNRU5UU19USU1JTkdfT1BUSU9OUyA9IE9iamVjdC52YWx1ZXMoQmxhY2tTZWdtZW50c1RpbWluZykuZmlsdGVyKFxuICAodikgPT4gdHlwZW9mIHYgPT09ICdzdHJpbmcnXG4pIGFzIHN0cmluZ1tdXG5cbmV4cG9ydCBjb25zdCBGTEFTSF9EVVJBVElPTl9PUFRJT05TID0gT2JqZWN0LnZhbHVlcyhGbGFzaER1cmF0aW9uKS5maWx0ZXIoXG4gICh2KSA9PiB0eXBlb2YgdiA9PT0gJ251bWJlcidcbikgYXMgbnVtYmVyW11cblxuZXhwb3J0IGNvbnN0IEZMQVNIX0lOVEVSVkFMX09QVElPTlMgPSBPYmplY3QudmFsdWVzKEZsYXNoSW50ZXJ2YWwpLmZpbHRlcihcbiAgKHYpID0+IHR5cGVvZiB2ID09PSAnbnVtYmVyJ1xuKSBhcyBudW1iZXJbXVxuIiwiaW50ZXJmYWNlIEFjdGlvbkJ1dHRvblByb3BzIHtcbiAgbGFiZWw6IHN0cmluZ1xuICBvbkNsaWNrOiAoKSA9PiB2b2lkXG59XG5cbmNvbnN0IGJ1dHRvblN0eWxlID0ge1xuICBtYXJnaW46ICc0cHgnLFxuICBwYWRkaW5nOiAnNnB4IDEycHgnLFxuICBib3JkZXI6ICcxcHggc29saWQgY3VycmVudENvbG9yJyxcbiAgYm9yZGVyUmFkaXVzOiAnNHB4JyxcbiAgYmFja2dyb3VuZENvbG9yOiAndHJhbnNwYXJlbnQnLFxuICBjb2xvcjogJ2luaGVyaXQnLFxuICBjdXJzb3I6ICdwb2ludGVyJyxcbiAgZm9udFNpemU6ICcxNHB4Jyxcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEFjdGlvbkJ1dHRvbih7IGxhYmVsLCBvbkNsaWNrIH06IEFjdGlvbkJ1dHRvblByb3BzKSB7XG4gIHJldHVybiAoXG4gICAgPGJ1dHRvbiBvbkNsaWNrPXtvbkNsaWNrfSB0eXBlPVwiYnV0dG9uXCIgc3R5bGU9e2J1dHRvblN0eWxlfT5cbiAgICAgIHtsYWJlbH1cbiAgICA8L2J1dHRvbj5cbiAgKVxufVxuIiwiaW1wb3J0IHR5cGUgeyBTaWduYWwgfSBmcm9tICdAcHJlYWN0L3NpZ25hbHMnXG5pbXBvcnQgdHlwZSB7IENvbXBvbmVudENoaWxkcmVuIH0gZnJvbSAncHJlYWN0J1xuXG5pbnRlcmZhY2UgQnV0dG9uUm93UHJvcHMge1xuICBjaGlsZHJlbjogQ29tcG9uZW50Q2hpbGRyZW5cbiAgdmlzaWJsZT86IFNpZ25hbDxib29sZWFuPlxufVxuXG5leHBvcnQgZnVuY3Rpb24gQnV0dG9uUm93KHsgY2hpbGRyZW4sIHZpc2libGUgfTogQnV0dG9uUm93UHJvcHMpIHtcbiAgaWYgKHZpc2libGUgJiYgIXZpc2libGUudmFsdWUpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgcmV0dXJuIDxkaXY+e2NoaWxkcmVufTwvZGl2PlxufVxuIiwiaW1wb3J0IHR5cGUgeyBDb21wb25lbnRDaGlsZHJlbiB9IGZyb20gJ3ByZWFjdCdcblxuaW50ZXJmYWNlIENvbmRpdGlvbmFsQ29udHJvbHNQcm9wcyB7XG4gIGNvbmRpdGlvbjogYm9vbGVhblxuICBjaGlsZHJlbjogQ29tcG9uZW50Q2hpbGRyZW5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIENvbmRpdGlvbmFsQ29udHJvbHMoeyBjb25kaXRpb24sIGNoaWxkcmVuIH06IENvbmRpdGlvbmFsQ29udHJvbHNQcm9wcykge1xuICBpZiAoIWNvbmRpdGlvbikge1xuICAgIHJldHVybiBudWxsXG4gIH1cblxuICByZXR1cm4gPGRpdiBzdHlsZT17eyBtYXJnaW5MZWZ0OiAnMTZweCcgfX0+e2NoaWxkcmVufTwvZGl2PlxufVxuIiwiaW1wb3J0IHR5cGUgeyBTaWduYWwgfSBmcm9tICdAcHJlYWN0L3NpZ25hbHMnXG5cbmludGVyZmFjZSBTZXR0aW5nQnV0dG9uUHJvcHM8VD4ge1xuICBsYWJlbDogc3RyaW5nXG4gIHNldHRpbmc6IFNpZ25hbDxUPlxuICBvcHRpb25zOiByZWFkb25seSBUW11cbn1cblxuY29uc3QgYnV0dG9uU3R5bGUgPSB7XG4gIG1hcmdpbjogJzRweCcsXG4gIHBhZGRpbmc6ICc2cHggMTJweCcsXG4gIGJvcmRlcjogJzFweCBzb2xpZCBjdXJyZW50Q29sb3InLFxuICBib3JkZXJSYWRpdXM6ICc0cHgnLFxuICBiYWNrZ3JvdW5kQ29sb3I6ICd0cmFuc3BhcmVudCcsXG4gIGNvbG9yOiAnaW5oZXJpdCcsXG4gIGN1cnNvcjogJ3BvaW50ZXInLFxuICBmb250U2l6ZTogJzE0cHgnLFxufVxuXG5leHBvcnQgZnVuY3Rpb24gU2V0dGluZ0J1dHRvbjxUPih7IGxhYmVsLCBzZXR0aW5nLCBvcHRpb25zIH06IFNldHRpbmdCdXR0b25Qcm9wczxUPikge1xuICBjb25zdCBoYW5kbGVDbGljayA9ICgpID0+IHtcbiAgICBjb25zdCBjdXJyZW50SW5kZXggPSBvcHRpb25zLmluZGV4T2Yoc2V0dGluZy52YWx1ZSlcbiAgICBjb25zdCBuZXh0SW5kZXggPSAoY3VycmVudEluZGV4ICsgMSkgJSBvcHRpb25zLmxlbmd0aFxuICAgIHNldHRpbmcudmFsdWUgPSBvcHRpb25zW25leHRJbmRleF1cbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGJ1dHRvbiBvbkNsaWNrPXtoYW5kbGVDbGlja30gdHlwZT1cImJ1dHRvblwiIHN0eWxlPXtidXR0b25TdHlsZX0+XG4gICAgICB7bGFiZWx9OiB7U3RyaW5nKHNldHRpbmcudmFsdWUpfVxuICAgIDwvYnV0dG9uPlxuICApXG59XG4iLCJpbXBvcnQgeyBoYW5kbGVTcGVlY2hDb21tYW5kIH0gZnJvbSAnLi4vLi4vYXBwbGljYXRpb24vaGFuZGxlcnMvaGFuZGxlU3BlZWNoQ29tbWFuZCdcbmltcG9ydCB7IFNwZWVjaENvbW1hbmQgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvY29tbWFuZHMnXG5pbXBvcnQgeyB1c2VTZXR0aW5ncyB9IGZyb20gJy4uL2NvbnRleHRzL1NldHRpbmdzQ29udGV4dCdcbmltcG9ydCB7IEFjdGlvbkJ1dHRvbiB9IGZyb20gJy4vQWN0aW9uQnV0dG9uJ1xuaW1wb3J0IHsgQnV0dG9uUm93IH0gZnJvbSAnLi9CdXR0b25Sb3cnXG5pbXBvcnQgeyBTZXR0aW5nQnV0dG9uIH0gZnJvbSAnLi9TZXR0aW5nQnV0dG9uJ1xuXG5jb25zdCBTUEVBS19SQVRFX09QVElPTlMgPSBbMC4yLCAwLjUsIDAuNywgMS4wLCAxLjEsIDEuMl0gYXMgY29uc3RcblxuZXhwb3J0IGZ1bmN0aW9uIFNwZWVjaEJ1dHRvbnMoKSB7XG4gIGNvbnN0IHNldHRpbmdzID0gdXNlU2V0dGluZ3MoKVxuXG4gIHJldHVybiAoXG4gICAgPGRpdj5cbiAgICAgIDxCdXR0b25Sb3c+XG4gICAgICAgIDxBY3Rpb25CdXR0b25cbiAgICAgICAgICBsYWJlbD1cIvCflIog4pmUIHNpZGVcIlxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVNwZWVjaENvbW1hbmQoU3BlZWNoQ29tbWFuZC5XSywgc2V0dGluZ3MpfVxuICAgICAgICAvPlxuICAgICAgICA8QWN0aW9uQnV0dG9uXG4gICAgICAgICAgbGFiZWw9XCLwn5SKIOKZlSBzaWRlXCJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVTcGVlY2hDb21tYW5kKFNwZWVjaENvbW1hbmQuV1EsIHNldHRpbmdzKX1cbiAgICAgICAgLz5cbiAgICAgICAgPEFjdGlvbkJ1dHRvblxuICAgICAgICAgIGxhYmVsPVwi8J+UiiDimZogc2lkZVwiXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlU3BlZWNoQ29tbWFuZChTcGVlY2hDb21tYW5kLkJLLCBzZXR0aW5ncyl9XG4gICAgICAgIC8+XG4gICAgICAgIDxBY3Rpb25CdXR0b25cbiAgICAgICAgICBsYWJlbD1cIvCflIog4pmbIHNpZGVcIlxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVNwZWVjaENvbW1hbmQoU3BlZWNoQ29tbWFuZC5CUSwgc2V0dGluZ3MpfVxuICAgICAgICAvPlxuICAgICAgPC9CdXR0b25Sb3c+XG5cbiAgICAgIDxCdXR0b25Sb3c+XG4gICAgICAgIDxBY3Rpb25CdXR0b25cbiAgICAgICAgICBsYWJlbD1cIvCflIogYWxsIHBpZWNlc1wiXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlU3BlZWNoQ29tbWFuZChTcGVlY2hDb21tYW5kLkFMTCwgc2V0dGluZ3MpfVxuICAgICAgICAvPlxuICAgICAgICA8QWN0aW9uQnV0dG9uXG4gICAgICAgICAgbGFiZWw9XCLwn5SKIHcncyBwaWVjZXNcIlxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVNwZWVjaENvbW1hbmQoU3BlZWNoQ29tbWFuZC5XSElURSwgc2V0dGluZ3MpfVxuICAgICAgICAvPlxuICAgICAgICA8QWN0aW9uQnV0dG9uXG4gICAgICAgICAgbGFiZWw9XCLwn5SKIGIncyBwaWVjZXNcIlxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVNwZWVjaENvbW1hbmQoU3BlZWNoQ29tbWFuZC5CTEFDSywgc2V0dGluZ3MpfVxuICAgICAgICAvPlxuICAgICAgPC9CdXR0b25Sb3c+XG5cbiAgICAgIDxCdXR0b25Sb3c+XG4gICAgICAgIDxTZXR0aW5nQnV0dG9uIGxhYmVsPVwi8J+UiiByYXRlXCIgc2V0dGluZz17c2V0dGluZ3Muc3BlYWtSYXRlfSBvcHRpb25zPXtTUEVBS19SQVRFX09QVElPTlN9IC8+XG4gICAgICAgIDxBY3Rpb25CdXR0b25cbiAgICAgICAgICBsYWJlbD1cIvCflIogU3RvcFwiXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlU3BlZWNoQ29tbWFuZChTcGVlY2hDb21tYW5kLlNUT1AsIHNldHRpbmdzKX1cbiAgICAgICAgLz5cbiAgICAgIDwvQnV0dG9uUm93PlxuICAgIDwvZGl2PlxuICApXG59XG4iLCJpbXBvcnQgdHlwZSB7IFNpZ25hbCB9IGZyb20gJ0BwcmVhY3Qvc2lnbmFscydcbmltcG9ydCB7XG4gIEJMQUNLX1NFR01FTlRTX09QVElPTlMsXG4gIEJMQUNLX1NFR01FTlRTX1RJTUlOR19PUFRJT05TLFxuICBCTFVSX09QVElPTlMsXG4gIEZMQVNIX0RVUkFUSU9OX09QVElPTlMsXG4gIEZMQVNIX0lOVEVSVkFMX09QVElPTlMsXG4gIEhPVkVSX01PREVfT1BUSU9OUyxcbiAgUEFSQUxMQVhfT1BUSU9OUyxcbiAgUElFQ0VfU1RZTEVfT1BUSU9OUyxcbn0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL29wdGlvbnMnXG5pbXBvcnQgeyB1c2VTZXR0aW5ncyB9IGZyb20gJy4uL2NvbnRleHRzL1NldHRpbmdzQ29udGV4dCdcbmltcG9ydCB7IEFjdGlvbkJ1dHRvbiB9IGZyb20gJy4vQWN0aW9uQnV0dG9uJ1xuaW1wb3J0IHsgQnV0dG9uUm93IH0gZnJvbSAnLi9CdXR0b25Sb3cnXG5pbXBvcnQgeyBDb25kaXRpb25hbENvbnRyb2xzIH0gZnJvbSAnLi9Db25kaXRpb25hbENvbnRyb2xzJ1xuaW1wb3J0IHsgU2V0dGluZ0J1dHRvbiB9IGZyb20gJy4vU2V0dGluZ0J1dHRvbidcbmltcG9ydCB7IFNwZWVjaEJ1dHRvbnMgfSBmcm9tICcuL1NwZWVjaEJ1dHRvbnMnXG5cbmludGVyZmFjZSBDb250cm9sUGFuZWxQcm9wcyB7XG4gIGJvYXJkQ2hhbmdlZDogU2lnbmFsPG51bWJlcj5cbn1cblxuY29uc3QgVE9HR0xFX09QVElPTlMgPSBbZmFsc2UsIHRydWVdIGFzIGNvbnN0XG5cbmV4cG9ydCBmdW5jdGlvbiBDb250cm9sUGFuZWwoeyBib2FyZENoYW5nZWQgfTogQ29udHJvbFBhbmVsUHJvcHMpIHtcbiAgY29uc3Qgc2V0dGluZ3MgPSB1c2VTZXR0aW5ncygpXG5cbiAgLy8gVXNlIGJvYXJkQ2hhbmdlZCB0byBlbnN1cmUgY29tcG9uZW50IHJlLXJlbmRlcnMgd2hlbiBib2FyZCBjaGFuZ2VzXG4gIGJvYXJkQ2hhbmdlZC52YWx1ZVxuXG4gIHJldHVybiAoXG4gICAgPGRpdj5cbiAgICAgIHsvKiBTcGVlY2ggQnV0dG9ucyAtIEFsd2F5cyBWaXNpYmxlICovfVxuICAgICAgPFNwZWVjaEJ1dHRvbnMgLz5cblxuICAgICAgey8qIE1haW4gQ29udHJvbHMgLSBBbHdheXMgVmlzaWJsZSAqL31cbiAgICAgIDxCdXR0b25Sb3c+XG4gICAgICAgIDxTZXR0aW5nQnV0dG9uIGxhYmVsPVwiUGllY2VzIExpc3RcIiBzZXR0aW5nPXtzZXR0aW5ncy5waWVjZXNMaXN0RW5hYmxlZH0gb3B0aW9ucz17VE9HR0xFX09QVElPTlN9IC8+XG4gICAgICAgIDxBY3Rpb25CdXR0b25cbiAgICAgICAgICBsYWJlbD1cIkFubm90YXRlIEJvYXJkXCJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAvLyBUT0RPOiBGb2N1cyBtb3ZlIGlucHV0IG9yIHRyaWdnZXIgYW5ub3RhdGlvbiBtb2RlXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQW5ub3RhdGUgQm9hcmQgY2xpY2tlZCcpXG4gICAgICAgICAgfX1cbiAgICAgICAgLz5cbiAgICAgICAgPFNldHRpbmdCdXR0b24gbGFiZWw9XCJEaXZpZGVyc1wiIHNldHRpbmc9e3NldHRpbmdzLmRpdmlkZXJzRW5hYmxlZH0gb3B0aW9ucz17VE9HR0xFX09QVElPTlN9IC8+XG4gICAgICAgIDxTZXR0aW5nQnV0dG9uXG4gICAgICAgICAgbGFiZWw9XCJDdXN0b20gQm9hcmRcIlxuICAgICAgICAgIHNldHRpbmc9e3NldHRpbmdzLmN1c3RvbUJvYXJkRW5hYmxlZH1cbiAgICAgICAgICBvcHRpb25zPXtUT0dHTEVfT1BUSU9OU31cbiAgICAgICAgLz5cbiAgICAgICAgPFNldHRpbmdCdXR0b24gbGFiZWw9XCJGbGFzaCBNb2RlXCIgc2V0dGluZz17c2V0dGluZ3MuZmxhc2hNb2RlRW5hYmxlZH0gb3B0aW9ucz17VE9HR0xFX09QVElPTlN9IC8+XG4gICAgICA8L0J1dHRvblJvdz5cblxuICAgICAgey8qIEN1c3RvbSBCb2FyZCBOZXN0ZWQgQ29udHJvbHMgKi99XG4gICAgICA8Q29uZGl0aW9uYWxDb250cm9scyBjb25kaXRpb249e3NldHRpbmdzLmN1c3RvbUJvYXJkRW5hYmxlZC52YWx1ZX0+XG4gICAgICAgIDxCdXR0b25Sb3c+XG4gICAgICAgICAgPFNldHRpbmdCdXR0b25cbiAgICAgICAgICAgIGxhYmVsPVwiT2JmdXNjYXRpb25zXCJcbiAgICAgICAgICAgIHNldHRpbmc9e3NldHRpbmdzLm9iZnVzY2F0aW9uc0VuYWJsZWR9XG4gICAgICAgICAgICBvcHRpb25zPXtUT0dHTEVfT1BUSU9OU31cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxTZXR0aW5nQnV0dG9uIGxhYmVsPVwiUGFyYWxsYXhcIiBzZXR0aW5nPXtzZXR0aW5ncy5wYXJhbGxheH0gb3B0aW9ucz17UEFSQUxMQVhfT1BUSU9OU30gLz5cbiAgICAgICAgICA8U2V0dGluZ0J1dHRvbiBsYWJlbD1cIkhvdmVyIE1vZGVcIiBzZXR0aW5nPXtzZXR0aW5ncy5ob3Zlck1vZGV9IG9wdGlvbnM9e0hPVkVSX01PREVfT1BUSU9OU30gLz5cbiAgICAgICAgPC9CdXR0b25Sb3c+XG5cbiAgICAgICAgey8qIE9iZnVzY2F0aW9ucyBOZXN0ZWQgQ29udHJvbHMgKi99XG4gICAgICAgIDxDb25kaXRpb25hbENvbnRyb2xzIGNvbmRpdGlvbj17c2V0dGluZ3Mub2JmdXNjYXRpb25zRW5hYmxlZC52YWx1ZX0+XG4gICAgICAgICAgPEJ1dHRvblJvdz5cbiAgICAgICAgICAgIDxTZXR0aW5nQnV0dG9uIGxhYmVsPVwiUGllY2UgU3R5bGVcIiBzZXR0aW5nPXtzZXR0aW5ncy5waWVjZVN0eWxlfSBvcHRpb25zPXtQSUVDRV9TVFlMRV9PUFRJT05TfSAvPlxuICAgICAgICAgICAgPFNldHRpbmdCdXR0b24gbGFiZWw9XCJCbHVyXCIgc2V0dGluZz17c2V0dGluZ3MuYmx1cn0gb3B0aW9ucz17QkxVUl9PUFRJT05TfSAvPlxuICAgICAgICAgICAgPFNldHRpbmdCdXR0b25cbiAgICAgICAgICAgICAgbGFiZWw9XCJCbGFjayBTZWdtZW50c1wiXG4gICAgICAgICAgICAgIHNldHRpbmc9e3NldHRpbmdzLmJsYWNrU2VnbWVudHN9XG4gICAgICAgICAgICAgIG9wdGlvbnM9e0JMQUNLX1NFR01FTlRTX09QVElPTlN9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvQnV0dG9uUm93PlxuXG4gICAgICAgICAgey8qIEJsYWNrIFNlZ21lbnRzIFRpbWluZyAtIG9ubHkgd2hlbiBub3QgJ25vbmUnICovfVxuICAgICAgICAgIDxDb25kaXRpb25hbENvbnRyb2xzIGNvbmRpdGlvbj17c2V0dGluZ3MuYmxhY2tTZWdtZW50cy52YWx1ZSAhPT0gJ25vbmUnfT5cbiAgICAgICAgICAgIDxCdXR0b25Sb3c+XG4gICAgICAgICAgICAgIDxTZXR0aW5nQnV0dG9uXG4gICAgICAgICAgICAgICAgbGFiZWw9XCJUaW1pbmdcIlxuICAgICAgICAgICAgICAgIHNldHRpbmc9e3NldHRpbmdzLmJsYWNrU2VnbWVudHNUaW1pbmd9XG4gICAgICAgICAgICAgICAgb3B0aW9ucz17QkxBQ0tfU0VHTUVOVFNfVElNSU5HX09QVElPTlN9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L0J1dHRvblJvdz5cbiAgICAgICAgICA8L0NvbmRpdGlvbmFsQ29udHJvbHM+XG4gICAgICAgIDwvQ29uZGl0aW9uYWxDb250cm9scz5cbiAgICAgIDwvQ29uZGl0aW9uYWxDb250cm9scz5cblxuICAgICAgey8qIEZsYXNoIE1vZGUgTmVzdGVkIENvbnRyb2xzICovfVxuICAgICAgPENvbmRpdGlvbmFsQ29udHJvbHMgY29uZGl0aW9uPXtzZXR0aW5ncy5mbGFzaE1vZGVFbmFibGVkLnZhbHVlfT5cbiAgICAgICAgPEJ1dHRvblJvdz5cbiAgICAgICAgICA8U2V0dGluZ0J1dHRvblxuICAgICAgICAgICAgbGFiZWw9XCJGbGFzaCBEdXJhdGlvblwiXG4gICAgICAgICAgICBzZXR0aW5nPXtzZXR0aW5ncy5mbGFzaER1cmF0aW9ufVxuICAgICAgICAgICAgb3B0aW9ucz17RkxBU0hfRFVSQVRJT05fT1BUSU9OU31cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxTZXR0aW5nQnV0dG9uIGxhYmVsPVwiRmxhc2ggSW50ZXJ2YWxcIiBzZXR0aW5nPXtzZXR0aW5ncy5mbGFzaEludGVydmFsfSBvcHRpb25zPXtGTEFTSF9JTlRFUlZBTF9PUFRJT05TfSAvPlxuICAgICAgICA8L0J1dHRvblJvdz5cbiAgICAgIDwvQ29uZGl0aW9uYWxDb250cm9scz5cbiAgICA8L2Rpdj5cbiAgKVxufVxuIiwiaW1wb3J0IHR5cGUgeyBTaWduYWwgfSBmcm9tICdAcHJlYWN0L3NpZ25hbHMtY29yZSdcbmltcG9ydCB7IHJlbmRlciB9IGZyb20gJ3ByZWFjdCdcbmltcG9ydCB0eXBlIHsgU2V0dGluZ3NTdG9yZSB9IGZyb20gJy4uLy4uL2FwcGxpY2F0aW9uL3NldHRpbmdzL3NldHRpbmdzU3RvcmUnXG5pbXBvcnQgeyBTZXR0aW5nc1Byb3ZpZGVyIH0gZnJvbSAnLi4vY29udGV4dHMvU2V0dGluZ3NDb250ZXh0J1xuaW1wb3J0IHsgQ29udHJvbFBhbmVsIH0gZnJvbSAnLi9Db250cm9sUGFuZWwnXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVSb290KFxuICBib2FyZENoYW5nZWQ6IFNpZ25hbDxudW1iZXI+LFxuICBtb3VudFBvaW50OiBIVE1MRWxlbWVudCxcbiAgc2V0dGluZ3M6IFNldHRpbmdzU3RvcmVcbik6IHZvaWQge1xuICByZW5kZXIoXG4gICAgPFNldHRpbmdzUHJvdmlkZXIgc2V0dGluZ3M9e3NldHRpbmdzfT5cbiAgICAgIDxDb250cm9sUGFuZWwgYm9hcmRDaGFuZ2VkPXtib2FyZENoYW5nZWR9IC8+XG4gICAgPC9TZXR0aW5nc1Byb3ZpZGVyPixcbiAgICBtb3VudFBvaW50XG4gIClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlc3Ryb3lSb290KG1vdW50UG9pbnQ6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gIHJlbmRlcihudWxsLCBtb3VudFBvaW50KVxufVxuIiwiaW1wb3J0IHsgQ3NzQ2xhc3MsIENzc0Rpc3BsYXksIERvbVNlbGVjdG9yIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL2RvbSdcbmltcG9ydCB7IGFwcGVuZENoaWxkLCBjcmVhdGVEaXYsIHF1ZXJ5U2VsZWN0b3IgfSBmcm9tICcuLi8uLi9wbGF0Zm9ybS9kb20nXG5cbmV4cG9ydCBpbnRlcmZhY2UgRmxhc2hPdmVybGF5U3RhdGUge1xuICBvdmVybGF5OiBIVE1MRWxlbWVudFxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRmxhc2hPdmVybGF5KCk6IEZsYXNoT3ZlcmxheVN0YXRlIHtcbiAgY29uc3Qgb3ZlcmxheSA9IGNyZWF0ZURpdigpXG4gIG92ZXJsYXkuY2xhc3NOYW1lID0gQ3NzQ2xhc3MuVVNFUlNDUklQVF9GTEFTSFxuICBvdmVybGF5LnN0eWxlLmNzc1RleHQgPSBgXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMDtcbiAgICBsZWZ0OiAwO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICBiYWNrZ3JvdW5kOiBibGFjaztcbiAgICB6LWluZGV4OiAxMDAwO1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIGBcblxuICBjb25zdCBjb250YWluZXIgPSBxdWVyeVNlbGVjdG9yKERvbVNlbGVjdG9yLkNPTlRBSU5FUilcbiAgaWYgKGNvbnRhaW5lcikge1xuICAgIGFwcGVuZENoaWxkKGNvbnRhaW5lciwgb3ZlcmxheSlcbiAgfVxuXG4gIHJldHVybiB7IG92ZXJsYXkgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvd0ZsYXNoKHN0YXRlOiBGbGFzaE92ZXJsYXlTdGF0ZSk6IHZvaWQge1xuICBzdGF0ZS5vdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBDc3NEaXNwbGF5LkJMT0NLXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoaWRlRmxhc2goc3RhdGU6IEZsYXNoT3ZlcmxheVN0YXRlKTogdm9pZCB7XG4gIHN0YXRlLm92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IENzc0Rpc3BsYXkuTk9ORVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVzdHJveUZsYXNoT3ZlcmxheShzdGF0ZTogRmxhc2hPdmVybGF5U3RhdGUpOiB2b2lkIHtcbiAgc3RhdGUub3ZlcmxheS5yZW1vdmUoKVxufVxuIiwiaW1wb3J0IHsgc2lnbmFsIH0gZnJvbSAnQHByZWFjdC9zaWduYWxzLWNvcmUnXG5pbXBvcnQgeyBzZXR1cERpdmlkZXJzRWZmZWN0IH0gZnJvbSAnLi9hcHBsaWNhdGlvbi9lZmZlY3RzL29uRGl2aWRlcnMnXG5pbXBvcnQgeyBzZXR1cEtleWJvYXJkQ29tbWFuZHMsIHRlYXJkb3duS2V5Ym9hcmRDb21tYW5kcyB9IGZyb20gJy4vYXBwbGljYXRpb24vaW5wdXQva2V5Ym9hcmRJbnB1dCdcbmltcG9ydCB7XG4gIGNyZWF0ZUJvYXJkT2JzZXJ2ZXIsXG4gIHN0YXJ0Qm9hcmRPYnNlcnZlcixcbiAgc3RvcEJvYXJkT2JzZXJ2ZXIsXG59IGZyb20gJy4vYXBwbGljYXRpb24vb2JzZXJ2ZXJzL29ic2VydmVyU3RhdGUnXG5pbXBvcnQge1xuICBjcmVhdGVTZXR0aW5nc1N0b3JlLFxuICBsb2FkU2V0dGluZ3MsXG4gIHNldHVwQXV0b1NhdmUsXG59IGZyb20gJy4vYXBwbGljYXRpb24vc2V0dGluZ3Mvc2V0dGluZ3NTdG9yZSdcbmltcG9ydCB7IERvbVNlbGVjdG9yIH0gZnJvbSAnLi9jb25zdGFudHMvZG9tJ1xuaW1wb3J0IHsgYXBwZW5kQ2hpbGQsIGNyZWF0ZURpdiwgcXVlcnlTZWxlY3Rvciwgd2FpdEZvckVsZW1lbnQgfSBmcm9tICcuL3BsYXRmb3JtL2RvbSdcbmltcG9ydCB7IGNyZWF0ZVJvb3QsIGRlc3Ryb3lSb290IH0gZnJvbSAnLi9wcmVzZW50YXRpb24vY29tcG9uZW50cy9yb290J1xuaW1wb3J0IHsgY3JlYXRlRGl2aWRlcnMsIGRlc3Ryb3lEaXZpZGVycyB9IGZyb20gJy4vcHJlc2VudGF0aW9uL25vbi1wcmVhY3QtY29tcG9uZW50cy9kaXZpZGVycydcbmltcG9ydCB7IGNyZWF0ZUZsYXNoT3ZlcmxheSwgZGVzdHJveUZsYXNoT3ZlcmxheSB9IGZyb20gJy4vcHJlc2VudGF0aW9uL25vbi1wcmVhY3QtY29tcG9uZW50cy9mbGFzaCdcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGluaXQoKSB7XG4gIC8vIFdhaXQgZm9yIGxpY2hlc3MgdG8gbG9hZCB0aGUgYm9hcmRcbiAgYXdhaXQgd2FpdEZvckVsZW1lbnQoRG9tU2VsZWN0b3IuS0VZQk9BUkRfTU9WRSlcblxuICAvLyBJbml0aWFsaXplIHNldHRpbmdzXG4gIGNvbnN0IHNldHRpbmdzID0gY3JlYXRlU2V0dGluZ3NTdG9yZSgpXG4gIGxvYWRTZXR0aW5ncyhzZXR0aW5ncylcbiAgc2V0dXBBdXRvU2F2ZShzZXR0aW5ncylcblxuICAvLyBDcmVhdGUgc2hhcmVkIGJvYXJkIGNoYW5nZSBzaWduYWxcbiAgY29uc3QgYm9hcmRDaGFuZ2VkID0gc2lnbmFsKDApXG5cbiAgLy8gQ3JlYXRlIERPTSBzdGF0ZVxuICBjb25zdCBmbGFzaFN0YXRlID0gY3JlYXRlRmxhc2hPdmVybGF5KClcbiAgY29uc3QgZGl2aWRlcnNTdGF0ZSA9IGNyZWF0ZURpdmlkZXJzKClcbiAgY29uc3QgYm9hcmRPYnNlcnZlclN0YXRlID0gY3JlYXRlQm9hcmRPYnNlcnZlcihib2FyZENoYW5nZWQpXG5cbiAgLy8gU3RhcnQgb2JzZXJ2ZXJcbiAgc3RhcnRCb2FyZE9ic2VydmVyKGJvYXJkT2JzZXJ2ZXJTdGF0ZSlcblxuICAvLyBTZXQgdXAgZWZmZWN0c1xuICBjb25zdCBjbGVhbnVwRGl2aWRlcnMgPSBzZXR1cERpdmlkZXJzRWZmZWN0KGRpdmlkZXJzU3RhdGUsIHNldHRpbmdzKVxuXG4gIC8vIFNldCB1cCBjb21tYW5kc1xuICBzZXR1cEtleWJvYXJkQ29tbWFuZHMoc2V0dGluZ3MpXG5cbiAgLy8gTW91bnQgUHJlYWN0IFVJXG4gIGNvbnN0IG1vdW50UG9pbnQgPSBjcmVhdGVEaXYoKVxuICBjb25zdCBrZXlib2FyZE1vdmUgPSBxdWVyeVNlbGVjdG9yKERvbVNlbGVjdG9yLktFWUJPQVJEX01PVkUpXG4gIGlmIChrZXlib2FyZE1vdmUpIHtcbiAgICBhcHBlbmRDaGlsZChrZXlib2FyZE1vdmUsIG1vdW50UG9pbnQpXG4gIH1cbiAgY3JlYXRlUm9vdChib2FyZENoYW5nZWQsIG1vdW50UG9pbnQsIHNldHRpbmdzKVxuXG4gIC8vIFJldHVybiBjbGVhbnVwIGZ1bmN0aW9uXG4gIHJldHVybiAoKSA9PiB7XG4gICAgY2xlYW51cERpdmlkZXJzKClcbiAgICBzdG9wQm9hcmRPYnNlcnZlcihib2FyZE9ic2VydmVyU3RhdGUpXG4gICAgZGVzdHJveUZsYXNoT3ZlcmxheShmbGFzaFN0YXRlKVxuICAgIGRlc3Ryb3lEaXZpZGVycyhkaXZpZGVyc1N0YXRlKVxuICAgIHRlYXJkb3duS2V5Ym9hcmRDb21tYW5kcygpXG4gICAgZGVzdHJveVJvb3QobW91bnRQb2ludClcbiAgfVxufVxuIiwiaW1wb3J0IHsgaW5pdCB9IGZyb20gJy4vaW5pdCdcblxuLy8gU3RhcnQgdGhlIGFwcGxpY2F0aW9uXG5pbml0KCkuY2F0Y2goY29uc29sZS5lcnJvcilcbiJdLCJ4X2dvb2dsZV9pZ25vcmVMaXN0IjpbMCwyMiwyMywyNF0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0NBQUEsSUFBSUEsTUFBRSxPQUFPLElBQUksZ0JBQWdCO0NBQUUsU0FBU0MsTUFBRztFQUFDLElBQUcsRUFBRUMsTUFBRSxJQUFHO0dBQUMsSUFBSSxHQUFFLElBQUUsQ0FBQztHQUFFLENBQUMsV0FBVTtJQUFDLElBQUksSUFBRUM7SUFBRSxNQUFFLEtBQUs7SUFBRSxPQUFNLEtBQUssTUFBSSxHQUFFO0tBQUMsSUFBRyxFQUFFLEVBQUUsTUFBSSxFQUFFLEdBQUUsRUFBRSxFQUFFLElBQUUsRUFBRTtLQUFFLElBQUUsRUFBRTtJQUFDO0dBQUMsR0FBRTtHQUFFLE9BQU0sS0FBSyxNQUFJQyxLQUFFO0lBQUMsSUFBSSxJQUFFQTtJQUFFLE1BQUUsS0FBSztJQUFFO0lBQUksT0FBTSxLQUFLLE1BQUksR0FBRTtLQUFDLElBQUksSUFBRSxFQUFFO0tBQUUsRUFBRSxJQUFFLEtBQUs7S0FBRSxFQUFFLEtBQUc7S0FBRyxJQUFHLEVBQUUsSUFBRSxFQUFFLE1BQUlDLElBQUUsQ0FBQyxHQUFFLElBQUc7TUFBQyxFQUFFLEVBQUU7S0FBQyxTQUFPLEdBQUU7TUFBQyxJQUFHLENBQUMsR0FBRTtPQUFDLElBQUU7T0FBRSxJQUFFLENBQUM7TUFBQztLQUFDO0tBQUMsSUFBRTtJQUFDO0dBQUM7R0FBQyxNQUFFO0dBQUU7R0FBSSxJQUFHLEdBQUUsTUFBTTtFQUFDLE9BQU07Q0FBRztDQUF1RSxJQUFJQyxNQUFFLEtBQUs7Q0FBRSxTQUFTQyxJQUFFLEdBQUU7RUFBQyxJQUFJLElBQUVEO0VBQUUsTUFBRSxLQUFLO0VBQUUsSUFBRztHQUFDLE9BQU8sRUFBRTtFQUFDLFVBQVE7R0FBQyxNQUFFO0VBQUM7Q0FBQztDQUFDLElBQUlFLEtBQUVKLE1BQUUsS0FBSyxHQUFFRixNQUFFLEdBQUVPLE1BQUUsR0FBTUUsTUFBRSxHQUFFUixNQUFFLEtBQUssR0FBRVMsTUFBRTtDQUFFLFNBQVNDLElBQUUsR0FBRTtFQUFDLElBQUcsS0FBSyxNQUFJUCxLQUFFO0dBQUMsSUFBSSxJQUFFLEVBQUU7R0FBRSxJQUFHLEtBQUssTUFBSSxLQUFHLEVBQUUsTUFBSUEsS0FBRTtJQUFDLElBQUU7S0FBQyxHQUFFO0tBQUUsR0FBRTtLQUFFLEdBQUVBLElBQUU7S0FBRSxHQUFFLEtBQUs7S0FBRSxHQUFFQTtLQUFFLEdBQUUsS0FBSztLQUFFLEdBQUUsS0FBSztLQUFFLEdBQUU7SUFBQztJQUFFLElBQUcsS0FBSyxNQUFJQSxJQUFFLEdBQUUsSUFBRSxFQUFFLElBQUU7SUFBRSxJQUFFLElBQUU7SUFBRSxFQUFFLElBQUU7SUFBRSxJQUFHLEtBQUdBLElBQUUsR0FBRSxFQUFFLEVBQUUsQ0FBQztJQUFFLE9BQU87R0FBQyxPQUFNLElBQUcsT0FBSyxFQUFFLEdBQUU7SUFBQyxFQUFFLElBQUU7SUFBRSxJQUFHLEtBQUssTUFBSSxFQUFFLEdBQUU7S0FBQyxFQUFFLEVBQUUsSUFBRSxFQUFFO0tBQUUsSUFBRyxLQUFLLE1BQUksRUFBRSxHQUFFLEVBQUUsRUFBRSxJQUFFLEVBQUU7S0FBRSxFQUFFLElBQUVBLElBQUU7S0FBRSxFQUFFLElBQUUsS0FBSztLQUFFLElBQUUsRUFBRSxJQUFFO0tBQUUsSUFBRSxJQUFFO0lBQUM7SUFBQyxPQUFPO0dBQUM7RUFBQztDQUFDO0NBQUMsU0FBU1EsSUFBRSxHQUFFLEdBQUU7RUFBQyxLQUFLLElBQUU7RUFBRSxLQUFLLElBQUU7RUFBRSxLQUFLLElBQUUsS0FBSztFQUFFLEtBQUssSUFBRSxLQUFLO0VBQUUsS0FBSyxJQUFFO0VBQUUsS0FBSyxJQUFFLFFBQU0sSUFBRSxLQUFLLElBQUUsRUFBRTtFQUFRLEtBQUssSUFBRSxRQUFNLElBQUUsS0FBSyxJQUFFLEVBQUU7RUFBVSxLQUFLLE9BQUssUUFBTSxJQUFFLEtBQUssSUFBRSxFQUFFO0NBQUk7Q0FBQyxJQUFFLFVBQVUsUUFBTWQ7Q0FBRSxJQUFFLFVBQVUsSUFBRSxXQUFVO0VBQUMsT0FBTSxDQUFDO0NBQUM7Q0FBRSxJQUFFLFVBQVUsSUFBRSxTQUFTLEdBQUU7RUFBQyxJQUFJLElBQUUsTUFBSyxJQUFFLEtBQUs7RUFBRSxJQUFHLE1BQUksS0FBRyxLQUFLLE1BQUksRUFBRSxHQUFFO0dBQUMsRUFBRSxJQUFFO0dBQUUsS0FBSyxJQUFFO0dBQUUsSUFBRyxLQUFLLE1BQUksR0FBRSxFQUFFLElBQUU7UUFBTyxJQUFFLFdBQVU7SUFBQyxJQUFJO0lBQUUsU0FBTyxJQUFFLEVBQUUsTUFBSSxFQUFFLEtBQUssQ0FBQztHQUFDLENBQUM7RUFBQztDQUFDO0NBQUUsSUFBRSxVQUFVLElBQUUsU0FBUyxHQUFFO0VBQUMsSUFBSSxJQUFFO0VBQUssSUFBRyxLQUFLLE1BQUksS0FBSyxHQUFFO0dBQUMsSUFBSSxJQUFFLEVBQUUsR0FBRSxJQUFFLEVBQUU7R0FBRSxJQUFHLEtBQUssTUFBSSxHQUFFO0lBQUMsRUFBRSxJQUFFO0lBQUUsRUFBRSxJQUFFLEtBQUs7R0FBQztHQUFDLElBQUcsS0FBSyxNQUFJLEdBQUU7SUFBQyxFQUFFLElBQUU7SUFBRSxFQUFFLElBQUUsS0FBSztHQUFDO0dBQUMsSUFBRyxNQUFJLEtBQUssR0FBRTtJQUFDLEtBQUssSUFBRTtJQUFFLElBQUcsS0FBSyxNQUFJLEdBQUUsSUFBRSxXQUFVO0tBQUMsSUFBSTtLQUFFLFNBQU8sSUFBRSxFQUFFLE1BQUksRUFBRSxLQUFLLENBQUM7SUFBQyxDQUFDO0dBQUM7RUFBQztDQUFDO0NBQUUsSUFBRSxVQUFVLFlBQVUsU0FBUyxHQUFFO0VBQUMsSUFBSSxJQUFFO0VBQUssT0FBT2UsSUFBRSxXQUFVO0dBQUMsSUFBSSxJQUFFLEVBQUUsT0FBTSxJQUFFVDtHQUFFLE1BQUUsS0FBSztHQUFFLElBQUc7SUFBQyxFQUFFLENBQUM7R0FBQyxVQUFRO0lBQUMsTUFBRTtHQUFDO0VBQUMsR0FBRSxFQUFDLE1BQUssTUFBSyxDQUFDO0NBQUM7Q0FBRSxJQUFFLFVBQVUsVUFBUSxXQUFVO0VBQUMsT0FBTyxLQUFLO0NBQUs7Q0FBRSxJQUFFLFVBQVUsV0FBUyxXQUFVO0VBQUMsT0FBTyxLQUFLLFFBQU07Q0FBRTtDQUFFLElBQUUsVUFBVSxTQUFPLFdBQVU7RUFBQyxPQUFPLEtBQUs7Q0FBSztDQUFFLElBQUUsVUFBVSxPQUFLLFdBQVU7RUFBQyxJQUFJLElBQUU7RUFBSyxPQUFPQyxJQUFFLFdBQVU7R0FBQyxPQUFPLEVBQUU7RUFBSyxDQUFDO0NBQUM7Q0FBRSxPQUFPLGVBQWVPLElBQUUsV0FBVSxTQUFRO0VBQUMsS0FBSSxXQUFVO0dBQUMsSUFBSSxJQUFFRCxJQUFFLElBQUk7R0FBRSxJQUFHLEtBQUssTUFBSSxHQUFFLEVBQUUsSUFBRSxLQUFLO0dBQUUsT0FBTyxLQUFLO0VBQUM7RUFBRSxLQUFJLFNBQVMsR0FBRTtHQUFDLElBQUcsTUFBSSxLQUFLLEdBQUU7SUFBQyxJQUFHSixNQUFFLEtBQUksTUFBTSxJQUFJLE1BQU0sZ0JBQWdCO0lBQUUsQ0FBQyxTQUFTLEdBQUU7S0FBQyxJQUFHLE1BQUlQLE9BQUcsTUFBSU87VUFBSyxFQUFFLE1BQUlFLEtBQUU7T0FBQyxFQUFFLElBQUVBO09BQUUsTUFBRTtRQUFDLEdBQUU7UUFBRSxHQUFFLEVBQUU7UUFBRSxHQUFFLEVBQUU7UUFBRSxHQUFFUjtPQUFDO01BQUM7O0lBQUMsR0FBRSxJQUFJO0lBQUUsS0FBSyxJQUFFO0lBQUUsS0FBSztJQUFJO0lBQUk7SUFBSSxJQUFHO0tBQUMsS0FBSSxJQUFJLElBQUUsS0FBSyxHQUFFLEtBQUssTUFBSSxHQUFFLElBQUUsRUFBRSxHQUFFLEVBQUUsRUFBRSxFQUFFO0lBQUMsVUFBUTtLQUFDLElBQUU7SUFBQztHQUFDO0VBQUM7Q0FBQyxDQUFDO0NBQUUsU0FBU2EsSUFBRSxHQUFFLEdBQUU7RUFBQyxPQUFPLElBQUlGLElBQUUsR0FBRSxDQUFDO0NBQUM7Q0FBQyxTQUFTVCxJQUFFLEdBQUU7RUFBQyxLQUFJLElBQUksSUFBRSxFQUFFLEdBQUUsS0FBSyxNQUFJLEdBQUUsSUFBRSxFQUFFLEdBQUUsSUFBRyxFQUFFLEVBQUUsTUFBSSxFQUFFLEtBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxLQUFHLEVBQUUsRUFBRSxNQUFJLEVBQUUsR0FBRSxPQUFNLENBQUM7RUFBRSxPQUFNLENBQUM7Q0FBQztDQUFDLFNBQVNZLElBQUUsR0FBRTtFQUFDLEtBQUksSUFBSSxJQUFFLEVBQUUsR0FBRSxLQUFLLE1BQUksR0FBRSxJQUFFLEVBQUUsR0FBRTtHQUFDLElBQUksSUFBRSxFQUFFLEVBQUU7R0FBRSxJQUFHLEtBQUssTUFBSSxHQUFFLEVBQUUsSUFBRTtHQUFFLEVBQUUsRUFBRSxJQUFFO0dBQUUsRUFBRSxJQUFFO0dBQUcsSUFBRyxLQUFLLE1BQUksRUFBRSxHQUFFO0lBQUMsRUFBRSxJQUFFO0lBQUU7R0FBSztFQUFDO0NBQUM7Q0FBQyxTQUFTQyxJQUFFLEdBQUU7RUFBQyxJQUFJLElBQUUsRUFBRSxHQUFFLElBQUUsS0FBSztFQUFFLE9BQU0sS0FBSyxNQUFJLEdBQUU7R0FBQyxJQUFJLElBQUUsRUFBRTtHQUFFLElBQUcsT0FBSyxFQUFFLEdBQUU7SUFBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQUUsSUFBRyxLQUFLLE1BQUksR0FBRSxFQUFFLElBQUUsRUFBRTtJQUFFLElBQUcsS0FBSyxNQUFJLEVBQUUsR0FBRSxFQUFFLEVBQUUsSUFBRTtHQUFDLE9BQU0sSUFBRTtHQUFFLEVBQUUsRUFBRSxJQUFFLEVBQUU7R0FBRSxJQUFHLEtBQUssTUFBSSxFQUFFLEdBQUUsRUFBRSxJQUFFLEtBQUs7R0FBRSxJQUFFO0VBQUM7RUFBQyxFQUFFLElBQUU7Q0FBQztDQUFDLFNBQVNDLElBQUUsR0FBRSxHQUFFO0VBQUMsSUFBRSxLQUFLLE1BQUssS0FBSyxDQUFDO0VBQUUsS0FBSyxJQUFFO0VBQUUsS0FBSyxJQUFFLEtBQUs7RUFBRSxLQUFLLElBQUVQLE1BQUU7RUFBRSxLQUFLLElBQUU7RUFBRSxLQUFLLElBQUUsUUFBTSxJQUFFLEtBQUssSUFBRSxFQUFFO0VBQVEsS0FBSyxJQUFFLFFBQU0sSUFBRSxLQUFLLElBQUUsRUFBRTtFQUFVLEtBQUssT0FBSyxRQUFNLElBQUUsS0FBSyxJQUFFLEVBQUU7Q0FBSTtDQUFDLElBQUUsWUFBVSxJQUFJRSxJQUFBQTtDQUFFLElBQUUsVUFBVSxJQUFFLFdBQVU7RUFBQyxLQUFLLEtBQUc7RUFBRyxJQUFHLElBQUUsS0FBSyxHQUFFLE9BQU0sQ0FBQztFQUFFLElBQUcsT0FBSyxLQUFHLEtBQUssSUFBRyxPQUFNLENBQUM7RUFBRSxLQUFLLEtBQUc7RUFBRyxJQUFHLEtBQUssTUFBSUYsS0FBRSxPQUFNLENBQUM7RUFBRSxLQUFLLElBQUVBO0VBQUUsS0FBSyxLQUFHO0VBQUUsSUFBRyxLQUFLLElBQUUsS0FBRyxDQUFDUCxJQUFFLElBQUksR0FBRTtHQUFDLEtBQUssS0FBRztHQUFHLE9BQU0sQ0FBQztFQUFDO0VBQUMsSUFBSSxJQUFFQztFQUFFLElBQUc7R0FBQyxJQUFFLElBQUk7R0FBRSxNQUFFO0dBQUssSUFBSSxJQUFFLEtBQUssRUFBRTtHQUFFLElBQUcsS0FBRyxLQUFLLEtBQUcsS0FBSyxNQUFJLEtBQUcsTUFBSSxLQUFLLEdBQUU7SUFBQyxLQUFLLElBQUU7SUFBRSxLQUFLLEtBQUc7SUFBSSxLQUFLO0dBQUc7RUFBQyxTQUFPLEdBQUU7R0FBQyxLQUFLLElBQUU7R0FBRSxLQUFLLEtBQUc7R0FBRyxLQUFLO0VBQUc7RUFBQyxNQUFFO0VBQUUsSUFBRSxJQUFJO0VBQUUsS0FBSyxLQUFHO0VBQUcsT0FBTSxDQUFDO0NBQUM7Q0FBRSxJQUFFLFVBQVUsSUFBRSxTQUFTLEdBQUU7RUFBQyxJQUFHLEtBQUssTUFBSSxLQUFLLEdBQUU7R0FBQyxLQUFLLEtBQUc7R0FBRyxLQUFJLElBQUksSUFBRSxLQUFLLEdBQUUsS0FBSyxNQUFJLEdBQUUsSUFBRSxFQUFFLEdBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztFQUFDO0VBQUMsSUFBRSxVQUFVLEVBQUUsS0FBSyxNQUFLLENBQUM7Q0FBQztDQUFFLElBQUUsVUFBVSxJ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S0FBSSxLQUFLLEdBQUUsU0FBTyxJQUFFLElBQUUsRUFBRSxLQUFHLFNBQU8sSUFBRSxJQUFFLEVBQUUsS0FBRyxFQUFFLEtBQUcsRUFBRTtFQUFHLElBQUcsVUFBVSxTQUFPLE1BQUksRUFBRSxXQUFTLFVBQVUsU0FBTyxJQUFFLEVBQUUsS0FBSyxXQUFVLENBQUMsSUFBRSxJQUFHLGNBQVksT0FBTyxLQUFHLFFBQU0sRUFBRSxjQUFhLEtBQUksS0FBSyxFQUFFLGNBQWEsS0FBSyxNQUFJLEVBQUUsT0FBSyxFQUFFLEtBQUcsRUFBRSxhQUFhO0VBQUksT0FBT0MsSUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLElBQUk7Q0FBQztDQUFDLFNBQVNBLElBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0VBQUMsSUFBSSxJQUFFO0dBQUMsTUFBSztHQUFFLE9BQU07R0FBRSxLQUFJO0dBQUUsS0FBSTtHQUFFLEtBQUk7R0FBSyxJQUFHO0dBQUssS0FBSTtHQUFFLEtBQUk7R0FBSyxLQUFJO0dBQUssYUFBWSxLQUFLO0dBQUUsS0FBSSxRQUFNLElBQUUsRUFBRWYsTUFBRTtHQUFFLEtBQUk7R0FBRyxLQUFJO0VBQUM7RUFBRSxPQUFPLFFBQU0sS0FBRyxRQUFNRCxJQUFFLFNBQU9BLElBQUUsTUFBTSxDQUFDLEdBQUU7Q0FBQztDQUFtQyxTQUFTLEVBQUUsR0FBRTtFQUFDLE9BQU8sRUFBRTtDQUFRO0NBQUMsU0FBUyxFQUFFLEdBQUUsR0FBRTtFQUFDLEtBQUssUUFBTSxHQUFFLEtBQUssVUFBUTtDQUFDO0NBQUMsU0FBUyxFQUFFLEdBQUUsR0FBRTtFQUFDLElBQUcsUUFBTSxHQUFFLE9BQU8sRUFBRSxLQUFHLEVBQUUsRUFBRSxJQUFHLEVBQUUsTUFBSSxDQUFDLElBQUU7RUFBSyxLQUFJLElBQUksR0FBRSxJQUFFLEVBQUUsSUFBSSxRQUFPLEtBQUksSUFBRyxTQUFPLElBQUUsRUFBRSxJQUFJLE9BQUssUUFBTSxFQUFFLEtBQUksT0FBTyxFQUFFO0VBQUksT0FBTSxjQUFZLE9BQU8sRUFBRSxPQUFLLEVBQUUsQ0FBQyxJQUFFO0NBQUk7Q0FBQyxTQUFTLEVBQUUsR0FBRTtFQUFDLElBQUcsRUFBRSxPQUFLLEVBQUUsS0FBSTtHQUFDLElBQUksSUFBRSxFQUFFLEtBQUksSUFBRSxFQUFFLEtBQUksSUFBRSxDQUFDLEdBQUUsSUFBRSxDQUFDLEdBQUUsSUFBRWMsSUFBRSxDQUFDLEdBQUUsQ0FBQztHQUFFLEVBQUUsTUFBSSxFQUFFLE1BQUksR0FBRWQsSUFBRSxTQUFPQSxJQUFFLE1BQU0sQ0FBQyxHQUFFLEVBQUUsRUFBRSxLQUFJLEdBQUUsR0FBRSxFQUFFLEtBQUksRUFBRSxJQUFJLGNBQWEsS0FBRyxFQUFFLE1BQUksQ0FBQyxDQUFDLElBQUUsTUFBSyxHQUFFLFFBQU0sSUFBRSxFQUFFLENBQUMsSUFBRSxHQUFFLENBQUMsRUFBRSxLQUFHLEVBQUUsTUFBSyxDQUFDLEdBQUUsRUFBRSxNQUFJLEVBQUUsS0FBSSxFQUFFLEdBQUcsSUFBSSxFQUFFLE9BQUssR0FBRSxFQUFFLEdBQUUsR0FBRSxDQUFDLEdBQUUsRUFBRSxNQUFJLEVBQUUsS0FBRyxNQUFLLEVBQUUsT0FBSyxLQUFHLEVBQUUsQ0FBQztFQUFDO0NBQUM7Q0FBQyxTQUFTLEVBQUUsR0FBRTtFQUFDLElBQUcsU0FBTyxJQUFFLEVBQUUsT0FBSyxRQUFNLEVBQUUsS0FBSSxPQUFPLEVBQUUsTUFBSSxFQUFFLElBQUksT0FBSyxNQUFLLEVBQUUsSUFBSSxLQUFLLFNBQVMsR0FBRTtHQUFDLElBQUcsUUFBTSxLQUFHLFFBQU0sRUFBRSxLQUFJLE9BQU8sRUFBRSxNQUFJLEVBQUUsSUFBSSxPQUFLLEVBQUU7RUFBRyxDQUFDLEdBQUUsRUFBRSxDQUFDO0NBQUM7Q0FBQyxTQUFTLEVBQUUsR0FBRTtFQUFDLENBQUMsQ0FBQyxFQUFFLFFBQU0sRUFBRSxNQUFJLENBQUMsTUFBSUcsSUFBRSxLQUFLLENBQUMsS0FBRyxDQUFDLEVBQUUsU0FBT0MsT0FBR0osSUFBRSx3QkFBc0IsTUFBRUEsSUFBRSxzQkFBb0JLLEtBQUcsQ0FBQztDQUFDO0NBQUMsU0FBUyxJQUFHO0VBQUMsSUFBRztHQUFDLEtBQUksSUFBSSxHQUFFLElBQUUsR0FBRUYsSUFBRSxTQUFRLElBQUUsU0FBTyxLQUFHQSxJQUFFLEtBQUtHLEdBQUMsR0FBRSxJQUFFSCxJQUFFLE1BQU0sR0FBRSxJQUFFQSxJQUFFLFFBQU8sRUFBRSxDQUFDO0VBQUMsVUFBUTtHQUFDLElBQUUsU0FBTyxFQUFFLE1BQUk7RUFBQztDQUFDO0NBQUMsU0FBUyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtFQUFDLElBQUksR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxJQUFFLEtBQUcsRUFBRSxPQUFLVSxLQUFFLElBQUUsRUFBRTtFQUFPLEtBQUksSUFBRSxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsS0FBSSxTQUFPLElBQUUsRUFBRSxJQUFJLFFBQU0sSUFBRSxNQUFJLEVBQUUsT0FBSyxFQUFFLEVBQUUsUUFBTSxHQUFFLEVBQUUsTUFBSSxHQUFFLElBQUUsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLEtBQUksRUFBRSxPQUFLLEVBQUUsT0FBSyxFQUFFLFFBQU0sRUFBRSxPQUFLLEVBQUUsRUFBRSxLQUFJLE1BQUssQ0FBQyxHQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUksRUFBRSxPQUFLLEdBQUUsQ0FBQyxJQUFHLFFBQU0sS0FBRyxRQUFNLE1BQUksSUFBRSxLQUFJLElBQUUsQ0FBQyxFQUFFLElBQUUsRUFBRSxTQUFPLEVBQUUsUUFBTSxFQUFFLE9BQUssSUFBRUksSUFBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLEdBQUUsS0FBRyxFQUFFLFFBQU0sRUFBRSxNQUFJLFNBQU8sY0FBWSxPQUFPLEVBQUUsUUFBTSxLQUFLLE1BQUksSUFBRSxJQUFFLElBQUUsTUFBSSxJQUFFLEVBQUUsY0FBYSxFQUFFLE9BQUs7RUFBSSxPQUFPLEVBQUUsTUFBSSxHQUFFO0NBQUM7Q0FBQyxTQUFTLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0VBQUMsSUFBSSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsSUFBRSxFQUFFLFFBQU8sSUFBRSxHQUFFLElBQUU7RUFBRSxLQUFJLEVBQUUsTUFBSSxJQUFJLE1BQU0sQ0FBQyxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsS0FBSSxTQUFPLElBQUUsRUFBRSxPQUFLLGFBQVcsT0FBTyxLQUFHLGNBQVksT0FBTyxLQUFHLFlBQVUsT0FBTyxLQUFHLFlBQVUsT0FBTyxLQUFHLFlBQVUsT0FBTyxLQUFHLEVBQUUsZUFBYSxTQUFPLElBQUUsRUFBRSxJQUFJLEtBQUdELElBQUUsTUFBSyxHQUFFLE1BQUssTUFBSyxJQUFJLElBQUUsRUFBRSxDQUFDLElBQUUsSUFBRSxFQUFFLElBQUksS0FBR0EsSUFBRSxHQUFFLEVBQUMsVUFBUyxFQUFDLEdBQUUsTUFBSyxNQUFLLElBQUksSUFBRSxLQUFLLE1BQUksRUFBRSxlQUFhLEVBQUUsTUFBSSxJQUFFLElBQUUsRUFBRSxJQUFJLEtBQUdBLElBQUUsRUFBRSxNQUFLLEVBQUUsT0FBTSxFQUFFLEtBQUksRUFBRSxNQUFJLEVBQUUsTUFBSSxNQUFLLEVBQUUsR0FBRyxJQUFFLEVBQUUsSUFBSSxLQUFHLEdBQUUsSUFBRSxJQUFFLEdBQUUsRUFBRSxLQUFHLEdBQUUsRUFBRSxNQUFJLEVBQUUsTUFBSSxHQUFFLElBQUUsTUFBSyxPQUFLLElBQUUsRUFBRSxNQUFJLEVBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxPQUFLLE1BQUssSUFBRSxFQUFFLFFBQU0sRUFBRSxPQUFLLEtBQUksUUFBTSxLQUFHLFFBQU0sRUFBRSxPQUFLLE1BQUksTUFBSSxJQUFFLElBQUUsTUFBSSxJQUFFLEtBQUcsTUFBSyxjQUFZLE9BQU8sRUFBRSxTQUFPLEVBQUUsT0FBSyxNQUFJLEtBQUcsTUFBSSxLQUFHLElBQUUsSUFBRSxNQUFJLEtBQUcsSUFBRSxJQUFFLE9BQUssSUFBRSxJQUFFLE1BQUksS0FBSSxFQUFFLE9BQUssT0FBSyxFQUFFLElBQUksS0FBRztFQUFLLElBQUcsR0FBRSxLQUFJLElBQUUsR0FBRSxJQUFFLEdBQUUsS0FBSSxTQUFPLElBQUUsRUFBRSxPQUFLLE1BQUksSUFBRSxFQUFFLFNBQU8sRUFBRSxPQUFLLE1BQUksSUFBRSxFQUFFLENBQUMsSUFBRyxFQUFFLEdBQUUsQ0FBQztFQUFHLE9BQU87Q0FBQztDQUFDLFNBQVNDLElBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtFQUFDLElBQUksR0FBRTtFQUFFLElBQUcsY0FBWSxPQUFPLEVBQUUsTUFBSztHQUFDLEtBQUksSUFBRSxFQUFFLEtBQUksSUFBRSxHQUFFLEtBQUcsSUFBRSxFQUFFLFFBQU8sS0FBSSxFQUFFLE9BQUssRUFBRSxHQUFHLEtBQUcsR0FBRSxJQUFFQSxJQUFFLEVBQUUsSUFBRyxHQUFFLEdBQUUsQ0FBQztHQUFHLE9BQU87RUFBQztFQUFDLEVBQUUsT0FBSyxNQUFJLE1BQUksS0FBRyxFQUFFLFFBQU0sQ0FBQyxFQUFFLGVBQWEsSUFBRSxFQUFFLENBQUMsSUFBRyxFQUFFLGFBQWEsRUFBRSxLQUFJLEtBQUcsSUFBSSxJQUFHLElBQUUsRUFBRTtFQUFLO0dBQUcsSUFBRSxLQUFHLEVBQUU7U0FBa0IsUUFBTSxLQUFHLEtBQUcsRUFBRTtFQUFVLE9BQU87Q0FBQztDQUE2RyxTQUFTLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtFQUFDLElBQUksR0FBRSxHQUFFLEdBQUUsSUFBRSxFQUFFLEtBQUksSUFBRSxFQUFFLE1BQUssSUFBRSxFQUFFLElBQUcsSUFBRSxRQUFNLEtBQUcsTUFBSSxJQUFFLEVBQUU7RUFBSyxJQUFHLFNBQU8sS0FBRyxRQUFNLEtBQUcsS0FBRyxLQUFHLEVBQUUsT0FBSyxLQUFHLEVBQUUsTUFBSyxPQUFPO0VBQUUsSUFBRyxLQUFHLElBQUUsSUFBRTtRQUFPLElBQUUsSUFBRSxHQUFFLElBQUUsSUFBRSxHQUFFLEtBQUcsS0FBRyxJQUFFLEVBQUUsU0FBUSxJQUFHLFNBQU8sSUFBRSxFQUFFLElBQUUsS0FBRyxJQUFFLE1BQUksU0FBTyxNQUFJLElBQUUsRUFBRSxRQUFNLEtBQUcsRUFBRSxPQUFLLEtBQUcsRUFBRSxNQUFLLE9BQU87RUFBQTtFQUFFLE9BQU07Q0FBRTtDQUFDLFNBQVNDLElBQUUsR0FBRSxHQUFFLEdBQUU7RUFBQyxPQUFLLEVBQUUsS0FBRyxFQUFFLFlBQVksR0FBRSxRQUFNLElBQUUsS0FBRyxDQUFDLElBQUUsRUFBRSxLQUFHLFFBQU0sSUFBRSxLQUFHLFlBQVUsT0FBTyxLQUFHLEVBQUUsS0FBSyxDQUFDLElBQUUsSUFBRSxJQUFFO0NBQUk7Q0FBQyxTQUFTLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0VBQUMsSUFBSSxHQUFFO0VBQUUsR0FBRSxJQUFHLFdBQVMsR0FBRSxJQUFHLFlBQVUsT0FBTyxHQUFFLEVBQUUsTUFBTSxVQUFRO09BQU07R0FBQyxJQUFHLFlBQVUsT0FBTyxNQUFJLEVBQUUsTUFBTSxVQUFRLElBQUUsS0FBSSxHQUFFLEtBQUksS0FBSyxHQUFFLEtBQUcsS0FBSyxLQUFHQSxJQUFFLEVBQUUsT0FBTSxHQUFFLEVBQUU7R0FBRSxJQUFHLEdBQUUsS0FBSSxLQUFLLEdBQUUsS0FBRyxFQUFFLE1BQUksRUFBRSxNQUFJQSxJQUFFLEVBQUUsT0FBTSxHQUFFLEVBQUUsRUFBRTtFQUFDO09BQU0sSUFBRyxPQUFLLEVBQUUsTUFBSSxPQUFLLEVBQUUsSUFBRyxJQUFFLE1BQUksSUFBRSxFQUFFLFFBQVFSLEtBQUUsSUFBSSxJQUFHLElBQUUsRUFBRSxZQUFZLEdBQUUsSUFBRSxLQUFLLEtBQUcsZ0JBQWMsS0FBRyxlQUFhLElBQUUsRUFBRSxNQUFNLENBQUMsSUFBRSxFQUFFLE1BQU0sQ0FBQyxHQUFFLEVBQUUsTUFBSSxFQUFFLElBQUUsQ0FBQyxJQUFHLEVBQUUsRUFBRSxJQUFFLEtBQUcsR0FBRSxJQUFFLElBQUUsRUFBRUQsT0FBRyxFQUFFQSxRQUFJLEVBQUVBLE9BQUcsR0FBRSxFQUFFLGlCQUFpQixHQUFFLElBQUVHLE1BQUVELEtBQUUsQ0FBQyxLQUFHLEVBQUUsb0JBQW9CLEdBQUUsSUFBRUMsTUFBRUQsS0FBRSxDQUFDO09BQU07R0FBQyxJQUFHLGdDQUE4QixHQUFFLElBQUUsRUFBRSxRQUFRLGVBQWMsR0FBRyxFQUFFLFFBQVEsVUFBUyxHQUFHO1FBQU8sSUFBRyxXQUFTLEtBQUcsWUFBVSxLQUFHLFVBQVEsS0FBRyxVQUFRLEtBQUcsVUFBUSxLQUFHLGNBQVksS0FBRyxjQUFZLEtBQUcsYUFBVyxLQUFHLGFBQVcsS0FBRyxVQUFRLEtBQUcsYUFBVyxLQUFHLEtBQUssR0FBRSxJQUFHO0lBQUMsRUFBRSxLQUFHLFFBQU0sSUFBRSxLQUFHO0lBQUUsTUFBTTtHQUFDLFNBQU8sR0FBRSxDQUFDO0dBQUMsY0FBWSxPQUFPLE1BQUksUUFBTSxLQUFHLENBQUMsTUFBSSxLQUFHLE9BQUssRUFBRSxLQUFHLEVBQUUsZ0JBQWdCLENBQUMsSUFBRSxFQUFFLGFBQWEsR0FBRSxhQUFXLEtBQUcsS0FBRyxJQUFFLEtBQUcsQ0FBQztFQUFFO0NBQUM7Q0FBQyxTQUFTLEVBQUUsR0FBRTtFQUFDLE9BQU8sU0FBUyxHQUFFO0dBQUMsSUFBRyxLQUFLLEdBQUU7SUFBQyxJQUFJLElBQUUsS0FBSyxFQUFFLEVBQUUsT0FBSztJQUFHLElBQUcsUUFBTSxFQUFFSCxNQUFHLEVBQUVBLE9BQUc7U0FBUyxJQUFHLEVBQUVBLE9BQUcsRUFBRUMsTUFBRztJQUFPLE9BQU8sRUFBRVQsSUFBRSxRQUFNQSxJQUFFLE1BQU0sQ0FBQyxJQUFFLENBQUM7R0FBQztFQUFDO0NBQUM7Q0FBQyxTQUFTLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtFQUFDLElBQUksR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsSUFBRSxFQUFFO0VBQUssSUFBRyxLQUFLLE1BQUksRUFBRSxhQUFZLE9BQU87RUFBSyxNQUFJLEVBQUUsUUFBTSxJQUFFLENBQUMsRUFBRSxLQUFHLEVBQUUsTUFBSyxJQUFFLENBQUMsSUFBRSxFQUFFLE1BQUksRUFBRSxHQUFHLEtBQUksSUFBRUEsSUFBRSxRQUFNLEVBQUUsQ0FBQztFQUFFLEdBQUUsSUFBRyxjQUFZLE9BQU8sR0FBRSxJQUFHO0dBQUMsSUFBRyxJQUFFLEVBQUUsT0FBTSxJQUFFLEVBQUUsYUFBVyxFQUFFLFVBQVUsUUFBTyxLQUFHLElBQUUsRUFBRSxnQkFBYyxFQUFFLEVBQUUsTUFBSyxJQUFFLElBQUUsSUFBRSxFQUFFLE1BQU0sUUFBTSxFQUFFLEtBQUcsR0FBRSxFQUFFLE1BQUksSUFBRSxDQUFDLElBQUUsRUFBRSxNQUFJLEVBQUUsS0FBSyxLQUFHLEVBQUUsT0FBSyxJQUFFLEVBQUUsTUFBSSxJQUFFLElBQUksRUFBRSxHQUFFLENBQUMsS0FBRyxFQUFFLE1BQUksSUFBRSxJQUFJLEVBQUUsR0FBRSxDQUFDLEdBQUUsRUFBRSxjQUFZLEdBQUUsRUFBRSxTQUFPLElBQUcsS0FBRyxFQUFFLElBQUksQ0FBQyxHQUFFLEVBQUUsVUFBUSxFQUFFLFFBQU0sQ0FBQyxJQUFHLEVBQUUsTUFBSSxHQUFFLElBQUUsRUFBRSxNQUFJLENBQUMsR0FBRSxFQUFFLE1BQUksQ0FBQyxHQUFFLEVBQUUsTUFBSSxDQUFDLElBQUcsS0FBRyxRQUFNLEVBQUUsUUFBTSxFQUFFLE1BQUksRUFBRSxRQUFPLEtBQUcsUUFBTSxFQUFFLDZCQUEyQixFQUFFLE9BQUssRUFBRSxVQUFRLEVBQUUsTUFBSWMsSUFBRSxDQUFDLEdBQUUsRUFBRSxHQUFHLElBQUdBLElBQUUsRUFBRSxLQUFJLEVBQUUseUJBQXlCLEdBQUUsRUFBRSxHQUFHLENBQUMsSUFBRyxJQUFFLEVBQUUsT0FBTSxJQUFFLEVBQUUsT0FBTSxFQUFFLE1BQUksR0FBRSxHQUFFLEtBQUcsUUFBTSxFQUFFLDRCQUEwQixRQUFNLEVBQUUsc0JBQW9CLEVBQUUsbUJBQW1CLEdBQUUsS0FBRyxRQUFNLEVBQUUscUJBQW1CLEVBQUUsSUFBSSxLQUFLLEVBQUUsaUJBQWlCO1FBQU07SUFBQyxJQUFHLEtBQUcsUUFBTSxFQUFFLDRCQUEwQixNQUFJLEtBQUcsUUFBTSxFQUFFLDZCQUEyQixFQUFFLDBCQUEwQixHQUFFLENBQUMsR0FBRSxFQUFFLE9BQUssRUFBRSxPQUFLLENBQUMsRUFBRSxPQUFLLFFBQU0sRUFBRSx5QkFBdUIsQ0FBQyxNQUFJLEVBQUUsc0JBQXNCLEdBQUUsRUFBRSxLQUFJLENBQUMsR0FBRTtLQUFDLEVBQUUsT0FBSyxFQUFFLFFBQU0sRUFBRSxRQUFNLEdBQUUsRUFBRSxRQUFNLEVBQUUsS0FBSSxFQUFFLE1BQUksQ0FBQyxJQUFHLEVBQUUsTUFBSSxFQUFFLEtBQUksRUFBRSxNQUFJLEVBQUUsS0FBSSxFQUFFLElBQUksS0FBSyxTQUFTLEdBQUU7TUFBQyxNQUFJLEVBQUUsS0FBRztLQUFFLENBQUMsR0FBRUQsSUFBRSxLQUFLLE1BQU0sRUFBRSxLQUFJLEVBQUUsR0FBRyxHQUFFLEVBQUUsTUFBSSxDQUFDLEdBQUUsRUFBRSxJQUFJLFVBQVEsRUFBRSxLQUFLLENBQUM7S0FBRSxNQUFNO0lBQUM7SUFBQyxRQUFNLEVBQUUsdUJBQXFCLEVBQUUsb0JBQW9CLEdBQUUsRUFBRSxLQUFJLENBQUMsR0FBRSxLQUFHLFFBQU0sRUFBRSxzQkFBb0IsRUFBRSxJQUFJLEtBQUssV0FBVTtLQUFDLEVBQUUsbUJBQW1CLEdBQUUsR0FBRSxDQUFDO0lBQUMsQ0FBQztHQUFDO0dBQUMsSUFBRyxFQUFFLFVBQVEsR0FBRSxFQUFFLFFBQU0sR0FBRSxFQUFFLE1BQUksR0FBRSxFQUFFLE1BQUksQ0FBQyxHQUFFLElBQUViLElBQUUsS0FBSSxJQUFFLEdBQUUsR0FBRSxFQUFFLFFBQU0sRUFBRSxLQUFJLEVBQUUsTUFBSSxDQUFDLEdBQUUsS0FBRyxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU0sRUFBRSxPQUFNLEVBQUUsT0FBTyxHQUFFYSxJQUFFLEtBQUssTUFBTSxFQUFFLEtBQUksRUFBRSxHQUFHLEdBQUUsRUFBRSxNQUFJLENBQUM7UUFBTztJQUFHLEVBQUUsTUFBSSxDQUFDLEdBQUUsS0FBRyxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU0sRUFBRSxPQUFNLEVBQUUsT0FBTyxHQUFFLEVBQUUsUUFBTSxFQUFFO1VBQVUsRUFBRSxPQUFLLEVBQUUsSUFBRTtHQUFJLEVBQUUsUUFBTSxFQUFFLEtBQUksUUFBTSxFQUFFLG9CQUFrQixJQUFFQyxJQUFFQSxJQUFFLENBQUMsR0FBRSxDQUFDLEdBQUUsRUFBRSxnQkFBZ0IsQ0FBQyxJQUFHLEtBQUcsQ0FBQyxLQUFHLFFBQU0sRUFBRSw0QkFBMEIsSUFBRSxFQUFFLHdCQUF3QixHQUFFLENBQUMsSUFBRyxJQUFFLFFBQU0sS0FBRyxFQUFFLFNBQU8sS0FBRyxRQUFNLEVBQUUsTUFBSSxFQUFFLEVBQUUsTUFBTSxRQUFRLElBQUUsR0FBRSxJQUFFLEVBQUUsR0FBRSxFQUFFLENBQUMsSUFBRSxJQUFFLENBQUMsQ0FBQyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLEdBQUUsRUFBRSxPQUFLLEVBQUUsS0FBSSxFQUFFLE9BQUssTUFBSyxFQUFFLElBQUksVUFBUSxFQUFFLEtBQUssQ0FBQyxHQUFFLE1BQUksRUFBRSxNQUFJLEVBQUUsS0FBRztFQUFLLFNBQU8sR0FBRTtHQUFDLElBQUcsRUFBRSxNQUFJLE1BQUssS0FBRyxRQUFNLEdBQUUsSUFBRyxFQUFFLE1BQUs7SUFBQyxLQUFJLEVBQUUsT0FBSyxJQUFFLE1BQUksS0FBSSxLQUFHLEtBQUcsRUFBRSxZQUFVLEVBQUUsY0FBYSxJQUFFLEVBQUU7SUFBWSxFQUFFLEVBQUUsUUFBUSxDQUFDLEtBQUcsTUFBSyxFQUFFLE1BQUk7R0FBQyxPQUFLO0lBQUMsS0FBSSxJQUFFLEVBQUUsUUFBTyxNQUFLLEVBQUUsRUFBRSxFQUFFO0lBQUUsSUFBRSxDQUFDO0dBQUM7UUFBTSxFQUFFLE1BQUksRUFBRSxLQUFJLEVBQUUsTUFBSSxFQUFFLEtBQUksRUFBRSxRQUFNSyxJQUFFLENBQUM7R0FBRSxJQUFFLElBQUksR0FBRSxHQUFFLENBQUM7RUFBQztPQUFNLFFBQU0sS0FBRyxFQUFFLE9BQUssRUFBRSxPQUFLLEVBQUUsTUFBSSxFQUFFLEtBQUksRUFBRSxNQUFJLEVBQUUsT0FBSyxJQUFFLEVBQUUsTUFBSSxFQUFFLEVBQUUsS0FBSSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7RUFBRSxRQUFPLElBQUVuQixJQUFFLFdBQVMsRUFBRSxDQUFDLEdBQUUsTUFBSSxFQUFFLE1BQUksS0FBSyxJQUFFO0NBQUM7Q0FBQyxTQUFTbUIsSUFBRSxHQUFFO0VBQUMsTUFBSSxFQUFFLFFBQU0sRUFBRSxJQUFJLE1BQUksQ0FBQyxJQUFHLEVBQUUsT0FBSyxFQUFFLElBQUksS0FBS0EsR0FBQztDQUFFO0NBQUMsU0FBUyxFQUFFLEdBQUUsR0FBRSxHQUFFO0VBQUMsS0FBSSxJQUFJLElBQUUsR0FBRSxJQUFFLEVBQUUsUUFBTyxLQUFJLEVBQUUsRUFBRSxJQUFHLEVBQUUsRUFBRSxJQUFHLEVBQUUsRUFBRSxFQUFFO0VBQUUsSUFBRSxPQUFLbkIsSUFBRSxJQUFJLEdBQUUsQ0FBQyxHQUFFLEVBQUUsS0FBSyxTQUFTLEdBQUU7R0FBQyxJQUFHO0lBQUMsSUFBRSxFQUFFLEtBQUksRUFBRSxNQUFJLENBQUMsR0FBRSxFQUFFLEtBQUssU0FBUyxHQUFFO0tBQUMsRUFBRSxLQUFLLENBQUM7SUFBQyxDQUFDO0dBQUMsU0FBTyxHQUFFO0lBQUMsSUFBRSxJQUFJLEdBQUUsRUFBRSxHQUFHO0dBQUM7RUFBQyxDQUFDO0NBQUM7Q0FBQyxTQUFTLEVBQUUsR0FBRTtFQUFDLE9BQU0sWUFBVSxPQUFPLEtBQUcsUUFBTSxLQUFHLEVBQUUsTUFBSSxJQUFFLElBQUUsRUFBRSxDQUFDLElBQUUsRUFBRSxJQUFJLENBQUMsSUFBRSxLQUFLLE1BQUksRUFBRSxjQUFZLE9BQUtjLElBQUUsQ0FBQyxHQUFF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QUUsR0FBRSxHQUFFLEdBQUU7RUFBQyxJQUFHO0dBQUMsSUFBRyxjQUFZLE9BQU8sR0FBRTtJQUFDLElBQUksSUFBRSxjQUFZLE9BQU8sRUFBRTtJQUFJLEtBQUcsRUFBRSxJQUFJLEdBQUUsS0FBRyxRQUFNLE1BQUksRUFBRSxNQUFJLEVBQUUsQ0FBQztHQUFFLE9BQU0sRUFBRSxVQUFRO0VBQUMsU0FBTyxHQUFFO0dBQUMsSUFBRSxJQUFJLEdBQUUsQ0FBQztFQUFDO0NBQUM7Q0FBQyxTQUFTLEVBQUUsR0FBRSxHQUFFLEdBQUU7RUFBQyxJQUFJLEdBQUU7RUFBRSxJQUFHQSxJQUFFLFdBQVNBLElBQUUsUUFBUSxDQUFDLElBQUcsSUFBRSxFQUFFLFNBQU8sRUFBRSxXQUFTLEVBQUUsV0FBUyxFQUFFLE9BQUssRUFBRSxHQUFFLE1BQUssQ0FBQyxJQUFHLFNBQU8sSUFBRSxFQUFFLE1BQUs7R0FBQyxJQUFHLEVBQUUsc0JBQXFCLElBQUc7SUFBQyxFQUFFLHFCQUFxQjtHQUFDLFNBQU8sR0FBRTtJQUFDLElBQUUsSUFBSSxHQUFFLENBQUM7R0FBQztHQUFDLEVBQUUsT0FBSyxFQUFFLE1BQUk7RUFBSTtFQUFDLElBQUcsSUFBRSxFQUFFLEtBQUksS0FBSSxJQUFFLEdBQUUsSUFBRSxFQUFFLFFBQU8sS0FBSSxFQUFFLE1BQUksRUFBRSxFQUFFLElBQUcsR0FBRSxLQUFHLGNBQVksT0FBTyxFQUFFLElBQUk7RUFBRSxLQUFHLEVBQUUsRUFBRSxHQUFHLEdBQUUsRUFBRSxNQUFJLEVBQUUsS0FBRyxFQUFFLE1BQUksS0FBSztDQUFDO0NBQUMsU0FBUyxFQUFFLEdBQUUsR0FBRSxHQUFFO0VBQUMsT0FBTyxLQUFLLFlBQVksR0FBRSxDQUFDO0NBQUM7Q0FBQyxTQUFTLEVBQUUsR0FBRSxHQUFFLEdBQUU7RUFBQyxJQUFJLEdBQUUsR0FBRSxHQUFFO0VBQUUsS0FBRyxhQUFXLElBQUUsU0FBUyxrQkFBaUJBLElBQUUsTUFBSUEsSUFBRSxHQUFHLEdBQUUsQ0FBQyxHQUFFLEtBQUcsSUFBRSxjQUFZLE9B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SUFBSSxHQUFFLElBQUVDLElBQUUsTUFBTSxJQUFHO0dBQUMsSUFBSSxJQUFFLEVBQUU7R0FBSSxJQUFHLEVBQUUsT0FBSyxHQUFFLElBQUc7SUFBQyxFQUFFLElBQUksS0FBSyxDQUFDLEdBQUUsRUFBRSxJQUFJLEtBQUssQ0FBQyxHQUFFLEVBQUUsTUFBSSxDQUFDO0dBQUMsU0FBTyxHQUFFO0lBQUMsRUFBRSxNQUFJLENBQUMsR0FBRSxFQUFFLElBQUksR0FBRSxFQUFFLEdBQUc7R0FBQztFQUFDO0NBQUM7Q0FBQyxFQUFFLE1BQUksU0FBUyxHQUFFO0VBQUMsSUFBRSxNQUFLLEtBQUcsRUFBRSxDQUFDO0NBQUMsR0FBRSxFQUFFLEtBQUcsU0FBUyxHQUFFLEdBQUU7RUFBQyxLQUFHLEVBQUUsT0FBSyxFQUFFLElBQUksUUFBTSxFQUFFLE1BQUksRUFBRSxJQUFJLE1BQUssS0FBRyxFQUFFLEdBQUUsQ0FBQztDQUFDLEdBQUUsRUFBRSxNQUFJLFNBQVMsR0FBRTtFQUFDLEtBQUcsRUFBRSxDQUFDLEdBQUUsSUFBRTtFQUFFLElBQUksS0FBRyxJQUFFLEVBQUUsS0FBSztFQUFJLE1BQUlILFFBQUksS0FBRyxFQUFFLE1BQUksQ0FBQyxHQUFFLEVBQUUsTUFBSSxDQUFDLEdBQUUsRUFBRSxHQUFHLEtBQUssU0FBUyxHQUFFO0dBQUMsRUFBRSxRQUFNLEVBQUUsS0FBRyxFQUFFLE1BQUssRUFBRSxJQUFFLEVBQUUsTUFBSSxLQUFLO0VBQUMsQ0FBQyxNQUFJLEVBQUUsSUFBSSxLQUFLLENBQUMsR0FBRSxFQUFFLElBQUksS0FBSyxDQUFDLEdBQUUsRUFBRSxNQUFJLENBQUMsR0FBRSxJQUFFLEtBQUksTUFBRTtDQUFDLEdBQUUsRUFBRSxTQUFPLFNBQVMsR0FBRTtFQUFDLEtBQUcsRUFBRSxDQUFDO0VBQUUsSUFBSSxJQUFFLEVBQUU7RUFBSSxLQUFHLEVBQUUsUUFBTSxFQUFFLElBQUksSUFBSSxXQUFTLE1BQUlHLElBQUUsS0FBSyxDQUFDLEtBQUdGLFFBQUksRUFBRSwyQkFBeUIsTUFBRSxFQUFFLDBCQUF3QixHQUFHLENBQUMsSUFBRyxFQUFFLElBQUksR0FBRyxLQUFLLFNBQVMsR0FBRTtHQUFDLEVBQUUsTUFBSSxFQUFFLE1BQUksRUFBRSxJQUFHLEVBQUUsSUFBRSxLQUFLO0VBQUMsQ0FBQyxJQUFHLE1BQUUsSUFBRTtDQUFJLEdBQUUsRUFBRSxNQUFJLFNBQVMsR0FBRSxHQUFFO0VBQUMsRUFBRSxLQUFLLFNBQVMsR0FBRTtHQUFDLElBQUc7SUFBQyxFQUFFLElBQUksS0FBSyxDQUFDLEdBQUUsRUFBRSxNQUFJLEVBQUUsSUFBSSxPQUFPLFNBQVMsR0FBRTtLQUFDLE9BQU0sQ0FBQyxFQUFFLE1BQUksRUFBRSxDQUFDO0lBQUMsQ0FBQztHQUFDLFNBQU8sR0FBRTtJQUFDLEVBQUUsS0FBSyxTQUFTLEdBQUU7S0FBQyxFQUFFLFFBQU0sRUFBRSxNQUFJLENBQUM7SUFBRSxDQUFDLEdBQUUsSUFBRSxDQUFDLEdBQUUsRUFBRSxJQUFJLEdBQUUsRUFBRSxHQUFHO0dBQUM7RUFBQyxDQUFDLEdBQUUsS0FBRyxFQUFFLEdBQUUsQ0FBQztDQUFDLEdBQUUsRUFBRSxVQUFRLFNBQVMsR0FBRTtFQUFDLEtBQUcsRUFBRSxDQUFDO0VBQUUsSUFBSSxHQUFFLElBQUUsRUFBRTtFQUFJLEtBQUcsRUFBRSxRQUFNLEVBQUUsSUFBSSxHQUFHLEtBQUssU0FBUyxHQUFFO0dBQUMsSUFBRztJQUFDLEVBQUUsQ0FBQztHQUFDLFNBQU8sR0FBRTtJQUFDLElBQUU7R0FBQztFQUFDLENBQUMsR0FBRSxFQUFFLE1BQUksS0FBSyxHQUFFLEtBQUcsRUFBRSxJQUFJLEdBQUUsRUFBRSxHQUFHO0NBQUU7Q0FBRSxJQUFJLElBQUUsY0FBWSxPQUFPO0NBQXNCLFNBQVMsRUFBRSxHQUFFO0VBQUMsSUFBSSxHQUFFLElBQUUsV0FBVTtHQUFDLGFBQWEsQ0FBQyxHQUFFLEtBQUcscUJBQXFCLENBQUMsR0FBRSxXQUFXLENBQUM7RUFBQyxHQUFFLElBQUUsV0FBVyxHQUFFLEVBQUU7RUFBRSxNQUFJLElBQUUsc0JBQXNCLENB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