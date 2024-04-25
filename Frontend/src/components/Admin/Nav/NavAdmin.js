import React, { useState, useEffect, useContext } from 'react';
import './NavAdmin.scss';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import { UserContext } from '../../../context/adminContext';
import { logoutUser } from '../../../services/userService';

const NavAdmin = (props) => {
    const { user, logoutContext } = useContext(UserContext);
    const [isShow, setIsShow] = useState(false);
    const history = useHistory();

    let location = useLocation();
    let path = ['/admin/users', '/admin/products', '/admin/order'];

    useEffect(() => {
        for (let i = 0; i < path.length; i++) {
            if (location.pathname === path[i]) {
                setIsShow(true);
            }
        }
    }, []);

    const handleLogoutAdmin = async () => {
        let data = await logoutUser();
        logoutContext();

        if (data && +data.EC === 0) {
            history.push('/admin');
        } else {
            alert('Cannot log out');
        }
    };
    if (user && user.isAuthenticated === true && isShow === true) {

        return (
            <>
                <nav className="navbar navbar-expand-lg p-0">
                    <div className="container-fluid parent-header-admin">
                        <div className="topnav-admin">
                            <div className='container'>
                                <button className="navbar-toggler icon-nav-admin" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className='topnav-content-admin'>
                                    <div className="collapse navbar-collapse show-content-nav-mb-admin" id="navbarSupportedContent">
                                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                            <li className="nav-item">
                                                <NavLink to="/admin/users" exact className='text-sm-dark'>Users</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink to="/admin/products" >Products</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink to="/admin/order" >Order</NavLink>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className='left-content'>
                                        <ul>
                                            <li className="nav-item dropdown nav-left-admin">
                                                <NavLink to="/contact" className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    Welcome {user.account.username}
                                                </NavLink>
                                                <ul className="dropdown-menu dropdown-menu-admin">
                                                    <li><span className="dropdown-item text-dark" onClick={() => handleLogoutAdmin()}>Log out</span></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </nav>
            </>

        )
    } else {
        return (<></>);
    }
};

export default NavAdmin;