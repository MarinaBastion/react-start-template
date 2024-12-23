import { BucketList } from '../components/Bucket-product-list/bucket-product-list'
import { ItemList } from '../components/Product-list/product-list'
import Profile from '../components/Profile/HookForm'
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
