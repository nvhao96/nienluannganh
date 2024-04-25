import express from "express";
import apiController from "../controller/apiController";
import userController from "../controller/userController";
import productController from "../controller/productController";
import { checkUserJWT, checkAdminJWT } from '../middlewave/JWTAction';
import customerController from "../controller/customerController";
import upload from '../middlewave/uploadFile';
const router = express.Router();


const initApiRoutes = (app) => {
    // api routes

    // Customer routes
    router.get("/account", checkUserJWT, userController.getUserAccount);
    router.post("/register", apiController.handleRegister);
    router.post("/login", apiController.handleLogin);
    router.post("/logout", apiController.handleLogout);
    router.get("/product/:name/:id", customerController.getProduct);
    router.get("/listProduct/:categoryName", customerController.getProductCategory);
    router.get("/products/read", productController.readProductHomePage);
    router.post("/products/addCart", checkUserJWT, productController.addCart);
    router.post("/products/orderDetail", checkUserJWT, productController.addOrderDetail);
    router.post("/checkOrder", productController.checkOrder);
    // router.get("/shoppingCart", apiController.getOrderDetail);
    router.get("/myOrder", checkUserJWT, userController.getMyOrder);
    router.post("/myOrder/:id", checkUserJWT, userController.getMyOrderDetail);

    // Admin users routes
    // router.all('*', checkAdminJWT);
    router.post("/admin", apiController.handleLoginAdmin);
    router.get("/admin/users/read", checkAdminJWT, userController.read);
    router.post("/admin/users/create", checkAdminJWT, userController.create);
    router.put("/admin/users/update", checkAdminJWT, userController.update);
    router.delete("/admin/users/delete", checkAdminJWT, userController.deleteUser);

    // Admin products routes
    router.get("/admin/products/read", checkAdminJWT, productController.readProducts);
    router.post("/admin/products/create", checkAdminJWT, upload.single('img'), productController.createProducts);
    router.put("/admin/products/update", checkAdminJWT, upload.single('img'), productController.updateProducts);
    router.delete("/admin/products/delete", checkAdminJWT, productController.deleteProducts);

    // admin list products routes
    router.get("/admin/products/listProduct", productController.getListProduct);
    router.post("/admin/products/listProduct/create", checkAdminJWT, productController.createListProduct);

    router.get("/admin/order/read", checkAdminJWT, userController.readOrder);
    router.post("/admin/order/detail", checkAdminJWT, userController.readOrderDetail);


    return app.use("/api/", router);
};

export default initApiRoutes;