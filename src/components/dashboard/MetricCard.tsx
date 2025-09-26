'use client';

import React from 'react';
import {
  ArrowUpIcon,
  ArrowDownIcon,
} from '@heroicons/react/24/outline';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    period: string;
    type: 'increase' | 'decrease' | 'neutral';
  };
  icon: React.ComponentType<{ className?: string }>;
  iconColor?: string;
  suffix?: string;
  loading?: boolean;
}

export default function MetricCard({
  title,
  value,
  change,
  icon: IconComponent,
  iconColor = 'bg-primary-500',
  suffix,
  loading = false,
}: MetricCardProps) {
  const getChangeColor = (type: 'increase' | 'decrease' | 'neutral') => {
    switch (type) {
      case 'increase':
        return 'text-green-600';
      case 'decrease':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getChangeIcon = (type: 'increase' | 'decrease' | 'neutral') => {
    switch (type) {
      case 'increase':
        return <ArrowUpIcon className="h-3 w-3" />;
      case 'decrease':
        return <ArrowDownIcon className="h-3 w-3" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="metric-card">
        <div className="card-body">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className={`metric-card-icon ${iconColor} animate-pulse`}>
                <div className="h-6 w-6 bg-white bg-opacity-30 rounded"></div>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-8 bg-gray-200 rounded animate-pulse mb-1"></div>
              <div className="h-3 bg-gray-200 rounded animate-pulse w-24"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="metric-card">
      <div className="card-body">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className={`metric-card-icon ${iconColor}`}>
              <IconComponent className="h-6 w-6" aria-hidden="true" />
            </div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {title}
              </dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">
                  {value}
                  {suffix && <span className="text-lg font-normal text-gray-500 ml-1">{suffix}</span>}
                </div>
                {change && (
                  <div className={`ml-2 flex items-center text-sm ${getChangeColor(change.type)}`}>
                    {getChangeIcon(change.type)}
                    <span className="ml-1">
                      {Math.abs(change.value)}% {change.period}
                    </span>
                  </div>
                )}
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
