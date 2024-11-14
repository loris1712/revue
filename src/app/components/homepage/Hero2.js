export default function Hero2() {
  return (
    <section className="py-16 mb-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-4">
          <div className="border-l-2 border-dashed border-white-500 h-24 w-0 mx-auto mb-8"></div>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Grande Titolo Bianco</h2>
          <p className="text-[#d6d6d6] text-sm">
            Questa è una descrizione breve che spiega questa sezione.
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-6">
          <div className="bg-[rgba(15,23,42,0.35)] border border-[#0F172A] rounded-[12px] p-6 mb-6 md:mb-0 flex flex-col items-left text-left">
            <div className="bg-[rgba(19,31,58,0.47)] p-2 rounded-[12px] mb-4 w-[fit-content]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-10 w-10 text-white"
                fill="#fff" stroke="currentColor"><path d="M168.2 384.9c-15-5.4-31.7-3.1-44.6 6.4c-8.2 6-22.3 14.8-39.4 22.7c5.6-14.7 9.9-31.3 11.3-49.4c1-12.9-3.3-25.7-11.8-35.5C60.4 302.8 48 272 48 240c0-79.5 83.3-160 208-160s208 80.5 208 160s-83.3 160-208 160c-31.6 0-61.3-5.5-87.8-15.1zM26.3 423.8c-1.6 2.7-3.3 5.4-5.1 8.1l-.3 .5c-1.6 2.3-3.2 4.6-4.8 6.9c-3.5 4.7-7.3 9.3-11.3 13.5c-4.6 4.6-5.9 11.4-3.4 17.4c2.5 6 8.3 9.9 14.8 9.9c5.1 0 10.2-.3 15.3-.8l.7-.1c4.4-.5 8.8-1.1 13.2-1.9c.8-.1 1.6-.3 2.4-.5c17.8-3.5 34.9-9.5 50.1-16.1c22.9-10 42.4-21.9 54.3-30.6c31.8 11.5 67 17.9 104.1 17.9c141.4 0 256-93.1 256-208S397.4 32 256 32S0 125.1 0 240c0 45.1 17.7 86.8 47.7 120.9c-1.9 24.5-11.4 46.3-21.4 62.9zM144 272a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm144-32a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm80 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"/></svg>
            </div>
            <h3 className="text-[12px] text-[#3571FF] font-semibold mb-2">Step 1</h3>
            <h3 className="text-white text-lg font-semibold mb-2">Tailor Your Feedback</h3>
            <p className="text-[#d6d6d6] text-sm">
              Customise the questions that matter most to your business. You choose exactly what feedback you want from your customers.
            </p>
          </div>

          <div className="bg-[rgba(15,23,42,0.35)] border border-[#0F172A] rounded-[12px] p-6 mb-6 md:mb-0 flex flex-col items-left text-left">
            <div className="bg-[rgba(19,31,58,0.47)] p-2 rounded-[12px] mb-4 w-[fit-content]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"  className="h-10 w-10 text-white"
                fill="#fff" stroke="currentColor"><path d="M0 80C0 53.5 21.5 32 48 32l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48L0 80zM64 96l0 64 64 0 0-64L64 96zM0 336c0-26.5 21.5-48 48-48l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48l0-96zm64 16l0 64 64 0 0-64-64 0zM304 32l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48l0-96c0-26.5 21.5-48 48-48zm80 64l-64 0 0 64 64 0 0-64zM256 304c0-8.8 7.2-16 16-16l64 0c8.8 0 16 7.2 16 16s7.2 16 16 16l32 0c8.8 0 16-7.2 16-16s7.2-16 16-16s16 7.2 16 16l0 96c0 8.8-7.2 16-16 16l-64 0c-8.8 0-16-7.2-16-16s-7.2-16-16-16s-16 7.2-16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-160zM368 480a16 16 0 1 1 0-32 16 16 0 1 1 0 32zm64 0a16 16 0 1 1 0-32 16 16 0 1 1 0 32z"/></svg>
            </div>
            <h3 className="text-[12px] text-[#3571FF] font-semibold mb-2">Step 2</h3>
            <h3 className="text-white text-lg font-semibold mb-2">Quick and Effortless Feedback.</h3>
            <p className="text-[#d6d6d6] text-sm">
            Customers scan a QR code and rate four simple questions on a scale of 1 to 5. It iss fast, easy, and takes less than 20 seconds.
            </p>
          </div>

          <div className="bg-[rgba(15,23,42,0.35)] border border-[#0F172A] rounded-[12px] p-6 flex flex-col items-left text-left">
            <div className="bg-[rgba(19,31,58,0.47)] p-2 rounded-[12px] mb-4 w-[fit-content]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"  className="h-10 w-10 text-white"
                fill="#fff" stroke="currentColor"><path d="M96 32l0 96 128 0 0-96c0-17.7-14.3-32-32-32L128 0C110.3 0 96 14.3 96 32zm0 128c-53 0-96 43-96 96L0 464c0 26.5 21.5 48 48 48l224 0c26.5 0 48-21.5 48-48l0-208c0-53-43-96-96-96L96 160zm64 96a80 80 0 1 1 0 160 80 80 0 1 1 0-160zM384 48c0-1.4-1-3-2.2-3.6L352 32 339.6 2.2C339 1 337.4 0 336 0s-3 1-3.6 2.2L320 32 290.2 44.4C289 45 288 46.6 288 48c0 1.4 1 3 2.2 3.6L320 64l12.4 29.8C333 95 334.6 96 336 96s3-1 3.6-2.2L352 64l29.8-12.4C383 51 384 49.4 384 48zm76.4 45.8C461 95 462.6 96 464 96s3-1 3.6-2.2L480 64l29.8-12.4C511 51 512 49.4 512 48c0-1.4-1-3-2.2-3.6L480 32 467.6 2.2C467 1 465.4 0 464 0s-3 1-3.6 2.2L448 32 418.2 44.4C417 45 416 46.6 416 48c0 1.4 1 3 2.2 3.6L448 64l12.4 29.8zm7.2 100.4c-.6-1.2-2.2-2.2-3.6-2.2s-3 1-3.6 2.2L448 224l-29.8 12.4c-1.2 .6-2.2 2.2-2.2 3.6c0 1.4 1 3 2.2 3.6L448 256l12.4 29.8c.6 1.2 2.2 2.2 3.6 2.2s3-1 3.6-2.2L480 256l29.8-12.4c1.2-.6 2.2-2.2 2.2-3.6c0-1.4-1-3-2.2-3.6L480 224l-12.4-29.8zM448 144c0-1.4-1-3-2.2-3.6L416 128 403.6 98.2C403 97 401.4 96 400 96s-3 1-3.6 2.2L384 128l-29.8 12.4c-1.2 .6-2.2 2.2-2.2 3.6c0 1.4 1 3 2.2 3.6L384 160l12.4 29.8c.6 1.2 2.2 2.2 3.6 2.2s3-1 3.6-2.2L416 160l29.8-12.4c1.2-.6 2.2-2.2 2.2-3.6z"/></svg>
            </div>
            <h3 className="text-[12px] text-[#3571FF] font-semibold mb-2">Step 3</h3>
            <h3 className="text-white text-lg font-semibold mb-2">AI-Powered Review Creation</h3>
            <p className="text-[#d6d6d6] text-sm">
            Revue transforms responses into authentic, compelling reviews and posts them on major platforms, boosting your online presence with minimal effort

            </p>
          </div>
        </div>
      </div>
    </section>
  );
}