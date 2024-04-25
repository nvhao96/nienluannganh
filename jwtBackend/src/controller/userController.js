import userApiService from '../service/userApiService';

const read = async (req, res) => {
    try {
        if (req.query.page && req.query.limit) {
            let page = req.query.page;
            let limit = req.query.limit;
            let data = await userApiService.getUsersWithPagination(+page, +limit);
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT,
            });
        } else {
            let data = await userApiService.getAllUser();
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server read',
            EC: '-1',
        });
    }
};

const create = async (req, res) => {
    try {
        if (!req.body.username || !req.body.password || !req.body.email || !req.body.phone || !req.body.address) {
            return res.status(200).json({
                EM: 'Missing required parameters!',
                EC: '1',
                DT: '',
            });
        }

        if (req.body.password && req.body.password.length < 8) {
            return res.status(200).json({
                EM: 'Mật khẩu phải dài hơn 8 ký tự',
                EC: '1',
                DT: 'isValidPassword',
            });
        }

        if (req.body.phone && req.body.phone.length != 10) {
            return res.status(200).json({
                EM: 'Số điện thoại không hợp lệ',
                EC: '1',
                DT: 'isValidPhone',
            });
        }

        let data = await userApiService.createUser(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server create',
            EC: '-1',
        });
    }
};

const update = async (req, res) => {
    try {
        let data = await userApiService.updateUser(req.body.id, req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server create',
            EC: '-1',
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        let data = await userApiService.deleteUser(req.body.id);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server read',
            EC: '-1',
        });
    }
};

const getUserAccount = async (req, res) => {
    return res.status(200).json({
        EM: 'success',
        EC: 0,
        DT: {
            access_token: req.token,
            data: req.user.groupWithRoles,
            username: req.user.username,
            email: req.user.email,
            address: req.user.address,
            phone: req.user.phone,
        },
    });

};

const readOrder = async (req, res) => {
    try {
        if (req.query.page && req.query.limit) {
            let page = req.query.page;
            let limit = req.query.limit;
            let data = await userApiService.getOrderWithPagination(+page, +limit);
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT,
            });
        } else {
            let data = await userApiService.getAllOrder();
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server read',
            EC: '-1',
        });
    }
};

const readOrderDetail = async (req, res) => {
    try {
        let data = await userApiService.getAllOrderDetail(req.body.data.id);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server Detail Order',
            EC: '-1',
        });
    }
};

const getMyOrder = async (req, res) => {
    try {
        // if (req.query.page && req.query.limit) {
        //     let page = req.query.page;
        //     let limit = req.query.limit;
        //     let data = await userApiService.getMyOrderWithPagination(+page, +limit);
        //     return res.status(200).json({
        //         EM: data.EM,
        //         EC: data.EC,
        //         DT: data.DT,
        //     });
        // } else {
        let data = await userApiService.getAllMyOrder(req.user);
        console.log(data);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
        // }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server Detail Order',
            EC: '-1',
        });
    }
};

const getMyOrderDetail = async (req, res) => {
    try {
        let data = await userApiService.getMyOrderDetail(req.params.id);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server my Detail Order',
            EC: '-1',
        });
    }
};


module.exports = {
    read,
    create,
    update,
    deleteUser,
    getUserAccount,
    readOrder,
    readOrderDetail,
    getMyOrder,
    getMyOrderDetail,
}