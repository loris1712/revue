import { useState } from 'react';

export default function FAQ() {
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const faqs = [
    {
      question: 'Are the reviews genuine?',
      answer:
        'Revue ensures that all reviews are authentic by gathering direct customer feedback. The AI helps streamline the process but doesn\'t generate reviews automatically.',
    },
    {
      question: 'Does AI-powered generation create identical reviews?',
      answer:
        'No, Revue’s AI customizes the review experience by tailoring questions based on your business needs, ensuring that reviews are diverse and personalized, reflecting each customer’s unique experience.',
    },
    {
      question: 'Is Revue customizable for my business?',
      answer:
        'Yes, Revue allows full customization of questions, so you can align them with your specific business goals and target areas where you need more insights.',
    },
    {
      question: 'Which platforms does Revue work with?',
      answer:
        'Revue integrates seamlessly with a variety of platforms including your website, social media, and review sites like Google, Yelp, and TripAdvisor.',
    },
    {
      question: 'Do I need technical knowledge to use it?',
      answer:
        'No, Revue is designed to be user-friendly. It doesn’t require any technical expertise, making it accessible for business owners of all backgrounds.',
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
                <p className="text-[#d6d6d6] text-sm pr-4 pb-4">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
