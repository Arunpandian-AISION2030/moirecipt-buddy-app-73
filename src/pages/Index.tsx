
import { LanguageProvider } from "@/contexts/LanguageContext";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
        <Dashboard />
      </div>
    </LanguageProvider>
  );
};

export default Index;
