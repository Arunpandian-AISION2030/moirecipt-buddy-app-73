
import { Button } from "@/components/ui/button";
import { ArrowLeft, Languages, LogOut, Menu } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface MobileHeaderProps {
  title: string;
  onBack?: () => void;
  showBackButton?: boolean;
  showMenu?: boolean;
}

const MobileHeader = ({ title, onBack, showBackButton = false, showMenu = false }: MobileHeaderProps) => {
  const { t, toggleLanguage, language } = useLanguage();
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white sticky top-0 z-50 shadow-lg">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBackButton && onBack && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-white hover:bg-white/20 p-2 h-auto"
            >
              <ArrowLeft size={20} />
            </Button>
          )}
          
          {showMenu && (
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20 p-2 h-auto"
                >
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle className="text-left">MOIRECIPT</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  <Button
                    variant="outline"
                    onClick={() => navigate('/')}
                    className="w-full justify-start"
                  >
                    {t('dashboard_title')}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate('/bills')}
                    className="w-full justify-start"
                  >
                    {t('bills_menu')}
                  </Button>
                  <div className="border-t pt-4">
                    <Button
                      variant="outline"
                      onClick={handleLogout}
                      className="w-full justify-start text-red-600 hover:text-red-700"
                    >
                      <LogOut size={16} className="mr-2" />
                      {t('logout') || 'Logout'}
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          )}
          
          <h1 className="text-lg font-bold truncate">{title}</h1>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
            className="flex items-center gap-1 text-blue-600 border-white/30 hover:bg-white/10 hover:text-white text-xs px-2 py-1 h-8"
          >
            <Languages size={14} />
            <span className="hidden xs:inline">{language === 'en' ? 'தமிழ்' : 'EN'}</span>
          </Button>
        </div>
      </div>
      
      {user && (
        <div className="px-4 pb-2">
          <p className="text-blue-100 text-xs truncate">Welcome, {user.loginId}</p>
        </div>
      )}
    </div>
  );
};

export default MobileHeader;
