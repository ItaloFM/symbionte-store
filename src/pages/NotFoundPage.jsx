import { useNavigate } from 'react-router-dom';
import MoltenMetal from '../components/MoltenMetal/MoltenMetal';
import './NotFoundPage.css';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="nf-root">
      {/* Fundo Molten Metal */}
      <div className="nf-bg">
        <MoltenMetal
          color1="#0a0a0a"
          color2="#555555"
          color3="#cccccc"
          speed={0.3}
          scale={4}
          detail={4}
          glow={1.8}
          coreSize={0.12}
          swirl={1.2}
          fold={-0.18}
          blackPoint={0.04}
          brightness={1.4}
          colorMode="molten"
          grain={true}
          grainIntensity={0.04}
          mouseInteraction={true}
          mouseStrength={0.25}
          opacity={1}
        />
      </div>

      {/* Conteúdo */}
      <div className="nf-content">
        <p className="nf-eyebrow">Erro</p>
        <h1 className="nf-code">404</h1>
        <p className="nf-msg">Essa página se fundiu com o vazio.</p>
        <div className="nf-actions">
          <button className="nf-btn nf-btn--primary" onClick={() => navigate('/')}>
            Voltar ao início
          </button>
          <button className="nf-btn nf-btn--secondary" onClick={() => navigate('/colecao')}>
            Ver Coleção
          </button>
        </div>
      </div>
    </div>
  );
}
