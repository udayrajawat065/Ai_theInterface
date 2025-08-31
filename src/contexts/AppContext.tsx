import React, { createContext, useContext, useReducer } from 'react';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface Template {
  id: string;
  name: string;
  content: string;
  category: string;
}

export interface AppState {
  selectedModel: string;
  prompt: string;
  messages: Message[];
  parameters: {
    temperature: number;
    maxTokens: number;
    topP: number;
    frequencyPenalty: number;
  };
  templates: Template[];
  isLoading: boolean;
  error: string | null;
  sidebarOpen: boolean;
}

type AppAction =
  | { type: 'SET_MODEL'; payload: string }
  | { type: 'SET_PROMPT'; payload: string }
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'SET_PARAMETER'; payload: { key: keyof AppState['parameters']; value: number } }
  | { type: 'ADD_TEMPLATE'; payload: Template }
  | { type: 'DELETE_TEMPLATE'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'CLEAR_MESSAGES' };

const initialState: AppState = {
  selectedModel: 'gpt-3.5-turbo',
  prompt: '',
  messages: [],
  parameters: {
    temperature: 0.7,
    maxTokens: 2048,
    topP: 1,
    frequencyPenalty: 0,
  },
  templates: [
    {
      id: '1',
      name: 'Creative Writing',
      content: 'Write a creative story about...',
      category: 'Writing'
    },
    {
      id: '2',
      name: 'Code Review',
      content: 'Please review this code and suggest improvements:\n\n```\n// Your code here\n```',
      category: 'Development'
    },
    {
      id: '3',
      name: 'Explain Concept',
      content: 'Explain the concept of [TOPIC] in simple terms with examples.',
      category: 'Education'
    }
  ],
  isLoading: false,
  error: null,
  sidebarOpen: false,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_MODEL':
      return { ...state, selectedModel: action.payload };
    case 'SET_PROMPT':
      return { ...state, prompt: action.payload };
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'SET_PARAMETER':
      return {
        ...state,
        parameters: { ...state.parameters, [action.payload.key]: action.payload.value }
      };
    case 'ADD_TEMPLATE':
      return { ...state, templates: [...state.templates, action.payload] };
    case 'DELETE_TEMPLATE':
      return {
        ...state,
        templates: state.templates.filter(t => t.id !== action.payload)
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen };
    case 'CLEAR_MESSAGES':
      return { ...state, messages: [] };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}