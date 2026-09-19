import dns from 'dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);
// import packages
import express from 'express';
import dotenv from 'dotenv';
// import files
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import connectToMongoDB from './db/connectToMongoDB.js';
// validate environment variables
const app = express();
// load environment variables
dotenv.config();
const PORT = process.env.PORT || 5000;
// middlewares
app.use(express.json()); // to parse incoming JSON requests from the client(request body)

app.get('/', (req, res) => {
    res.send('Hello World! from Obvious Chat Server');
});

app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoutes);

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on port : ${PORT}`);
})
