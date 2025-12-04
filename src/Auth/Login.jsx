import React, { useContext, useEffect, useState } from 'react';
import { IoIosEye, IoMdEyeOff } from 'react-icons/io';
import { Link, useLocation, useNavigate } from 'react-router';
import AuthContext from './AuthContext';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import Loading from '../Components/Loading';
import { motion } from 'framer-motion';
import bg from '../assets/bg1.png'
import img from "../assets/refund.png";

const Login = () => {
    const [show,setShow]=useState(true)
    const {userSignIn,setLoading,loading,googleLogin}=useContext(AuthContext);
    const location=useLocation()
    const from = location.state?.from ;
   
    const navigate=useNavigate()
    //Implementation dynamic route 
    useEffect(() => {
        document.title = "Login";
      }, []);


   
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
                  title: "Login successful",
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
     Swal.fire({
       position: "top-end",
       icon: "success",
       title: "Login successful",
       showConfirmButton: false,
       timer: 1500,
     });
    



   }).catch(()=>{})

  }


    return (
      <section className="grid grid-cols-1 md:grid-cols-2 mt-20 min-h-screen">
        {/* Left side - Illustration */}
        <div className="flex flex-col justify-center items-center md:items-start px-6 md:px-24 bg-gray-50">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 leading-tight mb-4 text-center md:text-left">
            Login to Your Account
          </h1>
          <p className="text-gray-600 text-center md:text-left text-lg mb-6 max-w-md">
            Access your account to track expenses and manage finances
            efficiently.
          </p>
          <img
            className="w-full max-w-sm h-[200px] md:h-[400px]  object-contain"
            src="https://i.ibb.co/7NSmZknX/undraw-login-weas-1.png"
            alt="Login Illustration"
          />
        </div>

        {/* Right side - Login form */}
        <div
          style={{ backgroundImage: `url(${bg})` }}
          className="bg-gradient-to-br  flex items-center justify-center px-4 py-10"
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-full mb-10 max-w-md border border-white/30"
          >
            <div className='flex justify-center items-center gap-3 '>
              <img src={img} alt="" className='h-15 fle justify-center items-center'/>
              <h1 className="text-3xl font-extrabold text-center bg-gradient-to-r from-teal-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent mb-2">
                Please Login
              </h1>
            </div>
            <p className="text-center text-gray-500 text-sm mb-6">
              Sign in to manage your money and track your expenses.
            </p>

            {/* Login Form */}
            <motion.form onSubmit={handleUserSignIn} className=" h-[300px]">
              {/* Email */}
              <div>
                <label className="block text-gray-600 text-sm font-medium mb-1">
                  Email Address
                </label>
                <motion.input
                  whileHover={{ scale: 1.03 }}
                  whileFocus={{ scale: 1.02 }}
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className="w-full border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 rounded-lg px-4 py-2 outline-none transition duration-200"
                  required
                />
              </div>

              {/* Password */}
              <div className="">
                <label className="block text-gray-600 text-sm font-medium mb-1">
                  Password
                </label>

                <div className="relative">
                  <motion.input
                    whileHover={{ scale: 1.1, borderColor: "#A78BFA" }}
                    whileFocus={{
                      scale: 1.05,
                      borderColor: "#6366F1",
                      boxShadow: "0 0 10px rgba(99,102,241,0.6)",
                    }}
                    name="password"
                    type={`${show ? "password" : "text"}`}
                    placeholder="••••••••"
                    className="w-full border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-lg px-4 py-2 outline-none transition duration-200"
                    required
                  />
                  <p
                    onClick={() => setShow(!show)}
                    className="absolute right-3 top-1/3 cursor-pointer"
                  >
                    {" "}
                    {show ? <IoMdEyeOff /> : <IoIosEye />}
                  </p>
                </div>
              </div>

              {/* Forgot Password */}

              {/* Login Button */}
              <button
                type="submit"
                className="w-full cursor-pointer bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold rounded-lg py-2 mt-2 hover:from-teal-700 hover:to-cyan-700 transition duration-300 shadow-md"
              >
                Login
              </button>

              {/* Divider */}
              <div className="divider divider-neutral">or</div>

              {/* Google Login */}
              <button
                onClick={handleGoogleLogin}
                type="button"
                className="w-full bg-white cursor-pointer text-black border border-gray-300 rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-gray-100 transition"
              >
                Login with Google
              </button>

              {/* Register Link */}
              <p className="text-center text-sm text-gray-600 mt-4">
                Don’t have an account?{" "}
                <a
                  href="/auth/register"
                  className="text-teal-600 hover:text-teal-800 font-medium"
                >
                  Register here
                </a>
              </p>
            </motion.form>
          </motion.div>
        </div>
      </section>
    );
};

export default Login;