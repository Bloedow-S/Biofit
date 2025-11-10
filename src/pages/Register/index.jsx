import { useState } from 'react'
import './style.css'
import Button from '../../components/Button'
import Input from '../../components/Input'
import Card from '../../components/Card'
import Form from '../../components/Form'
import Logo from '../../components/Logo'
import { useNavigate, Link } from 'react-router-dom'

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState(''); // Novo estado

  const handleSubmit = (e) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    const usuarioExistente = localStorage.getItem('usuario');
    if (usuarioExistente && JSON.parse(usuarioExistente).email === email) {
      alert('Este e-mail já está cadastrado!');
      return;
    }

    const novoUsuario = { 
      email, 
      senha, 
      perfilCompleto: false 
    };

    localStorage.setItem('usuario', JSON.stringify(novoUsuario));

    alert('Cadastro realizado com sucesso! Você será redirecionado para completar seu perfil');
    navigate('/CriarConta'); 
  };

  return ( 
    <Card>
      <Logo></Logo>
      <Form onSubmit={handleSubmit}>
        <h1>Criar conta</h1>
        
        <Input placeholder='Email' name='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input placeholder='Senha' name='pass' type='password' value={senha} onChange={(e) => setSenha(e.target.value)} required />
        <Input placeholder='Confirme sua Senha' name='passConfirm' type='password' value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} required />
        
        <Button type='submit'>Cadastrar</Button> {/* */}

      </Form>
      <p className="toggle-link">
        Já possui conta? <Link to="/">Faça login</Link>
      </p>
    </Card>
  )
}

export default Register
