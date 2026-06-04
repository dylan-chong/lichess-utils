import { createContext } from 'preact'
import { useContext } from 'preact/hooks'
import type { SettingsStore } from '../../application/settings/settingsStore'

const SettingsContext = createContext<SettingsStore | null>(null)

interface SettingsProviderProps {
  settings: SettingsStore
  children: preact.ComponentChildren
}

export function SettingsProvider({ settings, children }: SettingsProviderProps) {
  return <SettingsContext.Provider value={settings}>{children}</SettingsContext.Provider>
}

export function useSettings(): SettingsStore {
  const settings = useContext(SettingsContext)
  /* v8 ignore next 3 */
  if (!settings) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return settings
}
