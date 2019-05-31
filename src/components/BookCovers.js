import React, { Component } from 'react'
import CardDeck from 'react-bootstrap/CardDeck'
import Card from 'react-bootstrap/Card'
import Pagination from 'react-bootstrap/Pagination'

export default class BookCovers extends Component {
  state = {
    books: this.props.books,
    currentPage: 1,
    booksPerPage: 2
  }

  handleClick = (event) => {
    this.setState({
      currentPage: Number(event.target.id)
    })
  }

  render() {
    const { books, currentPage, booksPerPage } = this.state;

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

    const renderBooks = currentBooks.map((book, index) => {
      return (
        <Card key={index}>
          <Card.Header as="h5" >{book.book_title}</Card.Header>
          <Card.Body>
            <Card.Subtitle style={{ marginBottom: '10px' }}>{`Author(s): ${book.book_author}`}</Card.Subtitle>
            <Card.Text style={{ marginBottom: '1px' }}>{`Publication Year: ${book.book_publication_year}`}</Card.Text>
            <Card.Text style={{ marginBottom: '1px' }}>{`Publication Country: ${book.book_publication_country}`}</Card.Text>
            <Card.Text style={{ marginBottom: '1px' }}>{`Publication City: ${book.book_publication_city}`}</Card.Text>
            <Card.Text>{`Number of Pages: ${book.book_pages}`}</Card.Text>
          </Card.Body>
        </Card>
      )
    });

    // Logic for displaying page numbers
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(books.length / booksPerPage); i++) {
      pageNumbers.push(i)
    }

    const renderPageNumbers = pageNumbers.map(number => {
      let active = this.state.currentPage
      return (
        <Pagination.Item
          className="page-item"
          key={number}
          id={number}
          active={number === active}
          onClick={this.handleClick}
        >
          {number}
        </Pagination.Item>
      );
    });

    return (
      <div>
        <h1>Books from Greek History</h1>
        <CardDeck >
          {renderBooks}
        </CardDeck>
        <Pagination style={{ marginTop: '1.5rem' }}>
          {renderPageNumbers}
        </Pagination>
      </div>
    );
  }

}
