
export default function Button(props){
  const className = `${props.className} ${props.type}`

  return (
    <button className={className} onClick={props.onClick} disabled={props.disabled}>
      {props.children}
    </button>
  )
}