import Link from 'next/link';

export default function SectionWithButtons() {
  return (
    <section className="py-16 bg-transparent">
      <h2 className="text-white text-4xl font-bold text-center mb-4">
        Available worldwide
      </h2>

      <p className="text-[#7F8EA3] text-sm text-center max-w-lg mx-auto mb-8">
        Start now your journey with us.
      </p>

      <div className="flex justify-center space-x-4">
        <Link href="/">
          <button className="bg-[#3571FF] text-white py-2 px-6 text-[14px] rounded-[12px] hover:bg-[#265ecf]">
            Login
          </button>
        </Link>  

        <Link href="/">
          <button className="bg-white text-[#3571FF] py-2 px-6 text-[14px] rounded-[12px] hover:bg-gray-200">
            Sign Up
          </button>
        </Link>
      </div>
    </section>
  );
}
