interface ActionButtonProps {
  label: string
  onClick: () => void
}

const buttonStyle = {
  margin: '4px',
  padding: '6px 12px',
  border: '1px solid currentColor',
  borderRadius: '4px',
  backgroundColor: 'transparent',
  color: 'inherit',
  cursor: 'pointer',
  fontSize: '14px',
}

export function ActionButton({ label, onClick }: ActionButtonProps) {
  return (
    <button onClick={onClick} type="button" style={buttonStyle}>
      {label}
    </button>
  )
}
