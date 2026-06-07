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
	function y$1(i, t) {
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
	function removeElement(element) {
		element.remove();
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
	//#region src/application/handlers/applyBlur.ts
	function applyBlur(amount) {
		const container = querySelector(DomSelector.CONTAINER);
		if (!container) return;
		if (amount === 0) container.style.filter = "";
		else container.style.filter = `blur(${amount}px)`;
	}
	//#endregion
	//#region src/application/effects/onBlur.ts
	function setupBlurEffect(settings) {
		return j$2(() => {
			const obfuscationsEnabled = settings.obfuscationsEnabled.value;
			const blur = settings.blur.value;
			if (obfuscationsEnabled) applyBlur(blur);
			else applyBlur(0);
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
	function showFlash(state) {
		state.overlay.style.display = CssDisplay.BLOCK;
	}
	function hideFlash(state) {
		state.overlay.style.display = CssDisplay.NONE;
	}
	function destroyFlashOverlay(state) {
		state.overlay.remove();
	}
	//#endregion
	//#region src/application/handlers/handleFlash.ts
	function createFlashLoopState() {
		return {
			intervalId: null,
			timeoutId: null
		};
	}
	function triggerFlash(overlayState, loopState, settings) {
		hideFlash(overlayState);
		if (loopState.timeoutId !== null) clearTimeout(loopState.timeoutId);
		const durationMs = settings.flashDuration.value;
		loopState.timeoutId = setTimeout(() => {
			showFlash(overlayState);
			loopState.timeoutId = null;
		}, durationMs);
	}
	function startFlashLoop(overlayState, loopState, settings) {
		stopFlashLoop(loopState);
		showFlash(overlayState);
		triggerFlash(overlayState, loopState, settings);
		const intervalMs = settings.flashInterval.value * 1e3;
		loopState.intervalId = setInterval(() => {
			triggerFlash(overlayState, loopState, settings);
		}, intervalMs);
	}
	function stopFlashLoop(loopState) {
		if (loopState.intervalId !== null) {
			clearInterval(loopState.intervalId);
			loopState.intervalId = null;
		}
		if (loopState.timeoutId !== null) {
			clearTimeout(loopState.timeoutId);
			loopState.timeoutId = null;
		}
	}
	//#endregion
	//#region src/application/effects/onFlash.ts
	function setupFlashEffect(overlayState, loopState, settings, boardChanged) {
		const cleanupModeEffect = j$2(() => {
			const enabled = settings.flashModeEnabled.value;
			settings.flashInterval.value;
			settings.flashDuration.value;
			if (enabled) startFlashLoop(overlayState, loopState, settings);
			else {
				stopFlashLoop(loopState);
				hideFlash(overlayState);
			}
		});
		const cleanupBoardEffect = j$2(() => {
			boardChanged.value;
			if (settings.flashModeEnabled.value && loopState.intervalId !== null) triggerFlash(overlayState, loopState, settings);
		});
		return () => {
			cleanupModeEffect();
			cleanupBoardEffect();
			stopFlashLoop(loopState);
		};
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
	//#region src/constants/annotations.ts
	var AnnotationType = /* @__PURE__ */ function(AnnotationType) {
		AnnotationType["CIRCLE"] = "circle";
		AnnotationType["ARROW"] = "arrow";
		return AnnotationType;
	}({});
	//#endregion
	//#region src/domain/commands/commandParser.ts
	function parseDrawCommand(command) {
		if (!command.startsWith("-")) return [];
		const content = command.slice(1);
		if (!content) return [];
		const parts = content.split(",");
		const annotations = [];
		for (const part of parts) if (part.length === 2) annotations.push({
			type: AnnotationType.CIRCLE,
			square: part
		});
		else if (part.length === 4) {
			const from = part.slice(0, 2);
			const to = part.slice(2, 4);
			annotations.push({
				type: AnnotationType.ARROW,
				from,
				to
			});
		}
		return annotations;
	}
	//#endregion
	//#region src/presentation/non-preact-components/annotations.ts
	var ANNOTATION_COLOR = "red";
	var CIRCLE_RADIUS = 20;
	var ARROW_WIDTH = 3;
	function squareToPixelPosition(square, boardSize) {
		const file = square.charCodeAt(0) - "a".charCodeAt(0);
		const rank = Number.parseInt(square[1]) - 1;
		const squareSize = boardSize / 8;
		return {
			x: file * squareSize + squareSize / 2,
			y: (7 - rank) * squareSize + squareSize / 2
		};
	}
	function createCircle(square, boardSize) {
		const pos = squareToPixelPosition(square, boardSize);
		const circle = createSvgElement("circle");
		circle.setAttribute("cx", pos.x.toString());
		circle.setAttribute("cy", pos.y.toString());
		circle.setAttribute("r", CIRCLE_RADIUS.toString());
		circle.setAttribute("fill", "none");
		circle.setAttribute("stroke", ANNOTATION_COLOR);
		circle.setAttribute("stroke-width", "3");
		return circle;
	}
	function createArrow(from, to, boardSize) {
		const fromPos = squareToPixelPosition(from, boardSize);
		const toPos = squareToPixelPosition(to, boardSize);
		const group = createSvgElement("g");
		const line = createSvgElement("line");
		line.setAttribute("x1", fromPos.x.toString());
		line.setAttribute("y1", fromPos.y.toString());
		line.setAttribute("x2", toPos.x.toString());
		line.setAttribute("y2", toPos.y.toString());
		line.setAttribute("stroke", ANNOTATION_COLOR);
		line.setAttribute("stroke-width", ARROW_WIDTH.toString());
		line.setAttribute("marker-end", "url(#arrowhead)");
		appendChild(group, line);
		return group;
	}
	function createArrowheadMarker() {
		const defs = createSvgElement("defs");
		const marker = createSvgElement("marker");
		marker.setAttribute("id", "arrowhead");
		marker.setAttribute("markerWidth", "10");
		marker.setAttribute("markerHeight", "10");
		marker.setAttribute("refX", "9");
		marker.setAttribute("refY", "3");
		marker.setAttribute("orient", "auto");
		const polygon = createSvgElement("polygon");
		polygon.setAttribute("points", "0 0, 10 3, 0 6");
		polygon.setAttribute("fill", ANNOTATION_COLOR);
		appendChild(marker, polygon);
		appendChild(defs, marker);
		return defs;
	}
	function createAnnotations() {
		const container = querySelector(DomSelector.CONTAINER);
		if (!container) throw new Error("Container not found");
		const board = querySelector(DomSelector.BOARD);
		if (!board) throw new Error("Board not found");
		const size = board.getBoundingClientRect().width;
		const svg = createSvgElement("svg");
		svg.setAttribute("class", CssClass.USERSCRIPT_DRAWINGS);
		svg.setAttribute("width", size.toString());
		svg.setAttribute("height", size.toString());
		svg.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 200;
  `;
		appendChild(svg, createArrowheadMarker());
		appendChild(container, svg);
		return { svg };
	}
	function drawAnnotations(state, annotations) {
		const children = Array.from(state.svg.children);
		for (const child of children) if (child.tagName !== "defs") removeElement(child);
		if (annotations.length === 0) return;
		const board = querySelector(DomSelector.BOARD);
		if (!board) return;
		const boardSize = board.getBoundingClientRect().width;
		for (const annotation of annotations) if (annotation.type === AnnotationType.CIRCLE) {
			const circle = createCircle(annotation.square, boardSize);
			appendChild(state.svg, circle);
		} else if (annotation.type === AnnotationType.ARROW) {
			const arrow = createArrow(annotation.from, annotation.to, boardSize);
			appendChild(state.svg, arrow);
		}
	}
	function destroyAnnotations(state) {
		removeElement(state.svg);
	}
	//#endregion
	//#region src/application/handlers/handleDrawCommand.ts
	function handleDrawCommand(command, state) {
		drawAnnotations(state, parseDrawCommand(command));
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
	function setupKeyboardCommands(settings, annotationsState) {
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
			if (value.startsWith("-")) {
				handleDrawCommand(value, annotationsState);
				return;
			}
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
	var n, l$2, u$2, t$1, i$2, r$1, o$2, e$1, f$2, c$1, a$1, s$2, h$1, p$2, v$2, y, d$1 = {}, w$1 = [], _ = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, g = Array.isArray;
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
	function A$1(n) {
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
					n.__e = !0, A$1(n);
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
		"function" == typeof n && (n = n(m$1({}, u), this.props)), n && m$1(u, n), null != n && this.__v && (l && this._sb.push(l), A$1(this));
	}, C$1.prototype.forceUpdate = function(n) {
		this.__v && (this.__e = !0, n && this.__h.push(n), A$1(this));
	}, C$1.prototype.render = S, i$2 = [], o$2 = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, e$1 = function(n, l) {
		return n.__v.__b - l.__v.__b;
	}, H.__r = 0, f$2 = Math.random().toString(8), c$1 = "__d" + f$2, a$1 = "__a" + f$2, s$2 = /(PointerCapture)$|Capture$/i, h$1 = 0, p$2 = V(!1), v$2 = V(!0), y = 0;
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
	function A(n) {
		return o$1 = 5, T(function() {
			return { current: n };
		}, []);
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
	var v, s;
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
		v = t;
		d(n);
	});
	l("__e", function(i, r, n, t) {
		d();
		v = void 0;
		i(r, n, t);
	});
	l("diffed", function(i, r) {
		d();
		v = void 0;
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
		var f = r in i && void 0 === i.ownerSVGElement, o = y$1(n);
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
			return y$1(i);
		}, []);
	}
	function useComputed(i) {
		var r = A(i);
		r.current = i;
		v.__$f |= 4;
		return T(function() {
			return g$1(function() {
				return r.current();
			});
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
		const displayText = useComputed(() => `${label}: ${setting.value}`);
		const handleClick = (e) => {
			e.preventDefault();
			e.stopPropagation();
			setting.value = options[(options.indexOf(setting.value) + 1) % options.length];
		};
		return /* @__PURE__ */ u("button", {
			onClick: handleClick,
			type: "button",
			style: buttonStyle,
			children: displayText
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
			/* @__PURE__ */ u(ButtonRow, { children: /* @__PURE__ */ u(SettingButton, {
				label: "Pieces List",
				setting: settings.piecesListEnabled,
				options: TOGGLE_OPTIONS
			}) }),
			/* @__PURE__ */ u(ButtonRow, { children: /* @__PURE__ */ u(ActionButton, {
				label: "Annotate Board",
				onClick: () => {
					console.log("Annotate Board clicked");
				}
			}) }),
			/* @__PURE__ */ u(ButtonRow, { children: [/* @__PURE__ */ u(SettingButton, {
				label: "Dividers",
				setting: settings.dividersEnabled,
				options: TOGGLE_OPTIONS
			}), /* @__PURE__ */ u(SettingButton, {
				label: "Custom Board",
				setting: settings.customBoardEnabled,
				options: TOGGLE_OPTIONS
			})] }),
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
			/* @__PURE__ */ u(ButtonRow, { children: /* @__PURE__ */ u(SettingButton, {
				label: "Flash Mode",
				setting: settings.flashModeEnabled,
				options: TOGGLE_OPTIONS
			}) }),
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
	//#region src/init.tsx
	async function init() {
		await waitForElement(DomSelector.KEYBOARD_MOVE);
		const settings = createSettingsStore();
		loadSettings(settings);
		setupAutoSave(settings);
		const boardChanged = y$1(0);
		const flashState = createFlashOverlay();
		const flashLoopState = createFlashLoopState();
		const dividersState = createDividers();
		const annotationsState = createAnnotations();
		const boardObserverState = createBoardObserver(boardChanged);
		startBoardObserver(boardObserverState);
		const cleanupDividers = setupDividersEffect(dividersState, settings);
		const cleanupFlash = setupFlashEffect(flashState, flashLoopState, settings, boardChanged);
		const cleanupBlur = setupBlurEffect(settings);
		setupKeyboardCommands(settings, annotationsState);
		const mountPoint = createDiv();
		const keyboardMove = querySelector(DomSelector.KEYBOARD_MOVE);
		if (keyboardMove) appendChild(keyboardMove, mountPoint);
		createRoot(boardChanged, mountPoint, settings);
		return () => {
			cleanupDividers();
			cleanupFlash();
			cleanupBlur();
			stopBoardObserver(boardObserverState);
			destroyFlashOverlay(flashState);
			destroyDividers(dividersState);
			destroyAnnotations(annotationsState);
			teardownKeyboardCommands();
			destroyRoot(mountPoint);
		};
	}
	//#endregion
	//#region src/main.tsx
	init().catch(console.error);
	//#endregion
})();

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGljaGVzcy1ib2FyZC1zcGVha2VyLnVzZXIuanMiLCJuYW1lcyI6WyJpIiwidCIsInMiLCJjIiwiaCIsInciLCJyIiwibyIsImYiLCJ2IiwidSIsImUiLCJkIiwiYSIsImwiLCJqIiwieSIsIl8iLCJiIiwicCIsImciLCJTIiwibSIsIngiLCJFIiwibCIsInUiLCJ0IiwiaSIsInIiLCJvIiwiZSIsImYiLCJjIiwiYSIsInMiLCJoIiwicCIsInYiLCJkIiwidyIsIm0iLCJrIiwieCIsIkMiLCJBIiwiVCIsImoiLCJ6IiwiQiIsInUiLCJpIiwibyIsImYiLCJuIiwidiIsImwiLCJzIiwicCIsInIiLCJyIiwidCIsIm4iLCJ1IiwiZSIsImEiLCJjIiwiZiJdLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9AcHJlYWN0L3NpZ25hbHMtY29yZS9kaXN0L3NpZ25hbHMtY29yZS5tb2R1bGUuanMiLCJzcmMvY29uc3RhbnRzL2RvbS50cyIsInNyYy9wbGF0Zm9ybS9kb20udHMiLCJzcmMvYXBwbGljYXRpb24vaGFuZGxlcnMvYXBwbHlCbHVyLnRzIiwic3JjL2FwcGxpY2F0aW9uL2VmZmVjdHMvb25CbHVyLnRzIiwic3JjL3ByZXNlbnRhdGlvbi9ub24tcHJlYWN0LWNvbXBvbmVudHMvZGl2aWRlcnMudHMiLCJzcmMvYXBwbGljYXRpb24vaGFuZGxlcnMvdXBkYXRlRGl2aWRlcnMudHMiLCJzcmMvYXBwbGljYXRpb24vZWZmZWN0cy9vbkRpdmlkZXJzLnRzIiwic3JjL3ByZXNlbnRhdGlvbi9ub24tcHJlYWN0LWNvbXBvbmVudHMvZmxhc2gudHMiLCJzcmMvYXBwbGljYXRpb24vaGFuZGxlcnMvaGFuZGxlRmxhc2gudHMiLCJzcmMvYXBwbGljYXRpb24vZWZmZWN0cy9vbkZsYXNoLnRzIiwic3JjL2NvbnN0YW50cy9jb21tYW5kcy50cyIsInNyYy9jb25zdGFudHMvYW5ub3RhdGlvbnMudHMiLCJzcmMvZG9tYWluL2NvbW1hbmRzL2NvbW1hbmRQYXJzZXIudHMiLCJzcmMvcHJlc2VudGF0aW9uL25vbi1wcmVhY3QtY29tcG9uZW50cy9hbm5vdGF0aW9ucy50cyIsInNyYy9hcHBsaWNhdGlvbi9oYW5kbGVycy9oYW5kbGVEcmF3Q29tbWFuZC50cyIsInNyYy9jb25zdGFudHMvY2hlc3MudHMiLCJzcmMvZG9tYWluL2NoZXNzL3BpZWNlR3JvdXBpbmcudHMiLCJzcmMvZG9tYWluL3NwZWVjaC9zcGVlY2hUZXh0LnRzIiwic3JjL3BsYXRmb3JtL3NwZWVjaC9jb3JlLnRzIiwic3JjL3BsYXRmb3JtL3NwZWVjaC9pbmRleC50cyIsInNyYy9kb21haW4vY2hlc3MvY29vcmRpbmF0ZXMudHMiLCJzcmMvYXBwbGljYXRpb24vc2VydmljZXMvYm9hcmRSZWFkZXIvZXh0cmFjdGlvbi50cyIsInNyYy9hcHBsaWNhdGlvbi9zZXJ2aWNlcy9ib2FyZFJlYWRlci9yZWFkZXIudHMiLCJzcmMvYXBwbGljYXRpb24vaGFuZGxlcnMvaGFuZGxlU3BlZWNoQ29tbWFuZC50cyIsInNyYy9hcHBsaWNhdGlvbi9pbnB1dC9rZXlib2FyZElucHV0LnRzIiwic3JjL3BsYXRmb3JtL211dGF0aW9uT2JzZXJ2ZXIudHMiLCJzcmMvYXBwbGljYXRpb24vb2JzZXJ2ZXJzL29ic2VydmVyU3RhdGUudHMiLCJzcmMvY29uc3RhbnRzL3NldHRpbmdzLnRzIiwic3JjL3BsYXRmb3JtL3N0b3JhZ2UudHMiLCJzcmMvYXBwbGljYXRpb24vc2V0dGluZ3Mvc2V0dGluZ3NTdG9yZS50cyIsIm5vZGVfbW9kdWxlcy9wcmVhY3QvZGlzdC9wcmVhY3QubW9kdWxlLmpzIiwibm9kZV9tb2R1bGVzL3ByZWFjdC9ob29rcy9kaXN0L2hvb2tzLm1vZHVsZS5qcyIsIm5vZGVfbW9kdWxlcy9wcmVhY3QvanN4LXJ1bnRpbWUvZGlzdC9qc3hSdW50aW1lLm1vZHVsZS5qcyIsInNyYy9wcmVzZW50YXRpb24vY29udGV4dHMvU2V0dGluZ3NDb250ZXh0LnRzeCIsInNyYy9jb25zdGFudHMvb3B0aW9ucy50cyIsInNyYy9wcmVzZW50YXRpb24vY29tcG9uZW50cy9BY3Rpb25CdXR0b24udHN4Iiwic3JjL3ByZXNlbnRhdGlvbi9jb21wb25lbnRzL0J1dHRvblJvdy50c3giLCJzcmMvcHJlc2VudGF0aW9uL2NvbXBvbmVudHMvQ29uZGl0aW9uYWxDb250cm9scy50c3giLCJub2RlX21vZHVsZXMvQHByZWFjdC9zaWduYWxzL2Rpc3Qvc2lnbmFscy5tb2R1bGUuanMiLCJzcmMvcHJlc2VudGF0aW9uL2NvbXBvbmVudHMvU2V0dGluZ0J1dHRvbi50c3giLCJzcmMvcHJlc2VudGF0aW9uL2NvbXBvbmVudHMvU3BlZWNoQnV0dG9ucy50c3giLCJzcmMvcHJlc2VudGF0aW9uL2NvbXBvbmVudHMvQ29udHJvbFBhbmVsLnRzeCIsInNyYy9wcmVzZW50YXRpb24vY29tcG9uZW50cy9yb290LnRzeCIsInNyYy9pbml0LnRzeCIsInNyYy9tYWluLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgaT1TeW1ib2wuZm9yKFwicHJlYWN0LXNpZ25hbHNcIik7ZnVuY3Rpb24gdCgpe2lmKCEocz4xKSl7dmFyIGksdD0hMTshZnVuY3Rpb24oKXt2YXIgaT1jO2M9dm9pZCAwO3doaWxlKHZvaWQgMCE9PWkpe2lmKGkuUy52PT09aS52KWkuUy5pPWkuaTtpPWkub319KCk7d2hpbGUodm9pZCAwIT09aCl7dmFyIG49aDtoPXZvaWQgMDt2Kys7d2hpbGUodm9pZCAwIT09bil7dmFyIHI9bi51O24udT12b2lkIDA7bi5mJj0tMztpZighKDgmbi5mKSYmdyhuKSl0cnl7bi5jKCl9Y2F0Y2gobil7aWYoIXQpe2k9bjt0PSEwfX1uPXJ9fXY9MDtzLS07aWYodCl0aHJvdyBpfWVsc2Ugcy0tfWZ1bmN0aW9uIG4oaSl7aWYocz4wKXJldHVybiBpKCk7ZT0rK3U7cysrO3RyeXtyZXR1cm4gaSgpfWZpbmFsbHl7dCgpfX12YXIgcj12b2lkIDA7ZnVuY3Rpb24gbyhpKXt2YXIgdD1yO3I9dm9pZCAwO3RyeXtyZXR1cm4gaSgpfWZpbmFsbHl7cj10fX12YXIgZixoPXZvaWQgMCxzPTAsdj0wLHU9MCxlPTAsYz12b2lkIDAsZD0wO2Z1bmN0aW9uIGEoaSl7aWYodm9pZCAwIT09cil7dmFyIHQ9aS5uO2lmKHZvaWQgMD09PXR8fHQudCE9PXIpe3Q9e2k6MCxTOmkscDpyLnMsbjp2b2lkIDAsdDpyLGU6dm9pZCAwLHg6dm9pZCAwLHI6dH07aWYodm9pZCAwIT09ci5zKXIucy5uPXQ7ci5zPXQ7aS5uPXQ7aWYoMzImci5mKWkuUyh0KTtyZXR1cm4gdH1lbHNlIGlmKC0xPT09dC5pKXt0Lmk9MDtpZih2b2lkIDAhPT10Lm4pe3Qubi5wPXQucDtpZih2b2lkIDAhPT10LnApdC5wLm49dC5uO3QucD1yLnM7dC5uPXZvaWQgMDtyLnMubj10O3Iucz10fXJldHVybiB0fX19ZnVuY3Rpb24gbChpLHQpe3RoaXMudj1pO3RoaXMuaT0wO3RoaXMubj12b2lkIDA7dGhpcy50PXZvaWQgMDt0aGlzLmw9MDt0aGlzLlc9bnVsbD09dD92b2lkIDA6dC53YXRjaGVkO3RoaXMuWj1udWxsPT10P3ZvaWQgMDp0LnVud2F0Y2hlZDt0aGlzLm5hbWU9bnVsbD09dD92b2lkIDA6dC5uYW1lfWwucHJvdG90eXBlLmJyYW5kPWk7bC5wcm90b3R5cGUuaD1mdW5jdGlvbigpe3JldHVybiEwfTtsLnByb3RvdHlwZS5TPWZ1bmN0aW9uKGkpe3ZhciB0PXRoaXMsbj10aGlzLnQ7aWYobiE9PWkmJnZvaWQgMD09PWkuZSl7aS54PW47dGhpcy50PWk7aWYodm9pZCAwIT09biluLmU9aTtlbHNlIG8oZnVuY3Rpb24oKXt2YXIgaTtudWxsPT0oaT10LlcpfHxpLmNhbGwodCl9KX19O2wucHJvdG90eXBlLlU9ZnVuY3Rpb24oaSl7dmFyIHQ9dGhpcztpZih2b2lkIDAhPT10aGlzLnQpe3ZhciBuPWkuZSxyPWkueDtpZih2b2lkIDAhPT1uKXtuLng9cjtpLmU9dm9pZCAwfWlmKHZvaWQgMCE9PXIpe3IuZT1uO2kueD12b2lkIDB9aWYoaT09PXRoaXMudCl7dGhpcy50PXI7aWYodm9pZCAwPT09cilvKGZ1bmN0aW9uKCl7dmFyIGk7bnVsbD09KGk9dC5aKXx8aS5jYWxsKHQpfSl9fX07bC5wcm90b3R5cGUuc3Vic2NyaWJlPWZ1bmN0aW9uKGkpe3ZhciB0PXRoaXM7cmV0dXJuIGooZnVuY3Rpb24oKXt2YXIgbj10LnZhbHVlLG89cjtyPXZvaWQgMDt0cnl7aShuKX1maW5hbGx5e3I9b319LHtuYW1lOlwic3ViXCJ9KX07bC5wcm90b3R5cGUudmFsdWVPZj1mdW5jdGlvbigpe3JldHVybiB0aGlzLnZhbHVlfTtsLnByb3RvdHlwZS50b1N0cmluZz1mdW5jdGlvbigpe3JldHVybiB0aGlzLnZhbHVlK1wiXCJ9O2wucHJvdG90eXBlLnRvSlNPTj1mdW5jdGlvbigpe3JldHVybiB0aGlzLnZhbHVlfTtsLnByb3RvdHlwZS5wZWVrPWZ1bmN0aW9uKCl7dmFyIGk9dGhpcztyZXR1cm4gbyhmdW5jdGlvbigpe3JldHVybiBpLnZhbHVlfSl9O09iamVjdC5kZWZpbmVQcm9wZXJ0eShsLnByb3RvdHlwZSxcInZhbHVlXCIse2dldDpmdW5jdGlvbigpe3ZhciBpPWEodGhpcyk7aWYodm9pZCAwIT09aSlpLmk9dGhpcy5pO3JldHVybiB0aGlzLnZ9LHNldDpmdW5jdGlvbihpKXtpZihpIT09dGhpcy52KXtpZih2PjEwMCl0aHJvdyBuZXcgRXJyb3IoXCJDeWNsZSBkZXRlY3RlZFwiKTshZnVuY3Rpb24oaSl7aWYoMCE9PXMmJjA9PT12KWlmKGkubCE9PWUpe2kubD1lO2M9e1M6aSx2OmkudixpOmkuaSxvOmN9fX0odGhpcyk7dGhpcy52PWk7dGhpcy5pKys7ZCsrO3MrKzt0cnl7Zm9yKHZhciBuPXRoaXMudDt2b2lkIDAhPT1uO249bi54KW4udC5OKCl9ZmluYWxseXt0KCl9fX19KTtmdW5jdGlvbiB5KGksdCl7cmV0dXJuIG5ldyBsKGksdCl9ZnVuY3Rpb24gdyhpKXtmb3IodmFyIHQ9aS5zO3ZvaWQgMCE9PXQ7dD10Lm4paWYodC5TLmkhPT10Lml8fCF0LlMuaCgpfHx0LlMuaSE9PXQuaSlyZXR1cm4hMDtyZXR1cm4hMX1mdW5jdGlvbiBfKGkpe2Zvcih2YXIgdD1pLnM7dm9pZCAwIT09dDt0PXQubil7dmFyIG49dC5TLm47aWYodm9pZCAwIT09bil0LnI9bjt0LlMubj10O3QuaT0tMTtpZih2b2lkIDA9PT10Lm4pe2kucz10O2JyZWFrfX19ZnVuY3Rpb24gYihpKXt2YXIgdD1pLnMsbj12b2lkIDA7d2hpbGUodm9pZCAwIT09dCl7dmFyIHI9dC5wO2lmKC0xPT09dC5pKXt0LlMuVSh0KTtpZih2b2lkIDAhPT1yKXIubj10Lm47aWYodm9pZCAwIT09dC5uKXQubi5wPXJ9ZWxzZSBuPXQ7dC5TLm49dC5yO2lmKHZvaWQgMCE9PXQucil0LnI9dm9pZCAwO3Q9cn1pLnM9bn1mdW5jdGlvbiBwKGksdCl7bC5jYWxsKHRoaXMsdm9pZCAwKTt0aGlzLng9aTt0aGlzLnM9dm9pZCAwO3RoaXMuZz1kLTE7dGhpcy5mPTQ7dGhpcy5XPW51bGw9PXQ/dm9pZCAwOnQud2F0Y2hlZDt0aGlzLlo9bnVsbD09dD92b2lkIDA6dC51bndhdGNoZWQ7dGhpcy5uYW1lPW51bGw9PXQ/dm9pZCAwOnQubmFtZX1wLnByb3RvdHlwZT1uZXcgbDtwLnByb3RvdHlwZS5oPWZ1bmN0aW9uKCl7dGhpcy5mJj0tMztpZigxJnRoaXMuZilyZXR1cm4hMTtpZigzMj09KDM2JnRoaXMuZikpcmV0dXJuITA7dGhpcy5mJj0tNTtpZih0aGlzLmc9PT1kKXJldHVybiEwO3RoaXMuZz1kO3RoaXMuZnw9MTtpZih0aGlzLmk+MCYmIXcodGhpcykpe3RoaXMuZiY9LTI7cmV0dXJuITB9dmFyIGk9cjt0cnl7Xyh0aGlzKTtyPXRoaXM7dmFyIHQ9dGhpcy54KCk7aWYoMTYmdGhpcy5mfHx0aGlzLnYhPT10fHwwPT09dGhpcy5pKXt0aGlzLnY9dDt0aGlzLmYmPS0xNzt0aGlzLmkrK319Y2F0Y2goaSl7dGhpcy52PWk7dGhpcy5mfD0xNjt0aGlzLmkrK31yPWk7Yih0aGlzKTt0aGlzLmYmPS0yO3JldHVybiEwfTtwLnByb3RvdHlwZS5TPWZ1bmN0aW9uKGkpe2lmKHZvaWQgMD09PXRoaXMudCl7dGhpcy5mfD0zNjtmb3IodmFyIHQ9dGhpcy5zO3ZvaWQgMCE9PXQ7dD10Lm4pdC5TLlModCl9bC5wcm90b3R5cGUuUy5jYWxsKHRoaXMsaSl9O3AucHJvdG90eXBlLlU9ZnVuY3Rpb24oaSl7aWYodm9pZCAwIT09dGhpcy50KXtsLnByb3RvdHlwZS5VLmNhbGwodGhpcyxpKTtpZih2b2lkIDA9PT10aGlzLnQpe3RoaXMuZiY9LTMzO2Zvcih2YXIgdD10aGlzLnM7dm9pZCAwIT09dDt0PXQubil0LlMuVSh0KX19fTtwLnByb3RvdHlwZS5OPWZ1bmN0aW9uKCl7aWYoISgyJnRoaXMuZikpe3RoaXMuZnw9Njtmb3IodmFyIGk9dGhpcy50O3ZvaWQgMCE9PWk7aT1pLngpaS50Lk4oKX19O09iamVjdC5kZWZpbmVQcm9wZXJ0eShwLnByb3RvdHlwZSxcInZhbHVlXCIse2dldDpmdW5jdGlvbigpe2lmKDEmdGhpcy5mKXRocm93IG5ldyBFcnJvcihcIkN5Y2xlIGRldGVjdGVkXCIpO3ZhciBpPWEodGhpcyk7dGhpcy5oKCk7aWYodm9pZCAwIT09aSlpLmk9dGhpcy5pO2lmKDE2JnRoaXMuZil0aHJvdyB0aGlzLnY7cmV0dXJuIHRoaXMudn19KTtmdW5jdGlvbiBnKGksdCl7cmV0dXJuIG5ldyBwKGksdCl9ZnVuY3Rpb24gUyhpKXt2YXIgbj1pLm07aS5tPXZvaWQgMDtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBuKXtzKys7dmFyIG89cjtyPXZvaWQgMDt0cnl7bigpfWNhdGNoKHQpe2kuZiY9LTI7aS5mfD04O20oaSk7dGhyb3cgdH1maW5hbGx5e3I9bzt0KCl9fX1mdW5jdGlvbiBtKGkpe2Zvcih2YXIgdD1pLnM7dm9pZCAwIT09dDt0PXQubil0LlMuVSh0KTtpLng9dm9pZCAwO2kucz12b2lkIDA7UyhpKX1mdW5jdGlvbiB4KGkpe2lmKHIhPT10aGlzKXRocm93IG5ldyBFcnJvcihcIk91dC1vZi1vcmRlciBlZmZlY3RcIik7Yih0aGlzKTtyPWk7dGhpcy5mJj0tMjtpZig4JnRoaXMuZiltKHRoaXMpO3QoKX1mdW5jdGlvbiBFKGksdCl7dGhpcy54PWk7dGhpcy5tPXZvaWQgMDt0aGlzLnM9dm9pZCAwO3RoaXMudT12b2lkIDA7dGhpcy5mPTMyO3RoaXMubmFtZT1udWxsPT10P3ZvaWQgMDp0Lm5hbWU7aWYoZilmLnB1c2godGhpcyl9RS5wcm90b3R5cGUuYz1mdW5jdGlvbigpe3ZhciBpPXRoaXMuUygpO3RyeXtpZig4JnRoaXMuZilyZXR1cm47aWYodm9pZCAwPT09dGhpcy54KXJldHVybjt2YXIgdD10aGlzLngoKTtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiB0KXRoaXMubT10fWZpbmFsbHl7aSgpfX07RS5wcm90b3R5cGUuUz1mdW5jdGlvbigpe2lmKDEmdGhpcy5mKXRocm93IG5ldyBFcnJvcihcIkN5Y2xlIGRldGVjdGVkXCIpO3RoaXMuZnw9MTt0aGlzLmYmPS05O1ModGhpcyk7Xyh0aGlzKTtzKys7dmFyIGk9cjtyPXRoaXM7cmV0dXJuIHguYmluZCh0aGlzLGkpfTtFLnByb3RvdHlwZS5OPWZ1bmN0aW9uKCl7aWYoISgyJnRoaXMuZikpe3RoaXMuZnw9Mjt0aGlzLnU9aDtoPXRoaXN9fTtFLnByb3RvdHlwZS5kPWZ1bmN0aW9uKCl7dGhpcy5mfD04O2lmKCEoMSZ0aGlzLmYpKW0odGhpcyl9O0UucHJvdG90eXBlLmRpc3Bvc2U9ZnVuY3Rpb24oKXt0aGlzLmQoKX07ZnVuY3Rpb24gaihpLHQpe3ZhciBuPW5ldyBFKGksdCk7dHJ5e24uYygpfWNhdGNoKGkpe24uZCgpO3Rocm93IGl9dmFyIHI9bi5kLmJpbmQobik7cltTeW1ib2wuZGlzcG9zZV09cjtyZXR1cm4gcn1mdW5jdGlvbiBDKGkpe3JldHVybiBmdW5jdGlvbigpe3ZhciB0PWFyZ3VtZW50cyxyPXRoaXM7cmV0dXJuIG4oZnVuY3Rpb24oKXtyZXR1cm4gbyhmdW5jdGlvbigpe3JldHVybiBpLmFwcGx5KHIsW10uc2xpY2UuY2FsbCh0KSl9KX0pfX1mdW5jdGlvbiBPKCl7dmFyIGk9ZjtmPVtdO3JldHVybiBmdW5jdGlvbigpe3ZhciB0PWY7aWYoZiYmaSlpPWkuY29uY2F0KGYpO2Y9aTtyZXR1cm4gdH19dmFyIGs9ZnVuY3Rpb24oaSl7Zm9yKHZhciB0IGluIGkpe3ZhciBuPWlbdF07aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgbilpW3RdPUMobik7ZWxzZSBpZihcIm9iamVjdFwiPT10eXBlb2YgbiYmbnVsbCE9PW4mJiEoXCJicmFuZFwiaW4gbikpayhuKX19O2Z1bmN0aW9uIFQoaSl7cmV0dXJuIGZ1bmN0aW9uKCl7dmFyIHQsbixyPU8oKTt0cnl7bj1pLmFwcGx5KHZvaWQgMCxbXS5zbGljZS5jYWxsKGFyZ3VtZW50cykpfWNhdGNoKGkpe2Y9dm9pZCAwO3Rocm93IGl9ZmluYWxseXt0PXIoKX1rKG4pO25bU3ltYm9sLmRpc3Bvc2VdPUMoZnVuY3Rpb24oKXtpZih0KWZvcih2YXIgaT0wO2k8dC5sZW5ndGg7aSsrKXRbaV0uZGlzcG9zZSgpO3Q9dm9pZCAwfSk7cmV0dXJuIG59fWV4cG9ydHtwIGFzIENvbXB1dGVkLEUgYXMgRWZmZWN0LGwgYXMgU2lnbmFsLEMgYXMgYWN0aW9uLG4gYXMgYmF0Y2gsZyBhcyBjb21wdXRlZCxUIGFzIGNyZWF0ZU1vZGVsLGogYXMgZWZmZWN0LHkgYXMgc2lnbmFsLG8gYXMgdW50cmFja2VkfTsvLyMgc291cmNlTWFwcGluZ1VSTD1zaWduYWxzLWNvcmUubW9kdWxlLmpzLm1hcFxuIiwiLy8gRE9NIHNlbGVjdG9ycyBlbnVtXG5leHBvcnQgZW51bSBEb21TZWxlY3RvciB7XG4gIEJPQVJEID0gJ2NnLWJvYXJkJyxcbiAgQk9BUkRfTk9fQ1VTVE9NID0gJ2NnLWJvYXJkOm5vdCgudXNlcnNjcmlwdC1jdXN0b20tYm9hcmQpJyxcbiAgQ09PUkRTID0gJ2Nvb3JkcycsXG4gIFBJRUNFID0gJ3BpZWNlJyxcbiAgQ09OVEFJTkVSID0gJ2NnLWNvbnRhaW5lcicsXG4gIEtFWUJPQVJEX01PVkUgPSAnLmtleWJvYXJkLW1vdmUnLFxuICBLRVlCT0FSRF9JTlBVVCA9ICcua2V5Ym9hcmQtbW92ZSBpbnB1dCcsXG59XG5cbi8vIENTUyBjbGFzc2VzIGVudW1cbmV4cG9ydCBlbnVtIENzc0NsYXNzIHtcbiAgQkxBQ0sgPSAnYmxhY2snLFxuICBVU0VSU0NSSVBUX0RJVklERVJTID0gJ3VzZXJzY3JpcHQtZGl2aWRlcnMnLFxuICBVU0VSU0NSSVBUX0RSQVdJTkdTID0gJ3VzZXJzY3JpcHQtZHJhd2luZ3MnLFxuICBVU0VSU0NSSVBUX0ZMQVNIID0gJ3VzZXJzY3JpcHQtZmxhc2gtb3ZlcmxheScsXG59XG5cbi8vIENTUyBkaXNwbGF5IHZhbHVlcyBlbnVtXG5leHBvcnQgZW51bSBDc3NEaXNwbGF5IHtcbiAgQkxPQ0sgPSAnYmxvY2snLFxuICBOT05FID0gJ25vbmUnLFxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZURpdigpOiBIVE1MRGl2RWxlbWVudCB7XG4gIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU3ZnRWxlbWVudCh0YWc6IHN0cmluZyk6IFNWR0VsZW1lbnQge1xuICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsIHRhZylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3I6IHN0cmluZyk6IEVsZW1lbnQgfCBudWxsIHtcbiAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBxdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yOiBzdHJpbmcpOiBOb2RlTGlzdE9mPEVsZW1lbnQ+IHtcbiAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBlbmRDaGlsZChwYXJlbnQ6IEVsZW1lbnQsIGNoaWxkOiBFbGVtZW50KTogdm9pZCB7XG4gIHBhcmVudC5hcHBlbmRDaGlsZChjaGlsZClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUVsZW1lbnQoZWxlbWVudDogRWxlbWVudCk6IHZvaWQge1xuICBlbGVtZW50LnJlbW92ZSgpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRCb3VuZGluZ0NsaWVudFJlY3QoZWxlbWVudDogRWxlbWVudCk6IERPTVJlY3Qge1xuICByZXR1cm4gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gd2FpdEZvckVsZW1lbnQoc2VsZWN0b3I6IHN0cmluZyk6IFByb21pc2U8RWxlbWVudD4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICBjb25zdCBlbGVtZW50ID0gcXVlcnlTZWxlY3RvcihzZWxlY3RvcilcbiAgICBpZiAoZWxlbWVudCkge1xuICAgICAgcmVzb2x2ZShlbGVtZW50KVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gcXVlcnlTZWxlY3RvcihzZWxlY3RvcilcbiAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgIG9ic2VydmVyLmRpc2Nvbm5lY3QoKVxuICAgICAgICByZXNvbHZlKGVsZW1lbnQpXG4gICAgICB9XG4gICAgfSlcblxuICAgIG9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuYm9keSwge1xuICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgc3VidHJlZTogdHJ1ZSxcbiAgICB9KVxuICB9KVxufVxuIiwiaW1wb3J0IHsgRG9tU2VsZWN0b3IgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvZG9tJ1xuaW1wb3J0IHsgcXVlcnlTZWxlY3RvciB9IGZyb20gJy4uLy4uL3BsYXRmb3JtL2RvbSdcblxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5Qmx1cihhbW91bnQ6IG51bWJlcik6IHZvaWQge1xuICBjb25zdCBjb250YWluZXIgPSBxdWVyeVNlbGVjdG9yKERvbVNlbGVjdG9yLkNPTlRBSU5FUikgYXMgSFRNTEVsZW1lbnQgfCBudWxsXG4gIGlmICghY29udGFpbmVyKSByZXR1cm5cblxuICBpZiAoYW1vdW50ID09PSAwKSB7XG4gICAgY29udGFpbmVyLnN0eWxlLmZpbHRlciA9ICcnXG4gIH0gZWxzZSB7XG4gICAgY29udGFpbmVyLnN0eWxlLmZpbHRlciA9IGBibHVyKCR7YW1vdW50fXB4KWBcbiAgfVxufVxuIiwiaW1wb3J0IHsgZWZmZWN0IH0gZnJvbSAnQHByZWFjdC9zaWduYWxzLWNvcmUnXG5pbXBvcnQgeyBhcHBseUJsdXIgfSBmcm9tICcuLi9oYW5kbGVycy9hcHBseUJsdXInXG5pbXBvcnQgdHlwZSB7IFNldHRpbmdzU3RvcmUgfSBmcm9tICcuLi9zZXR0aW5ncy9zZXR0aW5nc1N0b3JlJ1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBCbHVyRWZmZWN0KHNldHRpbmdzOiBTZXR0aW5nc1N0b3JlKTogKCkgPT4gdm9pZCB7XG4gIHJldHVybiBlZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IG9iZnVzY2F0aW9uc0VuYWJsZWQgPSBzZXR0aW5ncy5vYmZ1c2NhdGlvbnNFbmFibGVkLnZhbHVlXG4gICAgY29uc3QgYmx1ciA9IHNldHRpbmdzLmJsdXIudmFsdWVcblxuICAgIGlmIChvYmZ1c2NhdGlvbnNFbmFibGVkKSB7XG4gICAgICBhcHBseUJsdXIoYmx1cilcbiAgICB9IGVsc2Uge1xuICAgICAgYXBwbHlCbHVyKDApXG4gICAgfVxuICB9KVxufVxuIiwiaW1wb3J0IHsgQ3NzQ2xhc3MsIENzc0Rpc3BsYXksIERvbVNlbGVjdG9yIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL2RvbSdcbmltcG9ydCB7IGFwcGVuZENoaWxkLCBjcmVhdGVTdmdFbGVtZW50LCBxdWVyeVNlbGVjdG9yIH0gZnJvbSAnLi4vLi4vcGxhdGZvcm0vZG9tJ1xuXG5leHBvcnQgaW50ZXJmYWNlIERpdmlkZXJzU3RhdGUge1xuICBzdmc6IFNWR1NWR0VsZW1lbnRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZURpdmlkZXJzKCk6IERpdmlkZXJzU3RhdGUge1xuICBjb25zdCBib2FyZCA9IHF1ZXJ5U2VsZWN0b3IoRG9tU2VsZWN0b3IuQk9BUkQpXG4gIGlmICghYm9hcmQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0JvYXJkIG5vdCBmb3VuZCcpXG4gIH1cblxuICBjb25zdCByZWN0ID0gYm9hcmQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgY29uc3Qgc2l6ZSA9IHJlY3Qud2lkdGhcblxuICBjb25zdCBzdmcgPSBjcmVhdGVTdmdFbGVtZW50KCdzdmcnKSBhcyBTVkdTVkdFbGVtZW50XG4gIHN2Zy5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgQ3NzQ2xhc3MuVVNFUlNDUklQVF9ESVZJREVSUylcbiAgc3ZnLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCBzaXplLnRvU3RyaW5nKCkpXG4gIHN2Zy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIHNpemUudG9TdHJpbmcoKSlcbiAgc3ZnLnN0eWxlLmNzc1RleHQgPSBgXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMDtcbiAgICBsZWZ0OiAwO1xuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIGBcblxuICAvLyBWZXJ0aWNhbCBsaW5lXG4gIGNvbnN0IHZMaW5lID0gY3JlYXRlU3ZnRWxlbWVudCgnbGluZScpXG4gIHZMaW5lLnNldEF0dHJpYnV0ZSgneDEnLCAoc2l6ZSAvIDIpLnRvU3RyaW5nKCkpXG4gIHZMaW5lLnNldEF0dHJpYnV0ZSgneTEnLCAnMCcpXG4gIHZMaW5lLnNldEF0dHJpYnV0ZSgneDInLCAoc2l6ZSAvIDIpLnRvU3RyaW5nKCkpXG4gIHZMaW5lLnNldEF0dHJpYnV0ZSgneTInLCBzaXplLnRvU3RyaW5nKCkpXG4gIHZMaW5lLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJywgJ3JlZCcpXG4gIHZMaW5lLnNldEF0dHJpYnV0ZSgnc3Ryb2tlLXdpZHRoJywgJzInKVxuXG4gIC8vIEhvcml6b250YWwgbGluZVxuICBjb25zdCBoTGluZSA9IGNyZWF0ZVN2Z0VsZW1lbnQoJ2xpbmUnKVxuICBoTGluZS5zZXRBdHRyaWJ1dGUoJ3gxJywgJzAnKVxuICBoTGluZS5zZXRBdHRyaWJ1dGUoJ3kxJywgKHNpemUgLyAyKS50b1N0cmluZygpKVxuICBoTGluZS5zZXRBdHRyaWJ1dGUoJ3gyJywgc2l6ZS50b1N0cmluZygpKVxuICBoTGluZS5zZXRBdHRyaWJ1dGUoJ3kyJywgKHNpemUgLyAyKS50b1N0cmluZygpKVxuICBoTGluZS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsICdyZWQnKVxuICBoTGluZS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS13aWR0aCcsICcyJylcblxuICBhcHBlbmRDaGlsZChzdmcsIHZMaW5lKVxuICBhcHBlbmRDaGlsZChzdmcsIGhMaW5lKVxuXG4gIGFwcGVuZENoaWxkKGJvYXJkLCBzdmcpXG5cbiAgcmV0dXJuIHsgc3ZnIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNob3dEaXZpZGVycyhzdGF0ZTogRGl2aWRlcnNTdGF0ZSk6IHZvaWQge1xuICBzdGF0ZS5zdmcuc3R5bGUuZGlzcGxheSA9IENzc0Rpc3BsYXkuQkxPQ0tcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhpZGVEaXZpZGVycyhzdGF0ZTogRGl2aWRlcnNTdGF0ZSk6IHZvaWQge1xuICBzdGF0ZS5zdmcuc3R5bGUuZGlzcGxheSA9IENzc0Rpc3BsYXkuTk9ORVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVzdHJveURpdmlkZXJzKHN0YXRlOiBEaXZpZGVyc1N0YXRlKTogdm9pZCB7XG4gIHN0YXRlLnN2Zy5yZW1vdmUoKVxufVxuIiwiaW1wb3J0IHtcbiAgdHlwZSBEaXZpZGVyc1N0YXRlLFxuICBoaWRlRGl2aWRlcnMsXG4gIHNob3dEaXZpZGVycyxcbn0gZnJvbSAnLi4vLi4vcHJlc2VudGF0aW9uL25vbi1wcmVhY3QtY29tcG9uZW50cy9kaXZpZGVycydcbmltcG9ydCB0eXBlIHsgU2V0dGluZ3NTdG9yZSB9IGZyb20gJy4uL3NldHRpbmdzL3NldHRpbmdzU3RvcmUnXG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVEaXZpZGVycyhzdGF0ZTogRGl2aWRlcnNTdGF0ZSwgc2V0dGluZ3M6IFNldHRpbmdzU3RvcmUpOiB2b2lkIHtcbiAgaWYgKHNldHRpbmdzLmRpdmlkZXJzRW5hYmxlZC52YWx1ZSkge1xuICAgIHNob3dEaXZpZGVycyhzdGF0ZSlcbiAgfSBlbHNlIHtcbiAgICBoaWRlRGl2aWRlcnMoc3RhdGUpXG4gIH1cbn1cbiIsImltcG9ydCB7IGVmZmVjdCB9IGZyb20gJ0BwcmVhY3Qvc2lnbmFscy1jb3JlJ1xuaW1wb3J0IHR5cGUgeyBEaXZpZGVyc1N0YXRlIH0gZnJvbSAnLi4vLi4vcHJlc2VudGF0aW9uL25vbi1wcmVhY3QtY29tcG9uZW50cy9kaXZpZGVycydcbmltcG9ydCB7IHVwZGF0ZURpdmlkZXJzIH0gZnJvbSAnLi4vaGFuZGxlcnMvdXBkYXRlRGl2aWRlcnMnXG5pbXBvcnQgdHlwZSB7IFNldHRpbmdzU3RvcmUgfSBmcm9tICcuLi9zZXR0aW5ncy9zZXR0aW5nc1N0b3JlJ1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBEaXZpZGVyc0VmZmVjdChzdGF0ZTogRGl2aWRlcnNTdGF0ZSwgc2V0dGluZ3M6IFNldHRpbmdzU3RvcmUpOiAoKSA9PiB2b2lkIHtcbiAgcmV0dXJuIGVmZmVjdCgoKSA9PiB7XG4gICAgc2V0dGluZ3MuZGl2aWRlcnNFbmFibGVkLnZhbHVlXG4gICAgdXBkYXRlRGl2aWRlcnMoc3RhdGUsIHNldHRpbmdzKVxuICB9KVxufVxuIiwiaW1wb3J0IHsgQ3NzQ2xhc3MsIENzc0Rpc3BsYXksIERvbVNlbGVjdG9yIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL2RvbSdcbmltcG9ydCB7IGFwcGVuZENoaWxkLCBjcmVhdGVEaXYsIHF1ZXJ5U2VsZWN0b3IgfSBmcm9tICcuLi8uLi9wbGF0Zm9ybS9kb20nXG5cbmV4cG9ydCBpbnRlcmZhY2UgRmxhc2hPdmVybGF5U3RhdGUge1xuICBvdmVybGF5OiBIVE1MRWxlbWVudFxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRmxhc2hPdmVybGF5KCk6IEZsYXNoT3ZlcmxheVN0YXRlIHtcbiAgY29uc3Qgb3ZlcmxheSA9IGNyZWF0ZURpdigpXG4gIG92ZXJsYXkuY2xhc3NOYW1lID0gQ3NzQ2xhc3MuVVNFUlNDUklQVF9GTEFTSFxuICBvdmVybGF5LnN0eWxlLmNzc1RleHQgPSBgXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMDtcbiAgICBsZWZ0OiAwO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICBiYWNrZ3JvdW5kOiBibGFjaztcbiAgICB6LWluZGV4OiAxMDAwO1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIGBcblxuICBjb25zdCBjb250YWluZXIgPSBxdWVyeVNlbGVjdG9yKERvbVNlbGVjdG9yLkNPTlRBSU5FUilcbiAgaWYgKGNvbnRhaW5lcikge1xuICAgIGFwcGVuZENoaWxkKGNvbnRhaW5lciwgb3ZlcmxheSlcbiAgfVxuXG4gIHJldHVybiB7IG92ZXJsYXkgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvd0ZsYXNoKHN0YXRlOiBGbGFzaE92ZXJsYXlTdGF0ZSk6IHZvaWQge1xuICBzdGF0ZS5vdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBDc3NEaXNwbGF5LkJMT0NLXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoaWRlRmxhc2goc3RhdGU6IEZsYXNoT3ZlcmxheVN0YXRlKTogdm9pZCB7XG4gIHN0YXRlLm92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IENzc0Rpc3BsYXkuTk9ORVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVzdHJveUZsYXNoT3ZlcmxheShzdGF0ZTogRmxhc2hPdmVybGF5U3RhdGUpOiB2b2lkIHtcbiAgc3RhdGUub3ZlcmxheS5yZW1vdmUoKVxufVxuIiwiaW1wb3J0IHtcbiAgdHlwZSBGbGFzaE92ZXJsYXlTdGF0ZSxcbiAgaGlkZUZsYXNoLFxuICBzaG93Rmxhc2gsXG59IGZyb20gJy4uLy4uL3ByZXNlbnRhdGlvbi9ub24tcHJlYWN0LWNvbXBvbmVudHMvZmxhc2gnXG5pbXBvcnQgdHlwZSB7IFNldHRpbmdzU3RvcmUgfSBmcm9tICcuLi9zZXR0aW5ncy9zZXR0aW5nc1N0b3JlJ1xuXG5leHBvcnQgaW50ZXJmYWNlIEZsYXNoTG9vcFN0YXRlIHtcbiAgaW50ZXJ2YWxJZDogUmV0dXJuVHlwZTx0eXBlb2Ygc2V0SW50ZXJ2YWw+IHwgbnVsbFxuICB0aW1lb3V0SWQ6IFJldHVyblR5cGU8dHlwZW9mIHNldFRpbWVvdXQ+IHwgbnVsbFxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRmxhc2hMb29wU3RhdGUoKTogRmxhc2hMb29wU3RhdGUge1xuICByZXR1cm4geyBpbnRlcnZhbElkOiBudWxsLCB0aW1lb3V0SWQ6IG51bGwgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdHJpZ2dlckZsYXNoKFxuICBvdmVybGF5U3RhdGU6IEZsYXNoT3ZlcmxheVN0YXRlLFxuICBsb29wU3RhdGU6IEZsYXNoTG9vcFN0YXRlLFxuICBzZXR0aW5nczogU2V0dGluZ3NTdG9yZVxuKTogdm9pZCB7XG4gIGhpZGVGbGFzaChvdmVybGF5U3RhdGUpXG5cbiAgaWYgKGxvb3BTdGF0ZS50aW1lb3V0SWQgIT09IG51bGwpIHtcbiAgICBjbGVhclRpbWVvdXQobG9vcFN0YXRlLnRpbWVvdXRJZClcbiAgfVxuXG4gIGNvbnN0IGR1cmF0aW9uTXMgPSBzZXR0aW5ncy5mbGFzaER1cmF0aW9uLnZhbHVlXG5cbiAgbG9vcFN0YXRlLnRpbWVvdXRJZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIHNob3dGbGFzaChvdmVybGF5U3RhdGUpXG4gICAgbG9vcFN0YXRlLnRpbWVvdXRJZCA9IG51bGxcbiAgfSwgZHVyYXRpb25Ncylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0Rmxhc2hMb29wKFxuICBvdmVybGF5U3RhdGU6IEZsYXNoT3ZlcmxheVN0YXRlLFxuICBsb29wU3RhdGU6IEZsYXNoTG9vcFN0YXRlLFxuICBzZXR0aW5nczogU2V0dGluZ3NTdG9yZVxuKTogdm9pZCB7XG4gIHN0b3BGbGFzaExvb3AobG9vcFN0YXRlKVxuXG4gIHNob3dGbGFzaChvdmVybGF5U3RhdGUpXG5cbiAgdHJpZ2dlckZsYXNoKG92ZXJsYXlTdGF0ZSwgbG9vcFN0YXRlLCBzZXR0aW5ncylcblxuICBjb25zdCBpbnRlcnZhbE1zID0gc2V0dGluZ3MuZmxhc2hJbnRlcnZhbC52YWx1ZSAqIDEwMDBcbiAgbG9vcFN0YXRlLmludGVydmFsSWQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgdHJpZ2dlckZsYXNoKG92ZXJsYXlTdGF0ZSwgbG9vcFN0YXRlLCBzZXR0aW5ncylcbiAgfSwgaW50ZXJ2YWxNcylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0b3BGbGFzaExvb3AobG9vcFN0YXRlOiBGbGFzaExvb3BTdGF0ZSk6IHZvaWQge1xuICBpZiAobG9vcFN0YXRlLmludGVydmFsSWQgIT09IG51bGwpIHtcbiAgICBjbGVhckludGVydmFsKGxvb3BTdGF0ZS5pbnRlcnZhbElkKVxuICAgIGxvb3BTdGF0ZS5pbnRlcnZhbElkID0gbnVsbFxuICB9XG4gIGlmIChsb29wU3RhdGUudGltZW91dElkICE9PSBudWxsKSB7XG4gICAgY2xlYXJUaW1lb3V0KGxvb3BTdGF0ZS50aW1lb3V0SWQpXG4gICAgbG9vcFN0YXRlLnRpbWVvdXRJZCA9IG51bGxcbiAgfVxufVxuIiwiaW1wb3J0IHsgZWZmZWN0IH0gZnJvbSAnQHByZWFjdC9zaWduYWxzLWNvcmUnXG5pbXBvcnQgdHlwZSB7IFNpZ25hbCB9IGZyb20gJ0BwcmVhY3Qvc2lnbmFscy1jb3JlJ1xuaW1wb3J0IHR5cGUgeyBGbGFzaE92ZXJsYXlTdGF0ZSB9IGZyb20gJy4uLy4uL3ByZXNlbnRhdGlvbi9ub24tcHJlYWN0LWNvbXBvbmVudHMvZmxhc2gnXG5pbXBvcnQgeyBoaWRlRmxhc2ggfSBmcm9tICcuLi8uLi9wcmVzZW50YXRpb24vbm9uLXByZWFjdC1jb21wb25lbnRzL2ZsYXNoJ1xuaW1wb3J0IHtcbiAgdHlwZSBGbGFzaExvb3BTdGF0ZSxcbiAgc3RhcnRGbGFzaExvb3AsXG4gIHN0b3BGbGFzaExvb3AsXG4gIHRyaWdnZXJGbGFzaCxcbn0gZnJvbSAnLi4vaGFuZGxlcnMvaGFuZGxlRmxhc2gnXG5pbXBvcnQgdHlwZSB7IFNldHRpbmdzU3RvcmUgfSBmcm9tICcuLi9zZXR0aW5ncy9zZXR0aW5nc1N0b3JlJ1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBGbGFzaEVmZmVjdChcbiAgb3ZlcmxheVN0YXRlOiBGbGFzaE92ZXJsYXlTdGF0ZSxcbiAgbG9vcFN0YXRlOiBGbGFzaExvb3BTdGF0ZSxcbiAgc2V0dGluZ3M6IFNldHRpbmdzU3RvcmUsXG4gIGJvYXJkQ2hhbmdlZDogU2lnbmFsPG51bWJlcj5cbik6ICgpID0+IHZvaWQge1xuICBjb25zdCBjbGVhbnVwTW9kZUVmZmVjdCA9IGVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgZW5hYmxlZCA9IHNldHRpbmdzLmZsYXNoTW9kZUVuYWJsZWQudmFsdWVcbiAgICBzZXR0aW5ncy5mbGFzaEludGVydmFsLnZhbHVlXG4gICAgc2V0dGluZ3MuZmxhc2hEdXJhdGlvbi52YWx1ZVxuXG4gICAgaWYgKGVuYWJsZWQpIHtcbiAgICAgIHN0YXJ0Rmxhc2hMb29wKG92ZXJsYXlTdGF0ZSwgbG9vcFN0YXRlLCBzZXR0aW5ncylcbiAgICB9IGVsc2Uge1xuICAgICAgc3RvcEZsYXNoTG9vcChsb29wU3RhdGUpXG4gICAgICBoaWRlRmxhc2gob3ZlcmxheVN0YXRlKVxuICAgIH1cbiAgfSlcblxuICBjb25zdCBjbGVhbnVwQm9hcmRFZmZlY3QgPSBlZmZlY3QoKCkgPT4ge1xuICAgIGJvYXJkQ2hhbmdlZC52YWx1ZVxuICAgIGlmIChzZXR0aW5ncy5mbGFzaE1vZGVFbmFibGVkLnZhbHVlICYmIGxvb3BTdGF0ZS5pbnRlcnZhbElkICE9PSBudWxsKSB7XG4gICAgICB0cmlnZ2VyRmxhc2gob3ZlcmxheVN0YXRlLCBsb29wU3RhdGUsIHNldHRpbmdzKVxuICAgIH1cbiAgfSlcblxuICByZXR1cm4gKCkgPT4ge1xuICAgIGNsZWFudXBNb2RlRWZmZWN0KClcbiAgICBjbGVhbnVwQm9hcmRFZmZlY3QoKVxuICAgIHN0b3BGbGFzaExvb3AobG9vcFN0YXRlKVxuICB9XG59XG4iLCJleHBvcnQgZW51bSBLZXlib2FyZENvbW1hbmQge1xuICBQV0sgPSAncHdrJyxcbiAgUFdRID0gJ3B3cScsXG4gIFBCSyA9ICdwYmsnLFxuICBQQlEgPSAncGJxJyxcbiAgUEEgPSAncGEnLFxuICBQV1cgPSAncHd3JyxcbiAgUEJCID0gJ3BiYicsXG4gIFBTUyA9ICdwc3MnLFxufVxuXG5leHBvcnQgZW51bSBTcGVlY2hDb21tYW5kIHtcbiAgQUxMID0gJ2FsbCcsXG4gIFdISVRFID0gJ3doaXRlJyxcbiAgQkxBQ0sgPSAnYmxhY2snLFxuICBTVE9QID0gJ3N0b3AnLFxuICBXSyA9ICd3aycsXG4gIFdRID0gJ3dxJyxcbiAgQksgPSAnYmsnLFxuICBCUSA9ICdicScsXG59XG5cbi8vIEtleWJvYXJkIHRvIHNwZWVjaCBjb21tYW5kIG1hcHBpbmdcbmV4cG9ydCBjb25zdCBLRVlCT0FSRF9DT01NQU5EX01BUCA9IG5ldyBNYXAoW1xuICBbS2V5Ym9hcmRDb21tYW5kLlBXSywgU3BlZWNoQ29tbWFuZC5XS10sXG4gIFtLZXlib2FyZENvbW1hbmQuUFdRLCBTcGVlY2hDb21tYW5kLldRXSxcbiAgW0tleWJvYXJkQ29tbWFuZC5QQkssIFNwZWVjaENvbW1hbmQuQktdLFxuICBbS2V5Ym9hcmRDb21tYW5kLlBCUSwgU3BlZWNoQ29tbWFuZC5CUV0sXG4gIFtLZXlib2FyZENvbW1hbmQuUEEsIFNwZWVjaENvbW1hbmQuQUxMXSxcbiAgW0tleWJvYXJkQ29tbWFuZC5QV1csIFNwZWVjaENvbW1hbmQuV0hJVEVdLFxuICBbS2V5Ym9hcmRDb21tYW5kLlBCQiwgU3BlZWNoQ29tbWFuZC5CTEFDS10sXG4gIFtLZXlib2FyZENvbW1hbmQuUFNTLCBTcGVlY2hDb21tYW5kLlNUT1BdLFxuXSBhcyBjb25zdClcbiIsImV4cG9ydCBlbnVtIEFubm90YXRpb25UeXBlIHtcbiAgQ0lSQ0xFID0gJ2NpcmNsZScsXG4gIEFSUk9XID0gJ2Fycm93Jyxcbn1cbiIsImltcG9ydCB7IEFubm90YXRpb25UeXBlIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL2Fubm90YXRpb25zJ1xuXG5leHBvcnQgdHlwZSBEcmF3QW5ub3RhdGlvbiA9XG4gIHwgeyB0eXBlOiBBbm5vdGF0aW9uVHlwZS5DSVJDTEU7IHNxdWFyZTogc3RyaW5nIH1cbiAgfCB7IHR5cGU6IEFubm90YXRpb25UeXBlLkFSUk9XOyBmcm9tOiBzdHJpbmc7IHRvOiBzdHJpbmcgfVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VEcmF3Q29tbWFuZChjb21tYW5kOiBzdHJpbmcpOiBEcmF3QW5ub3RhdGlvbltdIHtcbiAgaWYgKCFjb21tYW5kLnN0YXJ0c1dpdGgoJy0nKSkgcmV0dXJuIFtdXG5cbiAgY29uc3QgY29udGVudCA9IGNvbW1hbmQuc2xpY2UoMSlcbiAgaWYgKCFjb250ZW50KSByZXR1cm4gW11cblxuICBjb25zdCBwYXJ0cyA9IGNvbnRlbnQuc3BsaXQoJywnKVxuICBjb25zdCBhbm5vdGF0aW9uczogRHJhd0Fubm90YXRpb25bXSA9IFtdXG5cbiAgZm9yIChjb25zdCBwYXJ0IG9mIHBhcnRzKSB7XG4gICAgaWYgKHBhcnQubGVuZ3RoID09PSAyKSB7XG4gICAgICAvLyBTaW5nbGUgc3F1YXJlOiBjaXJjbGVcbiAgICAgIGFubm90YXRpb25zLnB1c2goeyB0eXBlOiBBbm5vdGF0aW9uVHlwZS5DSVJDTEUsIHNxdWFyZTogcGFydCB9KVxuICAgIH0gZWxzZSBpZiAocGFydC5sZW5ndGggPT09IDQpIHtcbiAgICAgIC8vIFR3byBzcXVhcmVzOiBhcnJvd1xuICAgICAgY29uc3QgZnJvbSA9IHBhcnQuc2xpY2UoMCwgMilcbiAgICAgIGNvbnN0IHRvID0gcGFydC5zbGljZSgyLCA0KVxuICAgICAgYW5ub3RhdGlvbnMucHVzaCh7IHR5cGU6IEFubm90YXRpb25UeXBlLkFSUk9XLCBmcm9tLCB0byB9KVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBhbm5vdGF0aW9uc1xufVxuIiwiaW1wb3J0IHsgQW5ub3RhdGlvblR5cGUgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvYW5ub3RhdGlvbnMnXG5pbXBvcnQgeyBDc3NDbGFzcywgRG9tU2VsZWN0b3IgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvZG9tJ1xuaW1wb3J0IHR5cGUgeyBEcmF3QW5ub3RhdGlvbiB9IGZyb20gJy4uLy4uL2RvbWFpbi9jb21tYW5kcy9jb21tYW5kUGFyc2VyJ1xuaW1wb3J0IHsgYXBwZW5kQ2hpbGQsIGNyZWF0ZVN2Z0VsZW1lbnQsIHF1ZXJ5U2VsZWN0b3IsIHJlbW92ZUVsZW1lbnQgfSBmcm9tICcuLi8uLi9wbGF0Zm9ybS9kb20nXG5cbmV4cG9ydCBpbnRlcmZhY2UgQW5ub3RhdGlvbnNTdGF0ZSB7XG4gIHN2ZzogU1ZHU1ZHRWxlbWVudFxufVxuXG5jb25zdCBBTk5PVEFUSU9OX0NPTE9SID0gJ3JlZCdcbmNvbnN0IENJUkNMRV9SQURJVVMgPSAyMFxuY29uc3QgQVJST1dfV0lEVEggPSAzXG5cbmZ1bmN0aW9uIHNxdWFyZVRvUGl4ZWxQb3NpdGlvbihzcXVhcmU6IHN0cmluZywgYm9hcmRTaXplOiBudW1iZXIpOiB7IHg6IG51bWJlcjsgeTogbnVtYmVyIH0ge1xuICBjb25zdCBmaWxlID0gc3F1YXJlLmNoYXJDb2RlQXQoMCkgLSAnYScuY2hhckNvZGVBdCgwKSAvLyAwLTdcbiAgY29uc3QgcmFuayA9IE51bWJlci5wYXJzZUludChzcXVhcmVbMV0pIC0gMSAvLyAwLTdcblxuICBjb25zdCBzcXVhcmVTaXplID0gYm9hcmRTaXplIC8gOFxuICBjb25zdCB4ID0gZmlsZSAqIHNxdWFyZVNpemUgKyBzcXVhcmVTaXplIC8gMlxuICBjb25zdCB5ID0gKDcgLSByYW5rKSAqIHNxdWFyZVNpemUgKyBzcXVhcmVTaXplIC8gMlxuXG4gIHJldHVybiB7IHgsIHkgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVDaXJjbGUoc3F1YXJlOiBzdHJpbmcsIGJvYXJkU2l6ZTogbnVtYmVyKTogU1ZHQ2lyY2xlRWxlbWVudCB7XG4gIGNvbnN0IHBvcyA9IHNxdWFyZVRvUGl4ZWxQb3NpdGlvbihzcXVhcmUsIGJvYXJkU2l6ZSlcblxuICBjb25zdCBjaXJjbGUgPSBjcmVhdGVTdmdFbGVtZW50KCdjaXJjbGUnKSBhcyBTVkdDaXJjbGVFbGVtZW50XG4gIGNpcmNsZS5zZXRBdHRyaWJ1dGUoJ2N4JywgcG9zLngudG9TdHJpbmcoKSlcbiAgY2lyY2xlLnNldEF0dHJpYnV0ZSgnY3knLCBwb3MueS50b1N0cmluZygpKVxuICBjaXJjbGUuc2V0QXR0cmlidXRlKCdyJywgQ0lSQ0xFX1JBRElVUy50b1N0cmluZygpKVxuICBjaXJjbGUuc2V0QXR0cmlidXRlKCdmaWxsJywgJ25vbmUnKVxuICBjaXJjbGUuc2V0QXR0cmlidXRlKCdzdHJva2UnLCBBTk5PVEFUSU9OX0NPTE9SKVxuICBjaXJjbGUuc2V0QXR0cmlidXRlKCdzdHJva2Utd2lkdGgnLCAnMycpXG5cbiAgcmV0dXJuIGNpcmNsZVxufVxuXG5mdW5jdGlvbiBjcmVhdGVBcnJvdyhmcm9tOiBzdHJpbmcsIHRvOiBzdHJpbmcsIGJvYXJkU2l6ZTogbnVtYmVyKTogU1ZHR0VsZW1lbnQge1xuICBjb25zdCBmcm9tUG9zID0gc3F1YXJlVG9QaXhlbFBvc2l0aW9uKGZyb20sIGJvYXJkU2l6ZSlcbiAgY29uc3QgdG9Qb3MgPSBzcXVhcmVUb1BpeGVsUG9zaXRpb24odG8sIGJvYXJkU2l6ZSlcblxuICBjb25zdCBncm91cCA9IGNyZWF0ZVN2Z0VsZW1lbnQoJ2cnKSBhcyBTVkdHRWxlbWVudFxuXG4gIC8vIEFycm93IGxpbmVcbiAgY29uc3QgbGluZSA9IGNyZWF0ZVN2Z0VsZW1lbnQoJ2xpbmUnKVxuICBsaW5lLnNldEF0dHJpYnV0ZSgneDEnLCBmcm9tUG9zLngudG9TdHJpbmcoKSlcbiAgbGluZS5zZXRBdHRyaWJ1dGUoJ3kxJywgZnJvbVBvcy55LnRvU3RyaW5nKCkpXG4gIGxpbmUuc2V0QXR0cmlidXRlKCd4MicsIHRvUG9zLngudG9TdHJpbmcoKSlcbiAgbGluZS5zZXRBdHRyaWJ1dGUoJ3kyJywgdG9Qb3MueS50b1N0cmluZygpKVxuICBsaW5lLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJywgQU5OT1RBVElPTl9DT0xPUilcbiAgbGluZS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS13aWR0aCcsIEFSUk9XX1dJRFRILnRvU3RyaW5nKCkpXG4gIGxpbmUuc2V0QXR0cmlidXRlKCdtYXJrZXItZW5kJywgJ3VybCgjYXJyb3doZWFkKScpXG5cbiAgYXBwZW5kQ2hpbGQoZ3JvdXAsIGxpbmUpXG5cbiAgcmV0dXJuIGdyb3VwXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUFycm93aGVhZE1hcmtlcigpOiBTVkdEZWZzRWxlbWVudCB7XG4gIGNvbnN0IGRlZnMgPSBjcmVhdGVTdmdFbGVtZW50KCdkZWZzJykgYXMgU1ZHRGVmc0VsZW1lbnRcbiAgY29uc3QgbWFya2VyID0gY3JlYXRlU3ZnRWxlbWVudCgnbWFya2VyJykgYXMgU1ZHTWFya2VyRWxlbWVudFxuICBtYXJrZXIuc2V0QXR0cmlidXRlKCdpZCcsICdhcnJvd2hlYWQnKVxuICBtYXJrZXIuc2V0QXR0cmlidXRlKCdtYXJrZXJXaWR0aCcsICcxMCcpXG4gIG1hcmtlci5zZXRBdHRyaWJ1dGUoJ21hcmtlckhlaWdodCcsICcxMCcpXG4gIG1hcmtlci5zZXRBdHRyaWJ1dGUoJ3JlZlgnLCAnOScpXG4gIG1hcmtlci5zZXRBdHRyaWJ1dGUoJ3JlZlknLCAnMycpXG4gIG1hcmtlci5zZXRBdHRyaWJ1dGUoJ29yaWVudCcsICdhdXRvJylcblxuICBjb25zdCBwb2x5Z29uID0gY3JlYXRlU3ZnRWxlbWVudCgncG9seWdvbicpXG4gIHBvbHlnb24uc2V0QXR0cmlidXRlKCdwb2ludHMnLCAnMCAwLCAxMCAzLCAwIDYnKVxuICBwb2x5Z29uLnNldEF0dHJpYnV0ZSgnZmlsbCcsIEFOTk9UQVRJT05fQ09MT1IpXG5cbiAgYXBwZW5kQ2hpbGQobWFya2VyLCBwb2x5Z29uKVxuICBhcHBlbmRDaGlsZChkZWZzLCBtYXJrZXIpXG5cbiAgcmV0dXJuIGRlZnNcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUFubm90YXRpb25zKCk6IEFubm90YXRpb25zU3RhdGUge1xuICBjb25zdCBjb250YWluZXIgPSBxdWVyeVNlbGVjdG9yKERvbVNlbGVjdG9yLkNPTlRBSU5FUilcbiAgaWYgKCFjb250YWluZXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvbnRhaW5lciBub3QgZm91bmQnKVxuICB9XG5cbiAgY29uc3QgYm9hcmQgPSBxdWVyeVNlbGVjdG9yKERvbVNlbGVjdG9yLkJPQVJEKVxuICBpZiAoIWJvYXJkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdCb2FyZCBub3QgZm91bmQnKVxuICB9XG5cbiAgY29uc3QgcmVjdCA9IGJvYXJkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gIGNvbnN0IHNpemUgPSByZWN0LndpZHRoXG5cbiAgY29uc3Qgc3ZnID0gY3JlYXRlU3ZnRWxlbWVudCgnc3ZnJykgYXMgU1ZHU1ZHRWxlbWVudFxuICBzdmcuc2V0QXR0cmlidXRlKCdjbGFzcycsIENzc0NsYXNzLlVTRVJTQ1JJUFRfRFJBV0lOR1MpXG4gIHN2Zy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgc2l6ZS50b1N0cmluZygpKVxuICBzdmcuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBzaXplLnRvU3RyaW5nKCkpXG4gIHN2Zy5zdHlsZS5jc3NUZXh0ID0gYFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDA7XG4gICAgbGVmdDogMDtcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICB6LWluZGV4OiAyMDA7XG4gIGBcblxuICAvLyBBZGQgYXJyb3doZWFkIG1hcmtlciBkZWZpbml0aW9uXG4gIGNvbnN0IGRlZnMgPSBjcmVhdGVBcnJvd2hlYWRNYXJrZXIoKVxuICBhcHBlbmRDaGlsZChzdmcsIGRlZnMpXG5cbiAgYXBwZW5kQ2hpbGQoY29udGFpbmVyLCBzdmcpXG5cbiAgcmV0dXJuIHsgc3ZnIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRyYXdBbm5vdGF0aW9ucyhzdGF0ZTogQW5ub3RhdGlvbnNTdGF0ZSwgYW5ub3RhdGlvbnM6IERyYXdBbm5vdGF0aW9uW10pOiB2b2lkIHtcbiAgLy8gQ2xlYXIgZXhpc3RpbmcgYW5ub3RhdGlvbnMgKGV4Y2VwdCBkZWZzKVxuICBjb25zdCBjaGlsZHJlbiA9IEFycmF5LmZyb20oc3RhdGUuc3ZnLmNoaWxkcmVuKVxuICBmb3IgKGNvbnN0IGNoaWxkIG9mIGNoaWxkcmVuKSB7XG4gICAgaWYgKGNoaWxkLnRhZ05hbWUgIT09ICdkZWZzJykge1xuICAgICAgcmVtb3ZlRWxlbWVudChjaGlsZCBhcyBTVkdFbGVtZW50KVxuICAgIH1cbiAgfVxuXG4gIGlmIChhbm5vdGF0aW9ucy5sZW5ndGggPT09IDApIHJldHVyblxuXG4gIGNvbnN0IGJvYXJkID0gcXVlcnlTZWxlY3RvcihEb21TZWxlY3Rvci5CT0FSRClcbiAgaWYgKCFib2FyZCkgcmV0dXJuXG5cbiAgY29uc3QgcmVjdCA9IGJvYXJkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gIGNvbnN0IGJvYXJkU2l6ZSA9IHJlY3Qud2lkdGhcblxuICAvLyBEcmF3IGVhY2ggYW5ub3RhdGlvblxuICBmb3IgKGNvbnN0IGFubm90YXRpb24gb2YgYW5ub3RhdGlvbnMpIHtcbiAgICBpZiAoYW5ub3RhdGlvbi50eXBlID09PSBBbm5vdGF0aW9uVHlwZS5DSVJDTEUpIHtcbiAgICAgIGNvbnN0IGNpcmNsZSA9IGNyZWF0ZUNpcmNsZShhbm5vdGF0aW9uLnNxdWFyZSwgYm9hcmRTaXplKVxuICAgICAgYXBwZW5kQ2hpbGQoc3RhdGUuc3ZnLCBjaXJjbGUpXG4gICAgfSBlbHNlIGlmIChhbm5vdGF0aW9uLnR5cGUgPT09IEFubm90YXRpb25UeXBlLkFSUk9XKSB7XG4gICAgICBjb25zdCBhcnJvdyA9IGNyZWF0ZUFycm93KGFubm90YXRpb24uZnJvbSwgYW5ub3RhdGlvbi50bywgYm9hcmRTaXplKVxuICAgICAgYXBwZW5kQ2hpbGQoc3RhdGUuc3ZnLCBhcnJvdylcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyQW5ub3RhdGlvbnMoc3RhdGU6IEFubm90YXRpb25zU3RhdGUpOiB2b2lkIHtcbiAgZHJhd0Fubm90YXRpb25zKHN0YXRlLCBbXSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlc3Ryb3lBbm5vdGF0aW9ucyhzdGF0ZTogQW5ub3RhdGlvbnNTdGF0ZSk6IHZvaWQge1xuICByZW1vdmVFbGVtZW50KHN0YXRlLnN2Zylcbn1cbiIsImltcG9ydCB7IHBhcnNlRHJhd0NvbW1hbmQgfSBmcm9tICcuLi8uLi9kb21haW4vY29tbWFuZHMvY29tbWFuZFBhcnNlcidcbmltcG9ydCB0eXBlIHsgQW5ub3RhdGlvbnNTdGF0ZSB9IGZyb20gJy4uLy4uL3ByZXNlbnRhdGlvbi9ub24tcHJlYWN0LWNvbXBvbmVudHMvYW5ub3RhdGlvbnMnXG5pbXBvcnQgeyBkcmF3QW5ub3RhdGlvbnMgfSBmcm9tICcuLi8uLi9wcmVzZW50YXRpb24vbm9uLXByZWFjdC1jb21wb25lbnRzL2Fubm90YXRpb25zJ1xuXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlRHJhd0NvbW1hbmQoY29tbWFuZDogc3RyaW5nLCBzdGF0ZTogQW5ub3RhdGlvbnNTdGF0ZSk6IHZvaWQge1xuICBjb25zdCBhbm5vdGF0aW9ucyA9IHBhcnNlRHJhd0NvbW1hbmQoY29tbWFuZClcbiAgZHJhd0Fubm90YXRpb25zKHN0YXRlLCBhbm5vdGF0aW9ucylcbn1cbiIsImV4cG9ydCBlbnVtIFBsYXllckNvbG9yIHtcbiAgV0hJVEUgPSAnd2hpdGUnLFxuICBCTEFDSyA9ICdibGFjaycsXG59XG5cbmV4cG9ydCBlbnVtIFBpZWNlVHlwZSB7XG4gIFBBV04gPSAncGF3bicsXG4gIEtOSUdIVCA9ICdrbmlnaHQnLFxuICBCSVNIT1AgPSAnYmlzaG9wJyxcbiAgUk9PSyA9ICdyb29rJyxcbiAgUVVFRU4gPSAncXVlZW4nLFxuICBLSU5HID0gJ2tpbmcnLFxufVxuXG5leHBvcnQgZW51bSBRdWFkcmFudCB7XG4gIFdISVRFX0tJTkcgPSAnd2snLFxuICBXSElURV9RVUVFTiA9ICd3cScsXG4gIEJMQUNLX0tJTkcgPSAnYmsnLFxuICBCTEFDS19RVUVFTiA9ICdicScsXG59XG5cbi8vIEhlbHBlciBhcnJheXMgZm9yIGl0ZXJhdGlvblxuZXhwb3J0IGNvbnN0IFBMQVlFUl9DT0xPUl9WQUxVRVMgPSBPYmplY3QudmFsdWVzKFBsYXllckNvbG9yKVxuZXhwb3J0IGNvbnN0IFBJRUNFX1RZUEVfVkFMVUVTID0gT2JqZWN0LnZhbHVlcyhQaWVjZVR5cGUpXG5leHBvcnQgY29uc3QgUVVBRFJBTlRfVkFMVUVTID0gT2JqZWN0LnZhbHVlcyhRdWFkcmFudClcbiIsImltcG9ydCB7IHR5cGUgUGllY2VUeXBlLCBQbGF5ZXJDb2xvciwgUXVhZHJhbnQgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvY2hlc3MnXG5cbmV4cG9ydCBpbnRlcmZhY2UgUGllY2VQb3NpdGlvbiB7XG4gIHNxdWFyZTogc3RyaW5nXG4gIGNvbG9yOiBQbGF5ZXJDb2xvclxuICB0eXBlOiBQaWVjZVR5cGVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbHRlclF1YWRyYW50KHBpZWNlczogUGllY2VQb3NpdGlvbltdLCBxdWFkcmFudDogUXVhZHJhbnQpOiBQaWVjZVBvc2l0aW9uW10ge1xuICByZXR1cm4gcGllY2VzLmZpbHRlcigocGllY2UpID0+IHtcbiAgICAvLyBWYWxpZGF0ZSBzcXVhcmUgZm9ybWF0XG4gICAgaWYgKCFwaWVjZS5zcXVhcmUgfHwgcGllY2Uuc3F1YXJlLmxlbmd0aCA8IDIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBzcXVhcmUgZm9ybWF0OiAke3BpZWNlLnNxdWFyZX1gKVxuICAgIH1cblxuICAgIGNvbnN0IGZpbGUgPSBwaWVjZS5zcXVhcmVbMF1cbiAgICBjb25zdCByYW5rID0gTnVtYmVyLnBhcnNlSW50KHBpZWNlLnNxdWFyZVsxXSwgMTApXG5cbiAgICAvLyBWYWxpZGF0ZSBmaWxlIGFuZCByYW5rXG4gICAgaWYgKGZpbGUgPCAnYScgfHwgZmlsZSA+ICdoJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGZpbGU6ICR7ZmlsZX1gKVxuICAgIH1cbiAgICBpZiAoTnVtYmVyLmlzTmFOKHJhbmspIHx8IHJhbmsgPCAxIHx8IHJhbmsgPiA4KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgcmFuazogJHtyYW5rfWApXG4gICAgfVxuXG4gICAgLy8gRGV0ZXJtaW5lIGZpbGUgcmFuZ2UgKGtpbmctc2lkZTogZS1oLCBxdWVlbi1zaWRlOiBhLWQpXG4gICAgY29uc3QgaXNLaW5nU2lkZSA9IGZpbGUgPj0gJ2UnXG5cbiAgICAvLyBEZXRlcm1pbmUgcmFuayByYW5nZSAod2hpdGU6IDEtNCwgYmxhY2s6IDUtOClcbiAgICBjb25zdCBpc1doaXRlUmFua3MgPSByYW5rID49IDEgJiYgcmFuayA8PSA0XG5cbiAgICAvLyBNYXRjaCBxdWFkcmFudFxuICAgIGlmIChxdWFkcmFudCA9PT0gUXVhZHJhbnQuV0hJVEVfS0lORykgcmV0dXJuIGlzS2luZ1NpZGUgJiYgaXNXaGl0ZVJhbmtzXG4gICAgaWYgKHF1YWRyYW50ID09PSBRdWFkcmFudC5XSElURV9RVUVFTikgcmV0dXJuICFpc0tpbmdTaWRlICYmIGlzV2hpdGVSYW5rc1xuICAgIGlmIChxdWFkcmFudCA9PT0gUXVhZHJhbnQuQkxBQ0tfS0lORykgcmV0dXJuIGlzS2luZ1NpZGUgJiYgIWlzV2hpdGVSYW5rc1xuICAgIGlmIChxdWFkcmFudCA9PT0gUXVhZHJhbnQuQkxBQ0tfUVVFRU4pIHJldHVybiAhaXNLaW5nU2lkZSAmJiAhaXNXaGl0ZVJhbmtzXG5cbiAgICByZXR1cm4gZmFsc2VcbiAgfSlcbn1cblxuZXhwb3J0IGludGVyZmFjZSBHcm91cGVkUGllY2VzIHtcbiAgY29sb3I6IFBsYXllckNvbG9yXG4gIHR5cGU6IHN0cmluZ1xuICBzcXVhcmVzOiBzdHJpbmdbXVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ3JvdXBCeUNvbG9yQW5kVHlwZShwaWVjZXM6IFBpZWNlUG9zaXRpb25bXSk6IEdyb3VwZWRQaWVjZXNbXSB7XG4gIGNvbnN0IGdyb3VwcyA9IG5ldyBNYXA8c3RyaW5nLCBHcm91cGVkUGllY2VzPigpXG5cbiAgZm9yIChjb25zdCBwaWVjZSBvZiBwaWVjZXMpIHtcbiAgICAvLyBWYWxpZGF0ZSByZXF1aXJlZCBwcm9wZXJ0aWVzXG4gICAgaWYgKCFwaWVjZS5zcXVhcmUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUGllY2UgbWlzc2luZyBzcXVhcmUgcHJvcGVydHknKVxuICAgIH1cbiAgICBpZiAoIXBpZWNlLmNvbG9yKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BpZWNlIG1pc3NpbmcgY29sb3IgcHJvcGVydHknKVxuICAgIH1cbiAgICBpZiAoIXBpZWNlLnR5cGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUGllY2UgbWlzc2luZyB0eXBlIHByb3BlcnR5JylcbiAgICB9XG5cbiAgICBjb25zdCBrZXkgPSBgJHtwaWVjZS5jb2xvcn0tJHtwaWVjZS50eXBlfWBcblxuICAgIGlmICghZ3JvdXBzLmhhcyhrZXkpKSB7XG4gICAgICBncm91cHMuc2V0KGtleSwge1xuICAgICAgICBjb2xvcjogcGllY2UuY29sb3IsXG4gICAgICAgIHR5cGU6IHBpZWNlLnR5cGUsXG4gICAgICAgIHNxdWFyZXM6IFtdLFxuICAgICAgfSlcbiAgICB9XG5cbiAgICBncm91cHMuZ2V0KGtleSk/LnNxdWFyZXMucHVzaChwaWVjZS5zcXVhcmUpXG4gIH1cblxuICAvLyBTb3J0IGdyb3VwcyBieSBjb2xvciAod2hpdGUgZmlyc3QpIHRoZW4gdHlwZVxuICByZXR1cm4gQXJyYXkuZnJvbShncm91cHMudmFsdWVzKCkpLnNvcnQoKGEsIGIpID0+IHtcbiAgICBpZiAoYS5jb2xvciAhPT0gYi5jb2xvcikge1xuICAgICAgcmV0dXJuIGEuY29sb3IgPT09IFBsYXllckNvbG9yLldISVRFID8gLTEgOiAxXG4gICAgfVxuICAgIHJldHVybiBhLnR5cGUubG9jYWxlQ29tcGFyZShiLnR5cGUpXG4gIH0pXG59XG4iLCJpbXBvcnQgeyB0eXBlIFBpZWNlUG9zaXRpb24sIGdyb3VwQnlDb2xvckFuZFR5cGUgfSBmcm9tICcuLi9jaGVzcy9waWVjZUdyb3VwaW5nJ1xuXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVRdWFkcmFudFRleHQocGllY2VzOiBQaWVjZVBvc2l0aW9uW10pOiBzdHJpbmcge1xuICBpZiAocGllY2VzLmxlbmd0aCA9PT0gMCkgcmV0dXJuICcnXG5cbiAgY29uc3QgZ3JvdXBzID0gZ3JvdXBCeUNvbG9yQW5kVHlwZShwaWVjZXMpXG4gIGNvbnN0IHNlbnRlbmNlczogc3RyaW5nW10gPSBbXVxuXG4gIGZvciAoY29uc3QgZ3JvdXAgb2YgZ3JvdXBzKSB7XG4gICAgY29uc3QgY29sb3JOYW1lID0gZ3JvdXAuY29sb3JcbiAgICBjb25zdCB0eXBlTmFtZSA9IGdyb3VwLnNxdWFyZXMubGVuZ3RoID4gMSA/IGAke2dyb3VwLnR5cGV9c2AgOiBncm91cC50eXBlXG5cbiAgICBpZiAoZ3JvdXAuc3F1YXJlcy5sZW5ndGggPiAxKSB7XG4gICAgICAvLyBNdWx0aXBsZSBwaWVjZXM6IFwid2hpdGUgcGF3bnMgb24gYTIsIGIyXCJcbiAgICAgIGNvbnN0IHNxdWFyZXMgPSBncm91cC5zcXVhcmVzLmpvaW4oJywgJylcbiAgICAgIHNlbnRlbmNlcy5wdXNoKGAke2NvbG9yTmFtZX0gJHt0eXBlTmFtZX0gb24gJHtzcXVhcmVzfWApXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFNpbmdsZSBwaWVjZTogXCJlMSB3aGl0ZSBraW5nXCJcbiAgICAgIHNlbnRlbmNlcy5wdXNoKGAke2dyb3VwLnNxdWFyZXNbMF19ICR7Y29sb3JOYW1lfSAke2dyb3VwLnR5cGV9YClcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYCR7c2VudGVuY2VzLmpvaW4oJy4gJyl9LmBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlQWxsUGllY2VzVGV4dChwaWVjZXM6IFBpZWNlUG9zaXRpb25bXSk6IHN0cmluZyB7XG4gIHJldHVybiBnZW5lcmF0ZVF1YWRyYW50VGV4dChwaWVjZXMpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZUNvbG9yVGV4dChwaWVjZXM6IFBpZWNlUG9zaXRpb25bXSwgY29sb3I6ICd3aGl0ZScgfCAnYmxhY2snKTogc3RyaW5nIHtcbiAgY29uc3QgZmlsdGVyZWQgPSBwaWVjZXMuZmlsdGVyKChwKSA9PiBwLmNvbG9yID09PSBjb2xvcilcbiAgcmV0dXJuIGdlbmVyYXRlUXVhZHJhbnRUZXh0KGZpbHRlcmVkKVxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGdldFNwZWVjaFN5bnRoZXNpcygpOiBTcGVlY2hTeW50aGVzaXMge1xuICByZXR1cm4gd2luZG93LnNwZWVjaFN5bnRoZXNpc1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3BlZWNoU3ludGhlc2lzVXR0ZXJhbmNlKCk6IHR5cGVvZiBTcGVlY2hTeW50aGVzaXNVdHRlcmFuY2Uge1xuICByZXR1cm4gU3BlZWNoU3ludGhlc2lzVXR0ZXJhbmNlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzcGVhayhzeW50aGVzaXM6IFNwZWVjaFN5bnRoZXNpcywgdXR0ZXJhbmNlOiBTcGVlY2hTeW50aGVzaXNVdHRlcmFuY2UpOiB2b2lkIHtcbiAgc3ludGhlc2lzLnNwZWFrKHV0dGVyYW5jZSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNhbmNlbChzeW50aGVzaXM6IFNwZWVjaFN5bnRoZXNpcyk6IHZvaWQge1xuICBzeW50aGVzaXMuY2FuY2VsKClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVV0dGVyYW5jZShcbiAgVXR0ZXJhbmNlQ2xhc3M6IHR5cGVvZiBTcGVlY2hTeW50aGVzaXNVdHRlcmFuY2UsXG4gIHRleHQ6IHN0cmluZ1xuKTogU3BlZWNoU3ludGhlc2lzVXR0ZXJhbmNlIHtcbiAgcmV0dXJuIG5ldyBVdHRlcmFuY2VDbGFzcyh0ZXh0KVxufVxuIiwiaW1wb3J0ICogYXMgY29yZSBmcm9tICcuL2NvcmUnXG5cbmV4cG9ydCBmdW5jdGlvbiBzcGVha1RleHQodGV4dDogc3RyaW5nLCByYXRlOiBudW1iZXIpOiB2b2lkIHtcbiAgY29uc3Qgc3ludGhlc2lzID0gY29yZS5nZXRTcGVlY2hTeW50aGVzaXMoKVxuICBjb25zdCBVdHRlcmFuY2VDbGFzcyA9IGNvcmUuZ2V0U3BlZWNoU3ludGhlc2lzVXR0ZXJhbmNlKClcbiAgY29uc3QgdXR0ZXJhbmNlID0gY29yZS5jcmVhdGVVdHRlcmFuY2UoVXR0ZXJhbmNlQ2xhc3MsIHRleHQpXG4gIHV0dGVyYW5jZS5yYXRlID0gcmF0ZVxuICBjb3JlLnNwZWFrKHN5bnRoZXNpcywgdXR0ZXJhbmNlKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RvcFNwZWFraW5nKCk6IHZvaWQge1xuICBjb25zdCBzeW50aGVzaXMgPSBjb3JlLmdldFNwZWVjaFN5bnRoZXNpcygpXG4gIGNvcmUuY2FuY2VsKHN5bnRoZXNpcylcbn1cbiIsImltcG9ydCB7IFBsYXllckNvbG9yIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL2NoZXNzJ1xuXG5leHBvcnQgaW50ZXJmYWNlIFBpeGVsUG9zaXRpb24ge1xuICB4OiBudW1iZXJcbiAgeTogbnVtYmVyXG59XG5cbmNvbnN0IEZJTEVTID0gJ2FiY2RlZmdoJ1xuXG5leHBvcnQgZnVuY3Rpb24gcGl4ZWxzVG9TcXVhcmUoXG4gIHBvc2l0aW9uOiBQaXhlbFBvc2l0aW9uLFxuICBzcXVhcmVTaXplOiBudW1iZXIsXG4gIHBsYXllckNvbG9yOiBQbGF5ZXJDb2xvclxuKTogc3RyaW5nIHtcbiAgLy8gQ29udmVydCBwaXhlbHMgdG8gZ3JpZCBpbmRpY2VzICgwLTcpXG4gIC8vIEFkanVzdCBmb3IgY2VudGVyLWJhc2VkIGNvb3JkaW5hdGVzIGJlZm9yZSByb3VuZGluZ1xuICBsZXQgY29sID0gTWF0aC5yb3VuZCgocG9zaXRpb24ueCAtIHNxdWFyZVNpemUgLyAyKSAvIHNxdWFyZVNpemUpXG4gIGxldCByb3cgPSBNYXRoLnJvdW5kKChwb3NpdGlvbi55IC0gc3F1YXJlU2l6ZSAvIDIpIC8gc3F1YXJlU2l6ZSlcblxuICAvLyBDbGFtcCB0byB2YWxpZCByYW5nZVxuICBjb2wgPSBNYXRoLm1heCgwLCBNYXRoLm1pbig3LCBjb2wpKVxuICByb3cgPSBNYXRoLm1heCgwLCBNYXRoLm1pbig3LCByb3cpKVxuXG4gIC8vIENvbnZlcnQgdG8gcmFuayBiYXNlZCBvbiBwbGF5ZXIgY29sb3JcbiAgLy8gRm9yIHdoaXRlOiB5PTAgaXMgcmFuayA4LCB5IGluY3JlYXNlcyBnb2luZyB0byByYW5rIDFcbiAgLy8gRm9yIGJsYWNrOiB5PTAgaXMgcmFuayAxLCB5IGluY3JlYXNlcyBnb2luZyB0byByYW5rIDhcbiAgbGV0IHJhbms6IG51bWJlclxuICBsZXQgZmlsZTogc3RyaW5nXG5cbiAgaWYgKHBsYXllckNvbG9yID09PSBQbGF5ZXJDb2xvci5XSElURSkge1xuICAgIGZpbGUgPSBGSUxFU1tjb2xdXG4gICAgcmFuayA9IDggLSByb3dcbiAgfSBlbHNlIHtcbiAgICBmaWxlID0gRklMRVNbNyAtIGNvbF1cbiAgICByYW5rID0gcm93ICsgMVxuICB9XG5cbiAgcmV0dXJuIGAke2ZpbGV9JHtyYW5rfWBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNxdWFyZVRvUGl4ZWxzKFxuICBzcXVhcmU6IHN0cmluZyxcbiAgc3F1YXJlU2l6ZTogbnVtYmVyLFxuICBwbGF5ZXJDb2xvcjogUGxheWVyQ29sb3Jcbik6IFBpeGVsUG9zaXRpb24ge1xuICAvLyBWYWxpZGF0ZSBzcXVhcmUgZm9ybWF0XG4gIGlmIChzcXVhcmUubGVuZ3RoIDwgMikge1xuICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBzcXVhcmUgbm90YXRpb246ICR7c3F1YXJlfWApXG4gIH1cblxuICAvLyBQYXJzZSBzcXVhcmUgbm90YXRpb25cbiAgY29uc3QgZmlsZSA9IHNxdWFyZVswXVxuICBjb25zdCByYW5rID0gTnVtYmVyLnBhcnNlSW50KHNxdWFyZVsxXSwgMTApXG5cbiAgLy8gVmFsaWRhdGUgZmlsZSBhbmQgcmFua1xuICBjb25zdCBjb2wgPSBGSUxFUy5pbmRleE9mKGZpbGUpXG4gIGlmIChjb2wgPT09IC0xKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGZpbGU6ICR7ZmlsZX1gKVxuICB9XG4gIGlmIChyYW5rIDwgMSB8fCByYW5rID4gOCB8fCBOdW1iZXIuaXNOYU4ocmFuaykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgcmFuazogJHtyYW5rfWApXG4gIH1cblxuICAvLyBDYWxjdWxhdGUgcGl4ZWwgcG9zaXRpb24gYmFzZWQgb24gcGxheWVyIGNvbG9yXG4gIGxldCBwaXhlbENvbDogbnVtYmVyXG4gIGxldCBwaXhlbFJvdzogbnVtYmVyXG5cbiAgaWYgKHBsYXllckNvbG9yID09PSBQbGF5ZXJDb2xvci5XSElURSkge1xuICAgIC8vIEZvciB3aGl0ZTogZmlsZXMgZ28gbGVmdC10by1yaWdodCAoYS1oKSwgcmFua3MgZ28gYm90dG9tLXRvLXRvcCAoMS04KVxuICAgIC8vIFNvIHJhbmsgMSBpcyBhdCBib3R0b20gKHJvdyA3KSwgcmFuayA4IGlzIGF0IHRvcCAocm93IDApXG4gICAgcGl4ZWxDb2wgPSBjb2xcbiAgICBwaXhlbFJvdyA9IDggLSByYW5rXG4gIH0gZWxzZSB7XG4gICAgLy8gRm9yIGJsYWNrOiBmaWxlcyBnbyByaWdodC10by1sZWZ0IChoLWEpLCByYW5rcyBnbyB0b3AtdG8tYm90dG9tICg4LTEpXG4gICAgLy8gU28gcmFuayA4IGlzIGF0IHRvcCAocm93IDApLCByYW5rIDEgaXMgYXQgYm90dG9tIChyb3cgNylcbiAgICBwaXhlbENvbCA9IDcgLSBjb2xcbiAgICBwaXhlbFJvdyA9IHJhbmsgLSAxXG4gIH1cblxuICAvLyBDb252ZXJ0IHRvIHBpeGVscyAoY2VudGVyIG9mIHNxdWFyZSlcbiAgcmV0dXJuIHtcbiAgICB4OiBwaXhlbENvbCAqIHNxdWFyZVNpemUgKyBzcXVhcmVTaXplIC8gMixcbiAgICB5OiBwaXhlbFJvdyAqIHNxdWFyZVNpemUgKyBzcXVhcmVTaXplIC8gMixcbiAgfVxufVxuIiwiaW1wb3J0IHsgZ2V0Qm91bmRpbmdDbGllbnRSZWN0IH0gZnJvbSAnLi4vLi4vLi4vcGxhdGZvcm0vZG9tJ1xuXG5leHBvcnQgaW50ZXJmYWNlIFJhd1BpZWNlRGF0YSB7XG4gIGNvbG9yOiBzdHJpbmdcbiAgdHlwZTogc3RyaW5nXG4gIHg6IG51bWJlclxuICB5OiBudW1iZXJcbn1cblxuZXhwb3J0IGludGVyZmFjZSBCb2FyZE1ldHJpY3Mge1xuICBib2FyZFdpZHRoOiBudW1iZXJcbiAgc3F1YXJlU2l6ZTogbnVtYmVyXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0Qm9hcmRNZXRyaWNzKGJvYXJkRWxlbWVudDogSFRNTEVsZW1lbnQpOiBCb2FyZE1ldHJpY3Mge1xuICAvLyBQYXJzZSB3aWR0aCBmcm9tIHN0eWxlIGF0dHJpYnV0ZSBzaW5jZSBnZXRCb3VuZGluZ0NsaWVudFJlY3QgbWF5IG5vdCB3b3JrIGluIHRlc3QgZW52aXJvbm1lbnRzXG4gIGNvbnN0IHdpZHRoTWF0Y2ggPSBib2FyZEVsZW1lbnQuc3R5bGUuY3NzVGV4dC5tYXRjaCgvd2lkdGg6XFxzKihbMC05Ll0rKXB4LylcbiAgY29uc3QgYm9hcmRXaWR0aCA9IHdpZHRoTWF0Y2hcbiAgICA/IE51bWJlci5wYXJzZUZsb2F0KHdpZHRoTWF0Y2hbMV0pXG4gICAgOiBnZXRCb3VuZGluZ0NsaWVudFJlY3QoYm9hcmRFbGVtZW50KS53aWR0aFxuICBjb25zdCBzcXVhcmVTaXplID0gYm9hcmRXaWR0aCAvIDhcblxuICByZXR1cm4geyBib2FyZFdpZHRoLCBzcXVhcmVTaXplIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3RQaWVjZURhdGEocGllY2VFbGVtZW50OiBFbGVtZW50LCBzcXVhcmVTaXplOiBudW1iZXIpOiBSYXdQaWVjZURhdGEgfCBudWxsIHtcbiAgLy8gRXh0cmFjdCBjb2xvciBhbmQgdHlwZSBmcm9tIGNsYXNzXG4gIGNvbnN0IGNsYXNzZXMgPSBwaWVjZUVsZW1lbnQuY2xhc3NOYW1lLnNwbGl0KCcgJylcbiAgY29uc3QgY29sb3JTdHIgPSBjbGFzc2VzWzBdXG4gIGNvbnN0IHR5cGVTdHIgPSBjbGFzc2VzWzFdXG5cbiAgaWYgKCFjb2xvclN0ciB8fCAhdHlwZVN0cikgcmV0dXJuIG51bGxcblxuICAvLyBFeHRyYWN0IHBvc2l0aW9uIGZyb20gdHJhbnNmb3JtXG4gIGNvbnN0IHRyYW5zZm9ybSA9IChwaWVjZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLnRyYW5zZm9ybVxuICBjb25zdCBtYXRjaCA9IHRyYW5zZm9ybS5tYXRjaCgvdHJhbnNsYXRlXFwoKFswLTkuXSspcHgsP1xccyooWzAtOS5dKylweD9cXCkvKVxuICBpZiAoIW1hdGNoKSByZXR1cm4gbnVsbFxuXG4gIC8vIFRyYW5zZm9ybSBnaXZlcyB0b3AtbGVmdCBjb3JuZXIsIGNvbnZlcnQgdG8gY2VudGVyXG4gIGNvbnN0IHggPSBOdW1iZXIucGFyc2VGbG9hdChtYXRjaFsxXSkgKyBzcXVhcmVTaXplIC8gMlxuICBjb25zdCB5ID0gTnVtYmVyLnBhcnNlRmxvYXQobWF0Y2hbMl0pICsgc3F1YXJlU2l6ZSAvIDJcblxuICByZXR1cm4ge1xuICAgIGNvbG9yOiBjb2xvclN0cixcbiAgICB0eXBlOiB0eXBlU3RyLFxuICAgIHgsXG4gICAgeSxcbiAgfVxufVxuIiwiaW1wb3J0IHsgdHlwZSBQaWVjZVR5cGUsIFBsYXllckNvbG9yIH0gZnJvbSAnLi4vLi4vLi4vY29uc3RhbnRzL2NoZXNzJ1xuaW1wb3J0IHsgQ3NzQ2xhc3MsIERvbVNlbGVjdG9yIH0gZnJvbSAnLi4vLi4vLi4vY29uc3RhbnRzL2RvbSdcbmltcG9ydCB7IHBpeGVsc1RvU3F1YXJlIH0gZnJvbSAnLi4vLi4vLi4vZG9tYWluL2NoZXNzL2Nvb3JkaW5hdGVzJ1xuaW1wb3J0IHR5cGUgeyBQaWVjZVBvc2l0aW9uIH0gZnJvbSAnLi4vLi4vLi4vZG9tYWluL2NoZXNzL3BpZWNlR3JvdXBpbmcnXG5pbXBvcnQgeyBxdWVyeVNlbGVjdG9yIH0gZnJvbSAnLi4vLi4vLi4vcGxhdGZvcm0vZG9tJ1xuaW1wb3J0IHsgZXh0cmFjdEJvYXJkTWV0cmljcywgZXh0cmFjdFBpZWNlRGF0YSB9IGZyb20gJy4vZXh0cmFjdGlvbidcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFBsYXllckNvbG9yKCk6IFBsYXllckNvbG9yIHtcbiAgY29uc3QgY29vcmRzID0gcXVlcnlTZWxlY3RvcihEb21TZWxlY3Rvci5DT09SRFMpXG4gIHJldHVybiBjb29yZHM/LmNsYXNzTGlzdC5jb250YWlucyhDc3NDbGFzcy5CTEFDSykgPyBQbGF5ZXJDb2xvci5CTEFDSyA6IFBsYXllckNvbG9yLldISVRFXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWFkUGllY2VQb3NpdGlvbnMoKTogUGllY2VQb3NpdGlvbltdIHtcbiAgY29uc3QgYm9hcmQgPSBxdWVyeVNlbGVjdG9yKERvbVNlbGVjdG9yLkJPQVJEX05PX0NVU1RPTSlcbiAgaWYgKCFib2FyZCkgcmV0dXJuIFtdXG5cbiAgY29uc3QgeyBzcXVhcmVTaXplIH0gPSBleHRyYWN0Qm9hcmRNZXRyaWNzKGJvYXJkIGFzIEhUTUxFbGVtZW50KVxuICBjb25zdCBwbGF5ZXJDb2xvciA9IGdldFBsYXllckNvbG9yKClcblxuICBjb25zdCBwaWVjZXMgPSBib2FyZC5xdWVyeVNlbGVjdG9yQWxsKERvbVNlbGVjdG9yLlBJRUNFKVxuICBjb25zdCBwb3NpdGlvbnM6IFBpZWNlUG9zaXRpb25bXSA9IFtdXG5cbiAgZm9yIChjb25zdCBwaWVjZSBvZiBwaWVjZXMpIHtcbiAgICBjb25zdCByYXdEYXRhID0gZXh0cmFjdFBpZWNlRGF0YShwaWVjZSwgc3F1YXJlU2l6ZSlcbiAgICBpZiAoIXJhd0RhdGEpIGNvbnRpbnVlXG5cbiAgICAvLyBNYXAgdG8gZW51bXNcbiAgICBjb25zdCBjb2xvciA9IHJhd0RhdGEuY29sb3IgPT09ICd3aGl0ZScgPyBQbGF5ZXJDb2xvci5XSElURSA6IFBsYXllckNvbG9yLkJMQUNLXG4gICAgY29uc3QgdHlwZSA9IHJhd0RhdGEudHlwZSBhcyBQaWVjZVR5cGVcblxuICAgIGNvbnN0IHNxdWFyZSA9IHBpeGVsc1RvU3F1YXJlKHsgeDogcmF3RGF0YS54LCB5OiByYXdEYXRhLnkgfSwgc3F1YXJlU2l6ZSwgcGxheWVyQ29sb3IpXG4gICAgcG9zaXRpb25zLnB1c2goeyBzcXVhcmUsIGNvbG9yLCB0eXBlIH0pXG4gIH1cblxuICByZXR1cm4gcG9zaXRpb25zXG59XG4iLCJpbXBvcnQgeyBQbGF5ZXJDb2xvciwgdHlwZSBRdWFkcmFudCB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy9jaGVzcydcbmltcG9ydCB7IFNwZWVjaENvbW1hbmQgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvY29tbWFuZHMnXG5pbXBvcnQgeyBmaWx0ZXJRdWFkcmFudCB9IGZyb20gJy4uLy4uL2RvbWFpbi9jaGVzcy9waWVjZUdyb3VwaW5nJ1xuaW1wb3J0IHtcbiAgZ2VuZXJhdGVBbGxQaWVjZXNUZXh0LFxuICBnZW5lcmF0ZUNvbG9yVGV4dCxcbiAgZ2VuZXJhdGVRdWFkcmFudFRleHQsXG59IGZyb20gJy4uLy4uL2RvbWFpbi9zcGVlY2gvc3BlZWNoVGV4dCdcbmltcG9ydCB7IHNwZWFrVGV4dCwgc3RvcFNwZWFraW5nIH0gZnJvbSAnLi4vLi4vcGxhdGZvcm0vc3BlZWNoJ1xuaW1wb3J0IHsgcmVhZFBpZWNlUG9zaXRpb25zIH0gZnJvbSAnLi4vc2VydmljZXMvYm9hcmRSZWFkZXIvcmVhZGVyJ1xuaW1wb3J0IHR5cGUgeyBTZXR0aW5nc1N0b3JlIH0gZnJvbSAnLi4vc2V0dGluZ3Mvc2V0dGluZ3NTdG9yZSdcblxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZVNwZWVjaENvbW1hbmQoY29tbWFuZDogc3RyaW5nLCBzZXR0aW5nczogU2V0dGluZ3NTdG9yZSk6IHZvaWQge1xuICBpZiAoY29tbWFuZCA9PT0gU3BlZWNoQ29tbWFuZC5TVE9QKSB7XG4gICAgc3RvcFNwZWFraW5nKClcbiAgICByZXR1cm5cbiAgfVxuXG4gIGNvbnN0IHBpZWNlcyA9IHJlYWRQaWVjZVBvc2l0aW9ucygpXG5cbiAgaWYgKGNvbW1hbmQgPT09IFNwZWVjaENvbW1hbmQuQUxMKSB7XG4gICAgY29uc3QgdGV4dCA9IGdlbmVyYXRlQWxsUGllY2VzVGV4dChwaWVjZXMpXG4gICAgc3BlYWtUZXh0KHRleHQsIHNldHRpbmdzLnNwZWFrUmF0ZS52YWx1ZSlcbiAgICByZXR1cm5cbiAgfVxuXG4gIGlmIChjb21tYW5kID09PSBTcGVlY2hDb21tYW5kLldISVRFIHx8IGNvbW1hbmQgPT09IFNwZWVjaENvbW1hbmQuQkxBQ0spIHtcbiAgICBjb25zdCBjb2xvciA9IGNvbW1hbmQgPT09IFNwZWVjaENvbW1hbmQuV0hJVEUgPyBQbGF5ZXJDb2xvci5XSElURSA6IFBsYXllckNvbG9yLkJMQUNLXG4gICAgY29uc3QgdGV4dCA9IGdlbmVyYXRlQ29sb3JUZXh0KHBpZWNlcywgY29sb3IpXG4gICAgc3BlYWtUZXh0KHRleHQsIHNldHRpbmdzLnNwZWFrUmF0ZS52YWx1ZSlcbiAgICByZXR1cm5cbiAgfVxuXG4gIC8vIFF1YWRyYW50IGNvbW1hbmRzOiB3aywgd3EsIGJrLCBicVxuICBjb25zdCBxdWFkcmFudCA9IGNvbW1hbmQgYXMgUXVhZHJhbnRcbiAgY29uc3QgZmlsdGVyZWQgPSBmaWx0ZXJRdWFkcmFudChwaWVjZXMsIHF1YWRyYW50KVxuICBjb25zdCB0ZXh0ID0gZ2VuZXJhdGVRdWFkcmFudFRleHQoZmlsdGVyZWQpXG4gIHNwZWFrVGV4dCh0ZXh0LCBzZXR0aW5ncy5zcGVha1JhdGUudmFsdWUpXG59XG4iLCJpbXBvcnQgeyBLRVlCT0FSRF9DT01NQU5EX01BUCwgdHlwZSBLZXlib2FyZENvbW1hbmQgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvY29tbWFuZHMnXG5pbXBvcnQgeyBEb21TZWxlY3RvciB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy9kb20nXG5pbXBvcnQgeyBxdWVyeVNlbGVjdG9yIH0gZnJvbSAnLi4vLi4vcGxhdGZvcm0vZG9tJ1xuaW1wb3J0IHR5cGUgeyBBbm5vdGF0aW9uc1N0YXRlIH0gZnJvbSAnLi4vLi4vcHJlc2VudGF0aW9uL25vbi1wcmVhY3QtY29tcG9uZW50cy9hbm5vdGF0aW9ucydcbmltcG9ydCB7IGhhbmRsZURyYXdDb21tYW5kIH0gZnJvbSAnLi4vaGFuZGxlcnMvaGFuZGxlRHJhd0NvbW1hbmQnXG5pbXBvcnQgeyBoYW5kbGVTcGVlY2hDb21tYW5kIH0gZnJvbSAnLi4vaGFuZGxlcnMvaGFuZGxlU3BlZWNoQ29tbWFuZCdcbmltcG9ydCB0eXBlIHsgU2V0dGluZ3NTdG9yZSB9IGZyb20gJy4uL3NldHRpbmdzL3NldHRpbmdzU3RvcmUnXG5cbmludGVyZmFjZSBJbnB1dEVsZW1lbnRXaXRoQ2xlYW51cCBleHRlbmRzIEhUTUxJbnB1dEVsZW1lbnQge1xuICBfX2tleWJvYXJkQ29tbWFuZENsZWFudXA/OiAoKSA9PiB2b2lkXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cEtleWJvYXJkQ29tbWFuZHMoXG4gIHNldHRpbmdzOiBTZXR0aW5nc1N0b3JlLFxuICBhbm5vdGF0aW9uc1N0YXRlOiBBbm5vdGF0aW9uc1N0YXRlXG4pOiB2b2lkIHtcbiAgY29uc3QgaW5wdXQgPSBxdWVyeVNlbGVjdG9yKERvbVNlbGVjdG9yLktFWUJPQVJEX0lOUFVUKSBhcyBJbnB1dEVsZW1lbnRXaXRoQ2xlYW51cCB8IG51bGxcbiAgaWYgKCFpbnB1dCkgcmV0dXJuXG5cbiAgY29uc3QgaGFuZGxlSW5wdXQgPSAoZTogRXZlbnQpID0+IHtcbiAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50XG4gICAgY29uc3QgdmFsdWUgPSB0YXJnZXQudmFsdWVcblxuICAgIC8vIENoZWNrIGZvciBzcGVlY2ggY29tbWFuZHNcbiAgICBjb25zdCBjb21tYW5kID0gS0VZQk9BUkRfQ09NTUFORF9NQVAuZ2V0KHZhbHVlIGFzIEtleWJvYXJkQ29tbWFuZClcbiAgICBpZiAoY29tbWFuZCkge1xuICAgICAgaGFuZGxlU3BlZWNoQ29tbWFuZChjb21tYW5kLCBzZXR0aW5ncylcbiAgICAgIHRhcmdldC52YWx1ZSA9ICcnXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICAvLyBDaGVjayBmb3IgZHJhd2luZyBjb21tYW5kc1xuICAgIGlmICh2YWx1ZS5zdGFydHNXaXRoKCctJykpIHtcbiAgICAgIGhhbmRsZURyYXdDb21tYW5kKHZhbHVlLCBhbm5vdGF0aW9uc1N0YXRlKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICB9XG5cbiAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBoYW5kbGVJbnB1dClcblxuICAvLyBTdG9yZSBjbGVhbnVwIGZ1bmN0aW9uIG9uIHRoZSBlbGVtZW50IGZvciBsYXRlciByZW1vdmFsXG4gIGlucHV0Ll9fa2V5Ym9hcmRDb21tYW5kQ2xlYW51cCA9ICgpID0+IHtcbiAgICBpbnB1dC5yZW1vdmVFdmVudExpc3RlbmVyKCdpbnB1dCcsIGhhbmRsZUlucHV0KVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0ZWFyZG93bktleWJvYXJkQ29tbWFuZHMoKTogdm9pZCB7XG4gIGNvbnN0IGlucHV0ID0gcXVlcnlTZWxlY3RvcihEb21TZWxlY3Rvci5LRVlCT0FSRF9JTlBVVCkgYXMgSW5wdXRFbGVtZW50V2l0aENsZWFudXAgfCBudWxsXG4gIGlmIChpbnB1dD8uX19rZXlib2FyZENvbW1hbmRDbGVhbnVwKSB7XG4gICAgaW5wdXQuX19rZXlib2FyZENvbW1hbmRDbGVhbnVwKClcbiAgICBpbnB1dC5fX2tleWJvYXJkQ29tbWFuZENsZWFudXAgPSB1bmRlZmluZWRcbiAgfVxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU11dGF0aW9uT2JzZXJ2ZXIoY2FsbGJhY2s6IE11dGF0aW9uQ2FsbGJhY2spOiBNdXRhdGlvbk9ic2VydmVyIHtcbiAgcmV0dXJuIG5ldyBNdXRhdGlvbk9ic2VydmVyKGNhbGxiYWNrKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gb2JzZXJ2ZShcbiAgb2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXIsXG4gIHRhcmdldDogTm9kZSxcbiAgb3B0aW9uczogTXV0YXRpb25PYnNlcnZlckluaXRcbik6IHZvaWQge1xuICBvYnNlcnZlci5vYnNlcnZlKHRhcmdldCwgb3B0aW9ucylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpc2Nvbm5lY3Qob2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXIpOiB2b2lkIHtcbiAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpXG59XG4iLCJpbXBvcnQgdHlwZSB7IFNpZ25hbCB9IGZyb20gJ0BwcmVhY3Qvc2lnbmFscy1jb3JlJ1xuaW1wb3J0IHsgRG9tU2VsZWN0b3IgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvZG9tJ1xuaW1wb3J0IHsgcXVlcnlTZWxlY3RvciB9IGZyb20gJy4uLy4uL3BsYXRmb3JtL2RvbSdcbmltcG9ydCB7IGNyZWF0ZU11dGF0aW9uT2JzZXJ2ZXIsIGRpc2Nvbm5lY3QsIG9ic2VydmUgfSBmcm9tICcuLi8uLi9wbGF0Zm9ybS9tdXRhdGlvbk9ic2VydmVyJ1xuXG5leHBvcnQgaW50ZXJmYWNlIEJvYXJkT2JzZXJ2ZXJTdGF0ZSB7XG4gIG9ic2VydmVyOiBNdXRhdGlvbk9ic2VydmVyXG4gIGJvYXJkQ2hhbmdlZDogU2lnbmFsPG51bWJlcj5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUJvYXJkT2JzZXJ2ZXIoYm9hcmRDaGFuZ2VkOiBTaWduYWw8bnVtYmVyPik6IEJvYXJkT2JzZXJ2ZXJTdGF0ZSB7XG4gIGNvbnN0IG9ic2VydmVyID0gY3JlYXRlTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgYm9hcmRDaGFuZ2VkLnZhbHVlICs9IDFcbiAgfSlcblxuICByZXR1cm4geyBvYnNlcnZlciwgYm9hcmRDaGFuZ2VkIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0Qm9hcmRPYnNlcnZlcihzdGF0ZTogQm9hcmRPYnNlcnZlclN0YXRlKTogdm9pZCB7XG4gIGNvbnN0IGJvYXJkID0gcXVlcnlTZWxlY3RvcihEb21TZWxlY3Rvci5CT0FSRClcbiAgaWYgKCFib2FyZCkgcmV0dXJuXG5cbiAgb2JzZXJ2ZShzdGF0ZS5vYnNlcnZlciwgYm9hcmQsIHtcbiAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgYXR0cmlidXRlczogdHJ1ZSxcbiAgICBzdWJ0cmVlOiB0cnVlLFxuICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RvcEJvYXJkT2JzZXJ2ZXIoc3RhdGU6IEJvYXJkT2JzZXJ2ZXJTdGF0ZSk6IHZvaWQge1xuICBkaXNjb25uZWN0KHN0YXRlLm9ic2VydmVyKVxufVxuIiwiZXhwb3J0IGludGVyZmFjZSBTZXR0aW5ncyB7XG4gIHNwZWFrUmF0ZTogbnVtYmVyXG4gIHBpZWNlc0xpc3RFbmFibGVkOiBib29sZWFuXG4gIGRpdmlkZXJzRW5hYmxlZDogYm9vbGVhblxuICBjdXN0b21Cb2FyZEVuYWJsZWQ6IGJvb2xlYW5cbiAgb2JmdXNjYXRpb25zRW5hYmxlZDogYm9vbGVhblxuICBwYXJhbGxheDogbnVtYmVyXG4gIGhvdmVyTW9kZTogc3RyaW5nXG4gIHBpZWNlU3R5bGU6IHN0cmluZ1xuICBibHVyOiBudW1iZXJcbiAgYmxhY2tTZWdtZW50czogc3RyaW5nXG4gIGJsYWNrU2VnbWVudHNUaW1pbmc6IHN0cmluZ1xuICBmbGFzaE1vZGVFbmFibGVkOiBib29sZWFuXG4gIGZsYXNoRHVyYXRpb246IG51bWJlclxuICBmbGFzaEludGVydmFsOiBudW1iZXJcbn1cblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRTZXR0aW5nczogU2V0dGluZ3MgPSB7XG4gIHNwZWFrUmF0ZTogMC41LFxuICBwaWVjZXNMaXN0RW5hYmxlZDogZmFsc2UsXG4gIGRpdmlkZXJzRW5hYmxlZDogZmFsc2UsXG4gIGN1c3RvbUJvYXJkRW5hYmxlZDogZmFsc2UsXG4gIG9iZnVzY2F0aW9uc0VuYWJsZWQ6IGZhbHNlLFxuICBwYXJhbGxheDogMCxcbiAgaG92ZXJNb2RlOiAnb2ZmJyxcbiAgcGllY2VTdHlsZTogJ2ljb25zJyxcbiAgYmx1cjogMCxcbiAgYmxhY2tTZWdtZW50czogJ25vbmUnLFxuICBibGFja1NlZ21lbnRzVGltaW5nOiAncm90YXRlLTEwcycsXG4gIGZsYXNoTW9kZUVuYWJsZWQ6IGZhbHNlLFxuICBmbGFzaER1cmF0aW9uOiAxLFxuICBmbGFzaEludGVydmFsOiAzLFxufVxuIiwiLyoqXG4gKiBXcmFwcGVyIG1vZHVsZSBmb3IgbG9jYWxTdG9yYWdlIHRvIGFsbG93IG1vY2tpbmcgd2l0aCBzaW1vbmVcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SXRlbShrZXk6IHN0cmluZyk6IHN0cmluZyB8IG51bGwge1xuICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0SXRlbShrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIHZhbHVlKVxufVxuIiwiaW1wb3J0IHR5cGUgeyBTaWduYWwgfSBmcm9tICdAcHJlYWN0L3NpZ25hbHMtY29yZSdcbmltcG9ydCB7IGVmZmVjdCwgc2lnbmFsIH0gZnJvbSAnQHByZWFjdC9zaWduYWxzLWNvcmUnXG5pbXBvcnQgeyB0eXBlIFNldHRpbmdzLCBkZWZhdWx0U2V0dGluZ3MgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvc2V0dGluZ3MnXG5pbXBvcnQgKiBhcyBzdG9yYWdlIGZyb20gJy4uLy4uL3BsYXRmb3JtL3N0b3JhZ2UnXG5cbmNvbnN0IFNUT1JBR0VfS0VZID0gJ2xpY2hlc3MtYm9hcmQtc3BlYWtlci1zZXR0aW5ncydcblxuZXhwb3J0IGludGVyZmFjZSBTZXR0aW5nc1N0b3JlIHtcbiAgc3BlYWtSYXRlOiBTaWduYWw8bnVtYmVyPlxuICBwaWVjZXNMaXN0RW5hYmxlZDogU2lnbmFsPGJvb2xlYW4+XG4gIGRpdmlkZXJzRW5hYmxlZDogU2lnbmFsPGJvb2xlYW4+XG4gIGN1c3RvbUJvYXJkRW5hYmxlZDogU2lnbmFsPGJvb2xlYW4+XG4gIG9iZnVzY2F0aW9uc0VuYWJsZWQ6IFNpZ25hbDxib29sZWFuPlxuICBwYXJhbGxheDogU2lnbmFsPG51bWJlcj5cbiAgaG92ZXJNb2RlOiBTaWduYWw8c3RyaW5nPlxuICBwaWVjZVN0eWxlOiBTaWduYWw8c3RyaW5nPlxuICBibHVyOiBTaWduYWw8bnVtYmVyPlxuICBibGFja1NlZ21lbnRzOiBTaWduYWw8c3RyaW5nPlxuICBibGFja1NlZ21lbnRzVGltaW5nOiBTaWduYWw8c3RyaW5nPlxuICBmbGFzaE1vZGVFbmFibGVkOiBTaWduYWw8Ym9vbGVhbj5cbiAgZmxhc2hEdXJhdGlvbjogU2lnbmFsPG51bWJlcj5cbiAgZmxhc2hJbnRlcnZhbDogU2lnbmFsPG51bWJlcj5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNldHRpbmdzU3RvcmUoKTogU2V0dGluZ3NTdG9yZSB7XG4gIHJldHVybiB7XG4gICAgc3BlYWtSYXRlOiBzaWduYWwoZGVmYXVsdFNldHRpbmdzLnNwZWFrUmF0ZSksXG4gICAgcGllY2VzTGlzdEVuYWJsZWQ6IHNpZ25hbChkZWZhdWx0U2V0dGluZ3MucGllY2VzTGlzdEVuYWJsZWQpLFxuICAgIGRpdmlkZXJzRW5hYmxlZDogc2lnbmFsKGRlZmF1bHRTZXR0aW5ncy5kaXZpZGVyc0VuYWJsZWQpLFxuICAgIGN1c3RvbUJvYXJkRW5hYmxlZDogc2lnbmFsKGRlZmF1bHRTZXR0aW5ncy5jdXN0b21Cb2FyZEVuYWJsZWQpLFxuICAgIG9iZnVzY2F0aW9uc0VuYWJsZWQ6IHNpZ25hbChkZWZhdWx0U2V0dGluZ3Mub2JmdXNjYXRpb25zRW5hYmxlZCksXG4gICAgcGFyYWxsYXg6IHNpZ25hbChkZWZhdWx0U2V0dGluZ3MucGFyYWxsYXgpLFxuICAgIGhvdmVyTW9kZTogc2lnbmFsKGRlZmF1bHRTZXR0aW5ncy5ob3Zlck1vZGUpLFxuICAgIHBpZWNlU3R5bGU6IHNpZ25hbChkZWZhdWx0U2V0dGluZ3MucGllY2VTdHlsZSksXG4gICAgYmx1cjogc2lnbmFsKGRlZmF1bHRTZXR0aW5ncy5ibHVyKSxcbiAgICBibGFja1NlZ21lbnRzOiBzaWduYWwoZGVmYXVsdFNldHRpbmdzLmJsYWNrU2VnbWVudHMpLFxuICAgIGJsYWNrU2VnbWVudHNUaW1pbmc6IHNpZ25hbChkZWZhdWx0U2V0dGluZ3MuYmxhY2tTZWdtZW50c1RpbWluZyksXG4gICAgZmxhc2hNb2RlRW5hYmxlZDogc2lnbmFsKGRlZmF1bHRTZXR0aW5ncy5mbGFzaE1vZGVFbmFibGVkKSxcbiAgICBmbGFzaER1cmF0aW9uOiBzaWduYWwoZGVmYXVsdFNldHRpbmdzLmZsYXNoRHVyYXRpb24pLFxuICAgIGZsYXNoSW50ZXJ2YWw6IHNpZ25hbChkZWZhdWx0U2V0dGluZ3MuZmxhc2hJbnRlcnZhbCksXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRTZXR0aW5ncyhzZXR0aW5nczogU2V0dGluZ3NTdG9yZSk6IHZvaWQge1xuICBjb25zdCBzdG9yZWQgPSBzdG9yYWdlLmdldEl0ZW0oU1RPUkFHRV9LRVkpXG4gIGlmICghc3RvcmVkKSByZXR1cm5cblxuICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShzdG9yZWQpIGFzIFBhcnRpYWw8U2V0dGluZ3M+XG4gIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKGRhdGEpKSB7XG4gICAgY29uc3Qgc2V0dGluZ0tleSA9IGtleSBhcyBrZXlvZiBTZXR0aW5nc1xuICAgIGlmIChcbiAgICAgIHNldHRpbmdzW3NldHRpbmdLZXldICYmXG4gICAgICB0eXBlb2Ygc2V0dGluZ3Nbc2V0dGluZ0tleV0gPT09ICdvYmplY3QnICYmXG4gICAgICAndmFsdWUnIGluIHNldHRpbmdzW3NldHRpbmdLZXldXG4gICAgKSB7XG4gICAgICAvLyBiaW9tZS1pZ25vcmUgbGludC9zdXNwaWNpb3VzL25vRXhwbGljaXRBbnk6IFNldHRpbmdzIHR5cGUgaXMgZHluYW1pY1xuICAgICAgOyhzZXR0aW5nc1tzZXR0aW5nS2V5XSBhcyBhbnkpLnZhbHVlID0gZGF0YVtzZXR0aW5nS2V5XVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2F2ZVNldHRpbmdzKHNldHRpbmdzOiBTZXR0aW5nc1N0b3JlKTogdm9pZCB7XG4gIGNvbnN0IGRhdGE6IFBhcnRpYWw8U2V0dGluZ3M+ID0ge31cbiAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoc2V0dGluZ3MpKSB7XG4gICAgY29uc3Qgc2V0dGluZ0tleSA9IGtleSBhcyBrZXlvZiB0eXBlb2Ygc2V0dGluZ3NcbiAgICAvLyBiaW9tZS1pZ25vcmUgbGludC9zdXNwaWNpb3VzL25vRXhwbGljaXRBbnk6IFNldHRpbmdzIHR5cGUgaXMgZHluYW1pY1xuICAgIGRhdGFbc2V0dGluZ0tleSBhcyBrZXlvZiBTZXR0aW5nc10gPSAoc2V0dGluZ3Nbc2V0dGluZ0tleV0gYXMgYW55KS52YWx1ZVxuICB9XG4gIHN0b3JhZ2Uuc2V0SXRlbShTVE9SQUdFX0tFWSwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cEF1dG9TYXZlKHNldHRpbmdzOiBTZXR0aW5nc1N0b3JlKTogdm9pZCB7XG4gIGVmZmVjdCgoKSA9PiB7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoc2V0dGluZ3MpKSB7XG4gICAgICBjb25zdCBzZXR0aW5nID0gc2V0dGluZ3Nba2V5IGFzIGtleW9mIHR5cGVvZiBzZXR0aW5nc11cbiAgICAgIHNldHRpbmcudmFsdWVcbiAgICB9XG4gICAgc2F2ZVNldHRpbmdzKHNldHRpbmdzKVxuICB9KVxufVxuIiwidmFyIG4sbCx1LHQsaSxyLG8sZSxmLGMsYSxzLGgscCx2LHksZD17fSx3PVtdLF89L2FjaXR8ZXgoPzpzfGd8bnxwfCQpfHJwaHxncmlkfG93c3xtbmN8bnR3fGluZVtjaF18em9vfF5vcmR8aXRlcmEvaSxnPUFycmF5LmlzQXJyYXk7ZnVuY3Rpb24gbShuLGwpe2Zvcih2YXIgdSBpbiBsKW5bdV09bFt1XTtyZXR1cm4gbn1mdW5jdGlvbiBiKG4pe24mJm4ucGFyZW50Tm9kZSYmbi5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG4pfWZ1bmN0aW9uIGsobCx1LHQpe3ZhciBpLHIsbyxlPXt9O2ZvcihvIGluIHUpXCJrZXlcIj09bz9pPXVbb106XCJyZWZcIj09bz9yPXVbb106ZVtvXT11W29dO2lmKGFyZ3VtZW50cy5sZW5ndGg+MiYmKGUuY2hpbGRyZW49YXJndW1lbnRzLmxlbmd0aD4zP24uY2FsbChhcmd1bWVudHMsMik6dCksXCJmdW5jdGlvblwiPT10eXBlb2YgbCYmbnVsbCE9bC5kZWZhdWx0UHJvcHMpZm9yKG8gaW4gbC5kZWZhdWx0UHJvcHMpdm9pZCAwPT09ZVtvXSYmKGVbb109bC5kZWZhdWx0UHJvcHNbb10pO3JldHVybiB4KGwsZSxpLHIsbnVsbCl9ZnVuY3Rpb24geChuLHQsaSxyLG8pe3ZhciBlPXt0eXBlOm4scHJvcHM6dCxrZXk6aSxyZWY6cixfX2s6bnVsbCxfXzpudWxsLF9fYjowLF9fZTpudWxsLF9fYzpudWxsLGNvbnN0cnVjdG9yOnZvaWQgMCxfX3Y6bnVsbD09bz8rK3U6byxfX2k6LTEsX191OjB9O3JldHVybiBudWxsPT1vJiZudWxsIT1sLnZub2RlJiZsLnZub2RlKGUpLGV9ZnVuY3Rpb24gTSgpe3JldHVybntjdXJyZW50Om51bGx9fWZ1bmN0aW9uIFMobil7cmV0dXJuIG4uY2hpbGRyZW59ZnVuY3Rpb24gQyhuLGwpe3RoaXMucHJvcHM9bix0aGlzLmNvbnRleHQ9bH1mdW5jdGlvbiAkKG4sbCl7aWYobnVsbD09bClyZXR1cm4gbi5fXz8kKG4uX18sbi5fX2krMSk6bnVsbDtmb3IodmFyIHU7bDxuLl9fay5sZW5ndGg7bCsrKWlmKG51bGwhPSh1PW4uX19rW2xdKSYmbnVsbCE9dS5fX2UpcmV0dXJuIHUuX19lO3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIG4udHlwZT8kKG4pOm51bGx9ZnVuY3Rpb24gSShuKXtpZihuLl9fUCYmbi5fX2Qpe3ZhciB1PW4uX192LHQ9dS5fX2UsaT1bXSxyPVtdLG89bSh7fSx1KTtvLl9fdj11Ll9fdisxLGwudm5vZGUmJmwudm5vZGUobykscShuLl9fUCxvLHUsbi5fX24sbi5fX1AubmFtZXNwYWNlVVJJLDMyJnUuX191P1t0XTpudWxsLGksbnVsbD09dD8kKHUpOnQsISEoMzImdS5fX3UpLHIpLG8uX192PXUuX192LG8uX18uX19rW28uX19pXT1vLEQoaSxvLHIpLHUuX19lPXUuX189bnVsbCxvLl9fZSE9dCYmUChvKX19ZnVuY3Rpb24gUChuKXtpZihudWxsIT0obj1uLl9fKSYmbnVsbCE9bi5fX2MpcmV0dXJuIG4uX19lPW4uX19jLmJhc2U9bnVsbCxuLl9fay5zb21lKGZ1bmN0aW9uKGwpe2lmKG51bGwhPWwmJm51bGwhPWwuX19lKXJldHVybiBuLl9fZT1uLl9fYy5iYXNlPWwuX19lfSksUChuKX1mdW5jdGlvbiBBKG4peyghbi5fX2QmJihuLl9fZD0hMCkmJmkucHVzaChuKSYmIUguX19yKyt8fHIhPWwuZGVib3VuY2VSZW5kZXJpbmcpJiYoKHI9bC5kZWJvdW5jZVJlbmRlcmluZyl8fG8pKEgpfWZ1bmN0aW9uIEgoKXt0cnl7Zm9yKHZhciBuLGw9MTtpLmxlbmd0aDspaS5sZW5ndGg+bCYmaS5zb3J0KGUpLG49aS5zaGlmdCgpLGw9aS5sZW5ndGgsSShuKX1maW5hbGx5e2kubGVuZ3RoPUguX19yPTB9fWZ1bmN0aW9uIEwobixsLHUsdCxpLHIsbyxlLGYsYyxhKXt2YXIgcyxoLHAsdix5LF8sZyxtPXQmJnQuX19rfHx3LGI9bC5sZW5ndGg7Zm9yKGY9VCh1LGwsbSxmLGIpLHM9MDtzPGI7cysrKW51bGwhPShwPXUuX19rW3NdKSYmKGg9LTEhPXAuX19pJiZtW3AuX19pXXx8ZCxwLl9faT1zLF89cShuLHAsaCxpLHIsbyxlLGYsYyxhKSx2PXAuX19lLHAucmVmJiZoLnJlZiE9cC5yZWYmJihoLnJlZiYmSihoLnJlZixudWxsLHApLGEucHVzaChwLnJlZixwLl9fY3x8dixwKSksbnVsbD09eSYmbnVsbCE9diYmKHk9diksKGc9ISEoNCZwLl9fdSkpfHxoLl9faz09PXAuX19rPyhmPWoocCxmLG4sZyksZyYmaC5fX2UmJihoLl9fZT1udWxsKSk6XCJmdW5jdGlvblwiPT10eXBlb2YgcC50eXBlJiZ2b2lkIDAhPT1fP2Y9Xzp2JiYoZj12Lm5leHRTaWJsaW5nKSxwLl9fdSY9LTcpO3JldHVybiB1Ll9fZT15LGZ9ZnVuY3Rpb24gVChuLGwsdSx0LGkpe3ZhciByLG8sZSxmLGMsYT11Lmxlbmd0aCxzPWEsaD0wO2ZvcihuLl9faz1uZXcgQXJyYXkoaSkscj0wO3I8aTtyKyspbnVsbCE9KG89bFtyXSkmJlwiYm9vbGVhblwiIT10eXBlb2YgbyYmXCJmdW5jdGlvblwiIT10eXBlb2Ygbz8oXCJzdHJpbmdcIj09dHlwZW9mIG98fFwibnVtYmVyXCI9PXR5cGVvZiBvfHxcImJpZ2ludFwiPT10eXBlb2Ygb3x8by5jb25zdHJ1Y3Rvcj09U3RyaW5nP289bi5fX2tbcl09eChudWxsLG8sbnVsbCxudWxsLG51bGwpOmcobyk/bz1uLl9fa1tyXT14KFMse2NoaWxkcmVuOm99LG51bGwsbnVsbCxudWxsKTp2b2lkIDA9PT1vLmNvbnN0cnVjdG9yJiZvLl9fYj4wP289bi5fX2tbcl09eChvLnR5cGUsby5wcm9wcyxvLmtleSxvLnJlZj9vLnJlZjpudWxsLG8uX192KTpuLl9fa1tyXT1vLGY9citoLG8uX189bixvLl9fYj1uLl9fYisxLGU9bnVsbCwtMSE9KGM9by5fX2k9TyhvLHUsZixzKSkmJihzLS0sKGU9dVtjXSkmJihlLl9fdXw9MikpLG51bGw9PWV8fG51bGw9PWUuX192PygtMT09YyYmKGk+YT9oLS06aTxhJiZoKyspLFwiZnVuY3Rpb25cIiE9dHlwZW9mIG8udHlwZSYmKG8uX191fD00KSk6YyE9ZiYmKGM9PWYtMT9oLS06Yz09ZisxP2grKzooYz5mP2gtLTpoKyssby5fX3V8PTQpKSk6bi5fX2tbcl09bnVsbDtpZihzKWZvcihyPTA7cjxhO3IrKyludWxsIT0oZT11W3JdKSYmMD09KDImZS5fX3UpJiYoZS5fX2U9PXQmJih0PSQoZSkpLEsoZSxlKSk7cmV0dXJuIHR9ZnVuY3Rpb24gaihuLGwsdSx0KXt2YXIgaSxyO2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIG4udHlwZSl7Zm9yKGk9bi5fX2sscj0wO2kmJnI8aS5sZW5ndGg7cisrKWlbcl0mJihpW3JdLl9fPW4sbD1qKGlbcl0sbCx1LHQpKTtyZXR1cm4gbH1uLl9fZSE9bCYmKHQmJihsJiZuLnR5cGUmJiFsLnBhcmVudE5vZGUmJihsPSQobikpLHUuaW5zZXJ0QmVmb3JlKG4uX19lLGx8fG51bGwpKSxsPW4uX19lKTtkb3tsPWwmJmwubmV4dFNpYmxpbmd9d2hpbGUobnVsbCE9bCYmOD09bC5ub2RlVHlwZSk7cmV0dXJuIGx9ZnVuY3Rpb24gRihuLGwpe3JldHVybiBsPWx8fFtdLG51bGw9PW58fFwiYm9vbGVhblwiPT10eXBlb2Ygbnx8KGcobik/bi5zb21lKGZ1bmN0aW9uKG4pe0YobixsKX0pOmwucHVzaChuKSksbH1mdW5jdGlvbiBPKG4sbCx1LHQpe3ZhciBpLHIsbyxlPW4ua2V5LGY9bi50eXBlLGM9bFt1XSxhPW51bGwhPWMmJjA9PSgyJmMuX191KTtpZihudWxsPT09YyYmbnVsbD09ZXx8YSYmZT09Yy5rZXkmJmY9PWMudHlwZSlyZXR1cm4gdTtpZih0PihhPzE6MCkpZm9yKGk9dS0xLHI9dSsxO2k+PTB8fHI8bC5sZW5ndGg7KWlmKG51bGwhPShjPWxbbz1pPj0wP2ktLTpyKytdKSYmMD09KDImYy5fX3UpJiZlPT1jLmtleSYmZj09Yy50eXBlKXJldHVybiBvO3JldHVybi0xfWZ1bmN0aW9uIHoobixsLHUpe1wiLVwiPT1sWzBdP24uc2V0UHJvcGVydHkobCxudWxsPT11P1wiXCI6dSk6bltsXT1udWxsPT11P1wiXCI6XCJudW1iZXJcIiE9dHlwZW9mIHV8fF8udGVzdChsKT91OnUrXCJweFwifWZ1bmN0aW9uIE4obixsLHUsdCxpKXt2YXIgcixvO246aWYoXCJzdHlsZVwiPT1sKWlmKFwic3RyaW5nXCI9PXR5cGVvZiB1KW4uc3R5bGUuY3NzVGV4dD11O2Vsc2V7aWYoXCJzdHJpbmdcIj09dHlwZW9mIHQmJihuLnN0eWxlLmNzc1RleHQ9dD1cIlwiKSx0KWZvcihsIGluIHQpdSYmbCBpbiB1fHx6KG4uc3R5bGUsbCxcIlwiKTtpZih1KWZvcihsIGluIHUpdCYmdVtsXT09dFtsXXx8eihuLnN0eWxlLGwsdVtsXSl9ZWxzZSBpZihcIm9cIj09bFswXSYmXCJuXCI9PWxbMV0pcj1sIT0obD1sLnJlcGxhY2UocyxcIiQxXCIpKSxvPWwudG9Mb3dlckNhc2UoKSxsPW8gaW4gbnx8XCJvbkZvY3VzT3V0XCI9PWx8fFwib25Gb2N1c0luXCI9PWw/by5zbGljZSgyKTpsLnNsaWNlKDIpLG4ubHx8KG4ubD17fSksbi5sW2wrcl09dSx1P3Q/dVthXT10W2FdOih1W2FdPWgsbi5hZGRFdmVudExpc3RlbmVyKGwscj92OnAscikpOm4ucmVtb3ZlRXZlbnRMaXN0ZW5lcihsLHI/djpwLHIpO2Vsc2V7aWYoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPT1pKWw9bC5yZXBsYWNlKC94bGluayhIfDpoKS8sXCJoXCIpLnJlcGxhY2UoL3NOYW1lJC8sXCJzXCIpO2Vsc2UgaWYoXCJ3aWR0aFwiIT1sJiZcImhlaWdodFwiIT1sJiZcImhyZWZcIiE9bCYmXCJsaXN0XCIhPWwmJlwiZm9ybVwiIT1sJiZcInRhYkluZGV4XCIhPWwmJlwiZG93bmxvYWRcIiE9bCYmXCJyb3dTcGFuXCIhPWwmJlwiY29sU3BhblwiIT1sJiZcInJvbGVcIiE9bCYmXCJwb3BvdmVyXCIhPWwmJmwgaW4gbil0cnl7bltsXT1udWxsPT11P1wiXCI6dTticmVhayBufWNhdGNoKG4pe31cImZ1bmN0aW9uXCI9PXR5cGVvZiB1fHwobnVsbD09dXx8ITE9PT11JiZcIi1cIiE9bFs0XT9uLnJlbW92ZUF0dHJpYnV0ZShsKTpuLnNldEF0dHJpYnV0ZShsLFwicG9wb3ZlclwiPT1sJiYxPT11P1wiXCI6dSkpfX1mdW5jdGlvbiBWKG4pe3JldHVybiBmdW5jdGlvbih1KXtpZih0aGlzLmwpe3ZhciB0PXRoaXMubFt1LnR5cGUrbl07aWYobnVsbD09dVtjXSl1W2NdPWgrKztlbHNlIGlmKHVbY108dFthXSlyZXR1cm47cmV0dXJuIHQobC5ldmVudD9sLmV2ZW50KHUpOnUpfX19ZnVuY3Rpb24gcShuLHUsdCxpLHIsbyxlLGYsYyxhKXt2YXIgcyxoLHAsdix5LGQsXyxrLHgsTSwkLEksUCxBLEgsVD11LnR5cGU7aWYodm9pZCAwIT09dS5jb25zdHJ1Y3RvcilyZXR1cm4gbnVsbDsxMjgmdC5fX3UmJihjPSEhKDMyJnQuX191KSxvPVtmPXUuX19lPXQuX19lXSksKHM9bC5fX2IpJiZzKHUpO246aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgVCl0cnl7aWYoaz11LnByb3BzLHg9VC5wcm90b3R5cGUmJlQucHJvdG90eXBlLnJlbmRlcixNPShzPVQuY29udGV4dFR5cGUpJiZpW3MuX19jXSwkPXM/TT9NLnByb3BzLnZhbHVlOnMuX186aSx0Ll9fYz9fPShoPXUuX19jPXQuX19jKS5fXz1oLl9fRTooeD91Ll9fYz1oPW5ldyBUKGssJCk6KHUuX19jPWg9bmV3IEMoaywkKSxoLmNvbnN0cnVjdG9yPVQsaC5yZW5kZXI9USksTSYmTS5zdWIoaCksaC5zdGF0ZXx8KGguc3RhdGU9e30pLGguX19uPWkscD1oLl9fZD0hMCxoLl9faD1bXSxoLl9zYj1bXSkseCYmbnVsbD09aC5fX3MmJihoLl9fcz1oLnN0YXRlKSx4JiZudWxsIT1ULmdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyYmKGguX19zPT1oLnN0YXRlJiYoaC5fX3M9bSh7fSxoLl9fcykpLG0oaC5fX3MsVC5nZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMoayxoLl9fcykpKSx2PWgucHJvcHMseT1oLnN0YXRlLGguX192PXUscCl4JiZudWxsPT1ULmdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyYmbnVsbCE9aC5jb21wb25lbnRXaWxsTW91bnQmJmguY29tcG9uZW50V2lsbE1vdW50KCkseCYmbnVsbCE9aC5jb21wb25lbnREaWRNb3VudCYmaC5fX2gucHVzaChoLmNvbXBvbmVudERpZE1vdW50KTtlbHNle2lmKHgmJm51bGw9PVQuZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzJiZrIT09diYmbnVsbCE9aC5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzJiZoLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMoaywkKSx1Ll9fdj09dC5fX3Z8fCFoLl9fZSYmbnVsbCE9aC5zaG91bGRDb21wb25lbnRVcGRhdGUmJiExPT09aC5zaG91bGRDb21wb25lbnRVcGRhdGUoayxoLl9fcywkKSl7dS5fX3YhPXQuX192JiYoaC5wcm9wcz1rLGguc3RhdGU9aC5fX3MsaC5fX2Q9ITEpLHUuX19lPXQuX19lLHUuX19rPXQuX19rLHUuX19rLnNvbWUoZnVuY3Rpb24obil7biYmKG4uX189dSl9KSx3LnB1c2guYXBwbHkoaC5fX2gsaC5fc2IpLGguX3NiPVtdLGguX19oLmxlbmd0aCYmZS5wdXNoKGgpO2JyZWFrIG59bnVsbCE9aC5jb21wb25lbnRXaWxsVXBkYXRlJiZoLmNvbXBvbmVudFdpbGxVcGRhdGUoayxoLl9fcywkKSx4JiZudWxsIT1oLmNvbXBvbmVudERpZFVwZGF0ZSYmaC5fX2gucHVzaChmdW5jdGlvbigpe2guY29tcG9uZW50RGlkVXBkYXRlKHYseSxkKX0pfWlmKGguY29udGV4dD0kLGgucHJvcHM9ayxoLl9fUD1uLGguX19lPSExLEk9bC5fX3IsUD0wLHgpaC5zdGF0ZT1oLl9fcyxoLl9fZD0hMSxJJiZJKHUpLHM9aC5yZW5kZXIoaC5wcm9wcyxoLnN0YXRlLGguY29udGV4dCksdy5wdXNoLmFwcGx5KGguX19oLGguX3NiKSxoLl9zYj1bXTtlbHNlIGRve2guX19kPSExLEkmJkkodSkscz1oLnJlbmRlcihoLnByb3BzLGguc3RhdGUsaC5jb250ZXh0KSxoLnN0YXRlPWguX19zfXdoaWxlKGguX19kJiYrK1A8MjUpO2guc3RhdGU9aC5fX3MsbnVsbCE9aC5nZXRDaGlsZENvbnRleHQmJihpPW0obSh7fSxpKSxoLmdldENoaWxkQ29udGV4dCgpKSkseCYmIXAmJm51bGwhPWguZ2V0U25hcHNob3RCZWZvcmVVcGRhdGUmJihkPWguZ2V0U25hcHNob3RCZWZvcmVVcGRhdGUodix5KSksQT1udWxsIT1zJiZzLnR5cGU9PT1TJiZudWxsPT1zLmtleT9FKHMucHJvcHMuY2hpbGRyZW4pOnMsZj1MKG4sZyhBKT9BOltBXSx1LHQsaSxyLG8sZSxmLGMsYSksaC5iYXNlPXUuX19lLHUuX191Jj0tMTYxLGguX19oLmxlbmd0aCYmZS5wdXNoKGgpLF8mJihoLl9fRT1oLl9fPW51bGwpfWNhdGNoKG4pe2lmKHUuX192PW51bGwsY3x8bnVsbCE9bylpZihuLnRoZW4pe2Zvcih1Ll9fdXw9Yz8xNjA6MTI4O2YmJjg9PWYubm9kZVR5cGUmJmYubmV4dFNpYmxpbmc7KWY9Zi5uZXh0U2libGluZztvW28uaW5kZXhPZihmKV09bnVsbCx1Ll9fZT1mfWVsc2V7Zm9yKEg9by5sZW5ndGg7SC0tOyliKG9bSF0pO0IodSl9ZWxzZSB1Ll9fZT10Ll9fZSx1Ll9faz10Ll9fayxuLnRoZW58fEIodSk7bC5fX2Uobix1LHQpfWVsc2UgbnVsbD09byYmdS5fX3Y9PXQuX192Pyh1Ll9faz10Ll9fayx1Ll9fZT10Ll9fZSk6Zj11Ll9fZT1HKHQuX19lLHUsdCxpLHIsbyxlLGMsYSk7cmV0dXJuKHM9bC5kaWZmZWQpJiZzKHUpLDEyOCZ1Ll9fdT92b2lkIDA6Zn1mdW5jdGlvbiBCKG4pe24mJihuLl9fYyYmKG4uX19jLl9fZT0hMCksbi5fX2smJm4uX19rLnNvbWUoQikpfWZ1bmN0aW9uIEQobix1LHQpe2Zvcih2YXIgaT0wO2k8dC5sZW5ndGg7aSsrKUoodFtpXSx0WysraV0sdFsrK2ldKTtsLl9fYyYmbC5fX2ModSxuKSxuLnNvbWUoZnVuY3Rpb24odSl7dHJ5e249dS5fX2gsdS5fX2g9W10sbi5zb21lKGZ1bmN0aW9uKG4pe24uY2FsbCh1KX0pfWNhdGNoKG4pe2wuX19lKG4sdS5fX3YpfX0pfWZ1bmN0aW9uIEUobil7cmV0dXJuXCJvYmplY3RcIiE9dHlwZW9mIG58fG51bGw9PW58fG4uX19iPjA/bjpnKG4pP24ubWFwKEUpOnZvaWQgMCE9PW4uY29uc3RydWN0b3I/bnVsbDptKHt9LG4pfWZ1bmN0aW9uIEcodSx0LGkscixvLGUsZixjLGEpe3ZhciBzLGgscCx2LHksdyxfLG09aS5wcm9wc3x8ZCxrPXQucHJvcHMseD10LnR5cGU7aWYoXCJzdmdcIj09eD9vPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIjpcIm1hdGhcIj09eD9vPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OC9NYXRoL01hdGhNTFwiOm98fChvPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbFwiKSxudWxsIT1lKWZvcihzPTA7czxlLmxlbmd0aDtzKyspaWYoKHk9ZVtzXSkmJlwic2V0QXR0cmlidXRlXCJpbiB5PT0hIXgmJih4P3kubG9jYWxOYW1lPT14OjM9PXkubm9kZVR5cGUpKXt1PXksZVtzXT1udWxsO2JyZWFrfWlmKG51bGw9PXUpe2lmKG51bGw9PXgpcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGspO3U9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKG8seCxrLmlzJiZrKSxjJiYobC5fX20mJmwuX19tKHQsZSksYz0hMSksZT1udWxsfWlmKG51bGw9PXgpbT09PWt8fGMmJnUuZGF0YT09a3x8KHUuZGF0YT1rKTtlbHNle2lmKGU9XCJ0ZXh0YXJlYVwiPT14JiZudWxsIT1rLmRlZmF1bHRWYWx1ZT9udWxsOmUmJm4uY2FsbCh1LmNoaWxkTm9kZXMpLCFjJiZudWxsIT1lKWZvcihtPXt9LHM9MDtzPHUuYXR0cmlidXRlcy5sZW5ndGg7cysrKW1bKHk9dS5hdHRyaWJ1dGVzW3NdKS5uYW1lXT15LnZhbHVlO2ZvcihzIGluIG0peT1tW3NdLFwiZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUxcIj09cz9wPXk6XCJjaGlsZHJlblwiPT1zfHxzIGluIGt8fFwidmFsdWVcIj09cyYmXCJkZWZhdWx0VmFsdWVcImluIGt8fFwiY2hlY2tlZFwiPT1zJiZcImRlZmF1bHRDaGVja2VkXCJpbiBrfHxOKHUscyxudWxsLHksbyk7Zm9yKHMgaW4gayl5PWtbc10sXCJjaGlsZHJlblwiPT1zP3Y9eTpcImRhbmdlcm91c2x5U2V0SW5uZXJIVE1MXCI9PXM/aD15OlwidmFsdWVcIj09cz93PXk6XCJjaGVja2VkXCI9PXM/Xz15OmMmJlwiZnVuY3Rpb25cIiE9dHlwZW9mIHl8fG1bc109PT15fHxOKHUscyx5LG1bc10sbyk7aWYoaCljfHxwJiYoaC5fX2h0bWw9PXAuX19odG1sfHxoLl9faHRtbD09dS5pbm5lckhUTUwpfHwodS5pbm5lckhUTUw9aC5fX2h0bWwpLHQuX19rPVtdO2Vsc2UgaWYocCYmKHUuaW5uZXJIVE1MPVwiXCIpLEwoXCJ0ZW1wbGF0ZVwiPT10LnR5cGU/dS5jb250ZW50OnUsZyh2KT92Olt2XSx0LGkscixcImZvcmVpZ25PYmplY3RcIj09eD9cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWxcIjpvLGUsZixlP2VbMF06aS5fX2smJiQoaSwwKSxjLGEpLG51bGwhPWUpZm9yKHM9ZS5sZW5ndGg7cy0tOyliKGVbc10pO2MmJlwidGV4dGFyZWFcIiE9eHx8KHM9XCJ2YWx1ZVwiLFwicHJvZ3Jlc3NcIj09eCYmbnVsbD09dz91LnJlbW92ZUF0dHJpYnV0ZShcInZhbHVlXCIpOm51bGwhPXcmJih3IT09dVtzXXx8XCJwcm9ncmVzc1wiPT14JiYhd3x8XCJvcHRpb25cIj09eCYmdyE9bVtzXSkmJk4odSxzLHcsbVtzXSxvKSxzPVwiY2hlY2tlZFwiLG51bGwhPV8mJl8hPXVbc10mJk4odSxzLF8sbVtzXSxvKSl9cmV0dXJuIHV9ZnVuY3Rpb24gSihuLHUsdCl7dHJ5e2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIG4pe3ZhciBpPVwiZnVuY3Rpb25cIj09dHlwZW9mIG4uX191O2kmJm4uX191KCksaSYmbnVsbD09dXx8KG4uX191PW4odSkpfWVsc2Ugbi5jdXJyZW50PXV9Y2F0Y2gobil7bC5fX2Uobix0KX19ZnVuY3Rpb24gSyhuLHUsdCl7dmFyIGkscjtpZihsLnVubW91bnQmJmwudW5tb3VudChuKSwoaT1uLnJlZikmJihpLmN1cnJlbnQmJmkuY3VycmVudCE9bi5fX2V8fEooaSxudWxsLHUpKSxudWxsIT0oaT1uLl9fYykpe2lmKGkuY29tcG9uZW50V2lsbFVubW91bnQpdHJ5e2kuY29tcG9uZW50V2lsbFVubW91bnQoKX1jYXRjaChuKXtsLl9fZShuLHUpfWkuYmFzZT1pLl9fUD1udWxsfWlmKGk9bi5fX2spZm9yKHI9MDtyPGkubGVuZ3RoO3IrKylpW3JdJiZLKGlbcl0sdSx0fHxcImZ1bmN0aW9uXCIhPXR5cGVvZiBuLnR5cGUpO3R8fGIobi5fX2UpLG4uX19jPW4uX189bi5fX2U9dm9pZCAwfWZ1bmN0aW9uIFEobixsLHUpe3JldHVybiB0aGlzLmNvbnN0cnVjdG9yKG4sdSl9ZnVuY3Rpb24gUih1LHQsaSl7dmFyIHIsbyxlLGY7dD09ZG9jdW1lbnQmJih0PWRvY3VtZW50LmRvY3VtZW50RWxlbWVudCksbC5fXyYmbC5fXyh1LHQpLG89KHI9XCJmdW5jdGlvblwiPT10eXBlb2YgaSk/bnVsbDppJiZpLl9fa3x8dC5fX2ssZT1bXSxmPVtdLHEodCx1PSghciYmaXx8dCkuX19rPWsoUyxudWxsLFt1XSksb3x8ZCxkLHQubmFtZXNwYWNlVVJJLCFyJiZpP1tpXTpvP251bGw6dC5maXJzdENoaWxkP24uY2FsbCh0LmNoaWxkTm9kZXMpOm51bGwsZSwhciYmaT9pOm8/by5fX2U6dC5maXJzdENoaWxkLHIsZiksRChlLHUsZil9ZnVuY3Rpb24gVShuLGwpe1IobixsLFUpfWZ1bmN0aW9uIFcobCx1LHQpe3ZhciBpLHIsbyxlLGY9bSh7fSxsLnByb3BzKTtmb3IobyBpbiBsLnR5cGUmJmwudHlwZS5kZWZhdWx0UHJvcHMmJihlPWwudHlwZS5kZWZhdWx0UHJvcHMpLHUpXCJrZXlcIj09bz9pPXVbb106XCJyZWZcIj09bz9yPXVbb106ZltvXT12b2lkIDA9PT11W29dJiZudWxsIT1lP2Vbb106dVtvXTtyZXR1cm4gYXJndW1lbnRzLmxlbmd0aD4yJiYoZi5jaGlsZHJlbj1hcmd1bWVudHMubGVuZ3RoPjM/bi5jYWxsKGFyZ3VtZW50cywyKTp0KSx4KGwudHlwZSxmLGl8fGwua2V5LHJ8fGwucmVmLG51bGwpfWZ1bmN0aW9uIFgobil7ZnVuY3Rpb24gbChuKXt2YXIgdSx0O3JldHVybiB0aGlzLmdldENoaWxkQ29udGV4dHx8KHU9bmV3IFNldCwodD17fSlbbC5fX2NdPXRoaXMsdGhpcy5nZXRDaGlsZENvbnRleHQ9ZnVuY3Rpb24oKXtyZXR1cm4gdH0sdGhpcy5jb21wb25lbnRXaWxsVW5tb3VudD1mdW5jdGlvbigpe3U9bnVsbH0sdGhpcy5zaG91bGRDb21wb25lbnRVcGRhdGU9ZnVuY3Rpb24obil7dGhpcy5wcm9wcy52YWx1ZSE9bi52YWx1ZSYmdS5mb3JFYWNoKGZ1bmN0aW9uKG4pe24uX19lPSEwLEEobil9KX0sdGhpcy5zdWI9ZnVuY3Rpb24obil7dS5hZGQobik7dmFyIGw9bi5jb21wb25lbnRXaWxsVW5tb3VudDtuLmNvbXBvbmVudFdpbGxVbm1vdW50PWZ1bmN0aW9uKCl7dSYmdS5kZWxldGUobiksbCYmbC5jYWxsKG4pfX0pLG4uY2hpbGRyZW59cmV0dXJuIGwuX19jPVwiX19jQ1wiK3krKyxsLl9fPW4sbC5Qcm92aWRlcj1sLl9fbD0obC5Db25zdW1lcj1mdW5jdGlvbihuLGwpe3JldHVybiBuLmNoaWxkcmVuKGwpfSkuY29udGV4dFR5cGU9bCxsfW49dy5zbGljZSxsPXtfX2U6ZnVuY3Rpb24obixsLHUsdCl7Zm9yKHZhciBpLHIsbztsPWwuX187KWlmKChpPWwuX19jKSYmIWkuX18pdHJ5e2lmKChyPWkuY29uc3RydWN0b3IpJiZudWxsIT1yLmdldERlcml2ZWRTdGF0ZUZyb21FcnJvciYmKGkuc2V0U3RhdGUoci5nZXREZXJpdmVkU3RhdGVGcm9tRXJyb3IobikpLG89aS5fX2QpLG51bGwhPWkuY29tcG9uZW50RGlkQ2F0Y2gmJihpLmNvbXBvbmVudERpZENhdGNoKG4sdHx8e30pLG89aS5fX2QpLG8pcmV0dXJuIGkuX19FPWl9Y2F0Y2gobCl7bj1sfXRocm93IG59fSx1PTAsdD1mdW5jdGlvbihuKXtyZXR1cm4gbnVsbCE9biYmdm9pZCAwPT09bi5jb25zdHJ1Y3Rvcn0sQy5wcm90b3R5cGUuc2V0U3RhdGU9ZnVuY3Rpb24obixsKXt2YXIgdTt1PW51bGwhPXRoaXMuX19zJiZ0aGlzLl9fcyE9dGhpcy5zdGF0ZT90aGlzLl9fczp0aGlzLl9fcz1tKHt9LHRoaXMuc3RhdGUpLFwiZnVuY3Rpb25cIj09dHlwZW9mIG4mJihuPW4obSh7fSx1KSx0aGlzLnByb3BzKSksbiYmbSh1LG4pLG51bGwhPW4mJnRoaXMuX192JiYobCYmdGhpcy5fc2IucHVzaChsKSxBKHRoaXMpKX0sQy5wcm90b3R5cGUuZm9yY2VVcGRhdGU9ZnVuY3Rpb24obil7dGhpcy5fX3YmJih0aGlzLl9fZT0hMCxuJiZ0aGlzLl9faC5wdXNoKG4pLEEodGhpcykpfSxDLnByb3RvdHlwZS5yZW5kZXI9UyxpPVtdLG89XCJmdW5jdGlvblwiPT10eXBlb2YgUHJvbWlzZT9Qcm9taXNlLnByb3RvdHlwZS50aGVuLmJpbmQoUHJvbWlzZS5yZXNvbHZlKCkpOnNldFRpbWVvdXQsZT1mdW5jdGlvbihuLGwpe3JldHVybiBuLl9fdi5fX2ItbC5fX3YuX19ifSxILl9fcj0wLGY9TWF0aC5yYW5kb20oKS50b1N0cmluZyg4KSxjPVwiX19kXCIrZixhPVwiX19hXCIrZixzPS8oUG9pbnRlckNhcHR1cmUpJHxDYXB0dXJlJC9pLGg9MCxwPVYoITEpLHY9VighMCkseT0wO2V4cG9ydHtDIGFzIENvbXBvbmVudCxTIGFzIEZyYWdtZW50LFcgYXMgY2xvbmVFbGVtZW50LFggYXMgY3JlYXRlQ29udGV4dCxrIGFzIGNyZWF0ZUVsZW1lbnQsTSBhcyBjcmVhdGVSZWYsayBhcyBoLFUgYXMgaHlkcmF0ZSx0IGFzIGlzVmFsaWRFbGVtZW50LGwgYXMgb3B0aW9ucyxSIGFzIHJlbmRlcixGIGFzIHRvQ2hpbGRBcnJheX07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wcmVhY3QubW9kdWxlLmpzLm1hcFxuIiwiaW1wb3J0e29wdGlvbnMgYXMgbn1mcm9tXCJwcmVhY3RcIjt2YXIgdCxyLHUsaSxvPTAsZj1bXSxjPW4sZT1jLl9fYixhPWMuX19yLHY9Yy5kaWZmZWQsbD1jLl9fYyxtPWMudW5tb3VudCxzPWMuX187ZnVuY3Rpb24gcChuLHQpe2MuX19oJiZjLl9faChyLG4sb3x8dCksbz0wO3ZhciB1PXIuX19IfHwoci5fX0g9e19fOltdLF9faDpbXX0pO3JldHVybiBuPj11Ll9fLmxlbmd0aCYmdS5fXy5wdXNoKHt9KSx1Ll9fW25dfWZ1bmN0aW9uIGQobil7cmV0dXJuIG89MSxoKEQsbil9ZnVuY3Rpb24gaChuLHUsaSl7dmFyIG89cCh0KyssMik7aWYoby50PW4sIW8uX19jJiYoby5fXz1baT9pKHUpOkQodm9pZCAwLHUpLGZ1bmN0aW9uKG4pe3ZhciB0PW8uX19OP28uX19OWzBdOm8uX19bMF0scj1vLnQodCxuKTt0IT09ciYmKG8uX19OPVtyLG8uX19bMV1dLG8uX19jLnNldFN0YXRlKHt9KSl9XSxvLl9fYz1yLCFyLl9fZikpe3ZhciBmPWZ1bmN0aW9uKG4sdCxyKXtpZighby5fX2MuX19IKXJldHVybiEwO3ZhciB1PW8uX19jLl9fSC5fXy5maWx0ZXIoZnVuY3Rpb24obil7cmV0dXJuIG4uX19jfSk7aWYodS5ldmVyeShmdW5jdGlvbihuKXtyZXR1cm4hbi5fX059KSlyZXR1cm4hY3x8Yy5jYWxsKHRoaXMsbix0LHIpO3ZhciBpPW8uX19jLnByb3BzIT09bjtyZXR1cm4gdS5zb21lKGZ1bmN0aW9uKG4pe2lmKG4uX19OKXt2YXIgdD1uLl9fWzBdO24uX189bi5fX04sbi5fX049dm9pZCAwLHQhPT1uLl9fWzBdJiYoaT0hMCl9fSksYyYmYy5jYWxsKHRoaXMsbix0LHIpfHxpfTtyLl9fZj0hMDt2YXIgYz1yLnNob3VsZENvbXBvbmVudFVwZGF0ZSxlPXIuY29tcG9uZW50V2lsbFVwZGF0ZTtyLmNvbXBvbmVudFdpbGxVcGRhdGU9ZnVuY3Rpb24obix0LHIpe2lmKHRoaXMuX19lKXt2YXIgdT1jO2M9dm9pZCAwLGYobix0LHIpLGM9dX1lJiZlLmNhbGwodGhpcyxuLHQscil9LHIuc2hvdWxkQ29tcG9uZW50VXBkYXRlPWZ9cmV0dXJuIG8uX19OfHxvLl9ffWZ1bmN0aW9uIHkobix1KXt2YXIgaT1wKHQrKywzKTshYy5fX3MmJkMoaS5fX0gsdSkmJihpLl9fPW4saS51PXUsci5fX0guX19oLnB1c2goaSkpfWZ1bmN0aW9uIF8obix1KXt2YXIgaT1wKHQrKyw0KTshYy5fX3MmJkMoaS5fX0gsdSkmJihpLl9fPW4saS51PXUsci5fX2gucHVzaChpKSl9ZnVuY3Rpb24gQShuKXtyZXR1cm4gbz01LFQoZnVuY3Rpb24oKXtyZXR1cm57Y3VycmVudDpufX0sW10pfWZ1bmN0aW9uIEYobix0LHIpe289NixfKGZ1bmN0aW9uKCl7aWYoXCJmdW5jdGlvblwiPT10eXBlb2Ygbil7dmFyIHI9bih0KCkpO3JldHVybiBmdW5jdGlvbigpe24obnVsbCksciYmXCJmdW5jdGlvblwiPT10eXBlb2YgciYmcigpfX1pZihuKXJldHVybiBuLmN1cnJlbnQ9dCgpLGZ1bmN0aW9uKCl7cmV0dXJuIG4uY3VycmVudD1udWxsfX0sbnVsbD09cj9yOnIuY29uY2F0KG4pKX1mdW5jdGlvbiBUKG4scil7dmFyIHU9cCh0KyssNyk7cmV0dXJuIEModS5fX0gscikmJih1Ll9fPW4oKSx1Ll9fSD1yLHUuX19oPW4pLHUuX199ZnVuY3Rpb24gcShuLHQpe3JldHVybiBvPTgsVChmdW5jdGlvbigpe3JldHVybiBufSx0KX1mdW5jdGlvbiB4KG4pe3ZhciB1PXIuY29udGV4dFtuLl9fY10saT1wKHQrKyw5KTtyZXR1cm4gaS5jPW4sdT8obnVsbD09aS5fXyYmKGkuX189ITAsdS5zdWIocikpLHUucHJvcHMudmFsdWUpOm4uX199ZnVuY3Rpb24gUChuLHQpe2MudXNlRGVidWdWYWx1ZSYmYy51c2VEZWJ1Z1ZhbHVlKHQ/dChuKTpuKX1mdW5jdGlvbiBiKG4pe3ZhciB1PXAodCsrLDEwKSxpPWQoKTtyZXR1cm4gdS5fXz1uLHIuY29tcG9uZW50RGlkQ2F0Y2h8fChyLmNvbXBvbmVudERpZENhdGNoPWZ1bmN0aW9uKG4sdCl7dS5fXyYmdS5fXyhuLHQpLGlbMV0obil9KSxbaVswXSxmdW5jdGlvbigpe2lbMV0odm9pZCAwKX1dfWZ1bmN0aW9uIGcoKXt2YXIgbj1wKHQrKywxMSk7aWYoIW4uX18pe2Zvcih2YXIgdT1yLl9fdjtudWxsIT09dSYmIXUuX19tJiZudWxsIT09dS5fXzspdT11Ll9fO3ZhciBpPXUuX19tfHwodS5fX209WzAsMF0pO24uX189XCJQXCIraVswXStcIi1cIitpWzFdKyt9cmV0dXJuIG4uX199ZnVuY3Rpb24gaigpe2Zvcih2YXIgbjtuPWYuc2hpZnQoKTspe3ZhciB0PW4uX19IO2lmKG4uX19QJiZ0KXRyeXt0Ll9faC5zb21lKHopLHQuX19oLnNvbWUoQiksdC5fX2g9W119Y2F0Y2gocil7dC5fX2g9W10sYy5fX2UocixuLl9fdil9fX1jLl9fYj1mdW5jdGlvbihuKXtyPW51bGwsZSYmZShuKX0sYy5fXz1mdW5jdGlvbihuLHQpe24mJnQuX19rJiZ0Ll9fay5fX20mJihuLl9fbT10Ll9fay5fX20pLHMmJnMobix0KX0sYy5fX3I9ZnVuY3Rpb24obil7YSYmYShuKSx0PTA7dmFyIGk9KHI9bi5fX2MpLl9fSDtpJiYodT09PXI/KGkuX19oPVtdLHIuX19oPVtdLGkuX18uc29tZShmdW5jdGlvbihuKXtuLl9fTiYmKG4uX189bi5fX04pLG4udT1uLl9fTj12b2lkIDB9KSk6KGkuX19oLnNvbWUoeiksaS5fX2guc29tZShCKSxpLl9faD1bXSx0PTApKSx1PXJ9LGMuZGlmZmVkPWZ1bmN0aW9uKG4pe3YmJnYobik7dmFyIHQ9bi5fX2M7dCYmdC5fX0gmJih0Ll9fSC5fX2gubGVuZ3RoJiYoMSE9PWYucHVzaCh0KSYmaT09PWMucmVxdWVzdEFuaW1hdGlvbkZyYW1lfHwoKGk9Yy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUpfHx3KShqKSksdC5fX0guX18uc29tZShmdW5jdGlvbihuKXtuLnUmJihuLl9fSD1uLnUpLG4udT12b2lkIDB9KSksdT1yPW51bGx9LGMuX19jPWZ1bmN0aW9uKG4sdCl7dC5zb21lKGZ1bmN0aW9uKG4pe3RyeXtuLl9faC5zb21lKHopLG4uX19oPW4uX19oLmZpbHRlcihmdW5jdGlvbihuKXtyZXR1cm4hbi5fX3x8QihuKX0pfWNhdGNoKHIpe3Quc29tZShmdW5jdGlvbihuKXtuLl9faCYmKG4uX19oPVtdKX0pLHQ9W10sYy5fX2UocixuLl9fdil9fSksbCYmbChuLHQpfSxjLnVubW91bnQ9ZnVuY3Rpb24obil7bSYmbShuKTt2YXIgdCxyPW4uX19jO3ImJnIuX19IJiYoci5fX0guX18uc29tZShmdW5jdGlvbihuKXt0cnl7eihuKX1jYXRjaChuKXt0PW59fSksci5fX0g9dm9pZCAwLHQmJmMuX19lKHQsci5fX3YpKX07dmFyIGs9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWVzdEFuaW1hdGlvbkZyYW1lO2Z1bmN0aW9uIHcobil7dmFyIHQscj1mdW5jdGlvbigpe2NsZWFyVGltZW91dCh1KSxrJiZjYW5jZWxBbmltYXRpb25GcmFtZSh0KSxzZXRUaW1lb3V0KG4pfSx1PXNldFRpbWVvdXQociwzNSk7ayYmKHQ9cmVxdWVzdEFuaW1hdGlvbkZyYW1lKHIpKX1mdW5jdGlvbiB6KG4pe3ZhciB0PXIsdT1uLl9fYztcImZ1bmN0aW9uXCI9PXR5cGVvZiB1JiYobi5fX2M9dm9pZCAwLHUoKSkscj10fWZ1bmN0aW9uIEIobil7dmFyIHQ9cjtuLl9fYz1uLl9fKCkscj10fWZ1bmN0aW9uIEMobix0KXtyZXR1cm4hbnx8bi5sZW5ndGghPT10Lmxlbmd0aHx8dC5zb21lKGZ1bmN0aW9uKHQscil7cmV0dXJuIHQhPT1uW3JdfSl9ZnVuY3Rpb24gRChuLHQpe3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIHQ/dChuKTp0fWV4cG9ydHtxIGFzIHVzZUNhbGxiYWNrLHggYXMgdXNlQ29udGV4dCxQIGFzIHVzZURlYnVnVmFsdWUseSBhcyB1c2VFZmZlY3QsYiBhcyB1c2VFcnJvckJvdW5kYXJ5LGcgYXMgdXNlSWQsRiBhcyB1c2VJbXBlcmF0aXZlSGFuZGxlLF8gYXMgdXNlTGF5b3V0RWZmZWN0LFQgYXMgdXNlTWVtbyxoIGFzIHVzZVJlZHVjZXIsQSBhcyB1c2VSZWYsZCBhcyB1c2VTdGF0ZX07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1ob29rcy5tb2R1bGUuanMubWFwXG4iLCJpbXBvcnR7b3B0aW9ucyBhcyByLEZyYWdtZW50IGFzIGV9ZnJvbVwicHJlYWN0XCI7ZXhwb3J0e0ZyYWdtZW50fWZyb21cInByZWFjdFwiO3ZhciB0PS9bXCImPF0vO2Z1bmN0aW9uIG4ocil7aWYoMD09PXIubGVuZ3RofHwhMT09PXQudGVzdChyKSlyZXR1cm4gcjtmb3IodmFyIGU9MCxuPTAsbz1cIlwiLGY9XCJcIjtuPHIubGVuZ3RoO24rKyl7c3dpdGNoKHIuY2hhckNvZGVBdChuKSl7Y2FzZSAzNDpmPVwiJnF1b3Q7XCI7YnJlYWs7Y2FzZSAzODpmPVwiJmFtcDtcIjticmVhaztjYXNlIDYwOmY9XCImbHQ7XCI7YnJlYWs7ZGVmYXVsdDpjb250aW51ZX1uIT09ZSYmKG8rPXIuc2xpY2UoZSxuKSksbys9ZixlPW4rMX1yZXR1cm4gbiE9PWUmJihvKz1yLnNsaWNlKGUsbikpLG99dmFyIG89L2FjaXR8ZXgoPzpzfGd8bnxwfCQpfHJwaHxncmlkfG93c3xtbmN8bnR3fGluZVtjaF18em9vfF5vcmR8aXRlcmEvaSxmPTAsaT1BcnJheS5pc0FycmF5O2Z1bmN0aW9uIHUoZSx0LG4sbyxpLHUpe3R8fCh0PXt9KTt2YXIgYSxjLHA9dDtpZihcInJlZlwiaW4gcClmb3IoYyBpbiBwPXt9LHQpXCJyZWZcIj09Yz9hPXRbY106cFtjXT10W2NdO3ZhciBsPXt0eXBlOmUscHJvcHM6cCxrZXk6bixyZWY6YSxfX2s6bnVsbCxfXzpudWxsLF9fYjowLF9fZTpudWxsLF9fYzpudWxsLGNvbnN0cnVjdG9yOnZvaWQgMCxfX3Y6LS1mLF9faTotMSxfX3U6MCxfX3NvdXJjZTppLF9fc2VsZjp1fTtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBlJiYoYT1lLmRlZmF1bHRQcm9wcykpZm9yKGMgaW4gYSl2b2lkIDA9PT1wW2NdJiYocFtjXT1hW2NdKTtyZXR1cm4gci52bm9kZSYmci52bm9kZShsKSxsfWZ1bmN0aW9uIGEocil7dmFyIHQ9dShlLHt0cGw6cixleHByczpbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywxKX0pO3JldHVybiB0LmtleT10Ll9fdix0fXZhciBjPXt9LHA9L1tBLVpdL2c7ZnVuY3Rpb24gbChlLHQpe2lmKHIuYXR0cil7dmFyIGY9ci5hdHRyKGUsdCk7aWYoXCJzdHJpbmdcIj09dHlwZW9mIGYpcmV0dXJuIGZ9aWYodD1mdW5jdGlvbihyKXtyZXR1cm4gbnVsbCE9PXImJlwib2JqZWN0XCI9PXR5cGVvZiByJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiByLnZhbHVlT2Y/ci52YWx1ZU9mKCk6cn0odCksXCJyZWZcIj09PWV8fFwia2V5XCI9PT1lKXJldHVyblwiXCI7aWYoXCJzdHlsZVwiPT09ZSYmXCJvYmplY3RcIj09dHlwZW9mIHQpe3ZhciBpPVwiXCI7Zm9yKHZhciB1IGluIHQpe3ZhciBhPXRbdV07aWYobnVsbCE9YSYmXCJcIiE9PWEpe3ZhciBsPVwiLVwiPT11WzBdP3U6Y1t1XXx8KGNbdV09dS5yZXBsYWNlKHAsXCItJCZcIikudG9Mb3dlckNhc2UoKSkscz1cIjtcIjtcIm51bWJlclwiIT10eXBlb2YgYXx8bC5zdGFydHNXaXRoKFwiLS1cIil8fG8udGVzdChsKXx8KHM9XCJweDtcIiksaT1pK2wrXCI6XCIrYStzfX1yZXR1cm4gZSsnPVwiJytuKGkpKydcIid9cmV0dXJuIG51bGw9PXR8fCExPT09dHx8XCJmdW5jdGlvblwiPT10eXBlb2YgdHx8XCJvYmplY3RcIj09dHlwZW9mIHQ/XCJcIjohMD09PXQ/ZTplKyc9XCInK24oXCJcIit0KSsnXCInfWZ1bmN0aW9uIHMocil7aWYobnVsbD09cnx8XCJib29sZWFuXCI9PXR5cGVvZiByfHxcImZ1bmN0aW9uXCI9PXR5cGVvZiByKXJldHVybiBudWxsO2lmKFwib2JqZWN0XCI9PXR5cGVvZiByKXtpZih2b2lkIDA9PT1yLmNvbnN0cnVjdG9yKXJldHVybiByO2lmKGkocikpe2Zvcih2YXIgZT0wO2U8ci5sZW5ndGg7ZSsrKXJbZV09cyhyW2VdKTtyZXR1cm4gcn19cmV0dXJuIG4oXCJcIityKX1leHBvcnR7dSBhcyBqc3gsbCBhcyBqc3hBdHRyLHUgYXMganN4REVWLHMgYXMganN4RXNjYXBlLGEgYXMganN4VGVtcGxhdGUsdSBhcyBqc3hzfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWpzeFJ1bnRpbWUubW9kdWxlLmpzLm1hcFxuIiwiaW1wb3J0IHsgY3JlYXRlQ29udGV4dCB9IGZyb20gJ3ByZWFjdCdcbmltcG9ydCB7IHVzZUNvbnRleHQgfSBmcm9tICdwcmVhY3QvaG9va3MnXG5pbXBvcnQgdHlwZSB7IFNldHRpbmdzU3RvcmUgfSBmcm9tICcuLi8uLi9hcHBsaWNhdGlvbi9zZXR0aW5ncy9zZXR0aW5nc1N0b3JlJ1xuXG5jb25zdCBTZXR0aW5nc0NvbnRleHQgPSBjcmVhdGVDb250ZXh0PFNldHRpbmdzU3RvcmUgfCBudWxsPihudWxsKVxuXG5pbnRlcmZhY2UgU2V0dGluZ3NQcm92aWRlclByb3BzIHtcbiAgc2V0dGluZ3M6IFNldHRpbmdzU3RvcmVcbiAgY2hpbGRyZW46IHByZWFjdC5Db21wb25lbnRDaGlsZHJlblxufVxuXG5leHBvcnQgZnVuY3Rpb24gU2V0dGluZ3NQcm92aWRlcih7IHNldHRpbmdzLCBjaGlsZHJlbiB9OiBTZXR0aW5nc1Byb3ZpZGVyUHJvcHMpIHtcbiAgcmV0dXJuIDxTZXR0aW5nc0NvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3NldHRpbmdzfT57Y2hpbGRyZW59PC9TZXR0aW5nc0NvbnRleHQuUHJvdmlkZXI+XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VTZXR0aW5ncygpOiBTZXR0aW5nc1N0b3JlIHtcbiAgY29uc3Qgc2V0dGluZ3MgPSB1c2VDb250ZXh0KFNldHRpbmdzQ29udGV4dClcbiAgLyogdjggaWdub3JlIG5leHQgMyAqL1xuICBpZiAoIXNldHRpbmdzKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd1c2VTZXR0aW5ncyBtdXN0IGJlIHVzZWQgd2l0aGluIGEgU2V0dGluZ3NQcm92aWRlcicpXG4gIH1cbiAgcmV0dXJuIHNldHRpbmdzXG59XG4iLCIvLyBQYXJhbGxheCBjYW1lcmEgYW5nbGVzIGluIGRlZ3JlZXNcbmV4cG9ydCBlbnVtIFBhcmFsbGF4IHtcbiAgT3ZlcmhlYWQgPSAwLFxuICBTbGlnaHRfMjAgPSAyMCxcbiAgU2xpZ2h0XzMwID0gMzAsXG4gIE1lZGl1bV80MCA9IDQwLFxuICBNZWRpdW1fNTAgPSA1MCxcbiAgU3Ryb25nXzYwID0gNjAsXG4gIFN0cm9uZ182NSA9IDY1LFxuICBTdHJvbmdfNzAgPSA3MCxcbiAgRXh0cmVtZV84MCA9IDgwLFxufVxuXG4vLyBIb3ZlciBtb2RlIG9zY2lsbGF0aW9uIHNjYWxlc1xuZXhwb3J0IGVudW0gSG92ZXJNb2RlIHtcbiAgT2ZmID0gJ29mZicsXG4gIFNtYWxsID0gJ3NtYWxsJyxcbiAgTGFyZ2UgPSAnbGFyZ2UnLFxuICBTdXBlciA9ICdzdXBlcicsXG59XG5cbi8vIFBpZWNlIHZpc3VhbCBzdHlsZXNcbmV4cG9ydCBlbnVtIFBpZWNlU3R5bGUge1xuICBJY29ucyA9ICdpY29ucycsXG4gIFRocmVlRCA9ICczZCcsXG4gIENoZWNrZXIgPSAnY2hlY2tlcicsXG4gIENoZWNrZXJHcmV5ID0gJ2NoZWNrZXItZ3JleScsXG4gIEJsaW5kZm9sZCA9ICdibGluZGZvbGQnLFxufVxuXG4vLyBCbHVyIGFtb3VudHMgaW4gcGl4ZWxzXG5leHBvcnQgZW51bSBCbHVyIHtcbiAgTm9uZSA9IDAsXG4gIFNsaWdodF8xID0gMSxcbiAgU2xpZ2h0XzIgPSAyLFxuICBNZWRpdW1fMyA9IDMsXG4gIE1lZGl1bV80ID0gNCxcbiAgSGVhdnlfNiA9IDYsXG4gIEhlYXZ5XzggPSA4LFxufVxuXG4vLyBCbGFjayBzZWdtZW50cyBxdWFkcmFudCBjb3ZlcmFnZVxuZXhwb3J0IGVudW0gQmxhY2tTZWdtZW50cyB7XG4gIE5vbmUgPSAnbm9uZScsXG4gIE9uZVF1YXJ0ZXIgPSAnMS80JyxcbiAgSGFsZiA9ICcxLzInLFxuICBUaHJlZVF1YXJ0ZXJzID0gJzMvNCcsXG4gIEFsbCA9ICc0LzQnLFxufVxuXG4vLyBCbGFjayBzZWdtZW50cyByb3RhdGlvbiB0aW1pbmdcbmV4cG9ydCBlbnVtIEJsYWNrU2VnbWVudHNUaW1pbmcge1xuICBSb3RhdGUxMHMgPSAncm90YXRlLTEwcycsXG4gIFJvdGF0ZTMwcyA9ICdyb3RhdGUtMzBzJyxcbiAgUm90YXRlNjBzID0gJ3JvdGF0ZS02MHMnLFxuICBEb250Um90YXRlID0gJ2RvbnQtcm90YXRlJyxcbn1cblxuLy8gRmxhc2ggZHVyYXRpb24gaW4gbWlsbGlzZWNvbmRzXG5leHBvcnQgZW51bSBGbGFzaER1cmF0aW9uIHtcbiAgTXMxMDAgPSAxMDAsXG4gIE1zMzAwID0gMzAwLFxuICBNczUwMCA9IDUwMCxcbiAgTXMxMDAwID0gMTAwMCxcbiAgTXMyMDAwID0gMjAwMCxcbn1cblxuLy8gRmxhc2ggaW50ZXJ2YWwgaW4gc2Vjb25kc1xuZXhwb3J0IGVudW0gRmxhc2hJbnRlcnZhbCB7XG4gIFNlYzBfMyA9IDAuMyxcbiAgU2VjMF81ID0gMC41LFxuICBTZWMxID0gMSxcbiAgU2VjMyA9IDMsXG4gIFNlYzUgPSA1LFxuICBTZWMxMCA9IDEwLFxuICBTZWMzMCA9IDMwLFxuICBTZWM2MCA9IDYwLFxufVxuXG4vLyBIZWxwZXIgZnVuY3Rpb25zIHRvIGdldCBhbGwgdmFsdWVzIGFzIGFycmF5cyBmb3IgU2V0dGluZ0J1dHRvbiBvcHRpb25zXG5leHBvcnQgY29uc3QgUEFSQUxMQVhfT1BUSU9OUyA9IE9iamVjdC52YWx1ZXMoUGFyYWxsYXgpLmZpbHRlcihcbiAgKHYpID0+IHR5cGVvZiB2ID09PSAnbnVtYmVyJ1xuKSBhcyBudW1iZXJbXVxuXG5leHBvcnQgY29uc3QgSE9WRVJfTU9ERV9PUFRJT05TID0gT2JqZWN0LnZhbHVlcyhIb3Zlck1vZGUpLmZpbHRlcihcbiAgKHYpID0+IHR5cGVvZiB2ID09PSAnc3RyaW5nJ1xuKSBhcyBzdHJpbmdbXVxuXG5leHBvcnQgY29uc3QgUElFQ0VfU1RZTEVfT1BUSU9OUyA9IE9iamVjdC52YWx1ZXMoUGllY2VTdHlsZSkuZmlsdGVyKFxuICAodikgPT4gdHlwZW9mIHYgPT09ICdzdHJpbmcnXG4pIGFzIHN0cmluZ1tdXG5cbmV4cG9ydCBjb25zdCBCTFVSX09QVElPTlMgPSBPYmplY3QudmFsdWVzKEJsdXIpLmZpbHRlcigodikgPT4gdHlwZW9mIHYgPT09ICdudW1iZXInKSBhcyBudW1iZXJbXVxuXG5leHBvcnQgY29uc3QgQkxBQ0tfU0VHTUVOVFNfT1BUSU9OUyA9IE9iamVjdC52YWx1ZXMoQmxhY2tTZWdtZW50cykuZmlsdGVyKFxuICAodikgPT4gdHlwZW9mIHYgPT09ICdzdHJpbmcnXG4pIGFzIHN0cmluZ1tdXG5cbmV4cG9ydCBjb25zdCBCTEFDS19TRUdNRU5UU19USU1JTkdfT1BUSU9OUyA9IE9iamVjdC52YWx1ZXMoQmxhY2tTZWdtZW50c1RpbWluZykuZmlsdGVyKFxuICAodikgPT4gdHlwZW9mIHYgPT09ICdzdHJpbmcnXG4pIGFzIHN0cmluZ1tdXG5cbmV4cG9ydCBjb25zdCBGTEFTSF9EVVJBVElPTl9PUFRJT05TID0gT2JqZWN0LnZhbHVlcyhGbGFzaER1cmF0aW9uKS5maWx0ZXIoXG4gICh2KSA9PiB0eXBlb2YgdiA9PT0gJ251bWJlcidcbikgYXMgbnVtYmVyW11cblxuZXhwb3J0IGNvbnN0IEZMQVNIX0lOVEVSVkFMX09QVElPTlMgPSBPYmplY3QudmFsdWVzKEZsYXNoSW50ZXJ2YWwpLmZpbHRlcihcbiAgKHYpID0+IHR5cGVvZiB2ID09PSAnbnVtYmVyJ1xuKSBhcyBudW1iZXJbXVxuIiwiaW50ZXJmYWNlIEFjdGlvbkJ1dHRvblByb3BzIHtcbiAgbGFiZWw6IHN0cmluZ1xuICBvbkNsaWNrOiAoKSA9PiB2b2lkXG59XG5cbmNvbnN0IGJ1dHRvblN0eWxlID0ge1xuICBtYXJnaW46ICc0cHgnLFxuICBwYWRkaW5nOiAnNnB4IDEycHgnLFxuICBib3JkZXI6ICcxcHggc29saWQgY3VycmVudENvbG9yJyxcbiAgYm9yZGVyUmFkaXVzOiAnNHB4JyxcbiAgYmFja2dyb3VuZENvbG9yOiAndHJhbnNwYXJlbnQnLFxuICBjb2xvcjogJ2luaGVyaXQnLFxuICBjdXJzb3I6ICdwb2ludGVyJyxcbiAgZm9udFNpemU6ICcxNHB4Jyxcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEFjdGlvbkJ1dHRvbih7IGxhYmVsLCBvbkNsaWNrIH06IEFjdGlvbkJ1dHRvblByb3BzKSB7XG4gIGNvbnN0IGhhbmRsZUNsaWNrID0gKGU6IEV2ZW50KSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgIG9uQ2xpY2soKVxuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8YnV0dG9uIG9uQ2xpY2s9e2hhbmRsZUNsaWNrfSB0eXBlPVwiYnV0dG9uXCIgc3R5bGU9e2J1dHRvblN0eWxlfT5cbiAgICAgIHtsYWJlbH1cbiAgICA8L2J1dHRvbj5cbiAgKVxufVxuIiwiaW1wb3J0IHR5cGUgeyBTaWduYWwgfSBmcm9tICdAcHJlYWN0L3NpZ25hbHMnXG5pbXBvcnQgdHlwZSB7IENvbXBvbmVudENoaWxkcmVuIH0gZnJvbSAncHJlYWN0J1xuXG5pbnRlcmZhY2UgQnV0dG9uUm93UHJvcHMge1xuICBjaGlsZHJlbjogQ29tcG9uZW50Q2hpbGRyZW5cbiAgdmlzaWJsZT86IFNpZ25hbDxib29sZWFuPlxufVxuXG5leHBvcnQgZnVuY3Rpb24gQnV0dG9uUm93KHsgY2hpbGRyZW4sIHZpc2libGUgfTogQnV0dG9uUm93UHJvcHMpIHtcbiAgaWYgKHZpc2libGUgJiYgIXZpc2libGUudmFsdWUpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgcmV0dXJuIDxkaXY+e2NoaWxkcmVufTwvZGl2PlxufVxuIiwiaW1wb3J0IHR5cGUgeyBDb21wb25lbnRDaGlsZHJlbiB9IGZyb20gJ3ByZWFjdCdcblxuaW50ZXJmYWNlIENvbmRpdGlvbmFsQ29udHJvbHNQcm9wcyB7XG4gIGNvbmRpdGlvbjogYm9vbGVhblxuICBjaGlsZHJlbjogQ29tcG9uZW50Q2hpbGRyZW5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIENvbmRpdGlvbmFsQ29udHJvbHMoeyBjb25kaXRpb24sIGNoaWxkcmVuIH06IENvbmRpdGlvbmFsQ29udHJvbHNQcm9wcykge1xuICBpZiAoIWNvbmRpdGlvbikge1xuICAgIHJldHVybiBudWxsXG4gIH1cblxuICByZXR1cm4gPGRpdiBzdHlsZT17eyBtYXJnaW5MZWZ0OiAnMTZweCcgfX0+e2NoaWxkcmVufTwvZGl2PlxufVxuIiwiaW1wb3J0e0NvbXBvbmVudCBhcyBpLG9wdGlvbnMgYXMgcixpc1ZhbGlkRWxlbWVudCBhcyBufWZyb21cInByZWFjdFwiO2ltcG9ydHt1c2VNZW1vIGFzIHQsdXNlUmVmIGFzIGYsdXNlRWZmZWN0IGFzIG99ZnJvbVwicHJlYWN0L2hvb2tzXCI7aW1wb3J0e1NpZ25hbCBhcyBlLGNvbXB1dGVkIGFzIHUsc2lnbmFsIGFzIGEsZWZmZWN0IGFzIGN9ZnJvbVwiQHByZWFjdC9zaWduYWxzLWNvcmVcIjtleHBvcnR7U2lnbmFsLGJhdGNoLGNvbXB1dGVkLGVmZmVjdCxzaWduYWwsdW50cmFja2VkfWZyb21cIkBwcmVhY3Qvc2lnbmFscy1jb3JlXCI7dmFyIHYscztmdW5jdGlvbiBsKGksbil7cltpXT1uLmJpbmQobnVsbCxyW2ldfHxmdW5jdGlvbigpe30pfWZ1bmN0aW9uIGQoaSl7aWYocyl7dmFyIHI9cztzPXZvaWQgMDtyKCl9cz1pJiZpLlMoKX1mdW5jdGlvbiBoKGkpe3ZhciByPXRoaXMsZj1pLmRhdGEsbz11c2VTaWduYWwoZik7by52YWx1ZT1mO3ZhciBlPXQoZnVuY3Rpb24oKXt2YXIgaT1yLl9fdjt3aGlsZShpPWkuX18paWYoaS5fX2Mpe2kuX19jLl9fJGZ8PTQ7YnJlYWt9ci5fXyR1LmM9ZnVuY3Rpb24oKXt2YXIgaSx0PXIuX18kdS5TKCksZj1lLnZhbHVlO3QoKTtpZihuKGYpfHwzIT09KG51bGw9PShpPXIuYmFzZSk/dm9pZCAwOmkubm9kZVR5cGUpKXtyLl9fJGZ8PTE7ci5zZXRTdGF0ZSh7fSl9ZWxzZSByLmJhc2UuZGF0YT1mfTtyZXR1cm4gdShmdW5jdGlvbigpe3ZhciBpPW8udmFsdWUudmFsdWU7cmV0dXJuIDA9PT1pPzA6ITA9PT1pP1wiXCI6aXx8XCJcIn0pfSxbXSk7cmV0dXJuIGUudmFsdWV9aC5kaXNwbGF5TmFtZT1cIl9zdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGUucHJvdG90eXBlLHtjb25zdHJ1Y3Rvcjp7Y29uZmlndXJhYmxlOiEwLHZhbHVlOnZvaWQgMH0sdHlwZTp7Y29uZmlndXJhYmxlOiEwLHZhbHVlOmh9LHByb3BzOntjb25maWd1cmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJue2RhdGE6dGhpc319fSxfX2I6e2NvbmZpZ3VyYWJsZTohMCx2YWx1ZToxfX0pO2woXCJfX2JcIixmdW5jdGlvbihpLHIpe2lmKFwic3RyaW5nXCI9PXR5cGVvZiByLnR5cGUpe3ZhciBuLHQ9ci5wcm9wcztmb3IodmFyIGYgaW4gdClpZihcImNoaWxkcmVuXCIhPT1mKXt2YXIgbz10W2ZdO2lmKG8gaW5zdGFuY2VvZiBlKXtpZighbilyLl9fbnA9bj17fTtuW2ZdPW87dFtmXT1vLnBlZWsoKX19fWkocil9KTtsKFwiX19yXCIsZnVuY3Rpb24oaSxyKXtpKHIpO2QoKTt2YXIgbix0PXIuX19jO2lmKHQpe3QuX18kZiY9LTI7aWYodm9pZCAwPT09KG49dC5fXyR1KSl0Ll9fJHU9bj1mdW5jdGlvbihpKXt2YXIgcjtjKGZ1bmN0aW9uKCl7cj10aGlzfSk7ci5jPWZ1bmN0aW9uKCl7dC5fXyRmfD0xO3Quc2V0U3RhdGUoe30pfTtyZXR1cm4gcn0oKX12PXQ7ZChuKX0pO2woXCJfX2VcIixmdW5jdGlvbihpLHIsbix0KXtkKCk7dj12b2lkIDA7aShyLG4sdCl9KTtsKFwiZGlmZmVkXCIsZnVuY3Rpb24oaSxyKXtkKCk7dj12b2lkIDA7dmFyIG47aWYoXCJzdHJpbmdcIj09dHlwZW9mIHIudHlwZSYmKG49ci5fX2UpKXt2YXIgdD1yLl9fbnAsZj1yLnByb3BzO2lmKHQpe3ZhciBvPW4uVTtpZihvKWZvcih2YXIgZSBpbiBvKXt2YXIgdT1vW2VdO2lmKHZvaWQgMCE9PXUmJiEoZSBpbiB0KSl7dS5kKCk7b1tlXT12b2lkIDB9fWVsc2Ugbi5VPW89e307Zm9yKHZhciBhIGluIHQpe3ZhciBjPW9bYV0scz10W2FdO2lmKHZvaWQgMD09PWMpe2M9cChuLGEscyxmKTtvW2FdPWN9ZWxzZSBjLm8ocyxmKX19fWkocil9KTtmdW5jdGlvbiBwKGkscixuLHQpe3ZhciBmPXIgaW4gaSYmdm9pZCAwPT09aS5vd25lclNWR0VsZW1lbnQsbz1hKG4pO3JldHVybntvOmZ1bmN0aW9uKGkscil7by52YWx1ZT1pO3Q9cn0sZDpjKGZ1bmN0aW9uKCl7dmFyIG49by52YWx1ZS52YWx1ZTtpZih0W3JdIT09bil7dFtyXT1uO2lmKGYpaVtyXT1uO2Vsc2UgaWYobilpLnNldEF0dHJpYnV0ZShyLG4pO2Vsc2UgaS5yZW1vdmVBdHRyaWJ1dGUocil9fSl9fWwoXCJ1bm1vdW50XCIsZnVuY3Rpb24oaSxyKXtpZihcInN0cmluZ1wiPT10eXBlb2Ygci50eXBlKXt2YXIgbj1yLl9fZTtpZihuKXt2YXIgdD1uLlU7aWYodCl7bi5VPXZvaWQgMDtmb3IodmFyIGYgaW4gdCl7dmFyIG89dFtmXTtpZihvKW8uZCgpfX19fWVsc2V7dmFyIGU9ci5fX2M7aWYoZSl7dmFyIHU9ZS5fXyR1O2lmKHUpe2UuX18kdT12b2lkIDA7dS5kKCl9fX1pKHIpfSk7bChcIl9faFwiLGZ1bmN0aW9uKGkscixuLHQpe2lmKHQ8M3x8OT09PXQpci5fXyRmfD0yO2kocixuLHQpfSk7aS5wcm90b3R5cGUuc2hvdWxkQ29tcG9uZW50VXBkYXRlPWZ1bmN0aW9uKGkscil7aWYodGhpcy5fX1IpcmV0dXJuITA7dmFyIG49dGhpcy5fXyR1LHQ9biYmdm9pZCAwIT09bi5zO2Zvcih2YXIgZiBpbiByKXJldHVybiEwO2lmKHRoaXMuX19mfHxcImJvb2xlYW5cIj09dHlwZW9mIHRoaXMudSYmITA9PT10aGlzLnUpe2lmKCEodHx8MiZ0aGlzLl9fJGZ8fDQmdGhpcy5fXyRmKSlyZXR1cm4hMDtpZigxJnRoaXMuX18kZilyZXR1cm4hMH1lbHNle2lmKCEodHx8NCZ0aGlzLl9fJGYpKXJldHVybiEwO2lmKDMmdGhpcy5fXyRmKXJldHVybiEwfWZvcih2YXIgbyBpbiBpKWlmKFwiX19zb3VyY2VcIiE9PW8mJmlbb10hPT10aGlzLnByb3BzW29dKXJldHVybiEwO2Zvcih2YXIgZSBpbiB0aGlzLnByb3BzKWlmKCEoZSBpbiBpKSlyZXR1cm4hMDtyZXR1cm4hMX07ZnVuY3Rpb24gdXNlU2lnbmFsKGkpe3JldHVybiB0KGZ1bmN0aW9uKCl7cmV0dXJuIGEoaSl9LFtdKX1mdW5jdGlvbiB1c2VDb21wdXRlZChpKXt2YXIgcj1mKGkpO3IuY3VycmVudD1pO3YuX18kZnw9NDtyZXR1cm4gdChmdW5jdGlvbigpe3JldHVybiB1KGZ1bmN0aW9uKCl7cmV0dXJuIHIuY3VycmVudCgpfSl9LFtdKX1mdW5jdGlvbiB1c2VTaWduYWxFZmZlY3QoaSl7dmFyIHI9ZihpKTtyLmN1cnJlbnQ9aTtvKGZ1bmN0aW9uKCl7cmV0dXJuIGMoZnVuY3Rpb24oKXtyZXR1cm4gci5jdXJyZW50KCl9KX0sW10pfWV4cG9ydHt1c2VDb21wdXRlZCx1c2VTaWduYWwsdXNlU2lnbmFsRWZmZWN0fTsvLyMgc291cmNlTWFwcGluZ1VSTD1zaWduYWxzLm1vZHVsZS5qcy5tYXBcbiIsImltcG9ydCB7IHR5cGUgU2lnbmFsLCB1c2VDb21wdXRlZCB9IGZyb20gJ0BwcmVhY3Qvc2lnbmFscydcblxuaW50ZXJmYWNlIFNldHRpbmdCdXR0b25Qcm9wczxUPiB7XG4gIGxhYmVsOiBzdHJpbmdcbiAgc2V0dGluZzogU2lnbmFsPFQ+XG4gIG9wdGlvbnM6IHJlYWRvbmx5IFRbXVxufVxuXG5jb25zdCBidXR0b25TdHlsZSA9IHtcbiAgbWFyZ2luOiAnNHB4JyxcbiAgcGFkZGluZzogJzZweCAxMnB4JyxcbiAgYm9yZGVyOiAnMXB4IHNvbGlkIGN1cnJlbnRDb2xvcicsXG4gIGJvcmRlclJhZGl1czogJzRweCcsXG4gIGJhY2tncm91bmRDb2xvcjogJ3RyYW5zcGFyZW50JyxcbiAgY29sb3I6ICdpbmhlcml0JyxcbiAgY3Vyc29yOiAncG9pbnRlcicsXG4gIGZvbnRTaXplOiAnMTRweCcsXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTZXR0aW5nQnV0dG9uPFQ+KHsgbGFiZWwsIHNldHRpbmcsIG9wdGlvbnMgfTogU2V0dGluZ0J1dHRvblByb3BzPFQ+KSB7XG4gIC8vIFVzZSBjb21wdXRlZCB0byBjcmVhdGUgYSByZWFjdGl2ZSBkZXJpdmVkIHZhbHVlXG4gIGNvbnN0IGRpc3BsYXlUZXh0ID0gdXNlQ29tcHV0ZWQoKCkgPT4gYCR7bGFiZWx9OiAke3NldHRpbmcudmFsdWV9YClcblxuICBjb25zdCBoYW5kbGVDbGljayA9IChlOiBFdmVudCkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcblxuICAgIGNvbnN0IGN1cnJlbnRJbmRleCA9IG9wdGlvbnMuaW5kZXhPZihzZXR0aW5nLnZhbHVlKVxuICAgIGNvbnN0IG5leHRJbmRleCA9IChjdXJyZW50SW5kZXggKyAxKSAlIG9wdGlvbnMubGVuZ3RoXG4gICAgY29uc3QgbmV3VmFsdWUgPSBvcHRpb25zW25leHRJbmRleF1cbiAgICBzZXR0aW5nLnZhbHVlID0gbmV3VmFsdWVcbiAgfVxuXG4gIC8vIFJlbmRlciB0aGUgY29tcHV0ZWQgc2lnbmFsIGRpcmVjdGx5XG4gIHJldHVybiAoXG4gICAgPGJ1dHRvbiBvbkNsaWNrPXtoYW5kbGVDbGlja30gdHlwZT1cImJ1dHRvblwiIHN0eWxlPXtidXR0b25TdHlsZX0+XG4gICAgICB7ZGlzcGxheVRleHR9XG4gICAgPC9idXR0b24+XG4gIClcbn1cbiIsImltcG9ydCB7IGhhbmRsZVNwZWVjaENvbW1hbmQgfSBmcm9tICcuLi8uLi9hcHBsaWNhdGlvbi9oYW5kbGVycy9oYW5kbGVTcGVlY2hDb21tYW5kJ1xuaW1wb3J0IHsgU3BlZWNoQ29tbWFuZCB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy9jb21tYW5kcydcbmltcG9ydCB7IHVzZVNldHRpbmdzIH0gZnJvbSAnLi4vY29udGV4dHMvU2V0dGluZ3NDb250ZXh0J1xuaW1wb3J0IHsgQWN0aW9uQnV0dG9uIH0gZnJvbSAnLi9BY3Rpb25CdXR0b24nXG5pbXBvcnQgeyBCdXR0b25Sb3cgfSBmcm9tICcuL0J1dHRvblJvdydcbmltcG9ydCB7IFNldHRpbmdCdXR0b24gfSBmcm9tICcuL1NldHRpbmdCdXR0b24nXG5cbmNvbnN0IFNQRUFLX1JBVEVfT1BUSU9OUyA9IFswLjIsIDAuNSwgMC43LCAxLjAsIDEuMSwgMS4yXSBhcyBjb25zdFxuXG5leHBvcnQgZnVuY3Rpb24gU3BlZWNoQnV0dG9ucygpIHtcbiAgY29uc3Qgc2V0dGluZ3MgPSB1c2VTZXR0aW5ncygpXG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgPEJ1dHRvblJvdz5cbiAgICAgICAgPEFjdGlvbkJ1dHRvblxuICAgICAgICAgIGxhYmVsPVwi8J+UiiDimZQgc2lkZVwiXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlU3BlZWNoQ29tbWFuZChTcGVlY2hDb21tYW5kLldLLCBzZXR0aW5ncyl9XG4gICAgICAgIC8+XG4gICAgICAgIDxBY3Rpb25CdXR0b25cbiAgICAgICAgICBsYWJlbD1cIvCflIog4pmVIHNpZGVcIlxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVNwZWVjaENvbW1hbmQoU3BlZWNoQ29tbWFuZC5XUSwgc2V0dGluZ3MpfVxuICAgICAgICAvPlxuICAgICAgICA8QWN0aW9uQnV0dG9uXG4gICAgICAgICAgbGFiZWw9XCLwn5SKIOKZmiBzaWRlXCJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVTcGVlY2hDb21tYW5kKFNwZWVjaENvbW1hbmQuQkssIHNldHRpbmdzKX1cbiAgICAgICAgLz5cbiAgICAgICAgPEFjdGlvbkJ1dHRvblxuICAgICAgICAgIGxhYmVsPVwi8J+UiiDimZsgc2lkZVwiXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlU3BlZWNoQ29tbWFuZChTcGVlY2hDb21tYW5kLkJRLCBzZXR0aW5ncyl9XG4gICAgICAgIC8+XG4gICAgICA8L0J1dHRvblJvdz5cblxuICAgICAgPEJ1dHRvblJvdz5cbiAgICAgICAgPEFjdGlvbkJ1dHRvblxuICAgICAgICAgIGxhYmVsPVwi8J+UiiBhbGwgcGllY2VzXCJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVTcGVlY2hDb21tYW5kKFNwZWVjaENvbW1hbmQuQUxMLCBzZXR0aW5ncyl9XG4gICAgICAgIC8+XG4gICAgICAgIDxBY3Rpb25CdXR0b25cbiAgICAgICAgICBsYWJlbD1cIvCflIogdydzIHBpZWNlc1wiXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlU3BlZWNoQ29tbWFuZChTcGVlY2hDb21tYW5kLldISVRFLCBzZXR0aW5ncyl9XG4gICAgICAgIC8+XG4gICAgICAgIDxBY3Rpb25CdXR0b25cbiAgICAgICAgICBsYWJlbD1cIvCflIogYidzIHBpZWNlc1wiXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlU3BlZWNoQ29tbWFuZChTcGVlY2hDb21tYW5kLkJMQUNLLCBzZXR0aW5ncyl9XG4gICAgICAgIC8+XG4gICAgICA8L0J1dHRvblJvdz5cblxuICAgICAgPEJ1dHRvblJvdz5cbiAgICAgICAgPFNldHRpbmdCdXR0b24gbGFiZWw9XCLwn5SKIHJhdGVcIiBzZXR0aW5nPXtzZXR0aW5ncy5zcGVha1JhdGV9IG9wdGlvbnM9e1NQRUFLX1JBVEVfT1BUSU9OU30gLz5cbiAgICAgICAgPEFjdGlvbkJ1dHRvblxuICAgICAgICAgIGxhYmVsPVwi8J+UiiBTdG9wXCJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVTcGVlY2hDb21tYW5kKFNwZWVjaENvbW1hbmQuU1RPUCwgc2V0dGluZ3MpfVxuICAgICAgICAvPlxuICAgICAgPC9CdXR0b25Sb3c+XG4gICAgPC9kaXY+XG4gIClcbn1cbiIsImltcG9ydCB0eXBlIHsgU2lnbmFsIH0gZnJvbSAnQHByZWFjdC9zaWduYWxzJ1xuaW1wb3J0IHtcbiAgQkxBQ0tfU0VHTUVOVFNfT1BUSU9OUyxcbiAgQkxBQ0tfU0VHTUVOVFNfVElNSU5HX09QVElPTlMsXG4gIEJMVVJfT1BUSU9OUyxcbiAgRkxBU0hfRFVSQVRJT05fT1BUSU9OUyxcbiAgRkxBU0hfSU5URVJWQUxfT1BUSU9OUyxcbiAgSE9WRVJfTU9ERV9PUFRJT05TLFxuICBQQVJBTExBWF9PUFRJT05TLFxuICBQSUVDRV9TVFlMRV9PUFRJT05TLFxufSBmcm9tICcuLi8uLi9jb25zdGFudHMvb3B0aW9ucydcbmltcG9ydCB7IHVzZVNldHRpbmdzIH0gZnJvbSAnLi4vY29udGV4dHMvU2V0dGluZ3NDb250ZXh0J1xuaW1wb3J0IHsgQWN0aW9uQnV0dG9uIH0gZnJvbSAnLi9BY3Rpb25CdXR0b24nXG5pbXBvcnQgeyBCdXR0b25Sb3cgfSBmcm9tICcuL0J1dHRvblJvdydcbmltcG9ydCB7IENvbmRpdGlvbmFsQ29udHJvbHMgfSBmcm9tICcuL0NvbmRpdGlvbmFsQ29udHJvbHMnXG5pbXBvcnQgeyBTZXR0aW5nQnV0dG9uIH0gZnJvbSAnLi9TZXR0aW5nQnV0dG9uJ1xuaW1wb3J0IHsgU3BlZWNoQnV0dG9ucyB9IGZyb20gJy4vU3BlZWNoQnV0dG9ucydcblxuaW50ZXJmYWNlIENvbnRyb2xQYW5lbFByb3BzIHtcbiAgYm9hcmRDaGFuZ2VkOiBTaWduYWw8bnVtYmVyPlxufVxuXG5jb25zdCBUT0dHTEVfT1BUSU9OUyA9IFtmYWxzZSwgdHJ1ZV0gYXMgY29uc3RcblxuZXhwb3J0IGZ1bmN0aW9uIENvbnRyb2xQYW5lbCh7IGJvYXJkQ2hhbmdlZCB9OiBDb250cm9sUGFuZWxQcm9wcykge1xuICBjb25zdCBzZXR0aW5ncyA9IHVzZVNldHRpbmdzKClcblxuICAvLyBVc2UgYm9hcmRDaGFuZ2VkIHRvIGVuc3VyZSBjb21wb25lbnQgcmUtcmVuZGVycyB3aGVuIGJvYXJkIGNoYW5nZXNcbiAgYm9hcmRDaGFuZ2VkLnZhbHVlXG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgey8qIFNwZWVjaCBCdXR0b25zIC0gQWx3YXlzIFZpc2libGUgKi99XG4gICAgICA8U3BlZWNoQnV0dG9ucyAvPlxuXG4gICAgICB7LyogUm93OiBQaWVjZXMgTGlzdCAqL31cbiAgICAgIDxCdXR0b25Sb3c+XG4gICAgICAgIDxTZXR0aW5nQnV0dG9uXG4gICAgICAgICAgbGFiZWw9XCJQaWVjZXMgTGlzdFwiXG4gICAgICAgICAgc2V0dGluZz17c2V0dGluZ3MucGllY2VzTGlzdEVuYWJsZWR9XG4gICAgICAgICAgb3B0aW9ucz17VE9HR0xFX09QVElPTlN9XG4gICAgICAgIC8+XG4gICAgICA8L0J1dHRvblJvdz5cblxuICAgICAgey8qIFJvdzogQW5ub3RhdGUgQm9hcmQgKi99XG4gICAgICA8QnV0dG9uUm93PlxuICAgICAgICA8QWN0aW9uQnV0dG9uXG4gICAgICAgICAgbGFiZWw9XCJBbm5vdGF0ZSBCb2FyZFwiXG4gICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgLy8gVE9ETzogRm9jdXMgbW92ZSBpbnB1dCBvciB0cmlnZ2VyIGFubm90YXRpb24gbW9kZVxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0Fubm90YXRlIEJvYXJkIGNsaWNrZWQnKVxuICAgICAgICAgIH19XG4gICAgICAgIC8+XG4gICAgICA8L0J1dHRvblJvdz5cblxuICAgICAgey8qIFJvdzogRGl2aWRlcnMgYW5kIEN1c3RvbSBCb2FyZCAqL31cbiAgICAgIDxCdXR0b25Sb3c+XG4gICAgICAgIDxTZXR0aW5nQnV0dG9uXG4gICAgICAgICAgbGFiZWw9XCJEaXZpZGVyc1wiXG4gICAgICAgICAgc2V0dGluZz17c2V0dGluZ3MuZGl2aWRlcnNFbmFibGVkfVxuICAgICAgICAgIG9wdGlvbnM9e1RPR0dMRV9PUFRJT05TfVxuICAgICAgICAvPlxuICAgICAgICA8U2V0dGluZ0J1dHRvblxuICAgICAgICAgIGxhYmVsPVwiQ3VzdG9tIEJvYXJkXCJcbiAgICAgICAgICBzZXR0aW5nPXtzZXR0aW5ncy5jdXN0b21Cb2FyZEVuYWJsZWR9XG4gICAgICAgICAgb3B0aW9ucz17VE9HR0xFX09QVElPTlN9XG4gICAgICAgIC8+XG4gICAgICA8L0J1dHRvblJvdz5cblxuICAgICAgey8qIEN1c3RvbSBCb2FyZCBOZXN0ZWQgQ29udHJvbHMgKi99XG4gICAgICA8Q29uZGl0aW9uYWxDb250cm9scyBjb25kaXRpb249e3NldHRpbmdzLmN1c3RvbUJvYXJkRW5hYmxlZC52YWx1ZX0+XG4gICAgICAgIDxCdXR0b25Sb3c+XG4gICAgICAgICAgPFNldHRpbmdCdXR0b25cbiAgICAgICAgICAgIGxhYmVsPVwiT2JmdXNjYXRpb25zXCJcbiAgICAgICAgICAgIHNldHRpbmc9e3NldHRpbmdzLm9iZnVzY2F0aW9uc0VuYWJsZWR9XG4gICAgICAgICAgICBvcHRpb25zPXtUT0dHTEVfT1BUSU9OU31cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxTZXR0aW5nQnV0dG9uIGxhYmVsPVwiUGFyYWxsYXhcIiBzZXR0aW5nPXtzZXR0aW5ncy5wYXJhbGxheH0gb3B0aW9ucz17UEFSQUxMQVhfT1BUSU9OU30gLz5cbiAgICAgICAgICA8U2V0dGluZ0J1dHRvblxuICAgICAgICAgICAgbGFiZWw9XCJIb3ZlciBNb2RlXCJcbiAgICAgICAgICAgIHNldHRpbmc9e3NldHRpbmdzLmhvdmVyTW9kZX1cbiAgICAgICAgICAgIG9wdGlvbnM9e0hPVkVSX01PREVfT1BUSU9OU31cbiAgICAgICAgICAvPlxuICAgICAgICA8L0J1dHRvblJvdz5cblxuICAgICAgICB7LyogT2JmdXNjYXRpb25zIE5lc3RlZCBDb250cm9scyAqL31cbiAgICAgICAgPENvbmRpdGlvbmFsQ29udHJvbHMgY29uZGl0aW9uPXtzZXR0aW5ncy5vYmZ1c2NhdGlvbnNFbmFibGVkLnZhbHVlfT5cbiAgICAgICAgICA8QnV0dG9uUm93PlxuICAgICAgICAgICAgPFNldHRpbmdCdXR0b25cbiAgICAgICAgICAgICAgbGFiZWw9XCJQaWVjZSBTdHlsZVwiXG4gICAgICAgICAgICAgIHNldHRpbmc9e3NldHRpbmdzLnBpZWNlU3R5bGV9XG4gICAgICAgICAgICAgIG9wdGlvbnM9e1BJRUNFX1NUWUxFX09QVElPTlN9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPFNldHRpbmdCdXR0b24gbGFiZWw9XCJCbHVyXCIgc2V0dGluZz17c2V0dGluZ3MuYmx1cn0gb3B0aW9ucz17QkxVUl9PUFRJT05TfSAvPlxuICAgICAgICAgICAgPFNldHRpbmdCdXR0b25cbiAgICAgICAgICAgICAgbGFiZWw9XCJCbGFjayBTZWdtZW50c1wiXG4gICAgICAgICAgICAgIHNldHRpbmc9e3NldHRpbmdzLmJsYWNrU2VnbWVudHN9XG4gICAgICAgICAgICAgIG9wdGlvbnM9e0JMQUNLX1NFR01FTlRTX09QVElPTlN9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvQnV0dG9uUm93PlxuXG4gICAgICAgICAgey8qIEJsYWNrIFNlZ21lbnRzIFRpbWluZyAtIG9ubHkgd2hlbiBub3QgJ25vbmUnICovfVxuICAgICAgICAgIDxDb25kaXRpb25hbENvbnRyb2xzIGNvbmRpdGlvbj17c2V0dGluZ3MuYmxhY2tTZWdtZW50cy52YWx1ZSAhPT0gJ25vbmUnfT5cbiAgICAgICAgICAgIDxCdXR0b25Sb3c+XG4gICAgICAgICAgICAgIDxTZXR0aW5nQnV0dG9uXG4gICAgICAgICAgICAgICAgbGFiZWw9XCJUaW1pbmdcIlxuICAgICAgICAgICAgICAgIHNldHRpbmc9e3NldHRpbmdzLmJsYWNrU2VnbWVudHNUaW1pbmd9XG4gICAgICAgICAgICAgICAgb3B0aW9ucz17QkxBQ0tfU0VHTUVOVFNfVElNSU5HX09QVElPTlN9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L0J1dHRvblJvdz5cbiAgICAgICAgICA8L0NvbmRpdGlvbmFsQ29udHJvbHM+XG4gICAgICAgIDwvQ29uZGl0aW9uYWxDb250cm9scz5cbiAgICAgIDwvQ29uZGl0aW9uYWxDb250cm9scz5cblxuICAgICAgey8qIFJvdzogRmxhc2ggTW9kZSAqL31cbiAgICAgIDxCdXR0b25Sb3c+XG4gICAgICAgIDxTZXR0aW5nQnV0dG9uXG4gICAgICAgICAgbGFiZWw9XCJGbGFzaCBNb2RlXCJcbiAgICAgICAgICBzZXR0aW5nPXtzZXR0aW5ncy5mbGFzaE1vZGVFbmFibGVkfVxuICAgICAgICAgIG9wdGlvbnM9e1RPR0dMRV9PUFRJT05TfVxuICAgICAgICAvPlxuICAgICAgPC9CdXR0b25Sb3c+XG5cbiAgICAgIHsvKiBGbGFzaCBNb2RlIE5lc3RlZCBDb250cm9scyAqL31cbiAgICAgIDxDb25kaXRpb25hbENvbnRyb2xzIGNvbmRpdGlvbj17c2V0dGluZ3MuZmxhc2hNb2RlRW5hYmxlZC52YWx1ZX0+XG4gICAgICAgIDxCdXR0b25Sb3c+XG4gICAgICAgICAgPFNldHRpbmdCdXR0b25cbiAgICAgICAgICAgIGxhYmVsPVwiRmxhc2ggRHVyYXRpb25cIlxuICAgICAgICAgICAgc2V0dGluZz17c2V0dGluZ3MuZmxhc2hEdXJhdGlvbn1cbiAgICAgICAgICAgIG9wdGlvbnM9e0ZMQVNIX0RVUkFUSU9OX09QVElPTlN9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8U2V0dGluZ0J1dHRvblxuICAgICAgICAgICAgbGFiZWw9XCJGbGFzaCBJbnRlcnZhbFwiXG4gICAgICAgICAgICBzZXR0aW5nPXtzZXR0aW5ncy5mbGFzaEludGVydmFsfVxuICAgICAgICAgICAgb3B0aW9ucz17RkxBU0hfSU5URVJWQUxfT1BUSU9OU31cbiAgICAgICAgICAvPlxuICAgICAgICA8L0J1dHRvblJvdz5cbiAgICAgIDwvQ29uZGl0aW9uYWxDb250cm9scz5cbiAgICA8L2Rpdj5cbiAgKVxufVxuIiwiaW1wb3J0IHR5cGUgeyBTaWduYWwgfSBmcm9tICdAcHJlYWN0L3NpZ25hbHMtY29yZSdcbmltcG9ydCB7IHJlbmRlciB9IGZyb20gJ3ByZWFjdCdcbmltcG9ydCB0eXBlIHsgU2V0dGluZ3NTdG9yZSB9IGZyb20gJy4uLy4uL2FwcGxpY2F0aW9uL3NldHRpbmdzL3NldHRpbmdzU3RvcmUnXG5pbXBvcnQgeyBTZXR0aW5nc1Byb3ZpZGVyIH0gZnJvbSAnLi4vY29udGV4dHMvU2V0dGluZ3NDb250ZXh0J1xuaW1wb3J0IHsgQ29udHJvbFBhbmVsIH0gZnJvbSAnLi9Db250cm9sUGFuZWwnXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVSb290KFxuICBib2FyZENoYW5nZWQ6IFNpZ25hbDxudW1iZXI+LFxuICBtb3VudFBvaW50OiBIVE1MRWxlbWVudCxcbiAgc2V0dGluZ3M6IFNldHRpbmdzU3RvcmVcbik6IHZvaWQge1xuICByZW5kZXIoXG4gICAgPFNldHRpbmdzUHJvdmlkZXIgc2V0dGluZ3M9e3NldHRpbmdzfT5cbiAgICAgIDxDb250cm9sUGFuZWwgYm9hcmRDaGFuZ2VkPXtib2FyZENoYW5nZWR9IC8+XG4gICAgPC9TZXR0aW5nc1Byb3ZpZGVyPixcbiAgICBtb3VudFBvaW50XG4gIClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlc3Ryb3lSb290KG1vdW50UG9pbnQ6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gIHJlbmRlcihudWxsLCBtb3VudFBvaW50KVxufVxuIiwiaW1wb3J0IHsgc2lnbmFsIH0gZnJvbSAnQHByZWFjdC9zaWduYWxzLWNvcmUnXG5pbXBvcnQgeyBzZXR1cEJsdXJFZmZlY3QgfSBmcm9tICcuL2FwcGxpY2F0aW9uL2VmZmVjdHMvb25CbHVyJ1xuaW1wb3J0IHsgc2V0dXBEaXZpZGVyc0VmZmVjdCB9IGZyb20gJy4vYXBwbGljYXRpb24vZWZmZWN0cy9vbkRpdmlkZXJzJ1xuaW1wb3J0IHsgc2V0dXBGbGFzaEVmZmVjdCB9IGZyb20gJy4vYXBwbGljYXRpb24vZWZmZWN0cy9vbkZsYXNoJ1xuaW1wb3J0IHsgY3JlYXRlRmxhc2hMb29wU3RhdGUgfSBmcm9tICcuL2FwcGxpY2F0aW9uL2hhbmRsZXJzL2hhbmRsZUZsYXNoJ1xuaW1wb3J0IHsgc2V0dXBLZXlib2FyZENvbW1hbmRzLCB0ZWFyZG93bktleWJvYXJkQ29tbWFuZHMgfSBmcm9tICcuL2FwcGxpY2F0aW9uL2lucHV0L2tleWJvYXJkSW5wdXQnXG5pbXBvcnQge1xuICBjcmVhdGVCb2FyZE9ic2VydmVyLFxuICBzdGFydEJvYXJkT2JzZXJ2ZXIsXG4gIHN0b3BCb2FyZE9ic2VydmVyLFxufSBmcm9tICcuL2FwcGxpY2F0aW9uL29ic2VydmVycy9vYnNlcnZlclN0YXRlJ1xuaW1wb3J0IHtcbiAgY3JlYXRlU2V0dGluZ3NTdG9yZSxcbiAgbG9hZFNldHRpbmdzLFxuICBzZXR1cEF1dG9TYXZlLFxufSBmcm9tICcuL2FwcGxpY2F0aW9uL3NldHRpbmdzL3NldHRpbmdzU3RvcmUnXG5pbXBvcnQgeyBEb21TZWxlY3RvciB9IGZyb20gJy4vY29uc3RhbnRzL2RvbSdcbmltcG9ydCB7IGFwcGVuZENoaWxkLCBjcmVhdGVEaXYsIHF1ZXJ5U2VsZWN0b3IsIHdhaXRGb3JFbGVtZW50IH0gZnJvbSAnLi9wbGF0Zm9ybS9kb20nXG5pbXBvcnQgeyBjcmVhdGVSb290LCBkZXN0cm95Um9vdCB9IGZyb20gJy4vcHJlc2VudGF0aW9uL2NvbXBvbmVudHMvcm9vdCdcbmltcG9ydCB7XG4gIGNyZWF0ZUFubm90YXRpb25zLFxuICBkZXN0cm95QW5ub3RhdGlvbnMsXG59IGZyb20gJy4vcHJlc2VudGF0aW9uL25vbi1wcmVhY3QtY29tcG9uZW50cy9hbm5vdGF0aW9ucydcbmltcG9ydCB7IGNyZWF0ZURpdmlkZXJzLCBkZXN0cm95RGl2aWRlcnMgfSBmcm9tICcuL3ByZXNlbnRhdGlvbi9ub24tcHJlYWN0LWNvbXBvbmVudHMvZGl2aWRlcnMnXG5pbXBvcnQgeyBjcmVhdGVGbGFzaE92ZXJsYXksIGRlc3Ryb3lGbGFzaE92ZXJsYXkgfSBmcm9tICcuL3ByZXNlbnRhdGlvbi9ub24tcHJlYWN0LWNvbXBvbmVudHMvZmxhc2gnXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbml0KCkge1xuICAvLyBXYWl0IGZvciBsaWNoZXNzIHRvIGxvYWQgdGhlIGJvYXJkXG4gIGF3YWl0IHdhaXRGb3JFbGVtZW50KERvbVNlbGVjdG9yLktFWUJPQVJEX01PVkUpXG5cbiAgLy8gSW5pdGlhbGl6ZSBzZXR0aW5nc1xuICBjb25zdCBzZXR0aW5ncyA9IGNyZWF0ZVNldHRpbmdzU3RvcmUoKVxuICBsb2FkU2V0dGluZ3Moc2V0dGluZ3MpXG4gIHNldHVwQXV0b1NhdmUoc2V0dGluZ3MpXG5cbiAgLy8gQ3JlYXRlIHNoYXJlZCBib2FyZCBjaGFuZ2Ugc2lnbmFsXG4gIGNvbnN0IGJvYXJkQ2hhbmdlZCA9IHNpZ25hbCgwKVxuXG4gIC8vIENyZWF0ZSBET00gc3RhdGVcbiAgY29uc3QgZmxhc2hTdGF0ZSA9IGNyZWF0ZUZsYXNoT3ZlcmxheSgpXG4gIGNvbnN0IGZsYXNoTG9vcFN0YXRlID0gY3JlYXRlRmxhc2hMb29wU3RhdGUoKVxuICBjb25zdCBkaXZpZGVyc1N0YXRlID0gY3JlYXRlRGl2aWRlcnMoKVxuICBjb25zdCBhbm5vdGF0aW9uc1N0YXRlID0gY3JlYXRlQW5ub3RhdGlvbnMoKVxuICBjb25zdCBib2FyZE9ic2VydmVyU3RhdGUgPSBjcmVhdGVCb2FyZE9ic2VydmVyKGJvYXJkQ2hhbmdlZClcblxuICAvLyBTdGFydCBvYnNlcnZlclxuICBzdGFydEJvYXJkT2JzZXJ2ZXIoYm9hcmRPYnNlcnZlclN0YXRlKVxuXG4gIC8vIFNldCB1cCBlZmZlY3RzXG4gIGNvbnN0IGNsZWFudXBEaXZpZGVycyA9IHNldHVwRGl2aWRlcnNFZmZlY3QoZGl2aWRlcnNTdGF0ZSwgc2V0dGluZ3MpXG4gIGNvbnN0IGNsZWFudXBGbGFzaCA9IHNldHVwRmxhc2hFZmZlY3QoZmxhc2hTdGF0ZSwgZmxhc2hMb29wU3RhdGUsIHNldHRpbmdzLCBib2FyZENoYW5nZWQpXG4gIGNvbnN0IGNsZWFudXBCbHVyID0gc2V0dXBCbHVyRWZmZWN0KHNldHRpbmdzKVxuXG4gIC8vIFNldCB1cCBjb21tYW5kc1xuICBzZXR1cEtleWJvYXJkQ29tbWFuZHMoc2V0dGluZ3MsIGFubm90YXRpb25zU3RhdGUpXG5cbiAgLy8gTW91bnQgUHJlYWN0IFVJXG4gIGNvbnN0IG1vdW50UG9pbnQgPSBjcmVhdGVEaXYoKVxuICBjb25zdCBrZXlib2FyZE1vdmUgPSBxdWVyeVNlbGVjdG9yKERvbVNlbGVjdG9yLktFWUJPQVJEX01PVkUpXG4gIGlmIChrZXlib2FyZE1vdmUpIHtcbiAgICBhcHBlbmRDaGlsZChrZXlib2FyZE1vdmUsIG1vdW50UG9pbnQpXG4gIH1cbiAgY3JlYXRlUm9vdChib2FyZENoYW5nZWQsIG1vdW50UG9pbnQsIHNldHRpbmdzKVxuXG4gIC8vIFJldHVybiBjbGVhbnVwIGZ1bmN0aW9uXG4gIHJldHVybiAoKSA9PiB7XG4gICAgY2xlYW51cERpdmlkZXJzKClcbiAgICBjbGVhbnVwRmxhc2goKVxuICAgIGNsZWFudXBCbHVyKClcbiAgICBzdG9wQm9hcmRPYnNlcnZlcihib2FyZE9ic2VydmVyU3RhdGUpXG4gICAgZGVzdHJveUZsYXNoT3ZlcmxheShmbGFzaFN0YXRlKVxuICAgIGRlc3Ryb3lEaXZpZGVycyhkaXZpZGVyc1N0YXRlKVxuICAgIGRlc3Ryb3lBbm5vdGF0aW9ucyhhbm5vdGF0aW9uc1N0YXRlKVxuICAgIHRlYXJkb3duS2V5Ym9hcmRDb21tYW5kcygpXG4gICAgZGVzdHJveVJvb3QobW91bnRQb2ludClcbiAgfVxufVxuIiwiaW1wb3J0IHsgaW5pdCB9IGZyb20gJy4vaW5pdCdcblxuLy8gU3RhcnQgdGhlIGFwcGxpY2F0aW9uXG5pbml0KCkuY2F0Y2goY29uc29sZS5lcnJvcilcbiJdLCJ4X2dvb2dsZV9pZ25vcmVMaXN0IjpbMCwzMSwzMiwzMywzOV0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0NBQUEsSUFBSUEsTUFBRSxPQUFPLElBQUksZ0JBQWdCO0NBQUUsU0FBU0MsTUFBRztFQUFDLElBQUcsRUFBRUMsTUFBRSxJQUFHO0dBQUMsSUFBSSxHQUFFLElBQUUsQ0FBQztHQUFFLENBQUMsV0FBVTtJQUFDLElBQUksSUFBRUM7SUFBRSxNQUFFLEtBQUs7SUFBRSxPQUFNLEtBQUssTUFBSSxHQUFFO0tBQUMsSUFBRyxFQUFFLEVBQUUsTUFBSSxFQUFFLEdBQUUsRUFBRSxFQUFFLElBQUUsRUFBRTtLQUFFLElBQUUsRUFBRTtJQUFDO0dBQUMsR0FBRTtHQUFFLE9BQU0sS0FBSyxNQUFJQyxLQUFFO0lBQUMsSUFBSSxJQUFFQTtJQUFFLE1BQUUsS0FBSztJQUFFO0lBQUksT0FBTSxLQUFLLE1BQUksR0FBRTtLQUFDLElBQUksSUFBRSxFQUFFO0tBQUUsRUFBRSxJQUFFLEtBQUs7S0FBRSxFQUFFLEtBQUc7S0FBRyxJQUFHLEVBQUUsSUFBRSxFQUFFLE1BQUlDLElBQUUsQ0FBQyxHQUFFLElBQUc7TUFBQyxFQUFFLEVBQUU7S0FBQyxTQUFPLEdBQUU7TUFBQyxJQUFHLENBQUMsR0FBRTtPQUFDLElBQUU7T0FBRSxJQUFFLENBQUM7TUFBQztLQUFDO0tBQUMsSUFBRTtJQUFDO0dBQUM7R0FBQyxNQUFFO0dBQUU7R0FBSSxJQUFHLEdBQUUsTUFBTTtFQUFDLE9BQU07Q0FBRztDQUF1RSxJQUFJQyxNQUFFLEtBQUs7Q0FBRSxTQUFTQyxJQUFFLEdBQUU7RUFBQyxJQUFJLElBQUVEO0VBQUUsTUFBRSxLQUFLO0VBQUUsSUFBRztHQUFDLE9BQU8sRUFBRTtFQUFDLFVBQVE7R0FBQyxNQUFFO0VBQUM7Q0FBQztDQUFDLElBQUlFLEtBQUVKLE1BQUUsS0FBSyxHQUFFRixNQUFFLEdBQUVPLE1BQUUsR0FBTUUsTUFBRSxHQUFFUixNQUFFLEtBQUssR0FBRVMsTUFBRTtDQUFFLFNBQVNDLElBQUUsR0FBRTtFQUFDLElBQUcsS0FBSyxNQUFJUCxLQUFFO0dBQUMsSUFBSSxJQUFFLEVBQUU7R0FBRSxJQUFHLEtBQUssTUFBSSxLQUFHLEVBQUUsTUFBSUEsS0FBRTtJQUFDLElBQUU7S0FBQyxHQUFFO0tBQUUsR0FBRTtLQUFFLEdBQUVBLElBQUU7S0FBRSxHQUFFLEtBQUs7S0FBRSxHQUFFQTtLQUFFLEdBQUUsS0FBSztLQUFFLEdBQUUsS0FBSztLQUFFLEdBQUU7SUFBQztJQUFFLElBQUcsS0FBSyxNQUFJQSxJQUFFLEdBQUUsSUFBRSxFQUFFLElBQUU7SUFBRSxJQUFFLElBQUU7SUFBRSxFQUFFLElBQUU7SUFBRSxJQUFHLEtBQUdBLElBQUUsR0FBRSxFQUFFLEVBQUUsQ0FBQztJQUFFLE9BQU87R0FBQyxPQUFNLElBQUcsT0FBSyxFQUFFLEdBQUU7SUFBQyxFQUFFLElBQUU7SUFBRSxJQUFHLEtBQUssTUFBSSxFQUFFLEdBQUU7S0FBQyxFQUFFLEVBQUUsSUFBRSxFQUFFO0tBQUUsSUFBRyxLQUFLLE1BQUksRUFBRSxHQUFFLEVBQUUsRUFBRSxJQUFFLEVBQUU7S0FBRSxFQUFFLElBQUVBLElBQUU7S0FBRSxFQUFFLElBQUUsS0FBSztLQUFFLElBQUUsRUFBRSxJQUFFO0tBQUUsSUFBRSxJQUFFO0lBQUM7SUFBQyxPQUFPO0dBQUM7RUFBQztDQUFDO0NBQUMsU0FBU1EsSUFBRSxHQUFFLEdBQUU7RUFBQyxLQUFLLElBQUU7RUFBRSxLQUFLLElBQUU7RUFBRSxLQUFLLElBQUUsS0FBSztFQUFFLEtBQUssSUFBRSxLQUFLO0VBQUUsS0FBSyxJQUFFO0VBQUUsS0FBSyxJQUFFLFFBQU0sSUFBRSxLQUFLLElBQUUsRUFBRTtFQUFRLEtBQUssSUFBRSxRQUFNLElBQUUsS0FBSyxJQUFFLEVBQUU7RUFBVSxLQUFLLE9BQUssUUFBTSxJQUFFLEtBQUssSUFBRSxFQUFFO0NBQUk7Q0FBQyxJQUFFLFVBQVUsUUFBTWQ7Q0FBRSxJQUFFLFVBQVUsSUFBRSxXQUFVO0VBQUMsT0FBTSxDQUFDO0NBQUM7Q0FBRSxJQUFFLFVBQVUsSUFBRSxTQUFTLEdBQUU7RUFBQyxJQUFJLElBQUUsTUFBSyxJQUFFLEtBQUs7RUFBRSxJQUFHLE1BQUksS0FBRyxLQUFLLE1BQUksRUFBRSxHQUFFO0dBQUMsRUFBRSxJQUFFO0dBQUUsS0FBSyxJQUFFO0dBQUUsSUFBRyxLQUFLLE1BQUksR0FBRSxFQUFFLElBQUU7UUFBTyxJQUFFLFdBQVU7SUFBQyxJQUFJO0lBQUUsU0FBTyxJQUFFLEVBQUUsTUFBSSxFQUFFLEtBQUssQ0FBQztHQUFDLENBQUM7RUFBQztDQUFDO0NBQUUsSUFBRSxVQUFVLElBQUUsU0FBUyxHQUFFO0VBQUMsSUFBSSxJQUFFO0VBQUssSUFBRyxLQUFLLE1BQUksS0FBSyxHQUFFO0dBQUMsSUFBSSxJQUFFLEVBQUUsR0FBRSxJQUFFLEVBQUU7R0FBRSxJQUFHLEtBQUssTUFBSSxHQUFFO0lBQUMsRUFBRSxJQUFFO0lBQUUsRUFBRSxJQUFFLEtBQUs7R0FBQztHQUFDLElBQUcsS0FBSyxNQUFJLEdBQUU7SUFBQyxFQUFFLElBQUU7SUFBRSxFQUFFLElBQUUsS0FBSztHQUFDO0dBQUMsSUFBRyxNQUFJLEtBQUssR0FBRTtJQUFDLEtBQUssSUFBRTtJQUFFLElBQUcsS0FBSyxNQUFJLEdBQUUsSUFBRSxXQUFVO0tBQUMsSUFBSTtLQUFFLFNBQU8sSUFBRSxFQUFFLE1BQUksRUFBRSxLQUFLLENBQUM7SUFBQyxDQUFDO0dBQUM7RUFBQztDQUFDO0NBQUUsSUFBRSxVQUFVLFlBQVUsU0FBUyxHQUFFO0VBQUMsSUFBSSxJQUFFO0VBQUssT0FBT2UsSUFBRSxXQUFVO0dBQUMsSUFBSSxJQUFFLEVBQUUsT0FBTSxJQUFFVDtHQUFFLE1BQUUsS0FBSztHQUFFLElBQUc7SUFBQyxFQUFFLENBQUM7R0FBQyxVQUFRO0lBQUMsTUFBRTtHQUFDO0VBQUMsR0FBRSxFQUFDLE1BQUssTUFBSyxDQUFDO0NBQUM7Q0FBRSxJQUFFLFVBQVUsVUFBUSxXQUFVO0VBQUMsT0FBTyxLQUFLO0NBQUs7Q0FBRSxJQUFFLFVBQVUsV0FBUyxXQUFVO0VBQUMsT0FBTyxLQUFLLFFBQU07Q0FBRTtDQUFFLElBQUUsVUFBVSxTQUFPLFdBQVU7RUFBQyxPQUFPLEtBQUs7Q0FBSztDQUFFLElBQUUsVUFBVSxPQUFLLFdBQVU7RUFBQyxJQUFJLElBQUU7RUFBSyxPQUFPQyxJQUFFLFdBQVU7R0FBQyxPQUFPLEVBQUU7RUFBSyxDQUFDO0NBQUM7Q0FBRSxPQUFPLGVBQWVPLElBQUUsV0FBVSxTQUFRO0VBQUMsS0FBSSxXQUFVO0dBQUMsSUFBSSxJQUFFRCxJQUFFLElBQUk7R0FBRSxJQUFHLEtBQUssTUFBSSxHQUFFLEVBQUUsSUFBRSxLQUFLO0dBQUUsT0FBTyxLQUFLO0VBQUM7RUFBRSxLQUFJLFNBQVMsR0FBRTtHQUFDLElBQUcsTUFBSSxLQUFLLEdBQUU7SUFBQyxJQUFHSixNQUFFLEtBQUksTUFBTSxJQUFJLE1BQU0sZ0JBQWdCO0lBQUUsQ0FBQyxTQUFTLEdBQUU7S0FBQyxJQUFHLE1BQUlQLE9BQUcsTUFBSU87VUFBSyxFQUFFLE1BQUlFLEtBQUU7T0FBQyxFQUFFLElBQUVBO09BQUUsTUFBRTtRQUFDLEdBQUU7UUFBRSxHQUFFLEVBQUU7UUFBRSxHQUFFLEVBQUU7UUFBRSxHQUFFUjtPQUFDO01BQUM7O0lBQUMsR0FBRSxJQUFJO0lBQUUsS0FBSyxJQUFFO0lBQUUsS0FBSztJQUFJO0lBQUk7SUFBSSxJQUFHO0tBQUMsS0FBSSxJQUFJLElBQUUsS0FBSyxHQUFFLEtBQUssTUFBSSxHQUFFLElBQUUsRUFBRSxHQUFFLEVBQUUsRUFBRSxFQUFFO0lBQUMsVUFBUTtLQUFDLElBQUU7SUFBQztHQUFDO0VBQUM7Q0FBQyxDQUFDO0NBQUUsU0FBU2EsSUFBRSxHQUFFLEdBQUU7RUFBQyxPQUFPLElBQUlGLElBQUUsR0FBRSxDQUFDO0NBQUM7Q0FBQyxTQUFTVCxJQUFFLEdBQUU7RUFBQyxLQUFJLElBQUksSUFBRSxFQUFFLEdBQUUsS0FBSyxNQUFJLEdBQUUsSUFBRSxFQUFFLEdBQUUsSUFBRyxFQUFFLEVBQUUsTUFBSSxFQUFFLEtBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxLQUFHLEVBQUUsRUFBRSxNQUFJLEVBQUUsR0FBRSxPQUFNLENBQUM7RUFBRSxPQUFNLENBQUM7Q0FBQztDQUFDLFNBQVNZLElBQUUsR0FBRTtFQUFDLEtBQUksSUFBSSxJQUFFLEVBQUUsR0FBRSxLQUFLLE1BQUksR0FBRSxJQUFFLEVBQUUsR0FBRTtHQUFDLElBQUksSUFBRSxFQUFFLEVBQUU7R0FBRSxJQUFHLEtBQUssTUFBSSxHQUFFLEVBQUUsSUFBRTtHQUFFLEVBQUUsRUFBRSxJQUFFO0dBQUUsRUFBRSxJQUFFO0dBQUcsSUFBRyxLQUFLLE1BQUksRUFBRSxHQUFFO0lBQUMsRUFBRSxJQUFFO0lBQUU7R0FBSztFQUFDO0NBQUM7Q0FBQyxTQUFTQyxJQUFFLEdBQUU7RUFBQyxJQUFJLElBQUUsRUFBRSxHQUFFLElBQUUsS0FBSztFQUFFLE9BQU0sS0FBSyxNQUFJLEdBQUU7R0FBQyxJQUFJLElBQUUsRUFBRTtHQUFFLElBQUcsT0FBSyxFQUFFLEdBQUU7SUFBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQUUsSUFBRyxLQUFLLE1BQUksR0FBRSxFQUFFLElBQUUsRUFBRTtJQUFFLElBQUcsS0FBSyxNQUFJLEVBQUUsR0FBRSxFQUFFLEVBQUUsSUFBRTtHQUFDLE9BQU0sSUFBRTtHQUFFLEVBQUUsRUFBRSxJQUFFLEVBQUU7R0FBRSxJQUFHLEtBQUssTUFBSSxFQUFFLEdBQUUsRUFBRSxJQUFFLEtBQUs7R0FBRSxJQUFFO0VBQUM7RUFBQyxFQUFFLElBQUU7Q0FBQztDQUFDLFNBQVNDLElBQUUsR0FBRSxHQUFFO0VBQUMsSUFBRSxLQUFLLE1BQUssS0FBSyxDQUFDO0VBQUUsS0FBSyxJQUFFO0VBQUUsS0FBSyxJQUFFLEtBQUs7RUFBRSxLQUFLLElBQUVQLE1BQUU7RUFBRSxLQUFLLElBQUU7RUFBRSxLQUFLLElBQUUsUUFBTSxJQUFFLEtBQUssSUFBRSxFQUFFO0VBQVEsS0FBSyxJQUFFLFFBQU0sSUFBRSxLQUFLLElBQUUsRUFBRTtFQUFVLEtBQUssT0FBSyxRQUFNLElBQUUsS0FBSyxJQUFFLEVBQUU7Q0FBSTtDQUFDLElBQUUsWUFBVSxJQUFJRSxJQUFBQTtDQUFFLElBQUUsVUFBVSxJQUFFLFdBQVU7RUFBQyxLQUFLLEtBQUc7RUFBRyxJQUFHLElBQUUsS0FBSyxHQUFFLE9BQU0sQ0FBQztFQUFFLElBQUcsT0FBSyxLQUFHLEtBQUssSUFBRyxPQUFNLENBQUM7RUFBRSxLQUFLLEtBQUc7RUFBRyxJQUFHLEtBQUssTUFBSUYsS0FBRSxPQUFNLENBQUM7RUFBRSxLQUFLLElBQUVBO0VBQUUsS0FBSyxLQUFHO0VBQUUsSUFBRyxLQUFLLElBQUUsS0FBRyxDQUFDUCxJQUFFLElBQUksR0FBRTtHQUFDLEtBQUssS0FBRztHQUFHLE9BQU0sQ0FBQztFQUFDO0VBQUMsSUFBSSxJQUFFQztFQUFFLElBQUc7R0FBQyxJQUFFLElBQUk7R0FBRSxNQUFFO0dBQUssSUFBSSxJQUFFLEtBQUssRUFBRTtHQUFFLElBQUcsS0FBRyxLQUFLLEtBQUcsS0FBSyxNQUFJLEtBQUcsTUFBSSxLQUFLLEdBQUU7SUFBQyxLQUFLLElBQUU7SUFBRSxLQUFLLEtBQUc7SUFBSSxLQUFLO0dBQUc7RUFBQyxTQUFPLEdBQUU7R0FBQyxLQUFLLElBQUU7R0FBRSxLQUFLLEtBQUc7R0FBRyxLQUFLO0VBQUc7RUFBQyxNQUFFO0VBQUUsSUFBRSxJQUFJO0VBQUUsS0FBSyxLQUFHO0VBQUcsT0FBTSxDQUFDO0NBQUM7Q0FBRSxJQUFFLFVBQVUsSUFBRSxTQUFTLEdBQUU7RUFBQyxJQUFHLEtBQUssTUFBSSxLQUFLLEdBQUU7R0FBQyxLQUFLLEtBQUc7R0FBRyxLQUFJLElBQUksSUFBRSxLQUFLLEdBQUUsS0FBSyxNQUFJLEdBQUUsSUFBRSxFQUFFLEdBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztFQUFDO0VBQUMsSUFBRSxVQUFVLEVBQUUsS0FBSyxNQUFLLENBQUM7Q0FBQztDQUFFLElBQUUsVUFBVSxJQUFFLFNBQVMsR0FBRTtFQUFDLElBQUcsS0FBSyxNQUFJLEtBQUssR0FBRTtHQUFDLElBQUUsVUFBVSxFQUFFLEtBQUssTUFBSyxDQUFDO0dBQUUsSUFBRyxLQUFLLE1BQUksS0FBSyxHQUFFO0lBQUMsS0FBSyxLQUFHO0lBQUksS0FBSSxJQUFJLElB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QUFFLEVBQUUsSUFBSSxPQUFLLFFBQU0sRUFBRSxLQUFJLE9BQU8sRUFBRTtFQUFJLE9BQU0sY0FBWSxPQUFPLEVBQUUsT0FBSyxFQUFFLENBQUMsSUFBRTtDQUFJO0NBQUMsU0FBUyxFQUFFLEdBQUU7RUFBQyxJQUFHLEVBQUUsT0FBSyxFQUFFLEtBQUk7R0FBQyxJQUFJLElBQUUsRUFBRSxLQUFJLElBQUUsRUFBRSxLQUFJLElBQUUsQ0FBQyxHQUFFLElBQUUsQ0FBQyxHQUFFLElBQUVILElBQUUsQ0FBQyxHQUFFLENBQUM7R0FBRSxFQUFFLE1BQUksRUFBRSxNQUFJLEdBQUVoQixJQUFFLFNBQU9BLElBQUUsTUFBTSxDQUFDLEdBQUUsRUFBRSxFQUFFLEtBQUksR0FBRSxHQUFFLEVBQUUsS0FBSSxFQUFFLElBQUksY0FBYSxLQUFHLEVBQUUsTUFBSSxDQUFDLENBQUMsSUFBRSxNQUFLLEdBQUUsUUFBTSxJQUFFLEVBQUUsQ0FBQyxJQUFFLEdBQUUsQ0FBQyxFQUFFLEtBQUcsRUFBRSxNQUFLLENBQUMsR0FBRSxFQUFFLE1BQUksRUFBRSxLQUFJLEVBQUUsR0FBRyxJQUFJLEVBQUUsT0FBSyxHQUFFLEVBQUUsR0FBRSxHQUFFLENBQUMsR0FBRSxFQUFFLE1BQUksRUFBRSxLQUFHLE1BQUssRUFBRSxPQUFLLEtBQUcsRUFBRSxDQUFDO0VBQUM7Q0FBQztDQUFDLFNBQVMsRUFBRSxHQUFFO0VBQUMsSUFBRyxTQUFPLElBQUUsRUFBRSxPQUFLLFFBQU0sRUFBRSxLQUFJLE9BQU8sRUFBRSxNQUFJLEVBQUUsSUFBSSxPQUFLLE1BQUssRUFBRSxJQUFJLEtBQUssU0FBUyxHQUFFO0dBQUMsSUFBRyxRQUFNLEtBQUcsUUFBTSxFQUFFLEtBQUksT0FBTyxFQUFFLE1BQUksRUFBRSxJQUFJLE9BQUssRUFBRTtFQUFHLENBQUMsR0FBRSxFQUFFLENBQUM7Q0FBQztDQUFDLFNBQVNvQixJQUFFLEdBQUU7RUFBQyxDQUFDLENBQUMsRUFBRSxRQUFNLEVBQUUsTUFBSSxDQUFDLE1BQUlqQixJQUFFLEtBQUssQ0FBQyxLQUFHLENBQUMsRUFBRSxTQUFPQyxPQUFHSixJQUFFLHdCQUFzQixNQUFFQSxJQUFFLHNCQUFvQkssS0FBRyxDQUFDO0NBQUM7Q0FBQyxTQUFTLElBQUc7RUFBQyxJQUFHO0dBQUMsS0FBSSxJQUFJLEdBQUUsSUFBRSxHQUFFRixJQUFFLFNBQVEsSUFBRSxTQUFPLEtBQUdBLElBQUUsS0FBS0csR0FBQyxHQUFFLElBQUVILElBQUUsTUFBTSxHQUFFLElBQUVBLElBQUUsUUFBTyxFQUFFLENBQUM7RUFBQyxVQUFRO0dBQUMsSUFBRSxTQUFPLEVBQUUsTUFBSTtFQUFDO0NBQUM7Q0FBQyxTQUFTLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0VBQUMsSUFBSSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLElBQUUsS0FBRyxFQUFFLE9BQUtZLEtBQUUsSUFBRSxFQUFFO0VBQU8sS0FBSSxJQUFFTSxJQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsS0FBSSxTQUFPLElBQUUsRUFBRSxJQUFJLFFBQU0sSUFBRSxNQUFJLEVBQUUsT0FBSyxFQUFFLEVBQUUsUUFBTVAsS0FBRSxFQUFFLE1BQUksR0FBRSxJQUFFLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxLQUFJLEVBQUUsT0FBSyxFQUFFLE9BQUssRUFBRSxRQUFNLEVBQUUsT0FBSyxFQUFFLEVBQUUsS0FBSSxNQUFLLENBQUMsR0FBRSxFQUFFLEtBQUssRUFBRSxLQUFJLEVBQUUsT0FBSyxHQUFFLENBQUMsSUFBRyxRQUFNLEtBQUcsUUFBTSxNQUFJLElBQUUsS0FBSSxJQUFFLENBQUMsRUFBRSxJQUFFLEVBQUUsU0FBTyxFQUFFLFFBQU0sRUFBRSxPQUFLLElBQUVRLElBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxHQUFFLEtBQUcsRUFBRSxRQUFNLEVBQUUsTUFBSSxTQUFPLGNBQVksT0FBTyxFQUFFLFFBQU0sS0FBSyxNQUFJLElBQUUsSUFBRSxJQUFFLE1BQUksSUFBRSxFQUFFLGNBQWEsRUFBRSxPQUFLO0VBQUksT0FBTyxFQUFFLE1BQUksR0FBRTtDQUFDO0NBQUMsU0FBU0QsSUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7RUFBQyxJQUFJLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxJQUFFLEVBQUUsUUFBTyxJQUFFLEdBQUUsSUFBRTtFQUFFLEtBQUksRUFBRSxNQUFJLElBQUksTUFBTSxDQUFDLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxLQUFJLFNBQU8sSUFBRSxFQUFFLE9BQUssYUFBVyxPQUFPLEtBQUcsY0FBWSxPQUFPLEtBQUcsWUFBVSxPQUFPLEtBQUcsWUFBVSxPQUFPLEtBQUcsWUFBVSxPQUFPLEtBQUcsRUFBRSxlQUFhLFNBQU8sSUFBRSxFQUFFLElBQUksS0FBR0gsSUFBRSxNQUFLLEdBQUUsTUFBSyxNQUFLLElBQUksSUFBRSxFQUFFLENBQUMsSUFBRSxJQUFFLEVBQUUsSUFBSSxLQUFHQSxJQUFFLEdBQUUsRUFBQyxVQUFTLEVBQUMsR0FBRSxNQUFLLE1BQUssSUFBSSxJQUFFLEtBQUssTUFBSSxFQUFFLGVBQWEsRUFBRSxNQUFJLElBQUUsSUFBRSxFQUFFLElBQUksS0FBR0EsSUFBRSxFQUFFLE1BQUssRUFBRSxPQUFNLEVBQUUsS0FBSSxFQUFFLE1BQUksRUFBRSxNQUFJLE1BQUssRUFBRSxHQUFHLElBQUUsRUFBRSxJQUFJLEtBQUcsR0FBRSxJQUFFLElBQUUsR0FBRSxFQUFFLEtBQUcsR0FBRSxFQUFFLE1BQUksRUFBRSxNQUFJLEdBQUUsSUFBRSxNQUFLLE9BQUssSUFBRSxFQUFFLE1BQUksRUFBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLE9BQUssTUFBSyxJQUFFLEVBQUUsUUFBTSxFQUFFLE9BQUssS0FBSSxRQUFNLEtBQUcsUUFBTSxFQUFFLE9BQUssTUFBSSxNQUFJLElBQUUsSUFBRSxNQUFJLElBQUUsS0FBRyxNQUFLLGNBQVksT0FBTyxFQUFFLFNBQU8sRUFBRSxPQUFLLE1BQUksS0FBRyxNQUFJLEtBQUcsSUFBRSxJQUFFLE1BQUksS0FBRyxJQUFFLElBQUUsT0FBSyxJQUFFLElBQUUsTUFBSSxLQUFJLEVBQUUsT0FBSyxPQUFLLEVBQUUsSUFBSSxLQUFHO0VBQUssSUFBRyxHQUFFLEtBQUksSUFBRSxHQUFFLElBQUUsR0FBRSxLQUFJLFNBQU8sSUFBRSxFQUFFLE9BQUssTUFBSSxJQUFFLEVBQUUsU0FBTyxFQUFFLE9BQUssTUFBSSxJQUFFLEVBQUUsQ0FBQyxJQUFHLEVBQUUsR0FBRSxDQUFDO0VBQUcsT0FBTztDQUFDO0NBQUMsU0FBU0ksSUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0VBQUMsSUFBSSxHQUFFO0VBQUUsSUFBRyxjQUFZLE9BQU8sRUFBRSxNQUFLO0dBQUMsS0FBSSxJQUFFLEVBQUUsS0FBSSxJQUFFLEdBQUUsS0FBRyxJQUFFLEVBQUUsUUFBTyxLQUFJLEVBQUUsT0FBSyxFQUFFLEdBQUcsS0FBRyxHQUFFLElBQUVBLElBQUUsRUFBRSxJQUFHLEdBQUUsR0FBRSxDQUFDO0dBQUcsT0FBTztFQUFDO0VBQUMsRUFBRSxPQUFLLE1BQUksTUFBSSxLQUFHLEVBQUUsUUFBTSxDQUFDLEVBQUUsZUFBYSxJQUFFLEVBQUUsQ0FBQyxJQUFHLEVBQUUsYUFBYSxFQUFFLEtBQUksS0FBRyxJQUFJLElBQUcsSUFBRSxFQUFFO0VBQUs7R0FBRyxJQUFFLEtBQUcsRUFBRTtTQUFrQixRQUFNLEtBQUcsS0FBRyxFQUFFO0VBQVUsT0FBTztDQUFDO0NBQTZHLFNBQVMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0VBQUMsSUFBSSxHQUFFLEdBQUUsR0FBRSxJQUFFLEVBQUUsS0FBSSxJQUFFLEVBQUUsTUFBSyxJQUFFLEVBQUUsSUFBRyxJQUFFLFFBQU0sS0FBRyxNQUFJLElBQUUsRUFBRTtFQUFLLElBQUcsU0FBTyxLQUFHLFFBQU0sS0FBRyxLQUFHLEtBQUcsRUFBRSxPQUFLLEtBQUcsRUFBRSxNQUFLLE9BQU87RUFBRSxJQUFHLEtBQUcsSUFBRSxJQUFFO1FBQU8sSUFBRSxJQUFFLEdBQUUsSUFBRSxJQUFFLEdBQUUsS0FBRyxLQUFHLElBQUUsRUFBRSxTQUFRLElBQUcsU0FBTyxJQUFFLEVBQUUsSUFBRSxLQUFHLElBQUUsTUFBSSxTQUFPLE1BQUksSUFBRSxFQUFFLFFBQU0sS0FBRyxFQUFFLE9BQUssS0FBRyxFQUFFLE1BQUssT0FBTztFQUFBO0VBQUUsT0FBTTtDQUFFO0NBQUMsU0FBU0MsSUFBRSxHQUFFLEdBQUUsR0FBRTtFQUFDLE9BQUssRUFBRSxLQUFHLEVBQUUsWUFBWSxHQUFFLFFBQU0sSUFBRSxLQUFHLENBQUMsSUFBRSxFQUFFLEtBQUcsUUFBTSxJQUFFLEtBQUcsWUFBVSxPQUFPLEtBQUcsRUFBRSxLQUFLLENBQUMsSUFBRSxJQUFFLElBQUU7Q0FBSTtDQUFDLFNBQVMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7RUFBQyxJQUFJLEdBQUU7RUFBRSxHQUFFLElBQUcsV0FBUyxHQUFFLElBQUcsWUFBVSxPQUFPLEdBQUUsRUFBRSxNQUFNLFVBQVE7T0FBTTtHQUFDLElBQUcsWUFBVSxPQUFPLE1BQUksRUFBRSxNQUFNLFVBQVEsSUFBRSxLQUFJLEdBQUUsS0FBSSxLQUFLLEdBQUUsS0FBRyxLQUFLLEtBQUdBLElBQUUsRUFBRSxPQUFNLEdBQUUsRUFBRTtHQUFFLElBQUcsR0FBRSxLQUFJLEtBQUssR0FBRSxLQUFHLEVBQUUsTUFBSSxFQUFFLE1BQUlBLElBQUUsRUFBRSxPQUFNLEdBQUUsRUFBRSxFQUFFO0VBQUM7T0FBTSxJQUFHLE9BQUssRUFBRSxNQUFJLE9BQUssRUFBRSxJQUFHLElBQUUsTUFBSSxJQUFFLEVBQUUsUUFBUWIsS0FBRSxJQUFJLElBQUcsSUFBRSxFQUFFLFlBQVksR0FBRSxJQUFFLEtBQUssS0FBRyxnQkFBYyxLQUFHLGVBQWEsSUFBRSxFQUFFLE1BQU0sQ0FBQyxJQUFFLEVBQUUsTUFBTSxDQUFDLEdBQUUsRUFBRSxNQUFJLEVBQUUsSUFB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SUFBQyxLQUFJLElBQUUsRUFBRSxRQUFPLE1BQUssRUFBRSxFQUFFLEVBQUU7SUFBRSxJQUFFLENBQUM7R0FBQztRQUFNLEVBQUUsTUFBSSxFQUFFLEtBQUksRUFBRSxNQUFJLEVBQUUsS0FBSSxFQUFFLFFBQU1RLElBQUUsQ0FBQztHQUFFLElBQUUsSUFBSSxHQUFFLEdBQUUsQ0FBQztFQUFDO09BQU0sUUFBTSxLQUFHLEVBQUUsT0FBSyxFQUFFLE9BQUssRUFBRSxNQUFJLEVBQUUsS0FBSSxFQUFFLE1BQUksRUFBRSxPQUFLLElBQUUsRUFBRSxNQUFJLEVBQUUsRUFBRSxLQUFJLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztFQUFFLFFBQU8sSUFBRXhCLElBQUUsV0FBUyxFQUFFLENBQUMsR0FBRSxNQUFJLEVBQUUsTUFBSSxLQUFLLElBQUU7Q0FBQztDQUFDLFNBQVN3QixJQUFFLEdBQUU7RUFBQyxNQUFJLEVBQUUsUUFBTSxFQUFFLElBQUksTUFBSSxDQUFDLElBQUcsRUFBRSxPQUFLLEVBQUUsSUFBSSxLQUFLQSxHQUFDO0NBQUU7Q0FBQyxTQUFTLEVBQUUsR0FBRSxHQUFFLEdBQUU7RUFBQyxLQUFJLElBQUksSUFBRSxHQUFFLElBQUUsRUFBRSxRQUFPLEtBQUksRUFBRSxFQUFFLElBQUcsRUFBRSxFQUFFLElBQUcsRUFBRSxFQUFFLEVBQUU7RUFBRSxJQUFFLE9BQUt4QixJQUFFLElBQUksR0FBRSxDQUFDLEdBQUUsRUFBRSxLQUFLLFNBQVMsR0FBRTtHQUFDLElBQUc7SUFBQyxJQUFFLEVBQUUsS0FBSSxFQUFFLE1BQUksQ0FBQyxHQUFFLEVBQUUsS0FBSyxTQUFTLEdBQUU7S0FBQyxFQUFFLEtBQUssQ0FBQztJQUFDLENBQUM7R0FBQyxTQUFPLEdBQUU7SUFBQyxJQUFFLElBQUksR0FBRSxFQUFFLEdBQUc7R0FBQztFQUFDLENBQUM7Q0FBQztDQUFDLFNBQVMsRUFBRSxHQUFFO0VBQUMsT0FBTSxZQUFVLE9BQU8sS0FBRyxRQUFNLEtBQUcsRUFBRSxNQUFJLElB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QUcsS0FBRyxFQUFFLE1BQUksRUFBRSxHQUFFLEdBQUUsR0FBRSxFQUFFLElBQUcsQ0FBQztFQUFFO0VBQUMsT0FBTztDQUFDO0NBQUMsU0FBUyxFQUFFLEdBQUUsR0FBRSxHQUFFO0VBQUMsSUFBRztHQUFDLElBQUcsY0FBWSxPQUFPLEdBQUU7SUFBQyxJQUFJLElBQUUsY0FBWSxPQUFPLEVBQUU7SUFBSSxLQUFHLEVBQUUsSUFBSSxHQUFFLEtBQUcsUUFBTSxNQUFJLEVBQUUsTUFBSSxFQUFFLENBQUM7R0FBRSxPQUFNLEVBQUUsVUFBUTtFQUFDLFNBQU8sR0FBRTtHQUFDLElBQUUsSUFBSSxHQUFFLENBQUM7RUFBQztDQUFDO0NBQUMsU0FBUyxFQUFFLEdBQUUsR0FBRSxHQUFFO0VBQUMsSUFBSSxHQUFFO0VBQUUsSUFBR0EsSUFBRSxXQUFTQSxJQUFFLFFBQVEsQ0FBQyxJQUFHLElBQUUsRUFBRSxTQUFPLEVBQUUsV0FBUyxFQUFFLFdBQVMsRUFBRSxPQUFLLEVBQUUsR0FBRSxNQUFLLENBQUMsSUFBRyxTQUFPLElBQUUsRUFBRSxNQUFLO0dBQUMsSUFBRyxFQUFFLHNCQUFxQixJQUFHO0lBQUMsRUFBRSxxQkFBcUI7R0FBQyxTQUFPLEdBQUU7SUFBQyxJQUFFLElBQUksR0FBRSxDQUFDO0dBQUM7R0FBQyxFQUFFLE9BQUssRUFBRSxNQUFJO0VBQUk7RUFBQyxJQUFHLElBQUUsRUFBRSxLQUFJLEtBQUksSUFBRSxHQUFFLElBQUUsRUFBRSxRQUFPLEtBQUksRUFBRSxNQUFJLEVBQUUsRUFBRSxJQUFHLEdBQUUsS0FBRyxjQUFZLE9BQU8sRUFBRSxJQUFJO0VBQUUsS0FBRyxFQUFFLEVBQUUsR0FBRyxHQUFFLEVBQUUsTUFBSSxFQUFFLEtBQUcsRUFBRSxNQUFJLEtBQUs7Q0FBQztDQUFDLFNBQVMsRUFBRSxHQUFFLEdBQUUsR0FBRTtFQUFDLE9BQU8sS0FBSyxZQUFZLEdBQUUsQ0FBQztDQUFDO0NBQUMsU0FBUyxFQUFFLEdBQUUsR0FBRSxHQUFFO0VBQUMsSUFBSSxHQUFFLEdBQUUsR0FBRTtF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QUFDLE9BQU0sRUFBQyxTQUFRLEVBQUM7RUFBQyxHQUFFLENBQUMsQ0FBQztDQUFDO0NBQXNOLFNBQVMsRUFBRSxHQUFFLEdBQUU7RUFBQyxJQUFJLElBQUVNLElBQUUsS0FBSSxDQUFDO0VBQUUsT0FBTyxFQUFFLEVBQUUsS0FBSSxDQUFDLE1BQUksRUFBRSxLQUFHLEVBQUUsR0FBRSxFQUFFLE1BQUksR0FBRSxFQUFFLE1BQUksSUFBRyxFQUFFO0NBQUU7Q0FBc0QsU0FBUyxFQUFFLEdBQUU7RUFBQyxJQUFJLElBQUUsRUFBRSxRQUFRLEVBQUUsTUFBSyxJQUFFQSxJQUFFLEtBQUksQ0FBQztFQUFFLE9BQU8sRUFBRSxJQUFFLEdBQUUsS0FBUyxFQUFFLE9BQUssRUFBRSxLQUFHLENBQUMsR0FBRSxFQUFFLElBQUksQ0FBQyxJQUFHLEVBQUUsTUFBTSxTQUFPLEVBQUU7Q0FBRTtDQUE2WCxTQUFTLElBQUc7RUFBQyxLQUFJLElBQUksR0FBRSxJQUFFTCxJQUFFLE1BQU0sSUFBRztHQUFDLElBQUksSUFBRSxFQUFFO0dBQUksSUFBRyxFQUFFLE9BQUssR0FBRSxJQUFHO0lBQUMsRUFBRSxJQUFJLEtBQUssQ0FBQyxHQUFFLEVBQUUsSUFBSSxLQUFLLENBQUMsR0FBRSxFQUFFLE1BQUksQ0FBQztHQUFDLFNBQU8sR0FBRTtJQUFDLEVBQUUsTUFBSSxDQUFDLEdBQUUsRUFBRSxJQUFJLEdBQUUsRUFBRSxHQUFHO0dBQUM7RUFBQztDQUFDO0NBQUMsRUFBRSxNQUFJLFNBQVMsR0FBRTtFQUFDLElBQUUsTUFBSyxLQUFHLEVBQUUsQ0FBQztDQUFDLEdBQUUsRUFBRSxLQUFHLFNBQVMsR0FBRSxHQUFFO0VBQUMsS0FBRyxFQUFFLE9BQUssRUFBRSxJQUFJLFFBQU0sRUFBRSxNQUFJLEVBQUUsSUFBSSxNQUFLSSxPQUFHQSxJQUFFLEdBQUUsQ0FBQztDQUFDLEdBQUUsRUFBRSxNQUFJLFNBQVMsR0FBRTtFQUFDLEtBQUcsRUFBRSxDQUFDLEdBQUUsSUFBRTtFQUFFLElBQUksS0FBRyxJQUFFLEVBQUUsS0FBSztFQUFJLE1BQUlQLFFBQUksS0FBRyxFQUFFLE1BQUksQ0FBQyxHQUFFLEVBQUUsTUFBSSxDQUFDLEdBQUUsRUFBRSxHQUFHLEtBQUssU0FBUyxHQUFFO0dBQUMsRUFBRSxRQUFNLEVBQUUsS0FBRyxFQUFFLE1BQUssRUFBRSxJQUFFLEVBQUUsTUFBSSxLQUFLO0VBQUMsQ0FBQyxNQUFJLEVBQUUsSUFBSSxLQUFLLENBQUMsR0FBRSxFQUFFLElBQUksS0FBSyxDQUFDLEdBQUUsRUFBRSxNQUFJLENBQUMsR0FBRSxJQUFFLEtBQUksTUFBRTtDQUFDLEdBQUUsRUFBRSxTQUFPLFNBQVMsR0FBRTtFQUFDLE9BQUdLLElBQUUsQ0FBQztFQUFFLElBQUksSUFBRSxFQUFFO0VBQUksS0FBRyxFQUFFLFFBQU0sRUFBRSxJQUFJLElBQUksV0FBUyxNQUFJRixJQUFFLEtBQUssQ0FBQyxLQUFHRixRQUFJLEVBQUUsMkJBQXlCLE1BQUUsRUFBRSwwQkFBd0IsR0FBRyxDQUFDLElBQUcsRUFBRSxJQUFJLEdBQUcsS0FBSyxTQUFTLEdBQUU7R0FBQyxFQUFFLE1BQUksRUFBRSxNQUFJLEVBQUUsSUFBRyxFQUFFLElBQUUsS0FBSztFQUFDLENBQUMsSUFBRyxNQUFFLElBQUU7Q0FBSSxHQUFFLEVBQUUsTUFBSSxTQUFTLEdBQUUsR0FBRTtFQUFDLEVBQUUsS0FBSyxTQUFTLEdBQUU7R0FBQyxJQUFHO0lBQUMsRUFBRSxJQUFJLEtBQUssQ0FBQyxHQUFFLEVBQUUsTUFBSSxFQUFFLElBQUksT0FBTyxTQUFTLEdBQUU7S0FBQyxPQUFNLENBQUMsRUFBRSxNQUFJLEVBQUUsQ0FBQztJQUFDLENBQUM7R0FBQyxTQUFPLEdBQUU7SUFBQyxFQUFFLEtBQUssU0FBUyxHQUFFO0tBQUMsRUFBRSxRQUFNLEVBQUUsTUFBSSxDQUFDO0lBQUUsQ0FBQyxHQUFFLElBQUUsQ0FBQyxHQUFFLEVBQUUsSUFBSSxHQUFFLEVBQUUsR0FBRztHQUFDO0VBQUMsQ0FBQyxHQUFFSyxPQUFHQSxJQUFFLEdBQUUsQ0FBQztDQUFDLEdBQUUsRUFBRSxVQUFRLFNBQVMsR0FBRTtFQUFDLEtBQUcsRUFBRSxDQUFDO0VBQUUsSUFBSSxHQUFFLElBQUUsRUFBRTtFQUFJLEtBQUcsRUFBRSxRQUFNLEVBQUUsSUFBSSxHQUFHLEtBQUssU0FBUyxHQUFFO0dBQUMsSUFBRztJQUFDLEVBQUUsQ0FBQztHQUFDLFNBQU8sR0FBRTtJQUFDLElBQUU7R0FBQztFQUFDLENBQUMsR0FBRSxFQUFFLE1BQUksS0FBSyxHQUFFLEtBQUcsRUFBRSxJQUFJLEdBQUUsRUFBRSxHQUFHO0NBQUU7Q0FBRSxJQUFJLElBQUUsY0FBWSxPQUFPO0NBQXNCLFNBQVMsRUFBRSxHQUFFO0VBQUMsSUFBSSxHQUFFLElBQUUsV0FBVTtHQUFDLGFBQWEsQ0FBQyxHQUFFLEtBQUcscUJBQXFCLENBQUMsR0FBRSxXQUFXLENBQUM7RUFBQyxHQUFFLElBQUUsV0FBVyxHQUFFLEVBQUU7RUFBRSxNQUFJLElBQUUsc0JBQXNCLENBQUM7Q0FBRTtDQUFDLFNBQVMsRUFBRSxHQUFFO0VBQUMsSUFBSSxJQUFFLEdBQUUsSUFBRSxFQUFFO0VBQUksY0FBWSxPQUFPLE1BQUksRUFBRSxNQUFJLEtBQUssR0FBRSxFQUFFLElBQUcsSUFBRTtDQUFDO0NBQUMsU0FBUyxFQUFFLEdBQUU7RUFBQyxJQUFJLElBQUU7RUFBRSxFQUFFLE1BQUksRUFBRSxHQUFHLEdBQUUsSUFBRTtDQUFDO0NBQUMsU0FBUyxFQUFFLEdBQUUsR0FBRTtFQUFDLE9BQU0sQ0FBQyxLQUFHLEVBQUUsV0FBUyxFQUFFLFVBQVEsRUFBRSxLQUFLLFNBQVMsR0FBRSxHQUFFO0dBQUMsT0FBTyxNQUFJLEVBQUU7RUFBRSxDQUFDO0NBQUM7OztDQ0F2K0YsSUFBMEUsSUFBRTtDQUFJLE1BQU07Q0FBUSxTQUFTLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7RUFBQyxNQUFJLElBQUUsQ0FBQztFQUFHLElBQUksR0FBRSxHQUFFLElBQUU7RUFBRSxJQUFHLFNBQVEsR0FBRSxLQUFJLEtBQUssSUFBRSxDQUFDLEdBQUUsR0FB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QUUsU0FBUyxDQUFDLENBQUM7SUFBQyxPQUFNLEVBQUUsS0FBSyxPQUFLO0dBQUM7R0FBRSxPQUFPQyxJQUFFLFdBQVU7SUFBQyxJQUFJLElBQUUsRUFBRSxNQUFNO0lBQU0sT0FBTyxNQUFJLElBQUUsSUFBRSxDQUFDLE1BQUksSUFBRSxLQUFHLEtBQUc7R0FBRSxDQUFDO0VBQUMsR0FBRSxDQUFDLENBQUM7RUFBRSxPQUFPLEVBQUU7Q0FBSztDQUFDLEVBQUUsY0FBWTtDQUFNLE9BQU8saUJBQWlCQyxJQUFFLFdBQVU7RUFBQyxhQUFZO0dBQUMsY0FBYSxDQUFDO0dBQUUsT0FBTSxLQUFLO0VBQUM7RUFBRSxNQUFLO0dBQUMsY0FBYSxDQUFDO0dBQUUsT0FBTTtFQUFDO0VBQUUsT0FBTTtHQUFDLGNBQWEsQ0FBQztHQUFFLEtBQUksV0FBVTtJQUFDLE9BQU0sRUFBQyxNQUFLLEtBQUk7R0FBQztFQUFDO0VBQUUsS0FBSTtHQUFDLGNBQWEsQ0FBQztHQUFFLE9BQU07RUFBQztDQUFDLENBQUM7Q0FBRSxFQUFFLE9BQU0sU0FBUyxHQUFFLEdBQUU7RUFBQyxJQUFHLFlBQVUsT0FBTyxFQUFFLE1BQUs7R0FBQyxJQUFJLEdBQUUsSUFBRSxFQUFFO0dBQU0sS0FBSSxJQUFJLEtBQUssR0FBRSxJQUFHLGVBQWEsR0FBRTtJQUFDLElBQUksSUFBRSxFQUFFO0lBQUcsSUFBRyxhQUFhQSxLQUFFO0tBQUMsSUFBRyxDQUFDLEdBQUUsRUFBRSxPQUFLLElBQUUsQ0FBQztLQUFFLEVBQUUsS0FBRztLQUFFLEVBQUUsS0FBRyxFQUFFLEtBQUs7SUFBQztHQUFDO0VBQUM7RUFBQyxFQUFFLENBQUM7Q0FBQyxDQUFDO0NBQUUsRUFBRSxPQUFNLFNBQVMsR0FBRSxHQUFFO0VBQUMsRUFBRSxDQUFDO0VBQUUsRUFBRTtFQUFFLElBQUksR0FBRSxJQUFFLEVBQUU7RUFBSSxJQUFHLEdBQUU7R0FBQyxFQUFFLFFBQU07R0FBRyxJQUFHLEtBQUssT0FBSyxJQUFFLEVBQUUsT0FBTSxFQUFFLE9BQUssSUFBRSxTQUFTLEdBQUU7SUFBQyxJQUFJO0lBQUUsSUFBRSxXQUFVO0tBQUMsSUFBRTtJQUFJLENBQUM7SUFBRSxFQUFFLElBQUUsV0FBVTtLQUFDLEVBQUUsUUFBTTtLQUFFLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFBQztJQUFFLE9BQU87R0FBQyxFQUFFO0VBQUM7RUFBQyxJQUFFO0VBQUUsRUFBRSxDQUFDO0NBQUMsQ0FBQztDQUFFLEVBQUUsT0FBTSxTQUFTLEdBQUUsR0FBRSxHQUFFLEdBQUU7RUFBQyxFQUFFO0VBQUUsSUFBRSxLQUFLO0VBQUUsRUFBRSxHQUFFLEdBQUUsQ0FBQztDQUFDLENBQUM7Q0FBRSxFQUFFLFVBQVMsU0FBUyxHQUFFLEdBQUU7RUFBQyxFQUFFO0VBQUUsSUFBRSxLQUFLO0VBQUUsSUFBSTtFQUFFLElBQUcsWUFBVSxPQUFPLEVBQUUsU0FBTyxJQUFFLEVBQUUsTUFBSztHQUFDLElBQUksSUFBRSxFQUFFLE1BQUssSUFBRSxFQUFFO0dBQU0sSUFBRyxHQUFFO0lBQUMsSUFBSSxJQUFFLEVBQUU7SUFBRSxJQUFHLEdBQUUsS0FBSSxJQUFJLEtBQUssR0FBRTtLQUFDLElBQUksSUFBRSxFQUFFO0tBQUcsSUFBRyxLQUFLLE1BQUksS0FBRyxFQUFFLEtBQUssSUFBRztNQUFDLEVBQUUsRUFBRTtNQUFFLEVBQUUsS0FBRyxLQUFLO0tBQUM7SUFBQztTQUFNLEVBQUUsSUFBRSxJQUFFLENBQUM7SUFBRSxLQUFJLElBQUksS0FBSyxHQUFFO0tBQUMsSUFBSSxJQUFFLEVBQUUsSUFBRyxJQUFFLEVBQUU7S0FBRyxJQUFHLEtBQUssTUFBSSxHQUFFO01BQUMsSUFBRSxFQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7TUFBRSxFQUFFLEtBQUc7S0FBQyxPQUFNLEVBQUUsRUFBRSxHQUFFLENBQUM7SUFBQztHQUFDO0VBQUM7RUFBQyxFQUFFLENBQUM7Q0FBQyxDQUFDO0NBQUUsU0FBUyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7RUFBQyxJQUFJLElBQUUsS0FBSyxLQUFHLEtBQUssTUFBSSxFQUFFLGlCQUFnQixJQUFFQyxJQUFFLENBQUM7RUFBRSxPQUFNO0dBQUMsR0FBRSxTQUFTLEdBQUUsR0FBRTtJQUFDLEVBQUUsUUFBTTtJQUFFLElBQUU7R0FBQztHQUFFLEdBQUVDLElBQUUsV0FBVTtJQUFDLElBQUksSUFBRSxFQUFFLE1BQU07SUFBTSxJQUFHLEVBQUUsT0FBSyxHQUFFO0tBQUMsRUFBRSxLQUFHO0tBQUUsSUFBRyxHQUFFLEVBQUUsS0FBRztVQUFPLElBQUcsR0FBRSxFQUFFLGFBQWEsR0FBRSxDQUFDO1VBQU8sRUFBRSxnQkFBZ0IsQ0FBQztJQUFDO0dBQUMsQ0FBQztFQUFDO0NBQUM7Q0FBQyxFQUFFLFdBQVUsU0FBUyxHQUFFLEdBQUU7RUFBQyxJQUFHLFlBQVUsT0FBTyxFQUFFLE1BQUs7R0FBQyxJQUFJLElBQUUsRUFBRTtHQUFJLElBQUcsR0FBRTtJQUFDLElBQUksSUFBRSxFQUFFO0lBQUUsSUFBRyxHQUFFO0tBQUMsRUFBRSxJQUFFLEtBQUs7S0FBRSxLQUFJLElBQUksS0FBSyxHQUFFO01BQUMsSUFBSSxJQUFFLEVBQUU7TUFBRyxJQUFHLEdBQUUsRUFBRSxFQUFFO0tBQUM7SUFBQztHQUFDO0VBQUMsT0FBSztHQUFDLElBQUksSUFBRSxFQUFFO0dBQUksSUFBRyxHQUFFO0lBQUMsSUFBSSxJQUFFLEVBQUU7SUFBSyxJQUFHLEdBQUU7S0FBQyxFQUFFLE9BQUssS0FBSztLQUFFLEVBQUUsRUFBRTtJQUFDO0dBQUM7RUFBQztFQUFDLEVBQUUsQ0FBQztDQUFDLENBQUM7Q0FBRSxFQUFFLE9BQU0sU0FBUyxHQUFFLEdBQUUsR0FBRSxHQUFFO0VBQUMsSUFBRyxJQUFFLEtBQUcsTUFBSSxHQUFFLEVBQUUsUUFBTTtFQUFFLEVBQUUsR0FBRSxHQUFFLENBQUM7Q0FBQyxDQUFDO0NBQUUsSUFBRSxVQUFVLHdCQUFzQixTQUFTLEdBQUUsR0FBRTtFQUFDLElBQUcsS0FBSyxLQUFJLE9BQU0sQ0FBQztFQUFFLElBQUksSUFBRSxLQUFLLE1BQUssSUFBRSxLQUFHLEtBQUssTUFBSSxFQUFFO0VBQUUsS0FBSSxJQUFJLEtBQUssR0FBRSxPQUFNLENBQUM7RUFBRSxJQUFHLEtBQUssT0FBSyxhQUFXLE9BQU8sS0FBSyxLQUFHLENBQUMsTUFBSSxLQUFLLEdBQUU7R0FBQyxJQUFHLEVBQUUsS0FBRyxJQUFFLEtBQUssUUFBTSxJQUFFLEtBQUssT0FBTSxPQUFNLENBQUM7R0FBRSxJQUFHLElBQUUsS0FBSyxNQUFLLE9BQU0sQ0FBQztFQUFDLE9BQUs7R0FBQyxJQUFHLEVBQUUsS0FBRyxJQUFFLEtBQUssT0FBTSxPQUFNLENBQUM7R0FBRSxJQUFHLElBQUUsS0FBSyxNQUFLLE9BQU0sQ0FBQztFQUFDO0VBQUMsS0FBSSxJQUFJLEtBQUssR0FBRSxJQUFHLGVBQWEsS0FBRyxFQUFFLE9BQUssS0FBSyxNQUFNLElBQUcsT0FBTSxDQUFDO0VBQUUsS0FBSSxJQUFJLEtBQUssS0FBSyxPQUFNLElBQUcsRUFBRSxLQUFLLElBQUcsT0FBTSxDQUFDO0VBQUUsT0FBTSxDQUFDO0NBQUM7Q0FBRSxTQUFTLFVBQVUsR0FBRTtFQUFDLE9BQU9MLEVBQUUsV0FBVTtHQUFDLE9BQU9JLElBQUUsQ0FBQztFQUFDLEdBQUUsQ0FBQyxDQUFDO0NBQUM7Q0FBQyxTQUFTLFlBQVksR0FBRTtFQUFDLElBQUksSUFBRUUsRUFBRSxDQUFDO0VBQUUsRUFBRSxVQUFRO0VBQUUsRUFBRSxRQUFNO0VBQUUsT0FBT04sRUFBRSxXQUFVO0dBQUMsT0FBT0UsSUFBRSxXQUFVO0lBQUMsT0FBTyxFQUFFLFFBQVE7R0FBQyxDQUFDO0VBQUMsR0FBRSxDQUFDLENBQUM7Q0FBQzs7O0NDUWp5RixJQUFNLGNBQWM7RUFDbEIsUUFBUTtFQUNSLFNBQVM7RUFDVCxRQUFRO0VBQ1IsY0FBYztFQUNkLGlCQUFpQjtFQUNqQixPQUFPO0VBQ1AsUUFBUTtFQUNSLFVBQVU7Q0FDWjtDQUVBLFNBQWdCLGNBQWlCLEVBQUUsT0FBTyxTQUFTLFdBQUE7RUFFakQsTUFBTSxjQUFjLGtCQUFrQixHQUFHLE1BQU0sSUFBSSxRQUFRLE9BQU87RUFFbEUsTUFBTSxlQUFlLE1BQUE7R0FDbkIsRUFBRSxlQUFBO0dBQ0YsRUFBRSxnQkFBQTtHQUtGLFFBQVEsUUFEUyxTQUZJLFFBQVEsUUFBUSxRQUFRLEtBQzFCLElBQWUsS0FBSyxRQUFRO0VBR2pEO0VBR0EsT0FDRSxrQkFBQyxVQUFEO0dBQVEsU0FBUztHQUFhLE1BQUs7R0FBUyxPQUFPO2FBQ2hEO0VBQ0ssQ0FBQTtDQUVaOzs7Q0NoQ0EsSUFBTSxxQkFBcUI7RUFBQztFQUFLO0VBQUs7RUFBSztFQUFLO0VBQUs7O0NBRXJELFNBQWdCLGdCQUFBO0VBQ2QsTUFBTSxXQUFXLFlBQUE7RUFFakIsT0FDRSxrQkFBQyxPQUFELEVBQUEsVUFBQTtHQUNFLGtCQUFDLFdBQUQsRUFBQSxVQUFBO0lBQ0Usa0JBQUMsY0FBRDtLQUNFLE9BQU07S0FDTixlQUFlLG9CQUFvQixjQUFjLElBQUksUUFBQTtJQUN0RCxDQUFBO0lBQ0Qsa0JBQUMsY0FBRDtLQUNFLE9BQU07S0FDTixlQUFlLG9CQUFvQixjQUFjLElBQUksUUFBQTtJQUN0RCxDQUFBO0lBQ0Qsa0JBQUMsY0FBRDtLQUNFLE9BQU07S0FDTixlQUFlLG9CQUFvQixjQUFjLElBQUksUUFBQTtJQUN0RCxDQUFBO0lBQ0Qsa0JBQUMsY0FBRDtLQUNFLE9BQU07S0FDTixlQUFlLG9CQUFvQixjQUFjLElBQUksUUFBQTtJQUN0RCxDQUFBO0tBQ1EsQ0FBQTtHQUVYLGtCQUFDLFdBQUQsRUFBQSxVQUFBO0lBQ0Usa0JBQUMsY0FBRDtLQUNFLE9BQU07S0FDTixlQUFlLG9CQUFvQixjQUFjLEtBQUssUUFBQTtJQUN2RCxDQUFBO0lBQ0Qsa0JBQUMsY0FBRDtLQUNFLE9BQU07S0FDTixlQUFlLG9CQUFvQixjQUFjLE9BQU8sUUFBQTtJQUN6RCxDQUFBO0lBQ0Qsa0JBQUMsY0FBRDtLQUNFLE9BQU07S0FDTixlQUFlLG9CQUFvQixjQUFjLE9BQU8sUUFBQTtJQUN6RCxDQUFBO0tBQ1EsQ0FBQTtHQUVYLGtCQUFDLFdBQUQsRUFBQSxVQUFBLENBQ0Usa0JBQUMsZUFBRDtJQUFlLE9BQU07SUFBVSxTQUFTLFNBQVM7SUFBVyxTQUFTO0dBQXFCLENBQUEsR0FDMUYsa0JBQUMsY0FBRDtJQUNFLE9BQU07SUFDTixlQUFlLG9CQUFvQixjQUFjLE1BQU0sUUFBQTtHQUN4RCxDQUFBLENBQUEsRUFDUSxDQUFBO0lBQ1IsQ0FBQTtDQUVUOzs7Q0NuQ0EsSUFBTSxpQkFBaUIsQ0FBQyxPQUFPLElBQUE7Q0FFL0IsU0FBZ0IsYUFBYSxFQUFFLGdCQUFBO0VBQzdCLE1BQU0sV0FBVyxZQUFBO0VBR2pCLGFBQWE7RUFFYixPQUNFLGtCQUFDLE9BQUQsRUFBQSxVQUFBO0dBRUUsa0JBQUMsZUFBRCxDQUFnQixDQUFBO0dBR2hCLGtCQUFDLFdBQUQsRUFBQSxVQUNFLGtCQUFDLGVBQUQ7SUFDRSxPQUFNO0lBQ04sU0FBUyxTQUFTO0lBQ2xCLFNBQVM7R0FDVixDQUFBLEVBQ1EsQ0FBQTtHQUdYLGtCQUFDLFdBQUQsRUFBQSxVQUNFLGtCQUFDLGNBQUQ7SUFDRSxPQUFNO0lBQ04sZUFBQTtLQUVFLFFBQVEsSUFBSSx3QkFBQTtJQUNkO0dBQ0QsQ0FBQSxFQUNRLENBQUE7R0FHWCxrQkFBQyxXQUFELEVBQUEsVUFBQSxDQUNFLGtCQUFDLGVBQUQ7SUFDRSxPQUFNO0lBQ04sU0FBUyxTQUFTO0lBQ2xCLFNBQVM7R0FDVixDQUFBLEdBQ0Qsa0JBQUMsZUFBRDtJQUNFLE9BQU07SUFDTixTQUFTLFNBQVM7SUFDbEIsU0FBUztHQUNWLENBQUEsQ0FBQSxFQUNRLENBQUE7R0FHWCxrQkFBQyxxQkFBRDtJQUFxQixXQUFXLFNBQVMsbUJBQW1CO2NBQTVELENBQ0Usa0JBQUMsV0FBRCxFQUFBLFVBQUE7S0FDRSxrQkFBQyxlQUFEO01BQ0UsT0FBTTtNQUNOLFNBQVMsU0FBUztNQUNsQixTQUFTO0tBQ1YsQ0FBQTtLQUNELGtCQUFDLGVBQUQ7TUFBZSxPQUFNO01BQVcsU0FBUyxTQUFTO01BQVUsU0FBUztLQUFtQixDQUFBO0tBQ3hGLGtCQUFDLGVBQUQ7TUFDRSxPQUFNO01BQ04sU0FBUyxTQUFTO01BQ2xCLFNBQVM7S0FDVixDQUFBO01BQ1EsQ0FBQSxHQUdYLGtCQUFDLHFCQUFEO0tBQXFCLFdBQVcsU0FBUyxvQkFBb0I7ZUFBN0QsQ0FDRSxrQkFBQyxXQUFELEVBQUEsVUFBQTtNQUNFLGtCQUFDLGVBQUQ7T0FDRSxPQUFNO09BQ04sU0FBUyxTQUFTO09BQ2xCLFNBQVM7TUFDVixDQUFBO01BQ0Qsa0JBQUMsZUFBRDtPQUFlLE9BQU07T0FBTyxTQUFTLFNBQVM7T0FBTSxTQUFTO01BQWUsQ0FBQTtNQUM1RSxrQkFBQyxlQUFEO09BQ0UsT0FBTTtPQUNOLFNBQVMsU0FBUztPQUNsQixTQUFTO01BQ1YsQ0FBQTtPQUNRLENBQUEsR0FHWCxrQkFBQyxxQkFBRDtNQUFxQixXQUFXLFNBQVMsY0FBYyxVQUFVO2dCQUMvRCxrQkFBQyxXQUFELEVBQUEsVUFDRSxrQkFBQyxlQUFEO09BQ0UsT0FBTTtPQUNOLFNBQVMsU0FBUztPQUNsQixTQUFTO01BQ1YsQ0FBQSxFQUNRLENBQUE7S0FDUSxDQUFBLENBQUE7OztHQUt6QixrQkFBQyxXQUFELEVBQUEsVUFDRSxrQkFBQyxlQUFEO0lBQ0UsT0FBTTtJQUNOLFNBQVMsU0FBUztJQUNsQixTQUFTO0dBQ1YsQ0FBQSxFQUNRLENBQUE7R0FHWCxrQkFBQyxxQkFBRDtJQUFxQixXQUFXLFNBQVMsaUJBQWlCO2NBQ3hELGtCQUFDLFdBQUQsRUFBQSxVQUFBLENBQ0Usa0JBQUMsZUFBRDtLQUNFLE9BQU07S0FDTixTQUFTLFNBQVM7S0FDbEIsU0FBUztJQUNWLENBQUEsR0FDRCxrQkFBQyxlQUFEO0tBQ0UsT0FBTTtLQUNOLFNBQVMsU0FBUztLQUNsQixTQUFTO0lBQ1YsQ0FBQSxDQUFBLEVBQ1EsQ0FBQTtHQUNRLENBQUE7SUFDbEIsQ0FBQTtDQUVUOzs7Q0N0SUEsU0FBZ0IsV0FDZCxjQUNBLFlBQ0EsVUFBQTtFQUVBLEVBQ0Usa0JBQUMsa0JBQUQ7R0FBNEI7YUFDMUIsa0JBQUMsY0FBRCxFQUE0QixhQUFlLENBQUE7RUFDM0IsQ0FBQSxHQUNsQixVQUFBO0NBRUo7Q0FFQSxTQUFnQixZQUFZLFlBQUE7RUFDMUIsRUFBTyxNQUFNLFVBQUE7Q0FDZjs7O0NDS0EsZUFBc0IsT0FBQTtFQUVwQixNQUFNLGVBQWUsWUFBWSxhQUFhO0VBRzlDLE1BQU0sV0FBVyxvQkFBQTtFQUNqQixhQUFhLFFBQUE7RUFDYixjQUFjLFFBQUE7RUFHZCxNQUFNLGVBQWUsSUFBTyxDQUFBO0VBRzVCLE1BQU0sYUFBYSxtQkFBQTtFQUNuQixNQUFNLGlCQUFpQixxQkFBQTtFQUN2QixNQUFNLGdCQUFnQixlQUFBO0VBQ3RCLE1BQU0sbUJBQW1CLGtCQUFBO0VBQ3pCLE1BQU0scUJBQXFCLG9CQUFvQixZQUFBO0VBRy9DLG1CQUFtQixrQkFBQTtFQUduQixNQUFNLGtCQUFrQixvQkFBb0IsZUFBZSxRQUFBO0VBQzNELE1BQU0sZUFBZSxpQkFBaUIsWUFBWSxnQkFBZ0IsVUFBVSxZQUFBO0VBQzVFLE1BQU0sY0FBYyxnQkFBZ0IsUUFBQTtFQUdwQyxzQkFBc0IsVUFBVSxnQkFBQTtFQUdoQyxNQUFNLGFBQWEsVUFBQTtFQUNuQixNQUFNLGVBQWUsY0FBYyxZQUFZLGFBQWE7RUFDNUQsSUFBSSxjQUNGLFlBQVksY0FBYyxVQUFBO0VBRTVCLFdBQVcsY0FBYyxZQUFZLFFBQUE7RUFHckMsYUFBQTtHQUNFLGdCQUFBO0dBQ0EsYUFBQTtHQUNBLFlBQUE7R0FDQSxrQkFBa0Isa0JBQUE7R0FDbEIsb0JBQW9CLFVBQUE7R0FDcEIsZ0JBQWdCLGFBQUE7R0FDaEIsbUJBQW1CLGdCQUFBO0dBQ25CLHlCQUFBO0dBQ0EsWUFBWSxVQUFBO0VBQ2Q7Q0FDRjs7O0NDekVBLEtBQUEsRUFBTyxNQUFNLFFBQVEsS0FBSyJ9