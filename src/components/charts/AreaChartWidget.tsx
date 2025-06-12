import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { useDashboardContext } from '../../context/DashboardContext';
import ChartCard from './ChartCard';
import { TimeRange } from '../../types';
import { getTimeRangeData } from '../../utils/dataUtils';

interface AreaChartWidgetProps {
  title: string;
  timeRange: TimeRange;
}

const AreaChartWidget: React.FC<AreaChartWidgetProps> = ({ title, timeRange }) => {
  const { revenueData } = useDashboardContext();
  const data = getTimeRangeData(revenueData, timeRange);

  const gradientId = `areaGradient-${title.replace(/\s+/g, '')}`;

  return (
    <ChartCard title={title}>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
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
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1F2937', 
              borderColor: '#374151',
              color: '#F9FAFB' 
            }}
            itemStyle={{ color: '#F9FAFB' }}
            labelStyle={{ color: '#F9FAFB' }}
            formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="#6366F1" 
            strokeWidth={2}
            fillOpacity={1} 
            fill={`url(#${gradientId})`} 
            animationDuration={1000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default AreaChartWidget;