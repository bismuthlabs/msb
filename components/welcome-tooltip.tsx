import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function WelcomeTooltip({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md rounded-lg bg-background p-6">
        <Button variant="ghost" size="icon" className="absolute right-2 top-2" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
        <h2 className="mb-4 text-xl font-bold">Welcome to Slide Bank!</h2>
        <ul className="space-y-4">
          <li className="flex items-start gap-2">
            <span className="mt-1 rounded-full bg-primary/10 p-1 text-primary">🔍</span>
            <p>Use search bar to find Slides</p>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 rounded-full bg-primary/10 p-1 text-primary">🎯</span>
            <p>Filter Slides by Course</p>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 rounded-full bg-primary/10 p-1 text-primary">📱</span>
            <p>Toggle between grid and list views</p>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 rounded-full bg-primary/10 p-1 text-primary">💾</span>
            <p>Save slides for quick access</p>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 rounded-full bg-primary/10 p-1 text-primary">🔄</span>
            <p>Share and download slides easily</p>
          </li>
        </ul>
        <Button className="mt-6 w-full" onClick={onClose}>
          Got it!
        </Button>
      </div>
    </div>
  )
}

