import { motion } from "framer-motion";
import { CheckCircle2, Lock, Sparkles, Trophy, Zap, ArrowLeft } from "lucide-react";
import { useGame } from "@/state/gameContext";
import { LEVELS } from "@/data/levels";
import { ProgressBar } from "@/components/ProgressBar";
import { HumanaWordmark } from "@/components/HumanaWordmark";

export function Journey() {
  const { state, dispatch } = useGame();
  const completed = state.levels.filter((l) => l.completed).length;

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-brand-soft">
      {/* Top bar */}
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-border bg-card/80 px-6 py-4 backdrop-blur sm:flex sm:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <button
            onClick={() => dispatch({ type: "GOTO", screen: "landing" })}
            className="rounded-full p-2 hover:bg-accent"
            aria-label="Back"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <HumanaWordmark className="text-xl" />
          <span className="hidden text-sm text-muted-foreground sm:inline">
            Your Journey
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-4">
          <div className="hidden sm:block w-48">
            <ProgressBar value={completed} max={LEVELS.length} />
            <div className="mt-1 text-[11px] text-muted-foreground">
              {completed} / {LEVELS.length} levels
            </div>
          </div>
          <div
            className="flex items-center gap-2 rounded-full px-4 py-2 font-display font-bold"
            style={{ backgroundColor: "var(--gold)", color: "#3a2a00" }}
          >
            <Zap className="h-4 w-4 fill-current" />
            {state.totalXP} XP
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-auto px-6 py-8">
        <div className="mx-auto max-w-5xl">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl sm:text-4xl font-bold"
          >
            The Path of the Claims Expert
          </motion.h2>
          <p className="mt-2 text-muted-foreground">
            Each level is a real case. Study the claim card, then prove what you saw.
          </p>

          {/* Roadmap */}
          <div className="relative mt-12 space-y-12">
            {LEVELS.map((level, i) => {
              const st = state.levels[i];
              const isCurrent = !st.completed && st.unlocked;
              return (
                <div key={level.id} className="relative">
                  {/* dotted connector */}
                  {i < LEVELS.length - 1 && (
                    <div
                      aria-hidden
                      className="absolute left-1/2 top-full h-12 w-px -translate-x-1/2 border-l-2 border-dashed border-primary/40"
                    />
                  )}
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`mx-auto max-w-2xl rounded-3xl border bg-card p-6 shadow-card ${
                      isCurrent ? "border-primary shadow-glow" : "border-border"
                    }`}
                  >
                    <div className="flex items-start gap-5">
                      <div
                        className={`relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl font-display text-2xl font-bold ${
                          !st.unlocked ? "bg-muted text-muted-foreground" : ""
                        } ${isCurrent ? "text-white" : ""}`}
                        style={
                          st.unlocked && !st.completed
                            ? { background: "var(--gradient-brand)" }
                            : st.completed
                              ? { backgroundColor: "var(--brand)" }
                              : undefined
                        }
                      >
                        {st.completed ? (
                          <CheckCircle2 className="h-8 w-8 text-white" />
                        ) : !st.unlocked ? (
                          <Lock className="h-7 w-7" />
                        ) : (
                          <span className={isCurrent ? "text-white" : ""}>
                            {level.number}
                          </span>
                        )}
                        {isCurrent && (
                          <span className="pulse-glow absolute inset-0 rounded-2xl" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-display text-xl font-bold truncate">
                            Level {level.number}: {level.name}
                          </h3>
                          {st.completed && (
                            <Sparkles className="h-4 w-4" style={{ color: "var(--gold)" }} />
                          )}
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Case: <span className="text-mono">{level.caseName}</span>
                        </p>
                        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                          <span className="rounded-full bg-secondary px-3 py-1">
                            {level.images.length} images
                          </span>
                          <span className="rounded-full bg-secondary px-3 py-1">
                            {level.questions.length} questions
                          </span>
                          {st.completed && (
                            <span
                              className="flex items-center gap-1 rounded-full px-3 py-1 font-semibold text-white"
                              style={{ backgroundColor: "var(--brand)" }}
                            >
                              <Trophy className="h-3 w-3" />
                              {st.score}/{level.questions.length}
                            </span>
                          )}
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          <button
                            disabled={!st.unlocked}
                            onClick={() => {
                              dispatch({ type: "SELECT_LEVEL", index: i });
                              dispatch({ type: "GOTO", screen: "levelIntro" });
                            }}
                            className="rounded-full px-5 py-2 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-50 hover:opacity-90"
                            style={{ backgroundColor: "var(--brand)" }}
                          >
                            {st.completed ? "Replay" : st.unlocked ? "Start Level" : "Locked"}
                          </button>
                          {state.levels.every((l) => l.completed) && i === LEVELS.length - 1 && (
                            <button
                              onClick={() => dispatch({ type: "GOTO", screen: "finalResults" })}
                              className="rounded-full border border-primary px-5 py-2 text-sm font-semibold text-primary"
                            >
                              View Final Results
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
