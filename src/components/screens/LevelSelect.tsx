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
    { x: 25, y: 22, icon: <ShieldCheck className="h-7 w-7" />, label: "01. Texas Trail" },
    { x: 75, y: 50, icon: <HeartPulse className="h-7 w-7" />, label: "02. Kentucky Keys" },
    { x: 35, y: 78, icon: <Activity className="h-7 w-7" />, label: "03. MRI Mission" },
  ];

  return (
    <div className="h-full w-full bg-black/30 flex items-center justify-center p-4 overflow-y-auto">
      <AnimatePresence>
        <motion.div
          className="relative w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row my-auto border border-emerald-100"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          {/* LEFT: Case Details Sidebar */}
          <div className="md:w-80 bg-gradient-to-b from-[#E9F8F0] to-emerald-50/20 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-emerald-100">
            <div className="space-y-4">
              {/* Back to landing */}
              <button
                onClick={() => dispatch({ type: "GOTO", screen: "landing" })}
                className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-emerald-800 transition cursor-pointer"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> BACK TO LANDING
              </button>

              {/* Scout Avatar & Speech Bubble */}
              <div className="flex flex-col items-center gap-2 pt-2">
                <img
                  src={scoutImg}
                  alt="Scout"
                  className="w-36 h-auto max-h-[160px] object-contain"
                />
                
                {/* Speech Bubble */}
                <div className="relative w-full bg-white border border-emerald-100 rounded-2xl p-4 text-xs text-emerald-950 leading-relaxed text-left shadow-sm">
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-t border-l border-emerald-100 rotate-45" />
                  <p className="relative z-10">
                    <strong>Scout:</strong> &quot;{CASE_INFOS[selectedIdx].introText}&quot;
                  </p>
                </div>
              </div>

              {/* Selected Case Info Details */}
              <div className="pt-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    CASE 0{selectedCase.number}
                  </span>
                  {selectedState.completed && (
                    <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-100 text-emerald-800 px-2 py-0.5 text-[9px] font-bold">
                      <Trophy className="h-2.5 w-2.5 fill-emerald-200" /> CLOSED
                    </span>
                  )}
                </div>
                <h3 className="font-display text-lg font-bold text-slate-800 leading-tight mt-0.5">
                  {selectedCase.name}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mt-1">
                  {selectedCase.description}
                </p>

                {/* Objectives outcomes list */}
                <div className="mt-3 p-3 bg-white/70 border border-emerald-500/10 rounded-xl">
                  <span className="text-[10px] font-bold text-emerald-850 uppercase tracking-wider block mb-1">
                    Objectives:
                  </span>
                  <ul className="text-[11px] text-slate-600 list-disc list-inside space-y-0.5 leading-snug">
                    {selectedCase.outcomes.map((outcome, idx) => (
                      <li key={idx} className="truncate">
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Launch Action Button */}
            <div className="pt-6">
              {completedCount === CASES.length && (
                <button
                  onClick={() => dispatch({ type: "GOTO", screen: "finalResults" })}
                  className="w-full mb-3 rounded-full py-3 font-bold text-xs bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 border border-amber-600 text-white shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all animate-bounce"
                >
                  <Trophy className="h-4 w-4 fill-amber-200" /> CLAIM CERTIFICATE
                </button>
              )}
              <button
                disabled={isLocked}
                onClick={() => handleStart(selectedIdx)}
                className={`w-full rounded-full py-3 font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer
                  ${
                    isLocked
                      ? "bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300"
                      : isCompleted
                        ? "bg-slate-800 hover:bg-slate-900 border border-slate-950 text-white"
                        : "bg-emerald-600 hover:bg-emerald-700 border border-emerald-700 text-white"
                  }`}
              >
                {isCompleted ? (
                  <>
                    <RotateCcw className="h-4 w-4" /> Replay Case (+{selectedCase.xpValue} XP)
                  </>
                ) : isLocked ? (
                  <>
                    <Lock className="h-4 w-4" /> Locked
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" /> Launch Case (+{selectedCase.xpValue} XP)
                  </>
                )}
              </button>
            </div>
          </div>

          {/* RIGHT: Winding Map Trail Area */}
          <div className="flex-1 p-6 relative flex flex-col justify-between min-h-[460px]">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-display font-extrabold text-slate-800 tracking-tight">
                  Investigation Map
                </h2>
                <p className="text-xs text-slate-500">
                  Click a health-themed stop along the trail to view details and launch the case.
                </p>
              </div>

              {/* Status HUD (XP, Streak, Sound Toggle) */}
              <div className="flex items-center gap-2.5 self-start sm:self-center shrink-0">
                {/* Sound Toggle */}
                <button
                  onClick={() => dispatch({ type: "TOGGLE_SOUND" })}
                  className="p-2 rounded-full border border-emerald-100 hover:bg-emerald-50 text-slate-500 hover:text-emerald-800 transition cursor-pointer shadow-sm bg-white flex items-center justify-center"
                  title={state.soundMuted ? "Unmute Voiceover" : "Mute Voiceover"}
                >
                  {state.soundMuted ? (
                    <VolumeX className="h-4.5 w-4.5 text-slate-450" />
                  ) : (
                    <Volume2 className="h-4.5 w-4.5 text-emerald-600" />
                  )}
                </button>

                {/* Streak Counter */}
                {state.streak > 0 && (
                  <div className="flex items-center gap-1 rounded-full bg-orange-50 border border-orange-200 px-2.5 py-1 text-orange-600 text-[11px] font-bold shadow-sm">
                    <Flame className="h-3.5 w-3.5 fill-orange-500 text-orange-500 animate-bounce" />
                    <span>{state.streak} STREAK</span>
                  </div>
                )}

                {/* XP Badge */}
                <div className="flex items-center gap-1 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/40 px-2.5 py-1 font-display text-[11px] font-bold text-yellow-800 shadow-sm">
                  <Sparkles className="h-3.5 w-3.5 fill-[#FFD700] text-[#D97706]" />
                  <span>{state.totalXP} XP</span>
                </div>
              </div>
            </div>

            {/* Map Canvas viewport */}
            <div className="relative flex-1 w-full min-h-[340px] mt-4 border border-emerald-100/50 bg-[#F9FDFB] rounded-2xl overflow-hidden shadow-inner">
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
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                {/* Winding active road */}
                <path
                  d="M 25 22 C 60 22, 85 32, 75 50 C 65 68, 30 63, 35 78"
                  fill="none"
                  stroke="#25BB64"
                  strokeWidth="3"
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
                      className={`relative h-16 w-16 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer shadow-md select-none
                        ${
                          locked
                            ? "bg-slate-100 border-slate-350 text-slate-400 cursor-not-allowed"
                            : completed
                              ? "bg-emerald-600 border-emerald-700 text-white hover:bg-emerald-700"
                              : active
                                ? "bg-emerald-50 border-emerald-500 text-emerald-800 ring-4 ring-emerald-100/80 shadow-[0_0_20px_rgba(37,187,100,0.5)]"
                                : "bg-white border-emerald-300 text-emerald-700 hover:bg-emerald-50/60"
                        }`}
                    >
                      {/* Icon inside Node */}
                      {locked ? <Lock className="h-6 w-6 text-slate-400" /> : node.icon}

                      {/* Small Indicator Overlays */}
                      {completed && (
                        <span className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-yellow-400 border border-yellow-500 text-slate-900 flex items-center justify-center font-bold text-[9px] shadow-sm">
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
                      className={`absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-center px-2 py-0.5 rounded text-[10px] font-bold border transition shadow-sm
                        ${
                          active
                            ? "bg-emerald-600 border-emerald-700 text-white font-black"
                            : locked
                              ? "bg-slate-50 border-slate-200 text-slate-400 font-semibold"
                              : "bg-white border-emerald-100 text-slate-700 font-bold"
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
