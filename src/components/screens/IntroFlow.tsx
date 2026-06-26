import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "@/state/gameContext";
import { Scout } from "@/components/Scout";
import { HumanaWordmark } from "@/components/HumanaWordmark";
import introVideo from "@/assets/intro.mp4";
import levelsVideo from "@/assets/levels.mp4";
import useTTS from "@/hooks/useTTS";
import {
  Search,
  Shield,
  Zap,
  Lock,
  Trophy,
  ChevronRight,
  Terminal,
  Star,
} from "lucide-react";

// ─── Capability chip ────────────────────────────────────────────────────────
function CapChip({
  icon,
  label,
  sub,
  locked,
  delay,
}: {
  icon: React.ReactNode;
  label: string;
  sub: string;
  locked?: boolean;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay ?? 0, duration: 0.35 }}
      className={`flex items-center gap-3 rounded-2xl border px-3.5 py-2.5 ${
        locked
          ? "border-slate-100 bg-slate-50 opacity-60"
          : "border-emerald-100 bg-[#E9F8F0]/70"
      }`}
    >
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border text-sm ${
          locked
            ? "border-slate-200 bg-white text-slate-300"
            : "border-emerald-200 bg-white text-[#25BB64] shadow-sm"
        }`}
      >
        {locked ? <Lock className="h-3.5 w-3.5" /> : icon}
      </div>
      <div className="min-w-0 text-left">
        <div className="text-sm font-bold uppercase tracking-widest text-slate-400">
          {sub}
        </div>
        <div
          className={`truncate text-sm font-bold ${
            locked ? "text-slate-300" : "text-slate-700"
          }`}
        >
          {locked ? "Locked" : label}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Mission card ────────────────────────────────────────────────────────────
function MissionCard({
  num,
  title,
  locked,
  delay,
}: {
  num: string;
  title: string;
  locked: boolean;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay ?? 0, duration: 0.35 }}
      className={`flex items-center gap-3 rounded-2xl border px-3.5 py-2.5 ${
        locked
          ? "border-slate-100 bg-slate-50 opacity-60"
          : "border-emerald-200 bg-[#E9F8F0]/70 shadow-sm"
      }`}
    >
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border font-mono text-xs font-black ${
          locked
            ? "border-slate-200 bg-white text-slate-300"
            : "border-emerald-200 bg-white text-emerald-700 shadow-sm"
        }`}
      >
        {locked ? <Lock className="h-3.5 w-3.5" /> : num}
      </div>
      <div className="min-w-0 text-left">
        <div className="text-sm font-bold uppercase tracking-widest text-slate-400">
          Case {num}
        </div>
        <div
          className={`truncate text-sm font-bold ${
            locked ? "text-slate-300" : "text-slate-700"
          }`}
        >
          {title}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main registration screen ─────────────────────────────────────────────────
function AgentRegistration({ onSubmit }: { onSubmit: (name: string) => void }) {
  const speak = useTTS();
  const [name, setName] = useState("");
  const [focused, setFocused] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Speak registration welcome text when screen loads
  useEffect(() => {
    speak("Welcome, Navigator! Enter your name to register as a Search Specialist. Your badge will be issued upon completion!");
  }, []);

  const displayName = name.trim() || "AGENT_001";
  const isReady = name.trim().length >= 2;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isReady || submitting) return;
    setSubmitting(true);
    setTimeout(() => onSubmit(name.trim()), 650);
  };

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-start overflow-y-auto bg-gradient-to-b from-[#E9F8F0] to-white px-4 py-8">

      {/* Humana header — matches Landing / Journey */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6 flex flex-col items-center gap-1"
      >
        <HumanaWordmark className="text-3xl text-emerald-800" />
        <span className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-600">
          Interactive Mainframe Training
        </span>
      </motion.div>

      {/* Three-column layout */}
      <div className="flex w-full max-w-4xl items-start justify-center gap-6 flex-col lg:flex-row">

        {/* LEFT — Capabilities */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hidden w-48 flex-col gap-2 lg:flex"
        >
          <p className="mb-1 text-sm font-bold uppercase tracking-widest text-slate-400">
            Agent Capabilities
          </p>
          <CapChip
            icon={<Search className="h-3.5 w-3.5" />}
            sub="Skill"
            label="Record Search"
            delay={0.15}
          />
          <CapChip
            icon={<Shield className="h-3.5 w-3.5" />}
            sub="Role"
            label="Claims Navigator"
            delay={0.2}
          />
          <CapChip
            icon={<Zap className="h-3.5 w-3.5" />}
            sub="Clearance"
            label="Level 1"
            delay={0.25}
          />
          <CapChip
            icon={<Trophy className="h-3.5 w-3.5" />}
            sub="Badge"
            label="Unearned"
            locked
            delay={0.3}
          />
          <CapChip
            icon={<Star className="h-3.5 w-3.5" />}
            sub="Total XP"
            label="0 / 450"
            locked
            delay={0.35}
          />
        </motion.div>

        {/* CENTER — Hero card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", duration: 0.55, delay: 0.05 }}
          className="w-full max-w-md bg-white/95 rounded-3xl border border-emerald-100 shadow-card p-7 flex flex-col items-center text-center"
        >
          {/* Live name display — big hero text behind Scout */}
          <div className="relative mb-1 w-full overflow-hidden">
            <motion.p
              key={displayName}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18 }}
              className="select-none font-display text-3xl font-black uppercase leading-none tracking-tight text-emerald-50"
              aria-hidden
            >
              {displayName}
            </motion.p>
            {/* Outline version on top */}
            <motion.p
              key={`ol-${displayName}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-0 select-none font-display text-3xl font-black uppercase leading-none tracking-tight"
              style={{
                WebkitTextStroke: "1.5px #25BB64",
                color: "transparent",
              }}
              aria-hidden
            >
              {displayName}
            </motion.p>
          </div>

          {/* Scout mascot */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", delay: 0.2, bounce: 0.35 }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-full bg-emerald-100 blur-xl opacity-60 animate-pulse" />
            <Scout
              mood={submitting ? "celebrate" : focused ? "think" : "idle"}
              size={180}
              className="relative z-10"
            />
          </motion.div>

          {/* Speech bubble */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="relative mt-4 w-full bg-emerald-50 border border-emerald-100 rounded-2xl p-3.5 text-base text-emerald-900 leading-relaxed text-left shadow-sm"
          >
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 h-4 w-4 rotate-45 bg-emerald-50 border-t border-l border-emerald-100" />
            <p className="relative z-10">
              <strong>Scout:</strong> &quot;Welcome, Navigator! Enter your name to register as a Search Specialist. Your badge will be issued upon completion!&quot;
            </p>
          </motion.div>

          {/* Role tag */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-4 flex items-center gap-2 rounded-full border border-emerald-200 bg-[#E9F8F0] px-4 py-1.5"
          >
            <Terminal className="h-3 w-3 text-[#25BB64]" />
            <span className="font-mono text-sm font-bold uppercase tracking-wider text-emerald-700">
              SUPPORT · Claims Navigator
            </span>
          </motion.div>

          {/* Name form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.35 }}
            className="mt-5 flex w-full flex-col gap-3"
          >
            <label className="block text-left text-sm font-bold text-slate-500 uppercase tracking-wider">
              Your Name
            </label>

            {/* Input */}
            <div
              className={`flex items-center rounded-2xl border bg-white transition-all duration-200 ${
                focused
                  ? "border-[#25BB64] ring-2 ring-emerald-100 shadow-sm"
                  : "border-emerald-100 hover:border-emerald-200"
              }`}
            >
              <span className="pl-4 font-mono text-sm font-bold text-[#25BB64] select-none">
                &gt;_
              </span>
              <input
                ref={inputRef}
                required
                minLength={2}
                maxLength={24}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Enter your name"
                className="flex-1 bg-transparent px-3 py-3 font-sans text-base font-semibold text-slate-800 placeholder-slate-300 outline-none"
                autoComplete="off"
              />
              <span className="pr-4 font-mono text-sm text-slate-300">
                {name.length}/24
              </span>
            </div>

            {/* CTA button */}
            <motion.button
              type="submit"
              disabled={!isReady || submitting}
              whileHover={isReady && !submitting ? { scale: 1.02 } : {}}
              whileTap={isReady && !submitting ? { scale: 0.98 } : {}}
              className={`group mt-1 inline-flex w-full items-center justify-center gap-2 rounded-full py-3.5 font-bold text-base transition-all shadow-md select-none ${
                isReady && !submitting
                  ? "cursor-pointer text-white"
                  : "cursor-not-allowed bg-slate-100 text-slate-300"
              }`}
              style={
                isReady && !submitting
                  ? { backgroundColor: "var(--brand)" }
                  : {}
              }
            >
              {submitting ? (
                <>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.7, ease: "linear" }}
                    className="inline-block h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                  />
                  Deploying…
                </>
              ) : (
                <>
                  Deploy Agent
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </motion.button>

            <p className="text-center text-sm text-slate-400">
              Your name will appear on your completion certificate
            </p>
          </motion.form>
        </motion.div>

        {/* Mobile/tablet — stacked capabilities & briefing below form */}
        <div className="flex w-full max-w-md flex-col gap-4 lg:hidden">
          <div className="rounded-2xl border border-emerald-100 bg-white/90 p-4 shadow-sm">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-slate-400">
              Agent Capabilities
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <CapChip icon={<Search className="h-4 w-4" />} sub="Skill" label="Record Search" delay={0.1} />
              <CapChip icon={<Shield className="h-4 w-4" />} sub="Role" label="Claims Navigator" delay={0.15} />
              <CapChip icon={<Zap className="h-4 w-4" />} sub="Clearance" label="Level 1" delay={0.2} />
              <CapChip icon={<Trophy className="h-4 w-4" />} sub="Badge" label="Unearned" locked delay={0.25} />
            </div>
          </div>
          <div className="rounded-2xl border border-emerald-100 bg-white/90 p-4 shadow-sm">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-slate-400">
              Mission Briefing
            </p>
            <div className="flex flex-col gap-2">
              <MissionCard num="01" title="The Texas Trail" locked={false} delay={0.1} />
              <MissionCard num="02" title="Kentucky Keys" locked delay={0.15} />
              <MissionCard num="03" title="The MRI Mission" locked delay={0.2} />
            </div>
          </div>
        </div>

        {/* RIGHT — Mission briefing */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hidden w-48 flex-col gap-2 lg:flex"
        >
          <p className="mb-1 text-sm font-bold uppercase tracking-widest text-slate-400 text-right">
            Mission Briefing
          </p>
          <MissionCard num="01" title="The Texas Trail" locked={false} delay={0.15} />
          <MissionCard num="02" title="Kentucky Keys" locked delay={0.2} />
          <MissionCard num="03" title="The MRI Mission" locked delay={0.25} />

          {/* XP progress teaser */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-1 rounded-2xl border border-emerald-100 bg-[#E9F8F0]/60 px-3.5 py-3"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-bold uppercase tracking-widest text-slate-400">
                Total XP
              </span>
              <span className="font-mono text-sm font-bold text-emerald-700">
                0 / 450
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-emerald-100">
              <div className="h-full w-0 rounded-full bg-[#25BB64]" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Root component ──────────────────────────────────────────────────────────
export function IntroFlow() {
  const { dispatch } = useGame();
  const [phase, setPhase] = useState<"video" | "register" | "levels">("video");

  const handleIntroEnd = () => setPhase("register");

  const handleRegisterSubmit = (name: string) => {
    dispatch({ type: "SET_PLAYER_NAME", name });
    setPhase("levels");
  };

  const handleLevelsEnd = () => dispatch({ type: "GOTO", screen: "levelSelect" });

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        {phase === "video" && (
          <motion.div
            key="intro-container"
            className="absolute inset-0 h-full w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <video
              src={introVideo}
              autoPlay
              playsInline
              muted
              onEnded={handleIntroEnd}
              className="h-full w-full object-cover"
            />
            <button
              onClick={handleIntroEnd}
              className="absolute top-6 right-6 z-50 rounded-full bg-black/50 hover:bg-black/80 border border-white/20 px-5 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-lg backdrop-blur-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              Skip Intro
            </button>
          </motion.div>
        )}

        {phase === "register" && (
          <motion.div
            key="register"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <AgentRegistration onSubmit={handleRegisterSubmit} />
          </motion.div>
        )}

        {phase === "levels" && (
          <motion.div
            key="levels-container"
            className="absolute inset-0 h-full w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <video
              src={levelsVideo}
              autoPlay
              playsInline
              muted
              onEnded={handleLevelsEnd}
              className="h-full w-full object-cover"
            />
            <button
              onClick={handleLevelsEnd}
              className="absolute top-6 right-6 z-50 rounded-full bg-black/50 hover:bg-black/80 border border-white/20 px-5 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-lg backdrop-blur-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              Skip Video
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
