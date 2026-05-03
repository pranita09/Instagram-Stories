import type { ReactNode } from 'react'
import { MOBILE_SHELL_MAX_WIDTH_PX } from '../../constants/storyViewer'

interface MobileStoriesShellProps {
  children: ReactNode
  overlayActive?: boolean
}

export function MobileStoriesShell({ children, overlayActive = false }: MobileStoriesShellProps) {
  return (
    <div className="flex min-h-dvh w-full flex-col bg-gradient-to-b from-zinc-800 via-zinc-900 to-zinc-950 text-white">
      <div className="mx-auto flex w-full max-w-full flex-1 flex-col px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-[max(0.75rem,env(safe-area-inset-top))] md:px-6">
        <div
          className={[
            'relative mx-auto flex w-full flex-1 min-h-0 flex-col',
            overlayActive ? 'overflow-hidden' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          style={{ maxWidth: MOBILE_SHELL_MAX_WIDTH_PX }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
