import OverallStats from "../models/OverallStats.js";

export const getOverallStats = async (req, res) => {
    try {
        const overallStats = await OverallStats.find();
        res.status(200).json(overallStats[0]);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}
