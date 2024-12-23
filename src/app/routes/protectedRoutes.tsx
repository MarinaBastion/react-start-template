import React, { useCallback, useEffect, useRef, useState } from 'react'
import type { MouseEventHandler, ReactElement, ReactNode } from 'react'
import Styles from './header.module.css'
import { Navigate, useNavigate } from 'react-router-dom';

export interface ProtectedRouteProps {
    token?: string,
    redirectPath: string ,
    children: React.ReactNode

}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ token, redirectPath = "/login", children }) => {
    if (!token) {
        return <Navigate to={redirectPath} replace />
    }
    return children
}
