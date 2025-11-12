import React, { useContext, useState } from 'react';
import { IoIosEye, IoMdEyeOff } from 'react-icons/io';
import { Link, useLocation, useNavigate } from 'react-router';
import AuthContext from './AuthContext';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import Loading from '../Components/Loading';
import { motion } from 'framer-motion';

const Login = () => {
    const [show,setShow]=useState(true)
    const {userSignIn,setLoading,loading,googleLogin}=useContext(AuthContext);
    const location=useLocation()
    const from = location.state?.from ;
     console.log(from)
    const navigate=useNavigate()


   
    if(loading){
        return <Loading></Loading>
    }





const handleUserSignIn=(e)=>{
    e.preventDefault()
    const password=e.target.password.value;
    const email=e.target.email.value;
    // console.log(password,email)
    userSignIn(email,password).then(res=>{

          Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Logout successful",
                  showConfirmButton: false,
                  timer: 1500,
                });
                e.target.reset()


    }).catch(error=>{
        toast.error(error.message)
    }).finally(()=>setLoading(false))
}


//handle google login 
  const handleGoogleLogin=()=>{
   googleLogin().then(()=>{
    navigate(from)


   }).catch(()=>{})

  }


    return (
      <div>
        <div className="min-h-screen bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-600 flex items-center justify-center px-4 py-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-full max-w-md border border-white/30"
          >
            <h1 className="text-3xl font-extrabold text-center bg-gradient-to-r from-teal-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent mb-8">
              Please Login
            </h1>

            {/* Login Form */}
            <motion.form onSubmit={handleUserSignIn} className="space-y-2">
              {/* Email */}
              <div>
                <label className="block text-gray-600 text-sm font-medium mb-1">
                  Email Address
                </label>
                <motion.input
                  whileHover={{ scale: 1.1, borderColor: "#A78BFA" }}
                  whileFocus={{ scale: 1.05, borderColor: "#A78BFA" }}
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className="w-full border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 rounded-lg px-4 py-2 outline-none transition duration-200"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-gray-600 text-sm font-medium mb-1">
                  Password
                </label>
                <div className="relative">
                  <motion.input
                    whileHover={{ scale: 1.1, borderColor: "#A78BFA" }}
                    whileFocus={{ scale: 1.05, borderColor: "#A78BFA" }}
                    type={show ? "password" : "text"}
                    name="password"
                    placeholder="••••••••"
                    className="w-full border py-2 border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 rounded-lg px-2  outline-none transition duration-200"
                    required
                  />
                  <p
                    onClick={() => setShow(!show)}
                    className="absolute right-3 top-1/3 text-gray-500 cursor-pointer"
                  >
                    {show ? <IoMdEyeOff size={20} /> : <IoIosEye size={20} />}
                  </p>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <a
                  href="/auth/forgot-password"
                  className="text-sm text-teal-600 hover:text-teal-800 hover:underline transition duration-150"
                >
                  Forgot password?
                </a>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold rounded-lg py-2 mt-2 hover:from-teal-700 hover:to-cyan-700 transition duration-300 shadow-md"
              >
                Login
              </button>
              {/* divider  */}
              <div className="divider divider-neutral">or</div>
              {/* google login button */}
              <button
                onClick={handleGoogleLogin}
                className="btn w-full bg-white text-black border-[#e5e5e5]"
              >
                <svg
                  aria-label="Google logo"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <g>
                    <path d="m0 0H512V512H0" fill="#fff"></path>
                    <path
                      fill="#34a853"
                      d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                    ></path>
                    <path
                      fill="#4285f4"
                      d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                    ></path>
                    <path
                      fill="#fbbc02"
                      d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                    ></path>
                    <path
                      fill="#ea4335"
                      d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                    ></path>
                  </g>
                </svg>
                Login with Google
              </button>

              {/* Register Link */}
              <p className="text-center text-sm text-gray-600 mt-4">
                Don’t have an account?{" "}
                <Link
                  to="/auth/register"
                  className="text-teal-600 hover:text-teal-800 font-medium"
                >
                  Register here
                </Link>
              </p>
            </motion.form>
          </motion.div>
        </div>
      </div>
    );
};

export default Login;