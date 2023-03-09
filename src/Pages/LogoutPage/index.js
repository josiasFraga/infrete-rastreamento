import React from 'react';
import { Navigate } from 'react-router-dom';

const LogoutPage = () => {
    localStorage.clear();
    return (
        <Navigate to="/login" />
    );
};

export default LogoutPage;