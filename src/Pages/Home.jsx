import React from 'react';
import Banner from '../Components/Banner';
import Marquee from "react-fast-marquee";

const Home = () => {
    return (
      <div>
        <div className="bg-blue-900 my-5">
          <Marquee gradient={false} speed={50}>
            <p className="mr-10 text-white  text-3xl font-bold">
              Manage your money smartly and secure your future! 💰
            </p>
            <p className="mr-10 text-white  text-3xl font-bold">
              Manage your money smartly and secure your future! 💰
            </p>
            <p className="mr-10 text-white  text-3xl font-bold">
              Manage your money smartly and secure your future! 💰
            </p>
          </Marquee>
        </div>
        <div className="text-center my-8">
          <h1 className="text-3xl md:text-6xl font-bold text-blue-800">
            “Your Financial Journey Starts Here” 
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mt-2">
            Manage your money, track expenses, and achieve your financial goals
          </p>
        </div>

        <div className="my-5">
          <Banner></Banner>
        </div>
      </div>
    );
};

export default Home;