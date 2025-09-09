import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Settings2, Shield, BarChart3, Cog, Lightbulb, Award, type LucideIcon } from "lucide-react"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  delay?: number
}

const FeatureCard = ({ icon: Icon, title, delay = 0 }: FeatureCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="bg-[#F8FBFF] p-6 rounded-lg text-center flex flex-col items-center"
  >
    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-md">
      <Icon className="w-8 h-8 text-[#00A6E6]" />
    </div>
    <h3 className="text-gray-800 font-semibold text-sm uppercase tracking-wider">{title}</h3>
  </motion.div>
)

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-[#00A6E6] rounded-lg flex items-center justify-center">
              <Settings2 className="w-6 h-6 text-white" />
            </div>
            <span className="ml-3 text-xl font-bold text-gray-800">JobConnect</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-[#00A6E6]">
              Home
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-[#00A6E6]">
              About Us
            </Link>
            <Link to="/services" className="text-gray-600 hover:text-[#00A6E6]">
              Services
            </Link>
            <Link to="/industries" className="text-gray-600 hover:text-[#00A6E6]">
              Industries
            </Link>
            <Link to="/resources" className="text-gray-600 hover:text-[#00A6E6]">
              Resources
            </Link>
            <Link
              to="/contact"
              className="bg-[#00A6E6] text-white px-6 py-2 rounded-full hover:bg-[#0090CC] transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Our <span className="text-[#00A6E6]">Value</span> Proposition
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-gray-600 mb-8"
          >
            At JobConnect, we take pride in delivering cutting-edge technology that transforms hiring processes, boosts
            productivity, and promotes professional growth.
          </motion.p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
            <Link
              to="/auth"
              className="bg-[#00A6E6] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#0090CC] transition-colors inline-flex items-center"
            >
              Get Started
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard icon={Lightbulb} title="100% IN-HOUSE R&D" delay={0.3} />
          <FeatureCard
            icon={Settings2}
            title="CUSTOMIZE YOUR PROFILE WITH UPTO 10 SKILLS & APPLICATION CENTRIC SERVICES"
            delay={0.4}
          />
          <FeatureCard icon={Shield} title="FULLY SAFETY CERTIFIED TO HIGHEST STANDARDS" delay={0.5} />
          <FeatureCard icon={Cog} title="FULLY INTEGRATED SOLUTION WITH COMPREHENSIVE SERVICE SUPPORT" delay={0.6} />
          <FeatureCard icon={BarChart3} title="REAL TIME ANALYTICS FOR INSIGHTFUL DECISIONS" delay={0.7} />
          <FeatureCard icon={Award} title="BUILT TO LAST - ROBUST PLATFORM" delay={0.8} />
        </div>
      </div>
    </div>
  )
}

