import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      {/* Header skeleton */}
      <div className="space-y-6">
        <div className="border-2 border-primary/10 rounded-2xl overflow-hidden">
          <div className="p-6 bg-primary/5 border-b border-primary/10">
            <div className="flex items-center justify-between">
              <div>
                <Skeleton className="h-8 w-64 mb-2" />
                <Skeleton className="h-4 w-96" />
              </div>
              <Skeleton className="h-6 w-32 rounded-full" />
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="flex items-center gap-4">
              <Skeleton className="h-3 flex-1" />
              <Skeleton className="h-4 w-20" />
            </div>

            <div className="border border-primary/10 rounded-xl overflow-hidden">
              <div className="p-4 bg-muted/30 border-b border-muted">
                <Skeleton className="h-6 w-48" />
              </div>

              {/* Audio player skeleton */}
              <div className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-2 w-full" />
                      <div className="flex justify-between">
                        <Skeleton className="h-4 w-12" />
                        <Skeleton className="h-4 w-12" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-8 w-8" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>

                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <div className="space-y-1">
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-5/6" />
                      <Skeleton className="h-3 w-4/6" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Quiz skeleton */}
              <div className="p-6 space-y-6 border-t border-primary/10">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-6 w-48" />
                </div>

                <Skeleton className="h-6 w-full max-w-lg" />

                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-16 w-full rounded-md" />
                  ))}
                </div>

                <Skeleton className="h-14 w-full rounded-md" />
              </div>
            </div>

            <div className="flex justify-between gap-4">
              <Skeleton className="h-10 w-28 rounded-md" />
              <Skeleton className="h-10 w-28 rounded-md" />
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Skeleton className="h-10 w-48 rounded-md" />
        </div>
      </div>
    </div>
  );
}
