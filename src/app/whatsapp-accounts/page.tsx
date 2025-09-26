'use client';

import React, { useState } from 'react';
import { useTranslations } from '@/lib/translations';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  ChatBubbleLeftRightIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import { WhatsAppAccount } from '@/types';
import { mockWhatsAppAccounts } from '@/data/mockData';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { PermissionGate } from '@/components/PermissionGate';

// Add WhatsApp Business Account Modal Component
function AddAccountModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    accountName: '',
    phoneNumber: '',
    businessName: '',
    category: '',
    description: '',
    apiKey: '',
    webhookUrl: '',
    status: 'pending' as const,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally send the data to your API
    console.log('Add WhatsApp Account:', formData);
    setIsOpen(false);
    // Reset form
    setFormData({
      accountName: '',
      phoneNumber: '',
      businessName: '',
      category: '',
      description: '',
      apiKey: '',
      webhookUrl: '',
      status: 'pending',
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90">
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Account
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <ChatBubbleLeftRightIcon className="h-5 w-5 text-primary" />
            <span>Add WhatsApp Business Account</span>
          </DialogTitle>
          <DialogDescription>
            Connect a new WhatsApp Business account to your platform.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Account Name */}
            <div className="space-y-2">
              <Label htmlFor="accountName">Account Name *</Label>
              <Input
                id="accountName"
                placeholder="Marketing Account"
                value={formData.accountName}
                onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                required
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="businessPhone">Business Phone *</Label>
              <Input
                id="businessPhone"
                type="tel"
                placeholder="+1-555-0100"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                required
              />
            </div>

            {/* Business Name */}
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name *</Label>
              <Input
                id="businessName"
                placeholder="ACME Corp"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                required
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Business Category</Label>
              <Input
                id="category"
                placeholder="E-commerce, Service, etc."
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              />
            </div>

            {/* API Key */}
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                type="password"
                placeholder="Your WhatsApp Business API key"
                value={formData.apiKey}
                onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
              />
            </div>

            {/* Webhook URL */}
            <div className="space-y-2">
              <Label htmlFor="webhookUrl">Webhook URL</Label>
              <Input
                id="webhookUrl"
                type="url"
                placeholder="https://your-app.com/webhook"
                value={formData.webhookUrl}
                onChange={(e) => setFormData({ ...formData, webhookUrl: e.target.value })}
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="accountDescription">Description</Label>
            <Input
              id="accountDescription"
              placeholder="Describe this WhatsApp Business account..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <ShieldCheckIcon className="h-5 w-5 text-primary mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-primary">
                      Secure Connection
                    </p>
                    <p className="text-xs text-muted-foreground">
                      All API keys are encrypted and stored securely.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-sage-200 bg-sage-50">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <GlobeAltIcon className="h-5 w-5 text-sage-600 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-sage-800">
                      Global Support
                    </p>
                    <p className="text-xs text-sage-600">
                      Works with WhatsApp Business accounts worldwide.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              Add Account
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function WhatsAppAccountsPage() {
  const t = useTranslations('whatsappAccounts');
  const [accounts, setAccounts] = useState<WhatsAppAccount[]>(mockWhatsAppAccounts);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  // Filter accounts based on search and filters
  const filteredAccounts = accounts.filter((account) => {
    const matchesSearch = 
      account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      account.phoneNumber.includes(searchQuery);
    
    const matchesStatus = statusFilter === 'all' || account.status === statusFilter;
    const matchesType = typeFilter === 'all' || account.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusIcon = (status: WhatsAppAccount['status']) => {
    switch (status) {
      case 'active':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'blocked':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      case 'suspended':
        return <ExclamationTriangleIcon className="h-5 w-5 text-orange-500" />;
      case 'pending':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: WhatsAppAccount['status']) => {
    const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
    switch (status) {
      case 'active':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'blocked':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'suspended':
        return `${baseClasses} bg-orange-100 text-orange-800`;
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getHealthStatusBadge = (healthStatus: WhatsAppAccount['healthCheckStatus']) => {
    const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
    switch (healthStatus) {
      case 'healthy':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'warning':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'critical':
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

  const handleRunHealthCheck = (accountId: string) => {
    // Simulate running health check
    setAccounts(prev => prev.map(account => 
      account.id === accountId 
        ? { 
            ...account, 
            lastHealthCheck: new Date(),
            healthCheckStatus: 'healthy' as const 
          }
        : account
    ));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page header */}
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
            <p className="mt-1 text-sm text-gray-500">
              Monitor and manage your WhatsApp Business and Messenger accounts
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <PermissionGate permission="addWhatsAppAccount">
              <AddAccountModal />
            </PermissionGate>
          </div>
        </div>

        {/* Filters and search */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
            {/* Search */}
            <div className="sm:col-span-2">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search accounts or phone numbers..."
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
                <option value="blocked">Blocked</option>
                <option value="suspended">Suspended</option>
                <option value="pending">Pending</option>
              </select>
            </div>

            {/* Type filter */}
            <div>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="form-select"
              >
                <option value="all">All Types</option>
                <option value="business">Business</option>
                <option value="messenger">Messenger</option>
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
                  <div className="h-10 w-10 bg-primary-500 rounded-lg flex items-center justify-center">
                    <CheckCircleIcon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Accounts</p>
                  <p className="text-2xl font-semibold text-gray-900">{accounts.length}</p>
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
                    {accounts.filter(a => a.status === 'active').length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 bg-red-500 rounded-lg flex items-center justify-center">
                    <XCircleIcon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Issues</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {accounts.filter(a => a.status === 'blocked' || a.status === 'suspended').length}
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
                    <ArrowPathIcon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Messages (24h)</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {accounts.reduce((sum, a) => sum + a.messagesSent24h, 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Accounts table */}
        <div className="card">
          <div className="card-header">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">
                WhatsApp Accounts ({filteredAccounts.length})
              </h3>
              <button
                onClick={() => {
                  // Simulate refreshing health checks
                  setAccounts(prev => prev.map(account => ({
                    ...account,
                    lastHealthCheck: new Date()
                  })));
                }}
                className="btn-secondary"
              >
                <ArrowPathIcon className="h-4 w-4 mr-2" />
                Refresh Health
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Account</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Health</th>
                  <th>Messages (24h)</th>
                  <th>Last Check</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAccounts.map((account) => (
                  <tr key={account.id}>
                    <td>
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          {account.type === 'business' ? (
                            <BuildingOfficeIcon className="h-8 w-8 text-primary-600" />
                          ) : (
                            <PhoneIcon className="h-8 w-8 text-blue-600" />
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {account.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {account.phoneNumber}
                          </div>
                          {account.businessInfo && (
                            <div className="text-xs text-gray-400">
                              {account.businessInfo.displayName}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-secondary capitalize">
                        {account.type}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center">
                        {getStatusIcon(account.status)}
                        <span className={`ml-2 ${getStatusBadge(account.status)}`}>
                          {account.status}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className={getHealthStatusBadge(account.healthCheckStatus)}>
                        {account.healthCheckStatus}
                      </span>
                    </td>
                    <td>
                      <div className="text-sm">
                        <div className="text-gray-900">
                          ↑ {account.messagesSent24h} sent
                        </div>
                        <div className="text-gray-500">
                          ↓ {account.messagesReceived24h} received
                        </div>
                      </div>
                    </td>
                    <td className="text-sm text-gray-900">
                      {formatTimeAgo(account.lastHealthCheck)}
                    </td>
                    <td>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleRunHealthCheck(account.id)}
                          className="text-primary-600 hover:text-primary-900 text-sm"
                        >
                          Check Health
                        </button>
                        <span className="text-gray-300">|</span>
                        <button className="text-primary-600 hover:text-primary-900 text-sm">
                          Edit
                        </button>
                        <span className="text-gray-300">|</span>
                        <button className="text-red-600 hover:text-red-900 text-sm">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredAccounts.length === 0 && (
              <div className="text-center py-12">
                <BuildingOfficeIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No accounts found
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchQuery || statusFilter !== 'all' || typeFilter !== 'all'
                    ? 'Try adjusting your search or filters.'
                    : 'Get started by adding your first WhatsApp account.'
                  }
                </p>
                {!searchQuery && statusFilter === 'all' && typeFilter === 'all' && (
                  <div className="mt-6 flex justify-center">
                    <PermissionGate permission="addWhatsAppAccount">
                      <AddAccountModal />
                    </PermissionGate>
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
