const express = require ("express");
const Razorpay = require ("razorpay");
const router = express.Router();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});
router.post("/create-order",async (req,res)=>{
    try {
        console.log("Amount received from frontend:",req.body.amount);
        const amount =Math.round(Number(req.body.amount)*100);
        const options = {
            amount :amount,
            currency :"INR",
            receipt:"receipt_"+Date.now(),
        };
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        res.status(500).json({error:error.message}); 
    }
});

module.exports =router;