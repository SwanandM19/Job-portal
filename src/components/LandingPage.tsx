import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import FloatingDots from "./FloatingDots"
import LanguageSelector from "./LanguageSelector"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#0A0B14] text-white overflow-hidden">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xl font-bold"
            >
              JobConnect
            </motion.span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <motion.div variants={container} initial="hidden" animate="show" className="flex items-center space-x-8">
              {[
                // { to: "/how-it-works", text: "How it works" },
                // { to: "/blog", text: "Blog", badge: "34" },
                // { to: "/about", text: "About" },
                // { to: "/help", text: "Help" },
                // { to: "/contact", text: "Contact" },
                // { to: "/pricing", text: "Pricing" },
              ].map((link) => (
                <motion.div key={link.to} variants={item}>
                  <a href={link.to} className="text-gray-300 hover:text-white transition-colors">
                    {link.text}
                    {link.badge && <span className="ml-1 text-xs text-green-400">{link.badge}</span>}
                  </a>
                </motion.div>
              ))}
              <motion.div variants={item}>
                <LanguageSelector />
              </motion.div>
              <motion.div variants={item}>
                <button
                  onClick={() => navigate("/auth", { state: { from: "signup" } })}
                  className="bg-transparent border border-gray-600 text-white px-4 py-2 rounded-full hover:border-gray-400 transition-colors"
                >
                  Sign up
                </button>
              </motion.div>
              <motion.div variants={item}>
                <button
                  onClick={() => navigate("/auth", { state: { from: "signin" } })}
                  className="bg-[#1A1C2A] text-white px-4 py-2 rounded-full hover:bg-[#22243A] transition-colors"
                >
                  Sign in
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-20 pb-32 relative">
        <div className="max-w-4xl mx-auto text-center mb-16 relative z-10">
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
            <motion.h1 variants={item} className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
              <motion.span
                animate={{
                  backgroundPosition: ["0%", "100%"],
                  opacity: [0.8, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
                className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-violet-400 to-blue-400 bg-300%"
              >
                The Comprehensive
              </motion.span>
              <br />
              <motion.span
                className="inline-block"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                Tool for{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-500">
                  Job Excellence
                </span>
              </motion.span>
            </motion.h1>

            <motion.p variants={item} className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
              JobConnect – your key to unlocking career potential. With real-time insights and intuitive analytics,
              drive your career forward. Elevate your job search strategy today.
            </motion.p>

            <motion.div variants={item} className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-colors"
                onClick={() => navigate("/auth", { state: { from: "getStarted" } })}
              >
                Get Started
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Animated Background Elements */}
        <FloatingDots count={20} />

        {/* Dot Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex justify-center mt-8 space-x-2"
        >
          <div className="w-2 h-2 rounded-full bg-violet-500" />
          <div className="w-2 h-2 rounded-full bg-gray-600" />
          <div className="w-2 h-2 rounded-full bg-gray-600" />
        </motion.div>
      </div>
    </div>
  )
}

