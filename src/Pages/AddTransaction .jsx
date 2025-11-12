import React, { useContext, useEffect } from "react";
import AuthContext from "../Auth/AuthContext";
import Swal from "sweetalert2";
import useAxios from "./Hooks/useAxios";
import { motion } from "framer-motion";

const AddTransaction = () => {
  const { user } = useContext(AuthContext);
  const useSecure = useAxios();

  useEffect(() => {
    document.title = "AddTransaction";
  }, []);

  const handleAddTransaction = async (e) => {
    e.preventDefault();

    const type = e.target.type.value;
    const category = e.target.category.value;
    const amount = e.target.amount.value;
    const description = e.target.description.value;
    const date = e.target.date.value;
    const email = user?.email;
    const name = user?.displayName;

    const newTransaction = {
      type,
      category,
      amount,
      description,
      date,
      email,
      name,
    };

    try {
      const res = await useSecure.post("/add", newTransaction);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Transaction Added Successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      e.target.reset();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Failed to add transaction",
        text: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full p-5 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-5">
          Add Transaction
        </h2>

        <form
          onSubmit={handleAddTransaction}
          className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg space-y-5 border border-gray-200 dark:border-gray-700 transition"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-2">
            Add New Transaction
          </h2>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-4">
            Record your income or expenses easily
          </p>

          {/* Type */}
          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
              Type
            </label>
            <select
              name="type"
              className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition"
              required
            >
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
              Category
            </label>
            <select
              name="category"
              className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition"
              required
            >
              <option value="">Select Category</option>
              <option value="Salary">Salary</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Shopping">Shopping</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Bills">Bills</option>
              <option value="Investment">Investment</option>
              <option value="Gift">Gift</option>
              <option value="Freelance">Freelance</option>
              <option value="Business">Business</option>
              <option value="Selling Item">Selling Items</option>
              <option value="Interest">Interest</option>
            </select>
          </div>

          {/* Amount */}
          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
              Amount
            </label>
            <motion.input
              whileHover={{ scale: 1.05 }}
              whileFocus={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
              type="number"
              name="amount"
              placeholder="Enter amount"
              className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <motion.textarea
              whileHover={{ scale: 1.05 }}
              whileFocus={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
              name="description"
              placeholder="Enter description"
              className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition resize-none h-20"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
              Date
            </label>
            <motion.input
              whileHover={{ scale: 1.05 }}
              whileFocus={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
              type="date"
              name="date"
              className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition"
              required
            />
          </div>

          {/* User Email */}
          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
              User Email
            </label>
            <input
              defaultValue={user?.email}
              type="email"
              readOnly
              className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-gray-300 cursor-not-allowed"
            />
          </div>

          {/* User Name */}
          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
              User Name
            </label>
            <input
              defaultValue={user?.displayName}
              type="text"
              readOnly
              className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-gray-300 cursor-not-allowed"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2.5 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition shadow-md"
          >
            + Add Transaction
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
