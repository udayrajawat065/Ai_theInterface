import { Meta, Story } from '@storybook/react';
import { Modal, ModalProps } from './Modal';

export default {
  title: 'UI/Modal',
  component: Modal,
} as Meta;

const Template: Story<ModalProps> = (args: ModalProps) => <Modal {...args} />;

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
  onClose: () => {},
  title: 'Modal Title',
  children: <p>This is the modal content.</p>,
};
