import { useEffect, useContext } from "react";
import { useHistory, Redirect } from 'react-router-dom';
import { UserContext } from '../context/adminContext';
import {
    Route
} from "react-router-dom";

const PrivateRoute = (props) => {
    const { user } = useContext(UserContext);

    if (user && user.isAuthenticated === true) {
        return (
            <>
                <Route path={props.path} component={props.component} />
            </>
        )
    } else {
        return (
            <Redirect to='/admin'>
            </Redirect>
        )
    }


};

export default PrivateRoute;