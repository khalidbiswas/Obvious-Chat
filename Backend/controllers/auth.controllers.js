
export const signup = (req, res) => {
    try {
        const { fullname, username, gender, email, password } = req.body;
        res.send('Signup route');
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}
export const login = (req, res) => {
    res.send('Login route');
}
export const logout = (req, res) => {
    res.send('Logout route');
}