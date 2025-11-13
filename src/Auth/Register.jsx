import React, { useContext, useEffect, useState } from "react";
import { IoIosEye, IoMdEyeOff } from "react-icons/io";
import { Link,  useNavigate } from "react-router";
import AuthContext from "./AuthContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Loading from "../Components/Loading";
import { motion } from "framer-motion";
import bg from '../assets/bg2.svg'
import img from "../assets/refund.png";

const Register = () => {
  const [show, setShow] = useState(true);
  const [message,setMessage]=useState("")
  //implementation dynamic route 
 useEffect(() => {
     document.title = "Register ";
   }, []);
  const {
    userRegister,
    error,
    setError,
    setLoading,
    updateUser,
    setUser,
    googleLogin,
  } = useContext(AuthContext);
  const navigate = useNavigate();
  // console.log(userRegister)
  //loading spinner

  //handle user register function is here

  const handleUserRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const cPassword = e.target.c_password.value;
    const photo = e.target.photo.value;
    //check password validation 
      const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
      if(!passwordRegex.test(password)){
        return setMessage(
          "❌ Password must contain at least one uppercase, one lowercase letter, and be at least 6 characters long."
        );

      }
      //check  password 

    if (password !== cPassword) {
      setError("password doesn't match");
      return;
    }
   

    userRegister(email, password)
      .then((res) => {
       
        updateUser({
          displayName: name,
          photoURL: photo,
        }).then(() => {
          setUser(res.user);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Registration successful",
            showConfirmButton: false,
            timer: 1500,
          });
          e.target.reset();
          navigate("/");
        });
      })
      .catch((error) => {
        toast.error(error.code);
      })
      .finally(() => setLoading(false));
  };

  // handle google login
  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        navigate("/");
      })
      .catch(() => {});
  };

  return (
    <div
      style={{ backgroundImage: `url(${bg})` }}
      className="min-h-screen  flex items-center justify-center px-4 py-10"
    >
      <div className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-full max-w-md border border-white/20">
        <div className="flex justify-center items-center ">
          <img src={img} alt="" className="h-15 mr-5 mb-1" />
          <h1 className="text-2xl font-extrabold text-center bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6">
            Create Your Account
          </h1>
        </div>

        {/* Registration Form */}
        <motion.form
          onSubmit={handleUserRegister}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Full Name */}
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Full Name
            </label>
            <motion.input
              whileHover={{ scale: 1.1, borderColor: "#A78BFA" }}
              whileFocus={{
                scale: 1.05,
                borderColor: "#6366F1",
                boxShadow: "0 0 10px rgba(99,102,241,0.6)",
              }}
              type="text"
              name="name"
              placeholder="Enter your name"
              className="w-full border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-lg px-4 py-2 outline-none transition duration-200"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Photo URL
            </label>
            <motion.input
              type="text"
              name="photo"
              whileHover={{ scale: 1.1, borderColor: "#A78BFA" }}
              whileFocus={{
                scale: 1.05,
                borderColor: "#6366F1",
                boxShadow: "0 0 10px rgba(99,102,241,0.6)",
              }}
              placeholder="Enter your photo url"
              className="w-full border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-lg px-4 py-2 outline-none transition duration-200"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Email Address
            </label>
            <motion.input
              type="email"
              name="email"
              whileHover={{ scale: 1.1, borderColor: "#A78BFA" }}
              whileFocus={{
                scale: 1.05,
                borderColor: "#6366F1",
                boxShadow: "0 0 10px rgba(99,102,241,0.6)",
              }}
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
            {message}
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
              <p className="text-red-700"> {error}</p>
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
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            type="submit"
            className="w-full   bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold rounded-lg py-2 mt-2 hover:from-indigo-700 hover:to-purple-700 transition duration-300 shadow-md"
          >
            Register
          </motion.button>

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
        </motion.form>
      </div>
    </div>
  );
};

export default Register;
