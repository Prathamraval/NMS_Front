import { TimeRange, DataPoint, NameValuePair } from '../types';
import { format, subDays, subMonths, subYears } from 'date-fns';

// Filter data based on time range
export const getTimeRangeData = (data: DataPoint[], timeRange: TimeRange): DataPoint[] => {
  const fullData = [...data];
  
  switch (timeRange) {
    case '24h':
      return fullData.slice(-24);
    case '7d':
      return fullData.slice(-7);
    case '30d':
      return fullData.slice(-30);
    case '90d':
      return fullData.slice(-90);
    case '1y':
      // For yearly, we might want to aggregate by month instead of showing all 365 days
      return aggregateDataByMonth(fullData);
    default:
      return fullData;
  }
};

// Simple aggregation by month (for yearly view)
const aggregateDataByMonth = (data: DataPoint[]): DataPoint[] => {
  // This is a simplified implementation
  // In a real app, we would properly aggregate the daily data into monthly averages
  return data.filter((_, index) => index % 30 === 0);
};

// Get data for bar charts (optionally limit the number of items)
export const getBarChartData = (data: NameValuePair[], timeRange: TimeRange, limit: number): NameValuePair[] => {
  // For demo purposes, we're just limiting the items
  // In a real app, you would filter by time range and potentially aggregate
  return [...data].sort((a, b) => b.value - a.value).slice(0, limit);
};