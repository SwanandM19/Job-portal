import { useState } from "react"
import { motion } from "framer-motion"
import { Star, Phone, Mail, Calendar, Briefcase, ToggleLeft, ToggleRight } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"
import { useLanguage } from "../contexts/LanguageContext"

interface Client {
  id: number
  name: string
  jobTitle: string
  rating: number
  phone: string
  email: string
  date: string
}

const mockClients: Client[] = [
  {
    id: 1,
    name: "John Doe",
    jobTitle: "House Painting",
    rating: 4.5,
    phone: "+1 234-567-8901",
    email: "john.doe@example.com",
    date: "2023-05-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    jobTitle: "Electrical Repair",
    rating: 5,
    phone: "+1 234-567-8902",
    email: "jane.smith@example.com",
    date: "2023-06-02",
  },
  {
    id: 3,
    name: "Bob Johnson",
    jobTitle: "Plumbing",
    rating: 4,
    phone: "+1 234-567-8903",
    email: "bob.johnson@example.com",
    date: "2023-06-20",
  },
  {
    id: 4,
    name: "Alice Brown",
    jobTitle: "Carpentry",
    rating: 4.8,
    phone: "+1 234-567-8904",
    email: "alice.brown@example.com",
    date: "2023-07-05",
  },
]

export default function JobSeekerDashboard() {
  const [clients, setClients] = useState<Client[]>(mockClients)
  const { serviceProvided, isAvailable, setAvailability } = useAuth()
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{t("jobSeekerDashboard")}</h1>
          <div className="flex items-center justify-between bg-surface p-4 rounded-lg">
            <div className="flex items-center space-x-4">
              <Briefcase className="w-6 h-6 text-primary" />
              <span className="text-lg font-semibold">{serviceProvided}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-text-secondary">{t("availableForWork")}</span>
              <button
                onClick={() => setAvailability(!isAvailable)}
                className={`p-2 rounded-full transition-colors ${
                  isAvailable ? "bg-secondary text-text-primary" : "bg-gray-600 text-text-secondary"
                }`}
              >
                {isAvailable ? <ToggleRight className="h-6 w-6" /> : <ToggleLeft className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-6">{t("clientHistory")}</h2>
        <div className="space-y-6">
          {clients.map((client) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-surface p-4 rounded-lg shadow-lg w-full border border-gray-700 hover:border-primary transition-colors duration-300 flex items-center space-x-4"
            >
              <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-300">{client.name.charAt(0)}</span>
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h2 className="text-xl font-semibold text-primary">{client.name}</h2>
                    <p className="text-text-secondary text-sm">{client.jobTitle}</p>
                  </div>
                  <div className="flex items-center bg-background px-2 py-1 rounded-full">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="font-medium text-sm">{client.rating.toFixed(1)}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center text-text-secondary">
                    <Phone className="w-4 h-4 mr-1 text-primary" />
                    <span>{client.phone}</span>
                  </div>
                  <div className="flex items-center text-text-secondary">
                    <Mail className="w-4 h-4 mr-1 text-primary" />
                    <span>{client.email}</span>
                  </div>
                  <div className="flex items-center text-text-secondary col-span-2">
                    <Calendar className="w-4 h-4 mr-1 text-primary" />
                    <span>Job Date: {client.date}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

