import User from "../models/User.js";

export const getAdmins = async (req, res) => {
    try {
        const { page , pageSize,  sort } = req.query;
        const generateSort = () => {
            const sortParsed = JSON.parse(sort);
            const formatted = {
                [sortParsed.field]: sortParsed.sort === "asc" ? 1 : -1
            }
            return formatted;
        }
        const sortFormatted = Boolean(sort) ? generateSort() : {};
        
        const admins = await User.find({role: "admin"})
        .sort(sortFormatted).skip(page * pageSize).limit(pageSize)
        .select("-password");
        const total = await User.countDocuments({role: "admin"})

        const adminsData = {
            admins,
            total
        }
        res.status(200).json(adminsData);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}
