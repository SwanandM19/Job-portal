import { useState } from "react"
import { useLanguage } from "../contexts/LanguageContext"
import { ChevronDown } from "lucide-react"

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "hi", name: "हिन्दी" },
  { code: "mr", name: "मराठी" },
]

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const { language, setLanguage } = useLanguage()

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full space-x-1 text-gray-300 hover:text-white"
      >
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/107175_translate_512x512-anXoEA2m2NgQfK5OEzjuAjofbzSbFL.png"
          alt="Language selector"
          className="w-5 h-5 invert"
        />
        <span>{languages.find((lang) => lang.code === language)?.name}</span>
        <ChevronDown className="w-4 h-4" />
      </button>
      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 bg-indigo-800 rounded-lg shadow-lg border border-indigo-700">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code as "en" | "es" | "fr" | "de" | "hi" | "mr")
                setIsOpen(false)
              }}
              className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-indigo-700 hover:text-white"
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

