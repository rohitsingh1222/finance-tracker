import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTx, createTx, updateTx } from "../api";
import { toast } from "react-toastify";

export default function AddEdit() {
  const { id } = useParams(); // id from route
  const navigate = useNavigate();

  const [tx, setTx] = useState({
    title: "",
    amount: "",
    date: "",
    category: ""
  });

  const [loading, setLoading] = useState(false);

  // Load transaction if editing
  useEffect(() => {
    if (id) {
      setLoading(true);
      getTx(id)
        .then(data => setTx({
          title: data.title,
          amount: data.amount,
          date: data.date.slice(0, 10), // for input type=date
          category: data.category || ""
        }))
        .catch(() => toast.error("Failed to load transaction"))
        .finally(() => setLoading(false));
    }
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (id) {
        await updateTx(id, tx);
        toast.success("Transaction updated successfully!");
      } else {
        await createTx(tx);
        toast.success("Transaction added successfully!");
      }
      navigate("/");
    } catch (err) {
      console.error("Error saving transaction:", err);
      toast.error("Failed to save transaction");
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setTx(prev => ({ ...prev, [name]: value }));
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="add-edit-container" style={styles.container}>
      <h2 style={styles.heading}>{id ? "Edit Transaction" : "Add Transaction"}</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.field}>
          <label style={styles.label}>Title:</label>
          <input
            name="title"
            value={tx.title}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Amount:</label>
          <input
            type="number"
            name="amount"
            value={tx.amount}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Date:</label>
          <input
            type="date"
            name="date"
            value={tx.date}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Category:</label>
          <input
            name="category"
            value={tx.category}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>
          {id ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
}

// Inline styles for simplicity; you can move them to a CSS file
const styles = {
  container: {
    maxWidth: "500px",
    margin: "2rem auto",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    backgroundColor: "#f9f9f9",
  },
  heading: {
    textAlign: "center",
    marginBottom: "1.5rem",
    color: "#333"
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  field: {
    marginBottom: "1rem"
  },
  label: {
    marginBottom: "0.5rem",
    display: "block",
    fontWeight: "bold",
    color: "#555"
  },
  input: {
    width: "100%",
    padding: "0.5rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1rem"
  },
  button: {
    padding: "0.75rem",
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s"
  }
};
