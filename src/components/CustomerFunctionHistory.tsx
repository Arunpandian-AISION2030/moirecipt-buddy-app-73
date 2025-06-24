
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useLanguage } from "@/contexts/LanguageContext";
import { Search, Calendar, User, MapPin, Phone, Trash2 } from "lucide-react";
import { format } from "date-fns";

interface HistoryEntry {
  id: number;
  customerName: string;
  mobileNumber: string;
  functionType: string;
  functionDate: Date;
  venuePlace: string;
  createdAt: string;
}

const CustomerFunctionHistory = () => {
  const { t } = useLanguage();
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredHistory, setFilteredHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    loadHistory();
  }, []);

  useEffect(() => {
    filterHistory();
  }, [history, searchTerm]);

  const loadHistory = () => {
    const savedHistory = JSON.parse(localStorage.getItem('customerFunctionHistory') || '[]');
    const parsedHistory = savedHistory.map((entry: any) => ({
      ...entry,
      functionDate: new Date(entry.functionDate),
      createdAt: entry.createdAt || new Date().toISOString()
    }));
    setHistory(parsedHistory);
  };

  const filterHistory = () => {
    if (!searchTerm.trim()) {
      setFilteredHistory(history);
      return;
    }

    const filtered = history.filter(entry =>
      entry.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.mobileNumber.includes(searchTerm) ||
      entry.functionType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.venuePlace.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredHistory(filtered);
  };

  const deleteEntry = (id: number) => {
    const updatedHistory = history.filter(entry => entry.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem('customerFunctionHistory', JSON.stringify(updatedHistory));
  };

  const clearAllHistory = () => {
    setHistory([]);
    localStorage.removeItem('customerFunctionHistory');
  };

  const getFunctionTypeDisplay = (type: string) => {
    const types: { [key: string]: string } = {
      wedding: t('wedding'),
      puberty: t('puberty'),
      birthday: t('birthday'),
      anniversary: t('anniversary'),
      engagement: t('engagement'),
      housewarming: t('housewarming'),
      other: t('other')
    };
    return types[type] || type;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h3 className="text-lg font-semibold text-blue-700 flex items-center gap-2">
          <Calendar size={20} />
          {t('previous_entries')} ({filteredHistory.length})
        </h3>
        
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input
              placeholder={t('search_entries')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 min-w-[250px]"
            />
          </div>
          
          {history.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllHistory}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 size={16} className="mr-1" />
              {t('clear_all')}
            </Button>
          )}
        </div>
      </div>

      {filteredHistory.length === 0 ? (
        <Card>
          <CardContent className="py-8">
            <div className="text-center text-gray-500">
              <Calendar size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">
                {history.length === 0 ? t('no_entries_yet') : t('no_matching_entries')}
              </p>
              <p className="text-sm">
                {history.length === 0 
                  ? t('start_creating_entries') 
                  : t('try_different_search_term')
                }
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium text-gray-700">
              {t('entry_history')}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[150px]">
                      <div className="flex items-center gap-2">
                        <User size={16} />
                        {t('customer_name')}
                      </div>
                    </TableHead>
                    <TableHead className="min-w-[120px]">
                      <div className="flex items-center gap-2">
                        <Phone size={16} />
                        {t('mobile_number')}
                      </div>
                    </TableHead>
                    <TableHead className="min-w-[120px]">{t('function_type')}</TableHead>
                    <TableHead className="min-w-[120px]">{t('function_date')}</TableHead>
                    <TableHead className="min-w-[200px]">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        {t('venue_place')}
                      </div>
                    </TableHead>
                    <TableHead className="min-w-[120px]">{t('created_at')}</TableHead>
                    <TableHead className="w-[80px]">{t('actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredHistory.map((entry) => (
                    <TableRow key={entry.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{entry.customerName}</TableCell>
                      <TableCell>{entry.mobileNumber}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {getFunctionTypeDisplay(entry.functionType)}
                        </span>
                      </TableCell>
                      <TableCell>
                        {format(entry.functionDate, "MMM dd, yyyy")}
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate" title={entry.venuePlace}>
                        {entry.venuePlace}
                      </TableCell>
                      <TableCell className="text-gray-500 text-sm">
                        {format(new Date(entry.createdAt), "MMM dd, yyyy HH:mm")}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteEntry(entry.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 p-1"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CustomerFunctionHistory;
