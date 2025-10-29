// Importar os novos componentes
import Input from "../../components/Input";
import Button from '../../components/Button'
import Card from "../../components/Card"; 
import Form from '../../components/Form'
import "./style.css"; 

function Login() {
  return (
    <Card title='Acessar conta'>
      <Form>
        <Input placeholder='Email' name='email' type='email' />
        <Input placeholder='Senha' name='pass' type='password' />
        <Button text='Entrar' type='submit'></Button>
      </Form>
    </Card>
  )
}

export default Login;