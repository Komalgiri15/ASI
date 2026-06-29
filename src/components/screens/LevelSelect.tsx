import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "@/state/gameContext";
import { CASES } from "@/data/levels";
import scoutImg from "@/assets/ava.png";
import useTTS from "@/hooks/useTTS";
import { ShieldCheck, HeartPulse, Activity, Lock, Trophy, ArrowLeft, Play, RotateCcw, Volume2, VolumeX, Flame, Sparkles } from "lucide-react";

export function LevelSelect() {
  const { state, dispatch } = useGame();
  const speak = useTTS();

  // Find the current active/unlocked case index to select by default
  const activeCaseIdx = state.cases.findIndex((c) => !c.completed && c.unlocked);
  const defaultIdx = activeCaseIdx !== -1 ? activeCaseIdx : 0;
  const [selectedIdx, setSelectedIdx] = useState(defaultIdx);

  const selectedCase = CASES[selectedIdx];
  const selectedState = state.cases[selectedIdx];
  
  const isLocked = !selectedState.unlocked;
  const isCompleted = selectedState.completed;

  const completedCount = state.cases.filter((c) => c.completed).length;

  const CASE_INFOS = [
    {
      introText: "Let's locate Markus Jones in Texas! We'll audit his group configuration and verify his member file.",
      speech: "Choose Case 1, The Texas Trail, to begin your claims verification training."
    },
    {
      introText: "We need to search Kentucky member databases and audit suffixes to resolve a regional claim. Ready, Specialist?",
      speech: "Select Case 2, Kentucky Keys, to start auditing member records in Kentucky."
    },
    {
      introText: "The MRI Mission requires re-confirming the Erlanger record and navigating to member referrals. Let's finish this!",
      speech: "Select Case 3, The MRI Mission, to complete your search certification."
    }
  ];

  // Speak initial intro
  useEffect(() => {
    speak("Welcome back, Specialist. Select a case stop on the map to review details and launch your mission.");
  }, []);

  const handleNodeClick = (index: number) => {
    setSelectedIdx(index);
    speak(CASE_INFOS[index].speech);
  };

  const handleStart = (index: number) => {
    dispatch({ type: "START_CASE", index });
  };

  // Coordinates for the SVG winding path and nodes
  const nodes = [
    { x: 25, y: 22, icon: <ShieldCheck className="h-10 w-10" />, label: "01. Texas Trail" },
    { x: 75, y: 50, icon: <HeartPulse className="h-10 w-10" />, label: "02. Kentucky Keys" },
    { x: 35, y: 78, icon: <Activity className="h-10 w-10" />, label: "03. MRI Mission" },
  ];

  return (
    <div className="h-full w-full overflow-hidden bg-[#E9F8F0]">
      <AnimatePresence>
        <motion.div
          className="relative flex h-full w-full flex-col overflow-hidden bg-white md:flex-row"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* LEFT: Case Details Sidebar */}
          <div className="flex h-full min-h-0 flex-col justify-between border-b border-emerald-100 bg-gradient-to-b from-[#E9F8F0] to-emerald-50/20 p-5 md:w-96 md:shrink-0 md:border-b-0 md:border-r xl:w-[28rem]">
            <div className="min-h-0 flex-1 space-y-3 overflow-y-auto">
              {/* Back to landing */}
              <button
                onClick={() => dispatch({ type: "GOTO", screen: "landing" })}
                className="flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-emerald-800 cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" /> BACK TO LANDING
              </button>

              {/* Scout Avatar & Speech Bubble */}
              <div className="flex flex-col items-center gap-3 pt-1">
                <img
                  src={scoutImg}
                  alt="Scout"
                  className="h-auto w-44 max-h-[200px] object-contain"
                />
                
                {/* Speech Bubble */}
                <div className="relative w-full rounded-2xl border border-emerald-100 bg-white p-4 text-left text-base leading-relaxed text-emerald-950 shadow-sm">
                  <div className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-t border-l border-emerald-100 bg-white" />
                  <p className="relative z-10">
                    <strong>Scout:</strong> &quot;{CASE_INFOS[selectedIdx].introText}&quot;
                  </p>
                </div>
              </div>

              {/* Selected Case Info Details */}
              <div className="pt-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold uppercase tracking-wider text-slate-400">
                    CASE 0{selectedCase.number}
                  </span>
                  {selectedState.completed && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                      <Trophy className="h-3.5 w-3.5 fill-emerald-200" /> CLOSED
                    </span>
                  )}
                </div>
                <h3 className="mt-0.5 font-display text-2xl font-bold leading-tight text-slate-800">
                  {selectedCase.name}
                </h3>
                <p className="mt-1.5 text-base leading-relaxed text-slate-500">
                  {selectedCase.description}
                </p>

                {/* Objectives outcomes list */}
                <div className="mt-3 rounded-xl border border-emerald-500/10 bg-white/70 p-4">
                  <span className="mb-1.5 block text-sm font-bold uppercase tracking-wider text-emerald-850">
                    Objectives:
                  </span>
                  <ul className="list-inside list-disc space-y-1 text-base leading-snug text-slate-600">
                    {selectedCase.outcomes.map((outcome, idx) => (
                      <li key={idx}>
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Launch Action Button */}
            <div className="shrink-0 pt-3">
              {completedCount === CASES.length && (
                <button
                  onClick={() => dispatch({ type: "GOTO", screen: "finalResults" })}
                  className="mb-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-amber-600 bg-gradient-to-r from-amber-500 to-yellow-500 py-3.5 text-base font-bold text-white shadow-md transition-all animate-bounce hover:from-amber-600 hover:to-yellow-600"
                >
                  <Trophy className="h-5 w-5 fill-amber-200" /> CLAIM CERTIFICATE
                </button>
              )}
              <button
                disabled={isLocked}
                onClick={() => handleStart(selectedIdx)}
                className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-full py-4 text-lg font-bold shadow-md transition-all
                  ${
                    isLocked
                      ? "cursor-not-allowed border border-slate-300 bg-slate-200 text-slate-400"
                      : isCompleted
                        ? "border border-slate-950 bg-slate-800 text-white hover:bg-slate-900"
                        : "border border-emerald-700 bg-emerald-600 text-white hover:bg-emerald-700"
                  }`}
              >
                {isCompleted ? (
                  <>
                    <RotateCcw className="h-5 w-5" /> Replay Case (+{selectedCase.xpValue} XP)
                  </>
                ) : isLocked ? (
                  <>
                    <Lock className="h-5 w-5" /> Locked
                  </>
                ) : (
                  <>
                    <Play className="h-5 w-5" /> Launch Case (+{selectedCase.xpValue} XP)
                  </>
                )}
              </button>
            </div>
          </div>

          {/* RIGHT: Winding Map Trail Area */}
          <div className="relative flex min-h-0 flex-1 flex-col p-4 md:p-5">
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-800 md:text-4xl">
                  Investigation Map
                </h2>
                <p className="mt-1 text-base text-slate-500">
                  Click a health-themed stop along the trail to view details and launch the case.
                </p>
              </div>

              {/* Status HUD (XP, Streak, Sound Toggle) */}
              <div className="flex shrink-0 items-center gap-3 self-start sm:self-center">
                {/* Sound Toggle */}
                <button
                  onClick={() => dispatch({ type: "TOGGLE_SOUND" })}
                  className="flex cursor-pointer items-center justify-center rounded-full border border-emerald-100 bg-white p-2.5 text-slate-500 shadow-sm transition hover:bg-emerald-50 hover:text-emerald-800"
                  title={state.soundMuted ? "Unmute Voiceover" : "Mute Voiceover"}
                >
                  {state.soundMuted ? (
                    <VolumeX className="h-5 w-5 text-slate-450" />
                  ) : (
                    <Volume2 className="h-5 w-5 text-emerald-600" />
                  )}
                </button>

                {/* Streak Counter */}
                {state.streak > 0 && (
                  <div className="flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-3 py-1.5 text-sm font-bold text-orange-600 shadow-sm">
                    <Flame className="h-4 w-4 fill-orange-500 text-orange-500 animate-bounce" />
                    <span>{state.streak} STREAK</span>
                  </div>
                )}

                {/* XP Badge */}
                <div className="flex items-center gap-1.5 rounded-full border border-[#FFD700]/40 bg-[#FFD700]/10 px-3 py-1.5 font-display text-sm font-bold text-yellow-800 shadow-sm">
                  <Sparkles className="h-4 w-4 fill-[#FFD700] text-[#D97706]" />
                  <span>{state.totalXP} XP</span>
                </div>
              </div>
            </div>

            {/* Map Canvas viewport */}
            <div className="relative mt-3 min-h-0 w-full flex-1 overflow-hidden rounded-2xl border border-emerald-100/50 bg-[#F9FDFB] shadow-inner">
              {/* Grid Background Pattern */}
              <div 
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(#25BB64 1px, transparent 1px)",
                  backgroundSize: "20px 20px"
                }}
              />

              {/* Winding SVG Road Path */}
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full pointer-events-none"
              >
                {/* Winding shadow road */}
                <path
                  d="M 25 22 C 60 22, 85 32, 75 50 C 65 68, 30 63, 35 78"
                  fill="none"
                  stroke="#E9F8F0"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                {/* Winding active road */}
                <path
                  d="M 25 22 C 60 22, 85 32, 75 50 C 65 68, 30 63, 35 78"
                  fill="none"
                  stroke="#25BB64"
                  strokeWidth="5"
                  strokeDasharray="5 5"
                  strokeLinecap="round"
                  className="opacity-70"
                />
              </svg>

              {/* Stop Nodes placed on the coordinates */}
              {nodes.map((node, i) => {
                const cState = state.cases[i];
                const active = i === selectedIdx;
                const locked = !cState.unlocked;
                const completed = cState.completed;
                const playable = !completed && cState.unlocked;

                return (
                  <div
                    key={i}
                    className="absolute"
                    style={{
                      left: `${node.x}%`,
                      top: `${node.y}%`,
                      transform: "translate(-50%, -50%)"
                    }}
                  >
                    {/* Node Circle */}
                    <motion.button
                      onClick={() => handleNodeClick(i)}
                      whileHover={{ scale: locked ? 1 : 1.1 }}
                      whileTap={{ scale: locked ? 1 : 0.95 }}
                      className={`relative flex h-20 w-20 items-center justify-center rounded-full border-2 shadow-md transition-all select-none cursor-pointer md:h-24 md:w-24
                        ${
                          locked
                            ? "cursor-not-allowed border-slate-350 bg-slate-100 text-slate-400"
                            : completed
                              ? "border-emerald-700 bg-emerald-600 text-white hover:bg-emerald-700"
                              : active
                                ? "border-emerald-500 bg-emerald-50 text-emerald-800 shadow-[0_0_20px_rgba(37,187,100,0.5)] ring-4 ring-emerald-100/80"
                                : "border-emerald-300 bg-white text-emerald-700 hover:bg-emerald-50/60"
                        }`}
                    >
                      {/* Icon inside Node */}
                      {locked ? <Lock className="h-8 w-8 text-slate-400" /> : node.icon}

                      {/* Small Indicator Overlays */}
                      {completed && (
                        <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border border-yellow-500 bg-yellow-400 text-xs font-bold text-slate-900 shadow-sm">
                          ✓
                        </span>
                      )}
                      
                      {/* Pulsing Ring for active node */}
                      {playable && (
                        <span className="absolute -inset-1 rounded-full border-2 border-emerald-500 animate-ping opacity-30 pointer-events-none" />
                      )}
                    </motion.button>

                    {/* Node Text Label */}
                    <div 
                      className={`absolute top-full left-1/2 mt-2.5 -translate-x-1/2 whitespace-nowrap rounded-md border px-3 py-1 text-center text-sm font-bold shadow-sm transition md:text-base
                        ${
                          active
                            ? "border-emerald-700 bg-emerald-600 font-black text-white"
                            : locked
                              ? "border-slate-200 bg-slate-50 font-semibold text-slate-400"
                              : "border-emerald-100 bg-white font-bold text-slate-700"
                        }`}
                    >
                      {node.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
