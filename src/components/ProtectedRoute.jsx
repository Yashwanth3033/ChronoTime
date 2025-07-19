import React from 'react';
import toast from "react-hot-toast";
import useUser from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';

export default function ProtectedRoute({children}) {
    
    const navigate = useNavigate();
    const {isLoading, isAuthenticated, error} = useUser();
    
    if (isLoading) return (
        <div className="font-bold text-3xl text-center">Loading</div>
    )
    if (error) {
        toast.error(error);
    }
    if (!isAuthenticated) {
        navigate("/login");
    }

    return children
}
