import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web.js";
import bodyParser from "body-parser";
require('dotenv').config();
import connection from './config/connectDB.js';
const app = express();
const PORT = process.env.PORT || 8080;

configViewEngine(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// test connection
connection();

initWebRoutes(app);


app.listen(PORT, () => {
    console.log("Server is running on http " + PORT);
})