import productApiService from '../service/productApiService';

const readProducts = async (req, res) => {
    try {
        if (req.query.page && req.query.limit) {
            let page = req.query.page;
            let limit = req.query.limit;
            let data = await productApiService.getProductsWithPagination(+page, +limit);
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT,
            });
        } else {
            let data = await productApiService.getAllProducts();
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

const readProductHomePage = async (req, res) => {
    try {
        if (req.query.page && req.query.limit) {
            let page = req.query.page;
            let limit = req.query.limit;
            let data = await productApiService.getProductsWithPagination(+page, +limit);
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT,
            });
        } else {
            let data = await productApiService.getAllProducts();
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

const createProducts = async (req, res) => {
    try {
        let data = await productApiService.createProduct(req.body, req.file);
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

const deleteProducts = async (req, res) => {
    try {
        await productApiService.deleteFile(req.body.id);
        let data = await productApiService.deleteProduct(req.body.id);
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

const getListProduct = async (req, res) => {
    try {
        let data = await productApiService.getListProductService();
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

const updateProducts = async (req, res) => {
    try {
        if (req.file) {
            await productApiService.deleteFile(req.body.id);
        }
        let data = await productApiService.updateProduct(req.body.id, req.body, req.file);
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
}

const createListProduct = async (req, res) => {
    try {
        let data = await productApiService.createListProductService(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server create list product',
            EC: '-1',
        });
    }
};

const addCart = async (req, res) => {
    try {
        let data = await productApiService.addCartService(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server update cart',
            EC: '-1',
            DT: '',
        });
    }
};

const updateCart = async (req, res) => {
    try {
        let data = await productApiService.addCartService(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server add cart',
            EC: '-1',
            DT: '',
        });
    }
};

const checkOrder = async (req, res) => {
    try {
        let data = await productApiService.checkOrderService(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: '',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server add cart',
            EC: '-1',
            DT: '',
        });
    }
};

const addOrderDetail = async (req, res) => {
    try {
        let data = await productApiService.addOrderDetailService(req.body, req.user);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: '',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server add cart',
            EC: '-1',
            DT: '',
        });
    }
};

const updateOrderDetail = async (req, res) => {
    try {
        let data = await productApiService.updateOrderDetailService(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server update order detail',
            EC: '-1',
            DT: '',
        });
    }
};

module.exports = {
    readProducts,
    createProducts,
    deleteProducts,
    getListProduct,
    updateProducts,
    createListProduct,
    readProductHomePage,
    addCart,
    updateCart,
    checkOrder,
    addOrderDetail,
    updateOrderDetail,
}