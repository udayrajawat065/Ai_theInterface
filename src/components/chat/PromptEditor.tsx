import React from 'react';
import { Send, RotateCcw } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { Button } from '../ui/Button';

export function PromptEditor() {
  const { state, dispatch } = useApp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.prompt.trim() || state.isLoading) return;

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: state.prompt,
      timestamp: new Date(),
    };
    dispatch({ type: 'ADD_MESSAGE', payload: userMessage });

    // Clear prompt and set loading
    dispatch({ type: 'SET_PROMPT', payload: '' });
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    // Simulate API call
    import('../../api/mockApi').then(({ sendPrompt }) => {
      sendPrompt(state.prompt, state.selectedModel, state.parameters)
        .then((response) => {
          const assistantMessage = {
            id: response.id,
            role: 'assistant' as const,
            content: response.content,
            timestamp: new Date(),
          };
          dispatch({ type: 'ADD_MESSAGE', payload: assistantMessage });
        })
        .catch((error) => {
          dispatch({ type: 'SET_ERROR', payload: error.message });
        })
        .finally(() => {
          dispatch({ type: 'SET_LOADING', payload: false });
        });
    });
  };

  const handleClear = () => {
    dispatch({ type: 'CLEAR_MESSAGES' });
    dispatch({ type: 'SET_ERROR', payload: null });
  };

  return (
    <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <textarea
            value={state.prompt}
            onChange={(e) => dispatch({ type: 'SET_PROMPT', payload: e.target.value })}
            placeholder="Enter your prompt here..."
            rows={4}
            className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            disabled={state.isLoading}
          />
          <div className="absolute bottom-3 right-3 text-xs text-gray-400">
            {state.prompt.length} chars
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClear}
            disabled={state.messages.length === 0}
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Clear Chat
          </Button>

          <Button
            type="submit"
            variant="primary"
            disabled={!state.prompt.trim() || state.isLoading}
            className="min-w-[100px]"
          >
            {state.isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Sending...
              </div>
            ) : (
              <>
                <Send className="w-4 h-4 mr-1" />
                Send
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}