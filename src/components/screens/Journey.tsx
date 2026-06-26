import { motion } from "framer-motion";
import { CheckCircle2, Lock, Sparkles, Trophy, Flame, ArrowLeft, Terminal } from "lucide-react";
import { useGame } from "@/state/gameContext";
import { CASES } from "@/data/levels";
import { ProgressBar } from "@/components/ProgressBar";
import { HumanaWordmark } from "@/components/HumanaWordmark";

export function Journey() {
  const { state, dispatch } = useGame();
  const completedCount = state.cases.filter((c) => c.completed).length;

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-gradient-to-b from-[#E9F8F0] to-[#f9fdfb]">
      {/* Top bar */}
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-emerald-100 bg-white/90 px-6 py-4 backdrop-blur sm:flex sm:justify-between shadow-sm">
        <div className="flex min-w-0 items-center gap-4">
          <button
            onClick={() => dispatch({ type: "GOTO", screen: "landing" })}
            className="rounded-full p-2 text-slate-500 hover:bg-emerald-50 hover:text-emerald-800 transition"
            aria-label="Back"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <HumanaWordmark className="text-xl text-emerald-850" />
          <span className="hidden text-sm font-semibold uppercase tracking-wider text-slate-400 border-l border-slate-200 pl-4 sm:inline">
            Search Specialist Training
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          {/* Progress Bar (Large screens) */}
          <div className="hidden md:block w-36 mr-2">
            <ProgressBar value={completedCount} max={CASES.length} />
            <div className="mt-1 text-sm text-slate-500 font-semibold">
              {completedCount} / {CASES.length} Cases Solved
            </div>
          </div>

          {/* Streak Counter */}
          {state.streak > 0 && (
            <div className="flex items-center gap-1.5 rounded-full bg-orange-50 border border-orange-200 px-3 py-1.5 text-orange-600 text-sm font-bold shadow-sm">
              <Flame className="h-4 w-4 fill-orange-500 text-orange-500 animate-bounce" />
              <span>{state.streak} STREAK</span>
            </div>
          )}

          {/* XP Badge */}
          <div className="flex items-center gap-1.5 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/40 px-3.5 py-1.5 font-display text-sm font-bold text-yellow-800 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 fill-[#FFD700] text-[#D97706]" />
            <span>{state.totalXP} XP</span>
          </div>
        </div>
      </header>

      {/* Main Path Area */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="mx-auto max-w-5xl w-full">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center md:text-left mb-8"
          >
            <h2 className="font-display text-4xl font-extrabold text-slate-800 tracking-tight">
              Case Dashboard
            </h2>
            <p className="mt-2 text-base text-slate-500 max-w-xl">
              Solve the cases in sequence by reading stylized 3270 mainframe screens. No multiple-choice questions—interact directly with the terminal.
            </p>
          </motion.div>

          {/* Roadmap Paths */}
          <div className="relative space-y-10">
            {CASES.map((caseDef, i) => {
              const cState = state.cases[i];
              const isCurrent = !cState.completed && cState.unlocked;
              const isCompleted = cState.completed;
              const isLocked = !cState.unlocked;

              return (
                <div key={caseDef.id} className="relative">
                  {/* Dotted path connector */}
                  {i < CASES.length - 1 && (
                    <div
                      aria-hidden
                      className={`absolute left-10 top-full h-10 w-0.5 -translate-x-1/2 border-l-2 border-dashed ${
                        state.cases[i + 1].unlocked
                          ? "border-emerald-500/50"
                          : "border-slate-300"
                      }`}
                    />
                  )}

                  <motion.div
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    className={`flex items-start gap-6 rounded-2xl border bg-white p-5 shadow-sm transition-all duration-300 ${
                      isCurrent
                        ? "border-emerald-500 shadow-[0_4px_20px_-2px_rgba(37,187,100,0.15)] ring-1 ring-emerald-500"
                        : "border-slate-100"
                    } ${isLocked ? "opacity-75 bg-slate-50/50" : ""}`}
                  >
                    {/* Node Icon */}
                    <div
                      className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl font-mono text-xl font-bold border ${
                        isLocked
                          ? "bg-slate-100 border-slate-200 text-slate-400"
                          : isCompleted
                            ? "bg-emerald-500 border-emerald-600 text-white shadow-sm"
                            : "bg-[#E9F8F0] border-emerald-200 text-emerald-800"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="h-7 w-7 text-white" />
                      ) : isLocked ? (
                        <Lock className="h-6.5 w-6.5 text-slate-400" />
                      ) : (
                        <Terminal className="h-6 w-6 text-emerald-700 animate-pulse" />
                      )}

                      {/* Sparkle animations for active node */}
                      {isCurrent && (
                        <span className="absolute -inset-1 rounded-2xl border-2 border-emerald-500 animate-ping opacity-25" />
                      )}
                    </div>

                    {/* Case Info Description */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-bold uppercase tracking-wider text-slate-400">
                          CASE 0{caseDef.number}
                        </span>
                        {isCompleted && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-sm font-bold text-emerald-700">
                            <Trophy className="h-3 w-3 fill-emerald-100" />
                            CLOSED
                          </span>
                        )}
                      </div>
                      <h3 className="font-display text-xl font-bold text-slate-800 truncate mt-0.5">
                        {caseDef.name}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500 leading-normal">
                        {caseDef.description}
                      </p>

                      {/* Outcomes Bullet Points */}
                      {!isLocked && (
                        <div className="mt-3 p-3 bg-emerald-50/45 border border-emerald-500/10 rounded-xl">
                          <span className="text-sm uppercase font-bold text-emerald-850 tracking-wider">
                            Case Objectives:
                          </span>
                          <ul className="mt-1.5 space-y-1 text-sm text-slate-600 list-disc list-inside">
                            {caseDef.outcomes.map((outcome, idx) => (
                              <li key={idx} className="truncate">
                                {outcome}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Reward Info & CTA Actions */}
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                        <div className="flex items-center gap-3 text-sm font-semibold text-slate-500">
                          <span>Reward: <strong className="text-yellow-600">+{caseDef.xpValue} XP</strong></span>
                          <span>•</span>
                          <span className="flex items-center gap-1 text-slate-600">
                            Badge: <strong className="text-emerald-700">{caseDef.badge}</strong>
                          </span>
                        </div>

                        <div className="flex gap-2">
                          <button
                            disabled={isLocked}
                            onClick={() => dispatch({ type: "START_CASE", index: i })}
                            className={`rounded-full px-5 py-2 text-sm font-bold text-white transition-all shadow-sm ${
                              isLocked
                                ? "bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300"
                                : isCompleted
                                  ? "bg-slate-800 hover:bg-slate-900 border border-slate-950 cursor-pointer"
                                  : "bg-emerald-600 hover:bg-emerald-700 border border-emerald-700 cursor-pointer"
                            }`}
                          >
                            {isCompleted ? "Replay Case" : isCurrent ? "Launch Case" : "Locked"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* Certificate Trophy Section */}
          {completedCount === CASES.length && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-10 p-6 bg-gradient-to-r from-yellow-500/10 to-amber-500/15 border-2 border-yellow-400/40 rounded-3xl text-center flex flex-col items-center shadow-sm"
            >
              <Trophy className="h-10 w-10 text-yellow-600 fill-yellow-200 animate-pulse mb-2" />
              <h3 className="font-display text-lg font-bold text-amber-900">
                Mainframe Certification Unlocked!
              </h3>
              <p className="text-sm text-amber-800/80 mt-1 max-w-md">
                You have successfully resolved all regional searches and navigated to the MR referral terminal. Claim your official navigator completion certificate!
              </p>
              <button
                onClick={() => dispatch({ type: "GOTO", screen: "finalResults" })}
                className="mt-4 rounded-full bg-amber-500 hover:bg-amber-600 border border-amber-600 px-6 py-2.5 text-sm font-bold text-white shadow-sm cursor-pointer transition"
              >
                View Certificate
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
