import React from "react";

import Proptypes from "prop-types";

function ContactProject(props) {
    const rows = props.items.map(props.render)

    return (
            <table class="table WidthExtend HeightExtend">
                <thead>
                    <tr>
                        <th>
                            <div class="control">
                                <input class="input" type="text" placeholder="Adresse mail" />
                            </div>
                        </th>
                        <th>
                            <div class="control">
                                <button class="button">Ajouter</button>
                            </div>
                        </th>
                        <th>
                            <div class="control">
                                <button class="button">Contact</button>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                {rows}
            </tbody>
            </table>
    )
}

ContactProject.propTypes = {
    items: Proptypes.array.isRequired,
    render: Proptypes.func.isRequired,
    isLoading: Proptypes.bool
};


ContactProject.defaultProps = { 
    items: [],
    render: ()=>{}
}

export default ContactProject