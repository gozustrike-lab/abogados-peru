'use client';

import { useState, useEffect } from 'react';
import { Scale, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#0A192F] shadow-lg py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 text-white">
            <Scale className="w-8 h-8 text-[#8B7355]" />
            <span className="font-serif text-2xl font-bold">Justicia & Asociados</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-white hover:text-[#8B7355] transition-colors font-medium">
              Inicio
            </a>
            <a href="#areas" className="text-white hover:text-[#8B7355] transition-colors font-medium">
              Áreas de Práctica
            </a>
            <a href="#licitaciones" className="text-white hover:text-[#8B7355] transition-colors font-medium">
              Licitaciones
            </a>
            <a href="#calculadora" className="text-white hover:text-[#8B7355] transition-colors font-medium">
              Calculadora
            </a>
            <a href="#chat" className="text-white hover:text-[#8B7355] transition-colors font-medium">
              Chat
            </a>
            <a
              href="#contacto"
              className="bg-[#8B7355] hover:bg-[#A0845D] text-white px-6 py-2 rounded-sm transition-colors font-semibold uppercase tracking-wider text-sm"
            >
              Consulta Gratis
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-700 pt-4">
            <div className="flex flex-col space-y-4">
              <a
                href="#"
                className="text-white hover:text-[#8B7355] transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Inicio
              </a>
              <a
                href="#areas"
                className="text-white hover:text-[#8B7355] transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Áreas de Práctica
              </a>
              <a
                href="#licitaciones"
                className="text-white hover:text-[#8B7355] transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Licitaciones
              </a>
              <a
                href="#calculadora"
                className="text-white hover:text-[#8B7355] transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Calculadora
              </a>
              <a
                href="#chat"
                className="text-white hover:text-[#8B7355] transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Chat
              </a>
              <a
                href="#contacto"
                className="bg-[#8B7355] hover:bg-[#A0845D] text-white px-6 py-2 rounded-sm transition-colors font-semibold uppercase tracking-wider text-sm text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Consulta Gratis
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
