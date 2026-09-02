'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { client } from '@/lib/sanity';

interface HeroData {
  _id: string;
  title: string;
  subtitle: string;
  backgroundImage?: {
    asset?: {
      _ref: string;
    };
  };
  ctaText: string;
  ctaLink: string;
}

const heroImages = [
  'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&q=80',
  'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1920&q=80',
  'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1920&q=80',
];

export default function Hero() {
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const query = `*[_type == "hero"][0]`;
    
    client.fetch(query).then((data) => {
      if (data) {
        setHeroData(data);
      }
    }).catch(console.error);

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Images with Transition */}
      {heroImages.map((img, index) => (
        <div
          key={img}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-60' : 'opacity-0'
          }`}
        >
          <Image
            src={img}
            alt="Law firm background"
            fill
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 to-brown-800/70" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight">
          {heroData?.title || 'Justicia & Excelencia'}
        </h1>
        <p className="font-sans text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl font-light">
          {heroData?.subtitle || 'Más de 25 años defendiendo sus derechos con integridad y compromiso profesional.'}
        </p>
        <a
          href={heroData?.ctaLink || '#contacto'}
          className="bg-[#8B7355] hover:bg-[#A0845D] text-white font-semibold py-4 px-10 rounded-sm transition-all duration-300 transform hover:scale-105 uppercase tracking-wider"
        >
          {heroData?.ctaText || 'Consulta Gratuita'}
        </a>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
