'use client';

import { useEffect, useState } from 'react';
import { client } from '@/lib/sanity';
import { Send, User } from 'lucide-react';

interface ChatMessage {
  _id: string;
  author: string;
  message: string;
  timestamp: string;
}

export default function GlobalChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [authorName, setAuthorName] = useState('');

  useEffect(() => {
    const query = `*[_type == "chatMessage"] | order(timestamp desc)[0...50]`;
    
    const fetchMessages = () => {
      client.fetch(query).then((data) => {
        if (data) {
          setMessages(data.reverse());
        }
      }).catch(console.error);
    };

    fetchMessages();

    // Poll for real-time updates every 5 seconds
    const interval = setInterval(fetchMessages, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !authorName.trim()) return;

    // In a real implementation, this would POST to an API route that creates the document in Sanity
    alert('Mensaje enviado para moderación. En producción, esto se guardaría en Sanity.');
    setNewMessage('');
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <section className="py-20 bg-[#0A192F]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">
            Chat Global
          </h2>
          <div className="w-24 h-1 bg-[#8B7355] mx-auto mb-6"></div>
          <p className="font-sans text-lg text-gray-300 max-w-2xl mx-auto">
            Conéctese con otros clientes y nuestro equipo en tiempo real
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
            {/* Chat Header */}
            <div className="bg-[#0A192F] text-white p-4">
              <h3 className="font-serif text-xl">Sala de Chat - Justicia & Asociados</h3>
              <p className="text-sm text-gray-300">Conectado • Actualización en tiempo real</p>
            </div>

            {/* Messages Area */}
            <div className="h-96 overflow-y-auto p-4 bg-gray-50 space-y-4">
              {messages.length === 0 ? (
                <div className="text-center text-gray-400 py-12">
                  <p>No hay mensajes aún. ¡Sea el primero en saludar!</p>
                </div>
              ) : (
                messages.map((msg) => (
                  <div key={msg._id} className="flex gap-3">
                    <div className="w-10 h-10 bg-[#8B7355] rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2">
                        <span className="font-semibold text-[#0A192F]">{msg.author}</span>
                        <span className="text-xs text-gray-500">{formatTime(msg.timestamp)}</span>
                      </div>
                      <p className="text-gray-700 mt-1">{msg.message}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="mb-3">
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Su nombre"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#8B7355]"
                />
              </div>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Escriba su mensaje..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#8B7355]"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-[#8B7355] hover:bg-[#A0845D] text-white px-6 py-3 rounded transition-colors flex items-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Enviar
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                * Los mensajes son moderados antes de aparecer públicamente
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
