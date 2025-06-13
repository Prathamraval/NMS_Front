// const API_BASE_URL = 'http://localhost:8080/api/v1';

// export interface ApiResponse<T> {
//   success: boolean;
//   statusCode: number;
//   data?: T;
//   message?: string;
// }

// export interface CredentialRequest {
//   profile_name: string;
//   protocol: string;
//   username: string;
//   password: string;
// }

// export interface CredentialResponse {
//   'credential.profile.name': string;
//   'credential.profile.protocol': string;
//   id: number;
// }

// export interface CredentialEntity {
//   'credential.profile.name': string;
//   'credential.profile.protocol': string;
//   'credential.profile.username': string;
//   'credential.profile.id': number;
// }

// export interface DiscoveryRequest {
//   discovery_name: string;
//   credential_id: number;
//   ip_address: string;
//   port_no: number;
//   wait_time: number;
// }

// export interface DiscoveryResponse {
//   discovery_name: string;
//   id: number;
// }

// export interface DiscoveryEntity {
//   id: number;
//   'discovery.name': string;
//   ipAddress: string;
//   portNo: number;
//   status: boolean;
//   message: string;
//   wait_time: number;
//   lastdiscoverytime: string | null;
//   credentials: {
//     id: number;
//     username: string;
//     protocol: string;
//     profile_name: string;
//   };
// }

// export interface DiscoveryRunResponse {
//   status: string;
//   message: string;
//   discovery_id: number;
// }

// export interface ProvisionResponse {
//   message: string;
// }

// class ApiService {
//   private async request<T>(
//     endpoint: string,
//     options: RequestInit = {}
//   ): Promise<ApiResponse<T>> {
//     try {
//       const response = await fetch(`${API_BASE_URL}${endpoint}`, {
//         headers: {
//           'Content-Type': 'application/json',
//           ...options.headers,
//         },
//         ...options,
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       return await response.json();
//     } catch (error) {
//       console.error('API request failed:', error);
//       throw error;
//     }
//   }

//   // Credential APIs
//   async createCredential(credential: CredentialRequest): Promise<ApiResponse<CredentialResponse>> {
//     return this.request<CredentialResponse>('/credential/', {
//       method: 'POST',
//       body: JSON.stringify(credential),
//     });
//   }

//   async getCredentials(): Promise<ApiResponse<{ entities: CredentialEntity[] }>> {
//     return this.request<{ entities: CredentialEntity[] }>('/credential/');
//   }

//   async getCredentialById(id: number): Promise<ApiResponse<CredentialEntity>> {
//     return this.request<CredentialEntity>(`/credential/${id}`);
//   }

//   async updateCredential(id: number, credential: CredentialRequest): Promise<ApiResponse<CredentialResponse>> {
//     return this.request<CredentialResponse>(`/credential/${id}`, {
//       method: 'PUT',
//       body: JSON.stringify(credential),
//     });
//   }

//   async deleteCredential(id: number): Promise<ApiResponse<void>> {
//     return this.request<void>(`/credential/${id}`, {
//       method: 'DELETE',
//     });
//   }

//   // Discovery APIs
//   async createDiscovery(discovery: DiscoveryRequest): Promise<ApiResponse<DiscoveryResponse>> {
//     return this.request<DiscoveryResponse>('/discovery/', {
//       method: 'POST',
//       body: JSON.stringify(discovery),
//     });
//   }

//   async getDiscoveries(): Promise<ApiResponse<{ entities: DiscoveryEntity[] }>> {
//     return this.request<{ entities: DiscoveryEntity[] }>('/discovery/');
//   }

//   async getDiscoveryById(id: number): Promise<ApiResponse<DiscoveryEntity>> {
//     return this.request<DiscoveryEntity>(`/discovery/${id}`);
//   }

//   async runDiscovery(id: number): Promise<ApiResponse<DiscoveryRunResponse>> {
//     return this.request<DiscoveryRunResponse>(`/discovery/run/${id}`, {
//       method: 'POST',
//     });
//   }

//   async provisionDiscovery(id: number): Promise<ApiResponse<ProvisionResponse>> {
//     return this.request<ProvisionResponse>(`/provision/${id}`, {
//       method: 'POST',
//     });
//   }

//   // Monitor data (assuming this exists)
//   async getMonitorData(): Promise<any> {
//     // This would be your monitoring data endpoint
//     // For now, we'll use mock data
//     return Promise.resolve([]);
//   }
// }

// export const apiService = new ApiService();

const API_BASE_URL = 'http://localhost:8080/api/v1';

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  data?: T;
  message?: string;
}

export interface CredentialRequest {
  profile_name: string;
  protocol: string;
  username: string;
  password: string;
}

export interface CredentialResponse {
  'credential.profile.name': string;
  'credential.profile.protocol': string;
  id: number;
}

export interface CredentialEntity {
  'credential.profile.name': string;
  'credential.profile.protocol': string;
  'credential.profile.username': string;
  'credential.profile.id': number;
}

export interface DiscoveryRequest {
  discovery_name: string;
  credential_id: number;
  ip_address: string;
  port_no: number;
  wait_time: number;
}

export interface DiscoveryResponse {
  discovery_name: string;
  id: number;
}

export interface DiscoveryEntity {
  id: number;
  'discovery.name': string;
  ipAddress: string;
  portNo: number;
  status: boolean;
  message: string;
  wait_time: number;
  lastdiscoverytime: string | null;
  credentials: {
    id: number;
    username: string;
    protocol: string;
    profile_name: string;
  };
}

export interface DiscoveryRunResponse {
  status: string;
  message: string;
  discovery_id: number;
  success?: boolean;
}

export interface ProvisionResponse {
  message: string;
}

export interface ProvisionedDevice {
  monitor_id: number;
  discovery_name: string;
  ip_address: string;
  port_no: number;
  protocol: string;
  status: boolean;
}

export interface PollingDataSnapshot {
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

export interface PollingDataResponse {
  entity: PollingDataSnapshot[];
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      console.log(`Making API request to: ${API_BASE_URL}${endpoint}`);
      
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      console.log(`Response status: ${response.status}`);

      if (!response.ok) {
        // Try to get error message from response
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          // Fallback to status text if JSON parsing fails
          errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log(`API response:`, result);
      return result;
    } catch (error) {
      console.error('API request failed:', error);
      
      // Check if it's a network error
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        throw new Error('Unable to connect to server. Please check if the backend is running on port 8080.');
      }
      
      throw error;
    }
  }

  // Health check method
  async checkHealth(): Promise<{ status: string; timestamp: string }> {
    try {
      const response = await fetch(`${API_BASE_URL.replace('/api/v1', '')}/health`);
      return await response.json();
    } catch (error) {
      throw new Error('Backend server is not accessible');
    }
  }

  // Credential APIs
  async createCredential(credential: CredentialRequest): Promise<ApiResponse<CredentialResponse>> {
    return this.request<CredentialResponse>('/credential/', {
      method: 'POST',
      body: JSON.stringify(credential),
    });
  }

  async getCredentials(): Promise<ApiResponse<{ entities: CredentialEntity[] }>> {
    return this.request<{ entities: CredentialEntity[] }>('/credential/');
  }

  async getCredentialById(id: number): Promise<ApiResponse<CredentialEntity>> {
    return this.request<CredentialEntity>(`/credential/${id}`);
  }

  async updateCredential(id: number, credential: CredentialRequest): Promise<ApiResponse<CredentialResponse>> {
    return this.request<CredentialResponse>(`/credential/${id}`, {
      method: 'PUT',
      body: JSON.stringify(credential),
    });
  }

  async deleteCredential(id: number): Promise<ApiResponse<void>> {
    return this.request<void>(`/credential/${id}`, {
      method: 'DELETE',
    });
  }

  // Discovery APIs
  async createDiscovery(discovery: DiscoveryRequest): Promise<ApiResponse<DiscoveryResponse>> {
    return this.request<DiscoveryResponse>('/discovery/', {
      method: 'POST',
      body: JSON.stringify(discovery),
    });
  }

  async getDiscoveries(): Promise<ApiResponse<{ entities: DiscoveryEntity[] }>> {
    console.log('111Fetching discoveries from API');
    return this.request<{ entities: DiscoveryEntity[] }>('/discovery/');
  }

  async getDiscoveryById(id: number): Promise<ApiResponse<DiscoveryEntity>> {
    return this.request<DiscoveryEntity>(`/discovery/${id}`);
  }

  async runDiscovery(id: number): Promise<ApiResponse<DiscoveryRunResponse>> {
    try {
      const response = await fetch(`${API_BASE_URL}/discovery/run/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();
      const lines = text.split('\n');
      let acceptanceData = null;
      let finalData = null;

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            const jsonStr = line.slice(6); // Remove 'data: ' prefix
            const data = JSON.parse(jsonStr);
            
            // Check if this is the acceptance message
            if (data.status === 'accepted') {
              acceptanceData = data;
            } else {
              // This is the final response
              finalData = data;
            }
          } catch (e) {
            console.warn('Failed to parse SSE data:', e);
          }
        }
      }

      // Return the final response if we have it, otherwise return the acceptance
      const responseData = finalData || acceptanceData;
      if (!responseData) {
        throw new Error('No valid data received from server');
      }

      return {
        success: true,
        statusCode: 200,
        data: responseData
      };
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async provisionDiscovery(id: number): Promise<ApiResponse<ProvisionResponse>> {
    return this.request<ProvisionResponse>(`/provision/${id}`, {
      method: 'POST',
    });
  }

  // Monitor data (assuming this exists)
  async getMonitorData(): Promise<any> {
    // This would be your monitoring data endpoint
    // For now, we'll use mock data
    return Promise.resolve([]);
  }

  // Provision APIs
  async getProvisionedDevices(): Promise<ApiResponse<{ entities: ProvisionedDevice[] }>> {
    console.log('Calling getProvisionedDevices API...');
    const response = await this.request<{ entities: ProvisionedDevice[] }>('/provision/');
    console.log('getProvisionedDevices response:', response);
    return response;
  }

  async updateProvisionStatus(monitorId: number, status: boolean): Promise<ApiResponse<void>> {
    console.log('Calling updateProvisionStatus API:', { monitorId, status });
    const response = await this.request<void>(`/provision/${status}/${monitorId}`, {
      method: 'PUT',
    });
    console.log('updateProvisionStatus response:', response);
    return response;
  }

  async getPollingData(monitorId: number): Promise<ApiResponse<PollingDataResponse>> {
    return this.request<PollingDataResponse>(`/polling/${monitorId}`);
  }
}

export const apiService = new ApiService();