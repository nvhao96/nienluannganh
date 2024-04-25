import loginRegister from '../service/loginRegisterService';

const handleRegister = async (req, res) => {
    try {
        // username, password, phone, email, address
        if (!req.body.username || !req.body.password || !req.body.email || !req.body.phone || !req.body.address) {
            return res.status(200).json({
                EM: 'Missing required parameters',
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


        let data = await loginRegister.registerNewUser(req.body);

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC
        });

    } catch (error) {
        return res.status(500).json({
            EM: 'error from server handleRegister',
            EC: '-1',
            DT: '',
        })
    }
};

const handleLogin = async (req, res) => {
    try {
        let data = await loginRegister.handleUserLogin(req.body);
        if (data && data.DT && data.DT.access_token) {
            res.cookie("jwt", data.DT.access_token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
        }
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (error) {
        return res.status(500).json({
            EM: 'error from server handleLogin',
            EC: '-1',
            DT: '',
        });
    }
};

const handleLoginAdmin = async (req, res) => {
    try {
        let data = await loginRegister.handleAdminLogin(req.body);
        // set cookies
        if (data && data.DT && data.DT.access_token) {
            res.cookie("jwt", data.DT.access_token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
        }

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });

    } catch (error) {
        return res.status(500).json({
            EM: 'error from server handleLogin',
            EC: '-1',
            DT: '',
        });
    }
};

const handleLogout = (req, res) => {
    try {
        res.clearCookie("jwt");
        return res.status(200).json({
            EM: 'logout successfully',
            EC: 0,
            DT: '',
        });

    } catch (error) {
        return res.status(500).json({
            EM: 'error from server handleLogout',
            EC: '-1',
            DT: '',
        });
    }
};

const getOrderDetail = (req, res) => {

};



module.exports = {
    handleRegister,
    handleLogin,
    handleLogout,
    getOrderDetail,

    handleLoginAdmin,
}