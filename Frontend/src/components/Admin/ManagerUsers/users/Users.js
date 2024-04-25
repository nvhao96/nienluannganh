import { useEffect, useState } from "react";
import { fetAllUser, deleteUser } from '../../../../services/userService';
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import ModalDelete from "./ModalDelete";
import ModalUser from "./ModalUser";

const Users = (props) => {
    const [listUsers, setListUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(5);
    const [totalPages, setTotalPages] = useState(0);

    // modal delete
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataModel, setDataModel] = useState({});

    // modal update/ create user
    const [isShowModalUser, setIsShowModalUser] = useState(false);
    const [actionModalUser, setActionModalUser] = useState("CREATE");
    const [dataModelUser, setDataModelUser] = useState({});

    useEffect(() => {
        fetchUsers();
    }, [currentPage]);

    const fetchUsers = async () => {
        let response = await fetAllUser(currentPage, currentLimit);
        if (response && response.EC === 0) {
            setTotalPages(response.DT.totalPages);
            setListUsers(response.DT.users);
        }
    };

    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1);
    };

    const handleDeleteUser = async (user) => {
        setDataModel(user);
        setIsShowModalDelete(true);
    }

    const confirmDeleteUser = async () => {
        let response = await deleteUser(dataModel);
        if (response && response.EC === 0) {
            toast.success(response.EM);
            await fetchUsers();
            setIsShowModalDelete(false);
        } else {
            toast.error(response.EM);
        }
    }

    const handleClose = () => {
        setIsShowModalDelete(false);
        setDataModel({});
    };

    const onHideModalUser = async () => {
        setIsShowModalUser(false);
        setDataModelUser({});
        await fetchUsers();
    };

    const handleUpdateUser = (user) => {
        setActionModalUser("UPDATE");
        setDataModelUser(user);
        setIsShowModalUser(true);
    };

    return (
        <>
            <div className="manager-users-container container position-relative">
                <div className="user-header">
                    <div className="title m-3">
                        <h3>TABLE USER</h3>
                    </div>
                    <div className="actions m-3">
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                setIsShowModalUser(true);
                                setActionModalUser("CREATE");
                            }}
                        >
                            <i className="fa fas fa-plus m-1"></i>
                            Add new user
                        </button>
                    </div>
                </div>
                <div className="user-body">

                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">id</th>
                                <th scope="col">Email</th>
                                <th scope="col">Username</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Group</th>
                                <th scope="col">Actions</th>
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
                                                <td>{item.email}</td>
                                                <td>{item.username}</td>
                                                <td>{item.phone}</td>
                                                <td>{item.Group ? item.Group.name : ''}</td>
                                                <td>
                                                    <button className="btn btn-warning m-1" onClick={() => handleUpdateUser(item)}>
                                                        Update
                                                    </button>
                                                    <button className="btn btn-danger" onClick={() => handleDeleteUser(item)}>Delete</button>
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
            <ModalDelete
                show={isShowModalDelete}
                handleClose={handleClose}
                confirmDeleteUser={confirmDeleteUser}
                dataModel={dataModel}
            />
            <ModalUser
                isShowModalUser={isShowModalUser}
                onHide={onHideModalUser}
                action={actionModalUser}
                dataModelUser={dataModelUser}
            />
        </>
    )
};

export default Users;