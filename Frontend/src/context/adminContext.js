import React, { useState, createContext, useEffect } from "react";
import { getUserAccount } from "../services/userService";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    const userDefault = {
        isLoading: true,
        isAuthenticated: false,
        token: "",
        account: {}
    }

    // User is the name of the "data" that gets stored in context
    const [user, setUser] = useState(userDefault);

    // Login updates the user data with a name parameter
    const loginContext = (userData) => {
        setUser({ ...userData, isloading: false });
    };

    // Logout updates the user data to default
    const logoutContext = () => {
        setUser({ ...userDefault, isLoading: false });
    };

    const fetchUser = async () => {
        let serverData = await getUserAccount();
        if (+serverData.EC === 0) {

            let email = serverData.DT.email;
            let username = serverData.DT.username;
            let phone = serverData.DT.phone;
            let token = serverData.DT.access_token;

            let data = {
                isAuthenticated: true,
                token,
                account: { username, email, phone },
                isLoading: false,
            }
            setUser(data);
        } else {
            setUser({ ...userDefault, isLoading: false });
        }
    };

    useEffect(() => {
        if (window.location.pathname !== '/admin/users' && window.location.pathname !== '/admin/products' &&
            window.location.pathname !== '/admin/order' && window.location.pathname !== '/shoppingCart' && window.location.pathname !== '/myOrder') {
            setUser({ ...user, isLoading: false });
        }
        else {
            fetchUser();
        }
    }, [])

    return (
        <UserContext.Provider value={{ user, loginContext, logoutContext }}>
            {children}
        </UserContext.Provider>
    );
};

export {
    UserContext,
    UserProvider,
};