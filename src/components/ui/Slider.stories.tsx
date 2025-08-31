import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Slider, SliderProps } from './Slider';

export default {
  title: 'UI/Slider',
  component: Slider,
} as Meta;

const Template: Story<SliderProps> = (args: SliderProps) => <Slider {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Slider',
  min: 0,
  max: 100,
  step: 1,
  value: 50,
};
