'use client';

import React, { useState } from 'react';
import { useTranslations } from '@/lib/translations';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  PlusIcon,
  MagnifyingGlassIcon,
  BuildingOfficeIcon,
  UsersIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  FolderIcon,
  FolderOpenIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { Entity } from '@/types';
import { mockEntities } from '@/data/mockData';

interface EntityTreeNodeProps {
  entity: Entity;
  depth: number;
  onToggle: (entityId: string) => void;
  expandedNodes: Set<string>;
  onSelect: (entity: Entity) => void;
  selectedEntity?: Entity;
}

function EntityTreeNode({ 
  entity, 
  depth, 
  onToggle, 
  expandedNodes, 
  onSelect,
  selectedEntity 
}: EntityTreeNodeProps) {
  const hasChildren = entity.children && entity.children.length > 0;
  const isExpanded = expandedNodes.has(entity.id);
  const isSelected = selectedEntity?.id === entity.id;

  const getEntityIcon = (type: Entity['type'], hasChildren: boolean, isExpanded: boolean) => {
    if (hasChildren) {
      return isExpanded ? <FolderOpenIcon className="h-4 w-4" /> : <FolderIcon className="h-4 w-4" />;
    }
    
    switch (type) {
      case 'customer':
        return <UserIcon className="h-4 w-4" />;
      case 'company':
        return <BuildingOfficeIcon className="h-4 w-4" />;
      case 'group':
      case 'sub-group':
        return <UsersIcon className="h-4 w-4" />;
      default:
        return <FolderIcon className="h-4 w-4" />;
    }
  };

  const getEntityColor = (type: Entity['type']) => {
    switch (type) {
      case 'customer':
        return 'text-blue-600';
      case 'company':
        return 'text-green-600';
      case 'group':
        return 'text-purple-600';
      case 'sub-group':
        return 'text-indigo-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div>
      <div
        className={`flex items-center py-2 px-3 rounded-md cursor-pointer hover:bg-gray-50 ${
          isSelected ? 'bg-primary-50 text-primary-700' : ''
        }`}
        style={{ paddingLeft: `${depth * 24 + 12}px` }}
        onClick={() => onSelect(entity)}
      >
        {hasChildren && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggle(entity.id);
            }}
            className="mr-2 p-0.5 hover:bg-gray-200 rounded"
          >
            {isExpanded ? (
              <ChevronDownIcon className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronRightIcon className="h-4 w-4 text-gray-500" />
            )}
          </button>
        )}
        {!hasChildren && <div className="w-6" />}
        
        <div className={`mr-2 ${getEntityColor(entity.type)}`}>
          {getEntityIcon(entity.type, hasChildren, isExpanded)}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-gray-900 truncate">
            {entity.name}
          </div>
          {entity.identifier && (
            <div className="text-xs text-gray-500">
              {entity.identifierType?.toUpperCase()}: {entity.identifier}
            </div>
          )}
        </div>
        
        <span className={`text-xs px-2 py-1 rounded-full ${
          entity.type === 'customer' ? 'bg-blue-100 text-blue-800' :
          entity.type === 'company' ? 'bg-green-100 text-green-800' :
          entity.type === 'group' ? 'bg-purple-100 text-purple-800' :
          'bg-indigo-100 text-indigo-800'
        }`}>
          {entity.type}
        </span>
      </div>
      
      {hasChildren && isExpanded && (
        <div>
          {entity.children!.map((child) => (
            <EntityTreeNode
              key={child.id}
              entity={child}
              depth={depth + 1}
              onToggle={onToggle}
              expandedNodes={expandedNodes}
              onSelect={onSelect}
              selectedEntity={selectedEntity}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function EntitiesPage() {
  const t = useTranslations('entities');
  const [entities] = useState<Entity[]>(mockEntities);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['entity-1', 'entity-2']));
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);

  // Flatten entities for search
  const flattenEntities = (entities: Entity[]): Entity[] => {
    const result: Entity[] = [];
    const flatten = (entities: Entity[]) => {
      entities.forEach(entity => {
        result.push(entity);
        if (entity.children) {
          flatten(entity.children);
        }
      });
    };
    flatten(entities);
    return result;
  };

  const allEntities = flattenEntities(entities);

  // Filter entities based on search and type
  const filteredEntities = allEntities.filter((entity) => {
    const matchesSearch = 
      entity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (entity.identifier && entity.identifier.includes(searchQuery));
    
    const matchesType = typeFilter === 'all' || entity.type === typeFilter;
    
    return matchesSearch && matchesType;
  });

  const handleToggleNode = (entityId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(entityId)) {
      newExpanded.delete(entityId);
    } else {
      newExpanded.add(entityId);
    }
    setExpandedNodes(newExpanded);
  };

  const handleExpandAll = () => {
    const allIds = allEntities
      .filter(e => e.children && e.children.length > 0)
      .map(e => e.id);
    setExpandedNodes(new Set(allIds));
  };

  const handleCollapseAll = () => {
    setExpandedNodes(new Set());
  };

  const getEntityCounts = () => {
    return {
      total: allEntities.length,
      customers: allEntities.filter(e => e.type === 'customer').length,
      companies: allEntities.filter(e => e.type === 'company').length,
      groups: allEntities.filter(e => e.type === 'group' || e.type === 'sub-group').length,
    };
  };

  const counts = getEntityCounts();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page header */}
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your hierarchical entity structure with unlimited nesting
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button className="btn-primary">
              <PlusIcon className="h-4 w-4 mr-2" />
              {t('addEntity')}
            </button>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="card">
            <div className="card-body">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 bg-gray-500 rounded-lg flex items-center justify-center">
                    <FolderIcon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Entities</p>
                  <p className="text-2xl font-semibold text-gray-900">{counts.total}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <UserIcon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Customers</p>
                  <p className="text-2xl font-semibold text-gray-900">{counts.customers}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 bg-green-500 rounded-lg flex items-center justify-center">
                    <BuildingOfficeIcon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Companies</p>
                  <p className="text-2xl font-semibold text-gray-900">{counts.companies}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 bg-purple-500 rounded-lg flex items-center justify-center">
                    <UsersIcon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Groups</p>
                  <p className="text-2xl font-semibold text-gray-900">{counts.groups}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Entity Tree */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="card-header">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">{t('entityHierarchy')}</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={handleExpandAll}
                      className="text-sm text-primary-600 hover:text-primary-900"
                    >
                      Expand All
                    </button>
                    <span className="text-gray-300">|</span>
                    <button
                      onClick={handleCollapseAll}
                      className="text-sm text-primary-600 hover:text-primary-900"
                    >
                      Collapse All
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="card-body p-0">
                {/* Filters */}
                <div className="p-4 border-b border-gray-200">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="relative">
                      <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search entities..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="form-input pl-10"
                      />
                    </div>
                    <select
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                      className="form-select"
                    >
                      <option value="all">All Types</option>
                      <option value="customer">Customers</option>
                      <option value="company">Companies</option>
                      <option value="group">Groups</option>
                      <option value="sub-group">Sub-Groups</option>
                    </select>
                  </div>
                </div>

                {/* Tree View */}
                <div className="max-h-96 overflow-y-auto p-4">
                  {searchQuery || typeFilter !== 'all' ? (
                    // Show filtered results as flat list
                    <div className="space-y-1">
                      {filteredEntities.map((entity) => (
                        <div
                          key={entity.id}
                          className={`flex items-center py-2 px-3 rounded-md cursor-pointer hover:bg-gray-50 ${
                            selectedEntity?.id === entity.id ? 'bg-primary-50 text-primary-700' : ''
                          }`}
                          onClick={() => setSelectedEntity(entity)}
                        >
                          <div className={`mr-3 ${
                            entity.type === 'customer' ? 'text-blue-600' :
                            entity.type === 'company' ? 'text-green-600' :
                            entity.type === 'group' ? 'text-purple-600' :
                            'text-indigo-600'
                          }`}>
                            {entity.type === 'customer' ? <UserIcon className="h-4 w-4" /> :
                             entity.type === 'company' ? <BuildingOfficeIcon className="h-4 w-4" /> :
                             <UsersIcon className="h-4 w-4" />}
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-900">{entity.name}</div>
                            {entity.identifier && (
                              <div className="text-xs text-gray-500">
                                {entity.identifierType?.toUpperCase()}: {entity.identifier}
                              </div>
                            )}
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            entity.type === 'customer' ? 'bg-blue-100 text-blue-800' :
                            entity.type === 'company' ? 'bg-green-100 text-green-800' :
                            entity.type === 'group' ? 'bg-purple-100 text-purple-800' :
                            'bg-indigo-100 text-indigo-800'
                          }`}>
                            {entity.type}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    // Show hierarchical tree
                    <div>
                      {entities.map((entity) => (
                        <EntityTreeNode
                          key={entity.id}
                          entity={entity}
                          depth={0}
                          onToggle={handleToggleNode}
                          expandedNodes={expandedNodes}
                          onSelect={setSelectedEntity}
                          selectedEntity={selectedEntity}
                        />
                      ))}
                    </div>
                  )}
                  
                  {filteredEntities.length === 0 && (
                    <div className="text-center py-8">
                      <FolderIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No entities found</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Try adjusting your search or filters.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Entity Details */}
          <div>
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-medium text-gray-900">Entity Details</h3>
              </div>
              <div className="card-body">
                {selectedEntity ? (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Name</label>
                      <p className="text-sm text-gray-900">{selectedEntity.name}</p>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-500">Type</label>
                      <p className="text-sm text-gray-900 capitalize">{selectedEntity.type}</p>
                    </div>
                    
                    {selectedEntity.identifier && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">Identifier</label>
                        <p className="text-sm text-gray-900">
                          {selectedEntity.identifier} ({selectedEntity.identifierType?.toUpperCase()})
                        </p>
                      </div>
                    )}
                    
                    <div>
                      <label className="text-sm font-medium text-gray-500">Created</label>
                      <p className="text-sm text-gray-900">
                        {selectedEntity.createdAt.toLocaleDateString()}
                      </p>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-500">Updated</label>
                      <p className="text-sm text-gray-900">
                        {selectedEntity.updatedAt.toLocaleDateString()}
                      </p>
                    </div>
                    
                    {selectedEntity.children && selectedEntity.children.length > 0 && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">Child Entities</label>
                        <p className="text-sm text-gray-900">{selectedEntity.children.length}</p>
                      </div>
                    )}
                    
                    {selectedEntity.metadata && Object.keys(selectedEntity.metadata).length > 0 && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">Metadata</label>
                        <div className="text-sm text-gray-900">
                          {Object.entries(selectedEntity.metadata).map(([key, value]) => (
                            <div key={key} className="flex justify-between">
                              <span className="text-gray-500">{key}:</span>
                              <span>{String(value)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="pt-4 border-t">
                      <div className="flex space-x-2">
                        <button className="btn-primary flex-1">Edit</button>
                        <button className="btn-secondary">Add Child</button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FolderIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No entity selected</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Select an entity from the tree to view details.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
