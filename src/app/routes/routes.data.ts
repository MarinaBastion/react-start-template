import { BucketList } from '../components/bucket-product-list/bucket-product-list'
import { ItemList } from '../components/product-list/product-list'
import Profile from '../components/profile/HookForm'
export const routes = [
    {
        path: '/profile',
        component: Profile,
    },
    {
        path: '/product-list',
        component: ItemList,
    },
    {
        path: '/bucket',
        component: BucketList,
    },
]
