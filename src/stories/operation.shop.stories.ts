import type { Meta } from '@storybook/react'

import { OperationShop } from '../app/components/operation.shop/operation-shop'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof OperationShop> = {
    title: 'Example/OperationShop',
    component: OperationShop,
    tags: ['autodocs'],
    args: {},
}

export default meta
export const ShowOpeartionShop = {
    args: {
        price: 23000,
        images: [
            {
                id: 1,
                url: 'flow.svg',
            },
            {
                id: 2,
                url: 'icons8-logo.svg',
            },
        ],
        name: 'product 1',
        category_name: 'soft',
        description: 'very good product!',
    },
}
