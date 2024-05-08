import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';


const Private = () => {

    
    return (
        <>
            {localStorage.getItem('token') ? <Outlet /> : <Navigate to="/" />}
        </>
    );
};

export default Private;