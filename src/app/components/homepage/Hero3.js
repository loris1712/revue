export default function Hero3() {
  return (
    <section className="bg-[#070D1A] py-16 mb-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-8">
          <div className="border-l-2 border-dashed border-white-500 h-24 w-0 mx-auto mb-8"></div>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:space-x-6 mb-16">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Grande Titolo Bianco</h2>
            <p className="text-[#7F8EA3] text-sm mb-8">
              Questa è una descrizione breve che spiega questa sezione.
            </p>
          </div>

          <div className="md:w-1/2">
            <div className="bg-gradient-to-r from-[#3571FF] to-[#0F172A] pl-6 pr-6 pt-6 rounded-lg">
              <img
                src="/hero1Image.png"
                alt="Hero"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-6 mt-8">
          <div className="md:w-1/2 flex flex-col space-y-6">
            <div className="flex">
              <div className="border-l-4 border-[#3571FF] mr-4"></div>
              <div>
                <h3 className="text-white text-lg font-semibold">Titolo 1</h3>
                <p className="text-[#7F8EA3] text-sm">
                  Descrizione breve di questa sezione, che spiega il contenuto del box.
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="border-l-4 border-[#3571FF] mr-4"></div>
              <div>
                <h3 className="text-white text-lg font-semibold">Titolo 2</h3>
                <p className="text-[#7F8EA3] text-sm">
                  Descrizione breve di questa sezione, che spiega il contenuto del box.
                </p>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 flex flex-col space-y-6 mt-6 md:mt-0">
            <div className="flex">
              <div className="border-l-4 border-[#3571FF] mr-4"></div>
              <div>
                <h3 className="text-white text-lg font-semibold">Titolo 3</h3>
                <p className="text-[#7F8EA3] text-sm">
                  Descrizione breve di questa sezione, che spiega il contenuto del box.
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="border-l-4 border-[#3571FF] mr-4"></div>
              <div>
                <h3 className="text-white text-lg font-semibold">Titolo 4</h3>
                <p className="text-[#7F8EA3] text-sm">
                  Descrizione breve di questa sezione, che spiega il contenuto del box.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
