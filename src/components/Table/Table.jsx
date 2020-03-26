import React from "react";
import Proptypes from "prop-types";

function Table(props) {
    const rows = props.items.map(props.render)

    return (
        <table className='table is-striped is-hoverable'>
            <tbody>
            {rows}
            </tbody>
        </table>
    )
}

Table.propTypes = {
    items: Proptypes.array.isRequired,
    render: Proptypes.func.isRequired
};

export default Table;
