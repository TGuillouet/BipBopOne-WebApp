import React from "react";

function ProjectDescription(props) {
    return (
        <section>
            <div class="container">
                <h1 class="title">Description</h1>
                <textarea class="textarea has-fixed-size" value={props.desc} placeholder="" />
            </div>
        </section>
    )
}

export default ProjectDescription