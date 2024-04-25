import customerService from '../service/customerService';


const getProduct = async (req, res) => {
    try {
        let data = await customerService.getProductService(req.params.id);
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

const getProductCategory = async (req, res) => {
    try {
        let data = await customerService.getProductCategoryService(req.params.categoryName);
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

module.exports = {
    getProduct,
    getProductCategory,
}