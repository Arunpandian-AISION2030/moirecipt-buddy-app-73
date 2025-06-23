
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

    // Bill Entry Form
    bill_entry_title: "Event Bill Entry 🎉",
    client_name: "S.O. / D.O. Name",
    native_place: "Native Place",
    function_type: "Function Type",
    function_date: "Date of Function",
    venue_details: "Venue Name & Address",
    contact_number: "Contact Number",
    services_provided: "Items / Services Provided",
    total_amount: "Amount Charged",
    advance_paid: "Advance Paid",
    balance_due: "Balance Due",
    payment_mode: "Payment Mode",
    
    // Function Types
    wedding: "Wedding",
    birthday: "Birthday",
    anniversary: "Anniversary",
    other: "Other",
    
    // Payment Modes
    cash: "Cash",
    gpay: "GPay",
    cheque: "Cheque",
    upi: "UPI",
    
    // Bill Summary
    bill_summary_title: "Event Bill Summary",
    invoice_number: "Invoice No.",
    thank_you_message: "Thank you for choosing us! Wishing you a beautiful celebration!",
    
    // Actions
    create_bill: "Create Bill",
    save_bill: "Save Bill",
    print_bill: "Print Bill",
    share_whatsapp: "Share via WhatsApp",
    view_summary: "View Summary",
    edit_bill: "Edit Bill",
    
    // Navigation
    bills_menu: "Event Bills",
    receipts_menu: "Receipts",
    back: "Back",
    
    // Form validation
    required_field: "This field is required",
    invalid_amount: "Please enter a valid amount",
    invalid_contact: "Please enter a valid contact number",
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

    // Bill Entry Form
    bill_entry_title: "விழா பில் என்ட்ரி 🎉",
    client_name: "பெயர் (அப்பாவின் பெயர் உடன்)",
    native_place: "ஊர் / சொந்த இடம்",
    function_type: "நிகழ்ச்சி வகை",
    function_date: "விழா தேதி",
    venue_details: "விழா நடக்கும் இடம்",
    contact_number: "தொடர்பு எண்",
    services_provided: "வழங்கிய சேவைகள்",
    total_amount: "பணம் (மொத்தம்)",
    advance_paid: "முன்பணம்",
    balance_due: "மீதி பணம்",
    payment_mode: "பணம் கொடுத்த விதம்",
    
    // Function Types
    wedding: "திருமணம்",
    birthday: "வயது விழா",
    anniversary: "ஆண்டு விழா",
    other: "மற்றவை",
    
    // Payment Modes
    cash: "பணம்",
    gpay: "GPay",
    cheque: "காசோலை",
    upi: "UPI",
    
    // Bill Summary
    bill_summary_title: "விழா பில் சுருக்கம்",
    invoice_number: "பில் எண்.",
    thank_you_message: "எங்களை தேர்ந்தெடுத்ததற்கு நன்றி! உங்கள் விழா இனிதாக நடைபெற வாழ்த்துகள்!",
    
    // Actions
    create_bill: "பில் உருவாக்கு",
    save_bill: "பில் சேமி",
    print_bill: "பில் அச்சிடு",
    share_whatsapp: "WhatsApp மூலம் பகிர்",
    view_summary: "சுருக்கம் பார்",
    edit_bill: "பில் மாற்று",
    
    // Navigation
    bills_menu: "விழா பில்கள்",
    receipts_menu: "ரசீதுகள்",
    back: "பின்னால்",
    
    // Form validation
    required_field: "இந்த புலம் அவசியம்",
    invalid_amount: "சரியான தொகையை உள்ளிடவும்",
    invalid_contact: "சரியான தொடர்பு எண்ணை உள்ளிடவும்",
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
