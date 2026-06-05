import { handleSpeechCommand } from '../../application/handlers/handleSpeechCommand'
import { SpeechCommand } from '../../constants/commands'
import { useSettings } from '../contexts/SettingsContext'
import { ActionButton } from './ActionButton'
import { ButtonRow } from './ButtonRow'
import { SettingButton } from './SettingButton'

const SPEAK_RATE_OPTIONS = [0.2, 0.5, 0.7, 1.0, 1.1, 1.2] as const

export function SpeechButtons() {
  const settings = useSettings()

  return (
    <div>
      <ButtonRow>
        <ActionButton
          label="🔊 ♔ side"
          onClick={() => handleSpeechCommand(SpeechCommand.WK, settings)}
        />
        <ActionButton
          label="🔊 ♕ side"
          onClick={() => handleSpeechCommand(SpeechCommand.WQ, settings)}
        />
        <ActionButton
          label="🔊 ♚ side"
          onClick={() => handleSpeechCommand(SpeechCommand.BK, settings)}
        />
        <ActionButton
          label="🔊 ♛ side"
          onClick={() => handleSpeechCommand(SpeechCommand.BQ, settings)}
        />
      </ButtonRow>

      <ButtonRow>
        <ActionButton
          label="🔊 all pieces"
          onClick={() => handleSpeechCommand(SpeechCommand.ALL, settings)}
        />
        <ActionButton
          label="🔊 w's pieces"
          onClick={() => handleSpeechCommand(SpeechCommand.WHITE, settings)}
        />
        <ActionButton
          label="🔊 b's pieces"
          onClick={() => handleSpeechCommand(SpeechCommand.BLACK, settings)}
        />
      </ButtonRow>

      <ButtonRow>
        <SettingButton label="🔊 rate" setting={settings.speakRate} options={SPEAK_RATE_OPTIONS} />
        <ActionButton
          label="🔊 Stop"
          onClick={() => handleSpeechCommand(SpeechCommand.STOP, settings)}
        />
      </ButtonRow>
    </div>
  )
}
