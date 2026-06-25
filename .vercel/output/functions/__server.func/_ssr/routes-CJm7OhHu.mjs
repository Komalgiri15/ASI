import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
import { C as ArrowLeft, S as ArrowRight, _ as ChevronRight, a as X, b as BookOpen, c as Sparkles, d as Lock, f as Image, g as ChevronUp, h as CircleCheck, i as Zap, l as RefreshCw, m as CircleQuestionMark, n as ZoomOut, o as Trophy, p as Circle, r as ZoomIn, s as Target, t as lucide_react_exports, u as Play, v as ChevronDown, x as Award, y as Check } from "../_libs/lucide-react.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CJm7OhHu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function makeQ(id, prompt, correct, distractors) {
	const opts = [correct, ...distractors];
	const seed = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
	const shuffled = [...opts].map((o, i) => ({
		o,
		k: (seed * 9301 + i * 49297) % 233280
	})).sort((a, b) => a.k - b.k).map((x) => x.o);
	return {
		id,
		prompt,
		options: shuffled,
		correctIndex: shuffled.indexOf(correct)
	};
}
var LEVELS = [{
	id: "lvl-1",
	number: 1,
	name: "Professional Claim — Case 1",
	caseName: "GRIEGO, DAVID L",
	outcomes: [
		"Identify CMS vs UB claim from Place of Service",
		"Locate key claim header data (UMID, dates, charges)",
		"Read billing & rendering provider blocks"
	],
	images: [{
		title: "eHUB Transaction Viewer",
		subtitle: "Professional Claim Summary",
		patientName: "GRIEGO, DAVID L",
		claimType: "CMS — Professional",
		fields: [
			{
				key: "dob",
				label: "Date of Birth",
				value: "08/22/1959",
				icon: "Calendar"
			},
			{
				key: "umid",
				label: "Member UMID",
				value: "H67409890",
				icon: "IdCard"
			},
			{
				key: "rcv",
				label: "Received Date",
				value: "01/29/2025",
				icon: "Inbox"
			},
			{
				key: "dos",
				label: "Date of Service",
				value: "01/16/2025",
				icon: "CalendarDays"
			},
			{
				key: "pos",
				label: "Place of Service",
				value: "24 — Ambulatory Surgical Center",
				icon: "Building2"
			},
			{
				key: "lines",
				label: "Service Lines",
				value: "1 Line",
				icon: "ListOrdered"
			},
			{
				key: "charge",
				label: "Total Charge",
				value: "$1,746.00",
				icon: "DollarSign"
			},
			{
				key: "dx",
				label: "Diagnosis Code",
				value: "H02135",
				icon: "Stethoscope"
			}
		]
	}, {
		title: "837 — Provider Information",
		subtitle: "Professional",
		patientName: "GRIEGO, DAVID L",
		claimType: "Provider Block",
		fields: [
			{
				key: "billing",
				label: "Billing Provider",
				value: "PARK AVE OCULOPLASTIC SURGEONS PAOS",
				icon: "Hospital"
			},
			{
				key: "rendering",
				label: "Rendering Provider",
				value: "Yash, Vaishnav",
				icon: "UserRound"
			},
			{
				key: "tax",
				label: "Tax ID (TIN)",
				value: "201418623",
				icon: "Hash"
			},
			{
				key: "addr",
				label: "Billing Address",
				value: "1800 Emerson Street, Suite 200, Denver, CO 802181080",
				icon: "MapPin"
			},
			{
				key: "npi",
				label: "NPI",
				value: "1700XXXXXX",
				icon: "ShieldCheck"
			},
			{
				key: "taxonomy",
				label: "Taxonomy",
				value: "207W00000X — Ophthalmology",
				icon: "Briefcase"
			}
		]
	}],
	questions: [
		makeQ("l1q1", "Is this a CMS or UB hospital claim?", "CMS claim (Place of Service 24)", [
			"UB hospital claim (inpatient)",
			"UB hospital claim (outpatient)",
			"Dental claim"
		]),
		makeQ("l1q2", "When did Humana receive the claim?", "01/29/2025", [
			"01/16/2025",
			"01/27/2025",
			"02/01/2025"
		]),
		makeQ("l1q3", "What are the Dates of Service?", "01/16/2025", [
			"01/29/2025",
			"01/13/2025",
			"08/22/1959"
		]),
		makeQ("l1q4", "What is the Member's ID / UMID?", "H67409890", [
			"H04052170",
			"H67049980",
			"H67400989"
		]),
		makeQ("l1q5", "What is the Place of Service?", "24 — Ambulatory Surgical Center", [
			"11 — Office",
			"22 — Outpatient Hospital",
			"21 — Inpatient Hospital"
		]),
		makeQ("l1q6", "Who is the billing provider?", "PARK AVE OCULOPLASTIC SURGEONS PAOS", [
			"TIM LONG MD PSC",
			"DENVER EYE SURGEONS LLC",
			"EMERSON OPHTHALMOLOGY PC"
		]),
		makeQ("l1q7", "Who is the rendering provider?", "Yash, Vaishnav", [
			"Timothy, Long",
			"Vaishnav, Park",
			"David, Griego"
		]),
		makeQ("l1q8", "What is the tax ID number?", "201418623", [
			"371420890",
			"210148623",
			"204118623"
		]),
		makeQ("l1q9", "What is the billing provider's address?", "1800 Emerson Street, Suite 200, Denver, CO 802181080", [
			"1320 Andrea St, Bowling Green, KY 421043334",
			"1800 Emerson Street, Suite 100, Denver, CO 802181080",
			"200 Park Avenue, New York, NY 100170000"
		]),
		makeQ("l1q10", "How many services were billed?", "1 Line", [
			"2 Lines",
			"3 Lines",
			"4 Lines"
		]),
		makeQ("l1q11", "What is the charge amount of the first line item?", "$1,746.00", [
			"$1,476.00",
			"$746.00",
			"$1,946.00"
		]),
		makeQ("l1q12", "What is the diagnosis code?", "H02135", [
			"Z23",
			"H02315",
			"H21035"
		])
	]
}, {
	id: "lvl-2",
	number: 2,
	name: "Professional Claim — Case 2",
	caseName: "GOAD, JAMES DAVID",
	outcomes: [
		"Recognize an office-based (POS 11) professional claim",
		"Distinguish total claim charge vs. first-line charge",
		"Map provider info to TIN and address fields"
	],
	images: [{
		title: "eHUB Transaction Viewer",
		subtitle: "Professional Claim Summary",
		patientName: "GOAD, JAMES DAVID",
		claimType: "CMS — Professional",
		fields: [
			{
				key: "umid",
				label: "Member UMID",
				value: "H04052170",
				icon: "IdCard"
			},
			{
				key: "rcv",
				label: "Received Date",
				value: "01/27/2025",
				icon: "Inbox"
			},
			{
				key: "dos",
				label: "Date of Service",
				value: "01/13/2025",
				icon: "CalendarDays"
			},
			{
				key: "pos",
				label: "Place of Service",
				value: "11 — Office",
				icon: "Building2"
			},
			{
				key: "lines",
				label: "Service Lines",
				value: "2 Lines",
				icon: "ListOrdered"
			},
			{
				key: "line1",
				label: "Line 1 Charge",
				value: "$40.00",
				icon: "DollarSign"
			},
			{
				key: "charge",
				label: "Total Charge",
				value: "$75.00",
				icon: "Wallet"
			},
			{
				key: "dx",
				label: "Diagnosis Code",
				value: "Z23",
				icon: "Stethoscope"
			}
		]
	}, {
		title: "837 — Provider Information",
		subtitle: "Professional",
		patientName: "GOAD, JAMES DAVID",
		claimType: "Provider Block",
		fields: [
			{
				key: "billing",
				label: "Billing Provider",
				value: "TIM LONG MD PSC",
				icon: "Hospital"
			},
			{
				key: "rendering",
				label: "Rendering Provider",
				value: "Timothy, Long",
				icon: "UserRound"
			},
			{
				key: "tax",
				label: "Tax ID (TIN)",
				value: "371420890",
				icon: "Hash"
			},
			{
				key: "addr",
				label: "Billing Address",
				value: "1320 Andrea St, Bowling Green, KY 421043334",
				icon: "MapPin"
			},
			{
				key: "npi",
				label: "NPI",
				value: "1234XXXXXX",
				icon: "ShieldCheck"
			},
			{
				key: "taxonomy",
				label: "Taxonomy",
				value: "207R00000X — Internal Medicine",
				icon: "Briefcase"
			}
		]
	}],
	questions: [
		makeQ("l2q1", "Is this a CMS or UB hospital claim?", "CMS claim (Place of Service 11)", [
			"UB hospital claim (inpatient)",
			"UB hospital claim (outpatient)",
			"Dental claim"
		]),
		makeQ("l2q2", "When did Humana receive the claim?", "01/27/2025", [
			"01/13/2025",
			"01/29/2025",
			"02/03/2025"
		]),
		makeQ("l2q3", "What are the Dates of Service?", "01/13/2025", [
			"01/27/2025",
			"01/16/2025",
			"01/30/2025"
		]),
		makeQ("l2q4", "What is the Member's ID / UMID?", "H04052170", [
			"H67409890",
			"H40052170",
			"H04025710"
		]),
		makeQ("l2q5", "What is the Place of Service?", "11 — Office", [
			"24 — Ambulatory Surgical Center",
			"22 — Outpatient Hospital",
			"21 — Inpatient Hospital"
		]),
		makeQ("l2q6", "Who is the billing provider?", "TIM LONG MD PSC", [
			"PARK AVE OCULOPLASTIC SURGEONS PAOS",
			"BOWLING GREEN MEDICAL GROUP",
			"ANDREA STREET CLINIC PSC"
		]),
		makeQ("l2q7", "Who is the rendering provider?", "Timothy, Long", [
			"Yash, Vaishnav",
			"Long, Tim",
			"James, Goad"
		]),
		makeQ("l2q8", "What is the tax ID number?", "371420890", [
			"201418623",
			"317420890",
			"371402890"
		]),
		makeQ("l2q9", "What is the billing provider's address?", "1320 Andrea St, Bowling Green, KY 421043334", [
			"1800 Emerson Street, Suite 200, Denver, CO 802181080",
			"1320 Andrea St, Bowling Green, KY 421040000",
			"1230 Andrea St, Bowling Green, KY 421043334"
		]),
		makeQ("l2q10", "How many services were billed?", "2", [
			"1",
			"3",
			"4"
		]),
		makeQ("l2q11", "What is the charge amount of the first line item?", "$40.00", [
			"$75.00",
			"$35.00",
			"$40.50"
		]),
		makeQ("l2q12", "What is the diagnosis code?", "Z23", [
			"H02135",
			"Z32",
			"Z03"
		])
	]
}];
var initialState = {
	currentScreen: "landing",
	currentLevelIndex: 0,
	levels: LEVELS.map((l, i) => ({
		id: l.id,
		unlocked: i === 0,
		completed: false,
		score: 0,
		userAnswers: []
	})),
	totalXP: 0,
	achievements: [],
	imageStudyProgress: {},
	quizState: {
		currentQuestionIndex: 0,
		selectedAnswer: null,
		locked: false,
		answers: []
	}
};
function reducer(state, action) {
	switch (action.type) {
		case "GOTO": return {
			...state,
			currentScreen: action.screen
		};
		case "SELECT_LEVEL": return {
			...state,
			currentLevelIndex: action.index
		};
		case "MARK_IMAGE_STUDIED": {
			const arr = state.imageStudyProgress[action.levelId] ?? [];
			if (arr.includes(action.imageIndex)) return state;
			return {
				...state,
				imageStudyProgress: {
					...state.imageStudyProgress,
					[action.levelId]: [...arr, action.imageIndex]
				}
			};
		}
		case "START_QUIZZ": return {
			...state,
			currentScreen: "quiz",
			quizState: {
				currentQuestionIndex: 0,
				selectedAnswer: null,
				locked: false,
				answers: []
			}
		};
		case "SELECT_ANSWER":
			if (state.quizState.locked) return state;
			return {
				...state,
				quizState: {
					...state.quizState,
					selectedAnswer: action.answer,
					locked: true
				}
			};
		case "NEXT_QUESTION": {
			const level = LEVELS[state.currentLevelIndex];
			const answers = [...state.quizState.answers, state.quizState.selectedAnswer ?? -1];
			const nextIdx = state.quizState.currentQuestionIndex + 1;
			if (nextIdx >= level.questions.length) return {
				...state,
				quizState: {
					...state.quizState,
					answers,
					selectedAnswer: null,
					locked: false
				}
			};
			return {
				...state,
				quizState: {
					currentQuestionIndex: nextIdx,
					selectedAnswer: null,
					locked: false,
					answers
				}
			};
		}
		case "COMPLETE_LEVEL": {
			const idx = state.currentLevelIndex;
			const level = LEVELS[idx];
			const answers = state.quizState.answers;
			let correct = 0;
			level.questions.forEach((q, i) => {
				if (answers[i] === q.correctIndex) correct++;
			});
			const accuracy = correct / level.questions.length;
			const xpEarned = correct * 10 + (accuracy >= .8 ? 50 : 0);
			const levels = state.levels.map((l, i) => {
				if (i === idx) return {
					...l,
					completed: true,
					score: correct,
					userAnswers: answers
				};
				if (i === idx + 1) return {
					...l,
					unlocked: true
				};
				return l;
			});
			const achievements = new Set(state.achievements);
			if (idx === 0) achievements.add("First Steps");
			if (accuracy === 1) achievements.add("Perfect Score");
			if (level.number === 2) achievements.add("Claims Expert");
			if (levels.every((l) => l.completed)) achievements.add("Speed Learner");
			return {
				...state,
				levels,
				totalXP: state.totalXP + xpEarned,
				achievements: Array.from(achievements),
				currentScreen: "levelComplete"
			};
		}
		case "RETRY_LEVEL": return {
			...state,
			currentScreen: "levelIntro",
			quizState: {
				currentQuestionIndex: 0,
				selectedAnswer: null,
				locked: false,
				answers: []
			}
		};
		case "RESET": return initialState;
		default: return state;
	}
}
var GameContext = (0, import_react.createContext)(null);
function GameProvider({ children }) {
	const [state, dispatch] = (0, import_react.useReducer)(reducer, initialState);
	const value = (0, import_react.useMemo)(() => ({
		state,
		dispatch
	}), [state]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameContext.Provider, {
		value,
		children
	});
}
function useGame() {
	const ctx = (0, import_react.useContext)(GameContext);
	if (!ctx) throw new Error("useGame must be used within GameProvider");
	return ctx;
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function HumanaWordmark({ className, glow }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("font-display font-bold tracking-tight", glow && "drop-shadow-[0_0_24px_color-mix(in_oklab,var(--brand)_60%,transparent)]", className),
		style: { color: "var(--brand)" },
		children: ["Humana", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-white/90",
			children: "."
		})]
	});
}
var intro_default = "/assets/intro-U_WmX6kO.mp4";
function Landing() {
	const { dispatch } = useGame();
	const [videoEnded, setVideoEnded] = (0, import_react.useState)(false);
	const [showTitleOverlay, setShowTitleOverlay] = (0, import_react.useState)(false);
	const videoRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (videoRef.current) videoRef.current.play().catch((err) => {
			console.log("Autoplay was prevented. Waiting for user interaction or playing muted.", err);
		});
	}, []);
	const handleSkip = () => {
		setVideoEnded(true);
	};
	const handleStart = () => {
		dispatch({
			type: "GOTO",
			screen: "journey"
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative h-full w-full overflow-hidden bg-[#0a0a18]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
				ref: videoRef,
				src: intro_default,
				autoPlay: true,
				muted: true,
				playsInline: true,
				onEnded: () => setVideoEnded(true),
				onTimeUpdate: (e) => {
					if (e.currentTarget.currentTime >= 6) setShowTitleOverlay(true);
					else setShowTitleOverlay(false);
				},
				className: "absolute inset-0 h-full w-full object-cover transition-all duration-700",
				style: { filter: videoEnded ? "blur(8px) brightness(0.4)" : "none" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: showTitleOverlay && !videoEnded && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: {
					opacity: 0,
					y: 15
				},
				animate: {
					opacity: 1,
					y: 0
				},
				exit: {
					opacity: 0,
					y: -10
				},
				transition: {
					duration: .8,
					ease: "easeOut"
				},
				className: "absolute bottom-[28%] left-1/2 z-10 -translate-x-1/2 text-center pointer-events-none select-none",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center gap-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-[#25BB64] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]",
							children: "Humana."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "font-display text-4xl sm:text-5xl font-bold tracking-tight text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]",
							children: ["eHUB ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[#E9F8F0]",
								children: "Challenge"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: { width: 0 },
							animate: { width: 120 },
							transition: {
								delay: .3,
								duration: .5
							},
							className: "h-[2.5px] rounded-full bg-[#FFD700] shadow-[0_0_10px_#FFD700,0_1px_3px_rgba(0,0,0,0.5)]"
						})
					]
				})
			}) }),
			!videoEnded && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: handleSkip,
				className: "absolute top-6 right-6 z-20 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-4 py-2 font-display text-xs font-semibold uppercase tracking-wider text-white/80 backdrop-blur transition-all duration-200 hover:bg-black/60 hover:text-white cursor-pointer",
				children: "Skip Intro"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: videoEnded && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 z-30 flex items-center justify-center bg-black/40 px-6 backdrop-blur-[2px]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						opacity: 0,
						scale: .9,
						y: 20
					},
					animate: {
						opacity: 1,
						scale: 1,
						y: 0
					},
					exit: {
						opacity: 0,
						scale: .9,
						y: 20
					},
					transition: {
						type: "spring",
						duration: .5,
						bounce: .3
					},
					className: "w-full max-w-md rounded-3xl border border-white/10 bg-black/60 p-8 text-center text-white shadow-2xl backdrop-blur-md",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: -10
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: { delay: .2 },
						className: "flex flex-col items-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HumanaWordmark, {
								glow: true,
								className: "text-4xl"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "mt-4 font-display text-4xl font-bold leading-tight tracking-tight",
								children: ["eHUB ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: { color: "var(--brand)" },
									children: "Challenge"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-white/70 text-sm max-w-xs leading-relaxed",
								children: "Master claims processing through gamified case studies. Study real claim screens, answer rapid-fire questions, and earn XP."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
								initial: {
									opacity: 0,
									scale: .95
								},
								animate: {
									opacity: 1,
									scale: 1
								},
								transition: { delay: .4 },
								whileHover: { scale: 1.05 },
								whileTap: { scale: .97 },
								onClick: handleStart,
								className: "pulse-glow mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full py-4 font-display text-lg font-semibold text-white transition-shadow cursor-pointer",
								style: { backgroundColor: "var(--brand)" },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-5 w-5 fill-white" }), "Start Game"]
							})
						]
					})
				})
			}) })
		]
	});
}
function ProgressBar({ value, max, className, showLabel }) {
	const [w, setW] = (0, import_react.useState)(0);
	const pct = Math.max(0, Math.min(1, value / Math.max(1, max)));
	(0, import_react.useEffect)(() => {
		const id = requestAnimationFrame(() => setW(pct * 100));
		return () => cancelAnimationFrame(id);
	}, [pct]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative h-2 w-full rounded-full bg-border overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "absolute inset-y-0 left-0 rounded-full",
				style: { background: "var(--gradient-brand)" },
				initial: { width: 0 },
				animate: { width: `${w}%` },
				transition: {
					duration: .7,
					ease: "easeOut"
				}
			})
		}), showLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-1 text-[11px] text-muted-foreground tabular-nums",
			children: [
				value,
				" / ",
				max
			]
		})]
	});
}
function Journey() {
	const { state, dispatch } = useGame();
	const completed = state.levels.filter((l) => l.completed).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full w-full flex-col overflow-hidden bg-brand-soft",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-border bg-card/80 px-6 py-4 backdrop-blur sm:flex sm:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 items-center gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => dispatch({
							type: "GOTO",
							screen: "landing"
						}),
						className: "rounded-full p-2 hover:bg-accent",
						"aria-label": "Back",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HumanaWordmark, { className: "text-xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden text-sm text-muted-foreground sm:inline",
						children: "Your Journey"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex shrink-0 items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden sm:block w-48",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressBar, {
						value: completed,
						max: LEVELS.length
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-1 text-[11px] text-muted-foreground",
						children: [
							completed,
							" / ",
							LEVELS.length,
							" levels"
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 rounded-full px-4 py-2 font-display font-bold",
					style: {
						backgroundColor: "var(--gold)",
						color: "#3a2a00"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-4 w-4 fill-current" }),
						state.totalXP,
						" XP"
					]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex-1 overflow-auto px-6 py-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-5xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h2, {
						initial: {
							opacity: 0,
							y: 10
						},
						animate: {
							opacity: 1,
							y: 0
						},
						className: "font-display text-3xl sm:text-4xl font-bold",
						children: "The Path of the Claims Expert"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-muted-foreground",
						children: "Each level is a real case. Study the claim card, then prove what you saw."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative mt-12 space-y-12",
						children: LEVELS.map((level, i) => {
							const st = state.levels[i];
							const isCurrent = !st.completed && st.unlocked;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [i < LEVELS.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"aria-hidden": true,
									className: "absolute left-1/2 top-full h-12 w-px -translate-x-1/2 border-l-2 border-dashed border-primary/40"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									initial: {
										opacity: 0,
										y: 24
									},
									animate: {
										opacity: 1,
										y: 0
									},
									transition: { delay: i * .1 },
									className: `mx-auto max-w-2xl rounded-3xl border bg-card p-6 shadow-card ${isCurrent ? "border-primary shadow-glow" : "border-border"}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start gap-5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: `relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl font-display text-2xl font-bold ${!st.unlocked ? "bg-muted text-muted-foreground" : ""} ${isCurrent ? "text-white" : ""}`,
											style: st.unlocked && !st.completed ? { background: "var(--gradient-brand)" } : st.completed ? { backgroundColor: "var(--brand)" } : void 0,
											children: [st.completed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-8 w-8 text-white" }) : !st.unlocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-7 w-7" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: isCurrent ? "text-white" : "",
												children: level.number
											}), isCurrent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pulse-glow absolute inset-0 rounded-2xl" })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0 flex-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
														className: "font-display text-xl font-bold truncate",
														children: [
															"Level ",
															level.number,
															": ",
															level.name
														]
													}), st.completed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
														className: "h-4 w-4",
														style: { color: "var(--gold)" }
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "mt-1 text-sm text-muted-foreground",
													children: ["Case: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-mono",
														children: level.caseName
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "mt-3 flex flex-wrap items-center gap-2 text-xs",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "rounded-full bg-secondary px-3 py-1",
															children: [level.images.length, " images"]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "rounded-full bg-secondary px-3 py-1",
															children: [level.questions.length, " questions"]
														}),
														st.completed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "flex items-center gap-1 rounded-full px-3 py-1 font-semibold text-white",
															style: { backgroundColor: "var(--brand)" },
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-3 w-3" }),
																st.score,
																"/",
																level.questions.length
															]
														})
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "mt-4 flex flex-wrap gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														disabled: !st.unlocked,
														onClick: () => {
															dispatch({
																type: "SELECT_LEVEL",
																index: i
															});
															dispatch({
																type: "GOTO",
																screen: "levelIntro"
															});
														},
														className: "rounded-full px-5 py-2 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-50 hover:opacity-90",
														style: { backgroundColor: "var(--brand)" },
														children: st.completed ? "Replay" : st.unlocked ? "Start Level" : "Locked"
													}), state.levels.every((l) => l.completed) && i === LEVELS.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														onClick: () => dispatch({
															type: "GOTO",
															screen: "finalResults"
														}),
														className: "rounded-full border border-primary px-5 py-2 text-sm font-semibold text-primary",
														children: "View Final Results"
													})]
												})
											]
										})]
									})
								})]
							}, level.id);
						})
					})
				]
			})
		})]
	});
}
function LevelIntro() {
	const { state, dispatch } = useGame();
	const level = LEVELS[state.currentLevelIndex];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-full w-full items-center justify-center bg-brand-soft px-6 py-8 overflow-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				y: 20
			},
			animate: {
				opacity: 1,
				y: 0
			},
			className: "mx-auto w-full max-w-2xl rounded-3xl bg-card p-8 sm:p-10 shadow-card border border-border",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => dispatch({
						type: "GOTO",
						screen: "journey"
					}),
					className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Back to Journey"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-16 w-16 items-center justify-center rounded-2xl font-display text-2xl font-bold text-white",
						style: { background: "var(--gradient-brand)" },
						children: level.number
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs uppercase tracking-[0.18em] text-muted-foreground",
						children: ["Level ", level.number]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-2xl sm:text-3xl font-bold",
						children: level.name
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$1, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-4 w-4" }),
						label: "Images to study",
						value: level.images.length
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$1, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "h-4 w-4" }),
						label: "Questions",
						value: level.questions.length
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-sm font-bold uppercase tracking-wider text-muted-foreground",
						children: "You'll learn to"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-2",
						children: level.outcomes.map((o, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.li, {
							initial: {
								opacity: 0,
								x: -10
							},
							animate: {
								opacity: 1,
								x: 0
							},
							transition: { delay: .1 + i * .08 },
							className: "flex items-start gap-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
								style: { backgroundColor: "var(--brand)" }
							}), o]
						}, i))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
					whileHover: { scale: 1.02 },
					whileTap: { scale: .98 },
					onClick: () => dispatch({
						type: "GOTO",
						screen: "imageStudy"
					}),
					className: "mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 font-display text-lg font-semibold text-white shadow-glow",
					style: { backgroundColor: "var(--brand)" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-5 w-5 fill-white" }), "Start Level"]
				})
			]
		})
	});
}
function Stat$1({ icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl bg-brand-soft p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-primary",
				children: icon
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[11px] uppercase tracking-wider font-medium",
				children: label
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-display text-2xl font-bold mt-1",
			children: value
		})]
	});
}
function FieldIcon({ name, className }) {
	const Cmp = lucide_react_exports[name];
	if (!Cmp) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cmp, { className });
}
function ClaimCard({ data, imageUrl, compact, className }) {
	if (imageUrl) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("overflow-hidden rounded-2xl shadow-card", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: imageUrl,
			alt: data.title,
			className: "w-full h-full object-contain"
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			opacity: 0,
			y: 12
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: {
			duration: .35,
			ease: "easeOut"
		},
		className: cn("bg-card rounded-2xl shadow-card overflow-hidden border border-border/60 flex flex-col", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-5 py-4 text-white",
				style: { backgroundColor: "var(--claim-header)" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] uppercase tracking-[0.18em] opacity-70",
							children: data.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display text-lg sm:text-xl font-semibold truncate",
							children: data.patientName
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "shrink-0 rounded-full bg-white/10 px-3 py-1 text-[10px] uppercase tracking-wider",
						children: data.claimType
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 text-xs opacity-70",
					children: data.subtitle
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px bg-border" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("grid gap-3 p-4 sm:p-5", compact ? "grid-cols-2" : "grid-cols-2 md:grid-cols-3"),
				children: data.fields.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
					type: "button",
					initial: {
						opacity: 0,
						y: 8
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: {
						duration: .3,
						delay: i * .08,
						ease: "easeOut"
					},
					whileHover: {
						scale: 1.02,
						boxShadow: "0 0 0 2px color-mix(in oklab, var(--brand) 35%, transparent)"
					},
					className: "group text-left rounded-xl bg-brand-soft/60 hover:bg-brand-soft p-3 transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldIcon, {
							name: f.icon,
							className: "h-3.5 w-3.5 text-primary"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] uppercase tracking-[0.14em] font-medium",
							children: f.label
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-mono mt-1.5 text-sm sm:text-[15px] font-semibold text-foreground break-words",
						children: f.value
					})]
				}, f.key))
			})
		]
	});
}
function ImageStudy() {
	const { state, dispatch } = useGame();
	const level = LEVELS[state.currentLevelIndex];
	const [idx, setIdx] = (0, import_react.useState)(0);
	const [zoom, setZoom] = (0, import_react.useState)(1);
	const viewed = state.imageStudyProgress[level.id] ?? [];
	const isStudied = viewed.includes(idx);
	const allStudied = level.images.every((_, i) => viewed.includes(i));
	(0, import_react.useEffect)(() => {
		dispatch({
			type: "MARK_IMAGE_STUDIED",
			levelId: level.id,
			imageIndex: idx
		});
	}, [
		idx,
		level.id,
		dispatch
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full w-full flex-col overflow-hidden bg-ink text-white",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-white/10 px-6 py-4 sm:flex sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => dispatch({
							type: "GOTO",
							screen: "levelIntro"
						}),
						className: "rounded-full p-2 hover:bg-white/10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[11px] uppercase tracking-widest text-white/50",
							children: [
								"Level ",
								level.number,
								" · Study"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "font-display text-lg font-bold truncate",
							children: [
								"Image ",
								idx + 1,
								" of ",
								level.images.length
							]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold",
					style: {
						backgroundColor: "var(--gold)",
						color: "#3a2a00"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-3.5 w-3.5" }), "Study Mode"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 overflow-auto px-4 py-6 sm:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-3xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
						mode: "wait",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: {
								opacity: 0,
								scale: .98
							},
							animate: {
								opacity: 1,
								scale: 1
							},
							exit: {
								opacity: 0,
								scale: .98
							},
							transition: { duration: .25 },
							style: {
								transform: `scale(${zoom})`,
								transformOrigin: "top center"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClaimCard, { data: level.images[idx] })
						}, idx)
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-white/10 px-6 py-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-3xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setIdx((i) => Math.max(0, i - 1)),
									disabled: idx === 0,
									className: "rounded-full border border-white/20 p-2 hover:bg-white/10 disabled:opacity-30",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setIdx((i) => Math.min(level.images.length - 1, i + 1)),
									disabled: idx === level.images.length - 1,
									className: "rounded-full border border-white/20 p-2 hover:bg-white/10 disabled:opacity-30",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "ml-2 flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setZoom((z) => Math.max(.7, z - .1)),
										className: "rounded-full border border-white/20 p-2 hover:bg-white/10",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomOut, { className: "h-4 w-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setZoom((z) => Math.min(1.4, z + .1)),
										className: "rounded-full border border-white/20 p-2 hover:bg-white/10",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomIn, { className: "h-4 w-4" })
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex cursor-pointer items-center gap-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: isStudied,
									onChange: () => dispatch({
										type: "MARK_IMAGE_STUDIED",
										levelId: level.id,
										imageIndex: idx
									}),
									className: "peer sr-only"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `flex h-5 w-5 items-center justify-center rounded border-2 transition ${isStudied ? "border-transparent" : "border-white/30"}`,
									style: isStudied ? { backgroundColor: "var(--brand)" } : void 0,
									children: isStudied && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" })
								}),
								"Mark as studied"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-stretch gap-2 sm:items-end",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-44",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressBar, {
									value: viewed.length,
									max: level.images.length
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								disabled: !allStudied,
								onClick: () => dispatch({ type: "START_QUIZZ" }),
								className: "rounded-full px-5 py-2 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-40",
								style: { backgroundColor: "var(--brand)" },
								children: "Proceed to Questions"
							})]
						})
					]
				})
			})
		]
	});
}
function Quiz() {
	const { state, dispatch } = useGame();
	const level = LEVELS[state.currentLevelIndex];
	const qIdx = state.quizState.currentQuestionIndex;
	const q = level.questions[qIdx];
	const selected = state.quizState.selectedAnswer;
	const locked = state.quizState.locked;
	const [imgIdx, setImgIdx] = (0, import_react.useState)(0);
	const [mobileOpen, setMobileOpen] = (0, import_react.useState)(true);
	const correctSoFar = state.quizState.answers.reduce((acc, ans, i) => acc + (ans === level.questions[i].correctIndex ? 1 : 0), 0);
	const isCorrect = selected !== null && selected === q.correctIndex;
	const isWrong = locked && !isCorrect;
	function handleNext() {
		const isLast = qIdx === level.questions.length - 1;
		dispatch({ type: "NEXT_QUESTION" });
		if (isLast) setTimeout(() => dispatch({ type: "COMPLETE_LEVEL" }), 0);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full w-full flex-col overflow-hidden bg-brand-soft md:flex-row",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `bg-ink text-white md:w-[40%] md:flex-shrink-0 ${mobileOpen ? "" : "md:block"}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex h-full flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-white/10 px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-0 items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "h-4 w-4 text-white/60 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "truncate text-xs uppercase tracking-wider text-white/70",
							children: [
								"Reference ",
								imgIdx + 1,
								"/",
								level.images.length
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setImgIdx((i) => (i - 1 + level.images.length) % level.images.length),
								className: "rounded-full p-1.5 hover:bg-white/10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setImgIdx((i) => (i + 1) % level.images.length),
								className: "rounded-full p-1.5 hover:bg-white/10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setMobileOpen((v) => !v),
								className: "ml-1 rounded-full p-1.5 hover:bg-white/10 md:hidden",
								children: mobileOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4" })
							})
						]
					})]
				}), mobileOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 overflow-auto p-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
						mode: "wait",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: { opacity: 0 },
							animate: { opacity: 1 },
							exit: { opacity: 0 },
							transition: { duration: .2 },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClaimCard, {
								data: level.images[imgIdx],
								compact: true
							})
						}, imgIdx)
					})
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 flex-1 flex-col overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-card px-6 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[11px] uppercase tracking-widest text-muted-foreground",
						children: [
							"Level ",
							level.number,
							" · Question ",
							qIdx + 1,
							" of ",
							level.questions.length
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressBar, {
							value: qIdx + (locked ? 1 : 0),
							max: level.questions.length
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold text-white",
					style: { backgroundColor: "var(--brand)" },
					children: ["Score: ", correctSoFar]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 overflow-auto px-6 py-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h2, {
							initial: {
								opacity: 0,
								y: 8
							},
							animate: {
								opacity: 1,
								y: 0
							},
							className: `font-display text-xl sm:text-2xl font-bold leading-snug ${isWrong ? "shake" : ""}`,
							children: q.prompt
						}, q.id),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 grid gap-3",
							children: q.options.map((opt, i) => {
								const isSelected = selected === i;
								const showCorrect = locked && i === q.correctIndex;
								const showWrong = locked && isSelected && i !== q.correctIndex;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
									whileHover: !locked ? { y: -2 } : {},
									whileTap: !locked ? { scale: .99 } : {},
									onClick: () => dispatch({
										type: "SELECT_ANSWER",
										answer: i
									}),
									disabled: locked,
									className: `flex items-center gap-3 rounded-2xl border-2 bg-card p-4 text-left font-medium transition ${showCorrect ? "border-[var(--success)] bg-[color-mix(in_oklab,var(--success)_12%,white)]" : showWrong ? "border-[var(--danger)] bg-[color-mix(in_oklab,var(--danger)_10%,white)]" : isSelected ? "border-primary" : "border-border hover:border-primary/40"}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-bold",
											children: String.fromCharCode(65 + i)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-mono text-sm sm:text-[15px] flex-1",
											children: opt
										}),
										showCorrect && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-5 w-5 text-[var(--success)]" }),
										showWrong && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5 text-[var(--danger)]" })
									]
								}, i);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 flex justify-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
								onClick: handleNext,
								disabled: !locked,
								whileHover: locked ? { scale: 1.03 } : {},
								whileTap: locked ? { scale: .98 } : {},
								className: "inline-flex items-center gap-2 rounded-full px-6 py-3 font-display font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-40",
								style: { backgroundColor: "var(--brand)" },
								children: [qIdx === level.questions.length - 1 ? "Finish Level" : "Next Question", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })]
							})
						})
					]
				})
			})]
		})]
	});
}
function CountUp({ to, duration = 900, suffix = "", decimals = 0 }) {
	const [val, setVal] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		let raf = 0;
		const start = performance.now();
		const step = (now) => {
			const t = Math.min(1, (now - start) / duration);
			setVal(to * (1 - Math.pow(1 - t, 3)));
			if (t < 1) raf = requestAnimationFrame(step);
		};
		raf = requestAnimationFrame(step);
		return () => cancelAnimationFrame(raf);
	}, [to, duration]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [val.toFixed(decimals), suffix] });
}
function LevelComplete() {
	const { state, dispatch } = useGame();
	const idx = state.currentLevelIndex;
	const level = LEVELS[idx];
	const correct = state.levels[idx].score;
	const total = level.questions.length;
	const incorrect = total - correct;
	const accuracy = Math.round(correct / total * 100);
	const xpEarned = correct * 10 + (accuracy >= 80 ? 50 : 0);
	const badge = accuracy === 100 ? "Perfect Score" : level.number === 1 ? "Claim Navigator" : "Claims Expert";
	const isLast = idx === LEVELS.length - 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "hero-bg relative flex h-full w-full items-center justify-center overflow-hidden text-white",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pointer-events-none absolute inset-0 overflow-hidden",
			children: Array.from({ length: 60 }).map((_, i) => {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
					className: "absolute h-2 w-2 rounded-sm",
					style: {
						left: `${i * 17 % 100}%`,
						top: "-5%",
						backgroundColor: [
							"#25BB64",
							"#FFD700",
							"#ffffff",
							"#7df0a8"
						][i % 4]
					},
					animate: {
						y: ["0%", "120vh"],
						rotate: [0, 360],
						opacity: [
							1,
							1,
							0
						]
					},
					transition: {
						duration: 4 + i % 5 * .5,
						repeat: Infinity,
						delay: i * .05,
						ease: "linear"
					}
				}, i);
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				y: 20
			},
			animate: {
				opacity: 1,
				y: 0
			},
			className: "relative z-10 mx-auto w-full max-w-lg px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: { scale: 0 },
							animate: { scale: 1 },
							transition: {
								type: "spring",
								stiffness: 240,
								damping: 14
							},
							className: "mx-auto flex h-24 w-24 items-center justify-center rounded-full shadow-gold",
							style: { backgroundColor: "var(--gold)" },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, {
								className: "h-12 w-12",
								style: { color: "#3a2a00" }
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-6 font-display text-4xl font-bold",
							children: "Level Complete!"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-white/70",
							children: [
								"Level ",
								level.number,
								" — ",
								level.name
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 8
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: { delay: .4 },
							className: "bounce-in mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider backdrop-blur",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, {
									className: "h-3.5 w-3.5",
									style: { color: "var(--gold)" }
								}),
								badge,
								" earned"
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 grid grid-cols-2 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Correct",
							value: correct,
							suffix: `/${total}`,
							color: "var(--brand)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Incorrect",
							value: incorrect,
							suffix: `/${total}`,
							color: "#ff6b6b"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Accuracy",
							value: accuracy,
							suffix: "%",
							color: "var(--gold)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "XP Earned",
							value: xpEarned,
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-4 w-4" }),
							color: "var(--gold)"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-col gap-3 sm:flex-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => dispatch({ type: "RETRY_LEVEL" }),
						className: "inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 font-semibold text-white hover:bg-white/10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-4 w-4" }), "Retry Level"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							if (isLast) dispatch({
								type: "GOTO",
								screen: "finalResults"
							});
							else dispatch({
								type: "GOTO",
								screen: "journey"
							});
						},
						className: "inline-flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-3 font-display font-semibold text-white",
						style: { backgroundColor: "var(--brand)" },
						children: [isLast ? "See Final Results" : "Continue Journey", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
					})]
				})
			]
		})]
	});
}
function Stat({ label, value, suffix, color, icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 text-[11px] uppercase tracking-wider text-white/60",
			children: [icon ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "h-3.5 w-3.5" }), label]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-2 font-display text-3xl font-bold",
			style: { color },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CountUp, { to: value }), suffix && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-base text-white/50 ml-0.5",
				children: suffix
			})]
		})]
	});
}
var ALL_ACHIEVEMENTS = [
	{
		id: "First Steps",
		name: "First Steps",
		how: "Complete Level 1.",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5" })
	},
	{
		id: "Claims Expert",
		name: "Claims Expert",
		how: "Complete Level 2.",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-5 w-5" })
	},
	{
		id: "Perfect Score",
		name: "Perfect Score",
		how: "Get 100% accuracy on any level.",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-5 w-5" })
	},
	{
		id: "Speed Learner",
		name: "Speed Learner",
		how: "Complete every level in one run.",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "h-5 w-5" })
	}
];
function FinalResults() {
	const { state, dispatch } = useGame();
	const totalCorrect = state.levels.reduce((a, l) => a + l.score, 0);
	const totalQs = LEVELS.reduce((a, l) => a + l.questions.length, 0);
	const accuracy = Math.round(totalCorrect / Math.max(1, totalQs) * 100);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full w-full flex-col overflow-hidden bg-brand-soft",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-border bg-card px-6 py-4 sm:flex sm:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] uppercase tracking-widest text-muted-foreground",
					children: "Mission Report"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-bold truncate",
					children: "eHUB Challenge — Final Results"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => dispatch({ type: "RESET" }),
				className: "shrink-0 inline-flex items-center gap-2 rounded-full px-5 py-2 font-semibold text-white",
				style: { backgroundColor: "var(--brand)" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-4 w-4" }), "Play Again"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex-1 overflow-auto px-6 py-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-4xl space-y-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 16
						},
						animate: {
							opacity: 1,
							y: 0
						},
						className: "grid grid-cols-1 gap-4 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroStat, {
								label: "Total XP",
								value: state.totalXP,
								color: "var(--gold)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroStat, {
								label: "Accuracy",
								value: accuracy,
								suffix: "%",
								color: "var(--brand)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroStat, {
								label: "Answered",
								value: totalCorrect,
								suffix: `/${totalQs}`,
								color: "var(--claim-header)"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-3xl bg-card p-6 shadow-card border border-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-lg font-bold",
							children: "Level Breakdown"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 overflow-x-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "min-w-full text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "text-left text-xs uppercase tracking-wider text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "pb-2",
											children: "Level"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "pb-2",
											children: "Case"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "pb-2 text-right",
											children: "Score"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "pb-2 text-right",
											children: "Accuracy"
										})
									]
								}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: LEVELS.map((l, i) => {
									const st = state.levels[i];
									const acc = st.completed ? Math.round(st.score / l.questions.length * 100) : 0;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "border-t border-border",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: "py-3 font-display font-bold",
												children: ["L", l.number]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3 text-mono text-xs",
												children: l.caseName
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3 text-right text-mono",
												children: st.completed ? `${st.score}/${l.questions.length}` : "—"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3 text-right text-mono",
												children: st.completed ? `${acc}%` : "—"
											})
										]
									}, l.id);
								}) })]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-3xl bg-card p-6 shadow-card border border-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-lg font-bold",
							children: "Achievements"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4",
							children: ALL_ACHIEVEMENTS.map((a) => {
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AchievementBadge, {
									a,
									earned: state.achievements.includes(a.id)
								}, a.id);
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-3xl bg-card p-6 shadow-card border border-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-lg font-bold",
							children: "Question Review"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 space-y-6",
							children: LEVELS.map((l, li) => {
								const st = state.levels[li];
								if (!st.completed) return null;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
									className: "font-display text-sm uppercase tracking-wider text-muted-foreground",
									children: [
										"Level ",
										l.number,
										" — ",
										l.caseName
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-2 space-y-2",
									children: l.questions.map((q, qi) => {
										const userIdx = st.userAnswers[qi];
										const isCorrect = userIdx === q.correctIndex;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
											className: "rounded-xl border border-border bg-brand-soft/40 p-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-start gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: `mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${isCorrect ? "" : ""}`,
													style: {
														backgroundColor: isCorrect ? "var(--success)" : "var(--danger)",
														color: "white"
													},
													children: isCorrect ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "min-w-0 flex-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-sm font-medium",
														children: q.prompt
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "mt-1 grid gap-1 text-xs sm:grid-cols-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "text-mono",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-muted-foreground",
																children: "Your answer: "
															}), userIdx >= 0 ? q.options[userIdx] : "—"]
														}), !isCorrect && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "text-mono",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-muted-foreground",
																children: "Correct: "
															}), q.options[q.correctIndex]]
														})]
													})]
												})]
											})
										}, q.id);
									})
								})] }, l.id);
							})
						})]
					})
				]
			})
		})]
	});
}
function HeroStat({ label, value, suffix, color }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-3xl bg-card p-6 shadow-card border border-border",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[11px] uppercase tracking-widest text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-2 font-display text-4xl font-bold",
			style: { color },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CountUp, { to: value }), suffix && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xl text-muted-foreground ml-0.5",
				children: suffix
			})]
		})]
	});
}
function AchievementBadge({ a, earned }) {
	const [hover, setHover] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onMouseEnter: () => setHover(true),
			onMouseLeave: () => setHover(false),
			onFocus: () => setHover(true),
			onBlur: () => setHover(false),
			className: `group flex w-full flex-col items-center gap-2 rounded-2xl border-2 p-4 transition ${earned ? "border-transparent bg-[color-mix(in_oklab,var(--gold)_18%,white)]" : "border-dashed border-border bg-secondary/30 opacity-60"}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex h-12 w-12 items-center justify-center rounded-full text-white",
				style: {
					backgroundColor: earned ? "var(--gold)" : "var(--muted)",
					color: earned ? "#3a2a00" : void 0
				},
				children: a.icon
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-center font-display text-sm font-bold",
				children: a.name
			})]
		}), hover && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute left-1/2 z-20 mt-2 w-48 -translate-x-1/2 rounded-lg bg-ink px-3 py-2 text-xs text-white shadow-card",
			children: a.how
		})]
	});
}
function Router() {
	const { state } = useGame();
	const screen = state.currentScreen;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 overflow-hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
			mode: "wait",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 },
				transition: {
					duration: .3,
					ease: "easeOut"
				},
				className: "h-full w-full",
				children: [
					screen === "landing" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landing, {}),
					screen === "journey" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Journey, {}),
					screen === "levelIntro" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LevelIntro, {}),
					screen === "imageStudy" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageStudy, {}),
					screen === "quiz" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quiz, {}),
					screen === "levelComplete" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LevelComplete, {}),
					screen === "finalResults" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinalResults, {})
				]
			}, screen)
		})
	});
}
function App() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Router, {}) });
}
function Index() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(App, {});
}
//#endregion
export { Index as component };
