// Importar os novos componentes
import { useState } from 'react';
import Input from "../../components/Input";
import Button from '../../components/Button'
import Card from "../../components/Card"; 
import Form from '../../components/Form'
import "./style.css"; 
import Logo from "../../components/Logo";

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Recupera o usuário salvo
    const usuarioSalvo = JSON.parse(localStorage.getItem('usuario'));

    if (!usuarioSalvo) {
      alert('Nenhum usuário cadastrado!');
      return;
    }

    // Verifica se o email e senha batem
    if (email === usuarioSalvo.email && senha === usuarioSalvo.senha) {
      alert(`Bem-vindo, ${usuarioSalvo.nome}!`);
      // Aqui tu pode redirecionar pra /perfil ou /dashboard
      window.location.href = '/perfil';
    } else {
      alert('E-mail ou senha incorretos!');
    }
  };

  return (
    <Card>
      <Logo></Logo>
      <h1>Acessar conta</h1>
      <Form onSubmit={handleLogin}>
        <Input placeholder='Email' name='email' type='email' value={email}
          onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder='Senha' name='pass' type='password' value={senha}
          onChange={(e) => setSenha(e.target.value)} />
        <Button children='Entrar' type='submit'></Button>
      </Form>
    </Card>
  )
}

export default Login;