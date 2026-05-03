export function StoryRailSkeleton() {
  return (
    <section aria-busy="true" aria-label="Loading stories" className="w-full">
      <div className="mb-3 flex items-center justify-between px-1">
        <div className="h-4 w-28 animate-pulse rounded-md bg-white/10" />
        <div className="h-4 w-16 animate-pulse rounded-md bg-white/10" />
      </div>
      <div className="flex gap-3 overflow-hidden px-1">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="flex w-[4.5rem] shrink-0 flex-col items-center gap-2"
          >
            <div className="h-[4.75rem] w-[4.75rem] animate-pulse rounded-full bg-white/10" />
            <div className="h-3 w-12 animate-pulse rounded bg-white/10" />
          </div>
        ))}
      </div>
    </section>
  )
}
