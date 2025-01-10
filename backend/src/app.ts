import dotEnv from "dotenv";
dotEnv.config({
  path: "./.env",
});
import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// import errorHandler from "./middlewares/errorHandler.middleware";

import { CORS_ORIGIN } from "./constants/getEnv";
const app: Express = express();

//middlewares
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

//cors middleware
const corsOptions: cors.CorsOptions = {
  origin: CORS_ORIGIN,
  credentials: true,
};

app.use(cors(corsOptions));

//cookie middleware
app.use(cookieParser());

// app.use(errorHandler);

// import routes and declaration

//  use routes

export { app };