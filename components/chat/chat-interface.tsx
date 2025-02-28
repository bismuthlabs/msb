import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface ChatInterfaceProps {
  isOpen: boolean
}

export default function ChatInterface({ isOpen }: ChatInterfaceProps) {
  return (
    <div
      className={cn(
        "fixed bottom-20 right-4 z-40",
        "w-[90vw] sm:w-[400px] h-[500px]",
        "bg-white rounded-lg shadow-xl",
        "flex flex-col",
        "transition-all duration-300 ease-in-out",
        isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0 pointer-events-none",
      )}
    >
      {/* Chat Header */}
      <div className="flex items-center gap-3 border-b p-4">
        <div className="h-8 w-8 rounded-full bg-black flex items-center justify-center">
          <span className="text-white text-sm font-semibold">O</span>
        </div>
        <div>
          <h3 className="font-semibold">Owoahene</h3>
          <p className="text-xs text-muted-foreground">AI Assistant</p>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="flex items-start gap-2 max-w-[80%]">
          <div className="h-8 w-8 rounded-full bg-black flex items-center justify-center shrink-0">
            <span className="text-white text-sm font-semibold">O</span>
          </div>
          <div className="bg-muted rounded-lg rounded-tl-none p-3">
            <p className="text-sm">Hello! I'm Owoahene, your AI assistant. How can I help you today?</p>
          </div>
        </div>
      </div>

      {/* Chat Input */}
      <div className="border-t p-4">
        <form className="flex gap-2">
          <Input placeholder="Type your message..." className="flex-1" />
          <Button type="submit" size="icon" className="bg-black text-white hover:bg-black/90">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>
    </div>
  )
}

