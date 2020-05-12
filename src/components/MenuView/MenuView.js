import React from "react";
import {faFolderOpen, faAddressBook, faHistory, faCog, faPowerOff} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {auth} from "../../firebase";

import {withUserContext} from "../../contexts/UserContext";
import {withRouter} from "react-router";
import './MenuView.css';

function MenuView(props) {
    const redirectTo = (route) => () => {
        props.history.push(route);
    };

    const logout = async () => {
        await auth.signOut();
        await props.context.setUser(null);
    };

    return (
        <nav className="navbar menu">
            <div className="navbar-menu menu-child">
                <div className="navbar-start">
                    <MenuButton onClick={redirectTo("/projects")} icon={faFolderOpen} />
                    <MenuButton onClick={redirectTo("/contacts")} icon={faAddressBook} />
                    <MenuButton onClick={redirectTo("/history")} icon={faHistory} />
                    <MenuButton onClick={redirectTo("/settings")} icon={faCog} />
                </div>
                <div className="navbar-end menu-end">
                    <MenuButton onClick={logout} icon={faPowerOff} />
                </div>
            </div>
        </nav>
    )
}

function MenuButton(props) {
    return (
        <a style={{ padding: 0, width: "80px", height: "80px", display: "flex", justifyContent: "center", alignItems: "center" }} onClick={props.onClick} className="navbar-item">
            <FontAwesomeIcon size="3x" icon={props.icon} />
        </a>
    )
}

export default withRouter(
    withUserContext(MenuView)
);
