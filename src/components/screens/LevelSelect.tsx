import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "@/state/gameContext";
import { CASES } from "@/data/levels";
import scoutImg from "@/assets/ava.png";
import useTTS from "@/hooks/useTTS";

export function LevelSelect() {
  const { state, dispatch } = useGame();
  const speak = useTTS();

  // Speak intro when component mounts
  useEffect(() => {
    speak("Choose a case, Search Specialist. Select a case to begin your investigation.");
  }, []);

  // Focus on first button for accessibility
  useEffect(() => {
    const firstBtn = document.querySelector<HTMLButtonElement>("button[data-start]");
    firstBtn?.focus();
  }, []);

  const handleStart = (index: number) => {
    dispatch({ type: "START_CASE", index });
  };

  return (
    <div className="h-full w-full bg-black/30 flex items-center justify-center p-4 overflow-y-auto">
      <AnimatePresence>
        <motion.div
          className="relative w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col sm:flex-row my-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          {/* Left panel – Scout avatar */}
          <motion.div
            className="sm:w-48 bg-[#E9F8F0] flex items-center justify-center p-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.img
              src={scoutImg}
              alt="Scout"
              className="w-32 h-32 object-contain"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 200 }}
            />
          </motion.div>
          {/* Right panel – Cases list */}
          <div className="flex-1 p-6 overflow-y-auto">
            <h2 className="text-2xl font-display text-emerald-800 mb-4">
              Choose a Case
            </h2>
            <motion.ul
              className="space-y-4"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } },
              }}
            >
              {CASES.map((caseDef, i) => {
                const cState = state.cases[i];
                const isLocked = !cState.unlocked;
                const isCompleted = cState.completed;
                return (
                  <motion.li
                    key={caseDef.id}
                    whileHover={{ scale: 1.02, boxShadow: "0px 4px 12px rgba(0,0,0,0.15)" }}
                    className="flex flex-wrap items-center justify-between gap-3 p-4 border rounded-lg bg-gradient-to-r from-[#E9F8F0] to-white shadow-sm"
                  >
                    <div>
                      <p className="font-bold text-emerald-800 text-lg">
                        {caseDef.name}
                      </p>
                      <p className="text-sm text-slate-600 mb-1">
                        {caseDef.description}
                      </p>
                      <p className="text-base text-emerald-600">
                        Badge: {caseDef.badge}
                      </p>
                    </div>
                    <button
                      id={`start-case-${caseDef.id}`}
                      data-start
                      disabled={isLocked}
                      onClick={() => handleStart(i)}
                      className={`px-5 py-2.5 rounded-full text-base font-semibold transition-all shrink-0
                        ${isLocked ? "bg-slate-200 text-slate-400 cursor-not-allowed" : isCompleted ? "bg-emerald-800 hover:bg-emerald-900 text-white" : "bg-emerald-600 hover:bg-emerald-700 text-white"}`}
                    >
                      {isCompleted ? "Replay" : isLocked ? "Locked" : "Start"}
                    </button>
                  </motion.li>
                );
              })}
            </motion.ul>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
