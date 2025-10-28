import './style.css'

function Login() {    //componente React sempre função com letra M. como uma classe

  //acima de return vai o JS bruto
  return (      //vai ter um return que sempre vai ser html; p colocar js se usa {} 
    <div className='container'>
      <form className='container_form'>
        <h1>
          Faça seu cadastro
        </h1>
        <input placeholder='Nome' name='nome' type='text' />
        <input placeholder='Email' name='email' type='email' />
        <input placeholder='Senha' name='pass' type='password' />
        <button type='button'>Cadastrar</button>
      </form>
    </div>
  )
}

export default Login
