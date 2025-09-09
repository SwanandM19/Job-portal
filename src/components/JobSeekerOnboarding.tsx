import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

export default function JobSeekerOnboarding() {
  const [service, setService] = useState("")
  const [location, setLocation] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isAvailable, setIsAvailable] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Onboarding data:", { service, location, phoneNumber, isAvailable })
    navigate("/dashboard")
  }

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-text-primary mb-8 text-center">Job Seeker Onboarding</h2>
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Service you provide (e.g., Painter)"
            className="w-full px-4 py-3 bg-surface text-text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            value={service}
            onChange={(e) => setService(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Your Location"
            className="w-full px-4 py-3 bg-surface text-text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full px-4 py-3 bg-surface text-text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={isAvailable}
              onChange={(e) => setIsAvailable(e.target.checked)}
              className="form-checkbox h-5 w-5 text-primary"
            />
            <span className="text-text-secondary">Available for work</span>
          </label>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-primary text-text-primary px-6 py-3 rounded-full hover:bg-primary-hover transition-colors"
          >
            Submit
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  )
}

