import React, { Component } from "react";

import { Table } from "../Table";
import IntroProject from './IntroProject';
import ProjectDescription from "./ProjectDescription";

import { getProjectDetail, getProjectAssets } from "../../services/projects/projectsSevice";
import { auth } from "../../firebase";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

let user = {};
class ProjectView extends Component {
    state = {
        projectInfo: [],
        projectAssets: [],
    };


    generateRowComponentContact = (item) => {
        return (
            <tr>
                <td style={{ verticalAlign: "middle" }}>{item}</td>
                <td><button class="button">Bloquer</button></td>
                <td><button class="button">Ajouter contact</button></td>
            </tr>
        );
    };


    generateRowComponentListAsset = ({ id, name, created_at, visible }) => {
        return (
            <tr key={id}>
                <td>{name}</td>
                <td>{created_at}</td>
                <td>({visible}})?<FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} /></td>
                <td><button class="button"><FontAwesomeIcon icon={faTrashAlt} /></button></td>
            </tr>
        );
    };


    async componentDidMount() {
        const userCred = await auth.signInWithEmailAndPassword("thomas.guillouet@edu.itescia.fr", "17tg11J59");
        user = userCred.user;
        const projectInfo = await getProjectDetail(user.uid, "NRemoAjlHE5wRyZq7Fy3");
        const projectAssets = await getProjectAssets(user.uid, "NRemoAjlHE5wRyZq7Fy3");
        await this.setState({ projectInfo });
        await this.setState({ projectAssets });
        console.log(this.state.projectInfo);
    }
    render() {
        return (
            <div class="columns is-gapless">
                <div class="column is-5">
                    <section class="hero is-fullheight">
                        <div class="hero-body">
                            <div class="container">

                                <IntroProject projectInfo={this.state.projectInfo} />

                                <section class="section">
                                    <figure class="image is-4by3">
                                        <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" />
                                    </figure>
                                </section>
                                <ProjectDescription desc={this.state.projectInfo.description} />
                            </div>
                        </div>
                    </section>
                </div>
                <div class="column">
                    <section class="is-fullheight">
                        <div class="ContactProjet">
                            <Table
                                items={this.state.projectInfo.whitelist}
                                render={this.generateRowComponentContact}
                            />
                        </div>
                        <div class="FichierProjet">
                            <Table
                                items={this.state.projectAssets}
                                render={this.generateRowComponentListAsset}
                            />
                        </div>
                        <div class="BlockingContact">
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}

export default ProjectView