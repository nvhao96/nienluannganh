import db from '../models/index';
import bcrypt from 'bcryptjs';
import { Op } from 'sequelize';

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const checkEmailExist = async (userEmail) => {
    let user = await db.User.findOne(
        {
            where: { email: userEmail }
        });
    if (user) {
        return true;
    }
    return false;
}

const checkPhoneExist = async (userPhone) => {
    let user = await db.User.findOne(
        {
            where: { email: userPhone }
        });
    if (user) {
        return true;
    }
    return false;
}


const registerNewUser = async (rawUserData) => {
    try {
        // check email/phoneNumber are exist
        let isEmailExist = await checkEmailExist(rawUserData.email);
        if (isEmailExist === true) {
            return {
                EM: 'The email is already existed!',
                EC: 1
            }
        }
        let isPhoneExist = await checkPhoneExist(rawUserData.phone);
        if (isPhoneExist === true) {
            return {
                EM: 'The phone number is already existed!',
                EC: 1
            }
        }

        // hash user password
        let hashPassword = hashUserPassword(rawUserData.password);

        // create new user
        await db.User.create({
            email: rawUserData.email,
            username: rawUserData.username,
            password: hashPassword,
            phone: rawUserData.phone
        })
        return {
            EM: 'A user is create successfully!',
            EC: 0
        }

    } catch (e) {
        console.log(e)
        return {
            EM: 'Somthing wrongs is service...',
            EC: -2

        }
    }
}

const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword);
}

const handleUserLogin = async (rawData) => {
    try {
        let user = await db.User.findOne({
            where: {
                [Op.or]: [
                    { email: rawData.valueLogin },
                    { phone: rawData.valueLogin }

                ]
            }
        })

        if (user) {
            let isCorrectPassword = checkPassword(rawData.password, user.password);
            if (isCorrectPassword === true) {
                return {
                    EM: 'ok!',
                    EC: 0,
                    DT: ''
                }
            }

            console.log(">>> Not found user with email/phone: ", rawData.valueLogin, "password: ", rawData.password)
            return {
                EM: 'Your email/phone number or password is incorrect!',
                EC: 1,
                DT: ''
            }
        }


    } catch (error) {
        console.log(error);
        return {
            EM: 'Something wrongs in service...',
            EC: -1,
            DT: ''
        }
    }
}

module.exports = {
    registerNewUser,
    handleUserLogin
}