import React from "react";

import IntroProject from './IntroProject';
import ProjectDescription from "./ProjectDescription";

import { updateProjectDetail } from "../../services/projects/projectsSevice";
import { useForm, FormContext, useFormContext } from "react-hook-form";

function ProjectInfos(props) {
    
    const methods = useForm();

    const updateProjectInfo = async (projectData) => {
        console.log(projectData);
        console.log(props.userId);
        console.log(props.projectId);
        await updateProjectDetail(props.userId, props.projectId, projectData);

    };

    return (
        <FormContext {...methods} >
            <form onSubmit={methods.handleSubmit(updateProjectInfo)}>
                <IntroProject projectInfo={props.projectInfo}/>
                <section class="section">
                    <figure class="image is-4by3">
                        <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" />
                    </figure>
                </section>
                <ProjectDescription desc={props.projectInfo.description} />
                <button className="button is-primary is-block" type="submit">Save</button>
            </form>
        </FormContext>

    )
}

export default ProjectInfos