import './style.css'

function Input({placeholder, type = 'text', name}) {

  return (
    <input className='input' placeholder={placeholder} name={name} type={type} />
  )
}

export default Input
