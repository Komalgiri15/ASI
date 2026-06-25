import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, BookOpen, Check, ZoomIn, ZoomOut } from "lucide-react";
import { useGame } from "@/state/gameContext";
import { LEVELS } from "@/data/levels";
import { ClaimCard } from "@/components/ClaimCard";
import { ProgressBar } from "@/components/ProgressBar";

export function ImageStudy() {
  const { state, dispatch } = useGame();
  const level = LEVELS[state.currentLevelIndex];
  const [idx, setIdx] = useState(0);
  const [zoom, setZoom] = useState(1);
  const viewed = state.imageStudyProgress[level.id] ?? [];
  const isStudied = viewed.includes(idx);
  const allStudied = level.images.every((_, i) => viewed.includes(i));

  // Automatically mark the current image as studied when it is viewed
  useEffect(() => {
    dispatch({ type: "MARK_IMAGE_STUDIED", levelId: level.id, imageIndex: idx });
  }, [idx, level.id, dispatch]);


  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-ink text-white">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-white/10 px-6 py-4 sm:flex sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <button
            onClick={() => dispatch({ type: "GOTO", screen: "levelIntro" })}
            className="rounded-full p-2 hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-widest text-white/50">
              Level {level.number} · Study
            </p>
            <h2 className="font-display text-lg font-bold truncate">
              Image {idx + 1} of {level.images.length}
            </h2>
          </div>
        </div>
        <div
          className="flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold"
          style={{ backgroundColor: "var(--gold)", color: "#3a2a00" }}
        >
          <BookOpen className="h-3.5 w-3.5" />
          Study Mode
        </div>
      </header>

      <div className="flex-1 overflow-auto px-4 py-6 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              style={{ transform: `scale(${zoom})`, transformOrigin: "top center" }}
            >
              <ClaimCard data={level.images[idx]} imageUrl={level.images[idx].imageUrl} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <footer className="border-t border-white/10 px-6 py-4">
        <div className="mx-auto flex max-w-3xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIdx((i) => Math.max(0, i - 1))}
              disabled={idx === 0}
              className="rounded-full border border-white/20 p-2 hover:bg-white/10 disabled:opacity-30"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIdx((i) => Math.min(level.images.length - 1, i + 1))}
              disabled={idx === level.images.length - 1}
              className="rounded-full border border-white/20 p-2 hover:bg-white/10 disabled:opacity-30"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
            <div className="ml-2 flex items-center gap-1">
              <button
                onClick={() => setZoom((z) => Math.max(0.7, z - 0.1))}
                className="rounded-full border border-white/20 p-2 hover:bg-white/10"
              >
                <ZoomOut className="h-4 w-4" />
              </button>
              <button
                onClick={() => setZoom((z) => Math.min(1.4, z + 0.1))}
                className="rounded-full border border-white/20 p-2 hover:bg-white/10"
              >
                <ZoomIn className="h-4 w-4" />
              </button>
            </div>
          </div>

          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={isStudied}
              onChange={() =>
                dispatch({ type: "MARK_IMAGE_STUDIED", levelId: level.id, imageIndex: idx })
              }
              className="peer sr-only"
            />
            <span
              className={`flex h-5 w-5 items-center justify-center rounded border-2 transition ${
                isStudied ? "border-transparent" : "border-white/30"
              }`}
              style={isStudied ? { backgroundColor: "var(--brand)" } : undefined}
            >
              {isStudied && <Check className="h-3.5 w-3.5" />}
            </span>
            Mark as studied
          </label>

          <div className="flex flex-col items-stretch gap-2 sm:items-end">
            <div className="w-44">
              <ProgressBar value={viewed.length} max={level.images.length} />
            </div>
            <button
              disabled={!allStudied}
              onClick={() => dispatch({ type: "START_QUIZZ" })}
              className="rounded-full px-5 py-2 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-40"
              style={{ backgroundColor: "var(--brand)" }}
            >
              Proceed to Questions
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
