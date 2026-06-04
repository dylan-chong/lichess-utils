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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGljaGVzcy1ib2FyZC1zcGVha2VyLnVzZXIuanMiLCJuYW1lcyI6WyJpIiwidCIsInMiLCJjIiwiaCIsInciLCJyIiwibyIsImYiLCJ2IiwidSIsImUiLCJkIiwiYSIsImwiLCJqIiwieSIsIl8iLCJiIiwicCIsIlMiLCJtIiwieCIsIkUiLCJ1IiwiaSIsIm8iLCJmIiwibCIsInIiXSwic291cmNlcyI6WyJub2RlX21vZHVsZXMvQHByZWFjdC9zaWduYWxzLWNvcmUvZGlzdC9zaWduYWxzLWNvcmUubW9kdWxlLmpzIiwic3JjL2NvbnN0YW50cy9jaGVzcy50cyIsInNyYy9jb25zdGFudHMvY29tbWFuZHMudHMiLCJzcmMvY29uc3RhbnRzL2RvbS50cyIsInNyYy9wbGF0Zm9ybS9zcGVlY2hBcGkudHMiLCJzcmMvYnJvd3Nlci9zcGVlY2hTeW50aGVzaXplci50cyIsInNyYy9wbGF0Zm9ybS9kb20udHMiLCJzcmMvcHVyZS9jb29yZGluYXRlcy50cyIsInNyYy9kb20vYm9hcmRSZWFkZXIudHMiLCJzcmMvcHVyZS9waWVjZUdyb3VwaW5nLnRzIiwic3JjL3B1cmUvc3BlZWNoVGV4dC50cyIsInNyYy9zZXR0aW5ncy9kZWZhdWx0cy50cyIsInNyYy9zZXR0aW5ncy9zdG9yYWdlLnRzIiwic3JjL3NldHRpbmdzL3NldHRpbmdzU3RvcmUudHMiLCJzcmMvaGFuZGxlcnMvaGFuZGxlU3BlZWNoQ29tbWFuZC50cyIsInNyYy9jb21tYW5kcy9rZXlib2FyZElucHV0LnRzIiwibm9kZV9tb2R1bGVzL3ByZWFjdC9kaXN0L3ByZWFjdC5tb2R1bGUuanMiLCJub2RlX21vZHVsZXMvcHJlYWN0L2pzeC1ydW50aW1lL2Rpc3QvanN4UnVudGltZS5tb2R1bGUuanMiLCJzcmMvY29tcG9uZW50cy9CdXR0b25Sb3cudHN4Iiwic3JjL2NvbXBvbmVudHMvU2V0dGluZ0J1dHRvbi50c3giLCJzcmMvY29tcG9uZW50cy9Db250cm9sUGFuZWwudHN4Iiwic3JjL2NvbXBvbmVudHMvcm9vdC50c3giLCJzcmMvZG9tL2JvYXJkT2JzZXJ2ZXIudHMiLCJzcmMvZG9tL292ZXJsYXlzL2RpdmlkZXJzLnRzIiwic3JjL2RvbS9vdmVybGF5cy9mbGFzaC50cyIsInNyYy9oYW5kbGVycy91cGRhdGVEaXZpZGVycy50cyIsInNyYy9lZmZlY3RzL29uRGl2aWRlcnMudHMiLCJzcmMvaW5pdC50c3giLCJzcmMvbWFpbi50c3giXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGk9U3ltYm9sLmZvcihcInByZWFjdC1zaWduYWxzXCIpO2Z1bmN0aW9uIHQoKXtpZighKHM+MSkpe3ZhciBpLHQ9ITE7IWZ1bmN0aW9uKCl7dmFyIGk9YztjPXZvaWQgMDt3aGlsZSh2b2lkIDAhPT1pKXtpZihpLlMudj09PWkudilpLlMuaT1pLmk7aT1pLm99fSgpO3doaWxlKHZvaWQgMCE9PWgpe3ZhciBuPWg7aD12b2lkIDA7disrO3doaWxlKHZvaWQgMCE9PW4pe3ZhciByPW4udTtuLnU9dm9pZCAwO24uZiY9LTM7aWYoISg4Jm4uZikmJncobikpdHJ5e24uYygpfWNhdGNoKG4pe2lmKCF0KXtpPW47dD0hMH19bj1yfX12PTA7cy0tO2lmKHQpdGhyb3cgaX1lbHNlIHMtLX1mdW5jdGlvbiBuKGkpe2lmKHM+MClyZXR1cm4gaSgpO2U9Kyt1O3MrKzt0cnl7cmV0dXJuIGkoKX1maW5hbGx5e3QoKX19dmFyIHI9dm9pZCAwO2Z1bmN0aW9uIG8oaSl7dmFyIHQ9cjtyPXZvaWQgMDt0cnl7cmV0dXJuIGkoKX1maW5hbGx5e3I9dH19dmFyIGYsaD12b2lkIDAscz0wLHY9MCx1PTAsZT0wLGM9dm9pZCAwLGQ9MDtmdW5jdGlvbiBhKGkpe2lmKHZvaWQgMCE9PXIpe3ZhciB0PWkubjtpZih2b2lkIDA9PT10fHx0LnQhPT1yKXt0PXtpOjAsUzppLHA6ci5zLG46dm9pZCAwLHQ6cixlOnZvaWQgMCx4OnZvaWQgMCxyOnR9O2lmKHZvaWQgMCE9PXIucylyLnMubj10O3Iucz10O2kubj10O2lmKDMyJnIuZilpLlModCk7cmV0dXJuIHR9ZWxzZSBpZigtMT09PXQuaSl7dC5pPTA7aWYodm9pZCAwIT09dC5uKXt0Lm4ucD10LnA7aWYodm9pZCAwIT09dC5wKXQucC5uPXQubjt0LnA9ci5zO3Qubj12b2lkIDA7ci5zLm49dDtyLnM9dH1yZXR1cm4gdH19fWZ1bmN0aW9uIGwoaSx0KXt0aGlzLnY9aTt0aGlzLmk9MDt0aGlzLm49dm9pZCAwO3RoaXMudD12b2lkIDA7dGhpcy5sPTA7dGhpcy5XPW51bGw9PXQ/dm9pZCAwOnQud2F0Y2hlZDt0aGlzLlo9bnVsbD09dD92b2lkIDA6dC51bndhdGNoZWQ7dGhpcy5uYW1lPW51bGw9PXQ/dm9pZCAwOnQubmFtZX1sLnByb3RvdHlwZS5icmFuZD1pO2wucHJvdG90eXBlLmg9ZnVuY3Rpb24oKXtyZXR1cm4hMH07bC5wcm90b3R5cGUuUz1mdW5jdGlvbihpKXt2YXIgdD10aGlzLG49dGhpcy50O2lmKG4hPT1pJiZ2b2lkIDA9PT1pLmUpe2kueD1uO3RoaXMudD1pO2lmKHZvaWQgMCE9PW4pbi5lPWk7ZWxzZSBvKGZ1bmN0aW9uKCl7dmFyIGk7bnVsbD09KGk9dC5XKXx8aS5jYWxsKHQpfSl9fTtsLnByb3RvdHlwZS5VPWZ1bmN0aW9uKGkpe3ZhciB0PXRoaXM7aWYodm9pZCAwIT09dGhpcy50KXt2YXIgbj1pLmUscj1pLng7aWYodm9pZCAwIT09bil7bi54PXI7aS5lPXZvaWQgMH1pZih2b2lkIDAhPT1yKXtyLmU9bjtpLng9dm9pZCAwfWlmKGk9PT10aGlzLnQpe3RoaXMudD1yO2lmKHZvaWQgMD09PXIpbyhmdW5jdGlvbigpe3ZhciBpO251bGw9PShpPXQuWil8fGkuY2FsbCh0KX0pfX19O2wucHJvdG90eXBlLnN1YnNjcmliZT1mdW5jdGlvbihpKXt2YXIgdD10aGlzO3JldHVybiBqKGZ1bmN0aW9uKCl7dmFyIG49dC52YWx1ZSxvPXI7cj12b2lkIDA7dHJ5e2kobil9ZmluYWxseXtyPW99fSx7bmFtZTpcInN1YlwifSl9O2wucHJvdG90eXBlLnZhbHVlT2Y9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy52YWx1ZX07bC5wcm90b3R5cGUudG9TdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy52YWx1ZStcIlwifTtsLnByb3RvdHlwZS50b0pTT049ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy52YWx1ZX07bC5wcm90b3R5cGUucGVlaz1mdW5jdGlvbigpe3ZhciBpPXRoaXM7cmV0dXJuIG8oZnVuY3Rpb24oKXtyZXR1cm4gaS52YWx1ZX0pfTtPYmplY3QuZGVmaW5lUHJvcGVydHkobC5wcm90b3R5cGUsXCJ2YWx1ZVwiLHtnZXQ6ZnVuY3Rpb24oKXt2YXIgaT1hKHRoaXMpO2lmKHZvaWQgMCE9PWkpaS5pPXRoaXMuaTtyZXR1cm4gdGhpcy52fSxzZXQ6ZnVuY3Rpb24oaSl7aWYoaSE9PXRoaXMudil7aWYodj4xMDApdGhyb3cgbmV3IEVycm9yKFwiQ3ljbGUgZGV0ZWN0ZWRcIik7IWZ1bmN0aW9uKGkpe2lmKDAhPT1zJiYwPT09dilpZihpLmwhPT1lKXtpLmw9ZTtjPXtTOmksdjppLnYsaTppLmksbzpjfX19KHRoaXMpO3RoaXMudj1pO3RoaXMuaSsrO2QrKztzKys7dHJ5e2Zvcih2YXIgbj10aGlzLnQ7dm9pZCAwIT09bjtuPW4ueCluLnQuTigpfWZpbmFsbHl7dCgpfX19fSk7ZnVuY3Rpb24geShpLHQpe3JldHVybiBuZXcgbChpLHQpfWZ1bmN0aW9uIHcoaSl7Zm9yKHZhciB0PWkuczt2b2lkIDAhPT10O3Q9dC5uKWlmKHQuUy5pIT09dC5pfHwhdC5TLmgoKXx8dC5TLmkhPT10LmkpcmV0dXJuITA7cmV0dXJuITF9ZnVuY3Rpb24gXyhpKXtmb3IodmFyIHQ9aS5zO3ZvaWQgMCE9PXQ7dD10Lm4pe3ZhciBuPXQuUy5uO2lmKHZvaWQgMCE9PW4pdC5yPW47dC5TLm49dDt0Lmk9LTE7aWYodm9pZCAwPT09dC5uKXtpLnM9dDticmVha319fWZ1bmN0aW9uIGIoaSl7dmFyIHQ9aS5zLG49dm9pZCAwO3doaWxlKHZvaWQgMCE9PXQpe3ZhciByPXQucDtpZigtMT09PXQuaSl7dC5TLlUodCk7aWYodm9pZCAwIT09cilyLm49dC5uO2lmKHZvaWQgMCE9PXQubil0Lm4ucD1yfWVsc2Ugbj10O3QuUy5uPXQucjtpZih2b2lkIDAhPT10LnIpdC5yPXZvaWQgMDt0PXJ9aS5zPW59ZnVuY3Rpb24gcChpLHQpe2wuY2FsbCh0aGlzLHZvaWQgMCk7dGhpcy54PWk7dGhpcy5zPXZvaWQgMDt0aGlzLmc9ZC0xO3RoaXMuZj00O3RoaXMuVz1udWxsPT10P3ZvaWQgMDp0LndhdGNoZWQ7dGhpcy5aPW51bGw9PXQ/dm9pZCAwOnQudW53YXRjaGVkO3RoaXMubmFtZT1udWxsPT10P3ZvaWQgMDp0Lm5hbWV9cC5wcm90b3R5cGU9bmV3IGw7cC5wcm90b3R5cGUuaD1mdW5jdGlvbigpe3RoaXMuZiY9LTM7aWYoMSZ0aGlzLmYpcmV0dXJuITE7aWYoMzI9PSgzNiZ0aGlzLmYpKXJldHVybiEwO3RoaXMuZiY9LTU7aWYodGhpcy5nPT09ZClyZXR1cm4hMDt0aGlzLmc9ZDt0aGlzLmZ8PTE7aWYodGhpcy5pPjAmJiF3KHRoaXMpKXt0aGlzLmYmPS0yO3JldHVybiEwfXZhciBpPXI7dHJ5e18odGhpcyk7cj10aGlzO3ZhciB0PXRoaXMueCgpO2lmKDE2JnRoaXMuZnx8dGhpcy52IT09dHx8MD09PXRoaXMuaSl7dGhpcy52PXQ7dGhpcy5mJj0tMTc7dGhpcy5pKyt9fWNhdGNoKGkpe3RoaXMudj1pO3RoaXMuZnw9MTY7dGhpcy5pKyt9cj1pO2IodGhpcyk7dGhpcy5mJj0tMjtyZXR1cm4hMH07cC5wcm90b3R5cGUuUz1mdW5jdGlvbihpKXtpZih2b2lkIDA9PT10aGlzLnQpe3RoaXMuZnw9MzY7Zm9yKHZhciB0PXRoaXMuczt2b2lkIDAhPT10O3Q9dC5uKXQuUy5TKHQpfWwucHJvdG90eXBlLlMuY2FsbCh0aGlzLGkpfTtwLnByb3RvdHlwZS5VPWZ1bmN0aW9uKGkpe2lmKHZvaWQgMCE9PXRoaXMudCl7bC5wcm90b3R5cGUuVS5jYWxsKHRoaXMsaSk7aWYodm9pZCAwPT09dGhpcy50KXt0aGlzLmYmPS0zMztmb3IodmFyIHQ9dGhpcy5zO3ZvaWQgMCE9PXQ7dD10Lm4pdC5TLlUodCl9fX07cC5wcm90b3R5cGUuTj1mdW5jdGlvbigpe2lmKCEoMiZ0aGlzLmYpKXt0aGlzLmZ8PTY7Zm9yKHZhciBpPXRoaXMudDt2b2lkIDAhPT1pO2k9aS54KWkudC5OKCl9fTtPYmplY3QuZGVmaW5lUHJvcGVydHkocC5wcm90b3R5cGUsXCJ2YWx1ZVwiLHtnZXQ6ZnVuY3Rpb24oKXtpZigxJnRoaXMuZil0aHJvdyBuZXcgRXJyb3IoXCJDeWNsZSBkZXRlY3RlZFwiKTt2YXIgaT1hKHRoaXMpO3RoaXMuaCgpO2lmKHZvaWQgMCE9PWkpaS5pPXRoaXMuaTtpZigxNiZ0aGlzLmYpdGhyb3cgdGhpcy52O3JldHVybiB0aGlzLnZ9fSk7ZnVuY3Rpb24gZyhpLHQpe3JldHVybiBuZXcgcChpLHQpfWZ1bmN0aW9uIFMoaSl7dmFyIG49aS5tO2kubT12b2lkIDA7aWYoXCJmdW5jdGlvblwiPT10eXBlb2Ygbil7cysrO3ZhciBvPXI7cj12b2lkIDA7dHJ5e24oKX1jYXRjaCh0KXtpLmYmPS0yO2kuZnw9ODttKGkpO3Rocm93IHR9ZmluYWxseXtyPW87dCgpfX19ZnVuY3Rpb24gbShpKXtmb3IodmFyIHQ9aS5zO3ZvaWQgMCE9PXQ7dD10Lm4pdC5TLlUodCk7aS54PXZvaWQgMDtpLnM9dm9pZCAwO1MoaSl9ZnVuY3Rpb24geChpKXtpZihyIT09dGhpcyl0aHJvdyBuZXcgRXJyb3IoXCJPdXQtb2Ytb3JkZXIgZWZmZWN0XCIpO2IodGhpcyk7cj1pO3RoaXMuZiY9LTI7aWYoOCZ0aGlzLmYpbSh0aGlzKTt0KCl9ZnVuY3Rpb24gRShpLHQpe3RoaXMueD1pO3RoaXMubT12b2lkIDA7dGhpcy5zPXZvaWQgMDt0aGlzLnU9dm9pZCAwO3RoaXMuZj0zMjt0aGlzLm5hbWU9bnVsbD09dD92b2lkIDA6dC5uYW1lO2lmKGYpZi5wdXNoKHRoaXMpfUUucHJvdG90eXBlLmM9ZnVuY3Rpb24oKXt2YXIgaT10aGlzLlMoKTt0cnl7aWYoOCZ0aGlzLmYpcmV0dXJuO2lmKHZvaWQgMD09PXRoaXMueClyZXR1cm47dmFyIHQ9dGhpcy54KCk7aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgdCl0aGlzLm09dH1maW5hbGx5e2koKX19O0UucHJvdG90eXBlLlM9ZnVuY3Rpb24oKXtpZigxJnRoaXMuZil0aHJvdyBuZXcgRXJyb3IoXCJDeWNsZSBkZXRlY3RlZFwiKTt0aGlzLmZ8PTE7dGhpcy5mJj0tOTtTKHRoaXMpO18odGhpcyk7cysrO3ZhciBpPXI7cj10aGlzO3JldHVybiB4LmJpbmQodGhpcyxpKX07RS5wcm90b3R5cGUuTj1mdW5jdGlvbigpe2lmKCEoMiZ0aGlzLmYpKXt0aGlzLmZ8PTI7dGhpcy51PWg7aD10aGlzfX07RS5wcm90b3R5cGUuZD1mdW5jdGlvbigpe3RoaXMuZnw9ODtpZighKDEmdGhpcy5mKSltKHRoaXMpfTtFLnByb3RvdHlwZS5kaXNwb3NlPWZ1bmN0aW9uKCl7dGhpcy5kKCl9O2Z1bmN0aW9uIGooaSx0KXt2YXIgbj1uZXcgRShpLHQpO3RyeXtuLmMoKX1jYXRjaChpKXtuLmQoKTt0aHJvdyBpfXZhciByPW4uZC5iaW5kKG4pO3JbU3ltYm9sLmRpc3Bvc2VdPXI7cmV0dXJuIHJ9ZnVuY3Rpb24gQyhpKXtyZXR1cm4gZnVuY3Rpb24oKXt2YXIgdD1hcmd1bWVudHMscj10aGlzO3JldHVybiBuKGZ1bmN0aW9uKCl7cmV0dXJuIG8oZnVuY3Rpb24oKXtyZXR1cm4gaS5hcHBseShyLFtdLnNsaWNlLmNhbGwodCkpfSl9KX19ZnVuY3Rpb24gTygpe3ZhciBpPWY7Zj1bXTtyZXR1cm4gZnVuY3Rpb24oKXt2YXIgdD1mO2lmKGYmJmkpaT1pLmNvbmNhdChmKTtmPWk7cmV0dXJuIHR9fXZhciBrPWZ1bmN0aW9uKGkpe2Zvcih2YXIgdCBpbiBpKXt2YXIgbj1pW3RdO2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIG4paVt0XT1DKG4pO2Vsc2UgaWYoXCJvYmplY3RcIj09dHlwZW9mIG4mJm51bGwhPT1uJiYhKFwiYnJhbmRcImluIG4pKWsobil9fTtmdW5jdGlvbiBUKGkpe3JldHVybiBmdW5jdGlvbigpe3ZhciB0LG4scj1PKCk7dHJ5e249aS5hcHBseSh2b2lkIDAsW10uc2xpY2UuY2FsbChhcmd1bWVudHMpKX1jYXRjaChpKXtmPXZvaWQgMDt0aHJvdyBpfWZpbmFsbHl7dD1yKCl9ayhuKTtuW1N5bWJvbC5kaXNwb3NlXT1DKGZ1bmN0aW9uKCl7aWYodClmb3IodmFyIGk9MDtpPHQubGVuZ3RoO2krKyl0W2ldLmRpc3Bvc2UoKTt0PXZvaWQgMH0pO3JldHVybiBufX1leHBvcnR7cCBhcyBDb21wdXRlZCxFIGFzIEVmZmVjdCxsIGFzIFNpZ25hbCxDIGFzIGFjdGlvbixuIGFzIGJhdGNoLGcgYXMgY29tcHV0ZWQsVCBhcyBjcmVhdGVNb2RlbCxqIGFzIGVmZmVjdCx5IGFzIHNpZ25hbCxvIGFzIHVudHJhY2tlZH07Ly8jIHNvdXJjZU1hcHBpbmdVUkw9c2lnbmFscy1jb3JlLm1vZHVsZS5qcy5tYXBcbiIsImV4cG9ydCBlbnVtIFBsYXllckNvbG9yIHtcbiAgV0hJVEUgPSAnd2hpdGUnLFxuICBCTEFDSyA9ICdibGFjaycsXG59XG5cbmV4cG9ydCBlbnVtIFBpZWNlVHlwZSB7XG4gIFBBV04gPSAncGF3bicsXG4gIEtOSUdIVCA9ICdrbmlnaHQnLFxuICBCSVNIT1AgPSAnYmlzaG9wJyxcbiAgUk9PSyA9ICdyb29rJyxcbiAgUVVFRU4gPSAncXVlZW4nLFxuICBLSU5HID0gJ2tpbmcnLFxufVxuXG5leHBvcnQgZW51bSBRdWFkcmFudCB7XG4gIFdISVRFX0tJTkcgPSAnd2snLFxuICBXSElURV9RVUVFTiA9ICd3cScsXG4gIEJMQUNLX0tJTkcgPSAnYmsnLFxuICBCTEFDS19RVUVFTiA9ICdicScsXG59XG5cbi8vIEhlbHBlciBhcnJheXMgZm9yIGl0ZXJhdGlvblxuZXhwb3J0IGNvbnN0IFBMQVlFUl9DT0xPUl9WQUxVRVMgPSBPYmplY3QudmFsdWVzKFBsYXllckNvbG9yKVxuZXhwb3J0IGNvbnN0IFBJRUNFX1RZUEVfVkFMVUVTID0gT2JqZWN0LnZhbHVlcyhQaWVjZVR5cGUpXG5leHBvcnQgY29uc3QgUVVBRFJBTlRfVkFMVUVTID0gT2JqZWN0LnZhbHVlcyhRdWFkcmFudClcbiIsImV4cG9ydCBlbnVtIEtleWJvYXJkQ29tbWFuZCB7XG4gIFBXSyA9ICdwd2snLFxuICBQV1EgPSAncHdxJyxcbiAgUEJLID0gJ3BiaycsXG4gIFBCUSA9ICdwYnEnLFxuICBQQSA9ICdwYScsXG4gIFBXVyA9ICdwd3cnLFxuICBQQkIgPSAncGJiJyxcbiAgUFNTID0gJ3BzcycsXG59XG5cbmV4cG9ydCBlbnVtIFNwZWVjaENvbW1hbmQge1xuICBBTEwgPSAnYWxsJyxcbiAgV0hJVEUgPSAnd2hpdGUnLFxuICBCTEFDSyA9ICdibGFjaycsXG4gIFNUT1AgPSAnc3RvcCcsXG4gIFdLID0gJ3drJyxcbiAgV1EgPSAnd3EnLFxuICBCSyA9ICdiaycsXG4gIEJRID0gJ2JxJyxcbn1cblxuLy8gS2V5Ym9hcmQgdG8gc3BlZWNoIGNvbW1hbmQgbWFwcGluZ1xuZXhwb3J0IGNvbnN0IEtFWUJPQVJEX0NPTU1BTkRfTUFQID0gbmV3IE1hcChbXG4gIFtLZXlib2FyZENvbW1hbmQuUFdLLCBTcGVlY2hDb21tYW5kLldLXSxcbiAgW0tleWJvYXJkQ29tbWFuZC5QV1EsIFNwZWVjaENvbW1hbmQuV1FdLFxuICBbS2V5Ym9hcmRDb21tYW5kLlBCSywgU3BlZWNoQ29tbWFuZC5CS10sXG4gIFtLZXlib2FyZENvbW1hbmQuUEJRLCBTcGVlY2hDb21tYW5kLkJRXSxcbiAgW0tleWJvYXJkQ29tbWFuZC5QQSwgU3BlZWNoQ29tbWFuZC5BTExdLFxuICBbS2V5Ym9hcmRDb21tYW5kLlBXVywgU3BlZWNoQ29tbWFuZC5XSElURV0sXG4gIFtLZXlib2FyZENvbW1hbmQuUEJCLCBTcGVlY2hDb21tYW5kLkJMQUNLXSxcbiAgW0tleWJvYXJkQ29tbWFuZC5QU1MsIFNwZWVjaENvbW1hbmQuU1RPUF0sXG5dIGFzIGNvbnN0KVxuIiwiLy8gRE9NIHNlbGVjdG9ycyBlbnVtXG5leHBvcnQgZW51bSBEb21TZWxlY3RvciB7XG4gIEJPQVJEID0gJ2NnLWJvYXJkJyxcbiAgQk9BUkRfTk9fQ1VTVE9NID0gJ2NnLWJvYXJkOm5vdCgudXNlcnNjcmlwdC1jdXN0b20tYm9hcmQpJyxcbiAgQ09PUkRTID0gJ2Nvb3JkcycsXG4gIFBJRUNFID0gJ3BpZWNlJyxcbiAgQ09OVEFJTkVSID0gJ2NnLWNvbnRhaW5lcicsXG4gIEtFWUJPQVJEX01PVkUgPSAnLmtleWJvYXJkLW1vdmUnLFxuICBLRVlCT0FSRF9JTlBVVCA9ICcua2V5Ym9hcmQtbW92ZSBpbnB1dCcsXG59XG5cbi8vIENTUyBjbGFzc2VzIGVudW1cbmV4cG9ydCBlbnVtIENzc0NsYXNzIHtcbiAgQkxBQ0sgPSAnYmxhY2snLFxuICBVU0VSU0NSSVBUX0RJVklERVJTID0gJ3VzZXJzY3JpcHQtZGl2aWRlcnMnLFxuICBVU0VSU0NSSVBUX0ZMQVNIID0gJ3VzZXJzY3JpcHQtZmxhc2gtb3ZlcmxheScsXG59XG5cbi8vIENTUyBkaXNwbGF5IHZhbHVlcyBlbnVtXG5leHBvcnQgZW51bSBDc3NEaXNwbGF5IHtcbiAgQkxPQ0sgPSAnYmxvY2snLFxuICBOT05FID0gJ25vbmUnLFxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGdldFNwZWVjaFN5bnRoZXNpcygpOiBTcGVlY2hTeW50aGVzaXMge1xuICByZXR1cm4gd2luZG93LnNwZWVjaFN5bnRoZXNpc1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3BlZWNoU3ludGhlc2lzVXR0ZXJhbmNlKCk6IHR5cGVvZiBTcGVlY2hTeW50aGVzaXNVdHRlcmFuY2Uge1xuICByZXR1cm4gU3BlZWNoU3ludGhlc2lzVXR0ZXJhbmNlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzcGVhayhzeW50aGVzaXM6IFNwZWVjaFN5bnRoZXNpcywgdXR0ZXJhbmNlOiBTcGVlY2hTeW50aGVzaXNVdHRlcmFuY2UpOiB2b2lkIHtcbiAgc3ludGhlc2lzLnNwZWFrKHV0dGVyYW5jZSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNhbmNlbChzeW50aGVzaXM6IFNwZWVjaFN5bnRoZXNpcyk6IHZvaWQge1xuICBzeW50aGVzaXMuY2FuY2VsKClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVV0dGVyYW5jZShcbiAgVXR0ZXJhbmNlQ2xhc3M6IHR5cGVvZiBTcGVlY2hTeW50aGVzaXNVdHRlcmFuY2UsXG4gIHRleHQ6IHN0cmluZ1xuKTogU3BlZWNoU3ludGhlc2lzVXR0ZXJhbmNlIHtcbiAgcmV0dXJuIG5ldyBVdHRlcmFuY2VDbGFzcyh0ZXh0KVxufVxuIiwiaW1wb3J0ICogYXMgc3BlZWNoQXBpIGZyb20gJy4uL3BsYXRmb3JtL3NwZWVjaEFwaSdcblxubGV0IGN1cnJlbnRSYXRlID0gMS4wXG5cbmV4cG9ydCBmdW5jdGlvbiBzcGVhayh0ZXh0OiBzdHJpbmcsIHJhdGU6IG51bWJlcik6IHZvaWQge1xuICBjb25zdCBzeW50aGVzaXMgPSBzcGVlY2hBcGkuZ2V0U3BlZWNoU3ludGhlc2lzKClcbiAgY29uc3QgVXR0ZXJhbmNlQ2xhc3MgPSBzcGVlY2hBcGkuZ2V0U3BlZWNoU3ludGhlc2lzVXR0ZXJhbmNlKClcbiAgY29uc3QgdXR0ZXJhbmNlID0gc3BlZWNoQXBpLmNyZWF0ZVV0dGVyYW5jZShVdHRlcmFuY2VDbGFzcywgdGV4dClcbiAgdXR0ZXJhbmNlLnJhdGUgPSByYXRlXG4gIHNwZWVjaEFwaS5zcGVhayhzeW50aGVzaXMsIHV0dGVyYW5jZSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0b3BTcGVha2luZygpOiB2b2lkIHtcbiAgY29uc3Qgc3ludGhlc2lzID0gc3BlZWNoQXBpLmdldFNwZWVjaFN5bnRoZXNpcygpXG4gIHNwZWVjaEFwaS5jYW5jZWwoc3ludGhlc2lzKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0UmF0ZShyYXRlOiBudW1iZXIpOiB2b2lkIHtcbiAgY3VycmVudFJhdGUgPSByYXRlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRSYXRlKCk6IG51bWJlciB7XG4gIHJldHVybiBjdXJyZW50UmF0ZVxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZURpdigpOiBIVE1MRGl2RWxlbWVudCB7XG4gIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU3ZnRWxlbWVudCh0YWc6IHN0cmluZyk6IFNWR0VsZW1lbnQge1xuICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsIHRhZylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3I6IHN0cmluZyk6IEVsZW1lbnQgfCBudWxsIHtcbiAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBxdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yOiBzdHJpbmcpOiBOb2RlTGlzdE9mPEVsZW1lbnQ+IHtcbiAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBlbmRDaGlsZChwYXJlbnQ6IEVsZW1lbnQsIGNoaWxkOiBFbGVtZW50KTogdm9pZCB7XG4gIHBhcmVudC5hcHBlbmRDaGlsZChjaGlsZClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEJvdW5kaW5nQ2xpZW50UmVjdChlbGVtZW50OiBFbGVtZW50KTogRE9NUmVjdCB7XG4gIHJldHVybiBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG59XG4iLCJpbXBvcnQgeyBQbGF5ZXJDb2xvciB9IGZyb20gJy4uL2NvbnN0YW50cydcblxuZXhwb3J0IGludGVyZmFjZSBQaXhlbFBvc2l0aW9uIHtcbiAgeDogbnVtYmVyXG4gIHk6IG51bWJlclxufVxuXG5jb25zdCBGSUxFUyA9ICdhYmNkZWZnaCdcblxuZXhwb3J0IGZ1bmN0aW9uIHBpeGVsc1RvU3F1YXJlKFxuICBwb3NpdGlvbjogUGl4ZWxQb3NpdGlvbixcbiAgc3F1YXJlU2l6ZTogbnVtYmVyLFxuICBwbGF5ZXJDb2xvcjogUGxheWVyQ29sb3Jcbik6IHN0cmluZyB7XG4gIC8vIENvbnZlcnQgcGl4ZWxzIHRvIGdyaWQgaW5kaWNlcyAoMC03KVxuICAvLyBBZGp1c3QgZm9yIGNlbnRlci1iYXNlZCBjb29yZGluYXRlcyBiZWZvcmUgcm91bmRpbmdcbiAgbGV0IGNvbCA9IE1hdGgucm91bmQoKHBvc2l0aW9uLnggLSBzcXVhcmVTaXplIC8gMikgLyBzcXVhcmVTaXplKVxuICBsZXQgcm93ID0gTWF0aC5yb3VuZCgocG9zaXRpb24ueSAtIHNxdWFyZVNpemUgLyAyKSAvIHNxdWFyZVNpemUpXG5cbiAgLy8gQ2xhbXAgdG8gdmFsaWQgcmFuZ2VcbiAgY29sID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oNywgY29sKSlcbiAgcm93ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oNywgcm93KSlcblxuICAvLyBDb252ZXJ0IHRvIHJhbmsgYmFzZWQgb24gcGxheWVyIGNvbG9yXG4gIC8vIEZvciB3aGl0ZTogeT0wIGlzIHJhbmsgOCwgeSBpbmNyZWFzZXMgZ29pbmcgdG8gcmFuayAxXG4gIC8vIEZvciBibGFjazogeT0wIGlzIHJhbmsgMSwgeSBpbmNyZWFzZXMgZ29pbmcgdG8gcmFuayA4XG4gIGxldCByYW5rOiBudW1iZXJcbiAgbGV0IGZpbGU6IHN0cmluZ1xuXG4gIGlmIChwbGF5ZXJDb2xvciA9PT0gUGxheWVyQ29sb3IuV0hJVEUpIHtcbiAgICBmaWxlID0gRklMRVNbY29sXVxuICAgIHJhbmsgPSA4IC0gcm93XG4gIH0gZWxzZSB7XG4gICAgZmlsZSA9IEZJTEVTWzcgLSBjb2xdXG4gICAgcmFuayA9IHJvdyArIDFcbiAgfVxuXG4gIHJldHVybiBgJHtmaWxlfSR7cmFua31gXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzcXVhcmVUb1BpeGVscyhcbiAgc3F1YXJlOiBzdHJpbmcsXG4gIHNxdWFyZVNpemU6IG51bWJlcixcbiAgcGxheWVyQ29sb3I6IFBsYXllckNvbG9yXG4pOiBQaXhlbFBvc2l0aW9uIHtcbiAgLy8gVmFsaWRhdGUgc3F1YXJlIGZvcm1hdFxuICBpZiAoc3F1YXJlLmxlbmd0aCA8IDIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgc3F1YXJlIG5vdGF0aW9uOiAke3NxdWFyZX1gKVxuICB9XG5cbiAgLy8gUGFyc2Ugc3F1YXJlIG5vdGF0aW9uXG4gIGNvbnN0IGZpbGUgPSBzcXVhcmVbMF1cbiAgY29uc3QgcmFuayA9IE51bWJlci5wYXJzZUludChzcXVhcmVbMV0sIDEwKVxuXG4gIC8vIFZhbGlkYXRlIGZpbGUgYW5kIHJhbmtcbiAgY29uc3QgY29sID0gRklMRVMuaW5kZXhPZihmaWxlKVxuICBpZiAoY29sID09PSAtMSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBmaWxlOiAke2ZpbGV9YClcbiAgfVxuICBpZiAocmFuayA8IDEgfHwgcmFuayA+IDggfHwgTnVtYmVyLmlzTmFOKHJhbmspKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHJhbms6ICR7cmFua31gKVxuICB9XG5cbiAgLy8gQ2FsY3VsYXRlIHBpeGVsIHBvc2l0aW9uIGJhc2VkIG9uIHBsYXllciBjb2xvclxuICBsZXQgcGl4ZWxDb2w6IG51bWJlclxuICBsZXQgcGl4ZWxSb3c6IG51bWJlclxuXG4gIGlmIChwbGF5ZXJDb2xvciA9PT0gUGxheWVyQ29sb3IuV0hJVEUpIHtcbiAgICAvLyBGb3Igd2hpdGU6IGZpbGVzIGdvIGxlZnQtdG8tcmlnaHQgKGEtaCksIHJhbmtzIGdvIGJvdHRvbS10by10b3AgKDEtOClcbiAgICAvLyBTbyByYW5rIDEgaXMgYXQgYm90dG9tIChyb3cgNyksIHJhbmsgOCBpcyBhdCB0b3AgKHJvdyAwKVxuICAgIHBpeGVsQ29sID0gY29sXG4gICAgcGl4ZWxSb3cgPSA4IC0gcmFua1xuICB9IGVsc2Uge1xuICAgIC8vIEZvciBibGFjazogZmlsZXMgZ28gcmlnaHQtdG8tbGVmdCAoaC1hKSwgcmFua3MgZ28gdG9wLXRvLWJvdHRvbSAoOC0xKVxuICAgIC8vIFNvIHJhbmsgOCBpcyBhdCB0b3AgKHJvdyAwKSwgcmFuayAxIGlzIGF0IGJvdHRvbSAocm93IDcpXG4gICAgcGl4ZWxDb2wgPSA3IC0gY29sXG4gICAgcGl4ZWxSb3cgPSByYW5rIC0gMVxuICB9XG5cbiAgLy8gQ29udmVydCB0byBwaXhlbHMgKGNlbnRlciBvZiBzcXVhcmUpXG4gIHJldHVybiB7XG4gICAgeDogcGl4ZWxDb2wgKiBzcXVhcmVTaXplICsgc3F1YXJlU2l6ZSAvIDIsXG4gICAgeTogcGl4ZWxSb3cgKiBzcXVhcmVTaXplICsgc3F1YXJlU2l6ZSAvIDIsXG4gIH1cbn1cbiIsImltcG9ydCB7IENzc0NsYXNzLCBEb21TZWxlY3RvciwgdHlwZSBQaWVjZVR5cGUsIFBsYXllckNvbG9yIH0gZnJvbSAnLi4vY29uc3RhbnRzJ1xuaW1wb3J0IHsgZ2V0Qm91bmRpbmdDbGllbnRSZWN0LCBxdWVyeVNlbGVjdG9yIH0gZnJvbSAnLi4vcGxhdGZvcm0vZG9tJ1xuaW1wb3J0IHsgcGl4ZWxzVG9TcXVhcmUgfSBmcm9tICcuLi9wdXJlL2Nvb3JkaW5hdGVzJ1xuaW1wb3J0IHR5cGUgeyBQaWVjZVBvc2l0aW9uIH0gZnJvbSAnLi4vcHVyZS9waWVjZUdyb3VwaW5nJ1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGxheWVyQ29sb3IoKTogUGxheWVyQ29sb3Ige1xuICBjb25zdCBjb29yZHMgPSBxdWVyeVNlbGVjdG9yKERvbVNlbGVjdG9yLkNPT1JEUylcbiAgcmV0dXJuIGNvb3Jkcz8uY2xhc3NMaXN0LmNvbnRhaW5zKENzc0NsYXNzLkJMQUNLKSA/IFBsYXllckNvbG9yLkJMQUNLIDogUGxheWVyQ29sb3IuV0hJVEVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlYWRQaWVjZVBvc2l0aW9ucygpOiBQaWVjZVBvc2l0aW9uW10ge1xuICBjb25zdCBib2FyZCA9IHF1ZXJ5U2VsZWN0b3IoRG9tU2VsZWN0b3IuQk9BUkRfTk9fQ1VTVE9NKVxuICBpZiAoIWJvYXJkKSByZXR1cm4gW11cblxuICAvLyBQYXJzZSB3aWR0aCBmcm9tIHN0eWxlIGF0dHJpYnV0ZSBzaW5jZSBnZXRCb3VuZGluZ0NsaWVudFJlY3QgbWF5IG5vdCB3b3JrIGluIHRlc3QgZW52aXJvbm1lbnRzXG4gIGNvbnN0IGJvYXJkRWxlbWVudCA9IGJvYXJkIGFzIEhUTUxFbGVtZW50XG4gIGNvbnN0IHdpZHRoTWF0Y2ggPSBib2FyZEVsZW1lbnQuc3R5bGUuY3NzVGV4dC5tYXRjaCgvd2lkdGg6XFxzKihbMC05Ll0rKXB4LylcbiAgY29uc3QgYm9hcmRXaWR0aCA9IHdpZHRoTWF0Y2hcbiAgICA/IE51bWJlci5wYXJzZUZsb2F0KHdpZHRoTWF0Y2hbMV0pXG4gICAgOiBnZXRCb3VuZGluZ0NsaWVudFJlY3QoYm9hcmQpLndpZHRoXG4gIGNvbnN0IHNxdWFyZVNpemUgPSBib2FyZFdpZHRoIC8gOFxuICBjb25zdCBwbGF5ZXJDb2xvciA9IGdldFBsYXllckNvbG9yKClcblxuICBjb25zdCBwaWVjZXMgPSBib2FyZC5xdWVyeVNlbGVjdG9yQWxsKERvbVNlbGVjdG9yLlBJRUNFKVxuICBjb25zdCBwb3NpdGlvbnM6IFBpZWNlUG9zaXRpb25bXSA9IFtdXG5cbiAgZm9yIChjb25zdCBwaWVjZSBvZiBwaWVjZXMpIHtcbiAgICAvLyBFeHRyYWN0IGNvbG9yIGFuZCB0eXBlIGZyb20gY2xhc3NcbiAgICBjb25zdCBjbGFzc2VzID0gcGllY2UuY2xhc3NOYW1lLnNwbGl0KCcgJylcbiAgICBjb25zdCBjb2xvclN0ciA9IGNsYXNzZXNbMF1cbiAgICBjb25zdCB0eXBlU3RyID0gY2xhc3Nlc1sxXVxuXG4gICAgLy8gTWFwIHRvIGVudW1zXG4gICAgY29uc3QgY29sb3IgPSBjb2xvclN0ciA9PT0gJ3doaXRlJyA/IFBsYXllckNvbG9yLldISVRFIDogUGxheWVyQ29sb3IuQkxBQ0tcbiAgICBjb25zdCB0eXBlID0gdHlwZVN0ciBhcyBQaWVjZVR5cGVcblxuICAgIC8vIEV4dHJhY3QgcG9zaXRpb24gZnJvbSB0cmFuc2Zvcm1cbiAgICBjb25zdCB0cmFuc2Zvcm0gPSAocGllY2UgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLnRyYW5zZm9ybVxuICAgIGNvbnN0IG1hdGNoID0gdHJhbnNmb3JtLm1hdGNoKC90cmFuc2xhdGVcXCgoWzAtOS5dKylweCw/XFxzKihbMC05Ll0rKXB4P1xcKS8pXG4gICAgaWYgKCFtYXRjaCkgY29udGludWVcblxuICAgIC8vIFRyYW5zZm9ybSBnaXZlcyBib3R0b20tbGVmdCBjb3JuZXIsIGNvbnZlcnQgdG8gY2VudGVyXG4gICAgY29uc3QgeCA9IE51bWJlci5wYXJzZUZsb2F0KG1hdGNoWzFdKSArIHNxdWFyZVNpemUgLyAyXG4gICAgY29uc3QgeSA9IE51bWJlci5wYXJzZUZsb2F0KG1hdGNoWzJdKSAtIHNxdWFyZVNpemUgLyAyXG5cbiAgICBjb25zdCBzcXVhcmUgPSBwaXhlbHNUb1NxdWFyZSh7IHgsIHkgfSwgc3F1YXJlU2l6ZSwgcGxheWVyQ29sb3IpXG4gICAgcG9zaXRpb25zLnB1c2goeyBzcXVhcmUsIGNvbG9yLCB0eXBlIH0pXG4gIH1cblxuICByZXR1cm4gcG9zaXRpb25zXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3YWl0Rm9yRWxlbWVudChzZWxlY3Rvcjogc3RyaW5nKTogUHJvbWlzZTxFbGVtZW50PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBxdWVyeVNlbGVjdG9yKHNlbGVjdG9yKVxuICAgIGlmIChlbGVtZW50KSB7XG4gICAgICByZXNvbHZlKGVsZW1lbnQpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBxdWVyeVNlbGVjdG9yKHNlbGVjdG9yKVxuICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpXG4gICAgICAgIHJlc29sdmUoZWxlbWVudClcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5ib2R5LCB7XG4gICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgIH0pXG4gIH0pXG59XG4iLCJpbXBvcnQgeyB0eXBlIFBpZWNlVHlwZSwgUGxheWVyQ29sb3IsIFF1YWRyYW50IH0gZnJvbSAnLi4vY29uc3RhbnRzJ1xuXG5leHBvcnQgaW50ZXJmYWNlIFBpZWNlUG9zaXRpb24ge1xuICBzcXVhcmU6IHN0cmluZ1xuICBjb2xvcjogUGxheWVyQ29sb3JcbiAgdHlwZTogUGllY2VUeXBlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaWx0ZXJRdWFkcmFudChwaWVjZXM6IFBpZWNlUG9zaXRpb25bXSwgcXVhZHJhbnQ6IFF1YWRyYW50KTogUGllY2VQb3NpdGlvbltdIHtcbiAgcmV0dXJuIHBpZWNlcy5maWx0ZXIoKHBpZWNlKSA9PiB7XG4gICAgLy8gVmFsaWRhdGUgc3F1YXJlIGZvcm1hdFxuICAgIGlmICghcGllY2Uuc3F1YXJlIHx8IHBpZWNlLnNxdWFyZS5sZW5ndGggPCAyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgc3F1YXJlIGZvcm1hdDogJHtwaWVjZS5zcXVhcmV9YClcbiAgICB9XG5cbiAgICBjb25zdCBmaWxlID0gcGllY2Uuc3F1YXJlWzBdXG4gICAgY29uc3QgcmFuayA9IE51bWJlci5wYXJzZUludChwaWVjZS5zcXVhcmVbMV0sIDEwKVxuXG4gICAgLy8gVmFsaWRhdGUgZmlsZSBhbmQgcmFua1xuICAgIGlmIChmaWxlIDwgJ2EnIHx8IGZpbGUgPiAnaCcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBmaWxlOiAke2ZpbGV9YClcbiAgICB9XG4gICAgaWYgKE51bWJlci5pc05hTihyYW5rKSB8fCByYW5rIDwgMSB8fCByYW5rID4gOCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHJhbms6ICR7cmFua31gKVxuICAgIH1cblxuICAgIC8vIERldGVybWluZSBmaWxlIHJhbmdlIChraW5nLXNpZGU6IGUtaCwgcXVlZW4tc2lkZTogYS1kKVxuICAgIGNvbnN0IGlzS2luZ1NpZGUgPSBmaWxlID49ICdlJ1xuXG4gICAgLy8gRGV0ZXJtaW5lIHJhbmsgcmFuZ2UgKHdoaXRlOiAxLTQsIGJsYWNrOiA1LTgpXG4gICAgY29uc3QgaXNXaGl0ZVJhbmtzID0gcmFuayA+PSAxICYmIHJhbmsgPD0gNFxuXG4gICAgLy8gTWF0Y2ggcXVhZHJhbnRcbiAgICBpZiAocXVhZHJhbnQgPT09IFF1YWRyYW50LldISVRFX0tJTkcpIHJldHVybiBpc0tpbmdTaWRlICYmIGlzV2hpdGVSYW5rc1xuICAgIGlmIChxdWFkcmFudCA9PT0gUXVhZHJhbnQuV0hJVEVfUVVFRU4pIHJldHVybiAhaXNLaW5nU2lkZSAmJiBpc1doaXRlUmFua3NcbiAgICBpZiAocXVhZHJhbnQgPT09IFF1YWRyYW50LkJMQUNLX0tJTkcpIHJldHVybiBpc0tpbmdTaWRlICYmICFpc1doaXRlUmFua3NcbiAgICBpZiAocXVhZHJhbnQgPT09IFF1YWRyYW50LkJMQUNLX1FVRUVOKSByZXR1cm4gIWlzS2luZ1NpZGUgJiYgIWlzV2hpdGVSYW5rc1xuXG4gICAgcmV0dXJuIGZhbHNlXG4gIH0pXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgR3JvdXBlZFBpZWNlcyB7XG4gIGNvbG9yOiBQbGF5ZXJDb2xvclxuICB0eXBlOiBzdHJpbmdcbiAgc3F1YXJlczogc3RyaW5nW11cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdyb3VwQnlDb2xvckFuZFR5cGUocGllY2VzOiBQaWVjZVBvc2l0aW9uW10pOiBHcm91cGVkUGllY2VzW10ge1xuICBjb25zdCBncm91cHMgPSBuZXcgTWFwPHN0cmluZywgR3JvdXBlZFBpZWNlcz4oKVxuXG4gIGZvciAoY29uc3QgcGllY2Ugb2YgcGllY2VzKSB7XG4gICAgLy8gVmFsaWRhdGUgcmVxdWlyZWQgcHJvcGVydGllc1xuICAgIGlmICghcGllY2Uuc3F1YXJlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BpZWNlIG1pc3Npbmcgc3F1YXJlIHByb3BlcnR5JylcbiAgICB9XG4gICAgaWYgKCFwaWVjZS5jb2xvcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQaWVjZSBtaXNzaW5nIGNvbG9yIHByb3BlcnR5JylcbiAgICB9XG4gICAgaWYgKCFwaWVjZS50eXBlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BpZWNlIG1pc3NpbmcgdHlwZSBwcm9wZXJ0eScpXG4gICAgfVxuXG4gICAgY29uc3Qga2V5ID0gYCR7cGllY2UuY29sb3J9LSR7cGllY2UudHlwZX1gXG5cbiAgICBpZiAoIWdyb3Vwcy5oYXMoa2V5KSkge1xuICAgICAgZ3JvdXBzLnNldChrZXksIHtcbiAgICAgICAgY29sb3I6IHBpZWNlLmNvbG9yLFxuICAgICAgICB0eXBlOiBwaWVjZS50eXBlLFxuICAgICAgICBzcXVhcmVzOiBbXSxcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZ3JvdXBzLmdldChrZXkpPy5zcXVhcmVzLnB1c2gocGllY2Uuc3F1YXJlKVxuICB9XG5cbiAgLy8gU29ydCBncm91cHMgYnkgY29sb3IgKHdoaXRlIGZpcnN0KSB0aGVuIHR5cGVcbiAgcmV0dXJuIEFycmF5LmZyb20oZ3JvdXBzLnZhbHVlcygpKS5zb3J0KChhLCBiKSA9PiB7XG4gICAgaWYgKGEuY29sb3IgIT09IGIuY29sb3IpIHtcbiAgICAgIHJldHVybiBhLmNvbG9yID09PSBQbGF5ZXJDb2xvci5XSElURSA/IC0xIDogMVxuICAgIH1cbiAgICByZXR1cm4gYS50eXBlLmxvY2FsZUNvbXBhcmUoYi50eXBlKVxuICB9KVxufVxuIiwiaW1wb3J0IHsgdHlwZSBQaWVjZVBvc2l0aW9uLCBncm91cEJ5Q29sb3JBbmRUeXBlIH0gZnJvbSAnLi9waWVjZUdyb3VwaW5nJ1xuXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVRdWFkcmFudFRleHQocGllY2VzOiBQaWVjZVBvc2l0aW9uW10pOiBzdHJpbmcge1xuICBpZiAocGllY2VzLmxlbmd0aCA9PT0gMCkgcmV0dXJuICcnXG5cbiAgY29uc3QgZ3JvdXBzID0gZ3JvdXBCeUNvbG9yQW5kVHlwZShwaWVjZXMpXG4gIGNvbnN0IHNlbnRlbmNlczogc3RyaW5nW10gPSBbXVxuXG4gIGZvciAoY29uc3QgZ3JvdXAgb2YgZ3JvdXBzKSB7XG4gICAgY29uc3QgY29sb3JOYW1lID0gZ3JvdXAuY29sb3JcbiAgICBjb25zdCB0eXBlTmFtZSA9IGdyb3VwLnNxdWFyZXMubGVuZ3RoID4gMSA/IGAke2dyb3VwLnR5cGV9c2AgOiBncm91cC50eXBlXG5cbiAgICBpZiAoZ3JvdXAuc3F1YXJlcy5sZW5ndGggPiAxKSB7XG4gICAgICAvLyBNdWx0aXBsZSBwaWVjZXM6IFwid2hpdGUgcGF3bnMgb24gYTIsIGIyXCJcbiAgICAgIGNvbnN0IHNxdWFyZXMgPSBncm91cC5zcXVhcmVzLmpvaW4oJywgJylcbiAgICAgIHNlbnRlbmNlcy5wdXNoKGAke2NvbG9yTmFtZX0gJHt0eXBlTmFtZX0gb24gJHtzcXVhcmVzfWApXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFNpbmdsZSBwaWVjZTogXCJlMSB3aGl0ZSBraW5nXCJcbiAgICAgIHNlbnRlbmNlcy5wdXNoKGAke2dyb3VwLnNxdWFyZXNbMF19ICR7Y29sb3JOYW1lfSAke2dyb3VwLnR5cGV9YClcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYCR7c2VudGVuY2VzLmpvaW4oJy4gJyl9LmBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlQWxsUGllY2VzVGV4dChwaWVjZXM6IFBpZWNlUG9zaXRpb25bXSk6IHN0cmluZyB7XG4gIHJldHVybiBnZW5lcmF0ZVF1YWRyYW50VGV4dChwaWVjZXMpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZUNvbG9yVGV4dChwaWVjZXM6IFBpZWNlUG9zaXRpb25bXSwgY29sb3I6ICd3aGl0ZScgfCAnYmxhY2snKTogc3RyaW5nIHtcbiAgY29uc3QgZmlsdGVyZWQgPSBwaWVjZXMuZmlsdGVyKChwKSA9PiBwLmNvbG9yID09PSBjb2xvcilcbiAgcmV0dXJuIGdlbmVyYXRlUXVhZHJhbnRUZXh0KGZpbHRlcmVkKVxufVxuIiwiaW1wb3J0IHR5cGUgeyBTZXR0aW5ncyB9IGZyb20gJy4vdHlwZXMnXG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0U2V0dGluZ3M6IFNldHRpbmdzID0ge1xuICBzcGVha1JhdGU6IDAuNSxcbiAgcGllY2VzTGlzdEVuYWJsZWQ6IGZhbHNlLFxuICBkaXZpZGVyc0VuYWJsZWQ6IGZhbHNlLFxuICBjdXN0b21Cb2FyZEVuYWJsZWQ6IGZhbHNlLFxuICBvYmZ1c2NhdGlvbnNFbmFibGVkOiBmYWxzZSxcbiAgcGFyYWxsYXg6IDAsXG4gIGhvdmVyTW9kZTogJ29mZicsXG4gIHBpZWNlU3R5bGU6ICdpY29ucycsXG4gIGJsdXI6IDAsXG4gIGJsYWNrU2VnbWVudHM6ICdub25lJyxcbiAgYmxhY2tTZWdtZW50c1RpbWluZzogJ3JvdGF0ZS0xMHMnLFxuICBmbGFzaE1vZGVFbmFibGVkOiBmYWxzZSxcbiAgZmxhc2hEdXJhdGlvbjogMSxcbiAgZmxhc2hJbnRlcnZhbDogMyxcbn1cbiIsIi8qKlxuICogV3JhcHBlciBtb2R1bGUgZm9yIGxvY2FsU3RvcmFnZSB0byBhbGxvdyBtb2NraW5nIHdpdGggc2ltb25lXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEl0ZW0oa2V5OiBzdHJpbmcpOiBzdHJpbmcgfCBudWxsIHtcbiAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEl0ZW0oa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCB2YWx1ZSlcbn1cbiIsImltcG9ydCB7IGVmZmVjdCwgc2lnbmFsIH0gZnJvbSAnQHByZWFjdC9zaWduYWxzLWNvcmUnXG5pbXBvcnQgeyBkZWZhdWx0U2V0dGluZ3MgfSBmcm9tICcuL2RlZmF1bHRzJ1xuaW1wb3J0ICogYXMgc3RvcmFnZSBmcm9tICcuL3N0b3JhZ2UnXG5pbXBvcnQgdHlwZSB7IFNldHRpbmdzIH0gZnJvbSAnLi90eXBlcydcblxuY29uc3QgU1RPUkFHRV9LRVkgPSAnbGljaGVzcy1ib2FyZC1zcGVha2VyLXNldHRpbmdzJ1xuXG5leHBvcnQgY29uc3Qgc2V0dGluZ3MgPSB7XG4gIHNwZWFrUmF0ZTogc2lnbmFsKGRlZmF1bHRTZXR0aW5ncy5zcGVha1JhdGUpLFxuICBwaWVjZXNMaXN0RW5hYmxlZDogc2lnbmFsKGRlZmF1bHRTZXR0aW5ncy5waWVjZXNMaXN0RW5hYmxlZCksXG4gIGRpdmlkZXJzRW5hYmxlZDogc2lnbmFsKGRlZmF1bHRTZXR0aW5ncy5kaXZpZGVyc0VuYWJsZWQpLFxuICBjdXN0b21Cb2FyZEVuYWJsZWQ6IHNpZ25hbChkZWZhdWx0U2V0dGluZ3MuY3VzdG9tQm9hcmRFbmFibGVkKSxcbiAgb2JmdXNjYXRpb25zRW5hYmxlZDogc2lnbmFsKGRlZmF1bHRTZXR0aW5ncy5vYmZ1c2NhdGlvbnNFbmFibGVkKSxcbiAgcGFyYWxsYXg6IHNpZ25hbChkZWZhdWx0U2V0dGluZ3MucGFyYWxsYXgpLFxuICBob3Zlck1vZGU6IHNpZ25hbChkZWZhdWx0U2V0dGluZ3MuaG92ZXJNb2RlKSxcbiAgcGllY2VTdHlsZTogc2lnbmFsKGRlZmF1bHRTZXR0aW5ncy5waWVjZVN0eWxlKSxcbiAgYmx1cjogc2lnbmFsKGRlZmF1bHRTZXR0aW5ncy5ibHVyKSxcbiAgYmxhY2tTZWdtZW50czogc2lnbmFsKGRlZmF1bHRTZXR0aW5ncy5ibGFja1NlZ21lbnRzKSxcbiAgYmxhY2tTZWdtZW50c1RpbWluZzogc2lnbmFsKGRlZmF1bHRTZXR0aW5ncy5ibGFja1NlZ21lbnRzVGltaW5nKSxcbiAgZmxhc2hNb2RlRW5hYmxlZDogc2lnbmFsKGRlZmF1bHRTZXR0aW5ncy5mbGFzaE1vZGVFbmFibGVkKSxcbiAgZmxhc2hEdXJhdGlvbjogc2lnbmFsKGRlZmF1bHRTZXR0aW5ncy5mbGFzaER1cmF0aW9uKSxcbiAgZmxhc2hJbnRlcnZhbDogc2lnbmFsKGRlZmF1bHRTZXR0aW5ncy5mbGFzaEludGVydmFsKSxcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRTZXR0aW5ncygpOiB2b2lkIHtcbiAgY29uc3Qgc3RvcmVkID0gc3RvcmFnZS5nZXRJdGVtKFNUT1JBR0VfS0VZKVxuICBpZiAoIXN0b3JlZCkgcmV0dXJuXG5cbiAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2Uoc3RvcmVkKSBhcyBQYXJ0aWFsPFNldHRpbmdzPlxuICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhkYXRhKSkge1xuICAgIGNvbnN0IHNldHRpbmdLZXkgPSBrZXkgYXMga2V5b2YgU2V0dGluZ3NcbiAgICBpZiAoc2V0dGluZ3Nbc2V0dGluZ0tleV0pIHtcbiAgICAgIC8vIGJpb21lLWlnbm9yZSBsaW50L3N1c3BpY2lvdXMvbm9FeHBsaWNpdEFueTogU2V0dGluZ3MgdHlwZSBpcyBkeW5hbWljXG4gICAgICBzZXR0aW5nc1tzZXR0aW5nS2V5XS52YWx1ZSA9IGRhdGFbc2V0dGluZ0tleV0gYXMgYW55XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzYXZlU2V0dGluZ3MoKTogdm9pZCB7XG4gIGNvbnN0IGRhdGE6IFBhcnRpYWw8U2V0dGluZ3M+ID0ge31cbiAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoc2V0dGluZ3MpKSB7XG4gICAgY29uc3Qgc2V0dGluZ0tleSA9IGtleSBhcyBrZXlvZiB0eXBlb2Ygc2V0dGluZ3NcbiAgICAvLyBiaW9tZS1pZ25vcmUgbGludC9zdXNwaWNpb3VzL25vRXhwbGljaXRBbnk6IFNldHRpbmdzIHR5cGUgaXMgZHluYW1pY1xuICAgIGRhdGFbc2V0dGluZ0tleV0gPSBzZXR0aW5nc1tzZXR0aW5nS2V5XS52YWx1ZSBhcyBhbnlcbiAgfVxuICBzdG9yYWdlLnNldEl0ZW0oU1RPUkFHRV9LRVksIEpTT04uc3RyaW5naWZ5KGRhdGEpKVxufVxuXG4vLyBBdXRvLXNhdmUgZWZmZWN0IChzaG91bGQgYmUgY2FsbGVkIG9uY2UgZHVyaW5nIGFwcCBpbml0aWFsaXphdGlvbilcbmV4cG9ydCBmdW5jdGlvbiBzZXR1cEF1dG9TYXZlKCk6IHZvaWQge1xuICBlZmZlY3QoKCkgPT4ge1xuICAgIGZvciAoY29uc3QgcyBvZiBPYmplY3QudmFsdWVzKHNldHRpbmdzKSkge1xuICAgICAgcy52YWx1ZVxuICAgIH1cbiAgICBzYXZlU2V0dGluZ3MoKVxuICB9KVxufVxuIiwiaW1wb3J0IHsgc3BlYWssIHN0b3BTcGVha2luZyB9IGZyb20gJy4uL2Jyb3dzZXIvc3BlZWNoU3ludGhlc2l6ZXInXG5pbXBvcnQgeyBQbGF5ZXJDb2xvciwgdHlwZSBRdWFkcmFudCwgU3BlZWNoQ29tbWFuZCB9IGZyb20gJy4uL2NvbnN0YW50cydcbmltcG9ydCB7IHJlYWRQaWVjZVBvc2l0aW9ucyB9IGZyb20gJy4uL2RvbS9ib2FyZFJlYWRlcidcbmltcG9ydCB7IGZpbHRlclF1YWRyYW50IH0gZnJvbSAnLi4vcHVyZS9waWVjZUdyb3VwaW5nJ1xuaW1wb3J0IHsgZ2VuZXJhdGVBbGxQaWVjZXNUZXh0LCBnZW5lcmF0ZUNvbG9yVGV4dCwgZ2VuZXJhdGVRdWFkcmFudFRleHQgfSBmcm9tICcuLi9wdXJlL3NwZWVjaFRleHQnXG5pbXBvcnQgeyBzZXR0aW5ncyB9IGZyb20gJy4uL3NldHRpbmdzL3NldHRpbmdzU3RvcmUnXG5cbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVTcGVlY2hDb21tYW5kKGNvbW1hbmQ6IHN0cmluZyk6IHZvaWQge1xuICBpZiAoY29tbWFuZCA9PT0gU3BlZWNoQ29tbWFuZC5TVE9QKSB7XG4gICAgc3RvcFNwZWFraW5nKClcbiAgICByZXR1cm5cbiAgfVxuXG4gIGNvbnN0IHBpZWNlcyA9IHJlYWRQaWVjZVBvc2l0aW9ucygpXG5cbiAgaWYgKGNvbW1hbmQgPT09IFNwZWVjaENvbW1hbmQuQUxMKSB7XG4gICAgY29uc3QgdGV4dCA9IGdlbmVyYXRlQWxsUGllY2VzVGV4dChwaWVjZXMpXG4gICAgc3BlYWsodGV4dCwgc2V0dGluZ3Muc3BlYWtSYXRlLnZhbHVlKVxuICAgIHJldHVyblxuICB9XG5cbiAgaWYgKGNvbW1hbmQgPT09IFNwZWVjaENvbW1hbmQuV0hJVEUgfHwgY29tbWFuZCA9PT0gU3BlZWNoQ29tbWFuZC5CTEFDSykge1xuICAgIGNvbnN0IGNvbG9yID0gY29tbWFuZCA9PT0gU3BlZWNoQ29tbWFuZC5XSElURSA/IFBsYXllckNvbG9yLldISVRFIDogUGxheWVyQ29sb3IuQkxBQ0tcbiAgICBjb25zdCB0ZXh0ID0gZ2VuZXJhdGVDb2xvclRleHQocGllY2VzLCBjb2xvcilcbiAgICBzcGVhayh0ZXh0LCBzZXR0aW5ncy5zcGVha1JhdGUudmFsdWUpXG4gICAgcmV0dXJuXG4gIH1cblxuICAvLyBRdWFkcmFudCBjb21tYW5kczogd2ssIHdxLCBiaywgYnFcbiAgY29uc3QgcXVhZHJhbnQgPSBjb21tYW5kIGFzIFF1YWRyYW50XG4gIGNvbnN0IGZpbHRlcmVkID0gZmlsdGVyUXVhZHJhbnQocGllY2VzLCBxdWFkcmFudClcbiAgY29uc3QgdGV4dCA9IGdlbmVyYXRlUXVhZHJhbnRUZXh0KGZpbHRlcmVkKVxuICBzcGVhayh0ZXh0LCBzZXR0aW5ncy5zcGVha1JhdGUudmFsdWUpXG59XG4iLCJpbXBvcnQgeyBEb21TZWxlY3RvciwgS0VZQk9BUkRfQ09NTUFORF9NQVAsIHR5cGUgS2V5Ym9hcmRDb21tYW5kIH0gZnJvbSAnLi4vY29uc3RhbnRzJ1xuaW1wb3J0IHsgaGFuZGxlU3BlZWNoQ29tbWFuZCB9IGZyb20gJy4uL2hhbmRsZXJzL2hhbmRsZVNwZWVjaENvbW1hbmQnXG5pbXBvcnQgeyBxdWVyeVNlbGVjdG9yIH0gZnJvbSAnLi4vcGxhdGZvcm0vZG9tJ1xuXG5pbnRlcmZhY2UgSW5wdXRFbGVtZW50V2l0aENsZWFudXAgZXh0ZW5kcyBIVE1MSW5wdXRFbGVtZW50IHtcbiAgX19rZXlib2FyZENvbW1hbmRDbGVhbnVwPzogKCkgPT4gdm9pZFxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBLZXlib2FyZENvbW1hbmRzKCk6IHZvaWQge1xuICBjb25zdCBpbnB1dCA9IHF1ZXJ5U2VsZWN0b3IoRG9tU2VsZWN0b3IuS0VZQk9BUkRfSU5QVVQpIGFzIElucHV0RWxlbWVudFdpdGhDbGVhbnVwIHwgbnVsbFxuICBpZiAoIWlucHV0KSByZXR1cm5cblxuICBjb25zdCBoYW5kbGVJbnB1dCA9IChlOiBFdmVudCkgPT4ge1xuICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnRcbiAgICBjb25zdCB2YWx1ZSA9IHRhcmdldC52YWx1ZVxuXG4gICAgLy8gQ2hlY2sgZm9yIHNwZWVjaCBjb21tYW5kc1xuICAgIGNvbnN0IGNvbW1hbmQgPSBLRVlCT0FSRF9DT01NQU5EX01BUC5nZXQodmFsdWUgYXMgS2V5Ym9hcmRDb21tYW5kKVxuICAgIGlmIChjb21tYW5kKSB7XG4gICAgICBoYW5kbGVTcGVlY2hDb21tYW5kKGNvbW1hbmQpXG4gICAgICB0YXJnZXQudmFsdWUgPSAnJ1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgZm9yIGRyYXdpbmcgY29tbWFuZHMgKGhhbmRsZWQgZWxzZXdoZXJlKVxuICAgIGlmICh2YWx1ZS5zdGFydHNXaXRoKCctJykpIHtcbiAgICAgIC8vIFdpbGwgYmUgaGFuZGxlZCBieSBkcmF3aW5nIGhhbmRsZXJcbiAgICAgIHJldHVyblxuICAgIH1cbiAgfVxuXG4gIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgaGFuZGxlSW5wdXQpXG5cbiAgLy8gU3RvcmUgY2xlYW51cCBmdW5jdGlvbiBvbiB0aGUgZWxlbWVudCBmb3IgbGF0ZXIgcmVtb3ZhbFxuICBpbnB1dC5fX2tleWJvYXJkQ29tbWFuZENsZWFudXAgPSAoKSA9PiB7XG4gICAgaW5wdXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBoYW5kbGVJbnB1dClcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdGVhcmRvd25LZXlib2FyZENvbW1hbmRzKCk6IHZvaWQge1xuICBjb25zdCBpbnB1dCA9IHF1ZXJ5U2VsZWN0b3IoRG9tU2VsZWN0b3IuS0VZQk9BUkRfSU5QVVQpIGFzIElucHV0RWxlbWVudFdpdGhDbGVhbnVwIHwgbnVsbFxuICBpZiAoaW5wdXQ/Ll9fa2V5Ym9hcmRDb21tYW5kQ2xlYW51cCkge1xuICAgIGlucHV0Ll9fa2V5Ym9hcmRDb21tYW5kQ2xlYW51cCgpXG4gICAgaW5wdXQuX19rZXlib2FyZENvbW1hbmRDbGVhbnVwID0gdW5kZWZpbmVkXG4gIH1cbn1cbiIsInZhciBuLGwsdSx0LGkscixvLGUsZixjLGEscyxoLHAsdix5LGQ9e30sdz1bXSxfPS9hY2l0fGV4KD86c3xnfG58cHwkKXxycGh8Z3JpZHxvd3N8bW5jfG50d3xpbmVbY2hdfHpvb3xeb3JkfGl0ZXJhL2ksZz1BcnJheS5pc0FycmF5O2Z1bmN0aW9uIG0obixsKXtmb3IodmFyIHUgaW4gbCluW3VdPWxbdV07cmV0dXJuIG59ZnVuY3Rpb24gYihuKXtuJiZuLnBhcmVudE5vZGUmJm4ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChuKX1mdW5jdGlvbiBrKGwsdSx0KXt2YXIgaSxyLG8sZT17fTtmb3IobyBpbiB1KVwia2V5XCI9PW8/aT11W29dOlwicmVmXCI9PW8/cj11W29dOmVbb109dVtvXTtpZihhcmd1bWVudHMubGVuZ3RoPjImJihlLmNoaWxkcmVuPWFyZ3VtZW50cy5sZW5ndGg+Mz9uLmNhbGwoYXJndW1lbnRzLDIpOnQpLFwiZnVuY3Rpb25cIj09dHlwZW9mIGwmJm51bGwhPWwuZGVmYXVsdFByb3BzKWZvcihvIGluIGwuZGVmYXVsdFByb3BzKXZvaWQgMD09PWVbb10mJihlW29dPWwuZGVmYXVsdFByb3BzW29dKTtyZXR1cm4geChsLGUsaSxyLG51bGwpfWZ1bmN0aW9uIHgobix0LGkscixvKXt2YXIgZT17dHlwZTpuLHByb3BzOnQsa2V5OmkscmVmOnIsX19rOm51bGwsX186bnVsbCxfX2I6MCxfX2U6bnVsbCxfX2M6bnVsbCxjb25zdHJ1Y3Rvcjp2b2lkIDAsX192Om51bGw9PW8/Kyt1Om8sX19pOi0xLF9fdTowfTtyZXR1cm4gbnVsbD09byYmbnVsbCE9bC52bm9kZSYmbC52bm9kZShlKSxlfWZ1bmN0aW9uIE0oKXtyZXR1cm57Y3VycmVudDpudWxsfX1mdW5jdGlvbiBTKG4pe3JldHVybiBuLmNoaWxkcmVufWZ1bmN0aW9uIEMobixsKXt0aGlzLnByb3BzPW4sdGhpcy5jb250ZXh0PWx9ZnVuY3Rpb24gJChuLGwpe2lmKG51bGw9PWwpcmV0dXJuIG4uX18/JChuLl9fLG4uX19pKzEpOm51bGw7Zm9yKHZhciB1O2w8bi5fX2subGVuZ3RoO2wrKylpZihudWxsIT0odT1uLl9fa1tsXSkmJm51bGwhPXUuX19lKXJldHVybiB1Ll9fZTtyZXR1cm5cImZ1bmN0aW9uXCI9PXR5cGVvZiBuLnR5cGU/JChuKTpudWxsfWZ1bmN0aW9uIEkobil7aWYobi5fX1AmJm4uX19kKXt2YXIgdT1uLl9fdix0PXUuX19lLGk9W10scj1bXSxvPW0oe30sdSk7by5fX3Y9dS5fX3YrMSxsLnZub2RlJiZsLnZub2RlKG8pLHEobi5fX1Asbyx1LG4uX19uLG4uX19QLm5hbWVzcGFjZVVSSSwzMiZ1Ll9fdT9bdF06bnVsbCxpLG51bGw9PXQ/JCh1KTp0LCEhKDMyJnUuX191KSxyKSxvLl9fdj11Ll9fdixvLl9fLl9fa1tvLl9faV09byxEKGksbyxyKSx1Ll9fZT11Ll9fPW51bGwsby5fX2UhPXQmJlAobyl9fWZ1bmN0aW9uIFAobil7aWYobnVsbCE9KG49bi5fXykmJm51bGwhPW4uX19jKXJldHVybiBuLl9fZT1uLl9fYy5iYXNlPW51bGwsbi5fX2suc29tZShmdW5jdGlvbihsKXtpZihudWxsIT1sJiZudWxsIT1sLl9fZSlyZXR1cm4gbi5fX2U9bi5fX2MuYmFzZT1sLl9fZX0pLFAobil9ZnVuY3Rpb24gQShuKXsoIW4uX19kJiYobi5fX2Q9ITApJiZpLnB1c2gobikmJiFILl9fcisrfHxyIT1sLmRlYm91bmNlUmVuZGVyaW5nKSYmKChyPWwuZGVib3VuY2VSZW5kZXJpbmcpfHxvKShIKX1mdW5jdGlvbiBIKCl7dHJ5e2Zvcih2YXIgbixsPTE7aS5sZW5ndGg7KWkubGVuZ3RoPmwmJmkuc29ydChlKSxuPWkuc2hpZnQoKSxsPWkubGVuZ3RoLEkobil9ZmluYWxseXtpLmxlbmd0aD1ILl9fcj0wfX1mdW5jdGlvbiBMKG4sbCx1LHQsaSxyLG8sZSxmLGMsYSl7dmFyIHMsaCxwLHYseSxfLGcsbT10JiZ0Ll9fa3x8dyxiPWwubGVuZ3RoO2ZvcihmPVQodSxsLG0sZixiKSxzPTA7czxiO3MrKyludWxsIT0ocD11Ll9fa1tzXSkmJihoPS0xIT1wLl9faSYmbVtwLl9faV18fGQscC5fX2k9cyxfPXEobixwLGgsaSxyLG8sZSxmLGMsYSksdj1wLl9fZSxwLnJlZiYmaC5yZWYhPXAucmVmJiYoaC5yZWYmJkooaC5yZWYsbnVsbCxwKSxhLnB1c2gocC5yZWYscC5fX2N8fHYscCkpLG51bGw9PXkmJm51bGwhPXYmJih5PXYpLChnPSEhKDQmcC5fX3UpKXx8aC5fX2s9PT1wLl9faz8oZj1qKHAsZixuLGcpLGcmJmguX19lJiYoaC5fX2U9bnVsbCkpOlwiZnVuY3Rpb25cIj09dHlwZW9mIHAudHlwZSYmdm9pZCAwIT09Xz9mPV86diYmKGY9di5uZXh0U2libGluZykscC5fX3UmPS03KTtyZXR1cm4gdS5fX2U9eSxmfWZ1bmN0aW9uIFQobixsLHUsdCxpKXt2YXIgcixvLGUsZixjLGE9dS5sZW5ndGgscz1hLGg9MDtmb3Iobi5fX2s9bmV3IEFycmF5KGkpLHI9MDtyPGk7cisrKW51bGwhPShvPWxbcl0pJiZcImJvb2xlYW5cIiE9dHlwZW9mIG8mJlwiZnVuY3Rpb25cIiE9dHlwZW9mIG8/KFwic3RyaW5nXCI9PXR5cGVvZiBvfHxcIm51bWJlclwiPT10eXBlb2Ygb3x8XCJiaWdpbnRcIj09dHlwZW9mIG98fG8uY29uc3RydWN0b3I9PVN0cmluZz9vPW4uX19rW3JdPXgobnVsbCxvLG51bGwsbnVsbCxudWxsKTpnKG8pP289bi5fX2tbcl09eChTLHtjaGlsZHJlbjpvfSxudWxsLG51bGwsbnVsbCk6dm9pZCAwPT09by5jb25zdHJ1Y3RvciYmby5fX2I+MD9vPW4uX19rW3JdPXgoby50eXBlLG8ucHJvcHMsby5rZXksby5yZWY/by5yZWY6bnVsbCxvLl9fdik6bi5fX2tbcl09byxmPXIraCxvLl9fPW4sby5fX2I9bi5fX2IrMSxlPW51bGwsLTEhPShjPW8uX19pPU8obyx1LGYscykpJiYocy0tLChlPXVbY10pJiYoZS5fX3V8PTIpKSxudWxsPT1lfHxudWxsPT1lLl9fdj8oLTE9PWMmJihpPmE/aC0tOmk8YSYmaCsrKSxcImZ1bmN0aW9uXCIhPXR5cGVvZiBvLnR5cGUmJihvLl9fdXw9NCkpOmMhPWYmJihjPT1mLTE/aC0tOmM9PWYrMT9oKys6KGM+Zj9oLS06aCsrLG8uX191fD00KSkpOm4uX19rW3JdPW51bGw7aWYocylmb3Iocj0wO3I8YTtyKyspbnVsbCE9KGU9dVtyXSkmJjA9PSgyJmUuX191KSYmKGUuX19lPT10JiYodD0kKGUpKSxLKGUsZSkpO3JldHVybiB0fWZ1bmN0aW9uIGoobixsLHUsdCl7dmFyIGkscjtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBuLnR5cGUpe2ZvcihpPW4uX19rLHI9MDtpJiZyPGkubGVuZ3RoO3IrKylpW3JdJiYoaVtyXS5fXz1uLGw9aihpW3JdLGwsdSx0KSk7cmV0dXJuIGx9bi5fX2UhPWwmJih0JiYobCYmbi50eXBlJiYhbC5wYXJlbnROb2RlJiYobD0kKG4pKSx1Lmluc2VydEJlZm9yZShuLl9fZSxsfHxudWxsKSksbD1uLl9fZSk7ZG97bD1sJiZsLm5leHRTaWJsaW5nfXdoaWxlKG51bGwhPWwmJjg9PWwubm9kZVR5cGUpO3JldHVybiBsfWZ1bmN0aW9uIEYobixsKXtyZXR1cm4gbD1sfHxbXSxudWxsPT1ufHxcImJvb2xlYW5cIj09dHlwZW9mIG58fChnKG4pP24uc29tZShmdW5jdGlvbihuKXtGKG4sbCl9KTpsLnB1c2gobikpLGx9ZnVuY3Rpb24gTyhuLGwsdSx0KXt2YXIgaSxyLG8sZT1uLmtleSxmPW4udHlwZSxjPWxbdV0sYT1udWxsIT1jJiYwPT0oMiZjLl9fdSk7aWYobnVsbD09PWMmJm51bGw9PWV8fGEmJmU9PWMua2V5JiZmPT1jLnR5cGUpcmV0dXJuIHU7aWYodD4oYT8xOjApKWZvcihpPXUtMSxyPXUrMTtpPj0wfHxyPGwubGVuZ3RoOylpZihudWxsIT0oYz1sW289aT49MD9pLS06cisrXSkmJjA9PSgyJmMuX191KSYmZT09Yy5rZXkmJmY9PWMudHlwZSlyZXR1cm4gbztyZXR1cm4tMX1mdW5jdGlvbiB6KG4sbCx1KXtcIi1cIj09bFswXT9uLnNldFByb3BlcnR5KGwsbnVsbD09dT9cIlwiOnUpOm5bbF09bnVsbD09dT9cIlwiOlwibnVtYmVyXCIhPXR5cGVvZiB1fHxfLnRlc3QobCk/dTp1K1wicHhcIn1mdW5jdGlvbiBOKG4sbCx1LHQsaSl7dmFyIHIsbztuOmlmKFwic3R5bGVcIj09bClpZihcInN0cmluZ1wiPT10eXBlb2YgdSluLnN0eWxlLmNzc1RleHQ9dTtlbHNle2lmKFwic3RyaW5nXCI9PXR5cGVvZiB0JiYobi5zdHlsZS5jc3NUZXh0PXQ9XCJcIiksdClmb3IobCBpbiB0KXUmJmwgaW4gdXx8eihuLnN0eWxlLGwsXCJcIik7aWYodSlmb3IobCBpbiB1KXQmJnVbbF09PXRbbF18fHoobi5zdHlsZSxsLHVbbF0pfWVsc2UgaWYoXCJvXCI9PWxbMF0mJlwiblwiPT1sWzFdKXI9bCE9KGw9bC5yZXBsYWNlKHMsXCIkMVwiKSksbz1sLnRvTG93ZXJDYXNlKCksbD1vIGluIG58fFwib25Gb2N1c091dFwiPT1sfHxcIm9uRm9jdXNJblwiPT1sP28uc2xpY2UoMik6bC5zbGljZSgyKSxuLmx8fChuLmw9e30pLG4ubFtsK3JdPXUsdT90P3VbYV09dFthXToodVthXT1oLG4uYWRkRXZlbnRMaXN0ZW5lcihsLHI/djpwLHIpKTpuLnJlbW92ZUV2ZW50TGlzdGVuZXIobCxyP3Y6cCxyKTtlbHNle2lmKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj09aSlsPWwucmVwbGFjZSgveGxpbmsoSHw6aCkvLFwiaFwiKS5yZXBsYWNlKC9zTmFtZSQvLFwic1wiKTtlbHNlIGlmKFwid2lkdGhcIiE9bCYmXCJoZWlnaHRcIiE9bCYmXCJocmVmXCIhPWwmJlwibGlzdFwiIT1sJiZcImZvcm1cIiE9bCYmXCJ0YWJJbmRleFwiIT1sJiZcImRvd25sb2FkXCIhPWwmJlwicm93U3BhblwiIT1sJiZcImNvbFNwYW5cIiE9bCYmXCJyb2xlXCIhPWwmJlwicG9wb3ZlclwiIT1sJiZsIGluIG4pdHJ5e25bbF09bnVsbD09dT9cIlwiOnU7YnJlYWsgbn1jYXRjaChuKXt9XCJmdW5jdGlvblwiPT10eXBlb2YgdXx8KG51bGw9PXV8fCExPT09dSYmXCItXCIhPWxbNF0/bi5yZW1vdmVBdHRyaWJ1dGUobCk6bi5zZXRBdHRyaWJ1dGUobCxcInBvcG92ZXJcIj09bCYmMT09dT9cIlwiOnUpKX19ZnVuY3Rpb24gVihuKXtyZXR1cm4gZnVuY3Rpb24odSl7aWYodGhpcy5sKXt2YXIgdD10aGlzLmxbdS50eXBlK25dO2lmKG51bGw9PXVbY10pdVtjXT1oKys7ZWxzZSBpZih1W2NdPHRbYV0pcmV0dXJuO3JldHVybiB0KGwuZXZlbnQ/bC5ldmVudCh1KTp1KX19fWZ1bmN0aW9uIHEobix1LHQsaSxyLG8sZSxmLGMsYSl7dmFyIHMsaCxwLHYseSxkLF8sayx4LE0sJCxJLFAsQSxILFQ9dS50eXBlO2lmKHZvaWQgMCE9PXUuY29uc3RydWN0b3IpcmV0dXJuIG51bGw7MTI4JnQuX191JiYoYz0hISgzMiZ0Ll9fdSksbz1bZj11Ll9fZT10Ll9fZV0pLChzPWwuX19iKSYmcyh1KTtuOmlmKFwiZnVuY3Rpb25cIj09dHlwZW9mIFQpdHJ5e2lmKGs9dS5wcm9wcyx4PVQucHJvdG90eXBlJiZULnByb3RvdHlwZS5yZW5kZXIsTT0ocz1ULmNvbnRleHRUeXBlKSYmaVtzLl9fY10sJD1zP00/TS5wcm9wcy52YWx1ZTpzLl9fOmksdC5fX2M/Xz0oaD11Ll9fYz10Ll9fYykuX189aC5fX0U6KHg/dS5fX2M9aD1uZXcgVChrLCQpOih1Ll9fYz1oPW5ldyBDKGssJCksaC5jb25zdHJ1Y3Rvcj1ULGgucmVuZGVyPVEpLE0mJk0uc3ViKGgpLGguc3RhdGV8fChoLnN0YXRlPXt9KSxoLl9fbj1pLHA9aC5fX2Q9ITAsaC5fX2g9W10saC5fc2I9W10pLHgmJm51bGw9PWguX19zJiYoaC5fX3M9aC5zdGF0ZSkseCYmbnVsbCE9VC5nZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMmJihoLl9fcz09aC5zdGF0ZSYmKGguX19zPW0oe30saC5fX3MpKSxtKGguX19zLFQuZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzKGssaC5fX3MpKSksdj1oLnByb3BzLHk9aC5zdGF0ZSxoLl9fdj11LHApeCYmbnVsbD09VC5nZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMmJm51bGwhPWguY29tcG9uZW50V2lsbE1vdW50JiZoLmNvbXBvbmVudFdpbGxNb3VudCgpLHgmJm51bGwhPWguY29tcG9uZW50RGlkTW91bnQmJmguX19oLnB1c2goaC5jb21wb25lbnREaWRNb3VudCk7ZWxzZXtpZih4JiZudWxsPT1ULmdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyYmayE9PXYmJm51bGwhPWguY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyYmaC5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKGssJCksdS5fX3Y9PXQuX192fHwhaC5fX2UmJm51bGwhPWguc2hvdWxkQ29tcG9uZW50VXBkYXRlJiYhMT09PWguc2hvdWxkQ29tcG9uZW50VXBkYXRlKGssaC5fX3MsJCkpe3UuX192IT10Ll9fdiYmKGgucHJvcHM9ayxoLnN0YXRlPWguX19zLGguX19kPSExKSx1Ll9fZT10Ll9fZSx1Ll9faz10Ll9fayx1Ll9fay5zb21lKGZ1bmN0aW9uKG4pe24mJihuLl9fPXUpfSksdy5wdXNoLmFwcGx5KGguX19oLGguX3NiKSxoLl9zYj1bXSxoLl9faC5sZW5ndGgmJmUucHVzaChoKTticmVhayBufW51bGwhPWguY29tcG9uZW50V2lsbFVwZGF0ZSYmaC5jb21wb25lbnRXaWxsVXBkYXRlKGssaC5fX3MsJCkseCYmbnVsbCE9aC5jb21wb25lbnREaWRVcGRhdGUmJmguX19oLnB1c2goZnVuY3Rpb24oKXtoLmNvbXBvbmVudERpZFVwZGF0ZSh2LHksZCl9KX1pZihoLmNvbnRleHQ9JCxoLnByb3BzPWssaC5fX1A9bixoLl9fZT0hMSxJPWwuX19yLFA9MCx4KWguc3RhdGU9aC5fX3MsaC5fX2Q9ITEsSSYmSSh1KSxzPWgucmVuZGVyKGgucHJvcHMsaC5zdGF0ZSxoLmNvbnRleHQpLHcucHVzaC5hcHBseShoLl9faCxoLl9zYiksaC5fc2I9W107ZWxzZSBkb3toLl9fZD0hMSxJJiZJKHUpLHM9aC5yZW5kZXIoaC5wcm9wcyxoLnN0YXRlLGguY29udGV4dCksaC5zdGF0ZT1oLl9fc313aGlsZShoLl9fZCYmKytQPDI1KTtoLnN0YXRlPWguX19zLG51bGwhPWguZ2V0Q2hpbGRDb250ZXh0JiYoaT1tKG0oe30saSksaC5nZXRDaGlsZENvbnRleHQoKSkpLHgmJiFwJiZudWxsIT1oLmdldFNuYXBzaG90QmVmb3JlVXBkYXRlJiYoZD1oLmdldFNuYXBzaG90QmVmb3JlVXBkYXRlKHYseSkpLEE9bnVsbCE9cyYmcy50eXBlPT09UyYmbnVsbD09cy5rZXk/RShzLnByb3BzLmNoaWxkcmVuKTpzLGY9TChuLGcoQSk/QTpbQV0sdSx0LGkscixvLGUsZixjLGEpLGguYmFzZT11Ll9fZSx1Ll9fdSY9LTE2MSxoLl9faC5sZW5ndGgmJmUucHVzaChoKSxfJiYoaC5fX0U9aC5fXz1udWxsKX1jYXRjaChuKXtpZih1Ll9fdj1udWxsLGN8fG51bGwhPW8paWYobi50aGVuKXtmb3IodS5fX3V8PWM/MTYwOjEyODtmJiY4PT1mLm5vZGVUeXBlJiZmLm5leHRTaWJsaW5nOylmPWYubmV4dFNpYmxpbmc7b1tvLmluZGV4T2YoZildPW51bGwsdS5fX2U9Zn1lbHNle2ZvcihIPW8ubGVuZ3RoO0gtLTspYihvW0hdKTtCKHUpfWVsc2UgdS5fX2U9dC5fX2UsdS5fX2s9dC5fX2ssbi50aGVufHxCKHUpO2wuX19lKG4sdSx0KX1lbHNlIG51bGw9PW8mJnUuX192PT10Ll9fdj8odS5fX2s9dC5fX2ssdS5fX2U9dC5fX2UpOmY9dS5fX2U9Ryh0Ll9fZSx1LHQsaSxyLG8sZSxjLGEpO3JldHVybihzPWwuZGlmZmVkKSYmcyh1KSwxMjgmdS5fX3U/dm9pZCAwOmZ9ZnVuY3Rpb24gQihuKXtuJiYobi5fX2MmJihuLl9fYy5fX2U9ITApLG4uX19rJiZuLl9fay5zb21lKEIpKX1mdW5jdGlvbiBEKG4sdSx0KXtmb3IodmFyIGk9MDtpPHQubGVuZ3RoO2krKylKKHRbaV0sdFsrK2ldLHRbKytpXSk7bC5fX2MmJmwuX19jKHUsbiksbi5zb21lKGZ1bmN0aW9uKHUpe3RyeXtuPXUuX19oLHUuX19oPVtdLG4uc29tZShmdW5jdGlvbihuKXtuLmNhbGwodSl9KX1jYXRjaChuKXtsLl9fZShuLHUuX192KX19KX1mdW5jdGlvbiBFKG4pe3JldHVyblwib2JqZWN0XCIhPXR5cGVvZiBufHxudWxsPT1ufHxuLl9fYj4wP246ZyhuKT9uLm1hcChFKTp2b2lkIDAhPT1uLmNvbnN0cnVjdG9yP251bGw6bSh7fSxuKX1mdW5jdGlvbiBHKHUsdCxpLHIsbyxlLGYsYyxhKXt2YXIgcyxoLHAsdix5LHcsXyxtPWkucHJvcHN8fGQsaz10LnByb3BzLHg9dC50eXBlO2lmKFwic3ZnXCI9PXg/bz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI6XCJtYXRoXCI9PXg/bz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTgvTWF0aC9NYXRoTUxcIjpvfHwobz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWxcIiksbnVsbCE9ZSlmb3Iocz0wO3M8ZS5sZW5ndGg7cysrKWlmKCh5PWVbc10pJiZcInNldEF0dHJpYnV0ZVwiaW4geT09ISF4JiYoeD95LmxvY2FsTmFtZT09eDozPT15Lm5vZGVUeXBlKSl7dT15LGVbc109bnVsbDticmVha31pZihudWxsPT11KXtpZihudWxsPT14KXJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShrKTt1PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhvLHgsay5pcyYmayksYyYmKGwuX19tJiZsLl9fbSh0LGUpLGM9ITEpLGU9bnVsbH1pZihudWxsPT14KW09PT1rfHxjJiZ1LmRhdGE9PWt8fCh1LmRhdGE9ayk7ZWxzZXtpZihlPVwidGV4dGFyZWFcIj09eCYmbnVsbCE9ay5kZWZhdWx0VmFsdWU/bnVsbDplJiZuLmNhbGwodS5jaGlsZE5vZGVzKSwhYyYmbnVsbCE9ZSlmb3IobT17fSxzPTA7czx1LmF0dHJpYnV0ZXMubGVuZ3RoO3MrKyltWyh5PXUuYXR0cmlidXRlc1tzXSkubmFtZV09eS52YWx1ZTtmb3IocyBpbiBtKXk9bVtzXSxcImRhbmdlcm91c2x5U2V0SW5uZXJIVE1MXCI9PXM/cD15OlwiY2hpbGRyZW5cIj09c3x8cyBpbiBrfHxcInZhbHVlXCI9PXMmJlwiZGVmYXVsdFZhbHVlXCJpbiBrfHxcImNoZWNrZWRcIj09cyYmXCJkZWZhdWx0Q2hlY2tlZFwiaW4ga3x8Tih1LHMsbnVsbCx5LG8pO2ZvcihzIGluIGspeT1rW3NdLFwiY2hpbGRyZW5cIj09cz92PXk6XCJkYW5nZXJvdXNseVNldElubmVySFRNTFwiPT1zP2g9eTpcInZhbHVlXCI9PXM/dz15OlwiY2hlY2tlZFwiPT1zP189eTpjJiZcImZ1bmN0aW9uXCIhPXR5cGVvZiB5fHxtW3NdPT09eXx8Tih1LHMseSxtW3NdLG8pO2lmKGgpY3x8cCYmKGguX19odG1sPT1wLl9faHRtbHx8aC5fX2h0bWw9PXUuaW5uZXJIVE1MKXx8KHUuaW5uZXJIVE1MPWguX19odG1sKSx0Ll9faz1bXTtlbHNlIGlmKHAmJih1LmlubmVySFRNTD1cIlwiKSxMKFwidGVtcGxhdGVcIj09dC50eXBlP3UuY29udGVudDp1LGcodik/djpbdl0sdCxpLHIsXCJmb3JlaWduT2JqZWN0XCI9PXg/XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sXCI6byxlLGYsZT9lWzBdOmkuX19rJiYkKGksMCksYyxhKSxudWxsIT1lKWZvcihzPWUubGVuZ3RoO3MtLTspYihlW3NdKTtjJiZcInRleHRhcmVhXCIhPXh8fChzPVwidmFsdWVcIixcInByb2dyZXNzXCI9PXgmJm51bGw9PXc/dS5yZW1vdmVBdHRyaWJ1dGUoXCJ2YWx1ZVwiKTpudWxsIT13JiYodyE9PXVbc118fFwicHJvZ3Jlc3NcIj09eCYmIXd8fFwib3B0aW9uXCI9PXgmJnchPW1bc10pJiZOKHUscyx3LG1bc10sbykscz1cImNoZWNrZWRcIixudWxsIT1fJiZfIT11W3NdJiZOKHUscyxfLG1bc10sbykpfXJldHVybiB1fWZ1bmN0aW9uIEoobix1LHQpe3RyeXtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBuKXt2YXIgaT1cImZ1bmN0aW9uXCI9PXR5cGVvZiBuLl9fdTtpJiZuLl9fdSgpLGkmJm51bGw9PXV8fChuLl9fdT1uKHUpKX1lbHNlIG4uY3VycmVudD11fWNhdGNoKG4pe2wuX19lKG4sdCl9fWZ1bmN0aW9uIEsobix1LHQpe3ZhciBpLHI7aWYobC51bm1vdW50JiZsLnVubW91bnQobiksKGk9bi5yZWYpJiYoaS5jdXJyZW50JiZpLmN1cnJlbnQhPW4uX19lfHxKKGksbnVsbCx1KSksbnVsbCE9KGk9bi5fX2MpKXtpZihpLmNvbXBvbmVudFdpbGxVbm1vdW50KXRyeXtpLmNvbXBvbmVudFdpbGxVbm1vdW50KCl9Y2F0Y2gobil7bC5fX2Uobix1KX1pLmJhc2U9aS5fX1A9bnVsbH1pZihpPW4uX19rKWZvcihyPTA7cjxpLmxlbmd0aDtyKyspaVtyXSYmSyhpW3JdLHUsdHx8XCJmdW5jdGlvblwiIT10eXBlb2Ygbi50eXBlKTt0fHxiKG4uX19lKSxuLl9fYz1uLl9fPW4uX19lPXZvaWQgMH1mdW5jdGlvbiBRKG4sbCx1KXtyZXR1cm4gdGhpcy5jb25zdHJ1Y3RvcihuLHUpfWZ1bmN0aW9uIFIodSx0LGkpe3ZhciByLG8sZSxmO3Q9PWRvY3VtZW50JiYodD1kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpLGwuX18mJmwuX18odSx0KSxvPShyPVwiZnVuY3Rpb25cIj09dHlwZW9mIGkpP251bGw6aSYmaS5fX2t8fHQuX19rLGU9W10sZj1bXSxxKHQsdT0oIXImJml8fHQpLl9faz1rKFMsbnVsbCxbdV0pLG98fGQsZCx0Lm5hbWVzcGFjZVVSSSwhciYmaT9baV06bz9udWxsOnQuZmlyc3RDaGlsZD9uLmNhbGwodC5jaGlsZE5vZGVzKTpudWxsLGUsIXImJmk/aTpvP28uX19lOnQuZmlyc3RDaGlsZCxyLGYpLEQoZSx1LGYpfWZ1bmN0aW9uIFUobixsKXtSKG4sbCxVKX1mdW5jdGlvbiBXKGwsdSx0KXt2YXIgaSxyLG8sZSxmPW0oe30sbC5wcm9wcyk7Zm9yKG8gaW4gbC50eXBlJiZsLnR5cGUuZGVmYXVsdFByb3BzJiYoZT1sLnR5cGUuZGVmYXVsdFByb3BzKSx1KVwia2V5XCI9PW8/aT11W29dOlwicmVmXCI9PW8/cj11W29dOmZbb109dm9pZCAwPT09dVtvXSYmbnVsbCE9ZT9lW29dOnVbb107cmV0dXJuIGFyZ3VtZW50cy5sZW5ndGg+MiYmKGYuY2hpbGRyZW49YXJndW1lbnRzLmxlbmd0aD4zP24uY2FsbChhcmd1bWVudHMsMik6dCkseChsLnR5cGUsZixpfHxsLmtleSxyfHxsLnJlZixudWxsKX1mdW5jdGlvbiBYKG4pe2Z1bmN0aW9uIGwobil7dmFyIHUsdDtyZXR1cm4gdGhpcy5nZXRDaGlsZENvbnRleHR8fCh1PW5ldyBTZXQsKHQ9e30pW2wuX19jXT10aGlzLHRoaXMuZ2V0Q2hpbGRDb250ZXh0PWZ1bmN0aW9uKCl7cmV0dXJuIHR9LHRoaXMuY29tcG9uZW50V2lsbFVubW91bnQ9ZnVuY3Rpb24oKXt1PW51bGx9LHRoaXMuc2hvdWxkQ29tcG9uZW50VXBkYXRlPWZ1bmN0aW9uKG4pe3RoaXMucHJvcHMudmFsdWUhPW4udmFsdWUmJnUuZm9yRWFjaChmdW5jdGlvbihuKXtuLl9fZT0hMCxBKG4pfSl9LHRoaXMuc3ViPWZ1bmN0aW9uKG4pe3UuYWRkKG4pO3ZhciBsPW4uY29tcG9uZW50V2lsbFVubW91bnQ7bi5jb21wb25lbnRXaWxsVW5tb3VudD1mdW5jdGlvbigpe3UmJnUuZGVsZXRlKG4pLGwmJmwuY2FsbChuKX19KSxuLmNoaWxkcmVufXJldHVybiBsLl9fYz1cIl9fY0NcIit5KyssbC5fXz1uLGwuUHJvdmlkZXI9bC5fX2w9KGwuQ29uc3VtZXI9ZnVuY3Rpb24obixsKXtyZXR1cm4gbi5jaGlsZHJlbihsKX0pLmNvbnRleHRUeXBlPWwsbH1uPXcuc2xpY2UsbD17X19lOmZ1bmN0aW9uKG4sbCx1LHQpe2Zvcih2YXIgaSxyLG87bD1sLl9fOylpZigoaT1sLl9fYykmJiFpLl9fKXRyeXtpZigocj1pLmNvbnN0cnVjdG9yKSYmbnVsbCE9ci5nZXREZXJpdmVkU3RhdGVGcm9tRXJyb3ImJihpLnNldFN0YXRlKHIuZ2V0RGVyaXZlZFN0YXRlRnJvbUVycm9yKG4pKSxvPWkuX19kKSxudWxsIT1pLmNvbXBvbmVudERpZENhdGNoJiYoaS5jb21wb25lbnREaWRDYXRjaChuLHR8fHt9KSxvPWkuX19kKSxvKXJldHVybiBpLl9fRT1pfWNhdGNoKGwpe249bH10aHJvdyBufX0sdT0wLHQ9ZnVuY3Rpb24obil7cmV0dXJuIG51bGwhPW4mJnZvaWQgMD09PW4uY29uc3RydWN0b3J9LEMucHJvdG90eXBlLnNldFN0YXRlPWZ1bmN0aW9uKG4sbCl7dmFyIHU7dT1udWxsIT10aGlzLl9fcyYmdGhpcy5fX3MhPXRoaXMuc3RhdGU/dGhpcy5fX3M6dGhpcy5fX3M9bSh7fSx0aGlzLnN0YXRlKSxcImZ1bmN0aW9uXCI9PXR5cGVvZiBuJiYobj1uKG0oe30sdSksdGhpcy5wcm9wcykpLG4mJm0odSxuKSxudWxsIT1uJiZ0aGlzLl9fdiYmKGwmJnRoaXMuX3NiLnB1c2gobCksQSh0aGlzKSl9LEMucHJvdG90eXBlLmZvcmNlVXBkYXRlPWZ1bmN0aW9uKG4pe3RoaXMuX192JiYodGhpcy5fX2U9ITAsbiYmdGhpcy5fX2gucHVzaChuKSxBKHRoaXMpKX0sQy5wcm90b3R5cGUucmVuZGVyPVMsaT1bXSxvPVwiZnVuY3Rpb25cIj09dHlwZW9mIFByb21pc2U/UHJvbWlzZS5wcm90b3R5cGUudGhlbi5iaW5kKFByb21pc2UucmVzb2x2ZSgpKTpzZXRUaW1lb3V0LGU9ZnVuY3Rpb24obixsKXtyZXR1cm4gbi5fX3YuX19iLWwuX192Ll9fYn0sSC5fX3I9MCxmPU1hdGgucmFuZG9tKCkudG9TdHJpbmcoOCksYz1cIl9fZFwiK2YsYT1cIl9fYVwiK2Yscz0vKFBvaW50ZXJDYXB0dXJlKSR8Q2FwdHVyZSQvaSxoPTAscD1WKCExKSx2PVYoITApLHk9MDtleHBvcnR7QyBhcyBDb21wb25lbnQsUyBhcyBGcmFnbWVudCxXIGFzIGNsb25lRWxlbWVudCxYIGFzIGNyZWF0ZUNvbnRleHQsayBhcyBjcmVhdGVFbGVtZW50LE0gYXMgY3JlYXRlUmVmLGsgYXMgaCxVIGFzIGh5ZHJhdGUsdCBhcyBpc1ZhbGlkRWxlbWVudCxsIGFzIG9wdGlvbnMsUiBhcyByZW5kZXIsRiBhcyB0b0NoaWxkQXJyYXl9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cHJlYWN0Lm1vZHVsZS5qcy5tYXBcbiIsImltcG9ydHtvcHRpb25zIGFzIHIsRnJhZ21lbnQgYXMgZX1mcm9tXCJwcmVhY3RcIjtleHBvcnR7RnJhZ21lbnR9ZnJvbVwicHJlYWN0XCI7dmFyIHQ9L1tcIiY8XS87ZnVuY3Rpb24gbihyKXtpZigwPT09ci5sZW5ndGh8fCExPT09dC50ZXN0KHIpKXJldHVybiByO2Zvcih2YXIgZT0wLG49MCxvPVwiXCIsZj1cIlwiO248ci5sZW5ndGg7bisrKXtzd2l0Y2goci5jaGFyQ29kZUF0KG4pKXtjYXNlIDM0OmY9XCImcXVvdDtcIjticmVhaztjYXNlIDM4OmY9XCImYW1wO1wiO2JyZWFrO2Nhc2UgNjA6Zj1cIiZsdDtcIjticmVhaztkZWZhdWx0OmNvbnRpbnVlfW4hPT1lJiYobys9ci5zbGljZShlLG4pKSxvKz1mLGU9bisxfXJldHVybiBuIT09ZSYmKG8rPXIuc2xpY2UoZSxuKSksb312YXIgbz0vYWNpdHxleCg/OnN8Z3xufHB8JCl8cnBofGdyaWR8b3dzfG1uY3xudHd8aW5lW2NoXXx6b298Xm9yZHxpdGVyYS9pLGY9MCxpPUFycmF5LmlzQXJyYXk7ZnVuY3Rpb24gdShlLHQsbixvLGksdSl7dHx8KHQ9e30pO3ZhciBhLGMscD10O2lmKFwicmVmXCJpbiBwKWZvcihjIGluIHA9e30sdClcInJlZlwiPT1jP2E9dFtjXTpwW2NdPXRbY107dmFyIGw9e3R5cGU6ZSxwcm9wczpwLGtleTpuLHJlZjphLF9fazpudWxsLF9fOm51bGwsX19iOjAsX19lOm51bGwsX19jOm51bGwsY29uc3RydWN0b3I6dm9pZCAwLF9fdjotLWYsX19pOi0xLF9fdTowLF9fc291cmNlOmksX19zZWxmOnV9O2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGUmJihhPWUuZGVmYXVsdFByb3BzKSlmb3IoYyBpbiBhKXZvaWQgMD09PXBbY10mJihwW2NdPWFbY10pO3JldHVybiByLnZub2RlJiZyLnZub2RlKGwpLGx9ZnVuY3Rpb24gYShyKXt2YXIgdD11KGUse3RwbDpyLGV4cHJzOltdLnNsaWNlLmNhbGwoYXJndW1lbnRzLDEpfSk7cmV0dXJuIHQua2V5PXQuX192LHR9dmFyIGM9e30scD0vW0EtWl0vZztmdW5jdGlvbiBsKGUsdCl7aWYoci5hdHRyKXt2YXIgZj1yLmF0dHIoZSx0KTtpZihcInN0cmluZ1wiPT10eXBlb2YgZilyZXR1cm4gZn1pZih0PWZ1bmN0aW9uKHIpe3JldHVybiBudWxsIT09ciYmXCJvYmplY3RcIj09dHlwZW9mIHImJlwiZnVuY3Rpb25cIj09dHlwZW9mIHIudmFsdWVPZj9yLnZhbHVlT2YoKTpyfSh0KSxcInJlZlwiPT09ZXx8XCJrZXlcIj09PWUpcmV0dXJuXCJcIjtpZihcInN0eWxlXCI9PT1lJiZcIm9iamVjdFwiPT10eXBlb2YgdCl7dmFyIGk9XCJcIjtmb3IodmFyIHUgaW4gdCl7dmFyIGE9dFt1XTtpZihudWxsIT1hJiZcIlwiIT09YSl7dmFyIGw9XCItXCI9PXVbMF0/dTpjW3VdfHwoY1t1XT11LnJlcGxhY2UocCxcIi0kJlwiKS50b0xvd2VyQ2FzZSgpKSxzPVwiO1wiO1wibnVtYmVyXCIhPXR5cGVvZiBhfHxsLnN0YXJ0c1dpdGgoXCItLVwiKXx8by50ZXN0KGwpfHwocz1cInB4O1wiKSxpPWkrbCtcIjpcIithK3N9fXJldHVybiBlKyc9XCInK24oaSkrJ1wiJ31yZXR1cm4gbnVsbD09dHx8ITE9PT10fHxcImZ1bmN0aW9uXCI9PXR5cGVvZiB0fHxcIm9iamVjdFwiPT10eXBlb2YgdD9cIlwiOiEwPT09dD9lOmUrJz1cIicrbihcIlwiK3QpKydcIid9ZnVuY3Rpb24gcyhyKXtpZihudWxsPT1yfHxcImJvb2xlYW5cIj09dHlwZW9mIHJ8fFwiZnVuY3Rpb25cIj09dHlwZW9mIHIpcmV0dXJuIG51bGw7aWYoXCJvYmplY3RcIj09dHlwZW9mIHIpe2lmKHZvaWQgMD09PXIuY29uc3RydWN0b3IpcmV0dXJuIHI7aWYoaShyKSl7Zm9yKHZhciBlPTA7ZTxyLmxlbmd0aDtlKyspcltlXT1zKHJbZV0pO3JldHVybiByfX1yZXR1cm4gbihcIlwiK3IpfWV4cG9ydHt1IGFzIGpzeCxsIGFzIGpzeEF0dHIsdSBhcyBqc3hERVYscyBhcyBqc3hFc2NhcGUsYSBhcyBqc3hUZW1wbGF0ZSx1IGFzIGpzeHN9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9anN4UnVudGltZS5tb2R1bGUuanMubWFwXG4iLCJpbXBvcnQgdHlwZSB7IFNpZ25hbCB9IGZyb20gJ0BwcmVhY3Qvc2lnbmFscydcbmltcG9ydCB0eXBlIHsgQ29tcG9uZW50Q2hpbGRyZW4gfSBmcm9tICdwcmVhY3QnXG5cbmludGVyZmFjZSBCdXR0b25Sb3dQcm9wcyB7XG4gIGNoaWxkcmVuOiBDb21wb25lbnRDaGlsZHJlblxuICB2aXNpYmxlPzogU2lnbmFsPGJvb2xlYW4+XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBCdXR0b25Sb3coeyBjaGlsZHJlbiwgdmlzaWJsZSB9OiBCdXR0b25Sb3dQcm9wcykge1xuICBpZiAodmlzaWJsZSAmJiAhdmlzaWJsZS52YWx1ZSkge1xuICAgIHJldHVybiBudWxsXG4gIH1cblxuICByZXR1cm4gPGRpdj57Y2hpbGRyZW59PC9kaXY+XG59XG4iLCJpbXBvcnQgdHlwZSB7IFNpZ25hbCB9IGZyb20gJ0BwcmVhY3Qvc2lnbmFscydcblxuaW50ZXJmYWNlIFNldHRpbmdCdXR0b25Qcm9wczxUPiB7XG4gIGxhYmVsOiBzdHJpbmdcbiAgc2V0dGluZzogU2lnbmFsPFQ+XG4gIG9wdGlvbnM6IHJlYWRvbmx5IFRbXVxufVxuXG5leHBvcnQgZnVuY3Rpb24gU2V0dGluZ0J1dHRvbjxUPih7IGxhYmVsLCBzZXR0aW5nLCBvcHRpb25zIH06IFNldHRpbmdCdXR0b25Qcm9wczxUPikge1xuICBjb25zdCBoYW5kbGVDbGljayA9ICgpID0+IHtcbiAgICBjb25zdCBjdXJyZW50SW5kZXggPSBvcHRpb25zLmluZGV4T2Yoc2V0dGluZy52YWx1ZSlcbiAgICBjb25zdCBuZXh0SW5kZXggPSAoY3VycmVudEluZGV4ICsgMSkgJSBvcHRpb25zLmxlbmd0aFxuICAgIHNldHRpbmcudmFsdWUgPSBvcHRpb25zW25leHRJbmRleF1cbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGJ1dHRvbiBvbkNsaWNrPXtoYW5kbGVDbGlja30gdHlwZT1cImJ1dHRvblwiPlxuICAgICAge2xhYmVsfToge1N0cmluZyhzZXR0aW5nLnZhbHVlKX1cbiAgICA8L2J1dHRvbj5cbiAgKVxufVxuIiwiaW1wb3J0IHR5cGUgeyBTaWduYWwgfSBmcm9tICdAcHJlYWN0L3NpZ25hbHMnXG5pbXBvcnQgeyBzZXR0aW5ncyB9IGZyb20gJy4uL3NldHRpbmdzL3NldHRpbmdzU3RvcmUnXG5pbXBvcnQgeyBCdXR0b25Sb3cgfSBmcm9tICcuL0J1dHRvblJvdydcbmltcG9ydCB7IFNldHRpbmdCdXR0b24gfSBmcm9tICcuL1NldHRpbmdCdXR0b24nXG5cbmludGVyZmFjZSBDb250cm9sUGFuZWxQcm9wcyB7XG4gIGJvYXJkQ2hhbmdlZDogU2lnbmFsPG51bWJlcj5cbn1cblxuY29uc3QgU1BFQUtfUkFURV9PUFRJT05TID0gWzAuMiwgMC41LCAwLjcsIDEuMCwgMS4xLCAxLjJdIGFzIGNvbnN0XG5jb25zdCBUT0dHTEVfT1BUSU9OUyA9IFtmYWxzZSwgdHJ1ZV0gYXMgY29uc3RcblxuZXhwb3J0IGZ1bmN0aW9uIENvbnRyb2xQYW5lbCh7IGJvYXJkQ2hhbmdlZCB9OiBDb250cm9sUGFuZWxQcm9wcykge1xuICAvLyBVc2UgYm9hcmRDaGFuZ2VkIHRvIGVuc3VyZSBjb21wb25lbnQgcmUtcmVuZGVycyB3aGVuIGJvYXJkIGNoYW5nZXNcbiAgYm9hcmRDaGFuZ2VkLnZhbHVlXG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgPEJ1dHRvblJvdz5cbiAgICAgICAgPFNldHRpbmdCdXR0b25cbiAgICAgICAgICBsYWJlbD1cIlNwZWFrIFJhdGVcIlxuICAgICAgICAgIHNldHRpbmc9e3NldHRpbmdzLnNwZWFrUmF0ZX1cbiAgICAgICAgICBvcHRpb25zPXtTUEVBS19SQVRFX09QVElPTlN9XG4gICAgICAgIC8+XG4gICAgICAgIDxTZXR0aW5nQnV0dG9uXG4gICAgICAgICAgbGFiZWw9XCJQaWVjZXMgTGlzdFwiXG4gICAgICAgICAgc2V0dGluZz17c2V0dGluZ3MucGllY2VzTGlzdEVuYWJsZWR9XG4gICAgICAgICAgb3B0aW9ucz17VE9HR0xFX09QVElPTlN9XG4gICAgICAgIC8+XG4gICAgICAgIDxTZXR0aW5nQnV0dG9uXG4gICAgICAgICAgbGFiZWw9XCJEaXZpZGVyc1wiXG4gICAgICAgICAgc2V0dGluZz17c2V0dGluZ3MuZGl2aWRlcnNFbmFibGVkfVxuICAgICAgICAgIG9wdGlvbnM9e1RPR0dMRV9PUFRJT05TfVxuICAgICAgICAvPlxuICAgICAgICA8U2V0dGluZ0J1dHRvblxuICAgICAgICAgIGxhYmVsPVwiQ3VzdG9tIEJvYXJkXCJcbiAgICAgICAgICBzZXR0aW5nPXtzZXR0aW5ncy5jdXN0b21Cb2FyZEVuYWJsZWR9XG4gICAgICAgICAgb3B0aW9ucz17VE9HR0xFX09QVElPTlN9XG4gICAgICAgIC8+XG4gICAgICAgIDxTZXR0aW5nQnV0dG9uXG4gICAgICAgICAgbGFiZWw9XCJGbGFzaCBNb2RlXCJcbiAgICAgICAgICBzZXR0aW5nPXtzZXR0aW5ncy5mbGFzaE1vZGVFbmFibGVkfVxuICAgICAgICAgIG9wdGlvbnM9e1RPR0dMRV9PUFRJT05TfVxuICAgICAgICAvPlxuICAgICAgPC9CdXR0b25Sb3c+XG4gICAgPC9kaXY+XG4gIClcbn1cbiIsImltcG9ydCB0eXBlIHsgU2lnbmFsIH0gZnJvbSAnQHByZWFjdC9zaWduYWxzLWNvcmUnXG5pbXBvcnQgeyByZW5kZXIgfSBmcm9tICdwcmVhY3QnXG5pbXBvcnQgeyBDb250cm9sUGFuZWwgfSBmcm9tICcuL0NvbnRyb2xQYW5lbCdcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVJvb3QoYm9hcmRDaGFuZ2VkOiBTaWduYWw8bnVtYmVyPiwgbW91bnRQb2ludDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgcmVuZGVyKDxDb250cm9sUGFuZWwgYm9hcmRDaGFuZ2VkPXtib2FyZENoYW5nZWR9IC8+LCBtb3VudFBvaW50KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVzdHJveVJvb3QobW91bnRQb2ludDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgcmVuZGVyKG51bGwsIG1vdW50UG9pbnQpXG59XG4iLCJpbXBvcnQgdHlwZSB7IFNpZ25hbCB9IGZyb20gJ0BwcmVhY3Qvc2lnbmFscy1jb3JlJ1xuaW1wb3J0IHsgRG9tU2VsZWN0b3IgfSBmcm9tICcuLi9jb25zdGFudHMnXG5pbXBvcnQgeyBxdWVyeVNlbGVjdG9yIH0gZnJvbSAnLi4vcGxhdGZvcm0vZG9tJ1xuXG5leHBvcnQgaW50ZXJmYWNlIEJvYXJkT2JzZXJ2ZXJTdGF0ZSB7XG4gIG9ic2VydmVyOiBNdXRhdGlvbk9ic2VydmVyXG4gIGJvYXJkQ2hhbmdlZDogU2lnbmFsPG51bWJlcj5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUJvYXJkT2JzZXJ2ZXIoYm9hcmRDaGFuZ2VkOiBTaWduYWw8bnVtYmVyPik6IEJvYXJkT2JzZXJ2ZXJTdGF0ZSB7XG4gIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgIGJvYXJkQ2hhbmdlZC52YWx1ZSArPSAxXG4gIH0pXG5cbiAgcmV0dXJuIHsgb2JzZXJ2ZXIsIGJvYXJkQ2hhbmdlZCB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdGFydEJvYXJkT2JzZXJ2ZXIoc3RhdGU6IEJvYXJkT2JzZXJ2ZXJTdGF0ZSk6IHZvaWQge1xuICBjb25zdCBib2FyZCA9IHF1ZXJ5U2VsZWN0b3IoRG9tU2VsZWN0b3IuQk9BUkQpXG4gIGlmICghYm9hcmQpIHJldHVyblxuXG4gIHN0YXRlLm9ic2VydmVyLm9ic2VydmUoYm9hcmQsIHtcbiAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgYXR0cmlidXRlczogdHJ1ZSxcbiAgICBzdWJ0cmVlOiB0cnVlLFxuICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RvcEJvYXJkT2JzZXJ2ZXIoc3RhdGU6IEJvYXJkT2JzZXJ2ZXJTdGF0ZSk6IHZvaWQge1xuICBzdGF0ZS5vYnNlcnZlci5kaXNjb25uZWN0KClcbn1cbiIsImltcG9ydCB7IENzc0NsYXNzLCBDc3NEaXNwbGF5LCBEb21TZWxlY3RvciB9IGZyb20gJy4uLy4uL2NvbnN0YW50cydcbmltcG9ydCB7IGFwcGVuZENoaWxkLCBjcmVhdGVTdmdFbGVtZW50LCBxdWVyeVNlbGVjdG9yIH0gZnJvbSAnLi4vLi4vcGxhdGZvcm0vZG9tJ1xuXG5leHBvcnQgaW50ZXJmYWNlIERpdmlkZXJzU3RhdGUge1xuICBzdmc6IFNWR1NWR0VsZW1lbnRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZURpdmlkZXJzKCk6IERpdmlkZXJzU3RhdGUge1xuICBjb25zdCBib2FyZCA9IHF1ZXJ5U2VsZWN0b3IoRG9tU2VsZWN0b3IuQk9BUkQpXG4gIGlmICghYm9hcmQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0JvYXJkIG5vdCBmb3VuZCcpXG4gIH1cblxuICBjb25zdCByZWN0ID0gYm9hcmQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgY29uc3Qgc2l6ZSA9IHJlY3Qud2lkdGhcblxuICBjb25zdCBzdmcgPSBjcmVhdGVTdmdFbGVtZW50KCdzdmcnKSBhcyBTVkdTVkdFbGVtZW50XG4gIHN2Zy5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgQ3NzQ2xhc3MuVVNFUlNDUklQVF9ESVZJREVSUylcbiAgc3ZnLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCBzaXplLnRvU3RyaW5nKCkpXG4gIHN2Zy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIHNpemUudG9TdHJpbmcoKSlcbiAgc3ZnLnN0eWxlLmNzc1RleHQgPSBgXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMDtcbiAgICBsZWZ0OiAwO1xuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIGBcblxuICAvLyBWZXJ0aWNhbCBsaW5lXG4gIGNvbnN0IHZMaW5lID0gY3JlYXRlU3ZnRWxlbWVudCgnbGluZScpXG4gIHZMaW5lLnNldEF0dHJpYnV0ZSgneDEnLCAoc2l6ZSAvIDIpLnRvU3RyaW5nKCkpXG4gIHZMaW5lLnNldEF0dHJpYnV0ZSgneTEnLCAnMCcpXG4gIHZMaW5lLnNldEF0dHJpYnV0ZSgneDInLCAoc2l6ZSAvIDIpLnRvU3RyaW5nKCkpXG4gIHZMaW5lLnNldEF0dHJpYnV0ZSgneTInLCBzaXplLnRvU3RyaW5nKCkpXG4gIHZMaW5lLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJywgJ3JlZCcpXG4gIHZMaW5lLnNldEF0dHJpYnV0ZSgnc3Ryb2tlLXdpZHRoJywgJzInKVxuXG4gIC8vIEhvcml6b250YWwgbGluZVxuICBjb25zdCBoTGluZSA9IGNyZWF0ZVN2Z0VsZW1lbnQoJ2xpbmUnKVxuICBoTGluZS5zZXRBdHRyaWJ1dGUoJ3gxJywgJzAnKVxuICBoTGluZS5zZXRBdHRyaWJ1dGUoJ3kxJywgKHNpemUgLyAyKS50b1N0cmluZygpKVxuICBoTGluZS5zZXRBdHRyaWJ1dGUoJ3gyJywgc2l6ZS50b1N0cmluZygpKVxuICBoTGluZS5zZXRBdHRyaWJ1dGUoJ3kyJywgKHNpemUgLyAyKS50b1N0cmluZygpKVxuICBoTGluZS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsICdyZWQnKVxuICBoTGluZS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS13aWR0aCcsICcyJylcblxuICBhcHBlbmRDaGlsZChzdmcsIHZMaW5lKVxuICBhcHBlbmRDaGlsZChzdmcsIGhMaW5lKVxuXG4gIGFwcGVuZENoaWxkKGJvYXJkLCBzdmcpXG5cbiAgcmV0dXJuIHsgc3ZnIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNob3dEaXZpZGVycyhzdGF0ZTogRGl2aWRlcnNTdGF0ZSk6IHZvaWQge1xuICBzdGF0ZS5zdmcuc3R5bGUuZGlzcGxheSA9IENzc0Rpc3BsYXkuQkxPQ0tcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhpZGVEaXZpZGVycyhzdGF0ZTogRGl2aWRlcnNTdGF0ZSk6IHZvaWQge1xuICBzdGF0ZS5zdmcuc3R5bGUuZGlzcGxheSA9IENzc0Rpc3BsYXkuTk9ORVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVzdHJveURpdmlkZXJzKHN0YXRlOiBEaXZpZGVyc1N0YXRlKTogdm9pZCB7XG4gIHN0YXRlLnN2Zy5yZW1vdmUoKVxufVxuIiwiaW1wb3J0IHsgQ3NzQ2xhc3MsIENzc0Rpc3BsYXksIERvbVNlbGVjdG9yIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzJ1xuaW1wb3J0IHsgYXBwZW5kQ2hpbGQsIGNyZWF0ZURpdiwgcXVlcnlTZWxlY3RvciB9IGZyb20gJy4uLy4uL3BsYXRmb3JtL2RvbSdcblxuZXhwb3J0IGludGVyZmFjZSBGbGFzaE92ZXJsYXlTdGF0ZSB7XG4gIG92ZXJsYXk6IEhUTUxFbGVtZW50XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVGbGFzaE92ZXJsYXkoKTogRmxhc2hPdmVybGF5U3RhdGUge1xuICBjb25zdCBvdmVybGF5ID0gY3JlYXRlRGl2KClcbiAgb3ZlcmxheS5jbGFzc05hbWUgPSBDc3NDbGFzcy5VU0VSU0NSSVBUX0ZMQVNIXG4gIG92ZXJsYXkuc3R5bGUuY3NzVGV4dCA9IGBcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAwO1xuICAgIGxlZnQ6IDA7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIGJhY2tncm91bmQ6IGJsYWNrO1xuICAgIHotaW5kZXg6IDEwMDA7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgYFxuXG4gIGNvbnN0IGNvbnRhaW5lciA9IHF1ZXJ5U2VsZWN0b3IoRG9tU2VsZWN0b3IuQ09OVEFJTkVSKVxuICBpZiAoY29udGFpbmVyKSB7XG4gICAgYXBwZW5kQ2hpbGQoY29udGFpbmVyLCBvdmVybGF5KVxuICB9XG5cbiAgcmV0dXJuIHsgb3ZlcmxheSB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93Rmxhc2goc3RhdGU6IEZsYXNoT3ZlcmxheVN0YXRlKTogdm9pZCB7XG4gIHN0YXRlLm92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IENzc0Rpc3BsYXkuQkxPQ0tcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhpZGVGbGFzaChzdGF0ZTogRmxhc2hPdmVybGF5U3RhdGUpOiB2b2lkIHtcbiAgc3RhdGUub3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gQ3NzRGlzcGxheS5OT05FXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXN0cm95Rmxhc2hPdmVybGF5KHN0YXRlOiBGbGFzaE92ZXJsYXlTdGF0ZSk6IHZvaWQge1xuICBzdGF0ZS5vdmVybGF5LnJlbW92ZSgpXG59XG4iLCJpbXBvcnQgeyB0eXBlIERpdmlkZXJzU3RhdGUsIGhpZGVEaXZpZGVycywgc2hvd0RpdmlkZXJzIH0gZnJvbSAnLi4vZG9tL292ZXJsYXlzL2RpdmlkZXJzJ1xuaW1wb3J0IHsgc2V0dGluZ3MgfSBmcm9tICcuLi9zZXR0aW5ncy9zZXR0aW5nc1N0b3JlJ1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlRGl2aWRlcnMoc3RhdGU6IERpdmlkZXJzU3RhdGUpOiB2b2lkIHtcbiAgaWYgKHNldHRpbmdzLmRpdmlkZXJzRW5hYmxlZC52YWx1ZSkge1xuICAgIHNob3dEaXZpZGVycyhzdGF0ZSlcbiAgfSBlbHNlIHtcbiAgICBoaWRlRGl2aWRlcnMoc3RhdGUpXG4gIH1cbn1cbiIsImltcG9ydCB7IGVmZmVjdCB9IGZyb20gJ0BwcmVhY3Qvc2lnbmFscy1jb3JlJ1xuaW1wb3J0IHR5cGUgeyBEaXZpZGVyc1N0YXRlIH0gZnJvbSAnLi4vZG9tL292ZXJsYXlzL2RpdmlkZXJzJ1xuaW1wb3J0IHsgdXBkYXRlRGl2aWRlcnMgfSBmcm9tICcuLi9oYW5kbGVycy91cGRhdGVEaXZpZGVycydcbmltcG9ydCB7IHNldHRpbmdzIH0gZnJvbSAnLi4vc2V0dGluZ3Mvc2V0dGluZ3NTdG9yZSdcblxuZXhwb3J0IGZ1bmN0aW9uIHNldHVwRGl2aWRlcnNFZmZlY3Qoc3RhdGU6IERpdmlkZXJzU3RhdGUpOiAoKSA9PiB2b2lkIHtcbiAgcmV0dXJuIGVmZmVjdCgoKSA9PiB7XG4gICAgc2V0dGluZ3MuZGl2aWRlcnNFbmFibGVkLnZhbHVlXG4gICAgdXBkYXRlRGl2aWRlcnMoc3RhdGUpXG4gIH0pXG59XG4iLCJpbXBvcnQgeyBzaWduYWwgfSBmcm9tICdAcHJlYWN0L3NpZ25hbHMtY29yZSdcbmltcG9ydCB7IHNldHVwS2V5Ym9hcmRDb21tYW5kcywgdGVhcmRvd25LZXlib2FyZENvbW1hbmRzIH0gZnJvbSAnLi9jb21tYW5kcy9rZXlib2FyZElucHV0J1xuaW1wb3J0IHsgY3JlYXRlUm9vdCwgZGVzdHJveVJvb3QgfSBmcm9tICcuL2NvbXBvbmVudHMvcm9vdCdcbmltcG9ydCB7IERvbVNlbGVjdG9yIH0gZnJvbSAnLi9jb25zdGFudHMnXG5pbXBvcnQgeyBjcmVhdGVCb2FyZE9ic2VydmVyLCBzdGFydEJvYXJkT2JzZXJ2ZXIsIHN0b3BCb2FyZE9ic2VydmVyIH0gZnJvbSAnLi9kb20vYm9hcmRPYnNlcnZlcidcbmltcG9ydCB7IHdhaXRGb3JFbGVtZW50IH0gZnJvbSAnLi9kb20vYm9hcmRSZWFkZXInXG5pbXBvcnQgeyBjcmVhdGVEaXZpZGVycywgZGVzdHJveURpdmlkZXJzIH0gZnJvbSAnLi9kb20vb3ZlcmxheXMvZGl2aWRlcnMnXG5pbXBvcnQgeyBjcmVhdGVGbGFzaE92ZXJsYXksIGRlc3Ryb3lGbGFzaE92ZXJsYXkgfSBmcm9tICcuL2RvbS9vdmVybGF5cy9mbGFzaCdcbmltcG9ydCB7IHNldHVwRGl2aWRlcnNFZmZlY3QgfSBmcm9tICcuL2VmZmVjdHMvb25EaXZpZGVycydcbmltcG9ydCB7IGFwcGVuZENoaWxkLCBjcmVhdGVEaXYsIHF1ZXJ5U2VsZWN0b3IgfSBmcm9tICcuL3BsYXRmb3JtL2RvbSdcbmltcG9ydCB7IGxvYWRTZXR0aW5ncywgc2V0dXBBdXRvU2F2ZSB9IGZyb20gJy4vc2V0dGluZ3Mvc2V0dGluZ3NTdG9yZSdcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGluaXQoKSB7XG4gIC8vIFdhaXQgZm9yIGxpY2hlc3MgdG8gbG9hZCB0aGUgYm9hcmRcbiAgYXdhaXQgd2FpdEZvckVsZW1lbnQoRG9tU2VsZWN0b3IuS0VZQk9BUkRfTU9WRSlcblxuICAvLyBJbml0aWFsaXplIHNldHRpbmdzXG4gIGxvYWRTZXR0aW5ncygpXG4gIHNldHVwQXV0b1NhdmUoKVxuXG4gIC8vIENyZWF0ZSBzaGFyZWQgYm9hcmQgY2hhbmdlIHNpZ25hbFxuICBjb25zdCBib2FyZENoYW5nZWQgPSBzaWduYWwoMClcblxuICAvLyBDcmVhdGUgRE9NIHN0YXRlXG4gIGNvbnN0IGZsYXNoU3RhdGUgPSBjcmVhdGVGbGFzaE92ZXJsYXkoKVxuICBjb25zdCBkaXZpZGVyc1N0YXRlID0gY3JlYXRlRGl2aWRlcnMoKVxuICBjb25zdCBib2FyZE9ic2VydmVyU3RhdGUgPSBjcmVhdGVCb2FyZE9ic2VydmVyKGJvYXJkQ2hhbmdlZClcblxuICAvLyBTdGFydCBvYnNlcnZlclxuICBzdGFydEJvYXJkT2JzZXJ2ZXIoYm9hcmRPYnNlcnZlclN0YXRlKVxuXG4gIC8vIFNldCB1cCBlZmZlY3RzXG4gIGNvbnN0IGNsZWFudXBEaXZpZGVycyA9IHNldHVwRGl2aWRlcnNFZmZlY3QoZGl2aWRlcnNTdGF0ZSlcblxuICAvLyBTZXQgdXAgY29tbWFuZHNcbiAgc2V0dXBLZXlib2FyZENvbW1hbmRzKClcblxuICAvLyBNb3VudCBQcmVhY3QgVUlcbiAgY29uc3QgbW91bnRQb2ludCA9IGNyZWF0ZURpdigpXG4gIGNvbnN0IGtleWJvYXJkTW92ZSA9IHF1ZXJ5U2VsZWN0b3IoRG9tU2VsZWN0b3IuS0VZQk9BUkRfTU9WRSlcbiAgaWYgKGtleWJvYXJkTW92ZSkge1xuICAgIGFwcGVuZENoaWxkKGtleWJvYXJkTW92ZSwgbW91bnRQb2ludClcbiAgfVxuICBjcmVhdGVSb290KGJvYXJkQ2hhbmdlZCwgbW91bnRQb2ludClcblxuICAvLyBSZXR1cm4gY2xlYW51cCBmdW5jdGlvblxuICByZXR1cm4gKCkgPT4ge1xuICAgIGNsZWFudXBEaXZpZGVycygpXG4gICAgc3RvcEJvYXJkT2JzZXJ2ZXIoYm9hcmRPYnNlcnZlclN0YXRlKVxuICAgIGRlc3Ryb3lGbGFzaE92ZXJsYXkoZmxhc2hTdGF0ZSlcbiAgICBkZXN0cm95RGl2aWRlcnMoZGl2aWRlcnNTdGF0ZSlcbiAgICB0ZWFyZG93bktleWJvYXJkQ29tbWFuZHMoKVxuICAgIGRlc3Ryb3lSb290KG1vdW50UG9pbnQpXG4gIH1cbn1cbiIsImltcG9ydCB7IGluaXQgfSBmcm9tICcuL2luaXQnXG5cbi8vIFN0YXJ0IHRoZSBhcHBsaWNhdGlvblxuaW5pdCgpLmNhdGNoKGNvbnNvbGUuZXJyb3IpXG4iXSwieF9nb29nbGVfaWdub3JlTGlzdCI6WzAsMTYsMTddLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztDQUFBLElBQUlBLE1BQUUsT0FBTyxJQUFJLGdCQUFnQjtDQUFFLFNBQVNDLE1BQUc7RUFBQyxJQUFHLEVBQUVDLE1BQUUsSUFBRztHQUFDLElBQUksR0FBRSxJQUFFLENBQUM7R0FBRSxDQUFDLFdBQVU7SUFBQyxJQUFJLElBQUVDO0lBQUUsTUFBRSxLQUFLO0lBQUUsT0FBTSxLQUFLLE1BQUksR0FBRTtLQUFDLElBQUcsRUFBRSxFQUFFLE1BQUksRUFBRSxHQUFFLEVBQUUsRUFBRSxJQUFFLEVBQUU7S0FBRSxJQUFFLEVBQUU7SUFBQztHQUFDLEdBQUU7R0FBRSxPQUFNLEtBQUssTUFBSUMsS0FBRTtJQUFDLElBQUksSUFBRUE7SUFBRSxNQUFFLEtBQUs7SUFBRTtJQUFJLE9BQU0sS0FBSyxNQUFJLEdBQUU7S0FBQyxJQUFJLElBQUUsRUFBRTtLQUFFLEVBQUUsSUFBRSxLQUFLO0tBQUUsRUFBRSxLQUFHO0tBQUcsSUFBRyxFQUFFLElBQUUsRUFBRSxNQUFJQyxJQUFFLENBQUMsR0FBRSxJQUFHO01BQUMsRUFBRSxFQUFFO0tBQUMsU0FBTyxHQUFFO01BQUMsSUFBRyxDQUFDLEdBQUU7T0FBQyxJQUFFO09BQUUsSUFBRSxDQUFDO01BQUM7S0FBQztLQUFDLElBQUU7SUFBQztHQUFDO0dBQUMsTUFBRTtHQUFFO0dBQUksSUFBRyxHQUFFLE1BQU07RUFBQyxPQUFNO0NBQUc7Q0FBdUUsSUFBSUMsTUFBRSxLQUFLO0NBQUUsU0FBU0MsSUFBRSxHQUFFO0VBQUMsSUFBSSxJQUFFRDtFQUFFLE1BQUUsS0FBSztFQUFFLElBQUc7R0FBQyxPQUFPLEVBQUU7RUFBQyxVQUFRO0dBQUMsTUFBRTtFQUFDO0NBQUM7Q0FBQyxJQUFJRSxLQUFFSixNQUFFLEtBQUssR0FBRUYsTUFBRSxHQUFFTyxNQUFFLEdBQU1FLE1BQUUsR0FBRVIsTUFBRSxLQUFLLEdBQUVTLE1BQUU7Q0FBRSxTQUFTQyxJQUFFLEdBQUU7RUFBQyxJQUFHLEtBQUssTUFBSVAsS0FBRTtHQUFDLElBQUksSUFBRSxFQUFFO0dBQUUsSUFBRyxLQUFLLE1BQUksS0FBRyxFQUFFLE1BQUlBLEtBQUU7SUFBQyxJQUFFO0tBQUMsR0FBRTtLQUFFLEdBQUU7S0FBRSxHQUFFQSxJQUFFO0tBQUUsR0FBRSxLQUFLO0tBQUUsR0FBRUE7S0FBRSxHQUFFLEtBQUs7S0FBRSxHQUFFLEtBQUs7S0FBRSxHQUFFO0lBQUM7SUFBRSxJQUFHLEtBQUssTUFBSUEsSUFBRSxHQUFFLElBQUUsRUFBRSxJQUFFO0lBQUUsSUFBRSxJQUFFO0lBQUUsRUFBRSxJQUFFO0lBQUUsSUFBRyxLQUFHQSxJQUFFLEdBQUUsRUFBRSxFQUFFLENBQUM7SUFBRSxPQUFPO0dBQUMsT0FBTSxJQUFHLE9BQUssRUFBRSxHQUFFO0lBQUMsRUFBRSxJQUFFO0lBQUUsSUFBRyxLQUFLLE1BQUksRUFBRSxHQUFFO0tBQUMsRUFBRSxFQUFFLElBQUUsRUFBRTtLQUFFLElBQUcsS0FBSyxNQUFJLEVBQUUsR0FBRSxFQUFFLEVBQUUsSUFBRSxFQUFFO0tBQUUsRUFBRSxJQUFFQSxJQUFFO0tBQUUsRUFBRSxJQUFFLEtBQUs7S0FBRSxJQUFFLEVBQUUsSUFBRTtLQUFFLElBQUUsSUFBRTtJQUFDO0lBQUMsT0FBTztHQUFDO0VBQUM7Q0FBQztDQUFDLFNBQVNRLElBQUUsR0FBRSxHQUFFO0VBQUMsS0FBSyxJQUFFO0VBQUUsS0FBSyxJQUFFO0VBQUUsS0FBSyxJQUFFLEtBQUs7RUFBRSxLQUFLLElBQUUsS0FBSztFQUFFLEtBQUssSUFBRTtFQUFFLEtBQUssSUFBRSxRQUFNLElBQUUsS0FBSyxJQUFFLEVBQUU7RUFBUSxLQUFLLElBQUUsUUFBTSxJQUFFLEtBQUssSUFBRSxFQUFFO0VBQVUsS0FBSyxPQUFLLFFBQU0sSUFBRSxLQUFLLElBQUUsRUFBRTtDQUFJO0NBQUMsSUFBRSxVQUFVLFFBQU1kO0NBQUUsSUFBRSxVQUFVLElBQUUsV0FBVTtFQUFDLE9BQU0sQ0FBQztDQUFDO0NBQUUsSUFBRSxVQUFVLElBQUUsU0FBUyxHQUFFO0VBQUMsSUFBSSxJQUFFLE1BQUssSUFBRSxLQUFLO0VBQUUsSUFBRyxNQUFJLEtBQUcsS0FBSyxNQUFJLEVBQUUsR0FBRTtHQUFDLEVBQUUsSUFBRTtHQUFFLEtBQUssSUFBRTtHQUFFLElBQUcsS0FBSyxNQUFJLEdBQUUsRUFBRSxJQUFFO1FBQU8sSUFBRSxXQUFVO0lBQUMsSUFBSTtJQUFFLFNBQU8sSUFBRSxFQUFFLE1BQUksRUFBRSxLQUFLLENBQUM7R0FBQyxDQUFDO0VBQUM7Q0FBQztDQUFFLElBQUUsVUFBVSxJQUFFLFNBQVMsR0FBRTtFQUFDLElBQUksSUFBRTtFQUFLLElBQUcsS0FBSyxNQUFJLEtBQUssR0FBRTtHQUFDLElBQUksSUFBRSxFQUFFLEdBQUUsSUFBRSxFQUFFO0dBQUUsSUFBRyxLQUFLLE1BQUksR0FBRTtJQUFDLEVBQUUsSUFBRTtJQUFFLEVBQUUsSUFBRSxLQUFLO0dBQUM7R0FBQyxJQUFHLEtBQUssTUFBSSxHQUFFO0lBQUMsRUFBRSxJQUFFO0lBQUUsRUFBRSxJQUFFLEtBQUs7R0FBQztHQUFDLElBQUcsTUFBSSxLQUFLLEdBQUU7SUFBQyxLQUFLLElBQUU7SUFBRSxJQUFHLEtBQUssTUFBSSxHQUFFLElBQUUsV0FBVTtLQUFDLElBQUk7S0FBRSxTQUFPLElBQUUsRUFBRSxNQUFJLEVBQUUsS0FBSyxDQUFDO0lBQUMsQ0FBQztHQUFDO0VBQUM7Q0FBQztDQUFFLElBQUUsVUFBVSxZQUFVLFNBQVMsR0FBRTtFQUFDLElBQUksSUFBRTtFQUFLLE9BQU9lLElBQUUsV0FBVTtHQUFDLElBQUksSUFBRSxFQUFFLE9BQU0sSUFBRVQ7R0FBRSxNQUFFLEtBQUs7R0FBRSxJQUFHO0lBQUMsRUFBRSxDQUFDO0dBQUMsVUFBUTtJQUFDLE1BQUU7R0FBQztFQUFDLEdBQUUsRUFBQyxNQUFLLE1BQUssQ0FBQztDQUFDO0NBQUUsSUFBRSxVQUFVLFVBQVEsV0FBVTtFQUFDLE9BQU8sS0FBSztDQUFLO0NBQUUsSUFBRSxVQUFVLFdBQVMsV0FBVTtFQUFDLE9BQU8sS0FBSyxRQUFNO0NBQUU7Q0FBRSxJQUFFLFVBQVUsU0FBTyxXQUFVO0VBQUMsT0FBTyxLQUFLO0NBQUs7Q0FBRSxJQUFFLFVBQVUsT0FBSyxXQUFVO0VBQUMsSUFBSSxJQUFFO0VBQUssT0FBT0MsSUFBRSxXQUFVO0dBQUMsT0FBTyxFQUFFO0VBQUssQ0FBQztDQUFDO0NBQUUsT0FBTyxlQUFlTyxJQUFFLFdBQVUsU0FBUTtFQUFDLEtBQUksV0FBVTtHQUFDLElBQUksSUFBRUQsSUFBRSxJQUFJO0dBQUUsSUFBRyxLQUFLLE1BQUksR0FBRSxFQUFFLElBQUUsS0FBSztHQUFFLE9BQU8sS0FBSztFQUFDO0VBQUUsS0FBSSxTQUFTLEdBQUU7R0FBQyxJQUFHLE1BQUksS0FBSyxHQUFFO0lBQUMsSUFBR0osTUFBRSxLQUFJLE1BQU0sSUFBSSxNQUFNLGdCQUFnQjtJQUFFLENBQUMsU0FBUyxHQUFFO0tBQUMsSUFBRyxNQUFJUCxPQUFHLE1BQUlPO1VBQUssRUFBRSxNQUFJRSxLQUFFO09BQUMsRUFBRSxJQUFFQTtPQUFFLE1BQUU7UUFBQyxHQUFFO1FBQUUsR0FBRSxFQUFFO1FBQUUsR0FBRSxFQUFFO1FBQUUsR0FBRVI7T0FBQztNQUFDOztJQUFDLEdBQUUsSUFBSTtJQUFFLEtBQUssSUFBRTtJQUFFLEtBQUs7SUFBSTtJQUFJO0lBQUksSUFBRztLQUFDLEtBQUksSUFBSSxJQUFFLEtBQUssR0FBRSxLQUFLLE1BQUksR0FBRSxJQUFFLEVBQUUsR0FBRSxFQUFFLEVBQUUsRUFBRTtJQUFDLFVBQVE7S0FBQyxJQUFFO0lBQUM7R0FBQztFQUFDO0NBQUMsQ0FBQztDQUFFLFNBQVNhLElBQUUsR0FBRSxHQUFFO0VBQUMsT0FBTyxJQUFJRixJQUFFLEdBQUUsQ0FBQztDQUFDO0NBQUMsU0FBU1QsSUFBRSxHQUFFO0VBQUMsS0FBSSxJQUFJLElBQUUsRUFBRSxHQUFFLEtBQUssTUFBSSxHQUFFLElBQUUsRUFBRSxHQUFFLElBQUcsRUFBRSxFQUFFLE1BQUksRUFBRSxLQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsS0FBRyxFQUFFLEVBQUUsTUFBSSxFQUFFLEdBQUUsT0FBTSxDQUFDO0VBQUUsT0FBTSxDQUFDO0NBQUM7Q0FBQyxTQUFTWSxJQUFFLEdBQUU7RUFBQyxLQUFJLElBQUksSUFBRSxFQUFFLEdBQUUsS0FBSyxNQUFJLEdBQUUsSUFBRSxFQUFFLEdBQUU7R0FBQyxJQUFJLElBQUUsRUFBRSxFQUFFO0dBQUUsSUFBRyxLQUFLLE1BQUksR0FBRSxFQUFFLElBQUU7R0FBRSxFQUFFLEVBQUUsSUFBRTtHQUFFLEVBQUUsSUFBRTtHQUFHLElBQUcsS0FBSyxNQUFJLEVBQUUsR0FBRTtJQUFDLEVBQUUsSUFBRTtJQUFFO0dBQUs7RUFBQztDQUFDO0NBQUMsU0FBU0MsSUFBRSxHQUFFO0VBQUMsSUFBSSxJQUFFLEVBQUUsR0FBRSxJQUFFLEtBQUs7RUFBRSxPQUFNLEtBQUssTUFBSSxHQUFFO0dBQUMsSUFBSSxJQUFFLEVBQUU7R0FBRSxJQUFHLE9BQUssRUFBRSxHQUFFO0lBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUFFLElBQUcsS0FBSyxNQUFJLEdBQUUsRUFBRSxJQUFFLEVBQUU7SUFBRSxJQUFHLEtBQUssTUFBSSxFQUFFLEdBQUUsRUFBRSxFQUFFLElBQUU7R0FBQyxPQUFNLElBQUU7R0FBRSxFQUFFLEVBQUUsSUFBRSxFQUFFO0dBQUUsSUFBRyxLQUFLLE1BQUksRUFBRSxHQUFFLEVBQUUsSUFBRSxLQUFLO0dBQUUsSUFBRTtFQUFDO0VBQUMsRUFBRSxJQUFFO0NBQUM7Q0FBQyxTQUFTQyxJQUFFLEdBQUUsR0FBRTtFQUFDLElBQUUsS0FBSyxNQUFLLEtBQUssQ0FBQztFQUFFLEtBQUssSUFBRTtFQUFFLEtBQUssSUFBRSxLQUFLO0VBQUUsS0FBSyxJQUFFUCxNQUFFO0VBQUUsS0FBSyxJQUFFO0VBQUUsS0FBSyxJQUFFLFFBQU0sSUFBRSxLQUFLLElBQUUsRUFBRTtFQUFRLEtBQUssSUFBRSxRQUFNLElBQUUsS0FBSyxJQUFFLEVBQUU7RUFBVSxLQUFLLE9BQUssUUFBTSxJQUFFLEtBQUssSUFBRSxFQUFFO0NBQUk7Q0FBQyxJQUFFLFlBQVUsSUFBSUUsSUFBQUE7Q0FBRSxJQUFFLFVBQVUsSUFBRSxXQUFVO0VBQUMsS0FBSyxLQUFHO0VBQUcsSUFBRyxJQUFFLEtBQUssR0FBRSxPQUFNLENBQUM7RUFBRSxJQUFHLE9BQUssS0FBRyxLQUFLLElBQUcsT0FBTSxDQUFDO0VBQUUsS0FBSyxLQUFHO0VBQUcsSUFBRyxLQUFLLE1BQUlGLEtBQUUsT0FBTSxDQUFDO0VBQUUsS0FBSyxJQUFFQTtFQUFFLEtBQUssS0FBRztFQUFFLElBQUcsS0FBSyxJQUFFLEtBQUcsQ0FBQ1AsSUFBRSxJQUFJLEdBQUU7R0FBQyxLQUFLLEtBQUc7R0FBRyxPQUFNLENBQUM7RUFBQztFQUFDLElBQUksSUFBRUM7RUFBRSxJQUFHO0dBQUMsSUFBRSxJQUFJO0dBQUUsTUFBRTtHQUFLLElBQUksSUFBRSxLQUFLLEVBQUU7R0FBRSxJQUFHLEtBQUcsS0FBSyxLQUFHLEtBQUssTUFBSSxLQUFHLE1BQUksS0FBSyxHQUFFO0lBQUMsS0FBSyxJQUFFO0lBQUUsS0FBSyxLQUFHO0lBQUksS0FBSztHQUFHO0VBQUMsU0FBTyxHQUFFO0dBQUMsS0FBSyxJQUFFO0dBQUUsS0FBSyxLQUFHO0dBQUcsS0FBSztFQUFHO0VBQUMsTUFBRTtFQUFFLElBQUUsSUFBSTtFQUFFLEtBQUssS0FBRztFQUFHLE9BQU0sQ0FBQztDQUFDO0NBQUUsSUFBRSxVQUFVLElBQUUsU0FBUyxHQUFFO0VBQUMsSUFBRyxLQUFLLE1BQUksS0FBSyxHQUFFO0dBQUMsS0FBSyxLQUFHO0dBQUcsS0FBSSxJQUFJLElBQUUsS0FBSyxHQUFFLEtBQUssTUFBSSxHQUFFLElBQUUsRUFBRSxHQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7RUFBQztFQUFDLElBQUUsVUFBVSxFQUFFLEtBQUssTUFBSyxDQUFDO0NBQUM7Q0FBRSxJQUFFLFVBQVUsSUFBRSxTQUFTLEdBQUU7RUFBQyxJQUFHLEtBQUssTUFBSSxLQUFLLEdBQUU7R0FBQyxJQUFFLFVBQVUsRUFBRSxLQUFLLE1BQUssQ0FBQztHQUFFLElBQUcsS0FBSyxNQUFJLEtBQUssR0FBRTtJQUFDLEtBQUssS0FBRztJQUFJLEtBQUksSUFBSSxJQUFFLEtBQUssR0FBRSxLQUFLLE1BQUksR0FBRSxJQUFFLEVBQUUsR0FBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO0dBQUM7RUFBQztDQUFDO0NBQUUsSUFBRSxVQUFVLElBQUUsV0FBVTtFQUFDLElBQUcsRUFBRSxJQUFFLEtBQUssSUFBRztHQUFDLEtBQUssS0FBRztHQUFFLEtBQUksSUFBSSxJQUFFLEtBQUssR0FBRSxLQUFLLE1BQUksR0FBRSxJQUFFLEVBQUUsR0FBRSxFQUFFLEVBQUUsRUFBRTtFQUFDO0NBQUM7Q0FBRSxP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LENBQUMsR0FBRSxJQUFFLHFFQUFvRSxJQUFFLE1BQU07Q0FBUSxTQUFTLEVBQUUsR0FBRSxHQUFFO0VBQUMsS0FBSSxJQUFJLEtBQUssR0FBRSxFQUFFLEtBQUcsRUFBRTtFQUFHLE9BQU87Q0FBQztDQUFDLFNBQVMsRUFBRSxHQUFFO0VBQUMsS0FBRyxFQUFFLGNBQVksRUFBRSxXQUFXLFlBQVksQ0FBQztDQUFDO0NBQUMsU0FBUyxFQUFFLEdBQUUsR0FBRSxHQUFFO0VBQUMsSUFBSSxHQUFFLEdBQUUsR0FBRSxJQUFFLENBQUM7RUFBRSxLQUFJLEtBQUssR0FBRSxTQUFPLElBQUUsSUFBRSxFQUFFLEtBQUcsU0FBTyxJQUFFLElBQUUsRUFBRSxLQUFHLEVBQUUsS0FBRyxFQUFFO0VBQUcsSUFBRyxVQUFVLFNBQU8sTUFBSSxFQUFFLFdBQVMsVUFBVSxTQUFPLElBQUUsRUFBRSxLQUFLLFdBQVUsQ0FBQyxJQUFFLElBQUcsY0FBWSxPQUFPLEtBQUcsUUFBTSxFQUFFLGNBQWEsS0FBSSxLQUFLLEVBQUUsY0FBYSxLQUFLLE1BQUksRUFBRSxPQUFLLEVBQUUsS0FBRyxFQUFFLGFBQWE7RUFBSSxPQUFPLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxJQUFJO0NBQUM7Q0FBQyxTQUFTLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0VBQUMsSUFBSSxJQUFFO0dBQUMsTUFBSztHQUFFLE9BQU07R0FBRSxLQUFJO0dBQUUsS0FBSTtHQUFFLEtBQUk7R0FBSyxJQUFHO0dBQUssS0FBSTtHQUFFLEtBQUk7R0FBSyxLQUFJO0dBQUssYUFBWSxLQUFLO0dBQUUsS0FBSSxRQUFNLElBQUUsRUFBRUgsTUFBRTtHQUFFLEtBQUk7R0FBRyxLQUFJO0VBQUM7RUFBRSxPQUFPLFFBQU0sS0FBRyxRQUFNLEVBQUUsU0FBTyxFQUFFLE1BQU0sQ0FBQyxHQUFFO0NBQUM7Q0FBbUMsU0FBUyxFQUFFLEdBQUU7RUFBQyxPQUFPLEVBQUU7Q0FBUTtDQUFDLFNBQVMsRUFBRSxHQUFFLEdBQUU7RUFBQyxLQUFLLFFBQU0sR0FBRSxLQUFLLFVBQVE7Q0FBQztDQUFDLFNBQVMsRUFBRSxHQUFFLEdBQUU7RUFBQyxJQUFHLFFBQU0sR0FBRSxPQUFPLEVBQUUsS0FBRyxFQUFFLEVBQUUsSUFBRyxFQUFFLE1BQUksQ0FBQyxJQUFFO0VBQUssS0FBSSxJQUFJLEdBQUUsSUFBRSxFQUFFLElBQUksUUFBTyxLQUFJLElBQUcsU0FBTyxJQUFFLEVBQUUsSUFBSSxPQUFLLFFBQU0sRUFBRSxLQUFJLE9BQU8sRUFBRTtFQUFJLE9BQU0sY0FBWSxPQUFPLEVBQUUsT0FBSyxFQUFFLENBQUMsSUFBRTtDQUFJO0NBQUMsU0FBUyxFQUFFLEdBQUU7RUFBQyxJQUFHLEVBQUUsT0FBSyxFQUFFLEtBQUk7R0FBQyxJQUFJLElBQUUsRUFBRSxLQUFJLElBQUUsRUFBRSxLQUFJLElBQUUsQ0FBQyxHQUFFLElBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxDQUFDLEdBQUUsQ0FBQztHQUFFLEVBQUUsTUFBSSxFQUFFLE1BQUksR0FBRSxFQUFFLFNBQU8sRUFBRSxNQUFNLENBQUMsR0FBRSxFQUFFLEVBQUUsS0FBSSxHQUFFLEdBQUUsRUFBRSxLQUFJLEVBQUUsSUFBSSxjQUFhLEtBQUcsRUFBRSxNQUFJLENBQUMsQ0FBQyxJQUFFLE1BQUssR0FBRSxRQUFNLElBQUUsRUFBRSxDQUFDLElBQUUsR0FBRSxDQUFDLEVBQUUsS0FBRyxFQUFFLE1BQUssQ0FBQyxHQUFFLEVBQUUsTUFBSSxFQUFFLEtBQUksRUFBRSxHQUFHLElBQUksRUFBRSxPQUFLLEdBQUUsRUFBRSxHQUFFLEdBQUUsQ0FBQyxHQUFFLEVBQUUsTUFBSSxFQUFFLEtBQUcsTUFBSyxFQUFFLE9BQUssS0FBRyxFQUFFLENBQUM7RUFBQztDQUFDO0NBQUMsU0FBUyxFQUFFLEdBQUU7RUFBQyxJQUFHLFNBQU8sSUFBRSxFQUFFLE9BQUssUUFBTSxFQUFFLEtBQUksT0FBTyxFQUFFLE1BQUksRUFBRSxJQUFJLE9BQUssTUFBSyxFQUFFLElBQUksS0FBSyxTQUFTLEdBQUU7R0FBQyxJQUFHLFFBQU0sS0FBRyxRQUFNLEVBQUUsS0FBSSxPQUFPLEVBQUUsTUFBSSxFQUFFLElBQUksT0FBSyxFQUFFO0VBQUcsQ0FBQyxHQUFFLEVBQUUsQ0FBQztDQUFDO0NBQUMsU0FBUyxFQUFFLEdBQUU7RUFBQyxDQUFDLENBQUMsRUFBRSxRQUFNLEVBQUUsTUFBSSxDQUFDLE1BQUlDLElBQUUsS0FBSyxDQUFDLEtBQUcsQ0FBQyxFQUFFLFNBQU8sS0FBRyxFQUFFLHdCQUFzQixJQUFFLEVBQUUsc0JBQW9CQyxLQUFHLENBQUM7Q0FBQztDQUFDLFNBQVMsSUFBRztFQUFDLElBQUc7R0FBQyxLQUFJLElBQUksR0FBRSxJQUFFLEdBQUVELElBQUUsU0FBUSxJQUFFLFNBQU8sS0FBR0EsSUFBRSxLQUFLLENBQUMsR0FBRSxJQUFFQSxJQUFFLE1BQU0sR0FBRSxJQUFFQSxJQUFFLFFBQU8sRUFBRSxDQUFDO0VBQUMsVUFBUTtHQUFDLElBQUUsU0FBTyxFQUFFLE1BQUk7RUFBQztDQUFDO0NBQUMsU0FBUyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtFQUFDLElBQUksR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxJQUFFLEtBQUcsRUFBRSxPQUFLLEdBQUUsSUFBRSxFQUFFO0VBQU8sS0FBSSxJQUFFLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxLQUFJLFNBQU8sSUFBRSxFQUFFLElBQUksUUFBTSxJQUFFLE1BQUksRUFBRSxPQUFLLEVBQUUsRUFBRSxRQUFNLEdBQUUsRUFBRSxNQUFJLEdBQUUsSUFBRSxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsS0FBSSxFQUFFLE9BQUssRUFBRSxPQUFLLEVBQUUsUUFBTSxFQUFFLE9BQUssRUFBRSxFQUFFLEtBQUksTUFBSyxDQUFDLEdBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSSxFQUFFLE9BQUssR0FBRSxDQUFDLElBQUcsUUFBTSxLQUFHLFFBQU0sTUFBSSxJQUFFLEtBQUksSUFBRSxDQUFDLEVBQUUsSUFBRSxFQUFFLFNBQU8sRUFBRSxRQUFNLEVBQUUsT0FBSyxJQUFFLEVBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxHQUFFLEtBQUcsRUFBRSxRQUFNLEVBQUUsTUFBSSxTQUFPLGNBQVksT0FBTyxFQUFFLFFBQU0sS0FBSyxNQUFJLElBQUUsSUFBRSxJQUFFLE1BQUksSUFBRSxFQUFFLGNBQWEsRUFBRSxPQUFLO0VBQUksT0FBTyxFQUFFLE1BQUksR0FBRTtDQUFDO0NBQUMsU0FBUyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtFQUFDLElBQUksR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLElBQUUsRUFBRSxRQUFPLElBQUUsR0FBRSxJQUFFO0VBQUUsS0FBSSxFQUFFLE1BQUksSUFBSSxNQUFNLENBQUMsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLEtBQUksU0FBTyxJQUFFLEVBQUUsT0FBSyxhQUFXLE9BQU8sS0FBRyxjQUFZLE9BQU8sS0FBRyxZQUFVLE9BQU8sS0FBRyxZQUFVLE9BQU8sS0FBRyxZQUFVLE9BQU8sS0FBRyxFQUFFLGVBQWEsU0FBTyxJQUFFLEVBQUUsSUFBSSxLQUFHLEVBQUUsTUFBSyxHQUFFLE1BQUssTUFBSyxJQUFJLElBQUUsRUFBRSxDQUFDLElBQUUsSUFBRSxFQUFFLElBQUksS0FBRyxFQUFFLEdBQUUsRUFBQyxVQUFTLEVBQUMsR0FBRSxNQUFLLE1BQUssSUFBSSxJQUFFLEtBQUssTUFBSSxFQUFFLGVBQWEsRUFBRSxNQUFJLElBQUUsSUFBRSxFQUFFLElBQUksS0FBRyxFQUFFLEVBQUUsTUFBSyxFQUFFLE9BQU0sRUFBRSxLQUFJLEVBQUUsTUFBSSxFQUFFLE1BQUksTUFBSyxFQUFFLEdBQUcsSUFBRSxFQUFFLElBQUksS0FBRyxHQUFFLElBQUUsSUFBRSxHQUFFLEVBQUUsS0FBRyxHQUFFLEVBQUUsTUFBSSxFQUFFLE1BQUksR0FBRSxJQUFFLE1BQUssT0FBSyxJQUFFLEVBQUUsTUFBSSxFQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsT0FBSyxNQUFLLElBQUUsRUFBRSxRQUFNLEVBQUUsT0FBSyxLQUFJLFFBQU0sS0FBRyxRQUFNLEVBQUUsT0FBSyxNQUFJLE1BQUksSUFBRSxJQUFFLE1BQUksSUFBRSxLQUFHLE1BQUssY0FBWSxPQUFPLEVBQUUsU0FBTyxFQUFFLE9BQUssTUFBSSxLQUFHLE1BQUksS0FBRyxJQUFFLElBQUUsTUFBSSxLQUFHLElBQUUsSUFBRSxPQUFLLElBQUUsSUFBRSxNQUFJLEtBQUksRUFBRSxPQUFLLE9BQUssRUFBRSxJQUFJLEtBQUc7RUFBSyxJQUFHLEdBQUUsS0FBSSxJQUFFLEdBQUUsSUFBRSxHQUFFLEtBQUksU0FBTyxJQUFFLEVBQUUsT0FBSyxNQUFJLElBQUUsRUFBRSxTQUFPLEVBQUUsT0FBSyxNQUFJLElBQUUsRUFBRSxDQUFDLElBQUcsRUFBRSxHQUFFLENBQUM7RUFBRyxPQUFPO0NBQUM7Q0FBQyxTQUFTLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtFQUFDLElBQUksR0FBRTtFQUFFLElBQUcsY0FBWSxPQUFPLEVBQUUsTUFBSztHQUFDLEtBQUksSUFBRSxFQUFFLEtBQUksSUFBRSxHQUFFLEtBQUcsSUFBRSxFQUFFLFFBQU8sS0FBSSxFQUFFLE9BQUssRUFBRSxHQUFHLEtBQUcsR0FBRSxJQUFFLEVBQUUsRUFBRSxJQUFHLEdBQUUsR0FBRSxDQUFDO0dBQUcsT0FBTztFQUFDO0VBQUMsRUFBRSxPQUFLLE1BQUksTUFBSSxLQUFHLEVBQUUsUUFBTSxDQUFDLEVBQUUsZUFBYSxJQUFFLEVBQUUsQ0FBQyxJQUFHLEVBQUUsYUFBYSxFQUFFLEtBQUksS0FBRyxJQUFJLElBQUcsSUFBRSxFQUFFO0VBQUs7R0FBRyxJQUFFLEtBQUcsRUFBRTtTQUFrQixRQUFNLEtBQUcsS0FBRyxFQUFFO0VBQVUsT0FBTztDQUFDO0NBQTZHLFNBQVMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0VBQUMsSUFBSSxHQUFFLEdBQUUsR0FBRSxJQUFFLEVBQUUsS0FBSSxJQUFFLEVBQUUsTUFBSyxJQUFFLEVBQUUsSUFBRyxJQUFFLFFBQU0sS0FBRyxNQUFJLElBQUUsRUFBRTtFQUFLLElBQUcsU0FBTyxLQUFHLFFBQU0sS0FBRyxLQUFHLEtBQUcsRUFBRSxPQUFLLEtBQUcsRUFBRSxNQUFLLE9BQU87RUFBRSxJQUFHLEtBQUcsSUFBRSxJQUFFO1FBQU8sSUFBRSxJQUFFLEdBQUUsSUFBRSxJQUFFLEdBQUUsS0FBRyxLQUFHLElBQUUsRUFBRSxTQUFRLElBQUcsU0FBTyxJQUFFLEVBQUUsSUFBRSxLQUFHLElBQUUsTUFBSSxTQUFPLE1BQUksSUFBRSxFQUFFLFFBQU0sS0FBRyxFQUFFLE9BQUssS0FBRyxFQUFFLE1BQUssT0FBTztFQUFBO0VBQUUsT0FBTTtDQUFFO0NBQUMsU0FBUyxFQUFFLEdBQUUsR0FBRSxHQUFFO0VBQUMsT0FBSyxFQUFFLEtBQUcsRUFBRSxZQUFZLEdBQUUsUUFBTSxJQUFFLEtBQUcsQ0FBQyxJQUFFLEVBQUUsS0FBRyxRQUFNLElBQUUsS0FBRyxZQUFVLE9BQU8sS0FBRyxFQUFFLEtBQUssQ0FBQyxJQUFFLElBQUUsSUFBRTtDQUFJO0NBQUMsU0FBUyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtFQUFDLElBQUksR0FBRTtFQUFFLEdBQUUsSUFBRyxXQUFTLEdBQUUsSUFBRyxZQUFVLE9BQU8sR0FBRSxFQUFFLE1BQU0sVUFBUTtPQUFNO0dBQUMsSUFBRyxZQUFVLE9BQU8sTUFBSSxFQUFFLE1BQU0sVUFBUSxJQUFFLEtBQUksR0FBRSxLQUFJLEtBQUssR0FBRSxLQUFHLEtBQUssS0FBRyxFQUFFLEVBQUUsT0FBTSxHQUFFLEVBQUU7R0FBRSxJQUFHLEdBQUUsS0FBSSxLQUFLLEdBQUUsS0FBRyxFQUFFLE1BQUksRUFBRSxNQUFJLEVBQUUsRUFBRSxPQUFNLEdBQUUsRUFBRSxFQUFFO0VBQUM7T0FBTSxJQUFHLE9BQUssRUFBRSxNQUFJLE9BQUssRUFBRSxJQUFHLElBQUUsTUFBSSxJQUFFLEVBQUUsUUFBUSxHQUFFLElBQUksSUFBRyxJQUFFLEVBQUUsWUFBWSxHQUFFLElBQUUsS0FBSyxLQUFHLGdCQUFjLEtBQUcsZUFBYSxJQUFFLEVBQUUsTUFBTSxDQUFDLElBQUUsRUFBRSxNQUFNLENBQUMsR0FBRSxFQUFFLE1BQUksRUFBRSxJQUFFLENBQUMsSUFBRyxFQUFFLEVBQUUsSUFBRSxLQUFHLEdBQUUsSUFBRSxJQUFFLEVBQUUsS0FBRyxFQUFFLE1BQUksRUFBRSxLQUFHLEdBQUUsRUFBRSxpQkFBaUIsR0FBRSxJQUFFLElBQUUsR0FBRSxDQUFDLEtBQUcsRUFBRSxvQkFBb0IsR0FBRSxJQUFFLElBQUUsR0FBRSxDQUFDO09BQU07R0FBQyxJQUFHLGdDQUE4QixHQUFFLElBQUUsRUFBRSxRQUFRLGVBQWMsR0FBRyxFQUFFLFFBQVEsVUFBUyxHQUFHO1FBQU8sSUFBRyxXQUFTLEtBQUcsWUFBVSxLQUFHLFVBQVEsS0FBRyxVQUFRLEtBQUcsVUFBUSxLQUFHLGNBQVksS0FBRyxjQUFZLEtBQUcsYUFBVyxLQUFHLGFBQVcsS0FBRyxVQUFRLEtBQUcsYUFBVyxLQUFHLEtBQUssR0FBRSxJQUFHO0lBQUMsRUFBRSxLQUFHLFFBQU0sSUFBRSxLQUFHO0lBQUUsTUFBTTtHQUFDLFNBQU8sR0FBRSxDQUFDO0dBQUMsY0FBWSxPQUFPLE1BQUksUUFBTSxLQUFHLENBQUMsTUFBSSxLQUFHLE9BQUssRUFBRSxLQUFHLEVBQUUsZ0JBQWdCLENBQUMsSUFBRSxFQUFFLGFBQWEsR0FBRSxhQUFXLEtBQUcsS0FBRyxJQUFFLEtBQUcsQ0FBQztFQUFFO0NBQUM7Q0FBQyxTQUFTLEVBQUUsR0FBRTtFQUFDLE9BQU8sU0FBUyxHQUFFO0dBQUMsSUFBRyxLQUFLLEdBQUU7SUFBQyxJQUFJLElBQUUsS0FBSyxFQUFFLEVBQUUsT0FBSztJQUFHLElBQUcsUUFBTSxFQUFFLElBQUcsRUFBRSxLQUFHO1NBQVMsSUFBRyxFQUFFLEtBQUcsRUFBRSxJQUFHO0lBQU8sT0FBTyxFQUFFLEVBQUUsUUFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFFLENBQUM7R0FBQztFQUFDO0NBQUM7Q0FBQyxTQUFTLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtFQUFDLElBQUksR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsSUFBRSxFQUFFO0VBQUssSUFBRyxLQUFLLE1BQUksRUFBRSxhQUFZLE9BQU87RUFBSyxNQUFJLEVBQUUsUUFBTSxJQUFFLENBQUMsRUFBRSxLQUFHLEVBQUUsTUFBSyxJQUFFLENBQUMsSUFBRSxFQUFFLE1BQUksRUFBRSxHQUFHLEtBQUksSUFBRSxFQUFFLFFBQU0sRUFBRSxDQUFDO0VBQUUsR0FBRSxJQUFHLGNBQVksT0FBTyxHQUFFLElBQUc7R0FBQyxJQUFHLElBQUUsRUFBRSxPQUFNLElBQUUsRUFBRSxhQUFXLEVBQUUsVUFBVSxRQUFPLEtBQUcsSUFBRSxFQUFFLGdCQUFjLEVBQUUsRUFBRSxNQUFLLElBQUUsSUFBRSxJQUFFLEVBQUUsTUFBTSxRQUFNLEVBQUUsS0FBRyxHQUFFLEVBQUUsTUFBSSxJQUFFLENBQUMsSUFBRSxFQUFFLE1BQUksRUFBRSxLQUFLLEtBQUcsRUFBRSxPQUFLLElBQUUsRUFBRSxNQUFJLElBQUUsSUFBSSxFQUFFLEdBQUUsQ0FBQyxLQUFHLEVBQUUsTUFBSSxJQUFFLElBQUksRUFBRSxHQUFFLENBQUMsR0FBRSxFQUFFLGNBQVksR0FBRSxFQUFFLFNBQU8sSUFBRyxLQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUUsRUFBRSxVQUFRLEVBQUUsUUFBTSxDQUFDLElBQUcsRUFBRSxNQUFJLEdBQUUsSUFBRSxFQUFFLE1BQUksQ0FBQyxHQUFFLEVBQUUsTUFBSSxDQUFDLEdBQUUsRUFBRSxNQUFJLENBQUMsSUFBRyxLQUFHLFFBQU0sRUFBRSxRQUFNLEVBQUUsTUFBSSxFQUFFLFFBQU8sS0FBRyxRQUFNLEVBQUUsNkJBQTJCLEVBQUUsT0FBSyxFQUFFLFVBQVEsRUFBRSxNQUFJLEVBQUUsQ0FBQyxHQUFFLEVBQUUsR0FBRyxJQUFHLEVBQUUsRUFBRSxLQUFJLEVBQUUseUJBQXlCLEdBQUUsRUFBRSxHQUFHLENBQUMsSUFBRyxJQUFFLEVBQUUsT0FBTSxJQUFFLEVBQUUsT0FBTSxFQUFFLE1BQUksR0FBRSxHQUFFLEtBQUcsUUFBTSxFQUFFLDRCQUEwQixRQUFNLEVBQUUsc0JBQW9CLEVBQUUsbUJBQW1CLEdBQUUsS0FBRyxRQUFNLEVBQUUscUJBQW1CLEVBQUUsSUFBSSxLQUFLLEVBQUUsaUJBQWlCO1FBQU07SUFBQyxJQUFHLEtBQUcsUUFBTSxFQUFFLDRCQUEwQixNQUFJLEtBQUcsUUFBTSxFQUFFLDZCQUEyQixFQUFFLDBCQUEwQixHQUFFLENBQUMsR0FBRSxFQUFFLE9BQUssRUFBRSxPQUFLLENBQUMsRUFBRSxPQUFLLFFBQU0sRUFBRSx5QkFBdUIsQ0FBQyxNQUFJLEVBQUUsc0JBQXNCLEdBQUUsRUFBRSxLQUFJLENBQUMsR0FBRTtLQUFDLEVBQUUsT0FBSyxFQUFFLFFBQU0sRUFBRSxRQUFNLEdBQUUsRUFBRSxRQUFNLEVBQUUsS0FBSSxFQUFFLE1BQUksQ0FBQyxJQUFHLEVBQUUsTUFBSSxFQUFFLEtBQUksRUFBRSxNQUFJLEVBQUUsS0FBSSxFQUFFLElBQUksS0FBSyxTQUFTLEdBQUU7TUFBQyxNQUFJLEVBQUUsS0FBRztLQUFFLENBQUMsR0FBRSxFQUFFLEtBQUssTUFBTSxFQUFFLEtBQUksRUFBRSxHQUFHLEdBQUUsRUFBRSxNQUFJLENBQUMsR0FBRSxFQUFFLElBQUksVUFBUSxFQUFFLEtBQUssQ0FBQztLQUFFLE1BQU07SUFBQztJQUFDLFFBQU0sRUFBRSx1QkFBcUIsRUFBRSxvQkFBb0IsR0FBRSxFQUFFLEtBQUksQ0FBQyxHQUFFLEtBQUcsUUFBTSxFQUFFLHNCQUFvQixFQUFFLElBQUksS0FBSyxXQUFVO0tBQUMsRUFBRSxtQkFBbUIsR0FBRSxHQUFFLENBQUM7SUFBQyxDQUFDO0dBQUM7R0FBQyxJQUFHLEVBQUUsVUFBUSxHQUFFLEVBQUUsUUFBTSxHQUFFLEVBQUUsTUFBSSxHQUFFLEVBQUUsTUFBSSxDQUFDLEdBQUUsSUFBRSxFQUFFLEtBQUksSUFBRSxHQUFFLEdBQUUsRUFBRSxRQUFNLEVBQUUsS0FBSSxFQUFFLE1BQUksQ0FBQyxHQUFFLEtBQUcsRUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFNLEVBQUUsT0FBTSxFQUFFLE9BQU8sR0FBRSxFQUFFLEtBQUssTUFBTSxFQUFFLEtBQUksRUFBRSxHQUFHLEdBQUUsRUFBRSxNQUFJLENBQUM7UUFBTztJQUFHLEVBQUUsTUFBSSxDQUFDLEdBQUUsS0FBRyxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU0sRUFBRSxPQUFNLEVBQUUsT0FBTyxHQUFFLEVBQUUsUUFBTSxFQUFFO1VBQVUsRUFBRSxPQUFLLEVBQUUsSUFBRTtHQUFJLEVBQUUsUUFBTSxFQUFFLEtBQUksUUFBTSxFQUFFLG9CQUFrQixJQUFFLEVBQUUsRUFBRSxDQUFDLEdBQUUsQ0FBQyxHQUFFLEVBQUUsZ0JBQWdCLENBQUMsSUFBRyxLQUFHLENBQUMsS0FBRyxRQUFNLEVBQUUsNEJBQTBCLElBQUUsRUFBRSx3QkFBd0IsR0FBRSxDQUFDLElBQUcsSUFBRSxRQUFNLEtBQUcsRUFBRSxTQUFPLEtBQUcsUUFBTSxFQUFFLE1BQUksRUFBRSxFQUFFLE1BQU0sUUFBUSxJQUFFLEdBQUUsSUFBRSxFQUFFLEdBQUUsRUFBRSxDQUFDLElBQUUsSUFBRSxDQUFDLENBQUMsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxHQUFFLEVBQUUsT0FBSyxFQUFFLEtBQUksRUFBRSxPQUFLLE1BQUssRUFBRSxJQUFJLFVBQVEsRUFBRSxLQUFLLENBQUMsR0FBRSxNQUFJLEVBQUUsTUFBSSxFQUFFLEtBQUc7RUFBSyxTQUFPLEdBQUU7R0FBQyxJQUFHLEVBQUUsTUFBSSxNQUFLLEtBQUcsUUFBTSxHQUFFLElBQUcsRUFBRSxNQUFLO0lBQUMsS0FBSSxFQUFFLE9BQUssSUFBRSxNQUFJLEtBQUksS0FBRyxLQUFHLEVBQUUsWUFBVSxFQUFFLGNBQWEsSUFBRSxFQUFFO0lBQVksRUFBRSxFQUFFLFFBQVEsQ0FBQyxLQUFHLE1BQUssRUFBRSxNQUFJO0dBQUMsT0FBSztJQUFDLEtBQUksSUFBRSxFQUFFLFFBQU8sTUFBSyxFQUFFLEVBQUUsRUFBRTtJQUFFLEVBQUUsQ0FBQztHQUFDO1FBQU0sRUFBRSxNQUFJLEVBQUUsS0FBSSxFQUFFLE1BQUksRUFBRSxLQUFJLEVBQUUsUUFBTSxFQUFFLENBQUM7R0FBRSxFQUFFLElBQUksR0FBRSxHQUFFLENBQUM7RUFBQztPQUFNLFFBQU0sS0FBRyxFQUFFLE9BQUssRUFBRSxPQUFLLEVBQUUsTUFBSSxFQUFFLEtBQUksRUFBRSxNQUFJLEVBQUUsT0FBSyxJQUFFLEVBQUUsTUFBSSxFQUFFLEVBQUUsS0FBSSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7RUFBRSxRQUFPLElBQUUsRUFBRSxXQUFTLEVBQUUsQ0FBQyxHQUFFLE1BQUksRUFBRSxNQUFJLEtBQUssSUFBRTtDQUFDO0NBQUMsU0FBUyxFQUFFLEdBQUU7RUFBQyxNQUFJLEVBQUUsUUFBTSxFQUFFLElBQUksTUFBSSxDQUFDLElBQUcsRUFBRSxPQUFLLEVBQUUsSUFBSSxLQUFLLENBQUM7Q0FBRTtDQUFDLFNBQVMsRUFBRSxHQUFFLEdBQUUsR0FBRTtFQUFDLEtBQUksSUFBSSxJQUFFLEdBQUUsSUFBRSxFQUFFLFFBQU8sS0FBSSxFQUFFLEVBQUUsSUFBRyxFQUFFLEVBQUUsSUFBRyxFQUFFLEVBQUUsRUFBRTtFQUFFLEVBQUUsT0FBSyxFQUFFLElBQUksR0FBRSxDQUFDLEdBQUUsRUFBRSxLQUFLLFNBQVMsR0FBRTtHQUFDLElBQUc7SUFBQyxJQUFFLEVBQUUsS0FBSSxFQUFFLE1BQUksQ0FBQyxHQUFFLEVBQUUsS0FBSyxTQUFTLEdBQUU7S0FBQyxFQUFFLEtBQUssQ0FBQztJQUFDLENBQUM7R0FBQyxTQUFPLEdBQUU7SUFB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RSxNQUFJLGNBQVksS0FBRyxDQUFDLEtBQUcsWUFBVSxLQUFHLEtBQUcsRUFBRSxPQUFLLEVBQUUsR0FBRSxHQUFFLEdBQUUsRUFBRSxJQUFHLENBQUMsR0FBRSxJQUFFLFdBQVUsUUFBTSxLQUFHLEtBQUcsRUFBRSxNQUFJLEVBQUUsR0FBRSxHQUFFLEdBQUUsRUFBRSxJQUFHLENBQUM7RUFBRTtFQUFDLE9BQU87Q0FBQztDQUFDLFNBQVMsRUFBRSxHQUFFLEdBQUUsR0FBRTtFQUFDLElBQUc7R0FBQyxJQUFHLGNBQVksT0FBTyxHQUFFO0lBQUMsSUFBSSxJQUFFLGNBQVksT0FBTyxFQUFFO0lBQUksS0FBRyxFQUFFLElBQUksR0FBRSxLQUFHLFFBQU0sTUFBSSxFQUFFLE1BQUksRUFBRSxDQUFDO0dBQUUsT0FBTSxFQUFFLFVBQVE7RUFBQyxTQUFPLEdBQUU7R0FBQyxFQUFFLElBQUksR0FBRSxDQUFDO0VBQUM7Q0FBQztDQUFDLFNBQVMsRUFBRSxHQUFFLEdBQUUsR0FBRTtFQUFDLElBQUksR0FBRTtFQUFFLElBQUcsRUFBRSxXQUFTLEVBQUUsUUFBUSxDQUFDLElBQUcsSUFBRSxFQUFFLFNBQU8sRUFBRSxXQUFTLEVBQUUsV0FBUyxFQUFFLE9BQUssRUFBRSxHQUFFLE1BQUssQ0FBQyxJQUFHLFNBQU8sSUFBRSxFQUFFLE1BQUs7R0FBQyxJQUFHLEVBQUUsc0JBQXFCLElBQUc7SUFBQyxFQUFFLHFCQUFxQjtHQUFDLFNBQU8sR0FBRTtJQUFDLEVBQUUsSUFBSSxHQUFFLENBQUM7R0FBQztHQUFDLEVBQUUsT0FBSyxFQUFFLE1BQUk7RUFBSTtFQUFDLElBQUcsSUFBRSxFQUFFLEtBQUksS0FBSSxJQUFFLEdBQUUsSUFBRSxFQUFFLFFBQU8sS0FBSSxFQUFFLE1BQUksRUFBRSxFQUFFLElBQUcsR0FBRSxLQUFHLGNBQVksT0FBTyxFQUFFLElBQUk7RUFBRSxLQUFHLEVBQUUsRUFBRSxHQUFHLEdBQUUsRUFBRSxNQUFJLEVBQUUsS0FBRyxFQUFFLE1BQUksS0FBSztDQUFDO0NBQUMsU0FBUyxFQUFF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