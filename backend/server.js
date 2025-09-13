require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// CORS
app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://rohitsingh1222.github.io/finance-tracker/"  // <-- add your live frontend URL
  ],
  credentials: true
}));


app.use(express.json());

// Test route
app.get("/", (req, res) => res.send("✅ API working"));

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Transaction Model
const TransactionSchema = new mongoose.Schema({
  title: String,
  amount: Number,
  date: Date,
  category: String
});

const Transaction = mongoose.model("Transaction", TransactionSchema);

// Get all transactions
app.get("/api/transactions", async (req, res) => {
  const txs = await Transaction.find().sort({ date: -1 });
  res.json(txs);
});

// Create transaction
app.post("/api/transactions", async (req, res) => {
  const { title, amount, date, category } = req.body;
  const tx = await Transaction.create({ title, amount, date: new Date(date), category });
  res.status(201).json(tx);
});

// Delete transaction
app.delete("/api/transactions/:id", async (req, res) => {
  try {
    const tx = await Transaction.findById(req.params.id);
    if (!tx) return res.status(404).json({ error: "Transaction not found" });

    await tx.deleteOne();
    res.json({ message: "Transaction deleted" });
  } catch (err) {
    console.error("Failed to delete transaction:", err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
