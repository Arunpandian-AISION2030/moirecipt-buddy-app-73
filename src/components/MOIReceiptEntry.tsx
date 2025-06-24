import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, ArrowRight, Languages, Plus, Trash2, Printer, Download, Bluetooth } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CustomerFunctionData } from "./CustomerFunctionEntry";
import MOIReceiptPrint from "./MOIReceiptPrint";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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

interface ContributorEntry {
  name: string;
  nativePlace: string;
  relationship: string;
  amount: string;
  paymentMode: string;
}

interface MOIReceiptEntryProps {
  onBack: () => void;
  customerData: CustomerFunctionData;
}

const MOIReceiptEntry = ({ onBack, customerData }: MOIReceiptEntryProps) => {
  const { t, toggleLanguage, language } = useLanguage();
  const { toast } = useToast();
  
  const [contributors, setContributors] = useState<ContributorEntry[]>([
    { name: "", nativePlace: "", relationship: "", amount: "", paymentMode: "cash" }
  ]);
  
  const [showPrintView, setShowPrintView] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [printFunction, setPrintFunction] = useState<((text: string) => Promise<void>) | null>(null);

  const getPaymentModeInTamil = (mode: string) => {
    const tamilModes: { [key: string]: string } = {
      'cash': 'ரூபாய் காசாக',
      'card': 'கார்டாக',
      'upi': 'UPI ஆக',
      'gpay': 'GPay ஆக',
      'cheque': 'காசோலையாக'
    };
    return language === 'ta' ? (tamilModes[mode] || mode) : mode;
  };

  const getFunctionTypeInTamil = (type: string) => {
    const tamilTypes: { [key: string]: string } = {
      'wedding': 'கல்யாணம்',
      'birthday': 'வயது விழா',
      'anniversary': 'ஆண்டு விழா',
      'puberty': 'பூப்புனித விழா',
      'engagement': 'நிச்சயதார்த்தம்',
      'housewarming': 'கிரகப்பிரவேசம்'
    };
    return language === 'ta' ? (tamilTypes[type] || type) : type;
  };

  const addContributor = () => {
    setContributors([...contributors, { name: "", nativePlace: "", relationship: "", amount: "", paymentMode: "cash" }]);
  };

  const removeContributor = (index: number) => {
    if (contributors.length > 1) {
      setContributors(contributors.filter((_, i) => i !== index));
    }
  };

  const updateContributor = (index: number, field: keyof ContributorEntry, value: string) => {
    const updated = contributors.map((contributor, i) => 
      i === index ? { ...contributor, [field]: value } : contributor
    );
    setContributors(updated);
  };

  const validateForm = () => {
    for (const contributor of contributors) {
      if (!contributor.name.trim() || !contributor.amount.trim()) {
        toast({
          title: t('validation_error'),
          description: t('required_field'),
          variant: "destructive",
        });
        return false;
      }
      
      if (isNaN(Number(contributor.amount)) || Number(contributor.amount) <= 0) {
        toast({
          title: t('validation_error'),
          description: t('invalid_amount'),
          variant: "destructive",
        });
        return false;
      }
    }
    return true;
  };

  const generateReceiptNumber = () => {
    const date = new Date();
    const timestamp = date.getTime().toString().slice(-6);
    return `MOI${timestamp}`;
  };

  const generateReceiptData = (): MOIReceiptData[] => {
    return contributors.map(contributor => ({
      receiptNumber: generateReceiptNumber(),
      customerName: customerData.customerName,
      functionType: customerData.functionType,
      functionDate: customerData.functionDate?.toLocaleDateString() || '',
      contributorName: contributor.name,
      contributorPlace: contributor.nativePlace,
      relationship: contributor.relationship,
      amount: contributor.amount,
      paymentMode: contributor.paymentMode,
      timestamp: new Date().toISOString(),
    }));
  };

  const handlePrint = () => {
    if (!validateForm()) return;
    setShowPrintModal(true);
  };

  const handleBluetoothPrint = async () => {
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

    const receipts = generateReceiptData();
    
    try {
      for (const receipt of receipts) {
        let printText = '';
        
        if (language === 'ta') {
          printText = `
-----------------------------------------
              MOI ரசீது
-----------------------------------------
வாடிக்கையாளர் பெயர்: ${receipt.customerName}
நிகழ்வு: ${getFunctionTypeInTamil(receipt.functionType)}
தேதி: ${receipt.functionDate}
இடம்: ${customerData.venuePlace}

பங்களிப்பாளர்கள்:

${receipt.contributorName} – ₹${receipt.amount} (${getPaymentModeInTamil(receipt.paymentMode)})

மொத்த தொகை: ₹${receipt.amount}

ரசீது உருவாக்கப்பட்ட நேரம்:
${new Date().toLocaleDateString('ta-IN')}, ${new Date().toLocaleTimeString('ta-IN')}

💼 நிறுவனம்: மொய்-ரசீது
📞 தொடர்பு எண்: +91 81900 83059
🌐 www.moireceipt.com
          `.trim();
        } else {
          printText = `
-----------------------------------------
              MOI RECEIPT
-----------------------------------------
Customer Name  : ${receipt.customerName}
Event          : ${receipt.functionType}
Date           : ${receipt.functionDate}
Venue          : ${customerData.venuePlace}

Contributors:

${receipt.contributorName} – ₹${receipt.amount} (${receipt.paymentMode})

Total Amount: ₹${receipt.amount}

Receipt Generated:
${new Date().toLocaleDateString()}, ${new Date().toLocaleTimeString()}

💼 Company: Moi-Receipt
📞 Contact: +91 81900 83059
🌐 www.moireceipt.com
          `.trim();
        }
        
        await printFunction(printText);
      }
      
      toast({
        title: language === 'ta' ? "அனைத்து ரசீதுகளும் அச்சிடப்பட்டன!" : "All Receipts Printed!",
        description: language === 'ta' ? 
          `${receipts.length} ரசீதுகள் அச்சிடப்பட்டன` : 
          `${receipts.length} receipts printed successfully`,
      });
      
      setShowPrintModal(false);
    } catch (error) {
      toast({
        title: language === 'ta' ? "பிரிண்ட் தோல்வி" : "Print Failed",
        description: language === 'ta' ? 
          "ரசீதுகள் அச்சிட முடியவில்லை" : 
          "Failed to print receipts",
        variant: "destructive"
      });
    }
  };

  const handlePDFDownload = () => {
    const receipts = generateReceiptData();
    const totalAmount = receipts.reduce((sum, receipt) => sum + parseFloat(receipt.amount), 0);
    
    let pdfContent = '';
    
    if (language === 'ta') {
      pdfContent = `
மொய்-ரசீது சுருக்கம்
==================

வாடிக்கையாளர் பெயர்: ${customerData.customerName}
நிகழ்வு: ${getFunctionTypeInTamil(customerData.functionType)}
தேதி: ${customerData.functionDate?.toLocaleDateString()}
இடம்: ${customerData.venuePlace}

பங்களிப்பாளர்கள்:
${receipts.map((receipt, index) => 
  `${index + 1}. ${receipt.contributorName} – ₹${receipt.amount} (${getPaymentModeInTamil(receipt.paymentMode)})`
).join('\n')}

மொத்த தொகை: ₹${totalAmount.toLocaleString('ta-IN')}

ரசீது உருவாக்கப்பட்ட நேரம்: ${new Date().toLocaleString('ta-IN')}

💼 நிறுவனம்: மொய்-ரசீது
📞 தொடர்பு எண்: +91 81900 83059
🌐 www.moireceipt.com
      `;
    } else {
      pdfContent = `
MOI Receipt Summary
==================

Customer: ${customerData.customerName}
Function: ${customerData.functionType}
Date: ${customerData.functionDate?.toLocaleDateString()}
Venue: ${customerData.venuePlace}

Contributors:
${receipts.map((receipt, index) => 
  `${index + 1}. ${receipt.contributorName} - ₹${receipt.amount} (${receipt.paymentMode})`
).join('\n')}

Total Amount: ₹${totalAmount.toLocaleString('en-IN')}
Generated: ${new Date().toLocaleString()}

💼 Company: Moi-Receipt
📞 Contact: +91 81900 83059
🌐 www.moireceipt.com
      `;
    }

    const blob = new Blob([pdfContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MOI_Receipt_${customerData.customerName}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: language === 'ta' ? "பதிவேற்றம் முடிந்தது!" : "Download Complete!",
      description: language === 'ta' ? 
        "MOI ரசீது சுருக்கம் பதிவேற்றப்பட்டது" : 
        "MOI receipt summary downloaded successfully",
    });
    
    setShowPrintModal(false);
  };

  const handleProceedToFullPrint = () => {
    if (!validateForm()) return;
    setShowPrintView(true);
  };

  if (showPrintView) {
    const receiptData = generateReceiptData();
    return (
      <MOIReceiptPrint 
        receiptData={receiptData}
        customerData={{
          customerName: customerData.customerName,
          functionType: customerData.functionType,
          functionDate: customerData.functionDate?.toLocaleDateString() || '',
          venue: customerData.venuePlace,
        }}
        onBack={() => setShowPrintView(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-white hover:bg-white/20 p-2"
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-lg sm:text-xl font-bold">{t('moi_receipt_entry')}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePrint}
              className="text-white hover:bg-white/20 p-2"
              title={language === 'ta' ? 'அச்சிடு / PDF' : 'Print / PDF'}
            >
              <Printer size={20} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-green-600 border-white/30 hover:bg-white/10 hover:text-white text-xs sm:text-sm"
            >
              <Languages size={16} />
              {language === 'en' ? 'தமிழ்' : 'EN'}
            </Button>
          </div>
        </div>
      </div>

      {/* Print Options Modal */}
      <Dialog open={showPrintModal} onOpenChange={setShowPrintModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">
              {language === 'ta' ? 'அச்சிடு / PDF விகল்ப' : 'Print / PDF Options'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Bluetooth Printer Connection */}
            <BluetoothPrinterConnection 
              onPrintRequest={(fn) => setPrintFunction(() => fn)}
            />
            
            {/* Print Options */}
            <div className="grid grid-cols-1 gap-3">
              <Button
                onClick={handleBluetoothPrint}
                disabled={!printFunction}
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-12"
              >
                <Bluetooth className="mr-2" size={16} />
                {language === 'ta' ? 'Bluetooth அச்சிடு' : 'Bluetooth Print'}
              </Button>
              
              <Button
                onClick={handlePDFDownload}
                variant="outline"
                className="h-12 border-2 border-green-300 hover:bg-green-50"
              >
                <Download className="mr-2" size={16} />
                {language === 'ta' ? 'PDF பதிவேற்று' : 'Download PDF'}
              </Button>
              
              <Button
                onClick={handleProceedToFullPrint}
                variant="outline"
                className="h-12 border-2 border-purple-300 hover:bg-purple-50"
              >
                <Printer className="mr-2" size={16} />
                {language === 'ta' ? 'முழு அச்சிடல் பக்கம்' : 'Full Print Page'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Form Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Client Info Summary */}
        <Card className="mb-6 shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-green-100 to-blue-100">
            <CardTitle className="text-center text-green-800">
              {t('client_function_organizer')}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong>{t('customer_name')}:</strong> {customerData.customerName}
              </div>
              <div>
                <strong>{t('function_type')}:</strong> {language === 'ta' ? getFunctionTypeInTamil(customerData.functionType) : customerData.functionType}
              </div>
              <div>
                <strong>{t('function_date')}:</strong> {customerData.functionDate?.toLocaleDateString()}
              </div>
              <div>
                <strong>{t('venue_place')}:</strong> {customerData.venuePlace}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contributors Entry */}
        <Card className="shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-blue-100 to-purple-100">
            <CardTitle className="text-xl sm:text-2xl text-center text-blue-800">
              {t('relations_guest')}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-4">
              {contributors.map((contributor, index) => (
                <div key={index} className="p-4 border rounded-lg bg-gray-50">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-semibold text-gray-700">
                      {t('contributor')} {index + 1}
                    </h4>
                    {contributors.length > 1 && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeContributor(index)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor={`name-${index}`} className="text-sm font-medium text-gray-700">
                        {t('contributor_name')} *
                      </Label>
                      <Input
                        id={`name-${index}`}
                        value={contributor.name}
                        onChange={(e) => updateContributor(index, 'name', e.target.value)}
                        placeholder={t('enter_contributor_name')}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`nativePlace-${index}`} className="text-sm font-medium text-gray-700">
                        {t('native_place')}
                      </Label>
                      <Input
                        id={`nativePlace-${index}`}
                        value={contributor.nativePlace}
                        onChange={(e) => updateContributor(index, 'nativePlace', e.target.value)}
                        placeholder="Enter place"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor={`relationship-${index}`} className="text-sm font-medium text-gray-700">
                        Relationship
                      </Label>
                      <Input
                        id={`relationship-${index}`}
                        value={contributor.relationship}
                        onChange={(e) => updateContributor(index, 'relationship', e.target.value)}
                        placeholder="Uncle, Friend, etc."
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`amount-${index}`} className="text-sm font-medium text-gray-700">
                        {t('amount')} (₹) *
                      </Label>
                      <Input
                        id={`amount-${index}`}
                        type="number"
                        value={contributor.amount}
                        onChange={(e) => updateContributor(index, 'amount', e.target.value)}
                        placeholder="0"
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`payment-${index}`} className="text-sm font-medium text-gray-700">
                        {t('payment_mode')} *
                      </Label>
                      <select
                        id={`payment-${index}`}
                        value={contributor.paymentMode}
                        onChange={(e) => updateContributor(index, 'paymentMode', e.target.value)}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="cash">{t('cash')}</option>
                        <option value="card">{t('card')}</option>
                        <option value="upi">{t('upi')}</option>
                        <option value="cheque">{t('cheque')}</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Contributor Button */}
            <div className="mt-6 text-center">
              <Button
                onClick={addContributor}
                variant="outline"
                className="border-dashed border-2 border-blue-300 hover:border-blue-500 hover:bg-blue-50"
              >
                <Plus className="mr-2" size={20} />
                {t('add_contributor')}
              </Button>
            </div>

            {/* Total Amount Display */}
            {contributors.some(c => c.amount) && (
              <div className="mt-6 p-4 bg-green-50 rounded-lg border-2 border-green-200">
                <div className="text-center">
                  <span className="text-lg font-semibold text-green-800">
                    {t('total_amount')}: ₹{contributors.reduce((sum, c) => sum + (parseFloat(c.amount) || 0), 0).toLocaleString(language === 'ta' ? 'ta-IN' : 'en-IN')}
                  </span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end mt-8">
              <Button
                onClick={handlePrint}
                variant="outline"
                className="border-2 border-blue-300 hover:bg-blue-50 px-6 py-2"
              >
                <Printer className="mr-2" size={20} />
                {t('print_receipts')}
              </Button>
              
              <Button
                onClick={handleProceedToFullPrint}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-2"
              >
                {t('proceed_to_print')}
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MOIReceiptEntry;
