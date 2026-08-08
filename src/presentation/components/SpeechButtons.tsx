import { useEffect, useState } from 'preact/hooks'
import { handleSpeechCommand } from '../../application/handlers/handleSpeechCommand'
import { SpeechCommand } from '../../constants/commands'
import { generateVoiceTestText } from '../../domain/speech/speechText'
import { getAvailableVoiceNames, onVoicesChanged, speakText } from '../../platform/speech'
import { useSettings } from '../contexts/SettingsContext'
import { ActionButton } from './ActionButton'
import { ButtonRow } from './ButtonRow'
import { SectionHeading } from './SectionHeading'
import { SettingButton } from './SettingButton'
import { VoiceButton } from './VoiceButton'

const SPEAK_RATE_OPTIONS = [0.2, 0.5, 0.7, 1.0, 1.1, 1.2] as const
const PAUSE_LENGTH_OPTIONS = [0, 0.1, 0.3, 0.6, 1, 1.5, 2, 4] as const

export function SpeechButtons() {
  const settings = useSettings()
  const [voiceNames, setVoiceNames] = useState<string[]>(() => getAvailableVoiceNames())

  useEffect(() => {
    // Voices may finish loading asynchronously before this listener is
    // attached (the 'voiceschanged' event only fires once), so re-check here
    // in case that already happened, not just on future changes.
    setVoiceNames(getAvailableVoiceNames())
    onVoicesChanged(() => setVoiceNames(getAvailableVoiceNames()))
  }, [])

  return (
    <div>
      <SectionHeading label="Speak quadrants" />
      <ButtonRow>
        <ActionButton
          label="🔊 WK side"
          onClick={() => handleSpeechCommand(SpeechCommand.WK, settings)}
        />
        <ActionButton
          label="🔊 WQ side"
          onClick={() => handleSpeechCommand(SpeechCommand.WQ, settings)}
        />
        <ActionButton
          label="🔊 BK side"
          onClick={() => handleSpeechCommand(SpeechCommand.BK, settings)}
        />
        <ActionButton
          label="🔊 BQ side"
          onClick={() => handleSpeechCommand(SpeechCommand.BQ, settings)}
        />
      </ButtonRow>

      <SectionHeading label="Speak all" />
      <ButtonRow>
        <ActionButton
          label="🔊 All pieces"
          onClick={() => handleSpeechCommand(SpeechCommand.ALL, settings)}
        />
        <ActionButton
          label="🔊 W's pieces"
          onClick={() => handleSpeechCommand(SpeechCommand.WHITE, settings)}
        />
        <ActionButton
          label="🔊 B's pieces"
          onClick={() => handleSpeechCommand(SpeechCommand.BLACK, settings)}
        />
      </ButtonRow>

      <SectionHeading label="Speak settings" />
      <ButtonRow>
        <SettingButton label="🔊 Rate" setting={settings.speakRate} options={SPEAK_RATE_OPTIONS} />
        <SettingButton
          label="🔊 Pause"
          setting={settings.pauseLength}
          options={PAUSE_LENGTH_OPTIONS}
        />
        <VoiceButton
          label="🔊 Voice"
          setting={settings.voiceName}
          voiceNames={voiceNames}
          onChange={(voiceName) =>
            speakText(generateVoiceTestText(), settings.speakRate.value, voiceName)
          }
        />
      </ButtonRow>
      <ButtonRow>
        <ActionButton
          label="🔊 Stop"
          onClick={() => handleSpeechCommand(SpeechCommand.STOP, settings)}
        />
      </ButtonRow>
    </div>
  )
}
