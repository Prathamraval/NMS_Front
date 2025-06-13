import React from 'react';
import { 
  LayoutDashboard, 
  Server, 
  Wifi, 
  Settings, 
  Users, 
  Bell, 
  LogOut,
  Key,
  Search,
  Activity,
  Shield,
  Monitor
} from 'lucide-react';
import { PageType } from '../App';

interface SidebarProps {
  open: boolean;
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
  isBackendConnected: boolean;
  connectionStatus: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  open, 
  currentPage, 
  onPageChange, 
  isBackendConnected, 
  connectionStatus 
}) => {
  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', page: 'dashboard' as PageType },
    { icon: <Server size={20} />, label: 'Devices', page: 'devices' as PageType },
    { icon: <Activity size={20} />, label: 'Monitoring', page: 'monitoring' as PageType },
    { icon: <Search size={20} />, label: 'Discovery', page: 'discovery' as PageType, requiresBackend: true },
    { icon: <Key size={20} />, label: 'Credentials', page: 'credentials' as PageType, requiresBackend: true },
    { icon: <Monitor size={20} />, label: 'Provisioned Devices', page: 'provisioned' as PageType, requiresBackend: true },
    { icon: <Wifi size={20} />, label: 'Network', page: 'network' as PageType },
    { icon: <Shield size={20} />, label: 'Security', page: 'security' as PageType },
    { icon: <Bell size={20} />, label: 'Alerts', page: 'alerts' as PageType },
    { icon: <Settings size={20} />, label: 'Settings', page: 'settings' as PageType },
  ];

  if (!open) {
    return (
      <div
        className="w-16 bg-gray-800 border-r border-gray-700 overflow-y-auto"
      >
        <div className="py-4 flex flex-col items-center">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => onPageChange(item.page)}
              disabled={item.requiresBackend && !isBackendConnected}
              className={`p-3 w-full flex justify-center ${
                currentPage === item.page
                  ? 'text-white bg-gray-700' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              } transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {item.icon}
            </button>
          ))}
        </div>
        <div className="mt-auto py-4 flex flex-col items-center border-t border-gray-700">
          <button className="p-3 w-full flex justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors duration-200">
            <LogOut size={20} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-64 bg-gray-900 border-r border-gray-800 overflow-y-auto"
    >
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Monitor className="w-6 h-6 text-purple-400" />
          Network Monitoring
        </h1>
        <div className="mt-2">
          {connectionStatus}
        </div>
      </div>
      
      <div className="py-4">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => onPageChange(item.page)}
            disabled={item.requiresBackend && !isBackendConnected}
            className={`px-4 py-3 w-full flex items-center gap-3 ${
              currentPage === item.page
                ? 'text-white bg-gray-700' 
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            } transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {item.icon}
            <span>{item.label}</span>
            {item.requiresBackend && !isBackendConnected && (
              <span className="ml-auto text-xs text-red-400">•</span>
            )}
          </button>
        ))}
      </div>
      <div className="mt-auto py-4 border-t border-gray-700">
        <button className="px-4 py-3 w-full flex items-center gap-3 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors duration-200">
          <LogOut size={20} />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;