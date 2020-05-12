import React from 'react';
import { storage,firestore } from '../firebase'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const idU = 'qH1m2ckbI4QUtpyTAoDsVr7v5qZ2';
const idProject = 'DEvsTtAQylXKZwNopVXJ';

//firestore.collection('users').doc(idU).collection('projects').get().then(snap => { snap.forEach(doc => console.log(doc.data()))});
//firestore.collection('users').doc(idU).collection('projects').get().then(snap => console.log(snap));

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dropSelectedView: null,
            upladedFiles: {},
        }
    }

    async getSnapshotNameAndUrl(snapshot) {
        const [ name, type ] = snapshot.metadata.name.split(".")
        return { name, type, url: await snapshot.ref.getDownloadURL() }
    }

    findMember(files, member) {
        return files.find((selectedFile) => `${selectedFile.name}.${selectedFile.type}` === this.state.upladedFiles[member].name)
    }

    handleChange = e => {
        if (e.target.files[0]) {
            const upladedFile = e.target.files[0];
            const name = e.target.name
            this.setState(
                (prev) => ({ 
                    upladedFiles: { 
                        ...prev.upladedFiles, 
                        [name]: upladedFile 
                    } 
                })
            )
        }
    }

    handleUpload = () => {
        const { upladedFiles } = this.state;
        const uploadTasksPromises = Object.values(upladedFiles).map( file => storage.ref(`${idU}/${idProject}/${file.name}`).put(file))
        Promise.all(uploadTasksPromises).then(async (snapshots) => {
            try {
                const files = await Promise.all(snapshots.map(snapshot => this.getSnapshotNameAndUrl(snapshot)))
                
                const model = this.findMember(files, "model")
                let material = null

                let asset = {
                    model: model.url,
                    name: model.name,
                    type: model.type,
                    visible: true
                }

                if (files.length === 2) {
                    material = this.findMember(files, "material")
                    asset = { ...asset, material: material.url }
                }

                await firestore.collection('projects').doc(idProject).collection('assets').add(asset)
                NotificationManager.success('Success message', 'Send success');
            } catch(e) {
                NotificationManager.error('Error message', 'Send error');
            }


        })
    }

    handleDropSelectedChange = e => {
        this.setState({dropSelectedView : e.target.value})
    }

    dropView() {
        if (this.state.dropSelectedView === "wavefront") {
            return (
                <div>
                    <span>wavefront</span>
                    <input name="model" type="file" onChange={this.handleChange} accept=".obj" />
                    <input name="material" type="file" onChange={this.handleChange} accept=".mtl" />
                    <button onClick={this.handleUpload}>Upload</button>
                </div>
            )
        }
        else if (this.state.dropSelectedView === "gltf") {
            return (
                <div>
                    <span>gltf</span>
                    <input type="file" onChange={this.handleChange} accept=".png,.gltf" />
                    <button onClick={this.handleUpload}>Upload</button>
                </div>
            )
        }
        else {
            return
        }
    }

    render() {
        const style = {
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        };
        return (
            <div style={style}>
                <span>Hello</span>
                <select onChange={this.handleDropSelectedChange}>
                    <option value="">--Select export--</option>
                    <option value="wavefront">WaveFront</option>
                    <option value="gltf">GLTF</option>
                </select>
                {this.dropView()}
                <NotificationContainer />
            </div>
        )
    }
}