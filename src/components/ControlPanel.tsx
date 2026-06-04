import type { Signal } from '@preact/signals'
import { settings } from '../settings/settingsStore'
import { ButtonRow } from './ButtonRow'
import { SettingButton } from './SettingButton'

interface ControlPanelProps {
  boardChanged: Signal<number>
}

const SPEAK_RATE_OPTIONS = [0.2, 0.5, 0.7, 1.0, 1.1, 1.2] as const
const TOGGLE_OPTIONS = [false, true] as const

export function ControlPanel({ boardChanged }: ControlPanelProps) {
  // Use boardChanged to ensure component re-renders when board changes
  boardChanged.value

  return (
    <div>
      <ButtonRow>
        <SettingButton
          label="Speak Rate"
          setting={settings.speakRate}
          options={SPEAK_RATE_OPTIONS}
        />
        <SettingButton
          label="Pieces List"
          setting={settings.piecesListEnabled}
          options={TOGGLE_OPTIONS}
        />
        <SettingButton
          label="Dividers"
          setting={settings.dividersEnabled}
          options={TOGGLE_OPTIONS}
        />
        <SettingButton
          label="Custom Board"
          setting={settings.customBoardEnabled}
          options={TOGGLE_OPTIONS}
        />
        <SettingButton
          label="Flash Mode"
          setting={settings.flashModeEnabled}
          options={TOGGLE_OPTIONS}
        />
      </ButtonRow>
    </div>
  )
}
