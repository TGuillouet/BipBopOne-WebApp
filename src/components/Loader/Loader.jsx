import React from "react";
import Loader from 'react-loader-spinner'

function MyLoader() {
    return (
            <div>
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translateY(-50%)" }}>
                    <Loader type="ThreeDots" color="#000000" height={80} width={80} />
                </div>
            </div>
    );
}

export default MyLoader