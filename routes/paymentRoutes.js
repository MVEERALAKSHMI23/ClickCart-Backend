const express = require ("express");
const router = express.Router();

router.post("/", async (req,res)=>{
    try { 
        const {userId,items,totalAmount,
            paymentMethod } =req.body;

            if(!userId || !items || !totalAmount){
                return res.status(400).json({
                    success:false,
                    message:"Missing required fields",
                });
            }
            const order = {
                orderId: "ORD"+Date.now(),
                userId,
                items,
                totalAmount,
                paymentMethod:paymentMethod || "COD",
                paymentStatus: "Success",
                createAt:new Date(),
            };
            console.log("New Order :",order);
            res.status(200).json({
                success: true,
                message:"Payment successful",order,
            });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success:false,
            message: "Server error",
        });
        
    }
});

module.exports= router;