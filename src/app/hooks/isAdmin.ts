import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { authSelectors,User } from '../store/auth';

export const useIsAdmin = ( ) => {
    const [isAdmin, setIsAdmin] = useState<boolean>(null)
    const auth = useSelector(authSelectors.get);
    const user: User =  auth.user;

    useEffect(() => {
        if (user.role == "admin")
            setIsAdmin(true) 
        else 
            setIsAdmin(false) 
    });
    return isAdmin
};