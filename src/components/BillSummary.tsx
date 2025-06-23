
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, Download, Share2, Printer, PartyPopper } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BillData {
  clientName: string;
  nativePlace: string;
  functionType: string;
  functionDate: string;
  venueDetails: string;
  contactNumber: string;
  servicesProvided: string;
  totalAmount: string;
  advancePaid: string;
  balanceDue: string;
  paymentMode: string;
}

interface BillSummaryProps {
  billData: BillData;
  onBack: () => void;
}

const BillSummary = ({ billData, onBack }: BillSummaryProps) => {
  const { t, language } = useLanguage();
  const { toast } = useToast();

  const generateInvoiceNumber = () => {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `MR${year}${month}${day}${random}`;
  };

  const invoiceNumber = generateInvoiceNumber();

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'ta' ? 'ta-IN' : 'en-IN');
  };

  const formatAmount = (amount: string) => {
    if (!amount) return '₹0';
    return `₹${parseFloat(amount).toLocaleString('en-IN')}`;
  };

  const getFunctionTypeDisplay = (type: string) => {
    const typeMap: { [key: string]: string } = {
      wedding: t('wedding'),
      birthday: t('birthday'),
      anniversary: t('anniversary'),
      other: t('other')
    };
    return typeMap[type] || type;
  };

  const getPaymentModeDisplay = (mode: string) => {
    const modeMap: { [key: string]: string } = {
      cash: t('cash'),
      gpay: t('gpay'),
      upi: t('upi'),
      cheque: t('cheque')
    };
    return modeMap[mode] || mode;
  };

  const handleDownloadPDF = () => {
    toast({
      title: "PDF Download",
      description: "PDF download functionality will be implemented soon!",
    });
  };

  const handleShareWhatsApp = () => {
    const message = `*${language === 'ta' ? 'மோஇரிசிப்ட் - விழா ரசீது' : 'Moirecipt - Event Bill'}*

${t('client_name')}: ${billData.clientName}
${t('native_place')}: ${billData.nativePlace}
${t('function_type')}: ${getFunctionTypeDisplay(billData.functionType)}
${t('function_date')}: ${formatDate(billData.functionDate)}
${t('venue_details')}: ${billData.venueDetails}
${t('total_amount')}: ${formatAmount(billData.totalAmount)}
${t('advance_paid')}: ${formatAmount(billData.advancePaid)}
${t('balance_due')}: ${formatAmount(billData.balanceDue)}

${t('thank_you_message')}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-4 print:hidden">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="flex items-center gap-2">
            <PartyPopper size={24} />
            <h1 className="text-xl font-bold">{t('bill_summary_title')}</h1>
          </div>
        </div>
      </div>

      {/* Bill Content */}
      <div className="max-w-4xl mx-auto p-4">
        <Card className="shadow-xl border-0 bg-white">
          <CardContent className="p-8">
            {/* Header */}
            <div className="text-center mb-8 border-b-2 border-orange-200 pb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <PartyPopper size={32} className="text-orange-600" />
                <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  {language === 'ta' ? 'மோஇரிசிப்ட்' : 'Moirecipt'}
                </h1>
              </div>
              <p className="text-lg text-gray-600">
                {language === 'ta' ? 'விழா ரசீது' : 'Event Bill'}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {t('invoice_number')}: {invoiceNumber}
              </p>
            </div>

            {/* Client Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  🪔 {language === 'ta' ? 'வாடிக்கையாளர் விவரங்கள்' : 'Client Details'}
                </h3>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-gray-600">{t('client_name')}:</span>
                    <p className="text-gray-800">{billData.clientName}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">{t('native_place')}:</span>
                    <p className="text-gray-800">{billData.nativePlace}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">{t('contact_number')}:</span>
                    <p className="text-gray-800">{billData.contactNumber}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  🎉 {language === 'ta' ? 'நிகழ்ச்சி விவரங்கள்' : 'Event Details'}
                </h3>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-gray-600">{t('function_type')}:</span>
                    <p className="text-gray-800">{getFunctionTypeDisplay(billData.functionType)}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">{t('function_date')}:</span>
                    <p className="text-gray-800">{formatDate(billData.functionDate)}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">{t('payment_mode')}:</span>
                    <p className="text-gray-800">{getPaymentModeDisplay(billData.paymentMode)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Venue Details */}
            {billData.venueDetails && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  🏛️ {t('venue_details')}
                </h3>
                <p className="text-gray-800 bg-gray-50 p-4 rounded-lg">{billData.venueDetails}</p>
              </div>
            )}

            {/* Services */}
            {billData.servicesProvided && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  💐 {t('services_provided')}
                </h3>
                <p className="text-gray-800 bg-gray-50 p-4 rounded-lg">{billData.servicesProvided}</p>
              </div>
            )}

            {/* Amount Details */}
            <div className="mb-8 bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg border-2 border-orange-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                💰 {language === 'ta' ? 'பணம் விவரங்கள்' : 'Payment Details'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="font-medium text-gray-600">{t('total_amount')}</p>
                  <p className="text-2xl font-bold text-gray-800">{formatAmount(billData.totalAmount)}</p>
                </div>
                <div className="text-center">
                  <p className="font-medium text-gray-600">{t('advance_paid')}</p>
                  <p className="text-2xl font-bold text-green-600">{formatAmount(billData.advancePaid)}</p>
                </div>
                <div className="text-center">
                  <p className="font-medium text-gray-600">{t('balance_due')}</p>
                  <p className="text-2xl font-bold text-red-600">{formatAmount(billData.balanceDue)}</p>
                </div>
              </div>
            </div>

            {/* Thank You Message */}
            <div className="text-center py-6 bg-gradient-to-r from-orange-100 to-red-100 rounded-lg border-2 border-orange-200">
              <p className="text-lg font-medium text-gray-800 mb-2">🙏</p>
              <p className="text-gray-700">{t('thank_you_message')}</p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mt-6 print:hidden">
          <Button
            onClick={handleDownloadPDF}
            className="flex-1 min-w-[200px] bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
          >
            <Download className="mr-2" size={20} />
            {t('download_pdf')}
          </Button>
          <Button
            onClick={handleShareWhatsApp}
            className="flex-1 min-w-[200px] bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
          >
            <Share2 className="mr-2" size={20} />
            {t('share_whatsapp')}
          </Button>
          <Button
            onClick={handlePrint}
            className="flex-1 min-w-[200px] bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white"
          >
            <Printer className="mr-2" size={20} />
            {t('print_bill')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BillSummary;
