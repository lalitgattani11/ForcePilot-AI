import { useEffect, useState } from "react";
import { Download } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
  }>;
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  const [isVisible, setIsVisible] = useState(false);
  const closePrompt = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();

      setDeferredPrompt(e as BeforeInstallPromptEvent);

      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setIsVisible(false);
    }
  };

  if (!isVisible) return null;

  return (
  <div className="fixed bottom-5 left-1/2 z-[5000] w-[92%] max-w-sm -translate-x-1/2 rounded-3xl border border-cyan-500/20 bg-slate-950/95 p-4 shadow-2xl backdrop-blur-xl">
    
    <div className="flex items-start justify-between gap-4">
      
      <div className="flex-1">
        <div className="flex items-start justify-between gap-3">
          
          <div>
            <h3 className="text-sm font-black text-white">
              Install ForcePilot AI
            </h3>

            <p className="mt-1 text-xs text-slate-400">
              Launch faster with the full app experience.
            </p>
          </div>

          <button
            onClick={closePrompt}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-slate-400 transition hover:border-cyan-400/30 hover:text-cyan-300"
          >
            ✕
          </button>

        </div>
      </div>

      <button
        onClick={handleInstall}
        className="flex items-center gap-2 rounded-2xl bg-cyan-500 px-4 py-2 text-xs font-black text-slate-950 transition hover:scale-105"
      >
        <Download size={14} />
        Install
      </button>

    </div>
  </div>
);
}
