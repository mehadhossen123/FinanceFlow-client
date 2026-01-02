import React from "react";
import { motion } from "framer-motion";
import { FaBriefcase, FaChartLine, FaFileInvoice, FaGamepad, FaGift, FaLaptopCode, FaMoneyBillWave, FaShoppingCart, FaTag, FaUtensils } from "react-icons/fa";

const FinancialSections = () => {
  const sectionVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section className="w-full my-12 space-y-12">
      {/* Budgeting Tips */}
      <motion.div
        className="w-full  rounded-2xl shadow-lg p-8"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h1 className="text-primary text-2xl   md:text-4xl text-center">
          Organize Every Transaction
        </h1>
        <p className="text-center mt-5 text-base-400">
          Stay on top of your money by tracking every single transaction with
          our smart categorization system
        </p>
        <section className="grid grid-cols-2 md:grid-cols-5 gap-y-16 gap-x-10 my-16 justify-items-center items-center">
          {/* ১. Food */}
          <div className="flex flex-col items-center justify-center space-y-2 w-full">
            <FaUtensils className="text-orange-500 text-6xl md:text-7xl" />
            <p className="text-center text-secondary font-medium">Food</p>
          </div>

          {/* ২. Salary */}
          <div className="flex flex-col items-center justify-center space-y-2 w-full">
            <FaMoneyBillWave className="text-green-500 text-6xl md:text-7xl" />
            <p className="text-center text-secondary font-medium">Salary</p>
          </div>

          {/* ৩. Freelancing */}
          <div className="flex flex-col items-center justify-center space-y-2 w-full">
            <FaLaptopCode className="text-blue-500 text-6xl md:text-7xl" />
            <p className="text-center text-secondary font-medium">
              Freelancing
            </p>
          </div>

          {/* ৪. Shopping */}
          <div className="flex flex-col items-center justify-center space-y-2 w-full">
            <FaShoppingCart className="text-pink-500 text-6xl md:text-7xl" />
            <p className="text-center text-secondary font-medium">Shopping</p>
          </div>

          {/* ৫. Entertainment */}
          <div className="flex flex-col items-center justify-center space-y-2 w-full">
            <FaGamepad className="text-purple-500 text-6xl md:text-7xl" />
            <p className="text-center text-secondary font-medium">
              Entertainment
            </p>
          </div>

          {/* ৬. Bill */}
          <div className="flex flex-col items-center justify-center space-y-2 w-full">
            <FaFileInvoice className="text-yellow-500 text-6xl md:text-7xl" />
            <p className="text-center text-secondary font-medium">Bill</p>
          </div>

          {/* ৭. Investment */}
          <div className="flex flex-col items-center justify-center space-y-2 w-full">
            <FaChartLine className="text-blue-600 text-6xl md:text-7xl" />
            <p className="text-center text-secondary font-medium">Investment</p>
          </div>

          {/* ৮. Sell Item */}
          <div className="flex flex-col items-center justify-center space-y-2 w-full">
            <FaTag className="text-indigo-500 text-6xl md:text-7xl" />
            <p className="text-center text-secondary font-medium">Sell Item</p>
          </div>

          {/* ৯. Gift */}
          <div className="flex flex-col items-center justify-center space-y-2 w-full">
            <FaGift className="text-rose-500 text-6xl md:text-7xl" />
            <p className="text-center text-secondary font-medium">Gift</p>
          </div>

          {/* ১০. Business */}
          <div className="flex flex-col items-center justify-center space-y-2 w-full">
            <FaBriefcase className="text-slate-600 text-6xl md:text-7xl" />
            <p className="text-center text-secondary font-medium">Business</p>
          </div>
        </section>
      </motion.div>
    </section>
  );
};

export default FinancialSections;
