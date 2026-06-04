import { Signal } from '@preact/signals'

interface SettingButtonProps<T> {
  label: string
  setting: Signal<T>
  options: readonly T[]
}

export function SettingButton<T>({
  label,
  setting,
  options,
}: SettingButtonProps<T>) {
  const handleClick = () => {
    const currentIndex = options.indexOf(setting.value)
    const nextIndex = (currentIndex + 1) % options.length
    setting.value = options[nextIndex]
  }

  return (
    <button onClick={handleClick} type="button">
      {label}: {String(setting.value)}
    </button>
  )
}
