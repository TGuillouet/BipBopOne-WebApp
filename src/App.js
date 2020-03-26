import React from 'react';
import './App.css';
import Home from './components/home'

import ProjectView from './components/ProjectView'
import MenuView from './components/MenuView';

import 'bulma/css/bulma.css'

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
