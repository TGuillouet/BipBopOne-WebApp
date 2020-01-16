import React from 'react';
import { storage } from '../firebase'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const idU = 'qH1m2ckbI4QUtpyTAoDsVr7v5qZ2';

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dropSelectedView: null,
            upladedFiles: {},
        }
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
        Object.values(upladedFiles).map( file =>  {
            console.log(file)
            const uploadTask = storage.ref(`test/${file.name}`).put(file);
            uploadTask.on(storage.TaskEvent.STATE_CHANGED,
                () => {
                    // progrss function ....
                },
                (error) => {
                    // error function ....
                    console.log(error);
                },
                () => {
                    // complete function ....
                       NotificationManager.success('Success message', 'Send success');
                });
        })
    }

    handleDropSelectedChange = e => {
        this.setState({dropSelectedView : e.target.value})
    }

    dropView() {
        if (this.state.dropSelectedView == "wavefront") {
            return (
                <div>
                    <span>wavefront</span>
                    <input name="model" type="file" onChange={this.handleChange} accept=".png,.obj" />
                    <input name="material" type="file" onChange={this.handleChange} accept=".png,.mtl" />
                    <button onClick={this.handleUpload}>Upload</button>
                </div>
            )
        }
        else if (this.state.dropSelectedView == "gltf") {
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