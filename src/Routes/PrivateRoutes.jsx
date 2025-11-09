import React, { Children, useContext } from 'react';
import AuthContext from '../Auth/AuthContext';
import {  Navigate, useLocation } from 'react-router';
import Loading from '../Components/Loading';

const PrivateRoutes = ({children}) => {
    const{user,loading}=useContext(AuthContext)
    const  location=useLocation()
    

    if(loading){
        return <Loading></Loading>
    }
    
    if(user){
        return children

    }

    return <Navigate to={"/auth/login"} state={{from:location.pathname}}></Navigate>
       
}

export default PrivateRoutes;