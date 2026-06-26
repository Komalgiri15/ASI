import { createContext, useContext, useMemo, useReducer, type ReactNode } from "react";
import { CASES, type CaseDef } from "@/data/levels";

export type Screen =
  | "intro"
  | "levelSelect"
  | "landing"
  | "journey"
  | "levelIntro"
  | "gameplay"
  | "levelComplete"
  | "finalResults";

export type CaseState = {
  id: string;
  unlocked: boolean;
  completed: boolean;
};

export type GameState = {
  currentScreen: Screen;
  currentCaseIndex: number;
  currentStepIndex: number;
  cases: CaseState[];
  totalXP: number;
  streak: number;
  achievements: string[]; // Badge names
  errors: number; // Errors in the current step
  showHint: boolean;
  playerName: string;
};

const initialCases: CaseState[] = CASES.map((c, i) => ({
  id: c.id,
  unlocked: i === 0,
  completed: false,
}));

const initialState: GameState = {
  currentScreen: "intro",
  currentCaseIndex: 0,
  currentStepIndex: 0,
  cases: initialCases,
  totalXP: 0,
  streak: 0,
  achievements: [],
  errors: 0,
  showHint: false,
  playerName: "",
};

type Action =
  | { type: "GOTO"; screen: Screen }
  | { type: "SELECT_CASE"; index: number }
  | { type: "START_CASE"; index: number }
  | { type: "START_GAMEPLAY" }
  | { type: "RECORD_ERROR" }
  | { type: "RECORD_SUCCESS" }
  | { type: "CLOSE_HINT" }
  | { type: "RETRY_CASE" }
  | { type: "SET_PLAYER_NAME"; name: string }
  | { type: "RESET" };

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "GOTO":
      return { ...state, currentScreen: action.screen };
    case "SELECT_CASE":
      return { ...state, currentCaseIndex: action.index };
    case "START_CASE":
      return {
        ...state,
        currentCaseIndex: action.index,
        currentScreen: "levelIntro",
        currentStepIndex: 0,
        errors: 0,
        showHint: false,
      };
    case "START_GAMEPLAY":
      return {
        ...state,
        currentScreen: "gameplay",
        currentStepIndex: 0,
        errors: 0,
        showHint: false,
      };
    case "RECORD_ERROR":
      return {
        ...state,
        errors: state.errors + 1,
        showHint: true,
        streak: 0, // Reset streak on mistake
      };
    case "RECORD_SUCCESS": {
      const activeCase = CASES[state.currentCaseIndex];
      const isLastStep = state.currentStepIndex >= activeCase.steps.length - 1;
      const newStreak = state.streak + 1;

      if (isLastStep) {
        const caseIdx = state.currentCaseIndex;
        const xpEarned = activeCase.xpValue;

        const updatedCases = state.cases.map((c, i) => {
          if (i === caseIdx) return { ...c, completed: true };
          if (i === caseIdx + 1) return { ...c, unlocked: true };
          return c;
        });

        const achievements = new Set(state.achievements);
        achievements.add(activeCase.badge); // "Search Specialist", etc.
        const allCompleted = updatedCases.every((c) => c.completed);
        if (allCompleted) {
          achievements.add("ASI Certified Navigator");
        }

        return {
          ...state,
          cases: updatedCases,
          totalXP: state.totalXP + xpEarned,
          achievements: Array.from(achievements),
          currentScreen: "levelComplete",
          streak: newStreak,
        };
      } else {
        return {
          ...state,
          currentStepIndex: state.currentStepIndex + 1,
          errors: 0,
          showHint: false,
          streak: newStreak,
        };
      }
    }
    case "CLOSE_HINT":
      return { ...state, showHint: false };
    case "SET_PLAYER_NAME":
      return { ...state, playerName: action.name };
    case "RETRY_CASE":
      return {
        ...state,
        currentScreen: "gameplay",
        currentStepIndex: 0,
        errors: 0,
        showHint: false,
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

type Ctx = {
  state: GameState;
  dispatch: React.Dispatch<Action>;
};

const GameContext = createContext<Ctx | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
}
