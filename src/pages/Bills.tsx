
import { useState } from "react";
import BillEntryForm from "@/components/BillEntryForm";
import BillSummary from "@/components/BillSummary";
import CustomerFunctionEntry, { CustomerFunctionData } from "@/components/CustomerFunctionEntry";
import MOIReceiptEntry from "@/components/MOIReceiptEntry";

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
    window.history.back();
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

  // Menu View
  if (currentView === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
        <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-4">
          <div className="max-w-4xl mx-auto flex items-center gap-4">
            <button
              onClick={handleBackToDashboard}
              className="text-white hover:bg-white/20 p-2 rounded"
            >
              ←
            </button>
            <h1 className="text-xl font-bold">Bill Management</h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Choose Bill Type</h2>
            <p className="text-gray-600">Select the type of billing you want to create</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* MOI Receipt Option */}
            <div 
              onClick={() => setCurrentView('customer-function')}
              className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-6 rounded-lg shadow-xl cursor-pointer hover:scale-105 transition-transform duration-200"
            >
              <div className="text-center">
                <div className="text-4xl mb-4">🧾</div>
                <h3 className="text-xl font-bold mb-2">MOI Receipt Entry</h3>
                <p className="text-green-100">Record individual contributions for functions</p>
                <div className="mt-4 text-sm text-green-200">
                  Step 1: Customer & Function → Step 2: MOI Receipts
                </div>
              </div>
            </div>

            {/* Traditional Bill Option */}
            <div 
              onClick={() => setCurrentView('form')}
              className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-6 rounded-lg shadow-xl cursor-pointer hover:scale-105 transition-transform duration-200"
            >
              <div className="text-center">
                <div className="text-4xl mb-4">📋</div>
                <h3 className="text-xl font-bold mb-2">Traditional Bill</h3>
                <p className="text-orange-100">Create comprehensive event bills</p>
                <div className="mt-4 text-sm text-orange-200">
                  Single form with all billing details
                </div>
              </div>
            </div>
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
