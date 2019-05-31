import React, { Component } from 'react';
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import BookCovers from './components/BookCovers';

class App extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    axios.post(`http://nyx.vima.ekt.gr:3000/api/books`)
      .then(response => this.setState({ books: response.data.books }))
  }

  render() {
    if (this.state.books.length > 0) {
      return (
        <div className="App">
          <Container>
            <Row className="h-50" >
              <Col className="h-100 d-table" >
                <BookCovers books={this.state.books} className="d-table-cell align-middle" />
              </Col>
            </Row>
          </Container>
        </div>
      )
    } else {
      return <div className="App">Loading..</div>
    }
  }

}

export default App;
