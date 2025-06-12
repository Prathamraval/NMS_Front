export type TimeRange = '24h' | '7d' | '30d' | '90d' | '1y';

export interface DataPoint {
  date: string;
  value: number;
}

export interface NameValuePair {
  name: string;
  value: number;
}

// Network Monitoring Types
export interface Credential {
  id: number;
  profile_name: string;
  protocol: string;
  username: string;
  password: string;
  created_at: string;
}

export interface Discovery {
  id: number;
  discovery_name: string;
  credential_id: number;
  ip_address: string;
  port_no: number;
  wait_time: number;
  status: 'pending' | 'running' | 'completed' | 'failed';
  created_at: string;
}

export interface MonitorData {
  monitorId: number;
  data: {
    ip: string;
    uptime?: string;
    timestamp: string;
    monitor_id: number;
    'system.name'?: string;
    'started.time'?: string;
    'system.os.name'?: string;
    'system.threads'?: number;
    'system.cpu.cores'?: number;
    'system.os.version'?: string;
    'system.cpu.percent'?: number;
    'started.time.seconds'?: number;
    'system.load.avg1.min'?: number;
    'system.load.avg5.min'?: number;
    'system.cpu.io.percent'?: number;
    'system.load.avg15.min'?: number;
    'system.disk.free.bytes'?: number;
    'system.disk.used.bytes'?: number;
    'system.cpu.idle.percent'?: number;
    'system.blocked.processes'?: number;
    'system.disk.free.percent'?: number;
    'system.disk.used.percent'?: number;
    'system.memory.used.bytes'?: number;
    'system.running.processes'?: number;
    'system.cpu.kernel.percent'?: number;
    'system.disk.capacity.bytes'?: number;
    'system.memory.used.percent'?: number;
    'system.memory.installed.bytes'?: number;
    'system.overall.memory.used.bytes'?: number;
    'system.overall.memory.used.percent'?: number;
    error?: string;
  };
  timestamp: string;
}

export interface DeviceStatus {
  ip: string;
  status: 'online' | 'offline' | 'unknown';
  lastSeen: string;
  systemName?: string;
  osName?: string;
  cpuPercent?: number;
  memoryPercent?: number;
  diskPercent?: number;
  uptime?: string;
}