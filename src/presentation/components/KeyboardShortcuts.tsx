import { SHORTCUTS } from '../../constants/shortcuts'

const containerStyle = {
  margin: '8px 0',
  padding: '12px',
  border: '1px solid currentColor',
  borderRadius: '4px',
  backgroundColor: 'rgba(255, 255, 255, 0.02)',
  fontSize: '14px',
  lineHeight: '1.6',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
}

const shortcutStyle = {
  fontFamily: 'monospace',
  fontWeight: 'bold',
}

export function KeyboardShortcuts() {
  return (
    <div style={containerStyle}>
      {SHORTCUTS.map((shortcut) => (
        <div key={shortcut.command}>
          <span style={shortcutStyle}>*{shortcut.command}*</span> - {shortcut.description}
        </div>
      ))}
    </div>
  )
}
