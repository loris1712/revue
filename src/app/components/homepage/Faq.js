import { useState } from 'react';

export default function FAQ() {
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const faqs = [
    {
      question: 'What is the return policy?',
      answer:
        'You can return any item within 30 days of purchase as long as it is in its original condition. Please visit our return center for more details.',
    },
    {
      question: 'How do I track my order?',
      answer:
        'Once your order is shipped, you will receive an email with a tracking link. You can also track your order through your account page.',
    },
    {
      question: 'Do you offer international shipping?',
      answer:
        'Yes, we offer worldwide shipping. Shipping times and costs will vary depending on your location. Visit our shipping page for more details.',
    },
  ];

  return (
    <section className="bg-[#030711] py-16 mb-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="border-l-2 border-dashed border-gray-500 h-32 w-0 mb-8"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b" style={{ borderColor: 'rgba(53, 113, 255, 0.2)' }}>
              <button
                className="w-full text-left text-white text-xl font-semibold py-4 focus:outline-none flex justify-between items-center"
                onClick={() => toggleQuestion(index)}
              >
                {faq.question}
                <svg
                  className={`w-6 h-6 transform transition-transform ${
                    openQuestion === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openQuestion === index ? 'max-h-screen' : 'max-h-0'
                }`}
              >
                <p className="text-[#7F8EA3] text-sm pr-4 pb-4">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
