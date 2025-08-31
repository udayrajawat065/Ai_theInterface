import { Copy, Download, User, Bot } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Button } from './Button';

// ChatBubble.tsx ke top me
export interface ChatBubbleProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  onCopy?: () => void;
  onDownload?: () => void;
}



export function ChatBubble({ role, content, timestamp, onCopy, onDownload }: ChatBubbleProps) {
  const isUser = role === 'user';

  return (
    <div className={cn('flex gap-3 p-4', isUser ? 'flex-row-reverse' : 'flex-row')}>
      <div className={cn(
        'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
        isUser 
          ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
          : 'bg-secondary-100 dark:bg-secondary-900 text-secondary-600 dark:text-secondary-400'
      )}>
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>
      
      <div className={cn('flex-1 max-w-3xl', isUser ? 'text-right' : 'text-left')}>
        <div className={cn(
          'inline-block p-3 rounded-lg shadow-sm',
          isUser
            ? 'bg-primary-600 text-white rounded-br-sm'
            : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-bl-sm'
        )}>
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <p className="whitespace-pre-wrap m-0">{content}</p>
          </div>
        </div>
        
        <div className={cn(
          'flex items-center gap-2 mt-2 text-xs text-gray-500 dark:text-gray-400',
          isUser ? 'justify-end' : 'justify-start'
        )}>
          <span>{timestamp.toLocaleTimeString()}</span>
          {!isUser && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={onCopy}
                className="h-6 px-2 text-xs"
              >
                <Copy className="w-3 h-3 mr-1" />
                Copy
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onDownload}
                className="h-6 px-2 text-xs"
              >
                <Download className="w-3 h-3 mr-1" />
                JSON
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
