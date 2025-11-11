import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../Auth/AuthContext";
import useAxiosSecure from "./Hooks/useAxiosSecure";
import { toast } from "react-toastify";


import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import Loading from "../Components/Loading";

const Reports = () => {
  const { user } = useContext(AuthContext);
  const [myTransaction, setMyTransaction] = useState([]);
  const [loading, setLoading] = useState(true); 
  const useSecure = useAxiosSecure();

  // Dynamic route title
  useEffect(() => {
    document.title = "Reports";
  }, []);

  // optimized fetch with loading
  useEffect(() => {
    if (!user?.email) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await useSecure.get(`/add?email=${user?.email}`);
        setMyTransaction(res.data);
      } catch (error) {
        toast.error("Failed to fetch transactions");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.email]);

  // ✅ show loading until data loads
  if (loading) {
    return <Loading />;
  }

  // Separate income and expense
  const expense = myTransaction.filter(
    (tx) => tx.type.toLowerCase() === "expense"
  );
  const income = myTransaction.filter(
    (tx) => tx.type.toLowerCase() === "income"
  );

  //  expenses by category
  const expenseByCategory = {};
  expense.forEach((tx) => {
    if (expenseByCategory[tx.category]) {
      expenseByCategory[tx.category] += parseFloat(tx.amount);
    } else {
      expenseByCategory[tx.category] = parseFloat(tx.amount);
    }
  });
  const data_1 = Object.keys(expenseByCategory).map((category) => ({
    name: category,
    value: expenseByCategory[category],
  }));

  // income by category
  const incomeByCategory = {};
  income.forEach((tx) => {
    if (incomeByCategory[tx.category]) {
      incomeByCategory[tx.category] += parseFloat(tx.amount);
    } else {
      incomeByCategory[tx.category] = parseFloat(tx.amount);
    }
  });
  const data_2 = Object.keys(incomeByCategory).map((category) => ({
    name: category,
    value: incomeByCategory[category],
  }));

  // Chart colors
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#AA336A",
    "#33AA99",
    "#FF6666",
  ];

  // Find monthly expense or income
  const monthlyTotals = {};
  myTransaction.forEach((tx) => {
    const month = tx.date.slice(0, 7); 
    if (!monthlyTotals[month]) {
      monthlyTotals[month] = { expense: 0, income: 0 };
    }
    if (tx.type.toLowerCase() === "expense") {
      monthlyTotals[month].expense += parseFloat(tx.amount);
    } else if (tx.type.toLowerCase() === "income") {
      monthlyTotals[month].income += parseFloat(tx.amount);
    }
  });

  // Convert to array for Bar Chart
  const barChartData = Object.keys(monthlyTotals).map((month) => ({
    month,
    expense: monthlyTotals[month].expense,
    income: monthlyTotals[month].income,
  }));

  return (
    <>
      {/* Pie Charts for Expense & Income  */}
      <div className="p-6 bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-bold mb-6 text-center">
          📈 Financial Report Overview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Expense Pie Chart */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-4 text-red-600 text-center">
              💸 Expenses by Category
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data_1}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {data_1.map((entry, index) => (
                    <Cell
                      key={`cell-exp-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Income Pie Chart */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-4 text-green-600 text-center">
              💰 Income by Category
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data_2}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#82ca9d"
                  label
                >
                  {data_2.map((entry, index) => (
                    <Cell
                      key={`cell-inc-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ===== Bar Chart for Monthly Summary ===== */}
      <h1 className="font-bold text-3xl text-center my-10">
        📊 Monthly Income vs Expense Summary
      </h1>

      <div className="p-6 bg-white rounded-2xl shadow-md mt-6 mx-4 md:mx-16">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={barChartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 12 }} />
            <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#f9fafb",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Bar
              dataKey="income"
              fill="#16a34a"
              name="Income"
              radius={[8, 8, 0, 0]}
              barSize={40}
            />
            <Bar
              dataKey="expense"
              fill="#dc2626"
              name="Expense"
              radius={[8, 8, 0, 0]}
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default Reports;
