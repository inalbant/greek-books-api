import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Books from './components/Books'
//import BooksTest from './components/BooksTest'

const App = () => {

  // function getParams(location) {
  //   const searchParams = new URLSearchParams(location.search);
  //   return {
  //     query: searchParams.get("query") || ""
  //   };
  // }
  
  return (
    <BrowserRouter>
      <Route path="/" component={Books} />
      {/* <Route
        path="/"
        render={({ location, history }) => {
          const { query } = getParams(location);
          return <BooksTest query={query} history={history} />;
        }}
      /> */}
    </BrowserRouter>
  )
}


export default App;
