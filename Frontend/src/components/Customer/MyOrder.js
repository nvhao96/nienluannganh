import './MyOrder.scss';
import { fetchAllMyOrders, fetchAllMyOrderDetail } from '../../services/customerService';
import { useEffect, useState } from "react";
import { isEmpty } from 'lodash';
import ReactPaginate from "react-paginate";
import MyDetail from './MyDetail';
const MyOrder = (props) => {

    const [getMyOrders, setGetMyOrders] = useState({});

    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(5);
    const [totalPages, setTotalPages] = useState(0);

    const [getMyOrdersDetail, setGetMyOrdersDetail] = useState({});
    const [isShowModalUser, setIsShowModalUser] = useState(false);

    const fetchAllMyOrder = async () => {
        let response = await fetchAllMyOrders(currentPage, currentLimit);
        console.log(response);
        if (response && response.EC === 0) {
            setTotalPages(response.DT.totalPages);
            setGetMyOrders(response);
            // for (let i = 0; i < response.DT.users.length; i++) {
            //     let idOrder = response.DT.users[i].id;
            //     let res = await fetchAllMyOrderDetail({ id: idOrder });
            //     setGetMyOrdersDetail(...getMyOrdersDetail, res);
            // }
        }
    }

    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1);
    };

    useEffect(() => {
        fetchAllMyOrder();
    }, [currentPage]);

    const onHideModalUser = async () => {
        setIsShowModalUser(false);
    };

    const handleMyDetail = async (idOrder) => {
        let res = await fetchAllMyOrderDetail(idOrder);
        setGetMyOrdersDetail(res);
        setIsShowModalUser(true);
    };

    return (
        <>
            <div className='container position-relative'>
                {!isEmpty(getMyOrders.DT) && getMyOrders.DT.length > 0 ?
                    <>
                        {
                            getMyOrders.DT.map((item, index) => {
                                return (
                                    <section className=" gradient-custom-2" key={index}>
                                        <div className="container py-3 ">
                                            <div className="row d-flex justify-content-center align-items-center">
                                                <div className="col-md-10 col-lg-8 col-xl-6">
                                                    <div className="card card-stepper" style={{ borderRadius: "16px" }}>
                                                        <div className="card-header p-4">
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <div>
                                                                    <p className="text-muted mb-2"> Order ID: <span className="fw-bold text-body">{item.id}</span></p>
                                                                    <p className="text-muted mb-0"> Total Item: <span className="fw-bold text-body">{item.pay}</span> </p>
                                                                </div>
                                                                <div onClick={() => handleMyDetail(item.id)} className='text-primary' role='button'>
                                                                    Xem chi tiết
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                )
                            })
                        }
                    </>

                    :
                    <>
                        <h1 className='text-center'> Bạn chưa có đơn hàng nào</h1>
                    </>
                }
                {totalPages > 1 &&
                    <div className="user-footer position-absolute end-0 mt-5">
                        <ReactPaginate
                            nextLabel="next >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={2}
                            pageCount={totalPages}
                            previousLabel="< previous"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakLabel="..."
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            containerClassName="pagination"
                            activeClassName="active"
                            renderOnZeroPageCount={null}
                        />
                    </div>
                }

            </div>
            <MyDetail
                isShowModalUser={isShowModalUser}
                onHide={onHideModalUser}
                getMyOrdersDetail={getMyOrdersDetail}
            />
        </>
    )
};

export default MyOrder; 