import { useState } from 'react'
import type { Story } from '../../types/story'

interface StorySlideImageProps {
  story: Story
  onMediaSettled: () => void
}

export function StorySlideImage({ story, onMediaSettled }: StorySlideImageProps) {
  const [phase, setPhase] = useState<'loading' | 'ready' | 'error'>('loading')

  return (
    <div className="relative h-full w-full overflow-hidden bg-zinc-900">
      {phase === 'loading' && (
        <div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-zinc-950"
          aria-busy="true"
          aria-label="Loading story image"
        >
          <div className="h-9 w-9 animate-spin rounded-full border-2 border-white/20 border-t-white" />
          <span className="text-xs font-medium tracking-wide text-white/60">Loading…</span>
        </div>
      )}

      {phase === 'error' && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-zinc-950 px-6 text-center">
          <p className="text-sm font-medium text-white">Could not load this image.</p>
          <p className="text-xs text-white/50">Check your connection and try again.</p>
        </div>
      )}

      <img
        src={story.imageUrl}
        alt={story.alt}
        loading="eager"
        decoding="async"
        draggable={false}
        onLoad={() => {
          setPhase('ready')
          onMediaSettled()
        }}
        onError={() => {
          setPhase('error')
          onMediaSettled()
        }}
        className={[
          'h-full w-full object-cover transition-opacity duration-300 ease-out',
          phase === 'ready' ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
      />
    </div>
  )
}
