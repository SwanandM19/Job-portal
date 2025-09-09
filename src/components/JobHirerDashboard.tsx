import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { Search, Star, MapPin, Check, X } from "lucide-react"
import { useLanguage } from "../contexts/LanguageContext"

interface JobSeeker {
  id: number
  name: string
  service: string
  location: string
  distance: number
  isAvailable: boolean
  rating: number
}

const mockJobSeekers: JobSeeker[] = [
  {
    id: 1,
    name: "John Doe",
    service: "Painter",
    location: "New York",
    distance: 2.5,
    isAvailable: true,
    rating: 4.5,
  },
  {
    id: 2,
    name: "Jane Smith",
    service: "Plumber",
    location: "Los Angeles",
    distance: 5.1,
    isAvailable: false,
    rating: 3.8,
  },
  {
    id: 3,
    name: "Bob Johnson",
    service: "Electrician",
    location: "Chicago",
    distance: 1.8,
    isAvailable: true,
    rating: 4.2,
  },
  {
    id: 4,
    name: "Alice Brown",
    service: "Carpenter",
    location: "Houston",
    distance: 3.2,
    isAvailable: true,
    rating: 4.7,
  },
  {
    id: 5,
    name: "Charlie Wilson",
    service: "Painter",
    location: "Phoenix",
    distance: 4.7,
    isAvailable: false,
    rating: 4.0,
  },
]

export default function JobHirerDashboard() {
  const [jobSeekers, setJobSeekers] = useState<JobSeeker[]>(mockJobSeekers)
  const [selectedJobSeeker, setSelectedJobSeeker] = useState<JobSeeker | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredJobSeekers, setFilteredJobSeekers] = useState<JobSeeker[]>(mockJobSeekers)
  const [activeSorts, setActiveSorts] = useState<Set<string>>(new Set())
  const { t } = useLanguage()

  const sortJobSeekers = useCallback(
    (seekers: JobSeeker[]): JobSeeker[] => {
      return [...seekers].sort((a, b) => {
        if (activeSorts.has("distance")) {
          return a.distance - b.distance
        }
        if (activeSorts.has("availability")) {
          return Number(b.isAvailable) - Number(a.isAvailable)
        }
        if (activeSorts.has("rating")) {
          return b.rating - a.rating
        }
        return 0
      })
    },
    [activeSorts],
  )

  useEffect(() => {
    const filtered = jobSeekers.filter(
      (seeker) =>
        seeker.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
        seeker.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredJobSeekers(sortJobSeekers(filtered))
  }, [searchTerm, jobSeekers, sortJobSeekers])

  const handleSort = (sortType: string) => {
    setActiveSorts((prev) => {
      const newSorts = new Set(prev)
      if (newSorts.has(sortType)) {
        newSorts.delete(sortType)
      } else {
        newSorts.add(sortType)
      }
      return newSorts
    })
  }

  useEffect(() => {
    setFilteredJobSeekers(sortJobSeekers(filteredJobSeekers))
  }, [activeSorts, sortJobSeekers])

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8">{t("jobSeekerListings")}</h2>

        {/* Search Bar */}
        <div className="mb-6 relative">
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 bg-surface text-text-primary rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" size={20} />
        </div>

        <div className="mb-6 flex flex-wrap gap-4">
          {["distance", "availability", "rating"].map((sortType) => (
            <motion.button
              key={sortType}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSort(sortType)}
              className={`px-4 py-2 rounded-full transition-colors ${
                activeSorts.has(sortType)
                  ? "bg-primary text-text-primary"
                  : "bg-surface text-text-secondary hover:bg-opacity-80"
              }`}
            >
              {t("sortBy")} {t(sortType)}
            </motion.button>
          ))}
        </div>
        <div className="space-y-6">
          {filteredJobSeekers.map((seeker) => (
            <motion.div
              key={seeker.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-surface p-6 rounded-lg shadow-lg w-full border border-gray-700 hover:border-primary transition-colors duration-300 overflow-hidden"
            >
              <div className="flex items-center space-x-16 overflow-x-auto py-2">
                <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-gray-300">{seeker.name.charAt(0)}</span>
                </div>
                <div className="flex-shrink-0 min-w-[520px]">
                  <h3 className="text-lg font-semibold text-primary truncate">{seeker.name}</h3>
                  <p className="text-text-secondary text-sm truncate">{seeker.service}</p>
                </div>
                <div className="flex-shrink-0 flex items-center text-text-secondary min-w-[200px]">
                  <MapPin className="w-4 h-4 mr-2 text-primary flex-shrink-0" />
                  <span className="truncate">
                    {seeker.location} ({seeker.distance} miles)
                  </span>
                </div>
                <div className="flex-shrink-0 flex items-center min-w-[140px]">
                  {seeker.isAvailable ? (
                    <Check className="w-4 h-4 mr-2 text-secondary flex-shrink-0" />
                  ) : (
                    <X className="w-4 h-4 mr-2 text-red-500 flex-shrink-0" />
                  )}
                  <span className={seeker.isAvailable ? "text-secondary" : "text-red-500"}>
                    {seeker.isAvailable ? t("availability") : t("availability")}
                  </span>
                </div>
                <div className="flex-shrink-0 flex items-center bg-background px-3 py-1 rounded-full min-w-[90px]">
                  <Star className="w-4 h-4 text-yellow-400 mr-2 flex-shrink-0" />
                  <span className="font-medium text-sm">{seeker.rating.toFixed(1)}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedJobSeeker(seeker)}
                  className="flex-shrink-0 bg-primary text-text-primary px-6 py-2 rounded-md hover:bg-primary-hover transition-colors text-sm"
                >
                  {t("contact")}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {selectedJobSeeker && (
        <div className="fixed inset-0 bg-background bg-opacity-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-surface p-6 rounded-lg max-w-md w-full mx-4"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-300">{selectedJobSeeker.name.charAt(0)}</span>
              </div>
              <h3 className="text-2xl font-semibold">{selectedJobSeeker.name}</h3>
            </div>
            <p className="text-text-secondary mb-2">Phone: +1 234 567 8900</p>
            <p className="text-text-secondary mb-6">
              Email: {selectedJobSeeker.name.toLowerCase().replace(" ", ".")}@example.com
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedJobSeeker(null)}
              className="w-full bg-primary text-text-primary px-4 py-2 rounded-md hover:bg-primary-hover transition-colors"
            >
              {t("close")}
            </motion.button>
          </motion.div>
        </div>
      )}
    </div>
  )
}

