import React from 'react';
import {storage} from '../firebase'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export default class Home extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          image: null,
          url: '',
          progress: 0
        }
    }

    handleChange = e => {
        if (e.target.files[0]) {
          const image = e.target.files[0];
          this.setState(() => ({image}));
        }
      }
      handleUpload = () => {
          const {image} = this.state;
          const uploadTask = storage.ref(`images/${image.name}`).put(image);
          uploadTask.on('state_changed', 
          (snapshot) => {
            // progrss function ....
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            this.setState({progress});
          }, 
          (error) => {
               // error function ....
            console.log(error);
          }, 
        () => {
            // complete function ....
            storage.ref('images').child(image.name).getDownloadURL().then(url => {
                console.log(url);
                this.setState({progress : 0});
                NotificationManager.success('Success message', 'Send success');
                
            })
        });
      }
  render(){
    const style = {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      };
      return(
        <div style={style}>
        <span>Hello</span>
        <progress value={this.state.progress} max="100"/>
        <input type="file" onChange={this.handleChange}/>
        <button onClick={this.handleUpload}>Upload</button>
        <NotificationContainer/>
        </div>
      )
  }
}