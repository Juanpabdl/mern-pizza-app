import type { Request, Response } from "express";
import User from "../models/user.js";

// apy/my/user
const createUser = async (req: Request, res: Response) => {
    try {
        const { auth0Id, email, password, username, city, country, addressLine, phoneNumber } = req.body;

        //1. Check if user with the given auth0Id already exists
        const existingUser = await User.findOne({ auth0Id });
        if (existingUser) {
            return  res.status(200).send({ message: "User already exists"});
        }   
        //2. Create user if it does not exist
        const newUser = new User({
            auth0Id,
            email,
            password,
            username,
            city,
            country,
            addressLine,
            phoneNumber
        });
        await newUser.save();
        //3. Respond with success message
        res.status(201).json({ message: "User created successfully", user: newUser });
    }  catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
}

export default {
    createUser
};