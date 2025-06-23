
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Camera, Upload, Plus, TrendingUp, Receipt, Languages, PartyPopper, FileText } from "lucide-react";
import AddReceiptModal from "./AddReceiptModal";

const Dashboard = () => {
  const { t, toggleLanguage, language } = useLanguage();
  const [showAddReceipt, setShowAddReceipt] = useState(false);

  // Mock data for demonstration
  const recentReceipts = [
    { id: 1, store: "Coffee Shop", amount: "₹150", category: t('food'), date: "Today" },
    { id: 2, store: "Metro Station", amount: "₹45", category: t('travel'), date: "Yesterday" },
    { id: 3, store: "Grocery Store", amount: "₹890", category: t('food'), date: "2 days ago" },
  ];

  const monthlyTotal = "₹2,340";

  const handleNavigateToBills = () => {
    window.location.href = '/bills';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Moirecipt
          </h1>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
            className="flex items-center gap-2"
          >
            <Languages size={16} />
            {language === 'en' ? 'தமிழ்' : 'EN'}
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Welcome section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {t('dashboard_title')}
          </h2>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card 
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 shadow-xl cursor-pointer hover:scale-105 transition-transform duration-200"
            onClick={() => {/* Keep current receipt functionality */}}
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Receipt size={24} />
                {t('receipts_menu')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg mb-1">Regular receipts & expenses</div>
              <div className="text-blue-100">Snap, save, track</div>
            </CardContent>
          </Card>

          <Card 
            className="bg-gradient-to-r from-orange-500 to-red-600 text-white border-0 shadow-xl cursor-pointer hover:scale-105 transition-transform duration-200"
            onClick={handleNavigateToBills}
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <PartyPopper size={24} />
                {t('bills_menu')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg mb-1">Wedding & event billing</div>
              <div className="text-orange-100">Professional invoices</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-green-500 to-blue-600 text-white border-0 shadow-xl">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp size={24} />
                {t('monthly_summary')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">{monthlyTotal}</div>
              <div className="text-green-100">{t('this_month')}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0 shadow-xl">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText size={24} />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">{recentReceipts.length}</div>
              <div className="text-purple-100">Items this week</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick actions for receipts */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">{t('add_receipt')}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button
              onClick={() => setShowAddReceipt(true)}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-16 text-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <Camera className="mr-3" size={24} />
              {t('snap_now')}
            </Button>
            <Button
              onClick={() => setShowAddReceipt(true)}
              variant="outline"
              size="lg"
              className="h-16 text-lg font-semibold border-2 border-purple-300 hover:border-purple-500 hover:bg-purple-50 transform hover:scale-105 transition-all duration-200"
            >
              <Upload className="mr-3" size={24} />
              {t('upload')}
            </Button>
          </div>
        </div>

        {/* Recent receipts */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">{t('recent_receipts')}</h3>
          {recentReceipts.length > 0 ? (
            <div className="space-y-4">
              {recentReceipts.map((receipt) => (
                <Card key={receipt.id} className="hover:shadow-lg transition-shadow duration-200">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-gray-800">{receipt.store}</h4>
                        <p className="text-sm text-gray-600">{receipt.category} • {receipt.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-gray-800">{receipt.amount}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <div className="mb-4">
                  <Receipt size={64} className="mx-auto text-gray-400" />
                </div>
                <p className="text-gray-600 text-lg mb-4">{t('no_receipts')}</p>
                <Button
                  onClick={() => setShowAddReceipt(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  <Plus className="mr-2" size={20} />
                  {t('add_receipt')}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Add Receipt Modal */}
      <AddReceiptModal 
        open={showAddReceipt} 
        onOpenChange={setShowAddReceipt} 
      />
    </div>
  );
};

export default Dashboard;
