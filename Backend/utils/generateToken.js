import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
    //1. Generate JWT token
    const token = jwt.sign({ userId }, // Payload: connects to the userId in the database
        process.env.JWT_SECRET,
        { expiresIn: '15d' } // Token expiration time
    );
    // 2. Attach token to an HTTP-Only Cookie for security
    res.cookie('jwt', token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
        httpOnly: true, // Cookie is accessible only by the web server, prevent XSS cross-site scripting attacks
        sameSite: 'strict', // Cookie will only be sent in a first-party context (not sent along with requests initiated by third party websites) CSRF cross-site request forgery attacks
        secure: process.env.NODE_ENV !== 'development', // Cookie will only be sent over HTTPS in production
    })
}

export default generateTokenAndSetCookie;