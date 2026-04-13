import "./index.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import BoardsPage from "@/pages/boards";
import ExploreTeamsPage from "@/pages/explore-teams";
import MentorsPage from "@/pages/mentors";
import SuggestionPage from "@/pages/suggestion";
import TeamsPage from "@/pages/teams";
import WorkoutPlansPage from "@/pages/workout-plans";
import Header from "@/widgets/header";
import AuthSessionBoundary from "@/app/AuthSessionBoundary";
import { AppBackground } from "@/shared/ui";
import ProfilePage from "@/pages/profile";
import { requestsPathForDirection } from "@/pages/requests/model/constants";
import RequestsPage from "@/pages/requests";

export default function App() {
  return (
    <BrowserRouter>
      <AppBackground>
        <Header />
        <AuthSessionBoundary>
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
        </AuthSessionBoundary>
      </AppBackground>
    </BrowserRouter>
  );
}
