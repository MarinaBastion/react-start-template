import React from 'react'
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { tokenSelectors } from '../../store/token';
import { useAuthGuard } from '../../hooks/useAuthGuard';

const Layout = () => {
	const token = useSelector(tokenSelectors.get);
	useAuthGuard(token)
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default Layout
