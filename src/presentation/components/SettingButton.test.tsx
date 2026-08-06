import { signal } from '@preact/signals'
import { render, screen } from '@testing-library/preact'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { SettingButton } from './SettingButton'

describe('SettingButton', () => {
  describe('with 2 options (toggle)', () => {
    it('should display current value', () => {
      const setting = signal(false)
      const options = [false, true] as const

      render(<SettingButton label="Flag" setting={setting} options={options} />)

      expect(screen.getByRole('button').textContent).toBe('Flag: false')
    })

    it('should cycle to next value on click and update display', async () => {
      const user = userEvent.setup()
      const setting = signal(false)
      const options = [false, true] as const

      render(<SettingButton label="Flag" setting={setting} options={options} />)

      await user.click(screen.getByRole('button'))

      expect(setting.value).toBe(true)
      expect(screen.getByRole('button').textContent).toBe('Flag: true')
    })

    it('wraps to first value after cycling through both options', async () => {
      const user = userEvent.setup()
      const setting = signal(false)
      const options = [false, true] as const

      render(<SettingButton label="Flag" setting={setting} options={options} />)

      await user.click(screen.getByRole('button'))
      await user.click(screen.getByRole('button'))

      expect(setting.value).toBe(false)
      expect(screen.getByRole('button').textContent).toBe('Flag: false')
    })
  })

  describe('with 3+ options (dropdown)', () => {
    it('should render a select with the current value selected', () => {
      const setting = signal(0.5)
      const options = [0.2, 0.5, 1.0] as const

      render(<SettingButton label="Speed" setting={setting} options={options} />)

      expect(screen.getByText('Speed')).toBeInstanceOf(HTMLElement)
      expect((screen.getByRole('combobox') as HTMLSelectElement).value).toBe('1')
    })

    it('should update the setting when a new option is selected', async () => {
      const user = userEvent.setup()
      const setting = signal(0.5)
      const options = [0.2, 0.5, 1.0] as const

      render(<SettingButton label="Speed" setting={setting} options={options} />)

      await user.selectOptions(screen.getByRole('combobox'), screen.getByText('1'))

      expect(setting.value).toBe(1.0)
    })

    it('supports string option values', async () => {
      const user = userEvent.setup()
      const setting = signal('off')
      const options = ['off', 'small', 'large'] as const

      render(<SettingButton label="Hover" setting={setting} options={options} />)

      expect((screen.getByRole('combobox') as HTMLSelectElement).value).toBe('0')

      await user.selectOptions(screen.getByRole('combobox'), screen.getByText('small'))

      expect(setting.value).toBe('small')
    })

    it('should update display when signal changes externally', async () => {
      const setting = signal(0.2)
      const options = [0.2, 0.5, 1.0] as const

      render(<SettingButton label="Speed" setting={setting} options={options} />)

      expect((screen.getByRole('combobox') as HTMLSelectElement).value).toBe('0')

      setting.value = 1.0

      // Wait for the signal subscription to update the component
      await new Promise((resolve) => setTimeout(resolve, 10))

      expect((screen.getByRole('combobox') as HTMLSelectElement).value).toBe('2')
    })

    it('allows jumping directly to any option, not just the next one', async () => {
      const user = userEvent.setup()
      const setting = signal(0.2)
      const options = [0.2, 0.5, 0.7, 1.0, 1.1, 1.2] as const

      render(<SettingButton label="Rate" setting={setting} options={options} />)

      await user.selectOptions(screen.getByRole('combobox'), screen.getByText('1.2'))
      expect(setting.value).toBe(1.2)

      await user.selectOptions(screen.getByRole('combobox'), screen.getByText('0.5'))
      expect(setting.value).toBe(0.5)
    })
  })
})
