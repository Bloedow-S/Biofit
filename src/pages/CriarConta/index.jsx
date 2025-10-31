import { useState, useEffect } from 'react';
import Button from '../../components/Button';
// O 'Input' ainda é usado para os outros campos
import Input from '../../components/Input'; 
import Card from '../../components/Card';
import Form from '../../components/Form';
import Logo from '../../components/Logo';
import { useNavigate } from 'react-router-dom';

export default function CriarConta() {
  const navigate = useNavigate();

  // Estados (sem mudança)
  const [nome, setNome] = useState('');
  const [sexo, setSexo] = useState(''); // Estado inicial vazio
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [objetivo, setObjetivo] = useState(''); // Estado inicial vazio
  
  // useEffect (sem mudança)
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

  // handleSubmit (sem mudança)
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const usuarioAtual = JSON.parse(localStorage.getItem('usuario'));

    if (!usuarioAtual) {
         alert("Erro: usuário não encontrado.");
         navigate('/');
         return;
    }

    // A validação de 'required' no select garante que os estados 'sexo' e 'objetivo' não estarão vazios.
    if (isNaN(parseFloat(peso)) || isNaN(parseFloat(altura)) || isNaN(parseInt(idade))) {
      alert("Idade, Peso e Altura precisam ser números.");
      return;
    }

    const usuarioAtualizado = {
      ...usuarioAtual,
      nome,
      sexo, // O estado 'sexo' vem do <select>
      idade: parseInt(idade),
      peso: parseFloat(peso),
      altura: parseFloat(altura),
      objetivo, // O estado 'objetivo' vem do <select>
      perfilCompleto: true
    };

    localStorage.setItem('usuario', JSON.stringify(usuarioAtualizado));

    alert('Perfil completo! Bem-vindo ao BioFit!');
    navigate('/perfil');
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
        
        {/* === CAMPO DE SEXO ATUALIZADO === */}
        <select
          name="sexo"
          value={sexo} // Controlado pelo estado
          onChange={(e) => setSexo(e.target.value)} // Atualiza o estado
          required
          className="custom-input" // Usa a mesma classe do Input!
        >
          {/* A primeira opção é desabilitada e serve como placeholder */}
          <option value="" disabled hidden>Selecione seu sexo</option>
          <option value="Feminino">Feminino</option>
          <option value="Masculino">Masculino</option>
          <option value="Outro">Outro</option>
        </select>
        
        <Input placeholder='Idade (ex: 25)' name='idade' type='number' value={idade} onChange={(e) => setIdade(e.target.value)} required />
        <Input placeholder='Peso (em kg, ex: 70)' name='peso' type='number' step="0.1" value={peso} onChange={(e) => setPeso(e.target.value)} required />
        <Input placeholder='Altura (em cm, ex: 175)' name='altura' type='number' value={altura} onChange={(e) => setAltura(e.target.value)} required />

        {/* === CAMPO DE OBJETIVO ATUALIZADO === */}
        <select
          name="objetivo"
          value={objetivo} // Controlado pelo estado
          onChange={(e) => setObjetivo(e.target.value)} // Atualiza o estado
          required
          className="custom-input" // Usa a mesma classe do Input!
        >
          <option value="" disabled hidden>Selecione seu objetivo</option>
          <option value="Perder Peso">Perder Peso</option>
          <option value="Manter Peso">Manter Peso</option>
          <option value="Ganhar Massa Muscular">Ganhar Massa Muscular</option>
        </select>
        
        <Button type='submit'>Salvar e Entrar</Button>
      </Form>
    </Card>
  );
}