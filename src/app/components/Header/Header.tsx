import { NavLink, useNavigate } from 'react-router-dom'
import Style from './Header.module.css'
import React, { ReactElement, ReactNode } from 'react'
import { LogoProps, Logo } from '../Logo/logo.module'
import cn from 'clsx'

export interface HeaderProps {
    headerText?: ReactNode
    logo?: ReactElement<LogoProps>
}

const Header: React.FC = () => {
	
    return (
        <>
            <div className={Style.header}>
                <span>
                    <NavLink
                        to="/profile"
                        className={({ isActive }) =>
                            isActive ? cn(Style.active, Style.nav) : Style.nav
                        }
                    >
                        Profile
                    </NavLink>
                    <NavLink
                        to="/product-list"
                        className={({ isActive }) =>
                            isActive ? cn(Style.active, Style.nav) : Style.nav
                        }
                    >
                        Product list
                    </NavLink>
                    <NavLink
                        to="/bucket"
                        className={({ isActive }) =>
                            isActive ? cn(Style.active, Style.nav) : Style.nav
                        }
                    >
                        Bucket
                    </NavLink>
                </span>
                <Logo />
            </div>
        </>
    )
}
export default Header
