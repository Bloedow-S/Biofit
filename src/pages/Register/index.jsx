import './style.css'
import Button from '../../components/Button'
import Input from '../../components/Input'
import Card from '../../components/Card'
import Form from '../../components/Form'

function Register() {
  return ( 
    <Card title="Faça seu cadastro">
      <Form>
        <Input placeholder='Nome' name='nome' type='text' />
        <Input placeholder='Email' name='email' type='email' />
        <Input placeholder='Senha' name='pass' type='password' />
      </Form>
      <Button text='Cadastrar' type='submit' />   {/*precisa de submit só p submeter o form.*/}
    </Card>
  )
}

export default Register
