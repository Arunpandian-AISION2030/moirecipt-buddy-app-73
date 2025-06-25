
import React from 'react';

interface ThermalReceiptProps {
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

const ThermalReceiptFormat = ({ 
  customerName, 
  eventType, 
  eventDate, 
  venue, 
  guests, 
  totalAmount, 
  createdAt 
}: ThermalReceiptProps) => {
  return (
    <div 
      className="bg-white font-mono text-black leading-tight"
      style={{ 
        width: '80mm', 
        fontSize: '12px', 
        padding: '5mm',
        fontFamily: 'Courier New, monospace'
      }}
    >
      {/* Header */}
      <div className="text-center mb-3">
        <div className="text-lg font-bold">மொய்-ரசீது</div>
        <div className="text-sm font-bold">MOI RECEIPT</div>
        <div className="text-xs">Wedding Gift Receipt</div>
        <div className="border-t border-b border-black my-2 py-1">
          <div className="text-xs">{createdAt}</div>
        </div>
      </div>

      {/* Customer Details */}
      <div className="mb-3">
        <div className="text-xs font-bold border-b border-dashed border-black pb-1">
          CUSTOMER / வாடிக்கையாளர்
        </div>
        <div className="text-xs mt-1">
          Name: {customerName}
        </div>
      </div>

      {/* Event Details */}
      <div className="mb-3">
        <div className="text-xs font-bold border-b border-dashed border-black pb-1">
          EVENT / நிகழ்ச்சி
        </div>
        <div className="text-xs mt-1 space-y-1">
          <div>Type: {eventType}</div>
          <div>Date: {eventDate}</div>
          <div>Venue: {venue}</div>
        </div>
      </div>

      {/* Contributors */}
      <div className="mb-3">
        <div className="text-xs font-bold border-b border-dashed border-black pb-1">
          CONTRIBUTORS / பங்களிப்பாளர்கள்
        </div>
        <div className="mt-1">
          {guests.map((guest, index) => (
            <div key={index} className="text-xs border-b border-dotted border-gray-400 py-1">
              <div className="flex justify-between">
                <span className="truncate flex-1 mr-2">{guest.name}</span>
                <span className="font-bold">₹{guest.amount}</span>
              </div>
              <div className="text-xs text-gray-600">({guest.paymentMode})</div>
            </div>
          ))}
        </div>
      </div>

      {/* Total */}
      <div className="mb-3 border-t-2 border-black pt-2">
        <div className="text-center">
          <div className="text-xs font-bold">TOTAL AMOUNT</div>
          <div className="text-xs font-bold">மொத்த தொகை</div>
          <div className="text-lg font-bold border border-black py-1 my-1">
            ₹{totalAmount}
          </div>
        </div>
      </div>

      {/* Company Info */}
      <div className="border-t border-black pt-2 text-center">
        <div className="text-xs space-y-1">
          <div className="font-bold">மொய்-ரசீது</div>
          <div>📞 +91 81900 83059</div>
          <div>🌐 www.moireceipt.com</div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-3 border-t border-dashed border-black pt-2">
        <div className="text-xs">நன்றி! / Thank You!</div>
        <div className="text-xs mt-1">Digital Receipt</div>
      </div>

      {/* Cut Line */}
      <div className="text-center mt-3 text-xs">
        ----------------------------------------
      </div>
    </div>
  );
};

export default ThermalReceiptFormat;
