'use client';

import { useEffect, useState } from 'react';
import { client } from '@/lib/sanity';
import { Scale, Building, FileText, Users, Shield, Gavel } from 'lucide-react';

interface PracticeAreaData {
  _id?: string;
  title: string;
  description: string;
}

const icons = [Scale, Building, FileText, Users, Shield, Gavel];

export default function PracticeAreas() {
  const [practiceAreas, setPracticeAreas] = useState<PracticeAreaData[]>([]);

  useEffect(() => {
    const query = `*[_type == "practiceArea"] | order(_createdAt desc)`;
    
    client.fetch(query).then((data) => {
      if (data) {
        setPracticeAreas(data);
      }
    }).catch(console.error);
  }, []);

  const defaultAreas = [
    { title: 'Derecho Civil', description: 'Litigios, contratos y responsabilidad civil.' },
    { title: 'Derecho Corporativo', description: 'Asesoría empresarial, fusiones y adquisiciones.' },
    { title: 'Derecho Penal', description: 'Defensa criminal y representación legal.' },
    { title: 'Derecho Laboral', description: 'Conflictos laborales y negociación colectiva.' },
    { title: 'Propiedad Intelectual', description: 'Patentes, marcas y derechos de autor.' },
    { title: 'Derecho Inmobiliario', description: 'Transacciones y litigios inmobiliarios.' },
  ];

  const areas = practiceAreas.length > 0 ? practiceAreas : defaultAreas;

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-[#0A192F] mb-4">
            Áreas de Práctica
          </h2>
          <div className="w-24 h-1 bg-[#8B7355] mx-auto mb-6"></div>
          <p className="font-sans text-lg text-gray-600 max-w-2xl mx-auto">
            Especializados en múltiples disciplinas legales para servirle mejor
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {areas.map((area, index) => {
            const IconComponent = icons[index % icons.length];
            const key = '_id' in area && area._id ? area._id : String(index);
            return (
              <div
                key={key}
                className="bg-white p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-[#8B7355]"
              >
                <div className="w-16 h-16 bg-[#0A192F] rounded-full flex items-center justify-center mb-6 mx-auto">
                  <IconComponent className="w-8 h-8 text-[#8B7355]" />
                </div>
                <h3 className="font-serif text-2xl text-[#0A192F] text-center mb-4">
                  {area.title}
                </h3>
                <p className="font-sans text-gray-600 text-center leading-relaxed">
                  {area.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
