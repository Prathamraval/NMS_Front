import React, { useState } from 'react';
import { useApiData, useApiMutation } from '../../hooks/useApi';
import { apiService, ProvisionedDevice, PollingDataSnapshot, PollingDataResponse } from '../../services/api';
import { Loader2, Play, Pause, BarChart2, Server, Cpu, HardDrive, Clock, AlertCircle } from 'lucide-react';
import { format, isValid, parseISO } from 'date-fns';
import Notification from '../Notification';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Helper to safely format timestamps
function safeFormatDate(dateString: string | undefined, fmt: string) {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'N/A';
  return format(date, fmt);
}

const ProvisionedDevicesPage: React.FC = () => {
  const [selectedDevice, setSelectedDevice] = useState<number | null>(null);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  const [historicalData, setHistoricalData] = useState<{
    timestamps: string[];
    cpuUsage: number[];
    memoryUsage: number[];
    diskUsage: number[];
    loadAverage: number[];
  }>({
    timestamps: [],
    cpuUsage: [],
    memoryUsage: [],
    diskUsage: [],
    loadAverage: []
  });
  const [searchTerm, setSearchTerm] = useState('');

  const { data: devicesData, loading, error, refetch } = useApiData(
    () => {
      console.log('Fetching provisioned devices...');
      return apiService.getProvisionedDevices();
    }
  );

  const { mutate: updateStatus, loading: updateLoading } = useApiMutation(
    ({ monitorId, status }: { monitorId: number; status: boolean }) => {
      console.log('Updating provision status:', { monitorId, status });
      return apiService.updateProvisionStatus(monitorId, status);
    }
  );

  // Only fetch polling data if a device is selected
  const { data: pollingData } = useApiData<PollingDataResponse>(
    () => selectedDevice !== null
      ? apiService.getPollingData(selectedDevice)
      : Promise.resolve({ success: true, statusCode: 200, data: { entity: [] } }),
    [selectedDevice]
  );

  // Use the last snapshot for current stats
  const snapshots = pollingData?.entity || [];
  const latest = snapshots.length > 0 ? snapshots[snapshots.length - 1] : undefined;

  // For graphs, use all snapshots
  React.useEffect(() => {
    if (snapshots.length > 0 && !snapshots[snapshots.length - 1].data.error) {
      setHistoricalData(prev => {
        const newData = { ...prev };
        // Only keep the last 20
        const sliced = snapshots.slice(-20);
        newData.timestamps = sliced.map(s => safeFormatDate(s.timestamp, 'HH:mm:ss'));
        newData.cpuUsage = sliced.map(s => s.data['system.cpu.percent'] ?? 0);
        newData.memoryUsage = sliced.map(s => s.data['system.memory.used.percent'] ?? 0);
        newData.diskUsage = sliced.map(s => s.data['system.disk.used.percent'] ?? 0);
        newData.loadAverage = sliced.map(s => s.data['system.load.avg1.min'] ?? 0);
        return newData;
      });
    }
  }, [pollingData]);

  const devices = devicesData?.entities || [];
  console.log('Devices data:', devices);

  // Filter devices based on search term
  const filteredDevices = devices.filter(device =>
    device.discovery_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.ip_address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusToggle = async (monitorId: number, currentStatus: boolean) => {
    try {
      await updateStatus({ monitorId, status: !currentStatus });
      refetch();
      setNotification({
        message: `Monitoring ${!currentStatus ? 'started' : 'paused'} successfully`,
        type: 'success'
      });
    } catch (error) {
      setNotification({
        message: error instanceof Error ? error.message : 'Failed to update status',
        type: 'error'
      });
    }
  };

  const handleDeviceClick = (monitorId: number) => {
    setSelectedDevice(monitorId);
  };

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#9CA3AF'
        }
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#1F2937',
        borderColor: '#374151',
        borderWidth: 1,
        titleColor: '#F9FAFB',
        bodyColor: '#F9FAFB',
        callbacks: {
          title: (items) => items[0]?.label || '',
          label: (item) => `${item.dataset.label}: ${item.formattedValue}`
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(75, 85, 99, 0.2)'
        },
        ticks: {
          color: '#9CA3AF'
        }
      },
      y: {
        grid: {
          color: 'rgba(75, 85, 99, 0.2)'
        },
        ticks: {
          color: '#9CA3AF'
        }
      }
    }
  };

  const getChartData = (label: string, data: number[], color: string) => ({
    labels: historicalData.timestamps,
    datasets: [
      {
        label,
        data,
        borderColor: color,
        backgroundColor: color + '20',
        tension: 0.4,
        fill: true
      }
    ]
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
        <p className="text-red-400">Error loading devices: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#181f2a]">
      <div className="space-y-6 p-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Provisioned Devices</h1>
          <p className="text-gray-400">Monitor and manage provisioned devices</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search by name or IP..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        {selectedDevice ? (
          <div className="space-y-6">
            <button
              onClick={() => setSelectedDevice(null)}
              className="mb-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
            >
              ← Back to Device List
            </button>
            {!latest ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
                <span className="ml-2 text-gray-400">Loading device metrics...</span>
              </div>
            ) : latest.data.error ? (
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="w-6 h-6 text-red-400" />
                  <h2 className="text-lg font-medium text-white">Connection Error</h2>
                </div>
                <p className="text-red-400">{latest.data.error}</p>
                <p className="text-gray-400 text-sm mt-2">
                  Last checked: {safeFormatDate(latest.timestamp, 'MMM d, HH:mm:ss')}
                </p>
              </div>
            ) : (
              <>
                {/* System Info Card */}
                <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-medium text-white">System Information</h2>
                    <div className="text-gray-400 text-sm">
                      Last updated: {safeFormatDate(latest.timestamp, 'MMM d, HH:mm:ss')}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Server className="w-5 h-5 text-blue-400" />
                        <div>
                          <div className="text-sm text-gray-400">Hostname</div>
                          <div className="text-white font-medium">{latest.data['system.name']}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Cpu className="w-5 h-5 text-purple-400" />
                        <div>
                          <div className="text-sm text-gray-400">CPU Cores</div>
                          <div className="text-white font-medium">{latest.data['system.cpu.cores']}</div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Server className="w-5 h-5 text-green-400" />
                        <div>
                          <div className="text-sm text-gray-400">OS</div>
                          <div className="text-white font-medium">{latest.data['system.os.name']}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-yellow-400" />
                        <div>
                          <div className="text-sm text-gray-400">Uptime</div>
                          <div className="text-white font-medium">{latest.data.uptime}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Stat Card Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
                  <div className="bg-gray-900 rounded-lg border border-gray-700 p-4 flex items-center gap-4">
                    <Cpu className="w-6 h-6 text-purple-400" />
                    <div>
                      <div className="text-sm text-gray-400">CPU Usage</div>
                      <div className="text-xl font-bold text-white">{latest.data['system.cpu.percent'] != null ? `${latest.data['system.cpu.percent'].toFixed(1)}%` : 'N/A'}</div>
                    </div>
                  </div>
                  <div className="bg-gray-900 rounded-lg border border-gray-700 p-4 flex items-center gap-4">
                    <HardDrive className="w-6 h-6 text-blue-400" />
                    <div>
                      <div className="text-sm text-gray-400">Memory Usage</div>
                      <div className="text-xl font-bold text-white">{latest.data['system.memory.used.percent'] != null ? `${latest.data['system.memory.used.percent'].toFixed(1)}%` : 'N/A'}</div>
                    </div>
                  </div>
                  <div className="bg-gray-900 rounded-lg border border-gray-700 p-4 flex items-center gap-4">
                    <HardDrive className="w-6 h-6 text-emerald-400" />
                    <div>
                      <div className="text-sm text-gray-400">Disk Usage</div>
                      <div className="text-xl font-bold text-white">{latest.data['system.disk.used.percent'] != null ? `${latest.data['system.disk.used.percent'].toFixed(1)}%` : 'N/A'}</div>
                    </div>
                  </div>
                  <div className="bg-gray-900 rounded-lg border border-gray-700 p-4 flex items-center gap-4">
                    <Clock className="w-6 h-6 text-yellow-400" />
                    <div>
                      <div className="text-sm text-gray-400">Uptime</div>
                      <div className="text-xl font-bold text-white">{latest.data.uptime || 'N/A'}</div>
                    </div>
                  </div>
                  <div className="bg-gray-900 rounded-lg border border-gray-700 p-4 flex items-center gap-4">
                    <Server className="w-6 h-6 text-green-400" />
                    <div>
                      <div className="text-sm text-gray-400">OS</div>
                      <div className="text-xl font-bold text-white">{latest.data['system.os.name'] || 'N/A'}</div>
                    </div>
                  </div>
                </div>
                {/* Resource Usage Graphs */}
                <div className="grid grid-cols-1 gap-6">
                  {/* CPU Usage Graph */}
                  <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 h-96">
                    <div className="flex items-center gap-3 mb-4">
                      <Cpu className="w-5 h-5 text-purple-400" />
                      <h3 className="text-white font-medium">CPU Usage</h3>
                    </div>
                    <div className="h-64">
                      <Line options={chartOptions} data={getChartData('CPU Usage %', historicalData.cpuUsage, '#A855F7')} />
                    </div>
                  </div>
                  {/* Memory Usage Graph */}
                  <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 h-96">
                    <div className="flex items-center gap-3 mb-4">
                      <HardDrive className="w-5 h-5 text-blue-400" />
                      <h3 className="text-white font-medium">Memory Usage</h3>
                    </div>
                    <div className="h-64">
                      <Line options={chartOptions} data={getChartData('Memory Usage %', historicalData.memoryUsage, '#3B82F6')} />
                    </div>
                  </div>
                  {/* Disk Usage Graph */}
                  <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 h-96">
                    <div className="flex items-center gap-3 mb-4">
                      <HardDrive className="w-5 h-5 text-emerald-400" />
                      <h3 className="text-white font-medium">Disk Usage</h3>
                    </div>
                    <div className="h-64">
                      <Line options={chartOptions} data={getChartData('Disk Usage %', historicalData.diskUsage, '#10B981')} />
                    </div>
                  </div>
                  {/* Load Average Graph */}
                  <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 h-96">
                    <div className="flex items-center gap-3 mb-4">
                      <BarChart2 className="w-5 h-5 text-yellow-400" />
                      <h3 className="text-white font-medium">Load Average</h3>
                    </div>
                    <div className="h-64">
                      <Line options={chartOptions} data={getChartData('Load Average (1m)', historicalData.loadAverage, '#F59E0B')} />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="w-full max-w-2xl mx-auto">
            <div className="bg-gray-800 rounded-lg border border-gray-700">
              <div className="p-4 border-b border-gray-700">
                <h2 className="text-lg font-medium text-white">Devices</h2>
              </div>
              <div className="divide-y divide-gray-700">
                {filteredDevices.length === 0 ? (
                  <div className="p-8 text-center text-gray-400">
                    {searchTerm ? 'No matching provisioned devices found.' : 'No provisioned devices found.'}
                  </div>
                ) : (
                  filteredDevices.map((device) => (
                    <div
                      key={device.monitor_id}
                      className={`p-4 cursor-pointer hover:bg-gray-700/30 transition-colors`}
                      onClick={() => handleDeviceClick(device.monitor_id)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-white font-medium">{device.discovery_name}</h3>
                          <p className="text-gray-400 text-sm font-mono">{device.ip_address}</p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusToggle(device.monitor_id, device.status);
                          }}
                          disabled={updateLoading}
                          className={`p-2 rounded-md ${
                            device.status
                              ? 'bg-emerald-600 hover:bg-emerald-700'
                              : 'bg-gray-600 hover:bg-gray-700'
                          }`}
                          title={device.status ? 'Pause monitoring' : 'Start monitoring'}
                        >
                          {device.status ? (
                            <Pause size={16} className="text-white" />
                          ) : (
                            <Play size={16} className="text-white" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}
      </div>
    </div>
  );
};

export default ProvisionedDevicesPage; 