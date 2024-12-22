export default function ReviewPopup({ review, onClose }) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-[#0b1633] p-6 rounded-lg w-[90%] max-w-md border border-[#0f172a] relative">
          {/* Pulsante di chiusura */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-white text-lg font-bold"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="h-5 w-5 fill-white"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>          </button>
          {/* Contenuto del popup */}
          <p className="text-[#7F8EA3] text-xs mb-2">{review.date}</p>
          <p className="text-white">{review.review}</p>
        </div>
      </div>
    );
  }
  