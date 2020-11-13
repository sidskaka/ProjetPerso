import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'

import Accueil from '../Accueil'
import Login from '../Login'
import Signup from '../Signup'
import RecipeDetails from '../Accueil/RecipeDetails'
import PrivateRoute from '../PrivateRoute'
import Error from '../Error'

const App = () => {
    /*useEffect(() => {
        localStorage.
    })*/
    return (
        <Router>
            <Header />

            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/signup" component={Signup} />
                <PrivateRoute path="/accueil" component={Accueil} />
                <PrivateRoute path="/details/:id" component={RecipeDetails} />
                <Route component={Error} />
            </Switch>

            <Footer />
        </Router>
    )
}

export default App;