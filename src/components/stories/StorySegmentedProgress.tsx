interface StorySegmentedProgressProps {
  storyIds: string[]
  activeIndex: number
  activeProgress: number
}

export function StorySegmentedProgress({
  storyIds,
  activeIndex,
  activeProgress,
}: StorySegmentedProgressProps) {
  return (
    <div
      className="flex w-full gap-1 px-1"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={storyIds.length}
      aria-valuenow={activeIndex + 1}
      aria-label="Story progress"
    >
      {storyIds.map((id, index) => {
        const isComplete = index < activeIndex
        const isActive = index === activeIndex
        const widthPercent = isComplete ? 100 : isActive ? activeProgress * 100 : 0

        return (
          <div
            key={id}
            className="h-0.5 min-w-[6px] flex-1 overflow-hidden rounded-full bg-white/25"
          >
            <div
              className="h-full rounded-full bg-white transition-[width] duration-100 ease-linear"
              style={{ width: `${widthPercent}%` }}
            />
          </div>
        )
      })}
    </div>
  )
}
