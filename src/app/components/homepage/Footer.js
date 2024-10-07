import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#070D1A] py-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between px-4 md:px-0 md:items-center text-white space-y-4 md:space-y-0">
        <div className="flex-shrink-0">
          <img
            src="/logo.svg"
            alt="Company Logo"
            className="h-8 w-auto"
          />
        </div>

        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
          <a href="/terms" className="text-sm hover:underline">
            Terms & Conditions
          </a>
          <a href="/privacy" className="text-sm hover:underline">
            Privacy Policy
          </a>
          <a href="/contact" className="text-sm hover:underline">
            Contact Us
          </a>
        </div>

        <div className="text-sm">
          © 2024 Company, Inc.
        </div>
      </div>
    </footer>
  );
}


