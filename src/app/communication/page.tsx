'use client';

import React, { useState } from 'react';
import { useTranslations } from '@/lib/translations';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  FunnelIcon,
  ArrowDownTrayIcon,
} from '@heroicons/react/24/outline';
import { whatsappMessages, e164Users, type FilterOptions } from '@/data/chatMockData';

export default function CommunicationPage() {
  const t = useTranslations('messages');
  const tCommon = useTranslations('common');
  
  // WhatsApp monitoring filters
  const [whatsappFilters, setWhatsappFilters] = useState<FilterOptions>({
    entityUserNumber: '',
    entityPath: '',
    e164Number: '',
    timeRange: { type: 'last_days', value: 0 },
    messageType: 'all',
    direction: 'both',
    registrationStatus: 'all'
  });
  const [showWhatsAppFilters, setShowWhatsAppFilters] = useState(false);

  // Filter WhatsApp messages with advanced filters
  const filteredWhatsAppMessages = whatsappMessages.filter((message) => {
    // Entity User Number filter
    const matchesEntityUser = !whatsappFilters.entityUserNumber || 
      message.senderE164 === whatsappFilters.entityUserNumber || 
      message.receiverE164 === whatsappFilters.entityUserNumber;

    // Entity Path filter
    const matchesEntityPath = !whatsappFilters.entityPath || 
      (message.entityPath && message.entityPath.includes(whatsappFilters.entityPath));

    // Any E164 Number filter
    const matchesE164 = !whatsappFilters.e164Number || 
      message.senderE164.includes(whatsappFilters.e164Number) || 
      message.receiverE164.includes(whatsappFilters.e164Number);

    // Time range filter
    let matchesTimeRange = true;
    if (whatsappFilters.timeRange) {
      const now = new Date();
      let startDate: Date;

      if (whatsappFilters.timeRange.type === 'last_hours' && whatsappFilters.timeRange.value) {
        startDate = new Date(now.getTime() - (whatsappFilters.timeRange.value * 60 * 60 * 1000));
      } else if (whatsappFilters.timeRange.type === 'last_days' && whatsappFilters.timeRange.value) {
        startDate = new Date(now.getTime() - (whatsappFilters.timeRange.value * 24 * 60 * 60 * 1000));
      } else {
        startDate = new Date(0);
      }

      const msgDate = new Date(message.timestamp);
      matchesTimeRange = msgDate >= startDate;
    }

    // Message type filter
    const matchesType = !whatsappFilters.messageType || 
      whatsappFilters.messageType === 'all' || 
      message.type === whatsappFilters.messageType;

    // Direction filter
    const matchesDirection = !whatsappFilters.direction || 
      whatsappFilters.direction === 'both' || 
      message.direction === whatsappFilters.direction;

    return matchesEntityUser && matchesEntityPath && 
           matchesE164 && matchesTimeRange && matchesType && matchesDirection;
  }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">WhatsApp Monitoring</h1>
            <p className="mt-2 text-sm text-gray-700">
              Monitor WhatsApp messages from E164 users - {filteredWhatsAppMessages.length} messages
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowWhatsAppFilters(!showWhatsAppFilters)}
              className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                showWhatsAppFilters
                  ? 'bg-primary-100 text-primary-700'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              <FunnelIcon className="w-4 h-4 mr-2" />
              Advanced Filters
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
              {tCommon('export')}
            </button>
          </div>
        </div>

        {/* WhatsApp Monitoring Content */}
            {showWhatsAppFilters && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">WhatsApp Advanced Filters</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Entity User Number Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Entity User Number (E164)
                    </label>
                    <select
                      value={whatsappFilters.entityUserNumber || ''}
                      onChange={(e) => setWhatsappFilters(prev => ({ ...prev, entityUserNumber: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">All Entity Users</option>
                      {e164Users.map(user => (
                        <option key={user.id} value={user.e164Number}>
                          {user.name} ({user.e164Number})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Entity Path Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Entity Structure Part
                    </label>
                    <select
                      value={whatsappFilters.entityPath || ''}
                      onChange={(e) => setWhatsappFilters(prev => ({ ...prev, entityPath: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">All Entity Parts</option>
                      <option value="Entity X">Entity X</option>
                      <option value="Company C1">Company C1</option>
                      <option value="Company C2">Company C2</option>
                      <option value="Company C3">Company C3</option>
                      <option value="Sales Department">Sales Department</option>
                      <option value="Marketing Department">Marketing Department</option>
                      <option value="IT Department">IT Department</option>
                      <option value="Operations Department">Operations Department</option>
                      <option value="Finance Department">Finance Department</option>
                      <option value="Human Resources">Human Resources</option>
                      <option value="Legal Department">Legal Department</option>
                    </select>
                  </div>

                  {/* Any E164 Number Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Any E164 Number
                    </label>
                    <input
                      type="text"
                      value={whatsappFilters.e164Number || ''}
                      onChange={(e) => setWhatsappFilters(prev => ({ ...prev, e164Number: e.target.value }))}
                      placeholder="+1415555..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  {/* Time Range Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time Period
                    </label>
                    <div className="space-y-2">
                      <select
                        value={whatsappFilters.timeRange?.type || 'last_days'}
                        onChange={(e) => setWhatsappFilters(prev => ({ 
                          ...prev, 
                          timeRange: { ...prev.timeRange!, type: e.target.value as any }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="last_hours">Last Hours</option>
                        <option value="last_days">Last Days</option>
                      </select>
                      <input
                        type="number"
                        value={whatsappFilters.timeRange?.value || ''}
                        onChange={(e) => setWhatsappFilters(prev => ({ 
                          ...prev, 
                          timeRange: { ...prev.timeRange!, value: parseInt(e.target.value) }
                        }))}
                        placeholder="Enter number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>

                  {/* Message Direction Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message Direction
                    </label>
                    <select
                      value={whatsappFilters.direction || 'both'}
                      onChange={(e) => setWhatsappFilters(prev => ({ ...prev, direction: e.target.value as any }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="both">Both Directions</option>
                      <option value="inbound">Inbound Only</option>
                      <option value="outbound">Outbound Only</option>
                    </select>
                  </div>

                  {/* Message Type Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message Type
                    </label>
                    <select
                      value={whatsappFilters.messageType || 'all'}
                      onChange={(e) => setWhatsappFilters(prev => ({ ...prev, messageType: e.target.value as any }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="all">All Types</option>
                      <option value="text">Text</option>
                      <option value="image">Image</option>
                      <option value="audio">Audio</option>
                      <option value="video">Video</option>
                      <option value="document">Document</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* WhatsApp Messages Display */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-lg">📱</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">WhatsApp Messages</h3>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">{filteredWhatsAppMessages.length}</span> messages
                      {filteredWhatsAppMessages.length !== whatsappMessages.length && (
                        <span className="text-gray-500"> of {whatsappMessages.length}</span>
                      )}
                    </div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
              <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
                {filteredWhatsAppMessages.length === 0 ? (
                  <div className="px-6 py-8 text-center text-gray-500">
                    No WhatsApp messages found matching your criteria.
                  </div>
                ) : (
                  filteredWhatsAppMessages.map((message) => {
                    const senderInfo = e164Users.find(u => u.e164Number === message.senderE164);
                    const receiverInfo = e164Users.find(u => u.e164Number === message.receiverE164);
                    
                    return (
                      <div key={message.id} className="px-6 py-4 hover:bg-gray-50/50 transition-colors duration-150">
                        <div className="flex items-start space-x-4">
                          {/* Direction Indicator */}
                          <div className="flex-shrink-0 pt-1">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              message.direction === 'outbound' 
                                ? 'bg-blue-50 border border-blue-200' 
                                : 'bg-green-50 border border-green-200'
                            }`}>
                              <span className={`text-sm ${
                                message.direction === 'outbound' ? 'text-blue-600' : 'text-green-600'
                              }`}>
                                {message.direction === 'outbound' ? '↗️' : '↙️'}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            {/* Message Header */}
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center space-x-2 flex-1">
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm font-semibold text-gray-900">
                                    {senderInfo ? senderInfo.name : message.senderE164}
                                  </span>
                                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                                    {message.senderE164}
                                  </span>
                                </div>
                                <span className="text-gray-400 text-sm">→</span>
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm font-medium text-gray-700">
                                    {receiverInfo ? receiverInfo.name : message.receiverE164}
                                  </span>
                                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                                    {message.receiverE164}
                                  </span>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-2 ml-4">
                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                                  message.isMonitored
                                    ? 'bg-green-100 text-green-800 border border-green-200'
                                    : 'bg-orange-100 text-orange-800 border border-orange-200'
                                }`}>
                                  {message.isMonitored ? '🟢 Monitored' : '🔶 External'}
                                </span>
                              </div>
                            </div>
                            
                            {/* Message Content */}
                            <div className="bg-gray-50 rounded-lg p-3 mb-2">
                              <div className="flex items-start justify-between">
                                <p className="text-sm text-gray-800 flex-1">{message.content}</p>
                                <div className="flex items-center space-x-2 ml-3">
                                  {message.type !== 'text' && (
                                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                      {message.type}
                                    </span>
                                  )}
                                  <span className="text-xs text-gray-500 whitespace-nowrap">
                                    {new Date(message.timestamp).toLocaleString('en-US', {
                                      month: 'short',
                                      day: 'numeric',
                                      hour: '2-digit',
                                      minute: '2-digit'
                                    })}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            {/* Entity Path */}
                            {message.entityPath && (
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-gray-500">📍</span>
                                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-primary-50 text-primary-700 border border-primary-200">
                                  {message.entityPath}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
      </div>
    </DashboardLayout>
  );
}
