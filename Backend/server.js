import dns from 'dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);
// import packages
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// import files
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';
 import { app, server } from './socket/socket.js';
import connectToMongoDB from './db/connectToMongoDB.js';

// // validate environment variables
// const app = express();

//      load environment variables
dotenv.config();
const PORT = process.env.PORT || 5000;

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

server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on port : ${PORT}`);
})
