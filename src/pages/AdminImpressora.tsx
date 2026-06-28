import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { connectBluetoothPrinter, disconnectBluetoothPrinter, isBluetoothPrinterConnected, isWebBluetoothAvailable, printBluetoothText } from "../services/bluetoothPrinter";
import { Printer, CheckCircle2, AlertTriangle } from "lucide-react";

const STATUS_STYLES: Record<string, string> = {
  Conectado: "bg-green-500/10 text-green-300 border-green-500/20",
  Desconectado: "bg-white/5 text-white/70 border-white/10",
  "Conectando...": "bg-yellow-500/10 text-yellow-300 border-yellow-500/20",
  "Falha na conexão": "bg-red-500/10 text-red-300 border-red-500/20",
  "Imprimindo...": "bg-sky-500/10 text-sky-300 border-sky-500/20",
  "Impressão concluída": "bg-green-500/10 text-green-300 border-green-500/20",
  "Falha na impressão": "bg-red-500/10 text-red-300 border-red-500/20",
};

export default function AdminImpressora() {
  const [printerStatus, setPrinterStatus] = useState("Desconectado");
  const [browserSupport, setBrowserSupport] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [isWorking, setIsWorking] = useState(false);

  useEffect(() => {
    setBrowserSupport(isWebBluetoothAvailable());
    if (isBluetoothPrinterConnected()) {
      setPrinterStatus("Conectado");
      appendLog("Impressora já está conectada.");
    }
  }, []);

  const appendLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    setLogs((current) => [`[${timestamp}] ${message}`, ...current].slice(0, 12));
  };

  const handleConnect = async () => {
    if (!browserSupport) {
      appendLog("Web Bluetooth não suportado neste navegador.");
      return;
    }

    setIsWorking(true);
    setPrinterStatus("Conectando...");
    appendLog("Tentando conectar à impressora...");

    try {
      await connectBluetoothPrinter();
      setPrinterStatus("Conectado");
      appendLog("Impressora conectada com sucesso.");
    } catch (error) {
      setPrinterStatus("Falha na conexão");
      appendLog(`Erro ao conectar: ${(error as Error).message}`);
    } finally {
      setIsWorking(false);
    }
  };

  const handleDisconnect = async () => {
    setIsWorking(true);
    appendLog("Desconectando impressora...");

    try {
      await disconnectBluetoothPrinter();
      setPrinterStatus("Desconectado");
      appendLog("Impressora desconectada.");
    } catch (error) {
      appendLog(`Erro ao desconectar: ${(error as Error).message}`);
    } finally {
      setIsWorking(false);
    }
  };

  const handlePrintTest = async () => {
    if (!browserSupport) {
      appendLog("Web Bluetooth não suportado neste navegador.");
      return;
    }

    setIsWorking(true);
    setPrinterStatus("Imprimindo...");
    appendLog("Enviando comando de impressão de teste...");

    try {
      await printBluetoothText("TESTE DE IMPRESSÃO YAKINHOME\n\nObrigado pela conexão!\n\n");
      setPrinterStatus("Impressão concluída");
      appendLog("Teste de impressão concluído com sucesso.");
    } catch (error) {
      setPrinterStatus("Falha na impressão");
      appendLog(`Erro ao imprimir: ${(error as Error).message}`);
    } finally {
      setIsWorking(false);
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="rounded-3xl p-6" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div>
              <div className="inline-flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-[#111111] px-4 py-3">
                <Printer size={18} className="text-[#c0261a]" />
                <div>
                  <h1 className="text-white font-black text-xl tracking-tight">Impressora</h1>
                  <p className="text-white/40 text-sm">Monitore o status e teste a conexão Bluetooth da impressora.</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleConnect}
                disabled={isWorking}
                className="rounded-2xl bg-[#c0261a] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#d93025] disabled:cursor-not-allowed disabled:opacity-60"
              >
                Conectar
              </button>
              <button
                onClick={handleDisconnect}
                disabled={isWorking}
                className="rounded-2xl border border-white/[0.12] bg-transparent px-5 py-3 text-sm font-bold text-white transition hover:border-[#c0261a] disabled:cursor-not-allowed disabled:opacity-60"
              >
                Desconectar
              </button>
              <button
                onClick={handlePrintTest}
                disabled={isWorking}
                className="rounded-2xl bg-sky-500/10 px-5 py-3 text-sm font-bold text-sky-200 transition hover:bg-sky-500/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Imprimir teste
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="rounded-3xl border border-white/[0.08] bg-[#111111] p-5">
              <div className="flex items-center gap-3 text-sm font-bold text-white/40 uppercase tracking-[0.2em] mb-4">Status atual</div>
              <div className={`rounded-3xl border p-5 ${STATUS_STYLES[printerStatus] ?? STATUS_STYLES.Desconectado}`}>
                <div className="flex items-center gap-3">
                  {printerStatus === "Conectado" ? (
                    <CheckCircle2 size={20} className="text-green-300" />
                  ) : printerStatus.includes("Falha") ? (
                    <AlertTriangle size={20} className="text-red-300" />
                  ) : (
                    <Printer size={20} className="text-white/70" />
                  )}
                  <span className="text-lg font-black text-white">{printerStatus}</span>
                </div>
                <p className="mt-3 text-sm text-white/50 leading-relaxed">
                  {browserSupport
                    ? "O navegador suporta Web Bluetooth. Use os botões para conectar, desconectar ou testar a impressora."
                    : "Este navegador não oferece suporte ao Web Bluetooth. Use Chrome ou Edge para acessar a impressora."}
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/[0.08] bg-[#111111] p-5 lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm font-bold uppercase tracking-[0.2em] text-white/40">Detalhes</div>
                  <h2 className="text-white font-black text-lg mt-2">Impressora Bluetooth</h2>
                </div>
                <span className="text-xs text-white/30">Nome: knup kp-1025</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-3xl border border-white/[0.08] bg-[#0f0f0f] p-4">
                  <p className="text-sm text-white/40 uppercase tracking-[0.2em] mb-3">Suporte</p>
                  <p className="text-sm text-white">{browserSupport ? "Ativo" : "Indisponível"}</p>
                </div>
                <div className="rounded-3xl border border-white/[0.08] bg-[#0f0f0f] p-4">
                  <p className="text-sm text-white/40 uppercase tracking-[0.2em] mb-3">Última impressão</p>
                  <p className="text-sm text-white">{printerStatus === "Impressão concluída" ? "Sucesso" : printerStatus === "Falha na impressão" ? "Falha" : "Ainda não testado"}</p>
                </div>
              </div>
              <div className="mt-6 rounded-3xl border border-white/[0.08] bg-[#0f0f0f] p-4">
                <p className="text-sm text-white/40 uppercase tracking-[0.2em] mb-3">Instruções</p>
                <ul className="list-disc list-inside space-y-2 text-sm text-white/60">
                  <li>Abra esta aba no navegador compatível e conecte a impressora.</li>
                  <li>Verifique se o modelo aparece como "knup kp-1025".</li>
                  <li>Use "Imprimir teste" para confirmar a saída antes de receber pedidos.</li>
                  <li>Os pedidos no checkout também podem imprimir automaticamente quando o dispositivo estiver conectado.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/[0.08] bg-[#111111] p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-white font-black text-lg">Logs de atividade</h2>
              <p className="text-white/40 text-sm mt-1">Últimas ações de conexão e impressão.</p>
            </div>
            <button
              onClick={() => setLogs([])}
              className="rounded-2xl border border-white/[0.12] px-4 py-2 text-sm font-semibold text-white/50 hover:text-white hover:border-white/25 transition"
            >
              Limpar
            </button>
          </div>

          {logs.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-white/[0.08] p-8 text-center text-white/30">Nenhuma atividade registrada ainda.</div>
          ) : (
            <div className="space-y-2">
              {logs.map((entry, index) => (
                <div key={index} className="rounded-3xl border border-white/[0.08] bg-[#0f0f0f] p-4 text-sm text-white/70">
                  {entry}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
