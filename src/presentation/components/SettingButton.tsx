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
  border: 'none',
  backgroundColor: 'transparent',
  color: 'inherit',
  fontSize: '14px',
  cursor: 'pointer',
}

export function SettingButton<T>({ label, setting, options }: SettingButtonProps<T>) {
  // Use computed to create a reactive derived value
  const displayText = useComputed(() => `${label}: ${setting.value}`)
  const currentIndex = useComputed(() => options.indexOf(setting.value))

  const handleClick = (e: Event) => {
    e.preventDefault()
    e.stopPropagation()

    const nextIndex = (currentIndex.value + 1) % options.length
    const newValue = options[nextIndex]
    setting.value = newValue
  }

  const handleChange = (e: Event) => {
    const index = Number((e.currentTarget as HTMLSelectElement).value)
    setting.value = options[index]
  }

  if (options.length >= 3) {
    return (
      <div style={dropdownContainerStyle}>
        <label>
          {label}
          <select value={String(currentIndex.value)} onChange={handleChange} style={selectStyle}>
            {options.map((option, index) => (
              <option key={String(option)} value={index}>
                {String(option)}
              </option>
            ))}
          </select>
        </label>
      </div>
    )
  }

  // Render the computed signal directly
  return (
    <button onClick={handleClick} type="button" style={buttonStyle}>
      {displayText}
    </button>
  )
}
