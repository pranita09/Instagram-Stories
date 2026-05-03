interface StoryViewerControlsProps {
  onPrevious: () => void
  onNext: () => void
  canGoPrevious: boolean
  isLastStory: boolean
}

export function StoryViewerControls({
  onPrevious,
  onNext,
  canGoPrevious,
  isLastStory,
}: StoryViewerControlsProps) {
  return (
    <div className="pointer-events-none flex items-center justify-between px-3 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2">
      <button
        type="button"
        aria-label="Previous story"
        disabled={!canGoPrevious}
        onClick={onPrevious}
        className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white shadow-lg backdrop-blur-md transition enabled:active:scale-95 disabled:cursor-not-allowed disabled:opacity-35"
      >
        <Chevron direction="left" />
      </button>
      <button
        type="button"
        aria-label={isLastStory ? 'Finish stories' : 'Next story'}
        onClick={onNext}
        className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white shadow-lg backdrop-blur-md transition active:scale-95"
      >
        <Chevron direction="right" />
      </button>
    </div>
  )
}

function Chevron({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={direction === 'right' ? '' : 'scale-x-[-1]'}
    >
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
