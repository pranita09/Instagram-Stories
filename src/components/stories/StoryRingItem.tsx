import type { Story } from '../../types/story'
import { shortTitle } from '../../utils/utils'

interface StoryRingItemProps {
  story: Story
  index: number
  onSelect: (index: number) => void
}

export function StoryRingItem({ story, index, onSelect }: StoryRingItemProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(index)}
      className="group flex w-[4.5rem] shrink-0 snap-start flex-col items-center gap-2 border-0 bg-transparent p-0 text-left transition active:scale-[0.97]"
      aria-label={`Open story: ${story.alt}`}
    >
      <span className="rounded-full bg-gradient-to-tr from-amber-300 via-rose-500 to-fuchsia-600 p-[2.5px] shadow-md shadow-black/30 ring-1 ring-white/10">
        <span className="block rounded-full bg-zinc-950 p-[2px]">
          <img
            src={story.imageUrl}
            alt=""
            width={72}
            height={72}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="h-[4.25rem] w-[4.25rem] rounded-full object-cover transition duration-300 group-hover:brightness-110"
          />
        </span>
      </span>
      <span className="line-clamp-2 w-full px-0.5 text-center text-[11px] font-medium leading-tight tracking-wide text-white/80">
        {shortTitle(story.alt)}
      </span>
    </button>
  )
}
