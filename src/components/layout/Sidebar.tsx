'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from '@/lib/translations';
import {
  HomeIcon,
  ChatBubbleLeftRightIcon,
  EyeIcon,
  BuildingOfficeIcon,
  EnvelopeIcon,
  MegaphoneIcon,
  ChartBarIcon,
  CogIcon,
  UsersIcon,
  ExclamationTriangleIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline';
import {
  HomeIcon as HomeSolidIcon,
  ChatBubbleLeftRightIcon as ChatSolidIcon,
  EyeIcon as EyeSolidIcon,
  BuildingOfficeIcon as BuildingSolidIcon,
  EnvelopeIcon as EnvelopeSolidIcon,
  MegaphoneIcon as MegaphoneSolidIcon,
  ChartBarIcon as ChartSolidIcon,
  CogIcon as CogSolidIcon,
  UsersIcon as UsersSolidIcon,
  ExclamationTriangleIcon as ExclamationSolidIcon,
  ClipboardDocumentListIcon as ClipboardSolidIcon,
} from '@heroicons/react/24/solid';

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
  iconSolid: React.ComponentType<any>;
  current: boolean;
  badge?: number;
  badgeColor?: 'red' | 'yellow' | 'green' | 'blue';
}

export default function Sidebar() {
  const t = useTranslations('navigation');
  const pathname = usePathname();

  const navigation: NavigationItem[] = [
    {
      name: t('dashboard'),
      href: '/',
      icon: HomeIcon,
      iconSolid: HomeSolidIcon,
      current: pathname === '/',
    },
    {
      name: t('whatsappAccounts'),
      href: '/whatsapp-accounts',
      icon: ChatBubbleLeftRightIcon,
      iconSolid: ChatSolidIcon,
      current: pathname.startsWith('/whatsapp-accounts'),
      badge: 1,
      badgeColor: 'red',
    },
    {
      name: t('spyNumbers'),
      href: '/spy-numbers',
      icon: EyeIcon,
      iconSolid: EyeSolidIcon,
      current: pathname.startsWith('/spy-numbers'),
    },
    {
      name: t('entities'),
      href: '/entities',
      icon: BuildingOfficeIcon,
      iconSolid: BuildingSolidIcon,
      current: pathname.startsWith('/entities'),
    },
    {
      name: t('messages'),
      href: '/messages',
      icon: EnvelopeIcon,
      iconSolid: EnvelopeSolidIcon,
      current: pathname.startsWith('/messages'),
    },
    {
      name: t('campaigns'),
      href: '/campaigns',
      icon: MegaphoneIcon,
      iconSolid: MegaphoneSolidIcon,
      current: pathname.startsWith('/campaigns'),
      badge: 1,
      badgeColor: 'green',
    },
    {
      name: t('monitoring'),
      href: '/monitoring',
      icon: ChartBarIcon,
      iconSolid: ChartSolidIcon,
      current: pathname.startsWith('/monitoring'),
      badge: 2,
      badgeColor: 'yellow',
    },
    {
      name: t('administration'),
      href: '/administration',
      icon: UsersIcon,
      iconSolid: UsersSolidIcon,
      current: pathname.startsWith('/administration'),
    },
  ];

  const getBadgeClasses = (color: 'red' | 'yellow' | 'green' | 'blue') => {
    switch (color) {
      case 'red':
        return 'bg-red-100 text-red-600';
      case 'yellow':
        return 'bg-yellow-100 text-yellow-600';
      case 'green':
        return 'bg-green-100 text-green-600';
      case 'blue':
        return 'bg-blue-100 text-blue-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="flex flex-col w-64 bg-white border-r border-gray-200 pt-5 pb-4 overflow-y-auto sidebar-scroll">
      {/* Logo */}
      <div className="flex items-center flex-shrink-0 px-4 mb-8">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">U</span>
            </div>
          </div>
          <div className="ml-3">
            <h1 className="text-xl font-bold text-gray-900">Unicx</h1>
            <p className="text-xs text-gray-500">WhatsApp Management</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-5 flex-1 px-2 space-y-1">
        {navigation.map((item) => {
          const IconComponent = item.current ? item.iconSolid : item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`nav-link ${item.current ? 'active' : ''}`}
            >
              <IconComponent
                className={`mr-3 flex-shrink-0 h-6 w-6 ${
                  item.current
                    ? 'text-primary-600'
                    : 'text-gray-400 group-hover:text-primary-600'
                }`}
                aria-hidden="true"
              />
              <span className="flex-1">{item.name}</span>
              {item.badge && item.badge > 0 && (
                <span
                  className={`ml-3 inline-block py-0.5 px-2 text-xs rounded-full ${getBadgeClasses(
                    item.badgeColor || 'gray'
                  )}`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Status indicator */}
      <div className="flex-shrink-0 px-2 mt-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse-green"></div>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-green-800">System Status</p>
              <p className="text-xs text-green-600">All systems operational</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
