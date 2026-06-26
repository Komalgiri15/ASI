import { motion } from "framer-motion";
import { ArrowLeft, Play, Eye, FileSearch, ShieldCheck } from "lucide-react";
import { useGame } from "@/state/gameContext";
import { CASES } from "@/data/levels";
import { Scout } from "@/components/Scout";

export function LevelIntro() {
  const { state, dispatch } = useGame();
  const caseDef = CASES[state.currentCaseIndex];

  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-[#E9F8F0] to-[#eefcf4] px-6 py-8 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mx-auto w-full max-w-4xl rounded-3xl bg-white p-8 sm:p-10 shadow-card border border-emerald-100 flex flex-col"
      >
        {/* Back Button */}
        <button
          onClick={() => dispatch({ type: "GOTO", screen: "journey" })}
          className="self-start inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-emerald-700 transition"
        >
          <ArrowLeft className="h-4 w-4" /> BACK TO JOURNEY
        </button>

        {/* Scout Introduction Row */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-emerald-100/50">
          <div className="relative shrink-0">
            <div className="absolute inset-0 bg-yellow-100 rounded-full blur-lg opacity-40 animate-pulse" />
            <Scout mood="think" size={160} className="relative z-10" />
          </div>

          <div className="flex-1 relative bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 text-base text-emerald-950 leading-relaxed">
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-emerald-50 border-b border-l border-emerald-100 rotate-45 hidden sm:block" />
            <p>
              <strong>Scout:</strong> &quot;Navigator, we have opened Case #{caseDef.number}: <strong>{caseDef.caseName}</strong>. This file contains critical search queues on the mainframe. Let's study the outcomes below and launch our investigation.&quot;
            </p>
          </div>
        </div>

        {/* Case Info Header */}
        <div className="mt-6 flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl font-mono text-xl font-bold bg-[#E9F8F0] border border-emerald-200 text-emerald-800">
            0{caseDef.number}
          </div>
          <div>
            <span className="text-sm uppercase font-bold tracking-widest text-[#25BB64]">
              Active Case File
            </span>
            <h1 className="font-display text-3xl font-extrabold text-slate-800">
              {caseDef.name}
            </h1>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-6 grid grid-cols-2 gap-3 text-left">
          <div className="p-3.5 bg-emerald-50/40 border border-emerald-100 rounded-xl">
            <div className="flex items-center gap-1.5 text-[#25BB64] font-bold text-sm">
              <FileSearch className="w-4 h-4" />
              <span className="text-sm uppercase tracking-wider font-semibold">Steps to solve</span>
            </div>
            <div className="font-display text-2xl font-extrabold text-slate-800 mt-1">
              {caseDef.steps.length} {caseDef.steps.length === 1 ? "Step" : "Steps"}
            </div>
          </div>
          <div className="p-3.5 bg-emerald-50/40 border border-emerald-100 rounded-xl">
            <div className="flex items-center gap-1.5 text-[#25BB64] font-bold text-sm">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-sm uppercase tracking-wider font-semibold">Reward Badge</span>
            </div>
            <div className="font-display text-base font-extrabold text-emerald-800 mt-1.5 truncate">
              {caseDef.badge}
            </div>
          </div>
        </div>

        {/* Outcomes List */}
        <div className="mt-6">
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-slate-400">
            Case Learning Objectives
          </h3>
          <ul className="mt-3 space-y-2.5">
            {caseDef.outcomes.map((o, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.06 }}
                className="flex items-start gap-2.5 text-sm text-slate-600 leading-normal"
              >
                <Eye className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#25BB64]" />
                <span>{o}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Start Game CTA */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => dispatch({ type: "START_GAMEPLAY" })}
          className="pulse-glow mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full py-4 text-white font-bold text-lg shadow-md cursor-pointer select-none"
          style={{ backgroundColor: "var(--brand)" }}
        >
          <Play className="h-5 w-5 fill-white text-white" />
          Launch Investigation
        </motion.button>
      </motion.div>
    </div>
  );
}
