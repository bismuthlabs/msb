import { Grid2X2, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ViewToggleProps {
  view: "grid" | "list"
  onViewChange: (view: "grid" | "list") => void
}

export default function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex gap-2">
      <Button
        variant={view === "grid" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewChange("grid")}
        className={cn("bg-white hover:bg-white/90", view === "grid" && "bg-black text-white hover:bg-black/90")}
      >
        <Grid2X2 className="h-4 w-4" />
        <span className="ml-2">Grid View</span>
      </Button>
      <Button
        variant={view === "list" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewChange("list")}
        className={cn("bg-white hover:bg-white/90", view === "list" && "bg-black text-white hover:bg-black/90")}
      >
        <List className="h-4 w-4" />
        <span className="ml-2">List View</span>
      </Button>
    </div>
  )
}

