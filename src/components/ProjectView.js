import React from "react";

import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ProjectView() {
    return (
        <div class="columns is-gapless">
            <div class="column is-5">
                <section class="hero is-fullheight">
                    <div class="hero-body">
                        <div class="container">

                            <section>
                                <p class="title">Nom du projet</p>
                                <nav class="level-left">
                                    <div class="level-item has-text-centered">
                                        <div>
                                            
                                            <nav class="level-left">
                                                <div class="level-item has-text-centered">
                                                    <div>
                                                        <p>3</p>
                                                    </div>
                                                </div>
                                                <div class="level-item has-text-centered">
                                                    <div>
                                                        <FontAwesomeIcon icon={faEye} />
                                                    </div>
                                                </div>
                                            </nav>
                                        </div>
                                    </div>
                                    <div class="level-item has-text-centered">
                                        <div>
                                            <div class="control">
                                                <div class="select">
                                                    <select>
                                                        <option>En cours</option>
                                                        <option>Validé</option>
                                                        <option>Annulé</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </nav>
                            </section>

                            <section class="section">
                                <figure class="image is-4by3">
                                    <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" />
                                </figure>
                            </section>

                            <section>
                                <div class="container">
                                    <h1 class="title">Description</h1>
                                    <textarea class="textarea has-fixed-size" placeholder="">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing
                                        elit, sed do eiusmod tempor incididunt ut labore et
                                        dolore magna aliqua.
                                    </textarea>
                                </div>
                            </section>

                        </div>
                    </div>
                </section>
            </div>
            <div class="column">
                <section class="hero is-link is-fullheight">
                    <div class="hero-body">
                    <section class="section">
                    </section>
                    <section class="section">
                    </section>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default ProjectView