import type { Meta } from '@storybook/react'

import { BucketButton } from '../app/components/Bucket-button/bucket-button'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof BucketButton> = {
    title: 'Example/BucketButton',
    component: BucketButton,
    tags: ['autodocs'],
    args: {},
}

export default meta

export const ShowButton = {
    args: {
        countNumber: 0,
    },
}

export const ShowInput = {
    args: {
        countNumber: 37,
    },
}
