import type React from "react"
import "./globals.css"
// import { Inter } from "next/font/google"
// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
// import { cookies } from "next/headers"
import { AuthProvider } from "./providers"

// const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "MSB",
  description: "Everything a student needs to succeed",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const supabase = createServerComponentClient({ cookies })
  // const { data: { session } } = await supabase.auth.getSession()
  return (
    <html lang="en" className="bg-[#F0F9FF] font-serif">
      <body className={`min-h-screen bg-[#F0F9FF]`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}