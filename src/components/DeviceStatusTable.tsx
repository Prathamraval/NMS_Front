import React from 'react';
import { useDashboardContext } from '../context/DashboardContext';
import { CheckCircle, XCircle, AlertCircle, Clock } from 'lucide-react';
import { format } from 'date-fns';

const DeviceStatusTable: React.FC = () => {
  const { deviceStatuses } = useDashboardContext();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'offline':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'unknown':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'online':
        return `${baseClasses} bg-emerald-900/30 text-emerald-400 border border-emerald-500/30`;
      case 'offline':
        return `${baseClasses} bg-red-900/30 text-red-400 border border-red-500/30`;
      case 'unknown':
        return `${baseClasses} bg-yellow-900/30 text-yellow-400 border border-yellow-500/30`;
      default:
        return `${baseClasses} bg-gray-900/30 text-gray-400 border border-gray-500/30`;
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-5 shadow-md border border-gray-700">
      <h3 className="text-lg font-medium text-white mb-4">Device Status</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-3 px-2 text-gray-300 font-medium">Status</th>
              <th className="text-left py-3 px-2 text-gray-300 font-medium">IP Address</th>
              <th className="text-left py-3 px-2 text-gray-300 font-medium">System Name</th>
              <th className="text-left py-3 px-2 text-gray-300 font-medium">OS</th>
              <th className="text-left py-3 px-2 text-gray-300 font-medium">CPU</th>
              <th className="text-left py-3 px-2 text-gray-300 font-medium">Memory</th>
              <th className="text-left py-3 px-2 text-gray-300 font-medium">Uptime</th>
              <th className="text-left py-3 px-2 text-gray-300 font-medium">Last Seen</th>
            </tr>
          </thead>
          <tbody>
            {deviceStatuses.map((device, index) => (
              <tr key={device.ip} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                <td className="py-3 px-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(device.status)}
                    <span className={getStatusBadge(device.status)}>
                      {device.status.charAt(0).toUpperCase() + device.status.slice(1)}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-2 text-gray-300 font-mono">{device.ip}</td>
                <td className="py-3 px-2 text-gray-300">
                  {device.systemName || 'Unknown'}
                </td>
                <td className="py-3 px-2 text-gray-300">
                  {device.osName || 'Unknown'}
                </td>
                <td className="py-3 px-2 text-gray-300">
                  {device.cpuPercent ? (
                    <div className="flex items-center gap-2">
                      <div className="w-12 bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            device.cpuPercent > 80 ? 'bg-red-500' : 
                            device.cpuPercent > 60 ? 'bg-yellow-500' : 'bg-emerald-500'
                          }`}
                          style={{ width: `${Math.min(device.cpuPercent, 100)}%` }}
                        />
                      </div>
                      <span className="text-xs">{device.cpuPercent.toFixed(1)}%</span>
                    </div>
                  ) : (
                    <span className="text-gray-500">-</span>
                  )}
                </td>
                <td className="py-3 px-2 text-gray-300">
                  {device.memoryPercent ? (
                    <div className="flex items-center gap-2">
                      <div className="w-12 bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            device.memoryPercent > 80 ? 'bg-red-500' : 
                            device.memoryPercent > 60 ? 'bg-yellow-500' : 'bg-emerald-500'
                          }`}
                          style={{ width: `${Math.min(device.memoryPercent, 100)}%` }}
                        />
                      </div>
                      <span className="text-xs">{device.memoryPercent.toFixed(1)}%</span>
                    </div>
                  ) : (
                    <span className="text-gray-500">-</span>
                  )}
                </td>
                <td className="py-3 px-2 text-gray-300 text-xs">
                  {device.uptime || '-'}
                </td>
                <td className="py-3 px-2 text-gray-400 text-xs">
                  {format(new Date(device.lastSeen), 'MMM d, HH:mm')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeviceStatusTable;