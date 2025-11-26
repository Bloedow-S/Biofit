import { useEffect, useState } from 'react';
import './style.css'; // Crie este arquivo se quiser estilizar a tabela

export default function History() {
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem('user_id');

    const fetchHistory = async () => {
      try {
        // Busca no json-server filtrando pelo userId e ordenando por data (mais recente primeiro)
        // Nota: _sort e _order são recursos do json-server
        const response = await fetch(`https://6927085926e7e41498fca64b.mockapi.io/BioFit/:endpoint/history?userId=${userId}&_sort=timestamp&_order=desc`);
        const data = await response.json();
        setHistorico(data);
      } catch (error) {
        console.error("Erro ao buscar histórico:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchHistory();
    }
  }, []);

  if (loading) return <div>Carregando histórico...</div>;

  return (
    <div style={{ width: '100%' }}>
      <h1>Histórico de Evolução</h1>
      
      {historico.length === 0 ? (
        <p>Nenhum registro encontrado. Visite a página de Cálculos para gerar seu primeiro registro.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {historico.map((item) => (
            <div key={item.id} style={{ 
              backgroundColor: 'white', 
              padding: '20px', 
              borderRadius: '10px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h3 style={{ margin: 0, color: '#5d7783' }}>{item.date}</h3>
                <p style={{ margin: '5px 0', fontSize: '0.9rem', color: '#888' }}>Objetivo: {item.objetivo}</p>
              </div>
              
              <div style={{ textAlign: 'right' }}>
                <p><strong>Peso:</strong> {item.peso} kg</p>
                <p><strong>Meta Calórica:</strong> <span style={{ color: '#63b995', fontWeight: 'bold' }}>{item.resultadoCalorias} kcal</span></p>
                <p><strong>IMC:</strong> {item.resultadoImc}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}