import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import generateTokenAndSetCookie from '../utils/generateToken.js';

export const signup = async (req, res) => {
    try {
        const { fullname, username, gender, email, birthDate, profilePicture, password, confirmPassword } = req.body;
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
            // confirmPassword: hashedPassword,
            profilePicture: gender === 'male' ? boyProfilePictures : girlProfilePictures
        });
        if (newUser) {
            // Generate JWT token
            generateTokenAndSetCookie(newUser._id, res);
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
        } else {
            res.status(400).json({ error: "Error while creating user." })
        }

    } catch (error) {
        console.error('Error during signup:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        // Check if username and password are provided
        if (!username || !password) {
            return res.status(400).send('Username and password are required');

        }
        // Check if the user exists in the database
        const user = await User.findOne({ username });
        if (!user) {

            return res.status(400).send('Invalid username or password');
        }
        // Compare the provided password with the hashed password stored in the database
        const isPasswordValid = await bcrypt.compare(password, user.password || '');
        if (!isPasswordValid) {
            return res.status(400).send('Invalid username or password');
        }

        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            profilePicture: user.profilePicture,
        });


    } catch (error) {
        console.error('Error during Login:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
export const logout = (req, res) => {
    try{
        res.cookie('jwt', '', {
            maxAge: 0, // Set the cookie to expire immediately
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production'
        });
        res.status(200).json({ message: 'Logged out successfully' });
    }
    catch (error) {
        console.error('Error during Login:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}