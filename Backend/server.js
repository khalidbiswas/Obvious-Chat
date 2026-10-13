import dns from 'dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);
// import packages
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';

// import files
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';
import { app, server } from './socket/socket.js';
import connectToMongoDB from './db/connectToMongoDB.js';



//      load environment variables
dotenv.config();
const PORT = process.env.PORT || 5000;

// resolve the current directory
const __dirname = path.resolve();

//       middlewares
app.use(express.json()); // to parse incoming JSON requests from the client(request body)
app.use(cookieParser()); // to parse cookies from the request headers
app.get('/', (req, res) => {
    res.send('Hello World! from Obvious Chat Server');
});


//          routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

app.use(express.static(path.join(__dirname, 'Frontend/build'))); // Serve static files from the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'Frontend/build', 'index.html')); // Serve the React app for any other route
});


server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on port : ${PORT}`);
})
