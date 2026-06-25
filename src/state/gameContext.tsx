import { createContext, useContext, useMemo, useReducer, type ReactNode } from "react";
import { LEVELS } from "@/data/levels";

export type Screen =
  | "landing"
  | "journey"
  | "levelIntro"
  | "imageStudy"
  | "quiz"
  | "levelComplete"
  | "finalResults";

export type LevelState = {
  id: string;
  unlocked: boolean;
  completed: boolean;
  score: number; // correct count
  userAnswers: number[]; // selected index per question
};

export type GameState = {
  currentScreen: Screen;
  currentLevelIndex: number;
  levels: LevelState[];
  totalXP: number;
  achievements: string[];
  imageStudyProgress: Record<string, number[]>; // levelId -> imageIndexes viewed
  quizState: {
    currentQuestionIndex: number;
    selectedAnswer: number | null;
    locked: boolean; // after answering, before next
    answers: number[];
  };
};

const initialLevels: LevelState[] = LEVELS.map((l, i) => ({
  id: l.id,
  unlocked: i === 0,
  completed: false,
  score: 0,
  userAnswers: [],
}));

const initialState: GameState = {
  currentScreen: "landing",
  currentLevelIndex: 0,
  levels: initialLevels,
  totalXP: 0,
  achievements: [],
  imageStudyProgress: {},
  quizState: {
    currentQuestionIndex: 0,
    selectedAnswer: null,
    locked: false,
    answers: [],
  },
};

type Action =
  | { type: "GOTO"; screen: Screen }
  | { type: "SELECT_LEVEL"; index: number }
  | { type: "MARK_IMAGE_STUDIED"; levelId: string; imageIndex: number }
  | { type: "START_QUIZZ" }
  | { type: "SELECT_ANSWER"; answer: number }
  | { type: "NEXT_QUESTION" }
  | { type: "COMPLETE_LEVEL" }
  | { type: "RETRY_LEVEL" }
  | { type: "RESET" };

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "GOTO":
      return { ...state, currentScreen: action.screen };
    case "SELECT_LEVEL":
      return { ...state, currentLevelIndex: action.index };
    case "MARK_IMAGE_STUDIED": {
      const arr = state.imageStudyProgress[action.levelId] ?? [];
      if (arr.includes(action.imageIndex)) return state;
      return {
        ...state,
        imageStudyProgress: {
          ...state.imageStudyProgress,
          [action.levelId]: [...arr, action.imageIndex],
        },
      };
    }
    case "START_QUIZZ":
      return {
        ...state,
        currentScreen: "quiz",
        quizState: { currentQuestionIndex: 0, selectedAnswer: null, locked: false, answers: [] },
      };
    case "SELECT_ANSWER":
      if (state.quizState.locked) return state;
      return {
        ...state,
        quizState: { ...state.quizState, selectedAnswer: action.answer, locked: true },
      };
    case "NEXT_QUESTION": {
      const level = LEVELS[state.currentLevelIndex];
      const answers = [...state.quizState.answers, state.quizState.selectedAnswer ?? -1];
      const nextIdx = state.quizState.currentQuestionIndex + 1;
      if (nextIdx >= level.questions.length) {
        // finalize
        return {
          ...state,
          quizState: { ...state.quizState, answers, selectedAnswer: null, locked: false },
        };
      }
      return {
        ...state,
        quizState: {
          currentQuestionIndex: nextIdx,
          selectedAnswer: null,
          locked: false,
          answers,
        },
      };
    }
    case "COMPLETE_LEVEL": {
      const idx = state.currentLevelIndex;
      const level = LEVELS[idx];
      const answers = state.quizState.answers;
      let correct = 0;
      level.questions.forEach((q, i) => {
        if (answers[i] === q.correctIndex) correct++;
      });
      const accuracy = correct / level.questions.length;
      const xpFromAnswers = correct * 10;
      const xpBonus = accuracy >= 0.8 ? 50 : 0;
      const xpEarned = xpFromAnswers + xpBonus;

      const levels = state.levels.map((l, i) => {
        if (i === idx) return { ...l, completed: true, score: correct, userAnswers: answers };
        if (i === idx + 1) return { ...l, unlocked: true };
        return l;
      });

      const achievements = new Set(state.achievements);
      if (idx === 0) achievements.add("First Steps");
      if (accuracy === 1) achievements.add("Perfect Score");
      if (level.number === 2) achievements.add("Claims Expert");
      const allDone = levels.every((l) => l.completed);
      if (allDone) achievements.add("Speed Learner");

      return {
        ...state,
        levels,
        totalXP: state.totalXP + xpEarned,
        achievements: Array.from(achievements),
        currentScreen: "levelComplete",
      };
    }
    case "RETRY_LEVEL":
      return {
        ...state,
        currentScreen: "levelIntro",
        quizState: { currentQuestionIndex: 0, selectedAnswer: null, locked: false, answers: [] },
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
