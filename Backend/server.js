import dns from 'dns';
dns.setServers(['8.8.8.8', '1.1.1.1'] );

import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import connectToMongoDB from './db/connectToMongoDB.js';
dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
    res.send('Hello World! from Obvious Chat Server');
});

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on port : ${PORT}`);
})