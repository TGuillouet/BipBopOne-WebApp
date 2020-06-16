import React, { Component } from "react";

import { Table } from "../Table";
import { MyLoader } from "../Loader";
import ContactProject from "./ContactProject";
import ProjectInfos from "./ProjectInfos";

import { getProjectDetail, getProjectAssets, createProjectAsset, deleteProjectAsset } from "../../services/projects/projectsSevice";
import { getUserContactsList } from "../../services/contacts/contacts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEye, faEyeSlash, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { withUserContext } from "../../contexts/UserContext";

class ProjectView extends Component {
    state = {
        userContacts: {},
        projectInfo: {},
        projectAssets: [],
        file: {},
        loading : false,
    };


    handleAssetDelete = (id) => {
        return async () => {
            await deleteProjectAsset(this.props.context.user.uid, this.props.match.params.id, id)
            const projectAssets = await getProjectAssets(this.props.context.user.uid, this.props.match.params.id);
            await this.setState({ projectAssets });
        }
    }


    generateRowComponentListAsset = ({ id, name, created_at, visible }) => {
        return (
            <tr key={id}>
                <td>{name}</td>
                <td>{new Date(created_at.seconds).toString()}</td>
                <td>{<FontAwesomeIcon icon={(visible)?  faEye: faEyeSlash} />}</td>
                <td>
                    <button className="button" onClick={this.handleAssetDelete(id)}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                </td>
            </tr>
        );
    };

    async componentDidMount() {
        try {
            const { user } = this.props.context;

            this.setState({
               loading: true
            });

            const [ projectInfo, projectAssets,userContacts ] = await Promise.all([
                getProjectDetail(user.uid, this.props.match.params.id),
                getProjectAssets(user.uid, this.props.match.params.id),
                getUserContactsList(user.uid)
            ]);

            this.setState({
                projectInfo,
                projectAssets,
                userContacts,
                loading: false
            });
        } catch(e) {
            console.error(e)
        }
    }

    handleChangeFile = e => {
        if (e.target.files[0]) {
            if (e.target.files[0].name.split('.').pop() === "obj") {
                this.setState({ file: e.target.files[0] })
            }
        }
    }

    handleAddFile = async () => {
        this.setState({ loading: true })
        const tmp = await createProjectAsset(this.props.context.user.uid, this.props.match.params.id, this.state.file);
        await tmp ? this.setState({ loading: false }) : console.log("");
    }

    render() {
        return (
          this.state.loading ?
            <MyLoader/> : (
            <div className="columns">
                <div className="column is-5">
                    <section className="hero is-fullheight">
                        <div className="hero-body">
                            <div className="container">
                                <ProjectInfos
                                    projectInfo={this.state.projectInfo}
                                    projectAssets={this.state.projectAssets}
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
                                userContacts={this.state.userContacts}
                                whitelist={this.state.projectInfo.whitelist}
                                userId={this.props.context.user.uid}
                                projectId={this.props.match.params.id}
                            />
                        </div>
                        <div className="FichierProjet">
                            <Table
                                items={this.state.projectAssets}
                                render={this.generateRowComponentListAsset}
                            />

                            <input type="file" onChange={this.handleChangeFile} accept=".obj" />
                            <button className="button is-primary" onClick={this.handleAddFile}>Upload</button>
                        </div>
                        <div className="BlockingContact">
                        </div>
                    </section>
                </div>
            </div>
        ))
    }
}

export default withUserContext(ProjectView)
