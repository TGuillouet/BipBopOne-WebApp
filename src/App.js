import React from 'react';

import {MenuView} from './components/MenuView';
import ProjectView from './components/ProjectView';
import ProjectListView from "./components/ProjectListView";

import {auth} from "./firebase";
import UserContext from "./contexts/UserContext";
import {createBrowserHistory} from "history";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";

import './App.css';
import 'bulma/css/bulma.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const history = createBrowserHistory();

function App() {
    const [ user, setUser ] = React.useState(null);

    React.useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            }
        });

        auth.signInWithEmailAndPassword("thomas.guillouet@edu.itescia.fr", "17tg11J59"); // Automatic login
    }, [auth, setUser]);

    return (
        <div className="root columns">
            <UserContext.Provider value={{ user, setUser }}>
                <Router history={history}>
                    <div className="column is-1">
                        <MenuView />
                    </div>
                    <div className="column">
                        <Switch>
                            <Route exact path="/" component={(props) => {
                                return (user)? <Redirect to="/projects" />: <div>Not logged</div>
                            }} />
                            <PrivateRoute isLogged={!!(user)} path="/projects" component={ProjectListView} />
                            <PrivateRoute isLogged={!!(user)} path="/detail/:id" component={ProjectView} />
                        </Switch>
                    </div>
                </Router>
            </UserContext.Provider>
        </div>
    )
}

const PrivateRoute = ({ component: Component, ...otherProps }) => {
    const renderIfLogged = props =>
        otherProps.isLogged ? (
            <Component {...props} />
        ) : (
            <Redirect to={{ pathname: "/" }} />
        )
    return (
        <Route
            {...otherProps}
            render={renderIfLogged}
        />
    )
};

export default App;
