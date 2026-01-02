import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { isActive } from '../Utils/utils';
import AuthContext from '../Auth/AuthContext';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import Loading from './Loading';
import { MdLogout } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';

import { RiHome4Line } from "react-icons/ri";
import { GoReport } from "react-icons/go";

import { IoSettingsOutline } from 'react-icons/io5';
import { GiTakeMyMoney } from 'react-icons/gi';
import { IoMdPersonAdd } from 'react-icons/io';
import { CiLogin } from "react-icons/ci";
import { FaRegRegistered } from "react-icons/fa";
import Logo from './Logo';


const Navbar = () => {
  const { user, userSignOut, loading, setLoading } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  //Implementation theme dark or light
  const handleTheme = (checked) => {
    setTheme(checked?"dark":"light")
    // console.log(checked)
  };

  if (loading) {
    return <Loading></Loading>;
  }

  const links = (
    <>
      <li>
        <NavLink to="/" className={isActive}>
          {" "}
          <RiHome4Line /> Home{" "}
        </NavLink>{" "}
      </li>
      <li>
        <NavLink to="/addTransaction" className={isActive}>
          {" "}
          <IoMdPersonAdd /> AddTransaction{" "}
        </NavLink>{" "}
      </li>
      <li>
        <NavLink to="/reports" className={isActive}>
          {" "}
          <GoReport /> Reports
        </NavLink>{" "}
      </li>
      <li>
        <NavLink to="/myTransaction" className={isActive}>
          <GiTakeMyMoney /> My Transaction
        </NavLink>{" "}
      </li>

      {!user && (
        <>
          <li>
            {" "}
            <NavLink to="/auth/login" className={isActive}>
              <CiLogin /> Login{" "}
            </NavLink>{" "}
          </li>

          <li>
            {" "}
            <NavLink to="/auth/register" className={isActive}>
              {" "}
              <FaRegRegistered /> Register{" "}
            </NavLink>
          </li>
        </>
      )}
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
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="fixed w-full top-0 z-50 bg-base-200 max-w-11/12  ">
      <div className="navbar ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
       <Logo></Logo>
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
                  className="mr-10"
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
                  <CgProfile /> Profile
                </Link>
              </li>

              {/* theme implementation here  */}

              <input
                onChange={(e) => handleTheme(e.target.checked)}
                type="checkbox"
                defaultChecked
                className="toggle toggle-xs"
              />

              <li className="text-sm">
                <a className="text-sm">
                  <IoSettingsOutline /> Settings
                </a>
              </li>
              {user && (
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-red-500 text-sm"
                  >
                    <MdLogout /> Logout
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


  