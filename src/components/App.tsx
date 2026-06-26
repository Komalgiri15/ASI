import { AnimatePresence, motion } from "framer-motion";
import { GameProvider, useGame } from "@/state/gameContext";
import { Landing } from "@/components/screens/Landing";
import { LevelIntro } from "@/components/screens/LevelIntro";
import { Gameplay } from "@/components/screens/Gameplay";
import { LevelComplete } from "@/components/screens/LevelComplete";
import { FinalResults } from "@/components/screens/FinalResults";
import { IntroFlow } from "@/components/screens/IntroFlow";
import { LevelSelect } from "@/components/screens/LevelSelect";

function Router() {
  const { state } = useGame();
  const screen = state.currentScreen;

  return (
    <div className="fixed inset-0 h-dvh w-full overflow-hidden bg-[#E9F8F0]">
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="h-full w-full"
        >
          <div className="h-full w-full" style={{ transform: "translate(0, 0)" }}>
            {screen === "intro" && <IntroFlow />}
            {screen === "levelSelect" && <LevelSelect />}
            {screen === "landing" && <Landing />}
            {screen === "levelIntro" && <LevelIntro />}
            {screen === "gameplay" && <Gameplay />}
            {screen === "levelComplete" && <LevelComplete />}
            {screen === "finalResults" && <FinalResults />}
          </div>
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
