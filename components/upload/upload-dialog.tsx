"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Upload } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"
import { supabase } from "@/lib/supabase"

interface UploadDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
]

const COURSES = ["Artificial Intelligence", "Financial Accounting", "Linear Programming", "Programming with JAVA"]

export default function UploadDialog({ open, onOpenChange }: UploadDialogProps) {
  const router = useRouter()
  const { user } = useAuth()
  const [title, setTitle] = useState("")
  const [course, setCourse] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    if (!ACCEPTED_FILE_TYPES.includes(selectedFile.type)) {
      setError("Please upload a PDF or PowerPoint file")
      return
    }

    if (selectedFile.size > 50 * 1024 * 1024) {
      // 50MB limit
      setError("File size should be less than 50MB")
      return
    }

    setFile(selectedFile)
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !file) return

    setLoading(true)
    setError(null)

    try {
      // 1. Upload file to Supabase Storage
      const fileExt = file.name.split(".").pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `${user.id}/${fileName}`

      console.log("Uploading file:", filePath)

      const { error: uploadError, data: uploadData } = await supabase.storage.from("slides").upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      })

      if (uploadError) {
        console.error("Upload error:", uploadError)
        throw new Error(`Upload failed: ${uploadError.message}`)
      }

      console.log("Upload successful:", uploadData)

      // 2. Get the public URL for the uploaded file
      const {
        data: { publicUrl },
      } = supabase.storage.from("slides").getPublicUrl(filePath)

      console.log("Public URL:", publicUrl)

      // 3. Create database entry
      const { error: dbError, data: dbData } = await supabase
        .from("slides")
        .insert({
          title,
          course,
          file_path: filePath,
          user_id: user.id,
          downloads: 0,
        })
        .select()
        .single()

      if (dbError) {
        console.error("Database error:", dbError)
        // If DB insert fails, clean up the uploaded file
        await supabase.storage.from("slides").remove([filePath])
        throw new Error(`Database entry failed: ${dbError.message}`)
      }

      console.log("Database entry created:", dbData)

      // 4. Success - close dialog and refresh
      onOpenChange(false)
      setTitle("")
      setCourse("")
      setFile(null)
      router.refresh()
    } catch (err: any) {
      console.error("Upload process error:", err)
      setError(err.message || "Failed to upload slide")
    } finally {
      setLoading(false)
      setProgress(0)
    }
  }

  const isSubmitDisabled = !title || !course || !file || loading

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Slide</DialogTitle>
        </DialogHeader>

        {error && (
          <Alert variant="destructive" className="text-sm">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter slide title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="course">Course</Label>
            <Select value={course} onValueChange={setCourse} required>
              <SelectTrigger>
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent>
                {COURSES.map((course) => (
                  <SelectItem key={course} value={course}>
                    {course}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="file">File</Label>
            <div className="grid w-full items-center gap-1.5">
              <Input id="file" type="file" accept=".pdf,.ppt,.pptx" onChange={handleFileChange} required />
              <p className="text-xs text-muted-foreground">Accepted formats: PDF, PPT, PPTX. Max size: 50MB</p>
            </div>
          </div>

          {loading && progress > 0 && (
            <div className="space-y-2">
              <div className="w-full bg-muted rounded-full h-2.5">
                <div
                  className="bg-black h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-center text-muted-foreground">Uploading: {progress}%</p>
            </div>
          )}

          <Button type="submit" className="w-full bg-black text-white hover:bg-black/90" disabled={isSubmitDisabled}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload Slide
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

