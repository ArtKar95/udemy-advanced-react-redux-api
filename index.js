import dotenv from 'dotenv';
const envPath = '.env';
dotenv.config({ path: envPath });
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import route from './route.js';
import mongoose from 'mongoose';
import User from './models/user.js';
import cors from 'cors';
const app = express();

//DB setup
mongoose.connect(process.env.MONGO_API);

//App setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
route(app);
//Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log(`Server listening on port ${port}`);
