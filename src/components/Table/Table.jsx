import React from "react";
import Proptypes from "prop-types";

import Loader from 'react-loader-spinner'

function Table(props) {
    const rows = props.items.map(props.render)

    return ((props.isLoading)? <MyLoader />: (
        <table className='table is-striped is-hoverable'>
            <tbody>
                {rows}
            </tbody>
        </table>
    ));
}

function MyLoader() {
    return (
        <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            <div style={{ margin: "auto" }}>
                <Loader type="ThreeDots" color="#000000" height={80} width={80} />
            </div>
        </div>
    );
}

Table.propTypes = {
    items: Proptypes.array.isRequired,
    render: Proptypes.func.isRequired,
    isLoading: Proptypes.bool
};


Table.defaultProps = { 
    items: [],
    render: ()=>{}
}


export default Table;
