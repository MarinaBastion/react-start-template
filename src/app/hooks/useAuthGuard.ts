import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuthGuard = (token:string) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
        else{
            navigate("/profile");
        }
    }, [token]);
};