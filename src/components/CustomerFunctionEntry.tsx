import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, ArrowRight, User, Languages, History } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import CustomerFunctionHistory from "./CustomerFunctionHistory";
import { useIsMobile } from "@/hooks/use-mobile";

export interface CustomerFunctionData {
  customerName: string;
  mobileNumber: string;
  functionType: string;
  functionDate: Date | undefined;
  venuePlace: string;
}

interface CustomerFunctionEntryProps {
  onBack: () => void;
  onNext: (data: CustomerFunctionData) => void;
}

const CustomerFunctionEntry = ({ onBack, onNext }: CustomerFunctionEntryProps) => {
  const { t, toggleLanguage, language } = useLanguage();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const [formData, setFormData] = useState<CustomerFunctionData>({
    customerName: "",
    mobileNumber: "",
    functionType: "",
    functionDate: undefined,
    venuePlace: "",
  });

  const handleInputChange = (field: keyof CustomerFunctionData, value: string | Date | undefined) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const required = ['customerName', 'mobileNumber', 'functionType', 'functionDate', 'venuePlace'];
    for (const field of required) {
      if (!formData[field as keyof CustomerFunctionData]) {
        toast({
          title: t('validation_error'),
          description: t('required_field'),
          variant: "destructive",
        });
        return false;
      }
    }
    
    if (formData.mobileNumber && !/^\d{10}$/.test(formData.mobileNumber)) {
      toast({
        title: t('validation_error'),
        description: t('invalid_contact'),
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  const handleNext = () => {
    if (validateForm()) {
      // Save to localStorage for history
      const existingHistory = JSON.parse(localStorage.getItem('customerFunctionHistory') || '[]');
      const newEntry = {
        ...formData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      };
      existingHistory.unshift(newEntry);
      localStorage.setItem('customerFunctionHistory', JSON.stringify(existingHistory.slice(0, 50))); // Keep only last 50 entries
      
      onNext(formData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-white hover:bg-white/20 p-2"
            >
              <ArrowLeft size={20} />
            </Button>
            <div className="flex items-center gap-2">
              <User size={20} className="sm:w-6 sm:h-6" />
              <h1 className="text-lg sm:text-xl font-bold">{t('customer_function_entry')}</h1>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
            className="flex items-center gap-2 text-blue-600 border-white/30 hover:bg-white/10 hover:text-white text-xs sm:text-sm"
          >
            <Languages size={16} />
            {language === 'en' ? 'தமிழ்' : 'EN'}
          </Button>
        </div>
      </div>

      {/* Main Content with Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Card className="shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-blue-100 to-purple-100">
            <CardTitle className="text-xl sm:text-2xl text-center text-blue-800">
              {t('customer_function_management')}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <Tabs defaultValue="entry" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="entry" className="flex items-center gap-2">
                  <User size={16} />
                  {isMobile ? null : t('new_entry')}
                </TabsTrigger>
                <TabsTrigger value="history" className="flex items-center gap-2">
                  <History size={16} />
                  {isMobile ? null : t('previous_entries')}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="entry" className="space-y-6">
                <h3 className="text-lg font-semibold text-center text-blue-700 mb-4">
                  {t('step_1_customer_function')}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {/* Customer Name */}
                  <div>
                    <Label htmlFor="customerName" className="text-sm font-medium text-gray-700">
                      {t('customer_name')} *
                    </Label>
                    <Input
                      id="customerName"
                      value={formData.customerName}
                      onChange={(e) => handleInputChange('customerName', e.target.value)}
                      className="mt-1"
                      placeholder={t('enter_customer_name')}
                    />
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <Label htmlFor="mobileNumber" className="text-sm font-medium text-gray-700">
                      {t('mobile_number')} *
                    </Label>
                    <Input
                      id="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                      className="mt-1"
                      placeholder={t('mobile_placeholder')}
                      maxLength={10}
                    />
                  </div>

                  {/* Function Type */}
                  <div>
                    <Label htmlFor="functionType" className="text-sm font-medium text-gray-700">
                      {t('function_type')} *
                    </Label>
                    <select
                      id="functionType"
                      value={formData.functionType}
                      onChange={(e) => handleInputChange('functionType', e.target.value)}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">{t('select_function_type')}</option>
                      <option value="wedding">{t('wedding')}</option>
                      <option value="puberty">{t('puberty')}</option>
                      <option value="birthday">{t('birthday')}</option>
                      <option value="anniversary">{t('anniversary')}</option>
                      <option value="engagement">{t('engagement')}</option>
                      <option value="housewarming">{t('housewarming')}</option>
                      <option value="other">{t('other')}</option>
                    </select>
                  </div>

                  {/* Function Date */}
                  <div>
                    <Label htmlFor="functionDate" className="text-sm font-medium text-gray-700">
                      {t('function_date')} *
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal mt-1",
                            !formData.functionDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.functionDate ? format(formData.functionDate, "PPP") : <span>{t('pick_date')}</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.functionDate}
                          onSelect={(date) => handleInputChange('functionDate', date)}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Venue/Place - Full Width */}
                  <div className="md:col-span-2">
                    <Label htmlFor="venuePlace" className="text-sm font-medium text-gray-700">
                      {t('venue_place')} *
                    </Label>
                    <Input
                      id="venuePlace"
                      value={formData.venuePlace}
                      onChange={(e) => handleInputChange('venuePlace', e.target.value)}
                      className="mt-1"
                      placeholder={t('enter_venue_address')}
                    />
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex justify-end mt-6 sm:mt-8">
                  <Button
                    onClick={handleNext}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-2"
                  >
                    {t('next_step')}
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="history">
                <CustomerFunctionHistory />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerFunctionEntry;
