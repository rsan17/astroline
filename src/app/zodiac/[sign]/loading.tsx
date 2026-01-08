import { Skeleton } from '@/components/ui';

export default function ZodiacLoading() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-xl font-bold gradient-text">✨ Astroline</div>
          <Skeleton className="w-24 h-9 rounded-full" />
        </div>
      </nav>

      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Breadcrumbs skeleton */}
          <div className="flex items-center gap-2 mb-8">
            <Skeleton className="w-20 h-4" />
            <Skeleton className="w-4 h-4" />
            <Skeleton className="w-32 h-4" />
          </div>

          {/* Hero skeleton */}
          <div className="text-center mb-16">
            <Skeleton className="w-24 h-24 rounded-full mx-auto mb-6" />
            <Skeleton className="w-64 h-12 mx-auto mb-4" />
            <Skeleton className="w-40 h-6 mx-auto mb-4" />
            <div className="flex items-center justify-center gap-4">
              <Skeleton className="w-20 h-4" />
              <Skeleton className="w-20 h-4" />
              <Skeleton className="w-20 h-4" />
            </div>
          </div>

          {/* Description skeleton */}
          <div className="glass rounded-3xl p-8 mb-12">
            <Skeleton className="w-48 h-8 mb-6" />
            <Skeleton className="w-full h-4 mb-3" />
            <Skeleton className="w-full h-4 mb-3" />
            <Skeleton className="w-3/4 h-4" />
          </div>

          {/* Traits skeleton */}
          <div className="mb-12">
            <Skeleton className="w-40 h-8 mb-6" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-16 rounded-xl" />
              ))}
            </div>
          </div>

          {/* Strengths & Weaknesses skeleton */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="glass rounded-3xl p-6">
              <Skeleton className="w-36 h-6 mb-4" />
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="w-full h-4 mb-2" />
              ))}
            </div>
            <div className="glass rounded-3xl p-6">
              <Skeleton className="w-36 h-6 mb-4" />
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="w-full h-4 mb-2" />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
