import React, { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../Auth/AuthContext";
import { toast } from "react-toastify";
import Loading from "../Components/Loading";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useAxios from "./Hooks/useAxios";
import bg from "../assets/bg2.svg";

const MyTransaction = () => {
  const { user } = useContext(AuthContext);
  const [myTransaction, setMyTransaction] = useState([]); 
  const [transaction, setTransaction] = useState({}); 
  const [localLoading, setLocalLoading] = useState(true);
 
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 8;

  const modalsRef = useRef();
  const useSecure = useAxios();
  const [search,setSearch]=useState("")
  console.log(search)


  useEffect(() => {
    if (!user?.email) return;

    const fetchData = async () => {
      try {
        if(search==="") setLocalLoading(true);
       
        const skip = limit * currentPage;
        const res = await useSecure.get(
          `/add?email=${user?.email}&limit=${limit}&skip=${skip}&search=${search}`
        );

        
        const data = Array.isArray(res?.data?.result) ? res.data.result : [];
        setMyTransaction(data);

        const totalCount = res?.data?.total || 0;
        // setTotal(totalCount);
        setTotalPage(Math.ceil(totalCount / limit));
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch transactions");
        setMyTransaction([]);
      } finally {
        setLocalLoading(false);
      }
    };

    fetchData();
  }, [user?.email, limit, currentPage,search]);

  if (localLoading) return <Loading />;

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
           
            setMyTransaction((prev) =>
              Array.isArray(prev) ? prev.filter((item) => item._id !== id) : []
            );

            Swal.fire("Deleted!", "Transaction deleted.", "success");
          }
        } catch (e) {
          Swal.fire("Error", "Something went wrong!", "error");
        }
      }
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updateData = {
      type: e.target.type.value,
      category: e.target.category.value,
      amount: e.target.amount.value,
      description: e.target.description.value,
      date: e.target.date.value,
    };

    try {
      const res = await useSecure.patch(
        `/add/update/${transaction._id}?email=${user?.email}`,
        updateData
      );
      if (res.data?.modifiedCount > 0) {
        setMyTransaction((prev) =>
          prev.map((tx) =>
            tx._id === transaction._id ? { ...tx, ...updateData } : tx
          )
        );
        Swal.fire("Updated!", "Success", "success");
        modalsRef.current.close();
      }
    } catch (e) {
      Swal.fire("Error", "Update failed!", "error");
    }
  };

  const openModals = (tax) => {
    setTransaction(tax);
    modalsRef.current.showModal();
  };

  return (
    <div
      style={{ backgroundImage: `url(${bg})` }}
      className="min-h-screen px-4 py-10"
    >
      <div className="mt-20  ">
        <h1 className="text-center text-secondary  font-bold text-2xl md:text-3xl my-5">
          All Transactions
        </h1>
        <div className="mt-5 flex items-center justify-center">
          <input
          onChange={(e)=>{
            setSearch(e.target.value)
            setCurrentPage(0)
          
          }}
            type="text"
            className=" bg-gray-400 rounded-l-sm my-5 placeholder:relative placeholder:left-3 w-[800px] py-3 border-gray-200  "
            placeholder="Search by category"
          />
          <button type="submit" className="py-3  px-2 bg-primary rounded-r-sm cursor-pointer text-white font-bold">Search</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.isArray(myTransaction) && myTransaction.length === 0 ? (
          <p className="text-white col-span-full text-center">
            No transactions found.
          </p>
        ) : (
          myTransaction?.map((tx) => (
            <div
              key={tx._id}
              className="bg-white/90 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-white/20 hover:scale-105 transition-all"
            >
              <div className="mb-2 flex justify-between">
                <span
                  className={`text-sm font-bold ${
                    tx.type === "Income" ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {tx.type}
                </span>
                <span className="text-gray-400 text-xs">{tx.date}</span>
              </div>
              <h3 className="text-gray-800 font-semibold text-lg">
                {tx.category}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2">
                {tx.description || "No description"}
              </p>
              <p
                className={`text-xl font-bold mt-2 ${
                  tx.type === "Income" ? "text-green-600" : "text-red-600"
                }`}
              >
                {tx.type === "Income" ? "+" : "-"}${tx.amount}
              </p>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => openModals(tx)}
                  className="flex-1 bg-indigo-600 text-white py-1 rounded-lg text-xs"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeleteTransaction(tx._id)}
                  className="flex-1 bg-red-600 text-white py-1 rounded-lg text-xs"
                >
                  Delete
                </button>
                <Link
                  to={`/add/${tx._id}`}
                  className="flex-1 bg-gray-500 text-white py-1 rounded-lg text-xs text-center"
                >
                  Details
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination UI */}
      <div className="flex justify-center my-10 gap-2">
        {currentPage > 0 && (
          <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="btn btn-sm"
          >
            Back
          </button>
        )}
        {[...Array(totalPage)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`btn btn-sm ${
              currentPage === i ? "bg-primary text-white" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}
        {currentPage < totalPage - 1 && (
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="btn btn-sm"
          >
            Next
          </button>
        )}
      </div>

      {/* Modal */}
      <dialog ref={modalsRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form onSubmit={handleUpdate} className="space-y-3">
            <h3 className="font-bold text-lg">Update Transaction</h3>
            <select
              name="type"
              defaultValue={transaction?.type}
              className="select select-bordered w-full"
            >
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
            <input
              name="category"
              defaultValue={transaction?.category}
              className="input input-bordered w-full"
              placeholder="Category"
            />
            <input
              name="amount"
              type="number"
              defaultValue={transaction?.amount}
              className="input input-bordered w-full"
              placeholder="Amount"
            />
            <textarea
              name="description"
              defaultValue={transaction?.description}
              className="textarea textarea-bordered w-full"
              placeholder="Description"
            ></textarea>
            <input
              name="date"
              type="date"
              defaultValue={transaction?.date}
              className="input input-bordered w-full"
            />
            <button type="submit" className="btn btn-warning w-full">
              Save Changes
            </button>
          </form>
          <div className="modal-action">
            <button onClick={() => modalsRef.current.close()} className="btn">
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyTransaction;
