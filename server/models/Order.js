const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
        // User who placed the order
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        // Products inside the order
        items: [{
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },

            name: {
                type: String,
                required: true,
            },

            quantity: {
                type: Number,
                required: true,
                min: 1,
            },

            price: {
                type: Number,
                required: true,
            },
        }, ],

        // Delivery address
        shippingAddress: {
            address: {
                type: String,
                required: true,
            },

            city: {
                type: String,
                required: true,
            },

            postalCode: {
                type: String,
                required: true,
            },

            country: {
                type: String,
                required: true,
            },
        },

        // Total amount of the order
        totalPrice: {
            type: Number,
            required: true,
            min: 0,
        },

        // Current order status
        status: {
            type: String,
            enum: [
                "Pending",
                "Processing",
                "Shipped",
                "Delivered",
                "Cancelled",
            ],
            default: "Pending",
        },
    },

    // Automatically creates createdAt and updatedAt
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Order", orderSchema);