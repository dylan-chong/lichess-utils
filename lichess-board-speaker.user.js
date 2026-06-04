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
	//#region src/adapters-overlays/dividers.ts
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
	//#region src/adapters-overlays/flash.ts
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
	//#region src/application-handlers/updateDividers.ts
	function updateDividers(state, settings) {
		if (settings.dividersEnabled.value) showDividers(state);
		else hideDividers(state);
	}
	//#endregion
	//#region src/application-effects/onDividers.ts
	function setupDividersEffect(state, settings) {
		return j$2(() => {
			settings.dividersEnabled.value;
			updateDividers(state, settings);
		});
	}
	//#endregion
	//#region src/platform/speechApi.ts
	function getSpeechSynthesis() {
		return window.speechSynthesis;
	}
	function getSpeechSynthesisUtterance() {
		return SpeechSynthesisUtterance;
	}
	function speak$1(synthesis, utterance) {
		synthesis.speak(utterance);
	}
	function cancel(synthesis) {
		synthesis.cancel();
	}
	function createUtterance(UtteranceClass, text) {
		return new UtteranceClass(text);
	}
	//#endregion
	//#region src/adapters-speech/speechSynthesizer.ts
	function speak(text, rate) {
		const synthesis = getSpeechSynthesis();
		const utterance = createUtterance(getSpeechSynthesisUtterance(), text);
		utterance.rate = rate;
		speak$1(synthesis, utterance);
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
			y: Number.parseFloat(match[2]) - squareSize / 2
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
	//#region src/application-handlers/handleSpeechCommand.ts
	function handleSpeechCommand(command, settings) {
		if (command === SpeechCommand.STOP) {
			stopSpeaking();
			return;
		}
		const pieces = readPiecePositions();
		if (command === SpeechCommand.ALL) {
			speak(generateAllPiecesText(pieces), settings.speakRate.value);
			return;
		}
		if (command === SpeechCommand.WHITE || command === SpeechCommand.BLACK) {
			speak(generateColorText(pieces, command === SpeechCommand.WHITE ? PlayerColor.WHITE : PlayerColor.BLACK), settings.speakRate.value);
			return;
		}
		speak(generateQuadrantText(filterQuadrant(pieces, command)), settings.speakRate.value);
	}
	//#endregion
	//#region src/application-input/keyboardInput.ts
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
	//#region src/application-observers/observerState.ts
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
	//#region src/application-settings/settingsStore.ts
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGljaGVzcy1ib2FyZC1zcGVha2VyLnVzZXIuanMiLCJuYW1lcyI6WyJpIiwidCIsInMiLCJjIiwiaCIsInciLCJyIiwibyIsImYiLCJ2IiwidSIsImUiLCJkIiwiYSIsImwiLCJqIiwieSIsIl8iLCJiIiwicCIsIlMiLCJtIiwieCIsIkUiLCJsIiwidSIsInQiLCJpIiwiciIsIm8iLCJlIiwiZiIsImMiLCJhIiwicyIsInAiLCJ2IiwidyIsIm0iLCJrIiwieCIsImoiLCJ6IiwiQiIsInUiLCJpIiwibyIsImYiLCJuIiwiciJdLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9AcHJlYWN0L3NpZ25hbHMtY29yZS9kaXN0L3NpZ25hbHMtY29yZS5tb2R1bGUuanMiLCJzcmMvY29uc3RhbnRzL2NoZXNzLnRzIiwic3JjL2NvbnN0YW50cy9jb21tYW5kcy50cyIsInNyYy9jb25zdGFudHMvZG9tLnRzIiwic3JjL3BsYXRmb3JtL2RvbS50cyIsInNyYy9hZGFwdGVycy1vdmVybGF5cy9kaXZpZGVycy50cyIsInNyYy9hZGFwdGVycy1vdmVybGF5cy9mbGFzaC50cyIsInNyYy9hcHBsaWNhdGlvbi1oYW5kbGVycy91cGRhdGVEaXZpZGVycy50cyIsInNyYy9hcHBsaWNhdGlvbi1lZmZlY3RzL29uRGl2aWRlcnMudHMiLCJzcmMvcGxhdGZvcm0vc3BlZWNoQXBpLnRzIiwic3JjL2FkYXB0ZXJzLXNwZWVjaC9zcGVlY2hTeW50aGVzaXplci50cyIsInNyYy9kb21haW4vY2hlc3MvY29vcmRpbmF0ZXMudHMiLCJzcmMvYXBwbGljYXRpb24vc2VydmljZXMvYm9hcmRSZWFkZXIvZXh0cmFjdGlvbi50cyIsInNyYy9hcHBsaWNhdGlvbi9zZXJ2aWNlcy9ib2FyZFJlYWRlci9yZWFkZXIudHMiLCJzcmMvZG9tYWluL2NoZXNzL3BpZWNlR3JvdXBpbmcudHMiLCJzcmMvZG9tYWluL3NwZWVjaC9zcGVlY2hUZXh0LnRzIiwic3JjL2FwcGxpY2F0aW9uLWhhbmRsZXJzL2hhbmRsZVNwZWVjaENvbW1hbmQudHMiLCJzcmMvYXBwbGljYXRpb24taW5wdXQva2V5Ym9hcmRJbnB1dC50cyIsInNyYy9wbGF0Zm9ybS9tdXRhdGlvbk9ic2VydmVyLnRzIiwic3JjL2FwcGxpY2F0aW9uLW9ic2VydmVycy9vYnNlcnZlclN0YXRlLnRzIiwic3JjL2NvbnN0YW50cy9zZXR0aW5ncy50cyIsInNyYy9wbGF0Zm9ybS9zdG9yYWdlLnRzIiwic3JjL2FwcGxpY2F0aW9uLXNldHRpbmdzL3NldHRpbmdzU3RvcmUudHMiLCJub2RlX21vZHVsZXMvcHJlYWN0L2Rpc3QvcHJlYWN0Lm1vZHVsZS5qcyIsIm5vZGVfbW9kdWxlcy9wcmVhY3QvaG9va3MvZGlzdC9ob29rcy5tb2R1bGUuanMiLCJub2RlX21vZHVsZXMvcHJlYWN0L2pzeC1ydW50aW1lL2Rpc3QvanN4UnVudGltZS5tb2R1bGUuanMiLCJzcmMvcHJlc2VudGF0aW9uL2NvbnRleHRzL1NldHRpbmdzQ29udGV4dC50c3giLCJzcmMvcHJlc2VudGF0aW9uL2NvbXBvbmVudHMvQnV0dG9uUm93LnRzeCIsInNyYy9wcmVzZW50YXRpb24vY29tcG9uZW50cy9TZXR0aW5nQnV0dG9uLnRzeCIsInNyYy9wcmVzZW50YXRpb24vY29tcG9uZW50cy9Db250cm9sUGFuZWwudHN4Iiwic3JjL3ByZXNlbnRhdGlvbi9jb21wb25lbnRzL3Jvb3QudHN4Iiwic3JjL2luaXQudHN4Iiwic3JjL21haW4udHN4Il0sInNvdXJjZXNDb250ZW50IjpbInZhciBpPVN5bWJvbC5mb3IoXCJwcmVhY3Qtc2lnbmFsc1wiKTtmdW5jdGlvbiB0KCl7aWYoIShzPjEpKXt2YXIgaSx0PSExOyFmdW5jdGlvbigpe3ZhciBpPWM7Yz12b2lkIDA7d2hpbGUodm9pZCAwIT09aSl7aWYoaS5TLnY9PT1pLnYpaS5TLmk9aS5pO2k9aS5vfX0oKTt3aGlsZSh2b2lkIDAhPT1oKXt2YXIgbj1oO2g9dm9pZCAwO3YrKzt3aGlsZSh2b2lkIDAhPT1uKXt2YXIgcj1uLnU7bi51PXZvaWQgMDtuLmYmPS0zO2lmKCEoOCZuLmYpJiZ3KG4pKXRyeXtuLmMoKX1jYXRjaChuKXtpZighdCl7aT1uO3Q9ITB9fW49cn19dj0wO3MtLTtpZih0KXRocm93IGl9ZWxzZSBzLS19ZnVuY3Rpb24gbihpKXtpZihzPjApcmV0dXJuIGkoKTtlPSsrdTtzKys7dHJ5e3JldHVybiBpKCl9ZmluYWxseXt0KCl9fXZhciByPXZvaWQgMDtmdW5jdGlvbiBvKGkpe3ZhciB0PXI7cj12b2lkIDA7dHJ5e3JldHVybiBpKCl9ZmluYWxseXtyPXR9fXZhciBmLGg9dm9pZCAwLHM9MCx2PTAsdT0wLGU9MCxjPXZvaWQgMCxkPTA7ZnVuY3Rpb24gYShpKXtpZih2b2lkIDAhPT1yKXt2YXIgdD1pLm47aWYodm9pZCAwPT09dHx8dC50IT09cil7dD17aTowLFM6aSxwOnIucyxuOnZvaWQgMCx0OnIsZTp2b2lkIDAseDp2b2lkIDAscjp0fTtpZih2b2lkIDAhPT1yLnMpci5zLm49dDtyLnM9dDtpLm49dDtpZigzMiZyLmYpaS5TKHQpO3JldHVybiB0fWVsc2UgaWYoLTE9PT10Lmkpe3QuaT0wO2lmKHZvaWQgMCE9PXQubil7dC5uLnA9dC5wO2lmKHZvaWQgMCE9PXQucCl0LnAubj10Lm47dC5wPXIuczt0Lm49dm9pZCAwO3Iucy5uPXQ7ci5zPXR9cmV0dXJuIHR9fX1mdW5jdGlvbiBsKGksdCl7dGhpcy52PWk7dGhpcy5pPTA7dGhpcy5uPXZvaWQgMDt0aGlzLnQ9dm9pZCAwO3RoaXMubD0wO3RoaXMuVz1udWxsPT10P3ZvaWQgMDp0LndhdGNoZWQ7dGhpcy5aPW51bGw9PXQ/dm9pZCAwOnQudW53YXRjaGVkO3RoaXMubmFtZT1udWxsPT10P3ZvaWQgMDp0Lm5hbWV9bC5wcm90b3R5cGUuYnJhbmQ9aTtsLnByb3RvdHlwZS5oPWZ1bmN0aW9uKCl7cmV0dXJuITB9O2wucHJvdG90eXBlLlM9ZnVuY3Rpb24oaSl7dmFyIHQ9dGhpcyxuPXRoaXMudDtpZihuIT09aSYmdm9pZCAwPT09aS5lKXtpLng9bjt0aGlzLnQ9aTtpZih2b2lkIDAhPT1uKW4uZT1pO2Vsc2UgbyhmdW5jdGlvbigpe3ZhciBpO251bGw9PShpPXQuVyl8fGkuY2FsbCh0KX0pfX07bC5wcm90b3R5cGUuVT1mdW5jdGlvbihpKXt2YXIgdD10aGlzO2lmKHZvaWQgMCE9PXRoaXMudCl7dmFyIG49aS5lLHI9aS54O2lmKHZvaWQgMCE9PW4pe24ueD1yO2kuZT12b2lkIDB9aWYodm9pZCAwIT09cil7ci5lPW47aS54PXZvaWQgMH1pZihpPT09dGhpcy50KXt0aGlzLnQ9cjtpZih2b2lkIDA9PT1yKW8oZnVuY3Rpb24oKXt2YXIgaTtudWxsPT0oaT10LlopfHxpLmNhbGwodCl9KX19fTtsLnByb3RvdHlwZS5zdWJzY3JpYmU9ZnVuY3Rpb24oaSl7dmFyIHQ9dGhpcztyZXR1cm4gaihmdW5jdGlvbigpe3ZhciBuPXQudmFsdWUsbz1yO3I9dm9pZCAwO3RyeXtpKG4pfWZpbmFsbHl7cj1vfX0se25hbWU6XCJzdWJcIn0pfTtsLnByb3RvdHlwZS52YWx1ZU9mPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMudmFsdWV9O2wucHJvdG90eXBlLnRvU3RyaW5nPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMudmFsdWUrXCJcIn07bC5wcm90b3R5cGUudG9KU09OPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMudmFsdWV9O2wucHJvdG90eXBlLnBlZWs9ZnVuY3Rpb24oKXt2YXIgaT10aGlzO3JldHVybiBvKGZ1bmN0aW9uKCl7cmV0dXJuIGkudmFsdWV9KX07T2JqZWN0LmRlZmluZVByb3BlcnR5KGwucHJvdG90eXBlLFwidmFsdWVcIix7Z2V0OmZ1bmN0aW9uKCl7dmFyIGk9YSh0aGlzKTtpZih2b2lkIDAhPT1pKWkuaT10aGlzLmk7cmV0dXJuIHRoaXMudn0sc2V0OmZ1bmN0aW9uKGkpe2lmKGkhPT10aGlzLnYpe2lmKHY+MTAwKXRocm93IG5ldyBFcnJvcihcIkN5Y2xlIGRldGVjdGVkXCIpOyFmdW5jdGlvbihpKXtpZigwIT09cyYmMD09PXYpaWYoaS5sIT09ZSl7aS5sPWU7Yz17UzppLHY6aS52LGk6aS5pLG86Y319fSh0aGlzKTt0aGlzLnY9aTt0aGlzLmkrKztkKys7cysrO3RyeXtmb3IodmFyIG49dGhpcy50O3ZvaWQgMCE9PW47bj1uLngpbi50Lk4oKX1maW5hbGx5e3QoKX19fX0pO2Z1bmN0aW9uIHkoaSx0KXtyZXR1cm4gbmV3IGwoaSx0KX1mdW5jdGlvbiB3KGkpe2Zvcih2YXIgdD1pLnM7dm9pZCAwIT09dDt0PXQubilpZih0LlMuaSE9PXQuaXx8IXQuUy5oKCl8fHQuUy5pIT09dC5pKXJldHVybiEwO3JldHVybiExfWZ1bmN0aW9uIF8oaSl7Zm9yKHZhciB0PWkuczt2b2lkIDAhPT10O3Q9dC5uKXt2YXIgbj10LlMubjtpZih2b2lkIDAhPT1uKXQucj1uO3QuUy5uPXQ7dC5pPS0xO2lmKHZvaWQgMD09PXQubil7aS5zPXQ7YnJlYWt9fX1mdW5jdGlvbiBiKGkpe3ZhciB0PWkucyxuPXZvaWQgMDt3aGlsZSh2b2lkIDAhPT10KXt2YXIgcj10LnA7aWYoLTE9PT10Lmkpe3QuUy5VKHQpO2lmKHZvaWQgMCE9PXIpci5uPXQubjtpZih2b2lkIDAhPT10Lm4pdC5uLnA9cn1lbHNlIG49dDt0LlMubj10LnI7aWYodm9pZCAwIT09dC5yKXQucj12b2lkIDA7dD1yfWkucz1ufWZ1bmN0aW9uIHAoaSx0KXtsLmNhbGwodGhpcyx2b2lkIDApO3RoaXMueD1pO3RoaXMucz12b2lkIDA7dGhpcy5nPWQtMTt0aGlzLmY9NDt0aGlzLlc9bnVsbD09dD92b2lkIDA6dC53YXRjaGVkO3RoaXMuWj1udWxsPT10P3ZvaWQgMDp0LnVud2F0Y2hlZDt0aGlzLm5hbWU9bnVsbD09dD92b2lkIDA6dC5uYW1lfXAucHJvdG90eXBlPW5ldyBsO3AucHJvdG90eXBlLmg9ZnVuY3Rpb24oKXt0aGlzLmYmPS0zO2lmKDEmdGhpcy5mKXJldHVybiExO2lmKDMyPT0oMzYmdGhpcy5mKSlyZXR1cm4hMDt0aGlzLmYmPS01O2lmKHRoaXMuZz09PWQpcmV0dXJuITA7dGhpcy5nPWQ7dGhpcy5mfD0xO2lmKHRoaXMuaT4wJiYhdyh0aGlzKSl7dGhpcy5mJj0tMjtyZXR1cm4hMH12YXIgaT1yO3RyeXtfKHRoaXMpO3I9dGhpczt2YXIgdD10aGlzLngoKTtpZigxNiZ0aGlzLmZ8fHRoaXMudiE9PXR8fDA9PT10aGlzLmkpe3RoaXMudj10O3RoaXMuZiY9LTE3O3RoaXMuaSsrfX1jYXRjaChpKXt0aGlzLnY9aTt0aGlzLmZ8PTE2O3RoaXMuaSsrfXI9aTtiKHRoaXMpO3RoaXMuZiY9LTI7cmV0dXJuITB9O3AucHJvdG90eXBlLlM9ZnVuY3Rpb24oaSl7aWYodm9pZCAwPT09dGhpcy50KXt0aGlzLmZ8PTM2O2Zvcih2YXIgdD10aGlzLnM7dm9pZCAwIT09dDt0PXQubil0LlMuUyh0KX1sLnByb3RvdHlwZS5TLmNhbGwodGhpcyxpKX07cC5wcm90b3R5cGUuVT1mdW5jdGlvbihpKXtpZih2b2lkIDAhPT10aGlzLnQpe2wucHJvdG90eXBlLlUuY2FsbCh0aGlzLGkpO2lmKHZvaWQgMD09PXRoaXMudCl7dGhpcy5mJj0tMzM7Zm9yKHZhciB0PXRoaXMuczt2b2lkIDAhPT10O3Q9dC5uKXQuUy5VKHQpfX19O3AucHJvdG90eXBlLk49ZnVuY3Rpb24oKXtpZighKDImdGhpcy5mKSl7dGhpcy5mfD02O2Zvcih2YXIgaT10aGlzLnQ7dm9pZCAwIT09aTtpPWkueClpLnQuTigpfX07T2JqZWN0LmRlZmluZVByb3BlcnR5KHAucHJvdG90eXBlLFwidmFsdWVcIix7Z2V0OmZ1bmN0aW9uKCl7aWYoMSZ0aGlzLmYpdGhyb3cgbmV3IEVycm9yKFwiQ3ljbGUgZGV0ZWN0ZWRcIik7dmFyIGk9YSh0aGlzKTt0aGlzLmgoKTtpZih2b2lkIDAhPT1pKWkuaT10aGlzLmk7aWYoMTYmdGhpcy5mKXRocm93IHRoaXMudjtyZXR1cm4gdGhpcy52fX0pO2Z1bmN0aW9uIGcoaSx0KXtyZXR1cm4gbmV3IHAoaSx0KX1mdW5jdGlvbiBTKGkpe3ZhciBuPWkubTtpLm09dm9pZCAwO2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIG4pe3MrKzt2YXIgbz1yO3I9dm9pZCAwO3RyeXtuKCl9Y2F0Y2godCl7aS5mJj0tMjtpLmZ8PTg7bShpKTt0aHJvdyB0fWZpbmFsbHl7cj1vO3QoKX19fWZ1bmN0aW9uIG0oaSl7Zm9yKHZhciB0PWkuczt2b2lkIDAhPT10O3Q9dC5uKXQuUy5VKHQpO2kueD12b2lkIDA7aS5zPXZvaWQgMDtTKGkpfWZ1bmN0aW9uIHgoaSl7aWYociE9PXRoaXMpdGhyb3cgbmV3IEVycm9yKFwiT3V0LW9mLW9yZGVyIGVmZmVjdFwiKTtiKHRoaXMpO3I9aTt0aGlzLmYmPS0yO2lmKDgmdGhpcy5mKW0odGhpcyk7dCgpfWZ1bmN0aW9uIEUoaSx0KXt0aGlzLng9aTt0aGlzLm09dm9pZCAwO3RoaXMucz12b2lkIDA7dGhpcy51PXZvaWQgMDt0aGlzLmY9MzI7dGhpcy5uYW1lPW51bGw9PXQ/dm9pZCAwOnQubmFtZTtpZihmKWYucHVzaCh0aGlzKX1FLnByb3RvdHlwZS5jPWZ1bmN0aW9uKCl7dmFyIGk9dGhpcy5TKCk7dHJ5e2lmKDgmdGhpcy5mKXJldHVybjtpZih2b2lkIDA9PT10aGlzLngpcmV0dXJuO3ZhciB0PXRoaXMueCgpO2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIHQpdGhpcy5tPXR9ZmluYWxseXtpKCl9fTtFLnByb3RvdHlwZS5TPWZ1bmN0aW9uKCl7aWYoMSZ0aGlzLmYpdGhyb3cgbmV3IEVycm9yKFwiQ3ljbGUgZGV0ZWN0ZWRcIik7dGhpcy5mfD0xO3RoaXMuZiY9LTk7Uyh0aGlzKTtfKHRoaXMpO3MrKzt2YXIgaT1yO3I9dGhpcztyZXR1cm4geC5iaW5kKHRoaXMsaSl9O0UucHJvdG90eXBlLk49ZnVuY3Rpb24oKXtpZighKDImdGhpcy5mKSl7dGhpcy5mfD0yO3RoaXMudT1oO2g9dGhpc319O0UucHJvdG90eXBlLmQ9ZnVuY3Rpb24oKXt0aGlzLmZ8PTg7aWYoISgxJnRoaXMuZikpbSh0aGlzKX07RS5wcm90b3R5cGUuZGlzcG9zZT1mdW5jdGlvbigpe3RoaXMuZCgpfTtmdW5jdGlvbiBqKGksdCl7dmFyIG49bmV3IEUoaSx0KTt0cnl7bi5jKCl9Y2F0Y2goaSl7bi5kKCk7dGhyb3cgaX12YXIgcj1uLmQuYmluZChuKTtyW1N5bWJvbC5kaXNwb3NlXT1yO3JldHVybiByfWZ1bmN0aW9uIEMoaSl7cmV0dXJuIGZ1bmN0aW9uKCl7dmFyIHQ9YXJndW1lbnRzLHI9dGhpcztyZXR1cm4gbihmdW5jdGlvbigpe3JldHVybiBvKGZ1bmN0aW9uKCl7cmV0dXJuIGkuYXBwbHkocixbXS5zbGljZS5jYWxsKHQpKX0pfSl9fWZ1bmN0aW9uIE8oKXt2YXIgaT1mO2Y9W107cmV0dXJuIGZ1bmN0aW9uKCl7dmFyIHQ9ZjtpZihmJiZpKWk9aS5jb25jYXQoZik7Zj1pO3JldHVybiB0fX12YXIgaz1mdW5jdGlvbihpKXtmb3IodmFyIHQgaW4gaSl7dmFyIG49aVt0XTtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBuKWlbdF09QyhuKTtlbHNlIGlmKFwib2JqZWN0XCI9PXR5cGVvZiBuJiZudWxsIT09biYmIShcImJyYW5kXCJpbiBuKSlrKG4pfX07ZnVuY3Rpb24gVChpKXtyZXR1cm4gZnVuY3Rpb24oKXt2YXIgdCxuLHI9TygpO3RyeXtuPWkuYXBwbHkodm9pZCAwLFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKSl9Y2F0Y2goaSl7Zj12b2lkIDA7dGhyb3cgaX1maW5hbGx5e3Q9cigpfWsobik7bltTeW1ib2wuZGlzcG9zZV09QyhmdW5jdGlvbigpe2lmKHQpZm9yKHZhciBpPTA7aTx0Lmxlbmd0aDtpKyspdFtpXS5kaXNwb3NlKCk7dD12b2lkIDB9KTtyZXR1cm4gbn19ZXhwb3J0e3AgYXMgQ29tcHV0ZWQsRSBhcyBFZmZlY3QsbCBhcyBTaWduYWwsQyBhcyBhY3Rpb24sbiBhcyBiYXRjaCxnIGFzIGNvbXB1dGVkLFQgYXMgY3JlYXRlTW9kZWwsaiBhcyBlZmZlY3QseSBhcyBzaWduYWwsbyBhcyB1bnRyYWNrZWR9Oy8vIyBzb3VyY2VNYXBwaW5nVVJMPXNpZ25hbHMtY29yZS5tb2R1bGUuanMubWFwXG4iLCJleHBvcnQgZW51bSBQbGF5ZXJDb2xvciB7XG4gIFdISVRFID0gJ3doaXRlJyxcbiAgQkxBQ0sgPSAnYmxhY2snLFxufVxuXG5leHBvcnQgZW51bSBQaWVjZVR5cGUge1xuICBQQVdOID0gJ3Bhd24nLFxuICBLTklHSFQgPSAna25pZ2h0JyxcbiAgQklTSE9QID0gJ2Jpc2hvcCcsXG4gIFJPT0sgPSAncm9vaycsXG4gIFFVRUVOID0gJ3F1ZWVuJyxcbiAgS0lORyA9ICdraW5nJyxcbn1cblxuZXhwb3J0IGVudW0gUXVhZHJhbnQge1xuICBXSElURV9LSU5HID0gJ3drJyxcbiAgV0hJVEVfUVVFRU4gPSAnd3EnLFxuICBCTEFDS19LSU5HID0gJ2JrJyxcbiAgQkxBQ0tfUVVFRU4gPSAnYnEnLFxufVxuXG4vLyBIZWxwZXIgYXJyYXlzIGZvciBpdGVyYXRpb25cbmV4cG9ydCBjb25zdCBQTEFZRVJfQ09MT1JfVkFMVUVTID0gT2JqZWN0LnZhbHVlcyhQbGF5ZXJDb2xvcilcbmV4cG9ydCBjb25zdCBQSUVDRV9UWVBFX1ZBTFVFUyA9IE9iamVjdC52YWx1ZXMoUGllY2VUeXBlKVxuZXhwb3J0IGNvbnN0IFFVQURSQU5UX1ZBTFVFUyA9IE9iamVjdC52YWx1ZXMoUXVhZHJhbnQpXG4iLCJleHBvcnQgZW51bSBLZXlib2FyZENvbW1hbmQge1xuICBQV0sgPSAncHdrJyxcbiAgUFdRID0gJ3B3cScsXG4gIFBCSyA9ICdwYmsnLFxuICBQQlEgPSAncGJxJyxcbiAgUEEgPSAncGEnLFxuICBQV1cgPSAncHd3JyxcbiAgUEJCID0gJ3BiYicsXG4gIFBTUyA9ICdwc3MnLFxufVxuXG5leHBvcnQgZW51bSBTcGVlY2hDb21tYW5kIHtcbiAgQUxMID0gJ2FsbCcsXG4gIFdISVRFID0gJ3doaXRlJyxcbiAgQkxBQ0sgPSAnYmxhY2snLFxuICBTVE9QID0gJ3N0b3AnLFxuICBXSyA9ICd3aycsXG4gIFdRID0gJ3dxJyxcbiAgQksgPSAnYmsnLFxuICBCUSA9ICdicScsXG59XG5cbi8vIEtleWJvYXJkIHRvIHNwZWVjaCBjb21tYW5kIG1hcHBpbmdcbmV4cG9ydCBjb25zdCBLRVlCT0FSRF9DT01NQU5EX01BUCA9IG5ldyBNYXAoW1xuICBbS2V5Ym9hcmRDb21tYW5kLlBXSywgU3BlZWNoQ29tbWFuZC5XS10sXG4gIFtLZXlib2FyZENvbW1hbmQuUFdRLCBTcGVlY2hDb21tYW5kLldRXSxcbiAgW0tleWJvYXJkQ29tbWFuZC5QQkssIFNwZWVjaENvbW1hbmQuQktdLFxuICBbS2V5Ym9hcmRDb21tYW5kLlBCUSwgU3BlZWNoQ29tbWFuZC5CUV0sXG4gIFtLZXlib2FyZENvbW1hbmQuUEEsIFNwZWVjaENvbW1hbmQuQUxMXSxcbiAgW0tleWJvYXJkQ29tbWFuZC5QV1csIFNwZWVjaENvbW1hbmQuV0hJVEVdLFxuICBbS2V5Ym9hcmRDb21tYW5kLlBCQiwgU3BlZWNoQ29tbWFuZC5CTEFDS10sXG4gIFtLZXlib2FyZENvbW1hbmQuUFNTLCBTcGVlY2hDb21tYW5kLlNUT1BdLFxuXSBhcyBjb25zdClcbiIsIi8vIERPTSBzZWxlY3RvcnMgZW51bVxuZXhwb3J0IGVudW0gRG9tU2VsZWN0b3Ige1xuICBCT0FSRCA9ICdjZy1ib2FyZCcsXG4gIEJPQVJEX05PX0NVU1RPTSA9ICdjZy1ib2FyZDpub3QoLnVzZXJzY3JpcHQtY3VzdG9tLWJvYXJkKScsXG4gIENPT1JEUyA9ICdjb29yZHMnLFxuICBQSUVDRSA9ICdwaWVjZScsXG4gIENPTlRBSU5FUiA9ICdjZy1jb250YWluZXInLFxuICBLRVlCT0FSRF9NT1ZFID0gJy5rZXlib2FyZC1tb3ZlJyxcbiAgS0VZQk9BUkRfSU5QVVQgPSAnLmtleWJvYXJkLW1vdmUgaW5wdXQnLFxufVxuXG4vLyBDU1MgY2xhc3NlcyBlbnVtXG5leHBvcnQgZW51bSBDc3NDbGFzcyB7XG4gIEJMQUNLID0gJ2JsYWNrJyxcbiAgVVNFUlNDUklQVF9ESVZJREVSUyA9ICd1c2Vyc2NyaXB0LWRpdmlkZXJzJyxcbiAgVVNFUlNDUklQVF9GTEFTSCA9ICd1c2Vyc2NyaXB0LWZsYXNoLW92ZXJsYXknLFxufVxuXG4vLyBDU1MgZGlzcGxheSB2YWx1ZXMgZW51bVxuZXhwb3J0IGVudW0gQ3NzRGlzcGxheSB7XG4gIEJMT0NLID0gJ2Jsb2NrJyxcbiAgTk9ORSA9ICdub25lJyxcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBjcmVhdGVEaXYoKTogSFRNTERpdkVsZW1lbnQge1xuICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVN2Z0VsZW1lbnQodGFnOiBzdHJpbmcpOiBTVkdFbGVtZW50IHtcbiAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCB0YWcpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBxdWVyeVNlbGVjdG9yKHNlbGVjdG9yOiBzdHJpbmcpOiBFbGVtZW50IHwgbnVsbCB7XG4gIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcjogc3RyaW5nKTogTm9kZUxpc3RPZjxFbGVtZW50PiB7XG4gIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXBwZW5kQ2hpbGQocGFyZW50OiBFbGVtZW50LCBjaGlsZDogRWxlbWVudCk6IHZvaWQge1xuICBwYXJlbnQuYXBwZW5kQ2hpbGQoY2hpbGQpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRCb3VuZGluZ0NsaWVudFJlY3QoZWxlbWVudDogRWxlbWVudCk6IERPTVJlY3Qge1xuICByZXR1cm4gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gd2FpdEZvckVsZW1lbnQoc2VsZWN0b3I6IHN0cmluZyk6IFByb21pc2U8RWxlbWVudD4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICBjb25zdCBlbGVtZW50ID0gcXVlcnlTZWxlY3RvcihzZWxlY3RvcilcbiAgICBpZiAoZWxlbWVudCkge1xuICAgICAgcmVzb2x2ZShlbGVtZW50KVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gcXVlcnlTZWxlY3RvcihzZWxlY3RvcilcbiAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgIG9ic2VydmVyLmRpc2Nvbm5lY3QoKVxuICAgICAgICByZXNvbHZlKGVsZW1lbnQpXG4gICAgICB9XG4gICAgfSlcblxuICAgIG9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuYm9keSwge1xuICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgc3VidHJlZTogdHJ1ZSxcbiAgICB9KVxuICB9KVxufVxuIiwiaW1wb3J0IHsgQ3NzQ2xhc3MsIENzc0Rpc3BsYXksIERvbVNlbGVjdG9yIH0gZnJvbSAnLi4vY29uc3RhbnRzJ1xuaW1wb3J0IHsgYXBwZW5kQ2hpbGQsIGNyZWF0ZVN2Z0VsZW1lbnQsIHF1ZXJ5U2VsZWN0b3IgfSBmcm9tICcuLi9wbGF0Zm9ybS9kb20nXG5cbmV4cG9ydCBpbnRlcmZhY2UgRGl2aWRlcnNTdGF0ZSB7XG4gIHN2ZzogU1ZHU1ZHRWxlbWVudFxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRGl2aWRlcnMoKTogRGl2aWRlcnNTdGF0ZSB7XG4gIGNvbnN0IGJvYXJkID0gcXVlcnlTZWxlY3RvcihEb21TZWxlY3Rvci5CT0FSRClcbiAgaWYgKCFib2FyZCkge1xuICAgIHRocm93IG5ldyBFcnJvcignQm9hcmQgbm90IGZvdW5kJylcbiAgfVxuXG4gIGNvbnN0IHJlY3QgPSBib2FyZC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICBjb25zdCBzaXplID0gcmVjdC53aWR0aFxuXG4gIGNvbnN0IHN2ZyA9IGNyZWF0ZVN2Z0VsZW1lbnQoJ3N2ZycpIGFzIFNWR1NWR0VsZW1lbnRcbiAgc3ZnLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBDc3NDbGFzcy5VU0VSU0NSSVBUX0RJVklERVJTKVxuICBzdmcuc2V0QXR0cmlidXRlKCd3aWR0aCcsIHNpemUudG9TdHJpbmcoKSlcbiAgc3ZnLnNldEF0dHJpYnV0ZSgnaGVpZ2h0Jywgc2l6ZS50b1N0cmluZygpKVxuICBzdmcuc3R5bGUuY3NzVGV4dCA9IGBcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAwO1xuICAgIGxlZnQ6IDA7XG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgYFxuXG4gIC8vIFZlcnRpY2FsIGxpbmVcbiAgY29uc3QgdkxpbmUgPSBjcmVhdGVTdmdFbGVtZW50KCdsaW5lJylcbiAgdkxpbmUuc2V0QXR0cmlidXRlKCd4MScsIChzaXplIC8gMikudG9TdHJpbmcoKSlcbiAgdkxpbmUuc2V0QXR0cmlidXRlKCd5MScsICcwJylcbiAgdkxpbmUuc2V0QXR0cmlidXRlKCd4MicsIChzaXplIC8gMikudG9TdHJpbmcoKSlcbiAgdkxpbmUuc2V0QXR0cmlidXRlKCd5MicsIHNpemUudG9TdHJpbmcoKSlcbiAgdkxpbmUuc2V0QXR0cmlidXRlKCdzdHJva2UnLCAncmVkJylcbiAgdkxpbmUuc2V0QXR0cmlidXRlKCdzdHJva2Utd2lkdGgnLCAnMicpXG5cbiAgLy8gSG9yaXpvbnRhbCBsaW5lXG4gIGNvbnN0IGhMaW5lID0gY3JlYXRlU3ZnRWxlbWVudCgnbGluZScpXG4gIGhMaW5lLnNldEF0dHJpYnV0ZSgneDEnLCAnMCcpXG4gIGhMaW5lLnNldEF0dHJpYnV0ZSgneTEnLCAoc2l6ZSAvIDIpLnRvU3RyaW5nKCkpXG4gIGhMaW5lLnNldEF0dHJpYnV0ZSgneDInLCBzaXplLnRvU3RyaW5nKCkpXG4gIGhMaW5lLnNldEF0dHJpYnV0ZSgneTInLCAoc2l6ZSAvIDIpLnRvU3RyaW5nKCkpXG4gIGhMaW5lLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJywgJ3JlZCcpXG4gIGhMaW5lLnNldEF0dHJpYnV0ZSgnc3Ryb2tlLXdpZHRoJywgJzInKVxuXG4gIGFwcGVuZENoaWxkKHN2ZywgdkxpbmUpXG4gIGFwcGVuZENoaWxkKHN2ZywgaExpbmUpXG5cbiAgYXBwZW5kQ2hpbGQoYm9hcmQsIHN2ZylcblxuICByZXR1cm4geyBzdmcgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvd0RpdmlkZXJzKHN0YXRlOiBEaXZpZGVyc1N0YXRlKTogdm9pZCB7XG4gIHN0YXRlLnN2Zy5zdHlsZS5kaXNwbGF5ID0gQ3NzRGlzcGxheS5CTE9DS1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGlkZURpdmlkZXJzKHN0YXRlOiBEaXZpZGVyc1N0YXRlKTogdm9pZCB7XG4gIHN0YXRlLnN2Zy5zdHlsZS5kaXNwbGF5ID0gQ3NzRGlzcGxheS5OT05FXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXN0cm95RGl2aWRlcnMoc3RhdGU6IERpdmlkZXJzU3RhdGUpOiB2b2lkIHtcbiAgc3RhdGUuc3ZnLnJlbW92ZSgpXG59XG4iLCJpbXBvcnQgeyBDc3NDbGFzcywgQ3NzRGlzcGxheSwgRG9tU2VsZWN0b3IgfSBmcm9tICcuLi9jb25zdGFudHMnXG5pbXBvcnQgeyBhcHBlbmRDaGlsZCwgY3JlYXRlRGl2LCBxdWVyeVNlbGVjdG9yIH0gZnJvbSAnLi4vcGxhdGZvcm0vZG9tJ1xuXG5leHBvcnQgaW50ZXJmYWNlIEZsYXNoT3ZlcmxheVN0YXRlIHtcbiAgb3ZlcmxheTogSFRNTEVsZW1lbnRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZsYXNoT3ZlcmxheSgpOiBGbGFzaE92ZXJsYXlTdGF0ZSB7XG4gIGNvbnN0IG92ZXJsYXkgPSBjcmVhdGVEaXYoKVxuICBvdmVybGF5LmNsYXNzTmFtZSA9IENzc0NsYXNzLlVTRVJTQ1JJUFRfRkxBU0hcbiAgb3ZlcmxheS5zdHlsZS5jc3NUZXh0ID0gYFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDA7XG4gICAgbGVmdDogMDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgYmFja2dyb3VuZDogYmxhY2s7XG4gICAgei1pbmRleDogMTAwMDtcbiAgICBkaXNwbGF5OiBub25lO1xuICBgXG5cbiAgY29uc3QgY29udGFpbmVyID0gcXVlcnlTZWxlY3RvcihEb21TZWxlY3Rvci5DT05UQUlORVIpXG4gIGlmIChjb250YWluZXIpIHtcbiAgICBhcHBlbmRDaGlsZChjb250YWluZXIsIG92ZXJsYXkpXG4gIH1cblxuICByZXR1cm4geyBvdmVybGF5IH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNob3dGbGFzaChzdGF0ZTogRmxhc2hPdmVybGF5U3RhdGUpOiB2b2lkIHtcbiAgc3RhdGUub3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gQ3NzRGlzcGxheS5CTE9DS1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGlkZUZsYXNoKHN0YXRlOiBGbGFzaE92ZXJsYXlTdGF0ZSk6IHZvaWQge1xuICBzdGF0ZS5vdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBDc3NEaXNwbGF5Lk5PTkVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlc3Ryb3lGbGFzaE92ZXJsYXkoc3RhdGU6IEZsYXNoT3ZlcmxheVN0YXRlKTogdm9pZCB7XG4gIHN0YXRlLm92ZXJsYXkucmVtb3ZlKClcbn1cbiIsImltcG9ydCB7IHR5cGUgRGl2aWRlcnNTdGF0ZSwgaGlkZURpdmlkZXJzLCBzaG93RGl2aWRlcnMgfSBmcm9tICcuLi9hZGFwdGVycy1vdmVybGF5cy9kaXZpZGVycydcbmltcG9ydCB0eXBlIHsgU2V0dGluZ3NTdG9yZSB9IGZyb20gJy4uL2FwcGxpY2F0aW9uLXNldHRpbmdzL3NldHRpbmdzU3RvcmUnXG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVEaXZpZGVycyhzdGF0ZTogRGl2aWRlcnNTdGF0ZSwgc2V0dGluZ3M6IFNldHRpbmdzU3RvcmUpOiB2b2lkIHtcbiAgaWYgKHNldHRpbmdzLmRpdmlkZXJzRW5hYmxlZC52YWx1ZSkge1xuICAgIHNob3dEaXZpZGVycyhzdGF0ZSlcbiAgfSBlbHNlIHtcbiAgICBoaWRlRGl2aWRlcnMoc3RhdGUpXG4gIH1cbn1cbiIsImltcG9ydCB7IGVmZmVjdCB9IGZyb20gJ0BwcmVhY3Qvc2lnbmFscy1jb3JlJ1xuaW1wb3J0IHR5cGUgeyBEaXZpZGVyc1N0YXRlIH0gZnJvbSAnLi4vYWRhcHRlcnMtb3ZlcmxheXMvZGl2aWRlcnMnXG5pbXBvcnQgeyB1cGRhdGVEaXZpZGVycyB9IGZyb20gJy4uL2FwcGxpY2F0aW9uLWhhbmRsZXJzL3VwZGF0ZURpdmlkZXJzJ1xuaW1wb3J0IHR5cGUgeyBTZXR0aW5nc1N0b3JlIH0gZnJvbSAnLi4vYXBwbGljYXRpb24tc2V0dGluZ3Mvc2V0dGluZ3NTdG9yZSdcblxuZXhwb3J0IGZ1bmN0aW9uIHNldHVwRGl2aWRlcnNFZmZlY3Qoc3RhdGU6IERpdmlkZXJzU3RhdGUsIHNldHRpbmdzOiBTZXR0aW5nc1N0b3JlKTogKCkgPT4gdm9pZCB7XG4gIHJldHVybiBlZmZlY3QoKCkgPT4ge1xuICAgIHNldHRpbmdzLmRpdmlkZXJzRW5hYmxlZC52YWx1ZVxuICAgIHVwZGF0ZURpdmlkZXJzKHN0YXRlLCBzZXR0aW5ncylcbiAgfSlcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBnZXRTcGVlY2hTeW50aGVzaXMoKTogU3BlZWNoU3ludGhlc2lzIHtcbiAgcmV0dXJuIHdpbmRvdy5zcGVlY2hTeW50aGVzaXNcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNwZWVjaFN5bnRoZXNpc1V0dGVyYW5jZSgpOiB0eXBlb2YgU3BlZWNoU3ludGhlc2lzVXR0ZXJhbmNlIHtcbiAgcmV0dXJuIFNwZWVjaFN5bnRoZXNpc1V0dGVyYW5jZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc3BlYWsoc3ludGhlc2lzOiBTcGVlY2hTeW50aGVzaXMsIHV0dGVyYW5jZTogU3BlZWNoU3ludGhlc2lzVXR0ZXJhbmNlKTogdm9pZCB7XG4gIHN5bnRoZXNpcy5zcGVhayh1dHRlcmFuY2UpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYW5jZWwoc3ludGhlc2lzOiBTcGVlY2hTeW50aGVzaXMpOiB2b2lkIHtcbiAgc3ludGhlc2lzLmNhbmNlbCgpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVVdHRlcmFuY2UoXG4gIFV0dGVyYW5jZUNsYXNzOiB0eXBlb2YgU3BlZWNoU3ludGhlc2lzVXR0ZXJhbmNlLFxuICB0ZXh0OiBzdHJpbmdcbik6IFNwZWVjaFN5bnRoZXNpc1V0dGVyYW5jZSB7XG4gIHJldHVybiBuZXcgVXR0ZXJhbmNlQ2xhc3ModGV4dClcbn1cbiIsImltcG9ydCAqIGFzIHNwZWVjaEFwaSBmcm9tICcuLi9wbGF0Zm9ybS9zcGVlY2hBcGknXG5cbmxldCBjdXJyZW50UmF0ZSA9IDEuMFxuXG5leHBvcnQgZnVuY3Rpb24gc3BlYWsodGV4dDogc3RyaW5nLCByYXRlOiBudW1iZXIpOiB2b2lkIHtcbiAgY29uc3Qgc3ludGhlc2lzID0gc3BlZWNoQXBpLmdldFNwZWVjaFN5bnRoZXNpcygpXG4gIGNvbnN0IFV0dGVyYW5jZUNsYXNzID0gc3BlZWNoQXBpLmdldFNwZWVjaFN5bnRoZXNpc1V0dGVyYW5jZSgpXG4gIGNvbnN0IHV0dGVyYW5jZSA9IHNwZWVjaEFwaS5jcmVhdGVVdHRlcmFuY2UoVXR0ZXJhbmNlQ2xhc3MsIHRleHQpXG4gIHV0dGVyYW5jZS5yYXRlID0gcmF0ZVxuICBzcGVlY2hBcGkuc3BlYWsoc3ludGhlc2lzLCB1dHRlcmFuY2UpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdG9wU3BlYWtpbmcoKTogdm9pZCB7XG4gIGNvbnN0IHN5bnRoZXNpcyA9IHNwZWVjaEFwaS5nZXRTcGVlY2hTeW50aGVzaXMoKVxuICBzcGVlY2hBcGkuY2FuY2VsKHN5bnRoZXNpcylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldFJhdGUocmF0ZTogbnVtYmVyKTogdm9pZCB7XG4gIGN1cnJlbnRSYXRlID0gcmF0ZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmF0ZSgpOiBudW1iZXIge1xuICByZXR1cm4gY3VycmVudFJhdGVcbn1cbiIsImltcG9ydCB7IFBsYXllckNvbG9yIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzJ1xuXG5leHBvcnQgaW50ZXJmYWNlIFBpeGVsUG9zaXRpb24ge1xuICB4OiBudW1iZXJcbiAgeTogbnVtYmVyXG59XG5cbmNvbnN0IEZJTEVTID0gJ2FiY2RlZmdoJ1xuXG5leHBvcnQgZnVuY3Rpb24gcGl4ZWxzVG9TcXVhcmUoXG4gIHBvc2l0aW9uOiBQaXhlbFBvc2l0aW9uLFxuICBzcXVhcmVTaXplOiBudW1iZXIsXG4gIHBsYXllckNvbG9yOiBQbGF5ZXJDb2xvclxuKTogc3RyaW5nIHtcbiAgLy8gQ29udmVydCBwaXhlbHMgdG8gZ3JpZCBpbmRpY2VzICgwLTcpXG4gIC8vIEFkanVzdCBmb3IgY2VudGVyLWJhc2VkIGNvb3JkaW5hdGVzIGJlZm9yZSByb3VuZGluZ1xuICBsZXQgY29sID0gTWF0aC5yb3VuZCgocG9zaXRpb24ueCAtIHNxdWFyZVNpemUgLyAyKSAvIHNxdWFyZVNpemUpXG4gIGxldCByb3cgPSBNYXRoLnJvdW5kKChwb3NpdGlvbi55IC0gc3F1YXJlU2l6ZSAvIDIpIC8gc3F1YXJlU2l6ZSlcblxuICAvLyBDbGFtcCB0byB2YWxpZCByYW5nZVxuICBjb2wgPSBNYXRoLm1heCgwLCBNYXRoLm1pbig3LCBjb2wpKVxuICByb3cgPSBNYXRoLm1heCgwLCBNYXRoLm1pbig3LCByb3cpKVxuXG4gIC8vIENvbnZlcnQgdG8gcmFuayBiYXNlZCBvbiBwbGF5ZXIgY29sb3JcbiAgLy8gRm9yIHdoaXRlOiB5PTAgaXMgcmFuayA4LCB5IGluY3JlYXNlcyBnb2luZyB0byByYW5rIDFcbiAgLy8gRm9yIGJsYWNrOiB5PTAgaXMgcmFuayAxLCB5IGluY3JlYXNlcyBnb2luZyB0byByYW5rIDhcbiAgbGV0IHJhbms6IG51bWJlclxuICBsZXQgZmlsZTogc3RyaW5nXG5cbiAgaWYgKHBsYXllckNvbG9yID09PSBQbGF5ZXJDb2xvci5XSElURSkge1xuICAgIGZpbGUgPSBGSUxFU1tjb2xdXG4gICAgcmFuayA9IDggLSByb3dcbiAgfSBlbHNlIHtcbiAgICBmaWxlID0gRklMRVNbNyAtIGNvbF1cbiAgICByYW5rID0gcm93ICsgMVxuICB9XG5cbiAgcmV0dXJuIGAke2ZpbGV9JHtyYW5rfWBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNxdWFyZVRvUGl4ZWxzKFxuICBzcXVhcmU6IHN0cmluZyxcbiAgc3F1YXJlU2l6ZTogbnVtYmVyLFxuICBwbGF5ZXJDb2xvcjogUGxheWVyQ29sb3Jcbik6IFBpeGVsUG9zaXRpb24ge1xuICAvLyBWYWxpZGF0ZSBzcXVhcmUgZm9ybWF0XG4gIGlmIChzcXVhcmUubGVuZ3RoIDwgMikge1xuICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBzcXVhcmUgbm90YXRpb246ICR7c3F1YXJlfWApXG4gIH1cblxuICAvLyBQYXJzZSBzcXVhcmUgbm90YXRpb25cbiAgY29uc3QgZmlsZSA9IHNxdWFyZVswXVxuICBjb25zdCByYW5rID0gTnVtYmVyLnBhcnNlSW50KHNxdWFyZVsxXSwgMTApXG5cbiAgLy8gVmFsaWRhdGUgZmlsZSBhbmQgcmFua1xuICBjb25zdCBjb2wgPSBGSUxFUy5pbmRleE9mKGZpbGUpXG4gIGlmIChjb2wgPT09IC0xKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGZpbGU6ICR7ZmlsZX1gKVxuICB9XG4gIGlmIChyYW5rIDwgMSB8fCByYW5rID4gOCB8fCBOdW1iZXIuaXNOYU4ocmFuaykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgcmFuazogJHtyYW5rfWApXG4gIH1cblxuICAvLyBDYWxjdWxhdGUgcGl4ZWwgcG9zaXRpb24gYmFzZWQgb24gcGxheWVyIGNvbG9yXG4gIGxldCBwaXhlbENvbDogbnVtYmVyXG4gIGxldCBwaXhlbFJvdzogbnVtYmVyXG5cbiAgaWYgKHBsYXllckNvbG9yID09PSBQbGF5ZXJDb2xvci5XSElURSkge1xuICAgIC8vIEZvciB3aGl0ZTogZmlsZXMgZ28gbGVmdC10by1yaWdodCAoYS1oKSwgcmFua3MgZ28gYm90dG9tLXRvLXRvcCAoMS04KVxuICAgIC8vIFNvIHJhbmsgMSBpcyBhdCBib3R0b20gKHJvdyA3KSwgcmFuayA4IGlzIGF0IHRvcCAocm93IDApXG4gICAgcGl4ZWxDb2wgPSBjb2xcbiAgICBwaXhlbFJvdyA9IDggLSByYW5rXG4gIH0gZWxzZSB7XG4gICAgLy8gRm9yIGJsYWNrOiBmaWxlcyBnbyByaWdodC10by1sZWZ0IChoLWEpLCByYW5rcyBnbyB0b3AtdG8tYm90dG9tICg4LTEpXG4gICAgLy8gU28gcmFuayA4IGlzIGF0IHRvcCAocm93IDApLCByYW5rIDEgaXMgYXQgYm90dG9tIChyb3cgNylcbiAgICBwaXhlbENvbCA9IDcgLSBjb2xcbiAgICBwaXhlbFJvdyA9IHJhbmsgLSAxXG4gIH1cblxuICAvLyBDb252ZXJ0IHRvIHBpeGVscyAoY2VudGVyIG9mIHNxdWFyZSlcbiAgcmV0dXJuIHtcbiAgICB4OiBwaXhlbENvbCAqIHNxdWFyZVNpemUgKyBzcXVhcmVTaXplIC8gMixcbiAgICB5OiBwaXhlbFJvdyAqIHNxdWFyZVNpemUgKyBzcXVhcmVTaXplIC8gMixcbiAgfVxufVxuIiwiaW1wb3J0IHsgZ2V0Qm91bmRpbmdDbGllbnRSZWN0IH0gZnJvbSAnLi4vLi4vLi4vcGxhdGZvcm0vZG9tJ1xuXG5leHBvcnQgaW50ZXJmYWNlIFJhd1BpZWNlRGF0YSB7XG4gIGNvbG9yOiBzdHJpbmdcbiAgdHlwZTogc3RyaW5nXG4gIHg6IG51bWJlclxuICB5OiBudW1iZXJcbn1cblxuZXhwb3J0IGludGVyZmFjZSBCb2FyZE1ldHJpY3Mge1xuICBib2FyZFdpZHRoOiBudW1iZXJcbiAgc3F1YXJlU2l6ZTogbnVtYmVyXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0Qm9hcmRNZXRyaWNzKGJvYXJkRWxlbWVudDogSFRNTEVsZW1lbnQpOiBCb2FyZE1ldHJpY3Mge1xuICAvLyBQYXJzZSB3aWR0aCBmcm9tIHN0eWxlIGF0dHJpYnV0ZSBzaW5jZSBnZXRCb3VuZGluZ0NsaWVudFJlY3QgbWF5IG5vdCB3b3JrIGluIHRlc3QgZW52aXJvbm1lbnRzXG4gIGNvbnN0IHdpZHRoTWF0Y2ggPSBib2FyZEVsZW1lbnQuc3R5bGUuY3NzVGV4dC5tYXRjaCgvd2lkdGg6XFxzKihbMC05Ll0rKXB4LylcbiAgY29uc3QgYm9hcmRXaWR0aCA9IHdpZHRoTWF0Y2hcbiAgICA/IE51bWJlci5wYXJzZUZsb2F0KHdpZHRoTWF0Y2hbMV0pXG4gICAgOiBnZXRCb3VuZGluZ0NsaWVudFJlY3QoYm9hcmRFbGVtZW50KS53aWR0aFxuICBjb25zdCBzcXVhcmVTaXplID0gYm9hcmRXaWR0aCAvIDhcblxuICByZXR1cm4geyBib2FyZFdpZHRoLCBzcXVhcmVTaXplIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3RQaWVjZURhdGEocGllY2VFbGVtZW50OiBFbGVtZW50LCBzcXVhcmVTaXplOiBudW1iZXIpOiBSYXdQaWVjZURhdGEgfCBudWxsIHtcbiAgLy8gRXh0cmFjdCBjb2xvciBhbmQgdHlwZSBmcm9tIGNsYXNzXG4gIGNvbnN0IGNsYXNzZXMgPSBwaWVjZUVsZW1lbnQuY2xhc3NOYW1lLnNwbGl0KCcgJylcbiAgY29uc3QgY29sb3JTdHIgPSBjbGFzc2VzWzBdXG4gIGNvbnN0IHR5cGVTdHIgPSBjbGFzc2VzWzFdXG5cbiAgaWYgKCFjb2xvclN0ciB8fCAhdHlwZVN0cikgcmV0dXJuIG51bGxcblxuICAvLyBFeHRyYWN0IHBvc2l0aW9uIGZyb20gdHJhbnNmb3JtXG4gIGNvbnN0IHRyYW5zZm9ybSA9IChwaWVjZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLnRyYW5zZm9ybVxuICBjb25zdCBtYXRjaCA9IHRyYW5zZm9ybS5tYXRjaCgvdHJhbnNsYXRlXFwoKFswLTkuXSspcHgsP1xccyooWzAtOS5dKylweD9cXCkvKVxuICBpZiAoIW1hdGNoKSByZXR1cm4gbnVsbFxuXG4gIC8vIFRyYW5zZm9ybSBnaXZlcyBib3R0b20tbGVmdCBjb3JuZXIsIGNvbnZlcnQgdG8gY2VudGVyXG4gIGNvbnN0IHggPSBOdW1iZXIucGFyc2VGbG9hdChtYXRjaFsxXSkgKyBzcXVhcmVTaXplIC8gMlxuICBjb25zdCB5ID0gTnVtYmVyLnBhcnNlRmxvYXQobWF0Y2hbMl0pIC0gc3F1YXJlU2l6ZSAvIDJcblxuICByZXR1cm4ge1xuICAgIGNvbG9yOiBjb2xvclN0cixcbiAgICB0eXBlOiB0eXBlU3RyLFxuICAgIHgsXG4gICAgeSxcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ3NzQ2xhc3MsIERvbVNlbGVjdG9yLCB0eXBlIFBpZWNlVHlwZSwgUGxheWVyQ29sb3IgfSBmcm9tICcuLi8uLi8uLi9jb25zdGFudHMnXG5pbXBvcnQgeyBwaXhlbHNUb1NxdWFyZSB9IGZyb20gJy4uLy4uLy4uL2RvbWFpbi9jaGVzcy9jb29yZGluYXRlcydcbmltcG9ydCB0eXBlIHsgUGllY2VQb3NpdGlvbiB9IGZyb20gJy4uLy4uLy4uL2RvbWFpbi9jaGVzcy9waWVjZUdyb3VwaW5nJ1xuaW1wb3J0IHsgcXVlcnlTZWxlY3RvciB9IGZyb20gJy4uLy4uLy4uL3BsYXRmb3JtL2RvbSdcbmltcG9ydCB7IGV4dHJhY3RCb2FyZE1ldHJpY3MsIGV4dHJhY3RQaWVjZURhdGEgfSBmcm9tICcuL2V4dHJhY3Rpb24nXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQbGF5ZXJDb2xvcigpOiBQbGF5ZXJDb2xvciB7XG4gIGNvbnN0IGNvb3JkcyA9IHF1ZXJ5U2VsZWN0b3IoRG9tU2VsZWN0b3IuQ09PUkRTKVxuICByZXR1cm4gY29vcmRzPy5jbGFzc0xpc3QuY29udGFpbnMoQ3NzQ2xhc3MuQkxBQ0spID8gUGxheWVyQ29sb3IuQkxBQ0sgOiBQbGF5ZXJDb2xvci5XSElURVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVhZFBpZWNlUG9zaXRpb25zKCk6IFBpZWNlUG9zaXRpb25bXSB7XG4gIGNvbnN0IGJvYXJkID0gcXVlcnlTZWxlY3RvcihEb21TZWxlY3Rvci5CT0FSRF9OT19DVVNUT00pXG4gIGlmICghYm9hcmQpIHJldHVybiBbXVxuXG4gIGNvbnN0IHsgc3F1YXJlU2l6ZSB9ID0gZXh0cmFjdEJvYXJkTWV0cmljcyhib2FyZCBhcyBIVE1MRWxlbWVudClcbiAgY29uc3QgcGxheWVyQ29sb3IgPSBnZXRQbGF5ZXJDb2xvcigpXG5cbiAgY29uc3QgcGllY2VzID0gYm9hcmQucXVlcnlTZWxlY3RvckFsbChEb21TZWxlY3Rvci5QSUVDRSlcbiAgY29uc3QgcG9zaXRpb25zOiBQaWVjZVBvc2l0aW9uW10gPSBbXVxuXG4gIGZvciAoY29uc3QgcGllY2Ugb2YgcGllY2VzKSB7XG4gICAgY29uc3QgcmF3RGF0YSA9IGV4dHJhY3RQaWVjZURhdGEocGllY2UsIHNxdWFyZVNpemUpXG4gICAgaWYgKCFyYXdEYXRhKSBjb250aW51ZVxuXG4gICAgLy8gTWFwIHRvIGVudW1zXG4gICAgY29uc3QgY29sb3IgPSByYXdEYXRhLmNvbG9yID09PSAnd2hpdGUnID8gUGxheWVyQ29sb3IuV0hJVEUgOiBQbGF5ZXJDb2xvci5CTEFDS1xuICAgIGNvbnN0IHR5cGUgPSByYXdEYXRhLnR5cGUgYXMgUGllY2VUeXBlXG5cbiAgICBjb25zdCBzcXVhcmUgPSBwaXhlbHNUb1NxdWFyZSh7IHg6IHJhd0RhdGEueCwgeTogcmF3RGF0YS55IH0sIHNxdWFyZVNpemUsIHBsYXllckNvbG9yKVxuICAgIHBvc2l0aW9ucy5wdXNoKHsgc3F1YXJlLCBjb2xvciwgdHlwZSB9KVxuICB9XG5cbiAgcmV0dXJuIHBvc2l0aW9uc1xufVxuIiwiaW1wb3J0IHsgdHlwZSBQaWVjZVR5cGUsIFBsYXllckNvbG9yLCBRdWFkcmFudCB9IGZyb20gJy4uLy4uL2NvbnN0YW50cydcblxuZXhwb3J0IGludGVyZmFjZSBQaWVjZVBvc2l0aW9uIHtcbiAgc3F1YXJlOiBzdHJpbmdcbiAgY29sb3I6IFBsYXllckNvbG9yXG4gIHR5cGU6IFBpZWNlVHlwZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyUXVhZHJhbnQocGllY2VzOiBQaWVjZVBvc2l0aW9uW10sIHF1YWRyYW50OiBRdWFkcmFudCk6IFBpZWNlUG9zaXRpb25bXSB7XG4gIHJldHVybiBwaWVjZXMuZmlsdGVyKChwaWVjZSkgPT4ge1xuICAgIC8vIFZhbGlkYXRlIHNxdWFyZSBmb3JtYXRcbiAgICBpZiAoIXBpZWNlLnNxdWFyZSB8fCBwaWVjZS5zcXVhcmUubGVuZ3RoIDwgMikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHNxdWFyZSBmb3JtYXQ6ICR7cGllY2Uuc3F1YXJlfWApXG4gICAgfVxuXG4gICAgY29uc3QgZmlsZSA9IHBpZWNlLnNxdWFyZVswXVxuICAgIGNvbnN0IHJhbmsgPSBOdW1iZXIucGFyc2VJbnQocGllY2Uuc3F1YXJlWzFdLCAxMClcblxuICAgIC8vIFZhbGlkYXRlIGZpbGUgYW5kIHJhbmtcbiAgICBpZiAoZmlsZSA8ICdhJyB8fCBmaWxlID4gJ2gnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgZmlsZTogJHtmaWxlfWApXG4gICAgfVxuICAgIGlmIChOdW1iZXIuaXNOYU4ocmFuaykgfHwgcmFuayA8IDEgfHwgcmFuayA+IDgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCByYW5rOiAke3Jhbmt9YClcbiAgICB9XG5cbiAgICAvLyBEZXRlcm1pbmUgZmlsZSByYW5nZSAoa2luZy1zaWRlOiBlLWgsIHF1ZWVuLXNpZGU6IGEtZClcbiAgICBjb25zdCBpc0tpbmdTaWRlID0gZmlsZSA+PSAnZSdcblxuICAgIC8vIERldGVybWluZSByYW5rIHJhbmdlICh3aGl0ZTogMS00LCBibGFjazogNS04KVxuICAgIGNvbnN0IGlzV2hpdGVSYW5rcyA9IHJhbmsgPj0gMSAmJiByYW5rIDw9IDRcblxuICAgIC8vIE1hdGNoIHF1YWRyYW50XG4gICAgaWYgKHF1YWRyYW50ID09PSBRdWFkcmFudC5XSElURV9LSU5HKSByZXR1cm4gaXNLaW5nU2lkZSAmJiBpc1doaXRlUmFua3NcbiAgICBpZiAocXVhZHJhbnQgPT09IFF1YWRyYW50LldISVRFX1FVRUVOKSByZXR1cm4gIWlzS2luZ1NpZGUgJiYgaXNXaGl0ZVJhbmtzXG4gICAgaWYgKHF1YWRyYW50ID09PSBRdWFkcmFudC5CTEFDS19LSU5HKSByZXR1cm4gaXNLaW5nU2lkZSAmJiAhaXNXaGl0ZVJhbmtzXG4gICAgaWYgKHF1YWRyYW50ID09PSBRdWFkcmFudC5CTEFDS19RVUVFTikgcmV0dXJuICFpc0tpbmdTaWRlICYmICFpc1doaXRlUmFua3NcblxuICAgIHJldHVybiBmYWxzZVxuICB9KVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEdyb3VwZWRQaWVjZXMge1xuICBjb2xvcjogUGxheWVyQ29sb3JcbiAgdHlwZTogc3RyaW5nXG4gIHNxdWFyZXM6IHN0cmluZ1tdXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBncm91cEJ5Q29sb3JBbmRUeXBlKHBpZWNlczogUGllY2VQb3NpdGlvbltdKTogR3JvdXBlZFBpZWNlc1tdIHtcbiAgY29uc3QgZ3JvdXBzID0gbmV3IE1hcDxzdHJpbmcsIEdyb3VwZWRQaWVjZXM+KClcblxuICBmb3IgKGNvbnN0IHBpZWNlIG9mIHBpZWNlcykge1xuICAgIC8vIFZhbGlkYXRlIHJlcXVpcmVkIHByb3BlcnRpZXNcbiAgICBpZiAoIXBpZWNlLnNxdWFyZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQaWVjZSBtaXNzaW5nIHNxdWFyZSBwcm9wZXJ0eScpXG4gICAgfVxuICAgIGlmICghcGllY2UuY29sb3IpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUGllY2UgbWlzc2luZyBjb2xvciBwcm9wZXJ0eScpXG4gICAgfVxuICAgIGlmICghcGllY2UudHlwZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQaWVjZSBtaXNzaW5nIHR5cGUgcHJvcGVydHknKVxuICAgIH1cblxuICAgIGNvbnN0IGtleSA9IGAke3BpZWNlLmNvbG9yfS0ke3BpZWNlLnR5cGV9YFxuXG4gICAgaWYgKCFncm91cHMuaGFzKGtleSkpIHtcbiAgICAgIGdyb3Vwcy5zZXQoa2V5LCB7XG4gICAgICAgIGNvbG9yOiBwaWVjZS5jb2xvcixcbiAgICAgICAgdHlwZTogcGllY2UudHlwZSxcbiAgICAgICAgc3F1YXJlczogW10sXG4gICAgICB9KVxuICAgIH1cblxuICAgIGdyb3Vwcy5nZXQoa2V5KT8uc3F1YXJlcy5wdXNoKHBpZWNlLnNxdWFyZSlcbiAgfVxuXG4gIC8vIFNvcnQgZ3JvdXBzIGJ5IGNvbG9yICh3aGl0ZSBmaXJzdCkgdGhlbiB0eXBlXG4gIHJldHVybiBBcnJheS5mcm9tKGdyb3Vwcy52YWx1ZXMoKSkuc29ydCgoYSwgYikgPT4ge1xuICAgIGlmIChhLmNvbG9yICE9PSBiLmNvbG9yKSB7XG4gICAgICByZXR1cm4gYS5jb2xvciA9PT0gUGxheWVyQ29sb3IuV0hJVEUgPyAtMSA6IDFcbiAgICB9XG4gICAgcmV0dXJuIGEudHlwZS5sb2NhbGVDb21wYXJlKGIudHlwZSlcbiAgfSlcbn1cbiIsImltcG9ydCB7IHR5cGUgUGllY2VQb3NpdGlvbiwgZ3JvdXBCeUNvbG9yQW5kVHlwZSB9IGZyb20gJy4uL2NoZXNzL3BpZWNlR3JvdXBpbmcnXG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVF1YWRyYW50VGV4dChwaWVjZXM6IFBpZWNlUG9zaXRpb25bXSk6IHN0cmluZyB7XG4gIGlmIChwaWVjZXMubGVuZ3RoID09PSAwKSByZXR1cm4gJydcblxuICBjb25zdCBncm91cHMgPSBncm91cEJ5Q29sb3JBbmRUeXBlKHBpZWNlcylcbiAgY29uc3Qgc2VudGVuY2VzOiBzdHJpbmdbXSA9IFtdXG5cbiAgZm9yIChjb25zdCBncm91cCBvZiBncm91cHMpIHtcbiAgICBjb25zdCBjb2xvck5hbWUgPSBncm91cC5jb2xvclxuICAgIGNvbnN0IHR5cGVOYW1lID0gZ3JvdXAuc3F1YXJlcy5sZW5ndGggPiAxID8gYCR7Z3JvdXAudHlwZX1zYCA6IGdyb3VwLnR5cGVcblxuICAgIGlmIChncm91cC5zcXVhcmVzLmxlbmd0aCA+IDEpIHtcbiAgICAgIC8vIE11bHRpcGxlIHBpZWNlczogXCJ3aGl0ZSBwYXducyBvbiBhMiwgYjJcIlxuICAgICAgY29uc3Qgc3F1YXJlcyA9IGdyb3VwLnNxdWFyZXMuam9pbignLCAnKVxuICAgICAgc2VudGVuY2VzLnB1c2goYCR7Y29sb3JOYW1lfSAke3R5cGVOYW1lfSBvbiAke3NxdWFyZXN9YClcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU2luZ2xlIHBpZWNlOiBcImUxIHdoaXRlIGtpbmdcIlxuICAgICAgc2VudGVuY2VzLnB1c2goYCR7Z3JvdXAuc3F1YXJlc1swXX0gJHtjb2xvck5hbWV9ICR7Z3JvdXAudHlwZX1gKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBgJHtzZW50ZW5jZXMuam9pbignLiAnKX0uYFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVBbGxQaWVjZXNUZXh0KHBpZWNlczogUGllY2VQb3NpdGlvbltdKTogc3RyaW5nIHtcbiAgcmV0dXJuIGdlbmVyYXRlUXVhZHJhbnRUZXh0KHBpZWNlcylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlQ29sb3JUZXh0KHBpZWNlczogUGllY2VQb3NpdGlvbltdLCBjb2xvcjogJ3doaXRlJyB8ICdibGFjaycpOiBzdHJpbmcge1xuICBjb25zdCBmaWx0ZXJlZCA9IHBpZWNlcy5maWx0ZXIoKHApID0+IHAuY29sb3IgPT09IGNvbG9yKVxuICByZXR1cm4gZ2VuZXJhdGVRdWFkcmFudFRleHQoZmlsdGVyZWQpXG59XG4iLCJpbXBvcnQgeyBzcGVhaywgc3RvcFNwZWFraW5nIH0gZnJvbSAnLi4vYWRhcHRlcnMtc3BlZWNoL3NwZWVjaFN5bnRoZXNpemVyJ1xuaW1wb3J0IHR5cGUgeyBTZXR0aW5nc1N0b3JlIH0gZnJvbSAnLi4vYXBwbGljYXRpb24tc2V0dGluZ3Mvc2V0dGluZ3NTdG9yZSdcbmltcG9ydCB7IHJlYWRQaWVjZVBvc2l0aW9ucyB9IGZyb20gJy4uL2FwcGxpY2F0aW9uL3NlcnZpY2VzL2JvYXJkUmVhZGVyL3JlYWRlcidcbmltcG9ydCB7IFBsYXllckNvbG9yLCB0eXBlIFF1YWRyYW50LCBTcGVlY2hDb21tYW5kIH0gZnJvbSAnLi4vY29uc3RhbnRzJ1xuaW1wb3J0IHsgZmlsdGVyUXVhZHJhbnQgfSBmcm9tICcuLi9kb21haW4vY2hlc3MvcGllY2VHcm91cGluZydcbmltcG9ydCB7XG4gIGdlbmVyYXRlQWxsUGllY2VzVGV4dCxcbiAgZ2VuZXJhdGVDb2xvclRleHQsXG4gIGdlbmVyYXRlUXVhZHJhbnRUZXh0LFxufSBmcm9tICcuLi9kb21haW4vc3BlZWNoL3NwZWVjaFRleHQnXG5cbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVTcGVlY2hDb21tYW5kKGNvbW1hbmQ6IHN0cmluZywgc2V0dGluZ3M6IFNldHRpbmdzU3RvcmUpOiB2b2lkIHtcbiAgaWYgKGNvbW1hbmQgPT09IFNwZWVjaENvbW1hbmQuU1RPUCkge1xuICAgIHN0b3BTcGVha2luZygpXG4gICAgcmV0dXJuXG4gIH1cblxuICBjb25zdCBwaWVjZXMgPSByZWFkUGllY2VQb3NpdGlvbnMoKVxuXG4gIGlmIChjb21tYW5kID09PSBTcGVlY2hDb21tYW5kLkFMTCkge1xuICAgIGNvbnN0IHRleHQgPSBnZW5lcmF0ZUFsbFBpZWNlc1RleHQocGllY2VzKVxuICAgIHNwZWFrKHRleHQsIHNldHRpbmdzLnNwZWFrUmF0ZS52YWx1ZSlcbiAgICByZXR1cm5cbiAgfVxuXG4gIGlmIChjb21tYW5kID09PSBTcGVlY2hDb21tYW5kLldISVRFIHx8IGNvbW1hbmQgPT09IFNwZWVjaENvbW1hbmQuQkxBQ0spIHtcbiAgICBjb25zdCBjb2xvciA9IGNvbW1hbmQgPT09IFNwZWVjaENvbW1hbmQuV0hJVEUgPyBQbGF5ZXJDb2xvci5XSElURSA6IFBsYXllckNvbG9yLkJMQUNLXG4gICAgY29uc3QgdGV4dCA9IGdlbmVyYXRlQ29sb3JUZXh0KHBpZWNlcywgY29sb3IpXG4gICAgc3BlYWsodGV4dCwgc2V0dGluZ3Muc3BlYWtSYXRlLnZhbHVlKVxuICAgIHJldHVyblxuICB9XG5cbiAgLy8gUXVhZHJhbnQgY29tbWFuZHM6IHdrLCB3cSwgYmssIGJxXG4gIGNvbnN0IHF1YWRyYW50ID0gY29tbWFuZCBhcyBRdWFkcmFudFxuICBjb25zdCBmaWx0ZXJlZCA9IGZpbHRlclF1YWRyYW50KHBpZWNlcywgcXVhZHJhbnQpXG4gIGNvbnN0IHRleHQgPSBnZW5lcmF0ZVF1YWRyYW50VGV4dChmaWx0ZXJlZClcbiAgc3BlYWsodGV4dCwgc2V0dGluZ3Muc3BlYWtSYXRlLnZhbHVlKVxufVxuIiwiaW1wb3J0IHsgaGFuZGxlU3BlZWNoQ29tbWFuZCB9IGZyb20gJy4uL2FwcGxpY2F0aW9uLWhhbmRsZXJzL2hhbmRsZVNwZWVjaENvbW1hbmQnXG5pbXBvcnQgdHlwZSB7IFNldHRpbmdzU3RvcmUgfSBmcm9tICcuLi9hcHBsaWNhdGlvbi1zZXR0aW5ncy9zZXR0aW5nc1N0b3JlJ1xuaW1wb3J0IHsgRG9tU2VsZWN0b3IsIEtFWUJPQVJEX0NPTU1BTkRfTUFQLCB0eXBlIEtleWJvYXJkQ29tbWFuZCB9IGZyb20gJy4uL2NvbnN0YW50cydcbmltcG9ydCB7IHF1ZXJ5U2VsZWN0b3IgfSBmcm9tICcuLi9wbGF0Zm9ybS9kb20nXG5cbmludGVyZmFjZSBJbnB1dEVsZW1lbnRXaXRoQ2xlYW51cCBleHRlbmRzIEhUTUxJbnB1dEVsZW1lbnQge1xuICBfX2tleWJvYXJkQ29tbWFuZENsZWFudXA/OiAoKSA9PiB2b2lkXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cEtleWJvYXJkQ29tbWFuZHMoc2V0dGluZ3M6IFNldHRpbmdzU3RvcmUpOiB2b2lkIHtcbiAgY29uc3QgaW5wdXQgPSBxdWVyeVNlbGVjdG9yKERvbVNlbGVjdG9yLktFWUJPQVJEX0lOUFVUKSBhcyBJbnB1dEVsZW1lbnRXaXRoQ2xlYW51cCB8IG51bGxcbiAgaWYgKCFpbnB1dCkgcmV0dXJuXG5cbiAgY29uc3QgaGFuZGxlSW5wdXQgPSAoZTogRXZlbnQpID0+IHtcbiAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50XG4gICAgY29uc3QgdmFsdWUgPSB0YXJnZXQudmFsdWVcblxuICAgIC8vIENoZWNrIGZvciBzcGVlY2ggY29tbWFuZHNcbiAgICBjb25zdCBjb21tYW5kID0gS0VZQk9BUkRfQ09NTUFORF9NQVAuZ2V0KHZhbHVlIGFzIEtleWJvYXJkQ29tbWFuZClcbiAgICBpZiAoY29tbWFuZCkge1xuICAgICAgaGFuZGxlU3BlZWNoQ29tbWFuZChjb21tYW5kLCBzZXR0aW5ncylcbiAgICAgIHRhcmdldC52YWx1ZSA9ICcnXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICAvLyBDaGVjayBmb3IgZHJhd2luZyBjb21tYW5kcyAoaGFuZGxlZCBlbHNld2hlcmUpXG4gICAgaWYgKHZhbHVlLnN0YXJ0c1dpdGgoJy0nKSkge1xuICAgICAgLy8gV2lsbCBiZSBoYW5kbGVkIGJ5IGRyYXdpbmcgaGFuZGxlclxuICAgICAgcmV0dXJuXG4gICAgfVxuICB9XG5cbiAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBoYW5kbGVJbnB1dClcblxuICAvLyBTdG9yZSBjbGVhbnVwIGZ1bmN0aW9uIG9uIHRoZSBlbGVtZW50IGZvciBsYXRlciByZW1vdmFsXG4gIGlucHV0Ll9fa2V5Ym9hcmRDb21tYW5kQ2xlYW51cCA9ICgpID0+IHtcbiAgICBpbnB1dC5yZW1vdmVFdmVudExpc3RlbmVyKCdpbnB1dCcsIGhhbmRsZUlucHV0KVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0ZWFyZG93bktleWJvYXJkQ29tbWFuZHMoKTogdm9pZCB7XG4gIGNvbnN0IGlucHV0ID0gcXVlcnlTZWxlY3RvcihEb21TZWxlY3Rvci5LRVlCT0FSRF9JTlBVVCkgYXMgSW5wdXRFbGVtZW50V2l0aENsZWFudXAgfCBudWxsXG4gIGlmIChpbnB1dD8uX19rZXlib2FyZENvbW1hbmRDbGVhbnVwKSB7XG4gICAgaW5wdXQuX19rZXlib2FyZENvbW1hbmRDbGVhbnVwKClcbiAgICBpbnB1dC5fX2tleWJvYXJkQ29tbWFuZENsZWFudXAgPSB1bmRlZmluZWRcbiAgfVxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU11dGF0aW9uT2JzZXJ2ZXIoY2FsbGJhY2s6IE11dGF0aW9uQ2FsbGJhY2spOiBNdXRhdGlvbk9ic2VydmVyIHtcbiAgcmV0dXJuIG5ldyBNdXRhdGlvbk9ic2VydmVyKGNhbGxiYWNrKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gb2JzZXJ2ZShcbiAgb2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXIsXG4gIHRhcmdldDogTm9kZSxcbiAgb3B0aW9uczogTXV0YXRpb25PYnNlcnZlckluaXRcbik6IHZvaWQge1xuICBvYnNlcnZlci5vYnNlcnZlKHRhcmdldCwgb3B0aW9ucylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpc2Nvbm5lY3Qob2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXIpOiB2b2lkIHtcbiAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpXG59XG4iLCJpbXBvcnQgdHlwZSB7IFNpZ25hbCB9IGZyb20gJ0BwcmVhY3Qvc2lnbmFscy1jb3JlJ1xuaW1wb3J0IHsgRG9tU2VsZWN0b3IgfSBmcm9tICcuLi9jb25zdGFudHMnXG5pbXBvcnQgeyBxdWVyeVNlbGVjdG9yIH0gZnJvbSAnLi4vcGxhdGZvcm0vZG9tJ1xuaW1wb3J0IHsgY3JlYXRlTXV0YXRpb25PYnNlcnZlciwgZGlzY29ubmVjdCwgb2JzZXJ2ZSB9IGZyb20gJy4uL3BsYXRmb3JtL211dGF0aW9uT2JzZXJ2ZXInXG5cbmV4cG9ydCBpbnRlcmZhY2UgQm9hcmRPYnNlcnZlclN0YXRlIHtcbiAgb2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXJcbiAgYm9hcmRDaGFuZ2VkOiBTaWduYWw8bnVtYmVyPlxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQm9hcmRPYnNlcnZlcihib2FyZENoYW5nZWQ6IFNpZ25hbDxudW1iZXI+KTogQm9hcmRPYnNlcnZlclN0YXRlIHtcbiAgY29uc3Qgb2JzZXJ2ZXIgPSBjcmVhdGVNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICBib2FyZENoYW5nZWQudmFsdWUgKz0gMVxuICB9KVxuXG4gIHJldHVybiB7IG9ic2VydmVyLCBib2FyZENoYW5nZWQgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RhcnRCb2FyZE9ic2VydmVyKHN0YXRlOiBCb2FyZE9ic2VydmVyU3RhdGUpOiB2b2lkIHtcbiAgY29uc3QgYm9hcmQgPSBxdWVyeVNlbGVjdG9yKERvbVNlbGVjdG9yLkJPQVJEKVxuICBpZiAoIWJvYXJkKSByZXR1cm5cblxuICBvYnNlcnZlKHN0YXRlLm9ic2VydmVyLCBib2FyZCwge1xuICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICBhdHRyaWJ1dGVzOiB0cnVlLFxuICAgIHN1YnRyZWU6IHRydWUsXG4gIH0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdG9wQm9hcmRPYnNlcnZlcihzdGF0ZTogQm9hcmRPYnNlcnZlclN0YXRlKTogdm9pZCB7XG4gIGRpc2Nvbm5lY3Qoc3RhdGUub2JzZXJ2ZXIpXG59XG4iLCJleHBvcnQgaW50ZXJmYWNlIFNldHRpbmdzIHtcbiAgc3BlYWtSYXRlOiBudW1iZXJcbiAgcGllY2VzTGlzdEVuYWJsZWQ6IGJvb2xlYW5cbiAgZGl2aWRlcnNFbmFibGVkOiBib29sZWFuXG4gIGN1c3RvbUJvYXJkRW5hYmxlZDogYm9vbGVhblxuICBvYmZ1c2NhdGlvbnNFbmFibGVkOiBib29sZWFuXG4gIHBhcmFsbGF4OiBudW1iZXJcbiAgaG92ZXJNb2RlOiBzdHJpbmdcbiAgcGllY2VTdHlsZTogc3RyaW5nXG4gIGJsdXI6IG51bWJlclxuICBibGFja1NlZ21lbnRzOiBzdHJpbmdcbiAgYmxhY2tTZWdtZW50c1RpbWluZzogc3RyaW5nXG4gIGZsYXNoTW9kZUVuYWJsZWQ6IGJvb2xlYW5cbiAgZmxhc2hEdXJhdGlvbjogbnVtYmVyXG4gIGZsYXNoSW50ZXJ2YWw6IG51bWJlclxufVxuXG5leHBvcnQgY29uc3QgZGVmYXVsdFNldHRpbmdzOiBTZXR0aW5ncyA9IHtcbiAgc3BlYWtSYXRlOiAwLjUsXG4gIHBpZWNlc0xpc3RFbmFibGVkOiBmYWxzZSxcbiAgZGl2aWRlcnNFbmFibGVkOiBmYWxzZSxcbiAgY3VzdG9tQm9hcmRFbmFibGVkOiBmYWxzZSxcbiAgb2JmdXNjYXRpb25zRW5hYmxlZDogZmFsc2UsXG4gIHBhcmFsbGF4OiAwLFxuICBob3Zlck1vZGU6ICdvZmYnLFxuICBwaWVjZVN0eWxlOiAnaWNvbnMnLFxuICBibHVyOiAwLFxuICBibGFja1NlZ21lbnRzOiAnbm9uZScsXG4gIGJsYWNrU2VnbWVudHNUaW1pbmc6ICdyb3RhdGUtMTBzJyxcbiAgZmxhc2hNb2RlRW5hYmxlZDogZmFsc2UsXG4gIGZsYXNoRHVyYXRpb246IDEsXG4gIGZsYXNoSW50ZXJ2YWw6IDMsXG59XG4iLCIvKipcbiAqIFdyYXBwZXIgbW9kdWxlIGZvciBsb2NhbFN0b3JhZ2UgdG8gYWxsb3cgbW9ja2luZyB3aXRoIHNpbW9uZVxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRJdGVtKGtleTogc3RyaW5nKTogc3RyaW5nIHwgbnVsbCB7XG4gIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRJdGVtKGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgdmFsdWUpXG59XG4iLCJpbXBvcnQgdHlwZSB7IFNpZ25hbCB9IGZyb20gJ0BwcmVhY3Qvc2lnbmFscy1jb3JlJ1xuaW1wb3J0IHsgZWZmZWN0LCBzaWduYWwgfSBmcm9tICdAcHJlYWN0L3NpZ25hbHMtY29yZSdcbmltcG9ydCB7IHR5cGUgU2V0dGluZ3MsIGRlZmF1bHRTZXR0aW5ncyB9IGZyb20gJy4uL2NvbnN0YW50cy9zZXR0aW5ncydcbmltcG9ydCAqIGFzIHN0b3JhZ2UgZnJvbSAnLi4vcGxhdGZvcm0vc3RvcmFnZSdcblxuY29uc3QgU1RPUkFHRV9LRVkgPSAnbGljaGVzcy1ib2FyZC1zcGVha2VyLXNldHRpbmdzJ1xuXG5leHBvcnQgaW50ZXJmYWNlIFNldHRpbmdzU3RvcmUge1xuICBzcGVha1JhdGU6IFNpZ25hbDxudW1iZXI+XG4gIHBpZWNlc0xpc3RFbmFibGVkOiBTaWduYWw8Ym9vbGVhbj5cbiAgZGl2aWRlcnNFbmFibGVkOiBTaWduYWw8Ym9vbGVhbj5cbiAgY3VzdG9tQm9hcmRFbmFibGVkOiBTaWduYWw8Ym9vbGVhbj5cbiAgb2JmdXNjYXRpb25zRW5hYmxlZDogU2lnbmFsPGJvb2xlYW4+XG4gIHBhcmFsbGF4OiBTaWduYWw8bnVtYmVyPlxuICBob3Zlck1vZGU6IFNpZ25hbDxzdHJpbmc+XG4gIHBpZWNlU3R5bGU6IFNpZ25hbDxzdHJpbmc+XG4gIGJsdXI6IFNpZ25hbDxudW1iZXI+XG4gIGJsYWNrU2VnbWVudHM6IFNpZ25hbDxzdHJpbmc+XG4gIGJsYWNrU2VnbWVudHNUaW1pbmc6IFNpZ25hbDxzdHJpbmc+XG4gIGZsYXNoTW9kZUVuYWJsZWQ6IFNpZ25hbDxib29sZWFuPlxuICBmbGFzaER1cmF0aW9uOiBTaWduYWw8bnVtYmVyPlxuICBmbGFzaEludGVydmFsOiBTaWduYWw8bnVtYmVyPlxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2V0dGluZ3NTdG9yZSgpOiBTZXR0aW5nc1N0b3JlIHtcbiAgcmV0dXJuIHtcbiAgICBzcGVha1JhdGU6IHNpZ25hbChkZWZhdWx0U2V0dGluZ3Muc3BlYWtSYXRlKSxcbiAgICBwaWVjZXNMaXN0RW5hYmxlZDogc2lnbmFsKGRlZmF1bHRTZXR0aW5ncy5waWVjZXNMaXN0RW5hYmxlZCksXG4gICAgZGl2aWRlcnNFbmFibGVkOiBzaWduYWwoZGVmYXVsdFNldHRpbmdzLmRpdmlkZXJzRW5hYmxlZCksXG4gICAgY3VzdG9tQm9hcmRFbmFibGVkOiBzaWduYWwoZGVmYXVsdFNldHRpbmdzLmN1c3RvbUJvYXJkRW5hYmxlZCksXG4gICAgb2JmdXNjYXRpb25zRW5hYmxlZDogc2lnbmFsKGRlZmF1bHRTZXR0aW5ncy5vYmZ1c2NhdGlvbnNFbmFibGVkKSxcbiAgICBwYXJhbGxheDogc2lnbmFsKGRlZmF1bHRTZXR0aW5ncy5wYXJhbGxheCksXG4gICAgaG92ZXJNb2RlOiBzaWduYWwoZGVmYXVsdFNldHRpbmdzLmhvdmVyTW9kZSksXG4gICAgcGllY2VTdHlsZTogc2lnbmFsKGRlZmF1bHRTZXR0aW5ncy5waWVjZVN0eWxlKSxcbiAgICBibHVyOiBzaWduYWwoZGVmYXVsdFNldHRpbmdzLmJsdXIpLFxuICAgIGJsYWNrU2VnbWVudHM6IHNpZ25hbChkZWZhdWx0U2V0dGluZ3MuYmxhY2tTZWdtZW50cyksXG4gICAgYmxhY2tTZWdtZW50c1RpbWluZzogc2lnbmFsKGRlZmF1bHRTZXR0aW5ncy5ibGFja1NlZ21lbnRzVGltaW5nKSxcbiAgICBmbGFzaE1vZGVFbmFibGVkOiBzaWduYWwoZGVmYXVsdFNldHRpbmdzLmZsYXNoTW9kZUVuYWJsZWQpLFxuICAgIGZsYXNoRHVyYXRpb246IHNpZ25hbChkZWZhdWx0U2V0dGluZ3MuZmxhc2hEdXJhdGlvbiksXG4gICAgZmxhc2hJbnRlcnZhbDogc2lnbmFsKGRlZmF1bHRTZXR0aW5ncy5mbGFzaEludGVydmFsKSxcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9hZFNldHRpbmdzKHNldHRpbmdzOiBTZXR0aW5nc1N0b3JlKTogdm9pZCB7XG4gIGNvbnN0IHN0b3JlZCA9IHN0b3JhZ2UuZ2V0SXRlbShTVE9SQUdFX0tFWSlcbiAgaWYgKCFzdG9yZWQpIHJldHVyblxuXG4gIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKHN0b3JlZCkgYXMgUGFydGlhbDxTZXR0aW5ncz5cbiAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoZGF0YSkpIHtcbiAgICBjb25zdCBzZXR0aW5nS2V5ID0ga2V5IGFzIGtleW9mIFNldHRpbmdzXG4gICAgaWYgKFxuICAgICAgc2V0dGluZ3Nbc2V0dGluZ0tleV0gJiZcbiAgICAgIHR5cGVvZiBzZXR0aW5nc1tzZXR0aW5nS2V5XSA9PT0gJ29iamVjdCcgJiZcbiAgICAgICd2YWx1ZScgaW4gc2V0dGluZ3Nbc2V0dGluZ0tleV1cbiAgICApIHtcbiAgICAgIC8vIGJpb21lLWlnbm9yZSBsaW50L3N1c3BpY2lvdXMvbm9FeHBsaWNpdEFueTogU2V0dGluZ3MgdHlwZSBpcyBkeW5hbWljXG4gICAgICA7KHNldHRpbmdzW3NldHRpbmdLZXldIGFzIGFueSkudmFsdWUgPSBkYXRhW3NldHRpbmdLZXldXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzYXZlU2V0dGluZ3Moc2V0dGluZ3M6IFNldHRpbmdzU3RvcmUpOiB2b2lkIHtcbiAgY29uc3QgZGF0YTogUGFydGlhbDxTZXR0aW5ncz4gPSB7fVxuICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhzZXR0aW5ncykpIHtcbiAgICBjb25zdCBzZXR0aW5nS2V5ID0ga2V5IGFzIGtleW9mIHR5cGVvZiBzZXR0aW5nc1xuICAgIGlmICh0eXBlb2Ygc2V0dGluZ3Nbc2V0dGluZ0tleV0gPT09ICdvYmplY3QnICYmICd2YWx1ZScgaW4gc2V0dGluZ3Nbc2V0dGluZ0tleV0pIHtcbiAgICAgIC8vIGJpb21lLWlnbm9yZSBsaW50L3N1c3BpY2lvdXMvbm9FeHBsaWNpdEFueTogU2V0dGluZ3MgdHlwZSBpcyBkeW5hbWljXG4gICAgICBkYXRhW3NldHRpbmdLZXkgYXMga2V5b2YgU2V0dGluZ3NdID0gKHNldHRpbmdzW3NldHRpbmdLZXldIGFzIGFueSkudmFsdWVcbiAgICB9XG4gIH1cbiAgc3RvcmFnZS5zZXRJdGVtKFNUT1JBR0VfS0VZLCBKU09OLnN0cmluZ2lmeShkYXRhKSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldHVwQXV0b1NhdmUoc2V0dGluZ3M6IFNldHRpbmdzU3RvcmUpOiB2b2lkIHtcbiAgZWZmZWN0KCgpID0+IHtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhzZXR0aW5ncykpIHtcbiAgICAgIGNvbnN0IHNldHRpbmcgPSBzZXR0aW5nc1trZXkgYXMga2V5b2YgdHlwZW9mIHNldHRpbmdzXVxuICAgICAgaWYgKHR5cGVvZiBzZXR0aW5nID09PSAnb2JqZWN0JyAmJiAndmFsdWUnIGluIHNldHRpbmcpIHtcbiAgICAgICAgc2V0dGluZy52YWx1ZVxuICAgICAgfVxuICAgIH1cbiAgICBzYXZlU2V0dGluZ3Moc2V0dGluZ3MpXG4gIH0pXG59XG4iLCJ2YXIgbixsLHUsdCxpLHIsbyxlLGYsYyxhLHMsaCxwLHYseSxkPXt9LHc9W10sXz0vYWNpdHxleCg/OnN8Z3xufHB8JCl8cnBofGdyaWR8b3dzfG1uY3xudHd8aW5lW2NoXXx6b298Xm9yZHxpdGVyYS9pLGc9QXJyYXkuaXNBcnJheTtmdW5jdGlvbiBtKG4sbCl7Zm9yKHZhciB1IGluIGwpblt1XT1sW3VdO3JldHVybiBufWZ1bmN0aW9uIGIobil7biYmbi5wYXJlbnROb2RlJiZuLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobil9ZnVuY3Rpb24gayhsLHUsdCl7dmFyIGkscixvLGU9e307Zm9yKG8gaW4gdSlcImtleVwiPT1vP2k9dVtvXTpcInJlZlwiPT1vP3I9dVtvXTplW29dPXVbb107aWYoYXJndW1lbnRzLmxlbmd0aD4yJiYoZS5jaGlsZHJlbj1hcmd1bWVudHMubGVuZ3RoPjM/bi5jYWxsKGFyZ3VtZW50cywyKTp0KSxcImZ1bmN0aW9uXCI9PXR5cGVvZiBsJiZudWxsIT1sLmRlZmF1bHRQcm9wcylmb3IobyBpbiBsLmRlZmF1bHRQcm9wcyl2b2lkIDA9PT1lW29dJiYoZVtvXT1sLmRlZmF1bHRQcm9wc1tvXSk7cmV0dXJuIHgobCxlLGkscixudWxsKX1mdW5jdGlvbiB4KG4sdCxpLHIsbyl7dmFyIGU9e3R5cGU6bixwcm9wczp0LGtleTppLHJlZjpyLF9fazpudWxsLF9fOm51bGwsX19iOjAsX19lOm51bGwsX19jOm51bGwsY29uc3RydWN0b3I6dm9pZCAwLF9fdjpudWxsPT1vPysrdTpvLF9faTotMSxfX3U6MH07cmV0dXJuIG51bGw9PW8mJm51bGwhPWwudm5vZGUmJmwudm5vZGUoZSksZX1mdW5jdGlvbiBNKCl7cmV0dXJue2N1cnJlbnQ6bnVsbH19ZnVuY3Rpb24gUyhuKXtyZXR1cm4gbi5jaGlsZHJlbn1mdW5jdGlvbiBDKG4sbCl7dGhpcy5wcm9wcz1uLHRoaXMuY29udGV4dD1sfWZ1bmN0aW9uICQobixsKXtpZihudWxsPT1sKXJldHVybiBuLl9fPyQobi5fXyxuLl9faSsxKTpudWxsO2Zvcih2YXIgdTtsPG4uX19rLmxlbmd0aDtsKyspaWYobnVsbCE9KHU9bi5fX2tbbF0pJiZudWxsIT11Ll9fZSlyZXR1cm4gdS5fX2U7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2Ygbi50eXBlPyQobik6bnVsbH1mdW5jdGlvbiBJKG4pe2lmKG4uX19QJiZuLl9fZCl7dmFyIHU9bi5fX3YsdD11Ll9fZSxpPVtdLHI9W10sbz1tKHt9LHUpO28uX192PXUuX192KzEsbC52bm9kZSYmbC52bm9kZShvKSxxKG4uX19QLG8sdSxuLl9fbixuLl9fUC5uYW1lc3BhY2VVUkksMzImdS5fX3U/W3RdOm51bGwsaSxudWxsPT10PyQodSk6dCwhISgzMiZ1Ll9fdSksciksby5fX3Y9dS5fX3Ysby5fXy5fX2tbby5fX2ldPW8sRChpLG8sciksdS5fX2U9dS5fXz1udWxsLG8uX19lIT10JiZQKG8pfX1mdW5jdGlvbiBQKG4pe2lmKG51bGwhPShuPW4uX18pJiZudWxsIT1uLl9fYylyZXR1cm4gbi5fX2U9bi5fX2MuYmFzZT1udWxsLG4uX19rLnNvbWUoZnVuY3Rpb24obCl7aWYobnVsbCE9bCYmbnVsbCE9bC5fX2UpcmV0dXJuIG4uX19lPW4uX19jLmJhc2U9bC5fX2V9KSxQKG4pfWZ1bmN0aW9uIEEobil7KCFuLl9fZCYmKG4uX19kPSEwKSYmaS5wdXNoKG4pJiYhSC5fX3IrK3x8ciE9bC5kZWJvdW5jZVJlbmRlcmluZykmJigocj1sLmRlYm91bmNlUmVuZGVyaW5nKXx8bykoSCl9ZnVuY3Rpb24gSCgpe3RyeXtmb3IodmFyIG4sbD0xO2kubGVuZ3RoOylpLmxlbmd0aD5sJiZpLnNvcnQoZSksbj1pLnNoaWZ0KCksbD1pLmxlbmd0aCxJKG4pfWZpbmFsbHl7aS5sZW5ndGg9SC5fX3I9MH19ZnVuY3Rpb24gTChuLGwsdSx0LGkscixvLGUsZixjLGEpe3ZhciBzLGgscCx2LHksXyxnLG09dCYmdC5fX2t8fHcsYj1sLmxlbmd0aDtmb3IoZj1UKHUsbCxtLGYsYikscz0wO3M8YjtzKyspbnVsbCE9KHA9dS5fX2tbc10pJiYoaD0tMSE9cC5fX2kmJm1bcC5fX2ldfHxkLHAuX19pPXMsXz1xKG4scCxoLGkscixvLGUsZixjLGEpLHY9cC5fX2UscC5yZWYmJmgucmVmIT1wLnJlZiYmKGgucmVmJiZKKGgucmVmLG51bGwscCksYS5wdXNoKHAucmVmLHAuX19jfHx2LHApKSxudWxsPT15JiZudWxsIT12JiYoeT12KSwoZz0hISg0JnAuX191KSl8fGguX19rPT09cC5fX2s/KGY9aihwLGYsbixnKSxnJiZoLl9fZSYmKGguX19lPW51bGwpKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBwLnR5cGUmJnZvaWQgMCE9PV8/Zj1fOnYmJihmPXYubmV4dFNpYmxpbmcpLHAuX191Jj0tNyk7cmV0dXJuIHUuX19lPXksZn1mdW5jdGlvbiBUKG4sbCx1LHQsaSl7dmFyIHIsbyxlLGYsYyxhPXUubGVuZ3RoLHM9YSxoPTA7Zm9yKG4uX19rPW5ldyBBcnJheShpKSxyPTA7cjxpO3IrKyludWxsIT0obz1sW3JdKSYmXCJib29sZWFuXCIhPXR5cGVvZiBvJiZcImZ1bmN0aW9uXCIhPXR5cGVvZiBvPyhcInN0cmluZ1wiPT10eXBlb2Ygb3x8XCJudW1iZXJcIj09dHlwZW9mIG98fFwiYmlnaW50XCI9PXR5cGVvZiBvfHxvLmNvbnN0cnVjdG9yPT1TdHJpbmc/bz1uLl9fa1tyXT14KG51bGwsbyxudWxsLG51bGwsbnVsbCk6ZyhvKT9vPW4uX19rW3JdPXgoUyx7Y2hpbGRyZW46b30sbnVsbCxudWxsLG51bGwpOnZvaWQgMD09PW8uY29uc3RydWN0b3ImJm8uX19iPjA/bz1uLl9fa1tyXT14KG8udHlwZSxvLnByb3BzLG8ua2V5LG8ucmVmP28ucmVmOm51bGwsby5fX3YpOm4uX19rW3JdPW8sZj1yK2gsby5fXz1uLG8uX19iPW4uX19iKzEsZT1udWxsLC0xIT0oYz1vLl9faT1PKG8sdSxmLHMpKSYmKHMtLSwoZT11W2NdKSYmKGUuX191fD0yKSksbnVsbD09ZXx8bnVsbD09ZS5fX3Y/KC0xPT1jJiYoaT5hP2gtLTppPGEmJmgrKyksXCJmdW5jdGlvblwiIT10eXBlb2Ygby50eXBlJiYoby5fX3V8PTQpKTpjIT1mJiYoYz09Zi0xP2gtLTpjPT1mKzE/aCsrOihjPmY/aC0tOmgrKyxvLl9fdXw9NCkpKTpuLl9fa1tyXT1udWxsO2lmKHMpZm9yKHI9MDtyPGE7cisrKW51bGwhPShlPXVbcl0pJiYwPT0oMiZlLl9fdSkmJihlLl9fZT09dCYmKHQ9JChlKSksSyhlLGUpKTtyZXR1cm4gdH1mdW5jdGlvbiBqKG4sbCx1LHQpe3ZhciBpLHI7aWYoXCJmdW5jdGlvblwiPT10eXBlb2Ygbi50eXBlKXtmb3IoaT1uLl9fayxyPTA7aSYmcjxpLmxlbmd0aDtyKyspaVtyXSYmKGlbcl0uX189bixsPWooaVtyXSxsLHUsdCkpO3JldHVybiBsfW4uX19lIT1sJiYodCYmKGwmJm4udHlwZSYmIWwucGFyZW50Tm9kZSYmKGw9JChuKSksdS5pbnNlcnRCZWZvcmUobi5fX2UsbHx8bnVsbCkpLGw9bi5fX2UpO2Rve2w9bCYmbC5uZXh0U2libGluZ313aGlsZShudWxsIT1sJiY4PT1sLm5vZGVUeXBlKTtyZXR1cm4gbH1mdW5jdGlvbiBGKG4sbCl7cmV0dXJuIGw9bHx8W10sbnVsbD09bnx8XCJib29sZWFuXCI9PXR5cGVvZiBufHwoZyhuKT9uLnNvbWUoZnVuY3Rpb24obil7RihuLGwpfSk6bC5wdXNoKG4pKSxsfWZ1bmN0aW9uIE8obixsLHUsdCl7dmFyIGkscixvLGU9bi5rZXksZj1uLnR5cGUsYz1sW3VdLGE9bnVsbCE9YyYmMD09KDImYy5fX3UpO2lmKG51bGw9PT1jJiZudWxsPT1lfHxhJiZlPT1jLmtleSYmZj09Yy50eXBlKXJldHVybiB1O2lmKHQ+KGE/MTowKSlmb3IoaT11LTEscj11KzE7aT49MHx8cjxsLmxlbmd0aDspaWYobnVsbCE9KGM9bFtvPWk+PTA/aS0tOnIrK10pJiYwPT0oMiZjLl9fdSkmJmU9PWMua2V5JiZmPT1jLnR5cGUpcmV0dXJuIG87cmV0dXJuLTF9ZnVuY3Rpb24geihuLGwsdSl7XCItXCI9PWxbMF0/bi5zZXRQcm9wZXJ0eShsLG51bGw9PXU/XCJcIjp1KTpuW2xdPW51bGw9PXU/XCJcIjpcIm51bWJlclwiIT10eXBlb2YgdXx8Xy50ZXN0KGwpP3U6dStcInB4XCJ9ZnVuY3Rpb24gTihuLGwsdSx0LGkpe3ZhciByLG87bjppZihcInN0eWxlXCI9PWwpaWYoXCJzdHJpbmdcIj09dHlwZW9mIHUpbi5zdHlsZS5jc3NUZXh0PXU7ZWxzZXtpZihcInN0cmluZ1wiPT10eXBlb2YgdCYmKG4uc3R5bGUuY3NzVGV4dD10PVwiXCIpLHQpZm9yKGwgaW4gdCl1JiZsIGluIHV8fHoobi5zdHlsZSxsLFwiXCIpO2lmKHUpZm9yKGwgaW4gdSl0JiZ1W2xdPT10W2xdfHx6KG4uc3R5bGUsbCx1W2xdKX1lbHNlIGlmKFwib1wiPT1sWzBdJiZcIm5cIj09bFsxXSlyPWwhPShsPWwucmVwbGFjZShzLFwiJDFcIikpLG89bC50b0xvd2VyQ2FzZSgpLGw9byBpbiBufHxcIm9uRm9jdXNPdXRcIj09bHx8XCJvbkZvY3VzSW5cIj09bD9vLnNsaWNlKDIpOmwuc2xpY2UoMiksbi5sfHwobi5sPXt9KSxuLmxbbCtyXT11LHU/dD91W2FdPXRbYV06KHVbYV09aCxuLmFkZEV2ZW50TGlzdGVuZXIobCxyP3Y6cCxyKSk6bi5yZW1vdmVFdmVudExpc3RlbmVyKGwscj92OnAscik7ZWxzZXtpZihcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI9PWkpbD1sLnJlcGxhY2UoL3hsaW5rKEh8OmgpLyxcImhcIikucmVwbGFjZSgvc05hbWUkLyxcInNcIik7ZWxzZSBpZihcIndpZHRoXCIhPWwmJlwiaGVpZ2h0XCIhPWwmJlwiaHJlZlwiIT1sJiZcImxpc3RcIiE9bCYmXCJmb3JtXCIhPWwmJlwidGFiSW5kZXhcIiE9bCYmXCJkb3dubG9hZFwiIT1sJiZcInJvd1NwYW5cIiE9bCYmXCJjb2xTcGFuXCIhPWwmJlwicm9sZVwiIT1sJiZcInBvcG92ZXJcIiE9bCYmbCBpbiBuKXRyeXtuW2xdPW51bGw9PXU/XCJcIjp1O2JyZWFrIG59Y2F0Y2gobil7fVwiZnVuY3Rpb25cIj09dHlwZW9mIHV8fChudWxsPT11fHwhMT09PXUmJlwiLVwiIT1sWzRdP24ucmVtb3ZlQXR0cmlidXRlKGwpOm4uc2V0QXR0cmlidXRlKGwsXCJwb3BvdmVyXCI9PWwmJjE9PXU/XCJcIjp1KSl9fWZ1bmN0aW9uIFYobil7cmV0dXJuIGZ1bmN0aW9uKHUpe2lmKHRoaXMubCl7dmFyIHQ9dGhpcy5sW3UudHlwZStuXTtpZihudWxsPT11W2NdKXVbY109aCsrO2Vsc2UgaWYodVtjXTx0W2FdKXJldHVybjtyZXR1cm4gdChsLmV2ZW50P2wuZXZlbnQodSk6dSl9fX1mdW5jdGlvbiBxKG4sdSx0LGkscixvLGUsZixjLGEpe3ZhciBzLGgscCx2LHksZCxfLGsseCxNLCQsSSxQLEEsSCxUPXUudHlwZTtpZih2b2lkIDAhPT11LmNvbnN0cnVjdG9yKXJldHVybiBudWxsOzEyOCZ0Ll9fdSYmKGM9ISEoMzImdC5fX3UpLG89W2Y9dS5fX2U9dC5fX2VdKSwocz1sLl9fYikmJnModSk7bjppZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBUKXRyeXtpZihrPXUucHJvcHMseD1ULnByb3RvdHlwZSYmVC5wcm90b3R5cGUucmVuZGVyLE09KHM9VC5jb250ZXh0VHlwZSkmJmlbcy5fX2NdLCQ9cz9NP00ucHJvcHMudmFsdWU6cy5fXzppLHQuX19jP189KGg9dS5fX2M9dC5fX2MpLl9fPWguX19FOih4P3UuX19jPWg9bmV3IFQoaywkKToodS5fX2M9aD1uZXcgQyhrLCQpLGguY29uc3RydWN0b3I9VCxoLnJlbmRlcj1RKSxNJiZNLnN1YihoKSxoLnN0YXRlfHwoaC5zdGF0ZT17fSksaC5fX249aSxwPWguX19kPSEwLGguX19oPVtdLGguX3NiPVtdKSx4JiZudWxsPT1oLl9fcyYmKGguX19zPWguc3RhdGUpLHgmJm51bGwhPVQuZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzJiYoaC5fX3M9PWguc3RhdGUmJihoLl9fcz1tKHt9LGguX19zKSksbShoLl9fcyxULmdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyhrLGguX19zKSkpLHY9aC5wcm9wcyx5PWguc3RhdGUsaC5fX3Y9dSxwKXgmJm51bGw9PVQuZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzJiZudWxsIT1oLmNvbXBvbmVudFdpbGxNb3VudCYmaC5jb21wb25lbnRXaWxsTW91bnQoKSx4JiZudWxsIT1oLmNvbXBvbmVudERpZE1vdW50JiZoLl9faC5wdXNoKGguY29tcG9uZW50RGlkTW91bnQpO2Vsc2V7aWYoeCYmbnVsbD09VC5nZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMmJmshPT12JiZudWxsIT1oLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMmJmguY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhrLCQpLHUuX192PT10Ll9fdnx8IWguX19lJiZudWxsIT1oLnNob3VsZENvbXBvbmVudFVwZGF0ZSYmITE9PT1oLnNob3VsZENvbXBvbmVudFVwZGF0ZShrLGguX19zLCQpKXt1Ll9fdiE9dC5fX3YmJihoLnByb3BzPWssaC5zdGF0ZT1oLl9fcyxoLl9fZD0hMSksdS5fX2U9dC5fX2UsdS5fX2s9dC5fX2ssdS5fX2suc29tZShmdW5jdGlvbihuKXtuJiYobi5fXz11KX0pLHcucHVzaC5hcHBseShoLl9faCxoLl9zYiksaC5fc2I9W10saC5fX2gubGVuZ3RoJiZlLnB1c2goaCk7YnJlYWsgbn1udWxsIT1oLmNvbXBvbmVudFdpbGxVcGRhdGUmJmguY29tcG9uZW50V2lsbFVwZGF0ZShrLGguX19zLCQpLHgmJm51bGwhPWguY29tcG9uZW50RGlkVXBkYXRlJiZoLl9faC5wdXNoKGZ1bmN0aW9uKCl7aC5jb21wb25lbnREaWRVcGRhdGUodix5LGQpfSl9aWYoaC5jb250ZXh0PSQsaC5wcm9wcz1rLGguX19QPW4saC5fX2U9ITEsST1sLl9fcixQPTAseCloLnN0YXRlPWguX19zLGguX19kPSExLEkmJkkodSkscz1oLnJlbmRlcihoLnByb3BzLGguc3RhdGUsaC5jb250ZXh0KSx3LnB1c2guYXBwbHkoaC5fX2gsaC5fc2IpLGguX3NiPVtdO2Vsc2UgZG97aC5fX2Q9ITEsSSYmSSh1KSxzPWgucmVuZGVyKGgucHJvcHMsaC5zdGF0ZSxoLmNvbnRleHQpLGguc3RhdGU9aC5fX3N9d2hpbGUoaC5fX2QmJisrUDwyNSk7aC5zdGF0ZT1oLl9fcyxudWxsIT1oLmdldENoaWxkQ29udGV4dCYmKGk9bShtKHt9LGkpLGguZ2V0Q2hpbGRDb250ZXh0KCkpKSx4JiYhcCYmbnVsbCE9aC5nZXRTbmFwc2hvdEJlZm9yZVVwZGF0ZSYmKGQ9aC5nZXRTbmFwc2hvdEJlZm9yZVVwZGF0ZSh2LHkpKSxBPW51bGwhPXMmJnMudHlwZT09PVMmJm51bGw9PXMua2V5P0Uocy5wcm9wcy5jaGlsZHJlbik6cyxmPUwobixnKEEpP0E6W0FdLHUsdCxpLHIsbyxlLGYsYyxhKSxoLmJhc2U9dS5fX2UsdS5fX3UmPS0xNjEsaC5fX2gubGVuZ3RoJiZlLnB1c2goaCksXyYmKGguX19FPWguX189bnVsbCl9Y2F0Y2gobil7aWYodS5fX3Y9bnVsbCxjfHxudWxsIT1vKWlmKG4udGhlbil7Zm9yKHUuX191fD1jPzE2MDoxMjg7ZiYmOD09Zi5ub2RlVHlwZSYmZi5uZXh0U2libGluZzspZj1mLm5leHRTaWJsaW5nO29bby5pbmRleE9mKGYpXT1udWxsLHUuX19lPWZ9ZWxzZXtmb3IoSD1vLmxlbmd0aDtILS07KWIob1tIXSk7Qih1KX1lbHNlIHUuX19lPXQuX19lLHUuX19rPXQuX19rLG4udGhlbnx8Qih1KTtsLl9fZShuLHUsdCl9ZWxzZSBudWxsPT1vJiZ1Ll9fdj09dC5fX3Y/KHUuX19rPXQuX19rLHUuX19lPXQuX19lKTpmPXUuX19lPUcodC5fX2UsdSx0LGkscixvLGUsYyxhKTtyZXR1cm4ocz1sLmRpZmZlZCkmJnModSksMTI4JnUuX191P3ZvaWQgMDpmfWZ1bmN0aW9uIEIobil7biYmKG4uX19jJiYobi5fX2MuX19lPSEwKSxuLl9fayYmbi5fX2suc29tZShCKSl9ZnVuY3Rpb24gRChuLHUsdCl7Zm9yKHZhciBpPTA7aTx0Lmxlbmd0aDtpKyspSih0W2ldLHRbKytpXSx0WysraV0pO2wuX19jJiZsLl9fYyh1LG4pLG4uc29tZShmdW5jdGlvbih1KXt0cnl7bj11Ll9faCx1Ll9faD1bXSxuLnNvbWUoZnVuY3Rpb24obil7bi5jYWxsKHUpfSl9Y2F0Y2gobil7bC5fX2Uobix1Ll9fdil9fSl9ZnVuY3Rpb24gRShuKXtyZXR1cm5cIm9iamVjdFwiIT10eXBlb2Ygbnx8bnVsbD09bnx8bi5fX2I+MD9uOmcobik/bi5tYXAoRSk6dm9pZCAwIT09bi5jb25zdHJ1Y3Rvcj9udWxsOm0oe30sbil9ZnVuY3Rpb24gRyh1LHQsaSxyLG8sZSxmLGMsYSl7dmFyIHMsaCxwLHYseSx3LF8sbT1pLnByb3BzfHxkLGs9dC5wcm9wcyx4PXQudHlwZTtpZihcInN2Z1wiPT14P289XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiOlwibWF0aFwiPT14P289XCJodHRwOi8vd3d3LnczLm9yZy8xOTk4L01hdGgvTWF0aE1MXCI6b3x8KG89XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sXCIpLG51bGwhPWUpZm9yKHM9MDtzPGUubGVuZ3RoO3MrKylpZigoeT1lW3NdKSYmXCJzZXRBdHRyaWJ1dGVcImluIHk9PSEheCYmKHg/eS5sb2NhbE5hbWU9PXg6Mz09eS5ub2RlVHlwZSkpe3U9eSxlW3NdPW51bGw7YnJlYWt9aWYobnVsbD09dSl7aWYobnVsbD09eClyZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoayk7dT1kb2N1bWVudC5jcmVhdGVFbGVtZW50TlMobyx4LGsuaXMmJmspLGMmJihsLl9fbSYmbC5fX20odCxlKSxjPSExKSxlPW51bGx9aWYobnVsbD09eCltPT09a3x8YyYmdS5kYXRhPT1rfHwodS5kYXRhPWspO2Vsc2V7aWYoZT1cInRleHRhcmVhXCI9PXgmJm51bGwhPWsuZGVmYXVsdFZhbHVlP251bGw6ZSYmbi5jYWxsKHUuY2hpbGROb2RlcyksIWMmJm51bGwhPWUpZm9yKG09e30scz0wO3M8dS5hdHRyaWJ1dGVzLmxlbmd0aDtzKyspbVsoeT11LmF0dHJpYnV0ZXNbc10pLm5hbWVdPXkudmFsdWU7Zm9yKHMgaW4gbSl5PW1bc10sXCJkYW5nZXJvdXNseVNldElubmVySFRNTFwiPT1zP3A9eTpcImNoaWxkcmVuXCI9PXN8fHMgaW4ga3x8XCJ2YWx1ZVwiPT1zJiZcImRlZmF1bHRWYWx1ZVwiaW4ga3x8XCJjaGVja2VkXCI9PXMmJlwiZGVmYXVsdENoZWNrZWRcImluIGt8fE4odSxzLG51bGwseSxvKTtmb3IocyBpbiBrKXk9a1tzXSxcImNoaWxkcmVuXCI9PXM/dj15OlwiZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUxcIj09cz9oPXk6XCJ2YWx1ZVwiPT1zP3c9eTpcImNoZWNrZWRcIj09cz9fPXk6YyYmXCJmdW5jdGlvblwiIT10eXBlb2YgeXx8bVtzXT09PXl8fE4odSxzLHksbVtzXSxvKTtpZihoKWN8fHAmJihoLl9faHRtbD09cC5fX2h0bWx8fGguX19odG1sPT11LmlubmVySFRNTCl8fCh1LmlubmVySFRNTD1oLl9faHRtbCksdC5fX2s9W107ZWxzZSBpZihwJiYodS5pbm5lckhUTUw9XCJcIiksTChcInRlbXBsYXRlXCI9PXQudHlwZT91LmNvbnRlbnQ6dSxnKHYpP3Y6W3ZdLHQsaSxyLFwiZm9yZWlnbk9iamVjdFwiPT14P1wiaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbFwiOm8sZSxmLGU/ZVswXTppLl9fayYmJChpLDApLGMsYSksbnVsbCE9ZSlmb3Iocz1lLmxlbmd0aDtzLS07KWIoZVtzXSk7YyYmXCJ0ZXh0YXJlYVwiIT14fHwocz1cInZhbHVlXCIsXCJwcm9ncmVzc1wiPT14JiZudWxsPT13P3UucmVtb3ZlQXR0cmlidXRlKFwidmFsdWVcIik6bnVsbCE9dyYmKHchPT11W3NdfHxcInByb2dyZXNzXCI9PXgmJiF3fHxcIm9wdGlvblwiPT14JiZ3IT1tW3NdKSYmTih1LHMsdyxtW3NdLG8pLHM9XCJjaGVja2VkXCIsbnVsbCE9XyYmXyE9dVtzXSYmTih1LHMsXyxtW3NdLG8pKX1yZXR1cm4gdX1mdW5jdGlvbiBKKG4sdSx0KXt0cnl7aWYoXCJmdW5jdGlvblwiPT10eXBlb2Ygbil7dmFyIGk9XCJmdW5jdGlvblwiPT10eXBlb2Ygbi5fX3U7aSYmbi5fX3UoKSxpJiZudWxsPT11fHwobi5fX3U9bih1KSl9ZWxzZSBuLmN1cnJlbnQ9dX1jYXRjaChuKXtsLl9fZShuLHQpfX1mdW5jdGlvbiBLKG4sdSx0KXt2YXIgaSxyO2lmKGwudW5tb3VudCYmbC51bm1vdW50KG4pLChpPW4ucmVmKSYmKGkuY3VycmVudCYmaS5jdXJyZW50IT1uLl9fZXx8SihpLG51bGwsdSkpLG51bGwhPShpPW4uX19jKSl7aWYoaS5jb21wb25lbnRXaWxsVW5tb3VudCl0cnl7aS5jb21wb25lbnRXaWxsVW5tb3VudCgpfWNhdGNoKG4pe2wuX19lKG4sdSl9aS5iYXNlPWkuX19QPW51bGx9aWYoaT1uLl9faylmb3Iocj0wO3I8aS5sZW5ndGg7cisrKWlbcl0mJksoaVtyXSx1LHR8fFwiZnVuY3Rpb25cIiE9dHlwZW9mIG4udHlwZSk7dHx8YihuLl9fZSksbi5fX2M9bi5fXz1uLl9fZT12b2lkIDB9ZnVuY3Rpb24gUShuLGwsdSl7cmV0dXJuIHRoaXMuY29uc3RydWN0b3Iobix1KX1mdW5jdGlvbiBSKHUsdCxpKXt2YXIgcixvLGUsZjt0PT1kb2N1bWVudCYmKHQ9ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSxsLl9fJiZsLl9fKHUsdCksbz0ocj1cImZ1bmN0aW9uXCI9PXR5cGVvZiBpKT9udWxsOmkmJmkuX19rfHx0Ll9fayxlPVtdLGY9W10scSh0LHU9KCFyJiZpfHx0KS5fX2s9ayhTLG51bGwsW3VdKSxvfHxkLGQsdC5uYW1lc3BhY2VVUkksIXImJmk/W2ldOm8/bnVsbDp0LmZpcnN0Q2hpbGQ/bi5jYWxsKHQuY2hpbGROb2Rlcyk6bnVsbCxlLCFyJiZpP2k6bz9vLl9fZTp0LmZpcnN0Q2hpbGQscixmKSxEKGUsdSxmKX1mdW5jdGlvbiBVKG4sbCl7UihuLGwsVSl9ZnVuY3Rpb24gVyhsLHUsdCl7dmFyIGkscixvLGUsZj1tKHt9LGwucHJvcHMpO2ZvcihvIGluIGwudHlwZSYmbC50eXBlLmRlZmF1bHRQcm9wcyYmKGU9bC50eXBlLmRlZmF1bHRQcm9wcyksdSlcImtleVwiPT1vP2k9dVtvXTpcInJlZlwiPT1vP3I9dVtvXTpmW29dPXZvaWQgMD09PXVbb10mJm51bGwhPWU/ZVtvXTp1W29dO3JldHVybiBhcmd1bWVudHMubGVuZ3RoPjImJihmLmNoaWxkcmVuPWFyZ3VtZW50cy5sZW5ndGg+Mz9uLmNhbGwoYXJndW1lbnRzLDIpOnQpLHgobC50eXBlLGYsaXx8bC5rZXkscnx8bC5yZWYsbnVsbCl9ZnVuY3Rpb24gWChuKXtmdW5jdGlvbiBsKG4pe3ZhciB1LHQ7cmV0dXJuIHRoaXMuZ2V0Q2hpbGRDb250ZXh0fHwodT1uZXcgU2V0LCh0PXt9KVtsLl9fY109dGhpcyx0aGlzLmdldENoaWxkQ29udGV4dD1mdW5jdGlvbigpe3JldHVybiB0fSx0aGlzLmNvbXBvbmVudFdpbGxVbm1vdW50PWZ1bmN0aW9uKCl7dT1udWxsfSx0aGlzLnNob3VsZENvbXBvbmVudFVwZGF0ZT1mdW5jdGlvbihuKXt0aGlzLnByb3BzLnZhbHVlIT1uLnZhbHVlJiZ1LmZvckVhY2goZnVuY3Rpb24obil7bi5fX2U9ITAsQShuKX0pfSx0aGlzLnN1Yj1mdW5jdGlvbihuKXt1LmFkZChuKTt2YXIgbD1uLmNvbXBvbmVudFdpbGxVbm1vdW50O24uY29tcG9uZW50V2lsbFVubW91bnQ9ZnVuY3Rpb24oKXt1JiZ1LmRlbGV0ZShuKSxsJiZsLmNhbGwobil9fSksbi5jaGlsZHJlbn1yZXR1cm4gbC5fX2M9XCJfX2NDXCIreSsrLGwuX189bixsLlByb3ZpZGVyPWwuX19sPShsLkNvbnN1bWVyPWZ1bmN0aW9uKG4sbCl7cmV0dXJuIG4uY2hpbGRyZW4obCl9KS5jb250ZXh0VHlwZT1sLGx9bj13LnNsaWNlLGw9e19fZTpmdW5jdGlvbihuLGwsdSx0KXtmb3IodmFyIGkscixvO2w9bC5fXzspaWYoKGk9bC5fX2MpJiYhaS5fXyl0cnl7aWYoKHI9aS5jb25zdHJ1Y3RvcikmJm51bGwhPXIuZ2V0RGVyaXZlZFN0YXRlRnJvbUVycm9yJiYoaS5zZXRTdGF0ZShyLmdldERlcml2ZWRTdGF0ZUZyb21FcnJvcihuKSksbz1pLl9fZCksbnVsbCE9aS5jb21wb25lbnREaWRDYXRjaCYmKGkuY29tcG9uZW50RGlkQ2F0Y2gobix0fHx7fSksbz1pLl9fZCksbylyZXR1cm4gaS5fX0U9aX1jYXRjaChsKXtuPWx9dGhyb3cgbn19LHU9MCx0PWZ1bmN0aW9uKG4pe3JldHVybiBudWxsIT1uJiZ2b2lkIDA9PT1uLmNvbnN0cnVjdG9yfSxDLnByb3RvdHlwZS5zZXRTdGF0ZT1mdW5jdGlvbihuLGwpe3ZhciB1O3U9bnVsbCE9dGhpcy5fX3MmJnRoaXMuX19zIT10aGlzLnN0YXRlP3RoaXMuX19zOnRoaXMuX19zPW0oe30sdGhpcy5zdGF0ZSksXCJmdW5jdGlvblwiPT10eXBlb2YgbiYmKG49bihtKHt9LHUpLHRoaXMucHJvcHMpKSxuJiZtKHUsbiksbnVsbCE9biYmdGhpcy5fX3YmJihsJiZ0aGlzLl9zYi5wdXNoKGwpLEEodGhpcykpfSxDLnByb3RvdHlwZS5mb3JjZVVwZGF0ZT1mdW5jdGlvbihuKXt0aGlzLl9fdiYmKHRoaXMuX19lPSEwLG4mJnRoaXMuX19oLnB1c2gobiksQSh0aGlzKSl9LEMucHJvdG90eXBlLnJlbmRlcj1TLGk9W10sbz1cImZ1bmN0aW9uXCI9PXR5cGVvZiBQcm9taXNlP1Byb21pc2UucHJvdG90eXBlLnRoZW4uYmluZChQcm9taXNlLnJlc29sdmUoKSk6c2V0VGltZW91dCxlPWZ1bmN0aW9uKG4sbCl7cmV0dXJuIG4uX192Ll9fYi1sLl9fdi5fX2J9LEguX19yPTAsZj1NYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDgpLGM9XCJfX2RcIitmLGE9XCJfX2FcIitmLHM9LyhQb2ludGVyQ2FwdHVyZSkkfENhcHR1cmUkL2ksaD0wLHA9VighMSksdj1WKCEwKSx5PTA7ZXhwb3J0e0MgYXMgQ29tcG9uZW50LFMgYXMgRnJhZ21lbnQsVyBhcyBjbG9uZUVsZW1lbnQsWCBhcyBjcmVhdGVDb250ZXh0LGsgYXMgY3JlYXRlRWxlbWVudCxNIGFzIGNyZWF0ZVJlZixrIGFzIGgsVSBhcyBoeWRyYXRlLHQgYXMgaXNWYWxpZEVsZW1lbnQsbCBhcyBvcHRpb25zLFIgYXMgcmVuZGVyLEYgYXMgdG9DaGlsZEFycmF5fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXByZWFjdC5tb2R1bGUuanMubWFwXG4iLCJpbXBvcnR7b3B0aW9ucyBhcyBufWZyb21cInByZWFjdFwiO3ZhciB0LHIsdSxpLG89MCxmPVtdLGM9bixlPWMuX19iLGE9Yy5fX3Isdj1jLmRpZmZlZCxsPWMuX19jLG09Yy51bm1vdW50LHM9Yy5fXztmdW5jdGlvbiBwKG4sdCl7Yy5fX2gmJmMuX19oKHIsbixvfHx0KSxvPTA7dmFyIHU9ci5fX0h8fChyLl9fSD17X186W10sX19oOltdfSk7cmV0dXJuIG4+PXUuX18ubGVuZ3RoJiZ1Ll9fLnB1c2goe30pLHUuX19bbl19ZnVuY3Rpb24gZChuKXtyZXR1cm4gbz0xLGgoRCxuKX1mdW5jdGlvbiBoKG4sdSxpKXt2YXIgbz1wKHQrKywyKTtpZihvLnQ9biwhby5fX2MmJihvLl9fPVtpP2kodSk6RCh2b2lkIDAsdSksZnVuY3Rpb24obil7dmFyIHQ9by5fX04/by5fX05bMF06by5fX1swXSxyPW8udCh0LG4pO3QhPT1yJiYoby5fX049W3Isby5fX1sxXV0sby5fX2Muc2V0U3RhdGUoe30pKX1dLG8uX19jPXIsIXIuX19mKSl7dmFyIGY9ZnVuY3Rpb24obix0LHIpe2lmKCFvLl9fYy5fX0gpcmV0dXJuITA7dmFyIHU9by5fX2MuX19ILl9fLmZpbHRlcihmdW5jdGlvbihuKXtyZXR1cm4gbi5fX2N9KTtpZih1LmV2ZXJ5KGZ1bmN0aW9uKG4pe3JldHVybiFuLl9fTn0pKXJldHVybiFjfHxjLmNhbGwodGhpcyxuLHQscik7dmFyIGk9by5fX2MucHJvcHMhPT1uO3JldHVybiB1LnNvbWUoZnVuY3Rpb24obil7aWYobi5fX04pe3ZhciB0PW4uX19bMF07bi5fXz1uLl9fTixuLl9fTj12b2lkIDAsdCE9PW4uX19bMF0mJihpPSEwKX19KSxjJiZjLmNhbGwodGhpcyxuLHQscil8fGl9O3IuX19mPSEwO3ZhciBjPXIuc2hvdWxkQ29tcG9uZW50VXBkYXRlLGU9ci5jb21wb25lbnRXaWxsVXBkYXRlO3IuY29tcG9uZW50V2lsbFVwZGF0ZT1mdW5jdGlvbihuLHQscil7aWYodGhpcy5fX2Upe3ZhciB1PWM7Yz12b2lkIDAsZihuLHQsciksYz11fWUmJmUuY2FsbCh0aGlzLG4sdCxyKX0sci5zaG91bGRDb21wb25lbnRVcGRhdGU9Zn1yZXR1cm4gby5fX058fG8uX199ZnVuY3Rpb24geShuLHUpe3ZhciBpPXAodCsrLDMpOyFjLl9fcyYmQyhpLl9fSCx1KSYmKGkuX189bixpLnU9dSxyLl9fSC5fX2gucHVzaChpKSl9ZnVuY3Rpb24gXyhuLHUpe3ZhciBpPXAodCsrLDQpOyFjLl9fcyYmQyhpLl9fSCx1KSYmKGkuX189bixpLnU9dSxyLl9faC5wdXNoKGkpKX1mdW5jdGlvbiBBKG4pe3JldHVybiBvPTUsVChmdW5jdGlvbigpe3JldHVybntjdXJyZW50Om59fSxbXSl9ZnVuY3Rpb24gRihuLHQscil7bz02LF8oZnVuY3Rpb24oKXtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBuKXt2YXIgcj1uKHQoKSk7cmV0dXJuIGZ1bmN0aW9uKCl7bihudWxsKSxyJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiByJiZyKCl9fWlmKG4pcmV0dXJuIG4uY3VycmVudD10KCksZnVuY3Rpb24oKXtyZXR1cm4gbi5jdXJyZW50PW51bGx9fSxudWxsPT1yP3I6ci5jb25jYXQobikpfWZ1bmN0aW9uIFQobixyKXt2YXIgdT1wKHQrKyw3KTtyZXR1cm4gQyh1Ll9fSCxyKSYmKHUuX189bigpLHUuX19IPXIsdS5fX2g9biksdS5fX31mdW5jdGlvbiBxKG4sdCl7cmV0dXJuIG89OCxUKGZ1bmN0aW9uKCl7cmV0dXJuIG59LHQpfWZ1bmN0aW9uIHgobil7dmFyIHU9ci5jb250ZXh0W24uX19jXSxpPXAodCsrLDkpO3JldHVybiBpLmM9bix1PyhudWxsPT1pLl9fJiYoaS5fXz0hMCx1LnN1YihyKSksdS5wcm9wcy52YWx1ZSk6bi5fX31mdW5jdGlvbiBQKG4sdCl7Yy51c2VEZWJ1Z1ZhbHVlJiZjLnVzZURlYnVnVmFsdWUodD90KG4pOm4pfWZ1bmN0aW9uIGIobil7dmFyIHU9cCh0KyssMTApLGk9ZCgpO3JldHVybiB1Ll9fPW4sci5jb21wb25lbnREaWRDYXRjaHx8KHIuY29tcG9uZW50RGlkQ2F0Y2g9ZnVuY3Rpb24obix0KXt1Ll9fJiZ1Ll9fKG4sdCksaVsxXShuKX0pLFtpWzBdLGZ1bmN0aW9uKCl7aVsxXSh2b2lkIDApfV19ZnVuY3Rpb24gZygpe3ZhciBuPXAodCsrLDExKTtpZighbi5fXyl7Zm9yKHZhciB1PXIuX192O251bGwhPT11JiYhdS5fX20mJm51bGwhPT11Ll9fOyl1PXUuX187dmFyIGk9dS5fX218fCh1Ll9fbT1bMCwwXSk7bi5fXz1cIlBcIitpWzBdK1wiLVwiK2lbMV0rK31yZXR1cm4gbi5fX31mdW5jdGlvbiBqKCl7Zm9yKHZhciBuO249Zi5zaGlmdCgpOyl7dmFyIHQ9bi5fX0g7aWYobi5fX1AmJnQpdHJ5e3QuX19oLnNvbWUoeiksdC5fX2guc29tZShCKSx0Ll9faD1bXX1jYXRjaChyKXt0Ll9faD1bXSxjLl9fZShyLG4uX192KX19fWMuX19iPWZ1bmN0aW9uKG4pe3I9bnVsbCxlJiZlKG4pfSxjLl9fPWZ1bmN0aW9uKG4sdCl7biYmdC5fX2smJnQuX19rLl9fbSYmKG4uX19tPXQuX19rLl9fbSkscyYmcyhuLHQpfSxjLl9fcj1mdW5jdGlvbihuKXthJiZhKG4pLHQ9MDt2YXIgaT0ocj1uLl9fYykuX19IO2kmJih1PT09cj8oaS5fX2g9W10sci5fX2g9W10saS5fXy5zb21lKGZ1bmN0aW9uKG4pe24uX19OJiYobi5fXz1uLl9fTiksbi51PW4uX19OPXZvaWQgMH0pKTooaS5fX2guc29tZSh6KSxpLl9faC5zb21lKEIpLGkuX19oPVtdLHQ9MCkpLHU9cn0sYy5kaWZmZWQ9ZnVuY3Rpb24obil7diYmdihuKTt2YXIgdD1uLl9fYzt0JiZ0Ll9fSCYmKHQuX19ILl9faC5sZW5ndGgmJigxIT09Zi5wdXNoKHQpJiZpPT09Yy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWV8fCgoaT1jLnJlcXVlc3RBbmltYXRpb25GcmFtZSl8fHcpKGopKSx0Ll9fSC5fXy5zb21lKGZ1bmN0aW9uKG4pe24udSYmKG4uX19IPW4udSksbi51PXZvaWQgMH0pKSx1PXI9bnVsbH0sYy5fX2M9ZnVuY3Rpb24obix0KXt0LnNvbWUoZnVuY3Rpb24obil7dHJ5e24uX19oLnNvbWUoeiksbi5fX2g9bi5fX2guZmlsdGVyKGZ1bmN0aW9uKG4pe3JldHVybiFuLl9ffHxCKG4pfSl9Y2F0Y2gocil7dC5zb21lKGZ1bmN0aW9uKG4pe24uX19oJiYobi5fX2g9W10pfSksdD1bXSxjLl9fZShyLG4uX192KX19KSxsJiZsKG4sdCl9LGMudW5tb3VudD1mdW5jdGlvbihuKXttJiZtKG4pO3ZhciB0LHI9bi5fX2M7ciYmci5fX0gmJihyLl9fSC5fXy5zb21lKGZ1bmN0aW9uKG4pe3RyeXt6KG4pfWNhdGNoKG4pe3Q9bn19KSxyLl9fSD12b2lkIDAsdCYmYy5fX2UodCxyLl9fdikpfTt2YXIgaz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1ZXN0QW5pbWF0aW9uRnJhbWU7ZnVuY3Rpb24gdyhuKXt2YXIgdCxyPWZ1bmN0aW9uKCl7Y2xlYXJUaW1lb3V0KHUpLGsmJmNhbmNlbEFuaW1hdGlvbkZyYW1lKHQpLHNldFRpbWVvdXQobil9LHU9c2V0VGltZW91dChyLDM1KTtrJiYodD1yZXF1ZXN0QW5pbWF0aW9uRnJhbWUocikpfWZ1bmN0aW9uIHoobil7dmFyIHQ9cix1PW4uX19jO1wiZnVuY3Rpb25cIj09dHlwZW9mIHUmJihuLl9fYz12b2lkIDAsdSgpKSxyPXR9ZnVuY3Rpb24gQihuKXt2YXIgdD1yO24uX19jPW4uX18oKSxyPXR9ZnVuY3Rpb24gQyhuLHQpe3JldHVybiFufHxuLmxlbmd0aCE9PXQubGVuZ3RofHx0LnNvbWUoZnVuY3Rpb24odCxyKXtyZXR1cm4gdCE9PW5bcl19KX1mdW5jdGlvbiBEKG4sdCl7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2YgdD90KG4pOnR9ZXhwb3J0e3EgYXMgdXNlQ2FsbGJhY2sseCBhcyB1c2VDb250ZXh0LFAgYXMgdXNlRGVidWdWYWx1ZSx5IGFzIHVzZUVmZmVjdCxiIGFzIHVzZUVycm9yQm91bmRhcnksZyBhcyB1c2VJZCxGIGFzIHVzZUltcGVyYXRpdmVIYW5kbGUsXyBhcyB1c2VMYXlvdXRFZmZlY3QsVCBhcyB1c2VNZW1vLGggYXMgdXNlUmVkdWNlcixBIGFzIHVzZVJlZixkIGFzIHVzZVN0YXRlfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWhvb2tzLm1vZHVsZS5qcy5tYXBcbiIsImltcG9ydHtvcHRpb25zIGFzIHIsRnJhZ21lbnQgYXMgZX1mcm9tXCJwcmVhY3RcIjtleHBvcnR7RnJhZ21lbnR9ZnJvbVwicHJlYWN0XCI7dmFyIHQ9L1tcIiY8XS87ZnVuY3Rpb24gbihyKXtpZigwPT09ci5sZW5ndGh8fCExPT09dC50ZXN0KHIpKXJldHVybiByO2Zvcih2YXIgZT0wLG49MCxvPVwiXCIsZj1cIlwiO248ci5sZW5ndGg7bisrKXtzd2l0Y2goci5jaGFyQ29kZUF0KG4pKXtjYXNlIDM0OmY9XCImcXVvdDtcIjticmVhaztjYXNlIDM4OmY9XCImYW1wO1wiO2JyZWFrO2Nhc2UgNjA6Zj1cIiZsdDtcIjticmVhaztkZWZhdWx0OmNvbnRpbnVlfW4hPT1lJiYobys9ci5zbGljZShlLG4pKSxvKz1mLGU9bisxfXJldHVybiBuIT09ZSYmKG8rPXIuc2xpY2UoZSxuKSksb312YXIgbz0vYWNpdHxleCg/OnN8Z3xufHB8JCl8cnBofGdyaWR8b3dzfG1uY3xudHd8aW5lW2NoXXx6b298Xm9yZHxpdGVyYS9pLGY9MCxpPUFycmF5LmlzQXJyYXk7ZnVuY3Rpb24gdShlLHQsbixvLGksdSl7dHx8KHQ9e30pO3ZhciBhLGMscD10O2lmKFwicmVmXCJpbiBwKWZvcihjIGluIHA9e30sdClcInJlZlwiPT1jP2E9dFtjXTpwW2NdPXRbY107dmFyIGw9e3R5cGU6ZSxwcm9wczpwLGtleTpuLHJlZjphLF9fazpudWxsLF9fOm51bGwsX19iOjAsX19lOm51bGwsX19jOm51bGwsY29uc3RydWN0b3I6dm9pZCAwLF9fdjotLWYsX19pOi0xLF9fdTowLF9fc291cmNlOmksX19zZWxmOnV9O2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGUmJihhPWUuZGVmYXVsdFByb3BzKSlmb3IoYyBpbiBhKXZvaWQgMD09PXBbY10mJihwW2NdPWFbY10pO3JldHVybiByLnZub2RlJiZyLnZub2RlKGwpLGx9ZnVuY3Rpb24gYShyKXt2YXIgdD11KGUse3RwbDpyLGV4cHJzOltdLnNsaWNlLmNhbGwoYXJndW1lbnRzLDEpfSk7cmV0dXJuIHQua2V5PXQuX192LHR9dmFyIGM9e30scD0vW0EtWl0vZztmdW5jdGlvbiBsKGUsdCl7aWYoci5hdHRyKXt2YXIgZj1yLmF0dHIoZSx0KTtpZihcInN0cmluZ1wiPT10eXBlb2YgZilyZXR1cm4gZn1pZih0PWZ1bmN0aW9uKHIpe3JldHVybiBudWxsIT09ciYmXCJvYmplY3RcIj09dHlwZW9mIHImJlwiZnVuY3Rpb25cIj09dHlwZW9mIHIudmFsdWVPZj9yLnZhbHVlT2YoKTpyfSh0KSxcInJlZlwiPT09ZXx8XCJrZXlcIj09PWUpcmV0dXJuXCJcIjtpZihcInN0eWxlXCI9PT1lJiZcIm9iamVjdFwiPT10eXBlb2YgdCl7dmFyIGk9XCJcIjtmb3IodmFyIHUgaW4gdCl7dmFyIGE9dFt1XTtpZihudWxsIT1hJiZcIlwiIT09YSl7dmFyIGw9XCItXCI9PXVbMF0/dTpjW3VdfHwoY1t1XT11LnJlcGxhY2UocCxcIi0kJlwiKS50b0xvd2VyQ2FzZSgpKSxzPVwiO1wiO1wibnVtYmVyXCIhPXR5cGVvZiBhfHxsLnN0YXJ0c1dpdGgoXCItLVwiKXx8by50ZXN0KGwpfHwocz1cInB4O1wiKSxpPWkrbCtcIjpcIithK3N9fXJldHVybiBlKyc9XCInK24oaSkrJ1wiJ31yZXR1cm4gbnVsbD09dHx8ITE9PT10fHxcImZ1bmN0aW9uXCI9PXR5cGVvZiB0fHxcIm9iamVjdFwiPT10eXBlb2YgdD9cIlwiOiEwPT09dD9lOmUrJz1cIicrbihcIlwiK3QpKydcIid9ZnVuY3Rpb24gcyhyKXtpZihudWxsPT1yfHxcImJvb2xlYW5cIj09dHlwZW9mIHJ8fFwiZnVuY3Rpb25cIj09dHlwZW9mIHIpcmV0dXJuIG51bGw7aWYoXCJvYmplY3RcIj09dHlwZW9mIHIpe2lmKHZvaWQgMD09PXIuY29uc3RydWN0b3IpcmV0dXJuIHI7aWYoaShyKSl7Zm9yKHZhciBlPTA7ZTxyLmxlbmd0aDtlKyspcltlXT1zKHJbZV0pO3JldHVybiByfX1yZXR1cm4gbihcIlwiK3IpfWV4cG9ydHt1IGFzIGpzeCxsIGFzIGpzeEF0dHIsdSBhcyBqc3hERVYscyBhcyBqc3hFc2NhcGUsYSBhcyBqc3hUZW1wbGF0ZSx1IGFzIGpzeHN9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9anN4UnVudGltZS5tb2R1bGUuanMubWFwXG4iLCJpbXBvcnQgeyBjcmVhdGVDb250ZXh0IH0gZnJvbSAncHJlYWN0J1xuaW1wb3J0IHsgdXNlQ29udGV4dCB9IGZyb20gJ3ByZWFjdC9ob29rcydcbmltcG9ydCB0eXBlIHsgU2V0dGluZ3NTdG9yZSB9IGZyb20gJy4uLy4uL2FwcGxpY2F0aW9uLXNldHRpbmdzL3NldHRpbmdzU3RvcmUnXG5cbmNvbnN0IFNldHRpbmdzQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQ8U2V0dGluZ3NTdG9yZSB8IG51bGw+KG51bGwpXG5cbmludGVyZmFjZSBTZXR0aW5nc1Byb3ZpZGVyUHJvcHMge1xuICBzZXR0aW5nczogU2V0dGluZ3NTdG9yZVxuICBjaGlsZHJlbjogcHJlYWN0LkNvbXBvbmVudENoaWxkcmVuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTZXR0aW5nc1Byb3ZpZGVyKHsgc2V0dGluZ3MsIGNoaWxkcmVuIH06IFNldHRpbmdzUHJvdmlkZXJQcm9wcykge1xuICByZXR1cm4gPFNldHRpbmdzQ29udGV4dC5Qcm92aWRlciB2YWx1ZT17c2V0dGluZ3N9PntjaGlsZHJlbn08L1NldHRpbmdzQ29udGV4dC5Qcm92aWRlcj5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZVNldHRpbmdzKCk6IFNldHRpbmdzU3RvcmUge1xuICBjb25zdCBzZXR0aW5ncyA9IHVzZUNvbnRleHQoU2V0dGluZ3NDb250ZXh0KVxuICAvKiB2OCBpZ25vcmUgbmV4dCAzICovXG4gIGlmICghc2V0dGluZ3MpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3VzZVNldHRpbmdzIG11c3QgYmUgdXNlZCB3aXRoaW4gYSBTZXR0aW5nc1Byb3ZpZGVyJylcbiAgfVxuICByZXR1cm4gc2V0dGluZ3Ncbn1cbiIsImltcG9ydCB0eXBlIHsgU2lnbmFsIH0gZnJvbSAnQHByZWFjdC9zaWduYWxzJ1xuaW1wb3J0IHR5cGUgeyBDb21wb25lbnRDaGlsZHJlbiB9IGZyb20gJ3ByZWFjdCdcblxuaW50ZXJmYWNlIEJ1dHRvblJvd1Byb3BzIHtcbiAgY2hpbGRyZW46IENvbXBvbmVudENoaWxkcmVuXG4gIHZpc2libGU/OiBTaWduYWw8Ym9vbGVhbj5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEJ1dHRvblJvdyh7IGNoaWxkcmVuLCB2aXNpYmxlIH06IEJ1dHRvblJvd1Byb3BzKSB7XG4gIGlmICh2aXNpYmxlICYmICF2aXNpYmxlLnZhbHVlKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIHJldHVybiA8ZGl2PntjaGlsZHJlbn08L2Rpdj5cbn1cbiIsImltcG9ydCB0eXBlIHsgU2lnbmFsIH0gZnJvbSAnQHByZWFjdC9zaWduYWxzJ1xuXG5pbnRlcmZhY2UgU2V0dGluZ0J1dHRvblByb3BzPFQ+IHtcbiAgbGFiZWw6IHN0cmluZ1xuICBzZXR0aW5nOiBTaWduYWw8VD5cbiAgb3B0aW9uczogcmVhZG9ubHkgVFtdXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTZXR0aW5nQnV0dG9uPFQ+KHsgbGFiZWwsIHNldHRpbmcsIG9wdGlvbnMgfTogU2V0dGluZ0J1dHRvblByb3BzPFQ+KSB7XG4gIGNvbnN0IGhhbmRsZUNsaWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IGN1cnJlbnRJbmRleCA9IG9wdGlvbnMuaW5kZXhPZihzZXR0aW5nLnZhbHVlKVxuICAgIGNvbnN0IG5leHRJbmRleCA9IChjdXJyZW50SW5kZXggKyAxKSAlIG9wdGlvbnMubGVuZ3RoXG4gICAgc2V0dGluZy52YWx1ZSA9IG9wdGlvbnNbbmV4dEluZGV4XVxuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8YnV0dG9uIG9uQ2xpY2s9e2hhbmRsZUNsaWNrfSB0eXBlPVwiYnV0dG9uXCI+XG4gICAgICB7bGFiZWx9OiB7U3RyaW5nKHNldHRpbmcudmFsdWUpfVxuICAgIDwvYnV0dG9uPlxuICApXG59XG4iLCJpbXBvcnQgdHlwZSB7IFNpZ25hbCB9IGZyb20gJ0BwcmVhY3Qvc2lnbmFscydcbmltcG9ydCB7IHVzZVNldHRpbmdzIH0gZnJvbSAnLi4vY29udGV4dHMvU2V0dGluZ3NDb250ZXh0J1xuaW1wb3J0IHsgQnV0dG9uUm93IH0gZnJvbSAnLi9CdXR0b25Sb3cnXG5pbXBvcnQgeyBTZXR0aW5nQnV0dG9uIH0gZnJvbSAnLi9TZXR0aW5nQnV0dG9uJ1xuXG5pbnRlcmZhY2UgQ29udHJvbFBhbmVsUHJvcHMge1xuICBib2FyZENoYW5nZWQ6IFNpZ25hbDxudW1iZXI+XG59XG5cbmNvbnN0IFNQRUFLX1JBVEVfT1BUSU9OUyA9IFswLjIsIDAuNSwgMC43LCAxLjAsIDEuMSwgMS4yXSBhcyBjb25zdFxuY29uc3QgVE9HR0xFX09QVElPTlMgPSBbZmFsc2UsIHRydWVdIGFzIGNvbnN0XG5cbmV4cG9ydCBmdW5jdGlvbiBDb250cm9sUGFuZWwoeyBib2FyZENoYW5nZWQgfTogQ29udHJvbFBhbmVsUHJvcHMpIHtcbiAgY29uc3Qgc2V0dGluZ3MgPSB1c2VTZXR0aW5ncygpXG5cbiAgLy8gVXNlIGJvYXJkQ2hhbmdlZCB0byBlbnN1cmUgY29tcG9uZW50IHJlLXJlbmRlcnMgd2hlbiBib2FyZCBjaGFuZ2VzXG4gIGJvYXJkQ2hhbmdlZC52YWx1ZVxuXG4gIHJldHVybiAoXG4gICAgPGRpdj5cbiAgICAgIDxCdXR0b25Sb3c+XG4gICAgICAgIDxTZXR0aW5nQnV0dG9uXG4gICAgICAgICAgbGFiZWw9XCJTcGVhayBSYXRlXCJcbiAgICAgICAgICBzZXR0aW5nPXtzZXR0aW5ncy5zcGVha1JhdGV9XG4gICAgICAgICAgb3B0aW9ucz17U1BFQUtfUkFURV9PUFRJT05TfVxuICAgICAgICAvPlxuICAgICAgICA8U2V0dGluZ0J1dHRvblxuICAgICAgICAgIGxhYmVsPVwiUGllY2VzIExpc3RcIlxuICAgICAgICAgIHNldHRpbmc9e3NldHRpbmdzLnBpZWNlc0xpc3RFbmFibGVkfVxuICAgICAgICAgIG9wdGlvbnM9e1RPR0dMRV9PUFRJT05TfVxuICAgICAgICAvPlxuICAgICAgICA8U2V0dGluZ0J1dHRvblxuICAgICAgICAgIGxhYmVsPVwiRGl2aWRlcnNcIlxuICAgICAgICAgIHNldHRpbmc9e3NldHRpbmdzLmRpdmlkZXJzRW5hYmxlZH1cbiAgICAgICAgICBvcHRpb25zPXtUT0dHTEVfT1BUSU9OU31cbiAgICAgICAgLz5cbiAgICAgICAgPFNldHRpbmdCdXR0b25cbiAgICAgICAgICBsYWJlbD1cIkN1c3RvbSBCb2FyZFwiXG4gICAgICAgICAgc2V0dGluZz17c2V0dGluZ3MuY3VzdG9tQm9hcmRFbmFibGVkfVxuICAgICAgICAgIG9wdGlvbnM9e1RPR0dMRV9PUFRJT05TfVxuICAgICAgICAvPlxuICAgICAgICA8U2V0dGluZ0J1dHRvblxuICAgICAgICAgIGxhYmVsPVwiRmxhc2ggTW9kZVwiXG4gICAgICAgICAgc2V0dGluZz17c2V0dGluZ3MuZmxhc2hNb2RlRW5hYmxlZH1cbiAgICAgICAgICBvcHRpb25zPXtUT0dHTEVfT1BUSU9OU31cbiAgICAgICAgLz5cbiAgICAgIDwvQnV0dG9uUm93PlxuICAgIDwvZGl2PlxuICApXG59XG4iLCJpbXBvcnQgdHlwZSB7IFNpZ25hbCB9IGZyb20gJ0BwcmVhY3Qvc2lnbmFscy1jb3JlJ1xuaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSAncHJlYWN0J1xuaW1wb3J0IHR5cGUgeyBTZXR0aW5nc1N0b3JlIH0gZnJvbSAnLi4vLi4vYXBwbGljYXRpb24tc2V0dGluZ3Mvc2V0dGluZ3NTdG9yZSdcbmltcG9ydCB7IFNldHRpbmdzUHJvdmlkZXIgfSBmcm9tICcuLi9jb250ZXh0cy9TZXR0aW5nc0NvbnRleHQnXG5pbXBvcnQgeyBDb250cm9sUGFuZWwgfSBmcm9tICcuL0NvbnRyb2xQYW5lbCdcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVJvb3QoXG4gIGJvYXJkQ2hhbmdlZDogU2lnbmFsPG51bWJlcj4sXG4gIG1vdW50UG9pbnQ6IEhUTUxFbGVtZW50LFxuICBzZXR0aW5nczogU2V0dGluZ3NTdG9yZVxuKTogdm9pZCB7XG4gIHJlbmRlcihcbiAgICA8U2V0dGluZ3NQcm92aWRlciBzZXR0aW5ncz17c2V0dGluZ3N9PlxuICAgICAgPENvbnRyb2xQYW5lbCBib2FyZENoYW5nZWQ9e2JvYXJkQ2hhbmdlZH0gLz5cbiAgICA8L1NldHRpbmdzUHJvdmlkZXI+LFxuICAgIG1vdW50UG9pbnRcbiAgKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVzdHJveVJvb3QobW91bnRQb2ludDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgcmVuZGVyKG51bGwsIG1vdW50UG9pbnQpXG59XG4iLCJpbXBvcnQgeyBzaWduYWwgfSBmcm9tICdAcHJlYWN0L3NpZ25hbHMtY29yZSdcbmltcG9ydCB7IGNyZWF0ZURpdmlkZXJzLCBkZXN0cm95RGl2aWRlcnMgfSBmcm9tICcuL2FkYXB0ZXJzLW92ZXJsYXlzL2RpdmlkZXJzJ1xuaW1wb3J0IHsgY3JlYXRlRmxhc2hPdmVybGF5LCBkZXN0cm95Rmxhc2hPdmVybGF5IH0gZnJvbSAnLi9hZGFwdGVycy1vdmVybGF5cy9mbGFzaCdcbmltcG9ydCB7IHNldHVwRGl2aWRlcnNFZmZlY3QgfSBmcm9tICcuL2FwcGxpY2F0aW9uLWVmZmVjdHMvb25EaXZpZGVycydcbmltcG9ydCB7IHNldHVwS2V5Ym9hcmRDb21tYW5kcywgdGVhcmRvd25LZXlib2FyZENvbW1hbmRzIH0gZnJvbSAnLi9hcHBsaWNhdGlvbi1pbnB1dC9rZXlib2FyZElucHV0J1xuaW1wb3J0IHtcbiAgY3JlYXRlQm9hcmRPYnNlcnZlcixcbiAgc3RhcnRCb2FyZE9ic2VydmVyLFxuICBzdG9wQm9hcmRPYnNlcnZlcixcbn0gZnJvbSAnLi9hcHBsaWNhdGlvbi1vYnNlcnZlcnMvb2JzZXJ2ZXJTdGF0ZSdcbmltcG9ydCB7XG4gIGNyZWF0ZVNldHRpbmdzU3RvcmUsXG4gIGxvYWRTZXR0aW5ncyxcbiAgc2V0dXBBdXRvU2F2ZSxcbn0gZnJvbSAnLi9hcHBsaWNhdGlvbi1zZXR0aW5ncy9zZXR0aW5nc1N0b3JlJ1xuaW1wb3J0IHsgRG9tU2VsZWN0b3IgfSBmcm9tICcuL2NvbnN0YW50cydcbmltcG9ydCB7IGFwcGVuZENoaWxkLCBjcmVhdGVEaXYsIHF1ZXJ5U2VsZWN0b3IsIHdhaXRGb3JFbGVtZW50IH0gZnJvbSAnLi9wbGF0Zm9ybS9kb20nXG5pbXBvcnQgeyBjcmVhdGVSb290LCBkZXN0cm95Um9vdCB9IGZyb20gJy4vcHJlc2VudGF0aW9uL2NvbXBvbmVudHMvcm9vdCdcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGluaXQoKSB7XG4gIC8vIFdhaXQgZm9yIGxpY2hlc3MgdG8gbG9hZCB0aGUgYm9hcmRcbiAgYXdhaXQgd2FpdEZvckVsZW1lbnQoRG9tU2VsZWN0b3IuS0VZQk9BUkRfTU9WRSlcblxuICAvLyBJbml0aWFsaXplIHNldHRpbmdzXG4gIGNvbnN0IHNldHRpbmdzID0gY3JlYXRlU2V0dGluZ3NTdG9yZSgpXG4gIGxvYWRTZXR0aW5ncyhzZXR0aW5ncylcbiAgc2V0dXBBdXRvU2F2ZShzZXR0aW5ncylcblxuICAvLyBDcmVhdGUgc2hhcmVkIGJvYXJkIGNoYW5nZSBzaWduYWxcbiAgY29uc3QgYm9hcmRDaGFuZ2VkID0gc2lnbmFsKDApXG5cbiAgLy8gQ3JlYXRlIERPTSBzdGF0ZVxuICBjb25zdCBmbGFzaFN0YXRlID0gY3JlYXRlRmxhc2hPdmVybGF5KClcbiAgY29uc3QgZGl2aWRlcnNTdGF0ZSA9IGNyZWF0ZURpdmlkZXJzKClcbiAgY29uc3QgYm9hcmRPYnNlcnZlclN0YXRlID0gY3JlYXRlQm9hcmRPYnNlcnZlcihib2FyZENoYW5nZWQpXG5cbiAgLy8gU3RhcnQgb2JzZXJ2ZXJcbiAgc3RhcnRCb2FyZE9ic2VydmVyKGJvYXJkT2JzZXJ2ZXJTdGF0ZSlcblxuICAvLyBTZXQgdXAgZWZmZWN0c1xuICBjb25zdCBjbGVhbnVwRGl2aWRlcnMgPSBzZXR1cERpdmlkZXJzRWZmZWN0KGRpdmlkZXJzU3RhdGUsIHNldHRpbmdzKVxuXG4gIC8vIFNldCB1cCBjb21tYW5kc1xuICBzZXR1cEtleWJvYXJkQ29tbWFuZHMoc2V0dGluZ3MpXG5cbiAgLy8gTW91bnQgUHJlYWN0IFVJXG4gIGNvbnN0IG1vdW50UG9pbnQgPSBjcmVhdGVEaXYoKVxuICBjb25zdCBrZXlib2FyZE1vdmUgPSBxdWVyeVNlbGVjdG9yKERvbVNlbGVjdG9yLktFWUJPQVJEX01PVkUpXG4gIGlmIChrZXlib2FyZE1vdmUpIHtcbiAgICBhcHBlbmRDaGlsZChrZXlib2FyZE1vdmUsIG1vdW50UG9pbnQpXG4gIH1cbiAgY3JlYXRlUm9vdChib2FyZENoYW5nZWQsIG1vdW50UG9pbnQsIHNldHRpbmdzKVxuXG4gIC8vIFJldHVybiBjbGVhbnVwIGZ1bmN0aW9uXG4gIHJldHVybiAoKSA9PiB7XG4gICAgY2xlYW51cERpdmlkZXJzKClcbiAgICBzdG9wQm9hcmRPYnNlcnZlcihib2FyZE9ic2VydmVyU3RhdGUpXG4gICAgZGVzdHJveUZsYXNoT3ZlcmxheShmbGFzaFN0YXRlKVxuICAgIGRlc3Ryb3lEaXZpZGVycyhkaXZpZGVyc1N0YXRlKVxuICAgIHRlYXJkb3duS2V5Ym9hcmRDb21tYW5kcygpXG4gICAgZGVzdHJveVJvb3QobW91bnRQb2ludClcbiAgfVxufVxuIiwiaW1wb3J0IHsgaW5pdCB9IGZyb20gJy4vaW5pdCdcblxuLy8gU3RhcnQgdGhlIGFwcGxpY2F0aW9uXG5pbml0KCkuY2F0Y2goY29uc29sZS5lcnJvcilcbiJdLCJ4X2dvb2dsZV9pZ25vcmVMaXN0IjpbMCwyMywyNCwyNV0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0NBQUEsSUFBSUEsTUFBRSxPQUFPLElBQUksZ0JBQWdCO0NBQUUsU0FBU0MsTUFBRztFQUFDLElBQUcsRUFBRUMsTUFBRSxJQUFHO0dBQUMsSUFBSSxHQUFFLElBQUUsQ0FBQztHQUFFLENBQUMsV0FBVTtJQUFDLElBQUksSUFBRUM7SUFBRSxNQUFFLEtBQUs7SUFBRSxPQUFNLEtBQUssTUFBSSxHQUFFO0tBQUMsSUFBRyxFQUFFLEVBQUUsTUFBSSxFQUFFLEdBQUUsRUFBRSxFQUFFLElBQUUsRUFBRTtLQUFFLElBQUUsRUFBRTtJQUFDO0dBQUMsR0FBRTtHQUFFLE9BQU0sS0FBSyxNQUFJQyxLQUFFO0lBQUMsSUFBSSxJQUFFQTtJQUFFLE1BQUUsS0FBSztJQUFFO0lBQUksT0FBTSxLQUFLLE1BQUksR0FBRTtLQUFDLElBQUksSUFBRSxFQUFFO0tBQUUsRUFBRSxJQUFFLEtBQUs7S0FBRSxFQUFFLEtBQUc7S0FBRyxJQUFHLEVBQUUsSUFBRSxFQUFFLE1BQUlDLElBQUUsQ0FBQyxHQUFFLElBQUc7TUFBQyxFQUFFLEVBQUU7S0FBQyxTQUFPLEdBQUU7TUFBQyxJQUFHLENBQUMsR0FBRTtPQUFDLElBQUU7T0FBRSxJQUFFLENBQUM7TUFBQztLQUFDO0tBQUMsSUFBRTtJQUFDO0dBQUM7R0FBQyxNQUFFO0dBQUU7R0FBSSxJQUFHLEdBQUUsTUFBTTtFQUFDLE9BQU07Q0FBRztDQUF1RSxJQUFJQyxNQUFFLEtBQUs7Q0FBRSxTQUFTQyxJQUFFLEdBQUU7RUFBQyxJQUFJLElBQUVEO0VBQUUsTUFBRSxLQUFLO0VBQUUsSUFBRztHQUFDLE9BQU8sRUFBRTtFQUFDLFVBQVE7R0FBQyxNQUFFO0VBQUM7Q0FBQztDQUFDLElBQUlFLEtBQUVKLE1BQUUsS0FBSyxHQUFFRixNQUFFLEdBQUVPLE1BQUUsR0FBTUUsTUFBRSxHQUFFUixNQUFFLEtBQUssR0FBRVMsTUFBRTtDQUFFLFNBQVNDLElBQUUsR0FBRTtFQUFDLElBQUcsS0FBSyxNQUFJUCxLQUFFO0dBQUMsSUFBSSxJQUFFLEVBQUU7R0FBRSxJQUFHLEtBQUssTUFBSSxLQUFHLEVBQUUsTUFBSUEsS0FBRTtJQUFDLElBQUU7S0FBQyxHQUFFO0tBQUUsR0FBRTtLQUFFLEdBQUVBLElBQUU7S0FBRSxHQUFFLEtBQUs7S0FBRSxHQUFFQTtLQUFFLEdBQUUsS0FBSztLQUFFLEdBQUUsS0FBSztLQUFFLEdBQUU7SUFBQztJQUFFLElBQUcsS0FBSyxNQUFJQSxJQUFFLEdBQUUsSUFBRSxFQUFFLElBQUU7SUFBRSxJQUFFLElBQUU7SUFBRSxFQUFFLElBQUU7SUFBRSxJQUFHLEtBQUdBLElBQUUsR0FBRSxFQUFFLEVBQUUsQ0FBQztJQUFFLE9BQU87R0FBQyxPQUFNLElBQUcsT0FBSyxFQUFFLEdBQUU7SUFBQyxFQUFFLElBQUU7SUFBRSxJQUFHLEtBQUssTUFBSSxFQUFFLEdBQUU7S0FBQyxFQUFFLEVBQUUsSUFBRSxFQUFFO0tBQUUsSUFBRyxLQUFLLE1BQUksRUFBRSxHQUFFLEVBQUUsRUFBRSxJQUFFLEVBQUU7S0FBRSxFQUFFLElBQUVBLElBQUU7S0FBRSxFQUFFLElBQUUsS0FBSztLQUFFLElBQUUsRUFBRSxJQUFFO0tBQUUsSUFBRSxJQUFFO0lBQUM7SUFBQyxPQUFPO0dBQUM7RUFBQztDQUFDO0NBQUMsU0FBU1EsSUFBRSxHQUFFLEdBQUU7RUFBQyxLQUFLLElBQUU7RUFBRSxLQUFLLElBQUU7RUFBRSxLQUFLLElBQUUsS0FBSztFQUFFLEtBQUssSUFBRSxLQUFLO0VBQUUsS0FBSyxJQUFFO0VBQUUsS0FBSyxJQUFFLFFBQU0sSUFBRSxLQUFLLElBQUUsRUFBRTtFQUFRLEtBQUssSUFBRSxRQUFNLElBQUUsS0FBSyxJQUFFLEVBQUU7RUFBVSxLQUFLLE9BQUssUUFBTSxJQUFFLEtBQUssSUFBRSxFQUFFO0NBQUk7Q0FBQyxJQUFFLFVBQVUsUUFBTWQ7Q0FBRSxJQUFFLFVBQVUsSUFBRSxXQUFVO0VBQUMsT0FBTSxDQUFDO0NBQUM7Q0FBRSxJQUFFLFVBQVUsSUFBRSxTQUFTLEdBQUU7RUFBQyxJQUFJLElBQUUsTUFBSyxJQUFFLEtBQUs7RUFBRSxJQUFHLE1BQUksS0FBRyxLQUFLLE1BQUksRUFBRSxHQUFFO0dBQUMsRUFBRSxJQUFFO0dBQUUsS0FBSyxJQUFFO0dBQUUsSUFBRyxLQUFLLE1BQUksR0FBRSxFQUFFLElBQUU7UUFBTyxJQUFFLFdBQVU7SUFBQyxJQUFJO0lBQUUsU0FBTyxJQUFFLEVBQUUsTUFBSSxFQUFFLEtBQUssQ0FBQztHQUFDLENBQUM7RUFBQztDQUFDO0NBQUUsSUFBRSxVQUFVLElBQUUsU0FBUyxHQUFFO0VBQUMsSUFBSSxJQUFFO0VBQUssSUFBRyxLQUFLLE1BQUksS0FBSyxHQUFFO0dBQUMsSUFBSSxJQUFFLEVBQUUsR0FBRSxJQUFFLEVBQUU7R0FBRSxJQUFHLEtBQUssTUFBSSxHQUFFO0lBQUMsRUFBRSxJQUFFO0lBQUUsRUFBRSxJQUFFLEtBQUs7R0FBQztHQUFDLElBQUcsS0FBSyxNQUFJLEdBQUU7SUFBQyxFQUFFLElBQUU7SUFBRSxFQUFFLElBQUUsS0FBSztHQUFDO0dBQUMsSUFBRyxNQUFJLEtBQUssR0FBRTtJQUFDLEtBQUssSUFBRTtJQUFFLElBQUcsS0FBSyxNQUFJLEdBQUUsSUFBRSxXQUFVO0tBQUMsSUFBSTtLQUFFLFNBQU8sSUFBRSxFQUFFLE1BQUksRUFBRSxLQUFLLENBQUM7SUFBQyxDQUFDO0dBQUM7RUFBQztDQUFDO0NBQUUsSUFBRSxVQUFVLFlBQVUsU0FBUyxHQUFFO0VBQUMsSUFBSSxJQUFFO0VBQUssT0FBT2UsSUFBRSxXQUFVO0dBQUMsSUFBSSxJQUFFLEVBQUUsT0FBTSxJQUFFVDtHQUFFLE1BQUUsS0FBSztHQUFFLElBQUc7SUFBQyxFQUFFLENBQUM7R0FBQyxVQUFRO0lBQUMsTUFBRTtHQUFDO0VBQUMsR0FBRSxFQUFDLE1BQUssTUFBSyxDQUFDO0NBQUM7Q0FBRSxJQUFFLFVBQVUsVUFBUSxXQUFVO0VBQUMsT0FBTyxLQUFLO0NBQUs7Q0FBRSxJQUFFLFVBQVUsV0FBUyxXQUFVO0VBQUMsT0FBTyxLQUFLLFFBQU07Q0FBRTtDQUFFLElBQUUsVUFBVSxTQUFPLFdBQVU7RUFBQyxPQUFPLEtBQUs7Q0FBSztDQUFFLElBQUUsVUFBVSxPQUFLLFdBQVU7RUFBQyxJQUFJLElBQUU7RUFBSyxPQUFPQyxJQUFFLFdBQVU7R0FBQyxPQUFPLEVBQUU7RUFBSyxDQUFDO0NBQUM7Q0FBRSxPQUFPLGVBQWVPLElBQUUsV0FBVSxTQUFRO0VBQUMsS0FBSSxXQUFVO0dBQUMsSUFBSSxJQUFFRCxJQUFFLElBQUk7R0FBRSxJQUFHLEtBQUssTUFBSSxHQUFFLEVBQUUsSUFBRSxLQUFLO0dBQUUsT0FBTyxLQUFLO0VBQUM7RUFBRSxLQUFJLFNBQVMsR0FBRTtHQUFDLElBQUcsTUFBSSxLQUFLLEdBQUU7SUFBQyxJQUFHSixNQUFFLEtBQUksTUFBTSxJQUFJLE1BQU0sZ0JBQWdCO0lBQUUsQ0FBQyxTQUFTLEdBQUU7S0FBQyxJQUFHLE1BQUlQLE9BQUcsTUFBSU87VUFBSyxFQUFFLE1BQUlFLEtBQUU7T0FBQyxFQUFFLElBQUVBO09BQUUsTUFBRTtRQUFDLEdBQUU7UUFBRSxHQUFFLEVBQUU7UUFBRSxHQUFFLEVBQUU7UUFBRSxHQUFFUjtPQUFDO01BQUM7O0lBQUMsR0FBRSxJQUFJO0lBQUUsS0FBSyxJQUFFO0lBQUUsS0FBSztJQUFJO0lBQUk7SUFBSSxJQUFHO0tBQUMsS0FBSSxJQUFJLElBQUUsS0FBSyxHQUFFLEtBQUssTUFBSSxHQUFFLElBQUUsRUFBRSxHQUFFLEVBQUUsRUFBRSxFQUFFO0lBQUMsVUFBUTtLQUFDLElBQUU7SUFBQztHQUFDO0VBQUM7Q0FBQyxDQUFDO0NBQUUsU0FBU2EsSUFBRSxHQUFFLEdBQUU7RUFBQyxPQUFPLElBQUlGLElBQUUsR0FBRSxDQUFDO0NBQUM7Q0FBQyxTQUFTVCxJQUFFLEdBQUU7RUFBQyxLQUFJLElBQUksSUFBRSxFQUFFLEdBQUUsS0FBSyxNQUFJLEdBQUUsSUFBRSxFQUFFLEdBQUUsSUFBRyxFQUFFLEVBQUUsTUFBSSxFQUFFLEtBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxLQUFHLEVBQUUsRUFBRSxNQUFJLEVBQUUsR0FBRSxPQUFNLENBQUM7RUFBRSxPQUFNLENBQUM7Q0FBQztDQUFDLFNBQVNZLElBQUUsR0FBRTtFQUFDLEtBQUksSUFBSSxJQUFFLEVBQUUsR0FBRSxLQUFLLE1BQUksR0FBRSxJQUFFLEVBQUUsR0FBRTtHQUFDLElBQUksSUFBRSxFQUFFLEVBQUU7R0FBRSxJQUFHLEtBQUssTUFBSSxHQUFFLEVBQUUsSUFBRTtHQUFFLEVBQUUsRUFBRSxJQUFFO0dBQUUsRUFBRSxJQUFFO0dBQUcsSUFBRyxLQUFLLE1BQUksRUFBRSxHQUFFO0lBQUMsRUFBRSxJQUFFO0lBQUU7R0FBSztFQUFDO0NBQUM7Q0FBQyxTQUFTQyxJQUFFLEdBQUU7RUFBQyxJQUFJLElBQUUsRUFBRSxHQUFFLElBQUUsS0FBSztFQUFFLE9BQU0sS0FBSyxNQUFJLEdBQUU7R0FBQyxJQUFJLElBQUUsRUFBRTtHQUFFLElBQUcsT0FBSyxFQUFFLEdBQUU7SUFBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQUUsSUFBRyxLQUFLLE1BQUksR0FBRSxFQUFFLElBQUUsRUFBRTtJQUFFLElBQUcsS0FBSyxNQUFJLEVBQUUsR0FBRSxFQUFFLEVBQUUsSUFBRTtHQUFDLE9BQU0sSUFBRTtHQUFFLEVBQUUsRUFBRSxJQUFFLEVBQUU7R0FBRSxJQUFHLEtBQUssTUFBSSxFQUFFLEdBQUUsRUFBRSxJQUFFLEtBQUs7R0FBRSxJQUFFO0VBQUM7RUFBQyxFQUFFLElBQUU7Q0FBQztDQUFDLFNBQVNDLElBQUUsR0FBRSxHQUFFO0VBQUMsSUFBRSxLQUFLLE1BQUssS0FBSyxDQUFDO0VBQUUsS0FBSyxJQUFFO0VBQUUsS0FBSyxJQUFFLEtBQUs7RUFBRSxLQUFLLElBQUVQLE1BQUU7RUFBRSxLQUFLLElBQUU7RUFBRSxLQUFLLElBQUUsUUFBTSxJQUFFLEtBQUssSUFBRSxFQUFFO0VBQVEsS0FBSyxJQUFFLFFBQU0sSUFBRSxLQUFLLElBQUUsRUFBRTtFQUFVLEtBQUssT0FBSyxRQUFNLElBQUUsS0FBSyxJQUFFLEVBQUU7Q0FBSTtDQUFDLElBQUUsWUFBVSxJQUFJRSxJQUFBQTtDQUFFLElBQUUsVUFBVSxJQUFFLFdBQVU7RUFBQyxLQUFLLEtBQUc7RUFBRyxJQUFHLElBQUUsS0FBSyxHQUFFLE9BQU0sQ0FBQztFQUFFLElBQUcsT0FBSyxLQUFHLEtBQUssSUFBRyxPQUFNLENBQUM7RUFBRSxLQUFLLEtBQUc7RUFBRyxJQUFHLEtBQUssTUFBSUYsS0FBRSxPQUFNLENBQUM7RUFBRSxLQUFLLElBQUVBO0VBQUUsS0FBSyxLQUFHO0VBQUUsSUFBRyxLQUFLLElBQUUsS0FBRyxDQUFDUCxJQUFFLElBQUksR0FBRTtHQUFDLEtBQUssS0FBRztHQUFHLE9BQU0sQ0FBQztFQUFDO0VBQUMsSUFBSSxJQUFFQztFQUFFLElBQUc7R0FBQyxJQUFFLElBQUk7R0FBRSxNQUFFO0dBQUssSUFBSSxJQUFFLEtBQUssRUFBRTtHQUFFLElBQUcsS0FBRyxLQUFLLEtBQUcsS0FBSyxNQUFJLEtBQUcsTUFBSSxLQUFLLEdBQUU7SUFBQyxLQUFLLElBQUU7SUFBRSxLQUFLLEtBQUc7SUFBSSxLQUFLO0dBQUc7RUFBQyxTQUFPLEdBQUU7R0FBQyxLQUFLLElBQUU7R0FBRSxLQUFLLEtBQUc7R0FBRyxLQUFLO0VBQUc7RUFBQyxNQUFFO0VBQUUsSUFBRSxJQUFJO0VBQUUsS0FBSyxLQUFHO0VBQUcsT0FBTSxDQUFDO0NBQUM7Q0FBRSxJQUFFLFVBQVUsSUFBRSxTQUFTLEdBQUU7RUFBQyxJQUFHLEtBQUssTUFBSSxLQUFLLEdBQUU7R0FBQyxLQUFLLEtBQUc7R0FBRyxLQUFJLElBQUksSUFBRSxLQUFLLEdBQUUsS0FBSyxNQUFJLEdBQUUsSUFBRSxFQUFFLEdBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztFQUFDO0VBQUMsSUFBRSxVQUFVLEVBQUUsS0FBSyxNQUFLLENBQUM7Q0FBQztDQUFFLElBQUUsVUFBVSxJQUFFLFNBQVMsR0FBRTtFQUFDLElBQUcs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RUMsS0FBRUMsS0FBRSxHQUFFLElBQUUsQ0FBQyxHQUFFQyxNQUFFLENBQUMsR0FBRSxJQUFFLHFFQUFvRSxJQUFFLE1BQU07Q0FBUSxTQUFTQyxJQUFFLEdBQUUsR0FBRTtFQUFDLEtBQUksSUFBSSxLQUFLLEdBQUUsRUFBRSxLQUFHLEVBQUU7RUFBRyxPQUFPO0NBQUM7Q0FBQyxTQUFTLEVBQUUsR0FBRTtFQUFDLEtBQUcsRUFBRSxjQUFZLEVBQUUsV0FBVyxZQUFZLENBQUM7Q0FBQztDQUFDLFNBQVNDLElBQUUsR0FBRSxHQUFFLEdBQUU7RUFBQyxJQUFJLEdBQUUsR0FBRSxHQUFFLElBQUUsQ0FBQztFQUFFLEtBQUksS0FBSyxHQUFFLFNBQU8sSUFBRSxJQUFFLEVBQUUsS0FBRyxTQUFPLElBQUUsSUFBRSxFQUFFLEtBQUcsRUFBRSxLQUFHLEVBQUU7RUFBRyxJQUFHLFVBQVUsU0FBTyxNQUFJLEVBQUUsV0FBUyxVQUFVLFNBQU8sSUFBRSxFQUFFLEtBQUssV0FBVSxDQUFDLElBQUUsSUFBRyxjQUFZLE9BQU8sS0FBRyxRQUFNLEVBQUUsY0FBYSxLQUFJLEtBQUssRUFBRSxjQUFhLEtBQUssTUFBSSxFQUFFLE9BQUssRUFBRSxLQUFHLEVBQUUsYUFBYTtFQUFJLE9BQU9DLElBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxJQUFJO0NBQUM7Q0FBQyxTQUFTQSxJQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtFQUFDLElBQUksSUFBRTtHQUFDLE1BQUs7R0FBRSxPQUFNO0dBQUUsS0FBSTtHQUFFLEtBQUk7R0FBRSxLQUFJO0dBQUssSUFBRztHQUFLLEtBQUk7R0FBRSxLQUFJO0dBQUssS0FBSTtHQUFLLGFBQVksS0FBSztHQUFFLEtBQUksUUFBTSxJQUFFLEVBQUVmLE1BQUU7R0FBRSxLQUFJO0dBQUcsS0FBSTtFQUFDO0VBQUUsT0FBTyxRQUFNLEtBQUcsUUFBTUQsSUFBRSxTQUFPQSxJQUFFLE1BQU0sQ0FBQyxHQUFFO0NBQUM7Q0FBbUMsU0FBUyxFQUFFLEdBQUU7RUFBQyxPQUFPLEVBQUU7Q0FBUTtDQUFDLFNBQVMsRUFBRSxHQUFFLEdBQUU7RUFBQyxLQUFLLFFBQU0sR0FBRSxLQUFLLFVBQVE7Q0FBQztDQUFDLFNBQVMsRUFBRSxHQUFFLEdBQUU7RUFBQyxJQUFHLFFBQU0sR0FBRSxPQUFPLEVBQUUsS0FBRyxFQUFFLEVBQUUsSUFBRyxFQUFFLE1BQUksQ0FBQyxJQUFFO0VBQUssS0FBSSxJQUFJLEdBQUUsSUFBRSxFQUFFLElBQUksUUFBTyxLQUFJLElBQUcsU0FBTyxJQUFFLEVBQUUsSUFBSSxPQUFLLFFBQU0sRUFBRSxLQUFJLE9BQU8sRUFBRTtFQUFJLE9BQU0sY0FBWSxPQUFPLEVBQUUsT0FBSyxFQUFFLENBQUMsSUFBRTtDQUFJO0NBQUMsU0FBUyxFQUFFLEdBQUU7RUFBQyxJQUFHLEVBQUUsT0FBSyxFQUFFLEtBQUk7R0FBQyxJQUFJLElBQUUsRUFBRSxLQUFJLElBQUUsRUFBRSxLQUFJLElBQUUsQ0FBQyxHQUFFLElBQUUsQ0FBQyxHQUFFLElBQUVjLElBQUUsQ0FBQyxHQUFFLENBQUM7R0FBRSxFQUFFLE1BQUksRUFBRSxNQUFJLEdBQUVkLElBQUUsU0FBT0EsSUFBRSxNQUFNLENBQUMsR0FBRSxFQUFFLEVBQUUsS0FBSSxHQUFFLEdBQUUsRUFBRSxLQUFJLEVBQUUsSUFBSSxjQUFhLEtBQUcsRUFBRSxNQUFJLENBQUMsQ0FBQyxJQUFFLE1BQUssR0FBRSxRQUFNLElBQUUsRUFBRSxDQUFDLElBQUUsR0FBRSxDQUFDLEVBQUUsS0FBRyxFQUFFLE1BQUssQ0FBQyxHQUFFLEVBQUUsTUFBSSxFQUFFLEtBQUksRUFBRSxHQUFHLElBQUksRUFBRSxPQUFLLEdBQUUsRUFBRSxHQUFFLEdBQUUsQ0FBQyxHQUFFLEVBQUUsTUFBSSxFQUFFLEtBQUcsTUFBSyxFQUFFLE9BQUssS0FBRyxFQUFFLENBQUM7RUFBQztDQUFDO0NBQUMsU0FBUyxFQUFFLEdBQUU7RUFBQyxJQUFHLFNBQU8sSUFBRSxFQUFFLE9BQUssUUFBTSxFQUFFLEtBQUksT0FBTyxFQUFFLE1BQUksRUFBRSxJQUFJLE9BQUssTUFBSyxFQUFFLElBQUksS0FBSyxTQUFTLEdBQUU7R0FBQyxJQUFHLFFBQU0sS0FBRyxRQUFNLEVBQUUsS0FBSSxPQUFPLEVBQUUsTUFBSSxFQUFFLElBQUksT0FBSyxFQUFFO0VBQUcsQ0FBQyxHQUFFLEVBQUUsQ0FBQztDQUFDO0NBQUMsU0FBUyxFQUFFLEdBQUU7RUFBQyxDQUFDLENBQUMsRUFBRSxRQUFNLEVBQUUsTUFBSSxDQUFDLE1BQUlHLElBQUUsS0FBSyxDQUFDLEtBQUcsQ0FBQyxFQUFFLFNBQU9DLE9BQUdKLElBQUUsd0JBQXNCLE1BQUVBLElBQUUsc0JBQW9CSyxLQUFHLENBQUM7Q0FBQztDQUFDLFNBQVMsSUFBRztFQUFDLElBQUc7R0FBQyxLQUFJLElBQUksR0FBRSxJQUFFLEdBQUVGLElBQUUsU0FBUSxJQUFFLFNBQU8sS0FBR0EsSUFBRSxLQUFLRyxHQUFDLEdBQUUsSUFBRUgsSUFBRSxNQUFNLEdBQUUsSUFBRUEsSUFBRSxRQUFPLEVBQUUsQ0FBQztFQUFDLFVBQVE7R0FBQyxJQUFFLFNBQU8sRUFBRSxNQUFJO0VBQUM7Q0FBQztDQUFDLFNBQVMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7RUFBQyxJQUFJLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsSUFBRSxLQUFHLEVBQUUsT0FBS1UsS0FBRSxJQUFFLEVBQUU7RUFBTyxLQUFJLElBQUUsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLEtBQUksU0FBTyxJQUFFLEVBQUUsSUFBSSxRQUFNLElBQUUsTUFBSSxFQUFFLE9BQUssRUFBRSxFQUFFLFFBQU0sR0FBRSxFQUFFLE1BQUksR0FBRSxJQUFFLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxLQUFJLEVBQUUsT0FBSyxFQUFFLE9BQUssRUFBRSxRQUFNLEVBQUUsT0FBSyxFQUFFLEVBQUUsS0FBSSxNQUFLLENBQUMsR0FBRSxFQUFFLEtBQUssRUFBRSxLQUFJLEVBQUUsT0FBSyxHQUFFLENBQUMsSUFBRyxRQUFNLEtBQUcsUUFBTSxNQUFJLElBQUUsS0FBSSxJQUFFLENBQUMsRUFBRSxJQUFFLEVBQUUsU0FBTyxFQUFFLFFBQU0sRUFBRSxPQUFLLElBQUVJLElBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxHQUFFLEtBQUcsRUFBRSxRQUFNLEVBQUUsTUFBSSxTQUFPLGNBQVksT0FBTyxFQUFFLFFBQU0sS0FBSyxNQUFJLElBQUUsSUFBRSxJQUFFLE1BQUksSUFBRSxFQUFFLGNBQWEsRUFBRSxPQUFLO0VBQUksT0FBTyxFQUFFLE1BQUksR0FBRTtDQUFDO0NBQUMsU0FBUyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtFQUFDLElBQUksR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLElBQUUsRUFBRSxRQUFPLElBQUUsR0FBRSxJQUFFO0VBQUUsS0FBSSxFQUFFLE1BQUksSUFBSSxNQUFNLENBQUMsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLEtBQUksU0FBTyxJQUFFLEVBQUUsT0FBSyxhQUFXLE9BQU8sS0FBRyxjQUFZLE9BQU8sS0FBRyxZQUFVLE9BQU8sS0FBRyxZQUFVLE9BQU8sS0FBRyxZQUFVLE9BQU8sS0FBRyxFQUFFLGVBQWEsU0FBTyxJQUFFLEVBQUUsSUFBSSxLQUFHRCxJQUFFLE1BQUssR0FBRSxNQUFLLE1BQUssSUFBSSxJQUFFLEVBQUUsQ0FBQyxJQUFFLElBQUUsRUFBRSxJQUFJLEtBQUdBLElBQUUsR0FBRSxFQUFDLFVBQVMsRUFBQyxHQUFFLE1BQUssTUFBSyxJQUFJLElBQUUsS0FBSyxNQUFJLEVBQUUsZUFBYSxFQUFFLE1BQUksSUFBRSxJQUFFLEVBQUUsSUFBSSxLQUFHQSxJQUFFLEVBQUUsTUFBSyxFQUFFLE9BQU0sRUFBRSxLQUFJLEVBQUUsTUFBSSxFQUFFLE1BQUksTUFBSyxFQUFFLEdBQUcsSUFBRSxFQUFFLElBQUksS0FBRyxHQUFFLElBQUUsSUFBRSxHQUFFLEVBQUUsS0FBRyxHQUFFLEVBQUUsTUFBSSxFQUFFLE1BQUksR0FBRSxJQUFFLE1BQUssT0FBSyxJQUFFLEVBQUUsTUFBSSxFQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsT0FBSyxNQUFLLElBQUUsRUFBRSxRQUFNLEVBQUUsT0FBSyxLQUFJLFFBQU0sS0FBRyxRQUFNLEVBQUUsT0FBSyxNQUFJLE1BQUksSUFBRSxJQUFFLE1BQUksSUFBRSxLQUFHLE1BQUssY0FBWSxPQUFPLEVBQUUsU0FBTyxFQUFFLE9BQUssTUFBSSxLQUFHLE1BQUksS0FBRyxJQUFFLElBQUUsTUFBSSxLQUFHLElBQUUsSUFBRSxPQUFLLElBQUUsSUFBRSxNQUFJLEtBQUksRUFBRSxPQUFLLE9BQUssRUFBRSxJQUFJLEtBQUc7RUFBSyxJQUFHLEdBQUUsS0FBSSxJQUFFLEdBQUUsSUFBRSxHQUFFLEtBQUksU0FBTyxJQUFFLEVBQUUsT0FBSyxNQUFJLElBQUUsRUFBRSxTQUFPLEVBQUUsT0FBSyxNQUFJLElBQUUsRUFBRSxDQUFDLElBQUcsRUFBRSxHQUFFLENBQUM7RUFBRyxPQUFPO0NBQUM7Q0FBQyxTQUFTQyxJQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7RUFBQyxJQUFJLEdBQUU7RUFBRSxJQUFHLGNBQVksT0FBTyxFQUFFLE1BQUs7R0FBQyxLQUFJLElBQUUsRUFBRSxLQUFJLElBQUUsR0FBRSxLQUFHLElBQUUsRUFBRSxRQUFPLEtBQUksRUFBRSxPQUFLLEVBQUUsR0FBRyxLQUFHLEdBQUUsSUFBRUEsSUFBRSxFQUFFLElBQUcsR0FBRSxHQUFFLENBQUM7R0FBRyxPQUFPO0VBQUM7RUFBQyxFQUFFLE9BQUssTUFBSSxNQUFJLEtBQUcsRUFBRSxRQUFNLENBQUMsRUFBRSxlQUFhLElBQUUsRUFBRSxDQUFDLElBQUcsRUFBRSxhQUFhLEVBQUUsS0FBSSxLQUFHLElBQUksSUFBRyxJQUFFLEVBQUU7RUFBSztHQUFHLElBQUUsS0FBRyxFQUFFO1NBQWtCLFFBQU0sS0FBRyxLQUFHLEVBQUU7RUFBVSxPQUFPO0NBQUM7Q0FBNkcsU0FBUyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7RUFBQyxJQUFJLEdBQUUsR0FBRSxHQUFFLElBQUUsRUFBRSxLQUFJLElBQUUsRUFBRSxNQUFLLElBQUUsRUFBRSxJQUFHLElBQUUsUUFBTSxLQUFHLE1BQUksSUFBRSxFQUFFO0VBQUssSUFBRyxTQUFPLEtBQUcsUUFBTSxLQUFHLEtBQUcsS0FBRyxFQUFFLE9BQUssS0FBRyxFQUFFLE1BQUssT0FBTztFQUFFLElBQUcsS0FBRyxJQUFFLElBQUU7UUFBTyxJQUFFLElBQUUsR0FBRSxJQUFFLElBQUUsR0FBRSxLQUFHLEtBQUcsSUFBRSxFQUFFLFNBQVEsSUFBRyxTQUFPLElBQUUsRUFBRSxJQUFFLEtBQUcsSUFBRSxNQUFJLFNBQU8sTUFBSSxJQUFFLEVBQUUsUUFBTSxLQUFHLEVBQUUsT0FBSyxLQUFHLEVBQUUsTUFBSyxPQUFPO0VBQUE7RUFBRSxPQUFNO0NBQUU7Q0FBQyxTQUFTQyxJQUFFLEdBQUUsR0FBRSxHQUFFO0VBQUMsT0FBSyxFQUFFLEtBQUcsRUFBRSxZQUFZLEdBQUUsUUFBTSxJQUFFLEtBQUcsQ0FBQyxJQUFFLEVBQUUsS0FBRyxRQUFNLElBQUUsS0FBRyxZQUFVLE9BQU8sS0FBRyxFQUFFLEtBQUssQ0FBQyxJQUFFLElBQUUsSUFBRTtDQUFJO0NBQUMsU0FBUyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtFQUFDLElBQUksR0FBRTtFQUFFLEdBQUUsSUFBRyxXQUFTLEdBQUUsSUFBRyxZQUFVLE9BQU8sR0FBRSxFQUFFLE1BQU0sVUFBUTtPQUFNO0dBQUMsSUFBRyxZQUFVLE9BQU8sTUFBSSxFQUFFLE1BQU0sVUFBUSxJQUFFLEtBQUksR0FBRSxLQUFJLEtBQUssR0FBRSxLQUFHLEtBQUssS0FBR0EsSUFBRSxFQUFFLE9BQU0sR0FBRSxFQUFFO0dBQUUsSUFBRyxHQUFFLEtBQUksS0FBSyxHQUFFLEtBQUcsRUFBRSxNQUFJLEVBQUUsTUFBSUEsSUFBRSxFQUFFLE9BQU0sR0FBRSxFQUFFLEVBQUU7RUFBQztPQUFNLElBQUcsT0FBSyxFQUFFLE1BQUksT0FBSyxFQUFFLElBQUcsSUFBRSxNQUFJLElBQUUsRUFBRSxRQUFRUixLQUFFLElBQUksSUFBRyxJQUFFLEVBQUUsWUFBWSxHQUFFLElBQUUsS0FBSyxLQUFHLGdCQUFjLEtBQUcsZUFBYSxJQUFFLEVBQUUsTUFBTSxDQUFDLElBQUUsRUFBRSxNQUFNLENBQUMsR0FBRSxFQUFFLE1BQUksRUFBRSxJQUFFLENBQUMsSUFBRyxFQUFFLEVBQUUsSUFBRSxLQUFHLEdBQUUsSUFBRSxJQUFFLEVBQUVELE9BQUcsRUFBRUEsUUFBSSxFQUFFQSxPQUFHLEdBQUUsRUFBRSxpQkFBaUIsR0FBRSxJQUFFRyxNQUFFRCxLQUFFLENBQUMsS0FBRyxFQUFFLG9CQUFvQixHQUFFLElBQUVDLE1BQUVELEtBQUUsQ0FBQztPQUFNO0dBQUMsSUFBRyxnQ0FBOEIsR0FBRSxJQUFFLEVBQUUsUUFBUSxlQUFjLEdBQUcsRUFBRSxRQUFRLFVBQVMsR0FBRztRQUFPLElBQUcsV0FBUyxLQUFHLFlBQVUsS0FBRyxVQUFRLEtBQUcsVUFBUSxLQUFHLFVBQVEsS0FBRyxjQUFZLEtBQUcsY0FBWSxLQUFHLGFBQVcsS0FBRyxhQUFXLEtBQUcsVUFBUSxLQUFHLGFBQVcsS0FBRyxLQUFLLEdBQUUsSUFBRztJQUFDLEVBQUUsS0FBRyxRQUFNLElBQUUsS0FBRztJQUFFLE1BQU07R0FBQyxTQUFPLEdBQUUsQ0FBQztHQUFDLGNBQVksT0FBTyxNQUFJLFFBQU0sS0FBRyxDQUFDLE1BQUksS0FBRyxPQUFLLEVBQUUsS0FBRyxFQUFFLGdCQUFnQixDQUFDLElBQUUsRUFBRSxhQUFhLEdBQUUsYUFBVyxLQUFHLEtBQUcsSUFBRSxLQUFHLENBQUM7RUFBRTtDQUFDO0NBQUMsU0FBUyxFQUFFLEdBQUU7RUFBQyxPQUFPLFNBQVMsR0FBRTtHQUFDLElBQUcsS0FBSyxHQUFFO0lBQUMsSUFBSSxJQUFFLEtBQUssRUFBRSxFQUFFLE9BQUs7SUFBRyxJQUFHLFFBQU0sRUFBRUgsTUFBRyxFQUFFQSxPQUFHO1NBQVMsSUFBRyxFQUFFQSxPQUFHLEVBQUVDLE1BQUc7SUFBTyxPQUFPLEVBQUVULElBQUUsUUFBTUEsSUFBRSxNQUFNLENBQUMsSUFBRSxDQUFDO0dBQUM7RUFBQztDQUFDO0NBQUMsU0FBUyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7RUFBQyxJQUFJLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLElBQUUsRUFBRTtFQUFLLElBQUcsS0FBSyxNQUFJLEVBQUUsYUFBWSxPQUFPO0VBQUssTUFBSSxFQUFFLFFBQU0sSUFBRSxDQUFDLEVBQUUsS0FBRyxFQUFFLE1BQUssSUFBRSxDQUFDLElBQUUsRUFBRSxNQUFJLEVBQUUsR0FBRyxLQUFJLElBQUVBLElBQUUsUUFBTSxFQUFFLENBQUM7RUFBRSxHQUFFLElBQUcsY0FBWSxPQUFPLEdBQUUsSUFBRztHQUFDLElBQUcsSUFBRSxFQUFFLE9BQU0sSUFBRSxFQUFFLGFBQVcsRUFBRSxVQUFVLFFBQU8sS0FBRyxJQUFFLEVBQUUsZ0JBQWMsRUFBRSxFQUFFLE1BQUssSUFBRSxJQUFFLElBQUUsRUFBRSxNQUFNLFFBQU0sRUFBRSxLQUFHLEdBQUUsRUFBRSxNQUFJLElBQUUsQ0FBQyxJQUFFLEVBQUUsTUFBSSxFQUFFLEtBQUssS0FBRyxFQUFFLE9BQUssSUFBRSxFQUFFLE1BQUksSUFBRSxJQUFJLEVBQUUsR0FBRSxDQUFDLEtBQUcsRUFBRSxNQUFJLElBQUUsSUFBSSxFQUFFLEdBQUUsQ0FBQyxHQUFFLEVBQUUsY0FBWSxHQUFFLEVBQUUsU0FBTyxJQUFHLEtBQUcsRUFBRSxJQUFJLENBQUMsR0FBRSxFQUFFLFVBQVEsRUFBRSxRQUFNLENBQUMsSUFBRyxFQUFFLE1BQUksR0FBRSxJQUFFLEVBQUUsTUFBSSxDQUFDLEdBQUUsRUFBRSxNQUFJLENBQUMsR0FBRSxFQUFFLE1BQUksQ0FBQyxJ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LEtBQUc7RUFBSyxTQUFPLEdBQUU7R0FBQyxJQUFHLEVBQUUsTUFBSSxNQUFLLEtBQUcsUUFBTSxHQUFFLElBQUcsRUFBRSxNQUFLO0lBQUMsS0FBSSxFQUFFLE9BQUssSUFBRSxNQUFJLEtBQUksS0FBRyxLQUFHLEVBQUUsWUFBVSxFQUFFLGNBQWEsSUFBRSxFQUFFO0lBQVksRUFBRSxFQUFFLFFBQVEsQ0FBQyxLQUFHLE1BQUssRUFBRSxNQUFJO0dBQUMsT0FBSztJQUFDLEtBQUksSUFBRSxFQUFFLFFBQU8sTUFBSyxFQUFFLEVBQUUsRUFBRTtJQUFFLElBQUUsQ0FBQztHQUFDO1FBQU0sRUFBRSxNQUFJLEVBQUUsS0FBSSxFQUFFLE1BQUksRUFBRSxLQUFJLEVBQUUsUUFBTUssSUFBRSxDQUFDO0dBQUUsSUFBRSxJQUFJLEdBQUUsR0FBRSxDQUFDO0VBQUM7T0FBTSxRQUFNLEtBQUcsRUFBRSxPQUFLLEVBQUUsT0FBSyxFQUFFLE1BQUksRUFBRSxLQUFJLEVBQUUsTUFBSSxFQUFFLE9BQUssSUFBRSxFQUFFLE1BQUksRUFBRSxFQUFFLEtBQUksR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0VBQUUsUUFBTyxJQUFFbkIsSUFBRSxXQUFTLEVBQUUsQ0FBQyxHQUFFLE1BQUksRUFBRSxNQUFJLEtBQUssSUFBRTtDQUFDO0NBQUMsU0FBU21CLElBQUUsR0FBRTtFQUFDLE1BQUksRUFBRSxRQUFNLEVBQUUsSUFBSSxNQUFJLENBQUMsSUFBRyxFQUFFLE9BQUssRUFBRSxJQUFJLEtBQUtBLEdBQUM7Q0FBRTtDQUFDLFNBQVMsRUFBRSxHQUFFLEdBQUUsR0FBRTtFQUFDLEtBQUksSUFBSSxJQUFFLEdBQUUsSUFBRSxFQUFFLFFBQU8sS0FBSSxFQUFFLEVBQUUsSUFBRyxFQUFFLEVBQUUsSUFBRyxFQUFFLEVBQUUsRUFBRTtFQUFFLElBQUUsT0FBS25CLElBQUUsSUFBSSxHQUFFLENBQUMsR0FBRSxFQUFFLEtBQUssU0FBUyxHQUFFO0dBQUMsSUFBRztJQUFDLElBQUUsRUFBRSxL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RUFBRTtHQUFFLEtBQUcsY0FBWSxNQUFJLElBQUUsU0FBUSxjQUFZLEtBQUcsUUFBTSxJQUFFLEVBQUUsZ0JBQWdCLE9BQU8sSUFBRSxRQUFNLE1BQUksTUFBSSxFQUFFLE1BQUksY0FBWSxLQUFHLENBQUMsS0FBRyxZQUFVLEtBQUcsS0FBRyxFQUFFLE9BQUssRUFBRSxHQUFFLEdBQUUsR0FBRSxFQUFFLElBQUcsQ0FBQyxHQUFFLElBQUUsV0FBVSxRQUFNLEtBQUcsS0FBRyxFQUFFLE1BQUksRUFBRSxHQUFFLEdBQUUsR0FBRSxFQUFFLElBQUcsQ0FBQztFQUFFO0VBQUMsT0FBTztDQUFDO0NBQUMsU0FBUyxFQUFFLEdBQUUsR0FBRSxHQUFFO0VBQUMsSUFBRztHQUFDLElBQUcsY0FBWSxPQUFPLEdBQUU7SUFBQyxJQUFJLElBQUUsY0FBWSxPQUFPLEVBQUU7SUFBSSxLQUFHLEVBQUUsSUFBSSxHQUFFLEtBQUcsUUFBTSxNQUFJLEVBQUUsTUFBSSxFQUFFLENBQUM7R0FBRSxPQUFNLEVBQUUsVUFBUTtFQUFDLFNBQU8sR0FBRTtHQUFDLElBQUUsSUFBSSxHQUFFLENBQUM7RUFBQztDQUFDO0NBQUMsU0FBUyxFQUFFLEdBQUUsR0FBRSxHQUFFO0VBQUMsSUFBSSxHQUFFO0VBQUUsSUFBR0EsSUFBRSxXQUFTQSxJQUFFLFFBQVEsQ0FBQyxJQUFHLElBQUUsRUFBRSxTQUFPLEVBQUUsV0FBUyxFQUFFLFdBQVMsRUFBRSxPQUFLLEVBQUUsR0FBRSxNQUFLLENBQUMsSUFBRyxTQUFPLElBQUUsRUFBRSxNQUFLO0dBQUMsSUFBRyxFQUFFLHNCQUFxQixJQUFHO0lBQUMsRUFBRSxxQkFBcUI7R0FBQyxTQUFPLEdBQUU7SUFBQyxJQUFFLElBQUksR0FBRSxDQUFDO0dBQUM7R0FBQyxFQUFFLE9BQUssRUFBRSxNQUFJO0VBQUk7RUFBQyxJQUFHLElBQUUsRUFBRSxLQUFJLEtBQUksSUFBRSxHQUFFLElBQUUsRUFBRSxRQUFPLEtBQUksRUFBRSxNQUFJLEVBQUUsRUFBRSxJQUFHLEdBQUUsS0FBRyxjQUFZLE9B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QUFzRixPQUFPLE1BQUksSUFBRSxFQUFFQSxJQUFFLENBQUMsR0FBRSxDQUFDLEdBQUUsS0FBSyxLQUFLLElBQUcsS0FBR0EsSUFBRSxHQUFFLENBQUMsR0FBRSxRQUFNLEtBQUcsS0FBSyxRQUFNLEtBQUcsS0FBSyxJQUFJLEtBQUssQ0FBQyxHQUFFLEVBQUUsSUFBSTtDQUFFLEdBQUUsRUFBRSxVQUFVLGNBQVksU0FBUyxHQUFFO0VBQUMsS0FBSyxRQUFNLEtBQUssTUFBSSxDQUFDLEdBQUUsS0FBRyxLQUFLLElBQUksS0FBSyxDQUFDLEdBQUUsRUFBRSxJQUFJO0NBQUUsR0FBRSxFQUFFLFVBQVUsU0FBTyxHQUFFLE1BQUUsQ0FBQyxHQUFFLE1BQUUsY0FBWSxPQUFPLFVBQVEsUUFBUSxVQUFVLEtBQUssS0FBSyxRQUFRLFFBQVEsQ0FBQyxJQUFFLFlBQVcsTUFBRSxTQUFTLEdBQUUsR0FBRTtFQUFDLE9BQU8sRUFBRSxJQUFJLE1BQUksRUFBRSxJQUFJO0NBQUcsR0FBRSxFQUFFLE1BQUksR0FBRSxNQUFFLEtBQUssT0FBTyxFQUFFLFNBQVMsQ0FBQyxHQUFFLE1BQUUsUUFBTVAsS0FBRSxNQUFFLFFBQU1BLEtBQUUsTUFBRSwrQkFBOEIsSUFBRSxHQUFFLE1BQUUsRUFBRSxDQUFDLENBQUMsR0FBRSxNQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUUsSUFBRTs7O0NDQTNtVyxJQUFJLEdBQUUsR0FBRWEsS0FBRUMsS0FBRUMsTUFBRSxHQUFFQyxNQUFFLENBQUMsR0FBRSxJQUFFQyxLQUFFLElBQUUsRUFBRSxLQUFJLElBQUUsRUFBRSxLQUFJLElBQUUsRUFBRSxRQUFPLElBQUUsRUFBRSxLQUFJLElBQUUsRUFBRSxTQUFRLElBQUUsRUFBRTtDQUFHLFNBQVMsRUFBRSxHQUFFLEdBQUU7RUFBQyxFQUFFLE9BQUssRUFBRSxJQUFJLEdBQUUsR0FBRUYsT0FBRyxDQUFDLEdBQUUsTUFBRTtFQUFFLElBQUksSUFBRSxFQUFFLFFBQU0sRUFBRSxNQUFJO0dBQUMsSUFBRyxDQUFDO0dBQUUsS0FBSSxDQUFDO0VBQUM7RUFBRyxPQUFPLEtBQUcsRUFBRSxHQUFHLFVBQVEsRUFBRSxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUUsRUFBRSxHQUFHO0NBQUU7Q0FBeXlDLFNBQVMsRUFBRSxHQUFFO0VBQUMsSUFBSSxJQUFFLEVBQUUsUUFBUSxFQUFFLE1BQUssSUFBRSxFQUFFLEtBQUksQ0FBQztFQUFFLE9BQU8sRUFBRSxJQUFFLEdBQUUsS0FBUyxFQUFFLE9BQUssRUFBRSxLQUFHLENBQUMsR0FBRSxFQUFFLElBQUksQ0FBQyxJQUFHLEVBQUUsTUFBTSxTQUFPLEVBQUU7Q0FBRTtDQUE2WCxTQUFTLElBQUc7RUFBQyxLQUFJLElBQUksR0FBRSxJQUFFQyxJQUFFLE1BQU0sSUFBRztHQUFDLElBQUksSUFBRSxFQUFFO0dBQUksSUFBRyxFQUFFLE9BQUssR0FBRSxJQUFHO0lBQUMsRUFBRSxJQUFJLEtBQUssQ0FBQyxHQUFFLEVBQUUsSUFBSSxLQUFLLENBQUMsR0FBRSxFQUFFLE1BQUksQ0FBQztHQUFDLFNBQU8sR0FBRTtJQUFDLEVBQUUsTUFBSSxDQUFDLEdBQUUsRUFBRSxJQUFJLEdBQUUsRUFBRSxHQUFHO0dBQUM7RUFBQztDQUFDO0NBQUMsRUFBRSxNQUFJLFNBQVMsR0FBRTtFQUFDLElBQUUsTUFBSyxLQUFHLEVBQUUsQ0FBQztDQUFDLEdBQUUsRUFBRSxLQUFHLFNBQVMsR0FBRSxHQUFFO0VBQUMsS0FBRyxFQUFFLE9BQUssRUFBRSxJQUFJLFFBQU0sRUFBRSxNQUFJLEVBQUUsSUFBSSxNQUFLLEtBQUcsRUFBRSxHQUFFLENBQUM7Q0FBQyxHQUFFLEVBQUUsTUFBSSxTQUFTLEdBQUU7RUFBQyxLQUFHLEVBQUUsQ0FBQyxHQUFFLElBQUU7RUFBRSxJQUFJLEtBQUcsSUFBRSxFQUFFLEtBQUs7RUFBSSxNQUFJSCxRQUFJLEtBQUcsRUFBRSxNQUFJLENBQUMsR0FBRSxFQUFFLE1BQUksQ0FBQyxHQUFFLEVBQUUsR0FBRyxLQUFLLFNBQVMsR0FBRTtHQUFDLEVBQUUsUUFBTSxFQUFFLEtBQUcsRUFBRSxNQUFLLEVBQUUsSUFBRSxFQUFFLE1BQUksS0FBSztFQUFDLENBQUMsTUFBSSxFQUFFLElBQUksS0FBSyxDQUFDLEdBQUUsRUFBRSxJQUFJLEtBQUssQ0FBQyxHQUFFLEVBQUUsTUFBSSxDQUFDLEdBQUUsSUFBRSxLQUFJLE1BQUU7Q0FBQyxHQUFFLEVBQUUsU0FBTyxTQUFTLEdBQUU7RUFBQyxLQUFHLEVBQUUsQ0FBQztFQUFFLElBQUksSUFBRSxFQUFFO0VBQUksS0FBRyxFQUFFLFFBQU0sRUFBRSxJQUFJLElBQUksV0FBUyxNQUFJRyxJQUFFLEtBQUssQ0FBQyxLQUFHRixRQUFJLEVBQUUsMkJBQXlCLE1BQUUsRUFBRSwwQkFBd0IsR0FBRyxDQUFDLElBQUcsRUFBRSxJQUFJLEdBQUcsS0FBSyxTQUFTLEdBQUU7R0FBQyxFQUFFLE1BQUksRUFBRSxNQUFJLEVBQUUsSUFBRyxFQUFFLElBQUUsS0FBSztFQUFDLENBQUMsSUFBRyxNQUFFLElBQUU7Q0FBSSxHQUFFLEVBQUUsTUFBSSxTQUFTLEdBQUUsR0FBRTtFQUFDLEVBQUUsS0FBSyxTQUFTLEdBQUU7R0FBQyxJQUFHO0lBQUMsRUFBRSxJQUFJLEtBQUssQ0FBQyxHQUFFLEVBQUUsTUFBSSxFQUFFLElBQUksT0FBTyxTQUFTLEdBQUU7S0FBQyxPQUFNLENBQUMsRUFBRSxNQUFJLEVBQUUsQ0FBQztJQUFDLENBQUM7R0FBQyxTQUFPLEdBQUU7SUFBQyxFQUFFLEtBQUssU0FBUyxHQUFFO0tBQUMsRUFBRSxRQUFNLEVBQUUsTUFBSSxDQUFDO0lBQUUsQ0FBQyxHQUFFLElBQUUsQ0FBQyxHQUFFLEVBQUUsSUFBSSxHQUFFLEVBQUUsR0FBRztHQUFDO0VBQUMsQ0FBQyxHQUFFLEtBQUcsRUFBRSxHQUFFLENBQUM7Q0FBQyxHQUFFLEVBQUUsVUFBUSxTQUFTLEdBQUU7RUFBQyxLQUFHLEVBQUUsQ0FBQztFQUFFLElBQUksR0FBRSxJQUFFLEVBQUU7RUFBSSxLQUFHLEVBQUUsUUFBTSxFQUFFLElBQUksR0FBRyxLQUFLLFNBQVMsR0FBRTtHQUFDLElBQUc7SUFBQyxFQUFFLENBQUM7R0FBQyxTQUFPLEdBQUU7SUFBQyxJQUFFO0dBQUM7RUFBQyxDQUFDLEdBQUUsRUFBRSxNQUFJLEtBQUssR0FBRSxLQUFHLEVBQUUsSUFBSSxHQUFFLEVBQUUsR0FBRztDQUFFO0NBQUUsSUFBSSxJQUFFLGNBQVksT0FBTztDQUFzQixTQUFTLEVBQUUsR0FBRTtFQUFDLElBQUksR0FBRSxJQUFFLFdBQVU7R0FBQyxhQUFhLENBQUMsR0FBRSxLQUFHLHFCQUFxQixDQUFDLEdBQUUsV0FBVyxDQUFDO0VBQUMsR0FBRSxJQUFFLFdBQVcsR0FBRSxFQUFFO0VBQUUsTUFBSSxJQUFFLHNCQUFzQixDQUFDO0NBQUU7Q0FBQyxTQUFTLEVBQUUsR0FBRTtFQUFDLElBQUksSUFBRSxHQUFFLElBQUUsRUFBRTtFQUFJLGNBQVksT0FBTyxNQUFJLEVBQUUsTUFBSSxLQUFLLEdBQUUsRUFBRSxJQUFHLElBQUU7Q0FBQztDQUFDLFNBQVMsRUFBRSxHQUFFO0VBQUMsSUFBSSxJQUFFO0VBQUUsRUFBRSxNQUFJLEVBQUUsR0FBRyxHQUFFLElBQUU7Q0FBQzs7O0NDQWo1RixJQUEwRSxJQUFFO0NBQUksTUFBTTtDQUFRLFNBQVMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtFQUFDLE1BQUksSUFBRSxDQUFDO0VBQUcsSUFBSSxHQUFFLEdBQUUsSUFBRTtFQUFFLElBQUcsU0FBUSxHQUFFLEtBQUksS0FBSyxJQUFFLENBQUMsR0FBRSxHQUFFLFNBQU8sSUFBRSxJQUFFLEVBQUUsS0FBRyxFQUFFLEtBQUcsRUFBRTtFQUFHLElBQUksSUFBRTtHQUFDLE1BQUs7R0FBRSxPQUFNO0dBQUUsS0FBSTtHQUFFLEtBQUk7R0FBRSxLQUFJO0dBQUssSUFBRztHQUFLLEtBQUk7R0FBRSxLQUFJO0dBQUssS0FBSTtHQUFLLGFBQVksS0FBSztHQUFFLEtBQUksRUFBRTtHQUFFLEtBQUk7R0FBRyxLQUFJO0dBQUUsVUFBUztHQUFFLFFBQU87RUFBQztFQUFFLElBQUcsY0FBWSxPQUFPLE1BQUksSUFB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