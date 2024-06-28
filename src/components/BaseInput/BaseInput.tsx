type BaseInputProps = {
  error?: boolean
  type?: string
  disabled?: boolean
  state: string
  setState: (value: string) => void
}

const BaseInput = (props: BaseInputProps) => {
  return (
    <input
      type={props.type || 'text'}
      className={`base-input${props.error && !props.state.length ? ' error' : ''}`}
      value={props.state}
      onChange={e => props.setState(e.target.value)}
      disabled={props.disabled}
    />
  )
}

export default BaseInput