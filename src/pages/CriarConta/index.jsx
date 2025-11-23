import { useState, useEffect } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Select from '../../components/Select'; 
import Card from '../../components/Card';
import Form from '../../components/Form';
import Logo from '../../components/Logo';
import { useNavigate } from 'react-router-dom';

export default function CriarConta() {
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [sexo, setSexo] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [objetivo, setObjetivo] = useState('');

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (!usuario) {
      alert("Você precisa estar logado para completar o perfil.");
      navigate('/');
    }
    if (usuario && usuario.perfilCompleto) {
      navigate('/perfil');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!sexo || !objetivo) {
        alert("Por favor, selecione uma opção para Sexo e Objetivo.");
        return;
    }

    const usuarioAtual = JSON.parse(localStorage.getItem('usuario'));
    if (!usuarioAtual) {
         alert("Erro: usuário não encontrado.");
         navigate('/');
         return;
    }
    if (isNaN(parseFloat(peso)) || isNaN(parseFloat(altura)) || isNaN(parseInt(idade))) {
      alert("Idade, Peso e Altura precisam ser números.");
      return;
    }

    const usuarioAtualizado = {
      ...usuarioAtual,
      nome,
      sexo, 
      idade: parseInt(idade),
      peso: parseFloat(peso),
      altura: parseFloat(altura),
      objetivo,
      perfilCompleto: true
    };

    try {
      const response = await fetch(`http://localhost:3000/users/${usuarioAtual.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuarioAtualizado),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        localStorage.setItem('usuario', JSON.stringify(updatedUser));
        alert('Perfil completo! Bem-vindo ao BioFit!');
        navigate('/perfil');
      } else {
        alert('Erro ao salvar as informações do perfil.');
      }
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      alert('Ocorreu um erro ao atualizar seu perfil. Verifique sua conexão.');
    }
  };

  return (
    <Card>
      <Logo />
      <Form onSubmit={handleSubmit}>
        <h1>Complete seu Perfil</h1>
        <p style={{color: 'white', marginTop: '-10px', marginBottom: '10px', textAlign: 'center'}}>
          Falta só mais alguns dados para começarmos!
        </p>

        <Input placeholder='Seu Nome' name='nome' type='text' value={nome} onChange={(e) => setNome(e.target.value)} required />
        
        <Select name="sexo" value={sexo} onChange={(e) => setSexo(e.target.value)} required>
          <option value="" disabled>Selecione seu sexo...</option>
          <option value="Masculino">Masculino</option>
          <option value="Feminino">Feminino</option>
          <option value="Outro">Outro</option>
        </Select>

        <Input placeholder='Idade (ex: 25)' name='idade' type='number' value={idade} onChange={(e) => setIdade(e.target.value)} required />
        <Input placeholder='Peso (em kg, ex: 70)' name='peso' type='number' step="0.1" value={peso} onChange={(e) => setPeso(e.target.value)} required />
        <Input placeholder='Altura (em cm, ex: 175)' name='altura' type='number' value={altura} onChange={(e) => setAltura(e.target.value)} required />

        <Select name="objetivo" value={objetivo} onChange={(e) => setObjetivo(e.target.value)} required>
          <option value="" disabled>Selecione seu objetivo...</option>
          <option value="Perder Peso">Perder Peso (Déficit)</option>
          <option value="Manter Peso">Manter Peso (Manutenção)</option>
          <option value="Ganhar Massa">Ganhar Massa (Superávit)</option>
        </Select>
        
        <Button type='submit'>Salvar e Entrar</Button>
      </Form>
    </Card>
  );
}