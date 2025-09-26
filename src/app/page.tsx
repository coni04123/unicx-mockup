'use client';

import React from 'react';
import { useTranslations } from '@/lib/translations';
import DashboardLayout from '@/components/layout/DashboardLayout';
import MetricCard from '@/components/dashboard/MetricCard';
import AlertCard from '@/components/dashboard/AlertCard';
import RecentActivity from '@/components/dashboard/RecentActivity';
import {
  ChatBubbleLeftRightIcon,
  EyeIcon,
  EnvelopeIcon,
  MegaphoneIcon,
  BuildingOfficeIcon,
  UsersIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import {
  mockDashboardMetrics,
  mockAlerts,
  mockAuditLogs,
  currentTenant,
} from '@/data/mockData';

export default function Dashboard() {
  const t = useTranslations('dashboard');
  const metrics = mockDashboardMetrics;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back! Here's what's happening with {currentTenant.name} today.
          </p>
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="WhatsApp Accounts"
            value={metrics.whatsappAccounts.total}
            change={{
              value: 5.2,
              period: 'from last month',
              type: 'increase',
            }}
            icon={ChatBubbleLeftRightIcon}
            iconColor="bg-primary-500"
          />
          <MetricCard
            title="Active Spy Numbers"
            value={metrics.spyNumbers.active}
            change={{
              value: 0,
              period: 'from last month',
              type: 'neutral',
            }}
            icon={EyeIcon}
            iconColor="bg-accent-500"
          />
          <MetricCard
            title="Messages (24h)"
            value={metrics.messages.sent24h.toLocaleString()}
            change={{
              value: 12.5,
              period: 'from yesterday',
              type: 'increase',
            }}
            icon={EnvelopeIcon}
            iconColor="bg-blue-500"
          />
          <MetricCard
            title="Active Campaigns"
            value={metrics.campaigns.active}
            change={{
              value: 0,
              period: 'from yesterday',
              type: 'neutral',
            }}
            icon={MegaphoneIcon}
            iconColor="bg-purple-500"
          />
        </div>

        {/* Secondary metrics */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Delivery Rate"
            value={metrics.messages.deliveryRate}
            suffix="%"
            change={{
              value: 2.1,
              period: 'from yesterday',
              type: 'increase',
            }}
            icon={ChartBarIcon}
            iconColor="bg-green-500"
          />
          <MetricCard
            title="Groups Monitored"
            value={metrics.spyNumbers.groupsMonitored}
            icon={UsersIcon}
            iconColor="bg-indigo-500"
          />
          <MetricCard
            title="Total Entities"
            value={metrics.entities.total}
            icon={BuildingOfficeIcon}
            iconColor="bg-yellow-500"
          />
          <MetricCard
            title="Open Alerts"
            value={metrics.alerts.open}
            icon={ExclamationTriangleIcon}
            iconColor={metrics.alerts.critical > 0 ? "bg-red-500" : "bg-gray-400"}
          />
        </div>

        {/* Health status cards */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {/* WhatsApp Accounts Health */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-medium text-gray-900">WhatsApp Accounts Health</h3>
            </div>
            <div className="card-body">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Healthy</span>
                  <div className="flex items-center">
                    <div className="h-2 w-2 bg-green-400 rounded-full mr-2"></div>
                    <span className="text-sm font-medium text-gray-900">
                      {metrics.whatsappAccounts.health.healthy}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Warning</span>
                  <div className="flex items-center">
                    <div className="h-2 w-2 bg-yellow-400 rounded-full mr-2"></div>
                    <span className="text-sm font-medium text-gray-900">
                      {metrics.whatsappAccounts.health.warning}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Critical</span>
                  <div className="flex items-center">
                    <div className="h-2 w-2 bg-red-400 rounded-full mr-2"></div>
                    <span className="text-sm font-medium text-gray-900">
                      {metrics.whatsappAccounts.health.critical}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Message Statistics */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-medium text-gray-900">Message Statistics (24h)</h3>
            </div>
            <div className="card-body">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Sent</span>
                  <span className="text-sm font-medium text-gray-900">
                    {metrics.messages.sent24h.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Delivered</span>
                  <span className="text-sm font-medium text-green-600">
                    {metrics.messages.delivered24h.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Failed</span>
                  <span className="text-sm font-medium text-red-600">
                    {metrics.messages.failed24h.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t pt-3">
                  <span className="text-sm font-medium text-gray-900">Delivery Rate</span>
                  <span className="text-sm font-bold text-primary-600">
                    {metrics.messages.deliveryRate}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
            </div>
            <div className="card-body">
              <div className="space-y-3">
                <button className="w-full text-left p-2 rounded-md hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <ChatBubbleLeftRightIcon className="h-5 w-5 text-primary-600 mr-3" />
                    <span className="text-sm font-medium text-gray-900">Add WhatsApp Account</span>
                  </div>
                </button>
                <button className="w-full text-left p-2 rounded-md hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <MegaphoneIcon className="h-5 w-5 text-purple-600 mr-3" />
                    <span className="text-sm font-medium text-gray-900">Create Campaign</span>
                  </div>
                </button>
                <button className="w-full text-left p-2 rounded-md hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <EyeIcon className="h-5 w-5 text-accent-600 mr-3" />
                    <span className="text-sm font-medium text-gray-900">Configure Spy Number</span>
                  </div>
                </button>
                <button className="w-full text-left p-2 rounded-md hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <BuildingOfficeIcon className="h-5 w-5 text-yellow-600 mr-3" />
                    <span className="text-sm font-medium text-gray-900">Add Entity</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Alerts and Activity */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <AlertCard alerts={mockAlerts} />
          <RecentActivity auditLogs={mockAuditLogs} />
        </div>
      </div>
    </DashboardLayout>
  );
}
