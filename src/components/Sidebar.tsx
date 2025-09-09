import { useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Home, X, LogOut, Briefcase, User, ToggleLeft, ToggleRight } from "lucide-react"
import LanguageSelector from "./LanguageSelector"
import { useAuth } from "../contexts/AuthContext"
import { useLanguage } from "../contexts/LanguageContext"
import { motion, AnimatePresence } from "framer-motion"

interface MenuItem {
  icon: React.ElementType
  labelKey: string
  path: string
  userTypes?: Array<"seeker" | "hirer">
}

const menuItems: MenuItem[] = [
  { icon: Home, labelKey: "home", path: "/" },
  {
    icon: Briefcase,
    labelKey: "hirerDashboard",
    path: "/dashboard",
    userTypes: ["hirer"],
  },
  {
    icon: User,
    labelKey: "seekerDashboard",
    path: "/seeker-dashboard",
    userTypes: ["seeker"],
  },
]

interface SidebarProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const location = useLocation()
  const { userType, logout, isAvailable, setAvailability } = useAuth()
  const { t } = useLanguage()

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    return () => window.removeEventListener("resize", handleResize)
  }, [setIsOpen])

  const filteredMenuItems = menuItems.filter(
    (item) => !item.userTypes || item.userTypes.includes(userType as "seeker" | "hirer"),
  )

  const handleAvailabilityToggle = () => {
    setAvailability(!isAvailable)
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsOpen(false)}
          ></motion.div>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed inset-y-0 left-0 z-50 w-64 bg-surface shadow-lg"
      >
        <div className="flex h-14 items-center justify-between border-b border-gray-800 px-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-primary rounded-full"></div>
            <span className="text-lg font-semibold text-text-primary">JobConnect</span>
          </Link>
          <button onClick={() => setIsOpen(false)} className="text-text-secondary hover:text-text-primary">
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {filteredMenuItems.map((item) => (
              <Link
                key={item.labelKey}
                to={item.path}
                className={`flex items-center space-x-3 rounded-lg px-3 py-2 text-text-secondary transition-all hover:text-text-primary ${
                  location.pathname === item.path ? "bg-primary text-text-primary" : "hover:bg-surface"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <item.icon className={`h-5 w-5 ${location.pathname === item.path ? "text-text-primary" : ""}`} />
                <span>{t(item.labelKey)}</span>
              </Link>
            ))}
          </div>
        </nav>
        <div className="border-t border-gray-800 p-4 space-y-4">
          {userType === "seeker" && (
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">{t("availableForWork")}</span>
              <button
                onClick={handleAvailabilityToggle}
                className={`p-2 rounded-full transition-colors ${
                  isAvailable ? "bg-secondary text-text-primary" : "bg-gray-600 text-text-secondary"
                }`}
              >
                {isAvailable ? <ToggleRight className="h-6 w-6" /> : <ToggleLeft className="h-6 w-6" />}
              </button>
            </div>
          )}
          <LanguageSelector />
          {userType && (
            <button
              onClick={logout}
              className="flex items-center space-x-3 rounded-lg px-3 py-2 text-text-secondary hover:text-text-primary hover:bg-surface w-full"
            >
              <LogOut className="h-5 w-6" />
              <span>{t("logout")}</span>
            </button>
          )}
        </div>
      </motion.div>
    </>
  )
}

