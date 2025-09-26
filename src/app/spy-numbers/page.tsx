'use client';

import React, { useState } from 'react';
import { useTranslations } from '@/lib/translations';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  PlusIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  EyeSlashIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  AdjustmentsHorizontalIcon,
  ChatBubbleLeftRightIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import { SpyNumber, Group } from '@/types';
import { mockSpyNumbers, mockGroups } from '@/data/mockData';

interface AlertConfigModalProps {
  spyNumber: SpyNumber;
  isOpen: boolean;
  onClose: () => void;
  onSave: (config: SpyNumber['alertConfig']) => void;
}

function AlertConfigModal({ spyNumber, isOpen, onClose, onSave }: AlertConfigModalProps) {
  const [config, setConfig] = useState(spyNumber.alertConfig);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(config);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 sm:mx-0 sm:h-10 sm:w-10">
                <AdjustmentsHorizontalIcon className="h-6 w-6 text-primary-600" aria-hidden="true" />
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex-1">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Alert Configuration
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Configure alerts for {spyNumber.name} ({spyNumber.phoneNumber})
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900">
                    Missing from Group Alert
                  </label>
                  <p className="text-sm text-gray-500">
                    Alert when spy number is removed from a monitored group
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={config.missingFromGroup}
                  onChange={(e) => setConfig({ ...config, missingFromGroup: e.target.checked })}
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900">
                    Inactivity Alert
                  </label>
                  <p className="text-sm text-gray-500">
                    Alert when spy number has been inactive for specified period
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={config.inactivity}
                  onChange={(e) => setConfig({ ...config, inactivity: e.target.checked })}
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
              </div>

              {config.inactivity && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Inactivity Threshold (hours)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="168"
                    value={config.inactivityThresholdHours}
                    onChange={(e) => setConfig({ 
                      ...config, 
                      inactivityThresholdHours: parseInt(e.target.value) || 6 
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Alert after this many hours of inactivity (1-168 hours)
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={handleSave}
              className="btn-primary w-full sm:ml-3 sm:w-auto"
            >
              Save Configuration
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary mt-3 w-full sm:mt-0 sm:w-auto"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SpyNumbersPage() {
  const t = useTranslations('spyNumbers');
  const [spyNumbers, setSpyNumbers] = useState<SpyNumber[]>(mockSpyNumbers);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedSpyNumber, setSelectedSpyNumber] = useState<SpyNumber | null>(null);
  const [showAlertModal, setShowAlertModal] = useState(false);

  // Filter spy numbers based on search and filters
  const filteredSpyNumbers = spyNumbers.filter((spyNumber) => {
    const matchesSearch = 
      spyNumber.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spyNumber.phoneNumber.includes(searchQuery);
    
    const matchesStatus = statusFilter === 'all' || spyNumber.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: SpyNumber['status']) => {
    switch (status) {
      case 'active':
        return <EyeIcon className="h-5 w-5 text-green-500" />;
      case 'inactive':
        return <EyeSlashIcon className="h-5 w-5 text-gray-500" />;
      case 'error':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: SpyNumber['status']) => {
    const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
    switch (status) {
      case 'active':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'inactive':
        return `${baseClasses} bg-gray-100 text-gray-800`;
      case 'error':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const toggleSpyNumberStatus = (spyNumberId: string) => {
    setSpyNumbers(prev => prev.map(spyNumber => 
      spyNumber.id === spyNumberId 
        ? { 
            ...spyNumber, 
            status: spyNumber.status === 'active' ? 'inactive' : 'active',
            lastActivity: spyNumber.status === 'inactive' ? new Date() : spyNumber.lastActivity
          }
        : spyNumber
    ));
  };

  const handleAlertConfigSave = (config: SpyNumber['alertConfig']) => {
    if (selectedSpyNumber) {
      setSpyNumbers(prev => prev.map(spyNumber =>
        spyNumber.id === selectedSpyNumber.id
          ? { ...spyNumber, alertConfig: config }
          : spyNumber
      ));
    }
  };

  const getAssignedGroups = (spyNumber: SpyNumber) => {
    return mockGroups.filter(group => 
      spyNumber.assignedGroups.includes(group.id)
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page header */}
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
            <p className="mt-1 text-sm text-gray-500">
              Configure and monitor spy numbers for group surveillance
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button className="btn-primary">
              <PlusIcon className="h-4 w-4 mr-2" />
              {t('addSpyNumber')}
            </button>
          </div>
        </div>

        {/* Filters and search */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Search */}
            <div className="sm:col-span-2">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search spy numbers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="form-input pl-10"
                />
              </div>
            </div>

            {/* Status filter */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="form-select"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="error">Error</option>
              </select>
            </div>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="card">
            <div className="card-body">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 bg-accent-500 rounded-lg flex items-center justify-center">
                    <EyeIcon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Spy Numbers</p>
                  <p className="text-2xl font-semibold text-gray-900">{spyNumbers.length}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 bg-green-500 rounded-lg flex items-center justify-center">
                    <CheckCircleIcon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Active</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {spyNumbers.filter(s => s.status === 'active').length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <UsersIcon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Groups Monitored</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {spyNumbers.reduce((sum, s) => sum + s.groupsMonitored, 0)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 bg-purple-500 rounded-lg flex items-center justify-center">
                    <ChatBubbleLeftRightIcon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Messages (24h)</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {spyNumbers.reduce((sum, s) => sum + s.messagesIntercepted24h, 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Spy Numbers table */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-medium text-gray-900">
              Spy Numbers ({filteredSpyNumbers.length})
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Spy Number</th>
                  <th>Status</th>
                  <th>Groups Monitored</th>
                  <th>Messages (24h)</th>
                  <th>Last Activity</th>
                  <th>Alerts</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSpyNumbers.map((spyNumber) => (
                  <tr key={spyNumber.id}>
                    <td>
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="h-8 w-8 bg-accent-100 rounded-full flex items-center justify-center">
                            <EyeIcon className="h-4 w-4 text-accent-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {spyNumber.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {spyNumber.phoneNumber}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center">
                        {getStatusIcon(spyNumber.status)}
                        <span className={`ml-2 ${getStatusBadge(spyNumber.status)}`}>
                          {spyNumber.status}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="text-sm">
                        <div className="text-gray-900 font-medium">
                          {spyNumber.groupsMonitored} groups
                        </div>
                        <div className="text-gray-500">
                          {getAssignedGroups(spyNumber).slice(0, 2).map(group => group.name).join(', ')}
                          {spyNumber.groupsMonitored > 2 && ` +${spyNumber.groupsMonitored - 2} more`}
                        </div>
                      </div>
                    </td>
                    <td className="text-sm text-gray-900">
                      {spyNumber.messagesIntercepted24h.toLocaleString()}
                    </td>
                    <td className="text-sm text-gray-900">
                      {formatTimeAgo(spyNumber.lastActivity)}
                    </td>
                    <td>
                      <div className="flex items-center space-x-1">
                        {spyNumber.alertConfig.missingFromGroup && (
                          <span className="inline-block h-2 w-2 bg-blue-400 rounded-full" title="Missing from group alerts enabled"></span>
                        )}
                        {spyNumber.alertConfig.inactivity && (
                          <span className="inline-block h-2 w-2 bg-yellow-400 rounded-full" title="Inactivity alerts enabled"></span>
                        )}
                        {!spyNumber.alertConfig.missingFromGroup && !spyNumber.alertConfig.inactivity && (
                          <span className="text-xs text-gray-500">None</span>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => toggleSpyNumberStatus(spyNumber.id)}
                          className={`text-sm ${
                            spyNumber.status === 'active' 
                              ? 'text-red-600 hover:text-red-900' 
                              : 'text-green-600 hover:text-green-900'
                          }`}
                        >
                          {spyNumber.status === 'active' ? 'Deactivate' : 'Activate'}
                        </button>
                        <span className="text-gray-300">|</span>
                        <button
                          onClick={() => {
                            setSelectedSpyNumber(spyNumber);
                            setShowAlertModal(true);
                          }}
                          className="text-primary-600 hover:text-primary-900 text-sm"
                        >
                          Configure
                        </button>
                        <span className="text-gray-300">|</span>
                        <button className="text-primary-600 hover:text-primary-900 text-sm">
                          View Groups
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredSpyNumbers.length === 0 && (
              <div className="text-center py-12">
                <EyeIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No spy numbers found
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchQuery || statusFilter !== 'all'
                    ? 'Try adjusting your search or filters.'
                    : 'Get started by adding your first spy number.'
                  }
                </p>
                {!searchQuery && statusFilter === 'all' && (
                  <div className="mt-6">
                    <button className="btn-primary">
                      <PlusIcon className="h-4 w-4 mr-2" />
                      {t('addSpyNumber')}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Alert Configuration Modal */}
      {selectedSpyNumber && (
        <AlertConfigModal
          spyNumber={selectedSpyNumber}
          isOpen={showAlertModal}
          onClose={() => {
            setShowAlertModal(false);
            setSelectedSpyNumber(null);
          }}
          onSave={handleAlertConfigSave}
        />
      )}
    </DashboardLayout>
  );
}
