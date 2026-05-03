import { useEffect, useRef } from 'react'
import { STORY_DISPLAY_DURATION_MS } from '../constants/storyViewer'

interface UseStoryAutoAdvanceParams {
  isActive: boolean
  advanceKey: string
  onAdvance: () => void
}

export function useStoryAutoAdvance({
  isActive,
  advanceKey,
  onAdvance,
}: UseStoryAutoAdvanceParams): void {
  const onAdvanceRef = useRef(onAdvance)

  useEffect(() => {
    onAdvanceRef.current = onAdvance
  }, [onAdvance])

  useEffect(() => {
    if (!isActive) return

    const timeoutId = window.setTimeout(() => {
      onAdvanceRef.current()
    }, STORY_DISPLAY_DURATION_MS)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [isActive, advanceKey])
}
