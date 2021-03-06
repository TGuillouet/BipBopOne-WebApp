import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

function TopProjectTableBar(props) {
    const [ research, setResearchValue ] = React.useState("");

    const onSubmit = (e) => {
        e.preventDefault();

        props.onResearch(research)
    };

    const onChange = ({ target: { value } }) => {
        setResearchValue(value);
    };

    return (
        <div style={{ height: "5vh" }} className="level">
            <div className="level-left">
                <div className="level-item">
                    <button className="button is-primary" onClick={props.onLeftButtonClick}>Créer un projet</button>
                </div>
            </div>
            <div className="level-right">
                <div className="level-item">
                    <form className="field has-addons" onSubmit={onSubmit}>
                        <p className="control is-marginless">
                            <input className={"input"} placeholder="Rechercher" value={research} onChange={onChange} />
                        </p>
                        <p className="control">
                            <button className="button" type="submit">
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

TopProjectTableBar.propTypes = {
    onLeftButtonClick: PropTypes.func.isRequired,
    onResearch: PropTypes.func.isRequired
};

export default TopProjectTableBar;
