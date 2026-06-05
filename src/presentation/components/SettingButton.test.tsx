import { signal } from '@preact/signals'
import { render, screen } from '@testing-library/preact'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { SettingButton } from './SettingButton'

describe('SettingButton', () => {
  it('should display current value', () => {
    const setting = signal(0.5)
    const options = [0.2, 0.5, 1.0] as const

    render(<SettingButton label="Speed" setting={setting} options={options} />)

    expect(screen.getByRole('button').textContent).toBe('Speed: 0.5')
  })

  it('should cycle to next value on click and update display', async () => {
    const user = userEvent.setup()
    const setting = signal(0.5)
    const options = [0.2, 0.5, 1.0] as const

    render(<SettingButton label="Speed" setting={setting} options={options} />)

    await user.click(screen.getByRole('button'))

    expect(setting.value).toBe(1.0)
    expect(screen.getByRole('button').textContent).toBe('Speed: 1')
  })

  it('should wrap to first value after last and update display', async () => {
    const user = userEvent.setup()
    const setting = signal(1.0)
    const options = [0.2, 0.5, 1.0] as const

    render(<SettingButton label="Speed" setting={setting} options={options} />)

    await user.click(screen.getByRole('button'))

    expect(setting.value).toBe(0.2)
    expect(screen.getByRole('button').textContent).toBe('Speed: 0.2')
  })

  it('cycles through string option values on click and updates display', async () => {
    const user = userEvent.setup()
    const setting = signal('off')
    const options = ['off', 'small', 'large'] as const

    render(<SettingButton label="Hover" setting={setting} options={options} />)

    expect(screen.getByRole('button').textContent).toBe('Hover: off')

    await user.click(screen.getByRole('button'))

    expect(setting.value).toBe('small')
    expect(screen.getByRole('button').textContent).toBe('Hover: small')
  })

  it('should update display when signal changes externally', async () => {
    const setting = signal(0.2)
    const options = [0.2, 0.5, 1.0] as const

    render(<SettingButton label="Speed" setting={setting} options={options} />)

    expect(screen.getByRole('button').textContent).toBe('Speed: 0.2')

    setting.value = 1.0

    // Wait for the signal subscription to update the component
    await new Promise((resolve) => setTimeout(resolve, 10))

    expect(screen.getByRole('button').textContent).toBe('Speed: 1')
  })

  it('should cycle through all values in sequence', async () => {
    const user = userEvent.setup()
    const setting = signal(0.2)
    const options = [0.2, 0.5, 0.7, 1.0, 1.1, 1.2] as const

    render(<SettingButton label="Rate" setting={setting} options={options} />)

    expect(screen.getByRole('button').textContent).toBe('Rate: 0.2')

    await user.click(screen.getByRole('button'))
    expect(setting.value).toBe(0.5)
    expect(screen.getByRole('button').textContent).toBe('Rate: 0.5')

    await user.click(screen.getByRole('button'))
    expect(setting.value).toBe(0.7)
    expect(screen.getByRole('button').textContent).toBe('Rate: 0.7')

    await user.click(screen.getByRole('button'))
    expect(setting.value).toBe(1.0)
    expect(screen.getByRole('button').textContent).toBe('Rate: 1')

    await user.click(screen.getByRole('button'))
    expect(setting.value).toBe(1.1)
    expect(screen.getByRole('button').textContent).toBe('Rate: 1.1')

    await user.click(screen.getByRole('button'))
    expect(setting.value).toBe(1.2)
    expect(screen.getByRole('button').textContent).toBe('Rate: 1.2')

    await user.click(screen.getByRole('button'))
    expect(setting.value).toBe(0.2)
    expect(screen.getByRole('button').textContent).toBe('Rate: 0.2')
  })

  it('wraps to first value after three clicks through all options', async () => {
    const user = userEvent.setup()
    const setting = signal('a')
    const options = ['a', 'b', 'c'] as const

    render(<SettingButton label="Test" setting={setting} options={options} />)

    await user.click(screen.getByRole('button'))
    await user.click(screen.getByRole('button'))
    await user.click(screen.getByRole('button'))

    expect(setting.value).toBe('a')
    expect(screen.getByRole('button').textContent).toBe('Test: a')
  })
})
