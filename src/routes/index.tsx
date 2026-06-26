import { createFileRoute } from "@tanstack/react-router";
import { App } from "@/components/App";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ASI Quest — Humana" },
      {
        name: "description",
        content:
          "A gamified training app for Humana claims processing. Study real claim cards, answer rapid-fire questions, earn XP and badges.",
      },
      { property: "og:title", content: "ASI Quest — Humana" },
      {
        property: "og:description",
        content: "Master claims processing with Duolingo-style levels and Kahoot-style quizzes.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <App />;
}
