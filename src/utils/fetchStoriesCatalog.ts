import { STORIES_CATALOG_URL } from '../constants/storyViewer'
import type { StoriesCatalog, Story } from '../types/story'

export async function fetchStoriesCatalog(): Promise<Story[]> {
  try {
    const response = await fetch(STORIES_CATALOG_URL, {
      headers: { Accept: 'application/json' },
    })

    if (!response.ok) {
      throw new Error(`Could not load stories (${response.status}).`)
    }

    const text = await response.text()
    let catalog: StoriesCatalog
    try {
      catalog = JSON.parse(text) as StoriesCatalog
    } catch {
      throw new Error('Invalid catalog: response is not valid JSON.')
    }

    if (!Array.isArray(catalog.stories)) {
      throw new Error('Invalid catalog: expected `stories` to be an array.')
    }

    return catalog.stories
  } catch (thrown) {
    if (thrown instanceof Error) {
      throw thrown
    }
    throw new Error('Could not load stories.', { cause: thrown })
  }
}
