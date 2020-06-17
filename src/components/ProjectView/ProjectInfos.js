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

  const objectUrl = props.projectAssets[0]?.model ?? null;
  const materialUrl = props.projectAssets[0]?.material ?? null;

  return (
      <FormContext {...methods} >
          <form onSubmit={methods.handleSubmit(updateProjectInfo)}>
              <IntroProject projectInfo={props.projectInfo}/>
              <section className="section">
                  <ThreeJsView objectUrl={objectUrl} materialUrl={materialUrl} />
              </section>
              <ProjectDescription desc={props.projectInfo.description} />
              <button className="button is-primary is-block" type="submit">Save</button>
          </form>
      </FormContext>
  )
}

export default ProjectInfos
