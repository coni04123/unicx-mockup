'use client';

import React, { useState } from 'react';
import { useTranslations } from '@/lib/translations';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  PlusIcon,
  MagnifyingGlassIcon,
  PlayIcon,
  PauseIcon,
  StopIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  MegaphoneIcon,
  EnvelopeIcon,
  UsersIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import { Campaign } from '@/types';
import { mockCampaigns, mockWhatsAppAccounts } from '@/data/mockData';

export default function CampaignsPage() {
  const t = useTranslations('campaigns');
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Filter campaigns based on search and filters
  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch = 
      campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: Campaign['status']) => {
    switch (status) {
      case 'running':
        return <PlayIcon className="h-5 w-5 text-green-500" />;
      case 'scheduled':
        return <ClockIcon className="h-5 w-5 text-blue-500" />;
      case 'completed':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'paused':
        return <PauseIcon className="h-5 w-5 text-yellow-500" />;
      case 'failed':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      case 'draft':
        return <EnvelopeIcon className="h-5 w-5 text-gray-500" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: Campaign['status']) => {
    const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
    switch (status) {
      case 'running':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'scheduled':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'completed':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'paused':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'failed':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'draft':
        return `${baseClasses} bg-gray-100 text-gray-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleString();
  };

  const getDeliveryRate = (campaign: Campaign) => {
    if (campaign.sentMessages === 0) return 0;
    return Math.round((campaign.deliveredMessages / campaign.sentMessages) * 100);
  };

  const getProgress = (campaign: Campaign) => {
    if (campaign.totalMessages === 0) return 0;
    return Math.round((campaign.sentMessages / campaign.totalMessages) * 100);
  };

  const getWhatsAppAccount = (accountId: string) => {
    return mockWhatsAppAccounts.find(acc => acc.id === accountId);
  };

  const handleCampaignAction = (campaignId: string, action: 'play' | 'pause' | 'stop') => {
    setCampaigns(prev => prev.map(campaign => {
      if (campaign.id === campaignId) {
        switch (action) {
          case 'play':
            return { 
              ...campaign, 
              status: 'running' as const,
              startedAt: campaign.startedAt || new Date()
            };
          case 'pause':
            return { ...campaign, status: 'paused' as const };
          case 'stop':
            return { 
              ...campaign, 
              status: 'completed' as const,
              completedAt: new Date()
            };
          default:
            return campaign;
        }
      }
      return campaign;
    }));
  };

  const getCampaignCounts = () => {
    return {
      total: campaigns.length,
      running: campaigns.filter(c => c.status === 'running').length,
      scheduled: campaigns.filter(c => c.status === 'scheduled').length,
      completed: campaigns.filter(c => c.status === 'completed').length,
      draft: campaigns.filter(c => c.status === 'draft').length,
    };
  };

  const counts = getCampaignCounts();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page header */}
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
            <p className="mt-1 text-sm text-gray-500">
              Create and manage WhatsApp messaging campaigns
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button className="btn-primary">
              <PlusIcon className="h-4 w-4 mr-2" />
              {t('createCampaign')}
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
                  placeholder="Search campaigns..."
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
                <option value="draft">Draft</option>
                <option value="scheduled">Scheduled</option>
                <option value="running">Running</option>
                <option value="paused">Paused</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
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
                  <div className="h-10 w-10 bg-purple-500 rounded-lg flex items-center justify-center">
                    <MegaphoneIcon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Campaigns</p>
                  <p className="text-2xl font-semibold text-gray-900">{counts.total}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 bg-green-500 rounded-lg flex items-center justify-center">
                    <PlayIcon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Running</p>
                  <p className="text-2xl font-semibold text-gray-900">{counts.running}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <ClockIcon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Scheduled</p>
                  <p className="text-2xl font-semibold text-gray-900">{counts.scheduled}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 bg-gray-500 rounded-lg flex items-center justify-center">
                    <EnvelopeIcon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Messages Today</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {campaigns.reduce((sum, c) => sum + (c.status === 'running' ? c.sentMessages : 0), 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Campaigns table */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-medium text-gray-900">
              Campaigns ({filteredCampaigns.length})
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Campaign</th>
                  <th>Status</th>
                  <th>Progress</th>
                  <th>Delivery Rate</th>
                  <th>Account</th>
                  <th>Schedule</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCampaigns.map((campaign) => {
                  const account = getWhatsAppAccount(campaign.whatsappAccountId);
                  const progress = getProgress(campaign);
                  const deliveryRate = getDeliveryRate(campaign);
                  
                  return (
                    <tr key={campaign.id}>
                      <td>
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <div className="h-8 w-8 bg-purple-100 rounded-lg flex items-center justify-center">
                              <MegaphoneIcon className="h-4 w-4 text-purple-600" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {campaign.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {campaign.description}
                            </div>
                            <div className="text-xs text-gray-400">
                              {campaign.targetType}: {campaign.targets.length} targets
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center">
                          {getStatusIcon(campaign.status)}
                          <span className={`ml-2 ${getStatusBadge(campaign.status)}`}>
                            {campaign.status}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="w-full">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-gray-600">
                              {campaign.sentMessages} / {campaign.totalMessages}
                            </span>
                            <span className="text-gray-900 font-medium">{progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="text-sm">
                          <div className="flex items-center">
                            <ChartBarIcon className="h-4 w-4 text-green-500 mr-1" />
                            <span className="font-medium text-gray-900">{deliveryRate}%</span>
                          </div>
                          <div className="text-xs text-gray-500">
                            {campaign.deliveredMessages} delivered
                          </div>
                          {campaign.failedMessages > 0 && (
                            <div className="text-xs text-red-600">
                              {campaign.failedMessages} failed
                            </div>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="text-sm">
                          <div className="font-medium text-gray-900">
                            {account?.name || 'Unknown'}
                          </div>
                          <div className="text-gray-500">
                            {account?.phoneNumber}
                          </div>
                        </div>
                      </td>
                      <td className="text-sm">
                        {campaign.scheduledAt && (
                          <div>
                            <div className="text-gray-900">
                              {formatDate(campaign.scheduledAt)}
                            </div>
                            {campaign.startedAt && (
                              <div className="text-xs text-green-600">
                                Started: {formatDate(campaign.startedAt)}
                              </div>
                            )}
                            {campaign.completedAt && (
                              <div className="text-xs text-gray-600">
                                Completed: {formatDate(campaign.completedAt)}
                              </div>
                            )}
                          </div>
                        )}
                      </td>
                      <td>
                        <div className="flex items-center space-x-2">
                          {campaign.status === 'draft' && (
                            <button
                              onClick={() => handleCampaignAction(campaign.id, 'play')}
                              className="text-green-600 hover:text-green-900"
                              title="Start campaign"
                            >
                              <PlayIcon className="h-4 w-4" />
                            </button>
                          )}
                          {campaign.status === 'running' && (
                            <>
                              <button
                                onClick={() => handleCampaignAction(campaign.id, 'pause')}
                                className="text-yellow-600 hover:text-yellow-900"
                                title="Pause campaign"
                              >
                                <PauseIcon className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleCampaignAction(campaign.id, 'stop')}
                                className="text-red-600 hover:text-red-900"
                                title="Stop campaign"
                              >
                                <StopIcon className="h-4 w-4" />
                              </button>
                            </>
                          )}
                          {campaign.status === 'paused' && (
                            <button
                              onClick={() => handleCampaignAction(campaign.id, 'play')}
                              className="text-green-600 hover:text-green-900"
                              title="Resume campaign"
                            >
                              <PlayIcon className="h-4 w-4" />
                            </button>
                          )}
                          <button className="text-primary-600 hover:text-primary-900 text-sm">
                            View
                          </button>
                          <span className="text-gray-300">|</span>
                          <button className="text-primary-600 hover:text-primary-900 text-sm">
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            
            {filteredCampaigns.length === 0 && (
              <div className="text-center py-12">
                <MegaphoneIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No campaigns found
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchQuery || statusFilter !== 'all'
                    ? 'Try adjusting your search or filters.'
                    : 'Get started by creating your first campaign.'
                  }
                </p>
                {!searchQuery && statusFilter === 'all' && (
                  <div className="mt-6">
                    <button className="btn-primary">
                      <PlusIcon className="h-4 w-4 mr-2" />
                      {t('createCampaign')}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
