import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as RotateCcw, r as CalendarClock } from "../_libs/lucide-react.mjs";
import { i as motion, n as useSpring, r as useMotionValue, t as useReducedMotion } from "../_libs/framer-motion+[...].mjs";
import { t as format } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BzsVLxYy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var VIEW_W = 1e3;
var VIEW_H = 700;
function hash(i) {
	const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
	return x - Math.floor(x);
}
function spiral(cx, cy, scale, turns, count, rot, seed) {
	return Array.from({ length: count }, (_, i) => {
		const along = i / count * turns;
		const radius = along / turns * scale;
		const angle = along * 3.5 + i % 2 * Math.PI + rot;
		const scatter = (hash(seed + i) - .5) * (6 + along * 4);
		const fade = Math.max(0, 1 - along / (turns + .15));
		return {
			x: cx + Math.cos(angle) * radius + scatter,
			y: cy + Math.sin(angle) * radius * .46 + scatter * .32,
			r: along < .45 ? 1.6 : .65,
			o: .08 + fade * (i % 6 === 0 ? .7 : .42),
			gold: i % 6 === 0,
			delay: 0
		};
	});
}
var MAIN_GALAXY = spiral(790, 150, 250, 3.2, 640, .4, 20);
var FAR_GALAXY = spiral(150, 130, 110, 2.5, 180, 1.1, 90);
var STARS$1 = Array.from({ length: 200 }, (_, i) => ({
	x: hash(i + 1) * VIEW_W,
	y: hash(i + 19) * VIEW_H,
	r: hash(i + 3) < .9 ? .5 + hash(i + 7) * .9 : 1.5 + hash(i + 11) * .8,
	o: .45 + hash(i + 13) * .55,
	gold: hash(i + 23) > .9,
	delay: hash(i + 29) * 6
}));
var FLARES = STARS$1.filter((_, i) => hash(i + 41) > .97);
function StarryBackground() {
	const [live, setLive] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setLive(true), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: `0 0 ${VIEW_W} ${VIEW_H}`,
		preserveAspectRatio: "xMidYMid slice",
		className: "absolute inset-0 h-full w-full",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", {
					id: "wash-gold",
					cx: "50%",
					cy: "50%",
					r: "50%",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0%",
						stopColor: "rgb(212, 180, 131)",
						stopOpacity: "0.22"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "100%",
						stopColor: "rgb(212, 180, 131)",
						stopOpacity: "0"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", {
					id: "wash-teal",
					cx: "50%",
					cy: "50%",
					r: "50%",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0%",
						stopColor: "rgb(78, 118, 114)",
						stopOpacity: "0.2"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "100%",
						stopColor: "rgb(78, 118, 114)",
						stopOpacity: "0"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", {
					id: "wash-amber",
					cx: "50%",
					cy: "50%",
					r: "50%",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0%",
						stopColor: "rgb(168, 122, 74)",
						stopOpacity: "0.18"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "100%",
						stopColor: "rgb(168, 122, 74)",
						stopOpacity: "0"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", {
					id: "core-main",
					cx: "50%",
					cy: "50%",
					r: "50%",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0%",
							stopColor: "rgb(244, 239, 230)",
							stopOpacity: "0.85"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "28%",
							stopColor: "rgb(212, 180, 131)",
							stopOpacity: "0.28"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "100%",
							stopColor: "rgb(212, 180, 131)",
							stopOpacity: "0"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", {
					id: "core-far",
					cx: "50%",
					cy: "50%",
					r: "50%",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0%",
						stopColor: "rgb(244, 239, 230)",
						stopOpacity: "0.45"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "100%",
						stopColor: "rgb(244, 239, 230)",
						stopOpacity: "0"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
					id: "meteor-stroke",
					x1: "0",
					y1: "0",
					x2: "1",
					y2: "0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0%",
						stopColor: "rgb(244, 239, 230)",
						stopOpacity: "0"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "100%",
						stopColor: "rgb(244, 239, 230)",
						stopOpacity: "0.9"
					})]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: VIEW_W,
				height: VIEW_H,
				fill: "#07060b"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "790",
				cy: "140",
				rx: "320",
				ry: "180",
				fill: "url(#wash-gold)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "230",
				cy: "470",
				rx: "380",
				ry: "140",
				fill: "url(#wash-teal)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "640",
				cy: "610",
				rx: "420",
				ry: "110",
				fill: "url(#wash-amber)"
			}),
			live ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
					className: "galaxy-spin",
					children: [MAIN_GALAXY.map((dot, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: dot.x,
						cy: dot.y,
						r: dot.r,
						fill: dot.gold ? "rgb(212, 180, 131)" : "rgb(244, 239, 230)",
						opacity: dot.o
					}, `g-${i}`)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "790",
						cy: "150",
						r: "46",
						fill: "url(#core-main)"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
					className: "galaxy-spin-slow",
					children: [FAR_GALAXY.map((dot, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: dot.x,
						cy: dot.y,
						r: dot.r,
						fill: "rgb(244, 239, 230)",
						opacity: dot.o * .7
					}, `f-${i}`)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "150",
						cy: "130",
						r: "22",
						fill: "url(#core-far)"
					})]
				}),
				STARS$1.map((star, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: star.x,
					cy: star.y,
					r: star.r,
					fill: star.gold ? "rgb(212, 180, 131)" : "rgb(244, 239, 230)",
					opacity: star.o,
					className: "twinkle",
					style: { animationDelay: `${star.delay.toFixed(2)}s` }
				}, `s-${i}`)),
				FLARES.map((star, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
					className: "twinkle",
					style: { animationDelay: `${star.delay.toFixed(2)}s` },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
						x1: star.x - 7,
						y1: star.y,
						x2: star.x + 7,
						y2: star.y,
						stroke: "rgb(244, 239, 230)",
						strokeWidth: "0.6",
						opacity: "0.45"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
						x1: star.x,
						y1: star.y - 7,
						x2: star.x,
						y2: star.y + 7,
						stroke: "rgb(244, 239, 230)",
						strokeWidth: "0.6",
						opacity: "0.45"
					})]
				}, `fl-${i}`)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
					className: "meteor meteor-a",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
						x1: "0",
						y1: "0",
						x2: "70",
						y2: "0",
						stroke: "url(#meteor-stroke)",
						strokeWidth: "1.2"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
					className: "meteor meteor-b",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
						x1: "0",
						y1: "0",
						x2: "54",
						y2: "0",
						stroke: "url(#meteor-stroke)",
						strokeWidth: "1"
					})
				})
			] }) : null
		]
	});
}
function CountdownBackground({ imageUrl }) {
	const reduce = useReducedMotion();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none fixed inset-0 z-0 overflow-hidden bg-ink",
		children: [
			imageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: reduce ? false : {
					scale: 1.08,
					opacity: 0
				},
				animate: {
					scale: 1,
					opacity: 1
				},
				transition: {
					duration: 1.4,
					ease: "easeOut"
				},
				className: "absolute inset-0 bg-cover bg-center bg-no-repeat",
				style: { backgroundImage: `url(${imageUrl})` }
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: imageUrl ? "absolute inset-0 opacity-45" : "absolute inset-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StarryBackground, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "vignette-rise absolute inset-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "vignette-radial absolute inset-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grain absolute inset-0" })
		]
	});
}
var STARS = [
	[48, 98],
	[92, 68],
	[136, 90],
	[168, 132],
	[214, 102],
	[258, 64],
	[304, 46],
	[328, 86],
	[276, 124],
	[220, 158]
];
var LINES = [
	"M48 98 L92 68 L136 90 L168 132 L214 102 L258 64 L304 46",
	"M304 46 L328 86",
	"M258 64 L276 124 L220 158"
];
function Constellation() {
	const reduce = useReducedMotion();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 360 190",
		className: "h-auto w-full text-gold",
		fill: "none",
		"aria-hidden": "true",
		children: [LINES.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.path, {
			d,
			stroke: "currentColor",
			strokeWidth: "0.75",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			initial: reduce ? false : {
				pathLength: 0,
				opacity: .2
			},
			animate: {
				pathLength: 1,
				opacity: .75
			},
			transition: {
				duration: 1.8,
				ease: "easeInOut",
				delay: .08 * i
			}
		}, d)), STARS.map(([cx, cy], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx,
			cy,
			r: "6",
			fill: "currentColor",
			opacity: "0.14"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.circle, {
			cx,
			cy,
			r: "1.7",
			fill: "currentColor",
			initial: reduce ? false : { opacity: 0 },
			animate: { opacity: 1 },
			transition: {
				duration: .5,
				delay: .12 + i * .04
			}
		})] }, `${cx}-${cy}`))]
	});
}
/** Tropical calendar season, the dates people actually mean by Capricorn. */
var INGRESS_MONTH = 11;
var INGRESS_DAY = 22;
var CLOSE_MONTH = 0;
var CLOSE_DAY = 19;
var MARK_KEY = "capricorn-mark";
function atDay(year, month, day, end = false) {
	return end ? new Date(year, month, day, 23, 59, 59, 999) : new Date(year, month, day, 0, 0, 0, 0);
}
function seasonAround(now) {
	const year = now.getFullYear();
	const month = now.getMonth();
	const day = now.getDate();
	if (month === CLOSE_MONTH && day <= CLOSE_DAY) return {
		start: atDay(year - 1, INGRESS_MONTH, INGRESS_DAY),
		end: atDay(year, CLOSE_MONTH, CLOSE_DAY, true)
	};
	if (month === INGRESS_MONTH && day >= INGRESS_DAY) return {
		start: atDay(year, INGRESS_MONTH, INGRESS_DAY),
		end: atDay(year + 1, CLOSE_MONTH, CLOSE_DAY, true)
	};
	return {
		start: atDay(year, INGRESS_MONTH, INGRESS_DAY),
		end: atDay(year + 1, CLOSE_MONTH, CLOSE_DAY, true)
	};
}
function skyPhase(now) {
	const { start, end } = seasonAround(now);
	if (now.getTime() >= start.getTime() && now.getTime() <= end.getTime()) return {
		kind: "in-season",
		target: end,
		seasonStart: start,
		seasonEnd: end
	};
	return {
		kind: "approaching",
		target: start,
		seasonStart: start,
		seasonEnd: end
	};
}
function approachOpened(seasonStart) {
	return atDay(seasonStart.getFullYear(), CLOSE_MONTH, 20);
}
function seasonProgress(now, phase) {
	const start = phase.kind === "in-season" ? phase.seasonStart : approachOpened(phase.seasonStart);
	const span = (phase.kind === "in-season" ? phase.seasonEnd : phase.seasonStart).getTime() - start.getTime();
	if (span <= 0) return 0;
	return clamp((now.getTime() - start.getTime()) / span);
}
function remainingUntil(target, now) {
	const ms = Math.max(0, target.getTime() - now.getTime());
	const seconds = Math.floor(ms / 1e3);
	return {
		days: Math.floor(seconds / 86400),
		hours: Math.floor(seconds % 86400 / 3600),
		minutes: Math.floor(seconds % 3600 / 60),
		seconds: seconds % 60
	};
}
function readMark() {
	try {
		const raw = localStorage.getItem(MARK_KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		if (typeof parsed.iso !== "string") return null;
		const when = new Date(parsed.iso);
		if (Number.isNaN(when.getTime())) return null;
		const name = typeof parsed.name === "string" ? parsed.name.slice(0, 48) : "";
		return {
			iso: parsed.iso,
			name
		};
	} catch {
		return null;
	}
}
function writeMark(mark) {
	if (!mark) {
		localStorage.removeItem(MARK_KEY);
		return;
	}
	localStorage.setItem(MARK_KEY, JSON.stringify({
		iso: mark.iso,
		name: mark.name.slice(0, 48)
	}));
}
function resolveClock(now, mark) {
	const phase = skyPhase(now);
	if (mark) {
		const when = new Date(mark.iso);
		if (when.getTime() > now.getTime()) return {
			mode: "mark",
			phase,
			target: when,
			name: mark.name.trim() || "Your hour"
		};
	}
	return {
		mode: "sky",
		phase,
		target: phase.target,
		name: phase.kind === "in-season" ? "Until the season closes" : "Until the Sun enters Capricorn"
	};
}
function narrative(mode, phase) {
	if (mode === "mark") return {
		deck: "A private hour, kept against the stars.",
		caption: "Your clock"
	};
	if (phase.kind === "in-season") return {
		deck: "The gate is open. Hold the height you earned.",
		caption: "Capricorn, moving through"
	};
	return {
		deck: "The sea-goat is still climbing toward the winter gate.",
		caption: "The year, closing on the gate"
	};
}
function formatTarget(date, mode) {
	return mode === "mark" ? format(date, "d MMMM yyyy · HH:mm") : format(date, "d MMMM yyyy");
}
function toLocalInput(date) {
	const pad = (n) => String(n).padStart(2, "0");
	return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
function clamp(n) {
	return Math.min(1, Math.max(0, n));
}
var TRAITS = [
	{
		title: "Ambition",
		line: "The long ascent"
	},
	{
		title: "Discipline",
		line: "Saturn's measure"
	},
	{
		title: "Legacy",
		line: "What the climb keeps"
	}
];
var rise = {
	hidden: {
		opacity: 0,
		y: 12,
		filter: "blur(6px)"
	},
	show: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: {
			duration: .5,
			ease: "easeOut"
		}
	}
};
function CapricornCountdown() {
	const reduce = useReducedMotion();
	const [now, setNow] = (0, import_react.useState)(null);
	const [mark, setMark] = (0, import_react.useState)(null);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [nameInput, setNameInput] = (0, import_react.useState)("");
	const [whenInput, setWhenInput] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const shiftX = useMotionValue(0);
	const shiftY = useMotionValue(0);
	const skyX = useSpring(shiftX, {
		stiffness: 28,
		damping: 18,
		mass: .7
	});
	const skyY = useSpring(shiftY, {
		stiffness: 28,
		damping: 18,
		mass: .7
	});
	(0, import_react.useEffect)(() => {
		const clockNow = /* @__PURE__ */ new Date();
		const stored = readMark();
		const fresh = stored && new Date(stored.iso).getTime() > clockNow.getTime() ? stored : null;
		if (stored && !fresh) writeMark(null);
		setMark(fresh);
		setNameInput(fresh?.name ?? "");
		setWhenInput(toLocalInput(fresh ? new Date(fresh.iso) : skyPhase(clockNow).seasonStart));
		setNow(clockNow);
		let timer = 0;
		const tick = () => {
			setNow(/* @__PURE__ */ new Date());
			timer = window.setTimeout(tick, 1e3 - Date.now() % 1e3);
		};
		timer = window.setTimeout(tick, 1e3 - Date.now() % 1e3);
		return () => window.clearTimeout(timer);
	}, []);
	function onMove(event) {
		if (reduce || event.pointerType !== "mouse") return;
		const rect = event.currentTarget.getBoundingClientRect();
		const px = (event.clientX - rect.left) / rect.width - .5;
		const py = (event.clientY - rect.top) / rect.height - .5;
		shiftX.set(px * 16);
		shiftY.set(py * 10);
	}
	function onLeave() {
		shiftX.set(0);
		shiftY.set(0);
	}
	function onSave(event) {
		event.preventDefault();
		const when = new Date(whenInput);
		if (Number.isNaN(when.getTime()) || when.getTime() <= Date.now()) {
			setError("Choose an hour that has not passed.");
			return;
		}
		const next = {
			iso: when.toISOString(),
			name: nameInput.trim().slice(0, 48)
		};
		writeMark(next);
		setMark(next);
		setError("");
		setOpen(false);
	}
	function onSky() {
		writeMark(null);
		setMark(null);
		setNameInput("");
		setError("");
		if (now) setWhenInput(toLocalInput(skyPhase(now).seasonStart));
		setOpen(false);
	}
	const clock = now ? resolveClock(now, mark) : null;
	const parts = clock && now ? remainingUntil(clock.target, now) : null;
	const copy = clock ? narrative(clock.mode, clock.phase) : null;
	const progress = clock && now && clock.mode === "sky" ? seasonProgress(now, clock.phase) : null;
	const spoken = parts ? `${parts.days} days, ${parts.hours} hours, and ${parts.minutes} minutes. ${clock?.name ?? ""}` : "Counting toward Capricorn.";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative z-10 flex min-h-dvh flex-col",
		onPointerMove: onMove,
		onPointerLeave: onLeave,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CountdownBackground, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "sr-only",
				"aria-live": "polite",
				children: spoken
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative flex min-h-56 flex-1 items-center justify-center px-6 pt-16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					style: {
						x: skyX,
						y: skyY
					},
					className: "w-full max-w-lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: reduce ? void 0 : "sky-drift",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Constellation, {})
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "relative border-t border-line bg-ink/75 px-5 pt-8 pb-24 backdrop-blur-md sm:px-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					className: "mx-auto flex w-full max-w-3xl flex-col gap-8",
					initial: reduce ? "show" : "hidden",
					animate: "show",
					variants: { show: { transition: {
						staggerChildren: .05,
						delayChildren: .05
					} } },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.header, {
							variants: rise,
							className: "flex flex-col gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs tracking-widest text-gold uppercase",
									children: "Saturn · Earth · Cardinal"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "font-display text-6xl leading-none font-medium text-ivory sm:text-8xl",
									children: "Capricorn"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "max-w-xl font-display text-xl text-stone italic sm:text-2xl text-balance",
									children: copy?.deck ?? "The sea-goat keeps the winter gate."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							variants: rise,
							className: "flex flex-col gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm tracking-wide text-ivory",
									children: clock?.name ?? "The winter gate"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
									"aria-hidden": "true",
									className: "grid grid-cols-4 gap-2 sm:gap-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Unit, {
											label: "Days",
											value: parts?.days
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Unit, {
											label: "Hours",
											value: parts?.hours
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Unit, {
											label: "Min",
											value: parts?.minutes
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Unit, {
											label: "Sec",
											value: parts?.seconds
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-stone",
									children: clock ? formatTarget(clock.target, clock.mode) : "22 December"
								})
							]
						}),
						progress !== null && copy ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							variants: rise,
							className: "flex flex-col gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-px w-full bg-line",
								role: "progressbar",
								"aria-valuemin": 0,
								"aria-valuemax": 100,
								"aria-valuenow": Math.round(progress * 100),
								"aria-label": copy.caption,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-px bg-gold transition-[width] duration-700 ease-out",
									style: { width: `${Math.round(progress * 100)}%` }
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs tracking-widest text-stone uppercase",
								children: copy.caption
							})]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.ul, {
							variants: rise,
							className: "grid grid-cols-3 gap-3 border-t border-line pt-6",
							children: TRAITS.map((trait) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-ivory",
									children: trait.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-stone",
									children: trait.line
								})]
							}, trait.title))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							variants: rise,
							className: "flex flex-col gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										className: "ghost-btn",
										onClick: () => setOpen((v) => !v),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, {
											className: "size-4",
											"aria-hidden": "true"
										}), open ? "Close" : mark ? "Edit the hour" : "Mark an hour"]
									}), mark ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										className: "ghost-btn",
										onClick: onSky,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {
											className: "size-4",
											"aria-hidden": "true"
										}), "Return to the sky"]
									}) : null]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "overflow-hidden",
										inert: open ? void 0 : true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
											onSubmit: onSave,
											className: "flex flex-col gap-4 border border-line p-4",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
													className: "flex flex-col gap-2 text-xs tracking-widest text-stone uppercase",
													children: ["Name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														value: nameInput,
														onChange: (event) => setNameInput(event.target.value),
														maxLength: 48,
														placeholder: "Birthday, launch, return",
														className: "h-11 w-full min-w-0 border border-line bg-ink px-3 text-sm tracking-normal text-ivory normal-case placeholder:text-stone"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
													className: "flex flex-col gap-2 text-xs tracking-widest text-stone uppercase",
													children: ["Hour", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "datetime-local",
														required: true,
														value: whenInput,
														onChange: (event) => {
															setWhenInput(event.target.value);
															setError("");
														},
														className: "h-11 w-full min-w-0 border border-line bg-ink px-3 text-sm tracking-normal text-ivory normal-case"
													})]
												}),
												error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-sm text-gold",
													children: error
												}) : null,
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex flex-wrap gap-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "submit",
														className: "solid-btn",
														children: "Keep this hour"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														className: "ghost-btn",
														onClick: onSky,
														children: "Use the sky"
													})]
												})
											]
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs tracking-widest text-stone uppercase",
									children: "Tropical season · 22 December – 19 January"
								})
							]
						})
					]
				})
			})
		]
	});
}
function Unit({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "min-w-0 border border-line bg-ink/50 px-1 py-3 text-center sm:px-4 sm:py-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-light text-3xl leading-none text-ivory tabular-nums sm:text-6xl",
			children: value === void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-stone",
				children: "00"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Digit, { value })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-xs tracking-widest text-stone uppercase",
			children: label
		})]
	});
}
function Digit({ value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-ivory tabular-nums",
		children: String(value).padStart(2, "0")
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CapricornCountdown, {});
}
//#endregion
export { Home as component };
