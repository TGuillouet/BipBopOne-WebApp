import React, {Component} from 'react';
import {getUserProjects} from "../services/projects/projectsSevice";
import {auth} from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEye, faSearch} from "@fortawesome/free-solid-svg-icons";
import {TopProjectTableBar} from "./TopProjectTableBar";
import {Table} from "./Table";

class ProjectListView extends Component {
    state = {
        projects: [],
        createModalDisplayed: false
    };

    async componentDidMount() {
        const userCred = await auth.signInWithEmailAndPassword("thomas.guillouet@edu.itescia.fr", "17tg11J59");

        const projects = await getUserProjects(userCred.user.uid);

        this.setState({ projects });
    }

    generateRowComponent = () => {
        return this.state.projects.map(({ id, name, client_name, state, whitelist }) => {
            return (
                <tr key={id}>
                    <td>{name}</td>
                    <td>{client_name}</td>
                    <td><span className="tag is-primary">{state}</span></td>
                    <td>{whitelist.length} <FontAwesomeIcon icon={faEye} /></td>
                </tr>
            );
        })
    };

    displayCreateProjectModal = () => {

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
                        <TopProjectTableBar onLeftButtonClick={this.displayCreateProjectModal} onResearch={this.onResearch} />
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
