import './style.css'
/*é a espécie de um container cc. a única finalidade de guardar todos os inputs criados*/
function Form({children, onSubmit}) {
  return (      
    <form className='form' onSubmit={onSubmit}>
      {children}
    </form>
  )
}

export default Form
