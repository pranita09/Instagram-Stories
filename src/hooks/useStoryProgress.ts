import { startTransition, useEffect, useState } from 'react'
import {
  STORY_DISPLAY_DURATION_MS,
  STORY_PROGRESS_TICK_MS,
} from '../constants/storyViewer'

interface UseStoryProgressParams {
  isActive: boolean
  progressKey: string
}

export function useStoryProgress({
  isActive,
  progressKey,
}: UseStoryProgressParams): number {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    startTransition(() => {
      setProgress(0)
    })

    if (!isActive) return

    const startedAt = performance.now()

    const intervalId = window.setInterval(() => {
      const elapsed = performance.now() - startedAt
      setProgress(Math.min(1, elapsed / STORY_DISPLAY_DURATION_MS))
    }, STORY_PROGRESS_TICK_MS)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [isActive, progressKey])

  return progress
}
