import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    city: String,
    occupation: String,
    phoneNumber: String,
},
{timestamps: true}
)

const Employees = mongoose.model("employees", employeeSchema);

export default Employees