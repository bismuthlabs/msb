export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    tables: {
      slides: {
        Row: {
          id: string
          title: string
          course: string
          file_path: string
          thumbnail_path: string | null
          downloads: number
          created_at: string
          user_id: string
        }
        Insert: {
          id?: string
          title: string
          course: string
          file_path: string
          thumbnail_path?: string | null
          downloads?: number
          created_at?: string
          user_id: string
        }
        Update: {
          id?: string
          title?: string
          course?: string
          file_path?: string
          thumbnail_path?: string | null
          downloads?: number
          created_at?: string
          user_id?: string
        }
      }
    }
  }
}

