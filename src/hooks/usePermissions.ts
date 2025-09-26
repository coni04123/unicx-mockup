import { useAuth } from '@/contexts/AuthContext';
import { hasPermission, getUserPermissions, canAccessRoute, getRoleInfo, UserRole, Permission } from '@/lib/permissions';

export function usePermissions() {
  const { user } = useAuth();
  const userRole = (user?.role as UserRole) || 'User';

  return {
    // Check specific permission
    hasPermission: (permission: keyof Permission) => hasPermission(userRole, permission),
    
    // Get all permissions for current user
    permissions: getUserPermissions(userRole),
    
    // Check route access
    canAccessRoute: (route: string) => canAccessRoute(userRole, route),
    
    // Get role information
    roleInfo: getRoleInfo(userRole),
    
    // Current user role
    role: userRole,
    
    // Helper functions for common checks
    isAdmin: userRole === 'Admin',
    isManager: userRole === 'Manager',
    isUser: userRole === 'User',
    
    // Quick permission checks
    canManageUsers: hasPermission(userRole, 'manageUsers'),
    canAddAccounts: hasPermission(userRole, 'addWhatsAppAccount'),
    canAddSpyNumbers: hasPermission(userRole, 'addSpyNumber'),
    canCreateCampaigns: hasPermission(userRole, 'createCampaign'),
    canAccessAdmin: hasPermission(userRole, 'viewAdministration'),
    canViewAdvancedMetrics: hasPermission(userRole, 'viewAdvancedMetrics'),
    canExportData: hasPermission(userRole, 'exportMessages'),
    canConfigureAlerts: hasPermission(userRole, 'configureAlerts'),
  };
}
