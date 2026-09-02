'use client';

import { useEffect, useState } from 'react';
import { client } from '@/lib/sanity';
import { Send, Clock, DollarSign } from 'lucide-react';

interface Tender {
  _id: string;
  title: string;
  description: string;
  currentBid: number;
  deadline: string;
  status: 'active' | 'closed' | 'pending';
}

export default function Tenders() {
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [selectedTender, setSelectedTender] = useState<string | null>(null);
  const [bidAmount, setBidAmount] = useState<number>(0);

  useEffect(() => {
    const query = `*[_type == "tender"] | order(_createdAt desc)`;
    
    client.fetch(query).then((data) => {
      if (data) {
        setTenders(data);
      }
    }).catch(console.error);

    // Poll for real-time updates every 10 seconds
    const interval = setInterval(() => {
      client.fetch(query).then((data) => {
        if (data) {
          setTenders(data);
        }
      }).catch(console.error);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleBid = async (tenderId: string) => {
    // In a real implementation, this would update Sanity via an API route
    alert(`Oferta de $${bidAmount.toLocaleString()} enviada para revisión.`);
    setBidAmount(0);
    setSelectedTender(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'closed':
        return 'bg-red-500';
      case 'pending':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Activa';
      case 'closed':
        return 'Cerrada';
      case 'pending':
        return 'Pendiente';
      default:
        return status;
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-[#0A192F] mb-4">
            Licitaciones en Tiempo Real
          </h2>
          <div className="w-24 h-1 bg-[#8B7355] mx-auto mb-6"></div>
          <p className="font-sans text-lg text-gray-600 max-w-2xl mx-auto">
            Participe en nuestras licitaciones legales activas con actualizaciones en vivo
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tenders List */}
          <div className="space-y-6">
            {tenders.length === 0 ? (
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <p className="text-gray-600">No hay licitaciones activas en este momento.</p>
              </div>
            ) : (
              tenders.map((tender) => (
                <div
                  key={tender._id}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedTender(tender._id)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-serif text-xl text-[#0A192F]">{tender.title}</h3>
                    <span className={`${getStatusColor(tender.status)} text-white px-3 py-1 rounded-full text-sm`}>
                      {getStatusText(tender.status)}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{tender.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-[#8B7355]" />
                      <span className="font-semibold text-[#0A192F]">
                        ${tender.currentBid?.toLocaleString() || 0} USD
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-[#8B7355]" />
                      <span className="text-gray-600">
                        {new Date(tender.deadline).toLocaleDateString('es-ES')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Bid Panel */}
          <div className="bg-white p-8 rounded-lg shadow-md sticky top-8 h-fit">
            <h3 className="font-serif text-2xl text-[#0A192F] mb-6">
              Panel de Ofertas
            </h3>
            
            {selectedTender ? (
              <div>
                <p className="text-gray-600 mb-4">
                  Seleccione una licitación para realizar su oferta
                </p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[#0A192F] font-semibold mb-2">
                      Monto de Oferta (USD)
                    </label>
                    <input
                      type="number"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#8B7355]"
                      min="1000"
                      step="1000"
                    />
                  </div>
                  <button
                    onClick={() => handleBid(selectedTender)}
                    className="w-full bg-[#8B7355] hover:bg-[#A0845D] text-white font-semibold py-3 rounded transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Enviar Oferta
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400">Seleccione una licitación de la lista para comenzar</p>
              </div>
            )}

            {/* Live Chat Preview */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h4 className="font-semibold text-[#0A192F] mb-4">Chat Global</h4>
              <div className="bg-gray-50 p-4 rounded h-48 overflow-y-auto mb-4">
                <p className="text-gray-500 text-sm text-center">
                  Las actualizaciones del chat aparecerán aquí en tiempo real
                </p>
              </div>
              <p className="text-xs text-gray-500">
                * El chat global se actualiza automáticamente cuando hay nuevas ofertas
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
