import express from "express";
import configViewEngine from "./config/viewEngine";
import initApiRoutes from "./routes/api";
import bodyParser from "body-parser";
import configCors from "./config/cors";
import cookieParser from "cookie-parser";

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// config cors
configCors(app);

//config view engine
configViewEngine(app);

//config body parser
// app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



//config cookie-parser
app.use(express.static('src/assets'));
app.use(cookieParser());


//init web routes
initApiRoutes(app);

//test connection DB
// connection();


app.use((req, res) => {
    return res.send("404 not found");
})

app.listen(PORT, () => {
    console.log("Backend is running on port " + PORT);
});