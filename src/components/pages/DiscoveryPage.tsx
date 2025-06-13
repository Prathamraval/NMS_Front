import React, { useState } from 'react';
import { Plus, Play, Settings, Loader2, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
import { useApiData, useApiMutation } from '../../hooks/useApi';
import { apiService, DiscoveryEntity } from '../../services/api';
import DiscoveryForm from '../forms/DiscoveryForm';
import { format } from 'date-fns';

const DiscoveryPage: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [runningDiscoveries, setRunningDiscoveries] = useState<Set<number>>(new Set());

  const { data: discoveriesData, loading, error, refetch } = useApiData(
    () => apiService.getDiscoveries()
  );

  const { mutate: runDiscovery, loading: runLoading } = useApiMutation(
    (id: number) => apiService.runDiscovery(id)
  );

  const { mutate: provisionDiscovery, loading: provisionLoading } = useApiMutation(
    (id: number) => apiService.provisionDiscovery(id)
  );

  const discoveries = discoveriesData?.entities || [];

  const handleRunDiscovery = async (id: number) => {
    setRunningDiscoveries((prev) => new Set(prev).add(id));
    const result = await runDiscovery(id);
    if (result) {
      console.log(`Discovery ${id} started successfully`);
      setTimeout(() => {
        setRunningDiscoveries((prev) => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
        refetch();
      }, 3000);
    } else {
      console.log(`Failed to start discovery ${id}`);
      setRunningDiscoveries((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
      setTimeout(() => {
        refetch();
      }, 100);
    }
  };

  const handleProvision = async (id: number) => {
    const result = await provisionDiscovery(id);
    if (result) {
      refetch();
    }
  };

  const getStatusIcon = (discovery: DiscoveryEntity) => {
    if (runningDiscoveries.has(discovery.id)) {
      return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
    }
    
    if (discovery.status) {
      return <CheckCircle className="w-5 h-5 text-emerald-500" />;
    } else if (discovery.lastdiscoverytime) {
      return <XCircle className="w-5 h-5 text-red-500" />;
    } else {
      return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (discovery: DiscoveryEntity) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    
    if (runningDiscoveries.has(discovery.id)) {
      return `${baseClasses} bg-blue-900/30 text-blue-400 border border-blue-500/30`;
    }
    
    if (discovery.status) {
      return `${baseClasses} bg-emerald-900/30 text-emerald-400 border border-emerald-500/30`;
    } else if (discovery.lastdiscoverytime) {
      return `${baseClasses} bg-red-900/30 text-red-400 border border-red-500/30`;
    } else {
      return `${baseClasses} bg-gray-900/30 text-gray-400 border border-gray-500/30`;
    }
  };

  const getStatusText = (discovery: DiscoveryEntity) => {
    if (runningDiscoveries.has(discovery.id)) return 'Running';
    if (discovery.status) return 'Reachable';
    if (discovery.lastdiscoverytime) return 'Failed';
    return 'Pending';
  };

  // Sort discoveries by id
  const sortedDiscoveries = [...discoveries].sort((a, b) => a.id - b.id);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
        <p className="text-red-400">Error loading discoveries: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Discovery</h1>
          <p className="text-gray-400">Discover and manage network devices</p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
        >
          <Plus size={20} />
          Add Discovery
        </button>
      </div>

      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-lg font-medium text-white">Discovery Jobs</h2>
        </div>
        
        {sortedDiscoveries.length === 0 ? (
          <div className="p-8 text-center">
            <AlertCircle className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400 mb-2">No discoveries configured</p>
            <p className="text-gray-500 text-sm">Create your first discovery to start monitoring devices</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700/50">
                <tr>
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">Discovery Name</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">IP Address</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">Port</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">Credential</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">Last Run</th>
                  <th className="text-right py-3 px-4 text-gray-300 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedDiscoveries.map((discovery) => (
                  <tr key={discovery.id} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(discovery)}
                        <span className={getStatusBadge(discovery)}>
                          {getStatusText(discovery)}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-white font-medium">
                      {discovery['discovery.name']}
                    </td>
                    <td className="py-3 px-4 text-gray-300 font-mono">
                      {discovery.ipAddress}
                    </td>
                    <td className="py-3 px-4 text-gray-300">
                      {discovery.portNo}
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-gray-300">
                        <div className="font-medium">{discovery.credentials.profile_name}</div>
                        <div className="text-xs text-gray-500">{discovery.credentials.username}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-400 text-sm">
                      {discovery.lastdiscoverytime 
                        ? format(new Date(discovery.lastdiscoverytime), 'MMM d, HH:mm')
                        : 'Never'
                      }
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleRunDiscovery(discovery.id)}
                          disabled={runLoading || runningDiscoveries.has(discovery.id)}
                          className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-md text-sm transition-colors"
                          title="Run discovery"
                        >
                          {runningDiscoveries.has(discovery.id) ? (
                            <Loader2 size={14} className="animate-spin" />
                          ) : (
                            <Play size={14} />
                          )}
                          Run
                        </button>
                        {discovery.status && (
                          <button
                            onClick={() => handleProvision(discovery.id)}
                            disabled={provisionLoading}
                            className="flex items-center gap-1 px-3 py-1 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-md text-sm transition-colors"
                            title="Provision for monitoring"
                          >
                            <Settings size={14} />
                            Provision
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <DiscoveryForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSuccess={() => refetch()}
      />
    </div>
  );
};

export default DiscoveryPage;