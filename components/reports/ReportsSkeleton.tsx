import { Skeleton } from "@/components/ui/skeleton";

export function ReportsSummarySkeleton() {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2">
        <Skeleton className="h-1 w-8 rounded-full" />
        <Skeleton className="h-6 w-48" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-4 rounded" />
            </div>
            <div className="mt-4">
              <Skeleton className="h-8 w-24 mb-2" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ReportsContentSkeleton() {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2">
        <Skeleton className="h-1 w-8 rounded-full" />
        <Skeleton className="h-6 w-48" />
      </div>

      {/* Tabs skeleton */}
      <div className="w-full">
        <div className="grid w-full grid-cols-4 h-12 p-1 bg-muted/50 rounded-lg mb-6">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-10 rounded-md" />
          ))}
        </div>

        {/* Content skeleton */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Chart skeleton */}
          <div className="rounded-lg border bg-card shadow-sm">
            <div className="p-6 border-b">
              <div className="flex items-center gap-2 mb-2">
                <Skeleton className="h-5 w-5 rounded" />
                <Skeleton className="h-5 w-32" />
              </div>
              <Skeleton className="h-4 w-48" />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-center h-[300px]">
                <Skeleton className="h-32 w-32 rounded-full" />
              </div>
            </div>
          </div>

          {/* Second chart skeleton */}
          <div className="rounded-lg border bg-card shadow-sm">
            <div className="p-6 border-b">
              <div className="flex items-center gap-2 mb-2">
                <Skeleton className="h-5 w-5 rounded" />
                <Skeleton className="h-5 w-40" />
              </div>
              <Skeleton className="h-4 w-48" />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-center h-[300px]">
                <Skeleton className="h-40 w-40 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
