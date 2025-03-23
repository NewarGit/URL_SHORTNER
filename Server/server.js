import express, { json } from 'express';
import { config } from 'dotenv';
import connectDatabase from './models/connect.js';
import router from './router/router.js';
import cors from 'cors';

config();

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}))

server.options('*', cors({
    origin: 'http://localhost:5173',
    credentials: true
}));


connectDatabase();  

server.use(router)

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
