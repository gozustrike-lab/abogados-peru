import Link from 'next/link';
import { Scale, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0A192F] text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Scale className="w-8 h-8 text-[#8B7355]" />
              <h3 className="font-serif text-2xl">Justicia & Asociados</h3>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Más de 25 años de experiencia brindando servicios legales excepcionales con integridad y compromiso.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg mb-4 text-[#8B7355]">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Inicio</Link></li>
              <li><Link href="#areas" className="text-gray-400 hover:text-white transition-colors">Áreas de Práctica</Link></li>
              <li><Link href="#licitaciones" className="text-gray-400 hover:text-white transition-colors">Licitaciones</Link></li>
              <li><Link href="#calculadora" className="text-gray-400 hover:text-white transition-colors">Calculadora</Link></li>
              <li><Link href="#contacto" className="text-gray-400 hover:text-white transition-colors">Contacto</Link></li>
            </ul>
          </div>

          {/* Practice Areas */}
          <div>
            <h4 className="font-serif text-lg mb-4 text-[#8B7355]">Áreas de Práctica</h4>
            <ul className="space-y-2">
              <li><span className="text-gray-400">Derecho Civil</span></li>
              <li><span className="text-gray-400">Derecho Corporativo</span></li>
              <li><span className="text-gray-400">Derecho Penal</span></li>
              <li><span className="text-gray-400">Derecho Laboral</span></li>
              <li><span className="text-gray-400">Propiedad Intelectual</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg mb-4 text-[#8B7355]">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#8B7355] flex-shrink-0 mt-1" />
                <span className="text-gray-400">Av. Principal 123, Oficina 456<br />Ciudad, País 12345</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#8B7355] flex-shrink-0" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#8B7355] flex-shrink-0" />
                <span className="text-gray-400">info@justiciaasociados.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Justicia & Asociados. Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-gray-500 hover:text-white text-sm transition-colors">
                Política de Privacidad
              </Link>
              <Link href="#" className="text-gray-500 hover:text-white text-sm transition-colors">
                Términos de Servicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
