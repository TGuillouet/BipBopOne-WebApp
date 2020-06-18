import React, { useEffect } from "react";
import PropTypes from 'prop-types'

import { useFormContext } from "react-hook-form";

import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function IntroProject(props) {

    const { register, errors, setValue } = useFormContext({
        mode: "onChange",
    });

    useEffect(() => {
        setValue([
            { name: props.projectInfo.name, state: props.projectInfo.state }
        ])
    }, [props.projectInfo.name, props.projectInfo.state, setValue]);

    return (
        <div className="column">
            <div>
                <input className="input is-medium" type="text" ref={register({ required: true })} name="name" placeholder="Title" />
                <p className="has-text-danger">{errors.name && 'Ce champ est requis'}</p>
            </div>
            <nav className="level-right" style={{ paddingTop: "1rem" }}>
                <div className="level-item has-text-centered">
                    <div>
                        <div className="pt-2 level-right">
                            <div className="level-item has-text-centered">
                                <div>
                                    <p>{(props.projectInfo.whitelist || []).length}</p>
                                </div>
                            </div>
                            <div className="level-item has-text-centered">
                                <div>
                                    <FontAwesomeIcon icon={faEye} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="level-item has-text-centered">
                    <div>
                        <div className="control">
                            <div className="select is-rounded">
                                <select ref={register({ required: true })} defaultValue={props.projectInfo.state} name="state">
                                    <option value="En cours">En cours</option>
                                    <option value="En attente">En attente</option>
                                    <option value="Terminé">Terminé</option>
                                    <option value="Annulé">Annulé</option>
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
