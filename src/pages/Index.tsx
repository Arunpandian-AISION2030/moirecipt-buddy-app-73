
import { useState, useEffect } from "react";
import SplashScreen from "@/components/SplashScreen";
import OnboardingCarousel from "@/components/OnboardingCarousel";
import Dashboard from "@/components/Dashboard";
import { LanguageProvider } from "@/contexts/LanguageContext";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<'splash' | 'onboarding' | 'dashboard'>('splash');

  useEffect(() => {
    // Show splash for 3 seconds
    const splashTimer = setTimeout(() => {
      setCurrentScreen('onboarding');
    }, 3000);

    return () => clearTimeout(splashTimer);
  }, []);

  const handleOnboardingComplete = () => {
    setCurrentScreen('dashboard');
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
        {currentScreen === 'splash' && <SplashScreen />}
        {currentScreen === 'onboarding' && <OnboardingCarousel onComplete={handleOnboardingComplete} />}
        {currentScreen === 'dashboard' && <Dashboard />}
      </div>
    </LanguageProvider>
  );
};

export default Index;
