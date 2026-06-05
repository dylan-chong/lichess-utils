import type { Signal } from '@preact/signals'

interface SettingButtonProps<T> {
  label: string
  setting: Signal<T>
  options: readonly T[]
}

const buttonStyle = {
  margin: '4px',
  padding: '6px 12px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  backgroundColor: '#f0f0f0',
  cursor: 'pointer',
  fontSize: '14px',
}

export function SettingButton<T>({ label, setting, options }: SettingButtonProps<T>) {
  const handleClick = () => {
    const currentIndex = options.indexOf(setting.value)
    const nextIndex = (currentIndex + 1) % options.length
    setting.value = options[nextIndex]
  }

  return (
    <button onClick={handleClick} type="button" style={buttonStyle}>
      {label}: {String(setting.value)}
    </button>
  )
}
