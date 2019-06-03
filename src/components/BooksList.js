import React from 'react';
import { Table } from 'react-bootstrap';


function BooksList(props) {
  return (
    <div>
      {props.books.length === 0 ? (
        "No books available.."
      ) : (
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>Title</th>
                <th>Author</th>
                <th>Pub. Year</th>
                <th>Pub. Country</th>
                <th>Pub. City</th>
                <th>Pages</th>
              </tr>
            </thead>
            <tbody>
              {props.books.map((book, index) =>
                <tr key={index}>
                  <td>{props.indexOfFirstBook + index + 1}</td>
                  <td>{book.id}</td>
                  <td>{book.book_title}</td>
                  <td>{book.book_author}</td>
                  <td>{book.book_publication_year}</td>
                  <td>{book.book_publication_country}</td>
                  <td>{book.book_publication_city}</td>
                  <td>{book.book_pages}</td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
    </div>
  )
};

export default BooksList;