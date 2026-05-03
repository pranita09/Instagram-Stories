import { startTransition, useCallback, useEffect, useState } from 'react'
import type { Story } from '../types/story'
import { fetchStoriesCatalog } from '../utils/fetchStoriesCatalog'

export type StoriesCatalogStatus = 'idle' | 'loading' | 'success' | 'error'

export interface UseStoriesCatalogResult {
  stories: Story[]
  status: StoriesCatalogStatus
  errorMessage: string | null
  reload: () => void
}

export function useStoriesCatalog(): UseStoriesCatalogResult {
  const [stories, setStories] = useState<Story[]>([])
  const [status, setStatus] = useState<StoriesCatalogStatus>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [reloadToken, setReloadToken] = useState(0)

  const reload = useCallback(() => {
    setReloadToken((n) => n + 1)
  }, [])

  useEffect(() => {
    let cancelled = false
    startTransition(() => {
      setStatus('loading')
      setErrorMessage(null)
    })

    const load = async () => {
      try {
        const items = await fetchStoriesCatalog()
        if (cancelled) return
        setStories(items)
        setStatus('success')
      } catch (thrown) {
        if (cancelled) return
        const message =
          thrown instanceof Error
            ? thrown.message
            : 'Something went wrong loading stories.'
        setErrorMessage(message)
        setStories([])
        setStatus('error')
      }
    }

    void load()

    return () => {
      cancelled = true
    }
  }, [reloadToken])

  return { stories, status, errorMessage, reload }
}
