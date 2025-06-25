import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, Plus, Trash2, Edit3, Save, Languages } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CustomerFunctionData } from "./CustomerFunctionEntry";
import MOIReceiptPrint from "./MOIReceiptPrint";

interface GuestEntry {
  id: number;
  guestName: string;
  nativePlace: string;
  amount: string;
  paymentMode: string;
}

interface MOIReceiptEntryProps {
  onBack: () => void;
  customerData: CustomerFunctionData;
  isEditing?: boolean;
  editingFunctionId?: number;
}

const MOIReceiptEntry = ({ onBack, customerData, isEditing = false, editingFunctionId }: MOIReceiptEntryProps) => {
  const { t, toggleLanguage, language } = useLanguage();
  const { toast } = useToast();
  const [guests, setGuests] = useState<GuestEntry[]>([]);
  const [showPrint, setShowPrint] = useState(false);
  const [editingGuestId, setEditingGuestId] = useState<number | null>(null);
  
  const [guestForm, setGuestForm] = useState({
    guestName: "",
    nativePlace: "",
    amount: "",
    paymentMode: "",
  });

  // Load existing guest data when editing
  useEffect(() => {
    if (isEditing && editingFunctionId) {
      const existingGuests = JSON.parse(localStorage.getItem(`guests_${editingFunctionId}`) || '[]');
      setGuests(existingGuests);
      
      if (existingGuests.length > 0) {
        toast({
          title: t('info'),
          description: `Loaded ${existingGuests.length} existing guest entries. You can edit them or add new ones.`,
        });
      }
    }
  }, [isEditing, editingFunctionId, t, toast]);

  const handleInputChange = (field: string, value: string) => {
    setGuestForm(prev => ({ ...prev, [field]: value }));
  };

  const validateGuestForm = () => {
    if (!guestForm.guestName.trim()) {
      toast({
        title: t('validation_error'),
        description: "Guest name is required",
        variant: "destructive",
      });
      return false;
    }
    
    if (!guestForm.amount || parseFloat(guestForm.amount) <= 0) {
      toast({
        title: t('validation_error'),
        description: "Valid amount is required",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  const addGuest = () => {
    if (validateGuestForm()) {
      const newGuest: GuestEntry = {
        id: Date.now(),
        ...guestForm,
      };
      
      const updatedGuests = [...guests, newGuest];
      setGuests(updatedGuests);
      
      // Save to localStorage with function ID
      const functionId = isEditing && editingFunctionId ? editingFunctionId : Date.now();
      localStorage.setItem(`guests_${functionId}`, JSON.stringify(updatedGuests));
      
      setGuestForm({
        guestName: "",
        nativePlace: "", 
        amount: "",
        paymentMode: "",
      });
      
      toast({
        title: t('success'),
        description: `Guest "${newGuest.guestName}" added successfully`,
      });
    }
  };

  const editGuest = (guest: GuestEntry) => {
    setGuestForm({
      guestName: guest.guestName,
      nativePlace: guest.nativePlace,
      amount: guest.amount,
      paymentMode: guest.paymentMode,
    });
    setEditingGuestId(guest.id);
  };

  const updateGuest = () => {
    if (validateGuestForm() && editingGuestId) {
      const updatedGuests = guests.map(guest =>
        guest.id === editingGuestId
          ? { ...guest, ...guestForm }
          : guest
      );
      
      setGuests(updatedGuests);
      
      // Save to localStorage
      const functionId = isEditing && editingFunctionId ? editingFunctionId : Date.now();
      localStorage.setItem(`guests_${functionId}`, JSON.stringify(updatedGuests));
      
      setGuestForm({
        guestName: "",
        nativePlace: "",
        amount: "",
        paymentMode: "",
      });
      setEditingGuestId(null);
      
      toast({
        title: t('success'),
        description: "Guest updated successfully",
      });
    }
  };

  const deleteGuest = (id: number) => {
    const updatedGuests = guests.filter(guest => guest.id !== id);
    setGuests(updatedGuests);
    
    // Save to localStorage
    const functionId = isEditing && editingFunctionId ? editingFunctionId : Date.now();
    localStorage.setItem(`guests_${functionId}`, JSON.stringify(updatedGuests));
    
    toast({
      title: t('success'),
      description: "Guest removed successfully",
    });
  };

  const cancelEdit = () => {
    setGuestForm({
      guestName: "",
      nativePlace: "",
      amount: "",
      paymentMode: "",
    });
    setEditingGuestId(null);
  };

  const handleFinalize = () => {
    if (guests.length === 0) {
      toast({
        title: t('validation_error'),
        description: "Please add at least one guest entry",
        variant: "destructive",
      });
      return;
    }
    
    setShowPrint(true);
    toast({
      title: t('success'),
      description: `${isEditing ? 'Updated' : 'Created'} receipt with ${guests.length} guest entries`,
    });
  };

  if (showPrint) {
    // Map CustomerFunctionData to the format expected by MOIReceiptPrint
    const printData = {
      customerName: customerData.customerName,
      functionType: customerData.functionType,
      functionDate: customerData.functionDate ? customerData.functionDate.toISOString() : new Date().toISOString(),
      venue: customerData.venuePlace, // Map venuePlace to venue
    };

    return (
      <MOIReceiptPrint
        customerData={printData}
        guests={guests}
        onBack={() => setShowPrint(false)}
        isEditing={isEditing}
      />
    );
  }

  const totalAmount = guests.reduce((sum, guest) => sum + parseFloat(guest.amount || "0"), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
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
            <h1 className="text-lg sm:text-xl font-bold">
              {isEditing ? 'Edit MOI Receipt' : t('moi_receipt_entry')}
            </h1>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
            className="flex items-center gap-2 text-green-600 border-white/30 hover:bg-white/10 hover:text-white text-xs sm:text-sm"
          >
            <Languages size={16} />
            {language === 'en' ? 'தமிழ்' : 'EN'}
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Customer Function Summary */}
        <Card className="mb-6 shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-green-100 to-blue-100">
            <CardTitle className="text-lg text-green-800">
              {isEditing ? 'Editing Function Details' : 'Function Details'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-600">Customer:</span>
                <p className="text-gray-800">{customerData.customerName}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Mobile:</span>
                <p className="text-gray-800">{customerData.mobileNumber}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Function:</span>
                <p className="text-gray-800">{customerData.functionType}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Date:</span>
                <p className="text-gray-800">
                  {customerData.functionDate ? customerData.functionDate.toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Guest Entry Form */}
        <Card className="mb-6 shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-green-100 to-blue-100">
            <CardTitle className="text-xl text-center text-green-800">
              {editingGuestId ? 'Edit Guest Entry' : t('add_guest_entry')}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            {/* ... keep existing code (guest form fields) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <Label htmlFor="guestName" className="text-sm font-medium text-gray-700">
                  {t('guest_name')} *
                </Label>
                <Input
                  id="guestName"
                  value={guestForm.guestName}
                  onChange={(e) => handleInputChange('guestName', e.target.value)}
                  className="mt-1"
                  placeholder={t('enter_guest_name')}
                />
              </div>

              <div>
                <Label htmlFor="nativePlace" className="text-sm font-medium text-gray-700">
                  {t('native_place')}
                </Label>
                <Input
                  id="nativePlace"
                  value={guestForm.nativePlace}
                  onChange={(e) => handleInputChange('nativePlace', e.target.value)}
                  className="mt-1"
                  placeholder={t('enter_native_place')}
                />
              </div>

              <div>
                <Label htmlFor="amount" className="text-sm font-medium text-gray-700">
                  {t('amount')} (₹) *
                </Label>
                <Input
                  id="amount"
                  type="number"
                  value={guestForm.amount}
                  onChange={(e) => handleInputChange('amount', e.target.value)}
                  className="mt-1"
                  placeholder="0"
                />
              </div>

              <div>
                <Label htmlFor="paymentMode" className="text-sm font-medium text-gray-700">
                  {t('payment_mode')}
                </Label>
                <select
                  id="paymentMode"
                  value={guestForm.paymentMode}
                  onChange={(e) => handleInputChange('paymentMode', e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">{t('select_payment_mode')}</option>
                  <option value="cash">{t('cash')}</option>
                  <option value="gpay">{t('gpay')}</option>
                  <option value="upi">{t('upi')}</option>
                  <option value="cheque">{t('cheque')}</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              {editingGuestId ? (
                <>
                  <Button
                    onClick={updateGuest}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white"
                  >
                    <Save className="mr-2" size={20} />
                    Update Guest
                  </Button>
                  <Button
                    onClick={cancelEdit}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel Edit
                  </Button>
                </>
              ) : (
                <Button
                  onClick={addGuest}
                  className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
                >
                  <Plus className="mr-2" size={20} />
                  {t('add_guest')}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Guest List */}
        {guests.length > 0 && (
          <Card className="mb-6 shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-green-100 to-blue-100">
              <CardTitle className="text-lg text-green-800 flex justify-between items-center">
                <span>Added Guests ({guests.length})</span>
                <span className="text-lg font-bold">Total: ₹{totalAmount.toLocaleString()}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Guest Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Native Place
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payment Mode
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {guests.map((guest) => (
                      <tr key={guest.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap font-medium text-gray-900">
                          {guest.guestName}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-gray-700">
                          {guest.nativePlace || '-'}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-gray-900 font-medium">
                          ₹{parseFloat(guest.amount).toLocaleString()}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-gray-700">
                          {guest.paymentMode || '-'}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => editGuest(guest)}
                              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-1"
                            >
                              <Edit3 size={16} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteGuest(guest.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 p-1"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Finalize Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleFinalize}
            disabled={guests.length === 0}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3"
          >
            {isEditing ? 'Update Receipt' : t('generate_receipt')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MOIReceiptEntry;
