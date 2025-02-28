"use client"

import { useSession } from "next-auth/react"

export default function ProfilePage() {
  const { data: session } = useSession()

  return (
    <div className="container mx-auto py-6">
      <div>
        Hello {session?.user?.name}
      </div>
      <p>You'll manage your profile here</p>
    </div>
  )
}