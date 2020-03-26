import React from "react";
import { faFolderOpen, faAddressBook, faHistory, faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import '../App.css'

function MenuView() {
    return (
        <div>
            <section class="hero is-primary">
                <div class="hero-body">
                    <div class="container">
                        <FontAwesomeIcon icon={faFolderOpen} />
                    </div>
                </div>
            </section>
            <section class="hero is-warning">
                <div class="hero-body">
                    <FontAwesomeIcon icon={faAddressBook} />
                </div>
            </section>
            <section class="hero is-danger">
                <div class="hero-body">
                    <FontAwesomeIcon icon={faHistory} />
                </div>
            </section>
            <section class="hero is-dark">
                <div class="hero-body">
                    <FontAwesomeIcon icon={faCog} />
                </div>
            </section>
        </div>
    )
}

export default MenuView