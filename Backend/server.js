
import dns from 'dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);

import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';

import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';
import { app, server } from './socket/socket.js';
import connectToMongoDB from './db/connectToMongoDB.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();
const frontendPath = path.join(__dirname, 'Frontend', 'dist');

// Middlewares
app.use(express.json());
app.use(cookieParser());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

// Unknown API endpoints should return JSON
app.use('/api', (req, res) => {
    res.status(404).json({ message: 'API route not found' });
});

// Serve Vite frontend
app.use(express.static(frontendPath));

app.get('/{*path}', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

// Start server after database connection
const startServer = async () => {
    try {
        await connectToMongoDB();

        server.listen(PORT, '0.0.0.0', () => {
            console.log(`Server is running on port: ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
