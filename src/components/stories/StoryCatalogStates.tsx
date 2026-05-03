interface StoryCatalogErrorProps {
  message: string | null
  onRetry: () => void
}

export function StoryCatalogError({ message, onRetry }: StoryCatalogErrorProps) {
  return (
    <section
      role="alert"
      className="flex w-full flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-10 text-center"
    >
      <p className="text-sm font-medium text-white">We could not load stories.</p>
      {message && <p className="text-xs leading-relaxed text-white/55">{message}</p>}
      <button
        type="button"
        onClick={onRetry}
        className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-white/90 active:scale-[0.98]"
      >
        Try again
      </button>
    </section>
  )
}

export function StoryCatalogEmpty() {
  return (
    <section className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-10 text-center">
      <p className="text-sm font-medium text-white">No stories yet.</p>
      <p className="mt-2 text-xs text-white/55">Add entries to `public/stories.json` to populate the rail.</p>
    </section>
  )
}
