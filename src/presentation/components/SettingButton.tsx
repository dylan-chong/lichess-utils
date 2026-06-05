import type { Signal } from '@preact/signals'
import { useSignal } from '@preact/signals'
import { useEffect } from 'preact/hooks'

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
  // Create a local signal that mirrors the external signal
  const localValue = useSignal(setting.value)

  // Subscribe to signal changes using effect with setting as dependency
  useEffect(() => {
    const unsubscribe = setting.subscribe((value) => {
      localValue.value = value
    })
    return unsubscribe
  }, [setting, localValue])

  const handleClick = (e: Event) => {
    e.preventDefault()
    e.stopPropagation()

    const currentIndex = options.indexOf(setting.value)
    const nextIndex = (currentIndex + 1) % options.length
    const newValue = options[nextIndex]
    console.log(`[SettingButton] ${label}: ${setting.value} -> ${newValue}`)
    setting.value = newValue
  }

  // Use local signal for display (this will auto-update)
  return (
    <button onClick={handleClick} type="button" style={buttonStyle}>
      {label}: {localValue.value}
    </button>
  )
}
