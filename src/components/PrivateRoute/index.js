import React from 'react'

import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {
   
    return (
        <Route
            {...rest}
            render={props =>
            {
                return (
                    console.log(localStorage),
                    localStorage.getItem("token") ?
                        (<Component {...props} />) : (<Redirect to='/'></Redirect>)
                    )
            }}
        >

        </Route>
    )
}

export default PrivateRoute