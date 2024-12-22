import React, { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

export default function QrCodeComponent({ qrCodeUrl }) {
  const qrCodeRef = useRef();

  const handleDownloadQRCode = () => {
    const canvas = qrCodeRef.current.querySelector('canvas');
    const pngUrl = canvas.toDataURL('image/png');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = 'QRCode.png';
    downloadLink.click();
  };


  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiato negli appunti!');
    }
  };

  return (
    <div className="bg-[#3471FF] p-8 rounded-lg mb-6 flex flex-col md:flex-row items-center justify-between">
      <div className="text-white md:w-1/2">
        <h2 className="text-2xl font-bold mb-4">Share Your Link with Customers!</h2>
        <p className="mb-4 text-[14px]">
          Share this unique link with your customers to let them access your services easily.
          Copy the link and share it on social media or via messaging apps!
        </p>
        {/* Copy Link Button */}
        <button
          onClick={handleCopyLink}
          className="bg-white text-[#3471FF] px-6 py-2 rounded-[100px] shadow-md hover:bg-gray-200 text-[14px] mr-4"
        >
          Copy Link
        </button>
        {/* Download QR Code Button */}
        <button
          onClick={handleDownloadQRCode}
          className="bg-white text-[#3471FF] px-6 py-2 rounded-[100px] shadow-md hover:bg-gray-200 text-[14px]"
        >
          Download QR Code
        </button>
      </div>

      {/* QR Code */}
      <div className="mt-6 md:mt-0 md:w-100 flex flex-end" ref={qrCodeRef}>
        <QRCodeCanvas value={qrCodeUrl} size={150} />
      </div>
    </div>
  );
}
