export function shortTitle(alt: string): string {
    const max = 28
    if (alt.length <= max) return alt
    return `${alt.slice(0, max - 1)}…`
  }

  export function clampIndex(index: number, length: number): number {
    if (length <= 0) return 0
    return Math.min(Math.max(0, index), length - 1)
  }