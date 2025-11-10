import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import AuthContext from '../../Auth/AuthContext';

const useAxiosSecure = () => {
  const {user}=useContext(AuthContext);
  const instance = axios.create({
    baseURL: "http://localhost:5000",
  });

useEffect(()=>{

const requestInterceptor = instance.interceptors.request.use((config) => {
  if (user?.accessToken) {
    config.headers.Authorization = `Bearer ${user?.accessToken}`;
  }

  return config;
});


return()=>{
    instance.interceptors.request.eject(requestInterceptor)
}
    

},[user])

   


    return instance
};

export default useAxiosSecure;