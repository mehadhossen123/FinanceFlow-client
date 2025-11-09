import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router';
import { isActive } from '../Utils/utils';
import AuthContext from '../Auth/AuthContext';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import Loading from './Loading';
import { MdLogout } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import img from '../assets/dd.jpg'

import { IoSettingsOutline } from 'react-icons/io5';
import { GiTakeMyMoney } from 'react-icons/gi';

const Navbar = () => {

  const { user, userSignOut ,loading,setLoading} = useContext(AuthContext);
  
    if(loading){
      return <Loading></Loading>

    }
  


const links = (
  <>

  <li><NavLink to="/" className={isActive} > Home </NavLink> </li>
  <li><NavLink to="/addTransaction" className={isActive} > AddTransaction </NavLink> </li>
  <li><NavLink to="/reports" className={isActive} > Reports</NavLink> </li>

{
  !user&&(
    <>
    <li> <NavLink to="/auth/login"className={isActive}>Login  </NavLink> </li> 

<li> <NavLink to="/auth/register"className={isActive}> Register </NavLink></li>
    </>
  )
}


  </>
);


  
  const handleLogout = () => {
    userSignOut()
      .then((res) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logout successful",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        toast.error(error.message);
      }).finally(()=>setLoading(false))
  };





    
    return (
      <div>
        <div className="navbar bg-base-100 shadow-sm">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />{" "}
                </svg>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content  rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                {links}
              </ul>
            </div>
            {/* profile logo is here  */}
            <div className='flex items-center'>
              <img src={img} className="hidden lg:block  h-10 "  alt="" />
              <h2 className='font-bold text-2xl lg:ml-3 text-center '>FinanceFlow</h2>
            </div>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{links}</ul>
          </div>
          {/* profile is here  */}

          <div className="navbar-end">
            <div className="dropdown dropdown-end">
              {/* 🔹 Profile Image Button */}
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="User Profile"
                    referrerPolicy="no-referrer"
                    src={
                      user
                        ? user?.photoURL
                        : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                  />
                </div>
              </div>

              {/*  Dropdown Menu */}
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <div className="bg-gray-200">
                  {/* <p>{user?.email}</p>
                  <p>{user?.displayName}</p> */}
                </div>
                <li>
                  <Link to={"/auth/update"} className=" text-sm">
                    Profile <CgProfile />
                  </Link>
                </li>
                <li>
                  <Link className="text-sm" to="/myTransaction">
                    My Transaction
                    <GiTakeMyMoney />
                  </Link>
                </li>
                <li className="text-sm">
                  <a className="text-sm">
                    Settings <IoSettingsOutline />
                  </a>
                </li>
                {user && (
                  <li>
                    <button
                      onClick={handleLogout}
                      className="text-red-500 text-sm"
                    >
                      Logout <MdLogout />
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Navbar;


  <div className="navbar-end">
    <img className="w-10 h-10 cursor-pointer rounded-full bg-red-500" alt="" />
  </div>;