import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';


const HomeLayout = () => {
    return (
      <>
        <div className="flex mx-auto min-h-screen flex-col w-11/12">
          <nav>
            <Navbar></Navbar>
          </nav>
          <main className="flex-1">
            <Outlet></Outlet>
          </main>
        </div>
        <footer className="">
          <Footer></Footer>
        </footer>
      </>
    );
};

export default HomeLayout;