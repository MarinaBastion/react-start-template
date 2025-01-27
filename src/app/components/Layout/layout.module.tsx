import React from 'react'
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { authSelectors } from '../../store/auth'
import { useAuthGuard } from '../../hooks/useAuthGuard';

const Layout = () => {
	const token = localStorage.getItem("token");
    //const token = localStorage.getItem("token")
	useAuthGuard(token)
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default Layout
