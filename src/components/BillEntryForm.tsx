
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, Save, Eye, PartyPopper } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BillData {
  clientName: string;
  nativePlace: string;
  functionType: string;
  functionDate: string;
  venueDetails: string;
  contactNumber: string;
  servicesProvided: string;
  totalAmount: string;
  advancePaid: string;
  balanceDue: string;
  paymentMode: string;
}

interface BillEntryFormProps {
  onBack: () => void;
  onViewSummary: (billData: BillData) => void;
}

const BillEntryForm = ({ onBack, onViewSummary }: BillEntryFormProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<BillData>({
    clientName: "",
    nativePlace: "",
    functionType: "",
    functionDate: "",
    venueDetails: "",
    contactNumber: "",
    servicesProvided: "",
    totalAmount: "",
    advancePaid: "",
    balanceDue: "",
    paymentMode: "",
  });

  const handleInputChange = (field: keyof BillData, value: string) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      
      // Auto-calculate balance when total amount or advance changes
      if (field === 'totalAmount' || field === 'advancePaid') {
        const total = parseFloat(updated.totalAmount) || 0;
        const advance = parseFloat(updated.advancePaid) || 0;
        updated.balanceDue = (total - advance).toString();
      }
      
      return updated;
    });
  };

  const validateForm = () => {
    const required = ['clientName', 'functionType', 'functionDate', 'totalAmount'];
    for (const field of required) {
      if (!formData[field as keyof BillData]) {
        toast({
          title: "Validation Error",
          description: t('required_field'),
          variant: "destructive",
        });
        return false;
      }
    }
    
    if (formData.contactNumber && !/^\d{10}$/.test(formData.contactNumber)) {
      toast({
        title: "Validation Error",
        description: t('invalid_contact'),
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  const handleSave = () => {
    if (validateForm()) {
      toast({
        title: "Success",
        description: "Bill saved successfully!",
      });
    }
  };

  const handleViewSummary = () => {
    if (validateForm()) {
      onViewSummary(formData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="flex items-center gap-2">
            <PartyPopper size={24} />
            <h1 className="text-xl font-bold">{t('bill_entry_title')}</h1>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto p-4">
        <Card className="shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-orange-100 to-red-100">
            <CardTitle className="text-2xl text-center text-orange-800">
              {t('bill_entry_title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Client Name */}
              <div>
                <Label htmlFor="clientName" className="text-sm font-medium text-gray-700">
                  {t('client_name')}
                </Label>
                <Input
                  id="clientName"
                  value={formData.clientName}
                  onChange={(e) => handleInputChange('clientName', e.target.value)}
                  className="mt-1"
                  placeholder="Enter client name"
                />
              </div>

              {/* Native Place */}
              <div>
                <Label htmlFor="nativePlace" className="text-sm font-medium text-gray-700">
                  {t('native_place')}
                </Label>
                <Input
                  id="nativePlace"
                  value={formData.nativePlace}
                  onChange={(e) => handleInputChange('nativePlace', e.target.value)}
                  className="mt-1"
                  placeholder="Enter native place"
                />
              </div>

              {/* Function Type */}
              <div>
                <Label htmlFor="functionType" className="text-sm font-medium text-gray-700">
                  {t('function_type')}
                </Label>
                <select
                  id="functionType"
                  value={formData.functionType}
                  onChange={(e) => handleInputChange('functionType', e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Select function type</option>
                  <option value="wedding">{t('wedding')}</option>
                  <option value="birthday">{t('birthday')}</option>
                  <option value="anniversary">{t('anniversary')}</option>
                  <option value="other">{t('other')}</option>
                </select>
              </div>

              {/* Function Date */}
              <div>
                <Label htmlFor="functionDate" className="text-sm font-medium text-gray-700">
                  {t('function_date')}
                </Label>
                <Input
                  id="functionDate"
                  type="date"
                  value={formData.functionDate}
                  onChange={(e) => handleInputChange('functionDate', e.target.value)}
                  className="mt-1"
                />
              </div>

              {/* Contact Number */}
              <div>
                <Label htmlFor="contactNumber" className="text-sm font-medium text-gray-700">
                  {t('contact_number')}
                </Label>
                <Input
                  id="contactNumber"
                  value={formData.contactNumber}
                  onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                  className="mt-1"
                  placeholder="10 digit mobile number"
                  maxLength={10}
                />
              </div>

              {/* Payment Mode */}
              <div>
                <Label htmlFor="paymentMode" className="text-sm font-medium text-gray-700">
                  {t('payment_mode')}
                </Label>
                <select
                  id="paymentMode"
                  value={formData.paymentMode}
                  onChange={(e) => handleInputChange('paymentMode', e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Select payment mode</option>
                  <option value="cash">{t('cash')}</option>
                  <option value="gpay">{t('gpay')}</option>
                  <option value="upi">{t('upi')}</option>
                  <option value="cheque">{t('cheque')}</option>
                </select>
              </div>

              {/* Venue Details - Full Width */}
              <div className="md:col-span-2">
                <Label htmlFor="venueDetails" className="text-sm font-medium text-gray-700">
                  {t('venue_details')}
                </Label>
                <Textarea
                  id="venueDetails"
                  value={formData.venueDetails}
                  onChange={(e) => handleInputChange('venueDetails', e.target.value)}
                  className="mt-1"
                  placeholder="Enter venue name and complete address"
                  rows={2}
                />
              </div>

              {/* Services Provided - Full Width */}
              <div className="md:col-span-2">
                <Label htmlFor="servicesProvided" className="text-sm font-medium text-gray-700">
                  {t('services_provided')}
                </Label>
                <Textarea
                  id="servicesProvided"
                  value={formData.servicesProvided}
                  onChange={(e) => handleInputChange('servicesProvided', e.target.value)}
                  className="mt-1"
                  placeholder="List all services provided (food, decoration, stages, etc.)"
                  rows={3}
                />
              </div>

              {/* Amount Section */}
              <div>
                <Label htmlFor="totalAmount" className="text-sm font-medium text-gray-700">
                  {t('total_amount')} (₹)
                </Label>
                <Input
                  id="totalAmount"
                  type="number"
                  value={formData.totalAmount}
                  onChange={(e) => handleInputChange('totalAmount', e.target.value)}
                  className="mt-1"
                  placeholder="0"
                />
              </div>

              <div>
                <Label htmlFor="advancePaid" className="text-sm font-medium text-gray-700">
                  {t('advance_paid')} (₹)
                </Label>
                <Input
                  id="advancePaid"
                  type="number"
                  value={formData.advancePaid}
                  onChange={(e) => handleInputChange('advancePaid', e.target.value)}
                  className="mt-1"
                  placeholder="0"
                />
              </div>

              <div>
                <Label htmlFor="balanceDue" className="text-sm font-medium text-gray-700">
                  {t('balance_due')} (₹)
                </Label>
                <Input
                  id="balanceDue"
                  value={formData.balanceDue}
                  className="mt-1 bg-gray-100"
                  placeholder="Auto calculated"
                  readOnly
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button
                onClick={handleSave}
                className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
              >
                <Save className="mr-2" size={20} />
                {t('save_bill')}
              </Button>
              <Button
                onClick={handleViewSummary}
                className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white"
              >
                <Eye className="mr-2" size={20} />
                {t('view_summary')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BillEntryForm;
