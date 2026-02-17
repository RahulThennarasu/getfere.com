import scatteredLogos from 'figma:asset/550db7821825e5979d354329e73d1a7c5c7c654e.png';
import appleLogo from 'figma:asset/70b20c352fb2d88c9e01a95fc168f8068a048f75.png';
import { useState } from 'react';
import { InstallModal } from './InstallModal';

export function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 
          className="text-black/80"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '72px',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            lineHeight: '1.1',
          }}
        >
          see everything,
          <br />
          not just your code
        </h1>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="mt-8 px-5 py-2.5 bg-black text-white rounded-lg flex items-center gap-3 mx-auto hover:bg-black/90 transition-colors"
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '15px',
            fontWeight: 500,
          }}
        >
          <img src={appleLogo} alt="Apple" className="h-4" />
          Get for Mac
        </button>
        
        <div className="mt-24 relative">
          <p 
            className="text-black/40 mb-6"
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '18px',
              fontWeight: 400,
            }}
          >
            your stack, scattered across a dozen tools
          </p>
          
          <div className="relative h-80 max-w-2xl mx-auto">
            {/* Scattered tech logos composite image */}
            <img src={scatteredLogos} alt="" className="w-full max-w-xl mx-auto" />
          </div>
        </div>
      </div>

      <InstallModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}