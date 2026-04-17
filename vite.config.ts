import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  const shellRemoteUrl =
    env.VITE_SHELL_REMOTE_URL || "http://localhost:5173/assets/remoteEntry.js";
  const apiTarget = (env.VITE_API_URL || "http://localhost:3000").replace(
    /\/$/,
    "",
  );

  return {
    resolve: {
      alias: {
        "@": "/src",
      },
    },
    plugins: [
      react(),
      tailwindcss(),
      federation({
        name: "coachingApp",
        filename: "remoteEntry.js",
        remotes: {
          shell: shellRemoteUrl,
        },
        exposes: {
          "./TeamsPage": "./src/pages/teams/index.tsx",
          "./BoardsPage": "./src/pages/boards/index.tsx",
          "./WorkoutPlansPage": "./src/pages/workout-plans/index.tsx",
          "./ExploreTeamsPage": "./src/pages/explore-teams/index.tsx",
          "./MentorsPage": "./src/pages/mentors/index.tsx",
          "./SuggestionPage": "./src/pages/suggestion/index.tsx",
          "./RequestsPage": "./src/pages/requests/index.tsx",
          "./ProfilePage": "./src/pages/profile/index.tsx",
        },
        shared: [
          "react",
          "react-dom",
          "react-router-dom",
          "@tanstack/react-query",
          "@promentorapp/ui-kit",
          "react-toastify",
        ],
      }),
    ],
    server: {
      port: 4175,
      strictPort: true,
      cors: true,
      proxy: {
        "/auth": { target: apiTarget, changeOrigin: true },
        "/users": { target: apiTarget, changeOrigin: true },
      },
    },
    preview: {
      port: 4175,
      strictPort: true,
    },
    build: {
      target: "esnext",
    },
  };
});
