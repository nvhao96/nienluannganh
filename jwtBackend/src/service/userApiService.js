import db from "../models/index";
import bcrypt from 'bcryptjs';

const getAllUser = async () => {
    try {
        let users = await db.User.findAll({
            attributes: ["id", "email", "username", "address", "phone"],
            include: { model: db.Group, attributes: ["name"], },
        });
        if (users) {
            return {
                EM: 'success',
                EC: 0,
                DT: users,
            };
        }
        else {
            return {
                EM: 'success',
                EC: 0,
                DT: [],
            }
        }
    } catch (error) {
        console.log(error);
        return {
            EM: 'error getting users',
            EC: 1,
            DT: '',
        };
    }
}

const getUsersWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;
        const { count, rows } = await db.User.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: ["id", "email", "username", "address", "phone"],
            include: { model: db.Group, attributes: ["name", "id"], },
        });

        let totalPages = Math.ceil(count / limit);

        let data = {
            totalRows: count,
            totalPages: totalPages,
            users: rows,
        }

        return {
            EM: 'fetch  OKE',
            EC: 0,
            DT: data,
        };
    } catch (error) {
        console.log(error);
        return {
            EM: 'error getting users',
            EC: 1,
            DT: '',
        };
    }
}

const salt = bcrypt.genSaltSync(10);

const funHashPassWord = (userPass) => {
    let hashPassword = bcrypt.hashSync(userPass, salt);
    return hashPassword;
};

const checkUsername = async (username) => {
    let user = await db.User.findOne({
        where: { username: username }
    });

    if (user) {
        return true;
    }
    return false;
};

const checkEmail = async (email) => {
    let user = await db.User.findOne({
        where: { email: email }
    });

    if (user) {
        return true;
    }
    return false;
};

const checkPhone = async (phone) => {
    let user = await db.User.findOne({
        where: { phone: phone }
    });

    if (user) {
        return true;
    }
    return false;
};

const createUser = async (data) => {
    try {
        let isUsernameExist = await checkUsername(data.username);
        if (isUsernameExist === true) {
            return {
                EM: 'Tên tài khoản đã tồn tại',
                EC: 1,
                DT: 'username',
            }
        }

        let isPhoneExits = await checkPhone(data.phone);

        if (isPhoneExits === true) {
            return {
                EM: 'Số điện thoại đã được sử dụng',
                EC: 1,
                DT: 'phone'
            }
        }

        let isEmailExist = await checkEmail(data.email);
        if (isEmailExist === true) {
            return {
                EM: 'Địa chỉ email đã tồn tại',
                EC: 1,
                DT: 'email',
            }
        }
        let regx = /\S+@\S+\.\S+/;
        if (!regx.test(data.email)) {
            return {
                EM: 'Địa chỉ email không hợp lệ',
                EC: 1,
                DT: 'email',
            }
        }
        let hashPassword = funHashPassWord(data.password)
        await db.User.create({
            email: data.email,
            username: data.username,
            password: hashPassword,
            address: data.address,
            phone: data.phone,
            groupId: data.groupId,
        });
        return {
            EM: 'create successful',
            EC: 0,
            DT: [],
        };
    } catch (error) {
        console.log(error);
        return {
            EM: 'error getting create user',
            EC: 1,
            DT: '',
        };
    }
};

const updateUser = async (id, data) => {
    try {
        let user = await db.User.findOne({
            where: { id: id }
        });
        if (user) {
            let isUsernameExist = await checkUsername(data.username);
            if (isUsernameExist === true) {
                return {
                    EM: 'Tên tài khoản đã tồn tại',
                    EC: 1,
                    DT: 'username',
                }
            }
            await user.update({
                username: data.username,
                address: data.address,

            });
            return {
                EM: 'update user successfully',
                EC: 0,
                DT: '',
            };
        } else {
            return {
                EM: 'user not found',
                EC: 2,
                DT: '',
            };
        }
    } catch (error) {
        console.log(error);
        return {
            EM: 'error update user',
            EC: 1,
            DT: '',
        };
    }
};

const deleteUser = async (id) => {
    try {
        let user = await db.User.findOne({
            where: { id: id }
        });

        if (user) {
            await user.destroy();
            return {
                EM: 'Delete user successfully',
                EC: 0,
                DT: [],
            };
        } else {
            return {
                EM: 'User not exist',
                EC: 2,
                DT: [],
            };
        }
    } catch (error) {
        console.log(error);
        return {
            EM: 'error from service',
            EC: 1,
            DT: [],
        };
    }
};

const getOrderWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;
        const { count, rows } = await db.Order.findAndCountAll({
            offset: offset,
            limit: limit,
        });

        let totalPages = Math.ceil(count / limit);

        let data = {
            totalRows: count,
            totalPages: totalPages,
            users: rows,
        }

        return {
            EM: 'fetch  OKE',
            EC: 0,
            DT: data,
        };
    } catch (error) {
        console.log(error);
        return {
            EM: 'error getting order with pagination',
            EC: 1,
            DT: '',
        };
    }
}

const getAllOrder = async () => {
    try {
        let order = await db.Order.findAll({});
        if (order) {
            return {
                EM: 'success',
                EC: 0,
                DT: order,
            };
        }
        else {
            return {
                EM: 'order not found',
                EC: 0,
                DT: [],
            }
        }
    } catch (error) {
        console.log(error);
        return {
            EM: 'error getting order',
            EC: 1,
            DT: '',
        };
    }
};

const getAllOrderDetail = async (idOrder) => {
    try {
        let data = await db.Order_Detail.findAll({
            where: { orderId: idOrder },
            include: { model: db.Product },
        })
        if (data) {
            return {
                EM: 'success',
                EC: 0,
                DT: data,
            };
        } else {
            return {
                EM: 'order detail not found',
                EC: 0,
                DT: [],
            }
        }
    } catch (error) {
        console.log(error);
        return {
            EM: 'error getting order',
            EC: 1,
            DT: '',
        };
    }
};

const getAllMyOrder = async (user) => {
    try {
        let data = await db.Order.findAll({
            where: { phone: user.phone },
        })
        if (data) {
            return {
                EM: 'success',
                EC: 0,
                DT: data,
            };
        } else {
            return {
                EM: 'order not found',
                EC: 0,
                DT: [],
            }
        }
    } catch (error) {
        console.log(error);
        return {
            EM: 'error getting order',
            EC: 1,
            DT: '',
        };
    }
};

const getMyOrderWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;
        const { count, rows } = await db.Order.findAndCountAll({
            offset: offset,
            limit: limit,
        });

        let totalPages = Math.ceil(count / limit);

        let data = {
            totalRows: count,
            totalPages: totalPages,
            users: rows,
        }

        return {
            EM: 'fetch  OKE',
            EC: 0,
            DT: data,
        };
    } catch (error) {
        console.log(error);
        return {
            EM: 'error getting order with pagination',
            EC: 1,
            DT: '',
        };
    }
};

const getMyOrderDetail = async (idOrder) => {
    try {
        let data = await db.Order_Detail.findAll({
            where: { orderId: idOrder },
            include: { model: db.Product },
        })
        if (data) {
            return {
                EM: 'success',
                EC: 0,
                DT: data,
            };
        } else {
            return {
                EM: 'order detail not found',
                EC: 0,
                DT: [],
            }
        }
    } catch (error) {
        console.log(error);
        return {
            EM: 'error getting order',
            EC: 1,
            DT: '',
        };
    }
};

module.exports = {
    getAllUser,
    createUser,
    updateUser,
    deleteUser,
    getUsersWithPagination,
    getOrderWithPagination,
    getAllOrder,
    getAllOrderDetail,
    getAllMyOrder,
    getMyOrderWithPagination,
    getMyOrderDetail,
}