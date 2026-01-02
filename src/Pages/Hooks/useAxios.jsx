import axios from "axios";
import React from "react";

export  const instance = axios.create({
  // baseURL: "https://finance-flow-phi-inky.vercel.app",
  baseURL: "http://localhost:5000",
});


const useAxios = () => {
    return instance
};

export default useAxios;