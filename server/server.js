const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

const {
    notFound,
    errorHandler,
} = require("./middleware/errorMiddleware");

const app = express();


// ==========================
// MIDDLEWARE
// ==========================

app.use(cors());

app.use(express.json());


// ==========================
// HEALTH CHECK
// ==========================

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to SHOPEZ API 🚀",
        status: "Server is running",
    });
});


// ==========================
// API ROUTES
// ==========================

app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);

app.use("/api/orders", orderRoutes);


// ==========================
// ERROR HANDLING
// ==========================

app.use(notFound);

app.use(errorHandler);


module.exports = app;