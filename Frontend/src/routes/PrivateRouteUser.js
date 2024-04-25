import { useEffect } from "react";
import { useHistory } from 'react-router-dom';

import {
    Route
} from "react-router-dom";

const PrivateRouteUser = (props) => {
    return (
        <>
            <Route path={props.path} component={props.component} />
        </>
    )
};

export default PrivateRouteUser;