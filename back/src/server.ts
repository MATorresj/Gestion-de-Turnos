import express from "express";
import morgan from "morgan";
import router from "./routes/indexRouter";
import cors from "cors";
import path from "path";

const server = express();

server.use(morgan("dev"))
server.use(express.json());
server.use(cors())

server.use('/uploads', express.static(path.join(__dirname, '../uploads'))); 

server.use(router);

export default server;
