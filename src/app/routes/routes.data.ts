import { BucketList } from '../components/bucket-product-list/bucket-product-list'
import { ItemList } from '../components/product-list/product-list'
import Profile from '../components/profile/HookForm'
import { LoginForm } from '../components/registration_login/login'
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
	{
        path: '/login',
        component: LoginForm,
    },
]
