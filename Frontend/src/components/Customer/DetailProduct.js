import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { detailProduct } from '../../services/customerService';
import './DetailProduct.scss';
import numeral from 'numeral';
import { useCart } from 'react-use-cart';
const DetailProduct = (props) => {

    const [quantity, setQuantity] = useState(1);

    const { name, id } = useParams();
    const [product, setProduct] = useState([]);
    const { addItem } = useCart();

    const fetchProducts = async () => {
        let response = await detailProduct(name, id);
        if (response && response.EC === 0) {
            setProduct(response.DT);
        }
    };

    const formatCash = (price) => {
        return numeral(price).format('0,0');
    }

    useEffect(() => {
        fetchProducts();
    }, [quantity]);

    const handleOnclickIncrease = () => {
        setQuantity(preQuantity => preQuantity + 1);
    }

    const handleOnclickDecrease = () => {
        setQuantity(preQuantity => preQuantity - 1);
        if (quantity < 2) {
            setQuantity(1);
        }
    }

    const handleOnChangeInput = (event) => {
        console.log(event);
    };

    const handleClickBuy = (product) => {
        addItem(product, quantity);
    };


    return (
        <>
            {product ?
                <div className="container">
                    <div className="top-content row mt-5">
                        <img src={product.img} className="img-thumbnail img-detail col-6" alt="..." />
                        <div className="col-6 right-content">
                            <h4 className="col-12 name-product ">{product.name}</h4>
                            <h4 className="price col-12 mt-5">{formatCash(product.price)} vnđ</h4>
                            <form className="col-12 mt-4">
                                <span>Chọn số lượng: </span>
                                <div className="value-button decrease" onClick={() => handleOnclickDecrease()}><span>-</span></div>
                                <input type="number" className="number" value={quantity} onChange={(event) => handleOnChangeInput(event)} />
                                <div className="value-button increase" onClick={() => handleOnclickIncrease()}><span>+</span></div>
                            </form>
                            <div className="col-4 buy mt-3" onClick={() => handleClickBuy(product)}>
                                CHỌN MUA
                            </div>
                            <div className="commit row mt-5">
                                <div className="title-commit col-12" >2P CAM KẾT</div>
                                <div className="col-4 icon-content">
                                    <i className="fa fas fa-retweet icon-commit"></i>
                                    <div className="content-commit">
                                        Đổi trả trong 30 ngày
                                        kể từ ngày mua hàng
                                    </div>
                                </div>
                                <div className="col-4 icon-content ">
                                    <i className="fa fas fa-thumbs-up icon-commit"></i>
                                    <div className="content-commit">
                                        Miễn phí 100%
                                        <div>đổi thuốc</div>
                                    </div>
                                </div>
                                <div className="col-4 icon-content">
                                    <i className="fa fas fa-truck icon-commit"></i>
                                    <div className="content-commit">
                                        Miễn phí vận chuyển theo
                                        chính sách giao hàng
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bottom-content mt-5">
                        <h3 className="text-center">CHI TIẾT SẢN PHẨM</h3>
                        <h5 className="mt-5">Thành phần</h5>
                        <div className="text-detail">{product.ingredients}</div>
                        <h5>Đối tượng sử dụng</h5>
                        <div className="text-detail">{product.objectOfUse}</div>
                        <h5>Công dụng</h5>
                        <div className="text-detail">{product.uses}</div>
                        <h5>Bảo quản</h5>
                        <div className="text-detail">{product.preserve}</div>
                        <h5>Đóng gói</h5>
                        <div className="text-detail">{product.pack}</div>
                        <h5>Thương hiệu</h5>
                        <div className="text-detail">{product.origin}</div>
                        <h5>Nơi sản xuất</h5>
                        <div className="text-detail">{product.productionSite}</div>
                    </div>
                </div >
                :
                <>
                    Không tồn tại sản phẩm!
                </>
            }
        </>
    )
};

export default DetailProduct;