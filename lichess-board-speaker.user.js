// ==UserScript==
// @name        lichess-board-speaker
// @description Blindfold chess training tool for lichess.org
// @version     4.0.6
// @match       *://lichess.org/*
// @require     https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js
// @grant       none
// @inject-into content
// @updateURL   https://cdn.jsdelivr.net/gh/dylan-chong/lichess-utils@preact-migration/lichess-board-speaker.user.js
// @downloadURL https://cdn.jsdelivr.net/gh/dylan-chong/lichess-utils@preact-migration/lichess-board-speaker.user.js
// ==/UserScript==
(function(three) {
	//#region \0rolldown/runtime.js
	var __create = Object.create;
	var __defProp = Object.defineProperty;
	var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames = Object.getOwnPropertyNames;
	var __getProtoOf = Object.getPrototypeOf;
	var __hasOwnProp = Object.prototype.hasOwnProperty;
	var __copyProps = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
			key = keys[i];
			if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
				get: ((k) => from[k]).bind(null, key),
				enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
			});
		}
		return to;
	};
	var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
		value: mod,
		enumerable: true
	}) : target, mod));
	//#endregion
	three = __toESM(three, 1);
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
	//#region src/domain/chess/blackSegments.ts
	function getBlackedOutQuadrants(mode, counter) {
		switch (mode) {
			case "none": return [];
			case "1/4": return [counter % 4];
			case "1/2": return [
				[0, 1],
				[2, 3],
				[0, 2],
				[1, 3]
			][counter % 4];
			case "3/4": {
				const visible = counter % 4;
				return [
					0,
					1,
					2,
					3
				].filter((q) => q !== visible);
			}
			case "4/4": return [
				0,
				1,
				2,
				3
			];
			default: return [];
		}
	}
	function getTimingMs(timing) {
		switch (timing) {
			case "rotate-10s": return 1e4;
			case "rotate-30s": return 3e4;
			case "rotate-60s": return 6e4;
			case "dont-rotate": return null;
			default: return null;
		}
	}
	//#endregion
	//#region src/platform/dom.ts
	function createDiv() {
		return document.createElement("div");
	}
	function createCanvas() {
		return document.createElement("canvas");
	}
	function createImage() {
		return new Image();
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
	//#region src/platform/three.ts
	function createWebGLRenderer(options) {
		return new three.WebGLRenderer(options);
	}
	function createScene() {
		return new three.Scene();
	}
	function createPerspectiveCamera(fov, aspect, near, far) {
		return new three.PerspectiveCamera(fov, aspect, near, far);
	}
	function createAmbientLight(color, intensity) {
		return new three.AmbientLight(color, intensity);
	}
	function createDirectionalLight(color, intensity) {
		return new three.DirectionalLight(color, intensity);
	}
	//#endregion
	//#region src/presentation/3d/boardPlane.ts
	var LIGHT_COLOR = 15658706;
	var DARK_COLOR = 7771734;
	var BLACK_COLOR = 0;
	function createBoardPlane(blackedOutQuadrants) {
		const boardGroup = new three.Group();
		for (let row = 0; row < 8; row++) for (let col = 0; col < 8; col++) {
			const squareGeom = new three.PlaneGeometry(1, 1);
			const isLight = (row + col) % 2 === 0;
			const isBlackedOut = isSquareInBlackedOutQuadrant(col, row, blackedOutQuadrants);
			let material;
			if (isBlackedOut) material = new three.MeshBasicMaterial({ color: BLACK_COLOR });
			else material = new three.MeshBasicMaterial({ color: isLight ? LIGHT_COLOR : DARK_COLOR });
			const square = new three.Mesh(squareGeom, material);
			square.position.set(col - 3.5, 0, row - 3.5);
			square.rotation.x = -Math.PI / 2;
			boardGroup.add(square);
		}
		return boardGroup;
	}
	function isSquareInBlackedOutQuadrant(col, row, quadrants) {
		if (quadrants.length === 0) return false;
		const isLeft = col < 4;
		const isTop = row < 4;
		let quadrant;
		if (isTop && isLeft) quadrant = 0;
		else if (isTop && !isLeft) quadrant = 1;
		else if (!isTop && isLeft) quadrant = 2;
		else quadrant = 3;
		return quadrants.includes(quadrant);
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
	//#region src/presentation/3d/canvas.ts
	function create3DCanvas() {
		const container = querySelector(DomSelector.CONTAINER);
		const board = querySelector(DomSelector.BOARD);
		if (!container || !board) throw new Error("Container or board not found");
		const boardSize = board.getBoundingClientRect().width;
		const scene = createScene();
		scene.background = null;
		const camera = createPerspectiveCamera(45, 1, .1, 1e3);
		camera.position.set(0, 12, 8);
		camera.up.set(0, 0, -1);
		camera.lookAt(0, 0, 0);
		const renderer = createWebGLRenderer({
			alpha: true,
			antialias: true
		});
		renderer.setSize(boardSize, boardSize);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = three.PCFSoftShadowMap;
		const canvasElement = renderer.domElement;
		canvasElement.style.position = "absolute";
		canvasElement.style.top = "0";
		canvasElement.style.left = "0";
		canvasElement.style.pointerEvents = "none";
		canvasElement.style.zIndex = "100";
		canvasElement.classList.add("userscript-3d-canvas");
		appendChild(container, canvasElement);
		const ambientLight = createAmbientLight(16777215, .6);
		scene.add(ambientLight);
		const directionalLight = createDirectionalLight(16777215, .8);
		directionalLight.position.set(5, 15, 8);
		directionalLight.castShadow = true;
		directionalLight.shadow.mapSize.width = 1024;
		directionalLight.shadow.mapSize.height = 1024;
		scene.add(directionalLight);
		const fillLight = createDirectionalLight(16777215, .3);
		fillLight.position.set(-5, 10, -5);
		scene.add(fillLight);
		return {
			scene,
			camera,
			renderer,
			canvasElement
		};
	}
	function render3D(state) {
		state.renderer.render(state.scene, state.camera);
	}
	function destroy3DCanvas(state) {
		state.canvasElement.remove();
		state.renderer.dispose();
		state.scene.traverse((object) => {
			if (object instanceof three.Mesh) {
				object.geometry.dispose();
				if (object.material instanceof three.Material) object.material.dispose();
				else if (Array.isArray(object.material)) for (const material of object.material) material.dispose();
			}
		});
	}
	//#endregion
	//#region src/domain/chess/boardPosition3d.ts
	function pixelPositionTo3D(pixelX, pixelY, boardSize, isFlipped) {
		const normalizedX = pixelX / boardSize * 8;
		const normalizedY = pixelY / boardSize * 8;
		let x;
		let z;
		if (isFlipped) {
			x = normalizedX - 4;
			z = normalizedY - 4;
		} else {
			x = normalizedX - 4;
			z = 8 - normalizedY - 4;
		}
		return {
			x,
			z
		};
	}
	//#endregion
	//#region src/presentation/3d/geometries.ts
	function createPawnGeometry() {
		const points = [
			new three.Vector2(0, 0),
			new three.Vector2(.35, 0),
			new three.Vector2(.35, .05),
			new three.Vector2(.28, .1),
			new three.Vector2(.15, .35),
			new three.Vector2(.12, .45),
			new three.Vector2(.18, .55),
			new three.Vector2(.18, .6),
			new three.Vector2(.22, .65),
			new three.Vector2(.22, .85),
			new three.Vector2(0, .85)
		];
		return new three.LatheGeometry(points, 24);
	}
	function createRookGeometry() {
		const points = [
			new three.Vector2(0, 0),
			new three.Vector2(.4, 0),
			new three.Vector2(.4, .08),
			new three.Vector2(.32, .12),
			new three.Vector2(.22, .2),
			new three.Vector2(.2, .7),
			new three.Vector2(.28, .75),
			new three.Vector2(.28, .85),
			new three.Vector2(.32, .85),
			new three.Vector2(.32, 1),
			new three.Vector2(0, 1)
		];
		return new three.LatheGeometry(points, 4);
	}
	function createKnightGeometry() {
		const shape = new three.Shape();
		shape.moveTo(-.15, 0);
		shape.lineTo(.35, 0);
		shape.lineTo(.35, .08);
		shape.lineTo(.25, .12);
		shape.lineTo(.15, .18);
		shape.quadraticCurveTo(.08, .35, .1, .5);
		shape.quadraticCurveTo(.15, .65, .25, .75);
		shape.quadraticCurveTo(.35, .85, .38, .95);
		shape.lineTo(.42, 1);
		shape.lineTo(.45, 1.08);
		shape.lineTo(.42, 1.12);
		shape.lineTo(.35, 1.08);
		shape.quadraticCurveTo(.25, 1.02, .18, 1.08);
		shape.lineTo(.22, 1.18);
		shape.lineTo(.18, 1.22);
		shape.lineTo(.1, 1.15);
		shape.quadraticCurveTo(-.05, 1.05, -.15, 1.1);
		shape.quadraticCurveTo(-.25, 1.12, -.32, 1.05);
		shape.lineTo(-.35, .95);
		shape.lineTo(-.3, .88);
		shape.lineTo(-.2, .9);
		shape.quadraticCurveTo(-.1, .85, -.15, .75);
		shape.lineTo(-.25, .7);
		shape.lineTo(-.35, .65);
		shape.lineTo(-.38, .55);
		shape.lineTo(-.32, .5);
		shape.lineTo(-.22, .52);
		shape.quadraticCurveTo(-.12, .48, -.1, .38);
		shape.quadraticCurveTo(-.08, .25, -.15, .15);
		shape.lineTo(-.2, .08);
		shape.lineTo(-.15, 0);
		return new three.ExtrudeGeometry(shape, {
			depth: .22,
			bevelEnabled: true,
			bevelThickness: .04,
			bevelSize: .03,
			bevelSegments: 4
		});
	}
	function createBishopGeometry() {
		const points = [
			new three.Vector2(0, 0),
			new three.Vector2(.38, 0),
			new three.Vector2(.38, .06),
			new three.Vector2(.3, .1),
			new three.Vector2(.18, .25),
			new three.Vector2(.15, .4),
			new three.Vector2(.2, .5),
			new three.Vector2(.2, .55),
			new three.Vector2(.12, .7),
			new three.Vector2(.08, .95),
			new three.Vector2(.15, 1.05),
			new three.Vector2(.1, 1.15),
			new three.Vector2(.05, 1.2),
			new three.Vector2(0, 1.25)
		];
		return new three.LatheGeometry(points, 24);
	}
	function createQueenGeometry() {
		const points = [
			new three.Vector2(0, 0),
			new three.Vector2(.42, 0),
			new three.Vector2(.42, .08),
			new three.Vector2(.34, .12),
			new three.Vector2(.22, .25),
			new three.Vector2(.18, .45),
			new three.Vector2(.24, .55),
			new three.Vector2(.24, .6),
			new three.Vector2(.16, .75),
			new three.Vector2(.14, .95),
			new three.Vector2(.22, 1.05),
			new three.Vector2(.28, 1.15),
			new three.Vector2(.22, 1.25),
			new three.Vector2(.15, 1.3),
			new three.Vector2(.08, 1.35),
			new three.Vector2(0, 1.35)
		];
		return new three.LatheGeometry(points, 8);
	}
	function createKingGeometry() {
		const basePoints = [
			new three.Vector2(0, 0),
			new three.Vector2(.44, 0),
			new three.Vector2(.44, .08),
			new three.Vector2(.36, .12),
			new three.Vector2(.24, .28),
			new three.Vector2(.2, .5),
			new three.Vector2(.26, .6),
			new three.Vector2(.26, .65),
			new three.Vector2(.18, .8),
			new three.Vector2(.16, 1),
			new three.Vector2(.24, 1.1),
			new three.Vector2(.24, 1.2),
			new three.Vector2(.18, 1.25),
			new three.Vector2(.18, 1.3),
			new three.Vector2(0, 1.3)
		];
		return {
			base: new three.LatheGeometry(basePoints, 24),
			crossV: new three.BoxGeometry(.08, .25, .08),
			crossH: new three.BoxGeometry(.2, .08, .08)
		};
	}
	function createCheckerGeometry() {
		return new three.CylinderGeometry(.4, .4, .15, 32);
	}
	//#endregion
	//#region src/presentation/3d/pieceMesh.ts
	function create3DPieceMesh(pieceType, isWhite) {
		const color = isWhite ? 16119260 : 2960685;
		const material = new three.MeshStandardMaterial({
			color,
			roughness: .4,
			metalness: .1
		});
		if (pieceType === "king") {
			const geometries = createKingGeometry();
			const group = new three.Group();
			group.add(new three.Mesh(geometries.base, material));
			const crossV = new three.Mesh(geometries.crossV, material);
			crossV.position.y = 1.42;
			group.add(crossV);
			const crossH = new three.Mesh(geometries.crossH, material);
			crossH.position.y = 1.38;
			group.add(crossH);
			return group;
		}
		let geometry;
		if (pieceType === "pawn") geometry = createPawnGeometry();
		else if (pieceType === "rook") geometry = createRookGeometry();
		else if (pieceType === "knight") geometry = createKnightGeometry();
		else if (pieceType === "bishop") geometry = createBishopGeometry();
		else geometry = createQueenGeometry();
		const mesh = new three.Mesh(geometry, material);
		if (pieceType === "knight") {
			mesh.rotation.y = isWhite ? 0 : Math.PI;
			mesh.position.x = isWhite ? .05 : -.05;
			mesh.position.z = isWhite ? -.11 : .11;
		}
		return mesh;
	}
	function createCheckerPieceMesh(isWhite, whiteColor, blackColor) {
		const color = isWhite ? whiteColor : blackColor;
		const material = new three.MeshBasicMaterial({ color });
		const geometry = createCheckerGeometry();
		const mesh = new three.Mesh(geometry, material);
		mesh.position.y = .075;
		return mesh;
	}
	function loadTextureFromImage(img, material) {
		const canvas = createCanvas();
		canvas.width = 256;
		canvas.height = 256;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		ctx.drawImage(img, 0, 0, 256, 256);
		const texture = new three.Texture(canvas);
		texture.needsUpdate = true;
		material.map = texture;
		material.needsUpdate = true;
	}
	function createIconPieceMesh(pieceType, isWhite) {
		const geometry = new three.PlaneGeometry(1.4, 1.4);
		const material = new three.MeshBasicMaterial({
			transparent: true,
			side: three.DoubleSide,
			depthWrite: false
		});
		const mesh = new three.Mesh(geometry, material);
		mesh.rotation.x = -Math.PI / 2;
		mesh.position.y = .01;
		const url = `https://lichess1.org/assets/piece/cburnett/${isWhite ? "w" : "b"}${pieceType === "knight" ? "N" : pieceType.charAt(0).toUpperCase()}.svg`;
		const img = createImage();
		img.crossOrigin = "anonymous";
		img.onload = () => {
			loadTextureFromImage(img, material);
		};
		img.src = url;
		return mesh;
	}
	function createPieceMesh(pieceType, isWhite, style) {
		switch (style) {
			case "3d": return create3DPieceMesh(pieceType, isWhite);
			case "checker": return createCheckerPieceMesh(isWhite, 15263976, 1710618);
			case "checker-grey": return createCheckerPieceMesh(isWhite, 5263440, 5263440);
			case "blindfold": return null;
			case "icons": return createIconPieceMesh(pieceType, isWhite);
			default: return createIconPieceMesh(pieceType, isWhite);
		}
	}
	//#endregion
	//#region src/presentation/3d/pieceManager.ts
	function createPieceManager() {
		return {
			meshes: [],
			meshMap: /* @__PURE__ */ new Map()
		};
	}
	function updatePieces(canvasState, pieceManagerState, pieceStyle, isFlipped, blackedOutQuadrants) {
		const board = querySelector(DomSelector.BOARD);
		if (!board) return;
		const boardSize = board.getBoundingClientRect().width;
		const squareSize = boardSize / 8;
		const pieceElements = board.querySelectorAll("piece");
		const currentPieceIds = /* @__PURE__ */ new Set();
		for (const pieceEl of pieceElements) {
			const match = pieceEl.className.match(/^(white|black)\s+(king|queen|rook|bishop|knight|pawn)/);
			if (!match) continue;
			if (pieceEl.classList.contains("ghost")) continue;
			const colour = match[1];
			const type = match[2];
			const pixelPos = getPixelPosition(pieceEl);
			if (!pixelPos) continue;
			const pieceId = `${colour}-${type}-${Math.round(pixelPos.x)}-${Math.round(pixelPos.y)}`;
			currentPieceIds.add(pieceId);
			let mesh = pieceManagerState.meshMap.get(pieceId);
			if (!mesh) {
				for (const [key, existingMesh] of pieceManagerState.meshMap.entries()) if (key.startsWith(`${colour}-${type}-`) && !currentPieceIds.has(key)) {
					mesh = existingMesh;
					pieceManagerState.meshMap.delete(key);
					pieceManagerState.meshMap.set(pieceId, mesh);
					break;
				}
			}
			if (!mesh) {
				const newMesh = createPieceMesh(type, colour === "white", pieceStyle);
				if (!newMesh) continue;
				mesh = newMesh;
				const scale = .65;
				mesh.scale.set(scale, scale, scale);
				canvasState.scene.add(mesh);
				pieceManagerState.meshes.push(mesh);
				pieceManagerState.meshMap.set(pieceId, mesh);
			}
			const centerOffset = squareSize / 2;
			const pos3D = pixelPositionTo3D(pixelPos.x + centerOffset, pixelPos.y + centerOffset, boardSize, isFlipped);
			mesh.position.x = pos3D.x;
			mesh.position.z = pos3D.z;
			const col = Math.round(pixelPos.x / squareSize);
			const row = Math.round(pixelPos.y / squareSize);
			mesh.userData.col = col;
			mesh.userData.row = row;
			if (pieceStyle === "icons") mesh.rotation.z = isFlipped ? 0 : Math.PI;
			mesh.visible = !isPositionBlackedOut(col, row, blackedOutQuadrants);
		}
		for (const [key, mesh] of pieceManagerState.meshMap.entries()) if (!currentPieceIds.has(key)) {
			canvasState.scene.remove(mesh);
			disposeMesh(mesh);
			pieceManagerState.meshMap.delete(key);
			const idx = pieceManagerState.meshes.indexOf(mesh);
			if (idx > -1) pieceManagerState.meshes.splice(idx, 1);
		}
	}
	function clearAllPieces(canvasState, pieceManagerState) {
		for (const mesh of pieceManagerState.meshes) {
			canvasState.scene.remove(mesh);
			disposeMesh(mesh);
		}
		pieceManagerState.meshes = [];
		pieceManagerState.meshMap.clear();
	}
	function getPixelPosition(el) {
		const computedTransform = window.getComputedStyle(el).transform;
		if (computedTransform && computedTransform !== "none") {
			const matrixMatch = computedTransform.match(/matrix\(([^)]+)\)/);
			if (matrixMatch) {
				const values = matrixMatch[1].split(",").map((v) => Number.parseFloat(v.trim()));
				return {
					x: values[4],
					y: values[5]
				};
			}
		}
		const translateMatch = el.style.transform.match(/translate\(([\d.]+)px(?:,\s*([\d.]+)px)?\)/);
		if (translateMatch) return {
			x: Number.parseFloat(translateMatch[1]),
			y: Number.parseFloat(translateMatch[2] || "0")
		};
		return null;
	}
	function disposeMesh(obj) {
		if (obj instanceof three.Mesh) {
			obj.geometry?.dispose();
			if (obj.material instanceof three.Material) obj.material.dispose();
		}
		for (const child of obj.children) disposeMesh(child);
	}
	function isPositionBlackedOut(col, row, quadrants) {
		if (quadrants.length === 0) return false;
		const isLeft = col < 4;
		const isTop = row < 4;
		let quadrant;
		if (isTop && isLeft) quadrant = 0;
		else if (isTop && !isLeft) quadrant = 1;
		else if (!isTop && isLeft) quadrant = 2;
		else quadrant = 3;
		return quadrants.includes(quadrant);
	}
	//#endregion
	//#region src/application/handlers/handleBlackSegments.ts
	function createBlackSegmentsState() {
		return {
			counter: 0,
			intervalId: null
		};
	}
	function startBlackSegmentsInterval(segState, customBoardState, settings) {
		stopBlackSegmentsInterval(segState);
		const timingMs = getTimingMs(settings.blackSegmentsTiming.value);
		if (timingMs === null) return;
		segState.intervalId = setInterval(() => {
			segState.counter++;
			applyBlackSegments(segState, customBoardState, settings);
		}, timingMs);
	}
	function stopBlackSegmentsInterval(segState) {
		if (segState.intervalId !== null) {
			clearInterval(segState.intervalId);
			segState.intervalId = null;
		}
	}
	function applyBlackSegments(segState, customBoardState, settings) {
		if (!customBoardState.canvas) return;
		const quadrants = getBlackedOutQuadrants(settings.blackSegments.value, segState.counter);
		const existingBoard = customBoardState.canvas.scene.getObjectByName(customBoardState.boardPlaneName);
		if (existingBoard) customBoardState.canvas.scene.remove(existingBoard);
		const newBoard = createBoardPlane(quadrants);
		newBoard.name = customBoardState.boardPlaneName;
		customBoardState.canvas.scene.add(newBoard);
		const isFlipped = querySelector("coords")?.classList.contains("black") ?? false;
		const style = settings.obfuscationsEnabled.value ? settings.pieceStyle.value : "icons";
		updatePieces(customBoardState.canvas, customBoardState.pieceManager, style, isFlipped, quadrants);
		render3D(customBoardState.canvas);
	}
	//#endregion
	//#region src/application/effects/onBlackSegments.ts
	function setupBlackSegmentsEffect(segState, customBoardState, settings) {
		return j$2(() => {
			const mode = settings.blackSegments.value;
			settings.blackSegmentsTiming.value;
			if (!settings.obfuscationsEnabled.value || mode === "none" || !customBoardState.canvas) {
				stopBlackSegmentsInterval(segState);
				if (customBoardState.canvas) applyBlackSegments(segState, customBoardState, settings);
				return;
			}
			applyBlackSegments(segState, customBoardState, settings);
			startBlackSegmentsInterval(segState, customBoardState, settings);
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
	//#region src/application/handlers/handleCustomBoard.ts
	function createCustomBoardState() {
		return {
			canvas: null,
			pieceManager: createPieceManager(),
			boardPlaneName: "boardPlane"
		};
	}
	function initCustomBoard(state, settings) {
		if (state.canvas) return;
		const board = querySelector(DomSelector.BOARD);
		if (board) {
			board.style.opacity = "0";
			const pieces = board.querySelectorAll("piece");
			for (const piece of pieces) piece.style.visibility = "hidden";
		}
		state.canvas = create3DCanvas();
		const boardPlane = createBoardPlane([]);
		boardPlane.name = state.boardPlaneName;
		state.canvas.scene.add(boardPlane);
		const isFlipped = getIsFlipped();
		const style = getPieceStyle(settings);
		updatePieces(state.canvas, state.pieceManager, style, isFlipped, []);
		render3D(state.canvas);
	}
	function destroyCustomBoard(state) {
		if (!state.canvas) return;
		clearAllPieces(state.canvas, state.pieceManager);
		destroy3DCanvas(state.canvas);
		state.canvas = null;
		const board = querySelector(DomSelector.BOARD);
		if (board) {
			board.style.opacity = "";
			const pieces = board.querySelectorAll("piece");
			for (const piece of pieces) piece.style.visibility = "";
		}
	}
	function refreshPieces(state, settings) {
		if (!state.canvas) return;
		const isFlipped = getIsFlipped();
		const style = getPieceStyle(settings);
		updatePieces(state.canvas, state.pieceManager, style, isFlipped, []);
		render3D(state.canvas);
	}
	function getIsFlipped() {
		return querySelector(DomSelector.COORDS)?.classList.contains("black") ?? false;
	}
	function getPieceStyle(settings) {
		if (settings.obfuscationsEnabled.value) return settings.pieceStyle.value;
		return settings.pieceStyle.value === "3d" ? "3d" : "icons";
	}
	//#endregion
	//#region src/application/effects/onCustomBoard.ts
	function setupCustomBoardEffect(state, settings, boardChanged) {
		const cleanupEnabled = j$2(() => {
			if (settings.customBoardEnabled.value) initCustomBoard(state, settings);
			else destroyCustomBoard(state);
		});
		const cleanupBoardChange = j$2(() => {
			boardChanged.value;
			if (settings.customBoardEnabled.value && state.canvas) refreshPieces(state, settings);
		});
		return () => {
			cleanupEnabled();
			cleanupBoardChange();
			destroyCustomBoard(state);
		};
	}
	//#endregion
	//#region src/presentation/non-preact-components/dividers.ts
	function createDividers() {
		const svg = createSvgElement("svg");
		svg.setAttribute("class", CssClass.USERSCRIPT_DIVIDERS);
		svg.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    display: none;
    z-index: 10;
  `;
		const vLine = createSvgElement("line");
		vLine.setAttribute("stroke", "black");
		vLine.setAttribute("stroke-width", "3");
		const hLine = createSvgElement("line");
		hLine.setAttribute("stroke", "black");
		hLine.setAttribute("stroke-width", "3");
		appendChild(svg, vLine);
		appendChild(svg, hLine);
		const board = querySelector(DomSelector.BOARD);
		if (board) appendChild(board, svg);
		return {
			svg,
			vLine,
			hLine
		};
	}
	function showDividers(state) {
		resizeDividers(state);
		state.svg.style.display = CssDisplay.BLOCK;
	}
	function hideDividers(state) {
		state.svg.style.display = CssDisplay.NONE;
	}
	function resizeDividers(state) {
		const board = querySelector(DomSelector.BOARD);
		if (!board) return;
		if (!board.contains(state.svg)) appendChild(board, state.svg);
		const size = board.getBoundingClientRect().width;
		state.svg.setAttribute("width", size.toString());
		state.svg.setAttribute("height", size.toString());
		state.vLine.setAttribute("x1", (size / 2).toString());
		state.vLine.setAttribute("y1", "0");
		state.vLine.setAttribute("x2", (size / 2).toString());
		state.vLine.setAttribute("y2", size.toString());
		state.hLine.setAttribute("x1", "0");
		state.hLine.setAttribute("y1", (size / 2).toString());
		state.hLine.setAttribute("x2", size.toString());
		state.hLine.setAttribute("y2", (size / 2).toString());
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
	var RESIZE_INTERVAL_MS = 2e3;
	function setupDividersEffect(state, settings, boardChanged) {
		let intervalId = null;
		const cleanup = j$2(() => {
			boardChanged.value;
			const enabled = settings.dividersEnabled.value;
			if (intervalId !== null) {
				clearInterval(intervalId);
				intervalId = null;
			}
			if (enabled) {
				resizeDividers(state);
				intervalId = setInterval(() => resizeDividers(state), RESIZE_INTERVAL_MS);
			}
			updateDividers(state, settings);
		});
		return () => {
			if (intervalId !== null) clearInterval(intervalId);
			cleanup();
		};
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
	//#region src/presentation/3d/camera.ts
	function updateCameraAngle(state, angleDegrees, isFlipped) {
		const angleRad = angleDegrees * Math.PI / 180;
		const distance = 15;
		const y = Math.cos(angleRad) * distance;
		const z = Math.sin(angleRad) * distance;
		const zDirection = isFlipped ? 1 : -1;
		state.camera.position.set(0, y, z * zDirection);
		state.camera.up.set(0, 0, -1 * zDirection);
		state.camera.lookAt(0, 0, 0);
	}
	//#endregion
	//#region src/platform/animationFrame.ts
	function requestAnimation(callback) {
		return requestAnimationFrame(callback);
	}
	function cancelAnimation(id) {
		cancelAnimationFrame(id);
	}
	//#endregion
	//#region src/presentation/3d/hoverAnimation.ts
	var OSCILLATION_ANGLE = 1.95;
	var OSCILLATION_PERIOD_MS = 2e3;
	var OSCILLATION_Y_ANGLE = 1.95;
	var OSCILLATION_Y_PERIOD_MS = 2500;
	function createHoverAnimationState() {
		return {
			animationId: null,
			startTime: null
		};
	}
	function startHoverAnimation(hoverState, canvasState, getParams) {
		if (hoverState.animationId !== null) return;
		hoverState.startTime = performance.now();
		const animate = (timestamp) => {
			const params = getParams();
			if (params.scale === 0) {
				stopHoverAnimation(hoverState);
				return;
			}
			const elapsed = timestamp - (hoverState.startTime ?? timestamp);
			const { baseAngle, scale, isFlipped } = params;
			const angleRad = (baseAngle + Math.sin(elapsed / OSCILLATION_PERIOD_MS) * OSCILLATION_ANGLE * scale) * Math.PI / 180;
			const distance = 15;
			const y = Math.cos(angleRad) * distance;
			const z = Math.sin(angleRad) * distance;
			const zDirection = isFlipped ? 1 : -1;
			canvasState.camera.position.set(0, y, z * zDirection);
			const oscillationZRad = Math.sin(elapsed / OSCILLATION_Y_PERIOD_MS) * OSCILLATION_Y_ANGLE * scale * Math.PI / 180;
			canvasState.camera.position.x = Math.sin(oscillationZRad) * distance * .1 * scale;
			canvasState.camera.up.set(0, 0, -1 * zDirection);
			canvasState.camera.lookAt(0, 0, 0);
			render3D(canvasState);
			hoverState.animationId = requestAnimation(animate);
		};
		hoverState.animationId = requestAnimation(animate);
	}
	function stopHoverAnimation(hoverState) {
		if (hoverState.animationId !== null) {
			cancelAnimation(hoverState.animationId);
			hoverState.animationId = null;
		}
		hoverState.startTime = null;
	}
	//#endregion
	//#region src/application/effects/onHoverMode.ts
	var HOVER_SCALES = {
		off: 0,
		small: 1,
		large: 2,
		super: 3
	};
	function setupHoverModeEffect(customBoardState, hoverState, settings) {
		return j$2(() => {
			const scale = HOVER_SCALES[settings.hoverMode.value] ?? 0;
			if (!customBoardState.canvas) {
				stopHoverAnimation(hoverState);
				return;
			}
			if (scale > 0) {
				if (settings.parallax.value === 0) settings.parallax.value = 40;
				startHoverAnimation(hoverState, customBoardState.canvas, () => {
					const isFlipped = querySelector("coords")?.classList.contains("black") ?? false;
					return {
						baseAngle: settings.parallax.value,
						scale,
						isFlipped
					};
				});
			} else {
				stopHoverAnimation(hoverState);
				const isFlipped = querySelector("coords")?.classList.contains("black") ?? false;
				updateCameraAngle(customBoardState.canvas, settings.parallax.value, isFlipped);
				render3D(customBoardState.canvas);
			}
		});
	}
	//#endregion
	//#region src/application/effects/onParallax.ts
	function setupParallaxEffect(customBoardState, settings) {
		return j$2(() => {
			const angle = settings.parallax.value;
			if (!customBoardState.canvas) return;
			const isFlipped = querySelector(DomSelector.COORDS)?.classList.contains("black") ?? false;
			updateCameraAngle(customBoardState.canvas, angle, isFlipped);
			render3D(customBoardState.canvas);
		});
	}
	//#endregion
	//#region src/application/effects/onPieceStyle.ts
	function setupPieceStyleEffect(customBoardState, settings) {
		return j$2(() => {
			settings.pieceStyle.value;
			settings.obfuscationsEnabled.value;
			if (!customBoardState.canvas) return;
			const isFlipped = querySelector(DomSelector.COORDS)?.classList.contains("black") ?? false;
			const style = settings.obfuscationsEnabled.value ? settings.pieceStyle.value : settings.pieceStyle.value === "3d" ? "3d" : "icons";
			clearAllPieces(customBoardState.canvas, customBoardState.pieceManager);
			updatePieces(customBoardState.canvas, customBoardState.pieceManager, style, isFlipped, []);
			render3D(customBoardState.canvas);
		});
	}
	//#endregion
	//#region src/application/handlers/handleAnnotate.ts
	function handleAnnotate() {
		const input = querySelector(DomSelector.KEYBOARD_INPUT);
		if (input) {
			input.focus();
			input.value = "-";
			input.dispatchEvent(new Event("input", { bubbles: true }));
		}
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
	//#region src/presentation/3d/drawings3d.ts
	var DRAWING_COLOR = 16739179;
	function createDrawings3DState() {
		return { objects: [] };
	}
	function squareTo3DCoords(square) {
		const fileIndex = square.charCodeAt(0) - "a".charCodeAt(0);
		const rankIndex = Number.parseInt(square[1]) - 1;
		return {
			x: 3.5 - fileIndex,
			z: rankIndex - 3.5
		};
	}
	function create3DCircle(x, z) {
		const geometry = new three.TorusGeometry(.35, .06, 8, 32);
		const material = new three.MeshStandardMaterial({
			color: DRAWING_COLOR,
			roughness: .5,
			metalness: .1
		});
		const torus = new three.Mesh(geometry, material);
		torus.position.set(x, .05, z);
		torus.rotation.x = -Math.PI / 2;
		return torus;
	}
	function create3DArrow(x1, z1, x2, z2) {
		const group = new three.Group();
		const dx = x2 - x1;
		const dz = z2 - z1;
		const length = Math.sqrt(dx * dx + dz * dz);
		const angle = Math.atan2(-dx, -dz);
		const arrowHeadLength = .45;
		const shaftLength = length - arrowHeadLength;
		const shaftGeometry = new three.CylinderGeometry(.07, .07, shaftLength, 8);
		const shaftMaterial = new three.MeshStandardMaterial({
			color: DRAWING_COLOR,
			roughness: .5,
			metalness: .1
		});
		const shaft = new three.Mesh(shaftGeometry, shaftMaterial);
		shaft.position.set(0, 0, -shaftLength / 2);
		shaft.rotation.x = Math.PI / 2;
		group.add(shaft);
		const headGeometry = new three.ConeGeometry(.22, arrowHeadLength, 8);
		const headMaterial = new three.MeshStandardMaterial({
			color: DRAWING_COLOR,
			roughness: .5,
			metalness: .1
		});
		const head = new three.Mesh(headGeometry, headMaterial);
		head.position.set(0, 0, -(shaftLength + arrowHeadLength / 2));
		head.rotation.x = -Math.PI / 2;
		group.add(head);
		group.position.set(x1, .08, z1);
		group.rotation.y = angle;
		return group;
	}
	function draw3DAnnotations(canvasState, drawingsState, annotations) {
		clear3DDrawings(canvasState, drawingsState);
		for (const annotation of annotations) if (annotation.type === AnnotationType.CIRCLE) {
			const coords = squareTo3DCoords(annotation.square);
			const circle = create3DCircle(coords.x, coords.z);
			canvasState.scene.add(circle);
			drawingsState.objects.push(circle);
		} else if (annotation.type === AnnotationType.ARROW) {
			const from = squareTo3DCoords(annotation.from);
			const to = squareTo3DCoords(annotation.to);
			const arrow = create3DArrow(from.x, from.z, to.x, to.z);
			canvasState.scene.add(arrow);
			drawingsState.objects.push(arrow);
		}
		render3D(canvasState);
	}
	function clear3DDrawings(canvasState, drawingsState) {
		for (const obj of drawingsState.objects) {
			canvasState.scene.remove(obj);
			obj.traverse((child) => {
				if (child instanceof three.Mesh) {
					child.geometry?.dispose();
					if (child.material instanceof three.Material) child.material.dispose();
				}
			});
		}
		drawingsState.objects = [];
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
	function handleDrawCommand(command, annotationsState, customBoardState, drawings3DState) {
		const annotations = parseDrawCommand(command);
		if (customBoardState.canvas) draw3DAnnotations(customBoardState.canvas, drawings3DState, annotations);
		else drawAnnotations(annotationsState, annotations);
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
	function setupKeyboardCommands(settings, annotationsState, customBoardState, drawings3DState) {
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
				handleDrawCommand(value, annotationsState, customBoardState, drawings3DState);
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
		if (!condition.value) return null;
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
	function ControlPanel({ boardChanged, onAnnotate }) {
		const settings = useSettings();
		boardChanged.value;
		const blackSegmentsActive = useComputed(() => settings.blackSegments.value !== "none");
		return /* @__PURE__ */ u("div", { children: [
			/* @__PURE__ */ u(SpeechButtons, {}),
			/* @__PURE__ */ u(ButtonRow, { children: /* @__PURE__ */ u(SettingButton, {
				label: "Pieces List",
				setting: settings.piecesListEnabled,
				options: TOGGLE_OPTIONS
			}) }),
			/* @__PURE__ */ u(ButtonRow, { children: /* @__PURE__ */ u(ActionButton, {
				label: "Annotate Board",
				onClick: onAnnotate
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
				condition: settings.customBoardEnabled,
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
					condition: settings.obfuscationsEnabled,
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
						condition: blackSegmentsActive,
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
				condition: settings.flashModeEnabled,
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
	function createRoot(boardChanged, mountPoint, settings, onAnnotate) {
		R(/* @__PURE__ */ u(SettingsProvider, {
			settings,
			children: /* @__PURE__ */ u(ControlPanel, {
				boardChanged,
				onAnnotate
			})
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
		const cleanupDividers = setupDividersEffect(dividersState, settings, boardChanged);
		const cleanupFlash = setupFlashEffect(flashState, flashLoopState, settings, boardChanged);
		const cleanupBlur = setupBlurEffect(settings);
		const customBoardState = createCustomBoardState();
		const cleanupCustomBoard = setupCustomBoardEffect(customBoardState, settings, boardChanged);
		const cleanupParallax = setupParallaxEffect(customBoardState, settings);
		const hoverState = createHoverAnimationState();
		const cleanupHover = setupHoverModeEffect(customBoardState, hoverState, settings);
		const cleanupPieceStyle = setupPieceStyleEffect(customBoardState, settings);
		const cleanupBlackSegments = setupBlackSegmentsEffect(createBlackSegmentsState(), customBoardState, settings);
		setupKeyboardCommands(settings, annotationsState, customBoardState, createDrawings3DState());
		const mountPoint = createDiv();
		const keyboardMove = querySelector(DomSelector.KEYBOARD_MOVE);
		if (keyboardMove) appendChild(keyboardMove, mountPoint);
		createRoot(boardChanged, mountPoint, settings, handleAnnotate);
		return () => {
			cleanupDividers();
			cleanupFlash();
			cleanupBlur();
			cleanupCustomBoard();
			cleanupParallax();
			cleanupHover();
			cleanupPieceStyle();
			cleanupBlackSegments();
			stopHoverAnimation(hoverState);
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
})(THREE);

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGljaGVzcy1ib2FyZC1zcGVha2VyLnVzZXIuanMiLCJuYW1lcyI6WyJpIiwidCIsInMiLCJjIiwiaCIsInciLCJyIiwibyIsImYiLCJ2IiwidSIsImUiLCJkIiwiYSIsImwiLCJqIiwieSIsIl8iLCJiIiwicCIsImciLCJTIiwibSIsIngiLCJFIiwibCIsInUiLCJ0IiwiaSIsInIiLCJvIiwiZSIsImYiLCJjIiwiYSIsInMiLCJoIiwicCIsInYiLCJkIiwidyIsIm0iLCJrIiwieCIsIkMiLCJBIiwiVCIsImoiLCJ6IiwiQiIsInUiLCJpIiwibyIsImYiLCJuIiwidiIsImwiLCJzIiwicCIsInIiLCJyIiwidCIsIm4iLCJ1IiwiZSIsImEiLCJjIiwiZiJdLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9AcHJlYWN0L3NpZ25hbHMtY29yZS9kaXN0L3NpZ25hbHMtY29yZS5tb2R1bGUuanMiLCJzcmMvZG9tYWluL2NoZXNzL2JsYWNrU2VnbWVudHMudHMiLCJzcmMvcGxhdGZvcm0vZG9tLnRzIiwic3JjL3BsYXRmb3JtL3RocmVlLnRzIiwic3JjL3ByZXNlbnRhdGlvbi8zZC9ib2FyZFBsYW5lLnRzIiwic3JjL2NvbnN0YW50cy9kb20udHMiLCJzcmMvcHJlc2VudGF0aW9uLzNkL2NhbnZhcy50cyIsInNyYy9kb21haW4vY2hlc3MvYm9hcmRQb3NpdGlvbjNkLnRzIiwic3JjL3ByZXNlbnRhdGlvbi8zZC9nZW9tZXRyaWVzLnRzIiwic3JjL3ByZXNlbnRhdGlvbi8zZC9waWVjZU1lc2gudHMiLCJzcmMvcHJlc2VudGF0aW9uLzNkL3BpZWNlTWFuYWdlci50cyIsInNyYy9hcHBsaWNhdGlvbi9oYW5kbGVycy9oYW5kbGVCbGFja1NlZ21lbnRzLnRzIiwic3JjL2FwcGxpY2F0aW9uL2VmZmVjdHMvb25CbGFja1NlZ21lbnRzLnRzIiwic3JjL2FwcGxpY2F0aW9uL2hhbmRsZXJzL2FwcGx5Qmx1ci50cyIsInNyYy9hcHBsaWNhdGlvbi9lZmZlY3RzL29uQmx1ci50cyIsInNyYy9hcHBsaWNhdGlvbi9oYW5kbGVycy9oYW5kbGVDdXN0b21Cb2FyZC50cyIsInNyYy9hcHBsaWNhdGlvbi9lZmZlY3RzL29uQ3VzdG9tQm9hcmQudHMiLCJzcmMvcHJlc2VudGF0aW9uL25vbi1wcmVhY3QtY29tcG9uZW50cy9kaXZpZGVycy50cyIsInNyYy9hcHBsaWNhdGlvbi9oYW5kbGVycy91cGRhdGVEaXZpZGVycy50cyIsInNyYy9hcHBsaWNhdGlvbi9lZmZlY3RzL29uRGl2aWRlcnMudHMiLCJzcmMvcHJlc2VudGF0aW9uL25vbi1wcmVhY3QtY29tcG9uZW50cy9mbGFzaC50cyIsInNyYy9hcHBsaWNhdGlvbi9oYW5kbGVycy9oYW5kbGVGbGFzaC50cyIsInNyYy9hcHBsaWNhdGlvbi9lZmZlY3RzL29uRmxhc2gudHMiLCJzcmMvcHJlc2VudGF0aW9uLzNkL2NhbWVyYS50cyIsInNyYy9wbGF0Zm9ybS9hbmltYXRpb25GcmFtZS50cyIsInNyYy9wcmVzZW50YXRpb24vM2QvaG92ZXJBbmltYXRpb24udHMiLCJzcmMvYXBwbGljYXRpb24vZWZmZWN0cy9vbkhvdmVyTW9kZS50cyIsInNyYy9hcHBsaWNhdGlvbi9lZmZlY3RzL29uUGFyYWxsYXgudHMiLCJzcmMvYXBwbGljYXRpb24vZWZmZWN0cy9vblBpZWNlU3R5bGUudHMiLCJzcmMvYXBwbGljYXRpb24vaGFuZGxlcnMvaGFuZGxlQW5ub3RhdGUudHMiLCJzcmMvY29uc3RhbnRzL2NvbW1hbmRzLnRzIiwic3JjL2NvbnN0YW50cy9hbm5vdGF0aW9ucy50cyIsInNyYy9kb21haW4vY29tbWFuZHMvY29tbWFuZFBhcnNlci50cyIsInNyYy9wcmVzZW50YXRpb24vM2QvZHJhd2luZ3MzZC50cyIsInNyYy9wcmVzZW50YXRpb24vbm9uLXByZWFjdC1jb21wb25lbnRzL2Fubm90YXRpb25zLnRzIiwic3JjL2FwcGxpY2F0aW9uL2hhbmRsZXJzL2hhbmRsZURyYXdDb21tYW5kLnRzIiwic3JjL2NvbnN0YW50cy9jaGVzcy50cyIsInNyYy9kb21haW4vY2hlc3MvcGllY2VHcm91cGluZy50cyIsInNyYy9kb21haW4vc3BlZWNoL3NwZWVjaFRleHQudHMiLCJzcmMvcGxhdGZvcm0vc3BlZWNoL2NvcmUudHMiLCJzcmMvcGxhdGZvcm0vc3BlZWNoL2luZGV4LnRzIiwic3JjL2RvbWFpbi9jaGVzcy9jb29yZGluYXRlcy50cyIsInNyYy9hcHBsaWNhdGlvbi9zZXJ2aWNlcy9ib2FyZFJlYWRlci9leHRyYWN0aW9uLnRzIiwic3JjL2FwcGxpY2F0aW9uL3NlcnZpY2VzL2JvYXJkUmVhZGVyL3JlYWRlci50cyIsInNyYy9hcHBsaWNhdGlvbi9oYW5kbGVycy9oYW5kbGVTcGVlY2hDb21tYW5kLnRzIiwic3JjL2FwcGxpY2F0aW9uL2lucHV0L2tleWJvYXJkSW5wdXQudHMiLCJzcmMvcGxhdGZvcm0vbXV0YXRpb25PYnNlcnZlci50cyIsInNyYy9hcHBsaWNhdGlvbi9vYnNlcnZlcnMvb2JzZXJ2ZXJTdGF0ZS50cyIsInNyYy9jb25zdGFudHMvc2V0dGluZ3MudHMiLCJzcmMvcGxhdGZvcm0vc3RvcmFnZS50cyIsInNyYy9hcHBsaWNhdGlvbi9zZXR0aW5ncy9zZXR0aW5nc1N0b3JlLnRzIiwibm9kZV9tb2R1bGVzL3ByZWFjdC9kaXN0L3ByZWFjdC5tb2R1bGUuanMiLCJub2RlX21vZHVsZXMvcHJlYWN0L2hvb2tzL2Rpc3QvaG9va3MubW9kdWxlLmpzIiwibm9kZV9tb2R1bGVzL3ByZWFjdC9qc3gtcnVudGltZS9kaXN0L2pzeFJ1bnRpbWUubW9kdWxlLmpzIiwic3JjL3ByZXNlbnRhdGlvbi9jb250ZXh0cy9TZXR0aW5nc0NvbnRleHQudHN4Iiwibm9kZV9tb2R1bGVzL0BwcmVhY3Qvc2lnbmFscy9kaXN0L3NpZ25hbHMubW9kdWxlLmpzIiwic3JjL2NvbnN0YW50cy9vcHRpb25zLnRzIiwic3JjL3ByZXNlbnRhdGlvbi9jb21wb25lbnRzL0FjdGlvbkJ1dHRvbi50c3giLCJzcmMvcHJlc2VudGF0aW9uL2NvbXBvbmVudHMvQnV0dG9uUm93LnRzeCIsInNyYy9wcmVzZW50YXRpb24vY29tcG9uZW50cy9Db25kaXRpb25hbENvbnRyb2xzLnRzeCIsInNyYy9wcmVzZW50YXRpb24vY29tcG9uZW50cy9TZXR0aW5nQnV0dG9uLnRzeCIsInNyYy9wcmVzZW50YXRpb24vY29tcG9uZW50cy9TcGVlY2hCdXR0b25zLnRzeCIsInNyYy9wcmVzZW50YXRpb24vY29tcG9uZW50cy9Db250cm9sUGFuZWwudHN4Iiwic3JjL3ByZXNlbnRhdGlvbi9jb21wb25lbnRzL3Jvb3QudHN4Iiwic3JjL2luaXQudHN4Iiwic3JjL21haW4udHN4Il0sInNvdXJjZXNDb250ZW50IjpbInZhciBpPVN5bWJvbC5mb3IoXCJwcmVhY3Qtc2lnbmFsc1wiKTtmdW5jdGlvbiB0KCl7aWYoIShzPjEpKXt2YXIgaSx0PSExOyFmdW5jdGlvbigpe3ZhciBpPWM7Yz12b2lkIDA7d2hpbGUodm9pZCAwIT09aSl7aWYoaS5TLnY9PT1pLnYpaS5TLmk9aS5pO2k9aS5vfX0oKTt3aGlsZSh2b2lkIDAhPT1oKXt2YXIgbj1oO2g9dm9pZCAwO3YrKzt3aGlsZSh2b2lkIDAhPT1uKXt2YXIgcj1uLnU7bi51PXZvaWQgMDtuLmYmPS0zO2lmKCEoOCZuLmYpJiZ3KG4pKXRyeXtuLmMoKX1jYXRjaChuKXtpZighdCl7aT1uO3Q9ITB9fW49cn19dj0wO3MtLTtpZih0KXRocm93IGl9ZWxzZSBzLS19ZnVuY3Rpb24gbihpKXtpZihzPjApcmV0dXJuIGkoKTtlPSsrdTtzKys7dHJ5e3JldHVybiBpKCl9ZmluYWxseXt0KCl9fXZhciByPXZvaWQgMDtmdW5jdGlvbiBvKGkpe3ZhciB0PXI7cj12b2lkIDA7dHJ5e3JldHVybiBpKCl9ZmluYWxseXtyPXR9fXZhciBmLGg9dm9pZCAwLHM9MCx2PTAsdT0wLGU9MCxjPXZvaWQgMCxkPTA7ZnVuY3Rpb24gYShpKXtpZih2b2lkIDAhPT1yKXt2YXIgdD1pLm47aWYodm9pZCAwPT09dHx8dC50IT09cil7dD17aTowLFM6aSxwOnIucyxuOnZvaWQgMCx0OnIsZTp2b2lkIDAseDp2b2lkIDAscjp0fTtpZih2b2lkIDAhPT1yLnMpci5zLm49dDtyLnM9dDtpLm49dDtpZigzMiZyLmYpaS5TKHQpO3JldHVybiB0fWVsc2UgaWYoLTE9PT10Lmkpe3QuaT0wO2lmKHZvaWQgMCE9PXQubil7dC5uLnA9dC5wO2lmKHZvaWQgMCE9PXQucCl0LnAubj10Lm47dC5wPXIuczt0Lm49dm9pZCAwO3Iucy5uPXQ7ci5zPXR9cmV0dXJuIHR9fX1mdW5jdGlvbiBsKGksdCl7dGhpcy52PWk7dGhpcy5pPTA7dGhpcy5uPXZvaWQgMDt0aGlzLnQ9dm9pZCAwO3RoaXMubD0wO3RoaXMuVz1udWxsPT10P3ZvaWQgMDp0LndhdGNoZWQ7dGhpcy5aPW51bGw9PXQ/dm9pZCAwOnQudW53YXRjaGVkO3RoaXMubmFtZT1udWxsPT10P3ZvaWQgMDp0Lm5hbWV9bC5wcm90b3R5cGUuYnJhbmQ9aTtsLnByb3RvdHlwZS5oPWZ1bmN0aW9uKCl7cmV0dXJuITB9O2wucHJvdG90eXBlLlM9ZnVuY3Rpb24oaSl7dmFyIHQ9dGhpcyxuPXRoaXMudDtpZihuIT09aSYmdm9pZCAwPT09aS5lKXtpLng9bjt0aGlzLnQ9aTtpZih2b2lkIDAhPT1uKW4uZT1pO2Vsc2UgbyhmdW5jdGlvbigpe3ZhciBpO251bGw9PShpPXQuVyl8fGkuY2FsbCh0KX0pfX07bC5wcm90b3R5cGUuVT1mdW5jdGlvbihpKXt2YXIgdD10aGlzO2lmKHZvaWQgMCE9PXRoaXMudCl7dmFyIG49aS5lLHI9aS54O2lmKHZvaWQgMCE9PW4pe24ueD1yO2kuZT12b2lkIDB9aWYodm9pZCAwIT09cil7ci5lPW47aS54PXZvaWQgMH1pZihpPT09dGhpcy50KXt0aGlzLnQ9cjtpZih2b2lkIDA9PT1yKW8oZnVuY3Rpb24oKXt2YXIgaTtudWxsPT0oaT10LlopfHxpLmNhbGwodCl9KX19fTtsLnByb3RvdHlwZS5zdWJzY3JpYmU9ZnVuY3Rpb24oaSl7dmFyIHQ9dGhpcztyZXR1cm4gaihmdW5jdGlvbigpe3ZhciBuPXQudmFsdWUsbz1yO3I9dm9pZCAwO3RyeXtpKG4pfWZpbmFsbHl7cj1vfX0se25hbWU6XCJzdWJcIn0pfTtsLnByb3RvdHlwZS52YWx1ZU9mPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMudmFsdWV9O2wucHJvdG90eXBlLnRvU3RyaW5nPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMudmFsdWUrXCJcIn07bC5wcm90b3R5cGUudG9KU09OPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMudmFsdWV9O2wucHJvdG90eXBlLnBlZWs9ZnVuY3Rpb24oKXt2YXIgaT10aGlzO3JldHVybiBvKGZ1bmN0aW9uKCl7cmV0dXJuIGkudmFsdWV9KX07T2JqZWN0LmRlZmluZVByb3BlcnR5KGwucHJvdG90eXBlLFwidmFsdWVcIix7Z2V0OmZ1bmN0aW9uKCl7dmFyIGk9YSh0aGlzKTtpZih2b2lkIDAhPT1pKWkuaT10aGlzLmk7cmV0dXJuIHRoaXMudn0sc2V0OmZ1bmN0aW9uKGkpe2lmKGkhPT10aGlzLnYpe2lmKHY+MTAwKXRocm93IG5ldyBFcnJvcihcIkN5Y2xlIGRldGVjdGVkXCIpOyFmdW5jdGlvbihpKXtpZigwIT09cyYmMD09PXYpaWYoaS5sIT09ZSl7aS5sPWU7Yz17UzppLHY6aS52LGk6aS5pLG86Y319fSh0aGlzKTt0aGlzLnY9aTt0aGlzLmkrKztkKys7cysrO3RyeXtmb3IodmFyIG49dGhpcy50O3ZvaWQgMCE9PW47bj1uLngpbi50Lk4oKX1maW5hbGx5e3QoKX19fX0pO2Z1bmN0aW9uIHkoaSx0KXtyZXR1cm4gbmV3IGwoaSx0KX1mdW5jdGlvbiB3KGkpe2Zvcih2YXIgdD1pLnM7dm9pZCAwIT09dDt0PXQubilpZih0LlMuaSE9PXQuaXx8IXQuUy5oKCl8fHQuUy5pIT09dC5pKXJldHVybiEwO3JldHVybiExfWZ1bmN0aW9uIF8oaSl7Zm9yKHZhciB0PWkuczt2b2lkIDAhPT10O3Q9dC5uKXt2YXIgbj10LlMubjtpZih2b2lkIDAhPT1uKXQucj1uO3QuUy5uPXQ7dC5pPS0xO2lmKHZvaWQgMD09PXQubil7aS5zPXQ7YnJlYWt9fX1mdW5jdGlvbiBiKGkpe3ZhciB0PWkucyxuPXZvaWQgMDt3aGlsZSh2b2lkIDAhPT10KXt2YXIgcj10LnA7aWYoLTE9PT10Lmkpe3QuUy5VKHQpO2lmKHZvaWQgMCE9PXIpci5uPXQubjtpZih2b2lkIDAhPT10Lm4pdC5uLnA9cn1lbHNlIG49dDt0LlMubj10LnI7aWYodm9pZCAwIT09dC5yKXQucj12b2lkIDA7dD1yfWkucz1ufWZ1bmN0aW9uIHAoaSx0KXtsLmNhbGwodGhpcyx2b2lkIDApO3RoaXMueD1pO3RoaXMucz12b2lkIDA7dGhpcy5nPWQtMTt0aGlzLmY9NDt0aGlzLlc9bnVsbD09dD92b2lkIDA6dC53YXRjaGVkO3RoaXMuWj1udWxsPT10P3ZvaWQgMDp0LnVud2F0Y2hlZDt0aGlzLm5hbWU9bnVsbD09dD92b2lkIDA6dC5uYW1lfXAucHJvdG90eXBlPW5ldyBsO3AucHJvdG90eXBlLmg9ZnVuY3Rpb24oKXt0aGlzLmYmPS0zO2lmKDEmdGhpcy5mKXJldHVybiExO2lmKDMyPT0oMzYmdGhpcy5mKSlyZXR1cm4hMDt0aGlzLmYmPS01O2lmKHRoaXMuZz09PWQpcmV0dXJuITA7dGhpcy5nPWQ7dGhpcy5mfD0xO2lmKHRoaXMuaT4wJiYhdyh0aGlzKSl7dGhpcy5mJj0tMjtyZXR1cm4hMH12YXIgaT1yO3RyeXtfKHRoaXMpO3I9dGhpczt2YXIgdD10aGlzLngoKTtpZigxNiZ0aGlzLmZ8fHRoaXMudiE9PXR8fDA9PT10aGlzLmkpe3RoaXMudj10O3RoaXMuZiY9LTE3O3RoaXMuaSsrfX1jYXRjaChpKXt0aGlzLnY9aTt0aGlzLmZ8PTE2O3RoaXMuaSsrfXI9aTtiKHRoaXMpO3RoaXMuZiY9LTI7cmV0dXJuITB9O3AucHJvdG90eXBlLlM9ZnVuY3Rpb24oaSl7aWYodm9pZCAwPT09dGhpcy50KXt0aGlzLmZ8PTM2O2Zvcih2YXIgdD10aGlzLnM7dm9pZCAwIT09dDt0PXQubil0LlMuUyh0KX1sLnByb3RvdHlwZS5TLmNhbGwodGhpcyxpKX07cC5wcm90b3R5cGUuVT1mdW5jdGlvbihpKXtpZih2b2lkIDAhPT10aGlzLnQpe2wucHJvdG90eXBlLlUuY2FsbCh0aGlzLGkpO2lmKHZvaWQgMD09PXRoaXMudCl7dGhpcy5mJj0tMzM7Zm9yKHZhciB0PXRoaXMuczt2b2lkIDAhPT10O3Q9dC5uKXQuUy5VKHQpfX19O3AucHJvdG90eXBlLk49ZnVuY3Rpb24oKXtpZighKDImdGhpcy5mKSl7dGhpcy5mfD02O2Zvcih2YXIgaT10aGlzLnQ7dm9pZCAwIT09aTtpPWkueClpLnQuTigpfX07T2JqZWN0LmRlZmluZVByb3BlcnR5KHAucHJvdG90eXBlLFwidmFsdWVcIix7Z2V0OmZ1bmN0aW9uKCl7aWYoMSZ0aGlzLmYpdGhyb3cgbmV3IEVycm9yKFwiQ3ljbGUgZGV0ZWN0ZWRcIik7dmFyIGk9YSh0aGlzKTt0aGlzLmgoKTtpZih2b2lkIDAhPT1pKWkuaT10aGlzLmk7aWYoMTYmdGhpcy5mKXRocm93IHRoaXMudjtyZXR1cm4gdGhpcy52fX0pO2Z1bmN0aW9uIGcoaSx0KXtyZXR1cm4gbmV3IHAoaSx0KX1mdW5jdGlvbiBTKGkpe3ZhciBuPWkubTtpLm09dm9pZCAwO2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIG4pe3MrKzt2YXIgbz1yO3I9dm9pZCAwO3RyeXtuKCl9Y2F0Y2godCl7aS5mJj0tMjtpLmZ8PTg7bShpKTt0aHJvdyB0fWZpbmFsbHl7cj1vO3QoKX19fWZ1bmN0aW9uIG0oaSl7Zm9yKHZhciB0PWkuczt2b2lkIDAhPT10O3Q9dC5uKXQuUy5VKHQpO2kueD12b2lkIDA7aS5zPXZvaWQgMDtTKGkpfWZ1bmN0aW9uIHgoaSl7aWYociE9PXRoaXMpdGhyb3cgbmV3IEVycm9yKFwiT3V0LW9mLW9yZGVyIGVmZmVjdFwiKTtiKHRoaXMpO3I9aTt0aGlzLmYmPS0yO2lmKDgmdGhpcy5mKW0odGhpcyk7dCgpfWZ1bmN0aW9uIEUoaSx0KXt0aGlzLng9aTt0aGlzLm09dm9pZCAwO3RoaXMucz12b2lkIDA7dGhpcy51PXZvaWQgMDt0aGlzLmY9MzI7dGhpcy5uYW1lPW51bGw9PXQ/dm9pZCAwOnQubmFtZTtpZihmKWYucHVzaCh0aGlzKX1FLnByb3RvdHlwZS5jPWZ1bmN0aW9uKCl7dmFyIGk9dGhpcy5TKCk7dHJ5e2lmKDgmdGhpcy5mKXJldHVybjtpZih2b2lkIDA9PT10aGlzLngpcmV0dXJuO3ZhciB0PXRoaXMueCgpO2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIHQpdGhpcy5tPXR9ZmluYWxseXtpKCl9fTtFLnByb3RvdHlwZS5TPWZ1bmN0aW9uKCl7aWYoMSZ0aGlzLmYpdGhyb3cgbmV3IEVycm9yKFwiQ3ljbGUgZGV0ZWN0ZWRcIik7dGhpcy5mfD0xO3RoaXMuZiY9LTk7Uyh0aGlzKTtfKHRoaXMpO3MrKzt2YXIgaT1yO3I9dGhpcztyZXR1cm4geC5iaW5kKHRoaXMsaSl9O0UucHJvdG90eXBlLk49ZnVuY3Rpb24oKXtpZighKDImdGhpcy5mKSl7dGhpcy5mfD0yO3RoaXMudT1oO2g9dGhpc319O0UucHJvdG90eXBlLmQ9ZnVuY3Rpb24oKXt0aGlzLmZ8PTg7aWYoISgxJnRoaXMuZikpbSh0aGlzKX07RS5wcm90b3R5cGUuZGlzcG9zZT1mdW5jdGlvbigpe3RoaXMuZCgpfTtmdW5jdGlvbiBqKGksdCl7dmFyIG49bmV3IEUoaSx0KTt0cnl7bi5jKCl9Y2F0Y2goaSl7bi5kKCk7dGhyb3cgaX12YXIgcj1uLmQuYmluZChuKTtyW1N5bWJvbC5kaXNwb3NlXT1yO3JldHVybiByfWZ1bmN0aW9uIEMoaSl7cmV0dXJuIGZ1bmN0aW9uKCl7dmFyIHQ9YXJndW1lbnRzLHI9dGhpcztyZXR1cm4gbihmdW5jdGlvbigpe3JldHVybiBvKGZ1bmN0aW9uKCl7cmV0dXJuIGkuYXBwbHkocixbXS5zbGljZS5jYWxsKHQpKX0pfSl9fWZ1bmN0aW9uIE8oKXt2YXIgaT1mO2Y9W107cmV0dXJuIGZ1bmN0aW9uKCl7dmFyIHQ9ZjtpZihmJiZpKWk9aS5jb25jYXQoZik7Zj1pO3JldHVybiB0fX12YXIgaz1mdW5jdGlvbihpKXtmb3IodmFyIHQgaW4gaSl7dmFyIG49aVt0XTtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBuKWlbdF09QyhuKTtlbHNlIGlmKFwib2JqZWN0XCI9PXR5cGVvZiBuJiZudWxsIT09biYmIShcImJyYW5kXCJpbiBuKSlrKG4pfX07ZnVuY3Rpb24gVChpKXtyZXR1cm4gZnVuY3Rpb24oKXt2YXIgdCxuLHI9TygpO3RyeXtuPWkuYXBwbHkodm9pZCAwLFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKSl9Y2F0Y2goaSl7Zj12b2lkIDA7dGhyb3cgaX1maW5hbGx5e3Q9cigpfWsobik7bltTeW1ib2wuZGlzcG9zZV09QyhmdW5jdGlvbigpe2lmKHQpZm9yKHZhciBpPTA7aTx0Lmxlbmd0aDtpKyspdFtpXS5kaXNwb3NlKCk7dD12b2lkIDB9KTtyZXR1cm4gbn19ZXhwb3J0e3AgYXMgQ29tcHV0ZWQsRSBhcyBFZmZlY3QsbCBhcyBTaWduYWwsQyBhcyBhY3Rpb24sbiBhcyBiYXRjaCxnIGFzIGNvbXB1dGVkLFQgYXMgY3JlYXRlTW9kZWwsaiBhcyBlZmZlY3QseSBhcyBzaWduYWwsbyBhcyB1bnRyYWNrZWR9Oy8vIyBzb3VyY2VNYXBwaW5nVVJMPXNpZ25hbHMtY29yZS5tb2R1bGUuanMubWFwXG4iLCJleHBvcnQgZnVuY3Rpb24gZ2V0QmxhY2tlZE91dFF1YWRyYW50cyhtb2RlOiBzdHJpbmcsIGNvdW50ZXI6IG51bWJlcik6IG51bWJlcltdIHtcbiAgc3dpdGNoIChtb2RlKSB7XG4gICAgY2FzZSAnbm9uZSc6XG4gICAgICByZXR1cm4gW11cbiAgICBjYXNlICcxLzQnOlxuICAgICAgcmV0dXJuIFtjb3VudGVyICUgNF1cbiAgICBjYXNlICcxLzInOlxuICAgICAgcmV0dXJuIFtcbiAgICAgICAgWzAsIDFdLFxuICAgICAgICBbMiwgM10sXG4gICAgICAgIFswLCAyXSxcbiAgICAgICAgWzEsIDNdLFxuICAgICAgXVtjb3VudGVyICUgNF1cbiAgICBjYXNlICczLzQnOiB7XG4gICAgICBjb25zdCB2aXNpYmxlID0gY291bnRlciAlIDRcbiAgICAgIHJldHVybiBbMCwgMSwgMiwgM10uZmlsdGVyKChxKSA9PiBxICE9PSB2aXNpYmxlKVxuICAgIH1cbiAgICBjYXNlICc0LzQnOlxuICAgICAgcmV0dXJuIFswLCAxLCAyLCAzXVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gW11cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGltaW5nTXModGltaW5nOiBzdHJpbmcpOiBudW1iZXIgfCBudWxsIHtcbiAgc3dpdGNoICh0aW1pbmcpIHtcbiAgICBjYXNlICdyb3RhdGUtMTBzJzpcbiAgICAgIHJldHVybiAxMDAwMFxuICAgIGNhc2UgJ3JvdGF0ZS0zMHMnOlxuICAgICAgcmV0dXJuIDMwMDAwXG4gICAgY2FzZSAncm90YXRlLTYwcyc6XG4gICAgICByZXR1cm4gNjAwMDBcbiAgICBjYXNlICdkb250LXJvdGF0ZSc6XG4gICAgICByZXR1cm4gbnVsbFxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gbnVsbFxuICB9XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gY3JlYXRlRGl2KCk6IEhUTUxEaXZFbGVtZW50IHtcbiAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDYW52YXMoKTogSFRNTENhbnZhc0VsZW1lbnQge1xuICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUltYWdlKCk6IEhUTUxJbWFnZUVsZW1lbnQge1xuICByZXR1cm4gbmV3IEltYWdlKClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVN2Z0VsZW1lbnQodGFnOiBzdHJpbmcpOiBTVkdFbGVtZW50IHtcbiAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCB0YWcpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBxdWVyeVNlbGVjdG9yKHNlbGVjdG9yOiBzdHJpbmcpOiBFbGVtZW50IHwgbnVsbCB7XG4gIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcjogc3RyaW5nKTogTm9kZUxpc3RPZjxFbGVtZW50PiB7XG4gIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXBwZW5kQ2hpbGQocGFyZW50OiBFbGVtZW50LCBjaGlsZDogRWxlbWVudCk6IHZvaWQge1xuICBwYXJlbnQuYXBwZW5kQ2hpbGQoY2hpbGQpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVFbGVtZW50KGVsZW1lbnQ6IEVsZW1lbnQpOiB2b2lkIHtcbiAgZWxlbWVudC5yZW1vdmUoKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGVsZW1lbnQ6IEVsZW1lbnQpOiBET01SZWN0IHtcbiAgcmV0dXJuIGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdhaXRGb3JFbGVtZW50KHNlbGVjdG9yOiBzdHJpbmcpOiBQcm9taXNlPEVsZW1lbnQ+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgY29uc3QgZWxlbWVudCA9IHF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpXG4gICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgIHJlc29sdmUoZWxlbWVudClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgY29uc3QgZWxlbWVudCA9IHF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpXG4gICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICBvYnNlcnZlci5kaXNjb25uZWN0KClcbiAgICAgICAgcmVzb2x2ZShlbGVtZW50KVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmJvZHksIHtcbiAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgIHN1YnRyZWU6IHRydWUsXG4gICAgfSlcbiAgfSlcbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJ1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlV2ViR0xSZW5kZXJlcihvcHRpb25zOiBUSFJFRS5XZWJHTFJlbmRlcmVyUGFyYW1ldGVycyk6IFRIUkVFLldlYkdMUmVuZGVyZXIge1xuICByZXR1cm4gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIob3B0aW9ucylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNjZW5lKCk6IFRIUkVFLlNjZW5lIHtcbiAgcmV0dXJuIG5ldyBUSFJFRS5TY2VuZSgpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQZXJzcGVjdGl2ZUNhbWVyYShcbiAgZm92OiBudW1iZXIsXG4gIGFzcGVjdDogbnVtYmVyLFxuICBuZWFyOiBudW1iZXIsXG4gIGZhcjogbnVtYmVyXG4pOiBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSB7XG4gIHJldHVybiBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoZm92LCBhc3BlY3QsIG5lYXIsIGZhcilcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUFtYmllbnRMaWdodChjb2xvcjogbnVtYmVyLCBpbnRlbnNpdHk6IG51bWJlcik6IFRIUkVFLkFtYmllbnRMaWdodCB7XG4gIHJldHVybiBuZXcgVEhSRUUuQW1iaWVudExpZ2h0KGNvbG9yLCBpbnRlbnNpdHkpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVEaXJlY3Rpb25hbExpZ2h0KGNvbG9yOiBudW1iZXIsIGludGVuc2l0eTogbnVtYmVyKTogVEhSRUUuRGlyZWN0aW9uYWxMaWdodCB7XG4gIHJldHVybiBuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodChjb2xvciwgaW50ZW5zaXR5KVxufVxuXG5leHBvcnQgeyBUSFJFRSB9XG4iLCJpbXBvcnQgeyBUSFJFRSB9IGZyb20gJy4uLy4uL3BsYXRmb3JtL3RocmVlJ1xuXG5jb25zdCBMSUdIVF9DT0xPUiA9IDB4ZWVlZWQyXG5jb25zdCBEQVJLX0NPTE9SID0gMHg3Njk2NTZcbmNvbnN0IEJMQUNLX0NPTE9SID0gMHgwMDAwMDBcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUJvYXJkUGxhbmUoYmxhY2tlZE91dFF1YWRyYW50czogbnVtYmVyW10pOiBUSFJFRS5Hcm91cCB7XG4gIGNvbnN0IGJvYXJkR3JvdXAgPSBuZXcgVEhSRUUuR3JvdXAoKVxuXG4gIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IDg7IHJvdysrKSB7XG4gICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgODsgY29sKyspIHtcbiAgICAgIGNvbnN0IHNxdWFyZUdlb20gPSBuZXcgVEhSRUUuUGxhbmVHZW9tZXRyeSgxLCAxKVxuICAgICAgY29uc3QgaXNMaWdodCA9IChyb3cgKyBjb2wpICUgMiA9PT0gMFxuXG4gICAgICBjb25zdCBpc0JsYWNrZWRPdXQgPSBpc1NxdWFyZUluQmxhY2tlZE91dFF1YWRyYW50KGNvbCwgcm93LCBibGFja2VkT3V0UXVhZHJhbnRzKVxuICAgICAgbGV0IG1hdGVyaWFsOiBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbFxuICAgICAgaWYgKGlzQmxhY2tlZE91dCkge1xuICAgICAgICBtYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7IGNvbG9yOiBCTEFDS19DT0xPUiB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoeyBjb2xvcjogaXNMaWdodCA/IExJR0hUX0NPTE9SIDogREFSS19DT0xPUiB9KVxuICAgICAgfVxuXG4gICAgICBjb25zdCBzcXVhcmUgPSBuZXcgVEhSRUUuTWVzaChzcXVhcmVHZW9tLCBtYXRlcmlhbClcbiAgICAgIHNxdWFyZS5wb3NpdGlvbi5zZXQoY29sIC0gMy41LCAwLCByb3cgLSAzLjUpXG4gICAgICBzcXVhcmUucm90YXRpb24ueCA9IC1NYXRoLlBJIC8gMlxuICAgICAgYm9hcmRHcm91cC5hZGQoc3F1YXJlKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBib2FyZEdyb3VwXG59XG5cbmZ1bmN0aW9uIGlzU3F1YXJlSW5CbGFja2VkT3V0UXVhZHJhbnQoY29sOiBudW1iZXIsIHJvdzogbnVtYmVyLCBxdWFkcmFudHM6IG51bWJlcltdKTogYm9vbGVhbiB7XG4gIGlmIChxdWFkcmFudHMubGVuZ3RoID09PSAwKSByZXR1cm4gZmFsc2VcblxuICBjb25zdCBpc0xlZnQgPSBjb2wgPCA0XG4gIGNvbnN0IGlzVG9wID0gcm93IDwgNFxuXG4gIGxldCBxdWFkcmFudDogbnVtYmVyXG4gIGlmIChpc1RvcCAmJiBpc0xlZnQpIHF1YWRyYW50ID0gMFxuICBlbHNlIGlmIChpc1RvcCAmJiAhaXNMZWZ0KSBxdWFkcmFudCA9IDFcbiAgZWxzZSBpZiAoIWlzVG9wICYmIGlzTGVmdCkgcXVhZHJhbnQgPSAyXG4gIGVsc2UgcXVhZHJhbnQgPSAzXG5cbiAgcmV0dXJuIHF1YWRyYW50cy5pbmNsdWRlcyhxdWFkcmFudClcbn1cbiIsIi8vIERPTSBzZWxlY3RvcnMgZW51bVxuZXhwb3J0IGVudW0gRG9tU2VsZWN0b3Ige1xuICBCT0FSRCA9ICdjZy1ib2FyZCcsXG4gIEJPQVJEX05PX0NVU1RPTSA9ICdjZy1ib2FyZDpub3QoLnVzZXJzY3JpcHQtY3VzdG9tLWJvYXJkKScsXG4gIENPT1JEUyA9ICdjb29yZHMnLFxuICBQSUVDRSA9ICdwaWVjZScsXG4gIENPTlRBSU5FUiA9ICdjZy1jb250YWluZXInLFxuICBLRVlCT0FSRF9NT1ZFID0gJy5rZXlib2FyZC1tb3ZlJyxcbiAgS0VZQk9BUkRfSU5QVVQgPSAnLmtleWJvYXJkLW1vdmUgaW5wdXQnLFxufVxuXG4vLyBDU1MgY2xhc3NlcyBlbnVtXG5leHBvcnQgZW51bSBDc3NDbGFzcyB7XG4gIEJMQUNLID0gJ2JsYWNrJyxcbiAgVVNFUlNDUklQVF9ESVZJREVSUyA9ICd1c2Vyc2NyaXB0LWRpdmlkZXJzJyxcbiAgVVNFUlNDUklQVF9EUkFXSU5HUyA9ICd1c2Vyc2NyaXB0LWRyYXdpbmdzJyxcbiAgVVNFUlNDUklQVF9GTEFTSCA9ICd1c2Vyc2NyaXB0LWZsYXNoLW92ZXJsYXknLFxufVxuXG4vLyBDU1MgZGlzcGxheSB2YWx1ZXMgZW51bVxuZXhwb3J0IGVudW0gQ3NzRGlzcGxheSB7XG4gIEJMT0NLID0gJ2Jsb2NrJyxcbiAgTk9ORSA9ICdub25lJyxcbn1cbiIsImltcG9ydCB7IERvbVNlbGVjdG9yIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL2RvbSdcbmltcG9ydCB7IGFwcGVuZENoaWxkLCBxdWVyeVNlbGVjdG9yIH0gZnJvbSAnLi4vLi4vcGxhdGZvcm0vZG9tJ1xuaW1wb3J0IHtcbiAgVEhSRUUsXG4gIGNyZWF0ZUFtYmllbnRMaWdodCxcbiAgY3JlYXRlRGlyZWN0aW9uYWxMaWdodCxcbiAgY3JlYXRlUGVyc3BlY3RpdmVDYW1lcmEsXG4gIGNyZWF0ZVNjZW5lLFxuICBjcmVhdGVXZWJHTFJlbmRlcmVyLFxufSBmcm9tICcuLi8uLi9wbGF0Zm9ybS90aHJlZSdcblxuZXhwb3J0IGludGVyZmFjZSBDYW52YXMzRFN0YXRlIHtcbiAgc2NlbmU6IFRIUkVFLlNjZW5lXG4gIGNhbWVyYTogVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmFcbiAgcmVuZGVyZXI6IFRIUkVFLldlYkdMUmVuZGVyZXJcbiAgY2FudmFzRWxlbWVudDogSFRNTENhbnZhc0VsZW1lbnRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZTNEQ2FudmFzKCk6IENhbnZhczNEU3RhdGUge1xuICBjb25zdCBjb250YWluZXIgPSBxdWVyeVNlbGVjdG9yKERvbVNlbGVjdG9yLkNPTlRBSU5FUilcbiAgY29uc3QgYm9hcmQgPSBxdWVyeVNlbGVjdG9yKERvbVNlbGVjdG9yLkJPQVJEKVxuXG4gIGlmICghY29udGFpbmVyIHx8ICFib2FyZCkge1xuICAgIHRocm93IG5ldyBFcnJvcignQ29udGFpbmVyIG9yIGJvYXJkIG5vdCBmb3VuZCcpXG4gIH1cblxuICBjb25zdCBib2FyZFNpemUgPSBib2FyZC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aFxuXG4gIC8vIENyZWF0ZSBzY2VuZVxuICBjb25zdCBzY2VuZSA9IGNyZWF0ZVNjZW5lKClcbiAgc2NlbmUuYmFja2dyb3VuZCA9IG51bGxcblxuICAvLyBDcmVhdGUgY2FtZXJhXG4gIGNvbnN0IGZvdiA9IDQ1XG4gIGNvbnN0IGFzcGVjdCA9IDFcbiAgY29uc3QgY2FtZXJhID0gY3JlYXRlUGVyc3BlY3RpdmVDYW1lcmEoZm92LCBhc3BlY3QsIDAuMSwgMTAwMClcbiAgY2FtZXJhLnBvc2l0aW9uLnNldCgwLCAxMiwgOClcbiAgY2FtZXJhLnVwLnNldCgwLCAwLCAtMSlcbiAgY2FtZXJhLmxvb2tBdCgwLCAwLCAwKVxuXG4gIC8vIENyZWF0ZSByZW5kZXJlclxuICBjb25zdCByZW5kZXJlciA9IGNyZWF0ZVdlYkdMUmVuZGVyZXIoeyBhbHBoYTogdHJ1ZSwgYW50aWFsaWFzOiB0cnVlIH0pXG4gIHJlbmRlcmVyLnNldFNpemUoYm9hcmRTaXplLCBib2FyZFNpemUpXG4gIHJlbmRlcmVyLnNldFBpeGVsUmF0aW8oTWF0aC5taW4od2luZG93LmRldmljZVBpeGVsUmF0aW8sIDIpKVxuICByZW5kZXJlci5zaGFkb3dNYXAuZW5hYmxlZCA9IHRydWVcbiAgcmVuZGVyZXIuc2hhZG93TWFwLnR5cGUgPSBUSFJFRS5QQ0ZTb2Z0U2hhZG93TWFwXG5cbiAgLy8gU2V0dXAgY2FudmFzIGVsZW1lbnRcbiAgY29uc3QgY2FudmFzRWxlbWVudCA9IHJlbmRlcmVyLmRvbUVsZW1lbnRcbiAgY2FudmFzRWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSdcbiAgY2FudmFzRWxlbWVudC5zdHlsZS50b3AgPSAnMCdcbiAgY2FudmFzRWxlbWVudC5zdHlsZS5sZWZ0ID0gJzAnXG4gIGNhbnZhc0VsZW1lbnQuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJ1xuICBjYW52YXNFbGVtZW50LnN0eWxlLnpJbmRleCA9ICcxMDAnXG4gIGNhbnZhc0VsZW1lbnQuY2xhc3NMaXN0LmFkZCgndXNlcnNjcmlwdC0zZC1jYW52YXMnKVxuXG4gIGFwcGVuZENoaWxkKGNvbnRhaW5lciwgY2FudmFzRWxlbWVudClcblxuICAvLyBBZGQgbGlnaHRpbmdcbiAgY29uc3QgYW1iaWVudExpZ2h0ID0gY3JlYXRlQW1iaWVudExpZ2h0KDB4ZmZmZmZmLCAwLjYpXG4gIHNjZW5lLmFkZChhbWJpZW50TGlnaHQpXG5cbiAgY29uc3QgZGlyZWN0aW9uYWxMaWdodCA9IGNyZWF0ZURpcmVjdGlvbmFsTGlnaHQoMHhmZmZmZmYsIDAuOClcbiAgZGlyZWN0aW9uYWxMaWdodC5wb3NpdGlvbi5zZXQoNSwgMTUsIDgpXG4gIGRpcmVjdGlvbmFsTGlnaHQuY2FzdFNoYWRvdyA9IHRydWVcbiAgZGlyZWN0aW9uYWxMaWdodC5zaGFkb3cubWFwU2l6ZS53aWR0aCA9IDEwMjRcbiAgZGlyZWN0aW9uYWxMaWdodC5zaGFkb3cubWFwU2l6ZS5oZWlnaHQgPSAxMDI0XG4gIHNjZW5lLmFkZChkaXJlY3Rpb25hbExpZ2h0KVxuXG4gIGNvbnN0IGZpbGxMaWdodCA9IGNyZWF0ZURpcmVjdGlvbmFsTGlnaHQoMHhmZmZmZmYsIDAuMylcbiAgZmlsbExpZ2h0LnBvc2l0aW9uLnNldCgtNSwgMTAsIC01KVxuICBzY2VuZS5hZGQoZmlsbExpZ2h0KVxuXG4gIHJldHVybiB7XG4gICAgc2NlbmUsXG4gICAgY2FtZXJhLFxuICAgIHJlbmRlcmVyLFxuICAgIGNhbnZhc0VsZW1lbnQsXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlcjNEKHN0YXRlOiBDYW52YXMzRFN0YXRlKTogdm9pZCB7XG4gIHN0YXRlLnJlbmRlcmVyLnJlbmRlcihzdGF0ZS5zY2VuZSwgc3RhdGUuY2FtZXJhKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVzaXplM0RDYW52YXMoc3RhdGU6IENhbnZhczNEU3RhdGUpOiB2b2lkIHtcbiAgY29uc3QgYm9hcmQgPSBxdWVyeVNlbGVjdG9yKERvbVNlbGVjdG9yLkJPQVJEKVxuICBpZiAoIWJvYXJkKSByZXR1cm5cblxuICBjb25zdCBib2FyZFNpemUgPSBib2FyZC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aFxuICBzdGF0ZS5yZW5kZXJlci5zZXRTaXplKGJvYXJkU2l6ZSwgYm9hcmRTaXplKVxuICByZW5kZXIzRChzdGF0ZSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlc3Ryb3kzRENhbnZhcyhzdGF0ZTogQ2FudmFzM0RTdGF0ZSk6IHZvaWQge1xuICBzdGF0ZS5jYW52YXNFbGVtZW50LnJlbW92ZSgpXG4gIHN0YXRlLnJlbmRlcmVyLmRpc3Bvc2UoKVxuXG4gIC8vIENsZWFudXAgc2NlbmUgb2JqZWN0c1xuICBzdGF0ZS5zY2VuZS50cmF2ZXJzZSgob2JqZWN0KSA9PiB7XG4gICAgaWYgKG9iamVjdCBpbnN0YW5jZW9mIFRIUkVFLk1lc2gpIHtcbiAgICAgIG9iamVjdC5nZW9tZXRyeS5kaXNwb3NlKClcbiAgICAgIGlmIChvYmplY3QubWF0ZXJpYWwgaW5zdGFuY2VvZiBUSFJFRS5NYXRlcmlhbCkge1xuICAgICAgICBvYmplY3QubWF0ZXJpYWwuZGlzcG9zZSgpXG4gICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkob2JqZWN0Lm1hdGVyaWFsKSkge1xuICAgICAgICBmb3IgKGNvbnN0IG1hdGVyaWFsIG9mIG9iamVjdC5tYXRlcmlhbCkge1xuICAgICAgICAgIG1hdGVyaWFsLmRpc3Bvc2UoKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9KVxufVxuIiwiZXhwb3J0IGludGVyZmFjZSBQb3NpdGlvbjNEIHtcbiAgeDogbnVtYmVyXG4gIHo6IG51bWJlclxufVxuXG5leHBvcnQgZnVuY3Rpb24gcGl4ZWxQb3NpdGlvblRvM0QoXG4gIHBpeGVsWDogbnVtYmVyLFxuICBwaXhlbFk6IG51bWJlcixcbiAgYm9hcmRTaXplOiBudW1iZXIsXG4gIGlzRmxpcHBlZDogYm9vbGVhblxuKTogUG9zaXRpb24zRCB7XG4gIGNvbnN0IG5vcm1hbGl6ZWRYID0gKHBpeGVsWCAvIGJvYXJkU2l6ZSkgKiA4XG4gIGNvbnN0IG5vcm1hbGl6ZWRZID0gKHBpeGVsWSAvIGJvYXJkU2l6ZSkgKiA4XG5cbiAgbGV0IHg6IG51bWJlclxuICBsZXQgejogbnVtYmVyXG5cbiAgaWYgKGlzRmxpcHBlZCkge1xuICAgIHggPSBub3JtYWxpemVkWCAtIDRcbiAgICB6ID0gbm9ybWFsaXplZFkgLSA0XG4gIH0gZWxzZSB7XG4gICAgeCA9IG5vcm1hbGl6ZWRYIC0gNFxuICAgIHogPSA4IC0gbm9ybWFsaXplZFkgLSA0XG4gIH1cblxuICByZXR1cm4geyB4LCB6IH1cbn1cbiIsImltcG9ydCB7IFRIUkVFIH0gZnJvbSAnLi4vLi4vcGxhdGZvcm0vdGhyZWUnXG5cbmV4cG9ydCBpbnRlcmZhY2UgS2luZ0dlb21ldHJ5IHtcbiAgYmFzZTogVEhSRUUuTGF0aGVHZW9tZXRyeVxuICBjcm9zc1Y6IFRIUkVFLkJveEdlb21ldHJ5XG4gIGNyb3NzSDogVEhSRUUuQm94R2VvbWV0cnlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBhd25HZW9tZXRyeSgpOiBUSFJFRS5MYXRoZUdlb21ldHJ5IHtcbiAgY29uc3QgcG9pbnRzID0gW1xuICAgIG5ldyBUSFJFRS5WZWN0b3IyKDAsIDApLFxuICAgIG5ldyBUSFJFRS5WZWN0b3IyKDAuMzUsIDApLFxuICAgIG5ldyBUSFJFRS5WZWN0b3IyKDAuMzUsIDAuMDUpLFxuICAgIG5ldyBUSFJFRS5WZWN0b3IyKDAuMjgsIDAuMSksXG4gICAgbmV3IFRIUkVFLlZlY3RvcjIoMC4xNSwgMC4zNSksXG4gICAgbmV3IFRIUkVFLlZlY3RvcjIoMC4xMiwgMC40NSksXG4gICAgbmV3IFRIUkVFLlZlY3RvcjIoMC4xOCwgMC41NSksXG4gICAgbmV3IFRIUkVFLlZlY3RvcjIoMC4xOCwgMC42KSxcbiAgICBuZXcgVEhSRUUuVmVjdG9yMigwLjIyLCAwLjY1KSxcbiAgICBuZXcgVEhSRUUuVmVjdG9yMigwLjIyLCAwLjg1KSxcbiAgICBuZXcgVEhSRUUuVmVjdG9yMigwLCAwLjg1KSxcbiAgXVxuICByZXR1cm4gbmV3IFRIUkVFLkxhdGhlR2VvbWV0cnkocG9pbnRzLCAyNClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVJvb2tHZW9tZXRyeSgpOiBUSFJFRS5MYXRoZUdlb21ldHJ5IHtcbiAgY29uc3QgcG9pbnRzID0gW1xuICAgIG5ldyBUSFJFRS5WZWN0b3IyKDAsIDApLFxuICAgIG5ldyBUSFJFRS5WZWN0b3IyKDAuNCwgMCksXG4gICAgbmV3IFRIUkVFLlZlY3RvcjIoMC40LCAwLjA4KSxcbiAgICBuZXcgVEhSRUUuVmVjdG9yMigwLjMyLCAwLjEyKSxcbiAgICBuZXcgVEhSRUUuVmVjdG9yMigwLjIyLCAwLjIpLFxuICAgIG5ldyBUSFJFRS5WZWN0b3IyKDAuMiwgMC43KSxcbiAgICBuZXcgVEhSRUUuVmVjdG9yMigwLjI4LCAwLjc1KSxcbiAgICBuZXcgVEhSRUUuVmVjdG9yMigwLjI4LCAwLjg1KSxcbiAgICBuZXcgVEhSRUUuVmVjdG9yMigwLjMyLCAwLjg1KSxcbiAgICBuZXcgVEhSRUUuVmVjdG9yMigwLjMyLCAxLjApLFxuICAgIG5ldyBUSFJFRS5WZWN0b3IyKDAsIDEuMCksXG4gIF1cbiAgcmV0dXJuIG5ldyBUSFJFRS5MYXRoZUdlb21ldHJ5KHBvaW50cywgNClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUtuaWdodEdlb21ldHJ5KCk6IFRIUkVFLkV4dHJ1ZGVHZW9tZXRyeSB7XG4gIGNvbnN0IHNoYXBlID0gbmV3IFRIUkVFLlNoYXBlKClcbiAgc2hhcGUubW92ZVRvKC0wLjE1LCAwKVxuICBzaGFwZS5saW5lVG8oMC4zNSwgMClcbiAgc2hhcGUubGluZVRvKDAuMzUsIDAuMDgpXG4gIHNoYXBlLmxpbmVUbygwLjI1LCAwLjEyKVxuICBzaGFwZS5saW5lVG8oMC4xNSwgMC4xOClcbiAgc2hhcGUucXVhZHJhdGljQ3VydmVUbygwLjA4LCAwLjM1LCAwLjEsIDAuNSlcbiAgc2hhcGUucXVhZHJhdGljQ3VydmVUbygwLjE1LCAwLjY1LCAwLjI1LCAwLjc1KVxuICBzaGFwZS5xdWFkcmF0aWNDdXJ2ZVRvKDAuMzUsIDAuODUsIDAuMzgsIDAuOTUpXG4gIHNoYXBlLmxpbmVUbygwLjQyLCAxLjApXG4gIHNoYXBlLmxpbmVUbygwLjQ1LCAxLjA4KVxuICBzaGFwZS5saW5lVG8oMC40MiwgMS4xMilcbiAgc2hhcGUubGluZVRvKDAuMzUsIDEuMDgpXG4gIHNoYXBlLnF1YWRyYXRpY0N1cnZlVG8oMC4yNSwgMS4wMiwgMC4xOCwgMS4wOClcbiAgc2hhcGUubGluZVRvKDAuMjIsIDEuMTgpXG4gIHNoYXBlLmxpbmVUbygwLjE4LCAxLjIyKVxuICBzaGFwZS5saW5lVG8oMC4xLCAxLjE1KVxuICBzaGFwZS5xdWFkcmF0aWNDdXJ2ZVRvKC0wLjA1LCAxLjA1LCAtMC4xNSwgMS4xKVxuICBzaGFwZS5xdWFkcmF0aWNDdXJ2ZVRvKC0wLjI1LCAxLjEyLCAtMC4zMiwgMS4wNSlcbiAgc2hhcGUubGluZVRvKC0wLjM1LCAwLjk1KVxuICBzaGFwZS5saW5lVG8oLTAuMywgMC44OClcbiAgc2hhcGUubGluZVRvKC0wLjIsIDAuOSlcbiAgc2hhcGUucXVhZHJhdGljQ3VydmVUbygtMC4xLCAwLjg1LCAtMC4xNSwgMC43NSlcbiAgc2hhcGUubGluZVRvKC0wLjI1LCAwLjcpXG4gIHNoYXBlLmxpbmVUbygtMC4zNSwgMC42NSlcbiAgc2hhcGUubGluZVRvKC0wLjM4LCAwLjU1KVxuICBzaGFwZS5saW5lVG8oLTAuMzIsIDAuNSlcbiAgc2hhcGUubGluZVRvKC0wLjIyLCAwLjUyKVxuICBzaGFwZS5xdWFkcmF0aWNDdXJ2ZVRvKC0wLjEyLCAwLjQ4LCAtMC4xLCAwLjM4KVxuICBzaGFwZS5xdWFkcmF0aWNDdXJ2ZVRvKC0wLjA4LCAwLjI1LCAtMC4xNSwgMC4xNSlcbiAgc2hhcGUubGluZVRvKC0wLjIsIDAuMDgpXG4gIHNoYXBlLmxpbmVUbygtMC4xNSwgMClcblxuICByZXR1cm4gbmV3IFRIUkVFLkV4dHJ1ZGVHZW9tZXRyeShzaGFwZSwge1xuICAgIGRlcHRoOiAwLjIyLFxuICAgIGJldmVsRW5hYmxlZDogdHJ1ZSxcbiAgICBiZXZlbFRoaWNrbmVzczogMC4wNCxcbiAgICBiZXZlbFNpemU6IDAuMDMsXG4gICAgYmV2ZWxTZWdtZW50czogNCxcbiAgfSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUJpc2hvcEdlb21ldHJ5KCk6IFRIUkVFLkxhdGhlR2VvbWV0cnkge1xuICBjb25zdCBwb2ludHMgPSBbXG4gICAgbmV3IFRIUkVFLlZlY3RvcjIoMCwgMCksXG4gICAgbmV3IFRIUkVFLlZlY3RvcjIoMC4zOCwgMCksXG4gICAgbmV3IFRIUkVFLlZlY3RvcjIoMC4zOCwgMC4wNiksXG4gICAgbmV3IFRIUkVFLlZlY3RvcjIoMC4zLCAwLjEpLFxuICAgIG5ldyBUSFJFRS5WZWN0b3IyKDAuMTgsIDAuMjUpLFxuICAgIG5ldyBUSFJFRS5WZWN0b3IyKDAuMTUsIDAuNCksXG4gICAgbmV3IFRIUkVFLlZlY3RvcjIoMC4yLCAwLjUpLFxuICAgIG5ldyBUSFJFRS5WZWN0b3IyKDAuMiwgMC41NSksXG4gICAgbmV3IFRIUkVFLlZlY3RvcjIoMC4xMiwgMC43KSxcbiAgICBuZXcgVEhSRUUuVmVjdG9yMigwLjA4LCAwLjk1KSxcbiAgICBuZXcgVEhSRUUuVmVjdG9yMigwLjE1LCAxLjA1KSxcbiAgICBuZXcgVEhSRUUuVmVjdG9yMigwLjEsIDEuMTUpLFxuICAgIG5ldyBUSFJFRS5WZWN0b3IyKDAuMDUsIDEuMiksXG4gICAgbmV3IFRIUkVFLlZlY3RvcjIoMCwgMS4yNSksXG4gIF1cbiAgcmV0dXJuIG5ldyBUSFJFRS5MYXRoZUdlb21ldHJ5KHBvaW50cywgMjQpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVRdWVlbkdlb21ldHJ5KCk6IFRIUkVFLkxhdGhlR2VvbWV0cnkge1xuICBjb25zdCBwb2ludHMgPSBbXG4gICAgbmV3IFRIUkVFLlZlY3RvcjIoMCwgMCksXG4gICAgbmV3IFRIUkVFLlZlY3RvcjIoMC40MiwgMCksXG4gICAgbmV3IFRIUkVFLlZlY3RvcjIoMC40MiwgMC4wOCksXG4gICAgbmV3IFRIUkVFLlZlY3RvcjIoMC4zNCwgMC4xMiksXG4gICAgbmV3IFRIUkVFLlZlY3RvcjIoMC4yMiwgMC4yNSksXG4gICAgbmV3IFRIUkVFLlZlY3RvcjIoMC4xOCwgMC40NSksXG4gICAgbmV3IFRIUkVFLlZlY3RvcjIoMC4yNCwgMC41NSksXG4gICAgbmV3IFRIUkVFLlZlY3RvcjIoMC4yNCwgMC42KSxcbiAgICBuZXcgVEhSRUUuVmVjdG9yMigwLjE2LCAwLjc1KSxcbiAgICBuZXcgVEhSRUUuVmVjdG9yMigwLjE0LCAwLjk1KSxcbiAgICBuZXcgVEhSRUUuVmVjdG9yMigwLjIyLCAxLjA1KSxcbiAgICBuZXcgVEhSRUUuVmVjdG9yMigwLjI4LCAxLjE1KSxcbiAgICBuZXcgVEhSRUUuVmVjdG9yMigwLjIyLCAxLjI1KSxcbiAgICBuZXcgVEhSRUUuVmVjdG9yMigwLjE1LCAxLjMpLFxuICAgIG5ldyBUSFJFRS5WZWN0b3IyKDAuMDgsIDEuMzUpLFxuICAgIG5ldyBUSFJFRS5WZWN0b3IyKDAsIDEuMzUpLFxuICBdXG4gIHJldHVybiBuZXcgVEhSRUUuTGF0aGVHZW9tZXRyeShwb2ludHMsIDgpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVLaW5nR2VvbWV0cnkoKTogS2luZ0dlb21ldHJ5IHtcbiAgY29uc3QgYmFzZVBvaW50cyA9IFtcbiAgICBuZXcgVEhSRUUuVmVjdG9yMigwLCAwKSxcbiAgICBuZXcgVEhSRUUuVmVjdG9yMigwLjQ0LCAwKSxcbiAgICBuZXcgVEhSRUUuVmVjdG9yMigwLjQ0LCAwLjA4KSxcbiAgICBuZXcgVEhSRUUuVmVjdG9yMigwLjM2LCAwLjEyKSxcbiAgICBuZXcgVEhSRUUuVmVjdG9yMigwLjI0LCAwLjI4KSxcbiAgICBuZXcgVEhSRUUuVmVjdG9yMigwLjIsIDAuNSksXG4gICAgbmV3IFRIUkVFLlZlY3RvcjIoMC4yNiwgMC42KSxcbiAgICBuZXcgVEhSRUUuVmVjdG9yMigwLjI2LCAwLjY1KSxcbiAgICBuZXcgVEhSRUUuVmVjdG9yMigwLjE4LCAwLjgpLFxuICAgIG5ldyBUSFJFRS5WZWN0b3IyKDAuMTYsIDEuMCksXG4gICAgbmV3IFRIUkVFLlZlY3RvcjIoMC4yNCwgMS4xKSxcbiAgICBuZXcgVEhSRUUuVmVjdG9yMigwLjI0LCAxLjIpLFxuICAgIG5ldyBUSFJFRS5WZWN0b3IyKDAuMTgsIDEuMjUpLFxuICAgIG5ldyBUSFJFRS5WZWN0b3IyKDAuMTgsIDEuMyksXG4gICAgbmV3IFRIUkVFLlZlY3RvcjIoMCwgMS4zKSxcbiAgXVxuXG4gIHJldHVybiB7XG4gICAgYmFzZTogbmV3IFRIUkVFLkxhdGhlR2VvbWV0cnkoYmFzZVBvaW50cywgMjQpLFxuICAgIGNyb3NzVjogbmV3IFRIUkVFLkJveEdlb21ldHJ5KDAuMDgsIDAuMjUsIDAuMDgpLFxuICAgIGNyb3NzSDogbmV3IFRIUkVFLkJveEdlb21ldHJ5KDAuMiwgMC4wOCwgMC4wOCksXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNoZWNrZXJHZW9tZXRyeSgpOiBUSFJFRS5DeWxpbmRlckdlb21ldHJ5IHtcbiAgcmV0dXJuIG5ldyBUSFJFRS5DeWxpbmRlckdlb21ldHJ5KDAuNCwgMC40LCAwLjE1LCAzMilcbn1cbiIsImltcG9ydCB7IGNyZWF0ZUNhbnZhcywgY3JlYXRlSW1hZ2UgfSBmcm9tICcuLi8uLi9wbGF0Zm9ybS9kb20nXG5pbXBvcnQgeyBUSFJFRSB9IGZyb20gJy4uLy4uL3BsYXRmb3JtL3RocmVlJ1xuaW1wb3J0IHtcbiAgY3JlYXRlQmlzaG9wR2VvbWV0cnksXG4gIGNyZWF0ZUNoZWNrZXJHZW9tZXRyeSxcbiAgY3JlYXRlS2luZ0dlb21ldHJ5LFxuICBjcmVhdGVLbmlnaHRHZW9tZXRyeSxcbiAgY3JlYXRlUGF3bkdlb21ldHJ5LFxuICBjcmVhdGVRdWVlbkdlb21ldHJ5LFxuICBjcmVhdGVSb29rR2VvbWV0cnksXG59IGZyb20gJy4vZ2VvbWV0cmllcydcblxudHlwZSBQaWVjZVR5cGUgPSAncGF3bicgfCAna25pZ2h0JyB8ICdiaXNob3AnIHwgJ3Jvb2snIHwgJ3F1ZWVuJyB8ICdraW5nJ1xuXG5mdW5jdGlvbiBjcmVhdGUzRFBpZWNlTWVzaChwaWVjZVR5cGU6IFBpZWNlVHlwZSwgaXNXaGl0ZTogYm9vbGVhbik6IFRIUkVFLk9iamVjdDNEIHtcbiAgY29uc3QgY29sb3IgPSBpc1doaXRlID8gMHhmNWY1ZGMgOiAweDJkMmQyZFxuICBjb25zdCBtYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoU3RhbmRhcmRNYXRlcmlhbCh7IGNvbG9yLCByb3VnaG5lc3M6IDAuNCwgbWV0YWxuZXNzOiAwLjEgfSlcblxuICBpZiAocGllY2VUeXBlID09PSAna2luZycpIHtcbiAgICBjb25zdCBnZW9tZXRyaWVzID0gY3JlYXRlS2luZ0dlb21ldHJ5KClcbiAgICBjb25zdCBncm91cCA9IG5ldyBUSFJFRS5Hcm91cCgpXG4gICAgZ3JvdXAuYWRkKG5ldyBUSFJFRS5NZXNoKGdlb21ldHJpZXMuYmFzZSwgbWF0ZXJpYWwpKVxuICAgIGNvbnN0IGNyb3NzViA9IG5ldyBUSFJFRS5NZXNoKGdlb21ldHJpZXMuY3Jvc3NWLCBtYXRlcmlhbClcbiAgICBjcm9zc1YucG9zaXRpb24ueSA9IDEuNDJcbiAgICBncm91cC5hZGQoY3Jvc3NWKVxuICAgIGNvbnN0IGNyb3NzSCA9IG5ldyBUSFJFRS5NZXNoKGdlb21ldHJpZXMuY3Jvc3NILCBtYXRlcmlhbClcbiAgICBjcm9zc0gucG9zaXRpb24ueSA9IDEuMzhcbiAgICBncm91cC5hZGQoY3Jvc3NIKVxuICAgIHJldHVybiBncm91cFxuICB9XG5cbiAgbGV0IGdlb21ldHJ5OiBUSFJFRS5CdWZmZXJHZW9tZXRyeVxuICBpZiAocGllY2VUeXBlID09PSAncGF3bicpIGdlb21ldHJ5ID0gY3JlYXRlUGF3bkdlb21ldHJ5KClcbiAgZWxzZSBpZiAocGllY2VUeXBlID09PSAncm9vaycpIGdlb21ldHJ5ID0gY3JlYXRlUm9va0dlb21ldHJ5KClcbiAgZWxzZSBpZiAocGllY2VUeXBlID09PSAna25pZ2h0JykgZ2VvbWV0cnkgPSBjcmVhdGVLbmlnaHRHZW9tZXRyeSgpXG4gIGVsc2UgaWYgKHBpZWNlVHlwZSA9PT0gJ2Jpc2hvcCcpIGdlb21ldHJ5ID0gY3JlYXRlQmlzaG9wR2VvbWV0cnkoKVxuICBlbHNlIGdlb21ldHJ5ID0gY3JlYXRlUXVlZW5HZW9tZXRyeSgpXG5cbiAgY29uc3QgbWVzaCA9IG5ldyBUSFJFRS5NZXNoKGdlb21ldHJ5LCBtYXRlcmlhbClcblxuICBpZiAocGllY2VUeXBlID09PSAna25pZ2h0Jykge1xuICAgIG1lc2gucm90YXRpb24ueSA9IGlzV2hpdGUgPyAwIDogTWF0aC5QSVxuICAgIG1lc2gucG9zaXRpb24ueCA9IGlzV2hpdGUgPyAwLjA1IDogLTAuMDVcbiAgICBtZXNoLnBvc2l0aW9uLnogPSBpc1doaXRlID8gLTAuMTEgOiAwLjExXG4gIH1cblxuICByZXR1cm4gbWVzaFxufVxuXG5mdW5jdGlvbiBjcmVhdGVDaGVja2VyUGllY2VNZXNoKFxuICBpc1doaXRlOiBib29sZWFuLFxuICB3aGl0ZUNvbG9yOiBudW1iZXIsXG4gIGJsYWNrQ29sb3I6IG51bWJlclxuKTogVEhSRUUuTWVzaCB7XG4gIGNvbnN0IGNvbG9yID0gaXNXaGl0ZSA/IHdoaXRlQ29sb3IgOiBibGFja0NvbG9yXG4gIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHsgY29sb3IgfSlcbiAgY29uc3QgZ2VvbWV0cnkgPSBjcmVhdGVDaGVja2VyR2VvbWV0cnkoKVxuICBjb25zdCBtZXNoID0gbmV3IFRIUkVFLk1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKVxuICBtZXNoLnBvc2l0aW9uLnkgPSAwLjA3NVxuICByZXR1cm4gbWVzaFxufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9hZFRleHR1cmVGcm9tSW1hZ2UoXG4gIGltZzogSFRNTEltYWdlRWxlbWVudCxcbiAgbWF0ZXJpYWw6IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsXG4pOiB2b2lkIHtcbiAgY29uc3QgY2FudmFzID0gY3JlYXRlQ2FudmFzKClcbiAgY2FudmFzLndpZHRoID0gMjU2XG4gIGNhbnZhcy5oZWlnaHQgPSAyNTZcbiAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJylcbiAgaWYgKCFjdHgpIHJldHVyblxuICBjdHguZHJhd0ltYWdlKGltZywgMCwgMCwgMjU2LCAyNTYpXG4gIGNvbnN0IHRleHR1cmUgPSBuZXcgVEhSRUUuVGV4dHVyZShjYW52YXMpXG4gIHRleHR1cmUubmVlZHNVcGRhdGUgPSB0cnVlXG4gIG1hdGVyaWFsLm1hcCA9IHRleHR1cmVcbiAgbWF0ZXJpYWwubmVlZHNVcGRhdGUgPSB0cnVlXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUljb25QaWVjZU1lc2gocGllY2VUeXBlOiBQaWVjZVR5cGUsIGlzV2hpdGU6IGJvb2xlYW4pOiBUSFJFRS5NZXNoIHtcbiAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuUGxhbmVHZW9tZXRyeSgxLjQsIDEuNClcbiAgY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgIHNpZGU6IFRIUkVFLkRvdWJsZVNpZGUsXG4gICAgZGVwdGhXcml0ZTogZmFsc2UsXG4gIH0pXG5cbiAgY29uc3QgbWVzaCA9IG5ldyBUSFJFRS5NZXNoKGdlb21ldHJ5LCBtYXRlcmlhbClcbiAgbWVzaC5yb3RhdGlvbi54ID0gLU1hdGguUEkgLyAyXG4gIG1lc2gucG9zaXRpb24ueSA9IDAuMDFcblxuICAvLyBMb2FkIFNWRyB0ZXh0dXJlIGFzeW5jaHJvbm91c2x5XG4gIGNvbnN0IGNvbG9yQ2hhciA9IGlzV2hpdGUgPyAndycgOiAnYidcbiAgY29uc3QgcGllY2VDaGFyID0gcGllY2VUeXBlID09PSAna25pZ2h0JyA/ICdOJyA6IHBpZWNlVHlwZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKVxuICBjb25zdCB1cmwgPSBgaHR0cHM6Ly9saWNoZXNzMS5vcmcvYXNzZXRzL3BpZWNlL2NidXJuZXR0LyR7Y29sb3JDaGFyfSR7cGllY2VDaGFyfS5zdmdgXG5cbiAgY29uc3QgaW1nID0gY3JlYXRlSW1hZ2UoKVxuICBpbWcuY3Jvc3NPcmlnaW4gPSAnYW5vbnltb3VzJ1xuICBpbWcub25sb2FkID0gKCkgPT4ge1xuICAgIGxvYWRUZXh0dXJlRnJvbUltYWdlKGltZywgbWF0ZXJpYWwpXG4gIH1cbiAgaW1nLnNyYyA9IHVybFxuXG4gIHJldHVybiBtZXNoXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQaWVjZU1lc2goXG4gIHBpZWNlVHlwZTogUGllY2VUeXBlLFxuICBpc1doaXRlOiBib29sZWFuLFxuICBzdHlsZTogc3RyaW5nXG4pOiBUSFJFRS5PYmplY3QzRCB8IG51bGwge1xuICBzd2l0Y2ggKHN0eWxlKSB7XG4gICAgY2FzZSAnM2QnOlxuICAgICAgcmV0dXJuIGNyZWF0ZTNEUGllY2VNZXNoKHBpZWNlVHlwZSwgaXNXaGl0ZSlcbiAgICBjYXNlICdjaGVja2VyJzpcbiAgICAgIHJldHVybiBjcmVhdGVDaGVja2VyUGllY2VNZXNoKGlzV2hpdGUsIDB4ZThlOGU4LCAweDFhMWExYSlcbiAgICBjYXNlICdjaGVja2VyLWdyZXknOlxuICAgICAgcmV0dXJuIGNyZWF0ZUNoZWNrZXJQaWVjZU1lc2goaXNXaGl0ZSwgMHg1MDUwNTAsIDB4NTA1MDUwKVxuICAgIGNhc2UgJ2JsaW5kZm9sZCc6XG4gICAgICByZXR1cm4gbnVsbFxuICAgIGNhc2UgJ2ljb25zJzpcbiAgICAgIHJldHVybiBjcmVhdGVJY29uUGllY2VNZXNoKHBpZWNlVHlwZSwgaXNXaGl0ZSlcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGNyZWF0ZUljb25QaWVjZU1lc2gocGllY2VUeXBlLCBpc1doaXRlKVxuICB9XG59XG4iLCJpbXBvcnQgeyBEb21TZWxlY3RvciB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy9kb20nXG5pbXBvcnQgeyBwaXhlbFBvc2l0aW9uVG8zRCB9IGZyb20gJy4uLy4uL2RvbWFpbi9jaGVzcy9ib2FyZFBvc2l0aW9uM2QnXG5pbXBvcnQgeyBxdWVyeVNlbGVjdG9yIH0gZnJvbSAnLi4vLi4vcGxhdGZvcm0vZG9tJ1xuaW1wb3J0IHsgVEhSRUUgfSBmcm9tICcuLi8uLi9wbGF0Zm9ybS90aHJlZSdcbmltcG9ydCB0eXBlIHsgQ2FudmFzM0RTdGF0ZSB9IGZyb20gJy4vY2FudmFzJ1xuaW1wb3J0IHsgY3JlYXRlUGllY2VNZXNoIH0gZnJvbSAnLi9waWVjZU1lc2gnXG5cbmV4cG9ydCBpbnRlcmZhY2UgUGllY2VNYW5hZ2VyU3RhdGUge1xuICBtZXNoZXM6IFRIUkVFLk9iamVjdDNEW11cbiAgbWVzaE1hcDogTWFwPHN0cmluZywgVEhSRUUuT2JqZWN0M0Q+XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQaWVjZU1hbmFnZXIoKTogUGllY2VNYW5hZ2VyU3RhdGUge1xuICByZXR1cm4geyBtZXNoZXM6IFtdLCBtZXNoTWFwOiBuZXcgTWFwKCkgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlUGllY2VzKFxuICBjYW52YXNTdGF0ZTogQ2FudmFzM0RTdGF0ZSxcbiAgcGllY2VNYW5hZ2VyU3RhdGU6IFBpZWNlTWFuYWdlclN0YXRlLFxuICBwaWVjZVN0eWxlOiBzdHJpbmcsXG4gIGlzRmxpcHBlZDogYm9vbGVhbixcbiAgYmxhY2tlZE91dFF1YWRyYW50czogbnVtYmVyW11cbik6IHZvaWQge1xuICBjb25zdCBib2FyZCA9IHF1ZXJ5U2VsZWN0b3IoRG9tU2VsZWN0b3IuQk9BUkQpIGFzIEhUTUxFbGVtZW50IHwgbnVsbFxuICBpZiAoIWJvYXJkKSByZXR1cm5cblxuICBjb25zdCBib2FyZFJlY3QgPSBib2FyZC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICBjb25zdCBib2FyZFNpemUgPSBib2FyZFJlY3Qud2lkdGhcbiAgY29uc3Qgc3F1YXJlU2l6ZSA9IGJvYXJkU2l6ZSAvIDhcbiAgY29uc3QgcGllY2VFbGVtZW50cyA9IGJvYXJkLnF1ZXJ5U2VsZWN0b3JBbGwoJ3BpZWNlJylcbiAgY29uc3QgY3VycmVudFBpZWNlSWRzID0gbmV3IFNldDxzdHJpbmc+KClcblxuICBmb3IgKGNvbnN0IHBpZWNlRWwgb2YgcGllY2VFbGVtZW50cykge1xuICAgIGNvbnN0IGNsYXNzZXMgPSBwaWVjZUVsLmNsYXNzTmFtZVxuICAgIGNvbnN0IG1hdGNoID0gY2xhc3Nlcy5tYXRjaCgvXih3aGl0ZXxibGFjaylcXHMrKGtpbmd8cXVlZW58cm9va3xiaXNob3B8a25pZ2h0fHBhd24pLylcbiAgICBpZiAoIW1hdGNoKSBjb250aW51ZVxuICAgIGlmIChwaWVjZUVsLmNsYXNzTGlzdC5jb250YWlucygnZ2hvc3QnKSkgY29udGludWVcblxuICAgIGNvbnN0IGNvbG91ciA9IG1hdGNoWzFdIGFzICd3aGl0ZScgfCAnYmxhY2snXG4gICAgY29uc3QgdHlwZSA9IG1hdGNoWzJdIGFzICdwYXduJyB8ICdrbmlnaHQnIHwgJ2Jpc2hvcCcgfCAncm9vaycgfCAncXVlZW4nIHwgJ2tpbmcnXG5cbiAgICBjb25zdCBlbCA9IHBpZWNlRWwgYXMgSFRNTEVsZW1lbnRcbiAgICBjb25zdCBwaXhlbFBvcyA9IGdldFBpeGVsUG9zaXRpb24oZWwpXG4gICAgaWYgKCFwaXhlbFBvcykgY29udGludWVcblxuICAgIGNvbnN0IHBpZWNlSWQgPSBgJHtjb2xvdXJ9LSR7dHlwZX0tJHtNYXRoLnJvdW5kKHBpeGVsUG9zLngpfS0ke01hdGgucm91bmQocGl4ZWxQb3MueSl9YFxuICAgIGN1cnJlbnRQaWVjZUlkcy5hZGQocGllY2VJZClcblxuICAgIGxldCBtZXNoID0gcGllY2VNYW5hZ2VyU3RhdGUubWVzaE1hcC5nZXQocGllY2VJZClcblxuICAgIC8vIFRyeSB0byByZXVzZSBleGlzdGluZyBtZXNoIG9mIHNhbWUgdHlwZVxuICAgIGlmICghbWVzaCkge1xuICAgICAgZm9yIChjb25zdCBba2V5LCBleGlzdGluZ01lc2hdIG9mIHBpZWNlTWFuYWdlclN0YXRlLm1lc2hNYXAuZW50cmllcygpKSB7XG4gICAgICAgIGlmIChrZXkuc3RhcnRzV2l0aChgJHtjb2xvdXJ9LSR7dHlwZX0tYCkgJiYgIWN1cnJlbnRQaWVjZUlkcy5oYXMoa2V5KSkge1xuICAgICAgICAgIG1lc2ggPSBleGlzdGluZ01lc2hcbiAgICAgICAgICBwaWVjZU1hbmFnZXJTdGF0ZS5tZXNoTWFwLmRlbGV0ZShrZXkpXG4gICAgICAgICAgcGllY2VNYW5hZ2VyU3RhdGUubWVzaE1hcC5zZXQocGllY2VJZCwgbWVzaClcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ3JlYXRlIG5ldyBtZXNoIGlmIG5lZWRlZFxuICAgIGlmICghbWVzaCkge1xuICAgICAgY29uc3QgbmV3TWVzaCA9IGNyZWF0ZVBpZWNlTWVzaCh0eXBlLCBjb2xvdXIgPT09ICd3aGl0ZScsIHBpZWNlU3R5bGUpXG4gICAgICBpZiAoIW5ld01lc2gpIGNvbnRpbnVlXG5cbiAgICAgIG1lc2ggPSBuZXdNZXNoXG4gICAgICBjb25zdCBzY2FsZSA9IDAuNjVcbiAgICAgIG1lc2guc2NhbGUuc2V0KHNjYWxlLCBzY2FsZSwgc2NhbGUpXG4gICAgICBjYW52YXNTdGF0ZS5zY2VuZS5hZGQobWVzaClcbiAgICAgIHBpZWNlTWFuYWdlclN0YXRlLm1lc2hlcy5wdXNoKG1lc2gpXG4gICAgICBwaWVjZU1hbmFnZXJTdGF0ZS5tZXNoTWFwLnNldChwaWVjZUlkLCBtZXNoKVxuICAgIH1cblxuICAgIC8vIFVwZGF0ZSBwb3NpdGlvblxuICAgIGNvbnN0IGNlbnRlck9mZnNldCA9IHNxdWFyZVNpemUgLyAyXG4gICAgY29uc3QgcG9zM0QgPSBwaXhlbFBvc2l0aW9uVG8zRChcbiAgICAgIHBpeGVsUG9zLnggKyBjZW50ZXJPZmZzZXQsXG4gICAgICBwaXhlbFBvcy55ICsgY2VudGVyT2Zmc2V0LFxuICAgICAgYm9hcmRTaXplLFxuICAgICAgaXNGbGlwcGVkXG4gICAgKVxuICAgIG1lc2gucG9zaXRpb24ueCA9IHBvczNELnhcbiAgICBtZXNoLnBvc2l0aW9uLnogPSBwb3MzRC56XG5cbiAgICAvLyBTdG9yZSBncmlkIHBvc2l0aW9uIGZvciB2aXNpYmlsaXR5XG4gICAgY29uc3QgY29sID0gTWF0aC5yb3VuZChwaXhlbFBvcy54IC8gc3F1YXJlU2l6ZSlcbiAgICBjb25zdCByb3cgPSBNYXRoLnJvdW5kKHBpeGVsUG9zLnkgLyBzcXVhcmVTaXplKVxuICAgIG1lc2gudXNlckRhdGEuY29sID0gY29sXG4gICAgbWVzaC51c2VyRGF0YS5yb3cgPSByb3dcblxuICAgIC8vIFJvdGF0ZSBpY29ucyBmb3IgYm9hcmQgZmxpcFxuICAgIGlmIChwaWVjZVN0eWxlID09PSAnaWNvbnMnKSB7XG4gICAgICBtZXNoLnJvdGF0aW9uLnogPSBpc0ZsaXBwZWQgPyAwIDogTWF0aC5QSVxuICAgIH1cblxuICAgIC8vIEhpZGUgcGllY2VzIGluIGJsYWNrZWQgb3V0IHF1YWRyYW50c1xuICAgIG1lc2gudmlzaWJsZSA9ICFpc1Bvc2l0aW9uQmxhY2tlZE91dChjb2wsIHJvdywgYmxhY2tlZE91dFF1YWRyYW50cylcbiAgfVxuXG4gIC8vIFJlbW92ZSBtZXNoZXMgbm8gbG9uZ2VyIG9uIHRoZSBib2FyZFxuICBmb3IgKGNvbnN0IFtrZXksIG1lc2hdIG9mIHBpZWNlTWFuYWdlclN0YXRlLm1lc2hNYXAuZW50cmllcygpKSB7XG4gICAgaWYgKCFjdXJyZW50UGllY2VJZHMuaGFzKGtleSkpIHtcbiAgICAgIGNhbnZhc1N0YXRlLnNjZW5lLnJlbW92ZShtZXNoKVxuICAgICAgZGlzcG9zZU1lc2gobWVzaClcbiAgICAgIHBpZWNlTWFuYWdlclN0YXRlLm1lc2hNYXAuZGVsZXRlKGtleSlcbiAgICAgIGNvbnN0IGlkeCA9IHBpZWNlTWFuYWdlclN0YXRlLm1lc2hlcy5pbmRleE9mKG1lc2gpXG4gICAgICBpZiAoaWR4ID4gLTEpIHBpZWNlTWFuYWdlclN0YXRlLm1lc2hlcy5zcGxpY2UoaWR4LCAxKVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJBbGxQaWVjZXMoXG4gIGNhbnZhc1N0YXRlOiBDYW52YXMzRFN0YXRlLFxuICBwaWVjZU1hbmFnZXJTdGF0ZTogUGllY2VNYW5hZ2VyU3RhdGVcbik6IHZvaWQge1xuICBmb3IgKGNvbnN0IG1lc2ggb2YgcGllY2VNYW5hZ2VyU3RhdGUubWVzaGVzKSB7XG4gICAgY2FudmFzU3RhdGUuc2NlbmUucmVtb3ZlKG1lc2gpXG4gICAgZGlzcG9zZU1lc2gobWVzaClcbiAgfVxuICBwaWVjZU1hbmFnZXJTdGF0ZS5tZXNoZXMgPSBbXVxuICBwaWVjZU1hbmFnZXJTdGF0ZS5tZXNoTWFwLmNsZWFyKClcbn1cblxuZnVuY3Rpb24gZ2V0UGl4ZWxQb3NpdGlvbihlbDogSFRNTEVsZW1lbnQpOiB7IHg6IG51bWJlcjsgeTogbnVtYmVyIH0gfCBudWxsIHtcbiAgY29uc3QgY29tcHV0ZWRUcmFuc2Zvcm0gPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbCkudHJhbnNmb3JtXG4gIGlmIChjb21wdXRlZFRyYW5zZm9ybSAmJiBjb21wdXRlZFRyYW5zZm9ybSAhPT0gJ25vbmUnKSB7XG4gICAgY29uc3QgbWF0cml4TWF0Y2ggPSBjb21wdXRlZFRyYW5zZm9ybS5tYXRjaCgvbWF0cml4XFwoKFteKV0rKVxcKS8pXG4gICAgaWYgKG1hdHJpeE1hdGNoKSB7XG4gICAgICBjb25zdCB2YWx1ZXMgPSBtYXRyaXhNYXRjaFsxXS5zcGxpdCgnLCcpLm1hcCgodikgPT4gTnVtYmVyLnBhcnNlRmxvYXQodi50cmltKCkpKVxuICAgICAgcmV0dXJuIHsgeDogdmFsdWVzWzRdLCB5OiB2YWx1ZXNbNV0gfVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGlubGluZVRyYW5zZm9ybSA9IGVsLnN0eWxlLnRyYW5zZm9ybVxuICBjb25zdCB0cmFuc2xhdGVNYXRjaCA9IGlubGluZVRyYW5zZm9ybS5tYXRjaCgvdHJhbnNsYXRlXFwoKFtcXGQuXSspcHgoPzosXFxzKihbXFxkLl0rKXB4KT9cXCkvKVxuICBpZiAodHJhbnNsYXRlTWF0Y2gpIHtcbiAgICByZXR1cm4ge1xuICAgICAgeDogTnVtYmVyLnBhcnNlRmxvYXQodHJhbnNsYXRlTWF0Y2hbMV0pLFxuICAgICAgeTogTnVtYmVyLnBhcnNlRmxvYXQodHJhbnNsYXRlTWF0Y2hbMl0gfHwgJzAnKSxcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbnVsbFxufVxuXG5mdW5jdGlvbiBkaXNwb3NlTWVzaChvYmo6IFRIUkVFLk9iamVjdDNEKTogdm9pZCB7XG4gIGlmIChvYmogaW5zdGFuY2VvZiBUSFJFRS5NZXNoKSB7XG4gICAgb2JqLmdlb21ldHJ5Py5kaXNwb3NlKClcbiAgICBpZiAob2JqLm1hdGVyaWFsIGluc3RhbmNlb2YgVEhSRUUuTWF0ZXJpYWwpIHtcbiAgICAgIG9iai5tYXRlcmlhbC5kaXNwb3NlKClcbiAgICB9XG4gIH1cbiAgZm9yIChjb25zdCBjaGlsZCBvZiBvYmouY2hpbGRyZW4pIHtcbiAgICBkaXNwb3NlTWVzaChjaGlsZClcbiAgfVxufVxuXG5mdW5jdGlvbiBpc1Bvc2l0aW9uQmxhY2tlZE91dChjb2w6IG51bWJlciwgcm93OiBudW1iZXIsIHF1YWRyYW50czogbnVtYmVyW10pOiBib29sZWFuIHtcbiAgaWYgKHF1YWRyYW50cy5sZW5ndGggPT09IDApIHJldHVybiBmYWxzZVxuICBjb25zdCBpc0xlZnQgPSBjb2wgPCA0XG4gIGNvbnN0IGlzVG9wID0gcm93IDwgNFxuICBsZXQgcXVhZHJhbnQ6IG51bWJlclxuICBpZiAoaXNUb3AgJiYgaXNMZWZ0KSBxdWFkcmFudCA9IDBcbiAgZWxzZSBpZiAoaXNUb3AgJiYgIWlzTGVmdCkgcXVhZHJhbnQgPSAxXG4gIGVsc2UgaWYgKCFpc1RvcCAmJiBpc0xlZnQpIHF1YWRyYW50ID0gMlxuICBlbHNlIHF1YWRyYW50ID0gM1xuICByZXR1cm4gcXVhZHJhbnRzLmluY2x1ZGVzKHF1YWRyYW50KVxufVxuIiwiaW1wb3J0IHsgZ2V0QmxhY2tlZE91dFF1YWRyYW50cywgZ2V0VGltaW5nTXMgfSBmcm9tICcuLi8uLi9kb21haW4vY2hlc3MvYmxhY2tTZWdtZW50cydcbmltcG9ydCB7IHF1ZXJ5U2VsZWN0b3IgfSBmcm9tICcuLi8uLi9wbGF0Zm9ybS9kb20nXG5pbXBvcnQgeyBjcmVhdGVCb2FyZFBsYW5lIH0gZnJvbSAnLi4vLi4vcHJlc2VudGF0aW9uLzNkL2JvYXJkUGxhbmUnXG5pbXBvcnQgeyByZW5kZXIzRCB9IGZyb20gJy4uLy4uL3ByZXNlbnRhdGlvbi8zZC9jYW52YXMnXG5pbXBvcnQgeyB1cGRhdGVQaWVjZXMgfSBmcm9tICcuLi8uLi9wcmVzZW50YXRpb24vM2QvcGllY2VNYW5hZ2VyJ1xuaW1wb3J0IHR5cGUgeyBTZXR0aW5nc1N0b3JlIH0gZnJvbSAnLi4vc2V0dGluZ3Mvc2V0dGluZ3NTdG9yZSdcbmltcG9ydCB0eXBlIHsgQ3VzdG9tQm9hcmRTdGF0ZSB9IGZyb20gJy4vaGFuZGxlQ3VzdG9tQm9hcmQnXG5cbmV4cG9ydCBpbnRlcmZhY2UgQmxhY2tTZWdtZW50c1N0YXRlIHtcbiAgY291bnRlcjogbnVtYmVyXG4gIGludGVydmFsSWQ6IFJldHVyblR5cGU8dHlwZW9mIHNldEludGVydmFsPiB8IG51bGxcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUJsYWNrU2VnbWVudHNTdGF0ZSgpOiBCbGFja1NlZ21lbnRzU3RhdGUge1xuICByZXR1cm4geyBjb3VudGVyOiAwLCBpbnRlcnZhbElkOiBudWxsIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0QmxhY2tTZWdtZW50c0ludGVydmFsKFxuICBzZWdTdGF0ZTogQmxhY2tTZWdtZW50c1N0YXRlLFxuICBjdXN0b21Cb2FyZFN0YXRlOiBDdXN0b21Cb2FyZFN0YXRlLFxuICBzZXR0aW5nczogU2V0dGluZ3NTdG9yZVxuKTogdm9pZCB7XG4gIHN0b3BCbGFja1NlZ21lbnRzSW50ZXJ2YWwoc2VnU3RhdGUpXG5cbiAgY29uc3QgdGltaW5nTXMgPSBnZXRUaW1pbmdNcyhzZXR0aW5ncy5ibGFja1NlZ21lbnRzVGltaW5nLnZhbHVlKVxuICBpZiAodGltaW5nTXMgPT09IG51bGwpIHJldHVyblxuXG4gIHNlZ1N0YXRlLmludGVydmFsSWQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgc2VnU3RhdGUuY291bnRlcisrXG4gICAgYXBwbHlCbGFja1NlZ21lbnRzKHNlZ1N0YXRlLCBjdXN0b21Cb2FyZFN0YXRlLCBzZXR0aW5ncylcbiAgfSwgdGltaW5nTXMpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdG9wQmxhY2tTZWdtZW50c0ludGVydmFsKHNlZ1N0YXRlOiBCbGFja1NlZ21lbnRzU3RhdGUpOiB2b2lkIHtcbiAgaWYgKHNlZ1N0YXRlLmludGVydmFsSWQgIT09IG51bGwpIHtcbiAgICBjbGVhckludGVydmFsKHNlZ1N0YXRlLmludGVydmFsSWQpXG4gICAgc2VnU3RhdGUuaW50ZXJ2YWxJZCA9IG51bGxcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlCbGFja1NlZ21lbnRzKFxuICBzZWdTdGF0ZTogQmxhY2tTZWdtZW50c1N0YXRlLFxuICBjdXN0b21Cb2FyZFN0YXRlOiBDdXN0b21Cb2FyZFN0YXRlLFxuICBzZXR0aW5nczogU2V0dGluZ3NTdG9yZVxuKTogdm9pZCB7XG4gIGlmICghY3VzdG9tQm9hcmRTdGF0ZS5jYW52YXMpIHJldHVyblxuXG4gIGNvbnN0IHF1YWRyYW50cyA9IGdldEJsYWNrZWRPdXRRdWFkcmFudHMoc2V0dGluZ3MuYmxhY2tTZWdtZW50cy52YWx1ZSwgc2VnU3RhdGUuY291bnRlcilcblxuICAvLyBSZWJ1aWxkIGJvYXJkIHBsYW5lXG4gIGNvbnN0IGV4aXN0aW5nQm9hcmQgPSBjdXN0b21Cb2FyZFN0YXRlLmNhbnZhcy5zY2VuZS5nZXRPYmplY3RCeU5hbWUoXG4gICAgY3VzdG9tQm9hcmRTdGF0ZS5ib2FyZFBsYW5lTmFtZVxuICApXG4gIGlmIChleGlzdGluZ0JvYXJkKSB7XG4gICAgY3VzdG9tQm9hcmRTdGF0ZS5jYW52YXMuc2NlbmUucmVtb3ZlKGV4aXN0aW5nQm9hcmQpXG4gIH1cbiAgY29uc3QgbmV3Qm9hcmQgPSBjcmVhdGVCb2FyZFBsYW5lKHF1YWRyYW50cylcbiAgbmV3Qm9hcmQubmFtZSA9IGN1c3RvbUJvYXJkU3RhdGUuYm9hcmRQbGFuZU5hbWVcbiAgY3VzdG9tQm9hcmRTdGF0ZS5jYW52YXMuc2NlbmUuYWRkKG5ld0JvYXJkKVxuXG4gIC8vIFVwZGF0ZSBwaWVjZSB2aXNpYmlsaXR5XG4gIGNvbnN0IGNvb3JkcyA9IHF1ZXJ5U2VsZWN0b3IoJ2Nvb3JkcycpXG4gIGNvbnN0IGlzRmxpcHBlZCA9IGNvb3Jkcz8uY2xhc3NMaXN0LmNvbnRhaW5zKCdibGFjaycpID8/IGZhbHNlXG4gIGNvbnN0IHN0eWxlID0gc2V0dGluZ3Mub2JmdXNjYXRpb25zRW5hYmxlZC52YWx1ZSA/IHNldHRpbmdzLnBpZWNlU3R5bGUudmFsdWUgOiAnaWNvbnMnXG4gIHVwZGF0ZVBpZWNlcyhjdXN0b21Cb2FyZFN0YXRlLmNhbnZhcywgY3VzdG9tQm9hcmRTdGF0ZS5waWVjZU1hbmFnZXIsIHN0eWxlLCBpc0ZsaXBwZWQsIHF1YWRyYW50cylcblxuICByZW5kZXIzRChjdXN0b21Cb2FyZFN0YXRlLmNhbnZhcylcbn1cbiIsImltcG9ydCB7IGVmZmVjdCB9IGZyb20gJ0BwcmVhY3Qvc2lnbmFscy1jb3JlJ1xuaW1wb3J0IHtcbiAgdHlwZSBCbGFja1NlZ21lbnRzU3RhdGUsXG4gIGFwcGx5QmxhY2tTZWdtZW50cyxcbiAgc3RhcnRCbGFja1NlZ21lbnRzSW50ZXJ2YWwsXG4gIHN0b3BCbGFja1NlZ21lbnRzSW50ZXJ2YWwsXG59IGZyb20gJy4uL2hhbmRsZXJzL2hhbmRsZUJsYWNrU2VnbWVudHMnXG5pbXBvcnQgdHlwZSB7IEN1c3RvbUJvYXJkU3RhdGUgfSBmcm9tICcuLi9oYW5kbGVycy9oYW5kbGVDdXN0b21Cb2FyZCdcbmltcG9ydCB0eXBlIHsgU2V0dGluZ3NTdG9yZSB9IGZyb20gJy4uL3NldHRpbmdzL3NldHRpbmdzU3RvcmUnXG5cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cEJsYWNrU2VnbWVudHNFZmZlY3QoXG4gIHNlZ1N0YXRlOiBCbGFja1NlZ21lbnRzU3RhdGUsXG4gIGN1c3RvbUJvYXJkU3RhdGU6IEN1c3RvbUJvYXJkU3RhdGUsXG4gIHNldHRpbmdzOiBTZXR0aW5nc1N0b3JlXG4pOiAoKSA9PiB2b2lkIHtcbiAgcmV0dXJuIGVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgbW9kZSA9IHNldHRpbmdzLmJsYWNrU2VnbWVudHMudmFsdWVcbiAgICB2b2lkIHNldHRpbmdzLmJsYWNrU2VnbWVudHNUaW1pbmcudmFsdWUgLy8gU3Vic2NyaWJlIHRvIHRpbWluZyBjaGFuZ2VzXG4gICAgY29uc3Qgb2JmdXNjYXRpb25zRW5hYmxlZCA9IHNldHRpbmdzLm9iZnVzY2F0aW9uc0VuYWJsZWQudmFsdWVcblxuICAgIGlmICghb2JmdXNjYXRpb25zRW5hYmxlZCB8fCBtb2RlID09PSAnbm9uZScgfHwgIWN1c3RvbUJvYXJkU3RhdGUuY2FudmFzKSB7XG4gICAgICBzdG9wQmxhY2tTZWdtZW50c0ludGVydmFsKHNlZ1N0YXRlKVxuICAgICAgaWYgKGN1c3RvbUJvYXJkU3RhdGUuY2FudmFzKSB7XG4gICAgICAgIGFwcGx5QmxhY2tTZWdtZW50cyhzZWdTdGF0ZSwgY3VzdG9tQm9hcmRTdGF0ZSwgc2V0dGluZ3MpXG4gICAgICB9XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBhcHBseUJsYWNrU2VnbWVudHMoc2VnU3RhdGUsIGN1c3RvbUJvYXJkU3RhdGUsIHNldHRpbmdzKVxuICAgIHN0YXJ0QmxhY2tTZWdtZW50c0ludGVydmFsKHNlZ1N0YXRlLCBjdXN0b21Cb2FyZFN0YXRlLCBzZXR0aW5ncylcbiAgfSlcbn1cbiIsImltcG9ydCB7IERvbVNlbGVjdG9yIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL2RvbSdcbmltcG9ydCB7IHF1ZXJ5U2VsZWN0b3IgfSBmcm9tICcuLi8uLi9wbGF0Zm9ybS9kb20nXG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBseUJsdXIoYW1vdW50OiBudW1iZXIpOiB2b2lkIHtcbiAgY29uc3QgY29udGFpbmVyID0gcXVlcnlTZWxlY3RvcihEb21TZWxlY3Rvci5DT05UQUlORVIpIGFzIEhUTUxFbGVtZW50IHwgbnVsbFxuICBpZiAoIWNvbnRhaW5lcikgcmV0dXJuXG5cbiAgaWYgKGFtb3VudCA9PT0gMCkge1xuICAgIGNvbnRhaW5lci5zdHlsZS5maWx0ZXIgPSAnJ1xuICB9IGVsc2Uge1xuICAgIGNvbnRhaW5lci5zdHlsZS5maWx0ZXIgPSBgYmx1cigke2Ftb3VudH1weClgXG4gIH1cbn1cbiIsImltcG9ydCB7IGVmZmVjdCB9IGZyb20gJ0BwcmVhY3Qvc2lnbmFscy1jb3JlJ1xuaW1wb3J0IHsgYXBwbHlCbHVyIH0gZnJvbSAnLi4vaGFuZGxlcnMvYXBwbHlCbHVyJ1xuaW1wb3J0IHR5cGUgeyBTZXR0aW5nc1N0b3JlIH0gZnJvbSAnLi4vc2V0dGluZ3Mvc2V0dGluZ3NTdG9yZSdcblxuZXhwb3J0IGZ1bmN0aW9uIHNldHVwQmx1ckVmZmVjdChzZXR0aW5nczogU2V0dGluZ3NTdG9yZSk6ICgpID0+IHZvaWQge1xuICByZXR1cm4gZWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBvYmZ1c2NhdGlvbnNFbmFibGVkID0gc2V0dGluZ3Mub2JmdXNjYXRpb25zRW5hYmxlZC52YWx1ZVxuICAgIGNvbnN0IGJsdXIgPSBzZXR0aW5ncy5ibHVyLnZhbHVlXG5cbiAgICBpZiAob2JmdXNjYXRpb25zRW5hYmxlZCkge1xuICAgICAgYXBwbHlCbHVyKGJsdXIpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwcGx5Qmx1cigwKVxuICAgIH1cbiAgfSlcbn1cbiIsImltcG9ydCB7IERvbVNlbGVjdG9yIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL2RvbSdcbmltcG9ydCB7IHF1ZXJ5U2VsZWN0b3IgfSBmcm9tICcuLi8uLi9wbGF0Zm9ybS9kb20nXG5pbXBvcnQgeyBjcmVhdGVCb2FyZFBsYW5lIH0gZnJvbSAnLi4vLi4vcHJlc2VudGF0aW9uLzNkL2JvYXJkUGxhbmUnXG5pbXBvcnQge1xuICB0eXBlIENhbnZhczNEU3RhdGUsXG4gIGNyZWF0ZTNEQ2FudmFzLFxuICBkZXN0cm95M0RDYW52YXMsXG4gIHJlbmRlcjNELFxufSBmcm9tICcuLi8uLi9wcmVzZW50YXRpb24vM2QvY2FudmFzJ1xuaW1wb3J0IHtcbiAgdHlwZSBQaWVjZU1hbmFnZXJTdGF0ZSxcbiAgY2xlYXJBbGxQaWVjZXMsXG4gIGNyZWF0ZVBpZWNlTWFuYWdlcixcbiAgdXBkYXRlUGllY2VzLFxufSBmcm9tICcuLi8uLi9wcmVzZW50YXRpb24vM2QvcGllY2VNYW5hZ2VyJ1xuaW1wb3J0IHR5cGUgeyBTZXR0aW5nc1N0b3JlIH0gZnJvbSAnLi4vc2V0dGluZ3Mvc2V0dGluZ3NTdG9yZSdcblxuZXhwb3J0IGludGVyZmFjZSBDdXN0b21Cb2FyZFN0YXRlIHtcbiAgY2FudmFzOiBDYW52YXMzRFN0YXRlIHwgbnVsbFxuICBwaWVjZU1hbmFnZXI6IFBpZWNlTWFuYWdlclN0YXRlXG4gIGJvYXJkUGxhbmVOYW1lOiBzdHJpbmdcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUN1c3RvbUJvYXJkU3RhdGUoKTogQ3VzdG9tQm9hcmRTdGF0ZSB7XG4gIHJldHVybiB7XG4gICAgY2FudmFzOiBudWxsLFxuICAgIHBpZWNlTWFuYWdlcjogY3JlYXRlUGllY2VNYW5hZ2VyKCksXG4gICAgYm9hcmRQbGFuZU5hbWU6ICdib2FyZFBsYW5lJyxcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdEN1c3RvbUJvYXJkKHN0YXRlOiBDdXN0b21Cb2FyZFN0YXRlLCBzZXR0aW5nczogU2V0dGluZ3NTdG9yZSk6IHZvaWQge1xuICBpZiAoc3RhdGUuY2FudmFzKSByZXR1cm5cblxuICBjb25zdCBib2FyZCA9IHF1ZXJ5U2VsZWN0b3IoRG9tU2VsZWN0b3IuQk9BUkQpIGFzIEhUTUxFbGVtZW50IHwgbnVsbFxuICBpZiAoYm9hcmQpIHtcbiAgICBib2FyZC5zdHlsZS5vcGFjaXR5ID0gJzAnXG4gICAgY29uc3QgcGllY2VzID0gYm9hcmQucXVlcnlTZWxlY3RvckFsbCgncGllY2UnKVxuICAgIGZvciAoY29uc3QgcGllY2Ugb2YgcGllY2VzKSB7XG4gICAgICA7KHBpZWNlIGFzIEhUTUxFbGVtZW50KS5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbidcbiAgICB9XG4gIH1cblxuICBzdGF0ZS5jYW52YXMgPSBjcmVhdGUzRENhbnZhcygpXG5cbiAgY29uc3QgYm9hcmRQbGFuZSA9IGNyZWF0ZUJvYXJkUGxhbmUoW10pXG4gIGJvYXJkUGxhbmUubmFtZSA9IHN0YXRlLmJvYXJkUGxhbmVOYW1lXG4gIHN0YXRlLmNhbnZhcy5zY2VuZS5hZGQoYm9hcmRQbGFuZSlcblxuICBjb25zdCBpc0ZsaXBwZWQgPSBnZXRJc0ZsaXBwZWQoKVxuICBjb25zdCBzdHlsZSA9IGdldFBpZWNlU3R5bGUoc2V0dGluZ3MpXG4gIHVwZGF0ZVBpZWNlcyhzdGF0ZS5jYW52YXMsIHN0YXRlLnBpZWNlTWFuYWdlciwgc3R5bGUsIGlzRmxpcHBlZCwgW10pXG4gIHJlbmRlcjNEKHN0YXRlLmNhbnZhcylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlc3Ryb3lDdXN0b21Cb2FyZChzdGF0ZTogQ3VzdG9tQm9hcmRTdGF0ZSk6IHZvaWQge1xuICBpZiAoIXN0YXRlLmNhbnZhcykgcmV0dXJuXG5cbiAgY2xlYXJBbGxQaWVjZXMoc3RhdGUuY2FudmFzLCBzdGF0ZS5waWVjZU1hbmFnZXIpXG4gIGRlc3Ryb3kzRENhbnZhcyhzdGF0ZS5jYW52YXMpXG4gIHN0YXRlLmNhbnZhcyA9IG51bGxcblxuICBjb25zdCBib2FyZCA9IHF1ZXJ5U2VsZWN0b3IoRG9tU2VsZWN0b3IuQk9BUkQpIGFzIEhUTUxFbGVtZW50IHwgbnVsbFxuICBpZiAoYm9hcmQpIHtcbiAgICBib2FyZC5zdHlsZS5vcGFjaXR5ID0gJydcbiAgICBjb25zdCBwaWVjZXMgPSBib2FyZC5xdWVyeVNlbGVjdG9yQWxsKCdwaWVjZScpXG4gICAgZm9yIChjb25zdCBwaWVjZSBvZiBwaWVjZXMpIHtcbiAgICAgIDsocGllY2UgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLnZpc2liaWxpdHkgPSAnJ1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVmcmVzaFBpZWNlcyhzdGF0ZTogQ3VzdG9tQm9hcmRTdGF0ZSwgc2V0dGluZ3M6IFNldHRpbmdzU3RvcmUpOiB2b2lkIHtcbiAgaWYgKCFzdGF0ZS5jYW52YXMpIHJldHVyblxuXG4gIGNvbnN0IGlzRmxpcHBlZCA9IGdldElzRmxpcHBlZCgpXG4gIGNvbnN0IHN0eWxlID0gZ2V0UGllY2VTdHlsZShzZXR0aW5ncylcbiAgdXBkYXRlUGllY2VzKHN0YXRlLmNhbnZhcywgc3RhdGUucGllY2VNYW5hZ2VyLCBzdHlsZSwgaXNGbGlwcGVkLCBbXSlcbiAgcmVuZGVyM0Qoc3RhdGUuY2FudmFzKVxufVxuXG5mdW5jdGlvbiBnZXRJc0ZsaXBwZWQoKTogYm9vbGVhbiB7XG4gIGNvbnN0IGNvb3JkcyA9IHF1ZXJ5U2VsZWN0b3IoRG9tU2VsZWN0b3IuQ09PUkRTKVxuICByZXR1cm4gY29vcmRzPy5jbGFzc0xpc3QuY29udGFpbnMoJ2JsYWNrJykgPz8gZmFsc2Vcbn1cblxuZnVuY3Rpb24gZ2V0UGllY2VTdHlsZShzZXR0aW5nczogU2V0dGluZ3NTdG9yZSk6IHN0cmluZyB7XG4gIGlmIChzZXR0aW5ncy5vYmZ1c2NhdGlvbnNFbmFibGVkLnZhbHVlKSB7XG4gICAgcmV0dXJuIHNldHRpbmdzLnBpZWNlU3R5bGUudmFsdWVcbiAgfVxuICByZXR1cm4gc2V0dGluZ3MucGllY2VTdHlsZS52YWx1ZSA9PT0gJzNkJyA/ICczZCcgOiAnaWNvbnMnXG59XG4iLCJpbXBvcnQgeyBlZmZlY3QgfSBmcm9tICdAcHJlYWN0L3NpZ25hbHMtY29yZSdcbmltcG9ydCB0eXBlIHsgU2lnbmFsIH0gZnJvbSAnQHByZWFjdC9zaWduYWxzLWNvcmUnXG5pbXBvcnQge1xuICB0eXBlIEN1c3RvbUJvYXJkU3RhdGUsXG4gIGRlc3Ryb3lDdXN0b21Cb2FyZCxcbiAgaW5pdEN1c3RvbUJvYXJkLFxuICByZWZyZXNoUGllY2VzLFxufSBmcm9tICcuLi9oYW5kbGVycy9oYW5kbGVDdXN0b21Cb2FyZCdcbmltcG9ydCB0eXBlIHsgU2V0dGluZ3NTdG9yZSB9IGZyb20gJy4uL3NldHRpbmdzL3NldHRpbmdzU3RvcmUnXG5cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cEN1c3RvbUJvYXJkRWZmZWN0KFxuICBzdGF0ZTogQ3VzdG9tQm9hcmRTdGF0ZSxcbiAgc2V0dGluZ3M6IFNldHRpbmdzU3RvcmUsXG4gIGJvYXJkQ2hhbmdlZDogU2lnbmFsPG51bWJlcj5cbik6ICgpID0+IHZvaWQge1xuICBjb25zdCBjbGVhbnVwRW5hYmxlZCA9IGVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgZW5hYmxlZCA9IHNldHRpbmdzLmN1c3RvbUJvYXJkRW5hYmxlZC52YWx1ZVxuICAgIGlmIChlbmFibGVkKSB7XG4gICAgICBpbml0Q3VzdG9tQm9hcmQoc3RhdGUsIHNldHRpbmdzKVxuICAgIH0gZWxzZSB7XG4gICAgICBkZXN0cm95Q3VzdG9tQm9hcmQoc3RhdGUpXG4gICAgfVxuICB9KVxuXG4gIGNvbnN0IGNsZWFudXBCb2FyZENoYW5nZSA9IGVmZmVjdCgoKSA9PiB7XG4gICAgYm9hcmRDaGFuZ2VkLnZhbHVlXG4gICAgaWYgKHNldHRpbmdzLmN1c3RvbUJvYXJkRW5hYmxlZC52YWx1ZSAmJiBzdGF0ZS5jYW52YXMpIHtcbiAgICAgIHJlZnJlc2hQaWVjZXMoc3RhdGUsIHNldHRpbmdzKVxuICAgIH1cbiAgfSlcblxuICByZXR1cm4gKCkgPT4ge1xuICAgIGNsZWFudXBFbmFibGVkKClcbiAgICBjbGVhbnVwQm9hcmRDaGFuZ2UoKVxuICAgIGRlc3Ryb3lDdXN0b21Cb2FyZChzdGF0ZSlcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ3NzQ2xhc3MsIENzc0Rpc3BsYXksIERvbVNlbGVjdG9yIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL2RvbSdcbmltcG9ydCB7IGFwcGVuZENoaWxkLCBjcmVhdGVTdmdFbGVtZW50LCBxdWVyeVNlbGVjdG9yIH0gZnJvbSAnLi4vLi4vcGxhdGZvcm0vZG9tJ1xuXG5leHBvcnQgaW50ZXJmYWNlIERpdmlkZXJzU3RhdGUge1xuICBzdmc6IFNWR1NWR0VsZW1lbnRcbiAgdkxpbmU6IFNWR0VsZW1lbnRcbiAgaExpbmU6IFNWR0VsZW1lbnRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZURpdmlkZXJzKCk6IERpdmlkZXJzU3RhdGUge1xuICBjb25zdCBzdmcgPSBjcmVhdGVTdmdFbGVtZW50KCdzdmcnKSBhcyBTVkdTVkdFbGVtZW50XG4gIHN2Zy5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgQ3NzQ2xhc3MuVVNFUlNDUklQVF9ESVZJREVSUylcbiAgc3ZnLnN0eWxlLmNzc1RleHQgPSBgXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMDtcbiAgICBsZWZ0OiAwO1xuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgei1pbmRleDogMTA7XG4gIGBcblxuICBjb25zdCB2TGluZSA9IGNyZWF0ZVN2Z0VsZW1lbnQoJ2xpbmUnKVxuICB2TGluZS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsICdibGFjaycpXG4gIHZMaW5lLnNldEF0dHJpYnV0ZSgnc3Ryb2tlLXdpZHRoJywgJzMnKVxuXG4gIGNvbnN0IGhMaW5lID0gY3JlYXRlU3ZnRWxlbWVudCgnbGluZScpXG4gIGhMaW5lLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJywgJ2JsYWNrJylcbiAgaExpbmUuc2V0QXR0cmlidXRlKCdzdHJva2Utd2lkdGgnLCAnMycpXG5cbiAgYXBwZW5kQ2hpbGQoc3ZnLCB2TGluZSlcbiAgYXBwZW5kQ2hpbGQoc3ZnLCBoTGluZSlcblxuICBjb25zdCBib2FyZCA9IHF1ZXJ5U2VsZWN0b3IoRG9tU2VsZWN0b3IuQk9BUkQpXG4gIGlmIChib2FyZCkge1xuICAgIGFwcGVuZENoaWxkKGJvYXJkLCBzdmcpXG4gIH1cblxuICByZXR1cm4geyBzdmcsIHZMaW5lLCBoTGluZSB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93RGl2aWRlcnMoc3RhdGU6IERpdmlkZXJzU3RhdGUpOiB2b2lkIHtcbiAgcmVzaXplRGl2aWRlcnMoc3RhdGUpXG4gIHN0YXRlLnN2Zy5zdHlsZS5kaXNwbGF5ID0gQ3NzRGlzcGxheS5CTE9DS1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGlkZURpdmlkZXJzKHN0YXRlOiBEaXZpZGVyc1N0YXRlKTogdm9pZCB7XG4gIHN0YXRlLnN2Zy5zdHlsZS5kaXNwbGF5ID0gQ3NzRGlzcGxheS5OT05FXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNpemVEaXZpZGVycyhzdGF0ZTogRGl2aWRlcnNTdGF0ZSk6IHZvaWQge1xuICBjb25zdCBib2FyZCA9IHF1ZXJ5U2VsZWN0b3IoRG9tU2VsZWN0b3IuQk9BUkQpIGFzIEhUTUxFbGVtZW50IHwgbnVsbFxuICBpZiAoIWJvYXJkKSByZXR1cm5cblxuICBpZiAoIWJvYXJkLmNvbnRhaW5zKHN0YXRlLnN2ZykpIHtcbiAgICBhcHBlbmRDaGlsZChib2FyZCwgc3RhdGUuc3ZnKVxuICB9XG5cbiAgY29uc3QgcmVjdCA9IGJvYXJkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gIGNvbnN0IHNpemUgPSByZWN0LndpZHRoXG5cbiAgc3RhdGUuc3ZnLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCBzaXplLnRvU3RyaW5nKCkpXG4gIHN0YXRlLnN2Zy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIHNpemUudG9TdHJpbmcoKSlcblxuICBzdGF0ZS52TGluZS5zZXRBdHRyaWJ1dGUoJ3gxJywgKHNpemUgLyAyKS50b1N0cmluZygpKVxuICBzdGF0ZS52TGluZS5zZXRBdHRyaWJ1dGUoJ3kxJywgJzAnKVxuICBzdGF0ZS52TGluZS5zZXRBdHRyaWJ1dGUoJ3gyJywgKHNpemUgLyAyKS50b1N0cmluZygpKVxuICBzdGF0ZS52TGluZS5zZXRBdHRyaWJ1dGUoJ3kyJywgc2l6ZS50b1N0cmluZygpKVxuXG4gIHN0YXRlLmhMaW5lLnNldEF0dHJpYnV0ZSgneDEnLCAnMCcpXG4gIHN0YXRlLmhMaW5lLnNldEF0dHJpYnV0ZSgneTEnLCAoc2l6ZSAvIDIpLnRvU3RyaW5nKCkpXG4gIHN0YXRlLmhMaW5lLnNldEF0dHJpYnV0ZSgneDInLCBzaXplLnRvU3RyaW5nKCkpXG4gIHN0YXRlLmhMaW5lLnNldEF0dHJpYnV0ZSgneTInLCAoc2l6ZSAvIDIpLnRvU3RyaW5nKCkpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXN0cm95RGl2aWRlcnMoc3RhdGU6IERpdmlkZXJzU3RhdGUpOiB2b2lkIHtcbiAgc3RhdGUuc3ZnLnJlbW92ZSgpXG59XG4iLCJpbXBvcnQge1xuICB0eXBlIERpdmlkZXJzU3RhdGUsXG4gIGhpZGVEaXZpZGVycyxcbiAgc2hvd0RpdmlkZXJzLFxufSBmcm9tICcuLi8uLi9wcmVzZW50YXRpb24vbm9uLXByZWFjdC1jb21wb25lbnRzL2RpdmlkZXJzJ1xuaW1wb3J0IHR5cGUgeyBTZXR0aW5nc1N0b3JlIH0gZnJvbSAnLi4vc2V0dGluZ3Mvc2V0dGluZ3NTdG9yZSdcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZURpdmlkZXJzKHN0YXRlOiBEaXZpZGVyc1N0YXRlLCBzZXR0aW5nczogU2V0dGluZ3NTdG9yZSk6IHZvaWQge1xuICBpZiAoc2V0dGluZ3MuZGl2aWRlcnNFbmFibGVkLnZhbHVlKSB7XG4gICAgc2hvd0RpdmlkZXJzKHN0YXRlKVxuICB9IGVsc2Uge1xuICAgIGhpZGVEaXZpZGVycyhzdGF0ZSlcbiAgfVxufVxuIiwiaW1wb3J0IHR5cGUgeyBTaWduYWwgfSBmcm9tICdAcHJlYWN0L3NpZ25hbHMtY29yZSdcbmltcG9ydCB7IGVmZmVjdCB9IGZyb20gJ0BwcmVhY3Qvc2lnbmFscy1jb3JlJ1xuaW1wb3J0IHtcbiAgdHlwZSBEaXZpZGVyc1N0YXRlLFxuICByZXNpemVEaXZpZGVycyxcbn0gZnJvbSAnLi4vLi4vcHJlc2VudGF0aW9uL25vbi1wcmVhY3QtY29tcG9uZW50cy9kaXZpZGVycydcbmltcG9ydCB7IHVwZGF0ZURpdmlkZXJzIH0gZnJvbSAnLi4vaGFuZGxlcnMvdXBkYXRlRGl2aWRlcnMnXG5pbXBvcnQgdHlwZSB7IFNldHRpbmdzU3RvcmUgfSBmcm9tICcuLi9zZXR0aW5ncy9zZXR0aW5nc1N0b3JlJ1xuXG5jb25zdCBSRVNJWkVfSU5URVJWQUxfTVMgPSAyMDAwXG5cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cERpdmlkZXJzRWZmZWN0KFxuICBzdGF0ZTogRGl2aWRlcnNTdGF0ZSxcbiAgc2V0dGluZ3M6IFNldHRpbmdzU3RvcmUsXG4gIGJvYXJkQ2hhbmdlZDogU2lnbmFsPG51bWJlcj5cbik6ICgpID0+IHZvaWQge1xuICBsZXQgaW50ZXJ2YWxJZDogUmV0dXJuVHlwZTx0eXBlb2Ygc2V0SW50ZXJ2YWw+IHwgbnVsbCA9IG51bGxcblxuICBjb25zdCBjbGVhbnVwID0gZWZmZWN0KCgpID0+IHtcbiAgICBib2FyZENoYW5nZWQudmFsdWVcbiAgICBjb25zdCBlbmFibGVkID0gc2V0dGluZ3MuZGl2aWRlcnNFbmFibGVkLnZhbHVlXG5cbiAgICBpZiAoaW50ZXJ2YWxJZCAhPT0gbnVsbCkge1xuICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKVxuICAgICAgaW50ZXJ2YWxJZCA9IG51bGxcbiAgICB9XG5cbiAgICBpZiAoZW5hYmxlZCkge1xuICAgICAgcmVzaXplRGl2aWRlcnMoc3RhdGUpXG4gICAgICBpbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoKCkgPT4gcmVzaXplRGl2aWRlcnMoc3RhdGUpLCBSRVNJWkVfSU5URVJWQUxfTVMpXG4gICAgfVxuXG4gICAgdXBkYXRlRGl2aWRlcnMoc3RhdGUsIHNldHRpbmdzKVxuICB9KVxuXG4gIHJldHVybiAoKSA9PiB7XG4gICAgaWYgKGludGVydmFsSWQgIT09IG51bGwpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZClcbiAgICB9XG4gICAgY2xlYW51cCgpXG4gIH1cbn1cbiIsImltcG9ydCB7IENzc0NsYXNzLCBDc3NEaXNwbGF5LCBEb21TZWxlY3RvciB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy9kb20nXG5pbXBvcnQgeyBhcHBlbmRDaGlsZCwgY3JlYXRlRGl2LCBxdWVyeVNlbGVjdG9yIH0gZnJvbSAnLi4vLi4vcGxhdGZvcm0vZG9tJ1xuXG5leHBvcnQgaW50ZXJmYWNlIEZsYXNoT3ZlcmxheVN0YXRlIHtcbiAgb3ZlcmxheTogSFRNTEVsZW1lbnRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZsYXNoT3ZlcmxheSgpOiBGbGFzaE92ZXJsYXlTdGF0ZSB7XG4gIGNvbnN0IG92ZXJsYXkgPSBjcmVhdGVEaXYoKVxuICBvdmVybGF5LmNsYXNzTmFtZSA9IENzc0NsYXNzLlVTRVJTQ1JJUFRfRkxBU0hcbiAgb3ZlcmxheS5zdHlsZS5jc3NUZXh0ID0gYFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDA7XG4gICAgbGVmdDogMDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgYmFja2dyb3VuZDogYmxhY2s7XG4gICAgei1pbmRleDogMTAwMDtcbiAgICBkaXNwbGF5OiBub25lO1xuICBgXG5cbiAgY29uc3QgY29udGFpbmVyID0gcXVlcnlTZWxlY3RvcihEb21TZWxlY3Rvci5DT05UQUlORVIpXG4gIGlmIChjb250YWluZXIpIHtcbiAgICBhcHBlbmRDaGlsZChjb250YWluZXIsIG92ZXJsYXkpXG4gIH1cblxuICByZXR1cm4geyBvdmVybGF5IH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNob3dGbGFzaChzdGF0ZTogRmxhc2hPdmVybGF5U3RhdGUpOiB2b2lkIHtcbiAgc3RhdGUub3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gQ3NzRGlzcGxheS5CTE9DS1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGlkZUZsYXNoKHN0YXRlOiBGbGFzaE92ZXJsYXlTdGF0ZSk6IHZvaWQge1xuICBzdGF0ZS5vdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBDc3NEaXNwbGF5Lk5PTkVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlc3Ryb3lGbGFzaE92ZXJsYXkoc3RhdGU6IEZsYXNoT3ZlcmxheVN0YXRlKTogdm9pZCB7XG4gIHN0YXRlLm92ZXJsYXkucmVtb3ZlKClcbn1cbiIsImltcG9ydCB7XG4gIHR5cGUgRmxhc2hPdmVybGF5U3RhdGUsXG4gIGhpZGVGbGFzaCxcbiAgc2hvd0ZsYXNoLFxufSBmcm9tICcuLi8uLi9wcmVzZW50YXRpb24vbm9uLXByZWFjdC1jb21wb25lbnRzL2ZsYXNoJ1xuaW1wb3J0IHR5cGUgeyBTZXR0aW5nc1N0b3JlIH0gZnJvbSAnLi4vc2V0dGluZ3Mvc2V0dGluZ3NTdG9yZSdcblxuZXhwb3J0IGludGVyZmFjZSBGbGFzaExvb3BTdGF0ZSB7XG4gIGludGVydmFsSWQ6IFJldHVyblR5cGU8dHlwZW9mIHNldEludGVydmFsPiB8IG51bGxcbiAgdGltZW91dElkOiBSZXR1cm5UeXBlPHR5cGVvZiBzZXRUaW1lb3V0PiB8IG51bGxcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZsYXNoTG9vcFN0YXRlKCk6IEZsYXNoTG9vcFN0YXRlIHtcbiAgcmV0dXJuIHsgaW50ZXJ2YWxJZDogbnVsbCwgdGltZW91dElkOiBudWxsIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRyaWdnZXJGbGFzaChcbiAgb3ZlcmxheVN0YXRlOiBGbGFzaE92ZXJsYXlTdGF0ZSxcbiAgbG9vcFN0YXRlOiBGbGFzaExvb3BTdGF0ZSxcbiAgc2V0dGluZ3M6IFNldHRpbmdzU3RvcmVcbik6IHZvaWQge1xuICBoaWRlRmxhc2gob3ZlcmxheVN0YXRlKVxuXG4gIGlmIChsb29wU3RhdGUudGltZW91dElkICE9PSBudWxsKSB7XG4gICAgY2xlYXJUaW1lb3V0KGxvb3BTdGF0ZS50aW1lb3V0SWQpXG4gIH1cblxuICBjb25zdCBkdXJhdGlvbk1zID0gc2V0dGluZ3MuZmxhc2hEdXJhdGlvbi52YWx1ZVxuXG4gIGxvb3BTdGF0ZS50aW1lb3V0SWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBzaG93Rmxhc2gob3ZlcmxheVN0YXRlKVxuICAgIGxvb3BTdGF0ZS50aW1lb3V0SWQgPSBudWxsXG4gIH0sIGR1cmF0aW9uTXMpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdGFydEZsYXNoTG9vcChcbiAgb3ZlcmxheVN0YXRlOiBGbGFzaE92ZXJsYXlTdGF0ZSxcbiAgbG9vcFN0YXRlOiBGbGFzaExvb3BTdGF0ZSxcbiAgc2V0dGluZ3M6IFNldHRpbmdzU3RvcmVcbik6IHZvaWQge1xuICBzdG9wRmxhc2hMb29wKGxvb3BTdGF0ZSlcblxuICBzaG93Rmxhc2gob3ZlcmxheVN0YXRlKVxuXG4gIHRyaWdnZXJGbGFzaChvdmVybGF5U3RhdGUsIGxvb3BTdGF0ZSwgc2V0dGluZ3MpXG5cbiAgY29uc3QgaW50ZXJ2YWxNcyA9IHNldHRpbmdzLmZsYXNoSW50ZXJ2YWwudmFsdWUgKiAxMDAwXG4gIGxvb3BTdGF0ZS5pbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgIHRyaWdnZXJGbGFzaChvdmVybGF5U3RhdGUsIGxvb3BTdGF0ZSwgc2V0dGluZ3MpXG4gIH0sIGludGVydmFsTXMpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdG9wRmxhc2hMb29wKGxvb3BTdGF0ZTogRmxhc2hMb29wU3RhdGUpOiB2b2lkIHtcbiAgaWYgKGxvb3BTdGF0ZS5pbnRlcnZhbElkICE9PSBudWxsKSB7XG4gICAgY2xlYXJJbnRlcnZhbChsb29wU3RhdGUuaW50ZXJ2YWxJZClcbiAgICBsb29wU3RhdGUuaW50ZXJ2YWxJZCA9IG51bGxcbiAgfVxuICBpZiAobG9vcFN0YXRlLnRpbWVvdXRJZCAhPT0gbnVsbCkge1xuICAgIGNsZWFyVGltZW91dChsb29wU3RhdGUudGltZW91dElkKVxuICAgIGxvb3BTdGF0ZS50aW1lb3V0SWQgPSBudWxsXG4gIH1cbn1cbiIsImltcG9ydCB7IGVmZmVjdCB9IGZyb20gJ0BwcmVhY3Qvc2lnbmFscy1jb3JlJ1xuaW1wb3J0IHR5cGUgeyBTaWduYWwgfSBmcm9tICdAcHJlYWN0L3NpZ25hbHMtY29yZSdcbmltcG9ydCB0eXBlIHsgRmxhc2hPdmVybGF5U3RhdGUgfSBmcm9tICcuLi8uLi9wcmVzZW50YXRpb24vbm9uLXByZWFjdC1jb21wb25lbnRzL2ZsYXNoJ1xuaW1wb3J0IHsgaGlkZUZsYXNoIH0gZnJvbSAnLi4vLi4vcHJlc2VudGF0aW9uL25vbi1wcmVhY3QtY29tcG9uZW50cy9mbGFzaCdcbmltcG9ydCB7XG4gIHR5cGUgRmxhc2hMb29wU3RhdGUsXG4gIHN0YXJ0Rmxhc2hMb29wLFxuICBzdG9wRmxhc2hMb29wLFxuICB0cmlnZ2VyRmxhc2gsXG59IGZyb20gJy4uL2hhbmRsZXJzL2hhbmRsZUZsYXNoJ1xuaW1wb3J0IHR5cGUgeyBTZXR0aW5nc1N0b3JlIH0gZnJvbSAnLi4vc2V0dGluZ3Mvc2V0dGluZ3NTdG9yZSdcblxuZXhwb3J0IGZ1bmN0aW9uIHNldHVwRmxhc2hFZmZlY3QoXG4gIG92ZXJsYXlTdGF0ZTogRmxhc2hPdmVybGF5U3RhdGUsXG4gIGxvb3BTdGF0ZTogRmxhc2hMb29wU3RhdGUsXG4gIHNldHRpbmdzOiBTZXR0aW5nc1N0b3JlLFxuICBib2FyZENoYW5nZWQ6IFNpZ25hbDxudW1iZXI+XG4pOiAoKSA9PiB2b2lkIHtcbiAgY29uc3QgY2xlYW51cE1vZGVFZmZlY3QgPSBlZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGVuYWJsZWQgPSBzZXR0aW5ncy5mbGFzaE1vZGVFbmFibGVkLnZhbHVlXG4gICAgc2V0dGluZ3MuZmxhc2hJbnRlcnZhbC52YWx1ZVxuICAgIHNldHRpbmdzLmZsYXNoRHVyYXRpb24udmFsdWVcblxuICAgIGlmIChlbmFibGVkKSB7XG4gICAgICBzdGFydEZsYXNoTG9vcChvdmVybGF5U3RhdGUsIGxvb3BTdGF0ZSwgc2V0dGluZ3MpXG4gICAgfSBlbHNlIHtcbiAgICAgIHN0b3BGbGFzaExvb3AobG9vcFN0YXRlKVxuICAgICAgaGlkZUZsYXNoKG92ZXJsYXlTdGF0ZSlcbiAgICB9XG4gIH0pXG5cbiAgY29uc3QgY2xlYW51cEJvYXJkRWZmZWN0ID0gZWZmZWN0KCgpID0+IHtcbiAgICBib2FyZENoYW5nZWQudmFsdWVcbiAgICBpZiAoc2V0dGluZ3MuZmxhc2hNb2RlRW5hYmxlZC52YWx1ZSAmJiBsb29wU3RhdGUuaW50ZXJ2YWxJZCAhPT0gbnVsbCkge1xuICAgICAgdHJpZ2dlckZsYXNoKG92ZXJsYXlTdGF0ZSwgbG9vcFN0YXRlLCBzZXR0aW5ncylcbiAgICB9XG4gIH0pXG5cbiAgcmV0dXJuICgpID0+IHtcbiAgICBjbGVhbnVwTW9kZUVmZmVjdCgpXG4gICAgY2xlYW51cEJvYXJkRWZmZWN0KClcbiAgICBzdG9wRmxhc2hMb29wKGxvb3BTdGF0ZSlcbiAgfVxufVxuIiwiaW1wb3J0IHR5cGUgeyBDYW52YXMzRFN0YXRlIH0gZnJvbSAnLi9jYW52YXMnXG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVDYW1lcmFBbmdsZShcbiAgc3RhdGU6IENhbnZhczNEU3RhdGUsXG4gIGFuZ2xlRGVncmVlczogbnVtYmVyLFxuICBpc0ZsaXBwZWQ6IGJvb2xlYW5cbik6IHZvaWQge1xuICBjb25zdCBhbmdsZVJhZCA9IChhbmdsZURlZ3JlZXMgKiBNYXRoLlBJKSAvIDE4MFxuICBjb25zdCBkaXN0YW5jZSA9IDE1XG5cbiAgY29uc3QgeSA9IE1hdGguY29zKGFuZ2xlUmFkKSAqIGRpc3RhbmNlXG4gIGNvbnN0IHogPSBNYXRoLnNpbihhbmdsZVJhZCkgKiBkaXN0YW5jZVxuICBjb25zdCB6RGlyZWN0aW9uID0gaXNGbGlwcGVkID8gMSA6IC0xXG5cbiAgc3RhdGUuY2FtZXJhLnBvc2l0aW9uLnNldCgwLCB5LCB6ICogekRpcmVjdGlvbilcbiAgc3RhdGUuY2FtZXJhLnVwLnNldCgwLCAwLCAtMSAqIHpEaXJlY3Rpb24pXG4gIHN0YXRlLmNhbWVyYS5sb29rQXQoMCwgMCwgMClcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiByZXF1ZXN0QW5pbWF0aW9uKGNhbGxiYWNrOiBGcmFtZVJlcXVlc3RDYWxsYmFjayk6IG51bWJlciB7XG4gIHJldHVybiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoY2FsbGJhY2spXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYW5jZWxBbmltYXRpb24oaWQ6IG51bWJlcik6IHZvaWQge1xuICBjYW5jZWxBbmltYXRpb25GcmFtZShpZClcbn1cbiIsImltcG9ydCB7IGNhbmNlbEFuaW1hdGlvbiwgcmVxdWVzdEFuaW1hdGlvbiB9IGZyb20gJy4uLy4uL3BsYXRmb3JtL2FuaW1hdGlvbkZyYW1lJ1xuaW1wb3J0IHsgdHlwZSBDYW52YXMzRFN0YXRlLCByZW5kZXIzRCB9IGZyb20gJy4vY2FudmFzJ1xuXG5jb25zdCBPU0NJTExBVElPTl9BTkdMRSA9IDEuOTVcbmNvbnN0IE9TQ0lMTEFUSU9OX1BFUklPRF9NUyA9IDIwMDBcbmNvbnN0IE9TQ0lMTEFUSU9OX1lfQU5HTEUgPSAxLjk1XG5jb25zdCBPU0NJTExBVElPTl9ZX1BFUklPRF9NUyA9IDI1MDBcblxuZXhwb3J0IGludGVyZmFjZSBIb3ZlckFuaW1hdGlvblN0YXRlIHtcbiAgYW5pbWF0aW9uSWQ6IG51bWJlciB8IG51bGxcbiAgc3RhcnRUaW1lOiBudW1iZXIgfCBudWxsXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVIb3ZlckFuaW1hdGlvblN0YXRlKCk6IEhvdmVyQW5pbWF0aW9uU3RhdGUge1xuICByZXR1cm4geyBhbmltYXRpb25JZDogbnVsbCwgc3RhcnRUaW1lOiBudWxsIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0SG92ZXJBbmltYXRpb24oXG4gIGhvdmVyU3RhdGU6IEhvdmVyQW5pbWF0aW9uU3RhdGUsXG4gIGNhbnZhc1N0YXRlOiBDYW52YXMzRFN0YXRlLFxuICBnZXRQYXJhbXM6ICgpID0+IHsgYmFzZUFuZ2xlOiBudW1iZXI7IHNjYWxlOiBudW1iZXI7IGlzRmxpcHBlZDogYm9vbGVhbiB9XG4pOiB2b2lkIHtcbiAgaWYgKGhvdmVyU3RhdGUuYW5pbWF0aW9uSWQgIT09IG51bGwpIHJldHVyblxuICBob3ZlclN0YXRlLnN0YXJ0VGltZSA9IHBlcmZvcm1hbmNlLm5vdygpXG5cbiAgY29uc3QgYW5pbWF0ZSA9ICh0aW1lc3RhbXA6IG51bWJlcikgPT4ge1xuICAgIGNvbnN0IHBhcmFtcyA9IGdldFBhcmFtcygpXG4gICAgaWYgKHBhcmFtcy5zY2FsZSA9PT0gMCkge1xuICAgICAgc3RvcEhvdmVyQW5pbWF0aW9uKGhvdmVyU3RhdGUpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCBlbGFwc2VkID0gdGltZXN0YW1wIC0gKGhvdmVyU3RhdGUuc3RhcnRUaW1lID8/IHRpbWVzdGFtcClcbiAgICBjb25zdCB7IGJhc2VBbmdsZSwgc2NhbGUsIGlzRmxpcHBlZCB9ID0gcGFyYW1zXG5cbiAgICBjb25zdCBvc2NpbGxhdGlvblggPSBNYXRoLnNpbihlbGFwc2VkIC8gT1NDSUxMQVRJT05fUEVSSU9EX01TKSAqIE9TQ0lMTEFUSU9OX0FOR0xFICogc2NhbGVcbiAgICBjb25zdCBhbmdsZVggPSBiYXNlQW5nbGUgKyBvc2NpbGxhdGlvblhcbiAgICBjb25zdCBhbmdsZVJhZCA9IChhbmdsZVggKiBNYXRoLlBJKSAvIDE4MFxuXG4gICAgY29uc3QgZGlzdGFuY2UgPSAxNVxuICAgIGNvbnN0IHkgPSBNYXRoLmNvcyhhbmdsZVJhZCkgKiBkaXN0YW5jZVxuICAgIGNvbnN0IHogPSBNYXRoLnNpbihhbmdsZVJhZCkgKiBkaXN0YW5jZVxuICAgIGNvbnN0IHpEaXJlY3Rpb24gPSBpc0ZsaXBwZWQgPyAxIDogLTFcblxuICAgIGNhbnZhc1N0YXRlLmNhbWVyYS5wb3NpdGlvbi5zZXQoMCwgeSwgeiAqIHpEaXJlY3Rpb24pXG5cbiAgICBjb25zdCBvc2NpbGxhdGlvblogPSBNYXRoLnNpbihlbGFwc2VkIC8gT1NDSUxMQVRJT05fWV9QRVJJT0RfTVMpICogT1NDSUxMQVRJT05fWV9BTkdMRSAqIHNjYWxlXG4gICAgY29uc3Qgb3NjaWxsYXRpb25aUmFkID0gKG9zY2lsbGF0aW9uWiAqIE1hdGguUEkpIC8gMTgwXG4gICAgY2FudmFzU3RhdGUuY2FtZXJhLnBvc2l0aW9uLnggPSBNYXRoLnNpbihvc2NpbGxhdGlvblpSYWQpICogZGlzdGFuY2UgKiAwLjEgKiBzY2FsZVxuXG4gICAgY2FudmFzU3RhdGUuY2FtZXJhLnVwLnNldCgwLCAwLCAtMSAqIHpEaXJlY3Rpb24pXG4gICAgY2FudmFzU3RhdGUuY2FtZXJhLmxvb2tBdCgwLCAwLCAwKVxuXG4gICAgcmVuZGVyM0QoY2FudmFzU3RhdGUpXG4gICAgaG92ZXJTdGF0ZS5hbmltYXRpb25JZCA9IHJlcXVlc3RBbmltYXRpb24oYW5pbWF0ZSlcbiAgfVxuXG4gIGhvdmVyU3RhdGUuYW5pbWF0aW9uSWQgPSByZXF1ZXN0QW5pbWF0aW9uKGFuaW1hdGUpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdG9wSG92ZXJBbmltYXRpb24oaG92ZXJTdGF0ZTogSG92ZXJBbmltYXRpb25TdGF0ZSk6IHZvaWQge1xuICBpZiAoaG92ZXJTdGF0ZS5hbmltYXRpb25JZCAhPT0gbnVsbCkge1xuICAgIGNhbmNlbEFuaW1hdGlvbihob3ZlclN0YXRlLmFuaW1hdGlvbklkKVxuICAgIGhvdmVyU3RhdGUuYW5pbWF0aW9uSWQgPSBudWxsXG4gIH1cbiAgaG92ZXJTdGF0ZS5zdGFydFRpbWUgPSBudWxsXG59XG4iLCJpbXBvcnQgeyBlZmZlY3QgfSBmcm9tICdAcHJlYWN0L3NpZ25hbHMtY29yZSdcbmltcG9ydCB7IHF1ZXJ5U2VsZWN0b3IgfSBmcm9tICcuLi8uLi9wbGF0Zm9ybS9kb20nXG5pbXBvcnQgeyB1cGRhdGVDYW1lcmFBbmdsZSB9IGZyb20gJy4uLy4uL3ByZXNlbnRhdGlvbi8zZC9jYW1lcmEnXG5pbXBvcnQgeyByZW5kZXIzRCB9IGZyb20gJy4uLy4uL3ByZXNlbnRhdGlvbi8zZC9jYW52YXMnXG5pbXBvcnQge1xuICB0eXBlIEhvdmVyQW5pbWF0aW9uU3RhdGUsXG4gIHN0YXJ0SG92ZXJBbmltYXRpb24sXG4gIHN0b3BIb3ZlckFuaW1hdGlvbixcbn0gZnJvbSAnLi4vLi4vcHJlc2VudGF0aW9uLzNkL2hvdmVyQW5pbWF0aW9uJ1xuaW1wb3J0IHR5cGUgeyBDdXN0b21Cb2FyZFN0YXRlIH0gZnJvbSAnLi4vaGFuZGxlcnMvaGFuZGxlQ3VzdG9tQm9hcmQnXG5pbXBvcnQgdHlwZSB7IFNldHRpbmdzU3RvcmUgfSBmcm9tICcuLi9zZXR0aW5ncy9zZXR0aW5nc1N0b3JlJ1xuXG5jb25zdCBIT1ZFUl9TQ0FMRVM6IFJlY29yZDxzdHJpbmcsIG51bWJlcj4gPSB7XG4gIG9mZjogMCxcbiAgc21hbGw6IDEsXG4gIGxhcmdlOiAyLFxuICBzdXBlcjogMyxcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldHVwSG92ZXJNb2RlRWZmZWN0KFxuICBjdXN0b21Cb2FyZFN0YXRlOiBDdXN0b21Cb2FyZFN0YXRlLFxuICBob3ZlclN0YXRlOiBIb3ZlckFuaW1hdGlvblN0YXRlLFxuICBzZXR0aW5nczogU2V0dGluZ3NTdG9yZVxuKTogKCkgPT4gdm9pZCB7XG4gIHJldHVybiBlZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IG1vZGUgPSBzZXR0aW5ncy5ob3Zlck1vZGUudmFsdWVcbiAgICBjb25zdCBzY2FsZSA9IEhPVkVSX1NDQUxFU1ttb2RlXSA/PyAwXG5cbiAgICBpZiAoIWN1c3RvbUJvYXJkU3RhdGUuY2FudmFzKSB7XG4gICAgICBzdG9wSG92ZXJBbmltYXRpb24oaG92ZXJTdGF0ZSlcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmIChzY2FsZSA+IDApIHtcbiAgICAgIGlmIChzZXR0aW5ncy5wYXJhbGxheC52YWx1ZSA9PT0gMCkge1xuICAgICAgICBzZXR0aW5ncy5wYXJhbGxheC52YWx1ZSA9IDQwXG4gICAgICB9XG4gICAgICBzdGFydEhvdmVyQW5pbWF0aW9uKGhvdmVyU3RhdGUsIGN1c3RvbUJvYXJkU3RhdGUuY2FudmFzLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvb3JkcyA9IHF1ZXJ5U2VsZWN0b3IoJ2Nvb3JkcycpXG4gICAgICAgIGNvbnN0IGlzRmxpcHBlZCA9IGNvb3Jkcz8uY2xhc3NMaXN0LmNvbnRhaW5zKCdibGFjaycpID8/IGZhbHNlXG4gICAgICAgIHJldHVybiB7IGJhc2VBbmdsZTogc2V0dGluZ3MucGFyYWxsYXgudmFsdWUsIHNjYWxlLCBpc0ZsaXBwZWQgfVxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgc3RvcEhvdmVyQW5pbWF0aW9uKGhvdmVyU3RhdGUpXG4gICAgICBjb25zdCBjb29yZHMgPSBxdWVyeVNlbGVjdG9yKCdjb29yZHMnKVxuICAgICAgY29uc3QgaXNGbGlwcGVkID0gY29vcmRzPy5jbGFzc0xpc3QuY29udGFpbnMoJ2JsYWNrJykgPz8gZmFsc2VcbiAgICAgIHVwZGF0ZUNhbWVyYUFuZ2xlKGN1c3RvbUJvYXJkU3RhdGUuY2FudmFzLCBzZXR0aW5ncy5wYXJhbGxheC52YWx1ZSwgaXNGbGlwcGVkKVxuICAgICAgcmVuZGVyM0QoY3VzdG9tQm9hcmRTdGF0ZS5jYW52YXMpXG4gICAgfVxuICB9KVxufVxuIiwiaW1wb3J0IHsgZWZmZWN0IH0gZnJvbSAnQHByZWFjdC9zaWduYWxzLWNvcmUnXG5pbXBvcnQgeyBEb21TZWxlY3RvciB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy9kb20nXG5pbXBvcnQgeyBxdWVyeVNlbGVjdG9yIH0gZnJvbSAnLi4vLi4vcGxhdGZvcm0vZG9tJ1xuaW1wb3J0IHsgdXBkYXRlQ2FtZXJhQW5nbGUgfSBmcm9tICcuLi8uLi9wcmVzZW50YXRpb24vM2QvY2FtZXJhJ1xuaW1wb3J0IHsgcmVuZGVyM0QgfSBmcm9tICcuLi8uLi9wcmVzZW50YXRpb24vM2QvY2FudmFzJ1xuaW1wb3J0IHR5cGUgeyBDdXN0b21Cb2FyZFN0YXRlIH0gZnJvbSAnLi4vaGFuZGxlcnMvaGFuZGxlQ3VzdG9tQm9hcmQnXG5pbXBvcnQgdHlwZSB7IFNldHRpbmdzU3RvcmUgfSBmcm9tICcuLi9zZXR0aW5ncy9zZXR0aW5nc1N0b3JlJ1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBQYXJhbGxheEVmZmVjdChcbiAgY3VzdG9tQm9hcmRTdGF0ZTogQ3VzdG9tQm9hcmRTdGF0ZSxcbiAgc2V0dGluZ3M6IFNldHRpbmdzU3RvcmVcbik6ICgpID0+IHZvaWQge1xuICByZXR1cm4gZWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBhbmdsZSA9IHNldHRpbmdzLnBhcmFsbGF4LnZhbHVlXG4gICAgaWYgKCFjdXN0b21Cb2FyZFN0YXRlLmNhbnZhcykgcmV0dXJuXG5cbiAgICBjb25zdCBjb29yZHMgPSBxdWVyeVNlbGVjdG9yKERvbVNlbGVjdG9yLkNPT1JEUylcbiAgICBjb25zdCBpc0ZsaXBwZWQgPSBjb29yZHM/LmNsYXNzTGlzdC5jb250YWlucygnYmxhY2snKSA/PyBmYWxzZVxuXG4gICAgdXBkYXRlQ2FtZXJhQW5nbGUoY3VzdG9tQm9hcmRTdGF0ZS5jYW52YXMsIGFuZ2xlLCBpc0ZsaXBwZWQpXG4gICAgcmVuZGVyM0QoY3VzdG9tQm9hcmRTdGF0ZS5jYW52YXMpXG4gIH0pXG59XG4iLCJpbXBvcnQgeyBlZmZlY3QgfSBmcm9tICdAcHJlYWN0L3NpZ25hbHMtY29yZSdcbmltcG9ydCB7IERvbVNlbGVjdG9yIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL2RvbSdcbmltcG9ydCB7IHF1ZXJ5U2VsZWN0b3IgfSBmcm9tICcuLi8uLi9wbGF0Zm9ybS9kb20nXG5pbXBvcnQgeyByZW5kZXIzRCB9IGZyb20gJy4uLy4uL3ByZXNlbnRhdGlvbi8zZC9jYW52YXMnXG5pbXBvcnQgeyBjbGVhckFsbFBpZWNlcywgdXBkYXRlUGllY2VzIH0gZnJvbSAnLi4vLi4vcHJlc2VudGF0aW9uLzNkL3BpZWNlTWFuYWdlcidcbmltcG9ydCB0eXBlIHsgQ3VzdG9tQm9hcmRTdGF0ZSB9IGZyb20gJy4uL2hhbmRsZXJzL2hhbmRsZUN1c3RvbUJvYXJkJ1xuaW1wb3J0IHR5cGUgeyBTZXR0aW5nc1N0b3JlIH0gZnJvbSAnLi4vc2V0dGluZ3Mvc2V0dGluZ3NTdG9yZSdcblxuZXhwb3J0IGZ1bmN0aW9uIHNldHVwUGllY2VTdHlsZUVmZmVjdChcbiAgY3VzdG9tQm9hcmRTdGF0ZTogQ3VzdG9tQm9hcmRTdGF0ZSxcbiAgc2V0dGluZ3M6IFNldHRpbmdzU3RvcmVcbik6ICgpID0+IHZvaWQge1xuICByZXR1cm4gZWZmZWN0KCgpID0+IHtcbiAgICBzZXR0aW5ncy5waWVjZVN0eWxlLnZhbHVlXG4gICAgc2V0dGluZ3Mub2JmdXNjYXRpb25zRW5hYmxlZC52YWx1ZVxuICAgIGlmICghY3VzdG9tQm9hcmRTdGF0ZS5jYW52YXMpIHJldHVyblxuXG4gICAgY29uc3QgY29vcmRzID0gcXVlcnlTZWxlY3RvcihEb21TZWxlY3Rvci5DT09SRFMpXG4gICAgY29uc3QgaXNGbGlwcGVkID0gY29vcmRzPy5jbGFzc0xpc3QuY29udGFpbnMoJ2JsYWNrJykgPz8gZmFsc2VcbiAgICBjb25zdCBzdHlsZSA9IHNldHRpbmdzLm9iZnVzY2F0aW9uc0VuYWJsZWQudmFsdWVcbiAgICAgID8gc2V0dGluZ3MucGllY2VTdHlsZS52YWx1ZVxuICAgICAgOiBzZXR0aW5ncy5waWVjZVN0eWxlLnZhbHVlID09PSAnM2QnXG4gICAgICAgID8gJzNkJ1xuICAgICAgICA6ICdpY29ucydcblxuICAgIGNsZWFyQWxsUGllY2VzKGN1c3RvbUJvYXJkU3RhdGUuY2FudmFzLCBjdXN0b21Cb2FyZFN0YXRlLnBpZWNlTWFuYWdlcilcbiAgICB1cGRhdGVQaWVjZXMoY3VzdG9tQm9hcmRTdGF0ZS5jYW52YXMsIGN1c3RvbUJvYXJkU3RhdGUucGllY2VNYW5hZ2VyLCBzdHlsZSwgaXNGbGlwcGVkLCBbXSlcbiAgICByZW5kZXIzRChjdXN0b21Cb2FyZFN0YXRlLmNhbnZhcylcbiAgfSlcbn1cbiIsImltcG9ydCB7IERvbVNlbGVjdG9yIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL2RvbSdcbmltcG9ydCB7IHF1ZXJ5U2VsZWN0b3IgfSBmcm9tICcuLi8uLi9wbGF0Zm9ybS9kb20nXG5cbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVBbm5vdGF0ZSgpOiB2b2lkIHtcbiAgY29uc3QgaW5wdXQgPSBxdWVyeVNlbGVjdG9yKERvbVNlbGVjdG9yLktFWUJPQVJEX0lOUFVUKSBhcyBIVE1MSW5wdXRFbGVtZW50IHwgbnVsbFxuICBpZiAoaW5wdXQpIHtcbiAgICBpbnB1dC5mb2N1cygpXG4gICAgaW5wdXQudmFsdWUgPSAnLSdcbiAgICBpbnB1dC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnaW5wdXQnLCB7IGJ1YmJsZXM6IHRydWUgfSkpXG4gIH1cbn1cbiIsImV4cG9ydCBlbnVtIEtleWJvYXJkQ29tbWFuZCB7XG4gIFBXSyA9ICdwd2snLFxuICBQV1EgPSAncHdxJyxcbiAgUEJLID0gJ3BiaycsXG4gIFBCUSA9ICdwYnEnLFxuICBQQSA9ICdwYScsXG4gIFBXVyA9ICdwd3cnLFxuICBQQkIgPSAncGJiJyxcbiAgUFNTID0gJ3BzcycsXG59XG5cbmV4cG9ydCBlbnVtIFNwZWVjaENvbW1hbmQge1xuICBBTEwgPSAnYWxsJyxcbiAgV0hJVEUgPSAnd2hpdGUnLFxuICBCTEFDSyA9ICdibGFjaycsXG4gIFNUT1AgPSAnc3RvcCcsXG4gIFdLID0gJ3drJyxcbiAgV1EgPSAnd3EnLFxuICBCSyA9ICdiaycsXG4gIEJRID0gJ2JxJyxcbn1cblxuLy8gS2V5Ym9hcmQgdG8gc3BlZWNoIGNvbW1hbmQgbWFwcGluZ1xuZXhwb3J0IGNvbnN0IEtFWUJPQVJEX0NPTU1BTkRfTUFQID0gbmV3IE1hcChbXG4gIFtLZXlib2FyZENvbW1hbmQuUFdLLCBTcGVlY2hDb21tYW5kLldLXSxcbiAgW0tleWJvYXJkQ29tbWFuZC5QV1EsIFNwZWVjaENvbW1hbmQuV1FdLFxuICBbS2V5Ym9hcmRDb21tYW5kLlBCSywgU3BlZWNoQ29tbWFuZC5CS10sXG4gIFtLZXlib2FyZENvbW1hbmQuUEJRLCBTcGVlY2hDb21tYW5kLkJRXSxcbiAgW0tleWJvYXJkQ29tbWFuZC5QQSwgU3BlZWNoQ29tbWFuZC5BTExdLFxuICBbS2V5Ym9hcmRDb21tYW5kLlBXVywgU3BlZWNoQ29tbWFuZC5XSElURV0sXG4gIFtLZXlib2FyZENvbW1hbmQuUEJCLCBTcGVlY2hDb21tYW5kLkJMQUNLXSxcbiAgW0tleWJvYXJkQ29tbWFuZC5QU1MsIFNwZWVjaENvbW1hbmQuU1RPUF0sXG5dIGFzIGNvbnN0KVxuIiwiZXhwb3J0IGVudW0gQW5ub3RhdGlvblR5cGUge1xuICBDSVJDTEUgPSAnY2lyY2xlJyxcbiAgQVJST1cgPSAnYXJyb3cnLFxufVxuIiwiaW1wb3J0IHsgQW5ub3RhdGlvblR5cGUgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvYW5ub3RhdGlvbnMnXG5cbmV4cG9ydCB0eXBlIERyYXdBbm5vdGF0aW9uID1cbiAgfCB7IHR5cGU6IEFubm90YXRpb25UeXBlLkNJUkNMRTsgc3F1YXJlOiBzdHJpbmcgfVxuICB8IHsgdHlwZTogQW5ub3RhdGlvblR5cGUuQVJST1c7IGZyb206IHN0cmluZzsgdG86IHN0cmluZyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZURyYXdDb21tYW5kKGNvbW1hbmQ6IHN0cmluZyk6IERyYXdBbm5vdGF0aW9uW10ge1xuICBpZiAoIWNvbW1hbmQuc3RhcnRzV2l0aCgnLScpKSByZXR1cm4gW11cblxuICBjb25zdCBjb250ZW50ID0gY29tbWFuZC5zbGljZSgxKVxuICBpZiAoIWNvbnRlbnQpIHJldHVybiBbXVxuXG4gIGNvbnN0IHBhcnRzID0gY29udGVudC5zcGxpdCgnLCcpXG4gIGNvbnN0IGFubm90YXRpb25zOiBEcmF3QW5ub3RhdGlvbltdID0gW11cblxuICBmb3IgKGNvbnN0IHBhcnQgb2YgcGFydHMpIHtcbiAgICBpZiAocGFydC5sZW5ndGggPT09IDIpIHtcbiAgICAgIC8vIFNpbmdsZSBzcXVhcmU6IGNpcmNsZVxuICAgICAgYW5ub3RhdGlvbnMucHVzaCh7IHR5cGU6IEFubm90YXRpb25UeXBlLkNJUkNMRSwgc3F1YXJlOiBwYXJ0IH0pXG4gICAgfSBlbHNlIGlmIChwYXJ0Lmxlbmd0aCA9PT0gNCkge1xuICAgICAgLy8gVHdvIHNxdWFyZXM6IGFycm93XG4gICAgICBjb25zdCBmcm9tID0gcGFydC5zbGljZSgwLCAyKVxuICAgICAgY29uc3QgdG8gPSBwYXJ0LnNsaWNlKDIsIDQpXG4gICAgICBhbm5vdGF0aW9ucy5wdXNoKHsgdHlwZTogQW5ub3RhdGlvblR5cGUuQVJST1csIGZyb20sIHRvIH0pXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGFubm90YXRpb25zXG59XG4iLCJpbXBvcnQgeyBBbm5vdGF0aW9uVHlwZSB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy9hbm5vdGF0aW9ucydcbmltcG9ydCB0eXBlIHsgRHJhd0Fubm90YXRpb24gfSBmcm9tICcuLi8uLi9kb21haW4vY29tbWFuZHMvY29tbWFuZFBhcnNlcidcbmltcG9ydCB7IFRIUkVFIH0gZnJvbSAnLi4vLi4vcGxhdGZvcm0vdGhyZWUnXG5pbXBvcnQgeyB0eXBlIENhbnZhczNEU3RhdGUsIHJlbmRlcjNEIH0gZnJvbSAnLi9jYW52YXMnXG5cbmNvbnN0IERSQVdJTkdfQ09MT1IgPSAweGZmNmI2YlxuXG5leHBvcnQgaW50ZXJmYWNlIERyYXdpbmdzM0RTdGF0ZSB7XG4gIG9iamVjdHM6IFRIUkVFLk9iamVjdDNEW11cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZURyYXdpbmdzM0RTdGF0ZSgpOiBEcmF3aW5nczNEU3RhdGUge1xuICByZXR1cm4geyBvYmplY3RzOiBbXSB9XG59XG5cbmZ1bmN0aW9uIHNxdWFyZVRvM0RDb29yZHMoc3F1YXJlOiBzdHJpbmcpOiB7IHg6IG51bWJlcjsgejogbnVtYmVyIH0ge1xuICBjb25zdCBmaWxlSW5kZXggPSBzcXVhcmUuY2hhckNvZGVBdCgwKSAtICdhJy5jaGFyQ29kZUF0KDApXG4gIGNvbnN0IHJhbmtJbmRleCA9IE51bWJlci5wYXJzZUludChzcXVhcmVbMV0pIC0gMVxuICByZXR1cm4geyB4OiAzLjUgLSBmaWxlSW5kZXgsIHo6IHJhbmtJbmRleCAtIDMuNSB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZTNEQ2lyY2xlKHg6IG51bWJlciwgejogbnVtYmVyKTogVEhSRUUuTWVzaCB7XG4gIGNvbnN0IGdlb21ldHJ5ID0gbmV3IFRIUkVFLlRvcnVzR2VvbWV0cnkoMC4zNSwgMC4wNiwgOCwgMzIpXG4gIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHtcbiAgICBjb2xvcjogRFJBV0lOR19DT0xPUixcbiAgICByb3VnaG5lc3M6IDAuNSxcbiAgICBtZXRhbG5lc3M6IDAuMSxcbiAgfSlcbiAgY29uc3QgdG9ydXMgPSBuZXcgVEhSRUUuTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpXG4gIHRvcnVzLnBvc2l0aW9uLnNldCh4LCAwLjA1LCB6KVxuICB0b3J1cy5yb3RhdGlvbi54ID0gLU1hdGguUEkgLyAyXG4gIHJldHVybiB0b3J1c1xufVxuXG5mdW5jdGlvbiBjcmVhdGUzREFycm93KHgxOiBudW1iZXIsIHoxOiBudW1iZXIsIHgyOiBudW1iZXIsIHoyOiBudW1iZXIpOiBUSFJFRS5Hcm91cCB7XG4gIGNvbnN0IGdyb3VwID0gbmV3IFRIUkVFLkdyb3VwKClcbiAgY29uc3QgZHggPSB4MiAtIHgxXG4gIGNvbnN0IGR6ID0gejIgLSB6MVxuICBjb25zdCBsZW5ndGggPSBNYXRoLnNxcnQoZHggKiBkeCArIGR6ICogZHopXG4gIGNvbnN0IGFuZ2xlID0gTWF0aC5hdGFuMigtZHgsIC1keilcblxuICBjb25zdCBhcnJvd0hlYWRMZW5ndGggPSAwLjQ1XG4gIGNvbnN0IHNoYWZ0TGVuZ3RoID0gbGVuZ3RoIC0gYXJyb3dIZWFkTGVuZ3RoXG5cbiAgY29uc3Qgc2hhZnRHZW9tZXRyeSA9IG5ldyBUSFJFRS5DeWxpbmRlckdlb21ldHJ5KDAuMDcsIDAuMDcsIHNoYWZ0TGVuZ3RoLCA4KVxuICBjb25zdCBzaGFmdE1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHtcbiAgICBjb2xvcjogRFJBV0lOR19DT0xPUixcbiAgICByb3VnaG5lc3M6IDAuNSxcbiAgICBtZXRhbG5lc3M6IDAuMSxcbiAgfSlcbiAgY29uc3Qgc2hhZnQgPSBuZXcgVEhSRUUuTWVzaChzaGFmdEdlb21ldHJ5LCBzaGFmdE1hdGVyaWFsKVxuICBzaGFmdC5wb3NpdGlvbi5zZXQoMCwgMCwgLXNoYWZ0TGVuZ3RoIC8gMilcbiAgc2hhZnQucm90YXRpb24ueCA9IE1hdGguUEkgLyAyXG4gIGdyb3VwLmFkZChzaGFmdClcblxuICBjb25zdCBoZWFkR2VvbWV0cnkgPSBuZXcgVEhSRUUuQ29uZUdlb21ldHJ5KDAuMjIsIGFycm93SGVhZExlbmd0aCwgOClcbiAgY29uc3QgaGVhZE1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHtcbiAgICBjb2xvcjogRFJBV0lOR19DT0xPUixcbiAgICByb3VnaG5lc3M6IDAuNSxcbiAgICBtZXRhbG5lc3M6IDAuMSxcbiAgfSlcbiAgY29uc3QgaGVhZCA9IG5ldyBUSFJFRS5NZXNoKGhlYWRHZW9tZXRyeSwgaGVhZE1hdGVyaWFsKVxuICBoZWFkLnBvc2l0aW9uLnNldCgwLCAwLCAtKHNoYWZ0TGVuZ3RoICsgYXJyb3dIZWFkTGVuZ3RoIC8gMikpXG4gIGhlYWQucm90YXRpb24ueCA9IC1NYXRoLlBJIC8gMlxuICBncm91cC5hZGQoaGVhZClcblxuICBncm91cC5wb3NpdGlvbi5zZXQoeDEsIDAuMDgsIHoxKVxuICBncm91cC5yb3RhdGlvbi55ID0gYW5nbGVcblxuICByZXR1cm4gZ3JvdXBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRyYXczREFubm90YXRpb25zKFxuICBjYW52YXNTdGF0ZTogQ2FudmFzM0RTdGF0ZSxcbiAgZHJhd2luZ3NTdGF0ZTogRHJhd2luZ3MzRFN0YXRlLFxuICBhbm5vdGF0aW9uczogRHJhd0Fubm90YXRpb25bXVxuKTogdm9pZCB7XG4gIGNsZWFyM0REcmF3aW5ncyhjYW52YXNTdGF0ZSwgZHJhd2luZ3NTdGF0ZSlcblxuICBmb3IgKGNvbnN0IGFubm90YXRpb24gb2YgYW5ub3RhdGlvbnMpIHtcbiAgICBpZiAoYW5ub3RhdGlvbi50eXBlID09PSBBbm5vdGF0aW9uVHlwZS5DSVJDTEUpIHtcbiAgICAgIGNvbnN0IGNvb3JkcyA9IHNxdWFyZVRvM0RDb29yZHMoYW5ub3RhdGlvbi5zcXVhcmUpXG4gICAgICBjb25zdCBjaXJjbGUgPSBjcmVhdGUzRENpcmNsZShjb29yZHMueCwgY29vcmRzLnopXG4gICAgICBjYW52YXNTdGF0ZS5zY2VuZS5hZGQoY2lyY2xlKVxuICAgICAgZHJhd2luZ3NTdGF0ZS5vYmplY3RzLnB1c2goY2lyY2xlKVxuICAgIH0gZWxzZSBpZiAoYW5ub3RhdGlvbi50eXBlID09PSBBbm5vdGF0aW9uVHlwZS5BUlJPVykge1xuICAgICAgY29uc3QgZnJvbSA9IHNxdWFyZVRvM0RDb29yZHMoYW5ub3RhdGlvbi5mcm9tKVxuICAgICAgY29uc3QgdG8gPSBzcXVhcmVUbzNEQ29vcmRzKGFubm90YXRpb24udG8pXG4gICAgICBjb25zdCBhcnJvdyA9IGNyZWF0ZTNEQXJyb3coZnJvbS54LCBmcm9tLnosIHRvLngsIHRvLnopXG4gICAgICBjYW52YXNTdGF0ZS5zY2VuZS5hZGQoYXJyb3cpXG4gICAgICBkcmF3aW5nc1N0YXRlLm9iamVjdHMucHVzaChhcnJvdylcbiAgICB9XG4gIH1cblxuICByZW5kZXIzRChjYW52YXNTdGF0ZSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyM0REcmF3aW5ncyhjYW52YXNTdGF0ZTogQ2FudmFzM0RTdGF0ZSwgZHJhd2luZ3NTdGF0ZTogRHJhd2luZ3MzRFN0YXRlKTogdm9pZCB7XG4gIGZvciAoY29uc3Qgb2JqIG9mIGRyYXdpbmdzU3RhdGUub2JqZWN0cykge1xuICAgIGNhbnZhc1N0YXRlLnNjZW5lLnJlbW92ZShvYmopXG4gICAgb2JqLnRyYXZlcnNlKChjaGlsZCkgPT4ge1xuICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgVEhSRUUuTWVzaCkge1xuICAgICAgICBjaGlsZC5nZW9tZXRyeT8uZGlzcG9zZSgpXG4gICAgICAgIGlmIChjaGlsZC5tYXRlcmlhbCBpbnN0YW5jZW9mIFRIUkVFLk1hdGVyaWFsKSB7XG4gICAgICAgICAgY2hpbGQubWF0ZXJpYWwuZGlzcG9zZSgpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9XG4gIGRyYXdpbmdzU3RhdGUub2JqZWN0cyA9IFtdXG59XG4iLCJpbXBvcnQgeyBBbm5vdGF0aW9uVHlwZSB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy9hbm5vdGF0aW9ucydcbmltcG9ydCB7IENzc0NsYXNzLCBEb21TZWxlY3RvciB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy9kb20nXG5pbXBvcnQgdHlwZSB7IERyYXdBbm5vdGF0aW9uIH0gZnJvbSAnLi4vLi4vZG9tYWluL2NvbW1hbmRzL2NvbW1hbmRQYXJzZXInXG5pbXBvcnQgeyBhcHBlbmRDaGlsZCwgY3JlYXRlU3ZnRWxlbWVudCwgcXVlcnlTZWxlY3RvciwgcmVtb3ZlRWxlbWVudCB9IGZyb20gJy4uLy4uL3BsYXRmb3JtL2RvbSdcblxuZXhwb3J0IGludGVyZmFjZSBBbm5vdGF0aW9uc1N0YXRlIHtcbiAgc3ZnOiBTVkdTVkdFbGVtZW50XG59XG5cbmNvbnN0IEFOTk9UQVRJT05fQ09MT1IgPSAncmVkJ1xuY29uc3QgQ0lSQ0xFX1JBRElVUyA9IDIwXG5jb25zdCBBUlJPV19XSURUSCA9IDNcblxuZnVuY3Rpb24gc3F1YXJlVG9QaXhlbFBvc2l0aW9uKHNxdWFyZTogc3RyaW5nLCBib2FyZFNpemU6IG51bWJlcik6IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfSB7XG4gIGNvbnN0IGZpbGUgPSBzcXVhcmUuY2hhckNvZGVBdCgwKSAtICdhJy5jaGFyQ29kZUF0KDApIC8vIDAtN1xuICBjb25zdCByYW5rID0gTnVtYmVyLnBhcnNlSW50KHNxdWFyZVsxXSkgLSAxIC8vIDAtN1xuXG4gIGNvbnN0IHNxdWFyZVNpemUgPSBib2FyZFNpemUgLyA4XG4gIGNvbnN0IHggPSBmaWxlICogc3F1YXJlU2l6ZSArIHNxdWFyZVNpemUgLyAyXG4gIGNvbnN0IHkgPSAoNyAtIHJhbmspICogc3F1YXJlU2l6ZSArIHNxdWFyZVNpemUgLyAyXG5cbiAgcmV0dXJuIHsgeCwgeSB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUNpcmNsZShzcXVhcmU6IHN0cmluZywgYm9hcmRTaXplOiBudW1iZXIpOiBTVkdDaXJjbGVFbGVtZW50IHtcbiAgY29uc3QgcG9zID0gc3F1YXJlVG9QaXhlbFBvc2l0aW9uKHNxdWFyZSwgYm9hcmRTaXplKVxuXG4gIGNvbnN0IGNpcmNsZSA9IGNyZWF0ZVN2Z0VsZW1lbnQoJ2NpcmNsZScpIGFzIFNWR0NpcmNsZUVsZW1lbnRcbiAgY2lyY2xlLnNldEF0dHJpYnV0ZSgnY3gnLCBwb3MueC50b1N0cmluZygpKVxuICBjaXJjbGUuc2V0QXR0cmlidXRlKCdjeScsIHBvcy55LnRvU3RyaW5nKCkpXG4gIGNpcmNsZS5zZXRBdHRyaWJ1dGUoJ3InLCBDSVJDTEVfUkFESVVTLnRvU3RyaW5nKCkpXG4gIGNpcmNsZS5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCAnbm9uZScpXG4gIGNpcmNsZS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsIEFOTk9UQVRJT05fQ09MT1IpXG4gIGNpcmNsZS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS13aWR0aCcsICczJylcblxuICByZXR1cm4gY2lyY2xlXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUFycm93KGZyb206IHN0cmluZywgdG86IHN0cmluZywgYm9hcmRTaXplOiBudW1iZXIpOiBTVkdHRWxlbWVudCB7XG4gIGNvbnN0IGZyb21Qb3MgPSBzcXVhcmVUb1BpeGVsUG9zaXRpb24oZnJvbSwgYm9hcmRTaXplKVxuICBjb25zdCB0b1BvcyA9IHNxdWFyZVRvUGl4ZWxQb3NpdGlvbih0bywgYm9hcmRTaXplKVxuXG4gIGNvbnN0IGdyb3VwID0gY3JlYXRlU3ZnRWxlbWVudCgnZycpIGFzIFNWR0dFbGVtZW50XG5cbiAgLy8gQXJyb3cgbGluZVxuICBjb25zdCBsaW5lID0gY3JlYXRlU3ZnRWxlbWVudCgnbGluZScpXG4gIGxpbmUuc2V0QXR0cmlidXRlKCd4MScsIGZyb21Qb3MueC50b1N0cmluZygpKVxuICBsaW5lLnNldEF0dHJpYnV0ZSgneTEnLCBmcm9tUG9zLnkudG9TdHJpbmcoKSlcbiAgbGluZS5zZXRBdHRyaWJ1dGUoJ3gyJywgdG9Qb3MueC50b1N0cmluZygpKVxuICBsaW5lLnNldEF0dHJpYnV0ZSgneTInLCB0b1Bvcy55LnRvU3RyaW5nKCkpXG4gIGxpbmUuc2V0QXR0cmlidXRlKCdzdHJva2UnLCBBTk5PVEFUSU9OX0NPTE9SKVxuICBsaW5lLnNldEF0dHJpYnV0ZSgnc3Ryb2tlLXdpZHRoJywgQVJST1dfV0lEVEgudG9TdHJpbmcoKSlcbiAgbGluZS5zZXRBdHRyaWJ1dGUoJ21hcmtlci1lbmQnLCAndXJsKCNhcnJvd2hlYWQpJylcblxuICBhcHBlbmRDaGlsZChncm91cCwgbGluZSlcblxuICByZXR1cm4gZ3JvdXBcbn1cblxuZnVuY3Rpb24gY3JlYXRlQXJyb3doZWFkTWFya2VyKCk6IFNWR0RlZnNFbGVtZW50IHtcbiAgY29uc3QgZGVmcyA9IGNyZWF0ZVN2Z0VsZW1lbnQoJ2RlZnMnKSBhcyBTVkdEZWZzRWxlbWVudFxuICBjb25zdCBtYXJrZXIgPSBjcmVhdGVTdmdFbGVtZW50KCdtYXJrZXInKSBhcyBTVkdNYXJrZXJFbGVtZW50XG4gIG1hcmtlci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2Fycm93aGVhZCcpXG4gIG1hcmtlci5zZXRBdHRyaWJ1dGUoJ21hcmtlcldpZHRoJywgJzEwJylcbiAgbWFya2VyLnNldEF0dHJpYnV0ZSgnbWFya2VySGVpZ2h0JywgJzEwJylcbiAgbWFya2VyLnNldEF0dHJpYnV0ZSgncmVmWCcsICc5JylcbiAgbWFya2VyLnNldEF0dHJpYnV0ZSgncmVmWScsICczJylcbiAgbWFya2VyLnNldEF0dHJpYnV0ZSgnb3JpZW50JywgJ2F1dG8nKVxuXG4gIGNvbnN0IHBvbHlnb24gPSBjcmVhdGVTdmdFbGVtZW50KCdwb2x5Z29uJylcbiAgcG9seWdvbi5zZXRBdHRyaWJ1dGUoJ3BvaW50cycsICcwIDAsIDEwIDMsIDAgNicpXG4gIHBvbHlnb24uc2V0QXR0cmlidXRlKCdmaWxsJywgQU5OT1RBVElPTl9DT0xPUilcblxuICBhcHBlbmRDaGlsZChtYXJrZXIsIHBvbHlnb24pXG4gIGFwcGVuZENoaWxkKGRlZnMsIG1hcmtlcilcblxuICByZXR1cm4gZGVmc1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQW5ub3RhdGlvbnMoKTogQW5ub3RhdGlvbnNTdGF0ZSB7XG4gIGNvbnN0IGNvbnRhaW5lciA9IHF1ZXJ5U2VsZWN0b3IoRG9tU2VsZWN0b3IuQ09OVEFJTkVSKVxuICBpZiAoIWNvbnRhaW5lcikge1xuICAgIHRocm93IG5ldyBFcnJvcignQ29udGFpbmVyIG5vdCBmb3VuZCcpXG4gIH1cblxuICBjb25zdCBib2FyZCA9IHF1ZXJ5U2VsZWN0b3IoRG9tU2VsZWN0b3IuQk9BUkQpXG4gIGlmICghYm9hcmQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0JvYXJkIG5vdCBmb3VuZCcpXG4gIH1cblxuICBjb25zdCByZWN0ID0gYm9hcmQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgY29uc3Qgc2l6ZSA9IHJlY3Qud2lkdGhcblxuICBjb25zdCBzdmcgPSBjcmVhdGVTdmdFbGVtZW50KCdzdmcnKSBhcyBTVkdTVkdFbGVtZW50XG4gIHN2Zy5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgQ3NzQ2xhc3MuVVNFUlNDUklQVF9EUkFXSU5HUylcbiAgc3ZnLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCBzaXplLnRvU3RyaW5nKCkpXG4gIHN2Zy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIHNpemUudG9TdHJpbmcoKSlcbiAgc3ZnLnN0eWxlLmNzc1RleHQgPSBgXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMDtcbiAgICBsZWZ0OiAwO1xuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgIHotaW5kZXg6IDIwMDtcbiAgYFxuXG4gIC8vIEFkZCBhcnJvd2hlYWQgbWFya2VyIGRlZmluaXRpb25cbiAgY29uc3QgZGVmcyA9IGNyZWF0ZUFycm93aGVhZE1hcmtlcigpXG4gIGFwcGVuZENoaWxkKHN2ZywgZGVmcylcblxuICBhcHBlbmRDaGlsZChjb250YWluZXIsIHN2ZylcblxuICByZXR1cm4geyBzdmcgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZHJhd0Fubm90YXRpb25zKHN0YXRlOiBBbm5vdGF0aW9uc1N0YXRlLCBhbm5vdGF0aW9uczogRHJhd0Fubm90YXRpb25bXSk6IHZvaWQge1xuICAvLyBDbGVhciBleGlzdGluZyBhbm5vdGF0aW9ucyAoZXhjZXB0IGRlZnMpXG4gIGNvbnN0IGNoaWxkcmVuID0gQXJyYXkuZnJvbShzdGF0ZS5zdmcuY2hpbGRyZW4pXG4gIGZvciAoY29uc3QgY2hpbGQgb2YgY2hpbGRyZW4pIHtcbiAgICBpZiAoY2hpbGQudGFnTmFtZSAhPT0gJ2RlZnMnKSB7XG4gICAgICByZW1vdmVFbGVtZW50KGNoaWxkIGFzIFNWR0VsZW1lbnQpXG4gICAgfVxuICB9XG5cbiAgaWYgKGFubm90YXRpb25zLmxlbmd0aCA9PT0gMCkgcmV0dXJuXG5cbiAgY29uc3QgYm9hcmQgPSBxdWVyeVNlbGVjdG9yKERvbVNlbGVjdG9yLkJPQVJEKVxuICBpZiAoIWJvYXJkKSByZXR1cm5cblxuICBjb25zdCByZWN0ID0gYm9hcmQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgY29uc3QgYm9hcmRTaXplID0gcmVjdC53aWR0aFxuXG4gIC8vIERyYXcgZWFjaCBhbm5vdGF0aW9uXG4gIGZvciAoY29uc3QgYW5ub3RhdGlvbiBvZiBhbm5vdGF0aW9ucykge1xuICAgIGlmIChhbm5vdGF0aW9uLnR5cGUgPT09IEFubm90YXRpb25UeXBlLkNJUkNMRSkge1xuICAgICAgY29uc3QgY2lyY2xlID0gY3JlYXRlQ2lyY2xlKGFubm90YXRpb24uc3F1YXJlLCBib2FyZFNpemUpXG4gICAgICBhcHBlbmRDaGlsZChzdGF0ZS5zdmcsIGNpcmNsZSlcbiAgICB9IGVsc2UgaWYgKGFubm90YXRpb24udHlwZSA9PT0gQW5ub3RhdGlvblR5cGUuQVJST1cpIHtcbiAgICAgIGNvbnN0IGFycm93ID0gY3JlYXRlQXJyb3coYW5ub3RhdGlvbi5mcm9tLCBhbm5vdGF0aW9uLnRvLCBib2FyZFNpemUpXG4gICAgICBhcHBlbmRDaGlsZChzdGF0ZS5zdmcsIGFycm93KVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJBbm5vdGF0aW9ucyhzdGF0ZTogQW5ub3RhdGlvbnNTdGF0ZSk6IHZvaWQge1xuICBkcmF3QW5ub3RhdGlvbnMoc3RhdGUsIFtdKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVzdHJveUFubm90YXRpb25zKHN0YXRlOiBBbm5vdGF0aW9uc1N0YXRlKTogdm9pZCB7XG4gIHJlbW92ZUVsZW1lbnQoc3RhdGUuc3ZnKVxufVxuIiwiaW1wb3J0IHsgcGFyc2VEcmF3Q29tbWFuZCB9IGZyb20gJy4uLy4uL2RvbWFpbi9jb21tYW5kcy9jb21tYW5kUGFyc2VyJ1xuaW1wb3J0IHR5cGUgeyBEcmF3aW5nczNEU3RhdGUgfSBmcm9tICcuLi8uLi9wcmVzZW50YXRpb24vM2QvZHJhd2luZ3MzZCdcbmltcG9ydCB7IGRyYXczREFubm90YXRpb25zIH0gZnJvbSAnLi4vLi4vcHJlc2VudGF0aW9uLzNkL2RyYXdpbmdzM2QnXG5pbXBvcnQgdHlwZSB7IEFubm90YXRpb25zU3RhdGUgfSBmcm9tICcuLi8uLi9wcmVzZW50YXRpb24vbm9uLXByZWFjdC1jb21wb25lbnRzL2Fubm90YXRpb25zJ1xuaW1wb3J0IHsgZHJhd0Fubm90YXRpb25zIH0gZnJvbSAnLi4vLi4vcHJlc2VudGF0aW9uL25vbi1wcmVhY3QtY29tcG9uZW50cy9hbm5vdGF0aW9ucydcbmltcG9ydCB0eXBlIHsgQ3VzdG9tQm9hcmRTdGF0ZSB9IGZyb20gJy4vaGFuZGxlQ3VzdG9tQm9hcmQnXG5cbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVEcmF3Q29tbWFuZChcbiAgY29tbWFuZDogc3RyaW5nLFxuICBhbm5vdGF0aW9uc1N0YXRlOiBBbm5vdGF0aW9uc1N0YXRlLFxuICBjdXN0b21Cb2FyZFN0YXRlOiBDdXN0b21Cb2FyZFN0YXRlLFxuICBkcmF3aW5nczNEU3RhdGU6IERyYXdpbmdzM0RTdGF0ZVxuKTogdm9pZCB7XG4gIGNvbnN0IGFubm90YXRpb25zID0gcGFyc2VEcmF3Q29tbWFuZChjb21tYW5kKVxuXG4gIGlmIChjdXN0b21Cb2FyZFN0YXRlLmNhbnZhcykge1xuICAgIGRyYXczREFubm90YXRpb25zKGN1c3RvbUJvYXJkU3RhdGUuY2FudmFzLCBkcmF3aW5nczNEU3RhdGUsIGFubm90YXRpb25zKVxuICB9IGVsc2Uge1xuICAgIGRyYXdBbm5vdGF0aW9ucyhhbm5vdGF0aW9uc1N0YXRlLCBhbm5vdGF0aW9ucylcbiAgfVxufVxuIiwiZXhwb3J0IGVudW0gUGxheWVyQ29sb3Ige1xuICBXSElURSA9ICd3aGl0ZScsXG4gIEJMQUNLID0gJ2JsYWNrJyxcbn1cblxuZXhwb3J0IGVudW0gUGllY2VUeXBlIHtcbiAgUEFXTiA9ICdwYXduJyxcbiAgS05JR0hUID0gJ2tuaWdodCcsXG4gIEJJU0hPUCA9ICdiaXNob3AnLFxuICBST09LID0gJ3Jvb2snLFxuICBRVUVFTiA9ICdxdWVlbicsXG4gIEtJTkcgPSAna2luZycsXG59XG5cbmV4cG9ydCBlbnVtIFF1YWRyYW50IHtcbiAgV0hJVEVfS0lORyA9ICd3aycsXG4gIFdISVRFX1FVRUVOID0gJ3dxJyxcbiAgQkxBQ0tfS0lORyA9ICdiaycsXG4gIEJMQUNLX1FVRUVOID0gJ2JxJyxcbn1cblxuLy8gSGVscGVyIGFycmF5cyBmb3IgaXRlcmF0aW9uXG5leHBvcnQgY29uc3QgUExBWUVSX0NPTE9SX1ZBTFVFUyA9IE9iamVjdC52YWx1ZXMoUGxheWVyQ29sb3IpXG5leHBvcnQgY29uc3QgUElFQ0VfVFlQRV9WQUxVRVMgPSBPYmplY3QudmFsdWVzKFBpZWNlVHlwZSlcbmV4cG9ydCBjb25zdCBRVUFEUkFOVF9WQUxVRVMgPSBPYmplY3QudmFsdWVzKFF1YWRyYW50KVxuIiwiaW1wb3J0IHsgdHlwZSBQaWVjZVR5cGUsIFBsYXllckNvbG9yLCBRdWFkcmFudCB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy9jaGVzcydcblxuZXhwb3J0IGludGVyZmFjZSBQaWVjZVBvc2l0aW9uIHtcbiAgc3F1YXJlOiBzdHJpbmdcbiAgY29sb3I6IFBsYXllckNvbG9yXG4gIHR5cGU6IFBpZWNlVHlwZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyUXVhZHJhbnQocGllY2VzOiBQaWVjZVBvc2l0aW9uW10sIHF1YWRyYW50OiBRdWFkcmFudCk6IFBpZWNlUG9zaXRpb25bXSB7XG4gIHJldHVybiBwaWVjZXMuZmlsdGVyKChwaWVjZSkgPT4ge1xuICAgIC8vIFZhbGlkYXRlIHNxdWFyZSBmb3JtYXRcbiAgICBpZiAoIXBpZWNlLnNxdWFyZSB8fCBwaWVjZS5zcXVhcmUubGVuZ3RoIDwgMikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHNxdWFyZSBmb3JtYXQ6ICR7cGllY2Uuc3F1YXJlfWApXG4gICAgfVxuXG4gICAgY29uc3QgZmlsZSA9IHBpZWNlLnNxdWFyZVswXVxuICAgIGNvbnN0IHJhbmsgPSBOdW1iZXIucGFyc2VJbnQocGllY2Uuc3F1YXJlWzFdLCAxMClcblxuICAgIC8vIFZhbGlkYXRlIGZpbGUgYW5kIHJhbmtcbiAgICBpZiAoZmlsZSA8ICdhJyB8fCBmaWxlID4gJ2gnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgZmlsZTogJHtmaWxlfWApXG4gICAgfVxuICAgIGlmIChOdW1iZXIuaXNOYU4ocmFuaykgfHwgcmFuayA8IDEgfHwgcmFuayA+IDgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCByYW5rOiAke3Jhbmt9YClcbiAgICB9XG5cbiAgICAvLyBEZXRlcm1pbmUgZmlsZSByYW5nZSAoa2luZy1zaWRlOiBlLWgsIHF1ZWVuLXNpZGU6IGEtZClcbiAgICBjb25zdCBpc0tpbmdTaWRlID0gZmlsZSA+PSAnZSdcblxuICAgIC8vIERldGVybWluZSByYW5rIHJhbmdlICh3aGl0ZTogMS00LCBibGFjazogNS04KVxuICAgIGNvbnN0IGlzV2hpdGVSYW5rcyA9IHJhbmsgPj0gMSAmJiByYW5rIDw9IDRcblxuICAgIC8vIE1hdGNoIHF1YWRyYW50XG4gICAgaWYgKHF1YWRyYW50ID09PSBRdWFkcmFudC5XSElURV9LSU5HKSByZXR1cm4gaXNLaW5nU2lkZSAmJiBpc1doaXRlUmFua3NcbiAgICBpZiAocXVhZHJhbnQgPT09IFF1YWRyYW50LldISVRFX1FVRUVOKSByZXR1cm4gIWlzS2luZ1NpZGUgJiYgaXNXaGl0ZVJhbmtzXG4gICAgaWYgKHF1YWRyYW50ID09PSBRdWFkcmFudC5CTEFDS19LSU5HKSByZXR1cm4gaXNLaW5nU2lkZSAmJiAhaXNXaGl0ZVJhbmtzXG4gICAgaWYgKHF1YWRyYW50ID09PSBRdWFkcmFudC5CTEFDS19RVUVFTikgcmV0dXJuICFpc0tpbmdTaWRlICYmICFpc1doaXRlUmFua3NcblxuICAgIHJldHVybiBmYWxzZVxuICB9KVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEdyb3VwZWRQaWVjZXMge1xuICBjb2xvcjogUGxheWVyQ29sb3JcbiAgdHlwZTogc3RyaW5nXG4gIHNxdWFyZXM6IHN0cmluZ1tdXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBncm91cEJ5Q29sb3JBbmRUeXBlKHBpZWNlczogUGllY2VQb3NpdGlvbltdKTogR3JvdXBlZFBpZWNlc1tdIHtcbiAgY29uc3QgZ3JvdXBzID0gbmV3IE1hcDxzdHJpbmcsIEdyb3VwZWRQaWVjZXM+KClcblxuICBmb3IgKGNvbnN0IHBpZWNlIG9mIHBpZWNlcykge1xuICAgIC8vIFZhbGlkYXRlIHJlcXVpcmVkIHByb3BlcnRpZXNcbiAgICBpZiAoIXBpZWNlLnNxdWFyZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQaWVjZSBtaXNzaW5nIHNxdWFyZSBwcm9wZXJ0eScpXG4gICAgfVxuICAgIGlmICghcGllY2UuY29sb3IpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUGllY2UgbWlzc2luZyBjb2xvciBwcm9wZXJ0eScpXG4gICAgfVxuICAgIGlmICghcGllY2UudHlwZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQaWVjZSBtaXNzaW5nIHR5cGUgcHJvcGVydHknKVxuICAgIH1cblxuICAgIGNvbnN0IGtleSA9IGAke3BpZWNlLmNvbG9yfS0ke3BpZWNlLnR5cGV9YFxuXG4gICAgaWYgKCFncm91cHMuaGFzKGtleSkpIHtcbiAgICAgIGdyb3Vwcy5zZXQoa2V5LCB7XG4gICAgICAgIGNvbG9yOiBwaWVjZS5jb2xvcixcbiAgICAgICAgdHlwZTogcGllY2UudHlwZSxcbiAgICAgICAgc3F1YXJlczogW10sXG4gICAgICB9KVxuICAgIH1cblxuICAgIGdyb3Vwcy5nZXQoa2V5KT8uc3F1YXJlcy5wdXNoKHBpZWNlLnNxdWFyZSlcbiAgfVxuXG4gIC8vIFNvcnQgZ3JvdXBzIGJ5IGNvbG9yICh3aGl0ZSBmaXJzdCkgdGhlbiB0eXBlXG4gIHJldHVybiBBcnJheS5mcm9tKGdyb3Vwcy52YWx1ZXMoKSkuc29ydCgoYSwgYikgPT4ge1xuICAgIGlmIChhLmNvbG9yICE9PSBiLmNvbG9yKSB7XG4gICAgICByZXR1cm4gYS5jb2xvciA9PT0gUGxheWVyQ29sb3IuV0hJVEUgPyAtMSA6IDFcbiAgICB9XG4gICAgcmV0dXJuIGEudHlwZS5sb2NhbGVDb21wYXJlKGIudHlwZSlcbiAgfSlcbn1cbiIsImltcG9ydCB7IHR5cGUgUGllY2VQb3NpdGlvbiwgZ3JvdXBCeUNvbG9yQW5kVHlwZSB9IGZyb20gJy4uL2NoZXNzL3BpZWNlR3JvdXBpbmcnXG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVF1YWRyYW50VGV4dChwaWVjZXM6IFBpZWNlUG9zaXRpb25bXSk6IHN0cmluZyB7XG4gIGlmIChwaWVjZXMubGVuZ3RoID09PSAwKSByZXR1cm4gJydcblxuICBjb25zdCBncm91cHMgPSBncm91cEJ5Q29sb3JBbmRUeXBlKHBpZWNlcylcbiAgY29uc3Qgc2VudGVuY2VzOiBzdHJpbmdbXSA9IFtdXG5cbiAgZm9yIChjb25zdCBncm91cCBvZiBncm91cHMpIHtcbiAgICBjb25zdCBjb2xvck5hbWUgPSBncm91cC5jb2xvclxuICAgIGNvbnN0IHR5cGVOYW1lID0gZ3JvdXAuc3F1YXJlcy5sZW5ndGggPiAxID8gYCR7Z3JvdXAudHlwZX1zYCA6IGdyb3VwLnR5cGVcblxuICAgIGlmIChncm91cC5zcXVhcmVzLmxlbmd0aCA+IDEpIHtcbiAgICAgIC8vIE11bHRpcGxlIHBpZWNlczogXCJ3aGl0ZSBwYXducyBvbiBhMiwgYjJcIlxuICAgICAgY29uc3Qgc3F1YXJlcyA9IGdyb3VwLnNxdWFyZXMuam9pbignLCAnKVxuICAgICAgc2VudGVuY2VzLnB1c2goYCR7Y29sb3JOYW1lfSAke3R5cGVOYW1lfSBvbiAke3NxdWFyZXN9YClcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU2luZ2xlIHBpZWNlOiBcImUxIHdoaXRlIGtpbmdcIlxuICAgICAgc2VudGVuY2VzLnB1c2goYCR7Z3JvdXAuc3F1YXJlc1swXX0gJHtjb2xvck5hbWV9ICR7Z3JvdXAudHlwZX1gKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBgJHtzZW50ZW5jZXMuam9pbignLiAnKX0uYFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVBbGxQaWVjZXNUZXh0KHBpZWNlczogUGllY2VQb3NpdGlvbltdKTogc3RyaW5nIHtcbiAgcmV0dXJuIGdlbmVyYXRlUXVhZHJhbnRUZXh0KHBpZWNlcylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlQ29sb3JUZXh0KHBpZWNlczogUGllY2VQb3NpdGlvbltdLCBjb2xvcjogJ3doaXRlJyB8ICdibGFjaycpOiBzdHJpbmcge1xuICBjb25zdCBmaWx0ZXJlZCA9IHBpZWNlcy5maWx0ZXIoKHApID0+IHAuY29sb3IgPT09IGNvbG9yKVxuICByZXR1cm4gZ2VuZXJhdGVRdWFkcmFudFRleHQoZmlsdGVyZWQpXG59XG4iLCJleHBvcnQgZnVuY3Rpb24gZ2V0U3BlZWNoU3ludGhlc2lzKCk6IFNwZWVjaFN5bnRoZXNpcyB7XG4gIHJldHVybiB3aW5kb3cuc3BlZWNoU3ludGhlc2lzXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTcGVlY2hTeW50aGVzaXNVdHRlcmFuY2UoKTogdHlwZW9mIFNwZWVjaFN5bnRoZXNpc1V0dGVyYW5jZSB7XG4gIHJldHVybiBTcGVlY2hTeW50aGVzaXNVdHRlcmFuY2Vcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNwZWFrKHN5bnRoZXNpczogU3BlZWNoU3ludGhlc2lzLCB1dHRlcmFuY2U6IFNwZWVjaFN5bnRoZXNpc1V0dGVyYW5jZSk6IHZvaWQge1xuICBzeW50aGVzaXMuc3BlYWsodXR0ZXJhbmNlKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FuY2VsKHN5bnRoZXNpczogU3BlZWNoU3ludGhlc2lzKTogdm9pZCB7XG4gIHN5bnRoZXNpcy5jYW5jZWwoKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVXR0ZXJhbmNlKFxuICBVdHRlcmFuY2VDbGFzczogdHlwZW9mIFNwZWVjaFN5bnRoZXNpc1V0dGVyYW5jZSxcbiAgdGV4dDogc3RyaW5nXG4pOiBTcGVlY2hTeW50aGVzaXNVdHRlcmFuY2Uge1xuICByZXR1cm4gbmV3IFV0dGVyYW5jZUNsYXNzKHRleHQpXG59XG4iLCJpbXBvcnQgKiBhcyBjb3JlIGZyb20gJy4vY29yZSdcblxuZXhwb3J0IGZ1bmN0aW9uIHNwZWFrVGV4dCh0ZXh0OiBzdHJpbmcsIHJhdGU6IG51bWJlcik6IHZvaWQge1xuICBjb25zdCBzeW50aGVzaXMgPSBjb3JlLmdldFNwZWVjaFN5bnRoZXNpcygpXG4gIGNvbnN0IFV0dGVyYW5jZUNsYXNzID0gY29yZS5nZXRTcGVlY2hTeW50aGVzaXNVdHRlcmFuY2UoKVxuICBjb25zdCB1dHRlcmFuY2UgPSBjb3JlLmNyZWF0ZVV0dGVyYW5jZShVdHRlcmFuY2VDbGFzcywgdGV4dClcbiAgdXR0ZXJhbmNlLnJhdGUgPSByYXRlXG4gIGNvcmUuc3BlYWsoc3ludGhlc2lzLCB1dHRlcmFuY2UpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdG9wU3BlYWtpbmcoKTogdm9pZCB7XG4gIGNvbnN0IHN5bnRoZXNpcyA9IGNvcmUuZ2V0U3BlZWNoU3ludGhlc2lzKClcbiAgY29yZS5jYW5jZWwoc3ludGhlc2lzKVxufVxuIiwiaW1wb3J0IHsgUGxheWVyQ29sb3IgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvY2hlc3MnXG5cbmV4cG9ydCBpbnRlcmZhY2UgUGl4ZWxQb3NpdGlvbiB7XG4gIHg6IG51bWJlclxuICB5OiBudW1iZXJcbn1cblxuY29uc3QgRklMRVMgPSAnYWJjZGVmZ2gnXG5cbmV4cG9ydCBmdW5jdGlvbiBwaXhlbHNUb1NxdWFyZShcbiAgcG9zaXRpb246IFBpeGVsUG9zaXRpb24sXG4gIHNxdWFyZVNpemU6IG51bWJlcixcbiAgcGxheWVyQ29sb3I6IFBsYXllckNvbG9yXG4pOiBzdHJpbmcge1xuICAvLyBDb252ZXJ0IHBpeGVscyB0byBncmlkIGluZGljZXMgKDAtNylcbiAgLy8gQWRqdXN0IGZvciBjZW50ZXItYmFzZWQgY29vcmRpbmF0ZXMgYmVmb3JlIHJvdW5kaW5nXG4gIGxldCBjb2wgPSBNYXRoLnJvdW5kKChwb3NpdGlvbi54IC0gc3F1YXJlU2l6ZSAvIDIpIC8gc3F1YXJlU2l6ZSlcbiAgbGV0IHJvdyA9IE1hdGgucm91bmQoKHBvc2l0aW9uLnkgLSBzcXVhcmVTaXplIC8gMikgLyBzcXVhcmVTaXplKVxuXG4gIC8vIENsYW1wIHRvIHZhbGlkIHJhbmdlXG4gIGNvbCA9IE1hdGgubWF4KDAsIE1hdGgubWluKDcsIGNvbCkpXG4gIHJvdyA9IE1hdGgubWF4KDAsIE1hdGgubWluKDcsIHJvdykpXG5cbiAgLy8gQ29udmVydCB0byByYW5rIGJhc2VkIG9uIHBsYXllciBjb2xvclxuICAvLyBGb3Igd2hpdGU6IHk9MCBpcyByYW5rIDgsIHkgaW5jcmVhc2VzIGdvaW5nIHRvIHJhbmsgMVxuICAvLyBGb3IgYmxhY2s6IHk9MCBpcyByYW5rIDEsIHkgaW5jcmVhc2VzIGdvaW5nIHRvIHJhbmsgOFxuICBsZXQgcmFuazogbnVtYmVyXG4gIGxldCBmaWxlOiBzdHJpbmdcblxuICBpZiAocGxheWVyQ29sb3IgPT09IFBsYXllckNvbG9yLldISVRFKSB7XG4gICAgZmlsZSA9IEZJTEVTW2NvbF1cbiAgICByYW5rID0gOCAtIHJvd1xuICB9IGVsc2Uge1xuICAgIGZpbGUgPSBGSUxFU1s3IC0gY29sXVxuICAgIHJhbmsgPSByb3cgKyAxXG4gIH1cblxuICByZXR1cm4gYCR7ZmlsZX0ke3Jhbmt9YFxufVxuXG5leHBvcnQgZnVuY3Rpb24gc3F1YXJlVG9QaXhlbHMoXG4gIHNxdWFyZTogc3RyaW5nLFxuICBzcXVhcmVTaXplOiBudW1iZXIsXG4gIHBsYXllckNvbG9yOiBQbGF5ZXJDb2xvclxuKTogUGl4ZWxQb3NpdGlvbiB7XG4gIC8vIFZhbGlkYXRlIHNxdWFyZSBmb3JtYXRcbiAgaWYgKHNxdWFyZS5sZW5ndGggPCAyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHNxdWFyZSBub3RhdGlvbjogJHtzcXVhcmV9YClcbiAgfVxuXG4gIC8vIFBhcnNlIHNxdWFyZSBub3RhdGlvblxuICBjb25zdCBmaWxlID0gc3F1YXJlWzBdXG4gIGNvbnN0IHJhbmsgPSBOdW1iZXIucGFyc2VJbnQoc3F1YXJlWzFdLCAxMClcblxuICAvLyBWYWxpZGF0ZSBmaWxlIGFuZCByYW5rXG4gIGNvbnN0IGNvbCA9IEZJTEVTLmluZGV4T2YoZmlsZSlcbiAgaWYgKGNvbCA9PT0gLTEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgZmlsZTogJHtmaWxlfWApXG4gIH1cbiAgaWYgKHJhbmsgPCAxIHx8IHJhbmsgPiA4IHx8IE51bWJlci5pc05hTihyYW5rKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCByYW5rOiAke3Jhbmt9YClcbiAgfVxuXG4gIC8vIENhbGN1bGF0ZSBwaXhlbCBwb3NpdGlvbiBiYXNlZCBvbiBwbGF5ZXIgY29sb3JcbiAgbGV0IHBpeGVsQ29sOiBudW1iZXJcbiAgbGV0IHBpeGVsUm93OiBudW1iZXJcblxuICBpZiAocGxheWVyQ29sb3IgPT09IFBsYXllckNvbG9yLldISVRFKSB7XG4gICAgLy8gRm9yIHdoaXRlOiBmaWxlcyBnbyBsZWZ0LXRvLXJpZ2h0IChhLWgpLCByYW5rcyBnbyBib3R0b20tdG8tdG9wICgxLTgpXG4gICAgLy8gU28gcmFuayAxIGlzIGF0IGJvdHRvbSAocm93IDcpLCByYW5rIDggaXMgYXQgdG9wIChyb3cgMClcbiAgICBwaXhlbENvbCA9IGNvbFxuICAgIHBpeGVsUm93ID0gOCAtIHJhbmtcbiAgfSBlbHNlIHtcbiAgICAvLyBGb3IgYmxhY2s6IGZpbGVzIGdvIHJpZ2h0LXRvLWxlZnQgKGgtYSksIHJhbmtzIGdvIHRvcC10by1ib3R0b20gKDgtMSlcbiAgICAvLyBTbyByYW5rIDggaXMgYXQgdG9wIChyb3cgMCksIHJhbmsgMSBpcyBhdCBib3R0b20gKHJvdyA3KVxuICAgIHBpeGVsQ29sID0gNyAtIGNvbFxuICAgIHBpeGVsUm93ID0gcmFuayAtIDFcbiAgfVxuXG4gIC8vIENvbnZlcnQgdG8gcGl4ZWxzIChjZW50ZXIgb2Ygc3F1YXJlKVxuICByZXR1cm4ge1xuICAgIHg6IHBpeGVsQ29sICogc3F1YXJlU2l6ZSArIHNxdWFyZVNpemUgLyAyLFxuICAgIHk6IHBpeGVsUm93ICogc3F1YXJlU2l6ZSArIHNxdWFyZVNpemUgLyAyLFxuICB9XG59XG4iLCJpbXBvcnQgeyBnZXRCb3VuZGluZ0NsaWVudFJlY3QgfSBmcm9tICcuLi8uLi8uLi9wbGF0Zm9ybS9kb20nXG5cbmV4cG9ydCBpbnRlcmZhY2UgUmF3UGllY2VEYXRhIHtcbiAgY29sb3I6IHN0cmluZ1xuICB0eXBlOiBzdHJpbmdcbiAgeDogbnVtYmVyXG4gIHk6IG51bWJlclxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEJvYXJkTWV0cmljcyB7XG4gIGJvYXJkV2lkdGg6IG51bWJlclxuICBzcXVhcmVTaXplOiBudW1iZXJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3RCb2FyZE1ldHJpY3MoYm9hcmRFbGVtZW50OiBIVE1MRWxlbWVudCk6IEJvYXJkTWV0cmljcyB7XG4gIC8vIFBhcnNlIHdpZHRoIGZyb20gc3R5bGUgYXR0cmlidXRlIHNpbmNlIGdldEJvdW5kaW5nQ2xpZW50UmVjdCBtYXkgbm90IHdvcmsgaW4gdGVzdCBlbnZpcm9ubWVudHNcbiAgY29uc3Qgd2lkdGhNYXRjaCA9IGJvYXJkRWxlbWVudC5zdHlsZS5jc3NUZXh0Lm1hdGNoKC93aWR0aDpcXHMqKFswLTkuXSspcHgvKVxuICBjb25zdCBib2FyZFdpZHRoID0gd2lkdGhNYXRjaFxuICAgID8gTnVtYmVyLnBhcnNlRmxvYXQod2lkdGhNYXRjaFsxXSlcbiAgICA6IGdldEJvdW5kaW5nQ2xpZW50UmVjdChib2FyZEVsZW1lbnQpLndpZHRoXG4gIGNvbnN0IHNxdWFyZVNpemUgPSBib2FyZFdpZHRoIC8gOFxuXG4gIHJldHVybiB7IGJvYXJkV2lkdGgsIHNxdWFyZVNpemUgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZXh0cmFjdFBpZWNlRGF0YShwaWVjZUVsZW1lbnQ6IEVsZW1lbnQsIHNxdWFyZVNpemU6IG51bWJlcik6IFJhd1BpZWNlRGF0YSB8IG51bGwge1xuICAvLyBFeHRyYWN0IGNvbG9yIGFuZCB0eXBlIGZyb20gY2xhc3NcbiAgY29uc3QgY2xhc3NlcyA9IHBpZWNlRWxlbWVudC5jbGFzc05hbWUuc3BsaXQoJyAnKVxuICBjb25zdCBjb2xvclN0ciA9IGNsYXNzZXNbMF1cbiAgY29uc3QgdHlwZVN0ciA9IGNsYXNzZXNbMV1cblxuICBpZiAoIWNvbG9yU3RyIHx8ICF0eXBlU3RyKSByZXR1cm4gbnVsbFxuXG4gIC8vIEV4dHJhY3QgcG9zaXRpb24gZnJvbSB0cmFuc2Zvcm1cbiAgY29uc3QgdHJhbnNmb3JtID0gKHBpZWNlRWxlbWVudCBhcyBIVE1MRWxlbWVudCkuc3R5bGUudHJhbnNmb3JtXG4gIGNvbnN0IG1hdGNoID0gdHJhbnNmb3JtLm1hdGNoKC90cmFuc2xhdGVcXCgoWzAtOS5dKylweCw/XFxzKihbMC05Ll0rKXB4P1xcKS8pXG4gIGlmICghbWF0Y2gpIHJldHVybiBudWxsXG5cbiAgLy8gVHJhbnNmb3JtIGdpdmVzIHRvcC1sZWZ0IGNvcm5lciwgY29udmVydCB0byBjZW50ZXJcbiAgY29uc3QgeCA9IE51bWJlci5wYXJzZUZsb2F0KG1hdGNoWzFdKSArIHNxdWFyZVNpemUgLyAyXG4gIGNvbnN0IHkgPSBOdW1iZXIucGFyc2VGbG9hdChtYXRjaFsyXSkgKyBzcXVhcmVTaXplIC8gMlxuXG4gIHJldHVybiB7XG4gICAgY29sb3I6IGNvbG9yU3RyLFxuICAgIHR5cGU6IHR5cGVTdHIsXG4gICAgeCxcbiAgICB5LFxuICB9XG59XG4iLCJpbXBvcnQgeyB0eXBlIFBpZWNlVHlwZSwgUGxheWVyQ29sb3IgfSBmcm9tICcuLi8uLi8uLi9jb25zdGFudHMvY2hlc3MnXG5pbXBvcnQgeyBDc3NDbGFzcywgRG9tU2VsZWN0b3IgfSBmcm9tICcuLi8uLi8uLi9jb25zdGFudHMvZG9tJ1xuaW1wb3J0IHsgcGl4ZWxzVG9TcXVhcmUgfSBmcm9tICcuLi8uLi8uLi9kb21haW4vY2hlc3MvY29vcmRpbmF0ZXMnXG5pbXBvcnQgdHlwZSB7IFBpZWNlUG9zaXRpb24gfSBmcm9tICcuLi8uLi8uLi9kb21haW4vY2hlc3MvcGllY2VHcm91cGluZydcbmltcG9ydCB7IHF1ZXJ5U2VsZWN0b3IgfSBmcm9tICcuLi8uLi8uLi9wbGF0Zm9ybS9kb20nXG5pbXBvcnQgeyBleHRyYWN0Qm9hcmRNZXRyaWNzLCBleHRyYWN0UGllY2VEYXRhIH0gZnJvbSAnLi9leHRyYWN0aW9uJ1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGxheWVyQ29sb3IoKTogUGxheWVyQ29sb3Ige1xuICBjb25zdCBjb29yZHMgPSBxdWVyeVNlbGVjdG9yKERvbVNlbGVjdG9yLkNPT1JEUylcbiAgcmV0dXJuIGNvb3Jkcz8uY2xhc3NMaXN0LmNvbnRhaW5zKENzc0NsYXNzLkJMQUNLKSA/IFBsYXllckNvbG9yLkJMQUNLIDogUGxheWVyQ29sb3IuV0hJVEVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlYWRQaWVjZVBvc2l0aW9ucygpOiBQaWVjZVBvc2l0aW9uW10ge1xuICBjb25zdCBib2FyZCA9IHF1ZXJ5U2VsZWN0b3IoRG9tU2VsZWN0b3IuQk9BUkRfTk9fQ1VTVE9NKVxuICBpZiAoIWJvYXJkKSByZXR1cm4gW11cblxuICBjb25zdCB7IHNxdWFyZVNpemUgfSA9IGV4dHJhY3RCb2FyZE1ldHJpY3MoYm9hcmQgYXMgSFRNTEVsZW1lbnQpXG4gIGNvbnN0IHBsYXllckNvbG9yID0gZ2V0UGxheWVyQ29sb3IoKVxuXG4gIGNvbnN0IHBpZWNlcyA9IGJvYXJkLnF1ZXJ5U2VsZWN0b3JBbGwoRG9tU2VsZWN0b3IuUElFQ0UpXG4gIGNvbnN0IHBvc2l0aW9uczogUGllY2VQb3NpdGlvbltdID0gW11cblxuICBmb3IgKGNvbnN0IHBpZWNlIG9mIHBpZWNlcykge1xuICAgIGNvbnN0IHJhd0RhdGEgPSBleHRyYWN0UGllY2VEYXRhKHBpZWNlLCBzcXVhcmVTaXplKVxuICAgIGlmICghcmF3RGF0YSkgY29udGludWVcblxuICAgIC8vIE1hcCB0byBlbnVtc1xuICAgIGNvbnN0IGNvbG9yID0gcmF3RGF0YS5jb2xvciA9PT0gJ3doaXRlJyA/IFBsYXllckNvbG9yLldISVRFIDogUGxheWVyQ29sb3IuQkxBQ0tcbiAgICBjb25zdCB0eXBlID0gcmF3RGF0YS50eXBlIGFzIFBpZWNlVHlwZVxuXG4gICAgY29uc3Qgc3F1YXJlID0gcGl4ZWxzVG9TcXVhcmUoeyB4OiByYXdEYXRhLngsIHk6IHJhd0RhdGEueSB9LCBzcXVhcmVTaXplLCBwbGF5ZXJDb2xvcilcbiAgICBwb3NpdGlvbnMucHVzaCh7IHNxdWFyZSwgY29sb3IsIHR5cGUgfSlcbiAgfVxuXG4gIHJldHVybiBwb3NpdGlvbnNcbn1cbiIsImltcG9ydCB7IFBsYXllckNvbG9yLCB0eXBlIFF1YWRyYW50IH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL2NoZXNzJ1xuaW1wb3J0IHsgU3BlZWNoQ29tbWFuZCB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy9jb21tYW5kcydcbmltcG9ydCB7IGZpbHRlclF1YWRyYW50IH0gZnJvbSAnLi4vLi4vZG9tYWluL2NoZXNzL3BpZWNlR3JvdXBpbmcnXG5pbXBvcnQge1xuICBnZW5lcmF0ZUFsbFBpZWNlc1RleHQsXG4gIGdlbmVyYXRlQ29sb3JUZXh0LFxuICBnZW5lcmF0ZVF1YWRyYW50VGV4dCxcbn0gZnJvbSAnLi4vLi4vZG9tYWluL3NwZWVjaC9zcGVlY2hUZXh0J1xuaW1wb3J0IHsgc3BlYWtUZXh0LCBzdG9wU3BlYWtpbmcgfSBmcm9tICcuLi8uLi9wbGF0Zm9ybS9zcGVlY2gnXG5pbXBvcnQgeyByZWFkUGllY2VQb3NpdGlvbnMgfSBmcm9tICcuLi9zZXJ2aWNlcy9ib2FyZFJlYWRlci9yZWFkZXInXG5pbXBvcnQgdHlwZSB7IFNldHRpbmdzU3RvcmUgfSBmcm9tICcuLi9zZXR0aW5ncy9zZXR0aW5nc1N0b3JlJ1xuXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlU3BlZWNoQ29tbWFuZChjb21tYW5kOiBzdHJpbmcsIHNldHRpbmdzOiBTZXR0aW5nc1N0b3JlKTogdm9pZCB7XG4gIGlmIChjb21tYW5kID09PSBTcGVlY2hDb21tYW5kLlNUT1ApIHtcbiAgICBzdG9wU3BlYWtpbmcoKVxuICAgIHJldHVyblxuICB9XG5cbiAgY29uc3QgcGllY2VzID0gcmVhZFBpZWNlUG9zaXRpb25zKClcblxuICBpZiAoY29tbWFuZCA9PT0gU3BlZWNoQ29tbWFuZC5BTEwpIHtcbiAgICBjb25zdCB0ZXh0ID0gZ2VuZXJhdGVBbGxQaWVjZXNUZXh0KHBpZWNlcylcbiAgICBzcGVha1RleHQodGV4dCwgc2V0dGluZ3Muc3BlYWtSYXRlLnZhbHVlKVxuICAgIHJldHVyblxuICB9XG5cbiAgaWYgKGNvbW1hbmQgPT09IFNwZWVjaENvbW1hbmQuV0hJVEUgfHwgY29tbWFuZCA9PT0gU3BlZWNoQ29tbWFuZC5CTEFDSykge1xuICAgIGNvbnN0IGNvbG9yID0gY29tbWFuZCA9PT0gU3BlZWNoQ29tbWFuZC5XSElURSA/IFBsYXllckNvbG9yLldISVRFIDogUGxheWVyQ29sb3IuQkxBQ0tcbiAgICBjb25zdCB0ZXh0ID0gZ2VuZXJhdGVDb2xvclRleHQocGllY2VzLCBjb2xvcilcbiAgICBzcGVha1RleHQodGV4dCwgc2V0dGluZ3Muc3BlYWtSYXRlLnZhbHVlKVxuICAgIHJldHVyblxuICB9XG5cbiAgLy8gUXVhZHJhbnQgY29tbWFuZHM6IHdrLCB3cSwgYmssIGJxXG4gIGNvbnN0IHF1YWRyYW50ID0gY29tbWFuZCBhcyBRdWFkcmFudFxuICBjb25zdCBmaWx0ZXJlZCA9IGZpbHRlclF1YWRyYW50KHBpZWNlcywgcXVhZHJhbnQpXG4gIGNvbnN0IHRleHQgPSBnZW5lcmF0ZVF1YWRyYW50VGV4dChmaWx0ZXJlZClcbiAgc3BlYWtUZXh0KHRleHQsIHNldHRpbmdzLnNwZWFrUmF0ZS52YWx1ZSlcbn1cbiIsImltcG9ydCB7IEtFWUJPQVJEX0NPTU1BTkRfTUFQLCB0eXBlIEtleWJvYXJkQ29tbWFuZCB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy9jb21tYW5kcydcbmltcG9ydCB7IERvbVNlbGVjdG9yIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL2RvbSdcbmltcG9ydCB7IHF1ZXJ5U2VsZWN0b3IgfSBmcm9tICcuLi8uLi9wbGF0Zm9ybS9kb20nXG5pbXBvcnQgdHlwZSB7IERyYXdpbmdzM0RTdGF0ZSB9IGZyb20gJy4uLy4uL3ByZXNlbnRhdGlvbi8zZC9kcmF3aW5nczNkJ1xuaW1wb3J0IHR5cGUgeyBBbm5vdGF0aW9uc1N0YXRlIH0gZnJvbSAnLi4vLi4vcHJlc2VudGF0aW9uL25vbi1wcmVhY3QtY29tcG9uZW50cy9hbm5vdGF0aW9ucydcbmltcG9ydCB0eXBlIHsgQ3VzdG9tQm9hcmRTdGF0ZSB9IGZyb20gJy4uL2hhbmRsZXJzL2hhbmRsZUN1c3RvbUJvYXJkJ1xuaW1wb3J0IHsgaGFuZGxlRHJhd0NvbW1hbmQgfSBmcm9tICcuLi9oYW5kbGVycy9oYW5kbGVEcmF3Q29tbWFuZCdcbmltcG9ydCB7IGhhbmRsZVNwZWVjaENvbW1hbmQgfSBmcm9tICcuLi9oYW5kbGVycy9oYW5kbGVTcGVlY2hDb21tYW5kJ1xuaW1wb3J0IHR5cGUgeyBTZXR0aW5nc1N0b3JlIH0gZnJvbSAnLi4vc2V0dGluZ3Mvc2V0dGluZ3NTdG9yZSdcblxuaW50ZXJmYWNlIElucHV0RWxlbWVudFdpdGhDbGVhbnVwIGV4dGVuZHMgSFRNTElucHV0RWxlbWVudCB7XG4gIF9fa2V5Ym9hcmRDb21tYW5kQ2xlYW51cD86ICgpID0+IHZvaWRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldHVwS2V5Ym9hcmRDb21tYW5kcyhcbiAgc2V0dGluZ3M6IFNldHRpbmdzU3RvcmUsXG4gIGFubm90YXRpb25zU3RhdGU6IEFubm90YXRpb25zU3RhdGUsXG4gIGN1c3RvbUJvYXJkU3RhdGU6IEN1c3RvbUJvYXJkU3RhdGUsXG4gIGRyYXdpbmdzM0RTdGF0ZTogRHJhd2luZ3MzRFN0YXRlXG4pOiB2b2lkIHtcbiAgY29uc3QgaW5wdXQgPSBxdWVyeVNlbGVjdG9yKERvbVNlbGVjdG9yLktFWUJPQVJEX0lOUFVUKSBhcyBJbnB1dEVsZW1lbnRXaXRoQ2xlYW51cCB8IG51bGxcbiAgaWYgKCFpbnB1dCkgcmV0dXJuXG5cbiAgY29uc3QgaGFuZGxlSW5wdXQgPSAoZTogRXZlbnQpID0+IHtcbiAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50XG4gICAgY29uc3QgdmFsdWUgPSB0YXJnZXQudmFsdWVcblxuICAgIC8vIENoZWNrIGZvciBzcGVlY2ggY29tbWFuZHNcbiAgICBjb25zdCBjb21tYW5kID0gS0VZQk9BUkRfQ09NTUFORF9NQVAuZ2V0KHZhbHVlIGFzIEtleWJvYXJkQ29tbWFuZClcbiAgICBpZiAoY29tbWFuZCkge1xuICAgICAgaGFuZGxlU3BlZWNoQ29tbWFuZChjb21tYW5kLCBzZXR0aW5ncylcbiAgICAgIHRhcmdldC52YWx1ZSA9ICcnXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICAvLyBDaGVjayBmb3IgZHJhd2luZyBjb21tYW5kc1xuICAgIGlmICh2YWx1ZS5zdGFydHNXaXRoKCctJykpIHtcbiAgICAgIGhhbmRsZURyYXdDb21tYW5kKHZhbHVlLCBhbm5vdGF0aW9uc1N0YXRlLCBjdXN0b21Cb2FyZFN0YXRlLCBkcmF3aW5nczNEU3RhdGUpXG4gICAgICByZXR1cm5cbiAgICB9XG4gIH1cblxuICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGhhbmRsZUlucHV0KVxuXG4gIC8vIFN0b3JlIGNsZWFudXAgZnVuY3Rpb24gb24gdGhlIGVsZW1lbnQgZm9yIGxhdGVyIHJlbW92YWxcbiAgaW5wdXQuX19rZXlib2FyZENvbW1hbmRDbGVhbnVwID0gKCkgPT4ge1xuICAgIGlucHV0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2lucHV0JywgaGFuZGxlSW5wdXQpXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRlYXJkb3duS2V5Ym9hcmRDb21tYW5kcygpOiB2b2lkIHtcbiAgY29uc3QgaW5wdXQgPSBxdWVyeVNlbGVjdG9yKERvbVNlbGVjdG9yLktFWUJPQVJEX0lOUFVUKSBhcyBJbnB1dEVsZW1lbnRXaXRoQ2xlYW51cCB8IG51bGxcbiAgaWYgKGlucHV0Py5fX2tleWJvYXJkQ29tbWFuZENsZWFudXApIHtcbiAgICBpbnB1dC5fX2tleWJvYXJkQ29tbWFuZENsZWFudXAoKVxuICAgIGlucHV0Ll9fa2V5Ym9hcmRDb21tYW5kQ2xlYW51cCA9IHVuZGVmaW5lZFxuICB9XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gY3JlYXRlTXV0YXRpb25PYnNlcnZlcihjYWxsYmFjazogTXV0YXRpb25DYWxsYmFjayk6IE11dGF0aW9uT2JzZXJ2ZXIge1xuICByZXR1cm4gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoY2FsbGJhY2spXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvYnNlcnZlKFxuICBvYnNlcnZlcjogTXV0YXRpb25PYnNlcnZlcixcbiAgdGFyZ2V0OiBOb2RlLFxuICBvcHRpb25zOiBNdXRhdGlvbk9ic2VydmVySW5pdFxuKTogdm9pZCB7XG4gIG9ic2VydmVyLm9ic2VydmUodGFyZ2V0LCBvcHRpb25zKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGlzY29ubmVjdChvYnNlcnZlcjogTXV0YXRpb25PYnNlcnZlcik6IHZvaWQge1xuICBvYnNlcnZlci5kaXNjb25uZWN0KClcbn1cbiIsImltcG9ydCB0eXBlIHsgU2lnbmFsIH0gZnJvbSAnQHByZWFjdC9zaWduYWxzLWNvcmUnXG5pbXBvcnQgeyBEb21TZWxlY3RvciB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy9kb20nXG5pbXBvcnQgeyBxdWVyeVNlbGVjdG9yIH0gZnJvbSAnLi4vLi4vcGxhdGZvcm0vZG9tJ1xuaW1wb3J0IHsgY3JlYXRlTXV0YXRpb25PYnNlcnZlciwgZGlzY29ubmVjdCwgb2JzZXJ2ZSB9IGZyb20gJy4uLy4uL3BsYXRmb3JtL211dGF0aW9uT2JzZXJ2ZXInXG5cbmV4cG9ydCBpbnRlcmZhY2UgQm9hcmRPYnNlcnZlclN0YXRlIHtcbiAgb2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXJcbiAgYm9hcmRDaGFuZ2VkOiBTaWduYWw8bnVtYmVyPlxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQm9hcmRPYnNlcnZlcihib2FyZENoYW5nZWQ6IFNpZ25hbDxudW1iZXI+KTogQm9hcmRPYnNlcnZlclN0YXRlIHtcbiAgY29uc3Qgb2JzZXJ2ZXIgPSBjcmVhdGVNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICBib2FyZENoYW5nZWQudmFsdWUgKz0gMVxuICB9KVxuXG4gIHJldHVybiB7IG9ic2VydmVyLCBib2FyZENoYW5nZWQgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RhcnRCb2FyZE9ic2VydmVyKHN0YXRlOiBCb2FyZE9ic2VydmVyU3RhdGUpOiB2b2lkIHtcbiAgY29uc3QgYm9hcmQgPSBxdWVyeVNlbGVjdG9yKERvbVNlbGVjdG9yLkJPQVJEKVxuICBpZiAoIWJvYXJkKSByZXR1cm5cblxuICBvYnNlcnZlKHN0YXRlLm9ic2VydmVyLCBib2FyZCwge1xuICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICBhdHRyaWJ1dGVzOiB0cnVlLFxuICAgIHN1YnRyZWU6IHRydWUsXG4gIH0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdG9wQm9hcmRPYnNlcnZlcihzdGF0ZTogQm9hcmRPYnNlcnZlclN0YXRlKTogdm9pZCB7XG4gIGRpc2Nvbm5lY3Qoc3RhdGUub2JzZXJ2ZXIpXG59XG4iLCJleHBvcnQgaW50ZXJmYWNlIFNldHRpbmdzIHtcbiAgc3BlYWtSYXRlOiBudW1iZXJcbiAgcGllY2VzTGlzdEVuYWJsZWQ6IGJvb2xlYW5cbiAgZGl2aWRlcnNFbmFibGVkOiBib29sZWFuXG4gIGN1c3RvbUJvYXJkRW5hYmxlZDogYm9vbGVhblxuICBvYmZ1c2NhdGlvbnNFbmFibGVkOiBib29sZWFuXG4gIHBhcmFsbGF4OiBudW1iZXJcbiAgaG92ZXJNb2RlOiBzdHJpbmdcbiAgcGllY2VTdHlsZTogc3RyaW5nXG4gIGJsdXI6IG51bWJlclxuICBibGFja1NlZ21lbnRzOiBzdHJpbmdcbiAgYmxhY2tTZWdtZW50c1RpbWluZzogc3RyaW5nXG4gIGZsYXNoTW9kZUVuYWJsZWQ6IGJvb2xlYW5cbiAgZmxhc2hEdXJhdGlvbjogbnVtYmVyXG4gIGZsYXNoSW50ZXJ2YWw6IG51bWJlclxufVxuXG5leHBvcnQgY29uc3QgZGVmYXVsdFNldHRpbmdzOiBTZXR0aW5ncyA9IHtcbiAgc3BlYWtSYXRlOiAwLjUsXG4gIHBpZWNlc0xpc3RFbmFibGVkOiBmYWxzZSxcbiAgZGl2aWRlcnNFbmFibGVkOiBmYWxzZSxcbiAgY3VzdG9tQm9hcmRFbmFibGVkOiBmYWxzZSxcbiAgb2JmdXNjYXRpb25zRW5hYmxlZDogZmFsc2UsXG4gIHBhcmFsbGF4OiAwLFxuICBob3Zlck1vZGU6ICdvZmYnLFxuICBwaWVjZVN0eWxlOiAnaWNvbnMnLFxuICBibHVyOiAwLFxuICBibGFja1NlZ21lbnRzOiAnbm9uZScsXG4gIGJsYWNrU2VnbWVudHNUaW1pbmc6ICdyb3RhdGUtMTBzJyxcbiAgZmxhc2hNb2RlRW5hYmxlZDogZmFsc2UsXG4gIGZsYXNoRHVyYXRpb246IDEsXG4gIGZsYXNoSW50ZXJ2YWw6IDMsXG59XG4iLCIvKipcbiAqIFdyYXBwZXIgbW9kdWxlIGZvciBsb2NhbFN0b3JhZ2UgdG8gYWxsb3cgbW9ja2luZyB3aXRoIHNpbW9uZVxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRJdGVtKGtleTogc3RyaW5nKTogc3RyaW5nIHwgbnVsbCB7XG4gIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRJdGVtKGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgdmFsdWUpXG59XG4iLCJpbXBvcnQgdHlwZSB7IFNpZ25hbCB9IGZyb20gJ0BwcmVhY3Qvc2lnbmFscy1jb3JlJ1xuaW1wb3J0IHsgZWZmZWN0LCBzaWduYWwgfSBmcm9tICdAcHJlYWN0L3NpZ25hbHMtY29yZSdcbmltcG9ydCB7IHR5cGUgU2V0dGluZ3MsIGRlZmF1bHRTZXR0aW5ncyB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy9zZXR0aW5ncydcbmltcG9ydCAqIGFzIHN0b3JhZ2UgZnJvbSAnLi4vLi4vcGxhdGZvcm0vc3RvcmFnZSdcblxuY29uc3QgU1RPUkFHRV9LRVkgPSAnbGljaGVzcy1ib2FyZC1zcGVha2VyLXNldHRpbmdzJ1xuXG5leHBvcnQgaW50ZXJmYWNlIFNldHRpbmdzU3RvcmUge1xuICBzcGVha1JhdGU6IFNpZ25hbDxudW1iZXI+XG4gIHBpZWNlc0xpc3RFbmFibGVkOiBTaWduYWw8Ym9vbGVhbj5cbiAgZGl2aWRlcnNFbmFibGVkOiBTaWduYWw8Ym9vbGVhbj5cbiAgY3VzdG9tQm9hcmRFbmFibGVkOiBTaWduYWw8Ym9vbGVhbj5cbiAgb2JmdXNjYXRpb25zRW5hYmxlZDogU2lnbmFsPGJvb2xlYW4+XG4gIHBhcmFsbGF4OiBTaWduYWw8bnVtYmVyPlxuICBob3Zlck1vZGU6IFNpZ25hbDxzdHJpbmc+XG4gIHBpZWNlU3R5bGU6IFNpZ25hbDxzdHJpbmc+XG4gIGJsdXI6IFNpZ25hbDxudW1iZXI+XG4gIGJsYWNrU2VnbWVudHM6IFNpZ25hbDxzdHJpbmc+XG4gIGJsYWNrU2VnbWVudHNUaW1pbmc6IFNpZ25hbDxzdHJpbmc+XG4gIGZsYXNoTW9kZUVuYWJsZWQ6IFNpZ25hbDxib29sZWFuPlxuICBmbGFzaER1cmF0aW9uOiBTaWduYWw8bnVtYmVyPlxuICBmbGFzaEludGVydmFsOiBTaWduYWw8bnVtYmVyPlxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2V0dGluZ3NTdG9yZSgpOiBTZXR0aW5nc1N0b3JlIHtcbiAgcmV0dXJuIHtcbiAgICBzcGVha1JhdGU6IHNpZ25hbChkZWZhdWx0U2V0dGluZ3Muc3BlYWtSYXRlKSxcbiAgICBwaWVjZXNMaXN0RW5hYmxlZDogc2lnbmFsKGRlZmF1bHRTZXR0aW5ncy5waWVjZXNMaXN0RW5hYmxlZCksXG4gICAgZGl2aWRlcnNFbmFibGVkOiBzaWduYWwoZGVmYXVsdFNldHRpbmdzLmRpdmlkZXJzRW5hYmxlZCksXG4gICAgY3VzdG9tQm9hcmRFbmFibGVkOiBzaWduYWwoZGVmYXVsdFNldHRpbmdzLmN1c3RvbUJvYXJkRW5hYmxlZCksXG4gICAgb2JmdXNjYXRpb25zRW5hYmxlZDogc2lnbmFsKGRlZmF1bHRTZXR0aW5ncy5vYmZ1c2NhdGlvbnNFbmFibGVkKSxcbiAgICBwYXJhbGxheDogc2lnbmFsKGRlZmF1bHRTZXR0aW5ncy5wYXJhbGxheCksXG4gICAgaG92ZXJNb2RlOiBzaWduYWwoZGVmYXVsdFNldHRpbmdzLmhvdmVyTW9kZSksXG4gICAgcGllY2VTdHlsZTogc2lnbmFsKGRlZmF1bHRTZXR0aW5ncy5waWVjZVN0eWxlKSxcbiAgICBibHVyOiBzaWduYWwoZGVmYXVsdFNldHRpbmdzLmJsdXIpLFxuICAgIGJsYWNrU2VnbWVudHM6IHNpZ25hbChkZWZhdWx0U2V0dGluZ3MuYmxhY2tTZWdtZW50cyksXG4gICAgYmxhY2tTZWdtZW50c1RpbWluZzogc2lnbmFsKGRlZmF1bHRTZXR0aW5ncy5ibGFja1NlZ21lbnRzVGltaW5nKSxcbiAgICBmbGFzaE1vZGVFbmFibGVkOiBzaWduYWwoZGVmYXVsdFNldHRpbmdzLmZsYXNoTW9kZUVuYWJsZWQpLFxuICAgIGZsYXNoRHVyYXRpb246IHNpZ25hbChkZWZhdWx0U2V0dGluZ3MuZmxhc2hEdXJhdGlvbiksXG4gICAgZmxhc2hJbnRlcnZhbDogc2lnbmFsKGRlZmF1bHRTZXR0aW5ncy5mbGFzaEludGVydmFsKSxcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9hZFNldHRpbmdzKHNldHRpbmdzOiBTZXR0aW5nc1N0b3JlKTogdm9pZCB7XG4gIGNvbnN0IHN0b3JlZCA9IHN0b3JhZ2UuZ2V0SXRlbShTVE9SQUdFX0tFWSlcbiAgaWYgKCFzdG9yZWQpIHJldHVyblxuXG4gIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKHN0b3JlZCkgYXMgUGFydGlhbDxTZXR0aW5ncz5cbiAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoZGF0YSkpIHtcbiAgICBjb25zdCBzZXR0aW5nS2V5ID0ga2V5IGFzIGtleW9mIFNldHRpbmdzXG4gICAgaWYgKFxuICAgICAgc2V0dGluZ3Nbc2V0dGluZ0tleV0gJiZcbiAgICAgIHR5cGVvZiBzZXR0aW5nc1tzZXR0aW5nS2V5XSA9PT0gJ29iamVjdCcgJiZcbiAgICAgICd2YWx1ZScgaW4gc2V0dGluZ3Nbc2V0dGluZ0tleV1cbiAgICApIHtcbiAgICAgIC8vIGJpb21lLWlnbm9yZSBsaW50L3N1c3BpY2lvdXMvbm9FeHBsaWNpdEFueTogU2V0dGluZ3MgdHlwZSBpcyBkeW5hbWljXG4gICAgICA7KHNldHRpbmdzW3NldHRpbmdLZXldIGFzIGFueSkudmFsdWUgPSBkYXRhW3NldHRpbmdLZXldXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzYXZlU2V0dGluZ3Moc2V0dGluZ3M6IFNldHRpbmdzU3RvcmUpOiB2b2lkIHtcbiAgY29uc3QgZGF0YTogUGFydGlhbDxTZXR0aW5ncz4gPSB7fVxuICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhzZXR0aW5ncykpIHtcbiAgICBjb25zdCBzZXR0aW5nS2V5ID0ga2V5IGFzIGtleW9mIHR5cGVvZiBzZXR0aW5nc1xuICAgIC8vIGJpb21lLWlnbm9yZSBsaW50L3N1c3BpY2lvdXMvbm9FeHBsaWNpdEFueTogU2V0dGluZ3MgdHlwZSBpcyBkeW5hbWljXG4gICAgZGF0YVtzZXR0aW5nS2V5IGFzIGtleW9mIFNldHRpbmdzXSA9IChzZXR0aW5nc1tzZXR0aW5nS2V5XSBhcyBhbnkpLnZhbHVlXG4gIH1cbiAgc3RvcmFnZS5zZXRJdGVtKFNUT1JBR0VfS0VZLCBKU09OLnN0cmluZ2lmeShkYXRhKSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldHVwQXV0b1NhdmUoc2V0dGluZ3M6IFNldHRpbmdzU3RvcmUpOiB2b2lkIHtcbiAgZWZmZWN0KCgpID0+IHtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhzZXR0aW5ncykpIHtcbiAgICAgIGNvbnN0IHNldHRpbmcgPSBzZXR0aW5nc1trZXkgYXMga2V5b2YgdHlwZW9mIHNldHRpbmdzXVxuICAgICAgc2V0dGluZy52YWx1ZVxuICAgIH1cbiAgICBzYXZlU2V0dGluZ3Moc2V0dGluZ3MpXG4gIH0pXG59XG4iLCJ2YXIgbixsLHUsdCxpLHIsbyxlLGYsYyxhLHMsaCxwLHYseSxkPXt9LHc9W10sXz0vYWNpdHxleCg/OnN8Z3xufHB8JCl8cnBofGdyaWR8b3dzfG1uY3xudHd8aW5lW2NoXXx6b298Xm9yZHxpdGVyYS9pLGc9QXJyYXkuaXNBcnJheTtmdW5jdGlvbiBtKG4sbCl7Zm9yKHZhciB1IGluIGwpblt1XT1sW3VdO3JldHVybiBufWZ1bmN0aW9uIGIobil7biYmbi5wYXJlbnROb2RlJiZuLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobil9ZnVuY3Rpb24gayhsLHUsdCl7dmFyIGkscixvLGU9e307Zm9yKG8gaW4gdSlcImtleVwiPT1vP2k9dVtvXTpcInJlZlwiPT1vP3I9dVtvXTplW29dPXVbb107aWYoYXJndW1lbnRzLmxlbmd0aD4yJiYoZS5jaGlsZHJlbj1hcmd1bWVudHMubGVuZ3RoPjM/bi5jYWxsKGFyZ3VtZW50cywyKTp0KSxcImZ1bmN0aW9uXCI9PXR5cGVvZiBsJiZudWxsIT1sLmRlZmF1bHRQcm9wcylmb3IobyBpbiBsLmRlZmF1bHRQcm9wcyl2b2lkIDA9PT1lW29dJiYoZVtvXT1sLmRlZmF1bHRQcm9wc1tvXSk7cmV0dXJuIHgobCxlLGkscixudWxsKX1mdW5jdGlvbiB4KG4sdCxpLHIsbyl7dmFyIGU9e3R5cGU6bixwcm9wczp0LGtleTppLHJlZjpyLF9fazpudWxsLF9fOm51bGwsX19iOjAsX19lOm51bGwsX19jOm51bGwsY29uc3RydWN0b3I6dm9pZCAwLF9fdjpudWxsPT1vPysrdTpvLF9faTotMSxfX3U6MH07cmV0dXJuIG51bGw9PW8mJm51bGwhPWwudm5vZGUmJmwudm5vZGUoZSksZX1mdW5jdGlvbiBNKCl7cmV0dXJue2N1cnJlbnQ6bnVsbH19ZnVuY3Rpb24gUyhuKXtyZXR1cm4gbi5jaGlsZHJlbn1mdW5jdGlvbiBDKG4sbCl7dGhpcy5wcm9wcz1uLHRoaXMuY29udGV4dD1sfWZ1bmN0aW9uICQobixsKXtpZihudWxsPT1sKXJldHVybiBuLl9fPyQobi5fXyxuLl9faSsxKTpudWxsO2Zvcih2YXIgdTtsPG4uX19rLmxlbmd0aDtsKyspaWYobnVsbCE9KHU9bi5fX2tbbF0pJiZudWxsIT11Ll9fZSlyZXR1cm4gdS5fX2U7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2Ygbi50eXBlPyQobik6bnVsbH1mdW5jdGlvbiBJKG4pe2lmKG4uX19QJiZuLl9fZCl7dmFyIHU9bi5fX3YsdD11Ll9fZSxpPVtdLHI9W10sbz1tKHt9LHUpO28uX192PXUuX192KzEsbC52bm9kZSYmbC52bm9kZShvKSxxKG4uX19QLG8sdSxuLl9fbixuLl9fUC5uYW1lc3BhY2VVUkksMzImdS5fX3U/W3RdOm51bGwsaSxudWxsPT10PyQodSk6dCwhISgzMiZ1Ll9fdSksciksby5fX3Y9dS5fX3Ysby5fXy5fX2tbby5fX2ldPW8sRChpLG8sciksdS5fX2U9dS5fXz1udWxsLG8uX19lIT10JiZQKG8pfX1mdW5jdGlvbiBQKG4pe2lmKG51bGwhPShuPW4uX18pJiZudWxsIT1uLl9fYylyZXR1cm4gbi5fX2U9bi5fX2MuYmFzZT1udWxsLG4uX19rLnNvbWUoZnVuY3Rpb24obCl7aWYobnVsbCE9bCYmbnVsbCE9bC5fX2UpcmV0dXJuIG4uX19lPW4uX19jLmJhc2U9bC5fX2V9KSxQKG4pfWZ1bmN0aW9uIEEobil7KCFuLl9fZCYmKG4uX19kPSEwKSYmaS5wdXNoKG4pJiYhSC5fX3IrK3x8ciE9bC5kZWJvdW5jZVJlbmRlcmluZykmJigocj1sLmRlYm91bmNlUmVuZGVyaW5nKXx8bykoSCl9ZnVuY3Rpb24gSCgpe3RyeXtmb3IodmFyIG4sbD0xO2kubGVuZ3RoOylpLmxlbmd0aD5sJiZpLnNvcnQoZSksbj1pLnNoaWZ0KCksbD1pLmxlbmd0aCxJKG4pfWZpbmFsbHl7aS5sZW5ndGg9SC5fX3I9MH19ZnVuY3Rpb24gTChuLGwsdSx0LGkscixvLGUsZixjLGEpe3ZhciBzLGgscCx2LHksXyxnLG09dCYmdC5fX2t8fHcsYj1sLmxlbmd0aDtmb3IoZj1UKHUsbCxtLGYsYikscz0wO3M8YjtzKyspbnVsbCE9KHA9dS5fX2tbc10pJiYoaD0tMSE9cC5fX2kmJm1bcC5fX2ldfHxkLHAuX19pPXMsXz1xKG4scCxoLGkscixvLGUsZixjLGEpLHY9cC5fX2UscC5yZWYmJmgucmVmIT1wLnJlZiYmKGgucmVmJiZKKGgucmVmLG51bGwscCksYS5wdXNoKHAucmVmLHAuX19jfHx2LHApKSxudWxsPT15JiZudWxsIT12JiYoeT12KSwoZz0hISg0JnAuX191KSl8fGguX19rPT09cC5fX2s/KGY9aihwLGYsbixnKSxnJiZoLl9fZSYmKGguX19lPW51bGwpKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBwLnR5cGUmJnZvaWQgMCE9PV8/Zj1fOnYmJihmPXYubmV4dFNpYmxpbmcpLHAuX191Jj0tNyk7cmV0dXJuIHUuX19lPXksZn1mdW5jdGlvbiBUKG4sbCx1LHQsaSl7dmFyIHIsbyxlLGYsYyxhPXUubGVuZ3RoLHM9YSxoPTA7Zm9yKG4uX19rPW5ldyBBcnJheShpKSxyPTA7cjxpO3IrKyludWxsIT0obz1sW3JdKSYmXCJib29sZWFuXCIhPXR5cGVvZiBvJiZcImZ1bmN0aW9uXCIhPXR5cGVvZiBvPyhcInN0cmluZ1wiPT10eXBlb2Ygb3x8XCJudW1iZXJcIj09dHlwZW9mIG98fFwiYmlnaW50XCI9PXR5cGVvZiBvfHxvLmNvbnN0cnVjdG9yPT1TdHJpbmc/bz1uLl9fa1tyXT14KG51bGwsbyxudWxsLG51bGwsbnVsbCk6ZyhvKT9vPW4uX19rW3JdPXgoUyx7Y2hpbGRyZW46b30sbnVsbCxudWxsLG51bGwpOnZvaWQgMD09PW8uY29uc3RydWN0b3ImJm8uX19iPjA/bz1uLl9fa1tyXT14KG8udHlwZSxvLnByb3BzLG8ua2V5LG8ucmVmP28ucmVmOm51bGwsby5fX3YpOm4uX19rW3JdPW8sZj1yK2gsby5fXz1uLG8uX19iPW4uX19iKzEsZT1udWxsLC0xIT0oYz1vLl9faT1PKG8sdSxmLHMpKSYmKHMtLSwoZT11W2NdKSYmKGUuX191fD0yKSksbnVsbD09ZXx8bnVsbD09ZS5fX3Y/KC0xPT1jJiYoaT5hP2gtLTppPGEmJmgrKyksXCJmdW5jdGlvblwiIT10eXBlb2Ygby50eXBlJiYoby5fX3V8PTQpKTpjIT1mJiYoYz09Zi0xP2gtLTpjPT1mKzE/aCsrOihjPmY/aC0tOmgrKyxvLl9fdXw9NCkpKTpuLl9fa1tyXT1udWxsO2lmKHMpZm9yKHI9MDtyPGE7cisrKW51bGwhPShlPXVbcl0pJiYwPT0oMiZlLl9fdSkmJihlLl9fZT09dCYmKHQ9JChlKSksSyhlLGUpKTtyZXR1cm4gdH1mdW5jdGlvbiBqKG4sbCx1LHQpe3ZhciBpLHI7aWYoXCJmdW5jdGlvblwiPT10eXBlb2Ygbi50eXBlKXtmb3IoaT1uLl9fayxyPTA7aSYmcjxpLmxlbmd0aDtyKyspaVtyXSYmKGlbcl0uX189bixsPWooaVtyXSxsLHUsdCkpO3JldHVybiBsfW4uX19lIT1sJiYodCYmKGwmJm4udHlwZSYmIWwucGFyZW50Tm9kZSYmKGw9JChuKSksdS5pbnNlcnRCZWZvcmUobi5fX2UsbHx8bnVsbCkpLGw9bi5fX2UpO2Rve2w9bCYmbC5uZXh0U2libGluZ313aGlsZShudWxsIT1sJiY4PT1sLm5vZGVUeXBlKTtyZXR1cm4gbH1mdW5jdGlvbiBGKG4sbCl7cmV0dXJuIGw9bHx8W10sbnVsbD09bnx8XCJib29sZWFuXCI9PXR5cGVvZiBufHwoZyhuKT9uLnNvbWUoZnVuY3Rpb24obil7RihuLGwpfSk6bC5wdXNoKG4pKSxsfWZ1bmN0aW9uIE8obixsLHUsdCl7dmFyIGkscixvLGU9bi5rZXksZj1uLnR5cGUsYz1sW3VdLGE9bnVsbCE9YyYmMD09KDImYy5fX3UpO2lmKG51bGw9PT1jJiZudWxsPT1lfHxhJiZlPT1jLmtleSYmZj09Yy50eXBlKXJldHVybiB1O2lmKHQ+KGE/MTowKSlmb3IoaT11LTEscj11KzE7aT49MHx8cjxsLmxlbmd0aDspaWYobnVsbCE9KGM9bFtvPWk+PTA/aS0tOnIrK10pJiYwPT0oMiZjLl9fdSkmJmU9PWMua2V5JiZmPT1jLnR5cGUpcmV0dXJuIG87cmV0dXJuLTF9ZnVuY3Rpb24geihuLGwsdSl7XCItXCI9PWxbMF0/bi5zZXRQcm9wZXJ0eShsLG51bGw9PXU/XCJcIjp1KTpuW2xdPW51bGw9PXU/XCJcIjpcIm51bWJlclwiIT10eXBlb2YgdXx8Xy50ZXN0KGwpP3U6dStcInB4XCJ9ZnVuY3Rpb24gTihuLGwsdSx0LGkpe3ZhciByLG87bjppZihcInN0eWxlXCI9PWwpaWYoXCJzdHJpbmdcIj09dHlwZW9mIHUpbi5zdHlsZS5jc3NUZXh0PXU7ZWxzZXtpZihcInN0cmluZ1wiPT10eXBlb2YgdCYmKG4uc3R5bGUuY3NzVGV4dD10PVwiXCIpLHQpZm9yKGwgaW4gdCl1JiZsIGluIHV8fHoobi5zdHlsZSxsLFwiXCIpO2lmKHUpZm9yKGwgaW4gdSl0JiZ1W2xdPT10W2xdfHx6KG4uc3R5bGUsbCx1W2xdKX1lbHNlIGlmKFwib1wiPT1sWzBdJiZcIm5cIj09bFsxXSlyPWwhPShsPWwucmVwbGFjZShzLFwiJDFcIikpLG89bC50b0xvd2VyQ2FzZSgpLGw9byBpbiBufHxcIm9uRm9jdXNPdXRcIj09bHx8XCJvbkZvY3VzSW5cIj09bD9vLnNsaWNlKDIpOmwuc2xpY2UoMiksbi5sfHwobi5sPXt9KSxuLmxbbCtyXT11LHU/dD91W2FdPXRbYV06KHVbYV09aCxuLmFkZEV2ZW50TGlzdGVuZXIobCxyP3Y6cCxyKSk6bi5yZW1vdmVFdmVudExpc3RlbmVyKGwscj92OnAscik7ZWxzZXtpZihcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI9PWkpbD1sLnJlcGxhY2UoL3hsaW5rKEh8OmgpLyxcImhcIikucmVwbGFjZSgvc05hbWUkLyxcInNcIik7ZWxzZSBpZihcIndpZHRoXCIhPWwmJlwiaGVpZ2h0XCIhPWwmJlwiaHJlZlwiIT1sJiZcImxpc3RcIiE9bCYmXCJmb3JtXCIhPWwmJlwidGFiSW5kZXhcIiE9bCYmXCJkb3dubG9hZFwiIT1sJiZcInJvd1NwYW5cIiE9bCYmXCJjb2xTcGFuXCIhPWwmJlwicm9sZVwiIT1sJiZcInBvcG92ZXJcIiE9bCYmbCBpbiBuKXRyeXtuW2xdPW51bGw9PXU/XCJcIjp1O2JyZWFrIG59Y2F0Y2gobil7fVwiZnVuY3Rpb25cIj09dHlwZW9mIHV8fChudWxsPT11fHwhMT09PXUmJlwiLVwiIT1sWzRdP24ucmVtb3ZlQXR0cmlidXRlKGwpOm4uc2V0QXR0cmlidXRlKGwsXCJwb3BvdmVyXCI9PWwmJjE9PXU/XCJcIjp1KSl9fWZ1bmN0aW9uIFYobil7cmV0dXJuIGZ1bmN0aW9uKHUpe2lmKHRoaXMubCl7dmFyIHQ9dGhpcy5sW3UudHlwZStuXTtpZihudWxsPT11W2NdKXVbY109aCsrO2Vsc2UgaWYodVtjXTx0W2FdKXJldHVybjtyZXR1cm4gdChsLmV2ZW50P2wuZXZlbnQodSk6dSl9fX1mdW5jdGlvbiBxKG4sdSx0LGkscixvLGUsZixjLGEpe3ZhciBzLGgscCx2LHksZCxfLGsseCxNLCQsSSxQLEEsSCxUPXUudHlwZTtpZih2b2lkIDAhPT11LmNvbnN0cnVjdG9yKXJldHVybiBudWxsOzEyOCZ0Ll9fdSYmKGM9ISEoMzImdC5fX3UpLG89W2Y9dS5fX2U9dC5fX2VdKSwocz1sLl9fYikmJnModSk7bjppZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBUKXRyeXtpZihrPXUucHJvcHMseD1ULnByb3RvdHlwZSYmVC5wcm90b3R5cGUucmVuZGVyLE09KHM9VC5jb250ZXh0VHlwZSkmJmlbcy5fX2NdLCQ9cz9NP00ucHJvcHMudmFsdWU6cy5fXzppLHQuX19jP189KGg9dS5fX2M9dC5fX2MpLl9fPWguX19FOih4P3UuX19jPWg9bmV3IFQoaywkKToodS5fX2M9aD1uZXcgQyhrLCQpLGguY29uc3RydWN0b3I9VCxoLnJlbmRlcj1RKSxNJiZNLnN1YihoKSxoLnN0YXRlfHwoaC5zdGF0ZT17fSksaC5fX249aSxwPWguX19kPSEwLGguX19oPVtdLGguX3NiPVtdKSx4JiZudWxsPT1oLl9fcyYmKGguX19zPWguc3RhdGUpLHgmJm51bGwhPVQuZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzJiYoaC5fX3M9PWguc3RhdGUmJihoLl9fcz1tKHt9LGguX19zKSksbShoLl9fcyxULmdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyhrLGguX19zKSkpLHY9aC5wcm9wcyx5PWguc3RhdGUsaC5fX3Y9dSxwKXgmJm51bGw9PVQuZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzJiZudWxsIT1oLmNvbXBvbmVudFdpbGxNb3VudCYmaC5jb21wb25lbnRXaWxsTW91bnQoKSx4JiZudWxsIT1oLmNvbXBvbmVudERpZE1vdW50JiZoLl9faC5wdXNoKGguY29tcG9uZW50RGlkTW91bnQpO2Vsc2V7aWYoeCYmbnVsbD09VC5nZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMmJmshPT12JiZudWxsIT1oLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMmJmguY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhrLCQpLHUuX192PT10Ll9fdnx8IWguX19lJiZudWxsIT1oLnNob3VsZENvbXBvbmVudFVwZGF0ZSYmITE9PT1oLnNob3VsZENvbXBvbmVudFVwZGF0ZShrLGguX19zLCQpKXt1Ll9fdiE9dC5fX3YmJihoLnByb3BzPWssaC5zdGF0ZT1oLl9fcyxoLl9fZD0hMSksdS5fX2U9dC5fX2UsdS5fX2s9dC5fX2ssdS5fX2suc29tZShmdW5jdGlvbihuKXtuJiYobi5fXz11KX0pLHcucHVzaC5hcHBseShoLl9faCxoLl9zYiksaC5fc2I9W10saC5fX2gubGVuZ3RoJiZlLnB1c2goaCk7YnJlYWsgbn1udWxsIT1oLmNvbXBvbmVudFdpbGxVcGRhdGUmJmguY29tcG9uZW50V2lsbFVwZGF0ZShrLGguX19zLCQpLHgmJm51bGwhPWguY29tcG9uZW50RGlkVXBkYXRlJiZoLl9faC5wdXNoKGZ1bmN0aW9uKCl7aC5jb21wb25lbnREaWRVcGRhdGUodix5LGQpfSl9aWYoaC5jb250ZXh0PSQsaC5wcm9wcz1rLGguX19QPW4saC5fX2U9ITEsST1sLl9fcixQPTAseCloLnN0YXRlPWguX19zLGguX19kPSExLEkmJkkodSkscz1oLnJlbmRlcihoLnByb3BzLGguc3RhdGUsaC5jb250ZXh0KSx3LnB1c2guYXBwbHkoaC5fX2gsaC5fc2IpLGguX3NiPVtdO2Vsc2UgZG97aC5fX2Q9ITEsSSYmSSh1KSxzPWgucmVuZGVyKGgucHJvcHMsaC5zdGF0ZSxoLmNvbnRleHQpLGguc3RhdGU9aC5fX3N9d2hpbGUoaC5fX2QmJisrUDwyNSk7aC5zdGF0ZT1oLl9fcyxudWxsIT1oLmdldENoaWxkQ29udGV4dCYmKGk9bShtKHt9LGkpLGguZ2V0Q2hpbGRDb250ZXh0KCkpKSx4JiYhcCYmbnVsbCE9aC5nZXRTbmFwc2hvdEJlZm9yZVVwZGF0ZSYmKGQ9aC5nZXRTbmFwc2hvdEJlZm9yZVVwZGF0ZSh2LHkpKSxBPW51bGwhPXMmJnMudHlwZT09PVMmJm51bGw9PXMua2V5P0Uocy5wcm9wcy5jaGlsZHJlbik6cyxmPUwobixnKEEpP0E6W0FdLHUsdCxpLHIsbyxlLGYsYyxhKSxoLmJhc2U9dS5fX2UsdS5fX3UmPS0xNjEsaC5fX2gubGVuZ3RoJiZlLnB1c2goaCksXyYmKGguX19FPWguX189bnVsbCl9Y2F0Y2gobil7aWYodS5fX3Y9bnVsbCxjfHxudWxsIT1vKWlmKG4udGhlbil7Zm9yKHUuX191fD1jPzE2MDoxMjg7ZiYmOD09Zi5ub2RlVHlwZSYmZi5uZXh0U2libGluZzspZj1mLm5leHRTaWJsaW5nO29bby5pbmRleE9mKGYpXT1udWxsLHUuX19lPWZ9ZWxzZXtmb3IoSD1vLmxlbmd0aDtILS07KWIob1tIXSk7Qih1KX1lbHNlIHUuX19lPXQuX19lLHUuX19rPXQuX19rLG4udGhlbnx8Qih1KTtsLl9fZShuLHUsdCl9ZWxzZSBudWxsPT1vJiZ1Ll9fdj09dC5fX3Y/KHUuX19rPXQuX19rLHUuX19lPXQuX19lKTpmPXUuX19lPUcodC5fX2UsdSx0LGkscixvLGUsYyxhKTtyZXR1cm4ocz1sLmRpZmZlZCkmJnModSksMTI4JnUuX191P3ZvaWQgMDpmfWZ1bmN0aW9uIEIobil7biYmKG4uX19jJiYobi5fX2MuX19lPSEwKSxuLl9fayYmbi5fX2suc29tZShCKSl9ZnVuY3Rpb24gRChuLHUsdCl7Zm9yKHZhciBpPTA7aTx0Lmxlbmd0aDtpKyspSih0W2ldLHRbKytpXSx0WysraV0pO2wuX19jJiZsLl9fYyh1LG4pLG4uc29tZShmdW5jdGlvbih1KXt0cnl7bj11Ll9faCx1Ll9faD1bXSxuLnNvbWUoZnVuY3Rpb24obil7bi5jYWxsKHUpfSl9Y2F0Y2gobil7bC5fX2Uobix1Ll9fdil9fSl9ZnVuY3Rpb24gRShuKXtyZXR1cm5cIm9iamVjdFwiIT10eXBlb2Ygbnx8bnVsbD09bnx8bi5fX2I+MD9uOmcobik/bi5tYXAoRSk6dm9pZCAwIT09bi5jb25zdHJ1Y3Rvcj9udWxsOm0oe30sbil9ZnVuY3Rpb24gRyh1LHQsaSxyLG8sZSxmLGMsYSl7dmFyIHMsaCxwLHYseSx3LF8sbT1pLnByb3BzfHxkLGs9dC5wcm9wcyx4PXQudHlwZTtpZihcInN2Z1wiPT14P289XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiOlwibWF0aFwiPT14P289XCJodHRwOi8vd3d3LnczLm9yZy8xOTk4L01hdGgvTWF0aE1MXCI6b3x8KG89XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sXCIpLG51bGwhPWUpZm9yKHM9MDtzPGUubGVuZ3RoO3MrKylpZigoeT1lW3NdKSYmXCJzZXRBdHRyaWJ1dGVcImluIHk9PSEheCYmKHg/eS5sb2NhbE5hbWU9PXg6Mz09eS5ub2RlVHlwZSkpe3U9eSxlW3NdPW51bGw7YnJlYWt9aWYobnVsbD09dSl7aWYobnVsbD09eClyZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoayk7dT1kb2N1bWVudC5jcmVhdGVFbGVtZW50TlMobyx4LGsuaXMmJmspLGMmJihsLl9fbSYmbC5fX20odCxlKSxjPSExKSxlPW51bGx9aWYobnVsbD09eCltPT09a3x8YyYmdS5kYXRhPT1rfHwodS5kYXRhPWspO2Vsc2V7aWYoZT1cInRleHRhcmVhXCI9PXgmJm51bGwhPWsuZGVmYXVsdFZhbHVlP251bGw6ZSYmbi5jYWxsKHUuY2hpbGROb2RlcyksIWMmJm51bGwhPWUpZm9yKG09e30scz0wO3M8dS5hdHRyaWJ1dGVzLmxlbmd0aDtzKyspbVsoeT11LmF0dHJpYnV0ZXNbc10pLm5hbWVdPXkudmFsdWU7Zm9yKHMgaW4gbSl5PW1bc10sXCJkYW5nZXJvdXNseVNldElubmVySFRNTFwiPT1zP3A9eTpcImNoaWxkcmVuXCI9PXN8fHMgaW4ga3x8XCJ2YWx1ZVwiPT1zJiZcImRlZmF1bHRWYWx1ZVwiaW4ga3x8XCJjaGVja2VkXCI9PXMmJlwiZGVmYXVsdENoZWNrZWRcImluIGt8fE4odSxzLG51bGwseSxvKTtmb3IocyBpbiBrKXk9a1tzXSxcImNoaWxkcmVuXCI9PXM/dj15OlwiZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUxcIj09cz9oPXk6XCJ2YWx1ZVwiPT1zP3c9eTpcImNoZWNrZWRcIj09cz9fPXk6YyYmXCJmdW5jdGlvblwiIT10eXBlb2YgeXx8bVtzXT09PXl8fE4odSxzLHksbVtzXSxvKTtpZihoKWN8fHAmJihoLl9faHRtbD09cC5fX2h0bWx8fGguX19odG1sPT11LmlubmVySFRNTCl8fCh1LmlubmVySFRNTD1oLl9faHRtbCksdC5fX2s9W107ZWxzZSBpZihwJiYodS5pbm5lckhUTUw9XCJcIiksTChcInRlbXBsYXRlXCI9PXQudHlwZT91LmNvbnRlbnQ6dSxnKHYpP3Y6W3ZdLHQsaSxyLFwiZm9yZWlnbk9iamVjdFwiPT14P1wiaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbFwiOm8sZSxmLGU/ZVswXTppLl9fayYmJChpLDApLGMsYSksbnVsbCE9ZSlmb3Iocz1lLmxlbmd0aDtzLS07KWIoZVtzXSk7YyYmXCJ0ZXh0YXJlYVwiIT14fHwocz1cInZhbHVlXCIsXCJwcm9ncmVzc1wiPT14JiZudWxsPT13P3UucmVtb3ZlQXR0cmlidXRlKFwidmFsdWVcIik6bnVsbCE9dyYmKHchPT11W3NdfHxcInByb2dyZXNzXCI9PXgmJiF3fHxcIm9wdGlvblwiPT14JiZ3IT1tW3NdKSYmTih1LHMsdyxtW3NdLG8pLHM9XCJjaGVja2VkXCIsbnVsbCE9XyYmXyE9dVtzXSYmTih1LHMsXyxtW3NdLG8pKX1yZXR1cm4gdX1mdW5jdGlvbiBKKG4sdSx0KXt0cnl7aWYoXCJmdW5jdGlvblwiPT10eXBlb2Ygbil7dmFyIGk9XCJmdW5jdGlvblwiPT10eXBlb2Ygbi5fX3U7aSYmbi5fX3UoKSxpJiZudWxsPT11fHwobi5fX3U9bih1KSl9ZWxzZSBuLmN1cnJlbnQ9dX1jYXRjaChuKXtsLl9fZShuLHQpfX1mdW5jdGlvbiBLKG4sdSx0KXt2YXIgaSxyO2lmKGwudW5tb3VudCYmbC51bm1vdW50KG4pLChpPW4ucmVmKSYmKGkuY3VycmVudCYmaS5jdXJyZW50IT1uLl9fZXx8SihpLG51bGwsdSkpLG51bGwhPShpPW4uX19jKSl7aWYoaS5jb21wb25lbnRXaWxsVW5tb3VudCl0cnl7aS5jb21wb25lbnRXaWxsVW5tb3VudCgpfWNhdGNoKG4pe2wuX19lKG4sdSl9aS5iYXNlPWkuX19QPW51bGx9aWYoaT1uLl9faylmb3Iocj0wO3I8aS5sZW5ndGg7cisrKWlbcl0mJksoaVtyXSx1LHR8fFwiZnVuY3Rpb25cIiE9dHlwZW9mIG4udHlwZSk7dHx8YihuLl9fZSksbi5fX2M9bi5fXz1uLl9fZT12b2lkIDB9ZnVuY3Rpb24gUShuLGwsdSl7cmV0dXJuIHRoaXMuY29uc3RydWN0b3Iobix1KX1mdW5jdGlvbiBSKHUsdCxpKXt2YXIgcixvLGUsZjt0PT1kb2N1bWVudCYmKHQ9ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSxsLl9fJiZsLl9fKHUsdCksbz0ocj1cImZ1bmN0aW9uXCI9PXR5cGVvZiBpKT9udWxsOmkmJmkuX19rfHx0Ll9fayxlPVtdLGY9W10scSh0LHU9KCFyJiZpfHx0KS5fX2s9ayhTLG51bGwsW3VdKSxvfHxkLGQsdC5uYW1lc3BhY2VVUkksIXImJmk/W2ldOm8/bnVsbDp0LmZpcnN0Q2hpbGQ/bi5jYWxsKHQuY2hpbGROb2Rlcyk6bnVsbCxlLCFyJiZpP2k6bz9vLl9fZTp0LmZpcnN0Q2hpbGQscixmKSxEKGUsdSxmKX1mdW5jdGlvbiBVKG4sbCl7UihuLGwsVSl9ZnVuY3Rpb24gVyhsLHUsdCl7dmFyIGkscixvLGUsZj1tKHt9LGwucHJvcHMpO2ZvcihvIGluIGwudHlwZSYmbC50eXBlLmRlZmF1bHRQcm9wcyYmKGU9bC50eXBlLmRlZmF1bHRQcm9wcyksdSlcImtleVwiPT1vP2k9dVtvXTpcInJlZlwiPT1vP3I9dVtvXTpmW29dPXZvaWQgMD09PXVbb10mJm51bGwhPWU/ZVtvXTp1W29dO3JldHVybiBhcmd1bWVudHMubGVuZ3RoPjImJihmLmNoaWxkcmVuPWFyZ3VtZW50cy5sZW5ndGg+Mz9uLmNhbGwoYXJndW1lbnRzLDIpOnQpLHgobC50eXBlLGYsaXx8bC5rZXkscnx8bC5yZWYsbnVsbCl9ZnVuY3Rpb24gWChuKXtmdW5jdGlvbiBsKG4pe3ZhciB1LHQ7cmV0dXJuIHRoaXMuZ2V0Q2hpbGRDb250ZXh0fHwodT1uZXcgU2V0LCh0PXt9KVtsLl9fY109dGhpcyx0aGlzLmdldENoaWxkQ29udGV4dD1mdW5jdGlvbigpe3JldHVybiB0fSx0aGlzLmNvbXBvbmVudFdpbGxVbm1vdW50PWZ1bmN0aW9uKCl7dT1udWxsfSx0aGlzLnNob3VsZENvbXBvbmVudFVwZGF0ZT1mdW5jdGlvbihuKXt0aGlzLnByb3BzLnZhbHVlIT1uLnZhbHVlJiZ1LmZvckVhY2goZnVuY3Rpb24obil7bi5fX2U9ITAsQShuKX0pfSx0aGlzLnN1Yj1mdW5jdGlvbihuKXt1LmFkZChuKTt2YXIgbD1uLmNvbXBvbmVudFdpbGxVbm1vdW50O24uY29tcG9uZW50V2lsbFVubW91bnQ9ZnVuY3Rpb24oKXt1JiZ1LmRlbGV0ZShuKSxsJiZsLmNhbGwobil9fSksbi5jaGlsZHJlbn1yZXR1cm4gbC5fX2M9XCJfX2NDXCIreSsrLGwuX189bixsLlByb3ZpZGVyPWwuX19sPShsLkNvbnN1bWVyPWZ1bmN0aW9uKG4sbCl7cmV0dXJuIG4uY2hpbGRyZW4obCl9KS5jb250ZXh0VHlwZT1sLGx9bj13LnNsaWNlLGw9e19fZTpmdW5jdGlvbihuLGwsdSx0KXtmb3IodmFyIGkscixvO2w9bC5fXzspaWYoKGk9bC5fX2MpJiYhaS5fXyl0cnl7aWYoKHI9aS5jb25zdHJ1Y3RvcikmJm51bGwhPXIuZ2V0RGVyaXZlZFN0YXRlRnJvbUVycm9yJiYoaS5zZXRTdGF0ZShyLmdldERlcml2ZWRTdGF0ZUZyb21FcnJvcihuKSksbz1pLl9fZCksbnVsbCE9aS5jb21wb25lbnREaWRDYXRjaCYmKGkuY29tcG9uZW50RGlkQ2F0Y2gobix0fHx7fSksbz1pLl9fZCksbylyZXR1cm4gaS5fX0U9aX1jYXRjaChsKXtuPWx9dGhyb3cgbn19LHU9MCx0PWZ1bmN0aW9uKG4pe3JldHVybiBudWxsIT1uJiZ2b2lkIDA9PT1uLmNvbnN0cnVjdG9yfSxDLnByb3RvdHlwZS5zZXRTdGF0ZT1mdW5jdGlvbihuLGwpe3ZhciB1O3U9bnVsbCE9dGhpcy5fX3MmJnRoaXMuX19zIT10aGlzLnN0YXRlP3RoaXMuX19zOnRoaXMuX19zPW0oe30sdGhpcy5zdGF0ZSksXCJmdW5jdGlvblwiPT10eXBlb2YgbiYmKG49bihtKHt9LHUpLHRoaXMucHJvcHMpKSxuJiZtKHUsbiksbnVsbCE9biYmdGhpcy5fX3YmJihsJiZ0aGlzLl9zYi5wdXNoKGwpLEEodGhpcykpfSxDLnByb3RvdHlwZS5mb3JjZVVwZGF0ZT1mdW5jdGlvbihuKXt0aGlzLl9fdiYmKHRoaXMuX19lPSEwLG4mJnRoaXMuX19oLnB1c2gobiksQSh0aGlzKSl9LEMucHJvdG90eXBlLnJlbmRlcj1TLGk9W10sbz1cImZ1bmN0aW9uXCI9PXR5cGVvZiBQcm9taXNlP1Byb21pc2UucHJvdG90eXBlLnRoZW4uYmluZChQcm9taXNlLnJlc29sdmUoKSk6c2V0VGltZW91dCxlPWZ1bmN0aW9uKG4sbCl7cmV0dXJuIG4uX192Ll9fYi1sLl9fdi5fX2J9LEguX19yPTAsZj1NYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDgpLGM9XCJfX2RcIitmLGE9XCJfX2FcIitmLHM9LyhQb2ludGVyQ2FwdHVyZSkkfENhcHR1cmUkL2ksaD0wLHA9VighMSksdj1WKCEwKSx5PTA7ZXhwb3J0e0MgYXMgQ29tcG9uZW50LFMgYXMgRnJhZ21lbnQsVyBhcyBjbG9uZUVsZW1lbnQsWCBhcyBjcmVhdGVDb250ZXh0LGsgYXMgY3JlYXRlRWxlbWVudCxNIGFzIGNyZWF0ZVJlZixrIGFzIGgsVSBhcyBoeWRyYXRlLHQgYXMgaXNWYWxpZEVsZW1lbnQsbCBhcyBvcHRpb25zLFIgYXMgcmVuZGVyLEYgYXMgdG9DaGlsZEFycmF5fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXByZWFjdC5tb2R1bGUuanMubWFwXG4iLCJpbXBvcnR7b3B0aW9ucyBhcyBufWZyb21cInByZWFjdFwiO3ZhciB0LHIsdSxpLG89MCxmPVtdLGM9bixlPWMuX19iLGE9Yy5fX3Isdj1jLmRpZmZlZCxsPWMuX19jLG09Yy51bm1vdW50LHM9Yy5fXztmdW5jdGlvbiBwKG4sdCl7Yy5fX2gmJmMuX19oKHIsbixvfHx0KSxvPTA7dmFyIHU9ci5fX0h8fChyLl9fSD17X186W10sX19oOltdfSk7cmV0dXJuIG4+PXUuX18ubGVuZ3RoJiZ1Ll9fLnB1c2goe30pLHUuX19bbl19ZnVuY3Rpb24gZChuKXtyZXR1cm4gbz0xLGgoRCxuKX1mdW5jdGlvbiBoKG4sdSxpKXt2YXIgbz1wKHQrKywyKTtpZihvLnQ9biwhby5fX2MmJihvLl9fPVtpP2kodSk6RCh2b2lkIDAsdSksZnVuY3Rpb24obil7dmFyIHQ9by5fX04/by5fX05bMF06by5fX1swXSxyPW8udCh0LG4pO3QhPT1yJiYoby5fX049W3Isby5fX1sxXV0sby5fX2Muc2V0U3RhdGUoe30pKX1dLG8uX19jPXIsIXIuX19mKSl7dmFyIGY9ZnVuY3Rpb24obix0LHIpe2lmKCFvLl9fYy5fX0gpcmV0dXJuITA7dmFyIHU9by5fX2MuX19ILl9fLmZpbHRlcihmdW5jdGlvbihuKXtyZXR1cm4gbi5fX2N9KTtpZih1LmV2ZXJ5KGZ1bmN0aW9uKG4pe3JldHVybiFuLl9fTn0pKXJldHVybiFjfHxjLmNhbGwodGhpcyxuLHQscik7dmFyIGk9by5fX2MucHJvcHMhPT1uO3JldHVybiB1LnNvbWUoZnVuY3Rpb24obil7aWYobi5fX04pe3ZhciB0PW4uX19bMF07bi5fXz1uLl9fTixuLl9fTj12b2lkIDAsdCE9PW4uX19bMF0mJihpPSEwKX19KSxjJiZjLmNhbGwodGhpcyxuLHQscil8fGl9O3IuX19mPSEwO3ZhciBjPXIuc2hvdWxkQ29tcG9uZW50VXBkYXRlLGU9ci5jb21wb25lbnRXaWxsVXBkYXRlO3IuY29tcG9uZW50V2lsbFVwZGF0ZT1mdW5jdGlvbihuLHQscil7aWYodGhpcy5fX2Upe3ZhciB1PWM7Yz12b2lkIDAsZihuLHQsciksYz11fWUmJmUuY2FsbCh0aGlzLG4sdCxyKX0sci5zaG91bGRDb21wb25lbnRVcGRhdGU9Zn1yZXR1cm4gby5fX058fG8uX199ZnVuY3Rpb24geShuLHUpe3ZhciBpPXAodCsrLDMpOyFjLl9fcyYmQyhpLl9fSCx1KSYmKGkuX189bixpLnU9dSxyLl9fSC5fX2gucHVzaChpKSl9ZnVuY3Rpb24gXyhuLHUpe3ZhciBpPXAodCsrLDQpOyFjLl9fcyYmQyhpLl9fSCx1KSYmKGkuX189bixpLnU9dSxyLl9faC5wdXNoKGkpKX1mdW5jdGlvbiBBKG4pe3JldHVybiBvPTUsVChmdW5jdGlvbigpe3JldHVybntjdXJyZW50Om59fSxbXSl9ZnVuY3Rpb24gRihuLHQscil7bz02LF8oZnVuY3Rpb24oKXtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBuKXt2YXIgcj1uKHQoKSk7cmV0dXJuIGZ1bmN0aW9uKCl7bihudWxsKSxyJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiByJiZyKCl9fWlmKG4pcmV0dXJuIG4uY3VycmVudD10KCksZnVuY3Rpb24oKXtyZXR1cm4gbi5jdXJyZW50PW51bGx9fSxudWxsPT1yP3I6ci5jb25jYXQobikpfWZ1bmN0aW9uIFQobixyKXt2YXIgdT1wKHQrKyw3KTtyZXR1cm4gQyh1Ll9fSCxyKSYmKHUuX189bigpLHUuX19IPXIsdS5fX2g9biksdS5fX31mdW5jdGlvbiBxKG4sdCl7cmV0dXJuIG89OCxUKGZ1bmN0aW9uKCl7cmV0dXJuIG59LHQpfWZ1bmN0aW9uIHgobil7dmFyIHU9ci5jb250ZXh0W24uX19jXSxpPXAodCsrLDkpO3JldHVybiBpLmM9bix1PyhudWxsPT1pLl9fJiYoaS5fXz0hMCx1LnN1YihyKSksdS5wcm9wcy52YWx1ZSk6bi5fX31mdW5jdGlvbiBQKG4sdCl7Yy51c2VEZWJ1Z1ZhbHVlJiZjLnVzZURlYnVnVmFsdWUodD90KG4pOm4pfWZ1bmN0aW9uIGIobil7dmFyIHU9cCh0KyssMTApLGk9ZCgpO3JldHVybiB1Ll9fPW4sci5jb21wb25lbnREaWRDYXRjaHx8KHIuY29tcG9uZW50RGlkQ2F0Y2g9ZnVuY3Rpb24obix0KXt1Ll9fJiZ1Ll9fKG4sdCksaVsxXShuKX0pLFtpWzBdLGZ1bmN0aW9uKCl7aVsxXSh2b2lkIDApfV19ZnVuY3Rpb24gZygpe3ZhciBuPXAodCsrLDExKTtpZighbi5fXyl7Zm9yKHZhciB1PXIuX192O251bGwhPT11JiYhdS5fX20mJm51bGwhPT11Ll9fOyl1PXUuX187dmFyIGk9dS5fX218fCh1Ll9fbT1bMCwwXSk7bi5fXz1cIlBcIitpWzBdK1wiLVwiK2lbMV0rK31yZXR1cm4gbi5fX31mdW5jdGlvbiBqKCl7Zm9yKHZhciBuO249Zi5zaGlmdCgpOyl7dmFyIHQ9bi5fX0g7aWYobi5fX1AmJnQpdHJ5e3QuX19oLnNvbWUoeiksdC5fX2guc29tZShCKSx0Ll9faD1bXX1jYXRjaChyKXt0Ll9faD1bXSxjLl9fZShyLG4uX192KX19fWMuX19iPWZ1bmN0aW9uKG4pe3I9bnVsbCxlJiZlKG4pfSxjLl9fPWZ1bmN0aW9uKG4sdCl7biYmdC5fX2smJnQuX19rLl9fbSYmKG4uX19tPXQuX19rLl9fbSkscyYmcyhuLHQpfSxjLl9fcj1mdW5jdGlvbihuKXthJiZhKG4pLHQ9MDt2YXIgaT0ocj1uLl9fYykuX19IO2kmJih1PT09cj8oaS5fX2g9W10sci5fX2g9W10saS5fXy5zb21lKGZ1bmN0aW9uKG4pe24uX19OJiYobi5fXz1uLl9fTiksbi51PW4uX19OPXZvaWQgMH0pKTooaS5fX2guc29tZSh6KSxpLl9faC5zb21lKEIpLGkuX19oPVtdLHQ9MCkpLHU9cn0sYy5kaWZmZWQ9ZnVuY3Rpb24obil7diYmdihuKTt2YXIgdD1uLl9fYzt0JiZ0Ll9fSCYmKHQuX19ILl9faC5sZW5ndGgmJigxIT09Zi5wdXNoKHQpJiZpPT09Yy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWV8fCgoaT1jLnJlcXVlc3RBbmltYXRpb25GcmFtZSl8fHcpKGopKSx0Ll9fSC5fXy5zb21lKGZ1bmN0aW9uKG4pe24udSYmKG4uX19IPW4udSksbi51PXZvaWQgMH0pKSx1PXI9bnVsbH0sYy5fX2M9ZnVuY3Rpb24obix0KXt0LnNvbWUoZnVuY3Rpb24obil7dHJ5e24uX19oLnNvbWUoeiksbi5fX2g9bi5fX2guZmlsdGVyKGZ1bmN0aW9uKG4pe3JldHVybiFuLl9ffHxCKG4pfSl9Y2F0Y2gocil7dC5zb21lKGZ1bmN0aW9uKG4pe24uX19oJiYobi5fX2g9W10pfSksdD1bXSxjLl9fZShyLG4uX192KX19KSxsJiZsKG4sdCl9LGMudW5tb3VudD1mdW5jdGlvbihuKXttJiZtKG4pO3ZhciB0LHI9bi5fX2M7ciYmci5fX0gmJihyLl9fSC5fXy5zb21lKGZ1bmN0aW9uKG4pe3RyeXt6KG4pfWNhdGNoKG4pe3Q9bn19KSxyLl9fSD12b2lkIDAsdCYmYy5fX2UodCxyLl9fdikpfTt2YXIgaz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1ZXN0QW5pbWF0aW9uRnJhbWU7ZnVuY3Rpb24gdyhuKXt2YXIgdCxyPWZ1bmN0aW9uKCl7Y2xlYXJUaW1lb3V0KHUpLGsmJmNhbmNlbEFuaW1hdGlvbkZyYW1lKHQpLHNldFRpbWVvdXQobil9LHU9c2V0VGltZW91dChyLDM1KTtrJiYodD1yZXF1ZXN0QW5pbWF0aW9uRnJhbWUocikpfWZ1bmN0aW9uIHoobil7dmFyIHQ9cix1PW4uX19jO1wiZnVuY3Rpb25cIj09dHlwZW9mIHUmJihuLl9fYz12b2lkIDAsdSgpKSxyPXR9ZnVuY3Rpb24gQihuKXt2YXIgdD1yO24uX19jPW4uX18oKSxyPXR9ZnVuY3Rpb24gQyhuLHQpe3JldHVybiFufHxuLmxlbmd0aCE9PXQubGVuZ3RofHx0LnNvbWUoZnVuY3Rpb24odCxyKXtyZXR1cm4gdCE9PW5bcl19KX1mdW5jdGlvbiBEKG4sdCl7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2YgdD90KG4pOnR9ZXhwb3J0e3EgYXMgdXNlQ2FsbGJhY2sseCBhcyB1c2VDb250ZXh0LFAgYXMgdXNlRGVidWdWYWx1ZSx5IGFzIHVzZUVmZmVjdCxiIGFzIHVzZUVycm9yQm91bmRhcnksZyBhcyB1c2VJZCxGIGFzIHVzZUltcGVyYXRpdmVIYW5kbGUsXyBhcyB1c2VMYXlvdXRFZmZlY3QsVCBhcyB1c2VNZW1vLGggYXMgdXNlUmVkdWNlcixBIGFzIHVzZVJlZixkIGFzIHVzZVN0YXRlfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWhvb2tzLm1vZHVsZS5qcy5tYXBcbiIsImltcG9ydHtvcHRpb25zIGFzIHIsRnJhZ21lbnQgYXMgZX1mcm9tXCJwcmVhY3RcIjtleHBvcnR7RnJhZ21lbnR9ZnJvbVwicHJlYWN0XCI7dmFyIHQ9L1tcIiY8XS87ZnVuY3Rpb24gbihyKXtpZigwPT09ci5sZW5ndGh8fCExPT09dC50ZXN0KHIpKXJldHVybiByO2Zvcih2YXIgZT0wLG49MCxvPVwiXCIsZj1cIlwiO248ci5sZW5ndGg7bisrKXtzd2l0Y2goci5jaGFyQ29kZUF0KG4pKXtjYXNlIDM0OmY9XCImcXVvdDtcIjticmVhaztjYXNlIDM4OmY9XCImYW1wO1wiO2JyZWFrO2Nhc2UgNjA6Zj1cIiZsdDtcIjticmVhaztkZWZhdWx0OmNvbnRpbnVlfW4hPT1lJiYobys9ci5zbGljZShlLG4pKSxvKz1mLGU9bisxfXJldHVybiBuIT09ZSYmKG8rPXIuc2xpY2UoZSxuKSksb312YXIgbz0vYWNpdHxleCg/OnN8Z3xufHB8JCl8cnBofGdyaWR8b3dzfG1uY3xudHd8aW5lW2NoXXx6b298Xm9yZHxpdGVyYS9pLGY9MCxpPUFycmF5LmlzQXJyYXk7ZnVuY3Rpb24gdShlLHQsbixvLGksdSl7dHx8KHQ9e30pO3ZhciBhLGMscD10O2lmKFwicmVmXCJpbiBwKWZvcihjIGluIHA9e30sdClcInJlZlwiPT1jP2E9dFtjXTpwW2NdPXRbY107dmFyIGw9e3R5cGU6ZSxwcm9wczpwLGtleTpuLHJlZjphLF9fazpudWxsLF9fOm51bGwsX19iOjAsX19lOm51bGwsX19jOm51bGwsY29uc3RydWN0b3I6dm9pZCAwLF9fdjotLWYsX19pOi0xLF9fdTowLF9fc291cmNlOmksX19zZWxmOnV9O2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGUmJihhPWUuZGVmYXVsdFByb3BzKSlmb3IoYyBpbiBhKXZvaWQgMD09PXBbY10mJihwW2NdPWFbY10pO3JldHVybiByLnZub2RlJiZyLnZub2RlKGwpLGx9ZnVuY3Rpb24gYShyKXt2YXIgdD11KGUse3RwbDpyLGV4cHJzOltdLnNsaWNlLmNhbGwoYXJndW1lbnRzLDEpfSk7cmV0dXJuIHQua2V5PXQuX192LHR9dmFyIGM9e30scD0vW0EtWl0vZztmdW5jdGlvbiBsKGUsdCl7aWYoci5hdHRyKXt2YXIgZj1yLmF0dHIoZSx0KTtpZihcInN0cmluZ1wiPT10eXBlb2YgZilyZXR1cm4gZn1pZih0PWZ1bmN0aW9uKHIpe3JldHVybiBudWxsIT09ciYmXCJvYmplY3RcIj09dHlwZW9mIHImJlwiZnVuY3Rpb25cIj09dHlwZW9mIHIudmFsdWVPZj9yLnZhbHVlT2YoKTpyfSh0KSxcInJlZlwiPT09ZXx8XCJrZXlcIj09PWUpcmV0dXJuXCJcIjtpZihcInN0eWxlXCI9PT1lJiZcIm9iamVjdFwiPT10eXBlb2YgdCl7dmFyIGk9XCJcIjtmb3IodmFyIHUgaW4gdCl7dmFyIGE9dFt1XTtpZihudWxsIT1hJiZcIlwiIT09YSl7dmFyIGw9XCItXCI9PXVbMF0/dTpjW3VdfHwoY1t1XT11LnJlcGxhY2UocCxcIi0kJlwiKS50b0xvd2VyQ2FzZSgpKSxzPVwiO1wiO1wibnVtYmVyXCIhPXR5cGVvZiBhfHxsLnN0YXJ0c1dpdGgoXCItLVwiKXx8by50ZXN0KGwpfHwocz1cInB4O1wiKSxpPWkrbCtcIjpcIithK3N9fXJldHVybiBlKyc9XCInK24oaSkrJ1wiJ31yZXR1cm4gbnVsbD09dHx8ITE9PT10fHxcImZ1bmN0aW9uXCI9PXR5cGVvZiB0fHxcIm9iamVjdFwiPT10eXBlb2YgdD9cIlwiOiEwPT09dD9lOmUrJz1cIicrbihcIlwiK3QpKydcIid9ZnVuY3Rpb24gcyhyKXtpZihudWxsPT1yfHxcImJvb2xlYW5cIj09dHlwZW9mIHJ8fFwiZnVuY3Rpb25cIj09dHlwZW9mIHIpcmV0dXJuIG51bGw7aWYoXCJvYmplY3RcIj09dHlwZW9mIHIpe2lmKHZvaWQgMD09PXIuY29uc3RydWN0b3IpcmV0dXJuIHI7aWYoaShyKSl7Zm9yKHZhciBlPTA7ZTxyLmxlbmd0aDtlKyspcltlXT1zKHJbZV0pO3JldHVybiByfX1yZXR1cm4gbihcIlwiK3IpfWV4cG9ydHt1IGFzIGpzeCxsIGFzIGpzeEF0dHIsdSBhcyBqc3hERVYscyBhcyBqc3hFc2NhcGUsYSBhcyBqc3hUZW1wbGF0ZSx1IGFzIGpzeHN9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9anN4UnVudGltZS5tb2R1bGUuanMubWFwXG4iLCJpbXBvcnQgeyBjcmVhdGVDb250ZXh0IH0gZnJvbSAncHJlYWN0J1xuaW1wb3J0IHsgdXNlQ29udGV4dCB9IGZyb20gJ3ByZWFjdC9ob29rcydcbmltcG9ydCB0eXBlIHsgU2V0dGluZ3NTdG9yZSB9IGZyb20gJy4uLy4uL2FwcGxpY2F0aW9uL3NldHRpbmdzL3NldHRpbmdzU3RvcmUnXG5cbmNvbnN0IFNldHRpbmdzQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQ8U2V0dGluZ3NTdG9yZSB8IG51bGw+KG51bGwpXG5cbmludGVyZmFjZSBTZXR0aW5nc1Byb3ZpZGVyUHJvcHMge1xuICBzZXR0aW5nczogU2V0dGluZ3NTdG9yZVxuICBjaGlsZHJlbjogcHJlYWN0LkNvbXBvbmVudENoaWxkcmVuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTZXR0aW5nc1Byb3ZpZGVyKHsgc2V0dGluZ3MsIGNoaWxkcmVuIH06IFNldHRpbmdzUHJvdmlkZXJQcm9wcykge1xuICByZXR1cm4gPFNldHRpbmdzQ29udGV4dC5Qcm92aWRlciB2YWx1ZT17c2V0dGluZ3N9PntjaGlsZHJlbn08L1NldHRpbmdzQ29udGV4dC5Qcm92aWRlcj5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZVNldHRpbmdzKCk6IFNldHRpbmdzU3RvcmUge1xuICBjb25zdCBzZXR0aW5ncyA9IHVzZUNvbnRleHQoU2V0dGluZ3NDb250ZXh0KVxuICAvKiB2OCBpZ25vcmUgbmV4dCAzICovXG4gIGlmICghc2V0dGluZ3MpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3VzZVNldHRpbmdzIG11c3QgYmUgdXNlZCB3aXRoaW4gYSBTZXR0aW5nc1Byb3ZpZGVyJylcbiAgfVxuICByZXR1cm4gc2V0dGluZ3Ncbn1cbiIsImltcG9ydHtDb21wb25lbnQgYXMgaSxvcHRpb25zIGFzIHIsaXNWYWxpZEVsZW1lbnQgYXMgbn1mcm9tXCJwcmVhY3RcIjtpbXBvcnR7dXNlTWVtbyBhcyB0LHVzZVJlZiBhcyBmLHVzZUVmZmVjdCBhcyBvfWZyb21cInByZWFjdC9ob29rc1wiO2ltcG9ydHtTaWduYWwgYXMgZSxjb21wdXRlZCBhcyB1LHNpZ25hbCBhcyBhLGVmZmVjdCBhcyBjfWZyb21cIkBwcmVhY3Qvc2lnbmFscy1jb3JlXCI7ZXhwb3J0e1NpZ25hbCxiYXRjaCxjb21wdXRlZCxlZmZlY3Qsc2lnbmFsLHVudHJhY2tlZH1mcm9tXCJAcHJlYWN0L3NpZ25hbHMtY29yZVwiO3ZhciB2LHM7ZnVuY3Rpb24gbChpLG4pe3JbaV09bi5iaW5kKG51bGwscltpXXx8ZnVuY3Rpb24oKXt9KX1mdW5jdGlvbiBkKGkpe2lmKHMpe3ZhciByPXM7cz12b2lkIDA7cigpfXM9aSYmaS5TKCl9ZnVuY3Rpb24gaChpKXt2YXIgcj10aGlzLGY9aS5kYXRhLG89dXNlU2lnbmFsKGYpO28udmFsdWU9Zjt2YXIgZT10KGZ1bmN0aW9uKCl7dmFyIGk9ci5fX3Y7d2hpbGUoaT1pLl9fKWlmKGkuX19jKXtpLl9fYy5fXyRmfD00O2JyZWFrfXIuX18kdS5jPWZ1bmN0aW9uKCl7dmFyIGksdD1yLl9fJHUuUygpLGY9ZS52YWx1ZTt0KCk7aWYobihmKXx8MyE9PShudWxsPT0oaT1yLmJhc2UpP3ZvaWQgMDppLm5vZGVUeXBlKSl7ci5fXyRmfD0xO3Iuc2V0U3RhdGUoe30pfWVsc2Ugci5iYXNlLmRhdGE9Zn07cmV0dXJuIHUoZnVuY3Rpb24oKXt2YXIgaT1vLnZhbHVlLnZhbHVlO3JldHVybiAwPT09aT8wOiEwPT09aT9cIlwiOml8fFwiXCJ9KX0sW10pO3JldHVybiBlLnZhbHVlfWguZGlzcGxheU5hbWU9XCJfc3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydGllcyhlLnByb3RvdHlwZSx7Y29uc3RydWN0b3I6e2NvbmZpZ3VyYWJsZTohMCx2YWx1ZTp2b2lkIDB9LHR5cGU6e2NvbmZpZ3VyYWJsZTohMCx2YWx1ZTpofSxwcm9wczp7Y29uZmlndXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybntkYXRhOnRoaXN9fX0sX19iOntjb25maWd1cmFibGU6ITAsdmFsdWU6MX19KTtsKFwiX19iXCIsZnVuY3Rpb24oaSxyKXtpZihcInN0cmluZ1wiPT10eXBlb2Ygci50eXBlKXt2YXIgbix0PXIucHJvcHM7Zm9yKHZhciBmIGluIHQpaWYoXCJjaGlsZHJlblwiIT09Zil7dmFyIG89dFtmXTtpZihvIGluc3RhbmNlb2YgZSl7aWYoIW4pci5fX25wPW49e307bltmXT1vO3RbZl09by5wZWVrKCl9fX1pKHIpfSk7bChcIl9fclwiLGZ1bmN0aW9uKGkscil7aShyKTtkKCk7dmFyIG4sdD1yLl9fYztpZih0KXt0Ll9fJGYmPS0yO2lmKHZvaWQgMD09PShuPXQuX18kdSkpdC5fXyR1PW49ZnVuY3Rpb24oaSl7dmFyIHI7YyhmdW5jdGlvbigpe3I9dGhpc30pO3IuYz1mdW5jdGlvbigpe3QuX18kZnw9MTt0LnNldFN0YXRlKHt9KX07cmV0dXJuIHJ9KCl9dj10O2Qobil9KTtsKFwiX19lXCIsZnVuY3Rpb24oaSxyLG4sdCl7ZCgpO3Y9dm9pZCAwO2kocixuLHQpfSk7bChcImRpZmZlZFwiLGZ1bmN0aW9uKGkscil7ZCgpO3Y9dm9pZCAwO3ZhciBuO2lmKFwic3RyaW5nXCI9PXR5cGVvZiByLnR5cGUmJihuPXIuX19lKSl7dmFyIHQ9ci5fX25wLGY9ci5wcm9wcztpZih0KXt2YXIgbz1uLlU7aWYobylmb3IodmFyIGUgaW4gbyl7dmFyIHU9b1tlXTtpZih2b2lkIDAhPT11JiYhKGUgaW4gdCkpe3UuZCgpO29bZV09dm9pZCAwfX1lbHNlIG4uVT1vPXt9O2Zvcih2YXIgYSBpbiB0KXt2YXIgYz1vW2FdLHM9dFthXTtpZih2b2lkIDA9PT1jKXtjPXAobixhLHMsZik7b1thXT1jfWVsc2UgYy5vKHMsZil9fX1pKHIpfSk7ZnVuY3Rpb24gcChpLHIsbix0KXt2YXIgZj1yIGluIGkmJnZvaWQgMD09PWkub3duZXJTVkdFbGVtZW50LG89YShuKTtyZXR1cm57bzpmdW5jdGlvbihpLHIpe28udmFsdWU9aTt0PXJ9LGQ6YyhmdW5jdGlvbigpe3ZhciBuPW8udmFsdWUudmFsdWU7aWYodFtyXSE9PW4pe3Rbcl09bjtpZihmKWlbcl09bjtlbHNlIGlmKG4paS5zZXRBdHRyaWJ1dGUocixuKTtlbHNlIGkucmVtb3ZlQXR0cmlidXRlKHIpfX0pfX1sKFwidW5tb3VudFwiLGZ1bmN0aW9uKGkscil7aWYoXCJzdHJpbmdcIj09dHlwZW9mIHIudHlwZSl7dmFyIG49ci5fX2U7aWYobil7dmFyIHQ9bi5VO2lmKHQpe24uVT12b2lkIDA7Zm9yKHZhciBmIGluIHQpe3ZhciBvPXRbZl07aWYobylvLmQoKX19fX1lbHNle3ZhciBlPXIuX19jO2lmKGUpe3ZhciB1PWUuX18kdTtpZih1KXtlLl9fJHU9dm9pZCAwO3UuZCgpfX19aShyKX0pO2woXCJfX2hcIixmdW5jdGlvbihpLHIsbix0KXtpZih0PDN8fDk9PT10KXIuX18kZnw9MjtpKHIsbix0KX0pO2kucHJvdG90eXBlLnNob3VsZENvbXBvbmVudFVwZGF0ZT1mdW5jdGlvbihpLHIpe2lmKHRoaXMuX19SKXJldHVybiEwO3ZhciBuPXRoaXMuX18kdSx0PW4mJnZvaWQgMCE9PW4ucztmb3IodmFyIGYgaW4gcilyZXR1cm4hMDtpZih0aGlzLl9fZnx8XCJib29sZWFuXCI9PXR5cGVvZiB0aGlzLnUmJiEwPT09dGhpcy51KXtpZighKHR8fDImdGhpcy5fXyRmfHw0JnRoaXMuX18kZikpcmV0dXJuITA7aWYoMSZ0aGlzLl9fJGYpcmV0dXJuITB9ZWxzZXtpZighKHR8fDQmdGhpcy5fXyRmKSlyZXR1cm4hMDtpZigzJnRoaXMuX18kZilyZXR1cm4hMH1mb3IodmFyIG8gaW4gaSlpZihcIl9fc291cmNlXCIhPT1vJiZpW29dIT09dGhpcy5wcm9wc1tvXSlyZXR1cm4hMDtmb3IodmFyIGUgaW4gdGhpcy5wcm9wcylpZighKGUgaW4gaSkpcmV0dXJuITA7cmV0dXJuITF9O2Z1bmN0aW9uIHVzZVNpZ25hbChpKXtyZXR1cm4gdChmdW5jdGlvbigpe3JldHVybiBhKGkpfSxbXSl9ZnVuY3Rpb24gdXNlQ29tcHV0ZWQoaSl7dmFyIHI9ZihpKTtyLmN1cnJlbnQ9aTt2Ll9fJGZ8PTQ7cmV0dXJuIHQoZnVuY3Rpb24oKXtyZXR1cm4gdShmdW5jdGlvbigpe3JldHVybiByLmN1cnJlbnQoKX0pfSxbXSl9ZnVuY3Rpb24gdXNlU2lnbmFsRWZmZWN0KGkpe3ZhciByPWYoaSk7ci5jdXJyZW50PWk7byhmdW5jdGlvbigpe3JldHVybiBjKGZ1bmN0aW9uKCl7cmV0dXJuIHIuY3VycmVudCgpfSl9LFtdKX1leHBvcnR7dXNlQ29tcHV0ZWQsdXNlU2lnbmFsLHVzZVNpZ25hbEVmZmVjdH07Ly8jIHNvdXJjZU1hcHBpbmdVUkw9c2lnbmFscy5tb2R1bGUuanMubWFwXG4iLCIvLyBQYXJhbGxheCBjYW1lcmEgYW5nbGVzIGluIGRlZ3JlZXNcbmV4cG9ydCBlbnVtIFBhcmFsbGF4IHtcbiAgT3ZlcmhlYWQgPSAwLFxuICBTbGlnaHRfMjAgPSAyMCxcbiAgU2xpZ2h0XzMwID0gMzAsXG4gIE1lZGl1bV80MCA9IDQwLFxuICBNZWRpdW1fNTAgPSA1MCxcbiAgU3Ryb25nXzYwID0gNjAsXG4gIFN0cm9uZ182NSA9IDY1LFxuICBTdHJvbmdfNzAgPSA3MCxcbiAgRXh0cmVtZV84MCA9IDgwLFxufVxuXG4vLyBIb3ZlciBtb2RlIG9zY2lsbGF0aW9uIHNjYWxlc1xuZXhwb3J0IGVudW0gSG92ZXJNb2RlIHtcbiAgT2ZmID0gJ29mZicsXG4gIFNtYWxsID0gJ3NtYWxsJyxcbiAgTGFyZ2UgPSAnbGFyZ2UnLFxuICBTdXBlciA9ICdzdXBlcicsXG59XG5cbi8vIFBpZWNlIHZpc3VhbCBzdHlsZXNcbmV4cG9ydCBlbnVtIFBpZWNlU3R5bGUge1xuICBJY29ucyA9ICdpY29ucycsXG4gIFRocmVlRCA9ICczZCcsXG4gIENoZWNrZXIgPSAnY2hlY2tlcicsXG4gIENoZWNrZXJHcmV5ID0gJ2NoZWNrZXItZ3JleScsXG4gIEJsaW5kZm9sZCA9ICdibGluZGZvbGQnLFxufVxuXG4vLyBCbHVyIGFtb3VudHMgaW4gcGl4ZWxzXG5leHBvcnQgZW51bSBCbHVyIHtcbiAgTm9uZSA9IDAsXG4gIFNsaWdodF8xID0gMSxcbiAgU2xpZ2h0XzIgPSAyLFxuICBNZWRpdW1fMyA9IDMsXG4gIE1lZGl1bV80ID0gNCxcbiAgSGVhdnlfNiA9IDYsXG4gIEhlYXZ5XzggPSA4LFxufVxuXG4vLyBCbGFjayBzZWdtZW50cyBxdWFkcmFudCBjb3ZlcmFnZVxuZXhwb3J0IGVudW0gQmxhY2tTZWdtZW50cyB7XG4gIE5vbmUgPSAnbm9uZScsXG4gIE9uZVF1YXJ0ZXIgPSAnMS80JyxcbiAgSGFsZiA9ICcxLzInLFxuICBUaHJlZVF1YXJ0ZXJzID0gJzMvNCcsXG4gIEFsbCA9ICc0LzQnLFxufVxuXG4vLyBCbGFjayBzZWdtZW50cyByb3RhdGlvbiB0aW1pbmdcbmV4cG9ydCBlbnVtIEJsYWNrU2VnbWVudHNUaW1pbmcge1xuICBSb3RhdGUxMHMgPSAncm90YXRlLTEwcycsXG4gIFJvdGF0ZTMwcyA9ICdyb3RhdGUtMzBzJyxcbiAgUm90YXRlNjBzID0gJ3JvdGF0ZS02MHMnLFxuICBEb250Um90YXRlID0gJ2RvbnQtcm90YXRlJyxcbn1cblxuLy8gRmxhc2ggZHVyYXRpb24gaW4gbWlsbGlzZWNvbmRzXG5leHBvcnQgZW51bSBGbGFzaER1cmF0aW9uIHtcbiAgTXMxMDAgPSAxMDAsXG4gIE1zMzAwID0gMzAwLFxuICBNczUwMCA9IDUwMCxcbiAgTXMxMDAwID0gMTAwMCxcbiAgTXMyMDAwID0gMjAwMCxcbn1cblxuLy8gRmxhc2ggaW50ZXJ2YWwgaW4gc2Vjb25kc1xuZXhwb3J0IGVudW0gRmxhc2hJbnRlcnZhbCB7XG4gIFNlYzBfMyA9IDAuMyxcbiAgU2VjMF81ID0gMC41LFxuICBTZWMxID0gMSxcbiAgU2VjMyA9IDMsXG4gIFNlYzUgPSA1LFxuICBTZWMxMCA9IDEwLFxuICBTZWMzMCA9IDMwLFxuICBTZWM2MCA9IDYwLFxufVxuXG4vLyBIZWxwZXIgZnVuY3Rpb25zIHRvIGdldCBhbGwgdmFsdWVzIGFzIGFycmF5cyBmb3IgU2V0dGluZ0J1dHRvbiBvcHRpb25zXG5leHBvcnQgY29uc3QgUEFSQUxMQVhfT1BUSU9OUyA9IE9iamVjdC52YWx1ZXMoUGFyYWxsYXgpLmZpbHRlcihcbiAgKHYpID0+IHR5cGVvZiB2ID09PSAnbnVtYmVyJ1xuKSBhcyBudW1iZXJbXVxuXG5leHBvcnQgY29uc3QgSE9WRVJfTU9ERV9PUFRJT05TID0gT2JqZWN0LnZhbHVlcyhIb3Zlck1vZGUpLmZpbHRlcihcbiAgKHYpID0+IHR5cGVvZiB2ID09PSAnc3RyaW5nJ1xuKSBhcyBzdHJpbmdbXVxuXG5leHBvcnQgY29uc3QgUElFQ0VfU1RZTEVfT1BUSU9OUyA9IE9iamVjdC52YWx1ZXMoUGllY2VTdHlsZSkuZmlsdGVyKFxuICAodikgPT4gdHlwZW9mIHYgPT09ICdzdHJpbmcnXG4pIGFzIHN0cmluZ1tdXG5cbmV4cG9ydCBjb25zdCBCTFVSX09QVElPTlMgPSBPYmplY3QudmFsdWVzKEJsdXIpLmZpbHRlcigodikgPT4gdHlwZW9mIHYgPT09ICdudW1iZXInKSBhcyBudW1iZXJbXVxuXG5leHBvcnQgY29uc3QgQkxBQ0tfU0VHTUVOVFNfT1BUSU9OUyA9IE9iamVjdC52YWx1ZXMoQmxhY2tTZWdtZW50cykuZmlsdGVyKFxuICAodikgPT4gdHlwZW9mIHYgPT09ICdzdHJpbmcnXG4pIGFzIHN0cmluZ1tdXG5cbmV4cG9ydCBjb25zdCBCTEFDS19TRUdNRU5UU19USU1JTkdfT1BUSU9OUyA9IE9iamVjdC52YWx1ZXMoQmxhY2tTZWdtZW50c1RpbWluZykuZmlsdGVyKFxuICAodikgPT4gdHlwZW9mIHYgPT09ICdzdHJpbmcnXG4pIGFzIHN0cmluZ1tdXG5cbmV4cG9ydCBjb25zdCBGTEFTSF9EVVJBVElPTl9PUFRJT05TID0gT2JqZWN0LnZhbHVlcyhGbGFzaER1cmF0aW9uKS5maWx0ZXIoXG4gICh2KSA9PiB0eXBlb2YgdiA9PT0gJ251bWJlcidcbikgYXMgbnVtYmVyW11cblxuZXhwb3J0IGNvbnN0IEZMQVNIX0lOVEVSVkFMX09QVElPTlMgPSBPYmplY3QudmFsdWVzKEZsYXNoSW50ZXJ2YWwpLmZpbHRlcihcbiAgKHYpID0+IHR5cGVvZiB2ID09PSAnbnVtYmVyJ1xuKSBhcyBudW1iZXJbXVxuIiwiaW50ZXJmYWNlIEFjdGlvbkJ1dHRvblByb3BzIHtcbiAgbGFiZWw6IHN0cmluZ1xuICBvbkNsaWNrOiAoKSA9PiB2b2lkXG59XG5cbmNvbnN0IGJ1dHRvblN0eWxlID0ge1xuICBtYXJnaW46ICc0cHgnLFxuICBwYWRkaW5nOiAnNnB4IDEycHgnLFxuICBib3JkZXI6ICcxcHggc29saWQgY3VycmVudENvbG9yJyxcbiAgYm9yZGVyUmFkaXVzOiAnNHB4JyxcbiAgYmFja2dyb3VuZENvbG9yOiAndHJhbnNwYXJlbnQnLFxuICBjb2xvcjogJ2luaGVyaXQnLFxuICBjdXJzb3I6ICdwb2ludGVyJyxcbiAgZm9udFNpemU6ICcxNHB4Jyxcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEFjdGlvbkJ1dHRvbih7IGxhYmVsLCBvbkNsaWNrIH06IEFjdGlvbkJ1dHRvblByb3BzKSB7XG4gIGNvbnN0IGhhbmRsZUNsaWNrID0gKGU6IEV2ZW50KSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgIG9uQ2xpY2soKVxuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8YnV0dG9uIG9uQ2xpY2s9e2hhbmRsZUNsaWNrfSB0eXBlPVwiYnV0dG9uXCIgc3R5bGU9e2J1dHRvblN0eWxlfT5cbiAgICAgIHtsYWJlbH1cbiAgICA8L2J1dHRvbj5cbiAgKVxufVxuIiwiaW1wb3J0IHR5cGUgeyBTaWduYWwgfSBmcm9tICdAcHJlYWN0L3NpZ25hbHMnXG5pbXBvcnQgdHlwZSB7IENvbXBvbmVudENoaWxkcmVuIH0gZnJvbSAncHJlYWN0J1xuXG5pbnRlcmZhY2UgQnV0dG9uUm93UHJvcHMge1xuICBjaGlsZHJlbjogQ29tcG9uZW50Q2hpbGRyZW5cbiAgdmlzaWJsZT86IFNpZ25hbDxib29sZWFuPlxufVxuXG5leHBvcnQgZnVuY3Rpb24gQnV0dG9uUm93KHsgY2hpbGRyZW4sIHZpc2libGUgfTogQnV0dG9uUm93UHJvcHMpIHtcbiAgaWYgKHZpc2libGUgJiYgIXZpc2libGUudmFsdWUpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgcmV0dXJuIDxkaXY+e2NoaWxkcmVufTwvZGl2PlxufVxuIiwiaW1wb3J0IHR5cGUgeyBSZWFkb25seVNpZ25hbCwgU2lnbmFsIH0gZnJvbSAnQHByZWFjdC9zaWduYWxzJ1xuaW1wb3J0IHR5cGUgeyBDb21wb25lbnRDaGlsZHJlbiB9IGZyb20gJ3ByZWFjdCdcblxuaW50ZXJmYWNlIENvbmRpdGlvbmFsQ29udHJvbHNQcm9wcyB7XG4gIGNvbmRpdGlvbjogU2lnbmFsPGJvb2xlYW4+IHwgUmVhZG9ubHlTaWduYWw8Ym9vbGVhbj5cbiAgY2hpbGRyZW46IENvbXBvbmVudENoaWxkcmVuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBDb25kaXRpb25hbENvbnRyb2xzKHsgY29uZGl0aW9uLCBjaGlsZHJlbiB9OiBDb25kaXRpb25hbENvbnRyb2xzUHJvcHMpIHtcbiAgaWYgKCFjb25kaXRpb24udmFsdWUpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgcmV0dXJuIDxkaXYgc3R5bGU9e3sgbWFyZ2luTGVmdDogJzE2cHgnIH19PntjaGlsZHJlbn08L2Rpdj5cbn1cbiIsImltcG9ydCB7IHR5cGUgU2lnbmFsLCB1c2VDb21wdXRlZCB9IGZyb20gJ0BwcmVhY3Qvc2lnbmFscydcblxuaW50ZXJmYWNlIFNldHRpbmdCdXR0b25Qcm9wczxUPiB7XG4gIGxhYmVsOiBzdHJpbmdcbiAgc2V0dGluZzogU2lnbmFsPFQ+XG4gIG9wdGlvbnM6IHJlYWRvbmx5IFRbXVxufVxuXG5jb25zdCBidXR0b25TdHlsZSA9IHtcbiAgbWFyZ2luOiAnNHB4JyxcbiAgcGFkZGluZzogJzZweCAxMnB4JyxcbiAgYm9yZGVyOiAnMXB4IHNvbGlkIGN1cnJlbnRDb2xvcicsXG4gIGJvcmRlclJhZGl1czogJzRweCcsXG4gIGJhY2tncm91bmRDb2xvcjogJ3RyYW5zcGFyZW50JyxcbiAgY29sb3I6ICdpbmhlcml0JyxcbiAgY3Vyc29yOiAncG9pbnRlcicsXG4gIGZvbnRTaXplOiAnMTRweCcsXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTZXR0aW5nQnV0dG9uPFQ+KHsgbGFiZWwsIHNldHRpbmcsIG9wdGlvbnMgfTogU2V0dGluZ0J1dHRvblByb3BzPFQ+KSB7XG4gIC8vIFVzZSBjb21wdXRlZCB0byBjcmVhdGUgYSByZWFjdGl2ZSBkZXJpdmVkIHZhbHVlXG4gIGNvbnN0IGRpc3BsYXlUZXh0ID0gdXNlQ29tcHV0ZWQoKCkgPT4gYCR7bGFiZWx9OiAke3NldHRpbmcudmFsdWV9YClcblxuICBjb25zdCBoYW5kbGVDbGljayA9IChlOiBFdmVudCkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcblxuICAgIGNvbnN0IGN1cnJlbnRJbmRleCA9IG9wdGlvbnMuaW5kZXhPZihzZXR0aW5nLnZhbHVlKVxuICAgIGNvbnN0IG5leHRJbmRleCA9IChjdXJyZW50SW5kZXggKyAxKSAlIG9wdGlvbnMubGVuZ3RoXG4gICAgY29uc3QgbmV3VmFsdWUgPSBvcHRpb25zW25leHRJbmRleF1cbiAgICBzZXR0aW5nLnZhbHVlID0gbmV3VmFsdWVcbiAgfVxuXG4gIC8vIFJlbmRlciB0aGUgY29tcHV0ZWQgc2lnbmFsIGRpcmVjdGx5XG4gIHJldHVybiAoXG4gICAgPGJ1dHRvbiBvbkNsaWNrPXtoYW5kbGVDbGlja30gdHlwZT1cImJ1dHRvblwiIHN0eWxlPXtidXR0b25TdHlsZX0+XG4gICAgICB7ZGlzcGxheVRleHR9XG4gICAgPC9idXR0b24+XG4gIClcbn1cbiIsImltcG9ydCB7IGhhbmRsZVNwZWVjaENvbW1hbmQgfSBmcm9tICcuLi8uLi9hcHBsaWNhdGlvbi9oYW5kbGVycy9oYW5kbGVTcGVlY2hDb21tYW5kJ1xuaW1wb3J0IHsgU3BlZWNoQ29tbWFuZCB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy9jb21tYW5kcydcbmltcG9ydCB7IHVzZVNldHRpbmdzIH0gZnJvbSAnLi4vY29udGV4dHMvU2V0dGluZ3NDb250ZXh0J1xuaW1wb3J0IHsgQWN0aW9uQnV0dG9uIH0gZnJvbSAnLi9BY3Rpb25CdXR0b24nXG5pbXBvcnQgeyBCdXR0b25Sb3cgfSBmcm9tICcuL0J1dHRvblJvdydcbmltcG9ydCB7IFNldHRpbmdCdXR0b24gfSBmcm9tICcuL1NldHRpbmdCdXR0b24nXG5cbmNvbnN0IFNQRUFLX1JBVEVfT1BUSU9OUyA9IFswLjIsIDAuNSwgMC43LCAxLjAsIDEuMSwgMS4yXSBhcyBjb25zdFxuXG5leHBvcnQgZnVuY3Rpb24gU3BlZWNoQnV0dG9ucygpIHtcbiAgY29uc3Qgc2V0dGluZ3MgPSB1c2VTZXR0aW5ncygpXG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgPEJ1dHRvblJvdz5cbiAgICAgICAgPEFjdGlvbkJ1dHRvblxuICAgICAgICAgIGxhYmVsPVwi8J+UiiDimZQgc2lkZVwiXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlU3BlZWNoQ29tbWFuZChTcGVlY2hDb21tYW5kLldLLCBzZXR0aW5ncyl9XG4gICAgICAgIC8+XG4gICAgICAgIDxBY3Rpb25CdXR0b25cbiAgICAgICAgICBsYWJlbD1cIvCflIog4pmVIHNpZGVcIlxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVNwZWVjaENvbW1hbmQoU3BlZWNoQ29tbWFuZC5XUSwgc2V0dGluZ3MpfVxuICAgICAgICAvPlxuICAgICAgICA8QWN0aW9uQnV0dG9uXG4gICAgICAgICAgbGFiZWw9XCLwn5SKIOKZmiBzaWRlXCJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVTcGVlY2hDb21tYW5kKFNwZWVjaENvbW1hbmQuQkssIHNldHRpbmdzKX1cbiAgICAgICAgLz5cbiAgICAgICAgPEFjdGlvbkJ1dHRvblxuICAgICAgICAgIGxhYmVsPVwi8J+UiiDimZsgc2lkZVwiXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlU3BlZWNoQ29tbWFuZChTcGVlY2hDb21tYW5kLkJRLCBzZXR0aW5ncyl9XG4gICAgICAgIC8+XG4gICAgICA8L0J1dHRvblJvdz5cblxuICAgICAgPEJ1dHRvblJvdz5cbiAgICAgICAgPEFjdGlvbkJ1dHRvblxuICAgICAgICAgIGxhYmVsPVwi8J+UiiBhbGwgcGllY2VzXCJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVTcGVlY2hDb21tYW5kKFNwZWVjaENvbW1hbmQuQUxMLCBzZXR0aW5ncyl9XG4gICAgICAgIC8+XG4gICAgICAgIDxBY3Rpb25CdXR0b25cbiAgICAgICAgICBsYWJlbD1cIvCflIogdydzIHBpZWNlc1wiXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlU3BlZWNoQ29tbWFuZChTcGVlY2hDb21tYW5kLldISVRFLCBzZXR0aW5ncyl9XG4gICAgICAgIC8+XG4gICAgICAgIDxBY3Rpb25CdXR0b25cbiAgICAgICAgICBsYWJlbD1cIvCflIogYidzIHBpZWNlc1wiXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlU3BlZWNoQ29tbWFuZChTcGVlY2hDb21tYW5kLkJMQUNLLCBzZXR0aW5ncyl9XG4gICAgICAgIC8+XG4gICAgICA8L0J1dHRvblJvdz5cblxuICAgICAgPEJ1dHRvblJvdz5cbiAgICAgICAgPFNldHRpbmdCdXR0b24gbGFiZWw9XCLwn5SKIHJhdGVcIiBzZXR0aW5nPXtzZXR0aW5ncy5zcGVha1JhdGV9IG9wdGlvbnM9e1NQRUFLX1JBVEVfT1BUSU9OU30gLz5cbiAgICAgICAgPEFjdGlvbkJ1dHRvblxuICAgICAgICAgIGxhYmVsPVwi8J+UiiBTdG9wXCJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVTcGVlY2hDb21tYW5kKFNwZWVjaENvbW1hbmQuU1RPUCwgc2V0dGluZ3MpfVxuICAgICAgICAvPlxuICAgICAgPC9CdXR0b25Sb3c+XG4gICAgPC9kaXY+XG4gIClcbn1cbiIsImltcG9ydCB7IHR5cGUgU2lnbmFsLCB1c2VDb21wdXRlZCB9IGZyb20gJ0BwcmVhY3Qvc2lnbmFscydcbmltcG9ydCB7XG4gIEJMQUNLX1NFR01FTlRTX09QVElPTlMsXG4gIEJMQUNLX1NFR01FTlRTX1RJTUlOR19PUFRJT05TLFxuICBCTFVSX09QVElPTlMsXG4gIEZMQVNIX0RVUkFUSU9OX09QVElPTlMsXG4gIEZMQVNIX0lOVEVSVkFMX09QVElPTlMsXG4gIEhPVkVSX01PREVfT1BUSU9OUyxcbiAgUEFSQUxMQVhfT1BUSU9OUyxcbiAgUElFQ0VfU1RZTEVfT1BUSU9OUyxcbn0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL29wdGlvbnMnXG5pbXBvcnQgeyB1c2VTZXR0aW5ncyB9IGZyb20gJy4uL2NvbnRleHRzL1NldHRpbmdzQ29udGV4dCdcbmltcG9ydCB7IEFjdGlvbkJ1dHRvbiB9IGZyb20gJy4vQWN0aW9uQnV0dG9uJ1xuaW1wb3J0IHsgQnV0dG9uUm93IH0gZnJvbSAnLi9CdXR0b25Sb3cnXG5pbXBvcnQgeyBDb25kaXRpb25hbENvbnRyb2xzIH0gZnJvbSAnLi9Db25kaXRpb25hbENvbnRyb2xzJ1xuaW1wb3J0IHsgU2V0dGluZ0J1dHRvbiB9IGZyb20gJy4vU2V0dGluZ0J1dHRvbidcbmltcG9ydCB7IFNwZWVjaEJ1dHRvbnMgfSBmcm9tICcuL1NwZWVjaEJ1dHRvbnMnXG5cbmludGVyZmFjZSBDb250cm9sUGFuZWxQcm9wcyB7XG4gIGJvYXJkQ2hhbmdlZDogU2lnbmFsPG51bWJlcj5cbiAgb25Bbm5vdGF0ZTogKCkgPT4gdm9pZFxufVxuXG5jb25zdCBUT0dHTEVfT1BUSU9OUyA9IFtmYWxzZSwgdHJ1ZV0gYXMgY29uc3RcblxuZXhwb3J0IGZ1bmN0aW9uIENvbnRyb2xQYW5lbCh7IGJvYXJkQ2hhbmdlZCwgb25Bbm5vdGF0ZSB9OiBDb250cm9sUGFuZWxQcm9wcykge1xuICBjb25zdCBzZXR0aW5ncyA9IHVzZVNldHRpbmdzKClcblxuICAvLyBVc2UgYm9hcmRDaGFuZ2VkIHRvIGVuc3VyZSBjb21wb25lbnQgcmUtcmVuZGVycyB3aGVuIGJvYXJkIGNoYW5nZXNcbiAgYm9hcmRDaGFuZ2VkLnZhbHVlXG5cbiAgY29uc3QgYmxhY2tTZWdtZW50c0FjdGl2ZSA9IHVzZUNvbXB1dGVkKCgpID0+IHNldHRpbmdzLmJsYWNrU2VnbWVudHMudmFsdWUgIT09ICdub25lJylcblxuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICB7LyogU3BlZWNoIEJ1dHRvbnMgLSBBbHdheXMgVmlzaWJsZSAqL31cbiAgICAgIDxTcGVlY2hCdXR0b25zIC8+XG5cbiAgICAgIHsvKiBSb3c6IFBpZWNlcyBMaXN0ICovfVxuICAgICAgPEJ1dHRvblJvdz5cbiAgICAgICAgPFNldHRpbmdCdXR0b25cbiAgICAgICAgICBsYWJlbD1cIlBpZWNlcyBMaXN0XCJcbiAgICAgICAgICBzZXR0aW5nPXtzZXR0aW5ncy5waWVjZXNMaXN0RW5hYmxlZH1cbiAgICAgICAgICBvcHRpb25zPXtUT0dHTEVfT1BUSU9OU31cbiAgICAgICAgLz5cbiAgICAgIDwvQnV0dG9uUm93PlxuXG4gICAgICB7LyogUm93OiBBbm5vdGF0ZSBCb2FyZCAqL31cbiAgICAgIDxCdXR0b25Sb3c+XG4gICAgICAgIDxBY3Rpb25CdXR0b24gbGFiZWw9XCJBbm5vdGF0ZSBCb2FyZFwiIG9uQ2xpY2s9e29uQW5ub3RhdGV9IC8+XG4gICAgICA8L0J1dHRvblJvdz5cblxuICAgICAgey8qIFJvdzogRGl2aWRlcnMgYW5kIEN1c3RvbSBCb2FyZCAqL31cbiAgICAgIDxCdXR0b25Sb3c+XG4gICAgICAgIDxTZXR0aW5nQnV0dG9uXG4gICAgICAgICAgbGFiZWw9XCJEaXZpZGVyc1wiXG4gICAgICAgICAgc2V0dGluZz17c2V0dGluZ3MuZGl2aWRlcnNFbmFibGVkfVxuICAgICAgICAgIG9wdGlvbnM9e1RPR0dMRV9PUFRJT05TfVxuICAgICAgICAvPlxuICAgICAgICA8U2V0dGluZ0J1dHRvblxuICAgICAgICAgIGxhYmVsPVwiQ3VzdG9tIEJvYXJkXCJcbiAgICAgICAgICBzZXR0aW5nPXtzZXR0aW5ncy5jdXN0b21Cb2FyZEVuYWJsZWR9XG4gICAgICAgICAgb3B0aW9ucz17VE9HR0xFX09QVElPTlN9XG4gICAgICAgIC8+XG4gICAgICA8L0J1dHRvblJvdz5cblxuICAgICAgey8qIEN1c3RvbSBCb2FyZCBOZXN0ZWQgQ29udHJvbHMgKi99XG4gICAgICA8Q29uZGl0aW9uYWxDb250cm9scyBjb25kaXRpb249e3NldHRpbmdzLmN1c3RvbUJvYXJkRW5hYmxlZH0+XG4gICAgICAgIDxCdXR0b25Sb3c+XG4gICAgICAgICAgPFNldHRpbmdCdXR0b25cbiAgICAgICAgICAgIGxhYmVsPVwiT2JmdXNjYXRpb25zXCJcbiAgICAgICAgICAgIHNldHRpbmc9e3NldHRpbmdzLm9iZnVzY2F0aW9uc0VuYWJsZWR9XG4gICAgICAgICAgICBvcHRpb25zPXtUT0dHTEVfT1BUSU9OU31cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxTZXR0aW5nQnV0dG9uIGxhYmVsPVwiUGFyYWxsYXhcIiBzZXR0aW5nPXtzZXR0aW5ncy5wYXJhbGxheH0gb3B0aW9ucz17UEFSQUxMQVhfT1BUSU9OU30gLz5cbiAgICAgICAgICA8U2V0dGluZ0J1dHRvblxuICAgICAgICAgICAgbGFiZWw9XCJIb3ZlciBNb2RlXCJcbiAgICAgICAgICAgIHNldHRpbmc9e3NldHRpbmdzLmhvdmVyTW9kZX1cbiAgICAgICAgICAgIG9wdGlvbnM9e0hPVkVSX01PREVfT1BUSU9OU31cbiAgICAgICAgICAvPlxuICAgICAgICA8L0J1dHRvblJvdz5cblxuICAgICAgICB7LyogT2JmdXNjYXRpb25zIE5lc3RlZCBDb250cm9scyAqL31cbiAgICAgICAgPENvbmRpdGlvbmFsQ29udHJvbHMgY29uZGl0aW9uPXtzZXR0aW5ncy5vYmZ1c2NhdGlvbnNFbmFibGVkfT5cbiAgICAgICAgICA8QnV0dG9uUm93PlxuICAgICAgICAgICAgPFNldHRpbmdCdXR0b25cbiAgICAgICAgICAgICAgbGFiZWw9XCJQaWVjZSBTdHlsZVwiXG4gICAgICAgICAgICAgIHNldHRpbmc9e3NldHRpbmdzLnBpZWNlU3R5bGV9XG4gICAgICAgICAgICAgIG9wdGlvbnM9e1BJRUNFX1NUWUxFX09QVElPTlN9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPFNldHRpbmdCdXR0b24gbGFiZWw9XCJCbHVyXCIgc2V0dGluZz17c2V0dGluZ3MuYmx1cn0gb3B0aW9ucz17QkxVUl9PUFRJT05TfSAvPlxuICAgICAgICAgICAgPFNldHRpbmdCdXR0b25cbiAgICAgICAgICAgICAgbGFiZWw9XCJCbGFjayBTZWdtZW50c1wiXG4gICAgICAgICAgICAgIHNldHRpbmc9e3NldHRpbmdzLmJsYWNrU2VnbWVudHN9XG4gICAgICAgICAgICAgIG9wdGlvbnM9e0JMQUNLX1NFR01FTlRTX09QVElPTlN9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvQnV0dG9uUm93PlxuXG4gICAgICAgICAgey8qIEJsYWNrIFNlZ21lbnRzIFRpbWluZyAtIG9ubHkgd2hlbiBub3QgJ25vbmUnICovfVxuICAgICAgICAgIDxDb25kaXRpb25hbENvbnRyb2xzIGNvbmRpdGlvbj17YmxhY2tTZWdtZW50c0FjdGl2ZX0+XG4gICAgICAgICAgICA8QnV0dG9uUm93PlxuICAgICAgICAgICAgICA8U2V0dGluZ0J1dHRvblxuICAgICAgICAgICAgICAgIGxhYmVsPVwiVGltaW5nXCJcbiAgICAgICAgICAgICAgICBzZXR0aW5nPXtzZXR0aW5ncy5ibGFja1NlZ21lbnRzVGltaW5nfVxuICAgICAgICAgICAgICAgIG9wdGlvbnM9e0JMQUNLX1NFR01FTlRTX1RJTUlOR19PUFRJT05TfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9CdXR0b25Sb3c+XG4gICAgICAgICAgPC9Db25kaXRpb25hbENvbnRyb2xzPlxuICAgICAgICA8L0NvbmRpdGlvbmFsQ29udHJvbHM+XG4gICAgICA8L0NvbmRpdGlvbmFsQ29udHJvbHM+XG5cbiAgICAgIHsvKiBSb3c6IEZsYXNoIE1vZGUgKi99XG4gICAgICA8QnV0dG9uUm93PlxuICAgICAgICA8U2V0dGluZ0J1dHRvblxuICAgICAgICAgIGxhYmVsPVwiRmxhc2ggTW9kZVwiXG4gICAgICAgICAgc2V0dGluZz17c2V0dGluZ3MuZmxhc2hNb2RlRW5hYmxlZH1cbiAgICAgICAgICBvcHRpb25zPXtUT0dHTEVfT1BUSU9OU31cbiAgICAgICAgLz5cbiAgICAgIDwvQnV0dG9uUm93PlxuXG4gICAgICB7LyogRmxhc2ggTW9kZSBOZXN0ZWQgQ29udHJvbHMgKi99XG4gICAgICA8Q29uZGl0aW9uYWxDb250cm9scyBjb25kaXRpb249e3NldHRpbmdzLmZsYXNoTW9kZUVuYWJsZWR9PlxuICAgICAgICA8QnV0dG9uUm93PlxuICAgICAgICAgIDxTZXR0aW5nQnV0dG9uXG4gICAgICAgICAgICBsYWJlbD1cIkZsYXNoIER1cmF0aW9uXCJcbiAgICAgICAgICAgIHNldHRpbmc9e3NldHRpbmdzLmZsYXNoRHVyYXRpb259XG4gICAgICAgICAgICBvcHRpb25zPXtGTEFTSF9EVVJBVElPTl9PUFRJT05TfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPFNldHRpbmdCdXR0b25cbiAgICAgICAgICAgIGxhYmVsPVwiRmxhc2ggSW50ZXJ2YWxcIlxuICAgICAgICAgICAgc2V0dGluZz17c2V0dGluZ3MuZmxhc2hJbnRlcnZhbH1cbiAgICAgICAgICAgIG9wdGlvbnM9e0ZMQVNIX0lOVEVSVkFMX09QVElPTlN9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9CdXR0b25Sb3c+XG4gICAgICA8L0NvbmRpdGlvbmFsQ29udHJvbHM+XG4gICAgPC9kaXY+XG4gIClcbn1cbiIsImltcG9ydCB0eXBlIHsgU2lnbmFsIH0gZnJvbSAnQHByZWFjdC9zaWduYWxzLWNvcmUnXG5pbXBvcnQgeyByZW5kZXIgfSBmcm9tICdwcmVhY3QnXG5pbXBvcnQgdHlwZSB7IFNldHRpbmdzU3RvcmUgfSBmcm9tICcuLi8uLi9hcHBsaWNhdGlvbi9zZXR0aW5ncy9zZXR0aW5nc1N0b3JlJ1xuaW1wb3J0IHsgU2V0dGluZ3NQcm92aWRlciB9IGZyb20gJy4uL2NvbnRleHRzL1NldHRpbmdzQ29udGV4dCdcbmltcG9ydCB7IENvbnRyb2xQYW5lbCB9IGZyb20gJy4vQ29udHJvbFBhbmVsJ1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUm9vdChcbiAgYm9hcmRDaGFuZ2VkOiBTaWduYWw8bnVtYmVyPixcbiAgbW91bnRQb2ludDogSFRNTEVsZW1lbnQsXG4gIHNldHRpbmdzOiBTZXR0aW5nc1N0b3JlLFxuICBvbkFubm90YXRlOiAoKSA9PiB2b2lkXG4pOiB2b2lkIHtcbiAgcmVuZGVyKFxuICAgIDxTZXR0aW5nc1Byb3ZpZGVyIHNldHRpbmdzPXtzZXR0aW5nc30+XG4gICAgICA8Q29udHJvbFBhbmVsIGJvYXJkQ2hhbmdlZD17Ym9hcmRDaGFuZ2VkfSBvbkFubm90YXRlPXtvbkFubm90YXRlfSAvPlxuICAgIDwvU2V0dGluZ3NQcm92aWRlcj4sXG4gICAgbW91bnRQb2ludFxuICApXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXN0cm95Um9vdChtb3VudFBvaW50OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICByZW5kZXIobnVsbCwgbW91bnRQb2ludClcbn1cbiIsImltcG9ydCB7IHNpZ25hbCB9IGZyb20gJ0BwcmVhY3Qvc2lnbmFscy1jb3JlJ1xuaW1wb3J0IHsgc2V0dXBCbGFja1NlZ21lbnRzRWZmZWN0IH0gZnJvbSAnLi9hcHBsaWNhdGlvbi9lZmZlY3RzL29uQmxhY2tTZWdtZW50cydcbmltcG9ydCB7IHNldHVwQmx1ckVmZmVjdCB9IGZyb20gJy4vYXBwbGljYXRpb24vZWZmZWN0cy9vbkJsdXInXG5pbXBvcnQgeyBzZXR1cEN1c3RvbUJvYXJkRWZmZWN0IH0gZnJvbSAnLi9hcHBsaWNhdGlvbi9lZmZlY3RzL29uQ3VzdG9tQm9hcmQnXG5pbXBvcnQgeyBzZXR1cERpdmlkZXJzRWZmZWN0IH0gZnJvbSAnLi9hcHBsaWNhdGlvbi9lZmZlY3RzL29uRGl2aWRlcnMnXG5pbXBvcnQgeyBzZXR1cEZsYXNoRWZmZWN0IH0gZnJvbSAnLi9hcHBsaWNhdGlvbi9lZmZlY3RzL29uRmxhc2gnXG5pbXBvcnQgeyBzZXR1cEhvdmVyTW9kZUVmZmVjdCB9IGZyb20gJy4vYXBwbGljYXRpb24vZWZmZWN0cy9vbkhvdmVyTW9kZSdcbmltcG9ydCB7IHNldHVwUGFyYWxsYXhFZmZlY3QgfSBmcm9tICcuL2FwcGxpY2F0aW9uL2VmZmVjdHMvb25QYXJhbGxheCdcbmltcG9ydCB7IHNldHVwUGllY2VTdHlsZUVmZmVjdCB9IGZyb20gJy4vYXBwbGljYXRpb24vZWZmZWN0cy9vblBpZWNlU3R5bGUnXG5pbXBvcnQgeyBoYW5kbGVBbm5vdGF0ZSB9IGZyb20gJy4vYXBwbGljYXRpb24vaGFuZGxlcnMvaGFuZGxlQW5ub3RhdGUnXG5pbXBvcnQgeyBjcmVhdGVCbGFja1NlZ21lbnRzU3RhdGUgfSBmcm9tICcuL2FwcGxpY2F0aW9uL2hhbmRsZXJzL2hhbmRsZUJsYWNrU2VnbWVudHMnXG5pbXBvcnQgeyBjcmVhdGVDdXN0b21Cb2FyZFN0YXRlIH0gZnJvbSAnLi9hcHBsaWNhdGlvbi9oYW5kbGVycy9oYW5kbGVDdXN0b21Cb2FyZCdcbmltcG9ydCB7IGNyZWF0ZUZsYXNoTG9vcFN0YXRlIH0gZnJvbSAnLi9hcHBsaWNhdGlvbi9oYW5kbGVycy9oYW5kbGVGbGFzaCdcbmltcG9ydCB7IHNldHVwS2V5Ym9hcmRDb21tYW5kcywgdGVhcmRvd25LZXlib2FyZENvbW1hbmRzIH0gZnJvbSAnLi9hcHBsaWNhdGlvbi9pbnB1dC9rZXlib2FyZElucHV0J1xuaW1wb3J0IHtcbiAgY3JlYXRlQm9hcmRPYnNlcnZlcixcbiAgc3RhcnRCb2FyZE9ic2VydmVyLFxuICBzdG9wQm9hcmRPYnNlcnZlcixcbn0gZnJvbSAnLi9hcHBsaWNhdGlvbi9vYnNlcnZlcnMvb2JzZXJ2ZXJTdGF0ZSdcbmltcG9ydCB7XG4gIGNyZWF0ZVNldHRpbmdzU3RvcmUsXG4gIGxvYWRTZXR0aW5ncyxcbiAgc2V0dXBBdXRvU2F2ZSxcbn0gZnJvbSAnLi9hcHBsaWNhdGlvbi9zZXR0aW5ncy9zZXR0aW5nc1N0b3JlJ1xuaW1wb3J0IHsgRG9tU2VsZWN0b3IgfSBmcm9tICcuL2NvbnN0YW50cy9kb20nXG5pbXBvcnQgeyBhcHBlbmRDaGlsZCwgY3JlYXRlRGl2LCBxdWVyeVNlbGVjdG9yLCB3YWl0Rm9yRWxlbWVudCB9IGZyb20gJy4vcGxhdGZvcm0vZG9tJ1xuaW1wb3J0IHsgY3JlYXRlRHJhd2luZ3MzRFN0YXRlIH0gZnJvbSAnLi9wcmVzZW50YXRpb24vM2QvZHJhd2luZ3MzZCdcbmltcG9ydCB7IGNyZWF0ZUhvdmVyQW5pbWF0aW9uU3RhdGUsIHN0b3BIb3ZlckFuaW1hdGlvbiB9IGZyb20gJy4vcHJlc2VudGF0aW9uLzNkL2hvdmVyQW5pbWF0aW9uJ1xuaW1wb3J0IHsgY3JlYXRlUm9vdCwgZGVzdHJveVJvb3QgfSBmcm9tICcuL3ByZXNlbnRhdGlvbi9jb21wb25lbnRzL3Jvb3QnXG5pbXBvcnQge1xuICBjcmVhdGVBbm5vdGF0aW9ucyxcbiAgZGVzdHJveUFubm90YXRpb25zLFxufSBmcm9tICcuL3ByZXNlbnRhdGlvbi9ub24tcHJlYWN0LWNvbXBvbmVudHMvYW5ub3RhdGlvbnMnXG5pbXBvcnQgeyBjcmVhdGVEaXZpZGVycywgZGVzdHJveURpdmlkZXJzIH0gZnJvbSAnLi9wcmVzZW50YXRpb24vbm9uLXByZWFjdC1jb21wb25lbnRzL2RpdmlkZXJzJ1xuaW1wb3J0IHsgY3JlYXRlRmxhc2hPdmVybGF5LCBkZXN0cm95Rmxhc2hPdmVybGF5IH0gZnJvbSAnLi9wcmVzZW50YXRpb24vbm9uLXByZWFjdC1jb21wb25lbnRzL2ZsYXNoJ1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaW5pdCgpIHtcbiAgLy8gV2FpdCBmb3IgbGljaGVzcyB0byBsb2FkIHRoZSBib2FyZFxuICBhd2FpdCB3YWl0Rm9yRWxlbWVudChEb21TZWxlY3Rvci5LRVlCT0FSRF9NT1ZFKVxuXG4gIC8vIEluaXRpYWxpemUgc2V0dGluZ3NcbiAgY29uc3Qgc2V0dGluZ3MgPSBjcmVhdGVTZXR0aW5nc1N0b3JlKClcbiAgbG9hZFNldHRpbmdzKHNldHRpbmdzKVxuICBzZXR1cEF1dG9TYXZlKHNldHRpbmdzKVxuXG4gIC8vIENyZWF0ZSBzaGFyZWQgYm9hcmQgY2hhbmdlIHNpZ25hbFxuICBjb25zdCBib2FyZENoYW5nZWQgPSBzaWduYWwoMClcblxuICAvLyBDcmVhdGUgRE9NIHN0YXRlXG4gIGNvbnN0IGZsYXNoU3RhdGUgPSBjcmVhdGVGbGFzaE92ZXJsYXkoKVxuICBjb25zdCBmbGFzaExvb3BTdGF0ZSA9IGNyZWF0ZUZsYXNoTG9vcFN0YXRlKClcbiAgY29uc3QgZGl2aWRlcnNTdGF0ZSA9IGNyZWF0ZURpdmlkZXJzKClcbiAgY29uc3QgYW5ub3RhdGlvbnNTdGF0ZSA9IGNyZWF0ZUFubm90YXRpb25zKClcbiAgY29uc3QgYm9hcmRPYnNlcnZlclN0YXRlID0gY3JlYXRlQm9hcmRPYnNlcnZlcihib2FyZENoYW5nZWQpXG5cbiAgLy8gU3RhcnQgb2JzZXJ2ZXJcbiAgc3RhcnRCb2FyZE9ic2VydmVyKGJvYXJkT2JzZXJ2ZXJTdGF0ZSlcblxuICAvLyBTZXQgdXAgZWZmZWN0c1xuICBjb25zdCBjbGVhbnVwRGl2aWRlcnMgPSBzZXR1cERpdmlkZXJzRWZmZWN0KGRpdmlkZXJzU3RhdGUsIHNldHRpbmdzLCBib2FyZENoYW5nZWQpXG4gIGNvbnN0IGNsZWFudXBGbGFzaCA9IHNldHVwRmxhc2hFZmZlY3QoZmxhc2hTdGF0ZSwgZmxhc2hMb29wU3RhdGUsIHNldHRpbmdzLCBib2FyZENoYW5nZWQpXG4gIGNvbnN0IGNsZWFudXBCbHVyID0gc2V0dXBCbHVyRWZmZWN0KHNldHRpbmdzKVxuICBjb25zdCBjdXN0b21Cb2FyZFN0YXRlID0gY3JlYXRlQ3VzdG9tQm9hcmRTdGF0ZSgpXG4gIGNvbnN0IGNsZWFudXBDdXN0b21Cb2FyZCA9IHNldHVwQ3VzdG9tQm9hcmRFZmZlY3QoY3VzdG9tQm9hcmRTdGF0ZSwgc2V0dGluZ3MsIGJvYXJkQ2hhbmdlZClcbiAgY29uc3QgY2xlYW51cFBhcmFsbGF4ID0gc2V0dXBQYXJhbGxheEVmZmVjdChjdXN0b21Cb2FyZFN0YXRlLCBzZXR0aW5ncylcbiAgY29uc3QgaG92ZXJTdGF0ZSA9IGNyZWF0ZUhvdmVyQW5pbWF0aW9uU3RhdGUoKVxuICBjb25zdCBjbGVhbnVwSG92ZXIgPSBzZXR1cEhvdmVyTW9kZUVmZmVjdChjdXN0b21Cb2FyZFN0YXRlLCBob3ZlclN0YXRlLCBzZXR0aW5ncylcbiAgY29uc3QgY2xlYW51cFBpZWNlU3R5bGUgPSBzZXR1cFBpZWNlU3R5bGVFZmZlY3QoY3VzdG9tQm9hcmRTdGF0ZSwgc2V0dGluZ3MpXG4gIGNvbnN0IGJsYWNrU2VnbWVudHNTdGF0ZSA9IGNyZWF0ZUJsYWNrU2VnbWVudHNTdGF0ZSgpXG4gIGNvbnN0IGNsZWFudXBCbGFja1NlZ21lbnRzID0gc2V0dXBCbGFja1NlZ21lbnRzRWZmZWN0KFxuICAgIGJsYWNrU2VnbWVudHNTdGF0ZSxcbiAgICBjdXN0b21Cb2FyZFN0YXRlLFxuICAgIHNldHRpbmdzXG4gIClcblxuICAvLyBDcmVhdGUgM0QgZHJhd2luZ3Mgc3RhdGVcbiAgY29uc3QgZHJhd2luZ3MzRFN0YXRlID0gY3JlYXRlRHJhd2luZ3MzRFN0YXRlKClcblxuICAvLyBTZXQgdXAgY29tbWFuZHNcbiAgc2V0dXBLZXlib2FyZENvbW1hbmRzKHNldHRpbmdzLCBhbm5vdGF0aW9uc1N0YXRlLCBjdXN0b21Cb2FyZFN0YXRlLCBkcmF3aW5nczNEU3RhdGUpXG5cbiAgLy8gTW91bnQgUHJlYWN0IFVJXG4gIGNvbnN0IG1vdW50UG9pbnQgPSBjcmVhdGVEaXYoKVxuICBjb25zdCBrZXlib2FyZE1vdmUgPSBxdWVyeVNlbGVjdG9yKERvbVNlbGVjdG9yLktFWUJPQVJEX01PVkUpXG4gIGlmIChrZXlib2FyZE1vdmUpIHtcbiAgICBhcHBlbmRDaGlsZChrZXlib2FyZE1vdmUsIG1vdW50UG9pbnQpXG4gIH1cblxuICBjcmVhdGVSb290KGJvYXJkQ2hhbmdlZCwgbW91bnRQb2ludCwgc2V0dGluZ3MsIGhhbmRsZUFubm90YXRlKVxuXG4gIC8vIFJldHVybiBjbGVhbnVwIGZ1bmN0aW9uXG4gIHJldHVybiAoKSA9PiB7XG4gICAgY2xlYW51cERpdmlkZXJzKClcbiAgICBjbGVhbnVwRmxhc2goKVxuICAgIGNsZWFudXBCbHVyKClcbiAgICBjbGVhbnVwQ3VzdG9tQm9hcmQoKVxuICAgIGNsZWFudXBQYXJhbGxheCgpXG4gICAgY2xlYW51cEhvdmVyKClcbiAgICBjbGVhbnVwUGllY2VTdHlsZSgpXG4gICAgY2xlYW51cEJsYWNrU2VnbWVudHMoKVxuICAgIHN0b3BIb3ZlckFuaW1hdGlvbihob3ZlclN0YXRlKVxuICAgIHN0b3BCb2FyZE9ic2VydmVyKGJvYXJkT2JzZXJ2ZXJTdGF0ZSlcbiAgICBkZXN0cm95Rmxhc2hPdmVybGF5KGZsYXNoU3RhdGUpXG4gICAgZGVzdHJveURpdmlkZXJzKGRpdmlkZXJzU3RhdGUpXG4gICAgZGVzdHJveUFubm90YXRpb25zKGFubm90YXRpb25zU3RhdGUpXG4gICAgdGVhcmRvd25LZXlib2FyZENvbW1hbmRzKClcbiAgICBkZXN0cm95Um9vdChtb3VudFBvaW50KVxuICB9XG59XG4iLCJpbXBvcnQgeyBpbml0IH0gZnJvbSAnLi9pbml0J1xuXG4vLyBTdGFydCB0aGUgYXBwbGljYXRpb25cbmluaXQoKS5jYXRjaChjb25zb2xlLmVycm9yKVxuIl0sInhfZ29vZ2xlX2lnbm9yZUxpc3QiOlswLDUxLDUyLDUzLDU1XSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQUFBLElBQUlBLE1BQUUsT0FBTyxJQUFJLGdCQUFnQjtDQUFFLFNBQVNDLE1BQUc7RUFBQyxJQUFHLEVBQUVDLE1BQUUsSUFBRztHQUFDLElBQUksR0FBRSxJQUFFLENBQUM7R0FBRSxDQUFDLFdBQVU7SUFBQyxJQUFJLElBQUVDO0lBQUUsTUFBRSxLQUFLO0lBQUUsT0FBTSxLQUFLLE1BQUksR0FBRTtLQUFDLElBQUcsRUFBRSxFQUFFLE1BQUksRUFBRSxHQUFFLEVBQUUsRUFBRSxJQUFFLEVBQUU7S0FBRSxJQUFFLEVBQUU7SUFBQztHQUFDLEdBQUU7R0FBRSxPQUFNLEtBQUssTUFBSUMsS0FBRTtJQUFDLElBQUksSUFBRUE7SUFBRSxNQUFFLEtBQUs7SUFBRTtJQUFJLE9BQU0sS0FBSyxNQUFJLEdBQUU7S0FBQyxJQUFJLElBQUUsRUFBRTtLQUFFLEVBQUUsSUFBRSxLQUFLO0tBQUUsRUFBRSxLQUFHO0tBQUcsSUFBRyxFQUFFLElBQUUsRUFBRSxNQUFJQyxJQUFFLENBQUMsR0FBRSxJQUFHO01BQUMsRUFBRSxFQUFFO0tBQUMsU0FBTyxHQUFFO01BQUMsSUFBRyxDQUFDLEdBQUU7T0FBQyxJQUFFO09BQUUsSUFBRSxDQUFDO01BQUM7S0FBQztLQUFDLElBQUU7SUFBQztHQUFDO0dBQUMsTUFBRTtHQUFFO0dBQUksSUFBRyxHQUFFLE1BQU07RUFBQyxPQUFNO0NBQUc7Q0FBdUUsSUFBSUMsTUFBRSxLQUFLO0NBQUUsU0FBU0MsSUFBRSxHQUFFO0VBQUMsSUFBSSxJQUFFRDtFQUFFLE1BQUUsS0FBSztFQUFFLElBQUc7R0FBQyxPQUFPLEVBQUU7RUFBQyxVQUFRO0dBQUMsTUFBRTtFQUFDO0NBQUM7Q0FBQyxJQUFJRSxLQUFFSixNQUFFLEtBQUssR0FBRUYsTUFBRSxHQUFFTyxNQUFFLEdBQU1FLE1BQUUsR0FBRVIsTUFBRSxLQUFLLEdBQUVTLE1BQUU7Q0FBRSxTQUFTQyxJQUFFLEdBQUU7RUFBQyxJQUFHLEtBQUssTUFBSVAsS0FBRTtHQUFDLElBQUksSUFBRSxFQUFFO0dBQUUsSUFBRyxLQUFLLE1BQUksS0FBRyxFQUFFLE1BQUlBLEtBQUU7SUFBQyxJQUFFO0tBQUMsR0FBRTtLQUFFLEdBQUU7S0FBRSxHQUFFQSxJQUFFO0tBQUUsR0FBRSxLQUFLO0tBQUUsR0FBRUE7S0FBRSxHQUFFLEtBQUs7S0FBRSxHQUFFLEtBQUs7S0FBRSxHQUFFO0lBQUM7SUFBRSxJQUFHLEtBQUssTUFBSUEsSUFBRSxHQUFFLElBQUUsRUFBRSxJQUFFO0lBQUUsSUFBRSxJQUFFO0lBQUUsRUFBRSxJQUFFO0lBQUUsSUFBRyxLQUFHQSxJQUFFLEdBQUUsRUFBRSxFQUFFLENBQUM7SUFBRSxPQUFPO0dBQUMsT0FBTSxJQUFHLE9BQUssRUFBRSxHQUFFO0lBQUMsRUFBRSxJQUFFO0lBQUUsSUFBRyxLQUFLLE1BQUksRUFBRSxHQUFFO0tBQUMsRUFBRSxFQUFFLElBQUUsRUFBRTtLQUFFLElBQUcsS0FBSyxNQUFJLEVBQUUsR0FBRSxFQUFFLEVBQUUsSUFBRSxFQUFFO0tBQUUsRUFBRSxJQUFFQSxJQUFFO0tBQUUsRUFBRSxJQUFFLEtBQUs7S0FBRSxJQUFFLEVBQUUsSUFBRTtLQUFFLElBQUUsSUFBRTtJQUFDO0lBQUMsT0FBTztHQUFDO0VBQUM7Q0FBQztDQUFDLFNBQVNRLElBQUUsR0FBRSxHQUFFO0VBQUMsS0FBSyxJQUFFO0VBQUUsS0FBSyxJQUFFO0VBQUUsS0FBSyxJQUFFLEtBQUs7RUFBRSxLQUFLLElBQUUsS0FBSztFQUFFLEtBQUssSUFBRTtFQUFFLEtBQUssSUFBRSxRQUFNLElBQUUsS0FBSyxJQUFFLEVBQUU7RUFBUSxLQUFLLElBQUUsUUFBTSxJQUFFLEtBQUssSUFBRSxFQUFFO0VBQVUsS0FBSyxPQUFLLFFBQU0sSUFBRSxLQUFLLElBQUUsRUFBRTtDQUFJO0NBQUMsSUFBRSxVQUFVLFFBQU1kO0NBQUUsSUFBRSxVQUFVLElBQUUsV0FBVTtFQUFDLE9BQU0sQ0FBQztDQUFDO0NBQUUsSUFBRSxVQUFVLElBQUUsU0FBUyxHQUFFO0VBQUMsSUFBSSxJQUFFLE1BQUssSUFBRSxLQUFLO0VBQUUsSUFBRyxNQUFJLEtBQUcsS0FBSyxNQUFJLEVBQUUsR0FBRTtHQUFDLEVBQUUsSUFBRTtHQUFFLEtBQUssSUFBRTtHQUFFLElBQUcsS0FBSyxNQUFJLEdBQUUsRUFBRSxJQUFFO1FBQU8sSUFBRSxXQUFVO0lBQUMsSUFBSTtJQUFFLFNBQU8sSUFBRSxFQUFFLE1BQUksRUFBRSxLQUFLLENBQUM7R0FBQyxDQUFDO0VBQUM7Q0FBQztDQUFFLElBQUUsVUFBVSxJQUFFLFNBQVMsR0FBRTtFQUFDLElBQUksSUFBRTtFQUFLLElBQUcsS0FBSyxNQUFJLEtBQUssR0FBRTtHQUFDLElBQUksSUFBRSxFQUFFLEdBQUUsSUFBRSxFQUFFO0dBQUUsSUFBRyxLQUFLLE1BQUksR0FBRTtJQUFDLEVBQUUsSUFBRTtJQUFFLEVBQUUsSUFBRSxLQUFLO0dBQUM7R0FBQyxJQUFHLEtBQUssTUFBSSxHQUFFO0lBQUMsRUFBRSxJQUFFO0lBQUUsRUFBRSxJQUFFLEtBQUs7R0FBQztHQUFDLElBQUcsTUFBSSxLQUFLLEdBQUU7SUFBQyxLQUFLLElBQUU7SUFBRSxJQUFHLEtBQUssTUFBSSxHQUFFLElBQUUsV0FBVTtLQUFDLElBQUk7S0FBRSxTQUFPLElBQUUsRUFBRSxNQUFJLEVBQUUsS0FBSyxDQUFDO0lBQUMsQ0FBQztHQUFDO0VBQUM7Q0FBQztDQUFFLElBQUUsVUFBVSxZQUFVLFNBQVMsR0FBRTtFQUFDLElBQUksSUFBRTtFQUFLLE9BQU9lLElBQUUsV0FBVTtHQUFDLElBQUksSUFBRSxFQUFFLE9BQU0sSUFBRVQ7R0FBRSxNQUFFLEtBQUs7R0FBRSxJQUFHO0lBQUMsRUFBRSxDQUFDO0dBQUMsVUFBUTtJQUFDLE1BQUU7R0FBQztFQUFDLEdBQUUsRUFBQyxNQUFLLE1BQUssQ0FBQztDQUFDO0NBQUUsSUFBRSxVQUFVLFVBQVEsV0FBVTtFQUFDLE9BQU8sS0FBSztDQUFLO0NBQUUsSUFBRSxVQUFVLFdBQVMsV0FBVTtFQUFDLE9BQU8sS0FBSyxRQUFNO0NBQUU7Q0FBRSxJQUFFLFVBQVUsU0FBTyxXQUFVO0VBQUMsT0FBTyxLQUFLO0NBQUs7Q0FBRSxJQUFFLFVBQVUsT0FBSyxXQUFVO0VBQUMsSUFBSSxJQUFFO0VBQUssT0FBT0MsSUFBRSxXQUFVO0dBQUMsT0FBTyxFQUFFO0VBQUssQ0FBQztDQUFDO0NBQUUsT0FBTyxlQUFlTyxJQUFFLFdBQVUsU0FBUTtFQUFDLEtBQUksV0FBVTtHQUFDLElBQUksSUFBRUQsSUFBRSxJQUFJO0dBQUUsSUFBRyxLQUFLLE1BQUksR0FBRSxFQUFFLElBQUUsS0FBSztHQUFFLE9BQU8sS0FBSztFQUFDO0VBQUUsS0FBSSxTQUFTLEdBQUU7R0FBQyxJQUFHLE1BQUksS0FBSyxHQUFFO0lBQUMsSUFBR0osTUFBRSxLQUFJLE1BQU0sSUFBSSxNQUFNLGdCQUFnQjtJQUFFLENBQUMsU0FBUyxHQUFFO0tBQUMsSUFBRyxNQUFJUCxPQUFHLE1BQUlPO1VBQUssRUFBRSxNQUFJRSxLQUFFO09BQUMsRUFBRSxJQUFFQTtPQUFFLE1BQUU7UUFBQyxHQUFFO1FBQUUsR0FBRSxFQUFFO1FBQUUsR0FBRSxFQUFFO1FBQUUsR0FBRVI7T0FBQztNQUFDOztJQUFDLEdBQUUsSUFBSTtJQUFFLEtBQUssSUFBRTtJQUFFLEtBQUs7SUFBSTtJQUFJO0lBQUksSUFBRztLQUFDLEtBQUksSUFBSSxJQUFFLEtBQUssR0FBRSxLQUFLLE1BQUksR0FBRSxJQUFFLEVBQUUsR0FBRSxFQUFFLEVBQUUsRUFBRTtJQUFDLFVBQVE7S0FBQyxJQUFFO0lBQUM7R0FBQztFQUFDO0NBQUMsQ0FBQztDQUFFLFNBQVNhLElBQUUsR0FBRSxHQUFFO0VBQUMsT0FBTyxJQUFJRixJQUFFLEdBQUUsQ0FBQztDQUFDO0NBQUMsU0FBU1QsSUFBRSxHQUFFO0VBQUMsS0FBSSxJQUFJLElBQUUsRUFBRSxHQUFFLEtBQUssTUFBSSxHQUFFLElBQUUsRUFBRSxHQUFFLElBQUcsRUFBRSxFQUFFLE1BQUksRUFBRSxLQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsS0FBRyxFQUFFLEVBQUUsTUFBSSxFQUFFLEdBQUUsT0FBTSxDQUFDO0VBQUUsT0FBTSxDQUFDO0NBQUM7Q0FBQyxTQUFTWSxJQUFFLEdBQUU7RUFBQyxLQUFJLElBQUksSUFBRSxFQUFFLEdBQUUsS0FBSyxNQUFJLEdBQUUsSUFBRSxFQUFFLEdBQUU7R0FBQyxJQUFJLElBQUUsRUFBRSxFQUFFO0dBQUUsSUFBRyxLQUFLLE1BQUksR0FBRSxFQUFFLElBQUU7R0FBRSxFQUFFLEVBQUUsSUFBRTtHQUFFLEVBQUUsSUFBRTtHQUFHLElBQUcsS0FBSyxNQUFJLEVBQUUsR0FBRTtJQUFDLEVBQUUsSUFBRTtJQUFFO0dBQUs7RUFBQztDQUFDO0NBQUMsU0FBU0MsSUFBRSxHQUFFO0VBQUMsSUFBSSxJQUFFLEVBQUUsR0FBRSxJQUFFLEtBQUs7RUFBRSxPQUFNLEtBQUssTUFBSSxHQUFFO0dBQUMsSUFBSSxJQUFFLEVBQUU7R0FBRSxJQUFHLE9BQUssRUFBRSxHQUFFO0lBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUFFLElBQUcsS0FBSyxNQUFJLEdBQUUsRUFBRSxJQUFFLEVBQUU7SUFBRSxJQUFHLEtBQUssTUFBSSxFQUFFLEdBQUUsRUFBRSxFQUFFLElBQUU7R0FBQyxPQUFNLElBQUU7R0FBRSxFQUFFLEVBQUUsSUFBRSxFQUFFO0dBQUUsSUFBRyxLQUFLLE1BQUksRUFBRSxHQUFFLEVBQUUsSUFBRSxLQUFLO0dBQUUsSUFBRTtFQUFDO0VBQUMsRUFBRSxJQUFFO0NBQUM7Q0FBQyxTQUFTQyxJQUFFLEdBQUUsR0FBRTtFQUFDLElBQUUsS0FBSyxNQUFLLEtBQUssQ0FBQztFQUFFLEtBQUssSUFBRTtFQUFFLEtBQUssSUFBRSxLQUFLO0VBQUUsS0FBSyxJQUFFUCxNQUFFO0VBQUUsS0FBSyxJQUFFO0VBQUUsS0FBSyxJQUFFLFFBQU0sSUFBRSxLQUFLLElBQUUsRUFBRTtFQUFRLEtBQUssSUFBRSxRQUFNLElBQUUsS0FBSyxJQUFFLEVBQUU7RUFBVSxLQUFLLE9BQUssUUFBTSxJQUFFLEtBQUssSUFBRSxFQUFFO0NBQUk7Q0FBQyxJQUFFLFlBQVUsSUFBSUUsSUFBQUE7Q0FBRSxJQUFFLFVBQVUsSUFBRSxXQUFVO0VBQUMsS0FBSyxLQUFHO0VBQUcsSUFBRyxJQUFFLEtBQUssR0FBRSxPQUFNLENBQUM7RUFBRSxJQUFHLE9BQUssS0FBRyxLQUFLLElBQUcsT0FBTSxDQUFDO0VBQUUsS0FBSyxLQUFHO0VBQUcsSUFBRyxLQUFLLE1BQUlGLEtBQUUsT0FBTSxDQUFDO0VBQUUsS0FBSyxJQUFFQTtFQUFFLEtBQUssS0FBRztFQUFFLElBQUcsS0FBSyxJQUFFLEtBQUcsQ0FBQ1AsSUFBRSxJQUFJLEdBQUU7R0FBQyxLQUFLLEtBQUc7R0FBRyxPQUFNLENBQUM7RUFBQztFQUFDLElBQUksSUFBRUM7RUFBRSxJQUFHO0dBQUMsSUFBRSxJQUFJO0dBQUUsTUFBRTtHQUFLLElBQUksSUFBRSxLQUFLLEVBQUU7R0FBRSxJQUFHLEtBQUcsS0FBSyxLQUFHLEtBQUssTUFBSSxLQUFHLE1BQUksS0FBSyxHQUFFO0lBQUMsS0FBSyxJQUFFO0lBQUUsS0FBSyxLQUFHO0lBQUksS0FBSztHQUFHO0VBQUMsU0FBTyxHQUFFO0dBQUMsS0FBSyxJQUFFO0dBQUUsS0FBSyxLQUFHO0dBQUcsS0FBSztFQUFHO0VBQUMsTUFBRTtFQUFFLElBQUUsSUFBSTtFQUFFLEtBQUssS0FBRztFQUFHLE9BQU0sQ0FBQztDQUFDO0NBQUUsSUFBRSxVQUFVLElBQUUsU0FBUyxHQUFFO0VBQUMsSUFBRyxLQUFLLE1BQUksS0FBSyxHQUFFO0dBQUMsS0FBSyxLQUFHO0dBQUcsS0FBSSxJQUFJLElBQUUsS0FBSyxHQUFFLEtBQUssTUFBSSxHQUFFLElBQUUsRUFBRSxHQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7RUFBQztFQUFDLElBQUUsVUFBVSxFQUFFLEtBQUssTUFBSyxDQUFDO0NBQUM7Q0FBRSxJQUFFLFVBQVUsSUFBRSxTQUFTLEdBQUU7RUFBQyxJQUFHLEtBQUssTUFBSSxLQUFLLEdBQUU7R0FBQyxJQUFFLFVBQVUsRUFBRSxLQUFLLE1BQUssQ0FBQztHQUFFLElBQUcsS0FBSyxNQUFJLEtBQUssR0FBRTtJQUFDLEtBQUssS0FBRztJQUFJLEtBQUksSUFBSSxJQUFFLEtBQUssR0FBRSxLQUFLLE1BQUksR0FBRSxJQUFFLEVBQUUsR0FBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO0dBQUM7RUFBQztDQUFDO0NBQUUsSUFBRSxVQUFVLElBQUUsV0FBVTtFQUFDLElBQUcsRUFBRSxJQUFFLEtBQUssSUFBRztHQUFDLEtBQUssS0FBRztHQUFFLEtBQUksSUFBSSxJQUFFLEtBQUssR0FBRSxLQUFL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QUFDO0NBQUMsU0FBUyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtFQUFDLElBQUksR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxJQUFFLEtBQUcsRUFBRSxPQUFLWSxLQUFFLElBQUUsRUFBRTtFQUFPLEtBQUksSUFBRU0sSUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLEtBQUksU0FBTyxJQUFFLEVBQUUsSUFBSSxRQUFNLElBQUUsTUFBSSxFQUFFLE9BQUssRUFBRSxFQUFFLFFBQU1QLEtBQUUsRUFBRSxNQUFJLEdBQUUsSUFBRSxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsS0FBSSxFQUFFLE9BQUssRUFBRSxPQUFLLEVBQUUsUUFBTSxFQUFFLE9BQUssRUFBRSxFQUFFLEtBQUksTUFBSyxDQUFDLEdBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSSxFQUFFLE9BQUssR0FBRSxDQUFDLElBQUcsUUFBTSxLQUFHLFFBQU0sTUFBSSxJQUFFLEtBQUksSUFBRSxDQUFDLEVBQUUsSUFBRSxFQUFFLFNBQU8sRUFBRSxRQUFNLEVBQUUsT0FBSyxJQUFFUSxJQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsR0FBRSxLQUFHLEVBQUUsUUFBTSxFQUFFLE1BQUksU0FBTyxjQUFZLE9BQU8sRUFBRSxRQUFNLEtBQUssTUFBSSxJQUFFLElBQUUsSUFBRSxNQUFJLElBQUUsRUFBRSxjQUFhLEVBQUUsT0FBSztFQUFJLE9BQU8sRUFBRSxNQUFJLEdBQUU7Q0FBQztDQUFDLFNBQVNELElBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0VBQUMsSUFBSSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsSUFBRSxFQUFFLFFBQU8sSUFBRSxHQUFFLElBQUU7RUFBRSxLQUFJLEVBQUUsTUFBSSxJQUFJLE1BQU0sQ0FBQyxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsS0FBSSxTQUFPLElBQUUsRUFBRSxPQUFLLGFBQVcsT0FBTyxLQUFHLGNBQVksT0FBTyxLQUFHLFlBQVUsT0FBTyxLQUFHLFlBQVUsT0FBTyxLQUFHLFlBQVUsT0FBTyxLQUFHLEVBQUUsZUFBYSxTQUFPLElBQUUsRUFBRSxJQUFJLEtBQUdILElBQUUsTUFBSyxHQUFFLE1BQUssTUFBSyxJQUFJLElBQUUsRUFBRSxDQUFDLElBQUUsSUFBRSxFQUFFLElBQUksS0FBR0EsSUFBRSxHQUFFLEVBQUMsVUFBUyxFQUFDLEdBQUUsTUFBSyxNQUFLLElBQUksSUFBRSxLQUFLLE1BQUksRUFBRSxlQUFhLEVBQUUsTUFBSSxJQUFFLElBQUUsRUFBRSxJQUFJLEtBQUdBLElBQUUsRUFBRSxNQUFLLEVBQUUsT0FBTSxFQUFFLEtBQUksRUFBRSxNQUFJLEVBQUUsTUFBSSxNQUFLLEVBQUUsR0FBRyxJQUFFLEVBQUUsSUFBSSxLQUFHLEdBQUUsSUFBRSxJQUFFLEdBQUUsRUFBRSxLQUFHLEdBQUUsRUFBRSxNQUFJLEVBQUUsTUFBSSxHQUFFLElBQUUsTUFBSyxPQUFLLElBQUUsRUFBRSxNQUFJLEVBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxPQUFLLE1BQUssSUFBRSxFQUFFLFFBQU0sRUFBRSxPQUFLLEtBQUksUUFBTSxLQUFHLFFBQU0sRUFBRSxPQUFLLE1BQUksTUFBSSxJQUFFLElBQUUsTUFBSSxJQUFFLEtBQUcsTUFBSyxjQUFZLE9BQU8sRUFBRSxTQUFPLEVBQUUsT0FBSyxNQUFJLEtBQUcsTUFBSSxLQUFHLElBQUUsSUFBRSxNQUFJLEtBQUcsSUFBRSxJQUFFLE9BQUssSUFBRSxJQUFFLE1BQUksS0FBSSxFQUFFLE9BQUssT0FBSyxFQUFFLElBQUksS0FBRztFQUFLLElBQUcsR0FBRSxLQUFJLElBQUUsR0FBRSxJQUFFLEdBQUUsS0FBSSxTQUFPLElBQUUsRUFBRSxPQUFLLE1BQUksSUFBRSxFQUFFLFNBQU8sRUFBRSxPQUFLLE1BQUksSUFBRSxFQUFFLENBQUMsSUFBRyxFQUFFLEdBQUUsQ0FBQztFQUFHLE9BQU87Q0FBQztDQUFDLFNBQVNJLElBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtFQUFDLElBQUksR0FBRTtFQUFFLElBQUcsY0FBWSxPQUFPLEVBQUUsTUFBSztHQUFDLEtBQUksSUFBRSxFQUFFLEtBQUksSUFBRSxHQUFFLEtBQUcsSUFBRSxFQUFFLFFBQU8sS0FBSSxFQUFFLE9BQUssRUFBRSxHQUFHLEtBQUcsR0FBRSxJQUFFQSxJQUFFLEVBQUUsSUFBRyxHQUFFLEdBQUUsQ0FBQztHQUFHLE9BQU87RUFBQztFQUFDLEVBQUUsT0FBSyxNQUFJLE1BQUksS0FBRyxFQUFFLFFBQU0sQ0FBQyxFQUFFLGVBQWEsSUFBRSxFQUFFLENBQUMsSUFBRyxFQUFFLGFBQWEsRUFBRSxLQUFJLEtBQUcsSUFBSSxJQUFHLElBQUUsRUFBRTtFQUFLO0dBQUcsSUFBRSxLQUFHLEVBQUU7U0FBa0IsUUFBTSxLQUFHLEtBQUcsRUFBRTtFQUFVLE9BQU87Q0FBQztDQUE2RyxTQUFTLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtFQUFDLElBQUksR0FBRSxHQUFFLEdBQUUsSUFBRSxFQUFFLEtBQUksSUFBRSxFQUFFLE1BQUssSUFBRSxFQUFFLElBQUcsSUFBRSxRQUFNLEtBQUcsTUFBSSxJQUFFLEVBQUU7RUFBSyxJQUFHLFNBQU8sS0FBRyxRQUFNLEtBQUcsS0FBRyxLQUFHLEVBQUUsT0FBSyxLQUFHLEVBQUUsTUFBSyxPQUFPO0VBQUUsSUFBRyxLQUFHLElBQUUsSUFBRTtRQUFPLElBQUUsSUFBRSxHQUFFLElBQUUsSUFBRSxHQUFFLEtBQUcsS0FBRyxJQUFFLEVBQUUsU0FBUSxJQUFHLFNBQU8sSUFBRSxFQUFFLElBQUUsS0FBRyxJQUFFLE1BQUksU0FBTyxNQUFJLElBQUUsRUFBRSxRQUFNLEtBQUcsRUFBRSxPQUFLLEtBQUcsRUFBRSxNQUFLLE9BQU87RUFBQTtFQUFFLE9BQU07Q0FBRTtDQUFDLFNBQVNDLElBQUUsR0FBRSxHQUFFLEdBQUU7RUFBQyxPQUFLLEVBQUUsS0FB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QkFBdUIsQ0FBQyxNQUFJLEVBQUUsc0JBQXNCLEdBQUUsRUFBRSxLQUFJLENBQUMsR0FBRTtLQUFDLEVBQUUsT0FBSyxFQUFFLFFBQU0sRUFBRSxRQUFNLEdBQUUsRUFBRSxRQUFNLEVBQUUsS0FBSSxFQUFFLE1BQUksQ0FBQyxJQUFHLEVBQUUsTUFBSSxFQUFFLEtBQUksRUFBRSxNQUFJLEVBQUUsS0FBSSxFQUFFLElBQUksS0FBSyxTQUFTLEdBQUU7TUFBQyxNQUFJLEVBQUUsS0FBRztLQUFFLENBQUMsR0FBRUQsSUFBRSxLQUFLLE1BQU0sRUFBRSxLQUFJLEVBQUUsR0FBRyxHQUFFLEVBQUUsTUFBSSxDQUFDLEdBQUUsRUFBRSxJQUFJLFVBQVEsRUFBRSxLQUFLLENBQUM7S0FBRSxNQUFNO0lBQUM7SUFBQyxRQUFNLEVBQUUsdUJBQXFCLEVBQUUsb0JBQW9CLEdBQUUsRUFBRSxLQUFJLENBQUMsR0FBRSxLQUFHLFFBQU0sRUFBRSxzQkFBb0IsRUFBRSxJQUFJLEtBQUssV0FBVTtLQUFDLEVBQUUsbUJBQW1CLEdBQUUsR0FBRSxDQUFDO0lBQUMsQ0FBQztHQUFDO0dBQUMsSUFBRyxFQUFFLFVBQVEsR0FBRSxFQUFFLFFBQU0sR0FBRSxFQUFFLE1BQUksR0FBRSxFQUFFLE1BQUksQ0FBQyxHQUFFLElBQUVmLElBQUUsS0FBSSxJQUFFLEdBQUUsR0FBRSxFQUFFLFFBQU0sRUFBRSxLQUFJLEVBQUUsTUFBSSxDQUFDLEdBQUUsS0FBRyxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU0sRUFBRSxPQUFNLEVBQUUsT0FBTyxHQUFFZSxJQUFFLEtBQUssTUFBTSxFQUFFLEtBQUksRUFBRSxHQUFHLEdBQUUsRUFBRSxNQUFJLENBQUM7UUFBTztJQUFHLEVBQUUsTUFBSSxDQUFDLEdBQUUsS0FBRyxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU0sRUFBRSxPQUFNLEVBQUUsT0FBTyxHQUFFLEVBQUUsUUFBTSxFQUFFO1VBQVUsRUFBRSxPQUFLLEVBQUUsSUFBRTtHQUFJLEVBQUUsUUFBTSxFQUFFLEtBQUksUUFBTSxFQUFFLG9CQUFrQixJQUFFQyxJQUFFQSxJQUFFLENBQUMsR0FBRSxDQUFDLEdBQUUsRUFBRSxnQkFBZ0IsQ0FBQyxJQUFHLEtBQUcsQ0FBQyxLQUFHLFFBQU0sRUFBRSw0QkFBMEIsSUFBRSxFQUFFLHdCQUF3QixHQUFFLENBQUMsSUFBRyxJQUFFLFFBQU0sS0FBRyxFQUFFLFNBQU8sS0FBRyxRQUFNLEVBQUUsTUFBSSxFQUFFLEVBQUUsTUFBTSxRQUFRLElBQUUsR0FBRSxJQUFFLEVBQUUsR0FBRSxFQUFFLENBQUMsSUFBRSxJQUFFLENBQUMsQ0FBQyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLEdBQUUsRUFBRSxPQUFLLEVBQUUsS0FBSSxFQUFFLE9BQUssTUFBSyxFQUFFLElBQUksVUFBUSxFQUFFLEtBQUssQ0FBQyxHQUFFLE1BQUksRUFBRSxNQUFJLEVBQUUsS0FBRztFQUFLLFNBQU8sR0FBRTtHQUFDLElBQUcsRUFBRSxNQUFJLE1BQUssS0FBRyxRQUFNLEdBQUUsSUFBRyxFQUFFLE1BQUs7SUFBQyxLQUFJLEVBQUUsT0FBSyxJQUFFLE1BQUksS0FBSSxLQUFHLEtBQUcsRUFBRSxZQUFVLEVBQUUsY0FBYSxJQUFFLEVBQUU7SUFBWSxFQUFFLEVBQUUsUUFBUSxDQUFDLEtBQUcsTUFBSyxFQUFFLE1BQUk7R0FBQyxPQUFLO0lBQUMsS0FBSSxJQUFFLEVBQUUsUUFBTyxNQUFLLEVBQUUsRUFBRSxFQUFFO0lBQUUsSUFBRSxDQUFDO0dBQUM7UUFBTSxFQUFFLE1BQUksRUFBRSxLQUFJLEVBQUUsTUFBSSxFQUFFLEtBQUksRUFBRSxRQUFNUSxJQUFFLENBQUM7R0FBRSxJQUFFLElBQUksR0FBRSxHQUFFLENBQUM7RUFBQztPQUFNLFFBQU0sS0FBRyxFQUFFLE9BQUssRUFBRSxPQUFLLEVBQUUsTUFBSSxFQUFFLEtBQUksRUFBRSxNQUFJLEVBQUUsT0FBSyxJQUFFLEVBQUUsTUFBSSxFQUFFLEVBQUUsS0FBSSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7RUFBRSxRQUFPLElBQUV4QixJQUFFLFdBQVMsRUFBRSxDQUFDLEdBQUUsTUFBSSxFQUFFLE1BQUksS0FBSyxJQUFFO0NBQUM7Q0FBQyxTQUFTd0IsSUFBRSxHQUFFO0VBQUMsTUFBSSxFQUFFLFFBQU0sRUFBRSxJQUFJLE1BQUksQ0FBQyxJQUFHLEVBQUUsT0FBSyxFQUFFLElBQUksS0FBS0EsR0FBQztDQUFFO0NBQUMsU0FBUyxFQUFFLEdBQUUsR0FBRSxHQUFFO0VBQUMsS0FBSSxJQUFJLElBQUUsR0FBRSxJQUFFLEVBQUUsUUFBTyxLQUFJLEVBQUUsRUFBRSxJQUFHLEVBQUUsRUFBRSxJQUFHLEVBQUUsRUFBRSxFQUFFO0VBQUUsSUFBRSxPQUFLeEIsSUFBRSxJQUFJLEdBQUUsQ0FBQyxHQUFFLEVBQUUsS0FBSyxTQUFTLEdBQUU7R0FBQyxJQUFHO0lBQUMsSUFBRSxFQUFFLEtBQUksRUFBRSxNQUFJLENBQUMsR0FBRSxFQUFFLEtBQUssU0FBUyxHQUFFO0tBQUMsRUFBRSxLQUFLLENBQUM7SUFBQyxDQUFDO0dBQUMsU0FBTyxHQUFFO0lBQUMsSUFBRSxJQUFJLEdBQUUsRUFBRSxHQUFHO0dBQUM7RUFBQyxDQUFDO0NBQUM7Q0FBQyxTQUFTLEVBQUUsR0FBRTtFQUFDLE9BQU0sWUFBVSxPQUFPLEtBQUcsUUFBTSxLQUFHLEVBQUUsTUFBSSxJQUFFLElBQUUsRUFBRSxDQUFDLElBQUUsRUFBRSxJQUFJLENBQUMsSUFBRSxLQUFLLE1BQUksRUFBRSxjQUFZLE9BQUtnQixJQUFFLENBQUMsR0FBRSxDQUFDO0NBQUM7Q0FBQyxTQUFTLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7RUFBQyxJQUFJLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsSUFBRSxFQUFFLFNBQU9GLEtBQUUsSUFBRSxFQUFFLE9BQU0sSUFBRSxFQUFFO0VBQUssSUFBRyxTQUFPLElBQUUs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QyxJQUFFLElBQUksR0FBRSxDQUFDO0VBQUM7Q0FBQztDQUFDLFNBQVMsRUFBRSxHQUFFLEdBQUUsR0FBRTtFQUFDLElBQUksR0FBRTtFQUFFLElBQUdBLElBQUUsV0FBU0EsSUFBRSxRQUFRLENBQUMsSUFBRyxJQUFFLEVBQUUsU0FBTyxFQUFFLFdBQVMsRUFBRSxXQUFTLEVBQUUsT0FBSyxFQUFFLEdBQUUsTUFBSyxDQUFDLElBQUcsU0FBTyxJQUFFLEVBQUUsTUFBSztHQUFDLElBQUcsRUFBRSxzQkFBcUIsSUFBRztJQUFDLEVBQUUscUJBQXFCO0dBQUMsU0FBTyxHQUFFO0lBQUMsSUFBRSxJQUFJLEdBQUUsQ0FBQztHQUFDO0dBQUMsRUFBRSxPQUFLLEVBQUUsTUFBSTtFQUFJO0VBQUMsSUFBRyxJQUFFLEVBQUUsS0FBSSxLQUFJLElBQUUsR0FBRSxJQUFFLEVBQUUsUUFBTyxLQUFJLEVBQUUsTUFBSSxFQUFFLEVBQUUsSUFBRyxHQUFFLEtBQUcsY0FBWSxPQUFPLEVBQUUsSUFBSTtFQUFFLEtBQUcsRUFBRSxFQUFFLEdBQUcsR0FBRSxFQUFFLE1BQUksRUFBRSxLQUFHLEVBQUUsTUFBSSxLQUFLO0NBQUM7Q0FBQyxTQUFTLEVBQUUsR0FBRSxHQUFFLEdBQUU7RUFBQyxPQUFPLEtBQUssWUFBWSxHQUFFLENBQUM7Q0FBQztDQUFDLFNBQVMsRUFBRSxHQUFFLEdBQUUsR0FBRTtFQUFDLElBQUksR0FBRSxHQUFFLEdBQUU7RUFBRSxLQUFHLGFBQVcsSUFBRSxTQUFTLGtCQUFpQkEsSUFBRSxNQUFJQSxJQUFFLEdBQUcsR0FBRSxDQUFDLEdBQUUsS0FBRyxJQUFFLGNBQVksT0FBTyxLQUFHLE9BQUssS0FBRyxFQUFFLE9BQUssRUFBRSxLQUFJLElBQUUsQ0FBQyxHQUFFLElBQUUsQ0FBQyxHQUFFLEVBQUUsR0FBRSxJQUFFLENBQUMsQ0FBQyxLQUFHLEtBQUcsR0FBRyxNQUFJaUIsSUFBRSxHQUFFLE1BQUssQ0FBQyxDQUFDLENBQUMsR0FBRSxLQUFHSCxLQUFFQSxLQUFFLEVBQUUsY0FBYSxDQUFDLEtBQUcsSUFBRSxDQUFDLENBQUMsSUFBRSxJQUFFLE9BQUssRUFBRSxhQUFXLEVBQUUsS0FBSyxFQUFFLFVBQVUsSUFBRSxNQUFLLEdBQUUsQ0FBQyxLQUFHLElBQUUsSUFBRSxJQUFFLEVBQUUsTUFBSSxFQUFFLFlBQVcsR0FBRSxDQUFDLEdBQUUsRUFBRSxHQUFFLEdBQUUsQ0FBQztDQUFDO0NBQWtVLFNBQVMsRUFBRSxHQUFFO0VBQUMsU0FBUyxFQUFFLEdBQUU7R0FBQyxJQUFJLEdBQUU7R0FBRSxPQUFPLEtBQUssb0JBQWtCLG9CQUFFLElBQUksSUFBRSxHQUFFLENBQUMsSUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFLLE1BQUssS0FBSyxrQkFBZ0IsV0FBVTtJQUFDLE9BQU87R0FBQyxHQUFFLEtBQUssdUJBQXFCLFdBQVU7SUFBQyxJQUFFO0dBQUksR0FBRSxLQUFLLHdCQUFzQixTQUFTLEdBQUU7SUFBQyxLQUFLLE1BQU0sU0FBTyxFQUFFLFNBQU8sRUFBRSxRQUFRLFNBQVMsR0FBRTtLQUFDLEVBQUUsTUFBSSxDQUFDLEdBQUVNLElBQUUsQ0FBQztJQUFDLENBQUM7R0FBQyxHQUFFLEtBQUssTUFBSSxTQUFTLEdBQUU7SUFBQyxFQUFFLElBQUksQ0FBQztJQUFFLElBQUksSUFBRSxFQUFFO0lBQXFCLEVBQUUsdUJBQXFCLFdBQVU7S0FBQyxLQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUUsS0FBRyxFQUFFLEtBQUssQ0FBQztJQUFDO0dBQUMsSUFBRyxFQUFFO0VBQVE7RUFBQyxPQUFPLEVBQUUsTUFBSSxTQUFPLEtBQUksRUFBRSxLQUFHLEdBQUUsRUFBRSxXQUFTLEVBQUUsTUFBSSxDQUFDLEVBQUUsV0FBUyxTQUFTLEdBQUUsR0FBRTtHQUFDLE9BQU8sRUFBRSxTQUFTLENBQUM7RUFBQyxHQUFHLGNBQVksR0FBRTtDQUFDO0NBQUMsSUFBRUwsSUFBRSxPQUFNLE1BQUUsRUFBQyxLQUFJLFNBQVMsR0FBRSxHQUFFLEdBQUUsR0FBRTtFQUFDLEtBQUksSUFBSSxHQUFFLEdBQUUsR0FBRSxJQUFFLEVBQUUsS0FBSSxLQUFJLElBQUUsRUFBRSxRQUFNLENBQUMsRUFBRSxJQUFHLElBQUc7R0FBQyxLQUFJLElBQUUsRUFBRSxnQkFBYyxRQUFNLEVBQUUsNkJBQTJCLEVBQUUsU0FBUyxFQUFFLHlCQUF5QixDQUFDLENBQUMsR0FBRSxJQUFFLEVBQUUsTUFBSyxRQUFNLEVBQUUsc0JBQW9CLEVBQUUsa0JBQWtCLEdBQUUsS0FBRyxDQUFDLENBQUMsR0FBRSxJQUFFLEVBQUUsTUFBSyxHQUFFLE9BQU8sRUFBRSxNQUFJO0VBQUMsU0FBTyxHQUFFO0dBQUMsSUFBRTtFQUFDO0VBQUMsTUFBTTtDQUFDLEVBQUMsR0FBRSxNQUFFLEdBQUUsTUFBRSxTQUFTLEdBQUU7RUFBQyxPQUFPLFFBQU0sS0FBRyxLQUFLLE1BQUksRUFBRTtDQUFXLEdBQUUsSUFBRSxVQUFVLFdBQVMsU0FBUyxHQUFFLEdBQUU7RUFBQyxJQUFJLElBQUksUUFBTSxLQUFLLE9BQUssS0FBSyxPQUFLLEtBQUssUUFBTSxLQUFLLE1BQUksS0FBSyxNQUFJQyxJQUFFLENBQUMsR0FBRSxLQUFLLEtBQUs7RUFBeEUsY0FBc0YsT0FBTyxNQUFJLElBQUUsRUFBRUEsSUFBRSxDQUFDLEdBQUUsQ0FBQyxHQUFFLEtBQUssS0FBSyxJQUFHLEtBQUdBLElBQUUsR0FBRSxDQUFDLEdBQUUsUUFBTSxLQUFHLEtBQUssUUFBTSxLQUFHLEtBQUssSUFBSSxLQUFLLENBQUMsR0FBRUksSUFBRSxJQUFJO0NBQUUsR0FBRSxJQUFFLFVBQVUsY0FBWSxTQUFTLEdBQUU7RUFBQyxLQUFLLFFBQU0sS0FBSyxNQUFJLENBQUMsR0FBRSxLQUFHLEtBQUssSUFBSSxLQUFLLENBQUMsR0FBRUEsSUFBRSxJQUFJO0NBQUUsR0FBRSxJQUFFLFVBQVUsU0FBTyxHQUFFLE1BQUUsQ0FBQyxHQUFFLE1BQUUsY0FBWSxPQUFPLFVBQVEsUUFBUSxVQUFVLEtBQUssS0FBSyxRQUFRLFFBQVEsQ0FBQyxJQUFFLFlBQVcsTUFBRSxTQUFTLEdBQUUsR0FBRTtFQUFDLE9BQU8sRUFBRSxJQUFJLE1BQUksRUFBRSxJQUFJO0NBQUcsR0FBRSxFQUFFLE1BQUksR0FBRSxNQUFFLEtBQUssT0FBTyxFQUFFLFNBQVMsQ0FBQyxHQUFFLE1BQUUsUUFBTWIsS0FBRSxNQUFFLFFBQU1BLEtBQUUsTUFBRSwrQkFBOEIsTUFBRSxHQUFFLE1BQUUsRUFBRSxDQUFDLENBQUMsR0FBRSxNQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUUsSUFBRTs7O0NDQTNtVyxJQUFJLEdBQUUsR0FBRWtCLEtBQUVDLEtBQUVDLE1BQUUsR0FBRUMsTUFBRSxDQUFDLEdBQUUsSUFBRUMsS0FBRSxJQUFFLEVBQUUsS0FBSSxJQUFFLEVBQUUsS0FBSUMsTUFBRSxFQUFFLFFBQU9DLE1BQUUsRUFBRSxLQUFJLElBQUUsRUFBRSxTQUFRQyxNQUFFLEVBQUU7Q0FBRyxTQUFTQyxJQUFFLEdBQUUsR0FBRTtFQUFDLEVBQUUsT0FBSyxFQUFFLElBQUksR0FBRSxHQUFFTixPQUFHLENBQUMsR0FBRSxNQUFFO0VBQUUsSUFBSSxJQUFFLEVBQUUsUUFBTSxFQUFFLE1BQUk7R0FBQyxJQUFHLENBQUM7R0FBRSxLQUFJLENBQUM7RUFBQztFQUFHLE9BQU8sS0FBRyxFQUFFLEdBQUcsVUFBUSxFQUFFLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRSxFQUFFLEdBQUc7Q0FBRTtDQUFnNUIsU0FBUyxFQUFFLEdBQUU7RUFBQyxPQUFPLE1BQUUsR0FBRSxFQUFFLFdBQVU7R0FBQyxPQUFNLEVBQUMsU0FBUSxFQUFDO0VBQUMsR0FBRSxDQUFDLENBQUM7Q0FBQztDQUFzTixTQUFTLEVBQUUsR0FBRSxHQUFFO0VBQUMsSUFBSSxJQUFFTSxJQUFFLEtBQUksQ0FBQztFQUFFLE9BQU8sRUFBRSxFQUFFLEtBQUksQ0FBQyxNQUFJLEVBQUUsS0FBRyxFQUFFLEdBQUUsRUFBRSxNQUFJLEdBQUUsRUFBRSxNQUFJLElBQUcsRUFBRTtDQUFFO0NBQXNELFNBQVMsRUFBRSxHQUFFO0VBQUMsSUFBSSxJQUFFLEVBQUUsUUFBUSxFQUFFLE1BQUssSUFBRUEsSUFBRSxLQUFJLENBQUM7RUFBRSxPQUFPLEVBQUUsSUFBRSxHQUFFLEtBQVMsRUFBRSxPQUFLLEVBQUUsS0FBRyxDQUFDLEdBQUUsRUFBRSxJQUFJLENBQUMsSUFBRyxFQUFFLE1BQU0sU0FBTyxFQUFFO0NBQUU7Q0FBNlgsU0FBUyxJQUFHO0VBQUMsS0FBSSxJQUFJLEdBQUUsSUFBRUwsSUFBRSxNQUFNLElBQUc7R0FBQyxJQUFJLElBQUUsRUFBRTtHQUFJLElBQUcsRUFBRSxPQUFLLEdBQUUsSUFBRztJQUFDLEVBQUUsSUFBSSxLQUFLLENBQUMsR0FBRSxFQUFFLElBQUksS0FBSyxDQUFDLEdBQUUsRUFBRSxNQUFJLENBQUM7R0FBQyxTQUFPLEdBQUU7SUFBQyxFQUFFLE1BQUksQ0FBQyxHQUFFLEVBQUUsSUFBSSxHQUFFLEVBQUUsR0FBRztHQUFDO0VBQUM7Q0FBQztDQUFDLEVBQUUsTUFBSSxTQUFTLEdBQUU7RUFBQyxJQUFFLE1BQUssS0FBRyxFQUFFLENBQUM7Q0FBQyxHQUFFLEVBQUUsS0FBRyxTQUFTLEdBQUUsR0FBRTtFQUFDLEtBQUcsRUFBRSxPQUFLLEVBQUUsSUFBSSxRQUFNLEVBQUUsTUFBSSxFQUFFLElBQUksTUFBS0ksT0FBR0EsSUFBRSxHQUFFLENBQUM7Q0FBQyxHQUFFLEVBQUUsTUFBSSxTQUFTLEdBQUU7RUFBQyxLQUFHLEVBQUUsQ0FBQyxHQUFFLElBQUU7RUFBRSxJQUFJLEtBQUcsSUFBRSxFQUFFLEtBQUs7RUFBSSxNQUFJUCxRQUFJLEtBQUcsRUFBRSxNQUFJLENBQUMsR0FBRSxFQUFFLE1BQUksQ0FBQyxHQUFFLEVBQUUsR0FBRyxLQUFLLFNBQVMsR0FBRTtHQUFDLEVBQUUsUUFBTSxFQUFFLEtBQUcsRUFBRSxNQUFLLEVBQUUsSUFBRSxFQUFFLE1BQUksS0FBSztFQUFDLENBQUMsTUFBSSxFQUFFLElBQUksS0FBSyxDQUFDLEdBQUUsRUFBRSxJQUFJLEtBQUssQ0FBQyxHQUFFLEVBQUUsTUFBSSxDQUFDLEdBQUUsSUFBRSxLQUFJLE1BQUU7Q0FBQyxHQUFFLEVBQUUsU0FBTyxTQUFTLEdBQUU7RUFBQyxPQUFHSyxJQUFFLENBQUM7RUFBRSxJQUFJLElBQUUsRUFBRTtFQUFJLEtBQUcsRUFBRSxRQUFNLEVBQUUsSUFBSSxJQUFJLFdBQVMsTUFBSUYsSUFBRSxLQUFLLENBQUMsS0FBR0YsUUFBSSxFQUFFLDJCQUF5QixNQUFFLEVBQUUsMEJBQXdCLEdBQUcsQ0FBQyxJQUFHLEVBQUUsSUFBSSxHQUFHLEtBQUssU0FBUyxHQUFFO0dBQUMsRUFBRSxNQUFJLEVBQUUsTUFBSSxFQUFFLElBQUcsRUFBRSxJQUFFLEtBQUs7RUFBQyxDQUFDLElBQUcsTUFBRSxJQUFFO0NBQUksR0FBRSxFQUFFLE1BQUksU0FBUyxHQUFFLEdBQUU7RUFBQyxFQUFFLEtBQUssU0FBUyxHQUFFO0dBQUMsSUFBRztJQUFDLEVBQUUsSUFBSSxLQUFLLENBQUMsR0FBRSxFQUFFLE1BQUksRUFBRSxJQUFJLE9BQU8sU0FBUyxHQUFFO0tBQUMsT0FBTSxDQUFDLEVBQUUsTUFBSSxFQUFFLENBQUM7SUFBQyxDQUFDO0dBQUMsU0FBTyxHQUFFO0lBQUMsRUFBRSxLQUFLLFNBQVMsR0FBRTtLQUFDLEVBQUUsUUFBTSxFQUFFLE1BQUksQ0FBQztJQUFFLENBQUMsR0FBRSxJQUFFLENBQUMsR0FBRSxFQUFFLElBQUksR0FBRSxFQUFFLEdBQUc7R0FBQztFQUFDLENBQUMsR0FBRUssT0FBR0EsSUFBRSxHQUFFLENBQUM7Q0FBQyxHQUFFLEVBQUUsVUFBUSxTQUFTLEdBQUU7RUFBQyxLQUFHLEVBQUUsQ0FBQztFQUFFLElBQUksR0FBRSxJQUFFLEVBQUU7RUFBSSxLQUFHLEVBQUUsUUFBTSxFQUFFLElBQUksR0FBRyxLQUFLLFNBQVMsR0FBRTtHQUFDLElBQUc7SUFBQyxFQUFFLENBQUM7R0FBQyxTQUFPLEdBQUU7SUFBQyxJQUFFO0dBQUM7RUFBQyxDQUFDLEdBQUUsRUFBRSxNQUFJLEtBQUssR0FBRSxLQUFHLEVBQUUsSUFBSSxHQUFFLEVBQUUsR0FBRztDQUFFO0NBQUUsSUFBSSxJQUFFLGNBQVksT0FBTztDQUFzQixTQUFTLEVBQUUsR0FBRTtFQUFDLElBQUksR0FBRSxJQUFFLFdBQVU7R0FBQyxhQUFhLENBQUMsR0FBRSxLQUFHLHFCQUFxQixDQUFDLEdBQUUsV0FBVyxDQUFDO0VBQUMsR0FBRSxJQUFFLFdBQVcsR0FBRSxFQUFFO0VBQUUsTUFBSSxJQUFFLHNCQUFzQixDQUFDO0NBQUU7Q0FBQyxTQUFTLEVBQUUsR0FBRTtFQUFDLElBQUksSUFBRSxHQUFFLElBQUUsRUFBRTtFQUFJLGNBQVksT0FBTyxNQUFJLEVBQUUsTUFBSSxLQUFLLEdBQUUsRUFBRSxJQUFHLElBQUU7Q0FBQztDQUFDLFNBQVMsRUFBRSxHQUFFO0VBQUMsSUFBSSxJQUFFO0VBQUUsRUFBRSxNQUFJLEVBQUUsR0FBRyxHQUFFLElBQUU7Q0FBQztDQUFDLFNBQVMsRUFBRSxHQUFFLEdBQUU7RUFBQyxPQUFNLENBQUMsS0FBRyxFQUFFLFdBQVMsRUFBRSxVQUFRLEVBQUUsS0FBSyxTQUFTLEdBQUUsR0FBRTtHQUFDLE9BQU8sTUFBSSxFQUFFO0VBQUUsQ0FBQztDQUFDOzs7Q0NBditGLElBQTBFLElBQUU7Q0FBSSxNQUFNO0NBQVEsU0FBUyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0VBQUMsTUFBSSxJQUFFLENBQUM7RUFBRyxJQUFJLEdBQUUsR0FBRSxJQUFFO0VBQUUsSUFBRyxTQUFRLEdBQUUsS0FBSSxLQUFLLElBQUUsQ0FBQyxHQUFFLEdBQUUsU0FBTyxJQUFFLElBQUUsRUFBRSxLQUFHLEVBQUUsS0FBRyxFQUFFO0VBQUcsSUFBSSxJQUFFO0dBQUMsTUFBSztHQUFFLE9BQU07R0FBRSxLQUFJO0dBQUUsS0FBSTtHQUFFLEtBQUk7R0FBSyxJQUFHO0dBQUssS0FBSTtHQUFFLEtBQUk7R0FBSyxLQUFJO0dBQUssYUFBWSxLQUFLO0dBQUUsS0FBSSxFQUFFO0dBQUUsS0FBSTtHQUFHLEtBQUk7R0FBRSxVQUFTO0dBQUUsUUFBTztFQUFDO0VBQUUsSUFBRyxjQUFZLE9BQU8sTUFBSSxJQUFFLEVBQUUsZUFBYyxLQUFJLEtBQUssR0FBRSxLQUFLLE1BQUksRUFBRSxPQUFLLEVBQUUsS0FBRyxFQUFFO0VBQUksT0FBT0csSUFBRSxTQUFPQSxJQUFFLE1BQU0sQ0FBQyxHQUFFO0NBQUM7OztDQ0kzeUIsSUFBTSxrQkFBa0IsRUFBb0MsSUFBQTtDQU81RCxTQUFnQixpQkFBaUIsRUFBRSxVQUFVLFlBQUE7RUFDM0MsT0FBTyxrQkFBQyxnQkFBZ0IsVUFBakI7R0FBMEIsT0FBTztHQUFXO0VBQW1DLENBQUE7Q0FDeEY7Q0FFQSxTQUFnQixjQUFBO0VBQ2QsTUFBTSxXQUFXLEVBQVcsZUFBQTt5QkFFNUIsSUFBSSxDQUFDLFVBQ0gsTUFBTSxJQUFJLE1BQU0sb0RBQUE7RUFFbEIsT0FBTztDQUNUOzs7Q0N0QjBTLElBQUksR0FBRTtDQUFFLFNBQVMsRUFBRSxHQUFFLEdBQUU7RUFBQyxJQUFFLEtBQUcsRUFBRSxLQUFLLE1BQUtDLElBQUUsTUFBSSxXQUFVLENBQUMsQ0FBQztDQUFDO0NBQUMsU0FBUyxFQUFFLEdBQUU7RUFBQyxJQUFHLEdBQUU7R0FBQyxJQUFJLElBQUU7R0FBRSxJQUFFLEtBQUs7R0FBRSxFQUFFO0VBQUM7RUFBQyxJQUFFLEtBQUcsRUFBRSxFQUFFO0NBQUM7Q0FBQyxTQUFTLEVBQUUsR0FBRTtFQUFDLElBQUksSUFBRSxNQUFLLElBQUUsRUFBRSxNQUFLLElBQUUsVUFBVSxDQUFDO0VBQUUsRUFBRSxRQUFNO0VBQUUsSUFBSSxJQUFFQyxFQUFFLFdBQVU7R0FBQyxJQUFJLElBQUUsRUFBRTtHQUFJLE9BQU0sSUFBRSxFQUFFLElBQUcsSUFBRyxFQUFFLEtBQUk7SUFBQyxFQUFFLElBQUksUUFBTTtJQUFFO0dBQUs7R0FBQyxFQUFFLEtBQUssSUFBRSxXQUFVO0lBQUMsSUFBSSxHQUFFLElBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRSxJQUFFLEVBQUU7SUFBTSxFQUFFO0lBQUUsSUFBR0MsSUFBRSxDQUFDLEtBQUcsT0FBSyxTQUFPLElBQUUsRUFBRSxRQUFNLEtBQUssSUFBRSxFQUFFLFdBQVU7S0FBQyxFQUFFLFFBQU07S0FBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQUMsT0FBTSxFQUFFLEtBQUssT0FBSztHQUFDO0dBQUUsT0FBT0MsSUFBRSxXQUFVO0lBQUMsSUFBSSxJQUFFLEVBQUUsTUFBTTtJQUFNLE9BQU8sTUFBSSxJQUFFLElBQUUsQ0FBQyxNQUFJLElBQUUsS0FBRyxLQUFHO0dBQUUsQ0FBQztFQUFDLEdBQUUsQ0FBQyxDQUFDO0VBQUUsT0FBTyxFQUFFO0NBQUs7Q0FBQyxFQUFFLGNBQVk7Q0FBTSxPQUFPLGlCQUFpQkMsSUFBRSxXQUFVO0VBQUMsYUFBWTtHQUFDLGNBQWEsQ0FBQztHQUFFLE9BQU0sS0FBSztFQUFDO0VBQUUsTUFBSztHQUFDLGNBQWEsQ0FBQztHQUFFLE9BQU07RUFBQztFQUFFLE9BQU07R0FBQyxjQUFhLENBQUM7R0FBRSxLQUFJLFdBQVU7SUFBQyxPQUFNLEVBQUMsTUFBSyxLQUFJO0dBQUM7RUFBQztFQUFFLEtBQUk7R0FBQyxjQUFhLENBQUM7R0FBRSxPQUFNO0VBQUM7Q0FBQyxDQUFDO0NBQUUsRUFBRSxPQUFNLFNBQVMsR0FBRSxHQUFFO0VBQUMsSUFBRyxZQUFVLE9BQU8sRUFBRSxNQUFLO0dBQUMsSUFBSSxHQUFFLElBQUUsRUFBRTtHQUFNLEtBQUksSUFBSSxLQUFLLEdBQUUsSUFBRyxlQUFhLEdBQUU7SUFBQyxJQUFJLElBQUUsRUFBRTtJQUFHLElBQUcsYUFBYUEsS0FBRTtLQUFDLElBQUcsQ0FBQyxHQUFFLEVBQUUsT0FBSyxJQUFFLENBQUM7S0FBRSxFQUFFLEtBQUc7S0FBRSxFQUFFLEtBQUcsRUFBRSxLQUFLO0lBQUM7R0FBQztFQUFDO0VBQUMsRUFBRSxDQUFDO0NBQUMsQ0FBQztDQUFFLEVBQUUsT0FBTSxTQUFTLEdBQUUsR0FBRTtFQUFDLEVBQUUsQ0FBQztFQUFFLEVBQUU7RUFBRSxJQUFJLEdBQUUsSUFBRSxFQUFFO0VBQUksSUFBRyxHQUFFO0dBQUMsRUFBRSxRQUFNO0dBQUcsSUFBRyxLQUFLLE9BQUssSUFBRSxFQUFFLE9BQU0sRUFBRSxPQUFLLElBQUUsU0FBUyxHQUFFO0lBQUMsSUFBSTtJQUFFLElBQUUsV0FBVTtLQUFDLElBQUU7SUFBSSxDQUFDO0lBQUUsRUFBRSxJQUFFLFdBQVU7S0FBQyxFQUFFLFFBQU07S0FBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQUM7SUFBRSxPQUFPO0dBQUMsRUFBRTtFQUFDO0VBQUMsSUFBRTtFQUFFLEVBQUUsQ0FBQztDQUFDLENBQUM7Q0FBRSxFQUFFLE9BQU0sU0FBUyxHQUFFLEdBQUUsR0FBRSxHQUFFO0VBQUMsRUFBRTtFQUFFLElBQUUsS0FBSztFQUFFLEVBQUUsR0FBRSxHQUFFLENBQUM7Q0FBQyxDQUFDO0NBQUUsRUFBRSxVQUFTLFNBQVMsR0FBRSxHQUFFO0VBQUMsRUFBRTtFQUFFLElBQUUsS0FBSztFQUFFLElBQUk7RUFBRSxJQUFHLFlBQVUsT0FBTyxFQUFFLFNBQU8sSUFBRSxFQUFFLE1BQUs7R0FBQyxJQUFJLElBQUUsRUFBRSxNQUFLLElBQUUsRUFBRTtHQUFNLElBQUcsR0FBRTtJQUFDLElBQUksSUFBRSxFQUFFO0lBQUUsSUFBRyxHQUFFLEtBQUksSUFBSSxLQUFLLEdBQUU7S0FBQyxJQUFJLElBQUUsRUFBRTtLQUFHLElBQUcsS0FBSyxNQUFJLEtBQUcsRUFBRSxLQUFLLElBQUc7TUFBQyxFQUFFLEVBQUU7TUFBRSxFQUFFLEtBQUcsS0FBSztLQUFDO0lBQUM7U0FBTSxFQUFFLElBQUUsSUFBRSxDQUFDO0lBQUUsS0FBSSxJQUFJLEtBQUssR0FBRTtLQUFDLElBQUksSUFBRSxFQUFFLElBQUcsSUFBRSxFQUFFO0tBQUcsSUFBRyxLQUFLLE1BQUksR0FBRTtNQUFDLElBQUUsRUFBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO01BQUUsRUFBRSxLQUFHO0tBQUMsT0FBTSxFQUFFLEVBQUUsR0FBRSxDQUFDO0lBQUM7R0FBQztFQUFDO0VBQUMsRUFBRSxDQUFDO0NBQUMsQ0FBQztDQUFFLFNBQVMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0VBQUMsSUFBSSxJQUFFLEtBQUssS0FBRyxLQUFLLE1BQUksRUFBRSxpQkFBZ0IsSUFBRUMsSUFBRSxDQUFDO0VBQUUsT0FBTTtHQUFDLEdBQUUsU0FBUyxHQUFFLEdBQUU7SUFBQyxFQUFFLFFBQU07SUFBRSxJQUFFO0dBQUM7R0FBRSxHQUFFQyxJQUFFLFdBQVU7SUFBQyxJQUFJLElBQUUsRUFBRSxNQUFNO0lBQU0sSUFBRyxFQUFFLE9BQUssR0FBRTtLQUFDLEVBQUUsS0FBRztLQUFFLElBQUcsR0FBRSxFQUFFLEtBQUc7VUFBTyxJQUFHLEdBQUUsRUFBRSxhQUFhLEdBQUUsQ0FBQztVQUFPLEVBQUUsZ0JBQWdCLENBQUM7SUFBQztHQUFDLENBQUM7RUFBQztDQUFDO0NBQUMsRUFBRSxXQUFVLFNBQVMsR0FBRSxHQUFFO0VBQUMsSUFBRyxZQUFVLE9BQU8sRUFBRSxNQUFLO0dBQUMsSUFBSSxJQUFFLEVBQUU7R0FBSSxJQUFHLEdBQUU7SUFBQyxJQUFJLElBQUUsRUFBRTtJQUFFLElBQUcsR0FBRTtLQUFDLEVBQUUsSUFBRSxLQUFLO0tBQUUsS0FBSSxJQUFJLEtBQUssR0FBRTtNQUFDLElBQUksSUFBRSxFQUFFO01BQUcsSUFBRyxHQUFFLEVBQUUsRUFBRTtLQUFDO0lBQUM7R0FBQztFQUFDLE9BQUs7R0FBQyxJQUFJLElBQUUsRUFBRTtHQUFJLElBQUcsR0FBRTtJQUFDLElBQUksSUFBRSxFQUFFO0lBQUssSUFBRyxHQUFFO0tBQUMsRUFBRSxPQUFLLEtBQUs7S0FBRSxFQUFFLEVBQUU7SUFBQztHQUFDO0VBQUM7RUFBQyxFQUFFLENBQUM7Q0FBQyxDQUFDO0NBQUUsRUFBRSxPQUFNLFNBQVMsR0FBRSxHQUFFLEdBQUUsR0FBRTtFQUFDLElBQUcsSUFBRSxLQUFHLE1BQUksR0FBRSxFQUFFLFFBQU07RUFBRSxFQUFFLEdBQUUsR0FBRSxDQUFDO0NBQUMsQ0FBQztDQUFFLElBQUUsVUFBVSx3QkFBc0IsU0FBUyxHQUFFLEdBQUU7RUFBQyxJQUFHLEtBQUssS0FBSSxPQUFNLENBQUM7RUFBRSxJQUFJLElBQUUsS0FBSyxNQUFLLElBQUUsS0FB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