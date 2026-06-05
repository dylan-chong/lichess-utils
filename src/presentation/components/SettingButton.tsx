import { type Signal, useComputed } from '@preact/signals'

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
  // Use computed to create a reactive derived value
  const displayText = useComputed(() => `${label}: ${setting.value}`)

  const handleClick = (e: Event) => {
    e.preventDefault()
    e.stopPropagation()

    const currentIndex = options.indexOf(setting.value)
    const nextIndex = (currentIndex + 1) % options.length
    const newValue = options[nextIndex]
    setting.value = newValue
  }

  // Render the computed signal directly
  return (
    <button onClick={handleClick} type="button" style={buttonStyle}>
      {displayText}
    </button>
  )
}
