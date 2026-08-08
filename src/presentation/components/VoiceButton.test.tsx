import { signal } from '@preact/signals'
import { render, screen } from '@testing-library/preact'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { VoiceButton } from './VoiceButton'

describe('VoiceButton', () => {
  it('renders a default option plus each available voice name', () => {
    const setting = signal('')

    render(<VoiceButton label="Voice" setting={setting} voiceNames={['Alice', 'Bob']} />)

    expect(screen.getByText('Default')).toBeInstanceOf(HTMLElement)
    expect(screen.getByText('Alice')).toBeInstanceOf(HTMLElement)
    expect(screen.getByText('Bob')).toBeInstanceOf(HTMLElement)
  })

  it('selects the current setting value in the dropdown', () => {
    const setting = signal('Bob')

    render(<VoiceButton label="Voice" setting={setting} voiceNames={['Alice', 'Bob']} />)

    expect((screen.getByRole('combobox') as HTMLSelectElement).value).toBe('Bob')
  })

  it('updates the setting when a new voice is selected', async () => {
    const user = userEvent.setup()
    const setting = signal('')

    render(<VoiceButton label="Voice" setting={setting} voiceNames={['Alice', 'Bob']} />)

    await user.selectOptions(screen.getByRole('combobox'), screen.getByText('Bob'))

    expect(setting.value).toBe('Bob')
  })

  it('updates the setting back to empty when Default is selected', async () => {
    const user = userEvent.setup()
    const setting = signal('Bob')

    render(<VoiceButton label="Voice" setting={setting} voiceNames={['Alice', 'Bob']} />)

    await user.selectOptions(screen.getByRole('combobox'), screen.getByText('Default'))

    expect(setting.value).toBe('')
  })

  it('sizes the dropdown to the length of the current value, not the widest option', () => {
    const setting = signal('Bob')

    render(
      <VoiceButton
        label="Voice"
        setting={setting}
        voiceNames={['Alice', 'A Very Long Voice Name']}
      />
    )

    expect((screen.getByRole('combobox') as HTMLSelectElement).style.width).toBe('5ch')
  })

  it('sizes the dropdown using the Default label width when no voice is selected', () => {
    const setting = signal('')

    render(<VoiceButton label="Voice" setting={setting} voiceNames={['Alice']} />)

    expect((screen.getByRole('combobox') as HTMLSelectElement).style.width).toBe('9ch')
  })

  it('calls onChange with the newly selected voice name', async () => {
    const user = userEvent.setup()
    const setting = signal('')
    const onChange = vi.fn()

    render(
      <VoiceButton
        label="Voice"
        setting={setting}
        voiceNames={['Alice', 'Bob']}
        onChange={onChange}
      />
    )

    await user.selectOptions(screen.getByRole('combobox'), screen.getByText('Bob'))

    expect(onChange).toHaveBeenCalledExactlyOnceWith('Bob')
  })
})
