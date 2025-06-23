
import { useState } from "react";
import BillEntryForm from "@/components/BillEntryForm";
import BillSummary from "@/components/BillSummary";

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

const Bills = () => {
  const [currentView, setCurrentView] = useState<'form' | 'summary'>('form');
  const [currentBillData, setCurrentBillData] = useState<BillData | null>(null);

  const handleViewSummary = (billData: BillData) => {
    setCurrentBillData(billData);
    setCurrentView('summary');
  };

  const handleBackToForm = () => {
    setCurrentView('form');
  };

  const handleBackToDashboard = () => {
    // This will be handled by the router
    window.history.back();
  };

  if (currentView === 'summary' && currentBillData) {
    return (
      <BillSummary 
        billData={currentBillData}
        onBack={handleBackToForm}
      />
    );
  }

  return (
    <BillEntryForm 
      onBack={handleBackToDashboard}
      onViewSummary={handleViewSummary}
    />
  );
};

export default Bills;
