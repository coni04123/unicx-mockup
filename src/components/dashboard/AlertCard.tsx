'use client';

import React from 'react';
import { useTranslations } from '@/lib/translations';
import {
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import { Alert } from '@/types';

interface AlertCardProps {
  alerts: Alert[];
  maxDisplay?: number;
}

export default function AlertCard({ alerts, maxDisplay = 5 }: AlertCardProps) {
  const t = useTranslations('alerts');
  
  const getSeverityIcon = (severity: Alert['severity']) => {
    switch (severity) {
      case 'critical':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      case 'high':
        return <ExclamationTriangleIcon className="h-5 w-5 text-orange-500" />;
      case 'medium':
        return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />;
      case 'low':
        return <InformationCircleIcon className="h-5 w-5 text-blue-500" />;
      default:
        return <InformationCircleIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity: Alert['severity']) => {
    switch (severity) {
      case 'critical':
        return 'border-red-200 bg-red-50';
      case 'high':
        return 'border-orange-200 bg-orange-50';
      case 'medium':
        return 'border-yellow-200 bg-yellow-50';
      case 'low':
        return 'border-blue-200 bg-blue-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const getStatusBadge = (status: Alert['status']) => {
    switch (status) {
      case 'open':
        return <span className="badge bg-red-100 text-red-800">{t('open')}</span>;
      case 'acknowledged':
        return <span className="badge bg-yellow-100 text-yellow-800">{t('acknowledged')}</span>;
      case 'resolved':
        return <span className="badge bg-green-100 text-green-800">{t('resolved')}</span>;
      default:
        return null;
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

  const openAlerts = alerts.filter(alert => alert.status === 'open');
  const displayAlerts = openAlerts.slice(0, maxDisplay);

  return (
    <div className="card">
      <div className="card-header">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Active Alerts</h3>
          <div className="flex items-center space-x-2">
            {openAlerts.filter(a => a.severity === 'critical').length > 0 && (
              <span className="badge bg-red-100 text-red-800">
                {openAlerts.filter(a => a.severity === 'critical').length} Critical
              </span>
            )}
            <span className="text-sm text-gray-500">
              {openAlerts.length} total
            </span>
          </div>
        </div>
      </div>
      <div className="card-body p-0">
        {displayAlerts.length === 0 ? (
          <div className="p-6 text-center">
            <CheckCircleIcon className="mx-auto h-12 w-12 text-green-500" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No Active Alerts</h3>
            <p className="mt-1 text-sm text-gray-500">
              All systems are operating normally.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {displayAlerts.map((alert) => (
              <div key={alert.id} className={`p-4 ${getSeverityColor(alert.severity)}`}>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    {getSeverityIcon(alert.severity)}
                  </div>
                  <div className="ml-3 flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {alert.title}
                      </p>
                      <div className="ml-2 flex-shrink-0 flex">
                        {getStatusBadge(alert.status)}
                      </div>
                    </div>
                    <p className="mt-1 text-sm text-gray-700 line-clamp-2">
                      {alert.description}
                    </p>
                    <div className="mt-2 flex items-center text-xs text-gray-500">
                      <span className="capitalize">{alert.resourceType.replace('_', ' ')}</span>
                      <span className="mx-1">•</span>
                      <span>{formatTimeAgo(alert.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {openAlerts.length > maxDisplay && (
          <div className="px-4 py-3 bg-gray-50 text-center border-t border-gray-200">
            <a
              href="/monitoring"
              className="text-sm font-medium text-primary-600 hover:text-primary-500"
            >
              View all {openAlerts.length} alerts
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
