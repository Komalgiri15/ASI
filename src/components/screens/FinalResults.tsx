import { motion } from "framer-motion";
import { Trophy, Sparkles, Award, RotateCcw, ShieldCheck, Terminal, MapPin } from "lucide-react";
import { useGame } from "@/state/gameContext";
import { CASES } from "@/data/levels";
import { Scout } from "@/components/Scout";
import { HumanaWordmark } from "@/components/HumanaWordmark";

export function FinalResults() {
  const { state, dispatch } = useGame();

  const handleRestart = () => {
    dispatch({ type: "RESET" });
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-gradient-to-b from-[#E9F8F0] to-[#dbf5e7]">
      {/* Header bar */}
      <header className="flex items-center justify-between border-b border-emerald-100 bg-white/95 px-6 py-4 shadow-sm z-10 shrink-0">
        <div className="min-w-0">
          <p className="text-sm font-bold uppercase tracking-wider text-slate-400">
            Training Report
          </p>
          <h2 className="font-display text-lg font-extrabold text-slate-800 truncate">
            ASI Quest — Final Summary
          </h2>
        </div>
        <button
          onClick={handleRestart}
          className="inline-flex items-center gap-1.5 rounded-full bg-slate-800 hover:bg-slate-900 border border-slate-950 px-4 py-2 text-sm font-bold text-white shadow-sm cursor-pointer transition"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Play Again
        </button>
      </header>

      {/* Main content scroll area */}
      <div className="flex-grow overflow-y-auto px-6 py-8">
        <div className="mx-auto max-w-4xl w-full space-y-8 pb-10">
          {/* Certificate Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="bg-white border-8 border-double border-yellow-400/60 rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden"
          >
            {/* Corner Decorative Borders */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-yellow-500/40" />
            <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-yellow-500/40" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-yellow-500/40" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-yellow-500/40" />

            <div className="text-center flex flex-col items-center select-none">
              {/* Humana Wordmark */}
              <HumanaWordmark className="text-2xl text-emerald-800" />

              <span className="text-sm font-bold uppercase tracking-[0.25em] text-[#25BB64] mt-6 block">
                Certificate of Completion
              </span>

              <h1 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight leading-tight">
                ASI Certified Navigator
              </h1>

              <div className="h-[2px] w-32 bg-yellow-400 my-4" />

              <p className="text-sm text-slate-500 max-w-md leading-relaxed">
                This certifies that the training participant has successfully audited claims files, navigated regional systems, and mastered the
              </p>
              <h3 className="font-mono text-sm font-bold text-emerald-900 bg-emerald-50 px-3 py-1 rounded border border-emerald-100 mt-2">
                ASI-3270 MAINFRAME SEARCH SYSTEM
              </h3>

              {/* Recipient details */}
              <div className="mt-6">
                <span className="text-sm uppercase font-bold text-slate-400 block">
                  Designation Achieved
                </span>
                <span className="font-display text-lg font-extrabold text-[#25BB64] block mt-0.5">
                  Mainframe Search Specialist
                </span>
              </div>

              {/* Badge & Mascot Row */}
              <div className="mt-8 flex items-center justify-center gap-6 pb-6 border-b border-slate-100 w-full max-w-md">
                <Scout mood="celebrate" size={100} />
                <div className="text-left font-mono text-sm space-y-1.5 text-slate-650">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#25BB64]" />
                    <span>Total XP: <strong className="text-slate-800">{state.totalXP} XP</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5 text-yellow-500 fill-yellow-50" />
                    <span>Badges: <strong className="text-slate-800">{state.achievements.length} Earned</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Cases: <strong className="text-slate-800">3/3 Solved</strong></span>
                  </div>
                </div>
              </div>

              {/* Footer signatures */}
              <div className="mt-6 flex justify-between w-full max-w-md text-sm font-sans text-slate-500 pt-2 px-2">
                <div className="text-left">
                  <span className="text-sm uppercase font-bold block text-slate-400">Date</span>
                  <span className="font-semibold text-slate-700">{currentDate}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm uppercase font-bold block text-slate-400">Authorized Guide</span>
                  <span className="font-semibold text-emerald-850 font-display flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-yellow-500" /> Scout Mascot
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Badges Breakdown */}
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm text-left"
          >
            <h3 className="font-display text-base font-extrabold text-slate-800 flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-500 fill-yellow-100" />
              <span>Earned Badge Log</span>
            </h3>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {CASES.map((c) => {
                const earned = state.achievements.includes(c.badge);
                return (
                  <div
                    key={c.id}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border text-center transition ${
                      earned
                        ? "bg-emerald-500/5 border-emerald-250 text-emerald-950"
                        : "border-dashed border-slate-200 bg-slate-50/50 opacity-60"
                    }`}
                  >
                    <div
                      className={`h-11 w-11 rounded-full flex items-center justify-center text-white ${
                        earned ? "bg-emerald-500 border border-emerald-600 shadow-sm" : "bg-slate-350"
                      }`}
                    >
                      <Trophy className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-bold mt-2 truncate max-w-full">{c.badge}</span>
                    <span className="text-sm text-slate-400 uppercase font-mono mt-0.5">
                      {earned ? "UNLOCKED" : "LOCKED"}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.section>

          {/* Case Audit Summary */}
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm text-left font-mono"
          >
            <h3 className="font-display text-base font-extrabold text-slate-800 flex items-center gap-2 font-sans">
              <Terminal className="w-5 h-5 text-[#25BB64]" />
              <span>Case Log Details</span>
            </h3>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-100 pb-2 text-sm uppercase font-bold">
                    <th className="pb-3">Case</th>
                    <th className="pb-3">Mainframe Target</th>
                    <th className="pb-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {CASES.map((c) => {
                    return (
                      <tr key={c.id} className="border-b border-slate-50">
                        <td className="py-3 font-bold text-slate-800">Case 0{c.number}</td>
                        <td className="py-3 text-slate-500">{c.caseName}</td>
                        <td className="py-3 text-right">
                          <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-250 text-emerald-800 font-bold text-sm uppercase">
                            RESOLVED
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
