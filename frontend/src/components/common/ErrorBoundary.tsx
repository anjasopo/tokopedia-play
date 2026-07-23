import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
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
        <div className="min-h-screen flex items-center justify-center p-6 bg-gray-950 text-gray-100">
          <div className="max-w-md w-full p-6 rounded-2xl bg-gray-900 border border-red-500/30 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-400 mx-auto flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-white">Terjadi Kesalahan System</h2>
            <p className="text-xs text-gray-400">
              {this.state.error?.message || 'Aplikasi mengalami kendala teknis tak terduga.'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-tokopedia-500 hover:bg-tokopedia-600 text-white text-xs font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 mx-auto"
            >
              <RefreshCw className="w-4 h-4" />
              Muat Ulang Halaman
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export const LoadingSpinner: React.FC<{ className?: string; label?: string }> = ({
  className = '',
  label = 'Memuat data...',
}) => (
  <div className={`flex flex-col items-center justify-center gap-2 ${className}`}>
    <div className="w-8 h-8 border-3 border-emerald-500/20 border-t-tokopedia-500 rounded-full animate-spin" />
    {label && <span className="text-xs text-gray-400 font-medium">{label}</span>}
  </div>
);

export const ErrorMessage: React.FC<{ message?: string; onRetry?: () => void; className?: string }> = ({
  message = 'Gagal memuat data',
  onRetry,
  className = '',
}) => (
  <div className={`p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center justify-between gap-3 ${className}`}>
    <div className="flex items-center gap-2">
      <AlertTriangle className="w-4 h-4 flex-shrink-0" />
      <span>{message}</span>
    </div>
    {onRetry && (
      <button
        onClick={onRetry}
        className="px-2.5 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-300 font-bold rounded-md flex items-center gap-1 transition-colors flex-shrink-0"
      >
        <RefreshCw className="w-3 h-3" />
        Coba Lagi
      </button>
    )}
  </div>
);
