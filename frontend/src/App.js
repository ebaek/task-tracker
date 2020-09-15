import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavbarComponent from './components/navbar.component';
import TasksList from './components/tasks-list.component';
import CompleteButton from './components/complete-button.component';

function App() {
  return (
    <Router>
      <div className="component">
        <NavbarComponent />
        <Route path="/edit/:id" component={CompleteButton} />
        <Route path="/" exact component={TasksList} />
      </div>
    </Router>
    
  );
}

export default App;
