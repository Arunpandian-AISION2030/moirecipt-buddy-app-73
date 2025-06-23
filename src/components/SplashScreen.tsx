
import { useLanguage } from "@/contexts/LanguageContext";

const SplashScreen = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-green-600 text-white relative overflow-hidden">
      {/* Animated background circles */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
      <div className="absolute bottom-32 right-16 w-24 h-24 bg-white/20 rounded-full animate-bounce"></div>
      <div className="absolute top-1/2 right-32 w-16 h-16 bg-white/15 rounded-full animate-ping"></div>
      
      {/* Main content */}
      <div className="text-center z-10 px-8">
        {/* Receipt animation */}
        <div className="mb-8 relative">
          <div className="w-24 h-32 bg-white rounded-lg shadow-2xl mx-auto transform rotate-6 animate-bounce">
            <div className="p-3 space-y-2">
              <div className="h-2 bg-gray-300 rounded"></div>
              <div className="h-1 bg-gray-200 rounded w-3/4"></div>
              <div className="h-1 bg-gray-200 rounded w-1/2"></div>
              <div className="h-1 bg-gray-200 rounded w-2/3"></div>
              <div className="border-t border-gray-300 pt-2 mt-3">
                <div className="h-2 bg-gray-400 rounded w-1/3 ml-auto"></div>
              </div>
            </div>
          </div>
          {/* Flying effect */}
          <div className="absolute -top-2 -right-2 text-2xl animate-pulse">✨</div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
          {t('splash_welcome')}
        </h1>
        <p className="text-xl md:text-2xl opacity-90 animate-fade-in animation-delay-300">
          {t('splash_subtitle')}
        </p>
      </div>

      {/* Loading indicator */}
      <div className="absolute bottom-20">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce animation-delay-150"></div>
          <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce animation-delay-300"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
