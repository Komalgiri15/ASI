import { motion } from "framer-motion";
import { Play, Trophy, Sparkles, Target } from "lucide-react";
import { useGame } from "@/state/gameContext";
import { HumanaWordmark } from "@/components/HumanaWordmark";
import { LEVELS } from "@/data/levels";

export function Landing() {
  const { dispatch } = useGame();
  return (
    <div className="hero-bg relative flex h-full w-full items-center justify-center overflow-hidden text-white">
      {/* particles */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white/40"
            style={{
              left: `${(i * 53) % 100}%`,
              top: `${(i * 29) % 100}%`,
            }}
            animate={{ opacity: [0.1, 0.7, 0.1], y: [0, -10, 0] }}
            transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: i * 0.1 }}
          />
        ))}
      </div>

      {/* floating badges */}
      <motion.div
        className="absolute top-[18%] left-[10%] hidden md:block"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <Badge icon={<Trophy className="h-5 w-5" />} label="Claim Navigator" />
      </motion.div>
      <motion.div
        className="absolute top-[22%] right-[12%] hidden md:block"
        animate={{ y: [0, -16, 0] }}
        transition={{ duration: 5, repeat: Infinity, delay: 0.6 }}
      >
        <Badge icon={<Sparkles className="h-5 w-5" />} label="Perfect Score" />
      </motion.div>
      <motion.div
        className="absolute bottom-[18%] left-[14%] hidden md:block"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, delay: 1.2 }}
      >
        <Badge icon={<Target className="h-5 w-5" />} label="Speed Learner" />
      </motion.div>

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <HumanaWordmark glow className="text-5xl sm:text-6xl" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-4 font-display text-4xl sm:text-6xl font-bold leading-tight"
        >
          eHUB <span style={{ color: "var(--brand)" }}>Challenge</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-4 max-w-xl text-base sm:text-lg text-white/70"
        >
          Master claims processing through gamified case studies. Study real claim
          screens, answer rapid-fire questions, earn XP.
        </motion.p>

        {/* level preview dots */}
        <div className="mt-8 flex items-center gap-3">
          {LEVELS.map((l, i) => (
            <div key={l.id} className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 font-display font-bold backdrop-blur">
                {l.number}
              </div>
              {i < LEVELS.length - 1 && (
                <div className="h-px w-10 border-t border-dashed border-white/30" />
              )}
            </div>
          ))}
        </div>

        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => dispatch({ type: "GOTO", screen: "journey" })}
          className="pulse-glow mt-10 inline-flex items-center gap-2 rounded-full px-8 py-4 font-display text-lg font-semibold text-white"
          style={{ backgroundColor: "var(--brand)" }}
        >
          <Play className="h-5 w-5 fill-white" />
          Start Game
        </motion.button>

        <p className="mt-4 text-xs uppercase tracking-[0.2em] text-white/40">
          {LEVELS.length} Levels · {LEVELS.reduce((a, l) => a + l.questions.length, 0)} Questions
        </p>
      </div>
    </div>
  );
}

function Badge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 backdrop-blur">
      <span style={{ color: "var(--gold)" }}>{icon}</span>
      <span className="text-xs font-medium tracking-wide text-white/90">{label}</span>
    </div>
  );
}
