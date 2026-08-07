interface SectionHeadingProps {
  label: string
}

const SECTION_HEADING_OPACITY = 0.5

const headingStyle = {
  margin: '8px 4px 2px',
  fontSize: '11px',
  opacity: SECTION_HEADING_OPACITY,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
}

const dividerStyle = {
  border: 'none',
  borderTop: '1px solid currentColor',
  opacity: SECTION_HEADING_OPACITY,
  margin: '2px 4px 4px',
}

export function SectionHeading({ label }: SectionHeadingProps) {
  return (
    <>
      <div style={headingStyle}>{label}</div>
      <hr style={dividerStyle} />
    </>
  )
}
