import React, { useContext, useEffect, useState } from "react";
import Banner from "../Components/Banner";
import Marquee from "react-fast-marquee";
import useIncomeDetails from "./Hooks/useIncomeDetails";
import FinancialSections from "../Components/FinancialSections";
import bg from "../assets/bg2.svg";
import AuthContext from "../Auth/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);

  //implementation dynamic route s
  useEffect(() => {
    document.title = "AddTransaction";
  }, []);

  const { totalIncome, totalExpense } = useIncomeDetails();
  const [message, setMessage] = useState("");
  // console.log("total expense =",totalExpense,"total income=",totalIncome);
  const presentBalance = totalIncome - totalExpense;

  useEffect(() => {
    if (totalIncome === 0 && totalExpense === 0) {
      setMessage(
        "No transactions yet — start adding your income and expenses!"
      );
    } else if (presentBalance === 0) {
      setMessage(
        "😐 You broke even this month — try saving a bit more next time."
      );
    } else if (presentBalance > 0) {
      setMessage("🎉 Great job! You're saving a healthy amount this year.");
    } else if (presentBalance < 0) {
      setMessage(
        " ❗❗ You're spending more than you earn — try cutting down some costs."
      );
    }
  }, [totalIncome, totalExpense, presentBalance]);
  const name = user?.displayName.slice(0, 5);

  // console.log(capitalName);

  return (
    <>
      <section style={{ backgroundImage: `url(${bg})` }} className="mt-24">
        <div className="">
          <p
            className={`text-center font-bold ${
              totalExpense > totalIncome ? "text-red-600" : "text-white"
            }`}
          >
            <div className="flex justify-center">
              {" "}
              <h1
                className="text-3xl font-black 
              "
              >
                {name}
              </h1>
              <h1
                className="text-3xl my-10  text-secondary 
              font-bold"
              >
                {message}
              </h1>
            </div>
          </p>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 place-items-center-safe mx-5 my-6 pb-5">
            <div className="bg-white flex flex-col items-center justify-center rounded-xl shadow-2xl p-4 w-64 h-24">
              <h3 className="text-center text-green-500 font-semibold text-lg">
                Total Income
              </h3>
              <p className="text-center font-bold text-black text-2xl">
                +৳ {totalIncome}
              </p>
            </div>

            <div className="bg-white flex flex-col items-center justify-center rounded-xl shadow-2xl p-4 w-64 h-24">
              <h3 className="text-center text-green-500 font-semibold text-lg">
                Balance
              </h3>
              <p
                className={`text-center font-bold text-2xl ${
                  totalExpense > totalIncome ? "text-red-600" : "text-green-600"
                }`}
              >
                {totalExpense > totalIncome ? "-৳" : "+৳"}{" "}
                {Math.abs(presentBalance)}
              </p>
            </div>

            <div className="bg-white flex flex-col items-center justify-center rounded-xl shadow-2xl p-4 w-64 h-24">
              <h3 className="text-center text-green-500 font-semibold text-lg">
                Total Expense
              </h3>
              <p className="text-center font-bold text-black text-2xl">
                -৳ {totalExpense}
              </p>
            </div>
          </section>
        </div>
      </section>

      <div>
        <div className=" mt-15 relative">
          <Marquee gradient={false} speed={50}>
            <p className="mr-10  text-3xl font-bold">
              Manage your money smartly and secure your future! 💰
            </p>
            <p className="mr-10  text-3xl font-bold">
              Manage your money smartly and secure your future! 💰
            </p>
            <p className="mr-10   text-3xl font-bold">
              Manage your money smartly and secure your future! 💰
            </p>
          </Marquee>
        </div>
        <div className="text-center my-8">
          <h1 className="text-3xl md:text-5xl font-bold text-primary">
            Your Financial Journey Starts Here
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mt-2">
            Manage your money, track expenses, and achieve your financial goals
          </p>
        </div>

        <div className="my-5">
          <Banner></Banner>
        </div>
      </div>

      {/* static planning  */}
      <FinancialSections></FinancialSections>
    </>
  );
};

export default Home;
