import type { Signal } from '@preact/signals'

interface VoiceButtonProps {
  label: string
  setting: Signal<string>
  voiceNames: readonly string[]
}

const DEFAULT_VOICE_LABEL = 'Default'

const dropdownContainerStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  margin: '4px',
  padding: '6px 12px',
  border: '1px solid currentColor',
  borderRadius: '4px',
  backgroundColor: 'transparent',
  color: 'inherit',
  fontSize: '14px',
}

const selectStyle = {
  marginLeft: '2px',
  padding: '0',
  border: 'none',
  backgroundColor: 'transparent',
  color: 'inherit',
  fontSize: '14px',
  cursor: 'pointer',
}

export function VoiceButton({ label, setting, voiceNames }: VoiceButtonProps) {
  const options = ['', ...voiceNames]

  const handleChange = (e: Event) => {
    setting.value = (e.currentTarget as HTMLSelectElement).value
  }

  return (
    <div style={dropdownContainerStyle}>
      <label>
        {label}
        <select value={setting.value} onChange={handleChange} style={selectStyle}>
          {options.map((voiceName) => (
            <option key={voiceName} value={voiceName}>
              {voiceName || DEFAULT_VOICE_LABEL}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}
