import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { useDashboardContext } from '../../context/DashboardContext';
import ChartCard from './ChartCard';
import { TimeRange } from '../../types';

interface LineChartWidgetProps {
  title: string;
  timeRange: TimeRange;
  dataType?: 'cpu' | 'memory';
}

const LineChartWidget: React.FC<LineChartWidgetProps> = ({ title, timeRange, dataType = 'cpu' }) => {
  const { cpuHistoryData, memoryHistoryData } = useDashboardContext();
  const data = dataType === 'cpu' ? cpuHistoryData : memoryHistoryData;
  const color = dataType === 'cpu' ? '#6366F1' : '#10B981';
  const unit = '%';

  return (
    <ChartCard title={title}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
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
            tickFormatter={(value) => `${value}${unit}`}
            domain={[0, 100]}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1F2937', 
              borderColor: '#374151',
              color: '#F9FAFB' 
            }}
            itemStyle={{ color: '#F9FAFB' }}
            labelStyle={{ color: '#F9FAFB' }}
            formatter={(value: number) => [`${value.toFixed(1)}${unit}`, dataType === 'cpu' ? 'CPU Usage' : 'Memory Usage']}
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={color} 
            strokeWidth={2}
            dot={{ stroke: color, strokeWidth: 2, r: 4, fill: '#1F2937' }}
            activeDot={{ r: 6, stroke: color, strokeWidth: 2, fill: color }}
            animationDuration={1000}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default LineChartWidget;