import type { Story } from '../../types/story'
import { StoryRingItem } from './StoryRingItem'

interface StoryRailProps {
  stories: Story[]
  onPickStory: (index: number) => void
}

export function StoryRail({ stories, onPickStory }: StoryRailProps) {
  return (
    <section aria-label="Available stories" className="w-full">
      <div className="mb-3 flex items-end justify-between px-1">
        <div>
          <h2 className="text-sm font-semibold tracking-tight text-white">Stories</h2>
          <p className="mt-0.5 text-xs text-white/45">Tap a ring to watch</p>
        </div>
        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/55">
          {stories.length}
        </span>
      </div>

      <div className="hide-scrollbar -mx-1 flex gap-3 overflow-x-auto px-1 pb-1 pt-0.5">
        {stories.map((story, index) => (
          <StoryRingItem key={story.id} story={story} index={index} onSelect={onPickStory} />
        ))}
      </div>
    </section>
  )
}
