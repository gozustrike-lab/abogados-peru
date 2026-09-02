'use client';

import { useState } from 'react';

export default function Calculator() {
  const [caseType, setCaseType] = useState('civil');
  const [amount, setAmount] = useState<number>(10000);
  const [complexity, setComplexity] = useState('medium');
  const [result, setResult] = useState<number | null>(null);

  const calculateFees = () => {
    let baseRate = 0;
    
    switch (caseType) {
      case 'civil':
        baseRate = 0.15;
        break;
      case 'corporativo':
        baseRate = 0.20;
        break;
      case 'penal':
        baseRate = 0.25;
        break;
      case 'laboral':
        baseRate = 0.18;
        break;
      case 'inmobiliario':
        baseRate = 0.12;
        break;
      default:
        baseRate = 0.15;
    }

    let complexityMultiplier = 1;
    switch (complexity) {
      case 'low':
        complexityMultiplier = 0.8;
        break;
      case 'medium':
        complexityMultiplier = 1;
        break;
      case 'high':
        complexityMultiplier = 1.5;
        break;
      default:
        complexityMultiplier = 1;
    }

    const fee = amount * baseRate * complexityMultiplier;
    setResult(Math.round(fee));
  };

  return (
    <section className="py-20 bg-[#0A192F]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">
            Calculadora de Honorarios
          </h2>
          <div className="w-24 h-1 bg-[#8B7355] mx-auto mb-6"></div>
          <p className="font-sans text-lg text-gray-300 max-w-2xl mx-auto">
            Estime el costo de nuestros servicios legales de manera transparente
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className="block text-[#0A192F] font-semibold mb-2">
                Tipo de Caso
              </label>
              <select
                value={caseType}
                onChange={(e) => setCaseType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#8B7355]"
              >
                <option value="civil">Derecho Civil</option>
                <option value="corporativo">Derecho Corporativo</option>
                <option value="penal">Derecho Penal</option>
                <option value="laboral">Derecho Laboral</option>
                <option value="inmobiliario">Derecho Inmobiliario</option>
              </select>
            </div>

            <div>
              <label className="block text-[#0A192F] font-semibold mb-2">
                Monto del Caso (USD)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#8B7355]"
                min="1000"
                step="1000"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-[#0A192F] font-semibold mb-2">
                Complejidad
              </label>
              <div className="flex gap-4">
                {['low', 'medium', 'high'].map((level) => (
                  <button
                    key={level}
                    onClick={() => setComplexity(level)}
                    className={`flex-1 py-3 px-4 rounded transition-colors ${
                      complexity === level
                        ? 'bg-[#8B7355] text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {level === 'low' ? 'Baja' : level === 'medium' ? 'Media' : 'Alta'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={calculateFees}
            className="w-full bg-[#0A192F] hover:bg-[#1a2f4f] text-white font-semibold py-4 rounded transition-colors duration-300 uppercase tracking-wider"
          >
            Calcular Honorarios
          </button>

          {result !== null && (
            <div className="mt-8 p-6 bg-gray-50 rounded-lg text-center">
              <p className="text-gray-600 mb-2">Honorarios Estimados:</p>
              <p className="text-4xl font-serif text-[#8B7355] font-bold">
                ${result.toLocaleString()} USD
              </p>
              <p className="text-sm text-gray-500 mt-2">
                * Esta es una estimación. Los honorarios finales pueden variar según las circunstancias específicas del caso.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
