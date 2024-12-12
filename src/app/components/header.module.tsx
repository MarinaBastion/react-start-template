import React, { useCallback, useEffect, useRef, useState } from 'react'
import type { MouseEventHandler, ReactElement, ReactNode } from 'react'
import Styles from './header.module.css'
import { LogoProps } from './logo.module'

export interface HeaderProps {
    headerText: ReactNode
    logo: ReactElement<LogoProps>
}

export const Header: React.FC<HeaderProps> = ({ headerText, logo }) => {
    return (
        <div className={Styles.header}>
            <span>{headerText}</span>
            {logo}
        </div>
    )
}
