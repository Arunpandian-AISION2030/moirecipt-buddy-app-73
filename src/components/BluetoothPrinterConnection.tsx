
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Bluetooth, BluetoothConnected, Printer, Wifi, WifiOff } from "lucide-react";
import { bluetoothPrinter, PrinterDevice } from "@/services/bluetoothPrinter";
import { useLanguage } from "@/contexts/LanguageContext";

interface BluetoothPrinterConnectionProps {
  onPrintRequest?: (printFunction: (text: string) => Promise<void>) => void;
}

const BluetoothPrinterConnection = ({ onPrintRequest }: BluetoothPrinterConnectionProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [connectedDevice, setConnectedDevice] = useState<string>('');
  const [availablePrinters, setAvailablePrinters] = useState<PrinterDevice[]>([]);
  const { toast } = useToast();
  const { t, language } = useLanguage();

  const scanForPrinters = async () => {
    setIsScanning(true);
    try {
      const printers = await bluetoothPrinter.scanForPrinters();
      setAvailablePrinters(printers);
      
      if (printers.length > 0) {
        toast({
          title: language === 'ta' ? "பிரிண்டர் கண்டுபிடிக்கப்பட்டது!" : "Printer Found!",
          description: language === 'ta' ? 
            `${printers.length} பிரிண்டர்கள் கிடைத்தன` : 
            `Found ${printers.length} printer(s)`,
        });
      } else {
        toast({
          title: language === 'ta' ? "பிரிண்டர் இல்லை" : "No Printers Found",
          description: language === 'ta' ? 
            "Bluetooth பிரிண்டர் கிடைக்கவில்லை" : 
            "No Bluetooth printers were found",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: language === 'ta' ? "பிரிண்டர் ஸ்கேன் தோல்வி" : "Scan Failed",
        description: language === 'ta' ? 
          "Bluetooth பிரிண்டர் ஸ்கேன் செய்ய முடியவில்லை" : 
          "Failed to scan for Bluetooth printers",
        variant: "destructive"
      });
    } finally {
      setIsScanning(false);
    }
  };

  const connectToPrinter = async (printer: PrinterDevice) => {
    setIsConnecting(true);
    try {
      await bluetoothPrinter.connectToPrinter(printer);
      setIsConnected(true);
      setConnectedDevice(printer.name);
      
      // Provide print function to parent component
      if (onPrintRequest) {
        onPrintRequest(async (text: string) => {
          await bluetoothPrinter.printText(text);
        });
      }

      toast({
        title: language === 'ta' ? "பிரிண்டர் இணைக்கப்பட்டது!" : "Printer Connected!",
        description: language === 'ta' ? 
          `${printer.name}-உடன் இணைக்கப்பட்டது` : 
          `Connected to ${printer.name}`,
      });
    } catch (error) {
      toast({
        title: language === 'ta' ? "இணைப்பு தோல்வி" : "Connection Failed",
        description: language === 'ta' ? 
          "பிரிண்டருடன் இணைக்க முடியவில்லை" : 
          "Failed to connect to printer",
        variant: "destructive"
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectPrinter = async () => {
    try {
      await bluetoothPrinter.disconnect();
      setIsConnected(false);
      setConnectedDevice('');
      setAvailablePrinters([]);
      
      toast({
        title: language === 'ta' ? "பிரிண்டர் துண்டிக்கப்பட்டது" : "Printer Disconnected",
        description: language === 'ta' ? 
          "பிரிண்டர் இணைப்பு துண்டிக்கப்பட்டது" : 
          "Printer connection has been disconnected",
      });
    } catch (error) {
      toast({
        title: language === 'ta' ? "துண்டிப்பு தோல்வி" : "Disconnect Failed",
        description: language === 'ta' ? 
          "பிரிண்டர் துண்டிக்க முடியவில்லை" : 
          "Failed to disconnect printer",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Printer size={20} />
          {language === 'ta' ? 'Bluetooth பிரிண்டர்' : 'Bluetooth Printer'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Connection Status */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            {isConnected ? (
              <>
                <BluetoothConnected className="text-green-600" size={20} />
                <span className="font-medium text-green-600">
                  {language === 'ta' ? 'இணைக்கப்பட்டது' : 'Connected'}
                </span>
              </>
            ) : (
              <>
                <Bluetooth className="text-gray-500" size={20} />
                <span className="text-gray-500">
                  {language === 'ta' ? 'இணைக்கப்படவில்லை' : 'Not Connected'}
                </span>
              </>
            )}
          </div>
          {isConnected && (
            <span className="text-sm text-gray-600">{connectedDevice}</span>
          )}
        </div>

        {/* Action Buttons */}
        {!isConnected ? (
          <div className="space-y-3">
            <Button
              onClick={scanForPrinters}
              disabled={isScanning}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <Bluetooth className="mr-2" size={16} />
              {isScanning 
                ? (language === 'ta' ? 'ஸ்கேன் செய்கிறது...' : 'Scanning...') 
                : (language === 'ta' ? 'பிரிண்டர் தேடு' : 'Scan for Printers')
              }
            </Button>

            {/* Available Printers */}
            {availablePrinters.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">
                  {language === 'ta' ? 'கிடைத்த பிரிண்டர்கள்:' : 'Available Printers:'}
                </h4>
                {availablePrinters.map((printer) => (
                  <Button
                    key={printer.id}
                    onClick={() => connectToPrinter(printer)}
                    disabled={isConnecting}
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <Printer className="mr-2" size={16} />
                    {printer.name}
                  </Button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <Button
            onClick={disconnectPrinter}
            variant="destructive"
            className="w-full"
          >
            <WifiOff className="mr-2" size={16} />
            {language === 'ta' ? 'துண்டி' : 'Disconnect'}
          </Button>
        )}

        {/* Info Message */}
        <div className="text-xs text-gray-500 p-2 bg-blue-50 rounded">
          {language === 'ta' ? (
            <>
              💡 உங்கள் பிரிண்டரை on செய்து, Bluetooth-ஐ enable செய்யவும். 
              ESC/POS தர்மல் பிரிண்டர்கள் ஆதரிக்கப்படுகின்றன.
            </>
          ) : (
            <>
              💡 Make sure your printer is turned on and Bluetooth is enabled. 
              ESC/POS thermal printers are supported.
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BluetoothPrinterConnection;
