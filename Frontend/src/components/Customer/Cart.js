import './Cart.scss';
import { useCart } from "react-use-cart";
import { useEffect, useState, useContext } from "react";
import numeral from 'numeral';
import { toast } from 'react-toastify';
import { UserContext } from '../../context/adminContext';
import { addCart, addOrderDetail } from '../../services/customerService';

const Cart = (props) => {
    const {
        isEmpty,
        totalUniqueItems,
        items,
        totalItems,
        cartTotal,
        updateItemQuantity,
        removeItem,
        emptyCart,

    } = useCart();

    const { user } = useContext(UserContext);

    const handleOnChangeInput = (event) => {
        console.log(event);
    };

    const formatCash = (price) => {
        return numeral(price).format('0,0');
    }

    // const checkUserClickBuy = async (dataUser) => {
    //     let check = await checkOrder(dataUser);
    //     if (check && check.EC === 0) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // };

    const handleOnclickBuy = async (data, cartTotal, totalItems) => {
        let response = await addCart(user, data, totalItems, cartTotal);
        if (response && response.EC === 0) {
            toast.success(response.EM);
        }
        await addOrderDetail(data);
        emptyCart();
    };

    if (isEmpty) return <h1 className='text-center'>Chưa có sản phẩm nào trong giỏ hàng của bạn</h1>
    return (
        <>
            <section className="container mt-5 container-cart">
                <div className="row">
                    <div className="col-9 cart-item">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Sản phẩm</th>
                                    <th scope="col"></th>
                                    <th scope="col">Đơn giá</th>
                                    <th scope="col" className='text-center'>Số lượng</th>
                                    <th scope="col">Thành tiền</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody className="table-group-divider body-item">
                                {items.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td><img className='img-cart' src={item.img} /></td>
                                            <td className='name-product'>{item.name}</td>
                                            <td>{formatCash(item.price)}</td>
                                            <td className='form-quantity'>
                                                <form className="col-12 mt-4">
                                                    <div className="value-button decrease" onClick={() => updateItemQuantity(item.id, item.quantity - 1)}><span>-</span></div>
                                                    <input type="number" className="number" value={item.quantity} onChange={() => handleOnChangeInput(item.quantity)} />
                                                    <div className="value-button increase" onClick={() => updateItemQuantity(item.id, item.quantity + 1)}><span>+</span></div>
                                                </form>
                                            </td>
                                            <td className='totalCost'>{formatCash(item.quantity * item.price)}</td>
                                            <td><i className="fa fas fa-trash text-danger" role='button' onClick={() => removeItem(item.id)}></i></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-3 total-cost">
                        <h4 className='mt-2'>Thông tin đơn hàng</h4>
                        <div className='pay'>
                            <p>Tổng giá tiền: </p>
                            <span>{formatCash(cartTotal)} đ</span>
                        </div>
                        <div className='pay'>
                            <p>Mã giảm giá: </p>
                            <span>0 đ</span>
                        </div>
                        <div className='pay'>
                            <b>Cần thanh toán</b>
                            <span>{formatCash(cartTotal)} đ</span>
                        </div>
                        <div className='order' data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Đặt hàng
                        </div>


                        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Xác nhận đặt hàng</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => handleOnclickBuy(items, cartTotal, totalItems)}>Xác nhận</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
};

export default Cart;