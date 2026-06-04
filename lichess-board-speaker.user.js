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
	//#region src/pure/coordinates.ts
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGljaGVzcy1ib2FyZC1zcGVha2VyLnVzZXIuanMiLCJuYW1lcyI6WyJpIiwidCIsInMiLCJjIiwiaCIsInciLCJyIiwibyIsImYiLCJ2IiwidSIsImUiLCJkIiwiYSIsImwiLCJqIiwieSIsIl8iLCJiIiwicCIsIlMiLCJtIiwieCIsIkUiLCJ1IiwiaSIsIm8iLCJmIiwibCIsInIiXSwic291cmNlcyI6WyJub2RlX21vZHVsZXMvQHByZWFjdC9zaWduYWxzLWNvcmUvZGlzdC9zaWduYWxzLWNvcmUubW9kdWxlLmpzIiwic3JjL2NvbnN0YW50cy9jaGVzcy50cyIsInNyYy9jb25zdGFudHMvY29tbWFuZHMudHMiLCJzcmMvY29uc3RhbnRzL2RvbS50cyIsInNyYy9wbGF0Zm9ybS9kb20udHMiLCJzcmMvYWRhcHRlcnMtb3ZlcmxheXMvZGl2aWRlcnMudHMiLCJzcmMvYWRhcHRlcnMtb3ZlcmxheXMvZmxhc2gudHMiLCJzcmMvcGxhdGZvcm0vc3BlZWNoQXBpLnRzIiwic3JjL2FkYXB0ZXJzLXNwZWVjaC9zcGVlY2hTeW50aGVzaXplci50cyIsInNyYy9wdXJlL2Nvb3JkaW5hdGVzLnRzIiwic3JjL2RvbS9ib2FyZFJlYWRlci50cyIsInNyYy9wdXJlL3BpZWNlR3JvdXBpbmcudHMiLCJzcmMvcHVyZS9zcGVlY2hUZXh0LnRzIiwic3JjL3BsYXRmb3JtL3N0b3JhZ2UudHMiLCJzcmMvc2V0dGluZ3MvZGVmYXVsdHMudHMiLCJzcmMvc2V0dGluZ3Mvc2V0dGluZ3NTdG9yZS50cyIsInNyYy9oYW5kbGVycy9oYW5kbGVTcGVlY2hDb21tYW5kLnRzIiwic3JjL2NvbW1hbmRzL2tleWJvYXJkSW5wdXQudHMiLCJub2RlX21vZHVsZXMvcHJlYWN0L2Rpc3QvcHJlYWN0Lm1vZHVsZS5qcyIsIm5vZGVfbW9kdWxlcy9wcmVhY3QvanN4LXJ1bnRpbWUvZGlzdC9qc3hSdW50aW1lLm1vZHVsZS5qcyIsInNyYy9jb21wb25lbnRzL0J1dHRvblJvdy50c3giLCJzcmMvY29tcG9uZW50cy9TZXR0aW5nQnV0dG9uLnRzeCIsInNyYy9jb21wb25lbnRzL0NvbnRyb2xQYW5lbC50c3giLCJzcmMvY29tcG9uZW50cy9yb290LnRzeCIsInNyYy9kb20vYm9hcmRPYnNlcnZlci50cyIsInNyYy9oYW5kbGVycy91cGRhdGVEaXZpZGVycy50cyIsInNyYy9lZmZlY3RzL29uRGl2aWRlcnMudHMiLCJzcmMvaW5pdC50c3giLCJzcmMvbWFpbi50c3giXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGk9U3ltYm9sLmZvcihcInByZWFjdC1zaWduYWxzXCIpO2Z1bmN0aW9uIHQoKXtpZighKHM+MSkpe3ZhciBpLHQ9ITE7IWZ1bmN0aW9uKCl7dmFyIGk9YztjPXZvaWQgMDt3aGlsZSh2b2lkIDAhPT1pKXtpZihpLlMudj09PWkudilpLlMuaT1pLmk7aT1pLm99fSgpO3doaWxlKHZvaWQgMCE9PWgpe3ZhciBuPWg7aD12b2lkIDA7disrO3doaWxlKHZvaWQgMCE9PW4pe3ZhciByPW4udTtuLnU9dm9pZCAwO24uZiY9LTM7aWYoISg4Jm4uZikmJncobikpdHJ5e24uYygpfWNhdGNoKG4pe2lmKCF0KXtpPW47dD0hMH19bj1yfX12PTA7cy0tO2lmKHQpdGhyb3cgaX1lbHNlIHMtLX1mdW5jdGlvbiBuKGkpe2lmKHM+MClyZXR1cm4gaSgpO2U9Kyt1O3MrKzt0cnl7cmV0dXJuIGkoKX1maW5hbGx5e3QoKX19dmFyIHI9dm9pZCAwO2Z1bmN0aW9uIG8oaSl7dmFyIHQ9cjtyPXZvaWQgMDt0cnl7cmV0dXJuIGkoKX1maW5hbGx5e3I9dH19dmFyIGYsaD12b2lkIDAscz0wLHY9MCx1PTAsZT0wLGM9dm9pZCAwLGQ9MDtmdW5jdGlvbiBhKGkpe2lmKHZvaWQgMCE9PXIpe3ZhciB0PWkubjtpZih2b2lkIDA9PT10fHx0LnQhPT1yKXt0PXtpOjAsUzppLHA6ci5zLG46dm9pZCAwLHQ6cixlOnZvaWQgMCx4OnZvaWQgMCxyOnR9O2lmKHZvaWQgMCE9PXIucylyLnMubj10O3Iucz10O2kubj10O2lmKDMyJnIuZilpLlModCk7cmV0dXJuIHR9ZWxzZSBpZigtMT09PXQuaSl7dC5pPTA7aWYodm9pZCAwIT09dC5uKXt0Lm4ucD10LnA7aWYodm9pZCAwIT09dC5wKXQucC5uPXQubjt0LnA9ci5zO3Qubj12b2lkIDA7ci5zLm49dDtyLnM9dH1yZXR1cm4gdH19fWZ1bmN0aW9uIGwoaSx0KXt0aGlzLnY9aTt0aGlzLmk9MDt0aGlzLm49dm9pZCAwO3RoaXMudD12b2lkIDA7dGhpcy5sPTA7dGhpcy5XPW51bGw9PXQ/dm9pZCAwOnQud2F0Y2hlZDt0aGlzLlo9bnVsbD09dD92b2lkIDA6dC51bndhdGNoZWQ7dGhpcy5uYW1lPW51bGw9PXQ/dm9pZCAwOnQubmFtZX1sLnByb3RvdHlwZS5icmFuZD1pO2wucHJvdG90eXBlLmg9ZnVuY3Rpb24oKXtyZXR1cm4hMH07bC5wcm90b3R5cGUuUz1mdW5jdGlvbihpKXt2YXIgdD10aGlzLG49dGhpcy50O2lmKG4hPT1pJiZ2b2lkIDA9PT1pLmUpe2kueD1uO3RoaXMudD1pO2lmKHZvaWQgMCE9PW4pbi5lPWk7ZWxzZSBvKGZ1bmN0aW9uKCl7dmFyIGk7bnVsbD09KGk9dC5XKXx8aS5jYWxsKHQpfSl9fTtsLnByb3RvdHlwZS5VPWZ1bmN0aW9uKGkpe3ZhciB0PXRoaXM7aWYodm9pZCAwIT09dGhpcy50KXt2YXIgbj1pLmUscj1pLng7aWYodm9pZCAwIT09bil7bi54PXI7aS5lPXZvaWQgMH1pZih2b2lkIDAhPT1yKXtyLmU9bjtpLng9dm9pZCAwfWlmKGk9PT10aGlzLnQpe3RoaXMudD1yO2lmKHZvaWQgMD09PXIpbyhmdW5jdGlvbigpe3ZhciBpO251bGw9PShpPXQuWil8fGkuY2FsbCh0KX0pfX19O2wucHJvdG90eXBlLnN1YnNjcmliZT1mdW5jdGlvbihpKXt2YXIgdD10aGlzO3JldHVybiBqKGZ1bmN0aW9uKCl7dmFyIG49dC52YWx1ZSxvPXI7cj12b2lkIDA7dHJ5e2kobil9ZmluYWxseXtyPW99fSx7bmFtZTpcInN1YlwifSl9O2wucHJvdG90eXBlLnZhbHVlT2Y9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy52YWx1ZX07bC5wcm90b3R5cGUudG9TdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy52YWx1ZStcIlwifTtsLnByb3RvdHlwZS50b0pTT049ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy52YWx1ZX07bC5wcm90b3R5cGUucGVlaz1mdW5jdGlvbigpe3ZhciBpPXRoaXM7cmV0dXJuIG8oZnVuY3Rpb24oKXtyZXR1cm4gaS52YWx1ZX0pfTtPYmplY3QuZGVmaW5lUHJvcGVydHkobC5wcm90b3R5cGUsXCJ2YWx1ZVwiLHtnZXQ6ZnVuY3Rpb24oKXt2YXIgaT1hKHRoaXMpO2lmKHZvaWQgMCE9PWkpaS5pPXRoaXMuaTtyZXR1cm4gdGhpcy52fSxzZXQ6ZnVuY3Rpb24oaSl7aWYoaSE9PXRoaXMudil7aWYodj4xMDApdGhyb3cgbmV3IEVycm9yKFwiQ3ljbGUgZGV0ZWN0ZWRcIik7IWZ1bmN0aW9uKGkpe2lmKDAhPT1zJiYwPT09dilpZihpLmwhPT1lKXtpLmw9ZTtjPXtTOmksdjppLnYsaTppLmksbzpjfX19KHRoaXMpO3RoaXMudj1pO3RoaXMuaSsrO2QrKztzKys7dHJ5e2Zvcih2YXIgbj10aGlzLnQ7dm9pZCAwIT09bjtuPW4ueCluLnQuTigpfWZpbmFsbHl7dCgpfX19fSk7ZnVuY3Rpb24geShpLHQpe3JldHVybiBuZXcgbChpLHQpfWZ1bmN0aW9uIHcoaSl7Zm9yKHZhciB0PWkuczt2b2lkIDAhPT10O3Q9dC5uKWlmKHQuUy5pIT09dC5pfHwhdC5TLmgoKXx8dC5TLmkhPT10LmkpcmV0dXJuITA7cmV0dXJuITF9ZnVuY3Rpb24gXyhpKXtmb3IodmFyIHQ9aS5zO3ZvaWQgMCE9PXQ7dD10Lm4pe3ZhciBuPXQuUy5uO2lmKHZvaWQgMCE9PW4pdC5yPW47dC5TLm49dDt0Lmk9LTE7aWYodm9pZCAwPT09dC5uKXtpLnM9dDticmVha319fWZ1bmN0aW9uIGIoaSl7dmFyIHQ9aS5zLG49dm9pZCAwO3doaWxlKHZvaWQgMCE9PXQpe3ZhciByPXQucDtpZigtMT09PXQuaSl7dC5TLlUodCk7aWYodm9pZCAwIT09cilyLm49dC5uO2lmKHZvaWQgMCE9PXQubil0Lm4ucD1yfWVsc2Ugbj10O3QuUy5uPXQucjtpZih2b2lkIDAhPT10LnIpdC5yPXZvaWQgMDt0PXJ9aS5zPW59ZnVuY3Rpb24gcChpLHQpe2wuY2FsbCh0aGlzLHZvaWQgMCk7dGhpcy54PWk7dGhpcy5zPXZvaWQgMDt0aGlzLmc9ZC0xO3RoaXMuZj00O3RoaXMuVz1udWxsPT10P3ZvaWQgMDp0LndhdGNoZWQ7dGhpcy5aPW51bGw9PXQ/dm9pZCAwOnQudW53YXRjaGVkO3RoaXMubmFtZT1udWxsPT10P3ZvaWQgMDp0Lm5hbWV9cC5wcm90b3R5cGU9bmV3IGw7cC5wcm90b3R5cGUuaD1mdW5jdGlvbigpe3RoaXMuZiY9LTM7aWYoMSZ0aGlzLmYpcmV0dXJuITE7aWYoMzI9PSgzNiZ0aGlzLmYpKXJldHVybiEwO3RoaXMuZiY9LTU7aWYodGhpcy5nPT09ZClyZXR1cm4hMDt0aGlzLmc9ZDt0aGlzLmZ8PTE7aWYodGhpcy5pPjAmJiF3KHRoaXMpKXt0aGlzLmYmPS0yO3JldHVybiEwfXZhciBpPXI7dHJ5e18odGhpcyk7cj10aGlzO3ZhciB0PXRoaXMueCgpO2lmKDE2JnRoaXMuZnx8dGhpcy52IT09dHx8MD09PXRoaXMuaSl7dGhpcy52PXQ7dGhpcy5mJj0tMTc7dGhpcy5pKyt9fWNhdGNoKGkpe3RoaXMudj1pO3RoaXMuZnw9MTY7dGhpcy5pKyt9cj1pO2IodGhpcyk7dGhpcy5mJj0tMjtyZXR1cm4hMH07cC5wcm90b3R5cGUuUz1mdW5jdGlvbihpKXtpZih2b2lkIDA9PT10aGlzLnQpe3RoaXMuZnw9MzY7Zm9yKHZhciB0PXRoaXMuczt2b2lkIDAhPT10O3Q9dC5uKXQuUy5TKHQpfWwucHJvdG90eXBlLlMuY2FsbCh0aGlzLGkpfTtwLnByb3RvdHlwZS5VPWZ1bmN0aW9uKGkpe2lmKHZvaWQgMCE9PXRoaXMudCl7bC5wcm90b3R5cGUuVS5jYWxsKHRoaXMsaSk7aWYodm9pZCAwPT09dGhpcy50KXt0aGlzLmYmPS0zMztmb3IodmFyIHQ9dGhpcy5zO3ZvaWQgMCE9PXQ7dD10Lm4pdC5TLlUodCl9fX07cC5wcm90b3R5cGUuTj1mdW5jdGlvbigpe2lmKCEoMiZ0aGlzLmYpKXt0aGlzLmZ8PTY7Zm9yKHZhciBpPXRoaXMudDt2b2lkIDAhPT1pO2k9aS54KWkudC5OKCl9fTtPYmplY3QuZGVmaW5lUHJvcGVydHkocC5wcm90b3R5cGUsXCJ2YWx1ZVwiLHtnZXQ6ZnVuY3Rpb24oKXtpZigxJnRoaXMuZil0aHJvdyBuZXcgRXJyb3IoXCJDeWNsZSBkZXRlY3RlZFwiKTt2YXIgaT1hKHRoaXMpO3RoaXMuaCgpO2lmKHZvaWQgMCE9PWkpaS5pPXRoaXMuaTtpZigxNiZ0aGlzLmYpdGhyb3cgdGhpcy52O3JldHVybiB0aGlzLnZ9fSk7ZnVuY3Rpb24gZyhpLHQpe3JldHVybiBuZXcgcChpLHQpfWZ1bmN0aW9uIFMoaSl7dmFyIG49aS5tO2kubT12b2lkIDA7aWYoXCJmdW5jdGlvblwiPT10eXBlb2Ygbil7cysrO3ZhciBvPXI7cj12b2lkIDA7dHJ5e24oKX1jYXRjaCh0KXtpLmYmPS0yO2kuZnw9ODttKGkpO3Rocm93IHR9ZmluYWxseXtyPW87dCgpfX19ZnVuY3Rpb24gbShpKXtmb3IodmFyIHQ9aS5zO3ZvaWQgMCE9PXQ7dD10Lm4pdC5TLlUodCk7aS54PXZvaWQgMDtpLnM9dm9pZCAwO1MoaSl9ZnVuY3Rpb24geChpKXtpZihyIT09dGhpcyl0aHJvdyBuZXcgRXJyb3IoXCJPdXQtb2Ytb3JkZXIgZWZmZWN0XCIpO2IodGhpcyk7cj1pO3RoaXMuZiY9LTI7aWYoOCZ0aGlzLmYpbSh0aGlzKTt0KCl9ZnVuY3Rpb24gRShpLHQpe3RoaXMueD1pO3RoaXMubT12b2lkIDA7dGhpcy5zPXZvaWQgMDt0aGlzLnU9dm9pZCAwO3RoaXMuZj0zMjt0aGlzLm5hbWU9bnVsbD09dD92b2lkIDA6dC5uYW1lO2lmKGYpZi5wdXNoKHRoaXMpfUUucHJvdG90eXBlLmM9ZnVuY3Rpb24oKXt2YXIgaT10aGlzLlMoKTt0cnl7aWYoOCZ0aGlzLmYpcmV0dXJuO2lmKHZvaWQgMD09PXRoaXMueClyZXR1cm47dmFyIHQ9dGhpcy54KCk7aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgdCl0aGlzLm09dH1maW5hbGx5e2koKX19O0UucHJvdG90eXBlLlM9ZnVuY3Rpb24oKXtpZigxJnRoaXMuZil0aHJvdyBuZXcgRXJyb3IoXCJDeWNsZSBkZXRlY3RlZFwiKTt0aGlzLmZ8PTE7dGhpcy5mJj0tOTtTKHRoaXMpO18odGhpcyk7cysrO3ZhciBpPXI7cj10aGlzO3JldHVybiB4LmJpbmQodGhpcyxpKX07RS5wcm90b3R5cGUuTj1mdW5jdGlvbigpe2lmKCEoMiZ0aGlzLmYpKXt0aGlzLmZ8PTI7dGhpcy51PWg7aD10aGlzfX07RS5wcm90b3R5cGUuZD1mdW5jdGlvbigpe3RoaXMuZnw9ODtpZighKDEmdGhpcy5mKSltKHRoaXMpfTtFLnByb3RvdHlwZS5kaXNwb3NlPWZ1bmN0aW9uKCl7dGhpcy5kKCl9O2Z1bmN0aW9uIGooaSx0KXt2YXIgbj1uZXcgRShpLHQpO3RyeXtuLmMoKX1jYXRjaChpKXtuLmQoKTt0aHJvdyBpfXZhciByPW4uZC5iaW5kKG4pO3JbU3ltYm9sLmRpc3Bvc2VdPXI7cmV0dXJuIHJ9ZnVuY3Rpb24gQyhpKXtyZXR1cm4gZnVuY3Rpb24oKXt2YXIgdD1hcmd1bWVudHMscj10aGlzO3JldHVybiBuKGZ1bmN0aW9uKCl7cmV0dXJuIG8oZnVuY3Rpb24oKXtyZXR1cm4gaS5hcHBseShyLFtdLnNsaWNlLmNhbGwodCkpfSl9KX19ZnVuY3Rpb24gTygpe3ZhciBpPWY7Zj1bXTtyZXR1cm4gZnVuY3Rpb24oKXt2YXIgdD1mO2lmKGYmJmkpaT1pLmNvbmNhdChmKTtmPWk7cmV0dXJuIHR9fXZhciBrPWZ1bmN0aW9uKGkpe2Zvcih2YXIgdCBpbiBpKXt2YXIgbj1pW3RdO2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIG4paVt0XT1DKG4pO2Vsc2UgaWYoXCJvYmplY3RcIj09dHlwZW9mIG4mJm51bGwhPT1uJiYhKFwiYnJhbmRcImluIG4pKWsobil9fTtmdW5jdGlvbiBUKGkpe3JldHVybiBmdW5jdGlvbigpe3ZhciB0LG4scj1PKCk7dHJ5e249aS5hcHBseSh2b2lkIDAsW10uc2xpY2UuY2FsbChhcmd1bWVudHMpKX1jYXRjaChpKXtmPXZvaWQgMDt0aHJvdyBpfWZpbmFsbHl7dD1yKCl9ayhuKTtuW1N5bWJvbC5kaXNwb3NlXT1DKGZ1bmN0aW9uKCl7aWYodClmb3IodmFyIGk9MDtpPHQubGVuZ3RoO2krKyl0W2ldLmRpc3Bvc2UoKTt0PXZvaWQgMH0pO3JldHVybiBufX1leHBvcnR7cCBhcyBDb21wdXRlZCxFIGFzIEVmZmVjdCxsIGFzIFNpZ25hbCxDIGFzIGFjdGlvbixuIGFzIGJhdGNoLGcgYXMgY29tcHV0ZWQsVCBhcyBjcmVhdGVNb2RlbCxqIGFzIGVmZmVjdCx5IGFzIHNpZ25hbCxvIGFzIHVudHJhY2tlZH07Ly8jIHNvdXJjZU1hcHBpbmdVUkw9c2lnbmFscy1jb3JlLm1vZHVsZS5qcy5tYXBcbiIsImV4cG9ydCBlbnVtIFBsYXllckNvbG9yIHtcbiAgV0hJVEUgPSAnd2hpdGUnLFxuICBCTEFDSyA9ICdibGFjaycsXG59XG5cbmV4cG9ydCBlbnVtIFBpZWNlVHlwZSB7XG4gIFBBV04gPSAncGF3bicsXG4gIEtOSUdIVCA9ICdrbmlnaHQnLFxuICBCSVNIT1AgPSAnYmlzaG9wJyxcbiAgUk9PSyA9ICdyb29rJyxcbiAgUVVFRU4gPSAncXVlZW4nLFxuICBLSU5HID0gJ2tpbmcnLFxufVxuXG5leHBvcnQgZW51bSBRdWFkcmFudCB7XG4gIFdISVRFX0tJTkcgPSAnd2snLFxuICBXSElURV9RVUVFTiA9ICd3cScsXG4gIEJMQUNLX0tJTkcgPSAnYmsnLFxuICBCTEFDS19RVUVFTiA9ICdicScsXG59XG5cbi8vIEhlbHBlciBhcnJheXMgZm9yIGl0ZXJhdGlvblxuZXhwb3J0IGNvbnN0IFBMQVlFUl9DT0xPUl9WQUxVRVMgPSBPYmplY3QudmFsdWVzKFBsYXllckNvbG9yKVxuZXhwb3J0IGNvbnN0IFBJRUNFX1RZUEVfVkFMVUVTID0gT2JqZWN0LnZhbHVlcyhQaWVjZVR5cGUpXG5leHBvcnQgY29uc3QgUVVBRFJBTlRfVkFMVUVTID0gT2JqZWN0LnZhbHVlcyhRdWFkcmFudClcbiIsImV4cG9ydCBlbnVtIEtleWJvYXJkQ29tbWFuZCB7XG4gIFBXSyA9ICdwd2snLFxuICBQV1EgPSAncHdxJyxcbiAgUEJLID0gJ3BiaycsXG4gIFBCUSA9ICdwYnEnLFxuICBQQSA9ICdwYScsXG4gIFBXVyA9ICdwd3cnLFxuICBQQkIgPSAncGJiJyxcbiAgUFNTID0gJ3BzcycsXG59XG5cbmV4cG9ydCBlbnVtIFNwZWVjaENvbW1hbmQge1xuICBBTEwgPSAnYWxsJyxcbiAgV0hJVEUgPSAnd2hpdGUnLFxuICBCTEFDSyA9ICdibGFjaycsXG4gIFNUT1AgPSAnc3RvcCcsXG4gIFdLID0gJ3drJyxcbiAgV1EgPSAnd3EnLFxuICBCSyA9ICdiaycsXG4gIEJRID0gJ2JxJyxcbn1cblxuLy8gS2V5Ym9hcmQgdG8gc3BlZWNoIGNvbW1hbmQgbWFwcGluZ1xuZXhwb3J0IGNvbnN0IEtFWUJPQVJEX0NPTU1BTkRfTUFQID0gbmV3IE1hcChbXG4gIFtLZXlib2FyZENvbW1hbmQuUFdLLCBTcGVlY2hDb21tYW5kLldLXSxcbiAgW0tleWJvYXJkQ29tbWFuZC5QV1EsIFNwZWVjaENvbW1hbmQuV1FdLFxuICBbS2V5Ym9hcmRDb21tYW5kLlBCSywgU3BlZWNoQ29tbWFuZC5CS10sXG4gIFtLZXlib2FyZENvbW1hbmQuUEJRLCBTcGVlY2hDb21tYW5kLkJRXSxcbiAgW0tleWJvYXJkQ29tbWFuZC5QQSwgU3BlZWNoQ29tbWFuZC5BTExdLFxuICBbS2V5Ym9hcmRDb21tYW5kLlBXVywgU3BlZWNoQ29tbWFuZC5XSElURV0sXG4gIFtLZXlib2FyZENvbW1hbmQuUEJCLCBTcGVlY2hDb21tYW5kLkJMQUNLXSxcbiAgW0tleWJvYXJkQ29tbWFuZC5QU1MsIFNwZWVjaENvbW1hbmQuU1RPUF0sXG5dIGFzIGNvbnN0KVxuIiwiLy8gRE9NIHNlbGVjdG9ycyBlbnVtXG5leHBvcnQgZW51bSBEb21TZWxlY3RvciB7XG4gIEJPQVJEID0gJ2NnLWJvYXJkJyxcbiAgQk9BUkRfTk9fQ1VTVE9NID0gJ2NnLWJvYXJkOm5vdCgudXNlcnNjcmlwdC1jdXN0b20tYm9hcmQpJyxcbiAgQ09PUkRTID0gJ2Nvb3JkcycsXG4gIFBJRUNFID0gJ3BpZWNlJyxcbiAgQ09OVEFJTkVSID0gJ2NnLWNvbnRhaW5lcicsXG4gIEtFWUJPQVJEX01PVkUgPSAnLmtleWJvYXJkLW1vdmUnLFxuICBLRVlCT0FSRF9JTlBVVCA9ICcua2V5Ym9hcmQtbW92ZSBpbnB1dCcsXG59XG5cbi8vIENTUyBjbGFzc2VzIGVudW1cbmV4cG9ydCBlbnVtIENzc0NsYXNzIHtcbiAgQkxBQ0sgPSAnYmxhY2snLFxuICBVU0VSU0NSSVBUX0RJVklERVJTID0gJ3VzZXJzY3JpcHQtZGl2aWRlcnMnLFxuICBVU0VSU0NSSVBUX0ZMQVNIID0gJ3VzZXJzY3JpcHQtZmxhc2gtb3ZlcmxheScsXG59XG5cbi8vIENTUyBkaXNwbGF5IHZhbHVlcyBlbnVtXG5leHBvcnQgZW51bSBDc3NEaXNwbGF5IHtcbiAgQkxPQ0sgPSAnYmxvY2snLFxuICBOT05FID0gJ25vbmUnLFxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZURpdigpOiBIVE1MRGl2RWxlbWVudCB7XG4gIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU3ZnRWxlbWVudCh0YWc6IHN0cmluZyk6IFNWR0VsZW1lbnQge1xuICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsIHRhZylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3I6IHN0cmluZyk6IEVsZW1lbnQgfCBudWxsIHtcbiAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBxdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yOiBzdHJpbmcpOiBOb2RlTGlzdE9mPEVsZW1lbnQ+IHtcbiAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBlbmRDaGlsZChwYXJlbnQ6IEVsZW1lbnQsIGNoaWxkOiBFbGVtZW50KTogdm9pZCB7XG4gIHBhcmVudC5hcHBlbmRDaGlsZChjaGlsZClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEJvdW5kaW5nQ2xpZW50UmVjdChlbGVtZW50OiBFbGVtZW50KTogRE9NUmVjdCB7XG4gIHJldHVybiBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG59XG4iLCJpbXBvcnQgeyBDc3NDbGFzcywgQ3NzRGlzcGxheSwgRG9tU2VsZWN0b3IgfSBmcm9tICcuLi9jb25zdGFudHMnXG5pbXBvcnQgeyBhcHBlbmRDaGlsZCwgY3JlYXRlU3ZnRWxlbWVudCwgcXVlcnlTZWxlY3RvciB9IGZyb20gJy4uL3BsYXRmb3JtL2RvbSdcblxuZXhwb3J0IGludGVyZmFjZSBEaXZpZGVyc1N0YXRlIHtcbiAgc3ZnOiBTVkdTVkdFbGVtZW50XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVEaXZpZGVycygpOiBEaXZpZGVyc1N0YXRlIHtcbiAgY29uc3QgYm9hcmQgPSBxdWVyeVNlbGVjdG9yKERvbVNlbGVjdG9yLkJPQVJEKVxuICBpZiAoIWJvYXJkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdCb2FyZCBub3QgZm91bmQnKVxuICB9XG5cbiAgY29uc3QgcmVjdCA9IGJvYXJkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gIGNvbnN0IHNpemUgPSByZWN0LndpZHRoXG5cbiAgY29uc3Qgc3ZnID0gY3JlYXRlU3ZnRWxlbWVudCgnc3ZnJykgYXMgU1ZHU1ZHRWxlbWVudFxuICBzdmcuc2V0QXR0cmlidXRlKCdjbGFzcycsIENzc0NsYXNzLlVTRVJTQ1JJUFRfRElWSURFUlMpXG4gIHN2Zy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgc2l6ZS50b1N0cmluZygpKVxuICBzdmcuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBzaXplLnRvU3RyaW5nKCkpXG4gIHN2Zy5zdHlsZS5jc3NUZXh0ID0gYFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDA7XG4gICAgbGVmdDogMDtcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICBkaXNwbGF5OiBub25lO1xuICBgXG5cbiAgLy8gVmVydGljYWwgbGluZVxuICBjb25zdCB2TGluZSA9IGNyZWF0ZVN2Z0VsZW1lbnQoJ2xpbmUnKVxuICB2TGluZS5zZXRBdHRyaWJ1dGUoJ3gxJywgKHNpemUgLyAyKS50b1N0cmluZygpKVxuICB2TGluZS5zZXRBdHRyaWJ1dGUoJ3kxJywgJzAnKVxuICB2TGluZS5zZXRBdHRyaWJ1dGUoJ3gyJywgKHNpemUgLyAyKS50b1N0cmluZygpKVxuICB2TGluZS5zZXRBdHRyaWJ1dGUoJ3kyJywgc2l6ZS50b1N0cmluZygpKVxuICB2TGluZS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsICdyZWQnKVxuICB2TGluZS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS13aWR0aCcsICcyJylcblxuICAvLyBIb3Jpem9udGFsIGxpbmVcbiAgY29uc3QgaExpbmUgPSBjcmVhdGVTdmdFbGVtZW50KCdsaW5lJylcbiAgaExpbmUuc2V0QXR0cmlidXRlKCd4MScsICcwJylcbiAgaExpbmUuc2V0QXR0cmlidXRlKCd5MScsIChzaXplIC8gMikudG9TdHJpbmcoKSlcbiAgaExpbmUuc2V0QXR0cmlidXRlKCd4MicsIHNpemUudG9TdHJpbmcoKSlcbiAgaExpbmUuc2V0QXR0cmlidXRlKCd5MicsIChzaXplIC8gMikudG9TdHJpbmcoKSlcbiAgaExpbmUuc2V0QXR0cmlidXRlKCdzdHJva2UnLCAncmVkJylcbiAgaExpbmUuc2V0QXR0cmlidXRlKCdzdHJva2Utd2lkdGgnLCAnMicpXG5cbiAgYXBwZW5kQ2hpbGQoc3ZnLCB2TGluZSlcbiAgYXBwZW5kQ2hpbGQoc3ZnLCBoTGluZSlcblxuICBhcHBlbmRDaGlsZChib2FyZCwgc3ZnKVxuXG4gIHJldHVybiB7IHN2ZyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93RGl2aWRlcnMoc3RhdGU6IERpdmlkZXJzU3RhdGUpOiB2b2lkIHtcbiAgc3RhdGUuc3ZnLnN0eWxlLmRpc3BsYXkgPSBDc3NEaXNwbGF5LkJMT0NLXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoaWRlRGl2aWRlcnMoc3RhdGU6IERpdmlkZXJzU3RhdGUpOiB2b2lkIHtcbiAgc3RhdGUuc3ZnLnN0eWxlLmRpc3BsYXkgPSBDc3NEaXNwbGF5Lk5PTkVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlc3Ryb3lEaXZpZGVycyhzdGF0ZTogRGl2aWRlcnNTdGF0ZSk6IHZvaWQge1xuICBzdGF0ZS5zdmcucmVtb3ZlKClcbn1cbiIsImltcG9ydCB7IENzc0NsYXNzLCBDc3NEaXNwbGF5LCBEb21TZWxlY3RvciB9IGZyb20gJy4uL2NvbnN0YW50cydcbmltcG9ydCB7IGFwcGVuZENoaWxkLCBjcmVhdGVEaXYsIHF1ZXJ5U2VsZWN0b3IgfSBmcm9tICcuLi9wbGF0Zm9ybS9kb20nXG5cbmV4cG9ydCBpbnRlcmZhY2UgRmxhc2hPdmVybGF5U3RhdGUge1xuICBvdmVybGF5OiBIVE1MRWxlbWVudFxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRmxhc2hPdmVybGF5KCk6IEZsYXNoT3ZlcmxheVN0YXRlIHtcbiAgY29uc3Qgb3ZlcmxheSA9IGNyZWF0ZURpdigpXG4gIG92ZXJsYXkuY2xhc3NOYW1lID0gQ3NzQ2xhc3MuVVNFUlNDUklQVF9GTEFTSFxuICBvdmVybGF5LnN0eWxlLmNzc1RleHQgPSBgXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMDtcbiAgICBsZWZ0OiAwO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICBiYWNrZ3JvdW5kOiBibGFjaztcbiAgICB6LWluZGV4OiAxMDAwO1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIGBcblxuICBjb25zdCBjb250YWluZXIgPSBxdWVyeVNlbGVjdG9yKERvbVNlbGVjdG9yLkNPTlRBSU5FUilcbiAgaWYgKGNvbnRhaW5lcikge1xuICAgIGFwcGVuZENoaWxkKGNvbnRhaW5lciwgb3ZlcmxheSlcbiAgfVxuXG4gIHJldHVybiB7IG92ZXJsYXkgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvd0ZsYXNoKHN0YXRlOiBGbGFzaE92ZXJsYXlTdGF0ZSk6IHZvaWQge1xuICBzdGF0ZS5vdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBDc3NEaXNwbGF5LkJMT0NLXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoaWRlRmxhc2goc3RhdGU6IEZsYXNoT3ZlcmxheVN0YXRlKTogdm9pZCB7XG4gIHN0YXRlLm92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IENzc0Rpc3BsYXkuTk9ORVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVzdHJveUZsYXNoT3ZlcmxheShzdGF0ZTogRmxhc2hPdmVybGF5U3RhdGUpOiB2b2lkIHtcbiAgc3RhdGUub3ZlcmxheS5yZW1vdmUoKVxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGdldFNwZWVjaFN5bnRoZXNpcygpOiBTcGVlY2hTeW50aGVzaXMge1xuICByZXR1cm4gd2luZG93LnNwZWVjaFN5bnRoZXNpc1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3BlZWNoU3ludGhlc2lzVXR0ZXJhbmNlKCk6IHR5cGVvZiBTcGVlY2hTeW50aGVzaXNVdHRlcmFuY2Uge1xuICByZXR1cm4gU3BlZWNoU3ludGhlc2lzVXR0ZXJhbmNlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzcGVhayhzeW50aGVzaXM6IFNwZWVjaFN5bnRoZXNpcywgdXR0ZXJhbmNlOiBTcGVlY2hTeW50aGVzaXNVdHRlcmFuY2UpOiB2b2lkIHtcbiAgc3ludGhlc2lzLnNwZWFrKHV0dGVyYW5jZSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNhbmNlbChzeW50aGVzaXM6IFNwZWVjaFN5bnRoZXNpcyk6IHZvaWQge1xuICBzeW50aGVzaXMuY2FuY2VsKClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVV0dGVyYW5jZShcbiAgVXR0ZXJhbmNlQ2xhc3M6IHR5cGVvZiBTcGVlY2hTeW50aGVzaXNVdHRlcmFuY2UsXG4gIHRleHQ6IHN0cmluZ1xuKTogU3BlZWNoU3ludGhlc2lzVXR0ZXJhbmNlIHtcbiAgcmV0dXJuIG5ldyBVdHRlcmFuY2VDbGFzcyh0ZXh0KVxufVxuIiwiaW1wb3J0ICogYXMgc3BlZWNoQXBpIGZyb20gJy4uL3BsYXRmb3JtL3NwZWVjaEFwaSdcblxubGV0IGN1cnJlbnRSYXRlID0gMS4wXG5cbmV4cG9ydCBmdW5jdGlvbiBzcGVhayh0ZXh0OiBzdHJpbmcsIHJhdGU6IG51bWJlcik6IHZvaWQge1xuICBjb25zdCBzeW50aGVzaXMgPSBzcGVlY2hBcGkuZ2V0U3BlZWNoU3ludGhlc2lzKClcbiAgY29uc3QgVXR0ZXJhbmNlQ2xhc3MgPSBzcGVlY2hBcGkuZ2V0U3BlZWNoU3ludGhlc2lzVXR0ZXJhbmNlKClcbiAgY29uc3QgdXR0ZXJhbmNlID0gc3BlZWNoQXBpLmNyZWF0ZVV0dGVyYW5jZShVdHRlcmFuY2VDbGFzcywgdGV4dClcbiAgdXR0ZXJhbmNlLnJhdGUgPSByYXRlXG4gIHNwZWVjaEFwaS5zcGVhayhzeW50aGVzaXMsIHV0dGVyYW5jZSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0b3BTcGVha2luZygpOiB2b2lkIHtcbiAgY29uc3Qgc3ludGhlc2lzID0gc3BlZWNoQXBpLmdldFNwZWVjaFN5bnRoZXNpcygpXG4gIHNwZWVjaEFwaS5jYW5jZWwoc3ludGhlc2lzKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0UmF0ZShyYXRlOiBudW1iZXIpOiB2b2lkIHtcbiAgY3VycmVudFJhdGUgPSByYXRlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRSYXRlKCk6IG51bWJlciB7XG4gIHJldHVybiBjdXJyZW50UmF0ZVxufVxuIiwiaW1wb3J0IHsgUGxheWVyQ29sb3IgfSBmcm9tICcuLi9jb25zdGFudHMnXG5cbmV4cG9ydCBpbnRlcmZhY2UgUGl4ZWxQb3NpdGlvbiB7XG4gIHg6IG51bWJlclxuICB5OiBudW1iZXJcbn1cblxuY29uc3QgRklMRVMgPSAnYWJjZGVmZ2gnXG5cbmV4cG9ydCBmdW5jdGlvbiBwaXhlbHNUb1NxdWFyZShcbiAgcG9zaXRpb246IFBpeGVsUG9zaXRpb24sXG4gIHNxdWFyZVNpemU6IG51bWJlcixcbiAgcGxheWVyQ29sb3I6IFBsYXllckNvbG9yXG4pOiBzdHJpbmcge1xuICAvLyBDb252ZXJ0IHBpeGVscyB0byBncmlkIGluZGljZXMgKDAtNylcbiAgLy8gQWRqdXN0IGZvciBjZW50ZXItYmFzZWQgY29vcmRpbmF0ZXMgYmVmb3JlIHJvdW5kaW5nXG4gIGxldCBjb2wgPSBNYXRoLnJvdW5kKChwb3NpdGlvbi54IC0gc3F1YXJlU2l6ZSAvIDIpIC8gc3F1YXJlU2l6ZSlcbiAgbGV0IHJvdyA9IE1hdGgucm91bmQoKHBvc2l0aW9uLnkgLSBzcXVhcmVTaXplIC8gMikgLyBzcXVhcmVTaXplKVxuXG4gIC8vIENsYW1wIHRvIHZhbGlkIHJhbmdlXG4gIGNvbCA9IE1hdGgubWF4KDAsIE1hdGgubWluKDcsIGNvbCkpXG4gIHJvdyA9IE1hdGgubWF4KDAsIE1hdGgubWluKDcsIHJvdykpXG5cbiAgLy8gQ29udmVydCB0byByYW5rIGJhc2VkIG9uIHBsYXllciBjb2xvclxuICAvLyBGb3Igd2hpdGU6IHk9MCBpcyByYW5rIDgsIHkgaW5jcmVhc2VzIGdvaW5nIHRvIHJhbmsgMVxuICAvLyBGb3IgYmxhY2s6IHk9MCBpcyByYW5rIDEsIHkgaW5jcmVhc2VzIGdvaW5nIHRvIHJhbmsgOFxuICBsZXQgcmFuazogbnVtYmVyXG4gIGxldCBmaWxlOiBzdHJpbmdcblxuICBpZiAocGxheWVyQ29sb3IgPT09IFBsYXllckNvbG9yLldISVRFKSB7XG4gICAgZmlsZSA9IEZJTEVTW2NvbF1cbiAgICByYW5rID0gOCAtIHJvd1xuICB9IGVsc2Uge1xuICAgIGZpbGUgPSBGSUxFU1s3IC0gY29sXVxuICAgIHJhbmsgPSByb3cgKyAxXG4gIH1cblxuICByZXR1cm4gYCR7ZmlsZX0ke3Jhbmt9YFxufVxuXG5leHBvcnQgZnVuY3Rpb24gc3F1YXJlVG9QaXhlbHMoXG4gIHNxdWFyZTogc3RyaW5nLFxuICBzcXVhcmVTaXplOiBudW1iZXIsXG4gIHBsYXllckNvbG9yOiBQbGF5ZXJDb2xvclxuKTogUGl4ZWxQb3NpdGlvbiB7XG4gIC8vIFZhbGlkYXRlIHNxdWFyZSBmb3JtYXRcbiAgaWYgKHNxdWFyZS5sZW5ndGggPCAyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHNxdWFyZSBub3RhdGlvbjogJHtzcXVhcmV9YClcbiAgfVxuXG4gIC8vIFBhcnNlIHNxdWFyZSBub3RhdGlvblxuICBjb25zdCBmaWxlID0gc3F1YXJlWzBdXG4gIGNvbnN0IHJhbmsgPSBOdW1iZXIucGFyc2VJbnQoc3F1YXJlWzFdLCAxMClcblxuICAvLyBWYWxpZGF0ZSBmaWxlIGFuZCByYW5rXG4gIGNvbnN0IGNvbCA9IEZJTEVTLmluZGV4T2YoZmlsZSlcbiAgaWYgKGNvbCA9PT0gLTEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgZmlsZTogJHtmaWxlfWApXG4gIH1cbiAgaWYgKHJhbmsgPCAxIHx8IHJhbmsgPiA4IHx8IE51bWJlci5pc05hTihyYW5rKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCByYW5rOiAke3Jhbmt9YClcbiAgfVxuXG4gIC8vIENhbGN1bGF0ZSBwaXhlbCBwb3NpdGlvbiBiYXNlZCBvbiBwbGF5ZXIgY29sb3JcbiAgbGV0IHBpeGVsQ29sOiBudW1iZXJcbiAgbGV0IHBpeGVsUm93OiBudW1iZXJcblxuICBpZiAocGxheWVyQ29sb3IgPT09IFBsYXllckNvbG9yLldISVRFKSB7XG4gICAgLy8gRm9yIHdoaXRlOiBmaWxlcyBnbyBsZWZ0LXRvLXJpZ2h0IChhLWgpLCByYW5rcyBnbyBib3R0b20tdG8tdG9wICgxLTgpXG4gICAgLy8gU28gcmFuayAxIGlzIGF0IGJvdHRvbSAocm93IDcpLCByYW5rIDggaXMgYXQgdG9wIChyb3cgMClcbiAgICBwaXhlbENvbCA9IGNvbFxuICAgIHBpeGVsUm93ID0gOCAtIHJhbmtcbiAgfSBlbHNlIHtcbiAgICAvLyBGb3IgYmxhY2s6IGZpbGVzIGdvIHJpZ2h0LXRvLWxlZnQgKGgtYSksIHJhbmtzIGdvIHRvcC10by1ib3R0b20gKDgtMSlcbiAgICAvLyBTbyByYW5rIDggaXMgYXQgdG9wIChyb3cgMCksIHJhbmsgMSBpcyBhdCBib3R0b20gKHJvdyA3KVxuICAgIHBpeGVsQ29sID0gNyAtIGNvbFxuICAgIHBpeGVsUm93ID0gcmFuayAtIDFcbiAgfVxuXG4gIC8vIENvbnZlcnQgdG8gcGl4ZWxzIChjZW50ZXIgb2Ygc3F1YXJlKVxuICByZXR1cm4ge1xuICAgIHg6IHBpeGVsQ29sICogc3F1YXJlU2l6ZSArIHNxdWFyZVNpemUgLyAyLFxuICAgIHk6IHBpeGVsUm93ICogc3F1YXJlU2l6ZSArIHNxdWFyZVNpemUgLyAyLFxuICB9XG59XG4iLCJpbXBvcnQgeyBDc3NDbGFzcywgRG9tU2VsZWN0b3IsIHR5cGUgUGllY2VUeXBlLCBQbGF5ZXJDb2xvciB9IGZyb20gJy4uL2NvbnN0YW50cydcbmltcG9ydCB7IGdldEJvdW5kaW5nQ2xpZW50UmVjdCwgcXVlcnlTZWxlY3RvciB9IGZyb20gJy4uL3BsYXRmb3JtL2RvbSdcbmltcG9ydCB7IHBpeGVsc1RvU3F1YXJlIH0gZnJvbSAnLi4vcHVyZS9jb29yZGluYXRlcydcbmltcG9ydCB0eXBlIHsgUGllY2VQb3NpdGlvbiB9IGZyb20gJy4uL3B1cmUvcGllY2VHcm91cGluZydcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFBsYXllckNvbG9yKCk6IFBsYXllckNvbG9yIHtcbiAgY29uc3QgY29vcmRzID0gcXVlcnlTZWxlY3RvcihEb21TZWxlY3Rvci5DT09SRFMpXG4gIHJldHVybiBjb29yZHM/LmNsYXNzTGlzdC5jb250YWlucyhDc3NDbGFzcy5CTEFDSykgPyBQbGF5ZXJDb2xvci5CTEFDSyA6IFBsYXllckNvbG9yLldISVRFXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWFkUGllY2VQb3NpdGlvbnMoKTogUGllY2VQb3NpdGlvbltdIHtcbiAgY29uc3QgYm9hcmQgPSBxdWVyeVNlbGVjdG9yKERvbVNlbGVjdG9yLkJPQVJEX05PX0NVU1RPTSlcbiAgaWYgKCFib2FyZCkgcmV0dXJuIFtdXG5cbiAgLy8gUGFyc2Ugd2lkdGggZnJvbSBzdHlsZSBhdHRyaWJ1dGUgc2luY2UgZ2V0Qm91bmRpbmdDbGllbnRSZWN0IG1heSBub3Qgd29yayBpbiB0ZXN0IGVudmlyb25tZW50c1xuICBjb25zdCBib2FyZEVsZW1lbnQgPSBib2FyZCBhcyBIVE1MRWxlbWVudFxuICBjb25zdCB3aWR0aE1hdGNoID0gYm9hcmRFbGVtZW50LnN0eWxlLmNzc1RleHQubWF0Y2goL3dpZHRoOlxccyooWzAtOS5dKylweC8pXG4gIGNvbnN0IGJvYXJkV2lkdGggPSB3aWR0aE1hdGNoXG4gICAgPyBOdW1iZXIucGFyc2VGbG9hdCh3aWR0aE1hdGNoWzFdKVxuICAgIDogZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGJvYXJkKS53aWR0aFxuICBjb25zdCBzcXVhcmVTaXplID0gYm9hcmRXaWR0aCAvIDhcbiAgY29uc3QgcGxheWVyQ29sb3IgPSBnZXRQbGF5ZXJDb2xvcigpXG5cbiAgY29uc3QgcGllY2VzID0gYm9hcmQucXVlcnlTZWxlY3RvckFsbChEb21TZWxlY3Rvci5QSUVDRSlcbiAgY29uc3QgcG9zaXRpb25zOiBQaWVjZVBvc2l0aW9uW10gPSBbXVxuXG4gIGZvciAoY29uc3QgcGllY2Ugb2YgcGllY2VzKSB7XG4gICAgLy8gRXh0cmFjdCBjb2xvciBhbmQgdHlwZSBmcm9tIGNsYXNzXG4gICAgY29uc3QgY2xhc3NlcyA9IHBpZWNlLmNsYXNzTmFtZS5zcGxpdCgnICcpXG4gICAgY29uc3QgY29sb3JTdHIgPSBjbGFzc2VzWzBdXG4gICAgY29uc3QgdHlwZVN0ciA9IGNsYXNzZXNbMV1cblxuICAgIC8vIE1hcCB0byBlbnVtc1xuICAgIGNvbnN0IGNvbG9yID0gY29sb3JTdHIgPT09ICd3aGl0ZScgPyBQbGF5ZXJDb2xvci5XSElURSA6IFBsYXllckNvbG9yLkJMQUNLXG4gICAgY29uc3QgdHlwZSA9IHR5cGVTdHIgYXMgUGllY2VUeXBlXG5cbiAgICAvLyBFeHRyYWN0IHBvc2l0aW9uIGZyb20gdHJhbnNmb3JtXG4gICAgY29uc3QgdHJhbnNmb3JtID0gKHBpZWNlIGFzIEhUTUxFbGVtZW50KS5zdHlsZS50cmFuc2Zvcm1cbiAgICBjb25zdCBtYXRjaCA9IHRyYW5zZm9ybS5tYXRjaCgvdHJhbnNsYXRlXFwoKFswLTkuXSspcHgsP1xccyooWzAtOS5dKylweD9cXCkvKVxuICAgIGlmICghbWF0Y2gpIGNvbnRpbnVlXG5cbiAgICAvLyBUcmFuc2Zvcm0gZ2l2ZXMgYm90dG9tLWxlZnQgY29ybmVyLCBjb252ZXJ0IHRvIGNlbnRlclxuICAgIGNvbnN0IHggPSBOdW1iZXIucGFyc2VGbG9hdChtYXRjaFsxXSkgKyBzcXVhcmVTaXplIC8gMlxuICAgIGNvbnN0IHkgPSBOdW1iZXIucGFyc2VGbG9hdChtYXRjaFsyXSkgLSBzcXVhcmVTaXplIC8gMlxuXG4gICAgY29uc3Qgc3F1YXJlID0gcGl4ZWxzVG9TcXVhcmUoeyB4LCB5IH0sIHNxdWFyZVNpemUsIHBsYXllckNvbG9yKVxuICAgIHBvc2l0aW9ucy5wdXNoKHsgc3F1YXJlLCBjb2xvciwgdHlwZSB9KVxuICB9XG5cbiAgcmV0dXJuIHBvc2l0aW9uc1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd2FpdEZvckVsZW1lbnQoc2VsZWN0b3I6IHN0cmluZyk6IFByb21pc2U8RWxlbWVudD4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICBjb25zdCBlbGVtZW50ID0gcXVlcnlTZWxlY3RvcihzZWxlY3RvcilcbiAgICBpZiAoZWxlbWVudCkge1xuICAgICAgcmVzb2x2ZShlbGVtZW50KVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gcXVlcnlTZWxlY3RvcihzZWxlY3RvcilcbiAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgIG9ic2VydmVyLmRpc2Nvbm5lY3QoKVxuICAgICAgICByZXNvbHZlKGVsZW1lbnQpXG4gICAgICB9XG4gICAgfSlcblxuICAgIG9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuYm9keSwge1xuICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgc3VidHJlZTogdHJ1ZSxcbiAgICB9KVxuICB9KVxufVxuIiwiaW1wb3J0IHsgdHlwZSBQaWVjZVR5cGUsIFBsYXllckNvbG9yLCBRdWFkcmFudCB9IGZyb20gJy4uL2NvbnN0YW50cydcblxuZXhwb3J0IGludGVyZmFjZSBQaWVjZVBvc2l0aW9uIHtcbiAgc3F1YXJlOiBzdHJpbmdcbiAgY29sb3I6IFBsYXllckNvbG9yXG4gIHR5cGU6IFBpZWNlVHlwZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyUXVhZHJhbnQocGllY2VzOiBQaWVjZVBvc2l0aW9uW10sIHF1YWRyYW50OiBRdWFkcmFudCk6IFBpZWNlUG9zaXRpb25bXSB7XG4gIHJldHVybiBwaWVjZXMuZmlsdGVyKChwaWVjZSkgPT4ge1xuICAgIC8vIFZhbGlkYXRlIHNxdWFyZSBmb3JtYXRcbiAgICBpZiAoIXBpZWNlLnNxdWFyZSB8fCBwaWVjZS5zcXVhcmUubGVuZ3RoIDwgMikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHNxdWFyZSBmb3JtYXQ6ICR7cGllY2Uuc3F1YXJlfWApXG4gICAgfVxuXG4gICAgY29uc3QgZmlsZSA9IHBpZWNlLnNxdWFyZVswXVxuICAgIGNvbnN0IHJhbmsgPSBOdW1iZXIucGFyc2VJbnQocGllY2Uuc3F1YXJlWzFdLCAxMClcblxuICAgIC8vIFZhbGlkYXRlIGZpbGUgYW5kIHJhbmtcbiAgICBpZiAoZmlsZSA8ICdhJyB8fCBmaWxlID4gJ2gnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgZmlsZTogJHtmaWxlfWApXG4gICAgfVxuICAgIGlmIChOdW1iZXIuaXNOYU4ocmFuaykgfHwgcmFuayA8IDEgfHwgcmFuayA+IDgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCByYW5rOiAke3Jhbmt9YClcbiAgICB9XG5cbiAgICAvLyBEZXRlcm1pbmUgZmlsZSByYW5nZSAoa2luZy1zaWRlOiBlLWgsIHF1ZWVuLXNpZGU6IGEtZClcbiAgICBjb25zdCBpc0tpbmdTaWRlID0gZmlsZSA+PSAnZSdcblxuICAgIC8vIERldGVybWluZSByYW5rIHJhbmdlICh3aGl0ZTogMS00LCBibGFjazogNS04KVxuICAgIGNvbnN0IGlzV2hpdGVSYW5rcyA9IHJhbmsgPj0gMSAmJiByYW5rIDw9IDRcblxuICAgIC8vIE1hdGNoIHF1YWRyYW50XG4gICAgaWYgKHF1YWRyYW50ID09PSBRdWFkcmFudC5XSElURV9LSU5HKSByZXR1cm4gaXNLaW5nU2lkZSAmJiBpc1doaXRlUmFua3NcbiAgICBpZiAocXVhZHJhbnQgPT09IFF1YWRyYW50LldISVRFX1FVRUVOKSByZXR1cm4gIWlzS2luZ1NpZGUgJiYgaXNXaGl0ZVJhbmtzXG4gICAgaWYgKHF1YWRyYW50ID09PSBRdWFkcmFudC5CTEFDS19LSU5HKSByZXR1cm4gaXNLaW5nU2lkZSAmJiAhaXNXaGl0ZVJhbmtzXG4gICAgaWYgKHF1YWRyYW50ID09PSBRdWFkcmFudC5CTEFDS19RVUVFTikgcmV0dXJuICFpc0tpbmdTaWRlICYmICFpc1doaXRlUmFua3NcblxuICAgIHJldHVybiBmYWxzZVxuICB9KVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEdyb3VwZWRQaWVjZXMge1xuICBjb2xvcjogUGxheWVyQ29sb3JcbiAgdHlwZTogc3RyaW5nXG4gIHNxdWFyZXM6IHN0cmluZ1tdXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBncm91cEJ5Q29sb3JBbmRUeXBlKHBpZWNlczogUGllY2VQb3NpdGlvbltdKTogR3JvdXBlZFBpZWNlc1tdIHtcbiAgY29uc3QgZ3JvdXBzID0gbmV3IE1hcDxzdHJpbmcsIEdyb3VwZWRQaWVjZXM+KClcblxuICBmb3IgKGNvbnN0IHBpZWNlIG9mIHBpZWNlcykge1xuICAgIC8vIFZhbGlkYXRlIHJlcXVpcmVkIHByb3BlcnRpZXNcbiAgICBpZiAoIXBpZWNlLnNxdWFyZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQaWVjZSBtaXNzaW5nIHNxdWFyZSBwcm9wZXJ0eScpXG4gICAgfVxuICAgIGlmICghcGllY2UuY29sb3IpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUGllY2UgbWlzc2luZyBjb2xvciBwcm9wZXJ0eScpXG4gICAgfVxuICAgIGlmICghcGllY2UudHlwZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQaWVjZSBtaXNzaW5nIHR5cGUgcHJvcGVydHknKVxuICAgIH1cblxuICAgIGNvbnN0IGtleSA9IGAke3BpZWNlLmNvbG9yfS0ke3BpZWNlLnR5cGV9YFxuXG4gICAgaWYgKCFncm91cHMuaGFzKGtleSkpIHtcbiAgICAgIGdyb3Vwcy5zZXQoa2V5LCB7XG4gICAgICAgIGNvbG9yOiBwaWVjZS5jb2xvcixcbiAgICAgICAgdHlwZTogcGllY2UudHlwZSxcbiAgICAgICAgc3F1YXJlczogW10sXG4gICAgICB9KVxuICAgIH1cblxuICAgIGdyb3Vwcy5nZXQoa2V5KT8uc3F1YXJlcy5wdXNoKHBpZWNlLnNxdWFyZSlcbiAgfVxuXG4gIC8vIFNvcnQgZ3JvdXBzIGJ5IGNvbG9yICh3aGl0ZSBmaXJzdCkgdGhlbiB0eXBlXG4gIHJldHVybiBBcnJheS5mcm9tKGdyb3Vwcy52YWx1ZXMoKSkuc29ydCgoYSwgYikgPT4ge1xuICAgIGlmIChhLmNvbG9yICE9PSBiLmNvbG9yKSB7XG4gICAgICByZXR1cm4gYS5jb2xvciA9PT0gUGxheWVyQ29sb3IuV0hJVEUgPyAtMSA6IDFcbiAgICB9XG4gICAgcmV0dXJuIGEudHlwZS5sb2NhbGVDb21wYXJlKGIudHlwZSlcbiAgfSlcbn1cbiIsImltcG9ydCB7IHR5cGUgUGllY2VQb3NpdGlvbiwgZ3JvdXBCeUNvbG9yQW5kVHlwZSB9IGZyb20gJy4vcGllY2VHcm91cGluZydcblxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlUXVhZHJhbnRUZXh0KHBpZWNlczogUGllY2VQb3NpdGlvbltdKTogc3RyaW5nIHtcbiAgaWYgKHBpZWNlcy5sZW5ndGggPT09IDApIHJldHVybiAnJ1xuXG4gIGNvbnN0IGdyb3VwcyA9IGdyb3VwQnlDb2xvckFuZFR5cGUocGllY2VzKVxuICBjb25zdCBzZW50ZW5jZXM6IHN0cmluZ1tdID0gW11cblxuICBmb3IgKGNvbnN0IGdyb3VwIG9mIGdyb3Vwcykge1xuICAgIGNvbnN0IGNvbG9yTmFtZSA9IGdyb3VwLmNvbG9yXG4gICAgY29uc3QgdHlwZU5hbWUgPSBncm91cC5zcXVhcmVzLmxlbmd0aCA+IDEgPyBgJHtncm91cC50eXBlfXNgIDogZ3JvdXAudHlwZVxuXG4gICAgaWYgKGdyb3VwLnNxdWFyZXMubGVuZ3RoID4gMSkge1xuICAgICAgLy8gTXVsdGlwbGUgcGllY2VzOiBcIndoaXRlIHBhd25zIG9uIGEyLCBiMlwiXG4gICAgICBjb25zdCBzcXVhcmVzID0gZ3JvdXAuc3F1YXJlcy5qb2luKCcsICcpXG4gICAgICBzZW50ZW5jZXMucHVzaChgJHtjb2xvck5hbWV9ICR7dHlwZU5hbWV9IG9uICR7c3F1YXJlc31gKVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTaW5nbGUgcGllY2U6IFwiZTEgd2hpdGUga2luZ1wiXG4gICAgICBzZW50ZW5jZXMucHVzaChgJHtncm91cC5zcXVhcmVzWzBdfSAke2NvbG9yTmFtZX0gJHtncm91cC50eXBlfWApXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGAke3NlbnRlbmNlcy5qb2luKCcuICcpfS5gXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZUFsbFBpZWNlc1RleHQocGllY2VzOiBQaWVjZVBvc2l0aW9uW10pOiBzdHJpbmcge1xuICByZXR1cm4gZ2VuZXJhdGVRdWFkcmFudFRleHQocGllY2VzKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVDb2xvclRleHQocGllY2VzOiBQaWVjZVBvc2l0aW9uW10sIGNvbG9yOiAnd2hpdGUnIHwgJ2JsYWNrJyk6IHN0cmluZyB7XG4gIGNvbnN0IGZpbHRlcmVkID0gcGllY2VzLmZpbHRlcigocCkgPT4gcC5jb2xvciA9PT0gY29sb3IpXG4gIHJldHVybiBnZW5lcmF0ZVF1YWRyYW50VGV4dChmaWx0ZXJlZClcbn1cbiIsIi8qKlxuICogV3JhcHBlciBtb2R1bGUgZm9yIGxvY2FsU3RvcmFnZSB0byBhbGxvdyBtb2NraW5nIHdpdGggc2ltb25lXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEl0ZW0oa2V5OiBzdHJpbmcpOiBzdHJpbmcgfCBudWxsIHtcbiAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEl0ZW0oa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCB2YWx1ZSlcbn1cbiIsImltcG9ydCB0eXBlIHsgU2V0dGluZ3MgfSBmcm9tICcuL3R5cGVzJ1xuXG5leHBvcnQgY29uc3QgZGVmYXVsdFNldHRpbmdzOiBTZXR0aW5ncyA9IHtcbiAgc3BlYWtSYXRlOiAwLjUsXG4gIHBpZWNlc0xpc3RFbmFibGVkOiBmYWxzZSxcbiAgZGl2aWRlcnNFbmFibGVkOiBmYWxzZSxcbiAgY3VzdG9tQm9hcmRFbmFibGVkOiBmYWxzZSxcbiAgb2JmdXNjYXRpb25zRW5hYmxlZDogZmFsc2UsXG4gIHBhcmFsbGF4OiAwLFxuICBob3Zlck1vZGU6ICdvZmYnLFxuICBwaWVjZVN0eWxlOiAnaWNvbnMnLFxuICBibHVyOiAwLFxuICBibGFja1NlZ21lbnRzOiAnbm9uZScsXG4gIGJsYWNrU2VnbWVudHNUaW1pbmc6ICdyb3RhdGUtMTBzJyxcbiAgZmxhc2hNb2RlRW5hYmxlZDogZmFsc2UsXG4gIGZsYXNoRHVyYXRpb246IDEsXG4gIGZsYXNoSW50ZXJ2YWw6IDMsXG59XG4iLCJpbXBvcnQgeyBlZmZlY3QsIHNpZ25hbCB9IGZyb20gJ0BwcmVhY3Qvc2lnbmFscy1jb3JlJ1xuaW1wb3J0ICogYXMgc3RvcmFnZSBmcm9tICcuLi9wbGF0Zm9ybS9zdG9yYWdlJ1xuaW1wb3J0IHsgZGVmYXVsdFNldHRpbmdzIH0gZnJvbSAnLi9kZWZhdWx0cydcbmltcG9ydCB0eXBlIHsgU2V0dGluZ3MgfSBmcm9tICcuL3R5cGVzJ1xuXG5jb25zdCBTVE9SQUdFX0tFWSA9ICdsaWNoZXNzLWJvYXJkLXNwZWFrZXItc2V0dGluZ3MnXG5cbmV4cG9ydCBjb25zdCBzZXR0aW5ncyA9IHtcbiAgc3BlYWtSYXRlOiBzaWduYWwoZGVmYXVsdFNldHRpbmdzLnNwZWFrUmF0ZSksXG4gIHBpZWNlc0xpc3RFbmFibGVkOiBzaWduYWwoZGVmYXVsdFNldHRpbmdzLnBpZWNlc0xpc3RFbmFibGVkKSxcbiAgZGl2aWRlcnNFbmFibGVkOiBzaWduYWwoZGVmYXVsdFNldHRpbmdzLmRpdmlkZXJzRW5hYmxlZCksXG4gIGN1c3RvbUJvYXJkRW5hYmxlZDogc2lnbmFsKGRlZmF1bHRTZXR0aW5ncy5jdXN0b21Cb2FyZEVuYWJsZWQpLFxuICBvYmZ1c2NhdGlvbnNFbmFibGVkOiBzaWduYWwoZGVmYXVsdFNldHRpbmdzLm9iZnVzY2F0aW9uc0VuYWJsZWQpLFxuICBwYXJhbGxheDogc2lnbmFsKGRlZmF1bHRTZXR0aW5ncy5wYXJhbGxheCksXG4gIGhvdmVyTW9kZTogc2lnbmFsKGRlZmF1bHRTZXR0aW5ncy5ob3Zlck1vZGUpLFxuICBwaWVjZVN0eWxlOiBzaWduYWwoZGVmYXVsdFNldHRpbmdzLnBpZWNlU3R5bGUpLFxuICBibHVyOiBzaWduYWwoZGVmYXVsdFNldHRpbmdzLmJsdXIpLFxuICBibGFja1NlZ21lbnRzOiBzaWduYWwoZGVmYXVsdFNldHRpbmdzLmJsYWNrU2VnbWVudHMpLFxuICBibGFja1NlZ21lbnRzVGltaW5nOiBzaWduYWwoZGVmYXVsdFNldHRpbmdzLmJsYWNrU2VnbWVudHNUaW1pbmcpLFxuICBmbGFzaE1vZGVFbmFibGVkOiBzaWduYWwoZGVmYXVsdFNldHRpbmdzLmZsYXNoTW9kZUVuYWJsZWQpLFxuICBmbGFzaER1cmF0aW9uOiBzaWduYWwoZGVmYXVsdFNldHRpbmdzLmZsYXNoRHVyYXRpb24pLFxuICBmbGFzaEludGVydmFsOiBzaWduYWwoZGVmYXVsdFNldHRpbmdzLmZsYXNoSW50ZXJ2YWwpLFxufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9hZFNldHRpbmdzKCk6IHZvaWQge1xuICBjb25zdCBzdG9yZWQgPSBzdG9yYWdlLmdldEl0ZW0oU1RPUkFHRV9LRVkpXG4gIGlmICghc3RvcmVkKSByZXR1cm5cblxuICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShzdG9yZWQpIGFzIFBhcnRpYWw8U2V0dGluZ3M+XG4gIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKGRhdGEpKSB7XG4gICAgY29uc3Qgc2V0dGluZ0tleSA9IGtleSBhcyBrZXlvZiBTZXR0aW5nc1xuICAgIGlmIChzZXR0aW5nc1tzZXR0aW5nS2V5XSkge1xuICAgICAgLy8gYmlvbWUtaWdub3JlIGxpbnQvc3VzcGljaW91cy9ub0V4cGxpY2l0QW55OiBTZXR0aW5ncyB0eXBlIGlzIGR5bmFtaWNcbiAgICAgIHNldHRpbmdzW3NldHRpbmdLZXldLnZhbHVlID0gZGF0YVtzZXR0aW5nS2V5XSBhcyBhbnlcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNhdmVTZXR0aW5ncygpOiB2b2lkIHtcbiAgY29uc3QgZGF0YTogUGFydGlhbDxTZXR0aW5ncz4gPSB7fVxuICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhzZXR0aW5ncykpIHtcbiAgICBjb25zdCBzZXR0aW5nS2V5ID0ga2V5IGFzIGtleW9mIHR5cGVvZiBzZXR0aW5nc1xuICAgIC8vIGJpb21lLWlnbm9yZSBsaW50L3N1c3BpY2lvdXMvbm9FeHBsaWNpdEFueTogU2V0dGluZ3MgdHlwZSBpcyBkeW5hbWljXG4gICAgZGF0YVtzZXR0aW5nS2V5XSA9IHNldHRpbmdzW3NldHRpbmdLZXldLnZhbHVlIGFzIGFueVxuICB9XG4gIHN0b3JhZ2Uuc2V0SXRlbShTVE9SQUdFX0tFWSwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpXG59XG5cbi8vIEF1dG8tc2F2ZSBlZmZlY3QgKHNob3VsZCBiZSBjYWxsZWQgb25jZSBkdXJpbmcgYXBwIGluaXRpYWxpemF0aW9uKVxuZXhwb3J0IGZ1bmN0aW9uIHNldHVwQXV0b1NhdmUoKTogdm9pZCB7XG4gIGVmZmVjdCgoKSA9PiB7XG4gICAgZm9yIChjb25zdCBzIG9mIE9iamVjdC52YWx1ZXMoc2V0dGluZ3MpKSB7XG4gICAgICBzLnZhbHVlXG4gICAgfVxuICAgIHNhdmVTZXR0aW5ncygpXG4gIH0pXG59XG4iLCJpbXBvcnQgeyBzcGVhaywgc3RvcFNwZWFraW5nIH0gZnJvbSAnLi4vYWRhcHRlcnMtc3BlZWNoL3NwZWVjaFN5bnRoZXNpemVyJ1xuaW1wb3J0IHsgUGxheWVyQ29sb3IsIHR5cGUgUXVhZHJhbnQsIFNwZWVjaENvbW1hbmQgfSBmcm9tICcuLi9jb25zdGFudHMnXG5pbXBvcnQgeyByZWFkUGllY2VQb3NpdGlvbnMgfSBmcm9tICcuLi9kb20vYm9hcmRSZWFkZXInXG5pbXBvcnQgeyBmaWx0ZXJRdWFkcmFudCB9IGZyb20gJy4uL3B1cmUvcGllY2VHcm91cGluZydcbmltcG9ydCB7IGdlbmVyYXRlQWxsUGllY2VzVGV4dCwgZ2VuZXJhdGVDb2xvclRleHQsIGdlbmVyYXRlUXVhZHJhbnRUZXh0IH0gZnJvbSAnLi4vcHVyZS9zcGVlY2hUZXh0J1xuaW1wb3J0IHsgc2V0dGluZ3MgfSBmcm9tICcuLi9zZXR0aW5ncy9zZXR0aW5nc1N0b3JlJ1xuXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlU3BlZWNoQ29tbWFuZChjb21tYW5kOiBzdHJpbmcpOiB2b2lkIHtcbiAgaWYgKGNvbW1hbmQgPT09IFNwZWVjaENvbW1hbmQuU1RPUCkge1xuICAgIHN0b3BTcGVha2luZygpXG4gICAgcmV0dXJuXG4gIH1cblxuICBjb25zdCBwaWVjZXMgPSByZWFkUGllY2VQb3NpdGlvbnMoKVxuXG4gIGlmIChjb21tYW5kID09PSBTcGVlY2hDb21tYW5kLkFMTCkge1xuICAgIGNvbnN0IHRleHQgPSBnZW5lcmF0ZUFsbFBpZWNlc1RleHQocGllY2VzKVxuICAgIHNwZWFrKHRleHQsIHNldHRpbmdzLnNwZWFrUmF0ZS52YWx1ZSlcbiAgICByZXR1cm5cbiAgfVxuXG4gIGlmIChjb21tYW5kID09PSBTcGVlY2hDb21tYW5kLldISVRFIHx8IGNvbW1hbmQgPT09IFNwZWVjaENvbW1hbmQuQkxBQ0spIHtcbiAgICBjb25zdCBjb2xvciA9IGNvbW1hbmQgPT09IFNwZWVjaENvbW1hbmQuV0hJVEUgPyBQbGF5ZXJDb2xvci5XSElURSA6IFBsYXllckNvbG9yLkJMQUNLXG4gICAgY29uc3QgdGV4dCA9IGdlbmVyYXRlQ29sb3JUZXh0KHBpZWNlcywgY29sb3IpXG4gICAgc3BlYWsodGV4dCwgc2V0dGluZ3Muc3BlYWtSYXRlLnZhbHVlKVxuICAgIHJldHVyblxuICB9XG5cbiAgLy8gUXVhZHJhbnQgY29tbWFuZHM6IHdrLCB3cSwgYmssIGJxXG4gIGNvbnN0IHF1YWRyYW50ID0gY29tbWFuZCBhcyBRdWFkcmFudFxuICBjb25zdCBmaWx0ZXJlZCA9IGZpbHRlclF1YWRyYW50KHBpZWNlcywgcXVhZHJhbnQpXG4gIGNvbnN0IHRleHQgPSBnZW5lcmF0ZVF1YWRyYW50VGV4dChmaWx0ZXJlZClcbiAgc3BlYWsodGV4dCwgc2V0dGluZ3Muc3BlYWtSYXRlLnZhbHVlKVxufVxuIiwiaW1wb3J0IHsgRG9tU2VsZWN0b3IsIEtFWUJPQVJEX0NPTU1BTkRfTUFQLCB0eXBlIEtleWJvYXJkQ29tbWFuZCB9IGZyb20gJy4uL2NvbnN0YW50cydcbmltcG9ydCB7IGhhbmRsZVNwZWVjaENvbW1hbmQgfSBmcm9tICcuLi9oYW5kbGVycy9oYW5kbGVTcGVlY2hDb21tYW5kJ1xuaW1wb3J0IHsgcXVlcnlTZWxlY3RvciB9IGZyb20gJy4uL3BsYXRmb3JtL2RvbSdcblxuaW50ZXJmYWNlIElucHV0RWxlbWVudFdpdGhDbGVhbnVwIGV4dGVuZHMgSFRNTElucHV0RWxlbWVudCB7XG4gIF9fa2V5Ym9hcmRDb21tYW5kQ2xlYW51cD86ICgpID0+IHZvaWRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldHVwS2V5Ym9hcmRDb21tYW5kcygpOiB2b2lkIHtcbiAgY29uc3QgaW5wdXQgPSBxdWVyeVNlbGVjdG9yKERvbVNlbGVjdG9yLktFWUJPQVJEX0lOUFVUKSBhcyBJbnB1dEVsZW1lbnRXaXRoQ2xlYW51cCB8IG51bGxcbiAgaWYgKCFpbnB1dCkgcmV0dXJuXG5cbiAgY29uc3QgaGFuZGxlSW5wdXQgPSAoZTogRXZlbnQpID0+IHtcbiAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50XG4gICAgY29uc3QgdmFsdWUgPSB0YXJnZXQudmFsdWVcblxuICAgIC8vIENoZWNrIGZvciBzcGVlY2ggY29tbWFuZHNcbiAgICBjb25zdCBjb21tYW5kID0gS0VZQk9BUkRfQ09NTUFORF9NQVAuZ2V0KHZhbHVlIGFzIEtleWJvYXJkQ29tbWFuZClcbiAgICBpZiAoY29tbWFuZCkge1xuICAgICAgaGFuZGxlU3BlZWNoQ29tbWFuZChjb21tYW5kKVxuICAgICAgdGFyZ2V0LnZhbHVlID0gJydcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIC8vIENoZWNrIGZvciBkcmF3aW5nIGNvbW1hbmRzIChoYW5kbGVkIGVsc2V3aGVyZSlcbiAgICBpZiAodmFsdWUuc3RhcnRzV2l0aCgnLScpKSB7XG4gICAgICAvLyBXaWxsIGJlIGhhbmRsZWQgYnkgZHJhd2luZyBoYW5kbGVyXG4gICAgICByZXR1cm5cbiAgICB9XG4gIH1cblxuICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGhhbmRsZUlucHV0KVxuXG4gIC8vIFN0b3JlIGNsZWFudXAgZnVuY3Rpb24gb24gdGhlIGVsZW1lbnQgZm9yIGxhdGVyIHJlbW92YWxcbiAgaW5wdXQuX19rZXlib2FyZENvbW1hbmRDbGVhbnVwID0gKCkgPT4ge1xuICAgIGlucHV0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2lucHV0JywgaGFuZGxlSW5wdXQpXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRlYXJkb3duS2V5Ym9hcmRDb21tYW5kcygpOiB2b2lkIHtcbiAgY29uc3QgaW5wdXQgPSBxdWVyeVNlbGVjdG9yKERvbVNlbGVjdG9yLktFWUJPQVJEX0lOUFVUKSBhcyBJbnB1dEVsZW1lbnRXaXRoQ2xlYW51cCB8IG51bGxcbiAgaWYgKGlucHV0Py5fX2tleWJvYXJkQ29tbWFuZENsZWFudXApIHtcbiAgICBpbnB1dC5fX2tleWJvYXJkQ29tbWFuZENsZWFudXAoKVxuICAgIGlucHV0Ll9fa2V5Ym9hcmRDb21tYW5kQ2xlYW51cCA9IHVuZGVmaW5lZFxuICB9XG59XG4iLCJ2YXIgbixsLHUsdCxpLHIsbyxlLGYsYyxhLHMsaCxwLHYseSxkPXt9LHc9W10sXz0vYWNpdHxleCg/OnN8Z3xufHB8JCl8cnBofGdyaWR8b3dzfG1uY3xudHd8aW5lW2NoXXx6b298Xm9yZHxpdGVyYS9pLGc9QXJyYXkuaXNBcnJheTtmdW5jdGlvbiBtKG4sbCl7Zm9yKHZhciB1IGluIGwpblt1XT1sW3VdO3JldHVybiBufWZ1bmN0aW9uIGIobil7biYmbi5wYXJlbnROb2RlJiZuLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobil9ZnVuY3Rpb24gayhsLHUsdCl7dmFyIGkscixvLGU9e307Zm9yKG8gaW4gdSlcImtleVwiPT1vP2k9dVtvXTpcInJlZlwiPT1vP3I9dVtvXTplW29dPXVbb107aWYoYXJndW1lbnRzLmxlbmd0aD4yJiYoZS5jaGlsZHJlbj1hcmd1bWVudHMubGVuZ3RoPjM/bi5jYWxsKGFyZ3VtZW50cywyKTp0KSxcImZ1bmN0aW9uXCI9PXR5cGVvZiBsJiZudWxsIT1sLmRlZmF1bHRQcm9wcylmb3IobyBpbiBsLmRlZmF1bHRQcm9wcyl2b2lkIDA9PT1lW29dJiYoZVtvXT1sLmRlZmF1bHRQcm9wc1tvXSk7cmV0dXJuIHgobCxlLGkscixudWxsKX1mdW5jdGlvbiB4KG4sdCxpLHIsbyl7dmFyIGU9e3R5cGU6bixwcm9wczp0LGtleTppLHJlZjpyLF9fazpudWxsLF9fOm51bGwsX19iOjAsX19lOm51bGwsX19jOm51bGwsY29uc3RydWN0b3I6dm9pZCAwLF9fdjpudWxsPT1vPysrdTpvLF9faTotMSxfX3U6MH07cmV0dXJuIG51bGw9PW8mJm51bGwhPWwudm5vZGUmJmwudm5vZGUoZSksZX1mdW5jdGlvbiBNKCl7cmV0dXJue2N1cnJlbnQ6bnVsbH19ZnVuY3Rpb24gUyhuKXtyZXR1cm4gbi5jaGlsZHJlbn1mdW5jdGlvbiBDKG4sbCl7dGhpcy5wcm9wcz1uLHRoaXMuY29udGV4dD1sfWZ1bmN0aW9uICQobixsKXtpZihudWxsPT1sKXJldHVybiBuLl9fPyQobi5fXyxuLl9faSsxKTpudWxsO2Zvcih2YXIgdTtsPG4uX19rLmxlbmd0aDtsKyspaWYobnVsbCE9KHU9bi5fX2tbbF0pJiZudWxsIT11Ll9fZSlyZXR1cm4gdS5fX2U7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2Ygbi50eXBlPyQobik6bnVsbH1mdW5jdGlvbiBJKG4pe2lmKG4uX19QJiZuLl9fZCl7dmFyIHU9bi5fX3YsdD11Ll9fZSxpPVtdLHI9W10sbz1tKHt9LHUpO28uX192PXUuX192KzEsbC52bm9kZSYmbC52bm9kZShvKSxxKG4uX19QLG8sdSxuLl9fbixuLl9fUC5uYW1lc3BhY2VVUkksMzImdS5fX3U/W3RdOm51bGwsaSxudWxsPT10PyQodSk6dCwhISgzMiZ1Ll9fdSksciksby5fX3Y9dS5fX3Ysby5fXy5fX2tbby5fX2ldPW8sRChpLG8sciksdS5fX2U9dS5fXz1udWxsLG8uX19lIT10JiZQKG8pfX1mdW5jdGlvbiBQKG4pe2lmKG51bGwhPShuPW4uX18pJiZudWxsIT1uLl9fYylyZXR1cm4gbi5fX2U9bi5fX2MuYmFzZT1udWxsLG4uX19rLnNvbWUoZnVuY3Rpb24obCl7aWYobnVsbCE9bCYmbnVsbCE9bC5fX2UpcmV0dXJuIG4uX19lPW4uX19jLmJhc2U9bC5fX2V9KSxQKG4pfWZ1bmN0aW9uIEEobil7KCFuLl9fZCYmKG4uX19kPSEwKSYmaS5wdXNoKG4pJiYhSC5fX3IrK3x8ciE9bC5kZWJvdW5jZVJlbmRlcmluZykmJigocj1sLmRlYm91bmNlUmVuZGVyaW5nKXx8bykoSCl9ZnVuY3Rpb24gSCgpe3RyeXtmb3IodmFyIG4sbD0xO2kubGVuZ3RoOylpLmxlbmd0aD5sJiZpLnNvcnQoZSksbj1pLnNoaWZ0KCksbD1pLmxlbmd0aCxJKG4pfWZpbmFsbHl7aS5sZW5ndGg9SC5fX3I9MH19ZnVuY3Rpb24gTChuLGwsdSx0LGkscixvLGUsZixjLGEpe3ZhciBzLGgscCx2LHksXyxnLG09dCYmdC5fX2t8fHcsYj1sLmxlbmd0aDtmb3IoZj1UKHUsbCxtLGYsYikscz0wO3M8YjtzKyspbnVsbCE9KHA9dS5fX2tbc10pJiYoaD0tMSE9cC5fX2kmJm1bcC5fX2ldfHxkLHAuX19pPXMsXz1xKG4scCxoLGkscixvLGUsZixjLGEpLHY9cC5fX2UscC5yZWYmJmgucmVmIT1wLnJlZiYmKGgucmVmJiZKKGgucmVmLG51bGwscCksYS5wdXNoKHAucmVmLHAuX19jfHx2LHApKSxudWxsPT15JiZudWxsIT12JiYoeT12KSwoZz0hISg0JnAuX191KSl8fGguX19rPT09cC5fX2s/KGY9aihwLGYsbixnKSxnJiZoLl9fZSYmKGguX19lPW51bGwpKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBwLnR5cGUmJnZvaWQgMCE9PV8/Zj1fOnYmJihmPXYubmV4dFNpYmxpbmcpLHAuX191Jj0tNyk7cmV0dXJuIHUuX19lPXksZn1mdW5jdGlvbiBUKG4sbCx1LHQsaSl7dmFyIHIsbyxlLGYsYyxhPXUubGVuZ3RoLHM9YSxoPTA7Zm9yKG4uX19rPW5ldyBBcnJheShpKSxyPTA7cjxpO3IrKyludWxsIT0obz1sW3JdKSYmXCJib29sZWFuXCIhPXR5cGVvZiBvJiZcImZ1bmN0aW9uXCIhPXR5cGVvZiBvPyhcInN0cmluZ1wiPT10eXBlb2Ygb3x8XCJudW1iZXJcIj09dHlwZW9mIG98fFwiYmlnaW50XCI9PXR5cGVvZiBvfHxvLmNvbnN0cnVjdG9yPT1TdHJpbmc/bz1uLl9fa1tyXT14KG51bGwsbyxudWxsLG51bGwsbnVsbCk6ZyhvKT9vPW4uX19rW3JdPXgoUyx7Y2hpbGRyZW46b30sbnVsbCxudWxsLG51bGwpOnZvaWQgMD09PW8uY29uc3RydWN0b3ImJm8uX19iPjA/bz1uLl9fa1tyXT14KG8udHlwZSxvLnByb3BzLG8ua2V5LG8ucmVmP28ucmVmOm51bGwsby5fX3YpOm4uX19rW3JdPW8sZj1yK2gsby5fXz1uLG8uX19iPW4uX19iKzEsZT1udWxsLC0xIT0oYz1vLl9faT1PKG8sdSxmLHMpKSYmKHMtLSwoZT11W2NdKSYmKGUuX191fD0yKSksbnVsbD09ZXx8bnVsbD09ZS5fX3Y/KC0xPT1jJiYoaT5hP2gtLTppPGEmJmgrKyksXCJmdW5jdGlvblwiIT10eXBlb2Ygby50eXBlJiYoby5fX3V8PTQpKTpjIT1mJiYoYz09Zi0xP2gtLTpjPT1mKzE/aCsrOihjPmY/aC0tOmgrKyxvLl9fdXw9NCkpKTpuLl9fa1tyXT1udWxsO2lmKHMpZm9yKHI9MDtyPGE7cisrKW51bGwhPShlPXVbcl0pJiYwPT0oMiZlLl9fdSkmJihlLl9fZT09dCYmKHQ9JChlKSksSyhlLGUpKTtyZXR1cm4gdH1mdW5jdGlvbiBqKG4sbCx1LHQpe3ZhciBpLHI7aWYoXCJmdW5jdGlvblwiPT10eXBlb2Ygbi50eXBlKXtmb3IoaT1uLl9fayxyPTA7aSYmcjxpLmxlbmd0aDtyKyspaVtyXSYmKGlbcl0uX189bixsPWooaVtyXSxsLHUsdCkpO3JldHVybiBsfW4uX19lIT1sJiYodCYmKGwmJm4udHlwZSYmIWwucGFyZW50Tm9kZSYmKGw9JChuKSksdS5pbnNlcnRCZWZvcmUobi5fX2UsbHx8bnVsbCkpLGw9bi5fX2UpO2Rve2w9bCYmbC5uZXh0U2libGluZ313aGlsZShudWxsIT1sJiY4PT1sLm5vZGVUeXBlKTtyZXR1cm4gbH1mdW5jdGlvbiBGKG4sbCl7cmV0dXJuIGw9bHx8W10sbnVsbD09bnx8XCJib29sZWFuXCI9PXR5cGVvZiBufHwoZyhuKT9uLnNvbWUoZnVuY3Rpb24obil7RihuLGwpfSk6bC5wdXNoKG4pKSxsfWZ1bmN0aW9uIE8obixsLHUsdCl7dmFyIGkscixvLGU9bi5rZXksZj1uLnR5cGUsYz1sW3VdLGE9bnVsbCE9YyYmMD09KDImYy5fX3UpO2lmKG51bGw9PT1jJiZudWxsPT1lfHxhJiZlPT1jLmtleSYmZj09Yy50eXBlKXJldHVybiB1O2lmKHQ+KGE/MTowKSlmb3IoaT11LTEscj11KzE7aT49MHx8cjxsLmxlbmd0aDspaWYobnVsbCE9KGM9bFtvPWk+PTA/aS0tOnIrK10pJiYwPT0oMiZjLl9fdSkmJmU9PWMua2V5JiZmPT1jLnR5cGUpcmV0dXJuIG87cmV0dXJuLTF9ZnVuY3Rpb24geihuLGwsdSl7XCItXCI9PWxbMF0/bi5zZXRQcm9wZXJ0eShsLG51bGw9PXU/XCJcIjp1KTpuW2xdPW51bGw9PXU/XCJcIjpcIm51bWJlclwiIT10eXBlb2YgdXx8Xy50ZXN0KGwpP3U6dStcInB4XCJ9ZnVuY3Rpb24gTihuLGwsdSx0LGkpe3ZhciByLG87bjppZihcInN0eWxlXCI9PWwpaWYoXCJzdHJpbmdcIj09dHlwZW9mIHUpbi5zdHlsZS5jc3NUZXh0PXU7ZWxzZXtpZihcInN0cmluZ1wiPT10eXBlb2YgdCYmKG4uc3R5bGUuY3NzVGV4dD10PVwiXCIpLHQpZm9yKGwgaW4gdCl1JiZsIGluIHV8fHoobi5zdHlsZSxsLFwiXCIpO2lmKHUpZm9yKGwgaW4gdSl0JiZ1W2xdPT10W2xdfHx6KG4uc3R5bGUsbCx1W2xdKX1lbHNlIGlmKFwib1wiPT1sWzBdJiZcIm5cIj09bFsxXSlyPWwhPShsPWwucmVwbGFjZShzLFwiJDFcIikpLG89bC50b0xvd2VyQ2FzZSgpLGw9byBpbiBufHxcIm9uRm9jdXNPdXRcIj09bHx8XCJvbkZvY3VzSW5cIj09bD9vLnNsaWNlKDIpOmwuc2xpY2UoMiksbi5sfHwobi5sPXt9KSxuLmxbbCtyXT11LHU/dD91W2FdPXRbYV06KHVbYV09aCxuLmFkZEV2ZW50TGlzdGVuZXIobCxyP3Y6cCxyKSk6bi5yZW1vdmVFdmVudExpc3RlbmVyKGwscj92OnAscik7ZWxzZXtpZihcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI9PWkpbD1sLnJlcGxhY2UoL3hsaW5rKEh8OmgpLyxcImhcIikucmVwbGFjZSgvc05hbWUkLyxcInNcIik7ZWxzZSBpZihcIndpZHRoXCIhPWwmJlwiaGVpZ2h0XCIhPWwmJlwiaHJlZlwiIT1sJiZcImxpc3RcIiE9bCYmXCJmb3JtXCIhPWwmJlwidGFiSW5kZXhcIiE9bCYmXCJkb3dubG9hZFwiIT1sJiZcInJvd1NwYW5cIiE9bCYmXCJjb2xTcGFuXCIhPWwmJlwicm9sZVwiIT1sJiZcInBvcG92ZXJcIiE9bCYmbCBpbiBuKXRyeXtuW2xdPW51bGw9PXU/XCJcIjp1O2JyZWFrIG59Y2F0Y2gobil7fVwiZnVuY3Rpb25cIj09dHlwZW9mIHV8fChudWxsPT11fHwhMT09PXUmJlwiLVwiIT1sWzRdP24ucmVtb3ZlQXR0cmlidXRlKGwpOm4uc2V0QXR0cmlidXRlKGwsXCJwb3BvdmVyXCI9PWwmJjE9PXU/XCJcIjp1KSl9fWZ1bmN0aW9uIFYobil7cmV0dXJuIGZ1bmN0aW9uKHUpe2lmKHRoaXMubCl7dmFyIHQ9dGhpcy5sW3UudHlwZStuXTtpZihudWxsPT11W2NdKXVbY109aCsrO2Vsc2UgaWYodVtjXTx0W2FdKXJldHVybjtyZXR1cm4gdChsLmV2ZW50P2wuZXZlbnQodSk6dSl9fX1mdW5jdGlvbiBxKG4sdSx0LGkscixvLGUsZixjLGEpe3ZhciBzLGgscCx2LHksZCxfLGsseCxNLCQsSSxQLEEsSCxUPXUudHlwZTtpZih2b2lkIDAhPT11LmNvbnN0cnVjdG9yKXJldHVybiBudWxsOzEyOCZ0Ll9fdSYmKGM9ISEoMzImdC5fX3UpLG89W2Y9dS5fX2U9dC5fX2VdKSwocz1sLl9fYikmJnModSk7bjppZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBUKXRyeXtpZihrPXUucHJvcHMseD1ULnByb3RvdHlwZSYmVC5wcm90b3R5cGUucmVuZGVyLE09KHM9VC5jb250ZXh0VHlwZSkmJmlbcy5fX2NdLCQ9cz9NP00ucHJvcHMudmFsdWU6cy5fXzppLHQuX19jP189KGg9dS5fX2M9dC5fX2MpLl9fPWguX19FOih4P3UuX19jPWg9bmV3IFQoaywkKToodS5fX2M9aD1uZXcgQyhrLCQpLGguY29uc3RydWN0b3I9VCxoLnJlbmRlcj1RKSxNJiZNLnN1YihoKSxoLnN0YXRlfHwoaC5zdGF0ZT17fSksaC5fX249aSxwPWguX19kPSEwLGguX19oPVtdLGguX3NiPVtdKSx4JiZudWxsPT1oLl9fcyYmKGguX19zPWguc3RhdGUpLHgmJm51bGwhPVQuZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzJiYoaC5fX3M9PWguc3RhdGUmJihoLl9fcz1tKHt9LGguX19zKSksbShoLl9fcyxULmdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyhrLGguX19zKSkpLHY9aC5wcm9wcyx5PWguc3RhdGUsaC5fX3Y9dSxwKXgmJm51bGw9PVQuZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzJiZudWxsIT1oLmNvbXBvbmVudFdpbGxNb3VudCYmaC5jb21wb25lbnRXaWxsTW91bnQoKSx4JiZudWxsIT1oLmNvbXBvbmVudERpZE1vdW50JiZoLl9faC5wdXNoKGguY29tcG9uZW50RGlkTW91bnQpO2Vsc2V7aWYoeCYmbnVsbD09VC5nZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMmJmshPT12JiZudWxsIT1oLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMmJmguY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhrLCQpLHUuX192PT10Ll9fdnx8IWguX19lJiZudWxsIT1oLnNob3VsZENvbXBvbmVudFVwZGF0ZSYmITE9PT1oLnNob3VsZENvbXBvbmVudFVwZGF0ZShrLGguX19zLCQpKXt1Ll9fdiE9dC5fX3YmJihoLnByb3BzPWssaC5zdGF0ZT1oLl9fcyxoLl9fZD0hMSksdS5fX2U9dC5fX2UsdS5fX2s9dC5fX2ssdS5fX2suc29tZShmdW5jdGlvbihuKXtuJiYobi5fXz11KX0pLHcucHVzaC5hcHBseShoLl9faCxoLl9zYiksaC5fc2I9W10saC5fX2gubGVuZ3RoJiZlLnB1c2goaCk7YnJlYWsgbn1udWxsIT1oLmNvbXBvbmVudFdpbGxVcGRhdGUmJmguY29tcG9uZW50V2lsbFVwZGF0ZShrLGguX19zLCQpLHgmJm51bGwhPWguY29tcG9uZW50RGlkVXBkYXRlJiZoLl9faC5wdXNoKGZ1bmN0aW9uKCl7aC5jb21wb25lbnREaWRVcGRhdGUodix5LGQpfSl9aWYoaC5jb250ZXh0PSQsaC5wcm9wcz1rLGguX19QPW4saC5fX2U9ITEsST1sLl9fcixQPTAseCloLnN0YXRlPWguX19zLGguX19kPSExLEkmJkkodSkscz1oLnJlbmRlcihoLnByb3BzLGguc3RhdGUsaC5jb250ZXh0KSx3LnB1c2guYXBwbHkoaC5fX2gsaC5fc2IpLGguX3NiPVtdO2Vsc2UgZG97aC5fX2Q9ITEsSSYmSSh1KSxzPWgucmVuZGVyKGgucHJvcHMsaC5zdGF0ZSxoLmNvbnRleHQpLGguc3RhdGU9aC5fX3N9d2hpbGUoaC5fX2QmJisrUDwyNSk7aC5zdGF0ZT1oLl9fcyxudWxsIT1oLmdldENoaWxkQ29udGV4dCYmKGk9bShtKHt9LGkpLGguZ2V0Q2hpbGRDb250ZXh0KCkpKSx4JiYhcCYmbnVsbCE9aC5nZXRTbmFwc2hvdEJlZm9yZVVwZGF0ZSYmKGQ9aC5nZXRTbmFwc2hvdEJlZm9yZVVwZGF0ZSh2LHkpKSxBPW51bGwhPXMmJnMudHlwZT09PVMmJm51bGw9PXMua2V5P0Uocy5wcm9wcy5jaGlsZHJlbik6cyxmPUwobixnKEEpP0E6W0FdLHUsdCxpLHIsbyxlLGYsYyxhKSxoLmJhc2U9dS5fX2UsdS5fX3UmPS0xNjEsaC5fX2gubGVuZ3RoJiZlLnB1c2goaCksXyYmKGguX19FPWguX189bnVsbCl9Y2F0Y2gobil7aWYodS5fX3Y9bnVsbCxjfHxudWxsIT1vKWlmKG4udGhlbil7Zm9yKHUuX191fD1jPzE2MDoxMjg7ZiYmOD09Zi5ub2RlVHlwZSYmZi5uZXh0U2libGluZzspZj1mLm5leHRTaWJsaW5nO29bby5pbmRleE9mKGYpXT1udWxsLHUuX19lPWZ9ZWxzZXtmb3IoSD1vLmxlbmd0aDtILS07KWIob1tIXSk7Qih1KX1lbHNlIHUuX19lPXQuX19lLHUuX19rPXQuX19rLG4udGhlbnx8Qih1KTtsLl9fZShuLHUsdCl9ZWxzZSBudWxsPT1vJiZ1Ll9fdj09dC5fX3Y/KHUuX19rPXQuX19rLHUuX19lPXQuX19lKTpmPXUuX19lPUcodC5fX2UsdSx0LGkscixvLGUsYyxhKTtyZXR1cm4ocz1sLmRpZmZlZCkmJnModSksMTI4JnUuX191P3ZvaWQgMDpmfWZ1bmN0aW9uIEIobil7biYmKG4uX19jJiYobi5fX2MuX19lPSEwKSxuLl9fayYmbi5fX2suc29tZShCKSl9ZnVuY3Rpb24gRChuLHUsdCl7Zm9yKHZhciBpPTA7aTx0Lmxlbmd0aDtpKyspSih0W2ldLHRbKytpXSx0WysraV0pO2wuX19jJiZsLl9fYyh1LG4pLG4uc29tZShmdW5jdGlvbih1KXt0cnl7bj11Ll9faCx1Ll9faD1bXSxuLnNvbWUoZnVuY3Rpb24obil7bi5jYWxsKHUpfSl9Y2F0Y2gobil7bC5fX2Uobix1Ll9fdil9fSl9ZnVuY3Rpb24gRShuKXtyZXR1cm5cIm9iamVjdFwiIT10eXBlb2Ygbnx8bnVsbD09bnx8bi5fX2I+MD9uOmcobik/bi5tYXAoRSk6dm9pZCAwIT09bi5jb25zdHJ1Y3Rvcj9udWxsOm0oe30sbil9ZnVuY3Rpb24gRyh1LHQsaSxyLG8sZSxmLGMsYSl7dmFyIHMsaCxwLHYseSx3LF8sbT1pLnByb3BzfHxkLGs9dC5wcm9wcyx4PXQudHlwZTtpZihcInN2Z1wiPT14P289XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiOlwibWF0aFwiPT14P289XCJodHRwOi8vd3d3LnczLm9yZy8xOTk4L01hdGgvTWF0aE1MXCI6b3x8KG89XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sXCIpLG51bGwhPWUpZm9yKHM9MDtzPGUubGVuZ3RoO3MrKylpZigoeT1lW3NdKSYmXCJzZXRBdHRyaWJ1dGVcImluIHk9PSEheCYmKHg/eS5sb2NhbE5hbWU9PXg6Mz09eS5ub2RlVHlwZSkpe3U9eSxlW3NdPW51bGw7YnJlYWt9aWYobnVsbD09dSl7aWYobnVsbD09eClyZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoayk7dT1kb2N1bWVudC5jcmVhdGVFbGVtZW50TlMobyx4LGsuaXMmJmspLGMmJihsLl9fbSYmbC5fX20odCxlKSxjPSExKSxlPW51bGx9aWYobnVsbD09eCltPT09a3x8YyYmdS5kYXRhPT1rfHwodS5kYXRhPWspO2Vsc2V7aWYoZT1cInRleHRhcmVhXCI9PXgmJm51bGwhPWsuZGVmYXVsdFZhbHVlP251bGw6ZSYmbi5jYWxsKHUuY2hpbGROb2RlcyksIWMmJm51bGwhPWUpZm9yKG09e30scz0wO3M8dS5hdHRyaWJ1dGVzLmxlbmd0aDtzKyspbVsoeT11LmF0dHJpYnV0ZXNbc10pLm5hbWVdPXkudmFsdWU7Zm9yKHMgaW4gbSl5PW1bc10sXCJkYW5nZXJvdXNseVNldElubmVySFRNTFwiPT1zP3A9eTpcImNoaWxkcmVuXCI9PXN8fHMgaW4ga3x8XCJ2YWx1ZVwiPT1zJiZcImRlZmF1bHRWYWx1ZVwiaW4ga3x8XCJjaGVja2VkXCI9PXMmJlwiZGVmYXVsdENoZWNrZWRcImluIGt8fE4odSxzLG51bGwseSxvKTtmb3IocyBpbiBrKXk9a1tzXSxcImNoaWxkcmVuXCI9PXM/dj15OlwiZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUxcIj09cz9oPXk6XCJ2YWx1ZVwiPT1zP3c9eTpcImNoZWNrZWRcIj09cz9fPXk6YyYmXCJmdW5jdGlvblwiIT10eXBlb2YgeXx8bVtzXT09PXl8fE4odSxzLHksbVtzXSxvKTtpZihoKWN8fHAmJihoLl9faHRtbD09cC5fX2h0bWx8fGguX19odG1sPT11LmlubmVySFRNTCl8fCh1LmlubmVySFRNTD1oLl9faHRtbCksdC5fX2s9W107ZWxzZSBpZihwJiYodS5pbm5lckhUTUw9XCJcIiksTChcInRlbXBsYXRlXCI9PXQudHlwZT91LmNvbnRlbnQ6dSxnKHYpP3Y6W3ZdLHQsaSxyLFwiZm9yZWlnbk9iamVjdFwiPT14P1wiaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbFwiOm8sZSxmLGU/ZVswXTppLl9fayYmJChpLDApLGMsYSksbnVsbCE9ZSlmb3Iocz1lLmxlbmd0aDtzLS07KWIoZVtzXSk7YyYmXCJ0ZXh0YXJlYVwiIT14fHwocz1cInZhbHVlXCIsXCJwcm9ncmVzc1wiPT14JiZudWxsPT13P3UucmVtb3ZlQXR0cmlidXRlKFwidmFsdWVcIik6bnVsbCE9dyYmKHchPT11W3NdfHxcInByb2dyZXNzXCI9PXgmJiF3fHxcIm9wdGlvblwiPT14JiZ3IT1tW3NdKSYmTih1LHMsdyxtW3NdLG8pLHM9XCJjaGVja2VkXCIsbnVsbCE9XyYmXyE9dVtzXSYmTih1LHMsXyxtW3NdLG8pKX1yZXR1cm4gdX1mdW5jdGlvbiBKKG4sdSx0KXt0cnl7aWYoXCJmdW5jdGlvblwiPT10eXBlb2Ygbil7dmFyIGk9XCJmdW5jdGlvblwiPT10eXBlb2Ygbi5fX3U7aSYmbi5fX3UoKSxpJiZudWxsPT11fHwobi5fX3U9bih1KSl9ZWxzZSBuLmN1cnJlbnQ9dX1jYXRjaChuKXtsLl9fZShuLHQpfX1mdW5jdGlvbiBLKG4sdSx0KXt2YXIgaSxyO2lmKGwudW5tb3VudCYmbC51bm1vdW50KG4pLChpPW4ucmVmKSYmKGkuY3VycmVudCYmaS5jdXJyZW50IT1uLl9fZXx8SihpLG51bGwsdSkpLG51bGwhPShpPW4uX19jKSl7aWYoaS5jb21wb25lbnRXaWxsVW5tb3VudCl0cnl7aS5jb21wb25lbnRXaWxsVW5tb3VudCgpfWNhdGNoKG4pe2wuX19lKG4sdSl9aS5iYXNlPWkuX19QPW51bGx9aWYoaT1uLl9faylmb3Iocj0wO3I8aS5sZW5ndGg7cisrKWlbcl0mJksoaVtyXSx1LHR8fFwiZnVuY3Rpb25cIiE9dHlwZW9mIG4udHlwZSk7dHx8YihuLl9fZSksbi5fX2M9bi5fXz1uLl9fZT12b2lkIDB9ZnVuY3Rpb24gUShuLGwsdSl7cmV0dXJuIHRoaXMuY29uc3RydWN0b3Iobix1KX1mdW5jdGlvbiBSKHUsdCxpKXt2YXIgcixvLGUsZjt0PT1kb2N1bWVudCYmKHQ9ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSxsLl9fJiZsLl9fKHUsdCksbz0ocj1cImZ1bmN0aW9uXCI9PXR5cGVvZiBpKT9udWxsOmkmJmkuX19rfHx0Ll9fayxlPVtdLGY9W10scSh0LHU9KCFyJiZpfHx0KS5fX2s9ayhTLG51bGwsW3VdKSxvfHxkLGQsdC5uYW1lc3BhY2VVUkksIXImJmk/W2ldOm8/bnVsbDp0LmZpcnN0Q2hpbGQ/bi5jYWxsKHQuY2hpbGROb2Rlcyk6bnVsbCxlLCFyJiZpP2k6bz9vLl9fZTp0LmZpcnN0Q2hpbGQscixmKSxEKGUsdSxmKX1mdW5jdGlvbiBVKG4sbCl7UihuLGwsVSl9ZnVuY3Rpb24gVyhsLHUsdCl7dmFyIGkscixvLGUsZj1tKHt9LGwucHJvcHMpO2ZvcihvIGluIGwudHlwZSYmbC50eXBlLmRlZmF1bHRQcm9wcyYmKGU9bC50eXBlLmRlZmF1bHRQcm9wcyksdSlcImtleVwiPT1vP2k9dVtvXTpcInJlZlwiPT1vP3I9dVtvXTpmW29dPXZvaWQgMD09PXVbb10mJm51bGwhPWU/ZVtvXTp1W29dO3JldHVybiBhcmd1bWVudHMubGVuZ3RoPjImJihmLmNoaWxkcmVuPWFyZ3VtZW50cy5sZW5ndGg+Mz9uLmNhbGwoYXJndW1lbnRzLDIpOnQpLHgobC50eXBlLGYsaXx8bC5rZXkscnx8bC5yZWYsbnVsbCl9ZnVuY3Rpb24gWChuKXtmdW5jdGlvbiBsKG4pe3ZhciB1LHQ7cmV0dXJuIHRoaXMuZ2V0Q2hpbGRDb250ZXh0fHwodT1uZXcgU2V0LCh0PXt9KVtsLl9fY109dGhpcyx0aGlzLmdldENoaWxkQ29udGV4dD1mdW5jdGlvbigpe3JldHVybiB0fSx0aGlzLmNvbXBvbmVudFdpbGxVbm1vdW50PWZ1bmN0aW9uKCl7dT1udWxsfSx0aGlzLnNob3VsZENvbXBvbmVudFVwZGF0ZT1mdW5jdGlvbihuKXt0aGlzLnByb3BzLnZhbHVlIT1uLnZhbHVlJiZ1LmZvckVhY2goZnVuY3Rpb24obil7bi5fX2U9ITAsQShuKX0pfSx0aGlzLnN1Yj1mdW5jdGlvbihuKXt1LmFkZChuKTt2YXIgbD1uLmNvbXBvbmVudFdpbGxVbm1vdW50O24uY29tcG9uZW50V2lsbFVubW91bnQ9ZnVuY3Rpb24oKXt1JiZ1LmRlbGV0ZShuKSxsJiZsLmNhbGwobil9fSksbi5jaGlsZHJlbn1yZXR1cm4gbC5fX2M9XCJfX2NDXCIreSsrLGwuX189bixsLlByb3ZpZGVyPWwuX19sPShsLkNvbnN1bWVyPWZ1bmN0aW9uKG4sbCl7cmV0dXJuIG4uY2hpbGRyZW4obCl9KS5jb250ZXh0VHlwZT1sLGx9bj13LnNsaWNlLGw9e19fZTpmdW5jdGlvbihuLGwsdSx0KXtmb3IodmFyIGkscixvO2w9bC5fXzspaWYoKGk9bC5fX2MpJiYhaS5fXyl0cnl7aWYoKHI9aS5jb25zdHJ1Y3RvcikmJm51bGwhPXIuZ2V0RGVyaXZlZFN0YXRlRnJvbUVycm9yJiYoaS5zZXRTdGF0ZShyLmdldERlcml2ZWRTdGF0ZUZyb21FcnJvcihuKSksbz1pLl9fZCksbnVsbCE9aS5jb21wb25lbnREaWRDYXRjaCYmKGkuY29tcG9uZW50RGlkQ2F0Y2gobix0fHx7fSksbz1pLl9fZCksbylyZXR1cm4gaS5fX0U9aX1jYXRjaChsKXtuPWx9dGhyb3cgbn19LHU9MCx0PWZ1bmN0aW9uKG4pe3JldHVybiBudWxsIT1uJiZ2b2lkIDA9PT1uLmNvbnN0cnVjdG9yfSxDLnByb3RvdHlwZS5zZXRTdGF0ZT1mdW5jdGlvbihuLGwpe3ZhciB1O3U9bnVsbCE9dGhpcy5fX3MmJnRoaXMuX19zIT10aGlzLnN0YXRlP3RoaXMuX19zOnRoaXMuX19zPW0oe30sdGhpcy5zdGF0ZSksXCJmdW5jdGlvblwiPT10eXBlb2YgbiYmKG49bihtKHt9LHUpLHRoaXMucHJvcHMpKSxuJiZtKHUsbiksbnVsbCE9biYmdGhpcy5fX3YmJihsJiZ0aGlzLl9zYi5wdXNoKGwpLEEodGhpcykpfSxDLnByb3RvdHlwZS5mb3JjZVVwZGF0ZT1mdW5jdGlvbihuKXt0aGlzLl9fdiYmKHRoaXMuX19lPSEwLG4mJnRoaXMuX19oLnB1c2gobiksQSh0aGlzKSl9LEMucHJvdG90eXBlLnJlbmRlcj1TLGk9W10sbz1cImZ1bmN0aW9uXCI9PXR5cGVvZiBQcm9taXNlP1Byb21pc2UucHJvdG90eXBlLnRoZW4uYmluZChQcm9taXNlLnJlc29sdmUoKSk6c2V0VGltZW91dCxlPWZ1bmN0aW9uKG4sbCl7cmV0dXJuIG4uX192Ll9fYi1sLl9fdi5fX2J9LEguX19yPTAsZj1NYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDgpLGM9XCJfX2RcIitmLGE9XCJfX2FcIitmLHM9LyhQb2ludGVyQ2FwdHVyZSkkfENhcHR1cmUkL2ksaD0wLHA9VighMSksdj1WKCEwKSx5PTA7ZXhwb3J0e0MgYXMgQ29tcG9uZW50LFMgYXMgRnJhZ21lbnQsVyBhcyBjbG9uZUVsZW1lbnQsWCBhcyBjcmVhdGVDb250ZXh0LGsgYXMgY3JlYXRlRWxlbWVudCxNIGFzIGNyZWF0ZVJlZixrIGFzIGgsVSBhcyBoeWRyYXRlLHQgYXMgaXNWYWxpZEVsZW1lbnQsbCBhcyBvcHRpb25zLFIgYXMgcmVuZGVyLEYgYXMgdG9DaGlsZEFycmF5fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXByZWFjdC5tb2R1bGUuanMubWFwXG4iLCJpbXBvcnR7b3B0aW9ucyBhcyByLEZyYWdtZW50IGFzIGV9ZnJvbVwicHJlYWN0XCI7ZXhwb3J0e0ZyYWdtZW50fWZyb21cInByZWFjdFwiO3ZhciB0PS9bXCImPF0vO2Z1bmN0aW9uIG4ocil7aWYoMD09PXIubGVuZ3RofHwhMT09PXQudGVzdChyKSlyZXR1cm4gcjtmb3IodmFyIGU9MCxuPTAsbz1cIlwiLGY9XCJcIjtuPHIubGVuZ3RoO24rKyl7c3dpdGNoKHIuY2hhckNvZGVBdChuKSl7Y2FzZSAzNDpmPVwiJnF1b3Q7XCI7YnJlYWs7Y2FzZSAzODpmPVwiJmFtcDtcIjticmVhaztjYXNlIDYwOmY9XCImbHQ7XCI7YnJlYWs7ZGVmYXVsdDpjb250aW51ZX1uIT09ZSYmKG8rPXIuc2xpY2UoZSxuKSksbys9ZixlPW4rMX1yZXR1cm4gbiE9PWUmJihvKz1yLnNsaWNlKGUsbikpLG99dmFyIG89L2FjaXR8ZXgoPzpzfGd8bnxwfCQpfHJwaHxncmlkfG93c3xtbmN8bnR3fGluZVtjaF18em9vfF5vcmR8aXRlcmEvaSxmPTAsaT1BcnJheS5pc0FycmF5O2Z1bmN0aW9uIHUoZSx0LG4sbyxpLHUpe3R8fCh0PXt9KTt2YXIgYSxjLHA9dDtpZihcInJlZlwiaW4gcClmb3IoYyBpbiBwPXt9LHQpXCJyZWZcIj09Yz9hPXRbY106cFtjXT10W2NdO3ZhciBsPXt0eXBlOmUscHJvcHM6cCxrZXk6bixyZWY6YSxfX2s6bnVsbCxfXzpudWxsLF9fYjowLF9fZTpudWxsLF9fYzpudWxsLGNvbnN0cnVjdG9yOnZvaWQgMCxfX3Y6LS1mLF9faTotMSxfX3U6MCxfX3NvdXJjZTppLF9fc2VsZjp1fTtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBlJiYoYT1lLmRlZmF1bHRQcm9wcykpZm9yKGMgaW4gYSl2b2lkIDA9PT1wW2NdJiYocFtjXT1hW2NdKTtyZXR1cm4gci52bm9kZSYmci52bm9kZShsKSxsfWZ1bmN0aW9uIGEocil7dmFyIHQ9dShlLHt0cGw6cixleHByczpbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywxKX0pO3JldHVybiB0LmtleT10Ll9fdix0fXZhciBjPXt9LHA9L1tBLVpdL2c7ZnVuY3Rpb24gbChlLHQpe2lmKHIuYXR0cil7dmFyIGY9ci5hdHRyKGUsdCk7aWYoXCJzdHJpbmdcIj09dHlwZW9mIGYpcmV0dXJuIGZ9aWYodD1mdW5jdGlvbihyKXtyZXR1cm4gbnVsbCE9PXImJlwib2JqZWN0XCI9PXR5cGVvZiByJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiByLnZhbHVlT2Y/ci52YWx1ZU9mKCk6cn0odCksXCJyZWZcIj09PWV8fFwia2V5XCI9PT1lKXJldHVyblwiXCI7aWYoXCJzdHlsZVwiPT09ZSYmXCJvYmplY3RcIj09dHlwZW9mIHQpe3ZhciBpPVwiXCI7Zm9yKHZhciB1IGluIHQpe3ZhciBhPXRbdV07aWYobnVsbCE9YSYmXCJcIiE9PWEpe3ZhciBsPVwiLVwiPT11WzBdP3U6Y1t1XXx8KGNbdV09dS5yZXBsYWNlKHAsXCItJCZcIikudG9Mb3dlckNhc2UoKSkscz1cIjtcIjtcIm51bWJlclwiIT10eXBlb2YgYXx8bC5zdGFydHNXaXRoKFwiLS1cIil8fG8udGVzdChsKXx8KHM9XCJweDtcIiksaT1pK2wrXCI6XCIrYStzfX1yZXR1cm4gZSsnPVwiJytuKGkpKydcIid9cmV0dXJuIG51bGw9PXR8fCExPT09dHx8XCJmdW5jdGlvblwiPT10eXBlb2YgdHx8XCJvYmplY3RcIj09dHlwZW9mIHQ/XCJcIjohMD09PXQ/ZTplKyc9XCInK24oXCJcIit0KSsnXCInfWZ1bmN0aW9uIHMocil7aWYobnVsbD09cnx8XCJib29sZWFuXCI9PXR5cGVvZiByfHxcImZ1bmN0aW9uXCI9PXR5cGVvZiByKXJldHVybiBudWxsO2lmKFwib2JqZWN0XCI9PXR5cGVvZiByKXtpZih2b2lkIDA9PT1yLmNvbnN0cnVjdG9yKXJldHVybiByO2lmKGkocikpe2Zvcih2YXIgZT0wO2U8ci5sZW5ndGg7ZSsrKXJbZV09cyhyW2VdKTtyZXR1cm4gcn19cmV0dXJuIG4oXCJcIityKX1leHBvcnR7dSBhcyBqc3gsbCBhcyBqc3hBdHRyLHUgYXMganN4REVWLHMgYXMganN4RXNjYXBlLGEgYXMganN4VGVtcGxhdGUsdSBhcyBqc3hzfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWpzeFJ1bnRpbWUubW9kdWxlLmpzLm1hcFxuIiwiaW1wb3J0IHR5cGUgeyBTaWduYWwgfSBmcm9tICdAcHJlYWN0L3NpZ25hbHMnXG5pbXBvcnQgdHlwZSB7IENvbXBvbmVudENoaWxkcmVuIH0gZnJvbSAncHJlYWN0J1xuXG5pbnRlcmZhY2UgQnV0dG9uUm93UHJvcHMge1xuICBjaGlsZHJlbjogQ29tcG9uZW50Q2hpbGRyZW5cbiAgdmlzaWJsZT86IFNpZ25hbDxib29sZWFuPlxufVxuXG5leHBvcnQgZnVuY3Rpb24gQnV0dG9uUm93KHsgY2hpbGRyZW4sIHZpc2libGUgfTogQnV0dG9uUm93UHJvcHMpIHtcbiAgaWYgKHZpc2libGUgJiYgIXZpc2libGUudmFsdWUpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgcmV0dXJuIDxkaXY+e2NoaWxkcmVufTwvZGl2PlxufVxuIiwiaW1wb3J0IHR5cGUgeyBTaWduYWwgfSBmcm9tICdAcHJlYWN0L3NpZ25hbHMnXG5cbmludGVyZmFjZSBTZXR0aW5nQnV0dG9uUHJvcHM8VD4ge1xuICBsYWJlbDogc3RyaW5nXG4gIHNldHRpbmc6IFNpZ25hbDxUPlxuICBvcHRpb25zOiByZWFkb25seSBUW11cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNldHRpbmdCdXR0b248VD4oeyBsYWJlbCwgc2V0dGluZywgb3B0aW9ucyB9OiBTZXR0aW5nQnV0dG9uUHJvcHM8VD4pIHtcbiAgY29uc3QgaGFuZGxlQ2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3QgY3VycmVudEluZGV4ID0gb3B0aW9ucy5pbmRleE9mKHNldHRpbmcudmFsdWUpXG4gICAgY29uc3QgbmV4dEluZGV4ID0gKGN1cnJlbnRJbmRleCArIDEpICUgb3B0aW9ucy5sZW5ndGhcbiAgICBzZXR0aW5nLnZhbHVlID0gb3B0aW9uc1tuZXh0SW5kZXhdXG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxidXR0b24gb25DbGljaz17aGFuZGxlQ2xpY2t9IHR5cGU9XCJidXR0b25cIj5cbiAgICAgIHtsYWJlbH06IHtTdHJpbmcoc2V0dGluZy52YWx1ZSl9XG4gICAgPC9idXR0b24+XG4gIClcbn1cbiIsImltcG9ydCB0eXBlIHsgU2lnbmFsIH0gZnJvbSAnQHByZWFjdC9zaWduYWxzJ1xuaW1wb3J0IHsgc2V0dGluZ3MgfSBmcm9tICcuLi9zZXR0aW5ncy9zZXR0aW5nc1N0b3JlJ1xuaW1wb3J0IHsgQnV0dG9uUm93IH0gZnJvbSAnLi9CdXR0b25Sb3cnXG5pbXBvcnQgeyBTZXR0aW5nQnV0dG9uIH0gZnJvbSAnLi9TZXR0aW5nQnV0dG9uJ1xuXG5pbnRlcmZhY2UgQ29udHJvbFBhbmVsUHJvcHMge1xuICBib2FyZENoYW5nZWQ6IFNpZ25hbDxudW1iZXI+XG59XG5cbmNvbnN0IFNQRUFLX1JBVEVfT1BUSU9OUyA9IFswLjIsIDAuNSwgMC43LCAxLjAsIDEuMSwgMS4yXSBhcyBjb25zdFxuY29uc3QgVE9HR0xFX09QVElPTlMgPSBbZmFsc2UsIHRydWVdIGFzIGNvbnN0XG5cbmV4cG9ydCBmdW5jdGlvbiBDb250cm9sUGFuZWwoeyBib2FyZENoYW5nZWQgfTogQ29udHJvbFBhbmVsUHJvcHMpIHtcbiAgLy8gVXNlIGJvYXJkQ2hhbmdlZCB0byBlbnN1cmUgY29tcG9uZW50IHJlLXJlbmRlcnMgd2hlbiBib2FyZCBjaGFuZ2VzXG4gIGJvYXJkQ2hhbmdlZC52YWx1ZVxuXG4gIHJldHVybiAoXG4gICAgPGRpdj5cbiAgICAgIDxCdXR0b25Sb3c+XG4gICAgICAgIDxTZXR0aW5nQnV0dG9uXG4gICAgICAgICAgbGFiZWw9XCJTcGVhayBSYXRlXCJcbiAgICAgICAgICBzZXR0aW5nPXtzZXR0aW5ncy5zcGVha1JhdGV9XG4gICAgICAgICAgb3B0aW9ucz17U1BFQUtfUkFURV9PUFRJT05TfVxuICAgICAgICAvPlxuICAgICAgICA8U2V0dGluZ0J1dHRvblxuICAgICAgICAgIGxhYmVsPVwiUGllY2VzIExpc3RcIlxuICAgICAgICAgIHNldHRpbmc9e3NldHRpbmdzLnBpZWNlc0xpc3RFbmFibGVkfVxuICAgICAgICAgIG9wdGlvbnM9e1RPR0dMRV9PUFRJT05TfVxuICAgICAgICAvPlxuICAgICAgICA8U2V0dGluZ0J1dHRvblxuICAgICAgICAgIGxhYmVsPVwiRGl2aWRlcnNcIlxuICAgICAgICAgIHNldHRpbmc9e3NldHRpbmdzLmRpdmlkZXJzRW5hYmxlZH1cbiAgICAgICAgICBvcHRpb25zPXtUT0dHTEVfT1BUSU9OU31cbiAgICAgICAgLz5cbiAgICAgICAgPFNldHRpbmdCdXR0b25cbiAgICAgICAgICBsYWJlbD1cIkN1c3RvbSBCb2FyZFwiXG4gICAgICAgICAgc2V0dGluZz17c2V0dGluZ3MuY3VzdG9tQm9hcmRFbmFibGVkfVxuICAgICAgICAgIG9wdGlvbnM9e1RPR0dMRV9PUFRJT05TfVxuICAgICAgICAvPlxuICAgICAgICA8U2V0dGluZ0J1dHRvblxuICAgICAgICAgIGxhYmVsPVwiRmxhc2ggTW9kZVwiXG4gICAgICAgICAgc2V0dGluZz17c2V0dGluZ3MuZmxhc2hNb2RlRW5hYmxlZH1cbiAgICAgICAgICBvcHRpb25zPXtUT0dHTEVfT1BUSU9OU31cbiAgICAgICAgLz5cbiAgICAgIDwvQnV0dG9uUm93PlxuICAgIDwvZGl2PlxuICApXG59XG4iLCJpbXBvcnQgdHlwZSB7IFNpZ25hbCB9IGZyb20gJ0BwcmVhY3Qvc2lnbmFscy1jb3JlJ1xuaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSAncHJlYWN0J1xuaW1wb3J0IHsgQ29udHJvbFBhbmVsIH0gZnJvbSAnLi9Db250cm9sUGFuZWwnXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVSb290KGJvYXJkQ2hhbmdlZDogU2lnbmFsPG51bWJlcj4sIG1vdW50UG9pbnQ6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gIHJlbmRlcig8Q29udHJvbFBhbmVsIGJvYXJkQ2hhbmdlZD17Ym9hcmRDaGFuZ2VkfSAvPiwgbW91bnRQb2ludClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlc3Ryb3lSb290KG1vdW50UG9pbnQ6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gIHJlbmRlcihudWxsLCBtb3VudFBvaW50KVxufVxuIiwiaW1wb3J0IHR5cGUgeyBTaWduYWwgfSBmcm9tICdAcHJlYWN0L3NpZ25hbHMtY29yZSdcbmltcG9ydCB7IERvbVNlbGVjdG9yIH0gZnJvbSAnLi4vY29uc3RhbnRzJ1xuaW1wb3J0IHsgcXVlcnlTZWxlY3RvciB9IGZyb20gJy4uL3BsYXRmb3JtL2RvbSdcblxuZXhwb3J0IGludGVyZmFjZSBCb2FyZE9ic2VydmVyU3RhdGUge1xuICBvYnNlcnZlcjogTXV0YXRpb25PYnNlcnZlclxuICBib2FyZENoYW5nZWQ6IFNpZ25hbDxudW1iZXI+XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVCb2FyZE9ic2VydmVyKGJvYXJkQ2hhbmdlZDogU2lnbmFsPG51bWJlcj4pOiBCb2FyZE9ic2VydmVyU3RhdGUge1xuICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICBib2FyZENoYW5nZWQudmFsdWUgKz0gMVxuICB9KVxuXG4gIHJldHVybiB7IG9ic2VydmVyLCBib2FyZENoYW5nZWQgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RhcnRCb2FyZE9ic2VydmVyKHN0YXRlOiBCb2FyZE9ic2VydmVyU3RhdGUpOiB2b2lkIHtcbiAgY29uc3QgYm9hcmQgPSBxdWVyeVNlbGVjdG9yKERvbVNlbGVjdG9yLkJPQVJEKVxuICBpZiAoIWJvYXJkKSByZXR1cm5cblxuICBzdGF0ZS5vYnNlcnZlci5vYnNlcnZlKGJvYXJkLCB7XG4gICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgIGF0dHJpYnV0ZXM6IHRydWUsXG4gICAgc3VidHJlZTogdHJ1ZSxcbiAgfSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0b3BCb2FyZE9ic2VydmVyKHN0YXRlOiBCb2FyZE9ic2VydmVyU3RhdGUpOiB2b2lkIHtcbiAgc3RhdGUub2JzZXJ2ZXIuZGlzY29ubmVjdCgpXG59XG4iLCJpbXBvcnQgeyB0eXBlIERpdmlkZXJzU3RhdGUsIGhpZGVEaXZpZGVycywgc2hvd0RpdmlkZXJzIH0gZnJvbSAnLi4vYWRhcHRlcnMtb3ZlcmxheXMvZGl2aWRlcnMnXG5pbXBvcnQgeyBzZXR0aW5ncyB9IGZyb20gJy4uL3NldHRpbmdzL3NldHRpbmdzU3RvcmUnXG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVEaXZpZGVycyhzdGF0ZTogRGl2aWRlcnNTdGF0ZSk6IHZvaWQge1xuICBpZiAoc2V0dGluZ3MuZGl2aWRlcnNFbmFibGVkLnZhbHVlKSB7XG4gICAgc2hvd0RpdmlkZXJzKHN0YXRlKVxuICB9IGVsc2Uge1xuICAgIGhpZGVEaXZpZGVycyhzdGF0ZSlcbiAgfVxufVxuIiwiaW1wb3J0IHsgZWZmZWN0IH0gZnJvbSAnQHByZWFjdC9zaWduYWxzLWNvcmUnXG5pbXBvcnQgdHlwZSB7IERpdmlkZXJzU3RhdGUgfSBmcm9tICcuLi9hZGFwdGVycy1vdmVybGF5cy9kaXZpZGVycydcbmltcG9ydCB7IHVwZGF0ZURpdmlkZXJzIH0gZnJvbSAnLi4vaGFuZGxlcnMvdXBkYXRlRGl2aWRlcnMnXG5pbXBvcnQgeyBzZXR0aW5ncyB9IGZyb20gJy4uL3NldHRpbmdzL3NldHRpbmdzU3RvcmUnXG5cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cERpdmlkZXJzRWZmZWN0KHN0YXRlOiBEaXZpZGVyc1N0YXRlKTogKCkgPT4gdm9pZCB7XG4gIHJldHVybiBlZmZlY3QoKCkgPT4ge1xuICAgIHNldHRpbmdzLmRpdmlkZXJzRW5hYmxlZC52YWx1ZVxuICAgIHVwZGF0ZURpdmlkZXJzKHN0YXRlKVxuICB9KVxufVxuIiwiaW1wb3J0IHsgc2lnbmFsIH0gZnJvbSAnQHByZWFjdC9zaWduYWxzLWNvcmUnXG5pbXBvcnQgeyBjcmVhdGVEaXZpZGVycywgZGVzdHJveURpdmlkZXJzIH0gZnJvbSAnLi9hZGFwdGVycy1vdmVybGF5cy9kaXZpZGVycydcbmltcG9ydCB7IGNyZWF0ZUZsYXNoT3ZlcmxheSwgZGVzdHJveUZsYXNoT3ZlcmxheSB9IGZyb20gJy4vYWRhcHRlcnMtb3ZlcmxheXMvZmxhc2gnXG5pbXBvcnQgeyBzZXR1cEtleWJvYXJkQ29tbWFuZHMsIHRlYXJkb3duS2V5Ym9hcmRDb21tYW5kcyB9IGZyb20gJy4vY29tbWFuZHMva2V5Ym9hcmRJbnB1dCdcbmltcG9ydCB7IGNyZWF0ZVJvb3QsIGRlc3Ryb3lSb290IH0gZnJvbSAnLi9jb21wb25lbnRzL3Jvb3QnXG5pbXBvcnQgeyBEb21TZWxlY3RvciB9IGZyb20gJy4vY29uc3RhbnRzJ1xuaW1wb3J0IHsgY3JlYXRlQm9hcmRPYnNlcnZlciwgc3RhcnRCb2FyZE9ic2VydmVyLCBzdG9wQm9hcmRPYnNlcnZlciB9IGZyb20gJy4vZG9tL2JvYXJkT2JzZXJ2ZXInXG5pbXBvcnQgeyB3YWl0Rm9yRWxlbWVudCB9IGZyb20gJy4vZG9tL2JvYXJkUmVhZGVyJ1xuaW1wb3J0IHsgc2V0dXBEaXZpZGVyc0VmZmVjdCB9IGZyb20gJy4vZWZmZWN0cy9vbkRpdmlkZXJzJ1xuaW1wb3J0IHsgYXBwZW5kQ2hpbGQsIGNyZWF0ZURpdiwgcXVlcnlTZWxlY3RvciB9IGZyb20gJy4vcGxhdGZvcm0vZG9tJ1xuaW1wb3J0IHsgbG9hZFNldHRpbmdzLCBzZXR1cEF1dG9TYXZlIH0gZnJvbSAnLi9zZXR0aW5ncy9zZXR0aW5nc1N0b3JlJ1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaW5pdCgpIHtcbiAgLy8gV2FpdCBmb3IgbGljaGVzcyB0byBsb2FkIHRoZSBib2FyZFxuICBhd2FpdCB3YWl0Rm9yRWxlbWVudChEb21TZWxlY3Rvci5LRVlCT0FSRF9NT1ZFKVxuXG4gIC8vIEluaXRpYWxpemUgc2V0dGluZ3NcbiAgbG9hZFNldHRpbmdzKClcbiAgc2V0dXBBdXRvU2F2ZSgpXG5cbiAgLy8gQ3JlYXRlIHNoYXJlZCBib2FyZCBjaGFuZ2Ugc2lnbmFsXG4gIGNvbnN0IGJvYXJkQ2hhbmdlZCA9IHNpZ25hbCgwKVxuXG4gIC8vIENyZWF0ZSBET00gc3RhdGVcbiAgY29uc3QgZmxhc2hTdGF0ZSA9IGNyZWF0ZUZsYXNoT3ZlcmxheSgpXG4gIGNvbnN0IGRpdmlkZXJzU3RhdGUgPSBjcmVhdGVEaXZpZGVycygpXG4gIGNvbnN0IGJvYXJkT2JzZXJ2ZXJTdGF0ZSA9IGNyZWF0ZUJvYXJkT2JzZXJ2ZXIoYm9hcmRDaGFuZ2VkKVxuXG4gIC8vIFN0YXJ0IG9ic2VydmVyXG4gIHN0YXJ0Qm9hcmRPYnNlcnZlcihib2FyZE9ic2VydmVyU3RhdGUpXG5cbiAgLy8gU2V0IHVwIGVmZmVjdHNcbiAgY29uc3QgY2xlYW51cERpdmlkZXJzID0gc2V0dXBEaXZpZGVyc0VmZmVjdChkaXZpZGVyc1N0YXRlKVxuXG4gIC8vIFNldCB1cCBjb21tYW5kc1xuICBzZXR1cEtleWJvYXJkQ29tbWFuZHMoKVxuXG4gIC8vIE1vdW50IFByZWFjdCBVSVxuICBjb25zdCBtb3VudFBvaW50ID0gY3JlYXRlRGl2KClcbiAgY29uc3Qga2V5Ym9hcmRNb3ZlID0gcXVlcnlTZWxlY3RvcihEb21TZWxlY3Rvci5LRVlCT0FSRF9NT1ZFKVxuICBpZiAoa2V5Ym9hcmRNb3ZlKSB7XG4gICAgYXBwZW5kQ2hpbGQoa2V5Ym9hcmRNb3ZlLCBtb3VudFBvaW50KVxuICB9XG4gIGNyZWF0ZVJvb3QoYm9hcmRDaGFuZ2VkLCBtb3VudFBvaW50KVxuXG4gIC8vIFJldHVybiBjbGVhbnVwIGZ1bmN0aW9uXG4gIHJldHVybiAoKSA9PiB7XG4gICAgY2xlYW51cERpdmlkZXJzKClcbiAgICBzdG9wQm9hcmRPYnNlcnZlcihib2FyZE9ic2VydmVyU3RhdGUpXG4gICAgZGVzdHJveUZsYXNoT3ZlcmxheShmbGFzaFN0YXRlKVxuICAgIGRlc3Ryb3lEaXZpZGVycyhkaXZpZGVyc1N0YXRlKVxuICAgIHRlYXJkb3duS2V5Ym9hcmRDb21tYW5kcygpXG4gICAgZGVzdHJveVJvb3QobW91bnRQb2ludClcbiAgfVxufVxuIiwiaW1wb3J0IHsgaW5pdCB9IGZyb20gJy4vaW5pdCdcblxuLy8gU3RhcnQgdGhlIGFwcGxpY2F0aW9uXG5pbml0KCkuY2F0Y2goY29uc29sZS5lcnJvcilcbiJdLCJ4X2dvb2dsZV9pZ25vcmVMaXN0IjpbMCwxOCwxOV0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0NBQUEsSUFBSUEsTUFBRSxPQUFPLElBQUksZ0JBQWdCO0NBQUUsU0FBU0MsTUFBRztFQUFDLElBQUcsRUFBRUMsTUFBRSxJQUFHO0dBQUMsSUFBSSxHQUFFLElBQUUsQ0FBQztHQUFFLENBQUMsV0FBVTtJQUFDLElBQUksSUFBRUM7SUFBRSxNQUFFLEtBQUs7SUFBRSxPQUFNLEtBQUssTUFBSSxHQUFFO0tBQUMsSUFBRyxFQUFFLEVBQUUsTUFBSSxFQUFFLEdBQUUsRUFBRSxFQUFFLElBQUUsRUFBRTtLQUFFLElBQUUsRUFBRTtJQUFDO0dBQUMsR0FBRTtHQUFFLE9BQU0sS0FBSyxNQUFJQyxLQUFFO0lBQUMsSUFBSSxJQUFFQTtJQUFFLE1BQUUsS0FBSztJQUFFO0lBQUksT0FBTSxLQUFLLE1BQUksR0FBRTtLQUFDLElBQUksSUFBRSxFQUFFO0tBQUUsRUFBRSxJQUFFLEtBQUs7S0FBRSxFQUFFLEtBQUc7S0FBRyxJQUFHLEVBQUUsSUFBRSxFQUFFLE1BQUlDLElBQUUsQ0FBQyxHQUFFLElBQUc7TUFBQyxFQUFFLEVBQUU7S0FBQyxTQUFPLEdBQUU7TUFBQyxJQUFHLENBQUMsR0FBRTtPQUFDLElBQUU7T0FBRSxJQUFFLENBQUM7TUFBQztLQUFDO0tBQUMsSUFBRTtJQUFDO0dBQUM7R0FBQyxNQUFFO0dBQUU7R0FBSSxJQUFHLEdBQUUsTUFBTTtFQUFDLE9BQU07Q0FBRztDQUF1RSxJQUFJQyxNQUFFLEtBQUs7Q0FBRSxTQUFTQyxJQUFFLEdBQUU7RUFBQyxJQUFJLElBQUVEO0VBQUUsTUFBRSxLQUFLO0VBQUUsSUFBRztHQUFDLE9BQU8sRUFBRTtFQUFDLFVBQVE7R0FBQyxNQUFFO0VBQUM7Q0FBQztDQUFDLElBQUlFLEtBQUVKLE1BQUUsS0FBSyxHQUFFRixNQUFFLEdBQUVPLE1BQUUsR0FBTUUsTUFBRSxHQUFFUixNQUFFLEtBQUssR0FBRVMsTUFBRTtDQUFFLFNBQVNDLElBQUUsR0FBRTtFQUFDLElBQUcsS0FBSyxNQUFJUCxLQUFFO0dBQUMsSUFBSSxJQUFFLEVBQUU7R0FBRSxJQUFHLEtBQUssTUFBSSxLQUFHLEVBQUUsTUFBSUEsS0FBRTtJQUFDLElBQUU7S0FBQyxHQUFFO0tBQUUsR0FBRTtLQUFFLEdBQUVBLElBQUU7S0FBRSxHQUFFLEtBQUs7S0FBRSxHQUFFQTtLQUFFLEdBQUUsS0FBSztLQUFFLEdBQUUsS0FBSztLQUFFLEdBQUU7SUFBQztJQUFFLElBQUcsS0FBSyxNQUFJQSxJQUFFLEdBQUUsSUFBRSxFQUFFLElBQUU7SUFBRSxJQUFFLElBQUU7SUFBRSxFQUFFLElBQUU7SUFBRSxJQUFHLEtBQUdBLElBQUUsR0FBRSxFQUFFLEVBQUUsQ0FBQztJQUFFLE9BQU87R0FBQyxPQUFNLElBQUcsT0FBSyxFQUFFLEdBQUU7SUFBQyxFQUFFLElBQUU7SUFBRSxJQUFHLEtBQUssTUFBSSxFQUFFLEdBQUU7S0FBQyxFQUFFLEVBQUUsSUFBRSxFQUFFO0tBQUUsSUFBRyxLQUFLLE1BQUksRUFBRSxHQUFFLEVBQUUsRUFBRSxJQUFFLEVBQUU7S0FBRSxFQUFFLElBQUVBLElBQUU7S0FBRSxFQUFFLElBQUUsS0FBSztLQUFFLElBQUUsRUFBRSxJQUFFO0tBQUUsSUFBRSxJQUFFO0lBQUM7SUFBQyxPQUFPO0dBQUM7RUFBQztDQUFDO0NBQUMsU0FBU1EsSUFBRSxHQUFFLEdBQUU7RUFBQyxLQUFLLElBQUU7RUFBRSxLQUFLLElBQUU7RUFBRSxLQUFLLElBQUUsS0FBSztFQUFFLEtBQUssSUFBRSxLQUFLO0VBQUUsS0FBSyxJQUFFO0VBQUUsS0FBSyxJQUFFLFFBQU0sSUFBRSxLQUFLLElBQUUsRUFBRTtFQUFRLEtBQUssSUFBRSxRQUFNLElBQUUsS0FBSyxJQUFFLEVBQUU7RUFBVSxLQUFLLE9BQUssUUFBTSxJQUFFLEtBQUssSUFBRSxFQUFFO0NBQUk7Q0FBQyxJQUFFLFVBQVUsUUFBTWQ7Q0FBRSxJQUFFLFVBQVUsSUFBRSxXQUFVO0VBQUMsT0FBTSxDQUFDO0NBQUM7Q0FBRSxJQUFFLFVBQVUsSUFBRSxTQUFTLEdBQUU7RUFBQyxJQUFJLElBQUUsTUFBSyxJQUFFLEtBQUs7RUFBRSxJQUFHLE1BQUksS0FBRyxLQUFLLE1BQUksRUFBRSxHQUFFO0dBQUMsRUFBRSxJQUFFO0dBQUUsS0FBSyxJQUFFO0dBQUUsSUFBRyxLQUFLLE1BQUksR0FBRSxFQUFFLElBQUU7UUFBTyxJQUFFLFdBQVU7SUFBQyxJQUFJO0lBQUUsU0FBTyxJQUFFLEVBQUUsTUFBSSxFQUFFLEtBQUssQ0FBQztHQUFDLENBQUM7RUFBQztDQUFDO0NBQUUsSUFBRSxVQUFVLElBQUUsU0FBUyxHQUFFO0VBQUMsSUFBSSxJQUFFO0VBQUssSUFBRyxLQUFLLE1BQUksS0FBSyxHQUFFO0dBQUMsSUFBSSxJQUFFLEVBQUUsR0FBRSxJQUFFLEVBQUU7R0FBRSxJQUFHLEtBQUssTUFBSSxHQUFFO0lBQUMsRUFBRSxJQUFFO0lBQUUsRUFBRSxJQUFFLEtBQUs7R0FBQztHQUFDLElBQUcsS0FBSyxNQUFJLEdBQUU7SUFBQyxFQUFFLElBQUU7SUFBRSxFQUFFLElBQUUsS0FBSztHQUFDO0dBQUMsSUFBRyxNQUFJLEtBQUssR0FBRTtJQUFDLEtBQUssSUFBRTtJQUFFLElBQUcsS0FBSyxNQUFJLEdBQUUsSUFBRSxXQUFVO0tBQUMsSUFBSTtLQUFFLFNBQU8sSUFBRSxFQUFFLE1BQUksRUFBRSxLQUFLLENBQUM7SUFBQyxDQUFDO0dBQUM7RUFBQztDQUFDO0NBQUUsSUFBRSxVQUFVLFlBQVUsU0FBUyxHQUFFO0VBQUMsSUFBSSxJQUFFO0VBQUssT0FBT2UsSUFBRSxXQUFVO0dBQUMsSUFBSSxJQUFFLEVBQUUsT0FBTSxJQUFFVDtHQUFFLE1BQUUsS0FBSztHQUFFLElBQUc7SUFBQyxFQUFFLENBQUM7R0FBQyxVQUFRO0lBQUMsTUFBRTtHQUFDO0VBQUMsR0FBRSxFQUFDLE1BQUssTUFBSyxDQUFDO0NBQUM7Q0FBRSxJQUFFLFVBQVUsVUFBUSxXQUFVO0VBQUMsT0FBTyxLQUFLO0NBQUs7Q0FBRSxJQUFFLFVBQVUsV0FBUyxXQUFVO0VBQUMsT0FBTyxLQUFLLFFBQU07Q0FBRTtDQUFFLElBQUUsVUFBVSxTQUFPLFdBQVU7RUFBQyxPQUFPLEtBQUs7Q0FBSztDQUFFLElBQUUsVUFBVSxPQUFLLFdBQVU7RUFBQyxJQUFJLElBQUU7RUFBSyxPQUFPQyxJQUFFLFdBQVU7R0FBQyxPQUFPLEVBQUU7RUFBSyxDQUFDO0NBQUM7Q0FBRSxPQUFPLGVBQWVPLElBQUUsV0FBVSxTQUFRO0VBQUMsS0FBSSxXQUFVO0dBQUMsSUFBSSxJQUFFRCxJQUFFLElBQUk7R0FBRSxJQUFHLEtBQUssTUFBSSxHQUFFLEVBQUUsSUFBRSxLQUFLO0dBQUUsT0FBTyxLQUFLO0VBQUM7RUFBRSxLQUFJLFNBQVMsR0FBRTtHQUFDLElBQUcsTUFBSSxLQUFLLEdBQUU7SUFBQyxJQUFHSixNQUFFLEtBQUksTUFBTSxJQUFJLE1BQU0sZ0JBQWdCO0lBQUUsQ0FBQyxTQUFTLEdBQUU7S0FBQyxJQUFHLE1BQUlQLE9BQUcsTUFBSU87VUFBSyxFQUFFLE1BQUlFLEtBQUU7T0FBQyxFQUFFLElBQUVBO09BQUUsTUFBRTtRQUFDLEdBQUU7UUFBRSxHQUFFLEVBQUU7UUFBRSxHQUFFLEVBQUU7UUFBRSxHQUFFUjtPQUFDO01BQUM7O0lBQUMsR0FBRSxJQUFJO0lBQUUsS0FBSyxJQUFFO0lBQUUsS0FBSztJQUFJO0lBQUk7SUFBSSxJQUFHO0tBQUMsS0FBSSxJQUFJLElBQUUsS0FBSyxHQUFFLEtBQUssTUFBSSxHQUFFLElBQUUsRUFBRSxHQUFFLEVBQUUsRUFBRSxFQUFFO0lBQUMsVUFBUTtLQUFDLElBQUU7SUFBQztHQUFDO0VBQUM7Q0FBQyxDQUFDO0NBQUUsU0FBU2EsSUFBRSxHQUFFLEdBQUU7RUFBQyxPQUFPLElBQUlGLElBQUUsR0FBRSxDQUFDO0NBQUM7Q0FBQyxTQUFTVCxJQUFFLEdBQUU7RUFBQyxLQUFJLElBQUksSUFBRSxFQUFFLEdBQUUsS0FBSyxNQUFJLEdBQUUsSUFBRSxFQUFFLEdBQUUsSUFBRyxFQUFFLEVBQUUsTUFBSSxFQUFFLEtBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxLQUFHLEVBQUUsRUFBRSxNQUFJLEVBQUUsR0FBRSxPQUFNLENBQUM7RUFBRSxPQUFNLENBQUM7Q0FBQztDQUFDLFNBQVNZLElBQUUsR0FBRTtFQUFDLEtBQUksSUFBSSxJQUFFLEVBQUUsR0FBRSxLQUFLLE1BQUksR0FBRSxJQUFFLEVBQUUsR0FBRTtHQUFDLElBQUksSUFBRSxFQUFFLEVBQUU7R0FBRSxJQUFHLEtBQUssTUFBSSxHQUFFLEVBQUUsSUFBRTtHQUFFLEVBQUUsRUFBRSxJQUFFO0dBQUUsRUFBRSxJQUFFO0dBQUcsSUFBRyxLQUFLLE1BQUksRUFBRSxHQUFFO0lBQUMsRUFBRSxJQUFFO0lBQUU7R0FBSztFQUFDO0NBQUM7Q0FBQyxTQUFTQyxJQUFFLEdBQUU7RUFBQyxJQUFJLElBQUUsRUFBRSxHQUFFLElBQUUsS0FBSztFQUFFLE9BQU0sS0FBSyxNQUFJLEdBQUU7R0FBQyxJQUFJLElBQUUsRUFBRTtHQUFFLElBQUcsT0FBSyxFQUFFLEdBQUU7SUFBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQUUsSUFBRyxLQUFLLE1BQUksR0FBRSxFQUFFLElBQUUsRUFBRTtJQUFFLElBQUcsS0FBSyxNQUFJLEVBQUUsR0FBRSxFQUFFLEVBQUUsSUFBRTtHQUFDLE9BQU0sSUFBRTtHQUFFLEVBQUUsRUFBRSxJQUFFLEVBQUU7R0FBRSxJQUFHLEtBQUssTUFBSSxFQUFFLEdBQUUsRUFBRSxJQUFFLEtBQUs7R0FBRSxJQUFFO0VBQUM7RUFBQyxFQUFFLElBQUU7Q0FBQztDQUFDLFNBQVNDLElBQUUsR0FBRSxHQUFFO0VBQUMsSUFBRSxLQUFLLE1BQUssS0FBSyxDQUFDO0VBQUUsS0FBSyxJQUFFO0VBQUUsS0FBSyxJQUFFLEtBQUs7RUFBRSxLQUFLLElBQUVQLE1BQUU7RUFBRSxLQUFLLElBQUU7RUFBRSxLQUFLLElBQUUsUUFBTSxJQUFFLEtBQUssSUFBRSxFQUFFO0VBQVEsS0FBSyxJQUFFLFFBQU0sSUFBRSxLQUFLLElBQUUsRUFBRTtFQUFVLEtBQUssT0FBSyxRQUFNLElBQUUsS0FBSyxJQUFFLEVBQUU7Q0FBSTtDQUFDLElBQUUsWUFBVSxJQUFJRSxJQUFBQTtDQUFFLElBQUUsVUFBVSxJQUFFLFdBQVU7RUFBQyxLQUFLLEtBQUc7RUFBRyxJQUFHLElBQUUsS0FBSyxHQUFFLE9BQU0sQ0FBQztFQUFFLElBQUcsT0FBSyxLQUFHLEtBQUssSUFBRyxPQUFNLENBQUM7RUFBRSxLQUFLLEtBQUc7RUFBRyxJQUFHLEtBQUssTUFBSUYsS0FBRSxPQUFNLENBQUM7RUFBRSxLQUFLLElBQUVBO0VBQUUsS0FBSyxLQUFHO0VBQUUsSUFBRyxLQUFLLElBQUUsS0FBRyxDQUFDUCxJQUFFLElBQUksR0FBRTtHQUFDLEtBQUssS0FBRztHQUFHLE9BQU0sQ0FBQztFQUFDO0VBQUMsSUFBSSxJQUFFQztFQUFFLElBQUc7R0FBQyxJQUFFLElBQUk7R0FBRSxNQUFFO0dBQUssSUFBSSxJQUFFLEtBQUssRUFBRTtHQUFFLElBQUcsS0FBRyxLQUFLLEtBQUcsS0FBSyxNQUFJLEtBQUcsTUFBSSxLQUFLLEdBQUU7SUFBQyxLQUFLLElBQUU7SUFBRSxLQUFLLEtBQUc7SUFBSSxLQUFLO0dBQUc7RUFBQyxTQUFPLEdBQUU7R0FBQyxLQUFLLElBQUU7R0FBRSxLQUFLLEtBQUc7R0FBRyxLQUFLO0VBQUc7RUFBQyxNQUFFO0VBQUUsSUFBRSxJQUFJO0VBQUUsS0FBSyxLQUFHO0VBQUcsT0FBTSxDQUFDO0NBQUM7Q0FBRSxJQUFFLFVBQVUsSUFBRSxTQUFTLEdBQUU7RUFBQyxJQUFHLEtBQUssTUFBSSxLQUFLLEdBQUU7R0FBQyxLQUFLLEtBQUc7R0FBRyxLQUFJLElBQUksSUFBRSxLQUFLLEdBQUUsS0FBSyxNQUFJLEdBQUUsSUFBRSxFQUFFLEdBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztFQUFDO0VBQUMsSUFBRSxVQUFVLEVBQUUsS0FBSyxNQUFLLENBQUM7Q0FBQztDQUFFLElBQUUsVUFBVSxJQUFFLFNBQVMsR0FBRTtFQUFDLElBQUcsS0FBSyxNQUFJLEtBQUssR0FBRTtHQUFDLElBQUUsVUFBVSxFQUFFLEtBQUssTUFBSyxDQUFDO0dBQUUsSUFBRyxLQUFLLE1BQUksS0FBSyxHQUFFO0lBQUMsS0FBSyxLQUFHO0lBQUksS0FBSSxJQUFJLElBQUUsS0FBSyxHQUFFLEtBQUssTUFBSSxHQUFFLElBQUUsRUFBRSxHQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7R0FBQztFQUFDO0NBQUM7Q0FBRSxJQUFFLFVBQVUsSUFBRSxXQUFVO0VBQUMsSUFBRyxFQUFFLElBQUUsS0FBSyxJQUFHO0dBQUMsS0FBSyxLQUFHO0dBQUUsS0FBSSxJQUFJLElBQUUsS0FBSyxHQUFFLEtBQUssTUFBSSxHQUFFLElB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STtDQUFDO0NBQUMsU0FBUyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtFQUFDLElBQUksSUFBRTtHQUFDLE1BQUs7R0FBRSxPQUFNO0dBQUUsS0FBSTtHQUFFLEtBQUk7R0FBRSxLQUFJO0dBQUssSUFBRztHQUFLLEtBQUk7R0FBRSxLQUFJO0dBQUssS0FBSTtHQUFLLGFBQVksS0FBSztHQUFFLEtBQUksUUFBTSxJQUFFLEVBQUVILE1BQUU7R0FBRSxLQUFJO0dBQUcsS0FBSTtFQUFDO0VBQUUsT0FBTyxRQUFNLEtBQUcsUUFBTSxFQUFFLFNBQU8sRUFBRSxNQUFNLENBQUMsR0FBRTtDQUFDO0NBQW1DLFNBQVMsRUFBRSxHQUFFO0VBQUMsT0FBTyxFQUFFO0NBQVE7Q0FBQyxTQUFTLEVBQUUsR0FBRSxHQUFFO0VBQUMsS0FBSyxRQUFNLEdBQUUsS0FBSyxVQUFRO0NBQUM7Q0FBQyxTQUFTLEVBQUUsR0FBRSxHQUFFO0VBQUMsSUFBRyxRQUFNLEdBQUUsT0FBTyxFQUFFLEtBQUcsRUFBRSxFQUFFLElBQUcsRUFBRSxNQUFJLENBQUMsSUFBRTtFQUFLLEtBQUksSUFBSSxHQUFFLElBQUUsRUFBRSxJQUFJLFFBQU8sS0FBSSxJQUFHLFNBQU8sSUFBRSxFQUFFLElBQUksT0FBSyxRQUFNLEVBQUUsS0FBSSxPQUFPLEVBQUU7RUFBSSxPQUFNLGNBQVksT0FBTyxFQUFFLE9BQUssRUFBRSxDQUFDLElBQUU7Q0FBSTtDQUFDLFNBQVMsRUFBRSxHQUFFO0VBQUMsSUFBRyxFQUFFLE9BQUssRUFBRSxLQUFJO0dBQUMsSUFBSSxJQUFFLEVBQUUsS0FBSSxJQUFFLEVBQUUsS0FBSSxJQUFFLENBQUMsR0FBRSxJQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsQ0FBQyxHQUFFLENBQUM7R0FBRSxFQUFFLE1BQUksRUFBRSxNQUFJLEdBQUUsRUFBRSxTQUFPLEVBQUUsTUFBTSxDQUFDLEdBQUUsRUFBRSxFQUFFLEtBQUksR0FBRSxHQUFFLEVBQUUsS0FBSSxFQUFFLElBQUksY0FBYSxLQUFHLEVBQUUsTUFBSSxDQUFDLENBQUMsSUFBRSxNQUFLLEdBQUUsUUFBTSxJQUFFLEVBQUUsQ0FBQyxJQUFFLEdBQUUsQ0FBQyxFQUFFLEtBQUcsRUFBRSxNQUFLLENBQUMsR0FBRSxFQUFFLE1BQUksRUFBRSxLQUFJLEVBQUUsR0FBRyxJQUFJLEVBQUUsT0FBSyxHQUFFLEVBQUUsR0FBRSxHQUFFLENBQUMsR0FBRSxFQUFFLE1BQUksRUFBRSxLQUFHLE1BQUssRUFBRSxPQUFLLEtBQUcsRUFBRSxDQUFDO0VBQUM7Q0FBQztDQUFDLFNBQVMsRUFBRSxHQUFFO0VBQUMsSUFBRyxTQUFPLElBQUUsRUFBRSxPQUFLLFFBQU0sRUFBRSxLQUFJLE9BQU8sRUFBRSxNQUFJLEVBQUUsSUFBSSxPQUFLLE1BQUssRUFBRSxJQUFJLEtBQUssU0FBUyxHQUFFO0dBQUMsSUFBRyxRQUFNLEtBQUcsUUFBTSxFQUFFLEtBQUksT0FBTyxFQUFFLE1BQUksRUFBRSxJQUFJLE9BQUssRUFBRTtFQUFHLENBQUMsR0FBRSxFQUFFLENBQUM7Q0FBQztDQUFDLFNBQVMsRUFBRSxHQUFFO0VBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBTSxFQUFFLE1BQUksQ0FBQyxNQUFJQyxJQUFFLEtBQUssQ0FBQyxLQUFHLENBQUMsRUFBRSxTQUFPLEtBQUcsRUFBRSx3QkFBc0IsSUFBRSxFQUFFLHNCQUFvQkMsS0FBRyxDQUFDO0NBQUM7Q0FBQyxTQUFTLElBQUc7RUFBQyxJQUFHO0dBQUMsS0FBSSxJQUFJLEdBQUUsSUFBRSxHQUFFRCxJQUFFLFNBQVEsSUFBRSxTQUFPLEtBQUdBLElBQUUsS0FBSyxDQUFDLEdBQUUsSUFBRUEsSUFBRSxNQUFNLEdBQUUsSUFBRUEsSUFBRSxRQUFPLEVBQUUsQ0FBQztFQUFDLFVBQVE7R0FBQyxJQUFFLFNBQU8sRUFBRSxNQUFJO0VBQUM7Q0FBQztDQUFDLFNBQVMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7RUFBQyxJQUFJLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsSUFBRSxLQUFHLEVBQUUsT0FBSyxHQUFFLElBQUUsRUFBRTtFQUFPLEtBQUksSUFBRSxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsS0FBSSxTQUFPLElBQUUsRUFBRSxJQUFJLFFBQU0sSUFBRSxNQUFJLEVBQUUsT0FBSyxFQUFFLEVBQUUsUUFBTSxHQUFFLEVBQUUsTUFBSSxHQUFFLElBQUUsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLEtBQUksRUFBRSxPQUFLLEVBQUUsT0FBSyxFQUFFLFFBQU0sRUFBRSxPQUFLLEVBQUUsRUFBRSxLQUFJLE1BQUssQ0FBQyxHQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUksRUFBRSxPQUFLLEdBQUUsQ0FBQyxJQUFHLFFBQU0sS0FBRyxRQUFNLE1BQUksSUFBRSxLQUFJLElBQUUsQ0FBQyxFQUFFLElBQUUsRUFBRSxTQUFPLEVBQUUsUUFBTSxFQUFFLE9BQUssSUFBRSxFQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsR0FBRSxLQUFHLEVBQUUsUUFBTSxFQUFFLE1BQUksU0FBTyxjQUFZLE9BQU8sRUFBRSxRQUFNLEtBQUssTUFBSSxJQUFFLElBQUUsSUFBRSxNQUFJLElBQUUsRUFBRSxjQUFhLEVBQUUsT0FBSztFQUFJLE9BQU8sRUFBRSxNQUFJLEdBQUU7Q0FBQztDQUFDLFNBQVMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7RUFBQyxJQUFJLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxJQUFFLEVBQUUsUUFBTyxJQUFFLEdBQUUsSUFBRTtFQUFFLEtBQUksRUFBRSxNQUFJLElBQUksTUFBTSxDQUFDLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxLQUFJLFNBQU8sSUFBRSxFQUFFLE9BQUssYUFBVyxPQUFPLEtBQUcsY0FBWSxPQUFPLEtBQUcsWUFBVSxPQUFPLEtBQUcsWUFBVSxPQUFPLEtBQUcsWUFBVSxPQUFPLEtBQUcsRUFBRSxlQUFhLFNBQU8sSUFBRSxFQUFFLElBQUksS0FBRyxFQUFFLE1BQUssR0FBRSxNQUFLLE1BQUssSUFBSSxJQUFFLEVBQUUsQ0FBQyxJQUFFLElBQUUsRUFBRSxJQUFJLEtBQUcsRUFBRSxHQUFFLEVBQUMsVUFBUyxFQUFDLEdBQUUsTUFBSyxNQUFLLElBQUksSUFBRSxLQUFLLE1BQUksRUFBRSxlQUFhLEVBQUUsTUFBSSxJQUFFLElBQUUsRUFBRSxJQUFJLEtBQUcsRUFBRSxFQUFFLE1BQUssRUFBRSxPQUFNLEVBQUUsS0FBSSxFQUFFLE1BQUksRUFBRSxNQUFJLE1BQUssRUFBRSxHQUFHLElBQUUsRUFBRSxJQUFJLEtBQUcsR0FBRSxJQUFFLElBQUUsR0FBRSxFQUFFLEtBQUcsR0FBRSxFQUFFLE1BQUksRUFBRSxNQUFJLEdBQUUsSUFBRSxNQUFLLE9BQUssSUFBRSxFQUFFLE1BQUksRUFBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLE9BQUssTUFBSyxJQUFFLEVBQUUsUUFBTSxFQUFFLE9BQUssS0FBSSxRQUFNLEtBQUcsUUFBTSxFQUFFLE9BQUssTUFBSSxNQUFJLElBQUUsSUFBRSxNQUFJLElBQUUsS0FBRyxNQUFLLGNBQVksT0FBTyxFQUFFLFNBQU8sRUFBRSxPQUFLLE1BQUksS0FBRyxNQUFJLEtBQUcsSUFBRSxJQUFFLE1BQUksS0FBRyxJQUFFLElBQUUsT0FBSyxJQUFFLElBQUUsTUFBSSxLQUFJLEVBQUUsT0FBSyxPQUFLLEVBQUUsSUFBSSxLQUFHO0VBQUssSUFBRyxHQUFFLEtBQUksSUFBRSxHQUFFLElBQUUsR0FBRSxLQUFJLFNBQU8sSUFBRSxFQUFFLE9BQUssTUFBSSxJQUFFLEVBQUUsU0FBTyxFQUFFLE9BQUssTUFBSSxJQUFFLEVBQUUsQ0FBQyxJQUFHLEVBQUUsR0FBRSxDQUFDO0VBQUcsT0FBTztDQUFDO0NBQUMsU0FBUyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7RUFBQyxJQUFJLEdBQUU7RUFBRSxJQUFHLGNBQVksT0FBTyxFQUFFLE1BQUs7R0FBQyxLQUFJLElBQUUsRUFBRSxLQUFJLElBQUUsR0FBRSxLQUFHLElBQUUsRUFBRSxRQUFPLEtBQUksRUFBRSxPQUFLLEVBQUUsR0FBRyxLQUFHLEdBQUUsSUFBRSxFQUFFLEVBQUUsSUFBRyxHQUFFLEdBQUUsQ0FBQztHQUFHLE9BQU87RUFBQztFQUFDLEVBQUUsT0FBSyxNQUFJLE1BQUksS0FBRyxFQUFFLFFBQU0sQ0FBQyxFQUFFLGVBQWEsSUFBRSxFQUFFLENBQUMsSUFBRyxFQUFFLGFBQWEsRUFBRSxLQUFJLEtBQUcsSUFBSSxJQUFHLElBQUUsRUFBRTtFQUFLO0dBQUcsSUFBRSxLQUFHLEVBQUU7U0FBa0IsUUFBTSxLQUFHLEtBQUcsRUFBRTtFQUFVLE9BQU87Q0FBQztDQUE2RyxTQUFTLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtFQUFDLElBQUksR0FBRSxHQUFFLEdBQUUsSUFBRSxFQUFFLEtBQUksSUFBRSxFQUFFLE1BQUssSUFBRSxFQUFFLElBQUcsSUFBRSxRQUFNLEtBQUcsTUFBSSxJQUFFLEVBQUU7RUFBSyxJQUFHLFNBQU8sS0FBRyxRQUFNLEtBQUcsS0FBRyxLQUFHLEVBQUUsT0FBSyxLQUFHLEVBQUUsTUFBSyxPQUFPO0VBQUUsSUFBRyxLQUFHLElBQUUsSUFBRTtRQUFPLElBQUUsSUFBRSxHQUFFLElBQUUsSUFBRSxHQUFFLEtBQUcsS0FBRyxJQUFFLEVBQUUsU0FBUSxJQUFHLFNBQU8sSUFBRSxFQUFFLElBQUUsS0FBRyxJQUFFLE1BQUksU0FBTyxNQUFJLElBQUUsRUFBRSxRQUFNLEtBQUcsRUFBRSxPQUFLLEtBQUcsRUFBRSxNQUFLLE9BQU87RUFBQTtFQUFFLE9BQU07Q0FBRTtDQUFDLFNBQVMsRUFBRSxHQUFFLEdBQUUsR0FBRTtFQUFDLE9BQUssRUFBRSxLQUFHLEVBQUUsWUFBWSxHQUFFLFFBQU0sSUFBRSxLQUFHLENBQUMsSUFBRSxFQUFFLEtBQUcsUUFBTSxJQUFFLEtBQUcsWUFBVSxPQUFPLEtBQUcsRUFBRSxLQUFLLENBQUMsSUFBRSxJQUFFLElBQUU7Q0FBSTtDQUFD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LEdBQUUsQ0FBQyxJQUFHLElBQUUsUUFBTSxLQUFHLEVBQUUsU0FBTyxLQUFHLFFBQU0sRUFBRSxNQUFJLEVBQUUsRUFBRSxNQUFNLFFBQVEsSUFBRSxHQUFFLElBQUUsRUFBRSxHQUFFLEVBQUUsQ0FBQyxJQUFFLElBQUUsQ0FBQyxDQUFDLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsR0FBRSxFQUFFLE9BQUssRUFBRSxLQUFJLEVBQUUsT0FBSyxNQUFLLEVBQUUsSUFBSSxVQUFRLEVBQUUsS0FBSyxDQUFDLEdBQUUsTUFBSSxFQUFFLE1BQUksRUFBRSxLQUFHO0VBQUssU0FBTyxHQUFFO0dBQUMsSUFBRyxFQUFFLE1BQUksTUFBSyxLQUFHLFFBQU0sR0FBRSxJQUFHLEVBQUUsTUFBSztJQUFDLEtBQUksRUFBRSxPQUFLLElBQUUsTUFBSSxLQUFJLEtBQUcsS0FBRyxFQUFFLFlBQVUsRUFBRSxjQUFhLElBQUUsRUFBRTtJQUFZLEVBQUUsRUFBRSxRQUFRLENBQUMsS0FBRyxNQUFLLEVBQUUsTUFBSTtHQUFDLE9BQUs7SUFBQyxLQUFJLElBQUUsRUFBRSxRQUFPLE1BQUssRUFBRSxFQUFFLEVBQUU7SUFBRSxFQUFFLENBQUM7R0FBQztRQUFNLEVBQUUsTUFBSSxFQUFFLEtBQUksRUFBRSxNQUFJLEVBQUUsS0FBSSxFQUFFLFFBQU0sRUFBRSxDQUFDO0dBQUUsRUFBRSxJQUFJLEdBQUUsR0FBRSxDQUFDO0VBQUM7T0FBTSxRQUFNLEtBQUcsRUFBRSxPQUFLLEVBQUUsT0FBSyxFQUFFLE1BQUksRUFBRSxLQUFJLEVBQUUsTUFBSSxFQUFFLE9BQUssSUFBRSxFQUFFLE1BQUksRUFBRSxFQUFFLEtBQUksR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0VBQUUsUUFBTyxJQUFFLEVBQUUsV0FBUyxFQUFFLENBQUMsR0FBRSxNQUFJLEVBQUUsTUFBSSxLQUFLLElBQUU7Q0FBQztDQUFDLFNBQVMsRUFBRSxHQUFFO0VBQUMsTUFBSSxFQUFF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