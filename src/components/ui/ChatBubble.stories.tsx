import { Meta, Story } from '@storybook/react';
import { ChatBubble, ChatBubbleProps } from './ChatBubble';

export default {
  title: 'UI/ChatBubble',
  component: ChatBubble,
} as Meta;

const Template: Story<ChatBubbleProps> = (args) => <ChatBubble {...args} />;

export const UserMessage = Template.bind({});
UserMessage.args = {
  role: 'user',
  content: 'This is a user message.',
  timestamp: new Date(),
  onCopy: () => console.log('Copied!'),
  onDownload: () => console.log('Downloaded!'),
};

export const AIMessage = Template.bind({});
AIMessage.args = {
  role: 'assistant',
  content: 'This is an AI response.',
  timestamp: new Date(),
  onCopy: () => console.log('Copied!'),
  onDownload: () => console.log('Downloaded!'),
};
