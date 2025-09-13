import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4001/api", // Full backend URL
});

// Get all transactions
export const getTxs = () => API.get("/transactions").then(res => res.data);

// Get single transaction
export const getTx = (id) => API.get(`/transactions/${id}`).then(res => res.data);

// Create a transaction
export const createTx = (tx) => API.post("/transactions", tx).then(res => res.data);

// Update a transaction
export const updateTx = (id, tx) => API.put(`/transactions/${id}`, tx).then(res => res.data);

// Delete a transaction
export const deleteTx = (id) => API.delete(`/transactions/${id}`).then(res => res.data);

