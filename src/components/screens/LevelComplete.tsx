import { motion } from "framer-motion";
import { Trophy, Sparkles, Flame, RefreshCw, ArrowRight } from "lucide-react";
import { useGame } from "@/state/gameContext";
import { CASES } from "@/data/levels";
import { Scout } from "@/components/Scout";
import { CountUp } from "@/components/CountUp";

export function LevelComplete() {
  const { state, dispatch } = useGame();
  const caseIdx = state.currentCaseIndex;
  const caseDef = CASES[caseIdx];
  const isLast = caseIdx === CASES.length - 1;

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-b from-[#E9F8F0] to-[#e6faf0] px-6 py-8">
      {/* Confetti Animation Layer (Mint & Gold Palette) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => {
          const colors = ["#25BB64", "#FFD700", "#10B981", "#6EE7B7"];
          return (
            <motion.span
              key={i}
              className="absolute h-2.5 w-2.5 rounded-sm"
              style={{
                left: `${(i * 23) % 100}%`,
                top: "-5%",
                backgroundColor: colors[i % 4],
              }}
              animate={{
                y: ["0%", "120vh"],
                rotate: [0, 360],
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: 3.5 + (i % 4) * 0.6,
                repeat: Infinity,
                delay: i * 0.06,
                ease: "linear",
              }}
            />
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="relative z-10 w-full max-w-md bg-white rounded-3xl border border-emerald-100 p-8 text-center shadow-card"
      >
        {/* Animated Celebration Scout */}
        <div className="relative mb-6 flex justify-center">
          <div className="absolute inset-0 bg-yellow-100/50 rounded-full blur-xl animate-pulse" />
          <Scout mood="celebrate" size={130} className="relative z-10" />
        </div>

        {/* Celebratory message bubble */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative bg-emerald-50 border border-emerald-100 rounded-2xl p-4 mb-6 text-sm text-emerald-900 leading-relaxed text-left"
        >
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-emerald-50 border-t border-l border-emerald-100 rotate-45" />
          <p className="relative z-10 text-center font-medium">
            &quot;Case Closed, Detective! You successfully scanned the mainframe records and decrypted the target claimant data. Stellar work!&quot;
          </p>
        </motion.div>

        {/* Heading titles */}
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#25BB64]">
            Investigation Completed
          </span>
          <h1 className="mt-1 font-display text-3xl font-extrabold text-slate-800 leading-tight">
            Case Closed!
          </h1>
          <p className="mt-1 text-xs text-slate-500 font-mono">
            {caseDef.name}
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-4 py-1.5 text-xs font-bold text-emerald-700 uppercase tracking-wide"
          >
            <Trophy className="h-4.5 w-4.5 text-yellow-500 fill-yellow-100 animate-bounce" />
            <span>Badge Earned: {caseDef.badge}</span>
          </motion.div>
        </div>

        {/* Stats display panel */}
        <div className="mt-6 grid grid-cols-2 gap-3 text-left">
          <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-3.5">
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              <Sparkles className="h-3.5 w-3.5 text-yellow-500 fill-yellow-100" />
              XP Earned
            </div>
            <div className="mt-1 font-display text-2xl font-extrabold text-slate-800">
              +<CountUp to={caseDef.xpValue} /> XP
            </div>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-3.5">
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              <Flame className="h-3.5 w-3.5 text-orange-500 fill-orange-100" />
              Active Streak
            </div>
            <div className="mt-1 font-display text-2xl font-extrabold text-slate-800">
              <CountUp to={state.streak} />
            </div>
          </div>
        </div>

        {/* Navigation Action CTA buttons */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => dispatch({ type: "RETRY_CASE" })}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-slate-200 hover:border-slate-350 bg-white text-slate-700 py-3.5 text-sm font-bold transition shadow-sm cursor-pointer"
          >
            <RefreshCw className="h-4 w-4" />
            Replay Case
          </button>
          <button
            onClick={() => {
              if (isLast) dispatch({ type: "GOTO", screen: "finalResults" });
              else dispatch({ type: "GOTO", screen: "journey" });
            }}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full text-white py-3.5 text-sm font-bold transition shadow-md cursor-pointer"
            style={{ backgroundColor: "var(--brand)" }}
          >
            <span>{isLast ? "View Certificate" : "Continue Journey"}</span>
            <ArrowRight className="h-4 w-4 text-white" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
