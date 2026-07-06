import { type Signal, useComputed } from '@preact/signals'
import {
  BLACK_SEGMENTS_OPTIONS,
  BLACK_SEGMENTS_TIMING_OPTIONS,
  BLUR_OPTIONS,
  FLASH_DURATION_OPTIONS,
  FLASH_INTERVAL_OPTIONS,
  HOVER_MODE_OPTIONS,
  PARALLAX_OPTIONS,
  PIECE_STYLE_OPTIONS,
} from '../../constants/options'
import { useSettings } from '../contexts/SettingsContext'
import { ActionButton } from './ActionButton'
import { ButtonRow } from './ButtonRow'
import { ConditionalControls } from './ConditionalControls'
import { SettingButton } from './SettingButton'
import { SpeechButtons } from './SpeechButtons'

interface ControlPanelProps {
  boardChanged: Signal<number>
  onAnnotate: () => void
}

const TOGGLE_OPTIONS = [false, true] as const

export function ControlPanel({ boardChanged, onAnnotate }: ControlPanelProps) {
  const settings = useSettings()

  // Use boardChanged to ensure component re-renders when board changes
  boardChanged.value

  const blackSegmentsActive = useComputed(() => settings.blackSegments.value !== 'none')

  return (
    <div>
      {/* Speech Buttons - Always Visible */}
      <SpeechButtons />

      {/* Row: Pieces List */}
      <ButtonRow>
        <SettingButton
          label="Pieces List"
          setting={settings.piecesListEnabled}
          options={TOGGLE_OPTIONS}
        />
      </ButtonRow>

      {/* Row: Annotate Board */}
      <ButtonRow>
        <ActionButton label="Annotate Board" onClick={onAnnotate} />
      </ButtonRow>

      {/* Row: Dividers and Custom Board */}
      <ButtonRow>
        <SettingButton
          label="Dividers"
          setting={settings.dividersEnabled}
          options={TOGGLE_OPTIONS}
        />
        <SettingButton
          label="Custom Board"
          setting={settings.customBoardEnabled}
          options={TOGGLE_OPTIONS}
        />
      </ButtonRow>

      {/* Custom Board Nested Controls */}
      <ConditionalControls condition={settings.customBoardEnabled}>
        <ButtonRow>
          <SettingButton
            label="Obfuscations"
            setting={settings.obfuscationsEnabled}
            options={TOGGLE_OPTIONS}
          />
          <SettingButton label="Parallax" setting={settings.parallax} options={PARALLAX_OPTIONS} />
          <SettingButton
            label="Hover Mode"
            setting={settings.hoverMode}
            options={HOVER_MODE_OPTIONS}
          />
        </ButtonRow>

        {/* Obfuscations Nested Controls */}
        <ConditionalControls condition={settings.obfuscationsEnabled}>
          <ButtonRow>
            <SettingButton
              label="Piece Style"
              setting={settings.pieceStyle}
              options={PIECE_STYLE_OPTIONS}
            />
            <SettingButton label="Blur" setting={settings.blur} options={BLUR_OPTIONS} />
            <SettingButton
              label="Black Segments"
              setting={settings.blackSegments}
              options={BLACK_SEGMENTS_OPTIONS}
            />
          </ButtonRow>

          {/* Black Segments Timing - only when not 'none' */}
          <ConditionalControls condition={blackSegmentsActive}>
            <ButtonRow>
              <SettingButton
                label="Timing"
                setting={settings.blackSegmentsTiming}
                options={BLACK_SEGMENTS_TIMING_OPTIONS}
              />
            </ButtonRow>
          </ConditionalControls>
        </ConditionalControls>
      </ConditionalControls>

      {/* Row: Flash Mode */}
      <ButtonRow>
        <SettingButton
          label="Flash Mode"
          setting={settings.flashModeEnabled}
          options={TOGGLE_OPTIONS}
        />
      </ButtonRow>

      {/* Flash Mode Nested Controls */}
      <ConditionalControls condition={settings.flashModeEnabled}>
        <ButtonRow>
          <SettingButton
            label="Flash Duration"
            setting={settings.flashDuration}
            options={FLASH_DURATION_OPTIONS}
          />
          <SettingButton
            label="Flash Interval"
            setting={settings.flashInterval}
            options={FLASH_INTERVAL_OPTIONS}
          />
        </ButtonRow>
      </ConditionalControls>
    </div>
  )
}
