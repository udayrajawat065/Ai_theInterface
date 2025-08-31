import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { Slider } from '../ui/Slider';
import { availableModels } from '../../api/mockApi';

export function ParametersPanel() {
  const { state, dispatch } = useApp();

  const handleParameterChange = (key: keyof typeof state.parameters, value: number) => {
    dispatch({ type: 'SET_PARAMETER', payload: { key, value } });
  };

  return (
    <div className="p-4 space-y-6">
      {/* Model Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Model
        </label>
        <select
          value={state.selectedModel}
          onChange={(e) => dispatch({ type: 'SET_MODEL', payload: e.target.value })}
          className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          {availableModels.map((model) => (
            <option key={model.id} value={model.id}>
              {model.name} ({model.provider})
            </option>
          ))}
        </select>
      </div>

      {/* Parameters */}
      <div className="space-y-4">
        <Slider
          label="Temperature"
          value={state.parameters.temperature}
          min={0}
          max={2}
          step={0.1}
          onChange={(value) => handleParameterChange('temperature', value)}
          description="Controls randomness. Lower values make output more focused and deterministic."
        />

        <Slider
          label="Max Tokens"
          value={state.parameters.maxTokens}
          min={1}
          max={4096}
          step={1}
          onChange={(value) => handleParameterChange('maxTokens', value)}
          description="Maximum number of tokens to generate in the response."
        />

        <Slider
          label="Top P"
          value={state.parameters.topP}
          min={0}
          max={1}
          step={0.01}
          onChange={(value) => handleParameterChange('topP', value)}
          description="Controls diversity via nucleus sampling. Lower values focus on more likely tokens."
        />

        <Slider
          label="Frequency Penalty"
          value={state.parameters.frequencyPenalty}
          min={-2}
          max={2}
          step={0.1}
          onChange={(value) => handleParameterChange('frequencyPenalty', value)}
          description="Reduces repetition. Positive values discourage repeating tokens."
        />
      </div>

      {/* Model Info */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
          Current Model
        </h4>
        <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
          <p>Model: {availableModels.find(m => m.id === state.selectedModel)?.name}</p>
          <p>Provider: {availableModels.find(m => m.id === state.selectedModel)?.provider}</p>
          <p>Context: {state.parameters.maxTokens} tokens</p>
        </div>
      </div>
    </div>
  );
}