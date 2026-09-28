const express = require("express");

const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
} = require("../controllers/productController");

const {
    protect,
    admin,
} = require("../middleware/authMiddleware");

const router = express.Router();


// Public
router.get("/", getProducts);

router.get("/:id", getProduct);


// Admin only
router.post("/", protect, admin, createProduct);

router.put("/:id", protect, admin, updateProduct);

router.delete("/:id", protect, admin, deleteProduct);


module.exports = router;