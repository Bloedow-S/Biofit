import './style.css'

/* é a espécie de um container cc. a única finalidade de guardar todos os inputs criados */
function Form({ children, ...rest }) {
  return (
    // o {...rest} ta  espalhando todas as propriedades extras  dentro da tag form
    <form className='form' {...rest}>
      {children}
    </form>
  )
}

export default Form
