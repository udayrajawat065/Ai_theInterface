import React, { useState } from 'react';
import { Plus, Trash2, FileText } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import type { Template } from '../../contexts/AppContext';

export function TemplatesPanel() {
  const { state, dispatch } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTemplate, setNewTemplate] = useState({ name: '', content: '', category: '' });

  const handleSaveTemplate = () => {
    if (newTemplate.name && newTemplate.content) {
      const template: Template = {
        id: Date.now().toString(),
        name: newTemplate.name,
        content: newTemplate.content,
        category: newTemplate.category || 'General',
      };
      dispatch({ type: 'ADD_TEMPLATE', payload: template });
      setNewTemplate({ name: '', content: '', category: '' });
      setIsModalOpen(false);
    }
  };

  const handleUseTemplate = (template: Template) => {
    dispatch({ type: 'SET_PROMPT', payload: template.content });
  };

  const handleDeleteTemplate = (id: string) => {
    dispatch({ type: 'DELETE_TEMPLATE', payload: id });
  };

  const categories = [...new Set(state.templates.map(t => t.category))];

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
          Prompt Templates
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="w-4 h-4 mr-1" />
          Add
        </Button>
      </div>

      {categories.map(category => (
        <div key={category} className="space-y-2">
          <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            {category}
          </h4>
          <div className="space-y-1">
            {state.templates
              .filter(template => template.category === category)
              .map(template => (
                <div
                  key={template.id}
                  className="group flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <FileText className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <button
                    onClick={() => handleUseTemplate(template)}
                    className="flex-1 text-left text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white truncate"
                    title={template.content}
                  >
                    {template.name}
                  </button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteTemplate(template.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              ))}
          </div>
        </div>
      ))}

      {/* Add Template Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Template"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Template Name
            </label>
            <input
              type="text"
              value={newTemplate.name}
              onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter template name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <input
              type="text"
              value={newTemplate.category}
              onChange={(e) => setNewTemplate(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter category (optional)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Template Content
            </label>
            <textarea
              value={newTemplate.content}
              onChange={(e) => setNewTemplate(prev => ({ ...prev, content: e.target.value }))}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              placeholder="Enter your prompt template..."
            />
          </div>

          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSaveTemplate}
              disabled={!newTemplate.name || !newTemplate.content}
            >
              Save Template
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}