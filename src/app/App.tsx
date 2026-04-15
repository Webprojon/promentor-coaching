import "./index.css";
import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "@/widgets/header";
import Layout from "@/widgets/layout";
import AuthSessionBoundary from "@/app/AuthSessionBoundary";
import { AppBackground } from "@/shared/ui";
import { requestsPathForDirection } from "@/pages/requests/model/constants";

const TeamsPage = lazy(() => import("@/pages/teams"));
const BoardsPage = lazy(() => import("@/pages/boards"));
const WorkoutPlansPage = lazy(() => import("@/pages/workout-plans"));
const ExploreTeamsPage = lazy(() => import("@/pages/explore-teams"));
const MentorsPage = lazy(() => import("@/pages/mentors"));
const SuggestionPage = lazy(() => import("@/pages/suggestion"));
const RequestsPage = lazy(() => import("@/pages/requests"));
const ProfilePage = lazy(() => import("@/pages/profile"));

function RouteLoadingFallback() {
  return (
    <section
      className="rounded-lg border border-white/15 bg-slate-900/40 p-4 text-sm text-slate-200"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      Loading page...
    </section>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppBackground>
        <Header />
        <Layout>
          <AuthSessionBoundary>
            <Suspense fallback={<RouteLoadingFallback />}>
              <Routes>
                <Route path="/" element={<Navigate to="/teams" replace />} />
                <Route path="/teams" element={<TeamsPage />} />
                <Route path="/boards" element={<BoardsPage />} />
                <Route path="/workout-plans" element={<WorkoutPlansPage />} />
                <Route path="/explore-teams" element={<ExploreTeamsPage />} />
                <Route path="/mentors" element={<MentorsPage />} />
                <Route path="/suggestion" element={<SuggestionPage />} />
                <Route
                  path="/requests"
                  element={
                    <Navigate to={requestsPathForDirection("sent")} replace />
                  }
                />
                <Route path="/requests/:direction" element={<RequestsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Routes>
            </Suspense>
          </AuthSessionBoundary>
        </Layout>
      </AppBackground>
    </BrowserRouter>
  );
}
