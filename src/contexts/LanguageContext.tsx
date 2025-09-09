import type React from "react"
import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "en" | "es" | "fr" | "de" | "hi" | "mr"

interface Translations {
  [key: string]: {
    [key: string]: string
  }
}

const translations: Translations = {
  en: {
    home: "Home",
    hirerDashboard: "Hirer Dashboard",
    seekerDashboard: "Seeker Dashboard",
    availableForWork: "Available for work",
    logout: "Logout",
    jobSeekerDashboard: "Job Seeker Dashboard",
    clientHistory: "Your Client History",
    jobSeekerListings: "Job Seeker Listings",
    searchPlaceholder: "Search by profession (e.g., Painter, Electrician)",
    sortBy: "Sort by",
    distance: "Distance",
    availability: "Availability",
    rating: "Rating",
    contact: "Contact",
    close: "Close",
  },
  es: {
    home: "Inicio",
    hirerDashboard: "Panel del Contratante",
    seekerDashboard: "Panel del Buscador",
    availableForWork: "Disponible para trabajar",
    logout: "Cerrar sesión",
    jobSeekerDashboard: "Panel del Buscador de Empleo",
    clientHistory: "Tu Historial de Clientes",
    jobSeekerListings: "Listado de Buscadores de Empleo",
    searchPlaceholder: "Buscar por profesión (ej., Pintor, Electricista)",
    sortBy: "Ordenar por",
    distance: "Distancia",
    availability: "Disponibilidad",
    rating: "Calificación",
    contact: "Contactar",
    close: "Cerrar",
  },
  fr: {
    home: "Accueil",
    hirerDashboard: "Tableau de Bord Employeur",
    seekerDashboard: "Tableau de Bord Chercheur",
    availableForWork: "Disponible pour travailler",
    logout: "Déconnexion",
    jobSeekerDashboard: "Tableau de Bord du Chercheur d'Emploi",
    clientHistory: "Votre Historique Client",
    jobSeekerListings: "Liste des Chercheurs d'Emploi",
    searchPlaceholder: "Rechercher par profession (ex., Peintre, Électricien)",
    sortBy: "Trier par",
    distance: "Distance",
    availability: "Disponibilité",
    rating: "Évaluation",
    contact: "Contacter",
    close: "Fermer",
  },
  de: {
    home: "Startseite",
    hirerDashboard: "Arbeitgeber-Dashboard",
    seekerDashboard: "Arbeitssuchenden-Dashboard",
    availableForWork: "Verfügbar für Arbeit",
    logout: "Abmelden",
    jobSeekerDashboard: "Arbeitssuchenden-Dashboard",
    clientHistory: "Ihr Kundenverlauf",
    jobSeekerListings: "Arbeitssuchenden-Auflistungen",
    searchPlaceholder: "Nach Beruf suchen (z.B. Maler, Elektriker)",
    sortBy: "Sortieren nach",
    distance: "Entfernung",
    availability: "Verfügbarkeit",
    rating: "Bewertung",
    contact: "Kontakt",
    close: "Schließen",
  },
  hi: {
    home: "होम",
    hirerDashboard: "नियोक्ता डैशबोर्ड",
    seekerDashboard: "नौकरी खोजकर्ता डैशबोर्ड",
    availableForWork: "काम के लिए उपलब्ध",
    logout: "लॉग आउट",
    jobSeekerDashboard: "नौकरी खोजकर्ता डैशबोर्ड",
    clientHistory: "आपका ग्राहक इतिहास",
    jobSeekerListings: "नौकरी खोजकर्ता सूची",
    searchPlaceholder: "पेशे द्वारा खोजें (उदा., पेंटर, इलेक्ट्रीशियन)",
    sortBy: "इसके अनुसार क्रमबद्ध करें",
    distance: "दूरी",
    availability: "उपलब्धता",
    rating: "रेटिंग",
    contact: "संपर्क करें",
    close: "बंद करें",
  },
  mr: {
    home: "मुख्यपृष्ठ",
    hirerDashboard: "नियोक्ता डॅशबोर्ड",
    seekerDashboard: "नोकरी शोधक डॅशबोर्ड",
    availableForWork: "कामासाठी उपलब्ध",
    logout: "लॉग आउट",
    jobSeekerDashboard: "नोकरी शोधक डॅशबोर्ड",
    clientHistory: "तुमचा ग्राहक इतिहास",
    jobSeekerListings: "नोकरी शोधक यादी",
    searchPlaceholder: "व्यवसायानुसार शोधा (उदा., पेंटर, इलेक्ट्रीशियन)",
    sortBy: "यानुसार क्रमवारी लावा",
    distance: "अंतर",
    availability: "उपलब्धता",
    rating: "मूल्यांकन",
    contact: "संपर्क करा",
    close: "बंद करा",
  },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

