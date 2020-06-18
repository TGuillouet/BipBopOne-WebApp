import React from "react";
import Proptypes from "prop-types";
import { MyLoader } from "../Loader";

function Table(props) {
    const rows = props.items.map(props.render)

    return ((props.isLoading) ? <MyLoader /> : (
        <table className='table is-striped is-hoverable' style={{ overflowY: "visible" }}>
            <tbody>
                {rows}
            </tbody>
        </table>
    ));
}

Table.propTypes = {
    items: Proptypes.array.isRequired,
    render: Proptypes.func.isRequired,
    isLoading: Proptypes.bool
};


Table.defaultProps = {
    items: [],
    render: () => { }
}


export default Table;
