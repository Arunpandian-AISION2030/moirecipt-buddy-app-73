import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BillEntryForm from "@/components/BillEntryForm";
import BillSummary from "@/components/BillSummary";
import CustomerFunctionEntry, { CustomerFunctionData } from "@/components/CustomerFunctionEntry";
import MOIReceiptEntry from "@/components/MOIReceiptEntry";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Languages, FileText, Receipt, Database } from "lucide-react";
import { saveFullEntry } from "@/lib/supabase";
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

type ViewType = 'menu' | 'customer-function' | 'moi-receipt' | 'form' | 'summary';

const Bills = () => {
  const { t, toggleLanguage, language } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentView, setCurrentView] = useState<ViewType>('menu');
  const [currentBillData, setCurrentBillData] = useState<BillData | null>(null);
  const [customerFunctionData, setCustomerFunctionData] = useState<CustomerFunctionData | null>(null);

  const handleViewSummary = (billData: BillData) => {
    setCurrentBillData(billData);
    setCurrentView('summary');
  };

  const handleBackToForm = () => {
    setCurrentView('form');
  };

  const handleBackToDashboard = () => {
    navigate('/');
  };

  const handleBackToMenu = () => {
    setCurrentView('menu');
  };

  const handleCustomerFunctionNext = (data: CustomerFunctionData) => {
    setCustomerFunctionData(data);
    setCurrentView('moi-receipt');
  };

  const handleMOIReceiptBack = () => {
    setCurrentView('customer-function');
  };

  const handleSaveFullEntry = async () => {
    try {
      const result = await saveFullEntry();
      if (result.success) {
        toast({
          title: "Success!",
          description: "Full entry saved successfully to Supabase",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to save entry",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error calling saveFullEntry:', error);
      toast({
        title: "Error",
        description: "Failed to save entry",
        variant: "destructive",
      });
    }
  };

  // Menu View
  if (currentView === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
        {/* Header - Responsive */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4">
              <Button
                onClick={handleBackToDashboard}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 p-2"
              >
                <ArrowLeft size={20} />
              </Button>
              <h1 className="text-lg sm:text-xl font-bold">{t('bills_menu')}</h1>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-orange-600 border-white/30 hover:bg-white/10 hover:text-white text-xs sm:text-sm"
            >
              <Languages size={16} />
              {language === 'en' ? 'தமிழ்' : 'EN'}
            </Button>
          </div>
        </div>

        {/* Main Content - Responsive */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">{t('choose_bill_type')}</h2>
            <p className="text-sm sm:text-base text-gray-600">{t('choose_bill_type')}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
            {/* MOI Receipt Option */}
            <Card 
              onClick={() => setCurrentView('customer-function')}
              className="bg-gradient-to-r from-green-500 to-blue-600 text-white border-0 shadow-xl cursor-pointer hover:scale-105 transition-transform duration-200"
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Receipt size={20} className="sm:w-6 sm:h-6" />
                  {t('moi_receipt_entry')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl mb-4">🧾</div>
                  <p className="text-green-100 text-sm sm:text-base mb-4">{t('moi_receipt_description')}</p>
                  <div className="text-xs sm:text-sm text-green-200">
                    {t('step_process')}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Traditional Bill Option */}
            <Card 
              onClick={() => setCurrentView('form')}
              className="bg-gradient-to-r from-orange-500 to-red-600 text-white border-0 shadow-xl cursor-pointer hover:scale-105 transition-transform duration-200"
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <FileText size={20} className="sm:w-6 sm:h-6" />
                  {t('traditional_bill')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl mb-4">📋</div>
                  <p className="text-orange-100 text-sm sm:text-base mb-4">{t('traditional_bill_description')}</p>
                  <div className="text-xs sm:text-sm text-orange-200">
                    {t('single_form')}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Test Supabase Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleSaveFullEntry}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg shadow-lg"
            >
              <Database className="mr-2" size={20} />
              Test Supabase Connection
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Customer Function Entry View
  if (currentView === 'customer-function') {
    return (
      <CustomerFunctionEntry 
        onBack={handleBackToMenu}
        onNext={handleCustomerFunctionNext}
      />
    );
  }

  // MOI Receipt Entry View
  if (currentView === 'moi-receipt' && customerFunctionData) {
    return (
      <MOIReceiptEntry 
        onBack={handleMOIReceiptBack}
        customerData={customerFunctionData}
      />
    );
  }

  // Bill Summary View
  if (currentView === 'summary' && currentBillData) {
    return (
      <BillSummary 
        billData={currentBillData}
        onBack={handleBackToForm}
      />
    );
  }

  // Traditional Bill Entry Form View
  return (
    <BillEntryForm 
      onBack={handleBackToMenu}
      onViewSummary={handleViewSummary}
    />
  );
};

export default Bills;
