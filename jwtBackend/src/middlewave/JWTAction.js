import jwt from 'jsonwebtoken';
import db from '../models/index';
require("dotenv").config();

// const nonSecurePathsAdmin = ['/admin', '/admin/products/listProduct', '/login', '/register', '/products/read', '/logout', '/shoppingCart', '/products/addCart', '/checkOrder', '/admin/products/listProduct/create'];

const createJWT = (payload) => {
    let key = process.env.JWT_SECRET;
    let token = null;
    try {
        token = jwt.sign(payload, key, { expiresIn: process.env.JWT_EXPIRES_IN });
    } catch (error) {
        console.log(error);
    }
    return token;
};

const veryfyToken = (token) => {
    let key = process.env.JWT_SECRET;
    let decoded = null;
    try {
        decoded = jwt.verify(token, key);
    } catch (error) {
        console.log(error);
    }
    return decoded;
};

const checkUserJWT = (req, res, next) => {
    let cookies = req.cookies;
    if (cookies && cookies.jwt) {
        let token = cookies.jwt;
        let decoded = veryfyToken(token);
        if (decoded) {
            req.user = decoded;
            req.token = token;
            next();
        } else {
            return res.status(401).json({
                EM: 'Bạn chưa đăng nhập!',
                EC: -1,
                DT: '',
            });
        }
    } else {
        return res.status(401).json({
            EM: 'Bạn chưa đăng nhập!',
            EC: -1,
            DT: '',
        });
    }
};

const checkAdminJWT = (req, res, next) => {
    // if (nonSecurePathsAdmin.includes(req.path)) return next();
    let cookies = req.cookies;
    if (cookies && cookies.jwt) {
        let token = cookies.jwt;
        let decoded = veryfyToken(token);
        if (decoded) {
            req.user = decoded;
            req.token = token;
            if (req.user.groupWithRoles.id === 2) {
                next();
            } else {
                return res.status(403).json({
                    EM: 'Bạn không có quyền truy cập',
                    EC: -1,
                    DT: '',
                });
            }
        } else {
            return res.status(401).json({
                EM: 'Bạn chưa đăng nhập!',
                EC: -1,
                DT: '',
            });
        }
    } else {
        return res.status(401).json({
            EM: 'Bạn chưa đăng nhập!',
            EC: -1,
            DT: '',
        });
    }
};

const checkUserPermission = async (req, res, next) => {
    if (req.user) {
        let username = req.user.username
        let roles = req.user.data.Roles;
        let currentUrl = req.path;
        if (!roles && roles.length === 0) {
            return res.status(403).json({
                EM: 'Bạn không có quyền truy cập',
                EC: -1,
                DT: '',
            });
        }

        let canAccess = roles.some(item => item.url === currentUrl);
        if (canAccess === true) {
            next();
        } else {
            return res.status(403).json({
                EM: 'Bạn không có quyền truy cập',
                EC: -1,
                DT: '',
            });
        }
    }
}

module.exports = {
    createJWT,
    veryfyToken,
    checkUserJWT,
    checkUserPermission,
    checkAdminJWT,
} 