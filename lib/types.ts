export interface Slide {
  id: string
  title: string
  course: string
  file_path: string
  thumbnail_path: string | null
  downloads: number
  created_at: string
  user_id: string
}

export interface SlideWithUrl extends Slide {
  fileUrl: string
}

