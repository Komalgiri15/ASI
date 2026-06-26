import { motion } from "framer-motion";
import { FolderOpen, Terminal } from "lucide-react";
import { useGame } from "@/state/gameContext";
import { HumanaWordmark } from "@/components/HumanaWordmark";
import { Scout } from "@/components/Scout";

export function Landing() {
  const { dispatch } = useGame();

  const handleStart = () => {
    dispatch({ type: "GOTO", screen: "journey" });
  };

  return (
    <div className="relative h-full w-full flex flex-col items-center justify-center bg-gradient-to-b from-[#E9F8F0] to-white px-6 py-12 overflow-y-auto">
      {/* Humana Branding Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center justify-center flex-col gap-1 z-10"
      >
        <HumanaWordmark className="text-3xl text-emerald-800" />
      </motion.div>

      {/* Main Container Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.6 }}
        className="w-full max-w-lg mt-12 bg-white/95 rounded-3xl border border-emerald-100 p-8 text-center shadow-card backdrop-blur-sm flex flex-col items-center"
      >
        {/* Animated Scout Mascot */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2, bounce: 0.4 }}
          className="relative mb-6"
        >
          <div className="absolute inset-0 bg-emerald-100 rounded-full blur-xl opacity-60 animate-pulse" />
          <Scout mood="idle" size={140} className="relative z-10" />
        </motion.div>

        {/* Mascot Speech Bubble */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative bg-emerald-50 border border-emerald-100 rounded-2xl p-4 mb-6 text-sm text-emerald-900 leading-relaxed text-left max-w-md shadow-sm"
        >
          {/* Speech Bubble Arrow */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-emerald-50 border-t border-l border-emerald-100 rotate-45" />
          <p className="relative z-10">
            <strong>Scout:</strong> &quot;Greetings, Navigator! I'm Scout, your search assistant. We've got open case files coming in that require precise mainframe lookup skills. Let's practice searching and matching member files like a pro!&quot;
          </p>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-emerald-600">
            Interactive Mainframe Training
          </span>
          <h1 className="mt-1 font-display text-4xl font-extrabold tracking-tight text-slate-800 leading-tight">
            ASI <span className="text-[#25BB64]">Quest</span>
          </h1>
          <p className="mt-2 text-xs text-slate-500 font-semibold tracking-wide">
            &quot;Master the Mainframe. Search Like a Pro.&quot;
          </p>
        </motion.div>

        {/* Information Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="w-full mt-6 grid grid-cols-2 gap-3 text-left"
        >
          <div className="p-3 bg-[#E9F8F0]/40 border border-emerald-100 rounded-xl">
            <div className="flex items-center gap-1.5 text-[#25BB64] font-bold text-xs">
              <Terminal className="w-3.5 h-3.5" />
              <span>ASI-3270</span>
            </div>
            <p className="mt-1 text-[11px] text-slate-600 leading-normal">
              Learn search commands, screen reading, and group structures.
            </p>
          </div>
          <div className="p-3 bg-[#E9F8F0]/40 border border-emerald-100 rounded-xl">
            <div className="flex items-center gap-1.5 text-[#25BB64] font-bold text-xs">
              <FolderOpen className="w-3.5 h-3.5" />
              <span>3 Cases</span>
            </div>
            <p className="mt-1 text-[11px] text-slate-600 leading-normal">
              Solve detective cases directly on stylized mainframe cards.
            </p>
          </div>
        </motion.div>

        {/* Start Game CTA */}
        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleStart}
          className="pulse-glow mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full py-4 text-white font-bold text-lg cursor-pointer select-none transition-all shadow-md"
          style={{ backgroundColor: "var(--brand)" }}
        >
          <FolderOpen className="h-5 w-5" />
          Open Case Files
        </motion.button>
      </motion.div>
    </div>
  );
}
