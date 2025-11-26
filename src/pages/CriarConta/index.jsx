import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; 
import Button from '../../components/Button';
import Input from '../../components/Input';
import Select from '../../components/Select'; 
import Card from '../../components/Card';
import Form from '../../components/Form';
import Logo from '../../components/Logo';

export default function CriarConta() {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [sexo, setSexo] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [objetivo, setObjetivo] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    
    if (!usuario) {
      toast.info("Você precisa estar logado."); 
      navigate('/');
      return;
    }
    if (usuario.perfilCompleto) {
      setIsEditing(true);
      setNome(usuario.nome || '');
      setSexo(usuario.sexo || '');
      setIdade(usuario.idade || '');
      setPeso(usuario.peso || '');
      setAltura(usuario.altura || '');
      setObjetivo(usuario.objetivo || '');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!sexo || !objetivo) {
        toast.warning("Selecione uma opção para Sexo e Objetivo.");
        return;
    }

    const usuarioAtual = JSON.parse(localStorage.getItem('usuario'));
    
    if (isNaN(parseFloat(peso)) || isNaN(parseFloat(altura)) || isNaN(parseInt(idade))) {
      toast.warning("Idade, Peso e Altura precisam ser números válidos.");
      return;
    }

    const usuarioAtualizado = {
      ...usuarioAtual,
      nome, sexo, 
      idade: parseInt(idade),
      peso: parseFloat(peso),
      altura: parseFloat(altura),
      objetivo,
      perfilCompleto: true
    };

    try {
      const response = await fetch(`http://localhost:3000/users/${usuarioAtual.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuarioAtualizado),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        localStorage.setItem('usuario', JSON.stringify(updatedUser));
        
        toast.success(isEditing ? 'Dados atualizados com sucesso!' : 'Perfil completo! Bem-vindo!');
        navigate('/perfil');
      } else {
        toast.error('Erro ao salvar as informações.');
      }
    } catch (error) {
      console.error('Erro:', error);
      toast.error('Erro de conexão ao atualizar perfil.');
    }
  };

  // ... return (JSX) mantém igual ...
  return (
    <Card>
      {/* ... conteúdo do card ... */}
      <Logo />
      <Form onSubmit={handleSubmit}>
        <h1>{isEditing ? 'Editar Perfil' : 'Complete seu Perfil'}</h1>
        {/* ... Inputs e Selects ... */}
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
        
        <Button type='submit'>{isEditing ? 'Salvar Alterações' : 'Salvar e Entrar'}</Button>
      </Form>
    </Card>
  );
}