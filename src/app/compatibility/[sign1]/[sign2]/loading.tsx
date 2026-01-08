import { Skeleton } from '@/components/ui';

export default function CompatibilityLoading() {
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
            <Skeleton className="w-40 h-4" />
          </div>

          {/* Hero skeleton */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Skeleton className="w-20 h-20 rounded-full" />
              <Skeleton className="w-8 h-8" />
              <Skeleton className="w-20 h-20 rounded-full" />
            </div>
            <Skeleton className="w-96 h-10 mx-auto mb-4" />
            <div className="flex items-center justify-center gap-4">
              <Skeleton className="w-32 h-4" />
              <Skeleton className="w-4 h-4" />
              <Skeleton className="w-32 h-4" />
            </div>
          </div>

          {/* Overall Score skeleton */}
          <div className="glass rounded-3xl p-8 mb-8 text-center">
            <Skeleton className="w-36 h-4 mx-auto mb-4" />
            <Skeleton className="w-32 h-20 mx-auto mb-4" />
            <Skeleton className="w-full h-3 rounded-full" />
          </div>

          {/* Overview skeleton */}
          <div className="glass rounded-3xl p-8 mb-8">
            <Skeleton className="w-48 h-6 mb-4" />
            <Skeleton className="w-full h-4 mb-2" />
            <Skeleton className="w-full h-4 mb-2" />
            <Skeleton className="w-3/4 h-4" />
          </div>

          {/* Aspect Scores skeleton */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="glass rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Skeleton className="w-6 h-6 rounded" />
                  <Skeleton className="w-24 h-5" />
                  <Skeleton className="w-12 h-6 ml-auto" />
                </div>
                <Skeleton className="w-full h-3 rounded-full mb-3" />
                <Skeleton className="w-40 h-3" />
              </div>
            ))}
          </div>

          {/* Strengths & Challenges skeleton */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="glass rounded-3xl p-6">
              <Skeleton className="w-32 h-5 mb-4" />
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-start gap-2 mb-3">
                  <Skeleton className="w-2 h-2 rounded-full mt-2" />
                  <Skeleton className="w-full h-4" />
                </div>
              ))}
            </div>
            <div className="glass rounded-3xl p-6">
              <Skeleton className="w-32 h-5 mb-4" />
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-start gap-2 mb-3">
                  <Skeleton className="w-2 h-2 rounded-full mt-2" />
                  <Skeleton className="w-full h-4" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
