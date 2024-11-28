import { BrowserRouter, Route, Routes } from 'react-router-dom'

import NotFound from '../components/NotFound/NotFound'
import Layout from '../components/layout.module'

import { routes } from './routes.data'
import React from 'react'

const Router = () => {

	return (
		<BrowserRouter>
			<Routes>
			<Route path="/" element={<Layout />}>
				{routes.map((route) => {
					return (
						<Route
							key={route.path}
							path={route.path}
							element={<route.component />}
						/>
					)
				})}
			</Route>
			<Route path='*' element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	)
}

export default Router
