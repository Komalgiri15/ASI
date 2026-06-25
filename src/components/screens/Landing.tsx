import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import { useGame } from "@/state/gameContext";
import { HumanaWordmark } from "@/components/HumanaWordmark";
import { useEffect, useRef, useState } from "react";
import introVideo from "@/assets/intro.mp4";

export function Landing() {
  const { dispatch } = useGame();
  const [videoEnded, setVideoEnded] = useState(false);
  const [showTitleOverlay, setShowTitleOverlay] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Autoplay was prevented. Waiting for user interaction or playing muted.", err);
      });
    }
  }, []);

  const handleSkip = () => {
    setVideoEnded(true);
  };

  const handleStart = () => {
    dispatch({ type: "GOTO", screen: "journey" });
  };

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0a0a18]">
      {/* Video Element */}
      <video
        ref={videoRef}
        src={introVideo}
        autoPlay
        muted
        playsInline
        onEnded={() => setVideoEnded(true)}
        onTimeUpdate={(e) => {
          // Show overlay starting from 6.0 seconds (approx. turn-to-camera beat)
          if (e.currentTarget.currentTime >= 6.0) {
            setShowTitleOverlay(true);
          } else {
            setShowTitleOverlay(false);
          }
        }}
        className="absolute inset-0 h-full w-full object-cover transition-all duration-700"
        style={{
          filter: videoEnded ? "blur(8px) brightness(0.4)" : "none",
        }}
      />

      {/* Overlay title during the final turn-to-camera beat */}
      <AnimatePresence>
        {showTitleOverlay && !videoEnded && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute bottom-[28%] left-1/2 z-10 -translate-x-1/2 text-center pointer-events-none select-none"
          >
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-[#25BB64] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                Humana.
              </span>
              <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]">
                eHUB <span className="text-[#E9F8F0]">Challenge</span>
              </h2>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 120 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="h-[2.5px] rounded-full bg-[#FFD700] shadow-[0_0_10px_#FFD700,0_1px_3px_rgba(0,0,0,0.5)]"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip Button during video playback */}
      {!videoEnded && (
        <button
          onClick={handleSkip}
          className="absolute top-6 right-6 z-20 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-4 py-2 font-display text-xs font-semibold uppercase tracking-wider text-white/80 backdrop-blur transition-all duration-200 hover:bg-black/60 hover:text-white cursor-pointer"
        >
          Skip Intro
        </button>
      )}

      {/* Pop up of Game Name with Start Button */}
      <AnimatePresence>
        {videoEnded && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/40 px-6 backdrop-blur-[2px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              className="w-full max-w-md rounded-3xl border border-white/10 bg-black/60 p-8 text-center text-white shadow-2xl backdrop-blur-md"
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col items-center"
              >
                <HumanaWordmark glow className="text-4xl" />
                
                <h1 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight">
                  eHUB <span style={{ color: "var(--brand)" }}>Challenge</span>
                </h1>
                
                <p className="mt-4 text-white/70 text-sm max-w-xs leading-relaxed">
                  Master claims processing through gamified case studies. Study real claim screens, answer rapid-fire questions, and earn XP.
                </p>

                <motion.button
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleStart}
                  className="pulse-glow mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full py-4 font-display text-lg font-semibold text-white transition-shadow cursor-pointer"
                  style={{ backgroundColor: "var(--brand)" }}
                >
                  <Play className="h-5 w-5 fill-white" />
                  Start Game
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

