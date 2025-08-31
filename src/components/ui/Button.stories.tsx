import { Story, Meta } from '@storybook/react';
import { Button, ButtonProps } from './Button';

// ✅ Storybook Meta
export default {
  title: 'UI/Button',
  component: Button,
} as Meta;

// ✅ Template function for stories
const Template: Story<ButtonProps> = (args) => <Button {...args} />;

// ✅ Primary Button
export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  children: 'Primary Button',
};

// ✅ Secondary Button
export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
  children: 'Secondary Button',
};

// ✅ Outline Button
export const Outline = Template.bind({});
Outline.args = {
  variant: 'outline',
  children: 'Outline Button',
};

// ✅ Ghost Button
export const Ghost = Template.bind({});
Ghost.args = {
  variant: 'ghost',
  children: 'Ghost Button',
};

// ✅ Danger Button
export const Danger = Template.bind({});
Danger.args = {
  variant: 'danger',
  children: 'Danger Button',
};
