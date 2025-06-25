
import React from 'react';

interface A4ReceiptProps {
  customerName: string;
  eventType: string;
  eventDate: string;
  venue: string;
  guests: Array<{
    name: string;
    amount: string;
    paymentMode: string;
  }>;
  totalAmount: string;
  createdAt: string;
}

const A4ReceiptFormat = ({ 
  customerName, 
  eventType, 
  eventDate, 
  venue, 
  guests, 
  totalAmount, 
  createdAt 
}: A4ReceiptProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-12 font-sans" style={{ minHeight: '297mm', width: '210mm' }}>
      {/* Header */}
      <div className="text-center mb-12 border-b-4 border-green-600 pb-8">
        <h1 className="text-5xl font-bold text-green-700 mb-4">மொய்-ரசீது</h1>
        <h2 className="text-3xl font-semibold text-gray-700 mb-2">MOI RECEIPT</h2>
        <p className="text-lg text-gray-600">Wedding Gift Contribution Receipt</p>
        <div className="mt-6 text-right">
          <p className="text-sm text-gray-500">Receipt Generated: {createdAt}</p>
        </div>
      </div>

      {/* Customer & Event Details */}
      <div className="grid grid-cols-2 gap-12 mb-12">
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
            வாடிக்கையாளர் விவரங்கள் / Customer Details
          </h3>
          <div className="space-y-4 text-lg">
            <div>
              <span className="font-semibold text-gray-700">🧑‍💼 Customer Name:</span>
              <p className="text-xl font-bold text-gray-900 mt-1">{customerName}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
            நிகழ்ச்சி விவரங்கள் / Event Details
          </h3>
          <div className="space-y-4 text-lg">
            <div>
              <span className="font-semibold text-gray-700">🎉 Event:</span>
              <p className="text-xl font-bold text-gray-900 mt-1">{eventType}</p>
            </div>
            <div>
              <span className="font-semibold text-gray-700">📅 Date:</span>
              <p className="text-xl font-bold text-gray-900 mt-1">{eventDate}</p>
            </div>
            <div>
              <span className="font-semibold text-gray-700">📍 Venue:</span>
              <p className="text-xl font-bold text-gray-900 mt-1">{venue}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Guest Contributions */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-6">
          👥 பங்களிப்பாளர்கள் / Contributors
        </h3>
        
        <div className="bg-gray-50 rounded-lg p-6">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left py-4 px-2 text-lg font-semibold text-gray-700">Contributor Name</th>
                <th className="text-center py-4 px-2 text-lg font-semibold text-gray-700">Amount</th>
                <th className="text-center py-4 px-2 text-lg font-semibold text-gray-700">Payment Mode</th>
              </tr>
            </thead>
            <tbody>
              {guests.map((guest, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-6 px-2 text-xl font-medium text-gray-900">{guest.name}</td>
                  <td className="py-6 px-2 text-xl font-bold text-green-600 text-center">₹{guest.amount}</td>
                  <td className="py-6 px-2 text-lg text-gray-700 text-center">{guest.paymentMode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Total Amount */}
      <div className="mb-12 bg-green-50 border-2 border-green-200 rounded-lg p-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">💰 மொத்த தொகை / Total Amount</h3>
          <p className="text-5xl font-bold text-green-700">₹{totalAmount}</p>
        </div>
      </div>

      {/* Company Info */}
      <div className="border-t-4 border-green-600 pt-8 text-center">
        <div className="bg-green-100 rounded-lg p-6">
          <h4 className="text-xl font-bold text-gray-800 mb-4">🔗 Business Information</h4>
          <div className="space-y-2 text-lg text-gray-700">
            <p><span className="font-semibold">💼 Company:</span> மொய்-ரசீது</p>
            <p><span className="font-semibold">📞 Contact:</span> +91 81900 83059</p>
            <p><span className="font-semibold">🌐 Website:</span> www.moireceipt.com</p>
          </div>
        </div>
        
        <div className="mt-8 text-center text-gray-600">
          <p className="text-lg font-medium">நன்றி! / Thank You!</p>
          <p className="text-sm mt-2">This is a digitally generated receipt</p>
        </div>
      </div>
    </div>
  );
};

export default A4ReceiptFormat;
