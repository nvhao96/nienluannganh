import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web.js";
import initApiRoutes from "./routes/api.js";
import configCors from "./config/cors.js";
import bodyParser from "body-parser";
require('dotenv').config();
import connection from './config/connectDB.js';

const app = express();
const PORT = process.env.PORT || 8080;

// config cors
configCors(app);

// config view engine
configViewEngine(app);

// config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// test connection
connection();

initWebRoutes(app);
initApiRoutes(app);


app.listen(PORT, () => {
    console.log("Server is running on http " + PORT);
})