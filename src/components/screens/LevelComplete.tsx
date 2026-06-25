import { motion } from "framer-motion";
import { Trophy, Zap, Target, RefreshCw, ArrowRight } from "lucide-react";
import { useGame } from "@/state/gameContext";
import { LEVELS } from "@/data/levels";
import { CountUp } from "@/components/CountUp";

export function LevelComplete() {
  const { state, dispatch } = useGame();
  const idx = state.currentLevelIndex;
  const level = LEVELS[idx];
  const st = state.levels[idx];
  const correct = st.score;
  const total = level.questions.length;
  const incorrect = total - correct;
  const accuracy = Math.round((correct / total) * 100);
  const xpEarned = correct * 10 + (accuracy >= 80 ? 50 : 0);

  const badge =
    accuracy === 100 ? "Perfect Score" : level.number === 1 ? "Claim Navigator" : "Claims Expert";

  const isLast = idx === LEVELS.length - 1;

  return (
    <div className="hero-bg relative flex h-full w-full items-center justify-center overflow-hidden text-white">
      {/* confetti */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 60 }).map((_, i) => {
          const colors = ["#25BB64", "#FFD700", "#ffffff", "#7df0a8"];
          return (
            <motion.span
              key={i}
              className="absolute h-2 w-2 rounded-sm"
              style={{ left: `${(i * 17) % 100}%`, top: "-5%", backgroundColor: colors[i % 4] }}
              animate={{ y: ["0%", "120vh"], rotate: [0, 360], opacity: [1, 1, 0] }}
              transition={{ duration: 4 + (i % 5) * 0.5, repeat: Infinity, delay: i * 0.05, ease: "linear" }}
            />
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 mx-auto w-full max-w-lg px-6"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 240, damping: 14 }}
            className="mx-auto flex h-24 w-24 items-center justify-center rounded-full shadow-gold"
            style={{ backgroundColor: "var(--gold)" }}
          >
            <Trophy className="h-12 w-12" style={{ color: "#3a2a00" }} />
          </motion.div>
          <h1 className="mt-6 font-display text-4xl font-bold">Level Complete!</h1>
          <p className="mt-2 text-white/70">
            Level {level.number} — {level.name}
          </p>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bounce-in mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider backdrop-blur"
          >
            <Trophy className="h-3.5 w-3.5" style={{ color: "var(--gold)" }} />
            {badge} earned
          </motion.div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3">
          <Stat label="Correct" value={correct} suffix={`/${total}`} color="var(--brand)" />
          <Stat label="Incorrect" value={incorrect} suffix={`/${total}`} color="#ff6b6b" />
          <Stat label="Accuracy" value={accuracy} suffix="%" color="var(--gold)" />
          <Stat label="XP Earned" value={xpEarned} icon={<Zap className="h-4 w-4" />} color="var(--gold)" />
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => dispatch({ type: "RETRY_LEVEL" })}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 font-semibold text-white hover:bg-white/10"
          >
            <RefreshCw className="h-4 w-4" />
            Retry Level
          </button>
          <button
            onClick={() => {
              if (isLast) dispatch({ type: "GOTO", screen: "finalResults" });
              else dispatch({ type: "GOTO", screen: "journey" });
            }}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-3 font-display font-semibold text-white"
            style={{ backgroundColor: "var(--brand)" }}
          >
            {isLast ? "See Final Results" : "Continue Journey"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function Stat({
  label,
  value,
  suffix,
  color,
  icon,
}: {
  label: string;
  value: number;
  suffix?: string;
  color?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-white/60">
        {icon ?? <Target className="h-3.5 w-3.5" />}
        {label}
      </div>
      <div className="mt-2 font-display text-3xl font-bold" style={{ color }}>
        <CountUp to={value} />
        {suffix && <span className="text-base text-white/50 ml-0.5">{suffix}</span>}
      </div>
    </div>
  );
}
