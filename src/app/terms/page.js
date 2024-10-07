"use client"

import Menu from '../components/Menu';
import Footer from '../components/homepage/Footer';

export default function TermsPage() {
  return (
    <div>
      <Menu /> 
        <section className="bg-[#030711] py-24">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Terms & Conditions
            </h1>

            <p className="text-[#7F8EA3] text-sm mb-6">
              Questa è una descrizione breve che spiega il servizio o il prodotto.
            </p>
          </div>
        </section>
      <Footer />
    </div>
  );
}
