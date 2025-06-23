
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, Save, Receipt, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CustomerFunctionData } from "./CustomerFunctionEntry";
import { format } from "date-fns";

export interface MOIReceiptData {
  name: string;
  place: string;
  relationship: string;
  lastCompany: string;
  moiAmount: string;
  functionName: string;
  functionDate: string;
}

interface MOIReceiptEntryProps {
  onBack: () => void;
  customerData: CustomerFunctionData;
}

const MOIReceiptEntry = ({ onBack, customerData }: MOIReceiptEntryProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [receipts, setReceipts] = useState<MOIReceiptData[]>([]);
  const [currentReceipt, setCurrentReceipt] = useState<MOIReceiptData>({
    name: "",
    place: "",
    relationship: "",
    lastCompany: "",
    moiAmount: "",
    functionName: customerData.functionType,
    functionDate: customerData.functionDate ? format(customerData.functionDate, "dd/MM/yyyy") : "",
  });

  const handleInputChange = (field: keyof MOIReceiptData, value: string) => {
    setCurrentReceipt(prev => ({ ...prev, [field]: value }));
  };

  const validateCurrentReceipt = () => {
    const required = ['name', 'place', 'relationship', 'moiAmount'];
    for (const field of required) {
      if (!currentReceipt[field as keyof MOIReceiptData]) {
        toast({
          title: "Validation Error",
          description: "Please fill all required fields",
          variant: "destructive",
        });
        return false;
      }
    }
    
    if (isNaN(Number(currentReceipt.moiAmount)) || Number(currentReceipt.moiAmount) <= 0) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid MOI amount",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  const handleAddReceipt = () => {
    if (validateCurrentReceipt()) {
      setReceipts(prev => [...prev, currentReceipt]);
      setCurrentReceipt({
        name: "",
        place: "",
        relationship: "",
        lastCompany: "",
        moiAmount: "",
        functionName: customerData.functionType,
        functionDate: customerData.functionDate ? format(customerData.functionDate, "dd/MM/yyyy") : "",
      });
      toast({
        title: "Success",
        description: "MOI receipt added successfully!",
      });
    }
  };

  const handleSaveAll = () => {
    if (receipts.length === 0) {
      toast({
        title: "No Receipts",
        description: "Please add at least one MOI receipt before saving",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Success",
      description: `Saved ${receipts.length} MOI receipts successfully!`,
    });
  };

  const totalAmount = receipts.reduce((sum, receipt) => sum + Number(receipt.moiAmount), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-4">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="flex items-center gap-2">
            <Receipt size={24} />
            <h1 className="text-xl font-bold">MOI Receipt Entry</h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        {/* Function Details Summary */}
        <Card className="mb-6 shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-green-100 to-blue-100">
            <CardTitle className="text-lg text-green-800">Function Details</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="font-medium">Customer:</span> {customerData.customerName}
              </div>
              <div>
                <span className="font-medium">Function:</span> {customerData.functionType}
              </div>
              <div>
                <span className="font-medium">Date:</span> {customerData.functionDate ? format(customerData.functionDate, "dd/MM/yyyy") : ""}
              </div>
              <div>
                <span className="font-medium">Venue:</span> {customerData.venuePlace}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* MOI Entry Form */}
          <Card className="shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-green-100 to-blue-100">
              <CardTitle className="text-xl text-center text-green-800">
                Step 2: Add MOI Receipt
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Name */}
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Name *
                  </Label>
                  <Input
                    id="name"
                    value={currentReceipt.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="mt-1"
                    placeholder="Enter person's name"
                  />
                </div>

                {/* Place */}
                <div>
                  <Label htmlFor="place" className="text-sm font-medium text-gray-700">
                    Place *
                  </Label>
                  <Input
                    id="place"
                    value={currentReceipt.place}
                    onChange={(e) => handleInputChange('place', e.target.value)}
                    className="mt-1"
                    placeholder="Enter place/location"
                  />
                </div>

                {/* Relationship */}
                <div>
                  <Label htmlFor="relationship" className="text-sm font-medium text-gray-700">
                    Relationship *
                  </Label>
                  <Input
                    id="relationship"
                    value={currentReceipt.relationship}
                    onChange={(e) => handleInputChange('relationship', e.target.value)}
                    className="mt-1"
                    placeholder="Uncle, Friend, Colleague, etc."
                  />
                </div>

                {/* Last Company */}
                <div>
                  <Label htmlFor="lastCompany" className="text-sm font-medium text-gray-700">
                    Last Company (Optional)
                  </Label>
                  <Input
                    id="lastCompany"
                    value={currentReceipt.lastCompany}
                    onChange={(e) => handleInputChange('lastCompany', e.target.value)}
                    className="mt-1"
                    placeholder="Previous company or organization"
                  />
                </div>

                {/* MOI Amount */}
                <div>
                  <Label htmlFor="moiAmount" className="text-sm font-medium text-gray-700">
                    MOI Amount (₹) *
                  </Label>
                  <Input
                    id="moiAmount"
                    type="number"
                    value={currentReceipt.moiAmount}
                    onChange={(e) => handleInputChange('moiAmount', e.target.value)}
                    className="mt-1"
                    placeholder="0"
                  />
                </div>

                {/* Auto-filled fields (read-only) */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="functionName" className="text-sm font-medium text-gray-700">
                      Function Name
                    </Label>
                    <Input
                      id="functionName"
                      value={currentReceipt.functionName}
                      className="mt-1 bg-gray-100"
                      readOnly
                    />
                  </div>
                  <div>
                    <Label htmlFor="functionDateDisplay" className="text-sm font-medium text-gray-700">
                      Function Date
                    </Label>
                    <Input
                      id="functionDateDisplay"
                      value={currentReceipt.functionDate}
                      className="mt-1 bg-gray-100"
                      readOnly
                    />
                  </div>
                </div>

                {/* Add Receipt Button */}
                <Button
                  onClick={handleAddReceipt}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
                >
                  <Plus className="mr-2" size={20} />
                  Add Receipt
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Receipts List */}
          <Card className="shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-blue-100 to-purple-100">
              <CardTitle className="text-xl text-center text-blue-800">
                Added Receipts ({receipts.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {receipts.length > 0 ? (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {receipts.map((receipt, index) => (
                    <Card key={index} className="bg-gray-50 border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800">{receipt.name}</h4>
                            <p className="text-sm text-gray-600">{receipt.place} • {receipt.relationship}</p>
                            {receipt.lastCompany && (
                              <p className="text-sm text-gray-500">{receipt.lastCompany}</p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg text-green-600">₹{receipt.moiAmount}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {/* Total Amount */}
                  <Card className="bg-gradient-to-r from-green-500 to-blue-600 text-white">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">Total Amount:</span>
                        <span className="text-2xl font-bold">₹{totalAmount}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Receipt size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">No receipts added yet</p>
                  <p className="text-sm text-gray-500">Add your first MOI receipt using the form</p>
                </div>
              )}

              {/* Save All Button */}
              {receipts.length > 0 && (
                <Button
                  onClick={handleSaveAll}
                  className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  <Save className="mr-2" size={20} />
                  Save All Receipts
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MOIReceiptEntry;
