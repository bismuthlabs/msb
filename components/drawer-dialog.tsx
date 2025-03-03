import * as React from "react"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { ChevronRight } from "lucide-react" // For the chevron icon

interface DrawerDialogDemoProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DrawerDialogDemo({ open, onOpenChange }: DrawerDialogDemoProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const assets = [
    { icon: "📑", label: "Sources", href: "/sources" },
    { icon: "📝", label: "Notes", href: "/notes" },
    { icon: "🏋️", label: "Exercises", href: "/exercises" },
    { icon: "🔖", label: "Bookmarks", href: "/bookmarks" },
  ]

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Your assets</DialogTitle>
            <DialogDescription>
              Manage your assets and navigate through your content.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {assets.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center justify-between p-3 hover:bg-gray-100 rounded-md transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span>{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-500" />
              </a>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Your assets</DrawerTitle>
          <DrawerDescription>
            Manage your assets and navigate through your content.
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4 py-4">
          {assets.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center justify-between p-3 hover:bg-gray-100 rounded-md transition-colors"
            >
              <div className="flex items-center gap-2">
                <span>{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </div>
                <ChevronRight className="h-4 w-4 text-gray-500" />
            </a>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  )
}