import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { Camera, Upload, Plus, TrendingUp, Receipt, Languages, PartyPopper, FileText, Home, LogOut } from "lucide-react";
import AddReceiptModal from "./AddReceiptModal";
import MobileHeader from "./MobileHeader";
import MobileCard from "./MobileCard";

const Dashboard = () => {
  const { t, toggleLanguage, language } = useLanguage();
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [showAddReceipt, setShowAddReceipt] = useState(false);

  // Mock data for demonstration
  const recentReceipts = [
    { id: 1, store: "Coffee Shop", amount: "₹150", category: t('food'), date: t('today') },
    { id: 2, store: "Metro Station", amount: "₹45", category: t('travel'), date: t('yesterday') },
    { id: 3, store: "Grocery Store", amount: "₹890", category: t('food'), date: t('two_days_ago') },
  ];

  const monthlyTotal = "₹2,340";

  const handleNavigateToBills = () => {
    navigate('/bills');
  };

  const handleNavigateToReceipts = () => {
    console.log('Already on receipts page');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (isMobile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
        <MobileHeader 
          title="MOIRECIPT" 
          showMenu={true}
        />

        <div className="p-4 space-y-6">
          {/* Welcome section */}
          <div className="text-center py-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {t('dashboard_title')}
            </h2>
            <p className="text-sm text-gray-600">{t('dashboard_subtitle')}</p>
          </div>

          {/* Main Navigation Cards */}
          <div className="space-y-4">
            <MobileCard
              title={t('receipts_menu')}
              icon={<Receipt size={24} />}
              description={t('receipts_description')}
              onClick={handleNavigateToReceipts}
              gradient="bg-gradient-to-r from-blue-500 to-purple-600"
            >
              <div className="text-blue-100 text-sm">{t('receipts_subtitle')}</div>
            </MobileCard>

            <MobileCard
              title={t('bills_menu')}
              icon={<PartyPopper size={24} />}
              description={t('bills_description')}
              onClick={handleNavigateToBills}
              gradient="bg-gradient-to-r from-orange-500 to-red-600"
            >
              <div className="text-orange-100 text-sm">{t('bills_subtitle')}</div>
            </MobileCard>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-1 gap-4">
            <Card className="bg-gradient-to-r from-green-500 to-blue-600 text-white border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <TrendingUp size={20} />
                  {t('monthly_summary')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-1">{monthlyTotal}</div>
                <div className="text-green-100 text-sm">{t('this_month')}</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <FileText size={20} />
                  {t('recent_activity')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-1">{recentReceipts.length}</div>
                <div className="text-purple-100 text-sm">{t('items_this_week')}</div>
              </CardContent>
            </Card>
          </div>

          {/* Quick actions for receipts */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">{t('add_receipt')}</h3>
            <div className="space-y-3">
              <Button
                onClick={() => setShowAddReceipt(true)}
                size="lg"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-14 text-lg font-semibold shadow-lg active:scale-95 transition-all duration-200"
              >
                <Camera className="mr-3" size={24} />
                {t('snap_now')}
              </Button>
              <Button
                onClick={() => setShowAddReceipt(true)}
                variant="outline"
                size="lg"
                className="w-full h-14 text-lg font-semibold border-2 border-purple-300 hover:border-purple-500 hover:bg-purple-50 active:scale-95 transition-all duration-200"
              >
                <Upload className="mr-3" size={24} />
                {t('upload')}
              </Button>
            </div>
          </div>

          {/* Recent receipts */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">{t('recent_receipts')}</h3>
            {recentReceipts.length > 0 ? (
              <div className="space-y-3">
                {recentReceipts.map((receipt) => (
                  <Card key={receipt.id} className="shadow-md active:scale-95 transition-all duration-200">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-800 text-base truncate">{receipt.store}</h4>
                          <p className="text-sm text-gray-600 truncate">{receipt.category} • {receipt.date}</p>
                        </div>
                        <div className="text-right ml-4">
                          <p className="font-bold text-lg text-gray-800">{receipt.amount}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="text-center py-8">
                <CardContent>
                  <div className="mb-4">
                    <Receipt size={48} className="mx-auto text-gray-400" />
                  </div>
                  <p className="text-gray-600 text-base mb-4">{t('no_receipts')}</p>
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
  }

  // Desktop version
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
      {/* Header - Responsive */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Home size={24} className="text-blue-600" />
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              MOIRECIPT
            </h1>
            {user && (
              <span className="text-sm text-gray-600 ml-4">
                Welcome, {user.email}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-2 text-xs sm:text-sm"
            >
              <LogOut size={16} />
              {t('logout') || 'Logout'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-xs sm:text-sm"
            >
              <Languages size={16} />
              {language === 'en' ? 'தமிழ்' : 'EN'}
            </Button>
          </div>
        </div>
      </div>

      {/* Main content - Responsive */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Welcome section - Responsive */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {t('dashboard_title')}
          </h2>
          <p className="text-sm sm:text-base text-gray-600">{t('dashboard_subtitle')}</p>
        </div>

        {/* Main Navigation Cards - Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card 
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 shadow-xl cursor-pointer hover:scale-105 transition-transform duration-200"
            onClick={handleNavigateToReceipts}
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Receipt size={20} className="sm:w-6 sm:h-6" />
                {t('receipts_menu')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-base sm:text-lg mb-1">{t('receipts_description')}</div>
              <div className="text-blue-100 text-sm sm:text-base">{t('receipts_subtitle')}</div>
            </CardContent>
          </Card>

          <Card 
            className="bg-gradient-to-r from-orange-500 to-red-600 text-white border-0 shadow-xl cursor-pointer hover:scale-105 transition-transform duration-200"
            onClick={handleNavigateToBills}
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <PartyPopper size={20} className="sm:w-6 sm:h-6" />
                {t('bills_menu')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-base sm:text-lg mb-1">{t('bills_description')}</div>
              <div className="text-orange-100 text-sm sm:text-base">{t('bills_subtitle')}</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick stats - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="bg-gradient-to-r from-green-500 to-blue-600 text-white border-0 shadow-xl">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <TrendingUp size={20} className="sm:w-6 sm:h-6" />
                {t('monthly_summary')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-bold mb-1">{monthlyTotal}</div>
              <div className="text-green-100 text-sm sm:text-base">{t('this_month')}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0 shadow-xl">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <FileText size={20} className="sm:w-6 sm:h-6" />
                {t('recent_activity')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-bold mb-1">{recentReceipts.length}</div>
              <div className="text-purple-100 text-sm sm:text-base">{t('items_this_week')}</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick actions for receipts - Responsive */}
        <div className="mb-6 sm:mb-8">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">{t('add_receipt')}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <Button
              onClick={() => setShowAddReceipt(true)}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-14 sm:h-16 text-base sm:text-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <Camera className="mr-2 sm:mr-3" size={20} />
              {t('snap_now')}
            </Button>
            <Button
              onClick={() => setShowAddReceipt(true)}
              variant="outline"
              size="lg"
              className="h-14 sm:h-16 text-base sm:text-lg font-semibold border-2 border-purple-300 hover:border-purple-500 hover:bg-purple-50 transform hover:scale-105 transition-all duration-200"
            >
              <Upload className="mr-2 sm:mr-3" size={20} />
              {t('upload')}
            </Button>
          </div>
        </div>

        {/* Recent receipts - Responsive */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">{t('recent_receipts')}</h3>
          {recentReceipts.length > 0 ? (
            <div className="space-y-3 sm:space-y-4">
              {recentReceipts.map((receipt) => (
                <Card key={receipt.id} className="hover:shadow-lg transition-shadow duration-200">
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-800 text-sm sm:text-base truncate">{receipt.store}</h4>
                        <p className="text-xs sm:text-sm text-gray-600 truncate">{receipt.category} • {receipt.date}</p>
                      </div>
                      <div className="text-right ml-4">
                        <p className="font-bold text-base sm:text-lg text-gray-800">{receipt.amount}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center py-8 sm:py-12">
              <CardContent>
                <div className="mb-4">
                  <Receipt size={48} className="sm:w-16 sm:h-16 mx-auto text-gray-400" />
                </div>
                <p className="text-gray-600 text-base sm:text-lg mb-4">{t('no_receipts')}</p>
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
