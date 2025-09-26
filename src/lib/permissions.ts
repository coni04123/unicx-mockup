/**
 * Role-Based Access Control (RBAC) System
 * Defines permissions for different user roles in the Unicx platform
 */

export type UserRole = 'Admin' | 'Manager' | 'User';

export interface Permission {
  // Dashboard permissions
  viewDashboard: boolean;
  viewAdvancedMetrics: boolean;
  
  // WhatsApp Accounts permissions
  viewWhatsAppAccounts: boolean;
  addWhatsAppAccount: boolean;
  editWhatsAppAccount: boolean;
  deleteWhatsAppAccount: boolean;
  viewAccountDetails: boolean;
  
  // Spy Numbers permissions
  viewSpyNumbers: boolean;
  addSpyNumber: boolean;
  editSpyNumber: boolean;
  deleteSpyNumber: boolean;
  configureSpyNumber: boolean;
  
  // Campaigns permissions
  viewCampaigns: boolean;
  createCampaign: boolean;
  editCampaign: boolean;
  deleteCampaign: boolean;
  launchCampaign: boolean;
  viewCampaignAnalytics: boolean;
  
  // Messages permissions
  viewMessages: boolean;
  sendMessage: boolean;
  viewMessageDetails: boolean;
  exportMessages: boolean;
  
  // Entities permissions
  viewEntities: boolean;
  addEntity: boolean;
  editEntity: boolean;
  deleteEntity: boolean;
  manageEntityHierarchy: boolean;
  
  // Monitoring permissions
  viewMonitoring: boolean;
  viewAlerts: boolean;
  acknowledgeAlerts: boolean;
  configureAlerts: boolean;
  viewSystemHealth: boolean;
  
  // Administration permissions
  viewAdministration: boolean;
  manageUsers: boolean;
  manageTenants: boolean;
  viewAuditLogs: boolean;
  manageSystemSettings: boolean;
  viewBilling: boolean;
  manageIntegrations: boolean;
}

// Define permissions for each role
export const ROLE_PERMISSIONS: Record<UserRole, Permission> = {
  // Admin: Full access to everything across all tenants
  Admin: {
    // Dashboard
    viewDashboard: true,
    viewAdvancedMetrics: true,
    
    // WhatsApp Accounts
    viewWhatsAppAccounts: true,
    addWhatsAppAccount: true,
    editWhatsAppAccount: true,
    deleteWhatsAppAccount: true,
    viewAccountDetails: true,
    
    // Spy Numbers
    viewSpyNumbers: true,
    addSpyNumber: true,
    editSpyNumber: true,
    deleteSpyNumber: true,
    configureSpyNumber: true,
    
    // Campaigns
    viewCampaigns: true,
    createCampaign: true,
    editCampaign: true,
    deleteCampaign: true,
    launchCampaign: true,
    viewCampaignAnalytics: true,
    
    // Messages
    viewMessages: true,
    sendMessage: true,
    viewMessageDetails: true,
    exportMessages: true,
    
    // Entities
    viewEntities: true,
    addEntity: true,
    editEntity: true,
    deleteEntity: true,
    manageEntityHierarchy: true,
    
    // Monitoring
    viewMonitoring: true,
    viewAlerts: true,
    acknowledgeAlerts: true,
    configureAlerts: true,
    viewSystemHealth: true,
    
    // Administration
    viewAdministration: true,
    manageUsers: true,
    manageTenants: true,
    viewAuditLogs: true,
    manageSystemSettings: true,
    viewBilling: true,
    manageIntegrations: true,
  },
  
  // Manager: Tenant administrator with most permissions within their tenant
  Manager: {
    // Dashboard
    viewDashboard: true,
    viewAdvancedMetrics: true,
    
    // WhatsApp Accounts
    viewWhatsAppAccounts: true,
    addWhatsAppAccount: true,
    editWhatsAppAccount: true,
    deleteWhatsAppAccount: false, // Cannot delete accounts
    viewAccountDetails: true,
    
    // Spy Numbers
    viewSpyNumbers: true,
    addSpyNumber: true,
    editSpyNumber: true,
    deleteSpyNumber: false, // Cannot delete spy numbers
    configureSpyNumber: true,
    
    // Campaigns
    viewCampaigns: true,
    createCampaign: true,
    editCampaign: true,
    deleteCampaign: true,
    launchCampaign: true,
    viewCampaignAnalytics: true,
    
    // Messages
    viewMessages: true,
    sendMessage: true,
    viewMessageDetails: true,
    exportMessages: true,
    
    // Entities
    viewEntities: true,
    addEntity: true,
    editEntity: true,
    deleteEntity: true,
    manageEntityHierarchy: true,
    
    // Monitoring
    viewMonitoring: true,
    viewAlerts: true,
    acknowledgeAlerts: true,
    configureAlerts: true,
    viewSystemHealth: true,
    
    // Administration (limited to tenant management)
    viewAdministration: true,
    manageUsers: true, // Only within their tenant
    manageTenants: false, // Cannot manage other tenants
    viewAuditLogs: true, // Only their tenant's logs
    manageSystemSettings: false, // No system-wide settings
    viewBilling: true, // Only their tenant's billing
    manageIntegrations: true,
  },
  
  // User: Basic tenant user with limited permissions
  User: {
    // Dashboard
    viewDashboard: true,
    viewAdvancedMetrics: false, // Limited dashboard view
    
    // WhatsApp Accounts
    viewWhatsAppAccounts: true,
    addWhatsAppAccount: false,
    editWhatsAppAccount: false,
    deleteWhatsAppAccount: false,
    viewAccountDetails: false, // Cannot see sensitive details
    
    // Spy Numbers
    viewSpyNumbers: true,
    addSpyNumber: false,
    editSpyNumber: false,
    deleteSpyNumber: false,
    configureSpyNumber: false,
    
    // Campaigns
    viewCampaigns: true,
    createCampaign: false,
    editCampaign: false,
    deleteCampaign: false,
    launchCampaign: false,
    viewCampaignAnalytics: false, // Cannot see analytics
    
    // Messages
    viewMessages: true,
    sendMessage: true, // Can send messages
    viewMessageDetails: true,
    exportMessages: false,
    
    // Entities
    viewEntities: true,
    addEntity: false,
    editEntity: false,
    deleteEntity: false,
    manageEntityHierarchy: false,
    
    // Monitoring
    viewMonitoring: true,
    viewAlerts: true,
    acknowledgeAlerts: false, // Cannot acknowledge alerts
    configureAlerts: false,
    viewSystemHealth: false,
    
    // Administration
    viewAdministration: false, // No admin access
    manageUsers: false,
    manageTenants: false,
    viewAuditLogs: false,
    manageSystemSettings: false,
    viewBilling: false,
    manageIntegrations: false,
  },
};

// Helper functions for permission checking
export function hasPermission(role: UserRole, permission: keyof Permission): boolean {
  return ROLE_PERMISSIONS[role][permission];
}

export function getUserPermissions(role: UserRole): Permission {
  return ROLE_PERMISSIONS[role];
}

// Check if user can access a specific route
export function canAccessRoute(role: UserRole, route: string): boolean {
  switch (route) {
    case '/':
      return hasPermission(role, 'viewDashboard');
    case '/whatsapp-accounts':
      return hasPermission(role, 'viewWhatsAppAccounts');
    case '/spy-numbers':
      return hasPermission(role, 'viewSpyNumbers');
    case '/campaigns':
      return hasPermission(role, 'viewCampaigns');
    case '/messages':
      return hasPermission(role, 'viewMessages');
    case '/entities':
      return hasPermission(role, 'viewEntities');
    case '/monitoring':
      return hasPermission(role, 'viewMonitoring');
    case '/administration':
      return hasPermission(role, 'viewAdministration');
    default:
      return true; // Allow access to other routes by default
  }
}

// Get role display information
export function getRoleInfo(role: UserRole) {
  const roleInfo = {
    Admin: {
      label: 'System Administrator',
      description: 'Full access to all system features and tenants',
      color: 'bg-error-500 text-white',
      badgeColor: 'destructive' as const,
    },
    Manager: {
      label: 'Tenant Administrator', 
      description: 'Manage tenant users, accounts, and configurations',
      color: 'bg-warning-500 text-white',
      badgeColor: 'secondary' as const,
    },
    User: {
      label: 'Tenant User',
      description: 'Basic access to messaging and monitoring features',
      color: 'bg-primary text-white',
      badgeColor: 'default' as const,
    },
  };
  
  return roleInfo[role];
}
