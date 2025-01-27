import type { Meta } from '@storybook/react'

import { ModalForm } from '../app/components/Modal/modal-form.module'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ModalForm> = {
    title: 'Example/ModalFrom',
    component: ModalForm,
    tags: ['autodocs'],
    args: {},
}

export default meta

export const Opened = {
    args: {
        isVisible: true,
        children: 'Opend modal',
    },
}

export const Closed = {
    args: {
        isVisible: false,
        children: 'Closed modal',
    },
}
