import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';
import db from '../models/index';



const salt = bcrypt.genSaltSync(10);



const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser = async (email, password, username) => {
    let hashPass = hashUserPassword(password);
    try {
        await db.User.create({
            username: username,
            email: email,
            password: hashPass
        })
    } catch (error) {
        console.log(">>> check error", error)
    }
}

const getUserList = async () => {
    // test relationship
    let newUser = await db.User.findOne({
        where: { id: 2 },
        raw: true
    })
    console.log(">>> check new users:", newUser);



    let users = [];
    users = await db.User.findAll();
    return users;

}

const deleteUser = async (userid) => {
    await db.User.destroy({
        where: { id: userid }
    });

}

const getUserById = async (id) => {
    let user = {};
    user = await db.User.findOne({
        where: { id: id }
    });
    return user.get({ plain: true });
}

const updateUserInfo = async (email, username, id) => {
    await db.User.update(
        { email: email, username: username },
        {
            where: { id: id }
        }
    );
}

module.exports = {
    createNewUser,
    getUserList,
    deleteUser,
    getUserById,
    updateUserInfo
}