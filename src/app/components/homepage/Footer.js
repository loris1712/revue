import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#1d49b3] py-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-0 text-white">
        
        <Link href="/">
          <div className="flex-shrink-0 md:col-span-1 flex justify-center md:justify-start">
            <img
              src="/logo.svg"
              alt="Company Logo"
              className="h-8 w-auto"
            />
          </div>
        </Link>

        {/* Colonna Links */}
        <div className="flex flex-col md:flex-row justify-center md:justify-center space-y-2 md:space-y-0 md:space-x-6">
          <Link href="/terms" className="text-sm hover:underline text-center md:text-left">
            Terms & Conditions
          </Link>
          <Link href="/privacy" className="text-sm hover:underline text-center md:text-left">
            Privacy Policy
          </Link>
          <Link href="/contact" className="text-sm hover:underline text-center md:text-left">
            Contact Us
          </Link>
        </div>

        {/* Colonna Copyright */}
        <div className="text-[12px] flex justify-center md:justify-end ">
          © 2024 Company, Inc.
        </div>
      </div>
    </footer>
  );
}