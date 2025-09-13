import React, { useState } from "react";
import { createTx } from "../api";
import { toast } from "react-toastify";

export default function TransactionForm({ onSuccess, reload }) { // <-- receive onSuccess and reload as props
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTx({ title, amount: Number(amount), date, category });
      if (onSuccess) onSuccess(); // call parent success callback
      if (reload) reload();       // reload transactions list
      setTitle(""); setAmount(""); setDate(""); setCategory("");
     toast.success("Transaction added successfully!");
  } catch (err) {
    toast.error("Failed to add transaction.");
  }

  };

  return (
   /* TransactionForm.js */
<form className="tx-form" onSubmit={handleSubmit}>
  <input type="text" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} />
  <input type="number" placeholder="Amount" value={amount} onChange={(e)=>setAmount(e.target.value)} />
  <input type="text" placeholder="Category" value={category} onChange={(e)=>setCategory(e.target.value)} />
  <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} />
  <button type="submit">Add Transaction</button>
</form>

  );
}
