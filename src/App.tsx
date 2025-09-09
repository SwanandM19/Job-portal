import { useState } from "react"
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import LandingPage from "./components/LandingPage"
import AuthPage from "./components/AuthPage"
import JobSeekerDashboard from "./components/JobSeekerDashboard"
import JobHirerDashboard from "./components/JobHirerDashboard"
import Chatbot from "./components/Chatbot"
import { AuthProvider, useAuth } from "./contexts/AuthContext"
import { LanguageProvider } from "./contexts/LanguageContext"
import ProtectedRoute from "./components/ProtectedRoute"
import { Menu } from "lucide-react"

function AppContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev)
  }

  return (
    <div className="flex min-h-screen bg-background">
      {isAuthenticated && <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />}
      <div className="flex-1">
        {isAuthenticated && !isSidebarOpen && location.pathname !== "/" && (
          <button
            onClick={toggleSidebar}
            className="fixed top-4 left-4 z-50 bg-primary text-text-primary p-2 rounded-full"
          >
            <Menu className="h-6 w-6" />
          </button>
        )}
        <main className="p-4">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route
              path="/seeker-dashboard"
              element={
                <ProtectedRoute allowedUserType="seeker">
                  <JobSeekerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedUserType="hirer">
                  <JobHirerDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Chatbot />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <LanguageProvider>
          <AppContent />
        </LanguageProvider>
      </AuthProvider>
    </Router>
  )
}

