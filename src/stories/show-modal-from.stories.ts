import type { Meta } from '@storybook/react'

import { ShowModal } from '../app/components/show-modal-from/show.modal.from'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ShowModal> = {
    title: 'Example/ShowModalFrom',
    component: ShowModal,
    tags: ['autodocs'],
    args: {},
}

export default meta

export const ShowInput = {
    args: {},
}
