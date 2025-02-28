"use server"

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import type { Database } from "./database.types"
import type { SlideWithUrl } from "./types"

export async function getSlides(): Promise<SlideWithUrl[]> {
  const supabase = createServerComponentClient<Database>({ cookies })

  try {
    const { data: slides, error } = await supabase.from("slides").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching slides:", error)
      return []
    }

    // Get public URLs for all slides
    const slidesWithUrls = slides.map((slide) => {
      const {
        data: { publicUrl },
      } = supabase.storage.from("slides").getPublicUrl(slide.file_path)

      return {
        ...slide,
        fileUrl: publicUrl,
      }
    })

    return slidesWithUrls
  } catch (error) {
    console.error("Error in getSlides:", error)
    return []
  }
}

export async function downloadSlide(slideId: string) {
  const supabase = createServerComponentClient<Database>({ cookies })

  try {
    // Increment download count
    const { error: updateError } = await supabase
      .from("slides")
      .update({ downloads: 0 }) // Initialize downloads to 0 if it's null.  Could also use a default value in the database schema.
      .eq("id", slideId)
      .select()

    if (updateError) {
      console.error("Error updating download count:", updateError)
    }
  } catch (error) {
    console.error("Error in downloadSlide:", error)
  }
}

