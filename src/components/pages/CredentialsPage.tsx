import React, { useState } from 'react';
import { Plus, Edit, Trash2, Key, Loader2 } from 'lucide-react';
import { useApiData, useApiMutation } from '../../hooks/useApi';
import { apiService, CredentialEntity } from '../../services/api';
import CredentialForm from '../forms/CredentialForm';

const CredentialsPage: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCredential, setEditingCredential] = useState<CredentialEntity | null>(null);

  const { data: credentialsData, loading, error, refetch } = useApiData(
    () => apiService.getCredentials()
  );

  const { mutate: deleteCredential, loading: deleteLoading } = useApiMutation(
    (id: number) => apiService.deleteCredential(id)
  );

  const credentials = credentialsData?.entities || [];

  const handleEdit = (credential: CredentialEntity) => {
    setEditingCredential(credential);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this credential?')) {
      const result = await deleteCredential(id);
      if (result !== null) {
        refetch();
      }
    }
  };

  const handleFormSuccess = () => {
    refetch();
    setEditingCredential(null);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingCredential(null);
  };

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
        <p className="text-red-400">Error loading credentials: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Credentials</h1>
          <p className="text-gray-400">Manage SSH and other protocol credentials</p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
        >
          <Plus size={20} />
          Add Credential
        </button>
      </div>

      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-lg font-medium text-white">Credential Profiles</h2>
        </div>
        
        {credentials.length === 0 ? (
          <div className="p-8 text-center">
            <Key className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400 mb-2">No credentials configured</p>
            <p className="text-gray-500 text-sm">Add your first credential to start monitoring devices</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700/50">
                <tr>
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">Profile Name</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">Protocol</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">Username</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">ID</th>
                  <th className="text-right py-3 px-4 text-gray-300 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {credentials.map((credential) => (
                  <tr key={credential['credential.profile.id']} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                    <td className="py-3 px-4 text-white font-medium">
                      {credential['credential.profile.name']}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-blue-900/30 text-blue-400 rounded-full text-xs font-medium border border-blue-500/30">
                        {credential['credential.profile.protocol'].toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-300 font-mono">
                      {credential['credential.profile.username']}
                    </td>
                    <td className="py-3 px-4 text-gray-400 text-sm">
                      #{credential['credential.profile.id']}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(credential)}
                          className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md transition-colors"
                          title="Edit credential"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(credential['credential.profile.id'])}
                          disabled={deleteLoading}
                          className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-md transition-colors disabled:opacity-50"
                          title="Delete credential"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <CredentialForm
        isOpen={isFormOpen}
        onClose={handleFormClose}
        onSuccess={handleFormSuccess}
        editData={editingCredential}
      />
    </div>
  );
};

export default CredentialsPage;