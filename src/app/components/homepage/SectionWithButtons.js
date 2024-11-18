import Link from 'next/link';

export default function SectionWithButtons() {
  return (
    <section className="py-16 bg-transparent">
      <h2 className="text-white text-4xl font-bold text-center mb-4">
        Available <span style={{ fontFamily: 'Poppins', fontWeight: 500, fontStyle: 'italic' }}>Worldwide</span>
      </h2>

      <p className="text-[#d6d6d6] text-sm text-center max-w-lg mx-auto mb-8">
        Start now your journey with us.
      </p>

      <div className="flex justify-center space-x-4">
      <Link href="/signupBS">
            <button className="px-6 py-2 bg-white text-[#3571FF] rounded-[100px] hover:bg-gray-200 font-semibold flex items-center">
                Sign Up <span><svg style={{width: '12px', height: '12px', marginLeft: '0.2rem'}} fill="#3571FF" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg></span>
              </button>
            </Link>
        <Link href="/loginBS">
              <button className="px-6 py-2 bg-transparent text-white rounded-[100px] hover:bg-[#2858cc] font-semibold flex items-center">
                Login <span><svg style={{width: '12px', height: '12px', marginLeft: '0.2rem'}} fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg></span>
              </button>
            </Link>
      </div>
    </section>
  );
}
