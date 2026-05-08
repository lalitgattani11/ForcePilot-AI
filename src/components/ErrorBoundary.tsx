import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-white font-sans">
          <div className="max-w-md w-full glass rounded-3xl p-8 border border-rose-500/20 shadow-2xl text-center">
            <div className="w-16 h-16 bg-rose-500/10 rounded-2xl flex items-center justify-center text-rose-500 mx-auto mb-6">
              <AlertCircle size={32} />
            </div>
            <h1 className="text-2xl font-black mb-4 uppercase tracking-tight">System Failure</h1>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed">
              A critical runtime error has occurred. The neural link was interrupted. 
              Please restart the session to re-establish connection.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 border border-white/5"
            >
              <RotateCcw size={18} />
              REBOOT SYSTEM
            </button>
            <div className="mt-6 text-left p-4 bg-slate-900/50 rounded-lg overflow-auto max-h-40">
              <code className="text-[10px] text-rose-400/70 block whitespace-pre">
                {this.state.error?.toString()}
              </code>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
