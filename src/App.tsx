import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import CredentialsPage from './components/pages/CredentialsPage';
import DiscoveryPage from './components/pages/DiscoveryPage';
import { DashboardProvider } from './context/DashboardContext';
import { TimeRange } from './types';

export type PageType = 'dashboard' | 'devices' | 'monitoring' | 'discovery' | 'credentials' | 'network' | 'security' | 'alerts' | 'settings';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [timeRange, setTimeRange] = useState<TimeRange>('7d');
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'credentials':
        return <CredentialsPage />;
      case 'discovery':
        return <DiscoveryPage />;
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
        />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar 
            open={sidebarOpen} 
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
          <main className="flex-1 overflow-auto p-4">
            {renderPage()}
          </main>
        </div>
      </div>
    </DashboardProvider>
  );
}

export default App;