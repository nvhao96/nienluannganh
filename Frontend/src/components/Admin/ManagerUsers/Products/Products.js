import { useEffect, useState } from "react";
import { fetAllProduct, deleteProduct } from '../../../../services/productService';
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import ModalDeleteProduct from "./ModalDeleteProduct";
import ModalProduct from "./ModalProduct";
import ModalAddListProduct from "./ModalAddListProduct";
import './Products.scss';
import numeral from 'numeral';


const Products = (props) => {
    const [listProducts, setListProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(5);
    const [totalPages, setTotalPages] = useState(0);

    // modal delete
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataModel, setDataModel] = useState({});

    // modal update/ create user
    const [isShowModalUser, setIsShowModalUser] = useState(false);
    const [isShowModalAddListProduct, setIsShowModalAddListProduct] = useState(false);
    const [actionModalUser, setActionModalUser] = useState("CREATE");
    const [dataModelProduct, setDataModelProduct] = useState({});

    useEffect(() => {
        fetchProducts();
    }, [currentPage]);

    const fetchProducts = async () => {
        let response = await fetAllProduct(currentPage, currentLimit);
        if (response && response.EC === 0) {
            setTotalPages(response.DT.totalPages);
            setListProducts(response.DT.products);
        }
    };

    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1);
    };

    const handleDeleteProduct = async (product) => {
        setDataModel(product);
        setIsShowModalDelete(true);
    }

    const confirmDeleteProduct = async () => {
        let response = await deleteProduct(dataModel);
        if (response && response.EC === 0) {
            toast.success(response.EM);
            await fetchProducts();
            setIsShowModalDelete(false);
        } else {
            toast.error(response.EM);
        }
    }

    const handleClose = () => {
        setIsShowModalDelete(false);
        setDataModel({});
    };

    const onHideModalProduct = async () => {
        setIsShowModalUser(false);
        setIsShowModalAddListProduct(false);
        setDataModelProduct({});
        await fetchProducts();
    };

    const handleUpdateProduct = (product) => {
        setActionModalUser('UPDATE');
        setDataModelProduct(product);
        setIsShowModalUser(true);
    };

    const formatCash = (price) => {
        return numeral(price).format('0,0');
    }

    return (
        <>
            <div className="manager-products-container container position-relative">
                <div className="user-header">
                    <div className="title m-3">
                        <h3>TABLE PRODUCTS</h3>
                    </div>
                    <div className="actions m-3">
                        <button
                            className="btn btn-primary m-1"
                            onClick={() => {
                                setIsShowModalUser(true);
                                setActionModalUser("CREATE");
                            }}
                        >
                            <i className="fa fas fa-plus m-1"></i>
                            Add new product
                        </button>
                        <button
                            className="btn btn-primary m-1"
                            onClick={() => {
                                setIsShowModalAddListProduct(true);
                            }}
                        >
                            <i className="fa fas fa-plus m-1"></i>
                            Add new list product
                        </button>
                    </div>
                </div>
                <div className="user-body">

                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">id</th>
                                <th scope="col">Name Product</th>
                                <th scope="col">image</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Price</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listProducts && listProducts.length > 0 ?
                                <>
                                    {listProducts.map((item, index) => {
                                        return (
                                            <tr key={`row-${index}`}>
                                                <th>{(currentPage - 1) * currentLimit + index + 1}</th>
                                                <td>{item.id}</td>
                                                <td>{item.name}</td>
                                                <td>
                                                    <img
                                                        src={item.img} className="img-thumbnail image-product" alt="..." />
                                                </td>
                                                <td>{item.quantity}</td>
                                                <td>{formatCash(item.price)} vnđ</td>

                                                <td>
                                                    <button className="btn btn-warning m-1" onClick={() => handleUpdateProduct(item)}>
                                                        Update
                                                    </button>
                                                    <button className="btn btn-danger" onClick={() => handleDeleteProduct(item)}>Delete</button>
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
            <ModalDeleteProduct
                show={isShowModalDelete}
                handleClose={handleClose}
                confirmDeleteProduct={confirmDeleteProduct}
                dataModel={dataModel}
            />
            <ModalProduct
                isShowModalUser={isShowModalUser}
                onHide={onHideModalProduct}
                action={actionModalUser}
                dataModelProduct={dataModelProduct}
            />
            <ModalAddListProduct
                isShowModalAddListProduct={isShowModalAddListProduct}
                onHide={onHideModalProduct}
                dataModelProduct={dataModelProduct}
            />
        </>
    )
};

export default Products;