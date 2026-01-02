import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router";
import {
  Calendar,
  DollarSign,
  User,
  Mail,
  Tag,
  ArrowUpCircle,
  ArrowDownCircle,
  Loader,
} from "lucide-react";
import AuthContext from "../Auth/AuthContext";
import Loading from "./Loading";
import { IoMdArrowBack } from "react-icons/io";

const Details = () => {
  const { loading } = useContext(AuthContext);

  const data = useLoaderData();
  console.log(data)

  if (loading) {
    return <Loading></Loading>;
  }

  const { type, category, amount, description, date, email, name } = data;

  const isIncome = type === "Income";

  return (
    <div className="max-w-3xl mx-auto my-24 p-8 bg-white bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-2xl shadow-lg transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          Transaction Details
        </h2>
        <span
          className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
            isIncome
              ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
              : "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200"
          }`}
        >
          {isIncome ? (
            <>
              <ArrowUpCircle className="w-4 h-4" /> Income
            </>
          ) : (
            <>
              <ArrowDownCircle className="w-4 h-4" /> Expense
            </>
          )}
        </span>
      </div>

      {/* Info Section */}
      <div className="space-y-5">
        <div className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
          <DollarSign className="w-5 h-5 text-green-500" />
          <span className="font-semibold">Amount:</span> {amount}
        </div>

        <div className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
          <Tag className="w-5 h-5 text-purple-500" />
          <span className="font-semibold">Category:</span> {category}
        </div>

        <div className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
          <User className="w-5 h-5 text-blue-500" />
          <span className="font-semibold">Added by:</span> {name}
        </div>

        <div className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
          <Mail className="w-5 h-5 text-pink-500" />
          <span className="font-semibold">Email:</span> {email}
        </div>

        <div className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
          <Calendar className="w-5 h-5 text-orange-500" />
          <span className="font-semibold">Date:</span> {date}
        </div>

        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Button */}
      <div className="mt-8 text-center">
        <Link
          to={"/myTransaction"}
          className="px-6 py-3 bg-amber-400 cursor-pointer text-white rounded-xl shadow-md transition"
        >
          <span className="text-2xl"> ‹</span> Back to My transaction
        </Link>
      </div>
    </div>
  );
};

export default Details;
