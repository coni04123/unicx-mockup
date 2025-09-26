'use client';

import React, { useState } from 'react';
import { useTranslations } from '@/lib/translations';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AlertCard from '@/components/dashboard/AlertCard';
import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ChartBarIcon,
  ClockIcon,
  ServerIcon,
  WifiIcon,
  CpuChipIcon,
  CircleStackIcon,
  ArrowPathIcon,
  FunnelIcon,
} from '@heroicons/react/24/outline';
import { Alert } from '@/types';
import { mockAlerts, mockDashboardMetrics } from '@/data/mockData';

// Mock system metrics data
const mockSystemMetrics = {
  uptime: '99.97%',
  apiLatency: 145,
  errorRate: 0.3,
  activeConnections: 1247,
  memoryUsage: 68.5,
  cpuUsage: 34.2,
  diskUsage: 45.8,
  lastUpdate: new Date(),
};

// Mock performance chart data
const mockPerformanceData = [
  { time: '00:00', messages: 120, delivery: 96.5, errors: 4 },
  { time: '01:00', messages: 89, delivery: 97.2, errors: 2 },
  { time: '02:00', messages: 67, delivery: 98.1, errors: 1 },
  { time: '03:00', messages: 45, delivery: 96.8, errors: 3 },
  { time: '04:00', messages: 78, delivery: 97.5, errors: 2 },
  { time: '05:00', messages: 156, delivery: 95.9, errors: 6 },
  { time: '06:00', messages: 234, delivery: 96.7, errors: 8 },
  { time: '07:00', messages: 345, delivery: 94.2, errors: 15 },
  { time: '08:00', messages: 467, delivery: 93.8, errors: 22 },
  { time: '09:00', messages: 523, delivery: 95.1, errors: 18 },
  { time: '10:00', messages: 478, delivery: 96.3, errors: 12 },
  { time: '11:00', messages: 445, delivery: 97.1, errors: 9 },
];

export default function MonitoringPage() {
  const t = useTranslations('monitoring');
  const [alerts] = useState<Alert[]>(mockAlerts);
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [alertFilter, setAlertFilter] = useState<string>('all');

  // Filter alerts based on severity
  const filteredAlerts = alerts.filter(alert => {
    if (alertFilter === 'all') return true;
    return alert.severity === alertFilter;
  });

  const getSystemHealthStatus = () => {
    const criticalAlerts = alerts.filter(a => a.severity === 'critical' && a.status === 'open');
    if (criticalAlerts.length > 0) return 'critical';
    
    const highAlerts = alerts.filter(a => a.severity === 'high' && a.status === 'open');
    if (highAlerts.length > 0) return 'warning';
    
    return 'healthy';
  };

  const healthStatus = getSystemHealthStatus();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page header */}
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
            <p className="mt-1 text-sm text-gray-500">
              Monitor system health, performance metrics, and alerts
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-3">
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="form-select"
            >
              <option value="1h">Last Hour</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
            <button className="btn-secondary">
              <ArrowPathIcon className="h-4 w-4 mr-2" />
              Refresh
            </button>
          </div>
        </div>

        {/* System Health Overview */}
        <div className="card">
          <div className="card-header">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">System Health Overview</h3>
              <div className="flex items-center">
                <div className={`h-3 w-3 rounded-full mr-2 ${
                  healthStatus === 'healthy' ? 'bg-green-400' :
                  healthStatus === 'warning' ? 'bg-yellow-400' : 'bg-red-400'
                } animate-pulse`}></div>
                <span className={`text-sm font-medium ${
                  healthStatus === 'healthy' ? 'text-green-600' :
                  healthStatus === 'warning' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {healthStatus === 'healthy' ? 'All Systems Operational' :
                   healthStatus === 'warning' ? 'Minor Issues Detected' : 'Critical Issues'}
                </span>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 bg-green-500 rounded-lg flex items-center justify-center">
                    <CheckCircleIcon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">System Uptime</p>
                  <p className="text-2xl font-semibold text-gray-900">{mockSystemMetrics.uptime}</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <ClockIcon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">API Latency</p>
                  <p className="text-2xl font-semibold text-gray-900">{mockSystemMetrics.apiLatency}ms</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 bg-red-500 rounded-lg flex items-center justify-center">
                    <ExclamationTriangleIcon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Error Rate</p>
                  <p className="text-2xl font-semibold text-gray-900">{mockSystemMetrics.errorRate}%</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 bg-purple-500 rounded-lg flex items-center justify-center">
                    <WifiIcon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Active Connections</p>
                  <p className="text-2xl font-semibold text-gray-900">{mockSystemMetrics.activeConnections.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Resource Usage */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="card">
            <div className="card-header">
              <div className="flex items-center">
                <CpuChipIcon className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-medium text-gray-900">CPU Usage</h3>
              </div>
            </div>
            <div className="card-body">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Current</span>
                <span className="text-sm font-medium text-gray-900">{mockSystemMetrics.cpuUsage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-300 ${
                    mockSystemMetrics.cpuUsage > 80 ? 'bg-red-500' :
                    mockSystemMetrics.cpuUsage > 60 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${mockSystemMetrics.cpuUsage}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {mockSystemMetrics.cpuUsage > 80 ? 'High usage detected' :
                 mockSystemMetrics.cpuUsage > 60 ? 'Moderate usage' : 'Normal usage'}
              </p>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <div className="flex items-center">
                <ServerIcon className="h-5 w-5 text-green-600 mr-2" />
                <h3 className="text-lg font-medium text-gray-900">Memory Usage</h3>
              </div>
            </div>
            <div className="card-body">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Current</span>
                <span className="text-sm font-medium text-gray-900">{mockSystemMetrics.memoryUsage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-300 ${
                    mockSystemMetrics.memoryUsage > 80 ? 'bg-red-500' :
                    mockSystemMetrics.memoryUsage > 60 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${mockSystemMetrics.memoryUsage}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {mockSystemMetrics.memoryUsage > 80 ? 'High usage detected' :
                 mockSystemMetrics.memoryUsage > 60 ? 'Moderate usage' : 'Normal usage'}
              </p>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <div className="flex items-center">
                <CircleStackIcon className="h-5 w-5 text-purple-600 mr-2" />
                <h3 className="text-lg font-medium text-gray-900">Disk Usage</h3>
              </div>
            </div>
            <div className="card-body">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Current</span>
                <span className="text-sm font-medium text-gray-900">{mockSystemMetrics.diskUsage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-300 ${
                    mockSystemMetrics.diskUsage > 80 ? 'bg-red-500' :
                    mockSystemMetrics.diskUsage > 60 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${mockSystemMetrics.diskUsage}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {mockSystemMetrics.diskUsage > 80 ? 'High usage detected' :
                 mockSystemMetrics.diskUsage > 60 ? 'Moderate usage' : 'Normal usage'}
              </p>
            </div>
          </div>
        </div>

        {/* Performance Charts */}
        <div className="card">
          <div className="card-header">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">{t('performanceCharts')}</h3>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-primary-500 rounded-full mr-2"></div>
                  <span>Messages</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
                  <span>Delivery Rate</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-red-500 rounded-full mr-2"></div>
                  <span>Errors</span>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="h-80 flex items-end justify-between space-x-2">
              {mockPerformanceData.map((data, index) => (
                <div key={index} className="flex flex-col items-center flex-1 min-w-0">
                  <div className="flex flex-col items-center justify-end h-64 w-full relative">
                    {/* Messages bar */}
                    <div
                      className="w-full bg-primary-500 rounded-t-sm"
                      style={{ height: `${(data.messages / 600) * 100}%` }}
                    ></div>
                    {/* Error overlay */}
                    {data.errors > 0 && (
                      <div
                        className="w-full bg-red-500 rounded-t-sm absolute bottom-0"
                        style={{ height: `${(data.errors / 600) * 100}%` }}
                      ></div>
                    )}
                  </div>
                  <div className="mt-2 text-xs text-gray-500 text-center">
                    <div>{data.time}</div>
                    <div className="text-primary-600 font-medium">{data.messages}</div>
                    <div className="text-green-600">{data.delivery}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Alerts and WhatsApp Metrics */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Enhanced Alert Management */}
          <div className="card">
            <div className="card-header">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">{t('alertManagement')}</h3>
                <select
                  value={alertFilter}
                  onChange={(e) => setAlertFilter(e.target.value)}
                  className="form-select text-sm"
                >
                  <option value="all">All Alerts</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
            <div className="card-body p-0">
              <AlertCard alerts={filteredAlerts} maxDisplay={6} />
            </div>
          </div>

          {/* WhatsApp Service Metrics */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-medium text-gray-900">WhatsApp Service Metrics</h3>
            </div>
            <div className="card-body">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Account Health</span>
                  <div className="flex items-center">
                    <div className="flex -space-x-1">
                      <div className="h-2 w-2 bg-green-400 rounded-full"></div>
                      <div className="h-2 w-2 bg-green-400 rounded-full"></div>
                      <div className="h-2 w-2 bg-yellow-400 rounded-full"></div>
                      <div className="h-2 w-2 bg-red-400 rounded-full"></div>
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-900">
                      {mockDashboardMetrics.whatsappAccounts.health.healthy}/
                      {mockDashboardMetrics.whatsappAccounts.total} Healthy
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Message Throughput</span>
                  <span className="text-sm font-medium text-gray-900">
                    {mockDashboardMetrics.messages.sent24h.toLocaleString()}/day
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Delivery Success Rate</span>
                  <span className={`text-sm font-medium ${
                    mockDashboardMetrics.messages.deliveryRate > 95 ? 'text-green-600' :
                    mockDashboardMetrics.messages.deliveryRate > 90 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {mockDashboardMetrics.messages.deliveryRate}%
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Active Spy Numbers</span>
                  <span className="text-sm font-medium text-gray-900">
                    {mockDashboardMetrics.spyNumbers.active}/{mockDashboardMetrics.spyNumbers.total}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Groups Under Surveillance</span>
                  <span className="text-sm font-medium text-gray-900">
                    {mockDashboardMetrics.spyNumbers.groupsMonitored}
                  </span>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Last Updated</span>
                    <span className="text-sm text-gray-500">
                      {mockSystemMetrics.lastUpdate.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
