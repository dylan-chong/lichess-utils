import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/preact'
import { signal } from '@preact/signals'
import userEvent from '@testing-library/user-event'
import { SettingButton } from './SettingButton'

describe('SettingButton', () => {
  it('should display current value', () => {
    const setting = signal(0.5)
    const options = [0.2, 0.5, 1.0] as const

    render(<SettingButton label="Speed" setting={setting} options={options} />)

    expect(screen.getByRole('button').textContent).toBe('Speed: 0.5')
  })

  it('should cycle to next value on click', async () => {
    const user = userEvent.setup()
    const setting = signal(0.5)
    const options = [0.2, 0.5, 1.0] as const

    render(<SettingButton label="Speed" setting={setting} options={options} />)

    await user.click(screen.getByRole('button'))

    expect(setting.value).toBe(1.0)
    expect(screen.getByRole('button').textContent).toBe('Speed: 1')
  })

  it('should wrap to first value after last', async () => {
    const user = userEvent.setup()
    const setting = signal(1.0)
    const options = [0.2, 0.5, 1.0] as const

    render(<SettingButton label="Speed" setting={setting} options={options} />)

    await user.click(screen.getByRole('button'))

    expect(setting.value).toBe(0.2)
    expect(screen.getByRole('button').textContent).toBe('Speed: 0.2')
  })

  it('should work with string values', async () => {
    const user = userEvent.setup()
    const setting = signal('off')
    const options = ['off', 'small', 'large'] as const

    render(<SettingButton label="Hover" setting={setting} options={options} />)

    expect(screen.getByRole('button').textContent).toBe('Hover: off')

    await user.click(screen.getByRole('button'))

    expect(setting.value).toBe('small')
    expect(screen.getByRole('button').textContent).toBe('Hover: small')
  })

  it('should update display when signal changes externally', () => {
    const setting = signal(0.2)
    const options = [0.2, 0.5, 1.0] as const

    const { rerender } = render(
      <SettingButton label="Speed" setting={setting} options={options} />
    )

    expect(screen.getByRole('button').textContent).toBe('Speed: 0.2')

    setting.value = 1.0
    rerender(<SettingButton label="Speed" setting={setting} options={options} />)

    expect(screen.getByRole('button').textContent).toBe('Speed: 1')
  })
})
