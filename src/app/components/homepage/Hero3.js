export default function Hero3() {
  return (
    <section className="bg-[#070D1A] py-16 mb-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-8">
          <div className="border-l-2 border-dashed border-white-500 h-24 w-0 mx-auto mb-8"></div>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:space-x-6 mb-16">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Effortlessly Boost Customer Reviews with AI-Powered Simplicity</h2>
            <p className="text-[#7F8EA3] text-sm mb-8">
              Revue streamlines the review process, making it easy for your customers to leave feedback in seconds. With AI-powered tools that tailor questions to your business needs, you’ll gather more targeted insights and enhance your online reputation effortlessly.
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
                <h3 className="text-white text-lg font-semibold">AI-Powered Customization</h3>
                <p className="text-[#7F8EA3] text-sm">
                  Revue's AI technology tailors review questions specifically to your business, ensuring you gather the most relevant feedback from customers.
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="border-l-4 border-[#3571FF] mr-4"></div>
              <div>
                <h3 className="text-white text-lg font-semibold">Quick and Easy Process</h3>
                <p className="text-[#7F8EA3] text-sm">
                  Customers can leave reviews in under 20 seconds, making it convenient and simple for them to share their thoughts, boosting participation.
                </p>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 flex flex-col space-y-6 mt-6 md:mt-0">
            <div className="flex">
              <div className="border-l-4 border-[#3571FF] mr-4"></div>
              <div>
                <h3 className="text-white text-lg font-semibold">Targeted Insights</h3>
                <p className="text-[#7F8EA3] text-sm">
                  Get deeper insights into customer experiences with targeted feedback, helping you make data-driven decisions to improve your business.
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="border-l-4 border-[#3571FF] mr-4"></div>
              <div>
                <h3 className="text-white text-lg font-semibold">Boost Online Reputation</h3>
                <p className="text-[#7F8EA3] text-sm">
                  By making reviews easier for your customers, Revue helps you increase the number of reviews and build a stronger online presence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
