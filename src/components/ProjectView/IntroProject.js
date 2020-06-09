import React, { useEffect } from "react";
import PropTypes from 'prop-types'

import { useFormContext } from "react-hook-form";

import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function IntroProject(props) {

    const { register, errors, setValue } = useFormContext({
        mode: "onBlur",
    });

    useEffect(() => {
        setValue([
            { name: props.projectInfo.name, state: props.projectInfo.state }
        ])
    }, [props.projectInfo.name,props.projectInfo.state]);

    return (
        <div>
            <div>
                <input class="input is-large" type="text" ref={register({ required: true })} name="name" placeholder="Title" />
                <p className="has-text-danger">{errors.name && 'Ce champ est requis'}</p>
            </div>
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
                            <div class="select is-rounded">
                                <select ref={register({ required: true })} name="state">
                                    <option>En cours</option>
                                    <option>Validé</option>
                                    <option>Annulé</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>

    )
}

IntroProject.propTypes = {
    projectInfo: PropTypes.object,

}
IntroProject.defaultProps = {
    projectInfo: {}
}

export default IntroProject
