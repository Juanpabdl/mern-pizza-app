import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    auth0Id: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String},
    city: { type: String },
    country: { type: String },
    addressLine: { type: String },
    phoneNumber: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);
export default User;