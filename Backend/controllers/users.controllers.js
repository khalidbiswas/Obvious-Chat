import Users from '../models/user.model.js';

export const getAllUsers = async (req, res) => {
    try {
        const loggedInUserId = req.user._id; // Get the logged-in user's ID from the request object
        const usersForSidebar = await Users.find({ _id: { $ne: loggedInUserId } }).select('-password'); // Exclude password field and exclude the logged-in user
        res.status(200).json({ users: usersForSidebar });
    } catch (error) {
        console.log('Error during fetching all users:', error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }   
};