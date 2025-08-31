import React, { useEffect, useRef } from 'react';
import { MessageSquare, AlertCircle } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { ChatBubble } from '../ui/ChatBubble';
import { Button } from '../ui/Button';

export function ChatArea() {
  const { state, dispatch } = useApp();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.messages]);

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const handleDownload = (message: any) => {
    const data = {
      id: message.id,
      role: message.role,
      content: message.content,
      timestamp: message.timestamp,
      model: state.selectedModel,
      parameters: state.parameters,
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `message-${message.id}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (state.messages.length === 0 && !state.isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Start a conversation
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Enter a prompt below to begin chatting with the AI model. You can adjust parameters and use templates from the sidebar.
          </p>
          <div className="text-xs text-gray-400 space-y-1">
            <p>• Use templates for common prompts</p>
            <p>• Adjust temperature for creativity</p>
            <p>• Copy or download responses as JSON</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {state.error && (
        <div className="mx-4 mt-4 p-3 bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800 rounded-lg">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-error-600 dark:text-error-400" />
            <span className="text-sm text-error-700 dark:text-error-300">{state.error}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => dispatch({ type: 'SET_ERROR', payload: null })}
              className="ml-auto h-6 px-2 text-error-600 dark:text-error-400"
            >
              Dismiss
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-1">
        {state.messages.map((message) => (
          <ChatBubble
            key={message.id}
            role={message.role}
            content={message.content}
            timestamp={message.timestamp}
            onCopy={() => handleCopy(message.content)}
            onDownload={() => handleDownload(message)}
          />
        ))}
        
        {state.isLoading && (
          <div className="flex gap-3 p-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary-100 dark:bg-secondary-900 flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-secondary-600 border-t-transparent rounded-full animate-spin" />
            </div>
            <div className="flex-1">
              <div className="inline-block p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg rounded-bl-sm shadow-sm">
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="text-sm">AI is thinking...</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}