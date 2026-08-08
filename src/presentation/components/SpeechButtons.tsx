import { useEffect, useState } from 'preact/hooks'
import { handleSpeechCommand } from '../../application/handlers/handleSpeechCommand'
import { getPlayerColor } from '../../application/services/boardReader/reader'
import { SpeechCommand } from '../../constants/commands'
import { getQuadrantAtScreenPosition } from '../../domain/chess/quadrantLayout'
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

  const speakQuadrantAt = (position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right') => {
    const quadrant = getQuadrantAtScreenPosition(position, getPlayerColor())
    handleSpeechCommand(quadrant, settings)
  }

  return (
    <div>
      <SectionHeading label="Speak quadrants" />
      <ButtonRow>
        <ActionButton label="🔊 ↖" onClick={() => speakQuadrantAt('top-left')} />
        <ActionButton label="🔊 ↗" onClick={() => speakQuadrantAt('top-right')} />
      </ButtonRow>
      <ButtonRow>
        <ActionButton label="🔊 ↙" onClick={() => speakQuadrantAt('bottom-left')} />
        <ActionButton label="🔊 ↘" onClick={() => speakQuadrantAt('bottom-right')} />
      </ButtonRow>
      <ButtonRow>
        <ActionButton
          label="🔊 White"
          onClick={() => handleSpeechCommand(SpeechCommand.WHITE, settings)}
        />
        <ActionButton
          label="🔊 Black"
          onClick={() => handleSpeechCommand(SpeechCommand.BLACK, settings)}
        />
      </ButtonRow>
      <ButtonRow>
        <ActionButton
          label="🔊 Stop"
          onClick={() => handleSpeechCommand(SpeechCommand.STOP, settings)}
        />
        <ActionButton
          label="🔊 All"
          onClick={() => handleSpeechCommand(SpeechCommand.ALL, settings)}
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
    </div>
  )
}
