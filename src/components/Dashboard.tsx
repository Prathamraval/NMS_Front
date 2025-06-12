import React from 'react';
import { useDashboardContext } from '../context/DashboardContext';
import StatCard from './StatCard';
import DeviceStatusTable from './DeviceStatusTable';
import AreaChartWidget from './charts/AreaChartWidget';
import LineChartWidget from './charts/LineChartWidget';
import PieChartWidget from './charts/PieChartWidget';
import NetworkTrafficChart from './charts/NetworkTrafficChart';
import { TimeRange } from '../types';
import { 
  Server, 
  Wifi, 
  AlertTriangle, 
  CheckCircle,
  XCircle,
  Activity
} from 'lucide-react';

interface DashboardProps {
  timeRange: TimeRange;
}

const Dashboard: React.FC<DashboardProps> = ({ timeRange }) => {
  const { stats } = useDashboardContext();

  return (
    <div className="space-y-6 pb-6">
      <section>
        <h2 className="text-xl font-bold mb-4">Network Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Devices"
            value={stats.totalDevices.toString()}
            change={8.2}
            icon={<Server className="text-blue-500" />}
          />
          <StatCard
            title="Online Devices"
            value={stats.onlineDevices.toString()}
            change={2.1}
            icon={<CheckCircle className="text-emerald-500" />}
          />
          <StatCard
            title="Offline Devices"
            value={stats.offlineDevices.toString()}
            change={-12.5}
            icon={<XCircle className="text-red-500" />}
          />
          <StatCard
            title="Avg CPU Usage"
            value={`${stats.avgCpuUsage}%`}
            change={-3.2}
            icon={<Activity className="text-purple-500" />}
          />
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChartWidget title="CPU Usage Trend" timeRange={timeRange} dataType="cpu" />
        <LineChartWidget title="Memory Usage Trend" timeRange={timeRange} dataType="memory" />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NetworkTrafficChart title="Network Traffic" timeRange={timeRange} />
        <PieChartWidget title="Device Status Distribution" timeRange={timeRange} dataType="status" />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DeviceStatusTable />
        </div>
        <div>
          <PieChartWidget title="Device Types" timeRange={timeRange} dataType="deviceType" />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;