import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { motion } from "framer-motion"
import { useLocation } from "react-router-dom"
import { ToggleLeft, ToggleRight } from "lucide-react"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [userType, setUserType] = useState<"seeker" | "hirer" | null>(null)
  const [serviceProvided, setServiceProvided] = useState("")
  const [isAvailable, setIsAvailable] = useState(false)
  const { login } = useAuth()
  const location = useLocation()

  // Check if the user came from the "Get Started" button
  const isGetStarted = location.state?.from === "getStarted"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (userType) {
      if (userType === "seeker") {
        login(userType, serviceProvided, isAvailable)
      } else {
        login(userType)
      }
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-text-primary mb-8 text-center">
          {isGetStarted ? "Get Started" : isLogin ? "Welcome Back" : "Create Account"}
        </h2>
        {!userType && (
          <div className="mb-6 flex justify-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-surface text-text-primary px-6 py-3 rounded-full hover:bg-opacity-80 transition-colors"
              onClick={() => setUserType("seeker")}
            >
              Job Seeker
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-surface text-text-primary px-6 py-3 rounded-full hover:bg-opacity-80 transition-colors"
              onClick={() => setUserType("hirer")}
            >
              Job Hirer
            </motion.button>
          </div>
        )}
        {userType && (
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full px-4 py-3 bg-surface text-text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 bg-surface text-text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            {!isLogin && (
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full px-4 py-3 bg-surface text-text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            )}
            {userType === "seeker" && (
              <>
                <input
                  type="text"
                  placeholder="Service Provided (e.g., Plumbing, Carpentry)"
                  className="w-full px-4 py-3 bg-surface text-text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  value={serviceProvided}
                  onChange={(e) => setServiceProvided(e.target.value)}
                  required
                />
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Available for work</span>
                  <button
                    type="button"
                    onClick={() => setIsAvailable(!isAvailable)}
                    className={`p-2 rounded-full transition-colors ${
                      isAvailable ? "bg-secondary text-text-primary" : "bg-gray-600 text-text-secondary"
                    }`}
                  >
                    {isAvailable ? <ToggleRight className="h-6 w-6" /> : <ToggleLeft className="h-6 w-6" />}
                  </button>
                </div>
              </>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-primary text-text-primary px-6 py-3 rounded-full hover:bg-primary-hover transition-colors"
            >
              {isLogin ? "Login" : "Sign Up"}
            </motion.button>
          </motion.form>
        )}
        <p className="mt-6 text-center text-text-secondary">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button className="text-primary hover:underline" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </motion.div>
    </div>
  )
}

