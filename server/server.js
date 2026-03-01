require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require('passport');
require('./configs/passport');

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // Your Next.js URL
  credentials: true 
}));

app.use(cookieParser());
const orderRoutes = require("./routes/orderRoutes");
app.use("/api/orders", orderRoutes);

const notificationRoutes = require("./routes/notificationRoutes");
app.use("/api", notificationRoutes)

const authRoutes=require("./routes/authRoutes")
app.use("/api/auth",authRoutes)

const connectDb = require("./configs/db");
connectDb();

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});