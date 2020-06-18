import React from "react";

import IntroProject from './IntroProject';
import ProjectDescription from "./ProjectDescription";

import { updateProjectDetail } from "../../services/projects/projectsSevice";
import { useForm, FormContext } from "react-hook-form";
import ThreeJsView from "../ThreeJsView/ThreeJsView";

function ProjectInfos(props) {

    const methods = useForm();

    const updateProjectInfo = async (projectData) => {
      await updateProjectDetail(props.userId, props.projectId, projectData);
    };

    const asset = props.projectAssets.find((a) => a.id === props.selectedRenderedAssetId);
    const objectUrl = asset?.model ?? null;
    const materialUrl = asset?.material ?? null;

    return (
        <FormContext {...methods} >
            <form onSubmit={methods.handleSubmit(updateProjectInfo)}>
                <IntroProject projectInfo={props.projectInfo}/>
                <section className="section" style={{ display: "flex", justifyContent: "center", padding: 20 }}>
                    <ThreeJsView objectUrl={objectUrl} materialUrl={materialUrl} />
                </section>
                <ProjectDescription desc={props.projectInfo.description} />
                <div>
                  <button className="button is-primary is-pulled-right" type="submit">Save</button>
                </div>
            </form>
        </FormContext>
    )
}

export default ProjectInfos
