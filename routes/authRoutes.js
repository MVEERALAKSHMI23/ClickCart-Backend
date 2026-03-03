const express = require ("express");
const User =require("../models/User.js");

const router =express.Router();

router.post("/register",async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        const existingUser=await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({
                message:"User already exists"
            });
        }

        const newUser= new User ({
            name,
            email,
            password,
            isAdmin: true
        });
        await newUser.save();
        res.status(201).json({message:"User registed successfully",
        user:{
            name:newUser.name,
            email:newUser.email,
            isAdmin:newUser.isAdmin
        }
        });
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});


router.post("/login",async(req,res)=>{
    try {
        console.log("req.body:",req.body);
        const {email,password}=req.body;
        console.log("Email received:",email)
        const user=await User.findOne({email});
        console.log("User found:",user);
        if(!user){
            return res.status(400).json({message:"User not found"});
        }
        if(user.password !==password){
            return
            res.status(400).json({message : "Invalid password"});
        }
        res.status(200).json({
            message:"Login Successful",
            name : user.name,
            email:user.email,
            isAdmin:user.isAdmin
        });
    } catch (error) {
        res.status(500).json({message:error.message});
        
    }
});

module.exports= router;