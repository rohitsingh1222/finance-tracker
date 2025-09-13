import React, { useEffect, useState } from "react";
import TransactionList from "../components/TransactionList";
import { getTxs } from "../api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css"; // For custom styles

export default function Home() {
  const [txs, setTxs] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTransactions = async () => {
    try {
      const data = await getTxs();
      setTxs(data);
    } catch (err) {
      toast.error("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const summary = () => {
    const balance = txs.reduce((s, t) => s + t.amount, 0);
    const income = txs.filter((t) => t.amount > 0).reduce((s, t) => s + t.amount, 0);
    const expense = txs.filter((t) => t.amount < 0).reduce((s, t) => s + t.amount, 0);
    return { balance, income, expense };
  };

  const { balance, income, expense } = summary();

  return (
    <div className="container">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <h1 className="title">💰 Finance Tracker</h1>

      <section className="summary">
        <div className="card balance">
          <h3>Balance</h3>
          <p>${balance.toFixed(2)}</p>
        </div>
        <div className="card income">
          <h3>Income</h3>
          <p>+${income.toFixed(2)}</p>
        </div>
        <div className="card expense">
          <h3>Expense</h3>
          <p>-${Math.abs(expense).toFixed(2)}</p>
        </div>
      </section>

      {loading ? <p>Loading transactions...</p> : 
        <TransactionList txs={txs} reload={loadTransactions} />
      }
    </div>
  );
}
