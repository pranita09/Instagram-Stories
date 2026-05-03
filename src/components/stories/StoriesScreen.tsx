import { useCallback, useState } from 'react'
import { type StoriesCatalogStatus, useStoriesCatalog } from '../../hooks/useStoriesCatalog'
import type { Story } from '../../types/story'
import { clampIndex } from '../../utils/utils'
import { MobileStoriesShell } from './MobileStoriesShell'
import { StoryCatalogEmpty, StoryCatalogError } from './StoryCatalogStates'
import { StoryRail } from './StoryRail'
import { StoryRailSkeleton } from './StoryRailSkeleton'
import { StoryViewer } from './StoryViewer'

type StoryCatalogPanelProps = {
  status: StoriesCatalogStatus
  stories: Story[]
  errorMessage: string | null
  onRetry: () => void
  onPickStory: (index: number) => void
}

function StoryCatalogPanel({
  status,
  stories,
  errorMessage,
  onRetry,
  onPickStory,
}: StoryCatalogPanelProps) {
  if (status === 'idle' || status === 'loading') {
    return <StoryRailSkeleton />
  }
  if (status === 'error') {
    return <StoryCatalogError message={errorMessage} onRetry={onRetry} />
  }
  if (stories.length === 0) {
    return <StoryCatalogEmpty />
  }
  return <StoryRail stories={stories} onPickStory={onPickStory} />
}

export function StoriesScreen() {
  const { stories, status, errorMessage, reload } = useStoriesCatalog()
  const [viewerOpen, setViewerOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const viewerActiveIndex = clampIndex(activeIndex, stories.length)
  const hasStories = status === 'success' && stories.length > 0

  const openViewer = useCallback(
    (index: number) => {
      setActiveIndex(clampIndex(index, stories.length))
      setViewerOpen(true)
    },
    [stories.length],
  )

  const handleChangeIndex = useCallback(
    (index: number) => {
      setActiveIndex(clampIndex(index, stories.length))
    },
    [stories.length],
  )

  return (
    <MobileStoriesShell overlayActive={viewerOpen}>
      <main className="flex min-h-0 flex-1 flex-col">
        <div className='relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-zinc-600/40 bg-zinc-950 shadow-lg shadow-black/25 ring-1 ring-white/5'>
          <div
            className={[
              'flex min-h-0 flex-1 flex-col p-4 transition-opacity duration-200',
              viewerOpen ? 'pointer-events-none opacity-0' : 'opacity-100',
            ].join(' ')}
            aria-hidden={viewerOpen}
          >
            <StoryCatalogPanel
              status={status}
              stories={stories}
              errorMessage={errorMessage}
              onRetry={reload}
              onPickStory={openViewer}
            />
          </div>

          {viewerOpen && hasStories && (
            <StoryViewer
              stories={stories}
              activeIndex={viewerActiveIndex}
              onClose={() => setViewerOpen(false)}
              onChangeIndex={handleChangeIndex}
            />
          )}
        </div>
      </main>
    </MobileStoriesShell>
  )
}
