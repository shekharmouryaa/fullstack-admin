import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import OverallStats from "../models/OverallStats.js";


export const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const addUser = async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getDashboardStats = async (req, res) => {

    try {
        // hardcoded values
        const currentDay = "2021-11-15";
        const currentMonth = "November";
        const currentYear = 2021;
        /* Recent Transactions */
        const transactions = await Transaction.find().limit(50).sort({ createdon: -1 });

        const overallStat = await OverallStats.find({ year: currentYear });

        const { totalCustomers, yearlyTotalSoldUnits, yearlySalesTotal, monthlyData, salesByCategory } = overallStat[0]

        const thisMonthStats = overallStat[0].monthlyData.find(({ month }) => {
            return month === currentMonth;
        });
        const todayStats = overallStat[0].dailyData.find(({ date }) => {
            return date === currentDay;
        })
        res.status(201).json({
            transactions,
            totalCustomers,
            yearlyTotalSoldUnits,
            yearlySalesTotal,
            monthlyData,
            salesByCategory,
            thisMonthStats,
            todayStats
        });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
