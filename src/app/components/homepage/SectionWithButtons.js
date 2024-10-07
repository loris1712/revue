import Link from 'next/link';

export default function SectionWithButtons() {
  return (
    <section className="py-16 bg-transparent">
      <h2 className="text-white text-4xl font-bold text-center mb-4">
        Il tuo titolo qui
      </h2>

      <p className="text-[#7F8EA3] text-sm text-center max-w-lg mx-auto mb-8">
        Questa è la descrizione della sezione. Puoi spiegare brevemente cosa vuoi comunicare in questa parte. 
      </p>

      <div className="flex justify-center space-x-4">
        <Link href="/">
          <button className="bg-[#3571FF] text-white py-2 px-6 text-sm rounded-[12px] hover:bg-[#265ecf]">
            Tasto 1
          </button>
        </Link>  

        <Link href="/">
          <button className="bg-white text-[#3571FF] py-2 px-6 text-sm rounded-[12px] hover:bg-gray-200">
            Tasto 2
          </button>
        </Link>
      </div>
    </section>
  );
}
