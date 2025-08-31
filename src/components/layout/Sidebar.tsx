import React from 'react';
import { X, Settings, FileText, Zap } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { Button } from '../ui/Button';
import { ParametersPanel } from '../panels/ParametersPanel';
import { TemplatesPanel } from '../panels/TemplatesPanel';
import { cn } from '../../utils/cn';

export function Sidebar() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = React.useState<'parameters' | 'templates'>('parameters');

  return (
    <>
      {/* Mobile overlay */}
      {state.sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        'fixed left-0 top-0 h-full w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-50 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0',
        state.sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 lg:hidden">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-primary-500 to-secondary-500 rounded flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">AI Playground</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-800">
            <button
              onClick={() => setActiveTab('parameters')}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors',
                activeTab === 'parameters'
                  ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              )}
            >
              <Settings className="w-4 h-4" />
              Parameters
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors',
                activeTab === 'templates'
                  ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              )}
            >
              <FileText className="w-4 h-4" />
              Templates
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'parameters' ? <ParametersPanel /> : <TemplatesPanel />}
          </div>
        </div>
      </aside>
    </>
  );
}