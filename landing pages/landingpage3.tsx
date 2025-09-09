import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Users, Search, Rocket, BarChart } from "lucide-react"

interface IconCardProps {
  icon: React.ElementType
  title: string
  delay?: number
}

const IconCard = ({ icon: Icon, title, delay = 0 }: IconCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="flex flex-col items-center"
  >
    <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center relative mb-4 group">
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-purple-500 opacity-20 group-hover:opacity-30 blur-xl transition-opacity" />
      <Icon className="w-12 h-12 text-purple-600 relative z-10" />
    </div>
    <p className="text-center text-sm font-medium text-gray-700">{title}</p>
  </motion.div>
)

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 relative overflow-hidden">
      {/* Stars */}
      <div className="absolute inset-0">
        <div className="absolute h-2 w-2 bg-white rounded-full top-1/4 left-1/4 animate-pulse" />
        <div className="absolute h-2 w-2 bg-white rounded-full top-1/3 right-1/3 animate-pulse delay-300" />
        <div className="absolute h-2 w-2 bg-white rounded-full top-2/3 left-1/2 animate-pulse delay-500" />
      </div>

      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Rocket className="w-8 h-8 text-white" />
            <span className="ml-3 text-xl font-bold text-white">JobConnect</span>
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/about" className="text-white/80 hover:text-white">
              What we do
            </Link>
            <Link to="/auth" className="text-white/80 hover:text-white">
              Sign Up
            </Link>
            <Link
              to="/contact"
              className="bg-white text-purple-600 px-6 py-2 rounded-full hover:bg-purple-50 transition-colors"
            >
              Create Profile
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-20 pb-40 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl font-bold text-white mb-6"
            >
              Find Your Next
              <br />
              Opportunity
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-white/80 mb-8"
            >
              Search listings of job opportunities and sponsorship opportunities available in your area.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex gap-2"
            >
              <input
                type="text"
                placeholder="Search your target location"
                className="flex-1 px-6 py-3 rounded-full bg-white/10 text-white placeholder-white/60 border border-white/20 focus:outline-none focus:border-white/40"
              />
              <button className="px-8 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
                SEARCH
              </button>
            </motion.div>
          </div>

          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:justify-self-end"
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pngtree-online-education-training-course-design-concept-vector-illustration-png-image_5331074-removebg-preview-SOIgraqUwwU3H6AeP2T0a0KTl79wTd.png"
              alt="Online education illustration"
              className="w-full max-w-[600px] h-auto"
            />
          </motion.div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 200L48 185.2C96 170.3 192 140.7 288 140.7C384 140.7 480 170.3 576 155.3C672 140.3 768 80.7 864 65.7C960 50.7 1056 80.3 1152 95.3C1248 110.3 1344 110.7 1392 110.8L1440 111V201H1392C1344 201 1248 201 1152 201C1056 201 960 201 864 201C768 201 672 201 576 201C480 201 384 201 288 201C192 201 96 201 48 201H0V200Z"
            fill="white"
          />
        </svg>
      </div>

      {/* Content Section */}
      <div className="bg-white">
        <div className="container mx-auto px-6 py-20">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">Steps away from finding your glow!</h2>
          <p className="text-center text-gray-600 mb-16">
            We exist to take the legwork out of choosing how to deliver your message.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <IconCard icon={Users} title="Create an account" delay={0.2} />
            <IconCard icon={Search} title="Search your area" delay={0.4} />
            <IconCard icon={Users} title="Connect with Users" delay={0.6} />
            <IconCard icon={Rocket} title="Launch Marketing Campaign" delay={0.8} />
          </div>

          <div className="mt-20 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Browse our many categorized</h2>
            <p className="text-gray-600">and detailed promotional venues.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

