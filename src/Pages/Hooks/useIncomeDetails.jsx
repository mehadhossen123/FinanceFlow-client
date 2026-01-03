import { useContext, useEffect, useState } from "react";
import AuthContext from "../../Auth/AuthContext";

import { toast } from "react-toastify";

import React from 'react';
import useAxios from "./useAxios";

const useIncomeDetails = () => {


     const { user } = useContext(AuthContext);
     const [myTransaction, setMyTransaction] = useState([]);
     const useSecure = useAxios();

     // Fetch my transactions from the server
     useEffect(() => {
       if (!user?.email) return;

       const fetchData = async () => {
         try {
           const res = await useSecure.get(`/add?email=${user?.email}`);
           setMyTransaction(res.data.result);
         } catch (error) {
           toast.error("Failed to fetch transactions");
         }
       };

       fetchData();
     }, [user?.email]);

    // find total income and total expense form the database to show present details 
     const expense = myTransaction.filter(
       (tx) => tx.type.toLowerCase() === "expense"
     );
     const income = myTransaction.filter(
       (tx) => tx.type.toLowerCase() === "income"
     );
     const totalIncome=income.reduce((sum,tx)=>sum+parseFloat(tx.amount),0)
     const totalExpense=expense.reduce((sum,tx)=>sum+parseFloat(tx.amount),0)
     



    return {totalExpense,totalIncome}
        
};

export default useIncomeDetails;