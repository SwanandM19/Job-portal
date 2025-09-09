import { createContext, useContext, useState, type ReactNode } from "react"
import { useNavigate } from "react-router-dom"

type UserType = "seeker" | "hirer" | null
type AuthContextType = {
  isAuthenticated: boolean
  userType: UserType
  isAvailable: boolean
  serviceProvided: string
  login: (type: UserType, serviceProvided?: string, isAvailable?: boolean) => void
  logout: () => void
  setAvailability: (status: boolean) => void
  setServiceProvided: (service: string) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userType, setUserType] = useState<UserType>(null)
  const [isAvailable, setIsAvailable] = useState(false)
  const [serviceProvided, setServiceProvided] = useState("")
  const navigate = useNavigate()

  const login = (type: UserType, service?: string, available?: boolean) => {
    setIsAuthenticated(true)
    setUserType(type)
    if (type === "seeker") {
      setServiceProvided(service || "")
      setIsAvailable(available || false)
      navigate("/seeker-dashboard")
    } else {
      navigate("/dashboard")
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUserType(null)
    setIsAvailable(false)
    setServiceProvided("")
    navigate("/")
  }

  const setAvailability = (status: boolean) => {
    setIsAvailable(status)
    // Here you would typically update this status on your backend
    console.log(`Job seeker availability set to: ${status}`)
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userType,
        isAvailable,
        serviceProvided,
        login,
        logout,
        setAvailability,
        setServiceProvided,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

