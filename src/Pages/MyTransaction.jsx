


import React, { useContext, useEffect, useState } from "react";

import AuthContext from "../Auth/AuthContext";
import { toast } from "react-toastify";
import useAxiosSecure from "./Hooks/useAxiosSecure";
import Loading from "../Components/Loading";

const MyTransaction = () => {
  const { user} = useContext(AuthContext);
  const [myTransaction, setMyTransaction] = useState([]);

  const useSecure=useAxiosSecure()

  // if(loading){
  //   return<Loading></Loading>
  // }

  // Fetch my transactions from the server
  useEffect(() => {
    if (!user?.email) return;

    const fetchData = async () => {
      try {
        const res = await useSecure.get(`/add?email=${user?.email}`);
        setMyTransaction(res.data);
      } catch (error) {
        toast.error("Failed to fetch transactions");
        console.error(error);
      }
    };

    fetchData();
  }, [user?.email]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 px-4 py-10">
      <h2 className="text-3xl font-extrabold text-white mb-8 text-center">
        My Transactions
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {myTransaction.length === 0 && (
          <p className="text-white col-span-full text-center">
            No transactions found.
          </p>
        )}

        {myTransaction.map((tx) => (
          <div
            key={tx._id}
            className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-6 flex flex-col justify-between border border-white/20 hover:scale-105 transform transition-all duration-300"
          >
            {/* Header: Type */}
            <div className="mb-3 flex items-center justify-between">
              <span
                className={`text-sm font-bold ${
                  tx.type === "Income" ? "text-green-700" : "text-red-700"
                }`}
              >
                {tx.type}
              </span>
              <span className="text-gray-400 text-xs">{tx.date}</span>
            </div>

            {/* Body: Category & Description */}
            <div className="mb-4">
              <h3 className="text-gray-800 font-semibold text-lg mb-1">
                {tx.category}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-3">
                {tx.description || "No description"}
              </p>
            </div>

            {/* Amount */}
            <div className="mb-4">
              <p
                className={`text-xl font-bold ${
                  tx.type === "Income" ? "text-green-600" : "text-red-600"
                }`}
              >
                {tx.type === "Income" ? "+" : "-"}${tx.amount}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 mt-auto">
              <button className="flex-1 cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-lg text-sm font-semibold hover:from-indigo-700 hover:to-purple-700 transition shadow-md">
                Update
              </button>
              <button className="flex-1 cursor-pointer bg-gradient-to-r from-red-500 to-red-700 text-white py-2 rounded-lg text-sm font-semibold hover:from-red-600 hover:to-red-800 transition shadow-md">
                Delete
              </button>
              <button className="flex-1 cursor-pointer bg-gradient-to-r from-gray-400 to-gray-600 text-white py-2 rounded-lg text-sm font-semibold hover:from-gray-500 hover:to-gray-700 transition shadow-md">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTransaction;

