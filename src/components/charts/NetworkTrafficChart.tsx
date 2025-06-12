import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { useDashboardContext } from '../../context/DashboardContext';
import ChartCard from './ChartCard';
import { TimeRange } from '../../types';

interface NetworkTrafficChartProps {
  title: string;
  timeRange: TimeRange;
}

const NetworkTrafficChart: React.FC<NetworkTrafficChartProps> = ({ title, timeRange }) => {
  const { networkTrafficData } = useDashboardContext();

  return (
    <ChartCard title={title}>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={networkTrafficData}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="inboundGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="outboundGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="date" 
            stroke="#9CA3AF"
            tick={{ fill: '#9CA3AF' }}
            axisLine={{ stroke: '#4B5563' }}
          />
          <YAxis 
            stroke="#9CA3AF"
            tick={{ fill: '#9CA3AF' }}
            axisLine={{ stroke: '#4B5563' }}
            tickFormatter={(value) => `${value} MB/s`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1F2937', 
              borderColor: '#374151',
              color: '#F9FAFB' 
            }}
            itemStyle={{ color: '#F9FAFB' }}
            labelStyle={{ color: '#F9FAFB' }}
            formatter={(value: number, name: string) => [
              `${value.toFixed(1)} MB/s`, 
              name === 'inbound' ? 'Inbound' : 'Outbound'
            ]}
          />
          <Legend 
            formatter={(value) => (
              <span style={{ color: '#D1D5DB' }}>
                {value === 'inbound' ? 'Inbound Traffic' : 'Outbound Traffic'}
              </span>
            )}
          />
          <Area 
            type="monotone" 
            dataKey="inbound" 
            stackId="1"
            stroke="#10B981" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#inboundGradient)" 
            animationDuration={1000}
          />
          <Area 
            type="monotone" 
            dataKey="outbound" 
            stackId="1"
            stroke="#F59E0B" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#outboundGradient)" 
            animationDuration={1000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default NetworkTrafficChart;