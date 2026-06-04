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
	var i$2 = Symbol.for("preact-signals");
	function t$1() {
		if (!(s$1 > 1)) {
			var i, t = !1;
			(function() {
				var i = c$1;
				c$1 = void 0;
				while (void 0 !== i) {
					if (i.S.v === i.v) i.S.i = i.i;
					i = i.o;
				}
			})();
			while (void 0 !== h$1) {
				var n = h$1;
				h$1 = void 0;
				v$1++;
				while (void 0 !== n) {
					var r = n.u;
					n.u = void 0;
					n.f &= -3;
					if (!(8 & n.f) && w$1(n)) try {
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
			v$1 = 0;
			s$1--;
			if (t) throw i;
		} else s$1--;
	}
	var r$1 = void 0;
	function o$2(i) {
		var t = r$1;
		r$1 = void 0;
		try {
			return i();
		} finally {
			r$1 = t;
		}
	}
	var f$2, h$1 = void 0, s$1 = 0, v$1 = 0, e$1 = 0, c$1 = void 0, d$1 = 0;
	function a$1(i) {
		if (void 0 !== r$1) {
			var t = i.n;
			if (void 0 === t || t.t !== r$1) {
				t = {
					i: 0,
					S: i,
					p: r$1.s,
					n: void 0,
					t: r$1,
					e: void 0,
					x: void 0,
					r: t
				};
				if (void 0 !== r$1.s) r$1.s.n = t;
				r$1.s = t;
				i.n = t;
				if (32 & r$1.f) i.S(t);
				return t;
			} else if (-1 === t.i) {
				t.i = 0;
				if (void 0 !== t.n) {
					t.n.p = t.p;
					if (void 0 !== t.p) t.p.n = t.n;
					t.p = r$1.s;
					t.n = void 0;
					r$1.s.n = t;
					r$1.s = t;
				}
				return t;
			}
		}
	}
	function l$1(i, t) {
		this.v = i;
		this.i = 0;
		this.n = void 0;
		this.t = void 0;
		this.l = 0;
		this.W = null == t ? void 0 : t.watched;
		this.Z = null == t ? void 0 : t.unwatched;
		this.name = null == t ? void 0 : t.name;
	}
	l$1.prototype.brand = i$2;
	l$1.prototype.h = function() {
		return !0;
	};
	l$1.prototype.S = function(i) {
		var t = this, n = this.t;
		if (n !== i && void 0 === i.e) {
			i.x = n;
			this.t = i;
			if (void 0 !== n) n.e = i;
			else o$2(function() {
				var i;
				null == (i = t.W) || i.call(t);
			});
		}
	};
	l$1.prototype.U = function(i) {
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
				if (void 0 === r) o$2(function() {
					var i;
					null == (i = t.Z) || i.call(t);
				});
			}
		}
	};
	l$1.prototype.subscribe = function(i) {
		var t = this;
		return j$1(function() {
			var n = t.value, o = r$1;
			r$1 = void 0;
			try {
				i(n);
			} finally {
				r$1 = o;
			}
		}, { name: "sub" });
	};
	l$1.prototype.valueOf = function() {
		return this.value;
	};
	l$1.prototype.toString = function() {
		return this.value + "";
	};
	l$1.prototype.toJSON = function() {
		return this.value;
	};
	l$1.prototype.peek = function() {
		var i = this;
		return o$2(function() {
			return i.value;
		});
	};
	Object.defineProperty(l$1.prototype, "value", {
		get: function() {
			var i = a$1(this);
			if (void 0 !== i) i.i = this.i;
			return this.v;
		},
		set: function(i) {
			if (i !== this.v) {
				if (v$1 > 100) throw new Error("Cycle detected");
				(function(i) {
					if (0 !== s$1 && 0 === v$1) {
						if (i.l !== e$1) {
							i.l = e$1;
							c$1 = {
								S: i,
								v: i.v,
								i: i.i,
								o: c$1
							};
						}
					}
				})(this);
				this.v = i;
				this.i++;
				d$1++;
				s$1++;
				try {
					for (var n = this.t; void 0 !== n; n = n.x) n.t.N();
				} finally {
					t$1();
				}
			}
		}
	});
	function y$1(i, t) {
		return new l$1(i, t);
	}
	function w$1(i) {
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
	function p$1(i, t) {
		l$1.call(this, void 0);
		this.x = i;
		this.s = void 0;
		this.g = d$1 - 1;
		this.f = 4;
		this.W = null == t ? void 0 : t.watched;
		this.Z = null == t ? void 0 : t.unwatched;
		this.name = null == t ? void 0 : t.name;
	}
	p$1.prototype = new l$1();
	p$1.prototype.h = function() {
		this.f &= -3;
		if (1 & this.f) return !1;
		if (32 == (36 & this.f)) return !0;
		this.f &= -5;
		if (this.g === d$1) return !0;
		this.g = d$1;
		this.f |= 1;
		if (this.i > 0 && !w$1(this)) {
			this.f &= -2;
			return !0;
		}
		var i = r$1;
		try {
			_$1(this);
			r$1 = this;
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
		r$1 = i;
		b$1(this);
		this.f &= -2;
		return !0;
	};
	p$1.prototype.S = function(i) {
		if (void 0 === this.t) {
			this.f |= 36;
			for (var t = this.s; void 0 !== t; t = t.n) t.S.S(t);
		}
		l$1.prototype.S.call(this, i);
	};
	p$1.prototype.U = function(i) {
		if (void 0 !== this.t) {
			l$1.prototype.U.call(this, i);
			if (void 0 === this.t) {
				this.f &= -33;
				for (var t = this.s; void 0 !== t; t = t.n) t.S.U(t);
			}
		}
	};
	p$1.prototype.N = function() {
		if (!(2 & this.f)) {
			this.f |= 6;
			for (var i = this.t; void 0 !== i; i = i.x) i.t.N();
		}
	};
	Object.defineProperty(p$1.prototype, "value", { get: function() {
		if (1 & this.f) throw new Error("Cycle detected");
		var i = a$1(this);
		this.h();
		if (void 0 !== i) i.i = this.i;
		if (16 & this.f) throw this.v;
		return this.v;
	} });
	function S$1(i) {
		var n = i.m;
		i.m = void 0;
		if ("function" == typeof n) {
			s$1++;
			var o = r$1;
			r$1 = void 0;
			try {
				n();
			} catch (t) {
				i.f &= -2;
				i.f |= 8;
				m$1(i);
				throw t;
			} finally {
				r$1 = o;
				t$1();
			}
		}
	}
	function m$1(i) {
		for (var t = i.s; void 0 !== t; t = t.n) t.S.U(t);
		i.x = void 0;
		i.s = void 0;
		S$1(i);
	}
	function x$1(i) {
		if (r$1 !== this) throw new Error("Out-of-order effect");
		b$1(this);
		r$1 = i;
		this.f &= -2;
		if (8 & this.f) m$1(this);
		t$1();
	}
	function E$1(i, t) {
		this.x = i;
		this.m = void 0;
		this.s = void 0;
		this.u = void 0;
		this.f = 32;
		this.name = null == t ? void 0 : t.name;
		if (f$2) f$2.push(this);
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
		s$1++;
		var i = r$1;
		r$1 = this;
		return x$1.bind(this, i);
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
		if (!(1 & this.f)) m$1(this);
	};
	E$1.prototype.dispose = function() {
		this.d();
	};
	function j$1(i, t) {
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
	//#region src/dom/boardReader.ts
	function getPlayerColor() {
		return querySelector(DomSelector.COORDS)?.classList.contains(CssClass.BLACK) ? PlayerColor.BLACK : PlayerColor.WHITE;
	}
	function readPiecePositions() {
		const board = querySelector(DomSelector.BOARD_NO_CUSTOM);
		if (!board) return [];
		const widthMatch = board.style.cssText.match(/width:\s*([0-9.]+)px/);
		const squareSize = (widthMatch ? Number.parseFloat(widthMatch[1]) : getBoundingClientRect(board).width) / 8;
		const playerColor = getPlayerColor();
		const pieces = board.querySelectorAll(DomSelector.PIECE);
		const positions = [];
		for (const piece of pieces) {
			const classes = piece.className.split(" ");
			const colorStr = classes[0];
			const typeStr = classes[1];
			const color = colorStr === "white" ? PlayerColor.WHITE : PlayerColor.BLACK;
			const type = typeStr;
			const match = piece.style.transform.match(/translate\(([0-9.]+)px,?\s*([0-9.]+)px?\)/);
			if (!match) continue;
			const square = pixelsToSquare({
				x: Number.parseFloat(match[1]) + squareSize / 2,
				y: Number.parseFloat(match[2]) - squareSize / 2
			}, squareSize, playerColor);
			positions.push({
				square,
				color,
				type
			});
		}
		return positions;
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
	//#region src/pure/pieceGrouping.ts
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
	//#region src/pure/speechText.ts
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
	//#region src/settings/defaults.ts
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
	//#region src/settings/settingsStore.ts
	var STORAGE_KEY = "lichess-board-speaker-settings";
	var settings = {
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
	function loadSettings() {
		const stored = getItem(STORAGE_KEY);
		if (!stored) return;
		const data = JSON.parse(stored);
		for (const key of Object.keys(data)) {
			const settingKey = key;
			if (settings[settingKey]) settings[settingKey].value = data[settingKey];
		}
	}
	function saveSettings() {
		const data = {};
		for (const key of Object.keys(settings)) {
			const settingKey = key;
			data[settingKey] = settings[settingKey].value;
		}
		setItem(STORAGE_KEY, JSON.stringify(data));
	}
	function setupAutoSave() {
		j$1(() => {
			for (const s of Object.values(settings)) s.value;
			saveSettings();
		});
	}
	//#endregion
	//#region src/handlers/handleSpeechCommand.ts
	function handleSpeechCommand(command) {
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
	//#region src/commands/keyboardInput.ts
	function setupKeyboardCommands() {
		const input = querySelector(DomSelector.KEYBOARD_INPUT);
		if (!input) return;
		const handleInput = (e) => {
			const target = e.target;
			const value = target.value;
			const command = KEYBOARD_COMMAND_MAP.get(value);
			if (command) {
				handleSpeechCommand(command);
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
	//#region node_modules/preact/dist/preact.module.js
	var n, l, u$1, i$1, r, o$1, e, f$1, c, a, s, h, p, v, d = {}, w = [], _ = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, g = Array.isArray;
	function m(n, l) {
		for (var u in l) n[u] = l[u];
		return n;
	}
	function b(n) {
		n && n.parentNode && n.parentNode.removeChild(n);
	}
	function k(l, u, t) {
		var i, r, o, e = {};
		for (o in u) "key" == o ? i = u[o] : "ref" == o ? r = u[o] : e[o] = u[o];
		if (arguments.length > 2 && (e.children = arguments.length > 3 ? n.call(arguments, 2) : t), "function" == typeof l && null != l.defaultProps) for (o in l.defaultProps) void 0 === e[o] && (e[o] = l.defaultProps[o]);
		return x(l, e, i, r, null);
	}
	function x(n, t, i, r, o) {
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
			__v: null == o ? ++u$1 : o,
			__i: -1,
			__u: 0
		};
		return null == o && null != l.vnode && l.vnode(e), e;
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
			var u = n.__v, t = u.__e, i = [], r = [], o = m({}, u);
			o.__v = u.__v + 1, l.vnode && l.vnode(o), q(n.__P, o, u, n.__n, n.__P.namespaceURI, 32 & u.__u ? [t] : null, i, null == t ? $(u) : t, !!(32 & u.__u), r), o.__v = u.__v, o.__.__k[o.__i] = o, D(i, o, r), u.__e = u.__ = null, o.__e != t && P(o);
		}
	}
	function P(n) {
		if (null != (n = n.__) && null != n.__c) return n.__e = n.__c.base = null, n.__k.some(function(l) {
			if (null != l && null != l.__e) return n.__e = n.__c.base = l.__e;
		}), P(n);
	}
	function A(n) {
		(!n.__d && (n.__d = !0) && i$1.push(n) && !H.__r++ || r != l.debounceRendering) && ((r = l.debounceRendering) || o$1)(H);
	}
	function H() {
		try {
			for (var n, l = 1; i$1.length;) i$1.length > l && i$1.sort(e), n = i$1.shift(), l = i$1.length, I(n);
		} finally {
			i$1.length = H.__r = 0;
		}
	}
	function L(n, l, u, t, i, r, o, e, f, c, a) {
		var s, h, p, v, y, _, g, m = t && t.__k || w, b = l.length;
		for (f = T(u, l, m, f, b), s = 0; s < b; s++) null != (p = u.__k[s]) && (h = -1 != p.__i && m[p.__i] || d, p.__i = s, _ = q(n, p, h, i, r, o, e, f, c, a), v = p.__e, p.ref && h.ref != p.ref && (h.ref && J(h.ref, null, p), a.push(p.ref, p.__c || v, p)), null == y && null != v && (y = v), (g = !!(4 & p.__u)) || h.__k === p.__k ? (f = j(p, f, n, g), g && h.__e && (h.__e = null)) : "function" == typeof p.type && void 0 !== _ ? f = _ : v && (f = v.nextSibling), p.__u &= -7);
		return u.__e = y, f;
	}
	function T(n, l, u, t, i) {
		var r, o, e, f, c, a = u.length, s = a, h = 0;
		for (n.__k = new Array(i), r = 0; r < i; r++) null != (o = l[r]) && "boolean" != typeof o && "function" != typeof o ? ("string" == typeof o || "number" == typeof o || "bigint" == typeof o || o.constructor == String ? o = n.__k[r] = x(null, o, null, null, null) : g(o) ? o = n.__k[r] = x(S, { children: o }, null, null, null) : void 0 === o.constructor && o.__b > 0 ? o = n.__k[r] = x(o.type, o.props, o.key, o.ref ? o.ref : null, o.__v) : n.__k[r] = o, f = r + h, o.__ = n, o.__b = n.__b + 1, e = null, -1 != (c = o.__i = O(o, u, f, s)) && (s--, (e = u[c]) && (e.__u |= 2)), null == e || null == e.__v ? (-1 == c && (i > a ? h-- : i < a && h++), "function" != typeof o.type && (o.__u |= 4)) : c != f && (c == f - 1 ? h-- : c == f + 1 ? h++ : (c > f ? h-- : h++, o.__u |= 4))) : n.__k[r] = null;
		if (s) for (r = 0; r < a; r++) null != (e = u[r]) && 0 == (2 & e.__u) && (e.__e == t && (t = $(e)), K(e, e));
		return t;
	}
	function j(n, l, u, t) {
		var i, r;
		if ("function" == typeof n.type) {
			for (i = n.__k, r = 0; i && r < i.length; r++) i[r] && (i[r].__ = n, l = j(i[r], l, u, t));
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
	function z(n, l, u) {
		"-" == l[0] ? n.setProperty(l, null == u ? "" : u) : n[l] = null == u ? "" : "number" != typeof u || _.test(l) ? u : u + "px";
	}
	function N(n, l, u, t, i) {
		var r, o;
		n: if ("style" == l) if ("string" == typeof u) n.style.cssText = u;
		else {
			if ("string" == typeof t && (n.style.cssText = t = ""), t) for (l in t) u && l in u || z(n.style, l, "");
			if (u) for (l in u) t && u[l] == t[l] || z(n.style, l, u[l]);
		}
		else if ("o" == l[0] && "n" == l[1]) r = l != (l = l.replace(s, "$1")), o = l.toLowerCase(), l = o in n || "onFocusOut" == l || "onFocusIn" == l ? o.slice(2) : l.slice(2), n.l || (n.l = {}), n.l[l + r] = u, u ? t ? u[a] = t[a] : (u[a] = h, n.addEventListener(l, r ? v : p, r)) : n.removeEventListener(l, r ? v : p, r);
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
				if (null == u[c]) u[c] = h++;
				else if (u[c] < t[a]) return;
				return t(l.event ? l.event(u) : u);
			}
		};
	}
	function q(n, u, t, i, r, o, e, f, c, a) {
		var s, h, p, v, y, d, _, k, x, M, $, I, P, A, H, T = u.type;
		if (void 0 !== u.constructor) return null;
		128 & t.__u && (c = !!(32 & t.__u), o = [f = u.__e = t.__e]), (s = l.__b) && s(u);
		n: if ("function" == typeof T) try {
			if (k = u.props, x = T.prototype && T.prototype.render, M = (s = T.contextType) && i[s.__c], $ = s ? M ? M.props.value : s.__ : i, t.__c ? _ = (h = u.__c = t.__c).__ = h.__E : (x ? u.__c = h = new T(k, $) : (u.__c = h = new C(k, $), h.constructor = T, h.render = Q), M && M.sub(h), h.state || (h.state = {}), h.__n = i, p = h.__d = !0, h.__h = [], h._sb = []), x && null == h.__s && (h.__s = h.state), x && null != T.getDerivedStateFromProps && (h.__s == h.state && (h.__s = m({}, h.__s)), m(h.__s, T.getDerivedStateFromProps(k, h.__s))), v = h.props, y = h.state, h.__v = u, p) x && null == T.getDerivedStateFromProps && null != h.componentWillMount && h.componentWillMount(), x && null != h.componentDidMount && h.__h.push(h.componentDidMount);
			else {
				if (x && null == T.getDerivedStateFromProps && k !== v && null != h.componentWillReceiveProps && h.componentWillReceiveProps(k, $), u.__v == t.__v || !h.__e && null != h.shouldComponentUpdate && !1 === h.shouldComponentUpdate(k, h.__s, $)) {
					u.__v != t.__v && (h.props = k, h.state = h.__s, h.__d = !1), u.__e = t.__e, u.__k = t.__k, u.__k.some(function(n) {
						n && (n.__ = u);
					}), w.push.apply(h.__h, h._sb), h._sb = [], h.__h.length && e.push(h);
					break n;
				}
				null != h.componentWillUpdate && h.componentWillUpdate(k, h.__s, $), x && null != h.componentDidUpdate && h.__h.push(function() {
					h.componentDidUpdate(v, y, d);
				});
			}
			if (h.context = $, h.props = k, h.__P = n, h.__e = !1, I = l.__r, P = 0, x) h.state = h.__s, h.__d = !1, I && I(u), s = h.render(h.props, h.state, h.context), w.push.apply(h.__h, h._sb), h._sb = [];
			else do
				h.__d = !1, I && I(u), s = h.render(h.props, h.state, h.context), h.state = h.__s;
			while (h.__d && ++P < 25);
			h.state = h.__s, null != h.getChildContext && (i = m(m({}, i), h.getChildContext())), x && !p && null != h.getSnapshotBeforeUpdate && (d = h.getSnapshotBeforeUpdate(v, y)), A = null != s && s.type === S && null == s.key ? E(s.props.children) : s, f = L(n, g(A) ? A : [A], u, t, i, r, o, e, f, c, a), h.base = u.__e, u.__u &= -161, h.__h.length && e.push(h), _ && (h.__E = h.__ = null);
		} catch (n) {
			if (u.__v = null, c || null != o) if (n.then) {
				for (u.__u |= c ? 160 : 128; f && 8 == f.nodeType && f.nextSibling;) f = f.nextSibling;
				o[o.indexOf(f)] = null, u.__e = f;
			} else {
				for (H = o.length; H--;) b(o[H]);
				B(u);
			}
			else u.__e = t.__e, u.__k = t.__k, n.then || B(u);
			l.__e(n, u, t);
		}
		else null == o && u.__v == t.__v ? (u.__k = t.__k, u.__e = t.__e) : f = u.__e = G(t.__e, u, t, i, r, o, e, c, a);
		return (s = l.diffed) && s(u), 128 & u.__u ? void 0 : f;
	}
	function B(n) {
		n && (n.__c && (n.__c.__e = !0), n.__k && n.__k.some(B));
	}
	function D(n, u, t) {
		for (var i = 0; i < t.length; i++) J(t[i], t[++i], t[++i]);
		l.__c && l.__c(u, n), n.some(function(u) {
			try {
				n = u.__h, u.__h = [], n.some(function(n) {
					n.call(u);
				});
			} catch (n) {
				l.__e(n, u.__v);
			}
		});
	}
	function E(n) {
		return "object" != typeof n || null == n || n.__b > 0 ? n : g(n) ? n.map(E) : void 0 !== n.constructor ? null : m({}, n);
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
			u = document.createElementNS(o, x, k.is && k), c && (l.__m && l.__m(t, e), c = !1), e = null;
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
			l.__e(n, t);
		}
	}
	function K(n, u, t) {
		var i, r;
		if (l.unmount && l.unmount(n), (i = n.ref) && (i.current && i.current != n.__e || J(i, null, u)), null != (i = n.__c)) {
			if (i.componentWillUnmount) try {
				i.componentWillUnmount();
			} catch (n) {
				l.__e(n, u);
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
		t == document && (t = document.documentElement), l.__ && l.__(u, t), o = (r = "function" == typeof i) ? null : i && i.__k || t.__k, e = [], f = [], q(t, u = (!r && i || t).__k = k(S, null, [u]), o || d, d, t.namespaceURI, !r && i ? [i] : o ? null : t.firstChild ? n.call(t.childNodes) : null, e, !r && i ? i : o ? o.__e : t.firstChild, r, f), D(e, u, f);
	}
	n = w.slice, l = { __e: function(n, l, u, t) {
		for (var i, r, o; l = l.__;) if ((i = l.__c) && !i.__) try {
			if ((r = i.constructor) && null != r.getDerivedStateFromError && (i.setState(r.getDerivedStateFromError(n)), o = i.__d), null != i.componentDidCatch && (i.componentDidCatch(n, t || {}), o = i.__d), o) return i.__E = i;
		} catch (l) {
			n = l;
		}
		throw n;
	} }, u$1 = 0, C.prototype.setState = function(n, l) {
		var u = null != this.__s && this.__s != this.state ? this.__s : this.__s = m({}, this.state);
		"function" == typeof n && (n = n(m({}, u), this.props)), n && m(u, n), null != n && this.__v && (l && this._sb.push(l), A(this));
	}, C.prototype.forceUpdate = function(n) {
		this.__v && (this.__e = !0, n && this.__h.push(n), A(this));
	}, C.prototype.render = S, i$1 = [], o$1 = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, e = function(n, l) {
		return n.__v.__b - l.__v.__b;
	}, H.__r = 0, f$1 = Math.random().toString(8), c = "__d" + f$1, a = "__a" + f$1, s = /(PointerCapture)$|Capture$/i, h = 0, p = V(!1), v = V(!0);
	//#endregion
	//#region node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js
	var f = 0;
	Array.isArray;
	function u(e, t, n, o, i, u) {
		t || (t = {});
		var a, c, p = t;
		if ("ref" in p) for (c in p = {}, t) "ref" == c ? a = t[c] : p[c] = t[c];
		var l$2 = {
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
		return l.vnode && l.vnode(l$2), l$2;
	}
	//#endregion
	//#region src/components/ButtonRow.tsx
	function ButtonRow({ children, visible }) {
		if (visible && !visible.value) return null;
		return /* @__PURE__ */ u("div", { children });
	}
	//#endregion
	//#region src/components/SettingButton.tsx
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
	//#region src/components/ControlPanel.tsx
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
	//#region src/components/root.tsx
	function createRoot(boardChanged, mountPoint) {
		R(/* @__PURE__ */ u(ControlPanel, { boardChanged }), mountPoint);
	}
	function destroyRoot(mountPoint) {
		R(null, mountPoint);
	}
	//#endregion
	//#region src/dom/boardObserver.ts
	function createBoardObserver(boardChanged) {
		return {
			observer: new MutationObserver(() => {
				boardChanged.value += 1;
			}),
			boardChanged
		};
	}
	function startBoardObserver(state) {
		const board = querySelector(DomSelector.BOARD);
		if (!board) return;
		state.observer.observe(board, {
			childList: true,
			attributes: true,
			subtree: true
		});
	}
	function stopBoardObserver(state) {
		state.observer.disconnect();
	}
	//#endregion
	//#region src/handlers/updateDividers.ts
	function updateDividers(state) {
		if (settings.dividersEnabled.value) showDividers(state);
		else hideDividers(state);
	}
	//#endregion
	//#region src/effects/onDividers.ts
	function setupDividersEffect(state) {
		return j$1(() => {
			settings.dividersEnabled.value;
			updateDividers(state);
		});
	}
	//#endregion
	//#region src/init.tsx
	async function init() {
		await waitForElement(DomSelector.KEYBOARD_MOVE);
		loadSettings();
		setupAutoSave();
		const boardChanged = y$1(0);
		const flashState = createFlashOverlay();
		const dividersState = createDividers();
		const boardObserverState = createBoardObserver(boardChanged);
		startBoardObserver(boardObserverState);
		const cleanupDividers = setupDividersEffect(dividersState);
		setupKeyboardCommands();
		const mountPoint = createDiv();
		const keyboardMove = querySelector(DomSelector.KEYBOARD_MOVE);
		if (keyboardMove) appendChild(keyboardMove, mountPoint);
		createRoot(boardChanged, mountPoint);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGljaGVzcy1ib2FyZC1zcGVha2VyLnVzZXIuanMiLCJuYW1lcyI6WyJpIiwidCIsInMiLCJjIiwiaCIsInciLCJyIiwibyIsImYiLCJ2IiwidSIsImUiLCJkIiwiYSIsImwiLCJqIiwieSIsIl8iLCJiIiwicCIsIlMiLCJtIiwieCIsIkUiLCJ1IiwiaSIsIm8iLCJmIiwibCIsInIiXSwic291cmNlcyI6WyJub2RlX21vZHVsZXMvQHByZWFjdC9zaWduYWxzLWNvcmUvZGlzdC9zaWduYWxzLWNvcmUubW9kdWxlLmpzIiwic3JjL2NvbnN0YW50cy9jaGVzcy50cyIsInNyYy9jb25zdGFudHMvY29tbWFuZHMudHMiLCJzcmMvY29uc3RhbnRzL2RvbS50cyIsInNyYy9wbGF0Zm9ybS9kb20udHMiLCJzcmMvYWRhcHRlcnMtb3ZlcmxheXMvZGl2aWRlcnMudHMiLCJzcmMvYWRhcHRlcnMtb3ZlcmxheXMvZmxhc2gudHMiLCJzcmMvcGxhdGZvcm0vc3BlZWNoQXBpLnRzIiwic3JjL2FkYXB0ZXJzLXNwZWVjaC9zcGVlY2hTeW50aGVzaXplci50cyIsInNyYy9kb21haW4vY2hlc3MvY29vcmRpbmF0ZXMudHMiLCJzcmMvZG9tL2JvYXJkUmVhZGVyLnRzIiwic3JjL3B1cmUvcGllY2VHcm91cGluZy50cyIsInNyYy9wdXJlL3NwZWVjaFRleHQudHMiLCJzcmMvcGxhdGZvcm0vc3RvcmFnZS50cyIsInNyYy9zZXR0aW5ncy9kZWZhdWx0cy50cyIsInNyYy9zZXR0aW5ncy9zZXR0aW5nc1N0b3JlLnRzIiwic3JjL2hhbmRsZXJzL2hhbmRsZVNwZWVjaENvbW1hbmQudHMiLCJzcmMvY29tbWFuZHMva2V5Ym9hcmRJbnB1dC50cyIsIm5vZGVfbW9kdWxlcy9wcmVhY3QvZGlzdC9wcmVhY3QubW9kdWxlLmpzIiwibm9kZV9tb2R1bGVzL3ByZWFjdC9qc3gtcnVudGltZS9kaXN0L2pzeFJ1bnRpbWUubW9kdWxlLmpzIiwic3JjL2NvbXBvbmVudHMvQnV0dG9uUm93LnRzeCIsInNyYy9jb21wb25lbnRzL1NldHRpbmdCdXR0b24udHN4Iiwic3JjL2NvbXBvbmVudHMvQ29udHJvbFBhbmVsLnRzeCIsInNyYy9jb21wb25lbnRzL3Jvb3QudHN4Iiwic3JjL2RvbS9ib2FyZE9ic2VydmVyLnRzIiwic3JjL2hhbmRsZXJzL3VwZGF0ZURpdmlkZXJzLnRzIiwic3JjL2VmZmVjdHMvb25EaXZpZGVycy50cyIsInNyYy9pbml0LnRzeCIsInNyYy9tYWluLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgaT1TeW1ib2wuZm9yKFwicHJlYWN0LXNpZ25hbHNcIik7ZnVuY3Rpb24gdCgpe2lmKCEocz4xKSl7dmFyIGksdD0hMTshZnVuY3Rpb24oKXt2YXIgaT1jO2M9dm9pZCAwO3doaWxlKHZvaWQgMCE9PWkpe2lmKGkuUy52PT09aS52KWkuUy5pPWkuaTtpPWkub319KCk7d2hpbGUodm9pZCAwIT09aCl7dmFyIG49aDtoPXZvaWQgMDt2Kys7d2hpbGUodm9pZCAwIT09bil7dmFyIHI9bi51O24udT12b2lkIDA7bi5mJj0tMztpZighKDgmbi5mKSYmdyhuKSl0cnl7bi5jKCl9Y2F0Y2gobil7aWYoIXQpe2k9bjt0PSEwfX1uPXJ9fXY9MDtzLS07aWYodCl0aHJvdyBpfWVsc2Ugcy0tfWZ1bmN0aW9uIG4oaSl7aWYocz4wKXJldHVybiBpKCk7ZT0rK3U7cysrO3RyeXtyZXR1cm4gaSgpfWZpbmFsbHl7dCgpfX12YXIgcj12b2lkIDA7ZnVuY3Rpb24gbyhpKXt2YXIgdD1yO3I9dm9pZCAwO3RyeXtyZXR1cm4gaSgpfWZpbmFsbHl7cj10fX12YXIgZixoPXZvaWQgMCxzPTAsdj0wLHU9MCxlPTAsYz12b2lkIDAsZD0wO2Z1bmN0aW9uIGEoaSl7aWYodm9pZCAwIT09cil7dmFyIHQ9aS5uO2lmKHZvaWQgMD09PXR8fHQudCE9PXIpe3Q9e2k6MCxTOmkscDpyLnMsbjp2b2lkIDAsdDpyLGU6dm9pZCAwLHg6dm9pZCAwLHI6dH07aWYodm9pZCAwIT09ci5zKXIucy5uPXQ7ci5zPXQ7aS5uPXQ7aWYoMzImci5mKWkuUyh0KTtyZXR1cm4gdH1lbHNlIGlmKC0xPT09dC5pKXt0Lmk9MDtpZih2b2lkIDAhPT10Lm4pe3Qubi5wPXQucDtpZih2b2lkIDAhPT10LnApdC5wLm49dC5uO3QucD1yLnM7dC5uPXZvaWQgMDtyLnMubj10O3Iucz10fXJldHVybiB0fX19ZnVuY3Rpb24gbChpLHQpe3RoaXMudj1pO3RoaXMuaT0wO3RoaXMubj12b2lkIDA7dGhpcy50PXZvaWQgMDt0aGlzLmw9MDt0aGlzLlc9bnVsbD09dD92b2lkIDA6dC53YXRjaGVkO3RoaXMuWj1udWxsPT10P3ZvaWQgMDp0LnVud2F0Y2hlZDt0aGlzLm5hbWU9bnVsbD09dD92b2lkIDA6dC5uYW1lfWwucHJvdG90eXBlLmJyYW5kPWk7bC5wcm90b3R5cGUuaD1mdW5jdGlvbigpe3JldHVybiEwfTtsLnByb3RvdHlwZS5TPWZ1bmN0aW9uKGkpe3ZhciB0PXRoaXMsbj10aGlzLnQ7aWYobiE9PWkmJnZvaWQgMD09PWkuZSl7aS54PW47dGhpcy50PWk7aWYodm9pZCAwIT09biluLmU9aTtlbHNlIG8oZnVuY3Rpb24oKXt2YXIgaTtudWxsPT0oaT10LlcpfHxpLmNhbGwodCl9KX19O2wucHJvdG90eXBlLlU9ZnVuY3Rpb24oaSl7dmFyIHQ9dGhpcztpZih2b2lkIDAhPT10aGlzLnQpe3ZhciBuPWkuZSxyPWkueDtpZih2b2lkIDAhPT1uKXtuLng9cjtpLmU9dm9pZCAwfWlmKHZvaWQgMCE9PXIpe3IuZT1uO2kueD12b2lkIDB9aWYoaT09PXRoaXMudCl7dGhpcy50PXI7aWYodm9pZCAwPT09cilvKGZ1bmN0aW9uKCl7dmFyIGk7bnVsbD09KGk9dC5aKXx8aS5jYWxsKHQpfSl9fX07bC5wcm90b3R5cGUuc3Vic2NyaWJlPWZ1bmN0aW9uKGkpe3ZhciB0PXRoaXM7cmV0dXJuIGooZnVuY3Rpb24oKXt2YXIgbj10LnZhbHVlLG89cjtyPXZvaWQgMDt0cnl7aShuKX1maW5hbGx5e3I9b319LHtuYW1lOlwic3ViXCJ9KX07bC5wcm90b3R5cGUudmFsdWVPZj1mdW5jdGlvbigpe3JldHVybiB0aGlzLnZhbHVlfTtsLnByb3RvdHlwZS50b1N0cmluZz1mdW5jdGlvbigpe3JldHVybiB0aGlzLnZhbHVlK1wiXCJ9O2wucHJvdG90eXBlLnRvSlNPTj1mdW5jdGlvbigpe3JldHVybiB0aGlzLnZhbHVlfTtsLnByb3RvdHlwZS5wZWVrPWZ1bmN0aW9uKCl7dmFyIGk9dGhpcztyZXR1cm4gbyhmdW5jdGlvbigpe3JldHVybiBpLnZhbHVlfSl9O09iamVjdC5kZWZpbmVQcm9wZXJ0eShsLnByb3RvdHlwZSxcInZhbHVlXCIse2dldDpmdW5jdGlvbigpe3ZhciBpPWEodGhpcyk7aWYodm9pZCAwIT09aSlpLmk9dGhpcy5pO3JldHVybiB0aGlzLnZ9LHNldDpmdW5jdGlvbihpKXtpZihpIT09dGhpcy52KXtpZih2PjEwMCl0aHJvdyBuZXcgRXJyb3IoXCJDeWNsZSBkZXRlY3RlZFwiKTshZnVuY3Rpb24oaSl7aWYoMCE9PXMmJjA9PT12KWlmKGkubCE9PWUpe2kubD1lO2M9e1M6aSx2OmkudixpOmkuaSxvOmN9fX0odGhpcyk7dGhpcy52PWk7dGhpcy5pKys7ZCsrO3MrKzt0cnl7Zm9yKHZhciBuPXRoaXMudDt2b2lkIDAhPT1uO249bi54KW4udC5OKCl9ZmluYWxseXt0KCl9fX19KTtmdW5jdGlvbiB5KGksdCl7cmV0dXJuIG5ldyBsKGksdCl9ZnVuY3Rpb24gdyhpKXtmb3IodmFyIHQ9aS5zO3ZvaWQgMCE9PXQ7dD10Lm4paWYodC5TLmkhPT10Lml8fCF0LlMuaCgpfHx0LlMuaSE9PXQuaSlyZXR1cm4hMDtyZXR1cm4hMX1mdW5jdGlvbiBfKGkpe2Zvcih2YXIgdD1pLnM7dm9pZCAwIT09dDt0PXQubil7dmFyIG49dC5TLm47aWYodm9pZCAwIT09bil0LnI9bjt0LlMubj10O3QuaT0tMTtpZih2b2lkIDA9PT10Lm4pe2kucz10O2JyZWFrfX19ZnVuY3Rpb24gYihpKXt2YXIgdD1pLnMsbj12b2lkIDA7d2hpbGUodm9pZCAwIT09dCl7dmFyIHI9dC5wO2lmKC0xPT09dC5pKXt0LlMuVSh0KTtpZih2b2lkIDAhPT1yKXIubj10Lm47aWYodm9pZCAwIT09dC5uKXQubi5wPXJ9ZWxzZSBuPXQ7dC5TLm49dC5yO2lmKHZvaWQgMCE9PXQucil0LnI9dm9pZCAwO3Q9cn1pLnM9bn1mdW5jdGlvbiBwKGksdCl7bC5jYWxsKHRoaXMsdm9pZCAwKTt0aGlzLng9aTt0aGlzLnM9dm9pZCAwO3RoaXMuZz1kLTE7dGhpcy5mPTQ7dGhpcy5XPW51bGw9PXQ/dm9pZCAwOnQud2F0Y2hlZDt0aGlzLlo9bnVsbD09dD92b2lkIDA6dC51bndhdGNoZWQ7dGhpcy5uYW1lPW51bGw9PXQ/dm9pZCAwOnQubmFtZX1wLnByb3RvdHlwZT1uZXcgbDtwLnByb3RvdHlwZS5oPWZ1bmN0aW9uKCl7dGhpcy5mJj0tMztpZigxJnRoaXMuZilyZXR1cm4hMTtpZigzMj09KDM2JnRoaXMuZikpcmV0dXJuITA7dGhpcy5mJj0tNTtpZih0aGlzLmc9PT1kKXJldHVybiEwO3RoaXMuZz1kO3RoaXMuZnw9MTtpZih0aGlzLmk+MCYmIXcodGhpcykpe3RoaXMuZiY9LTI7cmV0dXJuITB9dmFyIGk9cjt0cnl7Xyh0aGlzKTtyPXRoaXM7dmFyIHQ9dGhpcy54KCk7aWYoMTYmdGhpcy5mfHx0aGlzLnYhPT10fHwwPT09dGhpcy5pKXt0aGlzLnY9dDt0aGlzLmYmPS0xNzt0aGlzLmkrK319Y2F0Y2goaSl7dGhpcy52PWk7dGhpcy5mfD0xNjt0aGlzLmkrK31yPWk7Yih0aGlzKTt0aGlzLmYmPS0yO3JldHVybiEwfTtwLnByb3RvdHlwZS5TPWZ1bmN0aW9uKGkpe2lmKHZvaWQgMD09PXRoaXMudCl7dGhpcy5mfD0zNjtmb3IodmFyIHQ9dGhpcy5zO3ZvaWQgMCE9PXQ7dD10Lm4pdC5TLlModCl9bC5wcm90b3R5cGUuUy5jYWxsKHRoaXMsaSl9O3AucHJvdG90eXBlLlU9ZnVuY3Rpb24oaSl7aWYodm9pZCAwIT09dGhpcy50KXtsLnByb3RvdHlwZS5VLmNhbGwodGhpcyxpKTtpZih2b2lkIDA9PT10aGlzLnQpe3RoaXMuZiY9LTMzO2Zvcih2YXIgdD10aGlzLnM7dm9pZCAwIT09dDt0PXQubil0LlMuVSh0KX19fTtwLnByb3RvdHlwZS5OPWZ1bmN0aW9uKCl7aWYoISgyJnRoaXMuZikpe3RoaXMuZnw9Njtmb3IodmFyIGk9dGhpcy50O3ZvaWQgMCE9PWk7aT1pLngpaS50Lk4oKX19O09iamVjdC5kZWZpbmVQcm9wZXJ0eShwLnByb3RvdHlwZSxcInZhbHVlXCIse2dldDpmdW5jdGlvbigpe2lmKDEmdGhpcy5mKXRocm93IG5ldyBFcnJvcihcIkN5Y2xlIGRldGVjdGVkXCIpO3ZhciBpPWEodGhpcyk7dGhpcy5oKCk7aWYodm9pZCAwIT09aSlpLmk9dGhpcy5pO2lmKDE2JnRoaXMuZil0aHJvdyB0aGlzLnY7cmV0dXJuIHRoaXMudn19KTtmdW5jdGlvbiBnKGksdCl7cmV0dXJuIG5ldyBwKGksdCl9ZnVuY3Rpb24gUyhpKXt2YXIgbj1pLm07aS5tPXZvaWQgMDtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBuKXtzKys7dmFyIG89cjtyPXZvaWQgMDt0cnl7bigpfWNhdGNoKHQpe2kuZiY9LTI7aS5mfD04O20oaSk7dGhyb3cgdH1maW5hbGx5e3I9bzt0KCl9fX1mdW5jdGlvbiBtKGkpe2Zvcih2YXIgdD1pLnM7dm9pZCAwIT09dDt0PXQubil0LlMuVSh0KTtpLng9dm9pZCAwO2kucz12b2lkIDA7UyhpKX1mdW5jdGlvbiB4KGkpe2lmKHIhPT10aGlzKXRocm93IG5ldyBFcnJvcihcIk91dC1vZi1vcmRlciBlZmZlY3RcIik7Yih0aGlzKTtyPWk7dGhpcy5mJj0tMjtpZig4JnRoaXMuZiltKHRoaXMpO3QoKX1mdW5jdGlvbiBFKGksdCl7dGhpcy54PWk7dGhpcy5tPXZvaWQgMDt0aGlzLnM9dm9pZCAwO3RoaXMudT12b2lkIDA7dGhpcy5mPTMyO3RoaXMubmFtZT1udWxsPT10P3ZvaWQgMDp0Lm5hbWU7aWYoZilmLnB1c2godGhpcyl9RS5wcm90b3R5cGUuYz1mdW5jdGlvbigpe3ZhciBpPXRoaXMuUygpO3RyeXtpZig4JnRoaXMuZilyZXR1cm47aWYodm9pZCAwPT09dGhpcy54KXJldHVybjt2YXIgdD10aGlzLngoKTtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiB0KXRoaXMubT10fWZpbmFsbHl7aSgpfX07RS5wcm90b3R5cGUuUz1mdW5jdGlvbigpe2lmKDEmdGhpcy5mKXRocm93IG5ldyBFcnJvcihcIkN5Y2xlIGRldGVjdGVkXCIpO3RoaXMuZnw9MTt0aGlzLmYmPS05O1ModGhpcyk7Xyh0aGlzKTtzKys7dmFyIGk9cjtyPXRoaXM7cmV0dXJuIHguYmluZCh0aGlzLGkpfTtFLnByb3RvdHlwZS5OPWZ1bmN0aW9uKCl7aWYoISgyJnRoaXMuZikpe3RoaXMuZnw9Mjt0aGlzLnU9aDtoPXRoaXN9fTtFLnByb3RvdHlwZS5kPWZ1bmN0aW9uKCl7dGhpcy5mfD04O2lmKCEoMSZ0aGlzLmYpKW0odGhpcyl9O0UucHJvdG90eXBlLmRpc3Bvc2U9ZnVuY3Rpb24oKXt0aGlzLmQoKX07ZnVuY3Rpb24gaihpLHQpe3ZhciBuPW5ldyBFKGksdCk7dHJ5e24uYygpfWNhdGNoKGkpe24uZCgpO3Rocm93IGl9dmFyIHI9bi5kLmJpbmQobik7cltTeW1ib2wuZGlzcG9zZV09cjtyZXR1cm4gcn1mdW5jdGlvbiBDKGkpe3JldHVybiBmdW5jdGlvbigpe3ZhciB0PWFyZ3VtZW50cyxyPXRoaXM7cmV0dXJuIG4oZnVuY3Rpb24oKXtyZXR1cm4gbyhmdW5jdGlvbigpe3JldHVybiBpLmFwcGx5KHIsW10uc2xpY2UuY2FsbCh0KSl9KX0pfX1mdW5jdGlvbiBPKCl7dmFyIGk9ZjtmPVtdO3JldHVybiBmdW5jdGlvbigpe3ZhciB0PWY7aWYoZiYmaSlpPWkuY29uY2F0KGYpO2Y9aTtyZXR1cm4gdH19dmFyIGs9ZnVuY3Rpb24oaSl7Zm9yKHZhciB0IGluIGkpe3ZhciBuPWlbdF07aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgbilpW3RdPUMobik7ZWxzZSBpZihcIm9iamVjdFwiPT10eXBlb2YgbiYmbnVsbCE9PW4mJiEoXCJicmFuZFwiaW4gbikpayhuKX19O2Z1bmN0aW9uIFQoaSl7cmV0dXJuIGZ1bmN0aW9uKCl7dmFyIHQsbixyPU8oKTt0cnl7bj1pLmFwcGx5KHZvaWQgMCxbXS5zbGljZS5jYWxsKGFyZ3VtZW50cykpfWNhdGNoKGkpe2Y9dm9pZCAwO3Rocm93IGl9ZmluYWxseXt0PXIoKX1rKG4pO25bU3ltYm9sLmRpc3Bvc2VdPUMoZnVuY3Rpb24oKXtpZih0KWZvcih2YXIgaT0wO2k8dC5sZW5ndGg7aSsrKXRbaV0uZGlzcG9zZSgpO3Q9dm9pZCAwfSk7cmV0dXJuIG59fWV4cG9ydHtwIGFzIENvbXB1dGVkLEUgYXMgRWZmZWN0LGwgYXMgU2lnbmFsLEMgYXMgYWN0aW9uLG4gYXMgYmF0Y2gsZyBhcyBjb21wdXRlZCxUIGFzIGNyZWF0ZU1vZGVsLGogYXMgZWZmZWN0LHkgYXMgc2lnbmFsLG8gYXMgdW50cmFja2VkfTsvLyMgc291cmNlTWFwcGluZ1VSTD1zaWduYWxzLWNvcmUubW9kdWxlLmpzLm1hcFxuIiwiZXhwb3J0IGVudW0gUGxheWVyQ29sb3Ige1xuICBXSElURSA9ICd3aGl0ZScsXG4gIEJMQUNLID0gJ2JsYWNrJyxcbn1cblxuZXhwb3J0IGVudW0gUGllY2VUeXBlIHtcbiAgUEFXTiA9ICdwYXduJyxcbiAgS05JR0hUID0gJ2tuaWdodCcsXG4gIEJJU0hPUCA9ICdiaXNob3AnLFxuICBST09LID0gJ3Jvb2snLFxuICBRVUVFTiA9ICdxdWVlbicsXG4gIEtJTkcgPSAna2luZycsXG59XG5cbmV4cG9ydCBlbnVtIFF1YWRyYW50IHtcbiAgV0hJVEVfS0lORyA9ICd3aycsXG4gIFdISVRFX1FVRUVOID0gJ3dxJyxcbiAgQkxBQ0tfS0lORyA9ICdiaycsXG4gIEJMQUNLX1FVRUVOID0gJ2JxJyxcbn1cblxuLy8gSGVscGVyIGFycmF5cyBmb3IgaXRlcmF0aW9uXG5leHBvcnQgY29uc3QgUExBWUVSX0NPTE9SX1ZBTFVFUyA9IE9iamVjdC52YWx1ZXMoUGxheWVyQ29sb3IpXG5leHBvcnQgY29uc3QgUElFQ0VfVFlQRV9WQUxVRVMgPSBPYmplY3QudmFsdWVzKFBpZWNlVHlwZSlcbmV4cG9ydCBjb25zdCBRVUFEUkFOVF9WQUxVRVMgPSBPYmplY3QudmFsdWVzKFF1YWRyYW50KVxuIiwiZXhwb3J0IGVudW0gS2V5Ym9hcmRDb21tYW5kIHtcbiAgUFdLID0gJ3B3aycsXG4gIFBXUSA9ICdwd3EnLFxuICBQQksgPSAncGJrJyxcbiAgUEJRID0gJ3BicScsXG4gIFBBID0gJ3BhJyxcbiAgUFdXID0gJ3B3dycsXG4gIFBCQiA9ICdwYmInLFxuICBQU1MgPSAncHNzJyxcbn1cblxuZXhwb3J0IGVudW0gU3BlZWNoQ29tbWFuZCB7XG4gIEFMTCA9ICdhbGwnLFxuICBXSElURSA9ICd3aGl0ZScsXG4gIEJMQUNLID0gJ2JsYWNrJyxcbiAgU1RPUCA9ICdzdG9wJyxcbiAgV0sgPSAnd2snLFxuICBXUSA9ICd3cScsXG4gIEJLID0gJ2JrJyxcbiAgQlEgPSAnYnEnLFxufVxuXG4vLyBLZXlib2FyZCB0byBzcGVlY2ggY29tbWFuZCBtYXBwaW5nXG5leHBvcnQgY29uc3QgS0VZQk9BUkRfQ09NTUFORF9NQVAgPSBuZXcgTWFwKFtcbiAgW0tleWJvYXJkQ29tbWFuZC5QV0ssIFNwZWVjaENvbW1hbmQuV0tdLFxuICBbS2V5Ym9hcmRDb21tYW5kLlBXUSwgU3BlZWNoQ29tbWFuZC5XUV0sXG4gIFtLZXlib2FyZENvbW1hbmQuUEJLLCBTcGVlY2hDb21tYW5kLkJLXSxcbiAgW0tleWJvYXJkQ29tbWFuZC5QQlEsIFNwZWVjaENvbW1hbmQuQlFdLFxuICBbS2V5Ym9hcmRDb21tYW5kLlBBLCBTcGVlY2hDb21tYW5kLkFMTF0sXG4gIFtLZXlib2FyZENvbW1hbmQuUFdXLCBTcGVlY2hDb21tYW5kLldISVRFXSxcbiAgW0tleWJvYXJkQ29tbWFuZC5QQkIsIFNwZWVjaENvbW1hbmQuQkxBQ0tdLFxuICBbS2V5Ym9hcmRDb21tYW5kLlBTUywgU3BlZWNoQ29tbWFuZC5TVE9QXSxcbl0gYXMgY29uc3QpXG4iLCIvLyBET00gc2VsZWN0b3JzIGVudW1cbmV4cG9ydCBlbnVtIERvbVNlbGVjdG9yIHtcbiAgQk9BUkQgPSAnY2ctYm9hcmQnLFxuICBCT0FSRF9OT19DVVNUT00gPSAnY2ctYm9hcmQ6bm90KC51c2Vyc2NyaXB0LWN1c3RvbS1ib2FyZCknLFxuICBDT09SRFMgPSAnY29vcmRzJyxcbiAgUElFQ0UgPSAncGllY2UnLFxuICBDT05UQUlORVIgPSAnY2ctY29udGFpbmVyJyxcbiAgS0VZQk9BUkRfTU9WRSA9ICcua2V5Ym9hcmQtbW92ZScsXG4gIEtFWUJPQVJEX0lOUFVUID0gJy5rZXlib2FyZC1tb3ZlIGlucHV0Jyxcbn1cblxuLy8gQ1NTIGNsYXNzZXMgZW51bVxuZXhwb3J0IGVudW0gQ3NzQ2xhc3Mge1xuICBCTEFDSyA9ICdibGFjaycsXG4gIFVTRVJTQ1JJUFRfRElWSURFUlMgPSAndXNlcnNjcmlwdC1kaXZpZGVycycsXG4gIFVTRVJTQ1JJUFRfRkxBU0ggPSAndXNlcnNjcmlwdC1mbGFzaC1vdmVybGF5Jyxcbn1cblxuLy8gQ1NTIGRpc3BsYXkgdmFsdWVzIGVudW1cbmV4cG9ydCBlbnVtIENzc0Rpc3BsYXkge1xuICBCTE9DSyA9ICdibG9jaycsXG4gIE5PTkUgPSAnbm9uZScsXG59XG4iLCJleHBvcnQgZnVuY3Rpb24gY3JlYXRlRGl2KCk6IEhUTUxEaXZFbGVtZW50IHtcbiAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTdmdFbGVtZW50KHRhZzogc3RyaW5nKTogU1ZHRWxlbWVudCB7XG4gIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgdGFnKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcXVlcnlTZWxlY3RvcihzZWxlY3Rvcjogc3RyaW5nKTogRWxlbWVudCB8IG51bGwge1xuICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcilcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3I6IHN0cmluZyk6IE5vZGVMaXN0T2Y8RWxlbWVudD4ge1xuICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcilcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFwcGVuZENoaWxkKHBhcmVudDogRWxlbWVudCwgY2hpbGQ6IEVsZW1lbnQpOiB2b2lkIHtcbiAgcGFyZW50LmFwcGVuZENoaWxkKGNoaWxkKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGVsZW1lbnQ6IEVsZW1lbnQpOiBET01SZWN0IHtcbiAgcmV0dXJuIGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbn1cbiIsImltcG9ydCB7IENzc0NsYXNzLCBDc3NEaXNwbGF5LCBEb21TZWxlY3RvciB9IGZyb20gJy4uL2NvbnN0YW50cydcbmltcG9ydCB7IGFwcGVuZENoaWxkLCBjcmVhdGVTdmdFbGVtZW50LCBxdWVyeVNlbGVjdG9yIH0gZnJvbSAnLi4vcGxhdGZvcm0vZG9tJ1xuXG5leHBvcnQgaW50ZXJmYWNlIERpdmlkZXJzU3RhdGUge1xuICBzdmc6IFNWR1NWR0VsZW1lbnRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZURpdmlkZXJzKCk6IERpdmlkZXJzU3RhdGUge1xuICBjb25zdCBib2FyZCA9IHF1ZXJ5U2VsZWN0b3IoRG9tU2VsZWN0b3IuQk9BUkQpXG4gIGlmICghYm9hcmQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0JvYXJkIG5vdCBmb3VuZCcpXG4gIH1cblxuICBjb25zdCByZWN0ID0gYm9hcmQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgY29uc3Qgc2l6ZSA9IHJlY3Qud2lkdGhcblxuICBjb25zdCBzdmcgPSBjcmVhdGVTdmdFbGVtZW50KCdzdmcnKSBhcyBTVkdTVkdFbGVtZW50XG4gIHN2Zy5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgQ3NzQ2xhc3MuVVNFUlNDUklQVF9ESVZJREVSUylcbiAgc3ZnLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCBzaXplLnRvU3RyaW5nKCkpXG4gIHN2Zy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIHNpemUudG9TdHJpbmcoKSlcbiAgc3ZnLnN0eWxlLmNzc1RleHQgPSBgXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMDtcbiAgICBsZWZ0OiAwO1xuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIGBcblxuICAvLyBWZXJ0aWNhbCBsaW5lXG4gIGNvbnN0IHZMaW5lID0gY3JlYXRlU3ZnRWxlbWVudCgnbGluZScpXG4gIHZMaW5lLnNldEF0dHJpYnV0ZSgneDEnLCAoc2l6ZSAvIDIpLnRvU3RyaW5nKCkpXG4gIHZMaW5lLnNldEF0dHJpYnV0ZSgneTEnLCAnMCcpXG4gIHZMaW5lLnNldEF0dHJpYnV0ZSgneDInLCAoc2l6ZSAvIDIpLnRvU3RyaW5nKCkpXG4gIHZMaW5lLnNldEF0dHJpYnV0ZSgneTInLCBzaXplLnRvU3RyaW5nKCkpXG4gIHZMaW5lLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJywgJ3JlZCcpXG4gIHZMaW5lLnNldEF0dHJpYnV0ZSgnc3Ryb2tlLXdpZHRoJywgJzInKVxuXG4gIC8vIEhvcml6b250YWwgbGluZVxuICBjb25zdCBoTGluZSA9IGNyZWF0ZVN2Z0VsZW1lbnQoJ2xpbmUnKVxuICBoTGluZS5zZXRBdHRyaWJ1dGUoJ3gxJywgJzAnKVxuICBoTGluZS5zZXRBdHRyaWJ1dGUoJ3kxJywgKHNpemUgLyAyKS50b1N0cmluZygpKVxuICBoTGluZS5zZXRBdHRyaWJ1dGUoJ3gyJywgc2l6ZS50b1N0cmluZygpKVxuICBoTGluZS5zZXRBdHRyaWJ1dGUoJ3kyJywgKHNpemUgLyAyKS50b1N0cmluZygpKVxuICBoTGluZS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsICdyZWQnKVxuICBoTGluZS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS13aWR0aCcsICcyJylcblxuICBhcHBlbmRDaGlsZChzdmcsIHZMaW5lKVxuICBhcHBlbmRDaGlsZChzdmcsIGhMaW5lKVxuXG4gIGFwcGVuZENoaWxkKGJvYXJkLCBzdmcpXG5cbiAgcmV0dXJuIHsgc3ZnIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNob3dEaXZpZGVycyhzdGF0ZTogRGl2aWRlcnNTdGF0ZSk6IHZvaWQge1xuICBzdGF0ZS5zdmcuc3R5bGUuZGlzcGxheSA9IENzc0Rpc3BsYXkuQkxPQ0tcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhpZGVEaXZpZGVycyhzdGF0ZTogRGl2aWRlcnNTdGF0ZSk6IHZvaWQge1xuICBzdGF0ZS5zdmcuc3R5bGUuZGlzcGxheSA9IENzc0Rpc3BsYXkuTk9ORVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVzdHJveURpdmlkZXJzKHN0YXRlOiBEaXZpZGVyc1N0YXRlKTogdm9pZCB7XG4gIHN0YXRlLnN2Zy5yZW1vdmUoKVxufVxuIiwiaW1wb3J0IHsgQ3NzQ2xhc3MsIENzc0Rpc3BsYXksIERvbVNlbGVjdG9yIH0gZnJvbSAnLi4vY29uc3RhbnRzJ1xuaW1wb3J0IHsgYXBwZW5kQ2hpbGQsIGNyZWF0ZURpdiwgcXVlcnlTZWxlY3RvciB9IGZyb20gJy4uL3BsYXRmb3JtL2RvbSdcblxuZXhwb3J0IGludGVyZmFjZSBGbGFzaE92ZXJsYXlTdGF0ZSB7XG4gIG92ZXJsYXk6IEhUTUxFbGVtZW50XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVGbGFzaE92ZXJsYXkoKTogRmxhc2hPdmVybGF5U3RhdGUge1xuICBjb25zdCBvdmVybGF5ID0gY3JlYXRlRGl2KClcbiAgb3ZlcmxheS5jbGFzc05hbWUgPSBDc3NDbGFzcy5VU0VSU0NSSVBUX0ZMQVNIXG4gIG92ZXJsYXkuc3R5bGUuY3NzVGV4dCA9IGBcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAwO1xuICAgIGxlZnQ6IDA7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIGJhY2tncm91bmQ6IGJsYWNrO1xuICAgIHotaW5kZXg6IDEwMDA7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgYFxuXG4gIGNvbnN0IGNvbnRhaW5lciA9IHF1ZXJ5U2VsZWN0b3IoRG9tU2VsZWN0b3IuQ09OVEFJTkVSKVxuICBpZiAoY29udGFpbmVyKSB7XG4gICAgYXBwZW5kQ2hpbGQoY29udGFpbmVyLCBvdmVybGF5KVxuICB9XG5cbiAgcmV0dXJuIHsgb3ZlcmxheSB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93Rmxhc2goc3RhdGU6IEZsYXNoT3ZlcmxheVN0YXRlKTogdm9pZCB7XG4gIHN0YXRlLm92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IENzc0Rpc3BsYXkuQkxPQ0tcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhpZGVGbGFzaChzdGF0ZTogRmxhc2hPdmVybGF5U3RhdGUpOiB2b2lkIHtcbiAgc3RhdGUub3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gQ3NzRGlzcGxheS5OT05FXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXN0cm95Rmxhc2hPdmVybGF5KHN0YXRlOiBGbGFzaE92ZXJsYXlTdGF0ZSk6IHZvaWQge1xuICBzdGF0ZS5vdmVybGF5LnJlbW92ZSgpXG59XG4iLCJleHBvcnQgZnVuY3Rpb24gZ2V0U3BlZWNoU3ludGhlc2lzKCk6IFNwZWVjaFN5bnRoZXNpcyB7XG4gIHJldHVybiB3aW5kb3cuc3BlZWNoU3ludGhlc2lzXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTcGVlY2hTeW50aGVzaXNVdHRlcmFuY2UoKTogdHlwZW9mIFNwZWVjaFN5bnRoZXNpc1V0dGVyYW5jZSB7XG4gIHJldHVybiBTcGVlY2hTeW50aGVzaXNVdHRlcmFuY2Vcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNwZWFrKHN5bnRoZXNpczogU3BlZWNoU3ludGhlc2lzLCB1dHRlcmFuY2U6IFNwZWVjaFN5bnRoZXNpc1V0dGVyYW5jZSk6IHZvaWQge1xuICBzeW50aGVzaXMuc3BlYWsodXR0ZXJhbmNlKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FuY2VsKHN5bnRoZXNpczogU3BlZWNoU3ludGhlc2lzKTogdm9pZCB7XG4gIHN5bnRoZXNpcy5jYW5jZWwoKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVXR0ZXJhbmNlKFxuICBVdHRlcmFuY2VDbGFzczogdHlwZW9mIFNwZWVjaFN5bnRoZXNpc1V0dGVyYW5jZSxcbiAgdGV4dDogc3RyaW5nXG4pOiBTcGVlY2hTeW50aGVzaXNVdHRlcmFuY2Uge1xuICByZXR1cm4gbmV3IFV0dGVyYW5jZUNsYXNzKHRleHQpXG59XG4iLCJpbXBvcnQgKiBhcyBzcGVlY2hBcGkgZnJvbSAnLi4vcGxhdGZvcm0vc3BlZWNoQXBpJ1xuXG5sZXQgY3VycmVudFJhdGUgPSAxLjBcblxuZXhwb3J0IGZ1bmN0aW9uIHNwZWFrKHRleHQ6IHN0cmluZywgcmF0ZTogbnVtYmVyKTogdm9pZCB7XG4gIGNvbnN0IHN5bnRoZXNpcyA9IHNwZWVjaEFwaS5nZXRTcGVlY2hTeW50aGVzaXMoKVxuICBjb25zdCBVdHRlcmFuY2VDbGFzcyA9IHNwZWVjaEFwaS5nZXRTcGVlY2hTeW50aGVzaXNVdHRlcmFuY2UoKVxuICBjb25zdCB1dHRlcmFuY2UgPSBzcGVlY2hBcGkuY3JlYXRlVXR0ZXJhbmNlKFV0dGVyYW5jZUNsYXNzLCB0ZXh0KVxuICB1dHRlcmFuY2UucmF0ZSA9IHJhdGVcbiAgc3BlZWNoQXBpLnNwZWFrKHN5bnRoZXNpcywgdXR0ZXJhbmNlKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RvcFNwZWFraW5nKCk6IHZvaWQge1xuICBjb25zdCBzeW50aGVzaXMgPSBzcGVlY2hBcGkuZ2V0U3BlZWNoU3ludGhlc2lzKClcbiAgc3BlZWNoQXBpLmNhbmNlbChzeW50aGVzaXMpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRSYXRlKHJhdGU6IG51bWJlcik6IHZvaWQge1xuICBjdXJyZW50UmF0ZSA9IHJhdGVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFJhdGUoKTogbnVtYmVyIHtcbiAgcmV0dXJuIGN1cnJlbnRSYXRlXG59XG4iLCJpbXBvcnQgeyBQbGF5ZXJDb2xvciB9IGZyb20gJy4uLy4uL2NvbnN0YW50cydcblxuZXhwb3J0IGludGVyZmFjZSBQaXhlbFBvc2l0aW9uIHtcbiAgeDogbnVtYmVyXG4gIHk6IG51bWJlclxufVxuXG5jb25zdCBGSUxFUyA9ICdhYmNkZWZnaCdcblxuZXhwb3J0IGZ1bmN0aW9uIHBpeGVsc1RvU3F1YXJlKFxuICBwb3NpdGlvbjogUGl4ZWxQb3NpdGlvbixcbiAgc3F1YXJlU2l6ZTogbnVtYmVyLFxuICBwbGF5ZXJDb2xvcjogUGxheWVyQ29sb3Jcbik6IHN0cmluZyB7XG4gIC8vIENvbnZlcnQgcGl4ZWxzIHRvIGdyaWQgaW5kaWNlcyAoMC03KVxuICAvLyBBZGp1c3QgZm9yIGNlbnRlci1iYXNlZCBjb29yZGluYXRlcyBiZWZvcmUgcm91bmRpbmdcbiAgbGV0IGNvbCA9IE1hdGgucm91bmQoKHBvc2l0aW9uLnggLSBzcXVhcmVTaXplIC8gMikgLyBzcXVhcmVTaXplKVxuICBsZXQgcm93ID0gTWF0aC5yb3VuZCgocG9zaXRpb24ueSAtIHNxdWFyZVNpemUgLyAyKSAvIHNxdWFyZVNpemUpXG5cbiAgLy8gQ2xhbXAgdG8gdmFsaWQgcmFuZ2VcbiAgY29sID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oNywgY29sKSlcbiAgcm93ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oNywgcm93KSlcblxuICAvLyBDb252ZXJ0IHRvIHJhbmsgYmFzZWQgb24gcGxheWVyIGNvbG9yXG4gIC8vIEZvciB3aGl0ZTogeT0wIGlzIHJhbmsgOCwgeSBpbmNyZWFzZXMgZ29pbmcgdG8gcmFuayAxXG4gIC8vIEZvciBibGFjazogeT0wIGlzIHJhbmsgMSwgeSBpbmNyZWFzZXMgZ29pbmcgdG8gcmFuayA4XG4gIGxldCByYW5rOiBudW1iZXJcbiAgbGV0IGZpbGU6IHN0cmluZ1xuXG4gIGlmIChwbGF5ZXJDb2xvciA9PT0gUGxheWVyQ29sb3IuV0hJVEUpIHtcbiAgICBmaWxlID0gRklMRVNbY29sXVxuICAgIHJhbmsgPSA4IC0gcm93XG4gIH0gZWxzZSB7XG4gICAgZmlsZSA9IEZJTEVTWzcgLSBjb2xdXG4gICAgcmFuayA9IHJvdyArIDFcbiAgfVxuXG4gIHJldHVybiBgJHtmaWxlfSR7cmFua31gXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzcXVhcmVUb1BpeGVscyhcbiAgc3F1YXJlOiBzdHJpbmcsXG4gIHNxdWFyZVNpemU6IG51bWJlcixcbiAgcGxheWVyQ29sb3I6IFBsYXllckNvbG9yXG4pOiBQaXhlbFBvc2l0aW9uIHtcbiAgLy8gVmFsaWRhdGUgc3F1YXJlIGZvcm1hdFxuICBpZiAoc3F1YXJlLmxlbmd0aCA8IDIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgc3F1YXJlIG5vdGF0aW9uOiAke3NxdWFyZX1gKVxuICB9XG5cbiAgLy8gUGFyc2Ugc3F1YXJlIG5vdGF0aW9uXG4gIGNvbnN0IGZpbGUgPSBzcXVhcmVbMF1cbiAgY29uc3QgcmFuayA9IE51bWJlci5wYXJzZUludChzcXVhcmVbMV0sIDEwKVxuXG4gIC8vIFZhbGlkYXRlIGZpbGUgYW5kIHJhbmtcbiAgY29uc3QgY29sID0gRklMRVMuaW5kZXhPZihmaWxlKVxuICBpZiAoY29sID09PSAtMSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBmaWxlOiAke2ZpbGV9YClcbiAgfVxuICBpZiAocmFuayA8IDEgfHwgcmFuayA+IDggfHwgTnVtYmVyLmlzTmFOKHJhbmspKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHJhbms6ICR7cmFua31gKVxuICB9XG5cbiAgLy8gQ2FsY3VsYXRlIHBpeGVsIHBvc2l0aW9uIGJhc2VkIG9uIHBsYXllciBjb2xvclxuICBsZXQgcGl4ZWxDb2w6IG51bWJlclxuICBsZXQgcGl4ZWxSb3c6IG51bWJlclxuXG4gIGlmIChwbGF5ZXJDb2xvciA9PT0gUGxheWVyQ29sb3IuV0hJVEUpIHtcbiAgICAvLyBGb3Igd2hpdGU6IGZpbGVzIGdvIGxlZnQtdG8tcmlnaHQgKGEtaCksIHJhbmtzIGdvIGJvdHRvbS10by10b3AgKDEtOClcbiAgICAvLyBTbyByYW5rIDEgaXMgYXQgYm90dG9tIChyb3cgNyksIHJhbmsgOCBpcyBhdCB0b3AgKHJvdyAwKVxuICAgIHBpeGVsQ29sID0gY29sXG4gICAgcGl4ZWxSb3cgPSA4IC0gcmFua1xuICB9IGVsc2Uge1xuICAgIC8vIEZvciBibGFjazogZmlsZXMgZ28gcmlnaHQtdG8tbGVmdCAoaC1hKSwgcmFua3MgZ28gdG9wLXRvLWJvdHRvbSAoOC0xKVxuICAgIC8vIFNvIHJhbmsgOCBpcyBhdCB0b3AgKHJvdyAwKSwgcmFuayAxIGlzIGF0IGJvdHRvbSAocm93IDcpXG4gICAgcGl4ZWxDb2wgPSA3IC0gY29sXG4gICAgcGl4ZWxSb3cgPSByYW5rIC0gMVxuICB9XG5cbiAgLy8gQ29udmVydCB0byBwaXhlbHMgKGNlbnRlciBvZiBzcXVhcmUpXG4gIHJldHVybiB7XG4gICAgeDogcGl4ZWxDb2wgKiBzcXVhcmVTaXplICsgc3F1YXJlU2l6ZSAvIDIsXG4gICAgeTogcGl4ZWxSb3cgKiBzcXVhcmVTaXplICsgc3F1YXJlU2l6ZSAvIDIsXG4gIH1cbn1cbiIsImltcG9ydCB7IENzc0NsYXNzLCBEb21TZWxlY3RvciwgdHlwZSBQaWVjZVR5cGUsIFBsYXllckNvbG9yIH0gZnJvbSAnLi4vY29uc3RhbnRzJ1xuaW1wb3J0IHsgcGl4ZWxzVG9TcXVhcmUgfSBmcm9tICcuLi9kb21haW4vY2hlc3MvY29vcmRpbmF0ZXMnXG5pbXBvcnQgeyBnZXRCb3VuZGluZ0NsaWVudFJlY3QsIHF1ZXJ5U2VsZWN0b3IgfSBmcm9tICcuLi9wbGF0Zm9ybS9kb20nXG5pbXBvcnQgdHlwZSB7IFBpZWNlUG9zaXRpb24gfSBmcm9tICcuLi9wdXJlL3BpZWNlR3JvdXBpbmcnXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQbGF5ZXJDb2xvcigpOiBQbGF5ZXJDb2xvciB7XG4gIGNvbnN0IGNvb3JkcyA9IHF1ZXJ5U2VsZWN0b3IoRG9tU2VsZWN0b3IuQ09PUkRTKVxuICByZXR1cm4gY29vcmRzPy5jbGFzc0xpc3QuY29udGFpbnMoQ3NzQ2xhc3MuQkxBQ0spID8gUGxheWVyQ29sb3IuQkxBQ0sgOiBQbGF5ZXJDb2xvci5XSElURVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVhZFBpZWNlUG9zaXRpb25zKCk6IFBpZWNlUG9zaXRpb25bXSB7XG4gIGNvbnN0IGJvYXJkID0gcXVlcnlTZWxlY3RvcihEb21TZWxlY3Rvci5CT0FSRF9OT19DVVNUT00pXG4gIGlmICghYm9hcmQpIHJldHVybiBbXVxuXG4gIC8vIFBhcnNlIHdpZHRoIGZyb20gc3R5bGUgYXR0cmlidXRlIHNpbmNlIGdldEJvdW5kaW5nQ2xpZW50UmVjdCBtYXkgbm90IHdvcmsgaW4gdGVzdCBlbnZpcm9ubWVudHNcbiAgY29uc3QgYm9hcmRFbGVtZW50ID0gYm9hcmQgYXMgSFRNTEVsZW1lbnRcbiAgY29uc3Qgd2lkdGhNYXRjaCA9IGJvYXJkRWxlbWVudC5zdHlsZS5jc3NUZXh0Lm1hdGNoKC93aWR0aDpcXHMqKFswLTkuXSspcHgvKVxuICBjb25zdCBib2FyZFdpZHRoID0gd2lkdGhNYXRjaFxuICAgID8gTnVtYmVyLnBhcnNlRmxvYXQod2lkdGhNYXRjaFsxXSlcbiAgICA6IGdldEJvdW5kaW5nQ2xpZW50UmVjdChib2FyZCkud2lkdGhcbiAgY29uc3Qgc3F1YXJlU2l6ZSA9IGJvYXJkV2lkdGggLyA4XG4gIGNvbnN0IHBsYXllckNvbG9yID0gZ2V0UGxheWVyQ29sb3IoKVxuXG4gIGNvbnN0IHBpZWNlcyA9IGJvYXJkLnF1ZXJ5U2VsZWN0b3JBbGwoRG9tU2VsZWN0b3IuUElFQ0UpXG4gIGNvbnN0IHBvc2l0aW9uczogUGllY2VQb3NpdGlvbltdID0gW11cblxuICBmb3IgKGNvbnN0IHBpZWNlIG9mIHBpZWNlcykge1xuICAgIC8vIEV4dHJhY3QgY29sb3IgYW5kIHR5cGUgZnJvbSBjbGFzc1xuICAgIGNvbnN0IGNsYXNzZXMgPSBwaWVjZS5jbGFzc05hbWUuc3BsaXQoJyAnKVxuICAgIGNvbnN0IGNvbG9yU3RyID0gY2xhc3Nlc1swXVxuICAgIGNvbnN0IHR5cGVTdHIgPSBjbGFzc2VzWzFdXG5cbiAgICAvLyBNYXAgdG8gZW51bXNcbiAgICBjb25zdCBjb2xvciA9IGNvbG9yU3RyID09PSAnd2hpdGUnID8gUGxheWVyQ29sb3IuV0hJVEUgOiBQbGF5ZXJDb2xvci5CTEFDS1xuICAgIGNvbnN0IHR5cGUgPSB0eXBlU3RyIGFzIFBpZWNlVHlwZVxuXG4gICAgLy8gRXh0cmFjdCBwb3NpdGlvbiBmcm9tIHRyYW5zZm9ybVxuICAgIGNvbnN0IHRyYW5zZm9ybSA9IChwaWVjZSBhcyBIVE1MRWxlbWVudCkuc3R5bGUudHJhbnNmb3JtXG4gICAgY29uc3QgbWF0Y2ggPSB0cmFuc2Zvcm0ubWF0Y2goL3RyYW5zbGF0ZVxcKChbMC05Ll0rKXB4LD9cXHMqKFswLTkuXSspcHg/XFwpLylcbiAgICBpZiAoIW1hdGNoKSBjb250aW51ZVxuXG4gICAgLy8gVHJhbnNmb3JtIGdpdmVzIGJvdHRvbS1sZWZ0IGNvcm5lciwgY29udmVydCB0byBjZW50ZXJcbiAgICBjb25zdCB4ID0gTnVtYmVyLnBhcnNlRmxvYXQobWF0Y2hbMV0pICsgc3F1YXJlU2l6ZSAvIDJcbiAgICBjb25zdCB5ID0gTnVtYmVyLnBhcnNlRmxvYXQobWF0Y2hbMl0pIC0gc3F1YXJlU2l6ZSAvIDJcblxuICAgIGNvbnN0IHNxdWFyZSA9IHBpeGVsc1RvU3F1YXJlKHsgeCwgeSB9LCBzcXVhcmVTaXplLCBwbGF5ZXJDb2xvcilcbiAgICBwb3NpdGlvbnMucHVzaCh7IHNxdWFyZSwgY29sb3IsIHR5cGUgfSlcbiAgfVxuXG4gIHJldHVybiBwb3NpdGlvbnNcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdhaXRGb3JFbGVtZW50KHNlbGVjdG9yOiBzdHJpbmcpOiBQcm9taXNlPEVsZW1lbnQ+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgY29uc3QgZWxlbWVudCA9IHF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpXG4gICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgIHJlc29sdmUoZWxlbWVudClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgY29uc3QgZWxlbWVudCA9IHF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpXG4gICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICBvYnNlcnZlci5kaXNjb25uZWN0KClcbiAgICAgICAgcmVzb2x2ZShlbGVtZW50KVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmJvZHksIHtcbiAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgIHN1YnRyZWU6IHRydWUsXG4gICAgfSlcbiAgfSlcbn1cbiIsImltcG9ydCB7IHR5cGUgUGllY2VUeXBlLCBQbGF5ZXJDb2xvciwgUXVhZHJhbnQgfSBmcm9tICcuLi9jb25zdGFudHMnXG5cbmV4cG9ydCBpbnRlcmZhY2UgUGllY2VQb3NpdGlvbiB7XG4gIHNxdWFyZTogc3RyaW5nXG4gIGNvbG9yOiBQbGF5ZXJDb2xvclxuICB0eXBlOiBQaWVjZVR5cGVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbHRlclF1YWRyYW50KHBpZWNlczogUGllY2VQb3NpdGlvbltdLCBxdWFkcmFudDogUXVhZHJhbnQpOiBQaWVjZVBvc2l0aW9uW10ge1xuICByZXR1cm4gcGllY2VzLmZpbHRlcigocGllY2UpID0+IHtcbiAgICAvLyBWYWxpZGF0ZSBzcXVhcmUgZm9ybWF0XG4gICAgaWYgKCFwaWVjZS5zcXVhcmUgfHwgcGllY2Uuc3F1YXJlLmxlbmd0aCA8IDIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBzcXVhcmUgZm9ybWF0OiAke3BpZWNlLnNxdWFyZX1gKVxuICAgIH1cblxuICAgIGNvbnN0IGZpbGUgPSBwaWVjZS5zcXVhcmVbMF1cbiAgICBjb25zdCByYW5rID0gTnVtYmVyLnBhcnNlSW50KHBpZWNlLnNxdWFyZVsxXSwgMTApXG5cbiAgICAvLyBWYWxpZGF0ZSBmaWxlIGFuZCByYW5rXG4gICAgaWYgKGZpbGUgPCAnYScgfHwgZmlsZSA+ICdoJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGZpbGU6ICR7ZmlsZX1gKVxuICAgIH1cbiAgICBpZiAoTnVtYmVyLmlzTmFOKHJhbmspIHx8IHJhbmsgPCAxIHx8IHJhbmsgPiA4KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgcmFuazogJHtyYW5rfWApXG4gICAgfVxuXG4gICAgLy8gRGV0ZXJtaW5lIGZpbGUgcmFuZ2UgKGtpbmctc2lkZTogZS1oLCBxdWVlbi1zaWRlOiBhLWQpXG4gICAgY29uc3QgaXNLaW5nU2lkZSA9IGZpbGUgPj0gJ2UnXG5cbiAgICAvLyBEZXRlcm1pbmUgcmFuayByYW5nZSAod2hpdGU6IDEtNCwgYmxhY2s6IDUtOClcbiAgICBjb25zdCBpc1doaXRlUmFua3MgPSByYW5rID49IDEgJiYgcmFuayA8PSA0XG5cbiAgICAvLyBNYXRjaCBxdWFkcmFudFxuICAgIGlmIChxdWFkcmFudCA9PT0gUXVhZHJhbnQuV0hJVEVfS0lORykgcmV0dXJuIGlzS2luZ1NpZGUgJiYgaXNXaGl0ZVJhbmtzXG4gICAgaWYgKHF1YWRyYW50ID09PSBRdWFkcmFudC5XSElURV9RVUVFTikgcmV0dXJuICFpc0tpbmdTaWRlICYmIGlzV2hpdGVSYW5rc1xuICAgIGlmIChxdWFkcmFudCA9PT0gUXVhZHJhbnQuQkxBQ0tfS0lORykgcmV0dXJuIGlzS2luZ1NpZGUgJiYgIWlzV2hpdGVSYW5rc1xuICAgIGlmIChxdWFkcmFudCA9PT0gUXVhZHJhbnQuQkxBQ0tfUVVFRU4pIHJldHVybiAhaXNLaW5nU2lkZSAmJiAhaXNXaGl0ZVJhbmtzXG5cbiAgICByZXR1cm4gZmFsc2VcbiAgfSlcbn1cblxuZXhwb3J0IGludGVyZmFjZSBHcm91cGVkUGllY2VzIHtcbiAgY29sb3I6IFBsYXllckNvbG9yXG4gIHR5cGU6IHN0cmluZ1xuICBzcXVhcmVzOiBzdHJpbmdbXVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ3JvdXBCeUNvbG9yQW5kVHlwZShwaWVjZXM6IFBpZWNlUG9zaXRpb25bXSk6IEdyb3VwZWRQaWVjZXNbXSB7XG4gIGNvbnN0IGdyb3VwcyA9IG5ldyBNYXA8c3RyaW5nLCBHcm91cGVkUGllY2VzPigpXG5cbiAgZm9yIChjb25zdCBwaWVjZSBvZiBwaWVjZXMpIHtcbiAgICAvLyBWYWxpZGF0ZSByZXF1aXJlZCBwcm9wZXJ0aWVzXG4gICAgaWYgKCFwaWVjZS5zcXVhcmUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUGllY2UgbWlzc2luZyBzcXVhcmUgcHJvcGVydHknKVxuICAgIH1cbiAgICBpZiAoIXBpZWNlLmNvbG9yKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BpZWNlIG1pc3NpbmcgY29sb3IgcHJvcGVydHknKVxuICAgIH1cbiAgICBpZiAoIXBpZWNlLnR5cGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUGllY2UgbWlzc2luZyB0eXBlIHByb3BlcnR5JylcbiAgICB9XG5cbiAgICBjb25zdCBrZXkgPSBgJHtwaWVjZS5jb2xvcn0tJHtwaWVjZS50eXBlfWBcblxuICAgIGlmICghZ3JvdXBzLmhhcyhrZXkpKSB7XG4gICAgICBncm91cHMuc2V0KGtleSwge1xuICAgICAgICBjb2xvcjogcGllY2UuY29sb3IsXG4gICAgICAgIHR5cGU6IHBpZWNlLnR5cGUsXG4gICAgICAgIHNxdWFyZXM6IFtdLFxuICAgICAgfSlcbiAgICB9XG5cbiAgICBncm91cHMuZ2V0KGtleSk/LnNxdWFyZXMucHVzaChwaWVjZS5zcXVhcmUpXG4gIH1cblxuICAvLyBTb3J0IGdyb3VwcyBieSBjb2xvciAod2hpdGUgZmlyc3QpIHRoZW4gdHlwZVxuICByZXR1cm4gQXJyYXkuZnJvbShncm91cHMudmFsdWVzKCkpLnNvcnQoKGEsIGIpID0+IHtcbiAgICBpZiAoYS5jb2xvciAhPT0gYi5jb2xvcikge1xuICAgICAgcmV0dXJuIGEuY29sb3IgPT09IFBsYXllckNvbG9yLldISVRFID8gLTEgOiAxXG4gICAgfVxuICAgIHJldHVybiBhLnR5cGUubG9jYWxlQ29tcGFyZShiLnR5cGUpXG4gIH0pXG59XG4iLCJpbXBvcnQgeyB0eXBlIFBpZWNlUG9zaXRpb24sIGdyb3VwQnlDb2xvckFuZFR5cGUgfSBmcm9tICcuL3BpZWNlR3JvdXBpbmcnXG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVF1YWRyYW50VGV4dChwaWVjZXM6IFBpZWNlUG9zaXRpb25bXSk6IHN0cmluZyB7XG4gIGlmIChwaWVjZXMubGVuZ3RoID09PSAwKSByZXR1cm4gJydcblxuICBjb25zdCBncm91cHMgPSBncm91cEJ5Q29sb3JBbmRUeXBlKHBpZWNlcylcbiAgY29uc3Qgc2VudGVuY2VzOiBzdHJpbmdbXSA9IFtdXG5cbiAgZm9yIChjb25zdCBncm91cCBvZiBncm91cHMpIHtcbiAgICBjb25zdCBjb2xvck5hbWUgPSBncm91cC5jb2xvclxuICAgIGNvbnN0IHR5cGVOYW1lID0gZ3JvdXAuc3F1YXJlcy5sZW5ndGggPiAxID8gYCR7Z3JvdXAudHlwZX1zYCA6IGdyb3VwLnR5cGVcblxuICAgIGlmIChncm91cC5zcXVhcmVzLmxlbmd0aCA+IDEpIHtcbiAgICAgIC8vIE11bHRpcGxlIHBpZWNlczogXCJ3aGl0ZSBwYXducyBvbiBhMiwgYjJcIlxuICAgICAgY29uc3Qgc3F1YXJlcyA9IGdyb3VwLnNxdWFyZXMuam9pbignLCAnKVxuICAgICAgc2VudGVuY2VzLnB1c2goYCR7Y29sb3JOYW1lfSAke3R5cGVOYW1lfSBvbiAke3NxdWFyZXN9YClcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU2luZ2xlIHBpZWNlOiBcImUxIHdoaXRlIGtpbmdcIlxuICAgICAgc2VudGVuY2VzLnB1c2goYCR7Z3JvdXAuc3F1YXJlc1swXX0gJHtjb2xvck5hbWV9ICR7Z3JvdXAudHlwZX1gKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBgJHtzZW50ZW5jZXMuam9pbignLiAnKX0uYFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVBbGxQaWVjZXNUZXh0KHBpZWNlczogUGllY2VQb3NpdGlvbltdKTogc3RyaW5nIHtcbiAgcmV0dXJuIGdlbmVyYXRlUXVhZHJhbnRUZXh0KHBpZWNlcylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlQ29sb3JUZXh0KHBpZWNlczogUGllY2VQb3NpdGlvbltdLCBjb2xvcjogJ3doaXRlJyB8ICdibGFjaycpOiBzdHJpbmcge1xuICBjb25zdCBmaWx0ZXJlZCA9IHBpZWNlcy5maWx0ZXIoKHApID0+IHAuY29sb3IgPT09IGNvbG9yKVxuICByZXR1cm4gZ2VuZXJhdGVRdWFkcmFudFRleHQoZmlsdGVyZWQpXG59XG4iLCIvKipcbiAqIFdyYXBwZXIgbW9kdWxlIGZvciBsb2NhbFN0b3JhZ2UgdG8gYWxsb3cgbW9ja2luZyB3aXRoIHNpbW9uZVxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRJdGVtKGtleTogc3RyaW5nKTogc3RyaW5nIHwgbnVsbCB7XG4gIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRJdGVtKGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgdmFsdWUpXG59XG4iLCJpbXBvcnQgdHlwZSB7IFNldHRpbmdzIH0gZnJvbSAnLi90eXBlcydcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRTZXR0aW5nczogU2V0dGluZ3MgPSB7XG4gIHNwZWFrUmF0ZTogMC41LFxuICBwaWVjZXNMaXN0RW5hYmxlZDogZmFsc2UsXG4gIGRpdmlkZXJzRW5hYmxlZDogZmFsc2UsXG4gIGN1c3RvbUJvYXJkRW5hYmxlZDogZmFsc2UsXG4gIG9iZnVzY2F0aW9uc0VuYWJsZWQ6IGZhbHNlLFxuICBwYXJhbGxheDogMCxcbiAgaG92ZXJNb2RlOiAnb2ZmJyxcbiAgcGllY2VTdHlsZTogJ2ljb25zJyxcbiAgYmx1cjogMCxcbiAgYmxhY2tTZWdtZW50czogJ25vbmUnLFxuICBibGFja1NlZ21lbnRzVGltaW5nOiAncm90YXRlLTEwcycsXG4gIGZsYXNoTW9kZUVuYWJsZWQ6IGZhbHNlLFxuICBmbGFzaER1cmF0aW9uOiAxLFxuICBmbGFzaEludGVydmFsOiAzLFxufVxuIiwiaW1wb3J0IHsgZWZmZWN0LCBzaWduYWwgfSBmcm9tICdAcHJlYWN0L3NpZ25hbHMtY29yZSdcbmltcG9ydCAqIGFzIHN0b3JhZ2UgZnJvbSAnLi4vcGxhdGZvcm0vc3RvcmFnZSdcbmltcG9ydCB7IGRlZmF1bHRTZXR0aW5ncyB9IGZyb20gJy4vZGVmYXVsdHMnXG5pbXBvcnQgdHlwZSB7IFNldHRpbmdzIH0gZnJvbSAnLi90eXBlcydcblxuY29uc3QgU1RPUkFHRV9LRVkgPSAnbGljaGVzcy1ib2FyZC1zcGVha2VyLXNldHRpbmdzJ1xuXG5leHBvcnQgY29uc3Qgc2V0dGluZ3MgPSB7XG4gIHNwZWFrUmF0ZTogc2lnbmFsKGRlZmF1bHRTZXR0aW5ncy5zcGVha1JhdGUpLFxuICBwaWVjZXNMaXN0RW5hYmxlZDogc2lnbmFsKGRlZmF1bHRTZXR0aW5ncy5waWVjZXNMaXN0RW5hYmxlZCksXG4gIGRpdmlkZXJzRW5hYmxlZDogc2lnbmFsKGRlZmF1bHRTZXR0aW5ncy5kaXZpZGVyc0VuYWJsZWQpLFxuICBjdXN0b21Cb2FyZEVuYWJsZWQ6IHNpZ25hbChkZWZhdWx0U2V0dGluZ3MuY3VzdG9tQm9hcmRFbmFibGVkKSxcbiAgb2JmdXNjYXRpb25zRW5hYmxlZDogc2lnbmFsKGRlZmF1bHRTZXR0aW5ncy5vYmZ1c2NhdGlvbnNFbmFibGVkKSxcbiAgcGFyYWxsYXg6IHNpZ25hbChkZWZhdWx0U2V0dGluZ3MucGFyYWxsYXgpLFxuICBob3Zlck1vZGU6IHNpZ25hbChkZWZhdWx0U2V0dGluZ3MuaG92ZXJNb2RlKSxcbiAgcGllY2VTdHlsZTogc2lnbmFsKGRlZmF1bHRTZXR0aW5ncy5waWVjZVN0eWxlKSxcbiAgYmx1cjogc2lnbmFsKGRlZmF1bHRTZXR0aW5ncy5ibHVyKSxcbiAgYmxhY2tTZWdtZW50czogc2lnbmFsKGRlZmF1bHRTZXR0aW5ncy5ibGFja1NlZ21lbnRzKSxcbiAgYmxhY2tTZWdtZW50c1RpbWluZzogc2lnbmFsKGRlZmF1bHRTZXR0aW5ncy5ibGFja1NlZ21lbnRzVGltaW5nKSxcbiAgZmxhc2hNb2RlRW5hYmxlZDogc2lnbmFsKGRlZmF1bHRTZXR0aW5ncy5mbGFzaE1vZGVFbmFibGVkKSxcbiAgZmxhc2hEdXJhdGlvbjogc2lnbmFsKGRlZmF1bHRTZXR0aW5ncy5mbGFzaER1cmF0aW9uKSxcbiAgZmxhc2hJbnRlcnZhbDogc2lnbmFsKGRlZmF1bHRTZXR0aW5ncy5mbGFzaEludGVydmFsKSxcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRTZXR0aW5ncygpOiB2b2lkIHtcbiAgY29uc3Qgc3RvcmVkID0gc3RvcmFnZS5nZXRJdGVtKFNUT1JBR0VfS0VZKVxuICBpZiAoIXN0b3JlZCkgcmV0dXJuXG5cbiAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2Uoc3RvcmVkKSBhcyBQYXJ0aWFsPFNldHRpbmdzPlxuICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhkYXRhKSkge1xuICAgIGNvbnN0IHNldHRpbmdLZXkgPSBrZXkgYXMga2V5b2YgU2V0dGluZ3NcbiAgICBpZiAoc2V0dGluZ3Nbc2V0dGluZ0tleV0pIHtcbiAgICAgIC8vIGJpb21lLWlnbm9yZSBsaW50L3N1c3BpY2lvdXMvbm9FeHBsaWNpdEFueTogU2V0dGluZ3MgdHlwZSBpcyBkeW5hbWljXG4gICAgICBzZXR0aW5nc1tzZXR0aW5nS2V5XS52YWx1ZSA9IGRhdGFbc2V0dGluZ0tleV0gYXMgYW55XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzYXZlU2V0dGluZ3MoKTogdm9pZCB7XG4gIGNvbnN0IGRhdGE6IFBhcnRpYWw8U2V0dGluZ3M+ID0ge31cbiAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoc2V0dGluZ3MpKSB7XG4gICAgY29uc3Qgc2V0dGluZ0tleSA9IGtleSBhcyBrZXlvZiB0eXBlb2Ygc2V0dGluZ3NcbiAgICAvLyBiaW9tZS1pZ25vcmUgbGludC9zdXNwaWNpb3VzL25vRXhwbGljaXRBbnk6IFNldHRpbmdzIHR5cGUgaXMgZHluYW1pY1xuICAgIGRhdGFbc2V0dGluZ0tleV0gPSBzZXR0aW5nc1tzZXR0aW5nS2V5XS52YWx1ZSBhcyBhbnlcbiAgfVxuICBzdG9yYWdlLnNldEl0ZW0oU1RPUkFHRV9LRVksIEpTT04uc3RyaW5naWZ5KGRhdGEpKVxufVxuXG4vLyBBdXRvLXNhdmUgZWZmZWN0IChzaG91bGQgYmUgY2FsbGVkIG9uY2UgZHVyaW5nIGFwcCBpbml0aWFsaXphdGlvbilcbmV4cG9ydCBmdW5jdGlvbiBzZXR1cEF1dG9TYXZlKCk6IHZvaWQge1xuICBlZmZlY3QoKCkgPT4ge1xuICAgIGZvciAoY29uc3QgcyBvZiBPYmplY3QudmFsdWVzKHNldHRpbmdzKSkge1xuICAgICAgcy52YWx1ZVxuICAgIH1cbiAgICBzYXZlU2V0dGluZ3MoKVxuICB9KVxufVxuIiwiaW1wb3J0IHsgc3BlYWssIHN0b3BTcGVha2luZyB9IGZyb20gJy4uL2FkYXB0ZXJzLXNwZWVjaC9zcGVlY2hTeW50aGVzaXplcidcbmltcG9ydCB7IFBsYXllckNvbG9yLCB0eXBlIFF1YWRyYW50LCBTcGVlY2hDb21tYW5kIH0gZnJvbSAnLi4vY29uc3RhbnRzJ1xuaW1wb3J0IHsgcmVhZFBpZWNlUG9zaXRpb25zIH0gZnJvbSAnLi4vZG9tL2JvYXJkUmVhZGVyJ1xuaW1wb3J0IHsgZmlsdGVyUXVhZHJhbnQgfSBmcm9tICcuLi9wdXJlL3BpZWNlR3JvdXBpbmcnXG5pbXBvcnQgeyBnZW5lcmF0ZUFsbFBpZWNlc1RleHQsIGdlbmVyYXRlQ29sb3JUZXh0LCBnZW5lcmF0ZVF1YWRyYW50VGV4dCB9IGZyb20gJy4uL3B1cmUvc3BlZWNoVGV4dCdcbmltcG9ydCB7IHNldHRpbmdzIH0gZnJvbSAnLi4vc2V0dGluZ3Mvc2V0dGluZ3NTdG9yZSdcblxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZVNwZWVjaENvbW1hbmQoY29tbWFuZDogc3RyaW5nKTogdm9pZCB7XG4gIGlmIChjb21tYW5kID09PSBTcGVlY2hDb21tYW5kLlNUT1ApIHtcbiAgICBzdG9wU3BlYWtpbmcoKVxuICAgIHJldHVyblxuICB9XG5cbiAgY29uc3QgcGllY2VzID0gcmVhZFBpZWNlUG9zaXRpb25zKClcblxuICBpZiAoY29tbWFuZCA9PT0gU3BlZWNoQ29tbWFuZC5BTEwpIHtcbiAgICBjb25zdCB0ZXh0ID0gZ2VuZXJhdGVBbGxQaWVjZXNUZXh0KHBpZWNlcylcbiAgICBzcGVhayh0ZXh0LCBzZXR0aW5ncy5zcGVha1JhdGUudmFsdWUpXG4gICAgcmV0dXJuXG4gIH1cblxuICBpZiAoY29tbWFuZCA9PT0gU3BlZWNoQ29tbWFuZC5XSElURSB8fCBjb21tYW5kID09PSBTcGVlY2hDb21tYW5kLkJMQUNLKSB7XG4gICAgY29uc3QgY29sb3IgPSBjb21tYW5kID09PSBTcGVlY2hDb21tYW5kLldISVRFID8gUGxheWVyQ29sb3IuV0hJVEUgOiBQbGF5ZXJDb2xvci5CTEFDS1xuICAgIGNvbnN0IHRleHQgPSBnZW5lcmF0ZUNvbG9yVGV4dChwaWVjZXMsIGNvbG9yKVxuICAgIHNwZWFrKHRleHQsIHNldHRpbmdzLnNwZWFrUmF0ZS52YWx1ZSlcbiAgICByZXR1cm5cbiAgfVxuXG4gIC8vIFF1YWRyYW50IGNvbW1hbmRzOiB3aywgd3EsIGJrLCBicVxuICBjb25zdCBxdWFkcmFudCA9IGNvbW1hbmQgYXMgUXVhZHJhbnRcbiAgY29uc3QgZmlsdGVyZWQgPSBmaWx0ZXJRdWFkcmFudChwaWVjZXMsIHF1YWRyYW50KVxuICBjb25zdCB0ZXh0ID0gZ2VuZXJhdGVRdWFkcmFudFRleHQoZmlsdGVyZWQpXG4gIHNwZWFrKHRleHQsIHNldHRpbmdzLnNwZWFrUmF0ZS52YWx1ZSlcbn1cbiIsImltcG9ydCB7IERvbVNlbGVjdG9yLCBLRVlCT0FSRF9DT01NQU5EX01BUCwgdHlwZSBLZXlib2FyZENvbW1hbmQgfSBmcm9tICcuLi9jb25zdGFudHMnXG5pbXBvcnQgeyBoYW5kbGVTcGVlY2hDb21tYW5kIH0gZnJvbSAnLi4vaGFuZGxlcnMvaGFuZGxlU3BlZWNoQ29tbWFuZCdcbmltcG9ydCB7IHF1ZXJ5U2VsZWN0b3IgfSBmcm9tICcuLi9wbGF0Zm9ybS9kb20nXG5cbmludGVyZmFjZSBJbnB1dEVsZW1lbnRXaXRoQ2xlYW51cCBleHRlbmRzIEhUTUxJbnB1dEVsZW1lbnQge1xuICBfX2tleWJvYXJkQ29tbWFuZENsZWFudXA/OiAoKSA9PiB2b2lkXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cEtleWJvYXJkQ29tbWFuZHMoKTogdm9pZCB7XG4gIGNvbnN0IGlucHV0ID0gcXVlcnlTZWxlY3RvcihEb21TZWxlY3Rvci5LRVlCT0FSRF9JTlBVVCkgYXMgSW5wdXRFbGVtZW50V2l0aENsZWFudXAgfCBudWxsXG4gIGlmICghaW5wdXQpIHJldHVyblxuXG4gIGNvbnN0IGhhbmRsZUlucHV0ID0gKGU6IEV2ZW50KSA9PiB7XG4gICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudFxuICAgIGNvbnN0IHZhbHVlID0gdGFyZ2V0LnZhbHVlXG5cbiAgICAvLyBDaGVjayBmb3Igc3BlZWNoIGNvbW1hbmRzXG4gICAgY29uc3QgY29tbWFuZCA9IEtFWUJPQVJEX0NPTU1BTkRfTUFQLmdldCh2YWx1ZSBhcyBLZXlib2FyZENvbW1hbmQpXG4gICAgaWYgKGNvbW1hbmQpIHtcbiAgICAgIGhhbmRsZVNwZWVjaENvbW1hbmQoY29tbWFuZClcbiAgICAgIHRhcmdldC52YWx1ZSA9ICcnXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICAvLyBDaGVjayBmb3IgZHJhd2luZyBjb21tYW5kcyAoaGFuZGxlZCBlbHNld2hlcmUpXG4gICAgaWYgKHZhbHVlLnN0YXJ0c1dpdGgoJy0nKSkge1xuICAgICAgLy8gV2lsbCBiZSBoYW5kbGVkIGJ5IGRyYXdpbmcgaGFuZGxlclxuICAgICAgcmV0dXJuXG4gICAgfVxuICB9XG5cbiAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBoYW5kbGVJbnB1dClcblxuICAvLyBTdG9yZSBjbGVhbnVwIGZ1bmN0aW9uIG9uIHRoZSBlbGVtZW50IGZvciBsYXRlciByZW1vdmFsXG4gIGlucHV0Ll9fa2V5Ym9hcmRDb21tYW5kQ2xlYW51cCA9ICgpID0+IHtcbiAgICBpbnB1dC5yZW1vdmVFdmVudExpc3RlbmVyKCdpbnB1dCcsIGhhbmRsZUlucHV0KVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0ZWFyZG93bktleWJvYXJkQ29tbWFuZHMoKTogdm9pZCB7XG4gIGNvbnN0IGlucHV0ID0gcXVlcnlTZWxlY3RvcihEb21TZWxlY3Rvci5LRVlCT0FSRF9JTlBVVCkgYXMgSW5wdXRFbGVtZW50V2l0aENsZWFudXAgfCBudWxsXG4gIGlmIChpbnB1dD8uX19rZXlib2FyZENvbW1hbmRDbGVhbnVwKSB7XG4gICAgaW5wdXQuX19rZXlib2FyZENvbW1hbmRDbGVhbnVwKClcbiAgICBpbnB1dC5fX2tleWJvYXJkQ29tbWFuZENsZWFudXAgPSB1bmRlZmluZWRcbiAgfVxufVxuIiwidmFyIG4sbCx1LHQsaSxyLG8sZSxmLGMsYSxzLGgscCx2LHksZD17fSx3PVtdLF89L2FjaXR8ZXgoPzpzfGd8bnxwfCQpfHJwaHxncmlkfG93c3xtbmN8bnR3fGluZVtjaF18em9vfF5vcmR8aXRlcmEvaSxnPUFycmF5LmlzQXJyYXk7ZnVuY3Rpb24gbShuLGwpe2Zvcih2YXIgdSBpbiBsKW5bdV09bFt1XTtyZXR1cm4gbn1mdW5jdGlvbiBiKG4pe24mJm4ucGFyZW50Tm9kZSYmbi5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG4pfWZ1bmN0aW9uIGsobCx1LHQpe3ZhciBpLHIsbyxlPXt9O2ZvcihvIGluIHUpXCJrZXlcIj09bz9pPXVbb106XCJyZWZcIj09bz9yPXVbb106ZVtvXT11W29dO2lmKGFyZ3VtZW50cy5sZW5ndGg+MiYmKGUuY2hpbGRyZW49YXJndW1lbnRzLmxlbmd0aD4zP24uY2FsbChhcmd1bWVudHMsMik6dCksXCJmdW5jdGlvblwiPT10eXBlb2YgbCYmbnVsbCE9bC5kZWZhdWx0UHJvcHMpZm9yKG8gaW4gbC5kZWZhdWx0UHJvcHMpdm9pZCAwPT09ZVtvXSYmKGVbb109bC5kZWZhdWx0UHJvcHNbb10pO3JldHVybiB4KGwsZSxpLHIsbnVsbCl9ZnVuY3Rpb24geChuLHQsaSxyLG8pe3ZhciBlPXt0eXBlOm4scHJvcHM6dCxrZXk6aSxyZWY6cixfX2s6bnVsbCxfXzpudWxsLF9fYjowLF9fZTpudWxsLF9fYzpudWxsLGNvbnN0cnVjdG9yOnZvaWQgMCxfX3Y6bnVsbD09bz8rK3U6byxfX2k6LTEsX191OjB9O3JldHVybiBudWxsPT1vJiZudWxsIT1sLnZub2RlJiZsLnZub2RlKGUpLGV9ZnVuY3Rpb24gTSgpe3JldHVybntjdXJyZW50Om51bGx9fWZ1bmN0aW9uIFMobil7cmV0dXJuIG4uY2hpbGRyZW59ZnVuY3Rpb24gQyhuLGwpe3RoaXMucHJvcHM9bix0aGlzLmNvbnRleHQ9bH1mdW5jdGlvbiAkKG4sbCl7aWYobnVsbD09bClyZXR1cm4gbi5fXz8kKG4uX18sbi5fX2krMSk6bnVsbDtmb3IodmFyIHU7bDxuLl9fay5sZW5ndGg7bCsrKWlmKG51bGwhPSh1PW4uX19rW2xdKSYmbnVsbCE9dS5fX2UpcmV0dXJuIHUuX19lO3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIG4udHlwZT8kKG4pOm51bGx9ZnVuY3Rpb24gSShuKXtpZihuLl9fUCYmbi5fX2Qpe3ZhciB1PW4uX192LHQ9dS5fX2UsaT1bXSxyPVtdLG89bSh7fSx1KTtvLl9fdj11Ll9fdisxLGwudm5vZGUmJmwudm5vZGUobykscShuLl9fUCxvLHUsbi5fX24sbi5fX1AubmFtZXNwYWNlVVJJLDMyJnUuX191P1t0XTpudWxsLGksbnVsbD09dD8kKHUpOnQsISEoMzImdS5fX3UpLHIpLG8uX192PXUuX192LG8uX18uX19rW28uX19pXT1vLEQoaSxvLHIpLHUuX19lPXUuX189bnVsbCxvLl9fZSE9dCYmUChvKX19ZnVuY3Rpb24gUChuKXtpZihudWxsIT0obj1uLl9fKSYmbnVsbCE9bi5fX2MpcmV0dXJuIG4uX19lPW4uX19jLmJhc2U9bnVsbCxuLl9fay5zb21lKGZ1bmN0aW9uKGwpe2lmKG51bGwhPWwmJm51bGwhPWwuX19lKXJldHVybiBuLl9fZT1uLl9fYy5iYXNlPWwuX19lfSksUChuKX1mdW5jdGlvbiBBKG4peyghbi5fX2QmJihuLl9fZD0hMCkmJmkucHVzaChuKSYmIUguX19yKyt8fHIhPWwuZGVib3VuY2VSZW5kZXJpbmcpJiYoKHI9bC5kZWJvdW5jZVJlbmRlcmluZyl8fG8pKEgpfWZ1bmN0aW9uIEgoKXt0cnl7Zm9yKHZhciBuLGw9MTtpLmxlbmd0aDspaS5sZW5ndGg+bCYmaS5zb3J0KGUpLG49aS5zaGlmdCgpLGw9aS5sZW5ndGgsSShuKX1maW5hbGx5e2kubGVuZ3RoPUguX19yPTB9fWZ1bmN0aW9uIEwobixsLHUsdCxpLHIsbyxlLGYsYyxhKXt2YXIgcyxoLHAsdix5LF8sZyxtPXQmJnQuX19rfHx3LGI9bC5sZW5ndGg7Zm9yKGY9VCh1LGwsbSxmLGIpLHM9MDtzPGI7cysrKW51bGwhPShwPXUuX19rW3NdKSYmKGg9LTEhPXAuX19pJiZtW3AuX19pXXx8ZCxwLl9faT1zLF89cShuLHAsaCxpLHIsbyxlLGYsYyxhKSx2PXAuX19lLHAucmVmJiZoLnJlZiE9cC5yZWYmJihoLnJlZiYmSihoLnJlZixudWxsLHApLGEucHVzaChwLnJlZixwLl9fY3x8dixwKSksbnVsbD09eSYmbnVsbCE9diYmKHk9diksKGc9ISEoNCZwLl9fdSkpfHxoLl9faz09PXAuX19rPyhmPWoocCxmLG4sZyksZyYmaC5fX2UmJihoLl9fZT1udWxsKSk6XCJmdW5jdGlvblwiPT10eXBlb2YgcC50eXBlJiZ2b2lkIDAhPT1fP2Y9Xzp2JiYoZj12Lm5leHRTaWJsaW5nKSxwLl9fdSY9LTcpO3JldHVybiB1Ll9fZT15LGZ9ZnVuY3Rpb24gVChuLGwsdSx0LGkpe3ZhciByLG8sZSxmLGMsYT11Lmxlbmd0aCxzPWEsaD0wO2ZvcihuLl9faz1uZXcgQXJyYXkoaSkscj0wO3I8aTtyKyspbnVsbCE9KG89bFtyXSkmJlwiYm9vbGVhblwiIT10eXBlb2YgbyYmXCJmdW5jdGlvblwiIT10eXBlb2Ygbz8oXCJzdHJpbmdcIj09dHlwZW9mIG98fFwibnVtYmVyXCI9PXR5cGVvZiBvfHxcImJpZ2ludFwiPT10eXBlb2Ygb3x8by5jb25zdHJ1Y3Rvcj09U3RyaW5nP289bi5fX2tbcl09eChudWxsLG8sbnVsbCxudWxsLG51bGwpOmcobyk/bz1uLl9fa1tyXT14KFMse2NoaWxkcmVuOm99LG51bGwsbnVsbCxudWxsKTp2b2lkIDA9PT1vLmNvbnN0cnVjdG9yJiZvLl9fYj4wP289bi5fX2tbcl09eChvLnR5cGUsby5wcm9wcyxvLmtleSxvLnJlZj9vLnJlZjpudWxsLG8uX192KTpuLl9fa1tyXT1vLGY9citoLG8uX189bixvLl9fYj1uLl9fYisxLGU9bnVsbCwtMSE9KGM9by5fX2k9TyhvLHUsZixzKSkmJihzLS0sKGU9dVtjXSkmJihlLl9fdXw9MikpLG51bGw9PWV8fG51bGw9PWUuX192PygtMT09YyYmKGk+YT9oLS06aTxhJiZoKyspLFwiZnVuY3Rpb25cIiE9dHlwZW9mIG8udHlwZSYmKG8uX191fD00KSk6YyE9ZiYmKGM9PWYtMT9oLS06Yz09ZisxP2grKzooYz5mP2gtLTpoKyssby5fX3V8PTQpKSk6bi5fX2tbcl09bnVsbDtpZihzKWZvcihyPTA7cjxhO3IrKyludWxsIT0oZT11W3JdKSYmMD09KDImZS5fX3UpJiYoZS5fX2U9PXQmJih0PSQoZSkpLEsoZSxlKSk7cmV0dXJuIHR9ZnVuY3Rpb24gaihuLGwsdSx0KXt2YXIgaSxyO2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIG4udHlwZSl7Zm9yKGk9bi5fX2sscj0wO2kmJnI8aS5sZW5ndGg7cisrKWlbcl0mJihpW3JdLl9fPW4sbD1qKGlbcl0sbCx1LHQpKTtyZXR1cm4gbH1uLl9fZSE9bCYmKHQmJihsJiZuLnR5cGUmJiFsLnBhcmVudE5vZGUmJihsPSQobikpLHUuaW5zZXJ0QmVmb3JlKG4uX19lLGx8fG51bGwpKSxsPW4uX19lKTtkb3tsPWwmJmwubmV4dFNpYmxpbmd9d2hpbGUobnVsbCE9bCYmOD09bC5ub2RlVHlwZSk7cmV0dXJuIGx9ZnVuY3Rpb24gRihuLGwpe3JldHVybiBsPWx8fFtdLG51bGw9PW58fFwiYm9vbGVhblwiPT10eXBlb2Ygbnx8KGcobik/bi5zb21lKGZ1bmN0aW9uKG4pe0YobixsKX0pOmwucHVzaChuKSksbH1mdW5jdGlvbiBPKG4sbCx1LHQpe3ZhciBpLHIsbyxlPW4ua2V5LGY9bi50eXBlLGM9bFt1XSxhPW51bGwhPWMmJjA9PSgyJmMuX191KTtpZihudWxsPT09YyYmbnVsbD09ZXx8YSYmZT09Yy5rZXkmJmY9PWMudHlwZSlyZXR1cm4gdTtpZih0PihhPzE6MCkpZm9yKGk9dS0xLHI9dSsxO2k+PTB8fHI8bC5sZW5ndGg7KWlmKG51bGwhPShjPWxbbz1pPj0wP2ktLTpyKytdKSYmMD09KDImYy5fX3UpJiZlPT1jLmtleSYmZj09Yy50eXBlKXJldHVybiBvO3JldHVybi0xfWZ1bmN0aW9uIHoobixsLHUpe1wiLVwiPT1sWzBdP24uc2V0UHJvcGVydHkobCxudWxsPT11P1wiXCI6dSk6bltsXT1udWxsPT11P1wiXCI6XCJudW1iZXJcIiE9dHlwZW9mIHV8fF8udGVzdChsKT91OnUrXCJweFwifWZ1bmN0aW9uIE4obixsLHUsdCxpKXt2YXIgcixvO246aWYoXCJzdHlsZVwiPT1sKWlmKFwic3RyaW5nXCI9PXR5cGVvZiB1KW4uc3R5bGUuY3NzVGV4dD11O2Vsc2V7aWYoXCJzdHJpbmdcIj09dHlwZW9mIHQmJihuLnN0eWxlLmNzc1RleHQ9dD1cIlwiKSx0KWZvcihsIGluIHQpdSYmbCBpbiB1fHx6KG4uc3R5bGUsbCxcIlwiKTtpZih1KWZvcihsIGluIHUpdCYmdVtsXT09dFtsXXx8eihuLnN0eWxlLGwsdVtsXSl9ZWxzZSBpZihcIm9cIj09bFswXSYmXCJuXCI9PWxbMV0pcj1sIT0obD1sLnJlcGxhY2UocyxcIiQxXCIpKSxvPWwudG9Mb3dlckNhc2UoKSxsPW8gaW4gbnx8XCJvbkZvY3VzT3V0XCI9PWx8fFwib25Gb2N1c0luXCI9PWw/by5zbGljZSgyKTpsLnNsaWNlKDIpLG4ubHx8KG4ubD17fSksbi5sW2wrcl09dSx1P3Q/dVthXT10W2FdOih1W2FdPWgsbi5hZGRFdmVudExpc3RlbmVyKGwscj92OnAscikpOm4ucmVtb3ZlRXZlbnRMaXN0ZW5lcihsLHI/djpwLHIpO2Vsc2V7aWYoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPT1pKWw9bC5yZXBsYWNlKC94bGluayhIfDpoKS8sXCJoXCIpLnJlcGxhY2UoL3NOYW1lJC8sXCJzXCIpO2Vsc2UgaWYoXCJ3aWR0aFwiIT1sJiZcImhlaWdodFwiIT1sJiZcImhyZWZcIiE9bCYmXCJsaXN0XCIhPWwmJlwiZm9ybVwiIT1sJiZcInRhYkluZGV4XCIhPWwmJlwiZG93bmxvYWRcIiE9bCYmXCJyb3dTcGFuXCIhPWwmJlwiY29sU3BhblwiIT1sJiZcInJvbGVcIiE9bCYmXCJwb3BvdmVyXCIhPWwmJmwgaW4gbil0cnl7bltsXT1udWxsPT11P1wiXCI6dTticmVhayBufWNhdGNoKG4pe31cImZ1bmN0aW9uXCI9PXR5cGVvZiB1fHwobnVsbD09dXx8ITE9PT11JiZcIi1cIiE9bFs0XT9uLnJlbW92ZUF0dHJpYnV0ZShsKTpuLnNldEF0dHJpYnV0ZShsLFwicG9wb3ZlclwiPT1sJiYxPT11P1wiXCI6dSkpfX1mdW5jdGlvbiBWKG4pe3JldHVybiBmdW5jdGlvbih1KXtpZih0aGlzLmwpe3ZhciB0PXRoaXMubFt1LnR5cGUrbl07aWYobnVsbD09dVtjXSl1W2NdPWgrKztlbHNlIGlmKHVbY108dFthXSlyZXR1cm47cmV0dXJuIHQobC5ldmVudD9sLmV2ZW50KHUpOnUpfX19ZnVuY3Rpb24gcShuLHUsdCxpLHIsbyxlLGYsYyxhKXt2YXIgcyxoLHAsdix5LGQsXyxrLHgsTSwkLEksUCxBLEgsVD11LnR5cGU7aWYodm9pZCAwIT09dS5jb25zdHJ1Y3RvcilyZXR1cm4gbnVsbDsxMjgmdC5fX3UmJihjPSEhKDMyJnQuX191KSxvPVtmPXUuX19lPXQuX19lXSksKHM9bC5fX2IpJiZzKHUpO246aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgVCl0cnl7aWYoaz11LnByb3BzLHg9VC5wcm90b3R5cGUmJlQucHJvdG90eXBlLnJlbmRlcixNPShzPVQuY29udGV4dFR5cGUpJiZpW3MuX19jXSwkPXM/TT9NLnByb3BzLnZhbHVlOnMuX186aSx0Ll9fYz9fPShoPXUuX19jPXQuX19jKS5fXz1oLl9fRTooeD91Ll9fYz1oPW5ldyBUKGssJCk6KHUuX19jPWg9bmV3IEMoaywkKSxoLmNvbnN0cnVjdG9yPVQsaC5yZW5kZXI9USksTSYmTS5zdWIoaCksaC5zdGF0ZXx8KGguc3RhdGU9e30pLGguX19uPWkscD1oLl9fZD0hMCxoLl9faD1bXSxoLl9zYj1bXSkseCYmbnVsbD09aC5fX3MmJihoLl9fcz1oLnN0YXRlKSx4JiZudWxsIT1ULmdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyYmKGguX19zPT1oLnN0YXRlJiYoaC5fX3M9bSh7fSxoLl9fcykpLG0oaC5fX3MsVC5nZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMoayxoLl9fcykpKSx2PWgucHJvcHMseT1oLnN0YXRlLGguX192PXUscCl4JiZudWxsPT1ULmdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyYmbnVsbCE9aC5jb21wb25lbnRXaWxsTW91bnQmJmguY29tcG9uZW50V2lsbE1vdW50KCkseCYmbnVsbCE9aC5jb21wb25lbnREaWRNb3VudCYmaC5fX2gucHVzaChoLmNvbXBvbmVudERpZE1vdW50KTtlbHNle2lmKHgmJm51bGw9PVQuZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzJiZrIT09diYmbnVsbCE9aC5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzJiZoLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMoaywkKSx1Ll9fdj09dC5fX3Z8fCFoLl9fZSYmbnVsbCE9aC5zaG91bGRDb21wb25lbnRVcGRhdGUmJiExPT09aC5zaG91bGRDb21wb25lbnRVcGRhdGUoayxoLl9fcywkKSl7dS5fX3YhPXQuX192JiYoaC5wcm9wcz1rLGguc3RhdGU9aC5fX3MsaC5fX2Q9ITEpLHUuX19lPXQuX19lLHUuX19rPXQuX19rLHUuX19rLnNvbWUoZnVuY3Rpb24obil7biYmKG4uX189dSl9KSx3LnB1c2guYXBwbHkoaC5fX2gsaC5fc2IpLGguX3NiPVtdLGguX19oLmxlbmd0aCYmZS5wdXNoKGgpO2JyZWFrIG59bnVsbCE9aC5jb21wb25lbnRXaWxsVXBkYXRlJiZoLmNvbXBvbmVudFdpbGxVcGRhdGUoayxoLl9fcywkKSx4JiZudWxsIT1oLmNvbXBvbmVudERpZFVwZGF0ZSYmaC5fX2gucHVzaChmdW5jdGlvbigpe2guY29tcG9uZW50RGlkVXBkYXRlKHYseSxkKX0pfWlmKGguY29udGV4dD0kLGgucHJvcHM9ayxoLl9fUD1uLGguX19lPSExLEk9bC5fX3IsUD0wLHgpaC5zdGF0ZT1oLl9fcyxoLl9fZD0hMSxJJiZJKHUpLHM9aC5yZW5kZXIoaC5wcm9wcyxoLnN0YXRlLGguY29udGV4dCksdy5wdXNoLmFwcGx5KGguX19oLGguX3NiKSxoLl9zYj1bXTtlbHNlIGRve2guX19kPSExLEkmJkkodSkscz1oLnJlbmRlcihoLnByb3BzLGguc3RhdGUsaC5jb250ZXh0KSxoLnN0YXRlPWguX19zfXdoaWxlKGguX19kJiYrK1A8MjUpO2guc3RhdGU9aC5fX3MsbnVsbCE9aC5nZXRDaGlsZENvbnRleHQmJihpPW0obSh7fSxpKSxoLmdldENoaWxkQ29udGV4dCgpKSkseCYmIXAmJm51bGwhPWguZ2V0U25hcHNob3RCZWZvcmVVcGRhdGUmJihkPWguZ2V0U25hcHNob3RCZWZvcmVVcGRhdGUodix5KSksQT1udWxsIT1zJiZzLnR5cGU9PT1TJiZudWxsPT1zLmtleT9FKHMucHJvcHMuY2hpbGRyZW4pOnMsZj1MKG4sZyhBKT9BOltBXSx1LHQsaSxyLG8sZSxmLGMsYSksaC5iYXNlPXUuX19lLHUuX191Jj0tMTYxLGguX19oLmxlbmd0aCYmZS5wdXNoKGgpLF8mJihoLl9fRT1oLl9fPW51bGwpfWNhdGNoKG4pe2lmKHUuX192PW51bGwsY3x8bnVsbCE9bylpZihuLnRoZW4pe2Zvcih1Ll9fdXw9Yz8xNjA6MTI4O2YmJjg9PWYubm9kZVR5cGUmJmYubmV4dFNpYmxpbmc7KWY9Zi5uZXh0U2libGluZztvW28uaW5kZXhPZihmKV09bnVsbCx1Ll9fZT1mfWVsc2V7Zm9yKEg9by5sZW5ndGg7SC0tOyliKG9bSF0pO0IodSl9ZWxzZSB1Ll9fZT10Ll9fZSx1Ll9faz10Ll9fayxuLnRoZW58fEIodSk7bC5fX2Uobix1LHQpfWVsc2UgbnVsbD09byYmdS5fX3Y9PXQuX192Pyh1Ll9faz10Ll9fayx1Ll9fZT10Ll9fZSk6Zj11Ll9fZT1HKHQuX19lLHUsdCxpLHIsbyxlLGMsYSk7cmV0dXJuKHM9bC5kaWZmZWQpJiZzKHUpLDEyOCZ1Ll9fdT92b2lkIDA6Zn1mdW5jdGlvbiBCKG4pe24mJihuLl9fYyYmKG4uX19jLl9fZT0hMCksbi5fX2smJm4uX19rLnNvbWUoQikpfWZ1bmN0aW9uIEQobix1LHQpe2Zvcih2YXIgaT0wO2k8dC5sZW5ndGg7aSsrKUoodFtpXSx0WysraV0sdFsrK2ldKTtsLl9fYyYmbC5fX2ModSxuKSxuLnNvbWUoZnVuY3Rpb24odSl7dHJ5e249dS5fX2gsdS5fX2g9W10sbi5zb21lKGZ1bmN0aW9uKG4pe24uY2FsbCh1KX0pfWNhdGNoKG4pe2wuX19lKG4sdS5fX3YpfX0pfWZ1bmN0aW9uIEUobil7cmV0dXJuXCJvYmplY3RcIiE9dHlwZW9mIG58fG51bGw9PW58fG4uX19iPjA/bjpnKG4pP24ubWFwKEUpOnZvaWQgMCE9PW4uY29uc3RydWN0b3I/bnVsbDptKHt9LG4pfWZ1bmN0aW9uIEcodSx0LGkscixvLGUsZixjLGEpe3ZhciBzLGgscCx2LHksdyxfLG09aS5wcm9wc3x8ZCxrPXQucHJvcHMseD10LnR5cGU7aWYoXCJzdmdcIj09eD9vPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIjpcIm1hdGhcIj09eD9vPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OC9NYXRoL01hdGhNTFwiOm98fChvPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbFwiKSxudWxsIT1lKWZvcihzPTA7czxlLmxlbmd0aDtzKyspaWYoKHk9ZVtzXSkmJlwic2V0QXR0cmlidXRlXCJpbiB5PT0hIXgmJih4P3kubG9jYWxOYW1lPT14OjM9PXkubm9kZVR5cGUpKXt1PXksZVtzXT1udWxsO2JyZWFrfWlmKG51bGw9PXUpe2lmKG51bGw9PXgpcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGspO3U9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKG8seCxrLmlzJiZrKSxjJiYobC5fX20mJmwuX19tKHQsZSksYz0hMSksZT1udWxsfWlmKG51bGw9PXgpbT09PWt8fGMmJnUuZGF0YT09a3x8KHUuZGF0YT1rKTtlbHNle2lmKGU9XCJ0ZXh0YXJlYVwiPT14JiZudWxsIT1rLmRlZmF1bHRWYWx1ZT9udWxsOmUmJm4uY2FsbCh1LmNoaWxkTm9kZXMpLCFjJiZudWxsIT1lKWZvcihtPXt9LHM9MDtzPHUuYXR0cmlidXRlcy5sZW5ndGg7cysrKW1bKHk9dS5hdHRyaWJ1dGVzW3NdKS5uYW1lXT15LnZhbHVlO2ZvcihzIGluIG0peT1tW3NdLFwiZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUxcIj09cz9wPXk6XCJjaGlsZHJlblwiPT1zfHxzIGluIGt8fFwidmFsdWVcIj09cyYmXCJkZWZhdWx0VmFsdWVcImluIGt8fFwiY2hlY2tlZFwiPT1zJiZcImRlZmF1bHRDaGVja2VkXCJpbiBrfHxOKHUscyxudWxsLHksbyk7Zm9yKHMgaW4gayl5PWtbc10sXCJjaGlsZHJlblwiPT1zP3Y9eTpcImRhbmdlcm91c2x5U2V0SW5uZXJIVE1MXCI9PXM/aD15OlwidmFsdWVcIj09cz93PXk6XCJjaGVja2VkXCI9PXM/Xz15OmMmJlwiZnVuY3Rpb25cIiE9dHlwZW9mIHl8fG1bc109PT15fHxOKHUscyx5LG1bc10sbyk7aWYoaCljfHxwJiYoaC5fX2h0bWw9PXAuX19odG1sfHxoLl9faHRtbD09dS5pbm5lckhUTUwpfHwodS5pbm5lckhUTUw9aC5fX2h0bWwpLHQuX19rPVtdO2Vsc2UgaWYocCYmKHUuaW5uZXJIVE1MPVwiXCIpLEwoXCJ0ZW1wbGF0ZVwiPT10LnR5cGU/dS5jb250ZW50OnUsZyh2KT92Olt2XSx0LGkscixcImZvcmVpZ25PYmplY3RcIj09eD9cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWxcIjpvLGUsZixlP2VbMF06aS5fX2smJiQoaSwwKSxjLGEpLG51bGwhPWUpZm9yKHM9ZS5sZW5ndGg7cy0tOyliKGVbc10pO2MmJlwidGV4dGFyZWFcIiE9eHx8KHM9XCJ2YWx1ZVwiLFwicHJvZ3Jlc3NcIj09eCYmbnVsbD09dz91LnJlbW92ZUF0dHJpYnV0ZShcInZhbHVlXCIpOm51bGwhPXcmJih3IT09dVtzXXx8XCJwcm9ncmVzc1wiPT14JiYhd3x8XCJvcHRpb25cIj09eCYmdyE9bVtzXSkmJk4odSxzLHcsbVtzXSxvKSxzPVwiY2hlY2tlZFwiLG51bGwhPV8mJl8hPXVbc10mJk4odSxzLF8sbVtzXSxvKSl9cmV0dXJuIHV9ZnVuY3Rpb24gSihuLHUsdCl7dHJ5e2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIG4pe3ZhciBpPVwiZnVuY3Rpb25cIj09dHlwZW9mIG4uX191O2kmJm4uX191KCksaSYmbnVsbD09dXx8KG4uX191PW4odSkpfWVsc2Ugbi5jdXJyZW50PXV9Y2F0Y2gobil7bC5fX2Uobix0KX19ZnVuY3Rpb24gSyhuLHUsdCl7dmFyIGkscjtpZihsLnVubW91bnQmJmwudW5tb3VudChuKSwoaT1uLnJlZikmJihpLmN1cnJlbnQmJmkuY3VycmVudCE9bi5fX2V8fEooaSxudWxsLHUpKSxudWxsIT0oaT1uLl9fYykpe2lmKGkuY29tcG9uZW50V2lsbFVubW91bnQpdHJ5e2kuY29tcG9uZW50V2lsbFVubW91bnQoKX1jYXRjaChuKXtsLl9fZShuLHUpfWkuYmFzZT1pLl9fUD1udWxsfWlmKGk9bi5fX2spZm9yKHI9MDtyPGkubGVuZ3RoO3IrKylpW3JdJiZLKGlbcl0sdSx0fHxcImZ1bmN0aW9uXCIhPXR5cGVvZiBuLnR5cGUpO3R8fGIobi5fX2UpLG4uX19jPW4uX189bi5fX2U9dm9pZCAwfWZ1bmN0aW9uIFEobixsLHUpe3JldHVybiB0aGlzLmNvbnN0cnVjdG9yKG4sdSl9ZnVuY3Rpb24gUih1LHQsaSl7dmFyIHIsbyxlLGY7dD09ZG9jdW1lbnQmJih0PWRvY3VtZW50LmRvY3VtZW50RWxlbWVudCksbC5fXyYmbC5fXyh1LHQpLG89KHI9XCJmdW5jdGlvblwiPT10eXBlb2YgaSk/bnVsbDppJiZpLl9fa3x8dC5fX2ssZT1bXSxmPVtdLHEodCx1PSghciYmaXx8dCkuX19rPWsoUyxudWxsLFt1XSksb3x8ZCxkLHQubmFtZXNwYWNlVVJJLCFyJiZpP1tpXTpvP251bGw6dC5maXJzdENoaWxkP24uY2FsbCh0LmNoaWxkTm9kZXMpOm51bGwsZSwhciYmaT9pOm8/by5fX2U6dC5maXJzdENoaWxkLHIsZiksRChlLHUsZil9ZnVuY3Rpb24gVShuLGwpe1IobixsLFUpfWZ1bmN0aW9uIFcobCx1LHQpe3ZhciBpLHIsbyxlLGY9bSh7fSxsLnByb3BzKTtmb3IobyBpbiBsLnR5cGUmJmwudHlwZS5kZWZhdWx0UHJvcHMmJihlPWwudHlwZS5kZWZhdWx0UHJvcHMpLHUpXCJrZXlcIj09bz9pPXVbb106XCJyZWZcIj09bz9yPXVbb106ZltvXT12b2lkIDA9PT11W29dJiZudWxsIT1lP2Vbb106dVtvXTtyZXR1cm4gYXJndW1lbnRzLmxlbmd0aD4yJiYoZi5jaGlsZHJlbj1hcmd1bWVudHMubGVuZ3RoPjM/bi5jYWxsKGFyZ3VtZW50cywyKTp0KSx4KGwudHlwZSxmLGl8fGwua2V5LHJ8fGwucmVmLG51bGwpfWZ1bmN0aW9uIFgobil7ZnVuY3Rpb24gbChuKXt2YXIgdSx0O3JldHVybiB0aGlzLmdldENoaWxkQ29udGV4dHx8KHU9bmV3IFNldCwodD17fSlbbC5fX2NdPXRoaXMsdGhpcy5nZXRDaGlsZENvbnRleHQ9ZnVuY3Rpb24oKXtyZXR1cm4gdH0sdGhpcy5jb21wb25lbnRXaWxsVW5tb3VudD1mdW5jdGlvbigpe3U9bnVsbH0sdGhpcy5zaG91bGRDb21wb25lbnRVcGRhdGU9ZnVuY3Rpb24obil7dGhpcy5wcm9wcy52YWx1ZSE9bi52YWx1ZSYmdS5mb3JFYWNoKGZ1bmN0aW9uKG4pe24uX19lPSEwLEEobil9KX0sdGhpcy5zdWI9ZnVuY3Rpb24obil7dS5hZGQobik7dmFyIGw9bi5jb21wb25lbnRXaWxsVW5tb3VudDtuLmNvbXBvbmVudFdpbGxVbm1vdW50PWZ1bmN0aW9uKCl7dSYmdS5kZWxldGUobiksbCYmbC5jYWxsKG4pfX0pLG4uY2hpbGRyZW59cmV0dXJuIGwuX19jPVwiX19jQ1wiK3krKyxsLl9fPW4sbC5Qcm92aWRlcj1sLl9fbD0obC5Db25zdW1lcj1mdW5jdGlvbihuLGwpe3JldHVybiBuLmNoaWxkcmVuKGwpfSkuY29udGV4dFR5cGU9bCxsfW49dy5zbGljZSxsPXtfX2U6ZnVuY3Rpb24obixsLHUsdCl7Zm9yKHZhciBpLHIsbztsPWwuX187KWlmKChpPWwuX19jKSYmIWkuX18pdHJ5e2lmKChyPWkuY29uc3RydWN0b3IpJiZudWxsIT1yLmdldERlcml2ZWRTdGF0ZUZyb21FcnJvciYmKGkuc2V0U3RhdGUoci5nZXREZXJpdmVkU3RhdGVGcm9tRXJyb3IobikpLG89aS5fX2QpLG51bGwhPWkuY29tcG9uZW50RGlkQ2F0Y2gmJihpLmNvbXBvbmVudERpZENhdGNoKG4sdHx8e30pLG89aS5fX2QpLG8pcmV0dXJuIGkuX19FPWl9Y2F0Y2gobCl7bj1sfXRocm93IG59fSx1PTAsdD1mdW5jdGlvbihuKXtyZXR1cm4gbnVsbCE9biYmdm9pZCAwPT09bi5jb25zdHJ1Y3Rvcn0sQy5wcm90b3R5cGUuc2V0U3RhdGU9ZnVuY3Rpb24obixsKXt2YXIgdTt1PW51bGwhPXRoaXMuX19zJiZ0aGlzLl9fcyE9dGhpcy5zdGF0ZT90aGlzLl9fczp0aGlzLl9fcz1tKHt9LHRoaXMuc3RhdGUpLFwiZnVuY3Rpb25cIj09dHlwZW9mIG4mJihuPW4obSh7fSx1KSx0aGlzLnByb3BzKSksbiYmbSh1LG4pLG51bGwhPW4mJnRoaXMuX192JiYobCYmdGhpcy5fc2IucHVzaChsKSxBKHRoaXMpKX0sQy5wcm90b3R5cGUuZm9yY2VVcGRhdGU9ZnVuY3Rpb24obil7dGhpcy5fX3YmJih0aGlzLl9fZT0hMCxuJiZ0aGlzLl9faC5wdXNoKG4pLEEodGhpcykpfSxDLnByb3RvdHlwZS5yZW5kZXI9UyxpPVtdLG89XCJmdW5jdGlvblwiPT10eXBlb2YgUHJvbWlzZT9Qcm9taXNlLnByb3RvdHlwZS50aGVuLmJpbmQoUHJvbWlzZS5yZXNvbHZlKCkpOnNldFRpbWVvdXQsZT1mdW5jdGlvbihuLGwpe3JldHVybiBuLl9fdi5fX2ItbC5fX3YuX19ifSxILl9fcj0wLGY9TWF0aC5yYW5kb20oKS50b1N0cmluZyg4KSxjPVwiX19kXCIrZixhPVwiX19hXCIrZixzPS8oUG9pbnRlckNhcHR1cmUpJHxDYXB0dXJlJC9pLGg9MCxwPVYoITEpLHY9VighMCkseT0wO2V4cG9ydHtDIGFzIENvbXBvbmVudCxTIGFzIEZyYWdtZW50LFcgYXMgY2xvbmVFbGVtZW50LFggYXMgY3JlYXRlQ29udGV4dCxrIGFzIGNyZWF0ZUVsZW1lbnQsTSBhcyBjcmVhdGVSZWYsayBhcyBoLFUgYXMgaHlkcmF0ZSx0IGFzIGlzVmFsaWRFbGVtZW50LGwgYXMgb3B0aW9ucyxSIGFzIHJlbmRlcixGIGFzIHRvQ2hpbGRBcnJheX07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wcmVhY3QubW9kdWxlLmpzLm1hcFxuIiwiaW1wb3J0e29wdGlvbnMgYXMgcixGcmFnbWVudCBhcyBlfWZyb21cInByZWFjdFwiO2V4cG9ydHtGcmFnbWVudH1mcm9tXCJwcmVhY3RcIjt2YXIgdD0vW1wiJjxdLztmdW5jdGlvbiBuKHIpe2lmKDA9PT1yLmxlbmd0aHx8ITE9PT10LnRlc3QocikpcmV0dXJuIHI7Zm9yKHZhciBlPTAsbj0wLG89XCJcIixmPVwiXCI7bjxyLmxlbmd0aDtuKyspe3N3aXRjaChyLmNoYXJDb2RlQXQobikpe2Nhc2UgMzQ6Zj1cIiZxdW90O1wiO2JyZWFrO2Nhc2UgMzg6Zj1cIiZhbXA7XCI7YnJlYWs7Y2FzZSA2MDpmPVwiJmx0O1wiO2JyZWFrO2RlZmF1bHQ6Y29udGludWV9biE9PWUmJihvKz1yLnNsaWNlKGUsbikpLG8rPWYsZT1uKzF9cmV0dXJuIG4hPT1lJiYobys9ci5zbGljZShlLG4pKSxvfXZhciBvPS9hY2l0fGV4KD86c3xnfG58cHwkKXxycGh8Z3JpZHxvd3N8bW5jfG50d3xpbmVbY2hdfHpvb3xeb3JkfGl0ZXJhL2ksZj0wLGk9QXJyYXkuaXNBcnJheTtmdW5jdGlvbiB1KGUsdCxuLG8saSx1KXt0fHwodD17fSk7dmFyIGEsYyxwPXQ7aWYoXCJyZWZcImluIHApZm9yKGMgaW4gcD17fSx0KVwicmVmXCI9PWM/YT10W2NdOnBbY109dFtjXTt2YXIgbD17dHlwZTplLHByb3BzOnAsa2V5Om4scmVmOmEsX19rOm51bGwsX186bnVsbCxfX2I6MCxfX2U6bnVsbCxfX2M6bnVsbCxjb25zdHJ1Y3Rvcjp2b2lkIDAsX192Oi0tZixfX2k6LTEsX191OjAsX19zb3VyY2U6aSxfX3NlbGY6dX07aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZSYmKGE9ZS5kZWZhdWx0UHJvcHMpKWZvcihjIGluIGEpdm9pZCAwPT09cFtjXSYmKHBbY109YVtjXSk7cmV0dXJuIHIudm5vZGUmJnIudm5vZGUobCksbH1mdW5jdGlvbiBhKHIpe3ZhciB0PXUoZSx7dHBsOnIsZXhwcnM6W10uc2xpY2UuY2FsbChhcmd1bWVudHMsMSl9KTtyZXR1cm4gdC5rZXk9dC5fX3YsdH12YXIgYz17fSxwPS9bQS1aXS9nO2Z1bmN0aW9uIGwoZSx0KXtpZihyLmF0dHIpe3ZhciBmPXIuYXR0cihlLHQpO2lmKFwic3RyaW5nXCI9PXR5cGVvZiBmKXJldHVybiBmfWlmKHQ9ZnVuY3Rpb24ocil7cmV0dXJuIG51bGwhPT1yJiZcIm9iamVjdFwiPT10eXBlb2YgciYmXCJmdW5jdGlvblwiPT10eXBlb2Ygci52YWx1ZU9mP3IudmFsdWVPZigpOnJ9KHQpLFwicmVmXCI9PT1lfHxcImtleVwiPT09ZSlyZXR1cm5cIlwiO2lmKFwic3R5bGVcIj09PWUmJlwib2JqZWN0XCI9PXR5cGVvZiB0KXt2YXIgaT1cIlwiO2Zvcih2YXIgdSBpbiB0KXt2YXIgYT10W3VdO2lmKG51bGwhPWEmJlwiXCIhPT1hKXt2YXIgbD1cIi1cIj09dVswXT91OmNbdV18fChjW3VdPXUucmVwbGFjZShwLFwiLSQmXCIpLnRvTG93ZXJDYXNlKCkpLHM9XCI7XCI7XCJudW1iZXJcIiE9dHlwZW9mIGF8fGwuc3RhcnRzV2l0aChcIi0tXCIpfHxvLnRlc3QobCl8fChzPVwicHg7XCIpLGk9aStsK1wiOlwiK2Erc319cmV0dXJuIGUrJz1cIicrbihpKSsnXCInfXJldHVybiBudWxsPT10fHwhMT09PXR8fFwiZnVuY3Rpb25cIj09dHlwZW9mIHR8fFwib2JqZWN0XCI9PXR5cGVvZiB0P1wiXCI6ITA9PT10P2U6ZSsnPVwiJytuKFwiXCIrdCkrJ1wiJ31mdW5jdGlvbiBzKHIpe2lmKG51bGw9PXJ8fFwiYm9vbGVhblwiPT10eXBlb2Ygcnx8XCJmdW5jdGlvblwiPT10eXBlb2YgcilyZXR1cm4gbnVsbDtpZihcIm9iamVjdFwiPT10eXBlb2Ygcil7aWYodm9pZCAwPT09ci5jb25zdHJ1Y3RvcilyZXR1cm4gcjtpZihpKHIpKXtmb3IodmFyIGU9MDtlPHIubGVuZ3RoO2UrKylyW2VdPXMocltlXSk7cmV0dXJuIHJ9fXJldHVybiBuKFwiXCIrcil9ZXhwb3J0e3UgYXMganN4LGwgYXMganN4QXR0cix1IGFzIGpzeERFVixzIGFzIGpzeEVzY2FwZSxhIGFzIGpzeFRlbXBsYXRlLHUgYXMganN4c307XG4vLyMgc291cmNlTWFwcGluZ1VSTD1qc3hSdW50aW1lLm1vZHVsZS5qcy5tYXBcbiIsImltcG9ydCB0eXBlIHsgU2lnbmFsIH0gZnJvbSAnQHByZWFjdC9zaWduYWxzJ1xuaW1wb3J0IHR5cGUgeyBDb21wb25lbnRDaGlsZHJlbiB9IGZyb20gJ3ByZWFjdCdcblxuaW50ZXJmYWNlIEJ1dHRvblJvd1Byb3BzIHtcbiAgY2hpbGRyZW46IENvbXBvbmVudENoaWxkcmVuXG4gIHZpc2libGU/OiBTaWduYWw8Ym9vbGVhbj5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEJ1dHRvblJvdyh7IGNoaWxkcmVuLCB2aXNpYmxlIH06IEJ1dHRvblJvd1Byb3BzKSB7XG4gIGlmICh2aXNpYmxlICYmICF2aXNpYmxlLnZhbHVlKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIHJldHVybiA8ZGl2PntjaGlsZHJlbn08L2Rpdj5cbn1cbiIsImltcG9ydCB0eXBlIHsgU2lnbmFsIH0gZnJvbSAnQHByZWFjdC9zaWduYWxzJ1xuXG5pbnRlcmZhY2UgU2V0dGluZ0J1dHRvblByb3BzPFQ+IHtcbiAgbGFiZWw6IHN0cmluZ1xuICBzZXR0aW5nOiBTaWduYWw8VD5cbiAgb3B0aW9uczogcmVhZG9ubHkgVFtdXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTZXR0aW5nQnV0dG9uPFQ+KHsgbGFiZWwsIHNldHRpbmcsIG9wdGlvbnMgfTogU2V0dGluZ0J1dHRvblByb3BzPFQ+KSB7XG4gIGNvbnN0IGhhbmRsZUNsaWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IGN1cnJlbnRJbmRleCA9IG9wdGlvbnMuaW5kZXhPZihzZXR0aW5nLnZhbHVlKVxuICAgIGNvbnN0IG5leHRJbmRleCA9IChjdXJyZW50SW5kZXggKyAxKSAlIG9wdGlvbnMubGVuZ3RoXG4gICAgc2V0dGluZy52YWx1ZSA9IG9wdGlvbnNbbmV4dEluZGV4XVxuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8YnV0dG9uIG9uQ2xpY2s9e2hhbmRsZUNsaWNrfSB0eXBlPVwiYnV0dG9uXCI+XG4gICAgICB7bGFiZWx9OiB7U3RyaW5nKHNldHRpbmcudmFsdWUpfVxuICAgIDwvYnV0dG9uPlxuICApXG59XG4iLCJpbXBvcnQgdHlwZSB7IFNpZ25hbCB9IGZyb20gJ0BwcmVhY3Qvc2lnbmFscydcbmltcG9ydCB7IHNldHRpbmdzIH0gZnJvbSAnLi4vc2V0dGluZ3Mvc2V0dGluZ3NTdG9yZSdcbmltcG9ydCB7IEJ1dHRvblJvdyB9IGZyb20gJy4vQnV0dG9uUm93J1xuaW1wb3J0IHsgU2V0dGluZ0J1dHRvbiB9IGZyb20gJy4vU2V0dGluZ0J1dHRvbidcblxuaW50ZXJmYWNlIENvbnRyb2xQYW5lbFByb3BzIHtcbiAgYm9hcmRDaGFuZ2VkOiBTaWduYWw8bnVtYmVyPlxufVxuXG5jb25zdCBTUEVBS19SQVRFX09QVElPTlMgPSBbMC4yLCAwLjUsIDAuNywgMS4wLCAxLjEsIDEuMl0gYXMgY29uc3RcbmNvbnN0IFRPR0dMRV9PUFRJT05TID0gW2ZhbHNlLCB0cnVlXSBhcyBjb25zdFxuXG5leHBvcnQgZnVuY3Rpb24gQ29udHJvbFBhbmVsKHsgYm9hcmRDaGFuZ2VkIH06IENvbnRyb2xQYW5lbFByb3BzKSB7XG4gIC8vIFVzZSBib2FyZENoYW5nZWQgdG8gZW5zdXJlIGNvbXBvbmVudCByZS1yZW5kZXJzIHdoZW4gYm9hcmQgY2hhbmdlc1xuICBib2FyZENoYW5nZWQudmFsdWVcblxuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICA8QnV0dG9uUm93PlxuICAgICAgICA8U2V0dGluZ0J1dHRvblxuICAgICAgICAgIGxhYmVsPVwiU3BlYWsgUmF0ZVwiXG4gICAgICAgICAgc2V0dGluZz17c2V0dGluZ3Muc3BlYWtSYXRlfVxuICAgICAgICAgIG9wdGlvbnM9e1NQRUFLX1JBVEVfT1BUSU9OU31cbiAgICAgICAgLz5cbiAgICAgICAgPFNldHRpbmdCdXR0b25cbiAgICAgICAgICBsYWJlbD1cIlBpZWNlcyBMaXN0XCJcbiAgICAgICAgICBzZXR0aW5nPXtzZXR0aW5ncy5waWVjZXNMaXN0RW5hYmxlZH1cbiAgICAgICAgICBvcHRpb25zPXtUT0dHTEVfT1BUSU9OU31cbiAgICAgICAgLz5cbiAgICAgICAgPFNldHRpbmdCdXR0b25cbiAgICAgICAgICBsYWJlbD1cIkRpdmlkZXJzXCJcbiAgICAgICAgICBzZXR0aW5nPXtzZXR0aW5ncy5kaXZpZGVyc0VuYWJsZWR9XG4gICAgICAgICAgb3B0aW9ucz17VE9HR0xFX09QVElPTlN9XG4gICAgICAgIC8+XG4gICAgICAgIDxTZXR0aW5nQnV0dG9uXG4gICAgICAgICAgbGFiZWw9XCJDdXN0b20gQm9hcmRcIlxuICAgICAgICAgIHNldHRpbmc9e3NldHRpbmdzLmN1c3RvbUJvYXJkRW5hYmxlZH1cbiAgICAgICAgICBvcHRpb25zPXtUT0dHTEVfT1BUSU9OU31cbiAgICAgICAgLz5cbiAgICAgICAgPFNldHRpbmdCdXR0b25cbiAgICAgICAgICBsYWJlbD1cIkZsYXNoIE1vZGVcIlxuICAgICAgICAgIHNldHRpbmc9e3NldHRpbmdzLmZsYXNoTW9kZUVuYWJsZWR9XG4gICAgICAgICAgb3B0aW9ucz17VE9HR0xFX09QVElPTlN9XG4gICAgICAgIC8+XG4gICAgICA8L0J1dHRvblJvdz5cbiAgICA8L2Rpdj5cbiAgKVxufVxuIiwiaW1wb3J0IHR5cGUgeyBTaWduYWwgfSBmcm9tICdAcHJlYWN0L3NpZ25hbHMtY29yZSdcbmltcG9ydCB7IHJlbmRlciB9IGZyb20gJ3ByZWFjdCdcbmltcG9ydCB7IENvbnRyb2xQYW5lbCB9IGZyb20gJy4vQ29udHJvbFBhbmVsJ1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUm9vdChib2FyZENoYW5nZWQ6IFNpZ25hbDxudW1iZXI+LCBtb3VudFBvaW50OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICByZW5kZXIoPENvbnRyb2xQYW5lbCBib2FyZENoYW5nZWQ9e2JvYXJkQ2hhbmdlZH0gLz4sIG1vdW50UG9pbnQpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXN0cm95Um9vdChtb3VudFBvaW50OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICByZW5kZXIobnVsbCwgbW91bnRQb2ludClcbn1cbiIsImltcG9ydCB0eXBlIHsgU2lnbmFsIH0gZnJvbSAnQHByZWFjdC9zaWduYWxzLWNvcmUnXG5pbXBvcnQgeyBEb21TZWxlY3RvciB9IGZyb20gJy4uL2NvbnN0YW50cydcbmltcG9ydCB7IHF1ZXJ5U2VsZWN0b3IgfSBmcm9tICcuLi9wbGF0Zm9ybS9kb20nXG5cbmV4cG9ydCBpbnRlcmZhY2UgQm9hcmRPYnNlcnZlclN0YXRlIHtcbiAgb2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXJcbiAgYm9hcmRDaGFuZ2VkOiBTaWduYWw8bnVtYmVyPlxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQm9hcmRPYnNlcnZlcihib2FyZENoYW5nZWQ6IFNpZ25hbDxudW1iZXI+KTogQm9hcmRPYnNlcnZlclN0YXRlIHtcbiAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgYm9hcmRDaGFuZ2VkLnZhbHVlICs9IDFcbiAgfSlcblxuICByZXR1cm4geyBvYnNlcnZlciwgYm9hcmRDaGFuZ2VkIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0Qm9hcmRPYnNlcnZlcihzdGF0ZTogQm9hcmRPYnNlcnZlclN0YXRlKTogdm9pZCB7XG4gIGNvbnN0IGJvYXJkID0gcXVlcnlTZWxlY3RvcihEb21TZWxlY3Rvci5CT0FSRClcbiAgaWYgKCFib2FyZCkgcmV0dXJuXG5cbiAgc3RhdGUub2JzZXJ2ZXIub2JzZXJ2ZShib2FyZCwge1xuICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICBhdHRyaWJ1dGVzOiB0cnVlLFxuICAgIHN1YnRyZWU6IHRydWUsXG4gIH0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdG9wQm9hcmRPYnNlcnZlcihzdGF0ZTogQm9hcmRPYnNlcnZlclN0YXRlKTogdm9pZCB7XG4gIHN0YXRlLm9ic2VydmVyLmRpc2Nvbm5lY3QoKVxufVxuIiwiaW1wb3J0IHsgdHlwZSBEaXZpZGVyc1N0YXRlLCBoaWRlRGl2aWRlcnMsIHNob3dEaXZpZGVycyB9IGZyb20gJy4uL2FkYXB0ZXJzLW92ZXJsYXlzL2RpdmlkZXJzJ1xuaW1wb3J0IHsgc2V0dGluZ3MgfSBmcm9tICcuLi9zZXR0aW5ncy9zZXR0aW5nc1N0b3JlJ1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlRGl2aWRlcnMoc3RhdGU6IERpdmlkZXJzU3RhdGUpOiB2b2lkIHtcbiAgaWYgKHNldHRpbmdzLmRpdmlkZXJzRW5hYmxlZC52YWx1ZSkge1xuICAgIHNob3dEaXZpZGVycyhzdGF0ZSlcbiAgfSBlbHNlIHtcbiAgICBoaWRlRGl2aWRlcnMoc3RhdGUpXG4gIH1cbn1cbiIsImltcG9ydCB7IGVmZmVjdCB9IGZyb20gJ0BwcmVhY3Qvc2lnbmFscy1jb3JlJ1xuaW1wb3J0IHR5cGUgeyBEaXZpZGVyc1N0YXRlIH0gZnJvbSAnLi4vYWRhcHRlcnMtb3ZlcmxheXMvZGl2aWRlcnMnXG5pbXBvcnQgeyB1cGRhdGVEaXZpZGVycyB9IGZyb20gJy4uL2hhbmRsZXJzL3VwZGF0ZURpdmlkZXJzJ1xuaW1wb3J0IHsgc2V0dGluZ3MgfSBmcm9tICcuLi9zZXR0aW5ncy9zZXR0aW5nc1N0b3JlJ1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBEaXZpZGVyc0VmZmVjdChzdGF0ZTogRGl2aWRlcnNTdGF0ZSk6ICgpID0+IHZvaWQge1xuICByZXR1cm4gZWZmZWN0KCgpID0+IHtcbiAgICBzZXR0aW5ncy5kaXZpZGVyc0VuYWJsZWQudmFsdWVcbiAgICB1cGRhdGVEaXZpZGVycyhzdGF0ZSlcbiAgfSlcbn1cbiIsImltcG9ydCB7IHNpZ25hbCB9IGZyb20gJ0BwcmVhY3Qvc2lnbmFscy1jb3JlJ1xuaW1wb3J0IHsgY3JlYXRlRGl2aWRlcnMsIGRlc3Ryb3lEaXZpZGVycyB9IGZyb20gJy4vYWRhcHRlcnMtb3ZlcmxheXMvZGl2aWRlcnMnXG5pbXBvcnQgeyBjcmVhdGVGbGFzaE92ZXJsYXksIGRlc3Ryb3lGbGFzaE92ZXJsYXkgfSBmcm9tICcuL2FkYXB0ZXJzLW92ZXJsYXlzL2ZsYXNoJ1xuaW1wb3J0IHsgc2V0dXBLZXlib2FyZENvbW1hbmRzLCB0ZWFyZG93bktleWJvYXJkQ29tbWFuZHMgfSBmcm9tICcuL2NvbW1hbmRzL2tleWJvYXJkSW5wdXQnXG5pbXBvcnQgeyBjcmVhdGVSb290LCBkZXN0cm95Um9vdCB9IGZyb20gJy4vY29tcG9uZW50cy9yb290J1xuaW1wb3J0IHsgRG9tU2VsZWN0b3IgfSBmcm9tICcuL2NvbnN0YW50cydcbmltcG9ydCB7IGNyZWF0ZUJvYXJkT2JzZXJ2ZXIsIHN0YXJ0Qm9hcmRPYnNlcnZlciwgc3RvcEJvYXJkT2JzZXJ2ZXIgfSBmcm9tICcuL2RvbS9ib2FyZE9ic2VydmVyJ1xuaW1wb3J0IHsgd2FpdEZvckVsZW1lbnQgfSBmcm9tICcuL2RvbS9ib2FyZFJlYWRlcidcbmltcG9ydCB7IHNldHVwRGl2aWRlcnNFZmZlY3QgfSBmcm9tICcuL2VmZmVjdHMvb25EaXZpZGVycydcbmltcG9ydCB7IGFwcGVuZENoaWxkLCBjcmVhdGVEaXYsIHF1ZXJ5U2VsZWN0b3IgfSBmcm9tICcuL3BsYXRmb3JtL2RvbSdcbmltcG9ydCB7IGxvYWRTZXR0aW5ncywgc2V0dXBBdXRvU2F2ZSB9IGZyb20gJy4vc2V0dGluZ3Mvc2V0dGluZ3NTdG9yZSdcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGluaXQoKSB7XG4gIC8vIFdhaXQgZm9yIGxpY2hlc3MgdG8gbG9hZCB0aGUgYm9hcmRcbiAgYXdhaXQgd2FpdEZvckVsZW1lbnQoRG9tU2VsZWN0b3IuS0VZQk9BUkRfTU9WRSlcblxuICAvLyBJbml0aWFsaXplIHNldHRpbmdzXG4gIGxvYWRTZXR0aW5ncygpXG4gIHNldHVwQXV0b1NhdmUoKVxuXG4gIC8vIENyZWF0ZSBzaGFyZWQgYm9hcmQgY2hhbmdlIHNpZ25hbFxuICBjb25zdCBib2FyZENoYW5nZWQgPSBzaWduYWwoMClcblxuICAvLyBDcmVhdGUgRE9NIHN0YXRlXG4gIGNvbnN0IGZsYXNoU3RhdGUgPSBjcmVhdGVGbGFzaE92ZXJsYXkoKVxuICBjb25zdCBkaXZpZGVyc1N0YXRlID0gY3JlYXRlRGl2aWRlcnMoKVxuICBjb25zdCBib2FyZE9ic2VydmVyU3RhdGUgPSBjcmVhdGVCb2FyZE9ic2VydmVyKGJvYXJkQ2hhbmdlZClcblxuICAvLyBTdGFydCBvYnNlcnZlclxuICBzdGFydEJvYXJkT2JzZXJ2ZXIoYm9hcmRPYnNlcnZlclN0YXRlKVxuXG4gIC8vIFNldCB1cCBlZmZlY3RzXG4gIGNvbnN0IGNsZWFudXBEaXZpZGVycyA9IHNldHVwRGl2aWRlcnNFZmZlY3QoZGl2aWRlcnNTdGF0ZSlcblxuICAvLyBTZXQgdXAgY29tbWFuZHNcbiAgc2V0dXBLZXlib2FyZENvbW1hbmRzKClcblxuICAvLyBNb3VudCBQcmVhY3QgVUlcbiAgY29uc3QgbW91bnRQb2ludCA9IGNyZWF0ZURpdigpXG4gIGNvbnN0IGtleWJvYXJkTW92ZSA9IHF1ZXJ5U2VsZWN0b3IoRG9tU2VsZWN0b3IuS0VZQk9BUkRfTU9WRSlcbiAgaWYgKGtleWJvYXJkTW92ZSkge1xuICAgIGFwcGVuZENoaWxkKGtleWJvYXJkTW92ZSwgbW91bnRQb2ludClcbiAgfVxuICBjcmVhdGVSb290KGJvYXJkQ2hhbmdlZCwgbW91bnRQb2ludClcblxuICAvLyBSZXR1cm4gY2xlYW51cCBmdW5jdGlvblxuICByZXR1cm4gKCkgPT4ge1xuICAgIGNsZWFudXBEaXZpZGVycygpXG4gICAgc3RvcEJvYXJkT2JzZXJ2ZXIoYm9hcmRPYnNlcnZlclN0YXRlKVxuICAgIGRlc3Ryb3lGbGFzaE92ZXJsYXkoZmxhc2hTdGF0ZSlcbiAgICBkZXN0cm95RGl2aWRlcnMoZGl2aWRlcnNTdGF0ZSlcbiAgICB0ZWFyZG93bktleWJvYXJkQ29tbWFuZHMoKVxuICAgIGRlc3Ryb3lSb290KG1vdW50UG9pbnQpXG4gIH1cbn1cbiIsImltcG9ydCB7IGluaXQgfSBmcm9tICcuL2luaXQnXG5cbi8vIFN0YXJ0IHRoZSBhcHBsaWNhdGlvblxuaW5pdCgpLmNhdGNoKGNvbnNvbGUuZXJyb3IpXG4iXSwieF9nb29nbGVfaWdub3JlTGlzdCI6WzAsMTgsMTldLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztDQUFBLElBQUlBLE1BQUUsT0FBTyxJQUFJLGdCQUFnQjtDQUFFLFNBQVNDLE1BQUc7RUFBQyxJQUFHLEVBQUVDLE1BQUUsSUFBRztHQUFDLElBQUksR0FBRSxJQUFFLENBQUM7R0FBRSxDQUFDLFdBQVU7SUFBQyxJQUFJLElBQUVDO0lBQUUsTUFBRSxLQUFLO0lBQUUsT0FBTSxLQUFLLE1BQUksR0FBRTtLQUFDLElBQUcsRUFBRSxFQUFFLE1BQUksRUFBRSxHQUFFLEVBQUUsRUFBRSxJQUFFLEVBQUU7S0FBRSxJQUFFLEVBQUU7SUFBQztHQUFDLEdBQUU7R0FBRSxPQUFNLEtBQUssTUFBSUMsS0FBRTtJQUFDLElBQUksSUFBRUE7SUFBRSxNQUFFLEtBQUs7SUFBRTtJQUFJLE9BQU0sS0FBSyxNQUFJLEdBQUU7S0FBQyxJQUFJLElBQUUsRUFBRTtLQUFFLEVBQUUsSUFBRSxLQUFLO0tBQUUsRUFBRSxLQUFHO0tBQUcsSUFBRyxFQUFFLElBQUUsRUFBRSxNQUFJQyxJQUFFLENBQUMsR0FBRSxJQUFHO01BQUMsRUFBRSxFQUFFO0tBQUMsU0FBTyxHQUFFO01BQUMsSUFBRyxDQUFDLEdBQUU7T0FBQyxJQUFFO09BQUUsSUFBRSxDQUFDO01BQUM7S0FBQztLQUFDLElBQUU7SUFBQztHQUFDO0dBQUMsTUFBRTtHQUFFO0dBQUksSUFBRyxHQUFFLE1BQU07RUFBQyxPQUFNO0NBQUc7Q0FBdUUsSUFBSUMsTUFBRSxLQUFLO0NBQUUsU0FBU0MsSUFBRSxHQUFFO0VBQUMsSUFBSSxJQUFFRDtFQUFFLE1BQUUsS0FBSztFQUFFLElBQUc7R0FBQyxPQUFPLEVBQUU7RUFBQyxVQUFRO0dBQUMsTUFBRTtFQUFDO0NBQUM7Q0FBQyxJQUFJRSxLQUFFSixNQUFFLEtBQUssR0FBRUYsTUFBRSxHQUFFTyxNQUFFLEdBQU1FLE1BQUUsR0FBRVIsTUFBRSxLQUFLLEdBQUVTLE1BQUU7Q0FBRSxTQUFTQyxJQUFFLEdBQUU7RUFBQyxJQUFHLEtBQUssTUFBSVAsS0FBRTtHQUFDLElBQUksSUFBRSxFQUFFO0dBQUUsSUFBRyxLQUFLLE1BQUksS0FBRyxFQUFFLE1BQUlBLEtBQUU7SUFBQyxJQUFFO0tBQUMsR0FBRTtLQUFFLEdBQUU7S0FBRSxHQUFFQSxJQUFFO0tBQUUsR0FBRSxLQUFLO0tBQUUsR0FBRUE7S0FBRSxHQUFFLEtBQUs7S0FBRSxHQUFFLEtBQUs7S0FBRSxHQUFFO0lBQUM7SUFBRSxJQUFHLEtBQUssTUFBSUEsSUFBRSxHQUFFLElBQUUsRUFBRSxJQUFFO0lBQUUsSUFBRSxJQUFFO0lBQUUsRUFBRSxJQUFFO0lBQUUsSUFBRyxLQUFHQSxJQUFFLEdBQUUsRUFBRSxFQUFFLENBQUM7SUFBRSxPQUFPO0dBQUMsT0FBTSxJQUFHLE9BQUssRUFBRSxHQUFFO0lBQUMsRUFBRSxJQUFFO0lBQUUsSUFBRyxLQUFLLE1BQUksRUFBRSxHQUFFO0tBQUMsRUFBRSxFQUFFLElBQUUsRUFBRTtLQUFFLElBQUcsS0FBSyxNQUFJLEVBQUUsR0FBRSxFQUFFLEVBQUUsSUFBRSxFQUFFO0tBQUUsRUFBRSxJQUFFQSxJQUFFO0tBQUUsRUFBRSxJQUFFLEtBQUs7S0FBRSxJQUFFLEVBQUUsSUFBRTtLQUFFLElBQUUsSUFBRTtJQUFDO0lBQUMsT0FBTztHQUFDO0VBQUM7Q0FBQztDQUFDLFNBQVNRLElBQUUsR0FBRSxHQUFFO0VBQUMsS0FBSyxJQUFFO0VBQUUsS0FBSyxJQUFFO0VBQUUsS0FBSyxJQUFFLEtBQUs7RUFBRSxLQUFLLElBQUUsS0FBSztFQUFFLEtBQUssSUFBRTtFQUFFLEtBQUssSUFBRSxRQUFNLElBQUUsS0FBSyxJQUFFLEVBQUU7RUFBUSxLQUFLLElBQUUsUUFBTSxJQUFFLEtBQUssSUFBRSxFQUFFO0VBQVUsS0FBSyxPQUFLLFFBQU0sSUFBRSxLQUFLLElBQUUsRUFBRTtDQUFJO0NBQUMsSUFBRSxVQUFVLFFBQU1kO0NBQUUsSUFBRSxVQUFVLElBQUUsV0FBVTtFQUFDLE9BQU0sQ0FBQztDQUFDO0NBQUUsSUFBRSxVQUFVLElBQUUsU0FBUyxHQUFFO0VBQUMsSUFBSSxJQUFFLE1BQUssSUFBRSxLQUFLO0VBQUUsSUFBRyxNQUFJLEtBQUcsS0FBSyxNQUFJLEVBQUUsR0FBRTtHQUFDLEVBQUUsSUFBRTtHQUFFLEtBQUssSUFBRTtHQUFFLElBQUcsS0FBSyxNQUFJLEdBQUUsRUFBRSxJQUFFO1FBQU8sSUFBRSxXQUFVO0lBQUMsSUFBSTtJQUFFLFNBQU8sSUFBRSxFQUFFLE1BQUksRUFBRSxLQUFLLENBQUM7R0FBQyxDQUFDO0VBQUM7Q0FBQztDQUFFLElBQUUsVUFBVSxJQUFFLFNBQVMsR0FBRTtFQUFDLElBQUksSUFBRTtFQUFLLElBQUcsS0FBSyxNQUFJLEtBQUssR0FBRTtHQUFDLElBQUksSUFBRSxFQUFFLEdBQUUsSUFBRSxFQUFFO0dBQUUsSUFBRyxLQUFLLE1BQUksR0FBRTtJQUFDLEVBQUUsSUFBRTtJQUFFLEVBQUUsSUFBRSxLQUFLO0dBQUM7R0FBQyxJQUFHLEtBQUssTUFBSSxHQUFFO0lBQUMsRUFBRSxJQUFFO0lBQUUsRUFBRSxJQUFFLEtBQUs7R0FBQztHQUFDLElBQUcsTUFBSSxLQUFLLEdBQUU7SUFBQyxLQUFLLElBQUU7SUFBRSxJQUFHLEtBQUssTUFBSSxHQUFFLElBQUUsV0FBVTtLQUFDLElBQUk7S0FBRSxTQUFPLElBQUUsRUFBRSxNQUFJLEVBQUUsS0FBSyxDQUFDO0lBQUMsQ0FBQztHQUFDO0VBQUM7Q0FBQztDQUFFLElBQUUsVUFBVSxZQUFVLFNBQVMsR0FBRTtFQUFDLElBQUksSUFBRTtFQUFLLE9BQU9lLElBQUUsV0FBVTtHQUFDLElBQUksSUFBRSxFQUFFLE9BQU0sSUFBRVQ7R0FBRSxNQUFFLEtBQUs7R0FBRSxJQUFHO0lBQUMsRUFBRSxDQUFDO0dBQUMsVUFBUTtJQUFDLE1BQUU7R0FBQztFQUFDLEdBQUUsRUFBQyxNQUFLLE1BQUssQ0FBQztDQUFDO0NBQUUsSUFBRSxVQUFVLFVBQVEsV0FBVTtFQUFDLE9BQU8sS0FBSztDQUFLO0NBQUUsSUFBRSxVQUFVLFdBQVMsV0FBVTtFQUFDLE9BQU8sS0FBSyxRQUFNO0NBQUU7Q0FBRSxJQUFFLFVBQVUsU0FBTyxXQUFVO0VBQUMsT0FBTyxLQUFLO0NBQUs7Q0FBRSxJQUFFLFVBQVUsT0FBSyxXQUFVO0VBQUMsSUFBSSxJQUFFO0VBQUssT0FBT0MsSUFBRSxXQUFVO0dBQUMsT0FBTyxFQUFFO0VBQUssQ0FBQztDQUFDO0NBQUUsT0FBTyxlQUFlTyxJQUFFLFdBQVUsU0FBUTtFQUFDLEtBQUksV0FBVTtHQUFDLElBQUksSUFBRUQsSUFBRSxJQUFJO0dBQUUsSUFBRyxLQUFLLE1BQUksR0FBRSxFQUFFLElBQUUsS0FBSztHQUFFLE9BQU8sS0FBSztFQUFDO0VBQUUsS0FBSSxTQUFTLEdBQUU7R0FBQyxJQUFHLE1BQUksS0FBSyxHQUFFO0lBQUMsSUFBR0osTUFBRSxLQUFJLE1BQU0sSUFBSSxNQUFNLGdCQUFnQjtJQUFFLENBQUMsU0FBUyxHQUFFO0tBQUMsSUFBRyxNQUFJUCxPQUFHLE1BQUlPO1VBQUssRUFBRSxNQUFJRSxLQUFFO09BQUMsRUFBRSxJQUFFQTtPQUFFLE1BQUU7UUFBQyxHQUFFO1FBQUUsR0FBRSxFQUFFO1FBQUUsR0FBRSxFQUFFO1FBQUUsR0FBRVI7T0FBQztNQUFDOztJQUFDLEdBQUUsSUFBSTtJQUFFLEtBQUssSUFBRTtJQUFFLEtBQUs7SUFBSTtJQUFJO0lBQUksSUFBRztLQUFDLEtBQUksSUFBSSxJQUFFLEtBQUssR0FBRSxLQUFLLE1BQUksR0FBRSxJQUFFLEVBQUUsR0FBRSxFQUFFLEVBQUUsRUFBRTtJQUFDLFVBQVE7S0FBQyxJQUFFO0lBQUM7R0FBQztFQUFDO0NBQUMsQ0FBQztDQUFFLFNBQVNhLElBQUUsR0FBRSxHQUFFO0VBQUMsT0FBTyxJQUFJRixJQUFFLEdBQUUsQ0FBQztDQUFDO0NBQUMsU0FBU1QsSUFBRSxHQUFFO0VBQUMsS0FBSSxJQUFJLElBQUUsRUFBRSxHQUFFLEtBQUssTUFBSSxHQUFFLElBQUUsRUFBRSxHQUFFLElBQUcsRUFBRSxFQUFFLE1BQUksRUFBRSxLQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsS0FBRyxFQUFFLEVBQUUsTUFBSSxFQUFFLEdBQUUsT0FBTSxDQUFDO0VBQUUsT0FBTSxDQUFDO0NBQUM7Q0FBQyxTQUFTWSxJQUFFLEdBQUU7RUFBQyxLQUFJLElBQUksSUFBRSxFQUFFLEdBQUUsS0FBSyxNQUFJLEdBQUUsSUFBRSxFQUFFLEdBQUU7R0FBQyxJQUFJLElBQUUsRUFBRSxFQUFFO0dBQUUsSUFBRyxLQUFLLE1BQUksR0FBRSxFQUFFLElBQUU7R0FBRSxFQUFFLEVBQUUsSUFBRTtHQUFFLEVBQUUsSUFBRTtHQUFHLElBQUcsS0FBSyxNQUFJLEVBQUUsR0FBRTtJQUFDLEVBQUUsSUFBRTtJQUFFO0dBQUs7RUFBQztDQUFDO0NBQUMsU0FBU0MsSUFBRSxHQUFFO0VBQUMsSUFBSSxJQUFFLEVBQUUsR0FBRSxJQUFFLEtBQUs7RUFBRSxPQUFNLEtBQUssTUFBSSxHQUFFO0dBQUMsSUFBSSxJQUFFLEVBQUU7R0FBRSxJQUFHLE9BQUssRUFBRSxHQUFFO0lBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUFFLElBQUcsS0FBSyxNQUFJLEdBQUUsRUFBRSxJQUFFLEVBQUU7SUFBRSxJQUFHLEtBQUssTUFBSSxFQUFFLEdBQUUsRUFBRSxFQUFFLElBQUU7R0FBQyxPQUFNLElBQUU7R0FBRSxFQUFFLEVBQUUsSUFBRSxFQUFFO0dBQUUsSUFBRyxLQUFLLE1BQUksRUFBRSxHQUFFLEVBQUUsSUFBRSxLQUFLO0dBQUUsSUFBRTtFQUFDO0VBQUMsRUFBRSxJQUFFO0NBQUM7Q0FBQyxTQUFTQyxJQUFFLEdBQUUsR0FBRTtFQUFDLElBQUUsS0FBSyxNQUFLLEtBQUssQ0FBQztFQUFFLEtBQUssSUFBRTtFQUFFLEtBQUssSUFBRSxLQUFLO0VBQUUsS0FBSyxJQUFFUCxNQUFFO0VBQUUsS0FBSyxJQUFFO0VBQUUsS0FBSyxJQUFFLFFBQU0sSUFBRSxLQUFLLElBQUUsRUFBRTtFQUFRLEtBQUssSUFBRSxRQUFNLElBQUUsS0FBSyxJQUFFLEVBQUU7RUFBVSxLQUFLLE9BQUssUUFBTSxJQUFFLEtBQUssSUFBRSxFQUFFO0NBQUk7Q0FBQyxJQUFFLFlBQVUsSUFBSUUsSUFBQUE7Q0FBRSxJQUFFLFVBQVUsSUFBRSxXQUFVO0VBQUMsS0FBSyxLQUFHO0VBQUcsSUFBRyxJQUFFLEtBQUssR0FBRSxPQUFNLENBQUM7RUFBRSxJQUFHLE9BQUssS0FBRyxLQUFLLElBQUcsT0FBTSxDQUFDO0VBQUUsS0FBSyxLQUFHO0VBQUcsSUFBRyxLQUFLLE1BQUlGLEtBQUUsT0FBTSxDQUFDO0VBQUUsS0FBSyxJQUFFQTtFQUFFLEtBQUssS0FBRztFQUFFLElBQUcsS0FBSyxJQUFFLEtBQUcsQ0FBQ1AsSUFBRSxJQUFJLEdBQUU7R0FBQyxLQUFLLEtBQUc7R0FBRyxPQUFNLENBQUM7RUFBQztFQUFDLElBQUksSUFBRUM7RUFBRSxJQUFHO0dBQUMsSUFBRSxJQUFJO0dBQUUsTUFBRTtHQUFLLElBQUksSUFBRSxLQUFLLEVBQUU7R0FBRSxJQUFHLEtBQUcsS0FBSyxLQUFHLEtBQUssTUFBSSxLQUFHLE1BQUksS0FBSyxHQUFFO0lBQUMsS0FBSyxJQUFFO0lBQUUsS0FBSyxLQUFHO0lBQUksS0FBSztHQUFHO0VBQUMsU0FBTyxHQUFFO0dBQUMsS0FBSyxJQUFFO0dBQUUsS0FBSyxLQUFHO0dBQUcsS0FBSztFQUFHO0VBQUMsTUFBRTtFQUFFLElBQUUsSUFBSTtFQUFFLEtBQUssS0FBRztFQUFHLE9BQU0sQ0FBQztDQUFDO0NBQUUsSUFBRSxVQUFVLElBQUUsU0FBUyxHQUFFO0VBQUMsSUFBRyxLQUFLLE1BQUksS0FBSyxHQUFFO0dBQUMsS0FBSyxLQUFHO0dBQUcsS0FBSSxJQUFJLElBQUUsS0FBSyxHQUFFLEtBQUssTUFBSSxHQUFFLElBQUUsRUFBRSxHQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7RUFBQztFQUFDLElBQUUsVUFBVSxFQUFFLEtBQUssTUFBSyxDQUFDO0NBQUM7Q0FBRSxJQUFFLFVBQVUsSUFBRSxTQUFTLEdBQUU7RUFBQyxJQUFHLEtBQUssTUFBSSxLQUFLLEdBQUU7R0FBQyxJQUFFLFVBQVUsRUFBRSxLQUFLLE1BQUssQ0FBQztHQUFFLElBQUcsS0FBSyxNQUFJLEtBQUssR0FBRTtJQUFDLEtBQUssS0FBRztJQUFJLEtBQUksSUFBSSxJQUFFLEtBQUssR0FBRSxLQUFLLE1BQUksR0FBRSxJQUFFLEVBQUUsR0FBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO0dBQUM7RUFBQztDQUFDO0NBQUUsSUFBRSxVQUFVLElBQUUsV0FBVTtFQUFDLElBQUcsRUFBRSxJQUFFLEtBQUssSUFBRztHQUFDLEtBQUssS0FBRztHQUFFLEtBQUksSUFBSSxJQUFFLEtBQUssR0FBRSxLQUFLLE1BQUksR0FBRSxJQUFFLEVBQUUsR0FBRSxFQUFFLEVBQUUsRUFBRTtFQUFDO0NBQUM7Q0FBRSxPQUFPLGVBQWVhLElBQUUsV0FBVSxTQUFRLEVBQUMsS0FBSSxXQUFVO0VBQUMsSUFBRyxJQUFFLEtBQUssR0FBRSxNQUFNLElBQUksTUFBTSxnQkFBZ0I7RUFBRSxJQUFJLElBQUVOLElBQUUsSUFBSTtFQUFFLEtBQUssRUFBRTtFQUFFLElBQUcsS0FBSyxNQUFJLEdBQUUsRUFBRSxJQUFFLEtBQUs7RUFBRSxJQUFHLEtBQUcsS0FBSyxHQUFFLE1BQU0sS0FBSztFQUFFLE9BQU8sS0FBSztDQUFDLEVBQUMsQ0FBQztDQUFvQyxTQUFTTyxJQUFFLEdBQUU7RUFBQyxJQUFJLElBQUUsRUFBRTtFQUFFLEVBQUUsSUFBRSxLQUFLO0VBQUUsSUFBRyxjQUFZLE9BQU8sR0FBRTtHQUFDO0dBQUksSUFBSSxJQUFFZDtHQUFFLE1BQUUsS0FBSztHQUFFLElBQUc7SUFBQyxFQUFFO0dBQUMsU0FBTyxHQUFFO0lBQUMsRUFBRSxLQUFHO0lBQUcsRUFBRSxLQUFHO0lBQUUsSUFBRSxDQUFDO0lBQUUsTUFBTTtHQUFDLFVBQVE7SUFBQyxNQUFFO0lBQUUsSUFBRTtHQUFDO0VBQUM7Q0FBQztDQUFDLFNBQVNlLElBQUUsR0FBRTtFQUFDLEtBQUksSUFBSSxJQUFFLEVBQUUsR0FBRSxLQUFLLE1BQUksR0FBRSxJQUFFLEVBQUUsR0FBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO0VBQUUsRUFBRSxJQUFFLEtBQUs7RUFBRSxFQUFFLElBQUUsS0FBSztFQUFFLElBQUUsQ0FBQztDQUFDO0NBQUMsU0FBU0MsSUFBRSxHQUFFO0VBQUMsSUFBR2hCLFFBQUksTUFBSyxNQUFNLElBQUksTUFBTSxxQkFBcUI7RUFBRSxJQUFFLElBQUk7RUFBRSxNQUFFO0VBQUUsS0FBSyxLQUFHO0VBQUcsSUFBRyxJQUFFLEtBQUssR0FBRSxJQUFFLElBQUk7RUFBRSxJQUFFO0NBQUM7Q0FBQyxTQUFTaUIsSUFBRSxHQUFFLEdBQUU7RUFBQyxLQUFLLElBQUU7RUFBRSxLQUFLLElBQUUsS0FBSztFQUFFLEtBQUssSUFBRSxLQUFLO0VBQUUsS0FBSyxJQUFFLEtBQUs7RUFBRSxLQUFLLElBQUU7RUFBRyxLQUFLLE9BQUssUUFBTSxJQUFFLEtBQUssSUFBRSxFQUFFO0VBQUssSUFBR2YsS0FBRSxJQUFFLEtBQUssSUFBSTtDQUFDO0NBQUMsSUFBRSxVQUFVLElBQUUsV0FBVTtFQUFDLElBQUksSUFBRSxLQUFLLEVBQUU7RUFBRSxJQUFHO0dBQUMsSUFBRyxJQUFFLEtBQUssR0FBRTtHQUFPLElBQUcsS0FBSyxNQUFJLEtBQUssR0FBRTtHQUFPLElBQUksSUFBRSxLQUFLLEVBQUU7R0FBRSxJQUFHLGNBQVksT0FBTyxHQUFFLEtBQUssSUFBRTtFQUFDLFVBQVE7R0FBQyxFQUFFO0VBQUM7Q0FBQztDQUFFLElBQUUsVUFBVSxJQUFFLFdBQVU7RUFBQyxJQUFHLElBQUUsS0FBSyxHQUFFLE1BQU0sSUFBSSxNQUFNLGdCQUFnQjtFQUFFLEtBQUssS0FBRztFQUFFLEtBQUssS0FBRztFQUFHLElBQUUsSUFBSTtFQUFFLElBQUUsSUFBSTtFQUFFO0VBQUksSUFBSSxJQUFFRjtFQUFFLE1BQUU7RUFBSyxPQUFPZ0IsSUFBRSxLQUFLLE1BQUssQ0FBQztDQUFDO0NBQUUsSUFBRSxVQUFVLElBQUUsV0FBVTtFQUFDLElBQUcsRUFBRSxJQUFFLEtBQUssSUFBRztHQUFDLEtBQUssS0FBRztHQUFFLEtBQUssSUFBRWxCO0dBQUUsTUFBRTtFQUFJO0NBQUM7Q0FBRSxJQUFFLFVBQVUsSUFBRSxXQUFVO0VBQUMsS0FBSyxLQUFHO0VBQUUsSUFBRyxFQUFFLElBQUUsS0FBSyxJQUFHLElBQUUsSUFBSTtDQUFDO0NBQUUsSUFBRSxVQUFVLFVBQVEsV0FBVTtFQUFDLEtBQUssRUFBRTtDQUFDO0NBQUUsU0FBU1csSUFBRSxHQUFFLEdBQUU7RUFBQyxJQUFJLElBQUUsSUFBSVEsSUFBRSxHQUFFLENBQUM7RUFBRSxJQUFHO0dBQUMsRUFBRSxFQUFFO0VBQUMsU0FBTyxHQUFFO0dBQUMsRUFBRSxFQUFFO0dBQUUsTUFBTTtFQUFDO0VBQUMsSUFBSSxJQUFFLEVBQUUsRUFBRSxLQUFLLENBQUM7RUFBRSxFQUFFLE9BQU8sV0FBUztFQUFFLE9BQU87Q0FBQzs7O0NDQS9xSixJQUFZLGNBQUwseUJBQUEsYUFBQTtFQUNMLFlBQUEsV0FBQTtFQUNBLFlBQUEsV0FBQTs7Q0FDRixFQUFBLENBQUEsQ0FBQTtDQUVBLElBQVksWUFBTCx5QkFBQSxXQUFBO0VBQ0wsVUFBQSxVQUFBO0VBQ0EsVUFBQSxZQUFBO0VBQ0EsVUFBQSxZQUFBO0VBQ0EsVUFBQSxVQUFBO0VBQ0EsVUFBQSxXQUFBO0VBQ0EsVUFBQSxVQUFBOztDQUNGLEVBQUEsQ0FBQSxDQUFBO0NBRUEsSUFBWSxXQUFMLHlCQUFBLFVBQUE7RUFDTCxTQUFBLGdCQUFBO0VBQ0EsU0FBQSxpQkFBQTtFQUNBLFNBQUEsZ0JBQUE7RUFDQSxTQUFBLGlCQUFBOztDQUNGLEVBQUEsQ0FBQSxDQUFBO0NBR21DLE9BQU8sT0FBTyxXQUFBO0NBQ2hCLE9BQU8sT0FBTyxTQUFBO0NBQ2hCLE9BQU8sT0FBTyxRQUFBOzs7Q0NiN0MsSUFBWSxnQkFBTCx5QkFBQSxlQUFBO0VBQ0wsY0FBQSxTQUFBO0VBQ0EsY0FBQSxXQUFBO0VBQ0EsY0FBQSxXQUFBO0VBQ0EsY0FBQSxVQUFBO0VBQ0EsY0FBQSxRQUFBO0VBQ0EsY0FBQSxRQUFBO0VBQ0EsY0FBQSxRQUFBO0VBQ0EsY0FBQSxRQUFBOztDQUNGLEVBQUEsQ0FBQSxDQUFBO0NBR0EsSUFBYSx1QkFBdUIsSUFBSSxJQUFJO0VBQzFDLENBQUEsT0FBQSxJQUFBO0VBQ0EsQ0FBQSxPQUFBLElBQUE7RUFDQSxDQUFBLE9BQUEsSUFBQTtFQUNBLENBQUEsT0FBQSxJQUFBO0VBQ0EsQ0FBQSxNQUFBLEtBQUE7RUFDQSxDQUFBLE9BQUEsT0FBQTtFQUNBLENBQUEsT0FBQSxPQUFBO0VBQ0EsQ0FBQSxPQUFBLE1BQUE7RUFDUTs7O0NDL0JWLElBQVksY0FBTCx5QkFBQSxhQUFBO0VBQ0wsWUFBQSxXQUFBO0VBQ0EsWUFBQSxxQkFBQTtFQUNBLFlBQUEsWUFBQTtFQUNBLFlBQUEsV0FBQTtFQUNBLFlBQUEsZUFBQTtFQUNBLFlBQUEsbUJBQUE7RUFDQSxZQUFBLG9CQUFBOztDQUNGLEVBQUEsQ0FBQSxDQUFBO0NBR0EsSUFBWSxXQUFMLHlCQUFBLFVBQUE7RUFDTCxTQUFBLFdBQUE7RUFDQSxTQUFBLHlCQUFBO0VBQ0EsU0FBQSxzQkFBQTs7Q0FDRixFQUFBLENBQUEsQ0FBQTtDQUdBLElBQVksYUFBTCx5QkFBQSxZQUFBO0VBQ0wsV0FBQSxXQUFBO0VBQ0EsV0FBQSxVQUFBOztDQUNGLEVBQUEsQ0FBQSxDQUFBOzs7Q0N0QkEsU0FBZ0IsWUFBQTtFQUNkLE9BQU8sU0FBUyxjQUFjLEtBQUE7Q0FDaEM7Q0FFQSxTQUFnQixpQkFBaUIsS0FBQTtFQUMvQixPQUFPLFNBQVMsZ0JBQWdCLDhCQUE4QixHQUFBO0NBQ2hFO0NBRUEsU0FBZ0IsY0FBYyxVQUFBO0VBQzVCLE9BQU8sU0FBUyxjQUFjLFFBQUE7Q0FDaEM7Q0FNQSxTQUFnQixZQUFZLFFBQWlCLE9BQUE7RUFDM0MsT0FBTyxZQUFZLEtBQUE7Q0FDckI7Q0FFQSxTQUFnQixzQkFBc0IsU0FBQTtFQUNwQyxPQUFPLFFBQVEsc0JBQUE7Q0FDakI7OztDQ2ZBLFNBQWdCLGlCQUFBO0VBQ2QsTUFBTSxRQUFRLGNBQWMsWUFBWSxLQUFLO0VBQzdDLElBQUksQ0FBQyxPQUNILE1BQU0sSUFBSSxNQUFNLGlCQUFBO0VBSWxCLE1BQU0sT0FETyxNQUFNLHNCQUNOLEVBQUs7RUFFbEIsTUFBTSxNQUFNLGlCQUFpQixLQUFBO0VBQzdCLElBQUksYUFBYSxTQUFTLFNBQVMsbUJBQW1CO0VBQ3RELElBQUksYUFBYSxTQUFTLEtBQUssU0FBQSxDQUFBO0VBQy9CLElBQUksYUFBYSxVQUFVLEtBQUssU0FBQSxDQUFBO0VBQ2hDLElBQUksTUFBTSxVQUFVOzs7Ozs7O0VBU3BCLE1BQU0sUUFBUSxpQkFBaUIsTUFBQTtFQUMvQixNQUFNLGFBQWEsT0FBTyxPQUFPLEdBQUcsU0FBQSxDQUFBO0VBQ3BDLE1BQU0sYUFBYSxNQUFNLEdBQUE7RUFDekIsTUFBTSxhQUFhLE9BQU8sT0FBTyxHQUFHLFNBQUEsQ0FBQTtFQUNwQyxNQUFNLGFBQWEsTUFBTSxLQUFLLFNBQUEsQ0FBQTtFQUM5QixNQUFNLGFBQWEsVUFBVSxLQUFBO0VBQzdCLE1BQU0sYUFBYSxnQkFBZ0IsR0FBQTtFQUduQyxNQUFNLFFBQVEsaUJBQWlCLE1BQUE7RUFDL0IsTUFBTSxhQUFhLE1BQU0sR0FBQTtFQUN6QixNQUFNLGFBQWEsT0FBTyxPQUFPLEdBQUcsU0FBQSxDQUFBO0VBQ3BDLE1BQU0sYUFBYSxNQUFNLEtBQUssU0FBQSxDQUFBO0VBQzlCLE1BQU0sYUFBYSxPQUFPLE9BQU8sR0FBRyxTQUFBLENBQUE7RUFDcEMsTUFBTSxhQUFhLFVBQVUsS0FBQTtFQUM3QixNQUFNLGFBQWEsZ0JBQWdCLEdBQUE7RUFFbkMsWUFBWSxLQUFLLEtBQUE7RUFDakIsWUFBWSxLQUFLLEtBQUE7RUFFakIsWUFBWSxPQUFPLEdBQUE7RUFFbkIsT0FBTyxFQUFFLElBQUk7Q0FDZjtDQUVBLFNBQWdCLGFBQWEsT0FBQTtFQUMzQixNQUFNLElBQUksTUFBTSxVQUFVLFdBQVc7Q0FDdkM7Q0FFQSxTQUFnQixhQUFhLE9BQUE7RUFDM0IsTUFBTSxJQUFJLE1BQU0sVUFBVSxXQUFXO0NBQ3ZDO0NBRUEsU0FBZ0IsZ0JBQWdCLE9BQUE7RUFDOUIsTUFBTSxJQUFJLE9BQUE7Q0FDWjs7O0NDekRBLFNBQWdCLHFCQUFBO0VBQ2QsTUFBTSxVQUFVLFVBQUE7RUFDaEIsUUFBUSxZQUFZLFNBQVM7RUFDN0IsUUFBUSxNQUFNLFVBQVU7Ozs7Ozs7Ozs7RUFXeEIsTUFBTSxZQUFZLGNBQWMsWUFBWSxTQUFTO0VBQ3JELElBQUksV0FDRixZQUFZLFdBQVcsT0FBQTtFQUd6QixPQUFPLEVBQUUsUUFBUTtDQUNuQjtDQVVBLFNBQWdCLG9CQUFvQixPQUFBO0VBQ2xDLE1BQU0sUUFBUSxPQUFBO0NBQ2hCOzs7Q0N2Q0EsU0FBZ0IscUJBQUE7RUFDZCxPQUFPLE9BQU87Q0FDaEI7Q0FFQSxTQUFnQiw4QkFBQTtFQUNkLE9BQU87Q0FDVDtDQUVBLFNBQWdCLFFBQU0sV0FBNEIsV0FBQTtFQUNoRCxVQUFVLE1BQU0sU0FBQTtDQUNsQjtDQUVBLFNBQWdCLE9BQU8sV0FBQTtFQUNyQixVQUFVLE9BQUE7Q0FDWjtDQUVBLFNBQWdCLGdCQUNkLGdCQUNBLE1BQUE7RUFFQSxPQUFPLElBQUksZUFBZSxJQUFBO0NBQzVCOzs7Q0NqQkEsU0FBZ0IsTUFBTSxNQUFjLE1BQUE7RUFDbEMsTUFBTSxZQUFZLG1CQUFVO0VBRTVCLE1BQU0sWUFBWSxnQkFESyw0QkFDcUIsR0FBZ0IsSUFBQTtFQUM1RCxVQUFVLE9BQU87RUFDakIsUUFBZ0IsV0FBVyxTQUFBO0NBQzdCO0NBRUEsU0FBZ0IsZUFBQTtFQUVkLE9BRGtCLG1CQUNELENBQUE7Q0FDbkI7OztDQ1JBLElBQU0sUUFBUTtDQUVkLFNBQWdCLGVBQ2QsVUFDQSxZQUNBLGFBQUE7RUFJQSxJQUFJLE1BQU0sS0FBSyxPQUFPLFNBQVMsSUFBSSxhQUFhLEtBQUssVUFBQTtFQUNyRCxJQUFJLE1BQU0sS0FBSyxPQUFPLFNBQVMsSUFBSSxhQUFhLEtBQUssVUFBQTtFQUdyRCxNQUFNLEtBQUssSUFBSSxHQUFHLEtBQUssSUFBSSxHQUFHLEdBQUEsQ0FBQTtFQUM5QixNQUFNLEtBQUssSUFBSSxHQUFHLEtBQUssSUFBSSxHQUFHLEdBQUEsQ0FBQTtFQUs5QixJQUFJO0VBQ0osSUFBSTtFQUVKLElBQUksZ0JBQWdCLFlBQVksT0FBTztHQUNyQyxPQUFPLE1BQU07R0FDYixPQUFPLElBQUk7RUFDYixPQUFPO0dBQ0wsT0FBTyxNQUFNLElBQUk7R0FDakIsT0FBTyxNQUFNO0VBQ2Y7RUFFQSxPQUFPLEdBQUcsT0FBTztDQUNuQjs7O0NDakNBLFNBQWdCLGlCQUFBO0VBRWQsT0FEZSxjQUFjLFlBQVksTUFDbEMsR0FBUSxVQUFVLFNBQVMsU0FBUyxLQUFLLElBQUksWUFBWSxRQUFRLFlBQVk7Q0FDdEY7Q0FFQSxTQUFnQixxQkFBQTtFQUNkLE1BQU0sUUFBUSxjQUFjLFlBQVksZUFBZTtFQUN2RCxJQUFJLENBQUMsT0FBTyxPQUFPLENBQUE7RUFJbkIsTUFBTSxhQUFhLE1BQWEsTUFBTSxRQUFRLE1BQU0sc0JBQUE7RUFJcEQsTUFBTSxjQUhhLGFBQ2YsT0FBTyxXQUFXLFdBQVcsRUFBRSxJQUMvQixzQkFBc0IsS0FBQSxFQUFPLFNBQ0Q7RUFDaEMsTUFBTSxjQUFjLGVBQUE7RUFFcEIsTUFBTSxTQUFTLE1BQU0saUJBQWlCLFlBQVksS0FBSztFQUN2RCxNQUFNLFlBQTZCLENBQUE7RUFFbkMsS0FBSyxNQUFNLFNBQVMsUUFBUTtHQUUxQixNQUFNLFVBQVUsTUFBTSxVQUFVLE1BQU0sR0FBQTtHQUN0QyxNQUFNLFdBQVcsUUFBUTtHQUN6QixNQUFNLFVBQVUsUUFBUTtHQUd4QixNQUFNLFFBQVEsYUFBYSxVQUFVLFlBQVksUUFBUSxZQUFZO0dBQ3JFLE1BQU0sT0FBTztHQUliLE1BQU0sUUFEYSxNQUFzQixNQUFNLFVBQ3ZCLE1BQU0sMkNBQUE7R0FDOUIsSUFBSSxDQUFDLE9BQU87R0FNWixNQUFNLFNBQVMsZUFBZTtJQUFFLEdBSHRCLE9BQU8sV0FBVyxNQUFNLEVBQUUsSUFBSSxhQUFhO0lBR2xCLEdBRnpCLE9BQU8sV0FBVyxNQUFNLEVBQUUsSUFBSSxhQUFhO0dBRWhCLEdBQUcsWUFBWSxXQUFBO0dBQ3BELFVBQVUsS0FBSztJQUFFO0lBQVE7SUFBTztHQUFLLENBQUE7RUFDdkM7RUFFQSxPQUFPO0NBQ1Q7Q0FFQSxTQUFnQixlQUFlLFVBQUE7RUFDN0IsT0FBTyxJQUFJLFNBQVMsWUFBQTtHQUNsQixNQUFNLFVBQVUsY0FBYyxRQUFBO0dBQzlCLElBQUksU0FBUztJQUNYLFFBQVEsT0FBQTtJQUNSO0dBQ0Y7R0FFQSxNQUFNLFdBQVcsSUFBSSx1QkFBQTtJQUNuQixNQUFNLFVBQVUsY0FBYyxRQUFBO0lBQzlCLElBQUksU0FBUztLQUNYLFNBQVMsV0FBQTtLQUNULFFBQVEsT0FBQTtJQUNWO0dBQ0YsQ0FBQTtHQUVBLFNBQVMsUUFBUSxTQUFTLE1BQU07SUFDOUIsV0FBVztJQUNYLFNBQVM7R0FDWCxDQUFBO0VBQ0YsQ0FBQTtDQUNGOzs7Q0NqRUEsU0FBZ0IsZUFBZSxRQUF5QixVQUFBO0VBQ3RELE9BQU8sT0FBTyxRQUFRLFVBQUE7R0FFcEIsSUFBSSxDQUFDLE1BQU0sVUFBVSxNQUFNLE9BQU8sU0FBUyxHQUN6QyxNQUFNLElBQUksTUFBTSwwQkFBMEIsTUFBTSxRQUFRO0dBRzFELE1BQU0sT0FBTyxNQUFNLE9BQU87R0FDMUIsTUFBTSxPQUFPLE9BQU8sU0FBUyxNQUFNLE9BQU8sSUFBSSxFQUFBO0dBRzlDLElBQUksT0FBTyxPQUFPLE9BQU8sS0FDdkIsTUFBTSxJQUFJLE1BQU0saUJBQWlCLE1BQU07R0FFekMsSUFBSSxPQUFPLE1BQU0sSUFBQSxLQUFTLE9BQU8sS0FBSyxPQUFPLEdBQzNDLE1BQU0sSUFBSSxNQUFNLGlCQUFpQixNQUFNO0dBSXpDLE1BQU0sYUFBYSxRQUFRO0dBRzNCLE1BQU0sZUFBZSxRQUFRLEtBQUssUUFBUTtHQUcxQyxJQUFJLGFBQWEsU0FBUyxZQUFZLE9BQU8sY0FBYztHQUMzRCxJQUFJLGFBQWEsU0FBUyxhQUFhLE9BQU8sQ0FBQyxjQUFjO0dBQzdELElBQUksYUFBYSxTQUFTLFlBQVksT0FBTyxjQUFjLENBQUM7R0FDNUQsSUFBSSxhQUFhLFNBQVMsYUFBYSxPQUFPLENBQUMsY0FBYyxDQUFDO0dBRTlELE9BQU87RUFDVCxDQUFBO0NBQ0Y7Q0FRQSxTQUFnQixvQkFBb0IsUUFBQTtFQUNsQyxNQUFNLHlCQUFTLElBQUksSUFBQTtFQUVuQixLQUFLLE1BQU0sU0FBUyxRQUFRO0dBRTFCLElBQUksQ0FBQyxNQUFNLFFBQ1QsTUFBTSxJQUFJLE1BQU0sK0JBQUE7R0FFbEIsSUFBSSxDQUFDLE1BQU0sT0FDVCxNQUFNLElBQUksTUFBTSw4QkFBQTtHQUVsQixJQUFJLENBQUMsTUFBTSxNQUNULE1BQU0sSUFBSSxNQUFNLDZCQUFBO0dBR2xCLE1BQU0sTUFBTSxHQUFHLE1BQU0sTUFBTSxHQUFHLE1BQU07R0FFcEMsSUFBSSxDQUFDLE9BQU8sSUFBSSxHQUFBLEdBQ2QsT0FBTyxJQUFJLEtBQUs7SUFDZCxPQUFPLE1BQU07SUFDYixNQUFNLE1BQU07SUFDWixTQUFTLENBQUE7R0FDWCxDQUFBO0dBR0YsT0FBTyxJQUFJLEdBQUEsR0FBTSxRQUFRLEtBQUssTUFBTSxNQUFNO0VBQzVDO0VBR0EsT0FBTyxNQUFNLEtBQUssT0FBTyxPQUFBLENBQUEsRUFBVSxNQUFNLEdBQUcsTUFBQTtHQUMxQyxJQUFJLEVBQUUsVUFBVSxFQUFFLE9BQ2hCLE9BQU8sRUFBRSxVQUFVLFlBQVksUUFBUSxLQUFLO0dBRTlDLE9BQU8sRUFBRSxLQUFLLGNBQWMsRUFBRSxJQUFJO0VBQ3BDLENBQUE7Q0FDRjs7O0NDakZBLFNBQWdCLHFCQUFxQixRQUFBO0VBQ25DLElBQUksT0FBTyxXQUFXLEdBQUcsT0FBTztFQUVoQyxNQUFNLFNBQVMsb0JBQW9CLE1BQUE7RUFDbkMsTUFBTSxZQUFzQixDQUFBO0VBRTVCLEtBQUssTUFBTSxTQUFTLFFBQVE7R0FDMUIsTUFBTSxZQUFZLE1BQU07R0FDeEIsTUFBTSxXQUFXLE1BQU0sUUFBUSxTQUFTLElBQUksR0FBRyxNQUFNLEtBQUssS0FBSyxNQUFNO0dBRXJFLElBQUksTUFBTSxRQUFRLFNBQVMsR0FBRztJQUU1QixNQUFNLFVBQVUsTUFBTSxRQUFRLEtBQUssSUFBQTtJQUNuQyxVQUFVLEtBQUssR0FBRyxVQUFVLEdBQUcsU0FBUyxNQUFNLFNBQVM7R0FDekQsT0FFRSxVQUFVLEtBQUssR0FBRyxNQUFNLFFBQVEsR0FBRyxHQUFHLFVBQVUsR0FBRyxNQUFNLE1BQU07RUFFbkU7RUFFQSxPQUFPLEdBQUcsVUFBVSxLQUFLLElBQUEsRUFBTTtDQUNqQztDQUVBLFNBQWdCLHNCQUFzQixRQUFBO0VBQ3BDLE9BQU8scUJBQXFCLE1BQUE7Q0FDOUI7Q0FFQSxTQUFnQixrQkFBa0IsUUFBeUIsT0FBQTtFQUV6RCxPQUFPLHFCQURVLE9BQU8sUUFBUSxNQUFNLEVBQUUsVUFBVSxLQUN0QixDQUFBO0NBQzlCOzs7OztJQzVCQSxTQUFnQixRQUFRLEtBQUE7RUFDdEIsT0FBTyxhQUFhLFFBQVEsR0FBQTtDQUM5QjtDQUVBLFNBQWdCLFFBQVEsS0FBYSxPQUFBO0VBQ25DLGFBQWEsUUFBUSxLQUFLLEtBQUE7Q0FDNUI7OztDQ1JBLElBQWEsa0JBQTRCO0VBQ3ZDLFdBQVc7RUFDWCxtQkFBbUI7RUFDbkIsaUJBQWlCO0VBQ2pCLG9CQUFvQjtFQUNwQixxQkFBcUI7RUFDckIsVUFBVTtFQUNWLFdBQVc7RUFDWCxZQUFZO0VBQ1osTUFBTTtFQUNOLGVBQWU7RUFDZixxQkFBcUI7RUFDckIsa0JBQWtCO0VBQ2xCLGVBQWU7RUFDZixlQUFlO0NBQ2pCOzs7Q0NaQSxJQUFNLGNBQWM7Q0FFcEIsSUFBYSxXQUFXO0VBQ3RCLFdBQVcsSUFBTyxnQkFBZ0IsU0FBUztFQUMzQyxtQkFBbUIsSUFBTyxnQkFBZ0IsaUJBQWlCO0VBQzNELGlCQUFpQixJQUFPLGdCQUFnQixlQUFlO0VBQ3ZELG9CQUFvQixJQUFPLGdCQUFnQixrQkFBa0I7RUFDN0QscUJBQXFCLElBQU8sZ0JBQWdCLG1CQUFtQjtFQUMvRCxVQUFVLElBQU8sZ0JBQWdCLFFBQVE7RUFDekMsV0FBVyxJQUFPLGdCQUFnQixTQUFTO0VBQzNDLFlBQVksSUFBTyxnQkFBZ0IsVUFBVTtFQUM3QyxNQUFNLElBQU8sZ0JBQWdCLElBQUk7RUFDakMsZUFBZSxJQUFPLGdCQUFnQixhQUFhO0VBQ25ELHFCQUFxQixJQUFPLGdCQUFnQixtQkFBbUI7RUFDL0Qsa0JBQWtCLElBQU8sZ0JBQWdCLGdCQUFnQjtFQUN6RCxlQUFlLElBQU8sZ0JBQWdCLGFBQWE7RUFDbkQsZUFBZSxJQUFPLGdCQUFnQixhQUFhO0NBQ3JEO0NBRUEsU0FBZ0IsZUFBQTtFQUNkLE1BQU0sU0FBUyxRQUFnQixXQUFBO0VBQy9CLElBQUksQ0FBQyxRQUFRO0VBRWIsTUFBTSxPQUFPLEtBQUssTUFBTSxNQUFBO0VBQ3hCLEtBQUssTUFBTSxPQUFPLE9BQU8sS0FBSyxJQUFBLEdBQU87R0FDbkMsTUFBTSxhQUFhO0dBQ25CLElBQUksU0FBUyxhQUVYLFNBQVMsWUFBWSxRQUFRLEtBQUs7RUFFdEM7Q0FDRjtDQUVBLFNBQWdCLGVBQUE7RUFDZCxNQUFNLE9BQTBCLENBQUM7RUFDakMsS0FBSyxNQUFNLE9BQU8sT0FBTyxLQUFLLFFBQUEsR0FBVztHQUN2QyxNQUFNLGFBQWE7R0FFbkIsS0FBSyxjQUFjLFNBQVMsWUFBWTtFQUMxQztFQUNBLFFBQWdCLGFBQWEsS0FBSyxVQUFVLElBQUEsQ0FBQTtDQUM5QztDQUdBLFNBQWdCLGdCQUFBO0VBQ2QsVUFBQTtHQUNFLEtBQUssTUFBTSxLQUFLLE9BQU8sT0FBTyxRQUFBLEdBQzVCLEVBQUU7R0FFSixhQUFBO0VBQ0YsQ0FBQTtDQUNGOzs7Q0NqREEsU0FBZ0Isb0JBQW9CLFNBQUE7RUFDbEMsSUFBSSxZQUFZLGNBQWMsTUFBTTtHQUNsQyxhQUFBO0dBQ0E7RUFDRjtFQUVBLE1BQU0sU0FBUyxtQkFBQTtFQUVmLElBQUksWUFBWSxjQUFjLEtBQUs7R0FFakMsTUFEYSxzQkFBc0IsTUFDN0IsR0FBTSxTQUFTLFVBQVUsS0FBSztHQUNwQztFQUNGO0VBRUEsSUFBSSxZQUFZLGNBQWMsU0FBUyxZQUFZLGNBQWMsT0FBTztHQUd0RSxNQURhLGtCQUFrQixRQURqQixZQUFZLGNBQWMsUUFBUSxZQUFZLFFBQVEsWUFBWSxLQUUxRSxHQUFNLFNBQVMsVUFBVSxLQUFLO0dBQ3BDO0VBQ0Y7RUFNQSxNQURhLHFCQURJLGVBQWUsUUFBUSxPQUNOLENBQzVCLEdBQU0sU0FBUyxVQUFVLEtBQUs7Q0FDdEM7OztDQ3pCQSxTQUFnQix3QkFBQTtFQUNkLE1BQU0sUUFBUSxjQUFjLFlBQVksY0FBYztFQUN0RCxJQUFJLENBQUMsT0FBTztFQUVaLE1BQU0sZUFBZSxNQUFBO0dBQ25CLE1BQU0sU0FBUyxFQUFFO0dBQ2pCLE1BQU0sUUFBUSxPQUFPO0dBR3JCLE1BQU0sVUFBVSxxQkFBcUIsSUFBSSxLQUFBO0dBQ3pDLElBQUksU0FBUztJQUNYLG9CQUFvQixPQUFBO0lBQ3BCLE9BQU8sUUFBUTtJQUNmO0dBQ0Y7R0FHQSxJQUFJLE1BQU0sV0FBVyxHQUFBLEdBRW5CO0VBRUo7RUFFQSxNQUFNLGlCQUFpQixTQUFTLFdBQUE7RUFHaEMsTUFBTSxpQ0FBQTtHQUNKLE1BQU0sb0JBQW9CLFNBQVMsV0FBQTtFQUNyQztDQUNGO0NBRUEsU0FBZ0IsMkJBQUE7RUFDZCxNQUFNLFFBQVEsY0FBYyxZQUFZLGNBQWM7RUFDdEQsSUFBSSxPQUFPLDBCQUEwQjtHQUNuQyxNQUFNLHlCQUFBO0dBQ04sTUFBTSwyQkFBMkIsS0FBQTtFQUNuQztDQUNGOzs7Q0M3Q0EsSUFBSSxHQUFFLEdBQUVDLEtBQUlDLEtBQUUsR0FBRUMsS0FBRSxHQUFFQyxLQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFJLElBQUUsQ0FBQyxHQUFFLElBQUUsQ0FBQyxHQUFFLElBQUUscUVBQW9FLElBQUUsTUFBTTtDQUFRLFNBQVMsRUFBRSxHQUFFLEdBQUU7RUFBQyxLQUFJLElBQUksS0FBSyxHQUFFLEVBQUUsS0FBRyxFQUFFO0VBQUcsT0FBTztDQUFDO0NBQUMsU0FBUyxFQUFFLEdBQUU7RUFBQyxLQUFHLEVBQUUsY0FBWSxFQUFFLFdBQVcsWUFBWSxDQUFDO0NBQUM7Q0FBQyxTQUFTLEVBQUUsR0FBRSxHQUFFLEdBQUU7RUFBQyxJQUFJLEdBQUUsR0FBRSxHQUFFLElBQUUsQ0FBQztFQUFFLEtBQUksS0FBSyxHQUFFLFNBQU8sSUFBRSxJQUFFLEVBQUUsS0FBRyxTQUFPLElBQUUsSUFBRSxFQUFFLEtBQUcsRUFBRSxLQUFHLEVBQUU7RUFBRyxJQUFHLFVBQVUsU0FBTyxNQUFJLEVBQUUsV0FBUyxVQUFVLFNBQU8sSUFBRSxFQUFFLEtBQUssV0FBVSxDQUFDLElBQUUsSUFBRyxjQUFZLE9BQU8sS0FBRyxRQUFNLEVBQUUsY0FBYSxLQUFJLEtBQUssRUFBRSxjQUFhLEtBQUssTUFBSSxFQUFFLE9BQUssRUFBRSxLQUFHLEVBQUUsYUFBYTtFQUFJLE9BQU8sRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLElBQUk7Q0FBQztDQUFDLFNBQVMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7RUFBQyxJQUFJLElBQUU7R0FBQyxNQUFLO0dBQUUsT0FBTTtHQUFFLEtBQUk7R0FBRSxLQUFJO0dBQUUsS0FBSTtHQUFLLElBQUc7R0FBSyxLQUFJO0dBQUUsS0FBSTtHQUFLLEtBQUk7R0FBSyxhQUFZLEtBQUs7R0FBRSxLQUFJLFFBQU0sSUFBRSxFQUFFSCxNQUFFO0dBQUUsS0FBSTtHQUFHLEtBQUk7RUFBQztFQUFFLE9BQU8sUUFBTSxLQUFHLFFBQU0sRUFBRSxTQUFPLEVBQUUsTUFBTSxDQUFDLEdBQUU7Q0FBQztDQUFtQyxTQUFTLEVBQUUsR0FBRTtFQUFDLE9BQU8sRUFBRTtDQUFRO0NBQUMsU0FBUyxFQUFFLEdBQUUsR0FBRTtFQUFDLEtBQUssUUFBTSxHQUFFLEtBQUssVUFBUTtDQUFDO0NBQUMsU0FBUyxFQUFFLEdBQUUsR0FBRTtFQUFDLElBQUcsUUFBTSxHQUFFLE9BQU8sRUFBRSxLQUFHLEVBQUUsRUFBRSxJQUFHLEVBQUUsTUFBSSxDQUFDLElBQUU7RUFBSyxLQUFJLElBQUksR0FBRSxJQUFFLEVBQUUsSUFBSSxRQUFPLEtBQUksSUFBRyxTQUFPLElBQUUsRUFBRSxJQUFJLE9BQUssUUFBTSxFQUFFLEtBQUksT0FBTyxFQUFFO0VBQUksT0FBTSxjQUFZLE9BQU8sRUFBRSxPQUFLLEVBQUUsQ0FBQyxJQUFFO0NBQUk7Q0FBQyxTQUFTLEVBQUUsR0FBRTtFQUFDLElBQUcsRUFBRSxPQUFLLEVBQUUsS0FBSTtHQUFDLElBQUksSUFBRSxFQUFFLEtBQUksSUFBRSxFQUFFLEtBQUksSUFBRSxDQUFDLEdBQUUsSUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLENBQUMsR0FBRSxDQUFDO0dBQUUsRUFBRSxNQUFJLEVBQUUsTUFBSSxHQUFFLEVBQUUsU0FBTyxFQUFFLE1BQU0sQ0FBQyxHQUFFLEVBQUUsRUFBRSxLQUFJLEdBQUUsR0FBRSxFQUFFLEtBQUksRUFBRSxJQUFJLGNBQWEsS0FBRyxFQUFFLE1BQUksQ0FBQyxDQUFDLElBQUUsTUFBSyxHQUFFLFFBQU0sSUFBRSxFQUFFLENBQUMsSUFBRSxHQUFFLENBQUMsRUFBRSxLQUFHLEVBQUUsTUFBSyxDQUFDLEdBQUUsRUFBRSxNQUFJLEVBQUUsS0FBSSxFQUFFLEdBQUcsSUFBSSxFQUFFLE9BQUssR0FBRSxFQUFFLEdBQUUsR0FBRSxDQUFDLEdBQUUsRUFBRSxNQUFJLEVBQUUsS0FBRyxNQUFLLEVBQUUsT0FBSyxLQUFHLEVBQUUsQ0FBQztFQUFDO0NBQUM7Q0FBQyxTQUFTLEVBQUUsR0FBRTtFQUFDLElBQUcsU0FBTyxJQUFFLEVBQUUsT0FBSyxRQUFNLEVBQUUsS0FBSSxPQUFPLEVBQUUsTUFBSSxFQUFFLElBQUksT0FBSyxNQUFLLEVBQUUsSUFBSSxLQUFLLFNBQVMsR0FBRTtHQUFDLElBQUcsUUFBTSxLQUFHLFFBQU0sRUFBRSxLQUFJLE9BQU8sRUFBRSxNQUFJLEVBQUUsSUFBSSxPQUFLLEVBQUU7RUFBRyxDQUFDLEdBQUUsRUFBRSxDQUFDO0NBQUM7Q0FBQyxTQUFTLEVBQUUsR0FBRTtFQUFDLENBQUMsQ0FBQyxFQUFFLFFBQU0sRUFBRSxNQUFJLENBQUMsTUFBSUMsSUFBRSxLQUFLLENBQUMsS0FBRyxDQUFDLEVBQUUsU0FBTyxLQUFHLEVBQUUsd0JBQXNCLElBQUUsRUFBRSxzQkFBb0JDLEtBQUcsQ0FBQztDQUFDO0NBQUMsU0FBUyxJQUFHO0VBQUMsSUFBRztHQUFDLEtBQUksSUFBSSxHQUFFLElBQUUsR0FBRUQsSUFBRSxTQUFRLElBQUUsU0FBTyxLQUFHQSxJQUFFLEtBQUssQ0FBQyxHQUFFLElBQUVBLElBQUUsTUFBTSxHQUFFLElBQUVBLElBQUUsUUFBTyxFQUFFLENBQUM7RUFBQyxVQUFRO0dBQUMsSUFBRSxTQUFPLEVBQUUsTUFBSTtFQUFDO0NBQUM7Q0FBQyxTQUFTLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0VBQUMsSUFBSSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLElBQUUsS0FBRyxFQUFFLE9BQUssR0FBRSxJQUFFLEVBQUU7RUFBTyxLQUFJLElBQUUsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLEtBQUksU0FBTyxJQUFFLEVBQUUsSUFBSSxRQUFNLElBQUUsTUFBSSxFQUFFLE9BQUssRUFBRSxFQUFFLFFBQU0sR0FBRSxFQUFFLE1BQUksR0FBRSxJQUFFLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxLQUFJLEVBQUUsT0FBSyxFQUFFLE9BQUssRUFBRSxRQUFNLEVBQUUsT0FBSyxFQUFFLEVBQUUsS0FBSSxNQUFLLENBQUMsR0FBRSxFQUFFLEtBQUssRUFBRSxLQUFJLEVBQUUsT0FBSyxHQUFFLENBQUMsSUFBRyxRQUFNLEtBQUcsUUFBTSxNQUFJLElBQUUsS0FBSSxJQUFFLENBQUMsRUFBRSxJQUFFLEVBQUUsU0FBTyxFQUFFLFFBQU0sRUFBRSxPQUFLLElBQUUsRUFBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLEdBQUUsS0FBRyxFQUFFLFFBQU0sRUFBRSxNQUFJLFNBQU8sY0FBWSxPQUFPLEVBQUUsUUFBTSxLQUFLLE1BQUksSUFBRSxJQUFFLElBQUUsTUFBSSxJQUFFLEVBQUUsY0FBYSxFQUFFLE9BQUs7RUFBSSxPQUFPLEVBQUUsTUFBSSxHQUFFO0NBQUM7Q0FBQyxTQUFTLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0VBQUMsSUFBSSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsSUFBRSxFQUFFLFFBQU8sSUFBRSxHQUFFLElBQUU7RUFBRSxLQUFJLEVBQUUsTUFBSSxJQUFJLE1BQU0sQ0FBQyxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsS0FBSSxTQUFPLElBQUUsRUFBRSxPQUFLLGFBQVcsT0FBTyxLQUFHLGNBQVksT0FBTyxLQUFHLFlBQVUsT0FBTyxLQUFHLFlBQVUsT0FBTyxLQUFHLFlBQVUsT0FBTyxLQUFHLEVBQUUsZUFBYSxTQUFPLElBQUUsRUFBRSxJQUFJLEtBQUcsRUFBRSxNQUFLLEdBQUUsTUFBSyxNQUFLLElBQUksSUFBRSxFQUFFLENBQUMsSUFBRSxJQUFFLEVBQUUsSUFBSSxLQUFHLEVBQUUsR0FBRSxFQUFDLFVBQVMsRUFBQyxHQUFFLE1BQUssTUFBSyxJQUFJLElBQUUsS0FBSyxNQUFJLEVBQUUsZUFBYSxFQUFFLE1BQUksSUFBRSxJQUFFLEVBQUUsSUFBSSxLQUFHLEVBQUUsRUFBRSxNQUFLLEVBQUUsT0FBTSxFQUFFLEtBQUksRUFBRSxNQUFJLEVBQUUsTUFBSSxNQUFLLEVBQUUsR0FBRyxJQUFFLEVBQUUsSUFBSSxLQUFHLEdBQUUsSUFBRSxJQUFFLEdBQUUsRUFBRSxLQUFHLEdBQUUsRUFBRSxNQUFJLEVBQUUsTUFBSSxHQUFFLElBQUUsTUFBSyxPQUFLLElBQUUsRUFBRSxNQUFJLEVBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxPQUFLLE1BQUssSUFBRSxFQUFFLFFBQU0sRUFBRSxPQUFLLEtBQUksUUFBTSxLQUFHLFFBQU0sRUFBRSxPQUFLLE1BQUksTUFBSSxJQUFFLElBQUUsTUFBSSxJQUFFLEtBQUcsTUFBSyxjQUFZLE9BQU8sRUFBRSxTQUFPLEVBQUUsT0FBSyxNQUFJLEtBQUcsTUFBSSxLQUFHLElBQUUsSUFBRSxNQUFJLEtBQUcsSUFBRSxJQUFFLE9BQUssSUFBRSxJQUFFLE1BQUksS0FBSSxFQUFFLE9BQUssT0FBSyxFQUFFLElBQUksS0FBRztFQUFLLElBQUcsR0FBRSxLQUFJLElBQUUsR0FBRSxJQUFFLEdBQUUsS0FBSSxTQUFPLElBQUUsRUFBRSxPQUFLLE1BQUksSUFBRSxFQUFFLFNBQU8sRUFBRSxPQUFLLE1BQUksSUFBRSxFQUFFLENBQUMsSUFBRyxFQUFFLEdBQUUsQ0FBQztFQUFHLE9BQU87Q0FBQztDQUFDLFNBQVMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0VBQUMsSUFBSSxHQUFFO0VBQUUsSUFBRyxjQUFZLE9BQU8sRUFBRSxNQUFLO0dBQUMsS0FBSSxJQUFFLEVBQUUsS0FBSSxJQUFFLEdBQUUsS0FBRyxJQUFFLEVBQUUsUUFBTyxLQUFJLEVBQUUsT0FBSyxFQUFFLEdBQUcsS0FBRyxHQUFFLElBQUUsRUFBRSxFQUFFLElBQUcsR0FBRSxHQUFFLENBQUM7R0FBRyxPQUFPO0VBQUM7RUFBQyxFQUFFLE9BQUssTUFBSSxNQUFJLEtBQUcsRUFBRSxRQUFNLENBQUMsRUFBRSxlQUFhLElBQUUsRUFBRSxDQUFDLElBQUcsRUFBRSxhQUFhLEVBQUUsS0FBSSxLQUFHLElBQUksSUFBRyxJQUFFLEVBQUU7RUFBSztHQUFHLElBQUUsS0FBRyxFQUFFO1NBQWtCLFFBQU0sS0FBRyxLQUFHLEVBQUU7RUFBVSxPQUFPO0NBQUM7Q0FBNkcsU0FBUyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7RUFBQyxJQUFJLEdBQUUsR0FBRSxHQUFFLElBQUUsRUFBRSxLQUFJLElBQUUsRUFBRSxNQUFLLElBQUUsRUFBRSxJQUFHLElBQUUsUUFBTSxLQUFHLE1BQUksSUFBRSxFQUFFO0VBQUssSUFBRyxTQUFPLEtBQUcsUUFBTSxLQUFHLEtBQUcsS0FBRyxFQUFFLE9BQUssS0FBRyxFQUFFLE1BQUssT0FBTztFQUFFLElBQUcsS0FBRyxJQUFFLElBQUU7UUFBTyxJQUFFLElBQUUsR0FBRSxJQUFFLElBQUUsR0FBRSxLQUFHLEtBQUcsSUFBRSxFQUFFLFNBQVEsSUFBRyxTQUFPLElBQUUsRUFBRSxJQUFFLEtBQUcsSUFBRSxNQUFJLFNBQU8sTUFBSSxJQUFFLEVBQUUsUUFBTSxLQUFHLEVBQUUsT0FBSyxLQUFHLEVBQUUsTUFBSyxPQUFPO0VBQUE7RUFBRSxPQUFNO0NBQUU7Q0FBQyxTQUFTLEVBQUUsR0FBRSxHQUFFLEdBQUU7RUFBQyxPQUFLLEVBQUUsS0FBRyxFQUFFLFlBQVksR0FBRSxRQUFNLElBQUUsS0FBRyxDQUFDLElBQUUsRUFBRSxLQUFHLFFBQU0sSUFBRSxLQUFHLFlBQVUsT0FBTyxLQUFHLEVBQUUsS0FBSyxDQUFDLElBQUUsSUFBRSxJQUFFO0NBQUk7Q0FBQyxTQUFTLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0VBQUMsSUFBSSxHQUFFO0VBQUUsR0FBRSxJQUFHLFdBQVMsR0FBRSxJQUFHLFlBQVUsT0FBTyxHQUFFLEVBQUUsTUFBTSxVQUFRO09BQU07R0FBQyxJQUFHLFlBQVUsT0FBTyxNQUFJLEVBQUUsTUFBTSxVQUFRLElBQUUsS0FBSSxHQUFFLEtBQUksS0FBSyxHQUFFLEtBQUcsS0FBSyxLQUFHLEVBQUUsRUFBRSxPQUFNLEdBQUUsRUFBRTtHQUFFLElBQUcsR0FBRSxLQUFJLEtBQUssR0FBRSxLQUFHLEVBQUUsTUFBSSxFQUFFLE1BQUksRUFBRSxFQUFFLE9BQU0sR0FBRSxFQUFFLEVBQUU7RUFBQztPQUFNLElBQUcsT0FBSyxFQUFFLE1BQUksT0FBSyxFQUFFLElBQUcsSUFBRSxNQUFJLElBQUUsRUFBRSxRQUFRLEdBQUUsSUFBSSxJQUFHLElBQUUsRUFBRSxZQUFZLEdBQUUsSUFBRSxLQUFLLEtBQUcsZ0JBQWMsS0FBRyxlQUFhLElBQUUsRUFBRSxNQUFNLENBQUMsSUFBRSxFQUFFLE1BQU0sQ0FBQyxHQUFFLEVBQUUsTUFBSSxFQUFFLElBQUUsQ0FBQyxJQUFHLEVBQUUsRUFBRSxJQUFFLEtBQUcsR0FBRSxJQUFFLElBQUUsRUFBRSxLQUFHLEVBQUUsTUFBSSxFQUFFLEtBQUcsR0FBRSxFQUFFLGlCQUFpQixHQUFFLElBQUUsSUFBRSxHQUFFLENBQUMsS0FBRyxFQUFFLG9CQUFvQixHQUFFLElBQUUsSUFBRSxHQUFFLENBQUM7T0FBTTtHQUFDLElBQUcsZ0NBQThCLEdBQUUsSUFBRSxFQUFFLFFBQVEsZUFBYyxHQUFHLEVBQUUsUUFBUSxVQUFTLEdBQUc7UUFBTyxJQUFHLFdBQVMsS0FBRyxZQUFVLEtBQUcsVUFBUSxLQUFHLFVBQVEsS0FBRyxVQUFRLEtBQUcsY0FBWSxLQUFHLGNBQVksS0FBRyxhQUFXLEtBQUcsYUFBVyxLQUFHLFVBQVEsS0FBRyxhQUFXLEtBQUcsS0FBSyxHQUFFLElBQUc7SUFBQyxFQUFFLEtBQUcsUUFBTSxJQUFFLEtBQUc7SUFBRSxNQUFNO0dBQUMsU0FBTyxHQUFFLENBQUM7R0FBQyxjQUFZLE9BQU8sTUFBSSxRQUFNLEtBQUcsQ0FBQyxNQUFJLEtBQUcsT0FBSyxFQUFFLEtBQUcsRUFBRSxnQkFBZ0IsQ0FBQyxJQUFFLEVBQUUsYUFBYSxHQUFFLGFBQVcsS0FBRyxLQUFHLElBQUUsS0FBRyxDQUFDO0VBQUU7Q0FBQztDQUFDLFNBQVMsRUFBRSxHQUFFO0VBQUMsT0FBTyxTQUFTLEdBQUU7R0FBQyxJQUFHLEtBQUssR0FBRTtJQUFDLElBQUksSUFBRSxLQUFLLEVBQUUsRUFBRSxPQUFLO0lBQUcsSUFBRyxRQUFNLEVBQUUsSUFBRyxFQUFFLEtBQUc7U0FBUyxJQUFHLEVBQUUsS0FBRyxFQUFFLElBQUc7SUFBTyxPQUFPLEVBQUUsRUFBRSxRQUFNLEVBQUUsTUFBTSxDQUFDLElBQUUsQ0FBQztHQUFDO0VBQUM7Q0FBQztDQUFDLFNBQVMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0VBQUMsSUFBSSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxJQUFFLEVBQUU7RUFBSyxJQUFHLEtBQUssTUFBSSxFQUFFLGFBQVksT0FBTztFQUFLLE1BQUksRUFBRSxRQUFNLElBQUUsQ0FBQyxFQUFFLEtBQUcsRUFBRSxNQUFLLElBQUUsQ0FBQyxJQUFFLEVBQUUsTUFBSSxFQUFFLEdBQUcsS0FBSSxJQUFFLEVBQUUsUUFBTSxFQUFFLENBQUM7RUFBRSxHQUFFLElBQUcsY0FBWSxPQUFPLEdBQUUsSUFBRztHQUFDLElBQUcsSUFBRSxFQUFFLE9BQU0sSUFBRSxFQUFFLGFBQVcsRUFBRSxVQUFVLFFBQU8sS0FBRyxJQUFFLEVBQUUsZ0JBQWMsRUFBRSxFQUFFLE1BQUssSUFBRSxJQUFFLElBQUUsRUFBRSxNQUFNLFFBQU0sRUFBRSxLQUFHLEdBQUUs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MEIsSUFBRSxFQUFFLHdCQUF3QixHQUFFLENBQUMsSUFBRyxJQUFFLFFBQU0sS0FBRyxFQUFFLFNBQU8sS0FBRyxRQUFNLEVBQUUsTUFBSSxFQUFFLEVBQUUsTUFBTSxRQUFRLElBQUUsR0FBRSxJQUFFLEVBQUUsR0FBRSxFQUFFLENBQUMsSUFBRSxJQUFFLENBQUMsQ0FBQyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLEdBQUUsRUFBRSxPQUFLLEVBQUUsS0FBSSxFQUFFLE9BQUssTUFBSyxFQUFFLElBQUksVUFBUSxFQUFFLEtBQUssQ0FBQyxHQUFFLE1BQUksRUFBRSxNQUFJLEVBQUUsS0FBRztFQUFLLFNBQU8sR0FBRTtHQUFDLElBQUcsRUFBRSxNQUFJLE1BQUssS0FBRyxRQUFNLEdBQUUsSUFBRyxFQUFFLE1BQUs7SUFBQyxLQUFJLEVBQUUsT0FBSyxJQUFFLE1BQUksS0FBSSxLQUFHLEtBQUcsRUFBRSxZQUFVLEVBQUUsY0FBYSxJQUFFLEVBQUU7SUFBWSxFQUFFLEVBQUUsUUFBUSxDQUFDLEtBQUcsTUFBSyxFQUFFLE1BQUk7R0FBQyxPQUFLO0lBQUMsS0FBSSxJQUFFLEVBQUUsUUFBTyxNQUFLLEVBQUUsRUFBRSxFQUFFO0lBQUUsRUFBRSxDQUFDO0dBQUM7UUFBTSxFQUFFLE1BQUksRUFBRSxLQUFJLEVBQUUsTUFBSSxFQUFFLEtBQUksRUFBRSxRQUFNLEVBQUUsQ0FBQztHQUFFLEVBQUUsSUFBSSxHQUFFLEdBQUUsQ0FBQztFQUFDO09BQU0sUUFBTSxLQUFHLEVBQUUsT0FBSyxFQUFFLE9BQUssRUFBRSxNQUFJLEVBQUUsS0FBSSxFQUFFLE1BQUksRUFBRSxPQUFLLElBQUUsRUFBRSxNQUFJLEVBQUUsRUFBRSxLQUFJLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztFQUFFLFFBQU8sSUFBRSxFQUFFLFdBQVMsRUFBRSxDQUFDLEdBQUUsTUFBSSxFQUFFLE1BQUksS0FBSyxJQUFFO0NBQUM7Q0FBQyxTQUFTLEVBQUUs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