const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const { sendOrderMail } = require("../utils/sendMail");

// ================= PLACE ORDER =================
router.post("/place", async (req, res) => {
  const { userId, userEmail, userName, items, total } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "User not logged in" });
  }

  const order = await Order.create({
    userId,
    items,
    total,
    status: "Confirmed"
  });

  await sendOrderMail({
    email: userEmail,
    userName,
    items,
    total
  });

  res.json(order);
});

// ================= USER ORDERS =================
router.get("/user/:id", async (req, res) => {
  const orders = await Order.find({ userId: req.params.id });
  res.json(orders);
});

// ================= ADMIN – ALL ORDERS =================
router.get("/", async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

// ================= UPDATE ORDER STATUS (ADMIN) =================
router.put("/status/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Failed to update order status" });
  }
});

module.exports = router;
