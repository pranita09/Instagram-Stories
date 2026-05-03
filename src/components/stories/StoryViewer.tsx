import { useCallback, useState } from 'react'
import { useStoryAutoAdvance } from '../../hooks/useStoryAutoAdvance'
import { useStoryProgress } from '../../hooks/useStoryProgress'
import type { Story } from '../../types/story'
import { StorySegmentedProgress } from './StorySegmentedProgress'
import { StorySlideImage } from './StorySlideImage'
import { StoryTapZones } from './StoryTapZones'
import { StoryViewerControls } from './StoryViewerControls'

interface StoryViewerProps {
  stories: Story[]
  activeIndex: number
  onClose: () => void
  onChangeIndex: (index: number) => void
}

export function StoryViewer({
  stories,
  activeIndex,
  onClose,
  onChangeIndex,
}: StoryViewerProps) {
  const activeStory = stories[activeIndex]
  const advanceKey = activeStory ? activeStory.id : 'none'

  const [settledStoryId, setSettledStoryId] = useState<string | null>(null)
  const mediaReady = Boolean(activeStory && settledStoryId === activeStory.id)

  const handleMediaSettled = useCallback(() => {
    if (activeStory) setSettledStoryId(activeStory.id)
  }, [activeStory])

  const goNext = useCallback(() => {
    if (activeIndex >= stories.length - 1) {
      onClose()
      return
    }
    onChangeIndex(activeIndex + 1)
  }, [activeIndex, onChangeIndex, onClose, stories.length])

  const goPrevious = useCallback(() => {
    if (activeIndex <= 0) return
    onChangeIndex(activeIndex - 1)
  }, [activeIndex, onChangeIndex])

  const timerKey = `${advanceKey}:${mediaReady ? '1' : '0'}`

  useStoryAutoAdvance({
    isActive: Boolean(activeStory) && mediaReady,
    advanceKey: timerKey,
    onAdvance: goNext,
  })

  const activeProgress = useStoryProgress({
    isActive: Boolean(activeStory) && mediaReady,
    progressKey: timerKey,
  })

  if (!activeStory) return null

  const storyIds = stories.map((s) => s.id)

  return (
    <div
      className="story-viewer-open absolute inset-0 z-10 flex min-h-0 flex-col rounded-2xl bg-black"
      role="dialog"
      aria-modal="true"
      aria-label="Story viewer"
    >
      <header className="relative z-20 flex shrink-0 flex-col gap-2 px-2 pt-[max(0.5rem,env(safe-area-inset-top))]">
        <div className="flex items-center justify-between gap-2">
          <p className="min-w-0 truncate text-left text-sm font-semibold tracking-tight text-white">
            Stories
          </p>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/15 active:scale-95"
            aria-label="Close stories"
          >
            <CloseIcon />
          </button>
        </div>
        <StorySegmentedProgress
          storyIds={storyIds}
          activeIndex={activeIndex}
          activeProgress={activeProgress}
        />
      </header>

      <div className="relative min-h-0 flex-1">
        <div className="absolute inset-0 transition-opacity duration-300 ease-out">
          <StorySlideImage
            key={activeStory.id}
            story={activeStory}
            onMediaSettled={handleMediaSettled}
          />
        </div>
        <StoryTapZones
          onPrevious={goPrevious}
          onNext={goNext}
          canGoPrevious={activeIndex > 0}
        />
      </div>

      <StoryViewerControls
        onPrevious={goPrevious}
        onNext={goNext}
        canGoPrevious={activeIndex > 0}
        isLastStory={activeIndex >= stories.length - 1}
      />
    </div>
  )
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}
