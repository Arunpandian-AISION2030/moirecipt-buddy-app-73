
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import A4ReceiptFormat from './A4ReceiptFormat';
import ThermalReceiptFormat from './ThermalReceiptFormat';
import { Printer, FileText, ArrowLeft } from 'lucide-react';

interface ReceiptFormatsDemoProps {
  onBack?: () => void;
}

const ReceiptFormatsDemo = ({ onBack }: ReceiptFormatsDemoProps) => {
  const [activeFormat, setActiveFormat] = useState<'A4' | 'thermal'>('A4');

  // Sample data based on your request
  const sampleData = {
    customerName: 'arun',
    eventType: 'கல்யாணம் (Wedding)',
    eventDate: '3/6/2025',
    venue: 'arun',
    guests: [
      {
        name: 'arun',
        amount: '99',
        paymentMode: 'ரூபாய் காசாக'
      }
    ],
    totalAmount: '99',
    createdAt: '24/6/2025, AM 3:02:42'
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-4 print:hidden">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          {onBack && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft size={20} />
            </Button>
          )}
          <h1 className="text-xl font-bold">Receipt Format Demo</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        {/* Format Selector */}
        <Card className="mb-6 print:hidden">
          <CardHeader>
            <CardTitle>Choose Receipt Format</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Button
                onClick={() => setActiveFormat('A4')}
                variant={activeFormat === 'A4' ? 'default' : 'outline'}
                className="flex items-center gap-2"
              >
                <FileText size={16} />
                A4 Format
              </Button>
              <Button
                onClick={() => setActiveFormat('thermal')}
                variant={activeFormat === 'thermal' ? 'default' : 'outline'}
                className="flex items-center gap-2"
              >
                <Printer size={16} />
                Thermal Format
              </Button>
              <Button
                onClick={handlePrint}
                className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-blue-600"
              >
                <Printer size={16} />
                Print Current Format
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Receipt Display */}
        <div className="flex justify-center">
          {activeFormat === 'A4' ? (
            <div className="shadow-2xl">
              <A4ReceiptFormat {...sampleData} />
            </div>
          ) : (
            <div className="shadow-2xl bg-white p-4 rounded">
              <ThermalReceiptFormat {...sampleData} />
            </div>
          )}
        </div>

        {/* Format Information */}
        <Card className="mt-6 print:hidden">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">A4 Format Features:</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Full-page printable format (210mm x 297mm)</li>
                  <li>• Professional layout with proper spacing</li>
                  <li>• Large fonts for easy reading</li>
                  <li>• Suitable for office printers</li>
                  <li>• Supports Tamil and English mixed content</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Thermal Format Features:</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Compact layout for 58mm/80mm paper width</li>
                  <li>• Monospaced font for thermal printers</li>
                  <li>• Centered text alignment</li>
                  <li>• Ideal for POS thermal printers</li>
                  <li>• Supports Tamil and English mixed content</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReceiptFormatsDemo;
