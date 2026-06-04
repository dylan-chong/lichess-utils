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
	//#region src/application-handlers/updateDividers.ts
	function updateDividers(state) {
		if (settings.dividersEnabled.value) showDividers(state);
		else hideDividers(state);
	}
	//#endregion
	//#region src/application-effects/onDividers.ts
	function setupDividersEffect(state) {
		return j$1(() => {
			settings.dividersEnabled.value;
			updateDividers(state);
		});
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGljaGVzcy1ib2FyZC1zcGVha2VyLnVzZXIuanMiLCJuYW1lcyI6WyJpIiwidCIsInMiLCJjIiwiaCIsInciLCJyIiwibyIsImYiLCJ2IiwidSIsImUiLCJkIiwiYSIsImwiLCJqIiwieSIsIl8iLCJiIiwicCIsIlMiLCJtIiwieCIsIkUiLCJ1IiwiaSIsIm8iLCJmIiwibCIsInIiXSwic291cmNlcyI6WyJub2RlX21vZHVsZXMvQHByZWFjdC9zaWduYWxzLWNvcmUvZGlzdC9zaWduYWxzLWNvcmUubW9kdWxlLmpzIiwic3JjL2NvbnN0YW50cy9jaGVzcy50cyIsInNyYy9jb25zdGFudHMvY29tbWFuZHMudHMiLCJzcmMvY29uc3RhbnRzL2RvbS50cyIsInNyYy9wbGF0Zm9ybS9kb20udHMiLCJzcmMvYWRhcHRlcnMtb3ZlcmxheXMvZGl2aWRlcnMudHMiLCJzcmMvYWRhcHRlcnMtb3ZlcmxheXMvZmxhc2gudHMiLCJzcmMvcGxhdGZvcm0vc3RvcmFnZS50cyIsInNyYy9zZXR0aW5ncy9kZWZhdWx0cy50cyIsInNyYy9zZXR0aW5ncy9zZXR0aW5nc1N0b3JlLnRzIiwic3JjL2FwcGxpY2F0aW9uLWhhbmRsZXJzL3VwZGF0ZURpdmlkZXJzLnRzIiwic3JjL2FwcGxpY2F0aW9uLWVmZmVjdHMvb25EaXZpZGVycy50cyIsInNyYy9wbGF0Zm9ybS9tdXRhdGlvbk9ic2VydmVyLnRzIiwic3JjL2FwcGxpY2F0aW9uLW9ic2VydmVycy9vYnNlcnZlclN0YXRlLnRzIiwic3JjL3BsYXRmb3JtL3NwZWVjaEFwaS50cyIsInNyYy9hZGFwdGVycy1zcGVlY2gvc3BlZWNoU3ludGhlc2l6ZXIudHMiLCJzcmMvZG9tYWluL2NoZXNzL2Nvb3JkaW5hdGVzLnRzIiwic3JjL2RvbS9ib2FyZFJlYWRlci50cyIsInNyYy9kb21haW4vY2hlc3MvcGllY2VHcm91cGluZy50cyIsInNyYy9kb21haW4vc3BlZWNoL3NwZWVjaFRleHQudHMiLCJzcmMvYXBwbGljYXRpb24taGFuZGxlcnMvaGFuZGxlU3BlZWNoQ29tbWFuZC50cyIsInNyYy9jb21tYW5kcy9rZXlib2FyZElucHV0LnRzIiwibm9kZV9tb2R1bGVzL3ByZWFjdC9kaXN0L3ByZWFjdC5tb2R1bGUuanMiLCJub2RlX21vZHVsZXMvcHJlYWN0L2pzeC1ydW50aW1lL2Rpc3QvanN4UnVudGltZS5tb2R1bGUuanMiLCJzcmMvY29tcG9uZW50cy9CdXR0b25Sb3cudHN4Iiwic3JjL2NvbXBvbmVudHMvU2V0dGluZ0J1dHRvbi50c3giLCJzcmMvY29tcG9uZW50cy9Db250cm9sUGFuZWwudHN4Iiwic3JjL2NvbXBvbmVudHMvcm9vdC50c3giLCJzcmMvaW5pdC50c3giLCJzcmMvbWFpbi50c3giXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGk9U3ltYm9sLmZvcihcInByZWFjdC1zaWduYWxzXCIpO2Z1bmN0aW9uIHQoKXtpZighKHM+MSkpe3ZhciBpLHQ9ITE7IWZ1bmN0aW9uKCl7dmFyIGk9YztjPXZvaWQgMDt3aGlsZSh2b2lkIDAhPT1pKXtpZihpLlMudj09PWkudilpLlMuaT1pLmk7aT1pLm99fSgpO3doaWxlKHZvaWQgMCE9PWgpe3ZhciBuPWg7aD12b2lkIDA7disrO3doaWxlKHZvaWQgMCE9PW4pe3ZhciByPW4udTtuLnU9dm9pZCAwO24uZiY9LTM7aWYoISg4Jm4uZikmJncobikpdHJ5e24uYygpfWNhdGNoKG4pe2lmKCF0KXtpPW47dD0hMH19bj1yfX12PTA7cy0tO2lmKHQpdGhyb3cgaX1lbHNlIHMtLX1mdW5jdGlvbiBuKGkpe2lmKHM+MClyZXR1cm4gaSgpO2U9Kyt1O3MrKzt0cnl7cmV0dXJuIGkoKX1maW5hbGx5e3QoKX19dmFyIHI9dm9pZCAwO2Z1bmN0aW9uIG8oaSl7dmFyIHQ9cjtyPXZvaWQgMDt0cnl7cmV0dXJuIGkoKX1maW5hbGx5e3I9dH19dmFyIGYsaD12b2lkIDAscz0wLHY9MCx1PTAsZT0wLGM9dm9pZCAwLGQ9MDtmdW5jdGlvbiBhKGkpe2lmKHZvaWQgMCE9PXIpe3ZhciB0PWkubjtpZih2b2lkIDA9PT10fHx0LnQhPT1yKXt0PXtpOjAsUzppLHA6ci5zLG46dm9pZCAwLHQ6cixlOnZvaWQgMCx4OnZvaWQgMCxyOnR9O2lmKHZvaWQgMCE9PXIucylyLnMubj10O3Iucz10O2kubj10O2lmKDMyJnIuZilpLlModCk7cmV0dXJuIHR9ZWxzZSBpZigtMT09PXQuaSl7dC5pPTA7aWYodm9pZCAwIT09dC5uKXt0Lm4ucD10LnA7aWYodm9pZCAwIT09dC5wKXQucC5uPXQubjt0LnA9ci5zO3Qubj12b2lkIDA7ci5zLm49dDtyLnM9dH1yZXR1cm4gdH19fWZ1bmN0aW9uIGwoaSx0KXt0aGlzLnY9aTt0aGlzLmk9MDt0aGlzLm49dm9pZCAwO3RoaXMudD12b2lkIDA7dGhpcy5sPTA7dGhpcy5XPW51bGw9PXQ/dm9pZCAwOnQud2F0Y2hlZDt0aGlzLlo9bnVsbD09dD92b2lkIDA6dC51bndhdGNoZWQ7dGhpcy5uYW1lPW51bGw9PXQ/dm9pZCAwOnQubmFtZX1sLnByb3RvdHlwZS5icmFuZD1pO2wucHJvdG90eXBlLmg9ZnVuY3Rpb24oKXtyZXR1cm4hMH07bC5wcm90b3R5cGUuUz1mdW5jdGlvbihpKXt2YXIgdD10aGlzLG49dGhpcy50O2lmKG4hPT1pJiZ2b2lkIDA9PT1pLmUpe2kueD1uO3RoaXMudD1pO2lmKHZvaWQgMCE9PW4pbi5lPWk7ZWxzZSBvKGZ1bmN0aW9uKCl7dmFyIGk7bnVsbD09KGk9dC5XKXx8aS5jYWxsKHQpfSl9fTtsLnByb3RvdHlwZS5VPWZ1bmN0aW9uKGkpe3ZhciB0PXRoaXM7aWYodm9pZCAwIT09dGhpcy50KXt2YXIgbj1pLmUscj1pLng7aWYodm9pZCAwIT09bil7bi54PXI7aS5lPXZvaWQgMH1pZih2b2lkIDAhPT1yKXtyLmU9bjtpLng9dm9pZCAwfWlmKGk9PT10aGlzLnQpe3RoaXMudD1yO2lmKHZvaWQgMD09PXIpbyhmdW5jdGlvbigpe3ZhciBpO251bGw9PShpPXQuWil8fGkuY2FsbCh0KX0pfX19O2wucHJvdG90eXBlLnN1YnNjcmliZT1mdW5jdGlvbihpKXt2YXIgdD10aGlzO3JldHVybiBqKGZ1bmN0aW9uKCl7dmFyIG49dC52YWx1ZSxvPXI7cj12b2lkIDA7dHJ5e2kobil9ZmluYWxseXtyPW99fSx7bmFtZTpcInN1YlwifSl9O2wucHJvdG90eXBlLnZhbHVlT2Y9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy52YWx1ZX07bC5wcm90b3R5cGUudG9TdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy52YWx1ZStcIlwifTtsLnByb3RvdHlwZS50b0pTT049ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy52YWx1ZX07bC5wcm90b3R5cGUucGVlaz1mdW5jdGlvbigpe3ZhciBpPXRoaXM7cmV0dXJuIG8oZnVuY3Rpb24oKXtyZXR1cm4gaS52YWx1ZX0pfTtPYmplY3QuZGVmaW5lUHJvcGVydHkobC5wcm90b3R5cGUsXCJ2YWx1ZVwiLHtnZXQ6ZnVuY3Rpb24oKXt2YXIgaT1hKHRoaXMpO2lmKHZvaWQgMCE9PWkpaS5pPXRoaXMuaTtyZXR1cm4gdGhpcy52fSxzZXQ6ZnVuY3Rpb24oaSl7aWYoaSE9PXRoaXMudil7aWYodj4xMDApdGhyb3cgbmV3IEVycm9yKFwiQ3ljbGUgZGV0ZWN0ZWRcIik7IWZ1bmN0aW9uKGkpe2lmKDAhPT1zJiYwPT09dilpZihpLmwhPT1lKXtpLmw9ZTtjPXtTOmksdjppLnYsaTppLmksbzpjfX19KHRoaXMpO3RoaXMudj1pO3RoaXMuaSsrO2QrKztzKys7dHJ5e2Zvcih2YXIgbj10aGlzLnQ7dm9pZCAwIT09bjtuPW4ueCluLnQuTigpfWZpbmFsbHl7dCgpfX19fSk7ZnVuY3Rpb24geShpLHQpe3JldHVybiBuZXcgbChpLHQpfWZ1bmN0aW9uIHcoaSl7Zm9yKHZhciB0PWkuczt2b2lkIDAhPT10O3Q9dC5uKWlmKHQuUy5pIT09dC5pfHwhdC5TLmgoKXx8dC5TLmkhPT10LmkpcmV0dXJuITA7cmV0dXJuITF9ZnVuY3Rpb24gXyhpKXtmb3IodmFyIHQ9aS5zO3ZvaWQgMCE9PXQ7dD10Lm4pe3ZhciBuPXQuUy5uO2lmKHZvaWQgMCE9PW4pdC5yPW47dC5TLm49dDt0Lmk9LTE7aWYodm9pZCAwPT09dC5uKXtpLnM9dDticmVha319fWZ1bmN0aW9uIGIoaSl7dmFyIHQ9aS5zLG49dm9pZCAwO3doaWxlKHZvaWQgMCE9PXQpe3ZhciByPXQucDtpZigtMT09PXQuaSl7dC5TLlUodCk7aWYodm9pZCAwIT09cilyLm49dC5uO2lmKHZvaWQgMCE9PXQubil0Lm4ucD1yfWVsc2Ugbj10O3QuUy5uPXQucjtpZih2b2lkIDAhPT10LnIpdC5yPXZvaWQgMDt0PXJ9aS5zPW59ZnVuY3Rpb24gcChpLHQpe2wuY2FsbCh0aGlzLHZvaWQgMCk7dGhpcy54PWk7dGhpcy5zPXZvaWQgMDt0aGlzLmc9ZC0xO3RoaXMuZj00O3RoaXMuVz1udWxsPT10P3ZvaWQgMDp0LndhdGNoZWQ7dGhpcy5aPW51bGw9PXQ/dm9pZCAwOnQudW53YXRjaGVkO3RoaXMubmFtZT1udWxsPT10P3ZvaWQgMDp0Lm5hbWV9cC5wcm90b3R5cGU9bmV3IGw7cC5wcm90b3R5cGUuaD1mdW5jdGlvbigpe3RoaXMuZiY9LTM7aWYoMSZ0aGlzLmYpcmV0dXJuITE7aWYoMzI9PSgzNiZ0aGlzLmYpKXJldHVybiEwO3RoaXMuZiY9LTU7aWYodGhpcy5nPT09ZClyZXR1cm4hMDt0aGlzLmc9ZDt0aGlzLmZ8PTE7aWYodGhpcy5pPjAmJiF3KHRoaXMpKXt0aGlzLmYmPS0yO3JldHVybiEwfXZhciBpPXI7dHJ5e18odGhpcyk7cj10aGlzO3ZhciB0PXRoaXMueCgpO2lmKDE2JnRoaXMuZnx8dGhpcy52IT09dHx8MD09PXRoaXMuaSl7dGhpcy52PXQ7dGhpcy5mJj0tMTc7dGhpcy5pKyt9fWNhdGNoKGkpe3RoaXMudj1pO3RoaXMuZnw9MTY7dGhpcy5pKyt9cj1pO2IodGhpcyk7dGhpcy5mJj0tMjtyZXR1cm4hMH07cC5wcm90b3R5cGUuUz1mdW5jdGlvbihpKXtpZih2b2lkIDA9PT10aGlzLnQpe3RoaXMuZnw9MzY7Zm9yKHZhciB0PXRoaXMuczt2b2lkIDAhPT10O3Q9dC5uKXQuUy5TKHQpfWwucHJvdG90eXBlLlMuY2FsbCh0aGlzLGkpfTtwLnByb3RvdHlwZS5VPWZ1bmN0aW9uKGkpe2lmKHZvaWQgMCE9PXRoaXMudCl7bC5wcm90b3R5cGUuVS5jYWxsKHRoaXMsaSk7aWYodm9pZCAwPT09dGhpcy50KXt0aGlzLmYmPS0zMztmb3IodmFyIHQ9dGhpcy5zO3ZvaWQgMCE9PXQ7dD10Lm4pdC5TLlUodCl9fX07cC5wcm90b3R5cGUuTj1mdW5jdGlvbigpe2lmKCEoMiZ0aGlzLmYpKXt0aGlzLmZ8PTY7Zm9yKHZhciBpPXRoaXMudDt2b2lkIDAhPT1pO2k9aS54KWkudC5OKCl9fTtPYmplY3QuZGVmaW5lUHJvcGVydHkocC5wcm90b3R5cGUsXCJ2YWx1ZVwiLHtnZXQ6ZnVuY3Rpb24oKXtpZigxJnRoaXMuZil0aHJvdyBuZXcgRXJyb3IoXCJDeWNsZSBkZXRlY3RlZFwiKTt2YXIgaT1hKHRoaXMpO3RoaXMuaCgpO2lmKHZvaWQgMCE9PWkpaS5pPXRoaXMuaTtpZigxNiZ0aGlzLmYpdGhyb3cgdGhpcy52O3JldHVybiB0aGlzLnZ9fSk7ZnVuY3Rpb24gZyhpLHQpe3JldHVybiBuZXcgcChpLHQpfWZ1bmN0aW9uIFMoaSl7dmFyIG49aS5tO2kubT12b2lkIDA7aWYoXCJmdW5jdGlvblwiPT10eXBlb2Ygbil7cysrO3ZhciBvPXI7cj12b2lkIDA7dHJ5e24oKX1jYXRjaCh0KXtpLmYmPS0yO2kuZnw9ODttKGkpO3Rocm93IHR9ZmluYWxseXtyPW87dCgpfX19ZnVuY3Rpb24gbShpKXtmb3IodmFyIHQ9aS5zO3ZvaWQgMCE9PXQ7dD10Lm4pdC5TLlUodCk7aS54PXZvaWQgMDtpLnM9dm9pZCAwO1MoaSl9ZnVuY3Rpb24geChpKXtpZihyIT09dGhpcyl0aHJvdyBuZXcgRXJyb3IoXCJPdXQtb2Ytb3JkZXIgZWZmZWN0XCIpO2IodGhpcyk7cj1pO3RoaXMuZiY9LTI7aWYoOCZ0aGlzLmYpbSh0aGlzKTt0KCl9ZnVuY3Rpb24gRShpLHQpe3RoaXMueD1pO3RoaXMubT12b2lkIDA7dGhpcy5zPXZvaWQgMDt0aGlzLnU9dm9pZCAwO3RoaXMuZj0zMjt0aGlzLm5hbWU9bnVsbD09dD92b2lkIDA6dC5uYW1lO2lmKGYpZi5wdXNoKHRoaXMpfUUucHJvdG90eXBlLmM9ZnVuY3Rpb24oKXt2YXIgaT10aGlzLlMoKTt0cnl7aWYoOCZ0aGlzLmYpcmV0dXJuO2lmKHZvaWQgMD09PXRoaXMueClyZXR1cm47dmFyIHQ9dGhpcy54KCk7aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgdCl0aGlzLm09dH1maW5hbGx5e2koKX19O0UucHJvdG90eXBlLlM9ZnVuY3Rpb24oKXtpZigxJnRoaXMuZil0aHJvdyBuZXcgRXJyb3IoXCJDeWNsZSBkZXRlY3RlZFwiKTt0aGlzLmZ8PTE7dGhpcy5mJj0tOTtTKHRoaXMpO18odGhpcyk7cysrO3ZhciBpPXI7cj10aGlzO3JldHVybiB4LmJpbmQodGhpcyxpKX07RS5wcm90b3R5cGUuTj1mdW5jdGlvbigpe2lmKCEoMiZ0aGlzLmYpKXt0aGlzLmZ8PTI7dGhpcy51PWg7aD10aGlzfX07RS5wcm90b3R5cGUuZD1mdW5jdGlvbigpe3RoaXMuZnw9ODtpZighKDEmdGhpcy5mKSltKHRoaXMpfTtFLnByb3RvdHlwZS5kaXNwb3NlPWZ1bmN0aW9uKCl7dGhpcy5kKCl9O2Z1bmN0aW9uIGooaSx0KXt2YXIgbj1uZXcgRShpLHQpO3RyeXtuLmMoKX1jYXRjaChpKXtuLmQoKTt0aHJvdyBpfXZhciByPW4uZC5iaW5kKG4pO3JbU3ltYm9sLmRpc3Bvc2VdPXI7cmV0dXJuIHJ9ZnVuY3Rpb24gQyhpKXtyZXR1cm4gZnVuY3Rpb24oKXt2YXIgdD1hcmd1bWVudHMscj10aGlzO3JldHVybiBuKGZ1bmN0aW9uKCl7cmV0dXJuIG8oZnVuY3Rpb24oKXtyZXR1cm4gaS5hcHBseShyLFtdLnNsaWNlLmNhbGwodCkpfSl9KX19ZnVuY3Rpb24gTygpe3ZhciBpPWY7Zj1bXTtyZXR1cm4gZnVuY3Rpb24oKXt2YXIgdD1mO2lmKGYmJmkpaT1pLmNvbmNhdChmKTtmPWk7cmV0dXJuIHR9fXZhciBrPWZ1bmN0aW9uKGkpe2Zvcih2YXIgdCBpbiBpKXt2YXIgbj1pW3RdO2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIG4paVt0XT1DKG4pO2Vsc2UgaWYoXCJvYmplY3RcIj09dHlwZW9mIG4mJm51bGwhPT1uJiYhKFwiYnJhbmRcImluIG4pKWsobil9fTtmdW5jdGlvbiBUKGkpe3JldHVybiBmdW5jdGlvbigpe3ZhciB0LG4scj1PKCk7dHJ5e249aS5hcHBseSh2b2lkIDAsW10uc2xpY2UuY2FsbChhcmd1bWVudHMpKX1jYXRjaChpKXtmPXZvaWQgMDt0aHJvdyBpfWZpbmFsbHl7dD1yKCl9ayhuKTtuW1N5bWJvbC5kaXNwb3NlXT1DKGZ1bmN0aW9uKCl7aWYodClmb3IodmFyIGk9MDtpPHQubGVuZ3RoO2krKyl0W2ldLmRpc3Bvc2UoKTt0PXZvaWQgMH0pO3JldHVybiBufX1leHBvcnR7cCBhcyBDb21wdXRlZCxFIGFzIEVmZmVjdCxsIGFzIFNpZ25hbCxDIGFzIGFjdGlvbixuIGFzIGJhdGNoLGcgYXMgY29tcHV0ZWQsVCBhcyBjcmVhdGVNb2RlbCxqIGFzIGVmZmVjdCx5IGFzIHNpZ25hbCxvIGFzIHVudHJhY2tlZH07Ly8jIHNvdXJjZU1hcHBpbmdVUkw9c2lnbmFscy1jb3JlLm1vZHVsZS5qcy5tYXBcbiIsImV4cG9ydCBlbnVtIFBsYXllckNvbG9yIHtcbiAgV0hJVEUgPSAnd2hpdGUnLFxuICBCTEFDSyA9ICdibGFjaycsXG59XG5cbmV4cG9ydCBlbnVtIFBpZWNlVHlwZSB7XG4gIFBBV04gPSAncGF3bicsXG4gIEtOSUdIVCA9ICdrbmlnaHQnLFxuICBCSVNIT1AgPSAnYmlzaG9wJyxcbiAgUk9PSyA9ICdyb29rJyxcbiAgUVVFRU4gPSAncXVlZW4nLFxuICBLSU5HID0gJ2tpbmcnLFxufVxuXG5leHBvcnQgZW51bSBRdWFkcmFudCB7XG4gIFdISVRFX0tJTkcgPSAnd2snLFxuICBXSElURV9RVUVFTiA9ICd3cScsXG4gIEJMQUNLX0tJTkcgPSAnYmsnLFxuICBCTEFDS19RVUVFTiA9ICdicScsXG59XG5cbi8vIEhlbHBlciBhcnJheXMgZm9yIGl0ZXJhdGlvblxuZXhwb3J0IGNvbnN0IFBMQVlFUl9DT0xPUl9WQUxVRVMgPSBPYmplY3QudmFsdWVzKFBsYXllckNvbG9yKVxuZXhwb3J0IGNvbnN0IFBJRUNFX1RZUEVfVkFMVUVTID0gT2JqZWN0LnZhbHVlcyhQaWVjZVR5cGUpXG5leHBvcnQgY29uc3QgUVVBRFJBTlRfVkFMVUVTID0gT2JqZWN0LnZhbHVlcyhRdWFkcmFudClcbiIsImV4cG9ydCBlbnVtIEtleWJvYXJkQ29tbWFuZCB7XG4gIFBXSyA9ICdwd2snLFxuICBQV1EgPSAncHdxJyxcbiAgUEJLID0gJ3BiaycsXG4gIFBCUSA9ICdwYnEnLFxuICBQQSA9ICdwYScsXG4gIFBXVyA9ICdwd3cnLFxuICBQQkIgPSAncGJiJyxcbiAgUFNTID0gJ3BzcycsXG59XG5cbmV4cG9ydCBlbnVtIFNwZWVjaENvbW1hbmQge1xuICBBTEwgPSAnYWxsJyxcbiAgV0hJVEUgPSAnd2hpdGUnLFxuICBCTEFDSyA9ICdibGFjaycsXG4gIFNUT1AgPSAnc3RvcCcsXG4gIFdLID0gJ3drJyxcbiAgV1EgPSAnd3EnLFxuICBCSyA9ICdiaycsXG4gIEJRID0gJ2JxJyxcbn1cblxuLy8gS2V5Ym9hcmQgdG8gc3BlZWNoIGNvbW1hbmQgbWFwcGluZ1xuZXhwb3J0IGNvbnN0IEtFWUJPQVJEX0NPTU1BTkRfTUFQID0gbmV3IE1hcChbXG4gIFtLZXlib2FyZENvbW1hbmQuUFdLLCBTcGVlY2hDb21tYW5kLldLXSxcbiAgW0tleWJvYXJkQ29tbWFuZC5QV1EsIFNwZWVjaENvbW1hbmQuV1FdLFxuICBbS2V5Ym9hcmRDb21tYW5kLlBCSywgU3BlZWNoQ29tbWFuZC5CS10sXG4gIFtLZXlib2FyZENvbW1hbmQuUEJRLCBTcGVlY2hDb21tYW5kLkJRXSxcbiAgW0tleWJvYXJkQ29tbWFuZC5QQSwgU3BlZWNoQ29tbWFuZC5BTExdLFxuICBbS2V5Ym9hcmRDb21tYW5kLlBXVywgU3BlZWNoQ29tbWFuZC5XSElURV0sXG4gIFtLZXlib2FyZENvbW1hbmQuUEJCLCBTcGVlY2hDb21tYW5kLkJMQUNLXSxcbiAgW0tleWJvYXJkQ29tbWFuZC5QU1MsIFNwZWVjaENvbW1hbmQuU1RPUF0sXG5dIGFzIGNvbnN0KVxuIiwiLy8gRE9NIHNlbGVjdG9ycyBlbnVtXG5leHBvcnQgZW51bSBEb21TZWxlY3RvciB7XG4gIEJPQVJEID0gJ2NnLWJvYXJkJyxcbiAgQk9BUkRfTk9fQ1VTVE9NID0gJ2NnLWJvYXJkOm5vdCgudXNlcnNjcmlwdC1jdXN0b20tYm9hcmQpJyxcbiAgQ09PUkRTID0gJ2Nvb3JkcycsXG4gIFBJRUNFID0gJ3BpZWNlJyxcbiAgQ09OVEFJTkVSID0gJ2NnLWNvbnRhaW5lcicsXG4gIEtFWUJPQVJEX01PVkUgPSAnLmtleWJvYXJkLW1vdmUnLFxuICBLRVlCT0FSRF9JTlBVVCA9ICcua2V5Ym9hcmQtbW92ZSBpbnB1dCcsXG59XG5cbi8vIENTUyBjbGFzc2VzIGVudW1cbmV4cG9ydCBlbnVtIENzc0NsYXNzIHtcbiAgQkxBQ0sgPSAnYmxhY2snLFxuICBVU0VSU0NSSVBUX0RJVklERVJTID0gJ3VzZXJzY3JpcHQtZGl2aWRlcnMnLFxuICBVU0VSU0NSSVBUX0ZMQVNIID0gJ3VzZXJzY3JpcHQtZmxhc2gtb3ZlcmxheScsXG59XG5cbi8vIENTUyBkaXNwbGF5IHZhbHVlcyBlbnVtXG5leHBvcnQgZW51bSBDc3NEaXNwbGF5IHtcbiAgQkxPQ0sgPSAnYmxvY2snLFxuICBOT05FID0gJ25vbmUnLFxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZURpdigpOiBIVE1MRGl2RWxlbWVudCB7XG4gIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU3ZnRWxlbWVudCh0YWc6IHN0cmluZyk6IFNWR0VsZW1lbnQge1xuICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsIHRhZylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3I6IHN0cmluZyk6IEVsZW1lbnQgfCBudWxsIHtcbiAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBxdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yOiBzdHJpbmcpOiBOb2RlTGlzdE9mPEVsZW1lbnQ+IHtcbiAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBlbmRDaGlsZChwYXJlbnQ6IEVsZW1lbnQsIGNoaWxkOiBFbGVtZW50KTogdm9pZCB7XG4gIHBhcmVudC5hcHBlbmRDaGlsZChjaGlsZClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEJvdW5kaW5nQ2xpZW50UmVjdChlbGVtZW50OiBFbGVtZW50KTogRE9NUmVjdCB7XG4gIHJldHVybiBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG59XG4iLCJpbXBvcnQgeyBDc3NDbGFzcywgQ3NzRGlzcGxheSwgRG9tU2VsZWN0b3IgfSBmcm9tICcuLi9jb25zdGFudHMnXG5pbXBvcnQgeyBhcHBlbmRDaGlsZCwgY3JlYXRlU3ZnRWxlbWVudCwgcXVlcnlTZWxlY3RvciB9IGZyb20gJy4uL3BsYXRmb3JtL2RvbSdcblxuZXhwb3J0IGludGVyZmFjZSBEaXZpZGVyc1N0YXRlIHtcbiAgc3ZnOiBTVkdTVkdFbGVtZW50XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVEaXZpZGVycygpOiBEaXZpZGVyc1N0YXRlIHtcbiAgY29uc3QgYm9hcmQgPSBxdWVyeVNlbGVjdG9yKERvbVNlbGVjdG9yLkJPQVJEKVxuICBpZiAoIWJvYXJkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdCb2FyZCBub3QgZm91bmQnKVxuICB9XG5cbiAgY29uc3QgcmVjdCA9IGJvYXJkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gIGNvbnN0IHNpemUgPSByZWN0LndpZHRoXG5cbiAgY29uc3Qgc3ZnID0gY3JlYXRlU3ZnRWxlbWVudCgnc3ZnJykgYXMgU1ZHU1ZHRWxlbWVudFxuICBzdmcuc2V0QXR0cmlidXRlKCdjbGFzcycsIENzc0NsYXNzLlVTRVJTQ1JJUFRfRElWSURFUlMpXG4gIHN2Zy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgc2l6ZS50b1N0cmluZygpKVxuICBzdmcuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBzaXplLnRvU3RyaW5nKCkpXG4gIHN2Zy5zdHlsZS5jc3NUZXh0ID0gYFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDA7XG4gICAgbGVmdDogMDtcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICBkaXNwbGF5OiBub25lO1xuICBgXG5cbiAgLy8gVmVydGljYWwgbGluZVxuICBjb25zdCB2TGluZSA9IGNyZWF0ZVN2Z0VsZW1lbnQoJ2xpbmUnKVxuICB2TGluZS5zZXRBdHRyaWJ1dGUoJ3gxJywgKHNpemUgLyAyKS50b1N0cmluZygpKVxuICB2TGluZS5zZXRBdHRyaWJ1dGUoJ3kxJywgJzAnKVxuICB2TGluZS5zZXRBdHRyaWJ1dGUoJ3gyJywgKHNpemUgLyAyKS50b1N0cmluZygpKVxuICB2TGluZS5zZXRBdHRyaWJ1dGUoJ3kyJywgc2l6ZS50b1N0cmluZygpKVxuICB2TGluZS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsICdyZWQnKVxuICB2TGluZS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS13aWR0aCcsICcyJylcblxuICAvLyBIb3Jpem9udGFsIGxpbmVcbiAgY29uc3QgaExpbmUgPSBjcmVhdGVTdmdFbGVtZW50KCdsaW5lJylcbiAgaExpbmUuc2V0QXR0cmlidXRlKCd4MScsICcwJylcbiAgaExpbmUuc2V0QXR0cmlidXRlKCd5MScsIChzaXplIC8gMikudG9TdHJpbmcoKSlcbiAgaExpbmUuc2V0QXR0cmlidXRlKCd4MicsIHNpemUudG9TdHJpbmcoKSlcbiAgaExpbmUuc2V0QXR0cmlidXRlKCd5MicsIChzaXplIC8gMikudG9TdHJpbmcoKSlcbiAgaExpbmUuc2V0QXR0cmlidXRlKCdzdHJva2UnLCAncmVkJylcbiAgaExpbmUuc2V0QXR0cmlidXRlKCdzdHJva2Utd2lkdGgnLCAnMicpXG5cbiAgYXBwZW5kQ2hpbGQoc3ZnLCB2TGluZSlcbiAgYXBwZW5kQ2hpbGQoc3ZnLCBoTGluZSlcblxuICBhcHBlbmRDaGlsZChib2FyZCwgc3ZnKVxuXG4gIHJldHVybiB7IHN2ZyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93RGl2aWRlcnMoc3RhdGU6IERpdmlkZXJzU3RhdGUpOiB2b2lkIHtcbiAgc3RhdGUuc3ZnLnN0eWxlLmRpc3BsYXkgPSBDc3NEaXNwbGF5LkJMT0NLXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoaWRlRGl2aWRlcnMoc3RhdGU6IERpdmlkZXJzU3RhdGUpOiB2b2lkIHtcbiAgc3RhdGUuc3ZnLnN0eWxlLmRpc3BsYXkgPSBDc3NEaXNwbGF5Lk5PTkVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlc3Ryb3lEaXZpZGVycyhzdGF0ZTogRGl2aWRlcnNTdGF0ZSk6IHZvaWQge1xuICBzdGF0ZS5zdmcucmVtb3ZlKClcbn1cbiIsImltcG9ydCB7IENzc0NsYXNzLCBDc3NEaXNwbGF5LCBEb21TZWxlY3RvciB9IGZyb20gJy4uL2NvbnN0YW50cydcbmltcG9ydCB7IGFwcGVuZENoaWxkLCBjcmVhdGVEaXYsIHF1ZXJ5U2VsZWN0b3IgfSBmcm9tICcuLi9wbGF0Zm9ybS9kb20nXG5cbmV4cG9ydCBpbnRlcmZhY2UgRmxhc2hPdmVybGF5U3RhdGUge1xuICBvdmVybGF5OiBIVE1MRWxlbWVudFxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRmxhc2hPdmVybGF5KCk6IEZsYXNoT3ZlcmxheVN0YXRlIHtcbiAgY29uc3Qgb3ZlcmxheSA9IGNyZWF0ZURpdigpXG4gIG92ZXJsYXkuY2xhc3NOYW1lID0gQ3NzQ2xhc3MuVVNFUlNDUklQVF9GTEFTSFxuICBvdmVybGF5LnN0eWxlLmNzc1RleHQgPSBgXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMDtcbiAgICBsZWZ0OiAwO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICBiYWNrZ3JvdW5kOiBibGFjaztcbiAgICB6LWluZGV4OiAxMDAwO1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIGBcblxuICBjb25zdCBjb250YWluZXIgPSBxdWVyeVNlbGVjdG9yKERvbVNlbGVjdG9yLkNPTlRBSU5FUilcbiAgaWYgKGNvbnRhaW5lcikge1xuICAgIGFwcGVuZENoaWxkKGNvbnRhaW5lciwgb3ZlcmxheSlcbiAgfVxuXG4gIHJldHVybiB7IG92ZXJsYXkgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvd0ZsYXNoKHN0YXRlOiBGbGFzaE92ZXJsYXlTdGF0ZSk6IHZvaWQge1xuICBzdGF0ZS5vdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBDc3NEaXNwbGF5LkJMT0NLXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoaWRlRmxhc2goc3RhdGU6IEZsYXNoT3ZlcmxheVN0YXRlKTogdm9pZCB7XG4gIHN0YXRlLm92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IENzc0Rpc3BsYXkuTk9ORVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVzdHJveUZsYXNoT3ZlcmxheShzdGF0ZTogRmxhc2hPdmVybGF5U3RhdGUpOiB2b2lkIHtcbiAgc3RhdGUub3ZlcmxheS5yZW1vdmUoKVxufVxuIiwiLyoqXG4gKiBXcmFwcGVyIG1vZHVsZSBmb3IgbG9jYWxTdG9yYWdlIHRvIGFsbG93IG1vY2tpbmcgd2l0aCBzaW1vbmVcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SXRlbShrZXk6IHN0cmluZyk6IHN0cmluZyB8IG51bGwge1xuICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0SXRlbShrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIHZhbHVlKVxufVxuIiwiaW1wb3J0IHR5cGUgeyBTZXR0aW5ncyB9IGZyb20gJy4vdHlwZXMnXG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0U2V0dGluZ3M6IFNldHRpbmdzID0ge1xuICBzcGVha1JhdGU6IDAuNSxcbiAgcGllY2VzTGlzdEVuYWJsZWQ6IGZhbHNlLFxuICBkaXZpZGVyc0VuYWJsZWQ6IGZhbHNlLFxuICBjdXN0b21Cb2FyZEVuYWJsZWQ6IGZhbHNlLFxuICBvYmZ1c2NhdGlvbnNFbmFibGVkOiBmYWxzZSxcbiAgcGFyYWxsYXg6IDAsXG4gIGhvdmVyTW9kZTogJ29mZicsXG4gIHBpZWNlU3R5bGU6ICdpY29ucycsXG4gIGJsdXI6IDAsXG4gIGJsYWNrU2VnbWVudHM6ICdub25lJyxcbiAgYmxhY2tTZWdtZW50c1RpbWluZzogJ3JvdGF0ZS0xMHMnLFxuICBmbGFzaE1vZGVFbmFibGVkOiBmYWxzZSxcbiAgZmxhc2hEdXJhdGlvbjogMSxcbiAgZmxhc2hJbnRlcnZhbDogMyxcbn1cbiIsImltcG9ydCB7IGVmZmVjdCwgc2lnbmFsIH0gZnJvbSAnQHByZWFjdC9zaWduYWxzLWNvcmUnXG5pbXBvcnQgKiBhcyBzdG9yYWdlIGZyb20gJy4uL3BsYXRmb3JtL3N0b3JhZ2UnXG5pbXBvcnQgeyBkZWZhdWx0U2V0dGluZ3MgfSBmcm9tICcuL2RlZmF1bHRzJ1xuaW1wb3J0IHR5cGUgeyBTZXR0aW5ncyB9IGZyb20gJy4vdHlwZXMnXG5cbmNvbnN0IFNUT1JBR0VfS0VZID0gJ2xpY2hlc3MtYm9hcmQtc3BlYWtlci1zZXR0aW5ncydcblxuZXhwb3J0IGNvbnN0IHNldHRpbmdzID0ge1xuICBzcGVha1JhdGU6IHNpZ25hbChkZWZhdWx0U2V0dGluZ3Muc3BlYWtSYXRlKSxcbiAgcGllY2VzTGlzdEVuYWJsZWQ6IHNpZ25hbChkZWZhdWx0U2V0dGluZ3MucGllY2VzTGlzdEVuYWJsZWQpLFxuICBkaXZpZGVyc0VuYWJsZWQ6IHNpZ25hbChkZWZhdWx0U2V0dGluZ3MuZGl2aWRlcnNFbmFibGVkKSxcbiAgY3VzdG9tQm9hcmRFbmFibGVkOiBzaWduYWwoZGVmYXVsdFNldHRpbmdzLmN1c3RvbUJvYXJkRW5hYmxlZCksXG4gIG9iZnVzY2F0aW9uc0VuYWJsZWQ6IHNpZ25hbChkZWZhdWx0U2V0dGluZ3Mub2JmdXNjYXRpb25zRW5hYmxlZCksXG4gIHBhcmFsbGF4OiBzaWduYWwoZGVmYXVsdFNldHRpbmdzLnBhcmFsbGF4KSxcbiAgaG92ZXJNb2RlOiBzaWduYWwoZGVmYXVsdFNldHRpbmdzLmhvdmVyTW9kZSksXG4gIHBpZWNlU3R5bGU6IHNpZ25hbChkZWZhdWx0U2V0dGluZ3MucGllY2VTdHlsZSksXG4gIGJsdXI6IHNpZ25hbChkZWZhdWx0U2V0dGluZ3MuYmx1ciksXG4gIGJsYWNrU2VnbWVudHM6IHNpZ25hbChkZWZhdWx0U2V0dGluZ3MuYmxhY2tTZWdtZW50cyksXG4gIGJsYWNrU2VnbWVudHNUaW1pbmc6IHNpZ25hbChkZWZhdWx0U2V0dGluZ3MuYmxhY2tTZWdtZW50c1RpbWluZyksXG4gIGZsYXNoTW9kZUVuYWJsZWQ6IHNpZ25hbChkZWZhdWx0U2V0dGluZ3MuZmxhc2hNb2RlRW5hYmxlZCksXG4gIGZsYXNoRHVyYXRpb246IHNpZ25hbChkZWZhdWx0U2V0dGluZ3MuZmxhc2hEdXJhdGlvbiksXG4gIGZsYXNoSW50ZXJ2YWw6IHNpZ25hbChkZWZhdWx0U2V0dGluZ3MuZmxhc2hJbnRlcnZhbCksXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2FkU2V0dGluZ3MoKTogdm9pZCB7XG4gIGNvbnN0IHN0b3JlZCA9IHN0b3JhZ2UuZ2V0SXRlbShTVE9SQUdFX0tFWSlcbiAgaWYgKCFzdG9yZWQpIHJldHVyblxuXG4gIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKHN0b3JlZCkgYXMgUGFydGlhbDxTZXR0aW5ncz5cbiAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoZGF0YSkpIHtcbiAgICBjb25zdCBzZXR0aW5nS2V5ID0ga2V5IGFzIGtleW9mIFNldHRpbmdzXG4gICAgaWYgKHNldHRpbmdzW3NldHRpbmdLZXldKSB7XG4gICAgICAvLyBiaW9tZS1pZ25vcmUgbGludC9zdXNwaWNpb3VzL25vRXhwbGljaXRBbnk6IFNldHRpbmdzIHR5cGUgaXMgZHluYW1pY1xuICAgICAgc2V0dGluZ3Nbc2V0dGluZ0tleV0udmFsdWUgPSBkYXRhW3NldHRpbmdLZXldIGFzIGFueVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2F2ZVNldHRpbmdzKCk6IHZvaWQge1xuICBjb25zdCBkYXRhOiBQYXJ0aWFsPFNldHRpbmdzPiA9IHt9XG4gIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHNldHRpbmdzKSkge1xuICAgIGNvbnN0IHNldHRpbmdLZXkgPSBrZXkgYXMga2V5b2YgdHlwZW9mIHNldHRpbmdzXG4gICAgLy8gYmlvbWUtaWdub3JlIGxpbnQvc3VzcGljaW91cy9ub0V4cGxpY2l0QW55OiBTZXR0aW5ncyB0eXBlIGlzIGR5bmFtaWNcbiAgICBkYXRhW3NldHRpbmdLZXldID0gc2V0dGluZ3Nbc2V0dGluZ0tleV0udmFsdWUgYXMgYW55XG4gIH1cbiAgc3RvcmFnZS5zZXRJdGVtKFNUT1JBR0VfS0VZLCBKU09OLnN0cmluZ2lmeShkYXRhKSlcbn1cblxuLy8gQXV0by1zYXZlIGVmZmVjdCAoc2hvdWxkIGJlIGNhbGxlZCBvbmNlIGR1cmluZyBhcHAgaW5pdGlhbGl6YXRpb24pXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBBdXRvU2F2ZSgpOiB2b2lkIHtcbiAgZWZmZWN0KCgpID0+IHtcbiAgICBmb3IgKGNvbnN0IHMgb2YgT2JqZWN0LnZhbHVlcyhzZXR0aW5ncykpIHtcbiAgICAgIHMudmFsdWVcbiAgICB9XG4gICAgc2F2ZVNldHRpbmdzKClcbiAgfSlcbn1cbiIsImltcG9ydCB7IHR5cGUgRGl2aWRlcnNTdGF0ZSwgaGlkZURpdmlkZXJzLCBzaG93RGl2aWRlcnMgfSBmcm9tICcuLi9hZGFwdGVycy1vdmVybGF5cy9kaXZpZGVycydcbmltcG9ydCB7IHNldHRpbmdzIH0gZnJvbSAnLi4vc2V0dGluZ3Mvc2V0dGluZ3NTdG9yZSdcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZURpdmlkZXJzKHN0YXRlOiBEaXZpZGVyc1N0YXRlKTogdm9pZCB7XG4gIGlmIChzZXR0aW5ncy5kaXZpZGVyc0VuYWJsZWQudmFsdWUpIHtcbiAgICBzaG93RGl2aWRlcnMoc3RhdGUpXG4gIH0gZWxzZSB7XG4gICAgaGlkZURpdmlkZXJzKHN0YXRlKVxuICB9XG59XG4iLCJpbXBvcnQgeyBlZmZlY3QgfSBmcm9tICdAcHJlYWN0L3NpZ25hbHMtY29yZSdcbmltcG9ydCB0eXBlIHsgRGl2aWRlcnNTdGF0ZSB9IGZyb20gJy4uL2FkYXB0ZXJzLW92ZXJsYXlzL2RpdmlkZXJzJ1xuaW1wb3J0IHsgdXBkYXRlRGl2aWRlcnMgfSBmcm9tICcuLi9hcHBsaWNhdGlvbi1oYW5kbGVycy91cGRhdGVEaXZpZGVycydcbmltcG9ydCB7IHNldHRpbmdzIH0gZnJvbSAnLi4vc2V0dGluZ3Mvc2V0dGluZ3NTdG9yZSdcblxuZXhwb3J0IGZ1bmN0aW9uIHNldHVwRGl2aWRlcnNFZmZlY3Qoc3RhdGU6IERpdmlkZXJzU3RhdGUpOiAoKSA9PiB2b2lkIHtcbiAgcmV0dXJuIGVmZmVjdCgoKSA9PiB7XG4gICAgc2V0dGluZ3MuZGl2aWRlcnNFbmFibGVkLnZhbHVlXG4gICAgdXBkYXRlRGl2aWRlcnMoc3RhdGUpXG4gIH0pXG59XG4iLCJleHBvcnQgZnVuY3Rpb24gY3JlYXRlTXV0YXRpb25PYnNlcnZlcihjYWxsYmFjazogTXV0YXRpb25DYWxsYmFjayk6IE11dGF0aW9uT2JzZXJ2ZXIge1xuICByZXR1cm4gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoY2FsbGJhY2spXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvYnNlcnZlKFxuICBvYnNlcnZlcjogTXV0YXRpb25PYnNlcnZlcixcbiAgdGFyZ2V0OiBOb2RlLFxuICBvcHRpb25zOiBNdXRhdGlvbk9ic2VydmVySW5pdFxuKTogdm9pZCB7XG4gIG9ic2VydmVyLm9ic2VydmUodGFyZ2V0LCBvcHRpb25zKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGlzY29ubmVjdChvYnNlcnZlcjogTXV0YXRpb25PYnNlcnZlcik6IHZvaWQge1xuICBvYnNlcnZlci5kaXNjb25uZWN0KClcbn1cbiIsImltcG9ydCB0eXBlIHsgU2lnbmFsIH0gZnJvbSAnQHByZWFjdC9zaWduYWxzLWNvcmUnXG5pbXBvcnQgeyBEb21TZWxlY3RvciB9IGZyb20gJy4uL2NvbnN0YW50cydcbmltcG9ydCB7IHF1ZXJ5U2VsZWN0b3IgfSBmcm9tICcuLi9wbGF0Zm9ybS9kb20nXG5pbXBvcnQgeyBjcmVhdGVNdXRhdGlvbk9ic2VydmVyLCBkaXNjb25uZWN0LCBvYnNlcnZlIH0gZnJvbSAnLi4vcGxhdGZvcm0vbXV0YXRpb25PYnNlcnZlcidcblxuZXhwb3J0IGludGVyZmFjZSBCb2FyZE9ic2VydmVyU3RhdGUge1xuICBvYnNlcnZlcjogTXV0YXRpb25PYnNlcnZlclxuICBib2FyZENoYW5nZWQ6IFNpZ25hbDxudW1iZXI+XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVCb2FyZE9ic2VydmVyKGJvYXJkQ2hhbmdlZDogU2lnbmFsPG51bWJlcj4pOiBCb2FyZE9ic2VydmVyU3RhdGUge1xuICBjb25zdCBvYnNlcnZlciA9IGNyZWF0ZU11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgIGJvYXJkQ2hhbmdlZC52YWx1ZSArPSAxXG4gIH0pXG5cbiAgcmV0dXJuIHsgb2JzZXJ2ZXIsIGJvYXJkQ2hhbmdlZCB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdGFydEJvYXJkT2JzZXJ2ZXIoc3RhdGU6IEJvYXJkT2JzZXJ2ZXJTdGF0ZSk6IHZvaWQge1xuICBjb25zdCBib2FyZCA9IHF1ZXJ5U2VsZWN0b3IoRG9tU2VsZWN0b3IuQk9BUkQpXG4gIGlmICghYm9hcmQpIHJldHVyblxuXG4gIG9ic2VydmUoc3RhdGUub2JzZXJ2ZXIsIGJvYXJkLCB7XG4gICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgIGF0dHJpYnV0ZXM6IHRydWUsXG4gICAgc3VidHJlZTogdHJ1ZSxcbiAgfSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0b3BCb2FyZE9ic2VydmVyKHN0YXRlOiBCb2FyZE9ic2VydmVyU3RhdGUpOiB2b2lkIHtcbiAgZGlzY29ubmVjdChzdGF0ZS5vYnNlcnZlcilcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBnZXRTcGVlY2hTeW50aGVzaXMoKTogU3BlZWNoU3ludGhlc2lzIHtcbiAgcmV0dXJuIHdpbmRvdy5zcGVlY2hTeW50aGVzaXNcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNwZWVjaFN5bnRoZXNpc1V0dGVyYW5jZSgpOiB0eXBlb2YgU3BlZWNoU3ludGhlc2lzVXR0ZXJhbmNlIHtcbiAgcmV0dXJuIFNwZWVjaFN5bnRoZXNpc1V0dGVyYW5jZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc3BlYWsoc3ludGhlc2lzOiBTcGVlY2hTeW50aGVzaXMsIHV0dGVyYW5jZTogU3BlZWNoU3ludGhlc2lzVXR0ZXJhbmNlKTogdm9pZCB7XG4gIHN5bnRoZXNpcy5zcGVhayh1dHRlcmFuY2UpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYW5jZWwoc3ludGhlc2lzOiBTcGVlY2hTeW50aGVzaXMpOiB2b2lkIHtcbiAgc3ludGhlc2lzLmNhbmNlbCgpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVVdHRlcmFuY2UoXG4gIFV0dGVyYW5jZUNsYXNzOiB0eXBlb2YgU3BlZWNoU3ludGhlc2lzVXR0ZXJhbmNlLFxuICB0ZXh0OiBzdHJpbmdcbik6IFNwZWVjaFN5bnRoZXNpc1V0dGVyYW5jZSB7XG4gIHJldHVybiBuZXcgVXR0ZXJhbmNlQ2xhc3ModGV4dClcbn1cbiIsImltcG9ydCAqIGFzIHNwZWVjaEFwaSBmcm9tICcuLi9wbGF0Zm9ybS9zcGVlY2hBcGknXG5cbmxldCBjdXJyZW50UmF0ZSA9IDEuMFxuXG5leHBvcnQgZnVuY3Rpb24gc3BlYWsodGV4dDogc3RyaW5nLCByYXRlOiBudW1iZXIpOiB2b2lkIHtcbiAgY29uc3Qgc3ludGhlc2lzID0gc3BlZWNoQXBpLmdldFNwZWVjaFN5bnRoZXNpcygpXG4gIGNvbnN0IFV0dGVyYW5jZUNsYXNzID0gc3BlZWNoQXBpLmdldFNwZWVjaFN5bnRoZXNpc1V0dGVyYW5jZSgpXG4gIGNvbnN0IHV0dGVyYW5jZSA9IHNwZWVjaEFwaS5jcmVhdGVVdHRlcmFuY2UoVXR0ZXJhbmNlQ2xhc3MsIHRleHQpXG4gIHV0dGVyYW5jZS5yYXRlID0gcmF0ZVxuICBzcGVlY2hBcGkuc3BlYWsoc3ludGhlc2lzLCB1dHRlcmFuY2UpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdG9wU3BlYWtpbmcoKTogdm9pZCB7XG4gIGNvbnN0IHN5bnRoZXNpcyA9IHNwZWVjaEFwaS5nZXRTcGVlY2hTeW50aGVzaXMoKVxuICBzcGVlY2hBcGkuY2FuY2VsKHN5bnRoZXNpcylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldFJhdGUocmF0ZTogbnVtYmVyKTogdm9pZCB7XG4gIGN1cnJlbnRSYXRlID0gcmF0ZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmF0ZSgpOiBudW1iZXIge1xuICByZXR1cm4gY3VycmVudFJhdGVcbn1cbiIsImltcG9ydCB7IFBsYXllckNvbG9yIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzJ1xuXG5leHBvcnQgaW50ZXJmYWNlIFBpeGVsUG9zaXRpb24ge1xuICB4OiBudW1iZXJcbiAgeTogbnVtYmVyXG59XG5cbmNvbnN0IEZJTEVTID0gJ2FiY2RlZmdoJ1xuXG5leHBvcnQgZnVuY3Rpb24gcGl4ZWxzVG9TcXVhcmUoXG4gIHBvc2l0aW9uOiBQaXhlbFBvc2l0aW9uLFxuICBzcXVhcmVTaXplOiBudW1iZXIsXG4gIHBsYXllckNvbG9yOiBQbGF5ZXJDb2xvclxuKTogc3RyaW5nIHtcbiAgLy8gQ29udmVydCBwaXhlbHMgdG8gZ3JpZCBpbmRpY2VzICgwLTcpXG4gIC8vIEFkanVzdCBmb3IgY2VudGVyLWJhc2VkIGNvb3JkaW5hdGVzIGJlZm9yZSByb3VuZGluZ1xuICBsZXQgY29sID0gTWF0aC5yb3VuZCgocG9zaXRpb24ueCAtIHNxdWFyZVNpemUgLyAyKSAvIHNxdWFyZVNpemUpXG4gIGxldCByb3cgPSBNYXRoLnJvdW5kKChwb3NpdGlvbi55IC0gc3F1YXJlU2l6ZSAvIDIpIC8gc3F1YXJlU2l6ZSlcblxuICAvLyBDbGFtcCB0byB2YWxpZCByYW5nZVxuICBjb2wgPSBNYXRoLm1heCgwLCBNYXRoLm1pbig3LCBjb2wpKVxuICByb3cgPSBNYXRoLm1heCgwLCBNYXRoLm1pbig3LCByb3cpKVxuXG4gIC8vIENvbnZlcnQgdG8gcmFuayBiYXNlZCBvbiBwbGF5ZXIgY29sb3JcbiAgLy8gRm9yIHdoaXRlOiB5PTAgaXMgcmFuayA4LCB5IGluY3JlYXNlcyBnb2luZyB0byByYW5rIDFcbiAgLy8gRm9yIGJsYWNrOiB5PTAgaXMgcmFuayAxLCB5IGluY3JlYXNlcyBnb2luZyB0byByYW5rIDhcbiAgbGV0IHJhbms6IG51bWJlclxuICBsZXQgZmlsZTogc3RyaW5nXG5cbiAgaWYgKHBsYXllckNvbG9yID09PSBQbGF5ZXJDb2xvci5XSElURSkge1xuICAgIGZpbGUgPSBGSUxFU1tjb2xdXG4gICAgcmFuayA9IDggLSByb3dcbiAgfSBlbHNlIHtcbiAgICBmaWxlID0gRklMRVNbNyAtIGNvbF1cbiAgICByYW5rID0gcm93ICsgMVxuICB9XG5cbiAgcmV0dXJuIGAke2ZpbGV9JHtyYW5rfWBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNxdWFyZVRvUGl4ZWxzKFxuICBzcXVhcmU6IHN0cmluZyxcbiAgc3F1YXJlU2l6ZTogbnVtYmVyLFxuICBwbGF5ZXJDb2xvcjogUGxheWVyQ29sb3Jcbik6IFBpeGVsUG9zaXRpb24ge1xuICAvLyBWYWxpZGF0ZSBzcXVhcmUgZm9ybWF0XG4gIGlmIChzcXVhcmUubGVuZ3RoIDwgMikge1xuICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBzcXVhcmUgbm90YXRpb246ICR7c3F1YXJlfWApXG4gIH1cblxuICAvLyBQYXJzZSBzcXVhcmUgbm90YXRpb25cbiAgY29uc3QgZmlsZSA9IHNxdWFyZVswXVxuICBjb25zdCByYW5rID0gTnVtYmVyLnBhcnNlSW50KHNxdWFyZVsxXSwgMTApXG5cbiAgLy8gVmFsaWRhdGUgZmlsZSBhbmQgcmFua1xuICBjb25zdCBjb2wgPSBGSUxFUy5pbmRleE9mKGZpbGUpXG4gIGlmIChjb2wgPT09IC0xKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGZpbGU6ICR7ZmlsZX1gKVxuICB9XG4gIGlmIChyYW5rIDwgMSB8fCByYW5rID4gOCB8fCBOdW1iZXIuaXNOYU4ocmFuaykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgcmFuazogJHtyYW5rfWApXG4gIH1cblxuICAvLyBDYWxjdWxhdGUgcGl4ZWwgcG9zaXRpb24gYmFzZWQgb24gcGxheWVyIGNvbG9yXG4gIGxldCBwaXhlbENvbDogbnVtYmVyXG4gIGxldCBwaXhlbFJvdzogbnVtYmVyXG5cbiAgaWYgKHBsYXllckNvbG9yID09PSBQbGF5ZXJDb2xvci5XSElURSkge1xuICAgIC8vIEZvciB3aGl0ZTogZmlsZXMgZ28gbGVmdC10by1yaWdodCAoYS1oKSwgcmFua3MgZ28gYm90dG9tLXRvLXRvcCAoMS04KVxuICAgIC8vIFNvIHJhbmsgMSBpcyBhdCBib3R0b20gKHJvdyA3KSwgcmFuayA4IGlzIGF0IHRvcCAocm93IDApXG4gICAgcGl4ZWxDb2wgPSBjb2xcbiAgICBwaXhlbFJvdyA9IDggLSByYW5rXG4gIH0gZWxzZSB7XG4gICAgLy8gRm9yIGJsYWNrOiBmaWxlcyBnbyByaWdodC10by1sZWZ0IChoLWEpLCByYW5rcyBnbyB0b3AtdG8tYm90dG9tICg4LTEpXG4gICAgLy8gU28gcmFuayA4IGlzIGF0IHRvcCAocm93IDApLCByYW5rIDEgaXMgYXQgYm90dG9tIChyb3cgNylcbiAgICBwaXhlbENvbCA9IDcgLSBjb2xcbiAgICBwaXhlbFJvdyA9IHJhbmsgLSAxXG4gIH1cblxuICAvLyBDb252ZXJ0IHRvIHBpeGVscyAoY2VudGVyIG9mIHNxdWFyZSlcbiAgcmV0dXJuIHtcbiAgICB4OiBwaXhlbENvbCAqIHNxdWFyZVNpemUgKyBzcXVhcmVTaXplIC8gMixcbiAgICB5OiBwaXhlbFJvdyAqIHNxdWFyZVNpemUgKyBzcXVhcmVTaXplIC8gMixcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ3NzQ2xhc3MsIERvbVNlbGVjdG9yLCB0eXBlIFBpZWNlVHlwZSwgUGxheWVyQ29sb3IgfSBmcm9tICcuLi9jb25zdGFudHMnXG5pbXBvcnQgeyBwaXhlbHNUb1NxdWFyZSB9IGZyb20gJy4uL2RvbWFpbi9jaGVzcy9jb29yZGluYXRlcydcbmltcG9ydCB0eXBlIHsgUGllY2VQb3NpdGlvbiB9IGZyb20gJy4uL2RvbWFpbi9jaGVzcy9waWVjZUdyb3VwaW5nJ1xuaW1wb3J0IHsgZ2V0Qm91bmRpbmdDbGllbnRSZWN0LCBxdWVyeVNlbGVjdG9yIH0gZnJvbSAnLi4vcGxhdGZvcm0vZG9tJ1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGxheWVyQ29sb3IoKTogUGxheWVyQ29sb3Ige1xuICBjb25zdCBjb29yZHMgPSBxdWVyeVNlbGVjdG9yKERvbVNlbGVjdG9yLkNPT1JEUylcbiAgcmV0dXJuIGNvb3Jkcz8uY2xhc3NMaXN0LmNvbnRhaW5zKENzc0NsYXNzLkJMQUNLKSA/IFBsYXllckNvbG9yLkJMQUNLIDogUGxheWVyQ29sb3IuV0hJVEVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlYWRQaWVjZVBvc2l0aW9ucygpOiBQaWVjZVBvc2l0aW9uW10ge1xuICBjb25zdCBib2FyZCA9IHF1ZXJ5U2VsZWN0b3IoRG9tU2VsZWN0b3IuQk9BUkRfTk9fQ1VTVE9NKVxuICBpZiAoIWJvYXJkKSByZXR1cm4gW11cblxuICAvLyBQYXJzZSB3aWR0aCBmcm9tIHN0eWxlIGF0dHJpYnV0ZSBzaW5jZSBnZXRCb3VuZGluZ0NsaWVudFJlY3QgbWF5IG5vdCB3b3JrIGluIHRlc3QgZW52aXJvbm1lbnRzXG4gIGNvbnN0IGJvYXJkRWxlbWVudCA9IGJvYXJkIGFzIEhUTUxFbGVtZW50XG4gIGNvbnN0IHdpZHRoTWF0Y2ggPSBib2FyZEVsZW1lbnQuc3R5bGUuY3NzVGV4dC5tYXRjaCgvd2lkdGg6XFxzKihbMC05Ll0rKXB4LylcbiAgY29uc3QgYm9hcmRXaWR0aCA9IHdpZHRoTWF0Y2hcbiAgICA/IE51bWJlci5wYXJzZUZsb2F0KHdpZHRoTWF0Y2hbMV0pXG4gICAgOiBnZXRCb3VuZGluZ0NsaWVudFJlY3QoYm9hcmQpLndpZHRoXG4gIGNvbnN0IHNxdWFyZVNpemUgPSBib2FyZFdpZHRoIC8gOFxuICBjb25zdCBwbGF5ZXJDb2xvciA9IGdldFBsYXllckNvbG9yKClcblxuICBjb25zdCBwaWVjZXMgPSBib2FyZC5xdWVyeVNlbGVjdG9yQWxsKERvbVNlbGVjdG9yLlBJRUNFKVxuICBjb25zdCBwb3NpdGlvbnM6IFBpZWNlUG9zaXRpb25bXSA9IFtdXG5cbiAgZm9yIChjb25zdCBwaWVjZSBvZiBwaWVjZXMpIHtcbiAgICAvLyBFeHRyYWN0IGNvbG9yIGFuZCB0eXBlIGZyb20gY2xhc3NcbiAgICBjb25zdCBjbGFzc2VzID0gcGllY2UuY2xhc3NOYW1lLnNwbGl0KCcgJylcbiAgICBjb25zdCBjb2xvclN0ciA9IGNsYXNzZXNbMF1cbiAgICBjb25zdCB0eXBlU3RyID0gY2xhc3Nlc1sxXVxuXG4gICAgLy8gTWFwIHRvIGVudW1zXG4gICAgY29uc3QgY29sb3IgPSBjb2xvclN0ciA9PT0gJ3doaXRlJyA/IFBsYXllckNvbG9yLldISVRFIDogUGxheWVyQ29sb3IuQkxBQ0tcbiAgICBjb25zdCB0eXBlID0gdHlwZVN0ciBhcyBQaWVjZVR5cGVcblxuICAgIC8vIEV4dHJhY3QgcG9zaXRpb24gZnJvbSB0cmFuc2Zvcm1cbiAgICBjb25zdCB0cmFuc2Zvcm0gPSAocGllY2UgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLnRyYW5zZm9ybVxuICAgIGNvbnN0IG1hdGNoID0gdHJhbnNmb3JtLm1hdGNoKC90cmFuc2xhdGVcXCgoWzAtOS5dKylweCw/XFxzKihbMC05Ll0rKXB4P1xcKS8pXG4gICAgaWYgKCFtYXRjaCkgY29udGludWVcblxuICAgIC8vIFRyYW5zZm9ybSBnaXZlcyBib3R0b20tbGVmdCBjb3JuZXIsIGNvbnZlcnQgdG8gY2VudGVyXG4gICAgY29uc3QgeCA9IE51bWJlci5wYXJzZUZsb2F0KG1hdGNoWzFdKSArIHNxdWFyZVNpemUgLyAyXG4gICAgY29uc3QgeSA9IE51bWJlci5wYXJzZUZsb2F0KG1hdGNoWzJdKSAtIHNxdWFyZVNpemUgLyAyXG5cbiAgICBjb25zdCBzcXVhcmUgPSBwaXhlbHNUb1NxdWFyZSh7IHgsIHkgfSwgc3F1YXJlU2l6ZSwgcGxheWVyQ29sb3IpXG4gICAgcG9zaXRpb25zLnB1c2goeyBzcXVhcmUsIGNvbG9yLCB0eXBlIH0pXG4gIH1cblxuICByZXR1cm4gcG9zaXRpb25zXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3YWl0Rm9yRWxlbWVudChzZWxlY3Rvcjogc3RyaW5nKTogUHJvbWlzZTxFbGVtZW50PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBxdWVyeVNlbGVjdG9yKHNlbGVjdG9yKVxuICAgIGlmIChlbGVtZW50KSB7XG4gICAgICByZXNvbHZlKGVsZW1lbnQpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBxdWVyeVNlbGVjdG9yKHNlbGVjdG9yKVxuICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpXG4gICAgICAgIHJlc29sdmUoZWxlbWVudClcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5ib2R5LCB7XG4gICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgIH0pXG4gIH0pXG59XG4iLCJpbXBvcnQgeyB0eXBlIFBpZWNlVHlwZSwgUGxheWVyQ29sb3IsIFF1YWRyYW50IH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzJ1xuXG5leHBvcnQgaW50ZXJmYWNlIFBpZWNlUG9zaXRpb24ge1xuICBzcXVhcmU6IHN0cmluZ1xuICBjb2xvcjogUGxheWVyQ29sb3JcbiAgdHlwZTogUGllY2VUeXBlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaWx0ZXJRdWFkcmFudChwaWVjZXM6IFBpZWNlUG9zaXRpb25bXSwgcXVhZHJhbnQ6IFF1YWRyYW50KTogUGllY2VQb3NpdGlvbltdIHtcbiAgcmV0dXJuIHBpZWNlcy5maWx0ZXIoKHBpZWNlKSA9PiB7XG4gICAgLy8gVmFsaWRhdGUgc3F1YXJlIGZvcm1hdFxuICAgIGlmICghcGllY2Uuc3F1YXJlIHx8IHBpZWNlLnNxdWFyZS5sZW5ndGggPCAyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgc3F1YXJlIGZvcm1hdDogJHtwaWVjZS5zcXVhcmV9YClcbiAgICB9XG5cbiAgICBjb25zdCBmaWxlID0gcGllY2Uuc3F1YXJlWzBdXG4gICAgY29uc3QgcmFuayA9IE51bWJlci5wYXJzZUludChwaWVjZS5zcXVhcmVbMV0sIDEwKVxuXG4gICAgLy8gVmFsaWRhdGUgZmlsZSBhbmQgcmFua1xuICAgIGlmIChmaWxlIDwgJ2EnIHx8IGZpbGUgPiAnaCcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBmaWxlOiAke2ZpbGV9YClcbiAgICB9XG4gICAgaWYgKE51bWJlci5pc05hTihyYW5rKSB8fCByYW5rIDwgMSB8fCByYW5rID4gOCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHJhbms6ICR7cmFua31gKVxuICAgIH1cblxuICAgIC8vIERldGVybWluZSBmaWxlIHJhbmdlIChraW5nLXNpZGU6IGUtaCwgcXVlZW4tc2lkZTogYS1kKVxuICAgIGNvbnN0IGlzS2luZ1NpZGUgPSBmaWxlID49ICdlJ1xuXG4gICAgLy8gRGV0ZXJtaW5lIHJhbmsgcmFuZ2UgKHdoaXRlOiAxLTQsIGJsYWNrOiA1LTgpXG4gICAgY29uc3QgaXNXaGl0ZVJhbmtzID0gcmFuayA+PSAxICYmIHJhbmsgPD0gNFxuXG4gICAgLy8gTWF0Y2ggcXVhZHJhbnRcbiAgICBpZiAocXVhZHJhbnQgPT09IFF1YWRyYW50LldISVRFX0tJTkcpIHJldHVybiBpc0tpbmdTaWRlICYmIGlzV2hpdGVSYW5rc1xuICAgIGlmIChxdWFkcmFudCA9PT0gUXVhZHJhbnQuV0hJVEVfUVVFRU4pIHJldHVybiAhaXNLaW5nU2lkZSAmJiBpc1doaXRlUmFua3NcbiAgICBpZiAocXVhZHJhbnQgPT09IFF1YWRyYW50LkJMQUNLX0tJTkcpIHJldHVybiBpc0tpbmdTaWRlICYmICFpc1doaXRlUmFua3NcbiAgICBpZiAocXVhZHJhbnQgPT09IFF1YWRyYW50LkJMQUNLX1FVRUVOKSByZXR1cm4gIWlzS2luZ1NpZGUgJiYgIWlzV2hpdGVSYW5rc1xuXG4gICAgcmV0dXJuIGZhbHNlXG4gIH0pXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgR3JvdXBlZFBpZWNlcyB7XG4gIGNvbG9yOiBQbGF5ZXJDb2xvclxuICB0eXBlOiBzdHJpbmdcbiAgc3F1YXJlczogc3RyaW5nW11cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdyb3VwQnlDb2xvckFuZFR5cGUocGllY2VzOiBQaWVjZVBvc2l0aW9uW10pOiBHcm91cGVkUGllY2VzW10ge1xuICBjb25zdCBncm91cHMgPSBuZXcgTWFwPHN0cmluZywgR3JvdXBlZFBpZWNlcz4oKVxuXG4gIGZvciAoY29uc3QgcGllY2Ugb2YgcGllY2VzKSB7XG4gICAgLy8gVmFsaWRhdGUgcmVxdWlyZWQgcHJvcGVydGllc1xuICAgIGlmICghcGllY2Uuc3F1YXJlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BpZWNlIG1pc3Npbmcgc3F1YXJlIHByb3BlcnR5JylcbiAgICB9XG4gICAgaWYgKCFwaWVjZS5jb2xvcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQaWVjZSBtaXNzaW5nIGNvbG9yIHByb3BlcnR5JylcbiAgICB9XG4gICAgaWYgKCFwaWVjZS50eXBlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BpZWNlIG1pc3NpbmcgdHlwZSBwcm9wZXJ0eScpXG4gICAgfVxuXG4gICAgY29uc3Qga2V5ID0gYCR7cGllY2UuY29sb3J9LSR7cGllY2UudHlwZX1gXG5cbiAgICBpZiAoIWdyb3Vwcy5oYXMoa2V5KSkge1xuICAgICAgZ3JvdXBzLnNldChrZXksIHtcbiAgICAgICAgY29sb3I6IHBpZWNlLmNvbG9yLFxuICAgICAgICB0eXBlOiBwaWVjZS50eXBlLFxuICAgICAgICBzcXVhcmVzOiBbXSxcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZ3JvdXBzLmdldChrZXkpPy5zcXVhcmVzLnB1c2gocGllY2Uuc3F1YXJlKVxuICB9XG5cbiAgLy8gU29ydCBncm91cHMgYnkgY29sb3IgKHdoaXRlIGZpcnN0KSB0aGVuIHR5cGVcbiAgcmV0dXJuIEFycmF5LmZyb20oZ3JvdXBzLnZhbHVlcygpKS5zb3J0KChhLCBiKSA9PiB7XG4gICAgaWYgKGEuY29sb3IgIT09IGIuY29sb3IpIHtcbiAgICAgIHJldHVybiBhLmNvbG9yID09PSBQbGF5ZXJDb2xvci5XSElURSA/IC0xIDogMVxuICAgIH1cbiAgICByZXR1cm4gYS50eXBlLmxvY2FsZUNvbXBhcmUoYi50eXBlKVxuICB9KVxufVxuIiwiaW1wb3J0IHsgdHlwZSBQaWVjZVBvc2l0aW9uLCBncm91cEJ5Q29sb3JBbmRUeXBlIH0gZnJvbSAnLi4vY2hlc3MvcGllY2VHcm91cGluZydcblxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlUXVhZHJhbnRUZXh0KHBpZWNlczogUGllY2VQb3NpdGlvbltdKTogc3RyaW5nIHtcbiAgaWYgKHBpZWNlcy5sZW5ndGggPT09IDApIHJldHVybiAnJ1xuXG4gIGNvbnN0IGdyb3VwcyA9IGdyb3VwQnlDb2xvckFuZFR5cGUocGllY2VzKVxuICBjb25zdCBzZW50ZW5jZXM6IHN0cmluZ1tdID0gW11cblxuICBmb3IgKGNvbnN0IGdyb3VwIG9mIGdyb3Vwcykge1xuICAgIGNvbnN0IGNvbG9yTmFtZSA9IGdyb3VwLmNvbG9yXG4gICAgY29uc3QgdHlwZU5hbWUgPSBncm91cC5zcXVhcmVzLmxlbmd0aCA+IDEgPyBgJHtncm91cC50eXBlfXNgIDogZ3JvdXAudHlwZVxuXG4gICAgaWYgKGdyb3VwLnNxdWFyZXMubGVuZ3RoID4gMSkge1xuICAgICAgLy8gTXVsdGlwbGUgcGllY2VzOiBcIndoaXRlIHBhd25zIG9uIGEyLCBiMlwiXG4gICAgICBjb25zdCBzcXVhcmVzID0gZ3JvdXAuc3F1YXJlcy5qb2luKCcsICcpXG4gICAgICBzZW50ZW5jZXMucHVzaChgJHtjb2xvck5hbWV9ICR7dHlwZU5hbWV9IG9uICR7c3F1YXJlc31gKVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTaW5nbGUgcGllY2U6IFwiZTEgd2hpdGUga2luZ1wiXG4gICAgICBzZW50ZW5jZXMucHVzaChgJHtncm91cC5zcXVhcmVzWzBdfSAke2NvbG9yTmFtZX0gJHtncm91cC50eXBlfWApXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGAke3NlbnRlbmNlcy5qb2luKCcuICcpfS5gXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZUFsbFBpZWNlc1RleHQocGllY2VzOiBQaWVjZVBvc2l0aW9uW10pOiBzdHJpbmcge1xuICByZXR1cm4gZ2VuZXJhdGVRdWFkcmFudFRleHQocGllY2VzKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVDb2xvclRleHQocGllY2VzOiBQaWVjZVBvc2l0aW9uW10sIGNvbG9yOiAnd2hpdGUnIHwgJ2JsYWNrJyk6IHN0cmluZyB7XG4gIGNvbnN0IGZpbHRlcmVkID0gcGllY2VzLmZpbHRlcigocCkgPT4gcC5jb2xvciA9PT0gY29sb3IpXG4gIHJldHVybiBnZW5lcmF0ZVF1YWRyYW50VGV4dChmaWx0ZXJlZClcbn1cbiIsImltcG9ydCB7IHNwZWFrLCBzdG9wU3BlYWtpbmcgfSBmcm9tICcuLi9hZGFwdGVycy1zcGVlY2gvc3BlZWNoU3ludGhlc2l6ZXInXG5pbXBvcnQgeyBQbGF5ZXJDb2xvciwgdHlwZSBRdWFkcmFudCwgU3BlZWNoQ29tbWFuZCB9IGZyb20gJy4uL2NvbnN0YW50cydcbmltcG9ydCB7IHJlYWRQaWVjZVBvc2l0aW9ucyB9IGZyb20gJy4uL2RvbS9ib2FyZFJlYWRlcidcbmltcG9ydCB7IGZpbHRlclF1YWRyYW50IH0gZnJvbSAnLi4vZG9tYWluL2NoZXNzL3BpZWNlR3JvdXBpbmcnXG5pbXBvcnQge1xuICBnZW5lcmF0ZUFsbFBpZWNlc1RleHQsXG4gIGdlbmVyYXRlQ29sb3JUZXh0LFxuICBnZW5lcmF0ZVF1YWRyYW50VGV4dCxcbn0gZnJvbSAnLi4vZG9tYWluL3NwZWVjaC9zcGVlY2hUZXh0J1xuaW1wb3J0IHsgc2V0dGluZ3MgfSBmcm9tICcuLi9zZXR0aW5ncy9zZXR0aW5nc1N0b3JlJ1xuXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlU3BlZWNoQ29tbWFuZChjb21tYW5kOiBzdHJpbmcpOiB2b2lkIHtcbiAgaWYgKGNvbW1hbmQgPT09IFNwZWVjaENvbW1hbmQuU1RPUCkge1xuICAgIHN0b3BTcGVha2luZygpXG4gICAgcmV0dXJuXG4gIH1cblxuICBjb25zdCBwaWVjZXMgPSByZWFkUGllY2VQb3NpdGlvbnMoKVxuXG4gIGlmIChjb21tYW5kID09PSBTcGVlY2hDb21tYW5kLkFMTCkge1xuICAgIGNvbnN0IHRleHQgPSBnZW5lcmF0ZUFsbFBpZWNlc1RleHQocGllY2VzKVxuICAgIHNwZWFrKHRleHQsIHNldHRpbmdzLnNwZWFrUmF0ZS52YWx1ZSlcbiAgICByZXR1cm5cbiAgfVxuXG4gIGlmIChjb21tYW5kID09PSBTcGVlY2hDb21tYW5kLldISVRFIHx8IGNvbW1hbmQgPT09IFNwZWVjaENvbW1hbmQuQkxBQ0spIHtcbiAgICBjb25zdCBjb2xvciA9IGNvbW1hbmQgPT09IFNwZWVjaENvbW1hbmQuV0hJVEUgPyBQbGF5ZXJDb2xvci5XSElURSA6IFBsYXllckNvbG9yLkJMQUNLXG4gICAgY29uc3QgdGV4dCA9IGdlbmVyYXRlQ29sb3JUZXh0KHBpZWNlcywgY29sb3IpXG4gICAgc3BlYWsodGV4dCwgc2V0dGluZ3Muc3BlYWtSYXRlLnZhbHVlKVxuICAgIHJldHVyblxuICB9XG5cbiAgLy8gUXVhZHJhbnQgY29tbWFuZHM6IHdrLCB3cSwgYmssIGJxXG4gIGNvbnN0IHF1YWRyYW50ID0gY29tbWFuZCBhcyBRdWFkcmFudFxuICBjb25zdCBmaWx0ZXJlZCA9IGZpbHRlclF1YWRyYW50KHBpZWNlcywgcXVhZHJhbnQpXG4gIGNvbnN0IHRleHQgPSBnZW5lcmF0ZVF1YWRyYW50VGV4dChmaWx0ZXJlZClcbiAgc3BlYWsodGV4dCwgc2V0dGluZ3Muc3BlYWtSYXRlLnZhbHVlKVxufVxuIiwiaW1wb3J0IHsgaGFuZGxlU3BlZWNoQ29tbWFuZCB9IGZyb20gJy4uL2FwcGxpY2F0aW9uLWhhbmRsZXJzL2hhbmRsZVNwZWVjaENvbW1hbmQnXG5pbXBvcnQgeyBEb21TZWxlY3RvciwgS0VZQk9BUkRfQ09NTUFORF9NQVAsIHR5cGUgS2V5Ym9hcmRDb21tYW5kIH0gZnJvbSAnLi4vY29uc3RhbnRzJ1xuaW1wb3J0IHsgcXVlcnlTZWxlY3RvciB9IGZyb20gJy4uL3BsYXRmb3JtL2RvbSdcblxuaW50ZXJmYWNlIElucHV0RWxlbWVudFdpdGhDbGVhbnVwIGV4dGVuZHMgSFRNTElucHV0RWxlbWVudCB7XG4gIF9fa2V5Ym9hcmRDb21tYW5kQ2xlYW51cD86ICgpID0+IHZvaWRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldHVwS2V5Ym9hcmRDb21tYW5kcygpOiB2b2lkIHtcbiAgY29uc3QgaW5wdXQgPSBxdWVyeVNlbGVjdG9yKERvbVNlbGVjdG9yLktFWUJPQVJEX0lOUFVUKSBhcyBJbnB1dEVsZW1lbnRXaXRoQ2xlYW51cCB8IG51bGxcbiAgaWYgKCFpbnB1dCkgcmV0dXJuXG5cbiAgY29uc3QgaGFuZGxlSW5wdXQgPSAoZTogRXZlbnQpID0+IHtcbiAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50XG4gICAgY29uc3QgdmFsdWUgPSB0YXJnZXQudmFsdWVcblxuICAgIC8vIENoZWNrIGZvciBzcGVlY2ggY29tbWFuZHNcbiAgICBjb25zdCBjb21tYW5kID0gS0VZQk9BUkRfQ09NTUFORF9NQVAuZ2V0KHZhbHVlIGFzIEtleWJvYXJkQ29tbWFuZClcbiAgICBpZiAoY29tbWFuZCkge1xuICAgICAgaGFuZGxlU3BlZWNoQ29tbWFuZChjb21tYW5kKVxuICAgICAgdGFyZ2V0LnZhbHVlID0gJydcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIC8vIENoZWNrIGZvciBkcmF3aW5nIGNvbW1hbmRzIChoYW5kbGVkIGVsc2V3aGVyZSlcbiAgICBpZiAodmFsdWUuc3RhcnRzV2l0aCgnLScpKSB7XG4gICAgICAvLyBXaWxsIGJlIGhhbmRsZWQgYnkgZHJhd2luZyBoYW5kbGVyXG4gICAgICByZXR1cm5cbiAgICB9XG4gIH1cblxuICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGhhbmRsZUlucHV0KVxuXG4gIC8vIFN0b3JlIGNsZWFudXAgZnVuY3Rpb24gb24gdGhlIGVsZW1lbnQgZm9yIGxhdGVyIHJlbW92YWxcbiAgaW5wdXQuX19rZXlib2FyZENvbW1hbmRDbGVhbnVwID0gKCkgPT4ge1xuICAgIGlucHV0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2lucHV0JywgaGFuZGxlSW5wdXQpXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRlYXJkb3duS2V5Ym9hcmRDb21tYW5kcygpOiB2b2lkIHtcbiAgY29uc3QgaW5wdXQgPSBxdWVyeVNlbGVjdG9yKERvbVNlbGVjdG9yLktFWUJPQVJEX0lOUFVUKSBhcyBJbnB1dEVsZW1lbnRXaXRoQ2xlYW51cCB8IG51bGxcbiAgaWYgKGlucHV0Py5fX2tleWJvYXJkQ29tbWFuZENsZWFudXApIHtcbiAgICBpbnB1dC5fX2tleWJvYXJkQ29tbWFuZENsZWFudXAoKVxuICAgIGlucHV0Ll9fa2V5Ym9hcmRDb21tYW5kQ2xlYW51cCA9IHVuZGVmaW5lZFxuICB9XG59XG4iLCJ2YXIgbixsLHUsdCxpLHIsbyxlLGYsYyxhLHMsaCxwLHYseSxkPXt9LHc9W10sXz0vYWNpdHxleCg/OnN8Z3xufHB8JCl8cnBofGdyaWR8b3dzfG1uY3xudHd8aW5lW2NoXXx6b298Xm9yZHxpdGVyYS9pLGc9QXJyYXkuaXNBcnJheTtmdW5jdGlvbiBtKG4sbCl7Zm9yKHZhciB1IGluIGwpblt1XT1sW3VdO3JldHVybiBufWZ1bmN0aW9uIGIobil7biYmbi5wYXJlbnROb2RlJiZuLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobil9ZnVuY3Rpb24gayhsLHUsdCl7dmFyIGkscixvLGU9e307Zm9yKG8gaW4gdSlcImtleVwiPT1vP2k9dVtvXTpcInJlZlwiPT1vP3I9dVtvXTplW29dPXVbb107aWYoYXJndW1lbnRzLmxlbmd0aD4yJiYoZS5jaGlsZHJlbj1hcmd1bWVudHMubGVuZ3RoPjM/bi5jYWxsKGFyZ3VtZW50cywyKTp0KSxcImZ1bmN0aW9uXCI9PXR5cGVvZiBsJiZudWxsIT1sLmRlZmF1bHRQcm9wcylmb3IobyBpbiBsLmRlZmF1bHRQcm9wcyl2b2lkIDA9PT1lW29dJiYoZVtvXT1sLmRlZmF1bHRQcm9wc1tvXSk7cmV0dXJuIHgobCxlLGkscixudWxsKX1mdW5jdGlvbiB4KG4sdCxpLHIsbyl7dmFyIGU9e3R5cGU6bixwcm9wczp0LGtleTppLHJlZjpyLF9fazpudWxsLF9fOm51bGwsX19iOjAsX19lOm51bGwsX19jOm51bGwsY29uc3RydWN0b3I6dm9pZCAwLF9fdjpudWxsPT1vPysrdTpvLF9faTotMSxfX3U6MH07cmV0dXJuIG51bGw9PW8mJm51bGwhPWwudm5vZGUmJmwudm5vZGUoZSksZX1mdW5jdGlvbiBNKCl7cmV0dXJue2N1cnJlbnQ6bnVsbH19ZnVuY3Rpb24gUyhuKXtyZXR1cm4gbi5jaGlsZHJlbn1mdW5jdGlvbiBDKG4sbCl7dGhpcy5wcm9wcz1uLHRoaXMuY29udGV4dD1sfWZ1bmN0aW9uICQobixsKXtpZihudWxsPT1sKXJldHVybiBuLl9fPyQobi5fXyxuLl9faSsxKTpudWxsO2Zvcih2YXIgdTtsPG4uX19rLmxlbmd0aDtsKyspaWYobnVsbCE9KHU9bi5fX2tbbF0pJiZudWxsIT11Ll9fZSlyZXR1cm4gdS5fX2U7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2Ygbi50eXBlPyQobik6bnVsbH1mdW5jdGlvbiBJKG4pe2lmKG4uX19QJiZuLl9fZCl7dmFyIHU9bi5fX3YsdD11Ll9fZSxpPVtdLHI9W10sbz1tKHt9LHUpO28uX192PXUuX192KzEsbC52bm9kZSYmbC52bm9kZShvKSxxKG4uX19QLG8sdSxuLl9fbixuLl9fUC5uYW1lc3BhY2VVUkksMzImdS5fX3U/W3RdOm51bGwsaSxudWxsPT10PyQodSk6dCwhISgzMiZ1Ll9fdSksciksby5fX3Y9dS5fX3Ysby5fXy5fX2tbby5fX2ldPW8sRChpLG8sciksdS5fX2U9dS5fXz1udWxsLG8uX19lIT10JiZQKG8pfX1mdW5jdGlvbiBQKG4pe2lmKG51bGwhPShuPW4uX18pJiZudWxsIT1uLl9fYylyZXR1cm4gbi5fX2U9bi5fX2MuYmFzZT1udWxsLG4uX19rLnNvbWUoZnVuY3Rpb24obCl7aWYobnVsbCE9bCYmbnVsbCE9bC5fX2UpcmV0dXJuIG4uX19lPW4uX19jLmJhc2U9bC5fX2V9KSxQKG4pfWZ1bmN0aW9uIEEobil7KCFuLl9fZCYmKG4uX19kPSEwKSYmaS5wdXNoKG4pJiYhSC5fX3IrK3x8ciE9bC5kZWJvdW5jZVJlbmRlcmluZykmJigocj1sLmRlYm91bmNlUmVuZGVyaW5nKXx8bykoSCl9ZnVuY3Rpb24gSCgpe3RyeXtmb3IodmFyIG4sbD0xO2kubGVuZ3RoOylpLmxlbmd0aD5sJiZpLnNvcnQoZSksbj1pLnNoaWZ0KCksbD1pLmxlbmd0aCxJKG4pfWZpbmFsbHl7aS5sZW5ndGg9SC5fX3I9MH19ZnVuY3Rpb24gTChuLGwsdSx0LGkscixvLGUsZixjLGEpe3ZhciBzLGgscCx2LHksXyxnLG09dCYmdC5fX2t8fHcsYj1sLmxlbmd0aDtmb3IoZj1UKHUsbCxtLGYsYikscz0wO3M8YjtzKyspbnVsbCE9KHA9dS5fX2tbc10pJiYoaD0tMSE9cC5fX2kmJm1bcC5fX2ldfHxkLHAuX19pPXMsXz1xKG4scCxoLGkscixvLGUsZixjLGEpLHY9cC5fX2UscC5yZWYmJmgucmVmIT1wLnJlZiYmKGgucmVmJiZKKGgucmVmLG51bGwscCksYS5wdXNoKHAucmVmLHAuX19jfHx2LHApKSxudWxsPT15JiZudWxsIT12JiYoeT12KSwoZz0hISg0JnAuX191KSl8fGguX19rPT09cC5fX2s/KGY9aihwLGYsbixnKSxnJiZoLl9fZSYmKGguX19lPW51bGwpKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBwLnR5cGUmJnZvaWQgMCE9PV8/Zj1fOnYmJihmPXYubmV4dFNpYmxpbmcpLHAuX191Jj0tNyk7cmV0dXJuIHUuX19lPXksZn1mdW5jdGlvbiBUKG4sbCx1LHQsaSl7dmFyIHIsbyxlLGYsYyxhPXUubGVuZ3RoLHM9YSxoPTA7Zm9yKG4uX19rPW5ldyBBcnJheShpKSxyPTA7cjxpO3IrKyludWxsIT0obz1sW3JdKSYmXCJib29sZWFuXCIhPXR5cGVvZiBvJiZcImZ1bmN0aW9uXCIhPXR5cGVvZiBvPyhcInN0cmluZ1wiPT10eXBlb2Ygb3x8XCJudW1iZXJcIj09dHlwZW9mIG98fFwiYmlnaW50XCI9PXR5cGVvZiBvfHxvLmNvbnN0cnVjdG9yPT1TdHJpbmc/bz1uLl9fa1tyXT14KG51bGwsbyxudWxsLG51bGwsbnVsbCk6ZyhvKT9vPW4uX19rW3JdPXgoUyx7Y2hpbGRyZW46b30sbnVsbCxudWxsLG51bGwpOnZvaWQgMD09PW8uY29uc3RydWN0b3ImJm8uX19iPjA/bz1uLl9fa1tyXT14KG8udHlwZSxvLnByb3BzLG8ua2V5LG8ucmVmP28ucmVmOm51bGwsby5fX3YpOm4uX19rW3JdPW8sZj1yK2gsby5fXz1uLG8uX19iPW4uX19iKzEsZT1udWxsLC0xIT0oYz1vLl9faT1PKG8sdSxmLHMpKSYmKHMtLSwoZT11W2NdKSYmKGUuX191fD0yKSksbnVsbD09ZXx8bnVsbD09ZS5fX3Y/KC0xPT1jJiYoaT5hP2gtLTppPGEmJmgrKyksXCJmdW5jdGlvblwiIT10eXBlb2Ygby50eXBlJiYoby5fX3V8PTQpKTpjIT1mJiYoYz09Zi0xP2gtLTpjPT1mKzE/aCsrOihjPmY/aC0tOmgrKyxvLl9fdXw9NCkpKTpuLl9fa1tyXT1udWxsO2lmKHMpZm9yKHI9MDtyPGE7cisrKW51bGwhPShlPXVbcl0pJiYwPT0oMiZlLl9fdSkmJihlLl9fZT09dCYmKHQ9JChlKSksSyhlLGUpKTtyZXR1cm4gdH1mdW5jdGlvbiBqKG4sbCx1LHQpe3ZhciBpLHI7aWYoXCJmdW5jdGlvblwiPT10eXBlb2Ygbi50eXBlKXtmb3IoaT1uLl9fayxyPTA7aSYmcjxpLmxlbmd0aDtyKyspaVtyXSYmKGlbcl0uX189bixsPWooaVtyXSxsLHUsdCkpO3JldHVybiBsfW4uX19lIT1sJiYodCYmKGwmJm4udHlwZSYmIWwucGFyZW50Tm9kZSYmKGw9JChuKSksdS5pbnNlcnRCZWZvcmUobi5fX2UsbHx8bnVsbCkpLGw9bi5fX2UpO2Rve2w9bCYmbC5uZXh0U2libGluZ313aGlsZShudWxsIT1sJiY4PT1sLm5vZGVUeXBlKTtyZXR1cm4gbH1mdW5jdGlvbiBGKG4sbCl7cmV0dXJuIGw9bHx8W10sbnVsbD09bnx8XCJib29sZWFuXCI9PXR5cGVvZiBufHwoZyhuKT9uLnNvbWUoZnVuY3Rpb24obil7RihuLGwpfSk6bC5wdXNoKG4pKSxsfWZ1bmN0aW9uIE8obixsLHUsdCl7dmFyIGkscixvLGU9bi5rZXksZj1uLnR5cGUsYz1sW3VdLGE9bnVsbCE9YyYmMD09KDImYy5fX3UpO2lmKG51bGw9PT1jJiZudWxsPT1lfHxhJiZlPT1jLmtleSYmZj09Yy50eXBlKXJldHVybiB1O2lmKHQ+KGE/MTowKSlmb3IoaT11LTEscj11KzE7aT49MHx8cjxsLmxlbmd0aDspaWYobnVsbCE9KGM9bFtvPWk+PTA/aS0tOnIrK10pJiYwPT0oMiZjLl9fdSkmJmU9PWMua2V5JiZmPT1jLnR5cGUpcmV0dXJuIG87cmV0dXJuLTF9ZnVuY3Rpb24geihuLGwsdSl7XCItXCI9PWxbMF0/bi5zZXRQcm9wZXJ0eShsLG51bGw9PXU/XCJcIjp1KTpuW2xdPW51bGw9PXU/XCJcIjpcIm51bWJlclwiIT10eXBlb2YgdXx8Xy50ZXN0KGwpP3U6dStcInB4XCJ9ZnVuY3Rpb24gTihuLGwsdSx0LGkpe3ZhciByLG87bjppZihcInN0eWxlXCI9PWwpaWYoXCJzdHJpbmdcIj09dHlwZW9mIHUpbi5zdHlsZS5jc3NUZXh0PXU7ZWxzZXtpZihcInN0cmluZ1wiPT10eXBlb2YgdCYmKG4uc3R5bGUuY3NzVGV4dD10PVwiXCIpLHQpZm9yKGwgaW4gdCl1JiZsIGluIHV8fHoobi5zdHlsZSxsLFwiXCIpO2lmKHUpZm9yKGwgaW4gdSl0JiZ1W2xdPT10W2xdfHx6KG4uc3R5bGUsbCx1W2xdKX1lbHNlIGlmKFwib1wiPT1sWzBdJiZcIm5cIj09bFsxXSlyPWwhPShsPWwucmVwbGFjZShzLFwiJDFcIikpLG89bC50b0xvd2VyQ2FzZSgpLGw9byBpbiBufHxcIm9uRm9jdXNPdXRcIj09bHx8XCJvbkZvY3VzSW5cIj09bD9vLnNsaWNlKDIpOmwuc2xpY2UoMiksbi5sfHwobi5sPXt9KSxuLmxbbCtyXT11LHU/dD91W2FdPXRbYV06KHVbYV09aCxuLmFkZEV2ZW50TGlzdGVuZXIobCxyP3Y6cCxyKSk6bi5yZW1vdmVFdmVudExpc3RlbmVyKGwscj92OnAscik7ZWxzZXtpZihcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI9PWkpbD1sLnJlcGxhY2UoL3hsaW5rKEh8OmgpLyxcImhcIikucmVwbGFjZSgvc05hbWUkLyxcInNcIik7ZWxzZSBpZihcIndpZHRoXCIhPWwmJlwiaGVpZ2h0XCIhPWwmJlwiaHJlZlwiIT1sJiZcImxpc3RcIiE9bCYmXCJmb3JtXCIhPWwmJlwidGFiSW5kZXhcIiE9bCYmXCJkb3dubG9hZFwiIT1sJiZcInJvd1NwYW5cIiE9bCYmXCJjb2xTcGFuXCIhPWwmJlwicm9sZVwiIT1sJiZcInBvcG92ZXJcIiE9bCYmbCBpbiBuKXRyeXtuW2xdPW51bGw9PXU/XCJcIjp1O2JyZWFrIG59Y2F0Y2gobil7fVwiZnVuY3Rpb25cIj09dHlwZW9mIHV8fChudWxsPT11fHwhMT09PXUmJlwiLVwiIT1sWzRdP24ucmVtb3ZlQXR0cmlidXRlKGwpOm4uc2V0QXR0cmlidXRlKGwsXCJwb3BvdmVyXCI9PWwmJjE9PXU/XCJcIjp1KSl9fWZ1bmN0aW9uIFYobil7cmV0dXJuIGZ1bmN0aW9uKHUpe2lmKHRoaXMubCl7dmFyIHQ9dGhpcy5sW3UudHlwZStuXTtpZihudWxsPT11W2NdKXVbY109aCsrO2Vsc2UgaWYodVtjXTx0W2FdKXJldHVybjtyZXR1cm4gdChsLmV2ZW50P2wuZXZlbnQodSk6dSl9fX1mdW5jdGlvbiBxKG4sdSx0LGkscixvLGUsZixjLGEpe3ZhciBzLGgscCx2LHksZCxfLGsseCxNLCQsSSxQLEEsSCxUPXUudHlwZTtpZih2b2lkIDAhPT11LmNvbnN0cnVjdG9yKXJldHVybiBudWxsOzEyOCZ0Ll9fdSYmKGM9ISEoMzImdC5fX3UpLG89W2Y9dS5fX2U9dC5fX2VdKSwocz1sLl9fYikmJnModSk7bjppZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBUKXRyeXtpZihrPXUucHJvcHMseD1ULnByb3RvdHlwZSYmVC5wcm90b3R5cGUucmVuZGVyLE09KHM9VC5jb250ZXh0VHlwZSkmJmlbcy5fX2NdLCQ9cz9NP00ucHJvcHMudmFsdWU6cy5fXzppLHQuX19jP189KGg9dS5fX2M9dC5fX2MpLl9fPWguX19FOih4P3UuX19jPWg9bmV3IFQoaywkKToodS5fX2M9aD1uZXcgQyhrLCQpLGguY29uc3RydWN0b3I9VCxoLnJlbmRlcj1RKSxNJiZNLnN1YihoKSxoLnN0YXRlfHwoaC5zdGF0ZT17fSksaC5fX249aSxwPWguX19kPSEwLGguX19oPVtdLGguX3NiPVtdKSx4JiZudWxsPT1oLl9fcyYmKGguX19zPWguc3RhdGUpLHgmJm51bGwhPVQuZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzJiYoaC5fX3M9PWguc3RhdGUmJihoLl9fcz1tKHt9LGguX19zKSksbShoLl9fcyxULmdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyhrLGguX19zKSkpLHY9aC5wcm9wcyx5PWguc3RhdGUsaC5fX3Y9dSxwKXgmJm51bGw9PVQuZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzJiZudWxsIT1oLmNvbXBvbmVudFdpbGxNb3VudCYmaC5jb21wb25lbnRXaWxsTW91bnQoKSx4JiZudWxsIT1oLmNvbXBvbmVudERpZE1vdW50JiZoLl9faC5wdXNoKGguY29tcG9uZW50RGlkTW91bnQpO2Vsc2V7aWYoeCYmbnVsbD09VC5nZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMmJmshPT12JiZudWxsIT1oLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMmJmguY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhrLCQpLHUuX192PT10Ll9fdnx8IWguX19lJiZudWxsIT1oLnNob3VsZENvbXBvbmVudFVwZGF0ZSYmITE9PT1oLnNob3VsZENvbXBvbmVudFVwZGF0ZShrLGguX19zLCQpKXt1Ll9fdiE9dC5fX3YmJihoLnByb3BzPWssaC5zdGF0ZT1oLl9fcyxoLl9fZD0hMSksdS5fX2U9dC5fX2UsdS5fX2s9dC5fX2ssdS5fX2suc29tZShmdW5jdGlvbihuKXtuJiYobi5fXz11KX0pLHcucHVzaC5hcHBseShoLl9faCxoLl9zYiksaC5fc2I9W10saC5fX2gubGVuZ3RoJiZlLnB1c2goaCk7YnJlYWsgbn1udWxsIT1oLmNvbXBvbmVudFdpbGxVcGRhdGUmJmguY29tcG9uZW50V2lsbFVwZGF0ZShrLGguX19zLCQpLHgmJm51bGwhPWguY29tcG9uZW50RGlkVXBkYXRlJiZoLl9faC5wdXNoKGZ1bmN0aW9uKCl7aC5jb21wb25lbnREaWRVcGRhdGUodix5LGQpfSl9aWYoaC5jb250ZXh0PSQsaC5wcm9wcz1rLGguX19QPW4saC5fX2U9ITEsST1sLl9fcixQPTAseCloLnN0YXRlPWguX19zLGguX19kPSExLEkmJkkodSkscz1oLnJlbmRlcihoLnByb3BzLGguc3RhdGUsaC5jb250ZXh0KSx3LnB1c2guYXBwbHkoaC5fX2gsaC5fc2IpLGguX3NiPVtdO2Vsc2UgZG97aC5fX2Q9ITEsSSYmSSh1KSxzPWgucmVuZGVyKGgucHJvcHMsaC5zdGF0ZSxoLmNvbnRleHQpLGguc3RhdGU9aC5fX3N9d2hpbGUoaC5fX2QmJisrUDwyNSk7aC5zdGF0ZT1oLl9fcyxudWxsIT1oLmdldENoaWxkQ29udGV4dCYmKGk9bShtKHt9LGkpLGguZ2V0Q2hpbGRDb250ZXh0KCkpKSx4JiYhcCYmbnVsbCE9aC5nZXRTbmFwc2hvdEJlZm9yZVVwZGF0ZSYmKGQ9aC5nZXRTbmFwc2hvdEJlZm9yZVVwZGF0ZSh2LHkpKSxBPW51bGwhPXMmJnMudHlwZT09PVMmJm51bGw9PXMua2V5P0Uocy5wcm9wcy5jaGlsZHJlbik6cyxmPUwobixnKEEpP0E6W0FdLHUsdCxpLHIsbyxlLGYsYyxhKSxoLmJhc2U9dS5fX2UsdS5fX3UmPS0xNjEsaC5fX2gubGVuZ3RoJiZlLnB1c2goaCksXyYmKGguX19FPWguX189bnVsbCl9Y2F0Y2gobil7aWYodS5fX3Y9bnVsbCxjfHxudWxsIT1vKWlmKG4udGhlbil7Zm9yKHUuX191fD1jPzE2MDoxMjg7ZiYmOD09Zi5ub2RlVHlwZSYmZi5uZXh0U2libGluZzspZj1mLm5leHRTaWJsaW5nO29bby5pbmRleE9mKGYpXT1udWxsLHUuX19lPWZ9ZWxzZXtmb3IoSD1vLmxlbmd0aDtILS07KWIob1tIXSk7Qih1KX1lbHNlIHUuX19lPXQuX19lLHUuX19rPXQuX19rLG4udGhlbnx8Qih1KTtsLl9fZShuLHUsdCl9ZWxzZSBudWxsPT1vJiZ1Ll9fdj09dC5fX3Y/KHUuX19rPXQuX19rLHUuX19lPXQuX19lKTpmPXUuX19lPUcodC5fX2UsdSx0LGkscixvLGUsYyxhKTtyZXR1cm4ocz1sLmRpZmZlZCkmJnModSksMTI4JnUuX191P3ZvaWQgMDpmfWZ1bmN0aW9uIEIobil7biYmKG4uX19jJiYobi5fX2MuX19lPSEwKSxuLl9fayYmbi5fX2suc29tZShCKSl9ZnVuY3Rpb24gRChuLHUsdCl7Zm9yKHZhciBpPTA7aTx0Lmxlbmd0aDtpKyspSih0W2ldLHRbKytpXSx0WysraV0pO2wuX19jJiZsLl9fYyh1LG4pLG4uc29tZShmdW5jdGlvbih1KXt0cnl7bj11Ll9faCx1Ll9faD1bXSxuLnNvbWUoZnVuY3Rpb24obil7bi5jYWxsKHUpfSl9Y2F0Y2gobil7bC5fX2Uobix1Ll9fdil9fSl9ZnVuY3Rpb24gRShuKXtyZXR1cm5cIm9iamVjdFwiIT10eXBlb2Ygbnx8bnVsbD09bnx8bi5fX2I+MD9uOmcobik/bi5tYXAoRSk6dm9pZCAwIT09bi5jb25zdHJ1Y3Rvcj9udWxsOm0oe30sbil9ZnVuY3Rpb24gRyh1LHQsaSxyLG8sZSxmLGMsYSl7dmFyIHMsaCxwLHYseSx3LF8sbT1pLnByb3BzfHxkLGs9dC5wcm9wcyx4PXQudHlwZTtpZihcInN2Z1wiPT14P289XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiOlwibWF0aFwiPT14P289XCJodHRwOi8vd3d3LnczLm9yZy8xOTk4L01hdGgvTWF0aE1MXCI6b3x8KG89XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sXCIpLG51bGwhPWUpZm9yKHM9MDtzPGUubGVuZ3RoO3MrKylpZigoeT1lW3NdKSYmXCJzZXRBdHRyaWJ1dGVcImluIHk9PSEheCYmKHg/eS5sb2NhbE5hbWU9PXg6Mz09eS5ub2RlVHlwZSkpe3U9eSxlW3NdPW51bGw7YnJlYWt9aWYobnVsbD09dSl7aWYobnVsbD09eClyZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoayk7dT1kb2N1bWVudC5jcmVhdGVFbGVtZW50TlMobyx4LGsuaXMmJmspLGMmJihsLl9fbSYmbC5fX20odCxlKSxjPSExKSxlPW51bGx9aWYobnVsbD09eCltPT09a3x8YyYmdS5kYXRhPT1rfHwodS5kYXRhPWspO2Vsc2V7aWYoZT1cInRleHRhcmVhXCI9PXgmJm51bGwhPWsuZGVmYXVsdFZhbHVlP251bGw6ZSYmbi5jYWxsKHUuY2hpbGROb2RlcyksIWMmJm51bGwhPWUpZm9yKG09e30scz0wO3M8dS5hdHRyaWJ1dGVzLmxlbmd0aDtzKyspbVsoeT11LmF0dHJpYnV0ZXNbc10pLm5hbWVdPXkudmFsdWU7Zm9yKHMgaW4gbSl5PW1bc10sXCJkYW5nZXJvdXNseVNldElubmVySFRNTFwiPT1zP3A9eTpcImNoaWxkcmVuXCI9PXN8fHMgaW4ga3x8XCJ2YWx1ZVwiPT1zJiZcImRlZmF1bHRWYWx1ZVwiaW4ga3x8XCJjaGVja2VkXCI9PXMmJlwiZGVmYXVsdENoZWNrZWRcImluIGt8fE4odSxzLG51bGwseSxvKTtmb3IocyBpbiBrKXk9a1tzXSxcImNoaWxkcmVuXCI9PXM/dj15OlwiZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUxcIj09cz9oPXk6XCJ2YWx1ZVwiPT1zP3c9eTpcImNoZWNrZWRcIj09cz9fPXk6YyYmXCJmdW5jdGlvblwiIT10eXBlb2YgeXx8bVtzXT09PXl8fE4odSxzLHksbVtzXSxvKTtpZihoKWN8fHAmJihoLl9faHRtbD09cC5fX2h0bWx8fGguX19odG1sPT11LmlubmVySFRNTCl8fCh1LmlubmVySFRNTD1oLl9faHRtbCksdC5fX2s9W107ZWxzZSBpZihwJiYodS5pbm5lckhUTUw9XCJcIiksTChcInRlbXBsYXRlXCI9PXQudHlwZT91LmNvbnRlbnQ6dSxnKHYpP3Y6W3ZdLHQsaSxyLFwiZm9yZWlnbk9iamVjdFwiPT14P1wiaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbFwiOm8sZSxmLGU/ZVswXTppLl9fayYmJChpLDApLGMsYSksbnVsbCE9ZSlmb3Iocz1lLmxlbmd0aDtzLS07KWIoZVtzXSk7YyYmXCJ0ZXh0YXJlYVwiIT14fHwocz1cInZhbHVlXCIsXCJwcm9ncmVzc1wiPT14JiZudWxsPT13P3UucmVtb3ZlQXR0cmlidXRlKFwidmFsdWVcIik6bnVsbCE9dyYmKHchPT11W3NdfHxcInByb2dyZXNzXCI9PXgmJiF3fHxcIm9wdGlvblwiPT14JiZ3IT1tW3NdKSYmTih1LHMsdyxtW3NdLG8pLHM9XCJjaGVja2VkXCIsbnVsbCE9XyYmXyE9dVtzXSYmTih1LHMsXyxtW3NdLG8pKX1yZXR1cm4gdX1mdW5jdGlvbiBKKG4sdSx0KXt0cnl7aWYoXCJmdW5jdGlvblwiPT10eXBlb2Ygbil7dmFyIGk9XCJmdW5jdGlvblwiPT10eXBlb2Ygbi5fX3U7aSYmbi5fX3UoKSxpJiZudWxsPT11fHwobi5fX3U9bih1KSl9ZWxzZSBuLmN1cnJlbnQ9dX1jYXRjaChuKXtsLl9fZShuLHQpfX1mdW5jdGlvbiBLKG4sdSx0KXt2YXIgaSxyO2lmKGwudW5tb3VudCYmbC51bm1vdW50KG4pLChpPW4ucmVmKSYmKGkuY3VycmVudCYmaS5jdXJyZW50IT1uLl9fZXx8SihpLG51bGwsdSkpLG51bGwhPShpPW4uX19jKSl7aWYoaS5jb21wb25lbnRXaWxsVW5tb3VudCl0cnl7aS5jb21wb25lbnRXaWxsVW5tb3VudCgpfWNhdGNoKG4pe2wuX19lKG4sdSl9aS5iYXNlPWkuX19QPW51bGx9aWYoaT1uLl9faylmb3Iocj0wO3I8aS5sZW5ndGg7cisrKWlbcl0mJksoaVtyXSx1LHR8fFwiZnVuY3Rpb25cIiE9dHlwZW9mIG4udHlwZSk7dHx8YihuLl9fZSksbi5fX2M9bi5fXz1uLl9fZT12b2lkIDB9ZnVuY3Rpb24gUShuLGwsdSl7cmV0dXJuIHRoaXMuY29uc3RydWN0b3Iobix1KX1mdW5jdGlvbiBSKHUsdCxpKXt2YXIgcixvLGUsZjt0PT1kb2N1bWVudCYmKHQ9ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSxsLl9fJiZsLl9fKHUsdCksbz0ocj1cImZ1bmN0aW9uXCI9PXR5cGVvZiBpKT9udWxsOmkmJmkuX19rfHx0Ll9fayxlPVtdLGY9W10scSh0LHU9KCFyJiZpfHx0KS5fX2s9ayhTLG51bGwsW3VdKSxvfHxkLGQsdC5uYW1lc3BhY2VVUkksIXImJmk/W2ldOm8/bnVsbDp0LmZpcnN0Q2hpbGQ/bi5jYWxsKHQuY2hpbGROb2Rlcyk6bnVsbCxlLCFyJiZpP2k6bz9vLl9fZTp0LmZpcnN0Q2hpbGQscixmKSxEKGUsdSxmKX1mdW5jdGlvbiBVKG4sbCl7UihuLGwsVSl9ZnVuY3Rpb24gVyhsLHUsdCl7dmFyIGkscixvLGUsZj1tKHt9LGwucHJvcHMpO2ZvcihvIGluIGwudHlwZSYmbC50eXBlLmRlZmF1bHRQcm9wcyYmKGU9bC50eXBlLmRlZmF1bHRQcm9wcyksdSlcImtleVwiPT1vP2k9dVtvXTpcInJlZlwiPT1vP3I9dVtvXTpmW29dPXZvaWQgMD09PXVbb10mJm51bGwhPWU/ZVtvXTp1W29dO3JldHVybiBhcmd1bWVudHMubGVuZ3RoPjImJihmLmNoaWxkcmVuPWFyZ3VtZW50cy5sZW5ndGg+Mz9uLmNhbGwoYXJndW1lbnRzLDIpOnQpLHgobC50eXBlLGYsaXx8bC5rZXkscnx8bC5yZWYsbnVsbCl9ZnVuY3Rpb24gWChuKXtmdW5jdGlvbiBsKG4pe3ZhciB1LHQ7cmV0dXJuIHRoaXMuZ2V0Q2hpbGRDb250ZXh0fHwodT1uZXcgU2V0LCh0PXt9KVtsLl9fY109dGhpcyx0aGlzLmdldENoaWxkQ29udGV4dD1mdW5jdGlvbigpe3JldHVybiB0fSx0aGlzLmNvbXBvbmVudFdpbGxVbm1vdW50PWZ1bmN0aW9uKCl7dT1udWxsfSx0aGlzLnNob3VsZENvbXBvbmVudFVwZGF0ZT1mdW5jdGlvbihuKXt0aGlzLnByb3BzLnZhbHVlIT1uLnZhbHVlJiZ1LmZvckVhY2goZnVuY3Rpb24obil7bi5fX2U9ITAsQShuKX0pfSx0aGlzLnN1Yj1mdW5jdGlvbihuKXt1LmFkZChuKTt2YXIgbD1uLmNvbXBvbmVudFdpbGxVbm1vdW50O24uY29tcG9uZW50V2lsbFVubW91bnQ9ZnVuY3Rpb24oKXt1JiZ1LmRlbGV0ZShuKSxsJiZsLmNhbGwobil9fSksbi5jaGlsZHJlbn1yZXR1cm4gbC5fX2M9XCJfX2NDXCIreSsrLGwuX189bixsLlByb3ZpZGVyPWwuX19sPShsLkNvbnN1bWVyPWZ1bmN0aW9uKG4sbCl7cmV0dXJuIG4uY2hpbGRyZW4obCl9KS5jb250ZXh0VHlwZT1sLGx9bj13LnNsaWNlLGw9e19fZTpmdW5jdGlvbihuLGwsdSx0KXtmb3IodmFyIGkscixvO2w9bC5fXzspaWYoKGk9bC5fX2MpJiYhaS5fXyl0cnl7aWYoKHI9aS5jb25zdHJ1Y3RvcikmJm51bGwhPXIuZ2V0RGVyaXZlZFN0YXRlRnJvbUVycm9yJiYoaS5zZXRTdGF0ZShyLmdldERlcml2ZWRTdGF0ZUZyb21FcnJvcihuKSksbz1pLl9fZCksbnVsbCE9aS5jb21wb25lbnREaWRDYXRjaCYmKGkuY29tcG9uZW50RGlkQ2F0Y2gobix0fHx7fSksbz1pLl9fZCksbylyZXR1cm4gaS5fX0U9aX1jYXRjaChsKXtuPWx9dGhyb3cgbn19LHU9MCx0PWZ1bmN0aW9uKG4pe3JldHVybiBudWxsIT1uJiZ2b2lkIDA9PT1uLmNvbnN0cnVjdG9yfSxDLnByb3RvdHlwZS5zZXRTdGF0ZT1mdW5jdGlvbihuLGwpe3ZhciB1O3U9bnVsbCE9dGhpcy5fX3MmJnRoaXMuX19zIT10aGlzLnN0YXRlP3RoaXMuX19zOnRoaXMuX19zPW0oe30sdGhpcy5zdGF0ZSksXCJmdW5jdGlvblwiPT10eXBlb2YgbiYmKG49bihtKHt9LHUpLHRoaXMucHJvcHMpKSxuJiZtKHUsbiksbnVsbCE9biYmdGhpcy5fX3YmJihsJiZ0aGlzLl9zYi5wdXNoKGwpLEEodGhpcykpfSxDLnByb3RvdHlwZS5mb3JjZVVwZGF0ZT1mdW5jdGlvbihuKXt0aGlzLl9fdiYmKHRoaXMuX19lPSEwLG4mJnRoaXMuX19oLnB1c2gobiksQSh0aGlzKSl9LEMucHJvdG90eXBlLnJlbmRlcj1TLGk9W10sbz1cImZ1bmN0aW9uXCI9PXR5cGVvZiBQcm9taXNlP1Byb21pc2UucHJvdG90eXBlLnRoZW4uYmluZChQcm9taXNlLnJlc29sdmUoKSk6c2V0VGltZW91dCxlPWZ1bmN0aW9uKG4sbCl7cmV0dXJuIG4uX192Ll9fYi1sLl9fdi5fX2J9LEguX19yPTAsZj1NYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDgpLGM9XCJfX2RcIitmLGE9XCJfX2FcIitmLHM9LyhQb2ludGVyQ2FwdHVyZSkkfENhcHR1cmUkL2ksaD0wLHA9VighMSksdj1WKCEwKSx5PTA7ZXhwb3J0e0MgYXMgQ29tcG9uZW50LFMgYXMgRnJhZ21lbnQsVyBhcyBjbG9uZUVsZW1lbnQsWCBhcyBjcmVhdGVDb250ZXh0LGsgYXMgY3JlYXRlRWxlbWVudCxNIGFzIGNyZWF0ZVJlZixrIGFzIGgsVSBhcyBoeWRyYXRlLHQgYXMgaXNWYWxpZEVsZW1lbnQsbCBhcyBvcHRpb25zLFIgYXMgcmVuZGVyLEYgYXMgdG9DaGlsZEFycmF5fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXByZWFjdC5tb2R1bGUuanMubWFwXG4iLCJpbXBvcnR7b3B0aW9ucyBhcyByLEZyYWdtZW50IGFzIGV9ZnJvbVwicHJlYWN0XCI7ZXhwb3J0e0ZyYWdtZW50fWZyb21cInByZWFjdFwiO3ZhciB0PS9bXCImPF0vO2Z1bmN0aW9uIG4ocil7aWYoMD09PXIubGVuZ3RofHwhMT09PXQudGVzdChyKSlyZXR1cm4gcjtmb3IodmFyIGU9MCxuPTAsbz1cIlwiLGY9XCJcIjtuPHIubGVuZ3RoO24rKyl7c3dpdGNoKHIuY2hhckNvZGVBdChuKSl7Y2FzZSAzNDpmPVwiJnF1b3Q7XCI7YnJlYWs7Y2FzZSAzODpmPVwiJmFtcDtcIjticmVhaztjYXNlIDYwOmY9XCImbHQ7XCI7YnJlYWs7ZGVmYXVsdDpjb250aW51ZX1uIT09ZSYmKG8rPXIuc2xpY2UoZSxuKSksbys9ZixlPW4rMX1yZXR1cm4gbiE9PWUmJihvKz1yLnNsaWNlKGUsbikpLG99dmFyIG89L2FjaXR8ZXgoPzpzfGd8bnxwfCQpfHJwaHxncmlkfG93c3xtbmN8bnR3fGluZVtjaF18em9vfF5vcmR8aXRlcmEvaSxmPTAsaT1BcnJheS5pc0FycmF5O2Z1bmN0aW9uIHUoZSx0LG4sbyxpLHUpe3R8fCh0PXt9KTt2YXIgYSxjLHA9dDtpZihcInJlZlwiaW4gcClmb3IoYyBpbiBwPXt9LHQpXCJyZWZcIj09Yz9hPXRbY106cFtjXT10W2NdO3ZhciBsPXt0eXBlOmUscHJvcHM6cCxrZXk6bixyZWY6YSxfX2s6bnVsbCxfXzpudWxsLF9fYjowLF9fZTpudWxsLF9fYzpudWxsLGNvbnN0cnVjdG9yOnZvaWQgMCxfX3Y6LS1mLF9faTotMSxfX3U6MCxfX3NvdXJjZTppLF9fc2VsZjp1fTtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBlJiYoYT1lLmRlZmF1bHRQcm9wcykpZm9yKGMgaW4gYSl2b2lkIDA9PT1wW2NdJiYocFtjXT1hW2NdKTtyZXR1cm4gci52bm9kZSYmci52bm9kZShsKSxsfWZ1bmN0aW9uIGEocil7dmFyIHQ9dShlLHt0cGw6cixleHByczpbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywxKX0pO3JldHVybiB0LmtleT10Ll9fdix0fXZhciBjPXt9LHA9L1tBLVpdL2c7ZnVuY3Rpb24gbChlLHQpe2lmKHIuYXR0cil7dmFyIGY9ci5hdHRyKGUsdCk7aWYoXCJzdHJpbmdcIj09dHlwZW9mIGYpcmV0dXJuIGZ9aWYodD1mdW5jdGlvbihyKXtyZXR1cm4gbnVsbCE9PXImJlwib2JqZWN0XCI9PXR5cGVvZiByJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiByLnZhbHVlT2Y/ci52YWx1ZU9mKCk6cn0odCksXCJyZWZcIj09PWV8fFwia2V5XCI9PT1lKXJldHVyblwiXCI7aWYoXCJzdHlsZVwiPT09ZSYmXCJvYmplY3RcIj09dHlwZW9mIHQpe3ZhciBpPVwiXCI7Zm9yKHZhciB1IGluIHQpe3ZhciBhPXRbdV07aWYobnVsbCE9YSYmXCJcIiE9PWEpe3ZhciBsPVwiLVwiPT11WzBdP3U6Y1t1XXx8KGNbdV09dS5yZXBsYWNlKHAsXCItJCZcIikudG9Mb3dlckNhc2UoKSkscz1cIjtcIjtcIm51bWJlclwiIT10eXBlb2YgYXx8bC5zdGFydHNXaXRoKFwiLS1cIil8fG8udGVzdChsKXx8KHM9XCJweDtcIiksaT1pK2wrXCI6XCIrYStzfX1yZXR1cm4gZSsnPVwiJytuKGkpKydcIid9cmV0dXJuIG51bGw9PXR8fCExPT09dHx8XCJmdW5jdGlvblwiPT10eXBlb2YgdHx8XCJvYmplY3RcIj09dHlwZW9mIHQ/XCJcIjohMD09PXQ/ZTplKyc9XCInK24oXCJcIit0KSsnXCInfWZ1bmN0aW9uIHMocil7aWYobnVsbD09cnx8XCJib29sZWFuXCI9PXR5cGVvZiByfHxcImZ1bmN0aW9uXCI9PXR5cGVvZiByKXJldHVybiBudWxsO2lmKFwib2JqZWN0XCI9PXR5cGVvZiByKXtpZih2b2lkIDA9PT1yLmNvbnN0cnVjdG9yKXJldHVybiByO2lmKGkocikpe2Zvcih2YXIgZT0wO2U8ci5sZW5ndGg7ZSsrKXJbZV09cyhyW2VdKTtyZXR1cm4gcn19cmV0dXJuIG4oXCJcIityKX1leHBvcnR7dSBhcyBqc3gsbCBhcyBqc3hBdHRyLHUgYXMganN4REVWLHMgYXMganN4RXNjYXBlLGEgYXMganN4VGVtcGxhdGUsdSBhcyBqc3hzfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWpzeFJ1bnRpbWUubW9kdWxlLmpzLm1hcFxuIiwiaW1wb3J0IHR5cGUgeyBTaWduYWwgfSBmcm9tICdAcHJlYWN0L3NpZ25hbHMnXG5pbXBvcnQgdHlwZSB7IENvbXBvbmVudENoaWxkcmVuIH0gZnJvbSAncHJlYWN0J1xuXG5pbnRlcmZhY2UgQnV0dG9uUm93UHJvcHMge1xuICBjaGlsZHJlbjogQ29tcG9uZW50Q2hpbGRyZW5cbiAgdmlzaWJsZT86IFNpZ25hbDxib29sZWFuPlxufVxuXG5leHBvcnQgZnVuY3Rpb24gQnV0dG9uUm93KHsgY2hpbGRyZW4sIHZpc2libGUgfTogQnV0dG9uUm93UHJvcHMpIHtcbiAgaWYgKHZpc2libGUgJiYgIXZpc2libGUudmFsdWUpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgcmV0dXJuIDxkaXY+e2NoaWxkcmVufTwvZGl2PlxufVxuIiwiaW1wb3J0IHR5cGUgeyBTaWduYWwgfSBmcm9tICdAcHJlYWN0L3NpZ25hbHMnXG5cbmludGVyZmFjZSBTZXR0aW5nQnV0dG9uUHJvcHM8VD4ge1xuICBsYWJlbDogc3RyaW5nXG4gIHNldHRpbmc6IFNpZ25hbDxUPlxuICBvcHRpb25zOiByZWFkb25seSBUW11cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNldHRpbmdCdXR0b248VD4oeyBsYWJlbCwgc2V0dGluZywgb3B0aW9ucyB9OiBTZXR0aW5nQnV0dG9uUHJvcHM8VD4pIHtcbiAgY29uc3QgaGFuZGxlQ2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3QgY3VycmVudEluZGV4ID0gb3B0aW9ucy5pbmRleE9mKHNldHRpbmcudmFsdWUpXG4gICAgY29uc3QgbmV4dEluZGV4ID0gKGN1cnJlbnRJbmRleCArIDEpICUgb3B0aW9ucy5sZW5ndGhcbiAgICBzZXR0aW5nLnZhbHVlID0gb3B0aW9uc1tuZXh0SW5kZXhdXG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxidXR0b24gb25DbGljaz17aGFuZGxlQ2xpY2t9IHR5cGU9XCJidXR0b25cIj5cbiAgICAgIHtsYWJlbH06IHtTdHJpbmcoc2V0dGluZy52YWx1ZSl9XG4gICAgPC9idXR0b24+XG4gIClcbn1cbiIsImltcG9ydCB0eXBlIHsgU2lnbmFsIH0gZnJvbSAnQHByZWFjdC9zaWduYWxzJ1xuaW1wb3J0IHsgc2V0dGluZ3MgfSBmcm9tICcuLi9zZXR0aW5ncy9zZXR0aW5nc1N0b3JlJ1xuaW1wb3J0IHsgQnV0dG9uUm93IH0gZnJvbSAnLi9CdXR0b25Sb3cnXG5pbXBvcnQgeyBTZXR0aW5nQnV0dG9uIH0gZnJvbSAnLi9TZXR0aW5nQnV0dG9uJ1xuXG5pbnRlcmZhY2UgQ29udHJvbFBhbmVsUHJvcHMge1xuICBib2FyZENoYW5nZWQ6IFNpZ25hbDxudW1iZXI+XG59XG5cbmNvbnN0IFNQRUFLX1JBVEVfT1BUSU9OUyA9IFswLjIsIDAuNSwgMC43LCAxLjAsIDEuMSwgMS4yXSBhcyBjb25zdFxuY29uc3QgVE9HR0xFX09QVElPTlMgPSBbZmFsc2UsIHRydWVdIGFzIGNvbnN0XG5cbmV4cG9ydCBmdW5jdGlvbiBDb250cm9sUGFuZWwoeyBib2FyZENoYW5nZWQgfTogQ29udHJvbFBhbmVsUHJvcHMpIHtcbiAgLy8gVXNlIGJvYXJkQ2hhbmdlZCB0byBlbnN1cmUgY29tcG9uZW50IHJlLXJlbmRlcnMgd2hlbiBib2FyZCBjaGFuZ2VzXG4gIGJvYXJkQ2hhbmdlZC52YWx1ZVxuXG4gIHJldHVybiAoXG4gICAgPGRpdj5cbiAgICAgIDxCdXR0b25Sb3c+XG4gICAgICAgIDxTZXR0aW5nQnV0dG9uXG4gICAgICAgICAgbGFiZWw9XCJTcGVhayBSYXRlXCJcbiAgICAgICAgICBzZXR0aW5nPXtzZXR0aW5ncy5zcGVha1JhdGV9XG4gICAgICAgICAgb3B0aW9ucz17U1BFQUtfUkFURV9PUFRJT05TfVxuICAgICAgICAvPlxuICAgICAgICA8U2V0dGluZ0J1dHRvblxuICAgICAgICAgIGxhYmVsPVwiUGllY2VzIExpc3RcIlxuICAgICAgICAgIHNldHRpbmc9e3NldHRpbmdzLnBpZWNlc0xpc3RFbmFibGVkfVxuICAgICAgICAgIG9wdGlvbnM9e1RPR0dMRV9PUFRJT05TfVxuICAgICAgICAvPlxuICAgICAgICA8U2V0dGluZ0J1dHRvblxuICAgICAgICAgIGxhYmVsPVwiRGl2aWRlcnNcIlxuICAgICAgICAgIHNldHRpbmc9e3NldHRpbmdzLmRpdmlkZXJzRW5hYmxlZH1cbiAgICAgICAgICBvcHRpb25zPXtUT0dHTEVfT1BUSU9OU31cbiAgICAgICAgLz5cbiAgICAgICAgPFNldHRpbmdCdXR0b25cbiAgICAgICAgICBsYWJlbD1cIkN1c3RvbSBCb2FyZFwiXG4gICAgICAgICAgc2V0dGluZz17c2V0dGluZ3MuY3VzdG9tQm9hcmRFbmFibGVkfVxuICAgICAgICAgIG9wdGlvbnM9e1RPR0dMRV9PUFRJT05TfVxuICAgICAgICAvPlxuICAgICAgICA8U2V0dGluZ0J1dHRvblxuICAgICAgICAgIGxhYmVsPVwiRmxhc2ggTW9kZVwiXG4gICAgICAgICAgc2V0dGluZz17c2V0dGluZ3MuZmxhc2hNb2RlRW5hYmxlZH1cbiAgICAgICAgICBvcHRpb25zPXtUT0dHTEVfT1BUSU9OU31cbiAgICAgICAgLz5cbiAgICAgIDwvQnV0dG9uUm93PlxuICAgIDwvZGl2PlxuICApXG59XG4iLCJpbXBvcnQgdHlwZSB7IFNpZ25hbCB9IGZyb20gJ0BwcmVhY3Qvc2lnbmFscy1jb3JlJ1xuaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSAncHJlYWN0J1xuaW1wb3J0IHsgQ29udHJvbFBhbmVsIH0gZnJvbSAnLi9Db250cm9sUGFuZWwnXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVSb290KGJvYXJkQ2hhbmdlZDogU2lnbmFsPG51bWJlcj4sIG1vdW50UG9pbnQ6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gIHJlbmRlcig8Q29udHJvbFBhbmVsIGJvYXJkQ2hhbmdlZD17Ym9hcmRDaGFuZ2VkfSAvPiwgbW91bnRQb2ludClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlc3Ryb3lSb290KG1vdW50UG9pbnQ6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gIHJlbmRlcihudWxsLCBtb3VudFBvaW50KVxufVxuIiwiaW1wb3J0IHsgc2lnbmFsIH0gZnJvbSAnQHByZWFjdC9zaWduYWxzLWNvcmUnXG5pbXBvcnQgeyBjcmVhdGVEaXZpZGVycywgZGVzdHJveURpdmlkZXJzIH0gZnJvbSAnLi9hZGFwdGVycy1vdmVybGF5cy9kaXZpZGVycydcbmltcG9ydCB7IGNyZWF0ZUZsYXNoT3ZlcmxheSwgZGVzdHJveUZsYXNoT3ZlcmxheSB9IGZyb20gJy4vYWRhcHRlcnMtb3ZlcmxheXMvZmxhc2gnXG5pbXBvcnQgeyBzZXR1cERpdmlkZXJzRWZmZWN0IH0gZnJvbSAnLi9hcHBsaWNhdGlvbi1lZmZlY3RzL29uRGl2aWRlcnMnXG5pbXBvcnQge1xuICBjcmVhdGVCb2FyZE9ic2VydmVyLFxuICBzdGFydEJvYXJkT2JzZXJ2ZXIsXG4gIHN0b3BCb2FyZE9ic2VydmVyLFxufSBmcm9tICcuL2FwcGxpY2F0aW9uLW9ic2VydmVycy9vYnNlcnZlclN0YXRlJ1xuaW1wb3J0IHsgc2V0dXBLZXlib2FyZENvbW1hbmRzLCB0ZWFyZG93bktleWJvYXJkQ29tbWFuZHMgfSBmcm9tICcuL2NvbW1hbmRzL2tleWJvYXJkSW5wdXQnXG5pbXBvcnQgeyBjcmVhdGVSb290LCBkZXN0cm95Um9vdCB9IGZyb20gJy4vY29tcG9uZW50cy9yb290J1xuaW1wb3J0IHsgRG9tU2VsZWN0b3IgfSBmcm9tICcuL2NvbnN0YW50cydcbmltcG9ydCB7IHdhaXRGb3JFbGVtZW50IH0gZnJvbSAnLi9kb20vYm9hcmRSZWFkZXInXG5pbXBvcnQgeyBhcHBlbmRDaGlsZCwgY3JlYXRlRGl2LCBxdWVyeVNlbGVjdG9yIH0gZnJvbSAnLi9wbGF0Zm9ybS9kb20nXG5pbXBvcnQgeyBsb2FkU2V0dGluZ3MsIHNldHVwQXV0b1NhdmUgfSBmcm9tICcuL3NldHRpbmdzL3NldHRpbmdzU3RvcmUnXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbml0KCkge1xuICAvLyBXYWl0IGZvciBsaWNoZXNzIHRvIGxvYWQgdGhlIGJvYXJkXG4gIGF3YWl0IHdhaXRGb3JFbGVtZW50KERvbVNlbGVjdG9yLktFWUJPQVJEX01PVkUpXG5cbiAgLy8gSW5pdGlhbGl6ZSBzZXR0aW5nc1xuICBsb2FkU2V0dGluZ3MoKVxuICBzZXR1cEF1dG9TYXZlKClcblxuICAvLyBDcmVhdGUgc2hhcmVkIGJvYXJkIGNoYW5nZSBzaWduYWxcbiAgY29uc3QgYm9hcmRDaGFuZ2VkID0gc2lnbmFsKDApXG5cbiAgLy8gQ3JlYXRlIERPTSBzdGF0ZVxuICBjb25zdCBmbGFzaFN0YXRlID0gY3JlYXRlRmxhc2hPdmVybGF5KClcbiAgY29uc3QgZGl2aWRlcnNTdGF0ZSA9IGNyZWF0ZURpdmlkZXJzKClcbiAgY29uc3QgYm9hcmRPYnNlcnZlclN0YXRlID0gY3JlYXRlQm9hcmRPYnNlcnZlcihib2FyZENoYW5nZWQpXG5cbiAgLy8gU3RhcnQgb2JzZXJ2ZXJcbiAgc3RhcnRCb2FyZE9ic2VydmVyKGJvYXJkT2JzZXJ2ZXJTdGF0ZSlcblxuICAvLyBTZXQgdXAgZWZmZWN0c1xuICBjb25zdCBjbGVhbnVwRGl2aWRlcnMgPSBzZXR1cERpdmlkZXJzRWZmZWN0KGRpdmlkZXJzU3RhdGUpXG5cbiAgLy8gU2V0IHVwIGNvbW1hbmRzXG4gIHNldHVwS2V5Ym9hcmRDb21tYW5kcygpXG5cbiAgLy8gTW91bnQgUHJlYWN0IFVJXG4gIGNvbnN0IG1vdW50UG9pbnQgPSBjcmVhdGVEaXYoKVxuICBjb25zdCBrZXlib2FyZE1vdmUgPSBxdWVyeVNlbGVjdG9yKERvbVNlbGVjdG9yLktFWUJPQVJEX01PVkUpXG4gIGlmIChrZXlib2FyZE1vdmUpIHtcbiAgICBhcHBlbmRDaGlsZChrZXlib2FyZE1vdmUsIG1vdW50UG9pbnQpXG4gIH1cbiAgY3JlYXRlUm9vdChib2FyZENoYW5nZWQsIG1vdW50UG9pbnQpXG5cbiAgLy8gUmV0dXJuIGNsZWFudXAgZnVuY3Rpb25cbiAgcmV0dXJuICgpID0+IHtcbiAgICBjbGVhbnVwRGl2aWRlcnMoKVxuICAgIHN0b3BCb2FyZE9ic2VydmVyKGJvYXJkT2JzZXJ2ZXJTdGF0ZSlcbiAgICBkZXN0cm95Rmxhc2hPdmVybGF5KGZsYXNoU3RhdGUpXG4gICAgZGVzdHJveURpdmlkZXJzKGRpdmlkZXJzU3RhdGUpXG4gICAgdGVhcmRvd25LZXlib2FyZENvbW1hbmRzKClcbiAgICBkZXN0cm95Um9vdChtb3VudFBvaW50KVxuICB9XG59XG4iLCJpbXBvcnQgeyBpbml0IH0gZnJvbSAnLi9pbml0J1xuXG4vLyBTdGFydCB0aGUgYXBwbGljYXRpb25cbmluaXQoKS5jYXRjaChjb25zb2xlLmVycm9yKVxuIl0sInhfZ29vZ2xlX2lnbm9yZUxpc3QiOlswLDIyLDIzXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Q0FBQSxJQUFJQSxNQUFFLE9BQU8sSUFBSSxnQkFBZ0I7Q0FBRSxTQUFTQyxNQUFHO0VBQUMsSUFBRyxFQUFFQyxNQUFFLElBQUc7R0FBQyxJQUFJLEdBQUUsSUFBRSxDQUFDO0dBQUUsQ0FBQyxXQUFVO0lBQUMsSUFBSSxJQUFFQztJQUFFLE1BQUUsS0FBSztJQUFFLE9BQU0sS0FBSyxNQUFJLEdBQUU7S0FBQyxJQUFHLEVBQUUsRUFBRSxNQUFJLEVBQUUsR0FBRSxFQUFFLEVBQUUsSUFBRSxFQUFFO0tBQUUsSUFBRSxFQUFFO0lBQUM7R0FBQyxHQUFFO0dBQUUsT0FBTSxLQUFLLE1BQUlDLEtBQUU7SUFBQyxJQUFJLElBQUVBO0lBQUUsTUFBRSxLQUFLO0lBQUU7SUFBSSxPQUFNLEtBQUssTUFBSSxHQUFFO0tBQUMsSUFBSSxJQUFFLEVBQUU7S0FBRSxFQUFFLElBQUUsS0FBSztLQUFFLEVBQUUsS0FBRztLQUFHLElBQUcsRUFBRSxJQUFFLEVBQUUsTUFBSUMsSUFBRSxDQUFDLEdBQUUsSUFBRztNQUFDLEVBQUUsRUFBRTtLQUFDLFNBQU8sR0FBRTtNQUFDLElBQUcsQ0FBQyxHQUFFO09BQUMsSUFBRTtPQUFFLElBQUUsQ0FBQztNQUFDO0tBQUM7S0FBQyxJQUFFO0lBQUM7R0FBQztHQUFDLE1BQUU7R0FBRTtHQUFJLElBQUcsR0FBRSxNQUFNO0VBQUMsT0FBTTtDQUFHO0NBQXVFLElBQUlDLE1BQUUsS0FBSztDQUFFLFNBQVNDLElBQUUsR0FBRTtFQUFDLElBQUksSUFBRUQ7RUFBRSxNQUFFLEtBQUs7RUFBRSxJQUFHO0dBQUMsT0FBTyxFQUFFO0VBQUMsVUFBUTtHQUFDLE1BQUU7RUFBQztDQUFDO0NBQUMsSUFBSUUsS0FBRUosTUFBRSxLQUFLLEdBQUVGLE1BQUUsR0FBRU8sTUFBRSxHQUFNRSxNQUFFLEdBQUVSLE1BQUUsS0FBSyxHQUFFUyxNQUFFO0NBQUUsU0FBU0MsSUFBRSxHQUFFO0VBQUMsSUFBRyxLQUFLLE1BQUlQLEtBQUU7R0FBQyxJQUFJLElBQUUsRUFBRTtHQUFFLElBQUcsS0FBSyxNQUFJLEtBQUcsRUFBRSxNQUFJQSxLQUFFO0lBQUMsSUFBRTtLQUFDLEdBQUU7S0FBRSxHQUFFO0tBQUUsR0FBRUEsSUFBRTtLQUFFLEdBQUUsS0FBSztLQUFFLEdBQUVBO0tBQUUsR0FBRSxLQUFLO0tBQUUsR0FBRSxLQUFLO0tBQUUsR0FBRTtJQUFDO0lBQUUsSUFBRyxLQUFLLE1BQUlBLElBQUUsR0FBRSxJQUFFLEVBQUUsSUFBRTtJQUFFLElBQUUsSUFBRTtJQUFFLEVBQUUsSUFBRTtJQUFFLElBQUcsS0FBR0EsSUFBRSxHQUFFLEVBQUUsRUFBRSxDQUFDO0lBQUUsT0FBTztHQUFDLE9BQU0sSUFBRyxPQUFLLEVBQUUsR0FBRTtJQUFDLEVBQUUsSUFBRTtJQUFFLElBQUcsS0FBSyxNQUFJLEVBQUUsR0FBRTtLQUFDLEVBQUUsRUFBRSxJQUFFLEVBQUU7S0FBRSxJQUFHLEtBQUssTUFBSSxFQUFFLEdBQUUsRUFBRSxFQUFFLElBQUUsRUFBRTtLQUFFLEVBQUUsSUFBRUEsSUFBRTtLQUFFLEVBQUUsSUFBRSxLQUFLO0tBQUUsSUFBRSxFQUFFLElBQUU7S0FBRSxJQUFFLElBQUU7SUFBQztJQUFDLE9BQU87R0FBQztFQUFDO0NBQUM7Q0FBQyxTQUFTUSxJQUFFLEdBQUUsR0FBRTtFQUFDLEtBQUssSUFBRTtFQUFFLEtBQUssSUFBRTtFQUFFLEtBQUssSUFBRSxLQUFLO0VBQUUsS0FBSyxJQUFFLEtBQUs7RUFBRSxLQUFLLElBQUU7RUFBRSxLQUFLLElBQUUsUUFBTSxJQUFFLEtBQUssSUFBRSxFQUFFO0VBQVEsS0FBSyxJQUFFLFFBQU0sSUFBRSxLQUFLLElBQUUsRUFBRTtFQUFVLEtBQUssT0FBSyxRQUFNLElBQUUsS0FBSyxJQUFFLEVBQUU7Q0FBSTtDQUFDLElBQUUsVUFBVSxRQUFNZDtDQUFFLElBQUUsVUFBVSxJQUFFLFdBQVU7RUFBQyxPQUFNLENBQUM7Q0FBQztDQUFFLElBQUUsVUFBVSxJQUFFLFNBQVMsR0FBRTtFQUFDLElBQUksSUFBRSxNQUFLLElBQUUsS0FBSztFQUFFLElBQUcsTUFBSSxLQUFHLEtBQUssTUFBSSxFQUFFLEdBQUU7R0FBQyxFQUFFLElBQUU7R0FBRSxLQUFLLElBQUU7R0FBRSxJQUFHLEtBQUssTUFBSSxHQUFFLEVBQUUsSUFBRTtRQUFPLElBQUUsV0FBVTtJQUFDLElBQUk7SUFBRSxTQUFPLElBQUUsRUFBRSxNQUFJLEVBQUUsS0FBSyxDQUFDO0dBQUMsQ0FBQztFQUFDO0NBQUM7Q0FBRSxJQUFFLFVBQVUsSUFBRSxTQUFTLEdBQUU7RUFBQyxJQUFJLElBQUU7RUFBSyxJQUFHLEtBQUssTUFBSSxLQUFLLEdBQUU7R0FBQyxJQUFJLElBQUUsRUFBRSxHQUFFLElBQUUsRUFBRTtHQUFFLElBQUcsS0FBSyxNQUFJLEdBQUU7SUFBQyxFQUFFLElBQUU7SUFBRSxFQUFFLElBQUUsS0FBSztHQUFDO0dBQUMsSUFBRyxLQUFLLE1BQUksR0FBRTtJQUFDLEVBQUUsSUFBRTtJQUFFLEVBQUUsSUFBRSxLQUFLO0dBQUM7R0FBQyxJQUFHLE1BQUksS0FBSyxHQUFFO0lBQUMsS0FBSyxJQUFFO0lBQUUsSUFBRyxLQUFLLE1BQUksR0FBRSxJQUFFLFdBQVU7S0FBQyxJQUFJO0tBQUUsU0FBTyxJQUFFLEVBQUUsTUFBSSxFQUFFLEtBQUssQ0FBQztJQUFDLENBQUM7R0FBQztFQUFDO0NBQUM7Q0FBRSxJQUFFLFVBQVUsWUFBVSxTQUFTLEdBQUU7RUFBQyxJQUFJLElBQUU7RUFBSyxPQUFPZSxJQUFFLFdBQVU7R0FBQyxJQUFJLElBQUUsRUFBRSxPQUFNLElBQUVUO0dBQUUsTUFBRSxLQUFLO0dBQUUsSUFBRztJQUFDLEVBQUUsQ0FBQztHQUFDLFVBQVE7SUFBQyxNQUFFO0dBQUM7RUFBQyxHQUFFLEVBQUMsTUFBSyxNQUFLLENBQUM7Q0FBQztDQUFFLElBQUUsVUFBVSxVQUFRLFdBQVU7RUFBQyxPQUFPLEtBQUs7Q0FBSztDQUFFLElBQUUsVUFBVSxXQUFTLFdBQVU7RUFBQyxPQUFPLEtBQUssUUFBTTtDQUFFO0NBQUUsSUFBRSxVQUFVLFNBQU8sV0FBVTtFQUFDLE9BQU8sS0FBSztDQUFLO0NBQUUsSUFBRSxVQUFVLE9BQUssV0FBVTtFQUFDLElBQUksSUFBRTtFQUFLLE9BQU9DLElBQUUsV0FBVTtHQUFDLE9BQU8sRUFBRTtFQUFLLENBQUM7Q0FBQztDQUFFLE9BQU8sZUFBZU8sSUFBRSxXQUFVLFNBQVE7RUFBQyxLQUFJLFdBQVU7R0FBQyxJQUFJLElBQUVELElBQUUsSUFBSTtHQUFFLElBQUcsS0FBSyxNQUFJLEdBQUUsRUFBRSxJQUFFLEtBQUs7R0FBRSxPQUFPLEtBQUs7RUFBQztFQUFFLEtBQUksU0FBUyxHQUFFO0dBQUMsSUFBRyxNQUFJLEtBQUssR0FBRTtJQUFDLElBQUdKLE1BQUUsS0FBSSxNQUFNLElBQUksTUFBTSxnQkFBZ0I7SUFBRSxDQUFDLFNBQVMsR0FBRTtLQUFDLElBQUcsTUFBSVAsT0FBRyxNQUFJTztVQUFLLEVBQUUsTUFBSUUsS0FBRTtPQUFDLEVBQUUsSUFBRUE7T0FBRSxNQUFFO1FBQUMsR0FBRTtRQUFFLEdBQUUsRUFBRTtRQUFFLEdBQUUsRUFBRTtRQUFFLEdBQUVSO09BQUM7TUFBQzs7SUFBQyxHQUFFLElBQUk7SUFBRSxLQUFLLElBQUU7SUFBRSxLQUFLO0lBQUk7SUFBSTtJQUFJLElBQUc7S0FBQyxLQUFJLElBQUksSUFBRSxLQUFLLEdBQUUsS0FBSyxNQUFJLEdBQUUsSUFBRSxFQUFFLEdBQUUsRUFBRSxFQUFFLEVBQUU7SUFBQyxVQUFRO0tBQUMsSUFBRTtJQUFDO0dBQUM7RUFBQztDQUFDLENBQUM7Q0FBRSxTQUFTYSxJQUFFLEdBQUUsR0FBRTtFQUFDLE9BQU8sSUFBSUYsSUFBRSxHQUFFLENBQUM7Q0FBQztDQUFDLFNBQVNULElBQUUsR0FBRTtFQUFDLEtBQUksSUFBSSxJQUFFLEVBQUUsR0FBRSxLQUFLLE1BQUksR0FBRSxJQUFFLEVBQUUsR0FBRSxJQUFHLEVBQUUsRUFBRSxNQUFJLEVBQUUsS0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEtBQUcsRUFBRSxFQUFFLE1BQUksRUFBRSxHQUFFLE9BQU0sQ0FBQztFQUFFLE9BQU0sQ0FBQztDQUFDO0NBQUMsU0FBU1ksSUFBRSxHQUFFO0VBQUMsS0FBSSxJQUFJLElBQUUsRUFBRSxHQUFFLEtBQUssTUFBSSxHQUFFLElBQUUsRUFBRSxHQUFFO0dBQUMsSUFBSSxJQUFFLEVBQUUsRUFBRTtHQUFFLElBQUcsS0FBSyxNQUFJLEdBQUUsRUFBRSxJQUFFO0dBQUUsRUFBRSxFQUFFLElBQUU7R0FBRSxFQUFFLElBQUU7R0FBRyxJQUFHLEtBQUssTUFBSSxFQUFFLEdBQUU7SUFBQyxFQUFFLElBQUU7SUFBRTtHQUFLO0VBQUM7Q0FBQztDQUFDLFNBQVNDLElBQUUsR0FBRTtFQUFDLElBQUksSUFBRSxFQUFFLEdBQUUsSUFBRSxLQUFLO0VBQUUsT0FBTSxLQUFLLE1BQUksR0FBRTtHQUFDLElBQUksSUFBRSxFQUFFO0dBQUUsSUFBRyxPQUFLLEVBQUUsR0FBRTtJQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFBRSxJQUFHLEtBQUssTUFBSSxHQUFFLEVBQUUsSUFBRSxFQUFFO0lBQUUsSUFBRyxLQUFLLE1BQUksRUFBRSxHQUFFLEVBQUUsRUFBRSxJQUFFO0dBQUMsT0FBTSxJQUFFO0dBQUUsRUFBRSxFQUFFLElBQUUsRUFBRTtHQUFFLElBQUcsS0FBSyxNQUFJLEVBQUUsR0FBRSxFQUFFLElBQUUsS0FBSztHQUFFLElBQUU7RUFBQztFQUFDLEVBQUUsSUFBRTtDQUFDO0NBQUMsU0FBU0MsSUFBRSxHQUFFLEdBQUU7RUFBQyxJQUFFLEtBQUssTUFBSyxLQUFLLENBQUM7RUFBRSxLQUFLLElBQUU7RUFBRSxLQUFLLElBQUUsS0FBSztFQUFFLEtBQUssSUFBRVAsTUFBRTtFQUFFLEtBQUssSUFBRTtFQUFFLEtBQUssSUFBRSxRQUFNLElBQUUsS0FBSyxJQUFFLEVBQUU7RUFBUSxLQUFLLElBQUUsUUFBTSxJQUFFLEtBQUssSUFBRSxFQUFFO0VBQVUsS0FBSyxPQUFLLFFBQU0sSUFBRSxLQUFLLElBQUUsRUFBRTtDQUFJO0NBQUMsSUFBRSxZQUFVLElBQUlFLElBQUFBO0NBQUUsSUFBRSxVQUFVLElBQUUsV0FBVTtFQUFDLEtBQUssS0FBRztFQUFHLElBQUcsSUFBRSxLQUFLLEdBQUUsT0FBTSxDQUFDO0VBQUUsSUFBRyxPQUFLLEtBQUcsS0FBSyxJQUFHLE9BQU0sQ0FBQztFQUFFLEtBQUssS0FBRztFQUFHLElBQUcsS0FBSyxNQUFJRixLQUFFLE9BQU0sQ0FBQztFQUFFLEtBQUssSUFBRUE7RUFBRSxLQUFLLEtBQUc7RUFBRSxJQUFHLEtBQUssSUFBRSxLQUFHLENBQUNQLElBQUUsSUFBSSxHQUFFO0dBQUMsS0FBSyxLQUFHO0dBQUcsT0FBTSxDQUFDO0VBQUM7RUFBQyxJQUFJLElBQUVDO0VBQUUsSUFBRztHQUFDLElBQUUsSUFBSTtHQUFFLE1BQUU7R0FBSyxJQUFJLElBQUUsS0FBSyxFQUFFO0dBQUUsSUFBRyxLQUFHLEtBQUssS0FBRyxLQUFLLE1BQUksS0FBRyxNQUFJLEtBQUssR0FBRTtJQUFDLEtBQUssSUFBRTtJQUFFLEtBQUssS0FBRztJQUFJLEtBQUs7R0FBRztFQUFDLFNBQU8sR0FBRTtHQUFDLEtBQUssSUFBRTtHQUFFLEtBQUssS0FBRztHQUFHLEtBQUs7RUFBRztFQUFDLE1BQUU7RUFBRSxJQUFFLElBQUk7RUFBRSxLQUFLLEtBQUc7RUFBRyxPQUFNLENBQUM7Q0FBQztDQUFFLElBQUUsVUFBVSxJQUFFLFNBQVMsR0FBRTtFQUFDLElBQUcsS0FBSyxNQUFJLEtBQUssR0FBRTtHQUFDLEtBQUssS0FBRztHQUFHLEtBQUksSUFBSSxJQUFFLEtBQUssR0FBRSxLQUFLLE1BQUksR0FBRSxJQUFFLEVBQUUsR0FBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO0VBQUM7RUFBQyxJQUFFLFVBQVUsRUFBRSxLQUFLLE1BQUssQ0FBQztDQUFDO0NBQUUsSUFBRSxVQUFVLElBQUUsU0FBUyxHQUFFO0VBQUMsSUFBRyxLQUFLLE1BQUksS0FBSyxHQUFFO0dBQUMsSUFBRSxVQUFVLEVBQUUsS0FBSyxNQUFLLENBQUM7R0FBRSxJQUFHLEtBQUssTUFBSSxLQUFLLEdBQUU7SUFBQyxLQUFLLEtBQUc7SUFBSSxLQUFJLElBQUksSUFBRSxLQUFLLEdBQUUsS0FBSyxNQUFJLEdBQUUsSUFBRSxFQUFFLEdBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztHQUFDO0VBQUM7Q0FBQztDQUFFLElBQUUsVUFBVSxJQUFFLFdBQVU7RUFBQyxJQUFHLEVBQUUsSUFBRSxLQUFLLElBQUc7R0FBQyxLQUFLLEtBQUc7R0FBRSxLQUFJLElBQUksSUFBRSxLQUFLLEdBQUUsS0FBSyxNQUFJLEdBQUUsSUFBRSxFQUFFLEdBQUUsRUFBRSxFQUFFLEVBQUU7RUFBQztDQUFDO0NBQUUsT0FBTyxlQUFlYSxJQUFFLFdBQVUsU0FBUSxFQUFDLEtBQUksV0FBVTtFQUFDLElBQUcsSUFBRSxLQUFLLEdBQUUsTUFBTSxJQUFJLE1BQU0sZ0JBQWdCO0VBQUUsSUFBSSxJQUFFTixJQUFFLElBQUk7RUFBRSxLQUFLLEVBQUU7RUFBRSxJQUFH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QUcsRUFBRTtFQUFHLE9BQU87Q0FBQztDQUFDLFNBQVMsRUFBRSxHQUFFO0VBQUMsS0FBRyxFQUFFLGNBQVksRUFBRSxXQUFXLFlBQVksQ0FBQztDQUFDO0NBQUMsU0FBUyxFQUFFLEdBQUUsR0FBRSxHQUFFO0VBQUMsSUFBSSxHQUFFLEdBQUUsR0FBRSxJQUFFLENBQUM7RUFBRSxLQUFJLEtBQUssR0FBRSxTQUFPLElBQUUsSUFBRSxFQUFFLEtBQUcsU0FBTyxJQUFFLElBQUUsRUFBRSxLQUFHLEVBQUUsS0FBRyxFQUFFO0VBQUcsSUFBRyxVQUFVLFNBQU8sTUFBSSxFQUFFLFdBQVMsVUFBVSxTQUFPLElBQUUsRUFBRSxLQUFLLFdBQVUsQ0FBQyxJQUFFLElBQUcsY0FBWSxPQUFPLEtBQUcsUUFBTSxFQUFFLGNBQWEsS0FBSSxLQUFLLEVBQUUsY0FBYSxLQUFLLE1BQUksRUFBRSxPQUFLLEVBQUUsS0FBRyxFQUFFLGFBQWE7RUFBSSxPQUFPLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxJQUFJO0NBQUM7Q0FBQyxTQUFTLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0VBQUMsSUFBSSxJQUFFO0dBQUMsTUFBSztHQUFFLE9BQU07R0FBRSxLQUFJO0dBQUUsS0FBSTtHQUFFLEtBQUk7R0FBSyxJQUFHO0dBQUssS0FBSTtHQUFFLEtBQUk7R0FBSyxLQUFJO0dBQUssYUFBWSxLQUFLO0dBQUUsS0FBSSxRQUFNLElBQUUsRUFBRUgsTUFBRTtHQUFFLEtBQUk7R0FBRyxLQUFJO0VBQUM7RUFBRSxPQUFPLFFBQU0sS0FBRyxRQUFNLEVBQUUsU0FBTyxFQUFFLE1BQU0sQ0FBQyxHQUFFO0NBQUM7Q0FBbUMsU0FBUyxFQUFFLEdBQUU7RUFBQyxPQUFPLEVBQUU7Q0FBUTtDQUFDLFNBQVMsRUFBRSxHQUFFLEdBQUU7RUFBQyxLQUFLLFFBQU0sR0FBRSxLQUFLLFVBQVE7Q0FBQztDQUFDLFNBQVMsRUFBRSxHQUFFLEdBQUU7RUFBQyxJQUFHLFFBQU0sR0FBRSxPQUFPLEVBQUUsS0FBRyxFQUFFLEVBQUUsSUFBRyxFQUFFLE1BQUksQ0FBQyxJQUFFO0VBQUssS0FBSSxJQUFJLEdBQUUsSUFBRSxFQUFFLElBQUksUUFBTyxLQUFJLElBQUcsU0FBTyxJQUFFLEVBQUUsSUFBSSxPQUFLLFFBQU0sRUFBRSxLQUFJLE9BQU8sRUFBRTtFQUFJLE9BQU0sY0FBWSxPQUFPLEVBQUUsT0FBSyxFQUFFLENBQUMsSUFBRTtDQUFJO0NBQUMsU0FBUyxFQUFFLEdBQUU7RUFBQyxJQUFHLEVBQUUsT0FBSyxFQUFFLEtBQUk7R0FBQyxJQUFJLElBQUUsRUFBRSxLQUFJLElBQUUsRUFBRSxLQUFJLElBQUUsQ0FBQyxHQUFFLElBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxDQUFDLEdBQUUsQ0FBQztHQUFFLEVBQUUsTUFBSSxFQUFFLE1BQUksR0FBRSxFQUFFLFNBQU8sRUFBRSxNQUFNLENBQUMsR0FBRSxFQUFFLEVBQUUsS0FBSSxHQUFFLEdBQUUsRUFBRSxLQUFJLEVBQUUsSUFBSSxjQUFhLEtBQUcsRUFBRSxNQUFJLENBQUMsQ0FBQyxJQUFFLE1BQUssR0FBRSxRQUFNLElBQUUsRUFBRSxDQUFDLElBQUUsR0FBRSxDQUFDLEVBQUUsS0FBRyxFQUFFLE1BQUssQ0FBQyxHQUFFLEVBQUUsTUFBSSxFQUFFLEtBQUksRUFBRSxHQUFHLElBQUksRUFBRSxPQUFLLEdBQUUsRUFBRSxHQUFFLEdBQUUsQ0FBQyxHQUFFLEVBQUUsTUFBSSxFQUFFLEtBQUcsTUFBSyxFQUFFLE9BQUssS0FBRyxFQUFFLENBQUM7RUFBQztDQUFDO0NBQUMsU0FBUyxFQUFFLEdBQUU7RUFBQyxJQUFHLFNBQU8sSUFBRSxFQUFFLE9BQUssUUFBTSxFQUFFLEtBQUksT0FBTyxFQUFFLE1BQUksRUFBRSxJQUFJLE9BQUssTUFBSyxFQUFFLElBQUksS0FBSyxTQUFTLEdBQUU7R0FBQyxJQUFHLFFBQU0sS0FBRyxRQUFNLEVBQUUsS0FBSSxPQUFPLEVBQUUsTUFBSSxFQUFFLElBQUksT0FBSyxFQUFFO0VBQUcsQ0FBQyxHQUFFLEVBQUUsQ0FBQztDQUFDO0NBQUMsU0FBUyxFQUFFLEdBQUU7RUFBQyxDQUFDLENBQUMsRUFBRSxRQUFNLEVBQUUsTUFBSSxDQUFDLE1BQUlDLElBQUUsS0FBSyxDQUFDLEtBQUcsQ0FBQyxFQUFFLFNBQU8sS0FBRyxFQUFFLHdCQUFzQixJQUFFLEVBQUUsc0JBQW9CQyxLQUFHLENBQUM7Q0FBQztDQUFDLFNBQVMsSUFBRztFQUFDLElBQUc7R0FBQyxLQUFJLElBQUksR0FBRSxJQUFFLEdBQUVELElBQUUsU0FBUSxJQUFFLFNBQU8sS0FBR0EsSUFBRSxLQUFLLENBQUMsR0FBRSxJQUFFQSxJQUFFLE1BQU0sR0FBRSxJQUFFQSxJQUFFLFFBQU8sRUFBRSxDQUFDO0VBQUMsVUFBUTtHQUFDLElBQUUsU0FBTyxFQUFFLE1BQUk7RUFBQztDQUFDO0NBQUMsU0FBUyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtFQUFDLElBQUksR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxJQUFFLEtBQUcsRUFBRSxPQUFLLEdBQUUsSUFBRSxFQUFFO0VBQU8sS0FBSSxJQUFFLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxLQUFJLFNBQU8sSUFBRSxFQUFFLElBQUksUUFBTSxJQUFFLE1BQUksRUFBRSxPQUFLLEVBQUUsRUFBRSxRQUFNLEdBQUUsRUFBRSxNQUFJLEdBQUUsSUFBRSxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsS0FBSSxFQUFFLE9BQUssRUFBRSxPQUFLLEVBQUUsUUFBTSxFQUFFLE9BQUssRUFBRSxFQUFFLEtBQUksTUFBSyxDQUFDLEdBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSSxFQUFFLE9BQUssR0FBRSxDQUFDLElBQUcsUUFBTSxLQUFHLFFBQU0sTUFBSSxJQUFFLEtBQUksSUFBRSxDQUFDLEVBQUUsSUFBRSxFQUFFLFNBQU8sRUFBRSxRQUFNLEVBQUUsT0FBSyxJQUFFLEVBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxHQUFFLEtBQUcsRUFBRSxRQUFNLEVBQUUsTUFBSSxTQUFPLGNBQVksT0FBTyxFQUFFLFFBQU0sS0FBSyxNQUFJLElBQUUsSUFBRSxJQUFFLE1BQUksSUFBRSxFQUFFLGNBQWEsRUFBRSxPQUFLO0VBQUksT0FBTyxFQUFFLE1BQUksR0FBRTtDQUFDO0NBQUMsU0FBUyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtFQUFDLElBQUksR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLElBQUUsRUFBRSxRQUFPLElBQUUsR0FBRSxJQUFFO0VBQUUsS0FBSSxFQUFFLE1BQUksSUFBSSxNQUFNLENBQUMsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLEtBQUksU0FBTyxJQUFFLEVBQUUsT0FBSyxhQUFXLE9BQU8sS0FBRyxjQUFZLE9BQU8sS0FBRyxZQUFVLE9BQU8sS0FBRyxZQUFVLE9BQU8sS0FBRyxZQUFVLE9BQU8sS0FBRyxFQUFFLGVBQWEsU0FBTyxJQUFFLEVBQUUsSUFBSSxLQUFHLEVBQUUsTUFBSyxHQUFFLE1BQUssTUFBSyxJQUFJLElBQUUsRUFBRSxDQUFDLElBQUUsSUFBRSxFQUFFLElBQUksS0FBRyxFQUFFLEdBQUUsRUFBQyxVQUFTLEVBQUMsR0FBRSxNQUFLLE1BQUssSUFBSSxJQUFFLEtBQUssTUFBSSxFQUFFLGVBQWEsRUFBRSxNQUFJLElBQUUsSUFBRSxFQUFFLElBQUksS0FBRyxFQUFFLEVBQUUsTUFBSyxFQUFFLE9BQU0sRUFBRSxLQUFJLEVBQUUsTUFBSSxFQUFFLE1BQUksTUFBSyxFQUFFLEdBQUcsSUFBRSxFQUFFLElBQUksS0FBRyxHQUFFLElBQUUsSUFBRSxHQUFFLEVBQUUsS0FBRyxHQUFFLEVBQUUsTUFBSSxFQUFFLE1BQUksR0FBRSxJQUFFLE1BQUssT0FBSyxJQUFFLEVBQUUsTUFBSSxFQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsT0FBSyxNQUFLLElBQUUsRUFBRSxRQUFNLEVBQUUsT0FBSyxLQUFJLFFBQU0sS0FBRyxRQUFNLEVBQUUsT0FBSyxNQUFJLE1BQUksSUFBRSxJQUFFLE1BQUksSUFBRSxLQUFHLE1BQUssY0FBWSxPQUFPLEVBQUUsU0FBTyxFQUFFLE9BQUssTUFBSSxLQUFHLE1BQUksS0FBRyxJQUFFLElBQUUsTUFBSSxLQUFHLElBQUUsSUFBRSxPQUFLLElBQUUsSUFBRSxNQUFJLEtBQUksRUFBRSxPQUFLLE9BQUssRUFBRSxJQUFJLEtBQUc7RUFBSyxJQUFHLEdBQUUsS0FBSSxJQUFFLEdBQUUsSUFBRSxHQUFFLEtBQUksU0FBTyxJQUFFLEVBQUUsT0FBSyxNQUFJLElBQUUsRUFBRSxTQUFPLEVBQUUsT0FBSyxNQUFJLElBQUUsRUFBRSxDQUFDLElBQUcsRUFBRSxHQUFFLENBQUM7RUFBRyxPQUFPO0NBQUM7Q0FBQyxTQUFTLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtFQUFDLElBQUksR0FBRTtFQUFFLElBQUcsY0FBWSxPQUFPLEVBQUUsTUFBSztHQUFDLEtBQUksSUFBRSxFQUFFLEtBQUksSUFBRSxHQUFFLEtBQUcsSUFBRSxFQUFFLFFBQU8sS0FBSSxFQUFFLE9BQUssRUFBRSxHQUFHLEtBQUcsR0FBRSxJQUFFLEVBQUUsRUFBRSxJQUFHLEdBQUUsR0FBRSxDQUFDO0dBQUcsT0FBTztFQUFDO0VBQUMsRUFBRSxPQUFLLE1BQUksTUFBSSxLQUFHLEVBQUUsUUFBTSxDQUFDLEVBQUUsZUFBYSxJQUFFLEVBQUUsQ0FBQyxJQUFHLEVBQUUsYUFBYSxFQUFFLEtBQUksS0FBRyxJQUFJLElBQUcsSUFBRSxFQUFFO0VBQUs7R0FBRyxJQUFFLEtBQUcsRUFBRTtTQUFrQixRQUFNLEtBQUcsS0FBRyxFQUFFO0VBQVUsT0FBTztDQUFDO0NBQTZHLFNBQVMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0VBQUMsSUFBSSxHQUFFLEdBQUUsR0FBRSxJQUFFLEVBQUUsS0FBSSxJQUFFLEVBQUUsTUFBSyxJQUFFLEVBQUUsSUFBRyxJQUFFLFFBQU0sS0FBRyxNQUFJLElBQUUsRUFBRTtFQUFLLElBQUcsU0FBTyxLQUFHLFFBQU0sS0FBRyxLQUFHLEtBQUcsRUFBRSxPQUFLLEtBQUcsRUFBRSxNQUFLLE9BQU87RUFBRSxJQUFHLEtBQUcsSUFBRSxJQUFFO1FBQU8sSUFBRSxJQUFFLEdBQUUsSUFBRSxJQUFFLEdBQUUsS0FBRyxLQUFHLElBQUUsRUFBRSxTQUFRLElBQUcsU0FBTyxJQUFFLEVBQUUsSUFBRSxLQUFHLElBQUUsTUFBSSxTQUFPLE1BQUksSUFBRSxFQUFFLFFBQU0sS0FBRyxFQUFFLE9BQUssS0FBRyxFQUFFLE1BQUssT0FBTztFQUFBO0VBQUUsT0FBTTtDQUFFO0NBQUMsU0FBUyxFQUFFLEdBQUUsR0FBRSxHQUFFO0VBQUMsT0FBSyxFQUFFLEtBQUcsRUFBRSxZQUFZLEdBQUUsUUFBTSxJQUFFLEtBQUcsQ0FBQyxJQUFFLEVBQUUsS0FBRyxRQUFNLElBQUUsS0FBRyxZQUFVLE9BQU8sS0FBRyxFQUFFLEtBQUssQ0FBQyxJQUFFLElBQUUsSUFBRTtDQUFJO0NBQUMsU0FBUyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtFQUFDLElBQUksR0FBRTtFQUFFLEdBQUUsSUFBRyxXQUFTLEdBQUUsSUFBRyxZQUFVLE9BQU8sR0FBRSxFQUFFLE1BQU0sVUFBUTtPQUFNO0dBQUMsSUFBRyxZQUFVLE9BQU8sTUFBSSxFQUFFLE1BQU0sVUFBUSxJQUFFLEtBQUksR0FBRSxLQUFJLEtBQUssR0FBRSxLQUFHLEtBQUssS0FBRyxFQUFFLEVBQUUsT0FBTSxHQUFFLEVBQUU7R0FBRSxJQUFHLEdBQUUsS0FBSSxLQUFLLEdBQUUsS0FBRyxFQUFFLE1BQUksRUFBRSxNQUFJLEVBQUUsRUFBRSxPQUFNLEdBQUUsRUFBRSxFQUFFO0VBQUM7T0FBTSxJQUFHLE9BQUssRUFBRSxNQUFJLE9BQUssRUFBRSxJQUFHLElBQUUsTUFBSSxJQUFFLEVBQUUsUUFBUSxHQUFFLElBQUksSUFBRyxJQUFFLEVBQUUsWUFBWSxHQUFFLElBQUUsS0FBSyxLQUFHLGdCQUFjLEtBQUcsZUFBYSxJQUFFLEVBQUUsTUFBTSxDQUFDLElBQUUsRUFBRSxNQUFNLENBQUMsR0FBRSxFQUFFLE1BQUksRUFBRSxJQUFFLENBQUMsSUFBRyxFQUFFLEVBQUUsSUFBRSxLQUFHLEdBQUUsSUFBRSxJQUFFLEVBQUUsS0FBRyxFQUFFLE1BQUksRUFBRSxLQUFHLEdBQUUsRUFBRSxpQkFBaUIsR0FBRSxJQUFFLElBQUUsR0FBRSxDQUFDLEtBQUcsRUFBRSxvQkFBb0IsR0FBRSxJQUFFLElBQUUsR0FBRSxDQUFDO09BQU07R0FBQyxJQUFHLGdDQUE4QixHQUFFLElBQUUsRUFBRSxRQUFRLGVBQWMsR0FBRyxFQUFFLFFBQVEsVUFBUyxHQUFHO1FBQU8sSUFBRyxXQUFTLEtBQUcsWUFBVSxLQUFHLFVBQVEsS0FBRyxVQUFRLEtBQUcsVUFBUSxLQUFHLGNBQVksS0FBRyxjQUFZLEtBQUcsYUFBVyxLQUFHLGFBQVcsS0FBRyxVQUFRLEtBQUcsYUFBVyxLQUFHLEtBQUssR0FBRSxJQUFHO0lBQUMsRUFBRSxLQUFHLFFBQU0sSUFBRSxLQUFHO0lBQUUsTUFBTTtHQUFDLFNBQU8sR0FBRSxDQUFDO0dBQUMsY0FBWSxPQUFPLE1BQUksUUFBTSxLQUFHLENBQUMsTUFBSSxLQUFHLE9BQUssRUFBRSxLQUFHLEVBQUUsZ0JBQWdCLENBQUMsSUFBRSxFQUFFLGFBQWEsR0FBRSxhQUFXLEtBQUcsS0FBRyxJQUFFLEtBQUcsQ0FBQztFQUFFO0NBQUM7Q0FBQyxTQUFTLEVBQUUsR0FBRTtFQUFDLE9BQU8sU0FBUyxHQUFFO0dBQUMsSUFBRyxLQUFLLEdBQUU7SUFBQyxJQUFJLElBQUUsS0FBSyxFQUFFLEVBQUUsT0FBSztJQUFHLElBQUcsUUFBTSxFQUFFLElBQUcsRUFBRSxLQUFHO1NBQVMsSUFBRyxFQUFFLEtBQUcsRUFBRSxJQUFHO0lBQU8sT0FBTyxFQUFFLEVBQUUsUUFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFFLENBQUM7R0FBQztFQUFDO0NBQUM7Q0FBQyxTQUFTLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtFQUFDLElBQUksR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsSUFBRSxFQUFFO0VBQUssSUFBRyxLQUFLLE1BQUksRUFBRSxhQUFZLE9BQU87RUFBSyxNQUFJLEVBQUUsUUFBTSxJQUFFLENBQUMsRUFBRSxLQUFHLEVBQUUsTUFBSyxJQUFFLENBQUMsSUFBRSxFQUFFLE1BQUksRUFBRSxHQUFHLEtBQUksSUFBRSxFQUFFLFFBQU0sRUFBRSxDQUFDO0VBQUUsR0FBRSxJQUFHLGNBQVksT0FBTyxHQUFFLElBQUc7R0FBQyxJQUFHLElBQUUsRUFBRSxPQUFNLElBQUUsRUFBRSxhQUFXLEVBQUUsVUFBVSxRQUFPLEtBQUcsSUFBRSxFQUFFLGdCQUFjLEVBQUUsRUFBRSxNQUFLLElBQUUsSUFBRSxJQUFFLEVBQUUsTUFBTSxRQUFNLEVBQUUsS0FBRyxHQUFFLEVBQUUsTUFBSSxJQUFFLENBQUMsSUFBRSxFQUFFLE1BQUksRUFBRSxLQUFLLEtBQUcsRUFBRSxPQUFLLElBQUUsRUFBRSxNQUFJLElBQUUsSUFBSSxFQUFFLEdBQUUsQ0FBQyxLQUFHLEVBQUUsTUFBSSxJQUFFLElBQUksRUFBRSxHQUFFLENBQUMsR0FBRSxFQUFFLGNBQVksR0FBRSxFQUFFLFNBQU8sSUFBRyxLQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUUsRUFBRSxVQUFRLEVBQUUsUUFBTSxDQUFDLElBQUcsRUFBRSxNQUFJLEdBQUUsSUFBRSxFQUFFLE1BQUksQ0FBQyxHQUFFLEVBQUUsTUFBSSxDQUFDLEdBQUUsRUFBRSxNQUFJLENBQUMsSUFBRyxLQUFHLFFBQU0sRUFBRSxRQUFNLEVBQUUsTUFBSSxFQUFFLFFBQU8sS0FBRyxRQUFNLEVBQUUsNkJBQTJCLEVBQUUsT0FBSyxFQUFFLFVBQVEsRUFBRSxNQUFJLEVBQUUsQ0FBQyxHQUFFLEVBQUUsR0FBRyxJQUFHLEVBQUUsRUFBRSxLQUFJLEVBQUUseUJBQXlCLEdBQUUsRUFBRSxHQUFHLENBQUMsSUFBRyxJQUFFLEVBQUUsT0FBTSxJQUFFLEVBQUUsT0FBTSxFQUFFLE1BQUksR0FBRSxHQUFFLEtBQUcsUUFBTSxFQUFFLDRCQUEwQixRQUFNLEVBQUUsc0JBQW9CLEVBQUUsbUJBQW1CLEdBQUUsS0FBRyxRQUFNLEVBQUUscUJBQW1CLEVBQUUsSUFBSSxLQUFLLEVBQUUsaUJBQWlCO1FBQU07SUFBQyxJQUFHLEtBQUcsUUFBTSxFQUFFLDRCQUEwQixNQUFJLEtBQUcsUUFBTSxFQUFFLDZCQUEyQixFQUFFLDBCQUEwQixHQUFFLENBQUMsR0FBRSxFQUFFLE9BQUssRUFBRSxPQUFLLENBQUMsRUFBRSxPQUFLLFFBQU0sRUFBRSx5QkFBdUIsQ0FBQyxNQUFJLEVBQUUsc0JBQXNCLEdBQUUsRUFBRSxLQUFJLENBQUMsR0FBRTtLQUFDLEVBQUUsT0FBSyxFQUFFLFFBQU0sRUFBRSxRQUFNLEdBQUUsRUFBRSxRQUFNLEVBQUUsS0FBSSxFQUFFLE1BQUksQ0FBQyxJQUFHLEVBQUUsTUFBSSxFQUFFLEtBQUksRUFBRSxNQUFJLEVBQUUsS0FBSSxFQUFFLElBQUksS0FBSyxTQUFTLEdBQUU7TUFBQyxNQUFJLEVBQUUsS0FBRztLQUFFLENBQUMsR0FBRSxFQUFFLEtBQUssTUFBTSxFQUFFLEtBQUksRUFBRSxHQUFHLEdBQUUsRUFBRSxNQUFJLENBQUMsR0FBRSxFQUFFLElBQUksVUFBUSxFQUFFLEtBQUssQ0FBQztLQUFFLE1BQU07SUFBQztJQUFDLFFBQU0sRUFBRSx1QkFBcUIsRUFBRSxvQkFBb0IsR0FBRSxFQUFFLEtBQUksQ0FBQyxHQUFFLEtBQUcsUUFBTSxFQUFFLHNCQUFvQixFQUFFLElBQUksS0FBSyxXQUFVO0tBQUMsRUFBRSxtQkFBbUIsR0FBRSxHQUFFLENBQUM7SUFBQyxDQUFDO0dBQUM7R0FBQyxJQUFHLEVBQUUsVUFBUSxHQUFFLEVBQUUsUUFBTSxHQUFFLEVBQUUsTUFBSSxHQUFFLEVBQUUsTUFBSSxDQUFDLEdBQUUsSUFBRSxFQUFFLEtBQUksSUFBRSxHQUFFLEdBQUUsRUFBRSxRQUFNLEVBQUUsS0FBSSxFQUFFLE1BQUksQ0FBQyxHQUFFLEtBQUcsRUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFNLEVBQUUsT0FBTSxFQUFFLE9BQU8sR0FBRSxFQUFFLEtBQUssTUFBTSxFQUFFLEtBQUksRUFBRSxHQUFHLEdBQUUsRUFBRSxNQUFJLENBQUM7UUFBTztJQUFHLEVBQUUsTUFBSSxDQUFDLEdBQUUsS0FBRyxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU0sRUFBRSxPQUFNLEVBQUUsT0FBTyxHQUFFLEVBQUUsUUFBTSxFQUFFO1VBQVUsRUFBRSxPQUFLLEVBQUUsSUFBRTtHQUFJLEVBQUUsUUFBTSxFQUFFLEtBQUksUUFBTSxFQUFFLG9CQUFrQixJQUFFLEVBQUUsRUFBRSxDQUFDLEdBQUUsQ0FBQyxHQUFFLEVBQUUsZ0JBQWdCLENBQUMsSUFBRyxLQUFHLENBQUMsS0FBRyxRQUFNLEVBQUUsNEJBQTBCLElBQUUsRUFBRSx3QkFBd0IsR0FBRSxDQUFDLElBQUcsSUFBRSxRQUFNLEtBQUcsRUFBRSxTQUFPLEtBQUcsUUFBTSxFQUFFLE1BQUksRUFBRSxFQUFFLE1BQU0sUUFBUSxJQUFFLEdBQUUsSUFBRSxFQUFFLEdBQUUsRUFBRSxDQUFDLElBQUUsSUFBRSxDQUFDLENBQUMsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxHQUFFLEVBQUUsT0FBSyxFQUFFLEtBQUksRUFBRSxPQUFLLE1BQUssRUFBRSxJQUFJLFVBQVEsRUFBRSxLQUFLLENBQUMsR0FBRSxNQUFJLEVBQUUsTUFBSSxFQUFFLEtBQUc7RUFBSyxTQUFPLEdBQUU7R0FBQyxJQUFHLEVBQUUsTUFBSSxNQUFLLEtBQUcsUUFBTSxHQUFFLElBQUcsRUFBRSxNQUFLO0lBQUMsS0FBSSxFQUFFLE9BQUssSUFBRSxNQUFJLEtBQUksS0FBRyxLQUFHLEVBQUUsWUFBVSxFQUFFLGNBQWEsSUFBRSxFQUFFO0lBQVksRUFBRSxFQUFFLFFBQVEsQ0FBQyxLQUFHLE1BQUssRUFBRSxNQUFJO0dBQUMsT0FBSztJQUFDLEtBQUksSUFBRSxFQUFFLFFBQU8sTUFBSyxFQUFFLEVBQUUsRUFBRTtJQUFFLEVBQUUsQ0FBQztHQUFDO1FBQU0sRUFBRSxNQUFJLEVBQUUsS0FBSSxFQUFFLE1BQUksRUFBRSxLQUFJLEVBQUUsUUFBTSxFQUFFLENBQUM7R0FBRSxFQUFFLElBQUksR0FBRSxHQUFFLENBQUM7RUFBQztPQUFNLFFBQU0sS0FBRyxFQUFFLE9BQUssRUFBRSxPQUFLLEVBQUUsTUFBSSxFQUFFLEtBQUksRUFBRSxNQUFJLEVBQUUsT0FBSyxJQUFFLEVBQUUsTUFBSSxFQUFFLEVBQUUsS0FBSSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7RUFBRSxRQUFPLElBQUUsRUFBRSxXQUFTLEVBQUUsQ0FBQyxHQUFFLE1BQUksRUFBRSxNQUFJLEtBQUssSUFBRTtDQUFDO0NBQUMsU0FBUyxFQUFFLEdBQUU7RUFBQyxNQUFJLEVBQUUsUUFBTSxFQUFFLElBQUksTUFBSSxDQUFDLElBQUcsRUFBRSxPQUFLLEVBQUUsSUFBSSxLQUFLLENBQUM7Q0FBRTtDQUFDLFNBQVMsRUFBRSxHQUFFLEdBQUUsR0FBRTtFQUFDLEtBQUksSUFBSSxJQUFFLEdBQUUsSUFBRSxFQUFFLFFBQU8sS0FBSSxFQUFFLEVBQUUsSUFBRyxFQUFFLEVBQUUsSUFBRyxFQUFFLEVBQUUsRUFBRTtFQUFFLEVBQUUsT0FBSyxFQUFFLElBQUksR0FBRSxDQUFDLEdBQUUsRUFBRSxLQUFLLFNBQVMsR0FBRTtHQUFDLElBQUc7SUFBQyxJQUFFLEVBQUUsS0FBSSxFQUFFLE1BQUksQ0FBQyxHQUFFLEVBQUUsS0FBSyxTQUFTLEdBQUU7S0FBQyxFQUFFLEtBQUssQ0FBQztJQUFDLENBQUM7R0FBQyxTQUFPLEdBQUU7SUFBQyxFQUFFLElBQUksR0FBRSxFQUFFLEdBQUc7R0FBQztFQUFDLENBQUM7Q0FBQztDQUFDLFNBQVMsRUFBRSxHQUFFO0VBQUMsT0FBTSxZQUFVLE9BQU8sS0FB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RSxJQUFFLFdBQVUsUUFBTSxLQUFHLEtBQUcsRUFBRSxNQUFJLEVBQUUsR0FBRSxHQUFFLEdBQUUsRUFBRSxJQUFHLENBQUM7RUFBRTtFQUFDLE9BQU87Q0FBQztDQUFDLFNBQVMsRUFBRSxHQUFFLEdBQUUsR0FBRTtFQUFDLElBQUc7R0FBQyxJQUFHLGNBQVksT0FBTyxHQUFFO0lBQUMsSUFBSSxJQUFFLGNBQVksT0FBTyxFQUFFO0lBQUksS0FBRyxFQUFFLElBQUksR0FBRSxLQUFHLFFBQU0sTUFBSSxFQUFFLE1BQUksRUFBRSxDQUFDO0dBQUUsT0FBTSxFQUFFLFVBQVE7RUFBQyxTQUFPLEdBQUU7R0FBQyxFQUFFLElBQUksR0FBRSxDQUFDO0VBQUM7Q0FBQztDQUFDLFNBQVMsRUFBRSxHQUFFLEdBQUUsR0FBRTtFQUFDLElBQUksR0FBRTtFQUFFLElBQUcsRUFBRSxXQUFTLEVBQUUsUUFBUSxDQUFDLElBQUcsSUFBRSxFQUFFLFNBQU8sRUFBRSxXQUFTLEVBQUUsV0FBUyxFQUFFLE9BQUssRUFBRSxHQUFFLE1BQUssQ0FBQyxJQUFHLFNBQU8sSUFBRSxFQUFFLE1BQUs7R0FBQyxJQUFHLEVBQUUsc0JBQXFCLElBQUc7SUFBQyxFQUFFLHFCQUFxQjtHQUFDLFNBQU8sR0FBRTtJQUFDLEVBQUUsSUFBSSxHQUFFLENBQUM7R0FBQztHQUFDLEVBQUUsT0FBSyxFQUFFLE1BQUk7RUFBSTtFQUFDLElBQUcsSUFBRSxFQUFFLEtBQUksS0FBSSxJQUFFLEdBQUUsSUFBRSxFQUFFLFFBQU8sS0FBSSxFQUFFLE1BQUksRUFBRSxFQUFFLElBQUcsR0FBRSxLQUFHLGNBQVksT0FBTyxFQUFFLElBQUk7RUFBRSxLQUFHLEVBQUUsRUFBRSxHQUFHLEdBQUUsRUFBRSxNQUFJLEVBQUUsS0FBRyxFQUFFLE1BQUksS0FBSztDQUFDO0NBQUMsU0FBUyxFQUFFLEdBQUUsR0FBRSxHQUFFO0VBQUMsT0FBTyxLQUFLLFlBQVksR0FBRSxDQUFDO0NBQUM7Q0FBQyxTQUFTLEVBQUUsR0FBRSxHQUFFLEdBQUU7RUFBQyxJQUFJ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