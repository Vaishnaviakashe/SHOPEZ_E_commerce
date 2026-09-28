const Order = require("../models/Order");
const Product = require("../models/Product");


// ==========================
// CREATE ORDER
// ==========================

const createOrder = async(req, res) => {
    try {
        const {
            items,
            shippingAddress,
        } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({
                message: "Order must contain products",
            });
        }

        let totalPrice = 0;
        const orderItems = [];

        for (const item of items) {

            const product = await Product.findById(item.product);

            if (!product) {
                return res.status(404).json({
                    message: `Product not found: ${item.product}`,
                });
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({
                    message: `${product.name} does not have enough stock`,
                });
            }

            totalPrice += product.price * item.quantity;

            orderItems.push({
                product: product._id,
                name: product.name,
                price: product.price,
                quantity: item.quantity,
            });

            // Reduce stock
            product.stock -= item.quantity;

            await product.save();
        }

        const order = await Order.create({
            user: req.user._id,
            items: orderItems,
            shippingAddress,
            totalPrice,
        });

        res.status(201).json(order);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


// ==========================
// USER ORDERS
// ==========================

const getMyOrders = async(req, res) => {
    try {
        const orders = await Order.find({
                user: req.user._id,
            })
            .populate("items.product")
            .sort({ createdAt: -1 });

        res.json(orders);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


// ==========================
// ADMIN - ALL ORDERS
// ==========================

const getAllOrders = async(req, res) => {
    try {
        const orders = await Order.find()
            .populate("user", "name email")
            .populate("items.product")
            .sort({ createdAt: -1 });

        res.json(orders);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


// ==========================
// ADMIN - UPDATE STATUS
// ==========================

const updateOrderStatus = async(req, res) => {
    try {
        const { status } = req.body;

        const order = await Order.findByIdAndUpdate(
            req.params.id, { status }, {
                new: true,
                runValidators: true,
            }
        );

        if (!order) {
            return res.status(404).json({
                message: "Order not found",
            });
        }

        res.json(order);

    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};


module.exports = {
    createOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus,
};