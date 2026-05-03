interface StoryTapZonesProps {
  onPrevious: () => void
  onNext: () => void
  canGoPrevious: boolean
}

export function StoryTapZones({
  onPrevious,
  onNext,
  canGoPrevious,
}: StoryTapZonesProps) {
  return (
    <div className="pointer-events-none absolute inset-0 flex">
      <button
        type="button"
        aria-label="Previous story"
        disabled={!canGoPrevious}
        onClick={() => {
          if (canGoPrevious) onPrevious()
        }}
        className="pointer-events-auto h-full w-1/2 cursor-default border-0 bg-transparent p-0"
      />
      <button
        type="button"
        aria-label="Next story"
        onClick={onNext}
        className="pointer-events-auto h-full w-1/2 cursor-default border-0 bg-transparent p-0"
      />
    </div>
  )
}
