/*! For license information please see index.js.LICENSE.txt */
!(function () {
	var e = {
			695: function (e, t, n) {
				e.exports = (function (e, t, n, i) {
					"use strict";
					const s = e => (e && "object" == typeof e && "default" in e ? e : { default: e }),
						r = s(e),
						o = s(n),
						l = s(i),
						a = "5.2.0";
					class c extends l.default {
						constructor(e, n) {
							super(),
								(e = t.getElement(e)) &&
									((this._element = e),
									(this._config = this._getConfig(n)),
									r.default.set(this._element, this.constructor.DATA_KEY, this));
						}
						dispose() {
							r.default.remove(this._element, this.constructor.DATA_KEY),
								o.default.off(this._element, this.constructor.EVENT_KEY);
							for (const e of Object.getOwnPropertyNames(this)) this[e] = null;
						}
						_queueCallback(e, n, i = !0) {
							t.executeAfterTransition(e, n, i);
						}
						_getConfig(e) {
							return (
								(e = this._mergeConfigObj(e, this._element)),
								(e = this._configAfterMerge(e)),
								this._typeCheckConfig(e),
								e
							);
						}
						static getInstance(e) {
							return r.default.get(t.getElement(e), this.DATA_KEY);
						}
						static getOrCreateInstance(e, t = {}) {
							return this.getInstance(e) || new this(e, "object" == typeof t ? t : null);
						}
						static get VERSION() {
							return a;
						}
						static get DATA_KEY() {
							return `bs.${this.NAME}`;
						}
						static get EVENT_KEY() {
							return `.${this.DATA_KEY}`;
						}
						static eventName(e) {
							return `${e}${this.EVENT_KEY}`;
						}
					}
					return c;
				})(n(493), n(72), n(286), n(705));
			},
			48: function (e, t, n) {
				e.exports = (function (e, t, n, i, s, r) {
					"use strict";
					const o = e => (e && "object" == typeof e && "default" in e ? e : { default: e }),
						l = o(t),
						a = o(n),
						c = o(i),
						u = o(s),
						d = o(r),
						f = "carousel",
						h = ".bs.carousel",
						g = ".data-api",
						m = 500,
						p = "next",
						_ = "prev",
						b = "left",
						v = "right",
						y = `slide${h}`,
						E = `slid${h}`,
						A = `keydown${h}`,
						w = `mouseenter${h}`,
						C = `mouseleave${h}`,
						T = `dragstart${h}`,
						S = `load${h}${g}`,
						x = `click${h}${g}`,
						L = "carousel",
						O = "active",
						$ = "slide",
						I = "carousel-item-end",
						D = "carousel-item-start",
						k = "carousel-item-next",
						N = "carousel-item-prev",
						j = ".active",
						M = ".carousel-item",
						P = j + M,
						F = ".carousel-item img",
						R = ".carousel-indicators",
						X = "[data-bs-slide], [data-bs-slide-to]",
						q = '[data-bs-ride="carousel"]',
						Q = { ArrowLeft: v, ArrowRight: b },
						V = {
							interval: 5e3,
							keyboard: !0,
							pause: "hover",
							ride: !1,
							touch: !0,
							wrap: !0,
						},
						Y = {
							interval: "(number|boolean)",
							keyboard: "boolean",
							pause: "(string|boolean)",
							ride: "(boolean|string)",
							touch: "boolean",
							wrap: "boolean",
						};
					class B extends d.default {
						constructor(e, t) {
							super(e, t),
								(this._interval = null),
								(this._activeElement = null),
								(this._isSliding = !1),
								(this.touchTimeout = null),
								(this._swipeHelper = null),
								(this._indicatorsElement = c.default.findOne(R, this._element)),
								this._addEventListeners(),
								this._config.ride === L && this.cycle();
						}
						static get Default() {
							return V;
						}
						static get DefaultType() {
							return Y;
						}
						static get NAME() {
							return f;
						}
						next() {
							this._slide(p);
						}
						nextWhenVisible() {
							!document.hidden && e.isVisible(this._element) && this.next();
						}
						prev() {
							this._slide(_);
						}
						pause() {
							this._isSliding && e.triggerTransitionEnd(this._element), this._clearInterval();
						}
						cycle() {
							this._clearInterval(),
								this._updateInterval(),
								(this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval));
						}
						_maybeEnableCycle() {
							this._config.ride &&
								(this._isSliding ? l.default.one(this._element, E, () => this.cycle()) : this.cycle());
						}
						to(e) {
							const t = this._getItems();
							if (e > t.length - 1 || e < 0) return;
							if (this._isSliding) return void l.default.one(this._element, E, () => this.to(e));
							const n = this._getItemIndex(this._getActive());
							if (n === e) return;
							const i = e > n ? p : _;
							this._slide(i, t[e]);
						}
						dispose() {
							this._swipeHelper && this._swipeHelper.dispose(), super.dispose();
						}
						_configAfterMerge(e) {
							return (e.defaultInterval = e.interval), e;
						}
						_addEventListeners() {
							this._config.keyboard && l.default.on(this._element, A, e => this._keydown(e)),
								"hover" === this._config.pause &&
									(l.default.on(this._element, w, () => this.pause()),
									l.default.on(this._element, C, () => this._maybeEnableCycle())),
								this._config.touch && u.default.isSupported() && this._addTouchEventListeners();
						}
						_addTouchEventListeners() {
							for (const e of c.default.find(F, this._element)) l.default.on(e, T, e => e.preventDefault());
							const e = {
								leftCallback: () => this._slide(this._directionToOrder(b)),
								rightCallback: () => this._slide(this._directionToOrder(v)),
								endCallback: () => {
									"hover" === this._config.pause &&
										(this.pause(),
										this.touchTimeout && clearTimeout(this.touchTimeout),
										(this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), m + this._config.interval)));
								},
							};
							this._swipeHelper = new u.default(this._element, e);
						}
						_keydown(e) {
							if (/input|textarea/i.test(e.target.tagName)) return;
							const t = Q[e.key];
							t && (e.preventDefault(), this._slide(this._directionToOrder(t)));
						}
						_getItemIndex(e) {
							return this._getItems().indexOf(e);
						}
						_setActiveIndicatorElement(e) {
							if (!this._indicatorsElement) return;
							const t = c.default.findOne(j, this._indicatorsElement);
							t.classList.remove(O), t.removeAttribute("aria-current");
							const n = c.default.findOne(`[data-bs-slide-to="${e}"]`, this._indicatorsElement);
							n && (n.classList.add(O), n.setAttribute("aria-current", "true"));
						}
						_updateInterval() {
							const e = this._activeElement || this._getActive();
							if (!e) return;
							const t = Number.parseInt(e.getAttribute("data-bs-interval"), 10);
							this._config.interval = t || this._config.defaultInterval;
						}
						_slide(t, n = null) {
							if (this._isSliding) return;
							const i = this._getActive(),
								s = t === p,
								r = n || e.getNextActiveElement(this._getItems(), i, s, this._config.wrap);
							if (r === i) return;
							const o = this._getItemIndex(r),
								a = e =>
									l.default.trigger(this._element, e, {
										relatedTarget: r,
										direction: this._orderToDirection(t),
										from: this._getItemIndex(i),
										to: o,
									});
							if (a(y).defaultPrevented) return;
							if (!i || !r) return;
							const c = Boolean(this._interval);
							this.pause(), (this._isSliding = !0), this._setActiveIndicatorElement(o), (this._activeElement = r);
							const u = s ? D : I,
								d = s ? k : N;
							r.classList.add(d), e.reflow(r), i.classList.add(u), r.classList.add(u);
							const f = () => {
								r.classList.remove(u, d), r.classList.add(O), i.classList.remove(O, d, u), (this._isSliding = !1), a(E);
							};
							this._queueCallback(f, i, this._isAnimated()), c && this.cycle();
						}
						_isAnimated() {
							return this._element.classList.contains($);
						}
						_getActive() {
							return c.default.findOne(P, this._element);
						}
						_getItems() {
							return c.default.find(M, this._element);
						}
						_clearInterval() {
							this._interval && (clearInterval(this._interval), (this._interval = null));
						}
						_directionToOrder(t) {
							return e.isRTL() ? (t === b ? _ : p) : t === b ? p : _;
						}
						_orderToDirection(t) {
							return e.isRTL() ? (t === _ ? b : v) : t === _ ? v : b;
						}
						static jQueryInterface(e) {
							return this.each(function () {
								const t = B.getOrCreateInstance(this, e);
								if ("number" != typeof e) {
									if ("string" == typeof e) {
										if (void 0 === t[e] || e.startsWith("_") || "constructor" === e)
											throw new TypeError(`No method named "${e}"`);
										t[e]();
									}
								} else t.to(e);
							});
						}
					}
					return (
						l.default.on(document, x, X, function (t) {
							const n = e.getElementFromSelector(this);
							if (!n || !n.classList.contains(L)) return;
							t.preventDefault();
							const i = B.getOrCreateInstance(n),
								s = this.getAttribute("data-bs-slide-to");
							return s
								? (i.to(s), void i._maybeEnableCycle())
								: "next" === a.default.getDataAttribute(this, "slide")
								? (i.next(), void i._maybeEnableCycle())
								: (i.prev(), void i._maybeEnableCycle());
						}),
						l.default.on(window, S, () => {
							const e = c.default.find(q);
							for (const t of e) B.getOrCreateInstance(t);
						}),
						e.defineJQueryPlugin(B),
						B
					);
				})(n(72), n(286), n(175), n(737), n(814), n(695));
			},
			863: function (e, t, n) {
				e.exports = (function (e, t, n, i) {
					"use strict";
					const s = e => (e && "object" == typeof e && "default" in e ? e : { default: e }),
						r = s(t),
						o = s(n),
						l = s(i),
						a = "collapse",
						c = ".bs.collapse",
						u = `show${c}`,
						d = `shown${c}`,
						f = `hide${c}`,
						h = `hidden${c}`,
						g = `click${c}.data-api`,
						m = "show",
						p = "collapse",
						_ = "collapsing",
						b = "collapsed",
						v = `:scope .${p} .${p}`,
						y = "collapse-horizontal",
						E = "width",
						A = "height",
						w = ".collapse.show, .collapse.collapsing",
						C = '[data-bs-toggle="collapse"]',
						T = { parent: null, toggle: !0 },
						S = { parent: "(null|element)", toggle: "boolean" };
					class x extends l.default {
						constructor(t, n) {
							super(t, n), (this._isTransitioning = !1), (this._triggerArray = []);
							const i = o.default.find(C);
							for (const t of i) {
								const n = e.getSelectorFromElement(t),
									i = o.default.find(n).filter(e => e === this._element);
								null !== n && i.length && this._triggerArray.push(t);
							}
							this._initializeChildren(),
								this._config.parent || this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()),
								this._config.toggle && this.toggle();
						}
						static get Default() {
							return T;
						}
						static get DefaultType() {
							return S;
						}
						static get NAME() {
							return a;
						}
						toggle() {
							this._isShown() ? this.hide() : this.show();
						}
						show() {
							if (this._isTransitioning || this._isShown()) return;
							let e = [];
							if (
								(this._config.parent &&
									(e = this._getFirstLevelChildren(w)
										.filter(e => e !== this._element)
										.map(e => x.getOrCreateInstance(e, { toggle: !1 }))),
								e.length && e[0]._isTransitioning)
							)
								return;
							if (r.default.trigger(this._element, u).defaultPrevented) return;
							for (const t of e) t.hide();
							const t = this._getDimension();
							this._element.classList.remove(p),
								this._element.classList.add(_),
								(this._element.style[t] = 0),
								this._addAriaAndCollapsedClass(this._triggerArray, !0),
								(this._isTransitioning = !0);
							const n = () => {
									(this._isTransitioning = !1),
										this._element.classList.remove(_),
										this._element.classList.add(p, m),
										(this._element.style[t] = ""),
										r.default.trigger(this._element, d);
								},
								i = `scroll${t[0].toUpperCase() + t.slice(1)}`;
							this._queueCallback(n, this._element, !0), (this._element.style[t] = `${this._element[i]}px`);
						}
						hide() {
							if (this._isTransitioning || !this._isShown()) return;
							if (r.default.trigger(this._element, f).defaultPrevented) return;
							const t = this._getDimension();
							(this._element.style[t] = `${this._element.getBoundingClientRect()[t]}px`),
								e.reflow(this._element),
								this._element.classList.add(_),
								this._element.classList.remove(p, m);
							for (const t of this._triggerArray) {
								const n = e.getElementFromSelector(t);
								n && !this._isShown(n) && this._addAriaAndCollapsedClass([t], !1);
							}
							this._isTransitioning = !0;
							const n = () => {
								(this._isTransitioning = !1),
									this._element.classList.remove(_),
									this._element.classList.add(p),
									r.default.trigger(this._element, h);
							};
							(this._element.style[t] = ""), this._queueCallback(n, this._element, !0);
						}
						_isShown(e = this._element) {
							return e.classList.contains(m);
						}
						_configAfterMerge(t) {
							return (t.toggle = Boolean(t.toggle)), (t.parent = e.getElement(t.parent)), t;
						}
						_getDimension() {
							return this._element.classList.contains(y) ? E : A;
						}
						_initializeChildren() {
							if (!this._config.parent) return;
							const t = this._getFirstLevelChildren(C);
							for (const n of t) {
								const t = e.getElementFromSelector(n);
								t && this._addAriaAndCollapsedClass([n], this._isShown(t));
							}
						}
						_getFirstLevelChildren(e) {
							const t = o.default.find(v, this._config.parent);
							return o.default.find(e, this._config.parent).filter(e => !t.includes(e));
						}
						_addAriaAndCollapsedClass(e, t) {
							if (e.length) for (const n of e) n.classList.toggle(b, !t), n.setAttribute("aria-expanded", t);
						}
						static jQueryInterface(e) {
							const t = {};
							return (
								"string" == typeof e && /show|hide/.test(e) && (t.toggle = !1),
								this.each(function () {
									const n = x.getOrCreateInstance(this, t);
									if ("string" == typeof e) {
										if (void 0 === n[e]) throw new TypeError(`No method named "${e}"`);
										n[e]();
									}
								})
							);
						}
					}
					return (
						r.default.on(document, g, C, function (t) {
							("A" === t.target.tagName || (t.delegateTarget && "A" === t.delegateTarget.tagName)) &&
								t.preventDefault();
							const n = e.getSelectorFromElement(this),
								i = o.default.find(n);
							for (const e of i) x.getOrCreateInstance(e, { toggle: !1 }).toggle();
						}),
						e.defineJQueryPlugin(x),
						x
					);
				})(n(72), n(286), n(737), n(695));
			},
			493: function (e) {
				e.exports = (function () {
					"use strict";
					const e = new Map();
					return {
						set(t, n, i) {
							e.has(t) || e.set(t, new Map());
							const s = e.get(t);
							s.has(n) || 0 === s.size
								? s.set(n, i)
								: console.error(
										`Bootstrap doesn't allow more than one instance per element. Bound instance: ${
											Array.from(s.keys())[0]
										}.`
								  );
						},
						get(t, n) {
							return (e.has(t) && e.get(t).get(n)) || null;
						},
						remove(t, n) {
							if (!e.has(t)) return;
							const i = e.get(t);
							i.delete(n), 0 === i.size && e.delete(t);
						},
					};
				})();
			},
			286: function (e, t, n) {
				e.exports = (function (e) {
					"use strict";
					const t = /[^.]*(?=\..*)\.|.*/,
						n = /\..*/,
						i = /::\d+$/,
						s = {};
					let r = 1;
					const o = { mouseenter: "mouseover", mouseleave: "mouseout" },
						l = new Set([
							"click",
							"dblclick",
							"mouseup",
							"mousedown",
							"contextmenu",
							"mousewheel",
							"DOMMouseScroll",
							"mouseover",
							"mouseout",
							"mousemove",
							"selectstart",
							"selectend",
							"keydown",
							"keypress",
							"keyup",
							"orientationchange",
							"touchstart",
							"touchmove",
							"touchend",
							"touchcancel",
							"pointerdown",
							"pointermove",
							"pointerup",
							"pointerleave",
							"pointercancel",
							"gesturestart",
							"gesturechange",
							"gestureend",
							"focus",
							"blur",
							"change",
							"reset",
							"select",
							"submit",
							"focusin",
							"focusout",
							"load",
							"unload",
							"beforeunload",
							"resize",
							"move",
							"DOMContentLoaded",
							"readystatechange",
							"error",
							"abort",
							"scroll",
						]);
					function a(e, t) {
						return (t && `${t}::${r++}`) || e.uidEvent || r++;
					}
					function c(e) {
						const t = a(e);
						return (e.uidEvent = t), (s[t] = s[t] || {}), s[t];
					}
					function u(e, t) {
						return function n(i) {
							return v(i, { delegateTarget: e }), n.oneOff && b.off(e, i.type, t), t.apply(e, [i]);
						};
					}
					function d(e, t, n) {
						return function i(s) {
							const r = e.querySelectorAll(t);
							for (let { target: o } = s; o && o !== this; o = o.parentNode)
								for (const l of r)
									if (l === o) return v(s, { delegateTarget: o }), i.oneOff && b.off(e, s.type, t, n), n.apply(o, [s]);
						};
					}
					function f(e, t, n = null) {
						return Object.values(e).find(e => e.callable === t && e.delegationSelector === n);
					}
					function h(e, t, n) {
						const i = "string" == typeof t,
							s = i ? n : t || n;
						let r = _(e);
						return l.has(r) || (r = e), [i, s, r];
					}
					function g(e, n, i, s, r) {
						if ("string" != typeof n || !e) return;
						let [l, g, m] = h(n, i, s);
						if (n in o) {
							const e = e =>
								function (t) {
									if (
										!t.relatedTarget ||
										(t.relatedTarget !== t.delegateTarget && !t.delegateTarget.contains(t.relatedTarget))
									)
										return e.call(this, t);
								};
							g = e(g);
						}
						const p = c(e),
							_ = p[m] || (p[m] = {}),
							b = f(_, g, l ? i : null);
						if (b) return void (b.oneOff = b.oneOff && r);
						const v = a(g, n.replace(t, "")),
							y = l ? d(e, i, g) : u(e, g);
						(y.delegationSelector = l ? i : null),
							(y.callable = g),
							(y.oneOff = r),
							(y.uidEvent = v),
							(_[v] = y),
							e.addEventListener(m, y, l);
					}
					function m(e, t, n, i, s) {
						const r = f(t[n], i, s);
						r && (e.removeEventListener(n, r, Boolean(s)), delete t[n][r.uidEvent]);
					}
					function p(e, t, n, i) {
						const s = t[n] || {};
						for (const r of Object.keys(s))
							if (r.includes(i)) {
								const i = s[r];
								m(e, t, n, i.callable, i.delegationSelector);
							}
					}
					function _(e) {
						return (e = e.replace(n, "")), o[e] || e;
					}
					const b = {
						on(e, t, n, i) {
							g(e, t, n, i, !1);
						},
						one(e, t, n, i) {
							g(e, t, n, i, !0);
						},
						off(e, t, n, s) {
							if ("string" != typeof t || !e) return;
							const [r, o, l] = h(t, n, s),
								a = l !== t,
								u = c(e),
								d = u[l] || {},
								f = t.startsWith(".");
							if (void 0 === o) {
								if (f) for (const n of Object.keys(u)) p(e, u, n, t.slice(1));
								for (const n of Object.keys(d)) {
									const s = n.replace(i, "");
									if (!a || t.includes(s)) {
										const t = d[n];
										m(e, u, l, t.callable, t.delegationSelector);
									}
								}
							} else {
								if (!Object.keys(d).length) return;
								m(e, u, l, o, r ? n : null);
							}
						},
						trigger(t, n, i) {
							if ("string" != typeof n || !t) return null;
							const s = e.getjQuery();
							let r = null,
								o = !0,
								l = !0,
								a = !1;
							n !== _(n) &&
								s &&
								((r = s.Event(n, i)),
								s(t).trigger(r),
								(o = !r.isPropagationStopped()),
								(l = !r.isImmediatePropagationStopped()),
								(a = r.isDefaultPrevented()));
							let c = new Event(n, { bubbles: o, cancelable: !0 });
							return (
								(c = v(c, i)),
								a && c.preventDefault(),
								l && t.dispatchEvent(c),
								c.defaultPrevented && r && r.preventDefault(),
								c
							);
						},
					};
					function v(e, t) {
						for (const [n, i] of Object.entries(t || {}))
							try {
								e[n] = i;
							} catch (t) {
								Object.defineProperty(e, n, {
									configurable: !0,
									get() {
										return i;
									},
								});
							}
						return e;
					}
					return b;
				})(n(72));
			},
			175: function (e) {
				e.exports = (function () {
					"use strict";
					function e(e) {
						if ("true" === e) return !0;
						if ("false" === e) return !1;
						if (e === Number(e).toString()) return Number(e);
						if ("" === e || "null" === e) return null;
						if ("string" != typeof e) return e;
						try {
							return JSON.parse(decodeURIComponent(e));
						} catch (t) {
							return e;
						}
					}
					function t(e) {
						return e.replace(/[A-Z]/g, e => `-${e.toLowerCase()}`);
					}
					return {
						setDataAttribute(e, n, i) {
							e.setAttribute(`data-bs-${t(n)}`, i);
						},
						removeDataAttribute(e, n) {
							e.removeAttribute(`data-bs-${t(n)}`);
						},
						getDataAttributes(t) {
							if (!t) return {};
							const n = {},
								i = Object.keys(t.dataset).filter(e => e.startsWith("bs") && !e.startsWith("bsConfig"));
							for (const s of i) {
								let i = s.replace(/^bs/, "");
								(i = i.charAt(0).toLowerCase() + i.slice(1, i.length)), (n[i] = e(t.dataset[s]));
							}
							return n;
						},
						getDataAttribute(n, i) {
							return e(n.getAttribute(`data-bs-${t(i)}`));
						},
					};
				})();
			},
			737: function (e, t, n) {
				e.exports = (function (e) {
					"use strict";
					return {
						find(e, t = document.documentElement) {
							return [].concat(...Element.prototype.querySelectorAll.call(t, e));
						},
						findOne(e, t = document.documentElement) {
							return Element.prototype.querySelector.call(t, e);
						},
						children(e, t) {
							return [].concat(...e.children).filter(e => e.matches(t));
						},
						parents(e, t) {
							const n = [];
							let i = e.parentNode.closest(t);
							for (; i; ) n.push(i), (i = i.parentNode.closest(t));
							return n;
						},
						prev(e, t) {
							let n = e.previousElementSibling;
							for (; n; ) {
								if (n.matches(t)) return [n];
								n = n.previousElementSibling;
							}
							return [];
						},
						next(e, t) {
							let n = e.nextElementSibling;
							for (; n; ) {
								if (n.matches(t)) return [n];
								n = n.nextElementSibling;
							}
							return [];
						},
						focusableChildren(t) {
							const n = [
								"a",
								"button",
								"input",
								"textarea",
								"select",
								"details",
								"[tabindex]",
								'[contenteditable="true"]',
							]
								.map(e => `${e}:not([tabindex^="-"])`)
								.join(",");
							return this.find(n, t).filter(t => !e.isDisabled(t) && e.isVisible(t));
						},
					};
				})(n(72));
			},
			705: function (e, t, n) {
				e.exports = (function (e, t) {
					"use strict";
					const n = (e => (e && "object" == typeof e && "default" in e ? e : { default: e }))(t);
					class i {
						static get Default() {
							return {};
						}
						static get DefaultType() {
							return {};
						}
						static get NAME() {
							throw new Error('You have to implement the static method "NAME", for each component!');
						}
						_getConfig(e) {
							return (e = this._mergeConfigObj(e)), (e = this._configAfterMerge(e)), this._typeCheckConfig(e), e;
						}
						_configAfterMerge(e) {
							return e;
						}
						_mergeConfigObj(t, i) {
							const s = e.isElement(i) ? n.default.getDataAttribute(i, "config") : {};
							return {
								...this.constructor.Default,
								...("object" == typeof s ? s : {}),
								...(e.isElement(i) ? n.default.getDataAttributes(i) : {}),
								...("object" == typeof t ? t : {}),
							};
						}
						_typeCheckConfig(t, n = this.constructor.DefaultType) {
							for (const i of Object.keys(n)) {
								const s = n[i],
									r = t[i],
									o = e.isElement(r) ? "element" : e.toType(r);
								if (!new RegExp(s).test(o))
									throw new TypeError(
										`${this.constructor.NAME.toUpperCase()}: Option "${i}" provided type "${o}" but expected type "${s}".`
									);
							}
						}
					}
					return i;
				})(n(72), n(175));
			},
			72: function (e, t) {
				!(function (e) {
					"use strict";
					const t = 1e6,
						n = 1e3,
						i = "transitionend",
						s = e =>
							null == e
								? `${e}`
								: Object.prototype.toString
										.call(e)
										.match(/\s([a-z]+)/i)[1]
										.toLowerCase(),
						r = e => {
							do {
								e += Math.floor(Math.random() * t);
							} while (document.getElementById(e));
							return e;
						},
						o = e => {
							let t = e.getAttribute("data-bs-target");
							if (!t || "#" === t) {
								let n = e.getAttribute("href");
								if (!n || (!n.includes("#") && !n.startsWith("."))) return null;
								n.includes("#") && !n.startsWith("#") && (n = `#${n.split("#")[1]}`),
									(t = n && "#" !== n ? n.trim() : null);
							}
							return t;
						},
						l = e => {
							const t = o(e);
							return t && document.querySelector(t) ? t : null;
						},
						a = e => {
							const t = o(e);
							return t ? document.querySelector(t) : null;
						},
						c = e => {
							if (!e) return 0;
							let { transitionDuration: t, transitionDelay: i } = window.getComputedStyle(e);
							const s = Number.parseFloat(t),
								r = Number.parseFloat(i);
							return s || r
								? ((t = t.split(",")[0]), (i = i.split(",")[0]), (Number.parseFloat(t) + Number.parseFloat(i)) * n)
								: 0;
						},
						u = e => {
							e.dispatchEvent(new Event(i));
						},
						d = e => !(!e || "object" != typeof e) && (void 0 !== e.jquery && (e = e[0]), void 0 !== e.nodeType),
						f = e =>
							d(e) ? (e.jquery ? e[0] : e) : "string" == typeof e && e.length > 0 ? document.querySelector(e) : null,
						h = e => {
							if (!d(e) || 0 === e.getClientRects().length) return !1;
							const t = "visible" === getComputedStyle(e).getPropertyValue("visibility"),
								n = e.closest("details:not([open])");
							if (!n) return t;
							if (n !== e) {
								const t = e.closest("summary");
								if (t && t.parentNode !== n) return !1;
								if (null === t) return !1;
							}
							return t;
						},
						g = e =>
							!e ||
							e.nodeType !== Node.ELEMENT_NODE ||
							!!e.classList.contains("disabled") ||
							(void 0 !== e.disabled
								? e.disabled
								: e.hasAttribute("disabled") && "false" !== e.getAttribute("disabled")),
						m = e => {
							if (!document.documentElement.attachShadow) return null;
							if ("function" == typeof e.getRootNode) {
								const t = e.getRootNode();
								return t instanceof ShadowRoot ? t : null;
							}
							return e instanceof ShadowRoot ? e : e.parentNode ? m(e.parentNode) : null;
						},
						p = () => {},
						_ = e => {
							e.offsetHeight;
						},
						b = () => (window.jQuery && !document.body.hasAttribute("data-bs-no-jquery") ? window.jQuery : null),
						v = [],
						y = e => {
							"loading" === document.readyState
								? (v.length ||
										document.addEventListener("DOMContentLoaded", () => {
											for (const e of v) e();
										}),
								  v.push(e))
								: e();
						},
						E = () => "rtl" === document.documentElement.dir,
						A = e => {
							y(() => {
								const t = b();
								if (t) {
									const n = e.NAME,
										i = t.fn[n];
									(t.fn[n] = e.jQueryInterface),
										(t.fn[n].Constructor = e),
										(t.fn[n].noConflict = () => ((t.fn[n] = i), e.jQueryInterface));
								}
							});
						},
						w = e => {
							"function" == typeof e && e();
						},
						C = (e, t, n = !0) => {
							if (!n) return void w(e);
							const s = 5,
								r = c(t) + s;
							let o = !1;
							const l = ({ target: n }) => {
								n === t && ((o = !0), t.removeEventListener(i, l), w(e));
							};
							t.addEventListener(i, l),
								setTimeout(() => {
									o || u(t);
								}, r);
						},
						T = (e, t, n, i) => {
							const s = e.length;
							let r = e.indexOf(t);
							return -1 === r
								? !n && i
									? e[s - 1]
									: e[0]
								: ((r += n ? 1 : -1), i && (r = (r + s) % s), e[Math.max(0, Math.min(r, s - 1))]);
						};
					(e.defineJQueryPlugin = A),
						(e.execute = w),
						(e.executeAfterTransition = C),
						(e.findShadowRoot = m),
						(e.getElement = f),
						(e.getElementFromSelector = a),
						(e.getNextActiveElement = T),
						(e.getSelectorFromElement = l),
						(e.getTransitionDurationFromElement = c),
						(e.getUID = r),
						(e.getjQuery = b),
						(e.isDisabled = g),
						(e.isElement = d),
						(e.isRTL = E),
						(e.isVisible = h),
						(e.noop = p),
						(e.onDOMContentLoaded = y),
						(e.reflow = _),
						(e.toType = s),
						(e.triggerTransitionEnd = u),
						Object.defineProperties(e, {
							__esModule: { value: !0 },
							[Symbol.toStringTag]: { value: "Module" },
						});
				})(t);
			},
			814: function (e, t, n) {
				e.exports = (function (e, t, n) {
					"use strict";
					const i = e => (e && "object" == typeof e && "default" in e ? e : { default: e }),
						s = i(e),
						r = i(t),
						o = "swipe",
						l = ".bs.swipe",
						a = `touchstart${l}`,
						c = `touchmove${l}`,
						u = `touchend${l}`,
						d = `pointerdown${l}`,
						f = `pointerup${l}`,
						h = "touch",
						g = "pen",
						m = "pointer-event",
						p = 40,
						_ = { endCallback: null, leftCallback: null, rightCallback: null },
						b = {
							endCallback: "(function|null)",
							leftCallback: "(function|null)",
							rightCallback: "(function|null)",
						};
					class v extends s.default {
						constructor(e, t) {
							super(),
								(this._element = e),
								e &&
									v.isSupported() &&
									((this._config = this._getConfig(t)),
									(this._deltaX = 0),
									(this._supportPointerEvents = Boolean(window.PointerEvent)),
									this._initEvents());
						}
						static get Default() {
							return _;
						}
						static get DefaultType() {
							return b;
						}
						static get NAME() {
							return o;
						}
						dispose() {
							r.default.off(this._element, l);
						}
						_start(e) {
							this._supportPointerEvents
								? this._eventIsPointerPenTouch(e) && (this._deltaX = e.clientX)
								: (this._deltaX = e.touches[0].clientX);
						}
						_end(e) {
							this._eventIsPointerPenTouch(e) && (this._deltaX = e.clientX - this._deltaX),
								this._handleSwipe(),
								n.execute(this._config.endCallback);
						}
						_move(e) {
							this._deltaX = e.touches && e.touches.length > 1 ? 0 : e.touches[0].clientX - this._deltaX;
						}
						_handleSwipe() {
							const e = Math.abs(this._deltaX);
							if (e <= p) return;
							const t = e / this._deltaX;
							(this._deltaX = 0), t && n.execute(t > 0 ? this._config.rightCallback : this._config.leftCallback);
						}
						_initEvents() {
							this._supportPointerEvents
								? (r.default.on(this._element, d, e => this._start(e)),
								  r.default.on(this._element, f, e => this._end(e)),
								  this._element.classList.add(m))
								: (r.default.on(this._element, a, e => this._start(e)),
								  r.default.on(this._element, c, e => this._move(e)),
								  r.default.on(this._element, u, e => this._end(e)));
						}
						_eventIsPointerPenTouch(e) {
							return this._supportPointerEvents && (e.pointerType === g || e.pointerType === h);
						}
						static isSupported() {
							return "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0;
						}
					}
					return v;
				})(n(705), n(286), n(72));
			},
		},
		t = {};
	function n(i) {
		var s = t[i];
		if (void 0 !== s) return s.exports;
		var r = (t[i] = { exports: {} });
		return e[i].call(r.exports, r, r.exports, n), r.exports;
	}
	(n.p = "/assets/"),
		(function () {
			"use strict";
			n(863), n(48);
			var e = n.p + "images/brand.b6ec20e5.svg",
				t = n.p + "images/Laptop.e88e8623.png";
			(brandImg.src = e), (t.src = laptopPath);
		})();
})();
