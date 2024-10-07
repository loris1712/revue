export default function Hero2() {
  return (
    <section className="py-16 mb-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-4">
          <div className="border-l-2 border-dashed border-white-500 h-24 w-0 mx-auto mb-8"></div>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Grande Titolo Bianco</h2>
          <p className="text-[#7F8EA3] text-sm">
            Questa è una descrizione breve che spiega questa sezione.
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-6">
          <div className="bg-[rgba(15,23,42,0.35)] border border-[#0F172A] rounded-[12px] p-6 mb-6 md:mb-0 flex flex-col items-left text-left">
            <div className="bg-[rgba(19,31,58,0.47)] p-2 rounded-[12px] mb-4 w-[fit-content]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">Titolo 1</h3>
            <p className="text-[#7F8EA3] text-sm">
              Descrizione breve di questa sezione, che spiega il contenuto del box.
            </p>
          </div>

          <div className="bg-[rgba(15,23,42,0.35)] border border-[#0F172A] rounded-[12px] p-6 mb-6 md:mb-0 flex flex-col items-left text-left">
            <div className="bg-[rgba(19,31,58,0.47)] p-2 rounded-[12px] mb-4 w-[fit-content]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">Titolo 2</h3>
            <p className="text-[#7F8EA3] text-sm">
              Descrizione breve di questa sezione, che spiega il contenuto del box.
            </p>
          </div>

          <div className="bg-[rgba(15,23,42,0.35)] border border-[#0F172A] rounded-[12px] p-6 flex flex-col items-left text-left">
            <div className="bg-[rgba(19,31,58,0.47)] p-2 rounded-[12px] mb-4 w-[fit-content]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">Titolo 3</h3>
            <p className="text-[#7F8EA3] text-sm">
              Descrizione breve di questa sezione, che spiega il contenuto del box.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}