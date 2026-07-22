import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import AIAssistant from "./pages/AIAssistant";
import ReportAnalyzer from "./pages/ReportAnalyzer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./routes/ProtectedRoute";

function AppContent() {

  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <div className="min-h-screen bg-[#f8fafb]">

      {!hideNavbar && <Navbar />}

      <main className={hideNavbar ? "" : "pt-16"}>

    <Routes>

  <Route path="/login" element={<Login />} />

  <Route path="/register" element={<Register />} />

  <Route
    path="/"
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    }
  />

  <Route
    path="/history"
    element={
      <ProtectedRoute>
        <History />
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