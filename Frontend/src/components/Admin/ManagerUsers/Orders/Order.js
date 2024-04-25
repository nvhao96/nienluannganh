import { useEffect, useState } from "react";
import { fetAllOrder } from '../../../../services/userService';
import ReactPaginate from "react-paginate";
import { useHistory } from 'react-router-dom';
import { toast } from "react-toastify";
import ModalDetail from "./ModalDetail";
import { fetAllOrderDetail } from '../../../../services/userService';

const Order = (props) => {
    const [listUsers, setListUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(5);
    const [totalPages, setTotalPages] = useState(0);

    const history = useHistory();

    const [isShowModalUser, setIsShowModalUser] = useState(false);
    const [dataModelUser, setDataModelUser] = useState({});

    useEffect(() => {
        fetchOrder();
    }, [currentPage]);

    const fetchOrder = async () => {
        let response = await fetAllOrder(currentPage, currentLimit);
        if (response && response.EC === 0) {
            setTotalPages(response.DT.totalPages);
            setListUsers(response.DT.users);
        }
    };

    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1);
    };

    const onHideModalUser = async () => {
        setIsShowModalUser(false);
    };

    const handleDetail = async (item) => {
        let data = await fetAllOrderDetail(item);
        setDataModelUser(data);
        setIsShowModalUser(true);
    };

    return (
        <>
            <div className="manager-users-container container position-relative">
                <div className="user-header">
                    <div className="title m-3">
                        <h3>TABLE ORDER</h3>
                    </div>
                </div>
                <div className="user-body mt-5">

                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">id</th>
                                <th scope="col">User Id</th>
                                <th scope="col">Address</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Total Cost</th>
                                <th scope="col">Total Items</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {listUsers && listUsers.length > 0 ?
                                <>
                                    {listUsers.map((item, index) => {
                                        return (
                                            <tr key={`row-${index}`}>
                                                <th>{(currentPage - 1) * currentLimit + index + 1}</th>
                                                <td>{item.id}</td>
                                                <td>{item.userId}</td>
                                                <td>{item.address}</td>
                                                <td>{item.phone}</td>
                                                <td>{item.totalCost}</td>
                                                <td>{item.pay}</td>
                                                <td>
                                                    <button className="btn text-primary m-1" onClick={() => handleDetail(item)}>
                                                        Detail
                                                    </button>
                                                </td>
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
            <ModalDetail
                isShowModalUser={isShowModalUser}
                onHide={onHideModalUser}
                dataModelUser={dataModelUser}
            />
        </>
    )
};

export default Order;