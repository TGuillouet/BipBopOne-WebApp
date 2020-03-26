import React, {Component} from 'react';
import {createProject, getUserProjects} from "../services/projects/projectsSevice";
import {auth} from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEye, faFile} from "@fortawesome/free-solid-svg-icons";
import {TopProjectTableBar} from "./TopProjectTableBar";
import {Table} from "./Table";
import { CreateProjectForm } from "./CreateProjectForm";
import Modal from "./Modal/Modal";
import {withUserContext} from "../contexts/UserContext";

class ProjectListView extends Component {
    state = {
        projects: [],
        filteredProjects: [],
        createModalDisplayed: false,
        isLoading: false
    };

    async componentDidMount() {
        this.props.context.setUser(this.props.context.user);

        this.fetchProjectList(this.props.context.user.uid);
    }

    fetchProjectList = async (userId) => {
        console.log(userId)
        await this.setState({ isLoading: true })
        const projects = await getUserProjects(userId);
        await this.setState({ projects, filteredProjects: projects, isLoading: false });
    };

    generateRowComponent = ({ id, name, client_name, state, whitelist, nb_files }) => {
        return (
            <tr key={id} onClick={this.onRowClick(id)}>
                <td>{name}</td>
                <td>{client_name}</td>
                <td><span className="tag is-primary">{state}</span></td>
                <td>{whitelist.length} <FontAwesomeIcon icon={faEye} /></td>
                <td>{nb_files} <FontAwesomeIcon icon={faFile} /></td>
            </tr>
        );
    };

    onRowClick = (rowId) => (e) => {
        e.preventDefault();

        // TODO: Redirect to the detail
    };

    toggleCreateProjectModal = () => {
        this.setState(prevState => ({ createModalDisplayed: !prevState.createModalDisplayed }))
    };

    onResearch = (researchValue) => {
        // FIXME: Make the research on the firebase functions
        const filteredProjects = this.state.projects.filter((project) => {
            return project.name.includes(researchValue) || project.description.includes(researchValue);
        });
        this.setState({ filteredProjects });
    };

    createProject = async (projectData) => {
        const userId = this.props.context.user.uid;

        await createProject(userId, projectData);
        this.fetchProjectList(userId);
        this.toggleCreateProjectModal();
    };

    render() {
        return (
            <div className="content root">
                <div style={{ height: "100vh" }} className="columns is-desktop is-vcentered is-centered">
                    <div style={{ height: "70vh" }}  className="box column is-four-fifths table-container">
                        <TopProjectTableBar onLeftButtonClick={this.toggleCreateProjectModal} onResearch={this.onResearch} />
                        <Table
                            isLoading={this.state.isLoading}
                            items={this.state.filteredProjects}
                            render={this.generateRowComponent}
                        />
                    </div>
                </div>
                <Modal isActive={this.state.createModalDisplayed} onClose={this.toggleCreateProjectModal}>
                    <CreateProjectForm onSubmit={this.createProject} />
                </Modal>
            </div>
        );
    }
}

export default withUserContext(ProjectListView);
