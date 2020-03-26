import React from 'react';
import './App.css';

import MenuView from './components/MenuView';
import ProjectView from './components/ProjectView';
import ProjectListView from "./components/ProjectListView";

import 'bulma/css/bulma.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function App() {
  document.body.style.overflow = "hidden"
  return (
    <div class="columns">
      <div class="column is-1">
        <MenuView />
      </div>
      <div class="column">
        <ProjectView />
      </div>
    </div>
  );
}

export default App;
