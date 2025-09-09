import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      {/* Hero section skeleton */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-6 md:p-10 mb-8">
        <Skeleton className="h-10 w-3/4 mb-4" />
        <Skeleton className="h-6 w-2/3 mb-6" />
        <Skeleton className="h-14 w-full rounded-xl" />
      </div>

      {/* Tabs skeleton */}
      <div className="mb-6">
        <Skeleton className="h-10 w-64" />
      </div>

      {/* Course grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="h-64 rounded-xl" />
          ))}
      </div>
    </div>
  )
}

