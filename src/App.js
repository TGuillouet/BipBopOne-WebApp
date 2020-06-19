import React from 'react';

import { MenuView } from './components/MenuView';
import ProjectView from './components/ProjectView/ProjectView';
import ProjectListView from "./components/ProjectListView";

import { auth } from "./firebase";
import UserContext from "./contexts/UserContext";
import { createBrowserHistory } from "history";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Modal } from "./components/Modal";

import 'bulma/css/bulma.css';
import './App.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import LoginPage from './components/LoginPage';
import ContactsPage from "./components/ContactsPage";

const history = createBrowserHistory();

function App() {
    const [user, setUser] = React.useState(null);
    const [createModalDisplayed, setCreateModalDisplayed] = React.useState(false);

    React.useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            }
        });
    }, [setUser]);

    const toggleCloseModal = React.useCallback(() => {
        setCreateModalDisplayed(!createModalDisplayed);
    }, [createModalDisplayed]);

    return (
        <div className="root columns">
            <div className="bugreport">
                <button className="button" onClick={() => setCreateModalDisplayed(true)}>
                    <h2>Bug report</h2>
                </button>
            </div>
            <UserContext.Provider value={{ user, setUser }}>
                <Router history={history}>
                    <div style={{ paddingBottom: 0, maxWidth: "80px" }} className="column is-1">
                        <MenuView />
                    </div>
                    <div className="column">
                        <Switch>
                            <Route exact path="/" component={(props) => {
                                return (user)? <Redirect to="/projects" />: <LoginPage/>
                            }} />
                            <PrivateRoute isLogged={!!(user)} path="/projects" component={ProjectListView} />
                            <PrivateRoute isLogged={!!(user)} path="/detail/:id" component={ProjectView} />
                            <PrivateRoute isLogged={!!(user)} path="/contacts" component={ContactsPage} />
                        </Switch>
                    </div>
                </Router>
            </UserContext.Provider>
            <Modal isActive={createModalDisplayed} onClose={toggleCloseModal}>
                <article className="message is-info">
                    <div className="message-header">
                        <p>Bug report</p>
                    </div>
                    <div className="message-body">
                    <p>
                    Bonjour à toi !
                    </p>
                     Le site est encore en Beta donc si tu as trouvé un bug tu peux nous le faire remonter en nous envoyant un mail à <strong>support.prod@bipbopone.fr</strong>
                    </div>
                </article>
            </Modal>
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
