import './style.css'
/*é a espécie de um container cc. a única finalidade de guardar todos os inputs criados*/
function Form({children}) {
  return (      
    <form className='form'>
      {children}
    </form>
  )
}

export default Form
