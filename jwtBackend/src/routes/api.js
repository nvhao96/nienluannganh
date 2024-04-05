import express from "express";
import apiController from "../controller/apiController.js";
const router = express.Router();

const initApiRoutes = (app) => {
    // path, handler
    // rest api 
    // Get -R, POST -C, PUT -U, DELETE -D

    router.get("/test-api", apiController.testApi)
    router.post("/register", apiController.handleRegister);
    router.post("/login", apiController.handleLogin);

    return app.use("/api/v1", router);
}

export default initApiRoutes;