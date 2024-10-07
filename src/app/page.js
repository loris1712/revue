'use client'

import Menu from './components/Menu';
import Hero1 from './components/homepage/Hero1';
import Hero2 from './components/homepage/Hero2';
import Hero3 from './components/homepage/Hero3';
import HeroPlans from './components/homepage/HeroPlans';
import Faq from './components/homepage/Faq';
import SectionWithButtons from './components/homepage/SectionWithButtons';
import Footer from './components/homepage/Footer';

export default function HomePage() {
  return (
    <div>
      <Menu />
      <Hero1 />
      <Hero2 />
      <Hero3 />
      <HeroPlans />
      <Faq />
      <SectionWithButtons />
      <Footer />
    </div>
  );
}

