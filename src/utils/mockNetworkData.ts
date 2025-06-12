import { format, subDays, subHours } from 'date-fns';
import { Credential, Discovery, MonitorData, DeviceStatus } from '../types';

export const generateMockNetworkData = () => {
  // Mock credentials
  const credentials: Credential[] = [
    {
      id: 1,
      profile_name: "jenil12",
      protocol: "ssh",
      username: "jenil",
      password: "Mind@123",
      created_at: "2024-01-15T10:30:00Z"
    },
    {
      id: 2,
      profile_name: "server_admin",
      protocol: "ssh",
      username: "admin",
      password: "SecurePass@456",
      created_at: "2024-01-20T14:15:00Z"
    },
    {
      id: 3,
      profile_name: "network_ops",
      protocol: "ssh",
      username: "netops",
      password: "NetOps@789",
      created_at: "2024-02-01T09:45:00Z"
    }
  ];

  // Mock discoveries
  const discoveries: Discovery[] = [
    {
      id: 1,
      discovery_name: "Pratham_new1",
      credential_id: 1,
      ip_address: "10.20.41.5",
      port_no: 22,
      wait_time: 3,
      status: 'completed',
      created_at: "2024-02-10T11:20:00Z"
    },
    {
      id: 2,
      discovery_name: "Server_Discovery",
      credential_id: 2,
      ip_address: "10.20.41.217",
      port_no: 22,
      wait_time: 5,
      status: 'failed',
      created_at: "2024-02-12T16:30:00Z"
    },
    {
      id: 3,
      discovery_name: "Web_Server_01",
      credential_id: 1,
      ip_address: "10.20.41.100",
      port_no: 22,
      wait_time: 3,
      status: 'completed',
      created_at: "2024-02-15T08:45:00Z"
    },
    {
      id: 4,
      discovery_name: "DB_Server_Main",
      credential_id: 3,
      ip_address: "10.20.41.150",
      port_no: 22,
      wait_time: 4,
      status: 'running',
      created_at: "2024-02-18T13:10:00Z"
    }
  ];

  // Mock monitor data (recent polling results)
  const monitorData: MonitorData[] = [
    {
      monitorId: 269,
      data: {
        ip: "10.20.41.5",
        uptime: " 12:04:56 up 10 days, 22:45,  1 user,  load average: 2.45, 2.30, 1.76",
        timestamp: "2025-01-12T12:04:56.298743408+05:30",
        monitor_id: 269,
        "system.name": "pratham-ThinkPad-T14s-Gen-1",
        "started.time": "12:04:56",
        "system.os.name": "Linux",
        "system.threads": 2053,
        "system.cpu.cores": 8,
        "system.os.version": "Ubuntu 22.04.3 LTS",
        "system.cpu.percent": 11.781075673625088,
        "started.time.seconds": 10,
        "system.load.avg1.min": 2.45,
        "system.load.avg5.min": 2.3,
        "system.cpu.io.percent": 0.14003927279072265,
        "system.load.avg15.min": 1.76,
        "system.disk.free.bytes": 177969475584,
        "system.disk.used.bytes": 59612741632,
        "system.cpu.idle.percent": 88.07888505358419,
        "system.blocked.processes": 4,
        "system.disk.free.percent": 71.0811382286327,
        "system.disk.used.percent": 23.809372445624653,
        "system.memory.used.bytes": 16375099392,
        "system.running.processes": 382,
        "system.cpu.kernel.percent": 2.2659586256984956,
        "system.disk.capacity.bytes": 250375106560,
        "system.memory.used.percent": 65.4,
        "system.memory.installed.bytes": 25032548352,
        "system.overall.memory.used.bytes": 16375099392,
        "system.overall.memory.used.percent": 65.4
      },
      timestamp: "2025-01-12T12:04:56.298743408"
    },
    {
      monitorId: 217,
      data: {
        ip: "10.20.41.217",
        error: "device is not up: failed to connect: dial tcp 10.20.41.217:22: connect: no route to host",
        timestamp: "2025-01-12T12:04:53.747678074+05:30",
        monitor_id: 217
      },
      timestamp: "2025-01-12T12:04:53.747678074"
    },
    {
      monitorId: 300,
      data: {
        ip: "10.20.41.100",
        uptime: " 08:15:32 up 5 days, 14:20,  2 users,  load average: 0.85, 0.92, 1.05",
        timestamp: "2025-01-12T08:15:32.123456789+05:30",
        monitor_id: 300,
        "system.name": "web-server-01",
        "started.time": "08:15:32",
        "system.os.name": "Linux",
        "system.threads": 1245,
        "system.cpu.cores": 4,
        "system.os.version": "CentOS 8.4",
        "system.cpu.percent": 15.2,
        "system.load.avg1.min": 0.85,
        "system.load.avg5.min": 0.92,
        "system.load.avg15.min": 1.05,
        "system.disk.free.bytes": 89478485760,
        "system.disk.used.bytes": 35651477504,
        "system.disk.free.percent": 71.5,
        "system.disk.used.percent": 28.5,
        "system.memory.used.bytes": 6442450944,
        "system.running.processes": 156,
        "system.cpu.kernel.percent": 3.8,
        "system.disk.capacity.bytes": 125129963264,
        "system.memory.used.percent": 40.2,
        "system.memory.installed.bytes": 16106127360
      },
      timestamp: "2025-01-12T08:15:32.123456789"
    }
  ];

  // Generate device status summary
  const deviceStatuses: DeviceStatus[] = [
    {
      ip: "10.20.41.5",
      status: 'online',
      lastSeen: "2025-01-12T12:04:56Z",
      systemName: "pratham-ThinkPad-T14s-Gen-1",
      osName: "Linux Ubuntu 22.04.3 LTS",
      cpuPercent: 11.78,
      memoryPercent: 65.4,
      diskPercent: 23.81,
      uptime: "10 days, 22:45"
    },
    {
      ip: "10.20.41.217",
      status: 'offline',
      lastSeen: "2025-01-10T15:30:00Z",
      systemName: "Unknown",
      osName: "Unknown"
    },
    {
      ip: "10.20.41.100",
      status: 'online',
      lastSeen: "2025-01-12T08:15:32Z",
      systemName: "web-server-01",
      osName: "Linux CentOS 8.4",
      cpuPercent: 15.2,
      memoryPercent: 40.2,
      diskPercent: 28.5,
      uptime: "5 days, 14:20"
    },
    {
      ip: "10.20.41.150",
      status: 'unknown',
      lastSeen: "2025-01-12T10:00:00Z",
      systemName: "db-server-main",
      osName: "Linux"
    }
  ];

  // Generate historical CPU data for charts
  const cpuHistoryData = Array.from({ length: 24 }, (_, i) => {
    const date = format(subHours(new Date(), 23 - i), 'HH:mm');
    return {
      date,
      value: Math.random() * 30 + 10 // 10-40% CPU usage
    };
  });

  // Generate memory usage data
  const memoryHistoryData = Array.from({ length: 24 }, (_, i) => {
    const date = format(subHours(new Date(), 23 - i), 'HH:mm');
    return {
      date,
      value: Math.random() * 40 + 40 // 40-80% memory usage
    };
  });

  // Network traffic data
  const networkTrafficData = Array.from({ length: 24 }, (_, i) => {
    const date = format(subHours(new Date(), 23 - i), 'HH:mm');
    return {
      date,
      inbound: Math.random() * 100 + 20,
      outbound: Math.random() * 80 + 15
    };
  });

  // Device type distribution
  const deviceTypeData = [
    { name: 'Linux Servers', value: 12 },
    { name: 'Windows Servers', value: 8 },
    { name: 'Network Devices', value: 15 },
    { name: 'IoT Devices', value: 6 },
    { name: 'Workstations', value: 9 }
  ];

  // Status distribution
  const statusDistribution = [
    { name: 'Online', value: 35 },
    { name: 'Offline', value: 8 },
    { name: 'Warning', value: 5 },
    { name: 'Critical', value: 2 }
  ];

  return {
    credentials,
    discoveries,
    monitorData,
    deviceStatuses,
    cpuHistoryData,
    memoryHistoryData,
    networkTrafficData,
    deviceTypeData,
    statusDistribution,
    stats: {
      totalDevices: 50,
      onlineDevices: 35,
      offlineDevices: 8,
      warningDevices: 5,
      criticalDevices: 2,
      avgCpuUsage: 18.5,
      avgMemoryUsage: 62.3,
      totalCredentials: credentials.length,
      activeDiscoveries: discoveries.filter(d => d.status === 'running').length
    }
  };
};