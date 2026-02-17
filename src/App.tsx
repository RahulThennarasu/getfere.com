import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { Navigation } from './components/Navigation';
import { AppShowcase } from './components/AppShowcase';

export default function App() {
  return (
    <div className="min-h-screen bg-[#f7f6f3]">
      <Navigation />
      <Hero />
      <AppShowcase />
      <Footer />
    </div>
  );
}