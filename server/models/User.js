import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
        max : 50,
        unique: true
    },
    password: {
        type: String,
        required: false,
    },
    city: String,
    state: String,
    country: String,
    occupation: String,
    phoneNumber: String,
    transactions: Array,
    role:{
        type: String,
        enum: ["user", "admin","superadmin"],
        default: "admin",
    },
},
{timestamps: true}
)

const User = mongoose.model("users", userSchema);

export default User