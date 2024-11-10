import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // Stato per monitorare se il componente è stato montato lato client
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    setMounted(true); // Impostiamo mounted a true quando il componente è montato sul client
    setCurrentPath(window.location.pathname); // Otteniamo il percorso della pagina
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const isActiveLink = (path) => {
    if (!mounted) return false; // Evitiamo di usare window.location prima che il componente sia montato
    return currentPath === path;
  };

  return (
    <>
      <div className="md:hidden fixed top-0 left-0 w-full bg-white shadow-lg p-2 z-50 flex items-center justify-between">
        <div className="p-2 bg-[#030711] rounded-lg">
          <button onClick={toggleSidebar}>
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 24 24" stroke="#fff">
              {isOpen ? (
                <path fillRule="evenodd" clipRule="evenodd" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path fillRule="evenodd" clipRule="evenodd" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        <div className="flex justify-center items-center space-x-2">
          <img src="/logo.svg" alt="Company Logo" className="h-12 w-auto" />
          <span className="text-2xl font-semibold text-[#3471ff]">evue</span>
        </div>
      </div>

      <div
        className={`fixed inset-y-0 left-0 bg-white w-64 z-50 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:flex md:flex-col md:bg-[#f5f5f5] border-r-2 border-[#d7d7d7]`}
      >
        <div className="flex justify-center p-4 items-center space-x-2 md:flex hidden">
          <img src="/logo.svg" alt="Company Logo" className="h-12 w-auto" />
          <span className="text-2xl font-semibold text-[#3471ff]">evue</span>
        </div>

        <h2 className="text-gray-600 font-semibold text-xl text-center mb-6 md:mt-0 mt-6">Company Name</h2>

        <nav className="space-y-2 mr-3 ml-3">
          <Link
            href="/dashboard"
            className={`flex items-center space-x-4 text-gray-600 text-[14px] px-4 py-2 rounded-xl ${
              isActiveLink('/dashboard') ? 'bg-[#3471FF] text-white' : ''
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={`h-5 w-5 ${isActiveLink('/dashboard') ? 'fill-white' : 'fill-[#4b5563]'}`}><path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm320 96c0-26.9-16.5-49.9-40-59.3L280 88c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 204.7c-23.5 9.5-40 32.5-40 59.3c0 35.3 28.7 64 64 64s64-28.7 64-64zM144 176a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm-16 80a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM400 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>
            <span>Dashboard</span>
          </Link>
          <Link
            href="/questions"
            className={`flex items-center space-x-4 text-gray-600 text-[14px] px-4 py-2 rounded-xl ${
              isActiveLink('/questions') ? 'bg-[#3471FF] text-white' : ''
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={`h-5 w-5 ${isActiveLink('/questions') ? 'fill-white' : 'fill-[#4b5563]'}`}><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3l58.3 0c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24l0-13.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1l-58.3 0c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>
            <span>Questions</span>
          </Link>
          <Link
            href="/reviews"
            className={`flex items-center space-x-4 text-gray-600 text-[14px] px-4 py-2 rounded-xl ${
              isActiveLink('/reviews') ? 'bg-[#3471FF] text-white' : ''
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={`h-5 w-5 ${isActiveLink('/reviews') ? 'fill-white' : 'fill-[#4b5563]'}`}><path d="M256 448c141.4 0 256-93.1 256-208S397.4 32 256 32S0 125.1 0 240c0 45.1 17.7 86.8 47.7 120.9c-1.9 24.5-11.4 46.3-21.4 62.9c-5.5 9.2-11.1 16.6-15.2 21.6c-2.1 2.5-3.7 4.4-4.9 5.7c-.6 .6-1 1.1-1.3 1.4l-.3 .3c0 0 0 0 0 0c0 0 0 0 0 0s0 0 0 0s0 0 0 0c-4.6 4.6-5.9 11.4-3.4 17.4c2.5 6 8.3 9.9 14.8 9.9c28.7 0 57.6-8.9 81.6-19.3c22.9-10 42.4-21.9 54.3-30.6c31.8 11.5 67 17.9 104.1 17.9zM128 208a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm128 0a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm96 32a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>
            <span>Reviews</span>
          </Link>
          <Link
            href="/logout"
            className={`flex items-center space-x-4 text-gray-600 text-[14px] px-4 py-2 rounded-xl ${
              isActiveLink('/logout') ? 'bg-[#3471FF] text-white' : ''
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={`h-5 w-5 ${isActiveLink('/logout') ? 'fill-white' : 'fill-[#4b5563]'}`}><path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"/></svg>
            <span>Logout</span>
          </Link>
        </nav>

        <div className="mt-auto px-4 py-6 text-center text-sm text-gray-500">
          <div className='flex space-x-4 justify-center	text-[12px]'>
            <div className="">
              <Link href="/privacy" className="text-[#3571FF] hover:underline">
                Privacy
              </Link>
            </div>
            <div>
              <Link href="/terms" className="text-[#3571FF] hover:underline">
                Terms
              </Link>
            </div>
          </div>
          <p className="mt-1 text-[12px]">&copy; 2024 Company, Inc.</p>
        </div>
      </div>

      {isOpen && (
        <div onClick={toggleSidebar} className="fixed inset-0 bg-black opacity-50 z-40 md:hidden" />
      )}
    </>
  );
}
