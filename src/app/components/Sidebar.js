import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '../../../lib/supabaseClient';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebaseClient';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false); 
  const [currentPath, setCurrentPath] = useState('');
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const router = useRouter();

  useEffect(() => {
    setMounted(true); 
    setCurrentPath(window.location.pathname); 
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const isActiveLink = (path) => {
    if (!mounted) return false;
    return currentPath === path;
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Errore nel logout:', error);
    } else {
      window.location.href = '/loginBS';
    }
  };

  useEffect(() => {
    async function fetchUserAndProfile() {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;

        if (user) {
          setUserId(user.id);

          const docRef = doc(db, 'restaurant_profiles', user.id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const profileData = docSnap.data();
            setName(profileData.name || '');
          }
        } else {
          router.push('/loginBS'); 
        }
      } catch (error) {
        console.error('Error fetching user or profile:', error.message || error);
      }
    }

    fetchUserAndProfile();
  }, [router]);

  return (
    <>
      <div className="md:hidden top-0 left-0 w-full bg-[#060911] shadow-lg p-2 z-50 flex items-center justify-between fixed md:relative">
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
          <img src="/revue_logo.png" alt="Company Logo" className="h-12 w-auto" />
        </div>
      </div>

      <div
      style={{ position:'fixed'}}
        className={`fixed inset-y-0 left-0 bg-[#060911] w-64 z-50 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:flex md:flex-col md:bg-[#060911] border-r-2 border-[#0f172a]`}
      >
        <div className="flex justify-center p-4 items-center space-x-2 md:flex hidden">
          <img src="/revue_logo.png" alt="Company Logo" className="h-12 w-auto" />
        </div>

        <h2 className="text-gray-600 font-semibold text-[16px] text-center mb-6 md:mt-0 mt-6">{name}</h2>

        <nav className="space-y-2 mr-3 ml-3">
          <div>
            <p className="text-[10px] text-gray-600 ml-[1rem] tracking-wide">MENU</p>
          </div>
          <Link
            href="/dashboard"
            className={`flex items-center space-x-4 text-gray-600 text-[14px] px-4 py-2 rounded-[8px] ${
              isActiveLink('/dashboard') ? 'bg-[#3471FF] text-white' : ''
            }`}
          >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={`h-5 w-5 ${isActiveLink('/dashboard') ? 'fill-white' : 'fill-[#4b5563]'}`}><path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm320 96c0-26.9-16.5-49.9-40-59.3L280 88c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 204.7c-23.5 9.5-40 32.5-40 59.3c0 35.3 28.7 64 64 64s64-28.7 64-64zM144 176a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm-16 80a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM400 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>
              <span>Dashboard</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style={{ marginLeft: 'auto'}} className={`h-4 w-4 ml-auto ${isActiveLink('/dashboard') ? 'fill-white inline' : 'fill-[#4b5563] hidden'}`}><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
            </Link>
          <Link
            href="/questions"
            className={`flex items-center space-x-4 text-gray-600 text-[14px] px-4 py-2 rounded-[8px] ${
              isActiveLink('/questions') ? 'bg-[#3471FF] text-white' : ''
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={`h-5 w-5 ${isActiveLink('/questions') ? 'fill-white' : 'fill-[#4b5563]'}`}><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3l58.3 0c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24l0-13.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1l-58.3 0c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>
            <span>Questions</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style={{ marginLeft: 'auto'}} className={`h-4 w-4 ml-auto ${isActiveLink('/questions') ? 'fill-white inline' : 'fill-[#4b5563] hidden'}`}><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
          </Link>
          <Link
            href="/reviews"
            className={`flex items-center space-x-4 text-gray-600 text-[14px] px-4 py-2 rounded-[8px] ${
              isActiveLink('/reviews') ? 'bg-[#3471FF] text-white' : ''
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={`h-5 w-5 ${isActiveLink('/reviews') ? 'fill-white' : 'fill-[#4b5563]'}`}><path d="M256 448c141.4 0 256-93.1 256-208S397.4 32 256 32S0 125.1 0 240c0 45.1 17.7 86.8 47.7 120.9c-1.9 24.5-11.4 46.3-21.4 62.9c-5.5 9.2-11.1 16.6-15.2 21.6c-2.1 2.5-3.7 4.4-4.9 5.7c-.6 .6-1 1.1-1.3 1.4l-.3 .3c0 0 0 0 0 0c0 0 0 0 0 0s0 0 0 0s0 0 0 0c-4.6 4.6-5.9 11.4-3.4 17.4c2.5 6 8.3 9.9 14.8 9.9c28.7 0 57.6-8.9 81.6-19.3c22.9-10 42.4-21.9 54.3-30.6c31.8 11.5 67 17.9 104.1 17.9zM128 208a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm128 0a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm96 32a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>
            <span>Reviews</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style={{ marginLeft: 'auto'}} className={`h-4 w-4 ml-auto ${isActiveLink('/reviews') ? 'fill-white inline' : 'fill-[#4b5563] hidden'}`}><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
          </Link>

          <div className="border-[#0f172a] pt-2" style={{borderTopWidth: '1px', marginTop: '2rem'}}>
            <p className="text-[10px] text-gray-600 ml-[1rem] tracking-wide mt-4">SETTINGS</p>
          </div>

          <Link
            href="/settings"
            className={`flex items-center space-x-4 text-gray-600 text-[14px] px-4 py-2 rounded-[8px] ${
              isActiveLink('/settings') ? 'bg-[#3471FF] text-white' : ''
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className={`h-5 w-5 ${isActiveLink('/settings') ? 'fill-white' : 'fill-[#4b5563]'}`}><path d="M308.5 135.3c7.1-6.3 9.9-16.2 6.2-25c-2.3-5.3-4.8-10.5-7.6-15.5L304 89.4c-3-5-6.3-9.9-9.8-14.6c-5.7-7.6-15.7-10.1-24.7-7.1l-28.2 9.3c-10.7-8.8-23-16-36.2-20.9L199 27.1c-1.9-9.3-9.1-16.7-18.5-17.8C173.9 8.4 167.2 8 160.4 8l-.7 0c-6.8 0-13.5 .4-20.1 1.2c-9.4 1.1-16.6 8.6-18.5 17.8L115 56.1c-13.3 5-25.5 12.1-36.2 20.9L50.5 67.8c-9-3-19-.5-24.7 7.1c-3.5 4.7-6.8 9.6-9.9 14.6l-3 5.3c-2.8 5-5.3 10.2-7.6 15.6c-3.7 8.7-.9 18.6 6.2 25l22.2 19.8C32.6 161.9 32 168.9 32 176s.6 14.1 1.7 20.9L11.5 216.7c-7.1 6.3-9.9 16.2-6.2 25c2.3 5.3 4.8 10.5 7.6 15.6l3 5.2c3 5.1 6.3 9.9 9.9 14.6c5.7 7.6 15.7 10.1 24.7 7.1l28.2-9.3c10.7 8.8 23 16 36.2 20.9l6.1 29.1c1.9 9.3 9.1 16.7 18.5 17.8c6.7 .8 13.5 1.2 20.4 1.2s13.7-.4 20.4-1.2c9.4-1.1 16.6-8.6 18.5-17.8l6.1-29.1c13.3-5 25.5-12.1 36.2-20.9l28.2 9.3c9 3 19 .5 24.7-7.1c3.5-4.7 6.8-9.5 9.8-14.6l3.1-5.4c2.8-5 5.3-10.2 7.6-15.5c3.7-8.7 .9-18.6-6.2-25l-22.2-19.8c1.1-6.8 1.7-13.8 1.7-20.9s-.6-14.1-1.7-20.9l22.2-19.8zM112 176a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM504.7 500.5c6.3 7.1 16.2 9.9 25 6.2c5.3-2.3 10.5-4.8 15.5-7.6l5.4-3.1c5-3 9.9-6.3 14.6-9.8c7.6-5.7 10.1-15.7 7.1-24.7l-9.3-28.2c8.8-10.7 16-23 20.9-36.2l29.1-6.1c9.3-1.9 16.7-9.1 17.8-18.5c.8-6.7 1.2-13.5 1.2-20.4s-.4-13.7-1.2-20.4c-1.1-9.4-8.6-16.6-17.8-18.5L583.9 307c-5-13.3-12.1-25.5-20.9-36.2l9.3-28.2c3-9 .5-19-7.1-24.7c-4.7-3.5-9.6-6.8-14.6-9.9l-5.3-3c-5-2.8-10.2-5.3-15.6-7.6c-8.7-3.7-18.6-.9-25 6.2l-19.8 22.2c-6.8-1.1-13.8-1.7-20.9-1.7s-14.1 .6-20.9 1.7l-19.8-22.2c-6.3-7.1-16.2-9.9-25-6.2c-5.3 2.3-10.5 4.8-15.6 7.6l-5.2 3c-5.1 3-9.9 6.3-14.6 9.9c-7.6 5.7-10.1 15.7-7.1 24.7l9.3 28.2c-8.8 10.7-16 23-20.9 36.2L315.1 313c-9.3 1.9-16.7 9.1-17.8 18.5c-.8 6.7-1.2 13.5-1.2 20.4s.4 13.7 1.2 20.4c1.1 9.4 8.6 16.6 17.8 18.5l29.1 6.1c5 13.3 12.1 25.5 20.9 36.2l-9.3 28.2c-3 9-.5 19 7.1 24.7c4.7 3.5 9.5 6.8 14.6 9.8l5.4 3.1c5 2.8 10.2 5.3 15.5 7.6c8.7 3.7 18.6 .9 25-6.2l19.8-22.2c6.8 1.1 13.8 1.7 20.9 1.7s14.1-.6 20.9-1.7l19.8 22.2zM464 304a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
            <span>Settings</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style={{ marginLeft: 'auto'}} className={`h-4 w-4 ml-auto ${isActiveLink('/settings') ? 'fill-white inline' : 'fill-[#4b5563] hidden'}`}><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
          </Link>

          <div
            onClick={() => handleLogout()}
            className={`flex items-center space-x-4 text-gray-600 text-[14px] px-4 py-2 rounded-[8px] ${
              isActiveLink('/logout') ? 'bg-[#3471FF] text-white' : ''
            }`}

          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={`h-5 w-5 ${isActiveLink('/logout') ? 'fill-white' : 'fill-[#4b5563]'}`}><path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"/></svg>
            <span>Logout</span>
          </div>
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
