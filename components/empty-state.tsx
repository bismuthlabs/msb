import { HelpCircle } from "lucide-react"

export default function EmptyState({ searchTerm }: { searchTerm: string }) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
      <div className="mb-4 rounded-full border-2 border-muted p-4">
        <HelpCircle className="h-8 w-8 text-muted-foreground" />
      </div>
      <h2 className="mb-2 text-xl font-semibold">No Slides found</h2>
      <p className="mb-4 text-muted-foreground">No results found for "{searchTerm}"</p>
      <p className="text-sm text-muted-foreground">Please try searching for a different course or topic.</p>
      <p className="mt-4 text-sm">
        Available courses: Artificial Intelligence, Financial Accounting, Linear Programming....
      </p>
    </div>
  )
}

