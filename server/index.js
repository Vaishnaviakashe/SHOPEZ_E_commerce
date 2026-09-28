require("dotenv").config();

const app = require("./server");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;


// Connect MongoDB first
connectDB();


// Start Express server
app.listen(PORT, () => {
    console.log(
        `🚀 SHOPEZ server running on http://localhost:${PORT}`
    );
});