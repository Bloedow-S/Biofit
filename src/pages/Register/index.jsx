import './style.css'
import Button from '../../components/Button' //importa corretamente components
import Input from '../../components/Input'
import Card from '../../components/Card'
import Form from '../../components/Form'

function Register() {    //componente React sempre função com letra M. como uma classe

  //acima de return vai o JS bruto
  return (      //vai ter um return que sempre vai ser html; p colocar js se usa {} 
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
