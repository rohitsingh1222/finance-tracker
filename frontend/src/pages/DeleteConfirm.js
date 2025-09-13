import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTx, deleteTx } from '../api';

export default function DeleteConfirm() {
  const { id } = useParams(); // Make sure your route is like /delete/:id
  const navigate = useNavigate();
  const [tx, setTx] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getTx(id)
      .then(data => {
        setTx(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load transaction:", err);
        alert("Transaction not found");
        navigate('/');
      });
  }, [id, navigate]);

  async function handleDelete() {
    try {
      await deleteTx(id);
      alert("Transaction deleted successfully!");
      navigate('/');
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete transaction");
    }
  }

  if (loading) return <div>Loading...</div>;
  if (!tx) return <div>Transaction not found</div>;

  return (
    <div>
      <h2>Delete Transaction</h2>
      <p>Are you sure you want to delete <strong>{tx.title}</strong> ({tx.amount})?</p>
      <button onClick={handleDelete}>Yes, delete</button>
      <button onClick={() => navigate(-1)}>Cancel</button>
    </div>
  );
}
