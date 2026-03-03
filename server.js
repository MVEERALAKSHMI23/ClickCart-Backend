const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const paymentRoutes = require("./routes/paymentRoutes.js")
const authRoutes = require("./routes/authRoutes.js")
connectDB();

const app = express();
 app.use(cors());
 app.use(express.json());
 app.use("/api/products",productRoutes);
 app.use("/api/payment",paymentRoutes);
 app.use("/api/auth",authRoutes);

 app.get("/",(req,res) => {
    res.send("Server is running");
 });

 app.post("/login",(req,res)=>{
  const {email,password}=req.body;
  console.log(email,password);
  res.json({message:"Login success"})
 })

 const PORT = process.env.PORT || 5000;

 app.listen(PORT , ()=> {
   console.log(`Server running on port ${PORT}`);
 });