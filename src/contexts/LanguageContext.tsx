
import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ta';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Splash Screen
    splash_welcome: "Welcome to Moirecipt",
    splash_subtitle: "Your Receipt's New Best Friend!",
    
    // Onboarding
    onboarding_slide1_title: "Snap your receipt in seconds 📸",
    onboarding_slide2_title: "Save and sort receipts safely 🔒", 
    onboarding_slide3_title: "Track your spending, the easy way 💸",
    get_started: "Get Started",
    next: "Next",
    skip: "Skip",
    
    // Dashboard
    dashboard_title: "Your Receipts at a Glance 👀",
    recent_receipts: "Recent Receipts",
    monthly_summary: "Monthly Summary",
    add_receipt: "Add New Receipt",
    total_spent: "Total Spent",
    this_month: "This Month",
    
    // Categories
    food: "Food",
    travel: "Travel", 
    shopping: "Shopping",
    bills: "Bills",
    
    // Actions
    snap_now: "Snap Now",
    upload: "Upload",
    edit: "Edit",
    share: "Share",
    download_pdf: "Download as PDF",
    
    // Empty states
    no_receipts: "No receipts yet. Let's change that!",
    
    // Login
    login_title: "Hey there! Let's log you in.",
    login_google: "Login with Google",
  },
  ta: {
    // Splash Screen  
    splash_welcome: "மோஇரிசிப்ட்-க்கு வரவேற்கிறோம்",
    splash_subtitle: "உங்கள் ரசீது இனிமேல் என் பாட்டுக்கு!",
    
    // Onboarding
    onboarding_slide1_title: "ரசீதை பளீச் என ஒரு கிளிக்கில் பிடிக்கலாம்! 📸",
    onboarding_slide2_title: "உங்கள் ரசீதுகள் பாதுகாப்பாக சேமிக்கப்படும்! 🔒",
    onboarding_slide3_title: "செலவுகளை எளிதாக கண்காணிக்கலாம்! 💸", 
    get_started: "ஆரம்பிக்கலாம்",
    next: "அடுத்து",
    skip: "தவிர்",
    
    // Dashboard
    dashboard_title: "உங்கள் ரசீதுகள்—all in one sight! 👀",
    recent_receipts: "புதிய ரசீதுகள்",
    monthly_summary: "மாத செலவுகள்", 
    add_receipt: "புதிய ரசீது சேர்க்க",
    total_spent: "மொத்த செலவு",
    this_month: "இந்த மாதம்",
    
    // Categories
    food: "சாப்பாடு",
    travel: "பயணம்",
    shopping: "ஷாப்பிங்", 
    bills: "பில்கள்",
    
    // Actions
    snap_now: "இப்போதே எடு!",
    upload: "ஊடுருவு படம் சேர்!",
    edit: "மாற்று",
    share: "பகிர்",
    download_pdf: "PDF ஆக இறக்குமதி செய்",
    
    // Empty states
    no_receipts: "இன்னும் ரசீதுகள் இல்ல... வாங்க ஒரு புதியதை சேர்!",
    
    // Login
    login_title: "வாங்க நண்பா! உள்ளே போயிடலாம்.",
    login_google: "கூகிள் கொண்டு நுழையுங்கள்",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ta' : 'en');
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
