import { motion } from "framer-motion";
import { Trophy, Sparkles, Target, Award, RefreshCw, Check, X } from "lucide-react";
import { useGame } from "@/state/gameContext";
import { LEVELS } from "@/data/levels";
import { CountUp } from "@/components/CountUp";
import { useState } from "react";

const ALL_ACHIEVEMENTS: { id: string; name: string; how: string; icon: React.ReactNode }[] = [
  { id: "First Steps", name: "First Steps", how: "Complete Level 1.", icon: <Sparkles className="h-5 w-5" /> },
  { id: "Claims Expert", name: "Claims Expert", how: "Complete Level 2.", icon: <Award className="h-5 w-5" /> },
  { id: "Perfect Score", name: "Perfect Score", how: "Get 100% accuracy on any level.", icon: <Trophy className="h-5 w-5" /> },
  { id: "Speed Learner", name: "Speed Learner", how: "Complete every level in one run.", icon: <Target className="h-5 w-5" /> },
];

export function FinalResults() {
  const { state, dispatch } = useGame();
  const totalCorrect = state.levels.reduce((a, l) => a + l.score, 0);
  const totalQs = LEVELS.reduce((a, l) => a + l.questions.length, 0);
  const accuracy = Math.round((totalCorrect / Math.max(1, totalQs)) * 100);

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-brand-soft">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-border bg-card px-6 py-4 sm:flex sm:justify-between">
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
            Mission Report
          </p>
          <h2 className="font-display text-xl font-bold truncate">eHUB Challenge — Final Results</h2>
        </div>
        <button
          onClick={() => dispatch({ type: "RESET" })}
          className="shrink-0 inline-flex items-center gap-2 rounded-full px-5 py-2 font-semibold text-white"
          style={{ backgroundColor: "var(--brand)" }}
        >
          <RefreshCw className="h-4 w-4" />
          Play Again
        </button>
      </header>

      <div className="flex-1 overflow-auto px-6 py-8">
        <div className="mx-auto max-w-4xl space-y-8">
          {/* Hero stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-3"
          >
            <HeroStat label="Total XP" value={state.totalXP} color="var(--gold)" />
            <HeroStat label="Accuracy" value={accuracy} suffix="%" color="var(--brand)" />
            <HeroStat label="Answered" value={totalCorrect} suffix={`/${totalQs}`} color="var(--claim-header)" />
          </motion.div>

          {/* Level breakdown */}
          <section className="rounded-3xl bg-card p-6 shadow-card border border-border">
            <h3 className="font-display text-lg font-bold">Level Breakdown</h3>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="pb-2">Level</th>
                    <th className="pb-2">Case</th>
                    <th className="pb-2 text-right">Score</th>
                    <th className="pb-2 text-right">Accuracy</th>
                  </tr>
                </thead>
                <tbody>
                  {LEVELS.map((l, i) => {
                    const st = state.levels[i];
                    const acc = st.completed
                      ? Math.round((st.score / l.questions.length) * 100)
                      : 0;
                    return (
                      <tr key={l.id} className="border-t border-border">
                        <td className="py-3 font-display font-bold">L{l.number}</td>
                        <td className="py-3 text-mono text-xs">{l.caseName}</td>
                        <td className="py-3 text-right text-mono">
                          {st.completed ? `${st.score}/${l.questions.length}` : "—"}
                        </td>
                        <td className="py-3 text-right text-mono">
                          {st.completed ? `${acc}%` : "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          {/* Achievements */}
          <section className="rounded-3xl bg-card p-6 shadow-card border border-border">
            <h3 className="font-display text-lg font-bold">Achievements</h3>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {ALL_ACHIEVEMENTS.map((a) => {
                const earned = state.achievements.includes(a.id);
                return <AchievementBadge key={a.id} a={a} earned={earned} />;
              })}
            </div>
          </section>

          {/* Question review */}
          <section className="rounded-3xl bg-card p-6 shadow-card border border-border">
            <h3 className="font-display text-lg font-bold">Question Review</h3>
            <div className="mt-4 space-y-6">
              {LEVELS.map((l, li) => {
                const st = state.levels[li];
                if (!st.completed) return null;
                return (
                  <div key={l.id}>
                    <h4 className="font-display text-sm uppercase tracking-wider text-muted-foreground">
                      Level {l.number} — {l.caseName}
                    </h4>
                    <ul className="mt-2 space-y-2">
                      {l.questions.map((q, qi) => {
                        const userIdx = st.userAnswers[qi];
                        const isCorrect = userIdx === q.correctIndex;
                        return (
                          <li
                            key={q.id}
                            className="rounded-xl border border-border bg-brand-soft/40 p-3"
                          >
                            <div className="flex items-start gap-3">
                              <span
                                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                                  isCorrect ? "" : ""
                                }`}
                                style={{
                                  backgroundColor: isCorrect ? "var(--success)" : "var(--danger)",
                                  color: "white",
                                }}
                              >
                                {isCorrect ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                              </span>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium">{q.prompt}</p>
                                <div className="mt-1 grid gap-1 text-xs sm:grid-cols-2">
                                  <div className="text-mono">
                                    <span className="text-muted-foreground">Your answer: </span>
                                    {userIdx >= 0 ? q.options[userIdx] : "—"}
                                  </div>
                                  {!isCorrect && (
                                    <div className="text-mono">
                                      <span className="text-muted-foreground">Correct: </span>
                                      {q.options[q.correctIndex]}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function HeroStat({
  label,
  value,
  suffix,
  color,
}: {
  label: string;
  value: number;
  suffix?: string;
  color: string;
}) {
  return (
    <div className="rounded-3xl bg-card p-6 shadow-card border border-border">
      <div className="text-[11px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-2 font-display text-4xl font-bold" style={{ color }}>
        <CountUp to={value} />
        {suffix && <span className="text-xl text-muted-foreground ml-0.5">{suffix}</span>}
      </div>
    </div>
  );
}

function AchievementBadge({
  a,
  earned,
}: {
  a: { id: string; name: string; how: string; icon: React.ReactNode };
  earned: boolean;
}) {
  const [hover, setHover] = useState(false);
  return (
    <div className="relative">
      <button
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        className={`group flex w-full flex-col items-center gap-2 rounded-2xl border-2 p-4 transition ${
          earned
            ? "border-transparent bg-[color-mix(in_oklab,var(--gold)_18%,white)]"
            : "border-dashed border-border bg-secondary/30 opacity-60"
        }`}
      >
        <span
          className="flex h-12 w-12 items-center justify-center rounded-full text-white"
          style={{
            backgroundColor: earned ? "var(--gold)" : "var(--muted)",
            color: earned ? "#3a2a00" : undefined,
          }}
        >
          {a.icon}
        </span>
        <span className="text-center font-display text-sm font-bold">{a.name}</span>
      </button>
      {hover && (
        <div className="absolute left-1/2 z-20 mt-2 w-48 -translate-x-1/2 rounded-lg bg-ink px-3 py-2 text-xs text-white shadow-card">
          {a.how}
        </div>
      )}
    </div>
  );
}
