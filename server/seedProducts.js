require("dotenv").config();

const mongoose = require("mongoose");
const Product = require("./models/Product");

const products = [{
        name: "Wireless Headphones",
        description: "Premium wireless headphones with immersive sound and noise cancellation.",
        price: 2499,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
        category: "Electronics",
        stock: 25,
        rating: 4.5,
    },
    {
        name: "Smart Watch Pro",
        description: "Track fitness, notifications and everyday activity with a modern smartwatch.",
        price: 3999,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
        category: "Electronics",
        stock: 18,
        rating: 4.6,
    },
    {
        name: "Minimal Sneakers",
        description: "Clean and comfortable sneakers designed for everyday movement.",
        price: 2999,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
        category: "Fashion",
        stock: 30,
        rating: 4.4,
    },
    {
        name: "Classic Backpack",
        description: "A spacious everyday backpack for work, college and travel.",
        price: 1899,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
        category: "Accessories",
        stock: 22,
        rating: 4.3,
    },
    {
        name: "Premium Sunglasses",
        description: "Modern sunglasses with a timeless frame and premium finish.",
        price: 1599,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
        category: "Fashion",
        stock: 15,
        rating: 4.5,
    },
    {
        name: "Mechanical Keyboard",
        description: "Tactile mechanical keyboard built for productivity and gaming.",
        price: 4499,
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
        category: "Electronics",
        stock: 12,
        rating: 4.7,
    },
    {
        name: "Travel Coffee Mug",
        description: "Insulated reusable mug that keeps your coffee hot while you move.",
        price: 899,
        image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38",
        category: "Lifestyle",
        stock: 40,
        rating: 4.2,
    },
    {
        name: "Desk Lamp",
        description: "Minimal LED desk lamp designed for focused work and study.",
        price: 1299,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c",
        category: "Lifestyle",
        stock: 20,
        rating: 4.4,
    },
];

async function seedProducts() {
    try {
        // Connect to our SHOPEZ database
        await mongoose.connect(process.env.MONGO_URI);

        console.log("✅ MongoDB connected");

        // Remove existing products so we don't create duplicates
        await Product.deleteMany({});

        // Insert our sample products
        await Product.insertMany(products);

        console.log(`✅ ${products.length} products added successfully`);

        // Close database connection
        await mongoose.connection.close();

        console.log("🎉 Product seeding completed");
        process.exit(0);

    } catch (error) {
        console.error("❌ Seeding failed:", error);
        process.exit(1);
    }
}

seedProducts();