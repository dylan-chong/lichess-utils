export function isWakeLockSupported(): boolean {
  return 'wakeLock' in navigator
}

export async function requestWakeLock(): Promise<WakeLockSentinel> {
  return navigator.wakeLock.request('screen')
}

export async function releaseWakeLock(lock: WakeLockSentinel): Promise<void> {
  return lock.release()
}
