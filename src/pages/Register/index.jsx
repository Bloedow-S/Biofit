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
  const [confirmarSenha, setConfirmarSenha] = useState(''); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }
    
    // 1. Limpa o email e senha antes de usar
    const cleanedEmail = email.trim();
    const cleanedSenha = senha.trim();

    try {
      // 2. Verifica duplicidade
      const checkUser = await fetch(`http://localhost:3000/users?email=${encodeURIComponent(cleanedEmail)}`);
      const existingUsers = await checkUser.json();

      if (existingUsers.length > 0) {
        alert('Este e-mail já está cadastrado!');
        return;
      }

      // 3. Cria e salva o novo usuário
      const novoUsuario = { 
        email: cleanedEmail, 
        pass: cleanedSenha, 
        perfilCompleto: false 
      };

      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoUsuario),
      });

      if (response.ok) {
        // 4. Pega os dados do usuário recém-criado (incluindo o ID gerado pelo json-server)
        const savedUser = await response.json(); 
        
        // 5. Salva o usuário no localStorage para a próxima tela
        localStorage.setItem('usuario', JSON.stringify(savedUser));
        
        alert('Cadastro realizado com sucesso! Prossiga para completar seu perfil.');
        
        // 6. Redireciona para completar perfil
        navigate('/CriarConta'); 
      } else {
        alert('Erro ao salvar no banco de dados.');
      }

    } catch (error) {
      console.error('Erro:', error);
      alert('Erro de conexão. Verifique se o comando "npm run server" está rodando no terminal.');
    }
  };

  return ( 
    <Card>
      <Logo />
      <Form onSubmit={handleSubmit}>
        <h1>Criar conta</h1>
        
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
        <Input 
          placeholder='Confirme sua Senha' 
          name='passConfirm' 
          type='password' 
          value={confirmarSenha} 
          onChange={(e) => setConfirmarSenha(e.target.value)} 
          required 
        />
        
        <Button type='submit' text="Cadastrar" />

      </Form>
      <p className="toggle-link">
        Já possui conta? <Link to="/">Faça login</Link>
      </p>
    </Card>
  )
}

export default Register;