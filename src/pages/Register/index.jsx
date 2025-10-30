import { useState } from 'react'
import './style.css'
import Button from '../../components/Button'
import Input from '../../components/Input'
import Card from '../../components/Card'
import Form from '../../components/Form'
import Logo from '../../components/Logo'

function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Cria um objeto com os dados
    const novoUsuario = { nome, email, senha };

    // Salva no localStorage
    localStorage.setItem('usuario', JSON.stringify(novoUsuario));

    alert('Cadastro realizado com sucesso!');
  };

  return ( 
    <Card>
      <Logo></Logo>
      <Form onSubmit={handleSubmit}>
        <h1>Faça seu cadastro</h1>
        <Input placeholder='Nome' name='nome' type='text' value={nome} onChange={(e) => setNome(e.target.value)} />
        <Input placeholder='Email' name='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder='Senha' name='pass' type='password' value={senha} onChange={(e) => setSenha(e.target.value)} />
        <Button children='Cadastrar' type='submit' />   {/*precisa de submit só p submeter o form.*/}
      </Form>
    </Card>
  )
}

export default Register
