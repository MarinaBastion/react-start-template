import React, { useCallback, useEffect, useRef, useState } from 'react'
import type { MouseEventHandler, ReactElement, ReactNode } from 'react'
import Styles from './logo.module.css'

export interface LogoProps {
    image?: string
}

export const Logo: React.FC<LogoProps> = ({ image }) => {
    return (
        <div className={Styles.logo}>
            <img src={require('src/images/icons8-logo.svg')} />
        </div>
    )
}
