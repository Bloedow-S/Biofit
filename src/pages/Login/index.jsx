import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './style.css'
import Button from '../../components/Button'
import Input from '../../components/Input'
import Card from '../../components/Card'
import Form from '../../components/Form'
import Logo from '../../components/Logo' // Importação do Logo

function Login() {
  const navigate = useNavigate()
  
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()

    // 1. Limpa os valores de email e senha para remover espaços acidentais
    const cleanedEmail = email.trim();
    const cleanedSenha = senha.trim();

    if (!cleanedEmail || !cleanedSenha) {
      alert('Preencha todos os campos!')
      return
    }

    try {
      // 2. Busca no json-server o usuário que corresponde EXATAMENTE ao email e senha (pass)
      const url = `http://localhost:3000/users?email=${encodeURIComponent(cleanedEmail)}&pass=${encodeURIComponent(cleanedSenha)}`;
      
      const response = await fetch(url)
      const users = await response.json()

      if (users.length > 0) {
        const usuarioLogado = users[0] 
        
        // 3. Sucesso: Salva o ID do usuário (crucial para o resto da aplicação)
        localStorage.setItem('user_id', usuarioLogado.id);
        localStorage.setItem('usuario', JSON.stringify(usuarioLogado)) // Salva o objeto completo

        alert(`Bem-vindo de volta, ${usuarioLogado.email}!`)
        
        // 4. Redireciona para o Perfil (página privada)
        navigate('/perfil') 
      } else {
        alert('E-mail ou senha incorretos.')
      }

    } catch (error) {
      console.error('Erro de conexão:', error)
      alert('Erro ao conectar com o servidor. Verifique se o json-server está rodando.')
    }
  }

  return (
    <Card> {/* Removemos o title do Card, já que o Login geralmente tem o Logo */}
      <Logo />
      <Form onSubmit={handleLogin}>
        <h1>Acessar conta</h1> {/* Adicionamos o H1 de volta aqui */}
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
        
        <Button text='Entrar' type='submit' />
      </Form>
      <p className="toggle-link">
        Não tem conta? <Link to="/register">Crie uma aqui</Link>
      </p>
    </Card>
  )
}

export default Login;