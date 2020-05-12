import React from "react";

import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function IntroProject(props) {
    return(
        <section>
        <p class="title">{props.projectInfo.name}</p>
        <nav class="level-left">
            <div class="level-item has-text-centered">
                <div>
                    <nav class="level-left">
                        <div class="level-item has-text-centered">
                            <div>
                                <p>{(props.projectInfo.whitelist || []).length}</p>
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
                        <div id="tagList" class="select is-rounded">
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

    )
}

export default IntroProject
