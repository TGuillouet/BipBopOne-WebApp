import React, { Component } from "react";

import { Table } from "../Table";
import { MyLoader } from "../Loader";
import ContactProject from "./ContactProject";
import ProjectInfos from "./ProjectInfos";

import { getProjectDetail, getProjectAssets, createProjectAsset, deleteProjectAsset } from "../../services/projects/projectsSevice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEye, faEyeSlash, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { withUserContext } from "../../contexts/UserContext";

class ProjectView extends Component {
    state = {
        projectInfo: {},
        projectAssets: [],
        file: {},
        Loading: false,
    };




    generateRowComponentListAsset = ({ id, name, created_at, visible }) => {
        return (
            <tr key={id}>
                <td>{name}</td>
                <td>{new Date(created_at.seconds).toString()}</td>
                <td>{(visible) ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}</td>
                <td>
                    <button class="button">
                        <FontAwesomeIcon
                            icon={faTrashAlt}
                            onClick={async () => {
                                await deleteProjectAsset(this.props.context.user.uid, this.props.match.params.id, id)
                                const projectAssets = await getProjectAssets(this.props.context.user.uid, this.props.match.params.id);
                                await this.setState({ projectAssets });
                            }
                            } />
                    </button>
                </td>
            </tr>
        );
    };

    async componentDidMount() {
        const user = this.props.context.user;

        const projectInfo = await getProjectDetail(user.uid, this.props.match.params.id);
        const projectAssets = await getProjectAssets(user.uid, this.props.match.params.id);
        await this.setState({ projectInfo, projectAssets });
    }

    handleChangeFile = e => {
        if (e.target.files[0]) {
            if (e.target.files[0].name.split('.').pop() == "obj") {
                this.setState({ file: e.target.files[0] })
            }
        }
    }

    handleAddFile = async () => {
        this.setState({ Loading: true })
        const tmp = await createProjectAsset(this.props.context.user.uid, this.props.match.params.id, this.state.file);
        await tmp ? this.setState({ Loading: false }) : console.log("");
    }



    render() {
        return (this.state.Loading ? <MyLoader /> : (
            <div class="columns is-gapless">
                <div class="column is-5">
                    <section class="hero is-fullheight">
                        <div class="hero-body">
                            <div class="container">
                                <ProjectInfos
                                    projectInfo={this.state.projectInfo}
                                    userId={this.props.context.user.uid}
                                    projectId={this.props.match.params.id}
                                />
                            </div>
                        </div>
                    </section>
                </div>
                <div class="column">
                    <section class="is-fullheight">
                        <div class="ContactProjet">
                            <ContactProject
                                whitelist={this.state.projectInfo.whitelist}
                                userId={this.props.context.user.uid}
                                projectId={this.props.match.params.id}
                            />
                        </div>
                        <div class="FichierProjet">
                            <Table
                                items={this.state.projectAssets}
                                render={this.generateRowComponentListAsset}
                            />

                            <input type="file" onChange={this.handleChangeFile} accept=".obj" />
                            <button class="button is-primary" onClick={this.handleAddFile}>Upload</button>
                        </div>
                        <div class="BlockingContact">
                        </div>
                    </section>
                </div>
            </div>
        ))
    }
}

export default withUserContext(ProjectView)
