import { ReactNode, useEffect, useState } from "react";
import { Shield, Monitor } from "lucide-react";

interface MainframeTerminalProps {
  headerTitle: string;
  commandValue?: string;
  children: ReactNode;
  infoBarText?: string;
  statusText?: string;
}

export function MainframeTerminal({
  headerTitle,
  commandValue = "",
  children,
  infoBarText = "PF3=EXIT  PF7=UP  PF8=DOWN",
  statusText = "ONLINE",
}: MainframeTerminalProps) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toTimeString().split(" ")[0]);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full min-h-0 flex flex-col bg-white border-2 border-emerald-600/30 rounded-2xl overflow-hidden shadow-lg select-none">
      {/* Terminal Title Bar */}
      <div className="flex flex-wrap items-center justify-between gap-y-1 gap-x-4 bg-emerald-700 text-[#E9F8F0] px-4 py-3 font-sans border-b border-emerald-800">
        <div className="flex items-center gap-2">
          <Monitor className="w-5 h-5 text-[#25BB64] animate-pulse" />
          <span className="text-sm font-bold tracking-wider font-mono">ASI-3270 LINK</span>
        </div>
        <div className="text-sm font-mono font-medium opacity-90">
          SYSTEM: <span className="text-[#25BB64] font-bold">HUM_MAIN_PROD</span>
        </div>
        <div className="flex items-center gap-1 text-sm font-mono opacity-80">
          <Shield className="w-4 h-4 text-[#25BB64]" /> SECURE
        </div>
      </div>

      {/* Terminal Display Viewport */}
      <div className="bg-[#E9F8F0]/30 p-5 flex flex-col flex-grow min-h-[min(340px,45dvh)] font-mono text-emerald-950 relative overflow-hidden">
        {/* Terminal Header Info */}
        <div className="flex flex-wrap justify-between items-center gap-2 text-sm text-emerald-800/80 border-b border-emerald-600/20 pb-2 mb-3">
          <span>{headerTitle}</span>
          <span className="text-sm">
            {time} | TERM: AM042
          </span>
        </div>

        {/* Inner Content Area */}
        <div className="flex-grow flex flex-col text-base tracking-wide leading-relaxed overflow-x-auto">
          {children}
        </div>

        {/* Command Prompt Line */}
        <div className="mt-4 pt-3 border-t border-emerald-600/20 flex flex-wrap items-center justify-between gap-2 text-sm font-bold text-emerald-800">
          <div className="flex items-center gap-2 flex-grow min-w-0">
            <span className="text-[#25BB64] shrink-0">CMD ===&gt;</span>
            <div className="flex-grow min-w-0 max-w-full bg-white border border-emerald-500/30 rounded px-2.5 py-1.5 text-emerald-900 font-mono shadow-sm flex items-center min-h-9 text-base font-semibold select-all">
              {commandValue || <span className="text-emerald-950/20 font-normal">ASI,LAST,FIRST,ST</span>}
              {commandValue && <span className="w-1.5 h-4 bg-emerald-600 ml-1 animate-pulse inline-block" />}
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm shrink-0">
            <span className="px-2 py-1 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded">
              {statusText}
            </span>
          </div>
        </div>
      </div>

      {/* Terminal Keypad/Status Bar Footer */}
      <div className="bg-emerald-50 border-t border-emerald-600/20 px-5 py-2.5 flex flex-wrap items-center justify-between gap-2 text-sm text-emerald-700 font-mono">
        <span className="tracking-wider">{infoBarText}</span>
        <span className="opacity-70">Humana IT © 2026</span>
      </div>
    </div>
  );
}
