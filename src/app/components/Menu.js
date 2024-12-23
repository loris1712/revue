import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-10 transition-all duration-300 ${scrolled ? 'bg-[#030711] bg-gray-800 text-white' : 'bg-transparent text-gray-800'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <img
                src="/revue_logo.png" 
                alt="Logo"
                className="h-10 w-auto"
              />
            </Link>

            <div className='ml-6 space-x-6 text-[14px] md:inline hidden'>
            <Link href="/" className="text-white hover:text-gray-300">
              Home
            </Link>
            <Link href="/" className="text-white hover:text-gray-300">
              Features
            </Link>
            <Link href="/customers" className="text-white hover:text-gray-300">
              Feedback
            </Link>
            <Link href="/terms" className="text-white hover:text-gray-300">
              Privacy & Policy
            </Link>
            <Link href="/terms" className="text-white hover:text-gray-300">
              Terms & Conditions
            </Link>
            </div>
            
          </div>
          <div className="hidden md:flex items-center space-x-6 text-[14px]">
            
            <Link href="/loginBS">
              <button className="ml-4 px-6 py-2 bg-transparent text-white rounded-[100px] hover:bg-[#2858cc] font-semibold flex items-center">
                Login <span><svg style={{width: '12px', height: '12px', marginLeft: '0.2rem'}} fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg></span>
              </button>
            </Link>
            <Link href="/signupBS">
            <button className="px-6 py-2 bg-white text-[#3571FF] rounded-[100px] hover:bg-gray-200 font-semibold flex items-center">
                Sign Up <span><svg style={{width: '12px', height: '12px', marginLeft: '0.2rem'}} fill="#3571FF" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg></span>
              </button>
            </Link>
          </div>
          <div className="flex md:hidden items-center">

            <Link href="/loginBS">
              <button className="block w-full px-6 py-2 bg-[#3571FF] text-white rounded-[12px] hover:bg-[#2858cc] text-[14px]">
                Login
              </button>
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none ml-2"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="#fff"
                viewBox="0 0 24 24"
                stroke="#fff"
              >
                {isOpen ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-sm">
            <Link href="/" className="block text-gray-800 hover:bg-gray-200 px-3 py-2 rounded">
              Home
            </Link>
            <Link href="/privacy" className="block text-gray-800 hover:bg-gray-200 px-3 py-2 rounded">
              Privacy
            </Link>
            <Link href="/terms" className="block text-gray-800 hover:bg-gray-200 px-3 py-2 rounded">
              Terms
            </Link>
            <Link href="/customers" className="block text-gray-800 hover:bg-gray-200 px-3 py-2 rounded">
              Feedback
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
