import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

export default function JobSeekerMessage() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/")
    }, 5000) // Redirect after 5 seconds

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center text-text-primary p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Thank You for Signing Up!</h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          Your profile has been received. Our team will review it and contact you soon.
        </p>
        <p className="text-lg">You will be redirected to the home page in a few seconds...</p>
      </motion.div>
    </div>
  )
}

