import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

export default function HeroSection() {
  

  return (
    <section className="bg-gradient-to-b from-[#030711] via-[#1d49b3] to-[#030711] py-18" style={{ paddingTop: '10rem' }}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center md:flex-row md:text-left md:items-start md:space-x-8">
          {/* Testo e pulsanti */}
          <div className="md:w-1/2">
            <div className="bg-[#0F172A] text-white py-2 px-4 rounded-full mb-4 md:w-[fit-content]">
              <p className="text-xs">Increase customer reviews with feedback in under 20s</p>
            </div>

            <div className="text-4xl md:text-[76px] font-bold text-white mb-4 leading-normal md:leading-[86px]">
              AI-Driven Reviews Made <span style={{ fontFamily: 'Poppins', fontWeight: 500, fontStyle: 'italic' }}>Easy for Your Customers</span>
            </div>

            <p className="text-[#d6d6d6] text-[14px] mb-6">
              Revue is an AI-powered solution that simplifies and speeds up the review process, making it easy for customers to leave quick feedback or share more detailed insights.
            </p>

            <div className="flex justify-center md:justify-start space-x-4 text-[14px]">
              <Link href="/signupBS">
                <button className="px-6 py-2 bg-white text-[#3571FF] rounded-[100px] hover:bg-gray-200 font-semibold flex items-center">
                  Sign Up <span><svg style={{ width: '12px', height: '12px', marginLeft: '0.2rem' }} fill="#3571FF" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg></span>
                </button>
              </Link>
              <Link href="/loginBS">
                <button className="px-6 py-2 bg-transparent text-white rounded-[100px] hover:bg-[#2858cc] font-semibold flex items-center">
                  Login <span><svg style={{ width: '12px', height: '12px', marginLeft: '0.2rem' }} fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg></span>
                </button>
              </Link>
            </div>
          </div>

          {/* Immagine e gradiente */}
          <div className="md:w-1/2 mt-8 md:mt-0">
            <div className="bg-gradient-to-r from-[#3571FF] to-[#0F172A] pl-6 pr-6 pt-6 md:pl-6 md:pr-6 md:pt-6 rounded-xl">
              <img src="/hero1Image.png" alt="Hero" className="w-full" />
            </div>
          </div>
        </div>
        
        {/* Sezione loghi */}
        <div className="mt-[8rem] grid grid-cols-4 gap-8 mb-[6rem]">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex items-center justify-center relative">
              {/* Logo placeholder */}
              <img src={`/logo${index + 1}.png`} alt={`Client logo ${index + 1}`} className="w-40 h-auto" />

              {/* Linea tratteggiata (solo tra colonne) */}
              {index % 4 !== 3 && (
                <div className="absolute right-0 h-full border-r border-dashed border-[#d1d5db1f]"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
