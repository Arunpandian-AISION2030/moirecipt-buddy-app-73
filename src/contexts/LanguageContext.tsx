
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
    dashboard_title: "Your Receipts & Bills Hub 📋",
    dashboard_subtitle: "Manage receipts and event billing in one place",
    recent_receipts: "Recent Receipts",
    recent_activity: "Recent Activity",
    monthly_summary: "Monthly Summary",
    add_receipt: "Add New Receipt",
    total_spent: "Total Spent",
    this_month: "This Month",
    items_this_week: "Items this week",
    
    // Navigation & Descriptions
    receipts_menu: "Receipts",
    receipts_description: "Regular receipts & expenses",
    receipts_subtitle: "Snap, save, track",
    bills_menu: "Event Bills",
    bills_description: "Wedding & event billing",
    bills_subtitle: "Professional invoices",
    
    // Time references
    today: "Today",
    yesterday: "Yesterday",
    two_days_ago: "2 days ago",
    
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
    back: "Back",
    home: "Home",
    settings: "Settings",
    
    // Form validation
    required_field: "This field is required",
    invalid_amount: "Please enter a valid amount",
    invalid_contact: "Please enter a valid contact number",

    // Bluetooth Printer
    bluetooth_printer: "Bluetooth Printer",
    scan_printers: "Scan for Printers",
    scanning: "Scanning...",
    printer_found: "Printer Found!",
    no_printers_found: "No Printers Found",
    printer_connected: "Printer Connected!",
    connection_failed: "Connection Failed",
    printer_disconnected: "Printer Disconnected",
    disconnect_failed: "Disconnect Failed",
    connected: "Connected",
    not_connected: "Not Connected",
    disconnect: "Disconnect",
    available_printers: "Available Printers:",
    bluetooth_print: "Bluetooth Print",
    print_successful: "Print Successful!",
    print_failed: "Print Failed",
    printer_not_connected: "Printer Not Connected",
    connect_printer_first: "Please connect a Bluetooth printer first",
    receipt_printed: "Receipt Printed!",
    summary_printed: "Summary Printed!",

    // MOI Receipt specific
    moi_receipt_entry: "MOI Receipt Entry",
    customer_function_entry: "Customer & Function Entry",
    choose_bill_type: "Choose Bill Type",
    traditional_bill: "Traditional Bill",
    moi_receipt_description: "Record individual contributions for functions",
    traditional_bill_description: "Create comprehensive event bills",
    step_process: "Step 1: Customer & Function → Step 2: MOI Receipts",
    single_form: "Single form with all billing details",
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
    dashboard_title: "உங்கள் ரசீது & பில் மையம் 📋",
    dashboard_subtitle: "ரசீதுகள் மற்றும் நிகழ்ச்சி பில்லிங் ஒரே இடத்தில்",
    recent_receipts: "புதிய ரசீதுகள்",
    recent_activity: "சமீபத்திய செயல்பாடு",
    monthly_summary: "மாத செலவுகள்", 
    add_receipt: "புதிய ரசீது சேர்க்க",
    total_spent: "மொத்த செலவு",
    this_month: "இந்த மாதம்",
    items_this_week: "இந்த வாரம் பொருட்கள்",
    
    // Navigation & Descriptions
    receipts_menu: "ரசீதுகள்",
    receipts_description: "வழக்கமான ரசீதுகள் & செலவுகள்",
    receipts_subtitle: "எடு, சேமி, கண்காணி",
    bills_menu: "விழா பில்கள்",
    bills_description: "திருமணம் & நிகழ்ச்சி பில்லிங்",
    bills_subtitle: "தொழில்முறை பில்கள்",
    
    // Time references
    today: "இன்று",
    yesterday: "நேற்று",
    two_days_ago: "2 நாட்களுக்கு முன்",
    
    // Categories
    food: "சாப்பாடு",
    travel: "பயணம்",
    shopping: "ஷாப்பிங்", 
    bills: "பில்கள்",
    
    // Actions
    snap_now: "இப்போதே எடு!",
    upload: "பதிவேற்று",
    edit: "மாற்று",
    share: "பகிர்",
    download_pdf: "PDF ஆக இறக்கு",
    
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
    back: "பின்னால்",
    home: "வீடு",
    settings: "அமைப்புகள்",
    
    // Form validation
    required_field: "இந்த புலம் அவசியம்",
    invalid_amount: "சரியான தொகையை உள்ளிடவும்",
    invalid_contact: "சரியான தொடர்பு எண்ணை உள்ளிடவும்",

    // Bluetooth Printer
    bluetooth_printer: "Bluetooth பிரிண்டர்",
    scan_printers: "பிரிண்டர் தேடு",
    scanning: "ஸ்கேன் செய்கிறது...",
    printer_found: "பிரிண்டர் கண்டுபிடிக்கப்பட்டது!",
    no_printers_found: "பிரிண்டர் இல்லை",
    printer_connected: "பிரிண்டர் இணைக்கப்பட்டது!",
    connection_failed: "இணைப்பு தோல்வி",
    printer_disconnected: "பிரிண்டர் துண்டிக்கப்பட்டது",
    disconnect_failed: "துண்டிப்பு தோல்வி",
    connected: "இணைக்கப்பட்டது",
    not_connected: "இணைக்கப்படவில்லை",
    disconnect: "துண்டி",
    available_printers: "கிடைத்த பிரிண்டர்கள்:",
    bluetooth_print: "Bluetooth பிரிண்ட்",
    print_successful: "பிரிண்ட் வெற்றிகரமாக!",
    print_failed: "பிரிண்ட் தோல்வி",
    printer_not_connected: "பிரிண்டர் இணைக்கப்படவில்லை",
    connect_printer_first: "முதலில் Bluetooth பிரிண்டரை இணைக்கவும்",
    receipt_printed: "ரசீது அச்சிடப்பட்டது!",
    summary_printed: "சுருக்கம் அச்சிடப்பட்டது!",

    // MOI Receipt specific
    moi_receipt_entry: "MOI ரசீது என்ட்ரி",
    customer_function_entry: "வாடிக்கையாளர் & நிகழ்ச்சி என்ட்ரி",
    choose_bill_type: "பில் வகையை தேர்ந்தெடுக்கவும்",
    traditional_bill: "பாரம்பரிய பில்",
    moi_receipt_description: "நிகழ்ச்சிகளுக்கான தனிப்பட்ட பங்களிப்புகளை பதிவு செய்யவும்",
    traditional_bill_description: "விரிவான நிகழ்ச்சி பில்களை உருவாக்கவும்",
    step_process: "படி 1: வாடிக்கையாளர் & நிகழ்ச்சி → படி 2: MOI ரசீதுகள்",
    single_form: "அனைத்து பில்லிங் விவரங்களுடன் ஒற்றை படிவம்",
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
