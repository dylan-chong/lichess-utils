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
	//#region src/dom/dom.ts
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
	//#region src/browser/speechApi.ts
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
	//#region src/browser/speechSynthesizer.ts
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
	//#region src/settings/storage.ts
	/**
	* Wrapper module for localStorage to allow mocking with simone
	*/ function getItem(key) {
		return localStorage.getItem(key);
	}
	function setItem(key, value) {
		localStorage.setItem(key, value);
	}
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
	//#region src/dom/overlays/dividers.ts
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
	//#region src/dom/overlays/flash.ts
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGljaGVzcy1ib2FyZC1zcGVha2VyLnVzZXIuanMiLCJuYW1lcyI6WyJpIiwidCIsInMiLCJjIiwiaCIsInciLCJyIiwibyIsImYiLCJ2IiwidSIsImUiLCJkIiwiYSIsImwiLCJqIiwieSIsIl8iLCJiIiwicCIsIlMiLCJtIiwieCIsIkUiLCJ1IiwiaSIsIm8iLCJmIiwibCIsInIiXSwic291cmNlcyI6WyJub2RlX21vZHVsZXMvQHByZWFjdC9zaWduYWxzLWNvcmUvZGlzdC9zaWduYWxzLWNvcmUubW9kdWxlLmpzIiwic3JjL2NvbnN0YW50cy9jaGVzcy50cyIsInNyYy9jb25zdGFudHMvY29tbWFuZHMudHMiLCJzcmMvY29uc3RhbnRzL2RvbS50cyIsInNyYy9kb20vZG9tLnRzIiwic3JjL2Jyb3dzZXIvc3BlZWNoQXBpLnRzIiwic3JjL2Jyb3dzZXIvc3BlZWNoU3ludGhlc2l6ZXIudHMiLCJzcmMvcHVyZS9jb29yZGluYXRlcy50cyIsInNyYy9kb20vYm9hcmRSZWFkZXIudHMiLCJzcmMvcHVyZS9waWVjZUdyb3VwaW5nLnRzIiwic3JjL3B1cmUvc3BlZWNoVGV4dC50cyIsInNyYy9zZXR0aW5ncy9kZWZhdWx0cy50cyIsInNyYy9zZXR0aW5ncy9zdG9yYWdlLnRzIiwic3JjL3NldHRpbmdzL3NldHRpbmdzU3RvcmUudHMiLCJzcmMvaGFuZGxlcnMvaGFuZGxlU3BlZWNoQ29tbWFuZC50cyIsInNyYy9jb21tYW5kcy9rZXlib2FyZElucHV0LnRzIiwibm9kZV9tb2R1bGVzL3ByZWFjdC9kaXN0L3ByZWFjdC5tb2R1bGUuanMiLCJub2RlX21vZHVsZXMvcHJlYWN0L2pzeC1ydW50aW1lL2Rpc3QvanN4UnVudGltZS5tb2R1bGUuanMiLCJzcmMvY29tcG9uZW50cy9CdXR0b25Sb3cudHN4Iiwic3JjL2NvbXBvbmVudHMvU2V0dGluZ0J1dHRvbi50c3giLCJzcmMvY29tcG9uZW50cy9Db250cm9sUGFuZWwudHN4Iiwic3JjL2NvbXBvbmVudHMvcm9vdC50c3giLCJzcmMvZG9tL2JvYXJkT2JzZXJ2ZXIudHMiLCJzcmMvZG9tL292ZXJsYXlzL2RpdmlkZXJzLnRzIiwic3JjL2RvbS9vdmVybGF5cy9mbGFzaC50cyIsInNyYy9oYW5kbGVycy91cGRhdGVEaXZpZGVycy50cyIsInNyYy9lZmZlY3RzL29uRGl2aWRlcnMudHMiLCJzcmMvaW5pdC50c3giLCJzcmMvbWFpbi50c3giXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGk9U3ltYm9sLmZvcihcInByZWFjdC1zaWduYWxzXCIpO2Z1bmN0aW9uIHQoKXtpZighKHM+MSkpe3ZhciBpLHQ9ITE7IWZ1bmN0aW9uKCl7dmFyIGk9YztjPXZvaWQgMDt3aGlsZSh2b2lkIDAhPT1pKXtpZihpLlMudj09PWkudilpLlMuaT1pLmk7aT1pLm99fSgpO3doaWxlKHZvaWQgMCE9PWgpe3ZhciBuPWg7aD12b2lkIDA7disrO3doaWxlKHZvaWQgMCE9PW4pe3ZhciByPW4udTtuLnU9dm9pZCAwO24uZiY9LTM7aWYoISg4Jm4uZikmJncobikpdHJ5e24uYygpfWNhdGNoKG4pe2lmKCF0KXtpPW47dD0hMH19bj1yfX12PTA7cy0tO2lmKHQpdGhyb3cgaX1lbHNlIHMtLX1mdW5jdGlvbiBuKGkpe2lmKHM+MClyZXR1cm4gaSgpO2U9Kyt1O3MrKzt0cnl7cmV0dXJuIGkoKX1maW5hbGx5e3QoKX19dmFyIHI9dm9pZCAwO2Z1bmN0aW9uIG8oaSl7dmFyIHQ9cjtyPXZvaWQgMDt0cnl7cmV0dXJuIGkoKX1maW5hbGx5e3I9dH19dmFyIGYsaD12b2lkIDAscz0wLHY9MCx1PTAsZT0wLGM9dm9pZCAwLGQ9MDtmdW5jdGlvbiBhKGkpe2lmKHZvaWQgMCE9PXIpe3ZhciB0PWkubjtpZih2b2lkIDA9PT10fHx0LnQhPT1yKXt0PXtpOjAsUzppLHA6ci5zLG46dm9pZCAwLHQ6cixlOnZvaWQgMCx4OnZvaWQgMCxyOnR9O2lmKHZvaWQgMCE9PXIucylyLnMubj10O3Iucz10O2kubj10O2lmKDMyJnIuZilpLlModCk7cmV0dXJuIHR9ZWxzZSBpZigtMT09PXQuaSl7dC5pPTA7aWYodm9pZCAwIT09dC5uKXt0Lm4ucD10LnA7aWYodm9pZCAwIT09dC5wKXQucC5uPXQubjt0LnA9ci5zO3Qubj12b2lkIDA7ci5zLm49dDtyLnM9dH1yZXR1cm4gdH19fWZ1bmN0aW9uIGwoaSx0KXt0aGlzLnY9aTt0aGlzLmk9MDt0aGlzLm49dm9pZCAwO3RoaXMudD12b2lkIDA7dGhpcy5sPTA7dGhpcy5XPW51bGw9PXQ/dm9pZCAwOnQud2F0Y2hlZDt0aGlzLlo9bnVsbD09dD92b2lkIDA6dC51bndhdGNoZWQ7dGhpcy5uYW1lPW51bGw9PXQ/dm9pZCAwOnQubmFtZX1sLnByb3RvdHlwZS5icmFuZD1pO2wucHJvdG90eXBlLmg9ZnVuY3Rpb24oKXtyZXR1cm4hMH07bC5wcm90b3R5cGUuUz1mdW5jdGlvbihpKXt2YXIgdD10aGlzLG49dGhpcy50O2lmKG4hPT1pJiZ2b2lkIDA9PT1pLmUpe2kueD1uO3RoaXMudD1pO2lmKHZvaWQgMCE9PW4pbi5lPWk7ZWxzZSBvKGZ1bmN0aW9uKCl7dmFyIGk7bnVsbD09KGk9dC5XKXx8aS5jYWxsKHQpfSl9fTtsLnByb3RvdHlwZS5VPWZ1bmN0aW9uKGkpe3ZhciB0PXRoaXM7aWYodm9pZCAwIT09dGhpcy50KXt2YXIgbj1pLmUscj1pLng7aWYodm9pZCAwIT09bil7bi54PXI7aS5lPXZvaWQgMH1pZih2b2lkIDAhPT1yKXtyLmU9bjtpLng9dm9pZCAwfWlmKGk9PT10aGlzLnQpe3RoaXMudD1yO2lmKHZvaWQgMD09PXIpbyhmdW5jdGlvbigpe3ZhciBpO251bGw9PShpPXQuWil8fGkuY2FsbCh0KX0pfX19O2wucHJvdG90eXBlLnN1YnNjcmliZT1mdW5jdGlvbihpKXt2YXIgdD10aGlzO3JldHVybiBqKGZ1bmN0aW9uKCl7dmFyIG49dC52YWx1ZSxvPXI7cj12b2lkIDA7dHJ5e2kobil9ZmluYWxseXtyPW99fSx7bmFtZTpcInN1YlwifSl9O2wucHJvdG90eXBlLnZhbHVlT2Y9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy52YWx1ZX07bC5wcm90b3R5cGUudG9TdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy52YWx1ZStcIlwifTtsLnByb3RvdHlwZS50b0pTT049ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy52YWx1ZX07bC5wcm90b3R5cGUucGVlaz1mdW5jdGlvbigpe3ZhciBpPXRoaXM7cmV0dXJuIG8oZnVuY3Rpb24oKXtyZXR1cm4gaS52YWx1ZX0pfTtPYmplY3QuZGVmaW5lUHJvcGVydHkobC5wcm90b3R5cGUsXCJ2YWx1ZVwiLHtnZXQ6ZnVuY3Rpb24oKXt2YXIgaT1hKHRoaXMpO2lmKHZvaWQgMCE9PWkpaS5pPXRoaXMuaTtyZXR1cm4gdGhpcy52fSxzZXQ6ZnVuY3Rpb24oaSl7aWYoaSE9PXRoaXMudil7aWYodj4xMDApdGhyb3cgbmV3IEVycm9yKFwiQ3ljbGUgZGV0ZWN0ZWRcIik7IWZ1bmN0aW9uKGkpe2lmKDAhPT1zJiYwPT09dilpZihpLmwhPT1lKXtpLmw9ZTtjPXtTOmksdjppLnYsaTppLmksbzpjfX19KHRoaXMpO3RoaXMudj1pO3RoaXMuaSsrO2QrKztzKys7dHJ5e2Zvcih2YXIgbj10aGlzLnQ7dm9pZCAwIT09bjtuPW4ueCluLnQuTigpfWZpbmFsbHl7dCgpfX19fSk7ZnVuY3Rpb24geShpLHQpe3JldHVybiBuZXcgbChpLHQpfWZ1bmN0aW9uIHcoaSl7Zm9yKHZhciB0PWkuczt2b2lkIDAhPT10O3Q9dC5uKWlmKHQuUy5pIT09dC5pfHwhdC5TLmgoKXx8dC5TLmkhPT10LmkpcmV0dXJuITA7cmV0dXJuITF9ZnVuY3Rpb24gXyhpKXtmb3IodmFyIHQ9aS5zO3ZvaWQgMCE9PXQ7dD10Lm4pe3ZhciBuPXQuUy5uO2lmKHZvaWQgMCE9PW4pdC5yPW47dC5TLm49dDt0Lmk9LTE7aWYodm9pZCAwPT09dC5uKXtpLnM9dDticmVha319fWZ1bmN0aW9uIGIoaSl7dmFyIHQ9aS5zLG49dm9pZCAwO3doaWxlKHZvaWQgMCE9PXQpe3ZhciByPXQucDtpZigtMT09PXQuaSl7dC5TLlUodCk7aWYodm9pZCAwIT09cilyLm49dC5uO2lmKHZvaWQgMCE9PXQubil0Lm4ucD1yfWVsc2Ugbj10O3QuUy5uPXQucjtpZih2b2lkIDAhPT10LnIpdC5yPXZvaWQgMDt0PXJ9aS5zPW59ZnVuY3Rpb24gcChpLHQpe2wuY2FsbCh0aGlzLHZvaWQgMCk7dGhpcy54PWk7dGhpcy5zPXZvaWQgMDt0aGlzLmc9ZC0xO3RoaXMuZj00O3RoaXMuVz1udWxsPT10P3ZvaWQgMDp0LndhdGNoZWQ7dGhpcy5aPW51bGw9PXQ/dm9pZCAwOnQudW53YXRjaGVkO3RoaXMubmFtZT1udWxsPT10P3ZvaWQgMDp0Lm5hbWV9cC5wcm90b3R5cGU9bmV3IGw7cC5wcm90b3R5cGUuaD1mdW5jdGlvbigpe3RoaXMuZiY9LTM7aWYoMSZ0aGlzLmYpcmV0dXJuITE7aWYoMzI9PSgzNiZ0aGlzLmYpKXJldHVybiEwO3RoaXMuZiY9LTU7aWYodGhpcy5nPT09ZClyZXR1cm4hMDt0aGlzLmc9ZDt0aGlzLmZ8PTE7aWYodGhpcy5pPjAmJiF3KHRoaXMpKXt0aGlzLmYmPS0yO3JldHVybiEwfXZhciBpPXI7dHJ5e18odGhpcyk7cj10aGlzO3ZhciB0PXRoaXMueCgpO2lmKDE2JnRoaXMuZnx8dGhpcy52IT09dHx8MD09PXRoaXMuaSl7dGhpcy52PXQ7dGhpcy5mJj0tMTc7dGhpcy5pKyt9fWNhdGNoKGkpe3RoaXMudj1pO3RoaXMuZnw9MTY7dGhpcy5pKyt9cj1pO2IodGhpcyk7dGhpcy5mJj0tMjtyZXR1cm4hMH07cC5wcm90b3R5cGUuUz1mdW5jdGlvbihpKXtpZih2b2lkIDA9PT10aGlzLnQpe3RoaXMuZnw9MzY7Zm9yKHZhciB0PXRoaXMuczt2b2lkIDAhPT10O3Q9dC5uKXQuUy5TKHQpfWwucHJvdG90eXBlLlMuY2FsbCh0aGlzLGkpfTtwLnByb3RvdHlwZS5VPWZ1bmN0aW9uKGkpe2lmKHZvaWQgMCE9PXRoaXMudCl7bC5wcm90b3R5cGUuVS5jYWxsKHRoaXMsaSk7aWYodm9pZCAwPT09dGhpcy50KXt0aGlzLmYmPS0zMztmb3IodmFyIHQ9dGhpcy5zO3ZvaWQgMCE9PXQ7dD10Lm4pdC5TLlUodCl9fX07cC5wcm90b3R5cGUuTj1mdW5jdGlvbigpe2lmKCEoMiZ0aGlzLmYpKXt0aGlzLmZ8PTY7Zm9yKHZhciBpPXRoaXMudDt2b2lkIDAhPT1pO2k9aS54KWkudC5OKCl9fTtPYmplY3QuZGVmaW5lUHJvcGVydHkocC5wcm90b3R5cGUsXCJ2YWx1ZVwiLHtnZXQ6ZnVuY3Rpb24oKXtpZigxJnRoaXMuZil0aHJvdyBuZXcgRXJyb3IoXCJDeWNsZSBkZXRlY3RlZFwiKTt2YXIgaT1hKHRoaXMpO3RoaXMuaCgpO2lmKHZvaWQgMCE9PWkpaS5pPXRoaXMuaTtpZigxNiZ0aGlzLmYpdGhyb3cgdGhpcy52O3JldHVybiB0aGlzLnZ9fSk7ZnVuY3Rpb24gZyhpLHQpe3JldHVybiBuZXcgcChpLHQpfWZ1bmN0aW9uIFMoaSl7dmFyIG49aS5tO2kubT12b2lkIDA7aWYoXCJmdW5jdGlvblwiPT10eXBlb2Ygbil7cysrO3ZhciBvPXI7cj12b2lkIDA7dHJ5e24oKX1jYXRjaCh0KXtpLmYmPS0yO2kuZnw9ODttKGkpO3Rocm93IHR9ZmluYWxseXtyPW87dCgpfX19ZnVuY3Rpb24gbShpKXtmb3IodmFyIHQ9aS5zO3ZvaWQgMCE9PXQ7dD10Lm4pdC5TLlUodCk7aS54PXZvaWQgMDtpLnM9dm9pZCAwO1MoaSl9ZnVuY3Rpb24geChpKXtpZihyIT09dGhpcyl0aHJvdyBuZXcgRXJyb3IoXCJPdXQtb2Ytb3JkZXIgZWZmZWN0XCIpO2IodGhpcyk7cj1pO3RoaXMuZiY9LTI7aWYoOCZ0aGlzLmYpbSh0aGlzKTt0KCl9ZnVuY3Rpb24gRShpLHQpe3RoaXMueD1pO3RoaXMubT12b2lkIDA7dGhpcy5zPXZvaWQgMDt0aGlzLnU9dm9pZCAwO3RoaXMuZj0zMjt0aGlzLm5hbWU9bnVsbD09dD92b2lkIDA6dC5uYW1lO2lmKGYpZi5wdXNoKHRoaXMpfUUucHJvdG90eXBlLmM9ZnVuY3Rpb24oKXt2YXIgaT10aGlzLlMoKTt0cnl7aWYoOCZ0aGlzLmYpcmV0dXJuO2lmKHZvaWQgMD09PXRoaXMueClyZXR1cm47dmFyIHQ9dGhpcy54KCk7aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgdCl0aGlzLm09dH1maW5hbGx5e2koKX19O0UucHJvdG90eXBlLlM9ZnVuY3Rpb24oKXtpZigxJnRoaXMuZil0aHJvdyBuZXcgRXJyb3IoXCJDeWNsZSBkZXRlY3RlZFwiKTt0aGlzLmZ8PTE7dGhpcy5mJj0tOTtTKHRoaXMpO18odGhpcyk7cysrO3ZhciBpPXI7cj10aGlzO3JldHVybiB4LmJpbmQodGhpcyxpKX07RS5wcm90b3R5cGUuTj1mdW5jdGlvbigpe2lmKCEoMiZ0aGlzLmYpKXt0aGlzLmZ8PTI7dGhpcy51PWg7aD10aGlzfX07RS5wcm90b3R5cGUuZD1mdW5jdGlvbigpe3RoaXMuZnw9ODtpZighKDEmdGhpcy5mKSltKHRoaXMpfTtFLnByb3RvdHlwZS5kaXNwb3NlPWZ1bmN0aW9uKCl7dGhpcy5kKCl9O2Z1bmN0aW9uIGooaSx0KXt2YXIgbj1uZXcgRShpLHQpO3RyeXtuLmMoKX1jYXRjaChpKXtuLmQoKTt0aHJvdyBpfXZhciByPW4uZC5iaW5kKG4pO3JbU3ltYm9sLmRpc3Bvc2VdPXI7cmV0dXJuIHJ9ZnVuY3Rpb24gQyhpKXtyZXR1cm4gZnVuY3Rpb24oKXt2YXIgdD1hcmd1bWVudHMscj10aGlzO3JldHVybiBuKGZ1bmN0aW9uKCl7cmV0dXJuIG8oZnVuY3Rpb24oKXtyZXR1cm4gaS5hcHBseShyLFtdLnNsaWNlLmNhbGwodCkpfSl9KX19ZnVuY3Rpb24gTygpe3ZhciBpPWY7Zj1bXTtyZXR1cm4gZnVuY3Rpb24oKXt2YXIgdD1mO2lmKGYmJmkpaT1pLmNvbmNhdChmKTtmPWk7cmV0dXJuIHR9fXZhciBrPWZ1bmN0aW9uKGkpe2Zvcih2YXIgdCBpbiBpKXt2YXIgbj1pW3RdO2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIG4paVt0XT1DKG4pO2Vsc2UgaWYoXCJvYmplY3RcIj09dHlwZW9mIG4mJm51bGwhPT1uJiYhKFwiYnJhbmRcImluIG4pKWsobil9fTtmdW5jdGlvbiBUKGkpe3JldHVybiBmdW5jdGlvbigpe3ZhciB0LG4scj1PKCk7dHJ5e249aS5hcHBseSh2b2lkIDAsW10uc2xpY2UuY2FsbChhcmd1bWVudHMpKX1jYXRjaChpKXtmPXZvaWQgMDt0aHJvdyBpfWZpbmFsbHl7dD1yKCl9ayhuKTtuW1N5bWJvbC5kaXNwb3NlXT1DKGZ1bmN0aW9uKCl7aWYodClmb3IodmFyIGk9MDtpPHQubGVuZ3RoO2krKyl0W2ldLmRpc3Bvc2UoKTt0PXZvaWQgMH0pO3JldHVybiBufX1leHBvcnR7cCBhcyBDb21wdXRlZCxFIGFzIEVmZmVjdCxsIGFzIFNpZ25hbCxDIGFzIGFjdGlvbixuIGFzIGJhdGNoLGcgYXMgY29tcHV0ZWQsVCBhcyBjcmVhdGVNb2RlbCxqIGFzIGVmZmVjdCx5IGFzIHNpZ25hbCxvIGFzIHVudHJhY2tlZH07Ly8jIHNvdXJjZU1hcHBpbmdVUkw9c2lnbmFscy1jb3JlLm1vZHVsZS5qcy5tYXBcbiIsImV4cG9ydCBlbnVtIFBsYXllckNvbG9yIHtcbiAgV0hJVEUgPSAnd2hpdGUnLFxuICBCTEFDSyA9ICdibGFjaycsXG59XG5cbmV4cG9ydCBlbnVtIFBpZWNlVHlwZSB7XG4gIFBBV04gPSAncGF3bicsXG4gIEtOSUdIVCA9ICdrbmlnaHQnLFxuICBCSVNIT1AgPSAnYmlzaG9wJyxcbiAgUk9PSyA9ICdyb29rJyxcbiAgUVVFRU4gPSAncXVlZW4nLFxuICBLSU5HID0gJ2tpbmcnLFxufVxuXG5leHBvcnQgZW51bSBRdWFkcmFudCB7XG4gIFdISVRFX0tJTkcgPSAnd2snLFxuICBXSElURV9RVUVFTiA9ICd3cScsXG4gIEJMQUNLX0tJTkcgPSAnYmsnLFxuICBCTEFDS19RVUVFTiA9ICdicScsXG59XG5cbi8vIEhlbHBlciBhcnJheXMgZm9yIGl0ZXJhdGlvblxuZXhwb3J0IGNvbnN0IFBMQVlFUl9DT0xPUl9WQUxVRVMgPSBPYmplY3QudmFsdWVzKFBsYXllckNvbG9yKVxuZXhwb3J0IGNvbnN0IFBJRUNFX1RZUEVfVkFMVUVTID0gT2JqZWN0LnZhbHVlcyhQaWVjZVR5cGUpXG5leHBvcnQgY29uc3QgUVVBRFJBTlRfVkFMVUVTID0gT2JqZWN0LnZhbHVlcyhRdWFkcmFudClcbiIsImV4cG9ydCBlbnVtIEtleWJvYXJkQ29tbWFuZCB7XG4gIFBXSyA9ICdwd2snLFxuICBQV1EgPSAncHdxJyxcbiAgUEJLID0gJ3BiaycsXG4gIFBCUSA9ICdwYnEnLFxuICBQQSA9ICdwYScsXG4gIFBXVyA9ICdwd3cnLFxuICBQQkIgPSAncGJiJyxcbiAgUFNTID0gJ3BzcycsXG59XG5cbmV4cG9ydCBlbnVtIFNwZWVjaENvbW1hbmQge1xuICBBTEwgPSAnYWxsJyxcbiAgV0hJVEUgPSAnd2hpdGUnLFxuICBCTEFDSyA9ICdibGFjaycsXG4gIFNUT1AgPSAnc3RvcCcsXG4gIFdLID0gJ3drJyxcbiAgV1EgPSAnd3EnLFxuICBCSyA9ICdiaycsXG4gIEJRID0gJ2JxJyxcbn1cblxuLy8gS2V5Ym9hcmQgdG8gc3BlZWNoIGNvbW1hbmQgbWFwcGluZ1xuZXhwb3J0IGNvbnN0IEtFWUJPQVJEX0NPTU1BTkRfTUFQID0gbmV3IE1hcChbXG4gIFtLZXlib2FyZENvbW1hbmQuUFdLLCBTcGVlY2hDb21tYW5kLldLXSxcbiAgW0tleWJvYXJkQ29tbWFuZC5QV1EsIFNwZWVjaENvbW1hbmQuV1FdLFxuICBbS2V5Ym9hcmRDb21tYW5kLlBCSywgU3BlZWNoQ29tbWFuZC5CS10sXG4gIFtLZXlib2FyZENvbW1hbmQuUEJRLCBTcGVlY2hDb21tYW5kLkJRXSxcbiAgW0tleWJvYXJkQ29tbWFuZC5QQSwgU3BlZWNoQ29tbWFuZC5BTExdLFxuICBbS2V5Ym9hcmRDb21tYW5kLlBXVywgU3BlZWNoQ29tbWFuZC5XSElURV0sXG4gIFtLZXlib2FyZENvbW1hbmQuUEJCLCBTcGVlY2hDb21tYW5kLkJMQUNLXSxcbiAgW0tleWJvYXJkQ29tbWFuZC5QU1MsIFNwZWVjaENvbW1hbmQuU1RPUF0sXG5dIGFzIGNvbnN0KVxuIiwiLy8gRE9NIHNlbGVjdG9ycyBlbnVtXG5leHBvcnQgZW51bSBEb21TZWxlY3RvciB7XG4gIEJPQVJEID0gJ2NnLWJvYXJkJyxcbiAgQk9BUkRfTk9fQ1VTVE9NID0gJ2NnLWJvYXJkOm5vdCgudXNlcnNjcmlwdC1jdXN0b20tYm9hcmQpJyxcbiAgQ09PUkRTID0gJ2Nvb3JkcycsXG4gIFBJRUNFID0gJ3BpZWNlJyxcbiAgQ09OVEFJTkVSID0gJ2NnLWNvbnRhaW5lcicsXG4gIEtFWUJPQVJEX01PVkUgPSAnLmtleWJvYXJkLW1vdmUnLFxuICBLRVlCT0FSRF9JTlBVVCA9ICcua2V5Ym9hcmQtbW92ZSBpbnB1dCcsXG59XG5cbi8vIENTUyBjbGFzc2VzIGVudW1cbmV4cG9ydCBlbnVtIENzc0NsYXNzIHtcbiAgQkxBQ0sgPSAnYmxhY2snLFxuICBVU0VSU0NSSVBUX0RJVklERVJTID0gJ3VzZXJzY3JpcHQtZGl2aWRlcnMnLFxuICBVU0VSU0NSSVBUX0ZMQVNIID0gJ3VzZXJzY3JpcHQtZmxhc2gtb3ZlcmxheScsXG59XG5cbi8vIENTUyBkaXNwbGF5IHZhbHVlcyBlbnVtXG5leHBvcnQgZW51bSBDc3NEaXNwbGF5IHtcbiAgQkxPQ0sgPSAnYmxvY2snLFxuICBOT05FID0gJ25vbmUnLFxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZURpdigpOiBIVE1MRGl2RWxlbWVudCB7XG4gIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU3ZnRWxlbWVudCh0YWc6IHN0cmluZyk6IFNWR0VsZW1lbnQge1xuICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsIHRhZylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3I6IHN0cmluZyk6IEVsZW1lbnQgfCBudWxsIHtcbiAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBxdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yOiBzdHJpbmcpOiBOb2RlTGlzdE9mPEVsZW1lbnQ+IHtcbiAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBlbmRDaGlsZChwYXJlbnQ6IEVsZW1lbnQsIGNoaWxkOiBFbGVtZW50KTogdm9pZCB7XG4gIHBhcmVudC5hcHBlbmRDaGlsZChjaGlsZClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEJvdW5kaW5nQ2xpZW50UmVjdChlbGVtZW50OiBFbGVtZW50KTogRE9NUmVjdCB7XG4gIHJldHVybiBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG59XG4iLCJleHBvcnQgZnVuY3Rpb24gZ2V0U3BlZWNoU3ludGhlc2lzKCk6IFNwZWVjaFN5bnRoZXNpcyB7XG4gIHJldHVybiB3aW5kb3cuc3BlZWNoU3ludGhlc2lzXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTcGVlY2hTeW50aGVzaXNVdHRlcmFuY2UoKTogdHlwZW9mIFNwZWVjaFN5bnRoZXNpc1V0dGVyYW5jZSB7XG4gIHJldHVybiBTcGVlY2hTeW50aGVzaXNVdHRlcmFuY2Vcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNwZWFrKHN5bnRoZXNpczogU3BlZWNoU3ludGhlc2lzLCB1dHRlcmFuY2U6IFNwZWVjaFN5bnRoZXNpc1V0dGVyYW5jZSk6IHZvaWQge1xuICBzeW50aGVzaXMuc3BlYWsodXR0ZXJhbmNlKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FuY2VsKHN5bnRoZXNpczogU3BlZWNoU3ludGhlc2lzKTogdm9pZCB7XG4gIHN5bnRoZXNpcy5jYW5jZWwoKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVXR0ZXJhbmNlKFxuICBVdHRlcmFuY2VDbGFzczogdHlwZW9mIFNwZWVjaFN5bnRoZXNpc1V0dGVyYW5jZSxcbiAgdGV4dDogc3RyaW5nXG4pOiBTcGVlY2hTeW50aGVzaXNVdHRlcmFuY2Uge1xuICByZXR1cm4gbmV3IFV0dGVyYW5jZUNsYXNzKHRleHQpXG59XG4iLCJpbXBvcnQgKiBhcyBzcGVlY2hBcGkgZnJvbSAnLi9zcGVlY2hBcGknXG5cbmxldCBjdXJyZW50UmF0ZSA9IDEuMFxuXG5leHBvcnQgZnVuY3Rpb24gc3BlYWsodGV4dDogc3RyaW5nLCByYXRlOiBudW1iZXIpOiB2b2lkIHtcbiAgY29uc3Qgc3ludGhlc2lzID0gc3BlZWNoQXBpLmdldFNwZWVjaFN5bnRoZXNpcygpXG4gIGNvbnN0IFV0dGVyYW5jZUNsYXNzID0gc3BlZWNoQXBpLmdldFNwZWVjaFN5bnRoZXNpc1V0dGVyYW5jZSgpXG4gIGNvbnN0IHV0dGVyYW5jZSA9IHNwZWVjaEFwaS5jcmVhdGVVdHRlcmFuY2UoVXR0ZXJhbmNlQ2xhc3MsIHRleHQpXG4gIHV0dGVyYW5jZS5yYXRlID0gcmF0ZVxuICBzcGVlY2hBcGkuc3BlYWsoc3ludGhlc2lzLCB1dHRlcmFuY2UpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdG9wU3BlYWtpbmcoKTogdm9pZCB7XG4gIGNvbnN0IHN5bnRoZXNpcyA9IHNwZWVjaEFwaS5nZXRTcGVlY2hTeW50aGVzaXMoKVxuICBzcGVlY2hBcGkuY2FuY2VsKHN5bnRoZXNpcylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldFJhdGUocmF0ZTogbnVtYmVyKTogdm9pZCB7XG4gIGN1cnJlbnRSYXRlID0gcmF0ZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmF0ZSgpOiBudW1iZXIge1xuICByZXR1cm4gY3VycmVudFJhdGVcbn1cbiIsImltcG9ydCB7IFBsYXllckNvbG9yIH0gZnJvbSAnLi4vY29uc3RhbnRzJ1xuXG5leHBvcnQgaW50ZXJmYWNlIFBpeGVsUG9zaXRpb24ge1xuICB4OiBudW1iZXJcbiAgeTogbnVtYmVyXG59XG5cbmNvbnN0IEZJTEVTID0gJ2FiY2RlZmdoJ1xuXG5leHBvcnQgZnVuY3Rpb24gcGl4ZWxzVG9TcXVhcmUoXG4gIHBvc2l0aW9uOiBQaXhlbFBvc2l0aW9uLFxuICBzcXVhcmVTaXplOiBudW1iZXIsXG4gIHBsYXllckNvbG9yOiBQbGF5ZXJDb2xvclxuKTogc3RyaW5nIHtcbiAgLy8gQ29udmVydCBwaXhlbHMgdG8gZ3JpZCBpbmRpY2VzICgwLTcpXG4gIC8vIEFkanVzdCBmb3IgY2VudGVyLWJhc2VkIGNvb3JkaW5hdGVzIGJlZm9yZSByb3VuZGluZ1xuICBsZXQgY29sID0gTWF0aC5yb3VuZCgocG9zaXRpb24ueCAtIHNxdWFyZVNpemUgLyAyKSAvIHNxdWFyZVNpemUpXG4gIGxldCByb3cgPSBNYXRoLnJvdW5kKChwb3NpdGlvbi55IC0gc3F1YXJlU2l6ZSAvIDIpIC8gc3F1YXJlU2l6ZSlcblxuICAvLyBDbGFtcCB0byB2YWxpZCByYW5nZVxuICBjb2wgPSBNYXRoLm1heCgwLCBNYXRoLm1pbig3LCBjb2wpKVxuICByb3cgPSBNYXRoLm1heCgwLCBNYXRoLm1pbig3LCByb3cpKVxuXG4gIC8vIENvbnZlcnQgdG8gcmFuayBiYXNlZCBvbiBwbGF5ZXIgY29sb3JcbiAgLy8gRm9yIHdoaXRlOiB5PTAgaXMgcmFuayA4LCB5IGluY3JlYXNlcyBnb2luZyB0byByYW5rIDFcbiAgLy8gRm9yIGJsYWNrOiB5PTAgaXMgcmFuayAxLCB5IGluY3JlYXNlcyBnb2luZyB0byByYW5rIDhcbiAgbGV0IHJhbms6IG51bWJlclxuICBsZXQgZmlsZTogc3RyaW5nXG5cbiAgaWYgKHBsYXllckNvbG9yID09PSBQbGF5ZXJDb2xvci5XSElURSkge1xuICAgIGZpbGUgPSBGSUxFU1tjb2xdXG4gICAgcmFuayA9IDggLSByb3dcbiAgfSBlbHNlIHtcbiAgICBmaWxlID0gRklMRVNbNyAtIGNvbF1cbiAgICByYW5rID0gcm93ICsgMVxuICB9XG5cbiAgcmV0dXJuIGAke2ZpbGV9JHtyYW5rfWBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNxdWFyZVRvUGl4ZWxzKFxuICBzcXVhcmU6IHN0cmluZyxcbiAgc3F1YXJlU2l6ZTogbnVtYmVyLFxuICBwbGF5ZXJDb2xvcjogUGxheWVyQ29sb3Jcbik6IFBpeGVsUG9zaXRpb24ge1xuICAvLyBWYWxpZGF0ZSBzcXVhcmUgZm9ybWF0XG4gIGlmIChzcXVhcmUubGVuZ3RoIDwgMikge1xuICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBzcXVhcmUgbm90YXRpb246ICR7c3F1YXJlfWApXG4gIH1cblxuICAvLyBQYXJzZSBzcXVhcmUgbm90YXRpb25cbiAgY29uc3QgZmlsZSA9IHNxdWFyZVswXVxuICBjb25zdCByYW5rID0gTnVtYmVyLnBhcnNlSW50KHNxdWFyZVsxXSwgMTApXG5cbiAgLy8gVmFsaWRhdGUgZmlsZSBhbmQgcmFua1xuICBjb25zdCBjb2wgPSBGSUxFUy5pbmRleE9mKGZpbGUpXG4gIGlmIChjb2wgPT09IC0xKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGZpbGU6ICR7ZmlsZX1gKVxuICB9XG4gIGlmIChyYW5rIDwgMSB8fCByYW5rID4gOCB8fCBOdW1iZXIuaXNOYU4ocmFuaykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgcmFuazogJHtyYW5rfWApXG4gIH1cblxuICAvLyBDYWxjdWxhdGUgcGl4ZWwgcG9zaXRpb24gYmFzZWQgb24gcGxheWVyIGNvbG9yXG4gIGxldCBwaXhlbENvbDogbnVtYmVyXG4gIGxldCBwaXhlbFJvdzogbnVtYmVyXG5cbiAgaWYgKHBsYXllckNvbG9yID09PSBQbGF5ZXJDb2xvci5XSElURSkge1xuICAgIC8vIEZvciB3aGl0ZTogZmlsZXMgZ28gbGVmdC10by1yaWdodCAoYS1oKSwgcmFua3MgZ28gYm90dG9tLXRvLXRvcCAoMS04KVxuICAgIC8vIFNvIHJhbmsgMSBpcyBhdCBib3R0b20gKHJvdyA3KSwgcmFuayA4IGlzIGF0IHRvcCAocm93IDApXG4gICAgcGl4ZWxDb2wgPSBjb2xcbiAgICBwaXhlbFJvdyA9IDggLSByYW5rXG4gIH0gZWxzZSB7XG4gICAgLy8gRm9yIGJsYWNrOiBmaWxlcyBnbyByaWdodC10by1sZWZ0IChoLWEpLCByYW5rcyBnbyB0b3AtdG8tYm90dG9tICg4LTEpXG4gICAgLy8gU28gcmFuayA4IGlzIGF0IHRvcCAocm93IDApLCByYW5rIDEgaXMgYXQgYm90dG9tIChyb3cgNylcbiAgICBwaXhlbENvbCA9IDcgLSBjb2xcbiAgICBwaXhlbFJvdyA9IHJhbmsgLSAxXG4gIH1cblxuICAvLyBDb252ZXJ0IHRvIHBpeGVscyAoY2VudGVyIG9mIHNxdWFyZSlcbiAgcmV0dXJuIHtcbiAgICB4OiBwaXhlbENvbCAqIHNxdWFyZVNpemUgKyBzcXVhcmVTaXplIC8gMixcbiAgICB5OiBwaXhlbFJvdyAqIHNxdWFyZVNpemUgKyBzcXVhcmVTaXplIC8gMixcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ3NzQ2xhc3MsIERvbVNlbGVjdG9yLCB0eXBlIFBpZWNlVHlwZSwgUGxheWVyQ29sb3IgfSBmcm9tICcuLi9jb25zdGFudHMnXG5pbXBvcnQgeyBwaXhlbHNUb1NxdWFyZSB9IGZyb20gJy4uL3B1cmUvY29vcmRpbmF0ZXMnXG5pbXBvcnQgdHlwZSB7IFBpZWNlUG9zaXRpb24gfSBmcm9tICcuLi9wdXJlL3BpZWNlR3JvdXBpbmcnXG5pbXBvcnQgeyBnZXRCb3VuZGluZ0NsaWVudFJlY3QsIHF1ZXJ5U2VsZWN0b3IgfSBmcm9tICcuL2RvbSdcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFBsYXllckNvbG9yKCk6IFBsYXllckNvbG9yIHtcbiAgY29uc3QgY29vcmRzID0gcXVlcnlTZWxlY3RvcihEb21TZWxlY3Rvci5DT09SRFMpXG4gIHJldHVybiBjb29yZHM/LmNsYXNzTGlzdC5jb250YWlucyhDc3NDbGFzcy5CTEFDSykgPyBQbGF5ZXJDb2xvci5CTEFDSyA6IFBsYXllckNvbG9yLldISVRFXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWFkUGllY2VQb3NpdGlvbnMoKTogUGllY2VQb3NpdGlvbltdIHtcbiAgY29uc3QgYm9hcmQgPSBxdWVyeVNlbGVjdG9yKERvbVNlbGVjdG9yLkJPQVJEX05PX0NVU1RPTSlcbiAgaWYgKCFib2FyZCkgcmV0dXJuIFtdXG5cbiAgLy8gUGFyc2Ugd2lkdGggZnJvbSBzdHlsZSBhdHRyaWJ1dGUgc2luY2UgZ2V0Qm91bmRpbmdDbGllbnRSZWN0IG1heSBub3Qgd29yayBpbiB0ZXN0IGVudmlyb25tZW50c1xuICBjb25zdCBib2FyZEVsZW1lbnQgPSBib2FyZCBhcyBIVE1MRWxlbWVudFxuICBjb25zdCB3aWR0aE1hdGNoID0gYm9hcmRFbGVtZW50LnN0eWxlLmNzc1RleHQubWF0Y2goL3dpZHRoOlxccyooWzAtOS5dKylweC8pXG4gIGNvbnN0IGJvYXJkV2lkdGggPSB3aWR0aE1hdGNoXG4gICAgPyBOdW1iZXIucGFyc2VGbG9hdCh3aWR0aE1hdGNoWzFdKVxuICAgIDogZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGJvYXJkKS53aWR0aFxuICBjb25zdCBzcXVhcmVTaXplID0gYm9hcmRXaWR0aCAvIDhcbiAgY29uc3QgcGxheWVyQ29sb3IgPSBnZXRQbGF5ZXJDb2xvcigpXG5cbiAgY29uc3QgcGllY2VzID0gYm9hcmQucXVlcnlTZWxlY3RvckFsbChEb21TZWxlY3Rvci5QSUVDRSlcbiAgY29uc3QgcG9zaXRpb25zOiBQaWVjZVBvc2l0aW9uW10gPSBbXVxuXG4gIGZvciAoY29uc3QgcGllY2Ugb2YgcGllY2VzKSB7XG4gICAgLy8gRXh0cmFjdCBjb2xvciBhbmQgdHlwZSBmcm9tIGNsYXNzXG4gICAgY29uc3QgY2xhc3NlcyA9IHBpZWNlLmNsYXNzTmFtZS5zcGxpdCgnICcpXG4gICAgY29uc3QgY29sb3JTdHIgPSBjbGFzc2VzWzBdXG4gICAgY29uc3QgdHlwZVN0ciA9IGNsYXNzZXNbMV1cblxuICAgIC8vIE1hcCB0byBlbnVtc1xuICAgIGNvbnN0IGNvbG9yID0gY29sb3JTdHIgPT09ICd3aGl0ZScgPyBQbGF5ZXJDb2xvci5XSElURSA6IFBsYXllckNvbG9yLkJMQUNLXG4gICAgY29uc3QgdHlwZSA9IHR5cGVTdHIgYXMgUGllY2VUeXBlXG5cbiAgICAvLyBFeHRyYWN0IHBvc2l0aW9uIGZyb20gdHJhbnNmb3JtXG4gICAgY29uc3QgdHJhbnNmb3JtID0gKHBpZWNlIGFzIEhUTUxFbGVtZW50KS5zdHlsZS50cmFuc2Zvcm1cbiAgICBjb25zdCBtYXRjaCA9IHRyYW5zZm9ybS5tYXRjaCgvdHJhbnNsYXRlXFwoKFswLTkuXSspcHgsP1xccyooWzAtOS5dKylweD9cXCkvKVxuICAgIGlmICghbWF0Y2gpIGNvbnRpbnVlXG5cbiAgICAvLyBUcmFuc2Zvcm0gZ2l2ZXMgYm90dG9tLWxlZnQgY29ybmVyLCBjb252ZXJ0IHRvIGNlbnRlclxuICAgIGNvbnN0IHggPSBOdW1iZXIucGFyc2VGbG9hdChtYXRjaFsxXSkgKyBzcXVhcmVTaXplIC8gMlxuICAgIGNvbnN0IHkgPSBOdW1iZXIucGFyc2VGbG9hdChtYXRjaFsyXSkgLSBzcXVhcmVTaXplIC8gMlxuXG4gICAgY29uc3Qgc3F1YXJlID0gcGl4ZWxzVG9TcXVhcmUoeyB4LCB5IH0sIHNxdWFyZVNpemUsIHBsYXllckNvbG9yKVxuICAgIHBvc2l0aW9ucy5wdXNoKHsgc3F1YXJlLCBjb2xvciwgdHlwZSB9KVxuICB9XG5cbiAgcmV0dXJuIHBvc2l0aW9uc1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd2FpdEZvckVsZW1lbnQoc2VsZWN0b3I6IHN0cmluZyk6IFByb21pc2U8RWxlbWVudD4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICBjb25zdCBlbGVtZW50ID0gcXVlcnlTZWxlY3RvcihzZWxlY3RvcilcbiAgICBpZiAoZWxlbWVudCkge1xuICAgICAgcmVzb2x2ZShlbGVtZW50KVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gcXVlcnlTZWxlY3RvcihzZWxlY3RvcilcbiAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgIG9ic2VydmVyLmRpc2Nvbm5lY3QoKVxuICAgICAgICByZXNvbHZlKGVsZW1lbnQpXG4gICAgICB9XG4gICAgfSlcblxuICAgIG9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuYm9keSwge1xuICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgc3VidHJlZTogdHJ1ZSxcbiAgICB9KVxuICB9KVxufVxuIiwiaW1wb3J0IHsgdHlwZSBQaWVjZVR5cGUsIFBsYXllckNvbG9yLCBRdWFkcmFudCB9IGZyb20gJy4uL2NvbnN0YW50cydcblxuZXhwb3J0IGludGVyZmFjZSBQaWVjZVBvc2l0aW9uIHtcbiAgc3F1YXJlOiBzdHJpbmdcbiAgY29sb3I6IFBsYXllckNvbG9yXG4gIHR5cGU6IFBpZWNlVHlwZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyUXVhZHJhbnQocGllY2VzOiBQaWVjZVBvc2l0aW9uW10sIHF1YWRyYW50OiBRdWFkcmFudCk6IFBpZWNlUG9zaXRpb25bXSB7XG4gIHJldHVybiBwaWVjZXMuZmlsdGVyKChwaWVjZSkgPT4ge1xuICAgIC8vIFZhbGlkYXRlIHNxdWFyZSBmb3JtYXRcbiAgICBpZiAoIXBpZWNlLnNxdWFyZSB8fCBwaWVjZS5zcXVhcmUubGVuZ3RoIDwgMikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHNxdWFyZSBmb3JtYXQ6ICR7cGllY2Uuc3F1YXJlfWApXG4gICAgfVxuXG4gICAgY29uc3QgZmlsZSA9IHBpZWNlLnNxdWFyZVswXVxuICAgIGNvbnN0IHJhbmsgPSBOdW1iZXIucGFyc2VJbnQocGllY2Uuc3F1YXJlWzFdLCAxMClcblxuICAgIC8vIFZhbGlkYXRlIGZpbGUgYW5kIHJhbmtcbiAgICBpZiAoZmlsZSA8ICdhJyB8fCBmaWxlID4gJ2gnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgZmlsZTogJHtmaWxlfWApXG4gICAgfVxuICAgIGlmIChOdW1iZXIuaXNOYU4ocmFuaykgfHwgcmFuayA8IDEgfHwgcmFuayA+IDgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCByYW5rOiAke3Jhbmt9YClcbiAgICB9XG5cbiAgICAvLyBEZXRlcm1pbmUgZmlsZSByYW5nZSAoa2luZy1zaWRlOiBlLWgsIHF1ZWVuLXNpZGU6IGEtZClcbiAgICBjb25zdCBpc0tpbmdTaWRlID0gZmlsZSA+PSAnZSdcblxuICAgIC8vIERldGVybWluZSByYW5rIHJhbmdlICh3aGl0ZTogMS00LCBibGFjazogNS04KVxuICAgIGNvbnN0IGlzV2hpdGVSYW5rcyA9IHJhbmsgPj0gMSAmJiByYW5rIDw9IDRcblxuICAgIC8vIE1hdGNoIHF1YWRyYW50XG4gICAgaWYgKHF1YWRyYW50ID09PSBRdWFkcmFudC5XSElURV9LSU5HKSByZXR1cm4gaXNLaW5nU2lkZSAmJiBpc1doaXRlUmFua3NcbiAgICBpZiAocXVhZHJhbnQgPT09IFF1YWRyYW50LldISVRFX1FVRUVOKSByZXR1cm4gIWlzS2luZ1NpZGUgJiYgaXNXaGl0ZVJhbmtzXG4gICAgaWYgKHF1YWRyYW50ID09PSBRdWFkcmFudC5CTEFDS19LSU5HKSByZXR1cm4gaXNLaW5nU2lkZSAmJiAhaXNXaGl0ZVJhbmtzXG4gICAgaWYgKHF1YWRyYW50ID09PSBRdWFkcmFudC5CTEFDS19RVUVFTikgcmV0dXJuICFpc0tpbmdTaWRlICYmICFpc1doaXRlUmFua3NcblxuICAgIHJldHVybiBmYWxzZVxuICB9KVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEdyb3VwZWRQaWVjZXMge1xuICBjb2xvcjogUGxheWVyQ29sb3JcbiAgdHlwZTogc3RyaW5nXG4gIHNxdWFyZXM6IHN0cmluZ1tdXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBncm91cEJ5Q29sb3JBbmRUeXBlKHBpZWNlczogUGllY2VQb3NpdGlvbltdKTogR3JvdXBlZFBpZWNlc1tdIHtcbiAgY29uc3QgZ3JvdXBzID0gbmV3IE1hcDxzdHJpbmcsIEdyb3VwZWRQaWVjZXM+KClcblxuICBmb3IgKGNvbnN0IHBpZWNlIG9mIHBpZWNlcykge1xuICAgIC8vIFZhbGlkYXRlIHJlcXVpcmVkIHByb3BlcnRpZXNcbiAgICBpZiAoIXBpZWNlLnNxdWFyZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQaWVjZSBtaXNzaW5nIHNxdWFyZSBwcm9wZXJ0eScpXG4gICAgfVxuICAgIGlmICghcGllY2UuY29sb3IpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUGllY2UgbWlzc2luZyBjb2xvciBwcm9wZXJ0eScpXG4gICAgfVxuICAgIGlmICghcGllY2UudHlwZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQaWVjZSBtaXNzaW5nIHR5cGUgcHJvcGVydHknKVxuICAgIH1cblxuICAgIGNvbnN0IGtleSA9IGAke3BpZWNlLmNvbG9yfS0ke3BpZWNlLnR5cGV9YFxuXG4gICAgaWYgKCFncm91cHMuaGFzKGtleSkpIHtcbiAgICAgIGdyb3Vwcy5zZXQoa2V5LCB7XG4gICAgICAgIGNvbG9yOiBwaWVjZS5jb2xvcixcbiAgICAgICAgdHlwZTogcGllY2UudHlwZSxcbiAgICAgICAgc3F1YXJlczogW10sXG4gICAgICB9KVxuICAgIH1cblxuICAgIGdyb3Vwcy5nZXQoa2V5KT8uc3F1YXJlcy5wdXNoKHBpZWNlLnNxdWFyZSlcbiAgfVxuXG4gIC8vIFNvcnQgZ3JvdXBzIGJ5IGNvbG9yICh3aGl0ZSBmaXJzdCkgdGhlbiB0eXBlXG4gIHJldHVybiBBcnJheS5mcm9tKGdyb3Vwcy52YWx1ZXMoKSkuc29ydCgoYSwgYikgPT4ge1xuICAgIGlmIChhLmNvbG9yICE9PSBiLmNvbG9yKSB7XG4gICAgICByZXR1cm4gYS5jb2xvciA9PT0gUGxheWVyQ29sb3IuV0hJVEUgPyAtMSA6IDFcbiAgICB9XG4gICAgcmV0dXJuIGEudHlwZS5sb2NhbGVDb21wYXJlKGIudHlwZSlcbiAgfSlcbn1cbiIsImltcG9ydCB7IHR5cGUgUGllY2VQb3NpdGlvbiwgZ3JvdXBCeUNvbG9yQW5kVHlwZSB9IGZyb20gJy4vcGllY2VHcm91cGluZydcblxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlUXVhZHJhbnRUZXh0KHBpZWNlczogUGllY2VQb3NpdGlvbltdKTogc3RyaW5nIHtcbiAgaWYgKHBpZWNlcy5sZW5ndGggPT09IDApIHJldHVybiAnJ1xuXG4gIGNvbnN0IGdyb3VwcyA9IGdyb3VwQnlDb2xvckFuZFR5cGUocGllY2VzKVxuICBjb25zdCBzZW50ZW5jZXM6IHN0cmluZ1tdID0gW11cblxuICBmb3IgKGNvbnN0IGdyb3VwIG9mIGdyb3Vwcykge1xuICAgIGNvbnN0IGNvbG9yTmFtZSA9IGdyb3VwLmNvbG9yXG4gICAgY29uc3QgdHlwZU5hbWUgPSBncm91cC5zcXVhcmVzLmxlbmd0aCA+IDEgPyBgJHtncm91cC50eXBlfXNgIDogZ3JvdXAudHlwZVxuXG4gICAgaWYgKGdyb3VwLnNxdWFyZXMubGVuZ3RoID4gMSkge1xuICAgICAgLy8gTXVsdGlwbGUgcGllY2VzOiBcIndoaXRlIHBhd25zIG9uIGEyLCBiMlwiXG4gICAgICBjb25zdCBzcXVhcmVzID0gZ3JvdXAuc3F1YXJlcy5qb2luKCcsICcpXG4gICAgICBzZW50ZW5jZXMucHVzaChgJHtjb2xvck5hbWV9ICR7dHlwZU5hbWV9IG9uICR7c3F1YXJlc31gKVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTaW5nbGUgcGllY2U6IFwiZTEgd2hpdGUga2luZ1wiXG4gICAgICBzZW50ZW5jZXMucHVzaChgJHtncm91cC5zcXVhcmVzWzBdfSAke2NvbG9yTmFtZX0gJHtncm91cC50eXBlfWApXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGAke3NlbnRlbmNlcy5qb2luKCcuICcpfS5gXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZUFsbFBpZWNlc1RleHQocGllY2VzOiBQaWVjZVBvc2l0aW9uW10pOiBzdHJpbmcge1xuICByZXR1cm4gZ2VuZXJhdGVRdWFkcmFudFRleHQocGllY2VzKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVDb2xvclRleHQocGllY2VzOiBQaWVjZVBvc2l0aW9uW10sIGNvbG9yOiAnd2hpdGUnIHwgJ2JsYWNrJyk6IHN0cmluZyB7XG4gIGNvbnN0IGZpbHRlcmVkID0gcGllY2VzLmZpbHRlcigocCkgPT4gcC5jb2xvciA9PT0gY29sb3IpXG4gIHJldHVybiBnZW5lcmF0ZVF1YWRyYW50VGV4dChmaWx0ZXJlZClcbn1cbiIsImltcG9ydCB0eXBlIHsgU2V0dGluZ3MgfSBmcm9tICcuL3R5cGVzJ1xuXG5leHBvcnQgY29uc3QgZGVmYXVsdFNldHRpbmdzOiBTZXR0aW5ncyA9IHtcbiAgc3BlYWtSYXRlOiAwLjUsXG4gIHBpZWNlc0xpc3RFbmFibGVkOiBmYWxzZSxcbiAgZGl2aWRlcnNFbmFibGVkOiBmYWxzZSxcbiAgY3VzdG9tQm9hcmRFbmFibGVkOiBmYWxzZSxcbiAgb2JmdXNjYXRpb25zRW5hYmxlZDogZmFsc2UsXG4gIHBhcmFsbGF4OiAwLFxuICBob3Zlck1vZGU6ICdvZmYnLFxuICBwaWVjZVN0eWxlOiAnaWNvbnMnLFxuICBibHVyOiAwLFxuICBibGFja1NlZ21lbnRzOiAnbm9uZScsXG4gIGJsYWNrU2VnbWVudHNUaW1pbmc6ICdyb3RhdGUtMTBzJyxcbiAgZmxhc2hNb2RlRW5hYmxlZDogZmFsc2UsXG4gIGZsYXNoRHVyYXRpb246IDEsXG4gIGZsYXNoSW50ZXJ2YWw6IDMsXG59XG4iLCIvKipcbiAqIFdyYXBwZXIgbW9kdWxlIGZvciBsb2NhbFN0b3JhZ2UgdG8gYWxsb3cgbW9ja2luZyB3aXRoIHNpbW9uZVxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRJdGVtKGtleTogc3RyaW5nKTogc3RyaW5nIHwgbnVsbCB7XG4gIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRJdGVtKGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgdmFsdWUpXG59XG4iLCJpbXBvcnQgeyBlZmZlY3QsIHNpZ25hbCB9IGZyb20gJ0BwcmVhY3Qvc2lnbmFscy1jb3JlJ1xuaW1wb3J0IHsgZGVmYXVsdFNldHRpbmdzIH0gZnJvbSAnLi9kZWZhdWx0cydcbmltcG9ydCAqIGFzIHN0b3JhZ2UgZnJvbSAnLi9zdG9yYWdlJ1xuaW1wb3J0IHR5cGUgeyBTZXR0aW5ncyB9IGZyb20gJy4vdHlwZXMnXG5cbmNvbnN0IFNUT1JBR0VfS0VZID0gJ2xpY2hlc3MtYm9hcmQtc3BlYWtlci1zZXR0aW5ncydcblxuZXhwb3J0IGNvbnN0IHNldHRpbmdzID0ge1xuICBzcGVha1JhdGU6IHNpZ25hbChkZWZhdWx0U2V0dGluZ3Muc3BlYWtSYXRlKSxcbiAgcGllY2VzTGlzdEVuYWJsZWQ6IHNpZ25hbChkZWZhdWx0U2V0dGluZ3MucGllY2VzTGlzdEVuYWJsZWQpLFxuICBkaXZpZGVyc0VuYWJsZWQ6IHNpZ25hbChkZWZhdWx0U2V0dGluZ3MuZGl2aWRlcnNFbmFibGVkKSxcbiAgY3VzdG9tQm9hcmRFbmFibGVkOiBzaWduYWwoZGVmYXVsdFNldHRpbmdzLmN1c3RvbUJvYXJkRW5hYmxlZCksXG4gIG9iZnVzY2F0aW9uc0VuYWJsZWQ6IHNpZ25hbChkZWZhdWx0U2V0dGluZ3Mub2JmdXNjYXRpb25zRW5hYmxlZCksXG4gIHBhcmFsbGF4OiBzaWduYWwoZGVmYXVsdFNldHRpbmdzLnBhcmFsbGF4KSxcbiAgaG92ZXJNb2RlOiBzaWduYWwoZGVmYXVsdFNldHRpbmdzLmhvdmVyTW9kZSksXG4gIHBpZWNlU3R5bGU6IHNpZ25hbChkZWZhdWx0U2V0dGluZ3MucGllY2VTdHlsZSksXG4gIGJsdXI6IHNpZ25hbChkZWZhdWx0U2V0dGluZ3MuYmx1ciksXG4gIGJsYWNrU2VnbWVudHM6IHNpZ25hbChkZWZhdWx0U2V0dGluZ3MuYmxhY2tTZWdtZW50cyksXG4gIGJsYWNrU2VnbWVudHNUaW1pbmc6IHNpZ25hbChkZWZhdWx0U2V0dGluZ3MuYmxhY2tTZWdtZW50c1RpbWluZyksXG4gIGZsYXNoTW9kZUVuYWJsZWQ6IHNpZ25hbChkZWZhdWx0U2V0dGluZ3MuZmxhc2hNb2RlRW5hYmxlZCksXG4gIGZsYXNoRHVyYXRpb246IHNpZ25hbChkZWZhdWx0U2V0dGluZ3MuZmxhc2hEdXJhdGlvbiksXG4gIGZsYXNoSW50ZXJ2YWw6IHNpZ25hbChkZWZhdWx0U2V0dGluZ3MuZmxhc2hJbnRlcnZhbCksXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2FkU2V0dGluZ3MoKTogdm9pZCB7XG4gIGNvbnN0IHN0b3JlZCA9IHN0b3JhZ2UuZ2V0SXRlbShTVE9SQUdFX0tFWSlcbiAgaWYgKCFzdG9yZWQpIHJldHVyblxuXG4gIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKHN0b3JlZCkgYXMgUGFydGlhbDxTZXR0aW5ncz5cbiAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoZGF0YSkpIHtcbiAgICBjb25zdCBzZXR0aW5nS2V5ID0ga2V5IGFzIGtleW9mIFNldHRpbmdzXG4gICAgaWYgKHNldHRpbmdzW3NldHRpbmdLZXldKSB7XG4gICAgICAvLyBiaW9tZS1pZ25vcmUgbGludC9zdXNwaWNpb3VzL25vRXhwbGljaXRBbnk6IFNldHRpbmdzIHR5cGUgaXMgZHluYW1pY1xuICAgICAgc2V0dGluZ3Nbc2V0dGluZ0tleV0udmFsdWUgPSBkYXRhW3NldHRpbmdLZXldIGFzIGFueVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2F2ZVNldHRpbmdzKCk6IHZvaWQge1xuICBjb25zdCBkYXRhOiBQYXJ0aWFsPFNldHRpbmdzPiA9IHt9XG4gIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHNldHRpbmdzKSkge1xuICAgIGNvbnN0IHNldHRpbmdLZXkgPSBrZXkgYXMga2V5b2YgdHlwZW9mIHNldHRpbmdzXG4gICAgLy8gYmlvbWUtaWdub3JlIGxpbnQvc3VzcGljaW91cy9ub0V4cGxpY2l0QW55OiBTZXR0aW5ncyB0eXBlIGlzIGR5bmFtaWNcbiAgICBkYXRhW3NldHRpbmdLZXldID0gc2V0dGluZ3Nbc2V0dGluZ0tleV0udmFsdWUgYXMgYW55XG4gIH1cbiAgc3RvcmFnZS5zZXRJdGVtKFNUT1JBR0VfS0VZLCBKU09OLnN0cmluZ2lmeShkYXRhKSlcbn1cblxuLy8gQXV0by1zYXZlIGVmZmVjdCAoc2hvdWxkIGJlIGNhbGxlZCBvbmNlIGR1cmluZyBhcHAgaW5pdGlhbGl6YXRpb24pXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBBdXRvU2F2ZSgpOiB2b2lkIHtcbiAgZWZmZWN0KCgpID0+IHtcbiAgICBmb3IgKGNvbnN0IHMgb2YgT2JqZWN0LnZhbHVlcyhzZXR0aW5ncykpIHtcbiAgICAgIHMudmFsdWVcbiAgICB9XG4gICAgc2F2ZVNldHRpbmdzKClcbiAgfSlcbn1cbiIsImltcG9ydCB7IHNwZWFrLCBzdG9wU3BlYWtpbmcgfSBmcm9tICcuLi9icm93c2VyL3NwZWVjaFN5bnRoZXNpemVyJ1xuaW1wb3J0IHsgUGxheWVyQ29sb3IsIHR5cGUgUXVhZHJhbnQsIFNwZWVjaENvbW1hbmQgfSBmcm9tICcuLi9jb25zdGFudHMnXG5pbXBvcnQgeyByZWFkUGllY2VQb3NpdGlvbnMgfSBmcm9tICcuLi9kb20vYm9hcmRSZWFkZXInXG5pbXBvcnQgeyBmaWx0ZXJRdWFkcmFudCB9IGZyb20gJy4uL3B1cmUvcGllY2VHcm91cGluZydcbmltcG9ydCB7IGdlbmVyYXRlQWxsUGllY2VzVGV4dCwgZ2VuZXJhdGVDb2xvclRleHQsIGdlbmVyYXRlUXVhZHJhbnRUZXh0IH0gZnJvbSAnLi4vcHVyZS9zcGVlY2hUZXh0J1xuaW1wb3J0IHsgc2V0dGluZ3MgfSBmcm9tICcuLi9zZXR0aW5ncy9zZXR0aW5nc1N0b3JlJ1xuXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlU3BlZWNoQ29tbWFuZChjb21tYW5kOiBzdHJpbmcpOiB2b2lkIHtcbiAgaWYgKGNvbW1hbmQgPT09IFNwZWVjaENvbW1hbmQuU1RPUCkge1xuICAgIHN0b3BTcGVha2luZygpXG4gICAgcmV0dXJuXG4gIH1cblxuICBjb25zdCBwaWVjZXMgPSByZWFkUGllY2VQb3NpdGlvbnMoKVxuXG4gIGlmIChjb21tYW5kID09PSBTcGVlY2hDb21tYW5kLkFMTCkge1xuICAgIGNvbnN0IHRleHQgPSBnZW5lcmF0ZUFsbFBpZWNlc1RleHQocGllY2VzKVxuICAgIHNwZWFrKHRleHQsIHNldHRpbmdzLnNwZWFrUmF0ZS52YWx1ZSlcbiAgICByZXR1cm5cbiAgfVxuXG4gIGlmIChjb21tYW5kID09PSBTcGVlY2hDb21tYW5kLldISVRFIHx8IGNvbW1hbmQgPT09IFNwZWVjaENvbW1hbmQuQkxBQ0spIHtcbiAgICBjb25zdCBjb2xvciA9IGNvbW1hbmQgPT09IFNwZWVjaENvbW1hbmQuV0hJVEUgPyBQbGF5ZXJDb2xvci5XSElURSA6IFBsYXllckNvbG9yLkJMQUNLXG4gICAgY29uc3QgdGV4dCA9IGdlbmVyYXRlQ29sb3JUZXh0KHBpZWNlcywgY29sb3IpXG4gICAgc3BlYWsodGV4dCwgc2V0dGluZ3Muc3BlYWtSYXRlLnZhbHVlKVxuICAgIHJldHVyblxuICB9XG5cbiAgLy8gUXVhZHJhbnQgY29tbWFuZHM6IHdrLCB3cSwgYmssIGJxXG4gIGNvbnN0IHF1YWRyYW50ID0gY29tbWFuZCBhcyBRdWFkcmFudFxuICBjb25zdCBmaWx0ZXJlZCA9IGZpbHRlclF1YWRyYW50KHBpZWNlcywgcXVhZHJhbnQpXG4gIGNvbnN0IHRleHQgPSBnZW5lcmF0ZVF1YWRyYW50VGV4dChmaWx0ZXJlZClcbiAgc3BlYWsodGV4dCwgc2V0dGluZ3Muc3BlYWtSYXRlLnZhbHVlKVxufVxuIiwiaW1wb3J0IHsgRG9tU2VsZWN0b3IsIEtFWUJPQVJEX0NPTU1BTkRfTUFQLCB0eXBlIEtleWJvYXJkQ29tbWFuZCB9IGZyb20gJy4uL2NvbnN0YW50cydcbmltcG9ydCB7IHF1ZXJ5U2VsZWN0b3IgfSBmcm9tICcuLi9kb20vZG9tJ1xuaW1wb3J0IHsgaGFuZGxlU3BlZWNoQ29tbWFuZCB9IGZyb20gJy4uL2hhbmRsZXJzL2hhbmRsZVNwZWVjaENvbW1hbmQnXG5cbmludGVyZmFjZSBJbnB1dEVsZW1lbnRXaXRoQ2xlYW51cCBleHRlbmRzIEhUTUxJbnB1dEVsZW1lbnQge1xuICBfX2tleWJvYXJkQ29tbWFuZENsZWFudXA/OiAoKSA9PiB2b2lkXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cEtleWJvYXJkQ29tbWFuZHMoKTogdm9pZCB7XG4gIGNvbnN0IGlucHV0ID0gcXVlcnlTZWxlY3RvcihEb21TZWxlY3Rvci5LRVlCT0FSRF9JTlBVVCkgYXMgSW5wdXRFbGVtZW50V2l0aENsZWFudXAgfCBudWxsXG4gIGlmICghaW5wdXQpIHJldHVyblxuXG4gIGNvbnN0IGhhbmRsZUlucHV0ID0gKGU6IEV2ZW50KSA9PiB7XG4gICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudFxuICAgIGNvbnN0IHZhbHVlID0gdGFyZ2V0LnZhbHVlXG5cbiAgICAvLyBDaGVjayBmb3Igc3BlZWNoIGNvbW1hbmRzXG4gICAgY29uc3QgY29tbWFuZCA9IEtFWUJPQVJEX0NPTU1BTkRfTUFQLmdldCh2YWx1ZSBhcyBLZXlib2FyZENvbW1hbmQpXG4gICAgaWYgKGNvbW1hbmQpIHtcbiAgICAgIGhhbmRsZVNwZWVjaENvbW1hbmQoY29tbWFuZClcbiAgICAgIHRhcmdldC52YWx1ZSA9ICcnXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICAvLyBDaGVjayBmb3IgZHJhd2luZyBjb21tYW5kcyAoaGFuZGxlZCBlbHNld2hlcmUpXG4gICAgaWYgKHZhbHVlLnN0YXJ0c1dpdGgoJy0nKSkge1xuICAgICAgLy8gV2lsbCBiZSBoYW5kbGVkIGJ5IGRyYXdpbmcgaGFuZGxlclxuICAgICAgcmV0dXJuXG4gICAgfVxuICB9XG5cbiAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBoYW5kbGVJbnB1dClcblxuICAvLyBTdG9yZSBjbGVhbnVwIGZ1bmN0aW9uIG9uIHRoZSBlbGVtZW50IGZvciBsYXRlciByZW1vdmFsXG4gIGlucHV0Ll9fa2V5Ym9hcmRDb21tYW5kQ2xlYW51cCA9ICgpID0+IHtcbiAgICBpbnB1dC5yZW1vdmVFdmVudExpc3RlbmVyKCdpbnB1dCcsIGhhbmRsZUlucHV0KVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0ZWFyZG93bktleWJvYXJkQ29tbWFuZHMoKTogdm9pZCB7XG4gIGNvbnN0IGlucHV0ID0gcXVlcnlTZWxlY3RvcihEb21TZWxlY3Rvci5LRVlCT0FSRF9JTlBVVCkgYXMgSW5wdXRFbGVtZW50V2l0aENsZWFudXAgfCBudWxsXG4gIGlmIChpbnB1dD8uX19rZXlib2FyZENvbW1hbmRDbGVhbnVwKSB7XG4gICAgaW5wdXQuX19rZXlib2FyZENvbW1hbmRDbGVhbnVwKClcbiAgICBpbnB1dC5fX2tleWJvYXJkQ29tbWFuZENsZWFudXAgPSB1bmRlZmluZWRcbiAgfVxufVxuIiwidmFyIG4sbCx1LHQsaSxyLG8sZSxmLGMsYSxzLGgscCx2LHksZD17fSx3PVtdLF89L2FjaXR8ZXgoPzpzfGd8bnxwfCQpfHJwaHxncmlkfG93c3xtbmN8bnR3fGluZVtjaF18em9vfF5vcmR8aXRlcmEvaSxnPUFycmF5LmlzQXJyYXk7ZnVuY3Rpb24gbShuLGwpe2Zvcih2YXIgdSBpbiBsKW5bdV09bFt1XTtyZXR1cm4gbn1mdW5jdGlvbiBiKG4pe24mJm4ucGFyZW50Tm9kZSYmbi5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG4pfWZ1bmN0aW9uIGsobCx1LHQpe3ZhciBpLHIsbyxlPXt9O2ZvcihvIGluIHUpXCJrZXlcIj09bz9pPXVbb106XCJyZWZcIj09bz9yPXVbb106ZVtvXT11W29dO2lmKGFyZ3VtZW50cy5sZW5ndGg+MiYmKGUuY2hpbGRyZW49YXJndW1lbnRzLmxlbmd0aD4zP24uY2FsbChhcmd1bWVudHMsMik6dCksXCJmdW5jdGlvblwiPT10eXBlb2YgbCYmbnVsbCE9bC5kZWZhdWx0UHJvcHMpZm9yKG8gaW4gbC5kZWZhdWx0UHJvcHMpdm9pZCAwPT09ZVtvXSYmKGVbb109bC5kZWZhdWx0UHJvcHNbb10pO3JldHVybiB4KGwsZSxpLHIsbnVsbCl9ZnVuY3Rpb24geChuLHQsaSxyLG8pe3ZhciBlPXt0eXBlOm4scHJvcHM6dCxrZXk6aSxyZWY6cixfX2s6bnVsbCxfXzpudWxsLF9fYjowLF9fZTpudWxsLF9fYzpudWxsLGNvbnN0cnVjdG9yOnZvaWQgMCxfX3Y6bnVsbD09bz8rK3U6byxfX2k6LTEsX191OjB9O3JldHVybiBudWxsPT1vJiZudWxsIT1sLnZub2RlJiZsLnZub2RlKGUpLGV9ZnVuY3Rpb24gTSgpe3JldHVybntjdXJyZW50Om51bGx9fWZ1bmN0aW9uIFMobil7cmV0dXJuIG4uY2hpbGRyZW59ZnVuY3Rpb24gQyhuLGwpe3RoaXMucHJvcHM9bix0aGlzLmNvbnRleHQ9bH1mdW5jdGlvbiAkKG4sbCl7aWYobnVsbD09bClyZXR1cm4gbi5fXz8kKG4uX18sbi5fX2krMSk6bnVsbDtmb3IodmFyIHU7bDxuLl9fay5sZW5ndGg7bCsrKWlmKG51bGwhPSh1PW4uX19rW2xdKSYmbnVsbCE9dS5fX2UpcmV0dXJuIHUuX19lO3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIG4udHlwZT8kKG4pOm51bGx9ZnVuY3Rpb24gSShuKXtpZihuLl9fUCYmbi5fX2Qpe3ZhciB1PW4uX192LHQ9dS5fX2UsaT1bXSxyPVtdLG89bSh7fSx1KTtvLl9fdj11Ll9fdisxLGwudm5vZGUmJmwudm5vZGUobykscShuLl9fUCxvLHUsbi5fX24sbi5fX1AubmFtZXNwYWNlVVJJLDMyJnUuX191P1t0XTpudWxsLGksbnVsbD09dD8kKHUpOnQsISEoMzImdS5fX3UpLHIpLG8uX192PXUuX192LG8uX18uX19rW28uX19pXT1vLEQoaSxvLHIpLHUuX19lPXUuX189bnVsbCxvLl9fZSE9dCYmUChvKX19ZnVuY3Rpb24gUChuKXtpZihudWxsIT0obj1uLl9fKSYmbnVsbCE9bi5fX2MpcmV0dXJuIG4uX19lPW4uX19jLmJhc2U9bnVsbCxuLl9fay5zb21lKGZ1bmN0aW9uKGwpe2lmKG51bGwhPWwmJm51bGwhPWwuX19lKXJldHVybiBuLl9fZT1uLl9fYy5iYXNlPWwuX19lfSksUChuKX1mdW5jdGlvbiBBKG4peyghbi5fX2QmJihuLl9fZD0hMCkmJmkucHVzaChuKSYmIUguX19yKyt8fHIhPWwuZGVib3VuY2VSZW5kZXJpbmcpJiYoKHI9bC5kZWJvdW5jZVJlbmRlcmluZyl8fG8pKEgpfWZ1bmN0aW9uIEgoKXt0cnl7Zm9yKHZhciBuLGw9MTtpLmxlbmd0aDspaS5sZW5ndGg+bCYmaS5zb3J0KGUpLG49aS5zaGlmdCgpLGw9aS5sZW5ndGgsSShuKX1maW5hbGx5e2kubGVuZ3RoPUguX19yPTB9fWZ1bmN0aW9uIEwobixsLHUsdCxpLHIsbyxlLGYsYyxhKXt2YXIgcyxoLHAsdix5LF8sZyxtPXQmJnQuX19rfHx3LGI9bC5sZW5ndGg7Zm9yKGY9VCh1LGwsbSxmLGIpLHM9MDtzPGI7cysrKW51bGwhPShwPXUuX19rW3NdKSYmKGg9LTEhPXAuX19pJiZtW3AuX19pXXx8ZCxwLl9faT1zLF89cShuLHAsaCxpLHIsbyxlLGYsYyxhKSx2PXAuX19lLHAucmVmJiZoLnJlZiE9cC5yZWYmJihoLnJlZiYmSihoLnJlZixudWxsLHApLGEucHVzaChwLnJlZixwLl9fY3x8dixwKSksbnVsbD09eSYmbnVsbCE9diYmKHk9diksKGc9ISEoNCZwLl9fdSkpfHxoLl9faz09PXAuX19rPyhmPWoocCxmLG4sZyksZyYmaC5fX2UmJihoLl9fZT1udWxsKSk6XCJmdW5jdGlvblwiPT10eXBlb2YgcC50eXBlJiZ2b2lkIDAhPT1fP2Y9Xzp2JiYoZj12Lm5leHRTaWJsaW5nKSxwLl9fdSY9LTcpO3JldHVybiB1Ll9fZT15LGZ9ZnVuY3Rpb24gVChuLGwsdSx0LGkpe3ZhciByLG8sZSxmLGMsYT11Lmxlbmd0aCxzPWEsaD0wO2ZvcihuLl9faz1uZXcgQXJyYXkoaSkscj0wO3I8aTtyKyspbnVsbCE9KG89bFtyXSkmJlwiYm9vbGVhblwiIT10eXBlb2YgbyYmXCJmdW5jdGlvblwiIT10eXBlb2Ygbz8oXCJzdHJpbmdcIj09dHlwZW9mIG98fFwibnVtYmVyXCI9PXR5cGVvZiBvfHxcImJpZ2ludFwiPT10eXBlb2Ygb3x8by5jb25zdHJ1Y3Rvcj09U3RyaW5nP289bi5fX2tbcl09eChudWxsLG8sbnVsbCxudWxsLG51bGwpOmcobyk/bz1uLl9fa1tyXT14KFMse2NoaWxkcmVuOm99LG51bGwsbnVsbCxudWxsKTp2b2lkIDA9PT1vLmNvbnN0cnVjdG9yJiZvLl9fYj4wP289bi5fX2tbcl09eChvLnR5cGUsby5wcm9wcyxvLmtleSxvLnJlZj9vLnJlZjpudWxsLG8uX192KTpuLl9fa1tyXT1vLGY9citoLG8uX189bixvLl9fYj1uLl9fYisxLGU9bnVsbCwtMSE9KGM9by5fX2k9TyhvLHUsZixzKSkmJihzLS0sKGU9dVtjXSkmJihlLl9fdXw9MikpLG51bGw9PWV8fG51bGw9PWUuX192PygtMT09YyYmKGk+YT9oLS06aTxhJiZoKyspLFwiZnVuY3Rpb25cIiE9dHlwZW9mIG8udHlwZSYmKG8uX191fD00KSk6YyE9ZiYmKGM9PWYtMT9oLS06Yz09ZisxP2grKzooYz5mP2gtLTpoKyssby5fX3V8PTQpKSk6bi5fX2tbcl09bnVsbDtpZihzKWZvcihyPTA7cjxhO3IrKyludWxsIT0oZT11W3JdKSYmMD09KDImZS5fX3UpJiYoZS5fX2U9PXQmJih0PSQoZSkpLEsoZSxlKSk7cmV0dXJuIHR9ZnVuY3Rpb24gaihuLGwsdSx0KXt2YXIgaSxyO2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIG4udHlwZSl7Zm9yKGk9bi5fX2sscj0wO2kmJnI8aS5sZW5ndGg7cisrKWlbcl0mJihpW3JdLl9fPW4sbD1qKGlbcl0sbCx1LHQpKTtyZXR1cm4gbH1uLl9fZSE9bCYmKHQmJihsJiZuLnR5cGUmJiFsLnBhcmVudE5vZGUmJihsPSQobikpLHUuaW5zZXJ0QmVmb3JlKG4uX19lLGx8fG51bGwpKSxsPW4uX19lKTtkb3tsPWwmJmwubmV4dFNpYmxpbmd9d2hpbGUobnVsbCE9bCYmOD09bC5ub2RlVHlwZSk7cmV0dXJuIGx9ZnVuY3Rpb24gRihuLGwpe3JldHVybiBsPWx8fFtdLG51bGw9PW58fFwiYm9vbGVhblwiPT10eXBlb2Ygbnx8KGcobik/bi5zb21lKGZ1bmN0aW9uKG4pe0YobixsKX0pOmwucHVzaChuKSksbH1mdW5jdGlvbiBPKG4sbCx1LHQpe3ZhciBpLHIsbyxlPW4ua2V5LGY9bi50eXBlLGM9bFt1XSxhPW51bGwhPWMmJjA9PSgyJmMuX191KTtpZihudWxsPT09YyYmbnVsbD09ZXx8YSYmZT09Yy5rZXkmJmY9PWMudHlwZSlyZXR1cm4gdTtpZih0PihhPzE6MCkpZm9yKGk9dS0xLHI9dSsxO2k+PTB8fHI8bC5sZW5ndGg7KWlmKG51bGwhPShjPWxbbz1pPj0wP2ktLTpyKytdKSYmMD09KDImYy5fX3UpJiZlPT1jLmtleSYmZj09Yy50eXBlKXJldHVybiBvO3JldHVybi0xfWZ1bmN0aW9uIHoobixsLHUpe1wiLVwiPT1sWzBdP24uc2V0UHJvcGVydHkobCxudWxsPT11P1wiXCI6dSk6bltsXT1udWxsPT11P1wiXCI6XCJudW1iZXJcIiE9dHlwZW9mIHV8fF8udGVzdChsKT91OnUrXCJweFwifWZ1bmN0aW9uIE4obixsLHUsdCxpKXt2YXIgcixvO246aWYoXCJzdHlsZVwiPT1sKWlmKFwic3RyaW5nXCI9PXR5cGVvZiB1KW4uc3R5bGUuY3NzVGV4dD11O2Vsc2V7aWYoXCJzdHJpbmdcIj09dHlwZW9mIHQmJihuLnN0eWxlLmNzc1RleHQ9dD1cIlwiKSx0KWZvcihsIGluIHQpdSYmbCBpbiB1fHx6KG4uc3R5bGUsbCxcIlwiKTtpZih1KWZvcihsIGluIHUpdCYmdVtsXT09dFtsXXx8eihuLnN0eWxlLGwsdVtsXSl9ZWxzZSBpZihcIm9cIj09bFswXSYmXCJuXCI9PWxbMV0pcj1sIT0obD1sLnJlcGxhY2UocyxcIiQxXCIpKSxvPWwudG9Mb3dlckNhc2UoKSxsPW8gaW4gbnx8XCJvbkZvY3VzT3V0XCI9PWx8fFwib25Gb2N1c0luXCI9PWw/by5zbGljZSgyKTpsLnNsaWNlKDIpLG4ubHx8KG4ubD17fSksbi5sW2wrcl09dSx1P3Q/dVthXT10W2FdOih1W2FdPWgsbi5hZGRFdmVudExpc3RlbmVyKGwscj92OnAscikpOm4ucmVtb3ZlRXZlbnRMaXN0ZW5lcihsLHI/djpwLHIpO2Vsc2V7aWYoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPT1pKWw9bC5yZXBsYWNlKC94bGluayhIfDpoKS8sXCJoXCIpLnJlcGxhY2UoL3NOYW1lJC8sXCJzXCIpO2Vsc2UgaWYoXCJ3aWR0aFwiIT1sJiZcImhlaWdodFwiIT1sJiZcImhyZWZcIiE9bCYmXCJsaXN0XCIhPWwmJlwiZm9ybVwiIT1sJiZcInRhYkluZGV4XCIhPWwmJlwiZG93bmxvYWRcIiE9bCYmXCJyb3dTcGFuXCIhPWwmJlwiY29sU3BhblwiIT1sJiZcInJvbGVcIiE9bCYmXCJwb3BvdmVyXCIhPWwmJmwgaW4gbil0cnl7bltsXT1udWxsPT11P1wiXCI6dTticmVhayBufWNhdGNoKG4pe31cImZ1bmN0aW9uXCI9PXR5cGVvZiB1fHwobnVsbD09dXx8ITE9PT11JiZcIi1cIiE9bFs0XT9uLnJlbW92ZUF0dHJpYnV0ZShsKTpuLnNldEF0dHJpYnV0ZShsLFwicG9wb3ZlclwiPT1sJiYxPT11P1wiXCI6dSkpfX1mdW5jdGlvbiBWKG4pe3JldHVybiBmdW5jdGlvbih1KXtpZih0aGlzLmwpe3ZhciB0PXRoaXMubFt1LnR5cGUrbl07aWYobnVsbD09dVtjXSl1W2NdPWgrKztlbHNlIGlmKHVbY108dFthXSlyZXR1cm47cmV0dXJuIHQobC5ldmVudD9sLmV2ZW50KHUpOnUpfX19ZnVuY3Rpb24gcShuLHUsdCxpLHIsbyxlLGYsYyxhKXt2YXIgcyxoLHAsdix5LGQsXyxrLHgsTSwkLEksUCxBLEgsVD11LnR5cGU7aWYodm9pZCAwIT09dS5jb25zdHJ1Y3RvcilyZXR1cm4gbnVsbDsxMjgmdC5fX3UmJihjPSEhKDMyJnQuX191KSxvPVtmPXUuX19lPXQuX19lXSksKHM9bC5fX2IpJiZzKHUpO246aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgVCl0cnl7aWYoaz11LnByb3BzLHg9VC5wcm90b3R5cGUmJlQucHJvdG90eXBlLnJlbmRlcixNPShzPVQuY29udGV4dFR5cGUpJiZpW3MuX19jXSwkPXM/TT9NLnByb3BzLnZhbHVlOnMuX186aSx0Ll9fYz9fPShoPXUuX19jPXQuX19jKS5fXz1oLl9fRTooeD91Ll9fYz1oPW5ldyBUKGssJCk6KHUuX19jPWg9bmV3IEMoaywkKSxoLmNvbnN0cnVjdG9yPVQsaC5yZW5kZXI9USksTSYmTS5zdWIoaCksaC5zdGF0ZXx8KGguc3RhdGU9e30pLGguX19uPWkscD1oLl9fZD0hMCxoLl9faD1bXSxoLl9zYj1bXSkseCYmbnVsbD09aC5fX3MmJihoLl9fcz1oLnN0YXRlKSx4JiZudWxsIT1ULmdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyYmKGguX19zPT1oLnN0YXRlJiYoaC5fX3M9bSh7fSxoLl9fcykpLG0oaC5fX3MsVC5nZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMoayxoLl9fcykpKSx2PWgucHJvcHMseT1oLnN0YXRlLGguX192PXUscCl4JiZudWxsPT1ULmdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyYmbnVsbCE9aC5jb21wb25lbnRXaWxsTW91bnQmJmguY29tcG9uZW50V2lsbE1vdW50KCkseCYmbnVsbCE9aC5jb21wb25lbnREaWRNb3VudCYmaC5fX2gucHVzaChoLmNvbXBvbmVudERpZE1vdW50KTtlbHNle2lmKHgmJm51bGw9PVQuZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzJiZrIT09diYmbnVsbCE9aC5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzJiZoLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMoaywkKSx1Ll9fdj09dC5fX3Z8fCFoLl9fZSYmbnVsbCE9aC5zaG91bGRDb21wb25lbnRVcGRhdGUmJiExPT09aC5zaG91bGRDb21wb25lbnRVcGRhdGUoayxoLl9fcywkKSl7dS5fX3YhPXQuX192JiYoaC5wcm9wcz1rLGguc3RhdGU9aC5fX3MsaC5fX2Q9ITEpLHUuX19lPXQuX19lLHUuX19rPXQuX19rLHUuX19rLnNvbWUoZnVuY3Rpb24obil7biYmKG4uX189dSl9KSx3LnB1c2guYXBwbHkoaC5fX2gsaC5fc2IpLGguX3NiPVtdLGguX19oLmxlbmd0aCYmZS5wdXNoKGgpO2JyZWFrIG59bnVsbCE9aC5jb21wb25lbnRXaWxsVXBkYXRlJiZoLmNvbXBvbmVudFdpbGxVcGRhdGUoayxoLl9fcywkKSx4JiZudWxsIT1oLmNvbXBvbmVudERpZFVwZGF0ZSYmaC5fX2gucHVzaChmdW5jdGlvbigpe2guY29tcG9uZW50RGlkVXBkYXRlKHYseSxkKX0pfWlmKGguY29udGV4dD0kLGgucHJvcHM9ayxoLl9fUD1uLGguX19lPSExLEk9bC5fX3IsUD0wLHgpaC5zdGF0ZT1oLl9fcyxoLl9fZD0hMSxJJiZJKHUpLHM9aC5yZW5kZXIoaC5wcm9wcyxoLnN0YXRlLGguY29udGV4dCksdy5wdXNoLmFwcGx5KGguX19oLGguX3NiKSxoLl9zYj1bXTtlbHNlIGRve2guX19kPSExLEkmJkkodSkscz1oLnJlbmRlcihoLnByb3BzLGguc3RhdGUsaC5jb250ZXh0KSxoLnN0YXRlPWguX19zfXdoaWxlKGguX19kJiYrK1A8MjUpO2guc3RhdGU9aC5fX3MsbnVsbCE9aC5nZXRDaGlsZENvbnRleHQmJihpPW0obSh7fSxpKSxoLmdldENoaWxkQ29udGV4dCgpKSkseCYmIXAmJm51bGwhPWguZ2V0U25hcHNob3RCZWZvcmVVcGRhdGUmJihkPWguZ2V0U25hcHNob3RCZWZvcmVVcGRhdGUodix5KSksQT1udWxsIT1zJiZzLnR5cGU9PT1TJiZudWxsPT1zLmtleT9FKHMucHJvcHMuY2hpbGRyZW4pOnMsZj1MKG4sZyhBKT9BOltBXSx1LHQsaSxyLG8sZSxmLGMsYSksaC5iYXNlPXUuX19lLHUuX191Jj0tMTYxLGguX19oLmxlbmd0aCYmZS5wdXNoKGgpLF8mJihoLl9fRT1oLl9fPW51bGwpfWNhdGNoKG4pe2lmKHUuX192PW51bGwsY3x8bnVsbCE9bylpZihuLnRoZW4pe2Zvcih1Ll9fdXw9Yz8xNjA6MTI4O2YmJjg9PWYubm9kZVR5cGUmJmYubmV4dFNpYmxpbmc7KWY9Zi5uZXh0U2libGluZztvW28uaW5kZXhPZihmKV09bnVsbCx1Ll9fZT1mfWVsc2V7Zm9yKEg9by5sZW5ndGg7SC0tOyliKG9bSF0pO0IodSl9ZWxzZSB1Ll9fZT10Ll9fZSx1Ll9faz10Ll9fayxuLnRoZW58fEIodSk7bC5fX2Uobix1LHQpfWVsc2UgbnVsbD09byYmdS5fX3Y9PXQuX192Pyh1Ll9faz10Ll9fayx1Ll9fZT10Ll9fZSk6Zj11Ll9fZT1HKHQuX19lLHUsdCxpLHIsbyxlLGMsYSk7cmV0dXJuKHM9bC5kaWZmZWQpJiZzKHUpLDEyOCZ1Ll9fdT92b2lkIDA6Zn1mdW5jdGlvbiBCKG4pe24mJihuLl9fYyYmKG4uX19jLl9fZT0hMCksbi5fX2smJm4uX19rLnNvbWUoQikpfWZ1bmN0aW9uIEQobix1LHQpe2Zvcih2YXIgaT0wO2k8dC5sZW5ndGg7aSsrKUoodFtpXSx0WysraV0sdFsrK2ldKTtsLl9fYyYmbC5fX2ModSxuKSxuLnNvbWUoZnVuY3Rpb24odSl7dHJ5e249dS5fX2gsdS5fX2g9W10sbi5zb21lKGZ1bmN0aW9uKG4pe24uY2FsbCh1KX0pfWNhdGNoKG4pe2wuX19lKG4sdS5fX3YpfX0pfWZ1bmN0aW9uIEUobil7cmV0dXJuXCJvYmplY3RcIiE9dHlwZW9mIG58fG51bGw9PW58fG4uX19iPjA/bjpnKG4pP24ubWFwKEUpOnZvaWQgMCE9PW4uY29uc3RydWN0b3I/bnVsbDptKHt9LG4pfWZ1bmN0aW9uIEcodSx0LGkscixvLGUsZixjLGEpe3ZhciBzLGgscCx2LHksdyxfLG09aS5wcm9wc3x8ZCxrPXQucHJvcHMseD10LnR5cGU7aWYoXCJzdmdcIj09eD9vPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIjpcIm1hdGhcIj09eD9vPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OC9NYXRoL01hdGhNTFwiOm98fChvPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbFwiKSxudWxsIT1lKWZvcihzPTA7czxlLmxlbmd0aDtzKyspaWYoKHk9ZVtzXSkmJlwic2V0QXR0cmlidXRlXCJpbiB5PT0hIXgmJih4P3kubG9jYWxOYW1lPT14OjM9PXkubm9kZVR5cGUpKXt1PXksZVtzXT1udWxsO2JyZWFrfWlmKG51bGw9PXUpe2lmKG51bGw9PXgpcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGspO3U9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKG8seCxrLmlzJiZrKSxjJiYobC5fX20mJmwuX19tKHQsZSksYz0hMSksZT1udWxsfWlmKG51bGw9PXgpbT09PWt8fGMmJnUuZGF0YT09a3x8KHUuZGF0YT1rKTtlbHNle2lmKGU9XCJ0ZXh0YXJlYVwiPT14JiZudWxsIT1rLmRlZmF1bHRWYWx1ZT9udWxsOmUmJm4uY2FsbCh1LmNoaWxkTm9kZXMpLCFjJiZudWxsIT1lKWZvcihtPXt9LHM9MDtzPHUuYXR0cmlidXRlcy5sZW5ndGg7cysrKW1bKHk9dS5hdHRyaWJ1dGVzW3NdKS5uYW1lXT15LnZhbHVlO2ZvcihzIGluIG0peT1tW3NdLFwiZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUxcIj09cz9wPXk6XCJjaGlsZHJlblwiPT1zfHxzIGluIGt8fFwidmFsdWVcIj09cyYmXCJkZWZhdWx0VmFsdWVcImluIGt8fFwiY2hlY2tlZFwiPT1zJiZcImRlZmF1bHRDaGVja2VkXCJpbiBrfHxOKHUscyxudWxsLHksbyk7Zm9yKHMgaW4gayl5PWtbc10sXCJjaGlsZHJlblwiPT1zP3Y9eTpcImRhbmdlcm91c2x5U2V0SW5uZXJIVE1MXCI9PXM/aD15OlwidmFsdWVcIj09cz93PXk6XCJjaGVja2VkXCI9PXM/Xz15OmMmJlwiZnVuY3Rpb25cIiE9dHlwZW9mIHl8fG1bc109PT15fHxOKHUscyx5LG1bc10sbyk7aWYoaCljfHxwJiYoaC5fX2h0bWw9PXAuX19odG1sfHxoLl9faHRtbD09dS5pbm5lckhUTUwpfHwodS5pbm5lckhUTUw9aC5fX2h0bWwpLHQuX19rPVtdO2Vsc2UgaWYocCYmKHUuaW5uZXJIVE1MPVwiXCIpLEwoXCJ0ZW1wbGF0ZVwiPT10LnR5cGU/dS5jb250ZW50OnUsZyh2KT92Olt2XSx0LGkscixcImZvcmVpZ25PYmplY3RcIj09eD9cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWxcIjpvLGUsZixlP2VbMF06aS5fX2smJiQoaSwwKSxjLGEpLG51bGwhPWUpZm9yKHM9ZS5sZW5ndGg7cy0tOyliKGVbc10pO2MmJlwidGV4dGFyZWFcIiE9eHx8KHM9XCJ2YWx1ZVwiLFwicHJvZ3Jlc3NcIj09eCYmbnVsbD09dz91LnJlbW92ZUF0dHJpYnV0ZShcInZhbHVlXCIpOm51bGwhPXcmJih3IT09dVtzXXx8XCJwcm9ncmVzc1wiPT14JiYhd3x8XCJvcHRpb25cIj09eCYmdyE9bVtzXSkmJk4odSxzLHcsbVtzXSxvKSxzPVwiY2hlY2tlZFwiLG51bGwhPV8mJl8hPXVbc10mJk4odSxzLF8sbVtzXSxvKSl9cmV0dXJuIHV9ZnVuY3Rpb24gSihuLHUsdCl7dHJ5e2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIG4pe3ZhciBpPVwiZnVuY3Rpb25cIj09dHlwZW9mIG4uX191O2kmJm4uX191KCksaSYmbnVsbD09dXx8KG4uX191PW4odSkpfWVsc2Ugbi5jdXJyZW50PXV9Y2F0Y2gobil7bC5fX2Uobix0KX19ZnVuY3Rpb24gSyhuLHUsdCl7dmFyIGkscjtpZihsLnVubW91bnQmJmwudW5tb3VudChuKSwoaT1uLnJlZikmJihpLmN1cnJlbnQmJmkuY3VycmVudCE9bi5fX2V8fEooaSxudWxsLHUpKSxudWxsIT0oaT1uLl9fYykpe2lmKGkuY29tcG9uZW50V2lsbFVubW91bnQpdHJ5e2kuY29tcG9uZW50V2lsbFVubW91bnQoKX1jYXRjaChuKXtsLl9fZShuLHUpfWkuYmFzZT1pLl9fUD1udWxsfWlmKGk9bi5fX2spZm9yKHI9MDtyPGkubGVuZ3RoO3IrKylpW3JdJiZLKGlbcl0sdSx0fHxcImZ1bmN0aW9uXCIhPXR5cGVvZiBuLnR5cGUpO3R8fGIobi5fX2UpLG4uX19jPW4uX189bi5fX2U9dm9pZCAwfWZ1bmN0aW9uIFEobixsLHUpe3JldHVybiB0aGlzLmNvbnN0cnVjdG9yKG4sdSl9ZnVuY3Rpb24gUih1LHQsaSl7dmFyIHIsbyxlLGY7dD09ZG9jdW1lbnQmJih0PWRvY3VtZW50LmRvY3VtZW50RWxlbWVudCksbC5fXyYmbC5fXyh1LHQpLG89KHI9XCJmdW5jdGlvblwiPT10eXBlb2YgaSk/bnVsbDppJiZpLl9fa3x8dC5fX2ssZT1bXSxmPVtdLHEodCx1PSghciYmaXx8dCkuX19rPWsoUyxudWxsLFt1XSksb3x8ZCxkLHQubmFtZXNwYWNlVVJJLCFyJiZpP1tpXTpvP251bGw6dC5maXJzdENoaWxkP24uY2FsbCh0LmNoaWxkTm9kZXMpOm51bGwsZSwhciYmaT9pOm8/by5fX2U6dC5maXJzdENoaWxkLHIsZiksRChlLHUsZil9ZnVuY3Rpb24gVShuLGwpe1IobixsLFUpfWZ1bmN0aW9uIFcobCx1LHQpe3ZhciBpLHIsbyxlLGY9bSh7fSxsLnByb3BzKTtmb3IobyBpbiBsLnR5cGUmJmwudHlwZS5kZWZhdWx0UHJvcHMmJihlPWwudHlwZS5kZWZhdWx0UHJvcHMpLHUpXCJrZXlcIj09bz9pPXVbb106XCJyZWZcIj09bz9yPXVbb106ZltvXT12b2lkIDA9PT11W29dJiZudWxsIT1lP2Vbb106dVtvXTtyZXR1cm4gYXJndW1lbnRzLmxlbmd0aD4yJiYoZi5jaGlsZHJlbj1hcmd1bWVudHMubGVuZ3RoPjM/bi5jYWxsKGFyZ3VtZW50cywyKTp0KSx4KGwudHlwZSxmLGl8fGwua2V5LHJ8fGwucmVmLG51bGwpfWZ1bmN0aW9uIFgobil7ZnVuY3Rpb24gbChuKXt2YXIgdSx0O3JldHVybiB0aGlzLmdldENoaWxkQ29udGV4dHx8KHU9bmV3IFNldCwodD17fSlbbC5fX2NdPXRoaXMsdGhpcy5nZXRDaGlsZENvbnRleHQ9ZnVuY3Rpb24oKXtyZXR1cm4gdH0sdGhpcy5jb21wb25lbnRXaWxsVW5tb3VudD1mdW5jdGlvbigpe3U9bnVsbH0sdGhpcy5zaG91bGRDb21wb25lbnRVcGRhdGU9ZnVuY3Rpb24obil7dGhpcy5wcm9wcy52YWx1ZSE9bi52YWx1ZSYmdS5mb3JFYWNoKGZ1bmN0aW9uKG4pe24uX19lPSEwLEEobil9KX0sdGhpcy5zdWI9ZnVuY3Rpb24obil7dS5hZGQobik7dmFyIGw9bi5jb21wb25lbnRXaWxsVW5tb3VudDtuLmNvbXBvbmVudFdpbGxVbm1vdW50PWZ1bmN0aW9uKCl7dSYmdS5kZWxldGUobiksbCYmbC5jYWxsKG4pfX0pLG4uY2hpbGRyZW59cmV0dXJuIGwuX19jPVwiX19jQ1wiK3krKyxsLl9fPW4sbC5Qcm92aWRlcj1sLl9fbD0obC5Db25zdW1lcj1mdW5jdGlvbihuLGwpe3JldHVybiBuLmNoaWxkcmVuKGwpfSkuY29udGV4dFR5cGU9bCxsfW49dy5zbGljZSxsPXtfX2U6ZnVuY3Rpb24obixsLHUsdCl7Zm9yKHZhciBpLHIsbztsPWwuX187KWlmKChpPWwuX19jKSYmIWkuX18pdHJ5e2lmKChyPWkuY29uc3RydWN0b3IpJiZudWxsIT1yLmdldERlcml2ZWRTdGF0ZUZyb21FcnJvciYmKGkuc2V0U3RhdGUoci5nZXREZXJpdmVkU3RhdGVGcm9tRXJyb3IobikpLG89aS5fX2QpLG51bGwhPWkuY29tcG9uZW50RGlkQ2F0Y2gmJihpLmNvbXBvbmVudERpZENhdGNoKG4sdHx8e30pLG89aS5fX2QpLG8pcmV0dXJuIGkuX19FPWl9Y2F0Y2gobCl7bj1sfXRocm93IG59fSx1PTAsdD1mdW5jdGlvbihuKXtyZXR1cm4gbnVsbCE9biYmdm9pZCAwPT09bi5jb25zdHJ1Y3Rvcn0sQy5wcm90b3R5cGUuc2V0U3RhdGU9ZnVuY3Rpb24obixsKXt2YXIgdTt1PW51bGwhPXRoaXMuX19zJiZ0aGlzLl9fcyE9dGhpcy5zdGF0ZT90aGlzLl9fczp0aGlzLl9fcz1tKHt9LHRoaXMuc3RhdGUpLFwiZnVuY3Rpb25cIj09dHlwZW9mIG4mJihuPW4obSh7fSx1KSx0aGlzLnByb3BzKSksbiYmbSh1LG4pLG51bGwhPW4mJnRoaXMuX192JiYobCYmdGhpcy5fc2IucHVzaChsKSxBKHRoaXMpKX0sQy5wcm90b3R5cGUuZm9yY2VVcGRhdGU9ZnVuY3Rpb24obil7dGhpcy5fX3YmJih0aGlzLl9fZT0hMCxuJiZ0aGlzLl9faC5wdXNoKG4pLEEodGhpcykpfSxDLnByb3RvdHlwZS5yZW5kZXI9UyxpPVtdLG89XCJmdW5jdGlvblwiPT10eXBlb2YgUHJvbWlzZT9Qcm9taXNlLnByb3RvdHlwZS50aGVuLmJpbmQoUHJvbWlzZS5yZXNvbHZlKCkpOnNldFRpbWVvdXQsZT1mdW5jdGlvbihuLGwpe3JldHVybiBuLl9fdi5fX2ItbC5fX3YuX19ifSxILl9fcj0wLGY9TWF0aC5yYW5kb20oKS50b1N0cmluZyg4KSxjPVwiX19kXCIrZixhPVwiX19hXCIrZixzPS8oUG9pbnRlckNhcHR1cmUpJHxDYXB0dXJlJC9pLGg9MCxwPVYoITEpLHY9VighMCkseT0wO2V4cG9ydHtDIGFzIENvbXBvbmVudCxTIGFzIEZyYWdtZW50LFcgYXMgY2xvbmVFbGVtZW50LFggYXMgY3JlYXRlQ29udGV4dCxrIGFzIGNyZWF0ZUVsZW1lbnQsTSBhcyBjcmVhdGVSZWYsayBhcyBoLFUgYXMgaHlkcmF0ZSx0IGFzIGlzVmFsaWRFbGVtZW50LGwgYXMgb3B0aW9ucyxSIGFzIHJlbmRlcixGIGFzIHRvQ2hpbGRBcnJheX07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wcmVhY3QubW9kdWxlLmpzLm1hcFxuIiwiaW1wb3J0e29wdGlvbnMgYXMgcixGcmFnbWVudCBhcyBlfWZyb21cInByZWFjdFwiO2V4cG9ydHtGcmFnbWVudH1mcm9tXCJwcmVhY3RcIjt2YXIgdD0vW1wiJjxdLztmdW5jdGlvbiBuKHIpe2lmKDA9PT1yLmxlbmd0aHx8ITE9PT10LnRlc3QocikpcmV0dXJuIHI7Zm9yKHZhciBlPTAsbj0wLG89XCJcIixmPVwiXCI7bjxyLmxlbmd0aDtuKyspe3N3aXRjaChyLmNoYXJDb2RlQXQobikpe2Nhc2UgMzQ6Zj1cIiZxdW90O1wiO2JyZWFrO2Nhc2UgMzg6Zj1cIiZhbXA7XCI7YnJlYWs7Y2FzZSA2MDpmPVwiJmx0O1wiO2JyZWFrO2RlZmF1bHQ6Y29udGludWV9biE9PWUmJihvKz1yLnNsaWNlKGUsbikpLG8rPWYsZT1uKzF9cmV0dXJuIG4hPT1lJiYobys9ci5zbGljZShlLG4pKSxvfXZhciBvPS9hY2l0fGV4KD86c3xnfG58cHwkKXxycGh8Z3JpZHxvd3N8bW5jfG50d3xpbmVbY2hdfHpvb3xeb3JkfGl0ZXJhL2ksZj0wLGk9QXJyYXkuaXNBcnJheTtmdW5jdGlvbiB1KGUsdCxuLG8saSx1KXt0fHwodD17fSk7dmFyIGEsYyxwPXQ7aWYoXCJyZWZcImluIHApZm9yKGMgaW4gcD17fSx0KVwicmVmXCI9PWM/YT10W2NdOnBbY109dFtjXTt2YXIgbD17dHlwZTplLHByb3BzOnAsa2V5Om4scmVmOmEsX19rOm51bGwsX186bnVsbCxfX2I6MCxfX2U6bnVsbCxfX2M6bnVsbCxjb25zdHJ1Y3Rvcjp2b2lkIDAsX192Oi0tZixfX2k6LTEsX191OjAsX19zb3VyY2U6aSxfX3NlbGY6dX07aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZSYmKGE9ZS5kZWZhdWx0UHJvcHMpKWZvcihjIGluIGEpdm9pZCAwPT09cFtjXSYmKHBbY109YVtjXSk7cmV0dXJuIHIudm5vZGUmJnIudm5vZGUobCksbH1mdW5jdGlvbiBhKHIpe3ZhciB0PXUoZSx7dHBsOnIsZXhwcnM6W10uc2xpY2UuY2FsbChhcmd1bWVudHMsMSl9KTtyZXR1cm4gdC5rZXk9dC5fX3YsdH12YXIgYz17fSxwPS9bQS1aXS9nO2Z1bmN0aW9uIGwoZSx0KXtpZihyLmF0dHIpe3ZhciBmPXIuYXR0cihlLHQpO2lmKFwic3RyaW5nXCI9PXR5cGVvZiBmKXJldHVybiBmfWlmKHQ9ZnVuY3Rpb24ocil7cmV0dXJuIG51bGwhPT1yJiZcIm9iamVjdFwiPT10eXBlb2YgciYmXCJmdW5jdGlvblwiPT10eXBlb2Ygci52YWx1ZU9mP3IudmFsdWVPZigpOnJ9KHQpLFwicmVmXCI9PT1lfHxcImtleVwiPT09ZSlyZXR1cm5cIlwiO2lmKFwic3R5bGVcIj09PWUmJlwib2JqZWN0XCI9PXR5cGVvZiB0KXt2YXIgaT1cIlwiO2Zvcih2YXIgdSBpbiB0KXt2YXIgYT10W3VdO2lmKG51bGwhPWEmJlwiXCIhPT1hKXt2YXIgbD1cIi1cIj09dVswXT91OmNbdV18fChjW3VdPXUucmVwbGFjZShwLFwiLSQmXCIpLnRvTG93ZXJDYXNlKCkpLHM9XCI7XCI7XCJudW1iZXJcIiE9dHlwZW9mIGF8fGwuc3RhcnRzV2l0aChcIi0tXCIpfHxvLnRlc3QobCl8fChzPVwicHg7XCIpLGk9aStsK1wiOlwiK2Erc319cmV0dXJuIGUrJz1cIicrbihpKSsnXCInfXJldHVybiBudWxsPT10fHwhMT09PXR8fFwiZnVuY3Rpb25cIj09dHlwZW9mIHR8fFwib2JqZWN0XCI9PXR5cGVvZiB0P1wiXCI6ITA9PT10P2U6ZSsnPVwiJytuKFwiXCIrdCkrJ1wiJ31mdW5jdGlvbiBzKHIpe2lmKG51bGw9PXJ8fFwiYm9vbGVhblwiPT10eXBlb2Ygcnx8XCJmdW5jdGlvblwiPT10eXBlb2YgcilyZXR1cm4gbnVsbDtpZihcIm9iamVjdFwiPT10eXBlb2Ygcil7aWYodm9pZCAwPT09ci5jb25zdHJ1Y3RvcilyZXR1cm4gcjtpZihpKHIpKXtmb3IodmFyIGU9MDtlPHIubGVuZ3RoO2UrKylyW2VdPXMocltlXSk7cmV0dXJuIHJ9fXJldHVybiBuKFwiXCIrcil9ZXhwb3J0e3UgYXMganN4LGwgYXMganN4QXR0cix1IGFzIGpzeERFVixzIGFzIGpzeEVzY2FwZSxhIGFzIGpzeFRlbXBsYXRlLHUgYXMganN4c307XG4vLyMgc291cmNlTWFwcGluZ1VSTD1qc3hSdW50aW1lLm1vZHVsZS5qcy5tYXBcbiIsImltcG9ydCB0eXBlIHsgU2lnbmFsIH0gZnJvbSAnQHByZWFjdC9zaWduYWxzJ1xuaW1wb3J0IHR5cGUgeyBDb21wb25lbnRDaGlsZHJlbiB9IGZyb20gJ3ByZWFjdCdcblxuaW50ZXJmYWNlIEJ1dHRvblJvd1Byb3BzIHtcbiAgY2hpbGRyZW46IENvbXBvbmVudENoaWxkcmVuXG4gIHZpc2libGU/OiBTaWduYWw8Ym9vbGVhbj5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEJ1dHRvblJvdyh7IGNoaWxkcmVuLCB2aXNpYmxlIH06IEJ1dHRvblJvd1Byb3BzKSB7XG4gIGlmICh2aXNpYmxlICYmICF2aXNpYmxlLnZhbHVlKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIHJldHVybiA8ZGl2PntjaGlsZHJlbn08L2Rpdj5cbn1cbiIsImltcG9ydCB0eXBlIHsgU2lnbmFsIH0gZnJvbSAnQHByZWFjdC9zaWduYWxzJ1xuXG5pbnRlcmZhY2UgU2V0dGluZ0J1dHRvblByb3BzPFQ+IHtcbiAgbGFiZWw6IHN0cmluZ1xuICBzZXR0aW5nOiBTaWduYWw8VD5cbiAgb3B0aW9uczogcmVhZG9ubHkgVFtdXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTZXR0aW5nQnV0dG9uPFQ+KHsgbGFiZWwsIHNldHRpbmcsIG9wdGlvbnMgfTogU2V0dGluZ0J1dHRvblByb3BzPFQ+KSB7XG4gIGNvbnN0IGhhbmRsZUNsaWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IGN1cnJlbnRJbmRleCA9IG9wdGlvbnMuaW5kZXhPZihzZXR0aW5nLnZhbHVlKVxuICAgIGNvbnN0IG5leHRJbmRleCA9IChjdXJyZW50SW5kZXggKyAxKSAlIG9wdGlvbnMubGVuZ3RoXG4gICAgc2V0dGluZy52YWx1ZSA9IG9wdGlvbnNbbmV4dEluZGV4XVxuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8YnV0dG9uIG9uQ2xpY2s9e2hhbmRsZUNsaWNrfSB0eXBlPVwiYnV0dG9uXCI+XG4gICAgICB7bGFiZWx9OiB7U3RyaW5nKHNldHRpbmcudmFsdWUpfVxuICAgIDwvYnV0dG9uPlxuICApXG59XG4iLCJpbXBvcnQgdHlwZSB7IFNpZ25hbCB9IGZyb20gJ0BwcmVhY3Qvc2lnbmFscydcbmltcG9ydCB7IHNldHRpbmdzIH0gZnJvbSAnLi4vc2V0dGluZ3Mvc2V0dGluZ3NTdG9yZSdcbmltcG9ydCB7IEJ1dHRvblJvdyB9IGZyb20gJy4vQnV0dG9uUm93J1xuaW1wb3J0IHsgU2V0dGluZ0J1dHRvbiB9IGZyb20gJy4vU2V0dGluZ0J1dHRvbidcblxuaW50ZXJmYWNlIENvbnRyb2xQYW5lbFByb3BzIHtcbiAgYm9hcmRDaGFuZ2VkOiBTaWduYWw8bnVtYmVyPlxufVxuXG5jb25zdCBTUEVBS19SQVRFX09QVElPTlMgPSBbMC4yLCAwLjUsIDAuNywgMS4wLCAxLjEsIDEuMl0gYXMgY29uc3RcbmNvbnN0IFRPR0dMRV9PUFRJT05TID0gW2ZhbHNlLCB0cnVlXSBhcyBjb25zdFxuXG5leHBvcnQgZnVuY3Rpb24gQ29udHJvbFBhbmVsKHsgYm9hcmRDaGFuZ2VkIH06IENvbnRyb2xQYW5lbFByb3BzKSB7XG4gIC8vIFVzZSBib2FyZENoYW5nZWQgdG8gZW5zdXJlIGNvbXBvbmVudCByZS1yZW5kZXJzIHdoZW4gYm9hcmQgY2hhbmdlc1xuICBib2FyZENoYW5nZWQudmFsdWVcblxuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICA8QnV0dG9uUm93PlxuICAgICAgICA8U2V0dGluZ0J1dHRvblxuICAgICAgICAgIGxhYmVsPVwiU3BlYWsgUmF0ZVwiXG4gICAgICAgICAgc2V0dGluZz17c2V0dGluZ3Muc3BlYWtSYXRlfVxuICAgICAgICAgIG9wdGlvbnM9e1NQRUFLX1JBVEVfT1BUSU9OU31cbiAgICAgICAgLz5cbiAgICAgICAgPFNldHRpbmdCdXR0b25cbiAgICAgICAgICBsYWJlbD1cIlBpZWNlcyBMaXN0XCJcbiAgICAgICAgICBzZXR0aW5nPXtzZXR0aW5ncy5waWVjZXNMaXN0RW5hYmxlZH1cbiAgICAgICAgICBvcHRpb25zPXtUT0dHTEVfT1BUSU9OU31cbiAgICAgICAgLz5cbiAgICAgICAgPFNldHRpbmdCdXR0b25cbiAgICAgICAgICBsYWJlbD1cIkRpdmlkZXJzXCJcbiAgICAgICAgICBzZXR0aW5nPXtzZXR0aW5ncy5kaXZpZGVyc0VuYWJsZWR9XG4gICAgICAgICAgb3B0aW9ucz17VE9HR0xFX09QVElPTlN9XG4gICAgICAgIC8+XG4gICAgICAgIDxTZXR0aW5nQnV0dG9uXG4gICAgICAgICAgbGFiZWw9XCJDdXN0b20gQm9hcmRcIlxuICAgICAgICAgIHNldHRpbmc9e3NldHRpbmdzLmN1c3RvbUJvYXJkRW5hYmxlZH1cbiAgICAgICAgICBvcHRpb25zPXtUT0dHTEVfT1BUSU9OU31cbiAgICAgICAgLz5cbiAgICAgICAgPFNldHRpbmdCdXR0b25cbiAgICAgICAgICBsYWJlbD1cIkZsYXNoIE1vZGVcIlxuICAgICAgICAgIHNldHRpbmc9e3NldHRpbmdzLmZsYXNoTW9kZUVuYWJsZWR9XG4gICAgICAgICAgb3B0aW9ucz17VE9HR0xFX09QVElPTlN9XG4gICAgICAgIC8+XG4gICAgICA8L0J1dHRvblJvdz5cbiAgICA8L2Rpdj5cbiAgKVxufVxuIiwiaW1wb3J0IHR5cGUgeyBTaWduYWwgfSBmcm9tICdAcHJlYWN0L3NpZ25hbHMtY29yZSdcbmltcG9ydCB7IHJlbmRlciB9IGZyb20gJ3ByZWFjdCdcbmltcG9ydCB7IENvbnRyb2xQYW5lbCB9IGZyb20gJy4vQ29udHJvbFBhbmVsJ1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUm9vdChib2FyZENoYW5nZWQ6IFNpZ25hbDxudW1iZXI+LCBtb3VudFBvaW50OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICByZW5kZXIoPENvbnRyb2xQYW5lbCBib2FyZENoYW5nZWQ9e2JvYXJkQ2hhbmdlZH0gLz4sIG1vdW50UG9pbnQpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXN0cm95Um9vdChtb3VudFBvaW50OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICByZW5kZXIobnVsbCwgbW91bnRQb2ludClcbn1cbiIsImltcG9ydCB0eXBlIHsgU2lnbmFsIH0gZnJvbSAnQHByZWFjdC9zaWduYWxzLWNvcmUnXG5pbXBvcnQgeyBEb21TZWxlY3RvciB9IGZyb20gJy4uL2NvbnN0YW50cydcbmltcG9ydCB7IHF1ZXJ5U2VsZWN0b3IgfSBmcm9tICcuL2RvbSdcblxuZXhwb3J0IGludGVyZmFjZSBCb2FyZE9ic2VydmVyU3RhdGUge1xuICBvYnNlcnZlcjogTXV0YXRpb25PYnNlcnZlclxuICBib2FyZENoYW5nZWQ6IFNpZ25hbDxudW1iZXI+XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVCb2FyZE9ic2VydmVyKGJvYXJkQ2hhbmdlZDogU2lnbmFsPG51bWJlcj4pOiBCb2FyZE9ic2VydmVyU3RhdGUge1xuICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICBib2FyZENoYW5nZWQudmFsdWUgKz0gMVxuICB9KVxuXG4gIHJldHVybiB7IG9ic2VydmVyLCBib2FyZENoYW5nZWQgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RhcnRCb2FyZE9ic2VydmVyKHN0YXRlOiBCb2FyZE9ic2VydmVyU3RhdGUpOiB2b2lkIHtcbiAgY29uc3QgYm9hcmQgPSBxdWVyeVNlbGVjdG9yKERvbVNlbGVjdG9yLkJPQVJEKVxuICBpZiAoIWJvYXJkKSByZXR1cm5cblxuICBzdGF0ZS5vYnNlcnZlci5vYnNlcnZlKGJvYXJkLCB7XG4gICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgIGF0dHJpYnV0ZXM6IHRydWUsXG4gICAgc3VidHJlZTogdHJ1ZSxcbiAgfSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0b3BCb2FyZE9ic2VydmVyKHN0YXRlOiBCb2FyZE9ic2VydmVyU3RhdGUpOiB2b2lkIHtcbiAgc3RhdGUub2JzZXJ2ZXIuZGlzY29ubmVjdCgpXG59XG4iLCJpbXBvcnQgeyBDc3NDbGFzcywgQ3NzRGlzcGxheSwgRG9tU2VsZWN0b3IgfSBmcm9tICcuLi8uLi9jb25zdGFudHMnXG5pbXBvcnQgeyBhcHBlbmRDaGlsZCwgY3JlYXRlU3ZnRWxlbWVudCwgcXVlcnlTZWxlY3RvciB9IGZyb20gJy4uL2RvbSdcblxuZXhwb3J0IGludGVyZmFjZSBEaXZpZGVyc1N0YXRlIHtcbiAgc3ZnOiBTVkdTVkdFbGVtZW50XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVEaXZpZGVycygpOiBEaXZpZGVyc1N0YXRlIHtcbiAgY29uc3QgYm9hcmQgPSBxdWVyeVNlbGVjdG9yKERvbVNlbGVjdG9yLkJPQVJEKVxuICBpZiAoIWJvYXJkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdCb2FyZCBub3QgZm91bmQnKVxuICB9XG5cbiAgY29uc3QgcmVjdCA9IGJvYXJkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gIGNvbnN0IHNpemUgPSByZWN0LndpZHRoXG5cbiAgY29uc3Qgc3ZnID0gY3JlYXRlU3ZnRWxlbWVudCgnc3ZnJykgYXMgU1ZHU1ZHRWxlbWVudFxuICBzdmcuc2V0QXR0cmlidXRlKCdjbGFzcycsIENzc0NsYXNzLlVTRVJTQ1JJUFRfRElWSURFUlMpXG4gIHN2Zy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgc2l6ZS50b1N0cmluZygpKVxuICBzdmcuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBzaXplLnRvU3RyaW5nKCkpXG4gIHN2Zy5zdHlsZS5jc3NUZXh0ID0gYFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDA7XG4gICAgbGVmdDogMDtcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICBkaXNwbGF5OiBub25lO1xuICBgXG5cbiAgLy8gVmVydGljYWwgbGluZVxuICBjb25zdCB2TGluZSA9IGNyZWF0ZVN2Z0VsZW1lbnQoJ2xpbmUnKVxuICB2TGluZS5zZXRBdHRyaWJ1dGUoJ3gxJywgKHNpemUgLyAyKS50b1N0cmluZygpKVxuICB2TGluZS5zZXRBdHRyaWJ1dGUoJ3kxJywgJzAnKVxuICB2TGluZS5zZXRBdHRyaWJ1dGUoJ3gyJywgKHNpemUgLyAyKS50b1N0cmluZygpKVxuICB2TGluZS5zZXRBdHRyaWJ1dGUoJ3kyJywgc2l6ZS50b1N0cmluZygpKVxuICB2TGluZS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsICdyZWQnKVxuICB2TGluZS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS13aWR0aCcsICcyJylcblxuICAvLyBIb3Jpem9udGFsIGxpbmVcbiAgY29uc3QgaExpbmUgPSBjcmVhdGVTdmdFbGVtZW50KCdsaW5lJylcbiAgaExpbmUuc2V0QXR0cmlidXRlKCd4MScsICcwJylcbiAgaExpbmUuc2V0QXR0cmlidXRlKCd5MScsIChzaXplIC8gMikudG9TdHJpbmcoKSlcbiAgaExpbmUuc2V0QXR0cmlidXRlKCd4MicsIHNpemUudG9TdHJpbmcoKSlcbiAgaExpbmUuc2V0QXR0cmlidXRlKCd5MicsIChzaXplIC8gMikudG9TdHJpbmcoKSlcbiAgaExpbmUuc2V0QXR0cmlidXRlKCdzdHJva2UnLCAncmVkJylcbiAgaExpbmUuc2V0QXR0cmlidXRlKCdzdHJva2Utd2lkdGgnLCAnMicpXG5cbiAgYXBwZW5kQ2hpbGQoc3ZnLCB2TGluZSlcbiAgYXBwZW5kQ2hpbGQoc3ZnLCBoTGluZSlcblxuICBhcHBlbmRDaGlsZChib2FyZCwgc3ZnKVxuXG4gIHJldHVybiB7IHN2ZyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93RGl2aWRlcnMoc3RhdGU6IERpdmlkZXJzU3RhdGUpOiB2b2lkIHtcbiAgc3RhdGUuc3ZnLnN0eWxlLmRpc3BsYXkgPSBDc3NEaXNwbGF5LkJMT0NLXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoaWRlRGl2aWRlcnMoc3RhdGU6IERpdmlkZXJzU3RhdGUpOiB2b2lkIHtcbiAgc3RhdGUuc3ZnLnN0eWxlLmRpc3BsYXkgPSBDc3NEaXNwbGF5Lk5PTkVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlc3Ryb3lEaXZpZGVycyhzdGF0ZTogRGl2aWRlcnNTdGF0ZSk6IHZvaWQge1xuICBzdGF0ZS5zdmcucmVtb3ZlKClcbn1cbiIsImltcG9ydCB7IENzc0NsYXNzLCBDc3NEaXNwbGF5LCBEb21TZWxlY3RvciB9IGZyb20gJy4uLy4uL2NvbnN0YW50cydcbmltcG9ydCB7IGFwcGVuZENoaWxkLCBjcmVhdGVEaXYsIHF1ZXJ5U2VsZWN0b3IgfSBmcm9tICcuLi9kb20nXG5cbmV4cG9ydCBpbnRlcmZhY2UgRmxhc2hPdmVybGF5U3RhdGUge1xuICBvdmVybGF5OiBIVE1MRWxlbWVudFxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRmxhc2hPdmVybGF5KCk6IEZsYXNoT3ZlcmxheVN0YXRlIHtcbiAgY29uc3Qgb3ZlcmxheSA9IGNyZWF0ZURpdigpXG4gIG92ZXJsYXkuY2xhc3NOYW1lID0gQ3NzQ2xhc3MuVVNFUlNDUklQVF9GTEFTSFxuICBvdmVybGF5LnN0eWxlLmNzc1RleHQgPSBgXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMDtcbiAgICBsZWZ0OiAwO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICBiYWNrZ3JvdW5kOiBibGFjaztcbiAgICB6LWluZGV4OiAxMDAwO1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIGBcblxuICBjb25zdCBjb250YWluZXIgPSBxdWVyeVNlbGVjdG9yKERvbVNlbGVjdG9yLkNPTlRBSU5FUilcbiAgaWYgKGNvbnRhaW5lcikge1xuICAgIGFwcGVuZENoaWxkKGNvbnRhaW5lciwgb3ZlcmxheSlcbiAgfVxuXG4gIHJldHVybiB7IG92ZXJsYXkgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvd0ZsYXNoKHN0YXRlOiBGbGFzaE92ZXJsYXlTdGF0ZSk6IHZvaWQge1xuICBzdGF0ZS5vdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBDc3NEaXNwbGF5LkJMT0NLXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoaWRlRmxhc2goc3RhdGU6IEZsYXNoT3ZlcmxheVN0YXRlKTogdm9pZCB7XG4gIHN0YXRlLm92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IENzc0Rpc3BsYXkuTk9ORVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVzdHJveUZsYXNoT3ZlcmxheShzdGF0ZTogRmxhc2hPdmVybGF5U3RhdGUpOiB2b2lkIHtcbiAgc3RhdGUub3ZlcmxheS5yZW1vdmUoKVxufVxuIiwiaW1wb3J0IHsgdHlwZSBEaXZpZGVyc1N0YXRlLCBoaWRlRGl2aWRlcnMsIHNob3dEaXZpZGVycyB9IGZyb20gJy4uL2RvbS9vdmVybGF5cy9kaXZpZGVycydcbmltcG9ydCB7IHNldHRpbmdzIH0gZnJvbSAnLi4vc2V0dGluZ3Mvc2V0dGluZ3NTdG9yZSdcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZURpdmlkZXJzKHN0YXRlOiBEaXZpZGVyc1N0YXRlKTogdm9pZCB7XG4gIGlmIChzZXR0aW5ncy5kaXZpZGVyc0VuYWJsZWQudmFsdWUpIHtcbiAgICBzaG93RGl2aWRlcnMoc3RhdGUpXG4gIH0gZWxzZSB7XG4gICAgaGlkZURpdmlkZXJzKHN0YXRlKVxuICB9XG59XG4iLCJpbXBvcnQgeyBlZmZlY3QgfSBmcm9tICdAcHJlYWN0L3NpZ25hbHMtY29yZSdcbmltcG9ydCB0eXBlIHsgRGl2aWRlcnNTdGF0ZSB9IGZyb20gJy4uL2RvbS9vdmVybGF5cy9kaXZpZGVycydcbmltcG9ydCB7IHVwZGF0ZURpdmlkZXJzIH0gZnJvbSAnLi4vaGFuZGxlcnMvdXBkYXRlRGl2aWRlcnMnXG5pbXBvcnQgeyBzZXR0aW5ncyB9IGZyb20gJy4uL3NldHRpbmdzL3NldHRpbmdzU3RvcmUnXG5cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cERpdmlkZXJzRWZmZWN0KHN0YXRlOiBEaXZpZGVyc1N0YXRlKTogKCkgPT4gdm9pZCB7XG4gIHJldHVybiBlZmZlY3QoKCkgPT4ge1xuICAgIHNldHRpbmdzLmRpdmlkZXJzRW5hYmxlZC52YWx1ZVxuICAgIHVwZGF0ZURpdmlkZXJzKHN0YXRlKVxuICB9KVxufVxuIiwiaW1wb3J0IHsgc2lnbmFsIH0gZnJvbSAnQHByZWFjdC9zaWduYWxzLWNvcmUnXG5pbXBvcnQgeyBzZXR1cEtleWJvYXJkQ29tbWFuZHMsIHRlYXJkb3duS2V5Ym9hcmRDb21tYW5kcyB9IGZyb20gJy4vY29tbWFuZHMva2V5Ym9hcmRJbnB1dCdcbmltcG9ydCB7IGNyZWF0ZVJvb3QsIGRlc3Ryb3lSb290IH0gZnJvbSAnLi9jb21wb25lbnRzL3Jvb3QnXG5pbXBvcnQgeyBEb21TZWxlY3RvciB9IGZyb20gJy4vY29uc3RhbnRzJ1xuaW1wb3J0IHsgY3JlYXRlQm9hcmRPYnNlcnZlciwgc3RhcnRCb2FyZE9ic2VydmVyLCBzdG9wQm9hcmRPYnNlcnZlciB9IGZyb20gJy4vZG9tL2JvYXJkT2JzZXJ2ZXInXG5pbXBvcnQgeyB3YWl0Rm9yRWxlbWVudCB9IGZyb20gJy4vZG9tL2JvYXJkUmVhZGVyJ1xuaW1wb3J0IHsgYXBwZW5kQ2hpbGQsIGNyZWF0ZURpdiwgcXVlcnlTZWxlY3RvciB9IGZyb20gJy4vZG9tL2RvbSdcbmltcG9ydCB7IGNyZWF0ZURpdmlkZXJzLCBkZXN0cm95RGl2aWRlcnMgfSBmcm9tICcuL2RvbS9vdmVybGF5cy9kaXZpZGVycydcbmltcG9ydCB7IGNyZWF0ZUZsYXNoT3ZlcmxheSwgZGVzdHJveUZsYXNoT3ZlcmxheSB9IGZyb20gJy4vZG9tL292ZXJsYXlzL2ZsYXNoJ1xuaW1wb3J0IHsgc2V0dXBEaXZpZGVyc0VmZmVjdCB9IGZyb20gJy4vZWZmZWN0cy9vbkRpdmlkZXJzJ1xuaW1wb3J0IHsgbG9hZFNldHRpbmdzLCBzZXR1cEF1dG9TYXZlIH0gZnJvbSAnLi9zZXR0aW5ncy9zZXR0aW5nc1N0b3JlJ1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaW5pdCgpIHtcbiAgLy8gV2FpdCBmb3IgbGljaGVzcyB0byBsb2FkIHRoZSBib2FyZFxuICBhd2FpdCB3YWl0Rm9yRWxlbWVudChEb21TZWxlY3Rvci5LRVlCT0FSRF9NT1ZFKVxuXG4gIC8vIEluaXRpYWxpemUgc2V0dGluZ3NcbiAgbG9hZFNldHRpbmdzKClcbiAgc2V0dXBBdXRvU2F2ZSgpXG5cbiAgLy8gQ3JlYXRlIHNoYXJlZCBib2FyZCBjaGFuZ2Ugc2lnbmFsXG4gIGNvbnN0IGJvYXJkQ2hhbmdlZCA9IHNpZ25hbCgwKVxuXG4gIC8vIENyZWF0ZSBET00gc3RhdGVcbiAgY29uc3QgZmxhc2hTdGF0ZSA9IGNyZWF0ZUZsYXNoT3ZlcmxheSgpXG4gIGNvbnN0IGRpdmlkZXJzU3RhdGUgPSBjcmVhdGVEaXZpZGVycygpXG4gIGNvbnN0IGJvYXJkT2JzZXJ2ZXJTdGF0ZSA9IGNyZWF0ZUJvYXJkT2JzZXJ2ZXIoYm9hcmRDaGFuZ2VkKVxuXG4gIC8vIFN0YXJ0IG9ic2VydmVyXG4gIHN0YXJ0Qm9hcmRPYnNlcnZlcihib2FyZE9ic2VydmVyU3RhdGUpXG5cbiAgLy8gU2V0IHVwIGVmZmVjdHNcbiAgY29uc3QgY2xlYW51cERpdmlkZXJzID0gc2V0dXBEaXZpZGVyc0VmZmVjdChkaXZpZGVyc1N0YXRlKVxuXG4gIC8vIFNldCB1cCBjb21tYW5kc1xuICBzZXR1cEtleWJvYXJkQ29tbWFuZHMoKVxuXG4gIC8vIE1vdW50IFByZWFjdCBVSVxuICBjb25zdCBtb3VudFBvaW50ID0gY3JlYXRlRGl2KClcbiAgY29uc3Qga2V5Ym9hcmRNb3ZlID0gcXVlcnlTZWxlY3RvcihEb21TZWxlY3Rvci5LRVlCT0FSRF9NT1ZFKVxuICBpZiAoa2V5Ym9hcmRNb3ZlKSB7XG4gICAgYXBwZW5kQ2hpbGQoa2V5Ym9hcmRNb3ZlLCBtb3VudFBvaW50KVxuICB9XG4gIGNyZWF0ZVJvb3QoYm9hcmRDaGFuZ2VkLCBtb3VudFBvaW50KVxuXG4gIC8vIFJldHVybiBjbGVhbnVwIGZ1bmN0aW9uXG4gIHJldHVybiAoKSA9PiB7XG4gICAgY2xlYW51cERpdmlkZXJzKClcbiAgICBzdG9wQm9hcmRPYnNlcnZlcihib2FyZE9ic2VydmVyU3RhdGUpXG4gICAgZGVzdHJveUZsYXNoT3ZlcmxheShmbGFzaFN0YXRlKVxuICAgIGRlc3Ryb3lEaXZpZGVycyhkaXZpZGVyc1N0YXRlKVxuICAgIHRlYXJkb3duS2V5Ym9hcmRDb21tYW5kcygpXG4gICAgZGVzdHJveVJvb3QobW91bnRQb2ludClcbiAgfVxufVxuIiwiaW1wb3J0IHsgaW5pdCB9IGZyb20gJy4vaW5pdCdcblxuLy8gU3RhcnQgdGhlIGFwcGxpY2F0aW9uXG5pbml0KCkuY2F0Y2goY29uc29sZS5lcnJvcilcbiJdLCJ4X2dvb2dsZV9pZ25vcmVMaXN0IjpbMCwxNiwxN10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0NBQUEsSUFBSUEsTUFBRSxPQUFPLElBQUksZ0JBQWdCO0NBQUUsU0FBU0MsTUFBRztFQUFDLElBQUcsRUFBRUMsTUFBRSxJQUFHO0dBQUMsSUFBSSxHQUFFLElBQUUsQ0FBQztHQUFFLENBQUMsV0FBVTtJQUFDLElBQUksSUFBRUM7SUFBRSxNQUFFLEtBQUs7SUFBRSxPQUFNLEtBQUssTUFBSSxHQUFFO0tBQUMsSUFBRyxFQUFFLEVBQUUsTUFBSSxFQUFFLEdBQUUsRUFBRSxFQUFFLElBQUUsRUFBRTtLQUFFLElBQUUsRUFBRTtJQUFDO0dBQUMsR0FBRTtHQUFFLE9BQU0sS0FBSyxNQUFJQyxLQUFFO0lBQUMsSUFBSSxJQUFFQTtJQUFFLE1BQUUsS0FBSztJQUFFO0lBQUksT0FBTSxLQUFLLE1BQUksR0FBRTtLQUFDLElBQUksSUFBRSxFQUFFO0tBQUUsRUFBRSxJQUFFLEtBQUs7S0FBRSxFQUFFLEtBQUc7S0FBRyxJQUFHLEVBQUUsSUFBRSxFQUFFLE1BQUlDLElBQUUsQ0FBQyxHQUFFLElBQUc7TUFBQyxFQUFFLEVBQUU7S0FBQyxTQUFPLEdBQUU7TUFBQyxJQUFHLENBQUMsR0FBRTtPQUFDLElBQUU7T0FBRSxJQUFFLENBQUM7TUFBQztLQUFDO0tBQUMsSUFBRTtJQUFDO0dBQUM7R0FBQyxNQUFFO0dBQUU7R0FBSSxJQUFHLEdBQUUsTUFBTTtFQUFDLE9BQU07Q0FBRztDQUF1RSxJQUFJQyxNQUFFLEtBQUs7Q0FBRSxTQUFTQyxJQUFFLEdBQUU7RUFBQyxJQUFJLElBQUVEO0VBQUUsTUFBRSxLQUFLO0VBQUUsSUFBRztHQUFDLE9BQU8sRUFBRTtFQUFDLFVBQVE7R0FBQyxNQUFFO0VBQUM7Q0FBQztDQUFDLElBQUlFLEtBQUVKLE1BQUUsS0FBSyxHQUFFRixNQUFFLEdBQUVPLE1BQUUsR0FBTUUsTUFBRSxHQUFFUixNQUFFLEtBQUssR0FBRVMsTUFBRTtDQUFFLFNBQVNDLElBQUUsR0FBRTtFQUFDLElBQUcsS0FBSyxNQUFJUCxLQUFFO0dBQUMsSUFBSSxJQUFFLEVBQUU7R0FBRSxJQUFHLEtBQUssTUFBSSxLQUFHLEVBQUUsTUFBSUEsS0FBRTtJQUFDLElBQUU7S0FBQyxHQUFFO0tBQUUsR0FBRTtLQUFFLEdBQUVBLElBQUU7S0FBRSxHQUFFLEtBQUs7S0FBRSxHQUFFQTtLQUFFLEdBQUUsS0FBSztLQUFFLEdBQUUsS0FBSztLQUFFLEdBQUU7SUFBQztJQUFFLElBQUcsS0FBSyxNQUFJQSxJQUFFLEdBQUUsSUFBRSxFQUFFLElBQUU7SUFBRSxJQUFFLElBQUU7SUFBRSxFQUFFLElBQUU7SUFBRSxJQUFHLEtBQUdBLElBQUUsR0FBRSxFQUFFLEVBQUUsQ0FBQztJQUFFLE9BQU87R0FBQyxPQUFNLElBQUcsT0FBSyxFQUFFLEdBQUU7SUFBQyxFQUFFLElBQUU7SUFBRSxJQUFHLEtBQUssTUFBSSxFQUFFLEdBQUU7S0FBQyxFQUFFLEVBQUUsSUFBRSxFQUFFO0tBQUUsSUFBRyxLQUFLLE1BQUksRUFBRSxHQUFFLEVBQUUsRUFBRSxJQUFFLEVBQUU7S0FBRSxFQUFFLElBQUVBLElBQUU7S0FBRSxFQUFFLElBQUUsS0FBSztLQUFFLElBQUUsRUFBRSxJQUFFO0tBQUUsSUFBRSxJQUFFO0lBQUM7SUFBQyxPQUFPO0dBQUM7RUFBQztDQUFDO0NBQUMsU0FBU1EsSUFBRSxHQUFFLEdBQUU7RUFBQyxLQUFLLElBQUU7RUFBRSxLQUFLLElBQUU7RUFBRSxLQUFLLElBQUUsS0FBSztFQUFFLEtBQUssSUFBRSxLQUFLO0VBQUUsS0FBSyxJQUFFO0VBQUUsS0FBSyxJQUFFLFFBQU0sSUFBRSxLQUFLLElBQUUsRUFBRTtFQUFRLEtBQUssSUFBRSxRQUFNLElBQUUsS0FBSyxJQUFFLEVBQUU7RUFBVSxLQUFLLE9BQUssUUFBTSxJQUFFLEtBQUssSUFBRSxFQUFFO0NBQUk7Q0FBQyxJQUFFLFVBQVUsUUFBTWQ7Q0FBRSxJQUFFLFVBQVUsSUFBRSxXQUFVO0VBQUMsT0FBTSxDQUFDO0NBQUM7Q0FBRSxJQUFFLFVBQVUsSUFBRSxTQUFTLEdBQUU7RUFBQyxJQUFJLElBQUUsTUFBSyxJQUFFLEtBQUs7RUFBRSxJQUFHLE1BQUksS0FBRyxLQUFLLE1BQUksRUFBRSxHQUFFO0dBQUMsRUFBRSxJQUFFO0dBQUUsS0FBSyxJQUFFO0dBQUUsSUFBRyxLQUFLLE1BQUksR0FBRSxFQUFFLElBQUU7UUFBTyxJQUFFLFdBQVU7SUFBQyxJQUFJO0lBQUUsU0FBTyxJQUFFLEVBQUUsTUFBSSxFQUFFLEtBQUssQ0FBQztHQUFDLENBQUM7RUFBQztDQUFDO0NBQUUsSUFBRSxVQUFVLElBQUUsU0FBUyxHQUFFO0VBQUMsSUFBSSxJQUFFO0VBQUssSUFBRyxLQUFLLE1BQUksS0FBSyxHQUFFO0dBQUMsSUFBSSxJQUFFLEVBQUUsR0FBRSxJQUFFLEVBQUU7R0FBRSxJQUFHLEtBQUssTUFBSSxHQUFFO0lBQUMsRUFBRSxJQUFFO0lBQUUsRUFBRSxJQUFFLEtBQUs7R0FBQztHQUFDLElBQUcsS0FBSyxNQUFJLEdBQUU7SUFBQyxFQUFFLElBQUU7SUFBRSxFQUFFLElBQUUsS0FBSztHQUFDO0dBQUMsSUFBRyxNQUFJLEtBQUssR0FBRTtJQUFDLEtBQUssSUFBRTtJQUFFLElBQUcsS0FBSyxNQUFJLEdBQUUsSUFBRSxXQUFVO0tBQUMsSUFBSTtLQUFFLFNBQU8sSUFBRSxFQUFFLE1BQUksRUFBRSxLQUFLLENBQUM7SUFBQyxDQUFDO0dBQUM7RUFBQztDQUFDO0NBQUUsSUFBRSxVQUFVLFlBQVUsU0FBUyxHQUFFO0VBQUMsSUFBSSxJQUFFO0VBQUssT0FBT2UsSUFBRSxXQUFVO0dBQUMsSUFBSSxJQUFFLEVBQUUsT0FBTSxJQUFFVDtHQUFFLE1BQUUsS0FBSztHQUFFLElBQUc7SUFBQyxFQUFFLENBQUM7R0FBQyxVQUFRO0lBQUMsTUFBRTtHQUFDO0VBQUMsR0FBRSxFQUFDLE1BQUssTUFBSyxDQUFDO0NBQUM7Q0FBRSxJQUFFLFVBQVUsVUFBUSxXQUFVO0VBQUMsT0FBTyxLQUFLO0NBQUs7Q0FBRSxJQUFFLFVBQVUsV0FBUyxXQUFVO0VBQUMsT0FBTyxLQUFLLFFBQU07Q0FBRTtDQUFFLElBQUUsVUFBVSxTQUFPLFdBQVU7RUFBQyxPQUFPLEtBQUs7Q0FBSztDQUFFLElBQUUsVUFBVSxPQUFLLFdBQVU7RUFBQyxJQUFJLElBQUU7RUFBSyxPQUFPQyxJQUFFLFdBQVU7R0FBQyxPQUFPLEVBQUU7RUFBSyxDQUFDO0NBQUM7Q0FBRSxPQUFPLGVBQWVPLElBQUUsV0FBVSxTQUFRO0VBQUMsS0FBSSxXQUFVO0dBQUMsSUFBSSxJQUFFRCxJQUFFLElBQUk7R0FBRSxJQUFHLEtBQUssTUFBSSxHQUFFLEVBQUUsSUFBRSxLQUFLO0dBQUUsT0FBTyxLQUFLO0VBQUM7RUFBRSxLQUFJLFNBQVMsR0FBRTtHQUFDLElBQUcsTUFBSSxLQUFLLEdBQUU7SUFBQyxJQUFHSixNQUFFLEtBQUksTUFBTSxJQUFJLE1BQU0sZ0JBQWdCO0lBQUUsQ0FBQyxTQUFTLEdBQUU7S0FBQyxJQUFHLE1BQUlQLE9BQUcsTUFBSU87VUFBSyxFQUFFLE1BQUlFLEtBQUU7T0FBQyxFQUFFLElBQUVBO09BQUUsTUFBRTtRQUFDLEdBQUU7UUFBRSxHQUFFLEVBQUU7UUFBRSxHQUFFLEVBQUU7UUFBRSxHQUFFUjtPQUFDO01BQUM7O0lBQUMsR0FBRSxJQUFJO0lBQUUsS0FBSyxJQUFFO0lBQUUsS0FBSztJQUFJO0lBQUk7SUFBSSxJQUFHO0tBQUMsS0FBSSxJQUFJLElBQUUsS0FBSyxHQUFFLEtBQUssTUFBSSxHQUFFLElBQUUsRUFBRSxHQUFFLEVBQUUsRUFBRSxFQUFFO0lBQUMsVUFBUTtLQUFDLElBQUU7SUFBQztHQUFDO0VBQUM7Q0FBQyxDQUFDO0NBQUUsU0FBU2EsSUFBRSxHQUFFLEdBQUU7RUFBQyxPQUFPLElBQUlGLElBQUUsR0FBRSxDQUFDO0NBQUM7Q0FBQyxTQUFTVCxJQUFFLEdBQUU7RUFBQyxLQUFJLElBQUksSUFBRSxFQUFFLEdBQUUsS0FBSyxNQUFJLEdBQUUsSUFBRSxFQUFFLEdBQUUsSUFBRyxFQUFFLEVBQUUsTUFBSSxFQUFFLEtBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxLQUFHLEVBQUUsRUFBRSxNQUFJLEVBQUUsR0FBRSxPQUFNLENBQUM7RUFBRSxPQUFNLENBQUM7Q0FBQztDQUFDLFNBQVNZLElBQUUsR0FBRTtFQUFDLEtBQUksSUFBSSxJQUFFLEVBQUUsR0FBRSxLQUFLLE1BQUksR0FBRSxJQUFFLEVBQUUsR0FBRTtHQUFDLElBQUksSUFBRSxFQUFFLEVBQUU7R0FBRSxJQUFHLEtBQUssTUFBSSxHQUFFLEVBQUUsSUFBRTtHQUFFLEVBQUUsRUFBRSxJQUFFO0dBQUUsRUFBRSxJQUFFO0dBQUcsSUFBRyxLQUFLLE1BQUksRUFBRSxHQUFFO0lBQUMsRUFBRSxJQUFFO0lBQUU7R0FBSztFQUFDO0NBQUM7Q0FBQyxTQUFTQyxJQUFFLEdBQUU7RUFBQyxJQUFJLElBQUUsRUFBRSxHQUFFLElBQUUsS0FBSztFQUFFLE9BQU0sS0FBSyxNQUFJLEdBQUU7R0FBQyxJQUFJLElBQUUsRUFBRTtHQUFFLElBQUcsT0FBSyxFQUFFLEdBQUU7SUFBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQUUsSUFBRyxLQUFLLE1BQUksR0FBRSxFQUFFLElBQUUsRUFBRTtJQUFFLElBQUcsS0FBSyxNQUFJLEVBQUUsR0FBRSxFQUFFLEVBQUUsSUFBRTtHQUFDLE9BQU0sSUFBRTtHQUFFLEVBQUUsRUFBRSxJQUFFLEVBQUU7R0FBRSxJQUFHLEtBQUssTUFBSSxFQUFFLEdBQUUsRUFBRSxJQUFFLEtBQUs7R0FBRSxJQUFFO0VBQUM7RUFBQyxFQUFFLElBQUU7Q0FBQztDQUFDLFNBQVNDLElBQUUsR0FBRSxHQUFFO0VBQUMsSUFBRSxLQUFLLE1BQUssS0FBSyxDQUFDO0VBQUUsS0FBSyxJQUFFO0VBQUUsS0FBSyxJQUFFLEtBQUs7RUFBRSxLQUFLLElBQUVQLE1BQUU7RUFBRSxLQUFLLElBQUU7RUFBRSxLQUFLLElBQUUsUUFBTSxJQUFFLEtBQUssSUFBRSxFQUFFO0VBQVEsS0FBSyxJQUFFLFFBQU0sSUFBRSxLQUFLLElBQUUsRUFBRTtFQUFVLEtBQUssT0FBSyxRQUFNLElBQUUsS0FBSyxJQUFFLEVBQUU7Q0FBSTtDQUFDLElBQUUsWUFBVSxJQUFJRSxJQUFBQTtDQUFFLElBQUUsVUFBVSxJQUFFLFdBQVU7RUFBQyxLQUFLLEtBQUc7RUFBRyxJQUFHLElBQUUsS0FBSyxHQUFFLE9BQU0sQ0FBQztFQUFFLElBQUcsT0FBSyxLQUFHLEtBQUssSUFBRyxPQUFNLENBQUM7RUFBRSxLQUFLLEtBQUc7RUFBRyxJQUFHLEtBQUssTUFBSUYsS0FBRSxPQUFNLENBQUM7RUFBRSxLQUFLLElBQUVBO0VBQUUsS0FBSyxLQUFHO0VBQUUsSUFBRyxLQUFLLElBQUUsS0FBRyxDQUFDUCxJQUFFLElBQUksR0FBRTtHQUFDLEtBQUssS0FBRztHQUFHLE9BQU0sQ0FBQztFQUFDO0VBQUMsSUFBSSxJQUFFQztFQUFFLElBQUc7R0FBQyxJQUFFLElBQUk7R0FBRSxNQUFFO0dBQUssSUFBSSxJQUFFLEtBQUssRUFBRTtHQUFFLElBQUcsS0FBRyxLQUFLLEtBQUcsS0FBSyxNQUFJLEtBQUcsTUFBSSxLQUFLLEdBQUU7SUFBQyxLQUFLLElBQUU7SUFBRSxLQUFLLEtBQUc7SUFBSSxLQUFLO0dBQUc7RUFBQyxTQUFPLEdBQUU7R0FBQyxLQUFLLElBQUU7R0FBRSxLQUFLLEtBQUc7R0FBRyxLQUFLO0VBQUc7RUFBQyxNQUFFO0VBQUUsSUFBRSxJQUFJO0VBQUUsS0FBSyxLQUFHO0VBQUcsT0FBTSxDQUFDO0NBQUM7Q0FBRSxJQUFFLFVBQVUsSUFBRSxTQUFTLEdBQUU7RUFBQyxJQUFHLEtBQUssTUFBSSxLQUFLLEdBQUU7R0FBQyxLQUFLLEtBQUc7R0FBRyxLQUFJLElBQUksSUFBRSxLQUFLLEdBQUUsS0FBSyxNQUFJLEdBQUUsSUFBRSxFQUFFLEdBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztFQUFDO0VBQUMsSUFBRSxVQUFVLEVBQUUsS0FBSyxNQUFLLENBQUM7Q0FBQztDQUFFLElBQUUsVUFBVSxJQUFFLFNBQVMsR0FBRTtFQUFDLElBQUcsS0FBSyxNQUFJLEtBQUssR0FBRTtHQUFDLElBQUUsVUFBVSxFQUFFLEtBQUssTUFBSyxDQUFDO0dBQUUsSUFBRyxLQUFLLE1BQUksS0FBSyxHQUFFO0lBQUMsS0FBSyxLQUFHO0lBQUksS0FBSSxJQUFJLElBQUUsS0FBSyxHQUFFLEtBQUssTUFBSSxHQUFFLElBQUUsRUFBRSxHQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7R0FBQztFQUFDO0NBQUM7Q0FBRSxJQUFFLFVBQVUsSUFBRSxXQUFVO0VBQUMsSUFBRyxFQUFFLElBQUUsS0FBSyxJQUFHO0dBQUMsS0FBSyxLQUFHO0dBQUUsS0FBSSxJQUFJLElBQUUsS0FBSyxHQUFFLEtBQUssTUFBSSxHQUFFLElBQUUsRUFBRSxHQUFFLEVBQUUsRUFBRSxFQUFFO0VBQUM7Q0FBQztDQUFFLE9BQU8sZUFBZWEsSUFBRSxXQUFVLFNBQVEsRUFBQyxLQUFJLFdBQVU7RUFBQyxJQUFHLElBQUUsS0FBSyxHQUFFLE1BQU0s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QUFJLEtBQUssR0FBRSxFQUFFLEtBQUcsRUFBRTtFQUFHLE9BQU87Q0FBQztDQUFDLFNBQVMsRUFBRSxHQUFFO0VBQUMsS0FBRyxFQUFFLGNBQVksRUFBRSxXQUFXLFlBQVksQ0FBQztDQUFDO0NBQUMsU0FBUyxFQUFFLEdBQUUsR0FBRSxHQUFFO0VBQUMsSUFBSSxHQUFFLEdBQUUsR0FBRSxJQUFFLENBQUM7RUFBRSxLQUFJLEtBQUssR0FBRSxTQUFPLElBQUUsSUFBRSxFQUFFLEtBQUcsU0FBTyxJQUFFLElBQUUsRUFBRSxLQUFHLEVBQUUsS0FBRyxFQUFFO0VBQUcsSUFBRyxVQUFVLFNBQU8sTUFBSSxFQUFFLFdBQVMsVUFBVSxTQUFPLElBQUUsRUFBRSxLQUFLLFdBQVUsQ0FBQyxJQUFFLElBQUcsY0FBWSxPQUFPLEtBQUcsUUFBTSxFQUFFLGNBQWEsS0FBSSxLQUFLLEVBQUUsY0FBYSxLQUFLLE1BQUksRUFBRSxPQUFLLEVBQUUsS0FBRyxFQUFFLGFBQWE7RUFBSSxPQUFPLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxJQUFJO0NBQUM7Q0FBQyxTQUFTLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0VBQUMsSUFBSSxJQUFFO0dBQUMsTUFBSztHQUFFLE9BQU07R0FBRSxLQUFJO0dBQUUsS0FBSTtHQUFFLEtBQUk7R0FBSyxJQUFHO0dBQUssS0FBSTtHQUFFLEtBQUk7R0FBSyxLQUFJO0dBQUssYUFBWSxLQUFLO0dBQUUsS0FBSSxRQUFNLElBQUUsRUFBRUgsTUFBRTtHQUFFLEtBQUk7R0FBRyxLQUFJO0VBQUM7RUFBRSxPQUFPLFFBQU0sS0FBRyxRQUFNLEVBQUUsU0FBTyxFQUFFLE1BQU0sQ0FBQyxHQUFFO0NBQUM7Q0FBbUMsU0FBUyxFQUFFLEdBQUU7RUFBQyxPQUFPLEVBQUU7Q0FBUTtDQUFDLFNBQVMsRUFBRSxHQUFFLEdBQUU7RUFBQyxLQUFLLFFBQU0sR0FBRSxLQUFLLFVBQVE7Q0FBQztDQUFDLFNBQVMsRUFBRSxHQUFFLEdBQUU7RUFBQyxJQUFHLFFBQU0sR0FBRSxPQUFPLEVBQUUsS0FBRyxFQUFFLEVBQUUsSUFBRyxFQUFFLE1BQUksQ0FBQyxJQUFFO0VBQUssS0FBSSxJQUFJLEdBQUUsSUFBRSxFQUFFLElBQUksUUFBTyxLQUFJLElBQUcsU0FBTyxJQUFFLEVBQUUsSUFBSSxPQUFLLFFBQU0sRUFBRSxLQUFJLE9BQU8sRUFBRTtFQUFJLE9BQU0sY0FBWSxPQUFPLEVBQUUsT0FBSyxFQUFFLENBQUMsSUFBRTtDQUFJO0NBQUMsU0FBUyxFQUFFLEdBQUU7RUFBQyxJQUFHLEVBQUUsT0FBSyxFQUFFLEtBQUk7R0FBQyxJQUFJLElBQUUsRUFBRSxLQUFJLElBQUUsRUFBRSxLQUFJLElBQUUsQ0FBQyxHQUFFLElBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxDQUFDLEdBQUUsQ0FBQztHQUFFLEVBQUUsTUFBSSxFQUFFLE1BQUksR0FBRSxFQUFFLFNBQU8sRUFBRSxNQUFNLENBQUMsR0FBRSxFQUFFLEVBQUUsS0FBSSxHQUFFLEdBQUUsRUFBRSxLQUFJLEVBQUUsSUFBSSxjQUFhLEtBQUcsRUFBRSxNQUFJLENBQUMsQ0FBQyxJQUFFLE1BQUssR0FBRSxRQUFNLElBQUUsRUFBRSxDQUFDLElBQUUsR0FBRSxDQUFDLEVBQUUsS0FBRyxFQUFFLE1BQUssQ0FBQyxHQUFFLEVBQUUsTUFBSSxFQUFFLEtBQUksRUFBRSxHQUFHLElBQUksRUFBRSxPQUFLLEdBQUUsRUFBRSxHQUFFLEdBQUUsQ0FBQyxHQUFFLEVBQUUsTUFBSSxFQUFFLEtBQUcsTUFBSyxFQUFFLE9BQUssS0FBRyxFQUFFLENBQUM7RUFBQztDQUFDO0NBQUMsU0FBUyxFQUFFLEdBQUU7RUFBQyxJQUFHLFNBQU8sSUFBRSxFQUFFLE9BQUssUUFBTSxFQUFFLEtBQUksT0FBTyxFQUFFLE1BQUksRUFBRSxJQUFJLE9BQUssTUFBSyxFQUFFLElBQUksS0FBSyxTQUFTLEdBQUU7R0FBQyxJQUFHLFFBQU0sS0FBRyxRQUFNLEVBQUUsS0FBSSxPQUFPLEVBQUUsTUFBSSxFQUFFLElBQUksT0FBSyxFQUFFO0VBQUcsQ0FBQyxHQUFFLEVBQUUsQ0FBQztDQUFDO0NBQUMsU0FBUyxFQUFFLEdBQUU7RUFBQyxDQUFDLENBQUMsRUFBRSxRQUFNLEVBQUUsTUFBSSxDQUFDLE1BQUlDLElBQUUsS0FBSyxDQUFDLEtBQUcsQ0FBQyxFQUFFLFNBQU8sS0FBRyxFQUFFLHdCQUFzQixJQUFFLEVBQUUsc0JBQW9CQyxLQUFHLENBQUM7Q0FBQztDQUFDLFNBQVMsSUFBRztFQUFDLElBQUc7R0FBQyxLQUFJLElBQUksR0FBRSxJQUFFLEdBQUVELElBQUUsU0FBUSxJQUFFLFNBQU8sS0FBR0EsSUFBRSxLQUFLLENBQUMsR0FBRSxJQUFFQSxJQUFFLE1BQU0sR0FBRSxJQUFFQSxJQUFFLFFBQU8sRUFBRSxDQUFDO0VBQUMsVUFBUTtHQUFDLElBQUUsU0FBTyxFQUFFLE1BQUk7RUFBQztDQUFDO0NBQUMsU0FBUyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtFQUFDLElBQUksR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxJQUFFLEtBQUcsRUFBRSxPQUFLLEdBQUUsSUFBRSxFQUFFO0VBQU8sS0FBSSxJQUFFLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxLQUFJLFNBQU8sSUFBRSxFQUFFLElBQUksUUFBTSxJQUFFLE1BQUksRUFBRSxPQUFLLEVBQUUsRUFBRSxRQUFNLEdBQUUsRUFBRSxNQUFJLEdBQUUsSUFBRSxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsS0FBSSxFQUFFLE9BQUssRUFBRSxPQUFLLEVBQUUsUUFBTSxFQUFFLE9BQUssRUFBRSxFQUFFLEtBQUksTUFBSyxDQUFDLEdBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSSxFQUFFLE9BQUssR0FBRSxDQUFDLElBQUcsUUFBTSxLQUFHLFFBQU0sTUFBSSxJQUFFLEtBQUksSUFBRSxDQUFDLEVBQUUsSUFBRSxFQUFFLFNBQU8sRUFBRSxRQUFNLEVBQUUsT0FBSyxJQUFFLEVBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxHQUFFLEtBQUcsRUFBRSxRQUFNLEVBQUUsTUFBSSxTQUFPLGNBQVksT0FBTyxFQUFFLFFBQU0sS0FBSyxNQUFJLElBQUUsSUFBRSxJQUFFLE1BQUksSUFBRSxFQUFFLGNBQWEsRUFBRSxPQUFLO0VBQUksT0FBTyxFQUFFLE1BQUksR0FBRTtDQUFDO0NBQUMsU0FBUyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtFQUFDLElBQUksR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLElBQUUsRUFBRSxRQUFPLElBQUUsR0FBRSxJQUFFO0VBQUUsS0FBSSxFQUFFLE1BQUksSUFBSSxNQUFNLENBQUMsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLEtBQUksU0FBTyxJQUFFLEVBQUUsT0FBSyxhQUFXLE9BQU8sS0FBRyxjQUFZLE9BQU8sS0FBRyxZQUFVLE9BQU8sS0FBRyxZQUFVLE9BQU8sS0FBRyxZQUFVLE9BQU8sS0FBRyxFQUFFLGVBQWEsU0FBTyxJQUFFLEVBQUUsSUFBSSxLQUFHLEVBQUUsTUFBSyxHQUFFLE1BQUssTUFBSyxJQUFJLElBQUUsRUFBRSxDQUFDLElBQUUsSUFBRSxFQUFFLElBQUksS0FBRyxFQUFFLEdBQUUsRUFBQyxVQUFTLEVBQUMsR0FBRSxNQUFLLE1BQUssSUFBSSxJQUFFLEtBQUssTUFBSSxFQUFFLGVBQWEsRUFBRSxNQUFJLElBQUUsSUFBRSxFQUFFLElBQUksS0FBRyxFQUFFLEVBQUUsTUFBSyxFQUFFLE9BQU0sRUFBRSxLQUFJLEVBQUUsTUFBSSxFQUFFLE1BQUksTUFBSyxFQUFFLEdBQUcsSUFBRSxFQUFFLElBQUksS0FBRyxHQUFFLElBQUUsSUFBRSxHQUFFLEVBQUUsS0FBRyxHQUFFLEVBQUUsTUFBSSxFQUFFLE1BQUksR0FBRSxJQUFFLE1BQUssT0FBSyxJQUFFLEVBQUUsTUFBSSxFQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsT0FBSyxNQUFLLElBQUUsRUFBRSxRQUFNLEVBQUUsT0FBSyxLQUFJLFFBQU0sS0FBRyxRQUFNLEVBQUUsT0FBSyxNQUFJLE1BQUksSUFBRSxJQUFFLE1BQUksSUFBRSxLQUFHLE1BQUssY0FBWSxPQUFPLEVBQUUsU0FBTyxFQUFFLE9BQUssTUFBSSxLQUFHLE1BQUksS0FBRyxJQUFFLElBQUUsTUFBSSxLQUFHLElBQUUsSUFBRSxPQUFLLElBQUUsSUFBRSxNQUFJLEtBQUksRUFBRSxPQUFLLE9BQUssRUFBRSxJQUFJLEtBQUc7RUFBSyxJQUFHLEdBQUUsS0FBSSxJQUFFLEdBQUUsSUFBRSxHQUFFLEtBQUksU0FBTyxJQUFFLEVBQUUsT0FBSyxNQUFJLElBQUUsRUFBRSxTQUFPLEVBQUUsT0FBSyxNQUFJLElBQUUsRUFBRSxDQUFDLElBQUcsRUFBRSxHQUFFLENBQUM7RUFBRyxPQUFPO0NBQUM7Q0FBQyxTQUFTLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtFQUFDLElBQUksR0FBRTtFQUFFLElBQUcsY0FBWSxPQUFPLEVBQUUsTUFBSztHQUFDLEtBQUksSUFBRSxFQUFFLEtBQUksSUFBRSxHQUFFLEtBQUcsSUFBRSxFQUFFLFFBQU8sS0FBSSxFQUFFLE9BQUssRUFBRSxHQUFHLEtBQUcsR0FBRSxJQUFFLEVBQUUsRUFBRSxJQUFHLEdBQUUsR0FBRSxDQUFDO0dBQUcsT0FBTztFQUFDO0VBQUMsRUFBRSxPQUFLLE1BQUksTUFBSSxLQUFHLEVBQUUsUUFBTSxDQUFDLEVBQUUsZUFBYSxJQUFFLEVBQUUsQ0FBQyxJQUFHLEVBQUUsYUFBYSxFQUFFLEtBQUksS0FBRyxJQUFJLElBQUcsSUFBRSxFQUFFO0VBQUs7R0FBRyxJQUFFLEtBQUcsRUFBRTtTQUFrQixRQUFNLEtBQUcsS0FBRyxFQUFFO0VBQVUsT0FBTztDQUFDO0NBQTZHLFNBQVMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0VBQUMsSUFBSSxHQUFFLEdBQUUsR0FBRSxJQUFFLEVBQUUsS0FBSSxJQUFFLEVBQUUsTUFBSyxJQUFFLEVBQUUsSUFBRyxJQUFFLFFBQU0sS0FBRyxNQUFJLElBQUUsRUFBRTtFQUFLLElBQUcsU0FBTyxLQUFHLFFBQU0sS0FBRyxLQUFHLEtBQUcsRUFBRSxPQUFLLEtBQUcsRUFBRSxNQUFLLE9BQU87RUFBRSxJQUFHLEtBQUcsSUFBRSxJQUFFO1FBQU8sSUFBRSxJQUFFLEdBQUUsSUFBRSxJQUFFLEdBQUUsS0FBRyxLQUFHLElBQUUsRUFBRSxTQUFRLElBQUcsU0FBTyxJQUFFLEVBQUUsSUFBRSxLQUFHLElBQUUsTUFBSSxTQUFPLE1BQUksSUFBRSxFQUFFLFFBQU0sS0FBRyxFQUFFLE9BQUssS0FBRyxFQUFFLE1BQUssT0FBTztFQUFBO0VBQUUsT0FBTTtDQUFFO0NBQUMsU0FBUyxFQUFFLEdBQUUsR0FBRSxHQUFFO0VBQUMsT0FBSyxFQUFFLEtBQUcsRUFBRSxZQUFZLEdBQUUsUUFBTSxJQUFFLEtBQUcsQ0FBQyxJQUFFLEVBQUUsS0FBRyxRQUFNLElBQUUsS0FBRyxZQUFVLE9BQU8sS0FBRyxFQUFFLEtBQUssQ0FBQyxJQUFFLElBQUUsSUFBRTtDQUFJO0NBQUMsU0FBUyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtFQUFDLElBQUksR0FBRTtFQUFFLEdBQUUsSUFBRyxXQUFTLEdBQUUsSUFBRyxZQUFVLE9BQU8sR0FBRSxFQUFFLE1BQU0sVUFBUTtPQUFNO0dBQUMsSUFBRyxZQUFVLE9BQU8sTUFBSSxFQUFFLE1BQU0sVUFBUSxJQUFFLEtBQUksR0FBRSxLQUFJLEtBQUssR0FBRSxLQUFHLEtBQUssS0FBRyxFQUFFLEVBQUUsT0FBTSxHQUFFLEVBQUU7R0FBRSxJQUFHLEdBQUUsS0FBSSxLQUFLLEdBQUUsS0FBRyxFQUFFLE1BQUksRUFBRSxNQUFJLEVBQUUsRUFBRSxPQUFNLEdBQUUsRUFBRSxFQUFFO0VBQUM7T0FBTSxJQUFHLE9BQUssRUFBRSxNQUFJLE9BQUssRUFBRSxJQUFHLElBQUUsTUFBSSxJQUFFLEVBQUUsUUFBUSxHQUFFLElBQUksSUFBRyxJQUFFLEVBQUUsWUFBWSxHQUFFLElBQUUsS0FBSyxLQUFHLGdCQUFjLEtBQUcsZUFBYSxJQUFFLEVBQUUsTUFBTSxDQUFDLElBQUUsRUFBRSxNQUFNLENBQUMsR0FBRSxFQUFFLE1BQUksRUFBRSxJQUFFLENBQUMsSUFBRyxFQUFFLEVBQUUsSUFBRSxLQUFHLEdBQUUsSUFBRSxJQUFFLEVBQUUsS0FBRyxFQUFFLE1BQUksRUFBRSxLQUFHLEdBQUUsRUFBRSxpQkFBaUIsR0FBRSxJQUFFLElBQUUsR0FBRSxDQUFDLEtBQUcsRUFBRSxvQkFBb0IsR0FBRSxJQUFFLElBQUUsR0FBRSxDQUFDO09BQU07R0FBQyxJQUFHLGdDQUE4QixHQUFFLElBQUUsRUFBRSxRQUFRLGVBQWMsR0FBRyxFQUFFLFFBQVEsVUFBUyxHQUFHO1FBQU8sSUFBRyxXQUFTLEtBQUcsWUFBVSxLQUFHLFVBQVEsS0FBRyxVQUFRLEtBQUcsVUFBUSxLQUFHLGNBQVksS0FBRyxjQUFZLEtBQUcsYUFBVyxLQUFHLGFBQVcsS0FBRyxVQUFRLEtBQUcsYUFBVyxLQUFHLEtBQUssR0FBRSxJQUFHO0lBQUMsRUFBRSxLQUFHLFFBQU0sSUFBRSxLQUFHO0lBQUUsTUFBTTtHQUFDLFNBQU8sR0FBRSxDQUFDO0dBQUMsY0FBWSxPQUFPLE1BQUksUUFBTSxLQUFHLENBQUMsTUFBSSxLQUFHLE9BQUssRUFBRSxLQUFHLEVBQUUsZ0JBQWdCLENBQUMsSUFBRSxFQUFFLGFBQWEsR0FBRSxhQUFXLEtBQUcsS0FBRyxJQUFFLEtBQUcsQ0FBQztFQUFFO0NBQUM7Q0FBQyxTQUFTLEVBQUUsR0FBRTtFQUFDLE9BQU8sU0FBUyxHQUFFO0dBQUMsSUFBRyxLQUFLLEdBQUU7SUFBQyxJQUFJLElBQUUsS0FBSyxFQUFFLEVBQUUsT0FBSztJQUFHLElBQUcsUUFBTSxFQUFFLElBQUcsRUFBRSxLQUFHO1NBQVMsSUFBRyxFQUFFLEtBQUcsRUFBRSxJQUFHO0lBQU8sT0FBTyxFQUFFLEVBQUUsUUFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFFLENBQUM7R0FBQztFQUFDO0NBQUM7Q0FBQyxTQUFTLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtFQUFDLElBQUksR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsSUFBRSxFQUFFO0VBQUssSUFBRyxLQUFLLE1BQUksRUFBRSxhQUFZLE9BQU87RUFBSyxNQUFJLEVBQUUsUUFBTSxJQUFFLENBQUMsRUFBRSxLQUFHLEVBQUUsTUFBSyxJQUFFLENBQUMsSUFBRSxFQUFFLE1BQUksRUFBRSxHQUFHLEtBQUksSUFBRSxFQUFFLFFBQU0sRUFBRSxDQUFDO0VBQUUsR0FBRSxJQUFHLGNBQVksT0FBTyxHQUFFLElBQUc7R0FBQyxJQUFHLElBQUUsRUFBRSxPQUFNLElBQUUsRUFBRSxhQUFXLEVBQUUsVUFBVSxRQUFPLEtBQUcsSUFBRSxFQUFFLGdCQUFjLEVBQUUsRUFBRSxNQUFLLElBQUUsSUFBRSxJQUFFLEVBQUUsTUFBTSxRQUFNLEVBQUUsS0FBRyxHQUFFLEVBQUUsTUFBSSxJQUFFLENBQUMsSUFBRSxFQUFFLE1BQUksRUFBRSxLQUFLLEtBQUcsRUFBRSxPQUFLLElBQUUsRUFBRSxNQUFJLElBQUUsSUFBSSxFQUFFLEdBQUUsQ0FBQyxLQUFHLEVBQUUsTUFBSSxJQUFFLElBQUksRUFBRSxHQUFFLENBQUMsR0FBRSxFQUFFLGNBQVksR0FBRSxFQUFFLFNBQU8sSUFBRyxLQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUUsRUFBRSxVQUFRLEVBQUUsUUFBTSxDQUFDLElBQUcsRUFBRSxNQUFJLEdBQUUsSUFBRSxFQUFFLE1BQUksQ0FBQyxHQUFFLEVBQUUsTUFBSSxDQUFDLEdBQUUsRUFBRSxNQUFJLENBQUMsSUFBRyxLQUFHLFFBQU0sRUFBRSxRQUFNLEVBQUUsTUFBSSxFQUFFLFFBQU8sS0FBRyxRQUFNLEVBQUUsNkJBQTJCLEVBQUUsT0FBSyxFQUFFLFVBQVEsRUFBRSxNQUFJLEVBQUUsQ0FBQyxHQUFFLEVBQUUsR0FBRyxJQUFHLEVBQUUsRUFBRSxLQUFJLEVBQUUseUJBQXlCLEdBQUUsRUFBRSxHQUFHLENBQUMsSUFBRyxJQUFFLEVBQUUsT0FBTSxJQUFFLEVBQUUsT0FBTSxFQUFFLE1BQUksR0FBRSxHQUFFLEtBQUcsUUFBTSxFQUFFLDRCQUEwQixRQUFNLEVBQUUsc0JBQW9CLEVBQUUsbUJBQW1CLEdBQUUsS0FBRyxRQUFNLEVBQUUscUJBQW1CLEVBQUUsSUFBSSxLQUFLLEVBQUUsaUJBQWlCO1FBQU07SUFBQyxJQUFHLEtBQUcsUUFBTSxFQUFFLDRCQUEwQixNQUFJLEtBQUcsUUFBTSxFQUFFLDZCQUEyQixFQUFFLDBCQUEwQixHQUFFLENBQUMsR0FBRSxFQUFFLE9BQUssRUFBRSxPQUFLLENBQUMsRUFBRSxPQUFLLFFBQU0sRUFBRSx5QkFBdUIsQ0FBQyxNQUFJLEVBQUUsc0JBQXNCLEdBQUUsRUFBRSxLQUFJLENBQUMsR0FBRTtLQUFDLEVBQUUsT0FBSyxFQUFFLFFBQU0sRUFBRSxRQUFNLEdBQUUsRUFBRSxRQUFNLEVBQUUsS0FBSSxFQUFFLE1BQUksQ0FBQyxJQUFHLEVBQUUsTUFBSSxFQUFFLEtBQUksRUFBRSxNQUFJLEVBQUUsS0FBSSxFQUFFLElBQUksS0FBSyxTQUFTLEdBQUU7TUFBQyxNQUFJLEVBQUUsS0FBRztLQUFFLENBQUMsR0FBRSxFQUFFLEtBQUssTUFBTSxFQUFFLEtBQUksRUFBRSxHQUFHLEdBQUUsRUFBRSxNQUFJLENBQUMsR0FBRSxFQUFFLElBQUksVUFBUSxFQUFFLEtBQUssQ0FBQztLQUFFLE1BQU07SUFBQztJQUFDLFFBQU0sRUFBRSx1QkFBcUIsRUFBRSxvQkFBb0IsR0FBRSxFQUFFLEtBQUksQ0FBQyxHQUFFLEtBQUcsUUFBTSxFQUFFLHNCQUFvQixFQUFFLElBQUksS0FBSyxXQUFVO0tBQUMsRUFBRSxtQkFBbUIsR0FBRSxHQUFFLENBQUM7SUFBQyxDQUFDO0dBQUM7R0FBQyxJQUFHLEVBQUUsVUFBUSxHQUFFLEVBQUUsUUFBTSxHQUFFLEVBQUUsTUFBSSxHQUFFLEVBQUUsTUFBSSxDQUFDLEdBQUUsSUFBRSxFQUFFLEtBQUksSUFBRSxHQUFFLEdBQUUsRUFBRSxRQUFNLEVBQUUsS0FBSSxFQUFFLE1BQUksQ0FBQyxHQUFFLEtBQUcsRUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFNLEVBQUUsT0FBTSxFQUFFLE9BQU8sR0FBRSxFQUFFLEtBQUssTUFBTSxFQUFFLEtBQUksRUFBRSxHQUFHLEdBQUUsRUFBRSxNQUFJLENBQUM7UUFBTztJQUFHLEVBQUUsTUFBSSxDQUFDLEdBQUUsS0FBRyxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU0sRUFBRSxPQUFNLEVBQUUsT0FBTyxHQUFFLEVBQUUsUUFBTSxFQUFFO1VBQVUsRUFBRSxPQUFLLEVBQUUsSUFBRTtHQUFJLEVBQUUsUUFBTSxFQUFFLEtBQUksUUFBTSxFQUFFLG9CQUFrQixJQUFFLEVBQUUsRUFBRSxDQUFDLEdBQUUsQ0FBQyxHQUFFLEVBQUUsZ0JBQWdCLENBQUMsSUFBRyxLQUFHLENBQUMsS0FBRyxRQUFNLEVBQUUsNEJBQTBCLElBQUUsRUFBRSx3QkFBd0IsR0FBRSxDQUFDLElBQUcsSUFBRSxRQUFNLEtBQUcsRUFBRSxTQUFPLEtBQUcsUUFBTSxFQUFFLE1BQUksRUFBRSxFQUFFLE1BQU0sUUFBUSxJQUFFLEdBQUUsSUFBRSxFQUFFLEdBQUUsRUFBRSxDQUFDLElBQUUsSUFBRSxDQUFDLENBQUMsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxHQUFFLEVBQUUsT0FBSyxFQUFFLEtBQUksRUFBRSxPQUFLLE1BQUssRUFBRSxJQUFJLFVBQVEsRUFBRSxLQUFLLENBQUMsR0FBRSxNQUFJLEVBQUUsTUFBSSxFQUFFLEtBQUc7RUFBSyxTQUFPLEdBQUU7R0FBQyxJQUFHLEVBQUUsTUFBSSxNQUFLLEtBQUcsUUFBTSxHQUFFLElBQUcsRUFBRSxNQUFLO0lBQUMsS0FBSSxFQUFFLE9BQUssSUFBRSxNQUFJLEtBQUksS0FBRyxLQUFHLEVBQUUsWUFBVSxFQUFFLGNBQWEsSUFBRSxFQUFFO0lBQVksRUFBRSxFQUFFLFFBQVEsQ0FBQyxLQUFHLE1BQUssRUFBRSxNQUFJO0dBQUMsT0FBSztJQUFDLEtBQUksSUFBRSxFQUFFLFFBQU8sTUFBSyxFQUFFLEVBQUUsRUFBRTtJQUFFLEVBQUUsQ0FBQztHQUFDO1FBQU0sRUFBRSxNQUFJLEVBQUUsS0FBSSxFQUFFLE1BQUksRUFBRSxLQUFJLEVBQUUsUUFBTSxFQUFFLENBQUM7R0FBRSxFQUFFLElBQUksR0FBRSxHQUFFLENBQUM7RUFBQztPQUFNLFFBQU0sS0FBRyxFQUFFLE9BQUssRUFBRSxPQUFLLEVBQUUsTUFBSSxFQUFFLEtBQUksRUFBRSxNQUFJLEVBQUUsT0FBSyxJQUFFLEVBQUUsTUFBSSxFQUFFLEVBQUUsS0FBSSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7RUFBRSxRQUFPLElBQUUsRUFBRSxXQUFTLEVBQUUsQ0FBQyxHQUFFLE1BQUksRUFBRSxNQUFJLEtBQUssSUFBRTtDQUFDO0NBQUMsU0FBUyxFQUFFLEdBQUU7RUFBQyxNQUFJLEVBQUUsUUFBTSxFQUFFLElBQUksTUFBSSxDQUFDLElBQUcsRUFBRSxPQUFLLEVBQUUsSUFBSSxLQUFLLENBQUM7Q0FBRTtDQUFDLFNBQVMsRUFBRSxHQUFFLEdBQUUsR0FBRTtFQUFDLEtBQUksSUFBSSxJQUFFLEdBQUUsSUFBRSxFQUFFLFFBQU8sS0FBSSxFQUFFLEVBQUUsSUFBRyxFQUFFLEVBQUUsSUFBRyxFQUFFLEVBQUUsRUFBRTtFQUFFLEVBQUUsT0FBSyxFQUFFLElBQUksR0FBRSxDQUFDLEdBQUUsRUFBRSxLQUFLLFNBQVMsR0FBRTtHQUFDLElBQUc7SUFBQyxJQUFFLEVBQUUsS0FBSSxFQUFFLE1BQUksQ0FBQyxHQUFFLEVBQUUsS0FBSyxTQUFTLEdBQUU7S0FBQyxFQUFFLEtBQUssQ0FBQztJQUFDLENBQUM7R0FBQyxTQUFPLEdBQUU7SUFBQyxFQUFFLElBQUksR0FBRSxFQUFFLEdBQUc7R0FBQztFQUFDLENBQUM7Q0FBQztDQUFDLFNBQVMsRUFBRSxHQUFFO0VB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QUUsRUFBRSxJQUFHLENBQUMsR0FBRSxJQUFFLFdBQVUsUUFBTSxLQUFHLEtBQUcsRUFBRSxNQUFJLEVBQUUsR0FBRSxHQUFFLEdBQUUsRUFBRSxJQUFHLENBQUM7RUFBRTtFQUFDLE9BQU87Q0FBQztDQUFDLFNBQVMsRUFBRSxHQUFFLEdBQUUsR0FBRTtFQUFDLElBQUc7R0FBQyxJQUFHLGNBQVksT0FBTyxHQUFFO0lBQUMsSUFBSSxJQUFFLGNBQVksT0FBTyxFQUFFO0lBQUksS0FBRyxFQUFFLElBQUksR0FBRSxLQUFHLFFBQU0sTUFBSSxFQUFFLE1BQUksRUFBRSxDQUFDO0dBQUUsT0FBTSxFQUFFLFVBQVE7RUFBQyxTQUFPLEdBQUU7R0FBQyxFQUFFLElBQUksR0FBRSxDQUFDO0VBQUM7Q0FBQztDQUFDLFNBQVMsRUFBRSxHQUFFLEdBQUUsR0FBRTtFQUFDLElBQUksR0FBRTtFQUFFLElBQUcsRUFBRSxXQUFTLEVBQUUsUUFBUSxDQUFDLElBQUcsSUFBRSxFQUFFLFNBQU8sRUFBRSxXQUFTLEVBQUUsV0FBUyxFQUFFLE9BQUssRUFBRSxHQUFFLE1BQUssQ0FBQyxJQUFHLFNBQU8sSUFBRSxFQUFFLE1BQUs7R0FBQyxJQUFHLEVBQUUsc0JBQXFCLElBQUc7SUFBQyxFQUFFLHFCQUFxQjtHQUFDLFNBQU8sR0FBRTtJQUFDLEVBQUUsSUFBSSxHQUFFLENBQUM7R0FBQztHQUFDLEVBQUUsT0FBSyxFQUFFLE1BQUk7RUFBSTtFQUFDLElBQUcsSUFBRSxFQUFFLEtBQUksS0FBSSxJQUFFLEdBQUUsSUFBRSxFQUFFLFFBQU8sS0FBSSxFQUFFLE1BQUksRUFBRSxFQUFFLElBQUcsR0FBRSxLQUFHLGNBQVksT0FBTyxFQUFFLElBQUk7RUFBRSxLQUFHLEVBQUUsRUFBRSxHQUFHLEdBQUUsRUFBRSxNQUFJLEVBQUUsS0FBRyxFQUFFLE1BQUksS0FBSztDQUFDO0NBQUMsU0FBUyxFQUFFLEdBQUUsR0FBRSxHQUFFO0VBQUMsT0FBTyxLQUFLLFlBQVksR0FBRSxDQUFDO0NBQUM7Q0FBQyxTQUFTLEVBQUUsR0FB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