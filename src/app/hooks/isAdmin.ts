import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { authSelectors } from '../store/auth';
import { profileThunkSelectors } from '../store/profileThunk';
import { Profile } from '../types/ResponseErrors';
import { ProfileGetResponse } from '../types/Profile';


export const useIsAdmin = ( ) => {
    const [isAdmin, setIsAdmin] = useState<boolean>(null)
    const auth = useSelector(authSelectors.get);
    
    const user: ProfileGetResponse =  auth.user;

    useEffect(() => {
        if (user) 
        {
        if (user.name == "admin")
            setIsAdmin(true) 
        else 
            setIsAdmin(false) 
        }
        
    });
    return isAdmin
};