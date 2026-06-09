export function getBlackedOutQuadrants(mode: string, counter: number): number[] {
  switch (mode) {
    case 'none':
      return []
    case '1/4':
      return [counter % 4]
    case '1/2':
      return [
        [0, 1],
        [2, 3],
        [0, 2],
        [1, 3],
      ][counter % 4]
    case '3/4': {
      const visible = counter % 4
      return [0, 1, 2, 3].filter((q) => q !== visible)
    }
    case '4/4':
      return [0, 1, 2, 3]
    default:
      return []
  }
}

export function getTimingMs(timing: string): number | null {
  switch (timing) {
    case 'rotate-10s':
      return 10000
    case 'rotate-30s':
      return 30000
    case 'rotate-60s':
      return 60000
    case 'dont-rotate':
      return null
    default:
      return null
  }
}
