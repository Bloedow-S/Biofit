import { useState } from 'react';
import Input from "../../components/Input";
import Button from '../../components/Button';
import Card from "../../components/Card"; 
import Form from '../../components/Form';
import "./style.css"; 
import Logo from "../../components/Logo";
import { useNavigate, Link } from 'react-router-dom';


function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const usuarioSalvo = JSON.parse(localStorage.getItem('usuario'));

    if (!usuarioSalvo) {
      alert('Nenhum usuário cadastrado. Por favor, crie uma conta.');
      navigate('/register');
      return;
    }

    if (email === usuarioSalvo.email && senha === usuarioSalvo.senha) {
      
      if (!usuarioSalvo.perfilCompleto) {
        alert(`Bem-vindo! Por favor, complete seu perfil para continuar.`);
        navigate('/CriarConta');
      } else {
        navigate('/perfil');
      }

    } else {
      alert('E-mail ou senha incorretos!');
    }
  };

  return (
    <Card>
      <Logo></Logo>
      <h1>Acessar conta</h1>
      <Form onSubmit={handleLogin}>
        <Input 
          placeholder='Email' 
          name='email' 
          type='email' 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <Input 
          placeholder='Senha' 
          name='pass' 
          type='password' 
          value={senha}
          onChange={(e) => setSenha(e.target.value)} 
          required 
        />
        <Button type='submit'>Entrar</Button>
      </Form>
      <p className="toggle-link">
        Não possui conta? <Link to="/register">Cadastre-se</Link>
      </p>
    </Card>
  )
}

export default Login;