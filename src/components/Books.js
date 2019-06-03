import React, { Component } from 'react';
import axios from 'axios';
import queryString from 'query-string'
import { withRouter } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import Pager from './Pager';
import BooksList from './BooksList';
import Search from './Search';

class Books extends Component {
  state = {
    books: null,
    count: 0,
    page: 1,
    itemsPerPage: 20,
    filters: ""
  }

  componentDidMount() {
    const { page, itemsPerPage, filters } = queryString.parse(this.props.location.search);

    this.setState({
      page: page ? Number(page) : 1,
      itemsPerPage: itemsPerPage ? Number(itemsPerPage) : 20,
      filters: filters ? filters : ""
    }, () => {
      this.getBooks(this.state.page, this.state.itemsPerPage, this.state.filters);
    });
  }

  handlePageOnClick = (event) => {
    const page = event.target.id;
    const { itemsPerPage, filters } = this.state;

    this.getBooks(page, itemsPerPage, filters);
  }

  handleSearchOnChange = (event) => {
    const filters = event.target.value;
    this.setState({
      filters
    });
  }
  handleSearchOnClick = (event) => {
    const { itemsPerPage, filters } = this.state;
    const page = 1;

    this.getBooks(page, itemsPerPage, filters);
  }

  getBooks = (page, itemsPerPage, filters) => {
    axios.post(`http://nyx.vima.ekt.gr:3000/api/books`, {
      page: Number(page),
      itemsPerPage: Number(itemsPerPage),
      filters: [{ type: "all", values: [filters ? filters : ""] }]
    })
      .then(response => {
        this.setState({
          books: response.data.books,
          count: response.data.count,
          page: Number(page)
        });

        this.props.history.push(`?page=${page}&itemsPerPage=${itemsPerPage}&filters=${filters}`);
      })
      .catch(err => {
        console.log('Error:', err)
      });
  }

  render() {
    const { books, count, page, itemsPerPage } = this.state;

    if (!books) {
      return <div>Loading..</div>;
    }

    return (
      <Container>
        <h1 style={{ marginBottom: '2rem' }}>Books from Greek History</h1>
        <Row>
          <Col>
            <Search
              filters={this.state.filters}
              onChange={this.handleSearchOnChange}
              onClick={this.handleSearchOnClick}
            />
          </Col>
        </Row>
        <>
          {books.length === 0 ?
            <div>No books found!!</div> :
            <>
              <Row>
                <Col>
                  <BooksList
                    books={books}
                    indexOfFirstBook={(page - 1) * itemsPerPage}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Pager                    
                    itemCount={count}
                    page={page}
                    itemsPerPage={itemsPerPage}
                    onClick={this.handlePageOnClick}
                  />
                </Col>
              </Row>
            </>
          }
        </>
      </Container>
    )
  }
}

export default withRouter(Books);
