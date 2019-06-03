import React from 'react';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from "history";

import './App.css';
import Books from './components/Books';


const customHistory = createBrowserHistory();


const App = () => {
  return (
    <Router history={customHistory}>
      <Route path="/" component={Books} />
    </Router>
  )
}


export default App;
