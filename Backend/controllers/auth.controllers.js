import bcrypt from 'bcrypt';
import User from '../models/user.model.js';

export const signup = async (req, res) => {
    try {
        const { fullname, username, gender, email, birthDate, profilePicture,password, confirmPassword } = req.body;
        if (!fullname || !username || !gender || !email || !birthDate || !password || !confirmPassword) {
            return res.status(400).send('All fields are required');
        }
        if (password !== confirmPassword) {
            return res.status(400).send('Passwords do not match');
        }
        if (password.length < 6) {
            return res.status(400).send('Password must be at least 6 characters long');
        }
        const user = await User.findOne({ $or: [{ email }, { username }] });
        if (user) {
            return res.status(400).send('User already exists');
        }
        // Hash the password
        const salt = await bcrypt.genSalt(10);
         const hashedPassword = await bcrypt.hash(password, salt);
        // profile picture
        const boyProfilePictures = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePictures = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        const newUser = new User({
            fullname,
            username,
            gender,
            email,  
            birthDate,
            password: hashedPassword,
            profilePicture:gender === 'male' ? boyProfilePictures : girlProfilePictures
        });
       await newUser.save();
       res.status(201).json({
       _id: newUser._id,
       fullname: newUser.fullname,
       username: newUser.username,
       gender: newUser.gender,
       email: newUser.email,
       birthDate: newUser.birthDate,
       profilePicture: newUser.profilePicture,
        });

    } catch (error) {
        console.error('Error during signup:', error.message);
        res.status(500).json({error :'Internal Server Error'});
    }
}
export const login = (req, res) => {
    res.send('Login route');
}
export const logout = (req, res) => {
    res.send('Logout route');
}