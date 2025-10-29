import './style.css'

function Button({text, type = 'buton'}) {    //componente React sempre função com letra M. como uma classe

  //acima de return vai o JS bruto
  return (      //vai ter um return que sempre vai ser html; p colocar js se usa {} 
    <button className='button' type={type}>{text}</button>
  )
}

export default Button
