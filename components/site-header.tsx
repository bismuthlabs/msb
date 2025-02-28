"use client"

import Link from "next/link"
import { useState } from "react"
import { signOut } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface SiteHeaderProps {
  user?: any // You can refine this type with NextAuth's Session.user
  onSearch: (term: string) => void
}

export function SiteHeader({ user, onSearch }: SiteHeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut({ redirect: false }) // Avoid immediate redirect
    window.location.href = "/" // Manually redirect to home or login
  }
  return (
    <div className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-14 items-center justify-between">
        <h1 className="text-lg sm:text-xl font-bold">MSB</h1>
        {user ? (
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src={user.user_metadata?.avatar_url} />
                <AvatarFallback>{user.email?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem className="flex flex-col items-start p-0 border-b border-white/45">
                {/* <Link href={ `/profile/${user.name}`} className="flex items-center w-full justify-between gap-2 hover:bg-white/45 p-2"> */}
                <Link href={`/profile/${user.name}`} className="flex items-center w-full justify-between gap-2 hover:bg-white/45 p-2">
                  <div className="flex flex-col items-start gap-1">
                    <span className="font-semibold">{user.name || "Unknown User"}</span>
                    <span className="text-sm text-gray-500">{user.email}</span>
                  </div>
                  <ArrowRight />
                </Link>
              </DropdownMenuItem>
              {/* <DropdownMenuItem asChild>
                <Link href="/help" className="w-full justify-start hover:bg-white/45">
                  Help center
                </Link>
              </DropdownMenuItem> */}
              <DropdownMenuItem asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={handleSignOut}
                >
                  Sign out
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="space-x-4">
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-customWhite text-primary hover:text-customWhite shadow hover:bg-primary/90 h-7 px-4 py-2"
            >
              Log in
            </Link>
            <Link
              href="/sign-up"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-customWhite text-primary hover:text-customWhite shadow hover:bg-primary/90 h-7 px-4 py-2"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
      <div className="container flex flex-col gap-4 pb-3 sm:pb-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search slides..."
              className="pl-10 md:max-w-[400px] bg-white"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </div>
    </div>
  )
}