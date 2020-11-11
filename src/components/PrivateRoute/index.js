/*import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../auth";
//import { FirebaseContext } from '../Firebase'

const ProtectedRoute = ({

    component: Component,
    ...rest
}) => {
    *//*const fire = useContext(FirebaseContext)
    console.log(fire)*//*
    return (
        <Route
            {...rest}
            render={props => {
                if (auth.isAuthenticated()) {
                    return <Component {...props} />;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    );
                }
            }}
        />
    );
};

export default ProtectedRoute*/