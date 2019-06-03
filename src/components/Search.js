import React from 'react';
import Button from 'react-bootstrap/Button'


function Search(props) {
   return (
      <div>
         <input type="text" value={props.filters} onChange={props.onChange} />
         <Button variant="outline-secondary" size="sm" onClick={props.onClick}>Search</Button>
      </div>
   )
}

export default Search;