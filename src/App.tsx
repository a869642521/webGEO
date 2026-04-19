import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { SloganSection } from './components/SloganSection';
// import { StatsSection } from './components/StatsSection';
import { DevLove } from './components/DevLove';
import { FooterCta } from './components/FooterCta';
import { Footer } from './components/Footer';
import { useRubikInit } from './hooks/useRubikInit';
import { useScrollReveal } from './hooks/useScrollReveal';
import { useStatCountUp } from './hooks/useStatCountUp';
import { useCtaWidthSync } from './hooks/useCtaWidthSync';

export default function App() {
  useRubikInit();
  useScrollReveal();
  useStatCountUp();
  useCtaWidthSync();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <SloganSection />
        {/* <StatsSection /> */}
        <DevLove />
      </main>
      <FooterCta />
      <Footer />
    </>
  );
}
