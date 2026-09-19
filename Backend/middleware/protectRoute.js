import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
const portectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized: No token provided' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded || !decoded.userId) {
            return res.status(401).json({ error: 'Unauthorized: Invalid token' });
        }

        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized: User not found' });
        }
       req.user = user; // Attach user information to the request object
        next(); // Proceed to the next middleware or route handler
    }
    catch (error) {
        console.error('Error during route protection:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


export default portectRoute;