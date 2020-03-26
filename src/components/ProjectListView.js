import React, {Component} from 'react';
import {createProject, getUserProjects} from "../services/projects/projectsSevice";
import {auth} from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEye, faFile} from "@fortawesome/free-solid-svg-icons";
import {TopProjectTableBar} from "./TopProjectTableBar";
import {Table} from "./Table";
import { CreateProjectForm } from "./CreateProjectForm";
import Modal from "./Modal/Modal";

let user = {};
class ProjectListView extends Component {
    state = {
        projects: [],
        createModalDisplayed: false,
        isLoading: false
    };

    async componentDidMount() {
        const userCred = await auth.signInWithEmailAndPassword("thomas.guillouet@edu.itescia.fr", "17tg11J59");
        user = userCred.user;
        this.fetchProjectList(user.uid);
    }

    fetchProjectList = async (userId) => {
        await this.setState({ loading: true })
        const projects = await getUserProjects(userId);
        await this.setState({ projects, isLoading: false });
    };

    generateRowComponent = ({ id, name, client_name, state, whitelist, nb_files }) => {
        return (
            <tr key={id}>
                <td>{name}</td>
                <td>{client_name}</td>
                <td><span className="tag is-primary">{state}</span></td>
                <td>{whitelist.length} <FontAwesomeIcon icon={faEye} /></td>
                <td>{nb_files} <FontAwesomeIcon icon={faFile} /></td>
            </tr>
        );
    };

    toggleCreateProjectModal = () => {
        this.setState(prevState => ({ createModalDisplayed: !prevState.createModalDisplayed }))
    };

    onResearch = (researchValue) => {
        // TODO: Make the research
        console.log(researchValue)
    };

    render() {
        return (
            <div className="content root">
                <div style={{ height: "100vh" }} className="columns is-desktop is-vcentered is-centered">
                    <div style={{ height: "70vh" }}  className="box column is-four-fifths table-container">
                        <TopProjectTableBar onLeftButtonClick={this.toggleCreateProjectModal} onResearch={this.onResearch} />
                        <Table
                            items={this.state.projects}
                            render={this.generateRowComponent}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default ProjectListView;
