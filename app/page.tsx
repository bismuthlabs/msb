"use client"
import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { useSession } from "next-auth/react"

export default function HomePage() {
  const [view, setView] = useState<"grid" | "list">("grid")
  const [showWelcome, setShowWelcome] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCourse, setSelectedCourse] = useState("All Courses")
  const [sortBy, setSortBy] = useState("recent")
  const [savedSlides, setSavedSlides] = useState<string[]>([])
  const { data: session } = useSession()
  const initialSlides = [
    // Add your initial slides data here
    { id: "1", title: "Slide 1", course: "Course 1", downloads: 10, created_at: "2023-01-01" },
    { id: "2", title: "Slide 2", course: "Course 2", downloads: 20, created_at: "2023-02-01" },
    // Add more slides as needed
  ]

    const filteredAndSortedSlides = initialSlides
    .filter((slide) => {
      if (selectedCourse !== "All Courses" && slide.course !== selectedCourse) {
        return false
      }
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase()
        return slide.title.toLowerCase().includes(searchLower) || slide.course.toLowerCase().includes(searchLower)
      }
      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "downloads":
          return b.downloads - a.downloads
        case "title":
          return a.title.localeCompare(b.title)
        case "recent":
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      }
    })

  const toggleSave = (slideId: string) => {
    setSavedSlides((prev) => (prev.includes(slideId) ? prev.filter((id) => id !== slideId) : [...prev, slideId]))
  }
  
  return (
    <div>
      <SiteHeader user={session?.user} onSearch={setSearchTerm} />
      <div className="container mx-auto mt-4">
    <span>

      Unauthenticated users page
    </span>
      </div>
    </div>
  );
}
