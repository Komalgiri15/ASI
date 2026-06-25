import { AnimatePresence, motion } from "framer-motion";
import { GameProvider, useGame } from "@/state/gameContext";
import { Landing } from "@/components/screens/Landing";
import { Journey } from "@/components/screens/Journey";
import { LevelIntro } from "@/components/screens/LevelIntro";
import { ImageStudy } from "@/components/screens/ImageStudy";
import { Quiz } from "@/components/screens/Quiz";
import { LevelComplete } from "@/components/screens/LevelComplete";
import { FinalResults } from "@/components/screens/FinalResults";

function Router() {
  const { state } = useGame();
  const screen = state.currentScreen;

  return (
    <div className="fixed inset-0 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="h-full w-full"
        >
          {screen === "landing" && <Landing />}
          {screen === "journey" && <Journey />}
          {screen === "levelIntro" && <LevelIntro />}
          {screen === "imageStudy" && <ImageStudy />}
          {screen === "quiz" && <Quiz />}
          {screen === "levelComplete" && <LevelComplete />}
          {screen === "finalResults" && <FinalResults />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function App() {
  return (
    <GameProvider>
      <Router />
    </GameProvider>
  );
}
