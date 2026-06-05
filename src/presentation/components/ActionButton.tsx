interface ActionButtonProps {
  label: string
  onClick: () => void
}

export function ActionButton({ label, onClick }: ActionButtonProps) {
  return (
    <button onClick={onClick} type="button">
      {label}
    </button>
  )
}
