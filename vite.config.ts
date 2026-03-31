import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: "coachingApp",
      filename: "remoteEntry.js",
      exposes: {
        "./TeamsPage": "./src/pages/teams/index.tsx",
        "./BoardsPage": "./src/pages/boards/index.tsx",
        "./WorkoutPlansPage": "./src/pages/workout-plans/index.tsx",
        "./ExploreTeamsPage": "./src/pages/explore-teams/index.tsx",
        "./MentorsPage": "./src/pages/mentors/index.tsx",
        "./SuggestionPage": "./src/pages/suggestion/index.tsx",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  server: {
    port: 4175,
    strictPort: true,
    cors: true,
  },
  preview: {
    port: 4175,
    strictPort: true,
  },
  build: {
    target: "esnext",
  },
});
