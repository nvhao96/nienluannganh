import './Home.scss';
import { useEffect, useState, useContext } from "react";
import { fetAllProductHomePage } from '../../services/productService';
import ReactPaginate from "react-paginate";
import { useHistory } from 'react-router-dom';
import numeral from 'numeral';
import { toast } from 'react-toastify';
import { UserContext } from '../../context/adminContext';
import { addCart, updateCart, checkOrder, addOrderDetail } from '../../services/customerService';
import { useCart } from 'react-use-cart';

const Home = (props) => {
    const [listProducts, setListProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(12);
    const [totalPages, setTotalPages] = useState(0);

    const { user } = useContext(UserContext);
    const { addItem } = useCart();

    let history = useHistory();

    useEffect(() => {
        fetchProducts();
    }, [currentPage]);

    const fetchProducts = async () => {
        let response = await fetAllProductHomePage(currentPage, currentLimit);
        if (response && response.EC === 0) {
            setTotalPages(response.DT.totalPages);
            setListProducts(response.DT.products);
        }
    };

    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1);
    };

    const handleOnclick = async (data) => {
        history.push(`/product/${data.name}/${data.id}`);
    };

    const formatCash = (price) => {
        return numeral(price).format('0,0');
    }
    return (
        <>
            <div className="container">
                <div className='row mt-4 home-header'>
                    <div className="home-header-left col-8">
                        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="true">
                            <div className="carousel-indicators">
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                            </div>
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img className="d-block w-100 img-hone-header-1" />
                                </div>
                                <div className="carousel-item">
                                    <img className="d-block w-100 img-hone-header-2" />
                                </div>
                                <div className="carousel-item">
                                    <img className="d-block w-100 img-hone-header-3" />
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                    <div className='home-header-right col-4'>
                        <div className='col-12 image-right-1 mb-1'>

                        </div>
                        <div className='col-12 image-right-2 mt-2'>

                        </div>
                    </div>
                </div>
            </div>
            <div className='container position-relative'>
                <div className='products row mt-5'>
                    <h3>Sản phẩm</h3>
                    {listProducts && listProducts.length > 0 ?
                        <>
                            {listProducts.map((item, index) => {
                                return (

                                    <div className="card card-product col-3 m-2" key={`product-${index}`}>
                                        <img role='button' src={item.img} alt="..." onClick={() => handleOnclick(item)} />
                                        <div className="card-body mt-5">
                                            <h6 className="card-title card-title-product" role='button' onClick={() => handleOnclick(item)}>{item.name}</h6>
                                            <h4 className="card-text mt-5 text-primary" role='button' onClick={() => handleOnclick(item)}>{formatCash(item.price)} vnđ</h4>
                                            <span className="btn btn-primary mt-3 add-cart" onClick={() => addItem(item)}>Thêm vào giỏ hàng</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </>
                        :
                        <>
                            Không tìm thấy sản phẩm!
                        </>

                    }
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
        </>
    )
};

export default Home;