import {
    Switch,
    Route,
    useHistory
} from "react-router-dom";
import { useContext } from 'react';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import LoginAdmin from '../components/Admin/LoginAdmin/LoginAdmin';
import Users from '../components/Admin/ManagerUsers/users/Users';
import PrivateRoute from "./PrivateRoute";
import Products from "../components/Admin/ManagerUsers/Products/Products";
import Home from "../components/Customer/Home";
import DetailProduct from "../components/Customer/DetailProduct";
import About from "../components/Customer/About";
import ListProduct from "../components/Customer/ListProduct";
import Cart from "../components/Customer/Cart";
import { CartProvider } from "react-use-cart";
import Order from "../components/Admin/ManagerUsers/Orders/Order";
import MyOrder from "../components/Customer/MyOrder";
import MyDetail from "../components/Customer/MyDetail";
const AppRoute = (props) => {

    return (
        <>
            <Switch>
                <Route path="/about">
                    <About />
                </Route>
                <Route path="/news">
                    News
                </Route>
                <Route path="/contact">
                    Contact
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="/myOrder">
                    <MyOrder />
                </Route>
                <Route path="/myOrder/myDetail" exact>
                    <MyDetail />
                </Route>
                <Route path="/admin" exact>
                    <LoginAdmin />
                </Route>
                <PrivateRoute path="/admin/users" component={Users} />
                <PrivateRoute path="/admin/products" component={Products} />
                <PrivateRoute path="/admin/order" component={Order} />
                <CartProvider>
                    <Route path="/product/:name/:id" exact>
                        <DetailProduct />
                    </Route>
                    <Route path="/listProduct/:categoryName" exact>
                        <ListProduct />
                    </Route>
                    <Route Route path="/shoppingCart">
                        <Cart />
                    </Route>
                    <Route path="/" exact>
                        <Home />
                    </Route>
                </CartProvider>

                <Route path="*">
                    404 not found
                </Route>
            </Switch >
        </>
    )
};

export default AppRoute;