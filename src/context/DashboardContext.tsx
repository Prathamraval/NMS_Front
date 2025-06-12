import React, { createContext, useContext, ReactNode } from 'react';
import { generateMockNetworkData } from '../utils/mockNetworkData';
import { Credential, Discovery, MonitorData, DeviceStatus } from '../types';

interface DashboardContextType {
  // Network monitoring data
  credentials: Credential[];
  discoveries: Discovery[];
  monitorData: MonitorData[];
  deviceStatuses: DeviceStatus[];
  
  // Chart data
  cpuHistoryData: Array<{ date: string; value: number }>;
  memoryHistoryData: Array<{ date: string; value: number }>;
  networkTrafficData: Array<{ date: string; inbound: number; outbound: number }>;
  deviceTypeData: Array<{ name: string; value: number }>;
  statusDistribution: Array<{ name: string; value: number }>;
  
  // Stats
  stats: {
    totalDevices: number;
    onlineDevices: number;
    offlineDevices: number;
    warningDevices: number;
    criticalDevices: number;
    avgCpuUsage: number;
    avgMemoryUsage: number;
    totalCredentials: number;
    activeDiscoveries: number;
  };
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Generate mock network monitoring data
  const mockData = generateMockNetworkData();

  return (
    <DashboardContext.Provider value={mockData}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboardContext must be used within a DashboardProvider');
  }
  return context;
};