import React, {useEffect} from "react";

import { useFormContext } from "react-hook-form";
import PropTypes from 'prop-types'

function ProjectDescription(props) {

    const {register, setValue} = useFormContext({
        mode: "onBlur",
    });

    useEffect(() => {
        setValue([
          { description: props.desc }
        ])
      }, [props.desc]);


    return (
        <section>
            <div class="container">
                <h1 class="title">Description</h1>
                <textarea class="textarea has-fixed-size" placeholder="Description du projet..."  ref={register({ required: true })} name="description"/>
            </div>
        </section>
    )
}

ProjectDescription.propTypes = {
    desc: PropTypes.string
  }
  ProjectDescription.defaultProps = {
    projectInfo: ""
  }


export default ProjectDescription