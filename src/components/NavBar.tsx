import { Link } from "react-router-dom"
import { Menu } from "lucide-react"

interface NavBarProps {
  toggleSidebar: () => void
}

export default function NavBar({ toggleSidebar }: NavBarProps) {
  return (
    <nav className="bg-white bg-opacity-10 backdrop-blur-md py-4 px-6 sticky top-0 z-40">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <button onClick={toggleSidebar} className="text-white mr-4">
            <Menu className="h-6 w-6" />
          </button>
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-full"></div>
            <span className="text-xl font-bold text-white">JobConnect</span>
          </Link>
        </div>
        <div className="flex items-center">
          <Link
            to="/auth"
            className="bg-white text-indigo-600 px-4 py-2 rounded-full font-semibold hover:bg-opacity-90 transition-colors hidden md:block"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  )
}

