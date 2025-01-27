import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'

import NotFound from '../components/NotFound/NotFound'
import Layout from '../components/Layout/layout.module'

import {useAuthGuard} from '../hooks/useAuthGuard'

import { routes } from './routes.data'
import React from 'react'
import { ItemList } from '../components/Product-list/product-list'
import { BucketList } from '../components/Bucket-product-list/bucket-product-list'
//import { LoginForm } from '../components/registration_login/login'
import { ProtectedRoute } from './protectedRoutes'
import { useSelector } from 'react-redux'
import { tokenSelectors } from '../store/token'
import Profile from '../components/Profile/HookForm'
import { RegisterForm } from '../components/registration_login/register'
import { RegisterThunkForm } from '../components/registration_login/register-thunk'
import { LoginForm } from '../components/registration_login/login'
import ProductForm from '../components/Product/product-from'
import { ModalForm } from '../components/Modal/modal-form.module'

const Router = () => {
    debugger;
	const token = localStorage.getItem("token");
    const location = useLocation();
    const background = location.state && location.state.background;

    return (
        <BrowserRouter>
            <Routes >
			<Route path="/" element={<Layout />}>
			<Route path= '/product-list' element={<ItemList/>} />
			<Route path= '/bucket' element={<BucketList/>} />
			<Route path= '/login' element={<LoginForm/>} />
            <Route path= '/register' element={<RegisterForm/>} />
            <Route path= '/registerthunk' element={<RegisterThunkForm/>} />
			<Route path= '/profile' element={
				<ProtectedRoute token={token} redirectPath={'/login'} > 
					<Profile/>
				</ProtectedRoute>
			} />
			<Route path= '/product' element={<ProductForm/>} />
			</Route> 
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router
