        const express = require('express');
        const { z } = require('zod');
        const User = require('../models/user');
        const jwt = require('jsonwebtoken');
        const bcrypt = require('bcrypt');  
        const jwtPassword = "pass123";
        
        const userSchema = z.object({
            name: z.string().min(1),
            email: z.string().email(),
            password: z.string().min(6),
            admin: z.boolean()
        });
        
        const loginSchema = z.object({
            email: z.string().email(),
            password: z.string().min(6),
        });
        
        const passwordCheck = async (inputPassword, storedHashedPassword) => {
            const isPasswordValid = await bcrypt.compare(inputPassword, storedHashedPassword);
            return isPasswordValid;
        };
        
        const registerController = async (req, res) => {
            try {
                const result = userSchema.safeParse(req.body);
                if (!result.success) {
                    return res.status(400).json({
                        msg: "Error occurred",
                        errors: result.error.flatten().fieldErrors,
                    });
                }
        
                const { name, email, password, admin } = result.data;
                let existingUser = await User.findOne({ email });
                if (existingUser) {
                    return res.status(402).json({
                        msg: "User already exists"
                    });
                }
        
                const hashedPassword = await bcrypt.hash(password, 10);
                const user = new User({ ...result.data, password: hashedPassword });
                await user.save();
        
                res.status(201).json({
                    msg: "User created successfully"
                });
        
            } catch (error) {
                res.status(401).json({
                    msg: "Some error occurred: " + error,
                });
            }
        };
        
        // Login controller
        const loginController = async (req, res) => {
            const result = loginSchema.safeParse(req.body);
            if (!result.success) {
                return res.status(400).json({
                    msg: "Invalid input",
                    errors: result.error.flatten().fieldErrors,
                });
            }
        
            const user = await User.findOne({ email: result.data.email });
            if (!user) {
                return res.status(403).json({
                    msg: "User doesn't exist"
                });
            }
        
            const isPasswordValid = await passwordCheck(result.data.password, user.password);
            if (!isPasswordValid) {
                return res.status(403).json({
                    msg: "Incorrect password"
                });
            }
        
            try {
                const token = jwt.sign({ email: user.email }, jwtPassword);
                return res.json({ token });
            } catch (error) {
                res.status(403).json({
                    msg: "Invalid token"
                });
            }
        };
        
        module.exports = {
            registerController,
            loginController,
            
            jwtPassword
        };
         
