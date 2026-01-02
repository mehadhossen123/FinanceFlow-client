
import React from 'react';
import { Link } from 'react-router';
import img from "../assets/refund.png";

const Logo = () => {
    return (
      <Link>
        <div className="flex items-center">
          <img src={img} className=" hidden lg:block  h-15 " alt="" />
          <h2 className="font-bold text-2xl lg:ml-3 md:ml-3 sm:ml-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent text-center ">
            FinanceFlow
          </h2>
        </div>
      </Link>
    );
};

export default Logo;