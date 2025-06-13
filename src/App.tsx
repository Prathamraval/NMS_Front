import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import CredentialsPage from './components/pages/CredentialsPage';
import DiscoveryPage from './components/pages/DiscoveryPage';
import ProvisionedDevicesPage from './components/pages/ProvisionedDevicesPage';
import ConnectionStatus from './components/ConnectionStatus';
import { DashboardProvider } from './context/DashboardContext';
import { TimeRange } from './types';
import { AlertCircle } from 'lucide-react';

export type PageType = 'dashboard' | 'devices' | 'monitoring' | 'discovery' | 'credentials' | 'network' | 'security' | 'alerts' | 'settings' | 'provisioned';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [timeRange, setTimeRange] = useState<TimeRange>('7d');
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
  const [isBackendConnected, setIsBackendConnected] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'credentials':
        return <CredentialsPage />;
      case 'discovery':
        return <DiscoveryPage />;
      case 'provisioned':
        return <ProvisionedDevicesPage />;
      case 'dashboard':
      default:
        return <Dashboard timeRange={timeRange} />;
    }
  };

  return (
    <DashboardProvider>
      <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
        <Header 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen}
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          isBackendConnected={isBackendConnected}
        />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar 
            open={sidebarOpen} 
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            isBackendConnected={isBackendConnected}
            connectionStatus={
              <ConnectionStatus onConnectionChange={setIsBackendConnected} />
            }
          />
          <main className="flex-1 overflow-auto p-4">
            {!isBackendConnected && (currentPage === 'discovery' || currentPage === 'credentials' || currentPage === 'provisioned') && (
              <div className="mb-6 p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-yellow-400" />
                  <span className="text-yellow-300 font-medium">Backend Connection Required</span>
                </div>
                <p className="text-yellow-400 text-sm">
                  Please start your Java backend server to access discovery, credential management, and provisioned devices features.
                </p>
              </div>
            )}
            {renderPage()}
          </main>
        </div>
      </div>
    </DashboardProvider>
  );
}

export default App;