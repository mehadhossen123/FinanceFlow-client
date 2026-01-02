import React, { useContext, useEffect, useRef, useState } from "react";

import AuthContext from "../Auth/AuthContext";
import { toast } from "react-toastify";

import Loading from "../Components/Loading";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useAxios from "./Hooks/useAxios";
import bg from "../assets/bg2.svg";


const MyTransaction = () => {
  const { user  } = useContext(AuthContext);
  const [myTransaction, setMyTransaction] = useState([]);
  const [transaction, setTransaction] = useState([]);
  const [localLoading ,setLocalLoading]=useState(true)
  // console.log(transaction);

  const modalsRef = useRef();

  const useSecure = useAxios();

  // Fetch my transactions from the server
  useEffect(() => {
  

    if (!user?.email) return;
      setLocalLoading(true)

    const fetchData = async () => {
      try {
        const res = await useSecure.get(`/add?email=${user?.email}`);
        setMyTransaction(res.data);
      } catch (error) {
        toast.error("Failed to fetch transactions");
      }
      finally{
        setLocalLoading(false)
      }
    };
   

    fetchData();
  }, [user?.email]);


  if(localLoading){
    return<Loading></Loading>
  }

  //  Handle delete transaction
  const handleDeleteTransaction = async (id) => {
    if (!user) return;

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await useSecure.delete(
            `/add/delete/${id}?email=${user?.email}`
          );

          if (res.data?.deletedCount > 0) {
            setMyTransaction(myTransaction.filter((item) => item._id !== id));

            Swal.fire({
              title: "Deleted!",
              text: "Your transaction has been deleted.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Delete Failed",
              text: "Transaction not found or already deleted.",
            });
          }
        } catch (e) {
          console.error("Delete error:", e);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong while deleting!",
          });
        }
      }
    });
  };

  //handle update transaction
  const handleUpdate = async (e) => {
    e.preventDefault();
    // console.log("hello i am from a handle delete")
    const type = e.target.type.value;
    const category = e.target.category.value;
    const amount = e.target.amount.value;
    const description = e.target.description.value;
    const date = e.target.date.value;
    // console.log(type, category, amount, description, date);

    const updateData = {
      type,
      category,
      amount,
      description,
      date,
    };

    try {
      const res = await useSecure.patch(
        `/add/update/${transaction._id}?email=${user?.email}`,
        updateData
      );
      if (res.data?.modifiedCount > 0) {
        // const updatedTransactions = myTransaction.map((tx) =>
        //   tx._id === transaction._id ? { ...tx, ...updateData } : tx
        // );
        const updatedTransactions = myTransaction.map((tx) => {
          if (tx._id === transaction._id) {
            const updatedTx = { ...tx, ...updateData };
            return updatedTx;
          } else {
            return tx;
          }
        });
        setMyTransaction(updatedTransactions);
      }
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Transaction updated successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      modalsRef.current.close();
    } catch (e) {
      console.log(e);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while updating!",
      });
    }
  };

  const openModals = (tax) => {
    setTransaction(tax);
    modalsRef.current.showModal();
  };

  return (
    <>
      <div
        style={{ backgroundImage: `url(${bg})` }}
        className="min-h-screen bg-[url'../ass'] px-4 py-10"
      >
        <h2 className="text-3xl font-extrabold  text-white mb-8 text-center">
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
                <button
                  onClick={() => openModals(tx)}
                  className="flex-1 cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-lg text-sm font-semibold hover:from-indigo-700 hover:to-purple-700 transition shadow-md"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeleteTransaction(tx._id)}
                  className="flex-1 cursor-pointer bg-gradient-to-r from-red-500 to-red-700 text-white py-2 rounded-lg text-sm font-semibold hover:from-red-600 hover:to-red-800 transition shadow-md"
                >
                  Delete
                </button>
                <Link
                  to={`/add/${tx._id}`}
                  className="flex-1 cursor-pointer bg-gradient-to-r from-gray-400 to-gray-600 text-white py-2 rounded-lg text-sm font-semibold hover:from-gray-500 hover:to-gray-700 transition text-center shadow-md"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* modal is here  */}
      <dialog
        ref={modalsRef}
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          {/* modal  form  is here  */}
          <form onSubmit={handleUpdate}>
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Type
              </label>
              <select
                defaultValue={transaction.type}
                name="type"
                className="w-11/12 border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition"
                required
              >
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Category
              </label>
              <select
                name="category"
                className="w-11/12 border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition"
                required
                defaultValue={transaction.category}
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
              </select>
            </div>

            {/* Amount */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Amount
              </label>
              <input
                defaultValue={transaction.amount}
                type="number"
                name="amount"
                placeholder="Enter amount"
                className="w-11/12 border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Description
              </label>
              <textarea
                defaultValue={transaction.description}
                name="description"
                placeholder="Enter description"
                className="w-11/12 border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition resize-none h-20"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Date
              </label>
              <input
                defaultValue={transaction.date}
                type="date"
                name="date"
                className="w-11/12 border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition"
                required
              />
            </div>
            <button
              type="submit"
              className="flex text-green-800 justify-center bg-amber-400 rounded-2xl mt-7 py-2 px-6 font-bold hover:bg-amber-200 cursor-pointer "
            >
              Update
            </button>
          </form>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      <div className="flex justify-center my-5 gap-5">
        <button className="btn btn-secondary  ">Back</button>
        {[...Array(8).keys()].map((_, i) => (
          <button className="btn btn-primary ">{i+1}</button>
        ))}
        <button className="btn btn-secondary  ">Next</button>
      </div>
    </>
  );
};

export default MyTransaction;
