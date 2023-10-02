import mongoose from 'mongoose';
import Employees from '../models/Employees.js';

export const getEmployees = async (req, res) => {
    try {
        const allemployees = await Employees.find({});
        res.status(200).json({employees : allemployees , status : true , total : allemployees.length});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employees.findById(id);
        if (!employee) {
            return res.status(200).json({ message: "User not found" , status : true});
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(404).json({ message: error.message , status : false});
    }
}

export const addEmployee = async (req, res) => {
    const user = new Employees(req.body);
    console.log(req.body)
    console.log(user)
    try {
        await user.save();
        res.status(201).json({ data: user,  status: true });
    } catch (error) {
        res.status(409).json({ message: error.message , status : false });
    }
}

export const deleteEmployee = async (req, res) => {
        const { id } = req.params;
    try {
          if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }
        // const user = await User.findByIdAndRemove(id); // return user
        const user = await Employees.deleteOne( { _id: id }); // doesn't return user
       
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully", user : user });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }
        const user = await Employees.updateOne({ _id: id }, { $set: req.body });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User updated successfully", user: user });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
