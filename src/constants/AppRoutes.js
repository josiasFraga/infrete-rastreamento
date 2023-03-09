import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignupPage from '../Pages/SignupPage';
import LoginPage from '../Pages/LoginPage';
import DashboardPage from '../Pages/DashboardPage';
import ClientesPage from '../Pages/ClientesPage';
import LogoutPage from '../Pages/LogoutPage';

const AppRoutes = () => {
    const [token, setToken] = React.useState(null);
    const authToken = localStorage.getItem("bearerToken");
    console.log(authToken);

    return (
    <Routes>
        <>
            <Route path="/" element={<LoginPage />} />
            <Route path='/cadastro' element={<SignupPage />} />
            <Route path='/login' element={<LoginPage  />} />
        </>
        <>
            <Route path='/dashboard' element={<DashboardPage />} />
            <Route path='/clientes' element={<ClientesPage />} />
            <Route path='/logout' element={<LogoutPage />} />
        </>
    </Routes>
    )
};

export default AppRoutes;
