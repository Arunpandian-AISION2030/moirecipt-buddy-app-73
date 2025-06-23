
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { Camera, Upload, ShoppingBag, Car, Utensils, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AddReceiptModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddReceiptModal = ({ open, onOpenChange }: AddReceiptModalProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [uploadMethod, setUploadMethod] = useState<'camera' | 'upload' | null>(null);

  const categories = [
    { value: 'food', label: t('food'), icon: Utensils, color: 'from-orange-500 to-red-500' },
    { value: 'travel', label: t('travel'), icon: Car, color: 'from-blue-500 to-purple-500' },
    { value: 'shopping', label: t('shopping'), icon: ShoppingBag, color: 'from-pink-500 to-purple-500' },
    { value: 'bills', label: t('bills'), icon: FileText, color: 'from-green-500 to-blue-500' },
  ];

  const handleCapture = () => {
    toast({
      title: "Camera feature",
      description: "Camera functionality would be implemented here",
    });
    onOpenChange(false);
  };

  const handleUpload = () => {
    toast({
      title: "Upload feature", 
      description: "File upload functionality would be implemented here",
    });
    onOpenChange(false);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    toast({
      title: "Category selected",
      description: `Receipt will be categorized as ${categories.find(c => c.value === category)?.label}`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-blue-50 to-purple-50 border-0">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t('add_receipt')}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Upload method selection */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800 text-center">Choose upload method</h3>
            <div className="grid grid-cols-1 gap-3">
              <Button
                onClick={handleCapture}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-14 text-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <Camera className="mr-3" size={24} />
                {t('snap_now')}
              </Button>
              <Button
                onClick={handleUpload}
                variant="outline"
                size="lg" 
                className="h-14 text-lg font-semibold border-2 border-purple-300 hover:border-purple-500 hover:bg-purple-50 transform hover:scale-105 transition-all duration-200"
              >
                <Upload className="mr-3" size={24} />
                {t('upload')}
              </Button>
            </div>
          </div>

          {/* Category selection */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800 text-center">Select category</h3>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <Card
                    key={category.value}
                    className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                      selectedCategory === category.value ? 'ring-2 ring-purple-500' : ''
                    }`}
                    onClick={() => handleCategorySelect(category.value)}
                  >
                    <CardContent className="p-4 text-center">
                      <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center mx-auto mb-2`}>
                        <IconComponent size={24} className="text-white" />
                      </div>
                      <p className="font-medium text-gray-800 text-sm">{category.label}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Alternative: Dropdown for categories */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Or select from dropdown:</label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose category..." />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddReceiptModal;
