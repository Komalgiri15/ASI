import { motion } from "framer-motion";
import { ArrowLeft, Play, BookOpen, HelpCircle } from "lucide-react";
import { useGame } from "@/state/gameContext";
import { LEVELS } from "@/data/levels";

export function LevelIntro() {
  const { state, dispatch } = useGame();
  const level = LEVELS[state.currentLevelIndex];

  return (
    <div className="flex h-full w-full items-center justify-center bg-brand-soft px-6 py-8 overflow-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto w-full max-w-2xl rounded-3xl bg-card p-8 sm:p-10 shadow-card border border-border"
      >
        <button
          onClick={() => dispatch({ type: "GOTO", screen: "journey" })}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Journey
        </button>

        <div className="mt-6 flex items-center gap-4">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-2xl font-display text-2xl font-bold text-white"
            style={{ background: "var(--gradient-brand)" }}
          >
            {level.number}
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Level {level.number}
            </p>
            <h1 className="font-display text-2xl sm:text-3xl font-bold">
              {level.name}
            </h1>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Stat icon={<BookOpen className="h-4 w-4" />} label="Images to study" value={level.images.length} />
          <Stat icon={<HelpCircle className="h-4 w-4" />} label="Questions" value={level.questions.length} />
        </div>

        <div className="mt-6">
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-muted-foreground">
            You'll learn to
          </h3>
          <ul className="mt-3 space-y-2">
            {level.outcomes.map((o, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
                className="flex items-start gap-3 text-sm"
              >
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: "var(--brand)" }}
                />
                {o}
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => dispatch({ type: "GOTO", screen: "imageStudy" })}
          className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 font-display text-lg font-semibold text-white shadow-glow"
          style={{ backgroundColor: "var(--brand)" }}
        >
          <Play className="h-5 w-5 fill-white" />
          Start Level
        </motion.button>
      </motion.div>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="rounded-2xl bg-brand-soft p-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <span className="text-primary">{icon}</span>
        <span className="text-[11px] uppercase tracking-wider font-medium">{label}</span>
      </div>
      <div className="font-display text-2xl font-bold mt-1">{value}</div>
    </div>
  );
}
