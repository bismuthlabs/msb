"use client"

import { useState } from "react"
import ViewToggle from "@/components/view-toggle"
import SlideCard from "@/components/slide-card"
import EmptyState from "@/components/empty-state"
import WelcomeTooltip from "@/components/welcome-tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import ChatWidget from "@/components/chat/chat-widget"
import type { SlideWithUrl } from "@/lib/types"
import { SiteHeader } from "@/components/site-header"
import { useSession } from "next-auth/react"

const COURSES = [
  "All Courses",
  "Artificial Intelligence",
  "Financial Accounting",
  "Linear Programming",
  "Programming with JAVA",
]

const SORT_OPTIONS = [
  { value: "recent", label: "Most Recent" },
  { value: "downloads", label: "Most Downloaded" },
  { value: "title", label: "Alphabetical" },
]

interface SlidesListProps {
  initialSlides: SlideWithUrl[]
}

export default function SlidesList({ initialSlides }: SlidesListProps) {
  const [view, setView] = useState<"grid" | "list">("grid")
  const [showWelcome, setShowWelcome] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCourse, setSelectedCourse] = useState("All Courses")
  const [sortBy, setSortBy] = useState("recent")
  const [savedSlides, setSavedSlides] = useState<string[]>([])
  const { data: session } = useSession()

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

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return "just now"
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)} weeks ago`
    return `${Math.floor(diffInSeconds / 2592000)} months ago`
  }

  return (
    <>
      <SiteHeader user={session?.user} onSearch={setSearchTerm} />
      <main className="container py-4 sm:py-6">
        <div className="mb-4 sm:mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <ViewToggle view={view} onViewChange={setView} />
          <div className="flex gap-2">
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Select Course" />
              </SelectTrigger>
              <SelectContent>
                {COURSES.map((course) => (
                  <SelectItem key={course} value={course}>
                    {course}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {filteredAndSortedSlides.length > 0 ? (
          <div
            className={cn(
              "grid gap-3 sm:gap-4",
              view === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1",
            )}
          >
            {filteredAndSortedSlides.map((slide) => (
              <SlideCard
                key={slide.id}
                id={slide.id}
                title={slide.title}
                image="/placeholder.svg?height=225&width=400"
                timeAgo={formatTimeAgo(slide.created_at)}
                downloads={slide.downloads}
                course={slide.course}
                fileUrl={slide.fileUrl}
                viewType={view}
                saved={savedSlides.includes(slide.id)}
                onSave={() => toggleSave(slide.id)}
              />
            ))}
          </div>
        ) : (
          <EmptyState searchTerm={searchTerm} />
        )}
      </main>

      {showWelcome && <WelcomeTooltip onClose={() => setShowWelcome(false)} />}
      <ChatWidget />
    </>
  )
}

