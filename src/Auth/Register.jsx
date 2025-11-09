import React, {  useContext, useState } from 'react';
import { IoIosEye, IoMdEyeOff } from 'react-icons/io';
import { Link } from 'react-router';
import AuthContext from './AuthContext';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import Loading from '../Components/Loading';

const Register = () => {
    const [show,SetShow]=useState(true)
    const {userRegister,error,setError,setLoading}=useContext(AuthContext)
    // console.log(userRegister)
  //loading spinner  
  
  
 

    //handle user register function is here 
    
const handleUserRegister=(e)=>{
    e.preventDefault();
    const name=e.target.name.value;
    const email=e.target.email.value;
    const password=e.target.password.value;
    const cPassword=e.target.c_password.value;
    if(password!==cPassword){
         setError("password doesn't match");
        return
    }
    console.log(name,email,password,cPassword);

    userRegister(email,password).then((res)=>{
        console.log(res.user)

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Registration successful",
          showConfirmButton: false,
          timer: 1500,
        });

         e.target.reset();
           setError(" ");
        
    }).catch(error=>{
        toast.error(error.code)
    }).finally(()=>setLoading(false))
    
}




    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center px-4 py-10">
        <div className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-full max-w-md border border-white/20">
          <h1 className="text-2xl font-extrabold text-center bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6">
            Create Your Account
          </h1>

          {/* Registration Form */}
          <form onSubmit={handleUserRegister} className="space-y-2">
            {/* Full Name */}
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="w-full border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-lg px-4 py-2 outline-none transition duration-200"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                className="w-full border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-lg px-4 py-2 outline-none transition duration-200"
                required
              />
            </div>

            {/* Password */}
            <div className="">
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={`${show ? "password" : "text"}`}
                  placeholder="••••••••"
                  className="w-full border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-lg px-4 py-2 outline-none transition duration-200"
                  required
                />
                <p
                  onClick={() => SetShow(!show)}
                  className="absolute right-3 top-1/3 cursor-pointer"
                >
                  {" "}
                  {show ? <IoMdEyeOff /> : <IoIosEye />}
                </p>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="">
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  name="c_password"
                  type={`${show ? "password" : "text"}`}
                  placeholder="••••••••"
                  className="w-full border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-lg px-4 py-2 outline-none transition duration-200"
                  required
                />
                <p className='text-red-700'> {error}</p>
                <p
                  onClick={() => SetShow(!show)}
                  className="absolute right-3 top-1/3 cursor-pointer"
                >
                  {" "}
                  {show ? <IoMdEyeOff /> : <IoIosEye />}
                </p>
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg py-2 mt-2 hover:from-indigo-700 hover:to-purple-700 transition duration-300 shadow-md"
            >
              Register
            </button>

            {/* Login Link */}
            <p className="text-center text-sm text-gray-600 mt-2">
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className="text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    );
};

export default Register;







