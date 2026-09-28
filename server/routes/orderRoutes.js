const express = require("express");

const {
    createOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus,
} = require("../controllers/orderController");

const {
    protect,
    admin,
} = require("../middleware/authMiddleware");

const router = express.Router();


// Logged-in user
router.post("/", protect, createOrder);

router.get("/my", protect, getMyOrders);


// Admin
router.get("/", protect, admin, getAllOrders);

router.put(
    "/:id/status",
    protect,
    admin,
    updateOrderStatus
);


module.exports = router;