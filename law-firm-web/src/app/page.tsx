import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import PracticeAreas from '@/components/PracticeAreas';
import Calculator from '@/components/Calculator';
import Tenders from '@/components/Tenders';
import GlobalChat from '@/components/GlobalChat';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <PracticeAreas />
      <Tenders />
      <Calculator />
      <GlobalChat />
      <Footer />
    </main>
  );
}
