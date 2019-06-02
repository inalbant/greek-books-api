import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Books from './components/Books';

const App = () => {

  return (
    <BrowserRouter>
      <Route path="/books" component={Books} />
    </BrowserRouter>
  )
}


export default App;
