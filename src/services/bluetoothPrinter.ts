
export interface PrinterDevice {
  id: string;
  name: string;
  device?: BluetoothDevice;
}

export class BluetoothPrinterService {
  private device: BluetoothDevice | null = null;
  private characteristic: BluetoothRemoteGATTCharacteristic | null = null;

  async scanForPrinters(): Promise<PrinterDevice[]> {
    try {
      if (!navigator.bluetooth) {
        throw new Error('Bluetooth not supported in this browser');
      }

      const device = await navigator.bluetooth.requestDevice({
        filters: [
          { services: ['000018f0-0000-1000-8000-00805f9b34fb'] }, // ESC/POS service
          { namePrefix: 'MTP' }, // Common thermal printer prefix
          { namePrefix: 'BlueTooth Printer' },
          { namePrefix: 'POS' },
        ],
        optionalServices: ['000018f0-0000-1000-8000-00805f9b34fb']
      });

      return [{
        id: device.id,
        name: device.name || 'Unknown Printer',
        device
      }];
    } catch (error) {
      console.error('Error scanning for printers:', error);
      throw new Error('Failed to scan for Bluetooth printers');
    }
  }

  async connectToPrinter(printerDevice: PrinterDevice): Promise<boolean> {
    try {
      if (!printerDevice.device) {
        throw new Error('Invalid printer device');
      }

      this.device = printerDevice.device;
      const server = await this.device.gatt?.connect();
      
      if (!server) {
        throw new Error('Failed to connect to GATT server');
      }

      // Try to get the service for ESC/POS commands
      try {
        const service = await server.getPrimaryService('000018f0-0000-1000-8000-00805f9b34fb');
        this.characteristic = await service.getCharacteristic('00002af1-0000-1000-8000-00805f9b34fb');
      } catch {
        // Fallback: try to use any available characteristic
        const services = await server.getPrimaryServices();
        for (const service of services) {
          const characteristics = await service.getCharacteristics();
          for (const char of characteristics) {
            if (char.properties.write || char.properties.writeWithoutResponse) {
              this.characteristic = char;
              break;
            }
          }
          if (this.characteristic) break;
        }
      }

      if (!this.characteristic) {
        throw new Error('No writable characteristic found');
      }

      return true;
    } catch (error) {
      console.error('Error connecting to printer:', error);
      throw new Error('Failed to connect to printer');
    }
  }

  async printText(text: string): Promise<void> {
    if (!this.characteristic) {
      throw new Error('Printer not connected');
    }

    try {
      // ESC/POS commands
      const encoder = new TextEncoder();
      
      // Initialize printer
      const init = new Uint8Array([0x1B, 0x40]); // ESC @
      
      // Set text alignment to center
      const centerAlign = new Uint8Array([0x1B, 0x61, 0x01]); // ESC a 1
      
      // Text content
      const textBytes = encoder.encode(text);
      
      // Line feed and cut
      const lineFeed = new Uint8Array([0x0A, 0x0A, 0x0A]); // LF LF LF
      const cut = new Uint8Array([0x1D, 0x56, 0x41, 0x03]); // GS V A 3 (partial cut)
      
      // Combine all commands
      const fullCommand = new Uint8Array(
        init.length + centerAlign.length + textBytes.length + lineFeed.length + cut.length
      );
      
      let offset = 0;
      fullCommand.set(init, offset);
      offset += init.length;
      fullCommand.set(centerAlign, offset);
      offset += centerAlign.length;
      fullCommand.set(textBytes, offset);
      offset += textBytes.length;
      fullCommand.set(lineFeed, offset);
      offset += lineFeed.length;
      fullCommand.set(cut, offset);

      await this.characteristic.writeValue(fullCommand);
    } catch (error) {
      console.error('Error printing:', error);
      throw new Error('Failed to print');
    }
  }

  async disconnect(): Promise<void> {
    try {
      if (this.device && this.device.gatt?.connected) {
        await this.device.gatt.disconnect();
      }
      this.device = null;
      this.characteristic = null;
    } catch (error) {
      console.error('Error disconnecting:', error);
    }
  }

  isConnected(): boolean {
    return this.device?.gatt?.connected || false;
  }

  getConnectedDeviceName(): string {
    return this.device?.name || 'Unknown Device';
  }
}

export const bluetoothPrinter = new BluetoothPrinterService();
