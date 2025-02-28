import { Suspense } from "react"
import SlidesList from "@/components/slides-list"
import { getSlides } from "@/lib/actions"

export default async function Page() {

  const slides = await getSlides()

  return (
    <div className="min-h-screen">
      <Suspense fallback={<div>Loading...</div>}>
        <SlidesList initialSlides={slides} />
      </Suspense>
    </div>
  )
}

