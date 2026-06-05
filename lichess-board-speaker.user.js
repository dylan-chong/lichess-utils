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
		if (!(s$3 > 1)) {
			var i, t = !1;
			(function() {
				var i = c$2;
				c$2 = void 0;
				while (void 0 !== i) {
					if (i.S.v === i.v) i.S.i = i.i;
					i = i.o;
				}
			})();
			while (void 0 !== h$2) {
				var n = h$2;
				h$2 = void 0;
				v$3++;
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
			v$3 = 0;
			s$3--;
			if (t) throw i;
		} else s$3--;
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
	var f$3, h$2 = void 0, s$3 = 0, v$3 = 0, e$2 = 0, c$2 = void 0, d$2 = 0;
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
	function l$3(i, t) {
		this.v = i;
		this.i = 0;
		this.n = void 0;
		this.t = void 0;
		this.l = 0;
		this.W = null == t ? void 0 : t.watched;
		this.Z = null == t ? void 0 : t.unwatched;
		this.name = null == t ? void 0 : t.name;
	}
	l$3.prototype.brand = i$3;
	l$3.prototype.h = function() {
		return !0;
	};
	l$3.prototype.S = function(i) {
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
	l$3.prototype.U = function(i) {
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
	l$3.prototype.subscribe = function(i) {
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
	l$3.prototype.valueOf = function() {
		return this.value;
	};
	l$3.prototype.toString = function() {
		return this.value + "";
	};
	l$3.prototype.toJSON = function() {
		return this.value;
	};
	l$3.prototype.peek = function() {
		var i = this;
		return o$3(function() {
			return i.value;
		});
	};
	Object.defineProperty(l$3.prototype, "value", {
		get: function() {
			var i = a$2(this);
			if (void 0 !== i) i.i = this.i;
			return this.v;
		},
		set: function(i) {
			if (i !== this.v) {
				if (v$3 > 100) throw new Error("Cycle detected");
				(function(i) {
					if (0 !== s$3 && 0 === v$3) {
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
				d$2++;
				s$3++;
				try {
					for (var n = this.t; void 0 !== n; n = n.x) n.t.N();
				} finally {
					t$2();
				}
			}
		}
	});
	function y$2(i, t) {
		return new l$3(i, t);
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
	function p$3(i, t) {
		l$3.call(this, void 0);
		this.x = i;
		this.s = void 0;
		this.g = d$2 - 1;
		this.f = 4;
		this.W = null == t ? void 0 : t.watched;
		this.Z = null == t ? void 0 : t.unwatched;
		this.name = null == t ? void 0 : t.name;
	}
	p$3.prototype = new l$3();
	p$3.prototype.h = function() {
		this.f &= -3;
		if (1 & this.f) return !1;
		if (32 == (36 & this.f)) return !0;
		this.f &= -5;
		if (this.g === d$2) return !0;
		this.g = d$2;
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
	p$3.prototype.S = function(i) {
		if (void 0 === this.t) {
			this.f |= 36;
			for (var t = this.s; void 0 !== t; t = t.n) t.S.S(t);
		}
		l$3.prototype.S.call(this, i);
	};
	p$3.prototype.U = function(i) {
		if (void 0 !== this.t) {
			l$3.prototype.U.call(this, i);
			if (void 0 === this.t) {
				this.f &= -33;
				for (var t = this.s; void 0 !== t; t = t.n) t.S.U(t);
			}
		}
	};
	p$3.prototype.N = function() {
		if (!(2 & this.f)) {
			this.f |= 6;
			for (var i = this.t; void 0 !== i; i = i.x) i.t.N();
		}
	};
	Object.defineProperty(p$3.prototype, "value", { get: function() {
		if (1 & this.f) throw new Error("Cycle detected");
		var i = a$2(this);
		this.h();
		if (void 0 !== i) i.i = this.i;
		if (16 & this.f) throw this.v;
		return this.v;
	} });
	function g$1(i, t) {
		return new p$3(i, t);
	}
	function S$1(i) {
		var n = i.m;
		i.m = void 0;
		if ("function" == typeof n) {
			s$3++;
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
		s$3++;
		var i = r$2;
		r$2 = this;
		return x$2.bind(this, i);
	};
	E$1.prototype.N = function() {
		if (!(2 & this.f)) {
			this.f |= 2;
			this.u = h$2;
			h$2 = this;
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
			speakRate: y$2(defaultSettings.speakRate),
			piecesListEnabled: y$2(defaultSettings.piecesListEnabled),
			dividersEnabled: y$2(defaultSettings.dividersEnabled),
			customBoardEnabled: y$2(defaultSettings.customBoardEnabled),
			obfuscationsEnabled: y$2(defaultSettings.obfuscationsEnabled),
			parallax: y$2(defaultSettings.parallax),
			hoverMode: y$2(defaultSettings.hoverMode),
			pieceStyle: y$2(defaultSettings.pieceStyle),
			blur: y$2(defaultSettings.blur),
			blackSegments: y$2(defaultSettings.blackSegments),
			blackSegmentsTiming: y$2(defaultSettings.blackSegmentsTiming),
			flashModeEnabled: y$2(defaultSettings.flashModeEnabled),
			flashDuration: y$2(defaultSettings.flashDuration),
			flashInterval: y$2(defaultSettings.flashInterval)
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
	var n, l$2, u$2, t$1, i$2, r$1, o$2, e$1, f$2, c$1, a$1, s$2, h$1, p$2, v$2, y$1, d$1 = {}, w$1 = [], _ = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, g = Array.isArray;
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
		return null == o && null != l$2.vnode && l$2.vnode(e), e;
	}
	function S(n) {
		return n.children;
	}
	function C$1(n, l) {
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
			o.__v = u.__v + 1, l$2.vnode && l$2.vnode(o), q(n.__P, o, u, n.__n, n.__P.namespaceURI, 32 & u.__u ? [t] : null, i, null == t ? $(u) : t, !!(32 & u.__u), r), o.__v = u.__v, o.__.__k[o.__i] = o, D(i, o, r), u.__e = u.__ = null, o.__e != t && P(o);
		}
	}
	function P(n) {
		if (null != (n = n.__) && null != n.__c) return n.__e = n.__c.base = null, n.__k.some(function(l) {
			if (null != l && null != l.__e) return n.__e = n.__c.base = l.__e;
		}), P(n);
	}
	function A(n) {
		(!n.__d && (n.__d = !0) && i$2.push(n) && !H.__r++ || r$1 != l$2.debounceRendering) && ((r$1 = l$2.debounceRendering) || o$2)(H);
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
		for (f = T$1(u, l, m, f, b), s = 0; s < b; s++) null != (p = u.__k[s]) && (h = -1 != p.__i && m[p.__i] || d$1, p.__i = s, _ = q(n, p, h, i, r, o, e, f, c, a), v = p.__e, p.ref && h.ref != p.ref && (h.ref && J(h.ref, null, p), a.push(p.ref, p.__c || v, p)), null == y && null != v && (y = v), (g = !!(4 & p.__u)) || h.__k === p.__k ? (f = j$1(p, f, n, g), g && h.__e && (h.__e = null)) : "function" == typeof p.type && void 0 !== _ ? f = _ : v && (f = v.nextSibling), p.__u &= -7);
		return u.__e = y, f;
	}
	function T$1(n, l, u, t, i) {
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
		else if ("o" == l[0] && "n" == l[1]) r = l != (l = l.replace(s$2, "$1")), o = l.toLowerCase(), l = o in n || "onFocusOut" == l || "onFocusIn" == l ? o.slice(2) : l.slice(2), n.l || (n.l = {}), n.l[l + r] = u, u ? t ? u[a$1] = t[a$1] : (u[a$1] = h$1, n.addEventListener(l, r ? v$2 : p$2, r)) : n.removeEventListener(l, r ? v$2 : p$2, r);
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
				if (null == u[c$1]) u[c$1] = h$1++;
				else if (u[c$1] < t[a$1]) return;
				return t(l$2.event ? l$2.event(u) : u);
			}
		};
	}
	function q(n, u, t, i, r, o, e, f, c, a) {
		var s, h, p, v, y, d, _, k, x, M, $, I, P, A, H, T = u.type;
		if (void 0 !== u.constructor) return null;
		128 & t.__u && (c = !!(32 & t.__u), o = [f = u.__e = t.__e]), (s = l$2.__b) && s(u);
		n: if ("function" == typeof T) try {
			if (k = u.props, x = T.prototype && T.prototype.render, M = (s = T.contextType) && i[s.__c], $ = s ? M ? M.props.value : s.__ : i, t.__c ? _ = (h = u.__c = t.__c).__ = h.__E : (x ? u.__c = h = new T(k, $) : (u.__c = h = new C$1(k, $), h.constructor = T, h.render = Q), M && M.sub(h), h.state || (h.state = {}), h.__n = i, p = h.__d = !0, h.__h = [], h._sb = []), x && null == h.__s && (h.__s = h.state), x && null != T.getDerivedStateFromProps && (h.__s == h.state && (h.__s = m$1({}, h.__s)), m$1(h.__s, T.getDerivedStateFromProps(k, h.__s))), v = h.props, y = h.state, h.__v = u, p) x && null == T.getDerivedStateFromProps && null != h.componentWillMount && h.componentWillMount(), x && null != h.componentDidMount && h.__h.push(h.componentDidMount);
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
			if (h.context = $, h.props = k, h.__P = n, h.__e = !1, I = l$2.__r, P = 0, x) h.state = h.__s, h.__d = !1, I && I(u), s = h.render(h.props, h.state, h.context), w$1.push.apply(h.__h, h._sb), h._sb = [];
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
			l$2.__e(n, u, t);
		}
		else null == o && u.__v == t.__v ? (u.__k = t.__k, u.__e = t.__e) : f = u.__e = G(t.__e, u, t, i, r, o, e, c, a);
		return (s = l$2.diffed) && s(u), 128 & u.__u ? void 0 : f;
	}
	function B$1(n) {
		n && (n.__c && (n.__c.__e = !0), n.__k && n.__k.some(B$1));
	}
	function D(n, u, t) {
		for (var i = 0; i < t.length; i++) J(t[i], t[++i], t[++i]);
		l$2.__c && l$2.__c(u, n), n.some(function(u) {
			try {
				n = u.__h, u.__h = [], n.some(function(n) {
					n.call(u);
				});
			} catch (n) {
				l$2.__e(n, u.__v);
			}
		});
	}
	function E(n) {
		return "object" != typeof n || null == n || n.__b > 0 ? n : g(n) ? n.map(E) : void 0 !== n.constructor ? null : m$1({}, n);
	}
	function G(u, t, i, r, o, e, f, c, a) {
		var s, h, p, v, y, w, _, m = i.props || d$1, k = t.props, x = t.type;
		if ("svg" == x ? o = "http://www.w3.org/2000/svg" : "math" == x ? o = "http://www.w3.org/1998/Math/MathML" : o || (o = "http://www.w3.org/1999/xhtml"), null != e) {
			for (s = 0; s < e.length; s++) if ((y = e[s]) && "setAttribute" in y == !!x && (x ? y.localName == x : 3 == y.nodeType)) {
				u = y, e[s] = null;
				break;
			}
		}
		if (null == u) {
			if (null == x) return document.createTextNode(k);
			u = document.createElementNS(o, x, k.is && k), c && (l$2.__m && l$2.__m(t, e), c = !1), e = null;
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
			l$2.__e(n, t);
		}
	}
	function K(n, u, t) {
		var i, r;
		if (l$2.unmount && l$2.unmount(n), (i = n.ref) && (i.current && i.current != n.__e || J(i, null, u)), null != (i = n.__c)) {
			if (i.componentWillUnmount) try {
				i.componentWillUnmount();
			} catch (n) {
				l$2.__e(n, u);
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
		t == document && (t = document.documentElement), l$2.__ && l$2.__(u, t), o = (r = "function" == typeof i) ? null : i && i.__k || t.__k, e = [], f = [], q(t, u = (!r && i || t).__k = k$1(S, null, [u]), o || d$1, d$1, t.namespaceURI, !r && i ? [i] : o ? null : t.firstChild ? n.call(t.childNodes) : null, e, !r && i ? i : o ? o.__e : t.firstChild, r, f), D(e, u, f);
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
		return l.__c = "__cC" + y$1++, l.__ = n, l.Provider = l.__l = (l.Consumer = function(n, l) {
			return n.children(l);
		}).contextType = l, l;
	}
	n = w$1.slice, l$2 = { __e: function(n, l, u, t) {
		for (var i, r, o; l = l.__;) if ((i = l.__c) && !i.__) try {
			if ((r = i.constructor) && null != r.getDerivedStateFromError && (i.setState(r.getDerivedStateFromError(n)), o = i.__d), null != i.componentDidCatch && (i.componentDidCatch(n, t || {}), o = i.__d), o) return i.__E = i;
		} catch (l) {
			n = l;
		}
		throw n;
	} }, u$2 = 0, t$1 = function(n) {
		return null != n && void 0 === n.constructor;
	}, C$1.prototype.setState = function(n, l) {
		var u = null != this.__s && this.__s != this.state ? this.__s : this.__s = m$1({}, this.state);
		"function" == typeof n && (n = n(m$1({}, u), this.props)), n && m$1(u, n), null != n && this.__v && (l && this._sb.push(l), A(this));
	}, C$1.prototype.forceUpdate = function(n) {
		this.__v && (this.__e = !0, n && this.__h.push(n), A(this));
	}, C$1.prototype.render = S, i$2 = [], o$2 = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, e$1 = function(n, l) {
		return n.__v.__b - l.__v.__b;
	}, H.__r = 0, f$2 = Math.random().toString(8), c$1 = "__d" + f$2, a$1 = "__a" + f$2, s$2 = /(PointerCapture)$|Capture$/i, h$1 = 0, p$2 = V(!1), v$2 = V(!0), y$1 = 0;
	//#endregion
	//#region node_modules/preact/hooks/dist/hooks.module.js
	var t, r, u$1, i$1, o$1 = 0, f$1 = [], c = l$2, e = c.__b, a = c.__r, v$1 = c.diffed, l$1 = c.__c, m = c.unmount, s$1 = c.__;
	function p$1(n, t) {
		c.__h && c.__h(r, n, o$1 || t), o$1 = 0;
		var u = r.__H || (r.__H = {
			__: [],
			__h: []
		});
		return n >= u.__.length && u.__.push({}), u.__[n];
	}
	function y(n, u) {
		var i = p$1(t++, 3);
		!c.__s && C(i.__H, u) && (i.__ = n, i.u = u, r.__H.__h.push(i));
	}
	function T(n, r) {
		var u = p$1(t++, 7);
		return C(u.__H, r) && (u.__ = n(), u.__H = r, u.__h = n), u.__;
	}
	function x(n) {
		var u = r.context[n.__c], i = p$1(t++, 9);
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
		n && t.__k && t.__k.__m && (n.__m = t.__k.__m), s$1 && s$1(n, t);
	}, c.__r = function(n) {
		a && a(n), t = 0;
		var i = (r = n.__c).__H;
		i && (u$1 === r ? (i.__h = [], r.__h = [], i.__.some(function(n) {
			n.__N && (n.__ = n.__N), n.u = n.__N = void 0;
		})) : (i.__h.some(z), i.__h.some(B), i.__h = [], t = 0)), u$1 = r;
	}, c.diffed = function(n) {
		v$1 && v$1(n);
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
		}), l$1 && l$1(n, t);
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
	function C(n, t) {
		return !n || n.length !== t.length || t.some(function(t, r) {
			return t !== n[r];
		});
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
		return l$2.vnode && l$2.vnode(l), l;
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
		const handleClick = (e) => {
			e.preventDefault();
			e.stopPropagation();
			onClick();
		};
		return /* @__PURE__ */ u("button", {
			onClick: handleClick,
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
	//#region node_modules/@preact/signals/dist/signals.module.js
	var s;
	function l(i, n) {
		l$2[i] = n.bind(null, l$2[i] || function() {});
	}
	function d(i) {
		if (s) {
			var r = s;
			s = void 0;
			r();
		}
		s = i && i.S();
	}
	function h(i) {
		var r = this, f = i.data, o = useSignal(f);
		o.value = f;
		var e = T(function() {
			var i = r.__v;
			while (i = i.__) if (i.__c) {
				i.__c.__$f |= 4;
				break;
			}
			r.__$u.c = function() {
				var i, t = r.__$u.S(), f = e.value;
				t();
				if (t$1(f) || 3 !== (null == (i = r.base) ? void 0 : i.nodeType)) {
					r.__$f |= 1;
					r.setState({});
				} else r.base.data = f;
			};
			return g$1(function() {
				var i = o.value.value;
				return 0 === i ? 0 : !0 === i ? "" : i || "";
			});
		}, []);
		return e.value;
	}
	h.displayName = "_st";
	Object.defineProperties(l$3.prototype, {
		constructor: {
			configurable: !0,
			value: void 0
		},
		type: {
			configurable: !0,
			value: h
		},
		props: {
			configurable: !0,
			get: function() {
				return { data: this };
			}
		},
		__b: {
			configurable: !0,
			value: 1
		}
	});
	l("__b", function(i, r) {
		if ("string" == typeof r.type) {
			var n, t = r.props;
			for (var f in t) if ("children" !== f) {
				var o = t[f];
				if (o instanceof l$3) {
					if (!n) r.__np = n = {};
					n[f] = o;
					t[f] = o.peek();
				}
			}
		}
		i(r);
	});
	l("__r", function(i, r) {
		i(r);
		d();
		var n, t = r.__c;
		if (t) {
			t.__$f &= -2;
			if (void 0 === (n = t.__$u)) t.__$u = n = function(i) {
				var r;
				j$2(function() {
					r = this;
				});
				r.c = function() {
					t.__$f |= 1;
					t.setState({});
				};
				return r;
			}();
		}
		d(n);
	});
	l("__e", function(i, r, n, t) {
		d();
		i(r, n, t);
	});
	l("diffed", function(i, r) {
		d();
		var n;
		if ("string" == typeof r.type && (n = r.__e)) {
			var t = r.__np, f = r.props;
			if (t) {
				var o = n.U;
				if (o) for (var e in o) {
					var u = o[e];
					if (void 0 !== u && !(e in t)) {
						u.d();
						o[e] = void 0;
					}
				}
				else n.U = o = {};
				for (var a in t) {
					var c = o[a], s = t[a];
					if (void 0 === c) {
						c = p(n, a, s, f);
						o[a] = c;
					} else c.o(s, f);
				}
			}
		}
		i(r);
	});
	function p(i, r, n, t) {
		var f = r in i && void 0 === i.ownerSVGElement, o = y$2(n);
		return {
			o: function(i, r) {
				o.value = i;
				t = r;
			},
			d: j$2(function() {
				var n = o.value.value;
				if (t[r] !== n) {
					t[r] = n;
					if (f) i[r] = n;
					else if (n) i.setAttribute(r, n);
					else i.removeAttribute(r);
				}
			})
		};
	}
	l("unmount", function(i, r) {
		if ("string" == typeof r.type) {
			var n = r.__e;
			if (n) {
				var t = n.U;
				if (t) {
					n.U = void 0;
					for (var f in t) {
						var o = t[f];
						if (o) o.d();
					}
				}
			}
		} else {
			var e = r.__c;
			if (e) {
				var u = e.__$u;
				if (u) {
					e.__$u = void 0;
					u.d();
				}
			}
		}
		i(r);
	});
	l("__h", function(i, r, n, t) {
		if (t < 3 || 9 === t) r.__$f |= 2;
		i(r, n, t);
	});
	C$1.prototype.shouldComponentUpdate = function(i, r) {
		if (this.__R) return !0;
		var n = this.__$u, t = n && void 0 !== n.s;
		for (var f in r) return !0;
		if (this.__f || "boolean" == typeof this.u && !0 === this.u) {
			if (!(t || 2 & this.__$f || 4 & this.__$f)) return !0;
			if (1 & this.__$f) return !0;
		} else {
			if (!(t || 4 & this.__$f)) return !0;
			if (3 & this.__$f) return !0;
		}
		for (var o in i) if ("__source" !== o && i[o] !== this.props[o]) return !0;
		for (var e in this.props) if (!(e in i)) return !0;
		return !1;
	};
	function useSignal(i) {
		return T(function() {
			return y$2(i);
		}, []);
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
		const localValue = useSignal(setting.value);
		y(() => {
			return setting.subscribe((value) => {
				localValue.value = value;
			});
		}, [setting, localValue]);
		const handleClick = (e) => {
			e.preventDefault();
			e.stopPropagation();
			const newValue = options[(options.indexOf(setting.value) + 1) % options.length];
			console.log(`[SettingButton] ${label}: ${setting.value} -> ${newValue}`);
			setting.value = newValue;
		};
		return /* @__PURE__ */ u("button", {
			onClick: handleClick,
			type: "button",
			style: buttonStyle,
			children: [
				label,
				": ",
				localValue.value
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
		const boardChanged = y$2(0);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGljaGVzcy1ib2FyZC1zcGVha2VyLnVzZXIuanMiLCJuYW1lcyI6WyJpIiwidCIsInMiLCJjIiwiaCIsInciLCJyIiwibyIsImYiLCJ2IiwidSIsImUiLCJkIiwiYSIsImwiLCJqIiwieSIsIl8iLCJiIiwicCIsImciLCJTIiwibSIsIngiLCJFIiwibCIsInUiLCJ0IiwiaSIsInIiLCJvIiwiZSIsImYiLCJjIiwiYSIsInMiLCJoIiwicCIsInYiLCJ5IiwiZCIsInciLCJtIiwiayIsIngiLCJDIiwiVCIsImoiLCJ6IiwiQiIsInUiLCJpIiwibyIsImYiLCJuIiwidiIsImwiLCJzIiwicCIsInIiLCJyIiwidCIsIm4iLCJ1IiwiZSIsImEiLCJjIl0sInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL0BwcmVhY3Qvc2lnbmFscy1jb3JlL2Rpc3Qvc2lnbmFscy1jb3JlLm1vZHVsZS5qcyIsInNyYy9jb25zdGFudHMvZG9tLnRzIiwic3JjL3BsYXRmb3JtL2RvbS50cyIsInNyYy9wcmVzZW50YXRpb24vbm9uLXByZWFjdC1jb21wb25lbnRzL2RpdmlkZXJzLnRzIiwic3JjL2FwcGxpY2F0aW9uL2hhbmRsZXJzL3VwZGF0ZURpdmlkZXJzLnRzIiwic3JjL2FwcGxpY2F0aW9uL2VmZmVjdHMvb25EaXZpZGVycy50cyIsInNyYy9jb25zdGFudHMvY29tbWFuZHMudHMiLCJzcmMvY29uc3RhbnRzL2NoZXNzLnRzIiwic3JjL2RvbWFpbi9jaGVzcy9waWVjZUdyb3VwaW5nLnRzIiwic3JjL2RvbWFpbi9zcGVlY2gvc3BlZWNoVGV4dC50cyIsInNyYy9wbGF0Zm9ybS9zcGVlY2gvY29yZS50cyIsInNyYy9wbGF0Zm9ybS9zcGVlY2gvaW5kZXgudHMiLCJzcmMvZG9tYWluL2NoZXNzL2Nvb3JkaW5hdGVzLnRzIiwic3JjL2FwcGxpY2F0aW9uL3NlcnZpY2VzL2JvYXJkUmVhZGVyL2V4dHJhY3Rpb24udHMiLCJzcmMvYXBwbGljYXRpb24vc2VydmljZXMvYm9hcmRSZWFkZXIvcmVhZGVyLnRzIiwic3JjL2FwcGxpY2F0aW9uL2hhbmRsZXJzL2hhbmRsZVNwZWVjaENvbW1hbmQudHMiLCJzcmMvYXBwbGljYXRpb24vaW5wdXQva2V5Ym9hcmRJbnB1dC50cyIsInNyYy9wbGF0Zm9ybS9tdXRhdGlvbk9ic2VydmVyLnRzIiwic3JjL2FwcGxpY2F0aW9uL29ic2VydmVycy9vYnNlcnZlclN0YXRlLnRzIiwic3JjL2NvbnN0YW50cy9zZXR0aW5ncy50cyIsInNyYy9wbGF0Zm9ybS9zdG9yYWdlLnRzIiwic3JjL2FwcGxpY2F0aW9uL3NldHRpbmdzL3NldHRpbmdzU3RvcmUudHMiLCJub2RlX21vZHVsZXMvcHJlYWN0L2Rpc3QvcHJlYWN0Lm1vZHVsZS5qcyIsIm5vZGVfbW9kdWxlcy9wcmVhY3QvaG9va3MvZGlzdC9ob29rcy5tb2R1bGUuanMiLCJub2RlX21vZHVsZXMvcHJlYWN0L2pzeC1ydW50aW1lL2Rpc3QvanN4UnVudGltZS5tb2R1bGUuanMiLCJzcmMvcHJlc2VudGF0aW9uL2NvbnRleHRzL1NldHRpbmdzQ29udGV4dC50c3giLCJzcmMvY29uc3RhbnRzL29wdGlvbnMudHMiLCJzcmMvcHJlc2VudGF0aW9uL2NvbXBvbmVudHMvQWN0aW9uQnV0dG9uLnRzeCIsInNyYy9wcmVzZW50YXRpb24vY29tcG9uZW50cy9CdXR0b25Sb3cudHN4Iiwic3JjL3ByZXNlbnRhdGlvbi9jb21wb25lbnRzL0NvbmRpdGlvbmFsQ29udHJvbHMudHN4Iiwibm9kZV9tb2R1bGVzL0BwcmVhY3Qvc2lnbmFscy9kaXN0L3NpZ25hbHMubW9kdWxlLmpzIiwic3JjL3ByZXNlbnRhdGlvbi9jb21wb25lbnRzL1NldHRpbmdCdXR0b24udHN4Iiwic3JjL3ByZXNlbnRhdGlvbi9jb21wb25lbnRzL1NwZWVjaEJ1dHRvbnMudHN4Iiwic3JjL3ByZXNlbnRhdGlvbi9jb21wb25lbnRzL0NvbnRyb2xQYW5lbC50c3giLCJzcmMvcHJlc2VudGF0aW9uL2NvbXBvbmVudHMvcm9vdC50c3giLCJzcmMvcHJlc2VudGF0aW9uL25vbi1wcmVhY3QtY29tcG9uZW50cy9mbGFzaC50cyIsInNyYy9pbml0LnRzeCIsInNyYy9tYWluLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgaT1TeW1ib2wuZm9yKFwicHJlYWN0LXNpZ25hbHNcIik7ZnVuY3Rpb24gdCgpe2lmKCEocz4xKSl7dmFyIGksdD0hMTshZnVuY3Rpb24oKXt2YXIgaT1jO2M9dm9pZCAwO3doaWxlKHZvaWQgMCE9PWkpe2lmKGkuUy52PT09aS52KWkuUy5pPWkuaTtpPWkub319KCk7d2hpbGUodm9pZCAwIT09aCl7dmFyIG49aDtoPXZvaWQgMDt2Kys7d2hpbGUodm9pZCAwIT09bil7dmFyIHI9bi51O24udT12b2lkIDA7bi5mJj0tMztpZighKDgmbi5mKSYmdyhuKSl0cnl7bi5jKCl9Y2F0Y2gobil7aWYoIXQpe2k9bjt0PSEwfX1uPXJ9fXY9MDtzLS07aWYodCl0aHJvdyBpfWVsc2Ugcy0tfWZ1bmN0aW9uIG4oaSl7aWYocz4wKXJldHVybiBpKCk7ZT0rK3U7cysrO3RyeXtyZXR1cm4gaSgpfWZpbmFsbHl7dCgpfX12YXIgcj12b2lkIDA7ZnVuY3Rpb24gbyhpKXt2YXIgdD1yO3I9dm9pZCAwO3RyeXtyZXR1cm4gaSgpfWZpbmFsbHl7cj10fX12YXIgZixoPXZvaWQgMCxzPTAsdj0wLHU9MCxlPTAsYz12b2lkIDAsZD0wO2Z1bmN0aW9uIGEoaSl7aWYodm9pZCAwIT09cil7dmFyIHQ9aS5uO2lmKHZvaWQgMD09PXR8fHQudCE9PXIpe3Q9e2k6MCxTOmkscDpyLnMsbjp2b2lkIDAsdDpyLGU6dm9pZCAwLHg6dm9pZCAwLHI6dH07aWYodm9pZCAwIT09ci5zKXIucy5uPXQ7ci5zPXQ7aS5uPXQ7aWYoMzImci5mKWkuUyh0KTtyZXR1cm4gdH1lbHNlIGlmKC0xPT09dC5pKXt0Lmk9MDtpZih2b2lkIDAhPT10Lm4pe3Qubi5wPXQucDtpZih2b2lkIDAhPT10LnApdC5wLm49dC5uO3QucD1yLnM7dC5uPXZvaWQgMDtyLnMubj10O3Iucz10fXJldHVybiB0fX19ZnVuY3Rpb24gbChpLHQpe3RoaXMudj1pO3RoaXMuaT0wO3RoaXMubj12b2lkIDA7dGhpcy50PXZvaWQgMDt0aGlzLmw9MDt0aGlzLlc9bnVsbD09dD92b2lkIDA6dC53YXRjaGVkO3RoaXMuWj1udWxsPT10P3ZvaWQgMDp0LnVud2F0Y2hlZDt0aGlzLm5hbWU9bnVsbD09dD92b2lkIDA6dC5uYW1lfWwucHJvdG90eXBlLmJyYW5kPWk7bC5wcm90b3R5cGUuaD1mdW5jdGlvbigpe3JldHVybiEwfTtsLnByb3RvdHlwZS5TPWZ1bmN0aW9uKGkpe3ZhciB0PXRoaXMsbj10aGlzLnQ7aWYobiE9PWkmJnZvaWQgMD09PWkuZSl7aS54PW47dGhpcy50PWk7aWYodm9pZCAwIT09biluLmU9aTtlbHNlIG8oZnVuY3Rpb24oKXt2YXIgaTtudWxsPT0oaT10LlcpfHxpLmNhbGwodCl9KX19O2wucHJvdG90eXBlLlU9ZnVuY3Rpb24oaSl7dmFyIHQ9dGhpcztpZih2b2lkIDAhPT10aGlzLnQpe3ZhciBuPWkuZSxyPWkueDtpZih2b2lkIDAhPT1uKXtuLng9cjtpLmU9dm9pZCAwfWlmKHZvaWQgMCE9PXIpe3IuZT1uO2kueD12b2lkIDB9aWYoaT09PXRoaXMudCl7dGhpcy50PXI7aWYodm9pZCAwPT09cilvKGZ1bmN0aW9uKCl7dmFyIGk7bnVsbD09KGk9dC5aKXx8aS5jYWxsKHQpfSl9fX07bC5wcm90b3R5cGUuc3Vic2NyaWJlPWZ1bmN0aW9uKGkpe3ZhciB0PXRoaXM7cmV0dXJuIGooZnVuY3Rpb24oKXt2YXIgbj10LnZhbHVlLG89cjtyPXZvaWQgMDt0cnl7aShuKX1maW5hbGx5e3I9b319LHtuYW1lOlwic3ViXCJ9KX07bC5wcm90b3R5cGUudmFsdWVPZj1mdW5jdGlvbigpe3JldHVybiB0aGlzLnZhbHVlfTtsLnByb3RvdHlwZS50b1N0cmluZz1mdW5jdGlvbigpe3JldHVybiB0aGlzLnZhbHVlK1wiXCJ9O2wucHJvdG90eXBlLnRvSlNPTj1mdW5jdGlvbigpe3JldHVybiB0aGlzLnZhbHVlfTtsLnByb3RvdHlwZS5wZWVrPWZ1bmN0aW9uKCl7dmFyIGk9dGhpcztyZXR1cm4gbyhmdW5jdGlvbigpe3JldHVybiBpLnZhbHVlfSl9O09iamVjdC5kZWZpbmVQcm9wZXJ0eShsLnByb3RvdHlwZSxcInZhbHVlXCIse2dldDpmdW5jdGlvbigpe3ZhciBpPWEodGhpcyk7aWYodm9pZCAwIT09aSlpLmk9dGhpcy5pO3JldHVybiB0aGlzLnZ9LHNldDpmdW5jdGlvbihpKXtpZihpIT09dGhpcy52KXtpZih2PjEwMCl0aHJvdyBuZXcgRXJyb3IoXCJDeWNsZSBkZXRlY3RlZFwiKTshZnVuY3Rpb24oaSl7aWYoMCE9PXMmJjA9PT12KWlmKGkubCE9PWUpe2kubD1lO2M9e1M6aSx2OmkudixpOmkuaSxvOmN9fX0odGhpcyk7dGhpcy52PWk7dGhpcy5pKys7ZCsrO3MrKzt0cnl7Zm9yKHZhciBuPXRoaXMudDt2b2lkIDAhPT1uO249bi54KW4udC5OKCl9ZmluYWxseXt0KCl9fX19KTtmdW5jdGlvbiB5KGksdCl7cmV0dXJuIG5ldyBsKGksdCl9ZnVuY3Rpb24gdyhpKXtmb3IodmFyIHQ9aS5zO3ZvaWQgMCE9PXQ7dD10Lm4paWYodC5TLmkhPT10Lml8fCF0LlMuaCgpfHx0LlMuaSE9PXQuaSlyZXR1cm4hMDtyZXR1cm4hMX1mdW5jdGlvbiBfKGkpe2Zvcih2YXIgdD1pLnM7dm9pZCAwIT09dDt0PXQubil7dmFyIG49dC5TLm47aWYodm9pZCAwIT09bil0LnI9bjt0LlMubj10O3QuaT0tMTtpZih2b2lkIDA9PT10Lm4pe2kucz10O2JyZWFrfX19ZnVuY3Rpb24gYihpKXt2YXIgdD1pLnMsbj12b2lkIDA7d2hpbGUodm9pZCAwIT09dCl7dmFyIHI9dC5wO2lmKC0xPT09dC5pKXt0LlMuVSh0KTtpZih2b2lkIDAhPT1yKXIubj10Lm47aWYodm9pZCAwIT09dC5uKXQubi5wPXJ9ZWxzZSBuPXQ7dC5TLm49dC5yO2lmKHZvaWQgMCE9PXQucil0LnI9dm9pZCAwO3Q9cn1pLnM9bn1mdW5jdGlvbiBwKGksdCl7bC5jYWxsKHRoaXMsdm9pZCAwKTt0aGlzLng9aTt0aGlzLnM9dm9pZCAwO3RoaXMuZz1kLTE7dGhpcy5mPTQ7dGhpcy5XPW51bGw9PXQ/dm9pZCAwOnQud2F0Y2hlZDt0aGlzLlo9bnVsbD09dD92b2lkIDA6dC51bndhdGNoZWQ7dGhpcy5uYW1lPW51bGw9PXQ/dm9pZCAwOnQubmFtZX1wLnByb3RvdHlwZT1uZXcgbDtwLnByb3RvdHlwZS5oPWZ1bmN0aW9uKCl7dGhpcy5mJj0tMztpZigxJnRoaXMuZilyZXR1cm4hMTtpZigzMj09KDM2JnRoaXMuZikpcmV0dXJuITA7dGhpcy5mJj0tNTtpZih0aGlzLmc9PT1kKXJldHVybiEwO3RoaXMuZz1kO3RoaXMuZnw9MTtpZih0aGlzLmk+MCYmIXcodGhpcykpe3RoaXMuZiY9LTI7cmV0dXJuITB9dmFyIGk9cjt0cnl7Xyh0aGlzKTtyPXRoaXM7dmFyIHQ9dGhpcy54KCk7aWYoMTYmdGhpcy5mfHx0aGlzLnYhPT10fHwwPT09dGhpcy5pKXt0aGlzLnY9dDt0aGlzLmYmPS0xNzt0aGlzLmkrK319Y2F0Y2goaSl7dGhpcy52PWk7dGhpcy5mfD0xNjt0aGlzLmkrK31yPWk7Yih0aGlzKTt0aGlzLmYmPS0yO3JldHVybiEwfTtwLnByb3RvdHlwZS5TPWZ1bmN0aW9uKGkpe2lmKHZvaWQgMD09PXRoaXMudCl7dGhpcy5mfD0zNjtmb3IodmFyIHQ9dGhpcy5zO3ZvaWQgMCE9PXQ7dD10Lm4pdC5TLlModCl9bC5wcm90b3R5cGUuUy5jYWxsKHRoaXMsaSl9O3AucHJvdG90eXBlLlU9ZnVuY3Rpb24oaSl7aWYodm9pZCAwIT09dGhpcy50KXtsLnByb3RvdHlwZS5VLmNhbGwodGhpcyxpKTtpZih2b2lkIDA9PT10aGlzLnQpe3RoaXMuZiY9LTMzO2Zvcih2YXIgdD10aGlzLnM7dm9pZCAwIT09dDt0PXQubil0LlMuVSh0KX19fTtwLnByb3RvdHlwZS5OPWZ1bmN0aW9uKCl7aWYoISgyJnRoaXMuZikpe3RoaXMuZnw9Njtmb3IodmFyIGk9dGhpcy50O3ZvaWQgMCE9PWk7aT1pLngpaS50Lk4oKX19O09iamVjdC5kZWZpbmVQcm9wZXJ0eShwLnByb3RvdHlwZSxcInZhbHVlXCIse2dldDpmdW5jdGlvbigpe2lmKDEmdGhpcy5mKXRocm93IG5ldyBFcnJvcihcIkN5Y2xlIGRldGVjdGVkXCIpO3ZhciBpPWEodGhpcyk7dGhpcy5oKCk7aWYodm9pZCAwIT09aSlpLmk9dGhpcy5pO2lmKDE2JnRoaXMuZil0aHJvdyB0aGlzLnY7cmV0dXJuIHRoaXMudn19KTtmdW5jdGlvbiBnKGksdCl7cmV0dXJuIG5ldyBwKGksdCl9ZnVuY3Rpb24gUyhpKXt2YXIgbj1pLm07aS5tPXZvaWQgMDtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBuKXtzKys7dmFyIG89cjtyPXZvaWQgMDt0cnl7bigpfWNhdGNoKHQpe2kuZiY9LTI7aS5mfD04O20oaSk7dGhyb3cgdH1maW5hbGx5e3I9bzt0KCl9fX1mdW5jdGlvbiBtKGkpe2Zvcih2YXIgdD1pLnM7dm9pZCAwIT09dDt0PXQubil0LlMuVSh0KTtpLng9dm9pZCAwO2kucz12b2lkIDA7UyhpKX1mdW5jdGlvbiB4KGkpe2lmKHIhPT10aGlzKXRocm93IG5ldyBFcnJvcihcIk91dC1vZi1vcmRlciBlZmZlY3RcIik7Yih0aGlzKTtyPWk7dGhpcy5mJj0tMjtpZig4JnRoaXMuZiltKHRoaXMpO3QoKX1mdW5jdGlvbiBFKGksdCl7dGhpcy54PWk7dGhpcy5tPXZvaWQgMDt0aGlzLnM9dm9pZCAwO3RoaXMudT12b2lkIDA7dGhpcy5mPTMyO3RoaXMubmFtZT1udWxsPT10P3ZvaWQgMDp0Lm5hbWU7aWYoZilmLnB1c2godGhpcyl9RS5wcm90b3R5cGUuYz1mdW5jdGlvbigpe3ZhciBpPXRoaXMuUygpO3RyeXtpZig4JnRoaXMuZilyZXR1cm47aWYodm9pZCAwPT09dGhpcy54KXJldHVybjt2YXIgdD10aGlzLngoKTtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiB0KXRoaXMubT10fWZpbmFsbHl7aSgpfX07RS5wcm90b3R5cGUuUz1mdW5jdGlvbigpe2lmKDEmdGhpcy5mKXRocm93IG5ldyBFcnJvcihcIkN5Y2xlIGRldGVjdGVkXCIpO3RoaXMuZnw9MTt0aGlzLmYmPS05O1ModGhpcyk7Xyh0aGlzKTtzKys7dmFyIGk9cjtyPXRoaXM7cmV0dXJuIHguYmluZCh0aGlzLGkpfTtFLnByb3RvdHlwZS5OPWZ1bmN0aW9uKCl7aWYoISgyJnRoaXMuZikpe3RoaXMuZnw9Mjt0aGlzLnU9aDtoPXRoaXN9fTtFLnByb3RvdHlwZS5kPWZ1bmN0aW9uKCl7dGhpcy5mfD04O2lmKCEoMSZ0aGlzLmYpKW0odGhpcyl9O0UucHJvdG90eXBlLmRpc3Bvc2U9ZnVuY3Rpb24oKXt0aGlzLmQoKX07ZnVuY3Rpb24gaihpLHQpe3ZhciBuPW5ldyBFKGksdCk7dHJ5e24uYygpfWNhdGNoKGkpe24uZCgpO3Rocm93IGl9dmFyIHI9bi5kLmJpbmQobik7cltTeW1ib2wuZGlzcG9zZV09cjtyZXR1cm4gcn1mdW5jdGlvbiBDKGkpe3JldHVybiBmdW5jdGlvbigpe3ZhciB0PWFyZ3VtZW50cyxyPXRoaXM7cmV0dXJuIG4oZnVuY3Rpb24oKXtyZXR1cm4gbyhmdW5jdGlvbigpe3JldHVybiBpLmFwcGx5KHIsW10uc2xpY2UuY2FsbCh0KSl9KX0pfX1mdW5jdGlvbiBPKCl7dmFyIGk9ZjtmPVtdO3JldHVybiBmdW5jdGlvbigpe3ZhciB0PWY7aWYoZiYmaSlpPWkuY29uY2F0KGYpO2Y9aTtyZXR1cm4gdH19dmFyIGs9ZnVuY3Rpb24oaSl7Zm9yKHZhciB0IGluIGkpe3ZhciBuPWlbdF07aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgbilpW3RdPUMobik7ZWxzZSBpZihcIm9iamVjdFwiPT10eXBlb2YgbiYmbnVsbCE9PW4mJiEoXCJicmFuZFwiaW4gbikpayhuKX19O2Z1bmN0aW9uIFQoaSl7cmV0dXJuIGZ1bmN0aW9uKCl7dmFyIHQsbixyPU8oKTt0cnl7bj1pLmFwcGx5KHZvaWQgMCxbXS5zbGljZS5jYWxsKGFyZ3VtZW50cykpfWNhdGNoKGkpe2Y9dm9pZCAwO3Rocm93IGl9ZmluYWxseXt0PXIoKX1rKG4pO25bU3ltYm9sLmRpc3Bvc2VdPUMoZnVuY3Rpb24oKXtpZih0KWZvcih2YXIgaT0wO2k8dC5sZW5ndGg7aSsrKXRbaV0uZGlzcG9zZSgpO3Q9dm9pZCAwfSk7cmV0dXJuIG59fWV4cG9ydHtwIGFzIENvbXB1dGVkLEUgYXMgRWZmZWN0LGwgYXMgU2lnbmFsLEMgYXMgYWN0aW9uLG4gYXMgYmF0Y2gsZyBhcyBjb21wdXRlZCxUIGFzIGNyZWF0ZU1vZGVsLGogYXMgZWZmZWN0LHkgYXMgc2lnbmFsLG8gYXMgdW50cmFja2VkfTsvLyMgc291cmNlTWFwcGluZ1VSTD1zaWduYWxzLWNvcmUubW9kdWxlLmpzLm1hcFxuIiwiLy8gRE9NIHNlbGVjdG9ycyBlbnVtXG5leHBvcnQgZW51bSBEb21TZWxlY3RvciB7XG4gIEJPQVJEID0gJ2NnLWJvYXJkJyxcbiAgQk9BUkRfTk9fQ1VTVE9NID0gJ2NnLWJvYXJkOm5vdCgudXNlcnNjcmlwdC1jdXN0b20tYm9hcmQpJyxcbiAgQ09PUkRTID0gJ2Nvb3JkcycsXG4gIFBJRUNFID0gJ3BpZWNlJyxcbiAgQ09OVEFJTkVSID0gJ2NnLWNvbnRhaW5lcicsXG4gIEtFWUJPQVJEX01PVkUgPSAnLmtleWJvYXJkLW1vdmUnLFxuICBLRVlCT0FSRF9JTlBVVCA9ICcua2V5Ym9hcmQtbW92ZSBpbnB1dCcsXG59XG5cbi8vIENTUyBjbGFzc2VzIGVudW1cbmV4cG9ydCBlbnVtIENzc0NsYXNzIHtcbiAgQkxBQ0sgPSAnYmxhY2snLFxuICBVU0VSU0NSSVBUX0RJVklERVJTID0gJ3VzZXJzY3JpcHQtZGl2aWRlcnMnLFxuICBVU0VSU0NSSVBUX0RSQVdJTkdTID0gJ3VzZXJzY3JpcHQtZHJhd2luZ3MnLFxuICBVU0VSU0NSSVBUX0ZMQVNIID0gJ3VzZXJzY3JpcHQtZmxhc2gtb3ZlcmxheScsXG59XG5cbi8vIENTUyBkaXNwbGF5IHZhbHVlcyBlbnVtXG5leHBvcnQgZW51bSBDc3NEaXNwbGF5IHtcbiAgQkxPQ0sgPSAnYmxvY2snLFxuICBOT05FID0gJ25vbmUnLFxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZURpdigpOiBIVE1MRGl2RWxlbWVudCB7XG4gIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU3ZnRWxlbWVudCh0YWc6IHN0cmluZyk6IFNWR0VsZW1lbnQge1xuICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsIHRhZylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3I6IHN0cmluZyk6IEVsZW1lbnQgfCBudWxsIHtcbiAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBxdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yOiBzdHJpbmcpOiBOb2RlTGlzdE9mPEVsZW1lbnQ+IHtcbiAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBlbmRDaGlsZChwYXJlbnQ6IEVsZW1lbnQsIGNoaWxkOiBFbGVtZW50KTogdm9pZCB7XG4gIHBhcmVudC5hcHBlbmRDaGlsZChjaGlsZClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUVsZW1lbnQoZWxlbWVudDogRWxlbWVudCk6IHZvaWQge1xuICBlbGVtZW50LnJlbW92ZSgpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRCb3VuZGluZ0NsaWVudFJlY3QoZWxlbWVudDogRWxlbWVudCk6IERPTVJlY3Qge1xuICByZXR1cm4gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gd2FpdEZvckVsZW1lbnQoc2VsZWN0b3I6IHN0cmluZyk6IFByb21pc2U8RWxlbWVudD4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICBjb25zdCBlbGVtZW50ID0gcXVlcnlTZWxlY3RvcihzZWxlY3RvcilcbiAgICBpZiAoZWxlbWVudCkge1xuICAgICAgcmVzb2x2ZShlbGVtZW50KVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gcXVlcnlTZWxlY3RvcihzZWxlY3RvcilcbiAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgIG9ic2VydmVyLmRpc2Nvbm5lY3QoKVxuICAgICAgICByZXNvbHZlKGVsZW1lbnQpXG4gICAgICB9XG4gICAgfSlcblxuICAgIG9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuYm9keSwge1xuICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgc3VidHJlZTogdHJ1ZSxcbiAgICB9KVxuICB9KVxufVxuIiwiaW1wb3J0IHsgQ3NzQ2xhc3MsIENzc0Rpc3BsYXksIERvbVNlbGVjdG9yIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL2RvbSdcbmltcG9ydCB7IGFwcGVuZENoaWxkLCBjcmVhdGVTdmdFbGVtZW50LCBxdWVyeVNlbGVjdG9yIH0gZnJvbSAnLi4vLi4vcGxhdGZvcm0vZG9tJ1xuXG5leHBvcnQgaW50ZXJmYWNlIERpdmlkZXJzU3RhdGUge1xuICBzdmc6IFNWR1NWR0VsZW1lbnRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZURpdmlkZXJzKCk6IERpdmlkZXJzU3RhdGUge1xuICBjb25zdCBib2FyZCA9IHF1ZXJ5U2VsZWN0b3IoRG9tU2VsZWN0b3IuQk9BUkQpXG4gIGlmICghYm9hcmQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0JvYXJkIG5vdCBmb3VuZCcpXG4gIH1cblxuICBjb25zdCByZWN0ID0gYm9hcmQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgY29uc3Qgc2l6ZSA9IHJlY3Qud2lkdGhcblxuICBjb25zdCBzdmcgPSBjcmVhdGVTdmdFbGVtZW50KCdzdmcnKSBhcyBTVkdTVkdFbGVtZW50XG4gIHN2Zy5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgQ3NzQ2xhc3MuVVNFUlNDUklQVF9ESVZJREVSUylcbiAgc3ZnLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCBzaXplLnRvU3RyaW5nKCkpXG4gIHN2Zy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIHNpemUudG9TdHJpbmcoKSlcbiAgc3ZnLnN0eWxlLmNzc1RleHQgPSBgXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMDtcbiAgICBsZWZ0OiAwO1xuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIGBcblxuICAvLyBWZXJ0aWNhbCBsaW5lXG4gIGNvbnN0IHZMaW5lID0gY3JlYXRlU3ZnRWxlbWVudCgnbGluZScpXG4gIHZMaW5lLnNldEF0dHJpYnV0ZSgneDEnLCAoc2l6ZSAvIDIpLnRvU3RyaW5nKCkpXG4gIHZMaW5lLnNldEF0dHJpYnV0ZSgneTEnLCAnMCcpXG4gIHZMaW5lLnNldEF0dHJpYnV0ZSgneDInLCAoc2l6ZSAvIDIpLnRvU3RyaW5nKCkpXG4gIHZMaW5lLnNldEF0dHJpYnV0ZSgneTInLCBzaXplLnRvU3RyaW5nKCkpXG4gIHZMaW5lLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJywgJ3JlZCcpXG4gIHZMaW5lLnNldEF0dHJpYnV0ZSgnc3Ryb2tlLXdpZHRoJywgJzInKVxuXG4gIC8vIEhvcml6b250YWwgbGluZVxuICBjb25zdCBoTGluZSA9IGNyZWF0ZVN2Z0VsZW1lbnQoJ2xpbmUnKVxuICBoTGluZS5zZXRBdHRyaWJ1dGUoJ3gxJywgJzAnKVxuICBoTGluZS5zZXRBdHRyaWJ1dGUoJ3kxJywgKHNpemUgLyAyKS50b1N0cmluZygpKVxuICBoTGluZS5zZXRBdHRyaWJ1dGUoJ3gyJywgc2l6ZS50b1N0cmluZygpKVxuICBoTGluZS5zZXRBdHRyaWJ1dGUoJ3kyJywgKHNpemUgLyAyKS50b1N0cmluZygpKVxuICBoTGluZS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsICdyZWQnKVxuICBoTGluZS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS13aWR0aCcsICcyJylcblxuICBhcHBlbmRDaGlsZChzdmcsIHZMaW5lKVxuICBhcHBlbmRDaGlsZChzdmcsIGhMaW5lKVxuXG4gIGFwcGVuZENoaWxkKGJvYXJkLCBzdmcpXG5cbiAgcmV0dXJuIHsgc3ZnIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNob3dEaXZpZGVycyhzdGF0ZTogRGl2aWRlcnNTdGF0ZSk6IHZvaWQge1xuICBzdGF0ZS5zdmcuc3R5bGUuZGlzcGxheSA9IENzc0Rpc3BsYXkuQkxPQ0tcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhpZGVEaXZpZGVycyhzdGF0ZTogRGl2aWRlcnNTdGF0ZSk6IHZvaWQge1xuICBzdGF0ZS5zdmcuc3R5bGUuZGlzcGxheSA9IENzc0Rpc3BsYXkuTk9ORVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVzdHJveURpdmlkZXJzKHN0YXRlOiBEaXZpZGVyc1N0YXRlKTogdm9pZCB7XG4gIHN0YXRlLnN2Zy5yZW1vdmUoKVxufVxuIiwiaW1wb3J0IHtcbiAgdHlwZSBEaXZpZGVyc1N0YXRlLFxuICBoaWRlRGl2aWRlcnMsXG4gIHNob3dEaXZpZGVycyxcbn0gZnJvbSAnLi4vLi4vcHJlc2VudGF0aW9uL25vbi1wcmVhY3QtY29tcG9uZW50cy9kaXZpZGVycydcbmltcG9ydCB0eXBlIHsgU2V0dGluZ3NTdG9yZSB9IGZyb20gJy4uL3NldHRpbmdzL3NldHRpbmdzU3RvcmUnXG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVEaXZpZGVycyhzdGF0ZTogRGl2aWRlcnNTdGF0ZSwgc2V0dGluZ3M6IFNldHRpbmdzU3RvcmUpOiB2b2lkIHtcbiAgaWYgKHNldHRpbmdzLmRpdmlkZXJzRW5hYmxlZC52YWx1ZSkge1xuICAgIHNob3dEaXZpZGVycyhzdGF0ZSlcbiAgfSBlbHNlIHtcbiAgICBoaWRlRGl2aWRlcnMoc3RhdGUpXG4gIH1cbn1cbiIsImltcG9ydCB7IGVmZmVjdCB9IGZyb20gJ0BwcmVhY3Qvc2lnbmFscy1jb3JlJ1xuaW1wb3J0IHR5cGUgeyBEaXZpZGVyc1N0YXRlIH0gZnJvbSAnLi4vLi4vcHJlc2VudGF0aW9uL25vbi1wcmVhY3QtY29tcG9uZW50cy9kaXZpZGVycydcbmltcG9ydCB7IHVwZGF0ZURpdmlkZXJzIH0gZnJvbSAnLi4vaGFuZGxlcnMvdXBkYXRlRGl2aWRlcnMnXG5pbXBvcnQgdHlwZSB7IFNldHRpbmdzU3RvcmUgfSBmcm9tICcuLi9zZXR0aW5ncy9zZXR0aW5nc1N0b3JlJ1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBEaXZpZGVyc0VmZmVjdChzdGF0ZTogRGl2aWRlcnNTdGF0ZSwgc2V0dGluZ3M6IFNldHRpbmdzU3RvcmUpOiAoKSA9PiB2b2lkIHtcbiAgcmV0dXJuIGVmZmVjdCgoKSA9PiB7XG4gICAgc2V0dGluZ3MuZGl2aWRlcnNFbmFibGVkLnZhbHVlXG4gICAgdXBkYXRlRGl2aWRlcnMoc3RhdGUsIHNldHRpbmdzKVxuICB9KVxufVxuIiwiZXhwb3J0IGVudW0gS2V5Ym9hcmRDb21tYW5kIHtcbiAgUFdLID0gJ3B3aycsXG4gIFBXUSA9ICdwd3EnLFxuICBQQksgPSAncGJrJyxcbiAgUEJRID0gJ3BicScsXG4gIFBBID0gJ3BhJyxcbiAgUFdXID0gJ3B3dycsXG4gIFBCQiA9ICdwYmInLFxuICBQU1MgPSAncHNzJyxcbn1cblxuZXhwb3J0IGVudW0gU3BlZWNoQ29tbWFuZCB7XG4gIEFMTCA9ICdhbGwnLFxuICBXSElURSA9ICd3aGl0ZScsXG4gIEJMQUNLID0gJ2JsYWNrJyxcbiAgU1RPUCA9ICdzdG9wJyxcbiAgV0sgPSAnd2snLFxuICBXUSA9ICd3cScsXG4gIEJLID0gJ2JrJyxcbiAgQlEgPSAnYnEnLFxufVxuXG4vLyBLZXlib2FyZCB0byBzcGVlY2ggY29tbWFuZCBtYXBwaW5nXG5leHBvcnQgY29uc3QgS0VZQk9BUkRfQ09NTUFORF9NQVAgPSBuZXcgTWFwKFtcbiAgW0tleWJvYXJkQ29tbWFuZC5QV0ssIFNwZWVjaENvbW1hbmQuV0tdLFxuICBbS2V5Ym9hcmRDb21tYW5kLlBXUSwgU3BlZWNoQ29tbWFuZC5XUV0sXG4gIFtLZXlib2FyZENvbW1hbmQuUEJLLCBTcGVlY2hDb21tYW5kLkJLXSxcbiAgW0tleWJvYXJkQ29tbWFuZC5QQlEsIFNwZWVjaENvbW1hbmQuQlFdLFxuICBbS2V5Ym9hcmRDb21tYW5kLlBBLCBTcGVlY2hDb21tYW5kLkFMTF0sXG4gIFtLZXlib2FyZENvbW1hbmQuUFdXLCBTcGVlY2hDb21tYW5kLldISVRFXSxcbiAgW0tleWJvYXJkQ29tbWFuZC5QQkIsIFNwZWVjaENvbW1hbmQuQkxBQ0tdLFxuICBbS2V5Ym9hcmRDb21tYW5kLlBTUywgU3BlZWNoQ29tbWFuZC5TVE9QXSxcbl0gYXMgY29uc3QpXG4iLCJleHBvcnQgZW51bSBQbGF5ZXJDb2xvciB7XG4gIFdISVRFID0gJ3doaXRlJyxcbiAgQkxBQ0sgPSAnYmxhY2snLFxufVxuXG5leHBvcnQgZW51bSBQaWVjZVR5cGUge1xuICBQQVdOID0gJ3Bhd24nLFxuICBLTklHSFQgPSAna25pZ2h0JyxcbiAgQklTSE9QID0gJ2Jpc2hvcCcsXG4gIFJPT0sgPSAncm9vaycsXG4gIFFVRUVOID0gJ3F1ZWVuJyxcbiAgS0lORyA9ICdraW5nJyxcbn1cblxuZXhwb3J0IGVudW0gUXVhZHJhbnQge1xuICBXSElURV9LSU5HID0gJ3drJyxcbiAgV0hJVEVfUVVFRU4gPSAnd3EnLFxuICBCTEFDS19LSU5HID0gJ2JrJyxcbiAgQkxBQ0tfUVVFRU4gPSAnYnEnLFxufVxuXG4vLyBIZWxwZXIgYXJyYXlzIGZvciBpdGVyYXRpb25cbmV4cG9ydCBjb25zdCBQTEFZRVJfQ09MT1JfVkFMVUVTID0gT2JqZWN0LnZhbHVlcyhQbGF5ZXJDb2xvcilcbmV4cG9ydCBjb25zdCBQSUVDRV9UWVBFX1ZBTFVFUyA9IE9iamVjdC52YWx1ZXMoUGllY2VUeXBlKVxuZXhwb3J0IGNvbnN0IFFVQURSQU5UX1ZBTFVFUyA9IE9iamVjdC52YWx1ZXMoUXVhZHJhbnQpXG4iLCJpbXBvcnQgeyB0eXBlIFBpZWNlVHlwZSwgUGxheWVyQ29sb3IsIFF1YWRyYW50IH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL2NoZXNzJ1xuXG5leHBvcnQgaW50ZXJmYWNlIFBpZWNlUG9zaXRpb24ge1xuICBzcXVhcmU6IHN0cmluZ1xuICBjb2xvcjogUGxheWVyQ29sb3JcbiAgdHlwZTogUGllY2VUeXBlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaWx0ZXJRdWFkcmFudChwaWVjZXM6IFBpZWNlUG9zaXRpb25bXSwgcXVhZHJhbnQ6IFF1YWRyYW50KTogUGllY2VQb3NpdGlvbltdIHtcbiAgcmV0dXJuIHBpZWNlcy5maWx0ZXIoKHBpZWNlKSA9PiB7XG4gICAgLy8gVmFsaWRhdGUgc3F1YXJlIGZvcm1hdFxuICAgIGlmICghcGllY2Uuc3F1YXJlIHx8IHBpZWNlLnNxdWFyZS5sZW5ndGggPCAyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgc3F1YXJlIGZvcm1hdDogJHtwaWVjZS5zcXVhcmV9YClcbiAgICB9XG5cbiAgICBjb25zdCBmaWxlID0gcGllY2Uuc3F1YXJlWzBdXG4gICAgY29uc3QgcmFuayA9IE51bWJlci5wYXJzZUludChwaWVjZS5zcXVhcmVbMV0sIDEwKVxuXG4gICAgLy8gVmFsaWRhdGUgZmlsZSBhbmQgcmFua1xuICAgIGlmIChmaWxlIDwgJ2EnIHx8IGZpbGUgPiAnaCcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBmaWxlOiAke2ZpbGV9YClcbiAgICB9XG4gICAgaWYgKE51bWJlci5pc05hTihyYW5rKSB8fCByYW5rIDwgMSB8fCByYW5rID4gOCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHJhbms6ICR7cmFua31gKVxuICAgIH1cblxuICAgIC8vIERldGVybWluZSBmaWxlIHJhbmdlIChraW5nLXNpZGU6IGUtaCwgcXVlZW4tc2lkZTogYS1kKVxuICAgIGNvbnN0IGlzS2luZ1NpZGUgPSBmaWxlID49ICdlJ1xuXG4gICAgLy8gRGV0ZXJtaW5lIHJhbmsgcmFuZ2UgKHdoaXRlOiAxLTQsIGJsYWNrOiA1LTgpXG4gICAgY29uc3QgaXNXaGl0ZVJhbmtzID0gcmFuayA+PSAxICYmIHJhbmsgPD0gNFxuXG4gICAgLy8gTWF0Y2ggcXVhZHJhbnRcbiAgICBpZiAocXVhZHJhbnQgPT09IFF1YWRyYW50LldISVRFX0tJTkcpIHJldHVybiBpc0tpbmdTaWRlICYmIGlzV2hpdGVSYW5rc1xuICAgIGlmIChxdWFkcmFudCA9PT0gUXVhZHJhbnQuV0hJVEVfUVVFRU4pIHJldHVybiAhaXNLaW5nU2lkZSAmJiBpc1doaXRlUmFua3NcbiAgICBpZiAocXVhZHJhbnQgPT09IFF1YWRyYW50LkJMQUNLX0tJTkcpIHJldHVybiBpc0tpbmdTaWRlICYmICFpc1doaXRlUmFua3NcbiAgICBpZiAocXVhZHJhbnQgPT09IFF1YWRyYW50LkJMQUNLX1FVRUVOKSByZXR1cm4gIWlzS2luZ1NpZGUgJiYgIWlzV2hpdGVSYW5rc1xuXG4gICAgcmV0dXJuIGZhbHNlXG4gIH0pXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgR3JvdXBlZFBpZWNlcyB7XG4gIGNvbG9yOiBQbGF5ZXJDb2xvclxuICB0eXBlOiBzdHJpbmdcbiAgc3F1YXJlczogc3RyaW5nW11cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdyb3VwQnlDb2xvckFuZFR5cGUocGllY2VzOiBQaWVjZVBvc2l0aW9uW10pOiBHcm91cGVkUGllY2VzW10ge1xuICBjb25zdCBncm91cHMgPSBuZXcgTWFwPHN0cmluZywgR3JvdXBlZFBpZWNlcz4oKVxuXG4gIGZvciAoY29uc3QgcGllY2Ugb2YgcGllY2VzKSB7XG4gICAgLy8gVmFsaWRhdGUgcmVxdWlyZWQgcHJvcGVydGllc1xuICAgIGlmICghcGllY2Uuc3F1YXJlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BpZWNlIG1pc3Npbmcgc3F1YXJlIHByb3BlcnR5JylcbiAgICB9XG4gICAgaWYgKCFwaWVjZS5jb2xvcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQaWVjZSBtaXNzaW5nIGNvbG9yIHByb3BlcnR5JylcbiAgICB9XG4gICAgaWYgKCFwaWVjZS50eXBlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BpZWNlIG1pc3NpbmcgdHlwZSBwcm9wZXJ0eScpXG4gICAgfVxuXG4gICAgY29uc3Qga2V5ID0gYCR7cGllY2UuY29sb3J9LSR7cGllY2UudHlwZX1gXG5cbiAgICBpZiAoIWdyb3Vwcy5oYXMoa2V5KSkge1xuICAgICAgZ3JvdXBzLnNldChrZXksIHtcbiAgICAgICAgY29sb3I6IHBpZWNlLmNvbG9yLFxuICAgICAgICB0eXBlOiBwaWVjZS50eXBlLFxuICAgICAgICBzcXVhcmVzOiBbXSxcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZ3JvdXBzLmdldChrZXkpPy5zcXVhcmVzLnB1c2gocGllY2Uuc3F1YXJlKVxuICB9XG5cbiAgLy8gU29ydCBncm91cHMgYnkgY29sb3IgKHdoaXRlIGZpcnN0KSB0aGVuIHR5cGVcbiAgcmV0dXJuIEFycmF5LmZyb20oZ3JvdXBzLnZhbHVlcygpKS5zb3J0KChhLCBiKSA9PiB7XG4gICAgaWYgKGEuY29sb3IgIT09IGIuY29sb3IpIHtcbiAgICAgIHJldHVybiBhLmNvbG9yID09PSBQbGF5ZXJDb2xvci5XSElURSA/IC0xIDogMVxuICAgIH1cbiAgICByZXR1cm4gYS50eXBlLmxvY2FsZUNvbXBhcmUoYi50eXBlKVxuICB9KVxufVxuIiwiaW1wb3J0IHsgdHlwZSBQaWVjZVBvc2l0aW9uLCBncm91cEJ5Q29sb3JBbmRUeXBlIH0gZnJvbSAnLi4vY2hlc3MvcGllY2VHcm91cGluZydcblxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlUXVhZHJhbnRUZXh0KHBpZWNlczogUGllY2VQb3NpdGlvbltdKTogc3RyaW5nIHtcbiAgaWYgKHBpZWNlcy5sZW5ndGggPT09IDApIHJldHVybiAnJ1xuXG4gIGNvbnN0IGdyb3VwcyA9IGdyb3VwQnlDb2xvckFuZFR5cGUocGllY2VzKVxuICBjb25zdCBzZW50ZW5jZXM6IHN0cmluZ1tdID0gW11cblxuICBmb3IgKGNvbnN0IGdyb3VwIG9mIGdyb3Vwcykge1xuICAgIGNvbnN0IGNvbG9yTmFtZSA9IGdyb3VwLmNvbG9yXG4gICAgY29uc3QgdHlwZU5hbWUgPSBncm91cC5zcXVhcmVzLmxlbmd0aCA+IDEgPyBgJHtncm91cC50eXBlfXNgIDogZ3JvdXAudHlwZVxuXG4gICAgaWYgKGdyb3VwLnNxdWFyZXMubGVuZ3RoID4gMSkge1xuICAgICAgLy8gTXVsdGlwbGUgcGllY2VzOiBcIndoaXRlIHBhd25zIG9uIGEyLCBiMlwiXG4gICAgICBjb25zdCBzcXVhcmVzID0gZ3JvdXAuc3F1YXJlcy5qb2luKCcsICcpXG4gICAgICBzZW50ZW5jZXMucHVzaChgJHtjb2xvck5hbWV9ICR7dHlwZU5hbWV9IG9uICR7c3F1YXJlc31gKVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTaW5nbGUgcGllY2U6IFwiZTEgd2hpdGUga2luZ1wiXG4gICAgICBzZW50ZW5jZXMucHVzaChgJHtncm91cC5zcXVhcmVzWzBdfSAke2NvbG9yTmFtZX0gJHtncm91cC50eXBlfWApXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGAke3NlbnRlbmNlcy5qb2luKCcuICcpfS5gXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZUFsbFBpZWNlc1RleHQocGllY2VzOiBQaWVjZVBvc2l0aW9uW10pOiBzdHJpbmcge1xuICByZXR1cm4gZ2VuZXJhdGVRdWFkcmFudFRleHQocGllY2VzKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVDb2xvclRleHQocGllY2VzOiBQaWVjZVBvc2l0aW9uW10sIGNvbG9yOiAnd2hpdGUnIHwgJ2JsYWNrJyk6IHN0cmluZyB7XG4gIGNvbnN0IGZpbHRlcmVkID0gcGllY2VzLmZpbHRlcigocCkgPT4gcC5jb2xvciA9PT0gY29sb3IpXG4gIHJldHVybiBnZW5lcmF0ZVF1YWRyYW50VGV4dChmaWx0ZXJlZClcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBnZXRTcGVlY2hTeW50aGVzaXMoKTogU3BlZWNoU3ludGhlc2lzIHtcbiAgcmV0dXJuIHdpbmRvdy5zcGVlY2hTeW50aGVzaXNcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNwZWVjaFN5bnRoZXNpc1V0dGVyYW5jZSgpOiB0eXBlb2YgU3BlZWNoU3ludGhlc2lzVXR0ZXJhbmNlIHtcbiAgcmV0dXJuIFNwZWVjaFN5bnRoZXNpc1V0dGVyYW5jZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc3BlYWsoc3ludGhlc2lzOiBTcGVlY2hTeW50aGVzaXMsIHV0dGVyYW5jZTogU3BlZWNoU3ludGhlc2lzVXR0ZXJhbmNlKTogdm9pZCB7XG4gIHN5bnRoZXNpcy5zcGVhayh1dHRlcmFuY2UpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYW5jZWwoc3ludGhlc2lzOiBTcGVlY2hTeW50aGVzaXMpOiB2b2lkIHtcbiAgc3ludGhlc2lzLmNhbmNlbCgpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVVdHRlcmFuY2UoXG4gIFV0dGVyYW5jZUNsYXNzOiB0eXBlb2YgU3BlZWNoU3ludGhlc2lzVXR0ZXJhbmNlLFxuICB0ZXh0OiBzdHJpbmdcbik6IFNwZWVjaFN5bnRoZXNpc1V0dGVyYW5jZSB7XG4gIHJldHVybiBuZXcgVXR0ZXJhbmNlQ2xhc3ModGV4dClcbn1cbiIsImltcG9ydCAqIGFzIGNvcmUgZnJvbSAnLi9jb3JlJ1xuXG5leHBvcnQgZnVuY3Rpb24gc3BlYWtUZXh0KHRleHQ6IHN0cmluZywgcmF0ZTogbnVtYmVyKTogdm9pZCB7XG4gIGNvbnN0IHN5bnRoZXNpcyA9IGNvcmUuZ2V0U3BlZWNoU3ludGhlc2lzKClcbiAgY29uc3QgVXR0ZXJhbmNlQ2xhc3MgPSBjb3JlLmdldFNwZWVjaFN5bnRoZXNpc1V0dGVyYW5jZSgpXG4gIGNvbnN0IHV0dGVyYW5jZSA9IGNvcmUuY3JlYXRlVXR0ZXJhbmNlKFV0dGVyYW5jZUNsYXNzLCB0ZXh0KVxuICB1dHRlcmFuY2UucmF0ZSA9IHJhdGVcbiAgY29yZS5zcGVhayhzeW50aGVzaXMsIHV0dGVyYW5jZSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0b3BTcGVha2luZygpOiB2b2lkIHtcbiAgY29uc3Qgc3ludGhlc2lzID0gY29yZS5nZXRTcGVlY2hTeW50aGVzaXMoKVxuICBjb3JlLmNhbmNlbChzeW50aGVzaXMpXG59XG4iLCJpbXBvcnQgeyBQbGF5ZXJDb2xvciB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy9jaGVzcydcblxuZXhwb3J0IGludGVyZmFjZSBQaXhlbFBvc2l0aW9uIHtcbiAgeDogbnVtYmVyXG4gIHk6IG51bWJlclxufVxuXG5jb25zdCBGSUxFUyA9ICdhYmNkZWZnaCdcblxuZXhwb3J0IGZ1bmN0aW9uIHBpeGVsc1RvU3F1YXJlKFxuICBwb3NpdGlvbjogUGl4ZWxQb3NpdGlvbixcbiAgc3F1YXJlU2l6ZTogbnVtYmVyLFxuICBwbGF5ZXJDb2xvcjogUGxheWVyQ29sb3Jcbik6IHN0cmluZyB7XG4gIC8vIENvbnZlcnQgcGl4ZWxzIHRvIGdyaWQgaW5kaWNlcyAoMC03KVxuICAvLyBBZGp1c3QgZm9yIGNlbnRlci1iYXNlZCBjb29yZGluYXRlcyBiZWZvcmUgcm91bmRpbmdcbiAgbGV0IGNvbCA9IE1hdGgucm91bmQoKHBvc2l0aW9uLnggLSBzcXVhcmVTaXplIC8gMikgLyBzcXVhcmVTaXplKVxuICBsZXQgcm93ID0gTWF0aC5yb3VuZCgocG9zaXRpb24ueSAtIHNxdWFyZVNpemUgLyAyKSAvIHNxdWFyZVNpemUpXG5cbiAgLy8gQ2xhbXAgdG8gdmFsaWQgcmFuZ2VcbiAgY29sID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oNywgY29sKSlcbiAgcm93ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oNywgcm93KSlcblxuICAvLyBDb252ZXJ0IHRvIHJhbmsgYmFzZWQgb24gcGxheWVyIGNvbG9yXG4gIC8vIEZvciB3aGl0ZTogeT0wIGlzIHJhbmsgOCwgeSBpbmNyZWFzZXMgZ29pbmcgdG8gcmFuayAxXG4gIC8vIEZvciBibGFjazogeT0wIGlzIHJhbmsgMSwgeSBpbmNyZWFzZXMgZ29pbmcgdG8gcmFuayA4XG4gIGxldCByYW5rOiBudW1iZXJcbiAgbGV0IGZpbGU6IHN0cmluZ1xuXG4gIGlmIChwbGF5ZXJDb2xvciA9PT0gUGxheWVyQ29sb3IuV0hJVEUpIHtcbiAgICBmaWxlID0gRklMRVNbY29sXVxuICAgIHJhbmsgPSA4IC0gcm93XG4gIH0gZWxzZSB7XG4gICAgZmlsZSA9IEZJTEVTWzcgLSBjb2xdXG4gICAgcmFuayA9IHJvdyArIDFcbiAgfVxuXG4gIHJldHVybiBgJHtmaWxlfSR7cmFua31gXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzcXVhcmVUb1BpeGVscyhcbiAgc3F1YXJlOiBzdHJpbmcsXG4gIHNxdWFyZVNpemU6IG51bWJlcixcbiAgcGxheWVyQ29sb3I6IFBsYXllckNvbG9yXG4pOiBQaXhlbFBvc2l0aW9uIHtcbiAgLy8gVmFsaWRhdGUgc3F1YXJlIGZvcm1hdFxuICBpZiAoc3F1YXJlLmxlbmd0aCA8IDIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgc3F1YXJlIG5vdGF0aW9uOiAke3NxdWFyZX1gKVxuICB9XG5cbiAgLy8gUGFyc2Ugc3F1YXJlIG5vdGF0aW9uXG4gIGNvbnN0IGZpbGUgPSBzcXVhcmVbMF1cbiAgY29uc3QgcmFuayA9IE51bWJlci5wYXJzZUludChzcXVhcmVbMV0sIDEwKVxuXG4gIC8vIFZhbGlkYXRlIGZpbGUgYW5kIHJhbmtcbiAgY29uc3QgY29sID0gRklMRVMuaW5kZXhPZihmaWxlKVxuICBpZiAoY29sID09PSAtMSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBmaWxlOiAke2ZpbGV9YClcbiAgfVxuICBpZiAocmFuayA8IDEgfHwgcmFuayA+IDggfHwgTnVtYmVyLmlzTmFOKHJhbmspKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHJhbms6ICR7cmFua31gKVxuICB9XG5cbiAgLy8gQ2FsY3VsYXRlIHBpeGVsIHBvc2l0aW9uIGJhc2VkIG9uIHBsYXllciBjb2xvclxuICBsZXQgcGl4ZWxDb2w6IG51bWJlclxuICBsZXQgcGl4ZWxSb3c6IG51bWJlclxuXG4gIGlmIChwbGF5ZXJDb2xvciA9PT0gUGxheWVyQ29sb3IuV0hJVEUpIHtcbiAgICAvLyBGb3Igd2hpdGU6IGZpbGVzIGdvIGxlZnQtdG8tcmlnaHQgKGEtaCksIHJhbmtzIGdvIGJvdHRvbS10by10b3AgKDEtOClcbiAgICAvLyBTbyByYW5rIDEgaXMgYXQgYm90dG9tIChyb3cgNyksIHJhbmsgOCBpcyBhdCB0b3AgKHJvdyAwKVxuICAgIHBpeGVsQ29sID0gY29sXG4gICAgcGl4ZWxSb3cgPSA4IC0gcmFua1xuICB9IGVsc2Uge1xuICAgIC8vIEZvciBibGFjazogZmlsZXMgZ28gcmlnaHQtdG8tbGVmdCAoaC1hKSwgcmFua3MgZ28gdG9wLXRvLWJvdHRvbSAoOC0xKVxuICAgIC8vIFNvIHJhbmsgOCBpcyBhdCB0b3AgKHJvdyAwKSwgcmFuayAxIGlzIGF0IGJvdHRvbSAocm93IDcpXG4gICAgcGl4ZWxDb2wgPSA3IC0gY29sXG4gICAgcGl4ZWxSb3cgPSByYW5rIC0gMVxuICB9XG5cbiAgLy8gQ29udmVydCB0byBwaXhlbHMgKGNlbnRlciBvZiBzcXVhcmUpXG4gIHJldHVybiB7XG4gICAgeDogcGl4ZWxDb2wgKiBzcXVhcmVTaXplICsgc3F1YXJlU2l6ZSAvIDIsXG4gICAgeTogcGl4ZWxSb3cgKiBzcXVhcmVTaXplICsgc3F1YXJlU2l6ZSAvIDIsXG4gIH1cbn1cbiIsImltcG9ydCB7IGdldEJvdW5kaW5nQ2xpZW50UmVjdCB9IGZyb20gJy4uLy4uLy4uL3BsYXRmb3JtL2RvbSdcblxuZXhwb3J0IGludGVyZmFjZSBSYXdQaWVjZURhdGEge1xuICBjb2xvcjogc3RyaW5nXG4gIHR5cGU6IHN0cmluZ1xuICB4OiBudW1iZXJcbiAgeTogbnVtYmVyXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQm9hcmRNZXRyaWNzIHtcbiAgYm9hcmRXaWR0aDogbnVtYmVyXG4gIHNxdWFyZVNpemU6IG51bWJlclxufVxuXG5leHBvcnQgZnVuY3Rpb24gZXh0cmFjdEJvYXJkTWV0cmljcyhib2FyZEVsZW1lbnQ6IEhUTUxFbGVtZW50KTogQm9hcmRNZXRyaWNzIHtcbiAgLy8gUGFyc2Ugd2lkdGggZnJvbSBzdHlsZSBhdHRyaWJ1dGUgc2luY2UgZ2V0Qm91bmRpbmdDbGllbnRSZWN0IG1heSBub3Qgd29yayBpbiB0ZXN0IGVudmlyb25tZW50c1xuICBjb25zdCB3aWR0aE1hdGNoID0gYm9hcmRFbGVtZW50LnN0eWxlLmNzc1RleHQubWF0Y2goL3dpZHRoOlxccyooWzAtOS5dKylweC8pXG4gIGNvbnN0IGJvYXJkV2lkdGggPSB3aWR0aE1hdGNoXG4gICAgPyBOdW1iZXIucGFyc2VGbG9hdCh3aWR0aE1hdGNoWzFdKVxuICAgIDogZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGJvYXJkRWxlbWVudCkud2lkdGhcbiAgY29uc3Qgc3F1YXJlU2l6ZSA9IGJvYXJkV2lkdGggLyA4XG5cbiAgcmV0dXJuIHsgYm9hcmRXaWR0aCwgc3F1YXJlU2l6ZSB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0UGllY2VEYXRhKHBpZWNlRWxlbWVudDogRWxlbWVudCwgc3F1YXJlU2l6ZTogbnVtYmVyKTogUmF3UGllY2VEYXRhIHwgbnVsbCB7XG4gIC8vIEV4dHJhY3QgY29sb3IgYW5kIHR5cGUgZnJvbSBjbGFzc1xuICBjb25zdCBjbGFzc2VzID0gcGllY2VFbGVtZW50LmNsYXNzTmFtZS5zcGxpdCgnICcpXG4gIGNvbnN0IGNvbG9yU3RyID0gY2xhc3Nlc1swXVxuICBjb25zdCB0eXBlU3RyID0gY2xhc3Nlc1sxXVxuXG4gIGlmICghY29sb3JTdHIgfHwgIXR5cGVTdHIpIHJldHVybiBudWxsXG5cbiAgLy8gRXh0cmFjdCBwb3NpdGlvbiBmcm9tIHRyYW5zZm9ybVxuICBjb25zdCB0cmFuc2Zvcm0gPSAocGllY2VFbGVtZW50IGFzIEhUTUxFbGVtZW50KS5zdHlsZS50cmFuc2Zvcm1cbiAgY29uc3QgbWF0Y2ggPSB0cmFuc2Zvcm0ubWF0Y2goL3RyYW5zbGF0ZVxcKChbMC05Ll0rKXB4LD9cXHMqKFswLTkuXSspcHg/XFwpLylcbiAgaWYgKCFtYXRjaCkgcmV0dXJuIG51bGxcblxuICAvLyBUcmFuc2Zvcm0gZ2l2ZXMgdG9wLWxlZnQgY29ybmVyLCBjb252ZXJ0IHRvIGNlbnRlclxuICBjb25zdCB4ID0gTnVtYmVyLnBhcnNlRmxvYXQobWF0Y2hbMV0pICsgc3F1YXJlU2l6ZSAvIDJcbiAgY29uc3QgeSA9IE51bWJlci5wYXJzZUZsb2F0KG1hdGNoWzJdKSArIHNxdWFyZVNpemUgLyAyXG5cbiAgcmV0dXJuIHtcbiAgICBjb2xvcjogY29sb3JTdHIsXG4gICAgdHlwZTogdHlwZVN0cixcbiAgICB4LFxuICAgIHksXG4gIH1cbn1cbiIsImltcG9ydCB7IHR5cGUgUGllY2VUeXBlLCBQbGF5ZXJDb2xvciB9IGZyb20gJy4uLy4uLy4uL2NvbnN0YW50cy9jaGVzcydcbmltcG9ydCB7IENzc0NsYXNzLCBEb21TZWxlY3RvciB9IGZyb20gJy4uLy4uLy4uL2NvbnN0YW50cy9kb20nXG5pbXBvcnQgeyBwaXhlbHNUb1NxdWFyZSB9IGZyb20gJy4uLy4uLy4uL2RvbWFpbi9jaGVzcy9jb29yZGluYXRlcydcbmltcG9ydCB0eXBlIHsgUGllY2VQb3NpdGlvbiB9IGZyb20gJy4uLy4uLy4uL2RvbWFpbi9jaGVzcy9waWVjZUdyb3VwaW5nJ1xuaW1wb3J0IHsgcXVlcnlTZWxlY3RvciB9IGZyb20gJy4uLy4uLy4uL3BsYXRmb3JtL2RvbSdcbmltcG9ydCB7IGV4dHJhY3RCb2FyZE1ldHJpY3MsIGV4dHJhY3RQaWVjZURhdGEgfSBmcm9tICcuL2V4dHJhY3Rpb24nXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQbGF5ZXJDb2xvcigpOiBQbGF5ZXJDb2xvciB7XG4gIGNvbnN0IGNvb3JkcyA9IHF1ZXJ5U2VsZWN0b3IoRG9tU2VsZWN0b3IuQ09PUkRTKVxuICByZXR1cm4gY29vcmRzPy5jbGFzc0xpc3QuY29udGFpbnMoQ3NzQ2xhc3MuQkxBQ0spID8gUGxheWVyQ29sb3IuQkxBQ0sgOiBQbGF5ZXJDb2xvci5XSElURVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVhZFBpZWNlUG9zaXRpb25zKCk6IFBpZWNlUG9zaXRpb25bXSB7XG4gIGNvbnN0IGJvYXJkID0gcXVlcnlTZWxlY3RvcihEb21TZWxlY3Rvci5CT0FSRF9OT19DVVNUT00pXG4gIGlmICghYm9hcmQpIHJldHVybiBbXVxuXG4gIGNvbnN0IHsgc3F1YXJlU2l6ZSB9ID0gZXh0cmFjdEJvYXJkTWV0cmljcyhib2FyZCBhcyBIVE1MRWxlbWVudClcbiAgY29uc3QgcGxheWVyQ29sb3IgPSBnZXRQbGF5ZXJDb2xvcigpXG5cbiAgY29uc3QgcGllY2VzID0gYm9hcmQucXVlcnlTZWxlY3RvckFsbChEb21TZWxlY3Rvci5QSUVDRSlcbiAgY29uc3QgcG9zaXRpb25zOiBQaWVjZVBvc2l0aW9uW10gPSBbXVxuXG4gIGZvciAoY29uc3QgcGllY2Ugb2YgcGllY2VzKSB7XG4gICAgY29uc3QgcmF3RGF0YSA9IGV4dHJhY3RQaWVjZURhdGEocGllY2UsIHNxdWFyZVNpemUpXG4gICAgaWYgKCFyYXdEYXRhKSBjb250aW51ZVxuXG4gICAgLy8gTWFwIHRvIGVudW1zXG4gICAgY29uc3QgY29sb3IgPSByYXdEYXRhLmNvbG9yID09PSAnd2hpdGUnID8gUGxheWVyQ29sb3IuV0hJVEUgOiBQbGF5ZXJDb2xvci5CTEFDS1xuICAgIGNvbnN0IHR5cGUgPSByYXdEYXRhLnR5cGUgYXMgUGllY2VUeXBlXG5cbiAgICBjb25zdCBzcXVhcmUgPSBwaXhlbHNUb1NxdWFyZSh7IHg6IHJhd0RhdGEueCwgeTogcmF3RGF0YS55IH0sIHNxdWFyZVNpemUsIHBsYXllckNvbG9yKVxuICAgIHBvc2l0aW9ucy5wdXNoKHsgc3F1YXJlLCBjb2xvciwgdHlwZSB9KVxuICB9XG5cbiAgcmV0dXJuIHBvc2l0aW9uc1xufVxuIiwiaW1wb3J0IHsgUGxheWVyQ29sb3IsIHR5cGUgUXVhZHJhbnQgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvY2hlc3MnXG5pbXBvcnQgeyBTcGVlY2hDb21tYW5kIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL2NvbW1hbmRzJ1xuaW1wb3J0IHsgZmlsdGVyUXVhZHJhbnQgfSBmcm9tICcuLi8uLi9kb21haW4vY2hlc3MvcGllY2VHcm91cGluZydcbmltcG9ydCB7XG4gIGdlbmVyYXRlQWxsUGllY2VzVGV4dCxcbiAgZ2VuZXJhdGVDb2xvclRleHQsXG4gIGdlbmVyYXRlUXVhZHJhbnRUZXh0LFxufSBmcm9tICcuLi8uLi9kb21haW4vc3BlZWNoL3NwZWVjaFRleHQnXG5pbXBvcnQgeyBzcGVha1RleHQsIHN0b3BTcGVha2luZyB9IGZyb20gJy4uLy4uL3BsYXRmb3JtL3NwZWVjaCdcbmltcG9ydCB7IHJlYWRQaWVjZVBvc2l0aW9ucyB9IGZyb20gJy4uL3NlcnZpY2VzL2JvYXJkUmVhZGVyL3JlYWRlcidcbmltcG9ydCB0eXBlIHsgU2V0dGluZ3NTdG9yZSB9IGZyb20gJy4uL3NldHRpbmdzL3NldHRpbmdzU3RvcmUnXG5cbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVTcGVlY2hDb21tYW5kKGNvbW1hbmQ6IHN0cmluZywgc2V0dGluZ3M6IFNldHRpbmdzU3RvcmUpOiB2b2lkIHtcbiAgaWYgKGNvbW1hbmQgPT09IFNwZWVjaENvbW1hbmQuU1RPUCkge1xuICAgIHN0b3BTcGVha2luZygpXG4gICAgcmV0dXJuXG4gIH1cblxuICBjb25zdCBwaWVjZXMgPSByZWFkUGllY2VQb3NpdGlvbnMoKVxuXG4gIGlmIChjb21tYW5kID09PSBTcGVlY2hDb21tYW5kLkFMTCkge1xuICAgIGNvbnN0IHRleHQgPSBnZW5lcmF0ZUFsbFBpZWNlc1RleHQocGllY2VzKVxuICAgIHNwZWFrVGV4dCh0ZXh0LCBzZXR0aW5ncy5zcGVha1JhdGUudmFsdWUpXG4gICAgcmV0dXJuXG4gIH1cblxuICBpZiAoY29tbWFuZCA9PT0gU3BlZWNoQ29tbWFuZC5XSElURSB8fCBjb21tYW5kID09PSBTcGVlY2hDb21tYW5kLkJMQUNLKSB7XG4gICAgY29uc3QgY29sb3IgPSBjb21tYW5kID09PSBTcGVlY2hDb21tYW5kLldISVRFID8gUGxheWVyQ29sb3IuV0hJVEUgOiBQbGF5ZXJDb2xvci5CTEFDS1xuICAgIGNvbnN0IHRleHQgPSBnZW5lcmF0ZUNvbG9yVGV4dChwaWVjZXMsIGNvbG9yKVxuICAgIHNwZWFrVGV4dCh0ZXh0LCBzZXR0aW5ncy5zcGVha1JhdGUudmFsdWUpXG4gICAgcmV0dXJuXG4gIH1cblxuICAvLyBRdWFkcmFudCBjb21tYW5kczogd2ssIHdxLCBiaywgYnFcbiAgY29uc3QgcXVhZHJhbnQgPSBjb21tYW5kIGFzIFF1YWRyYW50XG4gIGNvbnN0IGZpbHRlcmVkID0gZmlsdGVyUXVhZHJhbnQocGllY2VzLCBxdWFkcmFudClcbiAgY29uc3QgdGV4dCA9IGdlbmVyYXRlUXVhZHJhbnRUZXh0KGZpbHRlcmVkKVxuICBzcGVha1RleHQodGV4dCwgc2V0dGluZ3Muc3BlYWtSYXRlLnZhbHVlKVxufVxuIiwiaW1wb3J0IHsgS0VZQk9BUkRfQ09NTUFORF9NQVAsIHR5cGUgS2V5Ym9hcmRDb21tYW5kIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL2NvbW1hbmRzJ1xuaW1wb3J0IHsgRG9tU2VsZWN0b3IgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvZG9tJ1xuaW1wb3J0IHsgcXVlcnlTZWxlY3RvciB9IGZyb20gJy4uLy4uL3BsYXRmb3JtL2RvbSdcbmltcG9ydCB7IGhhbmRsZVNwZWVjaENvbW1hbmQgfSBmcm9tICcuLi9oYW5kbGVycy9oYW5kbGVTcGVlY2hDb21tYW5kJ1xuaW1wb3J0IHR5cGUgeyBTZXR0aW5nc1N0b3JlIH0gZnJvbSAnLi4vc2V0dGluZ3Mvc2V0dGluZ3NTdG9yZSdcblxuaW50ZXJmYWNlIElucHV0RWxlbWVudFdpdGhDbGVhbnVwIGV4dGVuZHMgSFRNTElucHV0RWxlbWVudCB7XG4gIF9fa2V5Ym9hcmRDb21tYW5kQ2xlYW51cD86ICgpID0+IHZvaWRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldHVwS2V5Ym9hcmRDb21tYW5kcyhzZXR0aW5nczogU2V0dGluZ3NTdG9yZSk6IHZvaWQge1xuICBjb25zdCBpbnB1dCA9IHF1ZXJ5U2VsZWN0b3IoRG9tU2VsZWN0b3IuS0VZQk9BUkRfSU5QVVQpIGFzIElucHV0RWxlbWVudFdpdGhDbGVhbnVwIHwgbnVsbFxuICBpZiAoIWlucHV0KSByZXR1cm5cblxuICBjb25zdCBoYW5kbGVJbnB1dCA9IChlOiBFdmVudCkgPT4ge1xuICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnRcbiAgICBjb25zdCB2YWx1ZSA9IHRhcmdldC52YWx1ZVxuXG4gICAgLy8gQ2hlY2sgZm9yIHNwZWVjaCBjb21tYW5kc1xuICAgIGNvbnN0IGNvbW1hbmQgPSBLRVlCT0FSRF9DT01NQU5EX01BUC5nZXQodmFsdWUgYXMgS2V5Ym9hcmRDb21tYW5kKVxuICAgIGlmIChjb21tYW5kKSB7XG4gICAgICBoYW5kbGVTcGVlY2hDb21tYW5kKGNvbW1hbmQsIHNldHRpbmdzKVxuICAgICAgdGFyZ2V0LnZhbHVlID0gJydcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIC8vIENoZWNrIGZvciBkcmF3aW5nIGNvbW1hbmRzIChoYW5kbGVkIGVsc2V3aGVyZSlcbiAgICBpZiAodmFsdWUuc3RhcnRzV2l0aCgnLScpKSB7XG4gICAgICAvLyBXaWxsIGJlIGhhbmRsZWQgYnkgZHJhd2luZyBoYW5kbGVyXG4gICAgICByZXR1cm5cbiAgICB9XG4gIH1cblxuICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGhhbmRsZUlucHV0KVxuXG4gIC8vIFN0b3JlIGNsZWFudXAgZnVuY3Rpb24gb24gdGhlIGVsZW1lbnQgZm9yIGxhdGVyIHJlbW92YWxcbiAgaW5wdXQuX19rZXlib2FyZENvbW1hbmRDbGVhbnVwID0gKCkgPT4ge1xuICAgIGlucHV0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2lucHV0JywgaGFuZGxlSW5wdXQpXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRlYXJkb3duS2V5Ym9hcmRDb21tYW5kcygpOiB2b2lkIHtcbiAgY29uc3QgaW5wdXQgPSBxdWVyeVNlbGVjdG9yKERvbVNlbGVjdG9yLktFWUJPQVJEX0lOUFVUKSBhcyBJbnB1dEVsZW1lbnRXaXRoQ2xlYW51cCB8IG51bGxcbiAgaWYgKGlucHV0Py5fX2tleWJvYXJkQ29tbWFuZENsZWFudXApIHtcbiAgICBpbnB1dC5fX2tleWJvYXJkQ29tbWFuZENsZWFudXAoKVxuICAgIGlucHV0Ll9fa2V5Ym9hcmRDb21tYW5kQ2xlYW51cCA9IHVuZGVmaW5lZFxuICB9XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gY3JlYXRlTXV0YXRpb25PYnNlcnZlcihjYWxsYmFjazogTXV0YXRpb25DYWxsYmFjayk6IE11dGF0aW9uT2JzZXJ2ZXIge1xuICByZXR1cm4gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoY2FsbGJhY2spXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvYnNlcnZlKFxuICBvYnNlcnZlcjogTXV0YXRpb25PYnNlcnZlcixcbiAgdGFyZ2V0OiBOb2RlLFxuICBvcHRpb25zOiBNdXRhdGlvbk9ic2VydmVySW5pdFxuKTogdm9pZCB7XG4gIG9ic2VydmVyLm9ic2VydmUodGFyZ2V0LCBvcHRpb25zKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGlzY29ubmVjdChvYnNlcnZlcjogTXV0YXRpb25PYnNlcnZlcik6IHZvaWQge1xuICBvYnNlcnZlci5kaXNjb25uZWN0KClcbn1cbiIsImltcG9ydCB0eXBlIHsgU2lnbmFsIH0gZnJvbSAnQHByZWFjdC9zaWduYWxzLWNvcmUnXG5pbXBvcnQgeyBEb21TZWxlY3RvciB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy9kb20nXG5pbXBvcnQgeyBxdWVyeVNlbGVjdG9yIH0gZnJvbSAnLi4vLi4vcGxhdGZvcm0vZG9tJ1xuaW1wb3J0IHsgY3JlYXRlTXV0YXRpb25PYnNlcnZlciwgZGlzY29ubmVjdCwgb2JzZXJ2ZSB9IGZyb20gJy4uLy4uL3BsYXRmb3JtL211dGF0aW9uT2JzZXJ2ZXInXG5cbmV4cG9ydCBpbnRlcmZhY2UgQm9hcmRPYnNlcnZlclN0YXRlIHtcbiAgb2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXJcbiAgYm9hcmRDaGFuZ2VkOiBTaWduYWw8bnVtYmVyPlxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQm9hcmRPYnNlcnZlcihib2FyZENoYW5nZWQ6IFNpZ25hbDxudW1iZXI+KTogQm9hcmRPYnNlcnZlclN0YXRlIHtcbiAgY29uc3Qgb2JzZXJ2ZXIgPSBjcmVhdGVNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICBib2FyZENoYW5nZWQudmFsdWUgKz0gMVxuICB9KVxuXG4gIHJldHVybiB7IG9ic2VydmVyLCBib2FyZENoYW5nZWQgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RhcnRCb2FyZE9ic2VydmVyKHN0YXRlOiBCb2FyZE9ic2VydmVyU3RhdGUpOiB2b2lkIHtcbiAgY29uc3QgYm9hcmQgPSBxdWVyeVNlbGVjdG9yKERvbVNlbGVjdG9yLkJPQVJEKVxuICBpZiAoIWJvYXJkKSByZXR1cm5cblxuICBvYnNlcnZlKHN0YXRlLm9ic2VydmVyLCBib2FyZCwge1xuICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICBhdHRyaWJ1dGVzOiB0cnVlLFxuICAgIHN1YnRyZWU6IHRydWUsXG4gIH0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdG9wQm9hcmRPYnNlcnZlcihzdGF0ZTogQm9hcmRPYnNlcnZlclN0YXRlKTogdm9pZCB7XG4gIGRpc2Nvbm5lY3Qoc3RhdGUub2JzZXJ2ZXIpXG59XG4iLCJleHBvcnQgaW50ZXJmYWNlIFNldHRpbmdzIHtcbiAgc3BlYWtSYXRlOiBudW1iZXJcbiAgcGllY2VzTGlzdEVuYWJsZWQ6IGJvb2xlYW5cbiAgZGl2aWRlcnNFbmFibGVkOiBib29sZWFuXG4gIGN1c3RvbUJvYXJkRW5hYmxlZDogYm9vbGVhblxuICBvYmZ1c2NhdGlvbnNFbmFibGVkOiBib29sZWFuXG4gIHBhcmFsbGF4OiBudW1iZXJcbiAgaG92ZXJNb2RlOiBzdHJpbmdcbiAgcGllY2VTdHlsZTogc3RyaW5nXG4gIGJsdXI6IG51bWJlclxuICBibGFja1NlZ21lbnRzOiBzdHJpbmdcbiAgYmxhY2tTZWdtZW50c1RpbWluZzogc3RyaW5nXG4gIGZsYXNoTW9kZUVuYWJsZWQ6IGJvb2xlYW5cbiAgZmxhc2hEdXJhdGlvbjogbnVtYmVyXG4gIGZsYXNoSW50ZXJ2YWw6IG51bWJlclxufVxuXG5leHBvcnQgY29uc3QgZGVmYXVsdFNldHRpbmdzOiBTZXR0aW5ncyA9IHtcbiAgc3BlYWtSYXRlOiAwLjUsXG4gIHBpZWNlc0xpc3RFbmFibGVkOiBmYWxzZSxcbiAgZGl2aWRlcnNFbmFibGVkOiBmYWxzZSxcbiAgY3VzdG9tQm9hcmRFbmFibGVkOiBmYWxzZSxcbiAgb2JmdXNjYXRpb25zRW5hYmxlZDogZmFsc2UsXG4gIHBhcmFsbGF4OiAwLFxuICBob3Zlck1vZGU6ICdvZmYnLFxuICBwaWVjZVN0eWxlOiAnaWNvbnMnLFxuICBibHVyOiAwLFxuICBibGFja1NlZ21lbnRzOiAnbm9uZScsXG4gIGJsYWNrU2VnbWVudHNUaW1pbmc6ICdyb3RhdGUtMTBzJyxcbiAgZmxhc2hNb2RlRW5hYmxlZDogZmFsc2UsXG4gIGZsYXNoRHVyYXRpb246IDEsXG4gIGZsYXNoSW50ZXJ2YWw6IDMsXG59XG4iLCIvKipcbiAqIFdyYXBwZXIgbW9kdWxlIGZvciBsb2NhbFN0b3JhZ2UgdG8gYWxsb3cgbW9ja2luZyB3aXRoIHNpbW9uZVxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRJdGVtKGtleTogc3RyaW5nKTogc3RyaW5nIHwgbnVsbCB7XG4gIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRJdGVtKGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgdmFsdWUpXG59XG4iLCJpbXBvcnQgdHlwZSB7IFNpZ25hbCB9IGZyb20gJ0BwcmVhY3Qvc2lnbmFscy1jb3JlJ1xuaW1wb3J0IHsgZWZmZWN0LCBzaWduYWwgfSBmcm9tICdAcHJlYWN0L3NpZ25hbHMtY29yZSdcbmltcG9ydCB7IHR5cGUgU2V0dGluZ3MsIGRlZmF1bHRTZXR0aW5ncyB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy9zZXR0aW5ncydcbmltcG9ydCAqIGFzIHN0b3JhZ2UgZnJvbSAnLi4vLi4vcGxhdGZvcm0vc3RvcmFnZSdcblxuY29uc3QgU1RPUkFHRV9LRVkgPSAnbGljaGVzcy1ib2FyZC1zcGVha2VyLXNldHRpbmdzJ1xuXG5leHBvcnQgaW50ZXJmYWNlIFNldHRpbmdzU3RvcmUge1xuICBzcGVha1JhdGU6IFNpZ25hbDxudW1iZXI+XG4gIHBpZWNlc0xpc3RFbmFibGVkOiBTaWduYWw8Ym9vbGVhbj5cbiAgZGl2aWRlcnNFbmFibGVkOiBTaWduYWw8Ym9vbGVhbj5cbiAgY3VzdG9tQm9hcmRFbmFibGVkOiBTaWduYWw8Ym9vbGVhbj5cbiAgb2JmdXNjYXRpb25zRW5hYmxlZDogU2lnbmFsPGJvb2xlYW4+XG4gIHBhcmFsbGF4OiBTaWduYWw8bnVtYmVyPlxuICBob3Zlck1vZGU6IFNpZ25hbDxzdHJpbmc+XG4gIHBpZWNlU3R5bGU6IFNpZ25hbDxzdHJpbmc+XG4gIGJsdXI6IFNpZ25hbDxudW1iZXI+XG4gIGJsYWNrU2VnbWVudHM6IFNpZ25hbDxzdHJpbmc+XG4gIGJsYWNrU2VnbWVudHNUaW1pbmc6IFNpZ25hbDxzdHJpbmc+XG4gIGZsYXNoTW9kZUVuYWJsZWQ6IFNpZ25hbDxib29sZWFuPlxuICBmbGFzaER1cmF0aW9uOiBTaWduYWw8bnVtYmVyPlxuICBmbGFzaEludGVydmFsOiBTaWduYWw8bnVtYmVyPlxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2V0dGluZ3NTdG9yZSgpOiBTZXR0aW5nc1N0b3JlIHtcbiAgcmV0dXJuIHtcbiAgICBzcGVha1JhdGU6IHNpZ25hbChkZWZhdWx0U2V0dGluZ3Muc3BlYWtSYXRlKSxcbiAgICBwaWVjZXNMaXN0RW5hYmxlZDogc2lnbmFsKGRlZmF1bHRTZXR0aW5ncy5waWVjZXNMaXN0RW5hYmxlZCksXG4gICAgZGl2aWRlcnNFbmFibGVkOiBzaWduYWwoZGVmYXVsdFNldHRpbmdzLmRpdmlkZXJzRW5hYmxlZCksXG4gICAgY3VzdG9tQm9hcmRFbmFibGVkOiBzaWduYWwoZGVmYXVsdFNldHRpbmdzLmN1c3RvbUJvYXJkRW5hYmxlZCksXG4gICAgb2JmdXNjYXRpb25zRW5hYmxlZDogc2lnbmFsKGRlZmF1bHRTZXR0aW5ncy5vYmZ1c2NhdGlvbnNFbmFibGVkKSxcbiAgICBwYXJhbGxheDogc2lnbmFsKGRlZmF1bHRTZXR0aW5ncy5wYXJhbGxheCksXG4gICAgaG92ZXJNb2RlOiBzaWduYWwoZGVmYXVsdFNldHRpbmdzLmhvdmVyTW9kZSksXG4gICAgcGllY2VTdHlsZTogc2lnbmFsKGRlZmF1bHRTZXR0aW5ncy5waWVjZVN0eWxlKSxcbiAgICBibHVyOiBzaWduYWwoZGVmYXVsdFNldHRpbmdzLmJsdXIpLFxuICAgIGJsYWNrU2VnbWVudHM6IHNpZ25hbChkZWZhdWx0U2V0dGluZ3MuYmxhY2tTZWdtZW50cyksXG4gICAgYmxhY2tTZWdtZW50c1RpbWluZzogc2lnbmFsKGRlZmF1bHRTZXR0aW5ncy5ibGFja1NlZ21lbnRzVGltaW5nKSxcbiAgICBmbGFzaE1vZGVFbmFibGVkOiBzaWduYWwoZGVmYXVsdFNldHRpbmdzLmZsYXNoTW9kZUVuYWJsZWQpLFxuICAgIGZsYXNoRHVyYXRpb246IHNpZ25hbChkZWZhdWx0U2V0dGluZ3MuZmxhc2hEdXJhdGlvbiksXG4gICAgZmxhc2hJbnRlcnZhbDogc2lnbmFsKGRlZmF1bHRTZXR0aW5ncy5mbGFzaEludGVydmFsKSxcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9hZFNldHRpbmdzKHNldHRpbmdzOiBTZXR0aW5nc1N0b3JlKTogdm9pZCB7XG4gIGNvbnN0IHN0b3JlZCA9IHN0b3JhZ2UuZ2V0SXRlbShTVE9SQUdFX0tFWSlcbiAgaWYgKCFzdG9yZWQpIHJldHVyblxuXG4gIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKHN0b3JlZCkgYXMgUGFydGlhbDxTZXR0aW5ncz5cbiAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoZGF0YSkpIHtcbiAgICBjb25zdCBzZXR0aW5nS2V5ID0ga2V5IGFzIGtleW9mIFNldHRpbmdzXG4gICAgaWYgKFxuICAgICAgc2V0dGluZ3Nbc2V0dGluZ0tleV0gJiZcbiAgICAgIHR5cGVvZiBzZXR0aW5nc1tzZXR0aW5nS2V5XSA9PT0gJ29iamVjdCcgJiZcbiAgICAgICd2YWx1ZScgaW4gc2V0dGluZ3Nbc2V0dGluZ0tleV1cbiAgICApIHtcbiAgICAgIC8vIGJpb21lLWlnbm9yZSBsaW50L3N1c3BpY2lvdXMvbm9FeHBsaWNpdEFueTogU2V0dGluZ3MgdHlwZSBpcyBkeW5hbWljXG4gICAgICA7KHNldHRpbmdzW3NldHRpbmdLZXldIGFzIGFueSkudmFsdWUgPSBkYXRhW3NldHRpbmdLZXldXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzYXZlU2V0dGluZ3Moc2V0dGluZ3M6IFNldHRpbmdzU3RvcmUpOiB2b2lkIHtcbiAgY29uc3QgZGF0YTogUGFydGlhbDxTZXR0aW5ncz4gPSB7fVxuICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhzZXR0aW5ncykpIHtcbiAgICBjb25zdCBzZXR0aW5nS2V5ID0ga2V5IGFzIGtleW9mIHR5cGVvZiBzZXR0aW5nc1xuICAgIC8vIGJpb21lLWlnbm9yZSBsaW50L3N1c3BpY2lvdXMvbm9FeHBsaWNpdEFueTogU2V0dGluZ3MgdHlwZSBpcyBkeW5hbWljXG4gICAgZGF0YVtzZXR0aW5nS2V5IGFzIGtleW9mIFNldHRpbmdzXSA9IChzZXR0aW5nc1tzZXR0aW5nS2V5XSBhcyBhbnkpLnZhbHVlXG4gIH1cbiAgc3RvcmFnZS5zZXRJdGVtKFNUT1JBR0VfS0VZLCBKU09OLnN0cmluZ2lmeShkYXRhKSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldHVwQXV0b1NhdmUoc2V0dGluZ3M6IFNldHRpbmdzU3RvcmUpOiB2b2lkIHtcbiAgZWZmZWN0KCgpID0+IHtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhzZXR0aW5ncykpIHtcbiAgICAgIGNvbnN0IHNldHRpbmcgPSBzZXR0aW5nc1trZXkgYXMga2V5b2YgdHlwZW9mIHNldHRpbmdzXVxuICAgICAgc2V0dGluZy52YWx1ZVxuICAgIH1cbiAgICBzYXZlU2V0dGluZ3Moc2V0dGluZ3MpXG4gIH0pXG59XG4iLCJ2YXIgbixsLHUsdCxpLHIsbyxlLGYsYyxhLHMsaCxwLHYseSxkPXt9LHc9W10sXz0vYWNpdHxleCg/OnN8Z3xufHB8JCl8cnBofGdyaWR8b3dzfG1uY3xudHd8aW5lW2NoXXx6b298Xm9yZHxpdGVyYS9pLGc9QXJyYXkuaXNBcnJheTtmdW5jdGlvbiBtKG4sbCl7Zm9yKHZhciB1IGluIGwpblt1XT1sW3VdO3JldHVybiBufWZ1bmN0aW9uIGIobil7biYmbi5wYXJlbnROb2RlJiZuLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobil9ZnVuY3Rpb24gayhsLHUsdCl7dmFyIGkscixvLGU9e307Zm9yKG8gaW4gdSlcImtleVwiPT1vP2k9dVtvXTpcInJlZlwiPT1vP3I9dVtvXTplW29dPXVbb107aWYoYXJndW1lbnRzLmxlbmd0aD4yJiYoZS5jaGlsZHJlbj1hcmd1bWVudHMubGVuZ3RoPjM/bi5jYWxsKGFyZ3VtZW50cywyKTp0KSxcImZ1bmN0aW9uXCI9PXR5cGVvZiBsJiZudWxsIT1sLmRlZmF1bHRQcm9wcylmb3IobyBpbiBsLmRlZmF1bHRQcm9wcyl2b2lkIDA9PT1lW29dJiYoZVtvXT1sLmRlZmF1bHRQcm9wc1tvXSk7cmV0dXJuIHgobCxlLGkscixudWxsKX1mdW5jdGlvbiB4KG4sdCxpLHIsbyl7dmFyIGU9e3R5cGU6bixwcm9wczp0LGtleTppLHJlZjpyLF9fazpudWxsLF9fOm51bGwsX19iOjAsX19lOm51bGwsX19jOm51bGwsY29uc3RydWN0b3I6dm9pZCAwLF9fdjpudWxsPT1vPysrdTpvLF9faTotMSxfX3U6MH07cmV0dXJuIG51bGw9PW8mJm51bGwhPWwudm5vZGUmJmwudm5vZGUoZSksZX1mdW5jdGlvbiBNKCl7cmV0dXJue2N1cnJlbnQ6bnVsbH19ZnVuY3Rpb24gUyhuKXtyZXR1cm4gbi5jaGlsZHJlbn1mdW5jdGlvbiBDKG4sbCl7dGhpcy5wcm9wcz1uLHRoaXMuY29udGV4dD1sfWZ1bmN0aW9uICQobixsKXtpZihudWxsPT1sKXJldHVybiBuLl9fPyQobi5fXyxuLl9faSsxKTpudWxsO2Zvcih2YXIgdTtsPG4uX19rLmxlbmd0aDtsKyspaWYobnVsbCE9KHU9bi5fX2tbbF0pJiZudWxsIT11Ll9fZSlyZXR1cm4gdS5fX2U7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2Ygbi50eXBlPyQobik6bnVsbH1mdW5jdGlvbiBJKG4pe2lmKG4uX19QJiZuLl9fZCl7dmFyIHU9bi5fX3YsdD11Ll9fZSxpPVtdLHI9W10sbz1tKHt9LHUpO28uX192PXUuX192KzEsbC52bm9kZSYmbC52bm9kZShvKSxxKG4uX19QLG8sdSxuLl9fbixuLl9fUC5uYW1lc3BhY2VVUkksMzImdS5fX3U/W3RdOm51bGwsaSxudWxsPT10PyQodSk6dCwhISgzMiZ1Ll9fdSksciksby5fX3Y9dS5fX3Ysby5fXy5fX2tbby5fX2ldPW8sRChpLG8sciksdS5fX2U9dS5fXz1udWxsLG8uX19lIT10JiZQKG8pfX1mdW5jdGlvbiBQKG4pe2lmKG51bGwhPShuPW4uX18pJiZudWxsIT1uLl9fYylyZXR1cm4gbi5fX2U9bi5fX2MuYmFzZT1udWxsLG4uX19rLnNvbWUoZnVuY3Rpb24obCl7aWYobnVsbCE9bCYmbnVsbCE9bC5fX2UpcmV0dXJuIG4uX19lPW4uX19jLmJhc2U9bC5fX2V9KSxQKG4pfWZ1bmN0aW9uIEEobil7KCFuLl9fZCYmKG4uX19kPSEwKSYmaS5wdXNoKG4pJiYhSC5fX3IrK3x8ciE9bC5kZWJvdW5jZVJlbmRlcmluZykmJigocj1sLmRlYm91bmNlUmVuZGVyaW5nKXx8bykoSCl9ZnVuY3Rpb24gSCgpe3RyeXtmb3IodmFyIG4sbD0xO2kubGVuZ3RoOylpLmxlbmd0aD5sJiZpLnNvcnQoZSksbj1pLnNoaWZ0KCksbD1pLmxlbmd0aCxJKG4pfWZpbmFsbHl7aS5sZW5ndGg9SC5fX3I9MH19ZnVuY3Rpb24gTChuLGwsdSx0LGkscixvLGUsZixjLGEpe3ZhciBzLGgscCx2LHksXyxnLG09dCYmdC5fX2t8fHcsYj1sLmxlbmd0aDtmb3IoZj1UKHUsbCxtLGYsYikscz0wO3M8YjtzKyspbnVsbCE9KHA9dS5fX2tbc10pJiYoaD0tMSE9cC5fX2kmJm1bcC5fX2ldfHxkLHAuX19pPXMsXz1xKG4scCxoLGkscixvLGUsZixjLGEpLHY9cC5fX2UscC5yZWYmJmgucmVmIT1wLnJlZiYmKGgucmVmJiZKKGgucmVmLG51bGwscCksYS5wdXNoKHAucmVmLHAuX19jfHx2LHApKSxudWxsPT15JiZudWxsIT12JiYoeT12KSwoZz0hISg0JnAuX191KSl8fGguX19rPT09cC5fX2s/KGY9aihwLGYsbixnKSxnJiZoLl9fZSYmKGguX19lPW51bGwpKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBwLnR5cGUmJnZvaWQgMCE9PV8/Zj1fOnYmJihmPXYubmV4dFNpYmxpbmcpLHAuX191Jj0tNyk7cmV0dXJuIHUuX19lPXksZn1mdW5jdGlvbiBUKG4sbCx1LHQsaSl7dmFyIHIsbyxlLGYsYyxhPXUubGVuZ3RoLHM9YSxoPTA7Zm9yKG4uX19rPW5ldyBBcnJheShpKSxyPTA7cjxpO3IrKyludWxsIT0obz1sW3JdKSYmXCJib29sZWFuXCIhPXR5cGVvZiBvJiZcImZ1bmN0aW9uXCIhPXR5cGVvZiBvPyhcInN0cmluZ1wiPT10eXBlb2Ygb3x8XCJudW1iZXJcIj09dHlwZW9mIG98fFwiYmlnaW50XCI9PXR5cGVvZiBvfHxvLmNvbnN0cnVjdG9yPT1TdHJpbmc/bz1uLl9fa1tyXT14KG51bGwsbyxudWxsLG51bGwsbnVsbCk6ZyhvKT9vPW4uX19rW3JdPXgoUyx7Y2hpbGRyZW46b30sbnVsbCxudWxsLG51bGwpOnZvaWQgMD09PW8uY29uc3RydWN0b3ImJm8uX19iPjA/bz1uLl9fa1tyXT14KG8udHlwZSxvLnByb3BzLG8ua2V5LG8ucmVmP28ucmVmOm51bGwsby5fX3YpOm4uX19rW3JdPW8sZj1yK2gsby5fXz1uLG8uX19iPW4uX19iKzEsZT1udWxsLC0xIT0oYz1vLl9faT1PKG8sdSxmLHMpKSYmKHMtLSwoZT11W2NdKSYmKGUuX191fD0yKSksbnVsbD09ZXx8bnVsbD09ZS5fX3Y/KC0xPT1jJiYoaT5hP2gtLTppPGEmJmgrKyksXCJmdW5jdGlvblwiIT10eXBlb2Ygby50eXBlJiYoby5fX3V8PTQpKTpjIT1mJiYoYz09Zi0xP2gtLTpjPT1mKzE/aCsrOihjPmY/aC0tOmgrKyxvLl9fdXw9NCkpKTpuLl9fa1tyXT1udWxsO2lmKHMpZm9yKHI9MDtyPGE7cisrKW51bGwhPShlPXVbcl0pJiYwPT0oMiZlLl9fdSkmJihlLl9fZT09dCYmKHQ9JChlKSksSyhlLGUpKTtyZXR1cm4gdH1mdW5jdGlvbiBqKG4sbCx1LHQpe3ZhciBpLHI7aWYoXCJmdW5jdGlvblwiPT10eXBlb2Ygbi50eXBlKXtmb3IoaT1uLl9fayxyPTA7aSYmcjxpLmxlbmd0aDtyKyspaVtyXSYmKGlbcl0uX189bixsPWooaVtyXSxsLHUsdCkpO3JldHVybiBsfW4uX19lIT1sJiYodCYmKGwmJm4udHlwZSYmIWwucGFyZW50Tm9kZSYmKGw9JChuKSksdS5pbnNlcnRCZWZvcmUobi5fX2UsbHx8bnVsbCkpLGw9bi5fX2UpO2Rve2w9bCYmbC5uZXh0U2libGluZ313aGlsZShudWxsIT1sJiY4PT1sLm5vZGVUeXBlKTtyZXR1cm4gbH1mdW5jdGlvbiBGKG4sbCl7cmV0dXJuIGw9bHx8W10sbnVsbD09bnx8XCJib29sZWFuXCI9PXR5cGVvZiBufHwoZyhuKT9uLnNvbWUoZnVuY3Rpb24obil7RihuLGwpfSk6bC5wdXNoKG4pKSxsfWZ1bmN0aW9uIE8obixsLHUsdCl7dmFyIGkscixvLGU9bi5rZXksZj1uLnR5cGUsYz1sW3VdLGE9bnVsbCE9YyYmMD09KDImYy5fX3UpO2lmKG51bGw9PT1jJiZudWxsPT1lfHxhJiZlPT1jLmtleSYmZj09Yy50eXBlKXJldHVybiB1O2lmKHQ+KGE/MTowKSlmb3IoaT11LTEscj11KzE7aT49MHx8cjxsLmxlbmd0aDspaWYobnVsbCE9KGM9bFtvPWk+PTA/aS0tOnIrK10pJiYwPT0oMiZjLl9fdSkmJmU9PWMua2V5JiZmPT1jLnR5cGUpcmV0dXJuIG87cmV0dXJuLTF9ZnVuY3Rpb24geihuLGwsdSl7XCItXCI9PWxbMF0/bi5zZXRQcm9wZXJ0eShsLG51bGw9PXU/XCJcIjp1KTpuW2xdPW51bGw9PXU/XCJcIjpcIm51bWJlclwiIT10eXBlb2YgdXx8Xy50ZXN0KGwpP3U6dStcInB4XCJ9ZnVuY3Rpb24gTihuLGwsdSx0LGkpe3ZhciByLG87bjppZihcInN0eWxlXCI9PWwpaWYoXCJzdHJpbmdcIj09dHlwZW9mIHUpbi5zdHlsZS5jc3NUZXh0PXU7ZWxzZXtpZihcInN0cmluZ1wiPT10eXBlb2YgdCYmKG4uc3R5bGUuY3NzVGV4dD10PVwiXCIpLHQpZm9yKGwgaW4gdCl1JiZsIGluIHV8fHoobi5zdHlsZSxsLFwiXCIpO2lmKHUpZm9yKGwgaW4gdSl0JiZ1W2xdPT10W2xdfHx6KG4uc3R5bGUsbCx1W2xdKX1lbHNlIGlmKFwib1wiPT1sWzBdJiZcIm5cIj09bFsxXSlyPWwhPShsPWwucmVwbGFjZShzLFwiJDFcIikpLG89bC50b0xvd2VyQ2FzZSgpLGw9byBpbiBufHxcIm9uRm9jdXNPdXRcIj09bHx8XCJvbkZvY3VzSW5cIj09bD9vLnNsaWNlKDIpOmwuc2xpY2UoMiksbi5sfHwobi5sPXt9KSxuLmxbbCtyXT11LHU/dD91W2FdPXRbYV06KHVbYV09aCxuLmFkZEV2ZW50TGlzdGVuZXIobCxyP3Y6cCxyKSk6bi5yZW1vdmVFdmVudExpc3RlbmVyKGwscj92OnAscik7ZWxzZXtpZihcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI9PWkpbD1sLnJlcGxhY2UoL3hsaW5rKEh8OmgpLyxcImhcIikucmVwbGFjZSgvc05hbWUkLyxcInNcIik7ZWxzZSBpZihcIndpZHRoXCIhPWwmJlwiaGVpZ2h0XCIhPWwmJlwiaHJlZlwiIT1sJiZcImxpc3RcIiE9bCYmXCJmb3JtXCIhPWwmJlwidGFiSW5kZXhcIiE9bCYmXCJkb3dubG9hZFwiIT1sJiZcInJvd1NwYW5cIiE9bCYmXCJjb2xTcGFuXCIhPWwmJlwicm9sZVwiIT1sJiZcInBvcG92ZXJcIiE9bCYmbCBpbiBuKXRyeXtuW2xdPW51bGw9PXU/XCJcIjp1O2JyZWFrIG59Y2F0Y2gobil7fVwiZnVuY3Rpb25cIj09dHlwZW9mIHV8fChudWxsPT11fHwhMT09PXUmJlwiLVwiIT1sWzRdP24ucmVtb3ZlQXR0cmlidXRlKGwpOm4uc2V0QXR0cmlidXRlKGwsXCJwb3BvdmVyXCI9PWwmJjE9PXU/XCJcIjp1KSl9fWZ1bmN0aW9uIFYobil7cmV0dXJuIGZ1bmN0aW9uKHUpe2lmKHRoaXMubCl7dmFyIHQ9dGhpcy5sW3UudHlwZStuXTtpZihudWxsPT11W2NdKXVbY109aCsrO2Vsc2UgaWYodVtjXTx0W2FdKXJldHVybjtyZXR1cm4gdChsLmV2ZW50P2wuZXZlbnQodSk6dSl9fX1mdW5jdGlvbiBxKG4sdSx0LGkscixvLGUsZixjLGEpe3ZhciBzLGgscCx2LHksZCxfLGsseCxNLCQsSSxQLEEsSCxUPXUudHlwZTtpZih2b2lkIDAhPT11LmNvbnN0cnVjdG9yKXJldHVybiBudWxsOzEyOCZ0Ll9fdSYmKGM9ISEoMzImdC5fX3UpLG89W2Y9dS5fX2U9dC5fX2VdKSwocz1sLl9fYikmJnModSk7bjppZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBUKXRyeXtpZihrPXUucHJvcHMseD1ULnByb3RvdHlwZSYmVC5wcm90b3R5cGUucmVuZGVyLE09KHM9VC5jb250ZXh0VHlwZSkmJmlbcy5fX2NdLCQ9cz9NP00ucHJvcHMudmFsdWU6cy5fXzppLHQuX19jP189KGg9dS5fX2M9dC5fX2MpLl9fPWguX19FOih4P3UuX19jPWg9bmV3IFQoaywkKToodS5fX2M9aD1uZXcgQyhrLCQpLGguY29uc3RydWN0b3I9VCxoLnJlbmRlcj1RKSxNJiZNLnN1YihoKSxoLnN0YXRlfHwoaC5zdGF0ZT17fSksaC5fX249aSxwPWguX19kPSEwLGguX19oPVtdLGguX3NiPVtdKSx4JiZudWxsPT1oLl9fcyYmKGguX19zPWguc3RhdGUpLHgmJm51bGwhPVQuZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzJiYoaC5fX3M9PWguc3RhdGUmJihoLl9fcz1tKHt9LGguX19zKSksbShoLl9fcyxULmdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyhrLGguX19zKSkpLHY9aC5wcm9wcyx5PWguc3RhdGUsaC5fX3Y9dSxwKXgmJm51bGw9PVQuZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzJiZudWxsIT1oLmNvbXBvbmVudFdpbGxNb3VudCYmaC5jb21wb25lbnRXaWxsTW91bnQoKSx4JiZudWxsIT1oLmNvbXBvbmVudERpZE1vdW50JiZoLl9faC5wdXNoKGguY29tcG9uZW50RGlkTW91bnQpO2Vsc2V7aWYoeCYmbnVsbD09VC5nZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMmJmshPT12JiZudWxsIT1oLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMmJmguY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhrLCQpLHUuX192PT10Ll9fdnx8IWguX19lJiZudWxsIT1oLnNob3VsZENvbXBvbmVudFVwZGF0ZSYmITE9PT1oLnNob3VsZENvbXBvbmVudFVwZGF0ZShrLGguX19zLCQpKXt1Ll9fdiE9dC5fX3YmJihoLnByb3BzPWssaC5zdGF0ZT1oLl9fcyxoLl9fZD0hMSksdS5fX2U9dC5fX2UsdS5fX2s9dC5fX2ssdS5fX2suc29tZShmdW5jdGlvbihuKXtuJiYobi5fXz11KX0pLHcucHVzaC5hcHBseShoLl9faCxoLl9zYiksaC5fc2I9W10saC5fX2gubGVuZ3RoJiZlLnB1c2goaCk7YnJlYWsgbn1udWxsIT1oLmNvbXBvbmVudFdpbGxVcGRhdGUmJmguY29tcG9uZW50V2lsbFVwZGF0ZShrLGguX19zLCQpLHgmJm51bGwhPWguY29tcG9uZW50RGlkVXBkYXRlJiZoLl9faC5wdXNoKGZ1bmN0aW9uKCl7aC5jb21wb25lbnREaWRVcGRhdGUodix5LGQpfSl9aWYoaC5jb250ZXh0PSQsaC5wcm9wcz1rLGguX19QPW4saC5fX2U9ITEsST1sLl9fcixQPTAseCloLnN0YXRlPWguX19zLGguX19kPSExLEkmJkkodSkscz1oLnJlbmRlcihoLnByb3BzLGguc3RhdGUsaC5jb250ZXh0KSx3LnB1c2guYXBwbHkoaC5fX2gsaC5fc2IpLGguX3NiPVtdO2Vsc2UgZG97aC5fX2Q9ITEsSSYmSSh1KSxzPWgucmVuZGVyKGgucHJvcHMsaC5zdGF0ZSxoLmNvbnRleHQpLGguc3RhdGU9aC5fX3N9d2hpbGUoaC5fX2QmJisrUDwyNSk7aC5zdGF0ZT1oLl9fcyxudWxsIT1oLmdldENoaWxkQ29udGV4dCYmKGk9bShtKHt9LGkpLGguZ2V0Q2hpbGRDb250ZXh0KCkpKSx4JiYhcCYmbnVsbCE9aC5nZXRTbmFwc2hvdEJlZm9yZVVwZGF0ZSYmKGQ9aC5nZXRTbmFwc2hvdEJlZm9yZVVwZGF0ZSh2LHkpKSxBPW51bGwhPXMmJnMudHlwZT09PVMmJm51bGw9PXMua2V5P0Uocy5wcm9wcy5jaGlsZHJlbik6cyxmPUwobixnKEEpP0E6W0FdLHUsdCxpLHIsbyxlLGYsYyxhKSxoLmJhc2U9dS5fX2UsdS5fX3UmPS0xNjEsaC5fX2gubGVuZ3RoJiZlLnB1c2goaCksXyYmKGguX19FPWguX189bnVsbCl9Y2F0Y2gobil7aWYodS5fX3Y9bnVsbCxjfHxudWxsIT1vKWlmKG4udGhlbil7Zm9yKHUuX191fD1jPzE2MDoxMjg7ZiYmOD09Zi5ub2RlVHlwZSYmZi5uZXh0U2libGluZzspZj1mLm5leHRTaWJsaW5nO29bby5pbmRleE9mKGYpXT1udWxsLHUuX19lPWZ9ZWxzZXtmb3IoSD1vLmxlbmd0aDtILS07KWIob1tIXSk7Qih1KX1lbHNlIHUuX19lPXQuX19lLHUuX19rPXQuX19rLG4udGhlbnx8Qih1KTtsLl9fZShuLHUsdCl9ZWxzZSBudWxsPT1vJiZ1Ll9fdj09dC5fX3Y/KHUuX19rPXQuX19rLHUuX19lPXQuX19lKTpmPXUuX19lPUcodC5fX2UsdSx0LGkscixvLGUsYyxhKTtyZXR1cm4ocz1sLmRpZmZlZCkmJnModSksMTI4JnUuX191P3ZvaWQgMDpmfWZ1bmN0aW9uIEIobil7biYmKG4uX19jJiYobi5fX2MuX19lPSEwKSxuLl9fayYmbi5fX2suc29tZShCKSl9ZnVuY3Rpb24gRChuLHUsdCl7Zm9yKHZhciBpPTA7aTx0Lmxlbmd0aDtpKyspSih0W2ldLHRbKytpXSx0WysraV0pO2wuX19jJiZsLl9fYyh1LG4pLG4uc29tZShmdW5jdGlvbih1KXt0cnl7bj11Ll9faCx1Ll9faD1bXSxuLnNvbWUoZnVuY3Rpb24obil7bi5jYWxsKHUpfSl9Y2F0Y2gobil7bC5fX2Uobix1Ll9fdil9fSl9ZnVuY3Rpb24gRShuKXtyZXR1cm5cIm9iamVjdFwiIT10eXBlb2Ygbnx8bnVsbD09bnx8bi5fX2I+MD9uOmcobik/bi5tYXAoRSk6dm9pZCAwIT09bi5jb25zdHJ1Y3Rvcj9udWxsOm0oe30sbil9ZnVuY3Rpb24gRyh1LHQsaSxyLG8sZSxmLGMsYSl7dmFyIHMsaCxwLHYseSx3LF8sbT1pLnByb3BzfHxkLGs9dC5wcm9wcyx4PXQudHlwZTtpZihcInN2Z1wiPT14P289XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiOlwibWF0aFwiPT14P289XCJodHRwOi8vd3d3LnczLm9yZy8xOTk4L01hdGgvTWF0aE1MXCI6b3x8KG89XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sXCIpLG51bGwhPWUpZm9yKHM9MDtzPGUubGVuZ3RoO3MrKylpZigoeT1lW3NdKSYmXCJzZXRBdHRyaWJ1dGVcImluIHk9PSEheCYmKHg/eS5sb2NhbE5hbWU9PXg6Mz09eS5ub2RlVHlwZSkpe3U9eSxlW3NdPW51bGw7YnJlYWt9aWYobnVsbD09dSl7aWYobnVsbD09eClyZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoayk7dT1kb2N1bWVudC5jcmVhdGVFbGVtZW50TlMobyx4LGsuaXMmJmspLGMmJihsLl9fbSYmbC5fX20odCxlKSxjPSExKSxlPW51bGx9aWYobnVsbD09eCltPT09a3x8YyYmdS5kYXRhPT1rfHwodS5kYXRhPWspO2Vsc2V7aWYoZT1cInRleHRhcmVhXCI9PXgmJm51bGwhPWsuZGVmYXVsdFZhbHVlP251bGw6ZSYmbi5jYWxsKHUuY2hpbGROb2RlcyksIWMmJm51bGwhPWUpZm9yKG09e30scz0wO3M8dS5hdHRyaWJ1dGVzLmxlbmd0aDtzKyspbVsoeT11LmF0dHJpYnV0ZXNbc10pLm5hbWVdPXkudmFsdWU7Zm9yKHMgaW4gbSl5PW1bc10sXCJkYW5nZXJvdXNseVNldElubmVySFRNTFwiPT1zP3A9eTpcImNoaWxkcmVuXCI9PXN8fHMgaW4ga3x8XCJ2YWx1ZVwiPT1zJiZcImRlZmF1bHRWYWx1ZVwiaW4ga3x8XCJjaGVja2VkXCI9PXMmJlwiZGVmYXVsdENoZWNrZWRcImluIGt8fE4odSxzLG51bGwseSxvKTtmb3IocyBpbiBrKXk9a1tzXSxcImNoaWxkcmVuXCI9PXM/dj15OlwiZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUxcIj09cz9oPXk6XCJ2YWx1ZVwiPT1zP3c9eTpcImNoZWNrZWRcIj09cz9fPXk6YyYmXCJmdW5jdGlvblwiIT10eXBlb2YgeXx8bVtzXT09PXl8fE4odSxzLHksbVtzXSxvKTtpZihoKWN8fHAmJihoLl9faHRtbD09cC5fX2h0bWx8fGguX19odG1sPT11LmlubmVySFRNTCl8fCh1LmlubmVySFRNTD1oLl9faHRtbCksdC5fX2s9W107ZWxzZSBpZihwJiYodS5pbm5lckhUTUw9XCJcIiksTChcInRlbXBsYXRlXCI9PXQudHlwZT91LmNvbnRlbnQ6dSxnKHYpP3Y6W3ZdLHQsaSxyLFwiZm9yZWlnbk9iamVjdFwiPT14P1wiaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbFwiOm8sZSxmLGU/ZVswXTppLl9fayYmJChpLDApLGMsYSksbnVsbCE9ZSlmb3Iocz1lLmxlbmd0aDtzLS07KWIoZVtzXSk7YyYmXCJ0ZXh0YXJlYVwiIT14fHwocz1cInZhbHVlXCIsXCJwcm9ncmVzc1wiPT14JiZudWxsPT13P3UucmVtb3ZlQXR0cmlidXRlKFwidmFsdWVcIik6bnVsbCE9dyYmKHchPT11W3NdfHxcInByb2dyZXNzXCI9PXgmJiF3fHxcIm9wdGlvblwiPT14JiZ3IT1tW3NdKSYmTih1LHMsdyxtW3NdLG8pLHM9XCJjaGVja2VkXCIsbnVsbCE9XyYmXyE9dVtzXSYmTih1LHMsXyxtW3NdLG8pKX1yZXR1cm4gdX1mdW5jdGlvbiBKKG4sdSx0KXt0cnl7aWYoXCJmdW5jdGlvblwiPT10eXBlb2Ygbil7dmFyIGk9XCJmdW5jdGlvblwiPT10eXBlb2Ygbi5fX3U7aSYmbi5fX3UoKSxpJiZudWxsPT11fHwobi5fX3U9bih1KSl9ZWxzZSBuLmN1cnJlbnQ9dX1jYXRjaChuKXtsLl9fZShuLHQpfX1mdW5jdGlvbiBLKG4sdSx0KXt2YXIgaSxyO2lmKGwudW5tb3VudCYmbC51bm1vdW50KG4pLChpPW4ucmVmKSYmKGkuY3VycmVudCYmaS5jdXJyZW50IT1uLl9fZXx8SihpLG51bGwsdSkpLG51bGwhPShpPW4uX19jKSl7aWYoaS5jb21wb25lbnRXaWxsVW5tb3VudCl0cnl7aS5jb21wb25lbnRXaWxsVW5tb3VudCgpfWNhdGNoKG4pe2wuX19lKG4sdSl9aS5iYXNlPWkuX19QPW51bGx9aWYoaT1uLl9faylmb3Iocj0wO3I8aS5sZW5ndGg7cisrKWlbcl0mJksoaVtyXSx1LHR8fFwiZnVuY3Rpb25cIiE9dHlwZW9mIG4udHlwZSk7dHx8YihuLl9fZSksbi5fX2M9bi5fXz1uLl9fZT12b2lkIDB9ZnVuY3Rpb24gUShuLGwsdSl7cmV0dXJuIHRoaXMuY29uc3RydWN0b3Iobix1KX1mdW5jdGlvbiBSKHUsdCxpKXt2YXIgcixvLGUsZjt0PT1kb2N1bWVudCYmKHQ9ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSxsLl9fJiZsLl9fKHUsdCksbz0ocj1cImZ1bmN0aW9uXCI9PXR5cGVvZiBpKT9udWxsOmkmJmkuX19rfHx0Ll9fayxlPVtdLGY9W10scSh0LHU9KCFyJiZpfHx0KS5fX2s9ayhTLG51bGwsW3VdKSxvfHxkLGQsdC5uYW1lc3BhY2VVUkksIXImJmk/W2ldOm8/bnVsbDp0LmZpcnN0Q2hpbGQ/bi5jYWxsKHQuY2hpbGROb2Rlcyk6bnVsbCxlLCFyJiZpP2k6bz9vLl9fZTp0LmZpcnN0Q2hpbGQscixmKSxEKGUsdSxmKX1mdW5jdGlvbiBVKG4sbCl7UihuLGwsVSl9ZnVuY3Rpb24gVyhsLHUsdCl7dmFyIGkscixvLGUsZj1tKHt9LGwucHJvcHMpO2ZvcihvIGluIGwudHlwZSYmbC50eXBlLmRlZmF1bHRQcm9wcyYmKGU9bC50eXBlLmRlZmF1bHRQcm9wcyksdSlcImtleVwiPT1vP2k9dVtvXTpcInJlZlwiPT1vP3I9dVtvXTpmW29dPXZvaWQgMD09PXVbb10mJm51bGwhPWU/ZVtvXTp1W29dO3JldHVybiBhcmd1bWVudHMubGVuZ3RoPjImJihmLmNoaWxkcmVuPWFyZ3VtZW50cy5sZW5ndGg+Mz9uLmNhbGwoYXJndW1lbnRzLDIpOnQpLHgobC50eXBlLGYsaXx8bC5rZXkscnx8bC5yZWYsbnVsbCl9ZnVuY3Rpb24gWChuKXtmdW5jdGlvbiBsKG4pe3ZhciB1LHQ7cmV0dXJuIHRoaXMuZ2V0Q2hpbGRDb250ZXh0fHwodT1uZXcgU2V0LCh0PXt9KVtsLl9fY109dGhpcyx0aGlzLmdldENoaWxkQ29udGV4dD1mdW5jdGlvbigpe3JldHVybiB0fSx0aGlzLmNvbXBvbmVudFdpbGxVbm1vdW50PWZ1bmN0aW9uKCl7dT1udWxsfSx0aGlzLnNob3VsZENvbXBvbmVudFVwZGF0ZT1mdW5jdGlvbihuKXt0aGlzLnByb3BzLnZhbHVlIT1uLnZhbHVlJiZ1LmZvckVhY2goZnVuY3Rpb24obil7bi5fX2U9ITAsQShuKX0pfSx0aGlzLnN1Yj1mdW5jdGlvbihuKXt1LmFkZChuKTt2YXIgbD1uLmNvbXBvbmVudFdpbGxVbm1vdW50O24uY29tcG9uZW50V2lsbFVubW91bnQ9ZnVuY3Rpb24oKXt1JiZ1LmRlbGV0ZShuKSxsJiZsLmNhbGwobil9fSksbi5jaGlsZHJlbn1yZXR1cm4gbC5fX2M9XCJfX2NDXCIreSsrLGwuX189bixsLlByb3ZpZGVyPWwuX19sPShsLkNvbnN1bWVyPWZ1bmN0aW9uKG4sbCl7cmV0dXJuIG4uY2hpbGRyZW4obCl9KS5jb250ZXh0VHlwZT1sLGx9bj13LnNsaWNlLGw9e19fZTpmdW5jdGlvbihuLGwsdSx0KXtmb3IodmFyIGkscixvO2w9bC5fXzspaWYoKGk9bC5fX2MpJiYhaS5fXyl0cnl7aWYoKHI9aS5jb25zdHJ1Y3RvcikmJm51bGwhPXIuZ2V0RGVyaXZlZFN0YXRlRnJvbUVycm9yJiYoaS5zZXRTdGF0ZShyLmdldERlcml2ZWRTdGF0ZUZyb21FcnJvcihuKSksbz1pLl9fZCksbnVsbCE9aS5jb21wb25lbnREaWRDYXRjaCYmKGkuY29tcG9uZW50RGlkQ2F0Y2gobix0fHx7fSksbz1pLl9fZCksbylyZXR1cm4gaS5fX0U9aX1jYXRjaChsKXtuPWx9dGhyb3cgbn19LHU9MCx0PWZ1bmN0aW9uKG4pe3JldHVybiBudWxsIT1uJiZ2b2lkIDA9PT1uLmNvbnN0cnVjdG9yfSxDLnByb3RvdHlwZS5zZXRTdGF0ZT1mdW5jdGlvbihuLGwpe3ZhciB1O3U9bnVsbCE9dGhpcy5fX3MmJnRoaXMuX19zIT10aGlzLnN0YXRlP3RoaXMuX19zOnRoaXMuX19zPW0oe30sdGhpcy5zdGF0ZSksXCJmdW5jdGlvblwiPT10eXBlb2YgbiYmKG49bihtKHt9LHUpLHRoaXMucHJvcHMpKSxuJiZtKHUsbiksbnVsbCE9biYmdGhpcy5fX3YmJihsJiZ0aGlzLl9zYi5wdXNoKGwpLEEodGhpcykpfSxDLnByb3RvdHlwZS5mb3JjZVVwZGF0ZT1mdW5jdGlvbihuKXt0aGlzLl9fdiYmKHRoaXMuX19lPSEwLG4mJnRoaXMuX19oLnB1c2gobiksQSh0aGlzKSl9LEMucHJvdG90eXBlLnJlbmRlcj1TLGk9W10sbz1cImZ1bmN0aW9uXCI9PXR5cGVvZiBQcm9taXNlP1Byb21pc2UucHJvdG90eXBlLnRoZW4uYmluZChQcm9taXNlLnJlc29sdmUoKSk6c2V0VGltZW91dCxlPWZ1bmN0aW9uKG4sbCl7cmV0dXJuIG4uX192Ll9fYi1sLl9fdi5fX2J9LEguX19yPTAsZj1NYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDgpLGM9XCJfX2RcIitmLGE9XCJfX2FcIitmLHM9LyhQb2ludGVyQ2FwdHVyZSkkfENhcHR1cmUkL2ksaD0wLHA9VighMSksdj1WKCEwKSx5PTA7ZXhwb3J0e0MgYXMgQ29tcG9uZW50LFMgYXMgRnJhZ21lbnQsVyBhcyBjbG9uZUVsZW1lbnQsWCBhcyBjcmVhdGVDb250ZXh0LGsgYXMgY3JlYXRlRWxlbWVudCxNIGFzIGNyZWF0ZVJlZixrIGFzIGgsVSBhcyBoeWRyYXRlLHQgYXMgaXNWYWxpZEVsZW1lbnQsbCBhcyBvcHRpb25zLFIgYXMgcmVuZGVyLEYgYXMgdG9DaGlsZEFycmF5fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXByZWFjdC5tb2R1bGUuanMubWFwXG4iLCJpbXBvcnR7b3B0aW9ucyBhcyBufWZyb21cInByZWFjdFwiO3ZhciB0LHIsdSxpLG89MCxmPVtdLGM9bixlPWMuX19iLGE9Yy5fX3Isdj1jLmRpZmZlZCxsPWMuX19jLG09Yy51bm1vdW50LHM9Yy5fXztmdW5jdGlvbiBwKG4sdCl7Yy5fX2gmJmMuX19oKHIsbixvfHx0KSxvPTA7dmFyIHU9ci5fX0h8fChyLl9fSD17X186W10sX19oOltdfSk7cmV0dXJuIG4+PXUuX18ubGVuZ3RoJiZ1Ll9fLnB1c2goe30pLHUuX19bbl19ZnVuY3Rpb24gZChuKXtyZXR1cm4gbz0xLGgoRCxuKX1mdW5jdGlvbiBoKG4sdSxpKXt2YXIgbz1wKHQrKywyKTtpZihvLnQ9biwhby5fX2MmJihvLl9fPVtpP2kodSk6RCh2b2lkIDAsdSksZnVuY3Rpb24obil7dmFyIHQ9by5fX04/by5fX05bMF06by5fX1swXSxyPW8udCh0LG4pO3QhPT1yJiYoby5fX049W3Isby5fX1sxXV0sby5fX2Muc2V0U3RhdGUoe30pKX1dLG8uX19jPXIsIXIuX19mKSl7dmFyIGY9ZnVuY3Rpb24obix0LHIpe2lmKCFvLl9fYy5fX0gpcmV0dXJuITA7dmFyIHU9by5fX2MuX19ILl9fLmZpbHRlcihmdW5jdGlvbihuKXtyZXR1cm4gbi5fX2N9KTtpZih1LmV2ZXJ5KGZ1bmN0aW9uKG4pe3JldHVybiFuLl9fTn0pKXJldHVybiFjfHxjLmNhbGwodGhpcyxuLHQscik7dmFyIGk9by5fX2MucHJvcHMhPT1uO3JldHVybiB1LnNvbWUoZnVuY3Rpb24obil7aWYobi5fX04pe3ZhciB0PW4uX19bMF07bi5fXz1uLl9fTixuLl9fTj12b2lkIDAsdCE9PW4uX19bMF0mJihpPSEwKX19KSxjJiZjLmNhbGwodGhpcyxuLHQscil8fGl9O3IuX19mPSEwO3ZhciBjPXIuc2hvdWxkQ29tcG9uZW50VXBkYXRlLGU9ci5jb21wb25lbnRXaWxsVXBkYXRlO3IuY29tcG9uZW50V2lsbFVwZGF0ZT1mdW5jdGlvbihuLHQscil7aWYodGhpcy5fX2Upe3ZhciB1PWM7Yz12b2lkIDAsZihuLHQsciksYz11fWUmJmUuY2FsbCh0aGlzLG4sdCxyKX0sci5zaG91bGRDb21wb25lbnRVcGRhdGU9Zn1yZXR1cm4gby5fX058fG8uX199ZnVuY3Rpb24geShuLHUpe3ZhciBpPXAodCsrLDMpOyFjLl9fcyYmQyhpLl9fSCx1KSYmKGkuX189bixpLnU9dSxyLl9fSC5fX2gucHVzaChpKSl9ZnVuY3Rpb24gXyhuLHUpe3ZhciBpPXAodCsrLDQpOyFjLl9fcyYmQyhpLl9fSCx1KSYmKGkuX189bixpLnU9dSxyLl9faC5wdXNoKGkpKX1mdW5jdGlvbiBBKG4pe3JldHVybiBvPTUsVChmdW5jdGlvbigpe3JldHVybntjdXJyZW50Om59fSxbXSl9ZnVuY3Rpb24gRihuLHQscil7bz02LF8oZnVuY3Rpb24oKXtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBuKXt2YXIgcj1uKHQoKSk7cmV0dXJuIGZ1bmN0aW9uKCl7bihudWxsKSxyJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiByJiZyKCl9fWlmKG4pcmV0dXJuIG4uY3VycmVudD10KCksZnVuY3Rpb24oKXtyZXR1cm4gbi5jdXJyZW50PW51bGx9fSxudWxsPT1yP3I6ci5jb25jYXQobikpfWZ1bmN0aW9uIFQobixyKXt2YXIgdT1wKHQrKyw3KTtyZXR1cm4gQyh1Ll9fSCxyKSYmKHUuX189bigpLHUuX19IPXIsdS5fX2g9biksdS5fX31mdW5jdGlvbiBxKG4sdCl7cmV0dXJuIG89OCxUKGZ1bmN0aW9uKCl7cmV0dXJuIG59LHQpfWZ1bmN0aW9uIHgobil7dmFyIHU9ci5jb250ZXh0W24uX19jXSxpPXAodCsrLDkpO3JldHVybiBpLmM9bix1PyhudWxsPT1pLl9fJiYoaS5fXz0hMCx1LnN1YihyKSksdS5wcm9wcy52YWx1ZSk6bi5fX31mdW5jdGlvbiBQKG4sdCl7Yy51c2VEZWJ1Z1ZhbHVlJiZjLnVzZURlYnVnVmFsdWUodD90KG4pOm4pfWZ1bmN0aW9uIGIobil7dmFyIHU9cCh0KyssMTApLGk9ZCgpO3JldHVybiB1Ll9fPW4sci5jb21wb25lbnREaWRDYXRjaHx8KHIuY29tcG9uZW50RGlkQ2F0Y2g9ZnVuY3Rpb24obix0KXt1Ll9fJiZ1Ll9fKG4sdCksaVsxXShuKX0pLFtpWzBdLGZ1bmN0aW9uKCl7aVsxXSh2b2lkIDApfV19ZnVuY3Rpb24gZygpe3ZhciBuPXAodCsrLDExKTtpZighbi5fXyl7Zm9yKHZhciB1PXIuX192O251bGwhPT11JiYhdS5fX20mJm51bGwhPT11Ll9fOyl1PXUuX187dmFyIGk9dS5fX218fCh1Ll9fbT1bMCwwXSk7bi5fXz1cIlBcIitpWzBdK1wiLVwiK2lbMV0rK31yZXR1cm4gbi5fX31mdW5jdGlvbiBqKCl7Zm9yKHZhciBuO249Zi5zaGlmdCgpOyl7dmFyIHQ9bi5fX0g7aWYobi5fX1AmJnQpdHJ5e3QuX19oLnNvbWUoeiksdC5fX2guc29tZShCKSx0Ll9faD1bXX1jYXRjaChyKXt0Ll9faD1bXSxjLl9fZShyLG4uX192KX19fWMuX19iPWZ1bmN0aW9uKG4pe3I9bnVsbCxlJiZlKG4pfSxjLl9fPWZ1bmN0aW9uKG4sdCl7biYmdC5fX2smJnQuX19rLl9fbSYmKG4uX19tPXQuX19rLl9fbSkscyYmcyhuLHQpfSxjLl9fcj1mdW5jdGlvbihuKXthJiZhKG4pLHQ9MDt2YXIgaT0ocj1uLl9fYykuX19IO2kmJih1PT09cj8oaS5fX2g9W10sci5fX2g9W10saS5fXy5zb21lKGZ1bmN0aW9uKG4pe24uX19OJiYobi5fXz1uLl9fTiksbi51PW4uX19OPXZvaWQgMH0pKTooaS5fX2guc29tZSh6KSxpLl9faC5zb21lKEIpLGkuX19oPVtdLHQ9MCkpLHU9cn0sYy5kaWZmZWQ9ZnVuY3Rpb24obil7diYmdihuKTt2YXIgdD1uLl9fYzt0JiZ0Ll9fSCYmKHQuX19ILl9faC5sZW5ndGgmJigxIT09Zi5wdXNoKHQpJiZpPT09Yy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWV8fCgoaT1jLnJlcXVlc3RBbmltYXRpb25GcmFtZSl8fHcpKGopKSx0Ll9fSC5fXy5zb21lKGZ1bmN0aW9uKG4pe24udSYmKG4uX19IPW4udSksbi51PXZvaWQgMH0pKSx1PXI9bnVsbH0sYy5fX2M9ZnVuY3Rpb24obix0KXt0LnNvbWUoZnVuY3Rpb24obil7dHJ5e24uX19oLnNvbWUoeiksbi5fX2g9bi5fX2guZmlsdGVyKGZ1bmN0aW9uKG4pe3JldHVybiFuLl9ffHxCKG4pfSl9Y2F0Y2gocil7dC5zb21lKGZ1bmN0aW9uKG4pe24uX19oJiYobi5fX2g9W10pfSksdD1bXSxjLl9fZShyLG4uX192KX19KSxsJiZsKG4sdCl9LGMudW5tb3VudD1mdW5jdGlvbihuKXttJiZtKG4pO3ZhciB0LHI9bi5fX2M7ciYmci5fX0gmJihyLl9fSC5fXy5zb21lKGZ1bmN0aW9uKG4pe3RyeXt6KG4pfWNhdGNoKG4pe3Q9bn19KSxyLl9fSD12b2lkIDAsdCYmYy5fX2UodCxyLl9fdikpfTt2YXIgaz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1ZXN0QW5pbWF0aW9uRnJhbWU7ZnVuY3Rpb24gdyhuKXt2YXIgdCxyPWZ1bmN0aW9uKCl7Y2xlYXJUaW1lb3V0KHUpLGsmJmNhbmNlbEFuaW1hdGlvbkZyYW1lKHQpLHNldFRpbWVvdXQobil9LHU9c2V0VGltZW91dChyLDM1KTtrJiYodD1yZXF1ZXN0QW5pbWF0aW9uRnJhbWUocikpfWZ1bmN0aW9uIHoobil7dmFyIHQ9cix1PW4uX19jO1wiZnVuY3Rpb25cIj09dHlwZW9mIHUmJihuLl9fYz12b2lkIDAsdSgpKSxyPXR9ZnVuY3Rpb24gQihuKXt2YXIgdD1yO24uX19jPW4uX18oKSxyPXR9ZnVuY3Rpb24gQyhuLHQpe3JldHVybiFufHxuLmxlbmd0aCE9PXQubGVuZ3RofHx0LnNvbWUoZnVuY3Rpb24odCxyKXtyZXR1cm4gdCE9PW5bcl19KX1mdW5jdGlvbiBEKG4sdCl7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2YgdD90KG4pOnR9ZXhwb3J0e3EgYXMgdXNlQ2FsbGJhY2sseCBhcyB1c2VDb250ZXh0LFAgYXMgdXNlRGVidWdWYWx1ZSx5IGFzIHVzZUVmZmVjdCxiIGFzIHVzZUVycm9yQm91bmRhcnksZyBhcyB1c2VJZCxGIGFzIHVzZUltcGVyYXRpdmVIYW5kbGUsXyBhcyB1c2VMYXlvdXRFZmZlY3QsVCBhcyB1c2VNZW1vLGggYXMgdXNlUmVkdWNlcixBIGFzIHVzZVJlZixkIGFzIHVzZVN0YXRlfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWhvb2tzLm1vZHVsZS5qcy5tYXBcbiIsImltcG9ydHtvcHRpb25zIGFzIHIsRnJhZ21lbnQgYXMgZX1mcm9tXCJwcmVhY3RcIjtleHBvcnR7RnJhZ21lbnR9ZnJvbVwicHJlYWN0XCI7dmFyIHQ9L1tcIiY8XS87ZnVuY3Rpb24gbihyKXtpZigwPT09ci5sZW5ndGh8fCExPT09dC50ZXN0KHIpKXJldHVybiByO2Zvcih2YXIgZT0wLG49MCxvPVwiXCIsZj1cIlwiO248ci5sZW5ndGg7bisrKXtzd2l0Y2goci5jaGFyQ29kZUF0KG4pKXtjYXNlIDM0OmY9XCImcXVvdDtcIjticmVhaztjYXNlIDM4OmY9XCImYW1wO1wiO2JyZWFrO2Nhc2UgNjA6Zj1cIiZsdDtcIjticmVhaztkZWZhdWx0OmNvbnRpbnVlfW4hPT1lJiYobys9ci5zbGljZShlLG4pKSxvKz1mLGU9bisxfXJldHVybiBuIT09ZSYmKG8rPXIuc2xpY2UoZSxuKSksb312YXIgbz0vYWNpdHxleCg/OnN8Z3xufHB8JCl8cnBofGdyaWR8b3dzfG1uY3xudHd8aW5lW2NoXXx6b298Xm9yZHxpdGVyYS9pLGY9MCxpPUFycmF5LmlzQXJyYXk7ZnVuY3Rpb24gdShlLHQsbixvLGksdSl7dHx8KHQ9e30pO3ZhciBhLGMscD10O2lmKFwicmVmXCJpbiBwKWZvcihjIGluIHA9e30sdClcInJlZlwiPT1jP2E9dFtjXTpwW2NdPXRbY107dmFyIGw9e3R5cGU6ZSxwcm9wczpwLGtleTpuLHJlZjphLF9fazpudWxsLF9fOm51bGwsX19iOjAsX19lOm51bGwsX19jOm51bGwsY29uc3RydWN0b3I6dm9pZCAwLF9fdjotLWYsX19pOi0xLF9fdTowLF9fc291cmNlOmksX19zZWxmOnV9O2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGUmJihhPWUuZGVmYXVsdFByb3BzKSlmb3IoYyBpbiBhKXZvaWQgMD09PXBbY10mJihwW2NdPWFbY10pO3JldHVybiByLnZub2RlJiZyLnZub2RlKGwpLGx9ZnVuY3Rpb24gYShyKXt2YXIgdD11KGUse3RwbDpyLGV4cHJzOltdLnNsaWNlLmNhbGwoYXJndW1lbnRzLDEpfSk7cmV0dXJuIHQua2V5PXQuX192LHR9dmFyIGM9e30scD0vW0EtWl0vZztmdW5jdGlvbiBsKGUsdCl7aWYoci5hdHRyKXt2YXIgZj1yLmF0dHIoZSx0KTtpZihcInN0cmluZ1wiPT10eXBlb2YgZilyZXR1cm4gZn1pZih0PWZ1bmN0aW9uKHIpe3JldHVybiBudWxsIT09ciYmXCJvYmplY3RcIj09dHlwZW9mIHImJlwiZnVuY3Rpb25cIj09dHlwZW9mIHIudmFsdWVPZj9yLnZhbHVlT2YoKTpyfSh0KSxcInJlZlwiPT09ZXx8XCJrZXlcIj09PWUpcmV0dXJuXCJcIjtpZihcInN0eWxlXCI9PT1lJiZcIm9iamVjdFwiPT10eXBlb2YgdCl7dmFyIGk9XCJcIjtmb3IodmFyIHUgaW4gdCl7dmFyIGE9dFt1XTtpZihudWxsIT1hJiZcIlwiIT09YSl7dmFyIGw9XCItXCI9PXVbMF0/dTpjW3VdfHwoY1t1XT11LnJlcGxhY2UocCxcIi0kJlwiKS50b0xvd2VyQ2FzZSgpKSxzPVwiO1wiO1wibnVtYmVyXCIhPXR5cGVvZiBhfHxsLnN0YXJ0c1dpdGgoXCItLVwiKXx8by50ZXN0KGwpfHwocz1cInB4O1wiKSxpPWkrbCtcIjpcIithK3N9fXJldHVybiBlKyc9XCInK24oaSkrJ1wiJ31yZXR1cm4gbnVsbD09dHx8ITE9PT10fHxcImZ1bmN0aW9uXCI9PXR5cGVvZiB0fHxcIm9iamVjdFwiPT10eXBlb2YgdD9cIlwiOiEwPT09dD9lOmUrJz1cIicrbihcIlwiK3QpKydcIid9ZnVuY3Rpb24gcyhyKXtpZihudWxsPT1yfHxcImJvb2xlYW5cIj09dHlwZW9mIHJ8fFwiZnVuY3Rpb25cIj09dHlwZW9mIHIpcmV0dXJuIG51bGw7aWYoXCJvYmplY3RcIj09dHlwZW9mIHIpe2lmKHZvaWQgMD09PXIuY29uc3RydWN0b3IpcmV0dXJuIHI7aWYoaShyKSl7Zm9yKHZhciBlPTA7ZTxyLmxlbmd0aDtlKyspcltlXT1zKHJbZV0pO3JldHVybiByfX1yZXR1cm4gbihcIlwiK3IpfWV4cG9ydHt1IGFzIGpzeCxsIGFzIGpzeEF0dHIsdSBhcyBqc3hERVYscyBhcyBqc3hFc2NhcGUsYSBhcyBqc3hUZW1wbGF0ZSx1IGFzIGpzeHN9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9anN4UnVudGltZS5tb2R1bGUuanMubWFwXG4iLCJpbXBvcnQgeyBjcmVhdGVDb250ZXh0IH0gZnJvbSAncHJlYWN0J1xuaW1wb3J0IHsgdXNlQ29udGV4dCB9IGZyb20gJ3ByZWFjdC9ob29rcydcbmltcG9ydCB0eXBlIHsgU2V0dGluZ3NTdG9yZSB9IGZyb20gJy4uLy4uL2FwcGxpY2F0aW9uL3NldHRpbmdzL3NldHRpbmdzU3RvcmUnXG5cbmNvbnN0IFNldHRpbmdzQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQ8U2V0dGluZ3NTdG9yZSB8IG51bGw+KG51bGwpXG5cbmludGVyZmFjZSBTZXR0aW5nc1Byb3ZpZGVyUHJvcHMge1xuICBzZXR0aW5nczogU2V0dGluZ3NTdG9yZVxuICBjaGlsZHJlbjogcHJlYWN0LkNvbXBvbmVudENoaWxkcmVuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTZXR0aW5nc1Byb3ZpZGVyKHsgc2V0dGluZ3MsIGNoaWxkcmVuIH06IFNldHRpbmdzUHJvdmlkZXJQcm9wcykge1xuICByZXR1cm4gPFNldHRpbmdzQ29udGV4dC5Qcm92aWRlciB2YWx1ZT17c2V0dGluZ3N9PntjaGlsZHJlbn08L1NldHRpbmdzQ29udGV4dC5Qcm92aWRlcj5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZVNldHRpbmdzKCk6IFNldHRpbmdzU3RvcmUge1xuICBjb25zdCBzZXR0aW5ncyA9IHVzZUNvbnRleHQoU2V0dGluZ3NDb250ZXh0KVxuICAvKiB2OCBpZ25vcmUgbmV4dCAzICovXG4gIGlmICghc2V0dGluZ3MpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3VzZVNldHRpbmdzIG11c3QgYmUgdXNlZCB3aXRoaW4gYSBTZXR0aW5nc1Byb3ZpZGVyJylcbiAgfVxuICByZXR1cm4gc2V0dGluZ3Ncbn1cbiIsIi8vIFBhcmFsbGF4IGNhbWVyYSBhbmdsZXMgaW4gZGVncmVlc1xuZXhwb3J0IGVudW0gUGFyYWxsYXgge1xuICBPdmVyaGVhZCA9IDAsXG4gIFNsaWdodF8yMCA9IDIwLFxuICBTbGlnaHRfMzAgPSAzMCxcbiAgTWVkaXVtXzQwID0gNDAsXG4gIE1lZGl1bV81MCA9IDUwLFxuICBTdHJvbmdfNjAgPSA2MCxcbiAgU3Ryb25nXzY1ID0gNjUsXG4gIFN0cm9uZ183MCA9IDcwLFxuICBFeHRyZW1lXzgwID0gODAsXG59XG5cbi8vIEhvdmVyIG1vZGUgb3NjaWxsYXRpb24gc2NhbGVzXG5leHBvcnQgZW51bSBIb3Zlck1vZGUge1xuICBPZmYgPSAnb2ZmJyxcbiAgU21hbGwgPSAnc21hbGwnLFxuICBMYXJnZSA9ICdsYXJnZScsXG4gIFN1cGVyID0gJ3N1cGVyJyxcbn1cblxuLy8gUGllY2UgdmlzdWFsIHN0eWxlc1xuZXhwb3J0IGVudW0gUGllY2VTdHlsZSB7XG4gIEljb25zID0gJ2ljb25zJyxcbiAgVGhyZWVEID0gJzNkJyxcbiAgQ2hlY2tlciA9ICdjaGVja2VyJyxcbiAgQ2hlY2tlckdyZXkgPSAnY2hlY2tlci1ncmV5JyxcbiAgQmxpbmRmb2xkID0gJ2JsaW5kZm9sZCcsXG59XG5cbi8vIEJsdXIgYW1vdW50cyBpbiBwaXhlbHNcbmV4cG9ydCBlbnVtIEJsdXIge1xuICBOb25lID0gMCxcbiAgU2xpZ2h0XzEgPSAxLFxuICBTbGlnaHRfMiA9IDIsXG4gIE1lZGl1bV8zID0gMyxcbiAgTWVkaXVtXzQgPSA0LFxuICBIZWF2eV82ID0gNixcbiAgSGVhdnlfOCA9IDgsXG59XG5cbi8vIEJsYWNrIHNlZ21lbnRzIHF1YWRyYW50IGNvdmVyYWdlXG5leHBvcnQgZW51bSBCbGFja1NlZ21lbnRzIHtcbiAgTm9uZSA9ICdub25lJyxcbiAgT25lUXVhcnRlciA9ICcxLzQnLFxuICBIYWxmID0gJzEvMicsXG4gIFRocmVlUXVhcnRlcnMgPSAnMy80JyxcbiAgQWxsID0gJzQvNCcsXG59XG5cbi8vIEJsYWNrIHNlZ21lbnRzIHJvdGF0aW9uIHRpbWluZ1xuZXhwb3J0IGVudW0gQmxhY2tTZWdtZW50c1RpbWluZyB7XG4gIFJvdGF0ZTEwcyA9ICdyb3RhdGUtMTBzJyxcbiAgUm90YXRlMzBzID0gJ3JvdGF0ZS0zMHMnLFxuICBSb3RhdGU2MHMgPSAncm90YXRlLTYwcycsXG4gIERvbnRSb3RhdGUgPSAnZG9udC1yb3RhdGUnLFxufVxuXG4vLyBGbGFzaCBkdXJhdGlvbiBpbiBtaWxsaXNlY29uZHNcbmV4cG9ydCBlbnVtIEZsYXNoRHVyYXRpb24ge1xuICBNczEwMCA9IDEwMCxcbiAgTXMzMDAgPSAzMDAsXG4gIE1zNTAwID0gNTAwLFxuICBNczEwMDAgPSAxMDAwLFxuICBNczIwMDAgPSAyMDAwLFxufVxuXG4vLyBGbGFzaCBpbnRlcnZhbCBpbiBzZWNvbmRzXG5leHBvcnQgZW51bSBGbGFzaEludGVydmFsIHtcbiAgU2VjMF8zID0gMC4zLFxuICBTZWMwXzUgPSAwLjUsXG4gIFNlYzEgPSAxLFxuICBTZWMzID0gMyxcbiAgU2VjNSA9IDUsXG4gIFNlYzEwID0gMTAsXG4gIFNlYzMwID0gMzAsXG4gIFNlYzYwID0gNjAsXG59XG5cbi8vIEhlbHBlciBmdW5jdGlvbnMgdG8gZ2V0IGFsbCB2YWx1ZXMgYXMgYXJyYXlzIGZvciBTZXR0aW5nQnV0dG9uIG9wdGlvbnNcbmV4cG9ydCBjb25zdCBQQVJBTExBWF9PUFRJT05TID0gT2JqZWN0LnZhbHVlcyhQYXJhbGxheCkuZmlsdGVyKFxuICAodikgPT4gdHlwZW9mIHYgPT09ICdudW1iZXInXG4pIGFzIG51bWJlcltdXG5cbmV4cG9ydCBjb25zdCBIT1ZFUl9NT0RFX09QVElPTlMgPSBPYmplY3QudmFsdWVzKEhvdmVyTW9kZSkuZmlsdGVyKFxuICAodikgPT4gdHlwZW9mIHYgPT09ICdzdHJpbmcnXG4pIGFzIHN0cmluZ1tdXG5cbmV4cG9ydCBjb25zdCBQSUVDRV9TVFlMRV9PUFRJT05TID0gT2JqZWN0LnZhbHVlcyhQaWVjZVN0eWxlKS5maWx0ZXIoXG4gICh2KSA9PiB0eXBlb2YgdiA9PT0gJ3N0cmluZydcbikgYXMgc3RyaW5nW11cblxuZXhwb3J0IGNvbnN0IEJMVVJfT1BUSU9OUyA9IE9iamVjdC52YWx1ZXMoQmx1cikuZmlsdGVyKCh2KSA9PiB0eXBlb2YgdiA9PT0gJ251bWJlcicpIGFzIG51bWJlcltdXG5cbmV4cG9ydCBjb25zdCBCTEFDS19TRUdNRU5UU19PUFRJT05TID0gT2JqZWN0LnZhbHVlcyhCbGFja1NlZ21lbnRzKS5maWx0ZXIoXG4gICh2KSA9PiB0eXBlb2YgdiA9PT0gJ3N0cmluZydcbikgYXMgc3RyaW5nW11cblxuZXhwb3J0IGNvbnN0IEJMQUNLX1NFR01FTlRTX1RJTUlOR19PUFRJT05TID0gT2JqZWN0LnZhbHVlcyhCbGFja1NlZ21lbnRzVGltaW5nKS5maWx0ZXIoXG4gICh2KSA9PiB0eXBlb2YgdiA9PT0gJ3N0cmluZydcbikgYXMgc3RyaW5nW11cblxuZXhwb3J0IGNvbnN0IEZMQVNIX0RVUkFUSU9OX09QVElPTlMgPSBPYmplY3QudmFsdWVzKEZsYXNoRHVyYXRpb24pLmZpbHRlcihcbiAgKHYpID0+IHR5cGVvZiB2ID09PSAnbnVtYmVyJ1xuKSBhcyBudW1iZXJbXVxuXG5leHBvcnQgY29uc3QgRkxBU0hfSU5URVJWQUxfT1BUSU9OUyA9IE9iamVjdC52YWx1ZXMoRmxhc2hJbnRlcnZhbCkuZmlsdGVyKFxuICAodikgPT4gdHlwZW9mIHYgPT09ICdudW1iZXInXG4pIGFzIG51bWJlcltdXG4iLCJpbnRlcmZhY2UgQWN0aW9uQnV0dG9uUHJvcHMge1xuICBsYWJlbDogc3RyaW5nXG4gIG9uQ2xpY2s6ICgpID0+IHZvaWRcbn1cblxuY29uc3QgYnV0dG9uU3R5bGUgPSB7XG4gIG1hcmdpbjogJzRweCcsXG4gIHBhZGRpbmc6ICc2cHggMTJweCcsXG4gIGJvcmRlcjogJzFweCBzb2xpZCBjdXJyZW50Q29sb3InLFxuICBib3JkZXJSYWRpdXM6ICc0cHgnLFxuICBiYWNrZ3JvdW5kQ29sb3I6ICd0cmFuc3BhcmVudCcsXG4gIGNvbG9yOiAnaW5oZXJpdCcsXG4gIGN1cnNvcjogJ3BvaW50ZXInLFxuICBmb250U2l6ZTogJzE0cHgnLFxufVxuXG5leHBvcnQgZnVuY3Rpb24gQWN0aW9uQnV0dG9uKHsgbGFiZWwsIG9uQ2xpY2sgfTogQWN0aW9uQnV0dG9uUHJvcHMpIHtcbiAgY29uc3QgaGFuZGxlQ2xpY2sgPSAoZTogRXZlbnQpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgb25DbGljaygpXG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxidXR0b24gb25DbGljaz17aGFuZGxlQ2xpY2t9IHR5cGU9XCJidXR0b25cIiBzdHlsZT17YnV0dG9uU3R5bGV9PlxuICAgICAge2xhYmVsfVxuICAgIDwvYnV0dG9uPlxuICApXG59XG4iLCJpbXBvcnQgdHlwZSB7IFNpZ25hbCB9IGZyb20gJ0BwcmVhY3Qvc2lnbmFscydcbmltcG9ydCB0eXBlIHsgQ29tcG9uZW50Q2hpbGRyZW4gfSBmcm9tICdwcmVhY3QnXG5cbmludGVyZmFjZSBCdXR0b25Sb3dQcm9wcyB7XG4gIGNoaWxkcmVuOiBDb21wb25lbnRDaGlsZHJlblxuICB2aXNpYmxlPzogU2lnbmFsPGJvb2xlYW4+XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBCdXR0b25Sb3coeyBjaGlsZHJlbiwgdmlzaWJsZSB9OiBCdXR0b25Sb3dQcm9wcykge1xuICBpZiAodmlzaWJsZSAmJiAhdmlzaWJsZS52YWx1ZSkge1xuICAgIHJldHVybiBudWxsXG4gIH1cblxuICByZXR1cm4gPGRpdj57Y2hpbGRyZW59PC9kaXY+XG59XG4iLCJpbXBvcnQgdHlwZSB7IENvbXBvbmVudENoaWxkcmVuIH0gZnJvbSAncHJlYWN0J1xuXG5pbnRlcmZhY2UgQ29uZGl0aW9uYWxDb250cm9sc1Byb3BzIHtcbiAgY29uZGl0aW9uOiBib29sZWFuXG4gIGNoaWxkcmVuOiBDb21wb25lbnRDaGlsZHJlblxufVxuXG5leHBvcnQgZnVuY3Rpb24gQ29uZGl0aW9uYWxDb250cm9scyh7IGNvbmRpdGlvbiwgY2hpbGRyZW4gfTogQ29uZGl0aW9uYWxDb250cm9sc1Byb3BzKSB7XG4gIGlmICghY29uZGl0aW9uKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIHJldHVybiA8ZGl2IHN0eWxlPXt7IG1hcmdpbkxlZnQ6ICcxNnB4JyB9fT57Y2hpbGRyZW59PC9kaXY+XG59XG4iLCJpbXBvcnR7Q29tcG9uZW50IGFzIGksb3B0aW9ucyBhcyByLGlzVmFsaWRFbGVtZW50IGFzIG59ZnJvbVwicHJlYWN0XCI7aW1wb3J0e3VzZU1lbW8gYXMgdCx1c2VSZWYgYXMgZix1c2VFZmZlY3QgYXMgb31mcm9tXCJwcmVhY3QvaG9va3NcIjtpbXBvcnR7U2lnbmFsIGFzIGUsY29tcHV0ZWQgYXMgdSxzaWduYWwgYXMgYSxlZmZlY3QgYXMgY31mcm9tXCJAcHJlYWN0L3NpZ25hbHMtY29yZVwiO2V4cG9ydHtTaWduYWwsYmF0Y2gsY29tcHV0ZWQsZWZmZWN0LHNpZ25hbCx1bnRyYWNrZWR9ZnJvbVwiQHByZWFjdC9zaWduYWxzLWNvcmVcIjt2YXIgdixzO2Z1bmN0aW9uIGwoaSxuKXtyW2ldPW4uYmluZChudWxsLHJbaV18fGZ1bmN0aW9uKCl7fSl9ZnVuY3Rpb24gZChpKXtpZihzKXt2YXIgcj1zO3M9dm9pZCAwO3IoKX1zPWkmJmkuUygpfWZ1bmN0aW9uIGgoaSl7dmFyIHI9dGhpcyxmPWkuZGF0YSxvPXVzZVNpZ25hbChmKTtvLnZhbHVlPWY7dmFyIGU9dChmdW5jdGlvbigpe3ZhciBpPXIuX192O3doaWxlKGk9aS5fXylpZihpLl9fYyl7aS5fX2MuX18kZnw9NDticmVha31yLl9fJHUuYz1mdW5jdGlvbigpe3ZhciBpLHQ9ci5fXyR1LlMoKSxmPWUudmFsdWU7dCgpO2lmKG4oZil8fDMhPT0obnVsbD09KGk9ci5iYXNlKT92b2lkIDA6aS5ub2RlVHlwZSkpe3IuX18kZnw9MTtyLnNldFN0YXRlKHt9KX1lbHNlIHIuYmFzZS5kYXRhPWZ9O3JldHVybiB1KGZ1bmN0aW9uKCl7dmFyIGk9by52YWx1ZS52YWx1ZTtyZXR1cm4gMD09PWk/MDohMD09PWk/XCJcIjppfHxcIlwifSl9LFtdKTtyZXR1cm4gZS52YWx1ZX1oLmRpc3BsYXlOYW1lPVwiX3N0XCI7T2JqZWN0LmRlZmluZVByb3BlcnRpZXMoZS5wcm90b3R5cGUse2NvbnN0cnVjdG9yOntjb25maWd1cmFibGU6ITAsdmFsdWU6dm9pZCAwfSx0eXBlOntjb25maWd1cmFibGU6ITAsdmFsdWU6aH0scHJvcHM6e2NvbmZpZ3VyYWJsZTohMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm57ZGF0YTp0aGlzfX19LF9fYjp7Y29uZmlndXJhYmxlOiEwLHZhbHVlOjF9fSk7bChcIl9fYlwiLGZ1bmN0aW9uKGkscil7aWYoXCJzdHJpbmdcIj09dHlwZW9mIHIudHlwZSl7dmFyIG4sdD1yLnByb3BzO2Zvcih2YXIgZiBpbiB0KWlmKFwiY2hpbGRyZW5cIiE9PWYpe3ZhciBvPXRbZl07aWYobyBpbnN0YW5jZW9mIGUpe2lmKCFuKXIuX19ucD1uPXt9O25bZl09bzt0W2ZdPW8ucGVlaygpfX19aShyKX0pO2woXCJfX3JcIixmdW5jdGlvbihpLHIpe2kocik7ZCgpO3ZhciBuLHQ9ci5fX2M7aWYodCl7dC5fXyRmJj0tMjtpZih2b2lkIDA9PT0obj10Ll9fJHUpKXQuX18kdT1uPWZ1bmN0aW9uKGkpe3ZhciByO2MoZnVuY3Rpb24oKXtyPXRoaXN9KTtyLmM9ZnVuY3Rpb24oKXt0Ll9fJGZ8PTE7dC5zZXRTdGF0ZSh7fSl9O3JldHVybiByfSgpfXY9dDtkKG4pfSk7bChcIl9fZVwiLGZ1bmN0aW9uKGkscixuLHQpe2QoKTt2PXZvaWQgMDtpKHIsbix0KX0pO2woXCJkaWZmZWRcIixmdW5jdGlvbihpLHIpe2QoKTt2PXZvaWQgMDt2YXIgbjtpZihcInN0cmluZ1wiPT10eXBlb2Ygci50eXBlJiYobj1yLl9fZSkpe3ZhciB0PXIuX19ucCxmPXIucHJvcHM7aWYodCl7dmFyIG89bi5VO2lmKG8pZm9yKHZhciBlIGluIG8pe3ZhciB1PW9bZV07aWYodm9pZCAwIT09dSYmIShlIGluIHQpKXt1LmQoKTtvW2VdPXZvaWQgMH19ZWxzZSBuLlU9bz17fTtmb3IodmFyIGEgaW4gdCl7dmFyIGM9b1thXSxzPXRbYV07aWYodm9pZCAwPT09Yyl7Yz1wKG4sYSxzLGYpO29bYV09Y31lbHNlIGMubyhzLGYpfX19aShyKX0pO2Z1bmN0aW9uIHAoaSxyLG4sdCl7dmFyIGY9ciBpbiBpJiZ2b2lkIDA9PT1pLm93bmVyU1ZHRWxlbWVudCxvPWEobik7cmV0dXJue286ZnVuY3Rpb24oaSxyKXtvLnZhbHVlPWk7dD1yfSxkOmMoZnVuY3Rpb24oKXt2YXIgbj1vLnZhbHVlLnZhbHVlO2lmKHRbcl0hPT1uKXt0W3JdPW47aWYoZilpW3JdPW47ZWxzZSBpZihuKWkuc2V0QXR0cmlidXRlKHIsbik7ZWxzZSBpLnJlbW92ZUF0dHJpYnV0ZShyKX19KX19bChcInVubW91bnRcIixmdW5jdGlvbihpLHIpe2lmKFwic3RyaW5nXCI9PXR5cGVvZiByLnR5cGUpe3ZhciBuPXIuX19lO2lmKG4pe3ZhciB0PW4uVTtpZih0KXtuLlU9dm9pZCAwO2Zvcih2YXIgZiBpbiB0KXt2YXIgbz10W2ZdO2lmKG8pby5kKCl9fX19ZWxzZXt2YXIgZT1yLl9fYztpZihlKXt2YXIgdT1lLl9fJHU7aWYodSl7ZS5fXyR1PXZvaWQgMDt1LmQoKX19fWkocil9KTtsKFwiX19oXCIsZnVuY3Rpb24oaSxyLG4sdCl7aWYodDwzfHw5PT09dClyLl9fJGZ8PTI7aShyLG4sdCl9KTtpLnByb3RvdHlwZS5zaG91bGRDb21wb25lbnRVcGRhdGU9ZnVuY3Rpb24oaSxyKXtpZih0aGlzLl9fUilyZXR1cm4hMDt2YXIgbj10aGlzLl9fJHUsdD1uJiZ2b2lkIDAhPT1uLnM7Zm9yKHZhciBmIGluIHIpcmV0dXJuITA7aWYodGhpcy5fX2Z8fFwiYm9vbGVhblwiPT10eXBlb2YgdGhpcy51JiYhMD09PXRoaXMudSl7aWYoISh0fHwyJnRoaXMuX18kZnx8NCZ0aGlzLl9fJGYpKXJldHVybiEwO2lmKDEmdGhpcy5fXyRmKXJldHVybiEwfWVsc2V7aWYoISh0fHw0JnRoaXMuX18kZikpcmV0dXJuITA7aWYoMyZ0aGlzLl9fJGYpcmV0dXJuITB9Zm9yKHZhciBvIGluIGkpaWYoXCJfX3NvdXJjZVwiIT09byYmaVtvXSE9PXRoaXMucHJvcHNbb10pcmV0dXJuITA7Zm9yKHZhciBlIGluIHRoaXMucHJvcHMpaWYoIShlIGluIGkpKXJldHVybiEwO3JldHVybiExfTtmdW5jdGlvbiB1c2VTaWduYWwoaSl7cmV0dXJuIHQoZnVuY3Rpb24oKXtyZXR1cm4gYShpKX0sW10pfWZ1bmN0aW9uIHVzZUNvbXB1dGVkKGkpe3ZhciByPWYoaSk7ci5jdXJyZW50PWk7di5fXyRmfD00O3JldHVybiB0KGZ1bmN0aW9uKCl7cmV0dXJuIHUoZnVuY3Rpb24oKXtyZXR1cm4gci5jdXJyZW50KCl9KX0sW10pfWZ1bmN0aW9uIHVzZVNpZ25hbEVmZmVjdChpKXt2YXIgcj1mKGkpO3IuY3VycmVudD1pO28oZnVuY3Rpb24oKXtyZXR1cm4gYyhmdW5jdGlvbigpe3JldHVybiByLmN1cnJlbnQoKX0pfSxbXSl9ZXhwb3J0e3VzZUNvbXB1dGVkLHVzZVNpZ25hbCx1c2VTaWduYWxFZmZlY3R9Oy8vIyBzb3VyY2VNYXBwaW5nVVJMPXNpZ25hbHMubW9kdWxlLmpzLm1hcFxuIiwiaW1wb3J0IHR5cGUgeyBTaWduYWwgfSBmcm9tICdAcHJlYWN0L3NpZ25hbHMnXG5pbXBvcnQgeyB1c2VTaWduYWwgfSBmcm9tICdAcHJlYWN0L3NpZ25hbHMnXG5pbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tICdwcmVhY3QvaG9va3MnXG5cbmludGVyZmFjZSBTZXR0aW5nQnV0dG9uUHJvcHM8VD4ge1xuICBsYWJlbDogc3RyaW5nXG4gIHNldHRpbmc6IFNpZ25hbDxUPlxuICBvcHRpb25zOiByZWFkb25seSBUW11cbn1cblxuY29uc3QgYnV0dG9uU3R5bGUgPSB7XG4gIG1hcmdpbjogJzRweCcsXG4gIHBhZGRpbmc6ICc2cHggMTJweCcsXG4gIGJvcmRlcjogJzFweCBzb2xpZCBjdXJyZW50Q29sb3InLFxuICBib3JkZXJSYWRpdXM6ICc0cHgnLFxuICBiYWNrZ3JvdW5kQ29sb3I6ICd0cmFuc3BhcmVudCcsXG4gIGNvbG9yOiAnaW5oZXJpdCcsXG4gIGN1cnNvcjogJ3BvaW50ZXInLFxuICBmb250U2l6ZTogJzE0cHgnLFxufVxuXG5leHBvcnQgZnVuY3Rpb24gU2V0dGluZ0J1dHRvbjxUPih7IGxhYmVsLCBzZXR0aW5nLCBvcHRpb25zIH06IFNldHRpbmdCdXR0b25Qcm9wczxUPikge1xuICAvLyBDcmVhdGUgYSBsb2NhbCBzaWduYWwgdGhhdCBtaXJyb3JzIHRoZSBleHRlcm5hbCBzaWduYWxcbiAgY29uc3QgbG9jYWxWYWx1ZSA9IHVzZVNpZ25hbChzZXR0aW5nLnZhbHVlKVxuXG4gIC8vIFN1YnNjcmliZSB0byBzaWduYWwgY2hhbmdlcyB1c2luZyBlZmZlY3Qgd2l0aCBzZXR0aW5nIGFzIGRlcGVuZGVuY3lcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCB1bnN1YnNjcmliZSA9IHNldHRpbmcuc3Vic2NyaWJlKCh2YWx1ZSkgPT4ge1xuICAgICAgbG9jYWxWYWx1ZS52YWx1ZSA9IHZhbHVlXG4gICAgfSlcbiAgICByZXR1cm4gdW5zdWJzY3JpYmVcbiAgfSwgW3NldHRpbmcsIGxvY2FsVmFsdWVdKVxuXG4gIGNvbnN0IGhhbmRsZUNsaWNrID0gKGU6IEV2ZW50KSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuXG4gICAgY29uc3QgY3VycmVudEluZGV4ID0gb3B0aW9ucy5pbmRleE9mKHNldHRpbmcudmFsdWUpXG4gICAgY29uc3QgbmV4dEluZGV4ID0gKGN1cnJlbnRJbmRleCArIDEpICUgb3B0aW9ucy5sZW5ndGhcbiAgICBjb25zdCBuZXdWYWx1ZSA9IG9wdGlvbnNbbmV4dEluZGV4XVxuICAgIGNvbnNvbGUubG9nKGBbU2V0dGluZ0J1dHRvbl0gJHtsYWJlbH06ICR7c2V0dGluZy52YWx1ZX0gLT4gJHtuZXdWYWx1ZX1gKVxuICAgIHNldHRpbmcudmFsdWUgPSBuZXdWYWx1ZVxuICB9XG5cbiAgLy8gVXNlIGxvY2FsIHNpZ25hbCBmb3IgZGlzcGxheSAodGhpcyB3aWxsIGF1dG8tdXBkYXRlKVxuICByZXR1cm4gKFxuICAgIDxidXR0b24gb25DbGljaz17aGFuZGxlQ2xpY2t9IHR5cGU9XCJidXR0b25cIiBzdHlsZT17YnV0dG9uU3R5bGV9PlxuICAgICAge2xhYmVsfToge2xvY2FsVmFsdWUudmFsdWV9XG4gICAgPC9idXR0b24+XG4gIClcbn1cbiIsImltcG9ydCB7IGhhbmRsZVNwZWVjaENvbW1hbmQgfSBmcm9tICcuLi8uLi9hcHBsaWNhdGlvbi9oYW5kbGVycy9oYW5kbGVTcGVlY2hDb21tYW5kJ1xuaW1wb3J0IHsgU3BlZWNoQ29tbWFuZCB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy9jb21tYW5kcydcbmltcG9ydCB7IHVzZVNldHRpbmdzIH0gZnJvbSAnLi4vY29udGV4dHMvU2V0dGluZ3NDb250ZXh0J1xuaW1wb3J0IHsgQWN0aW9uQnV0dG9uIH0gZnJvbSAnLi9BY3Rpb25CdXR0b24nXG5pbXBvcnQgeyBCdXR0b25Sb3cgfSBmcm9tICcuL0J1dHRvblJvdydcbmltcG9ydCB7IFNldHRpbmdCdXR0b24gfSBmcm9tICcuL1NldHRpbmdCdXR0b24nXG5cbmNvbnN0IFNQRUFLX1JBVEVfT1BUSU9OUyA9IFswLjIsIDAuNSwgMC43LCAxLjAsIDEuMSwgMS4yXSBhcyBjb25zdFxuXG5leHBvcnQgZnVuY3Rpb24gU3BlZWNoQnV0dG9ucygpIHtcbiAgY29uc3Qgc2V0dGluZ3MgPSB1c2VTZXR0aW5ncygpXG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgPEJ1dHRvblJvdz5cbiAgICAgICAgPEFjdGlvbkJ1dHRvblxuICAgICAgICAgIGxhYmVsPVwi8J+UiiDimZQgc2lkZVwiXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlU3BlZWNoQ29tbWFuZChTcGVlY2hDb21tYW5kLldLLCBzZXR0aW5ncyl9XG4gICAgICAgIC8+XG4gICAgICAgIDxBY3Rpb25CdXR0b25cbiAgICAgICAgICBsYWJlbD1cIvCflIog4pmVIHNpZGVcIlxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVNwZWVjaENvbW1hbmQoU3BlZWNoQ29tbWFuZC5XUSwgc2V0dGluZ3MpfVxuICAgICAgICAvPlxuICAgICAgICA8QWN0aW9uQnV0dG9uXG4gICAgICAgICAgbGFiZWw9XCLwn5SKIOKZmiBzaWRlXCJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVTcGVlY2hDb21tYW5kKFNwZWVjaENvbW1hbmQuQkssIHNldHRpbmdzKX1cbiAgICAgICAgLz5cbiAgICAgICAgPEFjdGlvbkJ1dHRvblxuICAgICAgICAgIGxhYmVsPVwi8J+UiiDimZsgc2lkZVwiXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlU3BlZWNoQ29tbWFuZChTcGVlY2hDb21tYW5kLkJRLCBzZXR0aW5ncyl9XG4gICAgICAgIC8+XG4gICAgICA8L0J1dHRvblJvdz5cblxuICAgICAgPEJ1dHRvblJvdz5cbiAgICAgICAgPEFjdGlvbkJ1dHRvblxuICAgICAgICAgIGxhYmVsPVwi8J+UiiBhbGwgcGllY2VzXCJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVTcGVlY2hDb21tYW5kKFNwZWVjaENvbW1hbmQuQUxMLCBzZXR0aW5ncyl9XG4gICAgICAgIC8+XG4gICAgICAgIDxBY3Rpb25CdXR0b25cbiAgICAgICAgICBsYWJlbD1cIvCflIogdydzIHBpZWNlc1wiXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlU3BlZWNoQ29tbWFuZChTcGVlY2hDb21tYW5kLldISVRFLCBzZXR0aW5ncyl9XG4gICAgICAgIC8+XG4gICAgICAgIDxBY3Rpb25CdXR0b25cbiAgICAgICAgICBsYWJlbD1cIvCflIogYidzIHBpZWNlc1wiXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlU3BlZWNoQ29tbWFuZChTcGVlY2hDb21tYW5kLkJMQUNLLCBzZXR0aW5ncyl9XG4gICAgICAgIC8+XG4gICAgICA8L0J1dHRvblJvdz5cblxuICAgICAgPEJ1dHRvblJvdz5cbiAgICAgICAgPFNldHRpbmdCdXR0b24gbGFiZWw9XCLwn5SKIHJhdGVcIiBzZXR0aW5nPXtzZXR0aW5ncy5zcGVha1JhdGV9IG9wdGlvbnM9e1NQRUFLX1JBVEVfT1BUSU9OU30gLz5cbiAgICAgICAgPEFjdGlvbkJ1dHRvblxuICAgICAgICAgIGxhYmVsPVwi8J+UiiBTdG9wXCJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVTcGVlY2hDb21tYW5kKFNwZWVjaENvbW1hbmQuU1RPUCwgc2V0dGluZ3MpfVxuICAgICAgICAvPlxuICAgICAgPC9CdXR0b25Sb3c+XG4gICAgPC9kaXY+XG4gIClcbn1cbiIsImltcG9ydCB0eXBlIHsgU2lnbmFsIH0gZnJvbSAnQHByZWFjdC9zaWduYWxzJ1xuaW1wb3J0IHtcbiAgQkxBQ0tfU0VHTUVOVFNfT1BUSU9OUyxcbiAgQkxBQ0tfU0VHTUVOVFNfVElNSU5HX09QVElPTlMsXG4gIEJMVVJfT1BUSU9OUyxcbiAgRkxBU0hfRFVSQVRJT05fT1BUSU9OUyxcbiAgRkxBU0hfSU5URVJWQUxfT1BUSU9OUyxcbiAgSE9WRVJfTU9ERV9PUFRJT05TLFxuICBQQVJBTExBWF9PUFRJT05TLFxuICBQSUVDRV9TVFlMRV9PUFRJT05TLFxufSBmcm9tICcuLi8uLi9jb25zdGFudHMvb3B0aW9ucydcbmltcG9ydCB7IHVzZVNldHRpbmdzIH0gZnJvbSAnLi4vY29udGV4dHMvU2V0dGluZ3NDb250ZXh0J1xuaW1wb3J0IHsgQWN0aW9uQnV0dG9uIH0gZnJvbSAnLi9BY3Rpb25CdXR0b24nXG5pbXBvcnQgeyBCdXR0b25Sb3cgfSBmcm9tICcuL0J1dHRvblJvdydcbmltcG9ydCB7IENvbmRpdGlvbmFsQ29udHJvbHMgfSBmcm9tICcuL0NvbmRpdGlvbmFsQ29udHJvbHMnXG5pbXBvcnQgeyBTZXR0aW5nQnV0dG9uIH0gZnJvbSAnLi9TZXR0aW5nQnV0dG9uJ1xuaW1wb3J0IHsgU3BlZWNoQnV0dG9ucyB9IGZyb20gJy4vU3BlZWNoQnV0dG9ucydcblxuaW50ZXJmYWNlIENvbnRyb2xQYW5lbFByb3BzIHtcbiAgYm9hcmRDaGFuZ2VkOiBTaWduYWw8bnVtYmVyPlxufVxuXG5jb25zdCBUT0dHTEVfT1BUSU9OUyA9IFtmYWxzZSwgdHJ1ZV0gYXMgY29uc3RcblxuZXhwb3J0IGZ1bmN0aW9uIENvbnRyb2xQYW5lbCh7IGJvYXJkQ2hhbmdlZCB9OiBDb250cm9sUGFuZWxQcm9wcykge1xuICBjb25zdCBzZXR0aW5ncyA9IHVzZVNldHRpbmdzKClcblxuICAvLyBVc2UgYm9hcmRDaGFuZ2VkIHRvIGVuc3VyZSBjb21wb25lbnQgcmUtcmVuZGVycyB3aGVuIGJvYXJkIGNoYW5nZXNcbiAgYm9hcmRDaGFuZ2VkLnZhbHVlXG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgey8qIFNwZWVjaCBCdXR0b25zIC0gQWx3YXlzIFZpc2libGUgKi99XG4gICAgICA8U3BlZWNoQnV0dG9ucyAvPlxuXG4gICAgICB7LyogTWFpbiBDb250cm9scyAtIEFsd2F5cyBWaXNpYmxlICovfVxuICAgICAgPEJ1dHRvblJvdz5cbiAgICAgICAgPFNldHRpbmdCdXR0b25cbiAgICAgICAgICBsYWJlbD1cIlBpZWNlcyBMaXN0XCJcbiAgICAgICAgICBzZXR0aW5nPXtzZXR0aW5ncy5waWVjZXNMaXN0RW5hYmxlZH1cbiAgICAgICAgICBvcHRpb25zPXtUT0dHTEVfT1BUSU9OU31cbiAgICAgICAgLz5cbiAgICAgICAgPEFjdGlvbkJ1dHRvblxuICAgICAgICAgIGxhYmVsPVwiQW5ub3RhdGUgQm9hcmRcIlxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgIC8vIFRPRE86IEZvY3VzIG1vdmUgaW5wdXQgb3IgdHJpZ2dlciBhbm5vdGF0aW9uIG1vZGVcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdBbm5vdGF0ZSBCb2FyZCBjbGlja2VkJylcbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuICAgICAgICA8U2V0dGluZ0J1dHRvblxuICAgICAgICAgIGxhYmVsPVwiRGl2aWRlcnNcIlxuICAgICAgICAgIHNldHRpbmc9e3NldHRpbmdzLmRpdmlkZXJzRW5hYmxlZH1cbiAgICAgICAgICBvcHRpb25zPXtUT0dHTEVfT1BUSU9OU31cbiAgICAgICAgLz5cbiAgICAgICAgPFNldHRpbmdCdXR0b25cbiAgICAgICAgICBsYWJlbD1cIkN1c3RvbSBCb2FyZFwiXG4gICAgICAgICAgc2V0dGluZz17c2V0dGluZ3MuY3VzdG9tQm9hcmRFbmFibGVkfVxuICAgICAgICAgIG9wdGlvbnM9e1RPR0dMRV9PUFRJT05TfVxuICAgICAgICAvPlxuICAgICAgICA8U2V0dGluZ0J1dHRvblxuICAgICAgICAgIGxhYmVsPVwiRmxhc2ggTW9kZVwiXG4gICAgICAgICAgc2V0dGluZz17c2V0dGluZ3MuZmxhc2hNb2RlRW5hYmxlZH1cbiAgICAgICAgICBvcHRpb25zPXtUT0dHTEVfT1BUSU9OU31cbiAgICAgICAgLz5cbiAgICAgIDwvQnV0dG9uUm93PlxuXG4gICAgICB7LyogQ3VzdG9tIEJvYXJkIE5lc3RlZCBDb250cm9scyAqL31cbiAgICAgIDxDb25kaXRpb25hbENvbnRyb2xzIGNvbmRpdGlvbj17c2V0dGluZ3MuY3VzdG9tQm9hcmRFbmFibGVkLnZhbHVlfT5cbiAgICAgICAgPEJ1dHRvblJvdz5cbiAgICAgICAgICA8U2V0dGluZ0J1dHRvblxuICAgICAgICAgICAgbGFiZWw9XCJPYmZ1c2NhdGlvbnNcIlxuICAgICAgICAgICAgc2V0dGluZz17c2V0dGluZ3Mub2JmdXNjYXRpb25zRW5hYmxlZH1cbiAgICAgICAgICAgIG9wdGlvbnM9e1RPR0dMRV9PUFRJT05TfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPFNldHRpbmdCdXR0b24gbGFiZWw9XCJQYXJhbGxheFwiIHNldHRpbmc9e3NldHRpbmdzLnBhcmFsbGF4fSBvcHRpb25zPXtQQVJBTExBWF9PUFRJT05TfSAvPlxuICAgICAgICAgIDxTZXR0aW5nQnV0dG9uXG4gICAgICAgICAgICBsYWJlbD1cIkhvdmVyIE1vZGVcIlxuICAgICAgICAgICAgc2V0dGluZz17c2V0dGluZ3MuaG92ZXJNb2RlfVxuICAgICAgICAgICAgb3B0aW9ucz17SE9WRVJfTU9ERV9PUFRJT05TfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvQnV0dG9uUm93PlxuXG4gICAgICAgIHsvKiBPYmZ1c2NhdGlvbnMgTmVzdGVkIENvbnRyb2xzICovfVxuICAgICAgICA8Q29uZGl0aW9uYWxDb250cm9scyBjb25kaXRpb249e3NldHRpbmdzLm9iZnVzY2F0aW9uc0VuYWJsZWQudmFsdWV9PlxuICAgICAgICAgIDxCdXR0b25Sb3c+XG4gICAgICAgICAgICA8U2V0dGluZ0J1dHRvblxuICAgICAgICAgICAgICBsYWJlbD1cIlBpZWNlIFN0eWxlXCJcbiAgICAgICAgICAgICAgc2V0dGluZz17c2V0dGluZ3MucGllY2VTdHlsZX1cbiAgICAgICAgICAgICAgb3B0aW9ucz17UElFQ0VfU1RZTEVfT1BUSU9OU31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8U2V0dGluZ0J1dHRvbiBsYWJlbD1cIkJsdXJcIiBzZXR0aW5nPXtzZXR0aW5ncy5ibHVyfSBvcHRpb25zPXtCTFVSX09QVElPTlN9IC8+XG4gICAgICAgICAgICA8U2V0dGluZ0J1dHRvblxuICAgICAgICAgICAgICBsYWJlbD1cIkJsYWNrIFNlZ21lbnRzXCJcbiAgICAgICAgICAgICAgc2V0dGluZz17c2V0dGluZ3MuYmxhY2tTZWdtZW50c31cbiAgICAgICAgICAgICAgb3B0aW9ucz17QkxBQ0tfU0VHTUVOVFNfT1BUSU9OU31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9CdXR0b25Sb3c+XG5cbiAgICAgICAgICB7LyogQmxhY2sgU2VnbWVudHMgVGltaW5nIC0gb25seSB3aGVuIG5vdCAnbm9uZScgKi99XG4gICAgICAgICAgPENvbmRpdGlvbmFsQ29udHJvbHMgY29uZGl0aW9uPXtzZXR0aW5ncy5ibGFja1NlZ21lbnRzLnZhbHVlICE9PSAnbm9uZSd9PlxuICAgICAgICAgICAgPEJ1dHRvblJvdz5cbiAgICAgICAgICAgICAgPFNldHRpbmdCdXR0b25cbiAgICAgICAgICAgICAgICBsYWJlbD1cIlRpbWluZ1wiXG4gICAgICAgICAgICAgICAgc2V0dGluZz17c2V0dGluZ3MuYmxhY2tTZWdtZW50c1RpbWluZ31cbiAgICAgICAgICAgICAgICBvcHRpb25zPXtCTEFDS19TRUdNRU5UU19USU1JTkdfT1BUSU9OU31cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvQnV0dG9uUm93PlxuICAgICAgICAgIDwvQ29uZGl0aW9uYWxDb250cm9scz5cbiAgICAgICAgPC9Db25kaXRpb25hbENvbnRyb2xzPlxuICAgICAgPC9Db25kaXRpb25hbENvbnRyb2xzPlxuXG4gICAgICB7LyogRmxhc2ggTW9kZSBOZXN0ZWQgQ29udHJvbHMgKi99XG4gICAgICA8Q29uZGl0aW9uYWxDb250cm9scyBjb25kaXRpb249e3NldHRpbmdzLmZsYXNoTW9kZUVuYWJsZWQudmFsdWV9PlxuICAgICAgICA8QnV0dG9uUm93PlxuICAgICAgICAgIDxTZXR0aW5nQnV0dG9uXG4gICAgICAgICAgICBsYWJlbD1cIkZsYXNoIER1cmF0aW9uXCJcbiAgICAgICAgICAgIHNldHRpbmc9e3NldHRpbmdzLmZsYXNoRHVyYXRpb259XG4gICAgICAgICAgICBvcHRpb25zPXtGTEFTSF9EVVJBVElPTl9PUFRJT05TfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPFNldHRpbmdCdXR0b25cbiAgICAgICAgICAgIGxhYmVsPVwiRmxhc2ggSW50ZXJ2YWxcIlxuICAgICAgICAgICAgc2V0dGluZz17c2V0dGluZ3MuZmxhc2hJbnRlcnZhbH1cbiAgICAgICAgICAgIG9wdGlvbnM9e0ZMQVNIX0lOVEVSVkFMX09QVElPTlN9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9CdXR0b25Sb3c+XG4gICAgICA8L0NvbmRpdGlvbmFsQ29udHJvbHM+XG4gICAgPC9kaXY+XG4gIClcbn1cbiIsImltcG9ydCB0eXBlIHsgU2lnbmFsIH0gZnJvbSAnQHByZWFjdC9zaWduYWxzLWNvcmUnXG5pbXBvcnQgeyByZW5kZXIgfSBmcm9tICdwcmVhY3QnXG5pbXBvcnQgdHlwZSB7IFNldHRpbmdzU3RvcmUgfSBmcm9tICcuLi8uLi9hcHBsaWNhdGlvbi9zZXR0aW5ncy9zZXR0aW5nc1N0b3JlJ1xuaW1wb3J0IHsgU2V0dGluZ3NQcm92aWRlciB9IGZyb20gJy4uL2NvbnRleHRzL1NldHRpbmdzQ29udGV4dCdcbmltcG9ydCB7IENvbnRyb2xQYW5lbCB9IGZyb20gJy4vQ29udHJvbFBhbmVsJ1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUm9vdChcbiAgYm9hcmRDaGFuZ2VkOiBTaWduYWw8bnVtYmVyPixcbiAgbW91bnRQb2ludDogSFRNTEVsZW1lbnQsXG4gIHNldHRpbmdzOiBTZXR0aW5nc1N0b3JlXG4pOiB2b2lkIHtcbiAgcmVuZGVyKFxuICAgIDxTZXR0aW5nc1Byb3ZpZGVyIHNldHRpbmdzPXtzZXR0aW5nc30+XG4gICAgICA8Q29udHJvbFBhbmVsIGJvYXJkQ2hhbmdlZD17Ym9hcmRDaGFuZ2VkfSAvPlxuICAgIDwvU2V0dGluZ3NQcm92aWRlcj4sXG4gICAgbW91bnRQb2ludFxuICApXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXN0cm95Um9vdChtb3VudFBvaW50OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICByZW5kZXIobnVsbCwgbW91bnRQb2ludClcbn1cbiIsImltcG9ydCB7IENzc0NsYXNzLCBDc3NEaXNwbGF5LCBEb21TZWxlY3RvciB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy9kb20nXG5pbXBvcnQgeyBhcHBlbmRDaGlsZCwgY3JlYXRlRGl2LCBxdWVyeVNlbGVjdG9yIH0gZnJvbSAnLi4vLi4vcGxhdGZvcm0vZG9tJ1xuXG5leHBvcnQgaW50ZXJmYWNlIEZsYXNoT3ZlcmxheVN0YXRlIHtcbiAgb3ZlcmxheTogSFRNTEVsZW1lbnRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZsYXNoT3ZlcmxheSgpOiBGbGFzaE92ZXJsYXlTdGF0ZSB7XG4gIGNvbnN0IG92ZXJsYXkgPSBjcmVhdGVEaXYoKVxuICBvdmVybGF5LmNsYXNzTmFtZSA9IENzc0NsYXNzLlVTRVJTQ1JJUFRfRkxBU0hcbiAgb3ZlcmxheS5zdHlsZS5jc3NUZXh0ID0gYFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDA7XG4gICAgbGVmdDogMDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgYmFja2dyb3VuZDogYmxhY2s7XG4gICAgei1pbmRleDogMTAwMDtcbiAgICBkaXNwbGF5OiBub25lO1xuICBgXG5cbiAgY29uc3QgY29udGFpbmVyID0gcXVlcnlTZWxlY3RvcihEb21TZWxlY3Rvci5DT05UQUlORVIpXG4gIGlmIChjb250YWluZXIpIHtcbiAgICBhcHBlbmRDaGlsZChjb250YWluZXIsIG92ZXJsYXkpXG4gIH1cblxuICByZXR1cm4geyBvdmVybGF5IH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNob3dGbGFzaChzdGF0ZTogRmxhc2hPdmVybGF5U3RhdGUpOiB2b2lkIHtcbiAgc3RhdGUub3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gQ3NzRGlzcGxheS5CTE9DS1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGlkZUZsYXNoKHN0YXRlOiBGbGFzaE92ZXJsYXlTdGF0ZSk6IHZvaWQge1xuICBzdGF0ZS5vdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBDc3NEaXNwbGF5Lk5PTkVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlc3Ryb3lGbGFzaE92ZXJsYXkoc3RhdGU6IEZsYXNoT3ZlcmxheVN0YXRlKTogdm9pZCB7XG4gIHN0YXRlLm92ZXJsYXkucmVtb3ZlKClcbn1cbiIsImltcG9ydCB7IHNpZ25hbCB9IGZyb20gJ0BwcmVhY3Qvc2lnbmFscy1jb3JlJ1xuaW1wb3J0IHsgc2V0dXBEaXZpZGVyc0VmZmVjdCB9IGZyb20gJy4vYXBwbGljYXRpb24vZWZmZWN0cy9vbkRpdmlkZXJzJ1xuaW1wb3J0IHsgc2V0dXBLZXlib2FyZENvbW1hbmRzLCB0ZWFyZG93bktleWJvYXJkQ29tbWFuZHMgfSBmcm9tICcuL2FwcGxpY2F0aW9uL2lucHV0L2tleWJvYXJkSW5wdXQnXG5pbXBvcnQge1xuICBjcmVhdGVCb2FyZE9ic2VydmVyLFxuICBzdGFydEJvYXJkT2JzZXJ2ZXIsXG4gIHN0b3BCb2FyZE9ic2VydmVyLFxufSBmcm9tICcuL2FwcGxpY2F0aW9uL29ic2VydmVycy9vYnNlcnZlclN0YXRlJ1xuaW1wb3J0IHtcbiAgY3JlYXRlU2V0dGluZ3NTdG9yZSxcbiAgbG9hZFNldHRpbmdzLFxuICBzZXR1cEF1dG9TYXZlLFxufSBmcm9tICcuL2FwcGxpY2F0aW9uL3NldHRpbmdzL3NldHRpbmdzU3RvcmUnXG5pbXBvcnQgeyBEb21TZWxlY3RvciB9IGZyb20gJy4vY29uc3RhbnRzL2RvbSdcbmltcG9ydCB7IGFwcGVuZENoaWxkLCBjcmVhdGVEaXYsIHF1ZXJ5U2VsZWN0b3IsIHdhaXRGb3JFbGVtZW50IH0gZnJvbSAnLi9wbGF0Zm9ybS9kb20nXG5pbXBvcnQgeyBjcmVhdGVSb290LCBkZXN0cm95Um9vdCB9IGZyb20gJy4vcHJlc2VudGF0aW9uL2NvbXBvbmVudHMvcm9vdCdcbmltcG9ydCB7IGNyZWF0ZURpdmlkZXJzLCBkZXN0cm95RGl2aWRlcnMgfSBmcm9tICcuL3ByZXNlbnRhdGlvbi9ub24tcHJlYWN0LWNvbXBvbmVudHMvZGl2aWRlcnMnXG5pbXBvcnQgeyBjcmVhdGVGbGFzaE92ZXJsYXksIGRlc3Ryb3lGbGFzaE92ZXJsYXkgfSBmcm9tICcuL3ByZXNlbnRhdGlvbi9ub24tcHJlYWN0LWNvbXBvbmVudHMvZmxhc2gnXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbml0KCkge1xuICAvLyBXYWl0IGZvciBsaWNoZXNzIHRvIGxvYWQgdGhlIGJvYXJkXG4gIGF3YWl0IHdhaXRGb3JFbGVtZW50KERvbVNlbGVjdG9yLktFWUJPQVJEX01PVkUpXG5cbiAgLy8gSW5pdGlhbGl6ZSBzZXR0aW5nc1xuICBjb25zdCBzZXR0aW5ncyA9IGNyZWF0ZVNldHRpbmdzU3RvcmUoKVxuICBsb2FkU2V0dGluZ3Moc2V0dGluZ3MpXG4gIHNldHVwQXV0b1NhdmUoc2V0dGluZ3MpXG5cbiAgLy8gQ3JlYXRlIHNoYXJlZCBib2FyZCBjaGFuZ2Ugc2lnbmFsXG4gIGNvbnN0IGJvYXJkQ2hhbmdlZCA9IHNpZ25hbCgwKVxuXG4gIC8vIENyZWF0ZSBET00gc3RhdGVcbiAgY29uc3QgZmxhc2hTdGF0ZSA9IGNyZWF0ZUZsYXNoT3ZlcmxheSgpXG4gIGNvbnN0IGRpdmlkZXJzU3RhdGUgPSBjcmVhdGVEaXZpZGVycygpXG4gIGNvbnN0IGJvYXJkT2JzZXJ2ZXJTdGF0ZSA9IGNyZWF0ZUJvYXJkT2JzZXJ2ZXIoYm9hcmRDaGFuZ2VkKVxuXG4gIC8vIFN0YXJ0IG9ic2VydmVyXG4gIHN0YXJ0Qm9hcmRPYnNlcnZlcihib2FyZE9ic2VydmVyU3RhdGUpXG5cbiAgLy8gU2V0IHVwIGVmZmVjdHNcbiAgY29uc3QgY2xlYW51cERpdmlkZXJzID0gc2V0dXBEaXZpZGVyc0VmZmVjdChkaXZpZGVyc1N0YXRlLCBzZXR0aW5ncylcblxuICAvLyBTZXQgdXAgY29tbWFuZHNcbiAgc2V0dXBLZXlib2FyZENvbW1hbmRzKHNldHRpbmdzKVxuXG4gIC8vIE1vdW50IFByZWFjdCBVSVxuICBjb25zdCBtb3VudFBvaW50ID0gY3JlYXRlRGl2KClcbiAgY29uc3Qga2V5Ym9hcmRNb3ZlID0gcXVlcnlTZWxlY3RvcihEb21TZWxlY3Rvci5LRVlCT0FSRF9NT1ZFKVxuICBpZiAoa2V5Ym9hcmRNb3ZlKSB7XG4gICAgYXBwZW5kQ2hpbGQoa2V5Ym9hcmRNb3ZlLCBtb3VudFBvaW50KVxuICB9XG4gIGNyZWF0ZVJvb3QoYm9hcmRDaGFuZ2VkLCBtb3VudFBvaW50LCBzZXR0aW5ncylcblxuICAvLyBSZXR1cm4gY2xlYW51cCBmdW5jdGlvblxuICByZXR1cm4gKCkgPT4ge1xuICAgIGNsZWFudXBEaXZpZGVycygpXG4gICAgc3RvcEJvYXJkT2JzZXJ2ZXIoYm9hcmRPYnNlcnZlclN0YXRlKVxuICAgIGRlc3Ryb3lGbGFzaE92ZXJsYXkoZmxhc2hTdGF0ZSlcbiAgICBkZXN0cm95RGl2aWRlcnMoZGl2aWRlcnNTdGF0ZSlcbiAgICB0ZWFyZG93bktleWJvYXJkQ29tbWFuZHMoKVxuICAgIGRlc3Ryb3lSb290KG1vdW50UG9pbnQpXG4gIH1cbn1cbiIsImltcG9ydCB7IGluaXQgfSBmcm9tICcuL2luaXQnXG5cbi8vIFN0YXJ0IHRoZSBhcHBsaWNhdGlvblxuaW5pdCgpLmNhdGNoKGNvbnNvbGUuZXJyb3IpXG4iXSwieF9nb29nbGVfaWdub3JlTGlzdCI6WzAsMjIsMjMsMjQsMzBdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztDQUFBLElBQUlBLE1BQUUsT0FBTyxJQUFJLGdCQUFnQjtDQUFFLFNBQVNDLE1BQUc7RUFBQyxJQUFHLEVBQUVDLE1BQUUsSUFBRztHQUFDLElBQUksR0FBRSxJQUFFLENBQUM7R0FBRSxDQUFDLFdBQVU7SUFBQyxJQUFJLElBQUVDO0lBQUUsTUFBRSxLQUFLO0lBQUUsT0FBTSxLQUFLLE1BQUksR0FBRTtLQUFDLElBQUcsRUFBRSxFQUFFLE1BQUksRUFBRSxHQUFFLEVBQUUsRUFBRSxJQUFFLEVBQUU7S0FBRSxJQUFFLEVBQUU7SUFBQztHQUFDLEdBQUU7R0FBRSxPQUFNLEtBQUssTUFBSUMsS0FBRTtJQUFDLElBQUksSUFBRUE7SUFBRSxNQUFFLEtBQUs7SUFBRTtJQUFJLE9BQU0sS0FBSyxNQUFJLEdBQUU7S0FBQyxJQUFJLElBQUUsRUFBRTtLQUFFLEVBQUUsSUFBRSxLQUFLO0tBQUUsRUFBRSxLQUFHO0tBQUcsSUFBRyxFQUFFLElBQUUsRUFBRSxNQUFJQyxJQUFFLENBQUMsR0FBRSxJQUFHO01BQUMsRUFBRSxFQUFFO0tBQUMsU0FBTyxHQUFFO01BQUMsSUFBRyxDQUFDLEdBQUU7T0FBQyxJQUFFO09BQUUsSUFBRSxDQUFDO01BQUM7S0FBQztLQUFDLElBQUU7SUFBQztHQUFDO0dBQUMsTUFBRTtHQUFFO0dBQUksSUFBRyxHQUFFLE1BQU07RUFBQyxPQUFNO0NBQUc7Q0FBdUUsSUFBSUMsTUFBRSxLQUFLO0NBQUUsU0FBU0MsSUFBRSxHQUFFO0VBQUMsSUFBSSxJQUFFRDtFQUFFLE1BQUUsS0FBSztFQUFFLElBQUc7R0FBQyxPQUFPLEVBQUU7RUFBQyxVQUFRO0dBQUMsTUFBRTtFQUFDO0NBQUM7Q0FBQyxJQUFJRSxLQUFFSixNQUFFLEtBQUssR0FBRUYsTUFBRSxHQUFFTyxNQUFFLEdBQU1FLE1BQUUsR0FBRVIsTUFBRSxLQUFLLEdBQUVTLE1BQUU7Q0FBRSxTQUFTQyxJQUFFLEdBQUU7RUFBQyxJQUFHLEtBQUssTUFBSVAsS0FBRTtHQUFDLElBQUksSUFBRSxFQUFFO0dBQUUsSUFBRyxLQUFLLE1BQUksS0FBRyxFQUFFLE1BQUlBLEtBQUU7SUFBQyxJQUFFO0tBQUMsR0FBRTtLQUFFLEdBQUU7S0FBRSxHQUFFQSxJQUFFO0tBQUUsR0FBRSxLQUFLO0tBQUUsR0FBRUE7S0FBRSxHQUFFLEtBQUs7S0FBRSxHQUFFLEtBQUs7S0FBRSxHQUFFO0lBQUM7SUFBRSxJQUFHLEtBQUssTUFBSUEsSUFBRSxHQUFFLElBQUUsRUFBRSxJQUFFO0lBQUUsSUFBRSxJQUFFO0lBQUUsRUFBRSxJQUFFO0lBQUUsSUFBRyxLQUFHQSxJQUFFLEdBQUUsRUFBRSxFQUFFLENBQUM7SUFBRSxPQUFPO0dBQUMsT0FBTSxJQUFHLE9BQUssRUFBRSxHQUFFO0lBQUMsRUFBRSxJQUFFO0lBQUUsSUFBRyxLQUFLLE1BQUksRUFBRSxHQUFFO0tBQUMsRUFBRSxFQUFFLElBQUUsRUFBRTtLQUFFLElBQUcsS0FBSyxNQUFJLEVBQUUsR0FBRSxFQUFFLEVBQUUsSUFBRSxFQUFFO0tBQUUsRUFBRSxJQUFFQSxJQUFFO0tBQUUsRUFBRSxJQUFFLEtBQUs7S0FBRSxJQUFFLEVBQUUsSUFBRTtLQUFFLElBQUUsSUFBRTtJQUFDO0lBQUMsT0FBTztHQUFDO0VBQUM7Q0FBQztDQUFDLFNBQVNRLElBQUUsR0FBRSxHQUFFO0VBQUMsS0FBSyxJQUFFO0VBQUUsS0FBSyxJQUFFO0VBQUUsS0FBSyxJQUFFLEtBQUs7RUFBRSxLQUFLLElBQUUsS0FBSztFQUFFLEtBQUssSUFBRTtFQUFFLEtBQUssSUFBRSxRQUFNLElBQUUsS0FBSyxJQUFFLEVBQUU7RUFBUSxLQUFLLElBQUUsUUFBTSxJQUFFLEtBQUssSUFBRSxFQUFFO0VBQVUsS0FBSyxPQUFLLFFBQU0sSUFBRSxLQUFLLElBQUUsRUFBRTtDQUFJO0NBQUMsSUFBRSxVQUFVLFFBQU1kO0NBQUUsSUFBRSxVQUFVLElBQUUsV0FBVTtFQUFDLE9BQU0sQ0FBQztDQUFDO0NBQUUsSUFBRSxVQUFVLElBQUUsU0FBUyxHQUFFO0VBQUMsSUFBSSxJQUFFLE1BQUssSUFBRSxLQUFLO0VBQUUsSUFBRyxNQUFJLEtBQUcsS0FBSyxNQUFJLEVBQUUsR0FBRTtHQUFDLEVBQUUsSUFBRTtHQUFFLEtBQUssSUFBRTtHQUFFLElBQUcsS0FBSyxNQUFJLEdBQUUsRUFBRSxJQUFFO1FBQU8sSUFBRSxXQUFVO0lBQUMsSUFBSTtJQUFFLFNBQU8sSUFBRSxFQUFFLE1BQUksRUFBRSxLQUFLLENBQUM7R0FBQyxDQUFDO0VBQUM7Q0FBQztDQUFFLElBQUUsVUFBVSxJQUFFLFNBQVMsR0FBRTtFQUFDLElBQUksSUFBRTtFQUFLLElBQUcsS0FBSyxNQUFJLEtBQUssR0FBRTtHQUFDLElBQUksSUFBRSxFQUFFLEdBQUUsSUFBRSxFQUFFO0dBQUUsSUFBRyxLQUFLLE1BQUksR0FBRTtJQUFDLEVBQUUsSUFBRTtJQUFFLEVBQUUsSUFBRSxLQUFLO0dBQUM7R0FBQyxJQUFHLEtBQUssTUFBSSxHQUFFO0lBQUMsRUFBRSxJQUFFO0lBQUUsRUFBRSxJQUFFLEtBQUs7R0FBQztHQUFDLElBQUcsTUFBSSxLQUFLLEdBQUU7SUFBQyxLQUFLLElBQUU7SUFBRSxJQUFHLEtBQUssTUFBSSxHQUFFLElBQUUsV0FBVTtLQUFDLElBQUk7S0FBRSxTQUFPLElBQUUsRUFBRSxNQUFJLEVBQUUsS0FBSyxDQUFDO0lBQUMsQ0FBQztHQUFDO0VBQUM7Q0FBQztDQUFFLElBQUUsVUFBVSxZQUFVLFNBQVMsR0FBRTtFQUFDLElBQUksSUFBRTtFQUFLLE9BQU9lLElBQUUsV0FBVTtHQUFDLElBQUksSUFBRSxFQUFFLE9BQU0sSUFBRVQ7R0FBRSxNQUFFLEtBQUs7R0FBRSxJQUFHO0lBQUMsRUFBRSxDQUFDO0dBQUMsVUFBUTtJQUFDLE1BQUU7R0FBQztFQUFDLEdBQUUsRUFBQyxNQUFLLE1BQUssQ0FBQztDQUFDO0NBQUUsSUFBRSxVQUFVLFVBQVEsV0FBVTtFQUFDLE9BQU8sS0FBSztDQUFLO0NBQUUsSUFBRSxVQUFVLFdBQVMsV0FBVTtFQUFDLE9BQU8sS0FBSyxRQUFNO0NBQUU7Q0FBRSxJQUFFLFVBQVUsU0FBTyxXQUFVO0VBQUMsT0FBTyxLQUFLO0NBQUs7Q0FBRSxJQUFFLFVBQVUsT0FBSyxXQUFVO0VBQUMsSUFBSSxJQUFFO0VBQUssT0FBT0MsSUFBRSxXQUFVO0dBQUMsT0FBTyxFQUFFO0VBQUssQ0FBQztDQUFDO0NBQUUsT0FBTyxlQUFlTyxJQUFFLFdBQVUsU0FBUTtFQUFDLEtBQUksV0FBVTtHQUFDLElBQUksSUFBRUQsSUFBRSxJQUFJO0dBQUUsSUFBRyxLQUFLLE1BQUksR0FBRSxFQUFFLElBQUUsS0FBSztHQUFFLE9BQU8sS0FBSztFQUFDO0VBQUUsS0FBSSxTQUFTLEdBQUU7R0FBQyxJQUFHLE1BQUksS0FBSyxHQUFFO0lBQUMsSUFBR0osTUFBRSxLQUFJLE1BQU0sSUFBSSxNQUFNLGdCQUFnQjtJQUFFLENBQUMsU0FBUyxHQUFFO0tBQUMsSUFBRyxNQUFJUCxPQUFHLE1BQUlPO1VBQUssRUFBRSxNQUFJRSxLQUFFO09BQUMsRUFBRSxJQUFFQTtPQUFFLE1BQUU7UUFBQyxHQUFFO1FBQUUsR0FBRSxFQUFFO1FBQUUsR0FBRSxFQUFFO1FBQUUsR0FBRVI7T0FBQztNQUFDOztJQUFDLEdBQUUsSUFBSTtJQUFFLEtBQUssSUFBRTtJQUFFLEtBQUs7SUFBSTtJQUFJO0lBQUksSUFBRztLQUFDLEtBQUksSUFBSSxJQUFFLEtBQUssR0FBRSxLQUFLLE1BQUksR0FBRSxJQUFFLEVBQUUsR0FBRSxFQUFFLEVBQUUsRUFBRTtJQUFDLFVBQVE7S0FBQyxJQUFFO0lBQUM7R0FBQztFQUFDO0NBQUMsQ0FBQztDQUFFLFNBQVNhLElBQUUsR0FBRSxHQUFFO0VBQUMsT0FBTyxJQUFJRixJQUFFLEdBQUUsQ0FBQztDQUFDO0NBQUMsU0FBU1QsSUFBRSxHQUFFO0VBQUMsS0FBSSxJQUFJLElBQUUsRUFBRSxHQUFFLEtBQUssTUFBSSxHQUFFLElBQUUsRUFBRSxHQUFFLElBQUcsRUFBRSxFQUFFLE1BQUksRUFBRSxLQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsS0FBRyxFQUFFLEVBQUUsTUFBSSxFQUFFLEdBQUUsT0FBTSxDQUFDO0VBQUUsT0FBTSxDQUFDO0NBQUM7Q0FBQyxTQUFTWSxJQUFFLEdBQUU7RUFBQyxLQUFJLElBQUksSUFBRSxFQUFFLEdBQUUsS0FBSyxNQUFJLEdBQUUsSUFBRSxFQUFFLEdBQUU7R0FBQyxJQUFJLElBQUUsRUFBRSxFQUFFO0dBQUUsSUFBRyxLQUFLLE1BQUksR0FBRSxFQUFFLElBQUU7R0FBRSxFQUFFLEVBQUUsSUFBRTtHQUFFLEVBQUUsSUFBRTtHQUFHLElBQUcsS0FBSyxNQUFJLEVBQUUsR0FBRTtJQUFDLEVBQUUsSUFBRTtJQUFFO0dBQUs7RUFBQztDQUFDO0NBQUMsU0FBU0MsSUFBRSxHQUFFO0VBQUMsSUFBSSxJQUFFLEVBQUUsR0FBRSxJQUFFLEtBQUs7RUFBRSxPQUFNLEtBQUssTUFBSSxHQUFFO0dBQUMsSUFBSSxJQUFFLEVBQUU7R0FBRSxJQUFHLE9BQUssRUFBRSxHQUFFO0lBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUFFLElBQUcsS0FBSyxNQUFJLEdBQUUsRUFBRSxJQUFFLEVBQUU7SUFBRSxJQUFHLEtBQUssTUFBSSxFQUFFLEdBQUUsRUFBRSxFQUFFLElBQUU7R0FBQyxPQUFNLElBQUU7R0FBRSxFQUFFLEVBQUUsSUFBRSxFQUFFO0dBQUUsSUFBRyxLQUFLLE1BQUksRUFBRSxHQUFFLEVBQUUsSUFBRSxLQUFLO0dBQUUsSUFBRTtFQUFDO0VBQUMsRUFBRSxJQUFFO0NBQUM7Q0FBQyxTQUFTQyxJQUFFLEdBQUUsR0FBRTtFQUFDLElBQUUsS0FBSyxNQUFLLEtBQUssQ0FBQztFQUFFLEtBQUssSUFBRTtFQUFFLEtBQUssSUFBRSxLQUFLO0VBQUUsS0FBSyxJQUFFUCxNQUFFO0VBQUUsS0FBSyxJQUFFO0VBQUUsS0FBSyxJQUFFLFFBQU0sSUFBRSxLQUFLLElBQUUsRUFBRTtFQUFRLEtBQUssSUFBRSxRQUFNLElBQUUsS0FBSyxJQUFFLEVBQUU7RUFBVSxLQUFLLE9BQUssUUFBTSxJQUFFLEtBQUssSUFBRSxFQUFFO0NBQUk7Q0FBQyxJQUFFLFlBQVUsSUFBSUUsSUFBQUE7Q0FBRSxJQUFFLFVBQVUsSUFBRSxXQUFVO0VBQUMsS0FBSyxLQUFHO0VBQUcsSUFBRyxJQUFFLEtBQUssR0FBRSxPQUFNLENBQUM7RUFBRSxJQUFHLE9BQUssS0FBRyxLQUFLLElBQUcsT0FBTSxDQUFDO0VBQUUsS0FBSyxLQUFHO0VBQUcsSUFBRyxLQUFLLE1BQUlGLEtBQUUsT0FBTSxDQUFDO0VBQUUsS0FBSyxJQUFFQTtFQUFFLEtBQUssS0FBRztFQUFFLElBQUcsS0FBSyxJQUFFLEtBQUcsQ0FBQ1AsSUFBRSxJQUFJLEdBQUU7R0FBQyxLQUFLLEtBQUc7R0FBRyxPQUFNLENBQUM7RUFBQztFQUFDLElBQUksSUFBRUM7RUFBRSxJQUFHO0dBQUMsSUFBRSxJQUFJO0dBQUUsTUFBRTtHQUFLLElBQUksSUFBRSxLQUFLLEVBQUU7R0FBRSxJQUFHLEtBQUcsS0FBSyxLQUFHLEtBQUssTUFBSSxLQUFHLE1BQUksS0FBSyxHQUFFO0lBQUMsS0FBSyxJQUFFO0lBQUUsS0FBSyxLQUFHO0lBQUksS0FBSztHQUFHO0VBQUMsU0FBTyxHQUFFO0dBQUMsS0FBSyxJQUFFO0dBQUUsS0FBSyxLQUFHO0dBQUcsS0FBSztFQUFHO0VBQUMsTUFBRTtFQUFFLElBQUUsSUFBSTtFQUFFLEtBQUssS0FBRztFQUFHLE9BQU0sQ0FBQztDQUFDO0NBQUUsSUFBRSxVQUFVLElBQUUsU0FBUyxHQUFFO0VBQUMsSUFBRyxLQUFLLE1BQUksS0FBSyxHQUFFO0dBQUMsS0FBSyxLQUFHO0dBQUcsS0FBSSxJQUFJLElBQUUsS0FBSyxHQUFFLEtBQUssTUFBSSxHQUFFLElBQUUsRUFBRSxHQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7RUFBQztFQUFDLElBQUUsVUFBVSxFQUFFLEtBQUssTUFBSyxDQUFDO0NBQUM7Q0FBRSxJQUFFLFVBQVUsSUFBRSxTQUFTLEdBQUU7RUFBQyxJQUFHLEtBQUssTUFBSSxLQUFLLEdBQUU7R0FBQyxJQUFFLFVBQVUsRUFBRSxLQUFLLE1BQUssQ0FBQztHQUFFLElBQUcsS0FBSyxNQUFJLEtBQUssR0FBRTtJQUFDLEtBQUssS0FBRztJQUFJLEtBQUksSUFBSSxJQUFFLEtBQUssR0FBRSxLQUFLLE1BQUksR0FBRSxJQUFFLEVBQUUsR0FBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO0dBQUM7RUFBQztDQUFDO0NB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LElBQUUsQ0FBQyxHQUFFLENBQUM7R0FBRSxFQUFFLE1BQUksRUFBRSxNQUFJLEdBQUVqQixJQUFFLFNBQU9BLElBQUUsTUFBTSxDQUFDLEdBQUUsRUFBRSxFQUFFLEtBQUksR0FBRSxHQUFFLEVBQUUsS0FBSSxFQUFFLElBQUksY0FBYSxLQUFHLEVBQUUsTUFBSSxDQUFDLENBQUMsSUFBRSxNQUFLLEdBQUUsUUFBTSxJQUFFLEVBQUUsQ0FBQyxJQUFFLEdBQUUsQ0FBQyxFQUFFLEtBQUcsRUFBRSxNQUFLLENBQUMsR0FBRSxFQUFFLE1BQUksRUFBRSxLQUFJLEVBQUUsR0FBRyxJQUFJLEVBQUUsT0FBSyxHQUFFLEVBQUUsR0FBRSxHQUFFLENBQUMsR0FBRSxFQUFFLE1BQUksRUFBRSxLQUFHLE1BQUssRUFBRSxPQUFLLEtBQUcsRUFBRSxDQUFDO0VBQUM7Q0FBQztDQUFDLFNBQVMsRUFBRSxHQUFFO0VBQUMsSUFBRyxTQUFPLElBQUUsRUFBRSxPQUFLLFFBQU0sRUFBRSxLQUFJLE9BQU8sRUFBRSxNQUFJLEVBQUUsSUFBSSxPQUFLLE1BQUssRUFBRSxJQUFJLEtBQUssU0FBUyxHQUFFO0dBQUMsSUFBRyxRQUFNLEtBQUcsUUFBTSxFQUFFLEtBQUksT0FBTyxFQUFFLE1BQUksRUFBRSxJQUFJLE9BQUssRUFBRTtFQUFHLENBQUMsR0FBRSxFQUFFLENBQUM7Q0FBQztDQUFDLFNBQVMsRUFBRSxHQUFFO0VBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBTSxFQUFFLE1BQUksQ0FBQyxNQUFJRyxJQUFFLEtBQUssQ0FBQyxLQUFHLENBQUMsRUFBRSxTQUFPQyxPQUFHSixJQUFFLHdCQUFzQixNQUFFQSxJQUFFLHNCQUFvQkssS0FBRyxDQUFDO0NBQUM7Q0FBQyxTQUFTLElBQUc7RUFBQyxJQUFHO0dBQUMsS0FBSSxJQUFJLEdBQUUsSUFBRSxHQUFFRixJQUFFLFNBQVEsSUFBRSxTQUFPLEtBQUdBLElBQUUsS0FBS0csR0FBQyxHQUFFLElBQUVILElBQUUsTUFBTSxHQUFFLElBQUVBLElBQUUsUUFBTyxFQUFFLENBQUM7RUFBQyxVQUFRO0dBQUMsSUFBRSxTQUFPLEVBQUUsTUFBSTtFQUFDO0NBQUM7Q0FBQyxTQUFTLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0VBQUMsSUFBSSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLElBQUUsS0FBRyxFQUFFLE9BQUthLEtBQUUsSUFBRSxFQUFFO0VBQU8sS0FBSSxJQUFFSyxJQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsS0FBSSxTQUFPLElBQUUsRUFBRSxJQUFJLFFBQU0sSUFBRSxNQUFJLEVBQUUsT0FBSyxFQUFFLEVBQUUsUUFBTU4sS0FBRSxFQUFFLE1BQUksR0FBRSxJQUFFLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxLQUFJLEVBQUUsT0FBSyxFQUFFLE9BQUssRUFBRSxRQUFNLEVBQUUsT0FBSyxFQUFFLEVBQUUsS0FBSSxNQUFLLENBQUMsR0FBRSxFQUFFLEtBQUssRUFBRSxLQUFJLEVBQUUsT0FBSyxHQUFFLENBQUMsSUFBRyxRQUFNLEtBQUcsUUFBTSxNQUFJLElBQUUsS0FBSSxJQUFFLENBQUMsRUFBRSxJQUFFLEVBQUUsU0FBTyxFQUFFLFFBQU0sRUFBRSxPQUFLLElBQUVPLElBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxHQUFFLEtBQUcsRUFBRSxRQUFNLEVBQUUsTUFBSSxTQUFPLGNBQVksT0FBTyxFQUFFLFFBQU0sS0FBSyxNQUFJLElBQUUsSUFBRSxJQUFFLE1BQUksSUFBRSxFQUFFLGNBQWEsRUFBRSxPQUFLO0VBQUksT0FBTyxFQUFFLE1BQUksR0FBRTtDQUFDO0NBQUMsU0FBU0QsSUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7RUFBQyxJQUFJLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxJQUFFLEVBQUUsUUFBTyxJQUFFLEdBQUUsSUFBRTtFQUFFLEtBQUksRUFBRSxNQUFJLElBQUksTUFBTSxDQUFDLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxLQUFJLFNBQU8sSUFBRSxFQUFFLE9BQUssYUFBVyxPQUFPLEtBQUcsY0FBWSxPQUFPLEtBQUcsWUFBVSxPQUFPLEtBQUcsWUFBVSxPQUFPLEtBQUcsWUFBVSxPQUFPLEtBQUcsRUFBRSxlQUFhLFNBQU8sSUFBRSxFQUFFLElBQUksS0FBR0YsSUFBRSxNQUFLLEdBQUUsTUFBSyxNQUFLLElBQUksSUFBRSxFQUFFLENBQUMsSUFBRSxJQUFFLEVBQUUsSUFBSSxLQUFHQSxJQUFFLEdBQUUsRUFBQyxVQUFTLEVBQUMsR0FBRSxNQUFLLE1BQUssSUFBSSxJQUFFLEtBQUssTUFBSSxFQUFFLGVBQWEsRUFBRSxNQUFJLElBQUUsSUFBRSxFQUFFLElBQUksS0FBR0EsSUFBRSxFQUFFLE1BQUssRUFBRSxPQUFNLEVBQUUsS0FBSSxFQUFFLE1BQUksRUFBRSxNQUFJLE1BQUssRUFBRSxHQUFHLElBQUUsRUFBRSxJQUFJLEtBQUcsR0FBRSxJQUFFLElBQUUsR0FBRSxFQUFFLEtBQUcsR0FBRSxFQUFFLE1BQUksRUFBRSxNQUFJLEdBQUUsSUFBRSxNQUFLLE9BQUssSUFBRSxFQUFFLE1BQUksRUFBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLE9BQUssTUFBSyxJQUFFLEVBQUUsUUFBTSxFQUFFLE9BQUssS0FBSSxRQUFNLEtBQUcsUUFBTSxFQUFFLE9BQUssTUFBSSxNQUFJLElBQUUsSUFBRSxNQUFJLElBQUUsS0FBRyxNQUFLLGNBQVksT0FBTyxFQUFFLFNBQU8sRUFBRSxPQUFLLE1BQUksS0FBRyxNQUFJLEtBQUcsSUFBRSxJQUFFLE1BQUksS0FBRyxJQUFFLElBQUUsT0FBSyxJQUFFLElBQUUsTUFBSSxLQUFJLEVBQUUsT0FBSyxPQUFLLEVBQUUsSUFBSSxLQUFHO0VBQUssSUFBRyxHQUFFLEtBQUksSUFBRSxHQUFFLElBQUUsR0FBRSxLQUFJLFNBQU8sSUFBRSxFQUFFLE9BQUssTUFBSSxJQUFFLEVBQUUsU0FBTyxFQUFFLE9BQUssTUFBSSxJQUFFLEVBQUUsQ0FBQyxJQUFHLEVBQUUsR0FBRSxDQUFDO0VBQUcsT0FBTztDQUFDO0NBQUMsU0FBU0csSUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0VBQUMsSUFBSSxHQUFFO0VBQUUsSUFBRyxjQUFZLE9BQU8sRUFBRSxNQUFLO0dBQUMsS0FBSSxJQUFFLEVBQUUsS0FBSSxJQUFFLEdBQUUsS0FBRyxJQUFFLEVBQUUsUUFBTyxLQUFJLEVBQUUsT0FBSyxFQUFFLEdBQUcsS0FBRyxHQUFFLElBQUVBLElBQUUsRUFBRSxJQUFHLEdBQUUsR0FBRSxDQUFDO0dBQUcsT0FBTztFQUFDO0VBQUMsRUFBRSxPQUFLLE1BQUksTUFBSSxLQUFHLEVBQUUsUUFBTSxDQUFDLEVBQUUsZUFBYSxJQUFFLEVBQUUsQ0FBQyxJQUFHLEVBQUUsYUFBYSxFQUFFLEtBQUksS0FBRyxJQUFJLElBQUcsSUFBRSxFQUFFO0VBQUs7R0FBRyxJQUFFLEtBQUcsRUFBRTtTQUFrQixRQUFNLEtBQUcsS0FBRyxFQUFFO0VBQVUsT0FBTztDQUFDO0NBQTZHLFNBQVMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0VBQUMsSUFBSSxHQUFFLEdBQUUsR0FBRSxJQUFFLEVBQUUsS0FBSSxJQUFFLEVBQUUsTUFBSyxJQUFFLEVBQUUsSUFBRyxJQUFFLFFBQU0sS0FBRyxNQUFJLElBQUUsRUFBRTtFQUFLLElBQUcsU0FBTyxLQUFHLFFBQU0sS0FBRyxLQUFHLEtBQUcsRUFBRSxPQUFLLEtBQUcsRUFBRSxNQUFLLE9BQU87RUFBRSxJQUFHLEtBQUcsSUFBRSxJQUFFO1FBQU8sSUFBRSxJQUFFLEdBQUUsSUFBRSxJQUFFLEdBQUUsS0FBRyxLQUFHLElBQUUsRUFBRSxTQUFRLElBQUcsU0FBTyxJQUFFLEVBQUUsSUFBRSxLQUFHLElBQUUsTUFBSSxTQUFPLE1BQUksSUFBRSxFQUFFLFFBQU0sS0FBRyxFQUFFLE9BQUssS0FBRyxFQUFFLE1BQUssT0FBTztFQUFBO0VBQUUsT0FBTTtDQUFFO0NBQUMsU0FBU0MsSUFBRSxHQUFFLEdBQUUsR0FBRTtFQUFDLE9BQUssRUFBRSxLQUFHLEVBQUUsWUFBWSxHQUFFLFFBQU0sSUFBRSxLQUFHLENBQUMsSUFBRSxFQUFFLEtBQUcsUUFBTSxJQUFFLEtBQUcsWUFBVSxPQUFPLEtBQUcsRUFBRSxLQUFLLENBQUMsSUFBRSxJQUFFLElBQUU7Q0FBSTtDQUFDLFNBQVMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7RUFBQyxJQUFJLEdBQUU7RUFBRSxHQUFFLElBQUcsV0FBUyxHQUFFLElBQUcsWUFBVSxPQUFPLEdBQUUsRUFBRSxNQUFNLFVBQVE7T0FBTTtHQUFDLElBQUcsWUFBVSxPQUFPLE1BQUksRUFBRSxNQUFNLFVBQVEsSUFBRSxLQUFJLEdBQUUsS0FBSSxLQUFLLEdBQUUsS0FBRyxLQUFLLEtBQUdBLElBQUUsRUFBRSxPQUFNLEdBQUUsRUFBRTtHQUFFLElBQUcsR0FBRSxLQUFJLEtBQUssR0FBRSxLQUFHLEVBQUUsTUFBSSxFQUFFLE1BQUlBLElBQUUsRUFBRSxPQUFNLEdBQUUsRUFBRSxFQUFFO0VBQUM7T0FBTSxJQUFHLE9BQUssRUFBRSxNQUFJLE9BQUssRUFBRSxJQUFHLElBQUUsTUFBSSxJQUFFLEVBQUUsUUFBUWIsS0FBRSxJQUFJLElBQUcsSUFBRSxFQUFFLFlBQVksR0FBRSxJQUFFLEtBQUssS0FBRyxnQkFBYyxLQUFHLGVBQWEsSUFBRSxFQUFFLE1BQU0sQ0FBQyxJQUFFLEVBQUUsTUFBTSxDQUFDLEdBQUUsRUFBRSxNQUFJLEVBQUUsSUFBRSxDQUFDLElBQUcsRUFBRSxFQUFFLElBQUUsS0FBRyxHQUFFLElBQUUsSUFBRSxFQUFFRCxPQUFHLEVBQUVBLFFBQUksRUFBRUEsT0FBR0UsS0FBRSxFQUFFLGlCQUFpQixHQUFFLElBQUVFLE1BQUVELEtBQUUsQ0FBQyxLQUFHLEVBQUUsb0JBQW9CLEdBQUUsSUFBRUMsTUFBRUQsS0FBRSxDQUFDO09BQU07R0FBQyxJQUFHLGdDQUE4QixHQUFFLElBQUUsRUFBRSxRQUFRLGVBQWMsR0FBRyxF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R0FBRSxFQUFFLFFBQU0sRUFBRTtVQUFVLEVBQUUsT0FBSyxFQUFFLElBQUU7R0FBSSxFQUFFLFFBQU0sRUFBRSxLQUFJLFFBQU0sRUFBRSxvQkFBa0IsSUFBRUMsSUFBRUEsSUFBRSxDQUFDLEdBQUUsQ0FBQyxHQUFFLEVBQUUsZ0JBQWdCLENBQUMsSUFBRyxLQUFHLENBQUMsS0FBRyxRQUFNLEVBQUUsNEJBQTBCLElBQUUsRUFBRSx3QkFBd0IsR0FBRSxDQUFDLElBQUcsSUFBRSxRQUFNLEtBQUcsRUFBRSxTQUFPLEtBQUcsUUFBTSxFQUFFLE1BQUksRUFBRSxFQUFFLE1BQU0sUUFBUSxJQUFFLEdBQUUsSUFBRSxFQUFFLEdBQUUsRUFBRSxDQUFDLElBQUUsSUFBRSxDQUFDLENBQUMsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxHQUFFLEVBQUUsT0FBSyxFQUFFLEtBQUksRUFBRSxPQUFLLE1BQUssRUFBRSxJQUFJLFVBQVEsRUFBRSxLQUFLLENBQUMsR0FBRSxNQUFJLEVBQUUsTUFBSSxFQUFFLEtBQUc7RUFBSyxTQUFPLEdBQUU7R0FBQyxJQUFHLEVBQUUsTUFBSSxNQUFLLEtBQUcsUUFBTSxHQUFFLElBQUcsRUFBRSxNQUFLO0lBQUMsS0FBSSxFQUFFLE9BQUssSUFBRSxNQUFJLEtBQUksS0FBRyxLQUFHLEVBQUUsWUFBVSxFQUFFLGNBQWEsSUFBRSxFQUFFO0lBQVksRUFBRSxFQUFFLFFBQVEsQ0FBQyxLQUFHLE1BQUssRUFBRSxNQUFJO0dBQUMsT0FBSztJQUFDLEtBQUksSUFBRSxFQUFFLFFBQU8sTUFBSyxFQUFFLEVBQUUsRUFBRTtJQUFFLElBQUUsQ0FBQztHQUFDO1FBQU0sRUFBRSxNQUFJLEVBQUUsS0FBSSxFQUFFLE1BQUksRUFBRSxLQUFJLEVBQUUsUUFBTU8sSUFBRSxDQUFDO0dBQUUsSUFBRSxJQUFJLEdBQUUsR0FBRSxDQUFDO0VBQUM7T0FBTSxRQUFNLEtBQUcsRUFBRSxPQUFLLEVBQUUsT0FBSyxFQUFFLE1BQUksRUFBRSxLQUFJ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QUFFLE1BQUksR0FBRSxFQUFFLE1BQUksSUFBRyxFQUFFO0NBQUU7Q0FBc0QsU0FBUyxFQUFFLEdBQUU7RUFBQyxJQUFJLElBQUUsRUFBRSxRQUFRLEVBQUUsTUFBSyxJQUFFQSxJQUFFLEtBQUksQ0FBQztFQUFFLE9BQU8sRUFBRSxJQUFFLEdBQUUsS0FBUyxFQUFFLE9BQUssRUFBRSxLQUFHLENBQUMsR0FBRSxFQUFFLElBQUksQ0FBQyxJQUFHLEVBQUUsTUFBTSxTQUFPLEVBQUU7Q0FBRTtDQUE2WCxTQUFTLElBQUc7RUFBQyxLQUFJLElBQUksR0FBRSxJQUFFTCxJQUFFLE1BQU0sSUFBRztHQUFDLElBQUksSUFBRSxFQUFFO0dBQUksSUFBRyxFQUFFLE9BQUssR0FBRSxJQUFHO0lBQUMsRUFBRSxJQUFJLEtBQUssQ0FBQyxHQUFFLEVBQUUsSUFBSSxLQUFLLENBQUMsR0FBRSxFQUFFLE1BQUksQ0FBQztHQUFDLFNBQU8sR0FBRTtJQUFDLEVBQUUsTUFBSSxDQUFDLEdBQUUsRUFBRSxJQUFJLEdBQUUsRUFBRSxHQUFHO0dBQUM7RUFBQztDQUFDO0NBQUMsRUFBRSxNQUFJLFNBQVMsR0FBRTtFQUFDLElBQUUsTUFBSyxLQUFHLEVBQUUsQ0FBQztDQUFDLEdBQUUsRUFBRSxLQUFHLFNBQVMsR0FBRSxHQUFFO0VBQUMsS0FBRyxFQUFFLE9BQUssRUFBRSxJQUFJLFFBQU0sRUFBRSxNQUFJLEVBQUUsSUFBSSxNQUFLSSxPQUFHQSxJQUFFLEdBQUUsQ0FBQztDQUFDLEdBQUUsRUFBRSxNQUFJLFNBQVMsR0FBRTtFQUFDLEtBQUcsRUFBRSxDQUFDLEdBQUUsSUFBRTtFQUFFLElBQUksS0FBRyxJQUFFLEVBQUUsS0FBSztFQUFJLE1BQUlQLFFBQUksS0FBRyxFQUFFLE1BQUksQ0FBQyxHQUFFLEVBQUUsTUFBSSxDQUFDLEdBQUUsRUFBRSxHQUFHLEtBQUssU0FBUyxHQUFFO0dBQUMsRUFBRSxRQUFNLEVBQUUsS0FBRyxFQUFFLE1BQUssRUFBRSxJQUFFLEVBQUUsTUFBSSxLQUFLO0VBQUMsQ0FBQyxNQUFJLEVBQUUsSUFBSSxLQUFLLENBQUMsR0FBRSxFQUFFLElBQUksS0FBSyxDQUFDLEdBQUUsRUFBRSxNQUFJLENBQUMsR0FBRSxJQUFFLEtBQUksTUFBRTtDQUFDLEdBQUUsRUFBRSxTQUFPLFNBQVMsR0FBRTtFQUFDLE9BQUdLLElBQUUsQ0FBQztFQUFFLElBQUksSUFBRSxFQUFFO0VBQUksS0FBRyxFQUFFLFFBQU0sRUFBRSxJQUFJLElBQUksV0FBUyxNQUFJRixJQUFFLEtBQUssQ0FBQyxLQUFHRixRQUFJLEVBQUUsMkJBQXlCLE1BQUUsRUFBRSwwQkFBd0IsR0FBRyxDQUFDLElBQUcsRUFBRSxJQUFJLEdBQUcsS0FBSyxTQUFTLEdBQUU7R0FBQyxFQUFFLE1BQUksRUFBRSxNQUFJLEVBQUUsSUFBRyxFQUFFLElBQUUsS0FBSztFQUFDLENBQUMsSUFBRyxNQUFFLElBQUU7Q0FBSSxHQUFFLEVBQUUsTUFBSSxTQUFTLEdBQUUsR0FBRTtFQUFDLEVBQUUsS0FBSyxTQUFTLEdBQUU7R0FBQyxJQUFHO0lBQUMsRUFBRSxJQUFJLEtBQUssQ0FBQyxHQUFFLEVBQUUsTUFBSSxFQUFFLElBQUksT0FBTyxTQUFTLEdBQUU7S0FBQyxPQUFNLENBQUMsRUFBRSxNQUFJLEVBQUUsQ0FBQztJQUFDLENBQUM7R0FBQyxTQUFPLEdBQUU7SUFBQyxFQUFFLEtBQUssU0FBUyxHQUFFO0tBQUMsRUFBRSxRQUFNLEVBQUUsTUFBSSxDQUFDO0lBQUUsQ0FBQyxHQUFFLElBQUUsQ0FBQyxHQUFFLEVBQUUsSUFBSSxHQUFFLEVBQUUsR0FBRztHQUFDO0VBQUMsQ0FBQyxHQUFFSyxPQUFHQSxJQUFFLEdBQUUsQ0FBQztDQUFDLEdBQUUsRUFBRSxVQUFRLFNBQVMsR0FBRTtFQUFDLEtBQUcsRUFBRSxDQUFDO0VBQUUsSUFBSSxHQUFFLElBQUUsRUFBRTtFQUFJLEtBQUcsRUFBRSxRQUFNLEVBQUUsSUFBSSxHQUFHLEtBQUssU0FBUyxHQUFFO0dBQUMsSUFBRztJQUFDLEVBQUUsQ0FBQztHQUFDLFNBQU8sR0FBRTtJQUFDLElBQUU7R0FBQztFQUFDLENBQUMsR0FBRSxFQUFFLE1BQUksS0FBSyxHQUFFLEtBQUcsRUFBRSxJQUFJLEdBQUUsRUFBRSxHQUFHO0NBQUU7Q0FBRSxJQUFJLElBQUUsY0FBWSxPQUFPO0NBQXNCLFNBQVMsRUFBRSxHQUFFO0VBQUMsSUFBSSxHQUFFLElBQUUsV0FBVTtHQUFDLGFBQWEsQ0FBQyxHQUFFLEtBQUcscUJBQXFCLENBQUMsR0FBRSxXQUFXLENBQUM7RUFBQyxHQUFFLElBQUUsV0FBVyxHQUFFLEVBQUU7RUFBRSxNQUFJLElBQUUsc0JBQXNCLENBQUM7Q0FBRTtDQUFDLFNBQVMsRUFBRSxHQUFFO0VBQUMsSUFBSSxJQUFFLEdBQUUsSUFBRSxFQUFFO0VBQUksY0FBWSxPQUFPLE1BQUksRUFBRSxNQUFJLEtBQUssR0FBRSxFQUFFLElBQUcsSUFBRTtDQUFDO0NBQUMsU0FBUyxFQUFFLEdBQUU7RUFBQyxJQUFJLElBQUU7RUFBRSxFQUFFLE1BQUksRUFBRSxHQUFHLEdBQUUsSUFBRTtDQUFDO0NBQUMsU0FBUyxFQUFFLEdBQUUsR0FBRTtFQUFDLE9BQU0sQ0FBQyxLQUFHLEVBQUUsV0FBUyxFQUFFLFVBQVEsRUFBRSxLQUFLLFNBQVMsR0FBRSxHQUFFO0dBQUMsT0FBTyxNQUFJLEVBQUU7RUFBRSxDQUFDO0NBQUM7OztDQ0F2K0YsSUFBMEUsSUFBRTtDQUFJLE1BQU07Q0FBUSxTQUFTLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7RUFBQyxNQUFJLElBQUUsQ0FBQztFQUFHLElBQUksR0FBRSxHQUFFLElBQUU7RUFBRSxJQUFHLFNBQVEsR0FBRSxLQUFJLEtBQUssSUFBRSxDQUFDLEdBQUUsR0FBRSxTQUFPLElBQUUsSUFBRSxFQUFFLEtBQUcsRUFBRSxLQUFHLEVBQUU7RUFBRyxJQUFJLElBQUU7R0FBQyxNQUFLO0dBQUUsT0FBTTtHQUFFLEtBQUk7R0FBRSxLQUFJO0dBQUUsS0FBSTtHQUFLLElBQUc7R0FBSyxLQUFJO0dBQUUsS0FBSTtHQUFLLEtBQUk7R0FBSyxhQUFZLEtBQUs7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QyxDQUFDO0VBQUUsT0FBTyxFQUFFO0NBQUs7Q0FBQyxFQUFFLGNBQVk7Q0FBTSxPQUFPLGlCQUFpQkMsSUFBRSxXQUFVO0VBQUMsYUFBWTtHQUFDLGNBQWEsQ0FBQztHQUFFLE9BQU0sS0FBSztFQUFDO0VBQUUsTUFBSztHQUFDLGNBQWEsQ0FBQztHQUFFLE9BQU07RUFBQztFQUFFLE9BQU07R0FBQyxjQUFhLENBQUM7R0FBRSxLQUFJLFdBQVU7SUFBQyxPQUFNLEVBQUMsTUFBSyxLQUFJO0dBQUM7RUFBQztFQUFFLEtBQUk7R0FBQyxjQUFhLENBQUM7R0FBRSxPQUFNO0VBQUM7Q0FBQyxDQUFDO0NBQUUsRUFBRSxPQUFNLFNBQVMsR0FBRSxHQUFFO0VBQUMsSUFBRyxZQUFVLE9BQU8sRUFBRSxNQUFLO0dBQUMsSUFBSSxHQUFFLElBQUUsRUFBRTtHQUFNLEtBQUksSUFBSSxLQUFLLEdBQUUsSUFBRyxlQUFhLEdBQUU7SUFBQyxJQUFJLElBQUUsRUFBRTtJQUFHLElBQUcsYUFBYUEsS0FBRTtLQUFDLElBQUcsQ0FBQyxHQUFFLEVBQUUsT0FBSyxJQUFFLENBQUM7S0FBRSxFQUFFLEtBQUc7S0FBRSxFQUFFLEtBQUcsRUFBRSxLQUFLO0lBQUM7R0FBQztFQUFDO0VBQUMsRUFBRSxDQUFDO0NBQUMsQ0FBQztDQUFFLEVBQUUsT0FBTSxTQUFTLEdBQUUsR0FBRTtFQUFDLEVBQUUsQ0FBQztFQUFFLEVBQUU7RUFBRSxJQUFJLEdBQUUsSUFBRSxFQUFFO0VBQUksSUFBRyxHQUFFO0dBQUMsRUFBRSxRQUFNO0dBQUcsSUFBRyxLQUFLLE9BQUssSUFBRSxFQUFFLE9BQU0sRUFBRSxPQUFLLElBQUUsU0FBUyxHQUFFO0lBQUMsSUFBSTtJQUFFLElBQUUsV0FBVTtLQUFDLElBQUU7SUFBSSxDQUFDO0lBQUUsRUFBRSxJQUFFLFdBQVU7S0FBQyxFQUFFLFFBQU07S0FBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQUM7SUFBRSxPQUFPO0dBQUMsRUFBRTtFQUFDO0VBQUssRUFBRSxDQUFDO0NBQUMsQ0FBQztDQUFFLEVBQUUsT0FBTSxTQUFTLEdBQUUsR0FBRSxHQUFFLEdBQUU7RUFBQyxFQUFFO0VBQVcsRUFBRSxHQUFFLEdBQUUsQ0FBQztDQUFDLENBQUM7Q0FBRSxFQUFFLFVBQVMsU0FBUyxHQUFFLEdBQUU7RUFBQyxFQUFFO0VBQVcsSUFBSTtFQUFFLElBQUcsWUFBVSxPQUFPLEVBQUUsU0FBTyxJQUFFLEVBQUUsTUFBSztHQUFDLElBQUksSUFBRSxFQUFFLE1BQUssSUFBRSxFQUFFO0dBQU0sSUFBRyxHQUFFO0lBQUMsSUFBSSxJQUFFLEVBQUU7SUFBRSxJQUFHLEdBQUUsS0FBSSxJQUFJLEtBQUssR0FBRTtLQUFDLElBQUksSUFBRSxFQUFFO0tBQUcsSUFBRyxLQUFLLE1BQUksS0FBRyxFQUFFLEtBQUssSUFBRztNQUFDLEVBQUUsRUFBRTtNQUFFLEVBQUUsS0FBRyxLQUFLO0tBQUM7SUFBQztTQUFNLEVBQUUsSUFBRSxJQUFFLENBQUM7SUFBRSxLQUFJLElBQUksS0FBSyxHQUFFO0tBQUMsSUFBSSxJQUFFLEVBQUUsSUFBRyxJQUFFLEVBQUU7S0FBRyxJQUFHLEtBQUssTUFBSSxHQUFFO01BQUMsSUFBRSxFQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7TUFBRSxFQUFFLEtBQUc7S0FBQyxPQUFNLEVBQUUsRUFBRSxHQUFFLENBQUM7SUFBQztHQUFDO0VBQUM7RUFBQyxFQUFFLENBQUM7Q0FBQyxDQUFDO0NBQUUsU0FBUyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7RUFBQyxJQUFJLElBQUUsS0FBSyxLQUFHLEtBQUssTUFBSSxFQUFFLGlCQUFnQixJQUFFQyxJQUFFLENBQUM7RUFBRSxPQUFNO0dBQUMsR0FBRSxTQUFTLEdBQUUsR0FBRTtJQUFDLEVBQUUsUUFBTTtJQUFFLElBQUU7R0FBQztHQUFFLEdBQUVDLElBQUUsV0FBVTtJQUFDLElBQUksSUFBRSxFQUFFLE1BQU07SUFBTSxJQUFHLEVBQUUsT0FBSyxHQUFFO0tBQUMsRUFBRSxLQUFHO0tBQUUsSUFBRyxHQUFFLEVBQUUsS0FBRztVQUFPLElBQUcs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