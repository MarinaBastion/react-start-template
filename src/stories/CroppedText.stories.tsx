import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CroppedText, CroppedTextProps } from '../app/components/CroppedText';
import { ComponentInfo } from '../app/components/ComponentInfo';

const Wrapper = (props: CroppedTextProps) => (
  <ComponentInfo
    title="Обрезанный текст"
    desc={`Компонент использует useLayoutEffect, ResizeObserver и алгоритм бинарного поиска.`}
  >
    <CroppedText {...props} />
  </ComponentInfo>
);

const meta: Meta<typeof CroppedText> = {
  title: 'CroppedText',
  component: Wrapper,
  argTypes: {
    rows: { control: { type: 'number', min: 0 } },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    opened: false,
    rows: 3,
    children: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid at, dolore earum enim est eveniet facilis illo impedit in, itaque maxime necessitatibus nesciunt nihil non officiis placeat provident quasi reiciendis.`,
  },
};