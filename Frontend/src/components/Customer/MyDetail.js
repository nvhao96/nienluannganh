import "./MyDetail.scss";
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import numeral from 'numeral';
const MyDetail = (props) => {
    const { getMyOrdersDetail, isShowModalUser } = props;

    const [userData, setUserData] = useState({});

    const handleCloseModalUser = () => {
        props.onHide();
    };


    const formatCash = (price) => {
        return numeral(price).format('0,0');
    }
    return (
        <>
            <Modal size="lg" show={props.isShowModalUser} className='modal-user' onHide={() => handleCloseModalUser()}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span>Order Detail {getMyOrdersDetail.id}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="user-body">

                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">id</th>
                                    <th scope="col" className='text-center'>Name Product</th>
                                    <th scope="col">image</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">TotalCost</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getMyOrdersDetail && isShowModalUser === true ?
                                    <>
                                        {getMyOrdersDetail.DT.map((item, index) => {
                                            return (
                                                <tr key={`row-${index}`}>
                                                    <td>{item.id}</td>
                                                    <td>{item.Product.name}</td>
                                                    <td>
                                                        <img
                                                            src={item.Product.img} className="img-thumbnail image-product" alt="..." />
                                                    </td>
                                                    <td>{item.quantity}</td>
                                                    <td>{formatCash(item.price)} vnđ</td>
                                                    <td>{formatCash(item.price * item.quantity)} vnđ</td>


                                                </tr>
                                            )
                                        })}
                                    </>
                                    :
                                    <>
                                        <tr>
                                            <td>Not found users</td>
                                        </tr>
                                    </>
                                }
                            </tbody>
                        </table>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseModalUser()}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
};

export default MyDetail;