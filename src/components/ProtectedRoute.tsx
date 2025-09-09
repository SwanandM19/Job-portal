import { Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedUserType?: "seeker" | "hirer"
}

export default function ProtectedRoute({ children, allowedUserType }: ProtectedRouteProps) {
  const { isAuthenticated, userType } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />
  }

  if (allowedUserType && userType !== allowedUserType) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

