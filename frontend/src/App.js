import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavbarComponent from './components/navbar.component';
import TasksList from './components/tasks-list.component';
import EditTask from './components/edit-task.component';

function App() {
  return (
    <Router>
      <div className="component">
        <NavbarComponent />
        <Route path="/edit/:id" component={EditTask} />
        <Route path="/" exact component={TasksList} />
      </div>
    </Router>
    
  );
}

export default App;
