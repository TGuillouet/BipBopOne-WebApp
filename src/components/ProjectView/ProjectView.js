import React, { Component } from "react";
import * as moment from "moment";
import {faTrashAlt, faEye, faEyeSlash, faVectorSquare, faPaintRoller, faCube} from "@fortawesome/free-solid-svg-icons";

import { Table } from "../Table";
import { MyLoader } from "../Loader";
import ContactProject from "./ContactProject";

import ProjectInfos from "./ProjectInfos";
import { getProjectDetail, getProjectAssets, createProjectAsset, deleteProjectAsset, changeAssetVisibility } from "../../services/projects/projectsSevice";
import { getUserContactsList } from "../../services/contacts/contacts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withUserContext } from "../../contexts/UserContext";
import {FileInput} from "../FileInput";

class ProjectView extends Component {
    state = {
        userContacts: {},
        projectInfo: {},
        projectAssets: [],
        renderedObjectId: "",
        loading : false,
    };

    componentDidMount() {
        this.fetchProjectInfos();
    }

    fetchProjectInfos = async () => {
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
                renderedObjectId: projectAssets[0]?.id ?? null,
                userContacts,
                loading: false
            });
        } catch(e) {
            console.error(e)
        }
    }

    reloadProjectAssets = async () => {
        try {
            await this.setState({ loading: false });

            const assets = await getProjectAssets(this.props.context.user.uid, this.props.match.params.id);

            this.setState({ projectAssets: assets, renderedObjectId: assets[0]?.id ?? null, loading: false });
        } catch(e) {
            console.error(e);
        }
    }

    reloadUserContacts = async () => {
        try {
            await this.setState({ loading: false });

            const contacts = await getUserContactsList(this.props.context.user.uid);

            this.setState({ userContacts: contacts, loading: false });
        } catch(e) {
            console.error(e);
        }
    }

    changeVisibility = async (id, isVisible) => {
        await changeAssetVisibility(this.props.context.user.uid, this.props.match.params.id, id, !isVisible);
        this.reloadProjectAssets();
    }

    changeRenderedObject = (id) => {
        this.setState({ renderedObjectId: id })
    }

    onAssetAdd = async (model, material) => {
        this.setState({ loading: true })
        await createProjectAsset(this.props.context.user.uid, this.props.match.params.id, model, material);
        this.setState({ loading: false })
        this.reloadProjectAssets();
    }

    onAssetDelete = async (id) => {
        await deleteProjectAsset(this.props.context.user.uid, this.props.match.params.id, id);
        this.reloadProjectAssets();
    }

    render() {
        return (
          this.state.loading ?
            <MyLoader/> : (
            <div className="columns" style={{ margin: "1%" }}>
                <div className="column is-half">
                    <section className="is-fullheight">
                        <div className="container">
                            <ProjectInfos
                                projectInfo={this.state.projectInfo}
                                projectAssets={this.state.projectAssets}
                                userId={this.props.context.user.uid}
                                projectId={this.props.match.params.id}
                                selectedRenderedAssetId={this.state.renderedObjectId}
                            />
                        </div>
                    </section>
                </div>
                <div className="column is-half" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <section className="is-fullheight">
                        <ProjectFiles
                          assets={this.state.projectAssets}
                          onAddFile={this.onAssetAdd}
                          onDelete={this.onAssetDelete}
                          onChangeVisibility={this.changeVisibility}
                          onChangeRender={this.changeRenderedObject}
                        />
                        <ContactProject
                            userContacts={this.state.userContacts}
                            whitelist={this.state.projectInfo.whitelist}
                            userId={this.props.context.user.uid}
                            projectId={this.props.match.params.id}
                            onContactAdded={this.reloadUserContacts}
                        />
                    </section>
                </div>
            </div>
        ))
    }
}

function ProjectFiles(props) {

    const [model, setModel] = React.useState(null);
    const [material, setMaterial] = React.useState(null);

    const generateAssetRow = React.useCallback(({ id, name, created_at, visible }) => {
        const handleAssetVisible = (id, currentVisibility) => {
            return () => props.onChangeVisibility(id, currentVisibility)
        }

        const handleAssetRender = (id) => {
            return () => props.onChangeRender(id)
        }

        const handleAssetDelete = (id) => {
            return () => props.onDelete(id);
        };

        return (
          <tr key={id}>
              <td>{name}</td>
              <td>{moment(created_at.toDate()).format("DD/MM/YYYY")}</td>
              <td style={{ display: "flex", justifyContent: "space-around" }}>
                  <button className="button" onClick={handleAssetRender(id)}>
                      <FontAwesomeIcon icon={faVectorSquare} />
                  </button>
                  <button className="button" onClick={handleAssetVisible(id, visible)}>
                      <FontAwesomeIcon icon={(visible)? faEye: faEyeSlash} />
                  </button>
                  <button className="button" onClick={handleAssetDelete(id)}>
                      <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
              </td>
          </tr>
        );
    }, [props]);

    const handleChangeFile = file => {
        const fileExt = file?.name.split(".").pop();
        if (fileExt === "obj") {
            setModel(file);
            return;
        }
        if (fileExt === "mtl") {
            setMaterial(file);
            return;
        }
    }

    const handleAddFile = async () => {
        props.onAddFile(model, material);
    }

    return (
      <div className="FichierProjet box" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <Table
            items={props.assets}
            render={generateAssetRow}
          />

          <div style={{ display: "flex", justifyContent: "space-between" }}>
              <FileInput icon={faCube} text="Model*" accept=".obj" onChange={handleChangeFile} />
              <FileInput icon={faPaintRoller} text="Material" accept=".mtl" onChange={handleChangeFile} />
              <button className="button is-primary" onClick={handleAddFile}>Ajouter</button>
          </div>
      </div>
    );
}

export default withUserContext(ProjectView)
