import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronRight, Image as ImageIcon, ChevronDown, ChevronUp, Check, X } from "lucide-react";
import { useGame } from "@/state/gameContext";
import { LEVELS } from "@/data/levels";
import { ClaimCard } from "@/components/ClaimCard";
import { ProgressBar } from "@/components/ProgressBar";

export function Quiz() {
  const { state, dispatch } = useGame();
  const level = LEVELS[state.currentLevelIndex];
  const qIdx = state.quizState.currentQuestionIndex;
  const q = level.questions[qIdx];
  const selected = state.quizState.selectedAnswer;
  const locked = state.quizState.locked;
  const [imgIdx, setImgIdx] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(true);

  const correctSoFar =
    state.quizState.answers.reduce((acc, ans, i) => acc + (ans === level.questions[i].correctIndex ? 1 : 0), 0);

  const isCorrect = selected !== null && selected === q.correctIndex;
  const isWrong = locked && !isCorrect;

  function handleNext() {
    const isLast = qIdx === level.questions.length - 1;
    dispatch({ type: "NEXT_QUESTION" });
    if (isLast) {
      // give state time to commit answer, then complete
      setTimeout(() => dispatch({ type: "COMPLETE_LEVEL" }), 0);
    }
  }

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-brand-soft md:flex-row">
      {/* Image panel */}
      <div className={`bg-ink text-white md:w-[40%] md:flex-shrink-0 ${mobileOpen ? "" : "md:block"}`}>
        <div className="flex h-full flex-col">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-white/10 px-4 py-3">
            <div className="flex min-w-0 items-center gap-2">
              <ImageIcon className="h-4 w-4 text-white/60 shrink-0" />
              <span className="truncate text-xs uppercase tracking-wider text-white/70">
                Reference {imgIdx + 1}/{level.images.length}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setImgIdx((i) => (i - 1 + level.images.length) % level.images.length)}
                className="rounded-full p-1.5 hover:bg-white/10"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setImgIdx((i) => (i + 1) % level.images.length)}
                className="rounded-full p-1.5 hover:bg-white/10"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="ml-1 rounded-full p-1.5 hover:bg-white/10 md:hidden"
              >
                {mobileOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            </div>
          </div>
          {mobileOpen && (
            <div className="flex-1 overflow-auto p-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={imgIdx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ClaimCard data={level.images[imgIdx]} imageUrl={level.images[imgIdx].imageUrl} compact />
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* Question panel */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-card px-6 py-4">
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
              Level {level.number} · Question {qIdx + 1} of {level.questions.length}
            </p>
            <div className="mt-2">
              <ProgressBar value={qIdx + (locked ? 1 : 0)} max={level.questions.length} />
            </div>
          </div>
          <div
            className="shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold text-white"
            style={{ backgroundColor: "var(--brand)" }}
          >
            Score: {correctSoFar}
          </div>
        </header>

        <div className="flex-1 overflow-auto px-6 py-6">
          <div className="mx-auto max-w-2xl">
            <motion.h2
              key={q.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`font-display text-xl sm:text-2xl font-bold leading-snug ${isWrong ? "shake" : ""}`}
            >
              {q.prompt}
{q.imageUrl && (
  <img src={q.imageUrl} alt="Question illustration" className="my-4 rounded-lg shadow" />
)}
            </motion.h2>

            <div className="mt-6 grid gap-3">
              {q.options.map((opt, i) => {
                const isSelected = selected === i;
                const showCorrect = locked && i === q.correctIndex;
                const showWrong = locked && isSelected && i !== q.correctIndex;
                return (
                  <motion.button
                    key={i}
                    whileHover={!locked ? { y: -2 } : {}}
                    whileTap={!locked ? { scale: 0.99 } : {}}
                    onClick={() => dispatch({ type: "SELECT_ANSWER", answer: i })}
                    disabled={locked}
                    className={`flex items-center gap-3 rounded-2xl border-2 bg-card p-4 text-left font-medium transition ${
                      showCorrect
                        ? "border-[var(--success)] bg-[color-mix(in_oklab,var(--success)_12%,white)]"
                        : showWrong
                          ? "border-[var(--danger)] bg-[color-mix(in_oklab,var(--danger)_10%,white)]"
                          : isSelected
                            ? "border-primary"
                            : "border-border hover:border-primary/40"
                    }`}
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-bold">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="text-mono text-sm sm:text-[15px] flex-1">{opt}</span>
                    {showCorrect && <Check className="h-5 w-5 text-[var(--success)]" />}
                    {showWrong && <X className="h-5 w-5 text-[var(--danger)]" />}
                  </motion.button>
                );
              })}
            </div>

            <div className="mt-8 flex justify-end">
              <motion.button
                onClick={handleNext}
                disabled={!locked}
                whileHover={locked ? { scale: 1.03 } : {}}
                whileTap={locked ? { scale: 0.98 } : {}}
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-display font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-40"
                style={{ backgroundColor: "var(--brand)" }}
              >
                {qIdx === level.questions.length - 1 ? "Finish Level" : "Next Question"}
                <ChevronRight className="h-4 w-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
