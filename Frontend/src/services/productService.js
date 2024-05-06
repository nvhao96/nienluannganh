import axios from "../setup/axios";

const fetAllProduct = (page, limit) => {
    return axios.get(`/api/admin/products/read?page=${page}&limit=${limit}`);
};

const fetAllProductHomePage = (page, limit) => {
    return axios.get(`/api/products/read?page=${page}&limit=${limit}`);
};

const deleteProduct = (product) => {
    return axios.delete('/api/admin/products/delete', { data: { id: product.id, img: product.img } });
}

const createProduct = async (data) => {
    return await axios.post('/api/admin/products/create', { ...data }, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}

const updateProduct = (productData) => {
    return axios.put('/api/admin/products/update', { ...productData }, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}

const searchProduct = (productName) => {
    return axios.get(`/api/search/products?name=${productName}`);
};


const fetchListProduct = () => {
    return axios.get('/api/admin/products/listProduct');
};

const addListProduct = async (data) => {
    return await axios.post('/api/admin/products/listProduct/create', { ...data });
};

export {
    fetAllProduct,
    fetAllProductHomePage,
    deleteProduct,
    createProduct,
    updateProduct,
    fetchListProduct,
    addListProduct,
    searchProduct
};