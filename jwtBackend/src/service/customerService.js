import db from '../models/index'

const getProductService = async (productId) => {
    try {
        let product = await db.Product.findOne({
            where: { id: productId },
        });
        if (product) {
            return {
                EM: 'success',
                EC: 0,
                DT: product,
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
            EM: 'error getting product',
            EC: 1,
            DT: '',
        };
    }
};

const getProductCategoryService = async (categoryName) => {
    try {
        let listProduct = await db.List_Product.findAll({
            where: { categoryName: categoryName },
            include: { model: db.Product },
        });
        if (listProduct) {
            return {
                EM: 'success',
                EC: 0,
                DT: listProduct,
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
            EM: 'error getting product',
            EC: 1,
            DT: '',
        };
    }
};

module.exports = {
    getProductService,
    getProductCategoryService,
}