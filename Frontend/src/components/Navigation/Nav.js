import React, { useState, useEffect, useContext } from 'react';
import './nav.scss';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { fetchListProduct } from '../../services/productService';
import { logoutUser } from '../../services/userService';
import { UserContext } from '../../context/adminContext';
import SearchProduct from "./search";
import { useCart } from "react-use-cart";

const Nav = (props) => {
    const [isShow, setIsShow] = useState(true);
    const { user, logoutContext } = useContext(UserContext);

    const {
        totalItems,
    } = useCart();

    let location = useLocation();
    let path = ['/admin', '/admin/users', '/admin/products', '/admin/order'];
    useEffect(() => {
        for (let i = 0; i < path.length; i++) {
            if (location.pathname === path[i]) {
                setIsShow(false);
            }
        }
    }, []);

    const [listProduct, setListProducts] = useState([]);

    useEffect(() => {
        getListProduct();
    }, []);

    const getListProduct = async () => {
        let response = await fetchListProduct();
        if (response && +response.EC === 0) {
            setListProducts(response.DT);
        } else {
            return alert('error');
        }
    };

    let history = useHistory();

    const handleClickShoppingCarrt = () => {
        history.push('/shoppingCart');
    };

    const handleClickImageTextLogo = () => {
        history.push('/');
    };


    const handleLogout = async () => {
        let data = await logoutUser();
        logoutContext();

        if (data && +data.EC === 0) {
            history.push('/');
        } else {
            alert('Cannot log out');
        }
    };

    const handleMyOrder = async () => {
        history.push('/myOrder');
    };

    return (
        <>
            {isShow === true &&
                <nav className="navbar navbar-expand-lg p-0">
                    <div className="container-fluid parent-header">
                        <div className="topnav">
                            <div className='container'>
                                <div className='topnav-content1'>
                                    <div className='image-logo' onClick={() => handleClickImageTextLogo()}></div>
                                    <div className='text-logo' onClick={() => handleClickImageTextLogo()}>2P Provide Product</div>
                                    <div className='search d-lg-block'>
                                        {/* <input className='input-search' type='text' placeholder='Tìm kiếm sản phẩm...' /> */}
                                        {/* <i className="fa fas fa-search search-icon" onClick={() => handleSearch()}></i> */}
                                        <SearchProduct />

                                    </div>
                                    <div className='cart' onClick={() => handleClickShoppingCarrt()}>
                                        <i className="shopping-icon fa fas fa-shopping-cart position-relative">
                                            {totalItems !== 0 && (
                                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                    {totalItems}
                                                </span>
                                            )}
                                        </i>
                                        <span className='shopping-cart'>Giỏ hàng</span>
                                    </div>
                                    {user && user.isAuthenticated === true ?
                                        <>
                                            <div className='welcome-user dropdown-toggle' role="button" data-bs-toggle="dropdown">
                                                {user.account.username}
                                            </div>
                                            <ul className="dropdown-menu dropdown-logout">
                                                <li role='button' onClick={() => handleMyOrder()}>Đơn hàng của tôi</li>
                                                <hr />
                                                <li role='button' onClick={() => handleLogout()}>Đăng xuất</li>
                                            </ul>
                                        </>
                                        :
                                        <div className='login-register'>
                                            <NavLink to="/login" exact className=' login'>Đăng nhập</NavLink>
                                            <NavLink to="/register" exact className='register'>Đăng ký</NavLink>
                                        </div>



                                    }

                                </div>


                                <button className="navbar-toggler icon-nav" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className='topnav-content2'>
                                    <div className="collapse navbar-collapse show-content-nav-mb" id="navbarSupportedContent">
                                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                            <li className="nav-item">
                                                <NavLink to="/" exact className='text-sm-dark'>TRANG CHỦ</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink to="/news" >TIN TỨC</NavLink>
                                            </li>
                                            <li className="nav-item dropdown">
                                                <NavLink to="/contact" className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    THỰC PHẨM CHỨC NĂNG
                                                </NavLink>
                                                <ul className="dropdown-menu show-dropdown">
                                                    {listProduct ?
                                                        listProduct.map((item, index) => {
                                                            return (
                                                                <li key={`product-${index + 1}`}><NavLink
                                                                    className="dropdown-item "
                                                                    to={`/listProduct/${item.categoryName}`}
                                                                >
                                                                    {item.categoryName}
                                                                </NavLink></li>
                                                            )
                                                        })
                                                        :
                                                        <>
                                                        </>
                                                    }
                                                </ul>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink to="/about" >GIỚI THIỆU</NavLink>
                                            </li>
                                        </ul>
                                    </div>
                                    {/* <form className="d-flex d-lg-none d-block w-50 search-mb" role="search">
                                
                                        <SearchProduct />
                                    </form> */}
                                </div>
                            </div>
                        </div>
                    </div >
                </nav>
            }
        </>

    )
};

export default Nav;