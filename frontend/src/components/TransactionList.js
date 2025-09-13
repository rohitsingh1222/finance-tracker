import React from "react";
import TransactionForm from "./TransactionForm";
import { deleteTx } from "../api";
import { toast } from "react-toastify";

const TransactionList = ({ txs, reload }) => {

  const handleDelete = async (id) => {
    try {
      await deleteTx(id);
      toast.success("Transaction deleted!");
      reload();
    } catch (err) {
      toast.error("Failed to delete transaction.");
    }
  };

  return (
    <div className="transactions">
      <TransactionForm onSuccess={reload} />

      <ul>
        {txs.map((tx) => (
          <li key={tx._id} className={tx.amount > 0 ? "income" : "expense"}>
            <div>
              <strong>{tx.title}</strong> - ${tx.amount.toFixed(2)}
            </div>
            <div className="tx-actions">
              <span>{tx.category}</span>
              <span>{new Date(tx.date).toLocaleDateString()}</span>
              <button onClick={() => handleDelete(tx._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
