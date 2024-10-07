export default function HeroSection() {
  return (
    <section className="bg-[#030711] py-24 mt-36">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center md:flex-row md:text-left md:items-start md:space-x-8">
          <div className="md:w-1/2">
            <div className="bg-[#0F172A] text-white py-2 px-6 rounded-full mb-4 md:w-[fit-content]">
              <p className="text-xs">Your tagline here</p>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Grande Titolo Bianco
            </h1>

            <p className="text-[#7F8EA3] text-sm mb-6">
              Questa è una descrizione breve che spiega il servizio o il prodotto.
            </p>

            <div className="flex justify-center md:justify-start space-x-4 text-xs">
              <button className="px-6 py-2 bg-[#3571FF] text-white rounded-[12px] hover:bg-[#2858cc]">
                Login
              </button>
              <button className="px-6 py-2 bg-white text-[#3571FF] rounded-[12px] hover:bg-gray-200">
                Sign Up
              </button>
            </div>
          </div>

          <div className="md:w-1/2 mt-8 md:mt-0">
            <div className="bg-gradient-to-r from-[#3571FF] to-[#0F172A] pl-6 pr-6 pt-6 md:pl-6 md:pr-6 md:pt-6 rounded-xl">
              <img
                src="/hero1Image.png"
                alt="Hero"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
