import React from 'react';

function Search(props) {
  return (
    <div>
      <label for="search-input" style={{ marginRight: '0.5rem' }} >Enter search query: </label>
      <input type="text" id="search-input" value={props.filters} onChange={props.onChange} style={{ marginRight: '1rem' }} />
      <button onClick={props.onClick}>Search</button>
    </div>
  )
}

export default Search;