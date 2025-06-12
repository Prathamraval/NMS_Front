import React, { useState } from 'react';
import { X, Save, Loader2 } from 'lucide-react';
import { useApiMutation, useApiData } from '../../hooks/useApi';
import { apiService, DiscoveryRequest, CredentialEntity } from '../../services/api';

interface DiscoveryFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editData?: any;
}

const DiscoveryForm: React.FC<DiscoveryFormProps> = ({
  isOpen,
  onClose,
  onSuccess,
  editData
}) => {
  const [formData, setFormData] = useState<DiscoveryRequest>({
    discovery_name: editData?.['discovery.name'] || '',
    credential_id: editData?.credentials?.id || 0,
    ip_address: editData?.ipAddress || '',
    port_no: editData?.portNo || 22,
    wait_time: editData?.wait_time || 3
  });

  const { data: credentialsData, loading: credentialsLoading } = useApiData(
    () => apiService.getCredentials(),
    [isOpen]
  );

  const { mutate: createDiscovery, loading, error } = useApiMutation(
    apiService.createDiscovery.bind(apiService)
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await createDiscovery(formData);
    if (result) {
      onSuccess();
      onClose();
      setFormData({
        discovery_name: '',
        credential_id: 0,
        ip_address: '',
        port_no: 22,
        wait_time: 3
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.type === 'number' ? parseInt(e.target.value) : e.target.value;
    setFormData(prev => ({
      ...prev,
      [e.target.name]: value
    }));
  };

  if (!isOpen) return null;

  const credentials = credentialsData?.entities || [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">
            {editData ? 'Edit Discovery' : 'Create Discovery'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Discovery Name
            </label>
            <input
              type="text"
              name="discovery_name"
              value={formData.discovery_name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter discovery name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Credential Profile
            </label>
            <select
              name="credential_id"
              value={formData.credential_id}
              onChange={handleChange}
              required
              disabled={credentialsLoading}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value={0}>Select a credential</option>
              {credentials.map((cred) => (
                <option key={cred['credential.profile.id']} value={cred['credential.profile.id']}>
                  {cred['credential.profile.name']} ({cred['credential.profile.protocol']})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              IP Address
            </label>
            <input
              type="text"
              name="ip_address"
              value={formData.ip_address}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., 10.20.41.5"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Port
              </label>
              <input
                type="number"
                name="port_no"
                value={formData.port_no}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="22"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Wait Time (s)
              </label>
              <input
                type="number"
                name="wait_time"
                value={formData.wait_time}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="3"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-400 text-sm bg-red-900/20 border border-red-500/30 rounded-md p-2">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || formData.credential_id === 0}
              className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-md transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Save size={16} />
                  {editData ? 'Update' : 'Create'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DiscoveryForm;