import Link from 'next/link';

export default function HeroPlans() {
  return (
    <section className="bg-[#030711] py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="border-l-2 border-dashed border-white-500 h-24 w-0 mx-auto mb-8"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Choose Your Plan</h2>
          <p className="text-[#7F8EA3] text-sm">
            Select the plan that works best for you, with affordable prices and great benefits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[rgba(15,23,42,0.35)] border border-[#0F172A] rounded-[12px] p-6 flex flex-col text-left">
            <h3 className="text-white text-2xl font-semibold mb-2">Basic Plan</h3>
            <p className="text-[#7F8EA3] text-sm mb-6">Perfect for individuals and small businesses.</p>
            <div className="text-white text-4xl font-bold mb-4">
              $10 <span className="text-xs font-light">/week</span>
            </div>
            <Link href="/">
              <button className="w-full bg-[#3571FF] text-white py-2 px-4 rounded-[12px] hover:bg-[#265ecf] mb-6 text-sm">
                Get Started
              </button>
            </Link>
            <ul className="space-y-2">
              <li className="flex items-center text-white text-sm">
                <span className="inline-block w-2 h-2 bg-white rounded-full mr-2"></span>Full Access to Platform
              </li>
              <li className="flex items-center text-white text-sm">
                <span className="inline-block w-2 h-2 bg-white rounded-full mr-2"></span>Email Support
              </li>
              <li className="flex items-center text-white text-sm">
                <span className="inline-block w-2 h-2 bg-white rounded-full mr-2"></span>Basic Analytics
              </li>
            </ul>
          </div>

          <div className="bg-[rgba(15,23,42,0.35)] border border-[#0F172A] rounded-[12px] p-6 flex flex-col text-left">
            <h3 className="text-white text-2xl font-semibold mb-2">Pro Plan</h3>
            <p className="text-[#7F8EA3] text-sm mb-6">Best for growing businesses and teams.</p>
            <div className="text-white text-4xl font-bold mb-4">
              $25 <span className="text-xs font-light">/week</span>
            </div>
            <Link href="/">
              <button className="w-full bg-[#3571FF] text-white py-2 px-4 rounded-[12px] hover:bg-[#265ecf] mb-6 text-sm">
                Get Started
              </button>
             </Link> 
            <ul className="space-y-2">
              <li className="flex items-center text-white text-sm">
                <span className="inline-block w-2 h-2 bg-white rounded-full mr-2"></span>Everything in Basic
              </li>
              <li className="flex items-center text-white text-sm">
                <span className="inline-block w-2 h-2 bg-white rounded-full mr-2"></span>Priority Support
              </li>
              <li className="flex items-center text-white text-sm">
                <span className="inline-block w-2 h-2 bg-white rounded-full mr-2"></span>Advanced Analytics
              </li>
            </ul>
          </div>

          <div className="bg-[rgba(15,23,42,0.35)] border border-[#0F172A] rounded-[12px] p-6 flex flex-col text-left">
            <h3 className="text-white text-2xl font-semibold mb-2">Enterprise Plan</h3>
            <p className="text-[#7F8EA3] text-sm mb-6">For large businesses with more advanced needs.</p>
            <div className="text-white text-4xl font-bold mb-4">
              $50 <span className="text-xs font-light">/week</span>
            </div>
            <Link href="/">
              <button className="w-full bg-[#3571FF] text-white py-2 px-4 rounded-[12px] hover:bg-[#265ecf] mb-6 text-sm">
                Get Started
              </button>
            </Link>
            <ul className="space-y-2">
              <li className="flex items-center text-white text-sm">
                <span className="inline-block w-2 h-2 bg-white rounded-full mr-2"></span>Everything in Pro
              </li>
              <li className="flex items-center text-white text-sm">
                <span className="inline-block w-2 h-2 bg-white rounded-full mr-2"></span>Dedicated Support Team
              </li>
              <li className="flex items-center text-white text-sm">
                <span className="inline-block w-2 h-2 bg-white rounded-full mr-2"></span>Custom Integrations
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
