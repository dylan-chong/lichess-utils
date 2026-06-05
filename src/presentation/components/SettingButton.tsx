import type { Signal } from '@preact/signals'

interface SettingButtonProps<T> {
  label: string
  setting: Signal<T>
  options: readonly T[]
}

const buttonStyle = {
  margin: '4px',
  padding: '6px 12px',
  border: '1px solid currentColor',
  borderRadius: '4px',
  backgroundColor: 'transparent',
  color: 'inherit',
  cursor: 'pointer',
  fontSize: '14px',
}

export function SettingButton<T>({ label, setting, options }: SettingButtonProps<T>) {
  const handleClick = (e: Event) => {
    e.preventDefault()
    e.stopPropagation()

    const currentIndex = options.indexOf(setting.value)
    const nextIndex = (currentIndex + 1) % options.length
    const newValue = options[nextIndex]
    console.log(`[SettingButton] ${label}: ${setting.value} -> ${newValue}`)
    setting.value = newValue
  }

  // Access signal.value in JSX for auto-reactivity
  return (
    <button onClick={handleClick} type="button" style={buttonStyle}>
      {label}: {setting.value}
    </button>
  )
}
