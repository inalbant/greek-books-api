import React, { Component } from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Pagination from 'react-bootstrap/Pagination'

export default class BooksTest extends Component {
  state = {
    books: [],
    currentPage: 1,
    booksPerPage: 4,
  }

  componentDidMount() {
    this.httpClient.post(`/api/books?page=${this.state.currentPage}&itemsPerPage=${this.state.booksPerPage}`)
      .then(response => this.setState({ books: response.data.books }))
  }

  handleClick = (event) => {
    this.setState({
      currentPage: Number(event.target.id)
    })
  }

  getParams(location) {
    const searchParams = new URLSearchParams(location.search);
    return {
      query: searchParams.get("query") || ""
    };
  }


  render() {

    this.httpClient = axios.create({
      baseURL: "http://nyx.vima.ekt.gr:3000"
    });

    const { location } = this.props;
    const { query } = this.getParams(location)

    const { books, currentPage, booksPerPage } = this.state;

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

    const renderBooks = currentBooks.map((book, index) => {
      return (
        <Col lg="3" md="4" sm="6" key={index}>
          <Card style={{ marginBottom: '1.5rem' }} >
            <Card.Header as="h5" style={{ backgroundColor: 'blue', color: 'white' }} >{book.book_title}</Card.Header>
            <Card.Body>
              <Card.Subtitle style={{ marginBottom: '10px' }}>{`Author(s): ${book.book_author}`}</Card.Subtitle>
              <Card.Text style={{ marginBottom: '1px' }}>{`Publication Year: ${book.book_publication_year}`}</Card.Text>
              <Card.Text style={{ marginBottom: '1px' }}>{`Publication Country: ${book.book_publication_country}`}</Card.Text>
              <Card.Text style={{ marginBottom: '1px' }}>{`Publication City: ${book.book_publication_city}`}</Card.Text>
              <Card.Text>{`Number of Pages: ${book.book_pages}`}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      )
    });

    // Logic for displaying page numbers
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(books.length / booksPerPage); i++) {
      pageNumbers.push(i)
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <Pagination.Item
          className="page-item"
          key={number}
          id={number}
          active={number === currentPage}
          onClick={this.handleClick}
        >
          {number}
        </Pagination.Item>
      );
    });


    if (books.length > 0) {
      return (
        <Container>
          <h1 style={{ marginBottom: '2rem' }}>Books from Greek History</h1>
          <Row>
            {renderBooks}
          </Row>
          <Row>
            <Pagination style={{ marginTop: '1.5rem' }} >
              {renderPageNumbers}
            </Pagination>
          </Row>
          <h3>{`My query: ${query}`}</h3>
        </Container>
      )
    } else {
      return <div>Loading..</div>
    }



  }
}
