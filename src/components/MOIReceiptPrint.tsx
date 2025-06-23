
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Bluetooth, Printer, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import BluetoothPrinterConnection from "./BluetoothPrinterConnection";

interface MOIReceiptData {
  receiptNumber: string;
  customerName: string;
  functionType: string;
  functionDate: string;
  contributorName: string;
  contributorPlace: string;
  relationship: string;
  amount: string;
  paymentMode: string;
  timestamp: string;
}

interface MOIReceiptPrintProps {
  receiptData: MOIReceiptData[];
  customerData: {
    customerName: string;
    functionType: string;
    functionDate: string;
    venue: string;
  };
  onBack: () => void;
}

const MOIReceiptPrint = ({ receiptData, customerData, onBack }: MOIReceiptPrintProps) => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [showBluetoothPrinter, setShowBluetoothPrinter] = useState(false);
  const [printFunction, setPrintFunction] = useState<((text: string) => Promise<void>) | null>(null);

  const generateMOIReceiptText = (receipt: MOIReceiptData) => {
    return `
-----------------------------------------
              MOI RECEIPT
-----------------------------------------
Name           : ${receipt.contributorName}
Place          : ${receipt.contributorPlace || 'N/A'}
Relationship   : ${receipt.relationship || 'N/A'}
MOI Amount     : ₹${receipt.amount}

Function       : ${receipt.functionType}
Date           : ${receipt.functionDate}
-----------------------------------------
Thank you for your presence and blessings!

Contact: www.moireceipt.com | 8248960558
${language === 'ta' ? 'தமிழ் / English' : 'Tamil / English'}
    `.trim();
  };

  const generateSummaryText = () => {
    const totalAmount = receiptData.reduce((sum, receipt) => sum + parseFloat(receipt.amount || '0'), 0);
    
    return `
${language === 'ta' ? 'மோஇரிசிப்ட் - MOI சுருக்கம்' : 'Moirecipt - MOI Summary'}
================================

${language === 'ta' ? 'நிகழ்ச்சி விவரங்கள்' : 'FUNCTION DETAILS'}
--------------------------------
${language === 'ta' ? 'வாடிக்கையாளர்' : 'Customer'}: ${customerData.customerName}
${language === 'ta' ? 'நிகழ்ச்சி வகை' : 'Function Type'}: ${customerData.functionType}
${language === 'ta' ? 'தேதி' : 'Date'}: ${customerData.functionDate}
${language === 'ta' ? 'இடம்' : 'Venue'}: ${customerData.venue}

${language === 'ta' ? 'பங்களிப்பு சுருக்கம்' : 'CONTRIBUTION SUMMARY'}
================================
${language === 'ta' ? 'மொத்த பங்களிப்புகள்' : 'Total Contributions'}: ${receiptData.length}
${language === 'ta' ? 'மொத்த தொகை' : 'Total Amount'}: ₹${totalAmount.toLocaleString('en-IN')}

${language === 'ta' ? 'பங்களிப்பாளர்கள் பட்டியல்' : 'CONTRIBUTORS LIST'}
--------------------------------
${receiptData.map((receipt, index) => 
  `${index + 1}. ${receipt.contributorName} - ₹${receipt.amount}`
).join('\n')}

${language === 'ta' ? 'உருவாக்கப்பட்ட நேரம்' : 'Generated'}: ${new Date().toLocaleString()}
    `.trim();
  };

  const handlePrintIndividualReceipt = async (receipt: MOIReceiptData) => {
    if (!printFunction) {
      toast({
        title: language === 'ta' ? "பிரிண்டர் இணைக்கப்படவில்லை" : "Printer Not Connected",
        description: language === 'ta' ? 
          "முதலில் Bluetooth பிரிண்டரை இணைக்கவும்" : 
          "Please connect a Bluetooth printer first",
        variant: "destructive"
      });
      return;
    }

    try {
      const printText = generateMOIReceiptText(receipt);
      await printFunction(printText);
      
      toast({
        title: language === 'ta' ? "ரசீது அச்சிடப்பட்டது!" : "Receipt Printed!",
        description: language === 'ta' ? 
          `${receipt.contributorName} ரசீது அச்சிடப்பட்டது` : 
          `Receipt for ${receipt.contributorName} printed successfully`,
      });
    } catch (error) {
      toast({
        title: language === 'ta' ? "பிரிண்ட் தோல்வி" : "Print Failed",
        description: language === 'ta' ? 
          "ரசீது அச்சிட முடியவில்லை" : 
          "Failed to print the receipt",
        variant: "destructive"
      });
    }
  };

  const handlePrintSummary = async () => {
    if (!printFunction) {
      toast({
        title: language === 'ta' ? "பிரிண்டர் இணைக்கப்படவில்லை" : "Printer Not Connected",
        description: language === 'ta' ? 
          "முதலில் Bluetooth பிரிண்டரை இணைக்கவும்" : 
          "Please connect a Bluetooth printer first",
        variant: "destructive"
      });
      return;
    }

    try {
      const printText = generateSummaryText();
      await printFunction(printText);
      
      toast({
        title: language === 'ta' ? "சுருக்கம் அச்சிடப்பட்டது!" : "Summary Printed!",
        description: language === 'ta' ? 
          "MOI சுருக்கம் அச்சிடப்பட்டது" : 
          "MOI summary printed successfully",
      });
    } catch (error) {
      toast({
        title: language === 'ta' ? "பிரிண்ட் தோல்வி" : "Print Failed",
        description: language === 'ta' ? 
          "சுருக்கம் அச்சிட முடியவில்லை" : 
          "Failed to print the summary",
        variant: "destructive"
      });
    }
  };

  const totalAmount = receiptData.reduce((sum, receipt) => sum + parseFloat(receipt.amount || '0'), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-xl font-bold">
            {language === 'ta' ? 'MOI ரசீது அச்சிடுதல்' : 'MOI Receipt Printing'}
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        {/* Bluetooth Printer Connection */}
        <div className="mb-6">
          <BluetoothPrinterConnection 
            onPrintRequest={(fn) => setPrintFunction(() => fn)}
          />
        </div>

        {/* Summary Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{language === 'ta' ? 'MOI சுருக்கம்' : 'MOI Summary'}</span>
              <Button
                onClick={handlePrintSummary}
                disabled={!printFunction}
                className="bg-gradient-to-r from-blue-600 to-purple-600"
              >
                <Printer className="mr-2" size={16} />
                {language === 'ta' ? 'சுருக்கம் அச்சிடு' : 'Print Summary'}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p><strong>{language === 'ta' ? 'வாடிக்கையாளர்:' : 'Customer:'}</strong> {customerData.customerName}</p>
                <p><strong>{language === 'ta' ? 'நிகழ்ச்சி:' : 'Function:'}</strong> {customerData.functionType}</p>
              </div>
              <div>
                <p><strong>{language === 'ta' ? 'மொத்த பங்களிப்புகள்:' : 'Total Contributions:'}</strong> {receiptData.length}</p>
                <p><strong>{language === 'ta' ? 'மொத்த தொகை:' : 'Total Amount:'}</strong> ₹{totalAmount.toLocaleString('en-IN')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Individual Receipts */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            {language === 'ta' ? 'தனிப்பட்ட ரசீதுகள்' : 'Individual Receipts'}
          </h3>
          
          {receiptData.map((receipt, index) => (
            <Card key={index} className="border border-gray-200">
              <CardContent className="p-6">
                {/* Preview of Receipt */}
                <div className="bg-gray-50 p-4 rounded-lg mb-4 font-mono text-sm">
                  <div className="text-center font-bold mb-2">MOI RECEIPT</div>
                  <div className="border-t border-b border-gray-300 py-2 space-y-1">
                    <div><strong>Name:</strong> {receipt.contributorName}</div>
                    <div><strong>Place:</strong> {receipt.contributorPlace || 'N/A'}</div>
                    <div><strong>Relationship:</strong> {receipt.relationship || 'N/A'}</div>
                    <div><strong>MOI Amount:</strong> ₹{receipt.amount}</div>
                  </div>
                  <div className="pt-2 space-y-1">
                    <div><strong>Function:</strong> {receipt.functionType}</div>
                    <div><strong>Date:</strong> {receipt.functionDate}</div>
                  </div>
                  <div className="text-center text-xs mt-2 text-gray-600">
                    Thank you for your presence and blessings!
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">
                      {language === 'ta' ? 'ரசீது எண்:' : 'Receipt No:'} {receipt.receiptNumber}
                    </p>
                  </div>
                  <Button
                    onClick={() => handlePrintIndividualReceipt(receipt)}
                    disabled={!printFunction}
                    size="sm"
                    className="bg-gradient-to-r from-green-600 to-blue-600"
                  >
                    <Printer className="mr-2" size={14} />
                    {language === 'ta' ? 'அச்சிடு' : 'Print'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {receiptData.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-gray-600">
                {language === 'ta' ? 'MOI ரசீதுகள் இல்லை' : 'No MOI receipts available'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MOIReceiptPrint;
