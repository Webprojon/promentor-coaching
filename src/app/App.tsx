import "./index.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import BoardsPage from "../pages/boards";
import ExploreTeamsPage from "../pages/explore-teams";
import MentorsPage from "../pages/mentors";
import SuggestionPage from "../pages/suggestion";
import TeamsPage from "../pages/teams";
import WorkoutPlansPage from "../pages/workout-plans";
import Header from "../widgets/header";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-900">
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/teams" replace />} />
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="/boards" element={<BoardsPage />} />
          <Route path="/workout-plans" element={<WorkoutPlansPage />} />
          <Route path="/explore-teams" element={<ExploreTeamsPage />} />
          <Route path="/mentors" element={<MentorsPage />} />
          <Route path="/suggestion" element={<SuggestionPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
