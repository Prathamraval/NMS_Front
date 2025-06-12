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
}

export interface ProvisionResponse {
  message: string;
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
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
    return this.request<{ entities: DiscoveryEntity[] }>('/discovery/');
  }

  async getDiscoveryById(id: number): Promise<ApiResponse<DiscoveryEntity>> {
    return this.request<DiscoveryEntity>(`/discovery/${id}`);
  }

  async runDiscovery(id: number): Promise<ApiResponse<DiscoveryRunResponse>> {
    return this.request<DiscoveryRunResponse>(`/discovery/run/${id}`, {
      method: 'POST',
    });
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
}

export const apiService = new ApiService();