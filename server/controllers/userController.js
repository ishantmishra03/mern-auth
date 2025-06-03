import userModel from "../models/user.models.js";

export const getUserData = async (req,res) => {
    try {
        const userId = req.userId;

        const user = await userModel.findById(userId);
        if(!user) return res.json({success: false, message : "Something went wrong"});

        return res.json({success: true, userData: {
            name : user.name,
            isVerified: user.isAccountVerified,
        }})
    } catch (error) {
        return res.json({success: false, message : error.message});
    }
}