const express=require("express");
const Transaction = require("../models/Transaction");
const router = express.Router();

// Create Transaction
router.post("/", async (req, res) => {
  try {
    const { title, amount, date, category } = req.body;
    if (!title || amount === undefined || !date) {
      return res.status(400).json({ error: "title, amount and date required" });
    }

    const tx = await Transaction.create({
      title,
      amount,
      date: new Date(date),
      category,
    });

    res.status(201).json(tx);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all transactions
router.get("/", async (req, res) => {
  try {
    const txs = await Transaction.find().sort({ date: -1 });
    res.json(txs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single transaction
router.get("/:id", async (req, res) => {
  try {
    const tx = await Transaction.findById(req.params.id);
    if (!tx) return res.status(404).json({ error: "Transaction not found" });
    res.json(tx);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update transaction
router.put("/:id", async (req, res) => {
  try {
    const tx = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!tx) return res.status(404).json({ error: "Transaction not found" });
    res.json(tx);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete transaction
// DELETE /api/transactions/:id
router.delete("/:id", async (req, res) => {
  try {
    const tx = await Transaction.findById(req.params.id);
    if (!tx) return res.status(404).json({ error: "Transaction not found" });

    await tx.deleteOne();
    res.json({ message: "Transaction deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




module.exports= router;
