'use client';

import React from 'react';
import { usePermissions } from '@/hooks/usePermissions';
import { Permission } from '@/lib/permissions';

interface PermissionGateProps {
  permission?: keyof Permission;
  role?: 'Admin' | 'Manager' | 'User' | Array<'Admin' | 'Manager' | 'User'>;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export function PermissionGate({ 
  permission, 
  role, 
  fallback = null, 
  children 
}: PermissionGateProps) {
  const { hasPermission, role: userRole } = usePermissions();

  // Check permission-based access
  if (permission && !hasPermission(permission)) {
    return <>{fallback}</>;
  }

  // Check role-based access
  if (role) {
    const allowedRoles = Array.isArray(role) ? role : [role];
    if (!allowedRoles.includes(userRole)) {
      return <>{fallback}</>;
    }
  }

  return <>{children}</>;
}

// Convenience components for common use cases
export function AdminOnly({ children, fallback = null }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  return (
    <PermissionGate role="Admin" fallback={fallback}>
      {children}
    </PermissionGate>
  );
}

export function ManagerOrAdmin({ children, fallback = null }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  return (
    <PermissionGate role={['Admin', 'Manager']} fallback={fallback}>
      {children}
    </PermissionGate>
  );
}

export function UserOnly({ children, fallback = null }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  return (
    <PermissionGate role="User" fallback={fallback}>
      {children}
    </PermissionGate>
  );
}
