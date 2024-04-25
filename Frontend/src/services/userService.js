import axios from "../setup/axios";

const registerNewuser = (username, password, phone, email, address) => {
    return axios.post('/api/register', {
        username, password, phone, email, address
    });
}

const loginUser = (username, password) => {
    return axios.post('/api/login', {
        username, password
    });
}

const loginUserAdmin = (username, password) => {
    return axios.post('/api/admin', {
        username, password
    });
}

const fetAllUser = (page, limit) => {
    return axios.get(`/api/admin/users/read?page=${page}&limit=${limit}`);
};

const deleteUser = (user) => {
    return axios.delete('/api/admin/users/delete', { data: { id: user.id } });
}

const createUser = (data) => {
    return axios.post('/api/admin/users/create', { ...data });
}

const updateUser = (userData) => {
    return axios.put('/api/admin/users/update', { ...userData });
}

const getUserAccount = () => {
    return axios.get('/api/account');
}

const getCustomerAccount = () => {
    return axios.get('/api/account/customer');
}

const logoutUser = () => {
    return axios.post('/api/logout');
};

const fetAllOrder = (page, limit) => {
    return axios.get(`/api/admin/order/read?page=${page}&limit=${limit}`);
};

const fetAllOrderDetail = (data) => {
    return axios.post(`/api/admin/order/detail`, { data });
};

export {
    registerNewuser,
    loginUser,
    fetAllUser,
    deleteUser,
    createUser,
    updateUser,
    getUserAccount,
    getCustomerAccount,
    logoutUser,
    fetAllOrder,
    fetAllOrderDetail,
    loginUserAdmin,
};