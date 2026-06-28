const DEFAULT_PRINTER_NAME = "knup kp-1025";
const DEFAULT_SERVICE_UUID = "0000ffe0-0000-1000-8000-00805f9b34fb";
const DEFAULT_CHARACTERISTIC_UUID = "0000ffe1-0000-1000-8000-00805f9b34fb";

type PrinterDevice = {
  gatt?: {
    connected: boolean;
    connect(): Promise<PrinterServer>;
    disconnect(): void;
  } | null;
  addEventListener(type: string, listener: EventListenerOrEventListenerObject | null): void;
  removeEventListener(type: string, listener: EventListenerOrEventListenerObject | null): void;
};

type PrinterServer = {
  connected: boolean;
  connect(): Promise<PrinterServer>;
  disconnect(): void;
  getPrimaryService(service: string): Promise<PrinterService>;
};

type PrinterService = {
  getCharacteristic(characteristic: string): Promise<PrinterCharacteristic>;
};

type PrinterCharacteristic = {
  writeValue(value: BufferSource): Promise<void>;
};

type RequestDeviceOptionsType = {
  filters?: Array<{ name?: string }>;
  optionalServices?: string[];
};

let printerDevice: PrinterDevice | null = null;
let printerServer: PrinterServer | null = null;
let printerCharacteristic: PrinterCharacteristic | null = null;

function cleanupPrinterConnection() {
  if (!printerDevice) return;
  printerDevice.removeEventListener("gattserverdisconnected", onPrinterDisconnected);
  printerDevice = null;
  printerServer = null;
  printerCharacteristic = null;
}

function onPrinterDisconnected() {
  cleanupPrinterConnection();
}

export function isWebBluetoothAvailable() {
  return typeof navigator !== "undefined" && !!navigator.bluetooth;
}

export function isBluetoothPrinterConnected() {
  return !!(
    printerDevice &&
    printerDevice.gatt?.connected &&
    printerCharacteristic
  );
}

export async function connectBluetoothPrinter(deviceName = DEFAULT_PRINTER_NAME) {
  if (!isWebBluetoothAvailable()) {
    throw new Error("Web Bluetooth não suportado neste navegador.");
  }

  if (isBluetoothPrinterConnected()) {
    return printerDevice!;
  }

  const options: RequestDeviceOptionsType = {
    filters: [{ name: deviceName }],
    optionalServices: [DEFAULT_SERVICE_UUID],
  };

  const bluetooth = navigator.bluetooth;
  if (!bluetooth) {
    cleanupPrinterConnection();
    throw new Error("Bluetooth não disponível no navegador.");
  }

  const device = await bluetooth.requestDevice(options);
  printerDevice = device;
  printerDevice.addEventListener("gattserverdisconnected", onPrinterDisconnected);

  const server = await printerDevice.gatt?.connect();
  if (!server) {
    cleanupPrinterConnection();
    throw new Error("Falha ao conectar ao serviço GATT do dispositivo Bluetooth.");
  }

  printerServer = server;
  const service = await printerServer.getPrimaryService(DEFAULT_SERVICE_UUID);
  printerCharacteristic = await service.getCharacteristic(DEFAULT_CHARACTERISTIC_UUID);

  return printerDevice;
}

export async function disconnectBluetoothPrinter() {
  if (printerDevice?.gatt?.connected) {
    await printerDevice.gatt.disconnect();
  }
  cleanupPrinterConnection();
}

export async function printBluetoothText(text: string) {
  if (!isBluetoothPrinterConnected() || !printerCharacteristic) {
    throw new Error("Impressora Bluetooth não está conectada.");
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(text + "\n\n");
  const chunkSize = 100;

  for (let offset = 0; offset < data.length; offset += chunkSize) {
    const chunk = data.slice(offset, offset + chunkSize);
    await printerCharacteristic.writeValue(chunk);
  }
}

export function getDefaultBluetoothPrinterName() {
  return DEFAULT_PRINTER_NAME;
}
