import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import http from 'http';
import DBconnect from './src/DBconnection/db';
import routes from './src/routes/index';
import { socketConnect } from './src/utils/socket';
require('dotenv').config();

const app = express();
const server = http.createServer(app);

app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL ?? 'http://localhost:3000',
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('trust proxy', 1);

DBconnect();

app.use('/api/v1', routes);

socketConnect(server);

server.listen(process.env.PORT, () => {
  console.log(`Server started on Port ${process.env.PORT}`);
});
