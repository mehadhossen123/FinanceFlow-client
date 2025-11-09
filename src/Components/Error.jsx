import React, { useEffect } from "react";
import img from '../assets/error-404.png'
import { useNavigate } from "react-router";



const Error = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    document.title="error"
  },[])

  return (
    <>
     
      <div>
        <div className="">
          <div className="flex justify-center">
            <img className="" src={img} alt="" />
          </div>
          <h1 className="text-5xl text-center text-red-500">Oops {``}!</h1>
          <p className="text-sm text-gray-400 text-center my-2">
            The page you are looking for is not available.
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => navigate("/")}
              className="btn bg-blue-500 text-white"
            >
              {" "}
              Go Home
            </button>
          </div>
        </div>
      </div>
   

     
    </>
  );
};

export default Error;
