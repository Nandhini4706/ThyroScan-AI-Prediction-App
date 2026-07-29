import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/common/DashboardNavbar";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import AIAssistant from "./pages/AIAssistant";
import ReportAnalyzer from "./pages/ReportAnalyzer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./routes/ProtectedRoute";
import Home from "./pages/Home";
import DietTracker from "./pages/DietTracker";
import DashboardNavbar from "./components/common/DashboardNavbar";
import HomeNavbar from "./components/home/HomeNavbar";
import Assessment from "./pages/ThyroidAssessment";
function AppContent() {

  const location = useLocation();

  const hideNavbar =
  location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <div className="min-h-screen bg-[#f8fafb]">

{location.pathname === "/" ? (
  <HomeNavbar />
) : !hideNavbar ? (
  <DashboardNavbar />
) : null}

      <main className={hideNavbar ? "" : "pt-16"}>

    <Routes>

  <Route path="/login" element={<Login />} />

  <Route path="/register" element={<Register />} />
   <Route path="/" element={<Home />} />

  <Route
    path="/history"
    element={
      <ProtectedRoute>
        <History />
      </ProtectedRoute>
    }
  />

<Route
    path="/dashboard"
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    }
  />

<Route
  path="/assessment"
  element={
    <ProtectedRoute>
      <Assessment />
    </ProtectedRoute>
  }
/>

  <Route
    path="/history/:id"
    element={
      <ProtectedRoute>
        <History viewMode />
      </ProtectedRoute>
    }
  />

  <Route
    path="/ai-assistant"
    element={
      <ProtectedRoute>
        <AIAssistant />
      </ProtectedRoute>
    }
  />

  <Route
    path="/ai-assistant/:id"
    element={
      <ProtectedRoute>
        <AIAssistant />
      </ProtectedRoute>
    }
  />

  <Route
    path="/report-analyzer"
    element={
      <ProtectedRoute>
        <ReportAnalyzer />
      </ProtectedRoute>
    }
  />
  <Route path="/diet-tracker" element={<DietTracker />} />
  

</Routes>


      </main>

    </div>
  );
}

export default function App() {

  return (

    <BrowserRouter>

      <AppContent />

    </BrowserRouter>

  );

}