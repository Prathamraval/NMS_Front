import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, WifiOff } from 'lucide-react';
import { apiService } from '../services/api';

interface ConnectionStatusProps {
  onConnectionChange?: (connected: boolean) => void;
}

const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ onConnectionChange }) => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [lastCheck, setLastCheck] = useState<string>('');
  const [error, setError] = useState<string>('');

  const checkConnection = async () => {
    try {
      await apiService.checkHealth();
      setIsConnected(true);
      setError('');
      setLastCheck(new Date().toLocaleTimeString());
      onConnectionChange?.(true);
    } catch (err) {
      setIsConnected(false);
      setError(err instanceof Error ? err.message : 'Connection failed');
      setLastCheck(new Date().toLocaleTimeString());
      onConnectionChange?.(false);
    }
  };

  useEffect(() => {
    // Initial check
    checkConnection();

    // Set up periodic health checks every 30 seconds
    const interval = setInterval(checkConnection, 30000);

    return () => clearInterval(interval);
  }, []);

  if (isConnected === null) {
    return (
      <div className="flex items-center gap-2 px-3 py-1 bg-gray-700 rounded-full text-sm">
        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
        <span className="text-yellow-400">Checking connection...</span>
      </div>
    );
  }

  if (isConnected) {
    return (
      <div className="flex items-center gap-2 px-3 py-1 bg-green-900/30 text-green-400 rounded-full text-sm border border-green-500/30">
        <CheckCircle className="w-4 h-4" />
        <span>Backend Connected</span>
        <span className="text-xs text-green-600">({lastCheck})</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 px-3 py-1 bg-red-900/30 text-red-400 rounded-full text-sm border border-red-500/30">
        <WifiOff className="w-4 h-4" />
        <span>Backend Disconnected</span>
        <button 
          onClick={checkConnection}
          className="ml-2 px-2 py-1 bg-red-600 hover:bg-red-700 rounded text-xs transition-colors"
        >
          Retry
        </button>
      </div>
      {error && (
        <div className="flex items-start gap-2 p-3 bg-red-900/20 border border-red-500/30 rounded-md">
          <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="text-red-300 font-medium">Connection Error:</p>
            <p className="text-red-400">{error}</p>
            <div className="mt-2 text-xs text-red-500">
              <p>Troubleshooting tips:</p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Make sure the Java backend is running</li>
                <li>Check if port 8080 is accessible</li>
                <li>Verify CORS configuration in the backend</li>
                <li>Check browser console for detailed errors</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectionStatus;