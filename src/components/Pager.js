import React from 'react';
import { Pagination } from 'react-bootstrap';


const Pager = (props) => {
  if (!props || !props.page) {
    return null;
  }

  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(props.itemCount / props.itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map(number => {    
      return (
        <Pagination.Item
          key={number}
          id={number}
          active={number === props.page}
          onClick={props.onClick}
        >
          {number}
        </Pagination.Item>
      );    
  });




  return (
    <Pagination style={{ marginTop: '1rem' }} >
      <Pagination.First />
      <Pagination.Prev />
      {renderPageNumbers}
      <Pagination.Next />
      <Pagination.Last />
    </Pagination>
  )
}

export default Pager;